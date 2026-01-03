
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_AUDITIONS } from '../constants';
import { 
  ChevronLeft, MapPin, Clock, DollarSign, CheckCircle2, Info, 
  ShieldCheck, Share2, Calendar, Users, Zap, Play, X
} from 'lucide-react';
import ApplyModal from '../components/ApplyModal';

const RequirementDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [hasApplied, setHasApplied] = useState(false);
  
  const req = MOCK_AUDITIONS.find(r => r.id === id) || MOCK_AUDITIONS[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-5xl mx-auto px-4 md:px-0">
      <button 
        onClick={() => navigate('/discover')}
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-6"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Opportunities</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-12">
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-600/20">
                {req.workType}
              </span>
              <span className="bg-neutral-900 border border-white/5 text-neutral-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                Deadline: {req.deadline}
              </span>
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">{req.roleName}</h1>
              <p className="text-xl md:text-2xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase">Project: {req.projectTitle}</p>
            </div>
          </header>

          <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl bg-black/20">
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Location</p>
                     <p className="text-lg font-bold text-white uppercase tracking-tight">{req.location}</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><Calendar size={12}/> Duration</p>
                     <p className="text-lg font-bold text-white uppercase tracking-tight">{req.duration}</p>
                  </div>
               </div>
               <div className="space-y-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><DollarSign size={12}/> Compensation</p>
                     <p className="text-2xl font-cinematic font-bold text-green-500 uppercase tracking-widest">{req.payScale}</p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><Users size={12}/> Hirer</p>
                     <p className="text-lg font-bold text-white uppercase tracking-tight">{req.postedBy}</p>
                  </div>
               </div>
            </div>
          </section>

          <section className="space-y-6">
             <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase px-2">Job Description</h3>
             <p className="text-neutral-400 font-medium leading-relaxed text-lg italic">"{req.roleDescription}"</p>
          </section>

          <section className="space-y-6">
             <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase px-2">Key Requirements</h3>
             <div className="grid sm:grid-cols-2 gap-4">
                {req.requirements.map(r => (
                  <div key={r} className="flex items-center gap-4 p-5 bg-neutral-900 border border-white/5 rounded-2xl group hover:border-red-600/30 transition-all">
                     <CheckCircle2 size={18} className="text-red-500" />
                     <span className="text-xs font-bold text-neutral-300 uppercase tracking-widest">{r}</span>
                  </div>
                ))}
             </div>
          </section>

          <section className="space-y-6">
             <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase px-2">On-Set Logistics</h3>
             <div className="grid grid-cols-3 gap-4">
                {[
                   { label: 'Food Provided', val: req.logistics.foodProvided },
                   { label: 'Travel Cost', val: req.logistics.travelProvided },
                   { label: 'Stay / Hotel', val: req.logistics.stayProvided }
                ].map(l => (
                   <div key={l.label} className="p-6 bg-black/40 border border-white/5 rounded-3xl text-center space-y-2">
                      <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">{l.label}</p>
                      <p className={`text-[10px] font-black uppercase ${l.val ? 'text-green-500' : 'text-neutral-800'}`}>
                        {l.val ? 'INCLUDED' : 'NOT INCLUDED'}
                      </p>
                   </div>
                ))}
             </div>
          </section>
        </div>

        {/* Action Sidebar - STICKY ON DESKTOP */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
           <div className="bg-neutral-900 border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-3xl">
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-green-500">
                    <ShieldCheck size={28} />
                    <h4 className="text-xl font-cinematic font-bold uppercase tracking-widest leading-none">Safe <br />Payments</h4>
                 </div>
                 <p className="text-xs text-neutral-500 font-medium leading-relaxed italic">
                   "Compensation for this role is already secured by CLAP OS. Funds release instantly when you wrap your scenes."
                 </p>
              </div>

              <div className="space-y-4">
                 {!hasApplied ? (
                    <button 
                      onClick={() => setIsApplyModalOpen(true)}
                      className="w-full py-7 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl shadow-3xl shadow-red-600/30 transition-all active-scale text-[13px] uppercase tracking-[0.4em] flex items-center justify-center gap-3"
                    >
                       APPLY NOW <Zap size={18} />
                    </button>
                 ) : (
                    <div className="w-full py-7 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-3xl text-center text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3">
                       <CheckCircle2 size={18} /> APPLICATION SENT
                    </div>
                 )}
                 <button className="w-full py-5 bg-neutral-800 border border-white/5 text-neutral-400 font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:text-white transition-all">
                    <Share2 size={16} /> SHARE JOB
                 </button>
              </div>

              <div className="pt-8 border-t border-white/5 space-y-4">
                 <div className="flex items-center gap-3 text-neutral-600">
                    <Info size={16} />
                    <p className="text-[9px] font-bold uppercase tracking-widest leading-relaxed">
                      Your full verified profile and portfolio will be shared with Moonlight Films.
                    </p>
                 </div>
              </div>
           </div>
        </aside>
      </div>

      {isApplyModalOpen && (
        <ApplyModal 
          audition={req} 
          onClose={() => setIsApplyModalOpen(false)} 
          onSuccess={() => {
            setIsApplyModalOpen(false);
            setHasApplied(true);
          }}
        />
      )}
    </div>
  );
};

export default RequirementDetail;
