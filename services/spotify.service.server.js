var fetch = require('node-fetch');
var spotifyModel = require('../models/spotify/spotify.model.server');
module.exports = function (app) {

    app.get('/api/get-token', getToken);

    function getToken(req, res) {
        spotifyModel.getToken()
            .then(token => {
                const timetoken = new Date(token.tokentime);
                const timenow = new Date();
                const diffMs = (timenow - timetoken); // milliseconds between now & Christmas
                const diffDays = Math.floor(diffMs / 86400000); // days
                const diffHrs = Math.floor((diffMs % 86400000) / 3600000);
                // console.log('time in db',token.tokentime);
                // console.log('time now',timenow);
                // console.log(diffDays + " days, " + diffHrs + " hours, ");
                if (diffDays > 0 || diffHrs >= 1) {
                    console.log("Getting a new Token");
                    fetch('https://accounts.spotify.com/api/token', {
                        body: "grant_type=client_credentials",
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Authorization': 'Basic OTlmMDIxMjk4MjBlNGM0YjlmNDk4OWQ5OGM1Y2JlODU6MGJhODViNzZjOGY0NDFlNTgwZGI1OTIwMGViYzJjMDA='
                        },
                        method: 'post'
                    })
                        .then((response) => {
                            response.json().then(r => {
                                res.json(r.access_token);
                                //updating db
                                spotifyModel.insert(r.access_token,timenow)
                                    .then(response => console.log("Updates DB"));
                            })
                        });
                }
                else {
                    console.log("Using existing token");
                    res.json(token.token);
                }
                // res.json(token);
            })

    }

};