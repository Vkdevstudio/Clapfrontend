
import React from 'react';
import { 
  Clapperboard, 
  BrainCircuit, 
  ShieldCheck, 
  // Added Shield import to fix "Cannot find name Shield" error
  Shield,
  ArrowRight, 
  ChevronLeft,
  Zap,
  Layers,
  Sparkles,
  Clock,
  MessageSquare,
  Activity as ActivityIcon,
  Search,
  CheckCircle2,
  Lock,
  Globe,
  Cpu
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ManifestoProps {
  onStart: () => void;
}

const WhyClap: React.FC<ManifestoProps> = ({ onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* 1. Immersive Hero: The Philosophy */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 via-black to-black z-0" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
           <button 
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Hub</span>
          </button>
          
          <div className="space-y-12">
            <h1 className="text-[14vw] md:text-[10vw] font-cinematic font-black tracking-tighter text-white uppercase leading-[0.75]">
               A New <br />
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">Standard.</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-medium">
               The film industry is powered by fragmented tools. WhatsApp for comms, Excel for slates, and hope for payments. <span className="text-white">CLAP</span> is the unified operating system for professional cinema.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Chaos vs OS: The Direct Pain Comparison */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-4">
              <h2 className="text-6xl md:text-8xl font-cinematic font-black tracking-tighter uppercase leading-none">Unified Logic.</h2>
              <p className="text-neutral-500 text-xl font-medium">Solving the silent killers of cinematic production.</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12">
              <div className="p-16 bg-neutral-900 border border-white/5 rounded-[4rem] space-y-10 group hover:border-white/10 transition-all shadow-3xl">
                 <div className="flex justify-between items-center border-b border-white/5 pb-8">
                    <h4 className="text-3xl font-cinematic font-bold tracking-widest text-neutral-700 uppercase">Legacy Chaos</h4>
                    <span className="text-[9px] font-black text-red-900/40 uppercase tracking-widest">Fragile Workflow</span>
                 </div>
                 <ul className="space-y-8">
                    {[
                      { icon: <MessageSquare size={20} />, text: 'Noisy, Unsearchable Group Chats' },
                      { icon: <Layers size={20} />, text: 'Static, Outdated Excel Slates' },
                      { icon: <Clock size={20} />, text: 'Painful 90-Day Payment Cycles' },
                      { icon: <Search size={20} />, text: 'Manual, Unverified Talent Hunts' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-6 text-neutral-600 line-through decoration-red-900/30">
                         <div className="p-4 bg-black rounded-2xl opacity-40">{item.icon}</div>
                         <span className="text-xs font-black uppercase tracking-widest">{item.text}</span>
                      </li>
                    ))}
                 </ul>
              </div>

              <div className="p-16 bg-gradient-to-br from-red-900/40 to-black border border-red-600/30 rounded-[4rem] space-y-10 shadow-3xl group hover:border-red-600/60 transition-all relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                    <Clapperboard size={300} />
                 </div>
                 <div className="flex justify-between items-center border-b border-white/10 pb-8 relative z-10">
                    <h4 className="text-3xl font-cinematic font-bold tracking-widest text-red-500 uppercase">CLAP OS</h4>
                    <span className="text-[9px] font-black text-green-500 uppercase tracking-widest animate-pulse">Production-Ready</span>
                 </div>
                 <ul className="space-y-8 relative z-10">
                    {[
                      { icon: <Zap size={20} />, text: 'Department-Synced Decision Logs' },
                      { icon: <BrainCircuit size={20} />, text: 'AI-Automated Script Breakdowns' },
                      { icon: <Shield size={20} />, text: 'Instant Smart Escrow Releases' },
                      { icon: <CheckCircle2 size={20} />, text: 'Verified Identity & Credit Registry' }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-6 text-white group">
                         <div className="p-4 bg-red-600 rounded-2xl shadow-xl shadow-red-600/20 group-hover:scale-110 transition-transform">{item.icon}</div>
                         <span className="text-xs font-black uppercase tracking-widest">{item.text}</span>
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* 3. The Three Pillars Bento Grid */}
      <section className="py-40 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
           <div className="grid lg:grid-cols-3 gap-8">
              <div className="p-12 bg-neutral-900 rounded-[3rem] space-y-6 hover:bg-neutral-800 transition-all">
                 <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20">
                    <BrainCircuit size={32} />
                 </div>
                 <h3 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">AI Logic.</h3>
                 <p className="text-neutral-500 text-lg font-medium leading-relaxed">Gemini 3 analyzes screenplays in seconds, predicting logistical bottle-necks before they hit your call sheet.</p>
              </div>
              <div className="p-12 bg-neutral-900 rounded-[3rem] space-y-6 hover:bg-neutral-800 transition-all">
                 <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20">
                    <ShieldCheck size={32} />
                 </div>
                 <h3 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">Total Trust.</h3>
                 <p className="text-neutral-500 text-lg font-medium leading-relaxed">Our Smart Escrow engine secures funds at pre-production, releasing them instantly upon verified project wrap.</p>
              </div>
              <div className="p-12 bg-neutral-900 rounded-[3rem] space-y-6 hover:bg-neutral-800 transition-all">
                 <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <ActivityIcon size={32} />
                 </div>
                 <h3 className="text-4xl font-cinematic font-bold text-white uppercase tracking-widest">Global Sync.</h3>
                 <p className="text-neutral-500 text-lg font-medium leading-relaxed">A live, synchronized slate that connects the 1st AD, Camera, Art, and Logistics in one heartbeat.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. The Industry Impact Numbers */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950 overflow-hidden relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-red-600/5 blur-[200px] pointer-events-none" />
         <div className="max-w-5xl mx-auto text-center space-y-24 relative z-10">
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">The Scale of <br />CLAP.</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { label: 'Latency', val: '12ms', icon: <Cpu /> },
                 { label: 'Security', val: 'BANK-GRADE', icon: <Lock /> },
                 { label: 'Global Cities', val: '42+', icon: <Globe /> },
                 { label: 'Verified Crew', val: '14K+', icon: <Globe /> }
               ].map((stat, i) => (
                 <div key={i} className="space-y-4">
                    <p className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">{stat.label}</p>
                    <p className="text-4xl font-cinematic text-white uppercase tracking-widest">{stat.val}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 5. Founders Vision / Final Hook */}
      <section className="py-60 px-6 md:px-12 bg-black text-center border-t border-white/5">
         <div className="max-w-4xl mx-auto space-y-16">
            <h2 className="text-7xl md:text-[10vw] font-cinematic font-black tracking-tighter uppercase leading-none text-white shadow-2xl">
               YOUR NEXT WRAP <br />STARTS HERE.
            </h2>
            <p className="text-neutral-400 text-2xl font-medium max-w-2xl mx-auto italic leading-relaxed">
               "We didn't build CLAP to replace filmmakers. We built it to remove the administrative chaos that kills creativity."
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-12">
               <button 
                onClick={onStart}
                className="w-full sm:w-auto px-20 py-10 bg-red-600 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] shadow-3xl shadow-red-600/30 hover:scale-105 transition-all active-scale"
               >
                 Initialize Workflow
               </button>
               <button onClick={() => navigate('/')} className="w-full sm:w-auto px-20 py-10 bg-white/5 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] border border-white/10 backdrop-blur-3xl">
                 Return to Hub
               </button>
            </div>
         </div>
      </section>
    </div>
  );
};

export default WhyClap;
