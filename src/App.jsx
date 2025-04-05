import React, { useState } from "react";
import Login from "./Login";
import ManagementDashboard from "./ManagementDashboard";
import StudentDashboard from "./StudentDashboard";
import { CssBaseline, Container } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ mt: 4 }}>
        {!user ? (
          <Login onLogin={setUser} />
        ) : user.role === "management" ? (
          <ManagementDashboard user={user} onLogout={() => setUser(null)} />
        ) : (
          <StudentDashboard user={user} onLogout={() => setUser(null)} />
        )}
      </Container>
    </>
  );
}

export default App;
