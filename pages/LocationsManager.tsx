
import React, { useState } from 'react';
import { MOCK_LOCATIONS, MOCK_SCENES } from '../constants';
import { 
  MapPin, 
  Plus, 
  Search, 
  ShieldAlert, 
  Clock, 
  ChevronRight, 
  Building2, 
  Trees, 
  Clapperboard,
  ArrowUpRight,
  MoreVertical,
  X,
  Check,
  Info
} from 'lucide-react';
import { LocationProfile, LocationType } from '../types';

const LocationsManager: React.FC = () => {
  const [locations, setLocations] = useState<LocationProfile[]>(MOCK_LOCATIONS);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLocations = locations.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    l.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: LocationType) => {
    switch (type) {
      case 'Studio': return <Building2 size={24} />;
      case 'Outdoor': return <Trees size={24} />;
      case 'Set': return <Clapperboard size={24} />;
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto px-4 md:px-0">
      
      {/* 1. HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_#2563EB]" />
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-400">Logistics Hub</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            Location <br /><span className="text-neutral-500">Registry.</span>
          </h1>
          <p className="text-neutral-500 text-sm md:text-lg font-medium italic max-w-lg">Requirement 6.4: Manage physical production nodes and site-specific constraints.</p>
        </div>

        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="px-10 py-6 bg-white text-black font-black rounded-2xl flex items-center gap-4 shadow-3xl active-scale"
        >
          <Plus size={20} /> REGISTER NEW PROFILE
        </button>
      </header>

      {/* 2. SEARCH & FILTER */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Search location profiles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-blue-600 transition-all uppercase tracking-widest placeholder:text-neutral-800"
            />
         </div>
      </div>

      {/* 3. LOCATIONS GRID */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredLocations.map(loc => (
          <div key={loc.id} className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-8 hover:border-blue-600/30 transition-all shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <MapPin size={200} />
             </div>
             
             <div className="flex justify-between items-start relative z-10">
                <div className="flex items-center gap-6">
                   <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-600/20">
                      {getIcon(loc.type)}
                   </div>
                   <div className="space-y-1">
                      <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{loc.type}</p>
                      <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">{loc.name}</h3>
                   </div>
                </div>
                <button className="p-3 text-neutral-700 hover:text-white transition-all"><MoreVertical size={20}/></button>
             </div>

             <div className="space-y-2 relative z-10">
                <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Address Node</p>
                <div className="p-5 bg-black/40 rounded-2xl border border-white/5 text-neutral-400 text-sm font-medium">
                   {loc.address}
                </div>
             </div>

             <div className="space-y-4 relative z-10">
                <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Site Constraints</p>
                <div className="flex flex-wrap gap-2">
                   {loc.constraints?.map(c => (
                     <span key={c} className="px-3 py-1 bg-red-600/10 border border-red-600/20 text-red-500 text-[8px] font-black uppercase rounded-lg flex items-center gap-2">
                        <ShieldAlert size={10} /> {c}
                     </span>
                   ))}
                   {(!loc.constraints || loc.constraints.length === 0) && <span className="text-[10px] text-neutral-700 font-bold italic">No active constraints logged.</span>}
                </div>
             </div>

             <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                   <div className="space-y-0.5">
                      <p className="text-[8px] font-black text-neutral-700 uppercase">Linked Scenes</p>
                      <p className="text-lg font-cinematic font-bold text-white tracking-widest">
                        {MOCK_SCENES.filter(s => s.locationId === loc.id).length} UNITS
                      </p>
                   </div>
                </div>
                <button className="flex items-center gap-2 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-white transition-colors">
                   Manage Site <ChevronRight size={14} />
                </button>
             </div>
          </div>
        ))}
      </div>

      {/* 4. CREATE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsCreateModalOpen(false)} />
           <div className="bg-neutral-900 border border-blue-600/30 rounded-[3rem] p-10 md:p-12 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500">
              <header className="flex justify-between items-start">
                 <div className="space-y-1">
                    <h2 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">Register Site</h2>
                    <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Initialization Protocol v4.2</p>
                 </div>
                 <button onClick={() => setIsCreateModalOpen(false)} className="p-2 hover:bg-white/5 rounded-lg text-neutral-500 transition-all"><X size={24}/></button>
              </header>

              <div className="space-y-8">
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Location Name</label>
                       <input type="text" placeholder="e.g. Skyline Rooftop" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-blue-600" />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Site Type</label>
                       <select className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-blue-600 appearance-none">
                          <option>Studio</option>
                          <option>Outdoor</option>
                          <option>Set</option>
                       </select>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Primary Address</label>
                    <input type="text" placeholder="Physical location for dispatch" className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-blue-600" />
                 </div>
                 <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4">
                    <Info size={20} className="text-blue-500 shrink-0" />
                    <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
                       Profiles registered here will be available to all department heads for scene linking and logistics triggers.
                    </p>
                 </div>
              </div>

              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="w-full py-6 bg-blue-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl active-scale"
              >
                 FINALIZE REGISTRATION
              </button>
           </div>
        </div>
      )}
    </div>
  );
};

export default LocationsManager;
