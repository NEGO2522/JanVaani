import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/complaints/all');
        if (response.data.success) {
          setComplaints(response.data.data);
        } else {
          setError('Failed to fetch data');
        }
      } catch (err) {
        console.error(err);
        setError('Network error');
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (loading || !mapRef.current) return;

    // Initialize Leaflet map
    const map = L.map(mapRef.current, { zoomControl: false }).setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    // Add zoom control to bottom right
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Group complaints by location to prevent exact stacking
    const groupedData = complaints.reduce((acc, curr) => {
      const lat = curr.lat || 20.5937;
      const lng = curr.lng || 78.9629;
      const key = `${lat},${lng}`;
      
      if (!acc[key]) {
        acc[key] = { lat, lng, locationName: curr.location, items: [], maxPriority: 0 };
      }
      acc[key].items.push(curr);
      acc[key].maxPriority = Math.max(acc[key].maxPriority, curr.priority_score);
      return acc;
    }, {});

    const markersGroup = [];

    Object.values(groupedData).forEach(marker => {
      const score = marker.maxPriority;
      const color = score >= 80 ? '#dc2626' : score >= 60 ? '#f97316' : '#16a34a'; // Red, Orange, Green
      const radius = 20000 + (marker.items.length * 5000); // Base radius + growth

      let popupHtml = `<div style="max-height: 250px; overflow-y: auto; padding: 2px; font-family: 'Inter', sans-serif;">
        <h4 style="margin: 0 0 10px 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 8px; font-size: 15px; color: #1e3a5f;">
          <b>${marker.locationName || 'Unknown'}</b> <span style="font-size: 12px; color: #6b7280; font-weight: normal;">(${marker.items.length} issues)</span>
        </h4>`;
      
      marker.items.forEach(item => {
        const itemColor = item.priority_score >= 80 ? '#dc2626' : item.priority_score >= 60 ? '#f97316' : '#16a34a';
        popupHtml += `
          <div style="background: #ffffff; border: 1px solid #e5e7eb; padding: 10px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 1px 2px rgba(0,0,0,0.05);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
              <span style="font-weight: 700; font-size: 11px; text-transform: uppercase; color: #4b5563; background: #f3f4f6; padding: 2px 6px; border-radius: 4px;">${item.category}</span>
              <span style="font-weight: 800; font-size: 11px; color: ${itemColor};">Score: ${item.priority_score}</span>
            </div>
            <p style="margin: 0; font-size: 12px; color: #374151; line-height: 1.4;">"${item.justification}"</p>
          </div>
        `;
      });
      popupHtml += `</div>`;

      const circle = L.circle([marker.lat, marker.lng], {
        color: color,
        weight: 2,
        fillColor: color,
        fillOpacity: 0.6,
        radius: radius
      }).bindPopup(popupHtml, { minWidth: 280 });
      
      markersGroup.push(circle);
    });

    if (markersGroup.length > 0) {
      const group = L.featureGroup(markersGroup).addTo(map);
      map.fitBounds(group.getBounds(), { padding: [50, 50], maxZoom: 8 });
    }

    // Cleanup on unmount or re-render
    return () => {
      map.remove();
    };
  }, [loading, complaints]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center pt-20">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center pt-20">
        <p className="text-red-600 font-bold">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full relative pt-2 pb-6 px-6 mt-[80px]" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Map Container */}
      <div ref={mapRef} className="rounded-[2rem] shadow-2xl border-4 border-white overflow-hidden bg-gray-100" style={{ height: '100%', width: '100%', zIndex: 0 }} />
      
      {/* Floating Header Card - Top Left */}
      <div className="absolute top-8 left-12 z-[1000] bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-white/50">
        <h1 className="text-2xl font-black text-[#1e3a5f] tracking-tight">Complaint Hotspots</h1>
        <p className="text-sm text-gray-500 mt-1 font-medium">Live map of civic issues across India</p>
      </div>

      {/* Floating Legend Card - Top Right */}
      <div className="absolute top-8 right-12 z-[1000] bg-white/95 backdrop-blur-md shadow-xl rounded-2xl p-5 border border-white/50">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <span className="w-4 h-4 rounded-full bg-red-600 shadow-md shadow-red-200"></span> High Priority (80+)
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <span className="w-4 h-4 rounded-full bg-orange-500 shadow-md shadow-orange-200"></span> Medium Priority (60-79)
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-gray-700">
            <span className="w-4 h-4 rounded-full bg-green-600 shadow-md shadow-green-200"></span> Low Priority (&lt;60)
          </div>
        </div>
      </div>

      {/* Floating Stats Bar - Bottom Center */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[1000] bg-white/95 backdrop-blur-md shadow-2xl rounded-full px-8 py-3 border border-white/50 flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shadow-md shadow-green-200"></div>
        <span className="text-sm font-bold text-[#1e3a5f]">
          {complaints.length} Active Complaints across India
        </span>
      </div>
    </div>
  );
};

export default MapPage;
