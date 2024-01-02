'use client'
import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Typography, Box, TextareaAutosize, CardContent, Card, Grid } from '@mui/material';
import { BorderAll, Input } from '@mui/icons-material';
import PublishIcon from '@mui/icons-material/Publish';
import {uploadFile, uploadFiles} from "@/app/dashboard/fileHandler";
import {id} from "postcss-selector-parser";
import {getId} from "@/app/dashboard/accountIdHandler";
import { getClassById } from '../homeworkOverView';
import { getHomeworkById } from '../homeworkHandler';
import { UserContext } from '../../userContext';
import { submitHomework } from './submitOverView';
import { getStudentId } from '../../identityIdHandler';
import { useRouter } from 'next/navigation';
import { getCurrentSecondsFrom2023 } from '../detail/utils';


export default function SubmitHomework({
  params,
  searchParams,
}) {
  const [dueDate, setDueDate] = useState('');
  const [points, setPoints] = useState('');
  const router = useRouter();
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { id, identity } = useContext(UserContext)
  const [homeworkType, setHomeworkType] = useState('individual')

    const handleDelete = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };
  const handleChangeContent = (event) => {
    setContent(event.target.value);
  };

  // const assignmentInfo = {
  //   dueDate: new Date('2023-12-01T23:59:59'),
  //   maxPoint: 100,
  //   description: "Play Genshin for 3 hours"
  // };

  useEffect(() => {
    // console.log(searchParams)
    getHomeworkById(searchParams["homeworkId"]).then(
      x => {
        if (!x) return
        if (x.homeworkContent) setDescription(x.homeworkContent);
        if (x.homeworkDdl) setDueDate(x.homeworkDdl);
        if (x.homeworkTitle) setTitle(x.homeworkTitle)
      }
    )
  }, [])

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const newFiles = Array.from(event.target.files) as File[];
            setFiles([...files, ...newFiles]);
        }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        // 处理提交逻辑
        const formData = new FormData();
        const currentSecond = getCurrentSecondsFrom2023()
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
            const success = await uploadFile(`${id}/${searchParams["homeworkId"]}/${currentSecond.toString()}/${files[i].name.replace(/\//g, '0')}`, formData);
            console.log(success);
            formData.delete('file');
        }
        submitHomework(searchParams["homeworkId"], content, homeworkType === 'individual' ? await getStudentId(id) : null, homeworkType === 'individual' ? null : "0")
        router.push("/dashboard")
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', mt: 5 }}>
            <Box display="flex" alignContent="center" justifyContent="center">
                <PublishIcon color="secondary" sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px solid #000',
                    borderColor: 'purple',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                }}/>
                <Box width={20}></Box>
                <Typography variant="h4" gutterBottom>
                    Submit Page
                </Typography>
            </Box>
            <Box display="flex" alignContent="center" justifyContent="center">
            <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
                </Box>
            <Grid container spacing={2}>

                <Grid item xs={6}>
                    <Card sx={{ minWidth: 275, marginBottom: '20px' }}>

                        <CardContent>
                            <Typography variant="h5" component="div">
                                Due Date
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {/* <Typography sx={{ mb: 1.5 }} color="text.secondary"> */}
                                {dueDate}
                                {/* </Typography> */}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={1}>
                </Grid>

        <Grid item xs={4}>
          <Card sx={{ minWidth: 275, marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" component="div">
                Points Possible
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                100
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography marginBottom="18px">
        {description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Text Submission
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8} minWidth="120%" marginLeft="-5px">
          <TextField
            multiline
            minRows={5}
            placeholder="Enter your submission here"
            style={{ width: '100%' }}
            value={content}
            onChange={handleChangeContent}
          />
        </Grid>
        <Grid item>
        </Grid>
      </Grid>
        <ul>
            {files.map((file, index) => (
                <li key={index}>
                    <span>{file.name} - {file.size} bytes</span>
                    <Button onClick={() => handleDelete(index)} size="small">Delete</Button>
                </li>
            ))}
        </ul>
      <Box display="flex" minWidth="120%" alignContent="center" justifyContent="space-around">
        <Button
          variant="contained"
          component="label"
        // sx={{ mt: 2, mb: 2 }}
        >
          Upload File
          <input
            type="file"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {/* <Box width={100} /> */}
        <Button
          variant="contained"
          color="primary"
          // fullWidth
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
}