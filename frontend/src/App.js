import React from "react";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";

function App() {
  const role = localStorage.getItem("role");

  if (!role) {
    return <Login />;
  }

  if (role === "student") {
    return <StudentDashboard />;
  }

  if (role === "teacher") {
    return <TeacherDashboard />;
  }

  return <h2>Unauthorized Access</h2>;
}

export default App;
