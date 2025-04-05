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

const initialFormState = {
  name: "",
  student_id: "",
  password: "",
  standard: "",
};

function ManagementDashboard({ user, onLogout }) {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState(initialFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students");
      setStudents(res.data);
    } catch (error) {
      console.error("Error fetching students", error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddStudent = () => {
    setFormData(initialFormState);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setIsEditing(true);
    setEditId(student.id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/students/${editId}`, formData);
      } else {
        await axios.post("http://localhost:5000/students", formData);
      }
      fetchStudents();
      setShowForm(false);
      setFormData(initialFormState);
    } catch (error) {
      console.error("Error saving student", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Management
        </Typography>
        <Button variant="contained" color="error" onClick={onLogout}>
          Logout
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      <Button variant="contained" color="primary" onClick={handleAddStudent}>
        Add New Student
      </Button>

      {showForm && (
        <Paper sx={{ mt: 3, p: 3, backgroundColor: "#f9f9f9" }} elevation={4}>
          <Typography variant="h6" gutterBottom>
            {isEditing ? "Edit Student" : "Add Student"}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Student ID"
                  name="student_id"
                  value={formData.student_id}
                  onChange={handleFormChange}
                  required
                  disabled={isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleFormChange}
                  required={!isEditing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Standard"
                  name="standard"
                  value={formData.standard}
                  onChange={handleFormChange}
                  required
                />
              </Grid>
            </Grid>
            <Box mt={3}>
              <Button type="submit" variant="contained" color="success">
                {isEditing ? "Update Student" : "Add Student"}
              </Button>
              <Button
                sx={{ ml: 2 }}
                variant="outlined"
                onClick={() => {
                  setShowForm(false);
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Paper>
      )}

      <Typography variant="h5" sx={{ mt: 4 }}>
        All Students
      </Typography>
      <Box sx={{ mt: 2 }}>
        {students.map((stu) => (
          <Paper
            key={stu.id}
            sx={{
              mb: 2,
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
            }}
          >
            <Box>
              <Typography>
                <strong>Name:</strong> {stu.name}
              </Typography>
              <Typography>
                <strong>Student ID:</strong> {stu.student_id}
              </Typography>
              <Typography>
                <strong>Standard:</strong> {stu.standard}
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => handleEdit(stu)}
            >
              Edit
            </Button>
          </Paper>
        ))}
      </Box>
    </Box>
  );
}

export default ManagementDashboard;
