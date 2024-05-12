const express = require("express");
const router = express.Router();
const learnerController = require("../controllers/LearnerController");

// Define routes
router.get("/api/learners/", learnerController.getAllLearners);
router.post("/api/learners/sendotp", learnerController.sendOTP);
router.post("/api/learners/add", learnerController.addLearner);
router.post("/api/learners/login", learnerController.userLogin);
router.post("/api/learners/verify", learnerController.verifyLearner);
router.delete("/api/learners/delete", learnerController.deleteLearner);
router.get("/api/learners/get", learnerController.getLearner);

module.exports = router;
