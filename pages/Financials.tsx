
import React, { useState } from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileText, 
  MoreVertical, 
  TrendingUp, 
  DollarSign,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  ChevronRight,
  Search,
  Download,
  Filter
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_BOOKINGS } from '../constants';
import { Booking } from '../types';

const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'ledger' | 'escrow'>('overview');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);

  const handleReleaseEscrow = (id: string) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, paymentStatus: 'Released' as any } : b
    ));
  };

  const stats = [
    { label: 'Total Slate Budget', val: '₹4,50,00,000', icon: <TrendingUp size={20}/>, color: 'text-white' },
    { label: 'In Active Escrow', val: '₹12,45,000', icon: <Lock size={20}/>, color: 'text-red-500' },
    { label: 'Released to Date', val: '₹1,25,00,000', icon: <Unlock size={20}/>, color: 'text-green-500' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-red-500 mb-2">
             <ShieldCheck size={24} />
             <span className="text-[10px] font-black uppercase tracking-[0.4em]">The Treasury v4.2</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-cinematic font-bold tracking-tighter text-white uppercase leading-none">Financials</h1>
          <p className="text-neutral-500 text-lg font-medium">Secured Escrow & Production Disbursement Logic.</p>
        </div>
        <div className="flex gap-4">
           <button className="p-5 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-400 hover:text-white transition-all shadow-xl">
             <Download size={24} />
           </button>
           <button className="bg-white px-8 py-5 rounded-2xl text-black font-black text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center gap-3 active-scale">
             <FileText size={18} /> Export Tax Report
           </button>
        </div>
      </header>

      {/* Top Level Summary */}
      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] space-y-6 group hover:border-white/20 transition-all shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                <DollarSign size={150} />
             </div>
             <div className="flex justify-between items-start relative z-10">
                <div className={`p-4 rounded-2xl bg-black/40 border border-white/5 ${stat.color}`}>
                   {stat.icon}
                </div>
                <div className="flex flex-col items-end">
                   <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Platform Status</span>
                   <span className="text-[9px] font-black text-green-500 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle2 size={10} /> Verified
                   </span>
                </div>
             </div>
             <div className="relative z-10">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest mb-1">{stat.label}</p>
                <p className={`text-4xl font-cinematic font-bold tracking-widest ${stat.color}`}>{stat.val}</p>
             </div>
             <div className="h-1 w-full bg-black rounded-full overflow-hidden relative z-10">
                <div className={`h-full transition-all duration-1000 ${stat.color === 'text-red-500' ? 'bg-red-600' : 'bg-green-600'}`} style={{ width: i === 1 ? '45%' : '75%' }} />
             </div>
          </div>
        ))}
      </div>

      {/* Main Financial Workspace */}
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-12 space-y-8">
           <div className="flex flex-col md:flex-row justify-between items-center gap-6 px-4">
              <div className="flex bg-neutral-900 border border-white/5 rounded-2xl p-1.5 shadow-xl">
                 {[
                   { id: 'overview', label: 'Escrow Queue' },
                   { id: 'ledger', label: 'History' },
                   { id: 'ledger-all', label: 'Analytics' }
                 ].map(tab => (
                   <button 
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      activeTab === tab.id ? 'bg-red-600 text-white' : 'text-neutral-500 hover:text-white'
                    }`}
                   >
                     {tab.label}
                   </button>
                 ))}
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                 <div className="relative flex-1 md:w-64">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600" size={16} />
                    <input 
                      type="text" 
                      placeholder="Search transactions..."
                      className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[11px] font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                 </div>
                 <button className="p-4 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-500 hover:text-white">
                    <Filter size={20} />
                 </button>
              </div>
           </div>

           <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] group hover:border-white/20 transition-all shadow-xl">
                   <div className="flex flex-col md:flex-row gap-8 md:items-center">
                      <div className="flex items-center gap-6">
                         <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-2xl font-cinematic font-bold border transition-all ${
                           booking.paymentStatus === 'Released' ? 'bg-green-600/10 border-green-500/20 text-green-500' : 'bg-red-600/10 border-red-600/20 text-red-500'
                         }`}>
                            {booking.paymentStatus === 'Released' ? <Unlock size={24} /> : <Lock size={24} />}
                         </div>
                         <div>
                            <p className="text-[11px] font-black text-white uppercase tracking-widest mb-1">{booking.projectName}</p>
                            <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{booking.vendorName} • {booking.duration}</p>
                         </div>
                      </div>
                      
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                         <div>
                            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Status</p>
                            <div className="flex items-center gap-2">
                               <div className={`w-2 h-2 rounded-full ${booking.paymentStatus === 'Released' ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`} />
                               <span className={`text-[10px] font-black uppercase tracking-widest ${booking.paymentStatus === 'Released' ? 'text-green-500' : 'text-red-500'}`}>
                                  {booking.paymentStatus}
                               </span>
                            </div>
                         </div>
                         <div>
                            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Reference ID</p>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">TRX-9428-XJ</span>
                         </div>
                         <div className="hidden md:block">
                            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Disbursement</p>
                            <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{booking.date}</span>
                         </div>
                      </div>

                      <div className="flex items-center gap-8">
                         <div className="text-right">
                            <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest mb-1">Amount</p>
                            <p className="text-2xl font-cinematic font-bold text-white tracking-widest">{booking.amount}</p>
                         </div>
                         {booking.paymentStatus !== 'Released' ? (
                           <button 
                            onClick={() => handleReleaseEscrow(booking.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl shadow-red-600/30 active-scale"
                           >
                              RELEASE FUNDS
                           </button>
                         ) : (
                           <button className="p-4 bg-neutral-800 text-neutral-400 hover:text-white rounded-2xl transition-all">
                              <Download size={18} />
                           </button>
                         )}
                         <button className="p-4 bg-black/40 rounded-2xl text-neutral-600 hover:text-white transition-all">
                            <MoreVertical size={18} />
                         </button>
                      </div>
                   </div>
                </div>
              ))}

              <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[4rem] bg-black/20 space-y-6">
                 <div className="w-20 h-20 bg-neutral-900 rounded-[2rem] flex items-center justify-center mx-auto text-neutral-700 border border-white/5">
                    <Clock size={40} />
                 </div>
                 <div className="space-y-2">
                    <p className="text-lg font-cinematic font-bold text-white tracking-widest uppercase">No Further Pending Escrows</p>
                    <p className="text-xs text-neutral-600 font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">All active contracts for "The Midnight Script" are currently funded or released.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
