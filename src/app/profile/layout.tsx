'use client'
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
import Copyright from "../Copyright";
import { useRouter } from 'next/navigation';
import {AccessAlarm, Settings} from "@mui/icons-material";

const drawerWidth = 240

export default function MainLayout({
                                       children
                                   }: {
    children: React.ReactNode
}) {
    const router = useRouter();
    return (
        <Box display="flex">
            <AppBar color="primary" sx={{ zIndex: 1500 }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        ProGenius
                    </Typography>
                    <Typography variant="h6" component="div">
                        Click to set profile
                    </Typography>
                    <IconButton color="inherit" aria-label="profile" onClick={() => router.push('/profile')}>
                        <Settings />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {children}
        </Box>
    )
}