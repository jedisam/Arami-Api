const express = require('express');
const { createAnswer } = require('../controllers/answerController');

const router = express.Router();

router.post('/createAnswer', createAnswer);

module.exports = router;
