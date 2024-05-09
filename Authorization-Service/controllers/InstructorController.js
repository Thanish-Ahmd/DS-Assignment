const Instructor = require("../models/Instructor");
const jwt = require("jsonwebtoken");
const commonFunctions = require("./commonFunctions");
const { hashPassword, comparePasswords } = require("../middleware/encryption");

const verifyToken = commonFunctions.verifyToken;
const secretKey = process.env.SECRET_KEY;

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

exports.addInstructor = async (req, res) => {
  const { firstName, lastName, email, phoneNo, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const newInstructor = new Instructor({
    firstName,
    lastName,
    password: hashedPassword,
    phoneNo,
    email,
  });

  const instructor = await Instructor.findOne({ email: email });

  if (instructor) {
    res.status(200).send({ message: "Email already exist" });
  } else {
    newInstructor.save().then(() => {
      res.status(200).send({ message: "Instructor added" });
    });
  }
};
