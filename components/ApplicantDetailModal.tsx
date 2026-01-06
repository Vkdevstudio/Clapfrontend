import React, { useState } from 'react';
import Modal from './Modal';
import ContractModal from './ContractModal';
import { 
  Star, 
  Play, 
  MessageSquare, 
  Clock, 
  Award, 
  ShieldCheck, 
  Zap, 
  Download, 
  Mail, 
  Phone,
  CheckCircle2,
  XCircle,
  Sparkles,
  Activity,
  User,
  History,
  TrendingUp
} from 'lucide-react';
import { Application, Contract } from '../types';

interface ApplicantDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: Application | null;
}

const ApplicantDetailModal: React.FC<ApplicantDetailModalProps> = ({ isOpen, onClose, application }) => {
  const [isContractModalOpen, setIsContractModalOpen] = useState(false);

  if (!application) return null;

  const handleHireClick = () => {
    setIsContractModalOpen(true);
  };

  const mockContractData: Partial<Contract> = {
    roleName: application.roleName,
    projectTitle: application.projectTitle,
    amount: '₹5,00,000', // Registry calculated base
    type: 'PPA',
    terms: `This Production Purchase Agreement (PPA) outlines the terms of engagement for the role of ${application.roleName}. Engagement includes principal photography, rehearsals, and all promotional activities as specified in the registry rider.`
  };

  return (
    <>
      <Modal 
        isOpen={isOpen} 
        onClose={onClose} 
        title="Personnel File" 
        subtitle={`Application Node: ${application.id}`}
        maxWidth="max-w-5xl"
      >
        <div className="space-y-12 pb-10">
          
          {/* 1. Profile Header & Genie Match */}
          <section className="flex flex-col md:flex-row gap-10 items-start border-b border-white/5 pb-10">
             <div className="w-40 h-40 md:w-56 md:h-56 rounded-[3rem] border-4 border-neutral-950 bg-neutral-800 overflow-hidden shadow-3xl shrink-0 group relative">
                <img src={application.applicantAvatar} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0" alt={application.applicantName} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
             </div>

             <div className="flex-1 space-y-6">
                <div className="space-y-2">
                   <div className="flex items-center gap-3">
                      <h2 className="text-4xl md:text-6xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{application.applicantName}</h2>
                      <ShieldCheck size={24} className="text-blue-500" />
                   </div>
                   <p className="text-xl font-cinematic font-bold text-neutral-500 uppercase tracking-widest">{application.roleName} • {application.status}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                   <div className="px-5 py-3 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center gap-3">
                      <Sparkles size={16} className="text-red-500 animate-pulse" />
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-red-500 uppercase tracking-widest">Logic Match</p>
                         <p className="text-xl font-cinematic font-bold text-white">{application.matchScore}%</p>
                      </div>
                   </div>
                   <div className="px-5 py-3 bg-neutral-950 border border-white/5 rounded-2xl flex items-center gap-3">
                      <TrendingUp size={16} className="text-accent" />
                      <div className="space-y-0.5">
                         <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Clap Score</p>
                         <p className="text-xl font-cinematic font-bold text-white">842</p>
                      </div>
                   </div>
                </div>
             </div>
          </section>

          {/* 2. Media Center & Bio */}
          <div className="grid lg:grid-cols-12 gap-10">
             <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                      <Play size={16} fill="currentColor" /> Primary Reel
                   </h3>
                   <div className="aspect-video bg-black rounded-[2.5rem] overflow-hidden border-2 border-white/5 relative group cursor-pointer shadow-3xl">
                      {application.mediaSubmitted?.[0] ? (
                        <img src={application.mediaSubmitted[0].thumbnail} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-neutral-800"><User size={80} /></div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-3xl transform group-hover:scale-110 transition-transform">
                            <Play size={32} fill="white" className="ml-1" />
                         </div>
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                      <User size={16} /> Methodology
                   </h3>
                   <p className="text-lg font-medium text-neutral-400 italic leading-relaxed bg-black/40 p-8 rounded-[2rem] border border-white/5">
                      "{application.methodApproach || 'Applicant has not logged a specific method approach for this mission.'}"
                   </p>
                </div>
             </div>

             {/* 3. Interaction Ledger & Timeline */}
             <div className="lg:col-span-5 space-y-8">
                <section className="bg-neutral-950 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
                   <h3 className="text-sm font-black text-white uppercase tracking-[0.3em] flex items-center gap-3">
                      <History size={16} /> Interaction Log
                   </h3>
                   
                   <div className="space-y-6 relative">
                      <div className="absolute left-4 top-2 bottom-2 w-px bg-white/5" />
                      {application.timeline.map((event, i) => (
                        <div key={i} className="flex gap-6 relative">
                           <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-all z-10 ${
                             event.current ? 'bg-red-600 border-red-500 text-white animate-pulse' : 
                             event.completed ? 'bg-green-600/10 border-green-500/20 text-green-500' : 
                             'bg-neutral-900 border-white/5 text-neutral-600'
                           }`}>
                              {event.completed ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
                           </div>
                           <div className="space-y-1">
                              <p className={`text-[10px] font-black uppercase tracking-widest ${event.current ? 'text-white' : 'text-neutral-500'}`}>{event.label}</p>
                              {event.date && <p className="text-[8px] text-neutral-700 font-bold uppercase">{event.date}</p>}
                           </div>
                        </div>
                      ))}
                   </div>
                </section>

                <section className="bg-blue-600/5 border border-blue-600/10 p-8 rounded-[2.5rem] space-y-4">
                   <div className="flex items-center gap-3 text-blue-500">
                      <Zap size={18} />
                      <h4 className="text-[10px] font-black uppercase tracking-widest">Internal Unit Note</h4>
                   </div>
                   <p className="text-[11px] text-neutral-400 font-medium italic leading-relaxed">
                     "Strong potential for Scene 12 emotional beats. Recommend direct handshake session with DP."
                   </p>
                </section>
             </div>
          </div>

          {/* 4. Action Command Bar */}
          <footer className="pt-10 border-t border-white/5 flex flex-col sm:flex-row gap-4">
             <button 
              onClick={handleHireClick}
              className="flex-[2] py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl hover:bg-red-700 transition-all active-scale"
             >
                HIRE TO UNIT
             </button>
             <button className="flex-1 py-6 bg-neutral-800 text-white font-black border border-white/5 rounded-2xl text-[11px] uppercase tracking-[0.4em] hover:bg-neutral-700 transition-all">
                SHORTLIST
             </button>
             <button className="flex-1 py-6 bg-neutral-900 text-neutral-500 font-black border border-white/5 rounded-2xl text-[11px] uppercase tracking-[0.4em] hover:text-white transition-all">
                ARCHIVE
             </button>
          </footer>
        </div>
      </Modal>

      {/* SECURE CONTRACT HANDSHAKE */}
      <ContractModal 
        isOpen={isContractModalOpen}
        onClose={() => setIsContractModalOpen(false)}
        contract={mockContractData}
      />
    </>
  );
};

export default ApplicantDetailModal;