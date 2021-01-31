'use strict';
const studentModel = require('../models/studentModel');
const answerModel = require('../models/answersModel');

const request = require('request');

exports.getStudAnswer = async (req, res, next) => {
  let examName = req.body.examName;
  examName = examName.trim();
  const key = '0b1053d6c8054ffebff7b7b236a96db7';
  const key2 = 'd9aae959be994753be5b457ab9e79d2f';
  const endPoint = 'https://westus2.api.cognitive.microsoft.com/';
  let jsonResponse;
  let subscriptionKey = key;
  let endpoint = endPoint;
  if (!subscriptionKey) {
    throw new Error(
      'Set your environment variables for your subscription key and endpoint.'
    );
  }

  var uriBase = endpoint + 'vision/v3.1/ocr';
  const img =
    'https://i.pinimg.com/564x/56/2c/1d/562c1d0cc5424d5fecfe912112716765.jpg';
  const imageUrl =
    'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/' +
    'Atomist_quote_from_Democritus.png/338px-Atomist_quote_from_Democritus.png';
  let box1 = [];
  // Request parameters.
  const params = {
    language: 'unk',
    detectOrientation: 'true',
  };

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + img + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };

  request.post(options, async (error, response, body) => {
    if (error) {
      console.log('Error: ', error);
      return;
    }
    jsonResponse = JSON.parse(body);
    console.log('JSON Response\n');
    // console.log(jsonResponse.regions);

    let nameLine = jsonResponse.regions[1].lines;
    let name;
    let name1 = [];
    for (let i = 0; i < nameLine.length; i++) {
      var yStart = nameLine[i]['boundingBox'].split(',')[1]; // the Y_start of each line
      if (yStart > 20 && yStart < 100) {
        for (let j = 0; j < nameLine[i]['words'].length; j++) {
          name1.push(nameLine[i]['words'][j]['text']);
        }
      }
    }
    name = name1.join(' ');
    // console.log('NAMEEEEEE: ', name);

    let lines = jsonResponse.regions[3].lines;
    var questionOne = [];
    var questionTwo = [];
    var questionThree = [];
    let answer1, answer2, answer3;
    for (let i = 0; i < lines.length; i++) {
      var yStart = lines[i]['boundingBox'].split(',')[1]; // the Y_start of each line
      if (yStart > 120 && yStart < 300) {
        for (let j = 0; j < lines[i]['words'].length; j++) {
          questionOne.push(lines[i]['words'][j]['text']);
        }
      }
    }
    answer1 = questionOne.join(' ');

    for (let i = 0; i < lines.length; i++) {
      var yStart = lines[i]['boundingBox'].split(',')[1]; // the Y_start of each line
      if (yStart > 300 && yStart < 510) {
        for (let j = 0; j < lines[i]['words'].length; j++) {
          questionTwo.push(lines[i]['words'][j]['text']);
        }
      }
    }
    answer2 = questionTwo.join(' ');

    for (let i = 0; i < lines.length; i++) {
      var yStart = lines[i]['boundingBox'].split(',')[1]; // the Y_start of each line
      if (yStart > 510 && yStart < 760) {
        for (let j = 0; j < lines[i]['words'].length; j++) {
          questionThree.push(lines[i]['words'][j]['text']);
        }
      }
    }
    answer3 = questionThree.join(' ');

    // const resp = await studentModel.create({examName, answer1, answer2, answer3})
    console.log('Exam Name:  ', examName);
    const answers = await answerModel.find({ examName });
    let newAnswer = answers[0];
    console.log(newAnswer);
    // const count = 3;
    // while(count >=0 ) {

    // }

    request.get(
      `https://api.labs.cognitive.microsoft.com/academic/v1.0/similarity?subscription-key=${key2}&s1=${newAnswer.answer1}&s2=${answer1}`,
      (err, resp, body) => {
        if (err) {
          throw err;
        }
        console.log(JSON.parse(body));
      }
    );

    res.status(200).json({ answer1, answer2, answer3 });
  });
};
