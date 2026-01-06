import React, { useState } from 'react';
import { 
  TrendingUp, 
  Eye, 
  Target, 
  Zap, 
  ChevronRight, 
  Sparkles, 
  Users, 
  MapPin, 
  Award,
  Activity,
  Flame,
  HelpCircle,
  Clock,
  ArrowUpRight,
  Database,
  Info,
  CheckCircle2,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Insights: React.FC = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState('30D');

  const metrics = {
    profileViews: 1420,
    viewGrowth: "+14%",
    authorityScore: 842,
    authorityTrend: "Improving",
    activeSearchNodes: 42
  };

  const opportunities = [
    { skill: 'Method Depth', trend: '+28%', signal: 'High Demand', action: 'Explore Slate', icon: <Flame size={14} />, skillSlug: 'method-acting' },
    { skill: 'Action Choreo', trend: '+12%', signal: 'Trending', action: 'Find Unit', icon: <Zap size={14} />, skillSlug: 'stunt-action' },
    { skill: 'Dialect (Hindi)', trend: '+42%', signal: 'Critical', action: 'Check Calls', icon: <Activity size={14} />, skillSlug: 'dialect-pro' }
  ];

  const engagementData = [
    { label: 'Registry Discovery', value: 850, color: 'bg-blue-500' },
    { label: 'Profile Analysis', value: 342, color: 'bg-indigo-500' },
    { label: 'Material Review', value: 84, color: 'bg-red-500' },
    { label: 'Direct Handshakes', value: 12, color: 'bg-green-500' }
  ];

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-24 max-w-7xl mx-auto px-4">
      
      {/* 1. ADAPTIVE HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/5 pb-6 relative">
        <div className="absolute -left-10 -top-10 w-64 h-64 bg-red-600/5 blur-[100px] pointer-events-none" />
        
        <div className="space-y-1 relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1 h-4 bg-red-600 rounded-full shadow-[0_0_10px_#DC2626]" />
            <p className="text-[9px] font-black text-red-500 uppercase tracking-[0.4em]">Personal Intelligence • v4.2</p>
          </div>
          <h1 className="text-4xl md:text-5xl font-cinematic font-black tracking-tighter text-white uppercase leading-tight">
            Command <span className="text-neutral-500">Analytics.</span>
          </h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full lg:w-auto">
           <div className="flex bg-neutral-900 border border-white/5 rounded-xl p-1 flex-1 sm:flex-none">
              {['7D', '30D', 'All'].map(range => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`flex-1 sm:px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${
                    timeRange === range ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
           </div>
           <button 
            onClick={() => navigate('/ai-genie')}
            className="flex-1 sm:flex-none bg-white px-6 py-3 rounded-xl text-black font-black text-[10px] uppercase tracking-[0.3em] shadow-xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-2"
           >
              <Sparkles size={14} /> Consult Genie
           </button>
        </div>
      </header>

      {/* 2. DENSE TELEMETRY GRID */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
         {[
           { 
             label: 'Market Authority', 
             val: metrics.authorityScore, 
             sub: 'Top 2% Regional', 
             trend: metrics.authorityTrend, 
             icon: <Award size={20} />, 
             color: 'text-red-500', 
             bg: 'bg-red-600/10' 
           },
           { 
             label: 'Registry Reach', 
             val: metrics.profileViews.toLocaleString(), 
             sub: '+14% Period Growth', 
             trend: 'Rising', 
             icon: <Eye size={20} />, 
             color: 'text-blue-500', 
             bg: 'bg-blue-600/10' 
           },
           { 
             label: 'Unit Matches', 
             val: metrics.activeSearchNodes, 
             sub: 'Ready for Dispatch', 
             trend: 'Optimal', 
             icon: <Target size={20} />, 
             color: 'text-green-500', 
             bg: 'bg-green-500/10' 
           }
         ].map((stat, i) => (
           <div key={i} className="group p-6 bg-neutral-900 border border-white/5 rounded-[2rem] space-y-4 hover:border-red-600/30 transition-all shadow-xl active-scale overflow-hidden relative">
              <div className="flex justify-between items-center relative z-10">
                 <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                    {stat.icon}
                 </div>
                 <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white/5 rounded-full border border-white/5">
                    <div className={`w-1 h-1 rounded-full ${stat.color} animate-pulse`} />
                    <span className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">{stat.trend}</span>
                 </div>
              </div>
              <div className="relative z-10">
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                 <div className="flex items-baseline gap-2">
                    <p className="text-4xl font-cinematic font-black tracking-widest text-white leading-none">{stat.val}</p>
                    <span className="text-[8px] font-bold text-neutral-500 uppercase">{stat.sub}</span>
                 </div>
              </div>
           </div>
         ))}
      </section>

      {/* 3. MAIN ANALYTICS HUB */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Visibility Funnel */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-6 md:p-10 space-y-8 shadow-2xl relative overflow-hidden">
             <div className="flex items-center justify-between relative z-10">
                <div className="space-y-1">
                   <h3 className="text-xl md:text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Visibility Funnel</h3>
                   <p className="text-[8px] text-neutral-500 font-black uppercase tracking-[0.3em]">Conversion Analytics</p>
                </div>
                <div className="group relative">
                  <HelpCircle size={14} className="text-neutral-700 cursor-help hover:text-red-500 transition-colors" />
                  <div className="absolute right-0 bottom-full mb-3 w-40 p-3 bg-black border border-white/10 rounded-xl text-[9px] text-neutral-400 font-medium invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all shadow-3xl z-50 italic leading-snug">
                    Your discovery to material review rate is 12% above benchmark.
                  </div>
                </div>
             </div>

             <div className="flex flex-col gap-6 relative z-10">
                {engagementData.map((item, i) => (
                  <div key={item.label} className="group/row">
                     <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-3">
                           <span className="text-[8px] font-black text-neutral-700 w-4">{i + 1}</span>
                           <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest group-hover/row:text-white transition-colors">{item.label}</span>
                        </div>
                        <span className="text-xl font-cinematic font-bold text-white leading-none tracking-widest">{item.value}</span>
                     </div>
                     <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} transition-all duration-1000 shadow-lg`} 
                          style={{ width: `${100 - (i * 22)}%`, opacity: 1 - (i * 0.12) }} 
                        />
                     </div>
                  </div>
                ))}
             </div>

             <div className="pt-6 border-t border-white/5 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                   <div className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                   <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">Logic Sync: Nominal</p>
                </div>
                <button 
                  onClick={() => navigate('/audit-report')}
                  className="text-[9px] font-black text-red-500 uppercase tracking-[0.2em] hover:text-red-400 transition-colors flex items-center gap-1"
                >
                   Full Ledger <ChevronRight size={12} />
                </button>
             </div>
          </section>

          {/* Opportunity Radar */}
          <section className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <div className="space-y-0.5">
                  <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.4em]">Opportunity Radar</h3>
                  <p className="text-[8px] font-bold text-neutral-800 uppercase tracking-widest">Tailored Market Gaps</p>
                </div>
                <button 
                  onClick={() => navigate('/explore')} 
                  className="text-[9px] font-black text-white px-4 py-2 bg-neutral-900 border border-white/5 rounded-lg hover:border-red-600/30 transition-all active:scale-95"
                >
                  Explore All
                </button>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {opportunities.map((opp, i) => (
                   <div key={i} className="p-5 bg-neutral-900 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-blue-600/30 transition-all shadow-lg active-scale">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-xl bg-neutral-800 border border-white/5 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                            {opp.icon}
                         </div>
                         <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                               <h4 className="text-lg font-cinematic font-bold text-white uppercase tracking-wider leading-none">{opp.skill}</h4>
                               <span className="text-[8px] font-black text-green-500">{opp.trend}</span>
                            </div>
                            <p className="text-[8px] text-neutral-600 font-bold uppercase tracking-widest">{opp.signal}</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => navigate(`/explore?skill=${opp.skillSlug}`)}
                        className="text-[9px] font-black text-neutral-500 hover:text-white uppercase tracking-widest px-3 py-2 border border-white/5 rounded-lg group-hover:bg-blue-600/10 group-hover:border-blue-600/30 transition-all"
                      >
                         {opp.action}
                      </button>
                   </div>
                ))}
                <button 
                  onClick={() => navigate('/explore')}
                  className="border-2 border-dashed border-white/5 p-5 rounded-2xl flex items-center justify-center text-neutral-800 hover:border-white/10 hover:text-neutral-600 transition-all"
                >
                   <Maximize2 size={20} />
                </button>
             </div>
          </section>
        </div>

        {/* Sidebar Intel */}
        <div className="lg:col-span-4 space-y-6">
           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform">
                 <Target size={120} />
              </div>
              
              <div className="space-y-1 relative z-10">
                <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Identity Roadmap</h4>
                <p className="text-[8px] font-bold text-neutral-800 uppercase tracking-widest">AI Suggested Targets</p>
              </div>

              <div className="space-y-6 relative z-10">
                 {[
                   { label: 'Vault Integrity', status: '85%', color: 'text-green-500' },
                   { label: 'Network Depth', status: '62%', color: 'text-blue-500' },
                   { label: 'Market Priority', status: '74%', color: 'text-red-500' }
                 ].map((goal, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest">
                         <span className="text-neutral-500">{goal.label}</span>
                         <span className={goal.color}>{goal.status}</span>
                      </div>
                      <div className="h-1 w-full bg-black rounded-full overflow-hidden">
                         <div className={`h-full bg-current ${goal.color} opacity-30`} style={{ width: goal.status }} />
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-5 bg-red-600/5 border border-red-600/10 rounded-2xl space-y-3 relative z-10">
                 <div className="flex items-center gap-2 text-red-500">
                    <Info size={12} />
                    <p className="text-[9px] font-black uppercase tracking-widest">Growth Signal</p>
                 </div>
                 <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic">
                    "Productions are indexing for 'Deep Method' profiles. Adding 2 more character reels increases matching by 40%."
                 </p>
              </div>

              <button 
                onClick={() => navigate('/profile')}
                className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.3em] transition-all border border-white/5 active-scale relative z-10 shadow-xl"
              >
                Sync Profile
              </button>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
              <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Hub Trends</h4>
              <div className="space-y-5">
                 {[
                   { label: 'Indie Noir Rise', status: '+150%', color: 'text-blue-500' },
                   { label: 'Remote Audits', status: 'CRITICAL', color: 'text-indigo-500' },
                   { label: 'Unit Unit Expansions', status: 'ACTIVE', color: 'text-green-500' }
                 ].map((trend, i) => (
                   <div 
                    key={i} 
                    onClick={() => navigate(`/explore?trend=${trend.label.toLowerCase().replace(/ /g, '-')}`)}
                    className="flex items-center justify-between group cursor-pointer border-b border-white/5 pb-4 last:border-0 last:pb-0"
                   >
                      <span className="text-[10px] font-black text-neutral-500 group-hover:text-white uppercase tracking-widest leading-none transition-colors">{trend.label}</span>
                      <span className={`text-[9px] font-black ${trend.color} uppercase tracking-widest`}>{trend.status}</span>
                   </div>
                 ))}
              </div>
           </section>
        </div>
      </div>

      <footer className="mt-12 text-center opacity-20">
         <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
            <p className="text-[9px] font-black text-white uppercase tracking-[0.6em]">CLAP OS • INTEL NODE v4.2</p>
            <div className="flex items-center gap-2 text-[9px] font-black text-white uppercase tracking-[0.4em]">
               <Activity size={12} className="text-red-500" /> SECURED ANALYTICS SYNC
            </div>
         </div>
      </footer>
    </div>
  );
};

export default Insights;
