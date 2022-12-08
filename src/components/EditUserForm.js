import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useLocation } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext";
import { useEditUser } from "../hooks/useEditUser";
import "../index.css";

function EditUserForm() {

  const { user } = useAuthContext();
  const location = useLocation();
  const { editUser, error, isLoading } = useEditUser();

  const [_id, setId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthNumber, setBirthNumber] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState(location.state.username);
  const [password, setPassword] = useState('');
  const [accountStatus, setAccountStatus] = useState('');

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`http://localhost:8001/users/${location.state.username}`, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      setId(json.user._id);
      setFirstName(json.user.first_name);
      setLastName(json.user.last_name);
      setBirthNumber(json.user.birth_number);
      setAddress(json.user.address);
      setPassword(json.user.password);
      setAccountStatus(json.user.account_status);
    }

    if (user) {
      fetchData();
    }
  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    await editUser(_id, firstName, lastName, birthNumber, address, username, password, accountStatus);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width: "75%" }} onSubmit={handleSubmit}>
        <h1>Edit account</h1>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="firstName"
            label="First name"
            value={firstName}
            onChange={e => { setFirstName(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="lastName"
            label="Last name"
            value={lastName}
            onChange={e => { setLastName(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="birthNumber"
            label="Birth number"
            value={birthNumber}
            onChange={e => { setBirthNumber(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="address"
            label="Address"
            value={address}
            onChange={e => { setAddress(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <TextField
            name="username"
            label="Username"
            value={username}
            onChange={e => { setUsername(e.target.value); }}
            required
            fullWidth
          />
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button type='submit' variant="contained" size="large" disabled={isLoading}>Edit account</Button>
        </Box>
        {error && <div className="error">{error}</div>}
      </form>
    </Box>
  );

}

export default EditUserForm;
