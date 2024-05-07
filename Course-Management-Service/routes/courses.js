const express = require("express");
const router = express.Router();
const courseController = require("../controllers/CourseController");

// Define routes
router.get("/api/courses/", courseController.getAllCourses);

module.exports = router;
