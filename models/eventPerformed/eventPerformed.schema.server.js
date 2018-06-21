var mongoose = require('mongoose');
var eventPerformedSchema = mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EventModel'
    },
    Artist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ArtistModel'
    }
}, {collection: 'eventPerformed'});
module.exports = eventPerformedSchema;