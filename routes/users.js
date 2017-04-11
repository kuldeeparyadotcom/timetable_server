var express = require('express');
var router = express.Router();

var TimetableUser = require('../models/timetableusers');

var config = require('config');
var dbConfig = config.get('timetable.dbConfig');

var mongoose = require('mongoose');

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/signup', function(req, res, next) {

  //Logic to add item to mongodb
  var timetableuser = new TimetableUser({
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      firstname: req.body.firstname,
      lastname: req.body.lastname
  });
  
  timetableuser.save(function(err, result) {
    if(err){
	  return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
    }
    res.status(201).json({
        message: 'Saved Timetable User!',
        obj: result
        });
  });
  
});


router.post('/signin', function(req, res, next) {

  //Logic to add item to mongodb
  var timetableuser = new TimetableUser({
      email: req.body.email,
      password: req.body.password
  });

  TimetableUser.findOne ({email: timetableuser.email}, function(err, user) {
    if(err){
	  return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
    }
    if(!user) {
        return res.status(401).json({
            title: 'Login Failed!',
            error: {message: 'Invalid Credentials!'}
        });
    }
    if(!bcrypt.compareSync(timetableuser.password, user.password)) {
        return res.status(401).json({
            title: 'Login Failed!',
            error: {message: 'Invalid Credentials!'}
        });
    }

    var token = jwt.sign({user: user}, 'superSecretKey', {expiresIn: 7200});
    res.status(200).json({
        message: "Login Successful!",
        token: token,
        userId: user._id
    });

  });
  
});

module.exports = router;

