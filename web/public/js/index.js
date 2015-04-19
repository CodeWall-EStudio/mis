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
		msg = __webpack_require__(5),
		notify = __webpack_require__(6),
		label = __webpack_require__(7);
	
	
	var Striker = $(window.striker);
	
	
	//事件通知,用户资料已经加载完成
	function userLoad(e,d){
		new subject.area('mySubject');
		new subject.area('myFollow');
		new subject.area('myInvited');
		new subject.area('myArchived');
		new subject.area('open');
		new notify.notify();
		window.striker.label = new label.label('labelArea');
		window.striker.createSubject = new subject.create();
		window.striker.msg = new msg.message();
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
	var msie = /msie/.test(navigator.userAgent.toLowerCase()); 
	if ( msie ){
	    $('body').addClass('ie');
	}
	
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
	
	    var c = Math.ceil((now - atime)/1000);
	    if(c<60){
	        return '1分钟以内';
	    }else if(c<3600){
	        return Math.ceil(c/3600)+'分钟前';
	    }else if(c<3600*24){
	        return Math.ceil(c/(3600*24))+'天前';
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

	var cgi = __webpack_require__(14).user,
		logout = __webpack_require__(14).logout,
		data = __webpack_require__(19).user,
		userManage = __webpack_require__(20),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(35),
		manage : __webpack_require__(33),
		onemanage : __webpack_require__(34)
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
				bindAction();
			}
		});
	}
	
	var myAct = {
		'logout' : function(){
			logout(function(res){
				if(res.code === 0){
					window.location.href = '/login.html';
				}
			});
		}
	}
	
	var bindAction = function(){
		$("#userNav").bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action){
				if(myAct[action]){
					myAct[action]();
				}
			}
		})
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
	var cgi = __webpack_require__(14).subject,
		subjectList = __webpack_require__(16),
		subjectInfo = __webpack_require__(17),
		subjectCreate = __webpack_require__(18);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(29),
		manage : __webpack_require__(33), //管理员
		list : __webpack_require__(30),  //主题列表
		head : __webpack_require__(31),  //主题详情头部
		onemanage : __webpack_require__(34), //单个管理员
		aside : __webpack_require__(32),  //主题详情右边资源列表
		rlist : __webpack_require__(38)   //资源列表
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
		}else if (this.proName === 'myInvited'){
			funname = 'invited';
		}else if (this.proName === 'myArchived'){
			funname = 'archived';
		}else if (this.proName === 'open'){
			param.private = 1;
		}else if(this.proName === 'mySubject'){
			funname = 'list';
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).article;
	var tmpl = {
		list : __webpack_require__(42),
		top : __webpack_require__(43),
		rlist : __webpack_require__(38)   //资源列表
	};
	
	var articleList = __webpack_require__(21),
		articlePost = __webpack_require__(9);
	
	var Article = {}
	
	module.exports = Article;
	
	Article.list = articleList.article;
	
	// Article.loadMore = articleList.loadMore;
	
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

	var msg = {
		0 : '操作成功!',
		10: '排序序号必须填写',
		11 : '组织名称必须填写',
		20 : '新密码和重复密码必须一致',
		21 : '请填写用户名和密码!',
		22 : '用户不存在',
		30 : '组织最多支持3级!', 
		40 : '该目录下还有其他文件，无法删除!',
		50 : '你要上传的文件已经超过你的剩余空间!',
		60 : '你还没有选择要共享的目录',
		75 : '序号只能在1~99之间',
		76 : '名称不能少于2个字',
		77 : '参数不能为空',
		78 : '对不起，网络超时了，请稍后再试',
		79 : '已经有同名的项目了',
		100 : '对不起，您没有这个操作权限!',//后台出错啦!
		101 : '出错啦',
		1001 : '您还没有登录!',
		1004 : '没有找到资源!',
		1010 : '您没有查看该资源的权限!',
		1011 : '参数出错啦!',
		1013 : '出错啦',
		1014 : '已经关注该主题',
		1015 : '已经归档啦!',
		1016 : '该资源不能删除',
		1017 : '该目录下还有其他文件，无法删除!',
		1041 : '用户名或密码错误!',
		1043 : '用户不存在!',
		1050 : '时间交叉了!'
	}
	
	Messenger().options = {
	    extraClasses: 'messenger-fixed messenger-on-bottom',
	    theme: 'flat'
	}
	
	var db = {};
	
	function message(){
		this;
	}
	
	message.prototype.confirm = function(msg,label,cb){
		if(typeof label === 'undefined' || label === null){
			label = {
				sub : '确定',
				cancel : '取消'
			}
		}
		if(typeof cb === 'undefined'){
			cb = function(){};
		}
		if(typeof msg === 'undefined'){
			return;
		}
	
		var obj = {
			message : msg,
			actions : {
				sub : {
					label : label.sub || '确定',
					action : function(){
						cb();
						msg.hide();
					}
				},
				cancel : {
					label : label.cancel || '取消',
					action : function(){
						msg.hide();
					}
				}
			}
		}
		var msg = Messenger().post(obj);
	}
	
	message.prototype.error = function(d){
		if(d == 1001){
			window.location = '/login.html';
			return;
		}
	
		var obj = {
			'message' : msg[d] || '出错拉!'
		}
		if(parseInt(d)){
			obj.type = 'error'
		}
	
		Messenger().post(obj);
	}
	
	message.prototype.msg = function(msg){
		var obj = {
			'message' : msg || ''
		}
		if(parseInt(msg)){
			obj.type = 'error'
		}
	
		Messenger().post(obj);		
	}
	
	db.message = message;
	
	module.exports = db;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	//通知
	var notify = {},
		data = __webpack_require__(19).notify,
		cgi = __webpack_require__(14).notify;
	
	var tmpl = {
		list : __webpack_require__(36),
		one : __webpack_require__(37)   //资源列表
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

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).label,
		data = __webpack_require__(19).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(44),
		one : __webpack_require__(45)
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
	
	Label.label.prototype.showEdit = function(data){
		 var html = tmpl.one({list:data});
		 this.nowDom.html(html).show();
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
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(19),
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
	var striker = $(window.striker);	
	
	var cgi = __webpack_require__(14).article;
	var tmpl = {
		list : __webpack_require__(42),
		rlist : __webpack_require__(38)   //资源列表
	};
	
	
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
	}
	
	var post = function(){
		this.pDom = $("#postArticle"); //底部发表框
		this.cDom = $("#createArticle"); //弹出发表框
		this.presDom = this.pDom.find('.post-res');/// = $("")
		this.cresDom = this.cDom.find('.pop-res');
		this.ctitDom = this.cDom.find('.modal-title');
		this.model = 'post';//post 底部 pop 弹出窗口
	
		this.isEdit = false;
	
		var _this = this;
		this.cDom.on('show.bs.modal', function (e) {
			if(_this.isEdit){
				_this.ctitDom.text('修改帖子');
			}else{
				_this.ctitDom.text('新建帖子');
			}
			
			setTimeout(function(){
				_this.cDom.find('input[name=name]').focus();
			},1000)	
			_this.model = 'pop';
		});
	
		this.cDom.on('hide.bs.modal', function (e) {
			_this.model = 'post';
		});
	
		this.data = {};
		this.resList = [];
		this.resMap = {};
	
		this.loading = false;
		this.fileupload = false;
		this.target;
		this.bindAction();
	}
	
	post.prototype.bindFun = function(){
	
	};
	
	
	//取选择的资源
	post.prototype.getResList = function(){
		var list = [];
		for(var i in this.resMap){
			list.push(this.resMap[i].id);
		}
		return list;
	}
	
	//根据dom获取相关的参数.
	post.prototype.getParam = function(target){
		var name = target.find('input[name=name]').val(),
			content = target.find('textarea[name=content]').val();
	
		var param = {
			title : name,
			content : content,
			subjectId : nowSubId,
			labels : [],
			resources : this.getResList()
		}
	
		return param;
	}
	
	post.prototype.removeRes = function(e){
		var _this = this;
		var target = $(e.target),
			p = target.parent();
	
		var id = p.data('id');
		if(id){
			delete this.resMap[id];
			p.remove();
			if(_this.model === 'pop'){
				if(this.cresDom.find('.tag').length === 0){
					this.cresDom.hide();
				}
			}else{
				if(this.presDom.find('.tag').length === 0){
					this.presDom.hide();
				}
			}	
		}
	}
	
	post.prototype.edit = function(d){
		this.isEdit = true;
		this.data = d;
		this.cDom.modal('show');
		this.cDom.find('input[name=name]').val(d.title);
		this.cDom.find('textarea[name=content]').val(d.content);
	
		if(d.resourceList.length){
			this.resList = [];
			this.resMap = {};
			for(var i in d.resourceList){
				var item = d.resourceList[i];
				this.resList.push(item.id);
				this.resMap[item.id] = item;
			}
			var html = tmpl.rlist({
				list : d.resourceList
			});
			this.cresDom.append(html).show();	
		}
	}
	
	
	post.prototype.bindAction = function(){
		var _this = this;	
		//资源上传完成的通知
	
		striker.bind('editArticle',function(e,d){
			_this.edit(d);
		});
	
		striker.bind('uploadArticle',function(e,d){
			_this.fileupload = false;
			if(window.striker.commentshow){
				$(striker).trigger('uploadFile',d);
				return;
			}
			if(d.code === 0){
				_this.resList.push(d.data.id);
				_this.resMap[d.data.id] = d.data;
	
				var html = tmpl.rlist({
					list : [d.data]
				});
				if(_this.model === 'pop'){
					_this.cresDom.append(html).show();
				}else{
					_this.presDom.append(html).show();
				}
				
			}
		});
	
		window.uploadComp = function(d){
			_this.fileupload = false;
			if(window.striker.commentshow){
				$(striker).trigger('uploadFile',d);
				return;
			}
			if(d.code === 0){
				_this.resList.push(d.data.id);
				_this.resMap[d.data.id] = d.data;
	
				var html = tmpl.rlist({
					list : [d.data]
				});
				if(_this.model === 'pop'){
					_this.cresDom.append(html).show();
				}else{
					_this.presDom.append(html).show();
				}
				
			}
		};
	
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
			if(_this.fileupload){
				return;
			}
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#fileForm").submit();
			}
		})	
	
		$("#cfileName").bind('change',function(e){
			var target = $(e.target);
			if(_this.fileupload){
				return;
			}		
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#cfileForm").submit();
			}
		})	
	}
	
	post.prototype.clear = function(){
		this.pDom.find('input').val('');
		this.pDom.find('textarea').val('');
	
		this.cDom.find('input').val('');
		this.cDom.find('textarea').val('');	
	
		resList = [];
	}
	
	post.prototype.post = function(){
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
		var param = this.getParam(pTarget);
		var _this = this;
	
		if(param.title === '' || param.content === ''){
			return;
		}
	
		if(this.isEdit){
			param.subjectId = this.data.subject_id;
			param.articleId = this.data.id;
			cgi.edit(param,function(res){
				_this.loading = false;
				if(pTarget.hasClass('modal')){
					aPost.reset(pTarget);
				}
				if(res.code === 0){
					this.cDom.modal('hide');
					striker.trigger('articleEdited',res.data);
					//striker.article.appendToList(res.data);
				}
				_this.clear();
			});	
		}else{
			cgi.create(param,function(res){
				_this.loading = false;
				if(pTarget.hasClass('modal')){
					aPost.reset(pTarget);
				}
				_this.cDom.modal('hide');
				if(res.code === 0){
					striker.trigger('newarticle',res.data);
				}
				_this.clear();
			});	
		}
	}
	//重置一个from
	aPost.reset = function(target){
		var pTarget = $(target.data('target'));
		if(pTarget.length === 0){
			return;
		}
		resetFrom(pTarget);
	}
	
	aPost.post = post;

