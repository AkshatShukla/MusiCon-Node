var fetch = require('node-fetch');

module.exports = function (app) {

    app.post('/api/event', createEvent);
    app.get('/api/events', findAllEventOfUser);
    app.get('/api/events/nearby', findAllEventsNearUser);
    app.delete('/api/event/:eventId', deleteEvent);
    app.get('/api/event/:eventId/artists', getArtistsInEvent);
    app.post('/api/event/:eventId/addartist', addArtistToEvent);
    app.delete('/api/event/:eventId/artist/:artistId', deleteArtistFromEvent);

    var eventModel = require('../models/event/event.model.server');
    var userModel = require('../models/user/user.model.server');
    var artistModel = require('../models/artist/artist.model.server');



    function createEvent(req, res) {
        var event = req.body;
        var user = req.session.currentUser;

        eventModel.createEvent(event)
            .then(response => {
                userModel.updateUserEvent(user._id, response)
                    .then(response1 => res.sendStatus(200))
            });
    }

    function findAllEventOfUser(req, res) {
        var user = req.session.currentUser;

        userModel.findAllEventOfUser(user)
            .then(response => res.json(response));
    }

    function deleteEvent(req, res) {
        var eventId = req.params['eventId'];
        var user = req.session.currentUser;

        eventModel.deleteEvent({_id: eventId})
            .then(() => {
                userModel.deleteUserEvent({_id: user._id}, {_id: eventId})
                    .then(() => res.sendStatus(200))
            })
    }

    function deleteArtistFromEvent(req, res) {
        var eventId = req.params['eventId'];
        var artistId = req.params['artistId'];

        eventModel
            .deleteArtistFromEvent({_id: eventId}, {_id: artistId})
            .then(() => res.sendStatus(200))
    }

    function getArtistsInEvent(req, res) {
        var eventId = req.params['eventId'];

        eventModel
            .getArtistsInEvent({_id: eventId})
            .then(response => res.json(response))
    }

    function addArtistToEvent(req, res) {
        var artist = req.body;
        var user = req.session.currentUser;
        var eventId = req.params['eventId'];

        var newArtist = {
            name: artist.name,
            spotifyId: artist.id,
            url: artist.external_urls.spotify,
            imageUrl: (artist.images.length !== 0 ? artist.images[0].url : ''),
            popularity:artist.popularity,

        };

        if (user === undefined) {
            res.sendStatus(500);
        }
        else {
            artistModel
                .findArtistBySpotifyId(newArtist.spotifyId)
                .then(queryresult => {
                    if (queryresult === null) {
                        artistModel.createArtist(newArtist)
                            .then((artist) =>
                                eventModel
                                    .addArtistToEvent({_id: eventId}, artist)
                                    .then(() => res.sendStatus(200))
                            )
                    }
                    else {
                        eventModel
                            .isArtistPresentInEvent({_id: eventId}, {_id: queryresult._id})
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    eventModel
                                        .addArtistToEvent({_id: eventId}, queryresult)
                                        .then(() => res.sendStatus(200))
                                }
                                else{
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }
    }

    function findAllEventsNearUser(req,res){
        var userId = req.session['userId']
        if(userId!==undefined) {
            userModel.findCity(userId)
                .then(result => {
                    fetch('https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city='+
                        result.city+'&apikey=RAcRAAAio2LeFih8v4pqWXlZo1CA4mVs')
                        .then(response => response.json()
                            .then(resultTM => {
                                eventModel.findEventByCity(result.city)
                                    .then(resultLocal =>{
                                        res.json({tn:resultTM._embedded.events,lr:resultLocal});
                                    })
                            }))
                })
    }
    else{
            res.sendStatus(500);
        }
    }
}
