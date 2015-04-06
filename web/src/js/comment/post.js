var cgi = require('../common/cgi').comment;
var tmpl = {
	list : require('../../tpl/article/list.ejs'),
	rlist : require('../../tpl/resource/list.ejs')   //资源列表
};

var Comment = {}

var post = function(id,sid){
	this.dom = $("#postArea");
	this.popDom = $("#createComment");
	this.contentDom = this.dom.find('input[name=name]');
	this.popContentDom = this.popDom.find('textarea[name=content]');
	this.popTitleDom = this.popDom.find('input[name=name]');
	this.cresDom = this.popDom.find('.pop-res');

	this.artId = id;
	this.subId = sid;	

	this.resList = [];
	this.resMap = {};

	this.bindAction();
	this.loading = false;
	// articleList.init(id,cgi,tmpl);
	// articlePost.init(id,cgi,tmpl);
}

//取选择的资源
post.prototype.getResList = function(){
	var list = [];
	for(var i in this.resMap){
		list.push(this.resMap[i].id);
	}
	return list;
}

post.prototype.bind = function(obj){
	this.articleList = obj.list;
}

post.prototype.changeArticle = function(id){
	this.artId = id;
}

post.prototype.bindFun = function(list){
	this.cList = list;
}

post.prototype.replay = function(id,name){
	this.contentDom.val('回复 '+name+':');
}

post.prototype.create = function(){
	var content = this.contentDom.val();
	var _this = this;
	if(content === ''){
		return;
	}
	this.loading = true;
	var param = {
		subjectId : this.subId,
		articleId : this.artId,
		content : content,
		title : '',
		label : [],
		resources : this.getResList()
	};

	cgi.create(param,function(res){
		_this.loading = true;
		if(res.code === 0){
			_this.cList.append(res.data);
			_this.contentDom.val('');
		}
	});
}

post.prototype.post = function(){

	var content = this.popContentDom.val();
	var title = this.popTitleDom.val();
	var _this = this;
	if(content === ''){
		return;
	}
	this.loading = true;
	var param = {
		subjectId : this.subId,
		articleId : this.artId,
		content : content,
		title : title,
		label : [],
		resources : this.getResList()
	};

	cgi.create(param,function(res){
		_this.loading = true;
		if(res.code === 0){
			if(_this.cList){
				_this.cList.append(res.data);
			}
			_this.popContentDom.val('');
			_this.popTitleDom.val('');
			_this.popDom.modal('hide');
		}
	});
}

post.prototype.reset = function(){
	
}

post.prototype.showPost = function(id){
	this.changeArticle(id);
	this.popDom.modal('show');
}

post.prototype.removeRes = function(e){
	var _this = this;
	var target = $(e.target),
		p = target.parent();

	var id = p.data('id');
	if(id){
		delete this.resMap[id];
		p.remove();

		if(this.popDom.find('.tag').length === 0){
			this.cresDom.hide();
		}
	}
}

post.prototype.bindAction = function(id,name){
	var _this = this;

	var uploadComp  = function(d){
			console.log('comment ');
		if(d.code === 0){
			_this.resList.push(d.data.id);
			_this.resMap[d.data.id] = d.data;

			var html = tmpl.rlist({
				list : [d.data]
			});
			_this.cresDom.append(html).show();
		}
	}

	if(window.uploadComp){
		console.log('have camp');
		$(striker).bind('uploadFile',function(e,d){
			console.log(d);
			uploadComp(d);
		});
	}else{
		console.log('no camp');
		window.uploadComp = uploadComp;
	}

	$("#ccfileName").bind('change',function(e){
		var target = $(e.target);
		if(target.val() !== ''){
			$("#ccfileForm").submit();
		}
	})	

	this.popDom.on('show.bs.modal', function (e) {
		window.striker.commentshow = true;
	});

	this.popDom.on('hide.bs.modal', function (e) {
		window.striker.commentshow = false;
	});	

	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});

	this.popDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});	
}

Comment.post = post;
module.exports = Comment;