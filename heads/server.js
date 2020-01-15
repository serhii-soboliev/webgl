let express = require('express');
const server = express();

server.use(express.static(__dirname + '/www'));

server.listen('16000');
console.log('working on 16000');