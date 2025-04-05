import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Divider,
} from "@mui/material";

function StudentDashboard({ user, onLogout }) {
  const [studentData, setStudentData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    standard: "",
    password: "",
  });

  useEffect(() => {
    fetchStudentDetails();
  }, []);

  const fetchStudentDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students/${user.id}`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      setStudentData(res.data);
      setFormData({
        name: res.data.name,
        standard: res.data.standard,
        password: "",
      });
    } catch (err) {
      console.error("Error fetching student data", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/students/${user.id}`, formData);
      fetchStudentDetails();
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating student", error);
    }
  };

  if (!studentData) return <Typography>Loading...</Typography>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Profile Name : {studentData.name} (Student)
      </Typography>
      <Divider sx={{ mb: 3 }} />

      {!isEditing ? (
        <Paper sx={{ p: 3, backgroundColor: "#f5f5f5", mb: 3 }} elevation={3}>
          <Typography>
            <strong>Student ID:</strong> {studentData.student_id}
          </Typography>
          <Typography>
            <strong>Name:</strong> {studentData.name}
          </Typography>
          <Typography>
            <strong>Standard:</strong> {studentData.standard}
          </Typography>

          <Box mt={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setIsEditing(true)}
            >
              Edit Details
            </Button>
          </Box>
        </Paper>
      ) : (
        <Paper sx={{ p: 3, backgroundColor: "#f9f9f9", mb: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Edit Your Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Standard"
                name="standard"
                value={formData.standard}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box mt={3}>
            <Button variant="contained" color="success" onClick={handleSave}>
              Save Changes
            </Button>
            <Button
              sx={{ ml: 2 }}
              variant="outlined"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </Box>
        </Paper>
      )}

      <Button variant="contained" color="error" onClick={onLogout}>
        Logout
      </Button>
    </Box>
  );
}

export default StudentDashboard;
