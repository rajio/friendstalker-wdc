//require fs module and path module
var fs = require('fs');
var path = require('path');
//add getData to exported module functions
exports.getData = function(callback){
	fs.readFile(path.join(path.join(__dirname,'../model')
		,'friends.json'),
	function(err,data){
		if (err) throw err;
		obj = JSON.parse(data);
		callback(obj);
	});
};