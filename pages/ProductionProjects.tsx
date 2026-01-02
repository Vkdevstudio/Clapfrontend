
import React from 'react';
import { MOCK_PROJECTS } from '../constants';
import { Plus, LayoutGrid, List, MoreVertical, Calendar, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductionProjects: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Production Slate</h2>
          <p className="text-neutral-400">Manage your films, series, and commercials.</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-neutral-900 border border-neutral-800 rounded-lg p-1">
            <button className="p-1.5 bg-neutral-800 rounded shadow-sm"><LayoutGrid size={18} /></button>
            <button className="p-1.5 text-neutral-500 hover:text-white"><List size={18} /></button>
          </div>
          <button className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-all shadow-lg shadow-red-600/20">
            <Plus size={18} /> New Project
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_PROJECTS.map((project) => (
          <div 
            key={project.id} 
            onClick={() => navigate('/workspace')}
            className="group bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-600 transition-all cursor-pointer flex flex-col"
          >
            <div className="aspect-video relative overflow-hidden">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-white/10">
                  {project.status}
                </span>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 bg-black/60 backdrop-blur-md rounded-full text-white">
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4 flex-1 flex flex-col">
              <div>
                <h3 className="text-xl font-bold mb-1 group-hover:text-red-500 transition-colors">{project.title}</h3>
                <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{project.type}</p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase">
                  <span>Production Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <div className="h-full bg-red-600 transition-all" style={{ width: `${project.progress}%` }} />
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 mt-auto flex justify-between items-center text-xs text-neutral-400">
                <span className="flex items-center gap-1"><Calendar size={14} /> {project.startDate}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> {project.location.split(',')[0]}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Empty Slate Card */}
        <div className="border-2 border-dashed border-neutral-800 rounded-3xl flex flex-col items-center justify-center p-8 text-center space-y-4 hover:border-neutral-600 transition-colors group cursor-pointer">
          <div className="w-16 h-16 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-600 group-hover:text-red-500 transition-colors">
            <Plus size={32} />
          </div>
          <div>
            <h4 className="font-bold">Add New Project</h4>
            <p className="text-sm text-neutral-500">Kickstart your next production.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductionProjects;
