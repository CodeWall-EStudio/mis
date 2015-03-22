var cgi = require('../common/cgi').user,
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
User.addmanage = userManage.show;

User.addDefManage = userManage.addDefManage;

User.getMyInfo = function(cb){
	cgi.info(function(res){
		if(res.code === 0){
			data.myInfo = res.data;
			var html = tmpl.nav(res.data);
			$("#userNav").html(html);

			striker.triggerHandler('userLoadSub',res.code);
			striker.triggerHandler('userLoadArt',res.code);
			console.log('userload');
		}
	});
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