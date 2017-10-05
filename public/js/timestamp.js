var USERNUM = 10;

var timestamp = function(siteNumber) {
	this.ts = new Array(USERNUM);
	for(var i=0; i<USERNUM; i++) this.ts[i] = 0;
	this.siteNumber = siteNumber;
};

timestamp.prototype.isConcurrent = function(Timestamp) {
	for(var i=0; i<USERNUM; i++) {
		if(this.ts[i] < Timestamp.ts[i]) return true;
	}
	return false;
};

timestamp.prototype.Torder = function() {
	var sum = 0;
	for(var i=0; i<USERNUM; i++) sum += this.ts[i];
	return sum;
};

timestamp.prototype.compareTorder = function(Timestamp) {
	var t1 = this.Torder(), t2 = Timestamp.Torder();
	if(t1 == t2) return this.siteNumber < Timestamp.siteNumber ? true : false;
	return t1 < t2 ? true : false;
};

timestamp.prototype.clone = function() {
	var ret = new timestamp(this.siteNumber);
	for(var i=0; i<USERNUM; i++) ret.ts[i] = this.ts[i];
	return ret;
};
