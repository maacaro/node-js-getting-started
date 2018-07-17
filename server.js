const express = require('express')
const path = require('path')

let server = express();

server.use(express.static(path.join(__dirname, 'public')));
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'ejs');
server.get('/', (req, res) => res.render('pages/index'));

module.exports = server;