import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BrainCircuit, 
  Send, 
  Sparkles, 
  Zap, 
  RefreshCw, 
  Users, 
  FileText,
  Image as ImageIcon,
  Download,
  Loader2,
  CheckCircle2,
  Key
} from 'lucide-react';

type MessageType = 'text' | 'image' | 'system';

interface Message {
  role: 'user' | 'model';
  type: MessageType;
  content: string;
  mediaUrl?: string;
}

const AIAssistant: React.FC = () => {
  const [input, setInput] = useState('');
  const [genMode, setGenMode] = useState<MessageType>('text');
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      type: 'text', 
      content: 'System Online. I am CLAP Genie. Select a mode below to analyze scripts or generate concept art for your production.' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    const currentMode = genMode;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', type: 'text', content: userMessage }]);
    setIsLoading(true);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      if (currentMode === 'text') {
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: userMessage,
          config: {
            systemInstruction: `You are CLAP Genie, a world-class AI production assistant for film and media.
            Your responses MUST be professional, concise, and highly actionable.
            Use Cinematic and Technical terminology (e.g., 'Unit A', 'Dailies', 'Principal Photography').
            
            FORMATTING RULES:
            1. Use Markdown for all structural elements.
            2. Use TABLES for comparisons, kit lists, or personnel recommendations.
            3. Use BOLD for project names and key highlights.
            4. Use HEADERS (###) to separate logic blocks.
            5. Use Bullet Points for suggested actions.
            
            Scope of help: Script analysis, logistics predictions, production summaries, and talent/crew consulting.`,
          }
        });
        setMessages(prev => [...prev, { role: 'model', type: 'text', content: response.text || "I'm sorry, I couldn't process that request." }]);
      } 
      
      else if (currentMode === 'image') {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { 
            parts: [
              { text: `Cinematic high-quality concept art, professional lighting, film production still: ${userMessage}` }
            ] 
          },
          config: {
            imageConfig: {
              aspectRatio: "16:9"
            }
          }
        });

        let imageUrl = '';
        let textResponse = '';
        
        if (response.candidates?.[0]?.content?.parts) {
          for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
              imageUrl = `data:image/png;base64,${part.inlineData.data}`;
            } else if (part.text) {
              textResponse = part.text;
            }
          }
        }

        setMessages(prev => [...prev, { 
          role: 'model', 
          type: 'image', 
          content: textResponse || 'Concept visualization generated.', 
          mediaUrl: imageUrl 
        }]);
      }
    } catch (error: any) {
      console.error('Genie Error:', error);
      setMessages(prev => [...prev, { 
        role: 'model', 
        type: 'text', 
        content: "The Logic Engine encountered a bottleneck. Please verify your connection and try again." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col space-y-6 animate-in fade-in duration-500 pb-16 max-w-6xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3 text-red-500">
            <BrainCircuit size={20} className="animate-pulse" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Intelligence Matrix v4.2</p>
          </div>
          <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white uppercase">AI GENIE</h1>
        </div>
        <button 
          onClick={() => setMessages([{ role: 'model', type: 'text', content: 'Buffer cleared. Ready for next mission.' }])}
          className="bg-neutral-900 p-4 rounded-2xl border border-white/5 hover:bg-neutral-800 transition-all text-neutral-500 flex items-center gap-2 text-xs font-bold active-scale"
        >
          <RefreshCw size={16} /> RESET SLATE
        </button>
      </header>

      <div className="grid lg:grid-cols-12 gap-6 flex-1 min-h-0 px-4">
         {/* Sidebar Controls */}
         <div className="lg:col-span-3 space-y-6 hidden lg:block">
            <h3 className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Generation Modes</h3>
            <div className="space-y-2">
               {[
                 { id: 'text', label: 'Logic / Consult', icon: <FileText size={18} /> },
                 { id: 'image', label: 'Concept / Image', icon: <ImageIcon size={18} /> }
               ].map((mode) => (
                 <button 
                  key={mode.id} 
                  onClick={() => setGenMode(mode.id as MessageType)}
                  className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all active-scale ${
                    genMode === mode.id 
                      ? 'bg-neutral-900 border-red-600/50 text-white shadow-xl' 
                      : 'bg-neutral-900/30 border-white/5 text-neutral-500 hover:border-white/10'
                  }`}
                 >
                    <div className="flex items-center gap-4">
                       <div className={genMode === mode.id ? 'text-red-500' : 'text-neutral-700'}>{mode.icon}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{mode.label}</span>
                    </div>
                    {genMode === mode.id && <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />}
                 </button>
               ))}
            </div>

            <div className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-3">
               <div className="flex items-center gap-2 text-red-500">
                  <Zap size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Genie Protocol</span>
               </div>
               <p className="text-[10px] text-neutral-500 font-medium leading-relaxed italic">
                 Multimodal reasoning enabled. Structured manifests utilize GFM standards for high-fidelity technical exchange.
               </p>
            </div>
         </div>

         {/* Chat Matrix */}
         <div className="lg:col-span-9 flex flex-col bg-neutral-900 border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl bg-black/20">
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-in slide-in-from-bottom-4 duration-500`}>
                   <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex-shrink-0 flex items-center justify-center border ${
                     msg.role === 'model' ? 'bg-red-600 text-white border-red-500 shadow-xl' : 'bg-neutral-800 text-neutral-400 border-white/5'
                   }`}>
                      {msg.role === 'model' ? <BrainCircuit size={20} /> : <Users size={20} />}
                   </div>
                   
                   <div className={`max-w-[95%] md:max-w-[85%] space-y-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`p-6 md:p-10 rounded-[2rem] md:rounded-[2.5rem] border transition-all shadow-xl ${
                        msg.role === 'model' ? 'bg-black/40 border-white/5 text-neutral-300' : 'bg-red-600 text-white border-red-500 text-left'
                      }`}>
                         {msg.type === 'text' && (
                            <div className="prose-cinematic">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                         )}
                         
                         {msg.type === 'image' && msg.mediaUrl && (
                           <div className="space-y-4">
                              <div className="aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-neutral-950">
                                 <img src={msg.mediaUrl} className="w-full h-full object-cover" alt="Genie Render" />
                              </div>
                              <div className="flex justify-between items-center gap-4">
                                 <p className="text-xs italic text-neutral-400 line-clamp-2">{msg.content}</p>
                                 <a href={msg.mediaUrl} download="Concept_Art.png" className="p-2 bg-white/5 rounded-lg text-neutral-400 hover:text-white transition-all active-scale shrink-0">
                                    <Download size={16} />
                                 </a>
                              </div>
                           </div>
                         )}
                      </div>
                   </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-4 animate-pulse">
                   <div className="w-10 h-10 rounded-2xl bg-neutral-800 flex items-center justify-center text-neutral-700 border border-white/5">
                      <BrainCircuit size={20} />
                   </div>
                   <div className="h-16 bg-neutral-800/30 rounded-[2rem] w-1/2 border border-white/5" />
                </div>
              )}
            </div>

            {/* Tactical Input Bar */}
            <div className="p-6 md:p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
               <div className="flex gap-2 lg:hidden mb-4 overflow-x-auto scrollbar-hide">
                  {['text', 'image'].map((m) => (
                    <button 
                      key={m}
                      onClick={() => setGenMode(m as any)}
                      className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                        genMode === m ? 'bg-red-600 border-red-500 text-white' : 'bg-neutral-900 border-white/5 text-neutral-500'
                      }`}
                    >
                      {m === 'text' ? 'Consult' : 'Concept'}
                    </button>
                  ))}
               </div>

               <div className="bg-neutral-800/50 rounded-[2rem] md:rounded-[3rem] p-2 flex items-center gap-2 border border-white/5 shadow-3xl focus-within:border-red-600/50 transition-all">
                  <div className="hidden md:flex p-2 bg-black/40 rounded-full items-center gap-1">
                     <button 
                      onClick={() => setGenMode('text')}
                      className={`p-3 rounded-full transition-all ${genMode === 'text' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-600 hover:text-neutral-400'}`}
                      title="Text Consultation"
                     >
                       <FileText size={18} />
                     </button>
                     <button 
                      onClick={() => setGenMode('image')}
                      className={`p-3 rounded-full transition-all ${genMode === 'image' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-600 hover:text-neutral-400'}`}
                      title="Image Generation"
                     >
                       <ImageIcon size={18} />
                     </button>
                  </div>
                  
                  <input 
                    type="text" 
                    placeholder={
                      genMode === 'text' ? "Ask about script beats or logistics..." :
                      "Describe the concept art or mood board scene..."
                    } 
                    className="flex-1 bg-transparent border-none outline-none px-4 md:px-6 text-sm font-medium text-white placeholder-neutral-700"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  
                  <button 
                    onClick={handleSend}
                    disabled={isLoading || !input.trim()}
                    className={`p-4 md:p-6 rounded-[1.5rem] md:rounded-full text-white shadow-3xl transition-all active-scale-95 ${
                      genMode === 'text' ? 'bg-red-600 shadow-red-600/30' :
                      'bg-blue-600 shadow-blue-600/30'
                    } disabled:bg-neutral-700 disabled:shadow-none`}
                  >
                    {isLoading ? <Loader2 size={24} className="animate-spin" /> : <Send size={24} />}
                  </button>
               </div>
               
               <div className="flex justify-center gap-8 mt-6">
                  <div className="flex items-center gap-2 opacity-30">
                    <CheckCircle2 size={10} className="text-green-500" />
                    <p className="text-[8px] text-white font-black uppercase tracking-[0.4em]">Secure Node Linked</p>
                  </div>
                  <div className="flex items-center gap-2 opacity-30">
                    <Key size={10} className="text-blue-500" />
                    <p className="text-[8px] text-white font-black uppercase tracking-[0.4em]">Context Encrypted</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default AIAssistant;