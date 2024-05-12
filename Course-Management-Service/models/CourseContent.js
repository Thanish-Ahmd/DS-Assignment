const mongoose = require("mongoose");

const courseContentSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: Buffer, // Store the document data as a buffer
      contentType: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Not Approved",
      required: true,
    },
  },
  { timestamps: true }
);
// Define compound unique index on courseName and title
courseContentSchema.index({ courseName: 1, title: 1 }, { unique: true });

module.exports = mongoose.model("CourseContent", courseContentSchema);
