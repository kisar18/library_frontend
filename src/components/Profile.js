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
      <Typography variant="h5" sx={{ my: 2 }}>Profile: {user.username}</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>First name: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Last name: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Birth number: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Address: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Borrowed books: </Typography>
      
      <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }} onClick={handleClick}>Logout</Button>
    </Box> 
  )
}

export default Profile;
