const db = require('../config/db');

exports.viewAttendance = (req, res) => {
  db.query(
    'SELECT date, status FROM attendance WHERE student_id = ?',
    [req.user.id],
    (err, results) => {
      res.json(results);
    }
  );
};
