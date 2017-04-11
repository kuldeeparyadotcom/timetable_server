
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//var ObjectID = Schema.ObjectID;

var mongooseUniqueValidator = require('mongoose-unique-validator');

var timetableuser = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true}
});

timetableuser.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('TimetableUser', timetableuser);

//Sample post requrest
// {
//     "email": "test@test.com",
//     "password": "mypass",
//     "firstname": "myFirstName",
//     "latname": "myLastName"
// }