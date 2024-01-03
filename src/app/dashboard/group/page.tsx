"use client";
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Container,
  IconButton,
  Tabs,
  Tab,
  Pagination,
  Stack,
  MenuItem,
  ListItemText,
  ListItem,
  Select,
} from "@mui/material";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import {
  groupNew,
  getAll,
  getMy,
  DeleteGroup,
  groupEdit,
  getSelc,
} from "./groupHandler";
import InformationBox from "./InformationBox";
import { getId } from "../accountIdHandler";
import { getIdentity } from "../identityHandler";
import { getTeachers, getCourse } from "../course/[courseId]/courseHandler";
import getCourseOverview from "../course/courseOverviewHandler";

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
      GroupTab: 1,
      GroupTeacher: "LHY",
      GroupHide: 0,
    },
    {
      GroupName: "Group2",
      GroupId: 12110924,
      GroupSize: 3,
      GroupDeadline: dayjs().add(1, "day"),
      GroupTab: 2,
      GroupTeacher: "LHY",
      GroupHide: 0,
    },
  ]);
  const cour = [
    { name: "OOAD", id: 1 },
    { name: "DSAA", id: 3 },
    { name: "CS110", id: 4 },
  ];
  const [course, setCourse] = useState(cour);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(0);
  const [editedName, setEditedName] = useState("GroupName");
  const [editedGroupNumber, setEditedGroupNumber] = useState(1);
  const [editedGroupDeadline, setEditedGroupDeadline] = useState(dayjs());
  const [Teachers, setTeachers] = useState("");
  const [Sizes, setSizes] = useState(5);
  const [editedGroupHide, setEditedGroupHide] = useState(0);
  const [identity, setIdentity] = useState("student");
  const [selectedValues, setSelectedValues] = useState({
    expired: "-1",
    valid: "-1",
    visible: "-1",
  });
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    let paramA = searchParams.get("course");
    if (paramA === null) paramA = "1";
    const classid = parseInt(paramA); //maybe need to fix:当没有classid1时出错
    getCourseOverview("1", "admin").then((getcourse) => {
      const newcourse = getcourse.map((item) => ({
        name: item.name,
        id: parseInt(item.id),
      }));
      setCourse(newcourse);
      setValue(newcourse.findIndex((item) => item.id === classid));
    });
    Promise.all([
      getIdentity(),
      getCourse(classid.toString()),
      getTeachers(classid.toString()),
    ]).then(([identity, getcourse, getteachers]) => {
      setIdentity(identity);
      let s = Sizes;
      if (getcourse !== null) {
        setSizes(getcourse.groupHigh);
        s = getcourse.groupHigh;
      }
      const teachers = getteachers.map((item) => item.name).join(",");
      setTeachers(teachers);
      getAll(classid, identity).then((getall) => {
        const newinfo = getall.map((item) => ({
          GroupTab: item.classId,
          GroupDeadline: dayjs(item.groupDeadline),
          GroupId: item.groupId,
          GroupName: item.groupName,
          GroupSize: s,
          GroupTeacher: teachers,
          GroupHide: 0,
        }));
        setInformationBoxes(newinfo);
      });
    });
  }, []);

  const handleValueChange = (event, option,tabindex: number) => {
    const newValues = {
      ...selectedValues,
      [option]: event.target.value,
    };
    
    setSelectedValues(newValues);

    getSelc(tabindex,newValues.expired,newValues.valid,newValues.visible).then((getall) => {
      const newinfo = getall.map((item) => ({
        GroupTab: item.classId,
        GroupDeadline: dayjs(item.groupDeadline),
        GroupId: item.groupId,
        GroupName: item.groupName,
        GroupSize: Sizes,
        GroupTeacher: Teachers,
        GroupHide: 0,
      }));
      setInformationBoxes(newinfo);
    });
    //need to do
  };

  const addInformationBox = () => {
    setOpen(true);
  };

  const handleInformationBoxEdit = async (
    index: number,
    GroupName: string,
    GroupDeadline: any,
    GroupTeacher: string,
    GroupHide: number
  ) => {
    const responseText = await groupEdit(0, {
      classId: index,
      groupDeadline: GroupDeadline.format("YYYY-MM-DDThh:mm:ss"),
      groupName: GroupName,
      groupTask: "",
      groupVisible: GroupHide,
      preName:"",
      preTime:"",
    });
    if (responseText === "success!") {
      const updatedInformationBoxes = [...informationBoxes];
      updatedInformationBoxes[index].GroupName = GroupName;
      updatedInformationBoxes[index].GroupDeadline = GroupDeadline;
      updatedInformationBoxes[index].GroupTeacher = GroupTeacher;
      updatedInformationBoxes[index].GroupHide = GroupHide;
      setInformationBoxes(updatedInformationBoxes);
    } else {
      console.log("404");
    }
  };

  const handleDelete = async (index: number, id: number) => {
    const res = await DeleteGroup(id);
    if (res == true) {
      const updatedInformationBoxes = informationBoxes.filter(
        (_, i) => i !== index
      );
      setInformationBoxes(updatedInformationBoxes);
    }
  };
  const [value, setValue] = React.useState(0);

  const handleChange = async (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
    if (open2 === 0) {
      getAll(course[newValue].id, identity).then((getall) => {
        const newinfo = getall.map((item) => ({
          GroupTab: item.classId,
          GroupDeadline: dayjs(item.groupDeadline),
          GroupId: item.groupId,
          GroupName: item.groupName,
          GroupSize: Sizes,
          GroupTeacher: Teachers,
          GroupHide: 0,
        }));
        setInformationBoxes(newinfo);
      });
    } else {
    }
  };
  const handleSaveClick = async (tabindex: number) => {
    for (let i = 0; i < editedGroupNumber; i++) {
      const responseText = await groupNew(
        tabindex,
        editedName,
        editedGroupDeadline.format("YYYY-MM-DD hh:mm:ss")
      );
      if (responseText !== 0) {
        const newInformationBox = {
          GroupName: editedName,
          GroupId: responseText,
          GroupSize: Sizes,
          GroupDeadline: editedGroupDeadline,
          GroupTab: tabindex,
          GroupTeacher: Teachers,
          GroupHide: editedGroupHide,
        };
        setInformationBoxes((prevInformationBoxes) => [
          ...prevInformationBoxes,
          newInformationBox,
        ]);
      } else {
        console.log("404");
      }
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

    const handleAllGroupClick = async () => {
      getAll(tabindex, identity).then((getall) => {
        const newinfo = getall.map((item) => ({
          GroupTab: item.classId,
          GroupDeadline: dayjs(item.groupDeadline),
          GroupId: item.groupId,
          GroupName: item.groupName,
          GroupSize: Sizes,
          GroupTeacher: Teachers,
          GroupHide: 0,
        }));
        setInformationBoxes(newinfo);
        setOpen2(0);
      });
    };

    const handleMyGroupClick = async () => {
      getId().then((id) => {
        getMy(tabindex, id).then((getmy) => {
          if (identity === "teacher") {
            const newinfo = [
              {
                GroupTab: getmy.classId,
                GroupDeadline: dayjs(getmy.groupDeadline),
                GroupId: getmy.groupId,
                GroupName: getmy.groupName,
                GroupSize: getmy.groupSize,
                GroupTeacher: "LHY", //need to do
                GroupHide: 0,
              },
            ];
            setInformationBoxes(newinfo);
          }
          setOpen2(1);
        });
      });
    };

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
        {(identity === "teacher" || identity === "admin") && (
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
              <AddCircleIcon style={{ fontSize: "50px" }} />
            </IconButton>
          </Box>
        )}
        <Box
          sx={{
            position: "absolute",
            bottom: "10px",
            left: "300px",
          }}
        >
          {identity === "student" && open2 === 1 && (
            <Button variant="text" onClick={handleAllGroupClick}>
              All Group
            </Button>
          )}
          {identity === "student" && open2 === 0 && (
            <Button variant="text" onClick={handleMyGroupClick}>
              My Group
            </Button>
          )}
        </Box>

        {(identity === "teacher" || identity === "admin") && (
          <Box
            sx={{
              position: "absolute",
              bottom: "10px",
              left: "320px",
            }}
            display="flex"
            flexDirection="row"
          >
            <TextField
              label="Expired"
              select
              value={selectedValues.expired}
              onChange={(event) => handleValueChange(event, "expired",tabindex)}
              size="small"
            >
              <MenuItem value="1">True</MenuItem>
              <MenuItem value="0">False</MenuItem>
              <MenuItem value="-1">None</MenuItem>
            </TextField>
            <TextField
              label="Valid"
              select
              value={selectedValues.valid}
              onChange={(event) => handleValueChange(event, "valid",tabindex)}
              size="small"
              sx={{ml: 1}}
            >
              <MenuItem value="1">True</MenuItem>
              <MenuItem value="0">False</MenuItem>
              <MenuItem value="-1">None</MenuItem>
            </TextField>
            <TextField
              label="Visible"
              select
              value={selectedValues.visible}
              onChange={(event) => handleValueChange(event, "visible",tabindex)}
              size="small"
              sx={{ml: 1}}
            >
              <MenuItem value="1">True</MenuItem>
              <MenuItem value="0">False</MenuItem>
              <MenuItem value="-1">None</MenuItem>
            </TextField>
          </Box>
        )}
        {informationBoxes.map((informationBox, index) => {
          if (
            informationBox.GroupTab === tabindex &&
            (informationBox.GroupHide === 0 || open2 === 1)
          ) {
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
                    GroupHide={informationBox.GroupHide}
                    onEdit={(
                      GroupName,
                      GroupDeadline,
                      GroupTeacher,
                      GroupHide
                    ) =>
                      handleInformationBoxEdit(
                        index,
                        GroupName,
                        GroupDeadline,
                        GroupTeacher,
                        GroupHide
                      )
                    }
                    onDelete={() => handleDelete(index, informationBox.GroupId)}
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
                label="Group Visibility"
                value={editedGroupHide === 1 ? "Hide" : "No hide"}
                select
                onChange={(e: { target: { value: string } }) => {
                  const inputValue = e.target.value;

                  if (inputValue === "Hide") {
                    setEditedGroupHide(1);
                  } else {
                    setEditedGroupHide(0);
                  }
                }}
                fullWidth
              >
                <MenuItem value="Hide">Hide</MenuItem>
                <MenuItem value="No hide">no hide</MenuItem>
              </TextField>
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
            <Grid item xs={12} style={{ marginTop: "10px" }}>
              <TextField
                label="Number of new groups"
                value={editedGroupNumber}
                onChange={(e: { target: { value: string } }) => {
                  const inputValue = parseInt(e.target.value);

                  if (!isNaN(inputValue)) {
                    setEditedGroupNumber(inputValue);
                  } else {
                    setEditedGroupNumber(0);
                  }
                }}
                fullWidth
              />
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
            {course.map((item, index) => (
              <Tab key={index} label={item.name} {...a11yProps(index)} />
            ))}
          </Tabs>
        </Box>
        {course.map((item, index) => (
          <CustomTabPanel value={value} index={index} key={index}>
            {tabs(item.id)}
          </CustomTabPanel>
        ))}
      </Box>
    </Container>
  );
}

export default InformationBoxesContainer;
