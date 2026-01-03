
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Truck, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  ShieldAlert, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Zap, 
  Activity, 
  Radio, 
  MoreVertical, 
  Calendar, 
  Box,
  Maximize2
} from 'lucide-react';
import { MOCK_BOOKINGS } from '../constants';

const VendorLogistics: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 md:space-y-12 animate-in fade-in duration-1000 pb-32 max-w-[1600px] mx-auto px-4 md:px-6">
      
      {/* 1. LOGISTICS HUB HEADER */}
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_#2563EB]" />
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Operational Control • Region Mumbai</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Dispatch <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-neutral-400">Control.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <div className="hidden lg:flex items-center gap-8 px-10 py-6 bg-neutral-900 border border-white/5 rounded-3xl">
                <div className="text-center space-y-1">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Active Dispatches</p>
                   <p className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">14</p>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="text-center space-y-1">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Today's Returns</p>
                   <p className="text-2xl font-cinematic font-bold text-blue-500 uppercase tracking-widest">04</p>
                </div>
             </div>
             <button className="w-full sm:w-auto px-8 md:px-10 py-5 md:py-6 bg-blue-600 text-white font-black rounded-2xl text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-blue-700 transition-all active-scale flex items-center justify-center gap-3">
               <Truck size={18} /> Global Dispatch View
             </button>
          </div>
        </div>
      </header>

      {/* 2. OPERATIONAL FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-0">
        
        {/* Main Feed */}
        <div className="lg:col-span-8 space-y-8 md:space-y-10">
           <section className="space-y-6">
              <div className="flex items-center justify-between px-2">
                 <h3 className="text-[10px] md:text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em]">Today's Operational Cycle</h3>
                 <span className="text-[8px] md:text-[9px] font-bold text-blue-500 uppercase tracking-widest animate-pulse">Live Tracking Active</span>
              </div>
              
              <div className="grid gap-3 md:gap-4">
                 {MOCK_BOOKINGS.map((booking, i) => (
                   <div 
                    key={booking.id} 
                    onClick={() => navigate(`/dispatch/${booking.id}`)}
                    className="group bg-neutral-900 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:border-blue-600/40 transition-all shadow-2xl relative overflow-hidden cursor-pointer active-scale"
                   >
                      <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center justify-between relative z-10">
                         {/* Mission Identity */}
                         <div className="flex items-center gap-6 md:gap-8 md:w-1/3">
                            <div className={`w-14 h-14 md:w-20 md:h-20 rounded-[1.2rem] md:rounded-[1.5rem] flex flex-col items-center justify-center border transition-all ${
                              i === 0 ? 'bg-blue-600 border-blue-500 text-white shadow-3xl shadow-blue-600/20' : 'bg-neutral-800 border-white/5 text-neutral-500'
                            }`}>
                               <span className="text-[7px] md:text-[8px] font-black uppercase tracking-tighter mb-0.5 opacity-40">Unit</span>
                               <span className="text-2xl md:text-4xl font-cinematic font-bold leading-none">{i % 2 === 0 ? 'A' : 'B'}</span>
                            </div>
                            <div className="space-y-1">
                               <p className="text-[9px] md:text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] leading-none">{booking.status}</p>
                               <h4 className="text-xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest group-hover:text-blue-500 transition-colors leading-none truncate">
                                  {booking.projectName}
                               </h4>
                               <p className="text-[8px] md:text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{booking.duration} Period • {booking.clientName}</p>
                            </div>
                         </div>

                         {/* Logistics Data */}
                         <div className="flex-1 grid grid-cols-2 gap-4 md:gap-8 border-y md:border-y-0 border-white/5 py-4 md:py-0">
                            <div className="space-y-1.5">
                               <div className="flex items-center gap-2 text-neutral-500">
                                  <Clock size={12} />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Expected Hub</span>
                               </div>
                               <p className="text-[11px] md:text-sm font-bold text-white uppercase tracking-tight">09:45 AM • Base Camp 4</p>
                            </div>
                            <div className="space-y-1.5">
                               <div className="flex items-center gap-2 text-neutral-500">
                                  <ShieldAlert size={12} className="text-red-500" />
                                  <span className="text-[8px] font-black uppercase tracking-widest">Integrity</span>
                               </div>
                               <p className="text-[11px] md:text-sm font-bold text-green-500 uppercase tracking-tight">PPA Verified</p>
                            </div>
                         </div>

                         {/* Tactical Actions */}
                         <div className="flex items-center gap-3 pt-2 md:pt-0">
                            {i === 0 ? (
                               <button className="flex-1 md:flex-none px-6 py-3.5 bg-white text-black font-black rounded-xl text-[9px] uppercase tracking-[0.3em] transition-all shadow-3xl hover:bg-neutral-200 active-scale flex items-center justify-center gap-2">
                                  <Zap size={12} fill="black" /> INITIALIZE
                               </button>
                            ) : (
                               <button className="p-3.5 bg-neutral-800 rounded-xl text-neutral-400 hover:text-white transition-all active-scale border border-white/5">
                                  <Radio size={16} />
                               </button>
                            )}
                            <button className="p-3.5 bg-black/40 rounded-xl text-neutral-700 hover:text-white transition-all">
                               <MoreVertical size={18} />
                            </button>
                         </div>
                      </div>
                      
                      {i === 0 && <div className="scanline opacity-[0.03]" />}
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Tactical Rail */}
        <aside className="lg:col-span-4 space-y-6 md:space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                <Activity size={200} />
              </div>
              <div className="flex items-center gap-4 text-blue-500 relative z-10">
                 <Radio size={24} className="animate-pulse" />
                 <h4 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase">System Intel</h4>
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] space-y-4 backdrop-blur-3xl group-hover:border-blue-600/40 transition-all">
                    <p className="text-[9px] font-black text-blue-500 uppercase tracking-widest">Logistics Delay Flag</p>
                    <p className="text-xs md:text-sm text-neutral-300 italic font-medium leading-relaxed">
                       "Sector 4 heavy traffic. Expected return delay: 20m."
                    </p>
                 </div>
                 <button className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all shadow-3xl shadow-blue-600/30">
                    ADJUST SCHEDULE
                 </button>
              </div>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl space-y-6 md:space-y-8">
              <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Asset Deployment Map</h4>
              <div className="space-y-6">
                 {[
                   { label: 'Warehouse', val: '92%', color: 'bg-green-500' },
                   { label: 'Unit A', val: '14 Units', color: 'bg-blue-500' },
                   { label: 'Uptime', val: '98.4%', color: 'bg-blue-600' }
                 ].map((m, i) => (
                   <div key={i} className="space-y-2.5">
                      <div className="flex justify-between items-end">
                         <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{m.label}</span>
                         <span className="text-lg font-cinematic font-bold text-white tracking-widest">{m.val}</span>
                      </div>
                      <div className="h-1 w-full bg-black rounded-full overflow-hidden">
                         <div className={`h-full transition-all duration-1000 ${m.color}`} style={{ width: '80%' }} />
                      </div>
                   </div>
                 ))}
              </div>
              <div className="pt-6 border-t border-white/5">
                 <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.3em] transition-all border border-white/5 active-scale flex items-center justify-center gap-3">
                    <Maximize2 size={14} /> FULL FLEET AUDIT
                 </button>
              </div>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default VendorLogistics;
