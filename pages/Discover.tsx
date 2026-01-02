
import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, CheckCircle, ArrowUpRight, TrendingUp, SlidersHorizontal, Grid, List } from 'lucide-react';
import { MOCK_PROJECTS, MOCK_TALENT, MOCK_SERVICES } from '../constants';

const Discover: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'talent' | 'projects' | 'services'>('projects');
  
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter text-white">GLOBAL DISCOVERY</h1>
          <p className="text-neutral-500 text-lg font-medium">Curated professional network for the modern film industry.</p>
        </div>
        <div className="flex bg-neutral-900 border border-white/5 rounded-2xl p-1.5 p-1 backdrop-blur-3xl shadow-2xl">
          {[
            { id: 'projects', label: 'SLATE' },
            { id: 'talent', label: 'TALENT' },
            { id: 'services', label: 'VENDORS' }
          ].map(cat => (
            <button 
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                activeCategory === cat.id ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' : 'text-neutral-500 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      {/* Dynamic Filter Bar */}
      <div className="grid md:grid-cols-12 gap-4">
        <div className="md:col-span-8 relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={`Search ${activeCategory}...`}
            className="w-full bg-neutral-900 border border-white/5 rounded-3xl pl-16 pr-6 py-5 outline-none focus:ring-1 focus:ring-red-600/50 transition-all shadow-2xl font-medium"
          />
        </div>
        <div className="md:col-span-4 flex gap-4">
           <button className="flex-1 flex items-center justify-center gap-3 bg-neutral-900 border border-white/5 rounded-3xl px-6 py-5 hover:bg-neutral-800 transition-all font-bold text-xs uppercase tracking-widest">
             <SlidersHorizontal size={18} /> Filters
           </button>
           <div className="bg-neutral-900 border border-white/5 rounded-3xl p-2 flex gap-1 shadow-2xl">
             <button className="p-3 bg-neutral-800 rounded-2xl text-white shadow-xl"><Grid size={18} /></button>
             <button className="p-3 text-neutral-600 hover:text-white transition-colors"><List size={18} /></button>
           </div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeCategory === 'projects' && MOCK_PROJECTS.map(project => (
          <div key={project.id} className="group rounded-[2.5rem] bg-neutral-900 border border-white/5 overflow-hidden hover:border-red-600/30 transition-all cursor-pointer flex flex-col h-full shadow-2xl bg-black">
            <div className="aspect-video w-full relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" />
              <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 text-white shadow-xl">
                {project.type}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <h4 className="font-cinematic text-3xl mb-3 group-hover:text-red-500 transition-colors tracking-wide text-white">{project.title}</h4>
              <p className="text-neutral-500 text-sm mb-6 line-clamp-2 leading-relaxed">{project.description}</p>
              <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                  <MapPin size={12} className="text-red-500" /> {project.location}
                </div>
                <button className="p-3 rounded-full bg-neutral-800 text-white group-hover:bg-red-600 transition-all">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {activeCategory === 'talent' && MOCK_TALENT.map(talent => (
          <div key={talent.id} className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 hover:border-red-600/30 transition-all group shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                <Star size={100} />
             </div>
             <div className="flex items-center gap-6 mb-8 relative z-10">
                <div className="relative">
                  <img src={talent.avatar} className="w-20 h-20 rounded-3xl border-2 border-neutral-800 group-hover:border-red-600 transition-all object-cover shadow-2xl" />
                  {talent.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-red-600 p-1.5 rounded-xl border-4 border-neutral-900 shadow-xl">
                       <CheckCircle size={10} className="text-white" />
                    </div>
                  )}
                </div>
                <div>
                   <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-red-500 transition-colors">{talent.name}</h4>
                   <p className="text-xs text-red-500 font-bold uppercase tracking-widest">{talent.specialty}</p>
                </div>
             </div>
             <div className="space-y-4 mb-8 relative z-10">
                <div className="flex gap-3">
                   {talent.skills?.slice(0, 3).map(skill => (
                     <span key={skill} className="px-3 py-1.5 bg-black border border-white/5 text-[10px] font-bold text-neutral-500 uppercase rounded-xl tracking-widest">{skill}</span>
                   ))}
                </div>
                <div className="flex items-center gap-6 text-xs text-neutral-500 font-bold uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><Star size={14} className="text-accent fill-accent" /> {talent.rating}</span>
                   <span className="flex items-center gap-1.5"><TrendingUp size={14} className="text-green-500" /> {talent.completedProjects} Projects</span>
                </div>
             </div>
             <div className="flex gap-2 relative z-10">
                <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-neutral-200 transition-all shadow-xl">VIEW REEL</button>
                <button className="px-6 py-4 bg-neutral-800 text-white font-bold rounded-2xl hover:bg-neutral-700 transition-all">HIRE</button>
             </div>
          </div>
        ))}

        {activeCategory === 'services' && MOCK_SERVICES.map(service => (
          <div key={service.id} className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden group hover:border-red-600/40 transition-all flex flex-col h-full shadow-2xl bg-black">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img src={service.image} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" alt={service.name} />
              <div className="absolute top-4 left-4">
                <span className="bg-black/60 backdrop-blur-md text-[10px] font-bold px-4 py-1.5 rounded-full text-red-500 uppercase tracking-widest border border-red-500/20">{service.category}</span>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <h4 className="text-2xl font-cinematic font-bold tracking-wide group-hover:text-red-500 transition-colors mb-2">{service.name}</h4>
                   <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-bold uppercase tracking-widest">
                      <Star size={14} className="text-accent fill-accent" /> 4.9 (High Demand)
                   </div>
                 </div>
                 <div className="text-right">
                   <p className="text-2xl font-bold text-white leading-none">{service.price}</p>
                   <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mt-1">/{service.unit}</p>
                 </div>
              </div>
              <div className="mt-auto flex gap-2">
                 <button className="flex-1 py-4 bg-red-600 hover:bg-red-700 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-red-600/20 uppercase tracking-widest">CHECK SLOTS</button>
                 <button className="px-6 py-4 bg-neutral-800 rounded-2xl border border-white/5 hover:bg-neutral-700 transition-all"><ArrowUpRight size={20} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty Search State Simulation */}
      {false && (
        <div className="py-32 flex flex-col items-center justify-center text-center space-y-6">
           <div className="w-24 h-24 bg-neutral-900 border border-white/5 rounded-[2rem] flex items-center justify-center text-neutral-700">
             <Search size={40} />
           </div>
           <div>
              <h3 className="text-3xl font-cinematic font-bold text-white">NO RESULTS FOUND</h3>
              <p className="text-neutral-500">Try adjusting your filters or searching a broader term.</p>
           </div>
           <button className="px-8 py-3 bg-red-600 text-white font-bold rounded-2xl">Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Discover;
