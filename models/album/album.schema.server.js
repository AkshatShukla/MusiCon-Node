var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    name: String,
    spotifyId: {type: String, unique: true},
    releaseDate: String,
    artist: String,
    externalUrl: String,
    imageUrl:String
}, {collection: 'album'});

module.exports = albumSchema;