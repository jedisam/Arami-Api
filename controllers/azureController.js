var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const newGetRequest = key => {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', operationLocation, false);
  var res;
  xhr.setRequestHeader('Ocp-Apim-Subscription-Key', key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      //   console.log(xhr.status);
      //   console.log(xhr.responseText);
      res = xhr.responseText;
    }
  };

  xhr.send();
  return res;
};

exports.getStudAnswer = async (req, res, next) => {
  var url =
    'https://westus2.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Handwritten';
  var operationLocation;
  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, false);

  var key = '0b1053d6c8054ffebff7b7b236a96db7';
  console.log(key);
  xhr.setRequestHeader('Ocp-Apim-Subscription-Key', key);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      console.log(xhr.status);
      // console.log('Response: ', xhr.getResponseHeader);
      // Get the raw header string
      var headers = xhr.getAllResponseHeaders();

      // Convert the header string into an array
      // of individual headers
      var arr = headers.trim().split(/[\r\n]+/);
      operationLocation = arr[1].split(' ')[1];
      // console.log(arr[1].split(' ')[1]);
      console.log(operationLocation);
      console.log('Done');
      var newData = newGetRequest(key);
      console.log('New Data: ', newData);

      //////////////////////////////////////////////////////////////////////////////////////////////////
      newData = JSON.parse(newData);
      var name = newData.recognitionResult.lines[1].text;
      console.log('NAMEEEEE: ', name);

      var box1 = [];
      newData.recognitionResult.lines.forEach(el => {
        if (
          el.boundingBox[0] >= 65 &&
          el.boundingBox[1] > 115 &&
          el.boundingBox[2] < 500 &&
          el.boundingBox[3] > 115 &&
          el.boundingBox[4] < 500 &&
          el.boundingBox[5] < 275 &&
          el.boundingBox[6] > 65 &&
          el.boundingBox[7] < 275
        ) {
          box1.push(el.text);
        }
      });
      console.log('BOX1:   ', box1);

      // BOX2
      var box2 = [];
      newData.recognitionResult.lines.forEach(el => {
        if (
          el.boundingBox[0] >= 65 &&
          el.boundingBox[1] > 340 &&
          el.boundingBox[2] < 500 &&
          el.boundingBox[3] > 340 &&
          el.boundingBox[4] < 500 &&
          el.boundingBox[5] < 500 &&
          el.boundingBox[6] > 65 &&
          el.boundingBox[7] < 500
        ) {
          box2.push(el.text);
        }
      });
      console.log('BOX2:   ', box2);

      // BOX3
      var box3 = [];
      newData.recognitionResult.lines.forEach(el => {
        if (
          el.boundingBox[0] >= 65 &&
          el.boundingBox[1] > 575 &&
          el.boundingBox[2] < 500 &&
          el.boundingBox[3] > 575 &&
          el.boundingBox[4] < 500 &&
          el.boundingBox[5] < 745 &&
          el.boundingBox[6] > 65 &&
          el.boundingBox[7] < 745
        ) {
          box3.push(el.text);
        }
      });
      console.log('BOX3:   ', box3);

      ////////////////////////////////////////////////
    }
  };

  var data =
    "{'url' : 'https://i.pinimg.com/564x/56/2c/1d/562c1d0cc5424d5fecfe912112716765.jpg'}";

  xhr.send(data);
};

// var url =
//   'https://westus2.api.cognitive.microsoft.com/vision/v2.0/recognizeText?mode=Handwritten';
// var operationLocation;
// var xhr = new XMLHttpRequest();
// xhr.open('POST', url, false);

// var key = '0b1053d6c8054ffebff7b7b236a96db7';
// console.log(key);
// xhr.setRequestHeader('Ocp-Apim-Subscription-Key', key);
// xhr.setRequestHeader('Content-Type', 'application/json');

// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4) {
//     console.log(xhr.status);
//     // console.log('Response: ', xhr.getResponseHeader);
//     // Get the raw header string
//     var headers = xhr.getAllResponseHeaders();

//     // Convert the header string into an array
//     // of individual headers
//     var arr = headers.trim().split(/[\r\n]+/);
//     operationLocation = arr[1].split(' ')[1];
//     // console.log(arr[1].split(' ')[1]);
//     console.log(operationLocation);
//     console.log('Done');
//     var newData = newGetRequest(key);
//     console.log('New Data: ', newData);

//     //////////////////////////////////////////////////////////////////////////////////////////////////
//     newData = JSON.parse(newData);
//     var name = newData.recognitionResult.lines[1].text;
//     console.log('NAMEEEEE: ', name);

//     var box1 = [];
//     newData.recognitionResult.lines.forEach(el => {
//       if (
//         el.boundingBox[0] >= 65 &&
//         el.boundingBox[1] > 115 &&
//         el.boundingBox[2] < 500 &&
//         el.boundingBox[3] > 115 &&
//         el.boundingBox[4] < 500 &&
//         el.boundingBox[5] < 275 &&
//         el.boundingBox[6] > 65 &&
//         el.boundingBox[7] < 275
//       ) {
//         box1.push(el.text);
//       }
//     });
//     console.log('BOX1:   ', box1);

//     // BOX2
//     var box2 = [];
//     newData.recognitionResult.lines.forEach(el => {
//       if (
//         el.boundingBox[0] >= 65 &&
//         el.boundingBox[1] > 340 &&
//         el.boundingBox[2] < 500 &&
//         el.boundingBox[3] > 340 &&
//         el.boundingBox[4] < 500 &&
//         el.boundingBox[5] < 500 &&
//         el.boundingBox[6] > 65 &&
//         el.boundingBox[7] < 500
//       ) {
//         box2.push(el.text);
//       }
//     });
//     console.log('BOX2:   ', box2);

//     // BOX3
//     var box3 = [];
//     newData.recognitionResult.lines.forEach(el => {
//       if (
//         el.boundingBox[0] >= 65 &&
//         el.boundingBox[1] > 575 &&
//         el.boundingBox[2] < 500 &&
//         el.boundingBox[3] > 575 &&
//         el.boundingBox[4] < 500 &&
//         el.boundingBox[5] < 745 &&
//         el.boundingBox[6] > 65 &&
//         el.boundingBox[7] < 745
//       ) {
//         box3.push(el.text);
//       }
//     });
//     console.log('BOX3:   ', box3);

//     ////////////////////////////////////////////////
//   }
// };

// var data =
//   "{'url' : 'https://i.pinimg.com/564x/56/2c/1d/562c1d0cc5424d5fecfe912112716765.jpg'}";

// xhr.send(data);
