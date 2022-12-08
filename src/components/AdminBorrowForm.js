import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLocation } from 'react-router-dom';
import { useBorrow } from "../hooks/useBorrow";
import "../index.css";

function AdminBorrowForm() {

  const location = useLocation();
  const { borrow, error, isLoading } = useBorrow();

  const [username, setUsername] = useState('');
  const [bookName, setBookName] = useState(location.state.bookName);

  const handleBorrowforUser = async (e) => {
    e.preventDefault();
    console.log("Admin borrow");
    await borrow(location.state._id, username);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width: "75%" }} onSubmit={handleBorrowforUser}>
        <h1>Admin borrows book for another user</h1>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="book"
            label="Book"
            value={bookName}
            onChange={e => { setBookName(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        {error && <div className="error">{error}</div>}
        <Box sx={{ mt: 3 }}>
          <Button type='submit' variant="contained" size="large" disabled={isLoading}>Borrow</Button>
        </Box>
      </form>
    </Box>
  );
}

export default AdminBorrowForm;