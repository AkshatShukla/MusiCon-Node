var mongoose = require('mongoose');
var eventSchema = require('./event.schema.server');
var eventModel = mongoose.model('EventModel', eventSchema);


function createEvent(event) {
    return eventModel.create({name: event.eventName, date: event.eventDate, location: event.venueName})
}

var api = {
    createEvent: createEvent
};

module.exports = api;