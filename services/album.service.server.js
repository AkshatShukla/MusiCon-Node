module.exports = function (app) {

    app.post('/api/likeAlbum', createAlbum);

    var albumModel = require('../models/album/album.model.server');



    function createAlbum(req, res) {
        var album = req.body;
        var user = req.session.currentUser;
        var newAlbum = {
            name: album.name,
            spotifyId: album.id,
            releaseDate: album.release_date,
            artist: album.artists[0].name,
            externalUrl: album.external_urls.spotify,
            imageUrl: (album.images.length !== 0 ? album.images[0].url : '')
        };

        res.sendStatus(200);
    }
}
