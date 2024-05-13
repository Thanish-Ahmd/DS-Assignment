const StudentProgress = require("../models/StudentProgress");

exports.getStudentProgressByCourse = async (req, res) => {
  const { courseName } = req.params;

  try {
    // Fetch total count of students for the selected course
    const studentCount = await StudentProgress.countDocuments({ courseName });

    // Calculate the count of students in each progression category
    const progressData = await StudentProgress.aggregate([
      { $match: { courseName } },
      {
        $group: {
          _id: "$progressionLevel",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          label: "$_id",
          y: "$count",
        },
      },
    ]);

    res.status(200).json({
      studentCount,
      progressData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
