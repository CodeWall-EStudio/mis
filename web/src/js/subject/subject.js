//主题
var cgi = require('../common/cgi').subject,
	subjectList = require('./list'),
	subjectInfo = require('./info'),
	subjectCreate = require('./create');

//模板引用
var tmpl = {
	area : require('../../tpl/subject/size.ejs'),
	manage : require('../../tpl/user/manage.ejs'),
	list : require('../../tpl/subject/list.ejs'),
	head : require('../../tpl/subject/head.ejs'),	
	onemanage : require('../../tpl/user/onemanage.ejs')
};

var proMap = {
	mySubject : '我创建的',
	myFollow : '我关注的',
	myInvite : '邀请我的',
	open : '公开主题',
	file : '归档主题'
}

var Subject = {};

module.exports = Subject;

/*定义通用参数*/
var start = 0,
	limit = 20;

Subject.search = subjectList.search;

Subject.create = subjectCreate.create;

Subject.info = subjectInfo.info;

Subject.area = function(domname){
	var proName = domname,
		dom = $('#'+domname+'Block');
	this.proName = domname;
	this.dom = dom;
	this.page = 0;   //开始页码
	this.allPage = 0;
	this.limit = 20; //一页的条数
	this.order = 0;//0 按时间排序,1 按更新时间排序
	this.listDom; //列表的位置
	var html = tmpl.area({
		proText : proMap[domname],
		proName : domname
	});
	dom.html(html);
	this.listDom = $('#'+domname);
	this.numDom = $("#"+domname+'Num');
	this.prePage = dom.find('.pre-page');
	this.nextPage = dom.find('.next-page');	
	this.timeDom = dom.find('.time');
	this.updateDom = dom.find('.update');

	this.loading = false;

	this.getDate({
		start : this.page*this.limit,
		limit : this.limit
	});

	this.bindAction();
}

//下一页
Subject.area.prototype.next = function(){
	if(this.page < this.allPage){
		this.page++;
		this.getDate({
			start : this.page*this.limit,
			limit : this.limit
		});	
	}
}

//上一页
Subject.area.prototype.pre = function(){
	if(this.page > 0){
		this.page--;
		this.getDate({
			start : this.page*this.limit,
			limit : this.limit
		});
	}
}

//打开收起
Subject.area.prototype.close = function(e){
	if(this.listDom.hasClass('hide')){
		this.listDom.removeClass('hide');
	}else{
		this.listDom.addClass('hide');
	}
}

//按发表时间排序
Subject.area.prototype.orderbytime = function(){
	alert('按时间排序')
}

//按更新时间排序
Subject.area.prototype.orderbyupdate = function(){
	alert('按更新时间排序')
}

//新建主题
Subject.area.prototype.create = function(){
	
}

//判断翻页是否可以点击
Subject.area.prototype.checkPage = function(){
	if(this.page <= 0){
		this.prePage.prop({disabled:true});
		if(this.allPage === 1){
			this.nextPage.prop({disabled:true});	
		}else{
			this.nextPage.prop({disabled:false});	
		}
		
	}else if(this.page >= this.allPage){
		this.nextPage.prop({disabled:true});
		if(this.allPage === 1){
			this.prePage.prop({disabled:true});	
		}else{
			this.prePage.prop({disabled:false});	
		}		
	}
}

//修改总数
Subject.area.prototype.changeNum = function(num){
	this.allPage = Math.ceil(num/this.limit);
	this.numDom.text(num);
}

Subject.area.prototype.getDate = function(param){
	if(this.loading){
		return;
	}
	var _this = this;
	this.loading = true;
	cgi.search(param,function(res){
		_this.loading = false;
		if(res.code === 0){
			var html = tmpl.list(res.data);
			_this.listDom.html(html);
			_this.changeNum(res.data.total);
		}
	});
}

/*
考虑到首页结构的特殊性,这里分块绑定事件
*/
Subject.area.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(_this[action]){
			_this[action](e);
		}
	});	
}

Subject.init = function(type){
	subjectList.init(type,cgi,tmpl);
	subjectInfo.init(type,cgi,tmpl);
	subjectCreate.init(type,cgi,tmpl);
}