'use client'
import React, { useState, useRef, useEffect } from 'react';
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { Box, Typography, TextField, Button } from "@mui/material";
import { Edit, Save } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import Grid from "@mui/material/Grid";
import Link from "next/link";
import { getId } from '../../accountIdHandler';
import EditIcon from '@mui/icons-material/Edit';
import UserAvatar from '../../UserAvatar';
import { uploadAvatar } from '../../avatarHandler';
import { getIdentity } from '../../identityHandler';
import getAccountInfo, { AccountInfo } from '../../accountInfo';
const debug = process.env.debug



const EditProfile = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cnt, setCnt] = useState(0);
    useEffect(() => {
        const setProfile = async () => {
            setUserProfile(await getAccountInfo(await getId()))
        }
        if (debug !== "true") {
            setProfile()
        }
    }, [])

    useEffect(() => {
        if (selectedFile) {
            // console.log(selectedFile);
            const formData = new FormData();
            formData.append('file', selectedFile);
            const func = async () => {
                uploadAvatar(await getId(), formData);
            }
            func();
            setCnt(cnt + 1);
        }
    }, [selectedFile]);

    useEffect(() => {
        const uploadFile = () => {
            if (fileInputRef.current) {
                var file = fileInputRef.current.files?.[0];

                if (file) {
                    var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                    if (allowedTypes.includes(file.type)) {
                        setSelectedFile(file);
                        console.log('ok');
                    } else {
                        alert('Only jpg, jpeg, or png files are allowed.');
                    }
                } else {
                    alert('Please choose a file.');
                }
            }
            return file;
        };

        // Adding event listener to the file input
        const fileInput = fileInputRef.current;
        if (fileInput) {
            fileInput.addEventListener('change', uploadFile);
        }

        // Clean up the event listener
        return () => {
            if (fileInput) {
                fileInput.removeEventListener('change', uploadFile);
            }
        };
    }, []);

    const handleAvatarChange = () => {
        console.log(fileInputRef)
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    };
    const [userProfile, setUserProfile] = useState<AccountInfo>({
        name: "Hu Tao",
        email: "hutao@genshin.com",
        joinedDate: "2023-07-15",
        sign: "The 77th generation master of the \"Wangsheng Funeral Parlor\" in Liyue, a crucial figure in charge of Liyue's funeral affairs.",
        techStack: ['C++', 'Java', 'Python', 'C#', 'C+++++++++++++++++++++++++++++++++++++++++++++++++++++++']
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
    const [isStudent, setIsStudent] = useState(false);

    useEffect(() => {
        getIdentity().then(t => setIsStudent(t === 'student'))
    }, [])

    return (

        <Box display="flex" flexDirection="column" alignItems="center" width="60%" margin="auto">
            {!isStudent && <><Box position="relative" display="inline-block"><Avatar sx={{ width: 100, height: 100 }}>


                <UserAvatar key={cnt} width={100} height={100} />
            </Avatar>
                <Edit onClick={handleAvatarChange} style={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    transform: 'translate(50%, 50%)'
                }}
                />
            </Box>
            </>}
            <Box display="flex" alignItems="center">
                {isEditing ? (
                    <TextField
                        variant="outlined"
                        value={userProfile.name}
                        onChange={handleNameChange}
                    />
                ) : (
                    <Typography variant="h4" marginTop={2} marginRight={1}>
                        {userProfile.name}
                    </Typography>
                )}

                <IconButton onClick={handleEditClick} style={{ marginTop: '15px' }} className='icon-container'>
                    <EditIcon />
                </IconButton>
            </Box>
            <Typography variant="subtitle1" color="textSecondary" marginTop={1}>
                {userProfile.email}
            </Typography>
            {isStudent && (
                <>
                    <Grid container justifyContent="center" alignItems="center">
                        <Box position="relative" display="inline-block">
                            <Avatar sx={{ width: 100, height: 100 }}>
                                <UserAvatar key={cnt} width={100} height={100} />
                            </Avatar>
                            <Edit onClick={handleAvatarChange} style={{
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
                            style={{ width: '70%', marginLeft: '20px' }}
                            label="Sign"
                            name="sign"
                            value={userProfile.sign}
                            multiline
                            rows={4}
                            onChange={handleInputChange}
                        />

                    </Grid>
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
                                style={{ marginRight: 8, minWidth: '90%' }}
                            />
                            <IconButton onClick={() => removeTech(index)}>
                                <RemoveCircleOutlineIcon />
                            </IconButton>
                        </Box>
                    ))}
                </>
            )}

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
            <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
        </Box>
    );
}

export default EditProfile;
