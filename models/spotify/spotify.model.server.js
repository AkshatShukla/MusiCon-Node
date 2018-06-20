var mongoose = require('mongoose');
var spotifySchema = require('./spotify.schema.server');
var spotifyModel = mongoose.model('spotifyModel', spotifySchema);

function getToken() {
  // return spotifyModel.create({token:'abcdefgh',tokentime:new Date(),id:1});
  return spotifyModel.findOne({id:1});
}
function insert(token,time){
  return spotifyModel.updateOne({id:1},{token:token,tokentime:time});
}

var api = {
  getToken:getToken,
    insert:insert
};
module.exports = api;