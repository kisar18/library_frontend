import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import "../index.css";

function HomePage() {
  return (
    <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 3 }}>Welcome in our online library</Typography>
      <Box>
        <img src="homeImage.jpg" className="homepage__image" alt="Library" />
      </Box>
      <Typography variant="h5" sx={{ mt: 4 }}>“There is no friend as loyal as a book.” - Ernest Hemingway</Typography>
    </Box>
  );
}

export default HomePage;
