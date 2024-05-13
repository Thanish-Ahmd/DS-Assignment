const Learner = require('../models/learner');

exports.enrolCourse = async (req,res) => {
  if(!req.body){
      return res
          .status(400)
          .send({ message : "Data to update can not be empty"})
  }

  const id = req.params.id;
  await Learner.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
      .then(data => {
          if(!data){
              res.status(404).send({ message : 'Learner not found!'})
          }else{
              res.status(201).send({message : "Enrolled to course successfully"})
          }
      })
      .catch(err =>{
          res.status(500).send({ message : "Error occurred while enrolling to course: "+err})
      })
}