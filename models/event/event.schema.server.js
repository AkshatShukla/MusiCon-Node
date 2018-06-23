var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    date: Date,
    location:String
}, {collection: 'event'});

module.exports = eventSchema;