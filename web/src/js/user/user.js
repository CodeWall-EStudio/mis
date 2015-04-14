var cgi = require('../common/cgi').user,
	logout = require('../common/cgi').logout,
	data = require('../data/data').user,
	userManage = require('./manage'),
	striker = $(window.striker);

var tmpl = {
	nav : require('../../tpl/user/user_nav.ejs'),
	manage : require('../../tpl/user/manage.ejs'),
	onemanage : require('../../tpl/user/onemanage.ejs')
}

var User = {},
	_this = User;
module.exports = User;

//对外提供的接口
window.striker.user = User;

//管理员设置显示等等
User.manage = userManage.manage;
// User.addmanage = userManage.show;

// User.addDefManage = userManage.addDefManage;

User.getMyInfo = function(cb){
	cgi.info(function(res){
		if(res.code === 0){
			data.myInfo = res.data;
			var html = tmpl.nav(res.data);
			$("#userNav").html(html);

			striker.triggerHandler('userLoadSub',res.code);
			striker.triggerHandler('userLoadArt',res.code);
			console.log('userload');
			bindAction();
		}
	});
}

var myAct = {
	'logout' : function(){
		logout(function(res){
			if(res.code === 0){
				window.location.href = '/login.html';
			}
		});
	}
}

var bindAction = function(){
	$("#userNav").bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action){
			if(myAct[action]){
				myAct[action]();
			}
		}
	})
}

User.getUserList = function(){
	cgi.list(function(res){
		if(res.code === 0){
			data.list = res.data;
		}
	});
}

User.init = function(){
	_this.getMyInfo();
	_this.getUserList();
	userManage.init(cgi,tmpl);
}