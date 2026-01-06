
import React, { useState, useEffect, useRef } from 'react';
import { UserRole, OnboardingStep } from '../types';
import { 
  User, Video, ShieldCheck, ChevronRight, Truck, Star, Sparkles, 
  Clapperboard, Camera, Briefcase, Info, Check, ArrowRight, ArrowLeft,
  Mail, MapPin, Zap, X, Shield, Building2, MapPinned
} from 'lucide-react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import Select from '../components/Select';

const { useNavigate } = ReactRouterDOM;

interface OnboardingProps {
  onComplete: (role: UserRole) => void;
}

const LOCATIONS = {
  "India": {
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur"],
    "Karnataka": ["Bangalore", "Mysore"]
  },
  "USA": {
    "California": ["Los Angeles", "San Francisco"],
    "New York": ["New York City", "Buffalo"],
    "Georgia": ["Atlanta"]
  }
};

const ROLE_SPECIALTIES: Record<string, { label: string, value: string }[]> = {
  talent: [
    { label: 'Actor / Hero', value: 'Actor' },
    { label: 'Supporting Artist', value: 'Supporting' },
    { label: 'Extra / Junior Artist', value: 'Extra' },
    { label: 'Stunt / Action', value: 'Stunt' },
    { label: 'Dancer', value: 'Dancer' },
    { label: 'Voice Artist', value: 'Voice' }
  ],
  vendor: [
    { label: 'Camera & Lens Rental', value: 'Camera' },
    { label: 'Lights & Grip Gear', value: 'Lights' },
    { label: 'Studio / Location Space', value: 'Studio' },
    { label: 'Van / Set Transport', value: 'Transport' },
    { label: 'Catering / Food Service', value: 'Catering' },
    { label: 'Costume & Props', value: 'Props' }
  ],
  production: [
    { label: 'Director', value: 'Director' },
    { label: 'Camera Op / DP', value: 'DP' },
    { label: 'Film Student', value: 'Student' },
    { label: 'Editor', value: 'Editor' },
    { label: 'Assistant Director (AD)', value: 'AD' },
    { label: 'Sound Mixer', value: 'Sound' }
  ]
};

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>(OnboardingStep.OTP_VERIFY);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isOtpError, setIsOtpError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '+91 98765 43210', 
    country: 'India',
    state: 'Tamil Nadu',
    city: 'Chennai',
    specialty: '',
    experience: 'Beginner',
    bio: ''
  });

  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 8, y: y * -8 });
  };

  const nextStep = (step: OnboardingStep) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentStep(step);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setIsOtpError(false);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }

    if (value && index === 3) {
      verifyOtp(newOtp.join(''));
    }
  };

  const resendCode = () => {
    if (!canResend) return;
    setResendTimer(59);
    setCanResend(false);
    setOtp(['', '', '', '']);
    setIsOtpError(false);
  };

  const verifyOtp = (codeOverride?: string) => {
    const code = codeOverride || otp.join('');
    if (code.length < 4) return;
    
    setIsVerifying(true);
    setTimeout(() => {
      if (code === '1234') {
        nextStep(OnboardingStep.BASIC_INFO);
      } else {
        setIsOtpError(true);
        setTimeout(() => setOtp(['', '', '', '']), 500);
      }
      setIsVerifying(false);
    }, 800);
  };

  const stepInfo = {
    [OnboardingStep.OTP_VERIFY]: { progress: 15, current: 1, total: 5, label: "Verify Phone" },
    [OnboardingStep.BASIC_INFO]: { progress: 35, current: 2, total: 5, label: "About You" },
    [OnboardingStep.ROLE_SELECTION]: { progress: 55, current: 3, total: 5, label: "Your Role" },
    [OnboardingStep.ROLE_SPECIFIC]: { progress: 75, current: 4, total: 5, label: "Skills" },
    [OnboardingStep.REVIEW_CREATE]: { progress: 90, current: 5, total: 5, label: "Finish" },
    [OnboardingStep.SUCCESS]: { progress: 100, current: 6, total: 5, label: "All Done" },
  }[currentStep];

  const renderStepContent = () => {
    switch (currentStep) {
      case OnboardingStep.OTP_VERIFY:
        return (
          <div className="w-full max-w-md space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center">
            <div className="space-y-6">
              <div className="w-20 h-20 bg-neutral-900 rounded-[1.5rem] flex items-center justify-center mx-auto border border-white/5 shadow-xl">
                <Mail size={32} className="text-red-500" />
              </div>
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-cinematic font-bold tracking-tight uppercase leading-none">Enter Code</h1>
                <p className="text-neutral-500 font-medium">Verify your connection to <br/><span className="text-white font-bold">{formData.phone}</span></p>
              </div>
            </div>

            <div className={`flex justify-center gap-4 ${isOtpError ? 'animate-shake' : ''}`}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otp[i] && i > 0) {
                      document.getElementById(`otp-${i - 1}`)?.focus();
                    }
                  }}
                  className={`w-16 h-20 md:w-20 md:h-24 bg-neutral-900 border-2 text-5xl font-cinematic font-bold text-center rounded-2xl focus:ring-4 transition-all outline-none ${
                    isOtpError ? 'border-red-600 ring-red-600/10' : 'border-white/5 focus:border-red-600/40'
                  }`}
                  autoFocus={i === 0}
                />
              ))}
            </div>

            <div className="space-y-6">
              {isOtpError && (
                <p className="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse">Incorrect code. Please try again.</p>
              )}
              <button 
                onClick={() => verifyOtp()}
                disabled={otp.some(d => !d) || isVerifying}
                className="w-full py-7 bg-red-600 hover:bg-red-700 disabled:opacity-20 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl transition-all active-scale"
              >
                {isVerifying ? 'Checking...' : 'Continue'}
              </button>
              <button 
                onClick={resendCode}
                disabled={!canResend}
                className={`text-[10px] font-black uppercase tracking-widest transition-colors ${canResend ? 'text-white hover:text-red-500' : 'text-neutral-700 cursor-not-allowed'}`}
              >
                {canResend ? 'Resend code now' : `Resend code (0:${resendTimer.toString().padStart(2, '0')})`}
              </button>
            </div>
            <p className="text-[8px] text-neutral-700 font-bold uppercase tracking-[0.2em]">Hint: Try 1234 for simulation</p>
          </div>
        );

      case OnboardingStep.BASIC_INFO:
        return (
          <div className="w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">About You</h1>
              <p className="text-neutral-500 text-lg md:text-xl">Tell us who you are so we can set up your profile.</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-4 flex flex-col items-center gap-6">
                <div className="relative group">
                  <div className="w-48 h-48 rounded-[3rem] bg-neutral-900 border-2 border-white/5 flex items-center justify-center overflow-hidden transition-all group-hover:border-red-600/50 shadow-2xl">
                    <User size={64} className="text-neutral-800" />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-5 bg-red-600 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-[#050505]">
                    <Camera size={20} />
                  </button>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Full Name *</label>
                    <input 
                      type="text" 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g. Surya Ravichandran"
                      className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-6 py-5 font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Email Address *</label>
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="surya@example.com"
                      className="w-full bg-neutral-900 border border-white/5 rounded-2xl px-6 py-5 font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                  </div>
                </div>

                <div className="p-8 bg-neutral-900/30 border border-white/5 rounded-[2.5rem] space-y-6 relative overflow-hidden">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-red-500">
                        <MapPin size={16} />
                        <h3 className="text-[10px] font-black uppercase tracking-widest">Location Node</h3>
                      </div>
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest">Country</label>
                        <Select 
                          value={formData.country}
                          onChange={e => {
                            const val = e.target.value;
                            const firstState = Object.keys(LOCATIONS[val as keyof typeof LOCATIONS])[0];
                            const firstCity = (LOCATIONS[val as keyof typeof LOCATIONS] as any)[firstState][0];
                            setFormData({...formData, country: val as any, state: firstState as any, city: firstCity});
                          }}
                          options={Object.keys(LOCATIONS).map(c => ({ label: c, value: c }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest">State / Region</label>
                        <Select 
                          value={formData.state}
                          onChange={e => {
                            const val = e.target.value;
                            const firstCity = (LOCATIONS[formData.country as keyof typeof LOCATIONS] as any)[val][0];
                            setFormData({...formData, state: val as any, city: firstCity});
                          }}
                          options={Object.keys(LOCATIONS[formData.country as keyof typeof LOCATIONS]).map(s => ({ label: s, value: s }))}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-bold text-neutral-700 uppercase tracking-widest">City</label>
                        <Select 
                          value={formData.city}
                          onChange={e => setFormData({...formData, city: e.target.value})}
                          options={(LOCATIONS[formData.country as keyof typeof LOCATIONS] as any)[formData.state].map((c: string) => ({ label: c, value: c }))}
                        />
                      </div>
                   </div>
                </div>

                <button 
                  onClick={() => nextStep(OnboardingStep.ROLE_SELECTION)}
                  disabled={!formData.name || !formData.email}
                  className="w-full py-7 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 active-scale"
                >
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        );

      case OnboardingStep.ROLE_SELECTION:
        return (
          <div className="w-full max-w-5xl space-y-12 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="text-center space-y-3">
              <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tight uppercase leading-none">What do you do?</h1>
              <p className="text-neutral-500 text-lg md:text-xl">Pick the role that describes you best in the film world.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { role: 'talent' as UserRole, title: 'I am Talent', icon: <Star size={40} />, desc: 'Actors, Models, and On-screen performers.' },
                { role: 'vendor' as UserRole, title: 'I am a Vendor', icon: <Truck size={40} />, desc: 'Rentals, Gear, Studios, or Logistics.' },
                { role: 'production' as UserRole, title: 'I am Crew', icon: <Video size={40} />, desc: 'Directors, Crew members, and Managers.' }
              ].map(item => (
                <button 
                  key={item.role}
                  onClick={() => {
                    setSelectedRole(item.role);
                    const firstSpecialty = ROLE_SPECIALTIES[item.role][0].value;
                    setFormData(prev => ({ ...prev, specialty: firstSpecialty }));
                    nextStep(OnboardingStep.ROLE_SPECIFIC);
                  }}
                  className={`group p-10 bg-neutral-900 border rounded-[3rem] text-left transition-all active-scale relative overflow-hidden shadow-xl ${
                    selectedRole === item.role ? 'border-red-600 bg-red-950/10' : 'border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className={`mb-8 w-16 h-16 rounded-2xl flex items-center justify-center transition-all ${
                    selectedRole === item.role ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-800 text-neutral-500 group-hover:text-red-500'
                  }`}>
                    {item.icon}
                  </div>
                  <h3 className="text-3xl font-cinematic font-bold text-white uppercase mb-2 tracking-widest">{item.title}</h3>
                  <p className="text-neutral-500 text-xs font-bold leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>

            <button onClick={() => nextStep(OnboardingStep.BASIC_INFO)} className="w-full text-[10px] font-black text-neutral-700 uppercase tracking-widest hover:text-white transition-colors flex items-center justify-center gap-2">
              <ArrowLeft size={14} /> Go Back
            </button>
          </div>
        );

      case OnboardingStep.ROLE_SPECIFIC:
        return (
          <div className="w-full max-w-4xl space-y-12 animate-in fade-in slide-in-from-right-12 duration-700">
            <div className="space-y-3">
              <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Your Skills</h1>
              <p className="text-neutral-500 text-lg md:text-xl">Just a few more details to complete your profile.</p>
            </div>

            <div className="bg-neutral-900 border border-white/5 p-10 md:p-14 rounded-[3rem] space-y-10 shadow-3xl">
               <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-10">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Main Specialization *</label>
                      <Select 
                        value={formData.specialty}
                        onChange={e => setFormData({...formData, specialty: e.target.value})}
                        options={selectedRole ? ROLE_SPECIALTIES[selectedRole] : []}
                      />
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-1">Experience Level</label>
                      <div className="grid grid-cols-3 gap-3">
                          {['Beginner', 'Amateur', 'Pro'].map(exp => (
                            <button 
                              key={exp} 
                              onClick={() => setFormData({...formData, experience: exp})} 
                              className={`py-5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                                formData.experience === exp ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-black border-white/5 text-neutral-700 hover:text-white'
                              }`}
                            >
                              {exp}
                            </button>
                          ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">Bio / About you</label>
                    <textarea 
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      placeholder="Write a short summary about your film goals..."
                      className="w-full h-full min-h-[180px] bg-black border border-white/5 rounded-[2rem] p-6 text-neutral-300 font-medium italic outline-none focus:ring-1 focus:ring-red-600 resize-none"
                    />
                  </div>
               </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => nextStep(OnboardingStep.ROLE_SELECTION)} className="px-10 py-5 bg-neutral-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-800 transition-all">
                Back
              </button>
              <button onClick={() => nextStep(OnboardingStep.REVIEW_CREATE)} className="flex-1 py-7 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3 active-scale">
                Review & Finish <ArrowRight size={18} />
              </button>
            </div>
          </div>
        );

      case OnboardingStep.REVIEW_CREATE:
        return (
          <div className="w-full max-w-4xl space-y-12 animate-in fade-in zoom-in-95 duration-700 py-4">
            <div className="text-center space-y-3">
              <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Confirm Slate</h1>
            </div>

            <div 
              className="max-w-lg mx-auto relative group perspective-1000"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setTilt({ x: 0, y: 0 })}
            >
              <div 
                ref={cardRef}
                style={{ 
                  transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
                className="relative bg-neutral-950 border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.8)] ring-1 ring-white/5"
              >
                 <div className="bg-red-600 p-6 flex justify-between items-center relative overflow-hidden">
                    <div className="flex items-center gap-3 relative z-10">
                       <Clapperboard size={18} className="text-white" />
                       <span className="text-sm font-cinematic font-bold tracking-[0.2em] uppercase text-white">CLAP PASSPORT</span>
                    </div>
                 </div>
                 
                 <div className="p-8 space-y-6">
                    <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                       <div className="w-24 h-24 sm:w-28 sm:h-28 bg-neutral-900 rounded-[2rem] overflow-hidden border-4 border-white/5 flex-shrink-0 shadow-xl relative">
                          <img src={`https://picsum.photos/seed/${formData.name}/300`} className="w-full h-full object-cover grayscale" alt="ID" />
                       </div>
                       <div className="flex-1 text-center sm:text-left space-y-4">
                          <div>
                             <p className="text-[8px] font-black text-red-500 uppercase tracking-widest mb-1">Entity Name</p>
                             <h3 className="text-2xl sm:text-3xl font-cinematic font-bold text-white uppercase tracking-tight leading-none">{formData.name || "UNREGISTERED"}</h3>
                          </div>
                          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                             <div>
                                <p className="text-[7px] font-black text-neutral-600 uppercase tracking-widest mb-1">Hub</p>
                                <p className="text-lg font-cinematic font-bold text-white uppercase">{formData.city}</p>
                             </div>
                             <div>
                                <p className="text-[7px] font-black text-neutral-600 uppercase tracking-widest mb-1">Primary Role</p>
                                <p className="text-lg font-cinematic font-bold text-red-500 uppercase truncate">{formData.specialty}</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 pt-4 max-w-lg mx-auto">
              <button 
                onClick={() => setShowTermsModal(true)}
                className="w-full py-8 bg-white text-black font-black rounded-[2.5rem] text-[12px] md:text-[14px] uppercase tracking-[0.5em] shadow-3xl hover:bg-neutral-200 transition-all active-scale"
              >
                Create My Account
              </button>
              <button onClick={() => nextStep(OnboardingStep.BASIC_INFO)} className="text-[10px] font-black text-neutral-700 uppercase tracking-widest hover:text-white transition-colors text-center">Edit Registration</button>
            </div>
          </div>
        );

      case OnboardingStep.SUCCESS:
        return (
          <div className="space-y-12 animate-in fade-in zoom-in-90 duration-1000 text-center flex-1 flex flex-col justify-center py-20 relative overflow-hidden w-full max-w-5xl">
            <div className="relative z-10 space-y-12">
              <div className="w-48 h-48 bg-green-600 rounded-[3rem] flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(22,163,74,0.3)] transform rotate-12 mb-10">
                <Check size={90} className="text-white" strokeWidth={4} />
              </div>
              <div className="space-y-6">
                <h1 className="text-7xl md:text-[10vw] font-cinematic font-black tracking-tight uppercase leading-none">Welcome!</h1>
              </div>
              <div className="pt-12">
                <button 
                  onClick={() => onComplete(selectedRole!)}
                  className="group px-16 py-9 bg-white text-black font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.6em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-6 mx-auto"
                >
                  Launch Dashboard <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-600 selection:text-white overflow-x-hidden relative flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-[100] h-20 md:h-24 px-6 md:px-12 flex items-center justify-between border-b border-white/5 backdrop-blur-3xl bg-black/40">
        <div className="flex items-center gap-4">
          <Clapperboard size={20} className="text-red-500" />
          <span className="text-xl font-cinematic font-black tracking-widest leading-none uppercase">CLAP</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/5">
          <div 
            className="h-full bg-red-600 transition-all duration-1000 ease-out" 
            style={{ width: `${stepInfo.progress}%` }} 
          />
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 relative z-10">
        {renderStepContent()}

        {showTermsModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-300">
             <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowTermsModal(false)} />
             <div className="bg-neutral-900 border border-white/10 rounded-[3rem] p-10 md:p-14 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500">
                <h2 className="text-4xl font-cinematic font-bold uppercase text-white tracking-widest text-center">Terms of Use</h2>
                <div className="space-y-4 pt-4">
                   <button 
                    onClick={() => {
                      setShowTermsModal(false);
                      nextStep(OnboardingStep.SUCCESS);
                    }}
                    className="w-full py-7 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-red-700 transition-all active-scale"
                   >
                     I Agree & Initialize
                   </button>
                </div>
             </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Onboarding;
