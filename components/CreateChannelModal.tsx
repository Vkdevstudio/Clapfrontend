import React, { useState } from 'react';
import Modal from './Modal';
import Select from './Select';
import { UserRole } from '../types';
import { 
  Hash, 
  ShieldAlert, 
  Users, 
  Radio, 
  Zap, 
  Briefcase, 
  Star, 
  Truck, 
  Settings2, 
  Lock 
} from 'lucide-react';

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (channel: any) => void;
  role: UserRole;
}

const CreateChannelModal: React.FC<CreateChannelModalProps> = ({ isOpen, onClose, onCreate, role }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'public',
    department: role === 'talent' ? 'Representation' : role === 'vendor' ? 'Logistics' : 'Direction',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      unread: 0,
      name: `#${formData.name.replace(/\s+/g, '-')}`
    });
    onClose();
  };

  const getRoleContent = () => {
    switch (role) {
      case 'talent':
        return {
          subtitle: "Initialize Collaboration Node",
          types: [
            { id: 'public', label: 'Cast Lounge', icon: <Star size={18} />, desc: 'Open for networking with verified talent.' },
            { id: 'emergency', label: 'Project Sync', icon: <Zap size={18} />, desc: 'Real-time shoot coordination.' },
            { id: 'dept', label: 'Representation', icon: <Lock size={18} />, desc: 'Locked channel for agents/managers.' }
          ],
          depts: [
            { label: 'Representation', value: 'Representation' },
            { label: 'Cast (Project-Based)', value: 'Cast' },
            { label: 'Personal Project', value: 'Personal' }
          ]
        };
      case 'vendor':
        return {
          subtitle: "Initialize Asset Dispatch Unit",
          types: [
            { id: 'public', label: 'Client Hub', icon: <Briefcase size={18} />, desc: 'Interface for production rentals.' },
            { id: 'emergency', label: 'Dispatch Alert', icon: <Truck size={18} />, desc: 'High-priority logistics coordination.' },
            { id: 'dept', label: 'Maintenance', icon: <Settings2 size={18} />, desc: 'Internal gear & unit logs.' }
          ],
          depts: [
            { label: 'Logistics', value: 'Logistics' },
            { label: 'Fleet Management', value: 'Fleet' },
            { label: 'Technical Ops', value: 'Tech' }
          ]
        };
      default: // production
        return {
          subtitle: "Initialize Unit Broadcast Node",
          types: [
            { id: 'public', label: 'Public Hub', icon: <Hash size={18} />, desc: 'Visible to all verified crew.' },
            { id: 'emergency', label: 'Red Alert', icon: <ShieldAlert size={18} />, desc: 'High-priority logistics triggers.' },
            { id: 'dept', label: 'Unit Group', icon: <Users size={18} />, desc: 'Locked to a specific department.' }
          ],
          depts: [
            { label: 'Global (All Units)', value: 'Global' },
            { label: 'Direction Unit', value: 'Direction' },
            { label: 'Camera Unit', value: 'Camera' },
            { label: 'Art Department', value: 'Art' },
            { label: 'Production Logistics', value: 'Logistics' }
          ]
        };
    }
  };

  const content = getRoleContent();

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Create Comms" 
      subtitle={content.subtitle}
      footer={
        <button 
          onClick={handleSubmit}
          disabled={!formData.name}
          className="w-full py-6 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active-scale flex items-center justify-center gap-3"
        >
          <Zap size={18} /> Initialize Node
        </button>
      }
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Channel Label (ID)</label>
          <div className="relative group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500 font-bold text-xl">#</div>
            <input 
              type="text" 
              placeholder="e.g. unit-dispatch-mumbai"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-6 py-5 text-xl font-cinematic text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Operational Type</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {content.types.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setFormData({...formData, type: type.id as any})}
                className={`p-5 rounded-2xl border text-left transition-all active-scale flex flex-col gap-4 ${
                  formData.type === type.id 
                    ? 'bg-red-600 border-red-500 text-white shadow-xl' 
                    : 'bg-black/20 border-white/5 text-neutral-500 hover:border-white/10'
                }`}
              >
                <div className={formData.type === type.id ? 'text-white' : 'text-neutral-600'}>
                  {type.icon}
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">{type.label}</p>
                  <p className={`text-[8px] font-bold uppercase leading-tight opacity-60`}>{type.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Operational Context</label>
          <Select 
            value={formData.department}
            onChange={(e) => setFormData({...formData, department: e.target.value})}
            options={content.depts}
          />
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Mission Brief (Description)</label>
          <textarea 
            rows={2}
            placeholder="Define the communication purpose..."
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xs font-medium text-neutral-400 focus:ring-1 focus:ring-red-600 transition-all outline-none resize-none italic"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CreateChannelModal;