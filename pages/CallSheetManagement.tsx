
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MOCK_PROJECTS, MOCK_CALL_SHEETS, MOCK_LOCATIONS, MOCK_SCENES 
} from '../constants';
import { 
  ChevronLeft, Clock, MapPin, Send, Users, 
  Calendar, Save, FileText, Activity, Info, ShieldAlert
} from 'lucide-react';
import { Department } from '../types';

const CallSheetManagement: React.FC = () => {
  const navigate = useNavigate();
  const [activeCallSheet, setActiveCallSheet] = useState(MOCK_CALL_SHEETS[0]);
  const project = MOCK_PROJECTS[0];
  const location = MOCK_LOCATIONS.find(l => l.id === activeCallSheet.locationId)!;

  const crewList = [
    { name: 'Vikram Malhotra', role: 'Talent (Lead)', status: 'Confirmed', time: '06:15 AM' },
    { name: 'Sonia Ray', role: 'DP', status: 'Confirmed', time: '06:45 AM' },
    { name: 'Rajesh Kumar', role: 'Art Director', status: 'Delayed', time: '07:30 AM', reason: 'Transport issue' },
    { name: 'Sarah J.', role: '1st AD', status: 'Pending', time: '--' }
  ];

  const depts: Department[] = ['Camera', 'Art', 'Sound', 'Grip', 'Costume', 'Lighting'];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      
      {/* 1. HEADER & GLOBAL ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <button 
            onClick={() => navigate('/workspace')}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-4"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em]">Back to Shoot Day</span>
          </button>
          <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            Call Sheet
          </h1>
          <p className="text-neutral-500 font-bold uppercase tracking-[0.2em] text-[10px] flex items-center gap-3">
            {project.title} <div className="w-1 h-1 rounded-full bg-neutral-800" /> {activeCallSheet.date} <div className="w-1 h-1 rounded-full bg-neutral-800" /> {project.units[0].name}
          </p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-neutral-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all shadow-xl flex items-center gap-3">
             <Save size={18} /> Save Draft
          </button>
          <button 
            className="px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 shadow-3xl shadow-red-600/30 active-scale"
          >
             <Send size={18} /> Publish to Crew
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        
        {/* 2. CORE LOGISTICS */}
        <div className="lg:col-span-8 space-y-12">
           
           {/* Logistics Grid */}
           <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 grid md:grid-cols-3 gap-8 shadow-3xl relative overflow-hidden">
              <div className="space-y-1 relative z-10">
                 <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><MapPin size={10} className="text-red-500" /> Base Camp</p>
                 <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">{location.name}</p>
                 <p className="text-[8px] text-neutral-500 font-bold uppercase">{location.address}</p>
              </div>
              <div className="space-y-1 relative z-10">
                 <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><Clock size={10} className="text-blue-500" /> Gen Call</p>
                 <p className="text-3xl font-cinematic font-bold text-red-500 uppercase tracking-widest leading-none">{activeCallSheet.callTime}</p>
                 <p className="text-[8px] text-neutral-500 font-bold uppercase">Ready to Roll at 07:15 AM</p>
              </div>
              <div className="space-y-1 relative z-10">
                 <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest flex items-center gap-2"><ShieldAlert size={10} className="text-orange-500" /> Local Constraints</p>
                 <div className="flex flex-wrap gap-2">
                    {location.constraints?.map(c => (
                      <span key={c} className="text-[8px] font-black text-white bg-white/5 px-2 py-0.5 rounded border border-white/10 uppercase">{c}</span>
                    ))}
                 </div>
              </div>
           </section>

           {/* Scene Details */}
           <section className="space-y-6">
              <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em] px-4">Scenes on Call</h3>
              <div className="space-y-3">
                 {MOCK_SCENES.filter(s => activeCallSheet.sceneIds.includes(s.id)).map(s => (
                    <div key={s.id} className="p-8 bg-neutral-900/50 border border-white/5 rounded-[2.5rem] flex items-center justify-between group hover:border-white/20 transition-all shadow-xl">
                       <div className="flex items-center gap-10">
                          <span className="text-5xl font-cinematic font-bold text-neutral-800 group-hover:text-red-600/20 transition-colors leading-none">{s.number}</span>
                          <div className="space-y-1">
                             <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{s.title}</h4>
                             <p className="text-[10px] font-black text-neutral-600 uppercase tracking-widest mt-2">{s.setting} • {s.timeOfDay} • {s.pages} PGS</p>
                          </div>
                       </div>
                       <button className="p-3 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-all shadow-lg active-scale">
                         <FileText size={20}/>
                       </button>
                    </div>
                 ))}
              </div>
           </section>

           {/* Department Directives */}
           <section className="space-y-6">
              <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em] px-4">Department Instructions</h3>
              <div className="grid md:grid-cols-2 gap-4">
                 {depts.map(dept => (
                    <div key={dept} className="p-8 bg-black/40 border border-white/5 rounded-[2rem] space-y-4 group hover:border-red-600/30 transition-all shadow-lg">
                       <h5 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-3">
                          <div className={`w-1.5 h-1.5 rounded-full ${dept === 'Camera' ? 'bg-red-600' : dept === 'Art' ? 'bg-blue-600' : 'bg-neutral-600'}`} /> {dept} Unit
                       </h5>
                       <textarea 
                        className="w-full bg-transparent border-none outline-none text-xs text-neutral-500 italic leading-relaxed resize-none focus:text-white transition-colors"
                        placeholder={`Log ${dept} specific directives...`}
                        defaultValue={activeCallSheet.deptNotes?.[dept]}
                        rows={3}
                       />
                    </div>
                 ))}
              </div>
           </section>
        </div>

        {/* 3. CREW ACKNOWLEDGEMENT SIDEBAR */}
        <aside className="lg:col-span-4 space-y-8">
           <section className="bg-neutral-900 border border-white/5 p-10 rounded-[3rem] space-y-8 shadow-3xl sticky top-28">
              <div className="flex items-center justify-between">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Unit Tracking</h3>
                 <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2 animate-pulse">
                    <Activity size={14} /> SYNCING
                 </span>
              </div>

              <div className="space-y-4">
                 <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest ml-1">Confirmation Feed</p>
                 {crewList.map((crew, i) => (
                    <div key={i} className="p-5 bg-black/20 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all shadow-inner">
                       <div className="space-y-0.5">
                          <p className="text-[11px] font-black text-white uppercase tracking-widest">{crew.name}</p>
                          <p className="text-[9px] text-neutral-700 font-bold uppercase tracking-tight">{crew.role}</p>
                       </div>
                       <div className="text-right space-y-1">
                          <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-lg ${
                            crew.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 
                            crew.status === 'Delayed' ? 'bg-red-500/10 text-red-500 border border-red-500/20' : 'bg-neutral-800 text-neutral-600 border border-white/5'
                          }`}>
                            {crew.status}
                          </span>
                          {crew.reason && <p className="text-[7px] text-red-500 uppercase font-black tracking-tighter">{crew.reason}</p>}
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-8 border-t border-white/5 space-y-6">
                 <div className="flex items-start gap-4 p-5 bg-blue-600/5 border border-blue-600/10 rounded-2xl">
                    <Info size={20} className="text-blue-500 shrink-0" />
                    <p className="text-[10px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
                       Confirmed rates below 90% flag a production risk for 1st Unit. Follow up with pending personnel.
                    </p>
                 </div>
                 <button className="w-full py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.4em] transition-all shadow-xl active-scale">
                    EXPORT CALL SHEET PDF
                 </button>
              </div>
           </section>
        </aside>
      </div>
    </div>
  );
};

export default CallSheetManagement;
