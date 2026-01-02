
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User as UserIcon, Sparkles, Settings, Eye, Users as UsersIcon } from 'lucide-react';
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
  const location = useLocation();
  
  const currentDisplayRole = activeMirrorRole || role;
  
  const navLinks = 
    currentDisplayRole === 'talent' ? NAV_LINKS.talent : 
    currentDisplayRole === 'production' ? NAV_LINKS.production : 
    currentDisplayRole === 'vendor' ? NAV_LINKS.vendor : [];

  if (role === 'guest') return <>{children}</>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row selection:bg-red-600 selection:text-white">
      {/* Role Mirror Indicator */}
      {activeMirrorRole && (
        <div className="fixed top-0 left-0 right-0 h-1 bg-red-600 z-[100] animate-pulse shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
      )}

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
          {/* Role Mirror Toggle for Production */}
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
                {isMirrorMenuOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-neutral-900 border border-white/10 rounded-2xl p-2 shadow-2xl z-50 animate-in slide-in-from-bottom-2">
                     <button onClick={() => { onMirrorRoleChange('production' as any); setIsMirrorMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:bg-white/5 hover:text-white">Admin (Own)</button>
                     <button onClick={() => { onMirrorRoleChange('talent'); setIsMirrorMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:bg-white/5 hover:text-white">Talent View</button>
                     <button onClick={() => { onMirrorRoleChange('vendor'); setIsMirrorMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:bg-white/5 hover:text-white">Vendor View</button>
                  </div>
                )}
             </div>
          )}

          <Link to="/settings" className="flex items-center gap-4 px-4 py-4 text-neutral-500 hover:text-white transition-all rounded-2xl">
            <Settings size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Settings</span>
          </Link>
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
            <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-[0.3em]">United Workflow v1.2</p>
            {activeMirrorRole && (
              <span className="px-2 py-0.5 bg-red-600/20 text-red-500 rounded text-[9px] font-black uppercase tracking-widest border border-red-600/30">
                Mirror: {activeMirrorRole}
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={onToggleContext}
              className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-red-500 hover:bg-neutral-800 transition-all shadow-xl group"
              title="Toggle AI Context"
            >
              <Sparkles size={20} className="group-hover:scale-110 transition-transform" />
            </button>
            <button className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-500 hover:text-white transition-all shadow-xl relative">
              <Bell size={20} />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-600 rounded-full border-2 border-neutral-900"></span>
            </button>
            <Link to="/profile" className="w-11 h-11 bg-neutral-800 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white/5 shadow-2xl transition-transform hover:scale-105 active:scale-95">
              <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-12 flex-1 overflow-auto pb-28 md:pb-12 scroll-smooth">
          {children}
        </div>

        {/* Mobile Bottom Navigation */}
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
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 transition-all ${
              location.pathname === '/profile' ? 'text-red-500 scale-110' : 'text-neutral-600'
            }`}
          >
            <UserIcon size={20} />
          </Link>
        </nav>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-80 bg-neutral-950 p-8 flex flex-col border-r border-white/5 shadow-2xl animate-in slide-in-from-left duration-500">
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-3">
                <div className="bg-red-600 p-2 rounded-xl">
                  <ClapperIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-cinematic font-bold">CLAP</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-neutral-900 rounded-xl text-neutral-500"><X /></button>
            </div>
            <nav className="space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-5 text-lg font-bold p-4 rounded-2xl transition-all ${
                    location.pathname === link.path ? 'text-white bg-red-600 shadow-xl shadow-red-600/20' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  <div className={location.pathname === link.path ? 'text-white' : 'text-neutral-700'}>{link.icon}</div>
                  <span className="text-xs uppercase tracking-[0.2em]">{link.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}
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
    <path d="m8 6.42 3-3" />
    <path d="m13 6.42 3-3" />
  </svg>
);

export default Layout;
