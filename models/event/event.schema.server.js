var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    date: String,
    location:String
}, {collection: 'event'});

module.exports = eventSchema;