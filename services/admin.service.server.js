module.exports = function (app) {

    app.get('/api/admin/user', getAllUsers);

    var userModel = require('../models/user/user.model.server')

    function getAllUsers(req, res) {
        var user = req.session.currentUser;
        if (user === undefined) {
            res.sendStatus(500);
        }
        else if (user.type !== 'Admin') {
            res.sendStatus(501);//not admin trying to get admin info
        }
        else {
            userModel.findAllUsers()
                .then(users => res.json(users))
        }
    }
}
