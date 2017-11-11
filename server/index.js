var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
// var request = require('request');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

// request.get()

app.get('/search', function (req, res) {
  // console.log('REQUEST: ', req);
  console.log('HELLO?!');
  res.send('got yer request');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

