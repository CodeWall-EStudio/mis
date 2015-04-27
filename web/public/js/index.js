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
		subject = __webpack_require__(12),
		article = __webpack_require__(13),
		msg = __webpack_require__(7),
		notify = __webpack_require__(8),
		label = __webpack_require__(10);
	
	
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

	var cgi = __webpack_require__(15).user,
		logout = __webpack_require__(15).logout,
		data = __webpack_require__(16).user,
		userManage = __webpack_require__(17),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(32),
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
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(16),
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
	
	var cgi = __webpack_require__(15).article;
	var tmpl = {
		list : __webpack_require__(30),
		rlist : __webpack_require__(37)   //资源列表
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
/* 5 */,
/* 6 */,
/* 7 */
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	//通知
	var notify = {},
		data = __webpack_require__(16).notify,
		cgi = __webpack_require__(15).notify;
	
	var tmpl = {
		list : __webpack_require__(35),
		one : __webpack_require__(36)   //资源列表
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
/* 9 */,
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(15).label,
		data = __webpack_require__(16).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(48),
		one : __webpack_require__(49)
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
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//主题
	var cgi = __webpack_require__(15).subject,
		subjectList = __webpack_require__(22),
		subjectInfo = __webpack_require__(23),
		subjectCreate = __webpack_require__(24);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(44),
		manage : __webpack_require__(33), //管理员
		list : __webpack_require__(45),  //主题列表
		head : __webpack_require__(46),  //主题详情头部
		onemanage : __webpack_require__(34), //单个管理员
		aside : __webpack_require__(47),  //主题详情右边资源列表
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(15).article;
	var tmpl = {
		list : __webpack_require__(30),
		top : __webpack_require__(31),
		rlist : __webpack_require__(37)   //资源列表
	};
	
	var articleList = __webpack_require__(25),
		articlePost = __webpack_require__(4);
	
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
/* 14 */,
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(28),
		message = __webpack_require__(7);
	
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(16).user;
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
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(16).subject,
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
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl,
		data = __webpack_require__(16);
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
/* 24 */
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(16),
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
		this.orderby = 'createTime';
	
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
	
		striker.bind('article:orderbyupdate',function(e,d){
			_this.orderByUpdate();
		})
	
		striker.bind('article:orderbycreate',function(e,d){
			_this.orderByCreate();
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
				orderby : this.orderby
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
	
	aList.article = article;

/***/ },
/* 26 */,
/* 27 */,
/* 28 */
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
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updatorName%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            var imgnum = 0;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n                if(imgnum>2){\r\n                  break;\r\n                }\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" />\r\n              <%\r\n                imgnum++;\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                        var imgnum = 0;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                if (imgnum > 2) {
	                                    break;
	                                }
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 30, obj.id), '" data-pid="', (__stack.lineno = 30, item.id), '" data-id="', (__stack.lineno = 30, obj.id), '" data-action="review" />\n              ');
	                                __stack.lineno = 31;
	                                imgnum++;
	                                if (first) {
	                                    first = false;
	                                    buf.push("\n              <span>共", (__stack.lineno = 36, item.imgnum), "张</span>\n              ");
	                                    __stack.lineno = 37;
	                                }
	                                buf.push("\n            </div>\n          ");
	                                __stack.lineno = 39;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 41;
	                    }
	                    buf.push("\n    </div>\n  </div>\n");
	                    __stack.lineno = 44;
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
/* 32 */
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
/* 36 */
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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */
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
/* 45 */
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12</dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <!--\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a>\r\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\r\n          <a href="/index.html">返回</a>\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
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
	                buf.push("        <dt>", (__stack.lineno = 1, title), '</dt>\n        <dd class="artice-use">创建人 ', (__stack.lineno = 2, creatorName), " 创建时间 ", (__stack.lineno = 2, striker.util.formatTime(createTime)), " 最近更新 ", (__stack.lineno = 2, striker.util.formatTime(updateTime)), '</dd>\n        <dd class="artice-use">主题资源 ', (__stack.lineno = 3, subjectResourceCount), " ", (__stack.lineno = 3, memberCount), "个成员 ", (__stack.lineno = 3, articleCount), "个帖子 ", (__stack.lineno = 3, articleResourceCount), "个资源 我的发帖/回复 ", (__stack.lineno = 3, articleCreateCount), '/12</dd>\n        <dd class="artice-act-btn">\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn ');
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
	                buf.push('</a></span>\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <!--\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a>\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <nav class="btn-toolbar">\r\n          <div class="btn-group">\r\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\r\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\r\n            <span class="btn btn-primary">统计</span>\r\n          </div>\r\n        </nav>\r\n\r\n        <div class="artice-aside-img">\r\n          <!--\r\n          <div class="video">\r\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\r\n            预览  标注 下载  删除\r\n          </div>\r\n          -->\r\n          <div class="img-list">\r\n            <%\r\n              for(var i in resourceList){\r\n              var item = resourceList[i];\r\n            %>\r\n            <div class="sub-resource-<%-item.id%>">\r\n            <%if(item.type === 1){%>\r\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else if(item.type === 4 || item.type ===3){%>\r\n              <video src="/cgi/resource/download?id=<%-item.id%>" controls="controls">\r\n              您的浏览器不支持 video 标签。\r\n              </video>\r\n              <a data-id="<%-item.id%>"  data-action="mark" style="">标注</a>  <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else{%>\r\n              <p><%-item.name%></p>\r\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>              \r\n            <%}%>\r\n            </div>\r\n            <%}%>\r\n          </div>\r\n        </div>',
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
	                        buf.push('\n              <video src="/cgi/resource/download?id=', (__stack.lineno = 29, item.id), '" controls="controls">\n              您的浏览器不支持 video 标签。\n              </video>\n              <a data-id="', (__stack.lineno = 32, item.id), '"  data-action="mark" style="">标注</a>  <a data-id="', (__stack.lineno = 32, item.id), '"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 32, item.id), '" target="_blank">下载</a>\n              ');
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
/* 48 */
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
/* 49 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzM1YmYxMDE3YmI4Yzg2NDQwMTAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvcG9zdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vY2dpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvaW5mby5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9jcmVhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci91c2VyX25hdi5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21zZ2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2cuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L3NpemUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9saXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvaGVhZC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2FzaWRlLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsUTs7Ozs7O0FDeEVBO0FBQ0E7QUFDQSwyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDO0FBQ0EsNkNBQTRDO0FBQzVDLHlDOztBQUVBLDJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7QUMzRUE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQixrQ0FBaUM7QUFDakMsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLG9CO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBLG1CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7OztBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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Q0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDN0JBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG9EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9EO0FBQ0E7O0FBRUEscUI7Ozs7OztBQ25UQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1Qjs7Ozs7O0FDaEJBO0FBQ0EsaUJBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOzs7QUFHQSxvQjs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsNEI7O0FBRUE7QUFDQTtBQUNBLHNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLCtCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7Ozs7OztBQ3ZMQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLEU7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWdCO0FBQ2hCLGlCQUFnQjtBQUNoQixlQUFjO0FBQ2QsaUJBQWdCOztBQUVoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw2QjtBQUNBLEdBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFhLDZCQUE2QjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLEU7Ozs7OztBQ2pNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSw4QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRixrQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTSxFO0FBQ04sTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU0sRTtBQUNOOztBQUVBO0FBQ0E7O0FBRUEsR0FBRTtBQUNGLEU7Ozs7OztBQy9PQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE0QixhQUFhO0FBQ3pDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBLHlCOzs7Ozs7OztBQ3pSQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MzViZjEwMTdiYjhjODY0NDAxMFxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxuXHRzdWJqZWN0ID0gcmVxdWlyZSgnLi9zdWJqZWN0L3N1YmplY3QnKSxcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9hcnRpY2xlJyksXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxuXHRub3RpZnkgPSByZXF1aXJlKCcuL25vdGlmeS9ub3RpZnknKSxcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XG5cblxudmFyIFN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcblxuXG4vL+S6i+S7tumAmuefpSznlKjmiLfotYTmlpnlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHVzZXJMb2FkKGUsZCl7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215U3ViamVjdCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUZvbGxvdycpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUludml0ZWQnKTtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlBcmNoaXZlZCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdvcGVuJyk7XG5cdG5ldyBub3RpZnkubm90aWZ5KCk7XG5cdHdpbmRvdy5zdHJpa2VyLmxhYmVsID0gbmV3IGxhYmVsLmxhYmVsKCdsYWJlbEFyZWEnKTtcblx0d2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdCA9IG5ldyBzdWJqZWN0LmNyZWF0ZSgpO1xuXHR3aW5kb3cuc3RyaWtlci5tc2cgPSBuZXcgbXNnLm1lc3NhZ2UoKTtcblx0Ly9zdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG5cdC8vIHN1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcblx0Ly8gc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xufVxuXG4vL+S6i+S7tumAmuefpSzkuLvpopjlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHN1YmplY3RMb2FkKGUsZCl7XG5cdGNvbnNvbGUubG9nKGUsZCk7XG59XG5cbnZhciBoYW5kbGVycyA9IHtcblx0J3VzZXJMb2FkU3ViJyA6IHVzZXJMb2FkLFxuXHQnc3ViamVjdExvYWQnIDogc3ViamVjdExvYWRcbn1cblxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcblx0U3RyaWtlci5iaW5kKGksaGFuZGxlcnNbaV0pO1xufVxuXG4vL+WFqOWxgOS6i+S7tue7keWumlxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xuXHQkKCdib2R5JykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0XHRpZihhY3Rpb24pe1xuXHRcdFx0dmFyIGFjdE1hcCA9IGFjdGlvbi5zcGxpdCgnLicpO1xuXHRcdFx0dmFyIG1vZCA9IGFjdE1hcFswXSxcblx0XHRcdFx0ZnVuID0gYWN0TWFwWzFdO1xuXHRcdFx0aWYoYWN0TWFwLmxlbmd0aCA9PT0gMiAmJiBzdHJpa2VyW21vZF1bZnVuXSl7XG5cblx0XHRcdFx0c3RyaWtlclttb2RdW2Z1bl0odGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCl7XG5cdHN1YmplY3QuaW5pdCgnaW5kZXgnKTtcblx0Ly9hcnRpY2xlLmluaXQoJ2luZGV4Jyk7XG5cdHVzZXIuaW5pdCgpO1xuXHRsYWJlbC5pbml0KCk7XG5cblx0c3RyaWtlci5zdWJqZWN0ID0gc3ViamVjdDtcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcblx0c3RyaWtlci51c2VyID0gdXNlcjtcblxuXHRiaW5kQWN0aW9uKCk7XG59XG5cbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRsb2dvdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubG9nb3V0LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XHJcblxyXG4vLyBVc2VyLmFkZERlZk1hbmFnZSA9IHVzZXJNYW5hZ2UuYWRkRGVmTWFuYWdlO1xyXG5cclxuVXNlci5nZXRNeUluZm8gPSBmdW5jdGlvbihjYil7XHJcblx0Y2dpLmluZm8oZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5teUluZm8gPSByZXMuZGF0YTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm5hdihyZXMuZGF0YSk7XHJcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRTdWInLHJlcy5jb2RlKTtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXJsb2FkJyk7XHJcblx0XHRcdGJpbmRBY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudmFyIG15QWN0ID0ge1xyXG5cdCdsb2dvdXQnIDogZnVuY3Rpb24oKXtcclxuXHRcdGxvZ291dChmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBiaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHQkKFwiI3VzZXJOYXZcIikuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uKXtcclxuXHRcdFx0aWYobXlBY3RbYWN0aW9uXSl7XHJcblx0XHRcdFx0bXlBY3RbYWN0aW9uXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFQb3N0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjAsXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhUG9zdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpLFxyXG5cdHJlc0xpc3QgPSBbXTtcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XHJcblx0dGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgnLnBvcC1yZXMnKS5odG1sKCcnKS5oaWRlKCk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxufVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5jRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5jRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXHJcblxyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5jRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRfdGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS5mb2N1cygpO1xyXG5cdFx0fSwxMDAwKVx0XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1x0XHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cclxucG9zdC5wcm90b3R5cGUuZ2V0UGFyYW0gPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3VwbG9hZEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVx0XHRcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcdFxyXG5cdGNvbnNvbGUubG9nKDIzMzMzMyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdC8vY29uc29sZS5sb2cocFRhcmdldCk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHRoaXMuZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0aWYocGFyYW0udGl0bGUgPT09ICcnIHx8IHBhcmFtLmNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignbmV3YXJ0aWNsZScscmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgbXNnID0ge1xyXG5cdDAgOiAn5pON5L2c5oiQ5YqfIScsXHJcblx0MTA6ICfmjpLluo/luo/lj7flv4XpobvloavlhpknLFxyXG5cdDExIDogJ+e7hOe7h+WQjeensOW/hemhu+Whq+WGmScsXHJcblx0MjAgOiAn5paw5a+G56CB5ZKM6YeN5aSN5a+G56CB5b+F6aG75LiA6Ie0JyxcclxuXHQyMSA6ICfor7floavlhpnnlKjmiLflkI3lkozlr4bnoIEhJyxcclxuXHQyMiA6ICfnlKjmiLfkuI3lrZjlnKgnLFxyXG5cdDMwIDogJ+e7hOe7h+acgOWkmuaUr+aMgTPnuqchJywgXHJcblx0NDAgOiAn6K+l55uu5b2V5LiL6L+Y5pyJ5YW25LuW5paH5Lu277yM5peg5rOV5Yig6ZmkIScsXHJcblx0NTAgOiAn5L2g6KaB5LiK5Lyg55qE5paH5Lu25bey57uP6LaF6L+H5L2g55qE5Ymp5L2Z56m66Ze0IScsXHJcblx0NjAgOiAn5L2g6L+Y5rKh5pyJ6YCJ5oup6KaB5YWx5Lqr55qE55uu5b2VJyxcclxuXHQ3NSA6ICfluo/lj7flj6rog73lnKgxfjk55LmL6Ze0JyxcclxuXHQ3NiA6ICflkI3np7DkuI3og73lsJHkuo4y5Liq5a2XJyxcclxuXHQ3NyA6ICflj4LmlbDkuI3og73kuLrnqbonLFxyXG5cdDc4IDogJ+WvueS4jei1t++8jOe9kee7nOi2heaXtuS6hu+8jOivt+eojeWQjuWGjeivlScsXHJcblx0NzkgOiAn5bey57uP5pyJ5ZCM5ZCN55qE6aG555uu5LqGJyxcclxuXHQxMDAgOiAn5a+55LiN6LW377yM5oKo5rKh5pyJ6L+Z5Liq5pON5L2c5p2D6ZmQIScsLy/lkI7lj7Dlh7rplJnllaYhXHJcblx0MTAxIDogJ+WHuumUmeWVpicsXHJcblx0MTAwMSA6ICfmgqjov5jmsqHmnInnmbvlvZUhJyxcclxuXHQxMDA0IDogJ+ayoeacieaJvuWIsOi1hOa6kCEnLFxyXG5cdDEwMTAgOiAn5oKo5rKh5pyJ5p+l55yL6K+l6LWE5rqQ55qE5p2D6ZmQIScsXHJcblx0MTAxMSA6ICflj4LmlbDlh7rplJnllaYhJyxcclxuXHQxMDEzIDogJ+WHuumUmeWVpicsXHJcblx0MTAxNCA6ICflt7Lnu4/lhbPms6jor6XkuLvpopgnLFxyXG5cdDEwMTUgOiAn5bey57uP5b2S5qGj5ZWmIScsXHJcblx0MTAxNiA6ICfor6XotYTmupDkuI3og73liKDpmaQnLFxyXG5cdDEwMTcgOiAn6K+l55uu5b2V5LiL6L+Y5pyJ5YW25LuW5paH5Lu277yM5peg5rOV5Yig6ZmkIScsXHJcblx0MTA0MSA6ICfnlKjmiLflkI3miJblr4bnoIHplJnor68hJyxcclxuXHQxMDQzIDogJ+eUqOaIt+S4jeWtmOWcqCEnLFxyXG5cdDEwNTAgOiAn5pe26Ze05Lqk5Y+J5LqGISdcclxufVxyXG5cclxuTWVzc2VuZ2VyKCkub3B0aW9ucyA9IHtcclxuICAgIGV4dHJhQ2xhc3NlczogJ21lc3Nlbmdlci1maXhlZCBtZXNzZW5nZXItb24tYm90dG9tJyxcclxuICAgIHRoZW1lOiAnZmxhdCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcblxyXG5mdW5jdGlvbiBtZXNzYWdlKCl7XHJcblx0dGhpcztcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUuY29uZmlybSA9IGZ1bmN0aW9uKG1zZyxsYWJlbCxjYil7XHJcblx0aWYodHlwZW9mIGxhYmVsID09PSAndW5kZWZpbmVkJyB8fCBsYWJlbCA9PT0gbnVsbCl7XHJcblx0XHRsYWJlbCA9IHtcclxuXHRcdFx0c3ViIDogJ+ehruWumicsXHJcblx0XHRcdGNhbmNlbCA6ICflj5bmtognXHJcblx0XHR9XHJcblx0fVxyXG5cdGlmKHR5cGVvZiBjYiA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0Y2IgPSBmdW5jdGlvbigpe307XHJcblx0fVxyXG5cdGlmKHR5cGVvZiBtc2cgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBvYmogPSB7XHJcblx0XHRtZXNzYWdlIDogbXNnLFxyXG5cdFx0YWN0aW9ucyA6IHtcclxuXHRcdFx0c3ViIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuc3ViIHx8ICfnoa7lrponLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRjYigpO1xyXG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNhbmNlbCA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLmNhbmNlbCB8fCAn5Y+W5raIJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dmFyIG1zZyA9IE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbihkKXtcclxuXHRpZihkID09IDEwMDEpe1xyXG5cdFx0d2luZG93LmxvY2F0aW9uID0gJy9sb2dpbi5odG1sJztcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2dbZF0gfHwgJ+WHuumUmeaLiSEnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KGQpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5tc2cgPSBmdW5jdGlvbihtc2cpe1xyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2cgfHwgJydcclxuXHR9XHJcblx0aWYocGFyc2VJbnQobXNnKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcdFx0XHJcbn1cclxuXHJcbmRiLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9tc2cuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCIvL+mAmuefpVxyXG52YXIgbm90aWZ5ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLm5vdGlmeSxcclxuXHRjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubm90aWZ5O1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21zZ2xpc3QuZWpzJyksXHJcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnLmVqcycpICAgLy/otYTmupDliJfooahcclxufVxyXG5cclxudmFyIG5vdGlmeU9iaiA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI25vdGlmeUxpc3RcIik7XHJcblx0dGhpcy50aXBzRG9tID0gJChcIiN1c2VyTmF2IC5tc2cgZGl2XCIpO1xyXG5cclxuXHR0aGlzLm1zZ051bSA9IDA7XHJcblx0dGhpcy5nZXQoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxubm90aWZ5T2JqLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLnNlYXJjaCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0Y29uc29sZS5sb2cocmVzKTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0aWYocmVzLmRhdGEubGlzdC5sZW5ndGgpe1xyXG5cdFx0XHRcdF90aGlzLm1zZ051bSA9IHJlcy5kYXRhLmxpc3QubGVuZ3RoO1xyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20udGV4dChfdGhpcy5tc2dOdW0pLnNob3coKTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxubm90aWZ5T2JqLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLnRpcHNEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0aWYoX3RoaXMubXNnTnVtKXtcclxuXHRcdFx0aWYoX3RoaXMudGlwc0RvbS5kYXRhKCdzaG93Jykpe1xyXG5cdFx0XHRcdF90aGlzLmRvbS5oaWRlKCk7XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS5kYXRhKCdzaG93JywwKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMuZG9tLnNob3coKTtcdFxyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0aHJlZiA9IHRhcmdldC5kYXRhKCdocmVmJyksXHJcblx0XHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRcdHJlYWQgPSB0YXJnZXQuZGF0YSgncmVhZCcpO1xyXG5cclxuXHJcblx0XHRpZihocmVmKXtcclxuXHRcdFx0d2luZG93Lm9wZW4oaHJlZik7XHJcblx0XHRcdGlmKHJlYWQgPT0gJycpe1xyXG5cdFx0XHRcdGNnaS5yZWFkKHtcclxuXHRcdFx0XHRcdG5vdGlmeUlkIDogaWRcclxuXHRcdFx0XHR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdHRhcmdldC5yZW1vdmUoKTtcclxuXHRcdFx0XHRcdFx0X3RoaXMubXNnTnVtLS07XHJcblx0XHRcdFx0XHRcdF90aGlzLnRpcHNEb20udGV4dChfdGhpcy5tc2dOdW0pO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5ub3RpZnkubm90aWZ5ID0gbm90aWZ5T2JqO1xyXG5cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbm90aWZ5O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxhYmVsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5sYWJlbCxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgTGFiZWwgPSB7fSxcclxuXHRfdGhpcyA9IExhYmVsO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL2xpc3QuZWpzJyksXHJcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL29uZS5lanMnKVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcclxuXHJcbmZ1bmN0aW9uIGdldExpc3QoKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmxhYmVsID0gZnVuY3Rpb24obmFtZSl7XHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK25hbWUpO1xyXG5cclxuXHR0aGlzLm5vd0RvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYWRkRG9tID0gdGhpcy5kb20uZmluZCgnLmFkZC1sYWJlbC1hcmVhJyk7XHJcblx0Ly8gaWYodHlwZSA9PT0gJ3N1Yicpe1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkU3ViTGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd1N1YkxhYmVsJyk7XHJcblx0Ly8gfWVsc2V7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRBcnRMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93QXJ0TGFiZWwnKTtcclxuXHQvLyB9XHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmJ0bkRvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5idG4nKTtcclxuXHR0aGlzLmlucHV0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG5cdHRoaXMuX3NlbGVjdERvbTsvL+W9k+WJjemAieS4reeahOWFg+e0oFxyXG5cclxuXHQvL+m7mOiupOayoeacieagh+etvlxyXG5cdHRoaXMubm93RG9tLmhpZGUoKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblxyXG5cdC8v5bey57uP6YCJ5Lit55qEaWRtYXBcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblxyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5nZXREYXRhKCk7XHRcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdC8vXHJcblx0Ly8gdGhpcy5ub3dEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0Ly8gXHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHQvLyBcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdC8vIFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgdmFsID0gdGhpcy5pbnB1dERvbS52YWwoKTtcclxuXHRpZih2YWwgIT09ICcnKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0bmFtZSA6IHZhbFxyXG5cdFx0fTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0X3RoaXMubWFwW3Jlcy5kYXRhLmlkXSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OltyZXMuZGF0YV19KTtcclxuXHRcdFx0XHRfdGhpcy5saXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbihlKXtcclxuXHQvLyAvY29uc29sZS5sb2codGhpcy5fc2VsZWN0RG9tKTtcclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblx0fVxyXG5cdC8vdGhpcy5hZGREb20uc2hvdygpO1xyXG5cdC8vdGhpcy5ub3dEb20uc2hvdygpO1xyXG5cclxuXHQvL2Z1aS1jcm9zc1xyXG5cdC8vZnVpLXBsdXNcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmxpc3Qoe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6cmVzLmRhdGF9KTtcclxuXHRcdFx0X3RoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwLGw9cmVzLmRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHRcdHZhciBpdGVtID0gcmVzLmRhdGFbaV07XHJcblx0XHRcdFx0X3RoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd0VkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHQgdmFyIGh0bWwgPSB0bXBsLm9uZSh7bGlzdDpkYXRhfSk7XHJcblx0IHRoaXMubm93RG9tLmh0bWwoaHRtbCkuc2hvdygpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy5fc2VsZWN0RG9tLmRhdGEoJ2lkJyk7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0bGlzdCA6IFt0aGlzLm1hcFtpZF1dXHJcblx0fVxyXG5cclxuXHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0aWYodGhpcy5ub3dEb20uZmluZCgnLmxhYmVsJytpZCkubGVuZ3RoID09PSAwKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmUocGFyYW0pO1xyXG5cdFx0dGhpcy5ub3dEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXRMYWJlbExpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Ly8gY29uc29sZS5sb2codGhpcy5ub3dEb20uZmluZChcIi50YWdcIikubGVuZ3RoKTtcclxuXHQvLyB0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdC8vIFx0aWYoaWQpe1xyXG5cdC8vIFx0XHRsaXN0LnB1c2goaWQpO1xyXG5cdC8vIFx0fVx0XHRcdFx0XHJcblx0Ly8gfSlcdFxyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMubm93RG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v5Yig6ZmkXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdHAucmVtb3ZlKCk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+S4u+mimFxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnN1YmplY3QsXHJcblx0c3ViamVjdExpc3QgPSByZXF1aXJlKCcuL2xpc3QnKSxcclxuXHRzdWJqZWN0SW5mbyA9IHJlcXVpcmUoJy4vaW5mbycpLFxyXG5cdHN1YmplY3RDcmVhdGUgPSByZXF1aXJlKCcuL2NyZWF0ZScpO1xyXG5cclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxuLy/mqKHmnb/lvJXnlKhcclxudmFyIHRtcGwgPSB7XHJcblx0YXJlYSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L3NpemUuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLCAvL+euoeeQhuWRmFxyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9saXN0LmVqcycpLCAgLy/kuLvpopjliJfooahcclxuXHRoZWFkIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvaGVhZC5lanMnKSwgIC8v5Li76aKY6K+m5oOF5aS06YOoXHJcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpLCAvL+WNleS4queuoeeQhuWRmFxyXG5cdGFzaWRlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvYXNpZGUuZWpzJyksICAvL+S4u+mimOivpuaDheWPs+i+uei1hOa6kOWIl+ihqFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIHByb01hcCA9IHtcclxuXHRteVN1YmplY3QgOiAn5oiR5Yib5bu655qEJyxcclxuXHRteUZvbGxvdyA6ICfmiJHlhbPms6jnmoQnLFxyXG5cdG15SW52aXRlZCA6ICfpgoDor7fmiJHnmoQnLFxyXG5cdG9wZW4gOiAn5YWs5byA5Li76aKYJyxcclxuXHRteUFyY2hpdmVkIDogJ+W9kuaho+S4u+mimCdcclxufVxyXG5cclxudmFyIFN1YmplY3QgPSB7fTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU3ViamVjdDtcclxuXHJcbi8q5a6a5LmJ6YCa55So5Y+C5pWwKi9cclxudmFyIHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwO1xyXG5cclxuU3ViamVjdC5zZWFyY2ggPSBzdWJqZWN0TGlzdC5zZWFyY2g7XHJcblxyXG5TdWJqZWN0LmNyZWF0ZSA9IHN1YmplY3RDcmVhdGUuY3JlYXRlO1xyXG5cclxuU3ViamVjdC5pbmZvID0gc3ViamVjdEluZm8uaW5mbztcclxuXHJcblN1YmplY3QuYXJlYSA9IGZ1bmN0aW9uKGRvbW5hbWUpe1xyXG5cdHZhciBwcm9OYW1lID0gZG9tbmFtZSxcclxuXHRcdGRvbSA9ICQoJyMnK2RvbW5hbWUrJ0Jsb2NrJyk7XHJcblx0dGhpcy5wcm9OYW1lID0gZG9tbmFtZTtcclxuXHR0aGlzLmRvbSA9IGRvbTtcclxuXHR0aGlzLnBhZ2UgPSAwOyAgIC8v5byA5aeL6aG156CBXHJcblx0dGhpcy5hbGxQYWdlID0gMDtcclxuXHR0aGlzLmxpbWl0ID0gNTsgLy/kuIDpobXnmoTmnaHmlbBcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnOy8vMCDmjInml7bpl7TmjpLluo8sMSDmjInmm7TmlrDml7bpl7TmjpLluo9cclxuXHR0aGlzLmxpc3REb207IC8v5YiX6KGo55qE5L2N572uXHJcblx0dmFyIGh0bWwgPSB0bXBsLmFyZWEoe1xyXG5cdFx0cHJvVGV4dCA6IHByb01hcFtkb21uYW1lXSxcclxuXHRcdHByb05hbWUgOiBkb21uYW1lXHJcblx0fSk7XHJcblx0ZG9tLmh0bWwoaHRtbCk7XHJcblx0dGhpcy5saXN0RG9tID0gJCgnIycrZG9tbmFtZSk7XHJcblx0dGhpcy5udW1Eb20gPSAkKFwiI1wiK2RvbW5hbWUrJ051bScpO1xyXG5cdHRoaXMucHJlUGFnZSA9IGRvbS5maW5kKCcucHJlLXBhZ2UnKTtcclxuXHR0aGlzLm5leHRQYWdlID0gZG9tLmZpbmQoJy5uZXh0LXBhZ2UnKTtcdFxyXG5cdHRoaXMudGltZURvbSA9IGRvbS5maW5kKCcudGltZScpO1xyXG5cdHRoaXMudXBkYXRlRG9tID0gZG9tLmZpbmQoJy51cGRhdGUnKTtcclxuXHR0aGlzLmFsbE51bSA9IDA7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbi8v5LiL5LiA6aG1XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUubmV4dCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlIDwgdGhpcy5hbGxQYWdlLTEpe1xyXG5cdFx0dGhpcy5wYWdlKys7XHJcblx0XHR0aGlzLmdldERhdGUoe1xyXG5cdFx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG5cclxuLy/kuIrkuIDpobVcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5wcmUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA+IDApe1xyXG5cdFx0dGhpcy5wYWdlLS07XHJcblx0XHR0aGlzLmdldERhdGUoe1xyXG5cdFx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5omT5byA5pS26LW3XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0aWYodGhpcy5saXN0RG9tLmhhc0NsYXNzKCdoaWRlJykpe1xyXG5cdFx0dGhpcy5saXN0RG9tLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcblx0XHR0YXJnZXQuYXR0cignY2xhc3MnLCdhcnJvdy1kb3duJyk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLmxpc3REb20uYWRkQ2xhc3MoJ2hpZGUnKTtcclxuXHRcdHRhcmdldC5hdHRyKCdjbGFzcycsJ2Fycm93LXVwJyk7XHJcblx0fVxyXG59XHJcblxyXG4vL+aMieWPkeihqOaXtumXtOaOkuW6j1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHQvLyBvcmRlcmJ5OiB1cGRhdGVUaW1lIC8gY3JlYXRlVGltZVxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7XHJcblx0dGhpcy50aW1lRG9tLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLnVwZGF0ZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+aMieabtOaWsOaXtumXtOaOkuW6j1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMub3JkZXIgPSAndXBkYXRlVGltZSc7XHJcblx0dGhpcy51cGRhdGVEb20uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMudGltZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHRcclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHRcclxufVxyXG5cclxuLy/mlrDlu7rkuLvpophcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKCF0aGlzLmNyZWF0ZVN1YmplY3Qpe1xyXG5cdFx0dGhpcy5jcmVhdGVTdWJqZWN0ID0gd2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdDtcclxuXHR9XHJcblx0aWYoIXRoaXMubGFiZWwpe1xyXG5cdFx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xyXG5cdH1cclxuXHR0aGlzLmNyZWF0ZVN1YmplY3QuY2hhbmdlVHlwZSh0aGlzLnByb05hbWUpO1xyXG5cdC8vdGhpcy5sYWJlbC5pbml0KCk7XHJcbn1cclxuXHJcbi8v5Yik5pat57+76aG15piv5ZCm5Y+v5Lul54K55Ye7XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2hlY2tQYWdlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPD0gMSl7XHJcblx0XHR0aGlzLnByZVBhZ2UuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZih0aGlzLmFsbFBhZ2UgPT09IDEpe1xyXG5cdFx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOmZhbHNlfSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHRcclxuXHRcdH1cclxuXHRcdFxyXG5cdH1lbHNlIGlmKHRoaXMucGFnZSA+PSB0aGlzLmFsbFBhZ2UtMSl7XHJcblx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOnRydWV9KS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcclxuXHRcdGlmKHRoaXMuYWxsUGFnZSA9PT0gMSl7XHJcblx0XHRcdHRoaXMucHJlUGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5wcmVQYWdlLnByb3Aoe2Rpc2FibGVkOmZhbHNlfSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/kv67mlLnmgLvmlbBcclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jaGFuZ2VOdW0gPSBmdW5jdGlvbihudW0pe1xyXG5cdHRoaXMuYWxsUGFnZSA9IE1hdGguY2VpbChudW0vdGhpcy5saW1pdCk7XHJcblx0dGhpcy5hbGxOdW0gPSBudW07XHJcblx0dGhpcy5udW1Eb20udGV4dChudW0pO1xyXG59XHJcblxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBmdW5uYW1lID0gJ3NlYXJjaCc7XHJcblx0aWYodGhpcy5wcm9OYW1lID09PSAnbXlGb2xsb3cnKXtcclxuXHRcdGZ1bm5hbWUgPSAnZm9sbG93aW5nJztcclxuXHR9ZWxzZSBpZiAodGhpcy5wcm9OYW1lID09PSAnbXlJbnZpdGVkJyl7XHJcblx0XHRmdW5uYW1lID0gJ2ludml0ZWQnO1xyXG5cdH1lbHNlIGlmICh0aGlzLnByb05hbWUgPT09ICdteUFyY2hpdmVkJyl7XHJcblx0XHRmdW5uYW1lID0gJ2FyY2hpdmVkJztcclxuXHR9ZWxzZSBpZiAodGhpcy5wcm9OYW1lID09PSAnb3Blbicpe1xyXG5cdFx0cGFyYW0ucHJpdmF0ZSA9IDE7XHJcblx0fWVsc2UgaWYodGhpcy5wcm9OYW1lID09PSAnbXlTdWJqZWN0Jyl7XHJcblx0XHRmdW5uYW1lID0gJ2xpc3QnO1xyXG5cdH1cclxuXHJcblx0Y2dpW2Z1bm5hbWVdKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRfdGhpcy5jaGFuZ2VOdW0ocmVzLmRhdGEudG90YWwpO1xyXG5cdFx0XHRfdGhpcy5jaGVja1BhZ2UoKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLypcclxu6ICD6JmR5Yiw6aaW6aG157uT5p6E55qE54m55q6K5oCnLOi/memHjOWIhuWdl+e7keWumuS6i+S7tlxyXG4qL1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0c3RyaWtlci5iaW5kKCdzdWJqZWN0Q3JlYXRlZCcsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCdteVN1YmplY3QnID09PSBfdGhpcy5wcm9OYW1lKXtcclxuXHRcdFx0X3RoaXMuYWxsTnVtKys7XHJcblx0XHRcdF90aGlzLmNoYW5nZU51bShfdGhpcy5hbGxOdW0pO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5TdWJqZWN0LmluaXQgPSBmdW5jdGlvbih0eXBlKXtcclxuXHRzdWJqZWN0TGlzdC5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG5cdHN1YmplY3RJbmZvLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdENyZWF0ZS5pbml0KHR5cGUsY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L3N1YmplY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHRvcCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL3RvcC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcbnZhciBhcnRpY2xlTGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpLFxyXG5cdGFydGljbGVQb3N0ID0gcmVxdWlyZSgnLi9wb3N0Jyk7XHJcblxyXG52YXIgQXJ0aWNsZSA9IHt9XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEFydGljbGU7XHJcblxyXG5BcnRpY2xlLmxpc3QgPSBhcnRpY2xlTGlzdC5hcnRpY2xlO1xyXG5cclxuLy8gQXJ0aWNsZS5sb2FkTW9yZSA9IGFydGljbGVMaXN0LmxvYWRNb3JlO1xyXG5cclxuQXJ0aWNsZS5hcHBlbmRUb0xpc3QgPSBhcnRpY2xlTGlzdC5wcmVwZW5kVG9MaXN0O1xyXG5cclxuLy9BcnRpY2xlLnBvc3QgPSBhcnRpY2xlUG9zdC5jcmVhdGU7XHJcblxyXG4vL0FydGljbGUucmVzZXQgPSBhcnRpY2xlUG9zdC5yZXNldDtcclxuXHJcbi8qKi9cclxuXHJcbkFydGljbGUuaW5pdCA9IGZ1bmN0aW9uKGlkKXtcclxuXHRhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHRhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcclxuXHRtZXNzYWdlID0gcmVxdWlyZSgnLi9tc2cnKTtcclxuXHJcbnZhciBtc2cgPSBuZXcgbWVzc2FnZS5tZXNzYWdlKCk7XHJcblxyXG52YXIgY2dpUGF0aCA9ICcvY2dpLyc7XHJcbnZhciBjZ2lMaXN0ID0ge1xyXG5cdHVzZXIgOiB7XHJcblx0XHRsaXN0IDogY2dpUGF0aCsndXNlci9saXN0JyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKyd1c2VyL2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsndXNlci9jcmVhdGUnXHJcblx0fSxcclxuXHRzdWJqZWN0IDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3N1YmplY3QvbGlzdCcsIC8vIOaIkeeahOWIl+ihqFxyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnc3ViamVjdC9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3N1YmplY3QvaW5mbycsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnc3ViamVjdC9lZGl0JywgLy/kv67mlLnkuLvpophcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnc3ViamVjdC9kZWxldGUnLFxyXG5cdFx0Zm9sbG93IDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3cnLCAvL+WFs+azqFxyXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0aW52aXRlZCA6IGNnaVBhdGgrJ3N1YmplY3QvaW52aXRlZCcsIC8v6YKA6K+35YiX6KGoXHJcblx0XHRhcmNoaXZlZCA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZWQnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0YXJjaGl2ZSA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZScsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRkZWxyZXNvdXJjZSA6IGNnaVBhdGggKyAnc3ViamVjdC9kZWxyZXNvdXJjZScgLy/liKDpmaTkuIDkuKrotYTmupBcclxuXHR9LFxyXG5cdGFydGljbGUgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydhcnRpY2xlL3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnYXJ0aWNsZS9pbmZvJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXJpbmcnLCAvL+i1nueahOW4luWtkFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0ZWQnLCAvL+aQnOiXj+eahOW4luWtkFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2FydGljbGUvZWRpdCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyJywgLy/otZ5cclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3QnLCAvL+aUtuiXj1xyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydhcnRpY2xlL2RlbGV0ZScsIC8v5pS26JePXHJcblx0XHQnc2V0dG9wJyA6IGNnaVBhdGgrJ2FydGljbGUvc2V0VG9wJywgLy/mlLbol49cclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2FydGljbGUvY3JlYXRlJ1xyXG5cdH0sXHJcblx0Y29tbWVudCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2NvbW1lbnQvc2VhcmNoJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydjb21tZW50L3N0YXJpbmcnLFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0ZWQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcicsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2NvbW1lbnQvZGVsZXRlJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydjb21tZW50L2VkaXQnLFxyXG5cdFx0Y29sbGVjdCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdCcsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydjb21tZW50L2NyZWF0ZSdcclxuXHR9LFxyXG5cdG5vdGlmeSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9zZWFyY2gnLFxyXG5cdFx0cmVhZCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9yZWFkJyxcclxuXHR9LFxyXG5cdGxhYmVsIDoge1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnbGFiZWwvY3JlYXRlJyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydsYWJlbC9saXN0J1xyXG5cdH0sXHJcblx0cmVzb3VyY2UgOiB7XHJcblx0XHRtYXJrIDogY2dpUGF0aCArICdyZXNvdXJjZS9tYXJrJyxcclxuXHRcdHNwbGl0IDogY2dpUGF0aCArICdyZXNvdXJjZS9zcGxpdCcsXHJcblx0XHRsaXN0IDogY2dpUGF0aCArICdyZXNvdXJjZS9saXN0J1xyXG5cdH0sXHJcblx0bG9naW4gOiBjZ2lQYXRoKydhY2NvdW50L2xvZ2luJyxcclxuXHRsb2dvdXQgOiBjZ2lQYXRoKydhY2NvdW50L2xvZ291dCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcbnZhciBlbXB0eUZ1biA9IGZ1bmN0aW9uKHJlcyl7XHJcbn1cclxuLy8gL+e7n+S4gOWHuuadpeW8ueWHuua2iOaBr1xyXG52YXIgY2hlY2tDYWxsYmFjayA9IGZ1bmN0aW9uKGNiLGZsYWcpe1xyXG5cdHJldHVybiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0Y2IocmVzKTtcclxuXHRcdGlmKHJlcy5jb2RlICE9PSAwKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1lbHNlIGlmKGZsYWcpe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZGIubG9naW4gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblxyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ291dCx7fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIgPSB7fTtcclxuZGIudXNlci5saXN0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5saXN0LG51bGwsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyLmluZm8gPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmluZm8sbnVsbCxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuLy/nm7TmjqXmi4nmiYDmnInnlKjmiLc/XHJcbmRiLnVzZXIuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QgPSB7fTtcclxuXHJcbmRiLnN1YmplY3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmxpc3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3RbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3RbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3cscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93aW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3dpbmcscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW52aXRlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW52aXRlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZGVscmVzb3VyY2UgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmRlbHJlc291cmNlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5hcnRpY2xlID0ge307XHJcblxyXG5kYi5hcnRpY2xlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmFydGljbGUuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZVsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnNldHRvcCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc2V0dG9wLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudCA9IHt9O1xyXG5cclxuZGIuY29tbWVudC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5ub3RpZnkgPSB7fTtcclxuXHJcbmRiLm5vdGlmeS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5ub3RpZnkuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLm5vdGlmeS5yZWFkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0Lm5vdGlmeS5yZWFkLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubGFiZWwuY3JlYXRlLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmxhYmVsLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sYWJlbC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZSA9IHt9O1xyXG5cclxuZGIucmVzb3VyY2UubWFyayA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5tYXJrLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLnNwbGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnJlc291cmNlLnNwbGl0LCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5yZXNvdXJjZS5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2NnaS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/lop7liqDnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5hZGREZWZNYW5hZ2UgPSBmdW5jdGlvbigpe1xyXG5cdFxyXG59XHJcblxyXG5tYW5hZ2UucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5riF56m65YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmxpc3REb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v6YCJ5Lit5LiA5Liq55So5oi3XHJcbm1hbmFnZS5wcm90b3R5cGUuc2VsZWN0b25lID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdG5hbWUgPSB0YXJnZXQuZGF0YSgnbmFtZScpO1xyXG5cclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdG5hbWUgOiBuYW1lXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIHNMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnN1YmplY3QsXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHNMaXN0O1xyXG5cclxuc0xpc3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcbn1cclxuXHJcbnNMaXN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNiKXtcclxuXHRjZ2kuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogc3RhcnQsXHJcblx0XHRsaW1pdCA6IGxpbWl0XHJcblx0fSxjYik7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5ouJ5Li76aKY5YaF5a65XHJcbnZhciBzSW5mbyA9IHt9O1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNJbmZvO1xyXG5cclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBzdWJEb20gPSAkKFwiI3N1YmplY3RIZWFkXCIpO1xyXG52YXIgc3ViQXNpZGVEb20gPSAkKFwiI3N1YmplY3RBc2lkZVwiKTtcclxudmFyIHBvc3RBcmVhID0gJChcIiNwb3N0QXJ0aWNsZVwiKTtcclxuXHJcbnNJbmZvLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG4vL+aLieWPluS4gOS4quS4u+mimOeahOWGheWuuVxyXG4vLyBzSW5mby5pbmZvID0gZnVuY3Rpb24oaWQsY2Ipe1xyXG4vLyBcdGNnaS5pbmZvKHtpZDppZH0sZnVuY3Rpb24ocmVzKXtcclxuLy8gXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuLy8gXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmhlYWQocmVzLmRhdGEpO1xyXG4vLyBcdFx0XHRzdWJEb20uaHRtbChodG1sKTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KVxyXG4vLyB9XHJcblxyXG52YXIgaW5mbyA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLnNpZCA9IGlkO1xyXG5cdHRoaXMuZG9tID0gc3ViRG9tO1xyXG5cdHRoaXMuYXNpZGVEb20gPSBzdWJBc2lkZURvbTtcclxuXHR0aGlzLmdldERhdGEoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLmZvbGxvd0J0bjsgLy/lhbPms6jmjInpkq5cclxuXHR0aGlzLm1hbmFnZUJ0bjsgLy/nrqHnkIbmjInpkq5cclxuXHR0aGlzLnRpbWVCdG47ICAgLy/mjInml7bpl7TmjpLluo9cclxuXHR0aGlzLnVwZGF0ZUJ0bjsgLy/mjInmm7TmlrDml7bpl7TmjpLluo9cclxuXHJcblx0dGhpcy5kYXRhID0ge307XHJcblxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxufVxyXG5cclxuc0luZm8uaW5mbyA9IGluZm87XHJcblxyXG4vL+WIoOmZpOS4u+mimOebuOWFs+i1hOa6kFxyXG5pbmZvLnByb3RvdHlwZS5kZWxldGVSZXNvdXJjZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5tc2cuY29uZmlybSgn56Gu5a6a6KaB5Yig6Zmk6K+l6LWE5rqQPycsbnVsbCxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0c3ViamVjdElkIDogX3RoaXMuc2lkLFxyXG5cdFx0XHRcdHJlc291cmNlSWQgOiBpZFxyXG5cdFx0XHR9XHJcblx0XHRcdGNnaS5kZWxyZXNvdXJjZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdCQoXCIuc3ViLXJlc291cmNlLVwiK2lkKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59O1xyXG5cclxuLy/miorlhbbku5bnmoTlr7nosaHnmoTlvJXnlKjkvKDov5vmnaUuXHJcbmluZm8ucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMucG9zdCA9IG9iai5wb3N0O1xyXG59XHJcblxyXG5pbmZvLnByb3RvdHlwZS5tYW5hZ2UgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucG9zdC5lZGl0KHRoaXMuZGF0YSk7XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLmRhdGEucmVzb3VyY2VMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLm1hcmsgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ21hcmsnLHtcclxuXHRcdFx0aWQgOiBpZFxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5pbmZvLnByb3RvdHlwZS5hcnRpY2xlb3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBkb20gPSB0YXJnZXQucGFyZW50KCcuYnRuLWdyb3VwJyk7XHJcblx0cGRvbS5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlOm9yZGVyYnl1cGRhdGUnKTtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUuYXJ0aWNsZW9yZGVyYnl0aW1lID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGRvbSA9IHRhcmdldC5wYXJlbnQoJy5idG4tZ3JvdXAnKTtcdFxyXG5cdHBkb20uZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHN0cmlrZXIudHJpZ2dlcignYXJ0aWNsZTpvcmRlcmJ5Y3JlYXRlJyk7XHJcbn1cclxuXHJcbmluZm8ucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0c3RyaWtlci5iaW5kKCdzdWJqZWN0VXBkYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMuZGF0YSA9IGQ7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChkKTtcclxuXHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdHJlcy5kYXRhLm15ID0gZGF0YS51c2VyLm15SW5mbztcclxuXHRcdHZhciBodG1sID0gdG1wbC5hc2lkZShkKTtcclxuXHRcdFxyXG5cdFx0X3RoaXMuYXNpZGVEb20uaHRtbChodG1sKTtcdFx0XHRcclxuXHR9KTtcclxuXHJcblx0XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmFzaWRlRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFx0XHRcclxufVxyXG5cclxuLy/mi4nljZXkuKrluJblrZBcclxuaW5mby5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy5zaWQ7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuaW5mbyh7aWQ6aWR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRyZXMuZGF0YS5teSA9IGRhdGEudXNlci5teUluZm87XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5hc2lkZShyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRhdGEgPSByZXMuZGF0YTtcclxuXHRcdFx0X3RoaXMuYXNpZGVEb20uaHRtbChodG1sKTtcclxuXHJcblx0XHRcdF90aGlzLmZvbGxvd0J0biA9IF90aGlzLmRvbS5maW5kKCcuZm9sbG93LWJ0bicpO1xyXG5cdFx0XHRfdGhpcy5tYW5hZ2VCdG4gPSBfdGhpcy5kb20uZmluZCgnLm1hbmFnZS1idG4nKVxyXG5cdFx0XHRfdGhpcy50aW1lQnRuID0gX3RoaXMuZG9tLmZpbmQoJy50aW1lLWJ0bicpXHJcblx0XHRcdF90aGlzLnVwZGF0ZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudXBkYXRlLWJ0bicpXHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG4vL+WFs+azqOWNleS4quW4luWtkFxyXG5pbmZvLnByb3RvdHlwZS5mb2xsb3cgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMuc2lkXHJcblx0XHRmb2xsb3cgPSAxO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdC8v5Yik5pat5piv5ZCm5bey57uPZm9sbG935LqGLlxyXG5cdGlmKHRoaXMuZm9sbG93QnRuLmhhc0NsYXNzKCdmb2xsb3dlZCcpKXtcclxuXHRcdGZvbGxvdyA9IDA7XHJcblx0fVxyXG5cclxuXHRjZ2kuZm9sbG93KHtzdWJqZWN0SWQ6aWQsaXNGb2xsb3c6Zm9sbG93fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihmb2xsb3cpe1xyXG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5hZGRDbGFzcygnZm9sbG93ZWQnKS5odG1sKCc8c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lt7LlhbPms6gnKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMuZm9sbG93QnRuLnJlbW92ZUNsYXNzKCdmb2xsb3dlZCcpLmh0bWwoJzxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPuWFs+azqCcpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5Li76aKY5Yib5bu6LOWIoOmZpOetieaTjeS9nFxyXG52YXIgZGF0YTtcclxudmFyIHNDcmVhdGUgPSB7fTtcclxudmFyIGNnaSxcclxuXHR0bXBsO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHNDcmVhdGU7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5zQ3JlYXRlLmluaXQgPSBmdW5jdGlvbih0eXBlLG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG59XHJcblxyXG5zQ3JlYXRlLmNyZWF0ZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR0aGlzLnN1YklkID0gaWQ7XHJcblxyXG5cdC8v6buY6K6k5L2/55So5oiR55qE5Li76aKYXHJcblx0dGhpcy50eXBlID0gJ215U3ViamVjdCc7XHJcblx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcclxuXHR0aGlzLmVkaXREYXRhID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cclxuXHQvL+i/memHjOiAg+iZkeS4i+imgeS4jeimgeS8oOWPguaMh+WummRvbTtcclxuXHR0aGlzLmRvbSA9ICQoXCIjY3JlYXRlU3ViamVjdFwiKTtcclxuXHR0aGlzLnRpdGxlRG9tID0gdGhpcy5kb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XHJcblx0XHJcblx0Ly/lm7rlrprnmoRpZFxyXG5cdHRoaXMucmVzRG9tID0gJChcIiNub3dSZXNcIik7XHJcblxyXG5cdC8v5oqK55So5oi35YiX6KGo5ZOq5YS/5Yib5bu65LiA5LiLLlxyXG5cdC8vY29uc29sZS5sb2coc3RyaWtlci51c2VyKTtcdFxyXG5cdHZhciBtYW5hZ2UgPSBuZXcgd2luZG93LnN0cmlrZXIudXNlci5tYW5hZ2UoJ21hbmFnZUFyZWEnKTtcclxuXHR0aGlzLm1hbmFnZSA9IG1hbmFnZTtcclxuXHR0aGlzLmxhYmVsID0gd2luZG93LnN0cmlrZXIubGFiZWw7XHJcblxyXG5cdHRoaXMuZG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vc3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdFx0X3RoaXMudGl0bGVEb20udGV4dCgn5paw5bu65Li76aKYJyk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoXCIjc3ViamVjdFRpdGxlXCIpLmZvY3VzKCk7XHRcclxuXHRcdH0sMTAwMClcclxuXHRcdFxyXG5cdFx0bWFuYWdlLmluaXQoKTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly9zdHJpa2VyLnVzZXIuYWRkRGVmTWFuYWdlKCk7XHJcblx0XHRfdGhpcy5yZXNEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cdFx0X3RoaXMubWFuYWdlLmNsZWFyKCk7XHJcblx0XHRfdGhpcy5sYWJlbC5jbGVhcigpO1xyXG5cdFx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcclxuXHR9KTtcdFxyXG5cclxuXHQvL+i1hOa6kOWIl+ihqFxyXG5cdHRoaXMucmVzTGlzdCA9IFtdLFxyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdC8v5b2T5YmN6KKr6YCJ5Lit55qE5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmNoYW5nZVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcclxuXHR0aGlzLnR5cGUgPSAndHlwZSdcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHQvL3RoaXMudHlwZSA9ICd0eXBlJztcclxuXHR0aGlzLnRpdGxlRG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xyXG5cdCQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbChkYXRhLnRpdGxlKSxcclxuXHQkKFwiI3N1YmplY3RNYXJrXCIpLnZhbChkYXRhLm1hcmspLFxyXG5cdCQoXCIjc3ViamVjdE9wZW5cIikucHJvcCgnY2hlY2tlZCcsZGF0YS5wcml2YXRlKTtcclxuXHQkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyxkYXRhLmd1ZXN0KTtcclxuXHR0aGlzLmVkaXREYXRhID0gZGF0YTtcclxuXHJcblx0Ly/miornrqHnkIblkZjmmL7npLrlh7rmnaUs6LKM5Ly85pWw5o2u5LiN5pSv5oyBP1xyXG5cdHRoaXMuaXNlZGl0ID0gdHJ1ZTtcclxuXHJcblx0Ly/miormoIfnrb7mmL7npLrlh7rmnaVcclxuXHR0aGlzLmxhYmVsLnNob3dFZGl0KGRhdGEubGFiZWxzKTtcclxuXHJcblx0Ly/miorotYTmupDliqDov5vmnaVcclxuXHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0bGlzdCA6IGRhdGEucmVzb3VyY2VMaXN0XHJcblx0fSk7XHJcblx0dGhpcy5yZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG59XHJcblxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKHRoaXMucmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHR0aGlzLnJlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHRcdFxyXG5cdH1cclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+WPlumAieS4reeahOagh+etvlxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRyZXR1cm4gdGhpcy5sYWJlbC5nZXRMYWJlbExpc3QoKTtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTnrqHnkIbov5xcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLm1hbmFnZS5nZXRNYW5hZ2VMaXN0KCk7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0JChcIiNzdWJqZWN0VGl0bGVcIikudmFsKCcnKTtcclxuXHQkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgnJylcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG59XHJcblxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKHBhcmFtLGNiKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHQvL+i1hOa6kOS4iuS8oOWujOaIkOeahOmAmuefpVxyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRpZihfdGhpcy5zdWJJZCAmJiAhX3RoaXMuaXNlZGl0KXtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VyKCd1cGxvYWRBcnRpY2xlJyxkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdF90aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRfdGhpcy5yZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8v6Kem5Y+R5LiK5LygXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHJcblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcclxuXHRcdFx0X3RoaXMuZmlsZXVwbG9hZCA9IHRydWU7XHJcblx0XHRcdCQoXCIjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyksXHJcblx0XHRcdHR5cGUgPSB0YXJnZXQuZGF0YSgndHlwZScpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRpZih0eXBlID09PSAnc3VibWl0Jyl7XHJcblx0XHRcdHZhciB0aXQgPSAkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoKSxcclxuXHRcdFx0XHRtYXJrID0gJChcIiNzdWJqZWN0TWFya1wiKS52YWwoKSxcclxuXHRcdFx0XHRvcGVuID0gJChcIiNzdWJqZWN0T3BlblwiKS5wcm9wKCdjaGVja2VkJyk/MTowLFxyXG5cdFx0XHRcdGd1ZXN0ID0gJChcIiNzdWJqZWN0R3Vlc3RcIikucHJvcCgnY2hlY2tlZCcpPzE6MDtcclxuXHJcblx0XHRcdGlmKHRpdCA9PSAnJyl7XHJcblx0XHRcdFx0YWxlcnQoJ+i/mOayoeacieWhq+WGmeagh+mimCcpO1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdHRpdGxlIDogdGl0LFxyXG5cdFx0XHRcdG1hcmsgOiBtYXJrLFxyXG5cdFx0XHRcdHByaXZhdGUgOiBvcGVuLFxyXG5cdFx0XHRcdGd1ZXN0IDogZ3Vlc3QsXHJcblx0XHRcdFx0bWVtYmVycyA6IF90aGlzLmdldE1hbmFnZUxpc3QoKSxcclxuXHRcdFx0XHRzdWJqZWN0TGFiZWxzIDogX3RoaXMuZ2V0TGFiZWxMaXN0KCksXHJcblx0XHRcdFx0YXJ0aWNsZUxhYmVscyA6IFtdLFxyXG5cdFx0XHRcdHJlc291cmNlcyA6IF90aGlzLmdldFJlc0xpc3QoKVxyXG5cdFx0XHR9XHRcdFxyXG5cdFx0XHRcclxuXHRcdFx0aWYoX3RoaXMuaXNlZGl0KXtcclxuXHRcdFx0XHRwYXJhbS5zdWJqZWN0SWQgPSBfdGhpcy5lZGl0RGF0YS5pZDtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGlmKHBhcmFtLnRpdGxlICE9PSAnJyAmJiBwYXJhbS5tYXJrICE9PSAnJyl7XHJcblx0XHRcdFx0X3RoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRcdFx0aWYoX3RoaXMuaXNlZGl0KXtcclxuXHRcdFx0XHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RVcGRhdGUnLHJlcy5kYXRhKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuZG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRcdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdFx0XHRcdFx0XHRcdGxpc3QgOiBbcmVzLmRhdGFdXHJcblx0XHRcdFx0XHRcdFx0fSk7XHJcblx0XHRcdFx0XHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RDcmVhdGVkJyk7XHJcblx0XHRcdFx0XHRcdFx0JChcIiNteVN1YmplY3RcIikucHJlcGVuZChodG1sKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHJcblx0fSk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvY3JlYXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFMaXN0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9yZXR1cm4gbmV3IGFydGljbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJ0aWNsZSgpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5vcmRlcmJ5ID0gJ2NyZWF0ZVRpbWUnO1xyXG5cclxuXHR0aGlzLnN1YmlkID0gbm93U3ViSWQ7XHJcblx0dGhpcy5tc2cgPSB3aW5kb3cuc3RyaWtlci5tc2c7XHJcblxyXG5cdHRoaXMucmRhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5zZWFyY2goKTtcclxufVxyXG5cclxuLy/miorlm57lpI3nm7jlhbPnmoTkuJzkuJznu5Hlrprov5vmnaVcclxuYXJ0aWNsZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9iail7XHJcblx0dGhpcy5jb21tZW50UG9zdCA9IG9iai5wb3N0O1xyXG59XHJcblxyXG4vL+iuoeeul+WbvueJh+eahOS4quaVsFxyXG5hcnRpY2xlLnByb3RvdHlwZS5nZXRpbWcgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbnVtID0gMDtcclxuXHRpZihkYXRhKXtcclxuXHRcdGZvcih2YXIgaSA9MCxsPWRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGRhdGFbaV07XHJcblx0XHRcdGlmKGl0ZW0udHlwZSA9PT0gMSl7XHJcblx0XHRcdFx0bnVtKys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG51bTtcclxufVxyXG5cclxuLy/nu5Hlrprkuovku7ZcclxuYXJ0aWNsZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRzdHJpa2VyLmJpbmQoJ25ld2FydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5wcmVwZW5kVG9MaXN0KGQpO1xyXG5cdH0pXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZTpvcmRlcmJ5dXBkYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMub3JkZXJCeVVwZGF0ZSgpO1xyXG5cdH0pXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZTpvcmRlcmJ5Y3JlYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMub3JkZXJCeUNyZWF0ZSgpO1xyXG5cdH0pXHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIHNjcm9sbERvbSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgdmFyIHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSBzY3JvbGxEb20uc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxEb20uc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuWIsOW6leS6hlxyXG4gICAgICAgIGlmKHNjcm9sbFRvcCArIHBhZ2VIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW5kJyk7XHJcbiAgICAgICAgICAgIF90aGlzLmxvYWRNb3JlKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH0pO1x0XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pICAgIFxyXG59XHJcblxyXG4vL+aMieabtOaWsOaXtumXtOaOkuW6j1xyXG5hcnRpY2xlLnByb3RvdHlwZS5vcmRlckJ5VXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLm9yZGVyYnkgPSAndXBkYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyYnlcclxuXHR9KTtcclxufVxyXG4vL+aMieWPkeihqOaXtumXtOaOkuW6j1xyXG5hcnRpY2xlLnByb3RvdHlwZS5vcmRlckJ5Q3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLm9yZGVyYnkgPSAnY3JlYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyYnlcclxuXHR9KTtcdFxyXG59XHJcblxyXG5cclxuLy/liqDovb3mm7TlpJpcclxuYXJ0aWNsZS5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyB8fCB0aGlzLmVuZCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlcmJ5XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6aqM6K+B5pWw5o2uXHJcbmFydGljbGUucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpID0gMCxsPWRhdGEubGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdGl0ZW0uaW1nbnVtID0gdGhpcy5nZXRpbWcoaXRlbS5yZXNvdXJjZSk7XHJcblx0XHR0aGlzLnJkYXRhW2l0ZW0uaWRdID0gaXRlbS5yZXNvdXJjZTtcclxuXHRcdGxpc3QucHVzaChpdGVtKTtcclxuXHR9XHJcblx0ZGF0YS5saXN0ID0gbGlzdDtcclxuXHRkYXRhLnNpZCA9IG5vd1N1YklkO1xyXG5cdHJldHVybiBkYXRhO1xyXG59XHJcblxyXG4vL+aLieW4luWtkOWIl+ihqFxyXG5hcnRpY2xlLnByb3RvdHlwZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdGlmKCFwYXJhbSl7XHJcblx0XHRwYXJhbSA9IHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyYnlcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFxyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy50b3RhbCA9IHJlcy5kYXRhLnRvdGFsO1xyXG5cdFx0XHRfdGhpcy5sZW5ndGggKz0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XHJcblx0XHRcdF90aGlzLnN0YXJ0ICs9IF90aGlzLmxpbWl0O1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHR2YXIgZGF0YSA9IF90aGlzLmNoZWNrRGF0YShyZXMuZGF0YSk7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1xyXG5cclxuXHRcdFx0aWYocmVzLmRhdGEudG9wLmxlbmd0aCl7XHJcblx0XHRcdFx0dmFyIGh0bWwxID0gdG1wbC50b3Aoe1xyXG5cdFx0XHRcdFx0bGlzdCA6IHJlcy5kYXRhLnRvcFxyXG5cdFx0XHRcdH0pXHJcblx0XHRcdFx0JChcIiNhcnRpY2xlVG9wXCIpLmh0bWwoaHRtbDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmRvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdGlmKF90aGlzLmxlbmd0aCA+PSBfdGhpcy50b3RhbCl7XHJcblx0XHRcdFx0X3RoaXMuZW5kID0gdHJ1ZTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhciA9IHBhcnNlSW50KHRoaXMudGFyZ2V0LmRhdGEoJ3N0YXR1cycpKTtcclxuXHJcblx0aWYoIXN0YXIpe1xyXG5cdFx0c3RhciA9IDA7XHJcblx0fVxyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGFydGljbGVJZCA6IGlkLFxyXG5cdFx0XHRpc1N0YXIgOiBzdGFyID8gMCA6MVxyXG5cdFx0fTtcclxuXHRcdHZhciB0ZXh0ID0gc3Rhcj8n6LWeJzon5bey6LWeJztcclxuXHRcdGNnaS5zdGFyKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uZGF0YSgnc3RhdHVzJyxwYXJhbS5pc1N0YXIpO1xyXG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5jb2xsZWN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGFydGljbGVJZCA6IGlkXHJcblx0XHR9O1xyXG5cdFx0Y2dpLmNvbGxlY3QocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5hdHRyKCdkYXRhLWlkJywwKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5tc2cuY29uZmlybSgn56Gu5a6a6KaB5Yig6Zmk6K+l5biW5a2QPycsbnVsbCxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0YXJ0aWNsZUlkIDogaWRcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2dpWydkZWxldGUnXShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdCQoXCIuYXJ0aWNsZVwiK2lkKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5yZXBsYXkgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0dGhpcy5jb21tZW50UG9zdC5zaG93UG9zdChpZCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxyXG5hcnRpY2xlLnByb3RvdHlwZS5wcmVwZW5kVG9MaXN0ID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdHZhciBkYXRhID0gdGhpcy5jaGVja0RhdGEoe2xpc3Q6W3BhcmFtXX0pO1xyXG5cdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1xyXG5cclxuXHR0aGlzLmRvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG4vL+mihOiniOS4u+mimOebuOWFs+i1hOa6kFxyXG5hcnRpY2xlLnByb3RvdHlwZS5yZXZpZXcgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwaWQgPSB0YXJnZXQuZGF0YSgncGlkJyksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ3Jldmlldycse1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRsaXN0IDogdGhpcy5yZGF0YVtwaWRdXHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbmFMaXN0LmFydGljbGUgPSBhcnRpY2xlO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9saXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwiZnVuY3Rpb24gZW1wdHlGdW4ocmVzKXtcclxuXHRjb25zb2xlLmxvZyhyZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1VybCh1cmwpe1xyXG5cdGlmKHVybC5pbmRleE9mKCc/Jyk+PTApe1xyXG5cdFx0cmV0dXJuIHVybCArPScmX3Q9JytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiB1cmwgKz0nP190PScrbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdQT1NUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogY2hlY2tVcmwodXJsKSxcclxuXHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheChvcHQsY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXHJcblx0XHR1cmwgPSBvcHQudXJsLFxyXG5cdFx0ZGF0YSA9IG9wdC5kYXRhO1xyXG5cclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlIDogdHlwZSxcclxuXHRcdHVybCA6IGNoZWNrVXJsKHVybCksXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGU8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3JOYW1lJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgICAgICAgaWYoaW1nbnVtPjIpe1xcclxcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xcclxcbiAgICAgICAgICAgICAgICB9XFxyXFxuICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgZGF0YS1waWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtb2JqLmlkJT5cIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpbWdudW0rKztcXHJcXG4gICAgICAgICAgICAgICAgaWYoZmlyc3Qpe1xcclxcbiAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XFxyXFxuICAgICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxPCUtaXRlbS5pbWdudW0lPuW8oDwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGUnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgXCIgICDmnIDlkI7lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0udXBkYXRvck5hbWUpLCAnPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5zdWJqZWN0X2lkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1nbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZ251bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IGl0ZW0ucmVzb3VyY2UubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdudW0gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBvYmouaWQpLCAnXCIgZGF0YS1waWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMCwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzAsIG9iai5pZCksICdcIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1nbnVtKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbFcIiwgKF9fc3RhY2subGluZW5vID0gMzYsIGl0ZW0uaW1nbnVtKSwgXCLlvKA8L3NwYW4+XFxuICAgICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPSAwO2k8bGlzdC5sZW5ndGg7aSsrKXtcXHJcXG52YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpPjxzcGFuIGNsYXNzPVwiZnVpLWhlYXJ0XCI+PC9zcGFuPue9rumhtu+8mjxhIGhyZWY9XCIvYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS50aXRsZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvdG9wLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICA8c3BhbiBkYXRhLWFjdGlvbj1cImxvZ291dFwiPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIiA+PHNwYW4+PC9zcGFuPjxkaXY+PC9kaXY+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCI+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgICA8c3BhbiBkYXRhLWFjdGlvbj1cImxvZ291dFwiPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxyXFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcclxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcclxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXHJcXG4gICAgPC9zcGFuPlxcclxcbjwvZGl2PiBcXHJcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXHJcXG4gIDx1bD5cXHJcXG4gIDwlXFxyXFxuICAgIGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gICAgICBpdGVtID0gbGlzdFtpXTtcXHJcXG4gICU+IFxcclxcbiAgICAgIDxsaSBpZD1cInVzZXI8JS1pdGVtLmlkJT5cIiBjbGFzcz1cInVzZXI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiPjwlLWl0ZW0ubmFtZSU+PC9saT5cXHJcXG4gIDwlfSU+XFxyXFxuICA8L3VsPlxcclxcbjwvZGl2PiAgJyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXG4gICAgPC9zcGFuPlxcbjwvZGl2PiBcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXG4gIDx1bD5cXG4gICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFxcbiAgICAgIDxsaSBpZD1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBjbGFzcz1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCBcIjwvbGk+XFxuICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICA8L3VsPlxcbjwvZGl2PiAgXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZTwlLWlkJT5cIiBkYXRhLWlkPVwiPCUtaWQlPlwiPlxcclxcblx0PCUtbmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZScsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDIsIG5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgaW4gbGlzdCl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuXHR2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcXHJcXG4lPlxcclxcbjxsaSB0aXRsZT1cIjwlLWl0ZW0ubWVzc2FnZSU+XCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLW9iai5hcnRpY2xlSWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLXJlYWQ9XCI8JS1pdGVtLnJlYWQlPlwiPjwlLWl0ZW0ubWVzc2FnZSU+PC9hPjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubWVzc2FnZSksICdcIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNiwgb2JqLmFydGljbGVJZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5pZCksICdcIiBkYXRhLXJlYWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLnJlYWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5tZXNzYWdlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21zZy5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0XHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcclxcblx0PC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG5cdFx0JywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jlc291cmNlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+PCUtcHJvVGV4dCU+PC9zcGFuPlxcclxcbiAgICAgICAgPCVpZihwcm9UZXh0PT09XFwn5oiR5Yib5bu655qEXFwnKXslPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgICA8L2Rpdj5cXHJcXG5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XFxyXFxuICAgICAgICDlhbE8c3BhbiBpZD1cIjwlLXByb05hbWUlPk51bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICBcXHJcXG4gICAgPC9oZWFkZXI+XFxyXFxuXFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIjwlLXByb05hbWUlPlwiPlxcclxcbiAgICAgICAgICAgICAgICAgXFxyXFxuICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyLXRvcFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGVmdFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmdWktdXNlclwiPicsIChfX3N0YWNrLmxpbmVubyA9IDMsIHByb1RleHQpLCBcIjwvc3Bhbj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ7XG4gICAgICAgICAgICAgICAgaWYgKHByb1RleHQgPT09IFwi5oiR5Yib5bu655qEXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZ1aS1wbHVzXCIgIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCIgZGF0YS1hY3Rpb249XCJjcmVhdGVcIj7liJvlu7rkuLvpopg8L2E+PC9zcGFuPlxcbiAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDwvZGl2PlxcblxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cXG4gICAgICAgIOWFsTxzcGFuIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIHByb05hbWUpLCAnTnVtXCI+MjA8L3NwYW4+5Liq5Li76aKYIDxhIGNsYXNzPVwicHJlLXBhZ2VcIiBkYXRhLWFjdGlvbj1cInByZVwiPuS4iuS4gOmhtTwvYT4gPGEgY2xhc3M9XCJuZXh0LXBhZ2VcIiBkYXRhLWFjdGlvbj1cIm5leHRcIj7kuIvkuIDpobU8L2E+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHRpbWUgYWN0aXZlXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlXCIgIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1kb3duXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgIFxcbiAgICA8L2hlYWRlcj5cXG5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlzdFwiIGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTksIHByb05hbWUpLCAnXCI+XFxuICAgICAgICAgICAgICAgICBcXG4gICAgPC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9zaXplLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgPCVcXHJcXG4gICAgXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgIFx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAgICU+XFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD7liJvlu7rkurogPCUtaXRlbS5jcmVhdG9yTmFtZSU+IOWIm+W7uuaXtumXtCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLmNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0udXBkYXRlVGltZSklPiDkuLvpopjotYTmupAgPCUtaXRlbS5yZXNvdXJjZUNvdW50JT4gPCUtaXRlbS5tZW1iZXJDb3VudCU+5Liq5oiQ5ZGYIDwlLWl0ZW0uYXJ0aWNsZUNvdW50JT7kuKrluJblrZAgPCUtaXRlbS5yZXNvdXJjZUNvdW50JT7kuKrotYTmupA8L2RkPlxcclxcbiAgICAgIDwvZGw+IFxcclxcbiAgICA8JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgIDxkbCBjbGFzcz1cImFydC1saXN0XCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD7liJvlu7rkurogXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiDliJvlu7rml7bpl7QgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0uY3JlYXRlVGltZSkpLCBcIiDmnIDov5Hmm7TmlrAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCBcIiDkuLvpopjotYTmupAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVzb3VyY2VDb3VudCksIFwiIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLm1lbWJlckNvdW50KSwgXCLkuKrmiJDlkZggXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uYXJ0aWNsZUNvdW50KSwgXCLkuKrluJblrZAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQPC9kZD5cXG4gICAgICA8L2RsPiBcXG4gICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3QvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZHQ+PCUtdGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6IDwlLWNyZWF0b3JOYW1lJT4g5Yib5bu65pe26Ze0IDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKHVwZGF0ZVRpbWUpJT48L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuS4u+mimOi1hOa6kCA8JS1zdWJqZWN0UmVzb3VyY2VDb3VudCU+IDwlLW1lbWJlckNvdW50JT7kuKrmiJDlkZggPCUtYXJ0aWNsZUNvdW50JT7kuKrluJblrZAgPCUtYXJ0aWNsZVJlc291cmNlQ291bnQlPuS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIDwlLWFydGljbGVDcmVhdGVDb3VudCU+LzEyPC9kZD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVBcnRpY2xlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkeW4ljwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuIDwlaWYoZm9sbG93KXslPmZvbGxvd2VkPCV9JT5cIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPjwlaWYoZm9sbG93KXslPuW3suWFs+azqDwlfWVsc2V7JT7lhbPms6g8JX0lPjwvYT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBtYW5hZ2UtYnRuXCIgZGF0YS1hY3Rpb249XCJtYW5hZ2VcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiPjxzcGFuIGNsYXNzPVwibWFuYWdlXCI+PC9zcGFuPueuoeeQhjwvYT48L3NwYW4+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYWN0aWNlLWFjdC1zZWxlY3RcIj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdDItY29udGFpbmVyIGZvcm0tY29udHJvbCBzZWxlY3Qgc2VsZWN0LXByaW1hcnlcIiBpZD1cInMyaWRfYXV0b2dlbjFcIj5cXHJcXG4gICAgICAgICAgICA8IS0tXFxyXFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwic2VsZWN0Mi1jaG9pY2VcIiB0YWJpbmRleD1cIi0xXCI+ICAgXFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItY2hvc2VuXCIgaWQ9XCJzZWxlY3QyLWNob3Nlbi0yXCI+5oyJ5biW5a2Q5qCH562+562b6YCJPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPGFiYnIgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaC1jaG9pY2UtY2xvc2VcIj48L2FiYnI+IFxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWFycm93XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwvYT5cXHJcXG4gICAgICAgICAgICAtLT48bGFiZWwgZm9yPVwiczJpZF9hdXRvZ2VuMlwiIGNsYXNzPVwic2VsZWN0Mi1vZmZzY3JlZW5cIj48L2xhYmVsPjxpbnB1dCBjbGFzcz1cInNlbGVjdDItZm9jdXNzZXIgc2VsZWN0Mi1vZmZzY3JlZW5cIiB0eXBlPVwidGV4dFwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWxsZWRieT1cInNlbGVjdDItY2hvc2VuLTJcIiBpZD1cInMyaWRfYXV0b2dlbjJcIj48L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlb3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWF1dG8tcmVmdXNlXCI+XFxyXFxuICAgICAgICAgIDwhLS3oh6rliqjliLfmlrA6IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWFjdGlvbj1cInN1YmplY3QuYXV0b3JlZnJlc2hcIiAvPi0tPlxcclxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxyXFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgPC9kZD4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICA8ZHQ+XCIsIChfX3N0YWNrLmxpbmVubyA9IDEsIHRpdGxlKSwgJzwvZHQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDIsIGNyZWF0b3JOYW1lKSwgXCIg5Yib5bu65pe26Ze0IFwiLCAoX19zdGFjay5saW5lbm8gPSAyLCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShjcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gMiwgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSkpLCAnPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7kuLvpopjotYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCBcIiBcIiwgKF9fc3RhY2subGluZW5vID0gMywgbWVtYmVyQ291bnQpLCBcIuS4quaIkOWRmCBcIiwgKF9fc3RhY2subGluZW5vID0gMywgYXJ0aWNsZUNvdW50KSwgXCLkuKrluJblrZAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDMsIGFydGljbGVSZXNvdXJjZUNvdW50KSwgXCLkuKrotYTmupAg5oiR55qE5Y+R5biWL+WbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gMywgYXJ0aWNsZUNyZWF0ZUNvdW50KSwgJy8xMjwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYWN0LWJ0blwiPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBhdFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlQXJ0aWNsZVwiPjxzcGFuIGNsYXNzPVwicG9zdFwiPjwvc3Bhbj7lj5HluJY8L2E+PC9zcGFuPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cInBhdFwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZm9sbG93LWJ0biAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgaWYgKGZvbGxvdykge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcImZvbGxvd2VkXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcIiBkYXRhLWFjdGlvbj1cImZvbGxvd1wiPjxzcGFuIGNsYXNzPVwiZm9sbG93XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey5YWz5rOoXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBtYW5hZ2UtYnRuXCIgZGF0YS1hY3Rpb249XCJtYW5hZ2VcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiPjxzcGFuIGNsYXNzPVwibWFuYWdlXCI+PC9zcGFuPueuoeeQhjwvYT48L3NwYW4+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYWN0aWNlLWFjdC1zZWxlY3RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdDItY29udGFpbmVyIGZvcm0tY29udHJvbCBzZWxlY3Qgc2VsZWN0LXByaW1hcnlcIiBpZD1cInMyaWRfYXV0b2dlbjFcIj5cXG4gICAgICAgICAgICA8IS0tXFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwic2VsZWN0Mi1jaG9pY2VcIiB0YWJpbmRleD1cIi0xXCI+ICAgXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItY2hvc2VuXCIgaWQ9XCJzZWxlY3QyLWNob3Nlbi0yXCI+5oyJ5biW5a2Q5qCH562+562b6YCJPC9zcGFuPlxcbiAgICAgICAgICAgICAgPGFiYnIgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaC1jaG9pY2UtY2xvc2VcIj48L2FiYnI+IFxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWFycm93XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+PC9zcGFuPlxcbiAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAtLT48bGFiZWwgZm9yPVwiczJpZF9hdXRvZ2VuMlwiIGNsYXNzPVwic2VsZWN0Mi1vZmZzY3JlZW5cIj48L2xhYmVsPjxpbnB1dCBjbGFzcz1cInNlbGVjdDItZm9jdXNzZXIgc2VsZWN0Mi1vZmZzY3JlZW5cIiB0eXBlPVwidGV4dFwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWxsZWRieT1cInNlbGVjdDItY2hvc2VuLTJcIiBpZD1cInMyaWRfYXV0b2dlbjJcIj48L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlb3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWF1dG8tcmVmdXNlXCI+XFxuICAgICAgICAgIDwhLS3oh6rliqjliLfmlrA6IDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWFjdGlvbj1cInN1YmplY3QuYXV0b3JlZnJlc2hcIiAvPi0tPlxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgPC9kZD4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzXG4gKiogbW9kdWxlIGlkID0gNDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPuWPguS4juS6uiA8JS1tZW1iZXJDb3VudCU+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+57uf6K6hPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbmF2PlxcclxcblxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1hc2lkZS1pbWdcIj5cXHJcXG4gICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMFwiIHNyYz1cImh0dHA6Ly9pbWdzcmMuYmFpZHUuY29tL2ZvcnVtL3clM0Q1ODAvc2lnbj0zYjk1Y2VjNzBjMzM4NzQ0OWNjNTJmNzQ2MTBlZDkzNy9mMDc0ZDBmYzFlMTc4YTgyNzRiMGVmMzdmNjAzNzM4ZGE4NzdlODY4LmpwZ1wiIC8+XFxyXFxuICAgICAgICAgICAg6aKE6KeIICDmoIfms6gg5LiL6L29ICDliKDpmaRcXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgZm9yKHZhciBpIGluIHJlc291cmNlTGlzdCl7XFxyXFxuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcXHJcXG4gICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgICAgICAgICAgPCVpZihpdGVtLnR5cGUgPT09IDEpeyU+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMFwiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiB0aXRsZT1cIjwlLWl0ZW0ubmFtZSU+XCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcclxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT4gIFxcclxcbiAgICAgICAgICAgICAgPCVpZihteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKXsgJT5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+5Yig6ZmkPC9hPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8JX1lbHNlIGlmKGl0ZW0udHlwZSA9PT0gNCB8fCBpdGVtLnR5cGUgPT09Myl7JT5cXHJcXG4gICAgICAgICAgICAgIDx2aWRlbyBzcmM9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5cXHJcXG4gICAgICAgICAgICAgIOaCqOeahOa1j+iniOWZqOS4jeaUr+aMgSB2aWRlbyDmoIfnrb7jgIJcXHJcXG4gICAgICAgICAgICAgIDwvdmlkZW8+XFxyXFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwibWFya1wiIHN0eWxlPVwiXCI+5qCH5rOoPC9hPiAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPCV9ZWxzZXslPlxcclxcbiAgICAgICAgICAgICAgPHA+PCUtaXRlbS5uYW1lJT48L3A+XFxyXFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pdGVtLmlkJT5cIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxyXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcclxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxyXFxuICAgICAgICAgICAgICA8JX0lPiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgJzwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPue7n+iuoTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L25hdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtYXNpZGUtaW1nXCI+XFxuICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCI+XFxuICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyMDBcIiBzcmM9XCJodHRwOi8vaW1nc3JjLmJhaWR1LmNvbS9mb3J1bS93JTNENTgwL3NpZ249M2I5NWNlYzcwYzMzODc0NDljYzUyZjc0NjEwZWQ5MzcvZjA3NGQwZmMxZTE3OGE4Mjc0YjBlZjM3ZjYwMzczOGRhODc3ZTg2OC5qcGdcIiAvPlxcbiAgICAgICAgICAgIOmihOiniCAg5qCH5rOoIOS4i+i9vSAg5Yig6ZmkXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAtLT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1saXN0XCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlc291cmNlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtJywgKF9fc3RhY2subGluZW5vID0gMjEsIGl0ZW0uaWQpLCAnXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0ubmFtZSksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDQgfHwgaXRlbS50eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICA8dmlkZW8gc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyOSwgaXRlbS5pZCksICdcIiBjb250cm9scz1cImNvbnRyb2xzXCI+XFxuICAgICAgICAgICAgICDmgqjnmoTmtY/op4jlmajkuI3mlK/mjIEgdmlkZW8g5qCH562+44CCXFxuICAgICAgICAgICAgICA8L3ZpZGVvPlxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cIm1hcmtcIiBzdHlsZT1cIlwiPuagh+azqDwvYT4gIDxhIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMiwgaXRlbS5pZCksICdcIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIj7pooTop4g8L2E+ICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMiwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzM7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzQsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8cD5cIiwgKF9fc3RhY2subGluZW5vID0gMzcsIGl0ZW0ubmFtZSksICc8L3A+XFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzOCwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNDAsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0MTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICAgICAgICBcXG4gICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQyO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2FzaWRlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0OVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZGV4LmpzIn0=