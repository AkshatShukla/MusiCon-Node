module.exports = function (app) {

    app.get('/api/admin/user', getAllUsers);
    app.post('/api/admin/user', updateUser);
    app.delete('/api/admin/user/:userId',deleteUser);
    var userModel = require('../models/user/user.model.server')

    function deleteUser(req,res){
        var id = req.params.userId;
        userModel.deleteUser(id)
            .then(() => res.sendStatus(200));

    }
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
    function updateUser(req,res){
        var user = req.body;
        if(user._id===undefined){
            createUser(user)
                .then(()=> res.sendStatus(201))
        }
        else{
            userModel.updateUser(user._id,user)
                .then(result => res.sendStatus(200))
        }
    }
    function createUser(user){
        return userModel.createUser(user);
    }
}
