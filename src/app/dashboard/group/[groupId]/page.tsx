"use client";

import React, { useState } from "react";
import {
  Avatar,
  Button,
  Grid,
  Typography,
  Box,
  Dialog,
  DialogTitle,
  TextField,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function GroupPage({ params }: { params: { groupId: number } }) {
  const groupMembers = [
    { name: "hutaoA", avatar: "/hutao1.png" },
    { name: "hutaoB", avatar: "/hutao1.png" },
    { name: "hutaoC", avatar: "/hutao1.png" },
  ];
  let GroupInfo = "This is a OOAD project";
  const [GroupName, setName] = useState("OOAD-1");
  const [GroupId, setGroupId] = useState(params.groupId);
  const [GroupSize, setGroupSize] = useState(3);
  const [GroupDeadline, setGroupDeadline] = useState(dayjs());
  const [GroupTeacher, setGroupTeacher] = useState("LHY");
  const cookie = 1;
  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState(GroupName);
  const [editedGroupId, setEditedGroupId] = useState(GroupId);
  const [editedGroupSize, setEditedGroupSize] = useState(GroupSize);
  const [editedGroupDeadline, setEditedGroupDeadline] = useState(GroupDeadline);
  const [editedGroupTeacher, setEditedGroupTeacher] = useState(GroupTeacher);
  function JoinGroup(): void {}

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleSaveClick = () => {
    setName(editedName);
    setGroupId(editedGroupId);
    setGroupSize(editedGroupSize);
    setGroupDeadline(editedGroupDeadline);
    setGroupTeacher(editedGroupTeacher);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (date: any) => {
    setEditedGroupDeadline(date);
  };

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="60%"
        margin="auto"
      >
        <Typography variant="h4" marginTop={2}>
          {GroupName}
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop={1}>
          {GroupId}
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop={1}>
          {GroupTeacher}
        </Typography>
      </Box>
      <Box
        width="90%"
        maxWidth="90vw"
        margin="50px"
        border={1}
        p={2}
        textAlign="center"
      >
        <Typography variant="h6">&nbsp;&nbsp;Member:</Typography>
        <Grid container justifyContent="space-around">
          {groupMembers.map((member, index) => (
            <Grid item key={index} xs={1} container direction="column">
              <Grid item>
                <Avatar
                  alt={member.name}
                  src={member.avatar}
                  style={{ width: "100px", height: "100px" }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h6" align="center">
                  {member.name}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>
      {cookie === 1 && (
        <Button
          variant="text"
          style={{
            position: "absolute",
            right: 100,
            marginTop: -20,
          }}
          onClick={() => JoinGroup()}
        >
          Join
        </Button>
      )}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="60%"
        margin="auto"
      >
        <Typography variant="body1" marginTop={2}>
          Group Size: {GroupSize}
        </Typography>
        <Typography variant="body1" marginTop={2}>
          Deadline: {GroupDeadline.format("YYYY-MM-DD")}
        </Typography>
        <Typography variant="body1" marginTop={2}>
          {GroupInfo}
        </Typography>
      </Box>
      <Box
        sx={{
          position: "absolute",
          up: "5px",
          right: "100px",
        }}
      >
        {cookie === 1 && (
          <Button variant="text" onClick={handleEditClick}>
            Edit
          </Button>
        )}
      </Box>
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
              label="Teacher"
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
    </div>
  );
}

export default GroupPage;
