var mongoose = require('mongoose');

var artistSchema = mongoose.Schema({
    name: String,
    url: String,
    spotifyId: {type: String, unique: true},
    imageUrl:String
}, {collection: 'artist'});

module.exports = artistSchema;