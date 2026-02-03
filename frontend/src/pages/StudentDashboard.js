import React, { useEffect, useState } from "react";
import api from "../api";

function StudentDashboard() {
  const [attendance, setAttendance] = useState([]);
  const [marks, setMarks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // Fetch attendance
    api.get("/attendance/student", {
      headers: { Authorization: token }
    }).then(res => setAttendance(res.data));

    // Fetch marks
    api.get("/marks/student", {
      headers: { Authorization: token }
    }).then(res => setMarks(res.data));

  }, []);

  return (
    <div>
      <h2>Student Dashboard</h2>

      <h3>Attendance</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((a, index) => (
            <tr key={index}>
              <td>{a.date}</td>
              <td>{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Marks</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((m, index) => (
            <tr key={index}>
              <td>{m.subject}</td>
              <td>{m.marks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentDashboard;
