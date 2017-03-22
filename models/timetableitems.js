
var mongoose = require('mongoose');

var Schema = mongoose.Schema;
//var ObjectID = Schema.ObjectID;

var timetableitem = new Schema({
    start_time: {type: String, required: true},
    end_time: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String}
});

module.exports = mongoose.model('TimetableItem', timetableitem);

//Sample post requrest
// {
//     "start_time": "7:00 PM",
//     "end_time": "7:30 PM",
//     "description": "Dummy Task 2",
//     "status": "started"
// }