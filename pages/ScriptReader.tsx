
import React, { useState } from 'react';
import { MOCK_SCRIPT } from '../constants';
import { 
  BrainCircuit, Search, ChevronRight, FileText, Sparkles, Wand2, Download, Share2, Clapperboard, Layers,
  // Added missing icon imports
  Zap, Clock
} from 'lucide-react';

const ScriptReader: React.FC = () => {
  const [activeGenieLine, setActiveGenieLine] = useState<string | null>(null);
  const [showMetadata, setShowMetadata] = useState(true);

  return (
    <div className="flex h-[calc(100vh-120px)] animate-in fade-in duration-700 bg-neutral-950 overflow-hidden rounded-[3rem] border border-white/5">
      {/* Script Content Area */}
      <div className="flex-1 overflow-y-auto p-12 lg:p-24 scrollbar-hide bg-[#fefefe] selection:bg-red-200">
        <div className="max-w-3xl mx-auto text-black p-16 md:p-32 min-h-screen relative font-script text-[14px] md:text-[16px] leading-[1.2] shadow-sm">
          {/* Header Info */}
          <div className="mb-20 space-y-1">
            <p className="text-center">"THE MIDNIGHT SCRIPT"</p>
            <p className="text-center">WRITTEN BY</p>
            <p className="text-center">CLAP AI GENIE & VINOD</p>
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
            <h3 className="font-cinematic font-bold tracking-[0.2em] text-2xl uppercase">Script Intelligence</h3>
          </div>
          <button onClick={() => setShowMetadata(!showMetadata)} className="p-2 text-neutral-600 hover:text-white transition-colors">
            <Layers size={20} />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto space-y-8 pr-2">
          {activeGenieLine ? (
            <div className="p-10 bg-red-600 border border-red-500 rounded-[2.5rem] space-y-6 animate-in slide-in-from-right-8 duration-500 shadow-3xl shadow-red-600/30">
              <div className="flex items-center gap-3 text-white text-[11px] font-black uppercase tracking-[0.3em]">
                <Wand2 size={20} /> Genie Breakdown
              </div>
              <p className="text-xl text-white leading-relaxed font-bold italic">
                "{MOCK_SCRIPT.find(l => l.id === activeGenieLine)?.metadata?.genieInsight}"
              </p>
              <div className="pt-6 flex gap-3">
                 <button className="flex-1 py-4 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl">LOG PROP</button>
                 <button className="flex-1 py-4 bg-black/20 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">DISMISS</button>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] space-y-6 bg-black/20">
              <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mx-auto text-neutral-700 border border-white/5">
                <FileText size={40} />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-cinematic font-bold text-white tracking-widest uppercase">Select a Line</p>
                <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest leading-loose max-w-[200px] mx-auto">AI-augmented breakdown icons will appear next to actionable lines.</p>
              </div>
            </div>
          )}

          <section className="space-y-6">
            <h4 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] px-2">Scene Summary (12B)</h4>
            <div className="grid gap-3">
              {[
                { label: 'Estimated Pages', val: '2.5 Pages', icon: <FileText size={14}/> },
                { label: 'Technical Complexity', val: 'Medium', icon: <Zap size={14}/> },
                { label: 'Mood / Tone', val: 'Suspenseful Noir', icon: <Sparkles size={14}/> },
                { label: 'Shoot Window', val: 'Night Only', icon: <Clock size={14}/> }
              ].map(item => (
                <div key={item.label} className="bg-neutral-900 border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-red-600/30 transition-all cursor-default shadow-xl">
                  <div className="flex items-center gap-3 text-neutral-500">
                    {item.icon}
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-white transition-colors">{item.label}</span>
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.val}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4">
           <button className="flex items-center justify-center gap-3 py-5 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all active-scale">
             <Download size={18} /> EXPORT SIDES
           </button>
           <button className="flex items-center justify-center gap-3 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/30 active-scale">
             <Share2 size={18} /> COLLAB
           </button>
        </div>
      </aside>
    </div>
  );
};

export default ScriptReader;
