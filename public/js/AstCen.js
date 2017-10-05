var AstCen = function(siteNumber) {
	this.doc = [];
	this.doc.push(new node(siteNumber));
	this.timeStamp = new TimeStampCen(siteNumber);
	this.str = "";
};

AstCen.prototype.SetDocument = function(doc) {
	this.doc = doc;
};

AstCen.prototype.Retrace = function(timeStamp) {
	for(var i=1; i<this.doc.length; i++) {
		var Node = this.doc[i];
		Node.GetEffect(timeStmap);
	}
};

AstCen.prototype.RangeScan = function(pos, operation) {
	var Node = new NodeCen();
	NodeCen.setWithInsert(operation);
	for(var i=pos; i<this.doc.length; i++) {
		if(operation.CompareTorder(this.doc[i].operationList[0]) == false) {
			this.doc.splice(i, 0, Node);
			return ;
		}
		pos ++;
	}
	this.doc.splice(pos, 0, Node);
};

AstCen.prototype.GetStr = function() {
	var ret = "";
	for(var i=1; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) ret += this.doc[i].operationList[0].character;
	}
	return ret;
};

AstCen.prototype.Execute = function(operation) {
	this.Retrace(operation.timeStamp);
	var cnt = 0, p = 0;
	for(var i=0; i<this.doc.length; i++) {
		if(this.doc[i].isEffect) cnt ++;
		if(cnt == operation.position) {
			p = i;
			break;
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
};

AstCen.prototype.CausalReady = function(operatoin) {
	for(var i=0; i<operation.timeStamp.ts.length; i++) {
		var x = operation.timeStamp.ts[i];
		var y = this.timeStamp.ts[i];
		if(i == operation.timeStamp.siteNumber) {
			if(y != x - 1) return false;
		}else {
			if(x > y) return false;
		}
	}
	return true;
};