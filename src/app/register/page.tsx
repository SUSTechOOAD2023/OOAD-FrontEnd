'use client'

import { useState } from 'react';
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
import Copyright from '../Copyright';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import postRegister from './registerHandler';
import Alert from '@mui/material/Alert';

export default function RegisterPage() {
  const router = useRouter()
  const [alertDisplay, setAlertDisplay] = useState("none")
  const [alertText, setAlertText] = useState("")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      invitationCode: data.get("invitationCode"),
      identity: data.get("identity"),
      id: data.get("id"), 
      email: data.get("email"), 
      password: data.get("password")
    });
    const invitationCode = data.get("invitationCode")?.toString()
    const identity = data.get("identity")?.toString()
    const id = data.get("id")?.toString()
    const email = data.get("email")?.toString()
    const password = data.get("password")?.toString()
    if (invitationCode && identity && id && email && password) {
      const res = await postRegister({
        invitationCode: invitationCode, 
        identity: identity, 
        id: id, 
        email: email, 
        password: password
      })

      if (res === "Success!") {
        router.push("/login")
      } else {
        setAlertText(res)
        setAlertDisplay("flex")
      }
    } else {
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
          Register
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="invitation-code"
                name="invitationCode"
                required
                fullWidth
                id="invitationCode"
                label="Invitation Code"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                id="identity"
                label="Identity"
                name="identity"
                defaultValue=""
                autoComplete="off"
              >
                <MenuItem value="student">Student</MenuItem>
                <MenuItem value="teacher">Teacher</MenuItem>
                <MenuItem value="SA">Student Assistant</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="no"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                sx={{
                  mb: 2
                }}
              />
            </Grid>
            {/* <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I accept to share all my personal information with the website owners."
              />
            </Grid> */}
          </Grid>
          <Alert 
            variant="outlined" 
            severity="error" 
            onClose={() => { setAlertDisplay("none") }}
            sx={{
              display: alertDisplay
            }}>
            {alertText}
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 2 }}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2" component={Link} href="/login">
                Already have an account? Sign in
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Copyright sx={{ mt: 5 }} />
    </Container>
  );
}