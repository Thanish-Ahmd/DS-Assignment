const Learner = require("../models/Learner");
//const jwt = require("jsonwebtoken");
//const commonFunctions = require("./commonFunctions");
//const { hashPassword, comparePasswords } = require("../middleware/encryption");

// const verifyToken = commonFunctions.verifyToken;
// const secretKey = process.env.SECRET_KEY;

exports.getAllLearners = async (req, res) => {
  try {
    const learners = await Learner.find();
    res.status(200).send({
      message: "Learners retreived",
      learners: learners,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
