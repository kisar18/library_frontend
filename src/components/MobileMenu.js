import React from "react";
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import "../index.css";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function MobileMenu(props) {

  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <Paper sx={{ width: { xs: '50%', sm: '25%' }, position: "absolute", right: "0%", zIndex: 1 }} onClick={() => props.onCloseMobileMenu()}>
      <MenuList sx={{ backgroundColor: "#1976d2", p: 0, m: 0 }}>
        <MenuItem sx={{ borderTop: "1px solid white" }}>
          <Link to="/" className='mob__link'>
            Home
          </Link>
        </MenuItem>
        {user && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/profile" className='mob__link'>
              Profile
            </Link>
          </MenuItem>
        )}
        {!user && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/login" className='mob__link'>
              Login
            </Link>
          </MenuItem>
        )}
        {!user && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/register" className='mob__link'>
              Register
            </Link>
          </MenuItem>
        )}
        {user && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/books" className='mob__link'>
              All books
            </Link>
          </MenuItem>
        )}
        {user && user.username === "admin" && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/users" className='mob__link'>
              Users
            </Link>
          </MenuItem>
        )}
        {user && user.username === "admin" && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/history" className='mob__link'>
              History
            </Link>
          </MenuItem>
        )}
        {user && (
          <MenuItem sx={{ borderTop: "1px solid white" }}>
            <Link to="/" className='mob__link' onClick={handleClick}>
              Logout
            </Link>
          </MenuItem>
        )}
      </MenuList>
    </Paper>
  );
}

export default MobileMenu;
