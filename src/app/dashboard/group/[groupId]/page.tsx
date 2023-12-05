"use client";

import React from "react";
import { Avatar, Button, Grid, Typography, Box } from "@mui/material";

function GroupPage({ params }: { params: { groupId: string } }) {
  const groupMembers = [
    { name: "hutaoA", avatar: "/hutao1.png" },
    { name: "hutaoB", avatar: "/hutao1.png" },
    { name: "hutaoC", avatar: "/hutao1.png" },
  ];
  const GroupSize = 3;
  const GroupDeadline = new Date();
  const GroupInfo = "This is a OOAD project";
  const GroupName = "OOAD-1";
  const GroupID = params.groupId;
  const cookie = 1;
  function JoinGroup(): void {}

  return (
    <div>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="60%"
        margin="auto"
      >
        <Typography variant="h4" marginTop={2} >
          {GroupName}
        </Typography>
        <Typography variant="body1" color="textSecondary" marginTop={1}>
          {GroupID}
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
        <Typography variant="h6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Member:</Typography>
        <Grid container spacing={5} justifyContent="space-around">
          {groupMembers.map((member, index) => (
            <Grid
              item
              key={index}
              xs={1}
              container
              direction="column"
              alignItems="center"
              style={{ marginLeft: "20px" }}
            >
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
      {cookie===1&&(
      <Button
        variant="contained"
        style={{
          position: "absolute",
          right: 100,
          marginTop: -20,
        }}
        onClick={() => JoinGroup()}
      >
        Join
      </Button>)}
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
          Deadline: {GroupDeadline.toLocaleDateString()}
        </Typography>
        <Typography variant="body1" marginTop={2}>
          {GroupInfo}
        </Typography>
      </Box>
    </div>
  );
}

export default GroupPage;
