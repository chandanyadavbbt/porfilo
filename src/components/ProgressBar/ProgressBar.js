// ProgressBar.js

import React from 'react';
import PropTypes from 'prop-types';
import './ProgressBar.css'; // Make sure to import your CSS for styling

const ProgressBar = ({ value }) => {
  // Convert the value out of 5 to a percentage
  const percentage = (value / 5) * 100;

  return (
    <div className="progressBar">
      <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.number.isRequired,
};

export default ProgressBar;
