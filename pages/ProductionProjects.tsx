
import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import { 
  Plus, 
  LayoutGrid, 
  List, 
  MoreVertical, 
  Calendar, 
  MapPin, 
  Clapperboard, 
  ChevronRight, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Globe,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductionProjects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 md:space-y-16 animate-in fade-in slide-in-from-bottom-6 duration-1000 pb-24 max-w-7xl mx-auto px-0 md:px-4">
      
      {/* Cinematic Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative px-4 md:px-0">
        <div className="absolute -left-12 -top-12 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
        <div className="space-y-4 relative z-10">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-black uppercase tracking-[0.4em]">
              Slate Registry v4.2
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.9]">
            Production <br />Slate
          </h1>
          <p className="text-neutral-500 text-sm md:text-xl font-medium max-w-xl leading-relaxed">
            Command your cinematic portfolio. Track development, active shoots, and global disbursements in real-time.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 relative z-10 w-full md:w-auto">
          <div className="flex bg-neutral-900/50 border border-white/5 rounded-2xl p-1 backdrop-blur-xl">
            <button className="p-3 bg-red-600 text-white rounded-xl shadow-lg transition-all"><LayoutGrid size={18} /></button>
            <button className="p-3 text-neutral-600 hover:text-white transition-all"><List size={18} /></button>
          </div>
          <button 
            onClick={() => navigate('/projects/new')}
            className="flex items-center justify-center gap-3 px-8 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-3xl transition-all active-scale"
          >
            <Plus size={18} /> INITIALIZE SLATE
          </button>
        </div>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-10 px-4 md:px-0">
        {MOCK_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            onClick={() => navigate('/workspace')}
            className="group relative bg-neutral-900 border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden hover:border-red-600/40 transition-all cursor-pointer flex flex-col shadow-2xl active-scale"
          >
            {/* Visual Metadata Overlay */}
            <div className="aspect-[16/10] sm:aspect-video md:aspect-[16/10] relative overflow-hidden bg-black">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 right-4 md:top-6 md:left-6 md:right-6 flex justify-between items-start">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 text-white shadow-xl">
                  {project.status}
                </span>
                <button className="p-2 md:p-3 bg-black/40 backdrop-blur-md rounded-xl text-white border border-white/5 hover:bg-red-600 transition-colors">
                  <MoreVertical size={14} className="md:w-4 md:h-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-6 md:bottom-6 md:left-8">
                <p className="text-[8px] md:text-[9px] font-black text-red-500 uppercase tracking-[0.3em] mb-0.5">Operational Type</p>
                <p className="text-xl md:text-2xl font-cinematic font-bold text-white tracking-widest uppercase">{project.type}</p>
              </div>
            </div>
            
            <div className="p-6 md:p-10 space-y-6 md:space-y-8 flex-1 flex flex-col relative">
              <div className="space-y-2 md:space-y-3">
                <h3 className="text-2xl md:text-4xl font-cinematic font-black text-white tracking-wide group-hover:text-red-500 transition-colors uppercase leading-none">
                  {project.title}
                </h3>
                <p className="text-neutral-500 text-xs md:text-sm font-medium line-clamp-2 leading-relaxed opacity-80">
                  {project.description}
                </p>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex justify-between items-end">
                  <div className="space-y-0.5 md:space-y-1">
                    <p className="text-[8px] md:text-[9px] font-black text-neutral-600 uppercase tracking-widest">Shoot Day</p>
                    <p className="text-lg md:text-xl font-cinematic font-bold text-white tracking-widest">{project.currentShootDay} / {project.totalShootDays}</p>
                  </div>
                  <div className="text-right space-y-0.5 md:space-y-1">
                    <p className="text-[8px] md:text-[9px] font-black text-neutral-600 uppercase tracking-widest">Efficiency</p>
                    <p className="text-lg md:text-xl font-cinematic font-bold text-green-500 tracking-widest">{project.progress}%</p>
                  </div>
                </div>
                <div className="h-1 md:h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 shadow-[0_0_10px_rgba(220,38,38,0.5)] transition-all duration-1000" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="pt-6 md:pt-8 border-t border-white/5 mt-auto flex items-center justify-between">
                <div className="flex items-center gap-4 md:gap-6 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} className="text-red-500 md:w-3.5 md:h-3.5" /> {project.startDate}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Globe size={12} className="text-blue-500 md:w-3.5 md:h-3.5" /> {project.location.split(',')[0]}
                  </span>
                </div>
                <button className="w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-neutral-800 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-all">
                  <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Cinematic "Add New" Card */}
        <div 
          onClick={() => navigate('/projects/new')}
          className="group border-2 border-dashed border-white/5 rounded-[2rem] md:rounded-[3rem] flex flex-col items-center justify-center p-8 md:p-12 text-center space-y-6 md:space-y-8 hover:border-red-600/30 hover:bg-red-600/5 transition-all cursor-pointer active-scale min-h-[350px] md:min-h-[500px]"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-red-600 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity" />
            <div className="w-16 h-16 md:w-24 md:h-24 bg-neutral-900 rounded-2xl md:rounded-[2rem] flex items-center justify-center text-neutral-700 group-hover:text-red-500 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 border border-white/5">
              <Clapperboard size={32} className="md:w-10 md:h-10" />
            </div>
            <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-red-600 text-white p-1.5 md:p-2 rounded-lg md:rounded-xl shadow-xl">
              <Plus size={16} className="md:w-5 md:h-5" />
            </div>
          </div>
          <div className="space-y-1 md:space-y-2">
            <h4 className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-tight">Sync New Vision</h4>
            <p className="text-[10px] md:text-sm text-neutral-600 font-bold uppercase tracking-widest">Initialize a fresh production slate</p>
          </div>
          <div className="flex items-center gap-2 md:gap-3 px-4 py-2 md:px-6 md:py-3 bg-white/5 rounded-full border border-white/5 text-[8px] md:text-[9px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">
            <Sparkles size={12} className="md:w-3.5 md:h-3.5" /> AI BREAKDOWN ENABLED
          </div>
        </div>
      </div>

      {/* Footer Insight */}
      <footer className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/5 text-neutral-800 px-4 md:px-0">
        <div className="flex items-center gap-3 md:gap-4">
          <ShieldCheck size={14} className="md:w-4 md:h-4" />
          <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em]">SECURED MISSION CONTROL • v4.2</p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-[8px] md:text-[10px] font-black uppercase tracking-widest">
          <span className="text-neutral-700">Budget in Escrow: ₹12.4CR</span>
          <span className="text-neutral-700">Active Units: 42</span>
        </div>
      </footer>
    </div>
  );
};

export default ProductionProjects;
