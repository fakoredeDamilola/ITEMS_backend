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
    const {queryData} = req.query;
    console.log({queryData});

    const results = await new Promise((resolve, reject) => {
      studentConnection.query(queryData, (err, result) => {
        if (err) throw err;
        else {
          resolve(result);
        }
      });
    });
    console.log({results});
    if (results.length === 0) {
      res.json("No data found");
    } else {
      console.log({results}, "ues");
      res.json({results});
    }
  } catch (e) {
    console.log({e});
    res.json("No data found");
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
    const {email, password, role, name} = req.body;
    const hashedPassword = await hashPassword(password);
    console.log({email, password, role});
    let newRole = roles[role];
    const user = await new Promise((resolve, reject) => {
      studentConnection.query(
        `SELECT * FROM users WHERE email='${email}'`,
        (error, results) => {
          if (error) {
            console.error("Error retrieving data:", error);
            return;
          }
          console.log({results});
          resolve(results);
        }
      );
    });
    if (user.length > 0 && user[0].email) {
      res.send("username/password already exists");
    } else {
      if (newRole === role) {
        const AddNewAdmin = `INSERT INTO users (email, password, role, name) VALUES (?, ?, ?, ?)`;
        const values = [email, hashedPassword, role, name ?? ""];
        await new Promise((resolve, reject) => {
          studentConnection.query(AddNewAdmin, values, (err, result) => {
            if (err) throw err;
            else {
              resolve(result);
            }
          });
        });
        const user = await new Promise((resolve, reject) => {
          studentConnection.query(`SELECT * FROM users`, (error, results) => {
            if (error) {
              console.error("Error retrieving data:", error);
              return;
            }
            resolve(results);
          });
        });
        res.json({user, status: true});
      }
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
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    // const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    // console.log({decoded});
    // if (decoded.email) {
    const user = await new Promise((resolve, reject) => {
      studentConnection.query(
        `SELECT role, email, name FROM users`,
        (error, results) => {
          if (error) {
            console.error("Error retrieving data:", error);
            return;
          }
          resolve(results);
        }
      );
    });
    console.log({user});
    res.json({user, status: true});
    // }
  } catch (e) {
    console.log({e});
  }
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
      return {role: "", email: ""};
    } else {
      const passwordCheck = await matchPassword(password, results[0].password);
      if (passwordCheck) {
        return results[0];
      } else {
        return {role: "", email: ""};
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
    if (results.role && results.name) {
      const token = generateToken(email, results.role, results.name);
      res.json({token, status: true});
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
    if (user) {
      const userRoles = rolesRelationship[user.role];
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

const DeleteUser = asyncHandler(async (req, res) => {
  try {
    const {email} = req.body;
    console.log({email}, req.body);
    studentConnection.query(
      "DELETE FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("Error deleting user:", error);
          return;
        }
        res.json({status: true, message: "user deleted successfully"});
      }
    );
  } catch (e) {
    console.log({e});
  }
});

module.exports = {
  createStudentTable,
  createAddCourseHasRegisteredCoursed,
  createAnyStudentTable,
  DeleteUser,
  insertDataIntoStudentTable,
  alterDataInStudentTable,
  createUserTable,
  addANewAdminPrivilege,
  signIn,
  getStudentInfo,
  createDataBase,
  getStudentTable,
  getAllUsers,
};
