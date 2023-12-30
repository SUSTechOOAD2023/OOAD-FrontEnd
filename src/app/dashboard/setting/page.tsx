import { Box, Button, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';
import { getIdentity } from '../identityHandler';

export default async function Setting() {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight="100vh"
        >
            {/* TODO: add other components */}
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                component={Link} href={'/dashboard/setting/changePassword'}
            >
                Change Password
            </Button>
            {await getIdentity() === 'admin' && (
                <Button
                    variant="contained"
                    color="secondary"
                    component={Link} href={'/dashboard/setting/viewInvitation'}
                >
                    View Invite Code
                </Button>
            )}
        </Box>
    );
}
