
import React, { useState } from 'react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  ShieldCheck, 
  Award, 
  Video, 
  Calendar,
  X,
  CheckCircle2
} from 'lucide-react';
import { MOCK_AUDITIONS } from '../constants';

const { useNavigate } = ReactRouterDOM;

const Auditions: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All Roles');

  const filters = ['All Roles', 'Actors', 'Dancers', 'Crew', 'Technicians'];

  return (
    <div className="min-h-screen bg-black animate-in fade-in duration-700 max-w-7xl mx-auto pb-32">
      
      {/* 1. REFINED HEADER */}
      <header className="px-6 py-10 md:py-16 space-y-8 border-b border-white/5">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="px-3 py-1 bg-red-600/10 border border-red-600/20 rounded-full flex items-center gap-2">
                <ShieldCheck size={12} className="text-red-500" />
                <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Verified Feed</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
              Official <br />
              <span className="text-neutral-500 tracking-normal font-sans text-3xl md:text-5xl">Auditions.</span>
            </h1>
            <p className="text-neutral-500 text-sm md:text-lg font-medium max-w-md">
              Real opportunities from verified productions. No noise, just the next step in your career.
            </p>
          </div>
          
          <div className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl hidden lg:block text-center min-w-[200px]">
             <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Active Callings</p>
             <p className="text-4xl font-cinematic font-bold text-white tracking-widest">{MOCK_AUDITIONS.length.toString().padStart(2, '0')}</p>
          </div>
        </div>

        {/* 2. HUMAN FILTERS & SEARCH */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by role or project..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase tracking-widest placeholder:text-neutral-800"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
            {filters.map(f => (
              <button 
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
                  activeFilter === f ? 'bg-white text-black border-white shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:text-white'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 3. AUDITION GRID */}
      <main className="px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {MOCK_AUDITIONS.map((audition, i) => (
            <div 
              key={audition.id}
              onClick={() => navigate(`/auditions/${audition.id}`)}
              className="group bg-neutral-900/40 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/30 transition-all duration-500 cursor-pointer shadow-2xl flex flex-col active-scale"
            >
              {/* Card Image/Poster */}
              <div className="aspect-[16/10] relative overflow-hidden bg-neutral-950">
                <img 
                  src={audition.image} 
                  alt={audition.roleName}
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Official Badge */}
                <div className="absolute top-6 left-6">
                   <div className="px-4 py-1.5 bg-red-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest flex items-center gap-2 shadow-2xl">
                      <Award size={10} /> Official Audition
                   </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <p className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-1">{audition.projectTitle}</p>
                   <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-none group-hover:text-red-500 transition-colors">
                      {audition.roleName}
                   </h3>
                </div>
              </div>

              {/* Card Details */}
              <div className="p-8 space-y-6 flex-1 flex flex-col">
                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Where</p>
                      <div className="flex items-center gap-1.5 text-white font-bold text-[10px] uppercase">
                         <MapPin size={12} className="text-red-500" /> {audition.location.split(',')[0]}
                      </div>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Payment</p>
                      <div className="flex items-center justify-end gap-1.5 text-green-500 font-black text-[10px] uppercase">
                         <DollarSign size={12} /> Paid Role
                      </div>
                   </div>
                </div>

                <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                   <div className="flex items-center gap-2 text-neutral-500">
                      <Clock size={14} />
                      <span className="text-[9px] font-black uppercase tracking-widest">Apply by {audition.deadline.split('-')[2]} Oct</span>
                   </div>
                   <div className="p-3 bg-neutral-800 rounded-xl text-neutral-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
                      <ChevronRight size={18} />
                   </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty/Add Prompt */}
          <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-12 text-center space-y-6 group hover:border-red-600/20 transition-all cursor-default min-h-[400px]">
             <div className="w-16 h-16 bg-neutral-900 rounded-3xl flex items-center justify-center text-neutral-800 group-hover:text-red-500 transition-colors">
                <CheckCircle2 size={32} />
             </div>
             <div className="space-y-2">
                <p className="text-xl font-cinematic font-bold text-neutral-600 tracking-widest uppercase">End of Slate</p>
                <p className="text-[10px] text-neutral-800 font-bold uppercase tracking-widest max-w-[180px] mx-auto">New verified audits are added daily. Stay synced.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Auditions;
