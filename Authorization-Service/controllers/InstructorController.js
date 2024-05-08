const Instructor = require("../models/Instructor");
//const jwt = require("jsonwebtoken");
//const commonFunctions = require("./commonFunctions");
//const { hashPassword, comparePasswords } = require("../middleware/encryption");

// const verifyToken = commonFunctions.verifyToken;
// const secretKey = process.env.SECRET_KEY;

exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).send({
      message: "Instructors retreived",
      instructors: instructors,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
