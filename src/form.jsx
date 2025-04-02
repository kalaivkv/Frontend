import { useState } from "react";
import axios from "axios";
import {
  TextField,
  MenuItem,
  Button,
  Container,
  Typography,
  Box,
} from "@mui/material";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    dob: "",
    state: "",
  });
  const [errors, setErrors] = useState({});

  const states = ["Kashmir", "Delhi", "Maharashtra", "TamilNadu"];
  const genders = ["Male", "Female", "Other"];

  const validate = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    else if (!/^[A-Za-z ]+$/.test(formData.name))
      newErrors.name = "Name must contain only alphabets";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.state) newErrors.state = "Please select a state";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/register",
          formData
        );
        alert(response.data.message);
        setFormData({ name: "", email: "", gender: "", dob: "", state: "" });
      } catch (error) {
        alert("Error: " + (error.response?.data.error || "Server error"));
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ p: 4, mt: 5, bgcolor: "white", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          User Form
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            helperText={errors.gender}
            margin="normal"
          >
            {genders.map((gender) => (
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
            error={!!errors.dob}
            helperText={errors.dob}
            margin="normal"
          />
          <TextField
            fullWidth
            select
            label="State"
            name="state"
            value={formData.state}
            onChange={handleChange}
            error={!!errors.state}
            helperText={errors.state}
            margin="normal"
          >
            {states.map((state) => (
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
    </Container>
  );
};

export default FormComponent;
