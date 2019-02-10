var mongoose = require('mongoose');

var Route = mongoose.model('Route', {
  latitudeIni: Number,
  longitudeIni: Number,
  latitudeEnd: Number,
  longitudeEnd: Number,
  user: String,
  minions: Array
});

module.exports = {Route};