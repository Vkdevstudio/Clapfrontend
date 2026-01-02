
import React, { useState } from 'react';
import { MOCK_TASKS, MOCK_SCENES, MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_MEDIA } from '../constants';
import { 
  Plus, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Users, 
  Clapperboard, 
  MapPin, 
  MessageSquare,
  ChevronRight,
  MoreVertical,
  Check,
  Send,
  Zap,
  LayoutGrid,
  List,
  Eye,
  Settings
} from 'lucide-react';

const ProjectWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'scenes' | 'crew' | 'media'>('tasks');
  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      {/* Immersive Production Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/5 p-8 md:p-12">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Clapperboard size={200} />
        </div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-red-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full text-white shadow-2xl shadow-red-600/40">DAY 12 / 45</span>
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">UNIT: MAIN UNIT</span>
              <span className="text-blue-500 text-[10px] font-bold uppercase tracking-[0.2em] bg-blue-500/10 px-4 py-1.5 rounded-full">ACTIVE: SCENE {project.activeScene}</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter leading-none">{project.title}</h2>
            <div className="flex flex-wrap items-center gap-8 text-sm text-neutral-400 font-medium">
              <span className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"><MapPin size={18} className="text-red-500" /> {project.location}</span>
              <span className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"><Clock size={18} className="text-blue-500" /> Crew Call: {callSheet.callTime}</span>
              <span className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer"><Users size={18} className="text-green-500" /> {project.crewCount} On Set</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch md:items-start gap-3">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-neutral-200 transition-all shadow-2xl flex items-center justify-center gap-3 group">
              <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /> 
              <span>PUBLISH CALL SHEET</span>
            </button>
            <div className="flex gap-2">
              <button className="p-4 bg-neutral-800 rounded-2xl border border-white/5 hover:bg-neutral-700 transition-colors shadow-xl">
                <Settings size={20} />
              </button>
              <button className="p-4 bg-neutral-800 rounded-2xl border border-white/5 hover:bg-neutral-700 transition-colors shadow-xl">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Unified Segmented Nav */}
        <div className="flex flex-wrap gap-2 mt-12 bg-black/40 p-2 rounded-2xl w-fit backdrop-blur-3xl border border-white/5">
          {[
            { id: 'tasks', label: 'PRODUCTION TASKS', icon: <Clock size={14} /> },
            { id: 'scenes', label: 'SCENE BREAKDOWN', icon: <Clapperboard size={14} /> },
            { id: 'crew', label: 'CAST & CREW', icon: <Users size={14} /> },
            { id: 'media', label: 'MEDIA VAULT', icon: <FileText size={14} /> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTab === tab.id ? 'bg-red-600 text-white shadow-2xl shadow-red-600/30' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 px-2">
        {/* Main Content Pane */}
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'tasks' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">ACTIVE WORKFLOW</h3>
                <div className="flex gap-2">
                   <button className="p-2 bg-neutral-900 border border-white/5 rounded-lg text-neutral-500"><LayoutGrid size={16} /></button>
                   <button className="p-2 bg-neutral-800 border border-white/5 rounded-lg text-white"><List size={16} /></button>
                   <button className="flex items-center gap-2 bg-red-600/10 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600/20 transition-all">
                    <Plus size={16} /> NEW TASK
                   </button>
                </div>
              </div>
              <div className="grid gap-4">
                {MOCK_TASKS.map(task => (
                  <div key={task.id} className="bg-neutral-900/50 border border-white/5 p-6 rounded-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-red-600/30 transition-all hover:bg-black/40">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 transition-all ${
                        task.status === 'Completed' ? 'bg-green-500/10 border-green-500/30 text-green-500' : 
                        task.status === 'In Progress' ? 'bg-blue-500/10 border-blue-500/30 text-blue-500' : 'bg-black/40 border-white/10 text-neutral-600'
                      }`}>
                        {task.status === 'Completed' ? <CheckCircle2 size={24} /> : <Zap size={22} />}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg group-hover:text-white transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-[10px] text-neutral-500 font-bold uppercase tracking-[0.1em]">
                          <span className={`${task.priority === 'High' ? 'text-red-500' : 'text-neutral-500'}`}>{task.priority} PRIORITY</span>
                          <span className="bg-white/5 px-2 py-0.5 rounded">SCENE {task.scene}</span>
                          <span className="flex items-center gap-1.5"><Users size={12} /> {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center gap-3">
                       <button className="p-3 bg-neutral-800 rounded-xl hover:text-green-500 transition-colors"><Check size={20} /></button>
                       <button className="p-3 bg-neutral-800 rounded-xl hover:text-white transition-colors"><Eye size={20} /></button>
                       <button className="p-3 bg-neutral-800 rounded-xl hover:text-white transition-colors"><MoreVertical size={20} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scenes' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">SHOOTING PROGRESS</h3>
                <button className="bg-white text-black px-5 py-2 rounded-xl text-xs font-bold shadow-xl">ADD SCENE</button>
              </div>
              <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-black/40 text-neutral-600 font-bold uppercase tracking-[0.2em] text-[10px]">
                      <tr>
                        <th className="px-8 py-5">SL NO.</th>
                        <th className="px-8 py-5">SCENE TITLE</th>
                        <th className="px-8 py-5">INT / EXT</th>
                        <th className="px-8 py-5">STATUS</th>
                        <th className="px-8 py-5 text-right">MGMT</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {MOCK_SCENES.map(scene => (
                        <tr key={scene.id} className="hover:bg-red-600/5 transition-colors cursor-pointer group">
                          <td className="px-8 py-6 font-cinematic text-2xl text-red-500">{scene.number}</td>
                          <td className="px-8 py-6">
                            <div className="font-bold text-white mb-1 uppercase tracking-wide">{scene.title}</div>
                            <div className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">{scene.location}</div>
                          </td>
                          <td className="px-8 py-6">
                             <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">
                                {scene.location.startsWith('Int') ? 'INTERIOR' : 'EXTERIOR'}
                             </span>
                          </td>
                          <td className="px-8 py-6">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                              scene.status === 'Shot' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                              scene.status === 'Ready' ? 'bg-blue-500/10 border-blue-500/20 text-blue-500' :
                              'bg-neutral-800 border-white/10 text-neutral-500'
                            }`}>{scene.status}</span>
                          </td>
                          <td className="px-8 py-6 text-right">
                            <button className="text-neutral-700 group-hover:text-white transition-colors"><MoreVertical size={20} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">PROJECT ASSETS</h3>
                <button className="text-red-500 text-sm font-bold flex items-center gap-2">
                  <Plus size={18} /> UPLOAD ASSET
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {MOCK_MEDIA.map((media, i) => (
                  <div key={i} className="bg-neutral-900 border border-white/5 p-6 rounded-[2rem] hover:border-red-600/40 transition-all cursor-pointer group flex flex-col h-full shadow-2xl">
                    <div className="w-16 h-16 bg-black/40 rounded-3xl flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all shadow-xl">
                      <FileText size={32} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2 group-hover:text-white">{media.title}</h4>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest bg-white/5 w-fit px-2 py-1 rounded mb-4">{media.type} • {media.size}</p>
                    </div>
                    <div className="flex gap-2 pt-4 border-t border-white/5 mt-auto">
                       <button className="flex-1 py-2.5 bg-neutral-800 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-neutral-700">PREVIEW</button>
                       <button className="px-4 py-2.5 bg-neutral-800 rounded-xl hover:bg-neutral-700"><ChevronRight size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Sidebar Context */}
        <div className="space-y-8">
          {/* Real-time Crew Map/Status */}
          <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-8 shadow-2xl">
            <div className="flex justify-between items-center">
              <h4 className="text-xl font-cinematic font-bold tracking-wide">ON-SET STATUS</h4>
              <button className="bg-red-600/10 text-red-500 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">LIVE MAP</button>
            </div>
            <div className="space-y-6">
              {[
                { name: 'Sarah Jenkins', role: 'Lead Talent', status: 'IN MAKEUP', color: 'bg-orange-500', sub: 'Est. Ready in 15m' },
                { name: 'Marcus Thorne', role: 'Cinematography', status: 'SET READY', color: 'bg-green-500', sub: 'Camera C rigged' },
                { name: 'Vinod Director', role: 'Direction', status: 'IN TRANSIT', color: 'bg-blue-500', sub: '12m from Studio 4' }
              ].map((crew, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center font-bold text-neutral-500 group-hover:border-red-500 group-hover:text-red-500 transition-all">
                      {crew.name.split(' ')[0][0]}{crew.name.split(' ')[1][0]}
                    </div>
                    <div>
                      <p className="font-bold text-base">{crew.name}</p>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest mb-1">{crew.role}</p>
                      <p className="text-[10px] text-neutral-600 font-medium italic">{crew.sub}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className={`w-3 h-3 rounded-full mb-1.5 shadow-lg ${crew.color} animate-pulse`} />
                    <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{crew.status}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all border border-white/5">
              BROADCAST TO CREW
            </button>
          </section>

          {/* Quick Shot Tracker */}
          <section className="bg-gradient-to-br from-neutral-800/40 to-black p-8 rounded-[2.5rem] border border-white/5 space-y-6 shadow-2xl">
            <h4 className="text-xl font-cinematic font-bold tracking-wide flex items-center gap-3">
              <Clapperboard size={20} className="text-red-500" /> PRODUCTION FLOW
            </h4>
            <div className="space-y-6 relative ml-2">
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-white/5" />
              {[
                { scene: '12B', title: 'The Revelation', time: 'ACTIVE SHOOT', active: true, progress: 'Shot 4 of 12' },
                { scene: '13', title: 'Morning Escape', time: 'PENDING START', active: false, progress: 'Prep required' }
              ].map((s, i) => (
                <div key={i} className="flex gap-6 pl-10 relative">
                  <div className={`absolute left-0 w-6 h-6 rounded-full border-4 border-neutral-950 -ml-0 transition-all ${s.active ? 'bg-red-500 scale-110 shadow-2xl shadow-red-500/50 ring-4 ring-red-500/20' : 'bg-neutral-800'}`} />
                  <div>
                    <p className="text-[10px] font-bold text-red-500 uppercase mb-1 tracking-[0.2em]">SCENE {s.scene}</p>
                    <p className={`text-lg font-cinematic font-bold tracking-wide ${s.active ? 'text-white' : 'text-neutral-500'}`}>{s.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">{s.time}</span>
                      <span className="text-neutral-700">•</span>
                      <span className="text-[10px] text-neutral-600 font-medium italic">{s.progress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Integrated Messenger Bubble */}
          <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group cursor-pointer hover:border-red-600/40 transition-all shadow-2xl">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-3xl bg-red-600 flex items-center justify-center text-white shadow-2xl shadow-red-600/40 group-hover:scale-105 transition-all">
                <MessageSquare size={32} />
              </div>
              <div>
                <p className="font-bold text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">CONVERSATION HUB</p>
                <p className="text-xl font-cinematic font-bold tracking-wide">PROJECT CHANNELS</p>
              </div>
            </div>
            <div className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center">3</div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
