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
		article = __webpack_require__(3),
		comment = __webpack_require__(4),
		msg = __webpack_require__(5),
		label = __webpack_require__(6);
	var Striker = $(window.striker),
		striker = window.striker;	
	
	var nowArtId = striker.util.getParameter('id');
	
	
	function userLoadSub(e,d){
		 new subject.info(nowSubId);
		 comment.init(nowArtId);
	}
	
	var handlers = {
		'userLoadSub' : userLoadSub
	}
	
	for(var i in handlers){
		Striker.bind(i,handlers[i]);
	}
	
	function init(){
	
		striker.article = article;
		striker.user = user;
		
		window.striker.msg = new msg.message();
		
		user.init();
	
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

	var cgi = __webpack_require__(8).user,
		data = __webpack_require__(10).user,
		userManage = __webpack_require__(11),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(18),
		manage : __webpack_require__(19),
		onemanage : __webpack_require__(20)
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

	var cgi = __webpack_require__(8).article;
	var tmpl = {
		list : __webpack_require__(21)
	};
	
	var articleList = __webpack_require__(12),
		articlePost = __webpack_require__(13);
	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	c

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
		// if(d == 1001){
		// 	window.location = config.cgi.gotologin;
		// 	return;
		// }
	
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

	var cgi = __webpack_require__(8).label,
		data = __webpack_require__(10).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(22),
		one : __webpack_require__(23)
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
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(14),
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
			search : cgiPath+'subject/search',
			info : cgiPath+'subject/info',
			create : cgiPath+'subject/create',
			follow : cgiPath+'subject/follow', //关注
			following : cgiPath+'subject/following', //关注列表
			delresource : cgiPath + 'subject/delresource' //删除一个资源
		},
		article : {
			search : cgiPath+'article/search',
			info : cgiPath+'article/info',
			create : cgiPath+'article/create'
		},
		comment : {
			search : cgiPath+'comment/search',
			create : cgiPath+'comment/create'
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
	
	db.logout = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.logout,callback);
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
	
	db.subject.info = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.info,param,callback);
	}
	
	db.subject.create = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject.create,param,callback);
	}
	
	db.subject.follow = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.subject.follow,param,callback);	
	}
	
	db.subject.following = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.subject.following,param,callback);	
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
	
	db.article.info = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.info,param,callback);
	}
	
	db.article.create = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.create,param,callback);
	}
	
	db.comment = {};
	
	db.comment.search = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.search,param,callback);
	}
	
	db.comment.create = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.create,param,callback);
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
	
	module.exports = db;

