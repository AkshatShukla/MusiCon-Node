module.exports = function (app) {

    app.post('/api/followArtist', followArtist);
    app.get('/api/followedArtists', getFollowedArtists);
    app.delete('/api/unfollowArtist', unfollowArtist);

    var artistModel = require('../models/artist/artist.model.server');
    var followArtistModel = require('../models/artistFollowed/artistFollowed.model.server');


    function followArtist(req, res) {
        var artist = req.body;
        var user = req.session.currentUser;
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
            artistModel.findArtistBySpotifyId(newArtist.spotifyId)
                .then(queryresult => {
                    if (queryresult === null) {
                        artistModel.createArtist(newArtist)
                            .then((art) =>
                                followArtistModel.findByHash(req.session.userId, art._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            followArtistModel.createFollow(req.session.userId, art._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        followArtistModel.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    followArtistModel.createFollow(req.session.userId, queryresult._id)
                                        .then(()=> res.sendStatus(200))
                                }
                                else{
                                    res.sendStatus(501)
                                }
                            })
                    }
                });
        }

    }

    function unfollowArtist(req, res) {
        var artist = req.body;
        var user = req.session.currentUser;
        followArtistModel.unfollowArtist(user._id, artist._id)
            .then(() => res.sendStatus(200))
    }

    function getFollowedArtists(req, res) {
        var user = req.session['currentUser'];
        var resultArtists = [];
        followArtistModel.findFollowedArtistsForUser(user._id)
            .then((followedArtists) => {
                followedArtists.map((followedArtist) => {
                    resultArtists.push(followedArtist.artist)
                });
                res.send(resultArtists);
            })
            .catch(() => {
                res.sendStatus(501);
                res.send(resultArtists);
            });
    }
};
