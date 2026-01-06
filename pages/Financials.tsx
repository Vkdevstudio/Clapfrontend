
import React, { useState } from 'react';
import { 
  ShieldCheck, ArrowUpRight, DollarSign, Lock, Unlock, Clock, 
  Search, Download, Filter, TrendingUp, Building2, Receipt,
  BarChart3, PieChart, FileText
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_BOOKINGS } from '../constants';
import { Booking } from '../types';

const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'escrow' | 'history' | 'budget'>('escrow');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const project = MOCK_PROJECTS[0];

  const handleReleaseEscrow = (id: string) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, paymentStatus: 'Released' as any } : b
    ));
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-28 md:pb-20 max-w-7xl mx-auto px-0 md:px-4">
      
      {/* HEADER */}
      <header className="flex flex-col gap-6 px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-red-500">
               <ShieldCheck size={20} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Treasury v4.2</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Financials</h1>
          </div>
          
          <div className="flex gap-3">
             <button className="flex-1 md:flex-none p-5 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-400">
               <Download size={20} />
             </button>
             <button className="flex-[3] md:flex-none bg-white px-10 py-5 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl">
               <Receipt size={18} className="inline mr-2" /> AUDIT REPORT
             </button>
          </div>
        </div>
      </header>

      {/* TAB SELECTOR */}
      <div className="flex w-full md:w-auto bg-neutral-900 border border-white/5 rounded-2xl p-1 shadow-xl mx-4 md:mx-0">
         {[
           { id: 'escrow', label: 'Active Escrow' },
           { id: 'history', label: 'Payment Ledger' },
           { id: 'budget', label: 'Budget vs Actual' }
         ].map(tab => (
           <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 md:flex-none px-8 py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
              activeTab === tab.id ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500 hover:text-white'
            }`}
           >
             {tab.label}
           </button>
         ))}
      </div>

      {/* CONTENT ENGINE */}
      <div className="px-4 md:px-0">
        {activeTab === 'budget' ? (
          /* BUDGET VS ACTUAL VIEW */
          <div className="space-y-6 animate-in slide-in-from-right-4 duration-500">
             <section className="bg-neutral-900 border border-white/5 rounded-[3rem] p-10 space-y-10 shadow-3xl">
                <div className="flex items-center justify-between border-b border-white/5 pb-8">
                   <div className="space-y-1">
                      <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">Slate Burn Rate</h3>
                      <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Project: {project.title}</p>
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-neutral-700 uppercase">Total Variance</p>
                      <p className="text-3xl font-cinematic font-bold text-red-500">(-₹42,500)</p>
                   </div>
                </div>

                <div className="space-y-8">
                   {Object.entries(project.budgetedAmounts || {}).map(([dept, budgeted]) => {
                     const actual = (budgeted as number) * (dept === 'Cast' ? 1.05 : 0.9); // Simulated variance
                     const percent = (actual / (budgeted as number)) * 100;
                     return (
                       <div key={dept} className="space-y-3">
                          <div className="flex justify-between items-end">
                             <div className="space-y-1">
                                <p className="text-[10px] font-black text-white uppercase tracking-widest">{dept} Unit</p>
                                <p className="text-[8px] font-bold text-neutral-600 uppercase tracking-tighter">Budgeted: ₹{budgeted.toLocaleString()}</p>
                             </div>
                             <div className="text-right">
                                <p className="text-xl font-cinematic font-bold text-white tracking-widest">₹{actual.toLocaleString()}</p>
                                <p className={`text-[8px] font-black uppercase ${actual > (budgeted as number) ? 'text-red-500' : 'text-green-500'}`}>
                                   {actual > (budgeted as number) ? 'Overrun' : 'Under Budget'}
                                </p>
                             </div>
                          </div>
                          <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                             <div 
                              className={`h-full transition-all duration-1000 ${actual > (budgeted as number) ? 'bg-red-600' : 'bg-green-600'}`} 
                              style={{ width: `${Math.min(percent, 100)}%` }} 
                             />
                          </div>
                       </div>
                     );
                   })}
                </div>
             </section>
          </div>
        ) : (
          /* STANDARD LEDGER VIEW */
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div key={booking.id} className="group bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] md:rounded-[3rem] transition-all hover:border-red-600/20 shadow-xl relative overflow-hidden">
                 <div className="flex flex-col lg:flex-row gap-8 lg:items-center relative z-10">
                    <div className="flex items-center gap-6 lg:w-1/4">
                       <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border transition-all ${
                         booking.paymentStatus === 'Released' ? 'bg-green-600/10 border-green-500 text-green-500' : 'bg-red-600/10 border-red-500 text-red-500'
                       }`}>
                          {booking.paymentStatus === 'Released' ? <Unlock size={24} /> : <Lock size={24} />}
                       </div>
                       <div className="space-y-1">
                          <p className="text-2xl font-cinematic font-bold text-white tracking-widest uppercase truncate leading-none">{booking.projectName}</p>
                          <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{booking.vendorName}</p>
                       </div>
                    </div>
                    
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-8">
                       <div className="space-y-1">
                          <p className="text-[8px] font-black text-neutral-700 uppercase">Audit Cycle</p>
                          <p className="text-sm font-bold text-white uppercase tabular-nums">{booking.date}</p>
                       </div>
                       <div className="space-y-1">
                          <p className="text-[8px] font-black text-neutral-700 uppercase">Status Logic</p>
                          <span className={`text-[9px] font-black uppercase ${booking.paymentStatus === 'Released' ? 'text-green-500' : 'text-red-500 animate-pulse'}`}>
                             {booking.paymentStatus === 'Released' ? 'Funds Cleared' : 'Secured Escrow'}
                          </span>
                       </div>
                    </div>

                    <div className="flex items-center justify-between lg:justify-end gap-10 border-t lg:border-none border-white/5 pt-6 lg:pt-0">
                       <div className="text-left lg:text-right">
                          <p className="text-[8px] font-black text-neutral-700 uppercase mb-0.5">Amount Net</p>
                          <p className="text-3xl font-cinematic font-bold text-white tracking-widest leading-none">{booking.amount}</p>
                       </div>
                       {booking.paymentStatus !== 'Released' && (
                         <button 
                          onClick={() => handleReleaseEscrow(booking.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active-scale"
                         >
                            RELEASE
                         </button>
                       )}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Financials;
