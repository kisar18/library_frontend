import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { useAuthContext } from "../hooks/useAuthContext";

function Navbar() {

  const { user } = useAuthContext();

  return (
    <Box>
      <AppBar position="static">
        <Box sx={{ display: "flex", justifyContent: "space-around"}}>
          <Typography variant="h5" sx={{my: 1}}>
            <Link to="/" className='nav__link'>
              {user ? user.username : "Home"}
            </Link>
          </Typography>
          <Typography variant="h5" sx={{my: 1}}>
            <Link to="/login" className='nav__link'>
              Login
            </Link>
          </Typography>
          <Typography variant="h5" sx={{my: 1}}>
            <Link to="/register" className='nav__link'>
              Register
            </Link>
          </Typography>
          <Typography variant="h5" sx={{my: 1}}>
            <Link to="/books" className='nav__link'>
              Books
            </Link>
          </Typography>
        </Box>
      </AppBar>
    </Box>
  )
}

export default Navbar