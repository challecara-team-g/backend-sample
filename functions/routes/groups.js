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

/* Get group list */
router.get('/', function(req, res, next) {
  var groupInfo = req.query.name;
  var groupRef = db.collection('groups').doc(groupInfo);
  var getDoc = groupRef.get()
    .then(doc => {
      if (!doc.exists) {
        res.json({"message": "No such document!"});
      } else {
        res.json({"message": "success", [groupInfo]: doc.data()});
      }
    })
    .catch(err => {
      res.json({"message": err});
    });
});

/* Post new group*/
router.post('/', function(req, res, next) {
  var newData = req.body
  var docRef = db.collection('groups').doc(newData.name);
  docRef.set(newData).then(ref => {
    res.json({"message":'success'});
  }).catch(function (error) {
    res.json({"message": error})
    next(error);
  });
});

/* Update group */
router.put('/', function(req, res, next) {
  var groupInfo = req.query.name;
  var updateData = req.body
  var groupRef = db.collection('groups').doc(groupInfo);
  groupRef.update(updateData).then(ref => {
    res.json({"message":'success'});
  }).catch(function (error) {
    res.json({"message": error})
    next(error);
  });
});

router.delete('/', function(req, res, next){
  var groupInfo = req.query.name;
  var groupRef = db.collection('groups').doc(groupInfo);
  groupRef.delete().then(ref => {
    res.json({"message": "success"});
  }).catch(function (error){
    res.json({"message": error})
    next(error);
  });
});

module.exports = router;
