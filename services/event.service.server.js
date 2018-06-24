module.exports = function (app) {

    app.post('/api/event', createEvent);
    app.get('/api/events', findAllEventOfUser);
    app.delete('/api/event/:eventId', deleteEvent);
    app.get('/api/event/:eventId/artists', getArtistsInEvent)

    var eventModel = require('../models/event/event.model.server');
    var userModel = require('../models/user/user.model.server')



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

    function getArtistsInEvent(req, res) {
        var eventId = req.params['eventId'];

        eventModel
            .getArtistsInEvent({_id: eventId})
            .then(response => res.json(response))
    }
}
