import React, { useState } from "react";
import "./Modal.css";
import ProgressBar from '../ProgressBar/ProgressBar';
import SimpleInfoModal from "../SimpleInfoModal/SimpleInfoModal";

export default function Modal({ isOpen, data, onClose }) {
  const [modal, setModal] = useState(isOpen);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    if (!modal) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
    onClose();
  };

  const toggleInfoModal = () => {
    setInfoModalOpen(!infoModalOpen); 
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="header-container">
              <h1 className="Lead-Profile">Lead Profile: {data && data[7] !== undefined ? data[7] : "N/A"}</h1>
              <div className="info-button-container">
                {/* i button with black circle background */}
                <div className="info-button" onClick={toggleInfoModal}>
                  <span className="info-icon">i</span>
                </div>
              </div>
            </div>
            <h2 className="Lead-Profile">Predicted Lead Score : {data && data[6] !== undefined ? data[6] : "N/A"}</h2>

            <table>
              <tbody>
                <TableRow label="Immersion Index" value={Number(data && data[0])} />
                <TableRow label="Health Indicator" value={Number(data && data[1])} />
                <TableRow label="Safety Index" value={Number(data && data[2])} />
                <TableRow label="Cost of Living" value={Number(data && data[3])} />
                <TableRow label="Liability Indicator" value={Number(data && data[4])} />
                <TableRow label="Luxury Indicator" value={Number(data && data[5])} />
                {/* Add more rows for other fields as needed */}
              </tbody>
            </table>

            <div className="close-modal-container" onClick={toggleModal}>
              <div className="close-modal"></div>
            </div>

            {/* Render the SimpleInfoModal component only when infoModalOpen is true */}
            {infoModalOpen && (
              <SimpleInfoModal isOpen={infoModalOpen} onClose={toggleInfoModal} />
            )}
          </div>
        </div>
      )}
    </>
  );
}

function TableRow({ label, value }) {
  return (
    <tr>
      <td>{label}:</td>
      <td className="progress-cell">
        <ProgressBar value={value ?? 0} />
      </td>
    </tr>
  );
}
