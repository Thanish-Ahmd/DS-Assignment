const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

// Define routes
router.get("/api/admins/", adminController.getAllAdmins);

module.exports = router;
