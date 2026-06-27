import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://jan-vaani-nu.vercel.app/api/dashboard/priorities');
        if (response.data.success) {
          setData(response.data.priorities);
        } else {
          setError('Failed to load dashboard data.');
        }
      } catch (err) {
        console.error(err);
        setError('Network error. Is the server running?');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[60vh] pt-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 pt-32 pb-12 sm:px-6 lg:px-8 text-center">
        <div className="bg-red-50 text-red-600 p-6 rounded-xl inline-block shadow-sm">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // Calculate totals
  const totalComplaints = data.reduce((sum, cat) => sum + cat.count, 0);
  
  // Extract all complaints, sort by priority
  const allComplaints = data.flatMap(cat => cat.complaints || []);
  const topComplaints = [...allComplaints]
    .sort((a, b) => b.priority_score - a.priority_score)
    .slice(0, 10); // get top 10 for the table

  const highPriorityCount = allComplaints.filter(c => c.priority_score >= 80).length;

  const getCategoryEmoji = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes('road')) return '🛣️';
    if (lower.includes('water')) return '💧';
    if (lower.includes('edu') || lower.includes('school')) return '🏫';
    if (lower.includes('health') || lower.includes('hospital')) return '🏥';
    if (lower.includes('electric') || lower.includes('power')) return '⚡';
    return '📋';
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-red-700 bg-red-100';
    if (score >= 60) return 'text-orange-700 bg-orange-100';
    return 'text-green-700 bg-green-100';
  };

  const getScoreBarColor = (score) => {
    if (score >= 80) return 'bg-red-600';
    if (score >= 60) return 'bg-orange-500';
    return 'bg-green-600';
  };

  return (
    <main className="max-w-7xl mx-auto px-6 pt-32 pb-12 space-y-8 w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-primary">Constituency Overview</h1>
          <p className="text-lg text-gray-600 mt-2">Welcome back, Member of Parliament. Monitoring civic health for <span className="font-bold text-primary">District Central</span>.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-4 py-2 bg-white shadow-sm border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <span className="material-symbols-outlined text-[20px]">calendar_today</span>
            Last 30 Days
          </button>
          <button className="flex items-center gap-1 px-4 py-2 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-light transition-colors">
            <span className="material-symbols-outlined text-[20px]">download</span>
            Export Report
          </button>
        </div>
      </header>

      {/* Top Stats Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-blue-50 rounded-lg text-primary">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>description</span>
            </span>
            <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded-full">+12.5%</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Complaints</h3>
          <p className="text-4xl font-bold text-primary mt-1">{totalComplaints}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-purple-50 rounded-lg text-purple-600">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>category</span>
            </span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Categories</h3>
          <p className="text-4xl font-bold text-primary mt-1">{data.length < 10 ? `0${data.length}` : data.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100 hover:-translate-y-1 hover:shadow-md transition-all duration-200">
          <div className="flex justify-between items-start mb-4">
            <span className="p-2 bg-red-50 rounded-lg text-red-600">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>priority_high</span>
            </span>
            <span className="text-red-600 text-xs font-bold bg-red-50 px-2 py-1 rounded-full">Urgent</span>
          </div>
          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">High Priority</h3>
          <p className="text-4xl font-bold text-red-600 mt-1">{highPriorityCount}</p>
        </div>
      </section>

      {/* Category Grid */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-primary">Departmental Performance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {data.map((cat, idx) => (
            <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{getCategoryEmoji(cat.category)}</span>
                <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{cat.category}</h4>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Complaints</p>
                  <p className="text-2xl font-semibold text-primary leading-none">{cat.count}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-gray-500 uppercase font-bold">Avg Score</p>
                  <p className={`text-2xl font-semibold leading-none ${cat.avg_score >= 80 ? 'text-red-600' : cat.avg_score >= 60 ? 'text-orange-500' : 'text-green-600'}`}>
                    {cat.avg_score}
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className={`${getScoreBarColor(cat.avg_score)} h-2 rounded-full`} style={{ width: `${cat.avg_score}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Complaints Table */}
      <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-6 flex justify-between items-center bg-gray-50 border-b border-gray-100">
          <h2 className="text-xl font-bold text-primary">Recent Critical Issues</h2>
          <div className="flex gap-2">
            <input className="bg-white border border-gray-200 rounded-lg text-sm px-4 py-2 focus:ring-primary focus:border-primary outline-none" placeholder="Search issues..." type="text" />
            <button className="material-symbols-outlined p-2 text-gray-500 hover:text-primary transition-colors">filter_list</button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Issue</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Justification</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topComplaints.map((complaint, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors cursor-pointer group">
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-gray-900 line-clamp-1">{complaint.text}</p>
                    <p className="text-xs text-gray-500 mt-1">ID: #JV-{Math.floor(1000 + Math.random() * 9000)}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-50 text-primary px-2 py-1 rounded-lg text-xs font-medium whitespace-nowrap">
                      {complaint.location}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-gray-600 font-medium text-sm whitespace-nowrap">
                      <span className="text-lg">{getCategoryEmoji(complaint.category)}</span> {complaint.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`${getScoreColor(complaint.priority_score)} px-3 py-1 rounded-full font-bold text-xs whitespace-nowrap`}>
                      {complaint.priority_score} / 100
                    </span>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-xs text-gray-500 italic truncate">
                      "{complaint.justification}"
                    </p>
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-500 whitespace-nowrap">
                    {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
              {topComplaints.length === 0 && (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center text-gray-500 text-sm">
          <span>Showing {topComplaints.length} of {totalComplaints} issues</span>
          <div className="flex gap-4 items-center">
            <button className="hover:text-primary flex items-center transition-colors"><span className="material-symbols-outlined">chevron_left</span> Previous</button>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary text-white rounded shadow-sm">1</span>
              <span className="px-3 py-1 hover:bg-gray-200 rounded cursor-pointer transition-colors">2</span>
              <span className="px-3 py-1 hover:bg-gray-200 rounded cursor-pointer transition-colors">3</span>
            </div>
            <button className="hover:text-primary flex items-center transition-colors">Next <span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
