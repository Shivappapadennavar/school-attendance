const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
  const { name, email, password, role } = req.body;
  const hash = bcrypt.hashSync(password, 10);

  db.query(
    "INSERT INTO users (name,email,password,role) VALUES (?,?,?,?)",
    [name, email, hash, role],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "User registered successfully" });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], (err, users) => {
    if (!users.length)
      return res.status(401).json({ message: "User not found" });

    const user = users[0];
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: "Wrong password" });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "secret",
      { expiresIn: "1d" }
    );

    res.json({ token, role: user.role });
  });
};
