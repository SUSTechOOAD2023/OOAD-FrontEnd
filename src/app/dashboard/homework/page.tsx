'use client'
import React, {useContext, useEffect, useState} from 'react';
import { Container, Box, Grid, Paper, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as querystring from "querystring";
import {getIdentity} from "@/app/dashboard/identityHandler";
import getCourseOverview, {CourseOverview} from "@/app/dashboard/course/courseOverviewHandler";
import getHomeworkOverview, {HomeworkOverview, getHomeworkByAccount, processHomeworkArray} from "@/app/dashboard/homework/homeworkOverView";
import {getId} from "@/app/dashboard/accountIdHandler";
import Button from "@mui/material/Button";
import { UserContext } from '../userContext';

const AssignmentCard = ({ assignment }) => {
  const { name, grade, comment, deadline, submit, courseName, resubmission, description, passed } = assignment;
    return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        position: "relative", // 保证这里的值是有效的CSS position属性值
        backgroundColor: passed ? "#00aa00" : "white",
      }}
    >
      <Typography variant="h5" component="h2">
        {name} -- {courseName}
      </Typography>
      <Typography variant="body2">
        Score: {grade || "Not Available"}
      </Typography>
      <Typography variant="body2">
        Teacher&apos;s Comment: {comment || "No comment"}
      </Typography>
      <Typography variant="body2">
        Deadline: {deadline} 
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
    const { id, identity } = useContext(UserContext)
    useEffect(() => {
      let tempAssignments: any = [];
      let tempId = '';
      let tempIdentity = ''
    
      
      getHomeworkByAccount(id)
        .then(homework => {
          tempAssignments = homework; // 暂存作业数据
          console.log(homework)
          return processHomeworkArray(tempId, homework, tempIdentity);
        })
        .then(processedHomework => {
          console.log(processedHomework)
          setAssignments(processedHomework); // 最后一次性更新状态
        })
        .catch(error => {
          console.error('An error occurred:', error);
        });
    }, []);
    
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
                                    `/dashboard/homework/submit?homeworkId=${assignment.id}` : `/dashboard/homework/review/${assignment.uid}`)}
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
  