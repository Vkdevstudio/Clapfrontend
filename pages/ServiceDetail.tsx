
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SERVICES } from '../constants';
import { ChevronLeft, MapPin, Star, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle, Package, Info, Calendar, Share2, Award, UserCheck, MessageSquare } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const service = MOCK_SERVICES.find(s => s.id === id) || MOCK_SERVICES[0];

  const reviews = [
    { name: 'Amit V.', role: 'Director', rating: 5, comment: 'Perfect condition. The technical support was exceptional during our night shoot.' },
    { name: 'Priya K.', role: 'Producer', rating: 5, comment: 'Punctual delivery and clear communication. Will book again.' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-7xl mx-auto">
      <button 
        onClick={() => navigate('/discover')}
        className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors group mb-4"
      >
        <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Discover</span>
      </button>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-10">
           <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                 <span className="bg-red-600/10 text-red-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-red-600/20">{service.category}</span>
                 <span className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20 flex items-center gap-2">
                   <UserCheck size={12} /> VERIFIED VENDOR
                 </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">{service.name}</h1>
              <div className="flex flex-wrap gap-8 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                 <span className="flex items-center gap-2"><MapPin size={18} className="text-red-500" /> Goregaon, Mumbai</span>
                 <span className="flex items-center gap-2"><Star size={18} className="text-accent fill-accent" /> 4.9 Rating</span>
                 <span className="flex items-center gap-2"><Clock size={18} className="text-blue-500" /> 24h Response</span>
              </div>
           </header>

           <div className="aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-3xl bg-neutral-900 group relative">
              <img src={service.image} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 flex gap-4">
                 {service.specs?.map(spec => (
                   <span key={spec} className="bg-black/60 backdrop-blur-xl border border-white/10 px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white">
                      {spec}
                   </span>
                 ))}
              </div>
           </div>

           <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-12 space-y-10 shadow-2xl">
              <div className="space-y-6">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase border-b border-white/5 pb-4">Service Blueprint</h3>
                 <p className="text-neutral-400 leading-relaxed text-xl font-medium">{service.description}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                    { label: 'Technical Ops', desc: '2 Technical Assistants Provided', icon: <Award size={20} /> },
                    { label: 'Insurance', desc: 'Full Coverage PPA-Ready', icon: <ShieldCheck size={20} /> },
                    { label: 'Maintenance', desc: 'Daily On-Set Servicing', icon: <Zap size={20} /> },
                    { label: 'Delivery', desc: 'Logistics Unit B support', icon: <Package size={20} /> }
                 ].map((feat, i) => (
                    <div key={i} className="flex items-start gap-4 text-neutral-300 font-medium bg-black/40 p-6 rounded-3xl border border-white/5 group hover:border-red-600/30 transition-all">
                       <div className="text-red-500 mt-1">{feat.icon}</div>
                       <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500 mb-1">{feat.label}</p>
                          <p className="text-sm font-bold text-white uppercase tracking-wide">{feat.desc}</p>
                       </div>
                    </div>
                 ))}
              </div>
           </section>

           <section className="space-y-6">
              <div className="flex justify-between items-center px-4">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest uppercase text-white">Verified Reviews</h3>
                 <span className="text-[10px] font-black text-neutral-600 uppercase tracking-widest">Based on 42 bookings</span>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                 {reviews.map((rev, i) => (
                   <div key={i} className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-4 shadow-xl">
                      <div className="flex justify-between items-center">
                         <div className="flex items-center gap-2">
                            <div className="flex gap-1">
                               {[...Array(5)].map((_, i) => <Star key={i} size={12} className="text-accent fill-accent" />)}
                            </div>
                         </div>
                         <span className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Verified Booking</span>
                      </div>
                      <p className="text-sm text-neutral-400 italic leading-relaxed font-medium">"{rev.comment}"</p>
                      <div className="flex items-center gap-3 pt-4">
                         <div className="w-10 h-10 rounded-xl bg-neutral-800" />
                         <div>
                            <p className="text-xs font-bold text-white uppercase tracking-widest">{rev.name}</p>
                            <p className="text-[9px] text-neutral-600 font-black uppercase tracking-widest">{rev.role}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-neutral-900 border border-white/5 rounded-[3.5rem] overflow-hidden shadow-3xl sticky top-32">
              <div className="p-10 space-y-10">
                 <div className="space-y-3">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">RENTAL RATE</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-7xl font-cinematic font-bold text-white tracking-wider leading-none">{service.price}</p>
                       <p className="text-xl font-cinematic text-neutral-600 font-bold uppercase">/{service.unit}</p>
                    </div>
                 </div>

                 <div className="bg-black/40 border border-white/10 rounded-3xl p-6 space-y-4">
                    <div className="flex items-center gap-3">
                       <div className="w-12 h-12 rounded-2xl bg-neutral-800 flex items-center justify-center text-red-500 border border-white/5">
                          <Package size={24} />
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Vendor</p>
                          <p className="text-sm font-black text-white uppercase tracking-widest">ARRI RENTALS LTD.</p>
                       </div>
                    </div>
                    <button className="w-full py-3 bg-neutral-900 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all flex items-center justify-center gap-2">
                       <ArrowRight size={14} /> VIEW VENDOR CATALOG
                    </button>
                 </div>

                 <div className="space-y-4">
                    {!isBooked ? (
                      <button 
                        onClick={() => setIsBooked(true)}
                        className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[11px] active-scale"
                      >
                         <Zap size={20} /> INITIALIZE BOOKING
                      </button>
                    ) : (
                      <div className="w-full py-6 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-3xl flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-[11px] animate-in bounce-in">
                         <CheckCircle size={20} /> REQUEST SENT
                      </div>
                    )}
                    <div className="flex gap-4">
                       <button className="flex-1 py-5 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] border border-white/5">
                          <Calendar size={18} /> SCHEDULE
                       </button>
                       <button className="p-5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-2xl border border-white/5">
                          <MessageSquare size={20} />
                       </button>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Escrow Activation</span>
                       <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">READY</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Logistics Hub</span>
                       <span className="text-[9px] font-black text-white uppercase tracking-widest">MUMBAI UNIT B</span>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
