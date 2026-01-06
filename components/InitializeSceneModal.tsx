
import React, { useState } from 'react';
import Modal from './Modal';
import { Zap, Hash, Type, ShieldCheck, Loader2, FileSpreadsheet, Layers, ChevronDown, Sun, Moon, Home, TreePine } from 'lucide-react';
import { MOCK_PROJECTS } from '../constants';

interface InitializeSceneModalProps {
  isOpen: boolean;
  onClose: () => void;
  onInitialize: (scene: { 
    number: string; 
    title: string; 
    pages: string; 
    unitId: string;
    setting: 'INT' | 'EXT';
    timeOfDay: 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK';
  }) => void;
}

const InitializeSceneModal: React.FC<InitializeSceneModalProps> = ({ isOpen, onClose, onInitialize }) => {
  const [formData, setFormData] = useState({ 
    number: '', 
    title: '', 
    pages: '1.0', 
    unitId: MOCK_PROJECTS[0].units[0].id,
    setting: 'INT' as 'INT' | 'EXT',
    timeOfDay: 'DAY' as 'DAY' | 'NIGHT' | 'DAWN' | 'DUSK'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.number || !formData.title || !formData.pages) return;

    setIsProcessing(true);
    // Simulate registry handshake
    setTimeout(() => {
      onInitialize(formData);
      setFormData({ 
        number: '', 
        title: '', 
        pages: '1.0', 
        unitId: MOCK_PROJECTS[0].units[0].id,
        setting: 'INT',
        timeOfDay: 'DAY'
      });
      setIsProcessing(false);
      onClose();
    }, 1000);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Initialize Scene" 
      subtitle="Slate Entry Protocol v5.0"
      maxWidth="max-w-2xl"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="p-5 bg-red-600/5 border border-red-600/10 rounded-2xl flex items-start gap-4">
           <Zap size={18} className="text-red-500 shrink-0 mt-1" />
           <p className="text-[10px] font-bold text-neutral-500 uppercase leading-relaxed tracking-widest italic">
              FULL INGEST MODE: All parameters are individual inputs. No static system defaults are applied to this slate record.
           </p>
        </div>

        <div className="space-y-6">
           {/* Row 1: Identity */}
           <div className="grid md:grid-cols-3 gap-4">
              <div className="md:col-span-1 space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">ID (No.)</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-red-500">
                       <Hash size={16} />
                    </div>
                    <input 
                      type="text" 
                      required
                      autoFocus
                      placeholder="12B"
                      value={formData.number}
                      onChange={e => setFormData({...formData, number: e.target.value.toUpperCase()})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-2xl font-cinematic text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800"
                    />
                 </div>
              </div>

              <div className="md:col-span-2 space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Working Title</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600">
                       <Type size={16} />
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. THE FINAL CONFRONTATION"
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value.toUpperCase()})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all placeholder:text-neutral-800 uppercase"
                    />
                 </div>
              </div>
           </div>

           {/* Row 2: Environment selectors (RESTORED) */}
           <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Setting</label>
                 <div className="grid grid-cols-2 gap-2 bg-black/40 p-1.5 rounded-xl border border-white/5">
                    {['INT', 'EXT'].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFormData({...formData, setting: s as any})}
                        className={`py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                          formData.setting === s ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-600 hover:text-neutral-400'
                        }`}
                      >
                        {s === 'INT' ? <Home size={12} /> : <TreePine size={12} />}
                        {s}
                      </button>
                    ))}
                 </div>
              </div>
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Time of Day</label>
                 <div className="grid grid-cols-4 gap-1.5 bg-black/40 p-1.5 rounded-xl border border-white/5">
                    {['DAY', 'NIGHT', 'DAWN', 'DUSK'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setFormData({...formData, timeOfDay: t as any})}
                        className={`py-2.5 rounded-lg text-[8px] font-black uppercase transition-all flex flex-col items-center gap-1 ${
                          formData.timeOfDay === t ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-700 hover:text-neutral-400'
                        }`}
                      >
                        {t === 'DAY' || t === 'DAWN' ? <Sun size={10} /> : <Moon size={10} />}
                        {t}
                      </button>
                    ))}
                 </div>
              </div>
           </div>

           {/* Row 3: Logistics */}
           <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Page Count</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500">
                       <FileSpreadsheet size={16} />
                    </div>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. 1 4/8"
                      value={formData.pages}
                      onChange={e => setFormData({...formData, pages: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-4 py-4 text-sm font-bold text-white outline-none focus:ring-1 focus:ring-red-600 transition-all"
                    />
                 </div>
              </div>

              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em] ml-2">Unit Node</label>
                 <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500">
                       <Layers size={16} />
                    </div>
                    <select 
                      value={formData.unitId}
                      onChange={e => setFormData({...formData, unitId: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-12 pr-10 py-4 text-[10px] font-black uppercase text-white outline-none focus:ring-1 focus:ring-red-600 appearance-none cursor-pointer"
                    >
                       {MOCK_PROJECTS[0].units.map(unit => (
                         <option key={unit.id} value={unit.id} className="bg-neutral-900 text-white">
                           {unit.name}
                         </option>
                       ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-600 group-hover:text-white transition-colors">
                       <ChevronDown size={14} />
                    </div>
                 </div>
              </div>
           </div>
        </div>

        <div className="pt-6">
           <button 
             type="submit"
             disabled={isProcessing || !formData.number || !formData.title}
             className="w-full py-8 bg-red-600 hover:bg-red-700 disabled:opacity-30 text-white font-black rounded-[2.5rem] text-[12px] uppercase tracking-[0.5em] shadow-3xl shadow-red-600/30 transition-all active-scale flex items-center justify-center gap-4 group"
           >
              {isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  SYNCING TO SLATE...
                </>
              ) : (
                <>
                  <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
                  LOCK SCENE TO SLATE
                </>
              )}
           </button>
        </div>
      </form>
    </Modal>
  );
};

export default InitializeSceneModal;
