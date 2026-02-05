const db = require('../config/db');

exports.markAttendance = (req, res) => {
  const { student_id, date, status } = req.body;

  db.query(
    'INSERT INTO attendance (student_id, date, status) VALUES (?, ?, ?)',
    [student_id, date, status],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Attendance marked' });
    }
  );
};
