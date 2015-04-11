//主题
var cgi = require('../common/cgi').subject,
	subjectList = require('./list'),
	subjectInfo = require('./info'),
	subjectCreate = require('./create');

var striker = $(window.striker);	

//模板引用
var tmpl = {
	area : require('../../tpl/subject/size.ejs'),
	manage : require('../../tpl/user/manage.ejs'), //管理员
	list : require('../../tpl/subject/list.ejs'),  //主题列表
	head : require('../../tpl/subject/head.ejs'),  //主题详情头部
	onemanage : require('../../tpl/user/onemanage.ejs'), //单个管理员
	aside : require('../../tpl/subject/aside.ejs'),  //主题详情右边资源列表
	rlist : require('../../tpl/resource/list.ejs')   //资源列表
};

var proMap = {
	mySubject : '我创建的',
	myFollow : '我关注的',
	myInvited : '邀请我的',
	open : '公开主题',
	myArchived : '归档主题'
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
	this.limit = 5; //一页的条数
	this.order = 'createTime';//0 按时间排序,1 按更新时间排序
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
	this.allNum = 0;
	this.loading = false;

	this.getDate({
		start : this.page*this.limit,
		limit : this.limit,
		orderby : this.order
	});

	this.bindAction();
}

//下一页
Subject.area.prototype.next = function(){
	if(this.page < this.allPage-1){
		this.page++;
		this.getDate({
			start : this.page*this.limit,
			limit : this.limit,
			orderby : this.order
		});	
	}
}

//上一页
Subject.area.prototype.pre = function(){
	if(this.page > 0){
		this.page--;
		this.getDate({
			start : this.page*this.limit,
			limit : this.limit,
			orderby : this.order
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
	// orderby: updateTime / createTime
	this.order = 'createTime';
	this.timeDom.addClass('active');
	this.updateDom.removeClass('active');
	this.getDate({
		start : this.page*this.limit,
		limit : this.limit,
		orderby : this.order
	});
}

//按更新时间排序
Subject.area.prototype.orderbyupdate = function(){
	this.order = 'updateTime';
	this.updateDom.addClass('active');
	this.timeDom.removeClass('active');	
	this.getDate({
		start : this.page*this.limit,
		limit : this.limit,
		orderby : this.order
	});	
}

//新建主题
Subject.area.prototype.create = function(){
	if(!this.createSubject){
		this.createSubject = window.striker.createSubject;
	}
	if(!this.label){
		this.label = window.striker.label;
	}
	this.createSubject.changeType(this.proName);
	//this.label.init();
}

//判断翻页是否可以点击
Subject.area.prototype.checkPage = function(){
	if(this.page <= 1){
		this.prePage.addClass('disabled');
		if(this.allPage === 1){
			this.nextPage.prop({disabled:true}).addClass('disabled');
		}else{
			this.nextPage.prop({disabled:false}).removeClass('disabled');	
		}
		
	}else if(this.page >= this.allPage-1){
		this.nextPage.prop({disabled:true}).addClass('disabled');
		if(this.allPage === 1){
			this.prePage.prop({disabled:true}).addClass('disabled');
		}else{
			this.prePage.prop({disabled:false}).removeClass('disabled');
		}		
	}
}

//修改总数
Subject.area.prototype.changeNum = function(num){
	this.allPage = Math.ceil(num/this.limit);
	this.allNum = num;
	this.numDom.text(num);
}

Subject.area.prototype.getDate = function(param){
	if(this.loading){
		return;
	}
	var _this = this;
	this.loading = true;

	var funname = 'search';
	if(this.proName === 'myFollow'){
		funname = 'following';
	}else if (this.proName === 'myInvite'){
		funname = 'invited';
	}else if (this.proName === 'myArchived'){
		funname = 'archived';
	}

	cgi[funname](param,function(res){
		_this.loading = false;
		if(res.code === 0){
			var html = tmpl.list(res.data);
			_this.listDom.html(html);
			_this.changeNum(res.data.total);
			_this.checkPage();
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

	striker.bind('subjectCreated',function(){
		if('mySubject' === _this.proName){
			_this.allNum++;
			_this.changeNum(_this.allNum);
		}
	});
}

Subject.init = function(type){
	subjectList.init(type,cgi,tmpl);
	subjectInfo.init(type,cgi,tmpl);
	subjectCreate.init(type,cgi,tmpl);
}