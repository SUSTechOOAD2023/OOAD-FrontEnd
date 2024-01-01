import React from 'react';
import Papa from 'papaparse'
export function convertToCSV(data) {
    const separator = ',';
    const keys = Object.keys(data[0]).filter(key => key === 'studentName' || key === 'score' || key === 'comment');

    const headerRow = keys.join(separator);
    const bodyRows = data.map((item) => {
        const rowValues = keys.map((key) => {
            return item[key];
        });
        return rowValues.join(separator);
    });

    return `${headerRow}\n${bodyRows.join('\n')}`;
}

export const handleDownload = (data) => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'template.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
};

export const updateJsonFromCsv = (csvFile, jsondata) => {
    return new Promise((resolve, reject) => {
<<<<<<< HEAD
      const newSubmitList = [...jsondata];
      Papa.parse(csvFile, {
        header: true,
        complete: (results) => {
          const csvData = results.data;
          for (let csvRow of csvData) {
            let jsonRecord = newSubmitList.find(record => record.studentName === csvRow?.studentName);
            if (jsonRecord) {
              jsonRecord.comment = csvRow?.comment;
              jsonRecord.score = csvRow?.score;
=======
        const newSubmitList = [...jsondata];
        Papa.parse(csvFile, {
            header: true,
            complete: (results) => {
                const csvData = results.data;
                for (let csvRow of csvData) {
                    let jsonRecord = newSubmitList.find(record => record.studentName === csvRow?.studentName);
                    if (jsonRecord) {
                        jsonRecord.comment = csvRow?.comment;
                        jsonRecord.score = csvRow?.score;
                    }
                }
                //   console.log('Updated JSON:', newSubmitList);
                resolve(newSubmitList);
>>>>>>> e5459111825f36c1e9f32a574c1aa6c1f3b9c4ac
            }
        });
    });
};
  