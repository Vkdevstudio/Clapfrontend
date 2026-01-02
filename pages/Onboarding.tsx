
import React, { useState } from 'react';
import { UserRole } from '../types';
import { User, Video, ShieldCheck, ChevronRight, Truck, Star, Sparkles, Clapperboard } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-6 bg-black selection:bg-red-600 selection:text-white overflow-hidden relative">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-600/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="w-full max-w-xl animate-in fade-in zoom-in-95 duration-700 relative z-10">
        {step === 1 && (
          <div className="space-y-16 text-center">
            <div className="space-y-6">
              <div className="flex justify-center mb-10">
                <div className="bg-red-600 p-5 rounded-[2rem] shadow-3xl shadow-red-600/50 transform -rotate-12 group hover:rotate-0 transition-all duration-500">
                   <Clapperboard size={50} className="text-white" />
                </div>
              </div>
              <h1 className="text-6xl md:text-7xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">Identity Selection</h1>
              <p className="text-neutral-500 max-w-sm mx-auto font-medium text-lg leading-relaxed">Choose your primary workflow. You can manage multiple roles from your settings later.</p>
            </div>

            <div className="grid gap-5">
              <RoleButton 
                onClick={() => handleRoleSelect('talent')}
                icon={<Star size={32} />}
                title="Creative Talent"
                desc="Actors, technicians, and freelancers looking for the next breakthrough."
              />
              <RoleButton 
                onClick={() => handleRoleSelect('production')}
                icon={<Video size={32} />}
                title="Production Lead"
                desc="Filmmakers, studios, and creators building their next production slate."
              />
              <RoleButton 
                onClick={() => handleRoleSelect('vendor')}
                icon={<Truck size={32} />}
                title="Service Vendor"
                desc="Equipment rentals, studios, and specialized technical providers."
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in slide-in-from-right-8 duration-500">
             <div className="text-center space-y-6">
                <div className="bg-red-600/10 w-24 h-24 rounded-[2rem] flex items-center justify-center mx-auto border border-red-600/20 shadow-2xl">
                  <ShieldCheck size={48} className="text-red-500" />
                </div>
                <h2 className="text-5xl font-cinematic font-bold tracking-tighter uppercase text-white leading-none">Verify & Launch</h2>
                <p className="text-neutral-500 text-lg font-medium">CLAP is a verified professional network. Let's set up your profile.</p>
             </div>

             <div className="bg-neutral-900 border border-white/5 p-12 rounded-[3.5rem] shadow-3xl backdrop-blur-3xl space-y-8 relative overflow-hidden">
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">
                   {selectedRole === 'vendor' ? 'Business Legal Name' : 'Professional Name'}
                 </label>
                 <input 
                  type="text" 
                  autoFocus
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-white font-bold text-xl placeholder:text-neutral-800"
                  placeholder={selectedRole === 'vendor' ? 'ARRI Rentals Mumbai' : 'Vinod S.'}
                 />
               </div>
               
               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">
                   {selectedRole === 'vendor' ? 'Primary Service Category' : 'Core Specialty'}
                 </label>
                 <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-neutral-400 font-bold appearance-none">
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

               <div className="space-y-3">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Professional Email</label>
                 <input 
                  type="email" 
                  className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 focus:outline-none focus:ring-2 focus:ring-red-600 transition-all text-white font-bold text-lg placeholder:text-neutral-800"
                  placeholder="contact@pro.clap"
                 />
               </div>

               <button 
                onClick={() => onComplete(selectedRole!)}
                className="w-full bg-red-600 hover:bg-red-700 py-6 rounded-3xl font-black text-[11px] uppercase tracking-[0.3em] mt-6 transition-all transform hover:scale-[1.02] shadow-3xl shadow-red-600/30 flex items-center justify-center gap-3 group text-white active-scale"
               >
                <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                Finalize Identity
               </button>
             </div>
             
             <div className="flex flex-col items-center gap-6">
                <button onClick={() => setStep(1)} className="text-neutral-600 hover:text-white text-xs font-black uppercase tracking-[0.2em] transition-colors pb-1 border-b border-transparent hover:border-white">← Return to Selection</button>
                <div className="flex items-center gap-2 text-[10px] text-neutral-800 font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">
                  <ShieldCheck size={12} /> Encrypted & Secure Connection
                </div>
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
