const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  count: {
    type: Number,
    required: [true, 'Number of questions is required!'],
  },
  answer: [
    {
      type: String,
      required: [true, 'Answer is required!'],
    },
  ],
});

const Answer = mongoose.model('answer', answerSchema);
module.exports = Answer;
