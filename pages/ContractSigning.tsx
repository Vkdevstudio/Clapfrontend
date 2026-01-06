import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, FileText, CheckCircle2, ChevronLeft, Zap, Download, Fingerprint, Loader2, ArrowRight } from 'lucide-react';
import { MOCK_CONTRACTS } from '../constants';

const ContractSigning: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSigning, setIsSigning] = useState(false);
  const [isSigned, setIsSigned] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  
  const contract = MOCK_CONTRACTS.find(c => c.id === id) || MOCK_CONTRACTS[0];

  const handleSign = () => {
    setIsSigning(true);
    // MISSION CRITICAL: Handshake Logic
    // In a production environment, this would hit the /registry/hire endpoint
    setTimeout(() => {
      setIsSigning(false);
      setIsSigned(true);
      // Logic: Mark local session as 'Hired' to flip Dashboard to HUD mode
      localStorage.setItem('clap_is_hired', 'true');
      localStorage.setItem('clap_active_project', contract.projectTitle);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col items-center py-12 px-6 animate-in fade-in duration-1000">
      <div className="max-w-4xl w-full space-y-12">
        
        <header className="flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Abort Review</span>
          </button>
          <div className="flex items-center gap-3">
             <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${isSigned ? 'bg-green-600/10 border-green-500 text-green-500' : 'bg-red-600/10 border-red-500 text-red-500'}`}>
                {isSigned ? 'MISSION SECURED' : 'LEGAL AUDIT ACTIVE'}
             </div>
          </div>
        </header>

        <div className="bg-white text-black p-8 md:p-20 rounded shadow-4xl relative min-h-[800px] border-t-[12px] border-neutral-900 overflow-hidden">
           <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
           
           <div className="relative z-10 space-y-12">
              <header className="flex justify-between items-start border-b-2 border-black pb-8">
                 <div className="space-y-1">
                    <h2 className="text-4xl font-cinematic font-black uppercase leading-none">{contract.productionName}</h2>
                    <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Official Production Purchase Agreement (PPA)</p>
                 </div>
                 <div className="text-right space-y-1">
                    <p className="text-[10px] font-black uppercase text-neutral-400">Date Issued</p>
                    <p className="text-lg font-cinematic font-bold uppercase">{contract.sentAt}</p>
                 </div>
              </header>

              <section className="space-y-6">
                 <h3 className="text-xl font-cinematic font-bold uppercase border-b border-black/10 pb-2">Parties & Role</h3>
                 <div className="grid grid-cols-2 gap-8">
                    <div>
                       <p className="text-[9px] font-black uppercase text-neutral-400 mb-1">Contractor (Talent)</p>
                       <p className="text-xl font-cinematic font-bold uppercase">Arjun Mehta</p>
                    </div>
                    <div>
                       <p className="text-[9px] font-black uppercase text-neutral-400 mb-1">Project Assignment</p>
                       <p className="text-xl font-cinematic font-bold uppercase">{contract.projectTitle}</p>
                    </div>
                 </div>
              </section>

              <section className="space-y-6">
                 <h3 className="text-xl font-cinematic font-bold uppercase border-b border-black/10 pb-2">The Terms</h3>
                 <p className="text-sm md:text-base font-medium leading-relaxed text-neutral-700 font-script">
                   {contract.terms}
                 </p>
              </section>

              <section className="p-8 bg-neutral-50 border border-neutral-200 rounded-xl space-y-4">
                 <div className="flex items-center justify-between">
                    <p className="text-[10px] font-black uppercase text-neutral-400">Financial Consideration</p>
                    <p className="text-3xl font-cinematic font-bold text-green-600">{contract.amount}</p>
                 </div>
                 <p className="text-[10px] font-bold text-neutral-500 uppercase italic">
                    Funds are secured by CLAP Smart Escrow Node #TRX-9428-SEC.
                 </p>
              </section>

              {!isSigned ? (
                <div className="pt-12 space-y-8">
                   <button 
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    className="flex items-start gap-4 group cursor-pointer"
                   >
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all shrink-0 ${agreedToTerms ? 'bg-black border-black text-white' : 'border-neutral-200 group-hover:border-black'}`}>
                        {agreedToTerms && <CheckCircle2 size={16} />}
                      </div>
                      <p className="text-xs font-bold text-neutral-600 leading-relaxed uppercase text-left">
                        I hereby acknowledge that I have read and agree to the terms of this PPA and any attached riders. I understand that my digital signature is legally binding.
                      </p>
                   </button>

                   <div className="h-24 border-2 border-dashed border-neutral-200 rounded-xl flex items-center justify-center relative bg-neutral-50/50 overflow-hidden">
                      {isSigning ? (
                        <div className="flex flex-col items-center gap-3">
                           <Loader2 size={24} className="animate-spin text-neutral-400" />
                           <p className="text-[8px] font-black uppercase text-neutral-400 tracking-widest">Hashing Signature to Registry...</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                           <Fingerprint size={32} className="text-neutral-200" />
                           <p className="text-[8px] font-black uppercase text-neutral-300 tracking-widest">Digital Stamp Pending</p>
                        </div>
                      )}
                   </div>
                </div>
              ) : (
                <div className="pt-12 flex justify-between items-end border-t-2 border-black">
                   <div className="space-y-2 mt-8">
                      <p className="text-[9px] font-black uppercase text-neutral-400">Digital Handshake Signature</p>
                      <div className="font-script text-4xl text-black">Arjun Mehta</div>
                      <p className="text-[7px] font-bold text-neutral-500 uppercase">Verified on {new Date().toLocaleDateString()}</p>
                   </div>
                   <div className="w-20 h-20 rounded-full border-4 border-neutral-100 flex items-center justify-center p-4">
                      <ShieldCheck size={40} className="text-green-600" />
                   </div>
                </div>
              )}
           </div>
        </div>

        <footer className="pt-8 flex flex-col md:flex-row gap-4">
          {!isSigned ? (
            <>
              <button className="flex-1 py-6 bg-neutral-900 border border-white/10 text-white font-black rounded-2xl text-[11px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-neutral-800 transition-all">
                <Download size={18} /> Save for Review
              </button>
              <button 
                onClick={handleSign}
                disabled={!agreedToTerms || isSigning}
                className="flex-[2] py-6 bg-red-600 text-white font-black rounded-2xl text-[12px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 active-scale disabled:opacity-20 flex items-center justify-center gap-3"
              >
                {isSigning ? 'SYNCING...' : 'FINALIZE & SIGN'} <Zap size={18} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full py-8 bg-white text-black font-black rounded-[2.5rem] text-[14px] uppercase tracking-[0.5em] shadow-3xl active-scale flex items-center justify-center gap-4 group"
            >
               LAUNCH MISSION HUB <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

export default ContractSigning;