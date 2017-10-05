//客户端最后和服务器同步的时间
var lastUpdateTime = 0;

//构造函数
var TimeStampCen = function(siteNumber) {
	this.ts = LastUpdateTime;
	this.te = LastUpdateTime;
	this.siteNumber = siteNumber;
}

//true 并发 false 因果先序
TimeStampCen.prototype.IsConcurrent = function(timeStamp) {
	if(timeStamp.ts < this.te) return true;
	return false;
};

//求出Torder值
TimeStampCen.prototype.Torder = function() {
	return this.ts + this.te;
}

//比较两个时间戳Torder值大小
TimeStampCen.prototype.CompareTorder = function(timeStamp) {
	var t1 = this.Torder(), t2 = timeStamp.Torder();
	if(t1 == t2) return this.siteNumber < timeStamp.siteNumber ? true : false;
	return t1 < t2 ? true : false;
};

//Clone
TimeStampCen.prototype.Clone =function() {
	var ret = new TimeStampCen(this.siteNumber);
	ret.ts = this.ts;
	ret.te = this.te;
	return ret;
}