
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Camera, 
  Settings2, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Cpu, 
  Package, 
  CheckCircle2, 
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { MOCK_SERVICES } from '../constants';

const VendorCatalog: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');

  const stats = [
    { label: 'Asset Value', val: '₹85.4L', icon: <Package size={18}/>, color: 'text-blue-500' },
    { label: 'In Field', val: '14 Units', icon: <Activity size={18}/>, color: 'text-red-500' },
    { label: 'Bench Ready', val: '08 Units', icon: <CheckCircle2 size={18}/>, color: 'text-green-500' }
  ];

  return (
    <div className="space-y-6 md:space-y-12 animate-in fade-in duration-1000 pb-32 max-w-[1600px] mx-auto px-4 md:px-6">
      
      {/* 1. NEXUS HEADER */}
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_#2563EB]" />
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Inventory Nexus • ARRI Rentals Ltd.</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Asset <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-neutral-400">Catalogue.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <button 
              onClick={() => navigate('/my-services/new')}
              className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-white text-black font-black rounded-2xl text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3"
             >
               <Plus size={18} /> Initialize Asset
             </button>
          </div>
        </div>

        {/* 2. TELEMETRY RIBBON: Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <div key={i} className={`bg-neutral-900/50 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] space-y-4 group hover:border-blue-600/30 transition-all shadow-2xl overflow-hidden relative ${i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
               <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Cpu size={120} />
               </div>
               <div className="flex items-center gap-3 text-neutral-500">
                  {stat.icon}
                  <span className="text-[9px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
               </div>
               <p className={`text-4xl md:text-5xl font-cinematic font-bold tracking-widest ${stat.color}`}>{stat.val}</p>
               <div className="h-1 w-full bg-black rounded-full overflow-hidden">
                  <div className={`h-full bg-current ${stat.color} opacity-40 transition-all duration-1000`} style={{ width: '60%' }} />
               </div>
            </div>
          ))}
        </div>
      </header>

      {/* 3. INVENTORY MATRIX */}
      <div className="space-y-8 md:space-y-10">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6">
           <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-blue-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search serial, model, or unit..." 
                className="w-full bg-neutral-900 border border-white/5 rounded-[1.2rem] md:rounded-[1.5rem] pl-16 pr-6 py-5 md:py-6 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-neutral-800 uppercase tracking-widest"
              />
           </div>
           <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
              {['All', 'Ready', 'In Field', 'Bench'].map(t => (
                <button 
                  key={t}
                  onClick={() => setFilter(t)}
                  className={`whitespace-nowrap px-6 md:px-8 py-4 md:py-6 rounded-[1.2rem] md:rounded-[1.5rem] text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all border ${
                    filter === t ? 'bg-blue-600 border-blue-500 text-white shadow-xl shadow-blue-600/20' : 'bg-neutral-900 border-white/5 text-neutral-500'
                  }`}
                >
                  {t}
                </button>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {MOCK_SERVICES.map((asset, i) => (
            <div 
              key={asset.id} 
              onClick={() => navigate(`/services/${asset.id}`)}
              className="group bg-neutral-900 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden hover:border-blue-600/40 transition-all duration-500 shadow-3xl flex flex-col relative active-scale cursor-pointer"
            >
               {/* Asset Header/Image */}
               <div className="aspect-[16/10] relative overflow-hidden bg-black">
                  <img 
                    src={asset.image} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105" 
                    alt={asset.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                  
                  {/* Floating Status */}
                  <div className="absolute top-4 md:top-6 left-4 md:left-6 flex gap-2">
                     <span className={`px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border backdrop-blur-xl ${
                       asset.availability === 'Available' ? 'bg-green-600/20 border-green-600/30 text-green-500' : 'bg-red-600/20 border-red-600/30 text-red-500'
                     }`}>
                        {asset.availability === 'Available' ? 'READY' : 'IN FIELD'}
                     </span>
                  </div>
                  
                  <div className="absolute bottom-4 md:bottom-6 left-6 md:left-8">
                     <p className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">SN: {84200 + i}</p>
                     <h3 className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest group-hover:text-blue-500 transition-colors leading-none">
                        {asset.name}
                     </h3>
                  </div>
               </div>

               {/* Asset Data Hub */}
               <div className="p-6 md:p-10 space-y-6 md:space-y-8 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 md:gap-4">
                     <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
                        <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Rate (Daily)</p>
                        <p className="text-lg md:text-xl font-cinematic font-bold text-white tracking-widest">{asset.price}</p>
                     </div>
                     <div className="bg-black/40 border border-white/5 p-4 rounded-2xl space-y-1">
                        <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Utilization</p>
                        <p className="text-lg md:text-xl font-cinematic font-bold text-blue-500 tracking-widest">92%</p>
                     </div>
                  </div>

                  <div className="space-y-3">
                     <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-1">Key Technicals</p>
                     <div className="flex flex-wrap gap-2">
                        {asset.specs?.slice(0, 3).map(spec => (
                           <span key={spec} className="px-3 py-1.5 bg-neutral-800/50 border border-white/5 rounded-xl text-[8px] font-bold text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
                              {spec}
                           </span>
                        ))}
                     </div>
                  </div>

                  <div className="pt-6 md:pt-8 border-t border-white/5 mt-auto flex items-center justify-between">
                     <div className="flex items-center gap-3 text-neutral-500 group-hover:text-white transition-colors">
                        <Settings2 size={16} />
                        <span className="text-[9px] font-black uppercase tracking-widest">Diagnostics</span>
                     </div>
                     <button className="p-2.5 md:p-3 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-all shadow-lg">
                        <Maximize2 size={16} />
                     </button>
                  </div>
               </div>
               
               {i === 0 && <div className="scanline opacity-[0.05]" />}
            </div>
          ))}

          {/* New Asset Trigger */}
          <div 
            onClick={() => navigate('/my-services/new')}
            className="group border-2 border-dashed border-white/5 rounded-[2.5rem] md:rounded-[3rem] flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 hover:border-blue-600/30 hover:bg-blue-600/5 transition-all cursor-pointer active-scale min-h-[300px] md:min-h-[500px]"
          >
             <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center text-neutral-700 group-hover:text-blue-500 group-hover:rotate-12 transition-all duration-500 border border-white/5 shadow-2xl">
                <Plus size={32} />
             </div>
             <div className="space-y-2">
                <h4 className="text-xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-tight">Sync New Asset</h4>
                <p className="text-[9px] md:text-[10px] text-neutral-600 font-bold uppercase tracking-widest max-w-[180px] mx-auto">Register professional gear to the supply matrix.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCatalog;
