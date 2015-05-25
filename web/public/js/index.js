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
	var user = __webpack_require__(3),
		subject = __webpack_require__(6),
		article = __webpack_require__(4),
		msg = __webpack_require__(5),
		notify = __webpack_require__(7),
		label = __webpack_require__(8);
	
	
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
	
	Date.prototype.pattern=function(fmt) {         
	    var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
	}       
	
	window.striker.util = {
		formatTime : formatTime,
		getParameter : getParameter,
	    getNowTime : getNowTime,
		getLen : getLen,
		changeLen : changeLen
	}
	


/***/ },
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(16).user,
		logout = __webpack_require__(16).logout,
		data = __webpack_require__(17).user,
		userManage = __webpack_require__(18),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(30),
		manage : __webpack_require__(31),
		onemanage : __webpack_require__(32)
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(16).article;
	var tmpl = {
		list : __webpack_require__(35),
		top : __webpack_require__(36),
		rlist : __webpack_require__(38)   //资源列表
	};
	
	var articleList = __webpack_require__(19),
		articlePost = __webpack_require__(14);
	
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

	//主题
	var cgi = __webpack_require__(16).subject,
		subjectList = __webpack_require__(20),
		subjectInfo = __webpack_require__(21),
		subjectCreate = __webpack_require__(22);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(41),
		manage : __webpack_require__(31), //管理员
		list : __webpack_require__(42),  //主题列表
		head : __webpack_require__(43),  //主题详情头部
		onemanage : __webpack_require__(32), //单个管理员
		aside : __webpack_require__(44),  //主题详情右边资源列表
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
		var target = $(e.target);
		if(this.listDom.hasClass('hide')){
			this.listDom.removeClass('hide');
			target.attr('class','arrow-down');
		}else{
			this.listDom.addClass('hide');
			target.attr('class','arrow-up');
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//通知
	var notify = {},
		data = __webpack_require__(17).notify,
		cgi = __webpack_require__(16).notify;
	
	var tmpl = {
		list : __webpack_require__(33),
		one : __webpack_require__(34)   //资源列表
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(16).label,
		data = __webpack_require__(17).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(45),
		one : __webpack_require__(46)
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
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(17),
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
	
	var cgi = __webpack_require__(16).article;
	var tmpl = {
		list : __webpack_require__(35),
		rlist : __webpack_require__(38)   //资源列表
	};
	
	
	//重置一个from
	function resetFrom(target){
		target.find('input[name=name]').val('');
		target.find('textarea[name=content]').val('');
		target.find('.pop-res').html('').hide();
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
			this.resList = [];
			this.resMap = {};		
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
	
		this.resList = [];
		this.resMap = {};	
		console.log(233333);
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
					resetFrom(pTarget);
				}
				if(res.code === 0){
					_this.cDom.modal('hide');
					striker.trigger('articleEdited',res.data);
					//striker.article.appendToList(res.data);
				}
				_this.clear();
			});	
		}else{
			cgi.create(param,function(res){
				_this.loading = false;
	
				if(pTarget.hasClass('modal')){
					resetFrom(pTarget);
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
/* 15 */,
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(29),
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
			'ref' : cgiPath+'article/newart', //收藏
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
	
	db.article.ref = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.ref,param,callback);
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(17).user;
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
	
	//显示管理员列表
	manage.prototype.showmlist = function(){
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
			if(i){
				list.push(i);
			}
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
	
	manage.prototype.addone = function(d){
		if(d.id !== data.myInfo.id){
			var html = tmpl.onemanage({
				id : d.id,
				name : d.name
			});
	
			this.idmap[d.id] = 1;
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(17),
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
	
		console.log(cgi);
	
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
		this.orderby = 'createTime';
		this.lasttime = 0;
		this.tmplasttime = 0;
		this.newlist = [];
		this.newDom;
	
		this.reftime = 0;
	
		this.subid = nowSubId;
		this.msg = window.striker.msg;
	
		this.my = data.user.myInfo;
	
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
	
	article.prototype.addnewArticle = function(){
		var data = this.checkData({
			list : this.newlist,
			my : this.my
		});
		var html = tmpl.list(data);	
		this.dom.prepend(html);
		this.newlist = [];
		this.lasttime = this.tmplasttime;
	}
	
	article.prototype.haveNew = function(){
		var _this = this;
		if(!this.newDom){
			
			$('.artice-info').prepend('<div class="have-new">有新的帖子</div>');
			this.newDom = $(".have-new");
			this.newDom.bind('click',function(){
				_this.newDom.hide();
				_this.addnewArticle();
		
			});
		}else{
			this.newDom.show();
		}
	}
	
	article.prototype.getRef = function(){
		var _this = this;
		//this.lasttime = 1432461927000;
		var param = {
			subjectId : this.subid,
			time : new Date(this.lasttime).pattern('yyyy-MM-dd HH:mm:ss')
		}
		cgi.ref(param,function(res){
			if(res.code === 0){
				if(res.data.list.length > 0){
					_this.newlist = res.data.list;
					_this.tmplasttime = res.data.lastTime;
					_this.haveNew();
				}
			}
		});
	}
	
	article.prototype.startRef = function(){
		var _this = this;
		_this.reftime = setInterval(function(){
			_this.getRef();
		},10000);	
	}
	
	//绑定事件
	article.prototype.bindAction = function(){
		var _this = this;
		striker.bind('newarticle',function(e,d){
			_this.prependToList(d);
		})
	
		striker.bind('article:orderbyupdate',function(e,d){
			_this.orderByUpdate();
		})
	
		striker.bind('article:orderbycreate',function(e,d){
			_this.orderByCreate();
		})
	
		striker.bind('autorefresh',function(e,d){
			//自动刷新
			if(d){
				_this.reftime = setInterval(function(){
					_this.startRef();
				},10000);
			}else{
				clearInterval(_this.reftime);
			}
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
	
	//按更新时间排序
	article.prototype.orderByUpdate = function(){
		this.start = 0;
		this.orderby = 'updateTime';
		this.dom.html('');
		this.search({
			start : this.start,
			limit : this.limit,
			subjectId : this.subid,
			orderby : this.orderby
		});
	}
	//按发表时间排序
	article.prototype.orderByCreate = function(){
		this.start = 0;
		this.orderby = 'createTime';
		this.dom.html('');
		this.search({
			start : this.start,
			limit : this.limit,
			subjectId : this.subid,
			orderby : this.orderby
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
			subjectId : this.subid,
			orderby : this.orderby
		});
	}
	
	//验证数据
	article.prototype.checkData = function(data){
		var list = [];
		for(var i = 0,l=data.list.length;i<l;i++){
			var item = data.list[i];
			if(item.resource){
			item.imgnum = this.getimg(item.resource);
				this.rdata[item.id] = item.resource;
			}
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
				orderby : this.orderby
			}
		}
	
		cgi.search(param,function(res){
			
			if(res.code === 0){
				if(!_this.start){
					_this.lasttime = res.data.lastTime;
					_this.startRef();
				}
				_this.total = res.data.total;
				_this.length += res.data.list.length;
				_this.start += _this.limit;
				_this.loading = false;
	
				var data = _this.checkData(res.data);
				data.my = _this.my;
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
		var data = this.checkData({list:[param],my:this.my});
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
	
	aList.article = article;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(17).subject,
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl,
		data = __webpack_require__(17);
	module.exports = sInfo;
	
	var striker = $(window.striker);
	
	var subDom = $("#subjectHead");
	var subAsideDom = $("#subjectAside");
	var postArea = $("#postArticle");
	var myInfo;
	
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
	
		myInfo = data.user.myInfo;
	
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
	
	info.prototype.autoref = function(e){
		var target = $(e.target);
		//console.log(target.prop('checked'));
		striker.trigger('autorefresh',target.prop('checked'))
	}
	
	//视频预览
	info.prototype.showVideo = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			striker.trigger('showVideo',{
				id : id,
				list : this.data.resourceList
			})
		}
	}
	
	info.prototype.link = function(e){
		$("#linkIframe").attr('src',this.data.link);
		$("#showLink").show();
	}
	
	info.prototype.closelink = function(e){
		$("#linkIframe").attr('src','blank');
		$("#showLink").hide();
	}
	
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
	
	info.prototype.articleorderbyupdate = function(e){
		var target = $(e.target),
			pdom = target.parent('.btn-group');
		pdom.find('a').removeClass('active');
		target.addClass('active');
		striker.trigger('article:orderbyupdate');
	}
	
	info.prototype.articleorderbytime = function(e){
		var target = $(e.target),
			pdom = target.parent('.btn-group');	
		pdom.find('a').removeClass('active');
		target.addClass('active');
		striker.trigger('article:orderbycreate');
	}
	
	info.prototype.autorefresh = function(){
		striker.trigger('autorefresh',true);
	}
	
	info.prototype.bindAction = function(){
		var _this = this;
	
		$("#showLink").bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			_this._selectDom = target;
			if(_this[action]){
				_this[action](e);
			}
		})
	
		striker.bind('subjectUpdate',function(e,d){
			_this.data = d;
			d.myInfo = myInfo;
			var html = tmpl.head(d);
			_this.dom.html(html);
	
			if(d.data){
				d.data.my = data.user.myInfo;
				var html = tmpl.aside(d);
				
				_this.asideDom.html(html);			
			}
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
				res.data.myInfo = myInfo;
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
/* 22 */
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
		var member = new window.striker.user.manage('memberArea');
		this.manage = manage;
		this.member = member;
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
		var myInfo = __webpack_require__(17).user.myInfo;
		//this.type = 'type';
		this.titleDom.text('修改帖子');
		$("#subjectTitle").val(data.title),
		$("#subjectMark").val(data.mark),
		$("#subjectOpen").prop('checked',data.private);
		$("#subjectLink").val(data.link);
		$("#subjectGuest").prop('checked',data.guest);
		this.editData = data;
	
		for(var i in data.members){
			var item = data.members[i];
			if(item.role === 1){
				this.manage.addone({
					id : item.id,
					name : item.name
				});
			}else if (item.role === 2 && item.id !== myInfo.id){
				this.member.addone({
					id : item.id,
					name : item.name
				});
			}
		}
	
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
	
	//取选中的管理远
	sCreate.create.prototype.getMemberList = function(){
		return this.member.getManageList();
	}
	
	
	sCreate.create.prototype.clear = function(){
		$("#subjectTitle").val('');
		$("#subjectMark").val('')
		this.resMap = {};
		this.resList = [];
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
	
		$("#scfileName").bind('change',function(e){
			var target = $(e.target);
	
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#scfileForm").submit();
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
					link = $("#subjectLink").val(),
					open = $("#subjectOpen").prop('checked')?0:1,
					guest = $("#subjectGuest").prop('checked')?0:1;
	
				if(tit == ''){
					alert('还没有填写标题');
					return;
				}
	
				var param = {
					title : tit,
					mark : mark,
					link : link,
					private : open,
					guest : guest,
					manages : _this.getManageList(),
					members : _this.getMemberList(),
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
						// console.log(param);
						// return;
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
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	function emptyFun(res){
		console.log(res);
	}
	
	function checkUrl(url){
		if(url.indexOf('?')>=0){
			return url +='&_t='+new Date().getTime();
		}else{
			return url +='?_t='+new Date().getTime();
		}
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
			url : checkUrl(url),
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
			url : checkUrl(url),
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\n	for(var i in list){\r\n	var item = list[i];\r\n	var obj = JSON.parse(item.withData);\r\n%>\r\n<li title="<%-item.message%>"><a data-href="article.html?id=<%-obj.articleId%>" data-id="<%-item.id%>" data-read="<%-item.read%>"><%-item.message%></a></li>\r\n<%}%>',
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
	                    buf.push('\n<li title="', (__stack.lineno = 6, item.message), '"><a data-href="article.html?id=', (__stack.lineno = 6, obj.articleId), '" data-id="', (__stack.lineno = 6, item.id), '" data-read="', (__stack.lineno = 6, item.read), '">', (__stack.lineno = 6, item.message), "</a></li>\n");
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
/* 34 */
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\nconsole.log(my);\r\nfor(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updatorName%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> \r\n        <%if(my.id === item.creator || my.auth === 1){%>\r\n        <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n        <%}%>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            var imgnum = 0;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n                if(imgnum>2){\r\n                  break;\r\n                }\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" />\r\n              <%\r\n                imgnum++;\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                console.log(my);
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n  <div class="artice-one article', (__stack.lineno = 6, item.id), '">\n    <div class="artice-one-aside">', (__stack.lineno = 7, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 9, item.creatorName), "   最后回复 ", (__stack.lineno = 9, item.updatorName), '</div>\n      <div class="info-action">\n        <span class="up" data-id="', (__stack.lineno = 11, item.id), '" data-action="setup" data-status="', (__stack.lineno = 11, item.isStar), '"><span></span>');
	                    __stack.lineno = 11;
	                    if (item.isStar) {
	                        buf.push("已赞");
	                        __stack.lineno = 11;
	                    } else {
	                        buf.push("赞");
	                        __stack.lineno = 11;
	                    }
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 11, item.id), '"><span></span>回复</span> \n        ');
	                    __stack.lineno = 12;
	                    if (my.id === item.creator || my.auth === 1) {
	                        buf.push('\n        <span class="delete" data-action="delete" data-id="', (__stack.lineno = 13, item.id), '"><span></span>删除</span>\n        ');
	                        __stack.lineno = 14;
	                    }
	                    buf.push('\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=', (__stack.lineno = 17, item.id), "&sid=", (__stack.lineno = 17, item.subject_id), '">', (__stack.lineno = 17, item.title), "</a></dt>\n        <dd>\n          ", (__stack.lineno = 19, item.content), "\n        </dd>\n        ");
	                    __stack.lineno = 21;
	                    if (item.imgnum > 0) {
	                        buf.push('\n        <div class="artice-img-list">\n          ');
	                        __stack.lineno = 23;
	                        var first = true;
	                        var imgnum = 0;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                if (imgnum > 2) {
	                                    break;
	                                }
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 35, obj.id), '" data-pid="', (__stack.lineno = 35, item.id), '" data-id="', (__stack.lineno = 35, obj.id), '" data-action="review" />\n              ');
	                                __stack.lineno = 36;
	                                imgnum++;
	                                if (first) {
	                                    first = false;
	                                    buf.push("\n              <span>共", (__stack.lineno = 41, item.imgnum), "张</span>\n              ");
	                                    __stack.lineno = 42;
	                                }
	                                buf.push("\n            </div>\n          ");
	                                __stack.lineno = 44;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 46;
	                    }
	                    buf.push("\n    </div>\n  </div>\n");
	                    __stack.lineno = 49;
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
/* 36 */
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
/* 37 */,
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
/* 41 */
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
/* 42 */
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">\r\n          主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12\r\n          <div>视频 <span data-action="link" ><%-link%></span></div>\r\n        </dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\r\n          <%if(myInfo.auth === 1 || myInfo.id === id){%>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\r\n          <%}%>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <!--\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a>\r\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          自动刷新: <input type="checkbox" data-action="autoref" checked="checked" />\r\n          <a href="/index.html">返回</a>\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
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
	                buf.push("        <dt>", (__stack.lineno = 1, title), '</dt>\n        <dd class="artice-use">创建人 ', (__stack.lineno = 2, creatorName), " 创建时间 ", (__stack.lineno = 2, striker.util.formatTime(createTime)), " 最近更新 ", (__stack.lineno = 2, striker.util.formatTime(updateTime)), '</dd>\n        <dd class="artice-use">\n          主题资源 ', (__stack.lineno = 4, subjectResourceCount), " ", (__stack.lineno = 4, memberCount), "个成员 ", (__stack.lineno = 4, articleCount), "个帖子 ", (__stack.lineno = 4, articleResourceCount), "个资源 我的发帖/回复 ", (__stack.lineno = 4, articleCreateCount), '/12\n          <div>视频 <span data-action="link" >', (__stack.lineno = 5, link), '</span></div>\n        </dd>\n        <dd class="artice-act-btn">\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn ');
	                __stack.lineno = 9;
	                if (follow) {
	                    buf.push("followed");
	                    __stack.lineno = 9;
	                }
	                buf.push('" data-action="follow"><span class="follow"></span>');
	                __stack.lineno = 9;
	                if (follow) {
	                    buf.push("已关注");
	                    __stack.lineno = 9;
	                } else {
	                    buf.push("关注");
	                    __stack.lineno = 9;
	                }
	                buf.push("</a></span>\n          ");
	                __stack.lineno = 10;
	                if (myInfo.auth === 1 || myInfo.id === id) {
	                    buf.push('\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n          ');
	                    __stack.lineno = 12;
	                }
	                buf.push('\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <!--\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a>\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          自动刷新: <input type="checkbox" data-action="autoref" checked="checked" />\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
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
	        input: '        <nav class="btn-toolbar">\r\n          <div class="btn-group">\r\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\r\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\r\n            <span class="btn btn-primary">统计</span>\r\n          </div>\r\n        </nav>\r\n\r\n        <div class="artice-aside-img">\r\n          <!--\r\n          <div class="video">\r\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\r\n            预览  标注 下载  删除\r\n          </div>\r\n          -->\r\n          <div class="img-list">\r\n            <%\r\n              for(var i in resourceList){\r\n              var item = resourceList[i];\r\n            %>\r\n            <div class="sub-resource-<%-item.id%>">\r\n            <%if(item.type === 1){%>\r\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else if(item.type === 4 || item.type ===3){%>\r\n              <div class="video"  data-id="<%-item.id%>"  data-action="showVideo"></div>\r\n              <a data-id="<%-item.id%>"  data-action="mark" style="">标注</a>  <a data-id="<%-item.id%>"  data-action="showVideo">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else{%>\r\n              <p><%-item.name%></p>\r\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>              \r\n            <%}%>\r\n            </div>\r\n            <%}%>\r\n          </div>\r\n        </div>',
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
	                        buf.push('\n              <div class="video"  data-id="', (__stack.lineno = 29, item.id), '"  data-action="showVideo"></div>\n              <a data-id="', (__stack.lineno = 30, item.id), '"  data-action="mark" style="">标注</a>  <a data-id="', (__stack.lineno = 30, item.id), '"  data-action="showVideo">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 30, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 31;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 32, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 33;
	                        }
	                        buf.push("\n            ");
	                        __stack.lineno = 34;
	                    } else {
	                        buf.push("\n              <p>", (__stack.lineno = 35, item.name), '</p>\n              <a href="/cgi/resource/download?id=', (__stack.lineno = 36, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 37;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 38, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 39;
	                        }
	                        buf.push("              \n            ");
	                        __stack.lineno = 40;
	                    }
	                    buf.push("\n            </div>\n            ");
	                    __stack.lineno = 42;
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
/* 45 */
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
/* 46 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmIxYTFmNjk2NGMwZTNhZjM5ZmQ/Mjc5ZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzPzViMjciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vbXNnLmpzPzIzN2IiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvcG9zdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanM/YWVkOSIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbXNnLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL3RvcC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9oZWFkLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvYXNpZGUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxROzs7Ozs7QUN4RUE7QUFDQTtBQUNBLDJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEM7QUFDQSw2Q0FBNEM7QUFDNUMseUM7O0FBRUEsMkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHVDO0FBQ0EsYztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0EsaUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSwwQjtBQUNBLDBGO0FBQ0EsTTtBQUNBLDBCO0FBQ0EsMkk7QUFDQSxNO0FBQ0EscUI7QUFDQSwrQztBQUNBLHFIO0FBQ0EsVTtBQUNBLE07QUFDQSxnQjtBQUNBLEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0EsaUJBQWdCO0FBQ2hCLDRCQUEyQjtBQUMzQixlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QixjQUFjO0FBQ3JDLElBQUc7QUFDSCx3QkFBdUIsZUFBZSwwQjtBQUN0Qzs7QUFFQSxHQUFFO0FBQ0YsdUJBQXNCLGNBQWM7QUFDcEM7QUFDQSx1QkFBc0IsY0FBYztBQUNwQyxJQUFHO0FBQ0gsdUJBQXNCLGVBQWU7QUFDckMsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRjtBQUNBLEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2T0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLHNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7OztBQUdBLHlCOzs7Ozs7QUNoRkE7QUFDQTtBQUNBOztBQUVBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEIsZ0JBQWdCO0FBQzFDO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQSwwQkFBeUIsY0FBYztBQUN2QztBQUNBLG9DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0Esd0JBQXVCLFVBQVU7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTztBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsRTs7Ozs7Ozs7Ozs7QUNsTEE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQixrQ0FBaUM7QUFDakMsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLG9CO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBLG1CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7O0FDNVRBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQSxxQjs7Ozs7O0FDelRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7QUNoQkE7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsNEI7OztBQUdBLG9COztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQSwrQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDMU5BO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLElBQUk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsUTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNkJBQTRCLHdCQUF3QjtBQUNwRDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDeldBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQixpQkFBZ0I7QUFDaEIsZUFBYztBQUNkLGlCQUFnQjs7QUFFaEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsOEI7QUFDQTtBQUNBLEdBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFhLDZCQUE2QjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLEU7Ozs7OztBQ3JQQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0I7QUFDQSxJQUFHOztBQUVIO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLGtDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSzs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU0sRTtBQUNOLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTSxFO0FBQ047O0FBRUE7QUFDQTs7QUFFQSxHQUFFO0FBQ0YsRTs7Ozs7Ozs7Ozs7O0FDeFJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyRUE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM5QkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsdVlBQXNZLElBQUksS0FBSyx5QkFBeUIsNEtBQTRLO0FBQ3BsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM5QkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLHdCQUF3Qix5Q0FBeUMsNktBQTZLO0FBQ3hSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUN0Q0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM5QkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLCtCQUErQixJQUFJLEtBQUsseUJBQXlCLDRiQUE0YixPQUFPLEtBQUssTUFBTSwwSkFBMEosb0hBQW9ILG9RQUFvUSw0RkFBNEYsK0JBQStCLG1EQUFtRCxJQUFJLEtBQUssNkNBQTZDLHVEQUF1RCxpQ0FBaUMsNEJBQTRCLHFCQUFxQiw2TkFBNk4sOEJBQThCLG9DQUFvQywwRkFBMEYsMENBQTBDLG1DQUFtQyxtQ0FBbUM7QUFDNzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFpRSxPQUFPO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNqRkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLGNBQWMsS0FBSyx1QkFBdUIsdUhBQXVIO0FBQ2pNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHdCQUF3QixpSkFBaUo7QUFDL047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsOEtBQTZLLHVMQUF1TDtBQUNwVztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNwQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsNERBQTJELElBQUksS0FBSyw2QkFBNkIsZ1pBQWdaO0FBQ2pmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxpd0JBQWd3QixhQUFhLGtFQUFrRSxRQUFRLEtBQUssT0FBTyx1RUFBdUUseU5BQXlOLDJpREFBMmlEO0FBQzlxRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBoREFBeWhEO0FBQ3poRCxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDbkRBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDJ3QkFBMHdCLDZDQUE2QywrR0FBK0csOFdBQThXLDBHQUEwRyxxQkFBcUIsMkNBQTJDLHNXQUFzVywwR0FBMEcscUJBQXFCLEtBQUssdUxBQXVMLDBHQUEwRyxtQ0FBbUMsMkNBQTJDO0FBQ3Z4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNuRUE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsd0hBQXdIO0FBQzdNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qiw2SkFBNko7QUFDbFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImpzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGZiMWExZjY5NjRjMGUzYWYzOWZkXG4gKiovIiwicmVxdWlyZSgnLi9jb21tb24vZ2xvYmFsJyk7XG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXG5cdHN1YmplY3QgPSByZXF1aXJlKCcuL3N1YmplY3Qvc3ViamVjdCcpLFxuXHRhcnRpY2xlID0gcmVxdWlyZSgnLi9hcnRpY2xlL2FydGljbGUnKSxcblx0bXNnID0gcmVxdWlyZSgnLi9jb21tb24vbXNnJyksXG5cdG5vdGlmeSA9IHJlcXVpcmUoJy4vbm90aWZ5L25vdGlmeScpLFxuXHRsYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwvbGFiZWwnKTtcblxuXG52YXIgU3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xuXG5cbi8v5LqL5Lu26YCa55+lLOeUqOaIt+i1hOaWmeW3sue7j+WKoOi9veWujOaIkFxuZnVuY3Rpb24gdXNlckxvYWQoZSxkKXtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlTdWJqZWN0Jyk7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215Rm9sbG93Jyk7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215SW52aXRlZCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUFyY2hpdmVkJyk7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ29wZW4nKTtcblx0bmV3IG5vdGlmeS5ub3RpZnkoKTtcblx0d2luZG93LnN0cmlrZXIubGFiZWwgPSBuZXcgbGFiZWwubGFiZWwoJ2xhYmVsQXJlYScpO1xuXHR3aW5kb3cuc3RyaWtlci5jcmVhdGVTdWJqZWN0ID0gbmV3IHN1YmplY3QuY3JlYXRlKCk7XG5cdHdpbmRvdy5zdHJpa2VyLm1zZyA9IG5ldyBtc2cubWVzc2FnZSgpO1xuXHQvL3N1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcblx0Ly8gc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xuXHQvLyBzdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG59XG5cbi8v5LqL5Lu26YCa55+lLOS4u+mimOW3sue7j+WKoOi9veWujOaIkFxuZnVuY3Rpb24gc3ViamVjdExvYWQoZSxkKXtcblx0Y29uc29sZS5sb2coZSxkKTtcbn1cblxudmFyIGhhbmRsZXJzID0ge1xuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWQsXG5cdCdzdWJqZWN0TG9hZCcgOiBzdWJqZWN0TG9hZFxufVxuXG5mb3IodmFyIGkgaW4gaGFuZGxlcnMpe1xuXHRTdHJpa2VyLmJpbmQoaSxoYW5kbGVyc1tpXSk7XG59XG5cbi8v5YWo5bGA5LqL5Lu257uR5a6aXG5mdW5jdGlvbiBiaW5kQWN0aW9uKCl7XG5cdCQoJ2JvZHknKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXHRcdGlmKGFjdGlvbil7XG5cdFx0XHR2YXIgYWN0TWFwID0gYWN0aW9uLnNwbGl0KCcuJyk7XG5cdFx0XHR2YXIgbW9kID0gYWN0TWFwWzBdLFxuXHRcdFx0XHRmdW4gPSBhY3RNYXBbMV07XG5cdFx0XHRpZihhY3RNYXAubGVuZ3RoID09PSAyICYmIHN0cmlrZXJbbW9kXVtmdW5dKXtcblxuXHRcdFx0XHRzdHJpa2VyW21vZF1bZnVuXSh0YXJnZXQpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKXtcblx0c3ViamVjdC5pbml0KCdpbmRleCcpO1xuXHQvL2FydGljbGUuaW5pdCgnaW5kZXgnKTtcblx0dXNlci5pbml0KCk7XG5cdGxhYmVsLmluaXQoKTtcblxuXHRzdHJpa2VyLnN1YmplY3QgPSBzdWJqZWN0O1xuXHRzdHJpa2VyLmFydGljbGUgPSBhcnRpY2xlO1xuXHRzdHJpa2VyLnVzZXIgPSB1c2VyO1xuXG5cdGJpbmRBY3Rpb24oKTtcbn1cblxuaW5pdCgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDJcbiAqKi8iLCIvLyBrZWVwIGl0IGlmIHVzaW5nIHVybCBtZDUgcmV2IHJlcGxhY2VtZW50IGluIGphdmFzY3JpcHRcbmNvbnNvbGUubG9nKCdnbG9iYWwgaXMgbG9hZCcpO1xudmFyIG1zaWUgPSAvbXNpZS8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpOyBcbmlmICggbXNpZSApe1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcygnaWUnKTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0VGltZShzdHIpe1xuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cik7XG5cbiAgICB2YXIgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHZhciBtbSA9IChkYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkICAgICAgICAgXG4gICAgdmFyIGRkICA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgcmV0dXJuIHl5eXkgKyAnLScgKyAobW1bMV0/bW06XCIwXCIrbW1bMF0pICsgJy0nICsgKGRkWzFdP2RkOlwiMFwiK2RkWzBdKTtcdFxufVxuXG5mdW5jdGlvbiBnZXROb3dUaW1lKHN0cil7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBhdGltZSA9IG5ldyBEYXRlKHN0cikuZ2V0VGltZSgpO1xuXG4gICAgdmFyIGMgPSBNYXRoLmNlaWwoKG5vdyAtIGF0aW1lKS8xMDAwKTtcbiAgICBpZihjPDYwKXtcbiAgICAgICAgcmV0dXJuICcx5YiG6ZKf5Lul5YaFJztcbiAgICB9ZWxzZSBpZihjPDM2MDApe1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGMvMzYwMCkrJ+WIhumSn+WJjSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKjI0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLygzNjAwKjI0KSkrJ+WkqeWJjSc7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lKHN0cik7XG4gICAgfVxuXG59XG5cbnZhciBnZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihuYW1lLHN0cil7XG4gICAgc3RyID0gc3RyIHx8IGxvY2F0aW9uLmhyZWY7XG4gICAgdmFyIHIgPSBuZXcgUmVnRXhwKFwiKFxcXFw/fCN8JilcIiArIG5hbWUgKyBcIj0oW14mI10qKSgmfCN8JClcIiksIG0gPSBzdHIubWF0Y2gocik7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCghbSA/IFwiXCIgOiBtWzJdKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFtsZW49Ml0g5a2X5q+N5pWwKOWkmuWwkeS4quWtl+avjeeul+S4gOS4quWtlylcbiAqIEBleGFtcGxlXG4gKiAgICAgIGdldExlbignYWJj5LiA5LqM5LiJJyk7XG4gKi9cbnZhciBnZXRMZW4gPSBmdW5jdGlvbihzdHIsbGVuKXtcbiAgICAvL+ato+WImeWPluWIsOS4reaWh+eahOS4quaVsO+8jOeEtuWQjmxlbipjb3VudCvljp/mnaXnmoTplb/luqbjgILkuI3nlKhyZXBsYWNlXG4gICAgdmFyIGZhY3RvciA9IGxlbiB8fCAzO1xuICAgIHN0ciArPSAnJztcbiAgICB2YXIgemhDaGFyID0gc3RyLm1hdGNoKC9bXlxceDAwLVxceGZmXS9nKSB8fCBbXTtcbiAgICB2YXIgbGV0dGVyID0gc3RyLnJlcGxhY2UoL1teXFx4MDAtXFx4ZmZdL2cgLCAnJyk7XG4gICAgcmV0dXJuIHBhcnNlSW50KHpoQ2hhci5sZW5ndGggKyAobGV0dGVyLmxlbmd0aCAvIGZhY3RvcikpO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXgg5oC76ZW/5bqmXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFtsZW49Ml0g6ZW/5bqmXG4gKiBAZXhhbXBsZVxuICogICAgICBjaGFuZ2VMZW4oJ2FiY+S4gOS6jOS4iScsMTApO1xuICovXG52YXIgY2hhbmdlTGVuID0gZnVuY3Rpb24oc3RyLG1heCl7XG5cdHZhciBtYXggPSBtYXggfHwgMTA7XG5cdHZhciBsZW4gPSBnZXRMZW4oc3RyKTtcblx0dmFyIHJldCA9IG1heCAtIGxlbjtcblx0cmV0dXJuIHJldD49MD9yZXQ6MDtcbn1cblxuRGF0ZS5wcm90b3R5cGUucGF0dGVybj1mdW5jdGlvbihmbXQpIHsgICAgICAgICBcbiAgICB2YXIgbyA9IHsgICAgICAgICBcbiAgICBcIk0rXCIgOiB0aGlzLmdldE1vbnRoKCkrMSwgLy/mnIjku70gICAgICAgICBcbiAgICBcImQrXCIgOiB0aGlzLmdldERhdGUoKSwgLy/ml6UgICAgICAgICBcbiAgICBcImgrXCIgOiB0aGlzLmdldEhvdXJzKCklMTIgPT0gMCA/IDEyIDogdGhpcy5nZXRIb3VycygpJTEyLCAvL+Wwj+aXtiAgICAgICAgIFxuICAgIFwiSCtcIiA6IHRoaXMuZ2V0SG91cnMoKSwgLy/lsI/ml7YgICAgICAgICBcbiAgICBcIm0rXCIgOiB0aGlzLmdldE1pbnV0ZXMoKSwgLy/liIYgICAgICAgICBcbiAgICBcInMrXCIgOiB0aGlzLmdldFNlY29uZHMoKSwgLy/np5IgICAgICAgICBcbiAgICBcInErXCIgOiBNYXRoLmZsb29yKCh0aGlzLmdldE1vbnRoKCkrMykvMyksIC8v5a2j5bqmICAgICAgICAgXG4gICAgXCJTXCIgOiB0aGlzLmdldE1pbGxpc2Vjb25kcygpIC8v5q+r56eSICAgICAgICAgXG4gICAgfTsgICAgICAgICBcbiAgICB2YXIgd2VlayA9IHsgICAgICAgICBcbiAgICBcIjBcIiA6IFwiL3U2NWU1XCIsICAgICAgICAgXG4gICAgXCIxXCIgOiBcIi91NGUwMFwiLCAgICAgICAgIFxuICAgIFwiMlwiIDogXCIvdTRlOGNcIiwgICAgICAgICBcbiAgICBcIjNcIiA6IFwiL3U0ZTA5XCIsICAgICAgICAgXG4gICAgXCI0XCIgOiBcIi91NTZkYlwiLCAgICAgICAgIFxuICAgIFwiNVwiIDogXCIvdTRlOTRcIiwgICAgICAgICBcbiAgICBcIjZcIiA6IFwiL3U1MTZkXCIgICAgICAgIFxuICAgIH07ICAgICAgICAgXG4gICAgaWYoLyh5KykvLnRlc3QoZm10KSl7ICAgICAgICAgXG4gICAgICAgIGZtdD1mbXQucmVwbGFjZShSZWdFeHAuJDEsICh0aGlzLmdldEZ1bGxZZWFyKCkrXCJcIikuc3Vic3RyKDQgLSBSZWdFeHAuJDEubGVuZ3RoKSk7ICAgICAgICAgXG4gICAgfSAgICAgICAgIFxuICAgIGlmKC8oRSspLy50ZXN0KGZtdCkpeyAgICAgICAgIFxuICAgICAgICBmbXQ9Zm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoKFJlZ0V4cC4kMS5sZW5ndGg+MSkgPyAoUmVnRXhwLiQxLmxlbmd0aD4yID8gXCIvdTY2MWYvdTY3MWZcIiA6IFwiL3U1NDY4XCIpIDogXCJcIikrd2Vla1t0aGlzLmdldERheSgpK1wiXCJdKTsgICAgICAgICBcbiAgICB9ICAgICAgICAgXG4gICAgZm9yKHZhciBrIGluIG8peyAgICAgICAgIFxuICAgICAgICBpZihuZXcgUmVnRXhwKFwiKFwiKyBrICtcIilcIikudGVzdChmbXQpKXsgICAgICAgICBcbiAgICAgICAgICAgIGZtdCA9IGZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKFJlZ0V4cC4kMS5sZW5ndGg9PTEpID8gKG9ba10pIDogKChcIjAwXCIrIG9ba10pLnN1YnN0cigoXCJcIisgb1trXSkubGVuZ3RoKSkpOyAgICAgICAgIFxuICAgICAgICB9ICAgICAgICAgXG4gICAgfSAgICAgICAgIFxuICAgIHJldHVybiBmbXQ7ICAgICAgICAgXG59ICAgICAgIFxuXG53aW5kb3cuc3RyaWtlci51dGlsID0ge1xuXHRmb3JtYXRUaW1lIDogZm9ybWF0VGltZSxcblx0Z2V0UGFyYW1ldGVyIDogZ2V0UGFyYW1ldGVyLFxuICAgIGdldE5vd1RpbWUgOiBnZXROb3dUaW1lLFxuXHRnZXRMZW4gOiBnZXRMZW4sXG5cdGNoYW5nZUxlbiA6IGNoYW5nZUxlblxufVxuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnVzZXIsXHJcblx0bG9nb3V0ID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxvZ291dCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcixcclxuXHR1c2VyTWFuYWdlID0gcmVxdWlyZSgnLi9tYW5hZ2UnKSxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRuYXYgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci91c2VyX25hdi5lanMnKSxcclxuXHRtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tYW5hZ2UuZWpzJyksXHJcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpXHJcbn1cclxuXHJcbnZhciBVc2VyID0ge30sXHJcblx0X3RoaXMgPSBVc2VyO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XHJcblxyXG4vL+WvueWkluaPkOS+m+eahOaOpeWPo1xyXG53aW5kb3cuc3RyaWtlci51c2VyID0gVXNlcjtcclxuXHJcbi8v566h55CG5ZGY6K6+572u5pi+56S6562J562JXHJcblVzZXIubWFuYWdlID0gdXNlck1hbmFnZS5tYW5hZ2U7XHJcbi8vIFVzZXIuYWRkbWFuYWdlID0gdXNlck1hbmFnZS5zaG93O1xyXG5cclxuLy8gVXNlci5hZGREZWZNYW5hZ2UgPSB1c2VyTWFuYWdlLmFkZERlZk1hbmFnZTtcclxuXHJcblVzZXIuZ2V0TXlJbmZvID0gZnVuY3Rpb24oY2Ipe1xyXG5cdGNnaS5pbmZvKGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubXlJbmZvID0gcmVzLmRhdGE7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5uYXYocmVzLmRhdGEpO1xyXG5cdFx0XHQkKFwiI3VzZXJOYXZcIikuaHRtbChodG1sKTtcclxuXHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkU3ViJyxyZXMuY29kZSk7XHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkQXJ0JyxyZXMuY29kZSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VybG9hZCcpO1xyXG5cdFx0XHRiaW5kQWN0aW9uKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnZhciBteUFjdCA9IHtcclxuXHQnbG9nb3V0JyA6IGZ1bmN0aW9uKCl7XHJcblx0XHRsb2dvdXQoZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dpbi5odG1sJztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG52YXIgYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0JChcIiN1c2VyTmF2XCIpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbil7XHJcblx0XHRcdGlmKG15QWN0W2FjdGlvbl0pe1xyXG5cdFx0XHRcdG15QWN0W2FjdGlvbl0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcblVzZXIuZ2V0VXNlckxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubGlzdCA9IHJlcy5kYXRhO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5Vc2VyLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdF90aGlzLmdldE15SW5mbygpO1xyXG5cdF90aGlzLmdldFVzZXJMaXN0KCk7XHJcblx0dXNlck1hbmFnZS5pbml0KGNnaSx0bXBsKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci91c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJyksXHJcblx0dG9wIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvdG9wLmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIGFydGljbGVMaXN0ID0gcmVxdWlyZSgnLi9saXN0JyksXHJcblx0YXJ0aWNsZVBvc3QgPSByZXF1aXJlKCcuL3Bvc3QnKTtcclxuXHJcbnZhciBBcnRpY2xlID0ge31cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ0aWNsZTtcclxuXHJcbkFydGljbGUubGlzdCA9IGFydGljbGVMaXN0LmFydGljbGU7XHJcblxyXG4vLyBBcnRpY2xlLmxvYWRNb3JlID0gYXJ0aWNsZUxpc3QubG9hZE1vcmU7XHJcblxyXG5BcnRpY2xlLmFwcGVuZFRvTGlzdCA9IGFydGljbGVMaXN0LnByZXBlbmRUb0xpc3Q7XHJcblxyXG4vL0FydGljbGUucG9zdCA9IGFydGljbGVQb3N0LmNyZWF0ZTtcclxuXHJcbi8vQXJ0aWNsZS5yZXNldCA9IGFydGljbGVQb3N0LnJlc2V0O1xyXG5cclxuLyoqL1xyXG5cclxuQXJ0aWNsZS5pbml0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdGFydGljbGVMaXN0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG5cdGFydGljbGVQb3N0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2FydGljbGUuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsInZhciBtc2cgPSB7XHJcblx0MCA6ICfmk43kvZzmiJDlip8hJyxcclxuXHQxMDogJ+aOkuW6j+W6j+WPt+W/hemhu+Whq+WGmScsXHJcblx0MTEgOiAn57uE57uH5ZCN56ew5b+F6aG75aGr5YaZJyxcclxuXHQyMCA6ICfmlrDlr4bnoIHlkozph43lpI3lr4bnoIHlv4XpobvkuIDoh7QnLFxyXG5cdDIxIDogJ+ivt+Whq+WGmeeUqOaIt+WQjeWSjOWvhueggSEnLFxyXG5cdDIyIDogJ+eUqOaIt+S4jeWtmOWcqCcsXHJcblx0MzAgOiAn57uE57uH5pyA5aSa5pSv5oyBM+e6pyEnLCBcclxuXHQ0MCA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQ1MCA6ICfkvaDopoHkuIrkvKDnmoTmlofku7blt7Lnu4/otoXov4fkvaDnmoTliankvZnnqbrpl7QhJyxcclxuXHQ2MCA6ICfkvaDov5jmsqHmnInpgInmi6nopoHlhbHkuqvnmoTnm67lvZUnLFxyXG5cdDc1IDogJ+W6j+WPt+WPquiDveWcqDF+OTnkuYvpl7QnLFxyXG5cdDc2IDogJ+WQjeensOS4jeiDveWwkeS6jjLkuKrlrZcnLFxyXG5cdDc3IDogJ+WPguaVsOS4jeiDveS4uuepuicsXHJcblx0NzggOiAn5a+55LiN6LW377yM572R57uc6LaF5pe25LqG77yM6K+356iN5ZCO5YaN6K+VJyxcclxuXHQ3OSA6ICflt7Lnu4/mnInlkIzlkI3nmoTpobnnm67kuoYnLFxyXG5cdDEwMCA6ICflr7nkuI3otbfvvIzmgqjmsqHmnInov5nkuKrmk43kvZzmnYPpmZAhJywvL+WQjuWPsOWHuumUmeWVpiFcclxuXHQxMDEgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDAxIDogJ+aCqOi/mOayoeacieeZu+W9lSEnLFxyXG5cdDEwMDQgOiAn5rKh5pyJ5om+5Yiw6LWE5rqQIScsXHJcblx0MTAxMCA6ICfmgqjmsqHmnInmn6XnnIvor6XotYTmupDnmoTmnYPpmZAhJyxcclxuXHQxMDExIDogJ+WPguaVsOWHuumUmeWVpiEnLFxyXG5cdDEwMTMgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDE0IDogJ+W3sue7j+WFs+azqOivpeS4u+mimCcsXHJcblx0MTAxNSA6ICflt7Lnu4/lvZLmoaPllaYhJyxcclxuXHQxMDE2IDogJ+ivpei1hOa6kOS4jeiDveWIoOmZpCcsXHJcblx0MTAxNyA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQxMDQxIDogJ+eUqOaIt+WQjeaIluWvhueggemUmeivryEnLFxyXG5cdDEwNDMgOiAn55So5oi35LiN5a2Y5ZyoIScsXHJcblx0MTA1MCA6ICfml7bpl7TkuqTlj4nkuoYhJ1xyXG59XHJcblxyXG5NZXNzZW5nZXIoKS5vcHRpb25zID0ge1xyXG4gICAgZXh0cmFDbGFzc2VzOiAnbWVzc2VuZ2VyLWZpeGVkIG1lc3Nlbmdlci1vbi1ib3R0b20nLFxyXG4gICAgdGhlbWU6ICdmbGF0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG1lc3NhZ2UoKXtcclxuXHR0aGlzO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24obXNnLGxhYmVsLGNiKXtcclxuXHRpZih0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09PSBudWxsKXtcclxuXHRcdGxhYmVsID0ge1xyXG5cdFx0XHRzdWIgOiAn56Gu5a6aJyxcclxuXHRcdFx0Y2FuY2VsIDogJ+WPlua2iCdcclxuXHRcdH1cclxuXHR9XHJcblx0aWYodHlwZW9mIGNiID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRjYiA9IGZ1bmN0aW9uKCl7fTtcclxuXHR9XHJcblx0aWYodHlwZW9mIG1zZyA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdG1lc3NhZ2UgOiBtc2csXHJcblx0XHRhY3Rpb25zIDoge1xyXG5cdFx0XHRzdWIgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5zdWIgfHwgJ+ehruWumicsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FuY2VsIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuY2FuY2VsIHx8ICflj5bmtognLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgbXNnID0gTWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGQpe1xyXG5cdGlmKGQgPT0gMTAwMSl7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZ1tkXSB8fCAn5Ye66ZSZ5ouJISdcclxuXHR9XHJcblx0aWYocGFyc2VJbnQoZCkpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLm1zZyA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZyB8fCAnJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChtc2cpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1x0XHRcclxufVxyXG5cclxuZGIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNFxuICoqLyIsIi8v5Li76aKYXHJcbnZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuc3ViamVjdCxcclxuXHRzdWJqZWN0TGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG5cdHN1YmplY3RJbmZvID0gcmVxdWlyZSgnLi9pbmZvJyksXHJcblx0c3ViamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlJyk7XHJcblxyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG4vL+aooeadv+W8leeUqFxyXG52YXIgdG1wbCA9IHtcclxuXHRhcmVhIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3Qvc2l6ZS5lanMnKSxcclxuXHRtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tYW5hZ2UuZWpzJyksIC8v566h55CG5ZGYXHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2xpc3QuZWpzJyksICAvL+S4u+mimOWIl+ihqFxyXG5cdGhlYWQgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9oZWFkLmVqcycpLCAgLy/kuLvpopjor6bmg4XlpLTpg6hcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJyksIC8v5Y2V5Liq566h55CG5ZGYXHJcblx0YXNpZGUgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9hc2lkZS5lanMnKSwgIC8v5Li76aKY6K+m5oOF5Y+z6L656LWE5rqQ5YiX6KGoXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn07XHJcblxyXG52YXIgcHJvTWFwID0ge1xyXG5cdG15U3ViamVjdCA6ICfmiJHliJvlu7rnmoQnLFxyXG5cdG15Rm9sbG93IDogJ+aIkeWFs+azqOeahCcsXHJcblx0bXlJbnZpdGVkIDogJ+mCgOivt+aIkeeahCcsXHJcblx0b3BlbiA6ICflhazlvIDkuLvpopgnLFxyXG5cdG15QXJjaGl2ZWQgOiAn5b2S5qGj5Li76aKYJ1xyXG59XHJcblxyXG52YXIgU3ViamVjdCA9IHt9O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTdWJqZWN0O1xyXG5cclxuLyrlrprkuYnpgJrnlKjlj4LmlbAqL1xyXG52YXIgc3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5TdWJqZWN0LnNlYXJjaCA9IHN1YmplY3RMaXN0LnNlYXJjaDtcclxuXHJcblN1YmplY3QuY3JlYXRlID0gc3ViamVjdENyZWF0ZS5jcmVhdGU7XHJcblxyXG5TdWJqZWN0LmluZm8gPSBzdWJqZWN0SW5mby5pbmZvO1xyXG5cclxuU3ViamVjdC5hcmVhID0gZnVuY3Rpb24oZG9tbmFtZSl7XHJcblx0dmFyIHByb05hbWUgPSBkb21uYW1lLFxyXG5cdFx0ZG9tID0gJCgnIycrZG9tbmFtZSsnQmxvY2snKTtcclxuXHR0aGlzLnByb05hbWUgPSBkb21uYW1lO1xyXG5cdHRoaXMuZG9tID0gZG9tO1xyXG5cdHRoaXMucGFnZSA9IDA7ICAgLy/lvIDlp4vpobXnoIFcclxuXHR0aGlzLmFsbFBhZ2UgPSAwO1xyXG5cdHRoaXMubGltaXQgPSA1OyAvL+S4gOmhteeahOadoeaVsFxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7Ly8wIOaMieaXtumXtOaOkuW6jywxIOaMieabtOaWsOaXtumXtOaOkuW6j1xyXG5cdHRoaXMubGlzdERvbTsgLy/liJfooajnmoTkvY3nva5cclxuXHR2YXIgaHRtbCA9IHRtcGwuYXJlYSh7XHJcblx0XHRwcm9UZXh0IDogcHJvTWFwW2RvbW5hbWVdLFxyXG5cdFx0cHJvTmFtZSA6IGRvbW5hbWVcclxuXHR9KTtcclxuXHRkb20uaHRtbChodG1sKTtcclxuXHR0aGlzLmxpc3REb20gPSAkKCcjJytkb21uYW1lKTtcclxuXHR0aGlzLm51bURvbSA9ICQoXCIjXCIrZG9tbmFtZSsnTnVtJyk7XHJcblx0dGhpcy5wcmVQYWdlID0gZG9tLmZpbmQoJy5wcmUtcGFnZScpO1xyXG5cdHRoaXMubmV4dFBhZ2UgPSBkb20uZmluZCgnLm5leHQtcGFnZScpO1x0XHJcblx0dGhpcy50aW1lRG9tID0gZG9tLmZpbmQoJy50aW1lJyk7XHJcblx0dGhpcy51cGRhdGVEb20gPSBkb20uZmluZCgnLnVwZGF0ZScpO1xyXG5cdHRoaXMuYWxsTnVtID0gMDtcclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuLy/kuIvkuIDpobVcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5uZXh0ID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPCB0aGlzLmFsbFBhZ2UtMSl7XHJcblx0XHR0aGlzLnBhZ2UrKztcclxuXHRcdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcblxyXG4vL+S4iuS4gOmhtVxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLnByZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlID4gMCl7XHJcblx0XHR0aGlzLnBhZ2UtLTtcclxuXHRcdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuLy/miZPlvIDmlLbotbdcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRpZih0aGlzLmxpc3REb20uaGFzQ2xhc3MoJ2hpZGUnKSl7XHJcblx0XHR0aGlzLmxpc3REb20ucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuXHRcdHRhcmdldC5hdHRyKCdjbGFzcycsJ2Fycm93LWRvd24nKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMubGlzdERvbS5hZGRDbGFzcygnaGlkZScpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoJ2NsYXNzJywnYXJyb3ctdXAnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5oyJ5Y+R6KGo5pe26Ze05o6S5bqPXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xyXG5cdC8vIG9yZGVyYnk6IHVwZGF0ZVRpbWUgLyBjcmVhdGVUaW1lXHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLnRpbWVEb20uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMudXBkYXRlRG9tLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHJcbn1cclxuXHJcbi8v5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5vcmRlciA9ICd1cGRhdGVUaW1lJztcclxuXHR0aGlzLnVwZGF0ZURvbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy50aW1lRG9tLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcdFxyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcdFxyXG59XHJcblxyXG4vL+aWsOW7uuS4u+mimFxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYoIXRoaXMuY3JlYXRlU3ViamVjdCl7XHJcblx0XHR0aGlzLmNyZWF0ZVN1YmplY3QgPSB3aW5kb3cuc3RyaWtlci5jcmVhdGVTdWJqZWN0O1xyXG5cdH1cclxuXHRpZighdGhpcy5sYWJlbCl7XHJcblx0XHR0aGlzLmxhYmVsID0gd2luZG93LnN0cmlrZXIubGFiZWw7XHJcblx0fVxyXG5cdHRoaXMuY3JlYXRlU3ViamVjdC5jaGFuZ2VUeXBlKHRoaXMucHJvTmFtZSk7XHJcblx0Ly90aGlzLmxhYmVsLmluaXQoKTtcclxufVxyXG5cclxuLy/liKTmlq3nv7vpobXmmK/lkKblj6/ku6Xngrnlh7tcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jaGVja1BhZ2UgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA8PSAxKXtcclxuXHRcdHRoaXMucHJlUGFnZS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmKHRoaXMuYWxsUGFnZSA9PT0gMSl7XHJcblx0XHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6ZmFsc2V9KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcdFxyXG5cdFx0fVxyXG5cdFx0XHJcblx0fWVsc2UgaWYodGhpcy5wYWdlID49IHRoaXMuYWxsUGFnZS0xKXtcclxuXHRcdHRoaXMubmV4dFBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYodGhpcy5hbGxQYWdlID09PSAxKXtcclxuXHRcdFx0dGhpcy5wcmVQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLnByZVBhZ2UucHJvcCh7ZGlzYWJsZWQ6ZmFsc2V9KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XHJcblxyXG4vL+S/ruaUueaAu+aVsFxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNoYW5nZU51bSA9IGZ1bmN0aW9uKG51bSl7XHJcblx0dGhpcy5hbGxQYWdlID0gTWF0aC5jZWlsKG51bS90aGlzLmxpbWl0KTtcclxuXHR0aGlzLmFsbE51bSA9IG51bTtcclxuXHR0aGlzLm51bURvbS50ZXh0KG51bSk7XHJcbn1cclxuXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIGZ1bm5hbWUgPSAnc2VhcmNoJztcclxuXHRpZih0aGlzLnByb05hbWUgPT09ICdteUZvbGxvdycpe1xyXG5cdFx0ZnVubmFtZSA9ICdmb2xsb3dpbmcnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdteUludml0ZWQnKXtcclxuXHRcdGZ1bm5hbWUgPSAnaW52aXRlZCc7XHJcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ215QXJjaGl2ZWQnKXtcclxuXHRcdGZ1bm5hbWUgPSAnYXJjaGl2ZWQnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdvcGVuJyl7XHJcblx0XHRwYXJhbS5wcml2YXRlID0gMTtcclxuXHR9ZWxzZSBpZih0aGlzLnByb05hbWUgPT09ICdteVN1YmplY3QnKXtcclxuXHRcdGZ1bm5hbWUgPSAnbGlzdCc7XHJcblx0fVxyXG5cclxuXHRjZ2lbZnVubmFtZV0ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmNoYW5nZU51bShyZXMuZGF0YS50b3RhbCk7XHJcblx0XHRcdF90aGlzLmNoZWNrUGFnZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKlxyXG7ogIPomZHliLDpppbpobXnu5PmnoTnmoTnibnmrormgKcs6L+Z6YeM5YiG5Z2X57uR5a6a5LqL5Lu2XHJcbiovXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3N1YmplY3RDcmVhdGVkJyxmdW5jdGlvbigpe1xyXG5cdFx0aWYoJ215U3ViamVjdCcgPT09IF90aGlzLnByb05hbWUpe1xyXG5cdFx0XHRfdGhpcy5hbGxOdW0rKztcclxuXHRcdFx0X3RoaXMuY2hhbmdlTnVtKF90aGlzLmFsbE51bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5TdWJqZWN0LmluaXQgPSBmdW5jdGlvbih0eXBlKXtcclxuXHRzdWJqZWN0TGlzdC5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG5cdHN1YmplY3RJbmZvLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdENyZWF0ZS5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L3N1YmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIi8v6YCa55+lXHJcbnZhciBub3RpZnkgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubm90aWZ5LFxyXG5cdGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5ub3RpZnk7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2cuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59XHJcblxyXG52YXIgbm90aWZ5T2JqID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjbm90aWZ5TGlzdFwiKTtcclxuXHR0aGlzLnRpcHNEb20gPSAkKFwiI3VzZXJOYXYgLm1zZyBkaXZcIik7XHJcblxyXG5cdHRoaXMubXNnTnVtID0gMDtcclxuXHR0aGlzLmdldCgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuc2VhcmNoKHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aCl7XHJcblx0XHRcdFx0X3RoaXMubXNnTnVtID0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSkuc2hvdygpO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxubm90aWZ5T2JqLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMudGlwc0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRpZihfdGhpcy5tc2dOdW0pe1xyXG5cdFx0XHRpZihfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnKSl7XHJcblx0XHRcdFx0X3RoaXMuZG9tLmhpZGUoKTtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDApO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5kb20uc2hvdygpO1x0XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS5kYXRhKCdzaG93JywxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRocmVmID0gdGFyZ2V0LmRhdGEoJ2hyZWYnKSxcclxuXHRcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdFx0cmVhZCA9IHRhcmdldC5kYXRhKCdyZWFkJyk7XHJcblxyXG5cclxuXHRcdGlmKGhyZWYpe1xyXG5cdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0aWYocmVhZCA9PSAnJyl7XHJcblx0XHRcdFx0Y2dpLnJlYWQoe1xyXG5cdFx0XHRcdFx0bm90aWZ5SWQgOiBpZFxyXG5cdFx0XHRcdH0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0LnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5tc2dOdW0tLTtcclxuXHRcdFx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbm5vdGlmeS5ub3RpZnkgPSBub3RpZnlPYmo7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBub3RpZnk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9ub3RpZnkvbm90aWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubGFiZWwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLmxhYmVsLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBMYWJlbCA9IHt9LFxyXG5cdF90aGlzID0gTGFiZWw7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTGFiZWwubGFiZWwgPSBmdW5jdGlvbihuYW1lKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XHJcblxyXG5cdHRoaXMubm93RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcclxuXHQvLyBpZih0eXBlID09PSAnc3ViJyl7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRTdWJMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcclxuXHQvLyB9ZWxzZXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZEFydExhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xyXG5cdC8vIH1cclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmFkZERvbS5maW5kKCcubGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xyXG5cdHRoaXMuaW5wdXREb20gPSB0aGlzLmFkZERvbS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblx0dGhpcy5fc2VsZWN0RG9tOy8v5b2T5YmN6YCJ5Lit55qE5YWD57SgXHJcblxyXG5cdC8v6buY6K6k5rKh5pyJ5qCH562+XHJcblx0dGhpcy5ub3dEb20uaGlkZSgpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHJcblx0Ly/lt7Lnu4/pgInkuK3nmoRpZG1hcFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLmdldERhdGEoKTtcdFxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Ly9cclxuXHQvLyB0aGlzLm5vd0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHQvLyBcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0Ly8gXHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciB2YWwgPSB0aGlzLmlucHV0RG9tLnZhbCgpO1xyXG5cdGlmKHZhbCAhPT0gJycpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRuYW1lIDogdmFsXHJcblx0XHR9O1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5tYXBbcmVzLmRhdGEuaWRdID0gcmVzLmRhdGE7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3Jlcy5kYXRhXX0pO1xyXG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdC8vIC9jb25zb2xlLmxvZyh0aGlzLl9zZWxlY3REb20pO1xyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHR9XHJcblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XHJcblx0Ly90aGlzLm5vd0RvbS5zaG93KCk7XHJcblxyXG5cdC8vZnVpLWNyb3NzXHJcblx0Ly9mdWktcGx1c1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpyZXMuZGF0YX0pO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsbD1yZXMuZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSByZXMuZGF0YVtpXTtcclxuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCB2YXIgaHRtbCA9IHRtcGwub25lKHtsaXN0OmRhdGF9KTtcclxuXHQgdGhpcy5ub3dEb20uaHRtbChodG1sKS5zaG93KCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRsaXN0IDogW3RoaXMubWFwW2lkXV1cclxuXHR9XHJcblxyXG5cdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZShwYXJhbSk7XHJcblx0XHR0aGlzLm5vd0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHQvLyBjb25zb2xlLmxvZyh0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5sZW5ndGgpO1xyXG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Ly8gXHRpZihpZCl7XHJcblx0Ly8gXHRcdGxpc3QucHVzaChpZCk7XHJcblx0Ly8gXHR9XHRcdFx0XHRcclxuXHQvLyB9KVx0XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/liKDpmaRcclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0cC5yZW1vdmUoKTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGFiZWwvbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFQb3N0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjAsXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhUG9zdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpLFxyXG5cdHJlc0xpc3QgPSBbXTtcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XHJcblx0dGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgnLnBvcC1yZXMnKS5odG1sKCcnKS5oaWRlKCk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxufVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5jRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5jRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXHJcblxyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5jRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRfdGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS5mb2N1cygpO1xyXG5cdFx0fSwxMDAwKVx0XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1x0XHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cclxucG9zdC5wcm90b3R5cGUuZ2V0UGFyYW0gPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3VwbG9hZEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVx0XHRcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcdFxyXG5cdGNvbnNvbGUubG9nKDIzMzMzMyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdC8vY29uc29sZS5sb2cocFRhcmdldCk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHRoaXMuZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0aWYocGFyYW0udGl0bGUgPT09ICcnIHx8IHBhcmFtLmNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignbmV3YXJ0aWNsZScscmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcclxuXHRtZXNzYWdlID0gcmVxdWlyZSgnLi9tc2cnKTtcclxuXHJcbnZhciBtc2cgPSBuZXcgbWVzc2FnZS5tZXNzYWdlKCk7XHJcblxyXG52YXIgY2dpUGF0aCA9ICcvY2dpLyc7XHJcbnZhciBjZ2lMaXN0ID0ge1xyXG5cdHVzZXIgOiB7XHJcblx0XHRsaXN0IDogY2dpUGF0aCsndXNlci9saXN0JyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKyd1c2VyL2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsndXNlci9jcmVhdGUnXHJcblx0fSxcclxuXHRzdWJqZWN0IDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3N1YmplY3QvbGlzdCcsIC8vIOaIkeeahOWIl+ihqFxyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnc3ViamVjdC9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3N1YmplY3QvaW5mbycsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnc3ViamVjdC9lZGl0JywgLy/kv67mlLnkuLvpophcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnc3ViamVjdC9kZWxldGUnLFxyXG5cdFx0Zm9sbG93IDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3cnLCAvL+WFs+azqFxyXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0aW52aXRlZCA6IGNnaVBhdGgrJ3N1YmplY3QvaW52aXRlZCcsIC8v6YKA6K+35YiX6KGoXHJcblx0XHRhcmNoaXZlZCA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZWQnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0YXJjaGl2ZSA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZScsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRkZWxyZXNvdXJjZSA6IGNnaVBhdGggKyAnc3ViamVjdC9kZWxyZXNvdXJjZScgLy/liKDpmaTkuIDkuKrotYTmupBcclxuXHR9LFxyXG5cdGFydGljbGUgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydhcnRpY2xlL3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnYXJ0aWNsZS9pbmZvJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXJpbmcnLCAvL+i1nueahOW4luWtkFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0ZWQnLCAvL+aQnOiXj+eahOW4luWtkFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2FydGljbGUvZWRpdCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyJywgLy/otZ5cclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3QnLCAvL+aUtuiXj1xyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydhcnRpY2xlL2RlbGV0ZScsIC8v5pS26JePXHJcblx0XHQnc2V0dG9wJyA6IGNnaVBhdGgrJ2FydGljbGUvc2V0VG9wJywgLy/mlLbol49cclxuXHRcdCdyZWYnIDogY2dpUGF0aCsnYXJ0aWNsZS9uZXdhcnQnLCAvL+aUtuiXj1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRjb21tZW50IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnY29tbWVudC9zZWFyY2gnLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3RlZCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnY29tbWVudC9zdGFyJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnY29tbWVudC9kZWxldGUnLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2NvbW1lbnQvZWRpdCcsXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0JyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xyXG5cdH0sXHJcblx0bm90aWZ5IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3NlYXJjaCcsXHJcblx0XHRyZWFkIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3JlYWQnLFxyXG5cdH0sXHJcblx0bGFiZWwgOiB7XHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydsYWJlbC9jcmVhdGUnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ2xhYmVsL2xpc3QnXHJcblx0fSxcclxuXHRyZXNvdXJjZSA6IHtcclxuXHRcdG1hcmsgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL21hcmsnLFxyXG5cdFx0c3BsaXQgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL3NwbGl0JyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL2xpc3QnXHJcblx0fSxcclxuXHRsb2dpbiA6IGNnaVBhdGgrJ2FjY291bnQvbG9naW4nLFxyXG5cdGxvZ291dCA6IGNnaVBhdGgrJ2FjY291bnQvbG9nb3V0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcclxufVxyXG4vLyAv57uf5LiA5Ye65p2l5by55Ye65raI5oGvXHJcbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjYihyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fWVsc2UgaWYoZmxhZyl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kYi5sb2dpbiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dpbixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxvZ291dCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9nb3V0LHt9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlciA9IHt9O1xyXG5kYi51c2VyLmxpc3QgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmxpc3QsbnVsbCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIuaW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuaW5mbyxudWxsLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG4vL+ebtOaOpeaLieaJgOacieeUqOaItz9cclxuZGIudXNlci5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdCA9IHt9O1xyXG5cclxuZGIuc3ViamVjdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QubGlzdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3cgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmZvbGxvdyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3dpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmZvbGxvd2luZyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbnZpdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbnZpdGVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5kZWxyZXNvdXJjZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZGVscmVzb3VyY2UscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmFydGljbGUgPSB7fTtcclxuXHJcbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuYXJ0aWNsZS5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlWydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUucmVmID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5yZWYscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnNldHRvcCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc2V0dG9wLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudCA9IHt9O1xyXG5cclxuZGIuY29tbWVudC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5ub3RpZnkgPSB7fTtcclxuXHJcbmRiLm5vdGlmeS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5ub3RpZnkuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLm5vdGlmeS5yZWFkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0Lm5vdGlmeS5yZWFkLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubGFiZWwuY3JlYXRlLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmxhYmVsLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sYWJlbC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZSA9IHt9O1xyXG5cclxuZGIucmVzb3VyY2UubWFyayA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5tYXJrLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLnNwbGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnJlc291cmNlLnNwbGl0LCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5yZXNvdXJjZS5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2NnaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMiAzIDRcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bWxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGlmKGkpe1xyXG5cdFx0XHRsaXN0LnB1c2goaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5hZGRvbmUgPSBmdW5jdGlvbihkKXtcclxuXHRpZihkLmlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBkLmlkLFxyXG5cdFx0XHRuYW1lIDogZC5uYW1lXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmlkbWFwW2QuaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFMaXN0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Y29uc29sZS5sb2coY2dpKTtcclxuXHJcblx0Ly9yZXR1cm4gbmV3IGFydGljbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJ0aWNsZSgpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5vcmRlcmJ5ID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMubGFzdHRpbWUgPSAwO1xyXG5cdHRoaXMudG1wbGFzdHRpbWUgPSAwO1xyXG5cdHRoaXMubmV3bGlzdCA9IFtdO1xyXG5cdHRoaXMubmV3RG9tO1xyXG5cclxuXHR0aGlzLnJlZnRpbWUgPSAwO1xyXG5cclxuXHR0aGlzLnN1YmlkID0gbm93U3ViSWQ7XHJcblx0dGhpcy5tc2cgPSB3aW5kb3cuc3RyaWtlci5tc2c7XHJcblxyXG5cdHRoaXMubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cclxuXHR0aGlzLnJkYXRhID0ge307XHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMuc2VhcmNoKCk7XHJcbn1cclxuXHJcbi8v5oqK5Zue5aSN55u45YWz55qE5Lic5Lic57uR5a6a6L+b5p2lXHJcbmFydGljbGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuY29tbWVudFBvc3QgPSBvYmoucG9zdDtcclxufVxyXG5cclxuLy/orqHnrpflm77niYfnmoTkuKrmlbBcclxuYXJ0aWNsZS5wcm90b3R5cGUuZ2V0aW1nID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIG51bSA9IDA7XHJcblx0aWYoZGF0YSl7XHJcblx0XHRmb3IodmFyIGkgPTAsbD1kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBkYXRhW2ldO1xyXG5cdFx0XHRpZihpdGVtLnR5cGUgPT09IDEpe1xyXG5cdFx0XHRcdG51bSsrO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBudW07XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmFkZG5ld0FydGljbGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBkYXRhID0gdGhpcy5jaGVja0RhdGEoe1xyXG5cdFx0bGlzdCA6IHRoaXMubmV3bGlzdCxcclxuXHRcdG15IDogdGhpcy5teVxyXG5cdH0pO1xyXG5cdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1x0XHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxuXHR0aGlzLm5ld2xpc3QgPSBbXTtcclxuXHR0aGlzLmxhc3R0aW1lID0gdGhpcy50bXBsYXN0dGltZTtcclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuaGF2ZU5ldyA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRpZighdGhpcy5uZXdEb20pe1xyXG5cdFx0XHJcblx0XHQkKCcuYXJ0aWNlLWluZm8nKS5wcmVwZW5kKCc8ZGl2IGNsYXNzPVwiaGF2ZS1uZXdcIj7mnInmlrDnmoTluJblrZA8L2Rpdj4nKTtcclxuXHRcdHRoaXMubmV3RG9tID0gJChcIi5oYXZlLW5ld1wiKTtcclxuXHRcdHRoaXMubmV3RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG5cdFx0XHRfdGhpcy5uZXdEb20uaGlkZSgpO1xyXG5cdFx0XHRfdGhpcy5hZGRuZXdBcnRpY2xlKCk7XHJcblx0XHJcblx0XHR9KTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMubmV3RG9tLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmdldFJlZiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHQvL3RoaXMubGFzdHRpbWUgPSAxNDMyNDYxOTI3MDAwO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHR0aW1lIDogbmV3IERhdGUodGhpcy5sYXN0dGltZSkucGF0dGVybigneXl5eS1NTS1kZCBISDptbTpzcycpXHJcblx0fVxyXG5cdGNnaS5yZWYocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0aWYocmVzLmRhdGEubGlzdC5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHRfdGhpcy5uZXdsaXN0ID0gcmVzLmRhdGEubGlzdDtcclxuXHRcdFx0XHRfdGhpcy50bXBsYXN0dGltZSA9IHJlcy5kYXRhLmxhc3RUaW1lO1xyXG5cdFx0XHRcdF90aGlzLmhhdmVOZXcoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5zdGFydFJlZiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRfdGhpcy5yZWZ0aW1lID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHRcdF90aGlzLmdldFJlZigpO1xyXG5cdH0sMTAwMDApO1x0XHJcbn1cclxuXHJcbi8v57uR5a6a5LqL5Lu2XHJcbmFydGljbGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0c3RyaWtlci5iaW5kKCduZXdhcnRpY2xlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMucHJlcGVuZFRvTGlzdChkKTtcclxuXHR9KVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ2FydGljbGU6b3JkZXJieXVwZGF0ZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLm9yZGVyQnlVcGRhdGUoKTtcclxuXHR9KVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ2FydGljbGU6b3JkZXJieWNyZWF0ZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLm9yZGVyQnlDcmVhdGUoKTtcclxuXHR9KVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ2F1dG9yZWZyZXNoJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0Ly/oh6rliqjliLfmlrBcclxuXHRcdGlmKGQpe1xyXG5cdFx0XHRfdGhpcy5yZWZ0aW1lID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRfdGhpcy5zdGFydFJlZigpO1xyXG5cdFx0XHR9LDEwMDAwKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRjbGVhckludGVydmFsKF90aGlzLnJlZnRpbWUpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSkgICAgXHJcbn1cclxuXHJcbi8v5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcbmFydGljbGUucHJvdG90eXBlLm9yZGVyQnlVcGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMub3JkZXJieSA9ICd1cGRhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJieVxyXG5cdH0pO1xyXG59XHJcbi8v5oyJ5Y+R6KGo5pe26Ze05o6S5bqPXHJcbmFydGljbGUucHJvdG90eXBlLm9yZGVyQnlDcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMub3JkZXJieSA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJieVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcblxyXG4vL+WKoOi9veabtOWkmlxyXG5hcnRpY2xlLnByb3RvdHlwZS5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5sb2FkaW5nIHx8IHRoaXMuZW5kKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyYnlcclxuXHR9KTtcclxufVxyXG5cclxuLy/pqozor4HmlbDmja5cclxuYXJ0aWNsZS5wcm90b3R5cGUuY2hlY2tEYXRhID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgPSAwLGw9ZGF0YS5saXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHZhciBpdGVtID0gZGF0YS5saXN0W2ldO1xyXG5cdFx0aWYoaXRlbS5yZXNvdXJjZSl7XHJcblx0XHRpdGVtLmltZ251bSA9IHRoaXMuZ2V0aW1nKGl0ZW0ucmVzb3VyY2UpO1xyXG5cdFx0XHR0aGlzLnJkYXRhW2l0ZW0uaWRdID0gaXRlbS5yZXNvdXJjZTtcclxuXHRcdH1cclxuXHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHR9XHJcblx0ZGF0YS5saXN0ID0gbGlzdDtcclxuXHRkYXRhLnNpZCA9IG5vd1N1YklkO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vL+aLieW4luWtkOWIl+ihqFxyXG5hcnRpY2xlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdGlmKCFwYXJhbSl7XHJcblx0XHRwYXJhbSA9IHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyYnlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFxyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZighX3RoaXMuc3RhcnQpe1xyXG5cdFx0XHRcdF90aGlzLmxhc3R0aW1lID0gcmVzLmRhdGEubGFzdFRpbWU7XHJcblx0XHRcdFx0X3RoaXMuc3RhcnRSZWYoKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy50b3RhbCA9IHJlcy5kYXRhLnRvdGFsO1xyXG5cdFx0XHRfdGhpcy5sZW5ndGggKz0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XHJcblx0XHRcdF90aGlzLnN0YXJ0ICs9IF90aGlzLmxpbWl0O1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHR2YXIgZGF0YSA9IF90aGlzLmNoZWNrRGF0YShyZXMuZGF0YSk7XHJcblx0XHRcdGRhdGEubXkgPSBfdGhpcy5teTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QoZGF0YSk7XHJcblxyXG5cdFx0XHRpZihyZXMuZGF0YS50b3AubGVuZ3RoKXtcclxuXHRcdFx0XHR2YXIgaHRtbDEgPSB0bXBsLnRvcCh7XHJcblx0XHRcdFx0XHRsaXN0IDogcmVzLmRhdGEudG9wXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQkKFwiI2FydGljbGVUb3BcIikuaHRtbChodG1sMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuZG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0aWYoX3RoaXMubGVuZ3RoID49IF90aGlzLnRvdGFsKXtcclxuXHRcdFx0XHRfdGhpcy5lbmQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHRcclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWQsXHJcblx0XHRcdGlzU3RhciA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfotZ4nOiflt7LotZ4nO1xyXG5cdFx0Y2dpLnN0YXIocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzU3Rhcik7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWRcclxuXHRcdH07XHJcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmF0dHIoJ2RhdGEtaWQnLDApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLm1zZy5jb25maXJtKCfnoa7lrpropoHliKDpmaTor6XluJblrZA/JyxudWxsLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHRhcnRpY2xlSWQgOiBpZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRjZ2lbJ2RlbGV0ZSddKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0JChcIi5hcnRpY2xlXCIraWQpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHR0aGlzLmNvbW1lbnRQb3N0LnNob3dQb3N0KGlkKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5oqK5paw5Y+R5biD55qE5biW5a2Q5Yqg5Yiw5YiX6KGo5pyA5YmN6Z2iXHJcbmFydGljbGUucHJvdG90eXBlLnByZXBlbmRUb0xpc3QgPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0dmFyIGRhdGEgPSB0aGlzLmNoZWNrRGF0YSh7bGlzdDpbcGFyYW1dLG15OnRoaXMubXl9KTtcclxuXHR2YXIgaHRtbCA9IHRtcGwubGlzdChkYXRhKTtcclxuXHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuYXJ0aWNsZS5wcm90b3R5cGUucmV2aWV3ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGlkID0gdGFyZ2V0LmRhdGEoJ3BpZCcpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdyZXZpZXcnLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMucmRhdGFbcGlkXVxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5hTGlzdC5hcnRpY2xlID0gYXJ0aWNsZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBzTGlzdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5zdWJqZWN0LFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzTGlzdDtcclxuXHJcbnNMaXN0LmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG5zTGlzdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYil7XHJcblx0Y2dpLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHN0YXJ0LFxyXG5cdFx0bGltaXQgOiBsaW1pdFxyXG5cdH0sY2IpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCIvL+aLieS4u+mimOWGheWuuVxyXG52YXIgc0luZm8gPSB7fTtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBzSW5mbztcclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgc3ViRG9tID0gJChcIiNzdWJqZWN0SGVhZFwiKTtcclxudmFyIHN1YkFzaWRlRG9tID0gJChcIiNzdWJqZWN0QXNpZGVcIik7XHJcbnZhciBwb3N0QXJlYSA9ICQoXCIjcG9zdEFydGljbGVcIik7XHJcbnZhciBteUluZm87XHJcblxyXG5zSW5mby5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxufVxyXG5cclxuLy/mi4nlj5bkuIDkuKrkuLvpopjnmoTlhoXlrrlcclxuLy8gc0luZm8uaW5mbyA9IGZ1bmN0aW9uKGlkLGNiKXtcclxuLy8gXHRjZ2kuaW5mbyh7aWQ6aWR9LGZ1bmN0aW9uKHJlcyl7XHJcbi8vIFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcbi8vIFx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcclxuLy8gXHRcdFx0c3ViRG9tLmh0bWwoaHRtbCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fSlcclxuLy8gfVxyXG5cclxudmFyIGluZm8gPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5zaWQgPSBpZDtcclxuXHR0aGlzLmRvbSA9IHN1YkRvbTtcclxuXHR0aGlzLmFzaWRlRG9tID0gc3ViQXNpZGVEb207XHJcblx0dGhpcy5nZXREYXRhKCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5mb2xsb3dCdG47IC8v5YWz5rOo5oyJ6ZKuXHJcblx0dGhpcy5tYW5hZ2VCdG47IC8v566h55CG5oyJ6ZKuXHJcblx0dGhpcy50aW1lQnRuOyAgIC8v5oyJ5pe26Ze05o6S5bqPXHJcblx0dGhpcy51cGRhdGVCdG47IC8v5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuXHRteUluZm8gPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cclxuXHR0aGlzLl9zZWxlY3REb207XHJcblx0dGhpcy5tc2cgPSB3aW5kb3cuc3RyaWtlci5tc2c7XHJcbn1cclxuXHJcbnNJbmZvLmluZm8gPSBpbmZvO1xyXG5cclxuLy/liKDpmaTkuLvpopjnm7jlhbPotYTmupBcclxuaW5mby5wcm90b3R5cGUuZGVsZXRlUmVzb3VyY2UgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpei1hOa6kD8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdHN1YmplY3RJZCA6IF90aGlzLnNpZCxcclxuXHRcdFx0XHRyZXNvdXJjZUlkIDogaWRcclxuXHRcdFx0fVxyXG5cdFx0XHRjZ2kuZGVscmVzb3VyY2UocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLnN1Yi1yZXNvdXJjZS1cIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbi8v5oqK5YW25LuW55qE5a+56LGh55qE5byV55So5Lyg6L+b5p2lLlxyXG5pbmZvLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLnBvc3QgPSBvYmoucG9zdDtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUubWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBvc3QuZWRpdCh0aGlzLmRhdGEpO1xyXG59XHJcblxyXG4vL+mihOiniOS4u+mimOebuOWFs+i1hOa6kFxyXG5pbmZvLnByb3RvdHlwZS5yZXZpZXcgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ3Jldmlldycse1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRsaXN0IDogdGhpcy5kYXRhLnJlc291cmNlTGlzdFxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5pbmZvLnByb3RvdHlwZS5hdXRvcmVmID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdC8vY29uc29sZS5sb2codGFyZ2V0LnByb3AoJ2NoZWNrZWQnKSk7XHJcblx0c3RyaWtlci50cmlnZ2VyKCdhdXRvcmVmcmVzaCcsdGFyZ2V0LnByb3AoJ2NoZWNrZWQnKSlcclxufVxyXG5cclxuLy/op4bpopHpooTop4hcclxuaW5mby5wcm90b3R5cGUuc2hvd1ZpZGVvID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdzaG93VmlkZW8nLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMuZGF0YS5yZXNvdXJjZUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5saW5rID0gZnVuY3Rpb24oZSl7XHJcblx0JChcIiNsaW5rSWZyYW1lXCIpLmF0dHIoJ3NyYycsdGhpcy5kYXRhLmxpbmspO1xyXG5cdCQoXCIjc2hvd0xpbmtcIikuc2hvdygpO1xyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5jbG9zZWxpbmsgPSBmdW5jdGlvbihlKXtcclxuXHQkKFwiI2xpbmtJZnJhbWVcIikuYXR0cignc3JjJywnYmxhbmsnKTtcclxuXHQkKFwiI3Nob3dMaW5rXCIpLmhpZGUoKTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuaW5mby5wcm90b3R5cGUubWFyayA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcignbWFyaycse1xyXG5cdFx0XHRpZCA6IGlkXHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbmluZm8ucHJvdG90eXBlLmFydGljbGVvcmRlcmJ5dXBkYXRlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGRvbSA9IHRhcmdldC5wYXJlbnQoJy5idG4tZ3JvdXAnKTtcclxuXHRwZG9tLmZpbmQoJ2EnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0dGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHRzdHJpa2VyLnRyaWdnZXIoJ2FydGljbGU6b3JkZXJieXVwZGF0ZScpO1xyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5hcnRpY2xlb3JkZXJieXRpbWUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwZG9tID0gdGFyZ2V0LnBhcmVudCgnLmJ0bi1ncm91cCcpO1x0XHJcblx0cGRvbS5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlOm9yZGVyYnljcmVhdGUnKTtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUuYXV0b3JlZnJlc2ggPSBmdW5jdGlvbigpe1xyXG5cdHN0cmlrZXIudHJpZ2dlcignYXV0b3JlZnJlc2gnLHRydWUpO1xyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHQkKFwiI3Nob3dMaW5rXCIpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3N1YmplY3RVcGRhdGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5kYXRhID0gZDtcclxuXHRcdGQubXlJbmZvID0gbXlJbmZvO1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQoZCk7XHJcblx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHJcblx0XHRpZihkLmRhdGEpe1xyXG5cdFx0XHRkLmRhdGEubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUoZCk7XHJcblx0XHRcdFxyXG5cdFx0XHRfdGhpcy5hc2lkZURvbS5odG1sKGh0bWwpO1x0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHRcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuYXNpZGVEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHRcdFxyXG59XHJcblxyXG4vL+aLieWNleS4quW4luWtkFxyXG5pbmZvLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnNpZDtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5pbmZvKHtpZDppZH0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0cmVzLmRhdGEubXlJbmZvID0gbXlJbmZvO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChyZXMuZGF0YSk7XHJcblxyXG5cdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHJcblx0XHRcdHJlcy5kYXRhLm15ID0gZGF0YS51c2VyLm15SW5mbztcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmFzaWRlKHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZGF0YSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRfdGhpcy5hc2lkZURvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0X3RoaXMuZm9sbG93QnRuID0gX3RoaXMuZG9tLmZpbmQoJy5mb2xsb3ctYnRuJyk7XHJcblx0XHRcdF90aGlzLm1hbmFnZUJ0biA9IF90aGlzLmRvbS5maW5kKCcubWFuYWdlLWJ0bicpXHJcblx0XHRcdF90aGlzLnRpbWVCdG4gPSBfdGhpcy5kb20uZmluZCgnLnRpbWUtYnRuJylcclxuXHRcdFx0X3RoaXMudXBkYXRlQnRuID0gX3RoaXMuZG9tLmZpbmQoJy51cGRhdGUtYnRuJylcclxuXHRcdH1cclxuXHR9KVx0XHJcbn1cclxuXHJcbi8v5YWz5rOo5Y2V5Liq5biW5a2QXHJcbmluZm8ucHJvdG90eXBlLmZvbGxvdyA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy5zaWRcclxuXHRcdGZvbGxvdyA9IDE7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0Ly/liKTmlq3mmK/lkKblt7Lnu49mb2xsb3fkuoYuXHJcblx0aWYodGhpcy5mb2xsb3dCdG4uaGFzQ2xhc3MoJ2ZvbGxvd2VkJykpe1xyXG5cdFx0Zm9sbG93ID0gMDtcclxuXHR9XHJcblxyXG5cdGNnaS5mb2xsb3coe3N1YmplY3RJZDppZCxpc0ZvbGxvdzpmb2xsb3d9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKGZvbGxvdyl7XHJcblx0XHRcdFx0X3RoaXMuZm9sbG93QnRuLmFkZENsYXNzKCdmb2xsb3dlZCcpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPuW3suWFs+azqCcpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5mb2xsb3dCdG4ucmVtb3ZlQ2xhc3MoJ2ZvbGxvd2VkJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+5YWz5rOoJyk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvc3ViamVjdC9pbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiLy/kuLvpopjliJvlu7os5Yig6Zmk562J5pON5L2cXHJcbnZhciBkYXRhO1xyXG52YXIgc0NyZWF0ZSA9IHt9O1xyXG5cclxudmFyIGNnaSxcclxuXHR0bXBsO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNDcmVhdGU7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5zQ3JlYXRlLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG5zQ3JlYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR0aGlzLnN1YklkID0gaWQ7XHJcblxyXG5cdC8v6buY6K6k5L2/55So5oiR55qE5Li76aKYXHJcblx0dGhpcy50eXBlID0gJ215U3ViamVjdCc7XHJcblx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcclxuXHR0aGlzLmVkaXREYXRhID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cclxuXHQvL+i/memHjOiAg+iZkeS4i+imgeS4jeimgeS8oOWPguaMh+WummRvbTtcclxuXHR0aGlzLmRvbSA9ICQoXCIjY3JlYXRlU3ViamVjdFwiKTtcclxuXHR0aGlzLnRpdGxlRG9tID0gdGhpcy5kb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XHJcblx0XHJcblx0Ly/lm7rlrprnmoRpZFxyXG5cdHRoaXMucmVzRG9tID0gJChcIiNub3dSZXNcIik7XHJcblxyXG5cdC8v5oqK55So5oi35YiX6KGo5ZOq5YS/5Yib5bu65LiA5LiLLlxyXG5cdC8vY29uc29sZS5sb2coc3RyaWtlci51c2VyKTtcdFxyXG5cdHZhciBtYW5hZ2UgPSBuZXcgd2luZG93LnN0cmlrZXIudXNlci5tYW5hZ2UoJ21hbmFnZUFyZWEnKTtcclxuXHR2YXIgbWVtYmVyID0gbmV3IHdpbmRvdy5zdHJpa2VyLnVzZXIubWFuYWdlKCdtZW1iZXJBcmVhJyk7XHJcblx0dGhpcy5tYW5hZ2UgPSBtYW5hZ2U7XHJcblx0dGhpcy5tZW1iZXIgPSBtZW1iZXI7XHJcblx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cclxuXHR0aGlzLmRvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcclxuXHRcdF90aGlzLnRpdGxlRG9tLnRleHQoJ+aWsOW7uuS4u+mimCcpO1xyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHQkKFwiI3N1YmplY3RUaXRsZVwiKS5mb2N1cygpO1x0XHJcblx0XHR9LDEwMDApXHJcblx0XHRcclxuXHRcdG1hbmFnZS5pbml0KCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vc3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdFx0X3RoaXMucmVzRG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHRcdF90aGlzLm1hbmFnZS5jbGVhcigpO1xyXG5cdFx0X3RoaXMubGFiZWwuY2xlYXIoKTtcclxuXHRcdHRoaXMuaXNlZGl0ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0Ly/otYTmupDliJfooahcclxuXHR0aGlzLnJlc0xpc3QgPSBbXSxcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHQvL+W9k+WJjeiiq+mAieS4reeahOWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5jaGFuZ2VUeXBlID0gZnVuY3Rpb24odHlwZSl7XHJcblx0dGhpcy50eXBlID0gJ3R5cGUnXHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIG15SW5mbyA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIubXlJbmZvO1xyXG5cdC8vdGhpcy50eXBlID0gJ3R5cGUnO1xyXG5cdHRoaXMudGl0bGVEb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0JChcIiNzdWJqZWN0VGl0bGVcIikudmFsKGRhdGEudGl0bGUpLFxyXG5cdCQoXCIjc3ViamVjdE1hcmtcIikudmFsKGRhdGEubWFyayksXHJcblx0JChcIiNzdWJqZWN0T3BlblwiKS5wcm9wKCdjaGVja2VkJyxkYXRhLnByaXZhdGUpO1xyXG5cdCQoXCIjc3ViamVjdExpbmtcIikudmFsKGRhdGEubGluayk7XHJcblx0JChcIiNzdWJqZWN0R3Vlc3RcIikucHJvcCgnY2hlY2tlZCcsZGF0YS5ndWVzdCk7XHJcblx0dGhpcy5lZGl0RGF0YSA9IGRhdGE7XHJcblxyXG5cdGZvcih2YXIgaSBpbiBkYXRhLm1lbWJlcnMpe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLm1lbWJlcnNbaV07XHJcblx0XHRpZihpdGVtLnJvbGUgPT09IDEpe1xyXG5cdFx0XHR0aGlzLm1hbmFnZS5hZGRvbmUoe1xyXG5cdFx0XHRcdGlkIDogaXRlbS5pZCxcclxuXHRcdFx0XHRuYW1lIDogaXRlbS5uYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fWVsc2UgaWYgKGl0ZW0ucm9sZSA9PT0gMiAmJiBpdGVtLmlkICE9PSBteUluZm8uaWQpe1xyXG5cdFx0XHR0aGlzLm1lbWJlci5hZGRvbmUoe1xyXG5cdFx0XHRcdGlkIDogaXRlbS5pZCxcclxuXHRcdFx0XHRuYW1lIDogaXRlbS5uYW1lXHJcblx0XHRcdH0pO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly/miornrqHnkIblkZjmmL7npLrlh7rmnaUs6LKM5Ly85pWw5o2u5LiN5pSv5oyBP1xyXG5cdHRoaXMuaXNlZGl0ID0gdHJ1ZTtcclxuXHJcblx0Ly/miormoIfnrb7mmL7npLrlh7rmnaVcclxuXHR0aGlzLmxhYmVsLnNob3dFZGl0KGRhdGEubGFiZWxzKTtcclxuXHJcblx0Ly/miorotYTmupDliqDov5vmnaVcclxuXHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0bGlzdCA6IGRhdGEucmVzb3VyY2VMaXN0XHJcblx0fSk7XHJcblx0dGhpcy5yZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG59XHJcblxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKHRoaXMucmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHR0aGlzLnJlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+WPlumAieS4reeahOagh+etvlxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5sYWJlbC5nZXRMYWJlbExpc3QoKTtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTnrqHnkIbov5xcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLm1hbmFnZS5nZXRNYW5hZ2VMaXN0KCk7XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5Lit55qE566h55CG6L+cXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5nZXRNZW1iZXJMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5tZW1iZXIuZ2V0TWFuYWdlTGlzdCgpO1xyXG59XHJcblxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHQkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoJycpO1xyXG5cdCQoXCIjc3ViamVjdE1hcmtcIikudmFsKCcnKVxyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24ocGFyYW0sY2Ipe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcclxuXHRcdGlmKF90aGlzLnN1YklkICYmICFfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3VwbG9hZEFydGljbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdF90aGlzLnJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly/op6blj5HkuIrkvKBcclxuXHQkKFwiI2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuXHQkKFwiI3NjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcclxuXHRcdFx0X3RoaXMuZmlsZXVwbG9hZCA9IHRydWU7XHJcblx0XHRcdCQoXCIjc2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGUgPSB0YXJnZXQuZGF0YSgndHlwZScpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlID09PSAnc3VibWl0Jyl7XHJcblx0XHRcdHZhciB0aXQgPSAkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoKSxcclxuXHRcdFx0XHRtYXJrID0gJChcIiNzdWJqZWN0TWFya1wiKS52YWwoKSxcclxuXHRcdFx0XHRsaW5rID0gJChcIiNzdWJqZWN0TGlua1wiKS52YWwoKSxcclxuXHRcdFx0XHRvcGVuID0gJChcIiNzdWJqZWN0T3BlblwiKS5wcm9wKCdjaGVja2VkJyk/MDoxLFxyXG5cdFx0XHRcdGd1ZXN0ID0gJChcIiNzdWJqZWN0R3Vlc3RcIikucHJvcCgnY2hlY2tlZCcpPzA6MTtcclxuXHJcblx0XHRcdGlmKHRpdCA9PSAnJyl7XHJcblx0XHRcdFx0YWxlcnQoJ+i/mOayoeacieWhq+WGmeagh+mimCcpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdHRpdGxlIDogdGl0LFxyXG5cdFx0XHRcdG1hcmsgOiBtYXJrLFxyXG5cdFx0XHRcdGxpbmsgOiBsaW5rLFxyXG5cdFx0XHRcdHByaXZhdGUgOiBvcGVuLFxyXG5cdFx0XHRcdGd1ZXN0IDogZ3Vlc3QsXHJcblx0XHRcdFx0bWFuYWdlcyA6IF90aGlzLmdldE1hbmFnZUxpc3QoKSxcclxuXHRcdFx0XHRtZW1iZXJzIDogX3RoaXMuZ2V0TWVtYmVyTGlzdCgpLFxyXG5cdFx0XHRcdHN1YmplY3RMYWJlbHMgOiBfdGhpcy5nZXRMYWJlbExpc3QoKSxcclxuXHRcdFx0XHRhcnRpY2xlTGFiZWxzIDogW10sXHJcblx0XHRcdFx0cmVzb3VyY2VzIDogX3RoaXMuZ2V0UmVzTGlzdCgpXHJcblx0XHRcdH1cdFx0XHJcblxyXG5cdFx0XHRcclxuXHRcdFx0aWYoX3RoaXMuaXNlZGl0KXtcclxuXHRcdFx0XHRwYXJhbS5zdWJqZWN0SWQgPSBfdGhpcy5lZGl0RGF0YS5pZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHBhcmFtLnRpdGxlICE9PSAnJyAmJiBwYXJhbS5tYXJrICE9PSAnJyl7XHJcblx0XHRcdFx0X3RoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRcdFx0aWYoX3RoaXMuaXNlZGl0KXtcclxuXHRcdFx0XHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RVcGRhdGUnLHJlcy5kYXRhKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Ly8gY29uc29sZS5sb2cocGFyYW0pO1xyXG5cdFx0XHRcdFx0Ly8gcmV0dXJuO1xyXG5cdFx0XHRcdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuZG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3QgOiBbcmVzLmRhdGFdXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RDcmVhdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0JChcIiNteVN1YmplY3RcIikucHJlcGVuZChodG1sKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiZnVuY3Rpb24gZW1wdHlGdW4ocmVzKXtcclxuXHRjb25zb2xlLmxvZyhyZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1VybCh1cmwpe1xyXG5cdGlmKHVybC5pbmRleE9mKCc/Jyk+PTApe1xyXG5cdFx0cmV0dXJuIHVybCArPScmX3Q9JytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiB1cmwgKz0nP190PScrbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdQT1NUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogY2hlY2tVcmwodXJsKSxcclxuXHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheChvcHQsY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXHJcblx0XHR1cmwgPSBvcHQudXJsLFxyXG5cdFx0ZGF0YSA9IG9wdC5kYXRhO1xyXG5cclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlIDogdHlwZSxcclxuXHRcdHVybCA6IGNoZWNrVXJsKHVybCksXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPjwlLW5hbWUlPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSBpbiBsaXN0KXtcXHJcXG5cdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG5cdHZhciBvYmogPSBKU09OLnBhcnNlKGl0ZW0ud2l0aERhdGEpO1xcclxcbiU+XFxyXFxuPGxpIHRpdGxlPVwiPCUtaXRlbS5tZXNzYWdlJT5cIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtb2JqLmFydGljbGVJZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtcmVhZD1cIjwlLWl0ZW0ucmVhZCU+XCI+PCUtaXRlbS5tZXNzYWdlJT48L2E+PC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBKU09OLnBhcnNlKGl0ZW0ud2l0aERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5tZXNzYWdlKSwgJ1wiPjxhIGRhdGEtaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA2LCBvYmouYXJ0aWNsZUlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLmlkKSwgJ1wiIGRhdGEtcmVhZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ucmVhZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm1lc3NhZ2UpLCBcIjwvYT48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21zZ2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiBcIlwiLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuY29uc29sZS5sb2cobXkpO1xcclxcbmZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liA8JS1pdGVtLmNyZWF0b3JOYW1lJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IFxcclxcbiAgICAgICAgPCVpZihteS5pZCA9PT0gaXRlbS5jcmVhdG9yIHx8IG15LmF1dGggPT09IDEpeyU+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgICAgICAgaWYoaW1nbnVtPjIpe1xcclxcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xcclxcbiAgICAgICAgICAgICAgICB9XFxyXFxuICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgZGF0YS1waWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtb2JqLmlkJT5cIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpbWdudW0rKztcXHJcXG4gICAgICAgICAgICAgICAgaWYoZmlyc3Qpe1xcclxcbiAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XFxyXFxuICAgICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxPCUtaXRlbS5pbWdudW0lPuW8oDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cobXkpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5pZCksICdcIj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSA3LCBzdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5jcmVhdG9yTmFtZSksIFwiICAg5pyA5ZCO5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLnVwZGF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMSwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMSwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDExO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiBcXG4gICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEyO1xuICAgICAgICAgICAgICAgICAgICBpZiAobXkuaWQgPT09IGl0ZW0uY3JlYXRvciB8fCBteS5hdXRoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxuICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDE3LCBpdGVtLmlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAxNywgaXRlbS5zdWJqZWN0X2lkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDE3LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE5LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1nbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZ251bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IGl0ZW0ucmVzb3VyY2UubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdudW0gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDM1LCBvYmouaWQpLCAnXCIgZGF0YS1waWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzUsIG9iai5pZCksICdcIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nbnVtKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbFcIiwgKF9fc3RhY2subGluZW5vID0gNDEsIGl0ZW0uaW1nbnVtKSwgXCLlvKA8L3NwYW4+XFxuICAgICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0NDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPSAwO2k8bGlzdC5sZW5ndGg7aSsrKXtcXHJcXG52YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpPjxzcGFuIGNsYXNzPVwiZnVpLWhlYXJ0XCI+PC9zcGFuPue9rumhtu+8mjxhIGhyZWY9XCIvYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS50aXRsZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvdG9wLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0XHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcclxcblx0PC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG5cdFx0JywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jlc291cmNlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+PCUtcHJvVGV4dCU+PC9zcGFuPlxcclxcbiAgICAgICAgPCVpZihwcm9UZXh0PT09XFwn5oiR5Yib5bu655qEXFwnKXslPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XFxyXFxuICAgICAgICDlhbE8c3BhbiBpZD1cIjwlLXByb05hbWUlPk51bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICBcXHJcXG4gICAgPC9oZWFkZXI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIjwlLXByb05hbWUlPlwiPlxcclxcbiAgICAgICAgICAgICAgICAgXFxyXFxuICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyLXRvcFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGVmdFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmdWktdXNlclwiPicsIChfX3N0YWNrLmxpbmVubyA9IDMsIHByb1RleHQpLCBcIjwvc3Bhbj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb1RleHQgPT09IFwi5oiR5Yib5bu655qEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcbiAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cXG4gICAgICAgIOWFsTxzcGFuIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIHByb05hbWUpLCAnTnVtXCI+MjA8L3NwYW4+5Liq5Li76aKYIDxhIGNsYXNzPVwicHJlLXBhZ2VcIiBkYXRhLWFjdGlvbj1cInByZVwiPuS4iuS4gOmhtTwvYT4gPGEgY2xhc3M9XCJuZXh0LXBhZ2VcIiBkYXRhLWFjdGlvbj1cIm5leHRcIj7kuIvkuIDpobU8L2E+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHRpbWUgYWN0aXZlXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlXCIgIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1kb3duXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgIFxcbiAgICA8L2hlYWRlcj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlzdFwiIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTksIHByb05hbWUpLCAnXCI+XFxuICAgICAgICAgICAgICAgICBcXG4gICAgPC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9zaXplLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgPCVcXHJcXG4gICAgXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgIFx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAgICU+XFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD7liJvlu7rkurogPCUtaXRlbS5jcmVhdG9yTmFtZSU+IOWIm+W7uuaXtumXtCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLmNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0udXBkYXRlVGltZSklPiDkuLvpopjotYTmupAgPCUtaXRlbS5yZXNvdXJjZUNvdW50JT4gPCUtaXRlbS5tZW1iZXJDb3VudCU+5Liq5oiQ5ZGYIDwlLWl0ZW0uYXJ0aWNsZUNvdW50JT7kuKrluJblrZAgPCUtaXRlbS5yZXNvdXJjZUNvdW50JT7kuKrotYTmupA8L2RkPlxcclxcbiAgICAgIDwvZGw+IFxcclxcbiAgICA8JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDxkbCBjbGFzcz1cImFydC1saXN0XCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD7liJvlu7rkurogXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiDliJvlu7rml7bpl7QgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0uY3JlYXRlVGltZSkpLCBcIiDmnIDov5Hmm7TmlrAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCBcIiDkuLvpopjotYTmupAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVzb3VyY2VDb3VudCksIFwiIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLm1lbWJlckNvdW50KSwgXCLkuKrmiJDlkZggXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uYXJ0aWNsZUNvdW50KSwgXCLkuKrluJblrZAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQPC9kZD5cXG4gICAgICA8L2RsPiBcXG4gICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3QvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZHQ+PCUtdGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6IDwlLWNyZWF0b3JOYW1lJT4g5Yib5bu65pe26Ze0IDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKHVwZGF0ZVRpbWUpJT48L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPlxcclxcbiAgICAgICAgICDkuLvpopjotYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPiA8JS1tZW1iZXJDb3VudCU+5Liq5oiQ5ZGYIDwlLWFydGljbGVDb3VudCU+5Liq5biW5a2QIDwlLWFydGljbGVSZXNvdXJjZUNvdW50JT7kuKrotYTmupAg5oiR55qE5Y+R5biWL+WbnuWkjSA8JS1hcnRpY2xlQ3JlYXRlQ291bnQlPi8xMlxcclxcbiAgICAgICAgICA8ZGl2PuinhumikSA8c3BhbiBkYXRhLWFjdGlvbj1cImxpbmtcIiA+PCUtbGluayU+PC9zcGFuPjwvZGl2PlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVBcnRpY2xlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkeW4ljwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuIDwlaWYoZm9sbG93KXslPmZvbGxvd2VkPCV9JT5cIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPjwlaWYoZm9sbG93KXslPuW3suWFs+azqDwlfWVsc2V7JT7lhbPms6g8JX0lPjwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDwlaWYobXlJbmZvLmF1dGggPT09IDEgfHwgbXlJbmZvLmlkID09PSBpZCl7JT5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcclxcbiAgICAgICAgICAgIDwhLS1cXHJcXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXHJcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIC0tPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZW9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXHJcXG4gICAgICAgICAg6Ieq5Yqo5Yi35pawOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1hY3Rpb249XCJhdXRvcmVmXCIgY2hlY2tlZD1cImNoZWNrZWRcIiAvPlxcclxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxyXFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgPC9kZD4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICA8ZHQ+XCIsIChfX3N0YWNrLmxpbmVubyA9IDEsIHRpdGxlKSwgJzwvZHQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDIsIGNyZWF0b3JOYW1lKSwgXCIg5Yib5bu65pe26Ze0IFwiLCAoX19zdGFjay5saW5lbm8gPSAyLCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShjcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gMiwgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSkpLCAnPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj5cXG4gICAgICAgICAg5Li76aKY6LWE5rqQICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIHN1YmplY3RSZXNvdXJjZUNvdW50KSwgXCIgXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgXCLkuKrmiJDlkZggXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIGFydGljbGVDb3VudCksIFwi5Liq5biW5a2QIFwiLCAoX19zdGFjay5saW5lbm8gPSA0LCBhcnRpY2xlUmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQIOaIkeeahOWPkeW4li/lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIGFydGljbGVDcmVhdGVDb3VudCksICcvMTJcXG4gICAgICAgICAgPGRpdj7op4bpopEgPHNwYW4gZGF0YS1hY3Rpb249XCJsaW5rXCIgPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGxpbmspLCAnPC9zcGFuPjwvZGl2PlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVBcnRpY2xlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkeW4ljwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiZm9sbG93ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1wiIGRhdGEtYWN0aW9uPVwiZm9sbG93XCI+PHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGlmIChmb2xsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuWFs+azqFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIjwvYT48L3NwYW4+XFxuICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgIGlmIChteUluZm8uYXV0aCA9PT0gMSB8fCBteUluZm8uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcbiAgICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgIC0tPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZW9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXG4gICAgICAgICAg6Ieq5Yqo5Yi35pawOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1hY3Rpb249XCJhdXRvcmVmXCIgY2hlY2tlZD1cImNoZWNrZWRcIiAvPlxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgPC9kZD4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPuWPguS4juS6uiA8JS1tZW1iZXJDb3VudCU+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+57uf6K6hPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbmF2PlxcclxcblxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1hc2lkZS1pbWdcIj5cXHJcXG4gICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMFwiIHNyYz1cImh0dHA6Ly9pbWdzcmMuYmFpZHUuY29tL2ZvcnVtL3clM0Q1ODAvc2lnbj0zYjk1Y2VjNzBjMzM4NzQ0OWNjNTJmNzQ2MTBlZDkzNy9mMDc0ZDBmYzFlMTc4YTgyNzRiMGVmMzdmNjAzNzM4ZGE4NzdlODY4LmpwZ1wiIC8+XFxyXFxuICAgICAgICAgICAg6aKE6KeIICDmoIfms6gg5LiL6L29ICDliKDpmaRcXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgZm9yKHZhciBpIGluIHJlc291cmNlTGlzdCl7XFxyXFxuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcXHJcXG4gICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgICAgICAgICAgPCVpZihpdGVtLnR5cGUgPT09IDEpeyU+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMFwiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiB0aXRsZT1cIjwlLWl0ZW0ubmFtZSU+XCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcclxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT4gIFxcclxcbiAgICAgICAgICAgICAgPCVpZihteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKXsgJT5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+5Yig6ZmkPC9hPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8JX1lbHNlIGlmKGl0ZW0udHlwZSA9PT0gNCB8fCBpdGVtLnR5cGUgPT09Myl7JT5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlb1wiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwic2hvd1ZpZGVvXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwibWFya1wiIHN0eWxlPVwiXCI+5qCH5rOoPC9hPiAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInNob3dWaWRlb1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPCV9ZWxzZXslPlxcclxcbiAgICAgICAgICAgICAgPHA+PCUtaXRlbS5uYW1lJT48L3A+XFxyXFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pdGVtLmlkJT5cIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxyXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcclxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxyXFxuICAgICAgICAgICAgICA8JX0lPiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgJzwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPue7n+iuoTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L25hdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtYXNpZGUtaW1nXCI+XFxuICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCI+XFxuICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyMDBcIiBzcmM9XCJodHRwOi8vaW1nc3JjLmJhaWR1LmNvbS9mb3J1bS93JTNENTgwL3NpZ249M2I5NWNlYzcwYzMzODc0NDljYzUyZjc0NjEwZWQ5MzcvZjA3NGQwZmMxZTE3OGE4Mjc0YjBlZjM3ZjYwMzczOGRhODc3ZTg2OC5qcGdcIiAvPlxcbiAgICAgICAgICAgIOmihOiniCAg5qCH5rOoIOS4i+i9vSAg5Yig6ZmkXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAtLT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1saXN0XCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlc291cmNlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtJywgKF9fc3RhY2subGluZW5vID0gMjEsIGl0ZW0uaWQpLCAnXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0ubmFtZSksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDQgfHwgaXRlbS50eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDI5LCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInNob3dWaWRlb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cIm1hcmtcIiBzdHlsZT1cIlwiPuagh+azqDwvYT4gIDxhIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMCwgaXRlbS5pZCksICdcIiAgZGF0YS1hY3Rpb249XCJzaG93VmlkZW9cIj7pooTop4g8L2E+ICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMCwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8cD5cIiwgKF9fc3RhY2subGluZW5vID0gMzUsIGl0ZW0ubmFtZSksICc8L3A+XFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzNiwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzgsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICAgICAgICBcXG4gICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2FzaWRlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZGV4LmpzIn0=