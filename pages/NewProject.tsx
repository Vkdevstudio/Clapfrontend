
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronLeft, 
  Clapperboard, 
  MapPin, 
  Calendar, 
  DollarSign, 
  CheckCircle,
  Zap,
  ShieldCheck,
  Film
} from 'lucide-react';

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    type: 'Feature Film',
    location: '',
    startDate: '',
    budget: '',
    description: ''
  });

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleFinish = () => {
    // In a real app, this would dispatch to a global store or API
    navigate('/projects');
  };

  const steps = [
    { id: 1, label: 'Identity', icon: <Clapperboard size={20} /> },
    { id: 2, label: 'Logistics', icon: <MapPin size={20} /> },
    { id: 3, label: 'Financials', icon: <DollarSign size={20} /> },
    { id: 4, label: 'Launch', icon: <Zap size={20} /> }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Progress Track */}
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

      <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 shadow-3xl min-h-[500px] flex flex-col">
        {step === 1 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Creative Identity</h2>
              <p className="text-neutral-500 font-medium">Define the core concept of your next production.</p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., NEON MONSOON"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:opacity-20"
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Production Type</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['Feature Film', 'Short Film', 'Web Series', 'Commercial'].map(t => (
                    <button 
                      key={t}
                      onClick={() => setFormData({...formData, type: t as any})}
                      className={`py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                        formData.type === t ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black/20 border-white/5 text-neutral-600 hover:text-white'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Set Logistics</h2>
              <p className="text-neutral-500 font-medium">Where and when does the first slate roll?</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Primary Location</label>
                <div className="relative">
                   <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                   <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Mumbai, India"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Target Start Date</label>
                <div className="relative">
                   <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                   <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-2">
              <h2 className="text-5xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Financial Blueprint</h2>
              <p className="text-neutral-500 font-medium">Initial resource allocation for pre-production and rentals.</p>
            </div>
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Total Project Budget</label>
                <div className="relative">
                   <DollarSign className="absolute left-6 top-1/2 -translate-y-1/2 text-green-500" size={20} />
                   <input 
                    type="text" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    placeholder="50,00,000"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-2xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
              <div className="p-8 bg-blue-600/5 border border-blue-600/10 rounded-[2rem] flex items-center gap-6">
                 <ShieldCheck size={40} className="text-blue-500 flex-shrink-0" />
                 <p className="text-xs text-neutral-400 leading-relaxed font-medium italic">"Genie suggests allocating 15% of this budget specifically for contingency and weather-related logistic adjustments."</p>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-10 text-center py-8 animate-in zoom-in duration-500">
            <div className="w-32 h-32 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-red-600/40 transform rotate-12 mb-8">
               <Film size={60} className="text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Ready for Slate</h2>
              <p className="text-neutral-500 max-w-sm mx-auto font-medium">Your production environment is prepared. All crew notifications are queued for dispatch.</p>
            </div>
            <div className="bg-black/40 border border-white/5 rounded-[2rem] p-8 max-w-md mx-auto text-left space-y-3">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Project</span>
                  <span className="text-white">{formData.title || 'UNTITLED SLATE'}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Location</span>
                  <span className="text-white">{formData.location || 'GLOBAL'}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                  <span className="text-neutral-600">Status</span>
                  <span className="text-red-500">PRE-PRODUCTION</span>
               </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-12 flex gap-4">
          {step > 1 && (
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
              disabled={step === 1 && !formData.title}
              className="flex-1 px-10 py-5 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-red-600/30 flex items-center justify-center gap-3"
            >
              Continue <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="flex-1 px-10 py-5 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all shadow-3xl shadow-white/10 flex items-center justify-center gap-3"
            >
              INITIALIZE PROJECT <Zap size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProject;
