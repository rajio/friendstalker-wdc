//require fs module and path module
fs = require('fs');
path = require('path');
//add getData to exported module functions
exports.getData = function(callback){
	fs.readFile(path.join(__dirname,'../model')
		,'data.json'),
	function(err,data){
		if (err) throw err;
		obj = JSON.parse(data);
		callback(obj);
	}
}