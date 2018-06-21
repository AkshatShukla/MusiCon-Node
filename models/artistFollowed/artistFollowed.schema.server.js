var mongoose = require('mongoose');
var artistFollowedSchema = mongoose.Schema({
    artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArtistModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'artistFollowed'});
module.exports = artistFollowedSchema;