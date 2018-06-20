var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    addresss:[{type:mongoose.Schema.Types.ObjectId,ref:'AddressModel'}],
    type: {type: String, default: 'User'},
}, {collection: 'user'});
module.exports = userSchema;