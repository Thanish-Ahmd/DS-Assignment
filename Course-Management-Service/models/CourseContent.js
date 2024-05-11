const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
  },
  title: {
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
  status: {
    type: String,
    //required: true,
  },
}, { timestamps: true }); 

module.exports = mongoose.model("CourseContent", courseContentSchema);
