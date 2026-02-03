const express = require("express");
const db = require("../config/db");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

/*
========================================
 STUDENT: View Marks
 API: GET /api/marks/student
========================================
*/
router.get("/student", auth, (req, res) => {
  const studentId = req.user.id;

  db.query(
    "SELECT subject, marks FROM marks WHERE student_id = ?",
    [studentId],
    (err, result) => {
      if (err) {
        return res.status(500).send("Error fetching marks");
      }
      res.json(result);
    }
  );
});

/*
========================================
 TEACHER: Add / Update Marks
 API: POST /api/marks/add
========================================
*/
router.post("/add", auth, (req, res) => {
  const { student_id, subject, marks } = req.body;

  db.query(
    "INSERT INTO marks (student_id, subject, marks) VALUES (?, ?, ?)",
    [student_id, subject, marks],
    (err) => {
      if (err) {
        return res.status(500).send("Error adding marks");
      }
      res.send("Marks added successfully");
    }
  );
});

module.exports = router;
