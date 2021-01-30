const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name of the student is required!'],
  },
  image: {
    type: String,
    required: [true, 'Image Url is required!'],
  },
  count: {
    type: Number,
    required: [true, 'Number of questions is required!'],
  },
  answer: [
    {
      type: String,
      required: [true, 'Email is required!'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
  ],
});

const Student = mongoose.model('student', studentSchema);
module.exports = Student;
