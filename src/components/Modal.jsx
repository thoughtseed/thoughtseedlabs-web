import { useEffect, useRef } from 'react';

import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
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
    <div className="modal-overlay" onClick={onClose}>
      <div 
        ref={modalRef}
        className="modal-content bg-white dark:bg-neutral-900 rounded-lg shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <button className="modal-close text-neutral-500 hover:text-neutral-700" onClick={onClose}>×</button>
        <h2 className="text-2xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">{title}</h2>
        <div className="modal-body overflow-y-auto">
          <div className="prose dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
