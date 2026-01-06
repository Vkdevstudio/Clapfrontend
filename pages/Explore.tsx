import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  ChevronRight, 
  MapPin, 
  Star, 
  Zap, 
  X, 
  Check, 
  TrendingUp, 
  ShieldCheck, 
  Maximize2,
  Clock,
  Briefcase
} from 'lucide-react';
import { MOCK_AUDITIONS } from '../constants';

const Explore: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  
  const [activeFilters, setActiveFilters] = useState({
    role: searchParams.get('role') || 'All',
    location: searchParams.get('location') || 'All',
    verified: searchParams.get('verified') === 'true',
    skill: searchParams.get('skill') || 'All'
  });

  const categories = ['All', 'Lead', 'Technical', 'Supporting', 'Production'];
  const locations = ['All', 'Mumbai', 'Chennai', 'London', 'L.A.'];

  // Update URL on filter change
  useEffect(() => {
    const params: Record<string, string> = {};
    if (searchTerm) params.q = searchTerm;
    if (activeFilters.role !== 'All') params.role = activeFilters.role;
    if (activeFilters.location !== 'All') params.location = activeFilters.location;
    if (activeFilters.verified) params.verified = 'true';
    if (activeFilters.skill !== 'All') params.skill = activeFilters.skill;
    setSearchParams(params);
  }, [searchTerm, activeFilters]);

  // Mock filtered data
  const filteredItems = MOCK_AUDITIONS.filter(item => {
    const matchesSearch = item.roleName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.projectTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const FilterPanel = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Unit Hierarchy</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveFilters({...activeFilters, role: cat})}
              className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                activeFilters.role === cat ? 'bg-red-600 border-red-500 text-white shadow-lg' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Registry Hub</h4>
        <div className="grid grid-cols-1 gap-2">
          {locations.map(loc => (
            <button 
              key={loc}
              onClick={() => setActiveFilters({...activeFilters, location: loc})}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                activeFilters.location === loc ? 'bg-red-600/10 border-red-600 text-white' : 'bg-black/40 border-white/5 text-neutral-600 hover:text-white'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-widest">{loc}</span>
              {activeFilters.location === loc && <Check size={14} />}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.4em]">Audit Preference</h4>
        <button 
          onClick={() => setActiveFilters({...activeFilters, verified: !activeFilters.verified})}
          className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
            activeFilters.verified ? 'bg-green-600/10 border-green-500 text-green-500' : 'bg-black/40 border-white/5 text-neutral-600'
          }`}
        >
          <div className="flex items-center gap-3">
             <ShieldCheck size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Verified Units Only</span>
          </div>
          <div className={`w-8 h-4 rounded-full relative transition-colors ${activeFilters.verified ? 'bg-green-600' : 'bg-neutral-800'}`}>
             <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${activeFilters.verified ? 'left-4.5' : 'left-0.5'}`} />
          </div>
        </button>
      </div>

      <button 
        onClick={() => {
            setActiveFilters({ role: 'All', location: 'All', verified: false, skill: 'All' });
            setSearchTerm('');
        }}
        className="w-full py-4 text-[9px] font-black text-neutral-700 uppercase tracking-[0.4em] hover:text-white transition-colors"
      >
        Reset Matrix
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-black animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-32">
      
      {/* 1. COMMAND HEADER */}
      <header className="px-6 py-10 border-b border-white/5 flex flex-col md:flex-row md:items-end justify-between gap-8 mb-10">
         <div className="space-y-2">
            <div className="flex items-center gap-3 text-red-500 mb-4">
               <TrendingUp size={20} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Mission Registry v4.2</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
               Explore <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-white">Registry.</span>
            </h1>
         </div>

         <div className="w-full md:w-[450px] space-y-4">
            <div className="relative group">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-700 group-focus-within:text-red-500 transition-colors" size={20} />
               <input 
                 type="text" 
                 placeholder="Search mission ledger..."
                 value={searchTerm}
                 onChange={e => setSearchTerm(e.target.value)}
                 className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800 uppercase tracking-widest"
               />
            </div>
         </div>
      </header>

      <div className="px-6 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* DESKTOP STICKY SIDEBAR */}
        <aside className="hidden lg:block lg:col-span-3 sticky top-32">
           <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 shadow-2xl max-h-[calc(100vh-160px)] overflow-y-auto scrollbar-hide">
              <FilterPanel />
           </div>
        </aside>

        {/* RESULTS GRID */}
        <main className="lg:col-span-9 space-y-8">
           <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-4">
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.4em]">Active Matches: {filteredItems.length}</p>
                 {activeFilters.skill !== 'All' && (
                    <span className="px-3 py-1 bg-red-600/10 text-red-500 rounded-full border border-red-600/20 text-[8px] font-black uppercase tracking-widest">
                       Skill: {activeFilters.skill}
                    </span>
                 )}
              </div>
              <button 
                onClick={() => setIsFilterSheetOpen(true)}
                className="lg:hidden flex items-center gap-2 px-5 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active-scale"
              >
                 <Filter size={14} /> Refine Matrix
              </button>
           </div>

           <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, i) => (
                <div 
                  key={item.id} 
                  onClick={() => navigate(`/discover/${item.id}`)}
                  className="group bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/40 transition-all duration-500 cursor-pointer shadow-3xl flex flex-col active-scale h-full"
                >
                   <div className="aspect-[16/10] relative overflow-hidden bg-black">
                      <img src={item.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" />
                      <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                         <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl">
                            <Star size={10} /> 94% MATCH
                         </div>
                      </div>
                   </div>
                   <div className="p-8 space-y-6 flex-1 flex flex-col">
                      <div className="space-y-1">
                         <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{item.projectTitle}</p>
                         <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest group-hover:text-red-500 transition-colors leading-none">{item.roleName}</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                         <div className="space-y-1">
                            <p className="text-[8px] font-black text-neutral-700 uppercase">Hub</p>
                            <span className="flex items-center gap-1.5 text-neutral-300 font-bold text-[10px] uppercase truncate">
                               <MapPin size={12} className="text-red-500 shrink-0" /> {item.location.split(',')[0]}
                            </span>
                         </div>
                         <div className="space-y-1 text-right">
                            <p className="text-[8px] font-black text-neutral-700 uppercase">Rate</p>
                            <span className="text-green-500 font-black text-[10px] uppercase">{item.payScale}</span>
                         </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 mt-auto flex items-center justify-between">
                         <div className="flex items-center gap-2 text-neutral-600">
                            <Clock size={12} />
                            <span className="text-[9px] font-bold uppercase">{item.deadline.split('-')[2]} NOV</span>
                         </div>
                         <ChevronRight size={16} className="text-neutral-700 group-hover:text-white transition-colors" />
                      </div>
                   </div>
                </div>
              ))}
           </div>

           {/* Empty State */}
           {filteredItems.length === 0 && (
             <div className="py-40 text-center space-y-8 animate-in zoom-in duration-700">
                <div className="w-24 h-24 bg-neutral-900 border border-white/5 rounded-[2.5rem] flex items-center justify-center mx-auto text-neutral-800 shadow-xl">
                   <Maximize2 size={40} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-4xl font-cinematic font-bold text-neutral-700 uppercase tracking-widest">No Matches Locked</h3>
                   <p className="text-neutral-600 font-medium italic max-w-sm mx-auto">The registry currently has zero missions matching your active matrix parameters.</p>
                </div>
                <button 
                    onClick={() => setActiveFilters({ role: 'All', location: 'All', verified: false, skill: 'All' })}
                    className="px-10 py-5 bg-neutral-900 border border-white/5 text-neutral-400 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:text-white transition-all"
                >
                    Recalibrate Hub
                </button>
             </div>
           )}
        </main>
      </div>

      {/* MOBILE BOTTOM SHEET FILTERS */}
      {isFilterSheetOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-md animate-in fade-in duration-500" onClick={() => setIsFilterSheetOpen(false)} />
           <div className="absolute bottom-0 left-0 right-0 bg-neutral-950 border-t border-white/10 rounded-t-[3rem] p-8 animate-in slide-in-from-bottom-full duration-500 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-10">
                 <div className="space-y-1">
                    <h2 className="text-3xl font-cinematic font-bold text-white tracking-widest uppercase leading-none">Matrix Parameters</h2>
                    <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Configure Registry Sync</p>
                 </div>
                 <button onClick={() => setIsFilterSheetOpen(false)} className="p-3 bg-neutral-900 rounded-xl text-neutral-500"><X size={20} /></button>
              </div>
              <FilterPanel />
              <div className="pt-12">
                 <button 
                  onClick={() => setIsFilterSheetOpen(false)}
                  className="w-full py-7 bg-red-600 text-white font-black rounded-[2rem] text-[12px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 active-scale"
                 >
                    Apply Logic Sync
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default Explore;