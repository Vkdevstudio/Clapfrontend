
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_AUDITIONS, MOCK_APPLICATIONS } from '../constants';
import { 
  UserPlus, Search, Filter, Star, Play, CheckCircle, XCircle, 
  ChevronRight, Sparkles, Award, ShieldCheck, Mail, Phone,
  Eye, Zap, Activity, Users, LayoutGrid
} from 'lucide-react';
import CreateRequirementModal from '../components/CreateRequirementModal';
import ApplicantDetailModal from '../components/ApplicantDetailModal';
import { Application } from '../types';

const ProductionCasting: React.FC = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(MOCK_AUDITIONS[0].roleName);
  const [isRequirementModalOpen, setIsRequirementModalOpen] = useState(false);
  const [selectedApplicant, setSelectedApplicant] = useState<Application | null>(null);
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);
  
  // Filter applicants based on role name
  const applicants = MOCK_APPLICATIONS.filter(app => app.roleName === selectedRole);

  const handleOpenApplicant = (app: Application) => {
    setSelectedApplicant(app);
    setIsApplicantModalOpen(true);
  };

  const shortlistedCount = applicants.filter(a => a.status === 'Shortlisted').length;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto px-4 md:px-0">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#DC2626]" />
             <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Director's Command Hub • Casting Matrix</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            Casting <br />
            <span className="text-neutral-500 tracking-normal font-sans text-3xl md:text-5xl">Engine.</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <div className="bg-neutral-900 border border-white/5 p-6 rounded-3xl text-center min-w-[180px] hidden sm:block">
              <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest mb-1">Total Unit Pool</p>
              <p className="text-4xl font-cinematic font-bold text-white tracking-widest">1,420</p>
           </div>
           <button 
             onClick={() => setIsRequirementModalOpen(true)}
             className="flex-1 sm:flex-none px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3"
           >
              <UserPlus size={18} /> New Requirement
           </button>
        </div>
      </header>

      {/* Overview Stats Ribbon */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Role Candidates', val: applicants.length, icon: <Users size={16}/>, color: 'text-white' },
           { label: 'Shortlisted', val: shortlistedCount, icon: <Star size={16}/>, color: 'text-yellow-500' },
           { label: 'Verified Nodes', val: applicants.length, icon: <ShieldCheck size={16}/>, color: 'text-blue-500' },
           { label: 'Avg. Match', val: '86%', icon: <Sparkles size={16}/>, color: 'text-red-500' }
         ].map((stat, i) => (
           <div key={i} className="p-6 bg-neutral-900 border border-white/5 rounded-3xl space-y-3 shadow-xl">
              <div className={`p-2.5 w-fit rounded-xl bg-black/40 ${stat.color}`}>
                 {stat.icon}
              </div>
              <div>
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-2xl font-cinematic font-bold text-white tracking-widest">{stat.val}</p>
              </div>
           </div>
         ))}
      </section>

      {/* Role Selection Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide border-b border-white/5">
         {MOCK_AUDITIONS.map(a => (
           <button 
             key={a.id}
             onClick={() => setSelectedRole(a.roleName)}
             className={`px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all whitespace-nowrap ${
               selectedRole === a.roleName ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500'
             }`}
           >
             {a.roleName}
           </button>
         ))}
         <button className="px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest border border-dashed border-white/10 text-neutral-800 hover:text-neutral-500 transition-all">
            + OTHER GIGS
         </button>
      </div>

      {/* Applicant Grid */}
      <div className="grid lg:grid-cols-12 gap-8">
        
        {/* Main Applicant List */}
        <div className="lg:col-span-9 space-y-4">
           <div className="flex justify-between items-center px-2 mb-6">
              <div className="flex items-center gap-4">
                 <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em]">Active Personnel Log</h3>
                 <span className="text-[9px] font-bold text-red-500 bg-red-600/10 px-2 py-0.5 rounded uppercase tracking-widest">{selectedRole}</span>
              </div>
              <div className="flex gap-4">
                 <div className="relative group hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500" size={14} />
                    <input type="text" placeholder="Audit candidate nodes..." className="bg-neutral-900 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-[10px] text-white outline-none focus:ring-1 focus:ring-red-600 transition-all uppercase" />
                 </div>
              </div>
           </div>

           {applicants.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {applicants.map(app => (
                  <div 
                    key={app.id} 
                    onClick={() => handleOpenApplicant(app)}
                    className="group bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 space-y-8 hover:border-red-600/30 transition-all shadow-2xl relative overflow-hidden active-scale cursor-pointer"
                  >
                     <div className="flex items-start justify-between relative z-10">
                        <div className="flex items-center gap-5">
                           <div className="w-20 h-20 rounded-[1.5rem] border-4 border-neutral-950 bg-neutral-800 overflow-hidden shadow-xl">
                              <img src={app.applicantAvatar} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt={app.applicantName} />
                           </div>
                           <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                 <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">{app.applicantName}</h4>
                                 <ShieldCheck size={14} className="text-blue-500" />
                              </div>
                              <p className="text-[9px] font-black text-red-500 uppercase tracking-widest bg-red-600/10 px-2 py-0.5 rounded-full inline-block">
                                 <Sparkles size={10} className="inline mr-1" /> {app.matchScore}% GENIE MATCH
                              </p>
                           </div>
                        </div>
                        <button className="p-3 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-all shadow-lg"><Eye size={18} /></button>
                     </div>

                     <div className="space-y-4 relative z-10">
                        <p className="text-xs text-neutral-400 font-medium italic leading-relaxed line-clamp-2">"{app.methodApproach || 'No specific approach logged for this mission.'}"</p>
                        <div className="flex flex-wrap gap-2">
                           {['Method', 'Martial Arts', 'Fluent Hindi'].map(tag => (
                             <span key={tag} className="text-[8px] font-black text-neutral-600 border border-white/5 px-2 py-0.5 rounded uppercase">{tag}</span>
                           ))}
                        </div>
                     </div>

                     <div className="pt-6 border-t border-white/5 flex gap-3 relative z-10">
                        <button className="flex-1 py-4 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-lg active-scale group-hover:bg-red-700">SHORTLIST</button>
                        <button className="flex-1 py-4 bg-neutral-800 text-neutral-400 font-black rounded-xl text-[10px] uppercase tracking-widest border border-white/5 hover:text-white">ARCHIVE</button>
                     </div>
                  </div>
                ))}
             </div>
           ) : (
             <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-black/20 space-y-6">
                <div className="w-16 h-16 bg-neutral-900 rounded-2xl flex items-center justify-center mx-auto text-neutral-800">
                   <LayoutGrid size={32}/>
                </div>
                <div className="space-y-1">
                   <h3 className="text-2xl font-cinematic font-bold text-neutral-600 uppercase tracking-widest">No Active Nodes Found</h3>
                   <p className="text-[9px] font-bold text-neutral-700 uppercase">Wait for registry sync or check filters</p>
                </div>
             </div>
           )}
        </div>

        {/* Intelligence Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
              <div className="flex items-center gap-3 text-red-500">
                 <Zap size={20} className="animate-pulse" />
                 <h4 className="text-xl font-cinematic font-bold tracking-widest uppercase">Genie Insight</h4>
              </div>
              <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic">
                "For the role of {selectedRole}, focus on candidates with high 'Physical Accuracy' metrics. Scene 12 requires heavy stunt coordination."
              </p>
              <div className="pt-4 border-t border-white/5 space-y-3">
                 <div className="flex justify-between items-center">
                    <span className="text-[8px] font-black text-neutral-700 uppercase">Pool Density</span>
                    <span className="text-[9px] font-bold text-white uppercase">OPTIMAL</span>
                 </div>
                 <div className="h-1 w-full bg-black rounded-full overflow-hidden">
                    <div className="h-full bg-red-600 w-4/5" />
                 </div>
              </div>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
              <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Audit Timeline</h4>
              <div className="space-y-4">
                 {[
                   { event: 'Shortlisted Vikram', time: '12m ago' },
                   { event: 'New Reel: Sonia R.', time: '2h ago' },
                   { event: 'Registry Scanned', time: '5h ago' }
                 ].map((log, i) => (
                   <div key={i} className="flex flex-col gap-1 border-l border-red-600/30 pl-4 py-1">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">{log.event}</span>
                      <span className="text-[8px] font-bold text-neutral-600 uppercase">{log.time}</span>
                   </div>
                 ))}
              </div>
           </section>
        </aside>
      </div>

      {/* Requirement Creation Modal */}
      <CreateRequirementModal 
        isOpen={isRequirementModalOpen}
        onClose={() => setIsRequirementModalOpen(false)}
      />

      {/* Applicant Detail Modal */}
      <ApplicantDetailModal 
        isOpen={isApplicantModalOpen}
        onClose={() => setIsApplicantModalOpen(false)}
        application={selectedApplicant}
      />
    </div>
  );
};

export default ProductionCasting;
