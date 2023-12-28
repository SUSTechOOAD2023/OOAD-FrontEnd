'use client'
import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleCurrentPasswordChange = (event) => {
        setCurrentPassword(event.target.value);
    };

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = () => {
        // Implement password change logic here
        console.log("Password changed to:", newPassword);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="60%" margin="auto">
            <Typography variant="h4" marginTop={2}>
                Change Password
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={handleCurrentPasswordChange}
                style={{ width: '70%' }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="New Password"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                style={{ width: '70%' }}
            />
            <TextField
                variant="outlined"
                margin="normal"
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                style={{ width: '70%' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                style={{ marginTop: '20px' }}
            >
                Submit
            </Button>
        </Box>
    );
}