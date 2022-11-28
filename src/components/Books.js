import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useAuthContext } from "../hooks/useAuthContext";
import { useBorrow } from "../hooks/useBorrow";
import TablePagination from "@mui/material/TablePagination";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useBooksContext } from "../hooks/useBooksContext";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Books() {

  const navigate = useNavigate();

  const { books, dispatch } = useBooksContext();
  const { user } = useAuthContext();
  const { borrow, error, isLoading } = useBorrow();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [booksCount, setBooksCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/books?page=${pageNumber}&q=${searchTerm}&ps=${rowsPerPage}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      dispatch({ type: 'SET_BOOKS', payload: json.books });

      setBooksCount(json.total);
      setRowsPerPage(json.PAGESIZE);
    }

    if (user) {
      fetchData();
    }
  }, [user, pageNumber, searchTerm, rowsPerPage]);

  const handleBorrow = async (_id) => {
    await borrow(_id);
  };

  const handleEdit = async (_id) => {
    navigate("/editBook", {
      state: {
        bookId: _id
      }
    });
  };

  const handleDelete = async (_id, name) => {
    navigate("/deleteBook", {
      state: {
        bookId: _id,
        bookName: name
      }
    });
  };

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Box sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <TableContainer component={Paper} sx={{ width: "100%", mt: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Paper
            sx={{ display: 'flex', ml: 2, border: "1px solid black" }}
          >
            <InputBase
              onChange={e => setSearchTerm(e.target.value)}
              sx={{ ml: 1, flex: 1, fontSize: "20px" }}
              placeholder="Search for a book"
            />
            <IconButton type="submit" sx={{ p: '8px' }}>
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        <Table sx={{ minWidth: 650 }} size="medium">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>Book</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Author</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Publication year</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Pages</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Image</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Quantity</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Borrow</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Edit / Delete</TableCell>
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
                    //src="https://covers.openlibrary.org/b/isbn/9513114724-S.jpg"
                    //src="https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&h=80"
                    alt="new"
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{book.quantity}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant='contained' color='primary' onClick={() => handleBorrow(book._id)} disabled={isLoading || book.quantity === 0}>Borrow</Button>
                </TableCell>
                {user && user.username === "admin" &&
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button
                      variant='contained'
                      color='info'
                      onClick={() => handleEdit(book._id)}
                      disabled={isLoading || book.quantity === 0}
                      sx={{ mr: { xs: 0, lg: 2 }, mb: { xs: 2, lg: 0 } }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => handleDelete(book._id, book.name)}
                      disabled={isLoading || book.quantity === 0}
                    >
                      Delete
                    </Button>
                  </TableCell>
                }
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
      {user && user.username === "admin" &&
        <Box>
          <Button sx={{ mt: 3 }} variant='contained' color="info" size="large">
            <Link to="/createBook" className='bookspage__add'>Add new book</Link>
          </Button>
        </Box>
      }
    </Box>
  );
}

export default Books;
