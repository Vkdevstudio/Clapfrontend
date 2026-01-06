import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Activity, 
  ChevronLeft, 
  Zap, 
  Target, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowUpRight,
  Monitor,
  Download,
  Terminal,
  Cpu,
  Fingerprint,
  Radio,
  FileCode,
  LineChart,
  History,
  TrendingUp,
  UserCheck,
  X,
  Share2,
  Printer,
  Medal,
  Verified
} from 'lucide-react';

const AuditReport: React.FC = () => {
  const navigate = useNavigate();
  const [showCertificate, setShowCertificate] = useState(false);

  // Simplified data for clarity
  const auditData = [
    { label: 'Profile Accuracy', value: '99%', status: 'Healthy', color: 'text-green-500', bg: 'bg-green-500/10', desc: 'Your data is up to date' },
    { label: 'Sync Speed', value: 'Instant', status: 'Optimal', color: 'text-blue-500', bg: 'bg-blue-500/10', desc: 'Fast connection to studios' },
    { label: 'Interest Rate', value: '+14%', status: 'Rising', color: 'text-red-500', bg: 'bg-red-600/10', desc: 'More studios are viewing you' },
    { label: 'Talent Tier', value: 'Elite', status: 'Top Rated', color: 'text-accent', bg: 'bg-accent/10', desc: 'Highly trusted profile' }
  ];

  const logEntries = [
    { time: '14:20', event: 'Profile Viewed', actor: 'Moonlight Films', outcome: 'Interested', status: 'SUCCESS' },
    { time: '11:05', event: 'Skills Updated', actor: 'System Genie', outcome: 'Refined', status: 'SYNCED' },
    { time: '09:12', event: 'Reputation Boost', actor: 'Client Review', outcome: '+5 Points', status: 'VERIFIED' },
    { time: '08:00', event: 'Live Status On', actor: 'Arjun Mehta', outcome: 'Visible', status: 'LIVE' }
  ];

  return (
    <div className="min-h-screen bg-black animate-in fade-in duration-700 max-w-7xl mx-auto px-4 pb-32">
      
      {/* 1. CLEAN HEADER SECTION */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 py-8 md:py-12 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-[0.02] pointer-events-none -translate-y-10">
           <Fingerprint size={400} />
        </div>
        
        <div className="space-y-4 relative z-10">
           <button 
             onClick={() => navigate('/insights')}
             className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-2"
           >
             <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
             <span className="text-[10px] font-black uppercase tracking-widest">Back to Dashboard</span>
           </button>
           
           <div className="flex items-center gap-3">
              <div className="w-1 h-5 bg-red-600 rounded-full shadow-[0_0_10px_#DC2626]" />
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.3em]">Monthly Health Check • Oct 2024</p>
           </div>
           
           <h1 className="text-5xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
              Professional <br />
              <span className="text-neutral-500 tracking-normal font-sans text-3xl md:text-5xl">Summary.</span>
           </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
           <button className="flex-1 md:flex-none px-8 py-4 bg-neutral-900 border border-white/10 text-neutral-300 rounded-2xl hover:text-white transition-all active-scale flex items-center justify-center gap-2">
              <Download size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Save PDF</span>
           </button>
           <button 
            onClick={() => setShowCertificate(true)}
            className="flex-1 md:flex-none px-8 py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-neutral-200 transition-all active-scale"
           >
              Get Official Certificate
           </button>
        </div>
      </header>

      {/* 2. CORE PERFORMANCE GRID */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Main Stats Area */}
        <div className="lg:col-span-8 space-y-6">
           
           {/* Visual Health Score Grid */}
           <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {auditData.map((item, i) => (
                <div key={i} className="bg-neutral-900/50 border border-white/5 p-6 rounded-[2rem] space-y-4 hover:border-white/10 transition-all shadow-lg group">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">{item.label}</p>
                         <p className={`text-4xl font-cinematic font-bold tracking-widest ${item.color}`}>{item.value}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-current ${item.color} ${item.bg}`}>
                         {item.status}
                      </div>
                   </div>
                   <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">{item.desc}</p>
                </div>
              ))}
           </section>

           {/* Activity Map (Simplified heatmap) */}
           <section className="bg-neutral-900/30 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-4">
                 <div className="space-y-1">
                    <h3 className="text-xl md:text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Profile Visibility</h3>
                    <p className="text-[9px] text-neutral-500 font-black uppercase tracking-widest">Where studios are finding you</p>
                 </div>
                 <div className="hidden sm:flex bg-blue-600/10 border border-blue-600/20 px-3 py-1 rounded-full items-center gap-2">
                    <Radio size={12} className="text-blue-500 animate-pulse" />
                    <span className="text-[8px] font-black text-blue-500 uppercase tracking-widest">Live Updates</span>
                 </div>
              </div>

              {/* Responsive Grid for Heatmap */}
              <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 md:gap-3">
                 {[...Array(28)].map((_, i) => (
                   <div 
                     key={i} 
                     className={`aspect-square rounded-lg border border-white/5 transition-all duration-1000 ${
                       i % 3 === 0 ? 'bg-red-600/30 border-red-500/40 shadow-[0_0_10px_rgba(220,38,38,0.1)]' : 
                       i % 5 === 0 ? 'bg-blue-600/20 border-blue-500/20' : 
                       'bg-white/[0.02]'
                     }`} 
                   />
                 ))}
              </div>

              <div className="pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { label: 'Search Rank', val: 'Top 1%' },
                   { label: 'Hire Potential', val: 'Very High' },
                   { label: 'Global Reach', val: '42 Cities' },
                   { label: 'Verified Credits', val: '24' }
                 ].map((m, i) => (
                   <div key={i} className="space-y-1">
                      <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">{m.label}</p>
                      <p className="text-lg font-cinematic font-bold text-white uppercase tracking-wider">{m.val}</p>
                   </div>
                 ))}
              </div>
           </section>

           {/* Activity Log (Simpler) */}
           <section className="bg-neutral-900/50 border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6 shadow-xl">
              <div className="flex items-center gap-3 text-neutral-400 border-b border-white/5 pb-4">
                 <History size={18} />
                 <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase">Recent Activity</h3>
              </div>
              <div className="space-y-3">
                 {logEntries.map((log, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-black/20 rounded-2xl border border-white/5 group hover:border-white/20 transition-all">
                      <div className="flex items-center gap-4">
                         <span className="text-[9px] font-black text-neutral-600 w-10">{log.time}</span>
                         <div className="space-y-0.5">
                            <p className="text-[11px] font-black text-white uppercase tracking-tight leading-none">{log.event}</p>
                            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tighter">By: {log.actor}</p>
                         </div>
                      </div>
                      <div className="text-right">
                         <span className="text-[9px] font-black text-green-500 tracking-widest uppercase">{log.status}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Sidebar Actions */}
        <aside className="lg:col-span-4 space-y-6">
           
           {/* Security / Trust Card */}
           <section className="bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-8 rounded-[2.5rem] space-y-6 shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-10 -right-10 opacity-[0.03] group-hover:rotate-6 transition-transform duration-[4s]">
                 <ShieldCheck size={200} />
              </div>
              <div className="flex items-center gap-3 text-red-500 relative z-10">
                 <UserCheck size={20} />
                 <h4 className="text-lg font-cinematic font-bold uppercase tracking-widest">Account Health</h4>
              </div>
              <p className="text-xs text-neutral-400 font-medium leading-relaxed italic relative z-10">
                "Your account is fully verified and protected. Your reputation score makes you a top candidate for lead roles."
              </p>
              <div className="pt-4 border-t border-white/5 space-y-3 relative z-10">
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-600">Verification</span>
                    <span className="text-green-500">SECURE</span>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-neutral-600">Trust Score</span>
                    <span className="text-white">98/100</span>
                 </div>
              </div>
           </section>

           {/* Simple Checklist / Tips */}
           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-xl space-y-6">
              <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.3em]">Ways to Grow</h4>
              <div className="space-y-3">
                 {[
                   { label: 'Update Availability', desc: 'Let studios know you are ready', icon: <Clock size={14}/> },
                   { label: 'Sync Recent Media', desc: 'Add your latest work', icon: <Monitor size={14}/> },
                   { label: 'Request Reviews', desc: 'Boost your trust score', icon: <Award size={14}/> }
                 ].map((s, i) => (
                   <button key={i} className="w-full text-left p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-red-600/30 transition-all active-scale flex items-center gap-4">
                      <div className="p-3 bg-neutral-900 rounded-xl text-neutral-600 group-hover:text-red-500 transition-colors">
                         {s.icon}
                      </div>
                      <div className="space-y-0.5">
                         <p className="text-[10px] font-black text-white uppercase tracking-widest">{s.label}</p>
                         <p className="text-[8px] text-neutral-600 font-bold uppercase tracking-tight">{s.desc}</p>
                      </div>
                   </button>
                 ))}
              </div>
           </section>

           {/* Global Comparison */}
           <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-[2.5rem] text-center space-y-4">
              <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center mx-auto text-red-500">
                 <TrendingUp size={24} />
              </div>
              <div className="space-y-1">
                 <p className="text-[8px] font-black text-neutral-600 uppercase tracking-[0.2em]">Global Rank</p>
                 <h4 className="text-3xl font-cinematic font-bold text-white tracking-widest uppercase">Top 1%</h4>
              </div>
              <p className="text-[9px] text-neutral-700 font-bold uppercase">Better than 99% of talent in Mumbai</p>
           </div>
        </aside>
      </div>

      {/* 3. OFFICIAL CERTIFICATE MODAL */}
      {showCertificate && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setShowCertificate(false)} />
           
           <div className="relative w-full max-w-4xl bg-[#0a0a0a] border-2 border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.05)] flex flex-col animate-in zoom-in-95 duration-500">
              
              {/* Certificate Ribbon */}
              <div className="absolute top-0 right-0 p-8 md:p-16 opacity-[0.03] pointer-events-none -rotate-12">
                 <Medal size={400} />
              </div>

              {/* Modal Header */}
              <header className="p-6 md:p-10 flex justify-between items-center border-b border-white/5 bg-black/40 z-10">
                 <div className="flex items-center gap-3">
                    <Verified className="text-red-500" size={24} />
                    <h2 className="text-2xl md:text-3xl font-cinematic font-bold tracking-widest text-white uppercase">Certificate Hub</h2>
                 </div>
                 <button onClick={() => setShowCertificate(false)} className="p-3 bg-neutral-900 rounded-2xl text-neutral-400 hover:text-white transition-all">
                    <X size={20} />
                 </button>
              </header>

              {/* The Certificate Paper View */}
              <div className="flex-1 p-6 md:p-20 overflow-y-auto scrollbar-hide">
                 <div className="bg-[#fefefe] text-black p-8 md:p-16 rounded shadow-2xl relative border-[12px] border-double border-neutral-200">
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                    
                    <div className="text-center space-y-10 relative z-10">
                       <div className="flex flex-col items-center gap-4">
                          <ClapperboardIcon className="w-12 h-12 text-black mb-4" />
                          <h3 className="text-4xl md:text-6xl font-cinematic font-black tracking-tighter uppercase leading-none">Certificate of <br />Elite Standing</h3>
                          <div className="w-20 h-0.5 bg-black/10 mx-auto" />
                       </div>

                       <div className="space-y-4">
                          <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-neutral-500">This is to certify that</p>
                          <h4 className="text-3xl md:text-5xl font-cinematic font-bold uppercase tracking-widest border-b-2 border-neutral-100 inline-block px-8 pb-2">Arjun Mehta</h4>
                       </div>

                       <p className="text-sm md:text-lg font-medium leading-relaxed max-w-lg mx-auto italic text-neutral-600">
                          Has achieved an <span className="text-black font-bold">Elite Registry Score of 842</span>, placing them in the <span className="text-black font-bold">Top 0.4%</span> of the global talent network.
                       </p>

                       <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-10">
                          <div className="space-y-1">
                             <p className="text-[9px] font-black uppercase text-neutral-400">Issue Date</p>
                             <p className="text-sm font-bold uppercase">24 OCT 2024</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[9px] font-black uppercase text-neutral-400">Verified By</p>
                             <p className="text-sm font-bold uppercase italic font-serif">CLAP OS GENIE</p>
                          </div>
                          <div className="hidden md:block space-y-1">
                             <p className="text-[9px] font-black uppercase text-neutral-400">Node Hub</p>
                             <p className="text-sm font-bold uppercase">ASIA/MUMBAI</p>
                          </div>
                       </div>

                       <div className="pt-12 flex justify-center">
                          <div className="w-24 h-24 rounded-full border-4 border-neutral-100 flex items-center justify-center p-4 relative group">
                             <Fingerprint size={48} className="text-neutral-200" />
                             <div className="absolute inset-0 bg-red-600/5 rounded-full animate-pulse" />
                             <p className="absolute -bottom-6 whitespace-nowrap text-[7px] font-black text-neutral-300 uppercase tracking-widest">Digital Stamp Authentic</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Action Bar */}
              <footer className="p-6 md:p-10 border-t border-white/5 bg-black/40 flex flex-col md:flex-row gap-4 items-center justify-between z-10">
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Public Verification Link: clap.os/v/arjun-mehta-842</p>
                 <div className="flex gap-4 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-8 py-4 bg-neutral-900 border border-white/10 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all active-scale">
                       <Share2 size={16} /> Share
                    </button>
                    <button className="flex-1 md:flex-none px-8 py-4 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-red-700 transition-all active-scale shadow-lg shadow-red-600/20">
                       <Download size={16} /> Download PDF
                    </button>
                 </div>
              </footer>
           </div>
        </div>
      )}

      <footer className="mt-20 text-center opacity-20">
         <p className="text-[9px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • PERSONAL PERFORMANCE AUDIT • v4.2</p>
      </footer>
    </div>
  );
};

const ClapperboardIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
    <path d="m4 11 1.71-3.42A2 2 0 0 1 7.5 6.42l4.5 0" />
    <path d="M12 6.42l4.5 0a2 2 0 0 1 1.79 1.16L20 11" />
    <path d="M4 11h16" />
    <path d="M12 22V11" />
  </svg>
);

export default AuditReport;