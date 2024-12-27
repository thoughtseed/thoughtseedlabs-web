import { useEffect, useRef } from 'react';

import React from 'react';

const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleEscape = (e) => {
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
        className={`modal-content p-6 rounded-xl shadow-2xl 
          bg-white/20 dark:bg-neutral-900/20 
          backdrop-blur-md backdrop-saturate-150
          border border-white/20
          ${className}`}
        onClick={e => e.stopPropagation()}
      >
        <button className="absolute top-4 right-4 text-white hover:text-gray-300 text-2xl font-bold" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
        <div className="modal-body overflow-y-auto text-white">
          <div className="prose prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
