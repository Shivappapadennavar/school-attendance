const db = require("../config/db");

exports.getAllUsers = (req, res) => {
  db.query("SELECT id,name,email,role FROM users", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};
