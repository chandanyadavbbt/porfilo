import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import dataFile from './assets/datafile.csv'; // Import the CSV file
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Modal from './components/Modal/Modal';
import ArrowIcon from '../src/assets/right-arrow.png';
import TransparentModal from './components/transparentModal/TransparentModal';
import RecommendationsPage from './components/RecommendationsPage/RecommendationsPage';

function App() {
  // State to track whether the modal is open
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalValues, setModalValues] = useState([]);
  const [isNewModalOpen, setNewModalOpen] = useState(false);

  // State to store table column names to display in UI
  const [displayedTableRows, setDisplayedTableRows] = useState([
    'Seller_fullname',
    'Address',
    'Predicted_Lead_score',
    'Year_Built',
    'Area_distribution_hmean',
  ]);

  // State to store table column names to include in modal data
  const [modalTableRows, setModalTableRows] = useState([
    'Seller_fullname',
    'Predicted_Lead_score',
    'Luxury_indicator_hmean',
    'Liability_indicator',
    'Cost_of_living_index',
    'Safety_index',
    'Health_indicator',
    'Immersion_index',
  ]);

  // State to store the values
  const [values, setValues] = useState([]);

  const columnMapping = {
    Seller_fullname: 'Name',
    Address: 'Address',
    Predicted_Lead_score: 'Predicted Lead Score',
    Year_Built: 'Year Built',
    Area_distribution_hmean: 'Area Distribution',
  };

  useEffect(() => {
    // Fetch and parse the CSV data from the imported file
    fetch(dataFile)
      .then((response) => response.text())
      .then((csvData) => {
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: function (results) {
            if (!results.data || results.data.length === 0) {
              console.error('CSV data is empty or invalid.');
              return;
            }

            const rowsArray = [];
            const valuesArray = [];

            // Iterating data to get column names and their values
            results.data.forEach((d) => {
              rowsArray.push(Object.keys(d));
              valuesArray.push(Object.values(d));
            });

            // Filtered Column Names for UI
            const displayedRows = rowsArray[0].filter((col) =>
              displayedTableRows.includes(col)
            );

            // Filtered Values for UI
            const displayedValues = valuesArray.map((value) =>
              value.filter((val, i) => displayedTableRows.includes(rowsArray[0][i]))
            );

            // Filtered Column Names for Modal
            const modalRows = rowsArray[0].filter((col) =>
              modalTableRows.includes(col)
            );

            // Filtered Values for Modal
            const modalValues = valuesArray.map((value) =>
              value.filter((val, i) => modalTableRows.includes(rowsArray[0][i]))
            );

            setDisplayedTableRows(displayedRows);
            setValues(displayedValues);
            setModalTableRows(modalRows); // Set modal columns separately
            setModalValues(modalValues); // Set modal values
          },
        });
      });
  }, []); // Run this effect only once on component mount

  useEffect(() => {
    // Function to open the modal
    const openNewModal = () => {
      setNewModalOpen(true);
    };

    // Initial modal appearance
    openNewModal();

    // Set interval to open the modal every 3 minutes
    const intervalId = setInterval(() => {
      openNewModal();
    }, 3 * 60 * 1000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, []); // Run this effect only once on component mount

  const handleRowClick = async (rowDataIndex) => {
    // Wait for the CSV data to be fetched and modalValues to be set
    await new Promise((resolve) => setTimeout(resolve, 0));
    const clickedRowData = modalValues[rowDataIndex];
    setSelectedRowData(clickedRowData);
    setModalOpen(true);
  };

  return (
    
    <>
      <NavBar />
      <div className='main-head'>
        <h2>Real Estate Lead Scoring</h2>
      </div>
      <div className='table-container'>
        {/* Table */}
        <table className='data-table'>
          <thead>
            <tr>
              {displayedTableRows.map((col, index) => {
                const mappedColumnName = columnMapping[col] || col;
                return <th key={index}>{mappedColumnName}</th>;
              })}
              {/* Add an arrow icon in the last column header */}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {values.map((value, index) => {
              return (
                <tr key={index} onClick={() => handleRowClick(index)}>
                  {value.map((val, i) => {
                    return <td key={i}>{val}</td>;
                  })}
                  {/* Add an arrow icon in the last column */}
                  <td><img src={ArrowIcon} className='arrowIcon' /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Conditional rendering of the Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          data={selectedRowData}
          onClose={() => setModalOpen(false)}
        />
      )}
<TransparentModal isOpen={isNewModalOpen} onClose={() => setNewModalOpen(false)} />   
    </>
);
}

export default App;
