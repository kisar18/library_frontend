import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

function Profile() {

  const { user } = useAuthContext();

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8001/user/', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setBooks(json.books);
    }

    if (user) {
      fetchData();
    }
  }, []);

  return (
    <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
      <Typography variant="h5" sx={{ my: 2 }}>Profile: {user.username}</Typography>
      <Typography variant="h5" sx={{ my: 2 }}>First name: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Last name: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Birth number: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Address: </Typography>
      <Typography variant="h5" sx={{ my: 2 }}>Borrowed books: </Typography>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <TableContainer component={Paper} sx={{ width: "75%", mt: 3 }}>
          <Table sx={{ minWidth: 650 }} size="medium">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>Book</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Author</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Publication year</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Pages</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {books.map((book) => (
                <TableRow
                  key={book._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ textAlign: "center", fontSize: "16px" }} component="th" scope="row">{book.name}</TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{book.author}</TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{book.publication_year}</TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{book.pages}</TableCell>
                  <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>
                    <img
                      src="https://covers.openlibrary.org/b/isbn/9789639307223-S.jpg"
                      //src="https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&h=80"
                      alt="new"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Profile;
