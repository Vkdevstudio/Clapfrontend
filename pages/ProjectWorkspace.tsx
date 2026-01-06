
import React, { useState, useEffect } from 'react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { 
  MOCK_PROJECTS, MOCK_SCENES, MOCK_TASKS, MOCK_LOCATIONS, MOCK_CALL_SHEETS, MOCK_MESSAGES 
} from '../constants';
import { 
  Calendar, Layers, Users, CheckCircle2, Clock, 
  MapPin, Radio, Activity, AlertCircle, FileText,
  Zap, Info, MoreVertical, Play, Square, ArrowUpRight, Plus,
  ShieldCheck, X, Check, Archive, Edit3, Target, ShieldOff,
  UserCog, Search, Trash2, Volume2, ChevronRight, History,
  Lock, Eye, Radar, Shield, Fingerprint, Activity as ActivityIcon,
  TrendingUp, Monitor, Database, Sparkles, User, PackageOpen, Loader2,
  // Added missing Award import
  Award
} from 'lucide-react';
import { Scene, UserRole, User as UserType, Capability } from '../types';

const { useNavigate } = ReactRouterDOM;

interface CrewMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  unit: string;
  status: 'Ready' | 'On Break';
  joinedAt: string;
}

const ProjectWorkspace: React.FC<{ role?: UserRole; user?: UserType }> = ({ 
  role = 'production', 
  user 
}) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'brief' | 'slate' | 'focus' | 'crew' | 'info'>('brief');
  const [isRolling, setIsRolling] = useState(false);
  const [timer, setTimer] = useState(0);
  const [acknowledged, setAcknowledged] = useState(false);
  const [showWrapModal, setShowWrapModal] = useState(false);
  const [isWrapping, setIsWrapping] = useState(false);
  const [isWrapped, setIsWrapped] = useState(false);
  
  // Crew State
  const [crew, setCrew] = useState<CrewMember[]>([
    { id: '1', name: 'Marcus T.', role: 'DOP', dept: 'Camera', unit: 'Unit A', status: 'Ready', joinedAt: '08:30' },
    { id: '2', name: 'Sonia Ray', role: '1st AC', dept: 'Camera', unit: 'Unit A', status: 'Ready', joinedAt: '08:45' },
    { id: '3', name: 'Sarah J.', role: '1st AD', dept: 'Direction', unit: 'Unit A', status: 'Ready', joinedAt: 'Yesterday' },
    { id: '4', name: 'Rajesh Kumar', role: 'Director', dept: 'Direction', unit: 'Unit A', status: 'Ready', joinedAt: 'Yesterday' },
  ]);

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const location = MOCK_LOCATIONS.find(l => l.id === callSheet.locationId)!;

  const hasCapability = (cap: Capability) => {
    if (role === 'admin') return true;
    return user?.capabilities?.includes(cap) || false;
  };

  const filteredScenes = MOCK_SCENES.filter(s => {
    const sceneMatchesUser = user?.assignedScenes ? user.assignedScenes.includes(s.id) : true;
    const unitMatchesUser = user?.assignedUnits ? user.assignedUnits.includes(s.unit || 'Unit A') : true;
    return sceneMatchesUser && unitMatchesUser;
  });

  useEffect(() => {
    let interval: any;
    if (isRolling) {
      interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isRolling]);

  const formatTimecode = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}:00`;
  };

  const handleFinalHandshake = () => {
    setIsWrapping(true);
    // Wrap Protocol Simulation: Lock script, archive media, release remaining bonds
    setTimeout(() => {
      setIsWrapping(false);
      setIsWrapped(true);
      setShowWrapModal(false);
    }, 3000);
  };

  return (
    <div className={`min-h-screen -mt-12 -mx-4 md:-mx-8 flex flex-col bg-neutral-950 transition-colors duration-700 ${isRolling ? 'bg-red-950/10' : ''} ${isWrapped ? 'grayscale contrast-125' : ''}`}>
      
      {/* 1. TOP STATUS BAR */}
      <header className={`sticky top-0 z-[100] px-6 py-4 border-b backdrop-blur-3xl transition-all duration-500 ${
        isWrapped ? 'bg-neutral-900 border-white/10' :
        isRolling ? 'bg-red-600 border-red-500 shadow-2xl' : 'bg-neutral-900/80 border-white/5'
      }`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-3">
                <div className={`w-2.5 h-2.5 rounded-full ${isWrapped ? 'bg-neutral-600' : isRolling ? 'bg-white animate-pulse shadow-[0_0_10px_white]' : 'bg-red-600 animate-pulse'}`} />
                <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${isRolling ? 'text-white' : 'text-neutral-400'}`}>
                  {isWrapped ? 'SLATE ARCHIVED' : isRolling ? 'ROLLING NOW' : 'SET STANDBY'}
                </span>
             </div>
             <div className="hidden sm:flex items-center gap-3 border-l border-white/10 pl-6">
                <p className={`text-[10px] font-black uppercase tracking-widest ${isRolling ? 'text-white' : 'text-neutral-500'}`}>
                  {project.title} <span className="mx-2 opacity-30">/</span> DAY {project.currentShootDay}
                </p>
             </div>
          </div>
          <p className={`text-xl md:text-2xl font-cinematic font-bold tracking-[0.2em] tabular-nums ${isRolling ? 'text-white' : 'text-red-500'}`}>
            {formatTimecode(timer)}
          </p>
        </div>
      </header>

      {/* 2. MAIN WORKSPACE ENGINE */}
      <main className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
        <div className="flex-1 overflow-y-auto p-4 md:p-10 space-y-10 scrollbar-hide pb-40">
          
          {/* WRAP SUCCESS BANNER */}
          {isWrapped && (
            <section className="animate-in slide-in-from-top-4 duration-1000">
               <div className="bg-neutral-900 border border-white/20 p-10 rounded-[3.5rem] text-center space-y-6 shadow-4xl relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_2s_infinite] pointer-events-none" />
                  <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto text-green-500 border border-green-500/20">
                     <Award size={40} />
                  </div>
                  <div className="space-y-2">
                     <h2 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase tracking-widest">Slate Wrapped</h2>
                     <p className="text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-widest">Protocol 12.4 Complete • Script Locked • Ledger Archived</p>
                  </div>
                  <button onClick={() => navigate('/projects')} className="bg-white text-black px-10 py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest active-scale">
                     EXIT COMMAND CENTER
                  </button>
               </div>
            </section>
          )}

          {/* HANDSHAKE: READY TO START */}
          {!acknowledged && !isWrapped && (
            <section className="animate-in fade-in slide-in-from-top-4 duration-700">
               <div className="bg-red-600 p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-3xl flex flex-col md:flex-row items-center justify-between gap-8 border border-red-500">
                  <div className="flex items-center gap-6 text-center md:text-left">
                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shrink-0 border border-white/30">
                        <AlertCircle size={32} className="text-white" />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Ready for the shoot?</h4>
                        <p className="text-[10px] md:text-xs font-black text-white/70 uppercase tracking-widest">Let us know you've read today's brief.</p>
                     </div>
                  </div>
                  <button 
                    onClick={() => setAcknowledged(true)}
                    className="w-full md:w-auto px-12 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:scale-105 transition-all active-scale"
                  >
                     I'M READY TO START
                  </button>
               </div>
            </section>
          )}

          {/* TAB: DAILY BRIEF */}
          {activeTab === 'brief' && (
            <div className="space-y-10 animate-in fade-in duration-500">
               <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8 shadow-2xl relative overflow-hidden">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-red-500">
                           <FileText size={20} />
                           <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">Daily Brief</h3>
                        </div>
                        <span className="text-[9px] font-black text-green-500 uppercase px-3 py-1 bg-green-500/10 rounded-full border border-green-500/20">TODAY</span>
                     </div>
                     <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                           <div>
                              <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Call Time</p>
                              <p className="text-3xl font-cinematic font-bold text-white tracking-widest">{callSheet.callTime}</p>
                           </div>
                           <div>
                              <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Target Wrap</p>
                              <p className="text-3xl font-cinematic font-bold text-neutral-500 tracking-widest">18:30</p>
                           </div>
                        </div>
                        <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                           <div className="flex items-center gap-3">
                              <MapPin size={14} className="text-red-500" />
                              <p className="text-[10px] font-bold text-neutral-300 uppercase truncate">{location.name}</p>
                           </div>
                           <p className="text-xs text-neutral-500 italic leading-relaxed">"Focus on the lighting for the hallway scene. We need a soft, cinematic vibe today."</p>
                        </div>
                     </div>
                  </div>

                  <div className="bg-neutral-900 border border-white/5 p-8 md:p-12 rounded-[3rem] space-y-8 shadow-2xl">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-blue-500">
                           <Layers size={20} />
                           <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">The Slate</h3>
                        </div>
                        <span className="text-[8px] font-black text-neutral-600 uppercase">{filteredScenes.length} SCENES FOR YOU</span>
                     </div>
                     <div className="space-y-3">
                        {filteredScenes.map(scene => (
                           <div key={scene.id} className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-red-600/30 transition-all cursor-pointer">
                              <div className="flex items-center gap-4">
                                 <div className="w-10 h-10 bg-neutral-800 rounded-xl flex items-center justify-center text-xl font-cinematic font-bold text-white group-hover:bg-red-600 transition-colors">{scene.number}</div>
                                 <div className="space-y-0.5">
                                    <p className="text-sm font-bold text-white uppercase group-hover:text-red-500 transition-colors">{scene.title}</p>
                                    <p className="text-[8px] font-black text-neutral-700 uppercase">{scene.setting} • {scene.pages} PAGES</p>
                                 </div>
                              </div>
                              <ArrowUpRight size={16} className="text-neutral-800 group-hover:text-white transition-all" />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* TAB: OUR CREW */}
          {activeTab === 'crew' && (
            <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                  <div className="space-y-1">
                     <h2 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Our Crew.</h2>
                     <p className="text-neutral-500 text-sm md:text-lg font-medium italic">Everyone working on this unit today.</p>
                  </div>
                  <div className="relative w-full md:w-80 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500" size={16} />
                    <input 
                      type="text" 
                      placeholder="Find someone..." 
                      className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                  </div>
               </div>

               <div className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-black/40 border-b border-white/5">
                        <th className="p-6 text-[9px] font-black text-neutral-600 uppercase tracking-widest">Name</th>
                        <th className="p-6 text-[9px] font-black text-neutral-600 uppercase tracking-widest">Role</th>
                        <th className="p-6 text-[9px] font-black text-neutral-600 uppercase tracking-widest text-center">Status</th>
                        <th className="p-6 text-[9px] font-black text-neutral-600 uppercase tracking-widest text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {crew.map((member) => (
                        <tr key={member.id} className="group hover:bg-white/[0.02] transition-all">
                          <td className="p-6">
                             <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-red-500 border border-white/5">
                                   <User size={20} />
                                </div>
                                <div>
                                   <p className="text-sm font-bold text-white uppercase tracking-wide leading-none">{member.name}</p>
                                   <p className="text-[8px] text-neutral-700 font-black uppercase mt-1.5 leading-none">Joined {member.joinedAt}</p>
                                </div>
                             </div>
                          </td>
                          <td className="p-6">
                             <p className="text-[10px] font-black text-white uppercase tracking-widest leading-none">{member.role}</p>
                             <p className="text-[9px] text-blue-500 font-bold uppercase tracking-tighter">{member.unit}</p>
                          </td>
                          <td className="p-6 text-center">
                             <span className={`text-[8px] font-black uppercase tracking-[0.2em] ${member.status === 'Ready' ? 'text-green-500' : 'text-red-500'}`}>
                                {member.status}
                             </span>
                          </td>
                          <td className="p-6 text-right">
                             <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-xl transition-all"><Radio size={16}/></button>
                                {hasCapability('ASSIGN') && (
                                  <button 
                                    onClick={() => setCrew(prev => prev.map(m => m.id === member.id ? {...m, status: m.status === 'Ready' ? 'On Break' : 'Ready'} : m))}
                                    className={`p-2.5 rounded-xl transition-all ${member.status === 'Ready' ? 'bg-red-600/10 text-red-500' : 'bg-green-600/10 text-green-500'}`}
                                  >
                                    <Clock size={16}/>
                                  </button>
                                )}
                             </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
               </div>
            </div>
          )}

          {/* TAB: FILM INFO */}
          {activeTab === 'info' && (
            <div className="space-y-8 animate-in fade-in duration-500">
               <section className="bg-neutral-900 border border-white/5 p-10 md:p-14 rounded-[3.5rem] space-y-12 shadow-3xl overflow-hidden relative">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                     <div className="space-y-1">
                        <h3 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Film <br />Project.</h3>
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">General production details.</p>
                     </div>
                     <div className="flex gap-3 w-full md:w-auto">
                        {!isWrapped && (
                          <button 
                            onClick={() => setShowWrapModal(true)}
                            className="flex-1 md:flex-none py-4 px-8 bg-neutral-800 border border-red-900/40 text-red-500 font-black rounded-2xl text-[10px] uppercase tracking-widest hover:bg-red-900/10 transition-all shadow-xl"
                          >
                             WRAP PRODUCTION
                          </button>
                        )}
                        <button 
                          onClick={() => navigate('/projects/new')}
                          className="flex-1 md:flex-none py-4 px-8 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 active-scale"
                        >
                           <Plus size={18} className="inline mr-2" /> START A NEW FILM
                        </button>
                     </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-12 relative z-10 border-t border-white/5 pt-12">
                     <div className="space-y-8">
                        <div className="space-y-2">
                           <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Story Logline</p>
                           <p className="text-lg text-neutral-400 leading-relaxed font-medium italic">"{project.description}"</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-1">
                              <p className="text-[8px] font-black text-neutral-600 uppercase">Shoot Progress</p>
                              <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">Day {project.currentShootDay} / {project.totalShootDays}</p>
                           </div>
                           <div className="bg-black/40 border border-white/5 p-6 rounded-2xl space-y-1">
                              <p className="text-[8px] font-black text-neutral-600 uppercase">Status</p>
                              <p className={`text-xl font-cinematic font-bold uppercase tracking-widest ${isWrapped ? 'text-neutral-500' : 'text-red-500'}`}>
                                {isWrapped ? 'ARCHIVED' : 'FILMING'}
                              </p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="space-y-6">
                        <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Working Units</p>
                        <div className="space-y-3">
                           {project.units.map(unit => (
                              <div key={unit.id} className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-red-600/30 transition-all">
                                 <div className="flex items-center gap-4">
                                    <div className={`w-2 h-2 rounded-full ${unit.name.includes('Main') ? 'bg-red-600' : 'bg-blue-600'} animate-pulse`} />
                                    <span className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{unit.name}</span>
                                 </div>
                                 <div className="flex items-center gap-3">
                                    <span className="text-[8px] font-black text-green-500 uppercase tracking-widest bg-green-500/10 px-2 py-0.5 rounded">{isWrapped ? 'OFFLINE' : 'ONLINE'}</span>
                                    <ChevronRight size={14} className="text-neutral-800" />
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {/* TAB: ON AIR (Focus) */}
          {activeTab === 'focus' && (
            <div className="space-y-12 animate-in zoom-in-95 duration-700">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3 text-red-500">
                        <Radio size={24} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em]">Active Camera Setup</span>
                     </div>
                     <h1 className="text-6xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
                        SH-12B-04
                     </h1>
                  </div>
                  <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] min-w-[200px] text-center shadow-3xl">
                     <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Current Take</p>
                     <p className={`text-6xl font-cinematic font-bold tabular-nums ${isRolling ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        03
                     </p>
                  </div>
               </div>

               <div className="space-y-4">
                  {isWrapped ? (
                     <div className="py-16 text-center bg-neutral-900 border border-white/10 rounded-[3rem] space-y-4">
                        <Lock size={48} className="mx-auto text-neutral-700" />
                        <p className="text-xl font-cinematic font-bold text-neutral-500 uppercase tracking-widest">Set Commands Locked</p>
                     </div>
                  ) : isRolling ? (
                     <button 
                        onClick={() => setIsRolling(false)}
                        className="w-full py-16 bg-red-600 hover:bg-red-700 text-white font-black rounded-[3rem] text-sm uppercase tracking-[0.6em] shadow-[0_20px_80px_rgba(220,38,38,0.4)] transition-all active-scale flex items-center justify-center gap-10 group"
                     >
                        <Square size={48} fill="white" className="group-hover:scale-110 transition-transform" /> FINISH TAKE / LOG IT
                     </button>
                  ) : (
                     <div className="flex flex-col md:flex-row gap-4">
                        <button 
                           onClick={() => setIsRolling(true)}
                           className="flex-[3] py-10 bg-white text-black font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-6"
                        >
                           <Play size={28} fill="black"/> START FILMING
                        </button>
                        <button className="flex-1 py-10 bg-neutral-900 text-neutral-500 font-black border border-white/5 rounded-[2.5rem] text-[10px] uppercase tracking-[0.4em] active-scale hover:text-white transition-all">
                           QUICK PICK-UP
                        </button>
                     </div>
                  )}
               </div>

               <div className="grid md:grid-cols-3 gap-6">
                  {[
                     { label: 'Technical Quality', val: '8K MASTER', icon: <Monitor size={18}/> },
                     { label: 'Sound Bridge', val: 'LOCKED', icon: <Volume2 size={18}/> },
                     { label: 'Cloud Sync', val: 'SAFE', icon: <Database size={18}/> }
                  ].map(stat => (
                     <div key={stat.label} className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-3 group hover:border-white/20 transition-all shadow-xl">
                        <div className="flex items-center gap-3 text-neutral-600 group-hover:text-red-500 transition-colors">
                           {stat.icon}
                           <span className="text-[8px] font-black uppercase tracking-widest">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-cinematic font-bold text-white tracking-widest">{stat.val}</p>
                     </div>
                  ))}
               </div>
            </div>
          )}

          {/* TAB: THE SLATE (Scenes) */}
          {activeTab === 'slate' && (
            <div className="space-y-6 animate-in fade-in duration-500">
               {MOCK_SCENES.map(s => (
                  <div key={s.id} className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-red-600/30 transition-all shadow-xl relative overflow-hidden active-scale">
                    <div className="flex items-center gap-10">
                       <span className="text-7xl font-cinematic font-bold text-white/5 group-hover:text-red-600/10 transition-colors shrink-0">{s.number}</span>
                       <div className="space-y-2">
                          <h4 className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{s.title}</h4>
                          <div className="flex items-center gap-6">
                             <span className="text-[10px] font-black text-neutral-700 uppercase">Unit: {s.unit || 'Unit A'}</span>
                             <span className={`text-[10px] font-black uppercase tracking-widest ${s.status === 'Shot' ? 'text-green-500' : 'text-red-500'}`}>{s.status === 'Shot' ? 'WRAPPED' : 'TO DO'}</span>
                          </div>
                       </div>
                    </div>
                    <button className="bg-neutral-800 p-4 rounded-2xl text-neutral-500 hover:bg-white hover:text-black transition-all shadow-lg">
                       <ChevronRight size={24} />
                    </button>
                  </div>
               ))}
            </div>
          )}

        </div>

        {/* 3. RESPONSIVE SIDEBAR: THE SET EYE */}
        <aside className="hidden lg:flex flex-col lg:w-80 xl:w-96 shrink-0 border-l border-white/5 bg-neutral-950 p-6 xl:p-10 space-y-12 sticky top-0 h-[calc(100vh-80px)] overflow-y-auto scrollbar-hide">
           <header className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-red-500">
                 <Eye size={20} className="animate-pulse" />
                 <h4 className="text-lg xl:text-xl font-cinematic font-bold tracking-widest uppercase">The Set Eye</h4>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase border border-green-500/20">
                 ALL GOOD
              </div>
           </header>

           <div className="space-y-10">
              {/* Surveillance Log / Vibe Feed */}
              <section className="space-y-6">
                 <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Live Intelligence</h4>
                 <div className="space-y-4">
                    {[
                      { time: '14:20', event: 'Unit A Vibe', desc: 'Efficiency at 98%. Energy is high.', type: 'nominal' },
                      { time: '14:18', event: 'Script Logic', desc: 'Scene 14 dialogue modified.', type: 'info' },
                      { time: '14:12', event: 'Registry Lock', desc: 'Secure Escrow verified for DP.', type: 'nominal' }
                    ].map((log, i) => (
                      <div key={i} className="p-5 bg-neutral-900 border border-white/5 rounded-2xl space-y-2 group hover:border-red-600/30 transition-all">
                         <div className="flex justify-between">
                            <span className="text-[9px] font-black text-red-500 uppercase">{log.event}</span>
                            <span className="text-[8px] font-bold text-neutral-700">{log.time}</span>
                         </div>
                         <p className="text-[11px] text-neutral-400 font-medium italic">"{log.desc}"</p>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Set Health Status */}
              <section className="space-y-6">
                 <h4 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Unit Status</h4>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl space-y-1 group hover:border-blue-600/30 transition-all">
                       <p className="text-[8px] font-black text-neutral-600 uppercase group-hover:text-blue-500">Latency</p>
                       <p className="text-xl font-cinematic font-bold text-white uppercase tabular-nums">12ms</p>
                    </div>
                    <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl space-y-1 group hover:border-green-600/30 transition-all">
                       <p className="text-[8px] font-black text-neutral-600 uppercase group-hover:text-green-500">Sync</p>
                       <p className="text-xl font-cinematic font-bold text-white uppercase">HEALTHY</p>
                    </div>
                 </div>
              </section>

              {/* Broadcast Node */}
              <section className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-[2.5rem] space-y-6 group shadow-xl">
                 <div className="flex items-center gap-3 text-blue-500">
                    <Volume2 size={20} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">Radio Feed</span>
                 </div>
                 <p className="text-[12px] text-neutral-400 font-medium italic leading-relaxed">
                   "Unit A is performing strictly to schedule. Logistics suggest finalizing meal breaks."
                 </p>
              </section>
           </div>
           
           <div className="mt-auto shrink-0 space-y-4 pt-10 border-t border-white/5">
              <button 
                onClick={() => navigate('/ai-genie')}
                className="w-full py-6 bg-neutral-900 border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 hover:bg-neutral-800 transition-all active-scale shadow-2xl"
              >
                  ASK GENIE FOR HELP <ChevronRight size={18} />
              </button>
           </div>
        </aside>
      </main>

      {/* 4. DYNAMIC RESPONSIVE HUD (BOTTOM NAV) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-neutral-900/90 backdrop-blur-3xl border border-white/10 p-2 rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] flex items-center gap-1.5 transition-all duration-500 hover:scale-105 active:scale-95 lg:bottom-12">
         {[
           { id: 'brief', icon: <FileText size={18}/>, label: 'BRIEF' },
           { id: 'focus', icon: <Radio size={18}/>, label: 'LIVE' },
           { id: 'slate', icon: <Layers size={18}/>, label: 'SLATE' },
           { id: 'crew', icon: <Users size={18}/>, label: 'CREW' },
           { id: 'info', icon: <Info size={18}/>, label: 'INFO' },
         ].map(tool => (
           <button 
            key={tool.id}
            onClick={() => setActiveTab(tool.id as any)}
            className={`flex items-center gap-2.5 px-6 py-4 rounded-full transition-all duration-300 relative ${
              activeTab === tool.id ? 'bg-red-600 text-white shadow-xl scale-110' : 'text-neutral-500 hover:text-white'
            }`}
           >
             {tool.icon}
             <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">{tool.label}</span>
             {activeTab === tool.id && (
               <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping" />
             )}
           </button>
         ))}
      </nav>

      {/* WRAP PROTOCOL MODAL (FEATURE REQ) */}
      {showWrapModal && (
        <div className="fixed inset-0 z-[500] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => !isWrapping && setShowWrapModal(false)} />
           <div className="bg-neutral-900 border border-red-600/30 rounded-[3rem] p-10 md:p-14 max-w-xl w-full relative z-10 shadow-4xl text-center space-y-10 animate-in zoom-in-95 duration-500">
              
              {!isWrapping ? (
                <>
                  <div className="w-24 h-24 bg-red-600/10 rounded-3xl flex items-center justify-center mx-auto text-red-600 border border-red-600/20">
                     <Archive size={48} />
                  </div>
                  <div className="space-y-4">
                     <h2 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Execute Wrap Protocol?</h2>
                     <p className="text-neutral-500 text-sm font-medium leading-relaxed italic">
                       "This action locks the current script draft, archives all logged takes, and prepares the final departmental handshakes. This is irreversible."
                     </p>
                  </div>
                  <div className="flex gap-4">
                     <button onClick={() => setShowWrapModal(false)} className="flex-1 py-5 bg-neutral-800 text-neutral-400 font-black rounded-2xl text-[10px] uppercase tracking-widest active-scale">CANCEL</button>
                     <button onClick={handleFinalHandshake} className="flex-[2] py-5 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active-scale">INITIALIZE FINAL WRAP</button>
                  </div>
                </>
              ) : (
                <div className="space-y-10 py-10">
                   <div className="relative w-24 h-24 mx-auto">
                      <div className="absolute inset-0 border-4 border-red-600/20 rounded-3xl animate-ping" />
                      <div className="relative w-full h-full bg-neutral-900 rounded-3xl flex items-center justify-center">
                         <Loader2 size={40} className="text-red-500 animate-spin" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Archiving Project Ledger...</h3>
                      <p className="text-neutral-600 text-[10px] font-black uppercase tracking-[0.4em] animate-pulse">Syncing Department Nodes</p>
                   </div>
                </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

export default ProjectWorkspace;
