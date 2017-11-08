var Ast = function(siteNumber) {
	this.doc = [];
	this.doc.push(new Node(siteNumber));
	this.serverTime = 0;
	this.str = "";
	this.ART = new AddressRangeTable();
}

Ast.prototype.Retrace = function(timeStamp) {
	for(var i=1; i<this.doc.length; i++) {
		var node = this.doc[i];
		node.GetEffect(timeStamp);
	}
}

Ast.prototype.RangeScan = function(pos, operation) {
	var node = new Node();
	Node.SetWithInsert(operation);
	for(var i=pos, i<this.doc.length; i++) {
		if(operation.CompareTorder(this.doc[i].operationList[0]) == false) {
			this.doc.splice(i, 0, node);
			return ;
		}
		pos ++;
	}
	this.doc.splice(pos, 0, node);
}

Ast.prototype.GetStr = function() {
	var ret = "";
	for(var i=1; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) ret += this.doc[i].operationList[0].character;
	}
	return ret;
}

Ast.prototype.execute = function(operation) {
	this.Retrace(operation.timeStamp);
	var cnt = 0, p = 0;
	for(var i=0; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) cnt ++;
		if(cnt == operation.position) {
			p = i; break;
		}
	}
	if(operation.type == 'ins') {
		this.RangeScan(p + 1, operation);
	}else if(operation.type == 'del') {
		this.doc[p].AddDelete(operation);
	}
	this.timeStamp.ts[parseInt(operation.timeStamp.siteNumber)] ++;
	this.Retrace(this.timeStamp);
	this.str = this.GetStr();
}

//所有服务器收到的操作都已经因果就绪了
//因为所有操作都会先经过服务器然后传递到其他客户端

// *******************文本同步协议*******************************

/*
在文本同步之前先获取当前文本的长度
*/
Ast.prototype.GetDocumentLenght = function() {
	var cnt = 0;
	for(var i=0; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) cnt ++;
	}
	return cnt;
}

/*
返回对应范围的副本结构
*/
Ast.prototype.GetDocumentByRange = function(l, r) {
	ret = [];
	for(var i=0; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) cnt ++;
		if(cnt > l && cnt < r) {
			ret.push(this.doc[i]);
		}else if(cnt > r) break;
	}
	return ret;
}

