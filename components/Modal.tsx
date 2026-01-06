import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  subtitle, 
  children, 
  footer,
  maxWidth = "max-w-2xl"
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-300">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        onClick={onClose} 
      />
      
      {/* Modal Container */}
      <div className={`relative w-full ${maxWidth} bg-neutral-900 border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 duration-500 flex flex-col max-h-[90vh]`}>
        
        {/* Header */}
        <header className="p-8 md:p-10 border-b border-white/5 bg-black/20 flex justify-between items-start shrink-0">
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-cinematic font-bold tracking-widest text-white uppercase leading-none">
              {title}
            </h2>
            {subtitle && (
              <p className="text-[10px] font-black text-neutral-600 uppercase tracking-[0.3em]">
                {subtitle}
              </p>
            )}
          </div>
          <button 
            onClick={onClose} 
            className="p-3 bg-neutral-800 rounded-2xl text-neutral-500 hover:text-white transition-all active-scale"
          >
            <X size={20} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 scrollbar-hide">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <footer className="p-8 md:p-10 border-t border-white/5 bg-black/40 shrink-0">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Modal;