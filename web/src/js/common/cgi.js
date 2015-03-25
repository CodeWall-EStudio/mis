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
		create : cgiPath+'subject/create',
		follow : cgiPath+'subject/follow', //关注
		following : cgiPath+'subject/following' //关注列表
	},
	article : {
		search : cgiPath+'article/search',
		info : cgiPath+'article/info',
		create : cgiPath+'article/create'
	},
	label : {
		create : cgiPath+'label/create',
		list : cgiPath+'label/list'
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

db.logout = function(param,callback){
	request.get(cgiList.logout,callback);
}

db.user = {};
db.user.list = function(callback){
	request.get(cgiList.user.list,null,callback);
}

db.user.info = function(callback){
	request.get(cgiList.user.info,null,callback);	
}

//直接拉所有用户?
db.user.create = function(param,callback){
	request.get(cgiList.user.create,param,callback);
}

db.subject = {};

db.subject.search = function(param,callback){
	request.get(cgiList.subject.search,param,callback);
}

db.subject.info = function(param,callback){
	request.get(cgiList.subject.info,param,callback);
}

db.subject.create = function(param,callback){
	request.post(cgiList.subject.create,param,callback);
}

db.subject.follow = function(param,callback){
	request.post(cgiList.subject.follow,param,callback);	
}

db.subject.following = function(param,callback){
	request.get(cgiList.subject.following,param,callback);	
}

db.article = {};

db.article.search = function(param,callback){
	request.get(cgiList.article.search,param,callback);
}

db.article.info = function(param,callback){
	request.get(cgiList.article.info,param,callback);
}

db.article.create = function(param,callback){
	request.post(cgiList.article.create,param,callback);
}

module.exports = db;