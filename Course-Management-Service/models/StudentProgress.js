const mongoose = require("mongoose");

const studentProgressSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
  },

  progressionLevel: {
    type: String,
    required: true,
    // enum: ["Not Started", "In Progress", "Completed"],
  },

  courseName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("StudentProgress", studentProgressSchema);
