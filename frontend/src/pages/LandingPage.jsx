import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      icon: 'language',
      title: 'Submit in Any Language',
      desc: 'Voice or text in Hindi, English, or any regional language. AI translates instantly.',
      link: '/submit',
      gradient: 'from-blue-500 to-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-200',
    },
    {
      icon: 'psychology',
      title: 'AI Analysis Engine',
      desc: 'Instant categorization, priority scoring, and evidence-based justification for every complaint.',
      link: '/dashboard',
      gradient: 'from-orange-500 to-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200',
    },
    {
      icon: 'account_balance',
      title: 'MP Takes Action',
      desc: 'Direct pipeline to your representative\'s dashboard with ready-to-use justifications.',
      link: '/dashboard',
      gradient: 'from-purple-500 to-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
    },
    {
      icon: 'map',
      title: 'Live Complaint Map',
      desc: 'Real-time heatmap showing complaint hotspots across your constituency.',
      link: '/map',
      gradient: 'from-green-500 to-green-700',
      bg: 'bg-green-50',
      border: 'border-green-200',
    },
    {
      icon: 'mic',
      title: 'Voice Input',
      desc: 'Speak your complaint in Hindi or English — AI transcribes and analyzes automatically.',
      link: '/submit',
      gradient: 'from-red-500 to-red-600',
      bg: 'bg-red-50',
      border: 'border-red-200',
    },
    {
      icon: 'bar_chart',
      title: 'Priority Dashboard',
      desc: 'MPs see ranked priorities with data-backed evidence — not just complaint counts.',
      link: '/dashboard',
      gradient: 'from-indigo-500 to-indigo-700',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
    },
  ];

  return (
    <>
      <main>
        {/* Hero Section */}
        <section className="min-h-[95vh] flex items-center justify-center relative overflow-hidden px-6 pt-20 mx-4 mt-4 rounded-[3rem] bg-cover bg-center shadow-2xl" style={{ backgroundImage: "url('/landing bg  image.png')" }}>
          <div className="absolute inset-0 bg-[#011224]/40 z-0"></div>
          <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-orange-500 rounded-full mix-blend-screen filter blur-[120px] opacity-20 animate-pulse"></div>
          <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-blue-500 rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

          <div className="max-w-5xl w-full text-center z-10 mt-10">

            <h1 className="text-5xl md:text-7xl text-white font-black mb-6 leading-tight tracking-tight">
              Every Voice{' '}
              <span className="relative inline-block">
                <span className="text-orange-400">Matters</span>
                <svg className="absolute w-full -bottom-2 left-0" viewBox="0 0 300 12" fill="none">
                  <path d="M3 9C60 3 150 0 297 9" stroke="#f97316" strokeWidth="4" strokeLinecap="round"/>
                </svg>
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto opacity-90 font-light leading-relaxed">
              AI-powered platform connecting citizens with their MP. From complaint to action — in seconds.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/submit" className="group relative bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-lg min-w-[220px] overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 text-center">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span className="material-symbols-outlined text-xl">mic</span> Submit Complaint
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </Link>
              <Link to="/dashboard" className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-10 py-4 rounded-2xl font-bold text-lg min-w-[220px] hover:bg-white/20 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 text-center">
                <span className="material-symbols-outlined text-xl">bar_chart</span> View Dashboard
              </Link>
            </div>

            {/* Floating badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-12">
              {['Voice Input', 'AI Analysis', 'Live Heatmap', 'Ready Justification'].map((badge) => (
                <span key={badge} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/80 px-4 py-1.5 rounded-full text-sm font-medium">
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section className="py-24 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 rounded-full bg-orange-100 text-orange-600 text-xs uppercase tracking-widest font-bold mb-4 border border-orange-200">The Platform</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e3a5f] tracking-tight">Everything MPs Need</h2>
            <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">One platform. Complete constituency intelligence.</p>
          </div>

          {/* Standard Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <Link to={f.link} key={i} className={`rounded-2xl bg-white shadow-sm border border-gray-200 p-8 flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
                <span className="material-symbols-outlined text-[40px] mb-4 block text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>{f.icon}</span>
                <h3 className="text-xl font-bold text-[#1e3a5f] mb-2">{f.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow">{f.desc}</p>
                <span className="text-orange-500 font-bold text-sm mt-auto inline-block group-hover:translate-x-1 transition-transform">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>


        {/* How it works */}
        <section className="py-24 px-6 max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 rounded-full bg-blue-100 text-blue-600 text-xs uppercase tracking-widest font-bold mb-4 border border-blue-200">The Process</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#1e3a5f]">From Complaint → Action</h2>
          </div>

          <div className="relative">
            <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-orange-200 via-orange-400 to-orange-200 hidden md:block"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              {[
                { step: '01', icon: 'smartphone', title: 'Citizen Submits', desc: 'Voice, text, or WhatsApp in any language' },
                { step: '02', icon: 'psychology', title: 'AI Analyzes', desc: 'Category, priority score, evidence collected' },
                { step: '03', icon: 'analytics', title: 'MP Reviews', desc: 'Ranked dashboard with full justification' },
                { step: '04', icon: 'task_alt', title: 'Action Taken', desc: 'Data-driven decision, real impact' },
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center group">
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-lg border border-gray-100 flex items-center justify-center text-2xl mb-4 group-hover:-translate-y-2 transition-transform duration-300">
                    <span className="material-symbols-outlined text-3xl text-orange-500" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                  </div>
                  <span className="text-xs font-black text-orange-500 tracking-widest mb-1">{item.step}</span>
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-6 text-center">
          <div className="max-w-4xl mx-auto bg-orange-50/50 border border-orange-100 rounded-[2rem] p-12 md:p-16">
            <h2 className="text-3xl md:text-4xl font-black text-[#1e3a5f] mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-500 mb-8 text-lg">Submit your complaint in seconds. Your MP will know exactly why it matters.</p>
            <Link to="/submit" className="inline-block bg-orange-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 shadow-sm">
              <span className="flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-xl">mic</span> Raise Your Voice Now
              </span>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <div className="text-2xl font-black text-[#1e3a5f]">Jan<span className="text-orange-500">Vaani</span></div>
            <p className="text-gray-500 text-sm mt-1">© 2026 JanVaani. AI for Democracy.</p>
          </div>
          <div className="flex gap-6">
            {['About', 'Privacy', 'Terms', 'Contact'].map(l => (
              <Link key={l} to="#" className="text-gray-500 hover:text-orange-500 transition-colors text-sm font-medium">{l}</Link>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
};

export default LandingPage;
