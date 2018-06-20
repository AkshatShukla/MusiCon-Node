var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    token: String,
    tokentime: Date,
    id:Number,
}, {collection: 'spotify'});
module.exports = userSchema;