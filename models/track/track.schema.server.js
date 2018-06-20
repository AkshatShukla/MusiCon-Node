var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    name: String,
    artist: String,
    url: String,
    listeners: Number,
    imageUrl:String
}, {collection: 'track'});

module.exports = trackSchema;