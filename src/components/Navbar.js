import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';
import "../index.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function Navbar(props) {

  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <Box>
      <AppBar position="static" onClick={() => props.onCloseMobileMenu()}>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: "space-around" }}>
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
          {user && user.username === "admin" && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/users" className='nav__link'>
                Users
              </Link>
            </Typography>
          )}
          {user && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/books" className='nav__link'>
                All books
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
          {user && user.username === "admin" && (
            <Typography variant="h5" sx={{ my: 1 }}>
              <Link to="/history" className='nav__link'>
                History
              </Link>
            </Typography>
          )}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' }, justifyContent: "space-between", backgroundColor: "#1976d2" }}>
          <Typography variant="h5" sx={{ my: 1, mx: 3 }}>Menu</Typography>
          <IconButton
            size="large"
            onClick={() => props.onShowMobileMenu()}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
      </AppBar>
    </Box>
  );
}

export default Navbar;