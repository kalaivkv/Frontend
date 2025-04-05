import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Alert,
} from "@mui/material";

function Login({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email: identifier.includes("@") ? identifier : undefined,
        student_id: !identifier.includes("@") ? identifier : undefined,
        password,
      });

      const { token, user } = res.data;
      localStorage.setItem("token", token);
      onLogin(user);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box mt={10} p={4} boxShadow={3}>
        <Typography variant="h5" align="center" gutterBottom>
          PSG Login
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email or Student ID"
            fullWidth
            margin="normal"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
            required
          />
          <TextField
            label="Password"
            fullWidth
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth color="primary">
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}
export default Login;
