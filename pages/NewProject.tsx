
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
  Film,
  BrainCircuit,
  Wand2,
  Tv,
  ShoppingBag,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

interface ProjectTemplate {
  id: string;
  title: string;
  type: 'Feature Film' | 'Short Film' | 'Web Series' | 'Commercial';
  desc: string;
  icon: React.ReactNode;
  defaultBudget: string;
  defaultDuration: number;
}

const PROJECT_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'feature',
    title: 'Feature Narrative',
    type: 'Feature Film',
    desc: 'High-end narrative production.',
    icon: <Film className="w-6 h-6 md:w-8 md:h-8" />,
    defaultBudget: '4,50,00,000',
    defaultDuration: 45
  },
  {
    id: 'short',
    title: 'Short Cinematic',
    type: 'Short Film',
    desc: 'Festival-grade short film.',
    icon: <Clapperboard className="w-6 h-6 md:w-8 md:h-8" />,
    defaultBudget: '50,00,000',
    defaultDuration: 5
  },
  {
    id: 'web',
    title: 'Episodic Series',
    type: 'Web Series',
    desc: 'Multi-episode episodic logic.',
    icon: <Tv className="w-6 h-6 md:w-8 md:h-8" />,
    defaultBudget: '2,00,00,000',
    defaultDuration: 90
  },
  {
    id: 'commercial',
    title: 'Brand / Spot',
    type: 'Commercial',
    desc: 'Fast-paced agency shoots.',
    icon: <ShoppingBag className="w-6 h-6 md:w-8 md:h-8" />,
    defaultBudget: '15,00,000',
    defaultDuration: 2
  }
];

