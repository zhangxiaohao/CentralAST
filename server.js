var express = require('express');
<<<<<<< Updated upstream
var app = express();
var http = require('http').Server(app);

app.use(express.static('public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/public/index.html');
});

http.listen(8888, function(){
 	console.log('server listen on port 8888.');
});

var chatServer = require('./lib/chat_server');
chatServer.listen(http);
=======
var app = new express();
var socketio = require('socket.io');

app.get('/', function(req, res) {
	res.redirect('/index.html');
});

app.use(express.static('public'));

var server = app.listen(8000, function() {
	console.log('server listen on port 8000.');
});

var chatServer = require('./lib/chat_server');
chatServer.listen(server);
>>>>>>> Stashed changes
