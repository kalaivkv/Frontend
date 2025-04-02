import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

const socket = io("http://localhost:5000", {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    state: "",
  });

  const [notification, setNotification] = useState({
    open: false,
    message: "",
  });

  useEffect(() => {
    socket.on("userRegistered", (data) => {
      console.log(`New user registered: ${data.name}, ${data.email}`);
      setNotification({
        open: true,
        message: `New User: ${data.name} (${data.email})`,
      });
    });

    return () => socket.off("userRegistered");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/register", formData);
      console.log("User registration successful.");
      setNotification({ open: true, message: "Registration successful!" });

      setFormData({ name: "", email: "", gender: "", dob: "", state: "" });
    } catch (error) {
      console.error("Error:", error.response?.data.error || "Server error");
      setNotification({ open: true, message: "Error: Registration failed." });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ p: 4, mt: 5, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            margin="normal"
            required
          >
            {["Male", "Female", "Other"].map((gender) => (
              <MenuItem key={gender} value={gender}>
                {gender}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            fullWidth
            label="Date of Birth"
            name="dob"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.dob}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            select
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            margin="normal"
            required
          >
            {["Kashmir", "Delhi", "Maharashtra", "Tamil Nadu"].map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Box>

      <Snackbar
        open={notification.open}
        autoHideDuration={3000}
        onClose={() => setNotification({ open: false, message: "" })}
      >
        <Alert
          onClose={() => setNotification({ open: false, message: "" })}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default FormComponent;
