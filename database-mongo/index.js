var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var showSchema = mongoose.Schema({
  name: {type: String, index: {unique: true}},
  similar: [{type: String}]
});

var Show = mongoose.model('Show', showSchema);

var save = function(data, callback) {
  var parsedData = JSON.parse(data);
  var recommendations = parsedData.Similar.Results;
  var schemaOutline = {
    name: parsedData.Similar.Info[0].Name,
    likes: 0,
    similar: []
  };

  recommendations.forEach(item => {
    schemaOutline.similar.push(item.Name);
  });

  var newData = new Show(schemaOutline);

  newData.save(function(err, newData) {
    if (err) {
      console.log('Did not save to database.');
    }
    console.log('Saved to database');
    callback(newData);
  });
};

var selectTopFiveLiked = function(callback) {
  Show.find({}).sort({'likes': -1}).limit(5).exec(function(err, data) {
    if (err) {
      console.log('Did not find anything in database.');
    }
    callback(null, data);
  });
};

var selectAll = function(callback) {
  Show.find({}, function(err, data) {
    if (err) {
      console.log('Did not find anything in database.');
    }
    callback(null, data);
  });
};

module.exports.save = save;
module.exports.selectTopFiveLiked = selectTopFiveLiked;
module.exports.selectAll = selectAll;