var mongoose = require('mongoose');

var artistSchema = mongoose.Schema({
    name: String,
    url: String,
    imageUrl:String
}, {collection: 'artist'});

module.exports = artistSchema;