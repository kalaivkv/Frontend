import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, TextField, Typography, Paper, Grid } from "@mui/material";

const Dashboard = ({ user }) => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ name: "", standard: "" });

  const fetchStudents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/students", {
        params: { role: user.role, student_id: user.student_id },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
    setForm({ name: student.name, standard: student.standard });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/students/${editingStudent.id}`,
        form
      );
      fetchStudents();
      setEditingStudent(null);
    } catch (err) {
      console.error("Update Error:", err);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h5">Welcome {user.name}</Typography>
      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} md={6} key={student.id}>
            <Paper elevation={3} style={{ padding: "15px" }}>
              <Typography variant="h6">{student.name}</Typography>
              <Typography>ID: {student.student_id}</Typography>
              <Typography>Standard: {student.standard}</Typography>
              {user.role === "management" ||
              student.student_id === user.student_id ? (
                <Button variant="outlined" onClick={() => handleEdit(student)}>
                  Edit
                </Button>
              ) : null}
            </Paper>
          </Grid>
        ))}
      </Grid>

      {editingStudent && (
        <div style={{ marginTop: "20px" }}>
          <Typography variant="h6">Edit Student</Typography>
          <TextField
            label="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{ marginRight: "10px" }}
          />
          <TextField
            label="Standard"
            value={form.standard}
            onChange={(e) => setForm({ ...form, standard: e.target.value })}
            style={{ marginRight: "10px" }}
          />
          <Button variant="contained" onClick={handleUpdate}>
            Save
          </Button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
