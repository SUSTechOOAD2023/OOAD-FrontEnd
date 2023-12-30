'use client';
import { useEffect, useState } from 'react';
import {
  Box, Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField
} from '@mui/material';
import Link from 'next/link';
import { CourseOverview, Teacher } from './courseOverviewHandler';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import LoopIcon from '@mui/icons-material/Loop';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { getTeachers } from './[courseId]/courseHandler';
import ViewList from './[courseId]/ViewList';

export default function CourseCard({ course, identity, onEdit, onDelete }: {
  course: CourseOverview, 
  identity: string, 
  onEdit: (newCourse: CourseOverview) => void, 
  onDelete: () => void;
}) {
  const { group } = course;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [teacherDialogOpen, setTeacherDialogOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [nameEditState, setNameEditState] = useState<boolean>(true);
  const [name, setName] = useState<string>(course.name);
  const [title, setTitle] = useState<string>(course.title);
  const [teacher, setTeacher] = useState<Teacher[]>(course.teacher);
  const [allTeacher, setAllTeacher] = useState<Teacher[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (identity === "admin") {
      getTeachers(course.id).then(teachers => setAllTeacher(teachers))
    }
  }, [])

  const generateChecked = () => {
    const t = {}
    teacher.forEach(item => {
      t[item.id] = true
    })
    setChecked(allTeacher.map(item => !!t[item.id]))
  }

  const toggleChecked = (index: number) => {
    setChecked(checked.map((x, curIndex) => curIndex === index ? !x : x))
  }

  const reflectChecked = () => {
    setTeacher(allTeacher.filter((x, index) => checked[index]))
  }

  // TODO: edit and add course
  return (
    <Paper elevation={3} sx={{ padding: 2.5 }}>
      <Box display="flex" justifyContent="space-between">
        <Box
          component={edit ? "div" : Link}
          href={"course/" + course.id}
          color="text.primary"
          sx={{
            cursor: edit ? "auto" : "pointer",
            textDecoration: "none",
          }}
        >
          {edit ?
            <Box display="flex" alignItems="center" minWidth={350}>
              {nameEditState ?
                <TextField
                  label="Name"
                  variant="filled"
                  fullWidth
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                /> :
                <TextField
                  label="Shortame"
                  variant="filled"
                  fullWidth
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                />
              }
              <IconButton size="small" onClick={() => setNameEditState(!nameEditState)}>
                <LoopIcon />
              </IconButton>
            </Box> :
            <Typography variant="h4" component="h2" paddingBottom={1}>
              {title}
            </Typography>
          }
          <Box display="flex" alignItems="center">
            <Typography variant="body2" marginRight={0.5}>
              <b>Teacher:</b>
            </Typography>
            {edit ? 
              <IconButton size="small" color="primary" onClick={() => {
                generateChecked()
                setTeacherDialogOpen(true)
              }}>
                <PersonSearchIcon />
              </IconButton> :
              <Typography variant="body2">
                {teacher.map(item => item.name).join(", ")}
              </Typography>
            }
          </Box>
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
            <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
              <CloseIcon />
            </IconButton>
            {edit ? 
              <IconButton size="small" color="primary" onClick={() => {
                setEdit(false)
                onEdit({
                  id: course.id,
                  name: name,
                  title: title,
                  teacher: teacher
                })
              }}>
                <DoneIcon />
              </IconButton> : 
              <Button startIcon={<EditIcon />} onClick={() => {
                setEdit(true)
                setNameEditState(true)
              }}>
                Edit
              </Button>
            }
          </Box>}
        <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
          <DialogTitle>
            {`Are you sure to delete course ${name}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              The operation is irreversible!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setDeleteDialogOpen(false);
              onDelete();
            }}>
              Yes
            </Button>
            <Button onClick={() => setDeleteDialogOpen(false)}>
              No
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={teacherDialogOpen} onClose={() => setTeacherDialogOpen(false)}>
          <DialogTitle>
            Teachers
          </DialogTitle>
          <DialogContent>
              <ViewList 
                name="Search teachers"
                items={allTeacher.map(item => item.name)}
                check={checked}
                onCheckChange={toggleChecked}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setTeacherDialogOpen(false);
              reflectChecked()
            }}>
              Confirm
            </Button>
            <Button onClick={() => setTeacherDialogOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};
