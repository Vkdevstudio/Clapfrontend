
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SERVICES } from '../constants';
import { 
  ChevronLeft, 
  MapPin, 
  Star, 
  Clock, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  CheckCircle, 
  Package, 
  Info, 
  Calendar, 
  Share2, 
  Award, 
  UserCheck, 
  MessageSquare,
  Activity,
  Settings,
  ArrowUpRight,
  Monitor,
  /* Fixed: Removed non-existent 'Tool' icon from lucide-react */
  Download
} from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const service = MOCK_SERVICES.find(s => s.id === id) || MOCK_SERVICES[0];

  return (
    <div className="space-y-6 md:space-y-12 animate-in fade-in duration-500 pb-32 max-w-[1600px] mx-auto px-4 md:px-6">
      {/* Back Button Overlay */}
      <div className="sticky top-20 z-40 md:relative md:top-0">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2.5 bg-neutral-900/80 backdrop-blur-xl border border-white/5 rounded-full text-neutral-400 hover:text-white transition-all group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-widest">Terminate View</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-start">
        
        {/* 1. TECHNICAL GALLERY (Left/Main) */}
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
           <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                 <span className="bg-blue-600/10 text-blue-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-600/20">{service.category}</span>
                 <span className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-green-500/20 flex items-center gap-2">
                   <UserCheck size={12} /> LOGISTICS READY
                 </span>
              </div>
              <h1 className="text-5xl sm:text-7xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
                 {service.name.split(' ').slice(0, -1).join(' ')} <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white">{service.name.split(' ').pop()}</span>
              </h1>
              <div className="flex flex-wrap gap-6 text-[10px] md:text-sm text-neutral-400 font-black uppercase tracking-widest border-t border-white/5 pt-6">
                 <span className="flex items-center gap-2"><MapPin size={16} className="text-red-500" /> Goregaon Hub</span>
                 <span className="flex items-center gap-2"><Star size={16} className="text-accent fill-accent" /> 4.9 Verified</span>
                 <span className="flex items-center gap-2"><Activity size={16} className="text-blue-500" /> 98% Uptime</span>
              </div>
           </header>

           {/* Hero Field Monitor View */}
           <div className="aspect-[16/10] md:aspect-video rounded-[2.5rem] md:rounded-[4rem] overflow-hidden border border-white/5 shadow-3xl bg-neutral-900 group relative">
              <img src={service.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
              
              {/* Field Monitor Overlays */}
              <div className="absolute inset-0 pointer-events-none p-6 md:p-12 flex flex-col justify-between">
                 <div className="flex justify-between items-start">
                    <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                       <Monitor size={18} className="text-red-500 animate-pulse" />
                       <span className="text-[10px] font-black text-white tracking-widest">FEED: MASTER_8K</span>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] font-black text-neutral-500 uppercase">Serial</p>
                       <p className="text-xl font-cinematic font-bold text-white tracking-widest">#84205-A</p>
                    </div>
                 </div>
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-px bg-white/10" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-px bg-white/10" />

                 <div className="flex justify-between items-end">
                    <div className="flex gap-6">
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase">FPS: 23.98</div>
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase">TEMP: 5600K</div>
                    </div>
                    <div className="flex gap-2">
                       {service.specs?.map(spec => (
                         <span key={spec} className="hidden sm:inline-block bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-[8px] font-black uppercase tracking-widest text-white">
                            {spec}
                         </span>
                       ))}
                    </div>
                 </div>
              </div>
           </div>

           {/* Tactical Specs Section */}
           <section className="grid md:grid-cols-2 gap-6 md:gap-8">
              <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-2xl">
                 <h3 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase flex items-center gap-3">
                    <Settings className="text-blue-500" /> Blueprint
                 </h3>
                 <p className="text-neutral-400 leading-relaxed font-medium text-lg italic">"{service.description}"</p>
                 <div className="grid grid-cols-2 gap-4 pt-4">
                    {['PL MOUNT', '8K RAW', '120 FPS', 'HDR-READY'].map(tag => (
                      <div key={tag} className="flex items-center gap-3 text-neutral-500 bg-black/40 p-4 rounded-xl border border-white/5">
                         <CheckCircle size={14} className="text-green-500" />
                         <span className="text-[9px] font-black uppercase tracking-widest">{tag}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-2xl overflow-hidden relative">
                 <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                    <Activity size={150} />
                 </div>
                 <h3 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase flex items-center gap-3 relative z-10">
                    <Zap className="text-red-500" /> Unit History
                 </h3>
                 <div className="space-y-4 relative z-10">
                    {[
                      { date: 'Oct 12', note: 'Sensor recalibration complete' },
                      { date: 'Sep 28', note: 'Firmware sync v4.2 applied' },
                      { date: 'Sep 15', note: 'PPA compliance verified' }
                    ].map((h, i) => (
                      <div key={i} className="flex gap-4 items-start">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest w-12">{h.date}</span>
                         <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{h.note}</p>
                      </div>
                    ))}
                 </div>
                 <button className="w-full py-4 mt-4 bg-neutral-800 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-500 hover:text-white transition-all flex items-center justify-center gap-2">
                    <Download size={14} /> Full Service Ledger
                 </button>
              </div>
           </section>
        </div>

        {/* 2. COMMAND RAIL (Right/Sidebar) */}
        <aside className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-32">
           <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-3xl">
              <div className="p-8 md:p-10 space-y-10">
                 <div className="space-y-3">
                    <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">DEPLOYMENT RATE</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-6xl md:text-7xl font-cinematic font-bold text-white tracking-wider leading-none">{service.price}</p>
                       <p className="text-xl font-cinematic text-neutral-700 font-bold uppercase">/{service.unit}</p>
                    </div>
                 </div>

                 <div className="bg-black/40 border border-white/10 rounded-3xl p-6 space-y-6">
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-blue-500 border border-white/5">
                          <Package size={24} />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Inventory Node</p>
                          <p className="text-sm font-black text-white uppercase tracking-widest">ARRI RENTALS LTD.</p>
                       </div>
                    </div>
                    <div className="flex gap-3">
                       <button className="flex-1 py-3 bg-neutral-900 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all">
                          MESSAGE
                       </button>
                       <button className="px-4 py-3 bg-neutral-900 border border-white/5 rounded-xl text-neutral-400 hover:text-white">
                          <Share2 size={16} />
                       </button>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {!isBooked ? (
                      <button 
                        onClick={() => setIsBooked(true)}
                        className="w-full py-6 md:py-8 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-3xl shadow-3xl shadow-blue-600/30 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[11px] active-scale"
                      >
                         <Zap size={20} /> INITIALIZE DISPATCH
                      </button>
                    ) : (
                      <div className="w-full py-6 md:py-8 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-3xl flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[11px] animate-in bounce-in">
                         <CheckCircle size={20} /> SYNCED TO LOGISTICS
                      </div>
                    )}
                    <div className="flex gap-4">
                       <button className="flex-1 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] border border-white/5 shadow-xl">
                          <Calendar size={18} /> CALENDAR
                       </button>
                       <button className="flex-1 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] border border-white/5 shadow-xl">
                          <ArrowRightLeft size={18} /> COMPARE
                       </button>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Smart Escrow</span>
                       <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck size={12} /> SECURED
                       </span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Transport</span>
                       <span className="text-[9px] font-black text-white uppercase tracking-widest">INCLUDED</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Context Intelligence Card */}
           <section className="p-8 md:p-10 bg-gradient-to-br from-blue-900/20 to-black border border-blue-600/30 rounded-[2.5rem] md:rounded-[3.5rem] space-y-6 shadow-3xl">
              <div className="flex items-center gap-4 text-blue-500">
                 <ShieldCheck size={28} />
                 <h4 className="text-xl md:text-2xl font-cinematic font-bold uppercase tracking-widest leading-none">Security <br />Assurance</h4>
              </div>
              <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed italic">
                 "This asset is covered by our Global Production Insurance. Any damage on set is instantly mediated via our digital ledger."
              </p>
           </section>
        </aside>
      </div>
    </div>
  );
};

const ArrowRightLeft = ({ className, size }: { className?: string, size?: number }) => <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>;

export default ServiceDetail;
