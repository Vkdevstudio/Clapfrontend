import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '../constants';
import { 
  ChevronLeft, Sparkles, CheckCircle2, Clock, Calendar, MessageSquare, Play, 
  Download, FileText, Briefcase, User, ShieldCheck, ArrowRight, Info, Zap, 
  MoreVertical, XCircle, X, Upload, Trash2, AlertCircle, Ticket, Radio, Activity,
  Camera, Mic, Monitor, Loader2, Video, Volume2, Settings2, Globe
} from 'lucide-react';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);
  
  // New Flow States
  const [isSubmitTapeOpen, setIsSubmitTapeOpen] = useState(false);
  const [isLiveSyncOpen, setIsLiveSyncOpen] = useState(false);
  
  const app = MOCK_APPLICATIONS.find(a => a.id === id) || MOCK_APPLICATIONS[0];

  const handleWithdraw = () => {
    setShowWithdrawConfirm(false);
    navigate('/applications');
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-32 max-w-6xl mx-auto px-4 sm:px-6 md:px-0">
      
      {/* 1. COMPACT NAV LAYER */}
      <div className="flex justify-between items-center py-2">
        <button 
          onClick={() => navigate('/applications')}
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
        >
          <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[9px] font-black uppercase tracking-[0.3em]">Back to Slate</span>
        </button>
        <button 
          onClick={() => setShowWithdrawConfirm(true)}
          className="flex items-center gap-2 text-neutral-800 hover:text-red-500 transition-colors"
        >
          <XCircle size={14} />
          <span className="text-[9px] font-black uppercase tracking-widest">Abort Mission</span>
        </button>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 md:gap-10 items-start">
        
        {/* 2. MAIN CORE (Left/Top) */}
        <div className="lg:col-span-8 space-y-8 md:space-y-12">
          
          {/* Header Section */}
          <header className="space-y-4 md:space-y-6">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className={`px-3 py-1 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest border shadow-lg ${
                app.status === 'Shortlisted' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                app.status === 'Selected' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                {app.status}
              </span>
              {app.matchScore && (
                <span className="flex items-center gap-1.5 text-red-500 text-[8px] md:text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-red-600/10 rounded-full border border-red-600/20">
                  <Sparkles size={10} /> {app.matchScore}% Logic Match
                </span>
              )}
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.9]">{app.roleName}</h1>
              <p className="text-lg md:text-2xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase">Prod: {app.productionName}</p>
            </div>
          </header>

          {/* Audition Center (Conditional Highlight) */}
          {app.status === 'Shortlisted' && (
            <section className="bg-red-600 border border-red-500 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 space-y-6 md:space-y-8 shadow-3xl shadow-red-600/20 animate-in zoom-in-95">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-white">
                     <Ticket size={24} className="md:w-8 md:h-8" />
                     <h3 className="text-xl md:text-3xl font-cinematic font-bold tracking-widest uppercase leading-none">Audition Active</h3>
                  </div>
                  <div className="bg-white text-red-600 px-3 py-1 rounded-full text-[8px] font-black uppercase animate-pulse">Action Required</div>
               </div>
               <div className="p-6 md:p-8 bg-black/20 rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 space-y-6">
                  <div className="space-y-2">
                     <p className="text-[9px] font-black text-white/60 uppercase tracking-widest">The Directive</p>
                     <p className="text-sm md:text-lg text-white font-medium italic leading-relaxed">"Prepare the 'Arjun Rages' monologue from page 14. Record a medium close-up shot with minimal background noise."</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                     <button 
                       onClick={() => setIsSubmitTapeOpen(true)}
                       className="py-4 md:py-5 bg-white text-black font-black rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-100 transition-all active-scale"
                     >
                        <Upload size={16} /> Submit Tape
                     </button>
                     <button 
                       onClick={() => setIsLiveSyncOpen(true)}
                       className="py-4 md:py-5 bg-black/40 text-white font-black border border-white/10 rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-black/60 transition-all active-scale"
                     >
                        <Radio size={16} /> Live Sync
                     </button>
                  </div>
               </div>
            </section>
          )}

          {/* Submission Overview */}
          <section className="bg-neutral-900/50 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 space-y-8 md:space-y-10 shadow-2xl">
            <div className="flex items-center gap-3 text-blue-500">
                <FileText size={20} className="md:w-6 md:h-6" />
                <h3 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase">Application Data</h3>
            </div>
            
            <div className="space-y-3">
                <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-1">Method Context</p>
                <div className="p-6 md:p-8 bg-black/40 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] italic text-neutral-400 text-sm md:text-base leading-relaxed font-medium">
                  "{app.methodApproach}"
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 border-t border-white/5">
                {app.mediaSubmitted?.map(media => (
                  <div key={media.id} className="group relative aspect-video bg-neutral-900 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/40 transition-all cursor-pointer shadow-xl active-scale">
                    <img src={media.thumbnail} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt={media.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
                      <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-[7px] md:text-[8px] font-black text-red-500 uppercase tracking-widest">Submitted Material</p>
                            <h4 className="text-sm md:text-lg font-bold text-white uppercase tracking-tight leading-none truncate max-w-[150px]">{media.title}</h4>
                          </div>
                          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-xl">
                            <Play size={18} fill="white" className="ml-1 md:w-5 md:h-5" />
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* Comms Log */}
          <section className="bg-neutral-900/50 border border-white/5 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 space-y-6 md:space-y-8 shadow-2xl">
            <div className="flex items-center gap-3 text-accent">
                <MessageSquare size={20} className="md:w-6 md:h-6" />
                <h3 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase">Log Comms</h3>
            </div>
            
            <div className="space-y-4">
                <div className="flex gap-4 md:gap-6 items-start animate-in slide-in-from-left-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border-2 border-white/5 overflow-hidden shrink-0">
                    <img src="https://picsum.photos/seed/director/100" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 p-5 md:p-6 bg-black/40 border border-white/5 rounded-[1.5rem] md:rounded-[2rem] space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[9px] font-black text-red-500 uppercase tracking-widest">{app.directorName}</p>
                        <p className="text-[8px] text-neutral-700 font-bold uppercase tracking-widest">Yesterday</p>
                      </div>
                      <p className="text-xs md:text-sm text-neutral-300 font-medium leading-relaxed italic">"Strong performance in the reel. Let's talk about the emotional beats for Scene 12."</p>
                  </div>
                </div>
            </div>
          </section>
        </div>

        {/* 3. TACTICAL RAIL (Right/Sidebar) */}
        <aside className="lg:col-span-4 space-y-6 md:space-y-8 lg:sticky lg:top-24">
          
          {/* Timeline Card - Compact for Mobile */}
          <section className="bg-neutral-900 border border-white/10 rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-10 space-y-8 md:space-y-10 shadow-3xl relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                <p className="text-[8px] md:text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">REGISTRY FLOW</p>
                <h4 className="text-2xl md:text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Timeline</h4>
              </div>

              <div className="space-y-8 md:space-y-10 relative z-10">
                <div className="absolute left-5 md:left-6 top-2 bottom-2 w-px bg-white/5" />
                {app.timeline.map((step, i) => (
                  <div key={i} className={`flex gap-6 md:gap-8 relative ${!step.completed ? 'opacity-20' : ''}`}>
                      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${
                        step.current ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-2xl shadow-red-600/40' : 
                        step.completed ? 'bg-green-600 border-green-500 text-white' : 'bg-neutral-800 border-white/5 text-neutral-600'
                      }`}>
                        {step.completed ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                      </div>
                      <div className="space-y-0.5 md:space-y-1">
                        <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-widest leading-none ${step.current ? 'text-white' : 'text-neutral-400'}`}>{step.label}</span>
                        {step.date && <p className="text-[8px] text-neutral-700 font-bold uppercase">{step.date}</p>}
                      </div>
                  </div>
                ))}
              </div>
          </section>

          {/* Tactical Actions Grid */}
          <div className="space-y-3">
              <button className="w-full py-5 md:py-8 bg-white text-black font-black rounded-[1.5rem] md:rounded-[2.5rem] shadow-3xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.4em] text-[10px] md:text-[11px] active-scale">
                <Download size={16} /> Download Sides
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="py-4 md:py-5 bg-neutral-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all shadow-xl active-scale"
                >
                    Update Files
                </button>
                <button 
                  onClick={() => setShowWithdrawConfirm(true)}
                  className="py-4 md:py-5 bg-neutral-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-900/10 transition-all shadow-xl active-scale"
                >
                    Withdraw
                </button>
              </div>
          </div>

          <div className="p-6 md:p-8 bg-neutral-900/40 border border-white/5 rounded-[1.5rem] md:rounded-[2.5rem] flex items-start gap-4">
              <Info size={14} className="text-blue-500 mt-1 shrink-0" />
              <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest leading-relaxed">
                Applied on {app.appliedAt}. Registry logic prevents unverified profile changes from affecting this mission after submission.
              </p>
          </div>
        </aside>
      </div>

      {/* MODALS */}
      <SubmitTapeModal isOpen={isSubmitTapeOpen} onClose={() => setIsSubmitTapeOpen(false)} roleName={app.roleName} />
      <LiveSyncModal isOpen={isLiveSyncOpen} onClose={() => setIsLiveSyncOpen(false)} roleName={app.roleName} />

      {/* WITHDRAW CONFIRM MODAL */}
      {showWithdrawConfirm && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-6">
           <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={() => setShowWithdrawConfirm(false)} />
           <div className="bg-neutral-900 border border-red-600/30 rounded-[2.5rem] md:rounded-[3rem] p-10 md:p-12 max-w-md w-full relative z-10 shadow-3xl text-center space-y-8 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/10 rounded-3xl flex items-center justify-center text-red-600 mx-auto">
                 <XCircle size={32} className="md:w-10 md:h-10" />
              </div>
              <div className="space-y-2">
                 <h2 className="text-3xl md:text-4xl font-cinematic font-bold text-white uppercase tracking-widest leading-tight">Terminate Submission?</h2>
                 <p className="text-neutral-500 text-xs md:text-sm font-medium italic">Withdrawal is permanent and removes your node from the production ledger.</p>
              </div>
              <div className="flex gap-3 md:gap-4">
                 <button onClick={() => setShowWithdrawConfirm(false)} className="flex-1 py-4 md:py-5 bg-neutral-800 text-white font-black rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest">Cancel</button>
                 <button onClick={handleWithdraw} className="flex-1 py-4 md:py-5 bg-red-600 text-white font-black rounded-xl md:rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-red-600/20 active-scale">Withdraw</button>
              </div>
           </div>
        </div>
      )}

      {/* UPDATE FILES MODAL */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsUpdateModalOpen(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-12 max-w-2xl w-full relative z-10 shadow-3xl space-y-8 md:space-y-10 animate-in zoom-in-95 duration-500">
             
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="flex items-center gap-3 text-red-500 mb-2">
                      <Upload size={18} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Ingest Protocol</span>
                   </div>
                   <h2 className="text-3xl md:text-5xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">Update Material</h2>
                </div>
                <button 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="p-2 md:p-3 bg-neutral-800 rounded-xl md:rounded-2xl text-neutral-500 hover:text-white transition-all"
                >
                  <X size={20} />
                </button>
             </div>

             <div className="space-y-6 md:space-y-8">
                <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-10 md:p-14 text-center space-y-4 md:space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all group cursor-pointer bg-black/20 relative overflow-hidden">
                   <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-900 rounded-[1.2rem] md:rounded-[1.5rem] flex items-center justify-center mx-auto text-neutral-700 group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-2xl relative z-10">
                      <Upload size={32} />
                   </div>
                   <div className="space-y-2 relative z-10">
                      <p className="text-xl font-cinematic font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">Replace Assets</p>
                      <p className="text-[9px] md:text-[10px] text-neutral-600 font-bold uppercase tracking-widest leading-relaxed mx-auto max-w-[240px]">
                        The director will be notified of the resubmission instantly.
                      </p>
                   </div>
                </div>
             </div>

             <div className="pt-4 md:pt-6 border-t border-white/5">
                <button 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="w-full py-6 md:py-7 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl md:rounded-3xl text-[10px] md:text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all active-scale"
                >
                  Confirm Material Update
                </button>
             </div>
          </div>
        </div>
      )}

      {/* 4. FOOTER SYNC */}
      <footer className="mt-12 text-center opacity-10">
         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12">
            <p className="text-[9px] font-black text-white uppercase tracking-[0.6em]">CLAP OS • MISSION HISTORY v4.2</p>
            <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-[0.5em]">
               <Activity size={12} /> SYNC: 12MS
            </div>
         </div>
      </footer>
    </div>
  );
};

/* --- FLOW SUB-COMPONENTS --- */

const SubmitTapeModal: React.FC<{ isOpen: boolean; onClose: () => void; roleName: string }> = ({ isOpen, onClose, roleName }) => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step === 2 && isOpen) {
      const timer = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(timer);
            setTimeout(() => setStep(3), 500);
            return 100;
          }
          return p + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [step, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-black/98 backdrop-blur-3xl" onClick={onClose} />
      <div className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-bottom-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3 text-red-500 mb-4">
                 <Upload size={20} className="animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em]">Tape Submission Protocol</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase leading-none">Submit Performance</h2>
              <p className="text-neutral-500 text-sm md:text-lg">Select your best take for <span className="text-white font-bold">{roleName}</span>.</p>
            </div>

            <div className="grid gap-4">
              <button onClick={() => setStep(2)} className="group p-8 md:p-12 border-2 border-dashed border-white/5 rounded-[2rem] text-center space-y-4 hover:border-red-600/30 transition-all bg-black/40 active-scale">
                 <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto text-neutral-600 group-hover:text-red-500 transition-colors">
                    <Video size={32} />
                 </div>
                 <p className="text-xs md:text-sm font-black text-neutral-500 uppercase tracking-widest">Browse Local Footage</p>
              </button>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-6 flex items-center text-neutral-600"><Globe size={18} /></div>
                <input type="text" placeholder="Or paste a link (Vimeo / YouTube)..." className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 py-5 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600" />
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={onClose} className="flex-1 py-5 bg-neutral-800 text-neutral-400 font-black rounded-2xl text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={() => setStep(2)} className="flex-[2] py-5 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl active-scale">Initialize Ingest</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 py-10 animate-in fade-in text-center">
             <div className="space-y-4">
                <div className="w-24 h-24 bg-neutral-900 rounded-3xl flex items-center justify-center mx-auto mb-8 relative">
                   <Loader2 size={40} className="text-red-500 animate-spin" />
                   <div className="absolute inset-0 border-2 border-red-600/20 rounded-3xl" />
                </div>
                <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Ingesting Assets...</h3>
                <p className="text-neutral-500 text-xs md:text-sm font-bold uppercase tracking-widest">Securing data in CLAP Vault: {progress}%</p>
             </div>
             <div className="max-w-xs mx-auto h-1 bg-neutral-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-600 transition-all duration-300 shadow-[0_0_10px_#DC2626]" style={{ width: `${progress}%` }} />
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-10 py-4 text-center animate-in zoom-in-95">
             <div className="w-24 h-24 bg-green-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-3xl transform rotate-12 mb-8">
                <CheckCircle2 size={48} className="text-white" />
             </div>
             <div className="space-y-3">
                <h2 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase leading-none">Tape Logged</h2>
                <p className="text-neutral-500 text-sm md:text-base font-medium max-w-sm mx-auto">Your performance has been successfully distributed to the Production Lead's Mission Control.</p>
             </div>
             <button onClick={onClose} className="w-full py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-widest shadow-xl active-scale">Return to Mission</button>
          </div>
        )}
      </div>
    </div>
  );
};

const LiveSyncModal: React.FC<{ isOpen: boolean; onClose: () => void; roleName: string }> = ({ isOpen, onClose, roleName }) => {
  const [state, setState] = useState<'check' | 'connecting' | 'live'>('check');
  const [checks, setChecks] = useState({ camera: false, mic: false, network: false });
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && state === 'connecting') {
      const timer = setTimeout(() => setState('live'), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, state]);

  // Handle actual camera feed if permitted
  useEffect(() => {
    if (isOpen && state === 'live') {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          if (videoRef.current) videoRef.current.srcObject = stream;
        })
        .catch(err => console.error("Camera Error:", err));
    }
    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(t => t.stop());
      }
    };
  }, [state, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#020202]/98 backdrop-blur-3xl" onClick={onClose} />
      
      <div className="bg-neutral-950 border border-white/10 rounded-[2.5rem] md:rounded-[4rem] p-8 md:p-12 max-w-4xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500 overflow-hidden">
        
        {state === 'check' && (
          <div className="space-y-10 animate-in slide-in-from-bottom-4">
             <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                <div className="space-y-2">
                   <div className="flex items-center gap-3 text-red-500 mb-4">
                      <Radio size={20} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Live Handshake Protocol</span>
                   </div>
                   <h2 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase leading-none">Technical Audit</h2>
                   <p className="text-neutral-500 text-sm md:text-lg">Initialize technical sync for the live callback session.</p>
                </div>
                <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl text-center shrink-0 w-full md:w-auto">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mb-1">Session ID</p>
                   <p className="text-2xl font-cinematic font-bold text-white tracking-widest">SYNC_8420-LX</p>
                </div>
             </div>

             <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { id: 'camera', label: 'Optics Check', icon: <Camera />, active: checks.camera },
                  { id: 'mic', label: 'Audio Levels', icon: <Mic />, active: checks.mic },
                  { id: 'network', label: 'Network Node', icon: <Globe />, active: checks.network }
                ].map(check => (
                  <button 
                    key={check.id}
                    onClick={() => setChecks(p => ({ ...p, [check.id]: true }))}
                    className={`p-8 rounded-[2rem] border transition-all text-center space-y-4 active-scale ${
                      check.active ? 'bg-green-600/10 border-green-500 text-green-500 shadow-xl shadow-green-600/10' : 'bg-black/40 border-white/5 text-neutral-600 hover:border-red-600/30'
                    }`}
                  >
                     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto transition-all ${check.active ? 'bg-green-600 text-white' : 'bg-neutral-900 text-neutral-700'}`}>
                        {check.active ? <CheckCircle2 size={24} /> : check.icon}
                     </div>
                     <p className="text-[10px] font-black uppercase tracking-[0.2em]">{check.label}</p>
                  </button>
                ))}
             </div>

             <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-6 bg-neutral-900 text-neutral-500 font-black rounded-2xl text-[10px] uppercase tracking-widest">Abort</button>
                <button 
                  onClick={() => setState('connecting')}
                  disabled={!checks.camera || !checks.mic || !checks.network}
                  className="flex-[2] py-6 bg-red-600 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-3xl shadow-red-600/30 disabled:opacity-20 active-scale"
                >
                  ESTABLISH MISSION LINK
                </button>
             </div>
          </div>
        )}

        {state === 'connecting' && (
          <div className="space-y-12 py-20 text-center animate-in fade-in">
             <div className="relative w-32 h-32 mx-auto mb-10">
                <div className="absolute inset-0 rounded-full border-4 border-red-600/10 animate-ping" />
                <div className="absolute inset-2 rounded-full border-4 border-red-600/20 animate-ping delay-300" />
                <div className="relative w-full h-full bg-neutral-900 rounded-full flex items-center justify-center text-red-500 border border-white/5">
                   <Zap size={48} className="animate-pulse" />
                </div>
             </div>
             <div className="space-y-3">
                <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Routing Link...</h3>
                <p className="text-neutral-500 text-xs md:text-sm font-black uppercase tracking-[0.4em]">Connecting to Region Mumbai Hub 04</p>
             </div>
          </div>
        )}

        {state === 'live' && (
          <div className="space-y-8 animate-in zoom-in-95 duration-500">
             {/* Main Live View */}
             <div className="aspect-video bg-neutral-900 rounded-[2.5rem] overflow-hidden border-2 border-red-600 shadow-3xl relative group">
                <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover grayscale opacity-60 scale-x-[-1]" />
                <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4 bg-red-600 px-6 py-2 rounded-full shadow-xl animate-pulse">
                         <div className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
                         <span className="text-[10px] font-black text-white uppercase tracking-widest">ON AIR • LIVE</span>
                      </div>
                      <div className="text-right">
                         <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mb-1">Latency</p>
                         <p className="text-xl font-cinematic font-bold text-green-500 tracking-widest leading-none">12ms</p>
                      </div>
                   </div>

                   <div className="flex justify-between items-end">
                      <div className="space-y-1">
                         <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Unit Receiver</p>
                         <p className="text-2xl font-cinematic font-bold text-white tracking-widest leading-none">DIR. RAJESH KUMAR</p>
                      </div>
                      <div className="flex gap-2">
                         <div className="p-3 bg-black/60 rounded-xl backdrop-blur-xl border border-white/10 text-white"><Mic size={16}/></div>
                         <div className="p-3 bg-black/60 rounded-xl backdrop-blur-xl border border-white/10 text-white"><Monitor size={16}/></div>
                      </div>
                   </div>
                </div>
                <div className="scanline opacity-[0.05]" />
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Network', val: '5G_HIGH_BW', icon: <Globe size={14}/> },
                  { label: 'Audio', val: 'Sync-Check OK', icon: <Volume2 size={14}/> },
                  { label: 'Slate', val: 'Day 12B-04', icon: <Settings2 size={14}/> },
                  { label: 'Security', val: 'Encrypted', icon: <ShieldCheck size={14}/> }
                ].map((m, i) => (
                  <div key={i} className="bg-neutral-900/50 border border-white/5 p-4 rounded-2xl space-y-1">
                     <div className="flex items-center gap-2 text-neutral-600">
                        {m.icon}
                        <span className="text-[8px] font-black uppercase tracking-widest">{m.label}</span>
                     </div>
                     <p className="text-[10px] font-bold text-white uppercase truncate">{m.val}</p>
                  </div>
                ))}
             </div>

             <button 
               onClick={onClose}
               className="w-full py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl text-[14px] uppercase tracking-[0.5em] shadow-3xl shadow-red-600/40 active-scale flex items-center justify-center gap-4 group"
             >
                TERMINATE LIVE SESSION <X size={20} className="group-hover:rotate-90 transition-transform" />
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationDetail;