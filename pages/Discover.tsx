
import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, ChevronRight, Zap, Star, Briefcase, Sparkles, TrendingUp } from 'lucide-react';
import { MOCK_AUDITIONS } from '../constants';
/* Fixed: Explicit named import of useNavigate to resolve export error */
import { useNavigate } from 'react-router-dom';

const Discover: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20 max-w-7xl mx-auto px-4 md:px-0">
      <header className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-6 bg-red-600 rounded-full" />
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Opportunity Registry</p>
        </div>
        <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Find Your <br />Next Gig.</h1>
        <p className="text-neutral-500 font-medium text-lg md:text-xl">Discover real requirements from verified productions and vendors.</p>
      </header>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500" size={20} />
          <input 
            type="text" 
            placeholder="Search roles, projects, or locations..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-neutral-900 border border-white/5 rounded-3xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase tracking-widest"
          />
        </div>
        <button className="px-10 py-5 bg-neutral-900 border border-white/5 rounded-3xl text-[10px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all flex items-center justify-center gap-3">
          <Filter size={18} /> Filters
        </button>
      </div>

      {/* Opportunities List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_AUDITIONS.map((req, i) => (
          <div 
            key={req.id} 
            onClick={() => navigate(`/discover/${req.id}`)}
            className="group bg-neutral-900 border border-white/5 rounded-[3rem] overflow-hidden hover:border-red-600/30 transition-all cursor-pointer flex flex-col shadow-2xl bg-black/20 active-scale"
          >
            <div className="aspect-[16/10] relative overflow-hidden">
               <img src={req.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={req.roleName} />
               <div className="absolute top-4 left-4 flex flex-col gap-2">
                 <div className="flex gap-2">
                    {req.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10">
                        {tag}
                      </span>
                    ))}
                 </div>
                 {/* Feature Point 3: Smart Discovery Alerts/Match Score */}
                 <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                    <Sparkles size={10} /> {90 + i}% GENIE MATCH
                 </div>
               </div>
               {req.productionInfo?.isTrending && (
                 <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-xl">
                    <TrendingUp size={10} /> TRENDING
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            </div>
            
            <div className="p-8 space-y-6 flex-1 flex flex-col">
               <div className="space-y-2">
                  <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{req.projectTitle}</p>
                  <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">{req.roleName}</h3>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Where</p>
                     <p className="text-[10px] font-bold text-white uppercase truncate">{req.location.split(',')[0]}</p>
                  </div>
                  <div className="text-right space-y-1">
                     <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Pay</p>
                     <p className="text-[10px] font-black text-green-500 uppercase">{req.payScale}</p>
                  </div>
               </div>

               <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-2 text-neutral-500">
                     <Clock size={14} />
                     <span className="text-[9px] font-black uppercase tracking-widest">Closes {req.deadline.split('-')[2]} Nov</span>
                  </div>
                  <ChevronRight className="text-neutral-800 group-hover:text-white group-hover:translate-x-1 transition-all" size={20} />
               </div>
            </div>
          </div>
        ))}

        {/* Empty State / Coming Soon */}
        <div className="group border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-6 bg-black/10">
           <div className="w-16 h-16 bg-neutral-900 rounded-3xl flex items-center justify-center text-neutral-800">
              <Zap size={32} />
           </div>
           <p className="text-[10px] font-black text-neutral-800 uppercase tracking-widest">More Missions Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Discover;
