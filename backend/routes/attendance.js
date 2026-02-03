const express = require('express');
const db = require('../config/db');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/mark', auth, (req, res) => {
  const { student_id, status } = req.body;

  db.query(
    "INSERT INTO attendance (student_id, date, status) VALUES (?, CURDATE(), ?)",
    [student_id, status],
    () => res.send("Attendance marked")
  );
});

module.exports = router;
