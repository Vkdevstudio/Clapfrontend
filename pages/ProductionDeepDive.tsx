
import React from 'react';
import { 
  Film, 
  BrainCircuit, 
  ShieldCheck, 
  Layers, 
  Zap, 
  ArrowRight, 
  ChevronLeft,
  Activity,
  Clapperboard,
  Video,
  Clock,
  Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeepDiveProps {
  onStart: () => void;
}

const ProductionDeepDive: React.FC<DeepDiveProps> = ({ onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-black z-0 opacity-40" />
        <div className="absolute top-20 right-20 w-[40vw] h-[40vw] bg-red-600/10 blur-[150px] rounded-full animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Hub</span>
          </button>
          
          <div className="space-y-12">
            <h1 className="text-[12vw] md:text-[8vw] font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Mission <br />
              <span className="text-red-600">Control.</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
              The only platform that understands the cinematic lifecycle. From the first script upload to the final payment wrap, CLAP is your <span className="text-white">autonomous production partner</span>.
            </p>
            <button 
              onClick={onStart}
              className="px-16 py-8 bg-red-600 text-white font-black rounded-3xl text-[13px] uppercase tracking-[0.4em] shadow-3xl shadow-red-600/30 hover:scale-105 transition-all active-scale flex items-center gap-4"
            >
              Start New Slate <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Genie AI Deep Dive */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase leading-none">Automated <br />Script Logic.</h2>
            <div className="space-y-8">
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20 group-hover:scale-110 transition-transform">
                     <BrainCircuit size={28} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase">Instant Breakdown</h4>
                     <p className="text-neutral-500 font-medium">Upload any screenplay. Our AI extracts cast, props, wardrobe, and technical beats in under 60 seconds.</p>
                  </div>
               </div>
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20 group-hover:scale-110 transition-transform">
                     <Sparkles size={28} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase">Operational Insights</h4>
                     <p className="text-neutral-500 font-medium">Genie predicts logistical risks, weather impacts, and equipment delays before they hit your call sheet.</p>
                  </div>
               </div>
            </div>
          </div>
          <div className="relative p-1 bg-gradient-to-br from-red-600/40 to-black rounded-[4rem]">
             <div className="bg-neutral-900 rounded-[3.8rem] p-12 space-y-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                   <BrainCircuit size={300} />
                </div>
                <div className="flex items-center gap-4 text-red-500">
                   <Zap size={20} className="animate-pulse" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em]">GENIE LOGIC PREVIEW</span>
                </div>
                <div className="space-y-4">
                   <p className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">SCENE 12B BREAKDOWN</p>
                   <div className="space-y-2">
                      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Cast Identified</span>
                         <span className="text-[11px] font-bold text-white uppercase">Vikram, Sonia</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Prop Beat</span>
                         <span className="text-[11px] font-bold text-red-500 uppercase">Old Photograph (Macro CU)</span>
                      </div>
                      <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5">
                         <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Est. Duration</span>
                         <span className="text-[11px] font-bold text-white uppercase">4.5 Hours</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Financial Fortress */}
      <section className="py-40 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
           <div className="lg:col-span-1 space-y-6">
              <h2 className="text-6xl font-cinematic font-bold tracking-tighter uppercase leading-none">Smart <br />Escrow.</h2>
              <p className="text-neutral-500 text-lg font-medium leading-relaxed">The single most effective way to eliminate payment friction and build trust with top-tier crew.</p>
              <div className="pt-8 flex items-center gap-4 text-green-500">
                 <ShieldCheck size={40} />
                 <span className="text-xs font-black uppercase tracking-widest">PPA Compliant</span>
              </div>
           </div>
           <div className="lg:col-span-2 grid md:grid-cols-2 gap-8">
              {[
                { title: 'Capital Protection', desc: 'Secure project funds in a high-security digital vault. Funds are only released upon verified wrap.', icon: <Lock className="text-red-500" /> },
                { title: 'Automated Tax', desc: 'CLAP handles TDS, GST, and 1099 compliance automatically for every disbursement.', icon: <Layers className="text-red-500" /> },
                { title: 'Real-time Burn Rate', desc: 'Watch your budget update frame by frame. Know your exact spend at every setup.', icon: <Activity className="text-red-500" /> },
                { title: 'Vendor Nexus', desc: 'Direct, secured payment lines to 5,000+ verified global equipment vendors.', icon: <Video className="text-red-500" /> }
              ].map((item, i) => (
                <div key={i} className="p-10 bg-neutral-900 border border-white/5 rounded-[3rem] space-y-6 hover:border-red-600/40 transition-all shadow-xl">
                   <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/5">
                      {item.icon}
                   </div>
                   <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">{item.title}</h4>
                   <p className="text-neutral-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Unified Logistics (Timeline/Slate) */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">The Unified Slate.</h2>
              <p className="text-neutral-500 text-xl font-medium">One synchronized timeline connecting every department on set.</p>
           </div>
           
           <div className="grid md:grid-cols-4 gap-4">
              {[
                { label: 'SCRIPT BREAKDOWN', status: 'COMPLETED', color: 'text-green-500' },
                { label: 'CREW CALL-OUT', status: 'ACTIVE', color: 'text-red-500 animate-pulse' },
                { label: 'SLATE SYNC', status: 'STANDBY', color: 'text-neutral-600' },
                { label: 'ESCROW LOCK', status: 'VERIFIED', color: 'text-blue-500' }
              ].map((step, i) => (
                <div key={i} className="p-8 bg-neutral-900 border border-white/5 rounded-3xl text-center space-y-4">
                   <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">{step.label}</p>
                   <p className={`text-xl font-cinematic font-bold tracking-widest ${step.color}`}>{step.status}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Production Conversion */}
      <section className="py-60 px-6 md:px-12 bg-gradient-to-t from-red-900/10 to-black text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-7xl md:text-[10vw] font-cinematic font-black tracking-tighter uppercase leading-none text-white">READY TO <br />ROLL.</h2>
            <p className="text-neutral-500 text-2xl font-medium max-w-xl mx-auto leading-relaxed italic">
               Modernize your production workflow with the industry's most powerful Mission Control.
            </p>
            <button 
              onClick={onStart}
              className="px-20 py-10 bg-red-600 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] shadow-3xl shadow-red-600/30 hover:scale-105 transition-all active-scale"
            >
              INITIALIZE PRODUCTION SLATE
            </button>
         </div>
      </section>
    </div>
  );
};

export default ProductionDeepDive;

const Lock = ({ className }: { className?: string }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>;
