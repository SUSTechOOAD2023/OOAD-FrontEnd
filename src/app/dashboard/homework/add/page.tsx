'use client'
import React, { useEffect, useRef, useState } from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { addHomework, HomeworkOverview, searchHomework } from "@/app/dashboard/homework/homeworkOverView";
import getSubmitOverview, { SubmitOverView, reviewSubmission } from "@/app/dashboard/homework/submit/submitOverView";
import { getId } from "@/app/dashboard/accountIdHandler";
import { hidden } from "next/dist/lib/picocolors";
import { handleDownload, handleKeyPress, updateJsonFromCsv } from '../detail/utils'
import dayjs from 'dayjs';
import { DateCalendar, DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/navigation';

const now = dayjs()

export default function TeacherInterface({
    params,
    searchParams,
}) {
    const router = useRouter();
    const homeworkId = params['homeworkId']
    const [alertDisplay, setAlertDisplay] = useState(false)
    const [homework, setHomework] = useState<HomeworkOverview>({
        name: '',
        id: '',
        deadline: '',
        courseName: '',
        resubmission: 1,
        description: '',
    });
    const [submitList, setSubmitList] = useState<SubmitOverView[]>([])
    const fileInput = useRef(null);
    const handleChange = (key: keyof HomeworkOverview, value: any) => {
        setHomework({ ...homework, [key]: value });
    };
    const [homeworkType, setHomeworkType] = useState('individual');

  const handleHomeworkTypeChange = (event) => {
    setHomeworkType(event.target.value);
  };

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
        addHomework(homework)
    }
    // console.log(submitList)
    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
            <Typography variant="h4" gutterBottom>
                Add Assignment
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
                label="Homework Title"
                type="number"
                defaultValue={homework.resubmission}
                sx={{ width: 270, mb: 2, ml: 0 }}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={resubmissionChange}
            />
            <TextField
                label="Allow Resubmission"
                type="number"
                defaultValue={homework.resubmission}
                sx={{ width: 160, mb: 2, ml: 2 }}
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
            <div>
      <Typography variant="h5" component="p">
        Homework Type:
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup name="homeworkType" value={homeworkType} onChange={handleHomeworkTypeChange}>
          <FormControlLabel value="group" control={<Radio />} label="Group Homework" />
          <FormControlLabel value="individual" control={<Radio />} label="Self Homework" />
        </RadioGroup>
      </FormControl>
    </div>
            <Grid container maxWidth="md" justifyContent="center" sx={{ marginTop: 4 }}>
                <Grid item xs={4}>
                    <Button
                        variant="contained" color="primary"
                        sx={{ width: '100%', height: '50px', borderRadius: '20', mb: 2 }}
                        onClick={handleSaving}
                        >
                        ADD
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
