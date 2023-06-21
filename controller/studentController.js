const asyncHandler = require("express-async-handler");
const {studentConnection, staffConnection} = require("../db");
const {roles} = require("../utils/utilData");
const {hashPassword, matchPassword} = require("../utils/utilFunc");
const {rolesRelationship} = require("../utils/roles");
const {generateToken, checkToken} = require("../middleware/authentication");

const createStudent = asyncHandler(async (req, res) => {
  console.log("creating student");
});

const createStudentTable = asyncHandler(async (req, res) => {
  let sql = `CREATE TABLE addcourse(
    matricNum int(7) NOT NULL,
    courseID int(7) NOT NULL,
    approvalDate varchar(45) DEFAULT NULL,
    approvalDocumentScan varchar(45) DEFAULT NULL,
    approvalDocument varchar(45) DEFAULT NULL,
    sessionID varchar(45) DEFAULT NULL
    )
    `;
  studentConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("student add course table created.");
  });
});

const createAddCourseHasRegisteredCoursed = asyncHandler(async (req, res) => {
  let sql = `CREATE TABLE addcourse_has_registeredcourses(
        addcourse_matricNum int(7) NOT NULL,
        registeredcourses_matricNum int(10) NOT NULL
        )
        `;
  studentConnection.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("add course has registered course table created.");
  });
});

const createAnyStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns} = req.body;
    console.log({tableName, columns});
    const createTableQuery = `CREATE TABLE ${tableName} (${columns.join(
      ", "
    )})`;

    studentConnection.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(
        `${tableName} has been created on the student database. it has ${columns.length} columns.`
      );
    });
  } catch (e) {
    console.log({e});
  }
});

const getStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns, conditions} = req.body;
    console.log({tableName, columns});
    // let createTableQuery = `SELECT  ${columns.join(", ")} FROM ${tableName}`;
    // if (conditions) {
    //   createTableQuery = `SELECT  ${columns.join(
    //     ", "
    //   )} FROM ${tableName} WHERE ${conditions}`;
    // }
    let createTableQuery =
      "SELECT u.*, o.countryName FROM student u JOIN countries o ON u.countryID = o.countryID";

    console.log({createTableQuery});
    studentConnection.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(result);
    });
  } catch (e) {
    console.log({e});
  }
});
const insertDataIntoStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns, data} = req.body;
    console.log({tableName, columns, data});
    const createTableQuery = `
    INSERT INTO ${tableName} 
    (${columns.join(", ")}) 
    VALUES ?
    `;
    // data is an array of arrays
    const values = data;
    studentConnection.query(createTableQuery, [values], (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(
        `${data.length} has been inserted into the ${tableName} table in the student database. it has ${columns.length} columns.`
      );
    });
  } catch (e) {
    console.log({e});
  }
});
const alterDataInStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns} = req.body;
    console.log({tableName, columns});
    const createTableQuery = `
    ALTER TABLE ${tableName} 
    ${columns.join(", ")}; 
    `;
    studentConnection.query(createTableQuery, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(
        `altered ${tableName} table in the student database. it has ${columns.length} columns.`
      );
    });
  } catch (e) {
    console.log({e});
  }
});

const createUserTable = asyncHandler(async (req, res) => {
  try {
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
          email VARCHAR(255) NOT NULL,
          password VARCHAR(255) NOT NULL,
          role ENUM('superrole', 'principal', 'director', 'deans', 'hod') NOT NULL,
          description VARCHAR(255)
        )
      `;

    studentConnection.query(createUsersTable, (err, result) => {
      if (err) throw err;
      console.log(result);
      res.send(`created user table`);
    });
  } catch (e) {
    console.log({e});
  }
});
const addANewAdminPrivilege = asyncHandler(async (req, res) => {
  try {
    const {email, password, role, description} = req.body;
    const hashedPassword = await hashPassword(password);
    console.log({email, password, role, description});
    let newRole = roles[role];
    console.log({newRole, hashedPassword});
    if (newRole === role) {
      const AddNewAdmin = `INSERT INTO users (email, password, role, description) VALUES (?, ?, ?, ?)`;
      const values = [email, hashedPassword, role, description ?? ""];
      studentConnection.query(AddNewAdmin, values, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send(`created a new user `);
      });
    }
  } catch (e) {
    console.log({e});
  }
});

const createDataBase = asyncHandler(async (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  staffConnection.query(sql, (err, result) => {
    if (err) {
      throw err;
    } else {
      console.log({result});
      res.send("daataabase created");
    }
  });
});
const checkCredentials = async (email, password) => {
  try {
    const query = `
      SELECT *
      FROM users
      WHERE email = ?
    `;
    const results = await new Promise((resolve, reject) => {
      studentConnection.query(query, [email], (error, results) => {
        if (error) {
          reject(error);
        } else {
          console.log({results});
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      return {role: "", id: ""};
    } else {
      const passwordCheck = await matchPassword(password, results[0].password);
      console.log({passwordCheck});
      if (passwordCheck) {
        console.log({results});
        return results[0];
      } else {
        return {role: "", id: ""};
      }
    }
  } catch (err) {
    console.error("Error checking credentials:", err);
    throw err;
  }
};

const signIn = asyncHandler(async (req, res) => {
  try {
    const {email, password} = req.body;
    const results = await checkCredentials(email, password);
    console.log({results});
    if (results.role && results.id) {
      const token = generateToken(email, results.role, results.id);
      console.log({token});
      res.json({token});
    } else {
      res.json("invalid username or password");
    }
  } catch (e) {
    console.log({e});
  }
});

const getStudentInfo = asyncHandler(async (req, res) => {
  try {
    const user = checkToken(req.headers.authorization.split(" ")[1]);
    console.log({user});
    if (user) {
      console.log({user});
      const userRoles = rolesRelationship[user.role];
      console.log({userRoles});
      if (
        userRoles.restrictions.length === 0 &&
        userRoles.access.length === 0
      ) {
        console.log("we are here");
      }
    } else {
      console.log("invalid user");
    }
  } catch (e) {
    console.log({e});
  }
});

module.exports = {
  createStudentTable,
  createAddCourseHasRegisteredCoursed,
  createAnyStudentTable,
  insertDataIntoStudentTable,
  alterDataInStudentTable,
  createUserTable,
  addANewAdminPrivilege,
  signIn,
  getStudentInfo,
  createDataBase,
  getStudentTable,
};
