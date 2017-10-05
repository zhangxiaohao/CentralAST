var ast = function(siteNumber) {
	this.doc = [];
	this.doc.push(new node(siteNumber));
	this.timestamp = new timestamp(siteNumber);
	this.str = "";
};

ast.prototype.setDocument = function(doc) {
	this.doc = doc;
};

ast.prototype.retrace = function(timestamp) {
	for(var i=1; i<this.doc.length; i++) {
		var Node = this.doc[i];
		Node.getEffect(timestamp);
	}
};

ast.prototype.rangescan = function(pos, operation) {
	var Node = new node();
	Node.setWithInsert(operation);
	for(var i=pos; i<this.doc.length; i++) {
		if(operation.compareTorder(this.doc[i].operationList[0]) == false) {
			this.doc.splice(i, 0, Node);
			return ;
		}
		pos ++;
	}
	this.doc.splice(pos, 0, Node);
};

ast.prototype.getStr = function() {
	var ret = "";
	for(var i=1; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) ret += this.doc[i].operationList[0].character;
	}
	return ret;
};

ast.prototype.execute = function(operation) {
	this.retrace(operation.timestamp);
	var cnt = 0, p = 0;
	for(var i=0; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) cnt ++;
		if(cnt == operation.position) {
			p = i; break;
		}
	}
	if(operation.type == 'ins') {
		this.rangescan(p + 1, operation);
	}else if(operation.type == 'del') {
		this.doc[p].addDelete(operation);
	}
	this.timestamp.ts[parseInt(operation.timestamp.siteNumber)] ++;
	this.retrace(this.timestamp);
	this.str = this.getStr();
};

ast.prototype.causalReady = function(operation) {
	for(var i=0; i<operation.timestamp.ts.length; i++) {
		var x = operation.timestamp.ts[i];
		var y = this.timestamp.ts[i];
		if(i == operation.timestamp.siteNumber) {
			if(y != x - 1) return false;
		}else {
			if(x > y) return false;
		}
	}
	return true;
}


