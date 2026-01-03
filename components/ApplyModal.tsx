
import React, { useState } from 'react';
import { X, CheckCircle2, Zap, ArrowRight, ShieldCheck, User, Star, FileText } from 'lucide-react';
import { Audition } from '../types';

interface ApplyModalProps {
  audition: Audition;
  onClose: () => void;
  onSuccess: () => void;
}

const ApplyModal: React.FC<ApplyModalProps> = ({ audition, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [confirmations, setConfirmations] = useState<Set<string>>(new Set());

  const toggleConfirm = (id: string) => {
    const newConf = new Set(confirmations);
    if (newConf.has(id)) newConf.delete(id);
    else newConf.add(id);
    setConfirmations(newConf);
  };

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else onSuccess();
  };

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={onClose} />
      <div className="bg-neutral-900 border border-white/10 rounded-[3.5rem] p-10 md:p-14 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500 overflow-hidden">
         
         <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
            <Zap size={300} />
         </div>

         <header className="flex justify-between items-start relative z-10">
            <div className="space-y-1">
               <div className="flex items-center gap-3 text-red-500 mb-2">
                  <Star size={16} className="animate-pulse" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em]">Submission Protocol</span>
               </div>
               <h2 className="text-4xl md:text-5xl font-cinematic font-bold tracking-tighter text-white uppercase">Initialize Role</h2>
            </div>
            <button onClick={onClose} className="p-3 bg-neutral-800 rounded-2xl text-neutral-500 hover:text-white transition-all">
               <X size={24} />
            </button>
         </header>

         <div className="min-h-[300px] relative z-10">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Confirm Fit</h3>
                    <p className="text-neutral-500 font-medium">Please confirm you meet the primary requirements for <span className="text-white font-bold">{audition.roleName}</span>.</p>
                 </div>
                 <div className="space-y-3">
                    {audition.requirements.map(r => (
                      <button 
                        key={r}
                        onClick={() => toggleConfirm(r)}
                        className={`w-full p-6 rounded-2xl border text-left flex items-center justify-between transition-all ${
                          confirmations.has(r) ? 'bg-red-600/10 border-red-600 text-white' : 'bg-black/40 border-white/5 text-neutral-500'
                        }`}
                      >
                         <span className="text-xs font-black uppercase tracking-widest">{r}</span>
                         <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                           confirmations.has(r) ? 'bg-red-600 border-red-600' : 'border-white/10'
                         }`}>
                           {confirmations.has(r) && <CheckCircle2 size={14} />}
                         </div>
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                 <div className="space-y-2">
                    <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Your Package</h3>
                    <p className="text-neutral-500 font-medium">Your verified identity is automatically attached to this submission.</p>
                 </div>
                 <div className="p-8 bg-black/60 border border-white/10 rounded-[2.5rem] space-y-6">
                    <div className="flex items-center gap-5 border-b border-white/5 pb-6">
                       <div className="w-16 h-16 rounded-2xl bg-neutral-800 flex items-center justify-center text-red-500 border border-white/5 shadow-xl">
                          <User size={32} />
                       </div>
                       <div>
                          <p className="text-xs font-black text-white uppercase tracking-widest">Your Professional Slate</p>
                          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1">Verified Experience: 24 Projects</p>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3 text-neutral-400">
                          <FileText size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Auto-Attached: Emotional Showreel</span>
                       </div>
                       <div className="flex items-center gap-3 text-neutral-400">
                          <CheckCircle2 size={16} className="text-green-500" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Skill Density: 92% Match</span>
                       </div>
                    </div>
                 </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-12 animate-in fade-in zoom-in-95 text-center">
                 <div className="w-24 h-24 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600 border border-red-600/20 mx-auto shadow-3xl shadow-red-600/20 animate-pulse">
                    <Zap size={48} />
                 </div>
                 <div className="space-y-4">
                    <h3 className="text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Ready to Roll?</h3>
                    <p className="text-neutral-500 max-w-sm mx-auto font-medium">Once you send this, it will appear directly on the Moonlight Films mission dashboard.</p>
                 </div>
                 <div className="p-6 bg-blue-600/5 border border-blue-600/20 rounded-[2rem] flex items-center gap-4 text-left">
                    <ShieldCheck size={24} className="text-blue-500 shrink-0" />
                    <p className="text-[9px] font-bold text-neutral-400 uppercase leading-relaxed tracking-widest">
                       SECURED BY CLAP OS. Your contact data is protected and only shared with the production upon shortlisting.
                    </p>
                 </div>
              </div>
            )}
         </div>

         <footer className="pt-6 border-t border-white/5 flex gap-4 relative z-10">
            {step > 1 && (
               <button 
                onClick={() => setStep(s => s - 1)}
                className="px-10 py-6 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all"
               >
                 Back
               </button>
            )}
            <button 
              onClick={handleNext}
              disabled={step === 1 && confirmations.size < audition.requirements.length}
              className="flex-1 py-7 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all active-scale flex items-center justify-center gap-4"
            >
               {step === 3 ? 'SEND APPLICATION' : 'CONTINUE'} <ArrowRight size={18} />
            </button>
         </footer>
      </div>
    </div>
  );
};

export default ApplyModal;
