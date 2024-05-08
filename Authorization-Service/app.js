const express = require("express");
const dotenv = require("dotenv");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const logger = require("./middleware/logger");
const courseRoutes = require("./routes/learners");

// Parse JSON bodies
app.use(bodyParser.json());

app.use(cors());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

// Middleware
app.use(logger);

// Routes
app.use(courseRoutes);

// Start server
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
