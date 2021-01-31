const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the student is required!'],
  },
  examName: {
    type: String,
    required: [true, 'Exam name is required!'],
  },
  image: {
    type: String,
    required: [true, 'Image Url is required!'],
  },
  count: {
    type: Number,
    required: [true, 'Number of questions is required!'],
  },
  answer1: {
    type: String,
  },
  answer2: {
    type: String,
  },
  answer3: {
    type: String,
  },
  result: {
    type: Number,
    default: 0,
  },
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
