module.exports = AddressRangeTable;

function AddressRangeTable() {
	this.table = new Array();
}

AddressRangeTable.prototype.AddRecord = function(l, r, timeStamp, siteNumber) {
	if(typeof this.table[siteNumber] == 'undefined') {
		this.table[siteNumber] = new Array();
	}
	this.table[siteNumber].push({
		l : l,
		r : r,
		timeStamp : timeStamp
	});
}

// 对于给定的的操作返回对应的地址空间
AddressRangeTable.prototype.GetRecord = function(operation) {
	var siteNumber = operation.timeStamp.siteNumber;
	var timeStamp = operatoin.timeStamp.ts;
	for(var i=this.table[siteNumber].length - 1; i>=0; i--) {
		if(timeStamp > this.table[siteNumber][i].timeStamp) {
			return {
				l : l,
				r : r
			};
		}
	}
}