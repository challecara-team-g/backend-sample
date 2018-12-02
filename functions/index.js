
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const app = express();
admin.initializeApp(functions.config().firebase);
// API Sample

var users = require('./routes/users');
var tasks = require('./routes/tasks');
var groups = require('./routes/groups');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users);
app.use('/groups', groups);
app.use('/tasks', tasks);

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err: {};
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

exports.app = functions.https.onRequest(app);
