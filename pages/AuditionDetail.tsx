
import React, { useState } from 'react';
/* Fixed: Explicit named imports of useParams and useNavigate to resolve export errors */
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  Info, 
  Video, 
  ArrowRight, 
  Share2,
  Bookmark,
  User,
  Zap,
  Check,
  Clapperboard,
  History,
  TrendingUp,
  Users,
  Camera,
  Heart,
  Sparkles,
  ChevronRight,
  Activity
} from 'lucide-react';
import { MOCK_AUDITIONS } from '../constants';

const AuditionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const audition = MOCK_AUDITIONS.find(a => a.id === id) || MOCK_AUDITIONS[0];

  const processSteps = [
    { id: 1, title: 'Profile Ingest', desc: 'Registry sync of your verified CLAP identity.' },
    { id: 2, title: 'Logic Filter', desc: 'Genie AI matches your skill density to the script.' },
    { id: 3, title: 'Live Reading', desc: 'Remote callback via the production hub.' },
    { id: 4, title: 'Mission Lock', desc: 'Escrow activation and contract signing.' }
  ];

  const handleApply = () => {
    navigate(`/auditions/${id}/apply`);
  };

  return (
    <div className="min-h-screen bg-black animate-in fade-in duration-700 max-w-7xl mx-auto pb-40 px-4 md:px-6">
      
      {/* 1. NAVIGATION LAYER */}
      <div className="py-6 md:py-8 flex items-center justify-between">
        <button 
          onClick={() => navigate('/auditions')}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em]">Abort View</span>
        </button>
        <div className="flex gap-2">
          <button className="p-3 bg-neutral-900 rounded-xl text-neutral-500 hover:text-white transition-all"><Share2 size={18} /></button>
          <button 
            onClick={() => setIsSaved(!isSaved)}
            className={`p-3 rounded-xl transition-all ${isSaved ? 'bg-red-600 text-white shadow-lg' : 'bg-neutral-900 text-neutral-500'}`}
          >
            <Heart size={18} className={isSaved ? 'fill-current' : ''} />
          </button>
        </div>
      </div>

      {/* 2. CINEMATIC HERO HEADER */}
      <header className="relative space-y-10 md:space-y-12 mb-12 md:mb-20">
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-red-600/5 blur-[120px] pointer-events-none" />
        
        <div className="space-y-6 md:space-y-8">
          <div className="flex flex-wrap items-center gap-3">
            <div className="px-4 py-1.5 bg-red-600 text-white rounded-full flex items-center gap-2 shadow-2xl shadow-red-600/20">
              <Award size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">Verified Mission</span>
            </div>
            <span className="bg-neutral-900 border border-white/5 text-neutral-500 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">
              ID: CLAP-2024-XP
            </span>
            <div className="flex items-center gap-2 text-green-500 bg-green-500/10 px-4 py-1.5 rounded-full border border-green-500/20">
              <TrendingUp size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">High Match Rate</span>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-6xl sm:text-7xl md:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8] mb-4">
              {audition.roleName}
            </h1>
            <p className="text-2xl md:text-5xl font-cinematic font-bold text-neutral-600 tracking-widest uppercase">
              PROD: {audition.projectTitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <button 
            onClick={handleApply}
            className="col-span-1 md:col-span-2 py-8 md:py-10 bg-red-600 text-white font-black rounded-[2rem] md:rounded-[2.5rem] text-[14px] md:text-[16px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 active-scale hover:bg-red-700 transition-all flex items-center justify-center gap-4 group"
          >
            INITIALIZE DEPLOYMENT <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
          <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-center text-center">
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Slate Closes In</p>
            <p className="text-3xl font-cinematic font-bold text-white tracking-widest">04:12:00</p>
          </div>
          <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem] flex flex-col justify-center text-center">
            <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Active Applicants</p>
            <p className="text-3xl font-cinematic font-bold text-red-500 tracking-widest">142 UNIT</p>
          </div>
        </div>
      </header>

      {/* 3. CORE CONTENT GRID */}
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        
        <div className="lg:col-span-8 space-y-16 md:space-y-24">
          
          {/* A. KEY PARAMETERS */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 p-8 md:p-12 bg-neutral-900/30 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <ShieldCheck size={120} />
             </div>
             {[
               { label: 'Primary Hub', val: audition.location.split(',')[0], icon: <MapPin className="text-red-500" />, detail: 'On-Site Required' },
               { label: 'Role Type', val: 'Lead Artist', icon: <User className="text-blue-500" />, detail: 'Narrative Lead' },
               { label: 'Casting Mode', val: 'Direct Sync', icon: <Zap className="text-accent" />, detail: 'Rapid Review' },
               { label: 'Status', val: 'Paid Role', icon: <DollarSign className="text-green-500" />, detail: 'Escrow Secured' }
             ].map((item, i) => (
               <div key={i} className="space-y-3 relative z-10">
                  <div className="flex items-center gap-2 text-neutral-600">
                    {item.icon}
                    <span className="text-[9px] font-black uppercase tracking-widest">{item.label}</span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{item.val}</p>
                    <p className="text-[8px] font-black text-neutral-700 uppercase tracking-tighter">{item.detail}</p>
                  </div>
               </div>
             ))}
          </section>

          {/* B. THE MISSION BRIEF */}
          <section className="space-y-10">
             <div className="flex items-center gap-4">
                <div className="w-2 h-8 bg-red-600 rounded-full" />
                <h3 className="text-3xl md:text-5xl font-cinematic font-bold tracking-widest uppercase">The Brief</h3>
             </div>
             <div className="space-y-8">
               <div className="p-10 md:p-14 bg-neutral-900 border border-white/5 rounded-[3.5rem] shadow-xl relative group">
                 <p className="text-neutral-300 text-xl md:text-3xl font-medium leading-[1.3] italic tracking-tight">
                   "{audition.roleDescription}"
                 </p>
                 <div className="mt-12 flex items-center gap-3 px-6 py-3 bg-red-600/10 border border-red-600/20 rounded-2xl w-fit">
                    <Sparkles size={16} className="text-red-500 animate-pulse" />
                    <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Genie AI Breakdown: Psychological Intensity 92%</span>
                 </div>
               </div>

               <div className="grid md:grid-cols-2 gap-6">
                 <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-4">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                       <History size={16} className="text-red-500" /> SCENE CONTEXT
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                       Key sequence involves high-pressure dialogue in Sector 4 Alleyway. Requires ability to maintain continuity during technical reset for handheld shots.
                    </p>
                 </div>
                 <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-4">
                    <h4 className="text-[11px] font-black text-white uppercase tracking-[0.2em] flex items-center gap-2">
                       <Camera size={16} className="text-blue-500" /> UNIT SYNERGY
                    </h4>
                    <p className="text-sm text-neutral-500 leading-relaxed font-medium">
                       Direct collaboration with Sonia Ray (DP) for framing. Tight blocking on 85mm Prime glass expected for emotional beats.
                    </p>
                 </div>
               </div>
             </div>
          </section>

          {/* C. TECHNICAL STACK */}
          <section className="space-y-10">
             <h3 className="text-3xl md:text-5xl font-cinematic font-bold tracking-widest uppercase">Registry Thresholds</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Profile Authority', val: 'Elite Verified Only', icon: <ShieldCheck className="text-green-500" /> },
                  { label: 'Language Logic', val: 'Fluent Hindi / Dialect Pro', icon: <Users className="text-blue-500" /> },
                  { label: 'Availability', val: 'Jan 15 - Feb 12 Block', icon: <Calendar className="text-red-500" /> },
                  { label: 'Legal Standing', val: 'NDA & PPA Compliant', icon: <CheckCircle2 className="text-green-500" /> }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-neutral-900/50 border border-white/5 rounded-3xl group hover:border-red-600/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {item.icon}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">{item.label}</p>
                           <p className="text-[11px] md:text-sm font-bold text-white uppercase tracking-tight">{item.val}</p>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* D. PRODUCTION LOGS */}
          <section className="bg-neutral-900 border border-white/5 rounded-[4rem] p-10 md:p-14 space-y-12 shadow-3xl">
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
                <div className="space-y-1">
                   <h3 className="text-2xl md:text-3xl font-cinematic font-bold tracking-widest uppercase text-white">Origin Hub</h3>
                   <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">About the Production House</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="w-16 h-16 rounded-[1.2rem] overflow-hidden border-2 border-white/10 shadow-2xl">
                      <img src={audition.productionInfo?.avatar} className="w-full h-full object-cover" />
                   </div>
                   <div className="text-left">
                      <p className="text-lg font-cinematic font-bold text-white tracking-widest leading-none">{audition.productionInfo?.name}</p>
                      <p className="text-[10px] text-green-500 font-black uppercase mt-1">4.9 Rep Score</p>
                   </div>
                </div>
             </div>
             <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-4">
                   <p className="text-neutral-400 font-medium leading-relaxed italic text-lg">"{audition.productionInfo?.bio}"</p>
                </div>
                <div className="space-y-4 border-l border-white/5 pl-8 hidden md:block">
                   <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Past Slates</p>
                   <div className="space-y-2">
                      {audition.productionInfo?.pastProjects.map(p => (
                        <div key={p} className="text-[10px] font-bold text-white uppercase tracking-tight flex items-center gap-2">
                           <div className="w-1 h-1 rounded-full bg-red-600" /> {p}
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

        </div>

        {/* 4. TACTICAL SIDEBAR */}
        <aside className="lg:col-span-4 space-y-10">
           
           {/* Visual Identification */}
           <div className="bg-neutral-900 border border-white/10 rounded-[3rem] overflow-hidden shadow-3xl group relative">
              <div className="aspect-[3/4] relative">
                 <img 
                    src={audition.image} 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105" 
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />
                 <div className="absolute bottom-8 left-8 right-8 space-y-4">
                    <div className="flex gap-2">
                       {audition.tags.map(t => (
                         <span key={t} className="px-2 py-0.5 bg-black/60 border border-white/10 rounded text-[7px] font-black uppercase text-white">{t}</span>
                       ))}
                    </div>
                    <h4 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">THE SLATE POSTER</h4>
                 </div>
              </div>
           </div>

           {/* Casting Logic Flow */}
           <section className="bg-neutral-900 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-12">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Mission Flow</h3>
                <Clapperboard size={18} className="text-red-500 animate-pulse" />
              </div>
              <div className="space-y-10 relative">
                 <div className="absolute left-6 top-2 bottom-2 w-px bg-white/5" />
                 {processSteps.map((step, idx) => (
                   <div key={step.id} className="flex gap-8 relative">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-cinematic font-bold border transition-all z-10 ${
                        idx === 0 ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-neutral-800 border-white/5 text-neutral-600'
                      }`}>
                        {step.id}
                      </div>
                      <div className="space-y-1">
                         <h4 className={`text-[11px] font-black uppercase tracking-widest ${idx === 0 ? 'text-white' : 'text-neutral-500'}`}>{step.title}</h4>
                         <p className="text-[10px] text-neutral-600 font-bold leading-tight">{step.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </section>

           {/* Operational Directive */}
           <section className="p-10 bg-blue-600/5 border border-blue-600/20 rounded-[3rem] space-y-6 shadow-xl group">
              <div className="flex items-center gap-3 text-blue-500">
                 <Info size={24} />
                 <h4 className="text-[11px] font-black uppercase tracking-[0.3em]">Logistics Memo</h4>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic">
                 "Travel units and accommodation are provisioned via the CLAP supply node for verified outstation talent. Local dispatch hub: Mumbai Central."
              </p>
              <div className="pt-4 border-t border-blue-600/10 flex justify-between items-center">
                 <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Hub Security</span>
                 <span className="text-[9px] font-bold text-green-500 uppercase">ACTIVE</span>
              </div>
           </section>

           {/* Trending Signal */}
           <div className="bg-neutral-900 border border-white/5 p-8 rounded-[3rem] flex items-center justify-between group active-scale cursor-pointer shadow-xl">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-accent">
                    <Users size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest">Cast Shortlist</p>
                    <p className="text-[8px] text-neutral-600 font-bold uppercase">64 Units Synced</p>
                 </div>
              </div>
              <ChevronRight size={18} className="text-neutral-700 group-hover:text-white transition-all" />
           </div>
        </aside>
      </div>

      {/* 5. MOBILE NAVIGATION OVERLAY (Persistent Action Bar) */}
      {/* Fixed: Added missing closing tags and mobile action bar overlay for AuditionDetail */}
      <div className="fixed bottom-0 left-0 right-0 z-[110] p-4 bg-black/40 backdrop-blur-3xl border-t border-white/5 md:hidden">
         <button 
           onClick={handleApply}
           className="w-full py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 active-scale"
         >
            INITIALIZE DEPLOYMENT
         </button>
      </div>
    </div>
  );
};

export default AuditionDetail;
