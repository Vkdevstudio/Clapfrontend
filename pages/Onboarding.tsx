
import React, { useState } from 'react';
import { UserRole, OnboardingStep } from '../types';
import { 
  User, Video, ShieldCheck, ChevronRight, Truck, Star, Sparkles, 
  Clapperboard, Camera, Briefcase, Info, Check, ArrowRight, ArrowLeft,
  Mail, Phone, MapPin, Zap
} from 'lucide-react';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

const stepMap: Record<string, OnboardingStep> = {
  BASIC_DETAILS: "BASIC_DETAILS",
  ROLE_SELECTION: "ROLE_SELECTION",
  TALENT: "ONBOARD_TALENT",
  PRODUCTION: "ONBOARD_PRODUCTION",
  VENDOR: "ONBOARD_VENDOR",
  REVIEW: "REVIEW",
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("BASIC_DETAILS");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    specialty: '',
    location: '',
    bio: '',
    portfolioUrl: '',
    companyName: '',
    experience: 'Intermediate'
  });

  const nextStep = (step: OnboardingStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  };

  const handleFinish = () => {
    if (selectedRole) onComplete(selectedRole);
  };

  const progressPercentage = {
    BASIC_DETAILS: 20,
    ROLE_SELECTION: 40,
    ONBOARD_TALENT: 70,
    ONBOARD_PRODUCTION: 70,
    ONBOARD_VENDOR: 70,
    REVIEW: 100,
  }[currentStep];

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Cinematic Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-white/5">
        <div 
          className="h-full bg-red-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(220,38,38,0.5)]" 
          style={{ width: `${progressPercentage}%` }} 
        />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen flex flex-col">
        
        {/* Step: Basic Details */}
        {currentStep === "BASIC_DETAILS" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Global Identity</h1>
              <p className="text-neutral-500 text-lg font-medium">Establish your professional footprint on the CLAP network.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Full Legal Name</label>
                <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Vinod S."
                    className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-lg font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Email Dispatch</label>
                <div className="relative">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="contact@pro.clap"
                    className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-lg font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Professional Summary</label>
              <textarea 
                value={formData.bio}
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
                rows={4}
                placeholder="Briefly describe your cinematic journey..."
                className="w-full bg-neutral-900 border border-white/5 rounded-[2rem] p-8 text-lg font-medium outline-none focus:ring-1 focus:ring-red-600 transition-all resize-none"
              />
            </div>

            <button 
              onClick={() => nextStep("ROLE_SELECTION")}
              disabled={!formData.name || !formData.email}
              className="w-full py-6 bg-red-600 hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all active-scale"
            >
              Initialize Profile <ArrowRight size={18} className="inline ml-2" />
            </button>
          </div>
        )}

        {/* Step: Role Selection */}
        {currentStep === "ROLE_SELECTION" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Workflow Fork</h1>
              <p className="text-neutral-500 text-lg font-medium">Select your primary role. This defines your Mission Control tools.</p>
            </div>

            <div className="grid gap-6">
              {[
                { role: 'talent' as UserRole, title: 'CREATIVE TALENT', desc: 'Actors, Crew, and Freelancers.', icon: <Star size={32} /> },
                { role: 'production' as UserRole, title: 'PRODUCTION LEAD', desc: 'Filmmakers, Studios, and YouTube Leads.', icon: <Video size={32} /> },
                { role: 'vendor' as UserRole, title: 'SERVICE VENDOR', desc: 'Rentals, Studios, and Tech Providers.', icon: <Truck size={32} /> }
              ].map(item => (
                <button 
                  key={item.role}
                  onClick={() => {
                    setSelectedRole(item.role);
                    const next = item.role === 'talent' ? "ONBOARD_TALENT" : item.role === 'production' ? "ONBOARD_PRODUCTION" : "ONBOARD_VENDOR";
                    nextStep(next as OnboardingStep);
                  }}
                  className="group p-10 bg-neutral-900 border border-white/5 rounded-[3rem] text-left flex items-center gap-10 hover:border-red-600/40 transition-all relative overflow-hidden active-scale shadow-2xl"
                >
                  <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-neutral-600 group-hover:text-red-500 transition-colors">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-3xl font-cinematic font-bold tracking-widest text-white uppercase">{item.title}</h3>
                    <p className="text-neutral-500 font-medium">{item.desc}</p>
                  </div>
                  <ChevronRight size={32} className="text-neutral-800 group-hover:text-white transition-colors" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Role Specifics: Talent */}
        {currentStep === "ONBOARD_TALENT" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-red-500">
                  <Star size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Talent Onboarding</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Craft Details</h1>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-12 rounded-[3.5rem] space-y-10">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Core Specialty</label>
                 <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-lg font-bold appearance-none outline-none focus:ring-1 focus:ring-red-600">
                    <option>Leading Actor / Performance</option>
                    <option>Cinematography / DP</option>
                    <option>Directing / Writing</option>
                    <option>Stunt Coordination</option>
                    <option>Sound Design</option>
                 </select>
               </div>

               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Showreel / Portfolio URL</label>
                 <div className="relative">
                    <Zap className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
                    <input 
                      type="url" 
                      placeholder="vimeo.com/your-work"
                      className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-lg font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                 </div>
                 <p className="text-[9px] text-neutral-600 uppercase font-bold tracking-widest ml-2">Genie uses this to auto-tag your skills.</p>
               </div>
            </div>

            <button onClick={() => nextStep("REVIEW")} className="w-full py-6 bg-white text-black font-black rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale">
               Review Submission <ArrowRight size={18} className="inline ml-2" />
            </button>
          </div>
        )}

        {/* Role Specifics: Production */}
        {currentStep === "ONBOARD_PRODUCTION" && (
          <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700">
            <div className="space-y-4">
               <div className="flex items-center gap-2 text-red-500">
                  <Video size={24} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Production Onboarding</span>
               </div>
               <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Slate Logic</h1>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-12 rounded-[3.5rem] space-y-10">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Production Entity Name</label>
                 <input 
                    type="text" 
                    placeholder="e.g. Dharma Productions"
                    className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-lg font-bold outline-none focus:ring-1 focus:ring-red-600 transition-all"
                 />
               </div>

               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Production Scale</label>
                 <div className="grid grid-cols-2 gap-4">
                    {['Indie / Amateur', 'Boutique Studio', 'Major Production', 'Agency'].map(scale => (
                      <button key={scale} className="py-4 bg-black/40 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-red-600 hover:text-red-500 transition-all">
                        {scale}
                      </button>
                    ))}
                 </div>
               </div>
            </div>

            <button onClick={() => nextStep("REVIEW")} className="w-full py-6 bg-white text-black font-black rounded-[2rem] text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale">
               Review Submission <ArrowRight size={18} className="inline ml-2" />
            </button>
          </div>
        )}

        {/* Step: Review & Finalize */}
        {currentStep === "REVIEW" && (
          <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
            <div className="text-center space-y-6">
               <div className="w-24 h-24 bg-red-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl shadow-red-600/40 transform rotate-12">
                  <Check size={48} className="text-white" strokeWidth={4} />
               </div>
               <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Ready to Wrap</h1>
               <p className="text-neutral-500 text-lg font-medium">Your profile logic is verified. You're entering the network with an initial Clap Score of <span className="text-white">100</span>.</p>
            </div>

            <div className="bg-neutral-900 border border-white/10 rounded-[4rem] p-12 space-y-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                  <Sparkles size={200} />
               </div>
               
               <div className="grid gap-6">
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                     <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Professional Identity</span>
                     <span className="text-2xl font-cinematic font-bold text-white uppercase">{formData.name}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                     <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Workflow Role</span>
                     <span className="text-2xl font-cinematic font-bold text-red-500 uppercase">{selectedRole}</span>
                  </div>
                  <div className="flex justify-between items-end border-b border-white/5 pb-4">
                     <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Escrow Activation</span>
                     <span className="text-2xl font-cinematic font-bold text-green-500 uppercase">STANDBY</span>
                  </div>
               </div>

               <div className="p-8 bg-red-600/5 border border-red-600/10 rounded-[2rem] flex items-center gap-6">
                  <ShieldCheck size={40} className="text-red-500 flex-shrink-0" />
                  <p className="text-xs text-neutral-400 leading-relaxed font-medium italic">"By finalizing, you agree to the CLAP Code of Ethics. Every successful project wrap increases your Global Clap Score."</p>
               </div>

               <button 
                onClick={handleFinish}
                className="w-full py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2.5rem] text-xs uppercase tracking-[0.5em] shadow-3xl shadow-red-600/50 transition-all active-scale"
               >
                 ENTER MISSION CONTROL
               </button>
            </div>

            <button onClick={() => nextStep("ROLE_SELECTION")} className="w-full text-neutral-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all">
               ← Modify Selection
            </button>
          </div>
        )}

        <footer className="mt-auto pt-12 text-center">
           <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-800 font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Military-Grade Profile Encryption Active
           </div>
        </footer>
      </div>
    </div>
  );
};

const RoleButton = ({ onClick, icon, title, desc }: { onClick: () => void, icon: React.ReactNode, title: string, desc: string }) => (
  <button 
    onClick={onClick}
    className="group p-10 rounded-[2.5rem] border border-white/5 bg-neutral-900/40 backdrop-blur-3xl hover:bg-neutral-800/60 transition-all text-left flex items-center gap-10 relative overflow-hidden active-scale shadow-2xl"
  >
    <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 transition-opacity">
       {icon}
    </div>
    <div className="p-6 rounded-3xl bg-black border border-white/5 group-hover:border-red-600/50 group-hover:text-red-500 transition-all duration-500 shadow-xl">
      {icon}
    </div>
    <div className="flex-1 relative z-10 space-y-2">
      <h3 className="text-3xl font-cinematic font-bold tracking-widest group-hover:text-red-500 transition-colors uppercase text-white">{title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed max-w-xs font-medium">{desc}</p>
    </div>
    <div className="w-12 h-12 bg-neutral-900 rounded-2xl flex items-center justify-center text-neutral-700 group-hover:text-white group-hover:bg-red-600 transition-all duration-500 shadow-2xl">
      <ChevronRight size={24} />
    </div>
  </button>
);

export default Onboarding;
