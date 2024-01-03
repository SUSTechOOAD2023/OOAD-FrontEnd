'use client'
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Button, TextField, Typography, Box, CardContent, Card, Grid, Accordion, AccordionSummary, AccordionDetails, Snackbar, Alert, FormControl, RadioGroup, FormControlLabel, Radio, FormLabel } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from "next/link";
import { addHomework, getTeacherClass, HomeworkOverview, searchHomework } from "@/app/dashboard/homework/homeworkOverView";
import getSubmitOverview, { SubmitOverView, reviewSubmission } from "@/app/dashboard/homework/submit/submitOverView";
import { getId } from "@/app/dashboard/accountIdHandler";
import { hidden } from "next/dist/lib/picocolors";
import { handleDownload, handleKeyPress, updateJsonFromCsv } from '../detail/utils'
import dayjs from 'dayjs';
import { DateCalendar, DatePicker, DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useRouter } from 'next/navigation';
import { UserContext } from '../../userContext';
import AssignmentDropdown from '../teacherAssignments';

const now = dayjs()

export default function TeacherInterface({
    params,
    searchParams,
}) {
    const router = useRouter();
    const homeworkId = params['homeworkId']
    const [course, setCourse] = useState([])
    const [courseIds, setCourseIds] = useState([])
    const [alertDisplay, setAlertDisplay] = useState(false)
    const {id, identity} = useContext(UserContext);
    useEffect(() => {
        getTeacherClass(id).then(r => {
            setCourse(r.map(i => ({courseName: i.courseName, courseId: i.classId})))
        })
    }, [])
    const [homework, setHomework] = useState<HomeworkOverview>({
        name: 'New Homework',
        id: '',
        deadline: '',
        courseName: '',
        resubmission: 1,
        description: '',
        maxGrade: 100
    });
    const [submitList, setSubmitList] = useState<SubmitOverView[]>([])
    const fileInput = useRef(null);
    const [selectHomework, setSelectHomework] = useState(null)
    const handleChange = (key: keyof HomeworkOverview, value: any) => {
        setHomework({ ...homework, [key]: value });
    };
    const [homeworkType, setHomeworkType] = useState('individual');

  const handleHomeworkTypeChange = (event) => {
    setHomeworkType(event.target.value);
  };

  const handleHomeworkChange = (eventOrValue, field) => {
    let newValue;

    // 检查传入的第一个参数是事件对象还是直接的值
    if (eventOrValue && eventOrValue.target) {
        // 如果是事件对象，从event.target.value中获取值
        newValue = eventOrValue.target.value;
    } else {
        // 否则，直接使用传入的值
        newValue = eventOrValue;
    }

    // 创建状态的副本
    let newHomework = { ...homework };

    // 更新副本
    newHomework[field] = newValue;

    // 使用setState更新状态
    setHomework(newHomework);
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
                  onChange={r => handleHomeworkChange(r, "deadline")}
                />
            </LocalizationProvider>
            <TextField
                label="Allow Resubmission"
                type="number"
                value={homework.resubmission}
                sx={{ width: 180, mb: 2, ml: 2 }}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={r => handleHomeworkChange(r, "resubmission")}
            />

            <TextField
                label="Homework Title"
                value={homework.name}
                sx={{ width: 270, mb: 2, ml: 0 }}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={r => handleHomeworkChange(r, "name")}
            />
            <TextField
                label="Points possible"
                type="number"
                value={homework.maxGrade}
                sx={{ width: 160, mb: 2, ml: 2 }}
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={r => handleHomeworkChange(r, "maxGrade")}
            />
            <AssignmentDropdown assignments={course} 
            onSelectAssignment={(r) => setSelectHomework(r)} ></AssignmentDropdown>

            <TextField
                label="Assignment Description"
                multiline
                rows={4}
                value={homework.description}
                sx={{ width: '100%', mb: 2 }}
                onChange={r => handleHomeworkChange(r, "description")}
            />
            <div>
      <Typography variant="h5" component="p">
        Homework Type:
      </Typography>

      <FormControl component="fieldset">
        <RadioGroup name="homeworkType" value={homework.type} onChange={r => handleHomeworkChange(r, "type")}>
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
