const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  examName: {
    type: String,
    required: [true, 'Exam name is required!'],
  },
  count: {
    type: Number,
    required: [true, 'Number of questions is required!'],
  },
  answer1: {
    type: String,
    required: [true, 'Answer is required'],
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  answer4: {
    type: String,
  },
  answer5: {
    type: String,
  },
});

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;
