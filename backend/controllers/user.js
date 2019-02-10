'use strict';

const mongoose = require('mongoose');
const User = require('../models/user');
const service = require('../services');
const R = require('ramda');
const bcrypt = require('bcrypt-nodejs');

function singUp(req,res) {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        dni: req.body.dni,
        photo: req.body.photo
    });

    user.save((err) => {
        if(err) return res.status(500).send({message:`Error al crear el usuario: ${err}`})
        res.status(200).send({
            token: service.createToken(user),
            user: user,
        });
    });
}

function singIn(req,res) {
    User.find({email: req.body.email}, (err, user) => {
        if(err) return res.status(500).send({message: `Se ha producido un error en el singIn: ${err}`});
        if(R.isNil(user) || R.isEmpty(user)) return res.status(404).send({message: 'No existe el usuario'});
        let plainPass = req.body.password;
        let hash =  user[0].password;
        bcrypt.compare(plainPass, hash, (err, result) => {
            if(err) return res.status(403).send(`Ha ocurrido un error: ${err}`);
            if(!result) return res.status(403).send(`username o password incorrectos`);
            res.status(200).send({
                token: service.createToken(user),
                user: user,
            });
        });
    });
}

function getUsersNotValidated(req, res) {
    User.find({validated: false}, (err, user) => {
        if(err) return res.status(500).send({message: `Se ha producido un error`});
        res.status(200).send({
            users: user,
        });
    });
}


function getUsers(req, res) {
    User.find().then((err, users) => {
        if(err) return res.status(500).send({message: `Se ha producido un error`});
        res.status(200).send({
            users
        });
    });
}

function validateUser(req, res) {
    var userId = req.params.userId;
    var body = req.body;
    User.findByIdAndUpdate(userId, {$set: body}, {new: true}).then((user) => {
    if (!user) {
      return res.status(404).send();
    }
    res.send({user});
  }).catch((e) => {
    res.status(400).send();
  })
}

function deleteUser(req, res) {
    var userId = req.params.userId;
    console.log(userId);
    User.remove({
        _id: req.params.userId,
      }, function (err, user) {
        if (err)
          return console.error(err);

        console.log('User successfully removed from users collection!');
        res.send({user});


      });
}

module.exports = {
    singUp,
    singIn,
    getUsersNotValidated,
    validateUser,
    deleteUser,
    getUsers
}