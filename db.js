const mysql = require("mysql2");

require("dotenv").config();

// create connection
const studentConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  timezone: "utc",
  database: process.env.DB_DATABASE,
});

// create connection
const staffConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  timezone: "utc",
  // database: process.env.DB_DATABASE_2,
});

studentConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("student database connected");
  }
});

staffConnection.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("staff database connected");
  }
});

module.exports = {staffConnection, studentConnection};
