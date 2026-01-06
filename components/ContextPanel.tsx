
import React from 'react';
import { X, Sparkles, Activity, Info, Zap, ChevronRight, Target, ShieldCheck, TrendingUp, Box, Clock } from 'lucide-react';
// Fix: Using namespace import for react-router-dom to resolve named export errors
import * as ReactRouterDOM from 'react-router-dom';
import { UserRole } from '../types';

const { useNavigate } = ReactRouterDOM;

interface ContextPanelProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

const ContextPanel: React.FC<ContextPanelProps> = ({ isOpen, onClose, role }) => {
  const navigate = useNavigate();

  const handleGenerateReport = () => {
    onClose();
    navigate('/audit-report');
  };

  const getRoleContent = () => {
    switch (role) {
      case 'talent':
        return {
          title: 'IDENTITY CONTEXT',
          insights: [
            { id: 't1', content: 'Casting signal detected: 3 new lead roles match your method acting profile.', timestamp: 'Just now', type: 'info' },
            { id: 't2', content: 'Reel watch time increased by 40% in Mumbai Region.', timestamp: '12m ago', type: 'success' }
          ],
          logs: [
            { user: 'Urban Ad', action: 'Viewed Main Showreel', time: '5m ago' },
            { user: 'System', action: 'Reputation Sync +5', time: '1h ago' },
            { user: 'Moonlight', action: 'Flagged for Shortlist', time: '3h ago' }
          ],
          stats: [
            { label: 'Authority', value: '842', sub: 'Elite' },
            { label: 'Discovery', value: '1.4k', sub: 'Views' }
          ]
        };
      case 'vendor':
        return {
          title: 'NEXUS CONTEXT',
          insights: [
            { id: 'v1', content: 'High demand alert: Arri Alexa units requested for 4 upcoming slates.', timestamp: 'Just now', type: 'warning' },
            { id: 'v2', content: 'Maintenance sync required for Unit 84205 (Sensor Check).', timestamp: '45m ago', type: 'info' }
          ],
          logs: [
            { user: 'Unit A', action: 'Scan Handoff Complete', time: '12m ago' },
            { user: 'System', action: 'Escrow Release Triggered', time: '1h ago' },
            { user: 'Fleet', action: 'Dispatch MH-02 Locked', time: '2h ago' }
          ],
          stats: [
            { label: 'Utilization', value: '92%', sub: 'Active' },
            { label: 'Uptime', value: '98%', sub: 'Nominal' }
          ]
        };
      default: // production
        return {
          title: 'SLATE CONTEXT',
          insights: [
            { id: 'p1', content: 'Logistics shift: Rain expected in 45m. Suggest switching to Scene 14 (INT).', timestamp: 'Just now', type: 'warning' },
            { id: 'p2', content: 'Unit B batteries at 15%. Logistics drone dispatched.', timestamp: '10m ago', type: 'info' }
          ],
          logs: [
            { user: 'Marcus T.', action: 'Uploaded Scene 12 Boards', time: '5m ago' },
            { user: 'Sarah J.', action: 'Acknowledged Call Sheet', time: '12m ago' },
            { user: 'System', action: 'Weather sync completed', time: '1h ago' }
          ],
          stats: [
            { label: 'Efficiency', value: '84%', sub: 'On-Track' },
            { label: 'Unit Sync', value: '12ms', sub: 'Ultra-Low' }
          ]
        };
    }
  };

  const content = getRoleContent();

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[250] md:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed top-0 right-0 bottom-0 w-80 bg-neutral-900 border-l border-white/5 z-[260] transform transition-transform duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-red-500" />
              <h3 className="font-cinematic font-bold tracking-wider text-xl">{content.title}</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-neutral-500 transition-colors active-scale">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-hide">
            {/* Live Insights */}
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Genie Signals</h4>
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              </div>
              <div className="space-y-3">
                {content.insights.map(insight => (
                  <div key={insight.id} className="p-4 bg-black/40 border border-white/5 rounded-2xl hover:border-red-600/30 transition-all cursor-pointer group animate-in slide-in-from-right-4">
                    <div className="flex items-start gap-3">
                      <div className={`mt-1 ${insight.type === 'warning' ? 'text-orange-500' : insight.type === 'success' ? 'text-green-500' : 'text-blue-500'}`}>
                        <Zap size={14} />
                      </div>
                      <div>
                        <p className="text-xs text-neutral-300 leading-relaxed mb-1">{insight.content}</p>
                        <span className="text-[9px] text-neutral-600 font-bold uppercase tracking-widest">{insight.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Activity Stream */}
            <section className="space-y-4">
              <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Operational Log</h4>
              <div className="relative pl-4 space-y-6">
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-white/5" />
                {content.logs.map((act, i) => (
                  <div key={i} className="relative animate-in slide-in-from-right-4" style={{ animationDelay: `${i * 50}ms` }}>
                    <div className="absolute -left-[13px] top-1 w-2.5 h-2.5 rounded-full bg-neutral-800 border-2 border-neutral-900" />
                    <div>
                      <p className="text-[11px] text-white font-black uppercase tracking-widest leading-none mb-1">{act.user}</p>
                      <p className="text-[10px] text-neutral-500 uppercase font-bold">{act.action}</p>
                      <p className="text-[8px] text-neutral-700 mt-1 font-bold uppercase">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Role-Specific Quick Stats */}
            <section className="p-6 bg-red-600/5 border border-red-600/10 rounded-[2rem] space-y-4">
              <div className="flex items-center gap-2 text-red-500">
                <Target size={16} />
                <h4 className="text-[10px] font-black uppercase tracking-widest">Logic Hub</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {content.stats.map((s, i) => (
                  <div key={i}>
                    <p className="text-[8px] text-neutral-600 uppercase font-black tracking-widest mb-0.5">{s.label}</p>
                    <p className="text-xl font-cinematic font-bold text-white leading-none">{s.value}</p>
                    <p className="text-[8px] text-red-500/60 font-bold uppercase tracking-tighter mt-1">{s.sub}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="p-6 border-t border-white/5 bg-black/40">
            <button 
              onClick={handleGenerateReport}
              className="w-full py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-neutral-200 transition-all text-[10px] tracking-[0.2em] uppercase active-scale"
            >
              FULL AUDIT REPORT <ChevronRight size={16} />
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default ContextPanel;
