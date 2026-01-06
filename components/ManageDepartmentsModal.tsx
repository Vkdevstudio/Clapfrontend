
import React, { useState } from 'react';
import Modal from './Modal';
import { 
  Plus, 
  Users, 
  Trash2, 
  ShieldCheck, 
  Radio, 
  Zap, 
  CheckCircle2, 
  Network,
  Cpu,
  Loader2,
  Settings,
  Circle
} from 'lucide-react';
import { Project, ProjectDepartment } from '../types';

interface ManageDepartmentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const DEFAULT_DEPTS = [
  'Direction', 'Production', 'Camera', 'Art', 'Sound', 'Costume', 'Grip', 'Electric', 'Logistics', 'Cast'
];

const ManageDepartmentsModal: React.FC<ManageDepartmentsModalProps> = ({ isOpen, onClose, project }) => {
  const [newDeptName, setNewDeptName] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  
  // Logic: Initalize with defaults if project has none
  const [localDepts, setLocalDepts] = useState<ProjectDepartment[]>(() => {
    return project?.activeDepartments || DEFAULT_DEPTS.map((name, i) => ({
      id: `d-${i}`,
      name,
      isCustom: false,
      active: true
    }));
  });

  if (!project) return null;

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDeptName.trim()) return;

    setIsInitializing(true);
    // Simulation: Requirement 5.3 - Dynamic Node Allocation
    setTimeout(() => {
      const newDept: ProjectDepartment = {
        id: 'd-' + Math.random().toString(36).substr(2, 5),
        name: newDeptName.trim(),
        isCustom: true,
        active: true
      };
      setLocalDepts([...localDepts, newDept]);
      setNewDeptName('');
      setIsInitializing(false);
    }, 1200);
  };

  const toggleDept = (id: string) => {
    setLocalDepts(localDepts.map(d => 
      d.id === id ? { ...d, active: !d.active } : d
    ));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Department Matrix" 
      subtitle={`Structuring organizational nodes for ${project.title}`}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-8 pb-4">
        
        {/* Technical Context */}
        <section className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-[2rem] flex items-center justify-between shadow-inner">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                 <Users size={24} />
              </div>
              <div>
                 <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Hierarchy Configuration</p>
                 <p className="text-[8px] font-black text-neutral-500 uppercase tracking-[0.3em] mt-1">Production Side Registry Control</p>
              </div>
           </div>
           <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black text-green-500 uppercase">LEDGER: SYNCED</span>
           </div>
        </section>

        {/* Create New Dept Form */}
        <div className="space-y-4">
           <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-2">Initialize Bespoke Department Node</p>
           <form onSubmit={handleAddDept} className="flex gap-2">
              <div className="relative flex-1">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500">
                    <Plus size={16} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="e.g. UNDERWATER STUNTS"
                   value={newDeptName}
                   onChange={e => setNewDeptName(e.target.value.toUpperCase())}
                   disabled={isInitializing}
                   className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-[10px] font-black uppercase text-white outline-none focus:ring-1 focus:ring-blue-600 transition-all placeholder:text-neutral-800"
                 />
              </div>
              <button 
                type="submit"
                disabled={isInitializing || !newDeptName.trim()}
                className="px-8 py-4 bg-white text-black font-black rounded-xl text-[9px] uppercase tracking-widest shadow-xl active-scale disabled:opacity-20 flex items-center gap-2 transition-all"
              >
                 {isInitializing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                 ALLOCATE
              </button>
           </form>
        </div>

        {/* Existing Depts Grid */}
        <div className="space-y-4">
           <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-2">Project Department Index</p>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {localDepts.map((dept) => (
                <div 
                  key={dept.id} 
                  onClick={() => toggleDept(dept.id)}
                  className={`group flex items-center justify-between p-5 rounded-2xl transition-all cursor-pointer border ${
                    dept.active 
                      ? 'bg-neutral-900 border-blue-600/30 shadow-lg' 
                      : 'bg-black/20 border-white/5 opacity-40 grayscale'
                  }`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                        dept.active ? 'bg-blue-600 text-white shadow-xl' : 'bg-neutral-800 text-neutral-600'
                      }`}>
                         {dept.isCustom ? <Zap size={14} /> : <Settings size={14} />}
                      </div>
                      <div className="space-y-0.5">
                        <span className="text-[10px] font-black text-white uppercase tracking-widest">{dept.name}</span>
                        {dept.isCustom && <p className="text-[7px] font-bold text-blue-500 uppercase">Custom Node</p>}
                      </div>
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                     dept.active ? 'border-blue-600 bg-blue-600 text-white' : 'border-neutral-800'
                   }`}>
                      {dept.active && <CheckCircle2 size={12} />}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Logic Note */}
        <div className="p-6 bg-orange-600/5 border border-orange-600/10 rounded-2xl flex items-start gap-4">
           <ShieldCheck size={20} className="text-orange-500 shrink-0 mt-0.5" />
           <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
              Requirement 5.3: Production side creation bypasses global admin approval to allow for high-octane set adjustments. Custom departments are project-isolated and do not contaminate the global master library.
           </p>
        </div>

      </div>
    </Modal>
  );
};

export default ManageDepartmentsModal;
