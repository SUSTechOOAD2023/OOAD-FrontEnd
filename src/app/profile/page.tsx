'use client'
import React from 'react';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Box, List, ListItem, Typography } from "@mui/material";
import { useRouter } from 'next/navigation';

class UserProfile {
    // name, email, bio, joinedData;
}

const userProfile: UserProfile = {
    prefix: "HT",
    name: "Hu Tao",
    email: "hutao@genshin.com",
    joinedDate: "2023-07-15",
    sign: "The 77th generation master of the \"Wangsheng Funeral Parlor\" in Liyue, a crucial figure in charge of Liyue's funeral affairs."
};

const events = [
    { eventName: "Funeral Services, Hu Tao", eventTime: "2023 Spring", role: "Teacher" },
    { eventName: "Poetry Composition, Venti", eventTime: "2023 Fall", role: "Student" },
    { eventName: "Introduction to Genius Invokation TCG", eventTime: "2023 Fall", role: "Teaching Assistant" },
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
    <Typography variant="body1" marginTop={2}>
        {userProfile.sign}
    </Typography>
    <Divider style={{ width: '80%', marginTop: 2, marginBottom: 2 }} />
    <Typography variant="body2" color="textSecondary">
        Joined: {userProfile.joinedDate}
    </Typography>
    <Typography variant="h6" marginTop={2}>
        Enrolled Classes
    </Typography>
    <List>
        {events.map((event, index) => (
            <ListItem key={index} style={{ padding: '8px 0' }}>
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
                        <Typography variant="body1">{event.eventName}</Typography>
                    </button>
                    <Typography variant="body2" color="textSecondary">{event.eventTime}</Typography>
                    <Typography variant="caption">{event.role}</Typography>
                </Box>
            </ListItem>
        ))}
    </List>
</Box>
);
}
