var msg = {
	0 : '操作成功!',
	10: '排序序号必须填写',
	11 : '组织名称必须填写',
	20 : '新密码和重复密码必须一致',
	21 : '请填写用户名和密码!',
	22 : '用户不存在',
	30 : '组织最多支持3级!', 
	40 : '该目录下还有其他文件，无法删除!',
	50 : '你要上传的文件已经超过你的剩余空间!',
	60 : '你还没有选择要共享的目录',
	75 : '序号只能在1~99之间',
	76 : '名称不能少于2个字',
	77 : '参数不能为空',
	78 : '对不起，网络超时了，请稍后再试',
	79 : '已经有同名的项目了',
	100 : '对不起，您没有这个操作权限!',//后台出错啦!
	101 : '出错啦',
	1001 : '您还没有登录!',
	1004 : '没有找到资源!',
	1010 : '您没有查看该资源的权限!',
	1011 : '参数出错啦!',
	1013 : '出错啦',
	1014 : '已经关注该主题',
	1015 : '已经归档啦!',
	1016 : '该资源不能删除',
	1017 : '该目录下还有其他文件，无法删除!',
	1041 : '用户名或密码错误!',
	1043 : '用户不存在!',
	1050 : '时间交叉了!'
}

Messenger().options = {
    extraClasses: 'messenger-fixed messenger-on-bottom',
    theme: 'flat'
}

var db = {};

function message(){
	this;
}

message.prototype.confirm = function(msg,label,cb){
	if(typeof label === 'undefined' || label === null){
		label = {
			sub : '确定',
			cancel : '取消'
		}
	}
	if(typeof cb === 'undefined'){
		cb = function(){};
	}
	if(typeof msg === 'undefined'){
		return;
	}

	var obj = {
		message : msg,
		actions : {
			sub : {
				label : label.sub || '确定',
				action : function(){
					cb();
					msg.hide();
				}
			},
			cancel : {
				label : label.cancel || '取消',
				action : function(){
					msg.hide();
				}
			}
		}
	}
	var msg = Messenger().post(obj);
}

message.prototype.error = function(d){
	// if(d == 1001){
	// 	window.location = config.cgi.gotologin;
	// 	return;
	// }

	var obj = {
		'message' : msg[d] || '出错拉!'
	}
	if(parseInt(d)){
		obj.type = 'error'
	}

	Messenger().post(obj);
}

message.prototype.msg = function(msg){
	var obj = {
		'message' : msg || ''
	}
	if(parseInt(msg)){
		obj.type = 'error'
	}

	Messenger().post(obj);		
}

db.message = message;

module.exports = db;