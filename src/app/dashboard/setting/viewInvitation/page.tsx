'use client'
import React, { useState, useEffect } from 'react';
import { Button, List, ListItem, ListItemText, TextField, Box, Typography, Paper, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { getId } from '../../accountIdHandler';
import getInviteOverview from './InviteOverview';

export interface InviteOverview {
    inviteCode: string,
    identity: string
}


export default function InviteManager() {
    const [inviteOverviews, setInviteOverviews] = useState<InviteOverview[]>([]);
    const [newInviteCode, setNewInviteCode] = useState('');
    const [newIdentity, setNewIdentity] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const id = await getId();
            const overview = await getInviteOverview(id);
            setInviteOverviews(overview);
        };
        fetchData();
    }, []);

    const handleAddInviteCode = async () => {
        // Add logic to submit newInviteCode
        // After adding, fetch and update the inviteOverviews list
    };

    return (
        <Box sx={{ margin: 'auto', maxWidth: 500 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Invitation Code List
            </Typography>
            <Paper sx={{ maxHeight: 400, overflow: 'auto', mb: 2 }}>
                <List>
                    {inviteOverviews.map((overview, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={overview.inviteCode} secondary={overview.identity} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box component="form" onSubmit={handleAddInviteCode}>
                <TextField
                    label="Add Code"
                    variant="outlined"
                    fullWidth
                    value={newInviteCode}
                    onChange={(e) => {setNewInviteCode(e.target.value);}}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="identity-select-label">Identity</InputLabel>
                    <Select
                        labelId="identity-select-label"
                        label="Identity"
                        value={newIdentity}
                    onChange={(e: SelectChangeEvent) => setNewIdentity(e.target.value)}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleAddInviteCode}>
                    Confirm
                </Button>
            </Box>
        </Box>
    );
}
