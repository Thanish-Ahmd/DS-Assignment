const mongoose = require("mongoose");

const learnerSchema = new mongoose.Schema({
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

module.exports = mongoose.model("Learner", learnerSchema);