/***/ },
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(28),
		message = __webpack_require__(5);
	
	var msg = new message.message();
	
	var cgiPath = '/cgi/';
	var cgiList = {
		user : {
			list : cgiPath+'user/list',
			info : cgiPath+'user/info',
			create : cgiPath+'user/create'
		},
		subject : {
			list : cgiPath+'subject/list', // 我的列表
			search : cgiPath+'subject/search',
			info : cgiPath+'subject/info',
			edit : cgiPath+'subject/edit', //修改主题
			create : cgiPath+'subject/create',
			'delete' : cgiPath+'subject/delete',
			follow : cgiPath+'subject/follow', //关注
			following : cgiPath+'subject/following', //关注列表
			invited : cgiPath+'subject/invited', //邀请列表
			archived : cgiPath+'subject/archived', //关注列表
			archive : cgiPath+'subject/archive', //关注列表
			delresource : cgiPath + 'subject/delresource' //删除一个资源
		},
		article : {
			search : cgiPath+'article/search',
			info : cgiPath+'article/info',
			staring : cgiPath+'article/staring', //赞的帖子
			collected : cgiPath+'article/collected', //搜藏的帖子
			edit : cgiPath+'article/edit',
			star : cgiPath+'article/star', //赞
			collect : cgiPath+'article/collect', //收藏
			'delete' : cgiPath+'article/delete', //收藏
			'settop' : cgiPath+'article/setTop', //收藏
			create : cgiPath+'article/create'
		},
		comment : {
			search : cgiPath+'comment/search',
			staring : cgiPath+'comment/staring',
			collected : cgiPath+'comment/collected',
			star : cgiPath+'comment/star',
			'delete' : cgiPath+'comment/delete',
			edit : cgiPath+'comment/edit',
			collect : cgiPath+'comment/collect',
			create : cgiPath+'comment/create'
		},
		notify : {
			search : cgiPath+'notification/search',
			read : cgiPath+'notification/read',
		},
		label : {
			create : cgiPath+'label/create',
			list : cgiPath+'label/list'
		},
		resource : {
			mark : cgiPath + 'resource/mark',
			split : cgiPath + 'resource/split',
			list : cgiPath + 'resource/list'
		},
		login : cgiPath+'account/login',
		logout : cgiPath+'account/logout'
	}
	
	var db = {};
	var emptyFun = function(res){
	}
	// /统一出来弹出消息
	var checkCallback = function(cb,flag){
		return function(res){
			cb(res);
			if(res.code !== 0){
				msg.error(res.code);
			}else if(flag){
				msg.error(res.code);
			}
		}
	}
	
	db.login = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.login,param,callback);
	}
	
	db.logout = function(callback){
	
		var callback = checkCallback(callback);
		request.post(cgiList.logout,{},callback);
	}
	
	db.user = {};
	db.user.list = function(callback){
		var callback = checkCallback(callback);
		request.get(cgiList.user.list,null,callback);
	}
	
	db.user.info = function(callback){
		var callback = checkCallback(callback);
		request.get(cgiList.user.info,null,callback);	
	}
	
	//直接拉所有用户?
	db.user.create = function(param,callback){
		var callback = checkCallback(callback,true);
		request.get(cgiList.user.create,param,callback);
	}
	
	db.subject = {};
	
	db.subject.search = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.search,param,callback);
	}
	
	db.subject.list = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.list,param,callback);
	}
	
	db.subject.info = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.info,param,callback);
	}
	
	db.subject.create = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject.create,param,callback);
	}
	
	db.subject.edit = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.subject.edit,param,callback);
	}
	
	db.subject['delete'] = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject['delete'],param,callback);
	}
	
	db.subject.archive = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject.archive,param,callback);
	}
	
	db.subject.follow = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.subject.follow,param,callback);	
	}
	
	db.subject.following = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.following,param,callback);	
	}
	
	db.subject.invited = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.invited,param,callback);	
	}
	
	db.subject.archived = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.archived,param,callback);	
	}
	
	db.subject.archive = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject.archive,param,callback);	
	}
	
	db.subject.delresource = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.subject.delresource,param,callback);	
	}
	
	db.article = {};
	
	db.article.search = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.search,param,callback);
	}
	
	db.article.staring = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.staring,param,callback);
	}
	
	db.article.collected = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.collected,param,callback);
	}
	
	db.article.info = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.info,param,callback);
	}
	
	db.article.create = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.create,param,callback);
	}
	db.article.edit = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.edit,param,callback);
	}
	
	db.article['delete'] = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article['delete'],param,callback);
	}
	
	db.article.star = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.star,param,callback);
	}
	
	db.article.collect = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.collect,param,callback);
	}
	
	db.article.settop = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.settop,param,callback);
	}
	
	db.comment = {};
	
	db.comment.search = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.comment.search,param,callback);
	}
	db.comment.staring = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.comment.staring,param,callback);
	}
	db.comment.collected = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.comment.collected,param,callback);
	}
	
	db.comment['delete'] = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment['delete'],param,callback);
	}
	
	db.comment.star = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment.star,param,callback);
	}
	
	db.comment.collect = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment.collect,param,callback);
	}
	
	db.comment.create = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment.create,param,callback);
	}
	
	db.comment.edit = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment.edit,param,callback);
	}
	
	db.notify = {};
	
	db.notify.search = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.notify.search,param,callback);		
	}
	
	db.notify.read = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.notify.read,param,callback);		
	}
	
	db.label = {};
	
	db.label.create = function(param,callback) {
		var callback = checkCallback(callback,true);
		request.post(cgiList.label.create, param, callback);	
	}
	
	db.label.list = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.label.list,param,callback);	
	}
	
	db.resource = {};
	
	db.resource.mark = function(param,callback) {
		var callback = checkCallback(callback,true);
		request.post(cgiList.resource.mark, param, callback);	
	}
	
	db.resource.split = function(param,callback) {
		var callback = checkCallback(callback,true);
		request.post(cgiList.resource.split, param, callback);	
	}
	
	db.resource.list = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.resource.list,param,callback);	
	}
	
	module.exports = db;

