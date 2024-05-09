const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
    required: true,
    default: [],
  },
});

module.exports = mongoose.model("Instructor", instructorSchema);
