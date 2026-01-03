
import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Wallet, 
  Cpu, 
  Globe, 
  Activity, 
  ArrowRight, 
  ChevronLeft,
  Package,
  Zap,
  BarChart3,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DeepDiveProps {
  onStart: () => void;
}

const VendorDeepDive: React.FC<DeepDiveProps> = ({ onStart }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500 selection:text-white">
      {/* Cinematic Hero */}
      <section className="relative min-h-[90vh] flex items-center px-6 md:px-12 py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-black z-0 opacity-40" />
        <div className="absolute top-20 right-20 w-[40vw] h-[40vw] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        
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
              The Supply <br />
              <span className="text-blue-500">Nexus.</span>
            </h1>
            <p className="text-xl md:text-3xl text-neutral-400 max-w-2xl leading-relaxed font-medium">
              Transform your equipment inventory into a high-performance rental engine. CLAP provides the <span className="text-white">logistics backbone</span> for the world's leading rental houses.
            </p>
            <button 
              onClick={onStart}
              className="px-16 py-8 bg-blue-600 text-white font-black rounded-3xl text-[13px] uppercase tracking-[0.4em] shadow-3xl shadow-blue-600/30 hover:scale-105 transition-all active-scale flex items-center gap-4"
            >
              Onboard Your Assets <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Core Logistics Section */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-32">
          <div className="text-center space-y-6">
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Global Deployment.</h2>
            <p className="text-neutral-500 text-xl font-medium max-w-2xl mx-auto">Manage rentals across multiple sets with zero manual oversight.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'Inventory API', desc: 'Sync your warehouse management software directly with the CLAP marketplace.', icon: <Package className="text-blue-500" /> },
              { title: 'Dispatch Tracking', desc: 'Real-time GPS-synced status updates from warehouse to basecamp.', icon: <Truck className="text-blue-500" /> },
              { title: 'Automated PPA', desc: 'Generate Tax and Production Purchase Agreements automatically upon booking.', icon: <Activity className="text-blue-500" /> }
            ].map((item, i) => (
              <div key={i} className="p-12 bg-neutral-900 border border-white/5 rounded-[4rem] space-y-8 hover:border-blue-500/40 transition-all shadow-3xl group">
                 <div className="w-20 h-20 bg-black rounded-3xl flex items-center justify-center border border-white/5 group-hover:scale-110 transition-transform">
                    {item.icon}
                 </div>
                 <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">{item.title}</h3>
                 <p className="text-neutral-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Revenue & Payments */}
      <section className="py-40 px-6 md:px-12 bg-black border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative group">
             <div className="absolute inset-0 bg-blue-600/10 blur-[100px] pointer-events-none" />
             <div className="relative p-12 bg-neutral-900 border border-white/5 rounded-[4rem] space-y-10 shadow-3xl">
                <div className="flex justify-between items-center">
                   <h4 className="text-[11px] font-black text-blue-500 uppercase tracking-widest">Yield Analytics</h4>
                   <span className="px-4 py-1.5 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full border border-green-500/20 uppercase tracking-widest">Live Flow</span>
                </div>
                <div className="space-y-8">
                   {[
                     { label: 'Active Rentals', val: '14 Units', color: 'text-white' },
                     { label: 'Net Escrow', val: '₹12,45,000', color: 'text-green-500' },
                     { label: 'Asset Utilization', val: '92%', color: 'text-blue-500' }
                   ].map((stat, i) => (
                     <div key={i} className="flex justify-between items-end border-b border-white/5 pb-6 last:border-0 last:pb-0">
                        <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">{stat.label}</span>
                        <span className={`text-5xl font-cinematic font-bold tracking-widest ${stat.color}`}>{stat.val}</span>
                     </div>
                   ))}
                </div>
                <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                   <div className="h-full bg-blue-600 animate-[loading_2s_ease-in-out_infinite]" style={{ width: '40%' }} />
                </div>
             </div>
          </div>
          <div className="space-y-12">
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Financial <br />Absolute.</h2>
            <div className="space-y-8">
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:rotate-12 transition-transform">
                     <Wallet size={28} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">Escrow Settlement</h4>
                     <p className="text-neutral-500 font-medium">No more bad debt. Funds are secured by CLAP before any equipment leaves your warehouse.</p>
                  </div>
               </div>
               <div className="flex gap-8 group">
                  <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:rotate-12 transition-transform">
                     <ShieldCheck size={28} />
                  </div>
                  <div className="space-y-2">
                     <h4 className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">Verified Producers</h4>
                     <p className="text-neutral-500 font-medium">Access a global network of verified production leads with proven credit scores and rental histories.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Network Reach */}
      <section className="py-40 px-6 md:px-12 bg-neutral-950">
        <div className="max-w-7xl mx-auto space-y-24">
           <div className="flex flex-col md:flex-row justify-between items-end gap-12">
              <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter uppercase leading-none">Scaling the <br />Network.</h2>
              <div className="space-y-4 max-w-md">
                 <p className="text-neutral-500 text-xl font-medium">Join 500+ global rental houses leveraging the CLAP Nexus to grow their footprint.</p>
                 <div className="flex items-center gap-6">
                    <div className="text-center">
                       <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Global Reach</p>
                       <p className="text-2xl font-cinematic text-white">42 CITIES</p>
                    </div>
                    <div className="w-px h-10 bg-white/5" />
                    <div className="text-center">
                       <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Asset Volume</p>
                       <p className="text-2xl font-cinematic text-blue-500">₹85CR+</p>
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['Mumbai', 'London', 'L.A.', 'Berlin', 'Tokyo', 'Lagos', 'Seoul', 'Dubai'].map(city => (
                <div key={city} className="p-8 bg-neutral-900 border border-white/5 rounded-3xl flex items-center justify-between group hover:border-blue-500/30 transition-all cursor-pointer">
                   <span className="text-[11px] font-black text-neutral-500 uppercase tracking-widest group-hover:text-white transition-colors">{city} Hub</span>
                   <ArrowRight size={16} className="text-neutral-800 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Vendor Conversion */}
      <section className="py-60 px-6 md:px-12 bg-gradient-to-t from-blue-900/10 to-black text-center">
         <div className="max-w-4xl mx-auto space-y-12">
            <h2 className="text-7xl md:text-[9vw] font-cinematic font-black tracking-tighter uppercase leading-none">NEXUS STATUS.</h2>
            <p className="text-neutral-500 text-2xl font-medium max-w-xl mx-auto italic">Scale your rental operation with the world's most advanced supply OS.</p>
            <button 
              onClick={onStart}
              className="px-20 py-10 bg-blue-600 text-white font-black rounded-[2.5rem] text-[15px] uppercase tracking-[0.5em] shadow-3xl shadow-blue-600/20 hover:scale-105 transition-all active-scale"
            >
              INITIALIZE VENDOR HUB
            </button>
         </div>
      </section>
    </div>
  );
};

export default VendorDeepDive;
