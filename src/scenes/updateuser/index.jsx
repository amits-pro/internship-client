import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateUser = () => {
  // Initial state with form data
  const [formData, setFormData] = useState({
    userId: '',
    role: '',
    departmentName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  // Fetch user data and populate form (assuming API returns user data based on some ID or context)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/user/123'); // Example endpoint
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update user info
      await axios.put(`http://localhost:8080/user/${formData.userId}`, formData);
      console.log('User updated successfully:', formData);
      navigate('/user/profile'); // Redirect after successful update to the profile page
    } catch (error) {
      console.error('Update Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '150px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Update User Information
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ width: '400px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="User ID"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              margin="normal"
              disabled // User ID cannot be changed
            />
          </Grid>

          {/* Dropdown for Role (disabled for update) */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                disabled // Role cannot be changed
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Manager">Manager</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Dropdown for Department Name */}
          <Grid item xs={12} >
            <FormControl fullWidth margin="normal" required>
              <InputLabel id="department-label">Department Name</InputLabel>
              <Select
                labelId="department-label"
                id="departmentName"
                name="departmentName"
                value={formData.departmentName}
                onChange={handleChange}
                label="Department Name"
              >
               <MenuItem value="Department of Biology">Department of Biology</MenuItem>
<MenuItem value="Department of English">Department of English</MenuItem>
<MenuItem value="Department of History">Department of History</MenuItem>
<MenuItem value="Department of Economics">Department of Economics</MenuItem>
<MenuItem value="Department of Business Administration">Department of Business Administration</MenuItem>
<MenuItem value="Department of Psychology">Department of Psychology</MenuItem>
<MenuItem value="Department of Political Science">Department of Political Science</MenuItem>
<MenuItem value="Department of Sociology">Department of Sociology</MenuItem>
<MenuItem value="Department of Public Health">Department of Public Health</MenuItem>
<MenuItem value="Department of Law">Department of Law</MenuItem>
<MenuItem value="Department of Environmental Science">Department of Environmental Science</MenuItem>
<MenuItem value="Department of Media and Communication">Department of Media and Communication</MenuItem>
<MenuItem value="Department of Fine Arts">Department of Fine Arts</MenuItem>
<MenuItem value="Department of Architecture">Department of Architecture</MenuItem>
<MenuItem value="Department of Information Technology">Department of Information Technology</MenuItem>
<MenuItem value="Engineering">Department of Education</MenuItem>
<MenuItem value="Department of Biotechnology">Department of Biotechnology</MenuItem>
<MenuItem value="Department of Pharmacy">Department of Pharmacy</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* First Name (disabled) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              disabled // First Name cannot be changed
            />
          </Grid>

          {/* Last Name (disabled) */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              disabled // Last Name cannot be changed
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>

          {/* Phone */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              type="phone"
              value={formData.phone}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>

          {/* Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>

          {/* Confirm Password */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              margin="normal"
              required
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default UpdateUser;
