import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import React from 'react';

export const AssignmentDropdown = ({ assignments, onSelectAssignment }) => {
  const handleAssignmentChange = (event) => {
    const selectedAssignmentId = event.target.value;
    const selectedAssignment = assignments.find(
      (assignment) => assignment.courseId === selectedAssignmentId
    );
    onSelectAssignment(selectedAssignment);
  };

  return (
      <TextField
      fullWidth
      sx={{mb: 2}}
        // labelId="assignment-dropdown-label"
        select
        id="assignment-dropdown"
        label="Select an assignment"
        onChange={handleAssignmentChange}
        defaultValue=""
      >
        <MenuItem value="">Select an assignment</MenuItem>
        {assignments.map((assignment) => (
          <MenuItem key={assignment.courseId} value={assignment.courseId}>
            {assignment.courseName} {assignment.courseId}
          </MenuItem>
        ))}
      </TextField>
  );
};

export default AssignmentDropdown;