module.exports = function (app) {

    app.post('/api/createEvent', createEvent);
    app.get('/api/events', findAllEventOfUser);

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
}
