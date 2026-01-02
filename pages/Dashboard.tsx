
import React from 'react';
import { UserRole } from '../types';
import { MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_SCENES, MOCK_LOGS } from '../constants';
import { 
  Clock, MapPin, Clapperboard, TrendingUp, Zap, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldAlert, Activity, Plus, Users as UsersIcon, 
  DollarSign, FileText, Wand2, ArrowRight, Video,
  // Added missing icon imports
  BrainCircuit, Truck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  const isVendor = role === 'vendor';

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-20 max-w-7xl mx-auto">
      {/* Role-Specific Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600 pulse-status" />
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Unit A Operational</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">
            {isProduction ? 'Mission Control' : isTalent ? 'Set Call Hub' : 'Fulfillment Hub'}
          </h1>
          <p className="text-neutral-500 text-lg font-medium">Production: <span className="text-white">{project.title}</span> • Day {project.currentShootDay}</p>
        </div>
        
        <div className="flex flex-wrap gap-4">
           {isProduction && (
              <button 
                onClick={() => navigate('/projects/new')}
                className="bg-red-600 px-10 py-5 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/40 flex items-center gap-3 hover:bg-red-700 transition-all active-scale"
              >
                <Plus size={18} /> New Slate
              </button>
           )}
           <div className="flex items-center gap-4 bg-neutral-900/50 border border-white/5 px-6 py-4 rounded-2xl backdrop-blur-xl">
              <div className="text-right">
                <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Local Time</p>
                <p className="text-xl font-cinematic font-bold text-white tracking-widest">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <Clock size={24} className="text-neutral-600" />
           </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        {/* Main Production Track */}
        <div className="lg:col-span-8 space-y-8">
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden shadow-3xl">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                <Video size={400} />
             </div>
             
             <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20">
                      <Clapperboard size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Currently Shooting</h3>
                      <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">Scene {currentScene.number} • {currentScene.title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">Unit Progress</p>
                    <p className="text-3xl font-cinematic font-bold text-white">{project.progress}%</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                   <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-red-600/30 transition-all">
                      <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Crew Call</p>
                      <p className="text-5xl font-cinematic font-bold text-white">{callSheet.crewCall}</p>
                      <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={12}/> Confirmed</p>
                   </div>
                   <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-blue-500/30 transition-all">
                      <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Location</p>
                      <p className="text-3xl font-cinematic font-bold text-white leading-tight uppercase">{callSheet.location}</p>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Goregaon West</p>
                   </div>
                   <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-accent/30 transition-all">
                      <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Environment</p>
                      <p className="text-3xl font-cinematic font-bold text-white leading-tight uppercase">{callSheet.weather}</p>
                      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">Sunset: {callSheet.sunset}</p>
                   </div>
                </div>

                <div className="pt-8 border-t border-white/5">
                   <button 
                    onClick={() => navigate('/workspace')}
                    className="w-full py-6 bg-white text-black font-black rounded-3xl text-sm tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-neutral-200 transition-all active-scale shadow-2xl"
                   >
                      OPEN FULL WORKSPACE <ArrowRight size={20} />
                   </button>
                </div>
             </div>
          </section>

          {/* Activity Logs (The "Ticker") */}
          <section className="space-y-6">
             <div className="flex justify-between items-center px-4">
                <h3 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Live Production Stream</h3>
                <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest">View All Logs</button>
             </div>
             <div className="grid gap-4">
                {MOCK_LOGS.map(log => (
                  <div key={log.id} className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-neutral-900 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-600">
                        <Activity size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide">
                          <span className="text-white font-black">{log.user}</span> • {log.action}
                        </p>
                        <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{log.time}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-neutral-800 group-hover:text-white transition-colors" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Intelligence Rail */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-gradient-to-br from-red-950/40 to-black border border-red-600/20 p-10 rounded-[3rem] shadow-3xl space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={150} />
              </div>
              <div className="flex items-center gap-3 text-red-500">
                <Wand2 size={24} className="animate-bounce" />
                <h4 className="text-2xl font-cinematic font-bold tracking-widest uppercase">Genie Insights</h4>
              </div>
              
              <div className="space-y-8">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Operational Alert</p>
                    <p className="text-sm text-neutral-300 leading-relaxed italic font-medium">"Unit A is 15% ahead of today's page count. Suggested optimization: Prep Scene 14 early to save ₹45k in lighting overtime."</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Logistics Prediction</p>
                    <p className="text-sm text-neutral-300 leading-relaxed font-medium">"Rain probability increasing to 80% at 2:00 PM. Recommend switching to INT Scene 12B cover-set immediately."</p>
                 </div>
              </div>

              <button className="w-full py-4 bg-red-600/10 border border-red-600/30 text-red-500 font-bold rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all">
                TALK TO GENIE
              </button>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Unit Directory</h4>
              <div className="space-y-6">
                {[
                  { label: 'Total Crew', val: '42', icon: <UsersIcon size={16}/> },
                  { label: 'Vendors On-Site', val: '3', icon: <Truck size={16}/> },
                  { label: 'Scene Count', val: '12 / 45', icon: <FileText size={16}/> }
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3 text-neutral-400">
                      {stat.icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-cinematic font-bold text-white tracking-widest">{stat.val}</span>
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
