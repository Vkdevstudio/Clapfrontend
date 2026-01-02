
import React from 'react';
import { MOCK_APPLICATIONS } from '../constants';
import { Clock, CheckCircle2, AlertCircle, ChevronRight } from 'lucide-react';

const Applications: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-3xl font-bold">My Applications</h2>
        <p className="text-neutral-400">Track the status of your submitted roles.</p>
      </div>

      <div className="grid gap-4">
        {MOCK_APPLICATIONS.map((app) => (
          <div key={app.id} className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl flex items-center justify-between group hover:border-neutral-700 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-neutral-800 rounded-xl flex items-center justify-center text-red-500">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">{app.roleName}</h3>
                <p className="text-sm text-neutral-500">{app.projectTitle} • Applied on {app.appliedAt}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex flex-col items-end">
                <div className={`flex items-center gap-1 text-sm font-bold px-3 py-1 rounded-full ${
                  app.status === 'Shortlisted' ? 'bg-green-500/10 text-green-500' :
                  app.status === 'Applied' ? 'bg-blue-500/10 text-blue-500' :
                  'bg-neutral-800 text-neutral-400'
                }`}>
                  {app.status === 'Shortlisted' ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                  {app.status}
                </div>
                {app.status === 'Shortlisted' && (
                  <p className="text-[10px] text-green-500 mt-1 animate-pulse">Action required: Book Audition Slot</p>
                )}
              </div>
              <ChevronRight className="text-neutral-700 group-hover:text-white transition-colors" />
            </div>
          </div>
        ))}

        {MOCK_APPLICATIONS.length === 0 && (
          <div className="text-center py-20 bg-neutral-900/50 rounded-3xl border border-neutral-800 border-dashed">
            <AlertCircle className="mx-auto text-neutral-700 mb-4" size={48} />
            <h3 className="text-xl font-bold text-neutral-400">No applications yet</h3>
            <p className="text-neutral-600 mb-6">Start applying to auditions to see them here.</p>
            <button className="bg-red-600 px-6 py-2 rounded-lg font-bold">Browse Auditions</button>
          </div>
        )}
      </div>
    </div>
  );
};

const Briefcase = ({ size, className }: { size?: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

export default Applications;
