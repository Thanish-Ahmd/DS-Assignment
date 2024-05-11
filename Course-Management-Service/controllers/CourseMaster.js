const CourseMaster = require("../models/CourseMaster");

exports.addCourseMaster = async (req, res) => {
    try {
      const newCourse = await CourseMaster.create(req.body);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error('Error creating course:', error);
      res.status(500).json({ message: 'Failed to create' });
    }
  };