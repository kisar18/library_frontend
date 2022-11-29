import React, { useState, useEffect } from 'react';
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
  const [historyItems, setHistoryItems] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/histories?page=${pageNumber}&q=${searchTerm}&ps=${rowsPerPage}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setHistoryItems(json.historyItems);
      setHistoryCount(json.total);
      setRowsPerPage(json.PAGESIZE);
    }

    if (user) {
      fetchData();
    }
  }, [user, pageNumber, searchTerm, rowsPerPage]);

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
              placeholder="Search for a item"
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
            {historyItems && historyItems.map((item) => (
              <TableRow
                key={item._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ textAlign: "center", fontSize: "16px", width: "33%" }} component="th" scope="row">{item.createdAt}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px", width: "33%" }}>{item.user}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px", width: "33%" }}>{item.book}</TableCell>
              </TableRow>
            ))}
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
      </TableContainer>
    </Box>
  );
}

export default History;