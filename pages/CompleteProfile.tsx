
import React, { useState } from 'react';
import { 
  User, 
  Briefcase, 
  Zap, 
  Globe, 
  Music, 
  Star, 
  ShieldCheck, 
  ArrowRight, 
  Building2, 
  Calendar,
  CheckCircle2,
  Activity,
  Award,
  Sparkles
} from 'lucide-react';
import { UserRole, User as UserType } from '../types';
import TagInput from '../components/TagInput';
import SelectDropdown from '../components/SelectDropdown';

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
    // Vendor Fields
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

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vh] bg-red-600/[0.03] blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[40vw] h-[40vh] bg-blue-600/[0.02] blur-[150px]" />
        <div className="scanline opacity-[0.03]" />
      </div>

      <div className="w-full max-w-4xl relative z-10 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        
        {/* Header Section */}
        <header className="text-center space-y-4">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-600/10 border border-red-600/20 rounded-full text-red-500 text-[9px] font-black tracking-[0.4em] uppercase">
              <Zap size={12} className="animate-pulse" /> Finalizing Operational Identity
           </div>
           <h1 className="text-6xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
              Finish Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Slate.</span>
           </h1>
           <p className="text-neutral-500 font-medium text-lg md:text-xl italic">"The registry needs your full parameters before we initialize the marketplace."</p>
        </header>

        {/* Step Track */}
        <div className="flex justify-center gap-12">
          {[1, 2, 3].map(s => (
            <div key={s} className="flex flex-col items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-700 ${
                step >= s ? 'bg-red-600 border-red-500 text-white shadow-xl shadow-red-600/20' : 'bg-neutral-900 border-white/5 text-neutral-700'
              }`}>
                {step > s ? <CheckCircle2 size={20} /> : <span className="font-black text-sm">{s}</span>}
              </div>
              <div className={`h-1 w-8 rounded-full transition-all duration-700 ${step >= s ? 'bg-red-600' : 'bg-neutral-900'}`} />
            </div>
          ))}
        </div>

        {/* Form Surface */}
        <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 md:p-16 shadow-3xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:scale-110 transition-transform duration-1000">
              <ShieldCheck size={300} />
           </div>

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
                         <SelectDropdown 
                            value={formData.specialty}
                            onChange={val => setFormData({...formData, specialty: val})}
                            placeholder={isTalent ? "e.g. Lead Actor" : isVendor ? "e.g. Camera Rental" : "e.g. Director"}
                            options={[
                               { label: isTalent ? 'Actor' : isVendor ? 'Equipment Rental' : 'Director', value: 'primary' },
                               { label: isTalent ? 'Musician' : isVendor ? 'Studio Space' : 'DOP', value: 'secondary' },
                               { label: isTalent ? 'Dancer' : isVendor ? 'Post Production' : 'AD', value: 'tertiary' }
                            ]}
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
                                  formData.experienceLevel === lvl ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black/20 border-white/5 text-neutral-700 hover:text-white'
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
                           <div className="space-y-3">
                              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">GST / Tax ID</label>
                              <input 
                                type="text" 
                                value={formData.companyReg}
                                onChange={e => setFormData({...formData, companyReg: e.target.value})}
                                placeholder="Verified Tax Registration"
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
                      <p className="text-neutral-500 font-medium">Map your multi-modal talents for the Genie matching engine.</p>
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
                      {isTalent && (
                        <>
                          <TagInput 
                            label="Instruments" 
                            tags={formData.instruments} 
                            onChange={tags => setFormData({...formData, instruments: tags})} 
                            placeholder="e.g. Guitar, Sitar"
                            accentColor="accent"
                          />
                          <TagInput 
                            label="Special Talents" 
                            tags={formData.talents} 
                            onChange={tags => setFormData({...formData, talents: tags})} 
                            placeholder="e.g. Stunts, Classical Dance"
                          />
                        </>
                      )}
                      {isProduction && (
                         <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-3xl flex items-center gap-4 md:col-span-2">
                            <Sparkles size={24} className="text-blue-500" />
                            <p className="text-xs text-neutral-400 font-medium italic">"Adding technical skills like 'RED Workflow' or 'Steadicam Op' significantly increases project matching accuracy."</p>
                         </div>
                      )}
                   </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-12 animate-in fade-in zoom-in-95 duration-500 text-center flex flex-col items-center">
                   <div className="w-24 h-24 bg-green-500/10 rounded-3xl flex items-center justify-center text-green-500 border border-green-500/20 mb-4">
                      <ShieldCheck size={48} />
                   </div>
                   <div className="space-y-4">
                      <h3 className="text-5xl font-cinematic font-bold text-white tracking-widest uppercase">Registry Ready</h3>
                      <p className="text-neutral-500 max-w-sm mx-auto font-medium">Confirm your set availability to begin receiving mission invitations.</p>
                   </div>

                   <div className="bg-black/40 border border-white/5 rounded-[2.5rem] p-10 w-full max-w-md space-y-8">
                      <div className="space-y-4">
                         <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Global Readiness Status</label>
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
                </div>
              )}
           </div>

           {/* Actions */}
           <div className="mt-16 flex gap-4 pt-10 border-t border-white/5">
              {step > 1 && (
                <button 
                  onClick={() => setStep(s => s - 1)}
                  className="px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all active-scale"
                >
                  Back
                </button>
              )}
              <button 
                onClick={handleNext}
                disabled={step === 1 && (!formData.specialty || (isVendor && !formData.companyName))}
                className="flex-1 py-7 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all active-scale flex items-center justify-center gap-4"
              >
                {step === 3 ? 'FINALIZE IDENTITY' : 'CONTINUE CALIBRATION'} <ArrowRight size={18} />
              </button>
           </div>
        </div>

        <footer className="text-center opacity-30">
           <p className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • IDENTITY REGISTRY v4.2 • ENCRYPTED RSA-4096</p>
        </footer>
      </div>
    </div>
  );
};

export default CompleteProfile;
