'use client'
import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Box, 
    Paper, 
    Typography, 
    Accordion, 
    AccordionSummary, 
    AccordionDetails, 
    Divider, 
    IconButton, 
    TextField, 
    Button,
    ButtonGroup
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DeleteIcon from '@mui/icons-material/Delete';
import { notFound } from 'next/navigation';
import { getCourse, Course, Notice } from './courseHandler'
import { getIdentity } from '../../identityHandler';
import Link from "next/link"

const defaultCourse: Course = {
    name: "",
    title: "",
    teacher: [],
    groupLow: 0,
    groupHigh: 0,
    notice: []
}

export default function CoursePage({ params }: { params: { courseId: string } }) {
    const { courseId } = params;

    const [identity, setIdentity] = useState<string>("");
    const [course, setCourse] = useState<Course>(defaultCourse);
    const [modifyGroupSize, setModifyGroupSize] = useState<boolean>(false);

    useEffect(() => {
        const func = async () => {
            getCourse(courseId)
                .then(course => {
                    if (course) {
                        setCourse(course)
                    } else {
                        notFound()
                    }
                })
            getIdentity()
                .then(identity => setIdentity(identity))
        }
        func()
    }, [])

    const courseChange = async () => {
        // TODO: fill course change
    }

    return (
        <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Box display="flex" alignItems="flex-end" sx={{ mb: 1 }}> 
                    <Typography variant="h4" component="h1">
                        {course.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" sx={{ marginLeft: 1 }}>
                        {course.name}
                    </Typography>
                </Box>
                <Typography variant="subtitle1">
                    {course.teacher.join(", ")}
                </Typography>
                {(identity === "admin" || identity === "teacher") &&
                    // FIXME
                    <Box display="flex" alignItems="end" marginBottom={1}>
                        <Typography variant="body1">
                            Group size limit:&nbsp;
                        </Typography>
                        {modifyGroupSize ?
                            <>
                                <TextField
                                    id="group-low"
                                    label="Low"
                                    variant="standard"
                                    size="small"
                                    value={course.groupLow}
                                    onChange={(event) => {
                                        // TODO: validation
                                        setCourse({
                                            ...course, 
                                            groupLow: parseInt(event.target.value)
                                        })
                                    }}
                                />
                                <Typography variant="body1">
                                    &nbsp;&nbsp;to&nbsp;&nbsp;
                                </Typography>
                                <TextField
                                    id="group-high"
                                    label="High"
                                    variant="standard"
                                    size="small"
                                    value={course.groupHigh}
                                    onChange={(event) => {
                                        setCourse({
                                            ...course, 
                                            groupHigh: parseInt(event.target.value)
                                        })
                                    }}
                                />
                                <IconButton 
                                    size="small" 
                                    onClick={() => {
                                        setModifyGroupSize(false)
                                        courseChange()
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </> :
                            <>
                                <Typography variant="body1">
                                    {`${course.groupLow} to ${course.groupHigh}`}
                                </Typography>
                                <IconButton 
                                    size="small"
                                    onClick={() => {
                                        setModifyGroupSize(true)
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        }
                    </Box>
                }
                {(identity === "admin" || identity === "teacher") &&
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Button startIcon={<PersonSearchIcon />}>
                            { /* TODO: add student view */ }
                            Student
                        </Button>
                        <Button 
                          component={Link}
                          href={`/dashboard/group?course=${courseId}`}
                          startIcon={<GroupsIcon />} 
                        >
                            Group
                        </Button>
                        <Button 
                          component={Link}
                          href={`/dashboard/homework?course=${courseId}`}
                          startIcon={<AssignmentIcon />} 
                        >
                            Homework
                        </Button>
                    </Box>
                }
            </Paper>

            <Paper sx={{ padding: 2 }}>
                <Typography variant="h5">Announcements</Typography>
                <Divider sx={{ my: 1 }} />
                {course.notice.map((announcement, index) => (
                    <Accordion key={announcement.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="body1">
                                {announcement.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box 
                                display="flex" 
                                justifyContent="space-between"
                                alignItems="center"
                            >
                                <Typography variant="body2">
                                    {announcement.description}
                                </Typography>
                                {(identity === "admin" || identity === "teacher") && 
                                    // TODO: notice edit
                                    <ButtonGroup 
                                        variant="text" 
                                        size="small" 
                                        aria-label="notice-group"
                                    >
                                        <IconButton color="primary">
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton color="primary">
                                            <DeleteIcon />
                                        </IconButton>
                                    </ButtonGroup>
                                }
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Paper>
            <Grid container maxWidth="md" justifyContent="center" sx={{marginTop: 4}}>
                <Grid item xs={4}>
                    <Button component={Link}
                            href={"/dashboard/homework?course="+courseId}
                            variant="contained" color="primary"
                            sx={{ width: '100%', height: '50px', borderRadius: '20' }}>
                        Homework List
                    </Button>
                </Grid>
            </Grid>

        </Container>
    );
}
