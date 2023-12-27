'use client'

import { useEffect, useState } from 'react'
import { Container, Box, Grid, Paper, Typography, IconButton, Button } from '@mui/material';
import Link from 'next/link';
import getCourseOverview, { CourseOverview } from './courseOverviewHandler';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { getId } from '../accountIdHandler';
import { getIdentity } from '../identityHandler';

const CourseCard = ({ course, identity }: { course: CourseOverview, identity: string }) => {
  const { name, title, teacher, group } = course;

  return (
    <Paper elevation={3} sx={{ padding: 2.5 }}>
      <Box display="flex" justifyContent="space-between">
        <Box
          component={Link} 
          href={"course/" + course.id}
          color="text.primary"
          sx={{ 
            cursor: "pointer", 
            textDecoration: "none", 
          }}
        >
          <Typography variant="h4" component="h2" paddingBottom={1}>
            {title}
          </Typography>
          <Typography variant="body2">
            <b>Teacher: </b>{teacher.join(", ")}
          </Typography>
          {identity === "student" && (group ? 
            <Typography variant="body2">
              <b>Group: </b>{group}
            </Typography> :
            <Typography variant="body2">
              <b>No Group</b>
            </Typography>
          )}
        </Box>
        {identity === "admin" &&
          <Box 
            display="flex" 
            flexDirection="column" 
            justifyContent="space-between" 
            alignItems="end"
          >
            <IconButton size="small">
              <CloseIcon />
            </IconButton>
            <Button startIcon={<EditIcon />}>
              Edit
            </Button>
          </Box>
        }
      </Box>
    </Paper>
  );
};

export default function CoursePage() {
  const [identity, setIdentity] = useState<string>("")
  const [courses, setCourses] = useState<CourseOverview[]>([])
    console.log(courses)

  useEffect(() => {
    getId()
      .then(id => getCourseOverview(id))
      .then(courses => setCourses(courses))
    getIdentity()
      .then(identity => setIdentity(identity))
  }, [])

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
              <CourseCard course={course} identity={identity}/>
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
    </Container>
  );
}