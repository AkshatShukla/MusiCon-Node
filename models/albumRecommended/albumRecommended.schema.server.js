var mongoose = require('mongoose');
var albumRecommendedSchema = mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlbumModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    hash: {
        type: String,
        unique: true
    }
}, {collection: 'albumRecommended'});
module.exports = albumRecommendedSchema;