var node = function() {
	this.operationList = [];
	this.isEffect = 0;
};

node.prototype.setWithInsert = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 1;
};

node.prototype.addDelete = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 0;
};

node.prototype.getEffect = function(Timestamp) {
	this.isEffect = Timestamp.isConcurrent(this.operationList[0].timestamp) ? false : true;
	for(var i=1; i<this.operationList.length; i++) {
		var operation = this.operationList[i];
		if(Timestamp.isConcurrent(operation.timestamp) == false) {
			this.isEffect = false;
			break;
		}
	}
};
