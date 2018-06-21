var mongoose = require('mongoose');
var trackRecommendedSchema = mongoose.Schema({
    track: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrackModel'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'trackRecommended'});
module.exports = trackRecommendedSchema;