import React from 'react';

const DownloadCSV = ({ jsonData }: { jsonData: any[] }) => {
    const convertToCSV = (data: any) => {
        const headers = Object.keys(data[0]).join(","); // Get CSV headers from the JSON keys
        const rows = data
          .map((row: any) => {
            return Object.values(row)
              .map((value: any) => `"${value}"`)
              .join(",");
          })
          .join("\n");
      
        return `${headers}\n${rows}`;
      };
      
  
    // Convert JSON to CSV and trigger download
  const downloadCSV = () => {
    
    const csv = convertToCSV(jsonData); // Convert JSON to CSV
    const blob = new Blob([csv], { type: 'text/csv' }); // Create a Blob object
    const url = window.URL.createObjectURL(blob); // Create a link to the file

    // Create a temporary <a> element to trigger download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'expenses.csv'; // Set the filename
    a.click(); // Trigger the download

    // Clean up
    window.URL.revokeObjectURL(url);
  };

  return (
    <button onClick={downloadCSV}>Download CSV</button>
  );
};

export default DownloadCSV;
