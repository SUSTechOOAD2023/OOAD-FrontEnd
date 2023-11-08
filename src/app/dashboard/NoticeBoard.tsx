import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const annoucements = [
  { name: "Test 1", author: "OOAD", href: "" }, 
  { name: "Test 2", author: "DSAA", href: "" }
]

export default function NoticeBoard() {
  return (
    <>
      <Typography variant="h6" color="primary" paddingBottom={2}>
        Annoucement
      </Typography>
      <Divider />
      <Stack
        divider={<Divider />}
      >
        {[0, 1, 2, 3, 4].map((value => {
          if (value < annoucements.length) {
            return (
              <Box 
                key={`annoucement-${value}`} 
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                height={40}
              >
                <Typography 
                  component={Link} 
                  href={annoucements[value].href}
                  color="text.primary"
                  sx={{
                    textDecoration: "none"
                  }}
                >
                  {annoucements[value].name}
                </Typography>
                <Typography color="text.secondary">
                  {annoucements[value].author}
                </Typography>
              </Box>
            )
          } else {
            return (
              <Box key={`annoucement-${value}`} height={40} />
            )
          }
        }))}
      </Stack>
      <Divider />
      <Pagination 
        count={5} 
        color="primary" 
        sx={{
          display: "flex", 
          justifyContent: "center", 
          mt: 3
        }}
      />
    </>
  )
}