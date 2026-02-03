const mysql = require("mysql");

const dbConfig = {
  host: "mysql",      // docker-compose service name
  user: "root",
  password: "root",
  database: "schooldb",
};

let connection;

function connectWithRetry() {
  console.log("Trying to connect to MySQL...");

  connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
    if (err) {
      console.error("MySQL connection failed:", err.message);
      console.log("Retrying in 5 seconds...");
      setTimeout(connectWithRetry, 5000);
    } else {
      console.log("MySQL Connected successfully");
    }
  });

  connection.on("error", (err) => {
    console.error("MySQL error:", err.message);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      connectWithRetry();
    }
  });
}

connectWithRetry();

module.exports = connection;

