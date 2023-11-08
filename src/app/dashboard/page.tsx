import Box from "@mui/material/Box"
import NoticeBoard from "./NoticeBoard"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"

export default function MainPage() {
  return (
    <Container 
      sx={{
        mt: 4, 
        mb: 4
      }}
    >
      <Grid container columnSpacing={4} rowSpacing={16} justifyContent="space-between">
        <Grid item xs={7}>
          <Paper
            sx={{
              p: 2, 
              display: "flex", 
              flexDirection: "column", 
              height: 350
            }}
          >
            <NoticeBoard />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}