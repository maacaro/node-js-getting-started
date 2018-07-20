const express = require('express')
const path = require('path')
const server = express();
const game = require('./routes/game');
const config = require('config');

let morgan = require('morgan');
let bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect(config.DBHost,{ useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

if(config.util.getEnv('NODE_ENV') !== 'test') {
    server.use(morgan('combined'));
}


server.use(bodyParser.json());                                     
server.use(bodyParser.urlencoded({extended: true}));               
server.use(bodyParser.text());                                    
server.use(bodyParser.json({ type: 'application/json'}));

let options = { 
    server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }, 
    replset: { socketOptions: { keepAlive: 1, connectTimeoutMS : 30000 } } 
  }; 


server.route("/api/games")
    .get(game.getGames)
    .post(game.postGame)

module.exports = server;