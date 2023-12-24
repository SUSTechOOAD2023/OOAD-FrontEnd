"use client";
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
  Tabs,
  Tab,
  Pagination,
  Stack,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import groupNew from "./groupHandler";
import InformationBox from "./InformationBox";
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

function InformationBoxesContainer() {
  const [informationBoxes, setInformationBoxes] = useState([
    {
      GroupName: "Group1",
      GroupId: 12110924,
      GroupSize: 5,
      GroupDeadline: dayjs(),
      GroupTab: 0,
      GroupTeacher: "LHY",
    },
    {
      GroupName: "Group2",
      GroupId: 12110924,
      GroupSize: 3,
      GroupDeadline: dayjs().add(1, "day"),
      GroupTab: 1,
      GroupTeacher: "LHY",
    },
  ]);

  const addInformationBox = () => {
    setOpen(true);
  };

  const handleInformationBoxEdit = (
    index: number,
    GroupName: string,
    GroupId: number,
    GroupSize: number,
    GroupDeadline: any,
    GroupTeacher: string
  ) => {
    const updatedInformationBoxes = [...informationBoxes];
    updatedInformationBoxes[index].GroupName = GroupName;
    updatedInformationBoxes[index].GroupId = GroupId;
    updatedInformationBoxes[index].GroupSize = GroupSize;
    updatedInformationBoxes[index].GroupDeadline = GroupDeadline;
    updatedInformationBoxes[index].GroupTeacher = GroupTeacher;
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

  //
  const [open, setOpen] = useState(false);
  const [editedName, setEditedName] = useState("GroupName");
  const [editedGroupId, setEditedGroupId] = useState(0);
  const [editedGroupSize, setEditedGroupSize] = useState(0);
  const [editedGroupDeadline, setEditedGroupDeadline] = useState(dayjs());
  const [editedGroupTeacher, setEditedGroupTeacher] = useState("GroupTeacher");

  const handleSaveClick = async (tabindex: number) => {
    const responseText = await groupNew({
      groupDeadline: dayjs(),
      groupName: editedName,
      groupNumber: editedGroupId,
      groupSize: editedGroupSize,
      groupTask: "",
      teacherId: 0,
    });
    if (responseText === "success!") {
      const newInformationBox = {
        GroupName: editedName,
        GroupId: editedGroupId,
        GroupSize: editedGroupSize,
        GroupDeadline: editedGroupDeadline,
        GroupTab: tabindex,
        GroupTeacher: editedGroupTeacher,
      };
      setInformationBoxes([...informationBoxes, newInformationBox]);
    } else {
      console.log("404");
    }
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChange = (date: any) => {
    setEditedGroupDeadline(date);
  };

  const tabspage = (tabindex: number, pageindex: number) => {
    //单个page
    let count = 0;

    return (
      <Box
        sx={{
          marginTop: 0,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {identity === 1 && (
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "1400px",
            }}
          >
            <IconButton
              aria-label="fingerprint"
              onClick={() => addInformationBox()}
              color="primary"
            >
              <AddCircleIcon style={{ fontSize: '50px' }}/>
            </IconButton>
          </Box>
        )}
        {informationBoxes.map((informationBox, index) => {
          if (informationBox.GroupTab === tabindex) {
            count = count + 1;
            if (count >= pageindex * 9 - 8 && count <= pageindex * 9) {
              return (
                <Box key={index} style={{ width: "350px", height: "180px" }}>
                  <InformationBox
                    GroupName={informationBox.GroupName}
                    GroupId={informationBox.GroupId}
                    GroupSize={informationBox.GroupSize}
                    GroupDeadline={informationBox.GroupDeadline}
                    GroupTeacher={informationBox.GroupTeacher}
                    onEdit={(
                      GroupName,
                      GroupId,
                      GroupSize,
                      GroupDeadline,
                      GroupTeacher
                    ) =>
                      handleInformationBoxEdit(
                        index,
                        GroupName,
                        GroupId,
                        GroupSize,
                        GroupDeadline,
                        GroupTeacher
                      )
                    }
                    onDelete={() => handleDelete(index)}
                    identity={identity}
                  />
                </Box>
              );
            }
          }
          return null;
        })}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>New Group</DialogTitle>
          <DialogContent>
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                label="New Name"
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
            <Button
              variant="contained"
              onClick={() => handleSaveClick(tabindex)}
            >
              Save
            </Button>
            <Button variant="contained" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    );
  };
  const tabs = (tabindex: number) => {
    return (
      <Stack spacing={2}>
        {tabspage(tabindex, page)}
        <Pagination
          count={10}
          page={page}
          onChange={handleChangePage}
          style={{
            position: "fixed",
            bottom: "10px",
            left: "55%",
            transform: "translateX(-55%)",
            zIndex: "999",
          }}
        />
      </Stack>
    );
  };
  const identity = 1; //0 student   1 teacher
  const [page, setPage] = React.useState(1);
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };
  return (
    //tab
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
          {tabs(0)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {tabs(1)}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          {tabs(2)}
        </CustomTabPanel>
      </Box>
    </Container>
  );
}

export default InformationBoxesContainer;
