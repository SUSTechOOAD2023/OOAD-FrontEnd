import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon"
import Container from "@mui/material/Container";
import SchoolIcon from '@mui/icons-material/School';
import Copyright from "../Copyright";

const drawerWidth = 240

export default function MainPage() {
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
      <Container 
        component="main"
        sx={{
            flexShrink: 1, 
            p: 3, 
            minHeight: "100vh"
        }}
      >
        <Toolbar />
        <Copyright sx={{ mb: 4 }} />
      </Container>
      
    </Box>
  )
}