var express = require('express');
var router = express.Router();

var TimetableItem = require('../models/timetableitems');

var mongoose = require('mongoose');
mongoose.connect('mongodb://192.168.1.69:27017/timetable');

/* GET home page. */
router.post('/', function(req, res, next) {

  //Logic to add item to mongodb
  var timetableitem = new TimetableItem({
      // start_time: "09:00 AM",
      // end_time: "09:30 AM",
      // description: "Dummy Task",
      // status: "Not Started"
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      description: req.body.description,
      status: req.body.status
  });
  
  timetableitem.save(function(err) {
    if(err){
      console.log(err);
      res.send({
        "title": 'Error Occurred!',
        "error": err
      });
      return
    }
    res.send('New Timetable item created!');
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