
import React, { useState } from 'react';
import { MOCK_MEDIA } from '../constants';
import { 
  Upload, 
  FolderPlus, 
  MoreVertical, 
  Play, 
  Search, 
  X, 
  Check, 
  Maximize2, 
  Layers, 
  Activity, 
  ShieldCheck, 
  Cpu, 
  HardDrive, 
  FileVideo, 
  Image as ImageIcon, 
  FileText, 
  Filter,
  ChevronRight,
  Zap,
  Info,
  Download,
  Eye,
  Camera,
  Radio
} from 'lucide-react';

const MediaVault: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [activeUnit, setActiveUnit] = useState('All Units');

  const units = ['All Units', 'A-Unit (ARRI)', 'B-Unit (RED)', 'Drone (DJI)', 'BTS'];

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 pb-32 max-w-[1600px] mx-auto px-0 md:px-4">
      
      {/* 1. VAULT COMMAND HEADER */}
      <header className="px-6 md:px-0 space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#DC2626]" />
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Asset Repository • Unit Sync Active</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Media <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-neutral-400">Vault.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <div className="hidden lg:flex items-center gap-8 px-10 py-6 bg-neutral-900 border border-white/5 rounded-3xl">
                <div className="text-center space-y-1">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Global Files</p>
                   <p className="text-2xl font-cinematic font-bold text-white uppercase">1,428</p>
                </div>
                <div className="w-px h-8 bg-white/5" />
                <div className="text-center space-y-1">
                   <p className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Total Weight</p>
                   <p className="text-2xl font-cinematic font-bold text-red-500 uppercase">4.2 TB</p>
                </div>
             </div>
             <button 
              onClick={() => setIsUploadOpen(true)}
              className="w-full sm:w-auto px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3"
             >
               <Upload size={18} /> Ingest Media
             </button>
          </div>
        </div>

        {/* 2. STORAGE TELEMETRY & FILTER RAIL */}
        <div className="grid md:grid-cols-12 gap-6">
           <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                 {units.map(unit => (
                   <button 
                    key={unit}
                    onClick={() => setActiveUnit(unit)}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      activeUnit === unit ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500 hover:text-white'
                    }`}
                   >
                     {unit}
                   </button>
                 ))}
              </div>
           </div>
           <div className="md:col-span-4 bg-neutral-900/50 border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-end">
                 <div className="flex items-center gap-2 text-neutral-500">
                    <HardDrive size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Buffer Status</span>
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">42% Used</span>
              </div>
              <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#DC2626]" style={{ width: '42%' }} />
              </div>
           </div>
        </div>
      </header>

      {/* 3. ASSET MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-4 md:px-0">
        
        {/* Main Grid */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {MOCK_MEDIA.map((media, i) => (
            <div 
              key={media.id} 
              onClick={() => setSelectedAsset(media)}
              className="group relative bg-neutral-900 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-red-600/40 transition-all duration-500 cursor-pointer shadow-2xl active-scale flex flex-col"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              {/* Media Thumb */}
              <div className="aspect-[4/5] relative overflow-hidden bg-black">
                <img 
                  src={media.thumbnail} 
                  className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                  alt={media.title} 
                />
                
                {/* Tally & Technical Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
                
                <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                   <div className="flex gap-2">
                      <span className="bg-red-600 text-[8px] font-black px-2.5 py-1 rounded text-white uppercase tracking-widest shadow-xl border border-red-500">
                         SC-12B
                      </span>
                   </div>
                   <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <div className="p-2 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 text-white">
                        <Eye size={14} />
                      </div>
                   </div>
                </div>

                {/* Tech Specs (Revealed on Hover) */}
                <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all bg-black/40 backdrop-blur-sm pointer-events-none">
                   <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white shadow-3xl mx-auto mb-2">
                         <Play size={24} fill="white" className="ml-1" />
                      </div>
                      <p className="text-[10px] font-black text-white uppercase tracking-widest">8K • 23.98 FPS</p>
                      <p className="text-[8px] font-black text-neutral-400 uppercase tracking-widest">RED LOG3G10</p>
                   </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                   <p className="text-[8px] font-black text-red-500 uppercase tracking-widest mb-1 leading-none">A-Unit / Cam 1</p>
                   <h4 className="text-sm md:text-base font-black text-white truncate uppercase tracking-widest leading-none">
                      {media.title}
                   </h4>
                </div>
              </div>
              
              {/* Bottom Metadata Ribbon */}
              <div className="p-5 flex items-center justify-between border-t border-white/5 bg-neutral-900/50">
                 <span className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest">{media.size}</span>
                 <div className="flex items-center gap-1.5 text-green-500">
                    <ShieldCheck size={12} />
                    <span className="text-[8px] font-black uppercase tracking-widest">Verified</span>
                 </div>
              </div>

              {i === 0 && <div className="scanline opacity-[0.03]" />}
            </div>
          ))}

          {/* Unified "Post Capture" Trigger */}
          <div 
            onClick={() => setIsUploadOpen(true)}
            className="group border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center p-8 text-center space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all cursor-pointer active-scale min-h-[300px]"
          >
             <div className="w-16 h-16 bg-neutral-900 rounded-[1.5rem] flex items-center justify-center text-neutral-700 group-hover:text-red-500 group-hover:rotate-12 transition-all duration-500 border border-white/5">
                <FolderPlus size={28} />
             </div>
             <p className="text-[10px] font-black text-neutral-700 uppercase tracking-[0.4em]">Initialize Ingest</p>
          </div>
        </div>
      </div>

      {/* 4. ASSET FIELD MONITOR VIEW (Selected Modal) */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedAsset(null)} />
           <div className="max-w-7xl w-full h-full bg-neutral-950 border border-white/10 rounded-[3rem] overflow-hidden relative z-10 flex flex-col md:flex-row shadow-3xl animate-in zoom-in duration-300">
              
              {/* Monitor Area */}
              <div className="flex-1 bg-black relative flex items-center justify-center group">
                 <img src={selectedAsset.thumbnail} className="w-full h-full object-contain opacity-80" />
                 
                 {/* Camera Overlay Graphics */}
                 <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
                    <div className="flex justify-between">
                       <div className="flex gap-6">
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-red-500 tracking-widest">REC ●</p>
                             <p className="text-2xl font-cinematic font-bold text-white tracking-widest">00:14:42:04</p>
                          </div>
                          <div className="w-px h-10 bg-white/10" />
                          <div className="space-y-1">
                             <p className="text-[10px] font-black text-neutral-500 tracking-widest">FPS</p>
                             <p className="text-2xl font-cinematic font-bold text-white tracking-widest">23.98</p>
                          </div>
                       </div>
                       <div className="text-right">
                          <p className="text-[10px] font-black text-neutral-500 tracking-widest uppercase">{selectedAsset.title}</p>
                          <p className="text-xl font-cinematic font-bold text-white tracking-widest uppercase">Cam A / Sl 12B</p>
                       </div>
                    </div>
                    
                    {/* Crosshairs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-white/5 rounded-full" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-12 bg-white/20" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-px bg-white/20" />

                    <div className="flex justify-between items-end">
                       <div className="flex gap-8">
                          <div className="space-y-1">
                             <p className="text-[8px] font-black text-neutral-600 uppercase">Shutter</p>
                             <p className="text-lg font-cinematic font-bold text-white tracking-widest">180.0°</p>
                          </div>
                          <div className="space-y-1">
                             <p className="text-[8px] font-black text-neutral-600 uppercase">ISO</p>
                             <p className="text-lg font-cinematic font-bold text-white tracking-widest">800</p>
                          </div>
                       </div>
                       <div className="bg-neutral-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl flex items-center gap-3">
                          <Activity size={18} className="text-red-500" />
                          <span className="text-[10px] font-black text-white uppercase tracking-widest">Audio Unit Active</span>
                       </div>
                    </div>
                 </div>

                 {/* Play Control */}
                 <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-3xl opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                    <Play size={40} fill="white" className="ml-2" />
                 </button>
              </div>

              {/* Inspector Rail */}
              <aside className="w-full md:w-[450px] border-l border-white/5 bg-neutral-950 p-10 flex flex-col space-y-10">
                 <header className="flex justify-between items-start">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Asset Inspector</p>
                       <h3 className="text-3xl font-cinematic font-bold text-white uppercase tracking-widest">Metadata Log</h3>
                    </div>
                    <button onClick={() => setSelectedAsset(null)} className="p-4 bg-neutral-900 rounded-2xl text-neutral-500 hover:text-white transition-all">
                       <X size={24} />
                    </button>
                 </header>

                 <div className="flex-1 space-y-8 overflow-y-auto scrollbar-hide">
                    <section className="space-y-4">
                       <h5 className="text-[10px] font-black text-neutral-600 uppercase tracking-widest px-2">Operational Context</h5>
                       <div className="grid gap-3">
                          {[
                            { label: 'Ingest Date', val: 'Oct 24, 2024' },
                            { label: 'Scene Logic', val: 'SCENE 12B' },
                            { label: 'Shot Unit', val: 'SHOT 2 (WS)' },
                            { label: 'Capture Unit', val: 'A-UNIT / ARRI ALEXA' }
                          ].map(item => (
                            <div key={item.label} className="flex justify-between items-center p-5 bg-white/5 rounded-2xl border border-white/5">
                               <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{item.label}</span>
                               <span className="text-[10px] font-black text-white uppercase tracking-widest">{item.val}</span>
                            </div>
                          ))}
                       </div>
                    </section>

                    <section className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] space-y-4">
                       <div className="flex items-center gap-3 text-red-500">
                          <Zap size={18} />
                          <h4 className="text-[10px] font-black uppercase tracking-widest">Genie QC Audit</h4>
                       </div>
                       <p className="text-sm text-neutral-400 font-medium italic leading-relaxed">
                          "Exposure match verified against Scene 12A. Noise floor optimal. Recommended for Circle Take status."
                       </p>
                    </section>
                 </div>

                 <footer className="space-y-4 pt-6 border-t border-white/5">
                    <button className="w-full py-6 bg-red-600 text-white font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-xl hover:bg-red-700 transition-all flex items-center justify-center gap-3">
                       <Download size={18} /> Download Master
                    </button>
                    <button className="w-full py-5 bg-neutral-900 border border-white/10 text-white font-black rounded-2xl text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-3">
                       <Radio size={18} /> Push to Unit B
                    </button>
                 </footer>
              </aside>
           </div>
        </div>
      )}

      {/* 5. SCENE-SCOPED UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsUploadOpen(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[4rem] p-12 max-w-2xl w-full relative z-10 shadow-3xl animate-in zoom-in duration-500">
             <div className="flex justify-between items-start mb-12">
                <div className="space-y-1">
                   <h2 className="text-4xl md:text-5xl font-cinematic font-bold tracking-tighter uppercase leading-none">Technical Ingest</h2>
                   <p className="text-neutral-500 font-black text-[10px] uppercase tracking-[0.4em]">Contextual Asset Logic Required</p>
                </div>
                <button onClick={() => setIsUploadOpen(false)} className="p-4 bg-neutral-800 rounded-full text-neutral-500 hover:text-white transition-all">
                   <X size={24} />
                </button>
             </div>

             <div className="space-y-10">
                {/* Drag & Drop Zone */}
                <div className="border-2 border-dashed border-white/5 rounded-[3rem] p-16 text-center space-y-6 hover:border-red-600/30 hover:bg-red-600/5 transition-all group cursor-pointer bg-black/20">
                   <div className="w-24 h-24 bg-neutral-900 rounded-[2rem] flex items-center justify-center mx-auto text-neutral-700 group-hover:text-red-500 group-hover:scale-110 transition-all duration-500 border border-white/5 shadow-2xl">
                      <Upload size={40} />
                   </div>
                   <div className="space-y-2">
                      <p className="text-lg font-black text-neutral-400 uppercase tracking-widest">Supply Digital Negative</p>
                      <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">RAW / ProRes / EXR Support Active</p>
                   </div>
                </div>

                {/* Scope Selection */}
                <div className="grid grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-2">Mission Scene</label>
                      <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600 appearance-none">
                         <option>SCENE 12B</option>
                         <option>SCENE 13</option>
                         <option>SCENE 14A</option>
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest ml-2">Capture Unit</label>
                      <select className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 text-xs font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600 appearance-none">
                         <option>A-UNIT (CAM A)</option>
                         <option>B-UNIT (CAM B)</option>
                         <option>DRONE UNIT</option>
                      </select>
                   </div>
                </div>

                <button 
                  onClick={() => setIsUploadOpen(false)}
                  className="w-full py-8 bg-red-600 hover:bg-red-700 text-white font-black rounded-3xl shadow-2xl shadow-red-600/40 transition-all text-[11px] uppercase tracking-[0.5em] flex items-center justify-center gap-4"
                >
                  <Check size={24} /> Initialize Stream
                </button>
             </div>
          </div>
        </div>
      )}

      {/* 6. SYSTEM FOOTER */}
      <footer className="mt-16 text-center px-4 border-t border-white/5 pt-12 opacity-30">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16">
          <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.8em]">CLAP OS • ASSET NEXUS v4.2</p>
          <div className="flex items-center gap-3 text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.6em]">
            <Radio size={14} className="text-red-500 animate-pulse" /> DECENTRALIZED SYNC ACTIVE
          </div>
          <p className="text-[9px] md:text-[11px] font-black text-white uppercase tracking-[0.6em]">ENCRYPTED RSA-4096</p>
        </div>
      </footer>
    </div>
  );
};

export default MediaVault;
