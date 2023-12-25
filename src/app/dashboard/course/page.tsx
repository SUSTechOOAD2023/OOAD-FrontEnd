'use client'
import React from 'react';
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation'; // Corrected import statement
import Link from 'next/link';

const CourseCard = ({ course }) => {
  const { courseName, teacher, group } = course;

  const cardStyle = {
    padding: "20px",
    backgroundColor: "white"
  };

  return (
    <Paper elevation={3} sx={cardStyle}>
      <Typography variant="h5" component="h2">
        {courseName}
      </Typography>
      <Typography variant="body2">
        Teacher: {teacher}
      </Typography>
      <Typography variant="body2">
        {`${AdaptComponent(group)}`}
      </Typography>
    </Paper>
  );
};

export default function CoursePage() {
  const router = useRouter();
  const courses = [
    {
      courseId: "CS666",
      courseName: "Data Structure and Analysis",
      teacher: "Sangonomiya Kokomi",
      group: "group 1"
    },
    {
      courseId: "CS777",
      courseName: "Object Oriented Analysis Design",
      teacher: "Hu Tao",
      group: null
    },
    {
        courseId: "CS888",
        courseName: "C/C++ Programme Design",
        teacher: "Paimon",
        group: "Genshin Group"
      },
    // Add more courses here
  ];

  return (
    <Container component="main" maxWidth="xs" sx={{ minWidth:"55%" }}>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} alignItems="center">
          {courses.map((course, index) => (
            <Grid item xs={12} key={index}>
              <Box component={Link} href={"course/"+course.courseId}
              sx={{ cursor: "pointer", textDecoration: "none" }}>
                <CourseCard course={course} />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

function AdaptComponent(group: string): string {
    return (group === null ? 'No Group' : `Group: ${group}`);
  }