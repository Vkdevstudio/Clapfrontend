
import React, { useState } from 'react';
import { MOCK_SCRIPT } from '../constants';
import { 
  BrainCircuit, Search, ChevronRight, FileText, Sparkles, Wand2, Download, Share2, Clapperboard, Layers,
  Zap, Clock, ArrowRightLeft, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScriptReader: React.FC = () => {
  const navigate = useNavigate();
  const [activeGenieLine, setActiveGenieLine] = useState<string | null>(null);
  const [syncedLines, setSyncedLines] = useState<Set<string>>(new Set());

  const handleSyncToSlate = (lineId: string) => {
    setSyncedLines(prev => new Set(prev).add(lineId));
    // In a real app, this would POST to /scenes
  };

  return (
    <div className="flex h-[calc(100vh-120px)] animate-in fade-in duration-700 bg-neutral-950 overflow-hidden rounded-[3rem] border border-white/5">
      {/* Script Content Area */}
      <div className="flex-1 overflow-y-auto p-12 lg:p-24 scrollbar-hide bg-[#fefefe] selection:bg-red-200">
        <div className="max-w-3xl mx-auto text-black p-16 md:p-32 min-h-screen relative font-script text-[14px] md:text-[16px] leading-[1.2] shadow-sm">
          <div className="mb-20 space-y-1">
            <p className="text-center">"THE MIDNIGHT SCRIPT"</p>
            <p className="text-center font-bold">PRODUCTION DRAFT - v4.2</p>
          </div>
          
          <div className="space-y-6">
            {MOCK_SCRIPT.map((line) => (
              <div 
                key={line.id} 
                onClick={() => line.metadata?.genieInsight && setActiveGenieLine(line.id)}
                className={`group relative transition-all cursor-pointer py-1 ${
                  line.type === 'slugline' ? 'font-bold uppercase mt-12 mb-6' :
                  line.type === 'character' ? 'text-center w-full mt-10 uppercase' :
                  line.type === 'dialogue' ? 'text-center px-12 md:px-32 mx-auto max-w-[500px]' :
                  line.type === 'parenthetical' ? 'text-center px-16 italic text-[0.9em]' :
                  'text-left mt-6'
                } ${activeGenieLine === line.id ? 'bg-red-50 ring-8 ring-red-50 rounded-lg scale-[1.02]' : 'hover:bg-neutral-50 rounded-lg'}`}
              >
                {line.metadata?.genieInsight && (
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity text-red-600">
                    <Sparkles size={18} />
                  </div>
                )}
                <p>{line.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Intelligence & Navigation Rail */}
      <aside className="hidden xl:flex flex-col w-[450px] border-l border-white/5 bg-neutral-900/40 backdrop-blur-3xl p-10 space-y-10">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-red-500">
            <BrainCircuit size={24} />
            <h3 className="font-cinematic font-bold tracking-[0.2em] text-2xl uppercase">Intelligence</h3>
          </div>
          <button className="p-3 bg-neutral-900 rounded-2xl text-neutral-500 hover:text-white transition-all" onClick={() => navigate('/slate')}>
            <ArrowRightLeft size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          {activeGenieLine ? (
            <div className="p-10 bg-red-600 border border-red-500 rounded-[2.5rem] space-y-6 animate-in slide-in-from-right-8 duration-500 shadow-3xl shadow-red-600/30">
              <div className="flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em]">
                <Wand2 size={20} /> Breakdown Sync
              </div>
              <p className="text-xl text-white leading-relaxed font-bold italic">
                "{MOCK_SCRIPT.find(l => l.id === activeGenieLine)?.metadata?.genieInsight}"
              </p>
              <div className="pt-6 flex gap-3">
                 <button 
                  onClick={() => handleSyncToSlate(activeGenieLine)}
                  className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl transition-all ${
                    syncedLines.has(activeGenieLine) ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                 >
                    {syncedLines.has(activeGenieLine) ? <><Check size={14} className="inline mr-1"/> SYNCED</> : 'PUSH TO SLATE'}
                 </button>
                 <button onClick={() => setActiveGenieLine(null)} className="flex-1 py-4 bg-black/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">DISMISS</button>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] space-y-6 bg-black/20">
              <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mx-auto text-neutral-700 border border-white/5">
                <FileText size={40} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-cinematic font-bold text-white tracking-widest uppercase">Select a Context Line</p>
                <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest leading-loose max-w-[200px] mx-auto">Click sparkle-tagged lines to sync props, scenes, and beats to the Global Slate.</p>
              </div>
            </div>
          )}

          <section className="space-y-6">
            <h4 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] px-2">Pipeline Progress</h4>
            <div className="flex justify-between items-center px-2">
               {['Script', 'Slate', 'Set', 'Log'].map((p, i) => (
                 <div key={p} className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border ${i === 0 ? 'bg-red-600 text-white border-red-500' : 'bg-neutral-900 text-neutral-700 border-white/5'}`}>
                       {i + 1}
                    </div>
                    <span className={`text-[8px] font-bold uppercase tracking-widest ${i === 0 ? 'text-red-500' : 'text-neutral-700'}`}>{p}</span>
                 </div>
               ))}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 py-5 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active-scale">
             <Download size={18} /> EXPORT SIDES
           </button>
           <button onClick={() => navigate('/slate')} className="flex items-center justify-center gap-3 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/30 active-scale">
             GO TO SLATE <ChevronRight size={18} />
           </button>
        </div>
      </aside>
    </div>
  );
};

export default ScriptReader;
