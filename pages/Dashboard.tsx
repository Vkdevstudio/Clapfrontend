
import React from 'react';
import { UserRole } from '../types';
import { MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_MESSAGES } from '../constants';
import { 
  Clock, 
  MapPin, 
  Clapperboard, 
  TrendingUp, 
  Plus, 
  Search, 
  ArrowUpRight, 
  Zap,
  CheckCircle2,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  
  if (isTalent) {
    const activeCall = MOCK_CALL_SHEETS[0];
    const project = MOCK_PROJECTS[0];
    
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 max-w-7xl mx-auto">
        <header className="flex justify-between items-end">
          <div className="space-y-1">
            <h1 className="text-5xl font-cinematic font-bold tracking-tighter">NEXT ON SET</h1>
            <p className="text-neutral-500 font-medium">Reporting to {activeCall.location}</p>
          </div>
          <div className="bg-red-600/10 px-4 py-2 rounded-xl border border-red-600/20 flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
             <span className="text-[10px] font-bold uppercase tracking-widest text-red-500">LIVE SET UPDATES</span>
          </div>
        </header>

        <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
           <div className="grid md:grid-cols-3">
              <div className="p-10 border-r border-white/5 space-y-6">
                 <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">CALL TIME</p>
                 <div className="space-y-1">
                    <p className="text-7xl font-cinematic font-bold leading-none">{activeCall.crewCall.split(' ')[0]}</p>
                    <p className="text-2xl font-cinematic text-neutral-500 font-bold">{activeCall.crewCall.split(' ')[1]}</p>
                 </div>
                 <button className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl shadow-xl shadow-red-600/20 transition-all flex items-center justify-center gap-2">
                    <CheckCircle2 size={18} /> ACKNOWLEDGE CALL
                 </button>
              </div>
              <div className="md:col-span-2 p-10 bg-black/40 space-y-8">
                 <div className="flex justify-between items-start">
                    <div>
                       <h2 className="text-4xl font-cinematic font-bold mb-2 tracking-wide">{project.title}</h2>
                       <p className="text-neutral-400 font-medium flex items-center gap-2"><MapPin size={16} className="text-red-500" /> {activeCall.location}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-2xl font-cinematic font-bold">DAY {activeCall.shootDay}</p>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">OF {project.totalShootDays}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-800/50 p-6 rounded-3xl border border-white/5">
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-3">Today Scenes</p>
                       <p className="text-2xl font-cinematic font-bold">12B, 13, 14A</p>
                    </div>
                    <div className="bg-neutral-800/50 p-6 rounded-3xl border border-white/5">
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest mb-3">Weather</p>
                       <p className="text-lg font-bold">{activeCall.weather}</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
           <div className="space-y-6">
              <h3 className="text-2xl font-cinematic font-bold tracking-wide">LATEST SIDES & SCRIPTS</h3>
              <div className="bg-neutral-900 border border-white/5 rounded-[2rem] p-4">
                 <div className="flex items-center justify-between p-6 bg-black/40 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all cursor-pointer">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-red-500">
                          <Clapperboard size={24} />
                       </div>
                       <div>
                          <p className="font-bold text-white">Scene 12B Sides</p>
                          <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Revision: V3.2 • Blue Pages</p>
                       </div>
                    </div>
                    <ArrowUpRight className="text-neutral-700 group-hover:text-white" />
                 </div>
              </div>
           </div>
           
           <div className="space-y-6">
              <h3 className="text-2xl font-cinematic font-bold tracking-wide">SET COMMS</h3>
              <div className="bg-neutral-900 border border-white/5 rounded-[2rem] p-8 h-[300px] flex flex-col">
                 <div className="flex-1 overflow-y-auto space-y-4">
                    {MOCK_MESSAGES.map(m => (
                       <div key={m.id} className={`p-4 rounded-2xl border ${m.isEmergency ? 'bg-red-600/10 border-red-600/20' : 'bg-black/40 border-white/5'}`}>
                          <div className="flex justify-between mb-1">
                             <span className="text-[10px] font-bold text-red-500">{m.senderName}</span>
                             <span className="text-[10px] text-neutral-600">{m.timestamp}</span>
                          </div>
                          <p className={`text-sm ${m.isEmergency ? 'text-red-500 font-bold' : 'text-neutral-300'}`}>{m.content}</p>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (isProduction) {
    const activeProject = MOCK_PROJECTS[0];
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white">MISSION CONTROL</h1>
            <p className="text-neutral-500 font-medium">Monitoring Active Slate • 42 Crew On Set</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => navigate('/workspace')} className="bg-red-600 px-8 py-4 rounded-2xl text-white font-bold shadow-2xl shadow-red-600/30 flex items-center gap-2 hover:bg-red-700 transition-all uppercase tracking-widest text-xs">
                <Plus size={18} /> New Project
             </button>
          </div>
        </header>

        <section className="relative rounded-[2.5rem] overflow-hidden aspect-[21/9] group cursor-pointer border border-white/5 shadow-2xl bg-neutral-900">
          <img src={activeProject.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse">SET LIVE</span>
              <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">DAY {activeProject.currentShootDay} OF {activeProject.totalShootDays}</span>
            </div>
            <h2 className="text-8xl font-cinematic font-bold mb-4 tracking-tighter leading-none text-white">{activeProject.title}</h2>
            <div className="flex items-center gap-8 text-neutral-400 font-medium">
              <span className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5"><MapPin size={18} className="text-red-500" /> {activeProject.location}</span>
              <span className="flex items-center gap-2.5 bg-green-500/10 text-green-500 backdrop-blur-md px-4 py-2 rounded-2xl border border-green-500/20"><TrendingUp size={18} /> {activeProject.progress}% Completion</span>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-cinematic font-bold tracking-wide">GENIE ADVISORY</h3>
                 <button className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">
                    Analyze Slate <ArrowUpRight size={14} />
                 </button>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                 <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-orange-500/30 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center mb-6">
                       <Zap size={24} />
                    </div>
                    <p className="text-white font-bold text-lg mb-2">Weather Warning</p>
                    <p className="text-neutral-500 text-sm leading-relaxed">80% Rain chance at 2:00 PM. Recommend rescheduling EXT. ALLEY shots to INT. JAZZ CLUB.</p>
                 </div>
                 <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all cursor-pointer">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6">
                       <BrainCircuit size={24} />
                    </div>
                    <p className="text-white font-bold text-lg mb-2">Crew Insight</p>
                    <p className="text-neutral-500 text-sm leading-relaxed">Art Dept is 15% ahead of schedule. Opportunity to prep Scene 22 early.</p>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              <h3 className="text-2xl font-cinematic font-bold tracking-wide">CREW CALL STATUS</h3>
              <div className="bg-neutral-900 border border-white/5 rounded-[2rem] p-8 space-y-6 shadow-2xl">
                 {[
                    { dept: 'Direction', status: '8/8 Ready', ready: true },
                    { dept: 'Camera', status: '12/12 Ready', ready: true },
                    { dept: 'Cast', status: '3/4 Arrived', ready: false },
                    { dept: 'Sound', status: '4/4 Ready', ready: true }
                 ].map(d => (
                    <div key={d.dept} className="flex items-center justify-between">
                       <span className="text-sm font-bold text-neutral-400">{d.dept}</span>
                       <div className="flex items-center gap-3">
                          <span className={`text-xs font-bold ${d.ready ? 'text-green-500' : 'text-orange-500'}`}>{d.status}</span>
                          <div className={`w-2 h-2 rounded-full ${d.ready ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' : 'bg-orange-500'}`} />
                       </div>
                    </div>
                 ))}
                 <button className="w-full mt-4 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl text-[10px] uppercase tracking-widest transition-all">VIEW AUDIT LOG</button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return <div>Role Access Restricted</div>;
};

export default Dashboard;
