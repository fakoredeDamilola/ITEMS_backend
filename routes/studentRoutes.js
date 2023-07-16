const express = require("express");
const {
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
  getAllUsers,
  DeleteUser,
} = require("../controller/studentController");

const router = express.Router();

// POST ROUTES
router.route("/create/table").get(createStudentTable);
router.route("/get/table").get(getStudentTable);
router.route("/create/any/table").post(createAnyStudentTable);
router.route("/insert/any/table").post(insertDataIntoStudentTable);
router.route("/update/any/table").put(alterDataInStudentTable);
router.route("/create/user/table").post(createUserTable);
router.route("/signin").post(signIn);
router.route("/create").post(createDataBase);
router.route("/create/admin").post(addANewAdminPrivilege);
// GET ROUTES
router.route("/query/table").get(getStudentInfo);
router.route("/users").get(getAllUsers);
// DELETE ROUTES
router.route("/delete/user").delete(DeleteUser);

// GET ROUTES

module.exports = router;
