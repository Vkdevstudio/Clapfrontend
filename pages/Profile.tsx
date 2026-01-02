
import React, { useState } from 'react';
/* Added Activity and CheckCircle2 to the lucide-react imports */
import { Star, MapPin, Share2, Edit2, Play, FileText, Verified, Check, X, Activity, CheckCircle2 } from 'lucide-react';
import { MOCK_MEDIA } from '../constants';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Vinod Director',
    bio: 'Award-winning actor and director with 10+ years of experience in regional and international cinema. Specialized in psychological thrillers and period dramas. Fluent in Hindi, Marathi, and English.'
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700 max-w-6xl mx-auto pb-20">
      {/* Profile Header */}
      <div className="relative rounded-[3.5rem] overflow-hidden shadow-3xl">
        <div className="h-48 md:h-80 bg-gradient-to-r from-red-900 to-black relative">
          <img 
            src="https://images.unsplash.com/photo-1542204172-3c1f11c56ef4?auto=format&fit=crop&q=80&w=1200" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay grayscale"
          />
        </div>
        <div className="px-12 pb-12 -mt-24 relative z-10 flex flex-col md:flex-row items-end gap-10">
          <div className="w-48 h-48 rounded-[3rem] border-8 border-neutral-950 bg-neutral-900 overflow-hidden shadow-3xl transform hover:scale-105 transition-transform duration-500">
            <img src="https://picsum.photos/seed/user1/400" alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-5xl font-cinematic font-bold text-white tracking-wide uppercase leading-none">
                {profileData.name}
              </h1>
              <div className="bg-red-600 p-1.5 rounded-xl shadow-xl">
                <Verified className="text-white" size={20} />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-6 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><Star size={14} className="text-accent fill-accent" /> 4.9 (42 REVIEWS)</span>
              <span className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full"><MapPin size={14} className="text-red-500" /> MUMBAI, INDIA</span>
              <span className="bg-red-600/10 text-red-500 px-4 py-2 rounded-full border border-red-600/20">ELITE TALENT</span>
            </div>
          </div>
          <div className="flex gap-4 pb-4">
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl transition-all shadow-3xl shadow-red-600/30 uppercase tracking-widest text-xs"
              >
                <Edit2 size={18} /> Edit Slate
              </button>
            ) : (
              <div className="flex gap-2">
                <button onClick={() => setIsEditing(false)} className="px-10 py-5 bg-green-600 hover:bg-green-700 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-xs flex items-center gap-2">
                  <Check size={18} /> Save
                </button>
                <button onClick={() => setIsEditing(false)} className="px-5 py-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl transition-all">
                  <X size={18} />
                </button>
              </div>
            )}
            <button className="p-5 bg-neutral-900 rounded-2xl border border-white/5 hover:bg-neutral-800 transition-colors shadow-xl">
              <Share2 size={24} className="text-neutral-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          {/* Bio Section */}
          <section className="bg-neutral-900 p-12 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-8">
            <h2 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Operational Bio</h2>
            {isEditing ? (
              <textarea 
                className="w-full bg-black/40 border border-white/10 rounded-3xl p-8 text-neutral-300 font-medium outline-none focus:ring-2 focus:ring-red-600 transition-all resize-none text-lg"
                value={profileData.bio}
                rows={5}
                onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
              />
            ) : (
              <p className="text-neutral-400 leading-relaxed text-xl font-medium italic">
                "{profileData.bio}"
              </p>
            )}
            <div className="flex flex-wrap gap-3 mt-6 pt-8 border-t border-white/5">
              {['Acting', 'Directing', 'Screenwriting', 'Method Acting', 'Horse Riding'].map(skill => (
                <span key={skill} className="px-5 py-3 bg-black border border-white/5 rounded-xl text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] hover:text-red-500 hover:border-red-600/30 transition-all cursor-default">
                  {skill}
                </span>
              ))}
            </div>
          </section>

          {/* Media Portfolio */}
          <section className="space-y-6">
            <div className="flex justify-between items-center px-4">
              <h2 className="text-3xl font-cinematic font-bold tracking-widest uppercase text-white">Media Showreel</h2>
              <button className="text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-600/20 px-4 py-2 rounded-full hover:bg-red-600 hover:text-white transition-all">Manage All</button>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {MOCK_MEDIA.map(media => (
                <div key={media.id} className="group relative aspect-video bg-neutral-900 rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-red-600/40 transition-all cursor-pointer shadow-3xl">
                  {media.thumbnail && <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-80 group-hover:grayscale-0 transition-all duration-700" />}
                  <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-black/90 via-transparent to-transparent">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.3em] mb-2">{media.type}</p>
                        <h4 className="font-bold text-xl text-white uppercase tracking-wide">{media.title}</h4>
                      </div>
                      <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-3xl shadow-red-600/40 transform scale-75 group-hover:scale-100 transition-transform duration-500">
                        {media.type === 'Video' ? <Play size={28} fill="white" className="ml-1" /> : <FileText size={28} />}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
          {/* Stats / Metadata */}
          <section className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-3xl space-y-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
              <Activity size={120} />
            </div>
            <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">Performance Analytics</h3>
            <div className="space-y-8">
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Completed Productions</span>
                <span className="text-4xl font-cinematic font-bold text-white">24</span>
              </div>
              <div className="flex justify-between items-end border-b border-white/5 pb-4">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Shortlist Probability</span>
                <span className="text-4xl font-cinematic font-bold text-green-500">85%</span>
              </div>
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Avg. Response Time</span>
                <span className="text-4xl font-cinematic font-bold text-blue-500">&lt; 2H</span>
              </div>
            </div>
          </section>

          {/* Availability */}
          <section className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-3xl flex items-center justify-center mx-auto border border-green-500/20 text-green-500">
              <CheckCircle2 size={32} />
            </div>
            <div>
              <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white mb-2">Availability</h3>
              <p className="text-green-500 text-sm font-black uppercase tracking-widest">Available for Immediate Hire</p>
              <p className="text-[10px] text-neutral-600 uppercase tracking-widest mt-2">Verified status: Active</p>
            </div>
            <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all border border-white/5">
              UPDATE SCHEDULE
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
