const CourseMaster = require("../models/CourseMaster");

exports.addCourseMaster = async (req, res) => {
  try {
    const newCourse = await CourseMaster.create(req.body);
    res.status(201).json(newCourse);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Failed to create" });
  }
};

exports.getAllCourseNames = async (req, res) => {
  try {
    const courses = await CourseMaster.find();
    // const courseNames = courses.map((course) => course.courseName);
    res.status(200).json(courses);
  } catch (error) {
    console.error("Error retrieving course names:", error);
    res.status(500).json({ message: "Failed to retrieve course names" });
  }
};
