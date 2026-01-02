
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BrainCircuit, Send, Sparkles, AlertCircle, Clock, CheckCircle, Zap, Clapperboard, RefreshCw, Users, FileText } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
    { role: 'model', content: 'Hello! I am CLAP Genie. I can help you analyze scripts, generate daily production summaries, optimize crew schedules, or even predict logistics delays. How can I assist your production today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMessage,
        config: {
          systemInstruction: `You are CLAP Genie, a world-class AI production assistant for film and media.
          Your goal is to solve day-to-day pain points for directors, production leads, and crew.
          Help them with:
          1. Script Analysis: Identify emotional beats, character arcs, and technical requirements.
          2. Logistics: Predict delays, suggest alternatives for equipment or locations.
          3. Daily Summaries: Condense complex production logs into 3-4 bullet points.
          4. Global workflows: Timezone-aware scheduling.
          Be professional, concise, and highly actionable. Use cinematic terminology.`,
        }
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || "I'm sorry, I couldn't process that. Can we try again?" }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "An error occurred while connecting to the Genie. Please check your network or API settings." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-8 animate-in fade-in duration-500 pb-16 max-w-5xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white">AI GENIE</h1>
          <p className="text-neutral-500 font-medium italic">Empowered by Gemini 3 Flash • Production Logic v4.2</p>
        </div>
        <div className="flex gap-3">
           <button onClick={() => setMessages([{ role: 'model', content: 'Memory cleared. What is on the slate today?' }])} className="bg-neutral-900 p-4 rounded-2xl border border-white/5 hover:bg-neutral-800 transition-all text-neutral-400">
              <RefreshCw size={20} />
           </button>
        </div>
      </header>

      <div className="grid lg:grid-cols-12 gap-8 flex-1 min-h-0">
         {/* Sidebar Suggestions */}
         <div className="lg:col-span-4 space-y-6 hidden lg:block">
            <h3 className="text-xl font-cinematic font-bold tracking-wide">QUICK COMMANDS</h3>
            <div className="space-y-3">
               {[
                 { label: 'Summarize Logs', icon: <Clock size={16} />, prompt: 'Can you summarize the crew logs from yesterday for The Midnight Script?' },
                 { label: 'Script Analysis', icon: <FileText size={16} />, prompt: 'Analyze Scene 12 emotional beats and lighting needs.' },
                 { label: 'Logistics Delay', icon: <AlertCircle size={16} />, prompt: 'Predict the impact of a 2-hour camera rental delay on today shoot.' },
                 { label: 'Crew Match', icon: <Users size={16} />, prompt: 'Who are the top 3 cinematographers for a cyberpunk series?' }
               ].map((cmd, i) => (
                 <button 
                  key={i} 
                  onClick={() => setInput(cmd.prompt)}
                  className="w-full bg-neutral-900 border border-white/5 p-5 rounded-[1.5rem] text-left hover:border-red-600/30 transition-all group"
                 >
                    <div className="flex items-center gap-3 mb-2">
                       <div className="text-red-500 group-hover:scale-110 transition-transform">{cmd.icon}</div>
                       <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{cmd.label}</span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1">{cmd.prompt}</p>
                 </button>
               ))}
            </div>
         </div>

         {/* Chat Interface */}
         <div className="lg:col-span-8 flex flex-col bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-2`}>
                   <div className={`w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                     msg.role === 'model' ? 'bg-red-600 text-white border-red-500 shadow-xl shadow-red-600/20' : 'bg-neutral-800 text-neutral-400 border-white/5'
                   }`}>
                      {msg.role === 'model' ? <BrainCircuit size={24} /> : <Users size={24} />}
                   </div>
                   <div className={`max-w-[80%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${msg.role === 'model' ? 'text-red-500' : 'text-neutral-500'}`}>
                        {msg.role === 'model' ? 'GENIE RESPONSE' : 'PRODUCTION LEAD'}
                      </p>
                      <div className={`p-6 rounded-[2rem] text-sm leading-relaxed border ${
                        msg.role === 'model' ? 'bg-black/40 border-white/5 text-neutral-300' : 'bg-red-600 text-white border-red-500 shadow-xl'
                      }`}>
                         {msg.content}
                      </div>
                   </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 animate-pulse">
                   <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-600">
                      <BrainCircuit size={24} />
                   </div>
                   <div className="space-y-2 w-full">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-700">GENIE IS ANALYZING SLATE...</p>
                      <div className="h-16 bg-neutral-800/50 rounded-[2rem] w-1/2" />
                   </div>
                </div>
              )}
            </div>

            <div className="p-8 bg-black/40 border-t border-white/5">
               <div className="bg-neutral-800 rounded-3xl p-3 flex items-center gap-4 border border-white/5 shadow-2xl focus-within:border-red-600/50 transition-all">
                  <input 
                    type="text" 
                    placeholder="Describe your production pain point..." 
                    className="flex-1 bg-transparent border-none outline-none px-4 text-sm font-medium text-white placeholder-neutral-600"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className="bg-red-600 hover:bg-red-700 disabled:bg-neutral-700 p-4 rounded-2xl text-white shadow-xl transition-all"
                  >
                    <Send size={20} />
                  </button>
               </div>
               <p className="text-center text-[10px] text-neutral-600 mt-4 font-bold uppercase tracking-[0.2em]">Genie provides AI assistance but always verify logistics on set.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIAssistant;
