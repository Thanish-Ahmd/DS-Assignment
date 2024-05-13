const express = require("express");
const router = express.Router();
const courseMaster = require("../controllers/CourseMaster");

router.post("/api/courseMaster/", courseMaster.addCourseMaster);
router.get("/api/courseMaster/all", courseMaster.getAllCourseNames);
router.get("/api/courseMaster/names", courseMaster.getAllCourseNamesMaster);

module.exports = router;
