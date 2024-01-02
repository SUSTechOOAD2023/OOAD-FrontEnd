'use client'

import Box from "@mui/material/Box"
import NoticeBoard from "./NoticeBoard"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import DeadlineCalendar from "./DeadlineCalendar"
import DailyNew from "./DailyNew"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./userContext"
import { getStudentId } from "./identityIdHandler"

export default function MainPage() {
  const { id, identity } = useContext(UserContext)
  const [studentId, setStudentId] = useState<string>("")
  
  useEffect(() => {
    if (identity === "student") {
      getStudentId(id).then(id => setStudentId(id))
    }
  }, [])

  return (
    <Container 
      sx={{
        mt: 4, 
        mb: 4
      }}
    >
      <Grid container columnSpacing={2} rowSpacing={10} justifyContent="space-between">
        <Grid item xs={12} md={5} lg={6.5}>
          <Paper
            sx={{
              p: 2, 
              display: "flex", 
              flexDirection: "column", 
            }}
          >
            <NoticeBoard id={studentId}/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={7} lg={4.5}>
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