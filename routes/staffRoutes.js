const express = require("express");
const { createStaff } = require("../controller/staffController");

const router = express.Router();

router.route("/create").post(createStaff)


module.exports = router; 