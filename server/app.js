var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/* in our app, use the route posts and call the postRoute module for details */
app.use('/posts', require('./routes/postRoute'));

module.exports = app;
