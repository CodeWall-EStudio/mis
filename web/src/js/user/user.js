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

var sDom,sInput;

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
	},
	'search' : function(){

		if(!sDom){
			$('body').append('<div class="fix-dom"><div id="searchBlockDom"><input type="text" placeholder="请输入关键字" /><button data-action="startsearch" class="btn btn-primary">搜索</button></div></div>');
			sDom = $("#searchBlockDom");
			sInput = sDom.find('input');
			bindSdom();
		}

		sDom.show();

	}
}

var bindSdom = function(){
	sDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action){
			var key = sInput.val();
			if(key !== ''){
				striker.trigger('startSearch',key);
			}
		}
		sDom.hide();
	});

	sInput.bind('keyup',function(e){
		if(e.keyCode === 13){
			var key = sInput.val();
			if(key !== ''){
				striker.trigger('startSearch',key);
			}
		}
		sDom.hide();
	});
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