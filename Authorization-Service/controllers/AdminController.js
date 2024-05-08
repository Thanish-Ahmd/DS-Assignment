const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const commonFunctions = require("./commonFunctions");
const { hashPassword, comparePasswords } = require("../middleware/encryption");

const verifyToken = commonFunctions.verifyToken;
const secretKey = process.env.SECRET_KEY;

exports.getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).send({
      message: "Admins retreived",
      admins: admins,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
