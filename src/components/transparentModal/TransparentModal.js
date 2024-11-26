import React, { useEffect } from 'react';
import './TransparentModal.css';
import { useNavigate } from 'react-router-dom';

const TransparentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    let timerId;

    if (isOpen) {
      // Set a timer to close the modal after 30 seconds
      timerId = setTimeout(() => {
        onClose();
      }, 30000); // 30 seconds in milliseconds
    }

    return () => {
      // Cleanup the timer when the component is unmounted or modal is closed
      clearTimeout(timerId);
    };
  }, [isOpen, onClose]);

  const handleCheckAllRecommendations = () => {
    // Redirect to the RecommendationsPage
    navigate('/RecommendationsPage');
  };

  return (
    <>
      {isOpen && (
        <div className="transparent-modal-overlay">
          <div className="transparent-modal-content">
          <div className='close-btn-icon' onClick={onClose}></div>
            {/* Content */}
            <div className='text-name'>
              <p>Seller Melinda, Sheila & Bryon's has the best Property and the Lead Score</p>
            </div>

            {/* Buttons */}
            <div className="modal-buttons">
              <button className="check-recommendations-btn" onClick={handleCheckAllRecommendations}>
                Check All Recommendations
              </button>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
};

export default TransparentModal;
