'use client'

import Accordion from "@mui/material/Accordion";
import { Notice, Student, getVisibleStudents } from "./courseHandler";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import Dialog from "@mui/material/Dialog";
import { useEffect, useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import ViewList from "./ViewList";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export default function NoticePage({ notice, identity, students, onEdit, onDelete } : {
  notice: Notice, 
  identity: string, 
  students: Student[], 
  onEdit: (newNotice: Notice) => void, 
  onDelete: () => void, 
}) {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [expanded, setExpaneded] = useState<boolean>(false)
  const [title, setTitle] = useState<string>(notice.title)
  const [description, setDescription] = useState<string>(notice.description)
  const [vis, setVis] = useState<string[] | undefined>(notice.studentVis)
  const [checked, setChecked] = useState<boolean[]>([])

  const handleChange = (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpaneded(isExpanded)
  }

  const generateChecked = () => {
    const checkImpl = ((visId: string[]) => {
      const t = {}
      visId.forEach(id => {
        t[id] = true
      })
      setChecked(students.map(student => !!t[student.id]))
    })
    if (vis === undefined) {
      getVisibleStudents(notice.id)
        .then(visId => {
          setVis(visId)
          checkImpl(visId)
        })
    } else {
      checkImpl(vis)
    }
  }

  const toggleChecked = (index: number) => {
    setChecked(checked.map((x, curIndex) => curIndex === index ? !x : x))
  }

  const reflectChecked = () => {
    setVis(students.filter((x, index) => checked[index]).map(student => student.id))
  }

  return (
    <>
      <Accordion expanded={expanded || edit} onChange={handleChange} key={notice.id}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {edit ? 
            <TextField 
              label="Title"
              variant="filled"
              fullWidth
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            /> :
            <Typography variant="body1">
              {title}
            </Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          <Box 
            display="flex" 
            justifyContent="space-between"
            alignItems="center"
          >
            {edit ? 
              <TextField 
                label="Description"
                variant="filled"
                multiline
                fullWidth
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              /> :
              <Typography variant="body2">
                {description}
              </Typography>
            }
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="space-between"
              alignItems="flex-end"
            >
              {edit &&
                <Button onClick={() => {
                  generateChecked()
                  setDialogOpen(true)
                }}>
                  Visibility
                </Button>
              }
              {(identity === "admin" || identity === "teacher") && 
                <ButtonGroup 
                  variant="text" 
                  size="small" 
                  aria-label="notice-group"
                >
                  <IconButton color="primary" onClick={() => {
                    if (edit) {
                      onEdit({
                        id: notice.id, 
                        title: title, 
                        description: description, 
                        studentVis: vis
                      })
                    }
                    setEdit(!edit)
                  }}>
                    {edit ? <DoneIcon /> : <EditIcon />}
                  </IconButton>
                  <IconButton color="primary" onClick={onDelete}>
                    <DeleteIcon />
                  </IconButton>
                </ButtonGroup>
              }
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>
          Visible students
        </DialogTitle>
        <DialogContent>
            <ViewList 
              name="Search students"
              items={students.map(student => student.name)}
              refs={students.map(student => `/dashboard/profile/${student.id}`)}
              check={checked}
              onCheckChange={toggleChecked}
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDialogOpen(false);
            reflectChecked()
          }}>
            Confirm
          </Button>
          <Button onClick={() => setDialogOpen(false)}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}