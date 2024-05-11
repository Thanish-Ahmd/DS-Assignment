const express = require("express");
const router = express.Router();
const courseMaster = require("../controllers/CourseMaster");

router.post("/api/courseMaster/", courseMaster.addCourseMaster);

module.exports = router;