var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var request = require('request');
var config = require('../config');
var db = require('../database-mongo/index');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var options = {
  q: '',
  type: 'shows',
  k: config.API_KEY
};

var joinedParameters = function(option) {
  var joinedParams = 'https://tastedive.com/api/similar?';
  for (var key in options) {
    joinedParams += `${key}=${options[key]}`;
    if (key !== 'k') {
      joinedParams += '&';
    }
  }
  return joinedParams;
};

app.post('/search', function (req, res) {
  var a;
  options.q = req.body.valueToFetch;
  request(joinedParameters(options), (err, response, body) => {
    if (err) {
      console.log('API call was unsuccessful.');
    }
    db.save(body);
    console.log('API call was successful.');
  });
  res.status(200).send(dataB);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

