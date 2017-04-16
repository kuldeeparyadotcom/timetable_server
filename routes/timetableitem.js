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
router.post('/', function(req, res, next) {

  //Logic to add item to mongodb
  var timetableitem = new TimetableItem({
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      description: req.body.description,
      status: req.body.status
  });
  
  timetableitem.save(function(err, result) {
    if(err){
	return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
    }
            res.status(201).json({
            message: 'Saved Timetable Item!',
            obj: result
        });
  });
  
});

module.exports = router;

// Sample post request in aplication/json format
// {
//     "start_time": "7:00 PM",
//     "end_time": "7:30 PM",
//     "description": "Dummy Task 2",
//     "status": "started"
// }


router.patch('/:id', function (req, res, next) {
    TimetableItem.findById(req.params.id, function (err, timetableitem) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!timetableitem) {
            return res.status(500).json({
                title: 'No timetableitem Found!',
                error: {message: 'Timetable Item not found'}
            });
        }
        timetableitem.start_time = req.body.start_time;
        timetableitem.end_time = req.body.end_time;
        timetableitem.description = req.body.description;
        timetableitem.status = req.body.status;
        timetableitem.save(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Updated message',
                obj: result
            });
        });
    });
});


router.delete('/:id', function (req, res, next) {
    TimetableItem.findById(req.params.id, function (err, timetableitem) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!timetableitem) {
            return res.status(500).json({
                title: 'No timetableitem Found!',
                error: {message: 'Timetable Item not found'}
            });
        }
        timetableitem.remove(function(err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred',
                    error: err
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});
