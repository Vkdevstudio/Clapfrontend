
import React, { useState } from 'react';
import { MOCK_APPLICATIONS } from '../constants';
import { Clock, CheckCircle2, ChevronRight, Briefcase, Search, Filter, Sparkles, AlertCircle, XCircle, Eye } from 'lucide-react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';

const { useNavigate } = ReactRouterDOM;

const Applications: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filteredApps = MOCK_APPLICATIONS.filter(app => {
    const matchesSearch = app.roleName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         app.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'All' || app.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'Selected': return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'Declined': return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'Viewed': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default: return 'bg-neutral-800 text-neutral-400 border-white/5';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Shortlisted': return <Sparkles size={14} />;
      case 'Selected': return <CheckCircle2 size={14} />;
      case 'Declined': return <XCircle size={14} />;
      case 'Viewed': return <Eye size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 max-w-6xl mx-auto px-4 md:px-0">
      <header className="space-y-4">
        <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tight uppercase text-white leading-none">My Missions.</h1>
        <p className="text-neutral-500 font-medium text-lg max-w-2xl">
          Tracking your active applications and job status in real-time.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500" size={20} />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-white/5 rounded-3xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase tracking-widest placeholder:text-neutral-800"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
          {['All', 'Applied', 'Viewed', 'Shortlisted', 'Selected'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                activeFilter === filter ? 'bg-white text-black border-white shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6">
        {filteredApps.map((app) => (
          <div 
            key={app.id} 
            onClick={() => navigate(`/applications/${app.id}`)}
            className="group bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-[3.5rem] flex flex-col md:flex-row md:items-center justify-between gap-8 hover:border-red-600/30 transition-all cursor-pointer shadow-3xl bg-black/20 active-scale"
          >
            <div className="flex items-center gap-6 md:gap-10">
              <div className={`w-16 h-16 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center border transition-all ${getStatusStyle(app.status)}`}>
                <Briefcase size={32} />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl md:text-4xl font-cinematic font-bold tracking-widest uppercase text-white group-hover:text-red-500 transition-colors leading-none">{app.roleName}</h3>
                  {app.matchScore && (
                    <span className="px-3 py-1 bg-red-600/10 text-red-500 text-[8px] font-black rounded-full border border-red-600/20 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles size={10} /> {app.matchScore}% Match
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                  <span className="text-white/40">{app.productionName}</span>
                  <div className="w-1 h-1 rounded-full bg-neutral-800" />
                  <span>Applied {app.appliedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-10 border-t md:border-0 border-white/5 pt-6 md:pt-0">
              <div className="flex flex-col items-start md:items-end gap-2">
                <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Current Stage</p>
                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full border shadow-lg ${getStatusStyle(app.status)}`}>
                  {getStatusIcon(app.status)}
                  {app.status}
                </div>
              </div>
              <ChevronRight className="text-neutral-800 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
            </div>
          </div>
        ))}

        {filteredApps.length === 0 && (
          <div className="text-center py-40 bg-neutral-900/10 rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center gap-8">
            <div className="p-10 bg-neutral-900 rounded-[3rem] border border-white/5 text-neutral-800">
               <Briefcase size={80} />
            </div>
            <div className="space-y-4">
               <h3 className="text-4xl font-cinematic font-bold text-neutral-700 uppercase tracking-widest">No matching jobs</h3>
               <p className="text-neutral-600 max-w-sm mx-auto font-medium">Your mission slate is clear. Find new opportunities in the Discovery hub.</p>
            </div>
            <button 
              onClick={() => navigate('/discover')}
              className="bg-red-600 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/30"
            >
              GO TO DISCOVERY
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
