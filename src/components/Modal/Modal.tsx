import React from 'react';
import './Modal.css'; 

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div id='primeira-linha'>
          <button onClick={onClose} id='close-btn'>X</button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
