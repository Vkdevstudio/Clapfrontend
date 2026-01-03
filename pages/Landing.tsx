
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Clapperboard, 
  ShieldCheck, 
  Zap, 
  Star, 
  Play, 
  Wallet, 
  BrainCircuit, 
  Activity,
  ArrowRight,
  Shield,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Globe,
  Film,
  Smartphone,
  Cpu,
  Lock,
  MessageSquare,
  Layers,
  Sparkles,
  BarChart3,
  Clock
} from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-red-600 overflow-x-hidden">
      
      {/* Immersive Hero: The Cinematic Entry */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-[#020202] z-10" />
          <img 
            src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic Background" 
            className="w-full h-full object-cover grayscale opacity-40 scale-110 animate-[pulse_15s_infinite]"
          />
          <div className="scanline"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 backdrop-blur-3xl text-red-500 text-[9px] font-black tracking-[0.5em] mb-12 border border-white/10 animate-in fade-in slide-in-from-top-4 duration-1000">
             <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_#DC2626]" />
             SYSTEM ONLINE: GLOBAL SLATE SYNCED
          </div>
          
          <h1 className="text-[12vw] md:text-[9vw] font-cinematic font-black mb-12 tracking-[-0.04em] leading-[0.8] animate-in fade-in slide-in-from-left-8 duration-1000 text-white shadow-2xl">
            CRAFT THE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">UNEXPECTED.</span>
          </h1>
          
          <p className="text-xl md:text-3xl text-neutral-400 max-w-2xl mb-16 leading-[1.4] font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            The world’s first production OS. Script analysis, secure payments, and crew management integrated into one <span className="text-white">Gemini-powered</span> engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <button 
              onClick={onStart}
              className="w-full sm:w-auto px-16 py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2rem] transition-all transform hover:scale-105 active-scale flex items-center justify-center gap-4 group shadow-[0_20px_50px_rgba(220,38,38,0.3)] text-[13px] uppercase tracking-[0.4em]"
            >
              Initialize Production
              <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <Link to="/why-clap" className="w-full sm:w-auto px-16 py-8 bg-white/5 hover:bg-white/10 text-white font-black rounded-[2rem] transition-all border border-white/10 backdrop-blur-3xl text-[13px] uppercase tracking-[0.4em] active-scale flex items-center justify-center">
              The Manifesto
            </Link>
          </div>
        </div>
      </section>

      {/* From Ink to Pixels - The AI Genie Workflow */}
      <section className="py-40 px-6 md:px-12 bg-[#020202]">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-6">
            <h2 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter uppercase leading-none">From Ink to Pixels.</h2>
            <p className="text-neutral-500 text-xl font-medium max-w-2xl mx-auto">See how CLAP Genie automates the heavy lifting of production.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent hidden md:block" />
            
            {[
              { 
                step: '01', 
                title: 'AI BREAKDOWN', 
                desc: 'Upload your script. Genie identifies scenes, cast, props, and lighting beats in seconds.',
                icon: <BrainCircuit className="text-red-500" />,
                tag: '90% FASTER'
              },
              { 
                step: '02', 
                title: 'LOGISTICS SYNC', 
                desc: 'Genie maps your breakdown to available vendors and talent, generating a live call sheet.',
                icon: <Cpu className="text-blue-500" />,
                tag: 'AUTO-ORCHESTRATED'
              },
              { 
                step: '03', 
                title: 'WRAP & ESCROW', 
                desc: 'Post-production wraps automatically trigger smart contract releases to verified crew.',
                icon: <Lock className="text-green-500" />,
                tag: 'ZERO-FRAUD'
              }
            ].map((item, i) => (
              <div key={i} className="relative z-10 space-y-8 p-12 bg-neutral-900 border border-white/5 rounded-[4rem] group hover:border-red-600/40 transition-all shadow-3xl">
                <div className="flex justify-between items-start">
                  <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center text-red-500 border border-white/5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-7xl font-cinematic font-black text-white/5 group-hover:text-red-600/10 transition-colors">{item.step}</span>
                </div>
                <div className="space-y-4">
                  <span className="px-3 py-1 bg-white/5 text-[9px] font-black text-neutral-400 tracking-widest rounded-full border border-white/10 uppercase">{item.tag}</span>
                  <h3 className="text-3xl font-cinematic font-bold tracking-widest text-white uppercase">{item.title}</h3>
                  <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bento-style Benefits Grid */}
      <section className="py-40 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <h2 className="text-6xl md:text-8xl font-cinematic font-black tracking-tighter uppercase leading-none">Built for <br />The Grind.</h2>
            <p className="text-neutral-500 text-xl font-medium max-w-lg mb-4">The platform that pays for itself in hours saved and risks eliminated.</p>
          </div>

          <div className="grid md:grid-cols-4 md:grid-rows-2 gap-8 h-auto md:h-[800px]">
            {/* Payment Bento */}
            <div className="md:col-span-2 md:row-span-1 bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-between group hover:border-green-500/30 transition-all shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                 <Wallet size={200} />
              </div>
              <div className="space-y-6 relative z-10">
                <h4 className="text-[11px] font-black text-green-500 uppercase tracking-[0.4em]">Financial Security</h4>
                <h3 className="text-5xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">No More <br />Chasing Invoices.</h3>
                <p className="text-neutral-500 font-medium max-w-xs">Our Smart Escrow engine locks production funds and releases them instantly upon verified project wrap.</p>
              </div>
              <div className="pt-8 border-t border-white/5 relative z-10">
                 <p className="text-4xl font-cinematic font-bold text-white">₹12.4CR <span className="text-sm font-medium text-neutral-600 tracking-normal">Disbursed via CLAP</span></p>
              </div>
            </div>

            {/* AI Breakdown Bento */}
            <div className="md:col-span-2 md:row-span-2 bg-gradient-to-br from-red-900/40 to-black border border-red-600/30 rounded-[3.5rem] p-12 flex flex-col justify-between group hover:border-red-600/60 transition-all shadow-3xl relative overflow-hidden">
               <div className="absolute -bottom-20 -right-20 p-24 opacity-10 pointer-events-none group-hover:rotate-12 transition-transform duration-1000">
                  <BrainCircuit size={400} />
               </div>
               <div className="space-y-8 relative z-10">
                  <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center text-white shadow-3xl shadow-red-600/40">
                    <Sparkles size={32} />
                  </div>
                  <h3 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter text-white uppercase leading-[0.9]">Automate <br />The Slate.</h3>
                  <p className="text-neutral-300 text-xl font-medium max-w-md leading-relaxed">Let Gemini AI read your screenplay. In minutes, you’ll have a complete technical breakdown, casting suggestions, and a logistical roadmap ready for execution.</p>
               </div>
               <ul className="space-y-4 relative z-10 mb-12">
                  {['Cast Match Score', 'Location Risk Assessment', 'Prop & Wardrobe Lists'].map(item => (
                    <li key={item} className="flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/70">
                       <CheckCircle2 size={18} className="text-red-500" /> {item}
                    </li>
                  ))}
               </ul>
            </div>

            {/* Mobile First Bento */}
            <div className="md:col-span-1 md:row-span-1 bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-between group hover:border-blue-500/30 transition-all shadow-2xl overflow-hidden">
               <div className="space-y-4">
                  <Smartphone className="text-blue-500 mb-6" size={40} />
                  <h3 className="text-3xl font-cinematic font-bold text-white uppercase leading-tight">Mobile <br />Orchestra.</h3>
                  <p className="text-neutral-500 text-[11px] font-bold leading-relaxed uppercase tracking-widest">A set-ready interface designed for low-light environments and high-pressure moments.</p>
               </div>
            </div>

            {/* Analytics Bento */}
            <div className="md:col-span-1 md:row-span-1 bg-neutral-900 border border-white/5 rounded-[3.5rem] p-12 flex flex-col justify-between group hover:border-accent/30 transition-all shadow-2xl overflow-hidden">
               <div className="space-y-4">
                  <BarChart3 className="text-accent mb-6" size={40} />
                  <h3 className="text-3xl font-cinematic font-bold text-white uppercase leading-tight">Live <br />Metrics.</h3>
                  <p className="text-neutral-500 text-[11px] font-bold leading-relaxed uppercase tracking-widest">Track your production burn rate and completion percentage in real-time, frame by frame.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role-Specific Conversion Zones */}
      <section className="py-40 px-6 md:px-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="text-center space-y-4 max-w-2xl mx-auto">
              <h2 className="text-6xl md:text-[7vw] font-cinematic font-black tracking-tighter uppercase leading-none">Choose Your <br />Workflow.</h2>
              <p className="text-neutral-500 text-lg font-medium">Tailored Mission Control for every role in the industry.</p>
           </div>

           <div className="grid lg:grid-cols-3 gap-12">
              {/* Production Lead */}
              <Link to="/solutions/production" className="group relative bg-neutral-900 border border-white/5 p-12 rounded-[4rem] space-y-12 hover:border-red-600/40 transition-all shadow-2xl overflow-hidden flex flex-col min-h-[650px] active-scale">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:scale-125 group-hover:opacity-10 transition-all duration-1000">
                    <Film size={300} strokeWidth={1} />
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-red-600/10 rounded-[2.5rem] flex items-center justify-center text-red-600 border border-red-600/20 group-hover:rotate-12 transition-transform">
                       <Zap size={40} />
                    </div>
                    <h3 className="text-5xl font-cinematic font-bold tracking-widest text-white uppercase leading-none">Production Lead</h3>
                    <p className="text-neutral-500 font-medium text-lg">Command your set with real-time slate sync and AI breakdowns.</p>
                  </div>
                  <div className="flex-1 space-y-6 relative z-10 pt-8 border-t border-white/5">
                    {['AI Script Decomposition', 'Escrow Management', 'Live Crew Logistics'].map(feature => (
                       <div key={feature} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                          <CheckCircle2 size={16} className="text-red-500" /> {feature}
                       </div>
                    ))}
                  </div>
                  <div className="w-full py-7 bg-red-600 text-white font-black rounded-3xl text-[11px] text-center uppercase tracking-[0.4em] shadow-xl group-hover:bg-red-700 transition-all relative z-10">
                     Learn More
                  </div>
               </Link>

               {/* Verified Talent */}
               <Link to="/solutions/talent" className="group relative bg-neutral-900 border border-white/5 p-12 rounded-[4rem] space-y-12 hover:border-accent/40 transition-all shadow-2xl overflow-hidden flex flex-col min-h-[650px] active-scale">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:scale-125 group-hover:opacity-10 transition-all duration-1000">
                    <Star size={300} strokeWidth={1} />
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-accent/10 rounded-[2.5rem] flex items-center justify-center text-accent border border-accent/20 group-hover:rotate-12 transition-transform">
                       <Award size={40} />
                    </div>
                    <h3 className="text-5xl font-cinematic font-bold tracking-widest text-white uppercase leading-none">Verified Talent</h3>
                    <p className="text-neutral-500 font-medium text-lg">Build a verified portfolio with real set metrics and Clap Scores.</p>
                  </div>
                  <div className="flex-1 space-y-6 relative z-10 pt-8 border-t border-white/5">
                    {['Verified Credit Registry', 'Instant Escrow Payouts', 'Genie Role Matching'].map(feature => (
                       <div key={feature} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                          <CheckCircle2 size={16} className="text-accent" /> {feature}
                       </div>
                    ))}
                  </div>
                  <div className="w-full py-7 bg-accent text-black font-black rounded-3xl text-[11px] text-center uppercase tracking-[0.4em] shadow-xl group-hover:bg-yellow-500 transition-all relative z-10">
                     Learn More
                  </div>
               </Link>

               {/* Scale Vendor */}
               <Link to="/solutions/vendor" className="group relative bg-neutral-900 border border-white/5 p-12 rounded-[4rem] space-y-12 hover:border-blue-500/40 transition-all shadow-2xl overflow-hidden flex flex-col min-h-[650px] active-scale">
                  <div className="absolute top-0 right-0 p-16 opacity-[0.03] group-hover:scale-125 group-hover:opacity-10 transition-all duration-1000">
                    <Globe size={300} strokeWidth={1} />
                  </div>
                  <div className="space-y-8 relative z-10">
                    <div className="w-20 h-20 bg-blue-500/10 rounded-[2.5rem] flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:rotate-12 transition-transform">
                       <Shield size={40} />
                    </div>
                    <h3 className="text-5xl font-cinematic font-bold tracking-widest text-white uppercase leading-none">Scale Vendor</h3>
                    <p className="text-neutral-500 font-medium text-lg">Manage professional equipment and studio rentals with ease.</p>
                  </div>
                  <div className="flex-1 space-y-6 relative z-10 pt-8 border-t border-white/5">
                    {['Inventory Automation', 'Direct Asset Logistics', 'Automated PPA Billing'].map(feature => (
                       <div key={feature} className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.2em] text-neutral-400 group-hover:text-white transition-colors">
                          <CheckCircle2 size={16} className="text-blue-500" /> {feature}
                       </div>
                    ))}
                  </div>
                  <div className="w-full py-7 bg-blue-600 text-white font-black rounded-3xl text-[11px] text-center uppercase tracking-[0.4em] shadow-xl group-hover:bg-blue-700 transition-all relative z-10">
                     Learn More
                  </div>
               </Link>
           </div>
        </div>
      </section>

      {/* CLAP vs The Chaos (Comparison) */}
      <section className="py-40 px-6 md:px-12 bg-[#020202]">
        <div className="max-w-5xl mx-auto space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase leading-none text-white">The Unified Stack.</h2>
            <p className="text-neutral-500 text-lg font-medium italic">Why settle for fragmented tools?</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="p-12 bg-neutral-950 border border-white/5 rounded-[3rem] space-y-8">
               <h4 className="text-xl font-cinematic font-bold tracking-widest text-neutral-700 uppercase">Traditional Chaos</h4>
               <ul className="space-y-6">
                 {['Scattered WhatsApp Groups', 'Static Excel Call Sheets', 'Insecure Bank Transfers', 'Manual Talent Verification'].map(item => (
                   <li key={item} className="flex items-center gap-4 text-xs font-bold text-neutral-600 uppercase tracking-widest line-through">
                      <XIcon className="text-red-900/40" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
            <div className="p-12 bg-neutral-900 border border-red-600/20 rounded-[3rem] space-y-8 shadow-2xl">
               <h4 className="text-xl font-cinematic font-bold tracking-widest text-red-500 uppercase">CLAP OS</h4>
               <ul className="space-y-6">
                 {['Unified Production Nexus', 'Live Synced Slates', 'Secured Smart Escrow', 'Verified Global Registry'].map(item => (
                   <li key={item} className="flex items-center gap-4 text-xs font-bold text-white uppercase tracking-widest">
                      <CheckCircle2 size={18} className="text-red-500" /> {item}
                   </li>
                 ))}
               </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-60 px-6 md:px-12 relative overflow-hidden text-center bg-[#020202]">
         <div className="absolute inset-0 bg-red-600 opacity-5 blur-[120px] pointer-events-none" />
         <div className="max-w-4xl mx-auto space-y-12 relative z-10">
            <h2 className="text-7xl md:text-[10vw] font-cinematic font-black tracking-tighter uppercase leading-none text-white shadow-2xl">YOUR NEXT WRAP <br />STARTS HERE.</h2>
            <p className="text-neutral-400 text-2xl font-medium max-w-xl mx-auto leading-relaxed">
               Join 14,000+ film professionals already modernizing their production workflow.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8">
               <button 
                  onClick={onStart}
                  className="w-full sm:w-auto px-20 py-10 bg-red-600 hover:bg-red-700 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] shadow-3xl shadow-red-600/30 transition-all transform hover:scale-105 active-scale"
               >
                  Join the Network
               </button>
               <button className="w-full sm:w-auto px-20 py-10 bg-white/5 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] transition-all border border-white/10 backdrop-blur-3xl hover:bg-white/10">
                  Talk to Sales
               </button>
            </div>
         </div>
      </section>

      <footer className="py-24 px-6 border-t border-white/5 bg-[#020202] text-center">
         <div className="max-w-7xl mx-auto space-y-12">
            <h2 className="text-[15vw] font-cinematic font-black text-white/5 tracking-tighter pointer-events-none select-none">CLAP OS</h2>
            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
               <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">
                  <Link to="/why-clap" className="hover:text-red-500 transition-colors">The Manifesto</Link>
                  <a href="#" className="hover:text-red-500 transition-colors">Network Status</a>
                  <a href="#" className="hover:text-red-500 transition-colors">Identity Registry</a>
               </div>
               <p className="text-neutral-800 text-[10px] font-black uppercase tracking-widest">© 2024 CLAP Film Ecosystem. All Systems Operational.</p>
            </div>
         </div>
      </footer>
    </div>
  );
};

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
);

export default Landing;
