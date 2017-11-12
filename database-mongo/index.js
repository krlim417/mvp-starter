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
  image: String,
  timesSearched: Number,
  similar: [{
    name: String,
    description: String,
    wiki: String,
    youtubeId: String
  }]
});

var Show = mongoose.model('Show', showSchema);

var save = function(parsedRecommendationData, parsedShowInfoData, callback) {
  var recommendations = parsedRecommendationData.Similar.Results;
  var schemaOutline = {
    name: parsedRecommendationData.Similar.Info[0].Name,
    image: parsedShowInfoData.show.image.medium,
    timesSearched: 1,
    similar: []
  };

  recommendations.forEach(item => {
    schemaOutline.similar.push({
      name: item.Name,
      description: item.wTeaser,
      wiki: item.wUrl,
      youtubeId: item.yID
    });
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
  Show.find({}).sort({'timesSearched': -1}).limit(5).exec(function(err, data) {
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

var updateSearchCount = function(name, callback) {
  console.log('NAME IN SEARCH', name);
  Show.findOneAndUpdate(name, {$inc: {timesSearched: 1}}).exec(function(err, data) {
    if (err) {
      console.log('Did not increment times searched.');
    }
    callback(data);
  });
}

module.exports.save = save;
module.exports.selectTopFiveLiked = selectTopFiveLiked;
module.exports.selectAll = selectAll;
module.exports.updateSearchCount = updateSearchCount;