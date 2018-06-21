var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    capacity: Number,
    description:String
}, {collection: 'event'});

module.exports = eventSchema;