
import React from 'react';
import { X, Bell, CheckCircle2, AlertCircle, Info, ChevronRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { MOCK_NOTIFICATIONS } from '../constants';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertCircle className="text-red-500" size={18} />;
      case 'alert': return <Zap className="text-orange-500" size={18} />;
      case 'success': return <CheckCircle2 className="text-green-500" size={18} />;
      default: return <Info className="text-blue-500" size={18} />;
    }
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[250] animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-neutral-900 border-l border-white/5 z-[260] transform transition-transform duration-500 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <header className="p-6 border-b border-white/5 flex justify-between items-center bg-black/20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600/10 rounded-lg text-red-500">
                <Bell size={18} />
              </div>
              <h3 className="font-cinematic font-bold tracking-wider text-xl uppercase">Inbox</h3>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl text-neutral-500 transition-colors">
              <X size={20} />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-hide">
            {MOCK_NOTIFICATIONS.map((notif) => (
              <div 
                key={notif.id}
                onClick={() => {
                  if (notif.actionPath) navigate(notif.actionPath);
                  onClose();
                }}
                className={`p-5 rounded-[1.5rem] border transition-all cursor-pointer group active-scale ${
                  notif.isRead ? 'bg-black/20 border-white/5' : 'bg-neutral-800 border-red-600/20 shadow-lg'
                }`}
              >
                <div className="flex gap-4">
                  <div className="shrink-0 mt-1">{getIcon(notif.type)}</div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p className={`text-[11px] font-black uppercase tracking-widest ${notif.isRead ? 'text-neutral-400' : 'text-white'}`}>
                        {notif.title}
                      </p>
                      <span className="text-[8px] font-bold text-neutral-600 uppercase whitespace-nowrap ml-2">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">{notif.message}</p>
                    {notif.actionPath && (
                      <div className="pt-2 flex items-center gap-1 text-[9px] font-black text-red-500 uppercase tracking-widest group-hover:gap-2 transition-all">
                        Action Required <ChevronRight size={10} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <footer className="p-6 border-t border-white/5 bg-black/40">
            <button className="w-full py-4 bg-neutral-800 text-neutral-400 font-black rounded-2xl flex items-center justify-center gap-2 hover:text-white transition-all text-[10px] tracking-[0.2em] uppercase">
              Clear All Notifications
            </button>
          </footer>
        </div>
      </aside>
    </>
  );
};

export default NotificationCenter;
