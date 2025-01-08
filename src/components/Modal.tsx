import { useEffect, useRef } from 'react';
import React from 'react';
import { MODAL_CONTENT_MAP } from './modal-contents/index.tsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  section?: string | null;
  children?: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  section = null, 
  children, 
  className = '' 
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div 
        ref={modalRef}
        className={`modal-content rounded-xl shadow-2xl 
          bg-white/20 dark:bg-neutral-900/20 
          backdrop-blur-md backdrop-saturate-150
          border border-white/20
          w-[95%] max-w-[90vw] min-w-[280px]
          mx-auto
          max-h-[90vh]
          transition-all duration-300
          ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">{title}</h2>
          <button 
            className="w-10 h-10 flex items-center justify-center
              bg-white/20 hover:bg-white/30 backdrop-blur-sm
              text-white rounded-full transition-all duration-200 ease-in-out
              border border-white/20 text-xl
              shadow-[0_0_15px_rgba(255,255,255,0.1)]
              hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="p-3 sm:p-4 md:p-6">
          <div className="modal-body overflow-y-auto max-h-[calc(90vh-8rem)] text-neutral-900 dark:text-white">
            <div className="prose dark:prose-invert max-w-none">
              {(section && MODAL_CONTENT_MAP[section] ? 
                React.createElement(MODAL_CONTENT_MAP[section]) : 
                children || <div className="text-neutral-900 dark:text-white">Content not available</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
