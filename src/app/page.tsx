'use client'

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Copyright from './Copyright';
import { landingRedirect } from './landing';


const SUSTechLogoStyle = {
  borderRadius: "50%"
}

const iconStyle = {
  borderRadius: "5%"
}

export default function LandingPage() {
  useEffect(() => {
    landingRedirect()
  }, [])

  return (
    <Container component="main">
      <Stack alignItems="center" marginTop={12} marginBottom={12} spacing={4}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <Image
            src="/sustech_logo.png"
            alt="SUSTech Logo"
            width={100}
            height={100}
            style={SUSTechLogoStyle}
            priority
          />
          <Typography variant="h1" fontWeight={500}>
            Project Helper
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Button component={Link} href="/login" variant="contained">
            Log In
          </Button>
          <Button component={Link} href="/register" variant="contained">
            Register
          </Button>
        </Stack>
      </Stack>
      <Stack alignItems="center" marginTop={4} marginBottom={4} spacing={5}>
        <Stack direction="row" marginBottom={4} spacing={10}>
          <Stack alignItems="center">
            <Image
              src="/data_icon.png"
              alt="Data"
              width={150}
              height={150}
              style={iconStyle}
              priority
            />
            <Typography variant="subtitle1">
              Data
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Image
              src="/view_icon.png"
              alt="View"
              width={150}
              height={150}
              style={iconStyle}
              priority
            />
            <Typography variant="subtitle1">
              View
            </Typography>
          </Stack>
        </Stack>
        <Image
          src="/paimon.png"
          alt="Genshin Impact"
          width={150}
          height={150}
          priority
        />
        <Stack direction="row" marginTop={4} spacing={10}>
          <Stack alignItems="center">
            <Image
              src="/show_icon.png"
              alt="Show"
              width={150}
              height={150}
              style={iconStyle}
              priority
            />
            <Typography variant="subtitle1">
              Show
            </Typography>
          </Stack>
          <Stack alignItems="center">
            <Image
              src="/setting_icon.png"
              alt="Setting"
              width={150}
              height={150}
              style={iconStyle}
              priority
            />
            <Typography variant="subtitle1">
              Setting
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Copyright marginTop={8} marginBottom={4} />
    </Container>
  )
}
