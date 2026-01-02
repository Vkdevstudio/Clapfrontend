
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_AUDITIONS } from '../constants';
import { Calendar, DollarSign, MapPin, Tag, ChevronLeft, Send, Sparkles, CheckCircle, FileText, Share2 } from 'lucide-react';

const AuditionDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Simulate if talent has already applied (could be tracked in a global store)
  const [applied, setApplied] = useState(false);
  const audition = MOCK_AUDITIONS.find(a => a.id === id) || MOCK_AUDITIONS[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-5xl mx-auto">
      <button 
        onClick={() => navigate('/auditions')}
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-4"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Auditions</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                 <span className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-600/20">URGENT HIRING</span>
                 <span className="bg-neutral-900 text-neutral-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/5">{audition.projectTitle}</span>
              </div>
              <h1 className="text-6xl font-cinematic font-bold tracking-tighter text-white uppercase">{audition.roleName}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                 <span className="flex items-center gap-2"><Calendar size={18} className="text-red-500" /> Deadline: {audition.deadline}</span>
                 <span className="flex items-center gap-2"><DollarSign size={18} className="text-green-500" /> {audition.payScale}</span>
                 <span className="flex items-center gap-2"><MapPin size={18} className="text-blue-500" /> Mumbai</span>
              </div>
           </header>

           <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-10 space-y-8">
              <div className="space-y-4">
                 <h3 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase">Role Description</h3>
                 <p className="text-neutral-400 leading-relaxed text-lg font-medium">{audition.roleDescription}</p>
              </div>
              
              <div className="space-y-4">
                 <h3 className="text-xl font-cinematic font-bold tracking-widest text-white uppercase">Requirements</h3>
                 <ul className="grid gap-3">
                    {audition.requirements?.map((req, i) => (
                       <li key={i} className="flex items-center gap-3 text-neutral-300 font-medium">
                          <CheckCircle size={18} className="text-red-500" />
                          {req}
                       </li>
                    ))}
                 </ul>
              </div>

              <div className="pt-8 border-t border-white/5 flex gap-3">
                 {audition.tags.map(tag => (
                    <span key={tag} className="px-4 py-2 bg-black border border-white/5 rounded-xl text-[10px] font-bold text-neutral-500 uppercase tracking-widest">
                       {tag}
                    </span>
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl">
              <div className="aspect-square relative">
                 <img src={audition.image} className="w-full h-full object-cover grayscale opacity-60" />
                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              </div>
              <div className="p-8 space-y-4">
                 {!applied ? (
                    <button 
                      onClick={() => navigate(`/auditions/${audition.id}/apply`)}
                      className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-2xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                    >
                       <Send size={18} /> Apply for Role
                    </button>
                 ) : (
                    <div className="w-full py-5 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                       <CheckCircle size={18} /> Applied Successfully
                    </div>
                 )}
                 <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] border border-white/5">
                    <Share2 size={16} /> Share Posting
                 </button>
              </div>
           </div>

           <section className="bg-gradient-to-br from-red-600/10 to-black border border-red-600/20 p-8 rounded-[2.5rem] shadow-2xl group">
              <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-xl">
                 <Sparkles size={24} />
              </div>
              <h4 className="text-2xl font-cinematic font-bold tracking-wide mb-2 uppercase">Genie Match</h4>
              <p className="text-neutral-400 text-sm mb-8 leading-relaxed font-medium">"Genie has analyzed your profile against the role of <span className="text-white">{audition.roleName}</span>. Your recent performance in 'The Midnight Script' matches 92% of the required intensity."</p>
              <button className="w-full py-4 bg-white text-black font-bold rounded-2xl text-[10px] uppercase tracking-widest transition-all">VIEW MATCH ANALYSIS</button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default AuditionDetail;
