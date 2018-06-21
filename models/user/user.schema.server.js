var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    addresss:String,
    phone:Number,
    type: String,
    eventLocation:String,
    playlist:[{type:mongoose.Schema.Types.ObjectId}],
    events:[{type:mongoose.Schema.Types.ObjectId}],

}, {collection: 'user'});
module.exports = userSchema;