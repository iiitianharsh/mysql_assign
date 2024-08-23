const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");


// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "school",
  authPlugins: {
    mysql_native_password: () => () => Buffer.from("root123")
  }
});

// Connect to the database
connection.connect(error => {
  if (error) {
    console.error("error connecting: " + error.stack);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = connection;
