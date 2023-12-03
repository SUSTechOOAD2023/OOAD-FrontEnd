'use client'
import React, { useState } from 'react';
import { Button, TextField, Typography, Box, TextareaAutosize, CardContent, Card, Grid } from '@mui/material';
import { BorderAll, Input } from '@mui/icons-material';
import PublishIcon from '@mui/icons-material/Publish';


export default function SubmitHomework() {
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const assignmentInfo = {
    dueDate: new Date('2023-12-01T23:59:59'),
    maxPoint: 100,
    description: "Play Genshin for 3 hours"
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理提交逻辑
    console.log({ dueDate, points, description, file });
  };

  return (
    <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
      <Box display="flex" alignContent="center" justifyContent="center">
      <PublishIcon color="secondary" sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #000',
          borderColor: 'purple', 
          borderRadius: '50%',
          width: '40px',
          height: '40px',
      }}/>
      <Box width={20}></Box>
        <Typography variant="h4" gutterBottom>
          Submit Page
        </Typography>
      </Box>
      <Grid container spacing={2}>

        <Grid item xs={6}>
          <Card sx={{ minWidth: 275, marginBottom: '20px' }}>

            <CardContent>
              <Typography variant="h5" component="div">
                Due Date
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary"> */}
                  {assignmentInfo.dueDate.toLocaleString()}
                {/* </Typography> */}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={1}>
        </Grid>

        <Grid item xs={4}>
          <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Points Possible
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography marginBottom="18px">
        {assignmentInfo.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Text Submission
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8} minWidth="120%" marginLeft="-5px">
          <TextField
            multiline
            minRows={5}
            placeholder="Enter your submission here"
            style={{ width: '100%' }}
          // value={description}
          />
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
      <Box display="flex" minWidth="120%" alignContent="center" justifyContent="space-around">
        <Button
          variant="contained"
          component="label"
        // sx={{ mt: 2, mb: 2 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {/* <Box width={100} /> */}
        <Button
          variant="contained"
          color="primary"
          // fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}