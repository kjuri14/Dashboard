
import React, { useState, useEffect } from "react";

const DefectData = () => {
  const [defectData, setDefectData] = useState(null);
  const [startDate, setStartDate] = useState("2024-02-01");
  const [endDate, setEndDate] = useState("2024-02-29");
  const [customerCode, setCustomerCode] = useState("BE0040");

  const fetchData = async () => {
    try {
      const requestBody = {
        StartDate: startDate,
        EndDate: endDate,
        CustomerCode: customerCode,
      };

      const response = await fetch("http://localhost:3001/api/qualitydata", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        setDefectData(data.data);
      } else {
        console.error("Error from server:", data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data on component mount
  }, []); // Run once on component mount

  const handleFetchData = () => {
    fetchData(); // Fetch data when the button is clicked
  };

  if (!defectData) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Production Data from DB-2</h2>
      <div>
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div>
        <label>End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div>
        <label>Customer Code:</label>
        <input
          type="text"
          value={customerCode}
          onChange={(e) => setCustomerCode(e.target.value)}
        />
      </div>
      <button onClick={handleFetchData}>Fetch Data</button>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Customer Code</th>
            <th style={styles.tableHeader}>Customer Name</th>
            <th style={styles.tableHeader}>Business Group</th>
            <th style={styles.tableHeader}>Plant Description</th>
            <th style={styles.tableHeader}>Production Order Code</th>
            <th style={styles.tableHeader}>Today Plan Qty</th>
            <th style={styles.tableHeader}>Today Progress Qty</th>
          </tr>
        </thead>
        <tbody>
          {defectData.map((row, index) => (
            <tr key={index}>
              <td style={styles.tableCell}>{row.CUSTOMERCODE.trim()}</td>
              <td style={styles.tableCell}>{row.CUSTOMERNAME.trim()}</td>
              <td style={styles.tableCell}>{row.BUSINESSGROUP.trim()}</td>
              <td style={styles.tableCell}>{row.PLANTDESCRIPTION.trim()}</td>
              <td style={styles.tableCell}>{row.PRODUCTIONORDERCODE.trim()}</td>
              <td style={styles.tableCell}>{row.TODAYPLANQTY}</td>
              <td style={styles.tableCell}>{row.TODAYPROGRESSQTY}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  tableHeader: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
    backgroundColor: "#f2f2f2",
  },
  tableCell: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    textAlign: "left",
  },
};

export default DefectData;