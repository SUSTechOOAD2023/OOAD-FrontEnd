'use client'

import { useEffect, useState } from 'react'
import { 
  Container, 
  Box, 
  Grid, 
  Button, 
  Snackbar,
  Alert
} from '@mui/material';
import getCourseOverview, { CourseOverview } from './courseOverviewHandler';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getId } from '../accountIdHandler';
import { getIdentity } from '../identityHandler';
import { deleteCourse } from './[courseId]/courseHandler';
import CourseCard from './CourseCard';

export default function CoursePage() {
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false)
  const [identity, setIdentity] = useState<string>("")
  const [courses, setCourses] = useState<CourseOverview[]>([])

  useEffect(() => {
    getId()
      .then(id => getCourseOverview(id))
      .then(courses => setCourses(courses))
    getIdentity()
      .then(identity => setIdentity(identity))
  }, [])

  const handleDelete = (course: CourseOverview) => {
    deleteCourse(course.id).
      then((ok) => {
        if (ok) {
          setCourses(courses.filter(item => item !== course))
        } else {
          setSnackBarOpen(true)
        }
      })
  }

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
        <Grid container spacing={3} alignItems="center">
          {courses.map((course, index) => (
            <Grid item xs={12} key={index}>
              <CourseCard 
                course={course} 
                identity={identity} 
                onDelete={() => handleDelete(course)}
              />
            </Grid>
          ))}
          {identity === "admin" && 
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button variant="contained" startIcon={<PostAddIcon />}>
                Add Class
              </Button>
            </Grid>
          }
        </Grid>
      </Box>
      <Snackbar 
        open={snackBarOpen} 
        autoHideDuration={6000} 
        onClose={() => setSnackBarOpen(false)}
      >
        <Alert 
          onClose={() => setSnackBarOpen(false)} 
          severity="error" 
          variant="filled"
          elevation={6}
        >
          Error!
        </Alert>
      </Snackbar>
    </Container>
  );
}