import React, { useState } from 'react';
/* Fixed: Added missing imports Monitor and Radio from lucide-react */
import { 
  User, 
  Shield, 
  Lock, 
  Bell, 
  Wallet, 
  EyeOff, 
  Fingerprint, 
  CreditCard, 
  Smartphone, 
  Mail, 
  CheckCircle2, 
  Camera,
  Trash2,
  Activity,
  Zap,
  ShieldCheck,
  Info,
  Clock,
  History,
  Key,
  ShieldAlert,
  Settings as SettingsIcon,
  MessageSquare,
  ChevronRight,
  Network,
  Users,
  Globe,
  Database,
  Cpu,
  RefreshCcw,
  ExternalLink,
  Monitor,
  Radio
} from 'lucide-react';
import { Capability, User as UserType } from '../types';
import Select from '../components/Select';

interface SettingsProps {
  user?: UserType;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'privacy' | 'security' | 'financials' | 'notifications' | 'clearance'>('profile');

  // Local state for toggles
  const [settings, setSettings] = useState({
    stealthMode: false,
    genieRecommendations: true,
    twoFactor: true,
    contactShield: true,
    pushAlerts: true,
    emailDaily: false,
    smartEscrow: true,
    onsetAlerts: true,
    smsAlerts: false,
    autoHandoff: true
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const navItems = [
    { id: 'profile', label: 'My Account', icon: <User size={18} /> },
    { id: 'clearance', label: 'Clearance', icon: <ShieldCheck size={18} /> },
    { id: 'privacy', label: 'Visibility', icon: <EyeOff size={18} /> },
    { id: 'security', label: 'Security', icon: <Lock size={18} /> },
    { id: 'financials', label: 'Bank & Tax', icon: <Wallet size={18} /> },
    { id: 'notifications', label: 'Alerts', icon: <Bell size={18} /> },
  ];

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-700 pb-32 px-4 md:px-6">
      
      {/* 1. CINEMATIC HEADER */}
      <header className="mb-8 md:mb-12 mt-4">
        <div className="flex items-center gap-3 text-red-500 mb-4">
          <SettingsIcon size={18} className="md:w-5 md:h-5" />
          <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Central Command • v4.2</p>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
          Settings <br />
          <span className="text-neutral-500 font-sans text-2xl sm:text-3xl md:text-5xl tracking-normal">Hub.</span>
        </h1>
      </header>

      <div className="grid lg:grid-cols-12 gap-6 md:gap-12 relative">
        
        {/* 2. STICKY SIDEBAR NAVIGATION */}
        <aside className="lg:col-span-3">
          <div className="lg:sticky lg:top-28 space-y-6">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id as any)}
                  className={`flex items-center gap-3 md:gap-4 px-5 py-3.5 md:px-6 md:py-4 rounded-xl md:rounded-2xl transition-all whitespace-nowrap lg:w-full active-scale ${
                    activeTab === item.id 
                      ? 'bg-red-600 text-white shadow-xl shadow-red-600/20 font-bold' 
                      : 'bg-neutral-900/50 text-neutral-500 border border-white/5 hover:border-white/10 hover:text-white'
                  }`}
                >
                  <div className={activeTab === item.id ? 'text-white' : 'text-neutral-600'}>
                    {item.icon}
                  </div>
                  <span className="text-[10px] md:text-[11px] uppercase font-black tracking-widest">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 3. MAIN CONTENT AREA */}
        <main className="lg:col-span-9 space-y-6 md:space-y-8 min-h-[50vh]">
          
          {/* PROFILE SECTION */}
          {activeTab === 'profile' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
              <section className="bg-neutral-900/50 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                 <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
                    <div className="relative">
                       <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-3xl md:rounded-[3rem] border-4 border-neutral-950 bg-neutral-900 overflow-hidden shadow-3xl">
                          <img src="https://picsum.photos/seed/arjun/400" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Avatar" />
                       </div>
                       <button className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 p-3 md:p-4 bg-red-600 rounded-xl md:rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-neutral-950">
                          <Camera size={16} className="md:w-5 md:h-5" />
                       </button>
                    </div>
                    <div className="flex-1 space-y-4 text-center sm:text-left">
                       <div className="space-y-1">
                          <p className="text-[9px] md:text-[10px] font-black text-red-500 uppercase tracking-widest">Profile Identity</p>
                          <h2 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{user?.name || 'Arjun Mehta'}</h2>
                       </div>
                       <div className="flex flex-wrap justify-center sm:justify-start gap-2 md:gap-4">
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] md:text-[9px] font-black text-neutral-400 uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
                             <CheckCircle2 size={10} className="text-green-500" /> EMAIL VERIFIED
                          </span>
                          <span className="px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-[8px] md:text-[9px] font-black text-accent uppercase tracking-widest flex items-center gap-1.5 md:gap-2">
                             <ShieldCheck size={10} /> ELITE STANDING
                          </span>
                       </div>
                    </div>
                 </div>
              </section>

              <section className="bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] space-y-8 md:space-y-10 shadow-xl">
                 <h3 className="text-lg md:text-xl font-cinematic font-bold tracking-[0.2em] text-white uppercase">Basic Info</h3>
                 <div className="grid md:grid-cols-2 gap-4 md:gap-8">
                    <div className="space-y-2.5">
                       <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Display Name</label>
                       <input type="text" defaultValue={user?.name || "Arjun Mehta"} className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 text-sm font-bold text-white focus:ring-1 focus:ring-red-600 transition-all outline-none" />
                    </div>
                    <div className="space-y-2.5">
                       <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Work Email</label>
                       <input type="email" defaultValue={user?.email || "arjun.mehta@studio.com"} className="w-full bg-black/40 border border-white/10 rounded-xl md:rounded-2xl px-5 md:px-6 py-4 text-sm font-bold text-white focus:ring-1 focus:ring-red-600 transition-all outline-none" />
                    </div>
                    <div className="md:col-span-2 space-y-2.5">
                       <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-1">Professional Bio</label>
                       <textarea rows={4} className="w-full bg-black/40 border border-white/10 rounded-[1.5rem] md:rounded-[2rem] p-6 text-sm font-medium text-neutral-300 focus:ring-1 focus:ring-red-600 transition-all outline-none resize-none italic" defaultValue="Award-winning actor and director with 10+ years of experience in regional and international cinema. Specialized in psychological thrillers." />
                    </div>
                 </div>
                 <button className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-xl md:rounded-2xl text-[10px] uppercase tracking-[0.3em] active-scale hover:bg-neutral-200 shadow-xl">
                    Save Changes
                 </button>
              </section>
            </div>
          )}

          {/* CLEARANCE SECTION */}
          {activeTab === 'clearance' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
               <section className="bg-neutral-900 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden">
                  <div className="space-y-2">
                     <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Active Clearance</h3>
                     <p className="text-neutral-500 text-xs md:text-sm font-medium italic">Requirement 5.1: Capability-Based Logic Hub</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest ml-2">Node Capabilities</p>
                        <div className="grid gap-2">
                           {['VIEW', 'COMMENT', 'UPLOAD', 'ASSIGN', 'APPROVE', 'OVERRIDE'].map((cap) => {
                             const has = user?.capabilities?.includes(cap as Capability) || cap === 'VIEW' || cap === 'COMMENT';
                             return (
                               <div key={cap} className={`flex items-center justify-between p-5 rounded-2xl border transition-all ${
                                 has ? 'bg-green-600/10 border-green-500/20 text-green-500' : 'bg-black/40 border-white/5 text-neutral-700'
                               }`}>
                                  <div className="flex items-center gap-4">
                                     {has ? <ShieldCheck size={16}/> : <Lock size={16}/>}
                                     <span className="text-[10px] font-black uppercase tracking-widest">{cap}</span>
                                  </div>
                                  {has && <span className="text-[8px] font-black uppercase bg-green-500/10 px-2 py-0.5 rounded">ACTIVE</span>}
                               </div>
                             );
                           })}
                        </div>
                     </div>

                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest ml-2">Scope Parameters (Requirement 5.2)</p>
                        <div className="space-y-3">
                           <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3 text-white">
                                 <Network size={16} className="text-blue-500" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Assigned Units</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {(user?.assignedUnits || ['UNIT A']).map(u => (
                                   <span key={u} className="px-3 py-1 bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[8px] font-black uppercase rounded-lg">{u}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="p-6 bg-black/40 border border-white/5 rounded-2xl space-y-4">
                              <div className="flex items-center gap-3 text-white">
                                 <Users size={16} className="text-orange-500" />
                                 <span className="text-[10px] font-black uppercase tracking-widest">Assigned Depts</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                 {(user?.assignedDepts || ['Camera']).map(d => (
                                   <span key={d} className="px-3 py-1 bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[8px] font-black uppercase rounded-lg">{d}</span>
                                 ))}
                              </div>
                           </div>
                           <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
                              <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
                                Scoping is automated based on project role. To update your node assignment, contact the Production Lead.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {/* PRIVACY & VISIBILITY SECTION */}
          {activeTab === 'privacy' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
               <section className="bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-10 shadow-xl">
                  <div className="space-y-2">
                     <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Visibility</h3>
                     <p className="text-neutral-500 text-xs md:text-sm font-medium italic">Manage how your profile node interacts with the global registry.</p>
                  </div>

                  <div className="space-y-4">
                     {[
                        { 
                          id: 'stealthMode', 
                          label: 'Stealth Discovery', 
                          desc: 'Hide your profile from unverified production searches.',
                          icon: <EyeOff size={18}/> 
                        },
                        { 
                          id: 'genieRecommendations', 
                          label: 'Genie Recommendations', 
                          desc: 'Allow AI to suggest your profile for relevant mission slates.',
                          icon: <Zap size={18}/> 
                        },
                        { 
                          id: 'contactShield', 
                          label: 'Contact Shielding', 
                          desc: 'Mask phone and email until a manual handshake is logged.',
                          icon: <Shield size={18}/> 
                        }
                     ].map((item) => (
                       <div key={item.id} className="p-6 bg-neutral-900 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
                          <div className="flex items-center gap-6">
                             <div className={`p-4 rounded-2xl ${settings[item.id as keyof typeof settings] ? 'bg-red-600/10 text-red-500' : 'bg-neutral-800 text-neutral-500'}`}>
                                {item.icon}
                             </div>
                             <div className="space-y-1">
                                <p className="text-[11px] font-black text-white uppercase tracking-widest">{item.label}</p>
                                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">{item.desc}</p>
                             </div>
                          </div>
                          <button 
                            onClick={() => toggleSetting(item.id as any)}
                            className={`w-14 h-8 rounded-full relative transition-all active-scale ${
                              settings[item.id as keyof typeof settings] ? 'bg-red-600' : 'bg-neutral-800'
                            }`}
                          >
                             <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                               settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'
                             }`} />
                          </button>
                       </div>
                     ))}
                  </div>

                  <div className="bg-blue-600/5 border border-blue-600/10 p-8 rounded-[2rem] flex items-start gap-4">
                     <Globe size={24} className="text-blue-500 shrink-0" />
                     <div className="space-y-2">
                        <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Regional Hub Data</h4>
                        <p className="text-[11px] text-neutral-400 leading-relaxed font-medium uppercase tracking-widest italic">
                           Your anonymized data helps productions estimate unit density in your region without exposing your exact node location.
                        </p>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {/* SECURITY SECTION */}
          {activeTab === 'security' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
               <section className="bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-10 shadow-xl">
                  <div className="space-y-2">
                     <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Fortress</h3>
                     <p className="text-neutral-500 text-xs md:text-sm font-medium italic">256-bit encrypted identity protection.</p>
                  </div>

                  <div className="space-y-6">
                     <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] flex items-center justify-between">
                        <div className="flex items-center gap-6">
                           <div className="p-4 bg-blue-600/10 text-blue-500 rounded-2xl">
                              <Smartphone size={24}/>
                           </div>
                           <div className="space-y-1">
                              <p className="text-[11px] font-black text-white uppercase tracking-widest">Two-Factor Auth</p>
                              <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">Requirement for PPA Compliance</p>
                           </div>
                        </div>
                        <button 
                          onClick={() => toggleSetting('twoFactor')}
                          className={`w-14 h-8 rounded-full relative transition-all active-scale ${
                            settings.twoFactor ? 'bg-blue-600' : 'bg-neutral-800'
                          }`}
                        >
                           <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                             settings.twoFactor ? 'left-7' : 'left-1'
                           }`} />
                        </button>
                     </div>

                     <div className="grid md:grid-cols-2 gap-4">
                        <button className="p-8 bg-black/40 border border-white/5 rounded-[2rem] text-left space-y-4 hover:border-red-600/30 transition-all group">
                           <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-600 group-hover:text-red-500 transition-colors">
                              <Key size={20} />
                           </div>
                           <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Reset Master Key</h4>
                           <p className="text-[9px] text-neutral-700 font-bold uppercase">Last changed: 4 months ago</p>
                        </button>
                        <button className="p-8 bg-black/40 border border-white/5 rounded-[2rem] text-left space-y-4 hover:border-blue-600/30 transition-all group">
                           <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-neutral-600 group-hover:text-blue-500 transition-colors">
                              <Monitor size={20} />
                           </div>
                           <h4 className="text-[11px] font-black text-white uppercase tracking-widest">Active Sessions</h4>
                           <p className="text-[9px] text-neutral-700 font-bold uppercase">3 Devices Currently Synced</p>
                        </button>
                     </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em] ml-2">Audit Logs</p>
                    <div className="bg-black/60 rounded-[2rem] border border-white/5 overflow-hidden">
                       {[
                         { event: 'Registry Login', hub: 'Mumbai Hub', time: 'Just now' },
                         { event: 'Financial Pin Reset', hub: 'System Node', time: '2d ago' },
                         { event: 'Profile Sync', hub: 'Mobile Hub', time: '1w ago' }
                       ].map((log, i) => (
                         <div key={i} className="px-8 py-5 border-b border-white/5 last:border-0 flex items-center justify-between group hover:bg-white/[0.02] transition-all">
                            <div className="flex items-center gap-4">
                               <div className="w-2 h-2 rounded-full bg-blue-500/20 border border-blue-500/40" />
                               <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest">{log.event}</span>
                            </div>
                            <span className="text-[9px] font-bold text-neutral-700 uppercase">{log.time} • {log.hub}</span>
                         </div>
                       ))}
                    </div>
                  </div>
               </section>
            </div>
          )}

          {/* FINANCIALS SECTION */}
          {activeTab === 'financials' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
               <section className="bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-10 shadow-xl">
                  <div className="space-y-2">
                     <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Treasury</h3>
                     <p className="text-neutral-500 text-xs md:text-sm font-medium italic">Secure banking and automated PPA disbursements.</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="p-10 bg-gradient-to-br from-neutral-800 to-black border border-white/10 rounded-[2.5rem] space-y-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:scale-110 transition-transform duration-1000">
                           <CreditCard size={150} />
                        </div>
                        <div className="flex justify-between items-start">
                           <div className="w-16 h-10 bg-neutral-900 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                              <div className="w-full h-full bg-neutral-700 opacity-20" />
                           </div>
                           <ShieldCheck className="text-green-500" size={24} />
                        </div>
                        <div className="space-y-2">
                           <p className="text-[9px] font-black text-neutral-500 uppercase tracking-[0.4em]">Primary Linked Node</p>
                           <p className="text-2xl font-cinematic font-bold text-white tracking-widest uppercase">HDFC BANK • • • • 9428</p>
                        </div>
                        <button className="text-[9px] font-black text-red-500 uppercase tracking-widest hover:underline flex items-center gap-2">
                           <RefreshCcw size={12} /> Rotate Disbursement Hub
                        </button>
                     </div>

                     <div className="space-y-4">
                        <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-6">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-red-600/10 text-red-500 rounded-xl">
                                 <Database size={20}/>
                              </div>
                              <div>
                                 <p className="text-[11px] font-black text-white uppercase tracking-widest">Tax Identity</p>
                                 <p className="text-[9px] text-green-500 font-bold uppercase tracking-widest">PAN/GST VERIFIED</p>
                              </div>
                           </div>
                           <div className="pt-4 border-t border-white/5">
                              <button className="w-full py-4 bg-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-neutral-700 transition-all flex items-center justify-center gap-2">
                                 <ExternalLink size={14} /> View Tax Ledger
                              </button>
                           </div>
                        </div>

                        <div className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] flex items-center justify-between group">
                           <div className="flex items-center gap-4">
                              <div className="p-3 bg-green-500/10 text-green-500 rounded-xl">
                                 <Zap size={20}/>
                              </div>
                              <div className="space-y-0.5">
                                 <p className="text-[11px] font-black text-white uppercase tracking-widest">Smart Escrow</p>
                                 <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-tight">Instant wrap releases</p>
                              </div>
                           </div>
                           <button 
                             onClick={() => toggleSetting('smartEscrow')}
                             className={`w-14 h-8 rounded-full relative transition-all active-scale ${
                               settings.smartEscrow ? 'bg-green-600' : 'bg-neutral-800'
                             }`}
                           >
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                                settings.smartEscrow ? 'left-7' : 'left-1'
                              }`} />
                           </button>
                        </div>
                     </div>
                  </div>

                  <section className="space-y-4">
                     <p className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em] ml-2">Financial Directives</p>
                     <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-6 bg-blue-600/5 border border-blue-600/10 rounded-[2rem] space-y-3">
                           <div className="flex items-center gap-2 text-blue-500">
                              <Info size={16} />
                              <span className="text-[9px] font-black uppercase tracking-widest">PPA Protocol</span>
                           </div>
                           <p className="text-[10px] text-neutral-500 leading-relaxed font-medium uppercase tracking-widest italic">
                              Disbursements require 1st AD wrap confirmation + Line Producer audit.
                           </p>
                        </div>
                        <div className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-3">
                           <div className="flex items-center gap-2 text-red-500">
                              <ShieldAlert size={16} />
                              <span className="text-[9px] font-black uppercase tracking-widest">Secure Hold</span>
                           </div>
                           <p className="text-[10px] text-neutral-500 leading-relaxed font-medium uppercase tracking-widest italic">
                              Escrow locks happen 24h before principal photography starts.
                           </p>
                        </div>
                     </div>
                  </section>
               </section>
            </div>
          )}

          {/* NOTIFICATIONS SECTION */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 md:space-y-8 animate-in slide-in-from-right-4 duration-500">
               <section className="bg-neutral-900/30 border border-white/5 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-10 shadow-xl">
                  <div className="space-y-2">
                     <h3 className="text-3xl md:text-5xl font-cinematic font-bold text-white uppercase tracking-widest">Alerts</h3>
                     <p className="text-neutral-500 text-xs md:text-sm font-medium italic">Mission-critical production signals.</p>
                  </div>

                  <div className="space-y-8">
                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em] ml-2">High Frequency</p>
                        {[
                          { id: 'pushAlerts', label: 'Push Notifications', desc: 'Direct unit pings for call sheets & alerts.', icon: <Bell /> },
                          { id: 'onsetAlerts', label: 'On-Set Triggers', desc: 'Critical rolling/standby state changes.', icon: <Radio /> },
                          { id: 'smsAlerts', label: 'SMS Emergency Protocol', desc: 'Backup node for high-priority logistics.', icon: <ShieldAlert /> }
                        ].map(item => (
                          <div key={item.id} className="p-6 bg-neutral-900 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
                             <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-2xl ${settings[item.id as keyof typeof settings] ? 'bg-red-600/10 text-red-500' : 'bg-neutral-800 text-neutral-500'}`}>
                                   {item.icon}
                                </div>
                                <div className="space-y-1">
                                   <p className="text-[11px] font-black text-white uppercase tracking-widest">{item.label}</p>
                                   <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">{item.desc}</p>
                                </div>
                             </div>
                             <button 
                               onClick={() => toggleSetting(item.id as any)}
                               className={`w-14 h-8 rounded-full relative transition-all active-scale ${
                                 settings[item.id as keyof typeof settings] ? 'bg-red-600' : 'bg-neutral-800'
                               }`}
                             >
                                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                                  settings[item.id as keyof typeof settings] ? 'left-7' : 'left-1'
                                }`} />
                             </button>
                          </div>
                        ))}
                     </div>

                     <div className="space-y-4 pt-6 border-t border-white/5">
                        <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] ml-2">Low Frequency</p>
                        <div className="p-6 bg-neutral-900 border border-white/5 rounded-[2rem] flex items-center justify-between group hover:border-white/10 transition-all">
                           <div className="flex items-center gap-6">
                              <div className={`p-4 rounded-2xl ${settings.emailDaily ? 'bg-blue-600/10 text-blue-500' : 'bg-neutral-800 text-neutral-500'}`}>
                                 <Mail size={18}/>
                              </div>
                              <div className="space-y-1">
                                 <p className="text-[11px] font-black text-white uppercase tracking-widest">Daily Log Summary</p>
                                 <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-tight">Emailed report of all slate activity.</p>
                              </div>
                           </div>
                           <button 
                             onClick={() => toggleSetting('emailDaily')}
                             className={`w-14 h-8 rounded-full relative transition-all active-scale ${
                               settings.emailDaily ? 'bg-blue-600' : 'bg-neutral-800'
                             }`}
                           >
                              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                                settings.emailDaily ? 'left-7' : 'left-1'
                              }`} />
                           </button>
                        </div>
                     </div>
                  </div>
               </section>
            </div>
          )}

          {/* DANGER ZONE - ALWAYS AT BOTTOM */}
          <section className="bg-red-600/5 border border-red-600/20 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] space-y-6 md:space-y-8 shadow-xl mt-6 md:mt-12">
             <div className="flex items-center gap-4 text-red-500">
                <Trash2 size={20} className="md:w-6 md:h-6" />
                <h3 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase">Terminate Account</h3>
             </div>
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <p className="text-neutral-500 text-[10px] md:text-xs font-bold leading-relaxed max-w-md uppercase tracking-tight">
                   Permanently remove your profile node from the registry. This action is irreversible and clears all verified credits and history.
                </p>
                <button className="w-full sm:w-auto px-10 py-5 bg-red-600/10 border border-red-600/30 text-red-500 font-black rounded-xl md:rounded-2xl text-[9px] md:text-[10px] uppercase tracking-[0.3em] active-scale hover:bg-red-600 hover:text-white transition-all shadow-lg">
                   Close Account
                </button>
             </div>
          </section>

        </main>
      </div>

      {/* 4. FOOTER SYNC */}
      <footer className="mt-12 md:mt-20 text-center opacity-20">
         <p className="text-[8px] md:text-[9px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • HUB ACCESS v4.2 • SECURE • SYNC: 12MS</p>
      </footer>
    </div>
  );
};

export default Settings;