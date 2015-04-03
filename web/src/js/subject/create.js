//主题创建,删除等操作
var data;
var sCreate = {};
var cgi,
	tmpl;
module.exports = sCreate;

// var createDom = $("#createSubject"),
// 	nowManageDom = $("#nowManage");


/*
function bindAction(){
	createDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action'),
			role = target.data('role'),
			type = target.data('type');

		if(action){
			var amap = action.split('-');

			if(amap.length === 2 && window.striker[amap[0]][amap[1]]){
				window.striker[amap[0]][amap[1]](target);
			}
			return;
		}
		if(role){
			target.parents('.tag').remove();
			return;
		}
		if(type === 'submit'){
			var tit = $("#subjectTitle").val(),
				mark = $("#subjectMark").val(),
				open = $("#subjectOpen").prop('checked')?1:0,
				guest = $("#subjectGuest").prop('checked')?1:0;

			var mlist = [];
			$("#nowManage .tag").each(function(e){
				var target = $(e.target),
					id = target.data('id');
				if(id){
					mlist.push(id);
				}
			});

			var llist = [];
			$("#nowSubLabel .tag").each(function(e){
				var target = $(e.target),
					id = target.data('id');
				if(id){
					llist.push(id);
				}				
			})

			var param = {
				title : tit,
				mark : mark,
				private : open,
				guest : guest,
				members : mlist,
				subjectLabels : llist,
				articleLabels : [],
				resources : []
			}

			if(param.title !== '' && param.mark !== ''){
				cgi.create(param,function(res){
					if(res.code === 0){
						createDom.modal('hide');
						
						var html = tmpl.list({
							list : [res.data]
						});
						$("#mySubject").prepend(html);
					}
				});
			}
		}
	});
}
*/

sCreate.init = function(type,module,tmp){
	cgi = module;
	tmpl = tmp;

	// createDom.on('show.bs.modal', function (e) {
	// 	striker.user.addDefManage();
	// });

	//nowManageDom;

	//bindAction();
}

sCreate.create = function(){
	var _this = this;
	//默认使用我的主题
	this.type = 'mySubject';

	//这里考虑下要不要传参指定dom;
	this.dom = $("#createSubject");

	//固定的id
	this.resDom = $("#nowRes");

	//把用户列表哪儿创建一下.
	//console.log(striker.user);	
	var manage = new striker.user.manage('manageArea');
	this.manage = manage;
	this.label = window.striker.label;

	this.dom.on('show.bs.modal', function (e) {
		//striker.user.addDefManage();
		manage.init();
	});

	this.dom.on('hide.bs.modal', function (e) {
		//striker.user.addDefManage();
		_this.resDom.html('').hide();
		_this.manage.clear();
		_this.label.clear();
	})	

//资源列表
	this.resList = [],
	this.resMap = {};

	//当前被选中的元素
	this._selectDom;

	this.bindAction();
}

sCreate.create.prototype.changeType = function(type){
	this.type = 'type'
}

sCreate.create.prototype.removeRes = function(e){
	var target = $(e.target),
		p = target.parent();

	var id = p.data('id');
	if(id){
		delete this.resMap[id];
		p.remove();
		if(this.resDom.find('.tag').length === 0){
			this.resDom.hide();
		}		
	}
}

//取选择的资源
sCreate.create.prototype.getResList = function(){
	var list = [];
	for(var i in this.resMap){
		list.push(this.resMap[i].id);
	}
	return list;
}

//取选中的标签
sCreate.create.prototype.getLabelList = function(){
	return this.label.getLabelList();
}

//取选中的管理远
sCreate.create.prototype.getManageList = function(){
	return this.manage.getManageList();
}



sCreate.create.prototype.bindAction = function(param,cb){
	var _this = this;
	//资源上传完成的通知
	window.uploadComp = function(d){
		if(d.code === 0){
			_this.resList.push(d.data.id);
			_this.resMap[d.data.id] = d.data;

			var html = tmpl.rlist({
				list : [d.data]
			});
			_this.resDom.append(html).show();
		}
	}

	//触发上传
	$("#cfileName").bind('change',function(e){
		var target = $(e.target);

		if(target.val() !== ''){
			$("#cfileForm").submit();
		}
	})	

	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action'),
			type = target.data('type');

		_this._selectDom = target;

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
			return;
		}

		if(type === 'submit'){
			var tit = $("#subjectTitle").val(),
				mark = $("#subjectMark").val(),
				open = $("#subjectOpen").prop('checked')?1:0,
				guest = $("#subjectGuest").prop('checked')?1:0;

			// var mlist = [];
			// $("#nowManage .tag").each(function(e){
			// 	var target = $(e.target),
			// 		id = target.data('id');
			// 	if(id){
			// 		mlist.push(id);
			// 	}
			// });

			// var llist = [];
			// $("#nowSubLabel .tag").each(function(e){
			// 	var target = $(e.target),
			// 		id = target.data('id');
			// 	if(id){
			// 		llist.push(id);
			// 	}				
			// })

			if(tit == ''){
				alert('还没有填写标题');
				return;
			}

			var param = {
				title : tit,
				mark : mark,
				private : open,
				guest : guest,
				members : _this.getManageList(),
				subjectLabels : _this.getLabelList(),
				articleLabels : [],
				resources : _this.getResList()
			}

			if(param.title !== '' && param.mark !== ''){
				cgi.create(param,function(res){
					if(res.code === 0){
						_this.dom.modal('hide');
						
						var html = tmpl.list({
							list : [res.data]
						});
						$("#mySubject").prepend(html);
					}
				});
			}
		}

	});
}