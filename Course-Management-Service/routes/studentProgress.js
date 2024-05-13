const express = require("express");
const router = express.Router();
const studentProgressController = require("../controllers/StudentProgressController");

router.get(
  "/:courseName",
  studentProgressController.getStudentProgressByCourse
);

module.exports = router;
