
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_SERVICES } from '../constants';
import { ChevronLeft, MapPin, Star, Clock, ShieldCheck, Zap, ArrowRight, CheckCircle, Package, Info, Calendar } from 'lucide-react';

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isBooked, setIsBooked] = useState(false);
  const service = MOCK_SERVICES.find(s => s.id === id) || MOCK_SERVICES[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20 max-w-6xl mx-auto">
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
                 <span className="bg-green-500/10 text-green-500 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-green-500/20">VERIFIED VENDOR</span>
              </div>
              <h1 className="text-6xl font-cinematic font-bold tracking-tighter text-white uppercase">{service.name}</h1>
              <div className="flex flex-wrap gap-8 text-sm text-neutral-400 font-bold uppercase tracking-widest">
                 <span className="flex items-center gap-2"><MapPin size={18} className="text-red-500" /> Goregaon, Mumbai</span>
                 <span className="flex items-center gap-2"><Star size={18} className="text-accent fill-accent" /> 4.9 Rating</span>
                 <span className="flex items-center gap-2"><Clock size={18} className="text-blue-500" /> 24h Response</span>
              </div>
           </header>

           <section className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
              <div className="space-y-4">
                 <h3 className="text-2xl font-cinematic font-bold tracking-widest text-white uppercase">Technical Specs & Overview</h3>
                 <p className="text-neutral-400 leading-relaxed text-lg font-medium">{service.description}</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                 {[
                    'Daily Maintenance Included',
                    '2 Technical Assistants Provided',
                    'Insurance Coverage Ready',
                    'Logistics Unit A Support'
                 ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-3 text-neutral-300 font-medium bg-black/40 p-5 rounded-2xl border border-white/5">
                       <CheckCircle size={20} className="text-red-500" />
                       {feat}
                    </div>
                 ))}
              </div>

              <div className="p-8 bg-blue-500/5 border border-blue-500/10 rounded-3xl space-y-4">
                 <div className="flex items-center gap-2 text-blue-500">
                    <Info size={18} />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Genie Logistic Note</span>
                 </div>
                 <p className="text-sm text-neutral-400 font-medium italic">"This vendor has a 100% on-set delivery record for Goregaon-based productions in the last 6 months."</p>
              </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-8">
           <div className="bg-neutral-900 border border-white/5 rounded-[3rem] overflow-hidden shadow-3xl">
              <div className="p-10 space-y-8">
                 <div className="space-y-2">
                    <p className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">SERVICE RENTAL RATE</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-6xl font-cinematic font-bold text-white tracking-wider">{service.price}</p>
                       <p className="text-xl font-cinematic text-neutral-600 font-bold uppercase">/{service.unit}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    {!isBooked ? (
                      <button 
                        onClick={() => setIsBooked(true)}
                        className="w-full py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-2xl shadow-3xl shadow-red-600/30 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                      >
                         <Zap size={18} /> REQUEST BOOKING
                      </button>
                    ) : (
                      <div className="w-full py-5 bg-green-500/10 border border-green-500/20 text-green-500 font-black rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                         <CheckCircle size={18} /> REQUEST SENT
                      </div>
                    )}
                    <button className="w-full py-4 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-2xl flex items-center justify-center gap-3 text-[10px] uppercase tracking-[0.2em] border border-white/5">
                       <Calendar size={16} /> CHECK CALENDAR
                    </button>
                 </div>

                 <div className="pt-8 border-t border-white/5 space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Logistics Lead</span>
                       <span className="text-xs font-bold text-white">4h Delivery Window</span>
                    </div>
                    <div className="flex items-center justify-between">
                       <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Security Deposit</span>
                       <span className="text-xs font-bold text-white">Not Required</span>
                    </div>
                 </div>
              </div>
           </div>

           <section className="bg-neutral-900 border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                 <ShieldCheck size={80} />
              </div>
              <h4 className="text-xl font-cinematic font-bold tracking-wide mb-6 uppercase text-white">Trust Assurance</h4>
              <p className="text-neutral-500 text-xs leading-relaxed font-medium mb-8">Every vendor on CLAP undergoes a 3-step technical and legal verification. Payments are held in secure escrow until production wrap.</p>
              <button className="w-full py-3 bg-black border border-white/5 text-[10px] font-bold text-neutral-400 hover:text-white uppercase tracking-widest rounded-xl transition-all">
                 VERIFICATION DOCS
              </button>
           </section>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
