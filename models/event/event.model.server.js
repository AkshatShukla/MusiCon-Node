var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('EventModel', eventSchema);


function createEvent(event) {
    return eventModel.create({
        name: event.eventName,
        date: event.eventDate,
        location: event.venueName})
}

function deleteEvent(eventId) {
    return eventModel.remove(eventId);
}

function getArtistsInEvent(eventId) {
    return eventModel.findOne({_id: eventId._id}, {artist: 1}).populate('artist')
}

var api = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    getArtistsInEvent: getArtistsInEvent
};

module.exports = api;