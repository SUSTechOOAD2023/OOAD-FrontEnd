'use client'
import { Box, Button, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

export default function ChangePassword() {

    return (
        //TODO: add other components
            <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3}}
                component={Link} href={'/dashboard/setting/changePassword'}
            >
                Change Password
            </Button>
    );
}