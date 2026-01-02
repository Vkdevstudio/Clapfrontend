
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, X, LogOut, User as UserIcon } from 'lucide-react';
import { UserRole } from '../types';
import { NAV_LINKS, COLORS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  role: UserRole;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, role, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  const navLinks = 
    role === 'talent' ? NAV_LINKS.talent : 
    role === 'production' ? NAV_LINKS.production : 
    role === 'vendor' ? NAV_LINKS.vendor : [];

  if (role === 'guest') return <>{children}</>;

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-neutral-900 border-r border-neutral-800 p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-red-600 p-1.5 rounded">
            <ClapperIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-2xl font-cinematic font-bold tracking-wider">CLAP</span>
        </div>

        <nav className="flex-1 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === link.path 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
              }`}
            >
              {link.icon}
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-neutral-800 space-y-2">
          <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-white rounded-lg">
            <UserIcon size={20} />
            <span>Profile</span>
          </Link>
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:text-red-500 rounded-lg w-full text-left"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        <header className="flex items-center justify-between px-6 py-4 bg-neutral-900/50 backdrop-blur-md border-b border-neutral-800 sticky top-0 z-40">
          <div className="flex items-center gap-4 md:hidden">
             <button onClick={() => setIsMobileMenuOpen(true)}>
               <Menu className="text-neutral-400" />
             </button>
             <span className="text-xl font-cinematic font-bold">CLAP</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-lg font-semibold capitalize">{location.pathname.replace('/', '') || 'Overview'}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-neutral-400 hover:text-white relative">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <Link to="/profile" className="w-9 h-9 bg-neutral-800 rounded-full flex items-center justify-center overflow-hidden border border-neutral-700">
              <img src="https://picsum.photos/seed/user1/100" alt="Avatar" className="w-full h-full object-cover" />
            </Link>
          </div>
        </header>

        <div className="p-6 md:p-8 flex-1 overflow-auto pb-24 md:pb-8">
          {children}
        </div>

        {/* Bottom Mobile Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 flex justify-around items-center py-3 z-50">
          {navLinks.slice(0, 4).map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 ${
                location.pathname === link.path ? 'text-red-500' : 'text-neutral-500'
              }`}
            >
              {link.icon}
              <span className="text-[10px] font-medium">{link.label}</span>
            </Link>
          ))}
          <Link
            to="/profile"
            className={`flex flex-col items-center gap-1 ${
              location.pathname === '/profile' ? 'text-red-500' : 'text-neutral-500'
            }`}
          >
            <UserIcon size={20} />
            <span className="text-[10px] font-medium">Profile</span>
          </Link>
        </nav>
      </main>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <aside className="absolute top-0 left-0 bottom-0 w-3/4 max-w-xs bg-neutral-900 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <span className="text-2xl font-cinematic font-bold">CLAP</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X /></button>
            </div>
            <nav className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-4 text-lg font-medium p-2 rounded ${
                    location.pathname === link.path ? 'text-red-500 bg-red-500/10' : 'text-neutral-300'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t border-neutral-800 pt-6">
               <button 
                onClick={onLogout}
                className="flex items-center gap-4 text-lg text-neutral-400 w-full"
              >
                <LogOut size={22} />
                Logout
              </button>
            </div>
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
