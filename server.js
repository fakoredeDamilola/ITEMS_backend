const express = require("express");
const mysql = require("mysql");
const staffRouter = require("./routes/staffRoutes");
const cors = require("cors");
const studentRouter = require("./routes/studentRoutes");
const {studentConnection, staffConnection} = require("./db");
require("dotenv").config();

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
  cors({
    origin: "*",
    // origin: function (origin, callback) {
    //   if (whitelist.indexOf(origin) !== -1) {
    //     callback(null, true)
    //   } else {
    //     callback(new Error('Not allowed by CORS'))
    //   }
    // },
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// create student DB
app.get("/", (req, res) => {
  res.send("<h1>it is working</h1>");
});
app.get("/createstudentdb", (req, res) => {
  let sql = "CREATE DATABASE ttdataba_student";
  studentConnection.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log({result});
      res.send(" student daataabase created");
    }
  });
});

// // create staff DB
app.get("/createstaffdb", (req, res) => {
  let sql = "CREATE DATABASE ttdataba_staff";
  staffConnection.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log({result});
      res.send("staff daataabase created");
    }
  });
});

app.use("/api/student", studentRouter);
app.use("/api/staff", staffRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Sever started on port ${PORT}`));
