var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
// var request = require('request');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// request.get()

app.post('/search', function (req, res) {
  var searchValue = req.body.valueToFetch;
  
  res.status(200).send(searchValue);
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

