
import React, { useState } from 'react';
/* Fixed: Ensure named imports of useParams and useNavigate from react-router-dom */
import { useParams, useNavigate } from 'react-router-dom';
/* Fixed: Remove file extensions from imports */
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
  Download,
  Truck,
  Loader2
} from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const service = MOCK_SERVICES.find(s => s.id === id) || MOCK_SERVICES[0];

  const handleBooking = () => {
    setIsProcessing(true);
    // Procurement Bridge Simulation: Requirement 11.2
    setTimeout(() => {
      setIsProcessing(false);
      setIsBooked(true);
    }, 1500);
  };

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
                       <div className="bg-black/60 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black text-white uppercase">SHUTTER: 172.8°</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* PROCUREMENT FEEDBACK (Requirement 11.2) */}
           {isBooked && (
             <section className="bg-green-600 border border-green-500 rounded-[2.5rem] p-8 md:p-10 shadow-3xl animate-in zoom-in-95">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/30">
                         <Truck size={32} className="text-white" />
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Procurement Bridge Linked</h3>
                         <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Logistics Task Created for Project Basecamp</p>
                      </div>
                   </div>
                   <button 
                     onClick={() => navigate('/workspace')}
                     className="bg-white text-black px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] active-scale"
                   >
                      GO TO SLATE
                   </button>
                </div>
             </section>
           )}

           <section className="bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl space-y-8">
              <div className="flex items-center gap-4">
                 <Package size={24} className="text-blue-500" />
                 <h2 className="text-2xl md:text-3xl font-cinematic font-bold tracking-widest text-white uppercase">Technical Manifest</h2>
              </div>
              <p className="text-neutral-400 text-lg md:text-xl font-medium leading-relaxed italic">
                 "{service.description}"
              </p>
              <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
                 {service.specs.map((spec, i) => (
                    <div key={i} className="flex items-center gap-4 p-5 bg-black/40 border border-white/5 rounded-2xl group hover:border-blue-600/30 transition-all">
                       <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                          <Zap size={18} />
                       </div>
                       <span className="text-[11px] font-bold text-neutral-300 uppercase tracking-widest">{spec}</span>
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* 2. DISPATCH & BOOKING (Right Sidebar) */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
           <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 space-y-10 shadow-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                 <Zap size={200} />
              </div>

              <div className="space-y-6 relative z-10">
                 <div className="space-y-2">
                    <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">RENTAL LOGIC</p>
                    <div className="flex items-baseline gap-2">
                       <span className="text-5xl font-cinematic font-bold text-white tracking-widest">{service.price}</span>
                       <span className="text-[10px] font-black text-neutral-500 uppercase">/ {service.unit}</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-neutral-500">Security Deposit</span>
                          <span className="text-white">Escrow Secured</span>
                       </div>
                       <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                          <span className="text-neutral-500">Insurance PPA</span>
                          <span className="text-green-500">Compliant</span>
                       </div>
                    </div>
                    <button 
                       onClick={handleBooking}
                       disabled={isProcessing || isBooked}
                       className={`w-full py-6 md:py-8 rounded-[2rem] font-black text-[11px] md:text-[13px] uppercase tracking-[0.4em] shadow-3xl transition-all active-scale flex items-center justify-center gap-4 ${
                         isBooked ? 'bg-green-600 text-white shadow-green-600/20' : 'bg-blue-600 text-white shadow-blue-600/20 hover:bg-blue-700 disabled:opacity-50'
                       }`}
                    >
                       {isProcessing ? <Loader2 size={20} className="animate-spin" /> : 
                        isBooked ? <><CheckCircle size={20} /> MISSION LOCKED</> : <><ArrowRight size={20} /> INITIALIZE DISPATCH</>}
                    </button>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6 relative z-10">
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-blue-500 transition-colors">
                       <MessageSquare size={20} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">Unit Correspondence</p>
                       <p className="text-[8px] text-neutral-600 font-bold uppercase">Average response: 4m</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-500 group-hover:text-blue-500 transition-colors">
                       <Download size={20} />
                    </div>
                    <div className="space-y-0.5">
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">Download Tech Rider</p>
                       <p className="text-[8px] text-neutral-600 font-bold uppercase">PDF • 2.4 MB</p>
                    </div>
                 </div>
              </div>
           </div>

           <section className="p-8 bg-blue-600/5 border border-blue-600/20 rounded-[2.5rem] space-y-4">
              <div className="flex items-center gap-3 text-blue-500">
                 <Info size={18} />
                 <h4 className="text-[10px] font-black uppercase tracking-widest">Logistics Hub MUM-4</h4>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic">
                 "Dispatch available within 2 hours of booking for Mumbai Central Region. Secure Escrow payment required for first-time units."
              </p>
           </section>
        </aside>
      </div>
    </div>
  );
};

/* Added missing default export */
export default ServiceDetail;
