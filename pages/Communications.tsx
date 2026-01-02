
import React, { useState } from 'react';
import { Search, Hash, MessageSquare, Users, Settings, MoreVertical, Send, Smile, Paperclip } from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';

const Communications: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState('#Production');
  
  const channels = [
    { name: '#General', unread: 0 },
    { name: '#Production', unread: 12 },
    { name: '#Cast-Leads', unread: 2 },
    { name: '#Art-Dept', unread: 0 },
    { name: '#Camera-Crew', unread: 5 },
  ];

  return (
    <div className="h-[calc(100vh-140px)] flex bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in duration-500">
      {/* Channels Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-white/5 bg-black/20">
        <div className="p-6 border-b border-white/5">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Comms..." 
              className="w-full bg-neutral-800 border-none rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:ring-1 focus:ring-red-600"
            />
          </div>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h4 className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Channels</h4>
            <div className="space-y-1">
              {channels.map(ch => (
                <button 
                  key={ch.name}
                  onClick={() => setActiveChannel(ch.name)}
                  className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    activeChannel === ch.name ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Hash size={16} className={activeChannel === ch.name ? 'text-white' : 'text-neutral-600'} />
                    <span>{ch.name.replace('#', '')}</span>
                  </div>
                  {ch.unread > 0 && activeChannel !== ch.name && (
                    <span className="bg-red-600 text-[10px] px-1.5 py-0.5 rounded-full text-white">{ch.unread}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="px-4 text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em] mb-4">Direct Messages</h4>
            <div className="space-y-1">
              {[
                { name: 'Marcus Thorne', status: 'online' },
                { name: 'Sarah Jenkins', status: 'away' },
                { name: 'Vinod Star', status: 'online' }
              ].map(user => (
                <button key={user.name} className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/5 transition-all">
                  <div className="relative">
                    <div className="w-6 h-6 rounded-lg bg-neutral-800 border border-white/10 overflow-hidden">
                       <img src={`https://picsum.photos/seed/${user.name}/100`} alt={user.name} />
                    </div>
                    <div className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-neutral-900 ${user.status === 'online' ? 'bg-green-500' : 'bg-neutral-600'}`} />
                  </div>
                  <span>{user.name}</span>
                </button>
              ))}
            </div>
          </div>
        </nav>

        <div className="p-6 border-t border-white/5 bg-black/20">
          <button className="w-full flex items-center justify-between text-neutral-500 hover:text-white transition-colors">
            <div className="flex items-center gap-2">
              <Settings size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Settings</span>
            </div>
            <MoreVertical size={16} />
          </button>
        </div>
      </aside>

      {/* Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-black/40">
        <header className="px-8 py-5 border-b border-white/5 flex items-center justify-between bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl text-red-500">
               <Hash size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-cinematic font-bold tracking-wide text-white">{activeChannel.replace('#', '')}</h3>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Official production coordination channel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-neutral-800 rounded-xl hover:text-white transition-colors"><Users size={20} /></button>
            <button className="p-2.5 bg-neutral-800 rounded-xl hover:text-white transition-colors"><Settings size={20} /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 space-y-10">
          {MOCK_MESSAGES.map((msg, i) => (
            <div key={msg.id} className={`flex gap-6 group ${i % 3 === 0 ? 'mt-4' : ''}`}>
              <div className="relative flex-shrink-0">
                <img src={msg.senderAvatar || 'https://picsum.photos/seed/default/100'} className="w-12 h-12 rounded-2xl bg-neutral-800 border border-white/10 object-cover shadow-xl" alt={msg.senderName} />
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-green-500 border-4 border-neutral-900 rounded-full" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-baseline gap-3">
                  <span className="font-bold text-white text-lg">{msg.senderName}</span>
                  <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{msg.timestamp}</span>
                </div>
                <p className="text-neutral-300 leading-relaxed text-sm bg-neutral-800/20 p-4 rounded-[1.5rem] border border-white/5 group-hover:border-neutral-700 transition-all max-w-2xl">
                  {msg.content}
                </p>
                {i === 1 && (
                  <div className="flex gap-2 mt-3">
                    <div className="w-24 h-24 bg-neutral-800 rounded-xl border border-white/5 overflow-hidden group/img cursor-pointer">
                       <img src="https://picsum.photos/seed/set1/200" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all" alt="Set asset" />
                    </div>
                    <div className="w-24 h-24 bg-neutral-800 rounded-xl border border-white/5 overflow-hidden group/img cursor-pointer">
                       <img src="https://picsum.photos/seed/set2/200" className="w-full h-full object-cover grayscale group-hover/img:grayscale-0 transition-all" alt="Set asset" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 border-t border-white/5 bg-black/40">
          <div className="max-w-4xl mx-auto flex items-end gap-4">
            <div className="flex-1 bg-neutral-800/80 border border-white/5 rounded-[2rem] p-4 flex items-center gap-4 shadow-2xl focus-within:border-red-600/50 transition-all">
              <button className="text-neutral-500 hover:text-red-500 transition-colors"><Smile size={24} /></button>
              <button className="text-neutral-500 hover:text-red-500 transition-colors"><Paperclip size={24} /></button>
              <textarea 
                rows={1}
                placeholder={`Message ${activeChannel}...`} 
                className="flex-1 bg-transparent border-none outline-none text-sm text-white placeholder-neutral-600 resize-none py-1"
              />
            </div>
            <button className="p-5 bg-red-600 rounded-full text-white shadow-2xl shadow-red-600/20 hover:bg-red-700 transition-all transform active:scale-90">
              <Send size={24} />
            </button>
          </div>
          <p className="text-center text-[10px] text-neutral-700 mt-4 font-bold uppercase tracking-[0.3em]">End-to-End Encrypted Production Comms</p>
        </div>
      </main>
    </div>
  );
};

export default Communications;
