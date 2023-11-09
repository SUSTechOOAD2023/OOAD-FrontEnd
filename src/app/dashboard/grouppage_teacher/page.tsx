"use client";

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

import CloseIcon from "@mui/icons-material/Close";

function InformationBox({
  GroupName,
  GroupId,
  GroupSize,
  GroupDeadline,
  onEdit,
  onDelete,
}) {
  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState(GroupName);
  const [editedGroupId, setEditedGroupId] = useState(GroupId);
  const [editedGroupSize, setEditedGroupSize] = useState(GroupSize);
  const [editedGroupDeadline, setEditedGroupDeadline] = useState(GroupDeadline);

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleSaveClick = () => {
    onEdit(editedName, editedGroupId, editedGroupSize, editedGroupDeadline);
    setOpen(false);
  };
  const handleDelete = () => {
    onDelete();
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleRedirect = () => {};

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "2vh" }}>
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Box onClick={handleRedirect} sx={{ cursor: "pointer" }}>
            <Paper
              elevation={3}
              style={{ padding: "20px", position: "relative" }}
            >
              <Box>
                <Typography variant="h5" component="h2">
                  {GroupName}
                </Typography>
                <Typography variant="body2">
                  id:&nbsp;&nbsp;&nbsp;{GroupId}
                </Typography>
                <Typography variant="body2">size:&nbsp;{GroupSize}</Typography>
                <Typography variant="body2">
                  ddl:&nbsp;&nbsp;{GroupDeadline}
                </Typography>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "95px",
                  left: "260px",
                }}
              >
                <IconButton
                  aria-label="fingerprint"
                  onClick={handleDelete}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  bottom: "5px",
                  left: "235px",
                }}
              >
                <Button variant="text" onClick={handleEditClick}>
                  Edit
                </Button>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          <Grid item xs={10} style={{ marginTop: "10px" }}>
            <TextField
              label="GroupName"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} style={{ marginTop: "10px" }}>
            <TextField
              label="Group ID"
              value={editedGroupId}
              onChange={(e) => setEditedGroupId(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} style={{ marginTop: "10px" }}>
            <TextField
              label="GroupSize"
              value={editedGroupSize}
              onChange={(e) => setEditedGroupSize(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={10} style={{ marginTop: "10px" }}>
            <TextField
              label="GroupDeadline"
              value={editedGroupDeadline}
              onChange={(e) => setEditedGroupDeadline(e.target.value)}
              fullWidth
            />
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
    </Box>
    </Container>
  );
}

function InformationBoxesContainer() {
  const [informationBoxes, setInformationBoxes] = useState([
    {
      GroupName: "Group1",
      GroupId: "12110924",
      GroupSize: 5,
      GroupDeadline: "2000.2.30",
    },
    {
      GroupName: "Group2",
      GroupId: "12110924",
      GroupSize: 3,
      GroupDeadline: "2000.2.31",
    },
  ]);

  const addInformationBox = () => {
    const newInformationBox = {
      GroupName: "NewGroup",
      GroupId: "NewId",
      GroupSize: 0,
      GroupDeadline: "0.0.0",
    };
    setInformationBoxes([...informationBoxes, newInformationBox]);
  };

  const handleInformationBoxEdit = (
    index,
    GroupName,
    GroupId,
    GroupSize,
    GroupDeadline
  ) => {
    const updatedInformationBoxes = [...informationBoxes];
    updatedInformationBoxes[index].GroupName = GroupName;
    updatedInformationBoxes[index].GroupId = GroupId;
    updatedInformationBoxes[index].GroupSize = GroupSize;
    updatedInformationBoxes[index].GroupDeadline = GroupDeadline;
    setInformationBoxes(updatedInformationBoxes);
  };

  const handleDelete = (index) => {
    const updatedInformationBoxes = informationBoxes.filter(
      (_, i) => i !== index
    );
    setInformationBoxes(updatedInformationBoxes);
  };

  return (
    <Container component="main" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Button
          color="secondary"
          sx={{ position: "absolute", top: 100, right: 50 }}
          onClick={addInformationBox}
        >
          New
        </Button>
        {informationBoxes.map((informationBox, index) => (
          <div key={index} style={{ width: "350px", height: "160px" }}>
            <InformationBox
              GroupName={informationBox.GroupName}
              GroupId={informationBox.GroupId}
              GroupSize={informationBox.GroupSize}
              GroupDeadline={informationBox.GroupDeadline}
              onEdit={(GroupName, GroupId, GroupSize, GroupDeadline) =>
                handleInformationBoxEdit(
                  index,
                  GroupName,
                  GroupId,
                  GroupSize,
                  GroupDeadline
                )
              }
              onDelete={() => handleDelete(index)}
            />
          </div>
        ))}
      </Box>
    </Container>
  );
}

export default InformationBoxesContainer;
