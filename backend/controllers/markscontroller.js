const db = require("../config/db");

/**
 * Teacher adds or updates marks
 */
exports.addOrUpdateMarks = (req, res) => {
  const { student_id, subject, marks } = req.body;

  db.query(
    "SELECT * FROM marks WHERE student_id=? AND subject=?",
    [student_id, subject],
    (err, result) => {
      if (result.length > 0) {
        // Update marks
        db.query(
          "UPDATE marks SET marks=? WHERE student_id=? AND subject=?",
          [marks, student_id, subject],
          err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Marks updated successfully" });
          }
        );
      } else {
        // Insert marks
        db.query(
          "INSERT INTO marks (student_id, subject, marks) VALUES (?,?,?)",
          [student_id, subject, marks],
          err => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Marks added successfully" });
          }
        );
      }
    }
  );
};

/**
 * Student views marks
 */
exports.viewMarks = (req, res) => {
  db.query(
    "SELECT subject, marks FROM marks WHERE student_id=?",
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};
