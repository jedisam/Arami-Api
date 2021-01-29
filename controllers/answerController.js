const answerModel = require('answerModel');

exports.createAnswer = async (req, res, next) => {
  try {
    const { count, answer1, answer2, answer3 } = req.body;
    const answers = { answer1, answer2, answer3 };
    // const answer = await answerModel.findById();
    await answerModel.create({ count, answers });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