/***/ },
/* 9 */,
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(10).user;
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(10),
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(10),
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
/* 14 */
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
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <article class="artice-one">\r\n    <aside class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></aside>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creator%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="fui-check-circle">赞</span> <span class="fui-chat">回复</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </article>\r\n<%}%>',
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
	                    buf.push('\n  <article class="artice-one">\n    <aside class="artice-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</aside>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creator), "   最后回复 ", (__stack.lineno = 7, item.updator), '</div>\n      <div class="info-action">\n        <span class="fui-check-circle">赞</span> <span class="fui-chat">回复</span>\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=', (__stack.lineno = 12, item.id), '">', (__stack.lineno = 12, item.title), "</a></dt>\n        <dd>\n          ", (__stack.lineno = 14, item.content), "\n        </dd>\n        ");
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
/* 22 */
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
/* 23 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjEzMGNkZmQwODk1NjdlZTUzM2M/ZDg1MSoqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzPzViMjcqIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanM/ZWM0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzP2VlNTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1lbnQvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9kYXRhLmpzPzlkZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvbGlzdC5qcz84YWIzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanM/YWVkOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqcz82ZmZiIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzPzUzYTMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanM/NTExNCIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanM/M2ZhMiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQjs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsUTs7Ozs7O0FDckNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4QztBQUNBLDZDQUE0QztBQUM1Qyx5Qzs7QUFFQSwyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUMzQkEsRTs7Ozs7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCO0FBQ0E7O0FBRUE7O0FBRUEscUI7Ozs7OztBQzNHQTtBQUNBO0FBQ0E7O0FBRUEsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTtBQUNGOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBLEdBQUU7QUFDRjtBQUNBLEc7Ozs7OztBQzdLQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0Isa0NBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qiw2SkFBNko7QUFDbFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImpzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGYxMzBjZGZkMDg5NTY3ZWU1MzNjXG4gKiovIiwicmVxdWlyZSgnLi9jb21tb24vZ2xvYmFsJyk7XHJcbnZhciB1c2VyID0gcmVxdWlyZSgnLi91c2VyL3VzZXInKSxcclxuXHRhcnRpY2xlID0gcmVxdWlyZSgnLi9hcnRpY2xlL2FydGljbGUnKSxcclxuXHRjb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50L2NvbW1lbnQnKSxcclxuXHRtc2cgPSByZXF1aXJlKCcuL2NvbW1vbi9tc2cnKSxcclxuXHRsYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwvbGFiZWwnKTtcclxudmFyIFN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKSxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHRcclxuXHJcbnZhciBub3dBcnRJZCA9IHN0cmlrZXIudXRpbC5nZXRQYXJhbWV0ZXIoJ2lkJyk7XHJcblxyXG5cclxuZnVuY3Rpb24gdXNlckxvYWRTdWIoZSxkKXtcclxuXHQgbmV3IHN1YmplY3QuaW5mbyhub3dTdWJJZCk7XHJcblx0IGNvbW1lbnQuaW5pdChub3dBcnRJZCk7XHJcbn1cclxuXHJcbnZhciBoYW5kbGVycyA9IHtcclxuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWRTdWJcclxufVxyXG5cclxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcclxuXHRTdHJpa2VyLmJpbmQoaSxoYW5kbGVyc1tpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHRzdHJpa2VyLnVzZXIgPSB1c2VyO1xyXG5cdFxyXG5cdHdpbmRvdy5zdHJpa2VyLm1zZyA9IG5ldyBtc2cubWVzc2FnZSgpO1xyXG5cdFxyXG5cdHVzZXIuaW5pdCgpO1xyXG5cclxuXHRiaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCIvLyBrZWVwIGl0IGlmIHVzaW5nIHVybCBtZDUgcmV2IHJlcGxhY2VtZW50IGluIGphdmFzY3JpcHRcbmNvbnNvbGUubG9nKCdnbG9iYWwgaXMgbG9hZCcpO1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHN0cil7XG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyKTtcblxuICAgIHZhciB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdmFyIG1tID0gKGRhdGUuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpOyAvLyBnZXRNb250aCgpIGlzIHplcm8tYmFzZWQgICAgICAgICBcbiAgICB2YXIgZGQgID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICByZXR1cm4geXl5eSArICctJyArIChtbVsxXT9tbTpcIjBcIittbVswXSkgKyAnLScgKyAoZGRbMV0/ZGQ6XCIwXCIrZGRbMF0pO1x0XG59XG5cbmZ1bmN0aW9uIGdldE5vd1RpbWUoc3RyKXtcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIGF0aW1lID0gbmV3IERhdGUoc3RyKS5nZXRUaW1lKCk7XG5cbiAgICB2YXIgYyA9IE1hdGguZmxvb3IoKG5vdyAtIGF0aW1lKS8xMDAwKTtcbiAgICBpZihjPDYwKXtcbiAgICAgICAgcmV0dXJuICcx5YiG6ZKf5Lul5YaFJztcbiAgICB9ZWxzZSBpZihjPDM2MDApe1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGMvKDM2MDAqMjQpKSsn5aSp5YmNJztcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUoc3RyKTtcbiAgICB9XG5cbn1cblxudmFyIGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUsc3RyKXtcbiAgICBzdHIgPSBzdHIgfHwgbG9jYXRpb24uaHJlZjtcbiAgICB2YXIgciA9IG5ldyBSZWdFeHAoXCIoXFxcXD98I3wmKVwiICsgbmFtZSArIFwiPShbXiYjXSopKCZ8I3wkKVwiKSwgbSA9IHN0ci5tYXRjaChyKTtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCFtID8gXCJcIiA6IG1bMl0pO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEByZXR1cm4ge1N0cmluZ30gW2xlbj0yXSDlrZfmr43mlbAo5aSa5bCR5Liq5a2X5q+N566X5LiA5Liq5a2XKVxuICogQGV4YW1wbGVcbiAqICAgICAgZ2V0TGVuKCdhYmPkuIDkuozkuIknKTtcbiAqL1xudmFyIGdldExlbiA9IGZ1bmN0aW9uKHN0cixsZW4pe1xuICAgIC8v5q2j5YiZ5Y+W5Yiw5Lit5paH55qE5Liq5pWw77yM54S25ZCObGVuKmNvdW50K+WOn+adpeeahOmVv+W6puOAguS4jeeUqHJlcGxhY2VcbiAgICB2YXIgZmFjdG9yID0gbGVuIHx8IDM7XG4gICAgc3RyICs9ICcnO1xuICAgIHZhciB6aENoYXIgPSBzdHIubWF0Y2goL1teXFx4MDAtXFx4ZmZdL2cpIHx8IFtdO1xuICAgIHZhciBsZXR0ZXIgPSBzdHIucmVwbGFjZSgvW15cXHgwMC1cXHhmZl0vZyAsICcnKTtcbiAgICByZXR1cm4gcGFyc2VJbnQoemhDaGFyLmxlbmd0aCArIChsZXR0ZXIubGVuZ3RoIC8gZmFjdG9yKSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHBhcmFtIHtudW1iZXJ9IG1heCDmgLvplb/luqZcbiAqIEByZXR1cm4ge251bWJlcn0gW2xlbj0yXSDplb/luqZcbiAqIEBleGFtcGxlXG4gKiAgICAgIGNoYW5nZUxlbignYWJj5LiA5LqM5LiJJywxMCk7XG4gKi9cbnZhciBjaGFuZ2VMZW4gPSBmdW5jdGlvbihzdHIsbWF4KXtcblx0dmFyIG1heCA9IG1heCB8fCAxMDtcblx0dmFyIGxlbiA9IGdldExlbihzdHIpO1xuXHR2YXIgcmV0ID0gbWF4IC0gbGVuO1xuXHRyZXR1cm4gcmV0Pj0wP3JldDowO1xufVxuXG53aW5kb3cuc3RyaWtlci51dGlsID0ge1xuXHRmb3JtYXRUaW1lIDogZm9ybWF0VGltZSxcblx0Z2V0UGFyYW1ldGVyIDogZ2V0UGFyYW1ldGVyLFxuICAgIGdldE5vd1RpbWUgOiBnZXROb3dUaW1lLFxuXHRnZXRMZW4gOiBnZXRMZW4sXG5cdGNoYW5nZUxlbiA6IGNoYW5nZUxlblxufVxuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnVzZXIsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXHJcblx0dXNlck1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyksXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bmF2IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvdXNlcl9uYXYuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKVxyXG59XHJcblxyXG52YXIgVXNlciA9IHt9LFxyXG5cdF90aGlzID0gVXNlcjtcclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG5cclxuLy/lr7nlpJbmj5DkvpvnmoTmjqXlj6Ncclxud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XHJcblxyXG4vL+euoeeQhuWRmOiuvue9ruaYvuekuuetieetiVxyXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xyXG4vLyBVc2VyLmFkZG1hbmFnZSA9IHVzZXJNYW5hZ2Uuc2hvdztcclxuXHJcbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XHJcblxyXG5Vc2VyLmdldE15SW5mbyA9IGZ1bmN0aW9uKGNiKXtcclxuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLm15SW5mbyA9IHJlcy5kYXRhO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcclxuXHRcdFx0JChcIiN1c2VyTmF2XCIpLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZEFydCcscmVzLmNvZGUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcmxvYWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKVxyXG59O1xyXG5cclxudmFyIGFydGljbGVMaXN0ID0gcmVxdWlyZSgnLi9saXN0JyksXHJcblx0YXJ0aWNsZVBvc3QgPSByZXF1aXJlKCcuL3Bvc3QnKTtcclxuXHJcbnZhciBBcnRpY2xlID0ge31cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ0aWNsZTtcclxuXHJcbkFydGljbGUuc2VhcmNoID0gYXJ0aWNsZUxpc3Quc2VhcmNoO1xyXG5cclxuQXJ0aWNsZS5sb2FkTW9yZSA9IGFydGljbGVMaXN0LmxvYWRNb3JlO1xyXG5cclxuQXJ0aWNsZS5hcHBlbmRUb0xpc3QgPSBhcnRpY2xlTGlzdC5wcmVwZW5kVG9MaXN0O1xyXG5cclxuLy9BcnRpY2xlLnBvc3QgPSBhcnRpY2xlUG9zdC5jcmVhdGU7XHJcblxyXG4vL0FydGljbGUucmVzZXQgPSBhcnRpY2xlUG9zdC5yZXNldDtcclxuXHJcbi8qKi9cclxuXHJcbkFydGljbGUuaW5pdCA9IGZ1bmN0aW9uKGlkKXtcclxuXHRhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHRhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsImNcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvY29tbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsInZhciBtc2cgPSB7XHJcblx0MCA6ICfmk43kvZzmiJDlip8hJyxcclxuXHQxMDogJ+aOkuW6j+W6j+WPt+W/hemhu+Whq+WGmScsXHJcblx0MTEgOiAn57uE57uH5ZCN56ew5b+F6aG75aGr5YaZJyxcclxuXHQyMCA6ICfmlrDlr4bnoIHlkozph43lpI3lr4bnoIHlv4XpobvkuIDoh7QnLFxyXG5cdDIxIDogJ+ivt+Whq+WGmeeUqOaIt+WQjeWSjOWvhueggSEnLFxyXG5cdDIyIDogJ+eUqOaIt+S4jeWtmOWcqCcsXHJcblx0MzAgOiAn57uE57uH5pyA5aSa5pSv5oyBM+e6pyEnLCBcclxuXHQ0MCA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQ1MCA6ICfkvaDopoHkuIrkvKDnmoTmlofku7blt7Lnu4/otoXov4fkvaDnmoTliankvZnnqbrpl7QhJyxcclxuXHQ2MCA6ICfkvaDov5jmsqHmnInpgInmi6nopoHlhbHkuqvnmoTnm67lvZUnLFxyXG5cdDc1IDogJ+W6j+WPt+WPquiDveWcqDF+OTnkuYvpl7QnLFxyXG5cdDc2IDogJ+WQjeensOS4jeiDveWwkeS6jjLkuKrlrZcnLFxyXG5cdDc3IDogJ+WPguaVsOS4jeiDveS4uuepuicsXHJcblx0NzggOiAn5a+55LiN6LW377yM572R57uc6LaF5pe25LqG77yM6K+356iN5ZCO5YaN6K+VJyxcclxuXHQ3OSA6ICflt7Lnu4/mnInlkIzlkI3nmoTpobnnm67kuoYnLFxyXG5cdDEwMCA6ICflr7nkuI3otbfvvIzmgqjmsqHmnInov5nkuKrmk43kvZzmnYPpmZAhJywvL+WQjuWPsOWHuumUmeWVpiFcclxuXHQxMDEgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDAxIDogJ+aCqOi/mOayoeacieeZu+W9lSEnLFxyXG5cdDEwMDQgOiAn5rKh5pyJ5om+5Yiw6LWE5rqQIScsXHJcblx0MTAxMCA6ICfmgqjmsqHmnInmn6XnnIvor6XotYTmupDnmoTmnYPpmZAhJyxcclxuXHQxMDExIDogJ+WPguaVsOWHuumUmeWVpiEnLFxyXG5cdDEwMTMgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDE0IDogJ+W3sue7j+WFs+azqOivpeS4u+mimCcsXHJcblx0MTAxNSA6ICflt7Lnu4/lvZLmoaPllaYhJyxcclxuXHQxMDE2IDogJ+ivpei1hOa6kOS4jeiDveWIoOmZpCcsXHJcblx0MTAxNyA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQxMDQxIDogJ+eUqOaIt+WQjeaIluWvhueggemUmeivryEnLFxyXG5cdDEwNDMgOiAn55So5oi35LiN5a2Y5ZyoIScsXHJcblx0MTA1MCA6ICfml7bpl7TkuqTlj4nkuoYhJ1xyXG59XHJcblxyXG5NZXNzZW5nZXIoKS5vcHRpb25zID0ge1xyXG4gICAgZXh0cmFDbGFzc2VzOiAnbWVzc2VuZ2VyLWZpeGVkIG1lc3Nlbmdlci1vbi1ib3R0b20nLFxyXG4gICAgdGhlbWU6ICdmbGF0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG1lc3NhZ2UoKXtcclxuXHR0aGlzO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24obXNnLGxhYmVsLGNiKXtcclxuXHRpZih0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09PSBudWxsKXtcclxuXHRcdGxhYmVsID0ge1xyXG5cdFx0XHRzdWIgOiAn56Gu5a6aJyxcclxuXHRcdFx0Y2FuY2VsIDogJ+WPlua2iCdcclxuXHRcdH1cclxuXHR9XHJcblx0aWYodHlwZW9mIGNiID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRjYiA9IGZ1bmN0aW9uKCl7fTtcclxuXHR9XHJcblx0aWYodHlwZW9mIG1zZyA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdG1lc3NhZ2UgOiBtc2csXHJcblx0XHRhY3Rpb25zIDoge1xyXG5cdFx0XHRzdWIgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5zdWIgfHwgJ+ehruWumicsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FuY2VsIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuY2FuY2VsIHx8ICflj5bmtognLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgbXNnID0gTWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGQpe1xyXG5cdC8vIGlmKGQgPT0gMTAwMSl7XHJcblx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBjb25maWcuY2dpLmdvdG9sb2dpbjtcclxuXHQvLyBcdHJldHVybjtcclxuXHQvLyB9XHJcblxyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2dbZF0gfHwgJ+WHuumUmeaLiSEnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KGQpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5tc2cgPSBmdW5jdGlvbihtc2cpe1xyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2cgfHwgJydcclxuXHR9XHJcblx0aWYocGFyc2VJbnQobXNnKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcdFx0XHJcbn1cclxuXHJcbmRiLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9tc2cuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxhYmVsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5sYWJlbCxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgTGFiZWwgPSB7fSxcclxuXHRfdGhpcyA9IExhYmVsO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL2xpc3QuZWpzJyksXHJcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL29uZS5lanMnKVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcclxuXHJcbmZ1bmN0aW9uIGdldExpc3QoKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmxhYmVsID0gZnVuY3Rpb24obmFtZSl7XHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK25hbWUpO1xyXG5cclxuXHR0aGlzLm5vd0RvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYWRkRG9tID0gdGhpcy5kb20uZmluZCgnLmFkZC1sYWJlbC1hcmVhJyk7XHJcblx0Ly8gaWYodHlwZSA9PT0gJ3N1Yicpe1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkU3ViTGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd1N1YkxhYmVsJyk7XHJcblx0Ly8gfWVsc2V7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRBcnRMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93QXJ0TGFiZWwnKTtcclxuXHQvLyB9XHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmJ0bkRvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5idG4nKTtcclxuXHR0aGlzLmlucHV0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG5cdHRoaXMuX3NlbGVjdERvbTsvL+W9k+WJjemAieS4reeahOWFg+e0oFxyXG5cclxuXHQvL+m7mOiupOayoeacieagh+etvlxyXG5cdHRoaXMubm93RG9tLmhpZGUoKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblxyXG5cdC8v5bey57uP6YCJ5Lit55qEaWRtYXBcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblxyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5nZXREYXRhKCk7XHRcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdC8vXHJcblx0Ly8gdGhpcy5ub3dEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0Ly8gXHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHQvLyBcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdC8vIFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgdmFsID0gdGhpcy5pbnB1dERvbS52YWwoKTtcclxuXHRpZih2YWwgIT09ICcnKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0bmFtZSA6IHZhbFxyXG5cdFx0fTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0X3RoaXMubWFwW3Jlcy5kYXRhLmlkXSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OltyZXMuZGF0YV19KTtcclxuXHRcdFx0XHRfdGhpcy5saXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbihlKXtcclxuXHQvLyAvY29uc29sZS5sb2codGhpcy5fc2VsZWN0RG9tKTtcclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblx0fVxyXG5cdC8vdGhpcy5hZGREb20uc2hvdygpO1xyXG5cdC8vdGhpcy5ub3dEb20uc2hvdygpO1xyXG5cclxuXHQvL2Z1aS1jcm9zc1xyXG5cdC8vZnVpLXBsdXNcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmxpc3Qoe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6cmVzLmRhdGF9KTtcclxuXHRcdFx0X3RoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwLGw9cmVzLmRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHRcdHZhciBpdGVtID0gcmVzLmRhdGFbaV07XHJcblx0XHRcdFx0X3RoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy5fc2VsZWN0RG9tLmRhdGEoJ2lkJyk7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0bGlzdCA6IFt0aGlzLm1hcFtpZF1dXHJcblx0fVxyXG5cclxuXHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0aWYodGhpcy5ub3dEb20uZmluZCgnLmxhYmVsJytpZCkubGVuZ3RoID09PSAwKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmUocGFyYW0pO1xyXG5cdFx0dGhpcy5ub3dEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXRMYWJlbExpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Ly8gY29uc29sZS5sb2codGhpcy5ub3dEb20uZmluZChcIi50YWdcIikubGVuZ3RoKTtcclxuXHQvLyB0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdC8vIFx0aWYoaWQpe1xyXG5cdC8vIFx0XHRsaXN0LnB1c2goaWQpO1xyXG5cdC8vIFx0fVx0XHRcdFx0XHJcblx0Ly8gfSlcdFxyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMubm93RG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v5Yig6ZmkXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdHAucmVtb3ZlKCk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnc3ViamVjdC9jcmVhdGUnLFxyXG5cdFx0Zm9sbG93IDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3cnLCAvL+WFs+azqFxyXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydhcnRpY2xlL2NyZWF0ZSdcclxuXHR9LFxyXG5cdGNvbW1lbnQgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydjb21tZW50L3NlYXJjaCcsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydjb21tZW50L2NyZWF0ZSdcclxuXHR9LFxyXG5cdGxhYmVsIDoge1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnbGFiZWwvY3JlYXRlJyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydsYWJlbC9saXN0J1xyXG5cdH0sXHJcblx0bG9naW4gOiBjZ2lQYXRoKydhY2NvdW50L2xvZ2luJyxcclxuXHRsb2dvdXQgOiBjZ2lQYXRoKydhY2NvdW50L2xvZ291dCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcbnZhciBlbXB0eUZ1biA9IGZ1bmN0aW9uKHJlcyl7XHJcbn1cclxuLy8gL+e7n+S4gOWHuuadpeW8ueWHuua2iOaBr1xyXG52YXIgY2hlY2tDYWxsYmFjayA9IGZ1bmN0aW9uKGNiLGZsYWcpe1xyXG5cdHJldHVybiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0Y2IocmVzKTtcclxuXHRcdGlmKHJlcy5jb2RlICE9PSAwKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1lbHNlIGlmKGZsYWcpe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZGIubG9naW4gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sb2dvdXQsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0ID0ge307XHJcblxyXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3Quc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvdyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZm9sbG93LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvd2luZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxyZXNvdXJjZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuYXJ0aWNsZSA9IHt9O1xyXG5cclxuZGIuYXJ0aWNsZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50ID0ge307XHJcblxyXG5kYi5jb21tZW50LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubGFiZWwuY3JlYXRlLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmxhYmVsLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sYWJlbC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2NnaS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBEYXRhID0ge307XHJcbi8qXHJcbuaVsOaNrue8k+WtmFxyXG51c2VyIOeUqOaIt1xyXG5zdWJqZWN0IOS4u+mimFxyXG5hcnRpY2xlIOW4luWtkFxyXG4qL1xyXG5EYXRhLnVzZXIgPSB7fTtcclxuRGF0YS5zdWJqZWN0ID0ge307XHJcbkRhdGEuYXJ0aWNsZSA9IHt9O1xyXG5EYXRhLmxhYmVsID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKHR5cGUsa2V5KXtcclxuXHRyZXR1cm4gRGF0YVt0eXBlXVtrZXldIHx8IG51bGw7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2RhdGEvZGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/nlKjmiLfliJfooajmmL7npLrnrYnnrYlcclxudmFyIHVNYW5hZ2UgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcjtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdG1hbmFnZUhhdmUgPSBmYWxzZTtcclxubW9kdWxlLmV4cG9ydHMgPSB1TWFuYWdlO1xyXG5cclxuLy92YXIgbWFuYWdlRG9tID0gJChcIiNhZGRNYW5hZ2VcIik7IC8v566h55CG5ZGY6K6+572uZG9tO1xyXG5cclxuLy/pgInmi6nnrqHnkIblkZjnrYnnrYnnmoTkuovku7bnu5HlrppcclxuLypcclxudmFyIG1hbmFnZUFjdGlvbiA9IHtcclxuXHRzZWFyY2ggOiBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdFx0dmFyIGtleSA9IHRhcmdldC52YWwoKTtcclxuXHRcdGlmKGtleSAhPT0gJycpe1xyXG5cdFx0XHRtYW5hZ2VBY3Rpb24uc2VhcmNoYnRuKHRhcmdldCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWFyY2hidG4gOiBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdFx0dmFyIGtleSA9ICQoXCIjc2VsZWN0T25lTWFuYWdlXCIpLnZhbCgpO1xyXG5cdFx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0XHR2YXIgdWxpc3QgPSBbXTtcclxuXHJcblx0XHRpZihrZXkgPT09ICcnKXtcclxuXHRcdFx0bWFuYWdlRG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdFx0aWYoaXRlbS5uYW1lLmluZGV4T2Yoa2V5KT49MCl7XHJcblx0XHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0bWFuYWdlRG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdFx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdCQoXCIjdXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRzZWxlY3R1c2VyIDogZnVuY3Rpb24odGFyZ2V0KXtcclxuXHRcdHZhciBpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcclxuXHJcblx0XHRpZigkKFwiI21hbmFnZVwiK2lkKS5sZW5ndGg9PT0wKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0XHRuYW1lIDogbmFtZVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0JChcIiNub3dNYW5hZ2VcIikuYXBwZW5kKGh0bWwpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuKi9cclxuXHJcbi8vIGZ1bmN0aW9uIGJpbmRNYW5hZ2VBY3Rpb24oKXtcclxuLy8gXHRtYW5hZ2VEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG4vLyBcdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG4vLyBcdFx0aWYoYWN0aW9uICYmIG1hbmFnZUFjdGlvblthY3Rpb25dKXtcclxuLy8gXHRcdFx0bWFuYWdlQWN0aW9uW2FjdGlvbl0odGFyZ2V0KTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuXHJcbi8vIFx0JChcIiNzZWxlY3RPbmVNYW5hZ2VcIikuYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG4vLyBcdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG4vLyBcdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgna2V5dXAnKTtcclxuXHJcbi8vIFx0XHRpZihhY3Rpb24gJiYgbWFuYWdlQWN0aW9uW2FjdGlvbl0pe1xyXG4vLyBcdFx0XHRtYW5hZ2VBY3Rpb25bYWN0aW9uXSh0YXJnZXQpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pO1xyXG4vLyB9XHJcblxyXG4vLyB1TWFuYWdlLnNob3cgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG4vLyBcdGlmKCFtYW5hZ2VIYXZlKXtcclxuLy8gXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG4vLyBcdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG4vLyBcdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcbi8vIFx0XHR9KTtcclxuLy8gXHRcdG1hbmFnZURvbS5odG1sKGh0bWwpO1xyXG4vLyBcdFx0YmluZE1hbmFnZUFjdGlvbigpO1xyXG4vLyBcdH1cclxuLy8gfVxyXG5cclxuLy8gdU1hbmFnZS5hZGREZWZNYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG4vLyBcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG4vLyBcdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuLy8gXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcbi8vIFx0fSk7XHJcbi8vIFx0JChcIiNub3dNYW5hZ2VcIikuaHRtbChodG1sKTtcdFxyXG4vLyB9XHJcblxyXG52YXIgbWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHQvL+e7meWumuWMuuWfn2RvbeeahOWQjeWtl1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIit0YXJnZXQpO1xyXG5cdHRoaXMubWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5cdC8v55So5oi35YiX6KGoXHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5kb20uZmluZCgnLm1hbmFnZS1saXN0Jyk7XHJcblx0dGhpcy5zZWxlY3REb20gPSB0aGlzLmRvbS5maW5kKCcubm93LW1hbmFnZS1saXN0Jyk7XHJcblx0Ly/mkJzntKLmoYZcclxuXHR0aGlzLmtleURvbTtcclxuXHJcblx0Ly/lvZPliY3lhYPntKBcclxuXHR0aGlzLl9zZWxlY3REb207XHJcblxyXG5cdC8v6YCJ5Lit55qE566h55CG5ZGY5YiX6KGoXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0Ly/mioroh6rlt7HmlL7lnKjnrqHnkIblkZjliJfooajph4zpnaJcclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1x0XHJcblxyXG59XHJcblxyXG4vL+WIneWni+WMluS4gOS4iy5cclxubWFuYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbi8v5pi+56S6566h55CG5ZGY5YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+a4heepuuWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5saXN0RG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+mAieS4reS4gOS4queUqOaIt1xyXG5tYW5hZ2UucHJvdG90eXBlLnNlbGVjdG9uZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcclxuXHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRuYW1lIDogbmFtZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0XHR0aGlzLnNlbGVjdERvbS5hcHBlbmQoaHRtbCk7XHRcdFx0XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG4vL+aQnOe0ouaMiemSrlxyXG5tYW5hZ2UucHJvdG90eXBlLnNlYXJjaGJ0biA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGtleSA9IHRoaXMua2V5RG9tLnZhbCgpO1xyXG5cdHZhciBsaXN0ID0gZGF0YS5saXN0O1xyXG5cdHZhciB1bGlzdCA9IFtdO1xyXG5cclxuXHRpZihrZXkgPT09ICcnKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKCdsaScpLnNob3coKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0aWYoaXRlbS5uYW1lLmluZGV4T2Yoa2V5KT49MCl7XHJcblx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMubGlzdERvbS5maW5kKCdsaScpLmhpZGUoKTtcclxuXHRpZih1bGlzdC5sZW5ndGg9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IHVsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKFwiLnVzZXJcIit1bGlzdFtpXSkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuLy/liKDpmaTkuIDkuKrpgInkuK3nmoTnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgnLnRhZycpLFxyXG5cdFx0aWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+S6i+S7tue7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+i+k+WFpeahhueahGtleXVw57uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUua2V5dXBBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5rZXlEb20uYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgna2V5dXAnKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudU1hbmFnZS5tYW5hZ2UgPSBtYW5hZ2U7XHJcbnVNYW5hZ2UuaW5pdCA9IGZ1bmN0aW9uKG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci9tYW5hZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBhTGlzdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKSxcclxuXHRjZ2ksXHJcblx0dG1wbCxcclxuXHRub3dTdWJJZCA9IDAsXHJcblx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhTGlzdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpO1xyXG5cclxuYUxpc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xyXG5cdG5vd1N1YklkID0gaWQ7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdG5ldyBhcnRpY2xlKCk7XHJcblxyXG5cdC8vIGFMaXN0LnNlYXJjaCh7XHJcblx0Ly8gXHRzdGFydCA6IHN0YXJ0LFxyXG5cdC8vIFx0bGltaXQgOiBsaW1pdCxcclxuXHQvLyBcdHN1YmplY3RJZCA6IG5vd1N1YklkXHJcblx0Ly8gfSlcclxufVxyXG5cclxudmFyIGFydGljbGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5zdWJpZCA9IG5vd1N1YklkO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLnNlYXJjaCgpO1xyXG59XHJcblxyXG4vL+iuoeeul+WbvueJh+eahOS4quaVsFxyXG5hcnRpY2xlLnByb3RvdHlwZS5nZXRpbWcgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbnVtID0gMDtcclxuXHRpZihkYXRhKXtcclxuXHRcdGZvcih2YXIgaSA9MCxsPWRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGRhdGFbaV07XHJcblx0XHRcdGlmKGl0ZW0udHlwZSA9PT0gMSl7XHJcblx0XHRcdFx0bnVtKys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG51bTtcclxufVxyXG5cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpID0gMCxsPWRhdGEubGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdGl0ZW0uaW1nbnVtID0gdGhpcy5nZXRpbWcoaXRlbS5yZXNvdXJjZSk7XHJcblx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0fVxyXG5cdGRhdGEubGlzdCA9IGxpc3Q7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbi8v57uR5a6a5LqL5Lu2XHJcbmFydGljbGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcclxufVxyXG5cclxuLy/liqDovb3mm7TlpJpcclxuYXJ0aWNsZS5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyB8fCB0aGlzLmVuZCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWRcclxuXHR9KTtcclxufVxyXG5cclxuLy/mt7vliqDliLDliY3pnaJcclxuYXJ0aWNsZS5wcm90b3R5cGUucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbi8v5ouJ5biW5a2Q5YiX6KGoXHJcbmFydGljbGUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0aWYoIXBhcmFtKXtcclxuXHRcdHBhcmFtID0ge1xyXG5cdFx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZFxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnRvdGFsID0gcmVzLmRhdGEudG90YWw7XHJcblx0XHRcdF90aGlzLmxlbmd0aCArPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0X3RoaXMuc3RhcnQgKz0gX3RoaXMubGltaXQ7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdHZhciBkYXRhID0gX3RoaXMuY2hlY2tEYXRhKHJlcy5kYXRhKTtcclxuXHRcdFx0Y29uc29sZS5sb2coZGF0YSk7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHRpZihfdGhpcy5sZW5ndGggPj0gX3RoaXMudG90YWwpe1xyXG5cdFx0XHRcdF90aGlzLmVuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG4vL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxyXG5hTGlzdC5wcmVwZW5kVG9MaXN0ID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3BhcmFtXX0pO1xyXG5cdFx0bGlzdERvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG4vL+WKoOi9veabtOWkmuaVsOaNrlxyXG4vKlxyXG5hTGlzdC5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2codGhpcy5lbmQpO1xyXG5cdGlmKGxvYWRpbmcgfHwgdGhpcy5lbmQpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRhTGlzdC5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiBzdGFydCxcclxuXHRcdGxpbWl0IDogbGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiBub3dTdWJJZFxyXG5cdH0pXHJcbn1cclxuXHJcblxyXG5cclxuLy/mkJzntKLmlbDmja5cclxuYUxpc3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdGxvYWRpbmcgPSB0cnVlO1xyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMudG90YWwgPSByZXMudG90YWw7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0c3RhcnQgKz0gbGltaXQ7XHJcblx0XHRcdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0bGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHR9ZWxzZXtcclxuXHJcblx0XHR9XHJcblxyXG5cdH0pO1xyXG59XHJcbiovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBhUG9zdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKSxcclxuXHRjZ2ksXHJcblx0dG1wbCxcclxuXHRub3dTdWJJZCA9IDAsXHJcblx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwLFxyXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYVBvc3Q7XHJcbnZhciBsaXN0RG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKSxcclxuXHRyZXNMaXN0ID0gW107XHJcblxyXG4vL+azqOWGjOWSjOe7keWumuS6i+S7tlxyXG5mdW5jdGlvbiBiaW5kQWN0aW9uKCl7XHJcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdHJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuLy/moLnmja5kb23ojrflj5bnm7jlhbPnmoTlj4LmlbAuXHJcbmZ1bmN0aW9uIGdldFBhcmFtKHRhcmdldCl7XHJcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG5cdFx0Y29udGVudCA9IHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCk7XHJcblxyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHRpdGxlIDogbmFtZSxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXHJcblx0XHRsYWJlbHMgOiBbMSwyXVxyXG5cdH1cclxuXHRpZihyZXNMaXN0Lmxlbmd0aCA+IDApe1xyXG5cdFx0cGFyYW0ucmVzb3VyY2VzID0gcmVzTGlzdDtcclxuXHR9XHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XHJcblx0dGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCcnKTtcclxufTtcclxuXHJcbmFQb3N0LmluaXQgPSBmdW5jdGlvbihpZCxtb2R1bGUsdG1wKXtcclxuXHRub3dTdWJJZCA9IGlkO1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHRuZXcgYVBvc3QucG9zdCgpO1xyXG5cdGJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuYVBvc3QucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tID0gJChcIiNwb3N0QXJ0aWNsZVwiKTsgLy/lupXpg6jlj5HooajmoYZcclxuXHR0aGlzLmNEb20gPSAkKFwiI2NyZWF0ZUFydGljbGVcIik7IC8v5by55Ye65Y+R6KGo5qGGXHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbigpe1xyXG5cclxufTtcclxuXHJcblxyXG5hUG9zdC5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0Y29uc29sZS5sb2codGFyZ2V0LnZhbCgpKTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5hUG9zdC5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0cmVzTGlzdCA9IFtdO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgcHQgPSB0aGlzLnRhcmdldC5kYXRhKCd0YXJnZXQnKTtcclxuXHQvL2NvbnNvbGUubG9nKHBUYXJnZXQpO1xyXG5cdHZhciBwVGFyZ2V0ID0gJChwdCk7XHJcblxyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSBnZXRQYXJhbShwVGFyZ2V0KTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHBUYXJnZXQuaGFzQ2xhc3MoJ21vZGFsJykpe1xyXG5cdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcclxuXHRcdH1cclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0Y29uc29sZS5sb2coc3RyaWtlci5hcnRpY2xlKTtcclxuXHRcdFx0c3RyaWtlci5hcnRpY2xlLmFwcGVuZFRvTGlzdChyZXMuZGF0YSk7XHJcblx0XHR9XHJcblx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdH0pO1x0XHJcbn1cclxuXHJcblxyXG4vL+WPkeW4g+S4gOS4quWGheWuuVxyXG4vKlxyXG5hUG9zdC5jcmVhdGUgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdGlmKGxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgcHQgPSB0YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwYXJhbSA9IGdldFBhcmFtKHBUYXJnZXQpO1xyXG5cdFx0XHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0bG9hZGluZyA9PT0gZmFsc2U7XHJcblx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblx0XHR9XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHN0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcbiovXHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsImZ1bmN0aW9uIGVtcHR5RnVuKHJlcyl7XHJcblx0Y29uc29sZS5sb2cocmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnUE9TVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXgob3B0LGNhbGxiYWNrLGVycm9yKXtcclxuXHR2YXIgdHlwZSA9IG9wdC50eXBlIHx8ICdHRVQnLFxyXG5cdFx0dXJsID0gb3B0LnVybCxcclxuXHRcdGRhdGEgPSBvcHQuZGF0YTtcclxuXHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZSA6IHR5cGUsXHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGFydGljbGUgY2xhc3M9XCJhcnRpY2Utb25lXCI+XFxyXFxuICAgIDxhc2lkZSBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2FzaWRlPlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLWNoZWNrLWNpcmNsZVwiPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmdWktY2hhdFwiPuWbnuWkjTwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxyXFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9hcnRpY2xlPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxhcnRpY2xlIGNsYXNzPVwiYXJ0aWNlLW9uZVwiPlxcbiAgICA8YXNpZGUgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2FzaWRlPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yKSwgXCIgICDmnIDlkI7lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0udXBkYXRvciksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLWNoZWNrLWNpcmNsZVwiPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJmdWktY2hhdFwiPuWbnuWkjTwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvYXJ0aWNsZT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNvbW1lbnQuanMifQ==