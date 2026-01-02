
import React, { useState } from 'react';
import { 
  MOCK_PROJECTS, 
  MOCK_CALL_SHEETS, 
  MOCK_SCENES,
  MOCK_SHOTS,
  MOCK_LOGS 
} from '../constants';
import { 
  Plus, 
  Clock, 
  Users, 
  Clapperboard, 
  MapPin, 
  ChevronRight,
  Send,
  Camera,
  ClipboardList,
  History,
  FileCode,
  Download,
  BrainCircuit,
  Activity,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const ProjectWorkspace: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'prep' | 'shoot' | 'post'>('shoot');
  const [activeTool, setActiveTool] = useState<string>('shots');
  
  const project = MOCK_PROJECTS[0];
  const callSheet = MOCK_CALL_SHEETS[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      {/* Immersive Header */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-neutral-900 border border-white/5 p-8 md:p-12 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
          <div className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-4 py-1.5 bg-red-600 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full text-white shadow-2xl shadow-red-600/40">DAY {project.currentShootDay} / {project.totalShootDays}</span>
              <span className="text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md">PRODUCTION LIVE</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter leading-none">{project.title}</h2>
            <div className="flex flex-wrap items-center gap-8 text-sm text-neutral-400 font-medium">
              <span className="flex items-center gap-2.5"><MapPin size={18} className="text-red-500" /> {project.location}</span>
              <span className="flex items-center gap-2.5"><Clock size={18} className="text-blue-500" /> Crew Call: {callSheet.crewCall}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-stretch md:items-start gap-3">
             <div className="bg-black/40 p-2 rounded-2xl flex border border-white/5">
                {['prep', 'shoot', 'post'].map(stage => (
                   <button 
                    key={stage}
                    onClick={() => setActiveStage(stage as any)}
                    className={`px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                      activeStage === stage ? 'bg-white text-black' : 'text-neutral-500'
                    }`}
                   >
                      {stage}
                   </button>
                ))}
             </div>
          </div>
        </div>

        {/* Stage-Specific Tools */}
        <div className="flex flex-wrap gap-2 mt-12 bg-black/40 p-2 rounded-2xl w-fit backdrop-blur-3xl border border-white/5">
          {activeStage === 'shoot' && [
            { id: 'shots', label: 'SHOT LIST', icon: <Camera size={14} /> },
            { id: 'log', label: 'LIVE LOG', icon: <History size={14} /> },
            { id: 'callsheet', label: 'CALL SHEETS', icon: <ClipboardList size={14} /> },
            { id: 'crew', label: 'CREW AUDIT', icon: <Users size={14} /> }
          ].map(tool => (
            <button 
              key={tool.id}
              onClick={() => setActiveTool(tool.id)}
              className={`flex items-center gap-2.5 px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                activeTool === tool.id ? 'bg-red-600 text-white shadow-2xl shadow-red-600/30' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              {tool.icon}
              {tool.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          {activeTool === 'shots' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">SCENE {MOCK_SCENES[0].number}: {MOCK_SCENES[0].title}</h3>
                <button className="flex items-center gap-2 bg-red-600/10 text-red-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-red-600/20 transition-all uppercase tracking-widest">
                  <Plus size={16} /> Add Shot
                </button>
              </div>
              <div className="space-y-4">
                {MOCK_SHOTS.map(shot => (
                  <div key={shot.id} className={`bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group transition-all ${shot.status === 'Active' ? 'ring-2 ring-red-600/50' : ''}`}>
                    <div className="flex items-center gap-8">
                       <span className="text-5xl font-cinematic font-bold text-neutral-800 group-hover:text-red-500 transition-colors">{shot.number}</span>
                       <div>
                          <h4 className="font-bold text-xl mb-1">{shot.description}</h4>
                          <p className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">{shot.lens} • {shot.movement}</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-6">
                       {shot.status === 'Active' && (
                          <span className="flex items-center gap-2 text-[10px] font-bold text-red-500 uppercase animate-pulse">
                             <Activity size={14} /> ROLLING
                          </span>
                       )}
                       <button className={`p-4 rounded-2xl transition-all ${
                          shot.status === 'Done' ? 'bg-green-500/10 text-green-500' : 'bg-neutral-800 text-neutral-500 hover:bg-red-600 hover:text-white'
                       }`}>
                          {shot.status === 'Done' ? <CheckCircle2 size={24} /> : <Camera size={24} />}
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTool === 'log' && (
             <div className="space-y-6">
                <h3 className="text-2xl font-cinematic font-bold tracking-wide">SET LOGBOOK (DAY {project.currentShootDay})</h3>
                <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden">
                   {MOCK_LOGS.map((log, i) => (
                      <div key={log.id} className={`p-8 flex gap-6 ${i !== MOCK_LOGS.length - 1 ? 'border-b border-white/5' : ''}`}>
                         <div className="text-neutral-500 font-mono text-xs pt-1">{log.time}</div>
                         <div className="flex-1">
                            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1">{log.author}</p>
                            <p className="text-neutral-300 leading-relaxed text-sm">{log.note}</p>
                         </div>
                      </div>
                   ))}
                   <div className="p-8 bg-black/40 border-t border-white/5 flex gap-4">
                      <input 
                        type="text" 
                        placeholder="Type entry (e.g. 'Lunch Break', 'Scene 12 Shot')..." 
                        className="flex-1 bg-neutral-800 border-none rounded-2xl px-6 py-4 text-sm font-medium outline-none focus:ring-1 focus:ring-red-600"
                      />
                      <button className="p-5 bg-red-600 rounded-2xl text-white shadow-xl">
                         <Plus size={24} />
                      </button>
                   </div>
                </div>
             </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl">
              <h4 className="text-xl font-cinematic font-bold tracking-wide mb-8 uppercase">Live Progress</h4>
              <div className="space-y-8">
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                       <span>Shoot Progress</span>
                       <span>{project.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                       <div className="h-full bg-red-600 transition-all" style={{ width: `${project.progress}%` }} />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                       <span>Scenes Completed</span>
                       <span>12 / 45</span>
                    </div>
                    <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 transition-all" style={{ width: '27%' }} />
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-gradient-to-br from-red-600/10 to-black border border-red-600/20 p-8 rounded-[2.5rem] shadow-2xl">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl">
                 <BrainCircuit size={24} />
              </div>
              <h4 className="text-2xl font-cinematic font-bold tracking-wide mb-2 uppercase">Genie Log Insight</h4>
              <p className="text-neutral-400 text-sm mb-8 leading-relaxed italic">"Genie has analyzed Take 7. Continuity error detected: Actor's glass is in the right hand, previously left. Reshoot Take 8 suggested."</p>
              <button className="w-full py-4 bg-white text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest transition-all">FIX CONTINUITY</button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ProjectWorkspace;
