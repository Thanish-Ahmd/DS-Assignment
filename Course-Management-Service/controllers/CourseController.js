const Course = require("../models/Course");
//const jwt = require("jsonwebtoken");
//const commonFunctions = require("./commonFunctions");
//const { hashPassword, comparePasswords } = require("../middleware/encryption");

// const verifyToken = commonFunctions.verifyToken;
// const secretKey = process.env.SECRET_KEY;

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).send({
      message: "Course retreived",
      courses: courses,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
