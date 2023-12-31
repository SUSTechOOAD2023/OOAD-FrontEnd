'use client'
import React, { useState, useEffect, useMemo, useContext } from 'react';
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
    ButtonGroup,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from "@mui/icons-material/Close";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AddIcon from '@mui/icons-material/Add';
import { notFound } from 'next/navigation';
import { getCourse, Course, Notice, getStudents, editNotice, deleteNotice, getNotice, addNotice, editCourse, setCourseStudents, getTeachers } from './courseHandler'
import { User } from "./User";
import { getIdentity } from '../../identityHandler';
import Link from "next/link"
import Grid from "@mui/material/Grid";
import ViewList from './ViewList';
import NoticePage from './Notice';
import { getId } from '../../accountIdHandler';
import { getStudentId } from '../../identityIdHandler';
import { UserContext } from '../../userContext';

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

    const { id, identity } = useContext(UserContext)
    const [course, setCourse] = useState<Course>(defaultCourse);
    const [modifyGroupSize, setModifyGroupSize] = useState<boolean>(false);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [students, setStudents] = useState<User[]>([]);
    const [allStudents, setAllStudents] = useState<User[]>([]);
    const [checked, setChecked] = useState<boolean[]>([]);

    useEffect(() => {
        getCourse(courseId)
            .then(course => {
                if (course) {
                    Promise.all([getTeachers(courseId), getStudents(courseId)])
                        .then(([teachers, students]) => {
                            setStudents(students)
                            if (identity === "admin") {
                                getStudents()
                                    .then(students => setAllStudents(students))
                            }
                            if (identity === "student") {
                                getStudentId(id)
                                    .then(id => getNotice(courseId, id))
                                    .then(notice => setCourse({
                                        ...course, 
                                        teacher: teachers.map(item => item.name), 
                                        notice: notice
                                    }))
                            } else {
                                getNotice(courseId)
                                    .then(notice => setCourse({
                                        ...course, 
                                        teacher: teachers.map(item => item.name), 
                                        notice: notice
                                    }))
                            }
                        })
                } else {
                    notFound()
                }
            })
    }, [])

    const generateChecked = () => {
        const t = {}
        students.forEach(student => {
            t[student.id] = true
        })
        setChecked(allStudents.map(student => !!t[student.id]))
    }

    const toggleChecked = (index: number) => {
        setChecked(checked.map((x, curIndex) => curIndex === index ? !x : x))
    }

    const reflectChecked = () => {
        const resultStudents = allStudents.filter((x, index) => checked[index])
        setStudents(resultStudents)
        setCourseStudents(courseId, resultStudents.map(student => student.id))
    }

    const courseChange = () => {
        editCourse({ id: courseId, groupLow: course.groupLow, groupHigh: course.groupHigh })
            .then(ok => console.log("Edit course group limit: " + ok))
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
                        <Typography variant="body1" marginBottom={0.25}>
                            Group size limit:&nbsp;
                        </Typography>
                        {modifyGroupSize ?
                            <>
                                <TextField
                                    id="group-low"
                                    label="Low"
                                    variant="filled"
                                    size="small"
                                    value={course.groupLow}
                                    onChange={(event) => {
                                        if (event.target.value.length === 0) {
                                            setCourse({
                                                ...course, 
                                                groupLow: 0
                                            })
                                            return
                                        }
                                        const value = event.target.value.replace(/^0+/, "")
                                        const high = Math.max(1, course.groupHigh)
                                        const reg = new RegExp(`^([1-${high}])$`)
                                        if (reg.test(value)) {
                                            setCourse({
                                                ...course, 
                                                groupLow: parseInt(value)
                                            })
                                        }
                                    }}
                                />
                                <Typography variant="body1" marginBottom={0.25}>
                                    &nbsp;&nbsp;to&nbsp;&nbsp;
                                </Typography>
                                <TextField
                                    id="group-high"
                                    label="High"
                                    variant="filled"
                                    size="small"
                                    value={course.groupHigh}
                                    onChange={(event) => {
                                        if (event.target.value.length === 0) {
                                            setCourse({
                                                ...course, 
                                                groupHigh: 0
                                            })
                                            return
                                        }
                                        const value = event.target.value.replace(/^0+/, "")
                                        const low = Math.max(1, course.groupLow)
                                        const reg = new RegExp(`^([${low}-9])$`)
                                        if (reg.test(value)) {
                                            setCourse({
                                                ...course, 
                                                groupHigh: parseInt(value)
                                            })
                                        }
                                    }}
                                />
                                <IconButton 
                                    size="small" 
                                    onClick={() => {
                                        setModifyGroupSize(false)
                                        setCourse({
                                            ...course, 
                                            groupLow: Math.max(
                                                1, 
                                                course.groupLow
                                            ), 
                                            groupHigh: Math.max(
                                                1, 
                                                course.groupLow, 
                                                course.groupHigh
                                            )
                                        })
                                        courseChange()
                                    }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </> :
                            <>
                                <Typography variant="body1" marginBottom={0.25}>
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
                        <Button 
                            startIcon={<PersonSearchIcon />}
                            onClick={() => {
                                setDialogOpen(true)
                                if (identity === "admin") {
                                    generateChecked()
                                }
                            }}
                        >
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
                <Box display="flex" alignItems="center">
                    <Typography variant="h5">Announcements</Typography>
                    {(identity === "admin" || identity === "teacher") &&
                        <IconButton color="primary" onClick={() => {
                            const newNotice: Notice = {
                                id: "",
                                title: "New announcement",
                                description: "New announcement",
                                studentVis: students.map(student => student.id)
                            }

                            addNotice({
                                classId: courseId,
                                noticeTitle: newNotice.title,
                                noticeContent: newNotice.description,
                                listStudentId: students.map(student => student.id)
                            }).then(id => {
                                if (id) {
                                    newNotice.id = id
                                    setCourse({
                                        ...course, 
                                        notice: [...course.notice, newNotice]
                                    })
                                }
                            })
                        }}>
                            <AddIcon />
                        </IconButton>
                    }
                </Box>
                <Divider sx={{ my: 1 }} />
                {course.notice.map(announcement => (
                    <NoticePage 
                        key={announcement.id}
                        notice={announcement}
                        identity={identity}
                        students={students}
                        onEdit={(notice) => {
                            editNotice({
                                noticeId: notice.id,
                                classId: courseId,
                                noticeTitle: notice.title,
                                noticeContent: notice.description,
                                listStudentId: notice.studentVis
                            }).then(ok => {
                                if (ok) {
                                    setCourse({
                                        ...course, 
                                        notice: course.notice.map(cur =>
                                            notice.id === cur.id ? notice : cur
                                        )
                                    })
                                }
                            })
                        }}
                        onDelete={() => {
                            deleteNotice(announcement.id)
                                .then(ok => {
                                    if (ok) {
                                        setCourse({
                                            ...course, 
                                            notice: course.notice.filter(cur =>
                                                cur.id !== announcement.id
                                            )
                                        })
                                    }
                                })
                        }}
                    />
                ))}
            </Paper>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>
                    Students
                </DialogTitle>
                <DialogContent>
                    {identity === "teacher" ? 
                        <ViewList 
                            name="Search students" 
                            items={students.map(student => student.name)}
                            refs={students.map(student => `/dashboard/profile/${student.id}`)}
                        /> :
                        <ViewList 
                            name="Search students"
                            items={allStudents.map(student => student.name)}
                            refs={allStudents.map(student => `/dashboard/profile/${student.id}`)}
                            check={checked}
                            onCheckChange={toggleChecked}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    {identity === "admin" &&
                        <Button onClick={() => {
                            setDialogOpen(false);
                            reflectChecked()
                        }}>
                            Confirm
                        </Button>
                    }
                    <Button onClick={() => setDialogOpen(false)}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}
