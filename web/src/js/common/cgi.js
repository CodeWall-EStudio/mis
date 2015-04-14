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
		edit : cgiPath+'subject/edit', //修改主题
		create : cgiPath+'subject/create',
		'delete' : cgiPath+'subject/delete',
		follow : cgiPath+'subject/follow', //关注
		following : cgiPath+'subject/following', //关注列表
		invited : cgiPath+'subject/invited', //邀请列表
		archived : cgiPath+'subject/archived', //关注列表
		archive : cgiPath+'subject/archive', //关注列表
		delresource : cgiPath + 'subject/delresource' //删除一个资源
	},
	article : {
		search : cgiPath+'article/search',
		info : cgiPath+'article/info',
		staring : cgiPath+'article/staring', //赞的帖子
		collected : cgiPath+'article/collected', //搜藏的帖子
		edit : cgiPath+'article/edit',
		star : cgiPath+'article/star', //赞
		collect : cgiPath+'article/collect', //收藏
		'delete' : cgiPath+'article/delete', //收藏
		'settop' : cgiPath+'article/setTop', //收藏
		create : cgiPath+'article/create'
	},
	comment : {
		search : cgiPath+'comment/search',
		staring : cgiPath+'comment/staring',
		collected : cgiPath+'comment/collected',
		star : cgiPath+'comment/star',
		'delete' : cgiPath+'comment/delete',
		edit : cgiPath+'comment/edit',
		collect : cgiPath+'comment/collect',
		create : cgiPath+'comment/create'
	},
	notify : {
		search : cgiPath+'notification/search',
		read : cgiPath+'notification/read',
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

db.logout = function(callback){

	var callback = checkCallback(callback);
	request.post(cgiList.logout,{},callback);
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

db.subject.edit = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.subject.edit,param,callback);
}

db.subject['delete'] = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.subject['delete'],param,callback);
}

db.subject.archive = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.subject.archive,param,callback);
}

db.subject.follow = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.subject.follow,param,callback);	
}

db.subject.following = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.following,param,callback);	
}

db.subject.invited = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.invited,param,callback);	
}

db.subject.archived = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.subject.archived,param,callback);	
}

db.subject.archive = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.subject.archive,param,callback);	
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

db.article.staring = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.article.staring,param,callback);
}

db.article.collected = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.article.collected,param,callback);
}

db.article.info = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.article.info,param,callback);
}

db.article.create = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.create,param,callback);
}
db.article.edit = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.edit,param,callback);
}

db.article['delete'] = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article['delete'],param,callback);
}

db.article.star = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.star,param,callback);
}

db.article.collect = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.collect,param,callback);
}

db.article.settop = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.article.settop,param,callback);
}

db.comment = {};

db.comment.search = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.comment.search,param,callback);
}
db.comment.staring = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.comment.staring,param,callback);
}
db.comment.collected = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.comment.collected,param,callback);
}

db.comment['delete'] = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.comment['delete'],param,callback);
}

db.comment.star = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.comment.star,param,callback);
}

db.comment.collect = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.comment.collect,param,callback);
}

db.comment.create = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.comment.create,param,callback);
}

db.comment.edit = function(param,callback){
	var callback = checkCallback(callback,true);
	request.post(cgiList.comment.edit,param,callback);
}

db.notify = {};

db.notify.search = function(param,callback){
	var callback = checkCallback(callback);
	request.get(cgiList.notify.search,param,callback);		
}

db.notify.read = function(param,callback){
	var callback = checkCallback(callback);
	request.post(cgiList.notify.read,param,callback);		
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