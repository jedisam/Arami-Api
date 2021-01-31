const express = require('express');
const {
  createStudentAnswer,
  getAllStudentReport,
  getStudentReport,
} = require('../controllers/studentController');

const router = express.Router();

router.route('/students').post(createStudentAnswer).get(getAllStudentReport);
router.route('/students/:id').get(getStudentReport);
module.exports = router;
