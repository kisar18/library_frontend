import React, { useState } from 'react';
import Box from "@mui/material/Box";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from "@mui/material/TablePagination";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { useAuthContext } from "../hooks/useAuthContext";

function History() {

  const { user } = useAuthContext();

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const error = "Error";
  const isLoading = false;

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  return (
    <Box>
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
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Date</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Book</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={{ textAlign: "center", fontSize: "16px" }} component="th" scope="row">Date 1</TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>Book 1</TableCell>
              <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>User 1</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={historyCount}
            rowsPerPage={rowsPerPage}
            page={pageNumber}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
        {error && <div className="error">{error}</div>}
      </TableContainer>
    </Box>
  );
}

export default History;