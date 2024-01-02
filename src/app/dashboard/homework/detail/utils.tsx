import React from 'react';
import Papa from 'papaparse'
import { SubmitOverView } from '../submit/submitOverView';
import { HomeworkOverview } from '../homeworkOverView';

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
export function transformHomeworkData(jsonData: any[]): HomeworkOverview[] {
    return jsonData.map(responseData => ({
        id: responseData.homeworkId.toString(),
        name: responseData.homeworkTitle,
        deadline: responseData.homeworkDdl,
        courseName: '',
        resubmission: responseData.allowResubmit | 1,
        description: responseData.homeworkContent,
        passed: responseData.passed,
        classId: responseData.classId
    }));
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
        const newSubmitList = [...jsondata];
        Papa.parse(csvFile, {
            header: true,
            complete: (results) => {
                const csvData = results.data;
                for (let csvRow of csvData) {
                    let jsonRecord = newSubmitList.find(record => record.studentName === csvRow?.studentName);
                    if (jsonRecord) {
                        if (csvRow?.comment !== jsonRecord.comment || csvRow?.score != jsonRecord.score) {
                            jsonRecord.modified = true;
                        }
                        jsonRecord.comment = csvRow?.comment;
                        jsonRecord.score = csvRow?.score;
                    }
                }
                //   console.log('Updated JSON:', newSubmitList);
                resolve(newSubmitList);
            }
        });
    });
};
  
export function getCurrentSecondsFrom2023() {
    const millisecondsPerSecond = 1000;
    const startYear = 2023;

    const startMilliseconds = new Date(startYear, 0, 1).getTime();
    const currentMilliseconds = new Date().getTime();
    const seconds = Math.floor((currentMilliseconds - startMilliseconds) / millisecondsPerSecond);
    return seconds;
}
