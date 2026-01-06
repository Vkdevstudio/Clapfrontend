
import React, { useState } from 'react';
import { MOCK_BOOKINGS } from '../constants';
import { 
  ShoppingCart, Truck, Package, CheckCircle, Clock, MapPin, 
  Search, Filter, ChevronRight, Zap, Radio, Globe, Activity,
  AlertTriangle, Phone, MoreVertical, CreditCard, ShieldCheck
} from 'lucide-react';

const ProcurementTracker: React.FC = () => {
  const [filter, setFilter] = useState('All');

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-blue-600 rounded-full shadow-[0_0_15px_#2563EB]" />
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Supply Chain Command • Unit Alpha</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            Procurement <br />
            <span className="text-neutral-500 tracking-normal font-sans text-3xl md:text-5xl">Control.</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <button className="px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:bg-neutral-200 transition-all active-scale">
              Market Discovery
           </button>
        </div>
      </header>

      {/* Supply Matrix Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
         {[
           { label: 'Asset Load', val: '24 Units', icon: <Package size={20}/>, color: 'text-blue-500' },
           { label: 'In Transit', val: '08 Units', icon: <Truck size={20}/>, color: 'text-orange-500' },
           { label: 'Expenditure', val: '₹14.2L', icon: <CreditCard size={20}/>, color: 'text-white' },
           { label: 'Uptime', val: '98%', icon: <Activity size={20}/>, color: 'text-green-500' }
         ].map((stat, i) => (
           <div key={i} className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-4 shadow-xl">
              <div className={`p-3 w-fit rounded-xl bg-black/40 ${stat.color}`}>
                 {stat.icon}
              </div>
              <div>
                 <p className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">{stat.label}</p>
                 <p className="text-3xl font-cinematic font-bold text-white tracking-widest">{stat.val}</p>
              </div>
           </div>
         ))}
      </section>

      {/* Supply Chain Timeline */}
      <div className="grid lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center px-2">
               <h3 className="text-[11px] font-black text-neutral-700 uppercase tracking-[0.5em]">Live Deployment Ledger</h3>
               <div className="flex gap-2">
                  {['All', 'In Transit', 'Delivered'].map(t => (
                    <button key={t} onClick={() => setFilter(t)} className={`px-4 py-2 rounded-lg text-[8px] font-black uppercase tracking-widest border transition-all ${filter === t ? 'bg-blue-600 text-white' : 'bg-neutral-900 text-neutral-500'}`}>{t}</button>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               {MOCK_BOOKINGS.map(booking => (
                 <div key={booking.id} className="bg-neutral-900 border border-white/5 rounded-[2.5rem] p-8 hover:border-blue-600/30 transition-all shadow-2xl relative overflow-hidden group">
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between relative z-10">
                       <div className="flex items-center gap-6 md:w-1/3">
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border transition-all ${
                            booking.transitStatus === 'In Transit' ? 'bg-orange-600/10 border-orange-500 text-orange-500' : 'bg-green-600/10 border-green-500 text-green-500'
                          }`}>
                             {booking.transitStatus === 'In Transit' ? <Truck size={24}/> : <CheckCircle size={24}/>}
                          </div>
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{booking.category}</p>
                             <h4 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest group-hover:text-blue-500 transition-colors leading-none">{booking.vendorName}</h4>
                             <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-tight">Period: {booking.duration}</p>
                          </div>
                       </div>

                       <div className="flex-1 grid grid-cols-2 gap-8 border-l border-white/5 pl-8">
                          <div className="space-y-1">
                             <div className="flex items-center gap-2 text-neutral-600">
                                <Clock size={12}/>
                                <span className="text-[8px] font-black uppercase tracking-widest">Status Logic</span>
                             </div>
                             <p className={`text-[11px] font-bold uppercase tracking-tight ${booking.transitStatus === 'In Transit' ? 'text-orange-500' : 'text-green-500'}`}>
                                {booking.transitStatus}
                             </p>
                          </div>
                          <div className="space-y-1">
                             <div className="flex items-center gap-2 text-neutral-600">
                                <MapPin size={12}/>
                                <span className="text-[8px] font-black uppercase tracking-widest">Dispatch Node</span>
                             </div>
                             <p className="text-[11px] font-bold text-white uppercase tracking-tight">Main Basecamp</p>
                          </div>
                       </div>

                       <div className="flex gap-2">
                          <button className="p-3 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-all"><Radio size={16}/></button>
                          <button className="p-3 bg-neutral-800 rounded-xl text-neutral-500 hover:text-white transition-all"><MoreVertical size={16}/></button>
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </div>

         <aside className="lg:col-span-4 space-y-6">
            <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <Globe size={200} />
               </div>
               <div className="flex items-center gap-4 text-blue-500 relative z-10">
                  <ShieldCheck size={24} />
                  <h4 className="text-xl md:text-2xl font-cinematic font-bold tracking-widest uppercase">Handoff Security</h4>
               </div>
               <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic relative z-10">
                 "Dispatch units from ARRI Rentals are currently in sector 4. Ensure the Unit Lead is available for digital QR handoff."
               </p>
               <button className="w-full py-4 bg-blue-600 text-white font-black rounded-xl text-[9px] uppercase tracking-[0.3em] shadow-xl relative z-10">
                  Verify Node Access
               </button>
            </section>

            <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
               <h4 className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Environmental Risk</h4>
               <div className="p-6 bg-red-600/5 border border-red-600/10 rounded-2xl space-y-4">
                  <div className="flex items-center gap-3 text-red-500">
                     <AlertTriangle size={18}/>
                     <span className="text-[10px] font-black uppercase tracking-widest">Delay Warning</span>
                  </div>
                  <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-widest italic">Rain expected in Sector 4. Electronics dispatch might require moisture housing.</p>
               </div>
            </section>
         </aside>
      </div>
    </div>
  );
};

export default ProcurementTracker;
