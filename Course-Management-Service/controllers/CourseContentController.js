//const CourseContent = require("../models/CourseContent");

// // POST method to add new course content
// exports.addCourseContent = async (req, res) => {
//   try {
//     const newCourse = await CourseContent.create(req.body);
//     res.status(201).json(newCourse);
//   } catch (error) {
//     console.error("Error creating course content:", error);
//     res.status(500).json({ message: "Failed to create content" });
//   }
// };

const multer = require("multer");
const CourseContent = require("../models/CourseContent");

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage: storage });

exports.addCourseContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { courseName, title, duration } = req.body;
    const contentData = req.file.buffer;

    const newCourseContent = new CourseContent({
      courseName,
      title,
      content: contentData,
      duration,
      status: "Not Approved", // Set status here
    });

    await newCourseContent.save();

    res.status(201).json({ message: "Course content added successfully" });
  } catch (error) {
    console.error("Error creating course content:", error);
    res.status(500).json({ message: "Failed to create content" });
  }
};

// Backend: Fetching Course Content
exports.getAllCourseContent = async (req, res) => {
  try {
    const courseContents = await CourseContent.find();
    res.status(200).send({
      message: "Course Content retrieved",
      courseContents: courseContents.map((content) => ({
        _id: content._id,
        courseName: content.courseName,
        title: content.title,
        duration: content.duration,
        status: content.status,
        // Convert buffer to base64 string
        content: content.content.toString("base64"),
      })),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.error("Error fetching course content:", err);
  }
};

// PUT method to update course content
exports.updateCourseContent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCourse = await CourseContent.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ message: "Course content not found" });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error("Error updating course content:", error);
    res.status(500).json({ message: "Failed to update content" });
  }
};

// DELETE method to delete course content
exports.deleteCourseContent = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CourseContent.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course content not found" });
    }
    res.status(200).json({ message: "Course content deleted successfully" });
  } catch (error) {
    console.error("Error deleting course content:", error);
    res.status(500).json({ message: "Failed to delete content" });
  }
};
