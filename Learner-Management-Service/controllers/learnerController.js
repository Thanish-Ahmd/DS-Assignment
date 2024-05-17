const Learner = require('../models/learner');

exports.enrolCourse = async (req,res) => {
  const { email, courses } = req.body;

  if(!req.body){
    return res
        .status(400)
        .send({ message : "Data to update can not be empty"})
  }

  const coursesToUpdate = Array.isArray(courses) ? courses : [courses];

    await Learner.findOneAndUpdate(
        { email: email },
        { $addToSet: { courses: { $each: coursesToUpdate } } },
        { new: true, useFindAndModify: false }
    ).then(data => {
        if(!data){
            res.status(404).send({ message : 'Learner not found!'})
        }else{
            res.status(201).send({message : "Enrolled to the course successfully"})
        }
    })
    .catch(err =>{
        res.status(500).send({ message : "Error occurred while enrolling to the course: "+err})
    })
}

exports.unenrollCourse = async (req, res) => {
    const { email, course } = req.body; // Assuming course is a string representing the course to remove
  
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Data to update cannot be empty" });
    }
  
    await Learner.findOneAndUpdate(
      { email: email },
      { $pull: { courses: course } },
      { new: true, useFindAndModify: false }
    )
    .then(data => {
      if (!data) {
        res.status(404).send({ message: 'Learner not found!' });
      } else {
        res.status(200).send({ message: "Unenrolled from the course successfully" });
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Error occurred while unenrolling from the course: " + err });
    });
}