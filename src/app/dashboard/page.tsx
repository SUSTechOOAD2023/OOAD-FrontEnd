import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Copyright from "../Copyright";

export default function MainPage() {
  return (
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
  )
}