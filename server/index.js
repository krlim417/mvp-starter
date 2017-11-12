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
  info: 1,
  k: config.API_KEY
};

var imageOptions = {
  q: ''
}

var joinedRecommendationParameters = function(option) {
  var joinedParams = 'https://tastedive.com/api/similar?';
  for (var key in options) {
    joinedParams += `${key}=${options[key]}`;
    if (key !== 'k') {
      joinedParams += '&';
    }
  }
  return joinedParams;
};

var joinedImageParameters = function(option) {
  return `http://api.tvmaze.com/search/shows?q=${option.q}`
}

app.post('/search', function (req, res) {
  options.q = req.body.valueToFetch;
  imageOptions.q = req.body.valueToFetch;
  db.selectAll(function(err, result) {
    var output;
    for (var i = 0; i < result.length; i++) {
      if (result[i].name.toLowerCase() === options.q.toLowerCase()) {
        output = result[i].similar;
        db.updateSearchCount(options.q, function(err, result) {
          if (err) {
            console.log('Update times searched did not work');
          }
          output.push(result);
        });
        break;
      }
    }
    if (output) {
      res.status(200).send(output);
    } else {
      request(joinedRecommendationParameters(options), (err, response, body) => {
        if (err) {
          console.log('API call to get recommendations was unsuccessful.');
        }
        console.log('API call to get recommendations was successful.');
        var parsedRecommendationBody = JSON.parse(body);
        if (parsedRecommendationBody.Similar.Info[0].Type === "show") {
          request(joinedImageParameters(imageOptions), (err, response, body) => {
            if (err) {
              console.log('API call to fetch show information unsuccessful.');
            }
            console.log('API call to fetch show information was successful');
            var parsedShowInfoBody = JSON.parse(body)[0];
            db.save(parsedRecommendationBody, parsedShowInfoBody, function(data) {
              res.status(200).send(data.similar);
            });
          });
        } else {
          res.status(404).send();
        }
      });
    };
  });
});

app.get('/fetch', function(req, res) {
  db.selectTopFiveLiked(function(err, items) {
    var output = [];
    if (err) {
      console.log('Server failed to fetch from database.');
    }
    res.status(200).send(items);
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
