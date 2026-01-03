
import React, { useState, useEffect } from 'react';
import { 
  MOCK_PROJECTS, 
  MOCK_SCENES,
  MOCK_SHOTS,
  MOCK_MESSAGES
} from '../constants';
import { 
  Plus, 
  Clock, 
  Users, 
  Clapperboard, 
  MapPin, 
  Camera,
  Activity,
  Zap,
  CheckCircle2,
  MoreVertical,
  ChevronRight,
  Play,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Square,
  History,
  Settings2,
  Maximize2,
  Radio,
  Target,
  Battery,
  Wifi,
  ChevronDown,
  MessageSquare,
  Send,
  ShieldAlert,
  BarChart3,
  CloudRain
} from 'lucide-react';
import { ShotStatus, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import SelectDropdown from '../components/SelectDropdown';

interface ProjectWorkspaceProps {
  role?: UserRole;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ role = 'production' }) => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string>('shots');
  const [shots, setShots] = useState(MOCK_SHOTS);
  const [activeShotTimer, setActiveShotTimer] = useState(0);
  const [isShotRolling, setIsShotRolling] = useState(false);
  const [activeTakeNumber, setActiveTakeNumber] = useState(1);
  const [lastWrappedShotId, setLastWrappedShotId] = useState<string | null>(null);
  const [specialty, setSpecialty] = useState('Leading Actor');

  const project = MOCK_PROJECTS[0];
  const currentScene = MOCK_SCENES[0];
  const activeShot = shots.find(s => s.status === 'Active') || shots[0];

  useEffect(() => {
    let interval: any;
    if (isShotRolling) {
      interval = setInterval(() => setActiveShotTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isShotRolling]);

  const handleShotStatus = (id: string, newStatus: ShotStatus) => {
    if (newStatus === 'Active') {
      setIsShotRolling(true);
      setLastWrappedShotId(null);
      const targetShot = shots.find(s => s.id === id);
      setActiveTakeNumber((targetShot?.takeCount || 0) + 1);
      setActiveShotTimer(0);
      setShots(prev => prev.map(s => ({ ...s, status: s.id === id ? 'Active' : s.status })));
    }
    if (newStatus === 'Done') {
      setIsShotRolling(false);
      setLastWrappedShotId(id);
      setShots(prev => prev.map(s => {
        if (s.id === id) {
          return { ...s, status: 'Done', takeCount: s.takeCount + 1 };
        }
        return s;
      }));
    }
  };

  const formatTimecode = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:00`;
  };

  return (
    <div className={`min-h-screen -mt-12 -mx-6 md:-mx-12 flex flex-col bg-neutral-950 transition-colors duration-700 ${isShotRolling ? 'bg-red-950/10' : ''}`}>
      
      {/* 1. TOP COMMAND BAR (Telemetry) */}
      <header className={`sticky top-0 z-[100] px-6 py-3 border-b backdrop-blur-3xl transition-all duration-500 ${
        isShotRolling ? 'bg-red-600 border-red-500 shadow-[0_10px_40px_rgba(220,38,38,0.3)]' : 'bg-neutral-900/80 border-white/5'
      }`}>
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${isShotRolling ? 'bg-white animate-pulse shadow-[0_0_10px_white]' : 'bg-red-600 shadow-[0_0_10px_#DC2626]'}`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isShotRolling ? 'text-white' : 'text-neutral-400'}`}>
                  {isShotRolling ? 'ROLLING' : 'STANDBY'}
                </span>
             </div>
             <div className="h-4 w-px bg-white/10 hidden sm:block" />
             <div className="hidden sm:flex items-center gap-4">
                <p className={`text-[10px] font-bold uppercase tracking-widest ${isShotRolling ? 'text-white/80' : 'text-neutral-600'}`}>
                  {project.title} <span className="mx-2 opacity-30">/</span> DAY {project.currentShootDay}
                </p>
             </div>
          </div>

          <div className="flex items-center gap-8">
             <div className="flex items-center gap-4">
                <Battery size={16} className={isShotRolling ? 'text-white' : 'text-neutral-600'} />
                <Wifi size={16} className={isShotRolling ? 'text-white' : 'text-neutral-600'} />
             </div>
             <p className={`text-xl font-cinematic font-bold tracking-widest tabular-nums ${isShotRolling ? 'text-white' : 'text-red-500'}`}>
               {formatTimecode(activeShotTimer)}
             </p>
          </div>
        </div>
      </header>

      {/* 2. MAIN OPERATIONAL SURFACE */}
      <main className="flex-1 flex flex-col lg:flex-row relative">
        
        {/* Focused Workstation Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 space-y-12 scrollbar-hide pb-40 lg:pb-12">
          
          {/* Mode Switcher Logic: SHOTS (FOCUS) */}
          {activeTool === 'shots' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
              {/* Active Setup Focus */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-red-500">
                    <Target size={20} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Primary Setup</span>
                  </div>
                  <h1 className="text-6xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
                    {activeShot.number}
                  </h1>
                  <p className="text-xl md:text-3xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase italic leading-tight">
                    {activeShot.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl min-w-[140px] text-center">
                    <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">SCENE</p>
                    <p className="text-4xl font-cinematic font-bold text-white">{currentScene.number}</p>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl min-w-[140px] text-center">
                    <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">TAKE</p>
                    <p className={`text-4xl font-cinematic font-bold ${isShotRolling ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                      {activeTakeNumber.toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Spec Strip */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Lens', val: activeShot.lens, icon: <Camera size={16}/> },
                  { label: 'Movement', val: activeShot.movement, icon: <Activity size={16}/> },
                  { label: 'Location', val: currentScene.setting, icon: <MapPin size={16}/> },
                  { label: 'Time', val: currentScene.timeOfDay, icon: <Clock size={16}/> }
                ].map((spec, i) => (
                  <div key={i} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-white/10 transition-all cursor-default">
                    <div className="flex items-center gap-3 text-neutral-500">
                      {spec.icon}
                      <span className="text-[9px] font-black uppercase tracking-widest">{spec.label}</span>
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{spec.val}</span>
                  </div>
                ))}
              </div>

              {/* Tactical Action Layer */}
              <div className="space-y-4">
                {isShotRolling ? (
                  <button 
                    onClick={() => handleShotStatus(activeShot.id, 'Done')}
                    className="w-full py-10 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2.5rem] text-sm uppercase tracking-[0.5em] shadow-[0_20px_60px_rgba(220,38,38,0.4)] transition-all active-scale flex items-center justify-center gap-6 group"
                  >
                    <Square size={32} fill="white" className="group-hover:scale-110 transition-transform" /> CUT CAMERA
                  </button>
                ) : (
                  <div className="flex flex-col md:flex-row gap-4">
                    <button 
                      onClick={() => handleShotStatus(activeShot.id, 'Active')}
                      className="flex-[2] py-8 bg-white text-black font-black rounded-[2rem] text-[13px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-4"
                    >
                      <Play size={20} fill="black"/> INITIALIZE TAKE
                    </button>
                    <button 
                      onClick={() => navigate('/logbook')}
                      className="flex-1 py-8 bg-neutral-900 border border-white/5 text-neutral-400 font-black rounded-[2rem] text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:text-white transition-all active-scale"
                    >
                      <History size={18} /> OPEN LOGBOOK
                    </button>
                  </div>
                )}
              </div>

              {/* Queue Sub-section */}
              <section className="space-y-6 pt-12 border-t border-white/5">
                <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em] px-2">Upcoming Units</h3>
                <div className="grid gap-3">
                  {shots.filter(s => s.status !== 'Active').map(shot => (
                    <div key={shot.id} className="group bg-neutral-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between hover:bg-neutral-900 hover:border-white/10 transition-all">
                      <div className="flex items-center gap-6">
                        <span className="text-3xl font-cinematic font-bold text-neutral-800 group-hover:text-red-500 transition-colors leading-none">{shot.number}</span>
                        <div>
                          <p className="text-sm font-bold text-white uppercase tracking-tight line-clamp-1">{shot.description}</p>
                          <p className="text-[9px] text-neutral-600 font-black uppercase tracking-widest mt-1">{shot.lens} • {shot.movement}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {shot.status === 'Done' && <CheckCircle2 size={18} className="text-green-500" />}
                        <button className="p-3 text-neutral-700 hover:text-white transition-colors">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          )}

          {/* Mode Switcher Logic: COMMS (RADIO) */}
          {activeTool === 'comms' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 h-full flex flex-col space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                  <Radio size={20} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Set Radio • Channel 1</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase">Comms Hub</h2>
              </div>

              <div className="flex-1 bg-black/40 border border-white/5 rounded-[3rem] p-8 space-y-6 overflow-y-auto scrollbar-hide">
                {MOCK_MESSAGES.map((msg, i) => (
                  <div key={i} className={`flex gap-4 p-6 rounded-3xl border ${msg.isEmergency ? 'bg-red-600/10 border-red-600/30' : 'bg-neutral-900 border-white/5'}`}>
                    <div className="w-10 h-10 rounded-xl bg-neutral-800 flex-shrink-0 flex items-center justify-center">
                       <img src={msg.senderAvatar} className="w-full h-full rounded-xl object-cover" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{msg.senderName}</p>
                      <p className="text-sm text-white font-medium">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                 <div className="flex-1 bg-neutral-900 border border-white/5 rounded-2xl p-4 flex items-center gap-4">
                    <input type="text" placeholder="Type set broadcast..." className="flex-1 bg-transparent border-none outline-none text-sm text-white uppercase font-bold tracking-widest placeholder:text-neutral-700" />
                    <button className="p-2 text-neutral-500 hover:text-white"><Send size={20} /></button>
                 </div>
                 <button className="px-8 py-4 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">ROLLING</button>
              </div>
            </section>
          )}

          {/* Mode Switcher Logic: INTEL (GENIE) */}
          {activeTool === 'intel' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-700 space-y-12">
               <div className="space-y-4">
                <div className="flex items-center gap-3 text-red-500">
                  <Zap size={20} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Genie Neural Engine</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase">Set Intel</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-10 bg-neutral-900 border border-white/5 rounded-[3.5rem] space-y-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                      <ShieldAlert size={100} />
                    </div>
                    <div className="space-y-2 relative z-10">
                       <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Technical Risk Audit</p>
                       <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Equipment Alerts</h3>
                    </div>
                    <div className="space-y-4 relative z-10">
                       <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-4">
                          <Battery className="text-red-500" />
                          <p className="text-[11px] font-bold text-neutral-300 uppercase tracking-widest">Unit B Battery low (14%). Impact: High.</p>
                       </div>
                       <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-4">
                          <Wifi className="text-blue-500" />
                          <p className="text-[11px] font-bold text-neutral-300 uppercase tracking-widest">Slate Sync latency: 12ms (Optimal).</p>
                       </div>
                    </div>
                 </div>

                 <div className="p-10 bg-neutral-900 border border-white/5 rounded-[3.5rem] space-y-8 shadow-2xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                      <CloudRain size={100} />
                    </div>
                    <div className="space-y-2 relative z-10">
                       <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Environment Intel</p>
                       <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Weather Engine</h3>
                    </div>
                    <p className="text-neutral-400 font-medium italic leading-relaxed relative z-10">
                       "Unit B is reporting heavy cloud cover. Suggest moving EXT scenes to A-unit immediately to maintain lighting continuity."
                    </p>
                    <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest relative z-10 shadow-xl">ADJUST CALL SHEET</button>
                 </div>
              </div>

              <div className="p-12 bg-neutral-900 border border-white/5 rounded-[4rem] space-y-8">
                 <div className="flex justify-between items-end border-b border-white/5 pb-8">
                    <div>
                       <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">Production Efficiency</p>
                       <h3 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">Phase Yield</h3>
                    </div>
                    <p className="text-6xl font-cinematic font-bold text-red-600 tracking-tighter leading-none">{project.progress}%</p>
                 </div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {[
                      { label: 'Scenes Locked', val: '12/45' },
                      { label: 'Shots Logged', val: '142' },
                      { label: 'Crew Uptime', val: '98.4%' },
                      { label: 'Logic Error', val: '0' }
                    ].map(m => (
                      <div key={m.label}>
                         <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">{m.label}</p>
                         <p className="text-2xl font-cinematic font-bold text-white tracking-widest">{m.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
            </section>
          )}
        </div>

        {/* 3. TACTICAL INTEL RAIL (Desktop Only Sidebar) */}
        <aside className="hidden lg:flex flex-col w-[450px] border-l border-white/5 bg-neutral-950 p-10 space-y-12 sticky top-0 h-[calc(100vh-140px)]">
           <header className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-red-500">
                 <Zap size={20} className="animate-pulse" />
                 <h4 className="text-xl font-cinematic font-bold tracking-widest uppercase">Genie Pulse</h4>
              </div>
              <span className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Logic v4.2</span>
           </header>

           <div className="flex-1 overflow-y-auto space-y-10 scrollbar-hide pr-2">
              <section className="space-y-6">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Active Insight</p>
                 <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-4">
                    <p className="text-lg text-neutral-300 font-medium italic leading-relaxed">
                       {activeTool === 'shots' 
                         ? "Continuity Match: Costume lapel smudge in Take 3 matches previous wide shot. Recommended for final master."
                         : "Unit B equipment return is delayed by 20m. Suggest adjusting Scene 13 call-time to 09:45."}
                    </p>
                    <button className="w-full py-4 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">SYNC TO SLATE</button>
                 </div>
              </section>

              <section className="space-y-6">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Role Management</p>
                 <div className="space-y-3">
                   <label className="text-[9px] font-black text-neutral-500 uppercase tracking-widest ml-1">Current Focus Specialization</label>
                   <SelectDropdown 
                      value={specialty}
                      onChange={setSpecialty}
                      options={[
                        { label: 'Leading Actor', value: 'Leading Actor' },
                        { label: 'Supporting Artist', value: 'Supporting Artist' },
                        { label: 'Voiceover Artist', value: 'Voiceover Artist' },
                        { label: 'Stunt Professional', value: 'Stunt Professional' },
                        { label: 'Dancer', value: 'Dancer' }
                      ]}
                   />
                 </div>
              </section>

              <section className="space-y-6">
                 <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Unit Logistics</p>
                 <div className="grid gap-3">
                    {[
                      { name: 'Unit B (Drone)', status: 'Active', val: 'WS-02' },
                      { name: 'Wardrobe A', status: 'Ready', val: 'Vikram' },
                      { name: 'Grip Unit', status: 'Transit', val: 'Sector 4' }
                    ].map(unit => (
                      <div key={unit.name} className="flex items-center justify-between p-5 bg-white/5 rounded-2xl border border-white/5">
                         <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full ${unit.status === 'Active' ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                            <span className="text-[10px] font-bold text-white uppercase tracking-widest">{unit.name}</span>
                         </div>
                         <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">{unit.val}</span>
                      </div>
                    ))}
                 </div>
              </section>
           </div>

           <button 
            onClick={() => navigate('/ai-genie')}
            className="w-full py-5 bg-neutral-900 border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all active-scale"
           >
              LAUNCH AI CONSOLE <ChevronRight size={18} />
           </button>
        </aside>
      </main>

      {/* 4. MODE SWITCHER (Operational Pill) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-neutral-900/90 backdrop-blur-2xl border border-white/10 p-1.5 rounded-full shadow-3xl flex items-center gap-1 transition-transform duration-500 lg:bottom-12">
         {[
           { id: 'shots', icon: <Target size={18}/>, label: 'FOCUS' },
           { id: 'comms', icon: <Radio size={18}/>, label: 'RADIO' },
           { id: 'intel', icon: <Zap size={18}/>, label: 'INTEL' }
         ].map(tool => (
           <button 
            key={tool.id}
            onClick={() => {
              setActiveTool(tool.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-full transition-all duration-300 active-scale ${
              activeTool === tool.id ? 'bg-red-600 text-white shadow-xl' : 'text-neutral-500 hover:text-white'
            }`}
           >
             {tool.icon}
             <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">{tool.label}</span>
           </button>
         ))}
      </nav>

      {/* Ambience Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
         <div className={`absolute top-1/4 right-0 w-[50vw] h-[50vh] bg-red-600/5 blur-[120px] rounded-full transition-opacity duration-1000 ${isShotRolling ? 'opacity-100' : 'opacity-20'}`} />
         <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-600/5 blur-[120px] rounded-full opacity-20" />
      </div>
    </div>
  );
};

export default ProjectWorkspace;
