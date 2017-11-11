var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var request = require('request');
var config = require('../config');

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
  options.q = req.body.valueToFetch;
  request(joinedParameters(options), (err, data) => {
    if (err) {
      console.log('API call was unsuccessful.');
    }
    console.log('API call was successful.');
  });
  res.status(200).send(options.q);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

