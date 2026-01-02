
import React from 'react';
import { MOCK_AUDITIONS } from '../constants';
import { Calendar, DollarSign, MapPin, Tag, ChevronRight } from 'lucide-react';

const Auditions: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Available Auditions</h2>
          <p className="text-neutral-400">Discover your next breakthrough role.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Search roles..." 
            className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2 text-sm focus:border-red-600 outline-none w-full md:w-64"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {MOCK_AUDITIONS.map((audition) => (
          <div key={audition.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-700 transition-all group">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 aspect-video md:aspect-square overflow-hidden">
                <img 
                  src={audition.image} 
                  alt={audition.roleName} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="flex-1 p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">{audition.roleName}</h3>
                    <p className="text-neutral-400 text-sm font-medium">{audition.projectTitle}</p>
                  </div>
                  <div className="flex items-center gap-1 text-accent font-bold text-sm bg-accent/10 px-2 py-1 rounded">
                    <DollarSign size={14} />
                    {audition.payScale}
                  </div>
                </div>

                <p className="text-sm text-neutral-300 line-clamp-2">{audition.roleDescription}</p>

                <div className="flex flex-wrap gap-2">
                  {audition.tags?.map(tag => (
                    <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-neutral-800 text-neutral-400 text-[10px] rounded-full font-bold uppercase tracking-wider">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                  <div className="flex items-center gap-4 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {audition.deadline}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin size={14} /> Mumbai (On-set)
                    </span>
                  </div>
                  <button className="flex items-center gap-1 px-6 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-red-600/10">
                    Apply Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Auditions;
