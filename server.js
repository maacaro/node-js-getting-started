const express = require('express')
const path = require('path')
const server = express();

let MongoClient = require('mongodb').MongoClient;
let morgan = require('morgan');
let bodyParser = require('body-parser');
let config = require('config');

MongoClient.connect(config.DBHost,{ useNewUrlParser: true },function(err, client) {
    if (err) {
        throw err;
    }
    const collection = client.db("seJuegaFutbol").collection("games");
    client.close();
 });

if(config.util.getEnv('NODE_ENV') !== 'test') {
    server.use(morgan('combined'));
}

server.use(bodyParser.json());                                     
server.use(bodyParser.urlencoded({extended: true}));               
server.use(bodyParser.text());                                    
server.use(bodyParser.json({ type: 'application/json'}));

server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.get('/', (req, res) => res.render('pages/index'));

module.exports = server;