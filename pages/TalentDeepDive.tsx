
import React from 'react';
import { 
  Star, 
  Award, 
  Wallet, 
  Search, 
  BrainCircuit, 
  ShieldCheck, 
  ArrowRight, 
  ChevronLeft,
  Activity,
  Zap,
  CheckCircle2,
  Video,
  Target,
  Users,
  Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeepDiveProps {
  onStart: () => void;
}

const TalentDeepDive: React.FC<DeepDiveProps> = ({ onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent selection:text-black">
      {/* 1. Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-black to-black z-0 opacity-40" />
        <div className="absolute top-20 right-20 w-[40vw] h-[40vw] bg-accent/10 blur-[150px] rounded-full animate-pulse" />
        
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
              The Global <br />
              <span className="text-accent">Credit Registry.</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
              Don't just act. Build a verified legacy. CLAP provides the infrastructure for professional growth through <span className="text-white">verifiable metrics</span> and secure financials.
            </p>
            <button 
              onClick={onStart}
              className="px-16 py-8 bg-accent text-black font-black rounded-3xl text-[13px] uppercase tracking-[0.4em] shadow-3xl shadow-accent/20 hover:scale-105 transition-all active-scale flex items-center gap-4"
            >
              Get Verified Now <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. The Verification Pillar */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-cinematic font-bold tracking-tighter uppercase leading-none">Your Identity, <br />Verified.</h2>
            <div className="space-y-8">
               {[
                 { title: 'Clap Score', desc: 'A proprietary algorithm that measures professional reliability, set etiquette, and skill mastery.', icon: <Target className="text-accent"/> },
                 { title: 'On-Chain Credits', desc: 'Every project wrap adds a tamper-proof credit to your global registry entry.', icon: <ShieldCheck className="text-accent"/> },
                 { title: 'Talent Vault', desc: 'A centralized, high-performance repository for your reels, headshots, and documents.', icon: <Users className="text-accent"/> }
               ].map((item, i) => (
                 <div key={i} className="flex gap-8 group">
                    <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center text-accent border border-accent/20 group-hover:scale-110 transition-transform">
                       {item.icon}
                    </div>
                    <div className="space-y-2">
                       <h4 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase">{item.title}</h4>
                       <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative">
             <div className="aspect-[4/5] bg-neutral-900 border border-white/5 rounded-[4rem] overflow-hidden relative group shadow-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000"
                  alt="Talent Profile"
                />
                <div className="absolute bottom-12 left-12 right-12 p-8 bg-black/60 backdrop-blur-3xl rounded-[2.5rem] border border-accent/30 space-y-4">
                   <div className="flex justify-between items-center">
                      <p className="text-[10px] font-black text-accent uppercase tracking-widest">Talent Passport</p>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                         <span className="text-[9px] font-black text-white">ACTIVE</span>
                      </div>
                   </div>
                   <p className="text-3xl font-cinematic font-bold text-white uppercase">VIKRAM MALHOTRA</p>
                   <div className="flex justify-between border-t border-white/5 pt-4">
                      <div className="text-center">
                         <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Clap Score</p>
                         <p className="text-xl font-cinematic text-accent">842</p>
                      </div>
                      <div className="text-center">
                         <p className="text-[8px] font-black text-neutral-500 uppercase tracking-widest">Rank</p>
                         <p className="text-xl font-cinematic text-white">ELITE</p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Secure Payouts (Escrow Advantage) */}
      <section className="py-40 px-6 md:px-12 bg-black border-y border-white/5">
        <div className="max-w-5xl mx-auto text-center space-y-24">
           <div className="space-y-6">
              <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none text-accent">Safe Set. Safe Pay.</h2>
              <p className="text-neutral-500 text-xl font-medium max-w-2xl mx-auto italic">"The biggest obstacle in talent growth is financial uncertainty. We solved it with the Smart Escrow Engine."</p>
           </div>
           
           <div className="grid md:grid-cols-2 gap-12 text-left">
              <div className="p-12 bg-neutral-900 border border-accent/20 rounded-[3.5rem] space-y-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <Wallet size={150} />
                 </div>
                 <div className="w-16 h-16 bg-accent rounded-3xl flex items-center justify-center text-black">
                    <Award size={32} />
                 </div>
                 <h3 className="text-3xl font-cinematic font-bold text-white uppercase">Guaranteed Capital</h3>
                 <p className="text-neutral-400 font-medium leading-relaxed">Funds are locked in Escrow before the first frame is rolled. Your compensation is already secured in our digital vault before you step on set.</p>
              </div>
              <div className="p-12 bg-neutral-900 border border-white/5 rounded-[3.5rem] space-y-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform">
                    <Zap size={150} />
                 </div>
                 <div className="w-16 h-16 bg-neutral-800 rounded-3xl flex items-center justify-center text-accent border border-white/5">
                    <Activity size={32} />
                 </div>
                 <h3 className="text-3xl font-cinematic font-bold text-white uppercase">Instant Wrap Disbursement</h3>
                 <p className="text-neutral-400 font-medium leading-relaxed">No more chasing production for checks. As soon as the 1st AD marks "Wrap" for your character schedule, funds are released to your account.</p>
              </div>
           </div>
        </div>
      </section>

      {/* 4. AI Opportunity Matching */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="flex flex-col md:flex-row justify-between items-end gap-8">
              <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Genie <br />Synchronicity.</h2>
              <p className="text-neutral-500 text-xl font-medium max-w-md">Our AI scans global screenplays to find roles that perfectly match your verified skill density.</p>
           </div>
           
           <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: 'Reel Analysis', desc: 'Genie auto-tags your performance beats to match technical project requirements.', icon: <BrainCircuit className="text-accent"/> },
                { title: 'Sides Generation', desc: 'Receive AI-tailored audition sides based on your past performance style.', icon: <Briefcase className="text-accent"/> },
                { title: 'Presence Status', desc: 'Alert production leads when you are local and ready for immediate casting.', icon: <Zap className="text-accent"/> }
              ].map((item, i) => (
                <div key={i} className="p-12 bg-neutral-900 border border-white/5 rounded-[3rem] space-y-6 hover:border-accent/40 transition-all shadow-3xl">
                   <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-xl border border-white/5">
                      {item.icon}
                   </div>
                   <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">{item.title}</h3>
                   <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Final CTA */}
      <section className="py-60 px-6 md:px-12 bg-gradient-to-t from-accent/10 to-black text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-7xl md:text-[9vw] font-cinematic font-black tracking-tighter uppercase leading-none text-white">JOIN THE <br />REGISTRY.</h2>
            <p className="text-neutral-500 text-2xl font-medium max-w-xl mx-auto italic">Build your verified cinematic legacy today.</p>
            <button 
              onClick={onStart}
              className="px-20 py-10 bg-accent text-black font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] shadow-3xl shadow-accent/20 hover:scale-105 transition-all active-scale"
            >
              CREATE VERIFIED PROFILE
            </button>
         </div>
      </section>
    </div>
  );
};

export default TalentDeepDive;
