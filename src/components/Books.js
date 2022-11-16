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
import Pagination from "@mui/material/Pagination";

function Books() {

  const pageSize = 5;
  const [books, setBooks] = useState([]);
  const [paginationBooks, setPaginationBooks] = useState([]);
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize
  });

  const { user } = useAuthContext();
  const { borrow, error, isLoading } = useBorrow();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:8001/books', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setBooks(json);
      setPagination({ ...pagination, count: json.length });
      setPaginationBooks(json.slice(0, 5));
      console.log(paginationBooks);
    }

    if (user) {
      fetchData();
    }
  }, []);

  const handleBorrow = async (_id) => {
    await borrow(_id);
  };

  const handlePageChange = (e, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;

    setPagination({ ...pagination, from: from, to: to });
  };

  return (
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
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Quantity</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Borrow</TableCell>
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
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{book.quantity}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  <Button variant='contained' color='primary' onClick={() => handleBorrow(book._id)} disabled={isLoading}>Borrow</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <Pagination count={Math.ceil(pagination.count / pageSize)} onChange={handlePageChange} />
        </Box>
        {error && <div className="error">{error}</div>}
      </TableContainer>
    </Box>
  );
}

export default Books;
