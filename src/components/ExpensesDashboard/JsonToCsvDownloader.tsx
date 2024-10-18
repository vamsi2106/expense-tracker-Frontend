import React from 'react';

interface JsonToCsvDownloaderProps {
    jsonData: any[]; // Accept JSON data as a prop
}

export const JsonToCsvDownloader: React.FC<JsonToCsvDownloaderProps> = ({ jsonData }) => {

    const convertJsonToCsv = (json: any[]) => {
        const csvRows: string[] = [];

        // Get the headers (keys of the first object)
        const headers = Object.keys(json[0]);
        csvRows.push(headers.join(',')); // Push headers as comma-separated

        // Loop through each object and create a CSV row
        for (const row of json) {
            const values = headers.map(header => {
                const value = row[header];
                // Escape values with commas or double quotes
                return typeof value === 'string' && value.includes(',')
                    ? `"${value}"`
                    : value;
            });
            csvRows.push(values.join(',')); // Push each row as comma-separated
        }

        return csvRows.join('\n');
    };

    const downloadCsv = () => {
        const csvData = convertJsonToCsv(jsonData);

        // Create a blob and trigger a download
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.csv';
        a.click();
        window.URL.revokeObjectURL(url); // Clean up after download
    };

    return (
        <div>
            <button onClick={downloadCsv} className='btn btn-secondary'>Export</button>
        </div>
    );
};
