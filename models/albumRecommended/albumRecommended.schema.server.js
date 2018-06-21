var mongoose = require('mongoose');
var albumRecommendedSchema = mongoose.Schema({
    album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlbumModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'albumRecommended'});
module.exports = albumRecommendedSchema;