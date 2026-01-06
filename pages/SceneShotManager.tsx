
import React, { useState } from 'react';
import { MOCK_SCENES, MOCK_SHOTS, MOCK_LOCATIONS, MOCK_TASKS } from '../constants';
import { 
  Plus, ChevronDown, Activity, List, Columns, ArrowUpRight
} from 'lucide-react';
import { Scene, Shot, User as UserType, Task } from '../types';
import { useNavigate } from 'react-router-dom';
import InitializeSceneModal from '../components/InitializeSceneModal';

interface SceneShotManagerProps {
  user?: UserType;
}

const SceneShotManager: React.FC<SceneShotManagerProps> = ({ user }) => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'slate' | 'stripboard'>('slate');
  
  const [scenes, setScenes] = useState<Scene[]>(MOCK_SCENES);
  const [shots, setShots] = useState<Shot[]>(MOCK_SHOTS);
  const [isSceneModalOpen, setIsSceneModalOpen] = useState(false);

  const visibleScenes = scenes.filter(s => {
    if (user?.role === 'admin') return true;
    const sceneMatchesUser = user?.assignedScenes ? user.assignedScenes.includes(s.id) : true;
    const unitMatchesUser = user?.assignedUnits ? user.assignedUnits.includes(s.unit || 'Unit A') : true;
    return sceneMatchesUser && unitMatchesUser;
  });

  const [expandedScenes, setExpandedScenes] = useState<Set<string>>(new Set(visibleScenes[0]?.id ? [visibleScenes[0].id] : []));

  const toggleScene = (id: string) => {
    const newExpanded = new Set(expandedScenes);
    if (newExpanded.has(id)) newExpanded.delete(id);
    else newExpanded.add(id);
    setExpandedScenes(newExpanded);
  };

  const handleInitializeScene = (data: { 
    number: string; 
    title: string; 
    pages: string; 
    unitId: string;
    setting: 'INT' | 'EXT';
    timeOfDay: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK';
  }) => {
    // Logic: 100% Dynamic Ingest - All properties sourced from the Modal
    const newScene: Scene = {
      id: Math.random().toString(36).substr(2, 9),
      number: data.number,
      title: data.title,
      pages: data.pages,
      unitId: data.unitId,
      setting: data.setting,
      timeOfDay: data.timeOfDay,
      locationId: 'loc1', // Location node still defaults to base node for late-stage mapping
      status: 'Pending'
    };
    setScenes([newScene, ...scenes]);
    // Auto-focus on the newly indexed node
    setExpandedScenes(new Set([newScene.id]));
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-28 md:pb-20 max-w-7xl mx-auto px-4 md:px-0">
      
      {/* 1. HEADER CONTROL */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-red-500">
            <Activity size={18} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Ledger • {user?.assignedUnits?.[0] || 'Unit Alpha'}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">The Slate</h1>
        </div>
        
        <div className="flex gap-3">
          <div className="bg-neutral-900 border border-white/5 rounded-2xl p-1 flex gap-1 shadow-xl">
             <button 
              onClick={() => setViewMode('slate')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'slate' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'}`}
             >
                <List size={18} />
             </button>
             <button 
              onClick={() => setViewMode('stripboard')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'stripboard' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'}`}
             >
                <Columns size={18} />
             </button>
          </div>
          <button 
            onClick={() => setIsSceneModalOpen(true)}
            className="flex-1 md:flex-none bg-white px-8 py-4 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center justify-center gap-3 active-scale"
          >
            <Plus size={18} /> INITIALIZE SCENE
          </button>
        </div>
      </header>

      {/* 2. VIEW ENGINE */}
      {viewMode === 'slate' ? (
        <div className="space-y-4">
          {visibleScenes.map((scene) => (
            <div key={scene.id} className="group bg-neutral-900 border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden transition-all shadow-2xl">
              <div 
                onClick={() => toggleScene(scene.id)}
                className={`p-6 md:p-10 flex items-center justify-between cursor-pointer transition-all ${expandedScenes.has(scene.id) ? 'bg-black/40' : 'hover:bg-white/5'}`}
              >
                <div className="flex items-center gap-6">
                  <div className={`w-16 h-16 rounded-2xl flex flex-col items-center justify-center border ${
                    scene.status === 'Shooting' ? 'bg-red-600 border-red-500 text-white' : 'bg-neutral-800 border-white/5 text-neutral-600'
                  }`}>
                    <span className="text-[8px] font-black uppercase mb-0.5 opacity-40">Scene</span>
                    <span className="text-3xl font-cinematic font-bold leading-none">{scene.number}</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl md:text-3xl font-cinematic font-bold tracking-widest text-white uppercase group-hover:text-red-500 transition-colors leading-none">{scene.title}</h3>
                    <p className="text-[9px] font-black text-neutral-700 uppercase">{scene.setting} • {scene.timeOfDay} • {scene.pages} PAGES • UNIT {scene.unitId}</p>
                  </div>
                </div>
                <div className={`p-2 rounded-xl transition-transform duration-500 ${expandedScenes.has(scene.id) ? 'rotate-180 bg-neutral-800 text-white' : 'text-neutral-700'}`}>
                  <ChevronDown size={20} />
                </div>
              </div>

              {expandedScenes.has(scene.id) && (
                <div className="p-10 bg-black/40 border-t border-white/5 space-y-8">
                   {shots.filter(s => s.sceneId === scene.id).map(shot => (
                      <div key={shot.id} className="flex flex-col md:flex-row md:items-center justify-between p-8 bg-neutral-900 border border-white/5 rounded-3xl gap-6">
                        <div className="flex items-center gap-8">
                          <span className="text-5xl font-cinematic font-bold text-neutral-800 leading-none">{shot.number}</span>
                          <h4 className="font-bold text-xl text-white uppercase tracking-tight leading-none">{shot.description}</h4>
                        </div>
                        <button onClick={() => navigate('/workspace')} className="px-10 py-4 bg-white text-black font-black rounded-xl text-[10px] uppercase tracking-[0.3em] shadow-lg active-scale">GO TO SET</button>
                      </div>
                   ))}
                   {shots.filter(s => s.sceneId === scene.id).length === 0 && (
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest text-center py-4 italic">No setups logged for this scene yet.</p>
                   )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* VISUAL STRIPBOARD VIEW */
        <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
           {visibleScenes.map((scene, i) => (
             <div 
              key={scene.id}
              className={`flex-shrink-0 w-48 rounded-2xl border-l-8 p-6 space-y-6 transition-all hover:scale-[1.02] cursor-pointer shadow-3xl ${
                scene.setting === 'INT' ? 'bg-blue-900/40 border-blue-600' : 'bg-yellow-900/40 border-yellow-600'
              }`}
             >
                <div className="flex justify-between items-start">
                   <p className="text-4xl font-cinematic font-bold text-white leading-none">{scene.number}</p>
                   <span className="text-[8px] font-black text-white/40 uppercase">{scene.setting}</span>
                </div>
                <div className="space-y-1">
                   <p className="text-[9px] font-black text-white uppercase leading-tight truncate">{scene.title}</p>
                   <p className="text-[8px] font-bold text-white/40 uppercase tracking-tighter">{scene.timeOfDay} • {scene.pages} PAGES</p>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                   <div className="flex -space-x-2">
                      {[1,2].map(j => (
                        <div key={j} className="w-6 h-6 rounded-full border border-neutral-900 bg-neutral-800" />
                      ))}
                   </div>
                   <p className="text-[8px] font-black text-white/60">0{i+1}</p>
                </div>
             </div>
           ))}
           <button 
             onClick={() => setIsSceneModalOpen(true)}
             className="flex-shrink-0 w-48 border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center p-6 text-neutral-700 hover:text-red-500 hover:border-red-600/30 transition-all active-scale"
           >
              <Plus size={32} />
              <p className="text-[10px] font-black uppercase mt-4">Append Slate</p>
           </button>
        </div>
      )}

      {/* 3. SEPARATE MODAL COMPONENT */}
      <InitializeSceneModal 
        isOpen={isSceneModalOpen} 
        onClose={() => setIsSceneModalOpen(false)} 
        onInitialize={handleInitializeScene}
      />
    </div>
  );
};

export default SceneShotManager;
