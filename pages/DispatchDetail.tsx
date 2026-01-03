
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Radio, 
  Zap, 
  CheckCircle2, 
  MoreVertical,
  Activity,
  ArrowUpRight,
  Package,
  FileText,
  AlertTriangle,
  LocateFixed
} from 'lucide-react';
import { MOCK_BOOKINGS } from '../constants';

const DispatchDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = MOCK_BOOKINGS.find(b => b.id === id) || MOCK_BOOKINGS[0];

  const timeline = [
    { time: '08:00 AM', status: 'In Transit', desc: 'Leaving Main Warehouse', active: true },
    { time: '07:45 AM', status: 'Loaded', desc: 'Technical QC Pass', active: false },
    { time: '07:00 AM', status: 'Initialized', desc: 'Escrow Locked', active: false }
  ];

  return (
    <div className="space-y-6 md:space-y-12 animate-in fade-in duration-500 pb-32 max-w-[1600px] mx-auto px-4 md:px-6">
      
      {/* Tactical Hub Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
        <div className="space-y-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Logistics</span>
          </button>
          
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-blue-600 rounded-full animate-pulse shadow-[0_0_15px_#2563EB]" />
              <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Dispatch ID • TRX-9428-CLAP</p>
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Mission <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-white">Deployment.</span>
            </h1>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto relative z-10">
           <button className="w-full sm:w-auto px-10 py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-red-700 transition-all active-scale flex items-center justify-center gap-3">
             <AlertTriangle size={18} /> Emergency Flag
           </button>
           <button className="w-full sm:w-auto px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3">
             <Radio size={18} /> Live Comms
           </button>
        </div>
      </header>

      {/* Main Command Center Layout */}
      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Col: Tracking & Route */}
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
           <section className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-3xl relative">
              <div className="aspect-[16/9] bg-neutral-950 relative overflow-hidden group">
                 {/* Visual Map Mockup */}
                 <div className="absolute inset-0 opacity-20 grayscale scale-125 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200')]" />
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
                 
                 {/* Live Tracking Graphics */}
                 <div className="absolute inset-0 p-12 flex flex-col justify-between">
                    <div className="flex justify-between">
                       <div className="bg-blue-600/20 backdrop-blur-xl border border-blue-600/30 px-6 py-3 rounded-2xl flex items-center gap-3">
                          <LocateFixed size={18} className="text-blue-500 animate-pulse" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Active Signal Locked</span>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-neutral-500 uppercase">Current Sector</p>
                          <p className="text-2xl font-cinematic font-bold text-white tracking-widest">MUMBAI_WEST_04</p>
                       </div>
                    </div>
                    
                    <div className="flex justify-between items-end">
                       <div className="space-y-2">
                          <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest leading-none">Destination Hub</p>
                          <p className="text-4xl font-cinematic font-bold text-white uppercase tracking-tighter leading-none">UNIT A BASECAMP</p>
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">EST. ARRIVAL</p>
                          <p className="text-5xl font-cinematic font-bold text-blue-500 leading-none">14:20</p>
                       </div>
                    </div>
                 </div>
              </div>
              
              {/* Telemetry Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border-t border-white/5">
                 {[
                   { label: 'Vehicle', val: 'MH-02-CS-9428', icon: <Truck size={14}/> },
                   { label: 'Payload', val: '8 Unit Pack', icon: <Package size={14}/> },
                   { label: 'Status', val: 'In Transit', icon: <Activity size={14}/> },
                   { label: 'Integrity', val: 'Verified', icon: <ShieldCheck size={14}/> }
                 ].map((stat, i) => (
                   <div key={i} className="bg-neutral-900 p-6 md:p-8 space-y-2">
                      <div className="flex items-center gap-2 text-neutral-600">
                         {stat.icon}
                         <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                      </div>
                      <p className="text-[11px] md:text-sm font-black text-white uppercase tracking-widest">{stat.val}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Chain of Custody (Timeline) */}
           <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 space-y-10 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Chain of Custody</h3>
                 <span className="text-[9px] font-black text-neutral-700 uppercase tracking-widest leading-none italic">Log Registry v4.2</span>
              </div>
              
              <div className="space-y-12 relative">
                 <div className="absolute left-6 top-2 bottom-2 w-px bg-white/5" />
                 {timeline.map((step, i) => (
                   <div key={i} className="flex gap-10 relative">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all ${
                        step.active ? 'bg-blue-600 border-blue-500 text-white shadow-3xl shadow-blue-600/20' : 'bg-neutral-800 border-white/5 text-neutral-600'
                      }`}>
                         {step.active ? <Activity size={20} /> : <CheckCircle2 size={20} />}
                      </div>
                      <div className="space-y-1">
                         <div className="flex items-center gap-4">
                            <span className="text-[10px] font-black text-white uppercase tracking-widest">{step.status}</span>
                            <span className="text-[9px] text-neutral-600 font-bold uppercase">{step.time}</span>
                         </div>
                         <p className="text-neutral-500 text-sm md:text-lg font-medium italic">"{step.desc}"</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Right Col: Logistics Management */}
        <aside className="lg:col-span-4 space-y-8">
           <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 space-y-10 shadow-3xl">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">LOGISTICS ENTITY</p>
                 <h2 className="text-3xl md:text-4xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">
                    {dispatch.projectName}
                 </h2>
                 <p className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.2em]">{dispatch.clientName}</p>
              </div>

              <div className="space-y-6">
                 <div className="p-6 bg-black/40 border border-white/10 rounded-[2rem] space-y-4">
                    <div className="flex items-center gap-4 text-white">
                       <FileText size={20} className="text-blue-500" />
                       <span className="text-[10px] font-black uppercase tracking-widest">Digital PPA Status</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-600 uppercase">Vendor Signature</span>
                       <span className="text-[9px] font-black text-green-500 uppercase">SIGNED</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-600 uppercase">Production Sign</span>
                       <span className="text-[9px] font-black text-white uppercase">AWAITING HANDOFF</span>
                    </div>
                 </div>

                 <div className="space-y-3">
                    <button className="w-full py-5 bg-blue-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-blue-700 transition-all active-scale">
                       SYNC HANDOFF TOKEN
                    </button>
                    <button className="w-full py-5 bg-neutral-800 border border-white/5 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-neutral-700 transition-all">
                       VIEW ASSET LIST
                    </button>
                 </div>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-700">Insurance ID</span>
                    <span className="text-white">PPA-9428-X</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-700">Dispatch Unit</span>
                    <span className="text-white">MUM_CENTRAL_01</span>
                 </div>
              </div>
           </div>
           
           <section className="bg-gradient-to-br from-red-900/20 to-black border border-red-600/30 p-10 rounded-[3rem] space-y-6 shadow-3xl group">
              <div className="w-14 h-14 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20 group-hover:scale-110 transition-transform">
                 <AlertTriangle size={28} />
              </div>
              <h4 className="text-xl md:text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Handoff Security</h4>
              <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed italic">
                 "Ensure the Unit A lead scans your dispatch QR before releasing equipment to the basecamp manager."
              </p>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default DispatchDetail;
