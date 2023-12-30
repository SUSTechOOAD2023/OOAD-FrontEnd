'use client';
import { useState } from 'react';
import {
  Box, Paper,
  Typography,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import Link from 'next/link';
import { CourseOverview } from './courseOverviewHandler';
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';

export default function CourseCard({ course, identity, onDelete }: {
  course: CourseOverview; identity: string; onDelete: (() => void);
}) {
  const { name, title, teacher, group } = course;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // TODO: edit and add course
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
            <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
              <CloseIcon />
            </IconButton>
            <Button startIcon={<EditIcon />}>
              Edit
            </Button>
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
      </Box>
    </Paper>
  );
};
