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

var save = function(data) {
  var parsedData = JSON.parse(data);
  var recommendations = parsedData.Similar.Results;
  var schemaOutline = {
    name: parsedData.Similar.Info[0].Name,
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
  });
};

var selectAll = function(callback) {
  Show.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.selectAll = selectAll;
module.exports.save = save;