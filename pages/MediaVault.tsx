
import React, { useState } from 'react';
import { MOCK_MEDIA } from '../constants';
import { 
  Upload, 
  FolderPlus, 
  Play, 
  Search, 
  X, 
  Check, 
  ShieldCheck, 
  HardDrive, 
  ChevronRight,
  Download,
  Eye,
  Camera,
  Radio,
  FileVideo,
  Image as ImageIcon,
  FileText,
  Lock,
  Users,
  ShieldAlert
} from 'lucide-react';

const MediaVault: React.FC = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<any>(null);
  const [activeScope, setActiveScope] = useState<'Personal' | 'Project'>('Personal');
  const [activeCategory, setActiveCategory] = useState('All Media');

  const categories = ['All Media', 'Showreels', 'Headshots', 'Audition Tapes', 'Documents'];
  
  // Mock Role-Based Logic: Only show sensitive project files if "Role" matches dept
  // For simulation, we assume user is "DOP" or "Art Director" when in Project scope
  const filteredMedia = MOCK_MEDIA.filter(m => m.scope === activeScope);

  return (
    <div className="space-y-8 md:space-y-12 animate-in fade-in duration-1000 pb-32 max-w-[1600px] mx-auto px-4 md:px-6">
      
      {/* 1. VAULT COMMAND HEADER */}
      <header className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10 md:pb-16 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-red-600 rounded-full shadow-[0_0_15px_#DC2626]" />
              <p className="text-[10px] font-black text-red-500 uppercase tracking-[0.4em]">Personal Media Vault • 256-bit Secure</p>
            </div>
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-cinematic font-black tracking-tighter text-white uppercase leading-[0.8]">
              Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-neutral-400">Portfolio.</span>
            </h1>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
             <button 
              onClick={() => setIsUploadOpen(true)}
              className="w-full sm:w-auto px-10 py-6 bg-white text-black font-black rounded-2xl text-[11px] uppercase tracking-[0.3em] shadow-3xl hover:bg-neutral-200 transition-all active-scale flex items-center justify-center gap-3"
             >
               <Upload size={18} /> Upload Media
             </button>
          </div>
        </div>

        {/* 2. STORAGE & CATEGORIES */}
        <div className="grid md:grid-cols-12 gap-6">
           <div className="md:col-span-8 space-y-6">
              <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                 <div className="flex bg-neutral-900 border border-white/10 rounded-xl p-1 mr-4">
                    <button 
                      onClick={() => setActiveScope('Personal')}
                      className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScope === 'Personal' ? 'bg-red-600 text-white shadow-lg' : 'text-neutral-500'}`}
                    >
                      Personal
                    </button>
                    <button 
                      onClick={() => setActiveScope('Project')}
                      className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeScope === 'Project' ? 'bg-blue-600 text-white shadow-lg' : 'text-neutral-500'}`}
                    >
                      Project Hub
                    </button>
                 </div>
                 {categories.map(cat => (
                   <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      activeCategory === cat ? 'bg-red-600 border-red-500 text-white shadow-xl' : 'bg-neutral-900 border-white/5 text-neutral-500'
                    }`}
                   >
                     {cat}
                   </button>
                 ))}
              </div>
           </div>
           <div className="md:col-span-4 bg-neutral-900/50 border border-white/5 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-end">
                 <div className="flex items-center gap-2 text-neutral-500">
                    <HardDrive size={14} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Vault Space</span>
                 </div>
                 <span className="text-[10px] font-black text-white uppercase tracking-widest">2.4 GB / 10 GB</span>
              </div>
              <div className="h-1.5 w-full bg-black rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_#DC2626]" style={{ width: '24%' }} />
              </div>
           </div>
        </div>
      </header>

      {/* 3. ASSET GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filteredMedia.map((media, i) => (
          <div 
            key={media.id} 
            onClick={() => setSelectedAsset(media)}
            className="group relative bg-neutral-900 border border-white/5 rounded-[2rem] overflow-hidden hover:border-red-600/40 transition-all duration-500 cursor-pointer shadow-2xl active-scale flex flex-col"
          >
            <div className="aspect-[4/5] relative overflow-hidden bg-black">
              <img 
                src={media.thumbnail} 
                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000" 
                alt={media.title} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90" />
              
              <div className="absolute top-4 left-4">
                 {media.type === 'Video' ? <FileVideo size={16} className="text-red-500" /> : <ImageIcon size={16} className="text-blue-500" />}
              </div>

              {media.scope === 'Project' && (
                <div className="absolute top-4 right-4">
                   <Lock size={14} className="text-orange-500" />
                </div>
              )}

              <div className="absolute bottom-6 left-6 right-6">
                 <h4 className="text-sm font-black text-white truncate uppercase tracking-widest leading-none">
                    {media.title}
                 </h4>
              </div>
            </div>
            
            <div className="p-4 flex items-center justify-between border-t border-white/5 bg-neutral-900/50">
               <span className="text-[8px] font-bold text-neutral-600 uppercase tracking-widest">{media.size}</span>
               <div className="flex items-center gap-1.5 text-green-500">
                  <ShieldCheck size={10} />
                  <span className="text-[8px] font-black uppercase tracking-widest">{media.scope === 'Project' ? 'RESTRICTED' : 'PUBLIC'}</span>
               </div>
            </div>
          </div>
        ))}

        <div 
          onClick={() => setIsUploadOpen(true)}
          className="group border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center p-8 text-center space-y-4 hover:border-red-600/30 hover:bg-red-600/5 transition-all cursor-pointer active-scale min-h-[250px]"
        >
           <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center text-neutral-700 group-hover:text-red-500 transition-all border border-white/5">
              <FolderPlus size={24} />
           </div>
           <p className="text-[9px] font-black text-neutral-700 uppercase tracking-widest">Add New Asset</p>
        </div>
      </div>

      {/* Project Node Warning for sensitive folders */}
      {activeScope === 'Project' && (
        <section className="bg-blue-600/5 border border-blue-600/20 p-8 rounded-[2.5rem] flex items-start gap-6 animate-in slide-in-from-bottom-4 shadow-xl">
           <div className="p-4 bg-blue-600/10 rounded-2xl">
              <ShieldAlert size={28} className="text-blue-500" />
           </div>
           <div className="space-y-1">
              <h4 className="text-lg font-cinematic font-bold text-white uppercase tracking-widest">Project Node Access</h4>
              <p className="text-[10px] text-neutral-400 font-medium leading-relaxed italic uppercase tracking-widest">
                Requirement 5.2: You are currently viewing assets shared with the "THE MIDNIGHT CHASE" unit. Visibility is role-restricted based on your department clearance.
              </p>
           </div>
        </section>
      )}

      {/* 4. ASSET MODAL */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
           <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={() => setSelectedAsset(null)} />
           <div className="max-w-4xl w-full bg-neutral-900 border border-white/10 rounded-[3rem] overflow-hidden relative z-10 flex flex-col md:flex-row shadow-3xl animate-in zoom-in duration-300">
              <div className="flex-1 bg-black relative flex items-center justify-center group min-h-[300px]">
                 <img src={selectedAsset.thumbnail} className="w-full h-full object-contain" />
                 <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-3xl hover:scale-110 transition-all">
                    <Play size={32} fill="white" className="ml-1" />
                 </button>
              </div>
              <aside className="w-full md:w-80 bg-neutral-950 p-8 flex flex-col space-y-8">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">Media Detail</p>
                    <h3 className="text-2xl font-cinematic font-bold text-white uppercase tracking-widest">{selectedAsset.title}</h3>
                 </div>
                 <div className="space-y-4 flex-1">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="text-[9px] font-bold text-neutral-500 uppercase">Size</span>
                       <span className="text-[10px] font-black text-white">{selectedAsset.size}</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                       <span className="text-[9px] font-bold text-neutral-500 uppercase">Visibility</span>
                       <span className={`text-[10px] font-black ${selectedAsset.scope === 'Project' ? 'text-orange-500' : 'text-green-500'}`}>
                          {selectedAsset.scope === 'Project' ? 'RESTRICTED' : 'PUBLIC'}
                       </span>
                    </div>
                 </div>
                 <div className="space-y-3">
                    <button className="w-full py-4 bg-red-600 text-white font-black rounded-xl text-[10px] uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
                       <Download size={14} /> Download
                    </button>
                    <button className="w-full py-4 bg-neutral-800 text-neutral-400 font-black rounded-xl text-[10px] uppercase tracking-widest border border-white/5">
                       Share Link
                    </button>
                 </div>
              </aside>
           </div>
        </div>
      )}

      {/* 5. UPLOAD MODAL */}
      {isUploadOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-2xl" onClick={() => setIsUploadOpen(false)} />
          <div className="bg-neutral-900 border border-white/10 rounded-[3rem] p-10 md:p-12 max-w-xl w-full relative z-10 shadow-3xl animate-in zoom-in duration-500">
             <div className="flex justify-between items-start mb-8">
                <h2 className="text-3xl font-cinematic font-bold tracking-widest uppercase">Upload Media</h2>
                <button onClick={() => setIsUploadOpen(false)} className="p-2 text-neutral-500 hover:text-white"><X size={20} /></button>
             </div>
             <div className="space-y-8">
                <div className="border-2 border-dashed border-white/5 rounded-[2rem] p-12 text-center space-y-4 hover:border-red-600/30 transition-all bg-black/20 cursor-pointer">
                   <div className="w-16 h-16 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto text-neutral-700">
                      <Upload size={32} />
                   </div>
                   <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Drop files here or click to browse</p>
                </div>
                <div className="space-y-3">
                   <label className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">Select Category</label>
                   <select className="w-full bg-black/40 border border-white/5 rounded-xl px-6 py-4 text-[11px] font-black uppercase tracking-widest text-white outline-none focus:ring-1 focus:ring-red-600 appearance-none">
                      {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                   </select>
                </div>
                <button onClick={() => setIsUploadOpen(false)} className="w-full py-6 bg-red-600 text-white font-black rounded-2xl shadow-xl uppercase tracking-widest text-[10px]">Start Upload</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MediaVault;
