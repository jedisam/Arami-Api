const express = require('express');
const { getStudAnswer } = require('../controllers/studentController');

const router = express.Router();

router.post('/studentAnswer', getStudAnswer);

module.exports = router;
