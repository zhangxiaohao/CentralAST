//构造函数
var OperationCen = function(type, position, character, timeStamp) {
	this.type = type;
	this.position = position;
	this.character = character;
	this.timeStamp = timeStamp.clone();
};

//判断两个操作是否并发
OperationCen.prototype.IsConcurrent = function(operation) {
	return this.timeStamp.isConcurrent(operation.timeStamp);
};

//比较两个操作torder值大小
OperationCen.prototype.CompareTorder = function(operation) {
	return this.timeStamp.CompareTorder(operation.timeStamp);
};

//Clone
OperationCen.prototype.Clone = function() {
	var ret = new OperationCen(this.type, this.character, this.timeStamp);
	return ret;
};