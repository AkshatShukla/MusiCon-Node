var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: {type: String, default: ''},
    lastName: {type: String, default: ''},
    email: {type: String, default: ''},
    dob: {type: String, default: ''},
    city: {type: String, default: ''},
    phone: {type: Number, default: 0},
    type: String,
    eventLocation: {type: String, default: ''},
    playlist:[{type: mongoose.Schema.Types.ObjectId, ref: 'PlaylistModel'}],
    events:[{type: mongoose.Schema.Types.ObjectId, ref: 'EventModel'}],

}, {collection: 'user'});

module.exports = userSchema;