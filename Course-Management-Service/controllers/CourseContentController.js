const CourseContent = require("../models/CourseContent");

// POST method to add new course content
exports.addCourseContent = async (req, res) => {
  try {
    const newCourse = await CourseContent.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Error creating course content:', error);
    res.status(500).json({ message: 'Failed to create content' });
  }
};

exports.getAllCourseContent = async (req, res) => {
  try {
    const courseContents = await CourseContent.find();
    res.status(200).send({
      message: "Course Content retreived",
      courseContents: courseContents,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT method to update course content
exports.updateCourseContent = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCourse = await CourseContent.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course content not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    console.error('Error updating course content:', error);
    res.status(500).json({ message: 'Failed to update content' });
  }
};
