
import React, { useState, useEffect } from 'react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { UserRole, User } from '../types';
import { 
  Clapperboard, Target, Award, Eye, Flame, 
  Activity, MapPin, Sparkles, ChevronRight, Zap,
  ShieldAlert, Clock, AlertCircle, Phone,
  Calendar, FileText, Monitor, Radio, Square, Play,
  Users, TrendingUp, ShieldCheck, CheckCircle2, Loader2
} from 'lucide-react';
import { MOCK_CALL_SHEETS, MOCK_PROJECTS } from '../constants';

const { useNavigate } = ReactRouterDOM;

const Dashboard: React.FC<{ role: UserRole; user?: User }> = ({ role, user }) => {
  const navigate = useNavigate();
  const [isAckLoading, setIsAckLoading] = useState(false);
  const [isAcked, setIsAcked] = useState(false);

  const isProduction = role === 'production' || role === 'admin';
  const isHired = user?.isHired || localStorage.getItem('clap_is_hired') === 'true';

  // Active Mission Logic
  const project = MOCK_PROJECTS[0];
  const activeCallSheet = MOCK_CALL_SHEETS[0];
  const delayedCrew = Object.entries(activeCallSheet.crewAcknowledgements)
    .filter(([_, ack]) => ack.status === 'Delayed');

  const handleAcknowledge = () => {
    setIsAckLoading(true);
    // Simulation: Handshake back to Production Ledger
    setTimeout(() => {
      setIsAckLoading(false);
      setIsAcked(true);
    }, 1500);
  };

  // HIRED TALENT DASHBOARD (The HUD)
  if (isHired && role === 'talent') {
    return (
      <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 max-w-7xl mx-auto">
        {/* 1. MISSION STATUS HERO */}
        <div className="bg-red-600 p-8 md:p-16 rounded-[4rem] shadow-4xl border border-red-500 flex flex-col lg:flex-row items-center justify-between gap-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-[5s]">
              <Target size={300} />
           </div>
           
           <div className="space-y-6 relative z-10 text-center lg:text-left">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                 <div className="px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-[10px] font-black uppercase tracking-widest animate-pulse">
                    ON MISSION • DAY 12
                 </div>
                 <span className="text-white/60 font-bold uppercase tracking-widest text-[10px]">{project.title}</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
                 ACTIVE <br />
                 <span className="text-neutral-900/40">HUD.</span>
              </h1>
              <p className="text-white/80 text-lg md:text-xl font-medium max-w-md italic">
                "Welcome back, {user?.name || 'Arjun'}. You are scheduled for 06:00 Call at Sector 4."
              </p>
           </div>

           <div className="bg-black/40 backdrop-blur-2xl border border-white/20 p-10 rounded-[3rem] space-y-6 min-w-[320px] shadow-3xl">
              <div className="flex justify-between items-end border-b border-white/10 pb-4">
                 <p className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">Time to Call</p>
                 <p className="text-3xl font-cinematic font-bold text-red-500 tracking-widest">04:12:00</p>
              </div>
              <div className="space-y-4">
                 <button onClick={() => navigate('/workspace')} className="w-full py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] active-scale shadow-xl flex items-center justify-center gap-3">
                    <MapPin size={16} /> ENTER SET CONTROL
                 </button>
                 <button onClick={() => navigate('/script')} className="w-full py-4 bg-neutral-900 text-neutral-400 font-black rounded-2xl text-[9px] uppercase tracking-[0.3em] border border-white/5 active-scale">
                    READ MY SIDES
                 </button>
              </div>
           </div>
        </div>

        {/* 2. HANDSHAKE LOOP: CALL SHEET ACKNOWLEDGEMENT */}
        <section className="animate-in slide-in-from-top-4 duration-700">
           <div className={`p-8 md:p-12 rounded-[3.5rem] border transition-all duration-700 flex flex-col md:flex-row items-center justify-between gap-8 ${
             isAcked ? 'bg-green-600/10 border-green-500/30' : 'bg-neutral-900 border-white/5 shadow-2xl'
           }`}>
              <div className="flex items-center gap-8">
                 <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border transition-all ${
                   isAcked ? 'bg-green-600 text-white border-green-500' : 'bg-neutral-800 text-neutral-600 border-white/5'
                 }`}>
                    {isAcked ? <CheckCircle2 size={40} /> : <Radio size={40} />}
                 </div>
                 <div className="space-y-1 text-center md:text-left">
                    <h3 className={`text-2xl md:text-3xl font-cinematic font-bold uppercase tracking-widest ${isAcked ? 'text-green-500' : 'text-white'}`}>
                      {isAcked ? 'Call Confirmed' : 'Call Sheet Handshake'}
                    </h3>
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                       {isAcked ? 'LOCKED TO PRODUCTION LEDGER' : 'Action Required: Acknowledge 06:00 Call Time'}
                    </p>
                 </div>
              </div>
              
              {!isAcked && (
                <button 
                  onClick={handleAcknowledge}
                  disabled={isAckLoading}
                  className="w-full md:w-auto px-12 py-5 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-red-700 active-scale transition-all flex items-center justify-center gap-3"
                >
                   {isAckLoading ? <Loader2 size={18} className="animate-spin" /> : 'CONFIRM PRESENCE'}
                </button>
              )}
           </div>
        </section>

        {/* 3. LOGISTICS GRID */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-red-500">
                 <ShieldCheck size={20} />
                 <h3 className="text-lg font-cinematic font-bold tracking-widest uppercase">Safe Pay</h3>
              </div>
              <div>
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Secured Escrow</p>
                 <p className="text-3xl font-cinematic font-bold text-white tracking-widest">₹5,00,000</p>
                 <p className="text-[8px] text-green-500 font-black uppercase mt-1">VERIFIED BY BANK NODE</p>
              </div>
           </div>
           <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-blue-500">
                 <Radio size={20} />
                 <h3 className="text-lg font-cinematic font-bold tracking-widest uppercase">Set Radio</h3>
              </div>
              <div className="space-y-3">
                 <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                    <p className="text-[10px] text-neutral-400 leading-relaxed italic">"Unit A is rolling on Scene 12B. Standby."</p>
                 </div>
                 <p className="text-[8px] text-neutral-600 font-black uppercase">LIVE FROM BASECAMP</p>
              </div>
           </div>
           <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-6 shadow-2xl">
              <div className="flex items-center gap-3 text-accent">
                 <Calendar size={20} />
                 <h3 className="text-lg font-cinematic font-bold tracking-widest uppercase">Schedule</h3>
              </div>
              <div className="space-y-2">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-neutral-500">Next Break</span>
                    <span className="text-white">13:00 PM</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase">
                    <span className="text-neutral-500">Target Wrap</span>
                    <span className="text-white">18:30 PM</span>
                 </div>
              </div>
           </div>
        </section>
      </div>
    );
  }

  // STANDARD DASHBOARD
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-32 max-w-7xl mx-auto">
      
      {/* 1. IDENTITY & VISIBILITY HERO */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 border-b border-white/5 pb-12 relative">
        <div className="space-y-6 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_15px_#22C55E]" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-green-500">
                {isProduction ? 'COMMAND CENTER ACTIVE • MASTER UNIT' : 'ACTIVE ON SLATE • MUMBAI REGION'}
              </p>
            </div>
            <h1 className="text-6xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              {isProduction ? 'SLATE' : '842'} <span className="text-red-600 font-sans text-2xl tracking-normal font-bold align-top ml-2">{isProduction ? 'STATUS' : 'CREDIT RATING'}</span>
            </h1>
          </div>
          
          <div className="flex flex-wrap items-center gap-6 text-neutral-500">
             <p className="text-2xl font-bold text-white tracking-widest uppercase italic">{user?.name || 'Vinod Director'}</p>
             <div className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
             <div className="flex items-center gap-2">
                <Award size={20} className="text-accent" />
                <p className="text-lg font-black text-accent tracking-widest uppercase">{isProduction ? 'Unit Lead' : 'Verified Talent'}</p>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
           <button 
            onClick={() => navigate(isProduction ? '/projects' : '/auditions')}
            className="bg-white px-12 py-6 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale"
           >
              {isProduction ? 'Manage Productions' : 'Browse Auditions'}
           </button>
        </div>
      </div>

      {/* 2. PRODUCTION REDLINE ALERT CENTER */}
      {isProduction && delayedCrew.length > 0 && (
        <section className="animate-in slide-in-from-top-8 duration-700">
           <div className="bg-red-600 p-8 md:p-12 rounded-[3.5rem] shadow-[0_30px_60px_-15px_rgba(220,38,38,0.4)] border border-red-500 flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-10 pointer-events-none">
                 <ShieldAlert size={150} />
              </div>
              <div className="flex items-center gap-8 relative z-10 text-center lg:text-left flex-col lg:flex-row">
                 <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center border border-white/30 animate-pulse">
                    <Clock size={40} className="text-white" />
                 </div>
                 <div className="space-y-2">
                    <h3 className="text-3xl md:text-4xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Logistics Redline</h3>
                    <p className="text-white/80 text-[11px] md:text-sm font-black uppercase tracking-widest">
                       {delayedCrew.length} Unit Members reported "Delayed" for Scene 12B.
                    </p>
                 </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4 relative z-10 w-full lg:w-auto">
                 {delayedCrew.map(([id, ack]) => (
                    <div key={id} className="bg-black/20 backdrop-blur-xl border border-white/20 p-4 rounded-2xl flex items-center gap-4 group hover:bg-black/30 transition-all cursor-pointer">
                       <div className="space-y-0.5">
                          <p className="text-[10px] font-black text-white uppercase tracking-tight">{ack.name || 'Crew Member'}</p>
                          <p className="text-[8px] text-red-100 font-bold uppercase opacity-60 italic truncate max-w-[120px]">"{ack.reason}"</p>
                       </div>
                       <button className="p-2 bg-white/10 rounded-lg text-white hover:bg-red-500 transition-colors">
                          <Phone size={14} />
                       </button>
                    </div>
                 ))}
                 <button 
                   onClick={() => navigate('/workspace')}
                   className="px-10 py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-neutral-100 active-scale"
                 >
                    RE-ORCHESTRATE
                 </button>
              </div>
           </div>
        </section>
      )}

      {/* 3. PRODUCTION METRICS */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
         {[
           { label: isProduction ? 'Unit Sync' : 'Set Readiness', val: isProduction ? '98%' : '99%', icon: <Flame className="text-red-500" />, desc: isProduction ? 'Nominal latency' : 'Fully calibrated profile' },
           { label: isProduction ? 'Shooting Progress' : 'Agency Interest', val: isProduction ? '42%' : '1.4k', icon: <Activity className="text-blue-500" />, desc: isProduction ? '12/45 Days Complete' : 'Views this shoot cycle' },
           { label: isProduction ? 'Pending Approvals' : 'Verified Credits', val: isProduction ? '04' : '24', icon: <Target className="text-green-500" />, desc: isProduction ? 'Escrow releases ready' : 'On-chain production wraps' }
         ].map((stat, i) => (
           <div key={i} className="p-10 bg-neutral-900 border border-white/5 rounded-[3rem] space-y-6 hover:border-white/20 transition-all shadow-2xl active-scale">
              <div className="flex justify-between items-start">
                 <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                    {stat.icon}
                 </div>
              </div>
              <div>
                 <p className="text-[11px] font-black text-neutral-600 uppercase tracking-widest mb-1">{stat.label}</p>
                 <p className="text-5xl font-cinematic font-black tracking-widest text-white">{stat.val}</p>
                 <p className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest mt-2">{stat.desc}</p>
              </div>
           </div>
         ))}
      </section>

      {/* 4. QUICK ACTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         <section className="bg-gradient-to-br from-neutral-900 to-black border border-white/5 rounded-[4rem] p-12 relative overflow-hidden group">
            <div className="relative z-10 space-y-10">
               <div className="flex items-center gap-6">
                 <div className="w-16 h-16 bg-red-600 rounded-3xl flex items-center justify-center text-white shadow-3xl">
                   <Sparkles size={32} />
                 </div>
                 <h3 className="text-4xl font-cinematic font-black text-white uppercase tracking-widest">Next Command</h3>
               </div>
               <div className="p-8 bg-black/40 border border-white/5 rounded-[2.5rem] space-y-4">
                  <div className="flex justify-between items-center border-b border-white/5 pb-4">
                     <span className="text-[10px] font-black text-neutral-600 uppercase">Shoot Day 12</span>
                     <span className="text-[10px] font-black text-red-500 uppercase">Principal Photography</span>
                  </div>
                  <p className="text-xl font-cinematic font-bold text-white tracking-widest uppercase">{project.title}</p>
                  <p className="text-[9px] text-neutral-500 font-bold uppercase">Sector 4 - South Alleyway</p>
               </div>
               <button 
                onClick={() => navigate('/workspace')}
                className="w-full py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-neutral-200 transition-all active-scale"
               >
                  ENTER SET CONTROL
               </button>
            </div>
         </section>

         <section className="bg-neutral-900 border border-white/5 rounded-[4rem] p-12 space-y-10">
            <h3 className="text-4xl font-cinematic font-black text-white uppercase tracking-widest">Intelligence Feed</h3>
            <div className="space-y-6">
               {[
                 { label: 'Script Logic Updated', time: '12m ago', project: 'v3.2 Sync Complete' },
                 { label: 'Escrow Released', time: '2h ago', project: 'Unit A Catering' },
                 { label: 'New Crew Ingest', time: '1d ago', project: 'DOP Marcus T.' }
               ].map((act, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <div className="space-y-1">
                       <p className="text-lg font-cinematic font-bold text-white uppercase tracking-widest group-hover:text-red-500 transition-colors">{act.label}</p>
                       <p className="text-[9px] text-neutral-700 font-bold uppercase">{act.project} • {act.time}</p>
                    </div>
                    <ChevronRight size={18} className="text-neutral-800 group-hover:text-white transition-all" />
                 </div>
               ))}
            </div>
         </section>
      </div>
    </div>
  );
};

export default Dashboard;
