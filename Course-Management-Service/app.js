const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

const app = express();

const logger = require("./middleware/logger");
const courseRoutes = require("./routes/courses");
const courseContentRoutes = require("./routes/courseContent");
const courseMasterRoutes = require("./routes/courseMaster");
const studentProgress = require("./routes/studentProgress");

// Parse JSON bodies

app.use(bodyParser.json());

app.use(cors());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

// Middleware
app.use(logger);

// Routes
app.use(courseRoutes);
app.use(courseContentRoutes);
app.use(courseMasterRoutes);
app.use(studentProgress);

// Start server
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
