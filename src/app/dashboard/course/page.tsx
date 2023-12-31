'use client'

import { useEffect, useState } from 'react'
import { 
  Container, 
  Box, 
  Grid, 
  Button} from '@mui/material';
import getCourseOverview, { CourseOverview } from './courseOverviewHandler';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getId } from '../accountIdHandler';
import { getIdentity } from '../identityHandler';
import { 
  addCourse, 
  deleteCourse, 
  editCourse, 
  setCourseTeachers 
} from './[courseId]/courseHandler';
import CourseCard from './CourseCard';
import { ErrorSnackBar } from './ErrorSnackBar';

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

  const handleAdd = (name: string, title: string) => {
    addCourse(name, title)
      .then((id) => {    
        setCourses([...courses, {
          id: id, 
          name: name, 
          title: title, 
          teacher: [], 
          sa: []
        }])
      })
  }

  const handleEdit = (course: CourseOverview) => {
    editCourse({ id: course.id, name: course.name, title: course.title })
      .then((ok) => {
        if (ok) {
          setCourses(courses.map(item => item.id === course.id ? course : item))
        } else {
          setSnackBarOpen(true)
        }
      })
    setCourseTeachers(course.id, course.teacher.map(item => item.id))
  }

  const handleDelete = (course: CourseOverview) => {
    deleteCourse(course.id)
      .then((ok) => {
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
                onEdit={(newCourse) => handleEdit(newCourse)}
                onDelete={() => handleDelete(course)}
              />
            </Grid>
          ))}
          {identity === "admin" && 
            <Grid item xs={12} display="flex" justifyContent="center">
              <Button 
                variant="contained" 
                startIcon={<PostAddIcon />} 
                onClick={() => handleAdd("CS000", "New Course")}
              >
                Add Class
              </Button>
            </Grid>
          }
        </Grid>
      </Box>
      <ErrorSnackBar open={snackBarOpen} msg="Error!" onClose={() => setSnackBarOpen(false)}/>
    </Container>
  );
}


