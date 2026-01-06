
import React, { useState } from 'react';
import Modal from './Modal';
import Select from './Select';
import TagInput from './TagInput';
import { 
  Zap, 
  Users, 
  Briefcase, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  DollarSign, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Clapperboard,
  FileText
} from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';

interface CreateRequirementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateRequirementModal: React.FC<CreateRequirementModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isPosting, setIsPosting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    projectId: MOCK_PROJECTS[0].id,
    type: 'Cast' as 'Cast' | 'Crew',
    roleName: '',
    category: 'Lead Actor',
    description: '',
    payScale: '',
    deadline: '',
    tags: [] as string[]
  });

  const categories = {
    Cast: ['Lead Actor', 'Supporting', 'Junior Artist', 'Stunt / Action', 'Dancer', 'Voice Artist'],
    Crew: ['Editor', 'Poster Designer', 'VFX Artist', 'Colorist', 'Sound Designer', 'Production Assistant']
  };

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);

  const handlePublish = () => {
    setIsPosting(true);
    // Simulate API call to publish to Discovery Hub
    setTimeout(() => {
      setIsPosting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Requirement Dispatched" subtitle="Registry Entry Active">
        <div className="py-12 text-center space-y-8 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl transform rotate-12 mb-6">
              <CheckCircle2 size={48} className="text-white" />
           </div>
           <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Live on Discovery</h2>
              <p className="text-neutral-500 text-sm md:text-base font-medium max-w-sm mx-auto italic">
                "Your mission call for <strong>{formData.roleName}</strong> is now visible to all verified talent and crew nodes."
              </p>
           </div>
           <div className="pt-6">
             <button onClick={onClose} className="w-full py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl active-scale">
                RETURN TO COMMAND
             </button>
           </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="New Requirement" 
      subtitle="Registry Broadcast Protocol"
      maxWidth="max-w-3xl"
    >
      <div className="space-y-10 min-h-[450px] flex flex-col relative">
        
        {/* Progress Dots */}
        <div className="flex gap-2 justify-center mb-4">
           {[1, 2, 3, 4].map(s => (
             <div key={s} className={`h-1 w-12 rounded-full transition-all duration-500 ${step >= s ? 'bg-red-600' : 'bg-neutral-800'}`} />
           ))}
        </div>

        <div className="flex-1">
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="space-y-2">
                  <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Requirement Logic</h3>
                  <p className="text-neutral-500 text-xs uppercase font-black tracking-widest">Target Personnel Stack</p>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'Cast', label: 'Cast Registry', icon: <Star size={24}/>, desc: 'On-screen performers, stunts, and models.' },
                    { id: 'Crew', label: 'Crew Registry', icon: <Briefcase size={24}/>, desc: 'Technical staff, editors, and designers.' }
                  ].map(opt => (
                    <button 
                      key={opt.id}
                      onClick={() => setFormData({...formData, type: opt.id as any, category: categories[opt.id as 'Cast' | 'Crew'][0]})}
                      className={`p-8 rounded-[2.5rem] border text-left space-y-6 transition-all active-scale ${
                        formData.type === opt.id ? 'bg-red-600/10 border-red-500 text-white shadow-xl' : 'bg-black/40 border-white/5 text-neutral-600 hover:border-white/20'
                      }`}
                    >
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                         formData.type === opt.id ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-700'
                       }`}>
                          {opt.icon}
                       </div>
                       <div className="space-y-1">
                          <p className="text-xl font-cinematic font-bold uppercase tracking-widest">{opt.label}</p>
                          <p className="text-[9px] font-bold uppercase leading-tight opacity-60">{opt.desc}</p>
                       </div>
                    </button>
                  ))}
               </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="space-y-2">
                  <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Role Identity</h3>
                  <p className="text-neutral-500 text-xs uppercase font-black tracking-widest">Mission Parameters</p>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Target Project</label>
                     <Select 
                       value={formData.projectId}
                       onChange={(e) => setFormData({...formData, projectId: e.target.value})}
                       options={MOCK_PROJECTS.map(p => ({ label: p.title, value: p.id }))}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Functional Category</label>
                     <Select 
                       value={formData.category}
                       onChange={(e) => setFormData({...formData, category: e.target.value})}
                       options={categories[formData.type].map(c => ({ label: c.toUpperCase(), value: c }))}
                     />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                     <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Requirement Name</label>
                     <input 
                       type="text" 
                       placeholder="e.g. Senior Editor - Feature Narrative"
                       value={formData.roleName}
                       onChange={(e) => setFormData({...formData, roleName: e.target.value})}
                       className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase text-sm"
                     />
                  </div>
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="space-y-2">
                  <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">The Brief</h3>
                  <p className="text-neutral-500 text-xs uppercase font-black tracking-widest">Commercial & Technical Parameters</p>
               </div>

               <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <DollarSign size={12} className="text-green-500" /> Pay Scale / Budget (₹)
                        </label>
                        <input 
                          type="text" 
                          placeholder="e.g. 5,000 / Day"
                          value={formData.payScale}
                          onChange={(e) => setFormData({...formData, payScale: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all text-sm"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1 flex items-center gap-2">
                           <Calendar size={12} className="text-blue-500" /> Application Deadline
                        </label>
                        <input 
                          type="date" 
                          value={formData.deadline}
                          onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                          className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                        />
                     </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Role Description / Scope of Work</label>
                     <textarea 
                       rows={4}
                       placeholder="Define the technical beats or performance expectations..."
                       value={formData.description}
                       onChange={(e) => setFormData({...formData, description: e.target.value})}
                       className="w-full bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-sm font-medium text-neutral-400 focus:ring-1 focus:ring-red-600 transition-all outline-none resize-none italic"
                     />
                  </div>
               </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
               <div className="space-y-2">
                  <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Registry Calibration</h3>
                  <p className="text-neutral-500 text-xs uppercase font-black tracking-widest">Final Audit & Tags</p>
               </div>

               <div className="space-y-8">
                  <TagInput 
                    label="Required Skills / Tags"
                    tags={formData.tags}
                    onChange={(tags) => setFormData({...formData, tags})}
                    placeholder="e.g. DaVinci Resolve, 4K Workflow"
                    accentColor="red-500"
                  />

                  <div className="p-8 bg-neutral-950 border border-white/5 rounded-[2.5rem] space-y-6 shadow-inner group">
                     <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <div className="flex items-center gap-3">
                           <Sparkles size={16} className="text-red-500" />
                           <span className="text-[10px] font-black uppercase tracking-widest text-white">Genie Visibility Boost</span>
                        </div>
                        <div className="w-10 h-5 rounded-full bg-red-600 relative">
                           <div className="absolute top-1 left-6 w-3 h-3 bg-white rounded-full" />
                        </div>
                     </div>
                     <p className="text-[11px] text-neutral-500 font-medium italic leading-relaxed">
                        "Your requirement will be automatically suggested to talent nodes with high compatibility scores in the Mumbai region."
                     </p>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex gap-4 pt-10 border-t border-white/5 mt-auto">
          {step > 1 && (
            <button onClick={handleBack} className="px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all">
              <ChevronLeft size={18} />
            </button>
          )}
          
          {step < 4 ? (
            <button 
              onClick={handleNext}
              disabled={step === 2 && !formData.roleName}
              className="flex-1 py-5 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active-scale flex items-center justify-center gap-3"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handlePublish}
              disabled={isPosting}
              className="flex-1 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active-scale flex items-center justify-center gap-4 group"
            >
              {isPosting ? <Zap size={20} className="animate-spin" /> : <><ShieldCheck size={20} /> INITIALIZE BROADCAST</>}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default CreateRequirementModal;
