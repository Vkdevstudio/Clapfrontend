
import React from 'react';
import { MOCK_AUDITIONS } from '../constants';
import { Calendar, DollarSign, MapPin, Tag, ChevronRight, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Auditions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1">
          <h2 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter">OPPORTUNITY HUB</h2>
          <p className="text-neutral-500 text-lg font-medium">Discover verified casting calls and project breakthroughs.</p>
        </div>
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder="Search roles or projects..." 
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-1 focus:ring-red-600 transition-all text-sm font-medium"
          />
        </div>
      </header>

      <div className="grid gap-8">
        {MOCK_AUDITIONS.map((audition) => (
          <div 
            key={audition.id} 
            onClick={() => navigate(`/auditions/${audition.id}`)}
            className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/30 transition-all group cursor-pointer shadow-2xl"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-72 aspect-video md:aspect-square overflow-hidden bg-black relative">
                <img 
                  src={audition.image} 
                  alt={audition.roleName} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/40 to-transparent md:hidden" />
              </div>
              <div className="flex-1 p-10 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="text-4xl font-cinematic font-bold text-white tracking-wide uppercase group-hover:text-red-500 transition-colors">{audition.roleName}</h3>
                    <p className="text-neutral-500 text-sm font-bold uppercase tracking-widest">{audition.projectTitle}</p>
                  </div>
                  <div className="flex items-center gap-1.5 text-accent font-black text-xs bg-accent/10 px-4 py-2 rounded-full border border-accent/20 tracking-widest uppercase">
                    <DollarSign size={16} />
                    {audition.payScale}
                  </div>
                </div>

                <p className="text-lg text-neutral-400 line-clamp-2 font-medium leading-relaxed">{audition.roleDescription}</p>

                <div className="flex flex-wrap gap-3">
                  {audition.tags?.map(tag => (
                    <span key={tag} className="flex items-center gap-1.5 px-4 py-2 bg-black border border-white/5 text-neutral-500 text-[10px] rounded-xl font-black uppercase tracking-widest">
                      <Tag size={12} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                  <div className="flex items-center gap-8 text-[10px] text-neutral-500 font-black uppercase tracking-widest">
                    <span className="flex items-center gap-2">
                      <Calendar size={18} className="text-red-500" /> Deadline: {audition.deadline}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin size={18} className="text-blue-500" /> Mumbai (On-Set)
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-[11px] font-black rounded-xl transition-all shadow-xl shadow-red-600/20 uppercase tracking-[0.2em]">
                    VIEW ROLE DETAILS <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auditions;
