
import React, { useState } from 'react';
import { UserRole } from '../types';
import { MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_SCENES, MOCK_LOGS, MOCK_SERVICES, MOCK_BOOKINGS } from '../constants';
import { 
  Clock, MapPin, Clapperboard, TrendingUp, Zap, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldAlert, Activity, Plus, Users as UsersIcon, 
  DollarSign, FileText, Wand2, ArrowRight, Video,
  BrainCircuit, Truck, Wallet, Share2, Sparkles, Upload, Package, ArrowUpRight,
  Award
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const [showImporter, setShowImporter] = useState(false);
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  const isVendor = role === 'vendor';

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-20 max-w-7xl mx-auto px-1">
      {/* Role-Specific Hero: High Contrast Branding */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-red-600/10 blur-[100px] pointer-events-none hidden md:block" />
        <div className="space-y-4 md:space-y-6 relative z-10">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-red-600 pulse-status shadow-[0_0_15px_#DC2626]" />
            {/* FIX: Personalized Greeting based on Onboarding Choice */}
            <p className="text-[9px] md:text-[11px] font-black text-red-500 uppercase tracking-[0.3em] md:tracking-[0.5em]">
               Confirmed: {role.toUpperCase()} Nexus • Systems Online
            </p>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[8vw] font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            {isProduction ? 'Slate' : isTalent ? 'Session' : 'Nexus'}
          </h1>
          <div className="flex flex-wrap items-center gap-4 md:gap-8 text-neutral-500">
             <div className="flex items-center gap-2 md:gap-3">
                <p className="text-sm md:text-xl font-medium uppercase tracking-widest text-white/40">Entity:</p>
                <p className="text-sm md:text-xl font-bold text-white tracking-widest uppercase">{isVendor ? 'ARRI RENTALS' : project.title}</p>
             </div>
             <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-neutral-800" />
             <div className="flex items-center gap-2 md:gap-3">
                <p className="text-sm md:text-xl font-medium uppercase tracking-widest text-white/40">Protocol:</p>
                <p className="text-sm md:text-xl font-black text-red-600 tracking-widest">v4.2</p>
             </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
           {isProduction && (
              <button 
                onClick={() => setShowImporter(true)}
                className="bg-white px-8 md:px-10 py-4 md:py-6 rounded-2xl text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3 md:gap-4"
              >
                <Upload size={18} /> Breakdown AI
              </button>
           )}
           <button 
            onClick={() => navigate(isVendor ? '/my-services/new' : '/projects/new')}
            className="bg-red-600 px-10 md:px-12 py-4 md:py-6 rounded-2xl text-white font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] shadow-[0_15px_40px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-all active-scale flex items-center justify-center gap-3 md:gap-4"
           >
              <Plus size={18} /> {isVendor ? 'Deploy Asset' : 'New Project'}
           </button>
        </div>
      </div>

      {/* Metrics Rail: Visual Striking Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
         {[
           { 
             label: isVendor ? 'Net Yield' : 'Slate Escrow', 
             val: isVendor ? '₹12,45,000' : '₹45,00,000', 
             color: 'text-green-500', 
             bg: 'bg-green-500/10',
             border: 'border-green-500/20',
             icon: <Wallet size={28} />,
             desc: 'Verified & Secure'
           },
           { 
             label: isVendor ? 'Active Rentals' : 'Direct Spend', 
             val: isVendor ? '14 Units' : '₹1.25Cr', 
             color: 'text-red-500', 
             bg: 'bg-red-600/10',
             border: 'border-red-600/20',
             icon: isVendor ? <Package size={28} /> : <TrendingUp size={28} />,
             desc: 'Live Burn Rate'
           },
           { 
             label: 'Network Score', 
             val: '842', 
             color: 'text-accent', 
             bg: 'bg-accent/10',
             border: 'border-accent/20',
             icon: <Award size={28} />,
             desc: 'Top 5% Globally'
           }
         ].map((stat, i) => (
           <div key={i} className={`group relative p-8 md:p-10 bg-neutral-900 border ${stat.border} rounded-3xl md:rounded-[3.5rem] space-y-6 md:space-y-8 transition-all hover:bg-neutral-800/50 shadow-2xl active-scale overflow-hidden`}>
              <div className="absolute top-0 right-0 p-8 md:p-12 opacity-[0.02] pointer-events-none group-hover:scale-125 transition-transform duration-1000">
                 {stat.icon}
              </div>
              <div className="flex justify-between items-start relative z-10">
                 <div className={`p-4 md:p-5 rounded-2xl ${stat.bg} ${stat.color} border ${stat.border}`}>
                    {stat.icon}
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Status</span>
                    <span className={`text-[10px] md:text-[11px] font-black ${stat.color} uppercase tracking-widest flex items-center gap-2`}>
                       <div className={`w-1.5 h-1.5 rounded-full ${stat.color === 'text-green-500' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} /> 
                       {stat.desc}
                    </span>
                 </div>
              </div>
              <div className="relative z-10">
                 <p className="text-[10px] md:text-[11px] font-black text-neutral-500 uppercase tracking-widest mb-2">{stat.label}</p>
                 <p className={`text-4xl md:text-5xl font-cinematic font-black tracking-[0.1em] ${stat.color}`}>{stat.val}</p>
              </div>
              <div className="h-1.5 w-full bg-black rounded-full overflow-hidden relative z-10">
                 <div className={`h-full transition-all duration-1000 ${stat.color === 'text-red-500' ? 'bg-red-600 shadow-[0_0_10px_#DC2626]' : stat.color === 'text-green-500' ? 'bg-green-500' : 'bg-accent'}`} style={{ width: i === 1 ? '28%' : '75%' }} />
              </div>
           </div>
         ))}
      </section>

      {/* Main Grid: Immersive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="lg:col-span-8 space-y-8 md:space-y-10">
          {/* Work Stream: The Visual Centerpiece */}
          <section className="glass-panel rounded-3xl md:rounded-[4rem] p-8 md:p-12 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-24 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity duration-1000 hidden md:block">
                {isVendor ? <Truck size={400} /> : <Clapperboard size={400} />}
             </div>
             
             <div className="relative z-10 space-y-10 md:space-y-12">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-red-600/10 rounded-2xl md:rounded-3xl flex items-center justify-center text-red-600 border border-red-600/20 group-hover:scale-110 transition-transform">
                      {isVendor ? <Truck className="w-6 h-6 md:w-8 md:h-8" /> : <Video className="w-6 h-6 md:w-8 md:h-8" />}
                    </div>
                    <div>
                      <h3 className="text-3xl md:text-4xl font-cinematic font-black text-white uppercase tracking-widest leading-none">
                         {isVendor ? 'Asset Logistics' : 'Directing Today'}
                      </h3>
                      <p className="text-[9px] md:text-[11px] text-neutral-500 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mt-2">
                         {isVendor ? '4 Dispatched Today' : `Scene ${currentScene.number} • ${currentScene.title}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-[9px] md:text-[10px] font-black text-neutral-700 uppercase tracking-widest mb-1 md:mb-2">Completion</p>
                    <p className="text-4xl md:text-5xl font-cinematic font-black text-white">{isVendor ? '42' : `${project.progress}%`}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                   {isVendor ? MOCK_BOOKINGS.slice(0, 2).map(booking => (
                      <div key={booking.id} className="p-6 md:p-8 bg-black/40 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] space-y-4 hover:border-red-600/30 transition-all group/card cursor-pointer">
                         <div className="flex justify-between items-start">
                            <p className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Slate Entity</p>
                            <span className="text-[9px] font-black text-green-500 uppercase">{booking.amount}</span>
                         </div>
                         <p className="text-2xl md:text-3xl font-cinematic font-bold text-white group-hover/card:text-red-500 transition-colors uppercase truncate">{booking.projectName}</p>
                         <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                            <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{booking.status}</span>
                            <ArrowUpRight size={14} className="text-neutral-700 group-hover/card:text-white group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-all" />
                         </div>
                      </div>
                   )) : [
                      { label: 'Crew Call', val: callSheet.crewCall, icon: <Clock size={20}/>, color: 'text-red-500' },
                      { label: 'Set Location', val: callSheet.location, icon: <MapPin size={20}/>, color: 'text-blue-500' }
                   ].map(item => (
                      <div key={item.label} className="p-6 md:p-8 bg-black/40 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] space-y-4 group/card cursor-pointer hover:border-white/20 transition-all">
                         <div className="flex items-center gap-3">
                            <div className={`${item.color} opacity-40 group-hover/card:opacity-100 transition-opacity`}>{item.icon}</div>
                            <p className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">{item.label}</p>
                         </div>
                         <p className="text-3xl md:text-4xl font-cinematic font-bold text-white tracking-widest leading-none uppercase">{item.val}</p>
                      </div>
                   ))}
                </div>

                <div className="pt-8 md:pt-10 border-t border-white/5">
                   <button 
                    onClick={() => navigate(isVendor ? '/bookings' : '/workspace')}
                    className="w-full py-6 md:py-8 bg-white text-black font-black rounded-2xl md:rounded-[2rem] text-[11px] md:text-[12px] tracking-[0.3em] md:tracking-[0.4em] flex items-center justify-center gap-3 md:gap-4 hover:bg-neutral-200 transition-all active-scale shadow-3xl"
                   >
                      {isVendor ? 'GO TO LOGISTICS HUB' : 'LAUNCH MISSION WORKSPACE'} <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                   </button>
                </div>
             </div>
          </section>

          {/* Activity Logs: Micro-Motion Thread */}
          <section className="space-y-4 md:space-y-6">
             <div className="flex justify-between items-center px-4 md:px-6">
                <h3 className="text-[9px] md:text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] md:tracking-[0.5em]">Real-time Operational Stream</h3>
                <button className="text-[9px] md:text-[10px] font-bold text-red-500 uppercase tracking-widest hover:underline">Full Ledger</button>
             </div>
             <div className="grid gap-3 md:gap-4">
                {MOCK_LOGS.map(log => (
                  <div key={log.id} className="p-6 md:p-8 bg-neutral-900/50 border border-white/5 rounded-2xl md:rounded-[2rem] flex items-center justify-between group hover:bg-neutral-900 transition-all cursor-pointer">
                    <div className="flex items-center gap-4 md:gap-8">
                      <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-600 group-hover:text-red-500 group-hover:scale-110 transition-all">
                        <Activity className="w-[18px] h-[18px] md:w-5 md:h-5" />
                      </div>
                      <div>
                        <p className="text-sm md:text-base font-bold text-neutral-400 uppercase tracking-wide group-hover:text-white transition-colors">
                          <span className="text-white font-black">{log.user}</span> <span className="hidden sm:inline">•</span> <br className="sm:hidden" /> {log.action}
                        </p>
                        <p className="text-[9px] md:text-[10px] text-neutral-700 font-black uppercase tracking-widest mt-1">{log.time}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-[18px] h-[18px] md:w-5 md:h-5 text-neutral-800 group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar Intelligence: The AI Aura */}
        <div className="lg:col-span-4 space-y-8 md:space-y-10">
           <section className="bg-gradient-to-br from-red-900 to-black border border-red-600/30 p-8 md:p-12 rounded-3xl md:rounded-[4rem] shadow-3xl space-y-8 md:space-y-12 relative overflow-hidden group active-scale">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity duration-1000">
                <BrainCircuit size={150} />
              </div>
              <div className="flex items-center gap-3 md:gap-4 text-red-500">
                <Wand2 className="w-6 h-6 md:w-7 md:h-7 animate-pulse" />
                <h4 className="text-2xl md:text-3xl font-cinematic font-black tracking-widest uppercase">Genie Pulse</h4>
              </div>
              
              <div className="space-y-8 md:space-y-10">
                 <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-3 md:space-y-4 backdrop-blur-3xl group-hover:border-red-600/30 transition-all">
                    <p className="text-[9px] md:text-[11px] font-black text-red-500 uppercase tracking-widest">Direct Insight</p>
                    <p className="text-base md:text-lg text-neutral-300 leading-relaxed italic font-medium">
                       "Unit B equipment return is delayed by 20m. Suggest adjusting Scene 13 call-time to 09:45."
                    </p>
                 </div>
              </div>

              <button 
                onClick={() => navigate('/ai-genie')}
                className="w-full py-4 md:py-6 bg-red-600 text-white font-black rounded-2xl md:rounded-3xl text-[10px] md:text-[11px] uppercase tracking-[0.3em] md:tracking-[0.4em] hover:bg-red-700 transition-all shadow-3xl shadow-red-600/40"
              >
                Launch Intelligence
              </button>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-3xl md:rounded-[4rem] shadow-2xl space-y-8 md:space-y-12">
              <h4 className="text-[9px] md:text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] md:tracking-[0.5em]">{isVendor ? 'Asset Health' : 'Crew Audit'}</h4>
              <div className="space-y-6 md:space-y-8">
                {(isVendor ? [
                  { label: 'Listed Assets', val: '24', icon: <Package size={18}/> },
                  { label: 'In Production', val: '14', icon: <Truck size={18}/> },
                  { label: 'Maintenance Log', val: '2 Units', icon: <AlertTriangle size={18}/> }
                ] : [
                  { label: 'Total On-Call', val: '42', icon: <UsersIcon size={18}/> },
                  { label: 'Unit Vendors', val: '3', icon: <Truck size={18}/> },
                  { label: 'Scenes Locked', val: '12 / 45', icon: <FileText size={18}/> }
                ]).map(stat => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-5 md:pb-6 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3 md:gap-4 text-neutral-500 group cursor-pointer hover:text-white transition-colors">
                      <div className="p-2.5 md:p-3 bg-neutral-800 rounded-xl group-hover:bg-red-600/20 group-hover:text-red-500 transition-all">{stat.icon}</div>
                      <span className="text-[9px] md:text-[11px] font-black uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-2xl md:text-3xl font-cinematic font-black text-white tracking-widest">{stat.val}</span>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
