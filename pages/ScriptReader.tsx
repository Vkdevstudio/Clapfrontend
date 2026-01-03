
import React, { useState, useRef, useEffect } from 'react';
import { MOCK_SCRIPT } from '../constants';
import { 
  BrainCircuit, 
  Search, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  Wand2, 
  Download, 
  Share2, 
  Clapperboard, 
  Layers,
  Zap, 
  Clock, 
  ArrowRightLeft, 
  Check,
  ChevronLeft,
  Settings,
  Maximize2,
  X,
  Type
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ScriptReader: React.FC = () => {
  const navigate = useNavigate();
  const [activeGenieLine, setActiveGenieLine] = useState<string | null>(null);
  const [syncedLines, setSyncedLines] = useState<Set<string>>(new Set());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fontSize, setFontSize] = useState(14);
  const scriptScrollRef = useRef<HTMLDivElement>(null);

  const handleLineClick = (lineId: string, hasInsight: boolean) => {
    if (hasInsight) {
      setActiveGenieLine(lineId);
      setIsSidebarOpen(true);
    }
  };

  const handleSyncToSlate = (lineId: string) => {
    setSyncedLines(prev => new Set(prev).add(lineId));
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] animate-in fade-in duration-700 bg-neutral-950 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl relative">
      
      {/* 1. SCRIPT WORKSPACE (The Desk) */}
      <main className="flex-1 overflow-y-auto bg-neutral-100/5 relative scrollbar-hide" ref={scriptScrollRef}>
        {/* Mobile Sub-Header */}
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between p-4 bg-black/40 backdrop-blur-xl border-b border-white/5">
           <button onClick={() => navigate(-1)} className="p-2 text-neutral-400"><ChevronLeft /></button>
           <p className="text-[10px] font-black uppercase tracking-widest text-white">THE MIDNIGHT SCRIPT</p>
           <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className={`p-2 rounded-lg transition-all ${isSidebarOpen ? 'bg-red-600 text-white' : 'text-red-500'}`}>
              <BrainCircuit size={20} />
           </button>
        </div>

        {/* Paper Container */}
        <div className="max-w-4xl mx-auto py-8 md:py-20 px-4 md:px-12 lg:px-24">
          <div className="bg-white text-black p-10 md:p-24 lg:p-32 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-sm min-h-screen relative font-script selection:bg-red-100 ring-1 ring-black/5">
            
            {/* Script Header Info */}
            <div className="mb-24 space-y-2 text-center opacity-60">
              <p className="text-[12px] tracking-[0.2em] font-black">"THE MIDNIGHT SCRIPT"</p>
              <p className="text-[11px] font-bold">PRODUCTION DRAFT • v4.2 • MUMBAI UNIT</p>
              <div className="w-8 h-px bg-black/10 mx-auto mt-4" />
            </div>
            
            <div className="space-y-6 md:space-y-8">
              {MOCK_SCRIPT.map((line) => {
                const hasInsight = !!line.metadata?.genieInsight;
                const isActive = activeGenieLine === line.id;

                return (
                  <div 
                    key={line.id} 
                    onClick={() => handleLineClick(line.id, hasInsight)}
                    className={`group relative transition-all duration-500 cursor-pointer py-1.5 px-2 -mx-2 rounded-xl ${
                      line.type === 'slugline' ? 'font-bold uppercase mt-12 mb-6 border-b border-transparent group-hover:border-black/5' :
                      line.type === 'character' ? 'text-center w-full mt-10 uppercase tracking-wide font-bold' :
                      line.type === 'dialogue' ? 'text-center px-8 md:px-20 lg:px-32 mx-auto max-w-[600px] leading-[1.3]' :
                      line.type === 'parenthetical' ? 'text-center px-12 md:px-16 italic text-[0.9em] opacity-70' :
                      'text-left mt-6 leading-relaxed'
                    } ${isActive ? 'bg-red-50 ring-8 ring-red-50 scale-[1.01] z-10' : 'hover:bg-neutral-50'} ${activeGenieLine && !isActive ? 'opacity-30 blur-[0.5px] scale-[0.99]' : 'opacity-100'}`}
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {hasInsight && (
                      <div className={`absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 transition-all duration-500 ${isActive ? 'text-red-600 scale-125' : 'text-neutral-200 group-hover:text-red-500 opacity-20 group-hover:opacity-100'}`}>
                        <Sparkles size={isActive ? 22 : 18} />
                      </div>
                    )}
                    <p>{line.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Bar (Float) */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 p-2 bg-neutral-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-3xl z-40">
           <button className="p-3 text-neutral-400 hover:text-white" onClick={() => setFontSize(s => Math.max(12, s-1))}><Type size={16} /></button>
           <div className="w-px h-4 bg-white/10 mx-1" />
           <button className="p-3 text-neutral-400 hover:text-white" onClick={() => setFontSize(s => Math.min(20, s+1))}><Type size={20} /></button>
           <div className="w-px h-4 bg-white/10 mx-1" />
           <button className="p-3 text-neutral-400 hover:text-white"><Search size={18} /></button>
           <button className="p-3 text-neutral-400 hover:text-white md:hidden" onClick={() => setIsSidebarOpen(true)}><BrainCircuit size={18} /></button>
        </div>
      </main>

      {/* 2. INTELLIGENCE RAIL (The Mission Deck) */}
      <aside className={`
        fixed inset-y-0 right-0 z-[60] w-full sm:w-[450px] md:relative md:inset-auto md:flex flex-col 
        bg-neutral-900/40 backdrop-blur-3xl border-l border-white/5 p-8 md:p-10 space-y-10
        transition-transform duration-500 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'}
      `}>
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-red-500">
            <BrainCircuit size={24} className="animate-pulse" />
            <h3 className="font-cinematic font-bold tracking-[0.2em] text-2xl uppercase">Intelligence</h3>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 bg-neutral-900 rounded-xl text-neutral-500 hover:text-white transition-all hidden md:block" onClick={() => navigate('/slate')}>
              <ArrowRightLeft size={18} />
            </button>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden p-3 bg-neutral-900 rounded-xl text-neutral-500">
               <X size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto space-y-10 pr-2 scrollbar-hide">
          {activeGenieLine ? (
            <div className="p-10 bg-red-600 border border-red-500 rounded-[2.5rem] space-y-6 animate-in slide-in-from-right-8 duration-500 shadow-3xl shadow-red-600/30">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.3em]">
                  <Wand2 size={20} /> Breakdown Sync
                </div>
                <button onClick={() => setActiveGenieLine(null)} className="opacity-60 hover:opacity-100"><X size={16} /></button>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">AI Contextual Insight</p>
                <p className="text-xl md:text-2xl text-white font-bold leading-tight italic tracking-tight">
                  "{MOCK_SCRIPT.find(l => l.id === activeGenieLine)?.metadata?.genieInsight}"
                </p>
              </div>

              <div className="pt-6 flex flex-col gap-3">
                 <button 
                  onClick={() => handleSyncToSlate(activeGenieLine)}
                  className={`w-full py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl transition-all active-scale ${
                    syncedLines.has(activeGenieLine) ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-neutral-100'
                  }`}
                 >
                    {syncedLines.has(activeGenieLine) ? <><Check size={16} className="inline mr-2"/> SYNCED TO SLATE</> : 'APPEND TO GLOBAL SLATE'}
                 </button>
                 <button className="w-full py-4 bg-black/20 text-white/60 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10 transition-all">
                   NOTIFY DEPARTMENTS
                 </button>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[3.5rem] space-y-6 bg-black/20 group">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600/20 blur-2xl rounded-full scale-50 group-hover:scale-100 transition-transform duration-700" />
                <div className="w-20 h-20 bg-neutral-900 rounded-3xl flex items-center justify-center mx-auto text-neutral-700 border border-white/5 relative z-10">
                  <FileText size={40} className="group-hover:text-red-500 transition-colors" />
                </div>
              </div>
              <div className="space-y-3">
                <p className="text-xl font-cinematic font-bold text-white tracking-widest uppercase leading-none">Logic Ready</p>
                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest leading-relaxed max-w-[200px] mx-auto">
                  Select a <span className="text-red-500">sparkle-tagged</span> line to initialize context-aware production sync.
                </p>
              </div>
            </div>
          )}

          <section className="space-y-6">
            <h4 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em] px-2">Pipeline Status</h4>
            <div className="flex justify-between items-center px-4 bg-black/40 p-6 rounded-[2rem] border border-white/5">
               {['Script', 'Slate', 'Set', 'Wrap'].map((p, i) => (
                 <div key={p} className="flex flex-col items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black border transition-all duration-700 ${
                      i === 0 ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-600/20' : 'bg-neutral-800 text-neutral-600 border-white/5'
                    }`}>
                       {i === 0 ? <Check size={18}/> : i + 1}
                    </div>
                    <span className={`text-[8px] font-black uppercase tracking-widest ${i === 0 ? 'text-red-500' : 'text-neutral-700'}`}>{p}</span>
                 </div>
               ))}
            </div>
          </section>

          <section className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] space-y-4">
             <div className="flex items-center gap-3 text-neutral-400">
                <Clock size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Est. Production Sync</span>
             </div>
             <div className="flex items-baseline gap-2">
                <span className="text-4xl font-cinematic font-bold text-white leading-none">4.5h</span>
                <span className="text-[10px] text-neutral-600 font-bold uppercase">Estimated Coverage</span>
             </div>
          </section>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-auto">
           <button className="flex items-center justify-center gap-3 py-5 bg-neutral-800 hover:bg-neutral-700 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all active-scale border border-white/5 text-neutral-400 hover:text-white">
             <Download size={18} /> SIDES
           </button>
           <button onClick={() => navigate('/slate')} className="flex items-center justify-center gap-3 py-5 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-3xl shadow-red-600/30 active-scale group">
             TO SLATE <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </aside>
    </div>
  );
};

export default ScriptReader;
