import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon"
import SchoolIcon from '@mui/icons-material/School';
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import GroupsIcon from '@mui/icons-material/Groups';
import AssignmentIcon from '@mui/icons-material/Assignment';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Copyright from "../Copyright";
import Link from 'next/link';

const drawerWidth = 240


export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box display="flex">
      <AppBar position="fixed" color="primary" sx={{ zIndex: 1500 }}>
        <Toolbar>
          <Button component={Link} href="/dashboard" color="inherit" sx={{ textTransform: "none" }}>
            <Typography variant="h6">
              ProGenius
            </Typography>
          </Button>
          <Typography sx={{ flexGrow: 1 }}/>
          <IconButton component={Link} href="/dashboard/profile" color="inherit" aria-label="profile">
            <PersonIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List sx={{ flexGrow: 1 }}>
          <ListItem key="Course" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Course" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Group" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <GroupsIcon />
              </ListItemIcon>
              <ListItemText primary="Group" />
            </ListItemButton>
          </ListItem>
          <ListItem key="Assignment" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Assignment" />
            </ListItemButton>
          </ListItem>
        </List>
        <Copyright sx={{ mb: 4 }} />
      </Drawer>
      <Box 
        component="main" 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          width: `calc(100% - ${drawerWidth}px)`, 
          minHeight: "100vh", 
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}