import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate();

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
    navigate("/");
  }

  return( 
    <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
      <Typography variant="h5">Profile: {user.username}</Typography>
      <Button type="submit" variant="contained" size="large" onClick={handleClick}>Logout</Button>
    </Box> 
  )
}

export default Profile;
