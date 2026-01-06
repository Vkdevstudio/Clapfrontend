
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
  Sparkles,
  UserPlus,
  Shield
} from 'lucide-react';
import { MOCK_MESSAGES } from '../constants';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { UserRole, User } from '../types';
import CreateChannelModal from '../components/CreateChannelModal';
import InviteCrewModal from '../components/InviteCrewModal';

const { useNavigate } = ReactRouterDOM;

interface CommunicationsProps {
  role?: UserRole;
  user?: User; // Pass current user to handle department auto-landing
}

const Communications: React.FC<CommunicationsProps> = ({ role = 'production', user }) => {
  const navigate = useNavigate();
  const [activeChannel, setActiveChannel] = useState('#Set-Alerts');
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list');
  const [showInfoPanel, setShowInfoPanel] = useState(false); 
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  // Logic: Requirement "Department-Locked Comms"
  // Simulate registry-based channel population
  const [channels] = useState([
    { id: '1', name: '#General', unread: 0, type: 'public', desc: 'Global production chat' },
    { id: '2', name: '#Set-Alerts', unread: 12, type: 'emergency', desc: 'Critical production triggers' },
    { id: '3', name: '#Direction', unread: 2, type: 'dept', desc: 'Director & AD comms', dept: 'Direction' },
    { id: '4', name: '#Art-Dept', unread: 0, type: 'dept', desc: 'Prop & Set logistics', dept: 'Art' },
    { id: '5', name: '#Camera-Crew', unread: 5, type: 'dept', desc: 'DOP & AC unit', dept: 'Camera' },
  ]);

  // Requirement: Logic to automatically populate channels based on the Project Registry
  const userDept = user?.assignedDepts?.[0] || 'Direction';
  const myUnitChannel = channels.find(c => c.dept === userDept);
  
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsEmergencyMode(activeChannel === '#Set-Alerts');
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [activeChannel]);

  const handleChannelSelect = (name: string) => {
    setActiveChannel(name);
    setMobileView('chat');
  };

  const handleCreateChannel = (newChannel: any) => {
    // In a real app, this would persist
    setActiveChannel(newChannel.name);
    setMobileView('chat');
  };

  return (
    <div className={`h-[calc(100vh-140px)] md:h-[calc(100vh-120px)] flex bg-neutral-950 rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 ${
      isEmergencyMode ? 'ring-1 ring-red-600/30' : ''
    }`}>
      
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
            <div className="flex gap-2">
              <button 
                onClick={() => setIsInviteModalOpen(true)}
                className="p-2.5 bg-red-600/10 border border-red-600/20 rounded-xl text-red-500 hover:bg-red-600 hover:text-white transition-all active-scale group"
              >
                <UserPlus size={18} />
              </button>
            </div>
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
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-hide">
          {/* Priority: Your Assigned Department */}
          <div className="space-y-2">
             <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] ml-2">My Registry Hub</p>
             {myUnitChannel && (
                <button 
                  onClick={() => handleChannelSelect(myUnitChannel.name)}
                  className={`w-full flex items-center gap-4 p-5 rounded-[2rem] transition-all active-scale border shadow-xl ${
                    activeChannel === myUnitChannel.name ? 'bg-white/5 border-red-600 text-white' : 'bg-neutral-900/40 border-white/5 text-neutral-400 hover:border-red-600/30'
                  }`}
                >
                  <div className={`p-3 rounded-xl ${activeChannel === myUnitChannel.name ? 'bg-red-600 text-white' : 'bg-neutral-800'}`}>
                    <Zap size={18} />
                  </div>
                  <div className="flex-1 text-left">
                    <span className="font-black text-[11px] uppercase tracking-widest leading-none block">{myUnitChannel.name.replace('#', '')}</span>
                    <span className="text-[7px] font-bold text-neutral-600 uppercase tracking-widest mt-1 block">Assigned Unit Logic</span>
                  </div>
                </button>
             )}
          </div>

          <div className="space-y-2 pt-2">
            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-[0.4em] ml-2">Broadcast Nodes</p>
            {channels.filter(ch => ch.id !== myUnitChannel?.id).map(ch => (
              <button 
                key={ch.id}
                onClick={() => handleChannelSelect(ch.name)}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all active-scale group ${
                  activeChannel === ch.name 
                    ? ch.type === 'emergency' ? 'bg-red-600 text-white shadow-xl shadow-red-600/20' : 'bg-white/5 text-white border border-white/10'
                    : 'text-neutral-500 hover:bg-white/5'
                }`}
              >
                <div className={`p-3 rounded-xl shrink-0 ${
                  activeChannel === ch.name ? 'bg-white/10' : 'bg-neutral-900 border border-white/5'
                }`}>
                  {ch.type === 'emergency' ? <ShieldAlert size={18} /> : <Hash size={18} />}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-[11px] uppercase tracking-widest leading-none truncate pr-2">{ch.name.replace('#', '')}</span>
                    <span className="text-[8px] font-bold opacity-40 uppercase tracking-tighter shrink-0">12:45 PM</span>
                  </div>
                </div>
                {ch.unread > 0 && activeChannel !== ch.name && (
                  <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[8px] font-black text-white animate-pulse shrink-0">
                    {ch.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </nav>

        <div className="p-6 border-t border-white/5">
          <div className="flex items-center gap-4 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
            <Radio size={14} className="text-red-500 animate-pulse" />
            <span className="text-[9px] font-black uppercase tracking-widest text-neutral-400">Unit Broadcast Live</span>
          </div>
        </div>
      </aside>

      <main className={`
        ${mobileView === 'chat' ? 'flex' : 'hidden'} 
        md:flex flex-1 flex-col min-w-0 bg-neutral-950 relative overflow-hidden transition-all duration-500
      `}>
        <header className={`px-6 py-4 md:py-6 border-b border-white/5 flex items-center justify-between bg-black/40 backdrop-blur-3xl sticky top-0 z-30 ${
          isEmergencyMode ? 'bg-red-950/20 shadow-[inset_0_-20px_40px_rgba(220,38,38,0.05)]' : ''
        }`}>
          <div className="flex items-center gap-4 min-w-0">
            <button 
              onClick={() => setMobileView('list')}
              className="md:hidden p-3 bg-neutral-900 rounded-xl text-white shrink-0"
            >
              <ChevronLeft size={20} />
            </button>
            <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl transition-all shrink-0 ${
              isEmergencyMode ? 'bg-red-600 text-white animate-pulse shadow-lg' : 'bg-neutral-900 text-white border border-white/5'
            }`}>
              {isEmergencyMode ? <ShieldAlert size={20} /> : <MessageSquare size={20} />}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest text-white uppercase leading-none truncate">{activeChannel.replace('#', '')}</h3>
                {isEmergencyMode && <span className="bg-red-600 px-2 py-0.5 rounded text-[7px] font-black text-white uppercase tracking-widest shrink-0">Urgent</span>}
              </div>
              <p className="text-[8px] md:text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em] mt-1.5 hidden sm:block">Operational Ledger • Region Mumbai</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            <button 
              onClick={() => setShowInfoPanel(!showInfoPanel)}
              className={`p-3.5 rounded-xl transition-all ${showInfoPanel ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-400 border border-white/5'}`}
            >
              <div className="relative">
                <Info size={18} />
              </div>
            </button>
          </div>
        </header>

        <div 
          ref={chatScrollRef}
          className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scrollbar-hide"
        >
          {MOCK_MESSAGES.map((msg, i) => (
            <div key={msg.id} className="flex gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="relative flex-shrink-0">
                <div className={`p-0.5 rounded-2xl md:rounded-3xl ${msg.isEmergency ? 'bg-red-600' : 'bg-white/10'}`}>
                  <img src={msg.senderAvatar} className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl object-cover" />
                </div>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-black text-[11px] uppercase tracking-widest text-white">{msg.senderName}</span>
                  <span className="text-[8px] font-bold text-neutral-600 uppercase">{msg.timestamp}</span>
                </div>
                <div className={`p-5 rounded-2xl md:rounded-[1.5rem] text-xs md:sm leading-relaxed border ${
                  msg.isEmergency ? 'bg-red-600/10 border-red-600/20 text-red-100' : 'bg-white/5 border-white/5 text-neutral-300'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
        </div>

        <footer className="p-6 md:p-8 bg-black/40 border-t border-white/5 backdrop-blur-3xl">
          <div className="flex items-center gap-2 md:gap-4 bg-neutral-800/50 border border-white/5 p-2 rounded-2xl md:rounded-3xl focus-within:border-red-600/40 transition-all shadow-xl">
            <button className="p-2 md:p-3 text-neutral-500 hover:text-white transition-all"><Paperclip size={20}/></button>
            <input 
              type="text" 
              placeholder="Broadcast to unit..." 
              className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm font-medium text-white placeholder-neutral-700 px-1"
            />
            <button className="p-3 md:p-4 bg-red-600 text-white rounded-xl md:rounded-2xl shadow-lg shadow-red-600/20 active-scale shrink-0"><Send size={18}/></button>
          </div>
        </footer>
      </main>

      {showInfoPanel && (
        <aside className="hidden lg:flex flex-col w-80 border-l border-white/5 bg-neutral-950/50 backdrop-blur-3xl animate-in slide-in-from-right-4 duration-500">
           <header className="p-8 border-b border-white/5">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500">Unit Intel</h3>
           </header>
           <div className="p-8 space-y-10 overflow-y-auto scrollbar-hide">
              <section className="space-y-4">
                 <div className="w-20 h-20 bg-neutral-900 rounded-[2rem] border border-white/5 flex items-center justify-center text-red-500 shadow-xl">
                    <Radio size={32} />
                 </div>
                 <div>
                    <h4 className="text-xl font-cinematic font-bold text-white tracking-widest uppercase truncate">{activeChannel.replace('#', '')}</h4>
                    <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mt-1">Operational Sync: Active</p>
                 </div>
              </section>
              
              <section className="space-y-4">
                 <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Active Personnel</p>
                 <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-xl border-2 border-neutral-950 overflow-hidden shadow-lg">
                        <img src={`https://picsum.photos/seed/${i+20}/50`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                 </div>
              </section>

              <section className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-3">
                 <div className="flex items-center gap-2 text-red-500">
                    <Sparkles size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Registry Logic</span>
                 </div>
                 <p className="text-[10px] text-neutral-400 font-medium leading-relaxed italic">
                   Requirement 4.3: Real-time broadcast nodes are project-isolated. Emergency triggers automatically prioritize bandwidth for the #Set-Alerts channel.
                 </p>
              </section>
           </div>
        </aside>
      )}
      
      {isCreateModalOpen && (
        <CreateChannelModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          onCreate={handleCreateChannel}
          role={role}
        />
      )}
      
      {isInviteModalOpen && (
        <InviteCrewModal 
          isOpen={isInviteModalOpen} 
          onClose={() => setIsInviteModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default Communications;
