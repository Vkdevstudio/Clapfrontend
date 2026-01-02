
import React from 'react';
import { MOCK_APPLICATIONS } from '../constants';
import { Clock, CheckCircle2, AlertCircle, ChevronRight, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Applications: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20 max-w-6xl mx-auto">
      <div className="space-y-2">
        <h2 className="text-5xl font-cinematic font-bold tracking-tight uppercase text-white leading-none">Submission Slate</h2>
        <p className="text-neutral-500 font-medium text-lg">Track your current applications across global productions.</p>
      </div>

      <div className="grid gap-6">
        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] flex items-center justify-between group hover:border-red-600/30 transition-all shadow-3xl bg-black/20">
            <div className="flex items-center gap-8">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${
                app.status === 'Shortlisted' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-neutral-800 text-neutral-500 border-white/10'
              }`}>
                <Briefcase size={28} />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white group-hover:text-red-500 transition-colors">{app.roleName}</h3>
                <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">{app.projectTitle} • Submitted {app.appliedAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-10">
              <div className="flex flex-col items-end gap-2">
                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border ${
                  app.status === 'Shortlisted' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                  app.status === 'Applied' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                  'bg-neutral-800 text-neutral-400 border-white/5'
                }`}>
                  {app.status === 'Shortlisted' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                  {app.status}
                </div>
                {app.status === 'Shortlisted' && (
                  <p className="text-[9px] text-green-500 font-black uppercase tracking-widest animate-pulse">Action required: Book Audition Slot</p>
                )}
              </div>
              <ChevronRight className="text-neutral-800 group-hover:text-white group-hover:translate-x-1 transition-all" size={24} />
            </div>
          </div>
        ))}

        {MOCK_APPLICATIONS.length === 0 && (
          <div className="text-center py-40 bg-neutral-900/20 rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center gap-8">
            <div className="p-10 bg-neutral-900 rounded-[3rem] border border-white/5 text-neutral-800">
               <Briefcase size={80} />
            </div>
            <div className="space-y-4">
               <h3 className="text-4xl font-cinematic font-bold text-neutral-700 uppercase tracking-widest">No Active Submissions</h3>
               <p className="text-neutral-600 max-w-sm mx-auto font-medium">Your submission slate is clear. Discover new opportunities in the Auditions Hub.</p>
            </div>
            <button 
              onClick={() => navigate('/auditions')}
              className="bg-red-600 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl shadow-red-600/30"
            >
              BROWSE AUDITIONS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
