import React, { useState } from "react";
import api from "../api";

function TeacherDashboard() {
  const [studentId, setStudentId] = useState("");
  const [status, setStatus] = useState("Present");
  const [subject, setSubject] = useState("");
  const [marks, setMarks] = useState("");

  const token = localStorage.getItem("token");

  const markAttendance = async () => {
    await api.post("/attendance/mark",
      { student_id: studentId, status },
      { headers: { Authorization: token } }
    );
    alert("Attendance marked successfully");
  };

  const updateMarks = async () => {
    await api.post("/marks/add",
      { student_id: studentId, subject, marks },
      { headers: { Authorization: token } }
    );
    alert("Marks updated successfully");
  };

  return (
    <div>
      <h2>Teacher Dashboard</h2>

      <h3>Mark Attendance</h3>
      <input
        placeholder="Student ID"
        onChange={e => setStudentId(e.target.value)}
      />
      <select onChange={e => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>
      <button onClick={markAttendance}>Submit Attendance</button>

      <h3>Update Marks</h3>
      <input
        placeholder="Subject"
        onChange={e => setSubject(e.target.value)}
      />
      <input
        placeholder="Marks"
        onChange={e => setMarks(e.target.value)}
      />
      <button onClick={updateMarks}>Submit Marks</button>
    </div>
  );
}

export default TeacherDashboard;
