'use client'

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ChatIcon from '@mui/icons-material/Chat';
import Link from 'next/link';
import { useContext, useEffect, useState } from "react";
import { getIdentity } from "./identityHandler";
import { UserContext } from "./userContext";

export default function DrawerItemList() {
  const { id, identity } = useContext(UserContext)

  return (
    <List sx={{ flexGrow: 1 }}>
      {identity !== "SA" &&
        <ListItem key="Course" disablePadding>
          <ListItemButton component={Link} href='/dashboard/course'>
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Course" />
          </ListItemButton>
        </ListItem>
      }
      {identity !== "SA" &&
        <ListItem key="Group" disablePadding>
          <ListItemButton component={Link} href='/dashboard/group'>
            <ListItemIcon>
              <GroupsIcon />
            </ListItemIcon>
            <ListItemText primary="Group" />
          </ListItemButton>
        </ListItem>
      }
      <ListItem key="Assignment" disablePadding>
        <ListItemButton component={Link} href='/dashboard/homework'>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Assignment" />
        </ListItemButton>
      </ListItem>
      <ListItem key="Board" disablePadding>
        <ListItemButton component={Link} href='/dashboard/chat'>
          <ListItemIcon>
            <ChatIcon />
          </ListItemIcon>
          <ListItemText primary="Board" />
        </ListItemButton>
      </ListItem>
    </List>
  );
}
