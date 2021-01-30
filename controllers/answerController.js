const answerModel = require('../models/answersModel');

exports.createAnswer = async (req, res, next) => {
  try {
    const { count, answer1, answer2, answer3 } = req.body;
    const answers = { answer1, answer2, answer3 };
    // const answer = await answerModel.findById();
    const resp = await answerModel.create({ count, answers });
    res.status(201).json(resp);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
