
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_APPLICATIONS } from '../constants';
import { 
  ChevronLeft, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  Play, 
  Download, 
  FileText, 
  Briefcase, 
  User, 
  ShieldCheck, 
  ArrowRight,
  Info,
  Zap,
  MoreVertical,
  XCircle,
  X,
  Upload,
  Trash2,
  AlertCircle
} from 'lucide-react';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const app = MOCK_APPLICATIONS.find(a => a.id === id) || MOCK_APPLICATIONS[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Shortlisted': return 'text-yellow-500';
      case 'Selected': return 'text-green-500';
      case 'Declined': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-5xl mx-auto px-4 md:px-0">
      <button 
        onClick={() => navigate('/applications')}
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-6"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to All Applications</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-10 items-start">
        
        {/* Main Application Logic */}
        <div className="lg:col-span-8 space-y-12">
          
          {/* Header Section */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-xl ${
                app.status === 'Shortlisted' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                app.status === 'Selected' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                'bg-blue-500/10 text-blue-500 border-blue-500/20'
              }`}>
                {app.status}
              </span>
              <span className="bg-neutral-900 border border-white/5 text-neutral-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {app.projectType}
              </span>
              {app.matchScore && (
                <span className="flex items-center gap-1.5 text-red-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 bg-red-600/10 rounded-full border border-red-600/20">
                  <Sparkles size={12} /> {app.matchScore}% Match Score
                </span>
              )}
            </div>
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">{app.roleName}</h1>
              <p className="text-xl md:text-2xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase">Production: {app.productionName}</p>
            </div>
            <p className="text-neutral-500 font-medium italic leading-relaxed text-lg">"Here’s everything about this role—what you submitted, who saw it, and what’s next."</p>
          </header>

          {/* Submission Overview Card */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl bg-black/20">
            <div className="flex items-center gap-4 text-blue-500">
                <FileText size={24} />
                <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase">Role Overview</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Production Lead</p>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center text-white border border-white/5">
                        <User size={18} />
                      </div>
                      <p className="text-lg font-bold text-white uppercase tracking-tight">{app.directorName} (Director)</p>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Application Date</p>
                  <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-red-500 border border-white/5">
                        <Calendar size={18} />
                      </div>
                      <p className="text-lg font-bold text-white uppercase tracking-tight">{app.appliedAt}</p>
                  </div>
                </div>
            </div>

            <div className="space-y-4 pt-6 border-t border-white/5">
                <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Your Professional Approach</p>
                <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] italic text-neutral-400 leading-relaxed font-medium">
                  "{app.methodApproach}"
                </div>
            </div>
          </section>

          {/* Submissions Section */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-2">
               <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Your Submissions</h3>
               <button 
                onClick={() => setIsUpdateModalOpen(true)}
                className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-white transition-colors"
               >
                 Manage Files
               </button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
                {app.mediaSubmitted?.map(media => (
                  <div key={media.id} className="group relative aspect-video bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/40 transition-all cursor-pointer shadow-3xl">
                    <img src={media.thumbnail} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700" alt={media.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8">
                      <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className="text-[8px] font-black text-red-500 uppercase tracking-widest">Submission File</p>
                            <h4 className="text-lg font-bold text-white uppercase tracking-tight leading-none">{media.title}</h4>
                          </div>
                          <div className="w-14 h-14 rounded-full bg-red-600 flex items-center justify-center text-white shadow-3xl group-hover:scale-110 transition-transform">
                            <Play size={24} fill="white" className="ml-1" />
                          </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest text-center">Material submitted on {app.appliedAt}. You can update files until Review is locked.</p>
          </section>

          {/* Activity / Interaction Log */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 space-y-8 shadow-3xl">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-accent">
                  <MessageSquare size={24} />
                  <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase">Director's Feedback</h3>
                </div>
                <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Real-time Feed</span>
            </div>
            
            <div className="space-y-6">
                <div className="flex gap-6 items-start animate-in slide-in-from-left-4 duration-500">
                  <img src="https://picsum.photos/seed/director/100" className="w-12 h-12 rounded-2xl border-2 border-white/5" />
                  <div className="flex-1 p-6 bg-black/40 border border-white/5 rounded-[2rem] space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{app.directorName}</p>
                        <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-widest">Yesterday</p>
                      </div>
                      <p className="text-sm text-neutral-300 font-medium">"Strong performance in the reel. I'd like to see more grit in the eyes during the emotional peak. Let's schedule a chemistry read."</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start flex-row-reverse opacity-60">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center border border-white/5 text-neutral-600 font-black">YOU</div>
                  <div className="flex-1 p-6 bg-red-600/10 border border-red-600/20 rounded-[2rem] space-y-2">
                      <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-white uppercase tracking-widest">You</p>
                        <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-widest">Yesterday</p>
                      </div>
                      <p className="text-sm text-white font-medium">Thank you, Rajesh. I am ready for the chemistry read whenever you launch the slot.</p>
                  </div>
                </div>
            </div>
          </section>
        </div>

        {/* Tactical Rail / Progress - STICKY ON DESKTOP */}
        <aside className="lg:col-span-4 space-y-8 lg:sticky lg:top-28">
          
          {/* Progress Tracker Card */}
          <section className="bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 space-y-10 shadow-3xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <Zap size={150} />
              </div>
              <div className="space-y-1 relative z-10">
                <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">MISSION STATUS</p>
                <h4 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Timeline</h4>
              </div>

              <div className="space-y-10 relative z-10">
                <div className="absolute left-6 top-2 bottom-2 w-px bg-white/5" />
                {app.timeline.map((step, i) => (
                  <div key={i} className={`flex gap-8 relative ${!step.completed ? 'opacity-30' : ''}`}>
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-700 ${
                        step.current ? 'bg-red-600 border-red-500 text-white animate-pulse shadow-3xl shadow-red-600/40' : 
                        step.completed ? 'bg-green-600 border-green-500 text-white' : 'bg-neutral-800 border-white/5 text-neutral-600'
                      }`}>
                        {step.completed ? <CheckCircle2 size={20} /> : <Clock size={20} />}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                            <span className={`text-[11px] font-black uppercase tracking-widest ${step.current ? 'text-white' : 'text-neutral-400'}`}>{step.label}</span>
                            {step.date && <span className="text-[9px] text-neutral-700 font-bold uppercase">{step.date}</span>}
                        </div>
                        {step.current && (
                          <p className="text-[9px] font-black text-red-500 uppercase tracking-widest animate-in slide-in-from-left-2 duration-300">Current Phase Active</p>
                        )}
                      </div>
                  </div>
                ))}
              </div>
          </section>

          {/* Financials / Escrow Node */}
          <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 space-y-6 shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-110 transition-transform">
                <ShieldCheck size={120} />
              </div>
              <div className="flex items-center gap-4 text-green-500 relative z-10">
                <CheckCircle2 size={28} />
                <h4 className="text-xl md:text-2xl font-cinematic font-bold uppercase tracking-widest leading-none">Smart <br />Funds</h4>
              </div>
              <div className="space-y-4 relative z-10">
                <p className="text-sm md:text-base text-neutral-400 font-medium leading-relaxed italic">
                    "Money for this role is safely held in Escrow and will release instantly once your characters scenes are wrapped."
                </p>
                <div className="pt-4 flex justify-between items-center border-t border-white/5">
                    <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Escrow Status</span>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">SECURED</span>
                </div>
              </div>
          </section>

          {/* Quick Actions Rail */}
          <div className="space-y-4">
              <div className="group relative">
                <button className="w-full py-6 md:py-8 bg-white text-black font-black rounded-3xl shadow-3xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.4em] text-[11px] active-scale">
                  <Download size={18} /> Download Sides
                </button>
                <div className="mt-2 text-center">
                  <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest italic">"Sides" = Specific script pages for your scenes</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsUpdateModalOpen(true)}
                  className="py-5 bg-neutral-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all shadow-xl"
                >
                    Update Files
                </button>
                <button className="py-5 bg-neutral-900 border border-white/5 rounded-2xl text-[9px] font-black uppercase tracking-[0.2em] text-red-500 hover:bg-red-900/10 transition-all shadow-xl">
                    Withdraw
                </button>
              </div>
          </div>

          {/* Final Trust Note */}
          <div className="p-8 bg-neutral-900/40 border border-white/5 rounded-[2.5rem] flex items-start gap-4">
              <Info size={16} className="text-blue-500 mt-1 shrink-0" />
              <p className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest leading-relaxed">
                You’ve applied—good luck! Next step: Production is reviewing your submission. You will be notified of any changes to your status.
              </p>
          </div>
        </aside>
      </div>

      {/* UPDATE FILES MODAL */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setIsUpdateModalOpen(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[3.5rem] p-10 md:p-14 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 animate-in zoom-in-95 duration-500">
             
             <div className="flex justify-between items-start">
                <div className="space-y-1">
                   <div className="flex items-center gap-3 text-red-500 mb-2">
                      <Upload size={20} className="animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-[0.4em]">Asset Ingest Protocol</span>
                   </div>
                   <h2 className="text-4xl md:text-5xl font-cinematic font-bold tracking-tighter text-white uppercase">Refresh Media</h2>
                </div>
                <button 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="p-3 bg-neutral-800 rounded-2xl text-neutral-500 hover:text-white transition-all"
                >
                  <X size={24} />
                </button>
             </div>

             <div className="space-y-8">
                {/* Current Active Submissions */}
                <div className="space-y-4">
                   <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-2">Active Slate Files</p>
                   <div className="space-y-2">
                      {app.mediaSubmitted?.map(file => (
                        <div key={file.id} className="p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-red-500">
                                 <Play size={18} fill="currentColor" />
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-white uppercase tracking-tight">{file.title}</p>
                                 <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">Locked for initial review</p>
                              </div>
                           </div>
                           <button className="p-2 text-neutral-700 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">
                              <Trash2 size={16} />
                           </button>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Upload Zone */}
                <div className="border-2 border-dashed border-white/5 rounded-[2.5rem] p-12 text-center space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all group cursor-pointer bg-black/20 relative overflow-hidden">
                   <div className="absolute inset-0 scanline opacity-5" />
                   <div className="w-20 h-20 bg-neutral-900 rounded-[1.5rem] flex items-center justify-center mx-auto text-neutral-700 group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-2xl relative z-10">
                      <Upload size={32} />
                   </div>
                   <div className="space-y-2 relative z-10">
                      <p className="text-xl font-cinematic font-bold text-neutral-400 uppercase tracking-widest group-hover:text-white transition-colors">Supply Fresh Take</p>
                      <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest leading-relaxed mx-auto max-w-[240px]">
                        MP4, MOV or HEVC. Max size 2GB. Digital Negative preferred.
                      </p>
                   </div>
                </div>

                <div className="p-6 bg-red-600/5 border border-red-600/10 rounded-2xl flex items-start gap-4">
                   <AlertCircle size={18} className="text-red-500 mt-1 shrink-0" />
                   <p className="text-[10px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest">
                     Updated files will replace existing placeholders in the Director's Workspace. Previous versions are archived but not deleted.
                   </p>
                </div>
             </div>

             <div className="pt-6 border-t border-white/5">
                <button 
                  onClick={() => setIsUpdateModalOpen(false)}
                  className="w-full py-7 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 transition-all active-scale"
                >
                  Confirm Asset Ingest
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationDetail;
