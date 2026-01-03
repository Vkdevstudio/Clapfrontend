
import React, { useState } from 'react';
import { MOCK_SCENES, MOCK_SHOTS } from '../constants';
import { 
  Clapperboard, 
  Plus, 
  ChevronRight, 
  ChevronDown, 
  GripVertical, 
  Camera, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  MoreVertical,
  Layers,
  Sparkles,
  Search,
  Calendar,
  Zap,
  Play,
  Monitor,
  LayoutGrid,
  Filter,
  Maximize2,
  Settings2,
  Activity,
  MapPin
} from 'lucide-react';
import { Scene, Shot } from '../types';
import { useNavigate } from 'react-router-dom';

const SceneShotManager: React.FC = () => {
  const navigate = useNavigate();
  const [scenes] = useState<Scene[]>(MOCK_SCENES);
  const [expandedScenes, setExpandedScenes] = useState<Set<string>>(new Set([MOCK_SCENES[0].id]));
  const [scheduledToday, setScheduledToday] = useState<Set<string>>(new Set([MOCK_SCENES[0].id]));

  const toggleScene = (id: string) => {
    const newExpanded = new Set(expandedScenes);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedScenes(newExpanded);
  };

  const toggleToday = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newToday = new Set(scheduledToday);
    if (newToday.has(id)) newToday.delete(id);
    else newToday.add(id);
    setScheduledToday(newToday);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-28 md:pb-20 max-w-7xl mx-auto px-0 md:px-4">
      
      {/* 1. WORKFLOW HEADER */}
      <header className="flex flex-col gap-6 px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-red-500">
              <Activity size={18} className="animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Slate v4.2</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Global Slate</h1>
            <p className="text-neutral-500 text-sm md:text-lg font-medium italic">Production Hierarchy • Multi-Unit Synchronization</p>
          </div>
          
          <div className="flex gap-3">
            <div className="hidden sm:flex bg-neutral-900 border border-white/5 rounded-2xl p-1 shadow-xl">
              <button className="p-3 bg-red-600 text-white rounded-xl shadow-lg transition-all"><LayoutGrid size={18} /></button>
              <button className="p-3 text-neutral-600 hover:text-white transition-all"><Monitor size={18} /></button>
            </div>
            <button className="flex-1 md:flex-none bg-white px-8 md:px-10 py-4 md:py-5 rounded-2xl text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center justify-center gap-3 active-scale transition-all hover:bg-neutral-200">
              <Plus size={18} /> INITIALIZE SCENE
            </button>
          </div>
        </div>

        {/* 2. LOGISTICS RIBBON (Stats) */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-4">
          {[
            { label: 'Total Scenes', val: '45', icon: <Layers size={16}/>, color: 'text-white' },
            { label: 'Today Lock', val: scheduledToday.size, icon: <Calendar size={16}/>, color: 'text-red-500' },
            { label: 'Shot Density', val: '142', icon: <Camera size={16}/>, color: 'text-blue-500' },
            { label: 'Wrap EST', val: '19:45', icon: <Clock size={16}/>, color: 'text-green-500' }
          ].map((stat, i) => (
            <div key={i} className="flex-shrink-0 w-44 md:w-full bg-neutral-900 border border-white/5 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] space-y-3 group hover:border-white/20 transition-all shadow-xl active-scale">
              <div className="flex items-center gap-3 text-neutral-500">
                {stat.icon}
                <span className="text-[9px] font-black uppercase tracking-widest leading-none">{stat.label}</span>
              </div>
              <p className={`text-3xl font-cinematic font-bold tracking-widest ${stat.color}`}>{stat.val}</p>
            </div>
          ))}
        </div>
      </header>

      {/* 3. SEARCH & FILTERS */}
      <div className="sticky top-16 md:relative md:top-0 z-40 bg-neutral-950/80 backdrop-blur-xl border-y md:border-none border-white/5 px-4 py-3 md:p-0 md:mb-6 flex items-center gap-3">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Slate Ledger..."
            className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700 uppercase"
          />
        </div>
        <button className="p-4 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-500 hover:text-white transition-all active-scale">
          <Filter size={18} />
        </button>
      </div>

      {/* 4. MAIN SLATE ENGINE */}
      <div className="grid lg:grid-cols-12 gap-8 px-4 md:px-0">
        <div className="lg:col-span-8 space-y-4">
          {scenes.map((scene) => (
            <div key={scene.id} className={`group bg-neutral-900 border rounded-[2rem] md:rounded-[3rem] overflow-hidden transition-all shadow-2xl relative ${
              scheduledToday.has(scene.id) ? 'border-red-600/40 bg-red-950/5' : 'border-white/5'
            }`}>
              {/* Scene Slate Header */}
              <div 
                onClick={() => toggleScene(scene.id)}
                className={`p-6 md:p-10 flex items-center justify-between cursor-pointer transition-all ${expandedScenes.has(scene.id) ? 'bg-black/40' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-6 md:gap-10">
                  <GripVertical className="text-neutral-800 hidden md:block" size={20} />
                  
                  {/* Premium Slate ID */}
                  <div className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-[1.5rem] flex flex-col items-center justify-center border transition-all ${
                    scene.status === 'Shooting' ? 'bg-red-600 border-red-500 text-white shadow-3xl shadow-red-600/20 pulse-status' : 
                    scene.status === 'Shot' ? 'bg-green-600/10 border-green-500/20 text-green-500' : 'bg-neutral-800 border-white/5 text-neutral-600'
                  }`}>
                    <span className="text-[8px] font-black uppercase tracking-tighter mb-0.5 opacity-40">Scene</span>
                    <span className="text-3xl md:text-4xl font-cinematic font-bold leading-none">{scene.number}</span>
                    {scheduledToday.has(scene.id) && <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-neutral-900 animate-pulse" />}
                  </div>

                  <div className="space-y-1.5 md:space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-3xl font-cinematic font-bold tracking-widest text-white uppercase group-hover:text-red-500 transition-colors leading-none">{scene.title}</h3>
                      {scene.status === 'Shooting' && <span className="bg-red-600 text-[7px] font-black px-1.5 py-0.5 rounded text-white uppercase tracking-widest animate-pulse">Live</span>}
                    </div>
                    <div className="flex items-center gap-4 text-[9px] md:text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                      <span className="flex items-center gap-1.5"><MapPin size={12} className="text-red-500" /> {scene.location.split(' ')[0]}</span>
                      <div className="w-1 h-1 rounded-full bg-neutral-800" />
                      <span>{scene.setting} • {scene.timeOfDay}</span>
                      <div className="w-1 h-1 rounded-full bg-neutral-800" />
                      <span className="text-white">{scene.pages} PGS</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={(e) => toggleToday(e, scene.id)}
                    className={`hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                    scheduledToday.has(scene.id) ? 'bg-red-600 text-white shadow-xl' : 'bg-neutral-800 text-neutral-500 border border-white/5 hover:border-white/20'
                    }`}
                  >
                    <Calendar size={14} /> {scheduledToday.has(scene.id) ? 'ON CALL SHEET' : 'ADD TO TODAY'}
                  </button>
                  <div className={`p-2 rounded-xl transition-transform duration-500 ${expandedScenes.has(scene.id) ? 'rotate-180 bg-neutral-800 text-white' : 'text-neutral-700'}`}>
                    <ChevronDown size={20} />
                  </div>
                </div>
              </div>

              {/* Shot Ledger (Expanded) */}
              {expandedScenes.has(scene.id) && (
                <div className="p-4 md:p-6 bg-black/40 border-t border-white/5 space-y-3 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between px-4 mb-2">
                    <p className="text-[9px] font-black text-neutral-700 uppercase tracking-[0.4em]">Technical Shot Deck</p>
                    <button className="text-[9px] font-black text-red-500 uppercase tracking-widest">Optimize Unit Sequence</button>
                  </div>
                  {MOCK_SHOTS.filter(s => s.sceneId === scene.id).map(shot => (
                    <div key={shot.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 md:p-8 bg-neutral-900 border border-white/5 rounded-3xl group/shot hover:border-red-600/30 transition-all gap-6">
                      <div className="flex items-center gap-8">
                        <div className="flex flex-col items-center">
                          <span className="text-[8px] font-black text-neutral-800 uppercase tracking-tighter mb-1">Unit</span>
                          <span className="text-4xl md:text-5xl font-cinematic font-bold text-neutral-800 group-hover/shot:text-red-500 transition-colors leading-none">{shot.number}</span>
                        </div>
                        <div className="space-y-3">
                          <h4 className="font-bold text-lg md:text-xl text-white uppercase tracking-tight leading-none">{shot.description}</h4>
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-lg border border-white/5">
                              <Camera size={12} className="text-red-500" />
                              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{shot.lens}</span>
                            </div>
                            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 rounded-lg border border-white/5">
                              <Activity size={12} className="text-blue-500" />
                              <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{shot.movement}</span>
                            </div>
                            {shot.takeCount > 0 && (
                              <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 rounded-lg border border-green-500/20">
                                <CheckCircle2 size={12} className="text-green-500" />
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">{shot.takeCount} TAKES LOGGED</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end gap-6 pt-6 md:pt-0 border-t md:border-t-0 border-white/5">
                        {shot.status === 'Done' ? (
                          <div className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-[0.2em] px-5 py-3 bg-green-500/10 border border-green-500/20 rounded-2xl shadow-xl">
                            <CheckCircle2 size={16} /> WRAPPED
                          </div>
                        ) : (
                          <button 
                          onClick={() => navigate('/workspace')}
                          className="flex-1 md:flex-none px-10 py-4 bg-white text-black font-black rounded-xl md:rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-3xl flex items-center justify-center gap-3 active-scale"
                          >
                            <Play size={14} fill="black"/> GO TO SET
                          </button>
                        )}
                        <button className="p-3 text-neutral-700 hover:text-white transition-all">
                          <MoreVertical size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button className="w-full py-6 md:py-8 border-2 border-dashed border-white/5 rounded-[2rem] md:rounded-[2.5rem] text-[10px] md:text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] hover:border-red-600/40 hover:text-red-500 transition-all flex items-center justify-center gap-4 active-scale">
                    <Plus size={20} /> INITIALIZE NEW SHOT SETUP
                  </button>
                </div>
              )}

              {/* Scanline decoration for scheduled items */}
              {scheduledToday.has(scene.id) && (
                <div className="scanline opacity-[0.03]" />
              )}
            </div>
          ))}

          {/* Empty State / Bottom Action */}
          <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[3rem] md:rounded-[4rem] bg-black/20 space-y-6">
            <div className="w-20 h-20 bg-neutral-900 rounded-[2rem] flex items-center justify-center mx-auto text-neutral-800 border border-white/5 shadow-2xl">
              <Clapperboard size={40} />
            </div>
            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-cinematic font-bold text-neutral-600 tracking-widest uppercase leading-none">Initialize Fresh Scene</p>
              <p className="text-[10px] text-neutral-800 font-bold uppercase tracking-widest max-w-sm mx-auto">Expand the global slate ledger by adding a new cinematic logic block.</p>
            </div>
            <button className="px-10 py-4 bg-neutral-900 text-neutral-500 font-black rounded-full text-[10px] uppercase tracking-widest border border-white/5 hover:text-white transition-all active-scale shadow-xl">
              + CREATE SCENE BLOCK
            </button>
          </div>
        </div>

        {/* 5. TACTICAL INTEL RAIL */}
        <aside className="lg:col-span-4 space-y-8">
          {/* Genie Sync Logic */}
          <section className="bg-gradient-to-br from-red-900 to-black border border-red-600/30 p-10 rounded-[3rem] shadow-3xl space-y-10 relative overflow-hidden group active-scale">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-125 transition-transform duration-[10000ms]">
              <Activity size={200} />
            </div>
            <div className="flex items-center gap-4 text-red-500 relative z-10">
              <Zap size={24} className="animate-pulse" />
              <h4 className="text-2xl md:text-3xl font-cinematic font-bold tracking-widest uppercase">Genie Slate Sync</h4>
            </div>
            
            <div className="space-y-8 relative z-10">
              <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-4 backdrop-blur-3xl group-hover:border-red-600/40 transition-all">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Breakdown Prediction</p>
                <p className="text-base md:text-lg text-neutral-300 italic font-medium leading-relaxed">
                  "Unit B equipment return is delayed. Suggest moving Scene 13 (EXT) to follow 12B to preserve lighting continuity during the wait."
                </p>
              </div>
              
              <div className="flex justify-between items-center px-2">
                <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Logic Matching</span>
                <span className="text-xl font-cinematic font-bold text-white tracking-widest">92% SYNC</span>
              </div>

              <button className="w-full py-5 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] hover:bg-red-700 transition-all shadow-3xl shadow-red-600/40">
                APPLY LOGIC ADJUSTMENT
              </button>
            </div>
          </section>

          {/* Metrics Journal */}
          <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-10">
            <h4 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em]">Slate Ledger Insights</h4>
            <div className="space-y-8">
              {[
                { label: 'Today Progress', val: '48%', color: 'bg-red-600' },
                { label: 'Cast Readiness', val: '100%', color: 'bg-green-500' },
                { label: 'Unit Logistics', val: '82%', color: 'bg-blue-500' }
              ].map((m, i) => (
                <div key={i} className="space-y-3">
                  <div className="flex justify-between items-end">
                    <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{m.label}</span>
                    <span className="text-xl font-cinematic font-bold text-white tracking-widest">{m.val}</span>
                  </div>
                  <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-1000 ${m.color}`} style={{ width: m.val }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-white/5">
              <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all border border-white/5 active-scale flex items-center justify-center gap-3">
                <Maximize2 size={16} /> FULL SLATE AUDIT
              </button>
            </div>
          </section>
        </aside>
      </div>

      {/* 6. SYSTEM FOOTER */}
      <footer className="mt-8 text-center px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 opacity-30">
          <p className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.6em]">CLAP OS • GLOBAL SLATE REGISTRY v4.2</p>
          <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.5em]">
            <Activity size={12} /> SYNC LATENCY: 12MS
          </div>
          <p className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.5em]">ENCRYPTED MISSION SESSION</p>
        </div>
      </footer>
    </div>
  );
};

export default SceneShotManager;
