'use client'
import React, {useEffect, useState} from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import {addHomework, HomeworkOverview} from "@/app/dashboard/homework/homeworkOverView";
import getSubmitOverview, {SubmitOverView} from "@/app/dashboard/homework/submit/submitOverView";
import {getId} from "@/app/dashboard/accountIdHandler";
import {hidden} from "next/dist/lib/picocolors";

export default function TeacherInterface({
     params,
     searchParams,
 }) {
    const isAdding = searchParams['add'] === 'true'
    const dueDate = new Date()
    const resubmission = 5
    const description = 'Play genshin for 3 hours'
    const [homework, setHomework] = useState<HomeworkOverview>({
        id: '',
        name: '',
        deadline: new Date(),
        courseName: '',
        resubmission: 0,
        description: '',
    });
    const [submitList, setSubmitList] = useState<SubmitOverView[]>([])
    useEffect(() => {
        const fetchData = async () => {
            setSubmitList(await getSubmitOverview(parseInt(await getId())));
        };
        fetchData();
    }, []);
    const handleChange = (key: keyof HomeworkOverview, value: any) => {
        setHomework({ ...homework, [key]: value });
    };
    console.log(isAdding)
    // const [dueDate, setDueDate] = useState('2023-12-01T23:59:59');
    // const [description, setDescription] = useState('Play Genshin for 3 hours');
    // const [resubmission, setResubmission] = useState(6);
    const [studentSubmissions, setStudentSubmissions] = useState([
        { id: 1, name: 'Alice', submission: 'Alice\'s submission content...', score: '', comment: ''},
        { id: 2, name: 'Bob', submission: 'Bob\'s submission content...', score: '', comment: '' }
    ]);
    const handleSubmitScore = (index) => {
        const student = studentSubmissions[index];
        console.log(`Score for ${student.name}: ${student.score}`); // 在这里添加您的保存逻辑
    };

    const handleSubmitChange = (index, value, field) => {
        const updateSubmit = [...submitList]
        if (field === 'score') updateSubmit[index].score = value
        else if (field === 'comment') updateSubmit[index].comment = value
        else if (field === 'content') updateSubmit[index].content = value
        setSubmitList(updateSubmit)
    }
    const resubmissionChange = (event) => {
        // setResubmission(event.target.value)
    }

    const handleDueDateChange = (event) => {
        // const homework1: HomeworkOverview | null = { ...homework };
        // homework1?.deadline = event.target.value;
    };


    const handleDescriptionChange = (event) => {
        // setDescription(event.target.value);
    };
    const handleSaving = async () => {
        if (isAdding) {
            // await addHomework
        }
    }

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                {isAdding ? 'Add Assignment' : 'Teacher\'s Assignment Management Interface'}
            </Typography>

            <TextField
                label="Due Date"
                type="datetime-local"
                defaultValue={dueDate}
                sx={{ width: 300, mb: 2 }}
                onChange={handleDueDateChange}
            />
            <TextField
                label="Allow Resubmission"
                type="number"
                defaultValue={resubmission}
                sx={{ width: 180, mb: 2, ml: 2 }}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={resubmissionChange}
            />

            <TextField
                label="Assignment Description"
                multiline
                rows={4}
                defaultValue={description}
                sx={{ width: '100%', mb: 2 }}
                onChange={handleDescriptionChange}
            />

            {!isAdding && <Typography variant="h6" gutterBottom>
                Student Submissions
            </Typography> }

            {isAdding ?  <div />:
                (
                    submitList.map((submission, index) => (
                <Accordion key={index}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{submission.studentName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="h5" sx={{}}>Text Submission:</Typography>
                        <Typography>
                            {submission.content}
                        </Typography>
                        <TextField
                            label="Score"
                            type="number"
                            value={submission.score}
                            onChange={(e) => handleSubmitChange(index, e.target.value, "score")}
                            sx={{ mt: 2, mr: 2 }}
                        />
                        <TextField multiline={true}
                            label="Comment"
                            type="text"
                            value={submission.comment}
                            onChange={(e) => handleSubmitChange(index, e.target.value, "comment")}
                            sx={{ mt: 2, mr: 2, width: '300px' }}
                        />
                    </AccordionDetails>
                </Accordion>
            )))}
            <Grid container maxWidth="md" justifyContent="center" sx={{marginTop: 4}}>
                <Grid item xs={4}>
                    <Button
                            variant="contained" color="primary"
                            sx={{ width: '100%', height: '50px', borderRadius: '20' }}>
                        {isAdding ? 'ADD' : 'SAVE'}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
}