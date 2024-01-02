"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
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
  IconButton,
  Stack,
  Divider,
  Paper,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  InputBase,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getId } from "../../accountIdHandler";
import {
  Invite,
  groupEdit,
  Exit,
  getInfo,
  Join,
  getStudent,
  getInvites,
} from "../groupHandler";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CloseIcon from "@mui/icons-material/Close";
import ViewList from "../../course/[courseId]/ViewList";
import { getCourse } from "../../course/[courseId]/courseHandler";
import { getIdentity } from "../../identityHandler";
import { styled } from "@mui/material/styles";
import UserAvatar from "../../UserAvatar";

export interface User {
  id: string;
  name: string;
}

function GroupPage({ params }: { params: { groupId: number } }) {
  const Members = [
    { name: "hutaoA", id: "0" },
    { name: "hutaoB", id: "1" },
    { name: "hutaoC", id: "2" },
  ];
  const pre = [
    { name: "pre1", time: dayjs() },
    { name: "pre2", time: dayjs(1000000) },
  ];
  const [groupPre, setGroupPre] = useState(pre);
  const [groupMembers, setGroupMembers] = useState(Members);
  const [MembersCount, setMembersCount] = useState(3);
  const [GroupName, setName] = useState("OOAD-1");
  const [GroupId, setGroupId] = useState(params.groupId);
  const [GroupSize, setGroupSize] = useState(5);
  const [GroupMinSize, setGroupMinSize] = useState(5);
  const [GroupDeadline, setGroupDeadline] = useState(dayjs());
  const [GroupTeacher, setGroupTeacher] = useState("LHY");
  const [GroupInfo, setGroupInfo] = useState("This is a OOAD project");
  const [identity, setIdentity] = useState("student");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open5, setOpen5] = useState(false);
  const [join, setJoin] = useState(0);
  const [exitid, setExitid] = useState(1);
  const [editedName, setEditedName] = useState(GroupName);
  const [editedGroupId, setEditedGroupId] = useState(GroupId);
  const [editedGroupSize, setEditedGroupSize] = useState(GroupSize);
  const [editedGroupMinSize, setEditedGroupMinSize] = useState(GroupMinSize);
  const [editedGroupDeadline, setEditedGroupDeadline] = useState(GroupDeadline);
  const [editedGroupTeacher, setEditedGroupTeacher] = useState(GroupTeacher);
  const [editedGroupInfo, setEditedGroupInfo] = useState(GroupInfo);
  const [editedPre, setEditedPre] = useState(pre);
  const [preindex, setpreindex] = useState(0);
  const [checked, setChecked] = useState<boolean[]>([]);
  const [students, setStudents] = useState(Members);
  const [myid, SetMyid] = useState(1);
  const [alertDisplay, setAlertDisplay] = useState(
    MembersCount < GroupMinSize ? "flex" : "none"
  );
  useEffect(() => {
    getId().then((getid) => {
      SetMyid(parseInt(getid));
      getIdentity().then((identity) => {
        setIdentity(identity);
        getInfo(params.groupId).then((getinfo) => {
          setGroupDeadline(dayjs(getinfo.groupDeadline));
          setGroupId(getinfo.groupId);
          setName(getinfo.groupName);
          setGroupInfo(getinfo.groupTask);
          getCourse(getinfo.classId).then((getcourse) => {
            if (getcourse !== null) {
              setGroupMinSize(getcourse.groupLow);
              setGroupSize(getcourse.groupHigh);
            }
          });
          refresh(parseInt(getid));

          //need to do getpre
        });
      });
    });
  }, []);

  const BootstrapInput = styled(InputBase)(({ theme }) => ({
    "label + &": {
      marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  }));
  const refresh = (id = myid) => {
    getStudent(params.groupId).then((getstudent) => {
      const studentinfo = getstudent.map((item) => ({
        name: item.studentName,
        id: item.studentId,
      }));
      setJoin(getstudent.find((item) => item.studentId === id) ? 1 : 0);
      setMembersCount(studentinfo.length);
      setGroupMembers(studentinfo);
    });
  };
  const handleChange = (event) => {
    const e = event.target.value;
    if (e === "new") {
      //need to do
    } else {
      setpreindex(e);
    }
  };

  const handleJoinClick = () => {
    Join(GroupId, myid).then((join) => {
      if (join) {
        refresh();
      }
    });
    setJoin(1);
  };
  const handleExitClick = async () => {
    //setExitid(await getId());
    setExitid(myid);
    setOpen2(true);
  };
  const handleConfirmExit = () => {
    Exit(GroupId, exitid).then((exit) => {
      if (exit) {
        refresh();
      }
    });
    setOpen2(false);
    setOpen5(false);
  };

  const handleEditClick = () => {
    setOpen(true);
  };

  const handleInviteClick = () => {
    getInvites(GroupId).then((getinvites) => {
      let s = getinvites;
      if (identity === "teacher" || identity === "admin")
        s = [...groupMembers, ...s];
      //need to do students
      setStudents(s);
      generateChecked(groupMembers, s);
      setOpen3(true);
    });
  };
  const handleDelete = (id: string) => {
    setExitid(parseInt(id));
    setOpen5(true);
  };
  const handleSaveClick = async () => {
    const responseText = await groupEdit(1, {
      classId: 0,
      groupDeadline: GroupDeadline.format("YYYY-MM-DDThh:mm:ss"),
      groupName: GroupName,
      groupTask: GroupInfo,
      groupVisible: 0,
    });
    if (responseText === "success!") {
      setName(editedName);
      setGroupId(editedGroupId);
      setGroupSize(editedGroupSize);
      setGroupMinSize(editedGroupMinSize);
      setGroupDeadline(editedGroupDeadline);
      setGroupTeacher(editedGroupTeacher);
      setGroupInfo(editedGroupInfo);
      if (MembersCount < GroupMinSize) setAlertDisplay("flex");
    } else {
      console.log("404");
    }
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
  const handleClose5 = () => {
    setOpen5(false);
  };
  const handleDateChange = (date: any) => {
    setEditedGroupDeadline(date);
  };

  const handleDebugClick = () => {
    if (identity === "student") setIdentity("admin");
    if (identity === "admin") setIdentity("teacher");
    if (identity === "teacher") setIdentity("student");
  };

  const generateChecked = (user: User[], allUser: User[]) => {
    const t = {};
    user.forEach((item) => {
      t[item.id] = true;
    });
    setChecked(allUser.map((item) => !!t[item.id]));
  };

  const toggleChecked = (index: number) => {
    const checkedAfter = checked.map((x, curIndex) =>
      curIndex === index ? !x : x
    );
    const checkedNumberAfter = checkedAfter.reduce(
      (current, value) => (value ? current + 1 : current),
      0
    );
    if (checkedNumberAfter <= GroupSize) {
      setChecked(checked.map((x, curIndex) => (curIndex === index ? !x : x)));
    }
  };

  const reflectChecked = (allUser: User[]) => {
    const m = allUser.filter((x, index) => checked[index]);
    if (identity === "teacher" || identity == "admin") {
      m.map((item)=>{
        const id=item.id
        if(!groupMembers.find(item=>item.id===id))Join(GroupId,parseInt(id));
      });
      groupMembers.map((item)=>{
        const id=item.id
        if(!m.find(item=>item.id===id))Exit(GroupId,parseInt(id));
      });
      refresh();
    } else {
      m.map((item) => Invite(GroupId, parseInt(item.id), myid));
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      margin="50px auto auto auto"
    >
      <Box display="flex" flexDirection="column" width="67%" margin="auto">
        <Typography variant="h4" marginTop={2}>
          {GroupName}
        </Typography>
        {identity === "student" && join === 0 && (
          <Button
            variant="outlined"
            style={{
              position: "absolute",
              right: 480,
              marginTop: 20,
            }}
            size="small"
            onClick={handleJoinClick}
            disabled={MembersCount >= GroupSize}
          >
            Join
          </Button>
        )}
        {identity === "student" && join === 1 && (
          <Button
            variant="outlined"
            style={{
              position: "absolute",
              right: 480,
              marginTop: 20,
            }}
            onClick={handleExitClick}
            size="small"
          >
            Exit
          </Button>
        )}
        {(identity === "teacher" || identity === "admin" || join === 1) && (
          <Button
            variant="outlined"
            style={{
              position: "absolute",
              right: 400,
              marginTop: 20,
            }}
            onClick={handleEditClick}
            size="small"
          >
            Edit
          </Button>
        )}
      </Box>
      <Divider style={{ width: "80%", marginTop: 2, marginBottom: 2 }} />

      <Grid
        container
        spacing={6}
        justifyContent="center"
        style={{ minWidth: "100%" }}
      >
        <Grid item style={{ width: "40%" }} marginLeft={15} marginTop={2}>
          <Paper style={{ width: "40%", padding: "10px" }} elevation={3}>
            <Typography
              variant="body1"
              marginTop={2}
              style={{ color: MembersCount < GroupMinSize ? "red" : "inherit" }}
            >
              &nbsp;&nbsp;&nbsp;Group Size:{MembersCount}/{GroupMinSize}-
              {GroupSize}
            </Typography>
            <Typography variant="body1" marginTop={2}>
              &nbsp;&nbsp;&nbsp;Group Teacher:{GroupTeacher}
            </Typography>
            <Typography variant="body1" marginTop={2}>
              &nbsp;&nbsp;&nbsp;Deadline: {GroupDeadline.format("YYYY-MM-DD")}
            </Typography>
            <Typography variant="body1" marginTop={2}>
              &nbsp;&nbsp;&nbsp;{GroupInfo}
            </Typography>
          </Paper>
        </Grid>
        <Grid item style={{ width: "40%" }}>
          <Typography variant="h6">Member:</Typography>
          <Grid container direction="column">
            {groupMembers.map((member, index) => (
              <Grid
                item
                key={index}
                xs={1}
                container
                direction="row"
                marginTop={1}
                alignItems="center"
              >
                <Grid item>
                  <Avatar
                    component={Link}
                    href={`/dashboard/profile/${member.id}`}
                  >
                    <UserAvatar width={50} height={50} id={member.id} />
                  </Avatar>
                </Grid>
                <Grid item marginLeft={1}>
                  <Typography variant="body1" align="center">
                    {member.name}
                  </Typography>
                </Grid>
                <Grid item marginLeft={1}>
                  {(identity === "teacher" || identity === "admin") && (
                    <IconButton
                      aria-label="fingerprint"
                      onClick={() => handleDelete(member.id)}
                      size="small"
                    >
                      <CloseIcon />
                    </IconButton>
                  )}
                </Grid>
              </Grid>
            ))}
            <Grid item>
              {(identity === "teacher" ||
                identity === "admin" ||
                join === 1) && (
                <IconButton
                  aria-label="fingerprint"
                  onClick={handleInviteClick}
                  size="large"
                  disabled={MembersCount >= GroupSize}
                >
                  <AddCircleIcon />
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {1 === 1 && (
        <Button
          variant="outlined"
          style={{
            position: "absolute",
            right: 20,
            marginTop: -20,
          }}
          onClick={handleDebugClick}
        >
          Debug
        </Button>
      )}

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="60%"
        margin="auto"
        component={Link}
        href={`/dashboard/homework/submit`}
      >
        <Typography variant="body1" marginTop={2}>
          Our Assignment
        </Typography>
      </Box>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{ style: { width: "1000px" } }}
      >
        <DialogTitle>Edit Information</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            <Grid item xs={6}>
              <TextField
                label="Group Name"
                value={editedName}
                onChange={(e: {
                  target: { value: React.SetStateAction<string> };
                }) => setEditedName(e.target.value)}
                fullWidth
                disabled={identity === "student"}
              />
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{ minWidth: 255 }}>
                  <DatePicker
                    label="Deadline"
                    defaultValue={editedGroupDeadline}
                    minDate={dayjs()}
                    views={["year", "month", "day"]}
                    onChange={handleDateChange}
                    disabled={identity === "student"}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            {/* need to do */}
            <Grid item xs={6}>
              <TextField
                label="pre name"
                value={editedPre[preindex].name}
                onChange={(e: { target: { value: string } }) => {
                  const inputValue = parseInt(e.target.value);

                  if (!isNaN(inputValue)) {
                    setEditedGroupSize(inputValue);
                  } else {
                    setEditedGroupSize(0);
                  }
                }}
                fullWidth
                disabled={identity === "student"}
              />
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2}>
                  <DatePicker
                    label="pre time"
                    defaultValue={editedPre[preindex].time}
                    minDate={dayjs()}
                    views={["year", "month", "day"]}
                    onChange={handleDateChange}
                    disabled={identity === "student"}
                  />
                </Stack>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={1}>
              <FormControl sx={{ m: 1 }} variant="standard">
                <Select
                  value={preindex}
                  onChange={handleChange}
                  input={<BootstrapInput />}
                >
                  <MenuItem value={0}>
                    <em>1st</em>
                  </MenuItem>
                  <MenuItem value={1}>2nd</MenuItem>
                  <MenuItem value={-1}>+</MenuItem>
                </Select>
              </FormControl>
              {/*need to do*/}
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "20px" }}>
            <TextField
              label="Description"
              value={editedGroupInfo}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setEditedGroupInfo(e.target.value)}
              fullWidth
              multiline
              rows={4}
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

      <Dialog open={open2} onClose={handleClose2}>
        <DialogTitle>Are you sure to exit this group?</DialogTitle>
        <DialogActions>
          <Button variant="text" onClick={handleConfirmExit}>
            Yes
          </Button>
          <Button variant="text" onClick={handleClose2}>
            No
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open3} onClose={() => setOpen3(false)}>
        <DialogTitle>Students</DialogTitle>
        <DialogContent>
          {identity === "teacher" || identity === "admin" ? (
            <ViewList
              name="Search students"
              items={students.map((student) => student.name)}
              refs={students.map(
                (student) => `/dashboard/profile/${student.id}`
              )}
              check={checked}
              onCheckChange={toggleChecked}
            />
          ) : (
            <ViewList
              name="Search students"
              items={students.map((student) => student.name)}
              refs={students.map(
                (student) => `/dashboard/profile/${student.id}`
              )}
              check={checked}
              onCheckChange={toggleChecked}
            />
          )}
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() => {
              setOpen3(false);
              reflectChecked(students);
            }}
          >
            Confirm
          </Button>
          <Button onClick={() => setOpen3(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={open5} onClose={handleClose5}>
        <DialogTitle>
          Are you sure you want to kick this student out of the group?
        </DialogTitle>
        <DialogActions>
          <Button variant="text" onClick={handleConfirmExit}>
            Yes
          </Button>
          <Button variant="text" onClick={handleClose5}>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default GroupPage;
