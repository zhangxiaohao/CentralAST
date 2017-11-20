var express = require('express');
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