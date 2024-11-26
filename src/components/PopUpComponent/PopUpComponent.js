import React from 'react';

function PopupComponent({ data, onClose }) {
    return (
      <div className="popup">
        {/* Display the data in the popup */}
        <p>Immersion Index: {data.Immersion_index}</p>
        <p>Health: {data.Health_indicator}</p>
        <p>Safety Index: {data.Safety_index}</p>
        <p>Cost of Living Index: {data.Cost_of_living_index}</p>
        <p>Liability Indicator: {data.Liability_indicator}</p>
        <p>Luxury Indicator: {data.Luxury_indicator_hmean}</p>
  
        {/* Add a button to close the popup */}
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

export default PopupComponent;
