'use client'

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { getStudentId } from "../identityIdHandler";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { Button, Container, TextField, Typography } from "@mui/material";
import { getChat, sendChat } from "./chatHandler";

export default function ChatPage() {
  const { id, identity } = useContext(UserContext)
  const [studentId, setStudentId] = useState<string>("")
  const [chat, setChat] = useState<string[]>([])
  const [students, setStudents] = useState<string[]>([])
  const [submit, setSubmit] = useState<string>("")

  useEffect(() => {
    if (identity === "student") {
      getStudentId(id).then(id => setStudentId(id))
    }
  }, [])

  const setAllChat = () => {
    getChat().then(chats => {
      setChat(chats.map(chat => chat.content))
      setStudents(chats.map(chat => chat.name))
    })
  }
  
  useEffect(() => {
    setAllChat()
  }, [])

  return (
    <Container
      sx={{
        mt: 4, 
        mb: 4
      }}
    >
      <Paper
        sx={{
          p: 2, 
          display: "flex", 
          flexDirection: "column", 
        }}
      >
        <Typography variant="h6" color="primary" paddingBottom={2}>
          Chat Board
        </Typography>
        <Divider />
        <Stack divider={ <Divider /> }>
          {chat.map((value, index) => {
            return (
              <Box 
                key={value + students[index]}
                display="flex" 
                alignItems="center" 
                justifyContent="space-between"
                minHeight={35}
              >
                <Typography color="text.primary">
                  {value}
                </Typography>
                <Typography color="text.secondary">
                  {students[index]}
                </Typography>
              </Box>
            )
          })}
          {identity === "student" &&
            <Box display="flex" sx={{ mt: 1 }}>
              <TextField 
                label="Chat content"
                multiline
                fullWidth
                value={submit}
                onChange={(event) => setSubmit(event.target.value)}
                sx={{ mr: 1 }}
              />
              <Button variant="contained" onClick={() => {
                sendChat(studentId, submit).then(ok => {
                  if (ok) {
                    setSubmit("")
                    setAllChat()
                  }
                })
              }}>
                Submit
              </Button>
            </Box>
          }
        </Stack>
      </Paper>
    </Container>
  )
}