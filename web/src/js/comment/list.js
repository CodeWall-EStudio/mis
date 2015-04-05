var cgi = require('../common/cgi').comment;
var tmpl = {
	list : require('../../tpl/comment/list.ejs')
};

var Comment = {}

var list = function(id,sid){
	this.dom = $("#commentList");

	this.artId = id;
	this.subId = sid;
	this.order = 'createTime'

	this.start = 0;
	this.limit = 3;

	this.loading = false;
	this.post = window.striker.commentpost;

	// articleList.init(id,cgi,tmpl);
	// articlePost.init(id,cgi,tmpl);
	this.target;
	this.bindAction();
	this.getDate();
}

list.prototype.getDate = function(){
	var _this = this;
	this.loading = true;
	var param = {
		start : this.start,
		limit : this.limit,
		articleId : this.artId,
		orderby : this.order
	};

	cgi.search(param,function(res){
		this.loading = false;
		if(res.code === 0){
			_this.start += _this.limit;
			var html = tmpl.list(res.data);
			_this.dom.append(html);
		}
	});
}

list.prototype.orderbycreate = function(){
	if(this.order === 'createTime'){
		return;
	}
	this.order = 'createTime';
	this.dom.html('');
	this.start = 0;
	this.getDate();
}

list.prototype.orderbyupdate = function(){
	if(this.order === 'updateTime'){
		return;
	}	
	this.order = 'updateTime';
	this.dom.html('');
	this.start = 0;
	this.getDate();	
}

list.prototype.loadMore = function(){
	this.loading = true;
	this.getDate();
}

list.prototype.report = function(){

}


list.prototype.bindAction = function(){
	var _this = this;

	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});

	var _this = this;
    $(document).on('scroll',function(e){
        var scrollDom = document.body;
        var pageHeight = document.documentElement.clientHeight;
        var scrollTop = scrollDom.scrollTop;
        var scrollHeight = scrollDom.scrollHeight;

        //判断是否到底了
        if(scrollTop + pageHeight >= scrollHeight){
            //console.log('end');
            _this.loadMore();
        }                
    });		
}


Comment.list = list;

module.exports = Comment;