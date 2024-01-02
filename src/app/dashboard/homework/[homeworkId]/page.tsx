'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { addHomework, HomeworkOverview, searchHomework } from "@/app/dashboard/homework/homeworkOverView";
import getSubmitOverview, { SubmitOverView } from "@/app/dashboard/homework/submit/submitOverView";
import { getId } from "@/app/dashboard/accountIdHandler";
import { hidden } from "next/dist/lib/picocolors";
import { handleDownload, updateJsonFromCsv } from '../detail/utils';
import { getStudentId } from '../../identityIdHandler';
import dayjs from 'dayjs';
import { DateCalendar, DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const now = dayjs()

export default function TeacherInterface({
    params,
    searchParams,
}) {
    const isAdding = searchParams['add'] === 'true'
    const homeworkId = params['homeworkId']
    const [alertDisplay, setAlertDisplay] = useState(false)
    const [homework, setHomework] = useState<HomeworkOverview>({
        name: 'Genshin Homework',
        id: '',
        deadline: '',
        courseName: '',
        resubmission: 0,
        description: '',
    });
    const [submitList, setSubmitList] = useState<SubmitOverView[]>([])
    const fileInput = useRef(null);
    useEffect(() => {
        const fetchData = async () => {
            getSubmitOverview(null, params["homeworkId"], "latest").then(x => setSubmitList(x))
            // setSubmitList(await getSubmitOverview(await getId(), params["homeworkId"]));
            const homework1 = await searchHomework(homeworkId)
            setHomework(homework1)
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

    const handleSubmitChange = (index, value, field) => {
        const updateSubmit = [...submitList]
        if (field === 'score') updateSubmit[index].score = value
        else if (field === 'comment') updateSubmit[index].comment = value
        else if (field === 'content') updateSubmit[index].content = value
        updateSubmit[index].modified = true
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
                {isAdding ? 'Add Assignment' : 'Review ' + homework.name}
                {/* {dayjs(homework.deadline).format('YYYY-MM-DDTHH:mm')} */}
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
                <DateTimePicker
                  label="Due Date"
                  value={dayjs(homework.deadline)}
                  onChange={handleDueDateChange}
                  minDateTime={now}
                />
            {/* <DateCalendar
                label="Due Date"
                type="datetime-local"
                defaultValue={.format('YYYY-MM-DDTHH:mm')}
                // defaultValue={`${homework.deadline.getFullYear()}-${(homework.deadline.getMonth() + 1).toString().padStart(2, '0')}-${homework.deadline.getDate().toString().padStart(2, '0')}T${homework.deadline.getHours().toString().padStart(2, '0')}:${homework.deadline.getMinutes().toString().padStart(2, '0')}`}
                sx={{ width: 300, mb: 2 }}
                onChange={handleDueDateChange}
            /> */}
            </LocalizationProvider>
            <TextField
                label="Allow Resubmission"
                type="number"
                defaultValue={homework.resubmission}
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
                value={homework.description}
                sx={{ width: '100%', mb: 2 }}
                onChange={handleDescriptionChange}
            />

            {!isAdding && <Typography variant="h6" gutterBottom>
                Student Submissions
            </Typography>}

            {isAdding ? <div /> :
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
            <Grid container maxWidth="md" justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={event => handleDownload(submitList)}
                        sx={{ width: '100%', height: '50px', borderRadius: '20' }}
                    >
                        Download csv Template
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={event => { fileInput.current.click() }}
                        sx={{ width: '100%', height: '50px', borderRadius: '20', ml: 2 }}
                    >
                        Upload csv
                    </Button>
                </Grid>
            </Grid>
            <div>
                <input
                    type="file"
                    ref={fileInput}
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        if (!e.target.files) {
                            setAlertDisplay(true)
                            return
                        }
                        const fileInput = e.target;
                        const file = fileInput.files[0];
                        const allowedFormats = ['csv'];
                        const fileExtension = file.name.split('.').pop().toLowerCase();
                        console.log(fileExtension)
                        if (!allowedFormats.includes(fileExtension)) {
                            setAlertDisplay(true);
                            return;
                        }
                        updateJsonFromCsv(e.target.files[0], submitList).then(
                            f => setSubmitList(f)
                        )
                        e.target.value = ''
                    }
                    }
                    accept=".csv"
                    key="fileInput"
                />
            </div>
            <Grid container maxWidth="md" justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={4}>
                    <Button
                        variant="contained" color="primary"
                        sx={{ width: '100%', height: '50px', borderRadius: '20' }}>
                        {isAdding ? 'ADD' : 'SAVE'}
                    </Button>
                </Grid>
            </Grid>
            <Snackbar
                autoHideDuration={3000}
                open={alertDisplay}
                onClose={() => setAlertDisplay(false)}  
            >
                <Alert severity="error" sx={{ width: '100%' }}>
                    The uploaded type is wrong!
                </Alert>
            </Snackbar>

        </Box>
    );
}
