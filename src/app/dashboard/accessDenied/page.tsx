import React from 'react';
import { Container, Paper, Typography, Button } from '@mui/material';

const Page = () => {
    return (
        <Container component="main" maxWidth="sm" sx={{ mt: 8 }}>
            <Paper elevation={5} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    Access Denied
                </Typography>
                <Typography variant="subtitle1">
                    Sorry, you have no permission to enter this page.
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    href="/dashboard"
                >
                    Back dashboard
                </Button>
            </Paper>
        </Container>
    );
};

export default Page;
