
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_DPRS } from '../constants';
import { 
  FileSpreadsheet, Calendar, Clock, CheckCircle, Save, Download, Share2,
  ChevronLeft, Printer, Activity, ShieldCheck, Zap, Info, MoreVertical,
  ArrowUpRight, AlertCircle, Users, Clapperboard, Monitor, ChevronRight
} from 'lucide-react';

const DailyProductionReport: React.FC = () => {
  const navigate = useNavigate();
  const [activeReport, setActiveReport] = useState(MOCK_DPRS[0]);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-32 max-w-7xl mx-auto">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-1.5 h-6 bg-green-600 rounded-full shadow-[0_0_15px_#16A34A]" />
             <p className="text-[10px] font-black text-green-500 uppercase tracking-[0.4em]">Audit Ledger • Legal Verification Node</p>
          </div>
          <h1 className="text-5xl md:text-8xl font-cinematic font-black tracking-tighter text-white uppercase leading-none">
            DPR <br />
            <span className="text-neutral-500 tracking-normal font-sans text-3xl md:text-5xl">Logs.</span>
          </h1>
        </div>
        
        <div className="flex gap-4">
           <button className="px-8 py-4 bg-neutral-900 border border-white/10 text-neutral-500 rounded-2xl hover:text-white transition-all flex items-center gap-2 active-scale">
              <Printer size={18}/> <span className="text-[9px] font-black uppercase tracking-widest">PRINT DRAFT</span>
           </button>
           <button className="px-10 py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.4em] shadow-3xl hover:bg-red-700 transition-all active-scale">
              SUBMIT TO STUDIO
           </button>
        </div>
      </header>

      {/* The Report Document View */}
      <div className="grid lg:grid-cols-12 gap-10">
         <div className="lg:col-span-8 space-y-6">
            
            <div className="bg-white text-black p-8 md:p-16 rounded shadow-4xl relative min-h-[1000px] border-t-[12px] border-neutral-200">
               <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
               
               <div className="relative z-10 space-y-12">
                  <header className="flex justify-between items-start border-b-2 border-black pb-8">
                     <div className="space-y-1">
                        <h2 className="text-4xl font-cinematic font-black uppercase leading-none">THE MIDNIGHT CHASE</h2>
                        <p className="text-[10px] font-black uppercase tracking-widest text-neutral-500">Day {activeReport.shootDay} Daily Production Report</p>
                     </div>
                     <div className="text-right space-y-1">
                        <p className="text-[10px] font-black uppercase text-neutral-400">Date</p>
                        <p className="text-lg font-cinematic font-bold uppercase">{activeReport.date}</p>
                     </div>
                  </header>

                  <section className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-b border-neutral-100">
                     {[
                       { label: 'GEN CALL', val: activeReport.callTime },
                       { label: 'ACTUAL WRAP', val: activeReport.wrapTime },
                       { label: 'MEAL BREAK', val: '1h 00m' },
                       { label: 'SHOOT HRS', val: '11h 15m' }
                     ].map(item => (
                       <div key={item.label}>
                          <p className="text-[9px] font-black uppercase text-neutral-400 mb-1">{item.label}</p>
                          <p className="text-xl font-cinematic font-bold uppercase">{item.val}</p>
                       </div>
                     ))}
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-xl font-cinematic font-bold uppercase border-b border-black/10 pb-2">Progress Analysis</h3>
                     <table className="w-full text-left">
                        <thead>
                           <tr className="border-b-2 border-neutral-100">
                              <th className="py-4 text-[10px] font-black uppercase">SCENE</th>
                              <th className="py-4 text-[10px] font-black uppercase">STATUS</th>
                              <th className="py-4 text-[10px] font-black uppercase">SETUPS</th>
                              <th className="py-4 text-[10px] font-black uppercase">TAKES</th>
                           </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-100">
                           {activeReport.scenesScheduled.map(s => (
                             <tr key={s}>
                                <td className="py-6 font-bold text-lg">{s}</td>
                                <td className="py-6 text-[10px] font-black text-green-600 uppercase">COMPLETED</td>
                                <td className="py-6 font-medium">07 Units</td>
                                <td className="py-6 font-medium">21 Captures</td>
                             </tr>
                           ))}
                        </tbody>
                     </table>
                  </section>

                  <section className="space-y-6">
                     <h3 className="text-xl font-cinematic font-bold uppercase border-b border-black/10 pb-2">Director's Narrative</h3>
                     <p className="text-lg font-medium leading-relaxed italic text-neutral-600">
                        "{activeReport.summary}"
                     </p>
                  </section>

                  <section className="grid grid-cols-2 gap-12 pt-12">
                     <div className="space-y-4">
                        <p className="text-[9px] font-black uppercase text-neutral-400">Production Signature</p>
                        <div className="h-16 border-b border-neutral-200 font-script text-3xl">V. Malhotra</div>
                     </div>
                     <div className="space-y-4">
                        <p className="text-[9px] font-black uppercase text-neutral-400">Director Signature</p>
                        <div className="h-16 border-b border-neutral-200 font-script text-3xl">R. Kumar</div>
                     </div>
                  </section>
               </div>
            </div>
         </div>

         {/* Audit Sidebar */}
         <aside className="lg:col-span-4 space-y-6">
            <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-8">
               <div className="flex items-center justify-between">
                  <h4 className="text-xl font-cinematic font-bold tracking-widest uppercase text-white">Archives</h4>
                  <ShieldCheck className="text-green-500" size={20}/>
               </div>
               <div className="space-y-3">
                  {[10, 9, 8, 7].map(day => (
                    <button key={day} className="w-full p-5 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-between group hover:border-red-600/30 transition-all">
                       <div className="flex items-center gap-4">
                          <span className="text-xl font-cinematic font-bold text-neutral-500 group-hover:text-red-500">D{day}</span>
                          <span className="text-[10px] font-black text-neutral-700 uppercase tracking-widest">Oct {12 + day}, 2024</span>
                       </div>
                       {/* Correctly imported and fixed ChevronRight usage */}
                       <ChevronRight size={16} className="text-neutral-800" />
                    </button>
                  ))}
               </div>
            </section>

            <section className="bg-neutral-900 border border-white/5 p-8 rounded-[2.5rem] shadow-2xl space-y-6">
               <div className="flex items-center gap-3 text-red-500">
                  <Activity size={20} />
                  <h4 className="text-xl font-cinematic font-bold tracking-widest uppercase">Integrity Score</h4>
               </div>
               <p className="text-[11px] text-neutral-400 font-medium leading-relaxed italic">
                 "DPR 12.4 successfully cross-referenced with Continuity Log 8.2. No discrepancies detected in wrap duration."
               </p>
            </section>
         </aside>
      </div>
    </div>
  );
};

export default DailyProductionReport;
