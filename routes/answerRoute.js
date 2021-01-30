const express = require('express');
const { createAnswer } = require('../controllers/answerController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.post('/createAnswer', createAnswer);

module.exports = router;
