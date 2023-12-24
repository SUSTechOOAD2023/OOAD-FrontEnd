import Link from "next/link";
import React, { useState } from "react";
import {
  Paper,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Container,
  Typography,
  IconButton,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import CloseIcon from "@mui/icons-material/Close";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function InformationBox({
    GroupName,
    GroupId,
    GroupSize,
    GroupDeadline,
    GroupTeacher,
    onEdit,
    onDelete,
    identity,
  }: {
    GroupName: string;
    GroupId: number;
    GroupSize: number;
    GroupDeadline: any;
    GroupTeacher: string;
    onEdit: (
      editedName: string,
      editedGroupId: number,
      editedGroupSize: number,
      editedGroupDeadline: any,
      editedGroupTeacher: string
    ) => void;
    onDelete: () => void;
    identity: number;
  }) {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [editedName, setEditedName] = useState(GroupName);
    const [editedGroupId, setEditedGroupId] = useState(GroupId);
    const [editedGroupSize, setEditedGroupSize] = useState(GroupSize);
    const [editedGroupDeadline, setEditedGroupDeadline] = useState(GroupDeadline);
    const [editedGroupTeacher, setEditedGroupTeacher] = useState(GroupTeacher);
    const handleEditClick = () => {
      setOpen(true);
    };
  
    const handleSaveClick = () => {
      onEdit(
        editedName,
        editedGroupId,
        editedGroupSize,
        editedGroupDeadline,
        editedGroupTeacher
      );
      setOpen(false);
    };
    const handleDelete = () => {
      setOpen(false);
      setOpen2(true);
    };
    const handleConfirmDelete = () => {
      onDelete();
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleClose2 = () => {
      setOpen2(false);
    };
  
    const handleDateChange = (date: any) => {
      setEditedGroupDeadline(date);
    };
  
    return (
      <Container component="main" maxWidth="xs" sx={{ minHeight: "2vh" }}>
        <Box
          sx={{
            marginTop: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <Box>
                <Paper
                  elevation={3}
                  style={{ padding: "20px", position: "relative", }}
                >
                  <Box
                    component={Link}
                    href={`/dashboard/group/${GroupId}`}
                    color="text.primary"
                    sx={{ cursor: "pointer", textDecoration: "none"}}
                  >
                    <Typography variant="h4" component="h2" paddingBottom={1}>
                      {GroupName}
                    </Typography>
                    <Typography variant="body2">
                      <b>Teacher:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                      {GroupTeacher}
                    </Typography>
                    <Typography variant="body2">
                    <b>Id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                      {GroupId}
                    </Typography>
                    <Typography variant="body2">
                    <b>Size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                      {GroupSize}
                    </Typography>
                    <Typography variant="body2">
                    <b>Deadline:&nbsp;&nbsp;&nbsp;</b>
                      {GroupDeadline.format("YYYY-MM-DD")}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "130px",
                      left: "260px",
                    }}
                  >
                    {identity === 1 && (
                      <IconButton
                        aria-label="fingerprint"
                        onClick={handleDelete}
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                  </Box>
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: "5px",
                      left: "235px",
                    }}
                  >
                    {identity === 1 && (
                      <Button variant="text" onClick={handleEditClick}>
                        Edit
                      </Button>
                    )}
                  </Box>
                </Paper>
              </Box>
            </Grid>
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Information</DialogTitle>
            <DialogContent>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <TextField
                  label="Group Name"
                  value={editedName}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setEditedName(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <TextField
                  label="Group ID"
                  value={editedGroupId}
                  onChange={(e: { target: { value: string } }) => {
                    const inputValue = parseInt(e.target.value);
  
                    if (!isNaN(inputValue)) {
                      setEditedGroupId(inputValue);
                    } else {
                      setEditedGroupId(0);
                    }
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <TextField
                  label="Teahcer"
                  value={editedGroupTeacher}
                  onChange={(e: {
                    target: { value: React.SetStateAction<string> };
                  }) => setEditedGroupTeacher(e.target.value)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <TextField
                  label="Group Size"
                  value={editedGroupSize}
                  onChange={(e: { target: { value: string } }) => {
                    const inputValue = parseInt(e.target.value);
  
                    if (!isNaN(inputValue)) {
                      setEditedGroupSize(inputValue);
                    } else {
                      setEditedGroupSize(0);
                    }
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} style={{ marginTop: "10px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Deadline"
                    defaultValue={editedGroupDeadline}
                    minDate={dayjs()}
                    views={["year", "month", "day"]}
                    onChange={handleDateChange}
                  />
                </LocalizationProvider>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button variant="contained" onClick={handleSaveClick}>
                Save
              </Button>
              <Button variant="contained" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog open={open2} onClose={handleClose2}>
            <DialogTitle>Are you sure to delete this group?</DialogTitle>
            <DialogActions>
              <Button variant="text" onClick={handleConfirmDelete}>
                Yes
              </Button>
              <Button variant="text" onClick={handleClose2}>
                No
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
    );
  }
  export default InformationBox;
