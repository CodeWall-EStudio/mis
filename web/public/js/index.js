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
		subject = __webpack_require__(4),
		article = __webpack_require__(5),
		msg = __webpack_require__(6),
		notify = __webpack_require__(7),
		label = __webpack_require__(8);
	
	
	var Striker = $(window.striker);
	
	
	//事件通知,用户资料已经加载完成
	function userLoad(e,d){
		new subject.area('mySubject');
		new subject.area('myFollow');
		new subject.area('myInvited');
		new subject.area('myArchived');
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
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).user,
		logout = __webpack_require__(14).logout,
		data = __webpack_require__(15).user,
		userManage = __webpack_require__(16),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(26),
		manage : __webpack_require__(27),
		onemanage : __webpack_require__(28)
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

	//主题
	var cgi = __webpack_require__(14).subject,
		subjectList = __webpack_require__(17),
		subjectInfo = __webpack_require__(18),
		subjectCreate = __webpack_require__(19);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(33),
		manage : __webpack_require__(27), //管理员
		list : __webpack_require__(34),  //主题列表
		head : __webpack_require__(35),  //主题详情头部
		onemanage : __webpack_require__(28), //单个管理员
		aside : __webpack_require__(36),  //主题详情右边资源列表
		rlist : __webpack_require__(37)   //资源列表
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

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).article;
	var tmpl = {
		list : __webpack_require__(39),
		top : __webpack_require__(40),
		rlist : __webpack_require__(37)   //资源列表
	};
	
	var articleList = __webpack_require__(20),
		articlePost = __webpack_require__(10);
	
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
/* 6 */
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//通知
	var notify = {},
		data = __webpack_require__(15).notify,
		cgi = __webpack_require__(14).notify;
	
	var tmpl = {
		list : __webpack_require__(29),
		one : __webpack_require__(30)   //资源列表
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).label,
		data = __webpack_require__(15).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(31),
		one : __webpack_require__(32)
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(15),
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
		list : __webpack_require__(39),
		rlist : __webpack_require__(37)   //资源列表
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
			resource : this.getResList()
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
			console.log(3333,d);
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(21),
		message = __webpack_require__(6);
	
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
	
	module.exports = db;

