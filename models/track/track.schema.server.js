var mongoose = require('mongoose');

var trackSchema = mongoose.Schema({
    name: String,
    spotifyId: {type: String, unique: true},
    artist: String,
    url: String,
    imageUrl: String,
    listener: Number,
    duration: Number,
    popularity: Number,
    previewUrl: String
}, {collection: 'track'});

module.exports = trackSchema;
