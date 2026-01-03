
import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  ShieldCheck, 
  ArrowUpRight, 
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
  Filter,
  Activity,
  ArrowRight,
  CreditCard,
  Building2,
  Receipt
} from 'lucide-react';
import { MOCK_PROJECTS, MOCK_BOOKINGS } from '../constants';
import { Booking } from '../types';

const Financials: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'escrow' | 'history' | 'analytics'>('escrow');
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleReleaseEscrow = (id: string) => {
    setBookings(prev => prev.map(b => 
      b.id === id ? { ...b, paymentStatus: 'Released' as any } : b
    ));
  };

  const stats = [
    { label: 'Slate Capital', val: '₹4.50Cr', icon: <Building2 size={18}/>, color: 'text-white', trend: '+12%' },
    { label: 'Active Escrow', val: '₹12.45L', icon: <Lock size={18}/>, color: 'text-red-500', trend: 'Secure' },
    { label: 'Total Yield', val: '₹1.25Cr', icon: <TrendingUp size={18}/>, color: 'text-green-500', trend: 'Released' }
  ];

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-700 pb-28 md:pb-20 max-w-7xl mx-auto px-0 md:px-4">
      
      {/* 1. VAULT HEADER */}
      <header className="flex flex-col gap-6 px-4 md:px-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3 text-red-500">
               <ShieldCheck size={20} className="animate-pulse" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em]">Operational Treasury v4.2</span>
            </div>
            <h1 className="text-4xl md:text-7xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">Financials</h1>
            <p className="text-neutral-500 text-sm md:text-lg font-medium italic">Encrypted Ledger • Secured Slate Disbursements</p>
          </div>
          
          <div className="flex gap-3">
             <button className="flex-1 md:flex-none p-4 md:p-5 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-400 hover:text-white transition-all shadow-xl active-scale">
               <Download size={20} />
             </button>
             <button className="flex-[3] md:flex-none bg-white px-6 md:px-10 py-4 md:py-5 rounded-2xl text-black font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] shadow-3xl flex items-center justify-center gap-3 active-scale transition-all hover:bg-neutral-200">
               <Receipt size={18} /> <span className="hidden sm:inline">TAX AUDIT REPORT</span><span className="sm:hidden">AUDIT</span>
             </button>
          </div>
        </div>

        {/* 2. STATS RIBBON: Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex-shrink-0 w-[280px] md:w-full bg-neutral-900 border border-white/5 p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] space-y-4 group hover:border-white/20 transition-all shadow-2xl relative overflow-hidden active-scale">
               <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-1000">
                  <DollarSign size={120} />
               </div>
               <div className="flex justify-between items-start relative z-10">
                  <div className={`p-3 rounded-xl bg-black/40 border border-white/5 ${stat.color}`}>
                     {stat.icon}
                  </div>
                  <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded-full bg-white/5 ${stat.color} border border-current opacity-60`}>
                    {stat.trend}
                  </span>
               </div>
               <div className="relative z-10">
                  <p className="text-[9px] md:text-[10px] font-black text-neutral-600 uppercase tracking-widest mb-1">{stat.label}</p>
                  <p className={`text-3xl md:text-4xl font-cinematic font-bold tracking-widest ${stat.color}`}>{stat.val}</p>
               </div>
               <div className="h-1 w-full bg-black rounded-full overflow-hidden relative z-10">
                  <div className={`h-full transition-all duration-1000 ${stat.color === 'text-red-500' ? 'bg-red-600 shadow-[0_0_10px_#DC2626]' : 'bg-green-600'}`} style={{ width: i === 1 ? '35%' : '82%' }} />
               </div>
            </div>
          ))}
        </div>
      </header>

      {/* 3. TRANSACTION ENGINE */}
      <div className="bg-neutral-950 md:bg-transparent rounded-[2.5rem] overflow-hidden md:overflow-visible">
        <div className="sticky top-16 md:relative md:top-0 z-30 bg-neutral-950/80 backdrop-blur-xl border-b md:border-none border-white/5 p-4 md:p-0 md:mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex w-full md:w-auto bg-neutral-900 border border-white/5 rounded-2xl p-1 shadow-xl">
             {[
               { id: 'escrow', label: 'Escrow Queue' },
               { id: 'history', label: 'Disbursed' },
               { id: 'analytics', label: 'Yields' }
             ].map(tab => (
               <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none px-6 md:px-8 py-3 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id ? 'bg-red-600 text-white shadow-xl' : 'text-neutral-500 hover:text-white'
                }`}
               >
                 {tab.label}
               </button>
             ))}
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
             <div className="relative flex-1 md:w-72 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-red-500 transition-colors" size={16} />
                <input 
                  type="text" 
                  placeholder="Audit transactions..."
                  className="w-full bg-neutral-900 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-[10px] font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-700 uppercase"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-4 bg-neutral-900 border border-white/5 rounded-2xl text-neutral-500 hover:text-white transition-all active-scale">
                <Filter size={18} />
             </button>
          </div>
        </div>

        {/* LEDGER LIST */}
        <div className="space-y-3 px-4 md:px-0">
          {bookings.map((booking) => (
            <div key={booking.id} className={`group bg-neutral-900 border p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] transition-all shadow-xl relative overflow-hidden ${
              booking.paymentStatus === 'Released' ? 'border-white/5' : 'border-red-600/20'
            }`}>
               <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 lg:items-center relative z-10">
                  
                  {/* Entity Identity */}
                  <div className="flex items-center gap-6 lg:w-1/4">
                     <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.5rem] flex items-center justify-center text-2xl font-cinematic font-bold border transition-all ${
                       booking.paymentStatus === 'Released' ? 'bg-green-600/10 border-green-500/20 text-green-500' : 'bg-red-600/10 border-red-600/20 text-red-500 shadow-3xl shadow-red-600/10'
                     }`}>
                        {booking.paymentStatus === 'Released' ? <Unlock size={24} /> : <Lock size={24} />}
                     </div>
                     <div className="space-y-1">
                        <p className="text-xl md:text-2xl font-cinematic font-bold text-white tracking-widest uppercase truncate leading-none">{booking.projectName}</p>
                        <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em]">{booking.vendorName}</p>
                     </div>
                  </div>
                  
                  {/* Transaction Metadata */}
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-10">
                     <div className="space-y-1.5">
                        <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Status Logic</p>
                        <div className="flex items-center gap-2">
                           <div className={`w-1.5 h-1.5 rounded-full ${booking.paymentStatus === 'Released' ? 'bg-green-500' : 'bg-red-500 animate-pulse shadow-[0_0_10px_#DC2626]'}`} />
                           <span className={`text-[10px] font-black uppercase tracking-widest ${booking.paymentStatus === 'Released' ? 'text-green-500' : 'text-red-500'}`}>
                              {booking.paymentStatus === 'Released' ? 'Funds Cleared' : 'Secured Escrow'}
                           </span>
                        </div>
                     </div>
                     <div className="space-y-1.5 hidden sm:block">
                        <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Reference ID</p>
                        <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest tabular-nums">TRX-9428-CLAP</span>
                     </div>
                     <div className="space-y-1.5">
                        <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest">Audit Cycle</p>
                        <div className="flex items-center gap-2 text-neutral-400 font-bold text-[10px] uppercase tracking-widest">
                          <Clock size={12} className="text-neutral-700" /> {booking.date}
                        </div>
                     </div>
                  </div>

                  {/* Financial Controls */}
                  <div className="flex items-center justify-between lg:justify-end gap-6 pt-6 lg:pt-0 border-t lg:border-t-0 border-white/5">
                     <div className="text-left lg:text-right">
                        <p className="text-[8px] font-black text-neutral-700 uppercase tracking-widest mb-0.5">Amount Net</p>
                        <p className="text-3xl md:text-4xl font-cinematic font-bold text-white tracking-widest leading-none">{booking.amount}</p>
                     </div>
                     
                     <div className="flex items-center gap-3">
                        {booking.paymentStatus !== 'Released' ? (
                          <button 
                            onClick={() => handleReleaseEscrow(booking.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-4 md:py-4.5 rounded-xl md:rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-3xl shadow-red-600/30 active-scale group-hover:scale-[1.02]"
                          >
                             RELEASE
                          </button>
                        ) : (
                          <button className="p-4 md:p-4.5 bg-neutral-800 text-neutral-400 hover:text-white rounded-xl md:rounded-2xl transition-all border border-white/5 active-scale">
                             <FileText size={18} />
                          </button>
                        )}
                        <button className="p-4 md:p-4.5 bg-black/40 rounded-xl md:rounded-2xl text-neutral-700 hover:text-white transition-all border border-white/5">
                           <MoreVertical size={18} />
                        </button>
                     </div>
                  </div>
               </div>
               
               {/* Decorative background visual for active items */}
               {booking.paymentStatus !== 'Released' && (
                 <div className="scanline opacity-[0.03]" />
               )}
            </div>
          ))}

          {/* EMPTY STATE */}
          <div className="p-16 text-center border-2 border-dashed border-white/5 rounded-[3rem] md:rounded-[4rem] bg-black/20 space-y-6 animate-in fade-in duration-1000 mt-8">
             <div className="w-16 h-16 md:w-24 md:h-24 bg-neutral-900 rounded-[1.5rem] md:rounded-[2.5rem] flex items-center justify-center mx-auto text-neutral-800 border border-white/5 shadow-2xl group cursor-default">
                <ShieldCheck size={48} className="group-hover:text-red-500 transition-colors" />
             </div>
             <div className="space-y-2">
                <p className="text-xl md:text-2xl font-cinematic font-bold text-neutral-500 tracking-widest uppercase">Vault Synchronized</p>
                <p className="text-[10px] md:text-xs text-neutral-700 font-bold uppercase tracking-widest max-w-sm mx-auto leading-relaxed">All pending slate disbursements for "The Midnight Script" have been successfully audited.</p>
             </div>
             <button className="px-8 py-3 bg-neutral-900 text-neutral-500 font-black rounded-full text-[9px] uppercase tracking-widest border border-white/5 hover:text-white transition-all active-scale">
               Refresh Treasury Sync
             </button>
          </div>
        </div>
      </div>

      {/* 4. FOOTER LOGIC */}
      <footer className="mt-8 text-center px-4">
         <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-12 opacity-40">
            <p className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.5em]">CLAP OS • TREASURY NODE v4.2</p>
            <div className="flex items-center gap-2 text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.5em]">
               <Activity size={12} /> SYSTEM LATENCY: 12MS
            </div>
            <p className="text-[8px] md:text-[10px] font-black text-white uppercase tracking-[0.5em]">SECURED SESSION #TRX-9428</p>
         </div>
      </footer>
    </div>
  );
};

export default Financials;
