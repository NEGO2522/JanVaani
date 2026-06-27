import React, { useState } from 'react';
import axios from 'axios';
import { Send, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const CitizenPage = () => {
  const [formData, setFormData] = useState({ text: '', location: '' });
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');
  
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState('');
  const [speechLang, setSpeechLang] = useState('hi-IN');

  const startRecording = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setRecordingStatus('Voice not supported, please type');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setRecordingStatus('Listening...');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setFormData(prev => ({ ...prev, text: prev.text ? prev.text + ' ' + transcript : transcript }));
      setRecordingStatus('Done!');
    };

    recognition.onerror = (event) => {
      console.error(event.error);
      setRecordingStatus('Error recognizing voice');
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
      setTimeout(() => setRecordingStatus(''), 3000);
    };

    recognition.start();
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!formData.text || !formData.location) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://jan-vaani-nu.vercel.app/api/complaints/submit', formData);
      if (response.data.success) {
        setSuccessData(response.data.data);
        setFormData({ text: '', location: '' });
      } else {
        setError('Failed to submit complaint. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 max-w-3xl mx-auto w-full overflow-hidden pt-20">
      <div className="space-y-8 w-full max-h-full">
        
        {/* Form Card */}
        {!successData ? (
          <section className="bg-white rounded-xl shadow-md p-6 md:p-10 animate-fade-in-up duration-700">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center text-white bg-primary">
                <span className="material-symbols-outlined text-[28px]" data-icon="mic">mic</span>
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-primary">Raise Your Voice</h1>
                <p className="text-gray-500 text-base">Your contribution matters to our civic community.</p>
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-200">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Location Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Location of Issue</label>
                <div className="relative group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" data-icon="location_on">location_on</span>
                  <input 
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base outline-none" 
                    placeholder="Enter street name or landmark..." 
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Complaint Textarea */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-primary ml-1">Describe the issue</label>
                <textarea 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all text-base resize-none outline-none" 
                  placeholder="Describe the issue in your own words..." 
                  rows="5"
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  required
                ></textarea>
              </div>

              {/* Voice Action Button */}
              <div className="flex flex-col items-center justify-center py-4 space-y-2">
                <div className="flex gap-4 mb-1">
                  <label className="text-xs font-bold flex items-center gap-1 cursor-pointer text-gray-600">
                    <input type="radio" name="lang" checked={speechLang === 'hi-IN'} onChange={() => setSpeechLang('hi-IN')} className="text-secondary-container focus:ring-secondary-container" /> Hindi
                  </label>
                  <label className="text-xs font-bold flex items-center gap-1 cursor-pointer text-gray-600">
                    <input type="radio" name="lang" checked={speechLang === 'en-IN'} onChange={() => setSpeechLang('en-IN')} className="text-secondary-container focus:ring-secondary-container" /> English
                  </label>
                </div>
                <button 
                  className={`flex flex-col items-center justify-center w-20 h-20 rounded-full text-white hover:scale-105 transition-transform active:scale-95 shadow-lg relative ${isRecording ? 'bg-red-600' : 'bg-secondary-container'}`} 
                  type="button"
                  onClick={startRecording}
                  style={{ animation: isRecording ? 'pulseRed 1.5s infinite' : 'pulseOrange 2s infinite' }}
                >
                  <span className="material-symbols-outlined text-[32px]" data-icon="settings_voice">settings_voice</span>
                  <style>{`
                    @keyframes pulseOrange {
                        0% { box-shadow: 0 0 0 0 rgba(253, 118, 26, 0.4); }
                        70% { box-shadow: 0 0 0 15px rgba(253, 118, 26, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(253, 118, 26, 0); }
                    }
                    @keyframes pulseRed {
                        0% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0.6); }
                        70% { box-shadow: 0 0 0 20px rgba(220, 38, 38, 0); }
                        100% { box-shadow: 0 0 0 0 rgba(220, 38, 38, 0); }
                    }
                  `}</style>
                </button>
                <span className={`text-sm font-bold ${isRecording ? 'text-red-600' : 'text-secondary'}`}>
                  {recordingStatus || 'Record Voice Complaint'}
                </span>
                <p className="text-xs text-gray-500">AI will transcribe and summarize automatically</p>
              </div>

              {/* Submit Button */}
              <button 
                className="w-full bg-secondary-container text-white font-bold py-4 rounded-xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:active:scale-100" 
                type="submit"
                disabled={loading}
              >
                <span>{loading ? 'Analyzing...' : 'Submit Complaint'}</span>
                {loading && (
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                )}
              </button>
            </form>
          </section>
        ) : (
          
          /* Success & AI Analysis State */
          <section className="space-y-6 animate-fade-in-up duration-500">
            <div className="flex flex-col items-center justify-center text-center p-8 bg-blue-50 rounded-xl border border-blue-100">
              <div className="w-16 h-16 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-[40px]" data-icon="check_circle">check_circle</span>
              </div>
              <h2 className="text-2xl font-bold text-primary mb-2">Complaint Filed Successfully</h2>
              <p className="text-gray-600">Your report has been analyzed and sent to the dashboard.</p>
            </div>
            
            {/* AI Analysis Result Card */}
            <div className="relative bg-white rounded-xl p-8 shadow-md space-y-4 overflow-hidden border border-gray-100">
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined" data-icon="auto_awesome">auto_awesome</span>
                  <h3 className="text-sm font-bold uppercase tracking-wider">AI Analysis Result</h3>
                </div>
                <span className="bg-blue-100 text-primary px-3 py-1 rounded-full text-xs font-bold">Processed instantly</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mt-6">
                <div className="space-y-2">
                  <span className="text-xs text-gray-500 uppercase font-semibold">Identified Category</span>
                  <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <span className="material-symbols-outlined text-secondary" data-icon="construction">construction</span>
                    <span className="text-base font-semibold text-gray-900">{successData.category}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 uppercase font-semibold">Priority Score</span>
                    <span className="text-sm font-bold text-red-600">{successData.priority_score}/100</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-red-600 h-full rounded-full transition-all duration-1000" 
                      style={{ width: `${successData.priority_score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-primary relative z-10 mt-6">
                <p className="text-gray-700 italic text-base">
                  <strong className="text-primary not-italic block mb-1">Justification:</strong> 
                  "{successData.justification}"
                </p>
              </div>

              <div className="pt-6 text-center relative z-10">
                <button 
                  onClick={() => setSuccessData(null)}
                  className="text-primary font-bold hover:text-secondary-container transition-colors underline"
                >
                  Submit Another Complaint
                </button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CitizenPage;
