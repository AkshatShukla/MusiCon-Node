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

var api = {
    createEvent: createEvent,
    deleteEvent: deleteEvent
};

module.exports = api;