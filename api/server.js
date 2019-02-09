//const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
//const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Event} = require('./models/event');
var {User} = require('./models/user');

var app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/events', (req, res) => {
  console.log(req.body);
  var event = new Event({
    name: req.body.name,
    description: req.body.description,
    // dateIni: req.body.dateIni,
    // dateEnd: req.body.dateEnd,
    organizer: req.body.organizer
  });

  event.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/events', (req, res) => {
  Event.find().then((events) => {
    res.send({events});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/events/:id', (req, res) => {
  var id = req.params.id;
  /*
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  */
  Event.findById(id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }

    res.send({event});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/events/:id', (req, res) => {
  var id = req.params.id;
  /*
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  */
  Todo.findByIdAndRemove(id).then((event) => {
    if (!event) {
      return res.status(404).send();
    }

    res.send({event});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/event/:id', (req, res) => {
  var id = req.params.id;
  // var body = _.pick(req.body, ['text', 'completed']);
  /*
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  */
  /*
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }
  */
  var body = req.body;
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((event) => {
    if (!todo) {
      return res.status(404).send();
    }
    res.send({event});
  }).catch((e) => {
    res.status(400).send();
  })
});

app.post('/users', (req, res) => {
  var user = new User({
    name: req.body.name
  });
  user.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.delete('/users/:id', (req, res) => {
  User.findByIdAndDelete(id).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});



module.exports = {app};
