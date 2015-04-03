/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	var user = __webpack_require__(2),
		subject = __webpack_require__(3),
		article = __webpack_require__(4),
		label = __webpack_require__(5);
	
	
	var Striker = $(window.striker);
	
	
	//事件通知,用户资料已经加载完成
	function userLoad(e,d){
		new subject.area('mySubject');
		new subject.area('myFollow');
		window.striker.label = new label.label('labelArea');
		window.striker.createSubject = new subject.create();
		//subject.search('mySubject');
		// subject.search('mySubject');
		// subject.search('mySubject');
	}
	
	//事件通知,主题已经加载完成
	function subjectLoad(e,d){
		console.log(e,d);
	}
	
	var handlers = {
		'userLoadSub' : userLoad,
		'subjectLoad' : subjectLoad
	}
	
	for(var i in handlers){
		Striker.bind(i,handlers[i]);
	}
	
	//全局事件绑定
	function bindAction(){
		$('body').bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
			if(action){
				var actMap = action.split('.');
				var mod = actMap[0],
					fun = actMap[1];
				if(actMap.length === 2 && striker[mod][fun]){
	
					striker[mod][fun](target);
				}
			}
		});
	}
	
	function init(){
		subject.init('index');
		//article.init('index');
		user.init();
		label.init();
	
		striker.subject = subject;
		striker.article = article;
		striker.user = user;
	
		bindAction();
	}
	
	init();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// keep it if using url md5 rev replacement in javascript
	console.log('global is load');
	
	function formatTime(str){
		var date = new Date(str);
	
	    var yyyy = date.getFullYear().toString();                                    
	    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based         
	    var dd  = date.getDate().toString();             
	                        
	    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);	
	}
	
	function getNowTime(str){
	    var now = new Date().getTime();
	    var atime = new Date(str).getTime();
	
	    var c = Math.floor((now - atime)/1000);
	    if(c<60){
	        return '1分钟以内';
	    }else if(c<3600){
	        return Math.floor(c/3600)+'分钟前';
	    }else if(c<3600*24){
	        return Math.floor(c/(3600*24))+'天前';
	    }else{
	        return formatTime(str);
	    }
	
	}
	
	var getParameter = function(name,str){
	    str = str || location.href;
	    var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)"), m = str.match(r);
	    return decodeURIComponent(!m ? "" : m[2]);		
	}
	
	/**
	 * @description 三个字母算一个字
	 *
	 * @param {String} str 输入字符串
	 * @return {String} [len=2] 字母数(多少个字母算一个字)
	 * @example
	 *      getLen('abc一二三');
	 */
	var getLen = function(str,len){
	    //正则取到中文的个数，然后len*count+原来的长度。不用replace
	    var factor = len || 3;
	    str += '';
	    var zhChar = str.match(/[^\x00-\xff]/g) || [];
	    var letter = str.replace(/[^\x00-\xff]/g , '');
	    return parseInt(zhChar.length + (letter.length / factor));		
	}
	
	/**
	 * @description 三个字母算一个字
	 *
	 * @param {String} str 输入字符串
	 * @param {number} max 总长度
	 * @return {number} [len=2] 长度
	 * @example
	 *      changeLen('abc一二三',10);
	 */
	var changeLen = function(str,max){
		var max = max || 10;
		var len = getLen(str);
		var ret = max - len;
		return ret>=0?ret:0;
	}
	
	window.striker.util = {
		formatTime : formatTime,
		getParameter : getParameter,
	    getNowTime : getNowTime,
		getLen : getLen,
		changeLen : changeLen
	}
	


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(7).user,
		data = __webpack_require__(8).user,
		userManage = __webpack_require__(9),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(16),
		manage : __webpack_require__(17),
		onemanage : __webpack_require__(18)
	}
	
	var User = {},
		_this = User;
	module.exports = User;
	
	//对外提供的接口
	window.striker.user = User;
	
	//管理员设置显示等等
	User.manage = userManage.manage;
	// User.addmanage = userManage.show;
	
	// User.addDefManage = userManage.addDefManage;
	
	User.getMyInfo = function(cb){
		cgi.info(function(res){
			if(res.code === 0){
				data.myInfo = res.data;
				var html = tmpl.nav(res.data);
				$("#userNav").html(html);
	
				striker.triggerHandler('userLoadSub',res.code);
				striker.triggerHandler('userLoadArt',res.code);
				console.log('userload');
			}
		});
	}
	
	User.getUserList = function(){
		cgi.list(function(res){
			if(res.code === 0){
				data.list = res.data;
			}
		});
	}
	
	User.init = function(){
		_this.getMyInfo();
		_this.getUserList();
		userManage.init(cgi,tmpl);
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	//主题
	var cgi = __webpack_require__(7).subject,
		subjectList = __webpack_require__(10),
		subjectInfo = __webpack_require__(11),
		subjectCreate = __webpack_require__(12);
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(19),
		manage : __webpack_require__(17),
		list : __webpack_require__(20),
		head : __webpack_require__(21),	
		onemanage : __webpack_require__(18),
		rlist : __webpack_require__(22)
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
	}
	
	Subject.init = function(type){
		subjectList.init(type,cgi,tmpl);
		subjectInfo.init(type,cgi,tmpl);
		subjectCreate.init(type,cgi,tmpl);
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(7).article;
	var tmpl = {
		list : __webpack_require__(23)
	};
	
	var articleList = __webpack_require__(13),
		articlePost = __webpack_require__(14);
	
	var Article = {}
	
	module.exports = Article;
	
	Article.search = articleList.search;
	
	Article.loadMore = articleList.loadMore;
	
	Article.appendToList = articleList.prependToList;
	
	//Article.post = articlePost.create;
	
	//Article.reset = articlePost.reset;
	
	/**/
	
	Article.init = function(id){
		articleList.init(id,cgi,tmpl);
		articlePost.init(id,cgi,tmpl);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(7).label,
		data = __webpack_require__(8).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(24),
		one : __webpack_require__(25)
	};
	
	module.exports = Label;
	
	function getList(){
		cgi.list(function(res){
			if(res.code === 0){
				
			}
		});
	}
	
	
	Label.label = function(name){
		this.dom = $("#"+name);
	
		this.nowDom = this.dom.find('.now-label-list');
		this.addDom = this.dom.find('.add-label-area');
		// if(type === 'sub'){
		// 	this.addDom = $('#addSubLabel');
		// 	this.nowDom = $('#nowSubLabel');
		// }else{
		// 	this.addDom = $('#addArtLabel');
		// 	this.nowDom = $('#nowArtLabel');
		// }
		this.listDom = this.addDom.find('.label-list');
		this.btnDom = this.addDom.find('.btn');
		this.inputDom = this.addDom.find('.form-control');
		this._selectDom;//当前选中的元素
	
		//默认没有标签
		this.nowDom.hide();
		this.addDom.hide();
	
		//已经选中的idmap
		this.idmap = {};
	
		this.map = {};
		this.getData();	
		this.bindAction();
	}
	
	Label.label.prototype.bindAction = function(){
		var _this = this;
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
			_this._selectDom = target;
	
			if(_this[action]){
				_this[action](e);
			}
		});
		//
		// this.nowDom.bind('click',function(e){
		// 	var target = $(e.target),
		// 		action = target.data('action');
		// 	_this._selectDom = target;
	
		// 	if(_this[action]){
		// 		_this[action](e);
		// 	}
		// });
	}
	
	Label.label.prototype.create = function(){
		var val = this.inputDom.val();
		if(val !== ''){
			var param = {
				name : val
			};
			var _this = this;
	
			cgi.create(param,function(res){
				if(res.code === 0){
					_this.map[res.data.id] = res.data;
					var html = tmpl.list({list:[res.data]});
					_this.listDom.append(html);
				}
			});
		}
	}
	
	Label.label.prototype.showlist = function(e){
		// /console.log(this._selectDom);
		if(this._selectDom.hasClass('fui-plus')){
			this._selectDom.removeClass('fui-plus').addClass('fui-cross');
			this.addDom.show();
		}else{
			this._selectDom.addClass('fui-plus').removeClass('fui-cross');
			this.addDom.hide();
		}
		//this.addDom.show();
		//this.nowDom.show();
	
		//fui-cross
		//fui-plus
	}
	
	Label.label.prototype.getData = function(){
		var _this = this;
		cgi.list({},function(res){
			if(res.code === 0){
				var html = tmpl.list({list:res.data});
				_this.listDom.html(html);
				for(var i = 0,l=res.data.length;i<l;i++){
					var item = res.data[i];
					_this.map[item.id] = item;
				}
			}
		});
	}
	
	Label.label.prototype.select = function(e){
		var id = this._selectDom.data('id');
		var param = {
			list : [this.map[id]]
		}
	
		this.idmap[id] = 1;
		if(this.nowDom.find('.label'+id).length === 0){
			var html = tmpl.one(param);
			this.nowDom.append(html).show();
		}
	}
	
	Label.label.prototype.getLabelList = function(){
		var list = [];
		// console.log(this.nowDom.find(".tag").length);
		// this.nowDom.find(".tag").each(function(e){
		// 	var target = $(e.target),
		// 		id = target.data('id');
		// 	if(id){
		// 		list.push(id);
		// 	}				
		// })	
		for(var i in this.idmap){
			list.push(i);
		}
		return list;
	}
	
	Label.label.prototype.clear = function(){
		this.idmap = {};
		this.nowDom.html('').hide();
	
		var dom = this.dom.find('.show-btn');
		dom.addClass('fui-plus').removeClass('fui-cross');
		this.addDom.hide();	
	}
	
	//删除
	Label.label.prototype.remove = function(e){
		var target = $(e.target),
			p = target.parent();
	
		var id = p.data('id');
		delete this.idmap[id];
		p.remove();
	}
	
	
	Label.init = function(){
	
	}

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(15);
	
	var cgiPath = '/cgi/';
	var cgiList = {
		user : {
			list : cgiPath+'user/list',
			info : cgiPath+'user/info',
			create : cgiPath+'user/create'
		},
		subject : {
			search : cgiPath+'subject/search',
			info : cgiPath+'subject/info',
			create : cgiPath+'subject/create',
			follow : cgiPath+'subject/follow', //关注
			following : cgiPath+'subject/following' //关注列表
		},
		article : {
			search : cgiPath+'article/search',
			info : cgiPath+'article/info',
			create : cgiPath+'article/create'
		},
		label : {
			create : cgiPath+'label/create',
			list : cgiPath+'label/list'
		},
		login : cgiPath+'account/login',
		logout : cgiPath+'account/logout'
	}
	
	var db = {};
	var emptyFun = function(res){
	
	}
	
	db.login = function(param,callback){
		request.post(cgiList.login,param,callback);
	}
	
	db.logout = function(param,callback){
		request.get(cgiList.logout,callback);
	}
	
	db.user = {};
	db.user.list = function(callback){
		request.get(cgiList.user.list,null,callback);
	}
	
	db.user.info = function(callback){
		request.get(cgiList.user.info,null,callback);	
	}
	
	//直接拉所有用户?
	db.user.create = function(param,callback){
		request.get(cgiList.user.create,param,callback);
	}
	
	db.subject = {};
	
	db.subject.search = function(param,callback){
		request.get(cgiList.subject.search,param,callback);
	}
	
	db.subject.info = function(param,callback){
		request.get(cgiList.subject.info,param,callback);
	}
	
	db.subject.create = function(param,callback){
		request.post(cgiList.subject.create,param,callback);
	}
	
	db.subject.follow = function(param,callback){
		request.post(cgiList.subject.follow,param,callback);	
	}
	
	db.subject.following = function(param,callback){
		request.get(cgiList.subject.following,param,callback);	
	}
	
	db.article = {};
	
	db.article.search = function(param,callback){
		request.get(cgiList.article.search,param,callback);
	}
	
	db.article.info = function(param,callback){
		request.get(cgiList.article.info,param,callback);
	}
	
	db.article.create = function(param,callback){
		request.post(cgiList.article.create,param,callback);
	}
	
	db.label = {};
	
	db.label.create = function(param,callback) {
		request.post(cgiList.label.create, param, callback);	
	}
	
	db.label.list = function(param,callback){
		request.get(cgiList.label.list,param,callback);	
	}
	
	module.exports = db;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Data = {};
	/*
	数据缓存
	user 用户
	subject 主题
	article 帖子
	*/
	Data.user = {};
	Data.subject = {};
	Data.article = {};
	Data.label = {};
	
	function getData(type,key){
		return Data[type][key] || null;
	}
	
	module.exports = Data;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(8).user;
	var cgi,
		tmpl,
		manageHave = false;
	module.exports = uManage;
	
	//var manageDom = $("#addManage"); //管理员设置dom;
	
	//选择管理员等等的事件绑定
	/*
	var manageAction = {
		search : function(target){
			var key = target.val();
			if(key !== ''){
				manageAction.searchbtn(target);
			}
		},
		searchbtn : function(target){
			var key = $("#selectOneManage").val();
			var list = data.list;
			var ulist = [];
	
			if(key === ''){
				manageDom.find('li').show();
				return;
			}
	
			for(var i = 0,l = list.length;i<l;i++){
				var item = list[i];
				if(item.name.indexOf(key)>=0){
					ulist.push(item.id);
				}
			}
			manageDom.find('li').hide();
			if(ulist.length=== 0){
				return;
			}
			for(var i = 0,l = ulist.length;i<l;i++){
				$("#user"+ulist[i]).show();
			}
		},
		selectuser : function(target){
			var id = target.data('id'),
				name = target.data('name');
	
			if($("#manage"+id).length===0){
				var html = tmpl.onemanage({
					id : id,
					name : name
				});
				$("#nowManage").append(html);
			}
		}
	};
	*/
	
	// function bindManageAction(){
	// 	manageDom.bind('click',function(e){
	// 		var target = $(e.target);
	// 			action = target.data('action');
	
	// 		if(action && manageAction[action]){
	// 			manageAction[action](target);
	// 		}
	// 	});
	
	// 	$("#selectOneManage").bind('keyup',function(e){
	// 		var target = $(e.target);
	// 			action = target.data('keyup');
	
	// 		if(action && manageAction[action]){
	// 			manageAction[action](target);
	// 		}
	// 	});
	// }
	
	// uManage.show = function(target){
	// 	if(!manageHave){
	// 		var html = tmpl.manage({
	// 			list : data.list,
	// 			my : data.myInfo
	// 		});
	// 		manageDom.html(html);
	// 		bindManageAction();
	// 	}
	// }
	
	// uManage.addDefManage = function(target){
	// 	var html = tmpl.onemanage({
	// 		id : data.myInfo.id,
	// 		name : data.myInfo.name
	// 	});
	// 	$("#nowManage").html(html);	
	// }
	
	var manage = function(target){
		//给定区域dom的名字
		this.dom = $("#"+target);
		this.manageHave = false;
		//用户列表
		this.listDom = this.dom.find('.manage-list');
		this.selectDom = this.dom.find('.now-manage-list');
		//搜索框
		this.keyDom;
	
		//当前元素
		this._selectDom;
	
		//选中的管理员列表
		this.idmap = {};
		this.idmap[data.myInfo.id] = 1;
	
		//把自己放在管理员列表里面
		var html = tmpl.onemanage({
			id : data.myInfo.id,
			name : data.myInfo.name
		});
		this.selectDom.html(html);	
	
	
		this.bindAction();	
	
	}
	
	//初始化一下.
	manage.prototype.init = function(){
	
	}
	
	//显示管理员列表
	manage.prototype.showlist = function(){
		//如果还没有填列表.把列表填一下.
		if(!this.manageHave){
			var html = tmpl.manage({
				list : data.list,
				my : data.myInfo
			});
			this.listDom.html(html);
			this.keyDom = this.listDom.find('input[name=managekey]');
			this.keyupAction();
			//bindManageAction();
		}
		if(this._selectDom.hasClass('fui-plus')){
			this._selectDom.removeClass('fui-plus').addClass('fui-cross');
			this.listDom.show();
		}else{
			this._selectDom.addClass('fui-plus').removeClass('fui-cross');
			this.listDom.hide();
		}	
	}
	
	//增加管理员
	manage.prototype.addDefManage = function(){
		
	}
	
	manage.prototype.getManageList = function(){
		var list = [];
		for(var i in this.idmap){
			list.push(i);
		}
	
		return list;
	}
	
	//清空列表
	manage.prototype.clear = function(){
		this.idmap = {};
		this.idmap[data.myInfo.id] = 1;
	
		var html = tmpl.onemanage({
			id : data.myInfo.id,
			name : data.myInfo.name
		});
		this.selectDom.html(html);	
	
		var dom = this.dom.find('.show-btn');
		dom.addClass('fui-plus').removeClass('fui-cross');
		this.listDom.hide();	
	}
	
	//选中一个用户
	manage.prototype.selectone = function(e){
		var target = this.target,
			id = target.data('id'),
			name = target.data('name');
	
		if(id && id !== data.myInfo.id){
			var html = tmpl.onemanage({
				id : id,
				name : name
			});
			this.idmap[id] = 1;
			this.selectDom.append(html);			
		}
		
	}
	
	//搜索按钮
	manage.prototype.searchbtn = function(){
		var key = this.keyDom.val();
		var list = data.list;
		var ulist = [];
	
		if(key === ''){
			this.listDom.find('li').show();
			return;
		}
	
		for(var i = 0,l = list.length;i<l;i++){
			var item = list[i];
			if(item.name.indexOf(key)>=0){
				ulist.push(item.id);
			}
		}
		this.listDom.find('li').hide();
		if(ulist.length=== 0){
			return;
		}
		for(var i = 0,l = ulist.length;i<l;i++){
			this.listDom.find(".user"+ulist[i]).show();
		}
	}
	
	//删除一个选中的管理员
	manage.prototype.remove = function(e){
		var target = this.target,
			p = target.parent('.tag'),
			id = p.data('id');
		if(id && id !== data.myInfo.id){
			delete this.idmap[id];
			p.remove();
		}
	}
	
	//事件绑定
	manage.prototype.bindAction = function(){
		var _this = this;
		this.dom.bind('click',function(e){
			var target = $(e.target);
				action = target.data('action');
			_this._selectDom = target;
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		});
	}
	
	//输入框的keyup绑定
	manage.prototype.keyupAction = function(){
		var _this = this;
		this.keyDom.bind('keyup',function(e){
			var target = $(e.target);
				action = target.data('keyup');
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		});
	}
	
	uManage.manage = manage;
	uManage.init = function(module,tmp){
		cgi = module;
		tmpl = tmp;
	
		//bindAction();
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(8).subject,
		cgi,
		tmpl,
		start = 0,
		limit = 20;
	
	module.exports = sList;
	
	sList.init = function(type,module,tmp){
		cgi = module;
		tmpl = tmp;
	}
	
	sList.search = function(param,cb){
		cgi.search({
			start : start,
			limit : limit
		},cb);
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl;
	module.exports = sInfo;
	
	var subDom = $("#subjectHead");
	var subAsideDom = $("#subjectAside");
	var postArea = $("#postArticle");
	
	function bindAction(){
		
	}
	
	sInfo.init = function(type,module,tmp){
		cgi = module;
		tmpl = tmp;
	}
	
	//拉取一个主题的内容
	// sInfo.info = function(id,cb){
	// 	cgi.info({id:id},function(res){
	// 		if(res.code === 0){
	// 			var html = tmpl.head(res.data);
	// 			subDom.html(html);
	// 		}
	// 	})
	// }
	
	sInfo.info = function(id){
		this.sid = id;
		this.dom = subDom;
		this.asideDom = subAsideDom;
		this.getData();
		this.bindAction();
		this.followBtn; //关注按钮
		this.manageBtn; //管理按钮
		this.timeBtn;   //按时间排序
		this.updateBtn; //按更新时间排序
	}
	
	sInfo.info.prototype.bindAction = function(){
		var _this = this;
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(_this[action]){
				_this[action](e);
			}
		});		
	}
	
	//拉单个帖子
	sInfo.info.prototype.getData = function(){
		var id = this.sid;
		var _this = this;
		cgi.info({id:id},function(res){
			if(res.code === 0){
				var html = tmpl.head(res.data);
				_this.dom.html(html);
				_this.followBtn = _this.dom.find('.follow-btn');
				_this.manageBtn = _this.dom.find('.manage-btn')
				_this.timeBtn = _this.dom.find('.time-btn')
				_this.updateBtn = _this.dom.find('.update-btn')
			}
		})	
	}
	
	//关注单个帖子
	sInfo.info.prototype.follow = function(){
		var id = this.sid
			follow = 1;
		var _this = this;
	
		//判断是否已经follow了.
		if(this.followBtn.hasClass('followed')){
			follow = 0;
		}
	
		cgi.follow({subjectId:id,isFollow:follow},function(res){
			if(res.code === 0){
				if(follow){
					_this.followBtn.addClass('followed').html('已关注');
				}else{
					_this.followBtn.removeClass('followed').html('关注');
				}
			}
		});
	}

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//主题创建,删除等操作
	var data;
	var sCreate = {};
	var cgi,
		tmpl;
	module.exports = sCreate;
	
	// var createDom = $("#createSubject"),
	// 	nowManageDom = $("#nowManage");
	
	
	/*
	function bindAction(){
		createDom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action'),
				role = target.data('role'),
				type = target.data('type');
	
			if(action){
				var amap = action.split('-');
	
				if(amap.length === 2 && window.striker[amap[0]][amap[1]]){
					window.striker[amap[0]][amap[1]](target);
				}
				return;
			}
			if(role){
				target.parents('.tag').remove();
				return;
			}
			if(type === 'submit'){
				var tit = $("#subjectTitle").val(),
					mark = $("#subjectMark").val(),
					open = $("#subjectOpen").prop('checked')?1:0,
					guest = $("#subjectGuest").prop('checked')?1:0;
	
				var mlist = [];
				$("#nowManage .tag").each(function(e){
					var target = $(e.target),
						id = target.data('id');
					if(id){
						mlist.push(id);
					}
				});
	
				var llist = [];
				$("#nowSubLabel .tag").each(function(e){
					var target = $(e.target),
						id = target.data('id');
					if(id){
						llist.push(id);
					}				
				})
	
				var param = {
					title : tit,
					mark : mark,
					private : open,
					guest : guest,
					members : mlist,
					subjectLabels : llist,
					articleLabels : [],
					resources : []
				}
	
				if(param.title !== '' && param.mark !== ''){
					cgi.create(param,function(res){
						if(res.code === 0){
							createDom.modal('hide');
							
							var html = tmpl.list({
								list : [res.data]
							});
							$("#mySubject").prepend(html);
						}
					});
				}
			}
		});
	}
	*/
	
	sCreate.init = function(type,module,tmp){
		cgi = module;
		tmpl = tmp;
	
		// createDom.on('show.bs.modal', function (e) {
		// 	striker.user.addDefManage();
		// });
	
		//nowManageDom;
	
		//bindAction();
	}
	
	sCreate.create = function(){
		var _this = this;
		//默认使用我的主题
		this.type = 'mySubject';
	
		//这里考虑下要不要传参指定dom;
		this.dom = $("#createSubject");
	
		//固定的id
		this.resDom = $("#nowRes");
	
		//把用户列表哪儿创建一下.
		//console.log(striker.user);	
		var manage = new striker.user.manage('manageArea');
		this.manage = manage;
		this.label = window.striker.label;
	
		this.dom.on('show.bs.modal', function (e) {
			//striker.user.addDefManage();
			manage.init();
		});
	
		this.dom.on('hide.bs.modal', function (e) {
			//striker.user.addDefManage();
			_this.resDom.html('').hide();
			_this.manage.clear();
			_this.label.clear();
		})	
	
	//资源列表
		this.resList = [],
		this.resMap = {};
	
		//当前被选中的元素
		this._selectDom;
	
		this.bindAction();
	}
	
	sCreate.create.prototype.changeType = function(type){
		this.type = 'type'
	}
	
	sCreate.create.prototype.removeRes = function(e){
		var target = $(e.target),
			p = target.parent();
	
		var id = p.data('id');
		if(id){
			delete this.resMap[id];
			p.remove();
			if(this.resDom.find('.tag').length === 0){
				this.resDom.hide();
			}		
		}
	}
	
	//取选择的资源
	sCreate.create.prototype.getResList = function(){
		var list = [];
		for(var i in this.resMap){
			list.push(this.resMap[i].id);
		}
		return list;
	}
	
	//取选中的标签
	sCreate.create.prototype.getLabelList = function(){
		return this.label.getLabelList();
	}
	
	//取选中的管理远
	sCreate.create.prototype.getManageList = function(){
		return this.manage.getManageList();
	}
	
	
	
	sCreate.create.prototype.bindAction = function(param,cb){
		var _this = this;
		//资源上传完成的通知
		window.uploadComp = function(d){
			if(d.code === 0){
				_this.resList.push(d.data.id);
				_this.resMap[d.data.id] = d.data;
	
				var html = tmpl.rlist({
					list : [d.data]
				});
				_this.resDom.append(html).show();
			}
		}
	
		//触发上传
		$("#cfileName").bind('change',function(e){
			var target = $(e.target);
	
			if(target.val() !== ''){
				$("#cfileForm").submit();
			}
		})	
	
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action'),
				type = target.data('type');
	
			_this._selectDom = target;
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
				return;
			}
	
			if(type === 'submit'){
				var tit = $("#subjectTitle").val(),
					mark = $("#subjectMark").val(),
					open = $("#subjectOpen").prop('checked')?1:0,
					guest = $("#subjectGuest").prop('checked')?1:0;
	
				// var mlist = [];
				// $("#nowManage .tag").each(function(e){
				// 	var target = $(e.target),
				// 		id = target.data('id');
				// 	if(id){
				// 		mlist.push(id);
				// 	}
				// });
	
				// var llist = [];
				// $("#nowSubLabel .tag").each(function(e){
				// 	var target = $(e.target),
				// 		id = target.data('id');
				// 	if(id){
				// 		llist.push(id);
				// 	}				
				// })
	
				if(tit == ''){
					alert('还没有填写标题');
					return;
				}
	
				var param = {
					title : tit,
					mark : mark,
					private : open,
					guest : guest,
					members : _this.getManageList(),
					subjectLabels : _this.getLabelList(),
					articleLabels : [],
					resources : _this.getResList()
				}
	
				if(param.title !== '' && param.mark !== ''){
					cgi.create(param,function(res){
						if(res.code === 0){
							_this.dom.modal('hide');
							
							var html = tmpl.list({
								list : [res.data]
							});
							$("#mySubject").prepend(html);
						}
					});
				}
			}
	
		});
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(8),
		cgi,
		tmpl,
		nowSubId = 0,
		loading = false;
		start = 0,
		limit = 20;
	
	module.exports = aList;
	var listDom = $("#articleList");
	
	aList.init = function(id,module,tmp){
		nowSubId = id;
		cgi = module;
		tmpl = tmp;
	
		new article();
	
		// aList.search({
		// 	start : start,
		// 	limit : limit,
		// 	subjectId : nowSubId
		// })
	}
	
	var article = function(){
		this.dom = $("#articleList");
		this.start = 0,
		this.limit = 20;
		this.total = 0;
		this.length = 0;
		this.end = false;
		this.loading = false;
		this.subid = nowSubId;
	
		this.bindAction();
		this.search();
	}
	
	//计算图片的个数
	article.prototype.getimg = function(data){
		var num = 0;
		if(data){
			for(var i =0,l=data.length;i<l;i++){
				var item = data[i];
				if(item.type === 1){
					num++;
				}
			}
		}
		return num;
	}
	
	
	article.prototype.checkData = function(data){
		var list = [];
		for(var i = 0,l=data.list.length;i<l;i++){
			var item = data.list[i];
			item.imgnum = this.getimg(item.resource);
			list.push(item);
		}
		data.list = list;
		return data;
	}
	
	//绑定事件
	article.prototype.bindAction = function(){
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
	
	//加载更多
	article.prototype.loadMore = function(){
		if(this.loading || this.end){
			return;
		}
		this.search({
			start : this.start,
			limit : this.limit,
			subjectId : this.subid
		});
	}
	
	//添加到前面
	article.prototype.prependToList = function(){
		
	}
	
	//拉帖子列表
	article.prototype.search = function(param){
		var _this = this;
		if(this.loading){
			return;
		}
		this.loading = true;
		if(!param){
			param = {
				start : this.start,
				limit : this.limit,
				subjectId : this.subid
			}
		}
	
		cgi.search(param,function(res){
			
			if(res.code === 0){
				_this.total = res.data.total;
				_this.length += res.data.list.length;
				_this.start += _this.limit;
				_this.loading = false;
	
				var data = _this.checkData(res.data);
				console.log(data);
				var html = tmpl.list(data);
				_this.dom.append(html);
				if(_this.length >= _this.total){
					_this.end = true;
				}
			}
		});	
	}
	
	//把新发布的帖子加到列表最前面
	aList.prependToList = function(param){
			var html = tmpl.list({list:[param]});
			listDom.prepend(html);
	}
	
	//加载更多数据
	/*
	aList.loadMore = function(){
		console.log(this.end);
		if(loading || this.end){
			return;
		}
		aList.search({
			start : start,
			limit : limit,
			subjectId : nowSubId
		})
	}
	
	
	
	//搜索数据
	aList.search = function(param){
		loading = true;
		cgi.search(param,function(res){
			if(res.code === 0){
				_this.total = res.total;
				var html = tmpl.list(res.data);
				start += limit;
				loading = false;
				listDom.append(html);
			}else{
	
			}
	
		});
	}
	*/

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(8),
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
	
	//注册和绑定事件
	function bindAction(){
		window.uploadComp = function(d){
			if(d.code === 0){
				resList.push(d.data.id);
			}
		}
	}
	
	//根据dom获取相关的参数.
	function getParam(target){
		var name = target.find('input[name=name]').val(),
			content = target.find('textarea[name=content]').val();
	
		var param = {
			title : name,
			content : content,
			subjectId : nowSubId,
			labels : [1,2]
		}
		if(resList.length > 0){
			param.resources = resList;
		}
		return param;
	}
	
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
		bindAction();
	}
	
	aPost.post = function(){
		this.pDom = $("#postArticle"); //底部发表框
		this.cDom = $("#createArticle"); //弹出发表框
		this.loading = false;
		this.target;
		this.bindAction();
	}
	
	aPost.post.prototype.bindFun = function(){
	
	};
	
	
	aPost.post.prototype.bindAction = function(){
	
		var _this = this;
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
			console.log(target.val());
			if(target.val() !== ''){
				$("#fileForm").submit();
			}
		})	
	
		$("#cfileName").bind('change',function(e){
			var target = $(e.target);
	
			if(target.val() !== ''){
				$("#cfileForm").submit();
			}
		})	
	}
	
	aPost.post.prototype.clear = function(){
		this.pDom.find('input').val('');
		this.pDom.find('textarea').val('');
	
		this.cDom.find('input').val('');
		this.cDom.find('textarea').val('');	
	
		resList = [];
	}
	
	aPost.post.prototype.post = function(){
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
		var param = getParam(pTarget);
		var _this = this;
		cgi.create(param,function(res){
			_this.loading = false;
			if(pTarget.hasClass('modal')){
				aPost.reset(pTarget);
			}
			if(res.code === 0){
				console.log(striker.article);
				striker.article.appendToList(res.data);
			}
			_this.clear();
		});	
	}
	
	
	//发布一个内容
	/*
	aPost.create = function(target){
		if(loading){
			return;
		}
		var pt = target.data('target');
		var pTarget = $(pt);
		if(pTarget.length === 0){
			return;
		}
		var param = getParam(pTarget);
			
		cgi.create(param,function(res){
			loading === false;
			if(pTarget.hasClass('modal')){
				aPost.reset(pTarget);
			}
			if(res.code === 0){
				striker.article.appendToList(res.data);
			}
		});
	}
	*/
	
	//重置一个from
	aPost.reset = function(target){
		var pTarget = $(target.data('target'));
		if(pTarget.length === 0){
			return;
		}
		resetFrom(pTarget);
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	function emptyFun(res){
		console.log(res);
	}
	
	function post(url,param,callback,error){
		if(typeof callback !== 'function'){
			callback = emptyFun;
		}	
		if(typeof error !== 'function'){
			error = callback;
		}
		ajax({
			url : url,
			type : 'POST',
			data : param,
		},callback);
	
	}
	
	function get(url,param,callback,error){
		if(typeof callback !== 'function'){
			callback = emptyFun;
		}	
		if(typeof error !== 'function'){
			error = callback;
		}
		ajax({
			url : url,
			type : 'GET',
			data : param,
		},callback);
	}
	
	function ajax(opt,callback,error){
		var type = opt.type || 'GET',
			url = opt.url,
			data = opt.data;
	
		if(typeof error !== 'function'){
			error = callback;
		}
	
		$.ajax({
			type : type,
			url : url,
			data : data,
			success : function(res){
				callback(res);
			},
			error : function(res){
				error(res);
			}
		})
	}
	
	module.exports = {
		ajax : ajax,
		post : post,
		get : get
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '      <span><span class="user"></span><%-name%></span>\r\n      <span class="msg"></span>\r\n      <span class="dialog"></span>\r\n      <span class="search"></span>\r\n      <span class="memu"></span>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push('      <span><span class="user"></span>', (__stack.lineno = 1, name), '</span>\n      <span class="msg"></span>\n      <span class="dialog"></span>\n      <span class="search"></span>\n      <span class="memu"></span>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<div class="input-group">\r\n    <input type="text" class="form-control" placeholder="输入用户名称搜索" name="managekey" data-keyup="searchbtn">\r\n    <span class="input-group-btn">\r\n      <button class="btn btn-default" type="button" data-action="searchbtn">搜索</button>\r\n    </span>\r\n</div> \r\n<div class="manage-area">\r\n  <ul>\r\n  <%\r\n    for(var i = 0,l=list.length;i<l;i++){\r\n      item = list[i];\r\n  %> \r\n      <li id="user<%-item.id%>" class="user<%-item.id%>" data-id="<%-item.id%>" data-action="selectone" data-name="<%-item.name%>"><%-item.name%></li>\r\n  <%}%>\r\n  </ul>\r\n</div>  ',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push('<div class="input-group">\n    <input type="text" class="form-control" placeholder="输入用户名称搜索" name="managekey" data-keyup="searchbtn">\n    <span class="input-group-btn">\n      <button class="btn btn-default" type="button" data-action="searchbtn">搜索</button>\n    </span>\n</div> \n<div class="manage-area">\n  <ul>\n  ');
	                __stack.lineno = 9;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    item = list[i];
	                    buf.push(' \n      <li id="user', (__stack.lineno = 13, item.id), '" class="user', (__stack.lineno = 13, item.id), '" data-id="', (__stack.lineno = 13, item.id), '" data-action="selectone" data-name="', (__stack.lineno = 13, item.name), '">', (__stack.lineno = 13, item.name), "</li>\n  ");
	                    __stack.lineno = 14;
	                }
	                buf.push("\n  </ul>\n</div>  ");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<span class="tag label label-info" id="manage<%-id%>" data-id="<%-id%>">\r\n	<%-name%><span data-action="remove"></span>\r\n</span>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push('<span class="tag label label-info" id="manage', (__stack.lineno = 1, id), '" data-id="', (__stack.lineno = 1, id), '">\n	', (__stack.lineno = 2, name), '<span data-action="remove"></span>\n</span>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <header class="header-top">\r\n      <div class="header-left">\r\n        <span class="fui-user"><%-proText%></span>\r\n        <span class=""><a class="btn btn-block btn-lg btn-primary fui-plus"  data-toggle="modal" data-target="#createSubject" data-action="create">创建主题</a></span>\r\n      </div>\r\n\r\n      <div class="header-right">\r\n        共<span id="<%-proName%>Num">20</span>个主题 <a class="pre-page" data-action="pre">上一页</a> <a class="next-page" data-action="next">下一页</a>\r\n        <div class="btn-group">\r\n          <a class="btn btn-primary time active" data-action="orderbytime">按创建时间排序</a>\r\n          <a class="btn btn-primary update"  data-action="orderbyupdate">按更新时间排序</a>\r\n        </div>\r\n        <span class="arrow-down" data-action="close"></span>\r\n      </div>     \r\n    </header>\r\n\r\n    <div class="article-list" id="<%-proName%>">\r\n                 \r\n    </div>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push('    <header class="header-top">\n      <div class="header-left">\n        <span class="fui-user">', (__stack.lineno = 3, proText), '</span>\n        <span class=""><a class="btn btn-block btn-lg btn-primary fui-plus"  data-toggle="modal" data-target="#createSubject" data-action="create">创建主题</a></span>\n      </div>\n\n      <div class="header-right">\n        共<span id="', (__stack.lineno = 8, proName), 'Num">20</span>个主题 <a class="pre-page" data-action="pre">上一页</a> <a class="next-page" data-action="next">下一页</a>\n        <div class="btn-group">\n          <a class="btn btn-primary time active" data-action="orderbytime">按创建时间排序</a>\n          <a class="btn btn-primary update"  data-action="orderbyupdate">按更新时间排序</a>\n        </div>\n        <span class="arrow-down" data-action="close"></span>\n      </div>     \n    </header>\n\n    <div class="article-list" id="', (__stack.lineno = 17, proName), '">\n                 \n    </div>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <%\r\n    	for(var i = 0,l=list.length;i<l;i++){\r\n    		var item = list[i];\r\n    %>\r\n      <dl class="art-list">\r\n        <dt><a href="/info.html?id=<%-item.id%>"><%-item.title%></a></dt>\r\n        <dd>创建人 <%-item.creatorName%> 创建时间 <%-striker.util.formatTime(item.createTime)%> 最近更新 <%-striker.util.formatTime(item.updateTime)%> 主题资源 86 <%-item.memberCount%>个成员 <%-item.updator%>个帖子 <%-item.resourceCount%>个资源</dd>\r\n      </dl> \r\n    <%}%>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("    ");
	                __stack.lineno = 1;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n      <dl class="art-list">\n        <dt><a href="/info.html?id=', (__stack.lineno = 6, item.id), '">', (__stack.lineno = 6, item.title), "</a></dt>\n        <dd>创建人 ", (__stack.lineno = 7, item.creatorName), " 创建时间 ", (__stack.lineno = 7, striker.util.formatTime(item.createTime)), " 最近更新 ", (__stack.lineno = 7, striker.util.formatTime(item.updateTime)), " 主题资源 86 ", (__stack.lineno = 7, item.memberCount), "个成员 ", (__stack.lineno = 7, item.updator), "个帖子 ", (__stack.lineno = 7, item.resourceCount), "个资源</dd>\n      </dl> \n    ");
	                    __stack.lineno = 9;
	                }
	                buf.push("");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">主题资源 86 <%-memberCount%>个成员 209个帖子 1024个资源 我的发帖/回复 99/12</dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="create"><span class="post"></span>发贴</a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn" data-action="follow"><span class="follow"></span>关注</a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage"><span class="manage"></span>管理</a></span>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          自动刷新: <input type="checkbox" data-action="subject.autorefresh" />\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("        <dt>", (__stack.lineno = 1, title), '</dt>\n        <dd class="artice-use">创建人 ', (__stack.lineno = 2, creatorName), " 创建时间 ", (__stack.lineno = 2, striker.util.formatTime(createTime)), " 最近更新 ", (__stack.lineno = 2, striker.util.formatTime(updateTime)), '</dd>\n        <dd class="artice-use">主题资源 86 ', (__stack.lineno = 3, memberCount), '个成员 209个帖子 1024个资源 我的发帖/回复 99/12</dd>\n        <dd class="artice-act-btn">\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="create"><span class="post"></span>发贴</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn" data-action="follow"><span class="follow"></span>关注</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          自动刷新: <input type="checkbox" data-action="subject.autorefresh" />\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n	var item = list[i];\r\n%>\r\n	<span class="tag label label-info" data-id="<%-item.id%>">\r\n		<%-item.name%><span data-action="removeRes"></span>\r\n	</span>\r\n<%}%>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("");
	                __stack.lineno = 1;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n	<span class="tag label label-info" data-id="', (__stack.lineno = 4, item.id), '">\n		', (__stack.lineno = 5, item.name), '<span data-action="removeRes"></span>\n	</span>\n');
	                    __stack.lineno = 7;
	                }
	                buf.push("");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <article class="artice-one">\r\n    <aside class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></aside>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creator%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="fui-check-circle">赞</span> <span class="fui-chat">回复</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><%-item.title%></dt>\r\n        <dl>\r\n          <%-item.content%>\r\n        </dl>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </article>\r\n<%}%>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("");
	                __stack.lineno = 1;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n  <article class="artice-one">\n    <aside class="artice-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</aside>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creator), "   最后回复 ", (__stack.lineno = 7, item.updator), '</div>\n      <div class="info-action">\n        <span class="fui-check-circle">赞</span> <span class="fui-chat">回复</span>\n      </div>          \n      <dl class="artice-dl">\n        <dt>', (__stack.lineno = 12, item.title), "</dt>\n        <dl>\n          ", (__stack.lineno = 14, item.content), "\n        </dl>\n        ");
	                    __stack.lineno = 16;
	                    if (item.imgnum > 0) {
	                        buf.push('\n        <div class="artice-img-list">\n          ');
	                        __stack.lineno = 18;
	                        var first = true;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 26, obj.id), '" width="200" />\n              ');
	                                __stack.lineno = 27;
	                                if (first) {
	                                    first = false;
	                                    buf.push("\n              <span>共", (__stack.lineno = 31, item.imgnum), "张</span>\n              ");
	                                    __stack.lineno = 32;
	                                }
	                                buf.push("\n            </div>\n          ");
	                                __stack.lineno = 34;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 36;
	                    }
	                    buf.push("\n    </div>\n  </article>\n");
	                    __stack.lineno = 39;
	                }
	                buf.push("");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\n	for(var i = 0,l=list.length;i<l;i++){\r\n		var item = list[i];\r\n%>\r\n<li data-id="<%-item.id%>" data-name="<%-item.name%>" data-action="select">\r\n	<%-item.name%>\r\n</li>\r\n<%}%>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("");
	                __stack.lineno = 1;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n<li data-id="', (__stack.lineno = 5, item.id), '" data-name="', (__stack.lineno = 5, item.name), '" data-action="select">\n	', (__stack.lineno = 6, item.name), "\n</li>\n");
	                    __stack.lineno = 8;
	                }
	                buf.push("");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\n	for(var i = 0,l=list.length;i<l;i++){\r\n		var item = list[i];\r\n%>\r\n<span class="tag label label-info label<%-item.id%>" data-id="<%-item.id%>">\r\n	<%-item.name%><span data-action="remove"></span>\r\n</span>\r\n<%}%>',
	        filename: undefined
	    };
	    function rethrow(err, str, filename, lineno) {
	        var lines = str.split("\n"), start = Math.max(lineno - 3, 0), end = Math.min(lines.length, lineno + 3);
	        var context = lines.slice(start, end).map(function(line, i) {
	            var curr = i + start + 1;
	            return (curr == lineno ? " >> " : "    ") + curr + "| " + line;
	        }).join("\n");
	        err.path = filename;
	        err.message = (filename || "ejs") + ":" + lineno + "\n" + context + "\n\n" + err.message;
	        throw err;
	    }
	    try {
	        var buf = [];
	        with (locals || {}) {
	            (function() {
	                buf.push("");
	                __stack.lineno = 1;
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n<span class="tag label label-info label', (__stack.lineno = 5, item.id), '" data-id="', (__stack.lineno = 5, item.id), '">\n	', (__stack.lineno = 6, item.name), '<span data-action="remove"></span>\n</span>\n');
	                    __stack.lineno = 8;
	                }
	                buf.push("");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjYwMDhlYjEyYzk2OGE5MGM0ZmY/NWJiYyoqIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci91c2VyLmpzP2VjNGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcz82NWNjIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL2FydGljbGUuanM/ZWU1NyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9kYXRhLmpzPzlkZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvbGlzdC5qcz9lOGNkIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2luZm8uanM/YTZkZiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9jcmVhdGUuanM/MzdmOCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9saXN0LmpzPzhhYjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvcG9zdC5qcz85NDJlIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0Iiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9zaXplLmVqcz84ZGVjIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9saXN0LmVqcz80ZWYxIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9oZWFkLmVqcz84Nzc3Iiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanM/YzUzNyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanM/M2ZhMiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxROzs7Ozs7QUNqRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDO0FBQ0EsNkNBQTRDO0FBQzVDLHlDOztBQUVBLDJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztB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QUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMLGdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOzs7QUFHQSxvQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsNEI7O0FBRUE7QUFDQTtBQUNBLHNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLCtCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDaFJBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCLGlCQUFnQjtBQUNoQixlQUFjO0FBQ2QsaUJBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE07QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxNQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUztBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUEsR0FBRTtBQUNGLEU7Ozs7OztBQzFRQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsbUNBQWtDLElBQUk7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFU7QUFDQSxNQUFLLEU7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQSx5QkFBd0IsYUFBYTtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUEsR0FBRTtBQUNGO0FBQ0EsRzs7Ozs7O0FDN0tBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQixrQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxJQUFJLEtBQUsseUJBQXlCLHdIQUF3SDtBQUM3TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBiNjAwOGViMTJjOTY4YTkwYzRmZlxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxuXHRzdWJqZWN0ID0gcmVxdWlyZSgnLi9zdWJqZWN0L3N1YmplY3QnKSxcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9hcnRpY2xlJyksXG5cdGxhYmVsID0gcmVxdWlyZSgnLi9sYWJlbC9sYWJlbCcpO1xuXG5cbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XG5cblxuLy/kuovku7bpgJrnn6Us55So5oi36LWE5paZ5bey57uP5Yqg6L295a6M5oiQXG5mdW5jdGlvbiB1c2VyTG9hZChlLGQpe1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteVN1YmplY3QnKTtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlGb2xsb3cnKTtcblx0d2luZG93LnN0cmlrZXIubGFiZWwgPSBuZXcgbGFiZWwubGFiZWwoJ2xhYmVsQXJlYScpO1xuXHR3aW5kb3cuc3RyaWtlci5jcmVhdGVTdWJqZWN0ID0gbmV3IHN1YmplY3QuY3JlYXRlKCk7XG5cdC8vc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xuXHQvLyBzdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG5cdC8vIHN1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcbn1cblxuLy/kuovku7bpgJrnn6Us5Li76aKY5bey57uP5Yqg6L295a6M5oiQXG5mdW5jdGlvbiBzdWJqZWN0TG9hZChlLGQpe1xuXHRjb25zb2xlLmxvZyhlLGQpO1xufVxuXG52YXIgaGFuZGxlcnMgPSB7XG5cdCd1c2VyTG9hZFN1YicgOiB1c2VyTG9hZCxcblx0J3N1YmplY3RMb2FkJyA6IHN1YmplY3RMb2FkXG59XG5cbmZvcih2YXIgaSBpbiBoYW5kbGVycyl7XG5cdFN0cmlrZXIuYmluZChpLGhhbmRsZXJzW2ldKTtcbn1cblxuLy/lhajlsYDkuovku7bnu5HlrppcbmZ1bmN0aW9uIGJpbmRBY3Rpb24oKXtcblx0JCgnYm9keScpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cdFx0aWYoYWN0aW9uKXtcblx0XHRcdHZhciBhY3RNYXAgPSBhY3Rpb24uc3BsaXQoJy4nKTtcblx0XHRcdHZhciBtb2QgPSBhY3RNYXBbMF0sXG5cdFx0XHRcdGZ1biA9IGFjdE1hcFsxXTtcblx0XHRcdGlmKGFjdE1hcC5sZW5ndGggPT09IDIgJiYgc3RyaWtlclttb2RdW2Z1bl0pe1xuXG5cdFx0XHRcdHN0cmlrZXJbbW9kXVtmdW5dKHRhcmdldCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpe1xuXHRzdWJqZWN0LmluaXQoJ2luZGV4Jyk7XG5cdC8vYXJ0aWNsZS5pbml0KCdpbmRleCcpO1xuXHR1c2VyLmluaXQoKTtcblx0bGFiZWwuaW5pdCgpO1xuXG5cdHN0cmlrZXIuc3ViamVjdCA9IHN1YmplY3Q7XG5cdHN0cmlrZXIuYXJ0aWNsZSA9IGFydGljbGU7XG5cdHN0cmlrZXIudXNlciA9IHVzZXI7XG5cblx0YmluZEFjdGlvbigpO1xufVxuXG5pbml0KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIGtlZXAgaXQgaWYgdXNpbmcgdXJsIG1kNSByZXYgcmVwbGFjZW1lbnQgaW4gamF2YXNjcmlwdFxuY29uc29sZS5sb2coJ2dsb2JhbCBpcyBsb2FkJyk7XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5mbG9vcigobm93IC0gYXRpbWUpLzEwMDApO1xuICAgIGlmKGM8NjApe1xuICAgICAgICByZXR1cm4gJzHliIbpkp/ku6XlhoUnO1xuICAgIH1lbHNlIGlmKGM8MzYwMCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGMvMzYwMCkrJ+WIhumSn+WJjSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKjI0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnVzZXIsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXHJcblx0dXNlck1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyksXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bmF2IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvdXNlcl9uYXYuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKVxyXG59XHJcblxyXG52YXIgVXNlciA9IHt9LFxyXG5cdF90aGlzID0gVXNlcjtcclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG5cclxuLy/lr7nlpJbmj5DkvpvnmoTmjqXlj6Ncclxud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XHJcblxyXG4vL+euoeeQhuWRmOiuvue9ruaYvuekuuetieetiVxyXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xyXG4vLyBVc2VyLmFkZG1hbmFnZSA9IHVzZXJNYW5hZ2Uuc2hvdztcclxuXHJcbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XHJcblxyXG5Vc2VyLmdldE15SW5mbyA9IGZ1bmN0aW9uKGNiKXtcclxuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLm15SW5mbyA9IHJlcy5kYXRhO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcclxuXHRcdFx0JChcIiN1c2VyTmF2XCIpLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZEFydCcscmVzLmNvZGUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcmxvYWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5Li76aKYXHJcbnZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuc3ViamVjdCxcclxuXHRzdWJqZWN0TGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG5cdHN1YmplY3RJbmZvID0gcmVxdWlyZSgnLi9pbmZvJyksXHJcblx0c3ViamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlJyk7XHJcblxyXG4vL+aooeadv+W8leeUqFxyXG52YXIgdG1wbCA9IHtcclxuXHRhcmVhIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3Qvc2l6ZS5lanMnKSxcclxuXHRtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tYW5hZ2UuZWpzJyksXHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2xpc3QuZWpzJyksXHJcblx0aGVhZCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2hlYWQuZWpzJyksXHRcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJyksXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKVxyXG59O1xyXG5cclxudmFyIHByb01hcCA9IHtcclxuXHRteVN1YmplY3QgOiAn5oiR5Yib5bu655qEJyxcclxuXHRteUZvbGxvdyA6ICfmiJHlhbPms6jnmoQnLFxyXG5cdG15SW52aXRlIDogJ+mCgOivt+aIkeeahCcsXHJcblx0b3BlbiA6ICflhazlvIDkuLvpopgnLFxyXG5cdGZpbGUgOiAn5b2S5qGj5Li76aKYJ1xyXG59XHJcblxyXG52YXIgU3ViamVjdCA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdWJqZWN0O1xyXG5cclxuLyrlrprkuYnpgJrnlKjlj4LmlbAqL1xyXG52YXIgc3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5TdWJqZWN0LnNlYXJjaCA9IHN1YmplY3RMaXN0LnNlYXJjaDtcclxuXHJcblN1YmplY3QuY3JlYXRlID0gc3ViamVjdENyZWF0ZS5jcmVhdGU7XHJcblxyXG5TdWJqZWN0LmluZm8gPSBzdWJqZWN0SW5mby5pbmZvO1xyXG5cclxuU3ViamVjdC5hcmVhID0gZnVuY3Rpb24oZG9tbmFtZSl7XHJcblx0dmFyIHByb05hbWUgPSBkb21uYW1lLFxyXG5cdFx0ZG9tID0gJCgnIycrZG9tbmFtZSsnQmxvY2snKTtcclxuXHR0aGlzLnByb05hbWUgPSBkb21uYW1lO1xyXG5cdHRoaXMuZG9tID0gZG9tO1xyXG5cdHRoaXMucGFnZSA9IDA7ICAgLy/lvIDlp4vpobXnoIFcclxuXHR0aGlzLmFsbFBhZ2UgPSAwO1xyXG5cdHRoaXMubGltaXQgPSA1OyAvL+S4gOmhteeahOadoeaVsFxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7Ly8wIOaMieaXtumXtOaOkuW6jywxIOaMieabtOaWsOaXtumXtOaOkuW6j1xyXG5cdHRoaXMubGlzdERvbTsgLy/liJfooajnmoTkvY3nva5cclxuXHR2YXIgaHRtbCA9IHRtcGwuYXJlYSh7XHJcblx0XHRwcm9UZXh0IDogcHJvTWFwW2RvbW5hbWVdLFxyXG5cdFx0cHJvTmFtZSA6IGRvbW5hbWVcclxuXHR9KTtcclxuXHRkb20uaHRtbChodG1sKTtcclxuXHR0aGlzLmxpc3REb20gPSAkKCcjJytkb21uYW1lKTtcclxuXHR0aGlzLm51bURvbSA9ICQoXCIjXCIrZG9tbmFtZSsnTnVtJyk7XHJcblx0dGhpcy5wcmVQYWdlID0gZG9tLmZpbmQoJy5wcmUtcGFnZScpO1xyXG5cdHRoaXMubmV4dFBhZ2UgPSBkb20uZmluZCgnLm5leHQtcGFnZScpO1x0XHJcblx0dGhpcy50aW1lRG9tID0gZG9tLmZpbmQoJy50aW1lJyk7XHJcblx0dGhpcy51cGRhdGVEb20gPSBkb20uZmluZCgnLnVwZGF0ZScpO1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuLy/kuIvkuIDpobVcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPCB0aGlzLmFsbFBhZ2UtMSl7XHJcblx0XHR0aGlzLnBhZ2UrKztcclxuXHRcdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcblxyXG4vL+S4iuS4gOmhtVxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLnByZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlID4gMCl7XHJcblx0XHR0aGlzLnBhZ2UtLTtcclxuXHRcdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuLy/miZPlvIDmlLbotbdcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdGlmKHRoaXMubGlzdERvbS5oYXNDbGFzcygnaGlkZScpKXtcclxuXHRcdHRoaXMubGlzdERvbS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5saXN0RG9tLmFkZENsYXNzKCdoaWRlJyk7XHJcblx0fVxyXG59XHJcblxyXG4vL+aMieWPkeihqOaXtumXtOaOkuW6j1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHQvLyBvcmRlcmJ5OiB1cGRhdGVUaW1lIC8gY3JlYXRlVGltZVxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7XHJcblx0dGhpcy50aW1lRG9tLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLnVwZGF0ZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+aMieabtOaWsOaXtumXtOaOkuW6j1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMub3JkZXIgPSAndXBkYXRlVGltZSc7XHJcblx0dGhpcy51cGRhdGVEb20uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMudGltZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHRcclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHRcclxufVxyXG5cclxuLy/mlrDlu7rkuLvpophcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKCF0aGlzLmNyZWF0ZVN1YmplY3Qpe1xyXG5cdFx0dGhpcy5jcmVhdGVTdWJqZWN0ID0gd2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdDtcclxuXHR9XHJcblx0aWYoIXRoaXMubGFiZWwpe1xyXG5cdFx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cdH1cclxuXHR0aGlzLmNyZWF0ZVN1YmplY3QuY2hhbmdlVHlwZSh0aGlzLnByb05hbWUpO1xyXG5cdC8vdGhpcy5sYWJlbC5pbml0KCk7XHJcbn1cclxuXHJcbi8v5Yik5pat57+76aG15piv5ZCm5Y+v5Lul54K55Ye7XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2hlY2tQYWdlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPD0gMSl7XHJcblx0XHR0aGlzLnByZVBhZ2UuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZih0aGlzLmFsbFBhZ2UgPT09IDEpe1xyXG5cdFx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOmZhbHNlfSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1lbHNlIGlmKHRoaXMucGFnZSA+PSB0aGlzLmFsbFBhZ2UtMSl7XHJcblx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmKHRoaXMuYWxsUGFnZSA9PT0gMSl7XHJcblx0XHRcdHRoaXMucHJlUGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5wcmVQYWdlLnByb3Aoe2Rpc2FibGVkOmZhbHNlfSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/kv67mlLnmgLvmlbBcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jaGFuZ2VOdW0gPSBmdW5jdGlvbihudW0pe1xyXG5cdHRoaXMuYWxsUGFnZSA9IE1hdGguY2VpbChudW0vdGhpcy5saW1pdCk7XHJcblx0dGhpcy5udW1Eb20udGV4dChudW0pO1xyXG59XHJcblxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cclxuXHR2YXIgZnVubmFtZSA9ICdzZWFyY2gnO1xyXG5cdGlmKHRoaXMucHJvTmFtZSA9PT0gJ215Rm9sbG93Jyl7XHJcblx0XHRmdW5uYW1lID0gJ2ZvbGxvd2luZyc7XHJcblx0fVxyXG5cclxuXHRjZ2lbZnVubmFtZV0ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmNoYW5nZU51bShyZXMuZGF0YS50b3RhbCk7XHJcblx0XHRcdF90aGlzLmNoZWNrUGFnZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKlxyXG7ogIPomZHliLDpppbpobXnu5PmnoTnmoTnibnmrormgKcs6L+Z6YeM5YiG5Z2X57uR5a6a5LqL5Lu2XHJcbiovXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG5TdWJqZWN0LmluaXQgPSBmdW5jdGlvbih0eXBlKXtcclxuXHRzdWJqZWN0TGlzdC5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG5cdHN1YmplY3RJbmZvLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdENyZWF0ZS5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L3N1YmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJylcclxufTtcclxuXHJcbnZhciBhcnRpY2xlTGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG5cdGFydGljbGVQb3N0ID0gcmVxdWlyZSgnLi9wb3N0Jyk7XHJcblxyXG52YXIgQXJ0aWNsZSA9IHt9XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGU7XHJcblxyXG5BcnRpY2xlLnNlYXJjaCA9IGFydGljbGVMaXN0LnNlYXJjaDtcclxuXHJcbkFydGljbGUubG9hZE1vcmUgPSBhcnRpY2xlTGlzdC5sb2FkTW9yZTtcclxuXHJcbkFydGljbGUuYXBwZW5kVG9MaXN0ID0gYXJ0aWNsZUxpc3QucHJlcGVuZFRvTGlzdDtcclxuXHJcbi8vQXJ0aWNsZS5wb3N0ID0gYXJ0aWNsZVBvc3QuY3JlYXRlO1xyXG5cclxuLy9BcnRpY2xlLnJlc2V0ID0gYXJ0aWNsZVBvc3QucmVzZXQ7XHJcblxyXG4vKiovXHJcblxyXG5BcnRpY2xlLmluaXQgPSBmdW5jdGlvbihpZCl7XHJcblx0YXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0YXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvYXJ0aWNsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sYWJlbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIExhYmVsID0ge30sXHJcblx0X3RoaXMgPSBMYWJlbDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9vbmUuZWpzJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0KCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIituYW1lKTtcclxuXHJcblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmFkZERvbSA9IHRoaXMuZG9tLmZpbmQoJy5hZGQtbGFiZWwtYXJlYScpO1xyXG5cdC8vIGlmKHR5cGUgPT09ICdzdWInKXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dTdWJMYWJlbCcpO1xyXG5cdC8vIH1lbHNle1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd0FydExhYmVsJyk7XHJcblx0Ly8gfVxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5idG5Eb20gPSB0aGlzLmFkZERvbS5maW5kKCcuYnRuJyk7XHJcblx0dGhpcy5pbnB1dERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcclxuXHJcblx0Ly/pu5jorqTmsqHmnInmoIfnrb5cclxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cclxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1x0XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvL1xyXG5cdC8vIHRoaXMubm93RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdC8vIFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0Ly8gXHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHQvLyBcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIHZhbCA9IHRoaXMuaW5wdXREb20udmFsKCk7XHJcblx0aWYodmFsICE9PSAnJyl7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdG5hbWUgOiB2YWxcclxuXHRcdH07XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLm1hcFtyZXMuZGF0YS5pZF0gPSByZXMuZGF0YTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XHJcblx0XHRcdFx0X3RoaXMubGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oZSl7XHJcblx0Ly8gL2NvbnNvbGUubG9nKHRoaXMuX3NlbGVjdERvbSk7XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cdH1cclxuXHQvL3RoaXMuYWRkRG9tLnNob3coKTtcclxuXHQvL3RoaXMubm93RG9tLnNob3coKTtcclxuXHJcblx0Ly9mdWktY3Jvc3NcclxuXHQvL2Z1aS1wbHVzXHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5saXN0KHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMCxsPXJlcy5kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xyXG5cdFx0XHRcdF90aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxyXG5cdH1cclxuXHJcblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdGlmKHRoaXMubm93RG9tLmZpbmQoJy5sYWJlbCcraWQpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lKHBhcmFtKTtcclxuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XHJcblx0Ly8gdGhpcy5ub3dEb20uZmluZChcIi50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHQvLyBcdGlmKGlkKXtcclxuXHQvLyBcdFx0bGlzdC5wdXNoKGlkKTtcclxuXHQvLyBcdH1cdFx0XHRcdFxyXG5cdC8vIH0pXHRcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLm5vd0RvbS5odG1sKCcnKS5oaWRlKCk7XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+WIoOmZpFxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRwLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuTGFiZWwuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKTtcclxuXHJcbnZhciBjZ2lQYXRoID0gJy9jZ2kvJztcclxudmFyIGNnaUxpc3QgPSB7XHJcblx0dXNlciA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKyd1c2VyL2xpc3QnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3VzZXIvaW5mbycsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKyd1c2VyL2NyZWF0ZSdcclxuXHR9LFxyXG5cdHN1YmplY3QgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydzdWJqZWN0L3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnc3ViamVjdC9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJyAvL+WFs+azqOWIl+ihqFxyXG5cdH0sXHJcblx0YXJ0aWNsZSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2FydGljbGUvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydhcnRpY2xlL2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRsYWJlbCA6IHtcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2xhYmVsL2NyZWF0ZScsXHJcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcclxuXHR9LFxyXG5cdGxvZ2luIDogY2dpUGF0aCsnYWNjb3VudC9sb2dpbicsXHJcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG52YXIgZW1wdHlGdW4gPSBmdW5jdGlvbihyZXMpe1xyXG5cclxufVxyXG5cclxuZGIubG9naW4gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sb2dvdXQsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdCA9IHt9O1xyXG5cclxuZGIuc3ViamVjdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3cgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3cscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93aW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3dpbmcscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmFydGljbGUgPSB7fTtcclxuXHJcbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzXG4gKiovIiwidmFyIERhdGEgPSB7fTtcclxuLypcclxu5pWw5o2u57yT5a2YXHJcbnVzZXIg55So5oi3XHJcbnN1YmplY3Qg5Li76aKYXHJcbmFydGljbGUg5biW5a2QXHJcbiovXHJcbkRhdGEudXNlciA9IHt9O1xyXG5EYXRhLnN1YmplY3QgPSB7fTtcclxuRGF0YS5hcnRpY2xlID0ge307XHJcbkRhdGEubGFiZWwgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEodHlwZSxrZXkpe1xyXG5cdHJldHVybiBEYXRhW3R5cGVdW2tleV0gfHwgbnVsbDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvZGF0YS9kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvL+eUqOaIt+WIl+ihqOaYvuekuuetieetiVxyXG52YXIgdU1hbmFnZSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyO1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0bWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVNYW5hZ2U7XHJcblxyXG4vL3ZhciBtYW5hZ2VEb20gPSAkKFwiI2FkZE1hbmFnZVwiKTsgLy/nrqHnkIblkZjorr7nva5kb207XHJcblxyXG4vL+mAieaLqeeuoeeQhuWRmOetieetieeahOS6i+S7tue7keWumlxyXG4vKlxyXG52YXIgbWFuYWdlQWN0aW9uID0ge1xyXG5cdHNlYXJjaCA6IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0XHR2YXIga2V5ID0gdGFyZ2V0LnZhbCgpO1xyXG5cdFx0aWYoa2V5ICE9PSAnJyl7XHJcblx0XHRcdG1hbmFnZUFjdGlvbi5zZWFyY2hidG4odGFyZ2V0KTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlYXJjaGJ0biA6IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0XHR2YXIga2V5ID0gJChcIiNzZWxlY3RPbmVNYW5hZ2VcIikudmFsKCk7XHJcblx0XHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcclxuXHRcdHZhciB1bGlzdCA9IFtdO1xyXG5cclxuXHRcdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0XHRtYW5hZ2VEb20uZmluZCgnbGknKS5zaG93KCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRmb3IodmFyIGkgPSAwLGwgPSBsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0XHR1bGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0XHRtYW5hZ2VEb20uZmluZCgnbGknKS5oaWRlKCk7XHJcblx0XHRpZih1bGlzdC5sZW5ndGg9PT0gMCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDAsbCA9IHVsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0JChcIiN1c2VyXCIrdWxpc3RbaV0pLnNob3coKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdHNlbGVjdHVzZXIgOiBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdFx0dmFyIGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRcdG5hbWUgPSB0YXJnZXQuZGF0YSgnbmFtZScpO1xyXG5cclxuXHRcdGlmKCQoXCIjbWFuYWdlXCIraWQpLmxlbmd0aD09PTApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRcdG5hbWUgOiBuYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0XHQkKFwiI25vd01hbmFnZVwiKS5hcHBlbmQoaHRtbCk7XHJcblx0XHR9XHJcblx0fVxyXG59O1xyXG4qL1xyXG5cclxuLy8gZnVuY3Rpb24gYmluZE1hbmFnZUFjdGlvbigpe1xyXG4vLyBcdG1hbmFnZURvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcbi8vIFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbi8vIFx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcbi8vIFx0XHRpZihhY3Rpb24gJiYgbWFuYWdlQWN0aW9uW2FjdGlvbl0pe1xyXG4vLyBcdFx0XHRtYW5hZ2VBY3Rpb25bYWN0aW9uXSh0YXJnZXQpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG5cclxuLy8gXHQkKFwiI3NlbGVjdE9uZU1hbmFnZVwiKS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcbi8vIFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcbi8vIFx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuLy8gXHRcdGlmKGFjdGlvbiAmJiBtYW5hZ2VBY3Rpb25bYWN0aW9uXSl7XHJcbi8vIFx0XHRcdG1hbmFnZUFjdGlvblthY3Rpb25dKHRhcmdldCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fSk7XHJcbi8vIH1cclxuXHJcbi8vIHVNYW5hZ2Uuc2hvdyA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcbi8vIFx0aWYoIW1hbmFnZUhhdmUpe1xyXG4vLyBcdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcbi8vIFx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcbi8vIFx0XHRcdG15IDogZGF0YS5teUluZm9cclxuLy8gXHRcdH0pO1xyXG4vLyBcdFx0bWFuYWdlRG9tLmh0bWwoaHRtbCk7XHJcbi8vIFx0XHRiaW5kTWFuYWdlQWN0aW9uKCk7XHJcbi8vIFx0fVxyXG4vLyB9XHJcblxyXG4vLyB1TWFuYWdlLmFkZERlZk1hbmFnZSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcbi8vIFx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcbi8vIFx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG4vLyBcdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuLy8gXHR9KTtcclxuLy8gXHQkKFwiI25vd01hbmFnZVwiKS5odG1sKGh0bWwpO1x0XHJcbi8vIH1cclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/lop7liqDnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5hZGREZWZNYW5hZ2UgPSBmdW5jdGlvbigpe1xyXG5cdFxyXG59XHJcblxyXG5tYW5hZ2UucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5riF56m65YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmxpc3REb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v6YCJ5Lit5LiA5Liq55So5oi3XHJcbm1hbmFnZS5wcm90b3R5cGUuc2VsZWN0b25lID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdG5hbWUgPSB0YXJnZXQuZGF0YSgnbmFtZScpO1xyXG5cclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdG5hbWUgOiBuYW1lXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIHNMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnN1YmplY3QsXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNMaXN0O1xyXG5cclxuc0xpc3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcbn1cclxuXHJcbnNMaXN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNiKXtcclxuXHRjZ2kuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogc3RhcnQsXHJcblx0XHRsaW1pdCA6IGxpbWl0XHJcblx0fSxjYik7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5ouJ5Li76aKY5YaF5a65XHJcbnZhciBzSW5mbyA9IHt9O1xyXG52YXIgY2dpLFxyXG5cdHRtcGw7XHJcbm1vZHVsZS5leHBvcnRzID0gc0luZm87XHJcblxyXG52YXIgc3ViRG9tID0gJChcIiNzdWJqZWN0SGVhZFwiKTtcclxudmFyIHN1YkFzaWRlRG9tID0gJChcIiNzdWJqZWN0QXNpZGVcIik7XHJcbnZhciBwb3N0QXJlYSA9ICQoXCIjcG9zdEFydGljbGVcIik7XHJcblxyXG5mdW5jdGlvbiBiaW5kQWN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbnNJbmZvLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG4vL+aLieWPluS4gOS4quS4u+mimOeahOWGheWuuVxyXG4vLyBzSW5mby5pbmZvID0gZnVuY3Rpb24oaWQsY2Ipe1xyXG4vLyBcdGNnaS5pbmZvKHtpZDppZH0sZnVuY3Rpb24ocmVzKXtcclxuLy8gXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuLy8gXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQocmVzLmRhdGEpO1xyXG4vLyBcdFx0XHRzdWJEb20uaHRtbChodG1sKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG5zSW5mby5pbmZvID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuc2lkID0gaWQ7XHJcblx0dGhpcy5kb20gPSBzdWJEb207XHJcblx0dGhpcy5hc2lkZURvbSA9IHN1YkFzaWRlRG9tO1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMuZm9sbG93QnRuOyAvL+WFs+azqOaMiemSrlxyXG5cdHRoaXMubWFuYWdlQnRuOyAvL+euoeeQhuaMiemSrlxyXG5cdHRoaXMudGltZUJ0bjsgICAvL+aMieaXtumXtOaOkuW6j1xyXG5cdHRoaXMudXBkYXRlQnRuOyAvL+aMieabtOaWsOaXtumXtOaOkuW6j1xyXG59XHJcblxyXG5zSW5mby5pbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHRcclxufVxyXG5cclxuLy/mi4nljZXkuKrluJblrZBcclxuc0luZm8uaW5mby5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy5zaWQ7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuaW5mbyh7aWQ6aWR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmZvbGxvd0J0biA9IF90aGlzLmRvbS5maW5kKCcuZm9sbG93LWJ0bicpO1xyXG5cdFx0XHRfdGhpcy5tYW5hZ2VCdG4gPSBfdGhpcy5kb20uZmluZCgnLm1hbmFnZS1idG4nKVxyXG5cdFx0XHRfdGhpcy50aW1lQnRuID0gX3RoaXMuZG9tLmZpbmQoJy50aW1lLWJ0bicpXHJcblx0XHRcdF90aGlzLnVwZGF0ZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudXBkYXRlLWJ0bicpXHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG4vL+WFs+azqOWNleS4quW4luWtkFxyXG5zSW5mby5pbmZvLnByb3RvdHlwZS5mb2xsb3cgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMuc2lkXHJcblx0XHRmb2xsb3cgPSAxO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdC8v5Yik5pat5piv5ZCm5bey57uPZm9sbG935LqGLlxyXG5cdGlmKHRoaXMuZm9sbG93QnRuLmhhc0NsYXNzKCdmb2xsb3dlZCcpKXtcclxuXHRcdGZvbGxvdyA9IDA7XHJcblx0fVxyXG5cclxuXHRjZ2kuZm9sbG93KHtzdWJqZWN0SWQ6aWQsaXNGb2xsb3c6Zm9sbG93fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihmb2xsb3cpe1xyXG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5hZGRDbGFzcygnZm9sbG93ZWQnKS5odG1sKCflt7LlhbPms6gnKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMuZm9sbG93QnRuLnJlbW92ZUNsYXNzKCdmb2xsb3dlZCcpLmh0bWwoJ+WFs+azqCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5Li76aKY5Yib5bu6LOWIoOmZpOetieaTjeS9nFxyXG52YXIgZGF0YTtcclxudmFyIHNDcmVhdGUgPSB7fTtcclxudmFyIGNnaSxcclxuXHR0bXBsO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNDcmVhdGU7XHJcblxyXG4vLyB2YXIgY3JlYXRlRG9tID0gJChcIiNjcmVhdGVTdWJqZWN0XCIpLFxyXG4vLyBcdG5vd01hbmFnZURvbSA9ICQoXCIjbm93TWFuYWdlXCIpO1xyXG5cclxuXHJcbi8qXHJcbmZ1bmN0aW9uIGJpbmRBY3Rpb24oKXtcclxuXHRjcmVhdGVEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyksXHJcblx0XHRcdHJvbGUgPSB0YXJnZXQuZGF0YSgncm9sZScpLFxyXG5cdFx0XHR0eXBlID0gdGFyZ2V0LmRhdGEoJ3R5cGUnKTtcclxuXHJcblx0XHRpZihhY3Rpb24pe1xyXG5cdFx0XHR2YXIgYW1hcCA9IGFjdGlvbi5zcGxpdCgnLScpO1xyXG5cclxuXHRcdFx0aWYoYW1hcC5sZW5ndGggPT09IDIgJiYgd2luZG93LnN0cmlrZXJbYW1hcFswXV1bYW1hcFsxXV0pe1xyXG5cdFx0XHRcdHdpbmRvdy5zdHJpa2VyW2FtYXBbMF1dW2FtYXBbMV1dKHRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYocm9sZSl7XHJcblx0XHRcdHRhcmdldC5wYXJlbnRzKCcudGFnJykucmVtb3ZlKCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHR5cGUgPT09ICdzdWJtaXQnKXtcclxuXHRcdFx0dmFyIHRpdCA9ICQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG1hcmsgPSAkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG9wZW4gPSAkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnKT8xOjAsXHJcblx0XHRcdFx0Z3Vlc3QgPSAkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyk/MTowO1xyXG5cclxuXHRcdFx0dmFyIG1saXN0ID0gW107XHJcblx0XHRcdCQoXCIjbm93TWFuYWdlIC50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHRcdFx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdFx0XHRcdGlmKGlkKXtcclxuXHRcdFx0XHRcdG1saXN0LnB1c2goaWQpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblxyXG5cdFx0XHR2YXIgbGxpc3QgPSBbXTtcclxuXHRcdFx0JChcIiNub3dTdWJMYWJlbCAudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0XHRcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHRcdFx0XHRpZihpZCl7XHJcblx0XHRcdFx0XHRsbGlzdC5wdXNoKGlkKTtcclxuXHRcdFx0XHR9XHRcdFx0XHRcclxuXHRcdFx0fSlcclxuXHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHR0aXRsZSA6IHRpdCxcclxuXHRcdFx0XHRtYXJrIDogbWFyayxcclxuXHRcdFx0XHRwcml2YXRlIDogb3BlbixcclxuXHRcdFx0XHRndWVzdCA6IGd1ZXN0LFxyXG5cdFx0XHRcdG1lbWJlcnMgOiBtbGlzdCxcclxuXHRcdFx0XHRzdWJqZWN0TGFiZWxzIDogbGxpc3QsXHJcblx0XHRcdFx0YXJ0aWNsZUxhYmVscyA6IFtdLFxyXG5cdFx0XHRcdHJlc291cmNlcyA6IFtdXHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHBhcmFtLnRpdGxlICE9PSAnJyAmJiBwYXJhbS5tYXJrICE9PSAnJyl7XHJcblx0XHRcdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHRjcmVhdGVEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHJcblx0XHRcdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdFx0XHRcdFx0XHRsaXN0IDogW3Jlcy5kYXRhXVxyXG5cdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0JChcIiNteVN1YmplY3RcIikucHJlcGVuZChodG1sKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiovXHJcblxyXG5zQ3JlYXRlLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHQvLyBjcmVhdGVEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdC8vIFx0c3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdC8vIH0pO1xyXG5cclxuXHQvL25vd01hbmFnZURvbTtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdC8v6buY6K6k5L2/55So5oiR55qE5Li76aKYXHJcblx0dGhpcy50eXBlID0gJ215U3ViamVjdCc7XHJcblxyXG5cdC8v6L+Z6YeM6ICD6JmR5LiL6KaB5LiN6KaB5Lyg5Y+C5oyH5a6aZG9tO1xyXG5cdHRoaXMuZG9tID0gJChcIiNjcmVhdGVTdWJqZWN0XCIpO1xyXG5cclxuXHQvL+WbuuWumueahGlkXHJcblx0dGhpcy5yZXNEb20gPSAkKFwiI25vd1Jlc1wiKTtcclxuXHJcblx0Ly/miornlKjmiLfliJfooajlk6rlhL/liJvlu7rkuIDkuIsuXHJcblx0Ly9jb25zb2xlLmxvZyhzdHJpa2VyLnVzZXIpO1x0XHJcblx0dmFyIG1hbmFnZSA9IG5ldyBzdHJpa2VyLnVzZXIubWFuYWdlKCdtYW5hZ2VBcmVhJyk7XHJcblx0dGhpcy5tYW5hZ2UgPSBtYW5hZ2U7XHJcblx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cclxuXHR0aGlzLmRvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcclxuXHRcdG1hbmFnZS5pbml0KCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vc3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdFx0X3RoaXMucmVzRG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHRcdF90aGlzLm1hbmFnZS5jbGVhcigpO1xyXG5cdFx0X3RoaXMubGFiZWwuY2xlYXIoKTtcclxuXHR9KVx0XHJcblxyXG4vL+i1hOa6kOWIl+ihqFxyXG5cdHRoaXMucmVzTGlzdCA9IFtdLFxyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdC8v5b2T5YmN6KKr6YCJ5Lit55qE5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmNoYW5nZVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcclxuXHR0aGlzLnR5cGUgPSAndHlwZSdcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKHRoaXMucmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHR0aGlzLnJlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+WPlumAieS4reeahOagh+etvlxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5sYWJlbC5nZXRMYWJlbExpc3QoKTtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTnrqHnkIbov5xcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLm1hbmFnZS5nZXRNYW5hZ2VMaXN0KCk7XHJcbn1cclxuXHJcblxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihwYXJhbSxjYil7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHQvL+i1hOa6kOS4iuS8oOWujOaIkOeahOmAmuefpVxyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMucmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL+inpuWPkeS4iuS8oFxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGUgPSB0YXJnZXQuZGF0YSgndHlwZScpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlID09PSAnc3VibWl0Jyl7XHJcblx0XHRcdHZhciB0aXQgPSAkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoKSxcclxuXHRcdFx0XHRtYXJrID0gJChcIiNzdWJqZWN0TWFya1wiKS52YWwoKSxcclxuXHRcdFx0XHRvcGVuID0gJChcIiNzdWJqZWN0T3BlblwiKS5wcm9wKCdjaGVja2VkJyk/MTowLFxyXG5cdFx0XHRcdGd1ZXN0ID0gJChcIiNzdWJqZWN0R3Vlc3RcIikucHJvcCgnY2hlY2tlZCcpPzE6MDtcclxuXHJcblx0XHRcdC8vIHZhciBtbGlzdCA9IFtdO1xyXG5cdFx0XHQvLyAkKFwiI25vd01hbmFnZSAudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0XHRcdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHRcdFx0Ly8gXHRpZihpZCl7XHJcblx0XHRcdC8vIFx0XHRtbGlzdC5wdXNoKGlkKTtcclxuXHRcdFx0Ly8gXHR9XHJcblx0XHRcdC8vIH0pO1xyXG5cclxuXHRcdFx0Ly8gdmFyIGxsaXN0ID0gW107XHJcblx0XHRcdC8vICQoXCIjbm93U3ViTGFiZWwgLnRhZ1wiKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG5cdFx0XHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0XHRcdC8vIFx0aWYoaWQpe1xyXG5cdFx0XHQvLyBcdFx0bGxpc3QucHVzaChpZCk7XHJcblx0XHRcdC8vIFx0fVx0XHRcdFx0XHJcblx0XHRcdC8vIH0pXHJcblxyXG5cdFx0XHRpZih0aXQgPT0gJycpe1xyXG5cdFx0XHRcdGFsZXJ0KCfov5jmsqHmnInloavlhpnmoIfpopgnKTtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHR0aXRsZSA6IHRpdCxcclxuXHRcdFx0XHRtYXJrIDogbWFyayxcclxuXHRcdFx0XHRwcml2YXRlIDogb3BlbixcclxuXHRcdFx0XHRndWVzdCA6IGd1ZXN0LFxyXG5cdFx0XHRcdG1lbWJlcnMgOiBfdGhpcy5nZXRNYW5hZ2VMaXN0KCksXHJcblx0XHRcdFx0c3ViamVjdExhYmVscyA6IF90aGlzLmdldExhYmVsTGlzdCgpLFxyXG5cdFx0XHRcdGFydGljbGVMYWJlbHMgOiBbXSxcclxuXHRcdFx0XHRyZXNvdXJjZXMgOiBfdGhpcy5nZXRSZXNMaXN0KClcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocGFyYW0udGl0bGUgIT09ICcnICYmIHBhcmFtLm1hcmsgIT09ICcnKXtcclxuXHRcdFx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdF90aGlzLmRvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdFx0XHRcclxuXHRcdFx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdGxpc3QgOiBbcmVzLmRhdGFdXHJcblx0XHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdFx0XHQkKFwiI215U3ViamVjdFwiKS5wcmVwZW5kKGh0bWwpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2NyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBhTGlzdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKSxcclxuXHRjZ2ksXHJcblx0dG1wbCxcclxuXHRub3dTdWJJZCA9IDAsXHJcblx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhTGlzdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpO1xyXG5cclxuYUxpc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xyXG5cdG5vd1N1YklkID0gaWQ7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdG5ldyBhcnRpY2xlKCk7XHJcblxyXG5cdC8vIGFMaXN0LnNlYXJjaCh7XHJcblx0Ly8gXHRzdGFydCA6IHN0YXJ0LFxyXG5cdC8vIFx0bGltaXQgOiBsaW1pdCxcclxuXHQvLyBcdHN1YmplY3RJZCA6IG5vd1N1YklkXHJcblx0Ly8gfSlcclxufVxyXG5cclxudmFyIGFydGljbGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5zdWJpZCA9IG5vd1N1YklkO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLnNlYXJjaCgpO1xyXG59XHJcblxyXG4vL+iuoeeul+WbvueJh+eahOS4quaVsFxyXG5hcnRpY2xlLnByb3RvdHlwZS5nZXRpbWcgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbnVtID0gMDtcclxuXHRpZihkYXRhKXtcclxuXHRcdGZvcih2YXIgaSA9MCxsPWRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGRhdGFbaV07XHJcblx0XHRcdGlmKGl0ZW0udHlwZSA9PT0gMSl7XHJcblx0XHRcdFx0bnVtKys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG51bTtcclxufVxyXG5cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpID0gMCxsPWRhdGEubGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdGl0ZW0uaW1nbnVtID0gdGhpcy5nZXRpbWcoaXRlbS5yZXNvdXJjZSk7XHJcblx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0fVxyXG5cdGRhdGEubGlzdCA9IGxpc3Q7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbi8v57uR5a6a5LqL5Lu2XHJcbmFydGljbGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcclxufVxyXG5cclxuLy/liqDovb3mm7TlpJpcclxuYXJ0aWNsZS5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyB8fCB0aGlzLmVuZCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWRcclxuXHR9KTtcclxufVxyXG5cclxuLy/mt7vliqDliLDliY3pnaJcclxuYXJ0aWNsZS5wcm90b3R5cGUucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbi8v5ouJ5biW5a2Q5YiX6KGoXHJcbmFydGljbGUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0aWYoIXBhcmFtKXtcclxuXHRcdHBhcmFtID0ge1xyXG5cdFx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnRvdGFsID0gcmVzLmRhdGEudG90YWw7XHJcblx0XHRcdF90aGlzLmxlbmd0aCArPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0X3RoaXMuc3RhcnQgKz0gX3RoaXMubGltaXQ7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdHZhciBkYXRhID0gX3RoaXMuY2hlY2tEYXRhKHJlcy5kYXRhKTtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHRpZihfdGhpcy5sZW5ndGggPj0gX3RoaXMudG90YWwpe1xyXG5cdFx0XHRcdF90aGlzLmVuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG4vL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxyXG5hTGlzdC5wcmVwZW5kVG9MaXN0ID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3BhcmFtXX0pO1xyXG5cdFx0bGlzdERvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG4vL+WKoOi9veabtOWkmuaVsOaNrlxyXG4vKlxyXG5hTGlzdC5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2codGhpcy5lbmQpO1xyXG5cdGlmKGxvYWRpbmcgfHwgdGhpcy5lbmQpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRhTGlzdC5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiBzdGFydCxcclxuXHRcdGxpbWl0IDogbGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiBub3dTdWJJZFxyXG5cdH0pXHJcbn1cclxuXHJcblxyXG5cclxuLy/mkJzntKLmlbDmja5cclxuYUxpc3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdGxvYWRpbmcgPSB0cnVlO1xyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMudG90YWwgPSByZXMudG90YWw7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0c3RhcnQgKz0gbGltaXQ7XHJcblx0XHRcdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0bGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHR9ZWxzZXtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG59XHJcbiovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG5cclxuLy/ms6jlhozlkoznu5Hlrprkuovku7ZcclxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRyZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbi8v5qC55o2uZG9t6I635Y+W55u45YWz55qE5Y+C5pWwLlxyXG5mdW5jdGlvbiBnZXRQYXJhbSh0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogWzEsMl1cclxuXHR9XHJcblx0aWYocmVzTGlzdC5sZW5ndGggPiAwKXtcclxuXHRcdHBhcmFtLnJlc291cmNlcyA9IHJlc0xpc3Q7XHJcblx0fVxyXG5cdHJldHVybiBwYXJhbTtcclxufVxyXG5cclxuLy/ph43nva7kuIDkuKpmcm9tXHJcbmZ1bmN0aW9uIHJlc2V0RnJvbSh0YXJnZXQpe1xyXG5cdHRhcmdldC5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgnJyk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxuXHRiaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24oKXtcclxuXHJcbn07XHJcblxyXG5cclxuYVBvc3QucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcblxyXG5cdCQoXCIjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGNvbnNvbGUubG9nKHRhcmdldC52YWwoKSk7XHJcblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxuYVBvc3QucG9zdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcclxuXHJcblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLmNEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1x0XHJcblxyXG5cdHJlc0xpc3QgPSBbXTtcclxufVxyXG5cclxuYVBvc3QucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHB0ID0gdGhpcy50YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XHJcblx0Ly9jb25zb2xlLmxvZyhwVGFyZ2V0KTtcclxuXHR2YXIgcFRhcmdldCA9ICQocHQpO1xyXG5cclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0gZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblx0XHR9XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGNvbnNvbGUubG9nKHN0cmlrZXIuYXJ0aWNsZSk7XHJcblx0XHRcdHN0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xyXG5cdFx0fVxyXG5cdFx0X3RoaXMuY2xlYXIoKTtcclxuXHR9KTtcdFxyXG59XHJcblxyXG5cclxuLy/lj5HluIPkuIDkuKrlhoXlrrlcclxuLypcclxuYVBvc3QuY3JlYXRlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHRpZihsb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHB0ID0gdGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdHZhciBwVGFyZ2V0ID0gJChwdCk7XHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgcGFyYW0gPSBnZXRQYXJhbShwVGFyZ2V0KTtcclxuXHRcdFxyXG5cdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGxvYWRpbmcgPT09IGZhbHNlO1xyXG5cdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdGFQb3N0LnJlc2V0KHBUYXJnZXQpO1xyXG5cdFx0fVxyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRzdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG4qL1xyXG5cclxuLy/ph43nva7kuIDkuKpmcm9tXHJcbmFQb3N0LnJlc2V0ID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHR2YXIgcFRhcmdldCA9ICQodGFyZ2V0LmRhdGEoJ3RhcmdldCcpKTtcclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHJlc2V0RnJvbShwVGFyZ2V0KTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwiZnVuY3Rpb24gZW1wdHlGdW4ocmVzKXtcclxuXHRjb25zb2xlLmxvZyhyZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdQT1NUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheChvcHQsY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXHJcblx0XHR1cmwgPSBvcHQudXJsLFxyXG5cdFx0ZGF0YSA9IG9wdC5kYXRhO1xyXG5cclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlIDogdHlwZSxcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdGRhdGEgOiBkYXRhLFxyXG5cdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGNhbGxiYWNrKHJlcyk7XHJcblx0XHR9LFxyXG5cdFx0ZXJyb3IgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRlcnJvcihyZXMpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFqYXggOiBhamF4LFxyXG5cdHBvc3QgOiBwb3N0LFxyXG5cdGdldCA6IGdldFxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxyXFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcclxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcclxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXHJcXG4gICAgPC9zcGFuPlxcclxcbjwvZGl2PiBcXHJcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXHJcXG4gIDx1bD5cXHJcXG4gIDwlXFxyXFxuICAgIGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gICAgICBpdGVtID0gbGlzdFtpXTtcXHJcXG4gICU+IFxcclxcbiAgICAgIDxsaSBpZD1cInVzZXI8JS1pdGVtLmlkJT5cIiBjbGFzcz1cInVzZXI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiPjwlLWl0ZW0ubmFtZSU+PC9saT5cXHJcXG4gIDwlfSU+XFxyXFxuICA8L3VsPlxcclxcbjwvZGl2PiAgJyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXG4gICAgPC9zcGFuPlxcbjwvZGl2PiBcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXG4gIDx1bD5cXG4gICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFxcbiAgICAgIDxsaSBpZD1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBjbGFzcz1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCBcIjwvbGk+XFxuICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICA8L3VsPlxcbjwvZGl2PiAgXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2U8JS1pZCU+XCIgZGF0YS1pZD1cIjwlLWlkJT5cIj5cXHJcXG5cdDwlLW5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2UnLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSAyLCBuYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+PCUtcHJvVGV4dCU+PC9zcGFuPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cXHJcXG4gICAgICAgIOWFsTxzcGFuIGlkPVwiPCUtcHJvTmFtZSU+TnVtXCI+MjA8L3NwYW4+5Liq5Li76aKYIDxhIGNsYXNzPVwicHJlLXBhZ2VcIiBkYXRhLWFjdGlvbj1cInByZVwiPuS4iuS4gOmhtTwvYT4gPGEgY2xhc3M9XCJuZXh0LXBhZ2VcIiBkYXRhLWFjdGlvbj1cIm5leHRcIj7kuIvkuIDpobU8L2E+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHRpbWUgYWN0aXZlXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlXCIgIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1kb3duXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgIFxcclxcbiAgICA8L2hlYWRlcj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlzdFwiIGlkPVwiPCUtcHJvTmFtZSU+XCI+XFxyXFxuICAgICAgICAgICAgICAgICBcXHJcXG4gICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+JywgKF9fc3RhY2subGluZW5vID0gMywgcHJvVGV4dCksICc8L3NwYW4+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cIlwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZnVpLXBsdXNcIiAgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZVN1YmplY3RcIiBkYXRhLWFjdGlvbj1cImNyZWF0ZVwiPuWIm+W7uuS4u+mimDwvYT48L3NwYW4+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1yaWdodFwiPlxcbiAgICAgICAg5YWxPHNwYW4gaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA4LCBwcm9OYW1lKSwgJ051bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxuICAgICAgPC9kaXY+ICAgICBcXG4gICAgPC9oZWFkZXI+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE3LCBwcm9OYW1lKSwgJ1wiPlxcbiAgICAgICAgICAgICAgICAgXFxuICAgIDwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDwlXFxyXFxuICAgIFx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICBcdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgICAlPlxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydC1saXN0XCI+XFxyXFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+5Yib5bu65Lq6IDwlLWl0ZW0uY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSU+IOacgOi/keabtOaWsCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLnVwZGF0ZVRpbWUpJT4g5Li76aKY6LWE5rqQIDg2IDwlLWl0ZW0ubWVtYmVyQ291bnQlPuS4quaIkOWRmCA8JS1pdGVtLnVwZGF0b3IlPuS4quW4luWtkCA8JS1pdGVtLnJlc291cmNlQ291bnQlPuS4qui1hOa6kDwvZGQ+XFxyXFxuICAgICAgPC9kbD4gXFxyXFxuICAgIDwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICBcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLmlkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPuWIm+W7uuS6uiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiIOWIm+W7uuaXtumXtCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS51cGRhdGVUaW1lKSksIFwiIOS4u+mimOi1hOa6kCA4NiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZW1iZXJDb3VudCksIFwi5Liq5oiQ5ZGYIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnVwZGF0b3IpLCBcIuS4quW4luWtkCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5yZXNvdXJjZUNvdW50KSwgXCLkuKrotYTmupA8L2RkPlxcbiAgICAgIDwvZGw+IFxcbiAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICAgIDxkdD48JS10aXRsZSU+PC9kdD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7liJvlu7rkurogPCUtY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoY3JlYXRlVGltZSklPiDmnIDov5Hmm7TmlrAgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSklPjwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Li76aKY6LWE5rqQIDg2IDwlLW1lbWJlckNvdW50JT7kuKrmiJDlkZggMjA55Liq5biW5a2QIDEwMjTkuKrotYTmupAg5oiR55qE5Y+R5biWL+WbnuWkjSA5OS8xMjwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYWN0LWJ0blwiPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cImNyZWF0ZVwiPjxzcGFuIGNsYXNzPVwicG9zdFwiPjwvc3Bhbj7lj5HotLQ8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuXCIgZGF0YS1hY3Rpb249XCJmb2xsb3dcIj48c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lhbPms6g8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBtYW5hZ2UtYnRuXCIgZGF0YS1hY3Rpb249XCJtYW5hZ2VcIj48c3BhbiBjbGFzcz1cIm1hbmFnZVwiPjwvc3Bhbj7nrqHnkIY8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFjdGljZS1hY3Qtc2VsZWN0XCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QyLWNvbnRhaW5lciBmb3JtLWNvbnRyb2wgc2VsZWN0IHNlbGVjdC1wcmltYXJ5XCIgaWQ9XCJzMmlkX2F1dG9nZW4xXCI+XFxyXFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwic2VsZWN0Mi1jaG9pY2VcIiB0YWJpbmRleD1cIi0xXCI+ICAgXFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItY2hvc2VuXCIgaWQ9XCJzZWxlY3QyLWNob3Nlbi0yXCI+5oyJ5biW5a2Q5qCH562+562b6YCJPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPGFiYnIgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaC1jaG9pY2UtY2xvc2VcIj48L2FiYnI+IFxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWFycm93XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvYT48bGFiZWwgZm9yPVwiczJpZF9hdXRvZ2VuMlwiIGNsYXNzPVwic2VsZWN0Mi1vZmZzY3JlZW5cIj48L2xhYmVsPjxpbnB1dCBjbGFzcz1cInNlbGVjdDItZm9jdXNzZXIgc2VsZWN0Mi1vZmZzY3JlZW5cIiB0eXBlPVwidGV4dFwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWxsZWRieT1cInNlbGVjdDItY2hvc2VuLTJcIiBpZD1cInMyaWRfYXV0b2dlbjJcIj48L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlLm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlLm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hdXRvLXJlZnVzZVwiPlxcclxcbiAgICAgICAgICDoh6rliqjliLfmlrA6IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWFjdGlvbj1cInN1YmplY3QuYXV0b3JlZnJlc2hcIiAvPlxcclxcbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2ggYm9vdHN0cmFwLXN3aXRjaC13cmFwcGVyIGJvb3RzdHJhcC1zd2l0Y2gtYW5pbWF0ZSBib290c3RyYXAtc3dpdGNoLWlkLWN1c3RvbS1zd2l0Y2gtMDEgYm9vdHN0cmFwLXN3aXRjaC1vZmZcIj5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1jb250YWluZXJcIj5cXHJcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb24gYm9vdHN0cmFwLXN3aXRjaC1wcmltYXJ5XCI+T048L3NwYW4+PGxhYmVsIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1sYWJlbFwiPiZuYnNwOzwvbGFiZWw+PHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vZmYgYm9vdHN0cmFwLXN3aXRjaC1kZWZhdWx0XCI+T0ZGPC9zcGFuPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwiXCIgZGF0YS10b2dnbGU9XCJzd2l0Y2hcIiBpZD1cImN1c3RvbS1zd2l0Y2gtMDFcIj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgICAgICAtLT5cXHJcXG4gICAgICAgIDwvZGQ+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgPGR0PlwiLCAoX19zdGFjay5saW5lbm8gPSAxLCB0aXRsZSksICc8L2R0PlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuWIm+W7uuS6uiAnLCAoX19zdGFjay5saW5lbm8gPSAyLCBjcmVhdG9yTmFtZSksIFwiIOWIm+W7uuaXtumXtCBcIiwgKF9fc3RhY2subGluZW5vID0gMiwgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoY3JlYXRlVGltZSkpLCBcIiDmnIDov5Hmm7TmlrAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKHVwZGF0ZVRpbWUpKSwgJzwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Li76aKY6LWE5rqQIDg2ICcsIChfX3N0YWNrLmxpbmVubyA9IDMsIG1lbWJlckNvdW50KSwgJ+S4quaIkOWRmCAyMDnkuKrluJblrZAgMTAyNOS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIDk5LzEyPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiY3JlYXRlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkei0tDwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZvbGxvdy1idG5cIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPuWFs+azqDwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiPjxzcGFuIGNsYXNzPVwibWFuYWdlXCI+PC9zcGFuPueuoeeQhjwvYT48L3NwYW4+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYWN0aWNlLWFjdC1zZWxlY3RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdDItY29udGFpbmVyIGZvcm0tY29udHJvbCBzZWxlY3Qgc2VsZWN0LXByaW1hcnlcIiBpZD1cInMyaWRfYXV0b2dlbjFcIj5cXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxuICAgICAgICAgICAgPC9hPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cImFydGljbGUub3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cImFydGljbGUub3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWF1dG8tcmVmdXNlXCI+XFxuICAgICAgICAgIOiHquWKqOWIt+aWsDogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYWN0aW9uPVwic3ViamVjdC5hdXRvcmVmcmVzaFwiIC8+XFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgPC9kZD4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGFydGljbGUgY2xhc3M9XCJhcnRpY2Utb25lXCI+XFxyXFxuICAgIDxhc2lkZSBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2FzaWRlPlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLWNoZWNrLWNpcmNsZVwiPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmdWktY2hhdFwiPuWbnuWkjTwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxyXFxuICAgICAgICA8ZHQ+PCUtaXRlbS50aXRsZSU+PC9kdD5cXHJcXG4gICAgICAgIDxkbD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGw+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9hcnRpY2xlPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxhcnRpY2xlIGNsYXNzPVwiYXJ0aWNlLW9uZVwiPlxcbiAgICA8YXNpZGUgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2FzaWRlPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yKSwgXCIgICDmnIDlkI7lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0udXBkYXRvciksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLWNoZWNrLWNpcmNsZVwiPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmdWktY2hhdFwiPuWbnuWkjTwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0udGl0bGUpLCBcIjwvZHQ+XFxuICAgICAgICA8ZGw+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGw+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvYXJ0aWNsZT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPGxpIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPlxcclxcbjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksIFwiXFxuPC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbDwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZGV4LmpzIn0=