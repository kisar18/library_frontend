import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { useLogout } from "../hooks/useLogout";

function Profile() {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  }

  return( 
    <Box>
      <Typography>Profile</Typography>
      <Button type="submit" variant="contained" size="large" onClick={handleClick}>Logout</Button>
    </Box> 
  )
}

export default Profile;
