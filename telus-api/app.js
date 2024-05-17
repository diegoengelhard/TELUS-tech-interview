var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var redis = require('redis');

var app = express();

// Imports cors middleware
const cors = require('cors');

// Imports index router middleware
const apiRouter = require('./routes/index.router');

// Enables cors
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// log server port
console.log(`Server running on port ${process.env.PORT || 3000}`);

// Uses index router middleware
app.use('/api', apiRouter);

module.exports = app;
