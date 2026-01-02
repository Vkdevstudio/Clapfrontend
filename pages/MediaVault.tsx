
import React, { useState } from 'react';
import { MOCK_MEDIA } from '../constants';
import { Upload, FolderPlus, MoreVertical, Play, Search, X, Check } from 'lucide-react';

const MediaVault: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="space-y-1">
          <h2 className="text-4xl md:text-6xl font-cinematic font-bold tracking-tighter uppercase text-white">Media Vault</h2>
          <p className="text-neutral-500 text-lg font-medium">Context-preserved asset repository.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={() => setIsUploadOpen(true)} className="flex items-center gap-3 px-10 py-5 bg-red-600 hover:bg-red-700 text-white font-black rounded-[1.5rem] transition-all shadow-3xl shadow-red-600/30 uppercase tracking-[0.2em] text-[11px]">
            <Upload size={18} /> SCENE-SCOPED UPLOAD
          </button>
        </div>
      </div>

      {/* Storage Intelligence */}
      <div className="bg-neutral-900 p-10 rounded-[3rem] border border-white/5 shadow-2xl flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-4 w-full">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Production Cloud Status</span>
              <span className="text-[10px] font-black text-white uppercase tracking-widest">452MB / 10GB</span>
           </div>
           <div className="h-2 w-full bg-black rounded-full overflow-hidden">
              <div className="h-full bg-red-600 transition-all duration-1000" style={{ width: '4.5%' }} />
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Assets Tagged</p>
              <p className="text-4xl font-cinematic font-bold text-white tracking-widest">100%</p>
           </div>
           <div className="text-right">
              <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">Orphan Files</p>
              <p className="text-4xl font-cinematic font-bold text-green-500 tracking-widest">0</p>
           </div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {MOCK_MEDIA.map(media => (
          <div key={media.id} className="group bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/40 transition-all shadow-2xl cursor-pointer">
            <div className="aspect-[4/5] relative overflow-hidden bg-black/40">
              <img src={media.thumbnail} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={media.title} />
              <div className="absolute top-4 left-4">
                 <span className="bg-red-600 text-[8px] font-black px-2 py-1 rounded text-white uppercase tracking-widest shadow-xl">SCENE 12B</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-red-600/40 scale-75 group-hover:scale-100 transition-transform">
                  <Play size={24} fill="white" />
                </div>
              </div>
            </div>
            <div className="p-6 space-y-2">
              <h4 className="text-sm font-black text-white truncate uppercase tracking-widest group-hover:text-red-500 transition-colors">{media.title}</h4>
              <p className="text-[9px] text-neutral-600 font-bold uppercase tracking-[0.2em]">{media.type} • {media.size}</p>
            </div>
          </div>
        ))}
      </div>

      {/* SCENE-SCOPED UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setIsUploadOpen(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[3.5rem] p-12 max-w-xl w-full relative z-10 shadow-3xl animate-in zoom-in duration-500">
             <div className="flex justify-between items-start mb-10">
                <div className="space-y-1">
                   <h2 className="text-4xl font-cinematic font-bold tracking-tighter uppercase leading-none">CONTEXTUAL UPLOAD</h2>
                   <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">NO ORPHAN FILES ALLOWED</p>
                </div>
                <button onClick={() => setIsUploadOpen(false)} className="p-4 bg-neutral-800 rounded-full text-neutral-500">
                   <X size={24} />
                </button>
             </div>

             <div className="space-y-8">
                {/* Drag & Drop Zone */}
                <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-12 text-center space-y-4 hover:border-red-600/30 transition-all group cursor-pointer bg-black/20">
                   <div className="w-16 h-16 bg-neutral-800 rounded-3xl flex items-center justify-center mx-auto text-neutral-600 group-hover:text-red-500 transition-colors">
                      <Upload size={32} />
                   </div>
                   <p className="text-sm font-black text-neutral-400 uppercase tracking-widest">Drop Media or Click to Browse</p>
                </div>

                {/* Scope Selection (The Core Constraint) */}
                <div className="grid grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-2">MANDATORY SCENE SCOPE</label>
                      <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600">
                         <option>SCENE 12B</option>
                         <option>SCENE 13</option>
                         <option>SCENE 14A</option>
                      </select>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-2">MANDATORY SHOT SCOPE</label>
                      <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600">
                         <option>SHOT 1 (MCU)</option>
                         <option>SHOT 2 (WS)</option>
                         <option>SHOT 3 (CU)</option>
                      </select>
                   </div>
                </div>

                <button 
                  onClick={() => setIsUploadOpen(false)}
                  className="w-full py-6 bg-red-600 hover:bg-red-700 text-white font-black rounded-[1.5rem] shadow-2xl shadow-red-600/30 transition-all text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3"
                >
                  <Check size={20} /> FINALIZE UPLOAD
                </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaVault;
