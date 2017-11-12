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
      request(joinedParameters(options), (err, response, body) => {
        if (err) {
          console.log('API call was unsuccessful.');
        }
        console.log('API call was successful.');
        var parsedBody = JSON.parse(body);
        if (parsedBody.Similar.Info[0].Type === "show") {
          db.save(parsedBody, function(data) {
            res.status(200).send(data.similar);
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
