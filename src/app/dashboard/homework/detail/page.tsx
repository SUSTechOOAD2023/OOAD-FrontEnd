'use client'
import React, { useState } from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";

export default function TeacherInterface() {
    const [dueDate, setDueDate] = useState('2023-12-01T23:59:59');
    const [description, setDescription] = useState('Play Genshin for 3 hours');
    const [studentSubmissions, setStudentSubmissions] = useState([
        { id: 1, name: 'Alice', submission: 'Alice\'s submission content...', score: '' },
        { id: 2, name: 'Bob', submission: 'Bob\'s submission content...', score: '' }
    ]);
    const handleSubmitScore = (index) => {
        const student = studentSubmissions[index];
        console.log(`Score for ${student.name}: ${student.score}`); // 在这里添加您的保存逻辑
    };

    const handleScoreChange = (index, value) => {
        const updatedSubmissions = [...studentSubmissions];
        updatedSubmissions[index].score = value;
        setStudentSubmissions(updatedSubmissions);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Teacher's Assignment Management Interface
            </Typography>

            <TextField
                label="Due Date"
                type="datetime-local"
                defaultValue={dueDate}
                sx={{ width: 250, mb: 2 }}
                onChange={handleDueDateChange}
                InputLabelProps={{
                    shrink: true,
                }}
            />

            <TextField
                label="Assignment Description"
                multiline
                rows={4}
                defaultValue={description}
                sx={{ width: '100%', mb: 2 }}
                onChange={handleDescriptionChange}
            />

            <Typography variant="h6" gutterBottom>
                Student Submissions
            </Typography>

            {studentSubmissions.map((submission, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{submission.name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {submission.submission}
                        </Typography>
                        <TextField
                            label="Score"
                            type="number"
                            value={submission.score}
                            onChange={(e) => handleScoreChange(index, e.target.value)}
                            sx={{ mt: 2, mr: 2 }}
                        />
                    </AccordionDetails>
                </Accordion>
            ))}
            <Grid container maxWidth="md" justifyContent="center" sx={{marginTop: 4}}>
                <Grid item xs={4}>
                    <Button
                            variant="contained" color="primary"
                            sx={{ width: '100%', height: '50px', borderRadius: '20' }}>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}