const NewProject: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [useGenie, setUseGenie] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    type: 'Feature Film' as any,
    location: 'Mumbai, India',
    startDate: '',
    budget: '',
    description: ''
  });

  const handleTemplateSelect = (template: ProjectTemplate) => {
    setSelectedTemplate(template.id);
    setFormData({
      ...formData,
      type: template.type,
      budget: template.defaultBudget,
    });
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFinish = () => {
    navigate('/projects');
  };

  const steps = [
    { id: 1, label: 'Template', icon: <Layers className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 2, label: 'Logistics', icon: <MapPin className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 3, label: 'Budget', icon: <DollarSign className="w-4 h-4 md:w-5 md:h-5" /> },
    { id: 4, label: 'Launch', icon: <Zap className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-16 px-4 md:px-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-24">
      
      {/* Progress Track: Responsive Grid/Flex */}
      <div className="flex items-center justify-between mb-8 md:mb-16 max-w-4xl mx-auto px-2">
        {steps.map((s, i) => (
          <React.Fragment key={s.id}>
            <div className="flex flex-col items-center gap-2 md:gap-3 relative">
              <div className={`w-8 h-8 md:w-14 md:h-14 rounded-lg md:rounded-2xl flex items-center justify-center border transition-all duration-700 ${
                step >= s.id 
                  ? 'bg-red-600 border-red-500 text-white shadow-lg' 
                  : 'bg-neutral-900 border-white/5 text-neutral-600'
              }`}>
                {step > s.id ? <CheckCircle className="w-4 h-4 md:w-6 md:h-6" /> : s.icon}
              </div>
              <span className={`hidden sm:block text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] ${
                step >= s.id ? 'text-white' : 'text-neutral-700'
              }`}>{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-[1px] md:h-[2px] flex-1 mx-2 md:mx-4 transition-all duration-1000 ${
                step > s.id ? 'bg-red-600' : 'bg-neutral-800'
              }`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="glass-panel rounded-[2rem] md:rounded-[4rem] p-6 md:p-16 shadow-3xl min-h-[500px] flex flex-col relative overflow-hidden bg-neutral-900/60 backdrop-blur-3xl border border-white/5">
        
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 p-12 md:p-20 opacity-[0.02] pointer-events-none rotate-12 hidden lg:block">
           <Clapperboard className="w-[300px] h-[300px] md:w-[500px] md:h-[500px]" />
        </div>

        {/* Step 1: Template Selection */}
        {step === 1 && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
            <div className="space-y-4">
               <h2 className="text-4xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Blueprint <br />Selection</h2>
               <p className="text-neutral-500 font-medium text-sm md:text-xl max-w-xl">Initialize your production logic with a pre-configured slate stack.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
               {PROJECT_TEMPLATES.map(template => (
                 <button 
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`group p-6 md:p-8 rounded-[2rem] border text-left transition-all duration-300 relative overflow-hidden active-scale ${
                    selectedTemplate === template.id 
                      ? 'bg-red-600 border-red-500 text-white shadow-2xl' 
                      : 'bg-black/40 border-white/5 text-neutral-500 hover:border-red-600/30'
                  }`}
                 >
                    <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-xl md:rounded-2xl inline-flex transition-all ${
                      selectedTemplate === template.id ? 'bg-white/20 text-white' : 'bg-neutral-800 text-neutral-500 group-hover:text-red-500'
                    }`}>
                       {template.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase mb-1 ${
                      selectedTemplate === template.id ? 'text-white' : 'text-white'
                    }`}>{template.title}</h3>
                    <p className={`text-[10px] font-bold uppercase leading-relaxed opacity-60`}>{template.desc}</p>
                 </button>
               ))}
            </div>

            <div className="space-y-3">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Mission Name (Project Title) *</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g. THE MIDNIGHT SCRIPT"
                  className="w-full bg-black/40 border border-white/5 rounded-2xl md:rounded-[2rem] px-6 md:px-10 py-5 md:py-8 text-xl md:text-4xl font-cinematic text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800"
                />
            </div>

            <button 
               onClick={() => setUseGenie(!useGenie)}
               className={`w-full md:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 rounded-2xl border transition-all ${
                 useGenie ? 'bg-red-600/20 border-red-600 text-red-500 shadow-xl' : 'bg-black/20 border-white/10 text-neutral-500 hover:text-white'
               }`}
            >
               <BrainCircuit className={`w-5 h-5 ${useGenie ? 'animate-pulse' : ''}`} />
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">{useGenie ? 'GENIE ASSISTANCE ACTIVE' : 'ENABLE AI BREAKDOWN'}</span>
            </button>
          </div>
        )}

        {/* Step 2: Logistics Hub */}
        {step === 2 && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Base Camp <br />Logistics</h2>
              <p className="text-neutral-500 font-medium text-sm md:text-xl">Define the environmental parameters of your mission.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
              <div className="space-y-3">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Primary Hub Location</label>
                <div className="relative">
                   <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500" size={20} />
                   <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="e.g. Mumbai, India"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl md:rounded-[1.5rem] pl-16 pr-6 py-5 text-lg text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Target Launch Date</label>
                <div className="relative">
                   <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500" size={20} />
                   <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-2xl md:rounded-[1.5rem] pl-16 pr-6 py-5 text-lg text-white font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                   />
                </div>
              </div>
            </div>

            <div className="p-6 md:p-10 bg-blue-600/5 border border-blue-600/20 rounded-[2rem] md:rounded-[3rem] flex items-start md:items-center gap-6 shadow-xl">
               <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                  <Sparkles className="w-6 h-6 md:w-10 md:h-10" />
               </div>
               <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">GENIE LOGISTICS PREDICTION</h4>
                  <p className="text-xs md:text-sm text-neutral-400 font-medium italic leading-relaxed">
                    "I've flagged 3 local rental units near your hub with 8K production packages available for your target dates."
                  </p>
               </div>
            </div>
          </div>
        )}

        {/* Step 3: Capital & Treasury */}
        {step === 3 && (
          <div className="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 relative z-10">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">The <br />Treasury</h2>
              <p className="text-neutral-500 font-medium text-sm md:text-xl">Secure your capital for high-performance disbursement.</p>
            </div>

            <div className="space-y-4">
              <label className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Estimated Slate Budget (₹)</label>
              <div className="relative">
                 <DollarSign className="absolute left-6 md:left-10 top-1/2 -translate-y-1/2 text-green-500" size={32} />
                 <input 
                  type="text" 
                  value={formData.budget}
                  onChange={e => setFormData({...formData, budget: e.target.value})}
                  placeholder="0.00"
                  className="w-full bg-black/40 border border-white/5 rounded-[1.5rem] md:rounded-[3rem] pl-16 md:pl-24 pr-6 md:pr-10 py-8 md:py-14 text-3xl md:text-6xl font-cinematic text-white outline-none focus:ring-1 focus:ring-red-600 transition-all shadow-inner"
                 />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 md:p-8 bg-neutral-900 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] space-y-4 shadow-xl">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h4 className="text-lg md:text-xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Escrow Protocol</h4>
                 <p className="text-xs text-neutral-500 leading-relaxed font-medium">Verified capital protection. Funds are only disbursed upon department lead sign-off.</p>
              </div>
              <div className="p-6 md:p-8 bg-neutral-900 border border-white/5 rounded-[2rem] md:rounded-[2.5rem] space-y-4 shadow-xl">
                 <div className="w-10 h-10 md:w-12 md:h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500">
                    <Info className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h4 className="text-lg md:text-xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Tax Compliance</h4>
                 <p className="text-xs text-neutral-500 leading-relaxed font-medium">Automatic TDS, GST, and PPA management integrated for all slate disbursements.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Ready to Roll */}
        {step === 4 && (
          <div className="space-y-10 text-center py-10 md:py-16 animate-in zoom-in duration-1000 relative z-10 flex-1 flex flex-col justify-center">
            <div className="w-24 h-24 md:w-40 md:h-40 bg-red-600 rounded-[2rem] md:rounded-[3rem] flex items-center justify-center mx-auto shadow-3xl transform rotate-12 mb-8 animate-pulse">
               <Zap className="w-12 h-12 md:w-20 md:h-20 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-5xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Mission <br />Ready</h2>
              <p className="text-neutral-500 max-w-sm mx-auto font-medium text-sm md:text-xl italic">"Your cinematic workspace has been synthesized. All systems operational."</p>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 max-w-md mx-auto text-left space-y-4 shadow-2xl backdrop-blur-3xl mt-8">
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[8px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Slate Entry</span>
                  <span className="text-lg md:text-2xl font-cinematic font-bold text-white tracking-widest uppercase">{formData.title || 'UNNAMED'}</span>
               </div>
               <div className="flex justify-between items-center border-b border-white/5 pb-3">
                  <span className="text-[8px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Logic Stack</span>
                  <span className="text-lg md:text-2xl font-cinematic font-bold text-red-500 tracking-widest uppercase">{formData.type}</span>
               </div>
               <div className="flex justify-between items-center">
                  <span className="text-[8px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest">Network Status</span>
                  <span className="text-sm md:text-lg font-cinematic font-bold text-green-500 tracking-widest uppercase">ENCRYPTED</span>
               </div>
            </div>
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-auto pt-10 md:pt-16 flex flex-col md:flex-row gap-4 relative z-10">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="w-full md:w-auto px-10 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 active-scale"
            >
              <ChevronLeft size={18} /> Back Phase
            </button>
          )}
          {step < 4 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 && !formData.title}
              className="flex-1 px-10 py-5 bg-red-600 hover:bg-red-700 disabled:opacity-30 disabled:grayscale disabled:cursor-not-allowed text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-3 active-scale"
            >
              Initialize Next Phase <ChevronRight size={18} />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="flex-1 px-10 py-6 md:py-10 bg-white text-black font-black rounded-2xl md:rounded-[2.5rem] text-xs md:text-lg uppercase tracking-[0.4em] transition-all shadow-2xl flex items-center justify-center gap-4 hover:bg-neutral-200 active-scale"
            >
              LAUNCH SLATE <Zap className="w-5 h-5 md:w-7 md:h-7" />
            </button>
          )}
        </div>
      </div>
      
      {/* Visual Footer */}
      <div className="mt-8 text-center">
         <p className="text-[8px] md:text-[10px] font-black text-neutral-800 uppercase tracking-[0.5em]">CLAP OS • MISSION CONTROL v4.2 • ENCRYPTED SESSION</p>
      </div>
    </div>
  );
};

export default NewProject;
