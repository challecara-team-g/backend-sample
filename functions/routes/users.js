const admin = require('firebase-admin');
const functions = require('firebase-functions');
var sys = require('util');
var bodyParser = require('body-parser');
var express = require('express');
const app = express();
app.use(bodyParser.json());
var router = express.Router();

// setup firestore
admin.initializeApp(functions.config().firebase);
var db = admin.firestore();

/* Get user list */
router.get('/:name?', function(req, res, next) {
  var userInfo = req.query.name;
  var userRef = db.collection('users').doc(userInfo);
  var getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
        res.json({"message": "No such document!"});
      } else {
        res.json({"message": 'success', doc});
      }
    })
    .catch(err => {
      res.json({"message": err});
    });
});

/* Post new user*/
router.post('/', function(req, res, next) {
  var newData = req.body
  var docRef = db.collection('users').doc(newData.name);
  docRef.set(newData).then(ref => {
    console.log('success');
    res.send('success');
  }).catch(function (error) {
    console.log(error);
    next(error);
  });
})
module.exports = router;