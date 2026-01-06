
import React, { useState, useEffect } from 'react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { 
  Menu, X, LogOut, Sparkles, Layers, ChevronDown, Bell
} from 'lucide-react';
import { UserRole, Unit } from '../types';
import { NAV_LINKS, MOCK_PROJECTS } from '../constants';
import NotificationCenter from './NotificationCenter';

const { Link, useLocation, useNavigate } = ReactRouterDOM;

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
  onToggleContext: () => void;
  activeMirrorRole?: UserRole;
  onMirrorRoleChange?: (role: UserRole) => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, role, onLogout, onToggleContext, activeMirrorRole 
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<Unit>(MOCK_PROJECTS[0].units[0]);
  const location = useLocation();
  const navigate = useNavigate();
  
  const currentDisplayRole = activeMirrorRole || role;
  const allNavLinks = NAV_LINKS[currentDisplayRole as keyof typeof NAV_LINKS] || [];

  const isLinkActive = (path: string) => {
    if (path === '/dashboard') return location.pathname === '/dashboard';
    return location.pathname.startsWith(path);
  };

  useEffect(() => {
    document.body.style.overflow = (isMobileMenuOpen || isNotificationsOpen) ? 'hidden' : 'unset';
  }, [isMobileMenuOpen, isNotificationsOpen]);

  if (role === 'guest') return <>{children}</>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      
      {/* 1. SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-950 border-r border-white/5 p-6 sticky top-0 h-screen z-[60]">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-red-600 p-2 rounded-xl shadow-2xl">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl font-cinematic font-bold tracking-wider">CLAP</span>
        </div>

        <nav className="flex-1 space-y-2">
          {allNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                isLinkActive(link.path)
                  ? 'bg-red-600 text-white shadow-2xl shadow-red-600/20 font-bold scale-[1.02]' 
                  : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.icon}
              <span className="text-[10px] uppercase font-bold tracking-[0.2em]">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button 
            onClick={onLogout}
            className="flex items-center gap-4 px-4 py-4 text-neutral-500 hover:text-red-500 transition-all rounded-2xl w-full text-left"
          >
            <LogOut size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.2em]">Logout</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN HUB */}
      <main className="flex-1 flex flex-col min-h-0 relative bg-neutral-950">
        <header className="flex items-center justify-between px-6 md:px-8 py-5 bg-neutral-950/40 backdrop-blur-3xl border-b border-white/5 sticky top-0 z-[50]">
          <div className="flex items-center gap-6">
             <button 
               onClick={() => setIsMobileMenuOpen(true)} 
               className="md:hidden p-3 bg-neutral-900 border border-white/5 rounded-xl"
             >
               <Menu className="text-neutral-400" size={20} />
             </button>
             
             {/* Project & Unit Switcher Context */}
             <div className="hidden md:flex items-center gap-4">
               <div className="space-y-0.5">
                  <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest leading-none">Active Project</p>
                  <p className="text-sm font-cinematic font-bold text-white uppercase tracking-widest leading-none truncate max-w-[150px]">
                    {MOCK_PROJECTS[0].title}
                  </p>
               </div>
               <div className="h-8 w-px bg-white/5 mx-2" />
               <div className="space-y-0.5 group relative">
                  <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest leading-none">Working Unit</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-red-500 uppercase cursor-pointer hover:text-red-400 transition-colors">
                    {currentUnit.name} <ChevronDown size={14} />
                    <select 
                      value={currentUnit.id}
                      onChange={(e) => setCurrentUnit(MOCK_PROJECTS[0].units.find(u => u.id === e.target.value)!)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    >
                      {MOCK_PROJECTS[0].units.map(unit => (
                        <option key={unit.id} value={unit.id} className="bg-neutral-900 text-white">{unit.name}</option>
                      ))}
                    </select>
                  </div>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsNotificationsOpen(true)}
              className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-400 hover:text-red-500 transition-all shadow-xl relative"
            >
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_5px_red]" />
            </button>
            <button 
              onClick={onToggleContext}
              className="p-3 bg-neutral-900 border border-white/5 rounded-2xl text-red-500 hover:bg-neutral-800 transition-all shadow-xl"
            >
              <Sparkles size={20} />
            </button>
            <Link to="/profile" className="w-10 h-10 bg-neutral-800 rounded-xl overflow-hidden border-2 border-white/5 shadow-2xl">
              <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        <div className="p-4 md:p-12 flex-1 overflow-x-hidden pb-32 md:pb-12 scroll-smooth">
          {children}
        </div>
      </main>

      {/* 3. NOTIFICATION CENTER SLIDE-OVER */}
      <NotificationCenter 
        isOpen={isNotificationsOpen} 
        onClose={() => setIsNotificationsOpen(false)} 
      />

      {/* 4. MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[200] md:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 left-0 bottom-0 w-[80%] bg-zinc-950 border-r border-white/10 flex flex-col p-8 animate-in slide-in-from-left duration-300">
            <div className="flex justify-between items-center mb-12">
               <span className="text-3xl font-cinematic font-bold">CLAP</span>
               <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
               {allNavLinks.map(link => (
                 <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 text-xl font-cinematic uppercase tracking-widest text-neutral-400 hover:text-white"
                 >
                   {link.icon} {link.label}
                 </Link>
               ))}
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;
