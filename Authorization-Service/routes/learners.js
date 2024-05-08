const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/LearnerController");

// Define routes
router.get("/api/learners/", learnerController.getAllLearners);

module.exports = router;
