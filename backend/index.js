'use strict';

const mongoose  = require('mongoose');
const app       = require('./app');
const config    = require('./config');

mongoose.connect(config.db, (err,res) => {
    if(err) {
        return console.log(`Error al conectar con la base de datos: ${err}`);
    }
    console.log('Conexion con la base de datos establecida...');

    //app listen on port 3000
    app.listen(config.port, function () {
        console.log(`API REST corriendo en http://localhost:${config.port}`);
    });
});

