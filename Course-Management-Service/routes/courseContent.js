// const express = require("express");
// const router = express.Router();
// const courseContentController = require("../controllers/CourseContentController");

const express = require("express");
const router = express.Router();
const courseContentController = require("../controllers/CourseContentController");
const multer = require("multer");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Define routes
router.get("/api/courseContent/", courseContentController.getAllCourseContent);
//router.post("/api/courseContent/", courseContentController.addCourseContent);
router.put(
  "/api/courseContent/:id",
  courseContentController.updateCourseContent
);
router.post(
  "/api/courseContent/",
  upload.single("content"),
  courseContentController.addCourseContent
);

router.delete("/api/courseContent/:id", courseContentController.deleteCourseContent);

router.put(
  "/api/courseContent/:id",
  courseContentController.updateCourseContentStatus
);
module.exports = router;
