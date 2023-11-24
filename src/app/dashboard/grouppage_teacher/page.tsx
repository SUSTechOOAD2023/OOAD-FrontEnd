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
  Tabs,
  Tab,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function InformationBox({
  GroupName,
  GroupId,
  GroupSize,
  GroupDeadline,
  onEdit,
  onDelete,
}: {
  GroupName: string;
  GroupId: string;
  GroupSize: string;
  GroupDeadline: Date;
  onEdit: (
    editedName: string,
    editedGroupId: string,
    editedGroupSize: string,
    editedGroupDeadline: Date
  ) => void;
  onDelete: () => void;
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

  const handleGroupDeadlineChange = (e: {
    target: { name: any; value: any };
  }) => {
    const { name, value } = e.target;
    const updatedDate = new Date(editedGroupDeadline); 
    if (name === "year") {
      updatedDate.setFullYear(value);
    } else if (name === "month") {
      updatedDate.setMonth(value - 1); 
    } else if (name === "day") {
      updatedDate.setDate(value);
    }
    setEditedGroupDeadline(updatedDate);
  };

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
                    id:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{GroupId}
                  </Typography>
                  <Typography variant="body2">
                    size:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{GroupSize}
                  </Typography>
                  <Typography variant="body2">
                    endtime: {GroupDeadline.toLocaleDateString("zh-CN")}
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
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                label="Group Name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                label="Group ID"
                value={editedGroupId}
                onChange={(e) => setEditedGroupId(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                label="Group Size"
                value={editedGroupSize}
                onChange={(e) => setEditedGroupSize(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid
              container
              item
              xs={12}
              spacing={1}
              style={{ marginTop: "10px" }}
            >
              <Grid item xs={4}>
                <TextField
                  label="Year"
                  name="year"
                  value={editedGroupDeadline.getFullYear().toString()}
                  onChange={handleGroupDeadlineChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Month"
                  name="month"
                  value={(editedGroupDeadline.getMonth() + 1).toString()}
                  onChange={handleGroupDeadlineChange}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  label="Day"
                  name="day"
                  value={editedGroupDeadline.getDate().toString()}
                  onChange={handleGroupDeadlineChange}
                  fullWidth
                />
              </Grid>
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
      GroupSize: "5",
      GroupDeadline: new Date(2020, 2, 30),
      GroupTab: 0,
    },
    {
      GroupName: "Group2",
      GroupId: "12110924",
      GroupSize: "3",
      GroupDeadline: new Date(2000, 2, 31),
      GroupTab: 1,
    },
  ]);

  const addInformationBox = (tabindex: number) => {
    const newInformationBox = {
      GroupName: "NewGroup",
      GroupId: "NewId",
      GroupSize: "0",
      GroupDeadline: new Date(),
      GroupTab: tabindex,
    };
    setInformationBoxes([...informationBoxes, newInformationBox]);
  };

  const handleInformationBoxEdit = (
    index: number,
    GroupName: string,
    GroupId: string,
    GroupSize: string,
    GroupDeadline: Date
  ) => {
    const updatedInformationBoxes = [...informationBoxes];
    updatedInformationBoxes[index].GroupName = GroupName;
    updatedInformationBoxes[index].GroupId = GroupId;
    updatedInformationBoxes[index].GroupSize = GroupSize;
    updatedInformationBoxes[index].GroupDeadline = GroupDeadline;
    setInformationBoxes(updatedInformationBoxes);
  };

  const handleDelete = (index: number) => {
    const updatedInformationBoxes = informationBoxes.filter(
      (_, i) => i !== index
    );
    setInformationBoxes(updatedInformationBoxes);
  };
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabspage = (tabindex: number) => {
    return (
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
          variant="contained"
          sx={{ position: "absolute", top: 120, right: 80 }}
          onClick={() => addInformationBox(tabindex)}
        >
          New
        </Button>
        {informationBoxes.map((informationBox, index) => {
          if (informationBox.GroupTab === tabindex) {
            return (
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
            );
          }
          return null;
        })}
      </Box>
    );
  };

  return (
    <Container component="main" sx={{ minHeight: "100vh" }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="OOAD" {...a11yProps(0)} />
            <Tab label="DSAA" {...a11yProps(1)} />
            <Tab label="CS110" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {tabspage(0)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {tabspage(1)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {tabspage(2)}
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

export default InformationBoxesContainer;
