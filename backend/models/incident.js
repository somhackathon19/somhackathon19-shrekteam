var mongoose = require('mongoose');

var Incident = mongoose.model('Incident', {
  description: String,
  latitude: Number,
  longitude: Number
});

module.exports = {Incident};
