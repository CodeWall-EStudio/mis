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
	this.msg = window.striker.msg;

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

list.prototype.replay = function(e){
	var id = this.target.data('id'),
		cname = this.target.data('cname');

	this.post.replay(id,cname);
}	

list.prototype.setup = function(){
	var id = this.target.data('id'),
		star = parseInt(this.target.data('status'));

	if(!star){
		star = 0;
	}

	if(id){
		var dom = this.target;
		var param = {
			commentId : id,
			isStar : star ? 0 :1
		};
		var text = star?'赞':'已赞';
		cgi.star(param,function(res){
			if(res.code === 0){
				dom.data('status',param.isStar);
				dom.html('<span></span>'+text);
			}
		});
	}
}

list.prototype.collect = function(){
	var id = this.target.data('id'),
		star = parseInt(this.target.data('status'));

	if(!star){
		star = 0;
	}

	if(id){
		var dom = this.target;
		var param = {
			commentId : id,
			isCollect : star ? 0 :1
		};
		var text = star?'收藏':'取消收藏';
		cgi.collect(param,function(res){
			if(res.code === 0){
				dom.data('status',param.isCollect);
				dom.html('<span></span>'+text);
			}
		});
	}
}

list.prototype.delete = function(){
	var id = this.target.data('id');

	if(id){

		var _this = this;
		this.msg.confirm('确定要删除该回复?',null,function(){
			var param = {
				commentId : id
			};
			cgi.delete(param,function(res){
				if(res.code === 0){
					$(".comment"+id).remove();
				}
			});
		});
	}
}

list.prototype.append = function(data){
	var html = tmpl.list({
		list : [data]
	});
	this.artInfo.updateCount();
	this.dom.prepend(html);
}

list.prototype.bindFun = function(info){
	this.artInfo = info;
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