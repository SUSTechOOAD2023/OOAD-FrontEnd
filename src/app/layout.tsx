import './globals.css';
import type { Metadata } from 'next';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';

export const metadata: Metadata = {
  title: 'ProGenius Project Helper',
  description: 'Genshin Impact',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <CssBaseline />
      <html lang="en">
        <body>{children}</body>
      </html>
    </>
  )
}
