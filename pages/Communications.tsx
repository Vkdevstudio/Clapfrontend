
import React, { useState } from 'react';
import { Search, Hash, MessageSquare, Users, Settings, MoreVertical, Send, Smile, Paperclip, AlertCircle, CheckCircle, Zap } from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';

const Communications: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('#Set-Alerts');
  
  const channels = [
    { name: '#General', unread: 0, type: 'public' },
    { name: '#Set-Alerts', unread: 12, type: 'emergency' },
    { name: '#Direction', unread: 2, type: 'dept' },
    { name: '#Art-Dept', unread: 0, type: 'dept' },
    { name: '#Camera-Crew', unread: 5, type: 'dept' },
    { name: 'scene-12b', unread: 0, type: 'context' },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in duration-500">
      {/* Channels Sidebar: Organizational Hierarchy */}
      <aside className="hidden lg:flex flex-col w-72 border-r border-white/5 bg-black/20">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-2xl font-cinematic font-bold tracking-wide mb-6">UNIT COMMS</h2>
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full bg-neutral-800 border-none rounded-xl pl-10 pr-4 py-3 text-xs text-white focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-8">
          <div>
            <h4 className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Core Production</h4>
            <div className="space-y-1">
              {channels.filter(c => c.type !== 'context').map(ch => (
                <button 
                  key={ch.name}
                  onClick={() => setActiveChannel(ch.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeChannel === ch.name 
                      ? ch.type === 'emergency' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-neutral-800 text-white'
                      : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {ch.type === 'emergency' ? <AlertCircle size={16} /> : <Hash size={16} />}
                    <span className="uppercase tracking-widest text-[11px]">{ch.name.replace('#', '')}</span>
                  </div>
                  {ch.unread > 0 && activeChannel !== ch.name && (
                    <span className="bg-red-600 text-[9px] px-2 py-0.5 rounded-full text-white font-black">{ch.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Contextual (By Scene)</h4>
            <div className="space-y-1">
              {channels.filter(c => c.type === 'context').map(ch => (
                <button 
                  key={ch.name}
                  onClick={() => setActiveChannel(ch.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeChannel === ch.name ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Clapperboard size={14} />
                    <span className="uppercase tracking-widest text-[11px]">{ch.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-8 border-t border-white/5 bg-black/20">
          <div className="flex items-center justify-between text-neutral-500 hover:text-white transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/5 overflow-hidden">
                 <img src="https://picsum.photos/seed/user1/100" className="w-full h-full object-cover" />
               </div>
               <div>
                  <p className="text-[11px] font-bold text-white uppercase tracking-widest">MY OFFICE</p>
                  <p className="text-[9px] text-neutral-600 font-bold uppercase">Settings & Access</p>
               </div>
            </div>
            <Settings size={18} className="group-hover:rotate-45 transition-transform" />
          </div>
        </div>
      </aside>

      {/* Workflow Discussion Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-black/40 relative">
        <header className="px-10 py-6 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className={`p-4 rounded-2xl text-white ${activeChannel === '#Set-Alerts' ? 'bg-red-600' : 'bg-neutral-800'}`}>
               {activeChannel === '#Set-Alerts' ? <ShieldAlert size={28} /> : <MessageSquare size={28} />}
            </div>
            <div>
              <h3 className="text-3xl font-cinematic font-bold tracking-wide text-white uppercase">{activeChannel.replace('#', '')}</h3>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Operational logs and decision making hub</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-neutral-800 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:text-white transition-all border border-white/5">
              <Users size={16} /> 42 CREW ACTIVE
            </button>
          </div>
        </header>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          {MOCK_MESSAGES.map((msg, i) => (
            <div key={msg.id} className={`flex gap-8 group animate-in fade-in slide-in-from-bottom-2 duration-300 delay-${i * 100}`}>
              <div className="relative flex-shrink-0">
                <img src={msg.senderAvatar || 'https://picsum.photos/seed/default/100'} className="w-14 h-14 rounded-3xl bg-neutral-800 border border-white/10 object-cover shadow-2xl" alt={msg.senderName} />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 border-4 border-neutral-900 rounded-full ${msg.isEmergency ? 'bg-red-600' : 'bg-green-500'}`} />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-4">
                  <span className={`font-black text-xl tracking-wide ${msg.isEmergency ? 'text-red-500' : 'text-white'}`}>{msg.senderName}</span>
                  <span className="text-[10px] text-neutral-600 uppercase font-black tracking-widest">{msg.timestamp}</span>
                </div>
                <div className={`p-6 rounded-[2rem] border transition-all max-w-3xl text-base leading-relaxed ${
                  msg.isEmergency ? 'bg-red-600/10 border-red-600/30 text-red-100 font-bold' : 'bg-neutral-800/40 border-white/5 text-neutral-300'
                }`}>
                  {msg.content}
                </div>
                {i === 1 && (
                  <div className="flex items-center gap-3 mt-4">
                    <div className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-full text-[10px] font-bold text-neutral-500 flex items-center gap-2">
                       <Zap size={12} className="text-red-500" /> DECISION LOGGED
                    </div>
                    <div className="px-4 py-2 bg-neutral-900 border border-white/5 rounded-full text-[10px] font-bold text-neutral-500 flex items-center gap-2">
                       <CheckCircle size={12} className="text-green-500" /> PRODUCER ACKNOWLEDGED
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="p-10 border-t border-white/5 bg-black/40">
          <div className="max-w-5xl mx-auto flex items-end gap-6">
            <div className="flex-1 bg-neutral-800/80 border border-white/5 rounded-[2.5rem] p-5 flex items-center gap-6 shadow-2xl focus-within:border-red-600/50 transition-all backdrop-blur-xl">
              <button className="text-neutral-500 hover:text-red-500 transition-colors"><Paperclip size={26} /></button>
              <textarea 
                rows={1}
                placeholder={`Post update to ${activeChannel}...`} 
                className="flex-1 bg-transparent border-none outline-none text-base font-medium text-white placeholder-neutral-600 resize-none py-1"
              />
              <button className="text-neutral-500 hover:text-red-500 transition-colors"><Smile size={26} /></button>
            </div>
            <button className="p-6 bg-red-600 rounded-full text-white shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all transform active:scale-90 flex items-center justify-center">
              <Send size={28} />
            </button>
          </div>
          <div className="flex justify-center gap-8 mt-6">
             <span className="text-[10px] text-neutral-700 font-bold uppercase tracking-[0.3em]">End-to-End Encrypted</span>
             <span className="text-[10px] text-neutral-700 font-bold uppercase tracking-[0.3em]">Decision Log Enabled</span>
          </div>
        </div>
      </main>
    </div>
  );
};

const Clapperboard = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 11V19A2 2 0 0 0 6 21H18A2 2 0 0 0 20 19V11"/><path d="M4 11H20"/><path d="M4 11V5A2 2 0 0 1 6 3H18A2 2 0 0 1 20 5V11"/><path d="M12 21V11"/><path d="M8 3L11 7"/><path d="M13 3L16 7"/></svg>;
const ShieldAlert = ({ size }: { size: number }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;

export default Communications;
