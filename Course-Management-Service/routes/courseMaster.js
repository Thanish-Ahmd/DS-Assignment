const express = require("express");
const router = express.Router();
const courseMaster = require("../controllers/CourseMaster");

router.post("/api/courseMaster/", courseMaster.addCourseMaster);
router.get("/api/courseMaster/all", courseMaster.getAllCourseNames);

module.exports = router;
