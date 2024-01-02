'use client'
import React, { useEffect, useRef, useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Box, List, ListItem, Typography } from "@mui/material";
import Link from "next/link";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import { Edit, ModeEdit } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CodeIcon from '@mui/icons-material/Code';
import Grid from "@mui/material/Grid";
import Image from 'next/image';
import UserAvatar from '../../UserAvatar';
import getAccountInfo, { AccountInfo, getStudentInfo } from '../../accountInfo';
import { getId } from '../../accountIdHandler';
const debug = process.env.debug


const events = [
    { eventName: "Funeral Services, Hu Tao", eventTime: "2023 Spring", role: "Teacher" },
    { eventName: "Poetry Composition, Venti", eventTime: "2023 Fall", role: "Student" },
    { eventName: "Introduction to Genius Invokation TCG, Ruozai Tian; Sending Liu ...", eventTime: "2023 Fall", role: "Teaching Assistant" },
];

export default function StudentProfile({
    params,
    searchParams,
}: {
    params: { slug: string }
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    useEffect(() => {
        const setProfile = async () => {
            const id = params["studentId"]
            if (id)
            setUserProfile(await getStudentInfo(params["studentId"]))
            else setUserProfile(await getAccountInfo(await getId()))
        }
        if (debug !== "true") {
            setProfile()
        }
    }, [])
    const [userProfile, setUserProfile] = useState<AccountInfo>({
        name: "Hu Tao",
        email: "hutao@genshin.com",
        joinedDate: "2023-07-15",
        sign: "The 77th generation master of the \"Wangsheng Funeral Parlor\" in Liyue, a crucial figure in charge of Liyue's funeral affairs.",
        techStack: ['C++', 'Java', 'Python', 'C#', 'C+++++++++++++++++++++++++++++++++++++++++++++++++++++++']
    });
    if (!userProfile) return (
        <Box>404 not found</Box>
    )
    else return (
        <Box display="flex" flexDirection="column" alignItems="center" width="60%" margin="auto">
            <Avatar sx={{ width: 100, height: 100 }}>
                <UserAvatar width={100} height={100} id={params["studentId"] ? params["studentId"] : undefined} />
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

            <Grid container spacing={6} justifyContent="center" style={{ minWidth: '100%' }}>
                <Grid item style={{ maxWidth: '60%' }}>
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
                                        onClick={() => { }}
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
                <Grid item style={{ maxWidth: '40%' }}>
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
