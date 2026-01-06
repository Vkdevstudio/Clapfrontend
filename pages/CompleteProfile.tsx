import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  Zap, 
  Activity,
  Sparkles
} from 'lucide-react';
import { User as UserType } from '../types.ts';
import TagInput from '../components/TagInput.tsx';
import Select from '../components/Select.tsx';

interface CompleteProfileProps {
  user: UserType;
  onComplete: (updatedData: Partial<UserType>) => void;
}

const CompleteProfile: React.FC<CompleteProfileProps> = ({ user, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    specialty: user.specialty || '',
    skills: user.skills || [],
    languages: user.languages || [],
    instruments: user.instruments || [],
    talents: user.talents || [],
    experienceLevel: user.experienceLevel || 'Beginner',
    availabilityStatus: user.availabilityStatus || 'Available',
    companyName: user.companyName || '',
    companyReg: user.companyReg || '',
    officeAddress: user.officeAddress || '',
  });

  const isTalent = user.role === 'talent';
  const isVendor = user.role === 'vendor';
  const isProduction = user.role === 'production';

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else onComplete({ ...formData, isProfileComplete: true });
  };

  const getSpecialtyOptions = () => {
    if (isTalent) return [
      { label: 'Actor', value: 'Actor' },
      { label: 'Musician', value: 'Musician' },
      { label: 'Dancer', value: 'Dancer' }
    ];
    if (isVendor) return [
      { label: 'Equipment Rental', value: 'Equipment Rental' },
      { label: 'Studio Space', value: 'Studio Space' },
      { label: 'Post Production', value: 'Post Production' }
    ];
    return [
      { label: 'Director', value: 'Director' },
      { label: 'DOP', value: 'DOP' },
      { label: 'AD', value: 'AD' }
    ];
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="w-full max-w-4xl relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        <header className="text-center space-y-4">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[9px] font-black tracking-[0.4em] uppercase">
              <Zap size={12} className="animate-pulse" /> Finalizing Operational Identity
           </div>
           <h1 className="text-6xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
              Finish Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Slate.</span>
           </h1>
        </header>

        <div className="flex justify-center gap-12">
          {[1, 2, 3].map(s => (
            <div key={s} className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-700 ${
              step >= s ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/20' : 'bg-neutral-900 border-white/5 text-neutral-700'
            }`}>
              {step > s ? <CheckCircle2 size={20} /> : <span className="font-black text-sm">{s}</span>}
            </div>
          ))}
        </div>

        <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-3xl relative overflow-hidden group">
           <div className="relative z-10 min-h-[400px]">
              {step === 1 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <h3 className="text-4xl font-cinematic font-bold text-white tracking-widest uppercase">Professional Core</h3>
                      <p className="text-neutral-500 font-medium">Define your primary mission role and experience level.</p>
                   </div>
                   
                   <div className="grid md:grid-cols-2 gap-10">
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Core Specialty</label>
                         <Select 
                            value={formData.specialty}
                            onChange={e => setFormData({...formData, specialty: e.target.value})}
                            options={getSpecialtyOptions()}
                         />
                      </div>
                      <div className="space-y-3">
                         <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Experience Level</label>
                         <div className="grid grid-cols-3 gap-3">
                            {['Beginner', 'Amateur', 'Pro'].map(lvl => (
                              <button 
                                key={lvl}
                                onClick={() => setFormData({...formData, experienceLevel: lvl as any})}
                                className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                                  formData.experienceLevel === lvl ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black border-white/5 text-neutral-700 hover:text-white'
                                }`}
                              >
                                {lvl}
                              </button>
                            ))}
                         </div>
                      </div>
                   </div>

                   {isVendor && (
                     <div className="pt-8 border-t border-white/5 space-y-8 animate-in slide-in-from-bottom-4 duration-700">
                        <div className="flex items-center gap-3 text-blue-500">
                           <Building2 size={20} />
                           <h4 className="text-[10px] font-black uppercase tracking-[0.4em]">Corporate Entity Details</h4>
                        </div>
                        <div className="grid md:grid-cols-2 gap-8">
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Company Registered Name</label>
                              <input 
                                type="text" 
                                value={formData.companyName}
                                onChange={e => setFormData({...formData, companyName: e.target.value})}
                                placeholder="Legal Entity Name"
                                className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                              />
                           </div>
                        </div>
                     </div>
                   )}
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
                   <div className="space-y-2">
                      <h3 className="text-4xl font-cinematic font-bold text-white tracking-widest uppercase">Skillset Matrix</h3>
                   </div>

                   <div className="grid md:grid-cols-2 gap-8">
                      <TagInput 
                        label="General Skills" 
                        tags={formData.skills} 
                        onChange={tags => setFormData({...formData, skills: tags})} 
                        placeholder="e.g. Method Acting, Horse Riding"
                      />
                      <TagInput 
                        label="Languages" 
                        tags={formData.languages} 
                        onChange={tags => setFormData({...formData, languages: tags})} 
                        placeholder="e.g. Hindi, Tamil, English"
                        accentColor="blue-500"
                      />
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 text-center flex flex-col items-center">
                   <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center text-green-500 border border-green-500/20 mb-4">
                      <ShieldCheck size={48} />
                   </div>
                   <h3 className="text-5xl font-cinematic font-bold text-white uppercase tracking-widest uppercase">Registry Ready</h3>

                   <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-10 w-full max-w-md space-y-8">
                      <div className="grid grid-cols-1 gap-3">
                         {[
                            { id: 'Available', label: 'Ready for Immediate Hire', icon: <CheckCircle2 className="text-green-500" /> },
                            { id: 'Busy', label: 'Booked / Unavailable', icon: <Activity className="text-red-500" /> },
                            { id: 'On Set', label: 'Currently on Mission', icon: <Zap className="text-blue-500" /> }
                         ].map(status => (
                           <button 
                             key={status.id}
                             onClick={() => setFormData({...formData, availabilityStatus: status.id as any})}
                             className={`flex items-center justify-between p-6 rounded-2xl border transition-all ${
                               formData.availabilityStatus === status.id ? 'bg-white/10 border-white/20 text-white shadow-xl' : 'bg-transparent border-white/5 text-neutral-600'
                             }`}
                           >
                              <span className="text-[11px] font-black uppercase tracking-widest">{status.label}</span>
                              {status.icon}
                           </button>
                         ))}
                      </div>
                   </div>
                </div>
              )}
           </div>

           <div className="mt-16 flex gap-4 pt-10 border-t border-white/5">
              {step > 1 && (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  className="px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleNext}
                disabled={step === 1 && !formData.specialty}
                className="flex-1 py-7 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-4"
              >
                {step === 3 ? 'FINALIZE IDENTITY' : 'CONTINUE CALIBRATION'} <ArrowRight size={18} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;