const admin = require('firebase-admin');
const functions = require('firebase-functions');
var sys = require('util');
var bodyParser = require('body-parser');
var express = require('express');
const app = express();
app.use(bodyParser.json());
var router = express.Router();

// setup firestore
var db = admin.firestore();

/* Get user list */
router.get('/:name?', function(req, res, next) {
  var groupInfo = req.query.name;
  

/* Post new user*/
router.post('/', function(req, res, next) {
});

/* Update user */
router.put('/:name?', function(req, res, next) {
});

router.delete('/:name?', function(req, res, next){
});

module.exports = router;
