
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User as UserIcon, Sparkles, Settings, Eye, Activity, Keyboard, ChevronRight, Zap, ShieldCheck } from 'lucide-react';
import { UserRole } from '../types';
import { NAV_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  onToggleContext: () => void;
  activeMirrorRole?: UserRole;
  onMirrorRoleChange?: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  role, 
  onLogout, 
  onToggleContext, 
  activeMirrorRole,
  onMirrorRoleChange 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [setPulse, setSetPulse] = useState<'quiet' | 'rolling' | 'wrap'>('quiet');
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentDisplayRole = activeMirrorRole || role;
  
  // The Full Command Set
  const allNavLinks = 
    currentDisplayRole === 'talent' ? NAV_LINKS.talent : 
    currentDisplayRole === 'production' ? NAV_LINKS.production : 
    currentDisplayRole === 'vendor' ? NAV_LINKS.vendor : [];

  // Core actions for the bottom bar (Top 4)
  const coreNavLinks = allNavLinks.slice(0, 4);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeys = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) return;
      if (e.key.toLowerCase() === 'g') navigate('/ai-genie');
      if (e.key.toLowerCase() === 's') navigate('/script');
      if (e.key.toLowerCase() === 'd') navigate('/dashboard');
      if (e.key === ' ') {
        e.preventDefault();
        setSetPulse(p => p === 'quiet' ? 'rolling' : 'quiet');
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [navigate]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  if (role === 'guest') return <>{children}</>;

  return (
    <div className={`min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row selection:bg-red-600 selection:text-white transition-all duration-1000 ${setPulse === 'rolling' ? 'grayscale-[0.2]' : ''}`}>
      
      {/* Set Pulse Bar */}
      <div className={`fixed top-0 left-0 right-0 h-10 z-[110] flex items-center justify-center transition-all duration-700 ${
        setPulse === 'rolling' ? 'bg-red-600 translate-y-0' : 'bg-neutral-900 -translate-y-full'
      }`}>
        <p className="text-[10px] font-black uppercase tracking-[0.5em] flex items-center gap-3 animate-pulse">
          <Activity size={14} /> ROLLING: QUIET ON SET
        </p>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-950 border-r border-white/5 p-6 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-red-600 p-2 rounded-xl shadow-2xl shadow-red-600/30 transform -rotate-3">
            <ClapperIcon className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-cinematic font-bold tracking-wider">CLAP</span>
        </div>

        <nav className="flex-1 space-y-2">
          {allNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                location.pathname === link.path 
                  ? 'bg-red-600 text-white shadow-2xl shadow-red-600/20 font-bold scale-[1.02]' 
                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className={location.pathname === link.path ? 'text-white' : 'text-neutral-600'}>
                {link.icon}
              </div>
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-4 text-neutral-500 hover:text-red-500 transition-all rounded-2xl w-full text-left"
          >
            <LogOut size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE MASTER DRAWER */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500" onClick={() => setIsMobileMenuOpen(false)} />
          
          <div className="absolute top-0 left-0 bottom-0 w-[85%] max-w-sm bg-zinc-950 border-r border-white/10 flex flex-col animate-in slide-in-from-left-full duration-500 overflow-hidden shadow-[0_0_100px_rgba(220,38,38,0.15)]">
            {/* Header / Identity */}
            <div className="p-8 border-b border-white/5 bg-gradient-to-br from-red-600/10 to-transparent">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                   <div className="bg-red-600 p-2 rounded-xl shadow-xl">
                     <ClapperIcon className="w-5 h-5 text-white" />
                   </div>
                   <span className="text-2xl font-cinematic font-black tracking-widest uppercase">Master Ledger</span>
                 </div>
                 <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-neutral-900 rounded-lg text-neutral-500"><X size={20} /></button>
              </div>
              <div className="flex items-center justify-between">
                 <div className="space-y-1">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Active Identity</p>
                   <p className="text-sm font-black text-white uppercase tracking-[0.2em]">{currentDisplayRole}</p>
                 </div>
                 <div className="bg-green-600/10 border border-green-500/20 px-3 py-1 rounded-full flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-[8px] font-black text-green-500 uppercase">Synced</span>
                 </div>
              </div>
            </div>

            {/* Complete Link Registry */}
            <div className="flex-1 overflow-y-auto p-6 space-y-1 custom-scrollbar">
              <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em] mb-4 ml-2">Mission Parameters</p>
              {allNavLinks.map((link, idx) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center justify-between p-5 rounded-2xl transition-all group ${
                    location.pathname === link.path 
                      ? 'bg-red-600 text-white shadow-xl shadow-red-600/30' 
                      : 'bg-white/5 text-neutral-500 hover:bg-white/10 hover:text-white'
                  }`}
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className={location.pathname === link.path ? 'text-white' : 'text-neutral-600 group-hover:text-red-500'}>
                      {link.icon}
                    </div>
                    <span className="text-lg font-cinematic font-bold tracking-[0.2em] uppercase">{link.label}</span>
                  </div>
                  {location.pathname === link.path && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </Link>
              ))}
            </div>

            {/* Utility Footer */}
            <div className="p-6 border-t border-white/5 space-y-4 bg-black/40">
              <button 
                onClick={() => { onLogout(); setIsMobileMenuOpen(false); }}
                className="w-full py-5 bg-neutral-900 border border-white/10 text-red-500 font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active-scale"
              >
                <LogOut size={18} /> Disconnect Mission
              </button>
              <p className="text-[8px] text-center font-black text-neutral-800 uppercase tracking-widest">Protocol v4.2 • Secured Encryption</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative bg-neutral-950">
        <header className="flex items-center justify-between px-6 md:px-8 py-5 bg-neutral-950/40 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-[50]">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setIsMobileMenuOpen(true)} 
               className="md:hidden p-3 bg-neutral-900 border border-white/5 rounded-xl shadow-xl active-scale group"
             >
               <Menu className="text-neutral-400 group-hover:text-red-500 transition-colors" size={20} />
             </button>
             <Link to="/" className="md:hidden flex items-center gap-2">
                <span className="text-2xl font-cinematic font-black tracking-widest text-white leading-none">CLAP</span>
             </Link>
             <div className="hidden md:flex items-center gap-4">
               <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">Operational Logic v4.2</p>
               {activeMirrorRole && (
                 <span className="px-2 py-0.5 bg-red-600/20 text-red-500 rounded text-[9px] font-black uppercase tracking-widest border border-red-600/30">
                   Mirror: {activeMirrorRole}
                 </span>
               )}
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-4">
            <div className={`hidden sm:flex p-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all cursor-pointer ${
              setPulse === 'rolling' ? 'bg-red-600 border-red-500 shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500'
            }`} onClick={() => setSetPulse(p => p === 'quiet' ? 'rolling' : 'quiet')}>
              {setPulse === 'rolling' ? 'Rolling' : 'Standby'}
            </div>
            <button 
              onClick={onToggleContext}
              className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-red-500 hover:bg-neutral-800 transition-all shadow-xl group active-scale"
            >
              <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <Link to="/profile" className="w-10 h-10 md:w-11 md:h-11 bg-neutral-800 rounded-xl md:rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/5 shadow-2xl active-scale">
              <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-12 flex-1 overflow-x-hidden pb-28 md:pb-12 scroll-smooth">
          {children}
        </div>

        {/* Persistent Mobile Bottom Navigation (Core Loop Only) */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-zinc-900/80 backdrop-blur-3xl border border-white/10 flex justify-around items-center py-4 z-50 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] ring-1 ring-white/5">
          {coreNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 transition-all active-scale relative group ${
                location.pathname === link.path ? 'text-red-500' : 'text-neutral-500'
              }`}
            >
              <div className={`transition-transform duration-300 ${location.pathname === link.path ? 'scale-125 -translate-y-1' : 'group-hover:text-white'}`}>
                {link.icon}
              </div>
              {location.pathname === link.path && (
                <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-red-600 shadow-[0_0_8px_#DC2626]" />
              )}
            </Link>
          ))}
          <Link to="/profile" className={`flex flex-col items-center gap-1 transition-all active-scale relative group ${location.pathname === '/profile' ? 'text-red-500' : 'text-neutral-500'}`}>
            <div className={`transition-transform duration-300 ${location.pathname === '/profile' ? 'scale-125 -translate-y-1' : 'group-hover:text-white'}`}>
              <UserIcon size={20} />
            </div>
            {location.pathname === '/profile' && (
              <div className="absolute -bottom-1 w-1 h-1 rounded-full bg-red-600 shadow-[0_0_8px_#DC2626]" />
            )}
          </Link>
        </nav>
      </main>
    </div>
  );
};

const ClapperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m4 11 1.71-3.42A2 2 0 0 1 7.5 6.42l4.5 0" />
    <path d="M12 6.42l4.5 0a2 2 0 0 1 1.79 1.16L20 11" />
    <path d="M4 11h16" />
    <path d="M12 22V11" />
  </svg>
);

export default Layout;
