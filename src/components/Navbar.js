import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {

  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <Box>
      <AppBar position="static">
        <Box sx={{ display: "flex", justifyContent: "space-around" }}>
          <Typography variant="h5" sx={{ my: 1 }}>
            <Link to="/" className='nav__link'>
              Home
            </Link>
          </Typography>
          {user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/profile" className='nav__link'>
                Profile
              </Link>
            </Typography>
          )}
          {!user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/login" className='nav__link'>
                Login
              </Link>
            </Typography>
          )}
          {!user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/register" className='nav__link'>
                Register
              </Link>
            </Typography>
          )}
          {user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/books" className='nav__link'>
                Books
              </Link>
            </Typography>
          )}
          {user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/" className='nav__link' onClick={handleClick}>
                Logout
              </Link>
            </Typography>
          )}
        </Box>
      </AppBar>
    </Box>
  );
}

export default Navbar;