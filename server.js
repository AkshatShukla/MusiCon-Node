var express = require('express')
var bodyParser = require('body-parser');
const mongoose = require('mongoose'), extend = require('mongoose-schema-extend');
mongoose.connect('mongodb://heroku_m9j3xqd6:cqo386da2m9s1lhqui3roqbn2b@ds263710.mlab.com:63710/heroku_m9j3xqd6');//db url


var app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "https://webdev-summer1-project-react.herokuapp.com");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

var session = require('express-session')
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/', function (req, res) {
    res.send('Hello World')
});

app.get('/api/session/set/:name/:value',
    setSession);
app.get('/api/session/get/:name',
    getSession);

function setSession(req, res) {
    var name = req.params['name'];
    var value = req.params['value'];
    req.session[name] = value;
    res.send(req.session);
}

function getSession(req, res) {
    var name = req.params['name'];
    var value = req.session[name];
    res.send(value);
}


var userService = require('./services/user.service.server');
userService(app);

var spotifyService = require('./services/spotify.service.server');
spotifyService(app);

var albumService = require('./services/album.service.server');
albumService(app);

var trackService = require('./services/track.service.server');
trackService(app);

var eventService = require('./services/event.service.server');
eventService(app);

var playlistService = require('./services/playlist.service.server');
playlistService(app);

var artistService = require('./services/artist.service.server');
artistService(app);
var adminService = require('./services/admin.service.server');
adminService(app);
var audiophileService = require('./services/audiophile.service.server');
audiophileService(app);
app.listen(process.env.PORT || 4000);