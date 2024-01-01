'use client'
import React, { useState, useEffect } from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
    TextField,
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent,
    Snackbar
} from '@mui/material';
import { getId } from '../../accountIdHandler';
import getInviteOverview from './InviteOverview';
import Alert from "@mui/material/Alert";

export interface InviteOverview {
    inviteCode: string,
    identity: string
}


export default function InviteManager() {
    const [newInviteCode, setNewInviteCode] = useState(0);
    const [newIdentity, setNewIdentity] = useState('');
    const [inviteDisplay, setInviteDisplay] = useState<InviteOverview[]>([]);
    const [alertDisplay, setAlertDisplay] = useState(false)
    const filterAndSetInviteDisplay = () => {
        const fetchData = async () => {
            const id = await getId();
            const overview = await getInviteOverview(id, newInviteCode, newIdentity);
            if (overview == null) {
                setAlertDisplay(true);
            }
            else setInviteDisplay(overview);
        };
        fetchData();
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
            <Box component="form">
                <TextField
                    type="number"
                    label="Codes need"
                    variant="outlined"
                    fullWidth
                    value={newInviteCode}
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const sanitizedValue = inputValue.replace(/[^0-9]/g, '');
                        setNewInviteCode(Number(sanitizedValue));
                    }}
                    sx={{ mb: 2 }}
                />

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="identity-select-label">Identity</InputLabel>
                    <Select
                        labelId="identity-select-label"
                        label="Identity"
                        value={newIdentity}
                    onChange={(e: SelectChangeEvent) => setNewIdentity(e.target.value)}
                        sx={{minWidth: "19vw"}}
                    >
                        <MenuItem value="student">Student</MenuItem>
                        <MenuItem value="teacher">Teacher</MenuItem>
                        <MenuItem value="SA">Student Assistant</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={filterAndSetInviteDisplay}>
                    search
                </Button>
            </Box>
            <Snackbar
                autoHideDuration={4000}
                onClose={() => { setAlertDisplay(false) }}
                open={alertDisplay}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    Input Error!
                </Alert>
            </Snackbar>
        </Box>
    );
}
