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
    const [newInviteCode, setNewInviteCode] = useState(0);
    const [newIdentity, setNewIdentity] = useState('');
    const [inviteDisplay, setInviteDisplay] = useState<InviteOverview[]>([]);
    const filterAndSetInviteDisplay = () => {
        const filteredInviteOverviews = inviteOverviews.filter(
          (overview) =>
            overview.identity === newIdentity
        );
      
        const limitedInviteDisplay = filteredInviteOverviews.slice(0, newInviteCode);
      
        setInviteDisplay(limitedInviteDisplay);
      };
    useEffect(() => {
        const fetchData = async () => {
            const id = await getId();
            const overview = await getInviteOverview(id);
            setInviteOverviews(overview);
        };
        fetchData();
    }, []);

    const handleSearchInviteCode = async () => {
        // Add logic to submit newInviteCode
        // After adding, fetch and update the inviteOverviews list
    };

    return (
        <Box sx={{ margin: 'auto', maxWidth: 500 }}>
            <Typography variant="h4" sx={{ mb: 2, ml: 4 }}>
                Search Invitation Code
            </Typography>
            <Paper sx={{ height: 250, overflow: 'auto', mb: 2 }}>
                <List>
                {inviteDisplay.length === 0 && <Typography sx={{ ml: 1}}> Please type the inviteCode number you need!</Typography>}
                    {inviteDisplay.map((overview, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={overview.inviteCode} secondary={overview.identity} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <Box component="form" onSubmit={handleSearchInviteCode}>
                <TextField
                    type="number"
                    label="Codes need"
                    variant="outlined"
                    fullWidth
                    value={newInviteCode}
                    onChange={(e) => {setNewInviteCode(Number(e.target.value));}}
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
                <Button variant="contained" color="primary" onClick={filterAndSetInviteDisplay}>
                    search
                </Button>
            </Box>
        </Box>
    );
}
