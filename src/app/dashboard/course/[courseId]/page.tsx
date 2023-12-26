'use client'
import React, { useState, useEffect } from 'react';
import { Container, Box, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Divider } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "next/link";


interface Course {
    description: string;
    materials: string[];
    announcements: Announcement[];
    name: String;
}

interface Announcement {
    id: string;
    title: string;
    content: string;
}

const coursesData:  { [key: string]: Course } = {
    "CS666": {
        name: "Data Structure and Analysis",
        description: "This course provides an in-depth understanding of data structures...",
        materials: [
            "Lecture Slides - Week 1",
            "Reading Material - Chapter 2",
        ],
        announcements: [
            {
                id: "announcement1",
                title: "Assignment 1 Released",
                content: "The first assignment has been released and is due by next Monday. The first assignment has been released and is due by next Monday. The first assignment has been released and is due by next Monday. The first assignment has been released and is due by next Monday. The first assignment has been released and is due by next Monday.",
            },
            {
                id: "announcement2",
                title: "Guest Lecture on Algorithms",
                content: "There will be a guest lecture on advanced algorithms next week.",
            },
        ],
    },
};

export default function CoursePage({ params }: { params: { courseId: string } }) {
    const courseId = decodeURIComponent(params.courseId);
    console.log(params.courseId)
    const [course, setCourse] = useState<Course | null>(coursesData[courseId] || null);

    if (!course) {
        return <h2>404 Not Found</h2>;
    }
    return (
        <Container component="main" maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h4" component="h1">
                    {courseId} {course.name}
                </Typography>
                <Typography variant="body1" sx={{ marginTop: 1 }}>
                    {course.description}
                </Typography>
            </Paper>

            <Paper sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h5">Course Materials</Typography>
                <Divider sx={{ my: 1 }} />
                <ul>
                    {course.materials.map((material, index) => (
                        <li key={index}>
                            <Typography variant="body1">{material}</Typography>
                        </li>
                    ))}
                </ul>
            </Paper>

            <Paper sx={{ padding: 2 }}>
                <Typography variant="h5">Announcements</Typography>
                <Divider sx={{ my: 1 }} />
                {course.announcements.map((announcement, index) => (
                    <Accordion key={announcement.id}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{announcement.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{announcement.content}</Typography>
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
