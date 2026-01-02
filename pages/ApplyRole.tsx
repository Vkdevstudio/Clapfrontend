
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Video, 
  Star, 
  Calendar, 
  CheckCircle,
  Zap,
  Sparkles,
  AlertCircle,
  Link as LinkIcon
} from 'lucide-react';
import { MOCK_AUDITIONS } from '../constants';

const ApplyRole: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const audition = MOCK_AUDITIONS.find(a => a.id === id) || MOCK_AUDITIONS[0];
  
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    reelUrl: '',
    experience: '',
    availability: '',
    notes: ''
  });

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1 && !formData.reelUrl) newErrors.reelUrl = "Performance reel is mandatory.";
    if (step === 2 && !formData.experience) newErrors.experience = "Method acting context is required for this role.";
    if (step === 3 && !formData.availability) newErrors.availability = "Please confirm your shoot readiness date.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) setStep(s => s + 1);
  };

  const handleBack = () => setStep(s => s - 1);

  const handleFinish = () => {
    // In a real app, this would create a new Application entry and notify production
    console.log("NOTIFYING PRODUCTION: New application for", audition.roleName);
    navigate('/applications');
  };

  const steps = [
    { id: 1, label: 'Media', icon: <Video size={20} /> },
    { id: 2, label: 'Depth', icon: <Star size={20} /> },
    { id: 3, label: 'Readiness', icon: <Calendar size={20} /> },
    { id: 4, label: 'Finalize', icon: <Zap size={20} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Cinematic Progress Track */}
      <div className="flex justify-between items-center mb-16 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-900 -translate-y-1/2 z-0" />
        {steps.map((s) => (
          <div key={s.id} className="relative z-10 flex flex-col items-center gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 ${
              step >= s.id ? 'bg-red-600 border-red-500 text-white shadow-2xl shadow-red-600/30' : 'bg-neutral-900 border-white/5 text-neutral-600'
            }`}>
              {step > s.id ? <CheckCircle size={24} /> : s.icon}
            </div>
            <span className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors ${
              step >= s.id ? 'text-white' : 'text-neutral-700'
            }`}>{s.label}</span>
          </div>
        ))}
      </div>

      <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 shadow-3xl min-h-[550px] flex flex-col relative overflow-hidden">
        {/* Background Accent */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none" />

        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Media Proof</h2>
              <p className="text-neutral-500 font-medium">Link your most recent performance reel or character study.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Reel URL (Vimeo/YouTube/CLAP Vault)</label>
                <div className="relative">
                  <LinkIcon className={`absolute left-6 top-1/2 -translate-y-1/2 transition-colors ${errors.reelUrl ? 'text-red-500' : 'text-neutral-500'}`} size={20} />
                  <input 
                    type="url" 
                    value={formData.reelUrl}
                    onChange={e => { setFormData({...formData, reelUrl: e.target.value}); setErrors({}); }}
                    placeholder="https://vimeo.com/..."
                    className={`w-full bg-black/40 border rounded-2xl pl-16 pr-8 py-5 text-xl font-medium text-white outline-none transition-all placeholder:opacity-20 ${
                      errors.reelUrl ? 'border-red-600 ring-1 ring-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'border-white/5 focus:ring-2 focus:ring-red-600'
                    }`}
                  />
                </div>
                {errors.reelUrl && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-2 animate-pulse">
                    <AlertCircle size={14} /> {errors.reelUrl}
                  </p>
                )}
              </div>
              <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-[2.5rem] flex items-center gap-6">
                <Sparkles size={40} className="text-blue-500 flex-shrink-0" />
                <p className="text-xs text-neutral-400 leading-relaxed font-medium italic">"Genie suggests using a reel that showcases emotional vulnerability for this specific role."</p>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Emotional Depth</h2>
              <p className="text-neutral-500 font-medium">This role requires significant Method Acting experience. Describe your approach.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Approach to {audition.roleName}</label>
                <textarea 
                  rows={5}
                  value={formData.experience}
                  onChange={e => { setFormData({...formData, experience: e.target.value}); setErrors({}); }}
                  placeholder="Describe your process for inhabitating complex characters..."
                  className={`w-full bg-black/40 border rounded-[2rem] p-8 text-neutral-300 font-medium outline-none transition-all resize-none ${
                    errors.experience ? 'border-red-600 ring-1 ring-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'border-white/5 focus:ring-2 focus:ring-red-600'
                  }`}
                />
                {errors.experience && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-2 animate-pulse">
                    <AlertCircle size={14} /> {errors.experience}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Shoot Readiness</h2>
              <p className="text-neutral-500 font-medium">The production window starts soon. Confirm your first available date.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Available From</label>
                <input 
                  type="date" 
                  value={formData.availability}
                  onChange={e => { setFormData({...formData, availability: e.target.value}); setErrors({}); }}
                  className={`w-full bg-black/40 border rounded-2xl px-8 py-5 text-white font-bold outline-none transition-all ${
                    errors.availability ? 'border-red-600 ring-1 ring-red-600 shadow-[0_0_15px_rgba(220,38,38,0.2)]' : 'border-white/5 focus:ring-2 focus:ring-red-600'
                  }`}
                />
                {errors.availability && (
                  <p className="text-red-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ml-2 animate-pulse">
                    <AlertCircle size={14} /> {errors.availability}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Additional Logistics (Optional)</label>
                <input 
                  type="text" 
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  placeholder="e.g. Requires local transit assistance"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-neutral-400 font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all"
                />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 text-center py-8 animate-in zoom-in duration-500">
            <div className="w-32 h-32 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-red-600/40 transform rotate-12 mb-8">
               <Zap size={60} className="text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Slate Ready</h2>
              <p className="text-neutral-500 max-w-sm mx-auto font-medium">Your application will be distributed to the Production Lead's Mission Control immediately.</p>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 max-w-md mx-auto text-left space-y-3">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Project</span>
                  <span className="text-white">{audition.projectTitle}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Role</span>
                  <span className="text-red-500">{audition.roleName}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Status</span>
                  <span className="text-white">IMMEDIATE DISPATCH</span>
               </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-12 flex gap-4">
          {step > 1 && step < 4 && (
            <button 
              onClick={handleBack}
              className="px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all flex items-center gap-3"
            >
              <ChevronLeft size={18} /> Back
            </button>
          )}
          {step < 4 ? (
            <button 
              onClick={handleNext}
              className="flex-1 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-red-600/30 flex items-center justify-center gap-3"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="flex-1 px-10 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-white/10 flex items-center justify-center gap-3"
            >
              FINALIZE SUBMISSION <CheckCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplyRole;
