import { Typography } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TablePagination from "@mui/material/TablePagination";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useReturnBook } from "../hooks/useReturnBook";

function Profile() {

  const [books, setBooks] = useState([]);
  const [profile, setProfile] = useState({});
  const { user } = useAuthContext();
  const { returnBook, error, isLoading } = useReturnBook();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8001/user/', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setBooks(json.books);
      setProfile(json);
    }

    if (user) {
      fetchData();
    }
  }, [books, user]);

  const handleReturnBook = async (name) => {
    await returnBook(name);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ mt: 2, width: "100%", textAlign: "center" }}>
      <Typography variant="h3" sx={{ my: 1, fontFamily: "cursive" }}>{profile.first_name} {profile.last_name}</Typography>
      <Typography variant="h5" sx={{ my: 1, fontFamily: "cursive" }}>{profile.address}</Typography>
      <Typography variant="h5" sx={{ my: 1, fontFamily: "cursive", textDecoration: "underline" }}>↓ Borrowed books ↓</Typography>

      <Box sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}>
        <TableContainer component={Paper} sx={{ width: "75%", mt: 2 }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead sx={{ backgroundColor: "black" }}>
              <TableRow>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>Book</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Author</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Publication year</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Pages</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Image</TableCell>
                <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Return</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? books.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : books
              ).map((book) => (
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
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant='contained' color='primary' onClick={() => handleReturnBook(book.name)} disabled={isLoading}>Return</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={books.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
          {error && <div className="error">{error}</div>}
        </TableContainer>
      </Box>
    </Box>
  );
}

export default Profile;
