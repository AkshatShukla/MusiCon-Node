var mongoose = require('mongoose');
var likeAlbumSchema = mongoose.Schema({
    Album: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AlbumModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'likeAlbum'});
module.exports = likeAlbumSchema;