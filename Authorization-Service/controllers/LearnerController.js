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
  const learner = await Learner.findOne({ email: email });

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

  if (learner) {
    res.status(200).send({ message: "Email already exist" });
  } else {
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
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  const learner = await Learner.findOne({ email: email });
  
  try {
    if (learner) {
      const match = await comparePasswords(password, learner.password);

      if (match) {
        const token = jwt.sign(
          { email: learner.email, type: "learner" },
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

exports.verifyLearner = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "learner") {
          res.status(200).send({
            message: "Authentication Successfull",
            email: decoded.email,
          });
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

exports.getLearner = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "learner") {
          const learner = await Learner.find({ email: decoded.email });

          res.status(200).send({ learner: learner, message: "User Retreived" });
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

exports.updateLearner = async (req, res) => {
  const { firstName, lastName, password, email } = req.body;

  const updateLearner = {
    firstName,
    lastName,
    email,
    password,
  };

  await Learner.findOneAndUpdate({ email: email }, updateLearner)
    .then((rs) => {
      res.status(200).send({ message: "Learner Updated", learner: rs });
    })
    .catch((err) => {
      res.status(200).send({ message: "Error in updating", error: err });
    });
};

exports.deleteLearner = async (req, res) => {
  const { email } = req.body;

  await Learner.findOneAndDelete({ email: email })
    .then(() => {
      res.status(200).send({ message: "Learner Deleted" });
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
        if (decoded.type == "learner") {
          console.log(decoded.email);
          const learner = await Learner.findOne({ email: decoded.email });
          const match = await comparePasswords(oldPassword, learner.password);
          if (match) {
            await Learner.findOneAndUpdate(
              { email: decoded.email },
              updatedPassword
            )
              .then((rs) => {
                res
                  .status(200)
                  .send({ learner: rs.data, message: "Password changed" });
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
