'use client'
import React, { useState } from 'react';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Box, Typography, TextField, Button } from "@mui/material";
import {Edit, Save} from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from "@mui/material/Grid";
import Link from "next/link";
import EditIcon from '@mui/icons-material/Edit';


const EditProfile = () => {
    const [userProfile, setUserProfile] = useState({
        prefix: "HT",
        name: "Hu Tao",
        email: "hutao@genshin.com",
        joinedDate: "2023-07-15",
        sign: "The 77th generation master of the \"Wangsheng Funeral Parlor\" in Liyue, a crucial figure in charge of Liyue's funeral affairs.",
        techStack: ['C++', 'Java', 'Python']
    });

    const handleInputChange = (event) => {
        setUserProfile({
            ...userProfile,
            [event.target.name]: event.target.value
        });
    };


    const handleTechStackChange = (event, index) => {
        const newTechStack = [...userProfile.techStack];
        newTechStack[index] = event.target.value;
        setUserProfile({ ...userProfile, techStack: newTechStack });
    };

    const addTech = () => {
        setUserProfile({ ...userProfile, techStack: [...userProfile.techStack, ''] });
    };

    const removeTech = (index) => {
        const newTechStack = userProfile.techStack.filter((_, i) => i !== index);
        setUserProfile({ ...userProfile, techStack: newTechStack });
    };

    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(userProfile.name);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" width="60%" margin="auto">
                <Box display="flex" alignItems="center">
        {isEditing ? (
            <TextField
            variant="outlined"
            value={name}
            onChange={handleNameChange}
            />
        ) : (
            <Typography variant="h4" marginTop={2} marginRight={1}>
            {name}
            </Typography>
        )}

        <IconButton onClick={handleEditClick} style={{ marginTop: '15px' }} className='icon-container'>
            <EditIcon />
        </IconButton>
        </Box>
            <Typography variant="subtitle1" color="textSecondary" marginTop={1}>
                {userProfile.email}
            </Typography>
            <Grid container justifyContent="center" alignItems="center">
                <Box position="relative" display="inline-block">
                    <Avatar style={{ width: 100, height: 100 }}>
                        <img
                            src="/hutao1.png"
                            alt="User Profile"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Avatar>
                    <Edit style={{
                        position: 'absolute',
                        bottom: 5,
                        right: 5,
                        transform: 'translate(50%, 50%)'
                    }}
                    />
                </Box>
            <TextField
                variant="outlined"
                margin="normal"
                style={{width: '70%', marginLeft: '20px'}}
                label="Sign"
                name="sign"
                value={userProfile.sign}
                multiline
                rows={4}
                onChange={handleInputChange}
            />

            </Grid>
            {/*<TextField*/}
            {/*    variant="outlined"*/}
            {/*    margin="normal"*/}
            {/*    fullWidth*/}
            {/*    label="Email"*/}
            {/*    name="email"*/}
            {/*    value={userProfile.email}*/}
            {/*    onChange={handleInputChange}*/}
            {/*/>*/}
            <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h6">
                Technology Stack
            </Typography>
            <IconButton onClick={() => addTech()}>
                <AddCircleOutlineIcon />
            </IconButton>
            </Box>
            {userProfile.techStack.map((tech, index) => (
                <Box key={index} display="flex" alignItems="center" marginBottom={2}>
                    <TextField
                        variant="outlined"
                        label={`Technology #${index + 1}`}
                        value={tech}
                        onChange={(event) => handleTechStackChange(event, index)}
                        style={{ marginRight: 8, minWidth: '90%'}}
                    />
                    <IconButton onClick={() => removeTech(index)}>
                        <RemoveCircleOutlineIcon />
                    </IconButton>
                </Box>
            ))}
            <Divider style={{ width: '80%', marginTop: 2, marginBottom: 2 }} />
            <Typography variant="body2" color="textSecondary">
                Joined: {userProfile.joinedDate}
            </Typography>
            <Button component={Link} href="/dashboard/profile"
                variant="contained"
                color="primary"
                startIcon={<Save />}
                style={{ marginTop: 20 }}
            >
                Save Profile
            </Button>
        </Box>
    );
}

export default EditProfile;
