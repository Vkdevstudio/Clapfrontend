
import React from 'react';
import { X, Sparkles, Activity, Info, Zap, ChevronRight } from 'lucide-react';
import { MOCK_AI_INSIGHTS } from '../constants';

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed top-0 right-0 bottom-0 w-80 bg-neutral-900 border-l border-white/5 z-[70] transform transition-transform duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-red-500" />
              <h3 className="font-cinematic font-bold tracking-wider text-xl">GENIE CONTEXT</h3>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-white/5 rounded-lg text-neutral-500 transition-colors">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Live Insights */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Live Insights</h4>
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                {MOCK_AI_INSIGHTS.map(insight => (
                  <div key={insight.id} className="p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-red-600/30 transition-all cursor-pointer group">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${insight.type === 'warning' ? 'text-orange-500' : 'text-blue-500'}`}>
                        <Zap size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-300 leading-relaxed mb-1">{insight.content}</p>
                        <span className="text-[10px] text-neutral-600 font-bold uppercase">{insight.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity Stream */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Production Log</h4>
              <div className="relative pl-4 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
                {[
                  { user: 'Marcus T.', action: 'Uploaded Scene 12 Boards', time: '5m ago' },
                  { user: 'Sarah J.', action: 'Acknowledged Call Sheet', time: '12m ago' },
                  { user: 'System', action: 'Weather sync completed', time: '1h ago' }
                ].map((act, i) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-neutral-800 border-2 border-neutral-900" />
                    <div>
                      <p className="text-xs text-white font-medium">{act.user}</p>
                      <p className="text-[10px] text-neutral-500">{act.action}</p>
                      <p className="text-[10px] text-neutral-700 mt-1">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Metadata / Quick Stats */}
            <section className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-red-500">
                <Info size={16} />
                <h4 className="text-xs font-bold uppercase tracking-widest">Global Sync</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-bold">Latency</p>
                  <p className="text-lg font-cinematic font-bold">12ms</p>
                </div>
                <div>
                  <p className="text-[10px] text-neutral-500 uppercase font-bold">Region</p>
                  <p className="text-lg font-cinematic font-bold">Asia/MUM</p>
                </div>
              </div>
            </section>
          </div>

          <footer className="p-6 border-t border-white/5 bg-black/40">
            <button className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all text-xs tracking-widest uppercase">
              GENERATE FULL REPORT <ChevronRight size={16} />
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default ContextPanel;
