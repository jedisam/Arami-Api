const answerModel = require('../models/answersModel');

exports.createAnswer = async (req, res, next) => {
  try {
    const { count, answer } = req.body;
    let counter = 1;
    let toBeSaved = { count };
    while (counter <= count) {
      let chk = `answer${counter}`;
      toBeSaved[chk] = answer[chk];
      ++counter;
    }
    console.log(toBeSaved);
    const resp = await answerModel.create(toBeSaved);
    // const answer = await answerModel.findById();
    res.status(201).json(resp);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
