
import React, { useState, useEffect } from 'react';
import { UserRole } from '../types';
import { MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_MESSAGES, MOCK_BOOKINGS, MOCK_SCENES } from '../constants';
import { 
  Clock, 
  MapPin, 
  Clapperboard, 
  TrendingUp, 
  Zap,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  Package,
  Truck,
  Activity,
  ArrowDownLeft,
  ArrowRight,
  Info,
  Plus,
  Users as UsersIcon,
  DollarSign
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  // Simulate persistent state for acknowledgment
  const [acknowledged, setAcknowledged] = useState(() => {
    return localStorage.getItem('clap_call_acknowledged') === 'true';
  });
  const [showDelayModal, setShowDelayModal] = useState(false);
  
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  const isVendor = role === 'vendor';

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

  const handleAcknowledge = () => {
    setAcknowledged(true);
    localStorage.setItem('clap_call_acknowledged', 'true');
  };

  const handleReportDelay = (reason: string) => {
    setShowDelayModal(false);
    // In a real app, this would update the call sheet's acknowledgment status
    console.log(`Delay reported: ${reason}`);
  };

  // --- TODAY CARD COMPONENT ---
  const TodayCard = () => {
    if (isTalent) {
      return (
        <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 relative overflow-hidden shadow-3xl animate-in zoom-in duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Clock size={320} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${acknowledged ? 'bg-green-500' : 'bg-red-600 animate-pulse'}`} />
                <h2 className={`text-[11px] font-black uppercase tracking-[0.4em] ${acknowledged ? 'text-green-500' : 'text-red-500'}`}>
                  {acknowledged ? 'Call Confirmed' : 'Action Required'}
                </h2>
              </div>
              <div className="space-y-2">
                <p className="text-8xl md:text-9xl font-cinematic font-bold leading-none tracking-tighter">{callSheet.crewCall}</p>
                <p className="text-neutral-500 text-lg font-medium tracking-wide">Reporting for <span className="text-white font-bold">{project.title}</span></p>
              </div>
              <div className="flex flex-wrap gap-8">
                 <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <MapPin size={18} className="text-red-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{callSheet.location}</span>
                 </div>
                 <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <Clapperboard size={18} className="text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Scene {currentScene.number}</span>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-auto space-y-4">
              {!acknowledged ? (
                <button 
                  onClick={handleAcknowledge}
                  className="w-full md:w-80 py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 text-sm tracking-[0.2em] group"
                >
                  ACKNOWLEDGE CALL <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="w-full md:w-80 py-8 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-[2rem] flex items-center justify-center gap-3 text-sm tracking-[0.2em] animate-in fade-in zoom-in">
                  <CheckCircle2 size={24} /> CONFIRMED
                </div>
              )}
              <button 
                onClick={() => setShowDelayModal(true)}
                className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-400 font-bold rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle size={14} className="text-accent" /> Report Delay Without Shame
              </button>
            </div>
          </div>
        </section>
      );
    }

    if (isProduction) {
      return (
        <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 relative overflow-hidden shadow-3xl animate-in zoom-in duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Activity size={320} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-green-500">Live Production Slate</h2>
              </div>
              <div className="space-y-4">
                <p className="text-7xl md:text-8xl font-cinematic font-bold leading-none tracking-tighter uppercase">{project.title}</p>
                <div className="flex items-center gap-8">
                  <p className="text-neutral-500 text-2xl font-cinematic">Day {project.currentShootDay} <span className="text-neutral-700">/ {project.totalShootDays}</span></p>
                  <div className="flex-1 h-2 max-w-[200px] bg-neutral-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-600" style={{ width: `${project.progress}%` }} />
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-8 text-neutral-400 font-bold uppercase tracking-widest text-[10px]">
                 <span className="flex items-center gap-2.5"><Zap size={16} className="text-accent" /> Scene {currentScene.number} Active</span>
                 <span className="flex items-center gap-2.5"><UsersIcon size={16} className="text-blue-500" /> 42 Crew on Set</span>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button 
                onClick={() => navigate('/workspace')}
                className="w-full md:w-80 py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 text-sm tracking-[0.2em] group"
              >
                MISSION CONTROL <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      );
    }

    if (isVendor) {
      const nextBooking = MOCK_BOOKINGS[0];
      return (
        <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 relative overflow-hidden shadow-3xl animate-in zoom-in duration-700">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
            <Truck size={320} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="space-y-8 flex-1">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <h2 className="text-[11px] font-black uppercase tracking-[0.4em] text-blue-500">Logistics Workflow</h2>
              </div>
              <div className="space-y-4">
                <p className="text-7xl md:text-8xl font-cinematic font-bold leading-none tracking-tighter uppercase">{nextBooking.projectName}</p>
                <p className="text-neutral-500 text-xl font-medium tracking-wide">Pending: <span className="text-white font-bold">Premium ARRI Package v3</span></p>
              </div>
              <div className="flex flex-wrap gap-8">
                 <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <MapPin size={18} className="text-red-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Studio 4, Film City</span>
                 </div>
                 <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/5">
                    <Clock size={18} className="text-accent" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Due Today</span>
                 </div>
              </div>
            </div>
            <div className="w-full md:w-auto">
              <button 
                onClick={() => navigate('/bookings')}
                className="w-full md:w-80 py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 text-sm tracking-[0.2em] group"
              >
                START DISPATCH <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      );
    }
    return null;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20 max-w-7xl mx-auto">
      {/* Header Context */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Operational Status: Live</p>
          <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white uppercase">
            {isVendor ? 'Business Hub' : "Today's Focus"}
          </h1>
        </div>
        <div className="flex items-center gap-4">
           {isProduction && (
              <button 
                onClick={() => navigate('/projects/new')}
                className="bg-red-600 px-8 py-4 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] shadow-2xl shadow-red-600/30 flex items-center gap-2 hover:bg-red-700 transition-all"
              >
                <Plus size={16} /> New Production
              </button>
           )}
           {isVendor && (
              <div className="flex gap-4">
                <div className="bg-neutral-900 border border-white/5 p-4 rounded-2xl text-right">
                  <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Payouts</p>
                  <p className="text-2xl font-cinematic font-bold text-green-500">₹12.4L</p>
                </div>
                <div className="bg-neutral-900 border border-white/5 p-4 rounded-2xl text-right">
                  <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Queue Status</p>
                  <p className="text-2xl font-cinematic font-bold text-white">4 PENDING</p>
                </div>
              </div>
           )}
           <div className="flex items-center gap-4 text-neutral-600 text-[10px] font-bold uppercase tracking-widest bg-neutral-900 border border-white/5 px-5 py-4 rounded-2xl h-fit">
              <Clock size={14} /> {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
           </div>
        </div>
      </div>

      {/* THE TODAY CARD */}
      <TodayCard />

      {/* Secondary Intelligence Layer */}
      <div className="grid lg:grid-cols-12 gap-8">
         <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center px-4">
               <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Operational Stats</h3>
               <span className="text-[10px] font-bold text-neutral-500 flex items-center gap-2 tracking-widest uppercase font-black"><Activity size={12} /> Live Analytics</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
               <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-red-600/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-500 border border-red-600/20 group-hover:scale-110 transition-transform">
                     {isVendor ? <Package size={24} /> : <ShieldAlert size={24} />}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xl tracking-wide uppercase mb-2">
                        {isVendor ? 'Asset Utilization' : 'Continuity Watch'}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed font-medium">
                        {isVendor ? '94% of your camera inventory is currently active across 6 Mumbai projects.' : 'Genie detects Scene 12B requires "Prop A" from Scene 11. Ensuring Art Dept has logged prop transfer.'}
                    </p>
                  </div>
               </div>
               <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-blue-500/30 transition-all cursor-pointer">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:scale-110 transition-transform">
                     {isVendor ? <DollarSign size={24} /> : <TrendingUp size={24} />}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-xl tracking-wide uppercase mb-2">
                        {isVendor ? 'Revenue Forecast' : 'Slate Progress'}
                    </h4>
                    <p className="text-neutral-500 text-xs leading-relaxed font-medium">
                        {isVendor ? 'Expected ₹4.2L inflow from the Midnight Script wrap next Tuesday.' : 'Unit A is 15% ahead of today\'s page count. Suggested optimization: Prep Scene 14 lighting rig 1h early.'}
                    </p>
                  </div>
               </div>
            </div>
         </div>

         <div className="lg:col-span-4 space-y-8">
            <div className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                  <Activity size={120} />
               </div>
               <h4 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Recent Payouts</h4>
               <div className="space-y-6">
                  {[
                    { label: 'Cyberpunk Mumbai', amount: '₹45k', date: 'Oct 24' },
                    { label: 'Global Ad: Cola', amount: '₹2.8L', date: 'Oct 22' },
                    { label: 'The Midnight Script', amount: '₹1.2L', date: 'Oct 20' }
                  ].map((pay, i) => (
                    <div key={i} className="flex justify-between items-center group">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{pay.date}</p>
                        <p className="text-sm font-bold text-white uppercase group-hover:text-red-500 transition-colors">{pay.label}</p>
                      </div>
                      <p className="text-xl font-cinematic font-bold text-white">{pay.amount}</p>
                    </div>
                  ))}
                  <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all border border-white/5">
                    VIEW BANK LOGS
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Delay Modal (Global accessibility for talent/crew) */}
      {showDelayModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowDelayModal(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[3rem] p-12 max-w-lg w-full relative z-10 shadow-3xl animate-in zoom-in duration-300">
             <h2 className="text-3xl font-cinematic font-bold tracking-widest mb-4 uppercase">Delay Notification</h2>
             <p className="text-neutral-400 text-sm mb-8 leading-relaxed font-medium">Report status professionally. This goes directly to the logistics lead/AD to allow for schedule smoothing.</p>
             <div className="grid gap-3">
                {['Traffic Disruption', 'Health/Wellbeing', 'Equipment Failure', 'Transit Emergency'].map(reason => (
                  <button 
                    key={reason}
                    onClick={() => handleReportDelay(reason)}
                    className="w-full py-5 bg-neutral-800 hover:bg-red-600/20 text-neutral-300 font-bold rounded-2xl text-[10px] uppercase tracking-widest border border-white/5 transition-all text-left px-8 flex justify-between items-center group"
                  >
                    {reason} <ChevronRight size={16} className="text-neutral-700 group-hover:text-red-500 transition-all" />
                  </button>
                ))}
             </div>
             <button onClick={() => setShowDelayModal(false)} className="w-full mt-10 text-neutral-500 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors">CANCEL</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
