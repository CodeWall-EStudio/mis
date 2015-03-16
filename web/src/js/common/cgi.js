var request = require('./request');

var cgiPath = '/cgi/';
var cgiList = {
	user : {
		list : cgiPath+'user/list',
		info : cgiPath+'user/info',
		create : cgiPath+'user/create'
	},
	subject : {
		search : cgiPath+'subject/search',
		info : cgiPath+'subject/info',
		create : cgiPath+'subject/create'
	},
	article : {
		search : cgiPath+'article/search',
		info : cgiPath+'article/info',
		create : cgiPath+'article/create'
	},
	login : cgiPath+'account/login',
	logout : cgiPath+'account/logout'
}

var db = {};
var emptyFun = function(res){

}

db.login = function(param,callback){
	request.post(cgiList.login,param,callback);
}

module.exports = db;