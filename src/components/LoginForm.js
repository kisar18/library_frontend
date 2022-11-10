import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { useLogin } from "../hooks/useLogin";
import "../index.css";

function LoginForm() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();

    await login(username, password);
  };

  return (
    <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
      <form style={{ width: "75%" }} onSubmit={handleLogin}>
        <h1>Login</h1>
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
          <TextField
            name="password"
            label="Password"
            value={password}
            onChange={e => { setPassword(e.target.value); }}
            type="password"
            required
            fullWidth
          />
        </Box>
        {error && <div className="error">{error}</div>}
        <Box sx={{ mt: 3, display: "flex" }}>
          <Typography sx={{ mr: 1 }}>
            Dont have an account
          </Typography>
          <Link to="/">Sign up</Link>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Button type='submit' variant="contained" disabled={isLoading} size="large">Login</Button>
        </Box>
      </form>
    </Box>
  );
}

export default LoginForm;
