var cgi = require('../common/cgi').article;
var tmpl = {
	info : require('../../tpl/article/one.ejs')
};

var Info = {}
module.exports = Info;
var striker = $(window.striker);

var articleInfo = function(id,sid){

	this.artId = id;
	this.subId = sid;
	this.dom = $('#articleInfo');

	this.data = {};

	this.cList = window.striker.commentlist;
	this.cpost = window.striker.commentpost;

	this.getDate();
	this.bindAction();
}

articleInfo.prototype.getDate = function(){
	var _this = this;
	cgi.info({id: this.artId},function(res){
		if(res.code === 0){
			res.data.sid = _this.subId;
			var html = tmpl.info(res.data);
			
			_this.data = res.data;
			_this.dom.html(html);
			_this.cDom = $("#commentCount");
		}
	});
}

articleInfo.prototype.bind = function(){

}

articleInfo.prototype.bindAction = function(){
	var _this = this;
	striker.bind('articleEdited',function(e,d){
		d.sid = _this.subId;
		_this.data = d;
		console.log(d);
		var html = tmpl.info(d);
		_this.dom.html(html);
	});

	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	})
}

articleInfo.prototype.up = function(){
	console.log('up');
}

articleInfo.prototype.setup = function(){
	console.log('setup');
}

articleInfo.prototype.edit = function(){
	striker.trigger('editArticle',this.data);
}

articleInfo.prototype.delete = function(){
	console.log('delete');	
}

articleInfo.prototype.orderbytime = function(){
	this.cList.orderbycreate();
}

articleInfo.prototype.orderbyupdate = function(){
	this.cList.orderbyupdate();
}

articleInfo.prototype.updateCount = function(){
	this.data.commentCount++;
	this.cDom.text(this.data.commentCount);
}

Info.info = articleInfo;