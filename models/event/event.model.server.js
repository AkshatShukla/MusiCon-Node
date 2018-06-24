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

function addArtistToEvent(eventId, artist) {
    return eventModel.update({_id: eventId._id}, {$push: {artist: artist._id}})
}

function isArtistPresentInEvent(eventId, artistId) {
    return eventModel.findOne({ $and: [{_id: eventId._id}, {artist: {$in: [artistId._id]}}]})
}

function deleteArtistFromEvent(eventId, artistId) {
    return eventModel.update({_id: eventId._id}, {$pull: {artist: artistId._id}})
}
function findEventByCity(city){
    return eventModel.find({location:city})
}

var api = {
    createEvent: createEvent,
    deleteEvent: deleteEvent,
    getArtistsInEvent: getArtistsInEvent,
    addArtistToEvent: addArtistToEvent,
    isArtistPresentInEvent: isArtistPresentInEvent,
    deleteArtistFromEvent: deleteArtistFromEvent,
    findEventByCity:findEventByCity
};

module.exports = api;