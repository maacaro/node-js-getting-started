let mongoose = require('mongoose');
let Game = require('../models/game');

function getGames(req, res) {
    let query = Game.find({});
    query.exec((err, games) => {
        if(err){ res.send(err); }
        res.json(games);
    });
}

function postGame(req, res) {
    var newGame = new Game(req.body);
    newGame.save((err,game) => {
        if(err) {
            res.send(err);
        }
        else { 
            res.json({message: "Game successfully added!"});
        }
    });
}

module.exports = { getGames , postGame };