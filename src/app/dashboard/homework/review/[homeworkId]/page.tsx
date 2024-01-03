'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { addHomework, HomeworkOverview, searchHomework } from "@/app/dashboard/homework/homeworkOverView";
import getSubmitOverview, { SubmitOverView, reviewSubmission } from "@/app/dashboard/homework/submit/submitOverView";
import { getId } from "@/app/dashboard/accountIdHandler";
import { hidden } from "next/dist/lib/picocolors";
import { handleDownload, handleKeyPress, updateJsonFromCsv } from '../../detail/utils';
import { getStudentId } from '../../../identityIdHandler';
import dayjs from 'dayjs';
import { DateCalendar, DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/navigation';
import StringArrayComponent from '../../submit/fileSubmits';
import Chart from '../../Chart';

const now = dayjs()

export default function TeacherInterface({
    params,
    searchParams,
}) {
    const router = useRouter();
    const isAdding = searchParams['add'] === 'true'
    const homeworkId = params['homeworkId']
    const [alertDisplay, setAlertDisplay] = useState(false)
    const [gradeList, setGradeList] = useState([])
    const [homework, setHomework] = useState<HomeworkOverview>({
        name: 'Genshin Homework',
        id: '',
        deadline: '',
        courseName: '',
        resubmission: 0,
        description: '',
    });
    const [submitList, setSubmitList] = useState<SubmitOverView[]>([])
    const fileInput: any = useRef(null);
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
    // console.log(isAdding)
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
    const [openVis, setOpenVis] = useState(false)


    const handleDescriptionChange = (event) => {
        // setDescription(event.target.value);
    };
    const vis = (list) => {
        const list2 = list.map(value => value.score)
        setOpenVis(!openVis)
        setGradeList(list2)
    }
    const handleSaving = async () => {
        if (isAdding) {
            // await addHomework
        }
        else {
            const handleReview = async (submission) => {
                try {
                    await reviewSubmission(submission.id, submission.score, submission.comment);
                    console.log(`Reviewed submission with ID: ${submission.id}`);
                } catch (error) {
                    console.error(`Error reviewing submission with ID: ${submission.id}`, error);
                }
            };
            submitList.forEach(submission => {
                if (submission.modified) {
                    handleReview(submission);
                }
            })
            router.push("/dashboard")
        }
    }
    // console.log(submitList)
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
                                <Typography>Student {submission.studentId}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="h5" sx={{}}>Text Submission:</Typography>
                                <Typography>
                                    {submission.content}
                                </Typography>
                                <Typography variant="h5" sx={{}}>Files Submission:</Typography>
                                <StringArrayComponent studentId={submission.studentId} homeworkId={homeworkId}></StringArrayComponent>
                                <TextField
                                    label="Score"
                                    inputProps={{
                                        onKeyPress: handleKeyPress,
                                      }}
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
                        color="error"
                        onClick={event => vis(submitList)}
                        sx={{ width: '100%', height: '50px', borderRadius: '20' }}
                    >
                        VISUALIZATION score
                    </Button>
                </Grid>
            </Grid>     
            <Grid container maxWidth="md" justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={event => handleDownload(submitList)}
                        sx={{ width: '100%', height: '50px', borderRadius: '20' }}
                    >
                        Form Template
                    </Button>
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={event => { if (fileInput.current) fileInput.current.click() }}
                        sx={{ width: '100%', height: '50px', borderRadius: '20', ml: 2 }}
                    >
                        Upload Form
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
                        const file: any = fileInput? fileInput.files:null;
                        const allowedFormats = ['csv'];
                        const fileExtension: any = file? file.name.split('.').pop().toLowerCase():null;
                        console.log(fileExtension)
                        if (!allowedFormats.includes(fileExtension)) {
                            setAlertDisplay(true);
                            return;
                        }
                        updateJsonFromCsv(e.target.files[0], submitList).then(
                            f => setSubmitList(f as any)
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
                        sx={{ width: '100%', height: '50px', borderRadius: '20', mb: 2 }}
                        onClick={handleSaving}
                        >
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
            {openVis && <Chart grade={gradeList}></Chart>}
        </Box>
    );
}
