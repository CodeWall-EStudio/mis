var cgi = require('../common/cgi').article;
var tmpl = {
	info : require('../../tpl/article/one.ejs')
};

var Info = {}
module.exports = Info;

var articleInfo = function(id,sid){

	this.artId = id;
	this.subId = sid;
	this.dom = $('#articleInfo');

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
			
			_this.dom.html(html);
		}
	});
}

articleInfo.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		_this._selectDom = target;
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
	console.log('edit');	
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

Info.info = articleInfo;