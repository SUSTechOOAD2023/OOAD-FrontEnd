'use client';
import {
  Snackbar,
  Alert
} from '@mui/material';

export function ErrorSnackBar({ open, msg, onClose }: {
  open: boolean;
  msg: string;
  onClose: () => void;
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
    >
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        elevation={6}
      >
        {msg}
      </Alert>
    </Snackbar>
  );
}
