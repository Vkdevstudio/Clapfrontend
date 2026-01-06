
import React, { useState } from 'react';
import Modal from './Modal';
import { FileText, ShieldCheck, Zap, ArrowRight, Download, History, Send, Loader2 } from 'lucide-react';
import { Contract } from '../types';

interface ContractModalProps {
  isOpen: boolean;
  onClose: () => void;
  contract: Partial<Contract>;
}

const ContractModal: React.FC<ContractModalProps> = ({ isOpen, onClose, contract }) => {
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Contract Handshake" 
      subtitle="Registry Authorization Node"
      maxWidth="max-w-3xl"
    >
      {!isSent ? (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-8 bg-neutral-950 border border-white/5 rounded-[2.5rem] space-y-6 shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none">
                <FileText size={150} />
             </div>
             <div className="flex items-center gap-4 border-b border-white/5 pb-6 relative z-10">
                <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center text-white">
                   <FileText size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">{contract.type} Agreement</h3>
                   <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Project: {contract.projectTitle}</p>
                </div>
             </div>

             <div className="space-y-6 relative z-10">
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-1">
                      <p className="text-[8px] font-black text-neutral-700 uppercase">Principal</p>
                      <p className="text-sm font-bold text-white uppercase">{contract.roleName}</p>
                   </div>
                   <div className="space-y-1 text-right">
                      <p className="text-[8px] font-black text-neutral-700 uppercase">Consideration</p>
                      <p className="text-sm font-bold text-green-500 uppercase">{contract.amount}</p>
                   </div>
                </div>
                <div className="space-y-2">
                   <p className="text-[9px] font-black text-neutral-700 uppercase ml-1">Engagement Terms</p>
                   <div className="p-6 bg-black/40 border border-white/5 rounded-2xl text-xs text-neutral-400 font-medium italic leading-relaxed">
                      {contract.terms}
                   </div>
                </div>
             </div>
          </div>

          <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4 shadow-xl">
             <ShieldCheck size={24} className="text-blue-500 shrink-0" />
             <p className="text-[10px] font-bold text-neutral-400 uppercase leading-relaxed tracking-widest">
                This contract is backed by the CLAP Smart Escrow system. Once signed, funds will be locked until the project wrap protocol is initiated.
             </p>
          </div>

          <div className="flex gap-4 pt-4">
             <button onClick={onClose} className="flex-1 py-5 bg-neutral-800 text-neutral-400 font-black rounded-2xl text-[10px] uppercase tracking-widest active-scale">Cancel</button>
             <button 
               onClick={handleSend}
               disabled={isSending}
               className="flex-[2] py-5 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 active-scale flex items-center justify-center gap-3"
             >
                {isSending ? <Loader2 size={18} className="animate-spin" /> : <><Send size={18} /> INITIATE HANDSHAKE</>}
             </button>
          </div>
        </div>
      ) : (
        <div className="py-12 text-center space-y-10 animate-in zoom-in-95 duration-500">
           <div className="w-24 h-24 bg-green-600 rounded-3xl flex items-center justify-center mx-auto shadow-3xl transform rotate-12 mb-6">
              <ShieldCheck size={48} className="text-white" />
           </div>
           <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">Contract Dispatched</h2>
              <p className="text-neutral-500 text-sm md:text-lg font-medium max-w-sm mx-auto italic">
                "The legal node for <strong>{contract.roleName}</strong> has been sent to the Talent's dashboard for verification and signature."
              </p>
           </div>
           <div className="pt-6">
             <button onClick={onClose} className="w-full py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-xl active-scale">
                CLOSE COMMAND
             </button>
           </div>
        </div>
      )}
    </Modal>
  );
};

export default ContractModal;
