var Operation = function(type, position, character, timeStamp) {
	this.type = type;
	this.position = position;
	this.character = character;
	this.timeStamp = timeStamp.Clone();
}

// 操作之间是否并发
Operation.prototype.IsConcurrent = function(operation) {
	return this.timeStamp.IsConcurrent(operation.timeStamp);
}

//比较全序关系
Operation.prototype.CompareTorder = function(operation) {
	return this.timeStamp.CompareTorder(operation.timeStamp);
}

// 深复制函数
Operation.prototype.Clone() {
	var ret = new Operation(this.type, this.position, this.character, this.timeStamp);
	return ret;
}
