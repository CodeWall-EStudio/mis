var request = require('./request'),
	message = require('./msg');

var msg = new message.message();

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
		following : cgiPath+'subject/following', //关注列表
		delresource : cgiPath + 'subject/delresource' //删除一个资源
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
// /统一出来弹出消息
var checkCallback = function(cb,flag){
	return function(res){
		cb(res);
		if(res.code !== 0){
			msg.error(res.code);
		}else if(flag){
			msg.error(res.code);
		}
	}
}

db.login = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.login,param,callback);
}

db.logout = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.logout,callback);
}

db.user = {};
db.user.list = function(callback){
	var callback = checkCallback(callback);
	request.get(cgiList.user.list,null,callback);
}

db.user.info = function(callback){
	var callback = checkCallback(callback);
	request.get(cgiList.user.info,null,callback);	
}

//直接拉所有用户?
db.user.create = function(param,callback){
	var callback = checkCallback(callback,true);
	request.get(cgiList.user.create,param,callback);
}

db.subject = {};

db.subject.search = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.search,param,callback);
}

db.subject.info = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.info,param,callback);
}

db.subject.create = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.subject.create,param,callback);
}

db.subject.follow = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.subject.follow,param,callback);	
}

db.subject.following = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.following,param,callback);	
}

db.subject.delresource = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.subject.delresource,param,callback);	
}

db.article = {};

db.article.search = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.article.search,param,callback);
}

db.article.info = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.article.info,param,callback);
}

db.article.create = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.create,param,callback);
}

db.label = {};

db.label.create = function(param,callback) {
	var callback = checkCallback(callback,true);
	request.post(cgiList.label.create, param, callback);	
}

db.label.list = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.label.list,param,callback);	
}

module.exports = db;