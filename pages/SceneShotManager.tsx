
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
  Play
} from 'lucide-react';
import { Scene, Shot } from '../types';
import { useNavigate } from 'react-router-dom';

const SceneShotManager: React.FC = () => {
  const navigate = useNavigate();
  const [scenes, setScenes] = useState<Scene[]>(MOCK_SCENES);
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
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
       {/* Workflow Navigation */}
       <div className="flex gap-4 items-center mb-4 px-4 overflow-x-auto scrollbar-hide bg-neutral-900/40 p-3 rounded-2xl border border-white/5">
         {[
           { label: 'Script', path: '/script' },
           { label: 'Slate', path: '/slate', active: true },
           { label: 'Workspace', path: '/workspace' },
           { label: 'Logbook', path: '/logbook' }
         ].map((step, i) => (
           <React.Fragment key={step.label}>
             <button 
              onClick={() => navigate(step.path)}
              className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest whitespace-nowrap transition-all px-4 py-2 rounded-xl ${
                step.active ? 'bg-red-600 text-white shadow-xl' : 'text-neutral-500 hover:text-white'
              }`}
             >
               {step.label}
             </button>
             {i < 3 && <ChevronRight size={12} className="text-neutral-800 flex-shrink-0" />}
           </React.Fragment>
         ))}
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">Global Slate</h1>
          <p className="text-neutral-500 text-lg font-medium">Coordinate the entire production hierarchy and shoot sequence.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group w-64 hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Find Scene or Shot..."
                className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-xs font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
              />
           </div>
           <button className="bg-red-600 px-8 py-4 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/30 flex items-center gap-3 active-scale">
             <Plus size={18} /> New Entry
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-6">
           {scenes.map((scene) => (
             <div key={scene.id} className={`bg-neutral-900 border rounded-[2.5rem] overflow-hidden shadow-2xl transition-all ${
               scheduledToday.has(scene.id) ? 'border-red-600/30 bg-red-600/5' : 'border-white/5'
             }`}>
                {/* Scene Header */}
                <div 
                  className={`p-8 flex items-center justify-between cursor-pointer transition-all ${expandedScenes.has(scene.id) ? 'bg-black/40' : 'hover:bg-white/5'}`}
                  onClick={() => toggleScene(scene.id)}
                >
                   <div className="flex items-center gap-6">
                      <GripVertical className="text-neutral-800" size={20} />
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-cinematic font-bold border ${
                        scene.status === 'Shooting' ? 'bg-red-600 border-red-500 text-white' : 
                        scene.status === 'Shot' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-neutral-800 border-white/5 text-neutral-500'
                      }`}>
                         {scene.number}
                      </div>
                      <div>
                         <h3 className="text-2xl font-cinematic font-bold tracking-wide text-white uppercase">{scene.title}</h3>
                         <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{scene.setting} • {scene.timeOfDay} • {scene.pages} PAGES</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <button 
                        onClick={(e) => toggleToday(e, scene.id)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${
                          scheduledToday.has(scene.id) ? 'bg-red-600 text-white' : 'bg-neutral-800 text-neutral-500 border border-white/5 hover:text-white'
                        }`}
                      >
                         <Calendar size={14} /> {scheduledToday.has(scene.id) ? 'ON CALL SHEET' : 'SCHEDULE FOR TODAY'}
                      </button>
                      {expandedScenes.has(scene.id) ? <ChevronDown className="text-neutral-500" /> : <ChevronRight className="text-neutral-500" />}
                   </div>
                </div>

                {/* Shot List (Expanded) */}
                {expandedScenes.has(scene.id) && (
                  <div className="p-4 bg-black/20 border-t border-white/5 space-y-3">
                     {MOCK_SHOTS.filter(s => s.sceneId === scene.id).map(shot => (
                       <div key={shot.id} className="flex items-center justify-between p-6 bg-neutral-900 border border-white/5 rounded-3xl group hover:border-red-600/30 transition-all">
                          <div className="flex items-center gap-6">
                             <span className="text-3xl font-cinematic font-bold text-neutral-700 group-hover:text-red-500 transition-colors">{shot.number}</span>
                             <div>
                                <h4 className="font-bold text-white uppercase tracking-wide">{shot.description}</h4>
                                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest flex items-center gap-3">
                                   <Camera size={12} /> {shot.lens} • <Clock size={12} /> {shot.movement}
                                </p>
                             </div>
                          </div>
                          <div className="flex items-center gap-6">
                             {shot.status === 'Done' ? (
                               <span className="flex items-center gap-2 text-green-500 text-[10px] font-black uppercase tracking-widest">
                                  <CheckCircle2 size={16} /> COMPLETED
                               </span>
                             ) : (
                               <button 
                                onClick={() => navigate('/workspace')}
                                className="px-6 py-2.5 bg-neutral-800 hover:bg-red-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
                               >
                                  <Play size={12} fill="white"/> GO TO SET
                               </button>
                             )}
                             <MoreVertical className="text-neutral-800 hover:text-white cursor-pointer" size={18} />
                          </div>
                       </div>
                     ))}
                     <button className="w-full py-4 border-2 border-dashed border-white/5 rounded-[1.5rem] text-[10px] font-black text-neutral-700 uppercase tracking-[0.3em] hover:border-red-600/30 hover:text-red-500 transition-all flex items-center justify-center gap-2">
                        <Plus size={16} /> New Shot for Scene {scene.number}
                     </button>
                  </div>
                )}
             </div>
           ))}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <section className="bg-gradient-to-br from-red-600/10 to-black border border-red-600/20 p-10 rounded-[3rem] shadow-3xl space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <Sparkles size={150} />
              </div>
              <div className="flex items-center gap-3 text-red-500">
                <Zap size={24} />
                <h4 className="text-2xl font-cinematic font-bold tracking-widest uppercase">Genie Slate Sync</h4>
              </div>
              <p className="text-sm text-neutral-400 font-medium italic leading-relaxed">
                "Based on the Script Breakdown, Scenes 12B and 13 share a location. Suggested: Schedule them consecutively to minimize setup resets."
              </p>
              <button className="w-full py-5 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-neutral-100 transition-all active-scale">
                 AUTO-SYNC CALL SHEET
              </button>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Daily Shoot Stats</h4>
              <div className="space-y-6">
                 <div>
                    <div className="flex justify-between text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-2">
                       <span>Today's Page Target</span>
                       <span>2.5 / 5.2</span>
                    </div>
                    <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                       <div className="h-full bg-red-600" style={{ width: '48%' }} />
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl text-center">
                       <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Scheduled</p>
                       <p className="text-3xl font-cinematic font-bold text-white">{scheduledToday.size}</p>
                    </div>
                    <div className="p-4 bg-black/40 border border-white/5 rounded-2xl text-center">
                       <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Active</p>
                       <p className="text-3xl font-cinematic font-bold text-red-500">01</p>
                    </div>
                 </div>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default SceneShotManager;
