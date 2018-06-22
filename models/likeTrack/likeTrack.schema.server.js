var mongoose = require('mongoose');
var likeTrackSchema = mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrackModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'likeTrack'});
module.exports = likeTrackSchema;