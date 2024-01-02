import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import PersonIcon from '@mui/icons-material/Person';
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Copyright from "../Copyright";
import ProfileTip, { ProfileToolTip } from "./ProfileTip";
import Link from 'next/link';
import ButtonBase from "@mui/material/ButtonBase";
import Image from 'next/image';
import Avatar from "@mui/material/Avatar";
import UserAvatar from "./UserAvatar";
import DrawerItemList from "./DrawerItemList";

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
          <ProfileToolTip title={<ProfileTip />}>
            <Avatar component={Link} href="/dashboard/profile">
              <UserAvatar width={40} height={40}/>
            </Avatar>
          </ProfileToolTip>
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
        <DrawerItemList />
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
