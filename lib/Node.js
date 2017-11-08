var Node = function() {
	this.operationList = [];
	this.isEffect = 0;
}

//设置插入操作，在节点被创建完之后
Node.prototype.SetWithInsert = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 1;
}

//增加删除操作
Node.prototype.AddDelete = function(operation) {
	this.operationList.push(operation);
	this.isEffect = 0;
}

//对于某一个时间戳，判断当前的节点是否有效
Node.prototype.GetEffect = function(timeStamp) {
	this.isEffect = this.operatoinList[0].timeStamp.IsConcurrent(timeStamp) ? true : false;
	for(var i=1; i<this.operationList.length; i++) {
		if(this.operationList[i].timeStamp.IsConcurrent(timeStamp) == false) {
			this.isEffect = false;
			break;
		}
	}
}