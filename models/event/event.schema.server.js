var mongoose = require('mongoose');

var eventSchema = mongoose.Schema({
    name: String,
    date: Date,
    location:String,
    artist: [{type: mongoose.Schema.Types.ObjectId, ref: 'ArtistModel'}]
}, {collection: 'event'});

module.exports = eventSchema;