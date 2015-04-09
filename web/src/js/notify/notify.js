//通知
var notify = {},
	data = require('../data/data').notify,
	cgi = require('../common/cgi').notify;

var tmpl = {
	list : require('../../tpl/user/msglist.ejs'),
	one : require('../../tpl/user/msg.ejs')   //资源列表
}

var notifyObj = function(){
	this.dom = $("#notifyList");
	this.tipsDom = $("#userNav .msg div");

	this.msgNum = 0;
	this.get();
	this.bindAction();
}

notifyObj.prototype.get = function(){
	var _this = this;
	cgi.search({},function(res){
		console.log(res);
		if(res.code === 0){
			if(res.data.list.length){
				_this.msgNum = res.data.list.length;
				_this.tipsDom.text(_this.msgNum).show();
				var html = tmpl.list(res.data);
				console.log(html);
				_this.dom.html(html);
			}
		}
	});
}

notifyObj.prototype.read = function(){

}

notifyObj.prototype.bindAction = function(){
	var _this = this;
	this.tipsDom.bind('click',function(e){
		if(_this.msgNum){
			if(_this.tipsDom.data('show')){
				_this.dom.hide();
				_this.tipsDom.data('show',0);
			}else{
				_this.dom.show();	
				_this.tipsDom.data('show',1);
			}
			
		}
	});

	this.dom.bind('click',function(e){
		var target = $(e.target),
			href = target.data('href'),
			id = target.data('id'),
			read = target.data('read');


		if(href){
			window.open(href);
			if(read == ''){
				cgi.read({
					notifyId : id
				},function(res){
					if(res.code === 0){
						target.remove();
						_this.msgNum--;
						_this.tipsDom.text(_this.msgNum);
					}
				})
			}
		}
	})
}

notify.notify = notifyObj;


module.exports = notify;