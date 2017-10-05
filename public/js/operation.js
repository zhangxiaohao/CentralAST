var operation = function(type, position, character, timestamp) {
	this.type = type;
	this.position = position;
	this.character = character;
	this.timestamp = timestamp.clone();
};

operation.prototype.isConcurrent = function(operation) {
	return this.timestamp.isConcurrent(operation.timestamp);
};

operation.prototype.compareTorder = function(operation) {
	return this.timestamp.compareTorder(operation.timestamp);
};

operation.prototype.clone = function() {
	var ret = new operation(this.type, this.character, this.timestamp.clone);
	return ret;
};
