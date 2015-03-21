//用户列表显示等等
var uManage = {},
	data = require('../data/data').user;
var cgi,
	tmpl,
	manageHave = false;
module.exports = uManage;

var manageDom = $("#addManage"); //管理员设置dom;

//选择管理员等等的事件绑定
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
}

function bindManageAction(){
	manageDom.bind('click',function(e){
		var target = $(e.target);
			action = target.data('action');

		if(action && manageAction[action]){
			manageAction[action](target);
		}
	});

	$("#selectOneManage").bind('keyup',function(e){
		var target = $(e.target);
			action = target.data('keyup');

		if(action && manageAction[action]){
			manageAction[action](target);
		}
	});
}

uManage.show = function(target){
	if(!manageHave){
		var html = tmpl.manage({
			list : data.list,
			my : data.myInfo
		});
		manageDom.html(html);
		bindManageAction();
	}
}

uManage.addDefManage = function(target){
	var html = tmpl.onemanage({
		id : data.myInfo.id,
		name : data.myInfo.name
	});
	$("#nowManage").html(html);	
}

function bindAction(){

}


uManage.init = function(module,tmp){
	cgi = module;
	tmpl = tmp;

	bindAction();
}