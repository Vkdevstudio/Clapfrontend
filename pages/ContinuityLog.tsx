
import React, { useState } from 'react';
import { MOCK_SHOTS, MOCK_TAKES } from '../constants';
import { 
  History, 
  RotateCcw, 
  CheckCircle, 
  MoreVertical, 
  BrainCircuit, 
  Camera, 
  Clock,
  Download,
  Share2,
  ChevronRight,
  Sparkles,
  Info,
  Plus,
  Monitor,
  LayoutGrid,
  Activity,
  Award,
  Circle,
  Film,
  Maximize2,
  Filter
} from 'lucide-react';
import { Take, Shot } from '../types';
import { useNavigate } from 'react-router-dom';

const ContinuityLog: React.FC = () => {
  const navigate = useNavigate();
  const [activeShot, setActiveShot] = useState<Shot>(MOCK_SHOTS[0]);
  const [viewMode, setViewMode] = useState<'journal' | 'grid'>('journal');
  const [circleTakes, setCircleTakes] = useState<Set<string>>(new Set([MOCK_TAKES[2].id]));

  const toggleCircleTake = (id: string) => {
    const newCircle = new Set(circleTakes);
    if (newCircle.has(id)) newCircle.delete(id);
    else newCircle.add(id);
    setCircleTakes(newCircle);
  };

  const getStatusColor = (status: string, isCircle: boolean) => {
    if (isCircle) return 'text-green-500';
    switch (status) {
      case 'NG': return 'text-red-500';
      case 'FS': return 'text-orange-500';
      case 'Safety': return 'text-blue-500';
      default: return 'text-neutral-500';
    }
  };

  return (
    <div className="space-y-4 md:space-y-8 animate-in fade-in duration-700 pb-24 max-w-7xl mx-auto px-0 md:px-4">
      
      {/* Workflow Micro-Nav: Sticky for Mobile */}
      <div className="sticky top-16 z-[40] md:relative md:top-0 bg-neutral-950/80 backdrop-blur-xl border-b md:border-none border-white/5 py-3 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 items-center min-w-max">
           {[
             { label: 'Script', path: '/script' },
             { label: 'Slate', path: '/slate' },
             { label: 'Workspace', path: '/workspace' },
             { label: 'Logbook', path: '/logbook', active: true }
           ].map((step, i) => (
             <React.Fragment key={step.label}>
               <button 
                onClick={() => navigate(step.path)}
                className={`flex items-center gap-2 text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all ${
                  step.active ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-600 hover:text-white'
                }`}
               >
                 {step.active && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                 {step.label}
               </button>
               {i < 3 && <ChevronRight size={10} className="text-neutral-800" />}
             </React.Fragment>
           ))}
        </div>
      </div>

      {/* Shot Selector Ribbon */}
      <div className="px-4 md:px-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.4em]">Scene 12B Sequence</h3>
          <button className="text-[10px] font-black text-red-500 uppercase tracking-widest flex items-center gap-2">
            <Filter size={12} /> Filter Units
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {MOCK_SHOTS.map((shot) => (
            <button
              key={shot.id}
              onClick={() => setActiveShot(shot)}
              className={`flex-shrink-0 w-32 md:w-40 p-4 rounded-2xl border transition-all ${
                activeShot.id === shot.id 
                  ? 'bg-red-600/10 border-red-600 shadow-lg' 
                  : 'bg-neutral-900 border-white/5 hover:border-white/20'
              }`}
            >
              <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest mb-1">Shot</p>
              <p className={`text-2xl font-cinematic font-bold leading-none ${activeShot.id === shot.id ? 'text-white' : 'text-neutral-400'}`}>
                {shot.number}
              </p>
              <div className="mt-2 h-1 w-full bg-black rounded-full overflow-hidden">
                <div className={`h-full ${shot.status === 'Done' ? 'bg-green-500' : 'bg-red-600'}`} style={{ width: shot.status === 'Done' ? '100%' : '30%' }} />
              </div>
            </button>
          ))}
          <button className="flex-shrink-0 w-16 p-4 rounded-2xl border border-dashed border-white/5 bg-transparent text-neutral-700 flex items-center justify-center hover:text-red-500 hover:border-red-600/30 transition-all">
            <Plus size={20} />
          </button>
        </div>
      </div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4 md:px-0 pt-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-red-500">
             <History size={18} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Journal v4.2</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Continuity</h1>
          <p className="text-neutral-500 text-sm md:text-lg font-medium">Post-production audit and editor selection logic.</p>
        </div>
        <div className="flex gap-3">
           <div className="bg-neutral-900 border border-white/5 rounded-2xl p-1 flex gap-1 shadow-xl">
              <button onClick={() => setViewMode('journal')} className={`p-3 rounded-xl transition-all ${viewMode === 'journal' ? 'bg-red-600 text-white' : 'text-neutral-600'}`}>
                 <Monitor size={18} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-neutral-600'}`}>
                 <LayoutGrid size={18} />
              </button>
           </div>
           <button className="bg-white px-6 md:px-8 py-4 rounded-2xl text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-3xl flex items-center gap-3 active-scale">
             <Share2 size={16} /> <span className="hidden sm:inline">EXPORT EDL</span>
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-10">
        {/* Technical Specification Rail */}
        <div className="lg:col-span-4 space-y-6 px-4 md:px-0">
           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000">
                <Film size={200} />
              </div>
              <div className="space-y-4 relative z-10">
                 <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">Active Setup Configuration</p>
                 <div className="flex justify-between items-start">
                   <h2 className="text-6xl md:text-7xl font-cinematic font-bold text-white tracking-tighter uppercase leading-none">
                      {activeShot.number}
                   </h2>
                   <button className="p-2 text-neutral-600 hover:text-white"><Maximize2 size={18}/></button>
                 </div>
                 <p className="text-xl md:text-2xl font-cinematic font-bold text-neutral-500 uppercase tracking-widest">{activeShot.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 md:gap-4 pt-6 border-t border-white/5 relative z-10">
                 {[
                   { label: 'Glass', val: activeShot.lens, icon: <Camera size={14}/> },
                   { label: 'Rig', val: activeShot.movement, icon: <Activity size={14}/> },
                   { label: 'Stop', val: 'T2.8', icon: <Info size={14}/> },
                   { label: 'Filter', val: 'Polarizer', icon: <Sparkles size={14}/> }
                 ].map(item => (
                   <div key={item.label} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-2 text-neutral-600">
                         {item.icon}
                         <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-[10px] font-bold text-white uppercase tracking-widest">{item.val}</span>
                   </div>
                 ))}
              </div>

              <div className="bg-red-600/5 border border-red-600/20 p-6 md:p-8 rounded-[2rem] space-y-4 relative z-10">
                 <div className="flex items-center gap-2 text-red-500">
                    <BrainCircuit size={18} className="animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Genie Continuity Match</span>
                 </div>
                 <p className="text-xs md:text-sm text-neutral-300 italic font-medium leading-relaxed">
                    "Continuity Match: Costume lapel smudge in Take 3 matches previous wide shot. Recommended for final master."
                 </p>
              </div>
           </section>
        </div>

        {/* Take History Thread */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8 px-4 md:px-0">
           <div className="flex justify-between items-center px-2">
              <h3 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Take Sequence Registry <span className="text-neutral-800 ml-2">/ {MOCK_TAKES.length} CAPTURES</span></h3>
           </div>

           <div className="space-y-3 md:space-y-4">
              {MOCK_TAKES.map((take) => (
                <div 
                  key={take.id} 
                  className={`bg-neutral-900 border p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] group transition-all shadow-xl relative overflow-hidden active-scale ${
                    circleTakes.has(take.id) ? 'border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.15)] bg-green-500/5' : 'border-white/5 hover:border-white/10'
                  }`}
                >
                   <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:items-center relative z-10">
                      <div className="flex items-center gap-6">
                         <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-3xl flex items-center justify-center text-3xl md:text-4xl font-cinematic font-bold border transition-all ${
                           circleTakes.has(take.id) ? 'bg-green-600 border-green-500 text-white shadow-2xl' : 
                           take.status === 'NG' ? 'bg-red-600/10 border-red-600/20 text-red-500' : 'bg-neutral-800 border-white/5 text-neutral-500'
                         }`}>
                            {take.number}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <p className={`text-[9px] md:text-[11px] font-black uppercase tracking-widest ${getStatusColor(take.status, circleTakes.has(take.id))}`}>
                                  {circleTakes.has(take.id) ? 'CIRCLE TAKE' : take.status === 'NG' ? 'NO GOOD' : take.status === 'FS' ? 'FALSE START' : 'SAFETY CAPTURE'}
                               </p>
                               {circleTakes.has(take.id) && <Award size={14} className="text-green-500" />}
                            </div>
                            <p className="text-xl md:text-2xl font-cinematic font-bold text-white tracking-widest tabular-nums">{take.duration}</p>
                         </div>
                      </div>
                      <div className="flex-1">
                         <textarea 
                            className="w-full bg-transparent border-none outline-none text-xs md:text-sm text-neutral-400 font-medium leading-relaxed italic resize-none focus:text-white transition-colors"
                            placeholder="Add script supervisor context..."
                            defaultValue={take.notes}
                            rows={2}
                         />
                      </div>
                      <div className="flex items-center gap-3">
                         <button 
                          onClick={() => toggleCircleTake(take.id)}
                          className={`w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-xl md:rounded-2xl transition-all border ${
                            circleTakes.has(take.id) ? 'bg-green-600 border-green-500 text-white shadow-xl' : 'bg-neutral-800 text-neutral-500 border-white/5 hover:text-white'
                          }`}
                         >
                            <CheckCircle size={20} />
                         </button>
                         <button className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-black/40 rounded-xl md:rounded-2xl text-neutral-700 hover:text-white transition-all">
                            <MoreVertical size={18} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}

              <button className="w-full py-6 md:py-8 bg-neutral-900/40 border-2 border-dashed border-white/5 rounded-[2rem] md:rounded-[3.5rem] text-[10px] md:text-[12px] font-black text-neutral-700 uppercase tracking-[0.5em] hover:border-red-600/30 hover:text-red-500 transition-all flex items-center justify-center gap-4 active-scale">
                 <Plus size={20} /> MANUAL JOURNAL ENTRY / PICK-UP LOG
              </button>
           </div>
        </div>
      </div>

      <footer className="mt-8 text-center px-4">
         <p className="text-[8px] md:text-[10px] font-black text-neutral-800 uppercase tracking-[0.6em]">CLAP OS • CONTINUITY REGISTRY v4.2 • ENCRYPTED SESSION</p>
      </footer>
    </div>
  );
};

export default ContinuityLog;
