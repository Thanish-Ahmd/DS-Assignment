const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/InstructorController");

// Define routes
router.get("/api/instructors/", instructorController.getAllInstructors);

module.exports = router;
