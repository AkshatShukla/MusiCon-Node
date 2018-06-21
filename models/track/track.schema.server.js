var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    name: String,
    spotifyId: {type: String, unique: true},
    artist: String,
    url: String,
    listeners: Number,
    imageUrl:String
}, {collection: 'track'});

module.exports = trackSchema;