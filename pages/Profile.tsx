import React, { useState } from 'react';
import { 
  Star, MapPin, Share2, Edit2, Play, FileText, Verified, Check, X, 
  Activity, CheckCircle2, Award, Sparkles, 
  Layout, MessageSquareQuote, Shield, Lock, EyeOff, Info,
  /* Added Users to import from lucide-react to avoid local declaration conflict if needed, 
     although it wasn't imported before, it's cleaner to use the library version */
  Users
} from 'lucide-react';
import { MOCK_MEDIA } from '../constants.tsx';
import Select from '../components/Select.tsx';

const Profile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Vinod Director',
    bio: 'Award-winning actor and director with 10+ years of experience in regional and international cinema. Specialized in psychological thrillers and period dramas. Fluent in Hindi, Marathi, and English.',
    ageRange: '25-35',
    gender: 'Male',
    height: "5'11\""
  });

  const [privacy, setPrivacy] = useState({
    showContact: false,
    publicLocation: true,
    genieMatch: true
  });

  const completeness = 85;

  const reviews = [
    { name: 'Rajesh Kumar', role: 'Director', text: 'Incredible discipline on set. Delivered the alleyway stickup scene in just 3 takes. Highly recommended for intense roles.', rating: 5 },
    { name: 'Sonia Ray', role: 'DP', text: 'Great understanding of lighting and frame boundaries. Very patient during technical resets.', rating: 5 }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-7xl mx-auto pb-32 px-4 md:px-0">
      
      {/* Completeness Tracker */}
      <div className="bg-neutral-900 border border-white/5 p-6 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center text-accent border border-accent/20">
               <Sparkles size={28} className="animate-pulse" />
            </div>
            <div className="space-y-1">
               <p className="text-[10px] font-black text-accent uppercase tracking-widest leading-none">Profile Calibrated</p>
               <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest leading-none">{completeness}% Complete</h3>
            </div>
         </div>
         <div className="flex-1 max-w-xl h-2 bg-black rounded-full overflow-hidden mx-4">
            <div className="h-full bg-accent shadow-[0_0_15px_rgba(251,191,36,0.5)] transition-all duration-1000" style={{ width: `${completeness}%` }} />
         </div>
         <button className="px-8 py-3.5 bg-accent text-black font-black rounded-xl text-[10px] uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
            FILL SLATE
         </button>
      </div>

      {/* Profile Header */}
      <div className="relative rounded-[3.5rem] md:rounded-[4.5rem] overflow-hidden shadow-3xl">
        <div className="h-48 md:h-96 bg-gradient-to-r from-red-900 to-black relative">
          <img 
            src="https://images.unsplash.com/photo-1542204172-3c1f11c56ef4?auto=format&fit=crop&q=80&w=1200" 
            alt="Cover" 
            className="w-full h-full object-cover opacity-40 mix-blend-overlay grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
        </div>
        <div className="px-6 md:px-16 pb-12 -mt-24 md:-mt-32 relative z-10 flex flex-col md:flex-row items-end gap-10">
          <div className="relative group">
            <div className="w-48 h-48 md:w-64 md:h-64 rounded-[3rem] md:rounded-[4rem] border-8 border-neutral-950 bg-neutral-900 overflow-hidden shadow-3xl transform hover:scale-[1.02] transition-transform duration-500">
              <img src="https://picsum.photos/seed/user1/400" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <button className="absolute bottom-4 right-4 p-4 bg-red-600 rounded-2xl shadow-xl hover:scale-110 transition-all border-4 border-neutral-950">
               <Edit2 size={16} />
            </button>
          </div>
          <div className="flex-1 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <h1 className="text-5xl md:text-8xl font-cinematic font-bold text-white tracking-wide uppercase leading-none">
                {profileData.name}
              </h1>
              <div className="bg-red-600 p-2 md:p-3 rounded-2xl shadow-2xl shadow-red-600/40 transform -rotate-3">
                <Verified className="text-white w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10"><Star size={14} className="text-accent fill-accent" /> 4.9 (42 PROJECTS)</span>
              <span className="flex items-center gap-2 bg-white/5 px-5 py-2.5 rounded-full border border-white/10"><MapPin size={14} className="text-red-500" /> MUMBAI, IN</span>
              <span className="bg-accent/10 text-accent px-5 py-2.5 rounded-full border border-accent/20 flex items-center gap-2"><Award size={14} /> ELITE SLATE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
          
          {/* Castability Details (Feature 1) */}
          <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 shadow-2xl">
             {[
                { label: 'Age Range', val: profileData.ageRange, icon: <Activity size={14}/> },
                { label: 'Gender', val: profileData.gender, icon: <Users size={14}/> },
                { label: 'Height', val: profileData.height, icon: <Layout size={14}/> },
                { label: 'Specialty', val: 'Method Lead', icon: <Star size={14}/> }
             ].map(stat => (
               <div key={stat.label} className="space-y-2">
                  <div className="flex items-center gap-2 text-neutral-600">
                     {stat.icon}
                     <span className="text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <p className="text-xl font-cinematic font-bold text-white uppercase tracking-widest">{stat.val}</p>
               </div>
             ))}
          </section>

          <section className="bg-neutral-900 p-10 md:p-14 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-10 relative overflow-hidden">
            <h2 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase flex items-center gap-3">
               <Activity size={20} className="text-red-500" /> Operational Bio
            </h2>
            <p className="text-neutral-400 leading-relaxed text-xl font-medium italic relative z-10">"{profileData.bio}"</p>
          </section>

          {/* Media Portfolio Hierarchy (Feature 1) */}
          <section className="space-y-8">
             <div className="flex justify-between items-center px-4">
                <h2 className="text-3xl font-cinematic font-bold tracking-widest uppercase text-white">Verified Showreel</h2>
                <div className="flex gap-2">
                   <span className="px-3 py-1 bg-red-600/10 border border-red-600/20 text-red-500 text-[8px] font-black rounded-full uppercase tracking-widest">Headline Asset active</span>
                </div>
             </div>
             
             {/* Headline Media */}
             <div className="group relative aspect-video bg-neutral-900 rounded-[3.5rem] overflow-hidden border-2 border-red-600/40 shadow-3xl cursor-pointer">
                <img src={MOCK_MEDIA[0].thumbnail} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                <div className="absolute top-8 left-8">
                   <span className="px-4 py-1.5 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl">PRIMARY HEADLINE</span>
                </div>
                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                   <div>
                      <h4 className="text-3xl font-cinematic font-bold text-white tracking-widest uppercase">{MOCK_MEDIA[0].title}</h4>
                      <p className="text-xs text-neutral-400 font-medium uppercase tracking-widest">Featured Performance 2024</p>
                   </div>
                   <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center text-white shadow-3xl">
                      <Play size={28} fill="white" className="ml-1" />
                   </div>
                </div>
             </div>

             <div className="grid sm:grid-cols-2 gap-8">
                {MOCK_MEDIA.slice(1).map(media => (
                  <div key={media.id} className="group relative aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/5 hover:border-red-600/40 transition-all cursor-pointer shadow-3xl">
                    {media.thumbnail && <img src={media.thumbnail} alt={media.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105" />}
                    <div className="absolute inset-0 flex flex-col justify-end p-10 bg-gradient-to-t from-black/95 via-black/20 to-transparent">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-[10px] text-red-500 font-black uppercase tracking-[0.4em] mb-1 leading-none">{media.type}</p>
                          <h4 className="font-bold text-2xl text-white uppercase tracking-tight leading-none">{media.title}</h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
             </div>
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10">
          
          {/* Privacy & Safety Commands (Feature 8) */}
          <section className="bg-neutral-900 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-3xl space-y-8">
             <div className="flex items-center gap-3 text-red-500">
                <Shield size={20} />
                <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">Trust & Safety</h3>
             </div>
             
             <div className="space-y-6">
                {[
                   { id: 'showContact', label: 'Hidden Contact Info', icon: <EyeOff size={16}/>, state: privacy.showContact, toggle: () => setPrivacy({...privacy, showContact: !privacy.showContact}) },
                   { id: 'publicLoc', label: 'Anonymized Hub Location', icon: <MapPin size={16}/>, state: !privacy.publicLocation, toggle: () => setPrivacy({...privacy, publicLocation: !privacy.publicLocation}) },
                   { id: 'genie', label: 'Stealth Discovery', icon: <Lock size={16}/>, state: !privacy.genieMatch, toggle: () => setPrivacy({...privacy, genieMatch: !privacy.genieMatch}) }
                ].map(p => (
                  <button 
                    key={p.id}
                    onClick={p.toggle}
                    className="w-full flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-2xl group hover:border-red-600/30 transition-all"
                  >
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${p.state ? 'text-red-500 bg-red-600/10' : 'text-neutral-700 bg-neutral-800'}`}>
                           {p.icon}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 group-hover:text-white transition-colors">{p.label}</span>
                     </div>
                     <div className={`w-10 h-5 rounded-full relative transition-colors ${p.state ? 'bg-red-600' : 'bg-neutral-800'}`}>
                        <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${p.state ? 'left-6' : 'left-1'}`} />
                     </div>
                  </button>
                ))}
             </div>
             
             <div className="p-5 bg-blue-600/5 border border-blue-600/10 rounded-2xl flex items-start gap-4">
                <Info size={16} className="text-blue-500 mt-0.5 shrink-0" />
                <p className="text-[9px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest">
                   Stealth mode prevents unverified productions from accessing your contact data until a manual handshake is logged.
                </p>
             </div>
          </section>

          {/* Availability Calendar Mock */}
          <section className="bg-neutral-900 p-10 rounded-[3.5rem] border border-white/5 shadow-3xl space-y-10 text-center relative overflow-hidden group">
             <div className="flex items-center justify-between text-left">
                <h3 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">Shoot Readiness</h3>
                <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full text-[8px] font-black uppercase">Syncing</div>
             </div>
             
             <div className="grid grid-cols-7 gap-2">
                {['M','T','W','T','F','S','S'].map((d, i) => (
                  <div key={i} className="text-[9px] font-black text-neutral-700 uppercase mb-2">{d}</div>
                ))}
                {[...Array(28)].map((_, i) => (
                  <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-bold transition-all border ${
                    i > 10 && i < 18 ? 'bg-red-600/20 border-red-600 text-red-500' : 'bg-black/40 border-white/5 text-neutral-500'
                  }`}>
                    {i + 1}
                  </div>
                ))}
             </div>

             <button className="w-full py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.3em] transition-all border border-white/5 shadow-xl">
                UPDATE SCHEDULE
             </button>
          </section>

          {/* Review Ledger Section */}
          <section className="bg-neutral-900 p-8 md:p-10 rounded-[3rem] border border-white/5 shadow-2xl space-y-8">
             <h2 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white flex items-center gap-3">
                <MessageSquareQuote size={20} className="text-accent" /> Set Etiquette
             </h2>
             <div className="space-y-4">
                {reviews.map((rev, i) => (
                  <div key={i} className="p-6 bg-black/40 border border-white/5 rounded-[2rem] space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-[11px] uppercase tracking-tight">{rev.name}</span>
                        <div className="flex gap-0.5 text-accent"><Star size={8} fill="currentColor" /><Star size={8} fill="currentColor" /><Star size={8} fill="currentColor" /><Star size={8} fill="currentColor" /><Star size={8} fill="currentColor" /></div>
                     </div>
                     <p className="text-neutral-500 text-[10px] italic leading-relaxed">"{rev.text}"</p>
                  </div>
                ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

/* Fixed: Removed local declarations of Edit2 and Verified as they conflict with imports from lucide-react. 
   Also using library version of Users for consistency. */

export default Profile;