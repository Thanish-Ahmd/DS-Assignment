const mongoose = require("mongoose");

const courseMasterSchema = new mongoose.Schema({
 /* courseCode: {
    type: String,
    required: true,
  },*/
  courseName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CourseMaster", courseMasterSchema);
