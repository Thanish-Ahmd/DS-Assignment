const Learner = require("../models/Learner");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const commonFunctions = require("./commonFunctions");
const { hashPassword, comparePasswords } = require("../middleware/encryption");

const verifyToken = commonFunctions.verifyToken;
const secretKey = process.env.SECRET_KEY;

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

exports.addLearner = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const newLearner = new Learner({
    firstName,
    lastName,
    password: hashedPassword,
    email,
  });

  let num = "";

  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "dentalclinicitp@zohomail.com",
      pass: "Culer@123",
    },
  });

  const learner = await Learner.findOne({ email: email });

  if (learner) {
    res.status(200).send({ message: "Email already exist" });
  } else {
    newLearner.save().then(() => {
      res.status(200).send({ message: "Learner added" });
    });
  }
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  let num = "";

  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);
  num += Math.floor(Math.random() * 10);

  console.log(num);

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "dentalclinicitp@zohomail.com",
      pass: "Culer@123",
    },
  });
  const mailOptions = {
    from: "dentalclinicitp@zohomail.com",
    to: `${email}`,
    subject: "User Registration Verification",
    text: `Hello User , \n This is your OTP for your email verification /nOTP - ${num} /n/n Thank you`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send({ meesage: "OTP sent", otp: num });
    }
  });
};


exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const learner = await Learner.findOne({ email: email });
  try {
    if (learner) {
      const match = await comparePasswords(password, learner.password);

      if (match) {
        const token = jwt.sign({ email: learner.email }, secretKey, {
          expiresIn: "1h",
        });
        res.status(200).send({ message: "Login Successfull", token: token });
      } else {
        res.status(200).send({ message: "Incorrect password" });
      }
    } else {
      res.status(200).send({ message: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error });
  }
};