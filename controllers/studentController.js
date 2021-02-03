// 'use strict';
const request = require('request');
const axios = require('axios');

const studentModel = require('../models/studentModel');
const answerModel = require('../models/answersModel');

exports.createStudentAnswer = async (req, res, next) => {
  let result = 0;
  let score;
  let examName = req.body.examName;
  let image = req.body.image;
  examName = examName.trim();
  const key = '0b1053d6c8054ffebff7b7b236a96db7';
  const key2 = 'd9aae959be994753be5b457ab9e79d2f';
  const endPoint = 'https://westus2.api.cognitive.microsoft.com/';
  let jsonResponse, name;
  let subscriptionKey = key;
  let endpoint = endPoint;
  const uriBase = endpoint + 'vision/v3.1/ocr';
  if (!subscriptionKey) {
    throw new Error(
      'Set your environment variables for your subscription key and endpoint.'
    );
  }
  // Request parameters.
  const params = {
    language: 'unk',
    detectOrientation: 'true',
  };

  const options = {
    uri: uriBase,
    qs: params,
    body: '{"url": ' + '"' + image + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key': subscriptionKey,
    },
  };
  try {
    request.post(options, async (error, response, body) => {
      if (error) {
        console.log('Error: ', error);
        return;
      }
      jsonResponse = JSON.parse(body);
      console.log('JSON Response\n');
      // console.log(jsonResponse.regions);

      let nameLine = jsonResponse.regions[1].lines;

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
      let allAnswers = { answer1, answer2, answer3 };
      console.log('Exam Name:  ', examName);
      const answers = await answerModel.find({ examName });
      let newAnswer = answers[0];
      let count = 1;
      while (count <= newAnswer.count) {
        console.log('GOT hEre loop');
        let an = `answer${count}`;
        const resp = await axios.get(
          `https://api.labs.cognitive.microsoft.com/academic/v1.0/similarity?subscription-key=${key2}&s1=${
            newAnswer[`${an}`]
          }&s2=${allAnswers[`answer${count}`]}`
        );
        console.log(resp.data);
        score = resp.data;
        if (score >= 0.7) ++result;
        ++count;
      }
      const resp = await studentModel.create({
        name,
        examName,
        image,
        count: newAnswer.count,
        answer1,
        answer2,
        answer3,
        result,
      });
      res.status(201).json(resp);
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getAllStudentReport = async (req, res, next) => {
  try {
    const resp = await studentModel.find({}).select('name result');
    res.status(200).json({ resp });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

exports.getStudentReport = async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await studentModel.findById(id);
    res.status(200).json({ resp });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
