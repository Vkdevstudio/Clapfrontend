
import React, { useState } from 'react';
import Modal from './Modal';
import Select from './Select';
import { 
  UserPlus, 
  Link as LinkIcon, 
  QrCode, 
  Clock, 
  Zap, 
  Users, 
  ShieldCheck, 
  Copy, 
  Check,
  // Added CheckCircle2 to fix the 'Cannot find name' error
  CheckCircle2,
  Calendar,
  Layers
} from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';

interface InviteCrewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InviteCrewModal: React.FC<InviteCrewModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    project: MOCK_PROJECTS[0].id,
    unit: 'Unit A',
    expiration: '24h',
    useType: 'multi',
  });

  const handleGenerate = () => {
    setStep(2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://clap.os/join/${formData.project}?token=sh92_xk28`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footer = step === 1 ? (
    <button 
      onClick={handleGenerate}
      className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active-scale flex items-center justify-center gap-3"
    >
      <Zap size={18} /> Generate Invite Node
    </button>
  ) : (
    <button 
      onClick={onClose}
      className="w-full py-6 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] transition-all active-scale"
    >
      Close Registry
    </button>
  );

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Crew Invitation" 
      subtitle="4.1 Ingest Protocol"
      footer={footer}
    >
      <div className="space-y-8">
        {step === 1 ? (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-3">
               <div className="flex items-center gap-2 text-red-500">
                  <ShieldCheck size={16} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Admin Authorization Required</span>
               </div>
               <p className="text-[10px] text-neutral-400 font-medium leading-relaxed italic">
                 Generated links are project-scoped. Users joining via this node will be automatically tagged with the selected unit parameters.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Target Project</label>
                <Select 
                  value={formData.project}
                  onChange={(e) => setFormData({...formData, project: e.target.value})}
                  options={MOCK_PROJECTS.map(p => ({ label: p.title, value: p.id }))}
                />
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Unit Assignment</label>
                <Select 
                  value={formData.unit}
                  onChange={(e) => setFormData({...formData, unit: e.target.value})}
                  options={[
                    { label: 'Unit A (Main)', value: 'Unit A' },
                    { label: 'Unit B (Splinter)', value: 'Unit B' },
                    { label: 'Basecamp / Logistics', value: 'Logistics' },
                    { label: 'Post-Production', value: 'Post' }
                  ]}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Expiration Cycle</label>
                <div className="grid grid-cols-2 gap-2">
                   {['1h', '24h', '7d', 'Never'].map(time => (
                     <button 
                       key={time}
                       onClick={() => setFormData({...formData, expiration: time})}
                       className={`py-3.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                         formData.expiration === time ? 'bg-white text-black border-white' : 'bg-black border-white/5 text-neutral-500 hover:text-white'
                       }`}
                     >
                       {time}
                     </button>
                   ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Access Logic</label>
                <div className="grid grid-cols-1 gap-2">
                   {[
                     { id: 'single', label: 'Single Use Token', icon: <CheckCircle2 size={12}/> },
                     { id: 'multi', label: 'Multi-Unit Node', icon: <Users size={12}/> }
                   ].map(type => (
                     <button 
                       key={type.id}
                       onClick={() => setFormData({...formData, useType: type.id})}
                       className={`flex items-center justify-between px-6 py-4 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                         formData.useType === type.id ? 'bg-red-600/10 border-red-600 text-red-500' : 'bg-black border-white/5 text-neutral-500 hover:text-white'
                       }`}
                     >
                        <span className="flex items-center gap-3">{type.icon} {type.label}</span>
                        {formData.useType === type.id && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
                     </button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-10 animate-in zoom-in-95 duration-500 text-center">
             <div className="space-y-4">
                <div className="w-48 h-48 bg-white p-4 rounded-[2rem] mx-auto shadow-2xl relative group">
                   <div className="absolute inset-0 bg-red-600/10 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                   {/* Mock QR Code Pattern */}
                   <div className="w-full h-full bg-neutral-900 rounded-xl flex items-center justify-center relative z-10 overflow-hidden">
                      <QrCode size={100} className="text-white opacity-90" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-[scanline_2s_linear_infinite]" />
                   </div>
                </div>
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">On-Set Friendly QR Generated</p>
             </div>

             <div className="space-y-4">
                <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest text-left ml-2">Secure Link</p>
                <div className="flex gap-2">
                   <div className="flex-1 bg-black/60 border border-white/10 rounded-xl px-6 py-4 text-xs text-neutral-400 font-medium truncate italic flex items-center">
                     clap.os/join/{formData.project.slice(0,4)}...token=sh92_xk28
                   </div>
                   <button 
                    onClick={handleCopy}
                    className={`px-6 rounded-xl transition-all active-scale flex items-center justify-center gap-2 ${
                      copied ? 'bg-green-600 text-white' : 'bg-red-600 text-white shadow-lg'
                    }`}
                   >
                     {copied ? <Check size={18} /> : <Copy size={18} />}
                   </button>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-4 border-t border-white/5 pt-8">
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-neutral-700 uppercase">Unit</p>
                   <p className="text-sm font-cinematic font-bold text-white uppercase tracking-widest">{formData.unit}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-neutral-700 uppercase">Expires</p>
                   <p className="text-sm font-cinematic font-bold text-white uppercase tracking-widest">{formData.expiration}</p>
                </div>
                <div className="space-y-1">
                   <p className="text-[8px] font-black text-neutral-700 uppercase">Status</p>
                   <p className="text-sm font-cinematic font-bold text-green-500 uppercase tracking-widest">ACTIVE</p>
                </div>
             </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default InviteCrewModal;
