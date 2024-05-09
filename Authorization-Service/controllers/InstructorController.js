const Instructor = require("../models/Instructor");
const jwt = require("jsonwebtoken");
const commonFunctions = require("./commonFunctions");
const { hashPassword, comparePasswords } = require("../middleware/encryption");
const nodemailer = require("nodemailer");

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

  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: "dentalclinicitp@zohomail.com",
      pass: "Culer@123",
    },
  });

  const instructor = await Instructor.findOne({ email: email });

  if (instructor) {
    res.status(200).send({ message: "Email already exist" });
  } else {
    newInstructor.save().then(() => {
      const mailOptions = {
        from: "dentalclinicitp@zohomail.com",
        to: `${email}`,
        subject: "Instructor account created",
        text: `Hello User , \n Use the below credentials to login to your account \nEmail : ${email} \n Password : ${password}`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          res.status(200).send({ meesage: "OTP sent", otp: num });
        }
      });
      res.status(200).send({ message: "Instructor added" });
    });
  }
};

exports.instructorLogin = async (req, res) => {
  const { email, password } = req.body;
  const instrcutor = await Instructor.findOne({ email: email });
  try {
    if (instrcutor) {
      const match = await comparePasswords(password, instrcutor.password);

      if (match) {
        const token = jwt.sign(
          { email: instrcutor.email, type: "instructor" },
          secretKey,
          {
            expiresIn: "1h",
          }
        );
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
