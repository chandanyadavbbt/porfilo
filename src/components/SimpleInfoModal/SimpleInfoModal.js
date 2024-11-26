// SimpleInfoModal.js

import React from "react";
import "./SimpleInfoModal.css"; // Create this CSS file for styling

export default function SimpleInfoModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="simple-info-modal">
      <div onClick={onClose} className="overlay"></div>
      <div className="simple-info-modal-content">
        {/* Close button */}
        <div className="close-simple-info-modal-container" onClick={onClose}>
          <div className="close-simple-info-modal"></div>
        </div>

        {/* Add content to the modal */}
        
        <h1>Contact Info</h1>
        <p>Phone Number:</p>
        <p>Address:</p>
        

        
        
      </div>
    </div>
  );
}
