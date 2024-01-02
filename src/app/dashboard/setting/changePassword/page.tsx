'use client'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import postChange from './passwordHandler';
import { Snackbar } from '@mui/material';

export default function LoginPage() {
  const router = useRouter()
  const [alertDisplay, setAlertDisplay] = useState("none")
  const [alertDisplay2, setAlertDisplay2] = useState(false)
  const [alertText, setAlertText] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
        email: data.get("oldPassword"),
        password: data.get("newPassword"),
        identity: data.get("newPassword2"), 
      });
    const old = data.get("oldPassword")?.toString();
    const new1 = data.get("newPassword")?.toString();
    const new2 = data.get("newPassword2")?.toString();
    if (old && new1 && new2) {
        if (new1 !== new2){
        setAlertText("The entered passwords do not match!")
        setAlertDisplay("flex")
        }
        else {
            const res = await postChange({
                "old": old,
                "new": new2
            })
            if (res === "Wrong password!") {
              setAlertText("The old password is wrong!")
              setAlertDisplay("flex")
            }
            else {
              setAlertText("Change successfully, routing to main page...")
              setAlertDisplay("none")
              setAlertDisplay2(true)
              router.push("/dashboard")
            }
        }
    }
    else {
        setAlertText("All fields should not be empty!")
        setAlertDisplay("flex")
      }

  };

  return (
    <Container component="main" maxWidth="xs" sx={{ minHeight: "100vh" }}>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
            margin="normal"
            required
            fullWidth
            label="Old Password"
            name="oldPassword"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="New Password"
            name="newPassword"
            type="password"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Repeat New Password"
            name="newPassword2"
            type="password"
          />
          <Alert 
            variant="outlined" 
            severity="error" 
            onClose={() => { setAlertDisplay("none") }}
            sx={{
              display: alertDisplay
            }}>
            {alertText}
          </Alert>
          <Snackbar 
            autoHideDuration={6000}
            onClose={() => { setAlertDisplay2(false) }}
            open={alertDisplay2}>
              <Alert severity="success" sx={{ width: '100%' }}>
            {alertText}
            </Alert>
          </Snackbar>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  )
}