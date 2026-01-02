
import React, { useState } from 'react';
import { UserRole } from '../types';
import { User, Video, ShieldCheck, ChevronRight, Truck, Star, Sparkles } from 'lucide-react';

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep(2);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-black selection:bg-red-600 selection:text-white">
      <div className="w-full max-w-xl animate-in fade-in zoom-in duration-500">
        {step === 1 && (
          <div className="space-y-12 text-center">
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="bg-red-600 p-3 rounded-2xl shadow-2xl shadow-red-600/40 transform -rotate-6">
                   <ClapIcon size={40} className="text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-cinematic font-bold tracking-tight">IDENTITY SELECTION</h1>
              <p className="text-neutral-500 max-w-sm mx-auto">Choose your primary workflow. You can manage multiple roles from your settings later.</p>
            </div>

            <div className="grid gap-4">
              <RoleButton 
                onClick={() => handleRoleSelect('talent')}
                icon={<Star size={32} />}
                title="CREATIVE TALENT"
                desc="Actors, technicians, and freelancers looking for the next breakthrough."
              />
              <RoleButton 
                onClick={() => handleRoleSelect('production')}
                icon={<Video size={32} />}
                title="PRODUCTION LEAD"
                desc="Filmmakers, studios, and creators building their next production slate."
              />
              <RoleButton 
                onClick={() => handleRoleSelect('vendor')}
                icon={<Truck size={32} />}
                title="SERVICE VENDOR"
                desc="Equipment rentals, studios, and specialized technical providers."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10">
             <div className="text-center space-y-4">
                <div className="bg-red-600/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto border border-red-600/20">
                  <ShieldCheck size={40} className="text-red-500" />
                </div>
                <h2 className="text-4xl font-cinematic font-bold tracking-tight">VERIFY & LAUNCH</h2>
                <p className="text-neutral-500">CLAP is a verified professional network. Let's set up your profile.</p>
             </div>

             <div className="bg-neutral-900/50 p-8 rounded-[2rem] border border-white/5 shadow-2xl backdrop-blur-xl space-y-6">
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                   {selectedRole === 'vendor' ? 'BUSINESS LEGAL NAME' : 'PROFESSIONAL NAME'}
                 </label>
                 <input 
                  type="text" 
                  autoFocus
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-white font-medium"
                  placeholder={selectedRole === 'vendor' ? 'ARRI Rentals Mumbai' : 'Vinod S.'}
                 />
               </div>
               
               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">
                   {selectedRole === 'vendor' ? 'PRIMARY SERVICE CATEGORY' : 'CORE SPECIALTY'}
                 </label>
                 <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-neutral-400">
                    {selectedRole === 'vendor' ? (
                      <>
                        <option>Equipment Rental</option>
                        <option>Studio Space</option>
                        <option>Post Production</option>
                        <option>Technical Crewing</option>
                      </>
                    ) : selectedRole === 'production' ? (
                      <>
                        <option>Feature Films</option>
                        <option>YouTube / Content Creation</option>
                        <option>Commercial Production</option>
                        <option>Animation Studio</option>
                      </>
                    ) : (
                      <>
                        <option>Acting / Performance</option>
                        <option>Cinematography</option>
                        <option>Direction / Writing</option>
                        <option>Technical Crew</option>
                      </>
                    )}
                 </select>
               </div>

               <div className="space-y-2">
                 <label className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest ml-1">PROFESSIONAL EMAIL</label>
                 <input 
                  type="email" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-white font-medium"
                  placeholder="contact@pro.clap"
                 />
               </div>

               <button 
                onClick={() => onComplete(selectedRole!)}
                className="w-full bg-red-600 hover:bg-red-700 py-5 rounded-2xl font-bold text-lg mt-4 transition-all transform hover:scale-[1.02] shadow-2xl shadow-red-600/30 flex items-center justify-center gap-2 group"
               >
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                FINALIZE PROFILE
               </button>
             </div>
             
             <div className="flex justify-center gap-8">
                <button onClick={() => setStep(1)} className="text-neutral-500 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">← Back to selection</button>
                <p className="text-[10px] text-neutral-700 uppercase tracking-widest text-center mt-2 font-bold">Encrypted & Secure</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const RoleButton = ({ onClick, icon, title, desc }: { onClick: () => void, icon: React.ReactNode, title: string, desc: string }) => (
  <button 
    onClick={onClick}
    className="group p-8 rounded-[2rem] border border-white/5 bg-neutral-900/50 hover:bg-neutral-800 transition-all text-left flex items-center gap-8 relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
       {icon}
    </div>
    <div className="p-5 rounded-[1.5rem] bg-black border border-white/5 group-hover:border-red-600 group-hover:text-red-500 transition-all">
      {icon}
    </div>
    <div className="flex-1 relative z-10">
      <h3 className="text-2xl font-cinematic font-bold tracking-wide group-hover:text-red-500 transition-colors">{title}</h3>
      <p className="text-neutral-500 text-sm leading-relaxed max-w-xs">{desc}</p>
    </div>
    <ChevronRight className="text-neutral-700 group-hover:text-red-500 group-hover:translate-x-1 transition-all" />
  </button>
);

const ClapIcon = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m4 11 1.71-3.42A2 2 0 0 1 7.5 6.42l4.5 0" />
    <path d="M12 6.42l4.5 0a2 2 0 0 1 1.79 1.16L20 11" />
    <path d="M4 11h16" />
    <path d="M12 22V11" />
  </svg>
);

export default Onboarding;
