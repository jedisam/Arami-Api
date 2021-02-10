const answerModel = require('../models/answersModel');

exports.createAnswer = async (req, res, next) => {
  try {
    let { count, answer, examName } = req.body;
    let counter = 1;
    let user = req.user;
    examName = examName.trim().toLowerCase();
    let toBeSaved = { count, user, examName };
    while (counter <= count) {
      let chk = `answer${counter}`;
      toBeSaved[chk] = answer[chk];
      ++counter;
    }
    const resp = await answerModel.create(toBeSaved);
    res.status(201).json(resp);
  } catch (err) {
    console.error(err);
    next(err);
  }
};
