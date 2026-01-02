
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
  History,
  Activity,
  Check,
  Zap,
  CheckCircle2,
  MoreVertical,
  X,
  FileText,
  Share2,
  ChevronRight,
  Play,
  RotateCcw
} from 'lucide-react';
import { ShotStatus } from '../types';
import { useNavigate } from 'react-router-dom';

const ProjectWorkspace: React.FC = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<string>('shots');
  const [shots, setShots] = useState(MOCK_SHOTS);
  const [activeShotTimer, setActiveShotTimer] = useState(0);
  const [isShotRolling, setIsShotRolling] = useState(false);

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

  useEffect(() => {
    let interval: any;
    if (isShotRolling) {
      interval = setInterval(() => setActiveShotTimer(t => t + 1), 1000);
    } else {
      setActiveShotTimer(0);
    }
    return () => clearInterval(interval);
  }, [isShotRolling]);

  const handleShotStatus = (id: string, newStatus: ShotStatus) => {
    if (newStatus === 'Active') setIsShotRolling(true);
    if (newStatus === 'Done') setIsShotRolling(false);
    
    setShots(prev => prev.map(s => {
      if (s.id === id) {
        return { 
          ...s, 
          status: newStatus, 
          takeCount: newStatus === 'Done' ? s.takeCount + 1 : s.takeCount 
        };
      }
      return s;
    }));
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      {/* Set Header: Mission Control */}
      <div className="relative rounded-[3rem] overflow-hidden bg-neutral-900 border border-white/5 p-8 md:p-12 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
          <Clapperboard size={300} />
        </div>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-red-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-white shadow-2xl shadow-red-600/40">DAY {project.currentShootDay} / {project.totalShootDays}</span>
              <span className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">SET LIVE: UNIT A</span>
              <span className="text-accent text-[10px] font-black uppercase tracking-[0.2em] bg-accent/10 px-4 py-1.5 rounded-full">SCENE {currentScene.number} IN PROGRESS</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter leading-none uppercase">{project.title}</h2>
            <div className="flex flex-wrap items-center gap-8 text-[10px] text-neutral-400 font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2.5"><MapPin size={18} className="text-red-500" /> {currentScene.location}</span>
              <span className="flex items-center gap-2.5"><Clock size={18} className="text-blue-500" /> Crew Call: {callSheet.crewCall}</span>
              <span className="flex items-center gap-2.5 text-green-500"><Activity size={18} /> OPERATIONAL SYNC ACTIVE</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 justify-end items-end">
             <button 
              onClick={() => navigate('/ai-genie')}
              className="px-10 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all hover:bg-neutral-200 shadow-2xl active:scale-95 flex items-center gap-2"
             >
                <Zap size={16} /> GENIE ANALYSIS
             </button>
          </div>
        </div>

        {/* Operational Toolbar */}
        <div className="flex flex-wrap gap-2 mt-12 bg-black/40 p-2 rounded-2xl w-fit backdrop-blur-3xl border border-white/5">
          {[
            { id: 'shots', label: 'SHOT LIST', icon: <Camera size={14} /> },
            { id: 'crew', label: 'SILENT AUDIT', icon: <Users size={14} /> },
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
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {activeTool === 'shots' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <div className="space-y-1">
                  <h3 className="text-3xl font-cinematic font-bold tracking-wide uppercase">SCENE {currentScene.number}: {currentScene.title}</h3>
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{currentScene.setting} • {currentScene.timeOfDay} • {currentScene.pages} PAGES</p>
                </div>
                <button className="flex items-center gap-2 bg-red-600/10 text-red-500 px-5 py-3 rounded-xl text-[10px] font-black hover:bg-red-600/20 transition-all uppercase tracking-widest">
                  <Plus size={16} /> NEW SHOT
                </button>
              </div>
              
              <div className="space-y-4">
                {shots.map((shot) => (
                  <div key={shot.id} className={`bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group transition-all relative overflow-hidden ${shot.status === 'Active' ? 'ring-2 ring-red-600 shadow-2xl shadow-red-600/20 bg-black/60' : 'hover:bg-black/40'}`}>
                    {shot.status === 'Active' && (
                      <div className="absolute top-0 left-0 bottom-0 w-1 bg-red-600 animate-pulse" />
                    )}
                    <div className="flex items-center gap-8 relative z-10">
                       <span className={`text-6xl font-cinematic font-bold transition-colors ${shot.status === 'Active' ? 'text-red-500' : 'text-neutral-800'}`}>{shot.number}</span>
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-bold text-2xl text-white uppercase">{shot.description}</h4>
                            {shot.status === 'Active' && (
                              <span className="flex items-center gap-1.5 px-3 py-1 bg-red-600 text-[10px] font-black rounded-full text-white animate-pulse">
                                <Play size={10} fill="white" /> ROLLING {formatTime(activeShotTimer)}
                              </span>
                            )}
                          </div>
                          <div className="flex gap-4 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Camera size={12} /> {shot.lens}</span>
                            <span className="flex items-center gap-1.5 bg-white/5 px-3 py-1 rounded-full"><Activity size={12} /> {shot.movement}</span>
                            {shot.takeCount > 0 && <span className="text-green-500 flex items-center gap-1.5"><CheckCircle2 size={12} /> {shot.takeCount} {shot.takeCount === 1 ? 'TAKE' : 'TAKES'}</span>}
                          </div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-10">
                       {shot.status === 'Todo' && (
                         <button 
                          onClick={() => handleShotStatus(shot.id, 'Active')}
                          className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                         >
                            ROLL CAMERA
                         </button>
                       )}
                       {shot.status === 'Active' && (
                         <button 
                          onClick={() => handleShotStatus(shot.id, 'Done')}
                          className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl active:scale-95"
                         >
                            CUT & WRAP
                         </button>
                       )}
                       {shot.status === 'Done' && (
                         <div className="flex gap-2">
                            <button 
                              onClick={() => handleShotStatus(shot.id, 'Active')}
                              className="p-4 bg-neutral-800 text-neutral-400 hover:text-white rounded-2xl transition-all"
                              title="Retake"
                            >
                              <RotateCcw size={18} />
                            </button>
                            <div className="bg-green-500/10 text-green-500 px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-green-500/20 flex items-center gap-2">
                               <CheckCircle2 size={16} /> COMPLETED
                            </div>
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
            <div className="space-y-6">
               <div className="flex justify-between items-center px-2">
                 <h3 className="text-3xl font-cinematic font-bold tracking-wide uppercase">Silent Crew Acknowledgment</h3>
                 <button 
                  onClick={() => navigate(`/projects/${project.id}/callsheets`)}
                  className="text-[10px] font-black text-red-500 bg-red-600/10 px-4 py-2 rounded-full border border-red-600/20 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest flex items-center gap-2"
                 >
                    Manage Distribution <ChevronRight size={14} />
                 </button>
               </div>
               <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Vikram Malhotra', dept: 'Talent', status: 'Confirmed', time: '06:15 AM' },
                    { name: 'Sonia Ray', dept: 'Camera', status: 'Confirmed', time: '06:45 AM' },
                    { name: 'Rajesh Kumar', dept: 'Art Dept', status: 'Pending', time: '--' },
                    { name: 'Sarah J.', dept: 'Direction', status: 'Confirmed', time: '06:30 AM' }
                  ].map(c => (
                    <div key={c.name} className="bg-neutral-900 border border-white/5 p-8 rounded-[2rem] flex justify-between items-center group transition-all">
                       <div>
                          <p className="text-[10px] font-black text-neutral-500 mb-1 uppercase tracking-widest">{c.dept}</p>
                          <p className="text-xl font-bold text-white uppercase">{c.name}</p>
                       </div>
                       <div className="text-right">
                          <div className={`flex items-center gap-2 justify-end text-[10px] font-black uppercase tracking-widest ${c.status === 'Confirmed' ? 'text-green-500' : 'text-neutral-600'}`}>
                             {c.status === 'Confirmed' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                             {c.status}
                          </div>
                          {c.status === 'Confirmed' && <p className="text-[9px] text-neutral-700 font-bold uppercase mt-1">@ {c.time}</p>}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {activeTool === 'callsheet' && (
            <div className="space-y-8 animate-in fade-in">
               <div className="flex justify-between items-center px-2">
                 <h3 className="text-3xl font-cinematic font-bold tracking-wide uppercase">Active Call Sheet</h3>
                 <button 
                  onClick={() => navigate(`/projects/${project.id}/callsheets`)}
                  className="bg-white text-black px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-neutral-200 transition-all"
                 >
                    EDIT CALL SHEET
                 </button>
               </div>
               <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 space-y-12">
                  <div className="flex flex-col md:flex-row justify-between gap-10">
                     <div className="space-y-6">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">General Crew Call</p>
                           <p className="text-7xl font-cinematic font-bold text-white tracking-tighter">{callSheet.crewCall}</p>
                        </div>
                        <div className="flex gap-8">
                           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                              <MapPin size={16} className="text-red-500" /> {callSheet.location}
                           </div>
                           <div className="flex items-center gap-2 text-[10px] font-black text-neutral-400 uppercase tracking-widest">
                              <Activity size={16} className="text-blue-500" /> {callSheet.weather}
                           </div>
                        </div>
                     </div>
                     <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] h-fit">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-3">Shoot Progress</p>
                        <p className="text-4xl font-cinematic font-bold text-white">DAY {callSheet.shootDay}</p>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Intelligence Sidebar */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Zap size={140} />
              </div>
              <h4 className="text-xl font-cinematic font-bold tracking-widest mb-10 uppercase text-white">GENIE LIVE FEED</h4>
              <div className="space-y-6">
                 <div className="p-8 bg-red-600/5 border border-red-600/20 rounded-[2rem] space-y-3">
                    <div className="flex items-center gap-3 text-red-500">
                       <Zap size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Operational Intelligence</span>
                    </div>
                    <p className="text-sm text-neutral-300 leading-relaxed italic font-medium">
                      {isShotRolling 
                        ? `"Rolling Shot ${shots.find(s => s.status === 'Active')?.number}. Focus on character beats. Audio levels normalized."`
                        : `"Unit A is efficient. Suggested: Pre-light Scene 13 while wrapping current setup to save 45 mins."`
                      }
                    </p>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
