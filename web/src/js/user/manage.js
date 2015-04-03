//用户列表显示等等
var uManage = {},
	data = require('../data/data').user;
var cgi,
	tmpl,
	manageHave = false;
module.exports = uManage;

//var manageDom = $("#addManage"); //管理员设置dom;

//选择管理员等等的事件绑定
/*
var manageAction = {
	search : function(target){
		var key = target.val();
		if(key !== ''){
			manageAction.searchbtn(target);
		}
	},
	searchbtn : function(target){
		var key = $("#selectOneManage").val();
		var list = data.list;
		var ulist = [];

		if(key === ''){
			manageDom.find('li').show();
			return;
		}

		for(var i = 0,l = list.length;i<l;i++){
			var item = list[i];
			if(item.name.indexOf(key)>=0){
				ulist.push(item.id);
			}
		}
		manageDom.find('li').hide();
		if(ulist.length=== 0){
			return;
		}
		for(var i = 0,l = ulist.length;i<l;i++){
			$("#user"+ulist[i]).show();
		}
	},
	selectuser : function(target){
		var id = target.data('id'),
			name = target.data('name');

		if($("#manage"+id).length===0){
			var html = tmpl.onemanage({
				id : id,
				name : name
			});
			$("#nowManage").append(html);
		}
	}
};
*/

// function bindManageAction(){
// 	manageDom.bind('click',function(e){
// 		var target = $(e.target);
// 			action = target.data('action');

// 		if(action && manageAction[action]){
// 			manageAction[action](target);
// 		}
// 	});

// 	$("#selectOneManage").bind('keyup',function(e){
// 		var target = $(e.target);
// 			action = target.data('keyup');

// 		if(action && manageAction[action]){
// 			manageAction[action](target);
// 		}
// 	});
// }

// uManage.show = function(target){
// 	if(!manageHave){
// 		var html = tmpl.manage({
// 			list : data.list,
// 			my : data.myInfo
// 		});
// 		manageDom.html(html);
// 		bindManageAction();
// 	}
// }

// uManage.addDefManage = function(target){
// 	var html = tmpl.onemanage({
// 		id : data.myInfo.id,
// 		name : data.myInfo.name
// 	});
// 	$("#nowManage").html(html);	
// }

var manage = function(target){
	//给定区域dom的名字
	this.dom = $("#"+target);
	this.manageHave = false;
	//用户列表
	this.listDom = this.dom.find('.manage-list');
	this.selectDom = this.dom.find('.now-manage-list');
	//搜索框
	this.keyDom;

	//当前元素
	this._selectDom;

	//选中的管理员列表
	this.idmap = {};
	this.idmap[data.myInfo.id] = 1;

	//把自己放在管理员列表里面
	var html = tmpl.onemanage({
		id : data.myInfo.id,
		name : data.myInfo.name
	});
	this.selectDom.html(html);	


	this.bindAction();	

}

//初始化一下.
manage.prototype.init = function(){

}

//显示管理员列表
manage.prototype.showlist = function(){
	//如果还没有填列表.把列表填一下.
	if(!this.manageHave){
		var html = tmpl.manage({
			list : data.list,
			my : data.myInfo
		});
		this.listDom.html(html);
		this.keyDom = this.listDom.find('input[name=managekey]');
		this.keyupAction();
		//bindManageAction();
	}
	if(this._selectDom.hasClass('fui-plus')){
		this._selectDom.removeClass('fui-plus').addClass('fui-cross');
		this.listDom.show();
	}else{
		this._selectDom.addClass('fui-plus').removeClass('fui-cross');
		this.listDom.hide();
	}	
}

//增加管理员
manage.prototype.addDefManage = function(){
	
}

manage.prototype.getManageList = function(){
	var list = [];
	for(var i in this.idmap){
		list.push(i);
	}

	return list;
}

//清空列表
manage.prototype.clear = function(){
	this.idmap = {};
	this.idmap[data.myInfo.id] = 1;

	var html = tmpl.onemanage({
		id : data.myInfo.id,
		name : data.myInfo.name
	});
	this.selectDom.html(html);	

	var dom = this.dom.find('.show-btn');
	dom.addClass('fui-plus').removeClass('fui-cross');
	this.listDom.hide();	
}

//选中一个用户
manage.prototype.selectone = function(e){
	var target = this.target,
		id = target.data('id'),
		name = target.data('name');

	if(id && id !== data.myInfo.id){
		var html = tmpl.onemanage({
			id : id,
			name : name
		});
		this.idmap[id] = 1;
		this.selectDom.append(html);			
	}
	
}

//搜索按钮
manage.prototype.searchbtn = function(){
	var key = this.keyDom.val();
	var list = data.list;
	var ulist = [];

	if(key === ''){
		this.listDom.find('li').show();
		return;
	}

	for(var i = 0,l = list.length;i<l;i++){
		var item = list[i];
		if(item.name.indexOf(key)>=0){
			ulist.push(item.id);
		}
	}
	this.listDom.find('li').hide();
	if(ulist.length=== 0){
		return;
	}
	for(var i = 0,l = ulist.length;i<l;i++){
		this.listDom.find(".user"+ulist[i]).show();
	}
}

//删除一个选中的管理员
manage.prototype.remove = function(e){
	var target = this.target,
		p = target.parent('.tag'),
		id = p.data('id');
	if(id && id !== data.myInfo.id){
		delete this.idmap[id];
		p.remove();
	}
}

//事件绑定
manage.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target);
			action = target.data('action');
		_this._selectDom = target;

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});
}

//输入框的keyup绑定
manage.prototype.keyupAction = function(){
	var _this = this;
	this.keyDom.bind('keyup',function(e){
		var target = $(e.target);
			action = target.data('keyup');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});
}

uManage.manage = manage;
uManage.init = function(module,tmp){
	cgi = module;
	tmpl = tmp;

	//bindAction();
}