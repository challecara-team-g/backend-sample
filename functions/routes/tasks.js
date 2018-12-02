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

/* Get task list */
router.get('/:name?', function(req, res, next) {
  var userInfo = req.query.name;
  var userRef = db.collection('tasks').doc(userInfo);
  var getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
        res.json({"message": "No such document!"});
      } else {
        res.json({"message": "success", [userInfo]: doc.data()});
      }
    })
    .catch(err => {
      res.json({"message": err});
    });
});

/* Post new tasks*/
router.post('/', function(req, res, next) {
  var newData = req.body
  var docRef = db.collection('tasks').doc(newData.id);
  docRef.set(newData).then(ref => {
    res.json({"message":'success'});
  }).catch(function (error) {
    res.json({"message": error})
    next(error);
  });
});

/* Update tasks */
router.put('/:name?', function(req, res, next) {
  var userInfo = req.query.name;
  var updateData = req.body
  var userRef = db.collection('tasks').doc(userInfo);
  userRef.update(updateData).then(ref => {
    res.json({"message":'success'});
  }).catch(function (error) {
    res.json({"message": error})
    next(error);
  });
});

router.delete('/:name?', function(req, res, next){
  var userInfo = req.query.name;
  var userRef = db.collection('tasks').doc(userInfo);
  userRef.delete().then(ref => {
    res.json({"message": "success"});
  }).catch(function (error){
    res.json({"message": error})
    next(error);
  });
});

module.exports = router;
