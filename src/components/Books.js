import React, { useState, useEffect } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import axios from '../axios';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

function Books() {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const req = await axios.get('/library/books');

      setBooks(req.data);
    }

    fetchData();
  }, []);

  return (
    <Box sx={{
      display:"flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }}>
      <TableContainer component={Paper} sx={{ width: "75%", mt: 3 }}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead sx={{ backgroundColor: "black" }}>
            <TableRow>
              <TableCell sx={{ color: "white", textAlign: "center" }}>Book</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Author</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Publication year</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Pages</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Image</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Quantity</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center"  }} >Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow
                key={book.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ textAlign: "center" }} component="th" scope="row">{book.name}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{book.author}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{book.publication_year}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>{book.pages}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <img 
                    src="https://covers.openlibrary.org/b/isbn/9789639307223-S.jpg"
                    //src="https://images.pexels.com/photos/768125/pexels-photo-768125.jpeg?auto=compress&cs=tinysrgb&h=80"
                    alt="new"
                  />
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>{book.quantity}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant='contained' color='primary'>Borrow</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Books;
