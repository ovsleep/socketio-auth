'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const debug = require('debug');
const dotenv = require('dotenv');
dotenv.load();
const auth = require('./routes/auth');

const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);
mongoose.Promise = require('bluebird');

const app = express();

//middleware
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
app.use('/login', auth);

//Server start
app.set('port', PORT);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});

//hook sockets
var io = require('./socket').listen(server);

module.exports = app;
