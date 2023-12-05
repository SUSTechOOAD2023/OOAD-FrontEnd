import Box from "@mui/material/Box"
import NoticeBoard from "./NoticeBoard"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import DeadlineCalendar from "./DeadlineCalendar"
import DailyNew from "./DailyNew"

export default function MainPage() {
  return (
    <Container 
      sx={{
        mt: 4, 
        mb: 4
      }}
    >
      <Grid container columnSpacing={4} rowSpacing={10} justifyContent="space-between">
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
        <Grid item xs={4}>
          <Paper
            sx={{
              p: 2, 
              display: "flex", 
              flexDirection: "column", 
            }}
          >
            <DeadlineCalendar />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2, 
              display: "flex", 
              flexDirection: "column", 
            }}
          >
            <DailyNew />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}