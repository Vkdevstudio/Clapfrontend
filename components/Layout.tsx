
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User as UserIcon, Sparkles, Settings, Eye, Activity, Keyboard } from 'lucide-react';
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
  const [isMirrorMenuOpen, setIsMirrorMenuOpen] = useState(false);
  const [setPulse, setSetPulse] = useState<'quiet' | 'rolling' | 'wrap'>('quiet');
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentDisplayRole = activeMirrorRole || role;
  
  const navLinks = 
    currentDisplayRole === 'talent' ? NAV_LINKS.talent : 
    currentDisplayRole === 'production' ? NAV_LINKS.production : 
    currentDisplayRole === 'vendor' ? NAV_LINKS.vendor : [];

  // Keyboard Shortcuts for Desktop Power Users
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

  if (role === 'guest') return <>{children}</>;

  return (
    <div className={`min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row selection:bg-red-600 selection:text-white transition-all duration-1000 ${setPulse === 'rolling' ? 'grayscale-[0.2]' : ''}`}>
      
      {/* Set Pulse Bar (Native-First Status) */}
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
          {navLinks.map((link) => (
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
          <div className="px-4 py-3 bg-white/5 rounded-2xl flex items-center gap-3 text-neutral-600 mb-4">
             <Keyboard size={16} />
             <span className="text-[8px] font-bold uppercase tracking-widest">Type 'S' for Script</span>
          </div>

          {role === 'production' && onMirrorRoleChange && (
             <div className="relative mb-2">
                <button 
                  onClick={() => setIsMirrorMenuOpen(!isMirrorMenuOpen)}
                  className={`flex items-center justify-between w-full px-4 py-4 rounded-2xl transition-all border ${
                    activeMirrorRole ? 'bg-red-600/10 border-red-600/30 text-red-500' : 'bg-white/5 border-white/5 text-neutral-500 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <Eye size={20} />
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{activeMirrorRole ? 'Mirror Mode' : 'Role Mirror'}</span>
                  </div>
                </button>
             </div>
          )}

          <button 
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-4 text-neutral-500 hover:text-red-500 transition-all rounded-2xl w-full text-left"
          >
            <LogOut size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 relative bg-neutral-950">
        <header className="flex items-center justify-between px-8 py-5 bg-neutral-950/40 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-[50]">
          <div className="flex items-center gap-4 md:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 bg-neutral-900 rounded-xl">
               <Menu className="text-neutral-400" />
             </button>
             <span className="text-2xl font-cinematic font-bold">CLAP</span>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">Operational Logic v4.2</p>
            {activeMirrorRole && (
              <span className="px-2 py-0.5 bg-red-600/20 text-red-500 rounded text-[9px] font-black uppercase tracking-widest border border-red-600/30">
                Mirror: {activeMirrorRole}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl text-xs font-black uppercase tracking-widest border transition-all cursor-pointer ${
              setPulse === 'rolling' ? 'bg-red-600 border-red-500 shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500'
            }`} onClick={() => setSetPulse(p => p === 'quiet' ? 'rolling' : 'quiet')}>
              Set: {setPulse === 'rolling' ? 'Rolling' : 'Standby'}
            </div>
            <button 
              onClick={onToggleContext}
              className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-red-500 hover:bg-neutral-800 transition-all shadow-xl group"
            >
              <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <Link to="/profile" className="w-11 h-11 bg-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/5 shadow-2xl">
              <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-12 flex-1 overflow-auto pb-28 md:pb-12 scroll-smooth">
          {children}
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden fixed bottom-6 left-6 right-6 bg-neutral-900/90 backdrop-blur-2xl border border-white/10 flex justify-around items-center py-4 z-50 rounded-[2.5rem] shadow-2xl">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 transition-all ${
                location.pathname === link.path ? 'text-red-500 scale-110' : 'text-neutral-600'
              }`}
            >
              {link.icon}
            </Link>
          ))}
          <Link to="/profile" className={`flex flex-col items-center gap-1 transition-all ${location.pathname === '/profile' ? 'text-red-500 scale-110' : 'text-neutral-600'}`}>
            <UserIcon size={20} />
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
