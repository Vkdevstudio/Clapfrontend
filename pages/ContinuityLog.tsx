
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
  Circle
} from 'lucide-react';
import { Take } from '../types';
import { useNavigate } from 'react-router-dom';

const ContinuityLog: React.FC = () => {
  const navigate = useNavigate();
  const [activeShot, setActiveShot] = useState(MOCK_SHOTS[0]);
  const [takes, setTakes] = useState<Take[]>(MOCK_TAKES);
  const [viewMode, setViewMode] = useState<'journal' | 'grid'>('journal');
  const [circleTakes, setCircleTakes] = useState<Set<string>>(new Set([MOCK_TAKES[2].id]));

  const toggleCircleTake = (id: string) => {
    const newCircle = new Set(circleTakes);
    if (newCircle.has(id)) newCircle.delete(id);
    else newCircle.add(id);
    setCircleTakes(newCircle);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Circle': return 'text-green-500';
      case 'NG': return 'text-red-500';
      case 'FS': return 'text-orange-500';
      case 'Safety': return 'text-blue-500';
      default: return 'text-neutral-500';
    }
  };

  return (
    <div className="h-full flex flex-col space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      {/* Workflow Navigation */}
      <div className="flex gap-4 items-center mb-4 px-4 overflow-x-auto scrollbar-hide bg-neutral-900/40 p-3 rounded-2xl border border-white/5">
         {[
           { label: 'Script', path: '/script' },
           { label: 'Slate', path: '/slate' },
           { label: 'Workspace', path: '/workspace' },
           { label: 'Logbook', path: '/logbook', active: true }
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
          <div className="flex items-center gap-3 text-red-500 mb-2">
             <History size={24} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Journal</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">Logbook</h1>
          <p className="text-neutral-500 text-lg font-medium">Post-production audit and editor selection logic.</p>
        </div>
        <div className="flex gap-4">
           <div className="bg-neutral-900 border border-white/5 rounded-2xl p-1.5 flex gap-1">
              <button onClick={() => setViewMode('journal')} className={`p-3 rounded-xl transition-all ${viewMode === 'journal' ? 'bg-red-600 text-white' : 'text-neutral-600'}`}>
                 <Monitor size={18} />
              </button>
              <button onClick={() => setViewMode('grid')} className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-red-600 text-white' : 'text-neutral-600'}`}>
                 <LayoutGrid size={18} />
              </button>
           </div>
           <button className="bg-white px-8 py-5 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center gap-3 active-scale">
             <Share2 size={18} /> EXPORT EDL
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-10 flex-1">
        {/* Technical Specification Rail */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <div className="space-y-2">
                 <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Setup Configuration</p>
                 <h2 className="text-6xl font-cinematic font-bold text-white tracking-tighter uppercase leading-none">
                    Shot {activeShot.number}
                 </h2>
                 <p className="text-lg font-cinematic font-bold text-neutral-500 uppercase tracking-widest">{activeShot.description}</p>
              </div>

              <div className="grid gap-4 pt-6 border-t border-white/5">
                 {[
                   { label: 'Glass', val: activeShot.lens, icon: <Camera size={16}/> },
                   { label: 'Rig', val: activeShot.movement, icon: <Activity size={16}/> },
                   { label: 'Stop', val: 'T2.8', icon: <Info size={16}/> },
                   { label: 'Filter', val: 'Polarizer', icon: <Sparkles size={16}/> }
                 ].map(item => (
                   <div key={item.label} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-3 text-neutral-600">
                         {item.icon}
                         <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                      </div>
                      <span className="text-xs font-bold text-white uppercase tracking-widest">{item.val}</span>
                   </div>
                 ))}
              </div>

              <div className="bg-red-600/5 border border-red-600/20 p-8 rounded-[2rem] space-y-4">
                 <div className="flex items-center gap-2 text-red-500">
                    <BrainCircuit size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Genie Continuity Context</span>
                 </div>
                 <p className="text-sm text-neutral-300 italic font-medium leading-relaxed">
                    "Continuity Match: Costume lapel smudge in Take 3 matches previous wide shot. Valid for final edit."
                 </p>
              </div>
           </section>
        </div>

        {/* Take History Thread */}
        <div className="lg:col-span-8 space-y-8">
           <div className="flex justify-between items-center px-4">
              <h3 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Take Sequence Registry</h3>
           </div>

           <div className="space-y-4">
              {takes.map((take) => (
                <div key={take.id} className={`bg-neutral-900 border p-8 rounded-[2.5rem] group transition-all shadow-xl relative overflow-hidden ${
                  circleTakes.has(take.id) ? 'border-green-500/50 bg-green-500/5' : 'border-white/5'
                }`}>
                   <div className="flex flex-col md:flex-row gap-8 md:items-center relative z-10">
                      <div className="flex items-center gap-6">
                         <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-4xl font-cinematic font-bold border transition-all ${
                           circleTakes.has(take.id) ? 'bg-green-600 border-green-500 text-white shadow-2xl' : 
                           take.status === 'NG' ? 'bg-red-600/10 border-red-600/20 text-red-500' : 'bg-neutral-800 border-white/5 text-neutral-500'
                         }`}>
                            {take.number}
                         </div>
                         <div>
                            <div className="flex items-center gap-2 mb-1">
                               <p className={`text-[11px] font-black uppercase tracking-widest ${getStatusColor(take.status)}`}>
                                  {take.status === 'Circle' || circleTakes.has(take.id) ? 'CIRCLE TAKE' : take.status === 'NG' ? 'NO GOOD' : 'SAFETY'}
                               </p>
                               {circleTakes.has(take.id) && <Award size={14} className="text-green-500" />}
                            </div>
                            <p className="text-2xl font-cinematic font-bold text-white tracking-widest">{take.duration}</p>
                         </div>
                      </div>
                      <div className="flex-1">
                         <textarea 
                            className="w-full bg-transparent border-none outline-none text-sm text-neutral-400 font-medium leading-relaxed italic resize-none focus:text-white transition-colors"
                            placeholder="Add script supervisor notes..."
                            defaultValue={take.notes}
                         />
                      </div>
                      <div className="flex gap-4">
                         <button 
                          onClick={() => toggleCircleTake(take.id)}
                          className={`p-4 rounded-2xl transition-all border ${
                            circleTakes.has(take.id) ? 'bg-green-600 text-white border-green-500' : 'bg-neutral-800 text-neutral-500 border-white/5 hover:text-white'
                          }`}
                         >
                            <CheckCircle size={20} />
                         </button>
                         <button className="p-4 bg-black/40 rounded-2xl text-neutral-600 hover:text-white transition-all">
                            <MoreVertical size={18} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}

              <button className="w-full py-8 bg-neutral-900 border-2 border-dashed border-white/5 rounded-[3rem] text-sm font-black text-neutral-700 uppercase tracking-[0.5em] hover:border-red-600/30 hover:text-red-500 transition-all flex items-center justify-center gap-4 active-scale">
                 <Plus size={24} /> Manual Entry / Pick-up Log
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContinuityLog;
