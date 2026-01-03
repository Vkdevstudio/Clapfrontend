
import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  UserPlus, 
  MapPin, 
  AlertCircle, 
  Timer, 
  CheckCircle2, 
  ChevronRight, 
  Zap, 
  Globe, 
  RefreshCcw, 
  Activity,
  Cpu,
  Smartphone,
  ShieldAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TestScenario: React.FC = () => {
  const navigate = useNavigate();
  const [activePersona, setActivePersona] = useState('Default');
  const [injectedError, setInjectedError] = useState<string | null>(null);

  const testTasks = [
    { id: 1, label: 'Signup Flow', desc: 'Complete phone/email + OTP verification.', status: 'Pending' },
    { id: 2, label: 'Profile Sync', desc: 'Add "Kodambakkam" location and Student specialty.', status: 'Pending' },
    { id: 3, label: 'Discovery', desc: 'Find "Chennai Short Film" audition.', status: 'Pending' },
    { id: 4, label: 'Submission', desc: 'Apply for a role and simulate reel upload.', status: 'Pending' }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-32 max-w-[1400px] mx-auto px-4 md:px-6">
      
      {/* 1. RESEARCHER CONTROL HEADER */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-orange-600 rounded-full shadow-[0_0_15px_#EA580C]" />
            <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">Researcher Suite • Region Chennai</p>
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
            Audit <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-neutral-400">Hub.</span>
          </h1>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
           <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale"
           >
             Exit Simulation
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* Left Rail: Test Checklist */}
        <div className="lg:col-span-7 space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-10">
              <div className="flex items-center justify-between border-b border-white/5 pb-8">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase flex items-center gap-3">
                    <ClipboardCheck className="text-orange-500" /> Page-Wise Checklist
                 </h3>
                 <div className="flex items-center gap-2">
                    <Timer size={14} className="text-neutral-500" />
                    <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Active Session: 04:12</span>
                 </div>
              </div>
              
              <div className="space-y-4">
                 {testTasks.map((task) => (
                   <div key={task.id} className="p-8 bg-black/40 border border-white/5 rounded-3xl group hover:border-orange-600/30 transition-all flex items-center justify-between">
                      <div className="flex gap-6 items-center">
                         <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-600 group-hover:text-orange-500 transition-colors">
                            {task.id}
                         </div>
                         <div>
                            <h4 className="text-lg font-cinematic font-bold text-white uppercase tracking-widest">{task.label}</h4>
                            <p className="text-xs text-neutral-500 font-medium leading-relaxed italic">"{task.desc}"</p>
                         </div>
                      </div>
                      <div className="p-3 bg-neutral-800 rounded-xl text-neutral-700">
                         <CheckCircle2 size={20} />
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Metrics Grid */}
           <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Completion Rate', val: '84%', icon: <CheckCircle2 size={16}/>, color: 'text-green-500' },
                { label: 'Avg. Hesitation', val: '12.4s', icon: <Activity size={16}/>, color: 'text-orange-500' }
              ].map((m, i) => (
                <div key={i} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-3">
                   <div className="flex items-center gap-2 text-neutral-500">
                      {m.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest">{m.label}</span>
                   </div>
                   <p className={`text-4xl font-cinematic font-bold tracking-widest ${m.color}`}>{m.val}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Right Rail: Environment Simulation Controls */}
        <aside className="lg:col-span-5 space-y-8">
           <section className="bg-gradient-to-br from-orange-950/20 to-black border border-orange-600/30 p-10 rounded-[3rem] space-y-10 shadow-3xl">
              <div className="flex items-center gap-4 text-orange-500">
                 <Cpu size={24} className="animate-pulse" />
                 <h4 className="text-2xl md:text-3xl font-cinematic font-bold tracking-widest uppercase">Simulation Engine</h4>
              </div>
              
              <div className="space-y-8">
                 {/* Persona Selector */}
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-2">Active Persona Target</p>
                    <div className="grid grid-cols-2 gap-3">
                       {['Default', 'Chennai Amateur'].map(p => (
                         <button 
                          key={p}
                          onClick={() => setActivePersona(p)}
                          className={`py-4 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border ${
                            activePersona === p ? 'bg-orange-600 border-orange-500 text-white shadow-xl shadow-orange-600/20' : 'bg-black/40 border-white/5 text-neutral-500 hover:text-white'
                          }`}
                         >
                           {p}
                         </button>
                       ))}
                    </div>
                 </div>

                 {/* Edge Case Injector */}
                 <div className="space-y-4 pt-6 border-t border-white/5">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-2 text-red-500 flex items-center gap-2">
                       <ShieldAlert size={12} /> Inject Friction State
                    </p>
                    <div className="grid gap-3">
                       {[
                         { id: 'otp', label: 'Simulate OTP Failure' },
                         { id: 'empty', label: 'Force Empty Audition Slate' },
                         { id: 'upload', label: 'High Latency Reel Ingest' }
                       ].map(err => (
                         <button 
                          key={err.id}
                          onClick={() => setInjectedError(injectedError === err.id ? null : err.id)}
                          className={`flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border ${
                            injectedError === err.id ? 'bg-red-600 border-red-500 text-white animate-pulse' : 'bg-neutral-900 border-white/5 text-neutral-400 hover:text-white'
                          }`}
                         >
                            {err.label} <RefreshCcw size={14} className={injectedError === err.id ? 'animate-spin' : ''} />
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="p-6 bg-black/40 border border-white/10 rounded-2xl space-y-3">
                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">Researcher Tip</p>
                    <p className="text-xs text-neutral-400 font-medium leading-relaxed italic">
                       "Watch for hesitation when selecting the 'MGR Film Institute' node. Students often pause to check if their specific department is listed."
                    </p>
                 </div>
              </div>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-6">
              <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">System Status</h4>
              <div className="space-y-4">
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-neutral-500">Node Reach</span>
                    <span className="text-white">Kodambakkam_Sector_01</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-neutral-500">Latency</span>
                    <span className="text-green-500">8ms</span>
                 </div>
                 <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                    <span className="text-neutral-500">Secure Audit</span>
                    <span className="text-white">Active</span>
                 </div>
              </div>
           </section>
        </aside>
      </div>

      {/* 3. SYSTEM FOOTER */}
      <footer className="mt-16 text-center opacity-30">
         <p className="text-[9px] font-black text-white uppercase tracking-[0.8em]">CLAP RESEARCH OPS • USER AUDIT NODE v4.2</p>
      </footer>
    </div>
  );
};

export default TestScenario;
