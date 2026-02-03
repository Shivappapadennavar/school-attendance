const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/marks", require("./routes/marks"));

// Health Check API (for Docker / Jenkins)
app.get("/api/health", (req, res) => {
  res.send("School Attendance Backend is Running");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
