import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import { useAuthContext } from "../hooks/useAuthContext";
import TablePagination from "@mui/material/TablePagination";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';


function Users() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/user?page=${pageNumber}&q=${searchTerm}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setUsers(json.users);
      setUsersCount(json.total);
    }

    if (user) {
      fetchData();
    }
  }, [user, pageNumber, searchTerm]);

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
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }}>User</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >First name</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Last name</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Birth number</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }} component="th" scope="row">{user.username}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.first_name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.last_name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.birth_number}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersCount}
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

export default Users;