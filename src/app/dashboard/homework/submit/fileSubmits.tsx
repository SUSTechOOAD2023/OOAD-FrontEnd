'use client'
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { downloadFile, getFileList } from './submitOverView';

const handleDownload = async (filepath) => {
    console.log(filepath)
    const body = await downloadFile(filepath)
    const blob = new Blob([body], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filepath.slice(18);
    a.style.display = 'none';
    document.body.appendChild(a);
    
    a.click();
    
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

const StringArrayComponent = ({ studentId, homeworkId }) => {
    const [strings, setStrings] = useState([])
    useEffect(() => {
        getFileList(studentId, homeworkId)
        .then(x => setStrings(x))
    }, [homeworkId, studentId])
  return (
    <div>
      {strings.map((str: string, index) => (
        <a
        key={index}
        onClick={() => handleDownload(str)}
        style={{
            textDecoration: 'underline',
            color: 'blue',
            cursor: 'pointer',
          }}
      >
        <Typography variant="body1" component="p">
          {str.slice(18)}
        </Typography>
      </a>
      ))}
    </div>
  );
};

export default StringArrayComponent;