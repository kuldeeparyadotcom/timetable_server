var express = require('express');
var router = express.Router();

var TimetableItem = require('../models/timetableitems');

var config = require('config');
var dbConfig = config.get('timetable.dbConfig');

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

router.use('/', function(req, res, next){
    jwt.verify(req.query.token, 'superSecretKey', function(err, decoded) {
        if (err) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: err
            });
        }
        next();
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
    TimetableItem.find({}, function(err, docs) {
      if(err) {
        console.log(err);
      }
      //Docs retrieved successfully
      res.send(docs);
    });
});

module.exports = router;