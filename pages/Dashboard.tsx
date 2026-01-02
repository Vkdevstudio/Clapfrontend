
import React, { useState } from 'react';
import { UserRole } from '../types';
import { MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_SCENES, MOCK_LOGS, MOCK_SERVICES, MOCK_BOOKINGS } from '../constants';
import { 
  Clock, MapPin, Clapperboard, TrendingUp, Zap, CheckCircle2, AlertTriangle, 
  ChevronRight, ShieldAlert, Activity, Plus, Users as UsersIcon, 
  DollarSign, FileText, Wand2, ArrowRight, Video,
  BrainCircuit, Truck, Wallet, Share2, Sparkles, Upload, Package, ArrowUpRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const [showImporter, setShowImporter] = useState(false);
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  const isVendor = role === 'vendor';

  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];
  const currentScene = MOCK_SCENES[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-1000 pb-20 max-w-7xl mx-auto">
      {/* Role-Specific Hero */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-red-600 pulse-status" />
            <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Operational Pulse: Live</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">
            {isProduction ? 'Mission Control' : isTalent ? 'Set Call' : 'Vendor Hub'}
          </h1>
          <div className="flex items-center gap-4 text-neutral-500">
             <p className="text-lg font-medium">{isVendor ? 'Business Entity' : 'Production'}: <span className="text-white">{isVendor ? 'ARRI RENTALS MUMBAI' : project.title}</span></p>
             <div className="w-1 h-1 rounded-full bg-neutral-800" />
             <p className="text-lg font-medium">Clap Score: <span className="text-red-500 font-black">842</span></p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-4">
           {isProduction && (
              <button 
                onClick={() => setShowImporter(true)}
                className="bg-white px-8 py-5 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center gap-3 hover:bg-neutral-200 transition-all active-scale"
              >
                <Upload size={18} /> AI Import Script
              </button>
           )}
           {isVendor ? (
              <button 
                onClick={() => navigate('/my-services/new')}
                className="bg-red-600 px-10 py-5 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/40 flex items-center gap-3 hover:bg-red-700 transition-all active-scale"
              >
                <Plus size={18} /> Add New Asset
              </button>
           ) : (
              <button 
                onClick={() => navigate('/projects/new')}
                className="bg-red-600 px-10 py-5 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/40 flex items-center gap-3 hover:bg-red-700 transition-all active-scale"
              >
                <Plus size={18} /> New Project
              </button>
           )}
        </div>
      </div>

      {/* Metrics Row */}
      <section className="grid md:grid-cols-3 gap-6">
         <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-green-500/30 transition-all">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 bg-green-500/10 rounded-2xl flex items-center justify-center text-green-500 border border-green-500/20">
                  <Wallet size={24} />
               </div>
               <span className="text-[9px] font-black text-green-500 bg-green-500/5 px-3 py-1 rounded-full uppercase tracking-widest border border-green-500/10">Secure</span>
            </div>
            <div>
               <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{isVendor ? 'Net Earnings (Cleared)' : 'Escrow Funds'}</p>
               <p className="text-4xl font-cinematic font-bold text-white tracking-widest">{isVendor ? '₹12,45,000' : '₹45,00,000'}</p>
            </div>
            <div className="h-1 w-full bg-black rounded-full overflow-hidden">
               <div className="h-full bg-green-500" style={{ width: '65%' }} />
            </div>
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{isVendor ? 'Available for withdrawal' : 'Ready for release upon Wrap'}</p>
         </div>
         
         <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-red-600/30 transition-all">
            <div className="flex justify-between items-start">
               <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20">
                  {isVendor ? <Package size={24} /> : <TrendingUp size={24} />}
               </div>
               <span className="text-[9px] font-black text-red-500 bg-red-600/5 px-3 py-1 rounded-full uppercase tracking-widest border border-red-600/10">{isVendor ? 'Active Rentals' : 'Active Burn'}</span>
            </div>
            <div>
               <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{isVendor ? 'Inventory on Set' : 'Production Spend'}</p>
               <p className="text-4xl font-cinematic font-bold text-white tracking-widest">{isVendor ? '14 Assets' : '₹1,25,00,000'}</p>
            </div>
            <div className="h-1 w-full bg-black rounded-full overflow-hidden">
               <div className="h-full bg-red-600" style={{ width: '28%' }} />
            </div>
            <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{isVendor ? '3 Units awaiting return' : '₹3.25Cr Remaining in Slate'}</p>
         </div>

         <div className="bg-gradient-to-br from-red-600 to-red-950 p-8 rounded-[2.5rem] space-y-6 shadow-3xl shadow-red-600/20 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform duration-1000">
               <Sparkles size={80} />
            </div>
            <div className="relative z-10 space-y-6">
               <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-white backdrop-blur-xl">
                  <Zap size={24} />
               </div>
               <div>
                  <h4 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">{isVendor ? 'Market Pulse' : 'Share Project'}</h4>
                  <p className="text-red-100/60 text-xs font-medium leading-relaxed">{isVendor ? 'Your equipment is trending in 5 local productions. Update rates?' : 'Generate a cinematic poster for this production and share with talent pools.'}</p>
               </div>
               <button className="w-full py-4 bg-white text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-2xl hover:bg-neutral-100 transition-all flex items-center justify-center gap-2">
                  {isVendor ? <ArrowUpRight size={14} /> : <Share2 size={14} />} {isVendor ? 'UPDATE CATALOG' : 'GENERATE POSTER'}
               </button>
            </div>
         </div>
      </section>

      {/* Main Grid Section */}
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {/* Active Work Section */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden shadow-3xl">
             <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none">
                {isVendor ? <Truck size={400} /> : <Video size={400} />}
             </div>
             
             <div className="relative z-10 space-y-12">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-600/10 rounded-2xl flex items-center justify-center text-red-600 border border-red-600/20">
                      {isVendor ? <Truck size={24} /> : <Clapperboard size={24} />}
                    </div>
                    <div>
                      <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">{isVendor ? 'Dispatched Units' : 'Currently Shooting'}</h3>
                      <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest">{isVendor ? '4 Production Deliveries Today' : `Scene ${currentScene.number} • ${currentScene.title}`}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{isVendor ? 'Total Bookings' : 'Unit Progress'}</p>
                    <p className="text-3xl font-cinematic font-bold text-white">{isVendor ? '42' : `${project.progress}%`}</p>
                  </div>
                </div>

                {isVendor ? (
                  <div className="grid md:grid-cols-3 gap-6">
                    {MOCK_BOOKINGS.slice(0, 3).map(booking => (
                      <div key={booking.id} className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-red-600/30 transition-all">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Project</p>
                        <p className="text-2xl font-cinematic font-bold text-white leading-tight uppercase truncate">{booking.projectName}</p>
                        <div className="flex items-center justify-between">
                           <span className="text-[9px] text-neutral-500 font-bold uppercase">{booking.status}</span>
                           <span className="text-[9px] text-green-500 font-black uppercase">{booking.amount}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-red-600/30 transition-all">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Crew Call</p>
                        <p className="text-5xl font-cinematic font-bold text-white">{callSheet.crewCall}</p>
                        <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-2"><CheckCircle2 size={12}/> Confirmed</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-blue-500/30 transition-all">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Location</p>
                        <p className="text-3xl font-cinematic font-bold text-white leading-tight uppercase">{callSheet.location}</p>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2"><MapPin size={12}/> Goregaon West</p>
                    </div>
                    <div className="bg-black/40 border border-white/5 p-8 rounded-[2rem] space-y-3 group hover:border-accent/30 transition-all">
                        <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">Environment</p>
                        <p className="text-3xl font-cinematic font-bold text-white leading-tight uppercase">{callSheet.weather}</p>
                        <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">Sunset: {callSheet.sunset}</p>
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-white/5">
                   <button 
                    onClick={() => navigate(isVendor ? '/bookings' : '/workspace')}
                    className="w-full py-6 bg-white text-black font-black rounded-3xl text-sm tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-neutral-200 transition-all active-scale shadow-2xl"
                   >
                      {isVendor ? 'GO TO DISPATCH HUB' : 'OPEN FULL WORKSPACE'} <ArrowRight size={20} />
                   </button>
                </div>
             </div>
          </section>

          {/* Activity Logs */}
          <section className="space-y-6">
             <div className="flex justify-between items-center px-4">
                <h3 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">Live Operational Stream</h3>
                <button className="text-[10px] font-bold text-red-500 uppercase tracking-widest">Full Ledger</button>
             </div>
             <div className="grid gap-4">
                {MOCK_LOGS.map(log => (
                  <div key={log.id} className="bg-neutral-900/50 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:bg-neutral-900 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-neutral-600">
                        <Activity size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-neutral-300 uppercase tracking-wide">
                          <span className="text-white font-black">{log.user}</span> • {log.action}
                        </p>
                        <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{log.time}</p>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-neutral-800 group-hover:text-white transition-colors" />
                  </div>
                ))}
             </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-gradient-to-br from-red-950/40 to-black border border-red-600/20 p-10 rounded-[3rem] shadow-3xl space-y-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:opacity-10 transition-opacity">
                <BrainCircuit size={150} />
              </div>
              <div className="flex items-center gap-3 text-red-500">
                <Wand2 size={24} className="animate-bounce" />
                <h4 className="text-2xl font-cinematic font-bold tracking-widest uppercase">Business Genie</h4>
              </div>
              
              <div className="space-y-8">
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Market Insight</p>
                    <p className="text-sm text-neutral-300 leading-relaxed italic font-medium">"Lighting rentals are peaking this weekend. Suggested: List your spare LED panels now to capture ₹35k in gap revenue."</p>
                 </div>
                 <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-3">
                    <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Operational Efficiency</p>
                    <p className="text-sm text-neutral-300 leading-relaxed font-medium">"Unit B is returning early. You can re-allocate that van to the 'South Mumbai' shoot tomorrow to save on fuel."</p>
                 </div>
              </div>

              <button className="w-full py-4 bg-red-600/10 border border-red-600/30 text-red-500 font-bold rounded-2xl text-[10px] uppercase tracking-[0.3em] hover:bg-red-600 hover:text-white transition-all">
                TALK TO GENIE
              </button>
           </section>

           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] shadow-2xl space-y-8">
              <h4 className="text-[11px] font-black text-neutral-500 uppercase tracking-[0.4em]">{isVendor ? 'Asset Health' : 'Unit Directory'}</h4>
              <div className="space-y-6">
                {isVendor ? [
                  { label: 'Listed Assets', val: '24', icon: <Package size={16}/> },
                  { label: 'Out for Rental', val: '14', icon: <Truck size={16}/> },
                  { label: 'Maintenance Log', val: '2 Units', icon: <AlertTriangle size={16}/> }
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3 text-neutral-400">
                      {stat.icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-cinematic font-bold text-white tracking-widest">{stat.val}</span>
                  </div>
                )) : [
                  { label: 'Total Crew', val: '42', icon: <UsersIcon size={16}/> },
                  { label: 'Vendors On-Site', val: '3', icon: <Truck size={16}/> },
                  { label: 'Scene Count', val: '12 / 45', icon: <FileText size={16}/> }
                ].map(stat => (
                  <div key={stat.label} className="flex items-center justify-between border-b border-white/5 pb-4">
                    <div className="flex items-center gap-3 text-neutral-400">
                      {stat.icon}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{stat.label}</span>
                    </div>
                    <span className="text-2xl font-cinematic font-bold text-white tracking-widest">{stat.val}</span>
                  </div>
                ))}
              </div>
           </section>
        </div>
      </div>

      {/* AI Importer Modal Overlay (Kept for consistency) */}
      {showImporter && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowImporter(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[3.5rem] p-12 max-w-2xl w-full relative z-10 shadow-3xl space-y-10 border-t border-red-600/30">
             <div className="space-y-2">
                <div className="flex items-center gap-3 text-red-500 mb-4">
                   <BrainCircuit size={32} className="animate-pulse" />
                   <h2 className="text-4xl font-cinematic font-bold tracking-tighter uppercase">AI Script Breakdown</h2>
                </div>
                <p className="text-neutral-500 font-medium">Paste your script or upload a PDF. Genie will auto-populate scenes, cast, and rentals for your new project.</p>
             </div>

             <div className="space-y-6">
                <textarea 
                  className="w-full h-64 bg-black border border-white/5 rounded-[2rem] p-8 text-neutral-300 font-script text-sm leading-relaxed outline-none focus:ring-1 focus:ring-red-600 resize-none placeholder:text-neutral-800"
                  placeholder="Paste script text here... INT. CLUB - NIGHT..."
                />
                <div className="flex items-center gap-3 text-red-500/60 text-[10px] font-bold uppercase tracking-widest bg-red-600/5 p-4 rounded-2xl border border-red-600/10">
                   <Wand2 size={16} /> 
                   AI will identify 12 scenes and 4 cast roles automatically.
                </div>
                <div className="flex gap-4">
                   <button 
                    onClick={() => setShowImporter(false)}
                    className="flex-1 py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[1.5rem] shadow-3xl shadow-red-600/30 transition-all text-[11px] uppercase tracking-[0.3em]"
                   >
                     RUN BREAKDOWN
                   </button>
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
