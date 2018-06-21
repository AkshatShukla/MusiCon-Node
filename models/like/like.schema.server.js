var mongoose = require('mongoose');
var likeSchema = mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrackModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'like'});
module.exports = likeSchema;