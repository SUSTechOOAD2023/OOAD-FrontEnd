import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

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
    </Container>
  )
}