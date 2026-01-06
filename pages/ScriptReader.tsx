import React, { useState, useEffect, useRef } from 'react';
import { MOCK_SCRIPT, MOCK_SCRIPT_VERSIONS } from '../constants';
import { 
  History, Lock, Save, Maximize2, Plus, 
  Upload, Download, Sparkles, X, ChevronRight, 
  Loader2, AlertTriangle, ShieldCheck, Edit3, 
  Eye, Monitor, BookOpen, Trash2, Settings, Send
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ScriptElementType, ScriptLine } from '../types';

const ScriptReader: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Script Content State
  const [scriptLines, setScriptLines] = useState<ScriptLine[]>(MOCK_SCRIPT as ScriptLine[]);
  const [activeVersion, setActiveVersion] = useState(MOCK_SCRIPT_VERSIONS[1]);
  const [focusedLineId, setFocusedLineId] = useState<string | null>(null);
  
  // UI States
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [showGeniePanel, setShowGeniePanel] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [zenMode, setZenMode] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'review'>('edit');
  const [isSaving, setIsSaving] = useState(false);
  const [isDispatchingSides, setIsDispatchingSides] = useState(false);

  // Scriptwriting Logic Constants
  const ELEMENTS: { type: ScriptElementType; label: string; shortcut: string }[] = [
    { type: 'slugline', label: 'Scene Heading', shortcut: 'S' },
    { type: 'action', label: 'Action', shortcut: 'A' },
    { type: 'character', label: 'Character', shortcut: 'C' },
    { type: 'parenthetical', label: 'Parenthetical', shortcut: 'P' },
    { type: 'dialogue', label: 'Dialogue', shortcut: 'D' },
    { type: 'transition', label: 'Transition', shortcut: 'T' }
  ];

  // Slugline Helper Logic
  const parseSlugline = (content: string) => {
    const parts = content.split(' - ');
    const settingPart = parts[0]?.split('. ')[0] || 'INT';
    const locationPart = parts[0]?.split('. ')[1] || '';
    const timePart = parts[1] || 'DAY';
    return { setting: settingPart, location: locationPart, time: timePart };
  };

  const updateSlugline = (id: string, setting: string, location: string, time: string) => {
    const newContent = `${setting}. ${location.toUpperCase()} - ${time.toUpperCase()}`;
    updateLine(id, newContent);
  };

  // Logic: Real-time Editing Functions
  const updateLine = (id: string, newContent: string) => {
    setScriptLines(lines => lines.map(l => l.id === id ? { ...l, content: newContent, isModified: true } : l));
  };

  const changeLineType = (id: string, newType: ScriptElementType) => {
    setScriptLines(lines => lines.map(l => l.id === id ? { ...l, type: newType } : l));
  };

  const addNewLine = (afterId: string, type: ScriptElementType = 'action') => {
    const index = scriptLines.findIndex(l => l.id === afterId);
    const newLine: ScriptLine = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      content: '',
      isModified: true
    };
    const newLines = [...scriptLines];
    newLines.splice(index + 1, 0, newLine);
    setScriptLines(newLines);
    setTimeout(() => setFocusedLineId(newLine.id), 0);
  };

  const deleteLine = (id: string) => {
    if (scriptLines.length <= 1) return;
    const index = scriptLines.findIndex(l => l.id === id);
    const prevLineId = scriptLines[index - 1]?.id || scriptLines[index + 1]?.id;
    setScriptLines(lines => lines.filter(l => l.id !== id));
    if (prevLineId) setFocusedLineId(prevLineId);
  };

  const handleKeyDown = (e: React.KeyboardEvent, line: ScriptLine) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      let nextType: ScriptElementType = 'action';
      if (line.type === 'character') nextType = 'dialogue';
      else if (line.type === 'dialogue') nextType = 'character';
      else if (line.type === 'parenthetical') nextType = 'dialogue';
      else if (line.type === 'slugline') nextType = 'action';
      addNewLine(line.id, nextType);
    }
    
    if (e.key === 'Tab') {
      e.preventDefault();
      const order: ScriptElementType[] = ['character', 'dialogue', 'parenthetical', 'action', 'slugline', 'transition'];
      const nextIndex = (order.indexOf(line.type) + 1) % order.length;
      changeLineType(line.id, order[nextIndex]);
    }

    if (e.key === 'Backspace' && !line.content && scriptLines.length > 1) {
      e.preventDefault();
      deleteLine(line.id);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const handleDispatchSides = () => {
    setIsDispatchingSides(true);
    // Simulation: Export active dialogue beats to the Talent Audition hub
    setTimeout(() => {
      setIsDispatchingSides(false);
      alert("SIDES DISPATCHED: Dialogue nodes synced to Talent Mission Slate.");
    }, 2000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setScriptLines([
        { id: '1', type: 'slugline', content: 'INT. CORRIDOR - NIGHT' },
        { id: '2', type: 'action', content: 'The lights flicker. A shadow moves rapidly.' },
        { id: '3', type: 'character', content: 'UNKNOWN' },
        { id: '4', type: 'dialogue', content: 'You shouldn\'t have come back.' }
      ]);
    }, 2000);
  };

  const handleGenieAudit = async () => {
    setIsAnalyzing(true);
    setShowGeniePanel(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const scriptText = scriptLines.map(l => `${l.type.toUpperCase()}: ${l.content}`).join('\n');
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform an Impact Audit on this script change. Focus on production feasibility, costume changes, and gear requirements for these specific technical beats:
        ${scriptText}`,
        config: { systemInstruction: "You are CLAP Genie, an AI script supervisor. Provide technical audits and logistical warnings." }
      });
      setAnalysisResult(response.text || "Audit failed to initialize.");
    } catch (e) {
      setAnalysisResult("Logic Node Error: Verify Registry Connection.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] bg-neutral-950 overflow-hidden rounded-[2rem] md:rounded-[3.5rem] border border-white/5 shadow-2xl relative">
      
      {!zenMode && (
        <aside className="w-full md:w-80 border-r border-white/5 flex flex-col bg-black/60 backdrop-blur-3xl shrink-0 hidden md:flex animate-in slide-in-from-left duration-500">
          <header className="p-8 border-b border-white/5 space-y-4">
            <div className="flex items-center gap-2 text-red-500">
               <History size={16} />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Draft Registry</span>
            </div>
            <div className="flex items-center justify-between">
               <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Slates</h3>
               <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 bg-neutral-900 rounded-xl text-neutral-500 hover:text-white transition-all"
               >
                 <Upload size={18} />
               </button>
               <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf,.txt" />
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            {/* BRIDGING ACTION: DISPATCH SIDES */}
            <div className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-[2rem] space-y-4">
               <div className="flex items-center gap-2 text-blue-500">
                  <Send size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Talent Sync</span>
               </div>
               <p className="text-[10px] text-neutral-500 font-bold uppercase leading-relaxed">Requirement 3.2: Export dialogue beats to the Talent Audition hub.</p>
               <button 
                onClick={handleDispatchSides}
                disabled={isDispatchingSides}
                className="w-full py-3 bg-blue-600/10 text-blue-500 text-[8px] font-black uppercase border border-blue-600/20 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
               >
                 {isDispatchingSides ? 'SYNCING...' : 'Dispatch Sides to Registry'}
               </button>
            </div>

            <div className="p-6 bg-red-600/5 border border-red-600/20 rounded-[2rem] space-y-4">
               <div className="flex items-center gap-2 text-red-500">
                  <Sparkles size={16} className="animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest">Impact Engine</span>
               </div>
               <p className="text-[10px] text-neutral-500 font-bold uppercase leading-relaxed">System monitoring real-time beat modifications for Unit A impacts.</p>
               <button onClick={handleGenieAudit} className="w-full py-3 bg-red-600/10 text-red-500 text-[8px] font-black uppercase border border-red-600/20 rounded-xl hover:bg-red-600 hover:text-white transition-all">Perform Impact Audit</button>
            </div>

            <div className="space-y-2">
               <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-2">Timeline</p>
               {MOCK_SCRIPT_VERSIONS.map(v => (
                 <button 
                  key={v.id} 
                  onClick={() => setActiveVersion(v)}
                  className={`w-full p-6 rounded-2xl border text-left transition-all ${
                    activeVersion.id === v.id ? 'bg-red-600/10 border-red-600 text-white shadow-xl' : 'bg-neutral-900/50 border-white/5 text-neutral-500'
                  }`}
                 >
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-[10px] font-black uppercase tracking-widest">{v.version}</span>
                       {v.isLocked && <Lock size={12} className="text-green-500"/>}
                    </div>
                    <p className="text-xs font-bold uppercase truncate">{v.changeLog}</p>
                 </button>
               ))}
            </div>
          </div>

          <div className="p-6 border-t border-white/5 space-y-3">
             <button className="w-full py-4 bg-neutral-900 border border-white/5 text-neutral-500 text-[9px] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3">
                <Download size={14} /> EXPORT FINAL DRAFT
             </button>
          </div>
        </aside>
      )}

      <main className={`flex-1 overflow-y-auto relative scrollbar-hide flex flex-col transition-all duration-700 ${zenMode ? 'bg-[#0a0a0a]' : 'bg-neutral-100/5'}`}>
        
        {!zenMode && (
          <div className="sticky top-0 z-30 bg-neutral-950/80 backdrop-blur-3xl border-b border-white/5 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide py-1">
              <div className="flex bg-neutral-900 border border-white/10 rounded-xl p-1 mr-4">
                 <button 
                  onClick={() => setViewMode('edit')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'edit' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'}`}
                 >
                    <Edit3 size={18} />
                 </button>
                 <button 
                  onClick={() => setViewMode('review')}
                  className={`p-2.5 rounded-lg transition-all ${viewMode === 'review' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'}`}
                 >
                    <BookOpen size={18} />
                 </button>
              </div>
              {viewMode === 'edit' && ELEMENTS.map(el => (
                <button
                  key={el.type}
                  onClick={() => focusedLineId && changeLineType(focusedLineId, el.type)}
                  className={`px-4 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all border whitespace-nowrap ${
                    scriptLines.find(l => l.id === focusedLineId)?.type === el.type 
                      ? 'bg-red-600 border-red-500 text-white shadow-lg' 
                      : 'bg-neutral-900 border-white/5 text-neutral-600 hover:text-white'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 shrink-0">
               <button onClick={() => setZenMode(!zenMode)} className="p-3 bg-neutral-900 text-neutral-500 rounded-xl hover:text-white transition-all"><Maximize2 size={18} /></button>
               <button 
                onClick={handleSave}
                className={`p-3 rounded-xl transition-all shadow-xl flex items-center gap-2 ${isSaving ? 'bg-green-600 text-white' : 'bg-red-600 text-white active-scale'}`}
               >
                 {isSaving ? <ShieldCheck size={18} /> : <Save size={18} />}
               </button>
            </div>
          </div>
        )}

        <div className={`flex-1 max-w-4xl mx-auto py-12 md:py-24 px-6 md:px-16 w-full transition-all duration-700 ${zenMode ? 'max-w-3xl' : ''}`}>
          <div className={`bg-white text-black p-10 sm:p-20 md:p-32 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-sm min-h-screen font-script selection:bg-red-100 relative ${isUploading ? 'opacity-50 blur-md pointer-events-none' : ''}`}>
            
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
            
            <div className="space-y-1 relative z-10">
              {scriptLines.map((line, idx) => {
                const isSlugline = line.type === 'slugline';
                const slug = isSlugline ? parseSlugline(line.content) : null;

                return (
                  <div 
                    key={line.id} 
                    className={`group relative transition-all outline-none ${
                      line.type === 'slugline' ? 'font-bold uppercase mt-16 mb-8 border-l-4 border-red-600 pl-4 py-2 bg-neutral-50/50' :
                      line.type === 'character' ? 'text-center w-full mt-12 uppercase font-bold tracking-widest' :
                      line.type === 'dialogue' ? 'text-center px-12 md:px-32 mx-auto max-w-[650px] leading-[1.2]' :
                      line.type === 'parenthetical' ? 'text-center italic opacity-70 mx-auto max-w-[400px]' :
                      line.type === 'transition' ? 'text-right uppercase mt-10 font-bold' :
                      'text-left mt-6 leading-relaxed'
                    }`}
                  >
                    {viewMode === 'edit' ? (
                      <>
                        {isSlugline ? (
                          <div className="flex flex-col md:flex-row gap-4 items-center">
                             <div className="flex bg-neutral-100 rounded-lg p-1">
                                {['INT', 'EXT'].map(s => (
                                  <button 
                                    key={s} 
                                    onClick={() => updateSlugline(line.id, s, slug!.location, slug!.time)}
                                    className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${slug!.setting === s ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'}`}
                                  >
                                    {s}
                                  </button>
                                ))}
                             </div>
                             <input 
                              type="text" 
                              value={slug!.location}
                              placeholder="LOCATION NAME"
                              onChange={(e) => updateSlugline(line.id, slug!.setting, e.target.value, slug!.time)}
                              onFocus={() => setFocusedLineId(line.id)}
                              className="flex-1 bg-transparent border-b border-neutral-200 outline-none px-2 font-bold text-lg uppercase placeholder:text-neutral-300"
                             />
                             <div className="flex bg-neutral-100 rounded-lg p-1">
                                {['DAY', 'NIGHT', 'DUSK'].map(t => (
                                  <button 
                                    key={t} 
                                    onClick={() => updateSlugline(line.id, slug!.setting, slug!.location, t)}
                                    className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${slug!.time === t ? 'bg-black text-white' : 'text-neutral-400 hover:text-black'}`}
                                  >
                                    {t}
                                  </button>
                                ))}
                             </div>
                          </div>
                        ) : (
                          <textarea
                            rows={1}
                            value={line.content}
                            onFocus={() => setFocusedLineId(line.id)}
                            onChange={(e) => {
                              updateLine(line.id, e.target.value);
                              e.target.style.height = 'auto';
                              e.target.style.height = `${e.target.scrollHeight}px`;
                            }}
                            onKeyDown={(e) => handleKeyDown(e, line)}
                            className="w-full bg-transparent border-none outline-none resize-none overflow-hidden p-0 h-auto caret-red-600 block"
                            placeholder={line.type.toUpperCase()}
                            autoFocus={line.id === focusedLineId}
                          />
                        )}
                        
                        <div className="absolute -left-16 top-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1 hidden md:flex">
                           <button onClick={() => addNewLine(line.id)} className="p-1.5 text-neutral-300 hover:text-red-500 transition-colors"><Plus size={16}/></button>
                           <button onClick={() => deleteLine(line.id)} className="p-1.5 text-neutral-300 hover:text-neutral-600 transition-colors"><Trash2 size={16}/></button>
                        </div>
                      </>
                    ) : (
                      <div className="whitespace-pre-wrap">{line.content}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="md:hidden fixed bottom-8 left-8 right-8 z-50 bg-black/90 backdrop-blur-2xl border border-white/10 rounded-[1.5rem] p-3 flex items-center justify-between shadow-3xl">
           <div className="flex gap-2 overflow-x-auto scrollbar-hide pr-4">
              {ELEMENTS.map(el => (
                <button 
                  key={el.type}
                  onClick={() => focusedLineId && changeLineType(focusedLineId, el.type)}
                  className={`p-3 rounded-xl transition-all ${
                    scriptLines.find(l => l.id === focusedLineId)?.type === el.type ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'
                  }`}
                >
                  <span className="text-[10px] font-black uppercase tracking-widest">{el.shortcut}</span>
                </button>
              ))}
           </div>
           <button onClick={() => focusedLineId && addNewLine(focusedLineId)} className="p-4 bg-white text-black rounded-xl active-scale"><Plus size={20} /></button>
        </div>

        {isUploading && (
          <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md">
             <div className="text-center space-y-6">
                <Loader2 size={60} className="text-red-600 animate-spin mx-auto" />
                <p className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest animate-pulse">Initializing Script Node...</p>
             </div>
          </div>
        )}
      </main>

      {showGeniePanel && (
        <div className="fixed inset-0 z-[200] flex justify-end">
           <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500" onClick={() => setShowGeniePanel(false)} />
           <aside className="relative w-full md:w-[500px] bg-[#080808] border-l border-white/10 flex flex-col shadow-4xl animate-in slide-in-from-right duration-500">
              <header className="p-8 border-b border-white/5 flex justify-between items-center bg-black/60 backdrop-blur-xl shrink-0">
                 <div className="flex items-center gap-4">
                    <div className="p-4 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                       <Monitor size={24} className="text-blue-500 animate-pulse" />
                    </div>
                    <div>
                       <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Impact Manifest</h4>
                       <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mt-1">Registry Audit v4.4.1</p>
                    </div>
                 </div>
                 <button onClick={() => setShowGeniePanel(false)} className="p-3 bg-neutral-900 rounded-xl text-neutral-500 hover:text-white transition-all"><X size={24} /></button>
              </header>

              <div className="flex-1 overflow-y-auto p-10 space-y-10 scrollbar-hide">
                 {isAnalyzing ? (
                   <div className="space-y-12 py-32 text-center">
                      <div className="relative w-20 h-20 mx-auto">
                        <div className="absolute inset-0 bg-blue-600/20 rounded-full animate-ping" />
                        <Loader2 size={80} className="text-blue-500 animate-spin" />
                      </div>
                      <p className="text-3xl font-cinematic font-bold text-white uppercase tracking-[0.2em] animate-pulse">Scanning Technical Beats...</p>
                   </div>
                 ) : (
                   <div className="space-y-10 pb-12 animate-in fade-in duration-1000">
                      <div className="p-8 bg-red-600/5 border border-red-600/20 rounded-[2.5rem] space-y-6">
                         <div className="flex items-center gap-4 text-red-500">
                            <ShieldCheck size={28} />
                            <h4 className="text-lg font-black uppercase tracking-widest text-white">Audit Status: WARNING</h4>
                         </div>
                         <p className="text-[12px] text-neutral-400 font-bold uppercase tracking-widest leading-relaxed">
                            Detected 3 major dialogue shifts in Scene 14. Costume Designer and Sound Mixer flagged for immediate re-approval.
                         </p>
                      </div>

                      <div className="prose-cinematic bg-neutral-950/50 border border-white/5 p-10 rounded-[3rem] shadow-inner">
                         <ReactMarkdown remarkPlugins={[remarkGfm]}>
                           {analysisResult || '#### Summary \n - **Scenes Impacted:** 14, 15, 18 \n - **Primary Risk:** Continuity (Dialogue) \n - **Technical Unit:** Unit A (Action)'}
                         </ReactMarkdown>
                      </div>
                   </div>
                 )}
              </div>
           </aside>
        </div>
      )}
    </div>
  );
};

export default ScriptReader;