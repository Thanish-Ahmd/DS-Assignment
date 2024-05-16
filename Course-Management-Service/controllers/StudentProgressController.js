const Student_Courses = require("../models/StudentProgress");

exports.getStudentProgressByCourse = async (req, res) => {
  const { courseName } = req.params;

  try {
    const courseProgressData = await Student_Courses.aggregate([
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
          progressionLevel: "$_id",
          studentCount: "$count",
        },
      },
      {
        $group: {
          _id: null,
          totalRecords: { $sum: "$studentCount" },
          progressData: {
            $push: {
              progressionLevel: "$progressionLevel",
              studentCount: "$studentCount",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalRecords: 1,
          progressData: 1,
        },
      },
    ]);

    res.status(200).json(courseProgressData[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
