const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/InstructorController");

// Define routes
router.get("/api/instructors/", instructorController.getAllInstructors);
router.post("/api/instructors/add", instructorController.addInstructor);

module.exports = router;