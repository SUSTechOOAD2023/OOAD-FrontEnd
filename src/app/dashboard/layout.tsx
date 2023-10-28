import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon"
import SchoolIcon from '@mui/icons-material/School';

const drawerWidth = 240

export default function MainLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <Box display="flex">
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
        <List>
          <ListItem key="Class" disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SchoolIcon />
              </ListItemIcon>
              <ListItemText primary="Class" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      {children} 
    </Box>
  )
}