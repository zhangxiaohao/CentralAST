var userNumber;
var userName;
var Ast;
var socket = io.connect();
var oldText = "";
var Queue = [];

function getVal() {
	$('textarea').val(Ast.str);
	oldText = Ast.str;
}

function localOperation(op) {
	var Operation = new operation(op.type, op.pos, op.ch, Ast.timestamp);
	Operation.timestamp.ts[(Operation.timestamp.siteNumber)] ++;
	$('textarea').attr('disabled', true);
	Ast.execute(Operation);
	$('textarea').attr('disabled', false);
	socket.emit('message', Operation);
}

function getOperation() {
	var newText = $("textarea").val();
	if(newText == oldText) return ;
	var delList = [], insList = [];
	var dp = [], prex = [], prey = [];
	for(var i=0; i<=oldText.length; i++) {
		dp[i] = [];
		prex[i] = [];
		prey[i] = [];
		for(var j=0; j<=newText.length; j++) {
			dp[i][j] = 0;
			prex[i][j] = 0;
			prey[i][j] = 0;
		}
	}
	for(var i=1; i<=oldText.length; i++) {
		for(var j=1; j<=newText.length; j++) {
			if(oldText[i - 1] == newText[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1] + 1;
				prex[i][j] = i - 1;
				prey[i][j] = j - 1;
			} else {
				if(dp[i][j - 1] > dp[i - 1][j]) {
					dp[i][j] = dp[i][j - 1];
					prex[i][j] = i;
					prey[i][j] = j - 1;
				} else {
					dp[i][j] = dp[i - 1][j];
					prex[i][j] = i - 1;
					prey[i][j] = j;
				}
			}
		}
	}
	var x = oldText.length;
	var y = newText.length;
	var tx, ty, len = 0;
	while(x + y > 0) {
		if(prex[x][y] < x && prey[x][y] == y) {
			for(var i=x; i>prex[x][y]; i--) {
				var operation = {type:'del', pos:i};
				delList.push(operation);
			}
		}
		if(prex[x][y] == x && prey[x][y] < y) {
			for(var i=prey[x][y] + 1; i<=y; i++) {
				var operation = {type:'ins', pos:i - 1, ch:newText[i - 1]};
				insList.push(operation);
			}
		}
		tx = prex[x][y];
		ty = prey[x][y];
		x = tx; y = ty;
	}
	delList.sort(function(a, b) {return b.pos - a.pos;});
	insList.sort(function(a, b) {return a.pos - b.pos;});
	for(var i=0; i<delList.length; i++) {
		localOperation(delList[i]);
	}
	for(var i=0; i<insList.length; i++) {
		localOperation(insList[i]);
	}
	oldText = newText;
	console.log(delList);
	console.log(insList);
	console.log(oldText + " " + newText);
}

function executeRemoteOperation() {
	var num = Queue.length;
	while(num --) {
		var op = Queue.pop();
		if(Ast.causalReady(op) == false) Queue.unshift(op);
		else {
			var s = $('textarea').get(0).selectionStart;
			var e = $('textarea').get(0).selectionEnd;
			$('textarea').attr('disabled', true);
			Ast.execute(op);
			getVal();
			if(op.type == 'del' && op.position <= s) s--;
			if(op.type == 'del' && op.position <= e) e--;
			if(op.type == 'ins' && op.position <= s) s++;
			if(op.type == 'ins' && op.position <= e) e++;
			$('textarea').attr('disabled', false).focus();
			$('textarea').get(0).selectionStart = s;
			$('textarea').get(0).selectionEnd = e;
			console.log(s + " " + e);
		}
	}
}

$(document).ready(function() {
	$('textarea').attr('disabled', true);

	socket.on('nameResult', function(result) {
		userNumber = result.guestNumber;
		Ast = new ast(userNumber);
		console.log(userNumber);
		socket.emit('getOperationList');
	});

	socket.on('addUser', function(result) {
		console.log(result.userName);
	});

	socket.on('message', function(Operation) {
		var ts = new timestamp(parseInt(Operation.timestamp.siteNumber));
		ts.ts = Operation.timestamp.ts;
		var op = new operation(Operation.type, Operation.position, Operation.character, ts);
		console.log(op);
		Queue.unshift(op);
	});

	setTimeout(function() {
		$('textarea').attr('disabled', false);
	}, 2000);
	setInterval(getOperation, 10);
	setInterval(executeRemoteOperation, 10);
});
