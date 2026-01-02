
import React, { useState, useEffect } from 'react';
import { 
  MOCK_PROJECTS, 
  MOCK_CALL_SHEETS, 
  MOCK_SCENES,
  MOCK_SHOTS,
  MOCK_LOGS
} from '../constants';
import { 
  Plus, 
  Clock, 
  Users, 
  Clapperboard, 
  MapPin, 
  Camera,
  ClipboardList,
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
  History
} from 'lucide-react';
import { ShotStatus } from '../types';
import { useNavigate } from 'react-router-dom';

const ProjectWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string>('shots');
  const [shots, setShots] = useState(MOCK_SHOTS);
  const [activeShotTimer, setActiveShotTimer] = useState(0);
  const [isShotRolling, setIsShotRolling] = useState(false);
  const [activeTakeNumber, setActiveTakeNumber] = useState(1);
  const [lastWrappedShotId, setLastWrappedShotId] = useState<string | null>(null);

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

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

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      {/* Workflow Navigation */}
      <div className="flex gap-4 items-center mb-4 px-4 overflow-x-auto scrollbar-hide bg-neutral-900/40 p-3 rounded-2xl border border-white/5">
         {[
           { label: 'Script', path: '/script', status: 'breakdown' },
           { label: 'Slate', path: '/slate', status: 'ready' },
           { label: 'Workspace', path: '/workspace', active: true, status: 'live' },
           { label: 'Logbook', path: '/logbook', status: 'audit' }
         ].map((step, i) => (
           <React.Fragment key={step.label}>
             <button 
              onClick={() => navigate(step.path)}
              className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all px-4 py-2 rounded-xl ${
                step.active ? 'bg-red-600 text-white shadow-xl' : 'text-neutral-500 hover:text-white'
              }`}
             >
               {step.active && <Activity size={12} className="animate-pulse" />}
               {step.label}
             </button>
             {i < 3 && <ChevronRight size={12} className="text-neutral-800 flex-shrink-0" />}
           </React.Fragment>
         ))}
      </div>

      {/* Main Set Control Header */}
      <div className="relative rounded-[3rem] overflow-hidden bg-neutral-900 border border-white/5 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Clapperboard size={300} />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl transition-all ${isShotRolling ? 'bg-red-600 text-white animate-pulse' : 'bg-neutral-800 text-neutral-500'}`}>
                {isShotRolling ? 'ROLLING...' : 'STANDBY'}
              </span>
              <span className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">
                SCENE {currentScene.number}
              </span>
            </div>
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter leading-none uppercase">{project.title}</h2>
          </div>
          <div className="flex flex-col gap-3 justify-end items-end">
             {lastWrappedShotId && (
               <button 
                onClick={() => navigate('/logbook')}
                className="group flex items-center gap-3 px-8 py-5 bg-green-500 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl shadow-green-500/30 animate-in bounce-in"
               >
                  <History size={18} /> OPEN CONTINUITY LOG (TAKE {shots.find(s => s.id === lastWrappedShotId)?.takeCount})
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
             )}
             {!isShotRolling && (
                <button 
                  onClick={() => navigate('/ai-genie')}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-white/10 shadow-2xl active:scale-95 flex items-center gap-2"
                >
                    <Zap size={16} className="text-red-500" /> GENIE SYNC
                </button>
             )}
          </div>
        </div>

        {/* Live Timer View for active shooting */}
        {isShotRolling && (
          <div className="mt-12 p-10 bg-black/60 rounded-[2.5rem] border border-red-600/30 backdrop-blur-3xl animate-in zoom-in-95">
             <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left space-y-1">
                   <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Active Production Clock</p>
                   <p className="text-9xl font-cinematic font-bold text-white tracking-tighter tabular-nums leading-none">
                      {formatTime(activeShotTimer)}
                   </p>
                </div>
                <div className="flex flex-col items-center md:items-end gap-6">
                   <div className="text-right">
                      <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Take</p>
                      <p className="text-6xl font-cinematic font-bold text-white tracking-widest">0{activeTakeNumber}</p>
                   </div>
                   <button 
                    onClick={() => handleShotStatus(shots.find(s => s.status === 'Active')?.id || '', 'Done')}
                    className="flex items-center gap-4 px-12 py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[14px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/50 transition-all active-scale"
                   >
                      <Square size={24} fill="white" /> CUT CAMERA
                   </button>
                </div>
             </div>
          </div>
        )}

        {!isShotRolling && (
          <div className="flex flex-wrap gap-2 mt-12 bg-black/40 p-2 rounded-2xl w-fit backdrop-blur-3xl border border-white/5">
            {[
              { id: 'shots', label: 'SHOT LIST', icon: <Camera size={14} /> },
              { id: 'crew', label: 'CREW AUDIT', icon: <Users size={14} /> },
              { id: 'callsheet', label: 'CALL SHEET', icon: <ClipboardList size={14} /> }
            ].map(tool => (
              <button 
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                  activeTool === tool.id ? 'bg-red-600 text-white shadow-2xl shadow-red-600/30' : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                {tool.icon}
                {tool.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 space-y-8">
          {activeTool === 'shots' && !isShotRolling && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-4">
                <div className="space-y-1">
                  <h3 className="text-3xl font-cinematic font-bold tracking-wide uppercase">Queue: SCENE {currentScene.number}</h3>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{currentScene.setting} • {currentScene.timeOfDay}</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-neutral-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all">
                  <Plus size={16} /> Add Shot
                </button>
              </div>
              
              <div className="grid gap-4">
                {shots.map((shot) => (
                  <div key={shot.id} className={`bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group transition-all relative overflow-hidden ${shot.status === 'Active' ? 'ring-2 ring-red-600 shadow-2xl' : 'hover:bg-black/40'}`}>
                    <div className="flex items-center gap-8 relative z-10">
                       <span className="text-6xl font-cinematic font-bold text-neutral-800 transition-colors group-hover:text-neutral-700">{shot.number}</span>
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-2xl text-white uppercase">{shot.description}</h4>
                          </div>
                          <div className="flex gap-4 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Camera size={12} /> {shot.lens}</span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Activity size={12} /> {shot.movement}</span>
                            {shot.takeCount > 0 && <span className="text-green-500 flex items-center gap-1.5"><CheckCircle2 size={12} /> {shot.takeCount} PREV TAKES</span>}
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                       {shot.status !== 'Done' ? (
                         <button 
                          onClick={() => handleShotStatus(shot.id, 'Active')}
                          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95 flex items-center gap-2"
                         >
                            <Play size={16} fill="white" /> START SETUP
                         </button>
                       ) : (
                         <div className="flex gap-2">
                            <button 
                              onClick={() => handleShotStatus(shot.id, 'Active')}
                              className="p-4 bg-neutral-800 text-neutral-400 hover:text-white rounded-2xl transition-all"
                            >
                              <RotateCcw size={18} />
                            </button>
                            <button 
                              onClick={() => navigate('/logbook')}
                              className="bg-green-500/10 text-green-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-500/20 flex items-center gap-2 hover:bg-green-500 hover:text-black transition-all"
                            >
                               <BookOpen size={16} /> CONTINUITY
                            </button>
                         </div>
                       )}
                       <button className="p-3 text-neutral-600 hover:text-white transition-colors"><MoreVertical size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === 'crew' && (
             <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {['Vikram Malhotra', 'Sarah J.', 'Marcus T.', 'Sonia Ray'].map(name => (
                      <div key={name} className="p-8 bg-neutral-900 border border-white/5 rounded-3xl flex items-center gap-6">
                         <div className="w-16 h-16 rounded-2xl bg-black border border-white/5 overflow-hidden">
                            <img src={`https://picsum.photos/seed/${name}/100`} className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <p className="text-sm font-black text-white uppercase tracking-wide">{name}</p>
                            <div className="flex items-center gap-2 text-[10px] text-green-500 font-bold uppercase tracking-widest">
                               <CheckCircle2 size={14} /> ON SET
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
