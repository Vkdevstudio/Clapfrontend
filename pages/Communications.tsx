
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Hash, 
  MessageSquare, 
  Settings, 
  MoreVertical, 
  Send, 
  Smile, 
  Paperclip, 
  CheckCircle2, 
  Zap, 
  ChevronLeft, 
  // Added ChevronRight to fix the "Cannot find name 'ChevronRight'" error on line 306
  ChevronRight,
  Info,
  ShieldAlert,
  Mic,
  Clapperboard,
  Maximize2,
  Clock,
  LayoutGrid,
  Filter,
  Plus,
  Radio,
  // Added Sparkles to solve the "Cannot find name 'Sparkles'" error on line 270
  Sparkles
} from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';
import { useNavigate } from 'react-router-dom';

const Communications: React.FC = () => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('#Set-Alerts');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [showInfoPanel, setShowInfoPanel] = useState(false); // Hidden by default on small screens
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsEmergencyMode(activeChannel === '#Set-Alerts');
    // Scroll to bottom on channel switch
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeChannel]);

  const channels = [
    { id: '1', name: '#General', unread: 0, type: 'public', desc: 'Global production chat' },
    { id: '2', name: '#Set-Alerts', unread: 12, type: 'emergency', desc: 'Critical production triggers' },
    { id: '3', name: '#Direction', unread: 2, type: 'dept', desc: 'Director & AD comms' },
    { id: '4', name: '#Art-Dept', unread: 0, type: 'dept', desc: 'Prop & Set logistics' },
    { id: '5', name: '#Camera-Crew', unread: 5, type: 'dept', desc: 'DOP & AC unit' },
  ];

  const handleChannelSelect = (name: string) => {
    setActiveChannel(name);
    setMobileView('chat');
  };

  return (
    <div className={`h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex bg-neutral-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 ${
      isEmergencyMode ? 'ring-1 ring-red-600/30' : ''
    }`}>
      
      {/* 1. CHANNEL LIST (Sidebar / Mobile Home) */}
      <aside className={`
        ${mobileView === 'list' ? 'flex' : 'hidden'} 
        md:flex flex-col w-full md:w-80 lg:w-96 border-r border-white/5 bg-neutral-950/50 backdrop-blur-3xl z-40
      `}>
        <header className="p-6 md:p-8 border-b border-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-red-600 rounded-full" />
              <h2 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Comms</h2>
            </div>
            <button className="p-2.5 bg-neutral-900 rounded-xl text-neutral-400 hover:text-white transition-all">
              <Plus size={20} />
            </button>
          </div>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search units..." 
              className="w-full bg-neutral-900/50 border border-white/5 rounded-2xl pl-12 pr-4 py-3.5 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
            />
          </div>
        </header>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          {channels.map(ch => (
            <button 
              key={ch.id}
              onClick={() => handleChannelSelect(ch.name)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all active-scale group ${
                activeChannel === ch.name 
                  ? ch.type === 'emergency' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-white/5 text-white border border-white/10'
                  : 'text-neutral-500 hover:bg-white/5'
              }`}
            >
              <div className={`p-3 rounded-xl ${
                activeChannel === ch.name ? 'bg-white/10' : 'bg-neutral-900 border border-white/5'
              }`}>
                {ch.type === 'emergency' ? <ShieldAlert size={18} /> : <Hash size={18} />}
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center justify-between">
                  <span className="font-black text-[11px] uppercase tracking-widest leading-none">{ch.name.replace('#', '')}</span>
                  <span className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">12:45 PM</span>
                </div>
                <p className="text-[9px] font-medium uppercase tracking-tighter opacity-60 mt-1 line-clamp-1">{ch.desc}</p>
              </div>
              {ch.unread > 0 && activeChannel !== ch.name && (
                <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[8px] font-black text-white animate-pulse">
                  {ch.unread}
                </div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
            <Radio size={14} className="text-red-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Unit Broadcast Live</span>
          </div>
        </div>
      </aside>

      {/* 2. CHAT STREAM (Center Panel / Mobile Chat) */}
      <main className={`
        ${mobileView === 'chat' ? 'flex' : 'hidden'} 
        md:flex flex-1 flex-col min-w-0 bg-neutral-950 relative overflow-hidden transition-all duration-500
      `}>
        {/* Responsive Header */}
        <header className={`px-6 py-4 md:py-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-3xl sticky top-0 z-30 ${
          isEmergencyMode ? 'bg-red-950/20 shadow-[inset_0_-20px_40px_rgba(220,38,38,0.05)]' : ''
        }`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileView('list')}
              className="md:hidden p-3 bg-neutral-900 rounded-xl text-white"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all ${
              isEmergencyMode ? 'bg-red-600 text-white animate-pulse shadow-lg' : 'bg-neutral-900 text-white border border-white/5'
            }`}>
              {isEmergencyMode ? <ShieldAlert size={20} /> : <MessageSquare size={20} />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest text-white uppercase leading-none">{activeChannel.replace('#', '')}</h3>
                {isEmergencyMode && <span className="bg-red-600 px-2 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-widest">Urgent</span>}
              </div>
              <p className="text-[8px] md:text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-1.5 hidden sm:block">Operational Ledger • Region Mumbai</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:flex p-3.5 bg-neutral-900 text-neutral-400 rounded-xl border border-white/5 hover:text-white transition-all">
              <Search size={18} />
            </button>
            <button 
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className={`p-3.5 rounded-xl transition-all ${showInfoPanel ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-400 border border-white/5'}`}
            >
              <Info size={18} />
            </button>
          </div>
        </header>

        {/* Message Container */}
        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
        >
          <div className="flex justify-center mb-8">
            <span className="px-4 py-1.5 bg-white/5 rounded-full text-[8px] font-black text-neutral-600 uppercase tracking-widest border border-white/5">Operational History Start • v4.2</span>
          </div>

          {MOCK_MESSAGES.map((msg, i) => (
            <div key={msg.id} className="flex gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative flex-shrink-0">
                <div className={`p-0.5 rounded-2xl md:rounded-3xl ${msg.isEmergency ? 'bg-red-600' : 'bg-white/10'}`}>
                  <img src={msg.senderAvatar} className="w-10 h-10 md:w-14 md:h-14 rounded-[0.9rem] md:rounded-[1.2rem] object-cover" alt={msg.senderName} />
                </div>
                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 border-4 border-neutral-950 rounded-full ${msg.isEmergency ? 'bg-red-600 shadow-[0_0_10px_#DC2626]' : 'bg-green-500'}`} />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-black text-sm md:text-lg uppercase text-white tracking-tight leading-none">{msg.senderName}</span>
                  <span className="text-[8px] text-neutral-700 font-bold uppercase tracking-widest">{msg.timestamp}</span>
                </div>
                
                <div className={`p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] text-sm leading-relaxed border transition-all max-w-[90%] md:max-w-2xl ${
                  msg.isEmergency 
                    ? 'bg-red-600/10 border-red-600/30 text-red-50' 
                    : 'bg-neutral-900 border-white/5 text-neutral-400'
                }`}>
                  {msg.content}
                </div>

                {i === 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-2">
                    <div className="flex-shrink-0 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-xl text-[8px] font-black text-red-500 flex items-center gap-2">
                       <Zap size={12} className="animate-pulse" /> DECISION LOGGED
                    </div>
                    <div className="flex-shrink-0 px-4 py-2 bg-black/40 border border-white/5 rounded-xl text-[8px] font-black text-neutral-600 flex items-center gap-2">
                       <CheckCircle2 size={12} className="text-green-500" /> SYNCED TO AD
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Bar: Native First UX */}
        <div className={`p-4 md:p-8 bg-black/60 backdrop-blur-2xl border-t border-white/5 transition-all ${
          isEmergencyMode ? 'bg-red-950/10 border-red-600/20' : ''
        }`}>
          <div className="max-w-4xl mx-auto flex items-end gap-3 md:gap-4">
            <div className="flex-1 bg-neutral-900 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-3 flex items-center gap-3 shadow-xl focus-within:ring-1 focus-within:ring-red-600/50 transition-all">
              <button className="p-2.5 text-neutral-600 hover:text-red-500"><Paperclip size={20} /></button>
              <textarea 
                rows={1}
                placeholder="Dispatch mission signal..." 
                className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-white placeholder-neutral-700 resize-none py-2"
              />
              <button className="hidden sm:flex p-2.5 text-neutral-600 hover:text-red-500"><Smile size={20} /></button>
              <button className="p-2.5 text-neutral-600 hover:text-red-500 animate-pulse"><Mic size={20} /></button>
            </div>
            <button className={`p-4.5 md:p-5 rounded-[1.2rem] md:rounded-[1.5rem] transition-all active-scale shadow-2xl ${
              isEmergencyMode ? 'bg-red-600 text-white' : 'bg-white text-black hover:bg-neutral-200'
            }`}>
              <Send size={24} />
            </button>
          </div>
          <div className="hidden sm:flex justify-between items-center px-4 mt-4">
            <div className="flex gap-6">
              <span className="text-[8px] font-black text-neutral-800 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-green-500" /> SECURE TUNNEL
              </span>
              <span className="text-[8px] font-black text-neutral-800 uppercase tracking-widest flex items-center gap-1.5">
                <div className="w-1 h-1 rounded-full bg-red-600" /> GENIE ACTIVE
              </span>
            </div>
            <p className="text-[8px] font-black text-neutral-900 uppercase tracking-widest">CLAP COMMUNICATIONS PROTOCOL v4.2</p>
          </div>
        </div>
      </main>

      {/* 3. INFO PANEL (Context Hub - Collapsible) */}
      <aside className={`
        ${showInfoPanel ? 'fixed inset-0 z-50 md:relative md:inset-auto md:flex' : 'hidden'} 
        w-full md:w-80 lg:w-96 flex-col border-l border-white/5 bg-neutral-900/60 backdrop-blur-3xl animate-in slide-in-from-right-10 duration-500
      `}>
        <header className="p-8 border-b border-white/5 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.3em] mb-1">Channel Logic</p>
            <h4 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Context</h4>
          </div>
          <button onClick={() => setShowInfoPanel(false)} className="p-3 bg-neutral-900 rounded-xl md:hidden"><ChevronLeft /></button>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Operational Goal</h5>
              <Sparkles size={12} className="text-red-500" />
            </div>
            <div className="p-6 bg-black/40 border border-white/5 rounded-3xl space-y-4">
              <p className="text-xs text-neutral-400 font-medium leading-relaxed italic">"Execute remaining Scene 12B coverage by 19:45 EST to preserve lighting continuity for Unit B."</p>
            </div>
          </section>

          <section className="space-y-4">
            <h5 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Personnel Status</h5>
            <div className="grid grid-cols-4 gap-3">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="relative group cursor-pointer">
                  <img src={`https://picsum.photos/seed/${i + 50}/100`} className="aspect-square rounded-xl object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all border border-white/5" />
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full" />
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4">
             <h5 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Shared Logistics</h5>
             <div className="space-y-3">
                {['CallSheet_Day12.pdf', 'SetMap_SectorB.jpg'].map(file => (
                  <div key={file} className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all cursor-pointer">
                    <Clapperboard size={14} className="text-neutral-600 group-hover:text-red-500" />
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{file}</span>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <footer className="p-8 border-t border-white/5">
          <button className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all text-xs tracking-widest uppercase">
            GENERATE FULL REPORT <ChevronRight size={16} />
          </button>
        </footer>
      </aside>
    </div>
  );
};

export default Communications;
