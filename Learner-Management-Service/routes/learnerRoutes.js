const express = require('express');
const router = express.Router();
const learnerController = require('../controllers/learnerController');

router.put('/enrolCourse', learnerController.enrolCourse);
router.put('/unenrollCourse', learnerController.unenrollCourse);

module.exports = router;
