
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MOCK_PROJECTS, 
  MOCK_CALL_SHEETS, 
  MOCK_TALENT 
} from '../constants';
import { 
  ChevronLeft, 
  Clock, 
  MapPin, 
  CloudSun, 
  Send, 
  Users, 
  CheckCircle2, 
  AlertTriangle,
  Info,
  Calendar,
  Save,
  MoreVertical
} from 'lucide-react';

const CallSheetManagement: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const project = MOCK_PROJECTS[0];
  const [callSheet, setCallSheet] = useState(MOCK_CALL_SHEETS[0]);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      // In a real app, this would trigger notifications
    }, 1500);
  };

  const crewMembers = [
    { name: 'Vikram Malhotra', role: 'Talent (Lead)', status: 'Confirmed', time: '06:15 AM' },
    { name: 'Sonia Ray', role: 'DP', status: 'Confirmed', time: '06:45 AM' },
    { name: 'Rajesh Kumar', role: 'Art Director', status: 'Delayed', time: '07:30 AM (Est)', reason: 'Transit' },
    { name: 'Sarah J.', role: '1st AD', status: 'Pending', time: '--' },
    { name: 'Amit P.', role: 'Gaffer', status: 'Pending', time: '--' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <button 
            onClick={() => navigate('/workspace')}
            className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-4"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Back to Workspace</span>
          </button>
          <h1 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">
            Call Sheet: Day {callSheet.shootDay}
          </h1>
          <p className="text-neutral-500 font-medium">Production Management & Crew Logistics for <span className="text-white">{project.title}</span></p>
        </div>
        <div className="flex gap-4">
          <button className="px-8 py-4 bg-neutral-900 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white transition-all flex items-center gap-3">
             <Save size={18} /> Save Draft
          </button>
          <button 
            onClick={handlePublish}
            disabled={isPublishing}
            className={`px-10 py-5 rounded-2xl text-[11px] font-black uppercase tracking-[0.3em] transition-all flex items-center gap-3 shadow-3xl ${
              isPublishing ? 'bg-neutral-800 text-neutral-500' : 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/30'
            }`}
          >
            {isPublishing ? 'PUBLISHING...' : <><Send size={18} /> DISTRIBUTE CALL</>}
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        {/* Editor Side */}
        <div className="lg:col-span-7 space-y-8">
           <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-2xl">
              <div className="flex items-center gap-4 text-red-500 mb-2">
                 <Calendar size={20} />
                 <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase">Primary Logistics</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">General Crew Call</label>
                    <div className="relative">
                       <Clock className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-500" size={18} />
                       <input 
                        type="text" 
                        defaultValue={callSheet.crewCall}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white font-bold outline-none focus:ring-1 focus:ring-red-600"
                       />
                    </div>
                 </div>
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Weather Forecast</label>
                    <div className="relative">
                       <CloudSun className="absolute left-6 top-1/2 -translate-y-1/2 text-blue-500" size={18} />
                       <input 
                        type="text" 
                        defaultValue={callSheet.weather}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white font-bold outline-none focus:ring-1 focus:ring-red-600"
                       />
                    </div>
                 </div>
                 <div className="md:col-span-2 space-y-3">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Base Camp Location</label>
                    <div className="relative">
                       <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-red-500" size={18} />
                       <input 
                        type="text" 
                        defaultValue={callSheet.location}
                        className="w-full bg-black/40 border border-white/5 rounded-2xl pl-16 pr-8 py-5 text-white font-bold outline-none focus:ring-1 focus:ring-red-600"
                       />
                    </div>
                 </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-widest ml-2">Production Notes (Blue Pages)</label>
                 <textarea 
                  rows={4}
                  className="w-full bg-black/40 border border-white/5 rounded-[2rem] p-8 text-neutral-300 font-medium outline-none focus:ring-1 focus:ring-red-600 resize-none"
                  placeholder="Enter specific instructions for Day 12..."
                  defaultValue="Unit A rolls at 08:30. Wardrobe must be cleared by 08:00. Safety brief at 07:45. Lunch provided on set."
                 />
              </div>
           </section>
        </div>

        {/* Audit Side */}
        <div className="lg:col-span-5 space-y-8">
           <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-8 shadow-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                 <Users size={120} />
              </div>
              <div className="flex justify-between items-center">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Silent Audit</h3>
                 <span className="text-[10px] font-black text-green-500 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} /> Live Sync
                 </span>
              </div>

              <div className="space-y-4">
                 {crewMembers.map((member, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-black/20 rounded-3xl border border-white/5 group hover:border-red-600/30 transition-all">
                       <div className="flex items-center gap-5">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${
                            member.status === 'Confirmed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 
                            member.status === 'Delayed' ? 'bg-accent/10 text-accent border-accent/20' :
                            'bg-neutral-800 text-neutral-500 border-white/5'
                          }`}>
                             {member.status === 'Confirmed' ? <CheckCircle2 size={24} /> : 
                              member.status === 'Delayed' ? <AlertTriangle size={24} /> :
                              <Clock size={24} />}
                          </div>
                          <div>
                             <p className="text-sm font-black text-white uppercase tracking-wide group-hover:text-red-500 transition-colors">{member.name}</p>
                             <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-0.5">{member.role}</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className={`text-[10px] font-black uppercase tracking-widest ${
                            member.status === 'Confirmed' ? 'text-green-500' : 
                            member.status === 'Delayed' ? 'text-accent' : 'text-neutral-700'
                          }`}>
                            {member.status}
                          </p>
                          <p className="text-[9px] text-neutral-800 font-bold uppercase mt-1">{member.time}</p>
                       </div>
                    </div>
                 ))}
              </div>

              <div className="pt-6 border-t border-white/5 space-y-4">
                 <div className="flex items-center gap-3 text-neutral-500">
                    <Info size={16} />
                    <p className="text-[9px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                       Crew are automatically notified upon distribution. Acknowledgments are logged silently without set-wide pings.
                    </p>
                 </div>
                 <button className="w-full py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] transition-all border border-white/5">
                    VIEW FULL ACKNOWLEDGMENT LOG
                 </button>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

export default CallSheetManagement;
