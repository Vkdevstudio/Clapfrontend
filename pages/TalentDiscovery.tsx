
import React, { useState } from 'react';
import { MOCK_TALENT } from '../constants';
import { Search, Filter, Star, MapPin, CheckCircle, MoreHorizontal, UserPlus } from 'lucide-react';

const TalentDiscovery: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Talent Discovery</h2>
          <p className="text-neutral-400">Search for the perfect cast and crew for your next project.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-sm hover:border-neutral-600 transition-all">
            <Filter size={18} /> Filters
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-bold transition-all shadow-lg shadow-red-600/20">
            Invite Talent
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-red-500 transition-colors" size={20} />
        <input 
          type="text" 
          placeholder="Search by role, skill, or name (e.g., 'Lead Actress', 'Cinematographer')..." 
          className="w-full bg-neutral-900 border border-neutral-800 rounded-2xl pl-12 pr-4 py-4 outline-none focus:border-red-600 transition-all shadow-xl"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Talent Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_TALENT.map((talent) => (
          <div key={talent.id} className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-neutral-700 transition-all group flex flex-col">
            <div className="p-6 flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-neutral-800 group-hover:border-red-500 transition-colors">
                    <img src={talent.avatar} alt={talent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="font-bold text-lg">{talent.name}</h3>
                      {talent.verified && <CheckCircle className="text-red-500" size={16} />}
                    </div>
                    <p className="text-red-500 text-xs font-bold uppercase tracking-wider">{talent.specialty}</p>
                  </div>
                </div>
                <button className="text-neutral-600 hover:text-white"><MoreHorizontal size={20} /></button>
              </div>

              <div className="flex items-center gap-4 text-xs text-neutral-500 font-medium">
                <span className="flex items-center gap-1"><Star size={14} className="text-accent fill-accent" /> {talent.rating}</span>
                <span className="flex items-center gap-1"><MapPin size={14} /> Mumbai</span>
                <span>{talent.completedProjects} Projects</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {talent.skills?.map(skill => (
                  <span key={skill} className="px-2 py-1 bg-neutral-800 text-neutral-400 text-[10px] rounded font-bold uppercase tracking-widest">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-neutral-800/30 border-t border-neutral-800 flex gap-2">
              <button className="flex-1 py-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-xs font-bold transition-all">
                View Profile
              </button>
              <button className="flex-1 py-2.5 bg-red-600/10 hover:bg-red-600/20 text-red-500 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                <UserPlus size={14} /> Shortlist
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TalentDiscovery;
