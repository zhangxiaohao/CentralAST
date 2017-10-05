var socketio = require('socket.io');
var io;
var guestNumber = new Set();
var idList = [];
var operationList = [];
const SITENUMBER = 100;

function assignGuestName(socket) {
	var gn = -1;
	for(var i=0; i<10; i++) if(guestNumber[i] == 0) {
		gn = i;
		guestNumber[i] = 1;
		break;
	}
	idList[socket.id] = gn;
	socket.emit('nameResult', {
		guestNumber:gn
	});
};

function handleMessageBroadcasting(socket) {
	console.log('hi');
	socket.on('message', function(message) {
		console.log(message);
		socket.broadcast.emit('message', message);
		operationList.push(message);
	});
}

function handleClientDisconnection(socket) {
	socket.on('disconnect', function() {
		var number = idList[socket.id];
		guestNumber[number] = 0;
		delete idList[socket.id];
	});
}

function getOperationList(socket) {
	socket.on('getOperationList', function() {
		for(var i=0; i<operationList.length; i++) {
			console.log(operationList[i]);
			socket.emit('message', operationList[i]);
		}
	});
}

function init() {
	for(var i=0; i<SITENUMBER; i++) {
		guestNumber.add(i);
	}
}

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function(socket) {
		assignGuestName(socket);
		getOperationList(socket);
		handleMessageBroadcasting(socket);
		handleClientDisconnection(socket);
	});
};

