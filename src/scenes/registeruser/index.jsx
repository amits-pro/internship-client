import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const countryCodes = [
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+91', country: 'India' },
  { code: '+61', country: 'Australia' },
  { code: '+81', country: 'Japan' },
  // Add more country codes as needed
];

const RegistrationForm = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    userId: '',
    role: '',
    departmentName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+1', // Default country code
    password: '',
    confirmPassword: '',
  });

  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validatePhoneNumber = (phone) => {
    const regex = /^\d{10,15}$/; // Adjust regex according to your requirements
    return regex.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the phone number
    if (!validatePhoneNumber(formData.phone)) {
      setPhoneError('Phone number must be between 10 to 15 digits.');
      return;
    }
    
    setPhoneError(''); // Clear error message if validation passes

    try {
      await axios.post('http://localhost:8080/register', formData);
      console.log('Response:', formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration Error:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '200px',
      }}
    >
      <Typography variant="h3" gutterBottom>
        Register
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '400px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="User Id"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>

          {/* Dropdown for Role */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth margin="normal" required>
              <InputLabel
                id="role"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                }}
              >
                Role
              </InputLabel>
              <Select
                labelId="role"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                label="Role"
                sx={{
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                }}
              >
                <MenuItem value="Admin">Admin</MenuItem>
                <MenuItem value="Student">Student</MenuItem>
                <MenuItem value="Faculty">Manager</MenuItem>
                <MenuItem value="Staff">Staff</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>
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
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                margin="normal"
                required
                error={!!phoneError} // Display error state if validation fails
                helperText={phoneError} // Show error message
                sx={{
                  '& .MuiInputBase-input': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '& .MuiInputLabel-root': {
                    color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                    },
                  },
                }}
              />
            </Grid>
          </Grid>
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
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>
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
              sx={{
                '& .MuiInputBase-input': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiInputLabel-root': {
                  color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',
                  },
                },
              }}
            />
          </Grid>

        <Box>
          <Link to="/login">Account already exists?</Link>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: '20px', width: '100%' }}
        >
          Register
        </Button>
      </Box>
    </Box>
  );
};

export default RegistrationForm;
