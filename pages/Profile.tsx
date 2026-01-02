
import React from 'react';
import { Star, MapPin, Share2, Edit2, Play, FileText, Verified } from 'lucide-react';
import { MOCK_MEDIA } from '../constants';

const Profile: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Profile Header */}
      <div className="relative rounded-3xl overflow-hidden">
        <div className="h-48 md:h-64 bg-gradient-to-r from-red-900 to-black relative">
          <img 
            src="https://images.unsplash.com/photo-1542204172-3c1f11c56ef4?auto=format&fit=crop&q=80&w=1200" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-50 mix-blend-overlay"
          />
        </div>
        <div className="px-8 pb-8 -mt-20 relative z-10 flex flex-col md:flex-row items-end gap-6">
          <div className="w-40 h-40 rounded-3xl border-4 border-neutral-950 bg-neutral-900 overflow-hidden shadow-2xl">
            <img src="https://picsum.photos/seed/user1/400" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-2">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-3xl font-bold">Vinod Director</h1>
              <Verified className="text-red-500" size={20} />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-neutral-400 text-sm">
              <span className="flex items-center gap-1"><Star size={14} className="text-accent fill-accent" /> 4.9 (42 Reviews)</span>
              <span className="flex items-center gap-1"><MapPin size={14} /> Mumbai, India</span>
              <span className="bg-red-600/10 text-red-500 px-2 py-0.5 rounded font-bold text-xs uppercase">Elite Talent</span>
            </div>
          </div>
          <div className="flex gap-2 pb-2">
            <button className="p-3 bg-neutral-900 rounded-xl border border-neutral-800 hover:bg-neutral-800 transition-colors">
              <Share2 size={20} />
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-all shadow-xl shadow-red-600/20">
              <Edit2 size={18} /> Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Bio Section */}
          <section className="bg-neutral-900 p-8 rounded-3xl border border-neutral-800">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-neutral-400 leading-relaxed">
              Award-winning actor and director with 10+ years of experience in regional and international cinema. 
              Specialized in psychological thrillers and period dramas. Fluent in Hindi, Marathi, and English.
            </p>
            <div className="flex flex-wrap gap-2 mt-6">
              {['Acting', 'Directing', 'Screenwriting', 'Method Acting', 'Horse Riding'].map(skill => (
                <span key={skill} className="px-3 py-1 bg-neutral-800 rounded-lg text-sm text-neutral-300">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Media Portfolio */}
          <section className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Featured Media</h2>
              <button className="text-red-500 text-sm font-bold">Manage All</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {MOCK_MEDIA.map(media => (
                <div key={media.id} className="group relative aspect-video bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all cursor-pointer">
                  {media.thumbnail && <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity" />}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-red-500 font-bold uppercase tracking-wider mb-1">{media.type}</p>
                        <h4 className="font-bold">{media.title}</h4>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {media.type === 'Video' ? <Play size={20} fill="white" /> : <FileText size={20} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-8">
          {/* Stats / Metadata */}
          <section className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
            <h3 className="font-bold mb-6">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Completed Projects</span>
                <span className="font-bold">24</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Shortlisted Rate</span>
                <span className="font-bold text-green-500">85%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Response Time</span>
                <span className="font-bold text-blue-500">&lt; 2h</span>
              </div>
            </div>
          </section>

          {/* Availability */}
          <section className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
            <h3 className="font-bold mb-4">Availability</h3>
            <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
              <p className="text-sm font-bold text-green-500">Available for Immediate Hire</p>
              <p className="text-[10px] text-green-500/60 uppercase mt-1">Updated 2h ago</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
