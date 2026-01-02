
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
  Sparkles
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
    desc: 'High-end cinema with complex logistics and 40+ crew.',
    icon: <Film size={32} />,
    defaultBudget: '4,50,00,000',
    defaultDuration: 45
  },
  {
    id: 'short',
    title: 'Short Cinematic',
    type: 'Short Film',
    desc: 'Festival-grade storytelling for quick production cycles.',
    icon: <Clapperboard size={32} />,
    defaultBudget: '5,00,000',
    defaultDuration: 5
  },
  {
    id: 'web',
    title: 'Episodic Series',
    type: 'Web Series',
    desc: 'Optimized for recurring cast and multi-episode tracking.',
    icon: <Tv size={32} />,
    defaultBudget: '2,00,00,000',
    defaultDuration: 90
  },
  {
    id: 'commercial',
    title: 'Brand / Commercial',
    type: 'Commercial',
    desc: 'Fast-paced, high-quality shoots for agencies.',
    icon: <ShoppingBag size={32} />,
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

  const handleNext = () => setStep(s => s + 1);
  const handleBack = () => setStep(s => s - 1);
  const handleFinish = () => {
    navigate('/projects');
  };

  const steps = [
    { id: 1, label: 'Template', icon: <Layers size={20} /> },
    { id: 2, label: 'Logistics', icon: <MapPin size={20} /> },
    { id: 3, label: 'Financials', icon: <DollarSign size={20} /> },
    { id: 4, label: 'Launch', icon: <Zap size={20} /> }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
      {/* Progress Track */}
      <div className="flex justify-between items-center mb-16 relative px-10">
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

      <div className="bg-neutral-900 border border-white/5 rounded-[4rem] p-12 md:p-16 shadow-3xl min-h-[600px] flex flex-col relative overflow-hidden">
        {/* Abstract Background Accent */}
        <div className="absolute top-0 right-0 p-20 opacity-[0.03] pointer-events-none rotate-12">
           <Clapperboard size={400} />
        </div>

        {step === 1 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
               <div className="space-y-3">
                 <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Choose Blueprint</h2>
                 <p className="text-neutral-500 font-medium text-lg">Select a production template to pre-configure your Mission Control.</p>
               </div>
               <button 
                  onClick={() => setUseGenie(!useGenie)}
                  className={`flex items-center gap-3 px-8 py-5 rounded-2xl border transition-all active-scale ${
                    useGenie ? 'bg-red-600/20 border-red-600 text-red-500 shadow-xl' : 'bg-black/40 border-white/5 text-neutral-600 hover:text-white'
                  }`}
               >
                  <BrainCircuit size={18} className={useGenie ? 'animate-pulse' : ''} />
                  <span className="text-[10px] font-black uppercase tracking-widest">{useGenie ? 'AI Genie Breakdown' : 'Manual Slate'}</span>
               </button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
               {PROJECT_TEMPLATES.map(template => (
                 <button 
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`group p-8 rounded-[2.5rem] border text-left transition-all relative overflow-hidden active-scale ${
                    selectedTemplate === template.id 
                      ? 'bg-red-600 border-red-500 text-white shadow-3xl shadow-red-600/20' 
                      : 'bg-black/40 border-white/5 text-neutral-500 hover:border-red-600/30'
                  }`}
                 >
                    <div className={`mb-6 p-4 rounded-2xl inline-block transition-colors ${
                      selectedTemplate === template.id ? 'bg-white/20 text-white' : 'bg-neutral-900 text-neutral-600 group-hover:text-red-500'
                    }`}>
                       {template.icon}
                    </div>
                    <h3 className={`text-2xl font-cinematic font-bold tracking-widest uppercase mb-2 ${
                      selectedTemplate === template.id ? 'text-white' : 'text-white group-hover:text-red-500 transition-colors'
                    }`}>{template.title}</h3>
                    <p className={`text-[10px] font-bold uppercase leading-relaxed ${
                      selectedTemplate === template.id ? 'text-red-100' : 'text-neutral-600'
                    }`}>{template.desc}</p>
                 </button>
               ))}
            </div>

            <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Project Title</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., THE FINAL SHOT"
                  className="w-full bg-black/40 border border-white/5 rounded-3xl px-10 py-6 text-2xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all placeholder:opacity-20 shadow-2xl"
                />
            </div>

            {useGenie && (
               <div className="p-10 bg-red-600/5 border border-red-600/20 rounded-[3rem] space-y-4 animate-in slide-in-from-bottom-4 shadow-2xl">
                  <div className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase tracking-widest">
                     <Wand2 size={20} className="animate-pulse" /> Genie Intelligence
                  </div>
                  <p className="text-sm text-neutral-400 font-medium italic">"Tell me the core plot points of your production. I will auto-generate your scene breakdown and crew requirements."</p>
                  <textarea 
                     className="w-full bg-black/40 border border-white/5 rounded-2xl p-8 text-lg text-white focus:ring-1 focus:ring-red-600 resize-none outline-none font-script"
                     placeholder="A detective hunts a ghost in 1950s Mumbai..."
                     rows={3}
                  />
               </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-3">
              <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Logistics</h2>
              <p className="text-neutral-500 font-medium text-lg">Define the physical environment and timeframe.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Base Camp Hub</label>
                <div className="relative">
                   <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 text-red-500" size={24} />
                   <input 
                    type="text" 
                    value={formData.location}
                    onChange={e => setFormData({...formData, location: e.target.value})}
                    placeholder="Mumbai, India"
                    className="w-full bg-black/40 border border-white/5 rounded-3xl pl-20 pr-8 py-6 text-xl text-white font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all shadow-xl"
                   />
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Estimated Wrap Date</label>
                <div className="relative">
                   <Calendar className="absolute left-8 top-1/2 -translate-y-1/2 text-blue-500" size={24} />
                   <input 
                    type="date" 
                    value={formData.startDate}
                    onChange={e => setFormData({...formData, startDate: e.target.value})}
                    className="w-full bg-black/40 border border-white/5 rounded-3xl pl-20 pr-8 py-6 text-xl text-white font-bold outline-none focus:ring-2 focus:ring-red-600 transition-all shadow-xl"
                   />
                </div>
              </div>
            </div>
            <div className="p-10 bg-neutral-900 border border-white/5 rounded-[2.5rem] flex items-center gap-8 shadow-2xl">
               <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Sparkles size={32} />
               </div>
               <div>
                  <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em] mb-1">Genie Pro Tip</h4>
                  <p className="text-sm text-neutral-400 font-medium italic">"Monsoon starts in Mumbai soon. I suggest adding 3 rainy-day cover sets to your logistics plan."</p>
               </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="space-y-3">
              <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">The Treasury</h2>
              <p className="text-neutral-500 font-medium text-lg">Allocate resources for a secure production lifecycle.</p>
            </div>
            <div className="space-y-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Total Slate Budget (₹)</label>
                <div className="relative">
                   <DollarSign className="absolute left-10 top-1/2 -translate-y-1/2 text-green-500" size={32} />
                   <input 
                    type="text" 
                    value={formData.budget}
                    onChange={e => setFormData({...formData, budget: e.target.value})}
                    placeholder="50,00,000"
                    className="w-full bg-black/40 border border-white/5 rounded-[3rem] pl-24 pr-10 py-10 text-6xl font-cinematic text-white outline-none focus:ring-2 focus:ring-red-600 transition-all shadow-3xl"
                   />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-10 bg-green-500/5 border border-green-500/20 rounded-[3rem] space-y-4 shadow-2xl">
                   <ShieldCheck size={40} className="text-green-500" />
                   <h5 className="text-xl font-cinematic font-bold uppercase tracking-widest text-white">Escrow Protection</h5>
                   <p className="text-xs text-neutral-400 leading-relaxed font-medium">Funds are securely held and released only upon crew/vendor sign-off. Eliminates payment friction.</p>
                </div>
                <div className="p-10 bg-neutral-900 border border-white/5 rounded-[3rem] space-y-4 shadow-2xl">
                   <CheckCircle size={40} className="text-blue-500" />
                   <h5 className="text-xl font-cinematic font-bold uppercase tracking-widest text-white">Automated Invoicing</h5>
                   <p className="text-xs text-neutral-400 leading-relaxed font-medium">All vendor payments automatically generate TDS-compliant invoices for your accountants.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-12 text-center py-12 animate-in zoom-in duration-700">
            <div className="w-40 h-40 bg-red-600 rounded-[3.5rem] flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(220,38,38,0.4)] transform rotate-12 mb-12 animate-bounce">
               <Film size={80} className="text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-6xl md:text-9xl font-cinematic font-bold tracking-tight text-white uppercase leading-none">Mission Ready</h2>
              <p className="text-neutral-500 max-w-md mx-auto font-medium text-lg leading-relaxed">Your cinematic workspace is primed. All templates and logistics are synchronized.</p>
            </div>
            <div className="bg-black/60 border border-white/10 rounded-[3rem] p-12 max-w-xl mx-auto text-left space-y-4 shadow-3xl backdrop-blur-3xl border-t-red-600/30">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
                  <span className="text-neutral-600">Slate Identity</span>
                  <span className="text-white">{formData.title || 'UNNAMED VISION'}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
                  <span className="text-neutral-600">Production Type</span>
                  <span className="text-red-500">{formData.type}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em]">
                  <span className="text-neutral-600">Trust Layer</span>
                  <span className="text-green-500">ESCROW ACTIVE</span>
               </div>
            </div>
          </div>
        )}

        <div className="mt-auto pt-16 flex gap-6 relative z-10">
          {step > 1 && (
            <button 
              onClick={handleBack}
              className="px-12 py-6 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-[2rem] text-[11px] uppercase tracking-[0.4em] transition-all flex items-center gap-3 active-scale shadow-xl"
            >
              <ChevronLeft size={20} /> Back
            </button>
          )}
          {step < 4 ? (
            <button 
              onClick={handleNext}
              disabled={step === 1 && !formData.title}
              className="flex-1 px-12 py-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-[2rem] text-[11px] uppercase tracking-[0.4em] transition-all shadow-3xl shadow-red-600/30 flex items-center justify-center gap-3 active-scale"
            >
              Next Phase <ChevronRight size={20} />
            </button>
          ) : (
            <button 
              onClick={handleFinish}
              className="flex-1 px-12 py-6 bg-white text-black font-black rounded-[2rem] text-[11px] uppercase tracking-[0.4em] transition-all shadow-3xl shadow-white/20 flex items-center justify-center gap-3 active-scale"
            >
              INITIALIZE WORKSPACE <Zap size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProject;