/***/ },
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(15).user;
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(15).subject,
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl,
		data = __webpack_require__(15);
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
/* 19 */
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
			_this.titleDom.text('新建帖子');
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
					this.loading = true;
					if(_this.isedit){
						cgi.edit(param,function(res){
							if(res.code === 0){
								_this.dom.modal('hide');
								_this.loading = false;
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(15),
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
		var html = tmpl.list({list:[param]});
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
	
	//把新发布的帖子加到列表最前面
	aList.prependToList = function(param){
			var html = tmpl.list({list:[param]});
			listDom.prepend(html);
	}
	
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
/* 21 */
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
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <%\r\n    	for(var i = 0,l=list.length;i<l;i++){\r\n    		var item = list[i];\r\n    %>\r\n      <dl class="art-list">\r\n        <dt><a href="/info.html?id=<%-item.id%>"><%-item.title%></a></dt>\r\n        <dd>创建人 <%-item.creatorName%> 创建时间 <%-striker.util.formatTime(item.createTime)%> 最近更新 <%-striker.util.formatTime(item.updateTime)%> 主题资源 <%-item.resourceCount%> <%-item.memberCount%>个成员 <%-item.updator%>个帖子 <%-item.resourceCount%>个资源</dd>\r\n      </dl> \r\n    <%}%>',
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
	                    buf.push('\n      <dl class="art-list">\n        <dt><a href="/info.html?id=', (__stack.lineno = 6, item.id), '">', (__stack.lineno = 6, item.title), "</a></dt>\n        <dd>创建人 ", (__stack.lineno = 7, item.creatorName), " 创建时间 ", (__stack.lineno = 7, striker.util.formatTime(item.createTime)), " 最近更新 ", (__stack.lineno = 7, striker.util.formatTime(item.updateTime)), " 主题资源 ", (__stack.lineno = 7, item.resourceCount), " ", (__stack.lineno = 7, item.memberCount), "个成员 ", (__stack.lineno = 7, item.updator), "个帖子 ", (__stack.lineno = 7, item.resourceCount), "个资源</dd>\n      </dl> \n    ");
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
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12</dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\r\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\r\n          <a href="/index.html">返回</a>\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
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
	                buf.push('</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
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
	        input: '        <nav class="btn-toolbar">\r\n          <div class="btn-group">\r\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\r\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\r\n            <span class="btn btn-primary">统计</span>\r\n          </div>\r\n        </nav>\r\n\r\n        <div class="artice-aside-img">\r\n          <!--\r\n          <div class="video">\r\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\r\n            预览  标注 下载  删除\r\n          </div>\r\n          -->\r\n          <div class="img-list">\r\n            <%\r\n              for(var i in resourceList){\r\n              var item = resourceList[i];\r\n            %>\r\n            <div class="sub-resource-<%-item.id%>">\r\n            <%if(item.type === 1){%>\r\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else if(item.type === 4 || item.type ===3){%>\r\n              <video src="/cgi/resource/preview?id=<%-item.id%>" controls="controls">\r\n              您的浏览器不支持 video 标签。\r\n              </video>\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else{%>\r\n              <p><%-item.name%></p>\r\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>              \r\n            <%}%>\r\n            </div>\r\n            <%}%>\r\n          </div>\r\n        </div>',
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
	                        buf.push('\n              <video src="/cgi/resource/preview?id=', (__stack.lineno = 29, item.id), '" controls="controls">\n              您的浏览器不支持 video 标签。\n              </video>\n              <a data-id="', (__stack.lineno = 32, item.id), '"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 32, item.id), '" target="_blank">下载</a>\n              ');
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
/* 37 */
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
/* 38 */,
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                    buf.push('\n  <div class="artice-one article', (__stack.lineno = 4, item.id), '">\n    <div class="artice-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), "   最后回复 ", (__stack.lineno = 7, item.updator), '</div>\n      <div class="info-action">\n        <span class="up" data-id="', (__stack.lineno = 9, item.id), '" data-action="setup" data-status="', (__stack.lineno = 9, item.isStar), '"><span></span>');
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
/* 40 */
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

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzc0NTA0MzBhNDFjOTI5NGVmMWM/OTYyYyoqIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci91c2VyLmpzP2VjNGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcz82NWNjIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL2FydGljbGUuanM/ZWU1NyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzPzk0MmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9jZ2kuanM/MjNiMioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvZGF0YS5qcz85ZGU5Iiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL21hbmFnZS5qcz84ZGI1Iiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2xpc3QuanM/ZThjZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9pbmZvLmpzP2E2ZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvY3JlYXRlLmpzPzM3ZjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvbGlzdC5qcz84YWIzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0Iiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbXNnLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L3NpemUuZWpzPzhkZWMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2xpc3QuZWpzPzRlZjEiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzPzg3NzciLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2FzaWRlLmVqcz81ZDg2Iiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanM/YzUzNyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanM/M2ZhMiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvdG9wLmVqcz8wMDQ0Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7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dUJBQXNCLGVBQWU7QUFDckMsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQSxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNoT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7Ozs7QUNsVEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlEO0FBQ0E7O0FBRUEscUI7Ozs7OztBQ3ZSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7O0FDaEJBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOzs7QUFHQSxvQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsNEI7O0FBRUE7QUFDQTtBQUNBLHNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLCtCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDdkxBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEIsaUJBQWdCO0FBQ2hCLGVBQWM7QUFDZCxpQkFBZ0I7O0FBRWhCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZCO0FBQ0EsR0FBRTs7O0FBR0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLGtDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNLEU7QUFDTixNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLE9BQU0sRTtBQUNOOztBQUVBO0FBQ0E7O0FBRUEsR0FBRTtBQUNGLEU7Ozs7OztBQ2xPQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLElBQUk7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVTtBQUNBLE1BQUssRTs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBLG1DQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHlCQUF5Qix3YkFBd2IsT0FBTyxLQUFLLE1BQU0seWJBQXliLDRGQUE0RixtREFBbUQsSUFBSSxLQUFLLDZDQUE2Qyx1REFBdUQsME9BQTBPLG9DQUFvQywwRkFBMEYsMENBQTBDLG1DQUFtQyxtQ0FBbUM7QUFDdHFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWlFLE9BQU87QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyRUE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLGNBQWMsS0FBSyx1QkFBdUIsdUhBQXVIO0FBQ2pNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxnQ0FBK0IsaUJBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImpzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDc3NDUwNDMwYTQxYzkyOTRlZjFjXG4gKiovIiwicmVxdWlyZSgnLi9jb21tb24vZ2xvYmFsJyk7XG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXG5cdHN1YmplY3QgPSByZXF1aXJlKCcuL3N1YmplY3Qvc3ViamVjdCcpLFxuXHRhcnRpY2xlID0gcmVxdWlyZSgnLi9hcnRpY2xlL2FydGljbGUnKSxcblx0bXNnID0gcmVxdWlyZSgnLi9jb21tb24vbXNnJyksXG5cdG5vdGlmeSA9IHJlcXVpcmUoJy4vbm90aWZ5L25vdGlmeScpLFxuXHRsYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwvbGFiZWwnKTtcblxuXG52YXIgU3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xuXG5cbi8v5LqL5Lu26YCa55+lLOeUqOaIt+i1hOaWmeW3sue7j+WKoOi9veWujOaIkFxuZnVuY3Rpb24gdXNlckxvYWQoZSxkKXtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlTdWJqZWN0Jyk7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215Rm9sbG93Jyk7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215SW52aXRlZCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUFyY2hpdmVkJyk7XG5cdG5ldyBub3RpZnkubm90aWZ5KCk7XG5cdHdpbmRvdy5zdHJpa2VyLmxhYmVsID0gbmV3IGxhYmVsLmxhYmVsKCdsYWJlbEFyZWEnKTtcblx0d2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdCA9IG5ldyBzdWJqZWN0LmNyZWF0ZSgpO1xuXHR3aW5kb3cuc3RyaWtlci5tc2cgPSBuZXcgbXNnLm1lc3NhZ2UoKTtcblx0Ly9zdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG5cdC8vIHN1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcblx0Ly8gc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xufVxuXG4vL+S6i+S7tumAmuefpSzkuLvpopjlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHN1YmplY3RMb2FkKGUsZCl7XG5cdGNvbnNvbGUubG9nKGUsZCk7XG59XG5cbnZhciBoYW5kbGVycyA9IHtcblx0J3VzZXJMb2FkU3ViJyA6IHVzZXJMb2FkLFxuXHQnc3ViamVjdExvYWQnIDogc3ViamVjdExvYWRcbn1cblxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcblx0U3RyaWtlci5iaW5kKGksaGFuZGxlcnNbaV0pO1xufVxuXG4vL+WFqOWxgOS6i+S7tue7keWumlxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xuXHQkKCdib2R5JykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0XHRpZihhY3Rpb24pe1xuXHRcdFx0dmFyIGFjdE1hcCA9IGFjdGlvbi5zcGxpdCgnLicpO1xuXHRcdFx0dmFyIG1vZCA9IGFjdE1hcFswXSxcblx0XHRcdFx0ZnVuID0gYWN0TWFwWzFdO1xuXHRcdFx0aWYoYWN0TWFwLmxlbmd0aCA9PT0gMiAmJiBzdHJpa2VyW21vZF1bZnVuXSl7XG5cblx0XHRcdFx0c3RyaWtlclttb2RdW2Z1bl0odGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCl7XG5cdHN1YmplY3QuaW5pdCgnaW5kZXgnKTtcblx0Ly9hcnRpY2xlLmluaXQoJ2luZGV4Jyk7XG5cdHVzZXIuaW5pdCgpO1xuXHRsYWJlbC5pbml0KCk7XG5cblx0c3RyaWtlci5zdWJqZWN0ID0gc3ViamVjdDtcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcblx0c3RyaWtlci51c2VyID0gdXNlcjtcblxuXHRiaW5kQWN0aW9uKCk7XG59XG5cbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcblxuZnVuY3Rpb24gZm9ybWF0VGltZShzdHIpe1xuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cik7XG5cbiAgICB2YXIgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHZhciBtbSA9IChkYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkICAgICAgICAgXG4gICAgdmFyIGRkICA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgcmV0dXJuIHl5eXkgKyAnLScgKyAobW1bMV0/bW06XCIwXCIrbW1bMF0pICsgJy0nICsgKGRkWzFdP2RkOlwiMFwiK2RkWzBdKTtcdFxufVxuXG5mdW5jdGlvbiBnZXROb3dUaW1lKHN0cil7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBhdGltZSA9IG5ldyBEYXRlKHN0cikuZ2V0VGltZSgpO1xuXG4gICAgdmFyIGMgPSBNYXRoLmZsb29yKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYy8zNjAwKSsn5YiG6ZKf5YmNJztcbiAgICB9ZWxzZSBpZihjPDM2MDAqMjQpe1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjLygzNjAwKjI0KSkrJ+WkqeWJjSc7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lKHN0cik7XG4gICAgfVxuXG59XG5cbnZhciBnZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihuYW1lLHN0cil7XG4gICAgc3RyID0gc3RyIHx8IGxvY2F0aW9uLmhyZWY7XG4gICAgdmFyIHIgPSBuZXcgUmVnRXhwKFwiKFxcXFw/fCN8JilcIiArIG5hbWUgKyBcIj0oW14mI10qKSgmfCN8JClcIiksIG0gPSBzdHIubWF0Y2gocik7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCghbSA/IFwiXCIgOiBtWzJdKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFtsZW49Ml0g5a2X5q+N5pWwKOWkmuWwkeS4quWtl+avjeeul+S4gOS4quWtlylcbiAqIEBleGFtcGxlXG4gKiAgICAgIGdldExlbignYWJj5LiA5LqM5LiJJyk7XG4gKi9cbnZhciBnZXRMZW4gPSBmdW5jdGlvbihzdHIsbGVuKXtcbiAgICAvL+ato+WImeWPluWIsOS4reaWh+eahOS4quaVsO+8jOeEtuWQjmxlbipjb3VudCvljp/mnaXnmoTplb/luqbjgILkuI3nlKhyZXBsYWNlXG4gICAgdmFyIGZhY3RvciA9IGxlbiB8fCAzO1xuICAgIHN0ciArPSAnJztcbiAgICB2YXIgemhDaGFyID0gc3RyLm1hdGNoKC9bXlxceDAwLVxceGZmXS9nKSB8fCBbXTtcbiAgICB2YXIgbGV0dGVyID0gc3RyLnJlcGxhY2UoL1teXFx4MDAtXFx4ZmZdL2cgLCAnJyk7XG4gICAgcmV0dXJuIHBhcnNlSW50KHpoQ2hhci5sZW5ndGggKyAobGV0dGVyLmxlbmd0aCAvIGZhY3RvcikpO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXgg5oC76ZW/5bqmXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFtsZW49Ml0g6ZW/5bqmXG4gKiBAZXhhbXBsZVxuICogICAgICBjaGFuZ2VMZW4oJ2FiY+S4gOS6jOS4iScsMTApO1xuICovXG52YXIgY2hhbmdlTGVuID0gZnVuY3Rpb24oc3RyLG1heCl7XG5cdHZhciBtYXggPSBtYXggfHwgMTA7XG5cdHZhciBsZW4gPSBnZXRMZW4oc3RyKTtcblx0dmFyIHJldCA9IG1heCAtIGxlbjtcblx0cmV0dXJuIHJldD49MD9yZXQ6MDtcbn1cblxud2luZG93LnN0cmlrZXIudXRpbCA9IHtcblx0Zm9ybWF0VGltZSA6IGZvcm1hdFRpbWUsXG5cdGdldFBhcmFtZXRlciA6IGdldFBhcmFtZXRlcixcbiAgICBnZXROb3dUaW1lIDogZ2V0Tm93VGltZSxcblx0Z2V0TGVuIDogZ2V0TGVuLFxuXHRjaGFuZ2VMZW4gOiBjaGFuZ2VMZW5cbn1cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS51c2VyLFxyXG5cdGxvZ291dCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sb2dvdXQsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXHJcblx0dXNlck1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyksXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bmF2IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvdXNlcl9uYXYuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKVxyXG59XHJcblxyXG52YXIgVXNlciA9IHt9LFxyXG5cdF90aGlzID0gVXNlcjtcclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG5cclxuLy/lr7nlpJbmj5DkvpvnmoTmjqXlj6Ncclxud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XHJcblxyXG4vL+euoeeQhuWRmOiuvue9ruaYvuekuuetieetiVxyXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xyXG4vLyBVc2VyLmFkZG1hbmFnZSA9IHVzZXJNYW5hZ2Uuc2hvdztcclxuXHJcbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XHJcblxyXG5Vc2VyLmdldE15SW5mbyA9IGZ1bmN0aW9uKGNiKXtcclxuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLm15SW5mbyA9IHJlcy5kYXRhO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcclxuXHRcdFx0JChcIiN1c2VyTmF2XCIpLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZEFydCcscmVzLmNvZGUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcmxvYWQnKTtcclxuXHRcdFx0YmluZEFjdGlvbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG52YXIgbXlBY3QgPSB7XHJcblx0J2xvZ291dCcgOiBmdW5jdGlvbigpe1xyXG5cdFx0bG9nb3V0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdCQoXCIjdXNlck5hdlwiKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24pe1xyXG5cdFx0XHRpZihteUFjdFthY3Rpb25dKXtcclxuXHRcdFx0XHRteUFjdFthY3Rpb25dKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5Vc2VyLmdldFVzZXJMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLmxpc3QgPSByZXMuZGF0YTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRfdGhpcy5nZXRNeUluZm8oKTtcclxuXHRfdGhpcy5nZXRVc2VyTGlzdCgpO1xyXG5cdHVzZXJNYW5hZ2UuaW5pdChjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvdXNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+S4u+mimFxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnN1YmplY3QsXHJcblx0c3ViamVjdExpc3QgPSByZXF1aXJlKCcuL2xpc3QnKSxcclxuXHRzdWJqZWN0SW5mbyA9IHJlcXVpcmUoJy4vaW5mbycpLFxyXG5cdHN1YmplY3RDcmVhdGUgPSByZXF1aXJlKCcuL2NyZWF0ZScpO1xyXG5cclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxuLy/mqKHmnb/lvJXnlKhcclxudmFyIHRtcGwgPSB7XHJcblx0YXJlYSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L3NpemUuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLCAvL+euoeeQhuWRmFxyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9saXN0LmVqcycpLCAgLy/kuLvpopjliJfooahcclxuXHRoZWFkIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvaGVhZC5lanMnKSwgIC8v5Li76aKY6K+m5oOF5aS06YOoXHJcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpLCAvL+WNleS4queuoeeQhuWRmFxyXG5cdGFzaWRlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvYXNpZGUuZWpzJyksICAvL+S4u+mimOivpuaDheWPs+i+uei1hOa6kOWIl+ihqFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIHByb01hcCA9IHtcclxuXHRteVN1YmplY3QgOiAn5oiR5Yib5bu655qEJyxcclxuXHRteUZvbGxvdyA6ICfmiJHlhbPms6jnmoQnLFxyXG5cdG15SW52aXRlZCA6ICfpgoDor7fmiJHnmoQnLFxyXG5cdG9wZW4gOiAn5YWs5byA5Li76aKYJyxcclxuXHRteUFyY2hpdmVkIDogJ+W9kuaho+S4u+mimCdcclxufVxyXG5cclxudmFyIFN1YmplY3QgPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ViamVjdDtcclxuXHJcbi8q5a6a5LmJ6YCa55So5Y+C5pWwKi9cclxudmFyIHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxuU3ViamVjdC5zZWFyY2ggPSBzdWJqZWN0TGlzdC5zZWFyY2g7XHJcblxyXG5TdWJqZWN0LmNyZWF0ZSA9IHN1YmplY3RDcmVhdGUuY3JlYXRlO1xyXG5cclxuU3ViamVjdC5pbmZvID0gc3ViamVjdEluZm8uaW5mbztcclxuXHJcblN1YmplY3QuYXJlYSA9IGZ1bmN0aW9uKGRvbW5hbWUpe1xyXG5cdHZhciBwcm9OYW1lID0gZG9tbmFtZSxcclxuXHRcdGRvbSA9ICQoJyMnK2RvbW5hbWUrJ0Jsb2NrJyk7XHJcblx0dGhpcy5wcm9OYW1lID0gZG9tbmFtZTtcclxuXHR0aGlzLmRvbSA9IGRvbTtcclxuXHR0aGlzLnBhZ2UgPSAwOyAgIC8v5byA5aeL6aG156CBXHJcblx0dGhpcy5hbGxQYWdlID0gMDtcclxuXHR0aGlzLmxpbWl0ID0gNTsgLy/kuIDpobXnmoTmnaHmlbBcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnOy8vMCDmjInml7bpl7TmjpLluo8sMSDmjInmm7TmlrDml7bpl7TmjpLluo9cclxuXHR0aGlzLmxpc3REb207IC8v5YiX6KGo55qE5L2N572uXHJcblx0dmFyIGh0bWwgPSB0bXBsLmFyZWEoe1xyXG5cdFx0cHJvVGV4dCA6IHByb01hcFtkb21uYW1lXSxcclxuXHRcdHByb05hbWUgOiBkb21uYW1lXHJcblx0fSk7XHJcblx0ZG9tLmh0bWwoaHRtbCk7XHJcblx0dGhpcy5saXN0RG9tID0gJCgnIycrZG9tbmFtZSk7XHJcblx0dGhpcy5udW1Eb20gPSAkKFwiI1wiK2RvbW5hbWUrJ051bScpO1xyXG5cdHRoaXMucHJlUGFnZSA9IGRvbS5maW5kKCcucHJlLXBhZ2UnKTtcclxuXHR0aGlzLm5leHRQYWdlID0gZG9tLmZpbmQoJy5uZXh0LXBhZ2UnKTtcdFxyXG5cdHRoaXMudGltZURvbSA9IGRvbS5maW5kKCcudGltZScpO1xyXG5cdHRoaXMudXBkYXRlRG9tID0gZG9tLmZpbmQoJy51cGRhdGUnKTtcclxuXHR0aGlzLmFsbE51bSA9IDA7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbi8v5LiL5LiA6aG1XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlIDwgdGhpcy5hbGxQYWdlLTEpe1xyXG5cdFx0dGhpcy5wYWdlKys7XHJcblx0XHR0aGlzLmdldERhdGUoe1xyXG5cdFx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG5cclxuLy/kuIrkuIDpobVcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5wcmUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA+IDApe1xyXG5cdFx0dGhpcy5wYWdlLS07XHJcblx0XHR0aGlzLmdldERhdGUoe1xyXG5cdFx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5omT5byA5pS26LW3XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihlKXtcclxuXHRpZih0aGlzLmxpc3REb20uaGFzQ2xhc3MoJ2hpZGUnKSl7XHJcblx0XHR0aGlzLmxpc3REb20ucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMubGlzdERvbS5hZGRDbGFzcygnaGlkZScpO1xyXG5cdH1cclxufVxyXG5cclxuLy/mjInlj5Hooajml7bpl7TmjpLluo9cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5vcmRlcmJ5dGltZSA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8gb3JkZXJieTogdXBkYXRlVGltZSAvIGNyZWF0ZVRpbWVcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMudGltZURvbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy51cGRhdGVEb20ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcclxufVxyXG5cclxuLy/mjInmm7TmlrDml7bpl7TmjpLluo9cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5vcmRlcmJ5dXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMudXBkYXRlRG9tLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLnRpbWVEb20ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1x0XHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbi8v5paw5bu65Li76aKYXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZighdGhpcy5jcmVhdGVTdWJqZWN0KXtcclxuXHRcdHRoaXMuY3JlYXRlU3ViamVjdCA9IHdpbmRvdy5zdHJpa2VyLmNyZWF0ZVN1YmplY3Q7XHJcblx0fVxyXG5cdGlmKCF0aGlzLmxhYmVsKXtcclxuXHRcdHRoaXMubGFiZWwgPSB3aW5kb3cuc3RyaWtlci5sYWJlbDtcclxuXHR9XHJcblx0dGhpcy5jcmVhdGVTdWJqZWN0LmNoYW5nZVR5cGUodGhpcy5wcm9OYW1lKTtcclxuXHQvL3RoaXMubGFiZWwuaW5pdCgpO1xyXG59XHJcblxyXG4vL+WIpOaWree/u+mhteaYr+WQpuWPr+S7peeCueWHu1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNoZWNrUGFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlIDw9IDEpe1xyXG5cdFx0dGhpcy5wcmVQYWdlLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYodGhpcy5hbGxQYWdlID09PSAxKXtcclxuXHRcdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDpmYWxzZX0pLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1x0XHJcblx0XHR9XHJcblx0XHRcclxuXHR9ZWxzZSBpZih0aGlzLnBhZ2UgPj0gdGhpcy5hbGxQYWdlLTEpe1xyXG5cdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZih0aGlzLmFsbFBhZ2UgPT09IDEpe1xyXG5cdFx0XHR0aGlzLnByZVBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMucHJlUGFnZS5wcm9wKHtkaXNhYmxlZDpmYWxzZX0pLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5L+u5pS55oC75pWwXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2hhbmdlTnVtID0gZnVuY3Rpb24obnVtKXtcclxuXHR0aGlzLmFsbFBhZ2UgPSBNYXRoLmNlaWwobnVtL3RoaXMubGltaXQpO1xyXG5cdHRoaXMuYWxsTnVtID0gbnVtO1xyXG5cdHRoaXMubnVtRG9tLnRleHQobnVtKTtcclxufVxyXG5cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHJcblx0dmFyIGZ1bm5hbWUgPSAnc2VhcmNoJztcclxuXHRpZih0aGlzLnByb05hbWUgPT09ICdteUZvbGxvdycpe1xyXG5cdFx0ZnVubmFtZSA9ICdmb2xsb3dpbmcnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdteUludml0ZScpe1xyXG5cdFx0ZnVubmFtZSA9ICdpbnZpdGVkJztcclxuXHR9ZWxzZSBpZiAodGhpcy5wcm9OYW1lID09PSAnbXlBcmNoaXZlZCcpe1xyXG5cdFx0ZnVubmFtZSA9ICdhcmNoaXZlZCc7XHJcblx0fVxyXG5cclxuXHRjZ2lbZnVubmFtZV0ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmNoYW5nZU51bShyZXMuZGF0YS50b3RhbCk7XHJcblx0XHRcdF90aGlzLmNoZWNrUGFnZSgpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vKlxyXG7ogIPomZHliLDpppbpobXnu5PmnoTnmoTnibnmrormgKcs6L+Z6YeM5YiG5Z2X57uR5a6a5LqL5Lu2XHJcbiovXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3N1YmplY3RDcmVhdGVkJyxmdW5jdGlvbigpe1xyXG5cdFx0aWYoJ215U3ViamVjdCcgPT09IF90aGlzLnByb05hbWUpe1xyXG5cdFx0XHRfdGhpcy5hbGxOdW0rKztcclxuXHRcdFx0X3RoaXMuY2hhbmdlTnVtKF90aGlzLmFsbE51bSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblN1YmplY3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUpe1xyXG5cdHN1YmplY3RMaXN0LmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdEluZm8uaW5pdCh0eXBlLGNnaSx0bXBsKTtcclxuXHRzdWJqZWN0Q3JlYXRlLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHR0b3AgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS90b3AuZWpzJyksXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn07XHJcblxyXG52YXIgYXJ0aWNsZUxpc3QgPSByZXF1aXJlKCcuL2xpc3QnKSxcclxuXHRhcnRpY2xlUG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xyXG5cclxudmFyIEFydGljbGUgPSB7fVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBBcnRpY2xlO1xyXG5cclxuQXJ0aWNsZS5saXN0ID0gYXJ0aWNsZUxpc3QuYXJ0aWNsZTtcclxuXHJcbi8vIEFydGljbGUubG9hZE1vcmUgPSBhcnRpY2xlTGlzdC5sb2FkTW9yZTtcclxuXHJcbkFydGljbGUuYXBwZW5kVG9MaXN0ID0gYXJ0aWNsZUxpc3QucHJlcGVuZFRvTGlzdDtcclxuXHJcbi8vQXJ0aWNsZS5wb3N0ID0gYXJ0aWNsZVBvc3QuY3JlYXRlO1xyXG5cclxuLy9BcnRpY2xlLnJlc2V0ID0gYXJ0aWNsZVBvc3QucmVzZXQ7XHJcblxyXG4vKiovXHJcblxyXG5BcnRpY2xlLmluaXQgPSBmdW5jdGlvbihpZCl7XHJcblx0YXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0YXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvYXJ0aWNsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0Ly8gaWYoZCA9PSAxMDAxKXtcclxuXHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IGNvbmZpZy5jZ2kuZ290b2xvZ2luO1xyXG5cdC8vIFx0cmV0dXJuO1xyXG5cdC8vIH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZ1tkXSB8fCAn5Ye66ZSZ5ouJISdcclxuXHR9XHJcblx0aWYocGFyc2VJbnQoZCkpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLm1zZyA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZyB8fCAnJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChtc2cpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1x0XHRcclxufVxyXG5cclxuZGIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIi8v6YCa55+lXHJcbnZhciBub3RpZnkgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubm90aWZ5LFxyXG5cdGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5ub3RpZnk7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2cuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59XHJcblxyXG52YXIgbm90aWZ5T2JqID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjbm90aWZ5TGlzdFwiKTtcclxuXHR0aGlzLnRpcHNEb20gPSAkKFwiI3VzZXJOYXYgLm1zZyBkaXZcIik7XHJcblxyXG5cdHRoaXMubXNnTnVtID0gMDtcclxuXHR0aGlzLmdldCgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuc2VhcmNoKHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aCl7XHJcblx0XHRcdFx0X3RoaXMubXNnTnVtID0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSkuc2hvdygpO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhodG1sKTtcclxuXHRcdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxubm90aWZ5T2JqLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMudGlwc0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRpZihfdGhpcy5tc2dOdW0pe1xyXG5cdFx0XHRpZihfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnKSl7XHJcblx0XHRcdFx0X3RoaXMuZG9tLmhpZGUoKTtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDApO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5kb20uc2hvdygpO1x0XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS5kYXRhKCdzaG93JywxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRocmVmID0gdGFyZ2V0LmRhdGEoJ2hyZWYnKSxcclxuXHRcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdFx0cmVhZCA9IHRhcmdldC5kYXRhKCdyZWFkJyk7XHJcblxyXG5cclxuXHRcdGlmKGhyZWYpe1xyXG5cdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0aWYocmVhZCA9PSAnJyl7XHJcblx0XHRcdFx0Y2dpLnJlYWQoe1xyXG5cdFx0XHRcdFx0bm90aWZ5SWQgOiBpZFxyXG5cdFx0XHRcdH0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0LnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5tc2dOdW0tLTtcclxuXHRcdFx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbm5vdGlmeS5ub3RpZnkgPSBub3RpZnlPYmo7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBub3RpZnk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9ub3RpZnkvbm90aWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sYWJlbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIExhYmVsID0ge30sXHJcblx0X3RoaXMgPSBMYWJlbDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9vbmUuZWpzJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0KCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIituYW1lKTtcclxuXHJcblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmFkZERvbSA9IHRoaXMuZG9tLmZpbmQoJy5hZGQtbGFiZWwtYXJlYScpO1xyXG5cdC8vIGlmKHR5cGUgPT09ICdzdWInKXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dTdWJMYWJlbCcpO1xyXG5cdC8vIH1lbHNle1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd0FydExhYmVsJyk7XHJcblx0Ly8gfVxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5idG5Eb20gPSB0aGlzLmFkZERvbS5maW5kKCcuYnRuJyk7XHJcblx0dGhpcy5pbnB1dERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcclxuXHJcblx0Ly/pu5jorqTmsqHmnInmoIfnrb5cclxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cclxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1x0XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvL1xyXG5cdC8vIHRoaXMubm93RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdC8vIFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0Ly8gXHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHQvLyBcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIHZhbCA9IHRoaXMuaW5wdXREb20udmFsKCk7XHJcblx0aWYodmFsICE9PSAnJyl7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdG5hbWUgOiB2YWxcclxuXHRcdH07XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLm1hcFtyZXMuZGF0YS5pZF0gPSByZXMuZGF0YTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XHJcblx0XHRcdFx0X3RoaXMubGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oZSl7XHJcblx0Ly8gL2NvbnNvbGUubG9nKHRoaXMuX3NlbGVjdERvbSk7XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cdH1cclxuXHQvL3RoaXMuYWRkRG9tLnNob3coKTtcclxuXHQvL3RoaXMubm93RG9tLnNob3coKTtcclxuXHJcblx0Ly9mdWktY3Jvc3NcclxuXHQvL2Z1aS1wbHVzXHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5saXN0KHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMCxsPXJlcy5kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xyXG5cdFx0XHRcdF90aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dFZGl0ID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0IHZhciBodG1sID0gdG1wbC5vbmUoe2xpc3Q6ZGF0YX0pO1xyXG5cdCB0aGlzLm5vd0RvbS5odG1sKGh0bWwpLnNob3coKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxyXG5cdH1cclxuXHJcblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdGlmKHRoaXMubm93RG9tLmZpbmQoJy5sYWJlbCcraWQpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lKHBhcmFtKTtcclxuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XHJcblx0Ly8gdGhpcy5ub3dEb20uZmluZChcIi50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHQvLyBcdGlmKGlkKXtcclxuXHQvLyBcdFx0bGlzdC5wdXNoKGlkKTtcclxuXHQvLyBcdH1cdFx0XHRcdFxyXG5cdC8vIH0pXHRcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLm5vd0RvbS5odG1sKCcnKS5oaWRlKCk7XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+WIoOmZpFxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRwLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuTGFiZWwuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxuXHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5mdW5jdGlvbiByZXNldEZyb20odGFyZ2V0KXtcclxuXHR0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgnJyk7XHJcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xyXG59O1xyXG5cclxuYVBvc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xyXG5cdG5vd1N1YklkID0gaWQ7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdG5ldyBhUG9zdC5wb3N0KCk7XHJcbn1cclxuXHJcbnZhciBwb3N0ID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20gPSAkKFwiI3Bvc3RBcnRpY2xlXCIpOyAvL+W6lemDqOWPkeihqOahhlxyXG5cdHRoaXMuY0RvbSA9ICQoXCIjY3JlYXRlQXJ0aWNsZVwiKTsgLy/lvLnlh7rlj5HooajmoYZcclxuXHR0aGlzLnByZXNEb20gPSB0aGlzLnBEb20uZmluZCgnLnBvc3QtcmVzJyk7Ly8vID0gJChcIlwiKVxyXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMuY0RvbS5maW5kKCcucG9wLXJlcycpO1xyXG5cdHRoaXMuY3RpdERvbSA9IHRoaXMuY0RvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHR0aGlzLm1vZGVsID0gJ3Bvc3QnOy8vcG9zdCDlupXpg6ggcG9wIOW8ueWHuueql+WPo1xyXG5cclxuXHR0aGlzLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuY0RvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZihfdGhpcy5pc0VkaXQpe1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5paw5bu65biW5a2QJyk7XHJcblx0XHR9XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0X3RoaXMubW9kZWwgPSAncG9zdCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24oKXtcclxuXHJcbn07XHJcblxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5qC55o2uZG9t6I635Y+W55u45YWz55qE5Y+C5pWwLlxyXG5wb3N0LnByb3RvdHlwZS5nZXRQYXJhbSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG5cdFx0Y29udGVudCA9IHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCk7XHJcblxyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHRpdGxlIDogbmFtZSxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXHJcblx0XHRsYWJlbHMgOiBbXSxcclxuXHRcdHJlc291cmNlIDogdGhpcy5nZXRSZXNMaXN0KClcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJhbTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRpZih0aGlzLmNyZXNEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5jcmVzRG9tLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlmKHRoaXMucHJlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLnByZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHR9XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcclxuXHR0aGlzLmlzRWRpdCA9IHRydWU7XHJcblx0dGhpcy5kYXRhID0gZDtcclxuXHR0aGlzLmNEb20ubW9kYWwoJ3Nob3cnKTtcclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbChkLnRpdGxlKTtcclxuXHR0aGlzLmNEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbChkLmNvbnRlbnQpO1xyXG5cclxuXHRpZihkLnJlc291cmNlTGlzdC5sZW5ndGgpe1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpIGluIGQucmVzb3VyY2VMaXN0KXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBkLnJlc291cmNlTGlzdFtpXTtcclxuXHRcdFx0dGhpcy5yZXNMaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHRcdHRoaXMucmVzTWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdH1cclxuXHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdGxpc3QgOiBkLnJlc291cmNlTGlzdFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG5cdH1cclxufVxyXG5cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHRcclxuXHQvL+i1hOa6kOS4iuS8oOWujOaIkOeahOmAmuefpVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ2VkaXRBcnRpY2xlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMuZWRpdChkKTtcclxuXHR9KTtcclxuXHJcblx0c3RyaWtlci5iaW5kKCd1cGxvYWRBcnRpY2xlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0Y29uc29sZS5sb2coMzMzMyxkKTtcclxuXHRcdGlmKHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93KXtcclxuXHRcdFx0JChzdHJpa2VyKS50cmlnZ2VyKCd1cGxvYWRGaWxlJyxkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5wcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHRoaXMucERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHQkKFwiI2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKF90aGlzLmZpbGV1cGxvYWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHRcdFxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMucERvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHJcblxyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcdFxyXG5cclxuXHRyZXNMaXN0ID0gW107XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdC8vY29uc29sZS5sb2cocFRhcmdldCk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHRoaXMuZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0aWYocGFyYW0udGl0bGUgPT09ICcnIHx8IHBhcmFtLmNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLnN1YmplY3RJZCA9IHRoaXMuZGF0YS5zdWJqZWN0X2lkO1xyXG5cdFx0cGFyYW0uYXJ0aWNsZUlkID0gdGhpcy5kYXRhLmlkO1xyXG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ25ld2FydGljbGUnLHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9XHJcbn1cclxuLy/ph43nva7kuIDkuKpmcm9tXHJcbmFQb3N0LnJlc2V0ID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHR2YXIgcFRhcmdldCA9ICQodGFyZ2V0LmRhdGEoJ3RhcmdldCcpKTtcclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHJlc2V0RnJvbShwVGFyZ2V0KTtcclxufVxyXG5cclxuYVBvc3QucG9zdCA9IHBvc3Q7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ3N1YmplY3QvZWRpdCcsIC8v5L+u5pS55Li76aKYXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydzdWJqZWN0L2NyZWF0ZScsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0J3NldHRvcCcgOiBjZ2lQYXRoKydhcnRpY2xlL3NldFRvcCcsIC8v5pS26JePXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydhcnRpY2xlL2NyZWF0ZSdcclxuXHR9LFxyXG5cdGNvbW1lbnQgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydjb21tZW50L3NlYXJjaCcsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnY29tbWVudC9zdGFyaW5nJyxcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdGVkJyxcclxuXHRcdHN0YXIgOiBjZ2lQYXRoKydjb21tZW50L3N0YXInLFxyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydjb21tZW50L2RlbGV0ZScsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnY29tbWVudC9lZGl0JyxcclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3QnLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnY29tbWVudC9jcmVhdGUnXHJcblx0fSxcclxuXHRub3RpZnkgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydub3RpZmljYXRpb24vc2VhcmNoJyxcclxuXHRcdHJlYWQgOiBjZ2lQYXRoKydub3RpZmljYXRpb24vcmVhZCcsXHJcblx0fSxcclxuXHRsYWJlbCA6IHtcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2xhYmVsL2NyZWF0ZScsXHJcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcclxuXHR9LFxyXG5cdGxvZ2luIDogY2dpUGF0aCsnYWNjb3VudC9sb2dpbicsXHJcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG52YXIgZW1wdHlGdW4gPSBmdW5jdGlvbihyZXMpe1xyXG59XHJcbi8vIC/nu5/kuIDlh7rmnaXlvLnlh7rmtojmga9cclxudmFyIGNoZWNrQ2FsbGJhY2sgPSBmdW5jdGlvbihjYixmbGFnKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNiKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSAhPT0gMCl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9ZWxzZSBpZihmbGFnKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRiLmxvZ2luID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ2luLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubG9nb3V0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dvdXQse30sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0ID0ge307XHJcblxyXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3Quc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvdyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZm9sbG93LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvd2luZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmludml0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmludml0ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxyZXNvdXJjZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuYXJ0aWNsZSA9IHt9O1xyXG5cclxuZGIuYXJ0aWNsZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5hcnRpY2xlLmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlWydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGVbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zZXR0b3AgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnNldHRvcCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQgPSB7fTtcclxuXHJcbmRiLmNvbW1lbnQuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnRbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubm90aWZ5ID0ge307XHJcblxyXG5kYi5ub3RpZnkuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Qubm90aWZ5LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5ub3RpZnkucmVhZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5ub3RpZnkucmVhZCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5sYWJlbCA9IHt9O1xyXG5cclxuZGIubGFiZWwuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIERhdGEgPSB7fTtcclxuLypcclxu5pWw5o2u57yT5a2YXHJcbnVzZXIg55So5oi3XHJcbnN1YmplY3Qg5Li76aKYXHJcbmFydGljbGUg5biW5a2QXHJcbiovXHJcbkRhdGEudXNlciA9IHt9O1xyXG5EYXRhLnN1YmplY3QgPSB7fTtcclxuRGF0YS5hcnRpY2xlID0ge307XHJcbkRhdGEubGFiZWwgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEodHlwZSxrZXkpe1xyXG5cdHJldHVybiBEYXRhW3R5cGVdW2tleV0gfHwgbnVsbDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvZGF0YS9kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+eUqOaIt+WIl+ihqOaYvuekuuetieetiVxyXG52YXIgdU1hbmFnZSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyO1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0bWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVNYW5hZ2U7XHJcblxyXG52YXIgbWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHQvL+e7meWumuWMuuWfn2RvbeeahOWQjeWtl1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIit0YXJnZXQpO1xyXG5cdHRoaXMubWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5cdC8v55So5oi35YiX6KGoXHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5kb20uZmluZCgnLm1hbmFnZS1saXN0Jyk7XHJcblx0dGhpcy5zZWxlY3REb20gPSB0aGlzLmRvbS5maW5kKCcubm93LW1hbmFnZS1saXN0Jyk7XHJcblx0Ly/mkJzntKLmoYZcclxuXHR0aGlzLmtleURvbTtcclxuXHJcblx0Ly/lvZPliY3lhYPntKBcclxuXHR0aGlzLl9zZWxlY3REb207XHJcblxyXG5cdC8v6YCJ5Lit55qE566h55CG5ZGY5YiX6KGoXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0Ly/mioroh6rlt7HmlL7lnKjnrqHnkIblkZjliJfooajph4zpnaJcclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1x0XHJcblxyXG59XHJcblxyXG4vL+WIneWni+WMluS4gOS4iy5cclxubWFuYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbi8v5pi+56S6566h55CG5ZGY5YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+a4heepuuWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5saXN0RG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+mAieS4reS4gOS4queUqOaIt1xyXG5tYW5hZ2UucHJvdG90eXBlLnNlbGVjdG9uZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcclxuXHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRuYW1lIDogbmFtZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0XHR0aGlzLnNlbGVjdERvbS5hcHBlbmQoaHRtbCk7XHRcdFx0XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG4vL+aQnOe0ouaMiemSrlxyXG5tYW5hZ2UucHJvdG90eXBlLnNlYXJjaGJ0biA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGtleSA9IHRoaXMua2V5RG9tLnZhbCgpO1xyXG5cdHZhciBsaXN0ID0gZGF0YS5saXN0O1xyXG5cdHZhciB1bGlzdCA9IFtdO1xyXG5cclxuXHRpZihrZXkgPT09ICcnKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKCdsaScpLnNob3coKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0aWYoaXRlbS5uYW1lLmluZGV4T2Yoa2V5KT49MCl7XHJcblx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMubGlzdERvbS5maW5kKCdsaScpLmhpZGUoKTtcclxuXHRpZih1bGlzdC5sZW5ndGg9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IHVsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKFwiLnVzZXJcIit1bGlzdFtpXSkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuLy/liKDpmaTkuIDkuKrpgInkuK3nmoTnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgnLnRhZycpLFxyXG5cdFx0aWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+S6i+S7tue7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+i+k+WFpeahhueahGtleXVw57uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUua2V5dXBBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5rZXlEb20uYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgna2V5dXAnKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudU1hbmFnZS5tYW5hZ2UgPSBtYW5hZ2U7XHJcbnVNYW5hZ2UuaW5pdCA9IGZ1bmN0aW9uKG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci9tYW5hZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBzTGlzdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5zdWJqZWN0LFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBzTGlzdDtcclxuXHJcbnNMaXN0LmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG5zTGlzdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYil7XHJcblx0Y2dpLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHN0YXJ0LFxyXG5cdFx0bGltaXQgOiBsaW1pdFxyXG5cdH0sY2IpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvL+aLieS4u+mimOWGheWuuVxyXG52YXIgc0luZm8gPSB7fTtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKTtcclxubW9kdWxlLmV4cG9ydHMgPSBzSW5mbztcclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgc3ViRG9tID0gJChcIiNzdWJqZWN0SGVhZFwiKTtcclxudmFyIHN1YkFzaWRlRG9tID0gJChcIiNzdWJqZWN0QXNpZGVcIik7XHJcbnZhciBwb3N0QXJlYSA9ICQoXCIjcG9zdEFydGljbGVcIik7XHJcblxyXG5zSW5mby5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxufVxyXG5cclxuLy/mi4nlj5bkuIDkuKrkuLvpopjnmoTlhoXlrrlcclxuLy8gc0luZm8uaW5mbyA9IGZ1bmN0aW9uKGlkLGNiKXtcclxuLy8gXHRjZ2kuaW5mbyh7aWQ6aWR9LGZ1bmN0aW9uKHJlcyl7XHJcbi8vIFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcbi8vIFx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcclxuLy8gXHRcdFx0c3ViRG9tLmh0bWwoaHRtbCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fSlcclxuLy8gfVxyXG5cclxudmFyIGluZm8gPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5zaWQgPSBpZDtcclxuXHR0aGlzLmRvbSA9IHN1YkRvbTtcclxuXHR0aGlzLmFzaWRlRG9tID0gc3ViQXNpZGVEb207XHJcblx0dGhpcy5nZXREYXRhKCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5mb2xsb3dCdG47IC8v5YWz5rOo5oyJ6ZKuXHJcblx0dGhpcy5tYW5hZ2VCdG47IC8v566h55CG5oyJ6ZKuXHJcblx0dGhpcy50aW1lQnRuOyAgIC8v5oyJ5pe26Ze05o6S5bqPXHJcblx0dGhpcy51cGRhdGVCdG47IC8v5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLl9zZWxlY3REb207XHJcblx0dGhpcy5tc2cgPSB3aW5kb3cuc3RyaWtlci5tc2c7XHJcbn1cclxuXHJcbnNJbmZvLmluZm8gPSBpbmZvO1xyXG5cclxuLy/liKDpmaTkuLvpopjnm7jlhbPotYTmupBcclxuaW5mby5wcm90b3R5cGUuZGVsZXRlUmVzb3VyY2UgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpei1hOa6kD8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdHN1YmplY3RJZCA6IF90aGlzLnNpZCxcclxuXHRcdFx0XHRyZXNvdXJjZUlkIDogaWRcclxuXHRcdFx0fVxyXG5cdFx0XHRjZ2kuZGVscmVzb3VyY2UocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLnN1Yi1yZXNvdXJjZS1cIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufTtcclxuXHJcbi8v5oqK5YW25LuW55qE5a+56LGh55qE5byV55So5Lyg6L+b5p2lLlxyXG5pbmZvLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLnBvc3QgPSBvYmoucG9zdDtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUubWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBvc3QuZWRpdCh0aGlzLmRhdGEpO1xyXG59XHJcblxyXG4vL+mihOiniOS4u+mimOebuOWFs+i1hOa6kFxyXG5pbmZvLnByb3RvdHlwZS5yZXZpZXcgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ3Jldmlldycse1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRsaXN0IDogdGhpcy5kYXRhLnJlc291cmNlTGlzdFxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5pbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnc3ViamVjdFVwZGF0ZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmRhdGEgPSBkO1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQoZCk7XHJcblx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHJcblx0XHRyZXMuZGF0YS5teSA9IGRhdGEudXNlci5teUluZm87XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUoZCk7XHJcblx0XHRcclxuXHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHRcdFx0XHJcblx0fSk7XHJcblxyXG5cdFxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5hc2lkZURvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcdFx0XHJcbn1cclxuXHJcbi8v5ouJ5Y2V5Liq5biW5a2QXHJcbmluZm8ucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMuc2lkO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0cmVzLmRhdGEubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRfdGhpcy5mb2xsb3dCdG4gPSBfdGhpcy5kb20uZmluZCgnLmZvbGxvdy1idG4nKTtcclxuXHRcdFx0X3RoaXMubWFuYWdlQnRuID0gX3RoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtYnRuJylcclxuXHRcdFx0X3RoaXMudGltZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudGltZS1idG4nKVxyXG5cdFx0XHRfdGhpcy51cGRhdGVCdG4gPSBfdGhpcy5kb20uZmluZCgnLnVwZGF0ZS1idG4nKVxyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxuLy/lhbPms6jljZXkuKrluJblrZBcclxuaW5mby5wcm90b3R5cGUuZm9sbG93ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnNpZFxyXG5cdFx0Zm9sbG93ID0gMTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHQvL+WIpOaWreaYr+WQpuW3sue7j2ZvbGxvd+S6hi5cclxuXHRpZih0aGlzLmZvbGxvd0J0bi5oYXNDbGFzcygnZm9sbG93ZWQnKSl7XHJcblx0XHRmb2xsb3cgPSAwO1xyXG5cdH1cclxuXHJcblx0Y2dpLmZvbGxvdyh7c3ViamVjdElkOmlkLGlzRm9sbG93OmZvbGxvd30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0aWYoZm9sbG93KXtcclxuXHRcdFx0XHRfdGhpcy5mb2xsb3dCdG4uYWRkQ2xhc3MoJ2ZvbGxvd2VkJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+5bey5YWz5rOoJyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5yZW1vdmVDbGFzcygnZm9sbG93ZWQnKS5odG1sKCc8c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lhbPms6gnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvL+S4u+mimOWIm+W7uizliKDpmaTnrYnmk43kvZxcclxudmFyIGRhdGE7XHJcbnZhciBzQ3JlYXRlID0ge307XHJcbnZhciBjZ2ksXHJcblx0dG1wbDtcclxubW9kdWxlLmV4cG9ydHMgPSBzQ3JlYXRlO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxuc0NyZWF0ZS5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUgPSBmdW5jdGlvbihpZCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dGhpcy5zdWJJZCA9IGlkO1xyXG5cclxuXHQvL+m7mOiupOS9v+eUqOaIkeeahOS4u+mimFxyXG5cdHRoaXMudHlwZSA9ICdteVN1YmplY3QnO1xyXG5cdHRoaXMuaXNlZGl0ID0gZmFsc2U7XHJcblx0dGhpcy5lZGl0RGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHJcblx0Ly/ov5nph4zogIPomZHkuIvopoHkuI3opoHkvKDlj4LmjIflrppkb207XHJcblx0dGhpcy5kb20gPSAkKFwiI2NyZWF0ZVN1YmplY3RcIik7XHJcblx0dGhpcy50aXRsZURvbSA9IHRoaXMuZG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdFxyXG5cdC8v5Zu65a6a55qEaWRcclxuXHR0aGlzLnJlc0RvbSA9ICQoXCIjbm93UmVzXCIpO1xyXG5cclxuXHQvL+aKiueUqOaIt+WIl+ihqOWTquWEv+WIm+W7uuS4gOS4iy5cclxuXHQvL2NvbnNvbGUubG9nKHN0cmlrZXIudXNlcik7XHRcclxuXHR2YXIgbWFuYWdlID0gbmV3IHdpbmRvdy5zdHJpa2VyLnVzZXIubWFuYWdlKCdtYW5hZ2VBcmVhJyk7XHJcblx0dGhpcy5tYW5hZ2UgPSBtYW5hZ2U7XHJcblx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cclxuXHR0aGlzLmRvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcclxuXHRcdF90aGlzLnRpdGxlRG9tLnRleHQoJ+aWsOW7uuW4luWtkCcpO1xyXG5cdFx0bWFuYWdlLmluaXQoKTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly9zdHJpa2VyLnVzZXIuYWRkRGVmTWFuYWdlKCk7XHJcblx0XHRfdGhpcy5yZXNEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cdFx0X3RoaXMubWFuYWdlLmNsZWFyKCk7XHJcblx0XHRfdGhpcy5sYWJlbC5jbGVhcigpO1xyXG5cdFx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcclxuXHR9KTtcdFxyXG5cclxuXHQvL+i1hOa6kOWIl+ihqFxyXG5cdHRoaXMucmVzTGlzdCA9IFtdLFxyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdC8v5b2T5YmN6KKr6YCJ5Lit55qE5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmNoYW5nZVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcclxuXHR0aGlzLnR5cGUgPSAndHlwZSdcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHQvL3RoaXMudHlwZSA9ICd0eXBlJztcclxuXHR0aGlzLnRpdGxlRG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xyXG5cdCQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbChkYXRhLnRpdGxlKSxcclxuXHQkKFwiI3N1YmplY3RNYXJrXCIpLnZhbChkYXRhLm1hcmspLFxyXG5cdCQoXCIjc3ViamVjdE9wZW5cIikucHJvcCgnY2hlY2tlZCcsZGF0YS5wcml2YXRlKTtcclxuXHQkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyxkYXRhLmd1ZXN0KTtcclxuXHR0aGlzLmVkaXREYXRhID0gZGF0YTtcclxuXHJcblx0Ly/miornrqHnkIblkZjmmL7npLrlh7rmnaUs6LKM5Ly85pWw5o2u5LiN5pSv5oyBP1xyXG5cdHRoaXMuaXNlZGl0ID0gdHJ1ZTtcclxuXHJcblx0Ly/miormoIfnrb7mmL7npLrlh7rmnaVcclxuXHR0aGlzLmxhYmVsLnNob3dFZGl0KGRhdGEubGFiZWxzKTtcclxuXHJcblx0Ly/miorotYTmupDliqDov5vmnaVcclxuXHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0bGlzdCA6IGRhdGEucmVzb3VyY2VMaXN0XHJcblx0fSk7XHJcblx0dGhpcy5yZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG59XHJcblxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKHRoaXMucmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHR0aGlzLnJlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+WPlumAieS4reeahOagh+etvlxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5sYWJlbC5nZXRMYWJlbExpc3QoKTtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTnrqHnkIbov5xcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLm1hbmFnZS5nZXRNYW5hZ2VMaXN0KCk7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24ocGFyYW0sY2Ipe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcclxuXHRcdGlmKF90aGlzLnN1YklkICYmICFfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3VwbG9hZEFydGljbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblxyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdF90aGlzLnJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Ly/op6blj5HkuIrkvKBcclxuXHQkKFwiI2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZSA9IHRhcmdldC5kYXRhKCd0eXBlJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGUgPT09ICdzdWJtaXQnKXtcclxuXHRcdFx0dmFyIHRpdCA9ICQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG1hcmsgPSAkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG9wZW4gPSAkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnKT8xOjAsXHJcblx0XHRcdFx0Z3Vlc3QgPSAkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyk/MTowO1xyXG5cclxuXHRcdFx0aWYodGl0ID09ICcnKXtcclxuXHRcdFx0XHRhbGVydCgn6L+Y5rKh5pyJ5aGr5YaZ5qCH6aKYJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0dGl0bGUgOiB0aXQsXHJcblx0XHRcdFx0bWFyayA6IG1hcmssXHJcblx0XHRcdFx0cHJpdmF0ZSA6IG9wZW4sXHJcblx0XHRcdFx0Z3Vlc3QgOiBndWVzdCxcclxuXHRcdFx0XHRtZW1iZXJzIDogX3RoaXMuZ2V0TWFuYWdlTGlzdCgpLFxyXG5cdFx0XHRcdHN1YmplY3RMYWJlbHMgOiBfdGhpcy5nZXRMYWJlbExpc3QoKSxcclxuXHRcdFx0XHRhcnRpY2xlTGFiZWxzIDogW10sXHJcblx0XHRcdFx0cmVzb3VyY2VzIDogX3RoaXMuZ2V0UmVzTGlzdCgpXHJcblx0XHRcdH1cdFx0XHJcblx0XHRcdFxyXG5cdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRcdHBhcmFtLnN1YmplY3RJZCA9IF90aGlzLmVkaXREYXRhLmlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocGFyYW0udGl0bGUgIT09ICcnICYmIHBhcmFtLm1hcmsgIT09ICcnKXtcclxuXHRcdFx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0XHRcdGlmKF90aGlzLmlzZWRpdCl7XHJcblx0XHRcdFx0XHRjZ2kuZWRpdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuZG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3ViamVjdFVwZGF0ZScscmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGlzdCA6IFtyZXMuZGF0YV1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RDcmVhdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0JChcIiNteVN1YmplY3RcIikucHJlcGVuZChodG1sKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFMaXN0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9yZXR1cm4gbmV3IGFydGljbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJ0aWNsZSgpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuc3ViaWQgPSBub3dTdWJJZDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0dGhpcy5yZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLnNlYXJjaCgpO1xyXG59XHJcblxyXG4vL+aKiuWbnuWkjeebuOWFs+eahOS4nOS4nOe7keWumui/m+adpVxyXG5hcnRpY2xlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmNvbW1lbnRQb3N0ID0gb2JqLnBvc3Q7XHJcbn1cclxuXHJcbi8v6K6h566X5Zu+54mH55qE5Liq5pWwXHJcbmFydGljbGUucHJvdG90eXBlLmdldGltZyA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBudW0gPSAwO1xyXG5cdGlmKGRhdGEpe1xyXG5cdFx0Zm9yKHZhciBpID0wLGw9ZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdHZhciBpdGVtID0gZGF0YVtpXTtcclxuXHRcdFx0aWYoaXRlbS50eXBlID09PSAxKXtcclxuXHRcdFx0XHRudW0rKztcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbnVtO1xyXG59XHJcblxyXG4vL+e7keWumuS6i+S7tlxyXG5hcnRpY2xlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnbmV3YXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLnByZXBlbmRUb0xpc3QoZCk7XHJcblx0fSlcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSkgICAgXHJcbn1cclxuXHJcbi8v5Yqg6L295pu05aSaXHJcbmFydGljbGUucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcgfHwgdGhpcy5lbmQpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0b3JkZXJieSA6ICdjcmVhdGVUaW1lJ1xyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5jaGVja0RhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSA9IDAsbD1kYXRhLmxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHRpdGVtLmltZ251bSA9IHRoaXMuZ2V0aW1nKGl0ZW0ucmVzb3VyY2UpO1xyXG5cdFx0dGhpcy5yZGF0YVtpdGVtLmlkXSA9IGl0ZW0ucmVzb3VyY2U7XHJcblx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0fVxyXG5cdGRhdGEubGlzdCA9IGxpc3Q7XHJcblx0ZGF0YS5zaWQgPSBub3dTdWJJZDtcclxuXHRyZXR1cm4gZGF0YTtcclxufVxyXG5cclxuLy/mi4nluJblrZDliJfooahcclxuYXJ0aWNsZS5wcm90b3R5cGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRpZighcGFyYW0pe1xyXG5cdFx0cGFyYW0gPSB7XHJcblx0XHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0XHRvcmRlcmJ5IDogJ2NyZWF0ZVRpbWUnXHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRjZ2kuc2VhcmNoKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMudG90YWwgPSByZXMuZGF0YS50b3RhbDtcclxuXHRcdFx0X3RoaXMubGVuZ3RoICs9IHJlcy5kYXRhLmxpc3QubGVuZ3RoO1xyXG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5jaGVja0RhdGEocmVzLmRhdGEpO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChkYXRhKTtcclxuXHJcblx0XHRcdGlmKHJlcy5kYXRhLnRvcC5sZW5ndGgpe1xyXG5cdFx0XHRcdHZhciBodG1sMSA9IHRtcGwudG9wKHtcclxuXHRcdFx0XHRcdGxpc3QgOiByZXMuZGF0YS50b3BcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHRcdCQoXCIjYXJ0aWNsZVRvcFwiKS5odG1sKGh0bWwxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHRpZihfdGhpcy5sZW5ndGggPj0gX3RoaXMudG90YWwpe1xyXG5cdFx0XHRcdF90aGlzLmVuZCA9IHRydWU7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRhcnRpY2xlSWQgOiBpZCxcclxuXHRcdFx0aXNTdGFyIDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+i1nic6J+W3sui1nic7XHJcblx0XHRjZ2kuc3RhcihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNTdGFyKTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRhcnRpY2xlSWQgOiBpZFxyXG5cdFx0fTtcclxuXHRcdGNnaS5jb2xsZWN0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uYXR0cignZGF0YS1pZCcsMCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeW4luWtkD8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdGFydGljbGVJZCA6IGlkXHJcblx0XHRcdH07XHJcblx0XHRcdGNnaVsnZGVsZXRlJ10ocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLmFydGljbGVcIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdHRoaXMuY29tbWVudFBvc3Quc2hvd1Bvc3QoaWQpO1xyXG5cdH1cclxufVxyXG5cclxuLy/miormlrDlj5HluIPnmoTluJblrZDliqDliLDliJfooajmnIDliY3pnaJcclxuYXJ0aWNsZS5wcm90b3R5cGUucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcGFyYW1dfSk7XHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuYXJ0aWNsZS5wcm90b3R5cGUucmV2aWV3ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGlkID0gdGFyZ2V0LmRhdGEoJ3BpZCcpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdyZXZpZXcnLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMucmRhdGFbcGlkXVxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG4vL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxyXG5hTGlzdC5wcmVwZW5kVG9MaXN0ID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3BhcmFtXX0pO1xyXG5cdFx0bGlzdERvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG5hTGlzdC5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHJcbi8v5Yqg6L295pu05aSa5pWw5o2uXHJcbi8qXHJcbmFMaXN0LmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZyh0aGlzLmVuZCk7XHJcblx0aWYobG9hZGluZyB8fCB0aGlzLmVuZCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGFMaXN0LnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHN0YXJ0LFxyXG5cdFx0bGltaXQgOiBsaW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkXHJcblx0fSlcclxufVxyXG5cclxuXHJcblxyXG4vL+aQnOe0ouaVsOaNrlxyXG5hTGlzdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0bG9hZGluZyA9IHRydWU7XHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy50b3RhbCA9IHJlcy50b3RhbDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRzdGFydCArPSBsaW1pdDtcclxuXHRcdFx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRsaXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdH1lbHNle1xyXG5cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn1cclxuKi9cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsImZ1bmN0aW9uIGVtcHR5RnVuKHJlcyl7XHJcblx0Y29uc29sZS5sb2cocmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnUE9TVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXgob3B0LGNhbGxiYWNrLGVycm9yKXtcclxuXHR2YXIgdHlwZSA9IG9wdC50eXBlIHx8ICdHRVQnLFxyXG5cdFx0dXJsID0gb3B0LnVybCxcclxuXHRcdGRhdGEgPSBvcHQuZGF0YTtcclxuXHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZSA6IHR5cGUsXHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPjwlLW5hbWUlPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSBpbiBsaXN0KXtcXHJcXG5cdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG5cdHZhciBvYmogPSBKU09OLnBhcnNlKGl0ZW0ud2l0aERhdGEpO1xcclxcblx0Y29uc29sZS5sb2cob2JqKTtcXHJcXG4lPlxcclxcbjxsaSB0aXRsZT1cIjwlLWl0ZW0ubWVzc2FnZSU+XCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLW9iai5hcnRpY2xlSWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLXJlYWQ9XCI8JS1pdGVtLnJlYWQlPlwiPjwlLWl0ZW0ubWVzc2FnZSU+PC9hPjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ubWVzc2FnZSksICdcIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNywgb2JqLmFydGljbGVJZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5pZCksICdcIiBkYXRhLXJlYWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnJlYWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZXNzYWdlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiBcIlwiLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPGxpIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPlxcclxcbjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksIFwiXFxuPC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWwnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+PCUtcHJvVGV4dCU+PC9zcGFuPlxcclxcbiAgICAgICAgPCVpZihwcm9UZXh0PT09XFwn5oiR5Yib5bu655qEXFwnKXslPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XFxyXFxuICAgICAgICDlhbE8c3BhbiBpZD1cIjwlLXByb05hbWUlPk51bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICBcXHJcXG4gICAgPC9oZWFkZXI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIjwlLXByb05hbWUlPlwiPlxcclxcbiAgICAgICAgICAgICAgICAgXFxyXFxuICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyLXRvcFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGVmdFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmdWktdXNlclwiPicsIChfX3N0YWNrLmxpbmVubyA9IDMsIHByb1RleHQpLCBcIjwvc3Bhbj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb1RleHQgPT09IFwi5oiR5Yib5bu655qEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcbiAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cXG4gICAgICAgIOWFsTxzcGFuIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIHByb05hbWUpLCAnTnVtXCI+MjA8L3NwYW4+5Liq5Li76aKYIDxhIGNsYXNzPVwicHJlLXBhZ2VcIiBkYXRhLWFjdGlvbj1cInByZVwiPuS4iuS4gOmhtTwvYT4gPGEgY2xhc3M9XCJuZXh0LXBhZ2VcIiBkYXRhLWFjdGlvbj1cIm5leHRcIj7kuIvkuIDpobU8L2E+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHRpbWUgYWN0aXZlXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlXCIgIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1kb3duXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgIFxcbiAgICA8L2hlYWRlcj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlzdFwiIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTksIHByb05hbWUpLCAnXCI+XFxuICAgICAgICAgICAgICAgICBcXG4gICAgPC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9zaXplLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgPCVcXHJcXG4gICAgXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgIFx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAgICU+XFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD7liJvlu7rkurogPCUtaXRlbS5jcmVhdG9yTmFtZSU+IOWIm+W7uuaXtumXtCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLmNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0udXBkYXRlVGltZSklPiDkuLvpopjotYTmupAgPCUtaXRlbS5yZXNvdXJjZUNvdW50JT4gPCUtaXRlbS5tZW1iZXJDb3VudCU+5Liq5oiQ5ZGYIDwlLWl0ZW0udXBkYXRvciU+5Liq5biW5a2QIDwlLWl0ZW0ucmVzb3VyY2VDb3VudCU+5Liq6LWE5rqQPC9kZD5cXHJcXG4gICAgICA8L2RsPiBcXHJcXG4gICAgPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnQtbGlzdFwiPlxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCIvaW5mby5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0uaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+5Yib5bu65Lq6IFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgXCIg5Yib5bu65pe26Ze0IFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLmNyZWF0ZVRpbWUpKSwgXCIg5pyA6L+R5pu05pawIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgXCIg5Li76aKY6LWE5rqQIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnJlc291cmNlQ291bnQpLCBcIiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZW1iZXJDb3VudCksIFwi5Liq5oiQ5ZGYIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnVwZGF0b3IpLCBcIuS4quW4luWtkCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5yZXNvdXJjZUNvdW50KSwgXCLkuKrotYTmupA8L2RkPlxcbiAgICAgIDwvZGw+IFxcbiAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICAgIDxkdD48JS10aXRsZSU+PC9kdD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7liJvlu7rkurogPCUtY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoY3JlYXRlVGltZSklPiDmnIDov5Hmm7TmlrAgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSklPjwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Li76aKY6LWE5rqQIDwlLXN1YmplY3RSZXNvdXJjZUNvdW50JT4gPCUtbWVtYmVyQ291bnQlPuS4quaIkOWRmCA8JS1hcnRpY2xlQ291bnQlPuS4quW4luWtkCA8JS1hcnRpY2xlUmVzb3VyY2VDb3VudCU+5Liq6LWE5rqQIOaIkeeahOWPkeW4li/lm57lpI0gPCUtYXJ0aWNsZUNyZWF0ZUNvdW50JT4vMTI8L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWFjdC1idG5cIj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlQXJ0aWNsZVwiPjxzcGFuIGNsYXNzPVwicG9zdFwiPjwvc3Bhbj7lj5HluJY8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuIDwlaWYoZm9sbG93KXslPmZvbGxvd2VkPCV9JT5cIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPjwlaWYoZm9sbG93KXslPuW3suWFs+azqDwlfWVsc2V7JT7lhbPms6g8JX0lPjwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcclxcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInNlbGVjdDItY2hvaWNlXCIgdGFiaW5kZXg9XCItMVwiPiAgIFxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWNob3NlblwiIGlkPVwic2VsZWN0Mi1jaG9zZW4tMlwiPuaMieW4luWtkOagh+etvuetm+mAiTwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgIDxhYmJyIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2gtY2hvaWNlLWNsb3NlXCI+PC9hYmJyPiBcXHJcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9iPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8L2E+PGxhYmVsIGZvcj1cInMyaWRfYXV0b2dlbjJcIiBjbGFzcz1cInNlbGVjdDItb2Zmc2NyZWVuXCI+PC9sYWJlbD48aW5wdXQgY2xhc3M9XCJzZWxlY3QyLWZvY3Vzc2VyIHNlbGVjdDItb2Zmc2NyZWVuXCIgdHlwZT1cInRleHRcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsbGVkYnk9XCJzZWxlY3QyLWNob3Nlbi0yXCIgaWQ9XCJzMmlkX2F1dG9nZW4yXCI+PC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXHJcXG4gICAgICAgICAgPCEtLeiHquWKqOWIt+aWsDogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYWN0aW9uPVwic3ViamVjdC5hdXRvcmVmcmVzaFwiIC8+LS0+XFxyXFxuICAgICAgICAgIDxhIGhyZWY9XCIvaW5kZXguaHRtbFwiPui/lOWbnjwvYT5cXHJcXG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoIGJvb3RzdHJhcC1zd2l0Y2gtd3JhcHBlciBib290c3RyYXAtc3dpdGNoLWFuaW1hdGUgYm9vdHN0cmFwLXN3aXRjaC1pZC1jdXN0b20tc3dpdGNoLTAxIGJvb3RzdHJhcC1zd2l0Y2gtb2ZmXCI+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtY29udGFpbmVyXCI+XFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9uIGJvb3RzdHJhcC1zd2l0Y2gtcHJpbWFyeVwiPk9OPC9zcGFuPjxsYWJlbCBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtbGFiZWxcIj4mbmJzcDs8L2xhYmVsPjxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb2ZmIGJvb3RzdHJhcC1zd2l0Y2gtZGVmYXVsdFwiPk9GRjwvc3Bhbj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cIlwiIGRhdGEtdG9nZ2xlPVwic3dpdGNoXCIgaWQ9XCJjdXN0b20tc3dpdGNoLTAxXCI+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgLS0+XFxyXFxuICAgICAgICA8L2RkPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgICAgIDxkdD5cIiwgKF9fc3RhY2subGluZW5vID0gMSwgdGl0bGUpLCAnPC9kdD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7liJvlu7rkurogJywgKF9fc3RhY2subGluZW5vID0gMiwgY3JlYXRvck5hbWUpLCBcIiDliJvlu7rml7bpl7QgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGNyZWF0ZVRpbWUpKSwgXCIg5pyA6L+R5pu05pawIFwiLCAoX19zdGFjay5saW5lbm8gPSAyLCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZSh1cGRhdGVUaW1lKSksICc8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuS4u+mimOi1hOa6kCAnLCAoX19zdGFjay5saW5lbm8gPSAzLCBzdWJqZWN0UmVzb3VyY2VDb3VudCksIFwiIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBtZW1iZXJDb3VudCksIFwi5Liq5oiQ5ZGYIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBhcnRpY2xlQ291bnQpLCBcIuS4quW4luWtkCBcIiwgKF9fc3RhY2subGluZW5vID0gMywgYXJ0aWNsZVJlc291cmNlQ291bnQpLCBcIuS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBhcnRpY2xlQ3JlYXRlQ291bnQpLCAnLzEyPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZUFydGljbGVcIj48c3BhbiBjbGFzcz1cInBvc3RcIj48L3NwYW4+5Y+R5biWPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZm9sbG93LWJ0biAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGxvdykge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcImZvbGxvd2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey5YWz5rOoXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInNlbGVjdDItY2hvaWNlXCIgdGFiaW5kZXg9XCItMVwiPiAgIFxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWNob3NlblwiIGlkPVwic2VsZWN0Mi1jaG9zZW4tMlwiPuaMieW4luWtkOagh+etvuetm+mAiTwvc3Bhbj5cXG4gICAgICAgICAgICAgIDxhYmJyIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2gtY2hvaWNlLWNsb3NlXCI+PC9hYmJyPiBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9iPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L2E+PGxhYmVsIGZvcj1cInMyaWRfYXV0b2dlbjJcIiBjbGFzcz1cInNlbGVjdDItb2Zmc2NyZWVuXCI+PC9sYWJlbD48aW5wdXQgY2xhc3M9XCJzZWxlY3QyLWZvY3Vzc2VyIHNlbGVjdDItb2Zmc2NyZWVuXCIgdHlwZT1cInRleHRcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsbGVkYnk9XCJzZWxlY3QyLWNob3Nlbi0yXCIgaWQ9XCJzMmlkX2F1dG9nZW4yXCI+PC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXG4gICAgICAgICAgPCEtLeiHquWKqOWIt+aWsDogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYWN0aW9uPVwic3ViamVjdC5hdXRvcmVmcmVzaFwiIC8+LS0+XFxuICAgICAgICAgIDxhIGhyZWY9XCIvaW5kZXguaHRtbFwiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoIGJvb3RzdHJhcC1zd2l0Y2gtd3JhcHBlciBib290c3RyYXAtc3dpdGNoLWFuaW1hdGUgYm9vdHN0cmFwLXN3aXRjaC1pZC1jdXN0b20tc3dpdGNoLTAxIGJvb3RzdHJhcC1zd2l0Y2gtb2ZmXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtY29udGFpbmVyXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9uIGJvb3RzdHJhcC1zd2l0Y2gtcHJpbWFyeVwiPk9OPC9zcGFuPjxsYWJlbCBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtbGFiZWxcIj4mbmJzcDs8L2xhYmVsPjxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb2ZmIGJvb3RzdHJhcC1zd2l0Y2gtZGVmYXVsdFwiPk9GRjwvc3Bhbj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cIlwiIGRhdGEtdG9nZ2xlPVwic3dpdGNoXCIgaWQ9XCJjdXN0b20tc3dpdGNoLTAxXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgLS0+XFxuICAgICAgICA8L2RkPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3QvaGVhZC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8bmF2IGNsYXNzPVwiYnRuLXRvb2xiYXJcIj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZVwiPui1hOa6kCA8JS1zdWJqZWN0UmVzb3VyY2VDb3VudCU+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6IDwlLW1lbWJlckNvdW50JT48L3NwYW4+XFxyXFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj7nu5/orqE8L3NwYW4+XFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9uYXY+XFxyXFxuXFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWFzaWRlLWltZ1wiPlxcclxcbiAgICAgICAgICA8IS0tXFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlb1wiPlxcclxcbiAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMjAwXCIgc3JjPVwiaHR0cDovL2ltZ3NyYy5iYWlkdS5jb20vZm9ydW0vdyUzRDU4MC9zaWduPTNiOTVjZWM3MGMzMzg3NDQ5Y2M1MmY3NDYxMGVkOTM3L2YwNzRkMGZjMWUxNzhhODI3NGIwZWYzN2Y2MDM3MzhkYTg3N2U4NjguanBnXCIgLz5cXHJcXG4gICAgICAgICAgICDpooTop4ggIOagh+azqCDkuIvovb0gIOWIoOmZpFxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgLS0+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWctbGlzdFwiPlxcclxcbiAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gcmVzb3VyY2VMaXN0KXtcXHJcXG4gICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzb3VyY2VMaXN0W2ldO1xcclxcbiAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1yZXNvdXJjZS08JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgICAgICAgICA8JWlmKGl0ZW0udHlwZSA9PT0gMSl7JT5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWl0ZW0uaWQlPlwiIHRpdGxlPVwiPCUtaXRlbS5uYW1lJT5cIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxyXFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaXRlbS5pZCU+XCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxyXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcclxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxyXFxuICAgICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICAgIDwlfWVsc2UgaWYoaXRlbS50eXBlID09PSA0IHx8IGl0ZW0udHlwZSA9PT0zKXslPlxcclxcbiAgICAgICAgICAgICAgPHZpZGVvIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiBjb250cm9scz1cImNvbnRyb2xzXCI+XFxyXFxuICAgICAgICAgICAgICDmgqjnmoTmtY/op4jlmajkuI3mlK/mjIEgdmlkZW8g5qCH562+44CCXFxyXFxuICAgICAgICAgICAgICA8L3ZpZGVvPlxcclxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPCV9ZWxzZXslPlxcclxcbiAgICAgICAgICAgICAgPHA+PCUtaXRlbS5uYW1lJT48L3A+XFxyXFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pdGVtLmlkJT5cIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxyXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcclxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxyXFxuICAgICAgICAgICAgICA8JX0lPiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgJzwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPue7n+iuoTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L25hdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtYXNpZGUtaW1nXCI+XFxuICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCI+XFxuICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyMDBcIiBzcmM9XCJodHRwOi8vaW1nc3JjLmJhaWR1LmNvbS9mb3J1bS93JTNENTgwL3NpZ249M2I5NWNlYzcwYzMzODc0NDljYzUyZjc0NjEwZWQ5MzcvZjA3NGQwZmMxZTE3OGE4Mjc0YjBlZjM3ZjYwMzczOGRhODc3ZTg2OC5qcGdcIiAvPlxcbiAgICAgICAgICAgIOmihOiniCAg5qCH5rOoIOS4i+i9vSAg5Yig6ZmkXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAtLT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1saXN0XCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlc291cmNlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtJywgKF9fc3RhY2subGluZW5vID0gMjEsIGl0ZW0uaWQpLCAnXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0ubmFtZSksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDQgfHwgaXRlbS50eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICA8dmlkZW8gc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDI5LCBpdGVtLmlkKSwgJ1wiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5cXG4gICAgICAgICAgICAgIOaCqOeahOa1j+iniOWZqOS4jeaUr+aMgSB2aWRlbyDmoIfnrb7jgIJcXG4gICAgICAgICAgICAgIDwvdmlkZW8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDM0LCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHA+XCIsIChfX3N0YWNrLmxpbmVubyA9IDM3LCBpdGVtLm5hbWUpLCAnPC9wPlxcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzgsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQwLCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0MjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9hc2lkZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdFx0PCUtaXRlbS5uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVJlc1wiPjwvc3Bhbj5cXHJcXG5cdDwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuXHRcdCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVJlc1wiPjwvc3Bhbj5cXG5cdDwvc3Bhbj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDM3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGU8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3IlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+JnNpZD08JS1pdGVtLnN1YmplY3RfaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5pbWdudW0+MCl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiIGRhdGEtcGlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLW9iai5pZCU+XCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksIFwiJnNpZD1cIiwgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uc3ViamVjdF9pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIGRhdGEtcGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDI2LCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsVwiLCAoX19zdGFjay5saW5lbm8gPSAzMSwgaXRlbS5pbWdudW0pLCBcIuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9IDA7aTxsaXN0Lmxlbmd0aDtpKyspe1xcclxcbnZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaT48c3BhbiBjbGFzcz1cImZ1aS1oZWFydFwiPjwvc3Bhbj7nva7pobbvvJo8YSBocmVmPVwiL2FydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiaW5kZXguanMifQ==