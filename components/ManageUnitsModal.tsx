
import React, { useState } from 'react';
import Modal from './Modal';
import { 
  Plus, 
  Layers, 
  Trash2, 
  ShieldCheck, 
  Radio, 
  Zap, 
  CheckCircle2, 
  Network,
  Cpu,
  Loader2,
  ChevronRight
} from 'lucide-react';
import { Project, Unit } from '../types';

interface ManageUnitsModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
}

const ManageUnitsModal: React.FC<ManageUnitsModalProps> = ({ isOpen, onClose, project }) => {
  const [newUnitName, setNewUnitName] = useState('');
  const [isInitializing, setIsInitializing] = useState(false);
  const [localUnits, setLocalUnits] = useState<Unit[]>(project?.units || []);

  // Update local units if project changes
  React.useEffect(() => {
    if (project) setLocalUnits(project.units);
  }, [project]);

  if (!project) return null;

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUnitName.trim()) return;

    setIsInitializing(true);
    // Simulate Registry Handshake: Requirement 4.3
    setTimeout(() => {
      const newUnit: Unit = {
        id: 'u-' + Math.random().toString(36).substr(2, 5),
        name: newUnitName.trim(),
        projectId: project.id
      };
      setLocalUnits([...localUnits, newUnit]);
      setNewUnitName('');
      setIsInitializing(false);
    }, 1200);
  };

  const removeUnit = (id: string) => {
    // Only allow removing if not the last unit
    if (localUnits.length <= 1) return;
    setLocalUnits(localUnits.filter(u => u.id !== id));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Unit Orchestration" 
      subtitle={`Linking nodes to ${project.title}`}
      maxWidth="max-w-xl"
    >
      <div className="space-y-8 pb-4">
        
        {/* Unit Status Summary */}
        <section className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] flex items-center justify-between shadow-inner">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
                 <Network size={24} />
              </div>
              <div>
                 <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{localUnits.length} ACTIVE NODES</p>
                 <p className="text-[8px] font-black text-neutral-500 uppercase tracking-[0.3em] mt-1">Multi-Unit Logic Sync Active</p>
              </div>
           </div>
           <div className="flex items-center gap-1">
              <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[8px] font-black text-green-500 uppercase">SYNC: 12MS</span>
           </div>
        </section>

        {/* Existing Units List */}
        <div className="space-y-3">
           <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-2">Current Unit Registry</p>
           <div className="grid gap-3">
              {localUnits.map((unit) => (
                <div key={unit.id} className="group flex items-center justify-between p-5 bg-black/40 border border-white/5 rounded-2xl transition-all hover:border-red-600/20">
                   <div className="flex items-center gap-4">
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
                      <span className="text-[11px] font-black text-white uppercase tracking-widest">{unit.name}</span>
                   </div>
                   <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[8px] font-black text-neutral-600 uppercase bg-neutral-900 px-2 py-0.5 rounded border border-white/5 mr-2">
                        ID: {unit.id.toUpperCase()}
                      </span>
                      {localUnits.length > 1 && (
                        <button 
                          onClick={() => removeUnit(unit.id)}
                          className="p-2 text-neutral-600 hover:text-red-500 transition-colors"
                        >
                           <Trash2 size={14} />
                        </button>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Create New Unit Form */}
        <div className="pt-6 border-t border-white/5 space-y-4">
           <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-2">Initialize New Unit</p>
           <form onSubmit={handleAddUnit} className="flex gap-2">
              <div className="relative flex-1 group">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500">
                    <Plus size={16} />
                 </div>
                 <input 
                   type="text" 
                   placeholder="e.g. SPLINTER UNIT"
                   value={newUnitName}
                   onChange={e => setNewUnitName(e.target.value.toUpperCase())}
                   disabled={isInitializing}
                   className="w-full bg-neutral-950 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-[10px] font-black uppercase text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800"
                 />
              </div>
              <button 
                type="submit"
                disabled={isInitializing || !newUnitName.trim()}
                className="px-8 py-4 bg-white text-black font-black rounded-xl text-[9px] uppercase tracking-widest shadow-xl active-scale disabled:opacity-20 flex items-center gap-2 transition-all"
              >
                 {isInitializing ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
                 {isInitializing ? 'LINKING...' : 'INITIALIZE'}
              </button>
           </form>
        </div>

        {/* Requirement Note */}
        <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4">
           <Cpu size={20} className="text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
              Requirement 7.2: Each unit acts as an isolated data node. Scenes and personnel assigned to {localUnits[0]?.name || 'a unit'} cannot cross-contaminate other units without a manual relay.
           </p>
        </div>

      </div>
    </Modal>
  );
};

export default ManageUnitsModal;
