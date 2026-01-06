import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_AUDITIONS } from '../constants.tsx';
import { 
  ChevronLeft, MapPin, Clock, DollarSign, CheckCircle2, Info, 
  ShieldCheck, Share2, Calendar, Users, Zap, Play, X, Star, 
  MessageSquare, TrendingUp, Download, Eye, Award, Truck, ShieldAlert,
  MoreVertical, ChevronRight, ArrowRight, Lightbulb, Ticket
} from 'lucide-react';

const RequirementDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReported, setShowReported] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const req = MOCK_AUDITIONS.find(r => r.id === id) || MOCK_AUDITIONS[0];
  const prod = req.productionInfo!;

  const tips = [
    "Highlight your experience with period costumes for this role.",
    "The director prefers natural lighting for the initial reel submission.",
    "Make sure your availability for January outdoors is strictly confirmed."
  ];

  const auditionSlots = [
    "Nov 24 - 10:00 AM (Remote)",
    "Nov 24 - 02:00 PM (In-Person, MUM)",
    "Nov 25 - 11:30 AM (Remote)"
  ];

  const handleApply = () => {
    navigate(`/auditions/${id}/apply`);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => navigate('/discover')}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Back to Opportunities</span>
        </button>
        <button 
          onClick={() => setShowReported(true)}
          className="flex items-center gap-2 text-neutral-800 hover:text-red-500 transition-colors"
        >
          <ShieldAlert size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Report Project</span>
        </button>
      </div>

      {showReported && (
        <div className="p-6 bg-red-600/10 border border-red-600/20 rounded-[2rem] flex items-center justify-between animate-in slide-in-from-top-4">
           <div className="flex items-center gap-4">
              <ShieldAlert className="text-red-500" />
              <p className="text-xs font-bold text-red-500 uppercase tracking-widest">Listing Flagged for Audit. Our Trust & Safety team will review this production.</p>
           </div>
           <button onClick={() => setShowReported(false)}><X size={16} /></button>
        </div>
      )}

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Production Content */}
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-600/20">
                {req.workType}
              </span>
              <span className="bg-neutral-900 border border-white/5 text-neutral-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Deadline: {req.deadline}
              </span>
              {prod.isTrending && (
                <span className="flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-[10px] font-black uppercase border border-accent/20">
                  <TrendingUp size={12} /> TRENDING
                </span>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">{req.roleName}</h1>
              <p className="text-xl md:text-3xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase">{req.projectTitle}</p>
            </div>
          </header>

          {/* Context & Guidance */}
          <section className="p-8 bg-accent/5 border border-accent/20 rounded-[2.5rem] space-y-6 shadow-xl animate-in slide-in-from-left-4">
              <div className="flex items-center gap-3 text-accent">
                 <Lightbulb size={24} />
                 <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase">Genie & Production Advice</h3>
              </div>
              <ul className="space-y-4">
                 {tips.map((tip, idx) => (
                   <li key={idx} className="flex items-start gap-4 text-sm text-neutral-400 font-medium italic">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 shrink-0" />
                      {tip}
                   </li>
                 ))}
              </ul>
          </section>

          {/* Core Info Grid */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 md:p-12 space-y-10 shadow-3xl bg-black/20">
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><MapPin size={12} className="text-red-500"/> Project Location</p>
                     <p className="text-xl font-bold text-white uppercase tracking-tight">{req.location}</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><Calendar size={12} className="text-blue-500"/> Duration</p>
                     <p className="text-xl font-bold text-white uppercase tracking-tight">{req.duration}</p>
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><DollarSign size={12} className="text-green-500"/> Compensation</p>
                     <p className="text-3xl font-cinematic font-bold text-green-500 uppercase tracking-widest">{req.payScale}</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><Clock size={12} className="text-orange-500"/> Apply By</p>
                     <p className="text-xl font-bold text-white uppercase tracking-tight">{req.deadline}</p>
                  </div>
               </div>
            </div>
          </section>

          {/* Audition Slots Section */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 md:p-12 space-y-8 shadow-3xl">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-red-500">
                   <Ticket size={24} />
                   <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Audition Slots</h3>
                </div>
                <span className="text-[8px] font-black text-neutral-600 uppercase">Provisional Allocation</span>
             </div>
             <p className="text-neutral-500 text-sm font-medium">Select a preferred slot. Final confirmation is sent after initial reel review.</p>
             <div className="grid sm:grid-cols-3 gap-4">
                {auditionSlots.map(slot => (
                  <button 
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={`p-6 rounded-[2rem] border transition-all text-left flex flex-col justify-between h-32 active-scale ${
                      selectedSlot === slot ? 'bg-red-600 border-red-500 text-white shadow-2xl shadow-red-600/30' : 'bg-black/40 border-white/5 text-neutral-500 hover:border-red-600/30'
                    }`}
                  >
                     <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                        <Clock size={14} />
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">{slot}</p>
                  </button>
                ))}
             </div>
          </section>

          {/* Posted By Section */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 md:p-12 space-y-10 shadow-3xl">
             <div className="flex items-center justify-between">
                <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Posted By</h3>
                <div className="flex items-center gap-2 bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full text-[9px] font-black border border-blue-600/20">
                   <ShieldCheck size={12} /> VERIFIED PRODUCTION
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row gap-10">
                <div className="w-32 h-32 rounded-[2rem] bg-neutral-800 border-4 border-white/5 overflow-hidden flex-shrink-0 shadow-2xl">
                   <img src={prod.avatar} className="w-full h-full object-cover" alt={prod.name} />
                </div>
                <div className="space-y-6 flex-1">
                   <div className="space-y-2">
                      <h4 className="text-3xl font-cinematic font-bold text-white uppercase leading-none tracking-widest">{prod.name}</h4>
                      <div className="flex items-center gap-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                         <span className="flex items-center gap-1"><Star size={14} className="text-accent fill-accent" /> {prod.rating} Rating</span>
                         <div className="w-1 h-1 rounded-full bg-neutral-800" />
                         <span>Mumbai, India</span>
                      </div>
                   </div>
                   <p className="text-neutral-400 font-medium leading-relaxed italic text-lg">"{prod.bio}"</p>
                </div>
             </div>
          </section>
        </div>

        {/* Action Sidebar */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
           <div className="bg-neutral-900 border border-white/10 rounded-[3rem] p-10 space-y-10 shadow-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
                 <Award size={150} />
              </div>
              
              <div className="space-y-6 relative z-10">
                 <div className="flex items-center gap-4 text-green-500">
                    <ShieldCheck size={32} />
                    <h4 className="text-xl md:text-2xl font-cinematic font-bold uppercase tracking-widest leading-none">Smart <br />Escrow Active</h4>
                 </div>
                 <p className="text-sm text-neutral-400 font-medium leading-relaxed italic">
                   "Funds for this project are secured in the CLAP vault. You will receive 100% of the compensation upon character wrap."
                 </p>
                 <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Rate Log</span>
                    <span className="text-xl font-cinematic font-bold text-green-500 uppercase tracking-widest">{req.payScale}</span>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                 <button 
                   onClick={handleApply}
                   className="w-full py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2.5rem] shadow-3xl shadow-red-600/30 transition-all active-scale text-[14px] uppercase tracking-[0.4em] flex items-center justify-center gap-4 group"
                 >
                    INITIALIZE APPLICATION <Zap size={20} className="group-hover:rotate-12 transition-transform" />
                 </button>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <button className="py-4 bg-neutral-800 border border-white/5 text-neutral-400 font-black rounded-2xl text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-white transition-all">
                       <Share2 size={16} /> SHARE
                    </button>
                    <button className="py-4 bg-neutral-800 border border-white/5 text-neutral-400 font-black rounded-2xl text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:text-white transition-all">
                       <Eye size={16} /> SAVE
                    </button>
                 </div>
              </div>
           </div>
        </aside>
      </div>
    </div>
  );
};

export default RequirementDetail;