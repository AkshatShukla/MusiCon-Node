var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    name: String,
    artist: String,
    url: String,
    imageUrl:String
}, {collection: 'album'});

module.exports = albumSchema;