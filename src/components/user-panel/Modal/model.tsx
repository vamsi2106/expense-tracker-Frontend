// Modal.tsx
import React, { ReactNode } from 'react';
import './model.css'; // Assuming you want custom styles, or you can use Bootstrap, etc.

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode; // Allows passing in any valid React content as children
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button onClick={onClose} className="modal-close-button">X</button>
        </div>
        <hr/>
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};
