var mongoose = require('mongoose');

var playlistSchema = mongoose.Schema({
    name: {type: String, default: ''},
    description: {type: String, default: ''},
    track: [{type: mongoose.Schema.Types.ObjectId, ref: 'TrackModel'}]
}, {collection: 'playlist'})

module.exports = playlistSchema;