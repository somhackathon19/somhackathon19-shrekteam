var mongoose = require('mongoose');

var Incident = mongoose.model('Incident', {
  category: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  subcategory: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  state: {
    type: String,
    trim: true
  },
  date: {
    type: Date
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  }
  photo: {
    
  },
  comment: {

  },
  user: {
    type: String,
    default: false,
  }
});

module.exports = {Event};
