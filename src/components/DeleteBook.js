import React from "react";
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { useDeleteBook } from "../hooks/useDeleteBook";

function DeleteBook() {

  const location = useLocation();

  const { deleteBook, error, isLoading } = useDeleteBook();

  const handleDelete = async () => {
    await deleteBook(location.state.bookId);
  };

  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 5 }}>
      <Box sx={{ p: 3 }}>
        <Typography variant="h4">Are you sure you want to delete book from catalogue: {location.state.bookName}</Typography>
        <Typography variant="h6">By clicking "Yes" you will not only delete this book from catalogue, but aswell from users borrows</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 3 }}>
          <Button variant='contained' size="large" onClick={handleDelete} disabled={isLoading}>Yes</Button>
          <Button variant='contained' size="large" disabled={isLoading}>No</Button>
        </Box>
      </Box>
      {error && <div className="error">{error}</div>}
    </Box>
  );
}

export default DeleteBook;
