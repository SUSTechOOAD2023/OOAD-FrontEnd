'use client'
import React from 'react';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import {Edit, ModeEdit} from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CodeIcon from '@mui/icons-material/Code';
import Grid from "@mui/material/Grid";


type UserProfile = {
    prefix: string;
    name: string;
    email: string;
    joinedDate: string;
    sign: string;
    techStack: string[];
};
const userProfile: UserProfile = {
    prefix: "HT",
    name: "Hu Tao",
    email: "hutao@genshin.com",
    joinedDate: "2023-07-15",
    sign: "The 77th generation master of the \"Wangsheng Funeral Parlor\" in Liyue, a crucial figure in charge of Liyue's funeral affairs.",
    techStack: ['C++', 'Java', 'Python', 'C#', 'C+++++++++++++++++++++++++++++++++++++++++++++++++++++++']
};

const events = [
    { eventName: "Funeral Services, Hu Tao", eventTime: "2023 Spring", role: "Teacher" },
    { eventName: "Poetry Composition, Venti", eventTime: "2023 Fall", role: "Student" },
    { eventName: "Introduction to Genius Invokation TCG, Ruozai Tian; Sending Liu ...", eventTime: "2023 Fall", role: "Teaching Assistant" },
    // ... 更多活动数据 ...
];

export default function Profile() {
const router = useRouter();

return (
<Box display="flex" flexDirection="column" alignItems="center" width="60%" margin="auto">
    <Avatar style={{ width: 100, height: 100 }}>
        <img
            src="/hutao1.png"
            alt="User Profile"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // 使用 objectFit 以适应容器并保持图像比例
            }}
        />
    </Avatar>
    <Typography variant="h4" marginTop={2}>
        {userProfile.name}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary" marginTop={1}>
        {userProfile.email}
    </Typography>
    <Typography variant="body2" color="textSecondary">
        Joined: {userProfile.joinedDate}
    </Typography>
    <Typography variant="body1" marginTop={2} maxWidth="50%">
        {userProfile.sign}
    </Typography>
    <Divider style={{ width: '60%', marginTop: 2, marginBottom: 2 }} />

    <Grid container spacing={6} justifyContent="center" style={{minWidth: '100%'}}>
    <Grid item style={{maxWidth: '60%'}}>
    <Typography variant="h6" marginTop={2}>
        Enrolled Classes
    </Typography>
    <List>
        {events.map((event, index) => (
            <ListItem key={index} style={{ padding: '0 0' }}>
                <Box display="flex" flexDirection="column">
                    <button
                        style={{
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            padding: '0',
                            textDecoration: 'underline',
                        }}
                        onClick={() => {}}
                    >
                        <Typography variant="body1" style={{ textAlign: 'left' }}>{event.eventName}</Typography>
                    </button>
                    <Typography variant="body2" color="textSecondary">{event.eventTime}</Typography>
                    <Typography variant="caption">{event.role}</Typography>

                </Box>
            </ListItem>
        ))}
    </List>
    </Grid>
    <Grid item style={{maxWidth: '40%'}}>
        <Typography variant="h6" marginTop={2}>
        Technical Stack
    </Typography>
    <List>
        {userProfile.techStack.map((tech, index) => (
            <ListItem key={index}>
                <ListItemIcon>
                    <CodeIcon />
                </ListItemIcon>
                <ListItemText primary={tech} style={{ whiteSpace: 'normal', wordWrap: 'break-word' }} />
            </ListItem>
        ))}
    </List>
    </Grid>
    </Grid>
</Box>
);
}
