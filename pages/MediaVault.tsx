
import React from 'react';
import { MOCK_MEDIA } from '../constants';
import { Upload, FolderPlus, MoreVertical, Play, FileText, Search } from 'lucide-react';

const MediaVault: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">Media Vault</h2>
          <p className="text-neutral-400">Central repository for all your creative assets.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-sm transition-colors">
            <FolderPlus size={18} /> New Folder
          </button>
          <button className="flex items-center gap-2 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-lg shadow-red-600/20">
            <Upload size={18} /> Upload Media
          </button>
        </div>
      </div>

      {/* Storage Overview */}
      <div className="bg-neutral-900 p-6 rounded-3xl border border-neutral-800">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-bold">Storage Capacity</span>
          <span className="text-xs text-neutral-500">452MB of 1GB used</span>
        </div>
        <div className="h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
          <div className="h-full bg-red-600 w-[45%]" />
        </div>
      </div>

      {/* Grid of Assets */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {MOCK_MEDIA.map(media => (
          <div key={media.id} className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-neutral-600 transition-all">
            <div className="aspect-square relative overflow-hidden bg-black/40">
              {media.thumbnail ? (
                <img src={media.thumbnail} className="w-full h-full object-cover opacity-60" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-700">
                   <FileText size={48} />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                <button className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl">
                  {media.type === 'Video' ? <Play size={20} fill="white" /> : <Search size={20} />}
                </button>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start mb-1">
                <p className="text-xs font-bold text-neutral-300 truncate pr-2">{media.title}</p>
                <button className="text-neutral-600 hover:text-white"><MoreVertical size={14} /></button>
              </div>
              <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{media.type} • {media.size}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaVault;
