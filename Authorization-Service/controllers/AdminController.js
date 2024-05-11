const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const commonFunctions = require("./commonFunctions");
const { hashPassword, comparePasswords } = require("../middleware/encryption");
const nodemailer = require("nodemailer");

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

exports.addAdmin = async (req, res) => {
  const { firstName, lastName, email, phoneNo, password } = req.body;

  const hashedPassword = await hashPassword(password);
  const newAdmin = new Admin({
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

  const admin = await Admin.findOne({ email: email });

  if (admin) {
    res.status(200).send({ message: "Email already exist" });
  } else {
    newAdmin.save().then(() => {
      const mailOptions = {
        from: "dentalclinicitp@zohomail.com",
        to: `${email}`,
        subject: "Admin account created",
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
      res.status(200).send({ message: "Admin added" });
    });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email: email });
  try {
    if (admin) {
      const match = await comparePasswords(password, admin.password);

      if (match) {
        const token = jwt.sign(
          { email: admin.email, type: "admin" },
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

exports.verifyAdmin = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "admin") {
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

exports.getAdmin = async (req, res) => {
  const token = req.headers.token;

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "admin") {
          const admin = await Admin.find({ email: decoded.email });

          res.status(200).send({ admin: admin, message: "Admin Retreived" });
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

exports.updateAdmin = async (req, res) => {
  const { firstName, lastName, password, phoneNo, email } = req.body;

  const updateAdmin = {
    firstName,
    lastName,
    password,
    phoneNo,
  };

  await Admin.findOneAndUpdate({ email: email }, updateAdmin)
    .then((rs) => {
      res.status(200).send({ message: "Instructor Updated", admin: rs });
    })
    .catch((err) => {
      res.status(200).send({ message: "Error in updating", error: err });
    });
};

exports.deleteAdmin = async (req, res) => {
  const { email } = req.body;

  await Admin.findOneAndDelete({ email: email })
    .then(() => {
      res.status(200).send({ message: "Admin Deleted" });
    })
    .catch((err) => {
      res.status(200).send({ message: "Error in deleting", error: err });
    });
};

exports.changePassword = async (req, res) => {
  const token = req.headers.token;
  const { oldPassword, password } = req.body;

  const updatedPassword = {
    password: password,
  };

  try {
    verifyToken(token)
      .then(async (decoded) => {
        if (decoded.type == "admin") {
          const admin = await Admin.find({ email: decoded.email });

          if (comparePasswords(oldPassword, admin.password)) {
            await Admin.findOneAndUpdate(
              { email: decoded.email },
              updatedPassword
            )
              .then((rs) => {
                res
                  .status(200)
                  .send({ admin: rs.data, message: "Password changed" });
              })
              .catch((err) => {
                res.status(200).send({ message: "Error in changing password" });
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
