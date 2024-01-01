'use client'
import React, {useEffect, useState} from 'react';
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as querystring from "querystring";
import {getIdentity} from "@/app/dashboard/identityHandler";
import getCourseOverview, {CourseOverview} from "@/app/dashboard/course/courseOverviewHandler";
import getHomeworkOverview, {HomeworkOverview} from "@/app/dashboard/homework/homeworkOverView";
import {getId} from "@/app/dashboard/accountIdHandler";
import Button from "@mui/material/Button";

const AssignmentCard = ({ assignment }) => {
  const { name, score, comment, deadline, submit, courseName } = assignment;
  const isDeadlinePassed = new Date() > deadline;
  const cardStyle = {
    padding: "20px",
    position: "relative",
    backgroundColor: isDeadlinePassed ? '#33ff99' : "white"
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        position: "relative", // 保证这里的值是有效的CSS position属性值
        backgroundColor: isDeadlinePassed ? "#00aa00" : "white",
      }}
    >
      <Typography variant="h5" component="h2">
        {name} -- {courseName}
      </Typography>
      <Typography variant="body2">
        Score: {score || "Not Available"}
      </Typography>
      <Typography variant="body2">
        Teacher&apos;s Comment: {comment || "No comment"}
      </Typography>
      <Typography variant="body2">
        Deadline: {deadline.toLocaleString()} 
        {/* {new Date().toLocaleString()} */}
      </Typography>
      <Typography variant="body2">
        Status: {submit?"Already submitted":"Not yet submitted"} 
        {/* {new Date().toLocaleString()} */}
      </Typography>
    </Paper>
  );
};

export default function AssignmentPage({params, searchParams,}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    const router = useRouter();
    const [assignments, setAssignments] = useState<HomeworkOverview[]>([])
    const [identity, setIdentity] = useState<string>("")
    useEffect(() => {
        getId()
            .then(id => getHomeworkOverview(id))
            .then(homework => setAssignments(homework))
        getIdentity()
            .then(identity => setIdentity(identity))
    }, [])
    const courseParam = searchParams['course']; // 获取 'xx' 参数的值
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
            {/* <Typography variant="h4" component="h1" marginBottom={4}>
          Course: {courseName}
        </Typography> */}
            <Grid container spacing={2} alignItems="center">
                {assignments
                    .filter(assignment => assignment.id === courseParam || courseParam == null)
                    .map((assignment, index) => (
                        <Grid item xs={12} key={index}>
                            <Box
                                onClick={() => router.push(identity === "student" ?
                                    '/dashboard/homework/submit' : `/dashboard/homework/${assignment.uid}`)}
                                sx={{ cursor: "pointer" }}>
                                <AssignmentCard assignment={assignment} />
                            </Box>
                        </Grid>
                    ))}
                {assignments.filter(assignment => assignment.uid === courseParam).length === 0 &&
                    courseParam != null &&
                    (
                    <Grid item xs={12}>
                        <Typography>No Assignment</Typography>
                    </Grid>
                )}

            </Grid>
            {identity === 'teacher' && (
                <Grid item xs={12} sx={{ mt: 3}}>
                    <Button variant="outlined" onClick={() => {router.push('/dashboard/homework/detail?add=true')}}>
                        Add Homework
                    </Button>
                </Grid>
            )}
        </Box>
      </Container>
    );
  }
  