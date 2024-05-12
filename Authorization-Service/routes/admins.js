const express = require("express");
const router = express.Router();
const adminController = require("../controllers/AdminController");

// Define routes
router.get("/api/admins/", adminController.getAllAdmins);
router.post("/api/admins/add", adminController.addAdmin);
router.post("/api/admins/login", adminController.adminLogin);
router.post("/api/admins/verify", adminController.verifyAdmin);
router.put("/api/admins/update", adminController.updateAdmin);
router.delete("/api/admins/delete", adminController.deleteAdmin);
router.get("/api/admins/get", adminController.getAdmin);
router.post("/api/admins/changePassword", adminController.changePassword);

module.exports = router;
