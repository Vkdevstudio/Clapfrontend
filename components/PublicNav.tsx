
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Zap, ArrowRight, ShieldCheck } from 'lucide-react';

interface PublicNavProps {
  onStart: () => void;
}

const PublicNav: React.FC<PublicNavProps> = ({ onStart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MANIFESTO', path: '/why-clap' },
    { label: 'TALENT', path: '/solutions/talent' },
    { label: 'VENDORS', path: '/solutions/vendor' },
    { label: 'PRODUCTION', path: '/solutions/production' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
      isScrolled 
        ? 'py-4 bg-black/60 backdrop-blur-2xl border-white/10' 
        : 'py-8 bg-transparent border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="bg-red-600 p-2 rounded-xl shadow-2xl group-hover:rotate-12 transition-transform">
             <ClapperIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-3xl font-cinematic font-black tracking-widest text-white">CLAP</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path} 
              className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-red-500 ${
                location.pathname === link.path ? 'text-red-500' : 'text-neutral-400'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onStart}
            className="hidden sm:flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/30 transition-all transform hover:scale-105 active-scale"
          >
            INITIALIZE <Zap size={14} />
          </button>
          
          <button 
            className="lg:hidden p-3 bg-white/5 rounded-xl border border-white/10 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 p-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-cinematic font-bold tracking-widest uppercase ${
                  location.pathname === link.path ? 'text-red-500' : 'text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <button 
              onClick={() => { onStart(); setIsMobileMenuOpen(false); }}
              className="w-full py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl"
            >
              START PRODUCTION <ArrowRight size={16} className="inline ml-2" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const ClapperIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m4 11 1.71-3.42A2 2 0 0 1 7.5 6.42l4.5 0" />
    <path d="M12 6.42l4.5 0a2 2 0 0 1 1.79 1.16L20 11" />
    <path d="M4 11h16" />
    <path d="M12 22V11" />
  </svg>
);

export default PublicNav;
