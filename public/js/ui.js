var userNumber;
var userName;
var socket = io.connect();
var oldText = "";

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
		//localOperation(delList[i]);
	}
	for(var i=0; i<insList.length; i++) {
		//localOperation(insList[i]);
	}
	console.log(delList);
	console.log(insList);
	console.log(oldText + " " + newText);
	oldText = newText;
}

$(document).ready(function() {
	$('textarea').css('height', screen.height - 200);
	setInterval(getOperation, 10);
});
