var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    name: String,
    spotifyId: {type: String, unique: true},
    artist: String,
    url: String,
    imageUrl:String
}, {collection: 'album'});

module.exports = albumSchema;