const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "school",
  connectionLimit: 10, // Set the number of connections in the pool
  authPlugins: {
    mysql_native_password: () => () => Buffer.from("root123"),
  },
});

// Function to connect to the database and handle errors
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    } else if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    } else if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    } else {
      console.error('Database connection error:', err);
    }
  }

  if (connection) {
    console.log('Connected to the database.');
    connection.release(); // Release the connection back to the pool
  }
});

// Export the pool to use it in your queries
module.exports = pool;
