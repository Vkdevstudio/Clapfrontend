
import React, { useState } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { MOCK_PROJECTS } from '../constants';
import { 
  Plus, Calendar, MapPin, Clapperboard, ArrowUpRight, Box, Layers, Sparkles, Settings2, Zap, Users
} from 'lucide-react';
import ManageUnitsModal from '../components/ManageUnitsModal';
import ManageDepartmentsModal from '../components/ManageDepartmentsModal';
import { Project } from '../types';

const { useNavigate } = ReactRouterDOM;

const ProductionProjects: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'Active' | 'Archived'>('Active');
  const [isUnitsModalOpen, setIsUnitsModalOpen] = useState(false);
  const [isDeptsModalOpen, setIsDeptsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = MOCK_PROJECTS.filter(p => p.status === filter);

  const handleManageUnits = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsUnitsModalOpen(true);
  };

  const handleManageDepts = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    setSelectedProject(project);
    setIsDeptsModalOpen(true);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-24 max-w-7xl mx-auto">
      
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-red-600/10 border border-red-600/20 text-red-500 text-[9px] font-black uppercase tracking-[0.4em]">
              All My Films
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            The Library
          </h1>
          <p className="text-neutral-500 text-lg font-medium max-w-xl italic">
            Every film you've ever worked on, all in one place. Start something new or revisit a wrap.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex bg-neutral-900 border border-white/5 rounded-2xl p-1 shadow-inner">
            <button 
              onClick={() => setFilter('Active')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === 'Active' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'
              }`}
            >
              Filming Now
            </button>
            <button 
              onClick={() => setFilter('Archived')}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === 'Archived' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'
              }`}
            >
              Wrapped
            </button>
          </div>
          <button 
            onClick={() => navigate('/projects/new')}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] active-scale shadow-2xl hover:bg-neutral-200 transition-colors"
          >
            <Plus size={18} /> START A NEW FILM
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => navigate('/workspace')}
            className="group bg-neutral-900 border border-white/5 rounded-[3rem] overflow-hidden hover:border-red-600/40 transition-all cursor-pointer shadow-3xl flex flex-col"
          >
            <div className="aspect-[16/10] relative overflow-hidden bg-black">
              <img 
                src={project.image} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-105" 
                alt={project.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
              <div className="absolute top-6 right-6 flex gap-2">
                <button 
                  onClick={(e) => handleManageUnits(e, project)}
                  title="Units"
                  className="bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/10 text-white hover:bg-red-600 hover:border-red-500 transition-all active-scale group/btn"
                >
                   <Layers size={14} className="group-hover/btn:scale-110" />
                </button>
                <button 
                  onClick={(e) => handleManageDepts(e, project)}
                  title="Departments"
                  className="bg-black/60 backdrop-blur-xl p-3 rounded-full border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all active-scale group/btn"
                >
                   <Users size={14} className="group-hover/btn:scale-110" />
                </button>
              </div>
              <div className="absolute bottom-6 left-8">
                <p className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1">{project.type}</p>
                <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">{project.title}</h3>
              </div>
            </div>
            
            <div className="p-10 space-y-8 flex-1 flex flex-col bg-gradient-to-b from-neutral-900/50 to-black/20">
              <div className="space-y-4">
                <div className="flex justify-between items-end">
                  <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Shoot Progress</p>
                  <p className="text-xl font-cinematic font-bold text-white tracking-widest">{project.progress}% Done</p>
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                  <div className={`h-full bg-red-600 shadow-[0_0_10px_#DC2626] transition-all duration-1000`} style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <div className="flex flex-col gap-2">
                   <div className="flex items-center gap-6 text-[9px] font-black uppercase text-neutral-500">
                     <span className="flex items-center gap-2"><Calendar size={14} className="text-red-500" /> {project.startDate}</span>
                     <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> {project.location.split(',')[0]}</span>
                   </div>
                   <div className="flex items-center gap-2 text-[8px] font-black text-blue-500 uppercase tracking-widest">
                      <Zap size={10} /> {project.units.length} ACTIVE UNITS
                   </div>
                </div>
                <div className="p-3 bg-neutral-800 rounded-xl text-neutral-500 group-hover:bg-white group-hover:text-black transition-all shadow-xl">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </div>
          </div>
        ))}

        {filter === 'Active' && (
          <div 
            onClick={() => navigate('/projects/new')}
            className="group border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center p-12 text-center space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all cursor-pointer min-h-[450px]"
          >
            <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-700 group-hover:text-red-500 transition-all border border-white/5 shadow-2xl">
              <Plus size={32} />
            </div>
            <div className="space-y-2">
               <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">Start a New Film</p>
               <div className="flex items-center justify-center gap-2 text-red-500/60">
                 <Sparkles size={12}/>
                 <span className="text-[8px] font-black uppercase tracking-widest">Genie will help you plan</span>
               </div>
            </div>
          </div>
        )}
      </div>

      <ManageUnitsModal 
        isOpen={isUnitsModalOpen}
        onClose={() => setIsUnitsModalOpen(false)}
        project={selectedProject}
      />

      <ManageDepartmentsModal 
        isOpen={isDeptsModalOpen}
        onClose={() => setIsDeptsModalOpen(false)}
        project={selectedProject}
      />

      {filteredProjects.length === 0 && (
        <div className="text-center py-40 bg-neutral-900/10 rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center gap-8">
          <Box size={48} className="text-neutral-800" />
          <h3 className="text-2xl font-cinematic font-bold text-neutral-700 uppercase tracking-widest">Nothing here yet</h3>
          <button 
            onClick={() => navigate('/projects/new')}
            className="px-8 py-3 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
          >
            Create Your First Film
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductionProjects;
