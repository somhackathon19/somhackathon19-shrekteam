'use strict';

const mongoose = require('mongoose');
const {Route} = require('../models/route');


function getRoutes(req, res) {
    Route.find().then((routes) => {
        res.send({routes});
    }, (e) => {
        res.status(400).send(e);
    }); 
}

function getRouteById(req, res) {
    var id = req.params.routeId;
    Route.findById(id).then((route) => {
        if (!route) {
            return res.status(404).send();
        }
        res.send({route});
    }).catch((e) => {
        res.status(400).send();
    });
}

function saveRoute(req, res) {
    var route = new Route({
        latitudeIni: req.body.latitudeIni,
        longitudeIni: req.body.longitudeIni,
        latitudeEnd: req.body.latitudeEnd,
        longitudeEnd: req.body.longitudeEnd,
        user: req.body.user
    });
    route.save().then((route) => {
        res.send(route);
      }, (e) => {
        res.status(400).send(e);
      });
}

function updateRoute(req, res) {
    var routeId = req.params.routeId;
    var body = req.body;
    Route.findByIdAndUpdate(routeId, {$set: body}, {new: true}).then((route) => {
    if (!route) {
      return res.status(404).send();
    }
    res.send({route});
  }).catch((e) => {
    res.status(400).send();
  })
}

function deleteRouteById(req, res) {
    var id = req.params.routeId;
    Route.findByIdAndRemove(id).then((route) => {
    if (!route) {
      return res.status(404).send();
    }
    res.send({route});
  }).catch((e) => {
    res.status(400).send();
  });
}

module.exports = {
    getRoutes,
    getRouteById,
    saveRoute,
    deleteRouteById,
    updateRoute
}


