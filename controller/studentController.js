const asyncHandler = require("express-async-handler");
const {studentConnection, staffConnection} = require("../db");
const {roles} = require("../utils/utilData");
const {
  hashPassword,
  matchPassword,
  getTotalStudentsByStudyStatus,
  groupStudentsByNationality,
} = require("../utils/utilFunc");
const {rolesRelationship} = require("../utils/roles");
const {generateToken, checkToken} = require("../middleware/authentication");

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
    // console.log(result);
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
    // console.log(result);
    res.send("add course has registered course table created.");
  });
});

const createAnyStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns} = req.body;
    const createTableQuery = `CREATE TABLE ${tableName} (${columns.join(
      ", "
    )})`;

    studentConnection.query(createTableQuery, (err, result) => {
      if (err) throw err;
      // console.log(result);
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
    const {
      selectedFields,
      selectionType,
      selections,
      userRole,
      facultyName,
      departmentNames,
    } = req.body;

    // Create the base SQL query
    let sqlQuery = "SELECT ";

    // Map selectedFields to include departmentName if department_id is requested
    const fieldsWithAliases = selectedFields.map((field) => {
      if (field === "department_id" && selectionType === "departmentName") {
        return "(SELECT GROUP_CONCAT(departmentName) FROM department WHERE department.departmentID = student.department_id) AS departmentName";
      }
      if (field === "faculty_id" && selectionType === "departmentName") {
        return "(SELECT GROUP_CONCAT(departmentName) FROM department WHERE department.departmentID = student.faculty_id) AS departmentName";
      }
      if (field === "faculty_id" && selectionType === "facultyName") {
        return "(SELECT GROUP_CONCAT(facultyName) FROM faculty WHERE faculty.facultyID = student.faculty_id) AS facultyName";
      }
      if (field === "department_id" && selectionType === "facultyName") {
        return "(SELECT GROUP_CONCAT(departmentName) FROM department WHERE department.departmentID = student.department_id) AS departmentName";
      }
      return field;
    });
    // Add selected fields to the query
    sqlQuery += fieldsWithAliases.join(", ");

    // Determine the table based on the selectedFields
    let tableName;
    let condition = "";

    switch (selectionType) {
      case "departmentName":
        tableName =
          "student JOIN department ON student.department_id = department.departmentID";
        condition = `
          AND departmentName IN (${selections
            .map((value) => `'${value}'`)
            .join(", ")})
        `;
        break;
      case "gender":
        tableName = "student";
        const genderTable = {male: "M", female: "F"};
        let newSelection = [];
        if (selections.length === 2) {
          newSelection.push("M");
          newSelection.push("F");
        } else {
          newSelection = [genderTable[selections[0]]];
        }
        condition = `AND gender IN (${newSelection
          .map((value) => `'${value}'`)
          .join(", ")})`;
        break;
      case "facultyName":
        // tableName = "student";
        // condition = `AND faculty_id IN (SELECT facultyID FROM faculty WHERE facultyName = ?)`;
        tableName =
          "student JOIN faculty ON student.faculty_id = faculty.facultyID";
        condition = `
          AND facultyName IN (${selections
            .map((value) => `'${value}'`)
            .join(", ")})
        `;
        break;
      case "level":
        tableName = "student";
        condition = `AND studyLevel IN (${selections
          .map((value) => `'${value}'`)
          .join(", ")})`;
        break;
      case "maritalStatus":
        tableName = "student";
        condition = `AND maritalStatus IN (${selections
          .map((value) => `'${value}'`)
          .join(", ")})`;
        break;
      default:
        tableName = "student";
        break;
    }

    // Additional access control conditions based on user role
    if (userRole === roles.deans) {
      condition += ` AND faculty_id IN (SELECT facultyID FROM faculty WHERE facultyName = ?)`;
    } else if (userRole === roles.hod) {
      condition += ` AND department_id IN (SELECT departmentID FROM department WHERE departmentName IN (?))`;
    }

    // Combine access and filter conditions
    const combinedCondition = `${condition}`;

    // Add the table and condition to the query
    sqlQuery += ` FROM ${tableName} WHERE 1=1 ${combinedCondition}`;

    // Parameters for the SQL query
    const params = [facultyName, departmentNames, selections];

    // Execute the SQL query
    studentConnection.query(sqlQuery, params, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        res.status(500).json({error: "Internal server error"});
      } else {
        res.status(200).json(results);
      }
    });
  } catch (e) {
    console.log({e});
    res.json({results: []});
  }
});
const getSummaryTable = asyncHandler(async (req, res) => {
  try {
    const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    console.log({decoded});
    if (decoded.email) {
      const results = await new Promise((resolve, reject) => {
        studentConnection.query(`SELECT * FROM student`, (err, result) => {
          // console.log({result});
          if (err) throw err;
          else {
            // resolve(result);

            const nationalStudents = groupStudentsByNationality(result);
            // console.log({nationalStudents});
            resolve({
              students: result,
              nationalStudents,
            });
          }
        });
      });
      // console.log({results});
      if (results.length === 0) {
        res.json("No data found");
      } else {
        res.json({results});
      }
    }
  } catch (e) {
    console.log({e});
    res.json("No data found");
  }
});
const insertDataIntoStudentTable = asyncHandler(async (req, res) => {
  try {
    const {tableName, columns, data} = req.body;
    const createTableQuery = `
    INSERT INTO ${tableName} 
    (${columns.join(", ")}) 
    VALUES ?
    `;
    // data is an array of arrays
    const values = data;
    studentConnection.query(createTableQuery, [values], (err, result) => {
      if (err) throw err;
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
    const createTableQuery = `
    ALTER TABLE ${tableName} 
    ${columns.join(", ")}; 
    `;
    studentConnection.query(createTableQuery, (err, result) => {
      if (err) throw err;
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
      res.send(`created user table`);
    });
  } catch (e) {
    console.log({e});
  }
});
const addANewAdminPrivilege = asyncHandler(async (req, res) => {
  try {
    const {email, password, role, name, status, accessLevel} = req.body;
    const hashedPassword = await hashPassword(password);
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
      res.json({message: "username/password already exists", status: false});
    } else {
      const AddNewAdmin = `INSERT INTO users (email, password, role, name,status,accessLevel) VALUES (?, ?, ?, ?, ?, ?)`;
      const values = [
        email,
        hashedPassword,
        role,
        name ?? "",
        status,
        accessLevel,
      ];
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
      res.send("daataabase created");
    }
  });
});
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    if (decoded.email) {
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
      res.json({user, status: true});
    }
  } catch (e) {
    console.log({e});
  }
});
const getAllStudents = asyncHandler(async (req, res) => {
  const sqlQuery = `
  SELECT faculty.facultyName, COUNT(student.faculty_id) AS studentCount
  FROM faculty
  LEFT JOIN student ON faculty.facultyID = student.faculty_id
  GROUP BY faculty.facultyName
`;
  try {
    // const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    // if (decoded.email) {
    let facultyStudentCounts = {};
    studentConnection.query(sqlQuery, (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        // connection.end();
        return;
      } else {
        // Process the results to create the object
        results.forEach((row) => {
          const facultyName = row.facultyName;
          const studentCount = row.studentCount;
          facultyStudentCounts[facultyName] = studentCount;
        });

        // Now, facultyStudentCounts contains the desired object
        console.log(facultyStudentCounts);
      }
      // Organize the data into an objec
      res.json({facultyStudentCounts, status: true});
    });

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
          resolve(results);
        }
      });
    });

    if (results.length === 0) {
      return {role: "", email: ""};
    } else {
      // const passwordCheck = await matchPassword(password, results[0].password);
      const passwordCheck = true;
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
    console.log({results, email, password});
    if (results.role && results.name) {
      const token = generateToken(
        email,
        results.role,
        results.accessLevel ?? "all",
        results.name
      );
      res.json({
        token,
        status: true,
        role: results.role,
        name: results.name,
        accessLevel: results.accessLevel,
        status: results.status,
      });
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
// async function fetchDataFromTable(tableName) {
//   try {
//     const rows = await studentConnection.execute(`SELECT * FROM ${tableName}`);
//     console.log({rows});
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

const getInitialData = asyncHandler(async (req, res) => {
  try {
    const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    console.log({decoded});
    // && decoded.role === roles.superrole
    if (decoded.email) {
      var sql = "SELECT * FROM department; SELECT * FROM faculty;";
      studentConnection.query(sql, [1, 2], (error, results) => {
        if (error) {
          console.error("error fetching department:", error);
          return;
        }
        if (decoded.role === roles.deans) {
          // console.log(results[1]);
          const faculty = results[1].find(
            (res) =>
              res.facultyName.toLowerCase() ===
              decoded.accessLevel.toLowerCase()
          );
          res.json({
            departments: results[0]
              .filter((res) => res.facultyID === faculty.facultyID)
              .map((res) => ({
                id: res.departmentID,
                name: res.departmentName,
              })),
            faculty: results[1].map((res) => ({
              id: res.facultyID,
              name: res.facultyName,
            })),
            status: true,
            message: "user deleted successfully",
          });
        } else if (decoded.role === roles.hod) {
          res.json({
            faculty: results[1].map((res) => ({
              id: res.facultyID,
              name: res.facultyName,
            })),
            status: true,
            message: "OK",
          });
        } else {
          res.json({
            departments: results[0].map((res) => ({
              id: res.departmentID,
              name: res.departmentName,
            })),
            faculty: results[1].map((res) => ({
              id: res.facultyID,
              name: res.facultyName,
            })),
            status: true,
            message: "user deleted successfully",
          });
        }
      });
    }
  } catch (e) {
    console.log({e});
  }
});
const getUserData = asyncHandler(async (req, res) => {
  try {
    const decoded = checkToken(req.headers.authorization.split(" ")[1]);
    console.log({decoded});
    // && decoded.role === roles.superrole
    if (decoded.email) {
      var sql = "SELECT * FROM department; SELECT * FROM faculty;";
      studentConnection.query(sql, [1, 2], (error, results) => {
        if (error) {
          console.error("error fetching department:", error);
          return;
        }

        res.json({
          departments: results[0].map((res) => ({
            id: res.departmentID,
            name: res.departmentName,
            facultyID: res.facultyID,
          })),
          faculty: results[1].map((res) => ({
            id: res.facultyID,
            name: res.facultyName,
          })),
          status: true,
        });
      });
    }
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
  getAllStudents,
  getSummaryTable,
  getUserData,
  getInitialData,
};
