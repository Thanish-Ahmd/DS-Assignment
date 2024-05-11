const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: true,
  },
  courseName: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    //required: true,
  },
});

module.exports = mongoose.model("CourseContent", courseContentSchema);
