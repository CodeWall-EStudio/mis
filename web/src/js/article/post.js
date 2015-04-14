//主题列表
var aPost = {},
	data = require('../data/data'),
	cgi,
	tmpl,
	nowSubId = 0,
	loading = false;
	start = 0,
	limit = 20,
	striker = window.striker;

module.exports = aPost;
var listDom = $("#articleList"),
	resList = [];
var striker = $(window.striker);	

var cgi = require('../common/cgi').article;
var tmpl = {
	list : require('../../tpl/article/list.ejs'),
	rlist : require('../../tpl/resource/list.ejs')   //资源列表
};


//重置一个from
function resetFrom(target){
	target.find('input[name=name]').val('');
	target.find('textarea[name=content]').val('');
};

aPost.init = function(id,module,tmp){
	nowSubId = id;
	cgi = module;
	tmpl = tmp;

	new aPost.post();
}

var post = function(){
	this.pDom = $("#postArticle"); //底部发表框
	this.cDom = $("#createArticle"); //弹出发表框
	this.presDom = this.pDom.find('.post-res');/// = $("")
	this.cresDom = this.cDom.find('.pop-res');
	this.ctitDom = this.cDom.find('.modal-title');
	this.model = 'post';//post 底部 pop 弹出窗口

	this.isEdit = false;

	var _this = this;
	this.cDom.on('show.bs.modal', function (e) {
		if(_this.isEdit){
			_this.ctitDom.text('修改帖子');
		}else{
			_this.ctitDom.text('新建帖子');
		}
		
		setTimeout(function(){
			_this.cDom.find('input[name=name]').focus();
		},1000)	
		_this.model = 'pop';
	});

	this.cDom.on('hide.bs.modal', function (e) {
		_this.model = 'post';
	});

	this.data = {};
	this.resList = [];
	this.resMap = {};

	this.loading = false;
	this.fileupload = false;
	this.target;
	this.bindAction();
}

post.prototype.bindFun = function(){

};


//取选择的资源
post.prototype.getResList = function(){
	var list = [];
	for(var i in this.resMap){
		list.push(this.resMap[i].id);
	}
	return list;
}

//根据dom获取相关的参数.
post.prototype.getParam = function(target){
	var name = target.find('input[name=name]').val(),
		content = target.find('textarea[name=content]').val();

	var param = {
		title : name,
		content : content,
		subjectId : nowSubId,
		labels : [],
		resources : this.getResList()
	}

	return param;
}

post.prototype.removeRes = function(e){
	var _this = this;
	var target = $(e.target),
		p = target.parent();

	var id = p.data('id');
	if(id){
		delete this.resMap[id];
		p.remove();
		if(_this.model === 'pop'){
			if(this.cresDom.find('.tag').length === 0){
				this.cresDom.hide();
			}
		}else{
			if(this.presDom.find('.tag').length === 0){
				this.presDom.hide();
			}
		}	
	}
}

post.prototype.edit = function(d){
	this.isEdit = true;
	this.data = d;
	this.cDom.modal('show');
	this.cDom.find('input[name=name]').val(d.title);
	this.cDom.find('textarea[name=content]').val(d.content);

	if(d.resourceList.length){
		this.resList = [];
		this.resMap = {};
		for(var i in d.resourceList){
			var item = d.resourceList[i];
			this.resList.push(item.id);
			this.resMap[item.id] = item;
		}
		var html = tmpl.rlist({
			list : d.resourceList
		});
		this.cresDom.append(html).show();	
	}
}


post.prototype.bindAction = function(){
	var _this = this;	
	//资源上传完成的通知

	striker.bind('editArticle',function(e,d){
		_this.edit(d);
	});

	striker.bind('uploadArticle',function(e,d){
		_this.fileupload = false;
		if(window.striker.commentshow){
			$(striker).trigger('uploadFile',d);
			return;
		}
		if(d.code === 0){
			_this.resList.push(d.data.id);
			_this.resMap[d.data.id] = d.data;

			var html = tmpl.rlist({
				list : [d.data]
			});
			if(_this.model === 'pop'){
				_this.cresDom.append(html).show();
			}else{
				_this.presDom.append(html).show();
			}
			
		}
	});

	window.uploadComp = function(d){
		_this.fileupload = false;
		if(window.striker.commentshow){
			$(striker).trigger('uploadFile',d);
			return;
		}
		if(d.code === 0){
			_this.resList.push(d.data.id);
			_this.resMap[d.data.id] = d.data;

			var html = tmpl.rlist({
				list : [d.data]
			});
			if(_this.model === 'pop'){
				_this.cresDom.append(html).show();
			}else{
				_this.presDom.append(html).show();
			}
			
		}
	};

	this.pDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});

	this.cDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});	

	$("#fileName").bind('change',function(e){
		var target = $(e.target);
		if(_this.fileupload){
			return;
		}
		if(target.val() !== ''){
			_this.fileupload = true;
			$("#fileForm").submit();
		}
	})	

	$("#cfileName").bind('change',function(e){
		var target = $(e.target);
		if(_this.fileupload){
			return;
		}		
		if(target.val() !== ''){
			_this.fileupload = true;
			$("#cfileForm").submit();
		}
	})	
}

post.prototype.clear = function(){
	this.pDom.find('input').val('');
	this.pDom.find('textarea').val('');

	this.cDom.find('input').val('');
	this.cDom.find('textarea').val('');	

	resList = [];
}

post.prototype.post = function(){
	if(this.loading){
		return;
	}
	var pt = this.target.data('target');
	//console.log(pTarget);
	var pTarget = $(pt);

	if(pTarget.length === 0){
		return;
	}
	this.loading = true;
	var param = this.getParam(pTarget);
	var _this = this;

	if(param.title === '' || param.content === ''){
		return;
	}

	if(this.isEdit){
		param.subjectId = this.data.subject_id;
		param.articleId = this.data.id;
		cgi.edit(param,function(res){
			_this.loading = false;
			if(pTarget.hasClass('modal')){
				aPost.reset(pTarget);
			}
			if(res.code === 0){
				this.cDom.modal('hide');
				striker.trigger('articleEdited',res.data);
				//striker.article.appendToList(res.data);
			}
			_this.clear();
		});	
	}else{
		cgi.create(param,function(res){
			_this.loading = false;
			if(pTarget.hasClass('modal')){
				aPost.reset(pTarget);
			}
			_this.cDom.modal('hide');
			if(res.code === 0){
				striker.trigger('newarticle',res.data);
			}
			_this.clear();
		});	
	}
}
//重置一个from
aPost.reset = function(target){
	var pTarget = $(target.data('target'));
	if(pTarget.length === 0){
		return;
	}
	resetFrom(pTarget);
}

aPost.post = post;