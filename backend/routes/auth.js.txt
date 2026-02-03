const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email=? AND password=?",
    [email, password],
    (err, result) => {
      if (result.length > 0) {
        const token = jwt.sign(
          { id: result[0].id, role: result[0].role },
          "secretkey"
        );
        res.json({ token, role: result[0].role });
      } else {
        res.status(401).send("Invalid credentials");
      }
    }
  );
});

module.exports = router;
