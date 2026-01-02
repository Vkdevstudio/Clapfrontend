
import React from 'react';
import { UserRole, Project } from '../types';
import { MOCK_PROJECTS, MOCK_TASKS, MOCK_MESSAGES, MOCK_AI_INSIGHTS, COLORS } from '../constants';
import { 
  ArrowUpRight, 
  Clock, 
  MapPin, 
  Clapperboard, 
  Users, 
  Calendar, 
  MessageSquare, 
  ChevronRight,
  Zap,
  Star,
  Plus,
  TrendingUp,
  BrainCircuit,
  Sparkles,
  Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface DashboardProps {
  role: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
  const navigate = useNavigate();
  const isProduction = role === 'production';
  const isTalent = role === 'talent';
  const isVendor = role === 'vendor';

  // Production Dashboard: "Mission Control"
  if (isProduction) {
    const activeProject = MOCK_PROJECTS[0];
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-16 max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white">MISSION CONTROL</h1>
            <p className="text-neutral-500 font-medium">Global Slate Status • Mumbai HQ</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-neutral-900 p-4 rounded-2xl border border-white/5 hover:bg-neutral-800 transition-all">
                <Search size={24} className="text-neutral-400" />
             </button>
             <button onClick={() => navigate('/workspace')} className="bg-red-600 px-8 py-4 rounded-2xl text-white font-bold shadow-2xl shadow-red-600/30 flex items-center gap-2 hover:bg-red-700 transition-all">
                <Plus size={20} /> NEW PROJECT
             </button>
          </div>
        </header>

        {/* Global Hero: Active Project Map & Status */}
        <section 
          onClick={() => navigate('/workspace')}
          className="relative rounded-[2.5rem] overflow-hidden aspect-[16/10] md:aspect-[21/9] group cursor-pointer border border-white/5 shadow-2xl bg-neutral-900"
        >
          <img src={activeProject.image} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" alt={activeProject.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="bg-red-600 text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-widest animate-pulse border border-white/10 shadow-lg">PRODUCTION LIVE</span>
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-neutral-800 flex items-center justify-center text-[10px] font-bold overflow-hidden shadow-xl">
                    <img src={`https://picsum.photos/seed/${i+10}/100`} />
                  </div>
                ))}
              </div>
              <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">+42 On Set</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold mb-4 tracking-tighter leading-none text-white drop-shadow-2xl">{activeProject.title}</h2>
            <div className="flex flex-wrap items-center gap-8 text-neutral-400 font-medium">
              <span className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5"><MapPin size={18} className="text-red-500" /> {activeProject.location}</span>
              <span className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/5"><Clock size={18} className="text-blue-500" /> Crew Call: 07:00 AM</span>
              <span className="flex items-center gap-2.5 bg-green-500/10 text-green-500 backdrop-blur-md px-4 py-2 rounded-2xl border border-green-500/20"><TrendingUp size={18} /> {activeProject.progress}% Completion</span>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Feed of Alerts & Insights */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-cinematic font-bold tracking-wide">AI GENIE INSIGHTS</h3>
              <button className="text-red-500 text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:underline">
                Ask Genie <ArrowUpRight size={14} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
               {MOCK_AI_INSIGHTS.map(insight => (
                 <div key={insight.id} className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem] relative overflow-hidden group hover:border-red-600/30 transition-all cursor-pointer">
                    <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                       <BrainCircuit size={60} />
                    </div>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                      insight.type === 'warning' ? 'bg-orange-500/10 text-orange-500' :
                      insight.type === 'suggestion' ? 'bg-blue-500/10 text-blue-500' : 'bg-green-500/10 text-green-500'
                    }`}>
                       {insight.type === 'warning' ? <Zap size={20} /> : <Sparkles size={20} />}
                    </div>
                    <p className="text-white font-medium mb-2 leading-relaxed">{insight.content}</p>
                    <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{insight.timestamp}</p>
                 </div>
               ))}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-cinematic font-bold tracking-wide">PENDING HANDOFFS</h3>
              <div className="grid gap-3">
                {MOCK_TASKS.map(task => (
                  <div key={task.id} className="bg-neutral-900 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-red-600/30 transition-all cursor-pointer hover:bg-neutral-800/20">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform shadow-xl">
                        <Clock size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg group-hover:text-white transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-1 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.15em]">
                          <span className={`${task.priority === 'High' ? 'text-red-500' : 'text-neutral-500'}`}>{task.priority} PRIORITY</span>
                          <span className="text-neutral-700">•</span>
                          <span>SCENE {task.scene}</span>
                          <span className="text-neutral-700">•</span>
                          <span className="flex items-center gap-1"><Users size={12} /> {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="text-neutral-700 group-hover:text-white" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Contextual Hub */}
          <div className="lg:col-span-4 space-y-8">
            <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col h-[400px]">
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h3 className="text-xl font-cinematic font-bold tracking-wide">CREW COMMS</h3>
                <span className="bg-green-500 w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {MOCK_MESSAGES.map(msg => (
                  <div key={msg.id} className="flex gap-4 group">
                    <div className="relative">
                      <img src={msg.senderAvatar} className="w-10 h-10 rounded-2xl bg-neutral-800 border border-white/10 object-cover" />
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-neutral-900 rounded-full" />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-xs font-bold text-white">{msg.sender}</span>
                        <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{msg.timestamp}</span>
                      </div>
                      <p className="text-sm text-neutral-400 bg-black/40 p-4 rounded-2xl border border-white/5 leading-relaxed group-hover:border-neutral-700 transition-colors">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-black/40 border-t border-white/5">
                <div className="bg-neutral-800 rounded-2xl px-5 py-2.5 flex items-center gap-3 border border-white/5 focus-within:border-red-600/50 transition-all">
                  <input type="text" placeholder="Message #Set-Comms..." className="bg-transparent border-none outline-none flex-1 text-sm py-1.5 text-white placeholder-neutral-500 font-medium" />
                  <MessageSquare size={18} className="text-neutral-500" />
                </div>
              </div>
            </section>

            <section className="bg-gradient-to-br from-red-600/20 to-black border border-red-600/30 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
               <div className="relative z-10">
                  <div className="w-14 h-14 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-red-600/30 group-hover:scale-110 transition-transform">
                     <Clapperboard size={32} />
                  </div>
                  <h4 className="text-2xl font-cinematic font-bold mb-3 tracking-wide">GENIE DAILY REPORT</h4>
                  <p className="text-neutral-400 text-sm mb-6 leading-relaxed">Genie has analyzed your 45 crew logs. 3 departments reported equipment lag. Review suggestions?</p>
                  <button className="w-full py-4 bg-white text-black text-sm font-bold rounded-2xl shadow-xl hover:bg-neutral-200 transition-all">GENERATE FULL BRIEF</button>
               </div>
               <div className="absolute -right-12 -bottom-12 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <BrainCircuit size={180} />
               </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  // Talent Feed: "Discovery Mode"
  if (isTalent) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white">FOR YOU</h1>
            <p className="text-neutral-500 font-medium">98% Match based on your recent reels.</p>
          </div>
          <div className="flex gap-2">
             <button className="p-4 bg-neutral-900 rounded-2xl border border-white/5 text-accent shadow-xl"><Zap size={24} className="fill-accent" /></button>
          </div>
        </header>

        {/* Cinematic Vertical Scroll Cards Simulation */}
        <section className="relative rounded-[2.5rem] overflow-hidden aspect-[9/16] md:aspect-[21/9] group cursor-pointer border border-white/5 bg-neutral-900 shadow-2xl">
           <img src="https://images.unsplash.com/photo-1542204172-3c1f11c56ef4?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex flex-col justify-end p-8 md:p-16">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-accent text-black text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/10 shadow-lg">HIGH MATCH ROLE</span>
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-white/10">CASTING LIVE</span>
              </div>
              <h2 className="text-5xl md:text-8xl font-cinematic font-bold leading-none mb-4 tracking-tighter text-white drop-shadow-2xl">THE SILENT WITNESS</h2>
              <p className="text-neutral-300 text-lg md:text-2xl max-w-2xl font-medium mb-10 leading-relaxed drop-shadow-lg">Looking for Lead Female (25-30) for a global espionage thriller shooting in Dubai & Berlin. One-tap application active.</p>
              <div className="flex flex-col sm:flex-row gap-4">
                 <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl hover:bg-neutral-200 transition-all flex items-center justify-center gap-3">
                   APPLY NOW <Plus size={24} />
                 </button>
                 <button className="bg-black/60 backdrop-blur-3xl text-white px-10 py-5 rounded-2xl font-bold text-lg border border-white/10 hover:bg-neutral-800 transition-all">VIEW BREAKDOWN</button>
              </div>
           </div>
        </section>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
           <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-cinematic font-bold tracking-wide">RECOMMENDED PROJECTS</h3>
                 <button className="text-red-500 text-xs font-bold uppercase tracking-widest hover:underline">See All Slate</button>
              </div>
              <div className="grid sm:grid-cols-2 gap-6">
                 {MOCK_PROJECTS.map(project => (
                   <ProjectCard key={project.id} project={project} />
                 ))}
              </div>
           </div>

           <div className="space-y-8">
              <div className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
                 <div className="flex items-center gap-6 mb-8">
                    <div className="relative">
                      <img src="https://picsum.photos/seed/vinod/200" className="w-20 h-20 rounded-3xl border-2 border-red-600 shadow-2xl object-cover" />
                      <div className="absolute -bottom-2 -right-2 bg-red-600 text-white p-1.5 rounded-xl border-4 border-neutral-900">
                        <Star size={12} className="fill-white" />
                      </div>
                    </div>
                    <div>
                       <h4 className="font-bold text-2xl text-white">Vinod Star</h4>
                       <p className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-1 mt-1">
                         <TrendingUp size={12} className="text-green-500" /> PRO RATING: 4.9
                       </p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/40 p-5 rounded-[1.5rem] border border-white/5 text-center group hover:border-red-600/30 transition-all cursor-pointer">
                       <p className="text-3xl font-cinematic font-bold text-white mb-1">12</p>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Applied</p>
                    </div>
                    <div className="bg-black/40 p-5 rounded-[1.5rem] border border-white/5 text-center group hover:border-green-600/30 transition-all cursor-pointer">
                       <p className="text-3xl font-cinematic font-bold text-green-500 mb-1">3</p>
                       <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Shortlisted</p>
                    </div>
                 </div>
                 <button className="w-full mt-6 py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl text-xs uppercase tracking-widest transition-all">VIEW ANALYTICS</button>
              </div>
              
              <div className="bg-gradient-to-br from-neutral-800/50 to-black border border-white/5 p-8 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                 <div className="relative z-10">
                    <div className="w-14 h-14 bg-accent text-black rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-accent/20">
                       <Zap size={32} className="fill-black" />
                    </div>
                    <h4 className="text-2xl font-cinematic font-bold mb-3 tracking-wide text-white">PREMIUM DISCOVERY</h4>
                    <p className="text-neutral-400 text-sm mb-8 leading-relaxed">Let Genie pitch your profile to 50+ Top-tier Directors automatically. Your match rate is peaking today.</p>
                    <button className="w-full py-4 bg-white text-black text-xs font-bold rounded-2xl shadow-xl hover:bg-neutral-200 transition-all tracking-[0.2em]">ACTIVATE NOW</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    );
  }

  // Vendor Hub: "Business Central"
  if (isVendor) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-7xl mx-auto">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white">VENDOR HUB</h1>
            <p className="text-neutral-500 font-medium">Business Central • Real-time Demand: High</p>
          </div>
          <button className="bg-red-600 text-white px-10 py-4 rounded-2xl font-bold text-sm shadow-2xl shadow-red-600/30 hover:bg-red-700 transition-all">
            LIST NEW ITEM
          </button>
        </header>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { label: 'REVENUE (MTD)', value: '$12,402', change: '+18.5%', color: 'text-green-500' },
             { label: 'UTILIZATION', value: '82%', change: '+5%', color: 'text-blue-500' },
             { label: 'INQUIRIES', value: '24', change: '+12', color: 'text-orange-500' },
             { label: 'PRO RATING', value: '4.9', change: '+0.1', color: 'text-accent' }
           ].map((stat, i) => (
             <div key={i} className="bg-neutral-900 border border-white/5 p-8 rounded-[2rem] shadow-xl group hover:border-neutral-700 transition-all">
                <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em] mb-3">{stat.label}</p>
                <div className="flex items-baseline justify-between">
                   <p className="text-4xl font-cinematic font-bold text-white">{stat.value}</p>
                   <span className={`text-[10px] font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'} bg-black/40 px-2 py-1 rounded-lg`}>{stat.change}</span>
                </div>
             </div>
           ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
           <div className="lg:col-span-8 space-y-8">
              <div className="flex justify-between items-center">
                 <h3 className="text-3xl font-cinematic font-bold tracking-wide">PENDING SERVICE REQUESTS</h3>
                 <button className="text-neutral-500 text-xs font-bold uppercase tracking-widest hover:text-white">Batch Respond</button>
              </div>
              <div className="grid gap-4">
                 {[
                   { project: 'THE MIDNIGHT SCRIPT', item: 'ARRI Alexa Mini Package', duration: '5 Days', budget: '$6,000', client: 'Vinod S.' },
                   { project: 'NEON HORIZON', item: 'Virtual Volume A', duration: '2 Days', budget: '$7,000', client: 'Sarah J.' }
                 ].map((req, i) => (
                   <div key={i} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col md:flex-row md:items-center justify-between group hover:border-red-600/30 transition-all cursor-pointer shadow-xl">
                      <div className="flex gap-6 items-center">
                         <div className="w-16 h-16 rounded-3xl bg-black border border-white/10 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                            <Clapperboard size={32} />
                         </div>
                         <div>
                            <h4 className="text-2xl font-cinematic font-bold text-white mb-1 tracking-wide">{req.project}</h4>
                            <p className="text-sm text-neutral-400 font-medium">{req.item} • {req.duration}</p>
                            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1">Requested by {req.client}</p>
                         </div>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center gap-10">
                         <div className="text-right">
                           <p className="text-2xl font-cinematic font-bold text-white">{req.budget}</p>
                           <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Total Value</p>
                         </div>
                         <button className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-white group-hover:bg-red-600 transition-all">
                            <ChevronRight size={24} />
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="lg:col-span-4 space-y-8">
              <h3 className="text-3xl font-cinematic font-bold tracking-wide">LIVE CHAT</h3>
              <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-2xl h-[500px] flex flex-col">
                 <div className="flex-1 overflow-y-auto space-y-6">
                   {MOCK_MESSAGES.map(msg => (
                      <div key={msg.id} className="p-5 bg-black/40 rounded-[1.5rem] border border-white/5 group hover:border-neutral-700 transition-all">
                         <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">INQUIRY UPDATE</span>
                            <span className="text-[10px] text-neutral-600 font-bold uppercase">{msg.timestamp}</span>
                         </div>
                         <p className="text-sm text-neutral-300 leading-relaxed">{msg.content}</p>
                      </div>
                   ))}
                 </div>
                 <button className="w-full py-4 bg-neutral-800 text-neutral-400 text-xs font-bold uppercase rounded-2xl hover:text-white transition-all tracking-[0.2em] border border-white/5">OPEN MESSAGE CENTER</button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  return <div>Role Access Restricted</div>;
};

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="group rounded-[2.5rem] bg-neutral-900 border border-white/5 overflow-hidden hover:border-red-600/30 transition-all cursor-pointer flex flex-col h-full shadow-2xl bg-black">
    <div className="aspect-video w-full relative overflow-hidden">
      <img src={project.image} alt={project.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
      <div className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] border border-white/10 text-white shadow-xl">
        {project.type}
      </div>
    </div>
    <div className="p-8 flex-1 flex flex-col">
      <h4 className="font-cinematic text-3xl mb-3 group-hover:text-red-500 transition-colors tracking-wide text-white">{project.title}</h4>
      <div className="flex items-center gap-4 mb-6">
        <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={14} className="text-blue-500" /> {project.status}
        </span>
        <span className="text-neutral-800">|</span>
        <span className="text-xs text-neutral-500 font-bold uppercase tracking-widest flex items-center gap-2">
          <Users size={14} className="text-red-500" /> {project.crewCount} CREW
        </span>
      </div>
      <div className="mt-auto flex justify-between items-center text-[10px] text-neutral-500 uppercase tracking-widest font-bold pt-6 border-t border-white/5">
        <span className="flex items-center gap-2 text-neutral-400"><MapPin size={12} className="text-red-500" /> {project.location.split(',')[0]}</span>
        <span className="bg-white/5 px-3 py-1 rounded-lg">PROJ ID: #{project.id.toUpperCase()}</span>
      </div>
    </div>
  </div>
);

export default Dashboard;
