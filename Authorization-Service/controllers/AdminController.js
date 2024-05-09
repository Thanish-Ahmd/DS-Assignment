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
    newInstructor.save().then(() => {
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
      res.status(200).send({ message: "Instructor added" });
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
          { email: instrcutor.email, type: "admin" },
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
