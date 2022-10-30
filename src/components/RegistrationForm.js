import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import axios from '../axios';

function RegistrationForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthNumber, setBirthNumber] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault()

    const newUser = {
      first_name: firstName,
      last_name: lastName,
      birth_number: birthNumber,
      address: address,
      username: username,
      password: password
    }

    try {
      const response = await axios.post('/library/customers', newUser);
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }

  }

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width:"75%" }} onSubmit={handleSubmit}>
        <h1>Register</h1>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="firstName" 
            label="First name"
            value={firstName}
            onChange={ e => {setFirstName(e.target.value)}}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="lastName" 
            label="Last name"
            value={lastName}
            onChange={ e => {setLastName(e.target.value)}}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="birthNumber" 
            label="Birth number"
            value={birthNumber}
            onChange={ e => {setBirthNumber(e.target.value)}}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="address" 
            label="Address"
            value={address}
            onChange={ e => {setAddress(e.target.value)}}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="username" 
            label="Username"
            value={username}
            onChange={ e => {setUsername(e.target.value)}}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="password" 
            label="Password"
            value={password}
            onChange={ e => {setPassword(e.target.value)}}
            type="password"
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField 
            name="confirmPassword" 
            label="Confirm password"
            value={confirmPassword}
            onChange={ e => {setConfirmPassword(e.target.value)}}
            type="password"
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3, display: "flex" }}>
          <Typography sx={{mr: 1}}>
            Already have an account
          </Typography>
          <Link to="/login">Sign in</Link>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button type='submit' variant="contained" size="large">Register</Button>
        </Box>
      </form>
    </Box>
  )
  
}

export default RegistrationForm;
