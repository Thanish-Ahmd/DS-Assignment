const express = require("express");
const router = express.Router();
const courseContentController = require("../controllers/CourseContentController");

// Define routes
router.get("/api/courseContent/", courseContentController.getAllCourseContent);
router.post("/api/courseContent/", courseContentController.addCourseContent);
router.put("/api/courseContent/:id", courseContentController.updateCourseContent);

module.exports = router;
