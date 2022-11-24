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
import { useBooksContext } from "../hooks/useBooksContext";
import { useReturnBook } from "../hooks/useReturnBook";

function Profile() {

  const { books, dispatch } = useBooksContext();
  const [profile, setProfile] = useState({});
  const { user } = useAuthContext();
  const { returnBook, error, isLoading } = useReturnBook();

  const [pageNumber, setPageNumber] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [booksCount, setBooksCount] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/user/${user.username}?page=${pageNumber}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      dispatch({ type: 'SET_BOOKS', payload: json.books });

      setProfile(json.user);
      setBooksCount(json.total);
    }

    if (user) {
      fetchData();
    }
  }, [user, pageNumber, dispatch]);

  const handleReturnBook = async (name) => {
    await returnBook(name);
    setBooksCount(booksCount - 1);
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
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
        <TableContainer component={Paper} sx={{ width: "100%", mt: 2 }}>
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
              {books && books.map((book) => (
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
                      src={book.image}
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
              count={booksCount}
              rowsPerPage={rowsPerPage}
              page={pageNumber}
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
