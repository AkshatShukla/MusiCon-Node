module.exports = function (app) {

    app.post('/api/followArtist', createArtist);

    var artistModel = require('../models/artist/artist.model.server');
    var likeArtist = require('../models/artistFollowed/artistFollowed.model.server');


    function createArtist(req, res) {
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
                                likeArtist.findByHash(req.session.userId, art._id)
                                    .then(hashFindResult =>{
                                        if(hashFindResult===null){
                                            likeArtist.createFollow(req.session.userId, art._id)
                                                .then(()=> res.sendStatus(200))
                                        }
                                        else{
                                            res.sendStatus(501)
                                        }
                                    })
                            )
                    }
                    else {
                        likeArtist.findByHash(req.session.userId, queryresult._id)
                            .then(hashFindResult =>{
                                if(hashFindResult===null){
                                    likeArtist.createFollow(req.session.userId, queryresult._id)
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
}
