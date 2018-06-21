var mongoose = require('mongoose');
var artistListSchema = mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrackModel'
    },
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArtistModel'
    }
}, {collection: 'artistList'});
module.exports = artistListSchema;