'use strict';

const mongoose = require('mongoose');
const {Incident} = require('../models/incident');
const fs = require('fs');
var path = require('path');



function getIncidents(req, res) {
    Incident.find().then((incidents) => {
        res.send({incidents});
    }, (e) => {
        res.status(400).send(e);
    }); 
}

function getIncidentById(req, res) {
    var id = req.params.incidentId;
    Incident.findById(id).then((incident) => {
        if (!incident) {
            return res.status(404).send();
        }
        res.send({incident});
    }).catch((e) => {
        res.status(400).send();
    });
}

function saveIncident(req, res) {
    console.log(req.body);
    var incident = new Incident({
        description: req.body.description,
        latitude: req.body.lat,
        longitude: req.body.lng
    });
    console.log()
    incident.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
}


module.exports = {
    getIncidents,
    getIncidentById,
    saveIncident
}