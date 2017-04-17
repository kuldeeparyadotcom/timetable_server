
var mongoose = require('mongoose');
var TimetableUser = require('./timetableusers');

var Schema = mongoose.Schema;
//var ObjectID = Schema.ObjectID;

var timetableitem = new Schema({
    start_time: {type: String, required: true},
    end_time: {type: String, required: true},
    description: {type: String, required: true},
    status: {type: String},
    user: { type: Schema.Types.ObjectId, ref: 'TimetableUser'}
});

timetableitem.post('remove', function(timetableItem) {
    TimetableUser.findById(timetableItem.user, function(err, user) {
        user.timetableItems.pull(timetableItem);
        user.save();
    });
});

module.exports = mongoose.model('TimetableItem', timetableitem);

//Sample post requrest
// {
//     "start_time": "7:00 PM",
//     "end_time": "7:30 PM",
//     "description": "Dummy Task 2",
//     "status": "started"
// }