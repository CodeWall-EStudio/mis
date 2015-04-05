var cgi = require('../common/cgi').comment;
var tmpl = {
	list : require('../../tpl/article/list.ejs')
};

var Comment = {}

var post = function(id,sid){
	this.dom = $("#postArea");
	this.contentDom = this.dom.find('input[name=name]');

	this.artId = id;
	this.subId = sid;	

	this.bindAction();
	this.loading = false;
	// articleList.init(id,cgi,tmpl);
	// articlePost.init(id,cgi,tmpl);
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
		resources : []
	};

	cgi.create(param,function(res){
		_this.loading = true;
		if(res.code === 0){
			_this.cList.append(res.data);
			_this.contentDom.val('');
		}
	});
}

post.prototype.bindAction = function(id,name){
	var _this = this;

	this.dom.bind('click',function(e){
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