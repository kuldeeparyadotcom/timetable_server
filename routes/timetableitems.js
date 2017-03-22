var express = require('express');
var router = express.Router();

var TimetableItem = require('../models/timetableitems');

var config = require('config');
var dbConfig = config.get('timetable.dbConfig');

var mongoose = require('mongoose');

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