const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/InstructorController");

// Define routes
router.get("/api/instructors/", instructorController.getAllInstructors);
router.post("/api/instructors/add", instructorController.addInstructor);
router.post("/api/instructors/login", instructorController.instructorLogin);
router.post("/api/instructors/verify", instructorController.verifyInstructor);
router.delete("/api/instructors/delete", instructorController.deleteInstructor);
router.get("/api/instructors/get", instructorController.getInstructor);
router.put("/api/instructors/update", instructorController.updateInstructor);
router.post("/api/instructors/changePassword", instructorController.changePassword);

module.exports = router;
