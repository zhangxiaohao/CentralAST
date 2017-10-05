var NodeCen = function() {
	this.operationList = [];
	this.isEffect = 0;
};

NodeCen.prototype.SetWithInsert = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 1;
};

NodeCen.prototype.AddDelete = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 0;
};

NodeCen.prototype.GetEffect = function(timeStamp) {
	this.isEffect = timeStamp.isConcurrent(this.operationList[0]);
	for(var i=1; i<this.operationList.length; i++) {
		var operation = this.operationList[i];
		if(timeStamp.isConcurrent(operation.timeStamp) == false) {
			this.isEffect = false;
			break;
		}
	}
}