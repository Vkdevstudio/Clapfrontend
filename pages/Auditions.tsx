
import React from 'react';
import { MOCK_AUDITIONS } from '../constants';
import { 
  Calendar, 
  DollarSign, 
  MapPin, 
  Tag, 
  ChevronRight, 
  Search, 
  Filter, 
  Zap, 
  Clock, 
  ShieldCheck,
  TrendingUp,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 max-w-[1600px] mx-auto px-0 md:px-4">
      
      {/* 1. CINEMATIC HUB HEADER */}
      <header className="px-6 md:px-0 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#DC2626]" />
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Opportunity Registry • v4.2</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Cast & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Setup.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl min-w-[200px] text-center hidden lg:block">
                <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Global Active Calls</p>
                <p className="text-4xl font-cinematic font-bold text-white tracking-widest">{MOCK_AUDITIONS.length.toString().padStart(2, '0')}</p>
             </div>
             <button className="w-full sm:w-auto px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale">
               Sync My Profile
             </button>
          </div>
        </div>

        {/* 2. TACTICAL TOOLBAR */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search by role, project, or unit..." 
              className="w-full bg-neutral-900/50 backdrop-blur-3xl border border-white/5 rounded-[1.5rem] md:rounded-[2rem] pl-16 pr-6 py-6 md:py-8 text-sm md:text-lg font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800 uppercase tracking-widest"
            />
          </div>
          <div className="flex gap-4 h-full">
            <button className="flex-1 lg:flex-none px-8 py-6 bg-neutral-900 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-3 active-scale">
              <Filter size={18} /> Filters
            </button>
            <button className="flex-1 lg:flex-none px-8 py-6 bg-neutral-900 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-3 active-scale">
              <TrendingUp size={18} /> Sort
            </button>
          </div>
        </div>
      </header>

      {/* 3. OPPORTUNITY MATRIX */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-10 px-4 md:px-0">
        {MOCK_AUDITIONS.map((audition, i) => (
          <div 
            key={audition.id} 
            onClick={() => navigate(`/auditions/${audition.id}`)}
            className="group relative bg-neutral-900 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden hover:border-red-600/40 transition-all duration-500 cursor-pointer shadow-3xl active-scale flex flex-col h-full"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Poster Region */}
            <div className="aspect-[16/10] sm:aspect-square md:aspect-[16/11] relative overflow-hidden bg-black">
              <img 
                src={audition.image} 
                alt={audition.roleName} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-90" />
              
              {/* Tally & Status Logic */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white shadow-2xl">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                     <span className="text-[8px] font-black uppercase tracking-widest">LIVE CALL</span>
                  </div>
                </div>
                <button className="p-3 bg-black/60 backdrop-blur-xl rounded-2xl border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* Poster Meta */}
              <div className="absolute bottom-8 left-8 right-8 space-y-2">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] leading-none">{audition.projectTitle}</p>
                <h3 className="text-4xl md:text-5xl font-cinematic font-black text-white tracking-widest uppercase leading-none group-hover:text-red-500 transition-colors">
                  {audition.roleName}
                </h3>
              </div>
              
              {i === 0 && <div className="scanline opacity-[0.05]" />}
            </div>

            {/* Tactical Detail Region */}
            <div className="p-8 md:p-10 space-y-8 flex-1 flex flex-col">
              <p className="text-neutral-500 text-sm md:text-lg font-medium leading-relaxed line-clamp-2 italic">
                "{audition.roleDescription}"
              </p>

              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
                    <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Rate Log</p>
                    <p className="text-xl font-cinematic font-bold text-green-500 tracking-widest">{audition.payScale}</p>
                 </div>
                 <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
                    <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Deadline</p>
                    <div className="flex items-center gap-2 text-white font-bold">
                       <Clock size={14} className="text-red-500" />
                       <span className="text-xs uppercase">{audition.deadline.split('-')[2]} NOV</span>
                    </div>
                 </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {audition.tags?.slice(0, 3).map(tag => (
                  <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800/50 border border-white/5 text-neutral-400 text-[9px] rounded-xl font-black uppercase tracking-widest group-hover:border-red-600/30 transition-colors">
                    <Tag size={10} className="text-red-500" /> {tag}
                  </span>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                      <ShieldCheck size={20} />
                   </div>
                   <div className="space-y-0.5">
                      <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">PPA Verified</p>
                      <p className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest">Escrow Active</p>
                   </div>
                </div>
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                  Initialize <ChevronRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 4. "SYNC NEW CALL" PROMPT */}
        <div className="group border-2 border-dashed border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] flex flex-col items-center justify-center p-12 text-center space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all cursor-pointer active-scale min-h-[500px]">
           <div className="w-20 h-20 bg-neutral-900 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center text-neutral-700 group-hover:text-red-500 group-hover:rotate-12 transition-all duration-500 border border-white/5 shadow-2xl">
              <Zap size={32} />
           </div>
           <div className="space-y-2">
              <h4 className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Post Global Call</h4>
              <p className="text-[10px] md:text-xs text-neutral-600 font-bold uppercase tracking-widest max-w-[200px] mx-auto">Dispatch a verified casting call to the global talent slate.</p>
           </div>
           <div className="px-6 py-2 bg-white/5 rounded-full border border-white/5 text-[9px] font-black text-neutral-700 uppercase tracking-widest group-hover:text-white transition-colors">
             Genie Matching Active
           </div>
        </div>
      </div>

      {/* 5. SYSTEM FOOTER */}
      <footer className="mt-16 text-center px-4 border-t border-white/5 pt-12 opacity-30">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • TALENT REGISTRY v4.2</p>
          <div className="flex items-center gap-3 text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.6em]">
            <MapPin size={14} className="text-red-500" /> GLOBAL MISSION NODE
          </div>
          <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.6em]">ENCRYPTED RSA-4096</p>
        </div>
      </footer>
    </div>
  );
};

export default Auditions;