/***/ },
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(19).subject,
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl,
		data = __webpack_require__(19);
	module.exports = sInfo;
	
	var striker = $(window.striker);
	
	var subDom = $("#subjectHead");
	var subAsideDom = $("#subjectAside");
	var postArea = $("#postArticle");
	
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
	
	var info = function(id){
		this.sid = id;
		this.dom = subDom;
		this.asideDom = subAsideDom;
		this.getData();
		this.bindAction();
		this.followBtn; //关注按钮
		this.manageBtn; //管理按钮
		this.timeBtn;   //按时间排序
		this.updateBtn; //按更新时间排序
	
		this.data = {};
	
		this._selectDom;
		this.msg = window.striker.msg;
	}
	
	sInfo.info = info;
	
	//删除主题相关资源
	info.prototype.deleteResource = function(e){
		var id = this._selectDom.data('id');
		if(id){
		var _this = this;
			this.msg.confirm('确定要删除该资源?',null,function(){
				var param = {
					subjectId : _this.sid,
					resourceId : id
				}
				cgi.delresource(param,function(res){
					if(res.code === 0){
						$(".sub-resource-"+id).remove();
					}
				});
			});
		}
	};
	
	//把其他的对象的引用传进来.
	info.prototype.bind = function(obj){
		this.post = obj.post;
	}
	
	info.prototype.manage = function(){
		this.post.edit(this.data);
	}
	
	//预览主题相关资源
	info.prototype.review = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			striker.trigger('review',{
				id : id,
				list : this.data.resourceList
			})
		}
	};
	
	//预览主题相关资源
	info.prototype.mark = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			striker.trigger('mark',{
				id : id
			})
		}
	};
	
	info.prototype.bindAction = function(){
		var _this = this;
		striker.bind('subjectUpdate',function(e,d){
			_this.data = d;
			var html = tmpl.head(d);
			_this.dom.html(html);
	
			res.data.my = data.user.myInfo;
			var html = tmpl.aside(d);
			
			_this.asideDom.html(html);			
		});
	
		
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			_this._selectDom = target;
			if(_this[action]){
				_this[action](e);
			}
		});
	
		this.asideDom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			_this._selectDom = target;
			if(_this[action]){
				_this[action](e);
			}
		});			
	}
	
	//拉单个帖子
	info.prototype.getData = function(){
		var id = this.sid;
		var _this = this;
		cgi.info({id:id},function(res){
			if(res.code === 0){
				var html = tmpl.head(res.data);
				_this.dom.html(html);
	
				res.data.my = data.user.myInfo;
				var html = tmpl.aside(res.data);
				_this.data = res.data;
				_this.asideDom.html(html);
	
				_this.followBtn = _this.dom.find('.follow-btn');
				_this.manageBtn = _this.dom.find('.manage-btn')
				_this.timeBtn = _this.dom.find('.time-btn')
				_this.updateBtn = _this.dom.find('.update-btn')
			}
		})	
	}
	
	//关注单个帖子
	info.prototype.follow = function(){
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
					_this.followBtn.addClass('followed').html('<span class="follow"></span>已关注');
				}else{
					_this.followBtn.removeClass('followed').html('<span class="follow"></span>关注');
				}
			}
		});
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//主题创建,删除等操作
	var data;
	var sCreate = {};
	var cgi,
		tmpl;
	module.exports = sCreate;
	var striker = $(window.striker);
	
	sCreate.init = function(type,module,tmp){
		cgi = module;
		tmpl = tmp;
	}
	
	sCreate.create = function(id){
		var _this = this;
	
		this.subId = id;
	
		//默认使用我的主题
		this.type = 'mySubject';
		this.isedit = false;
		this.editData = {};
	
		this.loading = false;
		this.fileupload = false;
	
		//这里考虑下要不要传参指定dom;
		this.dom = $("#createSubject");
		this.titleDom = this.dom.find('.modal-title');
		
		//固定的id
		this.resDom = $("#nowRes");
	
		//把用户列表哪儿创建一下.
		//console.log(striker.user);	
		var manage = new window.striker.user.manage('manageArea');
		this.manage = manage;
		this.label = window.striker.label;
	
		this.dom.on('show.bs.modal', function (e) {
			//striker.user.addDefManage();
			_this.titleDom.text('新建主题');
			setTimeout(function(){
				$("#subjectTitle").focus();	
			},1000)
			
			manage.init();
		});
	
		this.dom.on('hide.bs.modal', function (e) {
			//striker.user.addDefManage();
			_this.resDom.html('').hide();
			_this.manage.clear();
			_this.label.clear();
			this.isedit = false;
		});	
	
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
	
	sCreate.create.prototype.edit = function(data){
		//this.type = 'type';
		this.titleDom.text('修改帖子');
		$("#subjectTitle").val(data.title),
		$("#subjectMark").val(data.mark),
		$("#subjectOpen").prop('checked',data.private);
		$("#subjectGuest").prop('checked',data.guest);
		this.editData = data;
	
		//把管理员显示出来,貌似数据不支持?
		this.isedit = true;
	
		//把标签显示出来
		this.label.showEdit(data.labels);
	
		//把资源加进来
		var html = tmpl.rlist({
			list : data.resourceList
		});
		this.resDom.append(html).show();	
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
	
	sCreate.create.prototype.clear = function(){
		$("#subjectTitle").val('');
		$("#subjectMark").val('')
	}
	
	sCreate.create.prototype.bindAction = function(param,cb){
		var _this = this;
	
		//资源上传完成的通知
		window.uploadComp = function(d){
			if(_this.subId && !_this.isedit){
				striker.trigger('uploadArticle',d);
				return;
			}
	
			_this.fileupload = false;
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
				_this.fileupload = true;
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
				
				if(_this.isedit){
					param.subjectId = _this.editData.id;
				}
	
				if(this.loading){
					return;
				}
	
				if(param.title !== '' && param.mark !== ''){
					_this.loading = true;
					if(_this.isedit){
						cgi.edit(param,function(res){
							if(res.code === 0){
								_this.dom.modal('hide');
								_this.loading = false;
								_this.clear();
								striker.trigger('subjectUpdate',res.data);
							}
						});					
					}else{
						cgi.create(param,function(res){
							if(res.code === 0){
								_this.dom.modal('hide');
								_this.loading = false;
								var html = tmpl.list({
									list : [res.data]
								});
								_this.clear();
								striker.trigger('subjectCreated');
								$("#mySubject").prepend(html);
							}
						});					
					}
	
				}
			}
	
		});
	}

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(19).user;
	var cgi,
		tmpl,
		manageHave = false;
	module.exports = uManage;
	
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(19),
		cgi,
		tmpl,
		nowSubId = 0,
		loading = false;
		start = 0,
		limit = 20;
	
	module.exports = aList;
	var listDom = $("#articleList");
	var striker = $(window.striker);
	
	aList.init = function(id,module,tmp){
		nowSubId = id;
		cgi = module;
		tmpl = tmp;
	
		//return new article();
	}
	
	function article(){
		this.dom = $("#articleList");
		this.start = 0,
		this.limit = 20;
		this.total = 0;
		this.length = 0;
		this.end = false;
		this.loading = false;
	
		this.subid = nowSubId;
		this.msg = window.striker.msg;
	
		this.rdata = {};
	
		this.bindAction();
		this.search();
	}
	
	//把回复相关的东东绑定进来
	article.prototype.bind = function(obj){
		this.commentPost = obj.post;
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
	
	//绑定事件
	article.prototype.bindAction = function(){
		var _this = this;
		striker.bind('newarticle',function(e,d){
			_this.prependToList(d);
		})
	
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
	
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		})    
	}
	
	//加载更多
	article.prototype.loadMore = function(){
		if(this.loading || this.end){
			return;
		}
		this.search({
			start : this.start,
			limit : this.limit,
			subjectId : this.subid,
			orderby : 'createTime'
		});
	}
	
	article.prototype.checkData = function(data){
		var list = [];
		for(var i = 0,l=data.list.length;i<l;i++){
			var item = data.list[i];
			item.imgnum = this.getimg(item.resource);
			this.rdata[item.id] = item.resource;
			list.push(item);
		}
		data.list = list;
		data.sid = nowSubId;
		return data;
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
				subjectId : this.subid,
				orderby : 'createTime'
			}
		}
	
		cgi.search(param,function(res){
			
			if(res.code === 0){
				_this.total = res.data.total;
				_this.length += res.data.list.length;
				_this.start += _this.limit;
				_this.loading = false;
	
				var data = _this.checkData(res.data);
				var html = tmpl.list(data);
	
				if(res.data.top.length){
					var html1 = tmpl.top({
						list : res.data.top
					})
					$("#articleTop").html(html1);
				}
				_this.dom.append(html);
				if(_this.length >= _this.total){
					_this.end = true;
				}
			}
		});	
	}
	
	article.prototype.setup = function(){
		var id = this.target.data('id'),
			star = parseInt(this.target.data('status'));
	
		if(!star){
			star = 0;
		}
	
		if(id){
			var dom = this.target;
			var param = {
				articleId : id,
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
	
	article.prototype.collect = function(){
		var id = this.target.data('id');
	
		if(id){
			var dom = this.target;
			var param = {
				articleId : id
			};
			cgi.collect(param,function(res){
				if(res.code === 0){
					dom.attr('data-id',0);
				}
			});
		}
	}
	
	article.prototype['delete'] = function(){
		var id = this.target.data('id');
	
		if(id){
	
			var _this = this;
			this.msg.confirm('确定要删除该帖子?',null,function(){
				var param = {
					articleId : id
				};
				cgi['delete'](param,function(res){
					if(res.code === 0){
						$(".article"+id).remove();
					}
				});
			});
		}
	}
	
	article.prototype.replay = function(){
		var id = this.target.data('id');
		if(id){
			this.commentPost.showPost(id);
		}
	}
	
	//把新发布的帖子加到列表最前面
	article.prototype.prependToList = function(param){
		var data = this.checkData({list:[param]});
		var html = tmpl.list(data);
	
		this.dom.prepend(html);
	}
	
	//预览主题相关资源
	article.prototype.review = function(e){
		var target = $(e.target),
			pid = target.data('pid'),
			id = target.data('id');
	
		if(id){
			striker.trigger('review',{
				id : id,
				list : this.rdata[pid]
			})
		}
	};
	
	// //把新发布的帖子加到列表最前面
	// aList.prependToList = function(param){
	// 		var html = tmpl.list({list:[param]});
	// 		listDom.prepend(html);
	// }
	
	aList.article = article;
	
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
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <header class="header-top">\r\n      <div class="header-left">\r\n        <span class="fui-user"><%-proText%></span>\r\n        <%if(proText===\'我创建的\'){%>\r\n        <span class=""><a class="btn btn-block btn-lg btn-primary fui-plus"  data-toggle="modal" data-target="#createSubject" data-action="create">创建主题</a></span>\r\n        <%}%>\r\n      </div>\r\n\r\n      <div class="header-right">\r\n        共<span id="<%-proName%>Num">20</span>个主题 <a class="pre-page" data-action="pre">上一页</a> <a class="next-page" data-action="next">下一页</a>\r\n        <div class="btn-group">\r\n          <a class="btn btn-primary time active" data-action="orderbytime">按创建时间排序</a>\r\n          <a class="btn btn-primary update"  data-action="orderbyupdate">按更新时间排序</a>\r\n        </div>\r\n        <span class="arrow-down" data-action="close"></span>\r\n      </div>     \r\n    </header>\r\n\r\n    <div class="article-list" id="<%-proName%>">\r\n                 \r\n    </div>',
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
	                buf.push('    <header class="header-top">\n      <div class="header-left">\n        <span class="fui-user">', (__stack.lineno = 3, proText), "</span>\n        ");
	                __stack.lineno = 4;
	                if (proText === "我创建的") {
	                    buf.push('\n        <span class=""><a class="btn btn-block btn-lg btn-primary fui-plus"  data-toggle="modal" data-target="#createSubject" data-action="create">创建主题</a></span>\n        ');
	                    __stack.lineno = 6;
	                }
	                buf.push('\n      </div>\n\n      <div class="header-right">\n        共<span id="', (__stack.lineno = 10, proName), 'Num">20</span>个主题 <a class="pre-page" data-action="pre">上一页</a> <a class="next-page" data-action="next">下一页</a>\n        <div class="btn-group">\n          <a class="btn btn-primary time active" data-action="orderbytime">按创建时间排序</a>\n          <a class="btn btn-primary update"  data-action="orderbyupdate">按更新时间排序</a>\n        </div>\n        <span class="arrow-down" data-action="close"></span>\n      </div>     \n    </header>\n\n    <div class="article-list" id="', (__stack.lineno = 19, proName), '">\n                 \n    </div>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <%\r\n    	for(var i = 0,l=list.length;i<l;i++){\r\n    		var item = list[i];\r\n    %>\r\n      <dl class="art-list">\r\n        <dt><a href="/info.html?id=<%-item.id%>"><%-item.title%></a></dt>\r\n        <dd>创建人 <%-item.creatorName%> 创建时间 <%-striker.util.formatTime(item.createTime)%> 最近更新 <%-striker.util.formatTime(item.updateTime)%> 主题资源 <%-item.resourceCount%> <%-item.memberCount%>个成员 <%-item.articleCount%>个帖子 <%-item.resourceCount%>个资源</dd>\r\n      </dl> \r\n    <%}%>',
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
	                    buf.push('\n      <dl class="art-list">\n        <dt><a href="/info.html?id=', (__stack.lineno = 6, item.id), '">', (__stack.lineno = 6, item.title), "</a></dt>\n        <dd>创建人 ", (__stack.lineno = 7, item.creatorName), " 创建时间 ", (__stack.lineno = 7, striker.util.formatTime(item.createTime)), " 最近更新 ", (__stack.lineno = 7, striker.util.formatTime(item.updateTime)), " 主题资源 ", (__stack.lineno = 7, item.resourceCount), " ", (__stack.lineno = 7, item.memberCount), "个成员 ", (__stack.lineno = 7, item.articleCount), "个帖子 ", (__stack.lineno = 7, item.resourceCount), "个资源</dd>\n      </dl> \n    ");
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12</dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <!--\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a>\r\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\r\n          <a href="/index.html">返回</a>\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
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
	                buf.push("        <dt>", (__stack.lineno = 1, title), '</dt>\n        <dd class="artice-use">创建人 ', (__stack.lineno = 2, creatorName), " 创建时间 ", (__stack.lineno = 2, striker.util.formatTime(createTime)), " 最近更新 ", (__stack.lineno = 2, striker.util.formatTime(updateTime)), '</dd>\n        <dd class="artice-use">主题资源 ', (__stack.lineno = 3, subjectResourceCount), " ", (__stack.lineno = 3, memberCount), "个成员 ", (__stack.lineno = 3, articleCount), "个帖子 ", (__stack.lineno = 3, articleResourceCount), "个资源 我的发帖/回复 ", (__stack.lineno = 3, articleCreateCount), '/12</dd>\n        <dd class="artice-act-btn">\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn ');
	                __stack.lineno = 6;
	                if (follow) {
	                    buf.push("followed");
	                    __stack.lineno = 6;
	                }
	                buf.push('" data-action="follow"><span class="follow"></span>');
	                __stack.lineno = 6;
	                if (follow) {
	                    buf.push("已关注");
	                    __stack.lineno = 6;
	                } else {
	                    buf.push("关注");
	                    __stack.lineno = 6;
	                }
	                buf.push('</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <!--\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a>\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <nav class="btn-toolbar">\r\n          <div class="btn-group">\r\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\r\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\r\n            <span class="btn btn-primary">统计</span>\r\n          </div>\r\n        </nav>\r\n\r\n        <div class="artice-aside-img">\r\n          <!--\r\n          <div class="video">\r\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\r\n            预览  标注 下载  删除\r\n          </div>\r\n          -->\r\n          <div class="img-list">\r\n            <%\r\n              for(var i in resourceList){\r\n              var item = resourceList[i];\r\n            %>\r\n            <div class="sub-resource-<%-item.id%>">\r\n            <%if(item.type === 1){%>\r\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else if(item.type === 4 || item.type ===3){%>\r\n              <video src="/cgi/resource/preview?id=<%-item.id%>" controls="controls">\r\n              您的浏览器不支持 video 标签。\r\n              </video>\r\n              <a data-id="<%-item.id%>"  data-action="mark" style="">标注</a>  <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else{%>\r\n              <p><%-item.name%></p>\r\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>              \r\n            <%}%>\r\n            </div>\r\n            <%}%>\r\n          </div>\r\n        </div>',
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
	                buf.push('        <nav class="btn-toolbar">\n          <div class="btn-group">\n            <span class="btn btn-primary active">资源 ', (__stack.lineno = 3, subjectResourceCount), '</span>\n            <span class="btn btn-primary">参与人 ', (__stack.lineno = 4, memberCount), '</span>\n            <span class="btn btn-primary">统计</span>\n          </div>\n        </nav>\n\n        <div class="artice-aside-img">\n          <!--\n          <div class="video">\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\n            预览  标注 下载  删除\n          </div>\n          -->\n          <div class="img-list">\n            ');
	                __stack.lineno = 17;
	                for (var i in resourceList) {
	                    var item = resourceList[i];
	                    buf.push('\n            <div class="sub-resource-', (__stack.lineno = 21, item.id), '">\n            ');
	                    __stack.lineno = 22;
	                    if (item.type === 1) {
	                        buf.push('\n              <img width="100%" height="100" src="/cgi/resource/preview?id=', (__stack.lineno = 23, item.id), '" title="', (__stack.lineno = 23, item.name), '"  data-id="', (__stack.lineno = 23, item.id), '"  data-action="review" />\n              <a data-id="', (__stack.lineno = 24, item.id), '"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 24, item.id), '" target="_blank">下载</a>  \n              ');
	                        __stack.lineno = 25;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 26, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 27;
	                        }
	                        buf.push("\n            ");
	                        __stack.lineno = 28;
	                    } else if (item.type === 4 || item.type === 3) {
	                        buf.push('\n              <video src="/cgi/resource/preview?id=', (__stack.lineno = 29, item.id), '" controls="controls">\n              您的浏览器不支持 video 标签。\n              </video>\n              <a data-id="', (__stack.lineno = 32, item.id), '"  data-action="mark" style="">标注</a>  <a data-id="', (__stack.lineno = 32, item.id), '"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 32, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 33;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 34, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 35;
	                        }
	                        buf.push("\n            ");
	                        __stack.lineno = 36;
	                    } else {
	                        buf.push("\n              <p>", (__stack.lineno = 37, item.name), '</p>\n              <a href="/cgi/resource/download?id=', (__stack.lineno = 38, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 39;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 40, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 41;
	                        }
	                        buf.push("              \n            ");
	                        __stack.lineno = 42;
	                    }
	                    buf.push("\n            </div>\n            ");
	                    __stack.lineno = 44;
	                }
	                buf.push("\n          </div>\n        </div>");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 33 */
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '      <span data-action="logout"><span class="user"></span><%-name%></span>\r\n      <span class="msg" ><span></span><div></div></span>\r\n      <span class="dialog"></span>\r\n      <span class="search"></span>\r\n      <span class="memu"></span>',
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
	                buf.push('      <span data-action="logout"><span class="user"></span>', (__stack.lineno = 1, name), '</span>\n      <span class="msg" ><span></span><div></div></span>\n      <span class="dialog"></span>\n      <span class="search"></span>\n      <span class="memu"></span>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\n	for(var i in list){\r\n	var item = list[i];\r\n	var obj = JSON.parse(item.withData);\r\n	console.log(obj);\r\n%>\r\n<li title="<%-item.message%>"><a data-href="article.html?id=<%-obj.articleId%>" data-id="<%-item.id%>" data-read="<%-item.read%>"><%-item.message%></a></li>\r\n<%}%>',
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
	                for (var i in list) {
	                    var item = list[i];
	                    var obj = JSON.parse(item.withData);
	                    console.log(obj);
	                    buf.push('\n<li title="', (__stack.lineno = 7, item.message), '"><a data-href="article.html?id=', (__stack.lineno = 7, obj.articleId), '" data-id="', (__stack.lineno = 7, item.id), '" data-read="', (__stack.lineno = 7, item.read), '">', (__stack.lineno = 7, item.message), "</a></li>\n");
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
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: "",
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
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 38 */
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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updatorName%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                    buf.push('\n  <div class="artice-one article', (__stack.lineno = 4, item.id), '">\n    <div class="artice-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), "   最后回复 ", (__stack.lineno = 7, item.updatorName), '</div>\n      <div class="info-action">\n        <span class="up" data-id="', (__stack.lineno = 9, item.id), '" data-action="setup" data-status="', (__stack.lineno = 9, item.isStar), '"><span></span>');
	                    __stack.lineno = 9;
	                    if (item.isStar) {
	                        buf.push("已赞");
	                        __stack.lineno = 9;
	                    } else {
	                        buf.push("赞");
	                        __stack.lineno = 9;
	                    }
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 9, item.id), '"><span></span>回复</span> <span class="delete" data-action="delete" data-id="', (__stack.lineno = 9, item.id), '"><span></span>删除</span>\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=', (__stack.lineno = 12, item.id), "&sid=", (__stack.lineno = 12, item.subject_id), '">', (__stack.lineno = 12, item.title), "</a></dt>\n        <dd>\n          ", (__stack.lineno = 14, item.content), "\n        </dd>\n        ");
	                    __stack.lineno = 16;
	                    if (item.imgnum > 0) {
	                        buf.push('\n        <div class="artice-img-list">\n          ');
	                        __stack.lineno = 18;
	                        var first = true;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 26, obj.id), '" data-pid="', (__stack.lineno = 26, item.id), '" data-id="', (__stack.lineno = 26, obj.id), '" data-action="review" width="200" />\n              ');
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
	                    buf.push("\n    </div>\n  </div>\n");
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i = 0;i<list.length;i++){\r\nvar item = list[i];\r\n%>\r\n<li><span class="fui-heart"></span>置顶：<a href="/article.html?id=<%-item.id%>"><%-item.title%></a></li>\r\n<%}%>',
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
	                for (var i = 0; i < list.length; i++) {
	                    var item = list[i];
	                    buf.push('\n<li><span class="fui-heart"></span>置顶：<a href="/article.html?id=', (__stack.lineno = 4, item.id), '">', (__stack.lineno = 4, item.title), "</a></li>\n");
	                    __stack.lineno = 5;
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
/* 44 */
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
/* 45 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTdjZmZjNzkxZWU4ZDI1MTc2ZDI/MTg5NCoqIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci91c2VyLmpzP2VjNGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcz82NWNjIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL2FydGljbGUuanM/ZWU1NyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcz9kY2E3Iiwid2VicGFjazovLy8uL3NyYy9qcy9sYWJlbC9sYWJlbC5qcz8xM2RlIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9saXN0LmpzP2U4Y2QiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvaW5mby5qcz9hNmRmIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2NyZWF0ZS5qcz8zN2Y4Iiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanM/OWRlOSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci9tYW5hZ2UuanM/OGRiNSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9saXN0LmpzPzhhYjMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzP2FlZDkqIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9zaXplLmVqcz84ZGVjIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9saXN0LmVqcz80ZWYxIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9oZWFkLmVqcz84Nzc3Iiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9hc2lkZS5lanM/NWQ4NiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqcz81M2EzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzPzUxMTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqcz82ZmZiIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqcz84OTYwIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2cuZWpzP2Q2N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3Iiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqcz8zZmEyIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzPzAwNDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9saXN0LmVqcz8zNWYyIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcz8zNTdmIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7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Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQjs7Ozs7Ozs7OztBQ3JUQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBLHFCOzs7Ozs7O0FDblRBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEIsaUJBQWdCO0FBQ2hCLGVBQWM7QUFDZCxpQkFBZ0I7O0FBRWhCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZCO0FBQ0EsR0FBRTs7O0FBR0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDakxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0I7QUFDQSxJQUFHOztBQUVIO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLGtDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU0sRTtBQUNOLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNLEU7QUFDTjs7QUFFQTtBQUNBOztBQUVBLEdBQUU7QUFDRixFOzs7Ozs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ2hCQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7OztBQ3ZMQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLElBQUk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVTtBQUNBLE1BQUssRTs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBLG1DQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE0QixhQUFhO0FBQ3pDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBMkIsYUFBYTtBQUN4QztBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUEsR0FBRTtBQUNGO0FBQ0EsRzs7Ozs7Ozs7Ozs7O0FDN1JBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxN2NmZmM3OTFlZThkMjUxNzZkMlxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxuXHRzdWJqZWN0ID0gcmVxdWlyZSgnLi9zdWJqZWN0L3N1YmplY3QnKSxcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9hcnRpY2xlJyksXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxuXHRub3RpZnkgPSByZXF1aXJlKCcuL25vdGlmeS9ub3RpZnknKSxcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XG5cblxudmFyIFN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcblxuXG4vL+S6i+S7tumAmuefpSznlKjmiLfotYTmlpnlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHVzZXJMb2FkKGUsZCl7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215U3ViamVjdCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUZvbGxvdycpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUludml0ZWQnKTtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlBcmNoaXZlZCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdvcGVuJyk7XG5cdG5ldyBub3RpZnkubm90aWZ5KCk7XG5cdHdpbmRvdy5zdHJpa2VyLmxhYmVsID0gbmV3IGxhYmVsLmxhYmVsKCdsYWJlbEFyZWEnKTtcblx0d2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdCA9IG5ldyBzdWJqZWN0LmNyZWF0ZSgpO1xuXHR3aW5kb3cuc3RyaWtlci5tc2cgPSBuZXcgbXNnLm1lc3NhZ2UoKTtcblx0Ly9zdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG5cdC8vIHN1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcblx0Ly8gc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xufVxuXG4vL+S6i+S7tumAmuefpSzkuLvpopjlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHN1YmplY3RMb2FkKGUsZCl7XG5cdGNvbnNvbGUubG9nKGUsZCk7XG59XG5cbnZhciBoYW5kbGVycyA9IHtcblx0J3VzZXJMb2FkU3ViJyA6IHVzZXJMb2FkLFxuXHQnc3ViamVjdExvYWQnIDogc3ViamVjdExvYWRcbn1cblxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcblx0U3RyaWtlci5iaW5kKGksaGFuZGxlcnNbaV0pO1xufVxuXG4vL+WFqOWxgOS6i+S7tue7keWumlxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xuXHQkKCdib2R5JykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0XHRpZihhY3Rpb24pe1xuXHRcdFx0dmFyIGFjdE1hcCA9IGFjdGlvbi5zcGxpdCgnLicpO1xuXHRcdFx0dmFyIG1vZCA9IGFjdE1hcFswXSxcblx0XHRcdFx0ZnVuID0gYWN0TWFwWzFdO1xuXHRcdFx0aWYoYWN0TWFwLmxlbmd0aCA9PT0gMiAmJiBzdHJpa2VyW21vZF1bZnVuXSl7XG5cblx0XHRcdFx0c3RyaWtlclttb2RdW2Z1bl0odGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCl7XG5cdHN1YmplY3QuaW5pdCgnaW5kZXgnKTtcblx0Ly9hcnRpY2xlLmluaXQoJ2luZGV4Jyk7XG5cdHVzZXIuaW5pdCgpO1xuXHRsYWJlbC5pbml0KCk7XG5cblx0c3RyaWtlci5zdWJqZWN0ID0gc3ViamVjdDtcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcblx0c3RyaWtlci51c2VyID0gdXNlcjtcblxuXHRiaW5kQWN0aW9uKCk7XG59XG5cbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRsb2dvdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubG9nb3V0LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XHJcblxyXG4vLyBVc2VyLmFkZERlZk1hbmFnZSA9IHVzZXJNYW5hZ2UuYWRkRGVmTWFuYWdlO1xyXG5cclxuVXNlci5nZXRNeUluZm8gPSBmdW5jdGlvbihjYil7XHJcblx0Y2dpLmluZm8oZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5teUluZm8gPSByZXMuZGF0YTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm5hdihyZXMuZGF0YSk7XHJcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRTdWInLHJlcy5jb2RlKTtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXJsb2FkJyk7XHJcblx0XHRcdGJpbmRBY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudmFyIG15QWN0ID0ge1xyXG5cdCdsb2dvdXQnIDogZnVuY3Rpb24oKXtcclxuXHRcdGxvZ291dChmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBiaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHQkKFwiI3VzZXJOYXZcIikuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uKXtcclxuXHRcdFx0aWYobXlBY3RbYWN0aW9uXSl7XHJcblx0XHRcdFx0bXlBY3RbYWN0aW9uXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy/kuLvpophcclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5zdWJqZWN0LFxyXG5cdHN1YmplY3RMaXN0ID0gcmVxdWlyZSgnLi9saXN0JyksXHJcblx0c3ViamVjdEluZm8gPSByZXF1aXJlKCcuL2luZm8nKSxcclxuXHRzdWJqZWN0Q3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHRcclxuXHJcbi8v5qih5p2/5byV55SoXHJcbnZhciB0bXBsID0ge1xyXG5cdGFyZWEgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9zaXplLmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSwgLy/nrqHnkIblkZhcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvbGlzdC5lanMnKSwgIC8v5Li76aKY5YiX6KGoXHJcblx0aGVhZCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2hlYWQuZWpzJyksICAvL+S4u+mimOivpuaDheWktOmDqFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKSwgLy/ljZXkuKrnrqHnkIblkZhcclxuXHRhc2lkZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2FzaWRlLmVqcycpLCAgLy/kuLvpopjor6bmg4Xlj7PovrnotYTmupDliJfooahcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcbnZhciBwcm9NYXAgPSB7XHJcblx0bXlTdWJqZWN0IDogJ+aIkeWIm+W7uueahCcsXHJcblx0bXlGb2xsb3cgOiAn5oiR5YWz5rOo55qEJyxcclxuXHRteUludml0ZWQgOiAn6YKA6K+35oiR55qEJyxcclxuXHRvcGVuIDogJ+WFrOW8gOS4u+mimCcsXHJcblx0bXlBcmNoaXZlZCA6ICflvZLmoaPkuLvpopgnXHJcbn1cclxuXHJcbnZhciBTdWJqZWN0ID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmplY3Q7XHJcblxyXG4vKuWumuS5iemAmueUqOWPguaVsCovXHJcbnZhciBzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMDtcclxuXHJcblN1YmplY3Quc2VhcmNoID0gc3ViamVjdExpc3Quc2VhcmNoO1xyXG5cclxuU3ViamVjdC5jcmVhdGUgPSBzdWJqZWN0Q3JlYXRlLmNyZWF0ZTtcclxuXHJcblN1YmplY3QuaW5mbyA9IHN1YmplY3RJbmZvLmluZm87XHJcblxyXG5TdWJqZWN0LmFyZWEgPSBmdW5jdGlvbihkb21uYW1lKXtcclxuXHR2YXIgcHJvTmFtZSA9IGRvbW5hbWUsXHJcblx0XHRkb20gPSAkKCcjJytkb21uYW1lKydCbG9jaycpO1xyXG5cdHRoaXMucHJvTmFtZSA9IGRvbW5hbWU7XHJcblx0dGhpcy5kb20gPSBkb207XHJcblx0dGhpcy5wYWdlID0gMDsgICAvL+W8gOWni+mhteeggVxyXG5cdHRoaXMuYWxsUGFnZSA9IDA7XHJcblx0dGhpcy5saW1pdCA9IDU7IC8v5LiA6aG155qE5p2h5pWwXHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJzsvLzAg5oyJ5pe26Ze05o6S5bqPLDEg5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblx0dGhpcy5saXN0RG9tOyAvL+WIl+ihqOeahOS9jee9rlxyXG5cdHZhciBodG1sID0gdG1wbC5hcmVhKHtcclxuXHRcdHByb1RleHQgOiBwcm9NYXBbZG9tbmFtZV0sXHJcblx0XHRwcm9OYW1lIDogZG9tbmFtZVxyXG5cdH0pO1xyXG5cdGRvbS5odG1sKGh0bWwpO1xyXG5cdHRoaXMubGlzdERvbSA9ICQoJyMnK2RvbW5hbWUpO1xyXG5cdHRoaXMubnVtRG9tID0gJChcIiNcIitkb21uYW1lKydOdW0nKTtcclxuXHR0aGlzLnByZVBhZ2UgPSBkb20uZmluZCgnLnByZS1wYWdlJyk7XHJcblx0dGhpcy5uZXh0UGFnZSA9IGRvbS5maW5kKCcubmV4dC1wYWdlJyk7XHRcclxuXHR0aGlzLnRpbWVEb20gPSBkb20uZmluZCgnLnRpbWUnKTtcclxuXHR0aGlzLnVwZGF0ZURvbSA9IGRvbS5maW5kKCcudXBkYXRlJyk7XHJcblx0dGhpcy5hbGxOdW0gPSAwO1xyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG4vL+S4i+S4gOmhtVxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA8IHRoaXMuYWxsUGFnZS0xKXtcclxuXHRcdHRoaXMucGFnZSsrO1xyXG5cdFx0dGhpcy5nZXREYXRlKHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdFx0fSk7XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5LiK5LiA6aG1XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUucHJlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPiAwKXtcclxuXHRcdHRoaXMucGFnZS0tO1xyXG5cdFx0dGhpcy5nZXREYXRlKHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG4vL+aJk+W8gOaUtui1t1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oZSl7XHJcblx0aWYodGhpcy5saXN0RG9tLmhhc0NsYXNzKCdoaWRlJykpe1xyXG5cdFx0dGhpcy5saXN0RG9tLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLmxpc3REb20uYWRkQ2xhc3MoJ2hpZGUnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5oyJ5Y+R6KGo5pe26Ze05o6S5bqPXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xyXG5cdC8vIG9yZGVyYnk6IHVwZGF0ZVRpbWUgLyBjcmVhdGVUaW1lXHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLnRpbWVEb20uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMudXBkYXRlRG9tLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8v5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5vcmRlciA9ICd1cGRhdGVUaW1lJztcclxuXHR0aGlzLnVwZGF0ZURvbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy50aW1lRG9tLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcdFxyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcdFxyXG59XHJcblxyXG4vL+aWsOW7uuS4u+mimFxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYoIXRoaXMuY3JlYXRlU3ViamVjdCl7XHJcblx0XHR0aGlzLmNyZWF0ZVN1YmplY3QgPSB3aW5kb3cuc3RyaWtlci5jcmVhdGVTdWJqZWN0O1xyXG5cdH1cclxuXHRpZighdGhpcy5sYWJlbCl7XHJcblx0XHR0aGlzLmxhYmVsID0gd2luZG93LnN0cmlrZXIubGFiZWw7XHJcblx0fVxyXG5cdHRoaXMuY3JlYXRlU3ViamVjdC5jaGFuZ2VUeXBlKHRoaXMucHJvTmFtZSk7XHJcblx0Ly90aGlzLmxhYmVsLmluaXQoKTtcclxufVxyXG5cclxuLy/liKTmlq3nv7vpobXmmK/lkKblj6/ku6Xngrnlh7tcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jaGVja1BhZ2UgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA8PSAxKXtcclxuXHRcdHRoaXMucHJlUGFnZS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmKHRoaXMuYWxsUGFnZSA9PT0gMSl7XHJcblx0XHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6ZmFsc2V9KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fWVsc2UgaWYodGhpcy5wYWdlID49IHRoaXMuYWxsUGFnZS0xKXtcclxuXHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYodGhpcy5hbGxQYWdlID09PSAxKXtcclxuXHRcdFx0dGhpcy5wcmVQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnByZVBhZ2UucHJvcCh7ZGlzYWJsZWQ6ZmFsc2V9KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XHJcblxyXG4vL+S/ruaUueaAu+aVsFxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNoYW5nZU51bSA9IGZ1bmN0aW9uKG51bSl7XHJcblx0dGhpcy5hbGxQYWdlID0gTWF0aC5jZWlsKG51bS90aGlzLmxpbWl0KTtcclxuXHR0aGlzLmFsbE51bSA9IG51bTtcclxuXHR0aGlzLm51bURvbS50ZXh0KG51bSk7XHJcbn1cclxuXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIGZ1bm5hbWUgPSAnc2VhcmNoJztcclxuXHRpZih0aGlzLnByb05hbWUgPT09ICdteUZvbGxvdycpe1xyXG5cdFx0ZnVubmFtZSA9ICdmb2xsb3dpbmcnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdteUludml0ZWQnKXtcclxuXHRcdGZ1bm5hbWUgPSAnaW52aXRlZCc7XHJcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ215QXJjaGl2ZWQnKXtcclxuXHRcdGZ1bm5hbWUgPSAnYXJjaGl2ZWQnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdvcGVuJyl7XHJcblx0XHRwYXJhbS5wcml2YXRlID0gMTtcclxuXHR9ZWxzZSBpZih0aGlzLnByb05hbWUgPT09ICdteVN1YmplY3QnKXtcclxuXHRcdGZ1bm5hbWUgPSAnbGlzdCc7XHJcblx0fVxyXG5cclxuXHRjZ2lbZnVubmFtZV0ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmNoYW5nZU51bShyZXMuZGF0YS50b3RhbCk7XHJcblx0XHRcdF90aGlzLmNoZWNrUGFnZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKlxyXG7ogIPomZHliLDpppbpobXnu5PmnoTnmoTnibnmrormgKcs6L+Z6YeM5YiG5Z2X57uR5a6a5LqL5Lu2XHJcbiovXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3N1YmplY3RDcmVhdGVkJyxmdW5jdGlvbigpe1xyXG5cdFx0aWYoJ215U3ViamVjdCcgPT09IF90aGlzLnByb05hbWUpe1xyXG5cdFx0XHRfdGhpcy5hbGxOdW0rKztcclxuXHRcdFx0X3RoaXMuY2hhbmdlTnVtKF90aGlzLmFsbE51bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblN1YmplY3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUpe1xyXG5cdHN1YmplY3RMaXN0LmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdEluZm8uaW5pdCh0eXBlLGNnaSx0bXBsKTtcclxuXHRzdWJqZWN0Q3JlYXRlLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHR0b3AgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS90b3AuZWpzJyksXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn07XHJcblxyXG52YXIgYXJ0aWNsZUxpc3QgPSByZXF1aXJlKCcuL2xpc3QnKSxcclxuXHRhcnRpY2xlUG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xyXG5cclxudmFyIEFydGljbGUgPSB7fVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnRpY2xlO1xyXG5cclxuQXJ0aWNsZS5saXN0ID0gYXJ0aWNsZUxpc3QuYXJ0aWNsZTtcclxuXHJcbi8vIEFydGljbGUubG9hZE1vcmUgPSBhcnRpY2xlTGlzdC5sb2FkTW9yZTtcclxuXHJcbkFydGljbGUuYXBwZW5kVG9MaXN0ID0gYXJ0aWNsZUxpc3QucHJlcGVuZFRvTGlzdDtcclxuXHJcbi8vQXJ0aWNsZS5wb3N0ID0gYXJ0aWNsZVBvc3QuY3JlYXRlO1xyXG5cclxuLy9BcnRpY2xlLnJlc2V0ID0gYXJ0aWNsZVBvc3QucmVzZXQ7XHJcblxyXG4vKiovXHJcblxyXG5BcnRpY2xlLmluaXQgPSBmdW5jdGlvbihpZCl7XHJcblx0YXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0YXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvYXJ0aWNsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0aWYoZCA9PSAxMDAxKXtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChkKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnIHx8ICcnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KG1zZykpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHRcdFxyXG59XHJcblxyXG5kYi5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vbXNnLmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/pgJrnn6VcclxudmFyIG5vdGlmeSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5ub3RpZnksXHJcblx0Y2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLm5vdGlmeTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2dsaXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21zZy5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn1cclxuXHJcbnZhciBub3RpZnlPYmogPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNub3RpZnlMaXN0XCIpO1xyXG5cdHRoaXMudGlwc0RvbSA9ICQoXCIjdXNlck5hdiAubXNnIGRpdlwiKTtcclxuXHJcblx0dGhpcy5tc2dOdW0gPSAwO1xyXG5cdHRoaXMuZ2V0KCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5zZWFyY2goe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNvbnNvbGUubG9nKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKHJlcy5kYXRhLmxpc3QubGVuZ3RoKXtcclxuXHRcdFx0XHRfdGhpcy5tc2dOdW0gPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKS5zaG93KCk7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy50aXBzRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdGlmKF90aGlzLm1zZ051bSl7XHJcblx0XHRcdGlmKF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycpKXtcclxuXHRcdFx0XHRfdGhpcy5kb20uaGlkZSgpO1xyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmRvbS5zaG93KCk7XHRcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGhyZWYgPSB0YXJnZXQuZGF0YSgnaHJlZicpLFxyXG5cdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0XHRyZWFkID0gdGFyZ2V0LmRhdGEoJ3JlYWQnKTtcclxuXHJcblxyXG5cdFx0aWYoaHJlZil7XHJcblx0XHRcdHdpbmRvdy5vcGVuKGhyZWYpO1xyXG5cdFx0XHRpZihyZWFkID09ICcnKXtcclxuXHRcdFx0XHRjZ2kucmVhZCh7XHJcblx0XHRcdFx0XHRub3RpZnlJZCA6IGlkXHJcblx0XHRcdFx0fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdF90aGlzLm1zZ051bS0tO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubm90aWZ5Lm5vdGlmeSA9IG5vdGlmeU9iajtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sYWJlbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIExhYmVsID0ge30sXHJcblx0X3RoaXMgPSBMYWJlbDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9vbmUuZWpzJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0KCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIituYW1lKTtcclxuXHJcblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmFkZERvbSA9IHRoaXMuZG9tLmZpbmQoJy5hZGQtbGFiZWwtYXJlYScpO1xyXG5cdC8vIGlmKHR5cGUgPT09ICdzdWInKXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dTdWJMYWJlbCcpO1xyXG5cdC8vIH1lbHNle1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd0FydExhYmVsJyk7XHJcblx0Ly8gfVxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5idG5Eb20gPSB0aGlzLmFkZERvbS5maW5kKCcuYnRuJyk7XHJcblx0dGhpcy5pbnB1dERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcclxuXHJcblx0Ly/pu5jorqTmsqHmnInmoIfnrb5cclxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cclxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1x0XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvL1xyXG5cdC8vIHRoaXMubm93RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdC8vIFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0Ly8gXHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHQvLyBcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIHZhbCA9IHRoaXMuaW5wdXREb20udmFsKCk7XHJcblx0aWYodmFsICE9PSAnJyl7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdG5hbWUgOiB2YWxcclxuXHRcdH07XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLm1hcFtyZXMuZGF0YS5pZF0gPSByZXMuZGF0YTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XHJcblx0XHRcdFx0X3RoaXMubGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oZSl7XHJcblx0Ly8gL2NvbnNvbGUubG9nKHRoaXMuX3NlbGVjdERvbSk7XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cdH1cclxuXHQvL3RoaXMuYWRkRG9tLnNob3coKTtcclxuXHQvL3RoaXMubm93RG9tLnNob3coKTtcclxuXHJcblx0Ly9mdWktY3Jvc3NcclxuXHQvL2Z1aS1wbHVzXHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5saXN0KHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMCxsPXJlcy5kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xyXG5cdFx0XHRcdF90aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dFZGl0ID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0IHZhciBodG1sID0gdG1wbC5vbmUoe2xpc3Q6ZGF0YX0pO1xyXG5cdCB0aGlzLm5vd0RvbS5odG1sKGh0bWwpLnNob3coKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxyXG5cdH1cclxuXHJcblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdGlmKHRoaXMubm93RG9tLmZpbmQoJy5sYWJlbCcraWQpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lKHBhcmFtKTtcclxuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XHJcblx0Ly8gdGhpcy5ub3dEb20uZmluZChcIi50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHQvLyBcdGlmKGlkKXtcclxuXHQvLyBcdFx0bGlzdC5wdXNoKGlkKTtcclxuXHQvLyBcdH1cdFx0XHRcdFxyXG5cdC8vIH0pXHRcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLm5vd0RvbS5odG1sKCcnKS5oaWRlKCk7XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+WIoOmZpFxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRwLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuTGFiZWwuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxuXHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5mdW5jdGlvbiByZXNldEZyb20odGFyZ2V0KXtcclxuXHR0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgnJyk7XHJcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xyXG59O1xyXG5cclxuYVBvc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xyXG5cdG5vd1N1YklkID0gaWQ7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdG5ldyBhUG9zdC5wb3N0KCk7XHJcbn1cclxuXHJcbnZhciBwb3N0ID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20gPSAkKFwiI3Bvc3RBcnRpY2xlXCIpOyAvL+W6lemDqOWPkeihqOahhlxyXG5cdHRoaXMuY0RvbSA9ICQoXCIjY3JlYXRlQXJ0aWNsZVwiKTsgLy/lvLnlh7rlj5HooajmoYZcclxuXHR0aGlzLnByZXNEb20gPSB0aGlzLnBEb20uZmluZCgnLnBvc3QtcmVzJyk7Ly8vID0gJChcIlwiKVxyXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMuY0RvbS5maW5kKCcucG9wLXJlcycpO1xyXG5cdHRoaXMuY3RpdERvbSA9IHRoaXMuY0RvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHR0aGlzLm1vZGVsID0gJ3Bvc3QnOy8vcG9zdCDlupXpg6ggcG9wIOW8ueWHuueql+WPo1xyXG5cclxuXHR0aGlzLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuY0RvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZihfdGhpcy5pc0VkaXQpe1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5paw5bu65biW5a2QJyk7XHJcblx0XHR9XHJcblx0XHRcclxuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0X3RoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykuZm9jdXMoKTtcclxuXHRcdH0sMTAwMClcdFxyXG5cdFx0X3RoaXMubW9kZWwgPSAncG9wJztcclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cclxucG9zdC5wcm90b3R5cGUuZ2V0UGFyYW0gPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3VwbG9hZEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVx0XHRcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0cmVzTGlzdCA9IFtdO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgcHQgPSB0aGlzLnRhcmdldC5kYXRhKCd0YXJnZXQnKTtcclxuXHQvL2NvbnNvbGUubG9nKHBUYXJnZXQpO1xyXG5cdHZhciBwVGFyZ2V0ID0gJChwdCk7XHJcblxyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB0aGlzLmdldFBhcmFtKHBUYXJnZXQpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdGlmKHBhcmFtLnRpdGxlID09PSAnJyB8fCBwYXJhbS5jb250ZW50ID09PSAnJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHRoaXMuY0RvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignYXJ0aWNsZUVkaXRlZCcscmVzLmRhdGEpO1xyXG5cdFx0XHRcdC8vc3RyaWtlci5hcnRpY2xlLmFwcGVuZFRvTGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fWVsc2V7XHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY0RvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCduZXdhcnRpY2xlJyxyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5hUG9zdC5yZXNldCA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHRhcmdldC5kYXRhKCd0YXJnZXQnKSk7XHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRyZXNldEZyb20ocFRhcmdldCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QgPSBwb3N0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydzdWJqZWN0L2xpc3QnLCAvLyDmiJHnmoTliJfooahcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ3N1YmplY3QvZWRpdCcsIC8v5L+u5pS55Li76aKYXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydzdWJqZWN0L2NyZWF0ZScsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0J3NldHRvcCcgOiBjZ2lQYXRoKydhcnRpY2xlL3NldFRvcCcsIC8v5pS26JePXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydhcnRpY2xlL2NyZWF0ZSdcclxuXHR9LFxyXG5cdGNvbW1lbnQgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydjb21tZW50L3NlYXJjaCcsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnY29tbWVudC9zdGFyaW5nJyxcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdGVkJyxcclxuXHRcdHN0YXIgOiBjZ2lQYXRoKydjb21tZW50L3N0YXInLFxyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydjb21tZW50L2RlbGV0ZScsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnY29tbWVudC9lZGl0JyxcclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3QnLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnY29tbWVudC9jcmVhdGUnXHJcblx0fSxcclxuXHRub3RpZnkgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydub3RpZmljYXRpb24vc2VhcmNoJyxcclxuXHRcdHJlYWQgOiBjZ2lQYXRoKydub3RpZmljYXRpb24vcmVhZCcsXHJcblx0fSxcclxuXHRsYWJlbCA6IHtcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2xhYmVsL2NyZWF0ZScsXHJcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcclxuXHR9LFxyXG5cdHJlc291cmNlIDoge1xyXG5cdFx0bWFyayA6IGNnaVBhdGggKyAncmVzb3VyY2UvbWFyaycsXHJcblx0XHRzcGxpdCA6IGNnaVBhdGggKyAncmVzb3VyY2Uvc3BsaXQnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGggKyAncmVzb3VyY2UvbGlzdCdcclxuXHR9LFxyXG5cdGxvZ2luIDogY2dpUGF0aCsnYWNjb3VudC9sb2dpbicsXHJcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG52YXIgZW1wdHlGdW4gPSBmdW5jdGlvbihyZXMpe1xyXG59XHJcbi8vIC/nu5/kuIDlh7rmnaXlvLnlh7rmtojmga9cclxudmFyIGNoZWNrQ2FsbGJhY2sgPSBmdW5jdGlvbihjYixmbGFnKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNiKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSAhPT0gMCl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9ZWxzZSBpZihmbGFnKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRiLmxvZ2luID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ2luLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubG9nb3V0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dvdXQse30sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0ID0ge307XHJcblxyXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3Quc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvdyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZm9sbG93LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvd2luZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmludml0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmludml0ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxyZXNvdXJjZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuYXJ0aWNsZSA9IHt9O1xyXG5cclxuZGIuYXJ0aWNsZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5hcnRpY2xlLmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlWydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGVbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zZXR0b3AgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnNldHRvcCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQgPSB7fTtcclxuXHJcbmRiLmNvbW1lbnQuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnRbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubm90aWZ5ID0ge307XHJcblxyXG5kYi5ub3RpZnkuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Qubm90aWZ5LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5ub3RpZnkucmVhZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5ub3RpZnkucmVhZCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5sYWJlbCA9IHt9O1xyXG5cclxuZGIubGFiZWwuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIucmVzb3VyY2UgPSB7fTtcclxuXHJcbmRiLnJlc291cmNlLm1hcmsgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QucmVzb3VyY2UubWFyaywgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5zcGxpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5zcGxpdCwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QucmVzb3VyY2UubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIHNMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnN1YmplY3QsXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNMaXN0O1xyXG5cclxuc0xpc3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcbn1cclxuXHJcbnNMaXN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNiKXtcclxuXHRjZ2kuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogc3RhcnQsXHJcblx0XHRsaW1pdCA6IGxpbWl0XHJcblx0fSxjYik7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIi8v5ouJ5Li76aKY5YaF5a65XHJcbnZhciBzSW5mbyA9IHt9O1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNJbmZvO1xyXG5cclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBzdWJEb20gPSAkKFwiI3N1YmplY3RIZWFkXCIpO1xyXG52YXIgc3ViQXNpZGVEb20gPSAkKFwiI3N1YmplY3RBc2lkZVwiKTtcclxudmFyIHBvc3RBcmVhID0gJChcIiNwb3N0QXJ0aWNsZVwiKTtcclxuXHJcbnNJbmZvLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG4vL+aLieWPluS4gOS4quS4u+mimOeahOWGheWuuVxyXG4vLyBzSW5mby5pbmZvID0gZnVuY3Rpb24oaWQsY2Ipe1xyXG4vLyBcdGNnaS5pbmZvKHtpZDppZH0sZnVuY3Rpb24ocmVzKXtcclxuLy8gXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuLy8gXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQocmVzLmRhdGEpO1xyXG4vLyBcdFx0XHRzdWJEb20uaHRtbChodG1sKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG52YXIgaW5mbyA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLnNpZCA9IGlkO1xyXG5cdHRoaXMuZG9tID0gc3ViRG9tO1xyXG5cdHRoaXMuYXNpZGVEb20gPSBzdWJBc2lkZURvbTtcclxuXHR0aGlzLmdldERhdGEoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLmZvbGxvd0J0bjsgLy/lhbPms6jmjInpkq5cclxuXHR0aGlzLm1hbmFnZUJ0bjsgLy/nrqHnkIbmjInpkq5cclxuXHR0aGlzLnRpbWVCdG47ICAgLy/mjInml7bpl7TmjpLluo9cclxuXHR0aGlzLnVwZGF0ZUJ0bjsgLy/mjInmm7TmlrDml7bpl7TmjpLluo9cclxuXHJcblx0dGhpcy5kYXRhID0ge307XHJcblxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxufVxyXG5cclxuc0luZm8uaW5mbyA9IGluZm87XHJcblxyXG4vL+WIoOmZpOS4u+mimOebuOWFs+i1hOa6kFxyXG5pbmZvLnByb3RvdHlwZS5kZWxldGVSZXNvdXJjZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5tc2cuY29uZmlybSgn56Gu5a6a6KaB5Yig6Zmk6K+l6LWE5rqQPycsbnVsbCxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0c3ViamVjdElkIDogX3RoaXMuc2lkLFxyXG5cdFx0XHRcdHJlc291cmNlSWQgOiBpZFxyXG5cdFx0XHR9XHJcblx0XHRcdGNnaS5kZWxyZXNvdXJjZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdCQoXCIuc3ViLXJlc291cmNlLVwiK2lkKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy/miorlhbbku5bnmoTlr7nosaHnmoTlvJXnlKjkvKDov5vmnaUuXHJcbmluZm8ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMucG9zdCA9IG9iai5wb3N0O1xyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5tYW5hZ2UgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucG9zdC5lZGl0KHRoaXMuZGF0YSk7XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLmRhdGEucmVzb3VyY2VMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLm1hcmsgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ21hcmsnLHtcclxuXHRcdFx0aWQgOiBpZFxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5pbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnc3ViamVjdFVwZGF0ZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmRhdGEgPSBkO1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQoZCk7XHJcblx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHJcblx0XHRyZXMuZGF0YS5teSA9IGRhdGEudXNlci5teUluZm87XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUoZCk7XHJcblx0XHRcclxuXHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHRcdFx0XHJcblx0fSk7XHJcblxyXG5cdFxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5hc2lkZURvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcdFx0XHJcbn1cclxuXHJcbi8v5ouJ5Y2V5Liq5biW5a2QXHJcbmluZm8ucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMuc2lkO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0cmVzLmRhdGEubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRfdGhpcy5mb2xsb3dCdG4gPSBfdGhpcy5kb20uZmluZCgnLmZvbGxvdy1idG4nKTtcclxuXHRcdFx0X3RoaXMubWFuYWdlQnRuID0gX3RoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtYnRuJylcclxuXHRcdFx0X3RoaXMudGltZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudGltZS1idG4nKVxyXG5cdFx0XHRfdGhpcy51cGRhdGVCdG4gPSBfdGhpcy5kb20uZmluZCgnLnVwZGF0ZS1idG4nKVxyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxuLy/lhbPms6jljZXkuKrluJblrZBcclxuaW5mby5wcm90b3R5cGUuZm9sbG93ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnNpZFxyXG5cdFx0Zm9sbG93ID0gMTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHQvL+WIpOaWreaYr+WQpuW3sue7j2ZvbGxvd+S6hi5cclxuXHRpZih0aGlzLmZvbGxvd0J0bi5oYXNDbGFzcygnZm9sbG93ZWQnKSl7XHJcblx0XHRmb2xsb3cgPSAwO1xyXG5cdH1cclxuXHJcblx0Y2dpLmZvbGxvdyh7c3ViamVjdElkOmlkLGlzRm9sbG93OmZvbGxvd30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0aWYoZm9sbG93KXtcclxuXHRcdFx0XHRfdGhpcy5mb2xsb3dCdG4uYWRkQ2xhc3MoJ2ZvbGxvd2VkJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+5bey5YWz5rOoJyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5yZW1vdmVDbGFzcygnZm9sbG93ZWQnKS5odG1sKCc8c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lhbPms6gnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCIvL+S4u+mimOWIm+W7uizliKDpmaTnrYnmk43kvZxcclxudmFyIGRhdGE7XHJcbnZhciBzQ3JlYXRlID0ge307XHJcbnZhciBjZ2ksXHJcblx0dG1wbDtcclxubW9kdWxlLmV4cG9ydHMgPSBzQ3JlYXRlO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxuc0NyZWF0ZS5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUgPSBmdW5jdGlvbihpZCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dGhpcy5zdWJJZCA9IGlkO1xyXG5cclxuXHQvL+m7mOiupOS9v+eUqOaIkeeahOS4u+mimFxyXG5cdHRoaXMudHlwZSA9ICdteVN1YmplY3QnO1xyXG5cdHRoaXMuaXNlZGl0ID0gZmFsc2U7XHJcblx0dGhpcy5lZGl0RGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHJcblx0Ly/ov5nph4zogIPomZHkuIvopoHkuI3opoHkvKDlj4LmjIflrppkb207XHJcblx0dGhpcy5kb20gPSAkKFwiI2NyZWF0ZVN1YmplY3RcIik7XHJcblx0dGhpcy50aXRsZURvbSA9IHRoaXMuZG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdFxyXG5cdC8v5Zu65a6a55qEaWRcclxuXHR0aGlzLnJlc0RvbSA9ICQoXCIjbm93UmVzXCIpO1xyXG5cclxuXHQvL+aKiueUqOaIt+WIl+ihqOWTquWEv+WIm+W7uuS4gOS4iy5cclxuXHQvL2NvbnNvbGUubG9nKHN0cmlrZXIudXNlcik7XHRcclxuXHR2YXIgbWFuYWdlID0gbmV3IHdpbmRvdy5zdHJpa2VyLnVzZXIubWFuYWdlKCdtYW5hZ2VBcmVhJyk7XHJcblx0dGhpcy5tYW5hZ2UgPSBtYW5hZ2U7XHJcblx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cclxuXHR0aGlzLmRvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcclxuXHRcdF90aGlzLnRpdGxlRG9tLnRleHQoJ+aWsOW7uuS4u+mimCcpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKFwiI3N1YmplY3RUaXRsZVwiKS5mb2N1cygpO1x0XHJcblx0XHR9LDEwMDApXHJcblx0XHRcclxuXHRcdG1hbmFnZS5pbml0KCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vc3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdFx0X3RoaXMucmVzRG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHRcdF90aGlzLm1hbmFnZS5jbGVhcigpO1xyXG5cdFx0X3RoaXMubGFiZWwuY2xlYXIoKTtcclxuXHRcdHRoaXMuaXNlZGl0ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0Ly/otYTmupDliJfooahcclxuXHR0aGlzLnJlc0xpc3QgPSBbXSxcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHQvL+W9k+WJjeiiq+mAieS4reeahOWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5jaGFuZ2VUeXBlID0gZnVuY3Rpb24odHlwZSl7XHJcblx0dGhpcy50eXBlID0gJ3R5cGUnXHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0Ly90aGlzLnR5cGUgPSAndHlwZSc7XHJcblx0dGhpcy50aXRsZURvbS50ZXh0KCfkv67mlLnluJblrZAnKTtcclxuXHQkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoZGF0YS50aXRsZSksXHJcblx0JChcIiNzdWJqZWN0TWFya1wiKS52YWwoZGF0YS5tYXJrKSxcclxuXHQkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnLGRhdGEucHJpdmF0ZSk7XHJcblx0JChcIiNzdWJqZWN0R3Vlc3RcIikucHJvcCgnY2hlY2tlZCcsZGF0YS5ndWVzdCk7XHJcblx0dGhpcy5lZGl0RGF0YSA9IGRhdGE7XHJcblxyXG5cdC8v5oqK566h55CG5ZGY5pi+56S65Ye65p2lLOiyjOS8vOaVsOaNruS4jeaUr+aMgT9cclxuXHR0aGlzLmlzZWRpdCA9IHRydWU7XHJcblxyXG5cdC8v5oqK5qCH562+5pi+56S65Ye65p2lXHJcblx0dGhpcy5sYWJlbC5zaG93RWRpdChkYXRhLmxhYmVscyk7XHJcblxyXG5cdC8v5oqK6LWE5rqQ5Yqg6L+b5p2lXHJcblx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdGxpc3QgOiBkYXRhLnJlc291cmNlTGlzdFxyXG5cdH0pO1xyXG5cdHRoaXMucmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHRcclxufVxyXG5cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0XHRpZih0aGlzLnJlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0dGhpcy5yZXNEb20uaGlkZSgpO1xyXG5cdFx0fVx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLnJlc01hcCl7XHJcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTmoIfnrb5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMubGFiZWwuZ2V0TGFiZWxMaXN0KCk7XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5Lit55qE566h55CG6L+cXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5tYW5hZ2UuZ2V0TWFuYWdlTGlzdCgpO1xyXG59XHJcblxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdCQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgnJyk7XHJcblx0JChcIiNzdWJqZWN0TWFya1wiKS52YWwoJycpXHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24ocGFyYW0sY2Ipe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcclxuXHRcdGlmKF90aGlzLnN1YklkICYmICFfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3VwbG9hZEFydGljbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdF90aGlzLnJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly/op6blj5HkuIrkvKBcclxuXHQkKFwiI2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZSA9IHRhcmdldC5kYXRhKCd0eXBlJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGUgPT09ICdzdWJtaXQnKXtcclxuXHRcdFx0dmFyIHRpdCA9ICQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG1hcmsgPSAkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG9wZW4gPSAkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnKT8xOjAsXHJcblx0XHRcdFx0Z3Vlc3QgPSAkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyk/MTowO1xyXG5cclxuXHRcdFx0aWYodGl0ID09ICcnKXtcclxuXHRcdFx0XHRhbGVydCgn6L+Y5rKh5pyJ5aGr5YaZ5qCH6aKYJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0dGl0bGUgOiB0aXQsXHJcblx0XHRcdFx0bWFyayA6IG1hcmssXHJcblx0XHRcdFx0cHJpdmF0ZSA6IG9wZW4sXHJcblx0XHRcdFx0Z3Vlc3QgOiBndWVzdCxcclxuXHRcdFx0XHRtZW1iZXJzIDogX3RoaXMuZ2V0TWFuYWdlTGlzdCgpLFxyXG5cdFx0XHRcdHN1YmplY3RMYWJlbHMgOiBfdGhpcy5nZXRMYWJlbExpc3QoKSxcclxuXHRcdFx0XHRhcnRpY2xlTGFiZWxzIDogW10sXHJcblx0XHRcdFx0cmVzb3VyY2VzIDogX3RoaXMuZ2V0UmVzTGlzdCgpXHJcblx0XHRcdH1cdFx0XHJcblx0XHRcdFxyXG5cdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRcdHBhcmFtLnN1YmplY3RJZCA9IF90aGlzLmVkaXREYXRhLmlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocGFyYW0udGl0bGUgIT09ICcnICYmIHBhcmFtLm1hcmsgIT09ICcnKXtcclxuXHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRcdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmRvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3ViamVjdFVwZGF0ZScscmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGlzdCA6IFtyZXMuZGF0YV1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3ViamVjdENyZWF0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI215U3ViamVjdFwiKS5wcmVwZW5kKGh0bWwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvc3ViamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/lop7liqDnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5hZGREZWZNYW5hZ2UgPSBmdW5jdGlvbigpe1xyXG5cdFxyXG59XHJcblxyXG5tYW5hZ2UucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5riF56m65YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmxpc3REb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v6YCJ5Lit5LiA5Liq55So5oi3XHJcbm1hbmFnZS5wcm90b3R5cGUuc2VsZWN0b25lID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdG5hbWUgPSB0YXJnZXQuZGF0YSgnbmFtZScpO1xyXG5cclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdG5hbWUgOiBuYW1lXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFMaXN0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9yZXR1cm4gbmV3IGFydGljbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJ0aWNsZSgpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuc3ViaWQgPSBub3dTdWJJZDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0dGhpcy5yZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLnNlYXJjaCgpO1xyXG59XHJcblxyXG4vL+aKiuWbnuWkjeebuOWFs+eahOS4nOS4nOe7keWumui/m+adpVxyXG5hcnRpY2xlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmNvbW1lbnRQb3N0ID0gb2JqLnBvc3Q7XHJcbn1cclxuXHJcbi8v6K6h566X5Zu+54mH55qE5Liq5pWwXHJcbmFydGljbGUucHJvdG90eXBlLmdldGltZyA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBudW0gPSAwO1xyXG5cdGlmKGRhdGEpe1xyXG5cdFx0Zm9yKHZhciBpID0wLGw9ZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdHZhciBpdGVtID0gZGF0YVtpXTtcclxuXHRcdFx0aWYoaXRlbS50eXBlID09PSAxKXtcclxuXHRcdFx0XHRudW0rKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbnVtO1xyXG59XHJcblxyXG4vL+e7keWumuS6i+S7tlxyXG5hcnRpY2xlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnbmV3YXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLnByZXBlbmRUb0xpc3QoZCk7XHJcblx0fSlcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSkgICAgXHJcbn1cclxuXHJcbi8v5Yqg6L295pu05aSaXHJcbmFydGljbGUucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcgfHwgdGhpcy5lbmQpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0b3JkZXJieSA6ICdjcmVhdGVUaW1lJ1xyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5jaGVja0RhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSA9IDAsbD1kYXRhLmxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHRpdGVtLmltZ251bSA9IHRoaXMuZ2V0aW1nKGl0ZW0ucmVzb3VyY2UpO1xyXG5cdFx0dGhpcy5yZGF0YVtpdGVtLmlkXSA9IGl0ZW0ucmVzb3VyY2U7XHJcblx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0fVxyXG5cdGRhdGEubGlzdCA9IGxpc3Q7XHJcblx0ZGF0YS5zaWQgPSBub3dTdWJJZDtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuLy/mi4nluJblrZDliJfooahcclxuYXJ0aWNsZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRpZighcGFyYW0pe1xyXG5cdFx0cGFyYW0gPSB7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0XHRvcmRlcmJ5IDogJ2NyZWF0ZVRpbWUnXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjZ2kuc2VhcmNoKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMudG90YWwgPSByZXMuZGF0YS50b3RhbDtcclxuXHRcdFx0X3RoaXMubGVuZ3RoICs9IHJlcy5kYXRhLmxpc3QubGVuZ3RoO1xyXG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5jaGVja0RhdGEocmVzLmRhdGEpO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChkYXRhKTtcclxuXHJcblx0XHRcdGlmKHJlcy5kYXRhLnRvcC5sZW5ndGgpe1xyXG5cdFx0XHRcdHZhciBodG1sMSA9IHRtcGwudG9wKHtcclxuXHRcdFx0XHRcdGxpc3QgOiByZXMuZGF0YS50b3BcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdCQoXCIjYXJ0aWNsZVRvcFwiKS5odG1sKGh0bWwxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHRpZihfdGhpcy5sZW5ndGggPj0gX3RoaXMudG90YWwpe1xyXG5cdFx0XHRcdF90aGlzLmVuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRhcnRpY2xlSWQgOiBpZCxcclxuXHRcdFx0aXNTdGFyIDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+i1nic6J+W3sui1nic7XHJcblx0XHRjZ2kuc3RhcihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNTdGFyKTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRhcnRpY2xlSWQgOiBpZFxyXG5cdFx0fTtcclxuXHRcdGNnaS5jb2xsZWN0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uYXR0cignZGF0YS1pZCcsMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeW4luWtkD8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdGFydGljbGVJZCA6IGlkXHJcblx0XHRcdH07XHJcblx0XHRcdGNnaVsnZGVsZXRlJ10ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLmFydGljbGVcIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdHRoaXMuY29tbWVudFBvc3Quc2hvd1Bvc3QoaWQpO1xyXG5cdH1cclxufVxyXG5cclxuLy/miormlrDlj5HluIPnmoTluJblrZDliqDliLDliJfooajmnIDliY3pnaJcclxuYXJ0aWNsZS5wcm90b3R5cGUucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHR2YXIgZGF0YSA9IHRoaXMuY2hlY2tEYXRhKHtsaXN0OltwYXJhbV19KTtcclxuXHR2YXIgaHRtbCA9IHRtcGwubGlzdChkYXRhKTtcclxuXHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuYXJ0aWNsZS5wcm90b3R5cGUucmV2aWV3ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGlkID0gdGFyZ2V0LmRhdGEoJ3BpZCcpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdyZXZpZXcnLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMucmRhdGFbcGlkXVxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG4vLyAvL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxyXG4vLyBhTGlzdC5wcmVwZW5kVG9MaXN0ID0gZnVuY3Rpb24ocGFyYW0pe1xyXG4vLyBcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3BhcmFtXX0pO1xyXG4vLyBcdFx0bGlzdERvbS5wcmVwZW5kKGh0bWwpO1xyXG4vLyB9XHJcblxyXG5hTGlzdC5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHJcbi8v5Yqg6L295pu05aSa5pWw5o2uXHJcbi8qXHJcbmFMaXN0LmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZyh0aGlzLmVuZCk7XHJcblx0aWYobG9hZGluZyB8fCB0aGlzLmVuZCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGFMaXN0LnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHN0YXJ0LFxyXG5cdFx0bGltaXQgOiBsaW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkXHJcblx0fSlcclxufVxyXG5cclxuXHJcblxyXG4vL+aQnOe0ouaVsOaNrlxyXG5hTGlzdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0bG9hZGluZyA9IHRydWU7XHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy50b3RhbCA9IHJlcy50b3RhbDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRzdGFydCArPSBsaW1pdDtcclxuXHRcdFx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRsaXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdH1lbHNle1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn1cclxuKi9cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsImZ1bmN0aW9uIGVtcHR5RnVuKHJlcyl7XHJcblx0Y29uc29sZS5sb2cocmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnUE9TVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXgob3B0LGNhbGxiYWNrLGVycm9yKXtcclxuXHR2YXIgdHlwZSA9IG9wdC50eXBlIHx8ICdHRVQnLFxyXG5cdFx0dXJsID0gb3B0LnVybCxcclxuXHRcdGRhdGEgPSBvcHQuZGF0YTtcclxuXHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZSA6IHR5cGUsXHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyLXRvcFwiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGVmdFwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmdWktdXNlclwiPjwlLXByb1RleHQlPjwvc3Bhbj5cXHJcXG4gICAgICAgIDwlaWYocHJvVGV4dD09PVxcJ+aIkeWIm+W7uueahFxcJyl7JT5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmdWktcGx1c1wiICBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiIGRhdGEtYWN0aW9uPVwiY3JlYXRlXCI+5Yib5bu65Li76aKYPC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgICAgPC9kaXY+XFxyXFxuXFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1yaWdodFwiPlxcclxcbiAgICAgICAg5YWxPHNwYW4gaWQ9XCI8JS1wcm9OYW1lJT5OdW1cIj4yMDwvc3Bhbj7kuKrkuLvpopggPGEgY2xhc3M9XCJwcmUtcGFnZVwiIGRhdGEtYWN0aW9uPVwicHJlXCI+5LiK5LiA6aG1PC9hPiA8YSBjbGFzcz1cIm5leHQtcGFnZVwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPuS4i+S4gOmhtTwvYT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdGltZSBhY3RpdmVcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGVcIiAgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93LWRvd25cIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PiAgICAgXFxyXFxuICAgIDwvaGVhZGVyPlxcclxcblxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saXN0XCIgaWQ9XCI8JS1wcm9OYW1lJT5cIj5cXHJcXG4gICAgICAgICAgICAgICAgIFxcclxcbiAgICA8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlci10b3BcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWxlZnRcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLXVzZXJcIj4nLCAoX19zdGFjay5saW5lbm8gPSAzLCBwcm9UZXh0KSwgXCI8L3NwYW4+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIGlmIChwcm9UZXh0ID09PSBcIuaIkeWIm+W7uueahFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmdWktcGx1c1wiICBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiIGRhdGEtYWN0aW9uPVwiY3JlYXRlXCI+5Yib5bu65Li76aKYPC9hPjwvc3Bhbj5cXG4gICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XFxuICAgICAgICDlhbE8c3BhbiBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBwcm9OYW1lKSwgJ051bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxuICAgICAgPC9kaXY+ICAgICBcXG4gICAgPC9oZWFkZXI+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE5LCBwcm9OYW1lKSwgJ1wiPlxcbiAgICAgICAgICAgICAgICAgXFxuICAgIDwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDwlXFxyXFxuICAgIFx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICBcdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgICAlPlxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydC1saXN0XCI+XFxyXFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+5Yib5bu65Lq6IDwlLWl0ZW0uY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSU+IOacgOi/keabtOaWsCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLnVwZGF0ZVRpbWUpJT4g5Li76aKY6LWE5rqQIDwlLWl0ZW0ucmVzb3VyY2VDb3VudCU+IDwlLWl0ZW0ubWVtYmVyQ291bnQlPuS4quaIkOWRmCA8JS1pdGVtLmFydGljbGVDb3VudCU+5Liq5biW5a2QIDwlLWl0ZW0ucmVzb3VyY2VDb3VudCU+5Liq6LWE5rqQPC9kZD5cXHJcXG4gICAgICA8L2RsPiBcXHJcXG4gICAgPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnQtbGlzdFwiPlxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCIvaW5mby5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0uaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+5Yib5bu65Lq6IFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgXCIg5Yib5bu65pe26Ze0IFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLmNyZWF0ZVRpbWUpKSwgXCIg5pyA6L+R5pu05pawIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgXCIg5Li76aKY6LWE5rqQIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnJlc291cmNlQ291bnQpLCBcIiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZW1iZXJDb3VudCksIFwi5Liq5oiQ5ZGYIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmFydGljbGVDb3VudCksIFwi5Liq5biW5a2QIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnJlc291cmNlQ291bnQpLCBcIuS4qui1hOa6kDwvZGQ+XFxuICAgICAgPC9kbD4gXFxuICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPGR0PjwlLXRpdGxlJT48L2R0PlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuWIm+W7uuS6uiA8JS1jcmVhdG9yTmFtZSU+IOWIm+W7uuaXtumXtCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShjcmVhdGVUaW1lKSU+IOacgOi/keabtOaWsCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZSh1cGRhdGVUaW1lKSU+PC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7kuLvpopjotYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPiA8JS1tZW1iZXJDb3VudCU+5Liq5oiQ5ZGYIDwlLWFydGljbGVDb3VudCU+5Liq5biW5a2QIDwlLWFydGljbGVSZXNvdXJjZUNvdW50JT7kuKrotYTmupAg5oiR55qE5Y+R5biWL+WbnuWkjSA8JS1hcnRpY2xlQ3JlYXRlQ291bnQlPi8xMjwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYWN0LWJ0blwiPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVBcnRpY2xlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkeW4ljwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZvbGxvdy1idG4gPCVpZihmb2xsb3cpeyU+Zm9sbG93ZWQ8JX0lPlwiIGRhdGEtYWN0aW9uPVwiZm9sbG93XCI+PHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+PCVpZihmb2xsb3cpeyU+5bey5YWz5rOoPCV9ZWxzZXslPuWFs+azqDwlfSU+PC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgbWFuYWdlLWJ0blwiIGRhdGEtYWN0aW9uPVwibWFuYWdlXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZVN1YmplY3RcIj48c3BhbiBjbGFzcz1cIm1hbmFnZVwiPjwvc3Bhbj7nrqHnkIY8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFjdGljZS1hY3Qtc2VsZWN0XCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QyLWNvbnRhaW5lciBmb3JtLWNvbnRyb2wgc2VsZWN0IHNlbGVjdC1wcmltYXJ5XCIgaWQ9XCJzMmlkX2F1dG9nZW4xXCI+XFxyXFxuICAgICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInNlbGVjdDItY2hvaWNlXCIgdGFiaW5kZXg9XCItMVwiPiAgIFxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWNob3NlblwiIGlkPVwic2VsZWN0Mi1jaG9zZW4tMlwiPuaMieW4luWtkOagh+etvuetm+mAiTwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgIDxhYmJyIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2gtY2hvaWNlLWNsb3NlXCI+PC9hYmJyPiBcXHJcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9iPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2E+XFxyXFxuICAgICAgICAgICAgLS0+PGxhYmVsIGZvcj1cInMyaWRfYXV0b2dlbjJcIiBjbGFzcz1cInNlbGVjdDItb2Zmc2NyZWVuXCI+PC9sYWJlbD48aW5wdXQgY2xhc3M9XCJzZWxlY3QyLWZvY3Vzc2VyIHNlbGVjdDItb2Zmc2NyZWVuXCIgdHlwZT1cInRleHRcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsbGVkYnk9XCJzZWxlY3QyLWNob3Nlbi0yXCIgaWQ9XCJzMmlkX2F1dG9nZW4yXCI+PC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXHJcXG4gICAgICAgICAgPCEtLeiHquWKqOWIt+aWsDogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYWN0aW9uPVwic3ViamVjdC5hdXRvcmVmcmVzaFwiIC8+LS0+XFxyXFxuICAgICAgICAgIDxhIGhyZWY9XCIvaW5kZXguaHRtbFwiPui/lOWbnjwvYT5cXHJcXG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoIGJvb3RzdHJhcC1zd2l0Y2gtd3JhcHBlciBib290c3RyYXAtc3dpdGNoLWFuaW1hdGUgYm9vdHN0cmFwLXN3aXRjaC1pZC1jdXN0b20tc3dpdGNoLTAxIGJvb3RzdHJhcC1zd2l0Y2gtb2ZmXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtY29udGFpbmVyXCI+XFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9uIGJvb3RzdHJhcC1zd2l0Y2gtcHJpbWFyeVwiPk9OPC9zcGFuPjxsYWJlbCBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtbGFiZWxcIj4mbmJzcDs8L2xhYmVsPjxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb2ZmIGJvb3RzdHJhcC1zd2l0Y2gtZGVmYXVsdFwiPk9GRjwvc3Bhbj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cIlwiIGRhdGEtdG9nZ2xlPVwic3dpdGNoXCIgaWQ9XCJjdXN0b20tc3dpdGNoLTAxXCI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgLS0+XFxyXFxuICAgICAgICA8L2RkPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgICAgIDxkdD5cIiwgKF9fc3RhY2subGluZW5vID0gMSwgdGl0bGUpLCAnPC9kdD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7liJvlu7rkurogJywgKF9fc3RhY2subGluZW5vID0gMiwgY3JlYXRvck5hbWUpLCBcIiDliJvlu7rml7bpl7QgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGNyZWF0ZVRpbWUpKSwgXCIg5pyA6L+R5pu05pawIFwiLCAoX19zdGFjay5saW5lbm8gPSAyLCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZSh1cGRhdGVUaW1lKSksICc8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuS4u+mimOi1hOa6kCAnLCAoX19zdGFjay5saW5lbm8gPSAzLCBzdWJqZWN0UmVzb3VyY2VDb3VudCksIFwiIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBtZW1iZXJDb3VudCksIFwi5Liq5oiQ5ZGYIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBhcnRpY2xlQ291bnQpLCBcIuS4quW4luWtkCBcIiwgKF9fc3RhY2subGluZW5vID0gMywgYXJ0aWNsZVJlc291cmNlQ291bnQpLCBcIuS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBhcnRpY2xlQ3JlYXRlQ291bnQpLCAnLzEyPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZUFydGljbGVcIj48c3BhbiBjbGFzcz1cInBvc3RcIj48L3NwYW4+5Y+R5biWPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZm9sbG93LWJ0biAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGxvdykge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcImZvbGxvd2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey5YWz5rOoXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcbiAgICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgIC0tPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cImFydGljbGUub3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cImFydGljbGUub3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWF1dG8tcmVmdXNlXCI+XFxuICAgICAgICAgIDwhLS3oh6rliqjliLfmlrA6IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWFjdGlvbj1cInN1YmplY3QuYXV0b3JlZnJlc2hcIiAvPi0tPlxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgPC9kZD4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPuWPguS4juS6uiA8JS1tZW1iZXJDb3VudCU+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+57uf6K6hPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbmF2PlxcclxcblxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1hc2lkZS1pbWdcIj5cXHJcXG4gICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMFwiIHNyYz1cImh0dHA6Ly9pbWdzcmMuYmFpZHUuY29tL2ZvcnVtL3clM0Q1ODAvc2lnbj0zYjk1Y2VjNzBjMzM4NzQ0OWNjNTJmNzQ2MTBlZDkzNy9mMDc0ZDBmYzFlMTc4YTgyNzRiMGVmMzdmNjAzNzM4ZGE4NzdlODY4LmpwZ1wiIC8+XFxyXFxuICAgICAgICAgICAg6aKE6KeIICDmoIfms6gg5LiL6L29ICDliKDpmaRcXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgZm9yKHZhciBpIGluIHJlc291cmNlTGlzdCl7XFxyXFxuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcXHJcXG4gICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgICAgICAgICAgPCVpZihpdGVtLnR5cGUgPT09IDEpeyU+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMFwiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiB0aXRsZT1cIjwlLWl0ZW0ubmFtZSU+XCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcclxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT4gIFxcclxcbiAgICAgICAgICAgICAgPCVpZihteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKXsgJT5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+5Yig6ZmkPC9hPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8JX1lbHNlIGlmKGl0ZW0udHlwZSA9PT0gNCB8fCBpdGVtLnR5cGUgPT09Myl7JT5cXHJcXG4gICAgICAgICAgICAgIDx2aWRlbyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtaXRlbS5pZCU+XCIgY29udHJvbHM9XCJjb250cm9sc1wiPlxcclxcbiAgICAgICAgICAgICAg5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBIHZpZGVvIOagh+etvuOAglxcclxcbiAgICAgICAgICAgICAgPC92aWRlbz5cXHJcXG4gICAgICAgICAgICAgIDxhIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAgZGF0YS1hY3Rpb249XCJtYXJrXCIgc3R5bGU9XCJcIj7moIfms6g8L2E+ICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaXRlbS5pZCU+XCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcclxcbiAgICAgICAgICAgICAgPCVpZihteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKXsgJT5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+5Yig6ZmkPC9hPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8JX1lbHNleyU+XFxyXFxuICAgICAgICAgICAgICA8cD48JS1pdGVtLm5hbWUlPjwvcD5cXHJcXG4gICAgICAgICAgICAgIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+ICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgICA8bmF2IGNsYXNzPVwiYnRuLXRvb2xiYXJcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZVwiPui1hOa6kCAnLCAoX19zdGFjay5saW5lbm8gPSAzLCBzdWJqZWN0UmVzb3VyY2VDb3VudCksICc8L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj7lj4LkuI7kurogJywgKF9fc3RhY2subGluZW5vID0gNCwgbWVtYmVyQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+57uf6K6hPC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvbmF2PlxcblxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1hc2lkZS1pbWdcIj5cXG4gICAgICAgICAgPCEtLVxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIj5cXG4gICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMFwiIHNyYz1cImh0dHA6Ly9pbWdzcmMuYmFpZHUuY29tL2ZvcnVtL3clM0Q1ODAvc2lnbj0zYjk1Y2VjNzBjMzM4NzQ0OWNjNTJmNzQ2MTBlZDkzNy9mMDc0ZDBmYzFlMTc4YTgyNzRiMGVmMzdmNjAzNzM4ZGE4NzdlODY4LmpwZ1wiIC8+XFxuICAgICAgICAgICAg6aKE6KeIICDmoIfms6gg5LiL6L29ICDliKDpmaRcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWxpc3RcIj5cXG4gICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE3O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gcmVzb3VyY2VMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzb3VyY2VMaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1yZXNvdXJjZS0nLCAoX19zdGFjay5saW5lbm8gPSAyMSwgaXRlbS5pZCksICdcIj5cXG4gICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIxMDBcIiBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0uaWQpLCAnXCIgdGl0bGU9XCInLCAoX19zdGFjay5saW5lbm8gPSAyMywgaXRlbS5uYW1lKSwgJ1wiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXG4gICAgICAgICAgICAgIDxhIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAyNCwgaXRlbS5pZCksICdcIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIj7pooTop4g8L2E+ICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNCwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+ICBcXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAyNiwgaXRlbS5pZCksICdcIj7liKDpmaQ8L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI4O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gNCB8fCBpdGVtLnR5cGUgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDx2aWRlbyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjksIGl0ZW0uaWQpLCAnXCIgY29udHJvbHM9XCJjb250cm9sc1wiPlxcbiAgICAgICAgICAgICAg5oKo55qE5rWP6KeI5Zmo5LiN5pSv5oyBIHZpZGVvIOagh+etvuOAglxcbiAgICAgICAgICAgICAgPC92aWRlbz5cXG4gICAgICAgICAgICAgIDxhIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMiwgaXRlbS5pZCksICdcIiAgZGF0YS1hY3Rpb249XCJtYXJrXCIgc3R5bGU9XCJcIj7moIfms6g8L2E+ICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDM0LCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHA+XCIsIChfX3N0YWNrLmxpbmVubyA9IDM3LCBpdGVtLm5hbWUpLCAnPC9wPlxcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzgsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQwLCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0MjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9hc2lkZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxyXFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcclxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcclxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXHJcXG4gICAgPC9zcGFuPlxcclxcbjwvZGl2PiBcXHJcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXHJcXG4gIDx1bD5cXHJcXG4gIDwlXFxyXFxuICAgIGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gICAgICBpdGVtID0gbGlzdFtpXTtcXHJcXG4gICU+IFxcclxcbiAgICAgIDxsaSBpZD1cInVzZXI8JS1pdGVtLmlkJT5cIiBjbGFzcz1cInVzZXI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiPjwlLWl0ZW0ubmFtZSU+PC9saT5cXHJcXG4gIDwlfSU+XFxyXFxuICA8L3VsPlxcclxcbjwvZGl2PiAgJyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXG4gICAgPC9zcGFuPlxcbjwvZGl2PiBcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXG4gIDx1bD5cXG4gICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFxcbiAgICAgIDxsaSBpZD1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBjbGFzcz1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCBcIjwvbGk+XFxuICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICA8L3VsPlxcbjwvZGl2PiAgXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZTwlLWlkJT5cIiBkYXRhLWlkPVwiPCUtaWQlPlwiPlxcclxcblx0PCUtbmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZScsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDIsIG5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPjwlLW5hbWUlPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcblx0dmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XFxyXFxuXHRjb25zb2xlLmxvZyhvYmopO1xcclxcbiU+XFxyXFxuPGxpIHRpdGxlPVwiPCUtaXRlbS5tZXNzYWdlJT5cIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtb2JqLmFydGljbGVJZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtcmVhZD1cIjwlLWl0ZW0ucmVhZCU+XCI+PCUtaXRlbS5tZXNzYWdlJT48L2E+PC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKGl0ZW0ud2l0aERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhvYmopO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZXNzYWdlKSwgJ1wiPjxhIGRhdGEtaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA3LCBvYmouYXJ0aWNsZUlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmlkKSwgJ1wiIGRhdGEtcmVhZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVhZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLm1lc3NhZ2UpLCBcIjwvYT48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21zZ2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiBcIlwiLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liA8JS1pdGVtLmNyZWF0b3JOYW1lJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxyXFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT4mc2lkPTwlLWl0ZW0uc3ViamVjdF9pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLmltZ251bT4wKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcclxcbiAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XFxyXFxuICAgICAgICAgICAgZm9yKHZhciBqPTAsbT1pdGVtLnJlc291cmNlLmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xcclxcbiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgZGF0YS1waWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtb2JqLmlkJT5cIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICAgIGlmKGZpcnN0KXtcXHJcXG4gICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xcclxcbiAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsTwlLWl0ZW0uaW1nbnVtJT7lvKA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8JX19JT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSA1LCBzdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiICAg5pyA5ZCO5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnVwZGF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksIFwiJnNpZD1cIiwgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uc3ViamVjdF9pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIGRhdGEtcGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDI2LCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsVwiLCAoX19zdGFjay5saW5lbm8gPSAzMSwgaXRlbS5pbWdudW0pLCBcIuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9IDA7aTxsaXN0Lmxlbmd0aDtpKyspe1xcclxcbnZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaT48c3BhbiBjbGFzcz1cImZ1aS1oZWFydFwiPjwvc3Bhbj7nva7pobbvvJo8YSBocmVmPVwiL2FydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT5cXHJcXG48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCBcIlxcbjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gNDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbDwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiaW5kZXguanMifQ==