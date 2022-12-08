import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import { useAuthContext } from "../hooks/useAuthContext";
import TablePagination from "@mui/material/TablePagination";
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useChangeUserStatus } from "../hooks/useChangeUserStatus";

function Users() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [usersCount, setUsersCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCategory, setSortCategory] = useState("");

  const { changeUserStatus, isLoading, error } = useChangeUserStatus();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/users?page=${pageNumber}&q=${searchTerm}&ps=${rowsPerPage}&s=${sortCategory}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setUsers(json.users);
      setUsersCount(json.total);
      setRowsPerPage(json.PAGESIZE);
    }

    if (user) {
      fetchData();
    }
  }, [user, pageNumber, searchTerm, rowsPerPage, sortCategory]);

  const handlePageChange = (event, newPage) => {
    setPageNumber(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPageNumber(0);
  };

  const handleVerifyUser = async (username) => {
    changeUserStatus(username, "verified");
  };

  const handleBanUser = async (username) => {
    changeUserStatus(username, "banned");
  };

  const handleUnbanUser = async (username) => {
    changeUserStatus(username, "unbanned");
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
              placeholder="Search for a user"
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
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >
                <Button onClick={() => setSortCategory("first_name")} sx={{ color: 'white', fontWeight: "bold", textDecoration: "underline" }}>First name</Button>
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >
                <Button onClick={() => setSortCategory("last_name")} sx={{ color: 'white', fontWeight: "bold", textDecoration: "underline" }}>Last name</Button>
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >
                <Button onClick={() => setSortCategory("address")} sx={{ color: 'white', fontWeight: "bold", textDecoration: "underline" }}>Address</Button>
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >
                <Button onClick={() => setSortCategory("birth_number")} sx={{ color: 'white', fontWeight: "bold", textDecoration: "underline" }}>Birth number</Button>
              </TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Status</TableCell>
              <TableCell sx={{ color: "white", textAlign: "center", fontWeight: "bold", fontSize: "18px" }} >Edit / Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users && users.map((user) => (
              <TableRow
                key={user._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }} component="th" scope="row">{user.username}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.first_name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.last_name}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.address}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.birth_number}</TableCell>
                <TableCell sx={{ textAlign: "center", fontSize: "16px" }}>{user.account_status}</TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {user.username !== "admin" &&
                    <Button
                      variant='contained'
                      color='info'
                      sx={{ mr: { xs: 0, lg: 2 } }}
                      onClick={() => handleVerifyUser(user.username)}
                      disabled={isLoading}
                    >
                      Verify
                    </Button>
                  }
                  {user.username !== "admin" &&
                    <Button
                      variant='contained'
                      color='success'
                      sx={{ mr: { xs: 0, lg: 2 } }}
                      onClick={() => handleUnbanUser(user.username)}
                      disabled={isLoading}
                    >
                      Unban
                    </Button>
                  }
                  {user.username !== "admin" &&
                    <Button
                      variant='contained'
                      color='error'
                      onClick={() => handleBanUser(user.username)}
                      disabled={isLoading}
                    >
                      Ban
                    </Button>
                  }
                </TableCell>
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
      {error && <div className="error">{error}</div>}
      <Box>
        <Button sx={{ mt: 3 }} variant='contained' color="info" size="large">
          <Link to="/register" className='userspage__add'>Add new user</Link>
        </Button>
      </Box>
    </Box>
  );
}

export default Users;