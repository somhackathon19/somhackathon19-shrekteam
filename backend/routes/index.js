'use strict';

const express       = require('express');
const userCtrl      = require('../controllers/user');
const incidentCtrl  = require('../controllers/incident');
const routeCtrl  = require('../controllers/route');

const api           = express.Router();
const auth          = require('../middlewares/auth');



//listeners user
api.post('/signup', userCtrl.singUp);
api.post('/signin', userCtrl.singIn);
api.get('/usersNotValidated', userCtrl.getUsersNotValidated);
api.get('/users', userCtrl.getUsers);
api.put('/users/:userId', userCtrl.validateUser);
api.delete('/users/:userId', userCtrl.deleteUser);


//listeners event

api.get('/incidents/', incidentCtrl.getIncidents);
api.get('/incidents/:incidentId', incidentCtrl.getIncidentById);
api.post('/incidents/', incidentCtrl.saveIncident);
api.get('/routes/', routeCtrl.getRoutes);
api.get('/routes/:routeId', routeCtrl.getRouteById);
api.post('/routes', routeCtrl.saveRoute);
api.put('/routes', routeCtrl.updateRoute);
api.delete('/routes/:routeId', routeCtrl.deleteRouteById);


/*
api.put('/event/:eventId', auth.isAuth,  eventCtrl.updateEvent);
api.delete('/event/:eventId', auth.isAuth,  eventCtrl.deleteEvent);
api.get('/events/avaiable/:latitud/:longitud', auth.isAuth, eventCtrl.avaiableEvents);
*/

module.exports = api;