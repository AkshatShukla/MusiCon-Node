var mongoose = require('mongoose');

var artistSchema = mongoose.Schema({
    name: String,
    url: String,
    spotifyId: {type: String, unique: true},
    imageUrl:String,
    popularity:Number,
}, {collection: 'artist'});

module.exports = artistSchema;