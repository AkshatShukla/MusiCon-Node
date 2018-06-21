var mongoose = require('mongoose');
var audiophileFollowedSchema = mongoose.Schema({
    listener: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    audiophile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'audiophileFollowed'});
module.exports = audiophileFollowedSchema;