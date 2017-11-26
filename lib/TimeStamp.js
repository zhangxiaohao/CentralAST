module.exports = TimeStamp;

function TimeStamp(siteNumber, ts, te) {
	this.ts = ts;
	this.te = te;
	this.siteNumber = siteNumber;
}

//判断是否并发
TimeStamp.prototype.IsConcurrent =  function(timeStamp) {
	return this.te < timeStamp.ts ? false : true;
}

//判断全序关系
TimeStamp.prototype.CompareTorder = function(timeStamp) {
	if(this.te + this.ts == timeStamp.ts + timeStamp.te) {
		return this.siteNumber < timeStamp.siteNumber;
	}else {
		return this.ts + this.te < timeStamp.ts + timeStamp.te;
	}
}

//深拷贝构造函数
TimeStamp.prototype.Clone = function() {
	ret = new TimeStamp(this.siteNumber, this.ts, this.te);
	return ret;
}