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

exports.verifyInstructor = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "instructor") {
          res.status(200).send({
            message: "Authentication Successfull",
          });
        } else {
          res.status(200).send({
            message: "Authentication not Successfull",
            email: decoded.email,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({ message: "Error Occured", error: err });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getInstructor = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "instructor") {
          const instructor = await Instructor.find({ email: decoded.email });

          res
            .status(200)
            .send({ instructor: instructor, message: "Instructor Retreived" });
        } else {
          res.status(200).send({
            message: "Authentication not Successfull",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({ message: "Error Occured", error: err });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateInstructor = async (req, res) => {
  const { firstName, lastName, password, phoneNo, email } = req.body;

  const hashedPassword = await hashPassword(password);
  const updateInstructor = {
    firstName,
    lastName,
    password: hashedPassword,
    phoneNo,
  };

  await Instructor.findOneAndUpdate({ email: email }, updateInstructor)
    .then((rs) => {
      res.status(200).send({ message: "Instructor Updated", instructor: rs });
    })
    .catch((err) => {
      res.status(200).send({ message: "Error in updating", error: err });
    });
};

exports.deleteInstructor = async (req, res) => {
  const { email } = req.body;

  await Instructor.findOneAndDelete({ email: email })
    .then(() => {
      res.status(200).send({ message: "Intrsuctor Deleted" });
    })
    .catch((err) => {
      res.status(200).send({ message: "Error in deleting", error: err });
    });
};

exports.changePassword = async (req, res) => {
  const token = req.headers.token;
  const { oldPassword, password } = req.body;
  const hashedPassword = await hashPassword(password);

  const updatedPassword = {
    password: hashedPassword,
  };

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "instructor") {
          console.log(decoded.email);
          const instructor = await Instructor.findOne({ email: decoded.email });
          const match = await comparePasswords(oldPassword, instructor.password);
          if (match) {
            await Instructor.findOneAndUpdate(
              { email: decoded.email },
              updatedPassword
            )
              .then((rs) => {
                res
                  .status(200)
                  .send({ admin: rs.data, message: "Password changed" });
              })
              .catch((err) => {
                console.log(err);
                res.status(200).send({ message: "Error in changing password" });
              });
          } else {
            res.status(200).send({
              message: "Incorrect Password",
            });
          }
        } else {
          res.status(200).send({
            message: "Authentication not Successfull",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send({ message: "Error Occured", error: err });
      });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
