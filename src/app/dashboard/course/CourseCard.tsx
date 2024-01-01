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
import { CourseOverview } from './courseOverviewHandler';
import { User } from "./[courseId]/User";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import LoopIcon from '@mui/icons-material/Loop';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { getSAs, getTeachers } from './[courseId]/courseHandler';
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
  const [saDialogOpen, setSADialogOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [nameEditState, setNameEditState] = useState<boolean>(true);
  const [name, setName] = useState<string>(course.name);
  const [title, setTitle] = useState<string>(course.title);
  const [teacher, setTeacher] = useState<User[]>(course.teacher);
  const [allTeacher, setAllTeacher] = useState<User[]>([]);
  const [sa, setSA] = useState<User[]>(course.sa);
  const [allSA, setAllSA] = useState<User[]>([]);
  const [checked, setChecked] = useState<boolean[]>([]);

  useEffect(() => {
    if (identity === "admin") {
      Promise.all([getTeachers(course.id), getSAs(course.id)])
        .then(([teachers, sas]) => {
          setAllTeacher(teachers)
          setAllSA(sas)
        })
    }
  }, [])

  const generateChecked = (user: User[], allUser: User[]) => {
    const t = {}
    user.forEach(item => {
      t[item.id] = true
    })
    setChecked(allUser.map(item => !!t[item.id]))
  }

  const toggleChecked = (index: number) => {
    setChecked(checked.map((x, curIndex) => curIndex === index ? !x : x))
  }

  const reflectChecked = (allUser: User[], setUser) => {
    setUser(allUser.filter((x, index) => checked[index]))
  }

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
                  label="Shortname"
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
                generateChecked(teacher, allTeacher)
                setTeacherDialogOpen(true)
              }}>
                <PersonSearchIcon />
              </IconButton> :
              <Typography variant="body2">
                {teacher.map(item => item.name).join(", ")}
              </Typography>
            }
          </Box>
          {(identity === "admin" || identity === "teacher") &&
            <Box display="flex" alignItems="center">
              <Typography variant="body2" marginRight={0.5}>
                <b>Student assistant:</b>
              </Typography>
              {edit ? 
                <IconButton size="small" color="primary" onClick={() => {
                  generateChecked(sa, allSA)
                  setSADialogOpen(true)
                }}>
                  <PersonSearchIcon />
                </IconButton> :
                <Typography variant="body2">
                  {sa.map(item => item.name).join(", ")}
                </Typography>
              }
            </Box>
          }
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
                  teacher: teacher, 
                  sa: sa
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
              reflectChecked(allTeacher, setTeacher)
            }}>
              Confirm
            </Button>
            <Button onClick={() => setTeacherDialogOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog open={saDialogOpen} onClose={() => setSADialogOpen(false)}>
          <DialogTitle>
            Student Assistants
          </DialogTitle>
          <DialogContent>
              <ViewList 
                name="Search SAs"
                items={allSA.map(item => item.name)}
                check={checked}
                onCheckChange={toggleChecked}
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {
              setSADialogOpen(false);
              reflectChecked(allSA, setSA)
            }}>
              Confirm
            </Button>
            <Button onClick={() => setSADialogOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Paper>
  );
};
