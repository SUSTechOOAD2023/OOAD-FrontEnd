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
import Copyright from '../Copyright';
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { useState } from 'react';
import dayjs, { Dayjs } from "dayjs";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import { checkCaptcha, getCaptcha } from './forgotPasswordHandler';
import { ErrorSnackBar } from '../dashboard/course/ErrorSnackBar';

export default function ForgotPasswordPage() {
  const [sendTime, setSendTime] = useState<Dayjs>(dayjs("1970-01-01"))
  const [snackBarOpen, setSnackBarOpen] = useState<boolean>(false)
  const [verifyOpen, setVerifyOpen] = useState<boolean>(false)
  const [email, setEmail] = useState<string>("")
  const [identity, setIdentity] = useState<string>("")
  const [errorMsg, setErrorMsg] = useState<string>("")
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      identity: data.get("identity"), 
      captcha: data.get("captcha"), 
      password: data.get("password")
    });
    const email = data.get("email")?.toString()
    const identity = data.get("identity")?.toString()
    const captcha = data.get("captcha")?.toString()
    const password = data.get("password")?.toString()
    if (email && identity && captcha && password) {
      checkCaptcha(email, identity, password, captcha)
        .then(response => {
          if (response === "Password is reset successfully!") {
            console.log("success reset")
            router.push("/login")
          } else {
            setErrorMsg(response)
            setSnackBarOpen(true)
          }
        })
    } else {
      setErrorMsg("Captcha and password should not be empty!")
      setSnackBarOpen(true)
    }
  };

  const sendEmail = () => {
    getCaptcha(email, identity)
      .then(ok => {
        if (ok) {
          setVerifyOpen(true)
        } else {
          setErrorMsg("Account does not exist!")
          setSnackBarOpen(true)
        }
      })
  }

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
        <Typography component="h1" variant="h5" gutterBottom>
          Recover Password
        </Typography>
        <Typography component="h1" variant="caption">
          Enter your email address and we&apos;ll send you a recovery captcha.
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            select
            id="identity"
            label="Identity"
            value={identity}
            onChange={(event) => setIdentity(event.target.value)}
            name="identity"
            autoComplete="off"
          >
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="teacher">Teacher</MenuItem>
            <MenuItem value="SA">Student Assistant</MenuItem>
          </TextField>
          {verifyOpen &&
            <>
              <TextField
                margin="normal"
                required
                fullWidth
                id="captcha"
                label="Captcha"
                name="captcha"
                autoComplete="captcha"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                type="password"
                name="password"
                autoComplete="new-password"
                autoFocus
              />
            </>
          }
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2}}
            onClick={() => {
              const currentTime = dayjs()
              if (sendTime.add(1, "m").isAfter(currentTime)) {
                setErrorMsg("There must be 60 seconds between two sendings!")
                setSnackBarOpen(true)
              } else {
                setSendTime(currentTime)
                setVerifyOpen(true)
                sendEmail()
              }
            }}
          >
            Send recovery email
          </Button>
          {verifyOpen && 
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mb: 2 }}
            >
              Confirm
            </Button>
          }
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
      <ErrorSnackBar 
        open={snackBarOpen} 
        msg={errorMsg} 
        onClose={() => setSnackBarOpen(false)} 
      />
    </Container>
  )
}