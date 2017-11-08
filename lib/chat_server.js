var socketio = require('socket.io');
var io;
//服务器默认站点号为0
var Ast = new Ast(0);
//站点号分配计数器
var totalSiteNumber = 0;

// 0号分配给服务器
function assignGuestName(socket) {
	totalSiteNumber ++;
	socket.emit('nameResult', {
		guestNumber:totalSiteNumber
	});
}

function handleMessageBroadcasting(socket) {
	console.log('message broadcast sys is open!');
	socket.on('message', function(message) {
		console.log(message);
		socket.broadcast.emit('message', message);
	});
}

function getDocumentLength(socket) {
	socket.on('getDocLenght', function(message) {
		console.log('getDocLength');
		var ret = {
			length : Ast.GetDocumentLenght();
		};
		socket.broadcast.emit('getDocLength', ret);
	});
}

function getPartialDocument(socket) {
	socket.on('getDoc', function(message) {
		console.log('getDoc');
		var obj = JSON.parse(message);
		var ret = Ast.GetDocumentByRange(obj.l, obj.r);
		socket.broadcast.emit('getDoc', ret);
	});
}

/*
初始化三步：
分配客户端编号
获取当前全副本长度
获取对应范围的部分副本
*/
function init() {
	assignGuestName(socket);
	getDocLength(socket);
	getPartialDocument(socket);
}

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);
	io.sockets.on('connection', function(socket) {
		init();
	});
}

