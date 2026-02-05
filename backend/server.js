const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

// Initialize DB connection (must not crash app)
require("./config/db");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Health check API (very important for Docker / EC2 testing)
app.get("/api/health", (req, res) => {
  res.send("School Attendance Backend is Running");
});

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/marks", require("./routes/marks"));

// Port
const PORT = 5000;

// 🚀 IMPORTANT: listen on 0.0.0.0 for Docker & EC2
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend server running on port ${PORT}`);
});

