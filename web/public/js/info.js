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
	var user = __webpack_require__(4),
		subject = __webpack_require__(12),
		article = __webpack_require__(13),
		comment = __webpack_require__(7),
		msg = __webpack_require__(8),
		notify = __webpack_require__(9),
		review = __webpack_require__(10),
		label = __webpack_require__(11);
	var Striker = $(window.striker),
		striker = window.striker;	
	
	var nowSubId = striker.util.getParameter('id');
	
	
	//事件通知,用户资料已经加载完成
	//主题列表的通知事件
	function userLoadSub(e,d){
		window.striker.label = new label.label('labelArea');
		var subInfo = new subject.info(nowSubId);
		var subPost = new subject.create(nowSubId);
		var articleList = new article.list(nowSubId);
		var cpost = new comment.post(0,nowSubId); 
	
		new notify.notify();
	
		subInfo.bind({
			post : subPost
		});
		cpost.bind({
			list : articleList
		});
		articleList.bind({
			post : cpost
		});
	}
	
	function userLoadArt(e,d){
	
	}
	//帖子发表成功
	function articlePosted(e,d){
	
	}
	
	//帖子被删除
	function articleDeled(e,d){
	
	}
	
	//帖子关注成功
	function articleFollowed(e,d){
	
	}
	
	//事件通知,主题已经加载完成
	function subjectLoad(e,d){
		console.log(e,d);
	}
	
	var handlers = {
		'userLoadSub' : userLoadSub,
		'userLoadArt' : userLoadArt,
		'subjectLoad' : subjectLoad,
		'articlePosted' : articlePosted
	}
	
	for(var i in handlers){
		Striker.bind(i,handlers[i]);
	}
	
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
		subject.init('info');
	
		striker.subject = subject;
		striker.article = article;
		striker.user = user;
	
		article.init(nowSubId);
		
		window.striker.msg = new msg.message();
	
		
		user.init();
		label.init();
	
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
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).user,
		logout = __webpack_require__(14).logout,
		data = __webpack_require__(15).user,
		userManage = __webpack_require__(16),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(28),
		manage : __webpack_require__(29),
		onemanage : __webpack_require__(30)
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
/* 5 */
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
		list : __webpack_require__(27),
		rlist : __webpack_require__(33)   //资源列表
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
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).comment;
	var tmpl = {
		list : __webpack_require__(27),
		rlist : __webpack_require__(33)   //资源列表
	};
	
	var Comment = {}
	
	var post = function(id,sid){
		this.dom = $("#postArea");
		this.popDom = $("#createComment");
		this.contentDom = this.dom.find('input[name=name]');
		this.popContentDom = this.popDom.find('textarea[name=content]');
		this.popTitleDom = this.popDom.find('input[name=name]');
		this.cresDom = this.popDom.find('.pop-res');
		this.ctitDom = this.popDom.find('.modal-title');
		console.log(this.ctitDom);
	
		this.artId = id;
		this.subId = sid;	
	
		this.resList = [];
		this.resMap = {};
	
		this.bindAction();
		this.loading = false;
		this.fileupload = false;
		this.isEdit = false;
		// articleList.init(id,cgi,tmpl);
		// articlePost.init(id,cgi,tmpl);
	}
	
	//取选择的资源
	post.prototype.getResList = function(){
		var list = [];
		for(var i in this.resMap){
			list.push(this.resMap[i].id);
		}
		return list;
	}
	
	post.prototype.bind = function(obj){
		this.articleList = obj.list;
	}
	
	post.prototype.changeArticle = function(id){
		this.artId = id;
	}
	
	post.prototype.bindFun = function(list){
		this.cList = list;
	}
	
	post.prototype.replay = function(id,name){
		this.contentDom.val('回复 '+name+':');
	}
	
	post.prototype.create = function(){
		var content = this.contentDom.val();
		var _this = this;
		if(content === ''){
			return;
		}
		this.loading = true;
		var param = {
			subjectId : this.subId,
			articleId : this.artId,
			content : content,
			title : '',
			label : [],
			resources : this.getResList()
		};
	
		cgi.create(param,function(res){
			_this.loading = false;
			if(res.code === 0){
				_this.cList.append(res.data);
				_this.contentDom.val('');
			}
		});
	}
	
	post.prototype.edit = function(d){
		this.isEdit = true;
		this.popContentDom.val(d.content);
		this.popTitleDom.val(d.title);
		this.data = d;
	
		if(d.resource){
			for(var i in d.resource){
				var item = d.resource[i];
				this.resList.push(item.id);
				this.resMap[item.id] = item;
			}
			var html = tmpl.rlist({
				list : d.resource
			});
			this.cresDom.append(html).show();	
		}
		this.popDom.modal('show');
	}
	
	post.prototype.post = function(){
	
		var content = this.popContentDom.val();
		var title = this.popTitleDom.val();
		var _this = this;
		if(content === ''){
			return;
		}
		this.loading = true;
		var param = {
			subjectId : this.subId,
			articleId : this.artId,
			content : content,
			title : title,
			label : [],
			resources : this.getResList()
		};
	
		if(this.isEdit){
			param.commentId = this.data.id;
			this.loading = true;
			cgi.edit(param,function(res){
				_this.loading = false;
				if(res.code === 0){
					if(_this.cList){
						_this.cList.update(res.data);
					}
					_this.popContentDom.val('');
					_this.popTitleDom.val('');
					_this.popDom.modal('hide');
				}
			});
		}else{
			this.loading = true;
			cgi.create(param,function(res){
				_this.loading = false;
				if(res.code === 0){
					if(_this.cList){
						_this.cList.append(res.data);
					}
					_this.popContentDom.val('');
					_this.popTitleDom.val('');
					_this.popDom.modal('hide');
				}
			});
		}
	}
	
	post.prototype.reset = function(){
		
	}
	
	post.prototype.showPost = function(id){
		this.changeArticle(id);
		this.popDom.modal('show');
	}
	
	post.prototype.removeRes = function(e){
		var _this = this;
		var target = $(e.target),
			p = target.parent();
	
		var id = p.data('id');
		if(id){
			delete this.resMap[id];
			p.remove();
	
			if(this.popDom.find('.tag').length === 0){
				this.cresDom.hide();
			}
		}
	}
	
	post.prototype.bindAction = function(id,name){
		var _this = this;
	
		var uploadComp  = function(d){
			console.log('comment',d);
			_this.fileupload = false;
			if(d.code === 0){
				_this.resList.push(d.data.id);
				_this.resMap[d.data.id] = d.data;
	
				var html = tmpl.rlist({
					list : [d.data]
				});
				_this.cresDom.append(html).show();
			}
		}
	
		if(window.uploadComp){
			$(striker).bind('uploadFile',function(e,d){
				console.log('trigger',d);
				uploadComp(d);
			});
		}else{
			window.uploadComp = uploadComp;
		}
	
		$("#ccfileName").bind('change',function(e){
			var target = $(e.target);
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#ccfileForm").submit();
			}
		})	
	
		this.popDom.on('show.bs.modal', function (e) {
			if(_this.isEdit){
				_this.ctitDom.text('修改回复');
			}else{
				_this.ctitDom.text('新建回复');
			}
			
			setTimeout(function(){
				_this.popTitleDom.focus();
			},1000)		
			window.striker.commentshow = true;
		});
	
		this.popDom.on('hide.bs.modal', function (e) {
			window.striker.commentshow = false;
			_this.isEdit = false;
		});	
	
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		});
	
		this.popDom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		});	
	}
	
	Comment.post = post;
	module.exports = Comment;

/***/ },
/* 8 */
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//通知
	var notify = {},
		data = __webpack_require__(15).notify,
		cgi = __webpack_require__(14).notify;
	
	var tmpl = {
		list : __webpack_require__(31),
		one : __webpack_require__(32)   //资源列表
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	//
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	var tmpl = {
		body : __webpack_require__(35),
		main : __webpack_require__(36),
		list : __webpack_require__(37)
	}
	
	var striker = $(window.striker);
	
	var db = {}
	module.exports = db;
	
	var getSize = function(size){
	    var prec = 3;
	    var size = Math.round(Math.abs(size));
		var units = ['B','KB','MB',"GB","TB"];
	
		var unit =  Math.min(4, Math.floor(Math.log(size) / Math.log(2) / 10));
	
	    size = size * Math.pow(2, -10 * unit);
	    var digi = prec - 1 - Math.floor(Math.log(size) / Math.log(10));
	    size = Math.round(size * Math.pow(10, digi)) * Math.pow(10, -digi);
	    return getNums(size) + units[unit];    	
	}
	
	var getNums = function(x){
		if(x===0){
			return 0;
		}
		var f_x = parseFloat(x);  
		if (isNaN(f_x))  
		{  
		//alert('function:changeTwoDecimal->parameter error');  
			return 0;  
		}  
		var f_x = Math.ceil(x*100)/100;  
		var s_x = f_x.toString();  
		var pos_decimal = s_x.indexOf('.');  
		if (pos_decimal < 0)  
		{
			return f_x;
		}  
		while (s_x.length <= pos_decimal + 2)  
		{  
			s_x += '0';  
		} 
		return s_x;      	
	}
	
	var getTime;
	
	
	function review(data){
		getTime = window.striker.util.formatTime;
	
		this.bg = $('<div id="reviewBgs"></div>');
		this.dom = $('<div id="reviewWin"></div>');
		this.data = {};
		this.nowId = data.id;
		this.map = {};
		this.list = [];
		this.listItem = [];
	
	
		$('body').append(this.bg);
		$('body').append(this.dom);
	
		var html = tmpl.body();
		this.dom.html(html);
	
		this.reviewDiv = $("#reviewDiv");
		this.reviewBlock = $("#reviewBlock");
	
		this.checkData(data);
	
		this.showList();
		this.showOne();
	
		this.show();
		this.bindAction();
	};
	
	review.prototype.showList = function(id){
		var listHtml = tmpl.list({
			list : this.listItem,
			id : this.nowId
		});
		this.reviewBlock.html(listHtml);
	}
	
	review.prototype.showOne = function(id,idx){
		var nowId = id || this.nowId;
		var obj = this.data[nowId];
	
		if(obj){
			if(obj.type === 2){
				var html = tmpl.main(obj);
				this.reviewDiv.html(html);			
	              var purl = encodeURIComponent('/cgi/resource/preview?id='+obj.id);
	              $('#documentViewer').FlexPaperViewer(
	                { config : {
	                    SWFFile : purl,
	                    jsDirectory : '/js/lib/flex/',
	                    Scale : 0.8,
	                    ZoomTransition : 'easeOut',
	                    ZoomTime : 0.5,
	                    ZoomInterval : 0.2,
	                    FitPageOnLoad : true,
	                    FitWidthOnLoad : false,
	                    FullScreenAsMaxWindow : false,
	                    ProgressiveLoading : false,
	                    MinZoomSize : 0.2,
	                    MaxZoomSize : 5,
	                    SearchMatchAll : false,
	                    InitViewMode : 'Portrait',
	                    RenderingOrder : 'flash',
	                    StartAtPage : '',
	                    ViewModeToolsVisible : true,
	                    ZoomToolsVisible : true,
	                    NavToolsVisible : true,
	                    CursorToolsVisible : true,
	                    SearchToolsVisible : true,
	                    WMode : 'window',
	                    localeChain: 'zh_CN'
	                }}
	              );  		
	        }else if(obj.type === 8){
	        	var purl = 'cgi/resource/preview?id='+obj.id;
	        	var text = $.ajax({
					url: purl,
					async: false,
					error : function(data){
						return false;
					}
				}).responseText;
	
	        	obj.text = text;
	        	console.log(obj);
				var html = tmpl.main(obj);
				this.reviewDiv.html(html);
				console.log(text);
	        }else{
				var html = tmpl.main(obj);
				this.reviewDiv.html(html);        	
	        }
		}
	
	}
	
	review.prototype.checkData = function(data){
		var idx = 0;
		for(var i in data.list){
			var item = data.list[i];
			this.map[item.id] = idx;
			if(item.id === this.nowId){
				this.nowIdx = idx;
			}
			this.list.push(item.id);
			this.listItem.push(item);
	
			item.size = getSize(item.size);
			item.time = getTime(item.createTime);
			this.data[item.id] = item;
			idx++;
		}
	}
	
	review.prototype.show = function(){
		this.bg.show();
		this.dom.show();
	}
	
	review.prototype.hide = function(){
		this.bg.hide();
		this.dom.hide();	
	}
	
	//更换数据
	review.prototype.changeData = function(data){
		this.checkData(data);
		this.showList();
		this.showOne();
		this.show();
	}
	
	review.prototype.showNext = function(e){
		if(this.nowIdx < this.list.length-1){
			this.nowIdx++
		}
		this.nowId = this.list[this.nowId];
		this.reviewBlock.find('li').eq(this.nowIdx).click();
	}
	
	review.prototype.showPre = function(e){
		if(this.nowIdx > 0){
			this.nowIdx--;
		}
		this.nowId = this.list[this.nowId];
		this.reviewBlock.find('li').eq(this.nowIdx).click();
	}
	
	review.prototype.showIdx = function(e){
		
	}
	
	review.prototype.showFile = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			this.nowIdx = this.map[id];
			this.showOne(id);
			var list = this.reviewBlock.find('li');
			list.removeClass('selected');
			$("#review"+id).addClass('selected');
			//list[this.nowIdx].addClass('selected');
		}
	
	
	}
	
	review.prototype.bindAction = function(data){
		var _this = this;
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action && _this[action]){
				//_this.target = target;
				_this[action](e);
			}			
		})
	}
	
	review.prototype.close = function(){
		this.hide();
	}
	
	db.review = review;
	
	var rv;
	
	striker.bind('review',function(e,d){
		if(!rv){
			rv = new review(d);
		}else{
			rv.changeData(d);
		}
		console.log(d);
	
	});

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(14).label,
		data = __webpack_require__(15).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(38),
		one : __webpack_require__(39)
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//主题
	var cgi = __webpack_require__(14).subject,
		subjectList = __webpack_require__(21),
		subjectInfo = __webpack_require__(22),
		subjectCreate = __webpack_require__(23);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(40),
		manage : __webpack_require__(29), //管理员
		list : __webpack_require__(41),  //主题列表
		head : __webpack_require__(42),  //主题详情头部
		onemanage : __webpack_require__(30), //单个管理员
		aside : __webpack_require__(43),  //主题详情右边资源列表
		rlist : __webpack_require__(33)   //资源列表
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
		}else if (this.proName === 'open'){
			param.private = 1;
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

	var cgi = __webpack_require__(14).article;
	var tmpl = {
		list : __webpack_require__(27),
		top : __webpack_require__(44),
		rlist : __webpack_require__(33)   //资源列表
	};
	
	var articleList = __webpack_require__(24),
		articlePost = __webpack_require__(5);
	
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(25),
		message = __webpack_require__(8);
	
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

	/**
	 * @fileoverview Main function src.
	 */
	
	// HTML5 Shiv. Must be in <head> to support older browsers.
	document.createElement('video');
	document.createElement('audio');
	document.createElement('track');
	
	/**
	 * Doubles as the main function for users to create a player instance and also
	 * the main library object.
	 *
	 * **ALIASES** videojs, _V_ (deprecated)
	 *
	 * The `vjs` function can be used to initialize or retrieve a player.
	 *
	 *     var myPlayer = vjs('my_video_id');
	 *
	 * @param  {String|Element} id      Video element or video element ID
	 * @param  {Object=} options        Optional options object for config/settings
	 * @param  {Function=} ready        Optional ready callback
	 * @return {vjs.Player}             A player instance
	 * @namespace
	 */
	var vjs = function(id, options, ready){
	  var tag; // Element of ID
	
	  // Allow for element or ID to be passed in
	  // String ID
	  if (typeof id === 'string') {
	
	    // Adjust for jQuery ID syntax
	    if (id.indexOf('#') === 0) {
	      id = id.slice(1);
	    }
	
	    // If a player instance has already been created for this ID return it.
	    if (vjs.players[id]) {
	      return vjs.players[id];
	
	    // Otherwise get element for ID
	    } else {
	      tag = vjs.el(id);
	    }
	
	  // ID is a media element
	  } else {
	    tag = id;
	  }
	
	  // Check for a useable element
	  if (!tag || !tag.nodeName) { // re: nodeName, could be a box div also
	    throw new TypeError('The element or ID supplied is not valid. (videojs)'); // Returns
	  }
	
	  // Element may have a player attr referring to an already created player instance.
	  // If not, set up a new player and return the instance.
	  return tag['player'] || new vjs.Player(tag, options, ready);
	};
	
	// Extended name, also available externally, window.videojs
	var videojs = vjs;
	window.videojs = window.vjs = vjs;
	
	// CDN Version. Used to target right flash swf.
	vjs.CDN_VERSION = '4.3';
	vjs.ACCESS_PROTOCOL = ('https:' == document.location.protocol ? 'https://' : 'http://');
	
	/**
	 * Global Player instance options, surfaced from vjs.Player.prototype.options_
	 * vjs.options = vjs.Player.prototype.options_
	 * All options should use string keys so they avoid
	 * renaming by closure compiler
	 * @type {Object}
	 */
	vjs.options = {
	  // Default order of fallback technology
	  'techOrder': ['html5','flash'],
	  // techOrder: ['flash','html5'],
	
	  'html5': {},
	  'flash': {},
	
	  // Default of web browser is 300x150. Should rely on source width/height.
	  'width': 300,
	  'height': 150,
	  // defaultVolume: 0.85,
	  'defaultVolume': 0.00, // The freakin seaguls are driving me crazy!
	
	  // Included control sets
	  'children': {
	    'mediaLoader': {},
	    'posterImage': {},
	    'textTrackDisplay': {},
	    'loadingSpinner': {},
	    'bigPlayButton': {},
	    'controlBar': {}
	  },
	
	  // Default message to show when a video cannot be played.
	  'notSupportedMessage': 'Sorry, no compatible source and playback ' +
	      'technology were found for this video. Try using another browser ' +
	      'like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the ' +
	      'latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
	};
	
	// Set CDN Version of swf
	// The added (+) blocks the replace from changing this 4.3 string
	if (vjs.CDN_VERSION !== 'GENERATED'+'_CDN_VSN') {
	  videojs.options['flash']['swf'] = vjs.ACCESS_PROTOCOL + 'vjs.zencdn.net/'+vjs.CDN_VERSION+'/video-js.swf';
	}
	
	/**
	 * Global player list
	 * @type {Object}
	 */
	vjs.players = {};
	/**
	 * Core Object/Class for objects that use inheritance + contstructors
	 *
	 * To create a class that can be subclassed itself, extend the CoreObject class.
	 *
	 *     var Animal = CoreObject.extend();
	 *     var Horse = Animal.extend();
	 *
	 * The constructor can be defined through the init property of an object argument.
	 *
	 *     var Animal = CoreObject.extend({
	 *       init: function(name, sound){
	 *         this.name = name;
	 *       }
	 *     });
	 *
	 * Other methods and properties can be added the same way, or directly to the
	 * prototype.
	 *
	 *    var Animal = CoreObject.extend({
	 *       init: function(name){
	 *         this.name = name;
	 *       },
	 *       getName: function(){
	 *         return this.name;
	 *       },
	 *       sound: '...'
	 *    });
	 *
	 *    Animal.prototype.makeSound = function(){
	 *      alert(this.sound);
	 *    };
	 *
	 * To create an instance of a class, use the create method.
	 *
	 *    var fluffy = Animal.create('Fluffy');
	 *    fluffy.getName(); // -> Fluffy
	 *
	 * Methods and properties can be overridden in subclasses.
	 *
	 *     var Horse = Animal.extend({
	 *       sound: 'Neighhhhh!'
	 *     });
	 *
	 *     var horsey = Horse.create('Horsey');
	 *     horsey.getName(); // -> Horsey
	 *     horsey.makeSound(); // -> Alert: Neighhhhh!
	 *
	 * @class
	 * @constructor
	 */
	vjs.CoreObject = vjs['CoreObject'] = function(){};
	// Manually exporting vjs['CoreObject'] here for Closure Compiler
	// because of the use of the extend/create class methods
	// If we didn't do this, those functions would get flattend to something like
	// `a = ...` and `this.prototype` would refer to the global object instead of
	// CoreObject
	
	/**
	 * Create a new object that inherits from this Object
	 *
	 *     var Animal = CoreObject.extend();
	 *     var Horse = Animal.extend();
	 *
	 * @param {Object} props Functions and properties to be applied to the
	 *                       new object's prototype
	 * @return {vjs.CoreObject} An object that inherits from CoreObject
	 * @this {*}
	 */
	vjs.CoreObject.extend = function(props){
	  var init, subObj;
	
	  props = props || {};
	  // Set up the constructor using the supplied init method
	  // or using the init of the parent object
	  // Make sure to check the unobfuscated version for external libs
	  init = props['init'] || props.init || this.prototype['init'] || this.prototype.init || function(){};
	  // In Resig's simple class inheritance (previously used) the constructor
	  //  is a function that calls `this.init.apply(arguments)`
	  // However that would prevent us from using `ParentObject.call(this);`
	  //  in a Child constuctor because the `this` in `this.init`
	  //  would still refer to the Child and cause an inifinite loop.
	  // We would instead have to do
	  //    `ParentObject.prototype.init.apply(this, argumnents);`
	  //  Bleh. We're not creating a _super() function, so it's good to keep
	  //  the parent constructor reference simple.
	  subObj = function(){
	    init.apply(this, arguments);
	  };
	
	  // Inherit from this object's prototype
	  subObj.prototype = vjs.obj.create(this.prototype);
	  // Reset the constructor property for subObj otherwise
	  // instances of subObj would have the constructor of the parent Object
	  subObj.prototype.constructor = subObj;
	
	  // Make the class extendable
	  subObj.extend = vjs.CoreObject.extend;
	  // Make a function for creating instances
	  subObj.create = vjs.CoreObject.create;
	
	  // Extend subObj's prototype with functions and other properties from props
	  for (var name in props) {
	    if (props.hasOwnProperty(name)) {
	      subObj.prototype[name] = props[name];
	    }
	  }
	
	  return subObj;
	};
	
	/**
	 * Create a new instace of this Object class
	 *
	 *     var myAnimal = Animal.create();
	 *
	 * @return {vjs.CoreObject} An instance of a CoreObject subclass
	 * @this {*}
	 */
	vjs.CoreObject.create = function(){
	  // Create a new object that inherits from this object's prototype
	  var inst = vjs.obj.create(this.prototype);
	
	  // Apply this constructor function to the new object
	  this.apply(inst, arguments);
	
	  // Return the new object
	  return inst;
	};
	/**
	 * @fileoverview Event System (John Resig - Secrets of a JS Ninja http://jsninja.com/)
	 * (Original book version wasn't completely usable, so fixed some things and made Closure Compiler compatible)
	 * This should work very similarly to jQuery's events, however it's based off the book version which isn't as
	 * robust as jquery's, so there's probably some differences.
	 */
	
	/**
	 * Add an event listener to element
	 * It stores the handler function in a separate cache object
	 * and adds a generic handler to the element's event,
	 * along with a unique id (guid) to the element.
	 * @param  {Element|Object}   elem Element or object to bind listeners to
	 * @param  {String}   type Type of event to bind to.
	 * @param  {Function} fn   Event listener.
	 * @private
	 */
	vjs.on = function(elem, type, fn){
	  var data = vjs.getData(elem);
	
	  // We need a place to store all our handler data
	  if (!data.handlers) data.handlers = {};
	
	  if (!data.handlers[type]) data.handlers[type] = [];
	
	  if (!fn.guid) fn.guid = vjs.guid++;
	
	  data.handlers[type].push(fn);
	
	  if (!data.dispatcher) {
	    data.disabled = false;
	
	    data.dispatcher = function (event){
	
	      if (data.disabled) return;
	      event = vjs.fixEvent(event);
	
	      var handlers = data.handlers[event.type];
	
	      if (handlers) {
	        // Copy handlers so if handlers are added/removed during the process it doesn't throw everything off.
	        var handlersCopy = handlers.slice(0);
	
	        for (var m = 0, n = handlersCopy.length; m < n; m++) {
	          if (event.isImmediatePropagationStopped()) {
	            break;
	          } else {
	            handlersCopy[m].call(elem, event);
	          }
	        }
	      }
	    };
	  }
	
	  if (data.handlers[type].length == 1) {
	    if (document.addEventListener) {
	      elem.addEventListener(type, data.dispatcher, false);
	    } else if (document.attachEvent) {
	      elem.attachEvent('on' + type, data.dispatcher);
	    }
	  }
	};
	
	/**
	 * Removes event listeners from an element
	 * @param  {Element|Object}   elem Object to remove listeners from
	 * @param  {String=}   type Type of listener to remove. Don't include to remove all events from element.
	 * @param  {Function} fn   Specific listener to remove. Don't incldue to remove listeners for an event type.
	 * @private
	 */
	vjs.off = function(elem, type, fn) {
	  // Don't want to add a cache object through getData if not needed
	  if (!vjs.hasData(elem)) return;
	
	  var data = vjs.getData(elem);
	
	  // If no events exist, nothing to unbind
	  if (!data.handlers) { return; }
	
	  // Utility function
	  var removeType = function(t){
	     data.handlers[t] = [];
	     vjs.cleanUpEvents(elem,t);
	  };
	
	  // Are we removing all bound events?
	  if (!type) {
	    for (var t in data.handlers) removeType(t);
	    return;
	  }
	
	  var handlers = data.handlers[type];
	
	  // If no handlers exist, nothing to unbind
	  if (!handlers) return;
	
	  // If no listener was provided, remove all listeners for type
	  if (!fn) {
	    removeType(type);
	    return;
	  }
	
	  // We're only removing a single handler
	  if (fn.guid) {
	    for (var n = 0; n < handlers.length; n++) {
	      if (handlers[n].guid === fn.guid) {
	        handlers.splice(n--, 1);
	      }
	    }
	  }
	
	  vjs.cleanUpEvents(elem, type);
	};
	
	/**
	 * Clean up the listener cache and dispatchers
	 * @param  {Element|Object} elem Element to clean up
	 * @param  {String} type Type of event to clean up
	 * @private
	 */
	vjs.cleanUpEvents = function(elem, type) {
	  var data = vjs.getData(elem);
	
	  // Remove the events of a particular type if there are none left
	  if (data.handlers[type].length === 0) {
	    delete data.handlers[type];
	    // data.handlers[type] = null;
	    // Setting to null was causing an error with data.handlers
	
	    // Remove the meta-handler from the element
	    if (document.removeEventListener) {
	      elem.removeEventListener(type, data.dispatcher, false);
	    } else if (document.detachEvent) {
	      elem.detachEvent('on' + type, data.dispatcher);
	    }
	  }
	
	  // Remove the events object if there are no types left
	  if (vjs.isEmpty(data.handlers)) {
	    delete data.handlers;
	    delete data.dispatcher;
	    delete data.disabled;
	
	    // data.handlers = null;
	    // data.dispatcher = null;
	    // data.disabled = null;
	  }
	
	  // Finally remove the expando if there is no data left
	  if (vjs.isEmpty(data)) {
	    vjs.removeData(elem);
	  }
	};
	
	/**
	 * Fix a native event to have standard property values
	 * @param  {Object} event Event object to fix
	 * @return {Object}
	 * @private
	 */
	vjs.fixEvent = function(event) {
	
	  function returnTrue() { return true; }
	  function returnFalse() { return false; }
	
	  // Test if fixing up is needed
	  // Used to check if !event.stopPropagation instead of isPropagationStopped
	  // But native events return true for stopPropagation, but don't have
	  // other expected methods like isPropagationStopped. Seems to be a problem
	  // with the Javascript Ninja code. So we're just overriding all events now.
	  if (!event || !event.isPropagationStopped) {
	    var old = event || window.event;
	
	    event = {};
	    // Clone the old object so that we can modify the values event = {};
	    // IE8 Doesn't like when you mess with native event properties
	    // Firefox returns false for event.hasOwnProperty('type') and other props
	    //  which makes copying more difficult.
	    // TODO: Probably best to create a whitelist of event props
	    for (var key in old) {
	      // Safari 6.0.3 warns you if you try to copy deprecated layerX/Y
	      if (key !== 'layerX' && key !== 'layerY') {
	        event[key] = old[key];
	      }
	    }
	
	    // The event occurred on this element
	    if (!event.target) {
	      event.target = event.srcElement || document;
	    }
	
	    // Handle which other element the event is related to
	    event.relatedTarget = event.fromElement === event.target ?
	      event.toElement :
	      event.fromElement;
	
	    // Stop the default browser action
	    event.preventDefault = function () {
	      if (old.preventDefault) {
	        old.preventDefault();
	      }
	      event.returnValue = false;
	      event.isDefaultPrevented = returnTrue;
	    };
	
	    event.isDefaultPrevented = returnFalse;
	
	    // Stop the event from bubbling
	    event.stopPropagation = function () {
	      if (old.stopPropagation) {
	        old.stopPropagation();
	      }
	      event.cancelBubble = true;
	      event.isPropagationStopped = returnTrue;
	    };
	
	    event.isPropagationStopped = returnFalse;
	
	    // Stop the event from bubbling and executing other handlers
	    event.stopImmediatePropagation = function () {
	      if (old.stopImmediatePropagation) {
	        old.stopImmediatePropagation();
	      }
	      event.isImmediatePropagationStopped = returnTrue;
	      event.stopPropagation();
	    };
	
	    event.isImmediatePropagationStopped = returnFalse;
	
	    // Handle mouse position
	    if (event.clientX != null) {
	      var doc = document.documentElement, body = document.body;
	
	      event.pageX = event.clientX +
	        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
	        (doc && doc.clientLeft || body && body.clientLeft || 0);
	      event.pageY = event.clientY +
	        (doc && doc.scrollTop || body && body.scrollTop || 0) -
	        (doc && doc.clientTop || body && body.clientTop || 0);
	    }
	
	    // Handle key presses
	    event.which = event.charCode || event.keyCode;
	
	    // Fix button for mouse clicks:
	    // 0 == left; 1 == middle; 2 == right
	    if (event.button != null) {
	      event.button = (event.button & 1 ? 0 :
	        (event.button & 4 ? 1 :
	          (event.button & 2 ? 2 : 0)));
	    }
	  }
	
	  // Returns fixed-up instance
	  return event;
	};
	
	/**
	 * Trigger an event for an element
	 * @param  {Element|Object} elem  Element to trigger an event on
	 * @param  {String} event Type of event to trigger
	 * @private
	 */
	vjs.trigger = function(elem, event) {
	  // Fetches element data and a reference to the parent (for bubbling).
	  // Don't want to add a data object to cache for every parent,
	  // so checking hasData first.
	  var elemData = (vjs.hasData(elem)) ? vjs.getData(elem) : {};
	  var parent = elem.parentNode || elem.ownerDocument;
	      // type = event.type || event,
	      // handler;
	
	  // If an event name was passed as a string, creates an event out of it
	  if (typeof event === 'string') {
	    event = { type:event, target:elem };
	  }
	  // Normalizes the event properties.
	  event = vjs.fixEvent(event);
	
	  // If the passed element has a dispatcher, executes the established handlers.
	  if (elemData.dispatcher) {
	    elemData.dispatcher.call(elem, event);
	  }
	
	  // Unless explicitly stopped or the event does not bubble (e.g. media events)
	    // recursively calls this function to bubble the event up the DOM.
	    if (parent && !event.isPropagationStopped() && event.bubbles !== false) {
	    vjs.trigger(parent, event);
	
	  // If at the top of the DOM, triggers the default action unless disabled.
	  } else if (!parent && !event.isDefaultPrevented()) {
	    var targetData = vjs.getData(event.target);
	
	    // Checks if the target has a default action for this event.
	    if (event.target[event.type]) {
	      // Temporarily disables event dispatching on the target as we have already executed the handler.
	      targetData.disabled = true;
	      // Executes the default action.
	      if (typeof event.target[event.type] === 'function') {
	        event.target[event.type]();
	      }
	      // Re-enables event dispatching.
	      targetData.disabled = false;
	    }
	  }
	
	  // Inform the triggerer if the default was prevented by returning false
	  return !event.isDefaultPrevented();
	  /* Original version of js ninja events wasn't complete.
	   * We've since updated to the latest version, but keeping this around
	   * for now just in case.
	   */
	  // // Added in attion to book. Book code was broke.
	  // event = typeof event === 'object' ?
	  //   event[vjs.expando] ?
	  //     event :
	  //     new vjs.Event(type, event) :
	  //   new vjs.Event(type);
	
	  // event.type = type;
	  // if (handler) {
	  //   handler.call(elem, event);
	  // }
	
	  // // Clean up the event in case it is being reused
	  // event.result = undefined;
	  // event.target = elem;
	};
	
	/**
	 * Trigger a listener only once for an event
	 * @param  {Element|Object}   elem Element or object to
	 * @param  {String}   type
	 * @param  {Function} fn
	 * @private
	 */
	vjs.one = function(elem, type, fn) {
	  var func = function(){
	    vjs.off(elem, type, func);
	    fn.apply(this, arguments);
	  };
	  func.guid = fn.guid = fn.guid || vjs.guid++;
	  vjs.on(elem, type, func);
	};
	var hasOwnProp = Object.prototype.hasOwnProperty;
	
	/**
	 * Creates an element and applies properties.
	 * @param  {String=} tagName    Name of tag to be created.
	 * @param  {Object=} properties Element properties to be applied.
	 * @return {Element}
	 * @private
	 */
	vjs.createEl = function(tagName, properties){
	  var el, propName;
	
	  el = document.createElement(tagName || 'div');
	
	  for (propName in properties){
	    if (hasOwnProp.call(properties, propName)) {
	      //el[propName] = properties[propName];
	      // Not remembering why we were checking for dash
	      // but using setAttribute means you have to use getAttribute
	
	      // The check for dash checks for the aria-* attributes, like aria-label, aria-valuemin.
	      // The additional check for "role" is because the default method for adding attributes does not
	      // add the attribute "role". My guess is because it's not a valid attribute in some namespaces, although
	      // browsers handle the attribute just fine. The W3C allows for aria-* attributes to be used in pre-HTML5 docs.
	      // http://www.w3.org/TR/wai-aria-primer/#ariahtml. Using setAttribute gets around this problem.
	
	       if (propName.indexOf('aria-') !== -1 || propName=='role') {
	         el.setAttribute(propName, properties[propName]);
	       } else {
	         el[propName] = properties[propName];
	       }
	    }
	  }
	  return el;
	};
	
	/**
	 * Uppercase the first letter of a string
	 * @param  {String} string String to be uppercased
	 * @return {String}
	 * @private
	 */
	vjs.capitalize = function(string){
	  return string.charAt(0).toUpperCase() + string.slice(1);
	};
	
	/**
	 * Object functions container
	 * @type {Object}
	 * @private
	 */
	vjs.obj = {};
	
	/**
	 * Object.create shim for prototypal inheritance
	 *
	 * https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Object/create
	 *
	 * @function
	 * @param  {Object}   obj Object to use as prototype
	 * @private
	 */
	 vjs.obj.create = Object.create || function(obj){
	  //Create a new function called 'F' which is just an empty object.
	  function F() {}
	
	  //the prototype of the 'F' function should point to the
	  //parameter of the anonymous function.
	  F.prototype = obj;
	
	  //create a new constructor function based off of the 'F' function.
	  return new F();
	};
	
	/**
	 * Loop through each property in an object and call a function
	 * whose arguments are (key,value)
	 * @param  {Object}   obj Object of properties
	 * @param  {Function} fn  Function to be called on each property.
	 * @this {*}
	 * @private
	 */
	vjs.obj.each = function(obj, fn, context){
	  for (var key in obj) {
	    if (hasOwnProp.call(obj, key)) {
	      fn.call(context || this, key, obj[key]);
	    }
	  }
	};
	
	/**
	 * Merge two objects together and return the original.
	 * @param  {Object} obj1
	 * @param  {Object} obj2
	 * @return {Object}
	 * @private
	 */
	vjs.obj.merge = function(obj1, obj2){
	  if (!obj2) { return obj1; }
	  for (var key in obj2){
	    if (hasOwnProp.call(obj2, key)) {
	      obj1[key] = obj2[key];
	    }
	  }
	  return obj1;
	};
	
	/**
	 * Merge two objects, and merge any properties that are objects
	 * instead of just overwriting one. Uses to merge options hashes
	 * where deeper default settings are important.
	 * @param  {Object} obj1 Object to override
	 * @param  {Object} obj2 Overriding object
	 * @return {Object}      New object. Obj1 and Obj2 will be untouched.
	 * @private
	 */
	vjs.obj.deepMerge = function(obj1, obj2){
	  var key, val1, val2;
	
	  // make a copy of obj1 so we're not ovewriting original values.
	  // like prototype.options_ and all sub options objects
	  obj1 = vjs.obj.copy(obj1);
	
	  for (key in obj2){
	    if (hasOwnProp.call(obj2, key)) {
	      val1 = obj1[key];
	      val2 = obj2[key];
	
	      // Check if both properties are pure objects and do a deep merge if so
	      if (vjs.obj.isPlain(val1) && vjs.obj.isPlain(val2)) {
	        obj1[key] = vjs.obj.deepMerge(val1, val2);
	      } else {
	        obj1[key] = obj2[key];
	      }
	    }
	  }
	  return obj1;
	};
	
	/**
	 * Make a copy of the supplied object
	 * @param  {Object} obj Object to copy
	 * @return {Object}     Copy of object
	 * @private
	 */
	vjs.obj.copy = function(obj){
	  return vjs.obj.merge({}, obj);
	};
	
	/**
	 * Check if an object is plain, and not a dom node or any object sub-instance
	 * @param  {Object} obj Object to check
	 * @return {Boolean}     True if plain, false otherwise
	 * @private
	 */
	vjs.obj.isPlain = function(obj){
	  return !!obj
	    && typeof obj === 'object'
	    && obj.toString() === '[object Object]'
	    && obj.constructor === Object;
	};
	
	/**
	 * Bind (a.k.a proxy or Context). A simple method for changing the context of a function
	   It also stores a unique id on the function so it can be easily removed from events
	 * @param  {*}   context The object to bind as scope
	 * @param  {Function} fn      The function to be bound to a scope
	 * @param  {Number=}   uid     An optional unique ID for the function to be set
	 * @return {Function}
	 * @private
	 */
	vjs.bind = function(context, fn, uid) {
	  // Make sure the function has a unique ID
	  if (!fn.guid) { fn.guid = vjs.guid++; }
	
	  // Create the new function that changes the context
	  var ret = function() {
	    return fn.apply(context, arguments);
	  };
	
	  // Allow for the ability to individualize this function
	  // Needed in the case where multiple objects might share the same prototype
	  // IF both items add an event listener with the same function, then you try to remove just one
	  // it will remove both because they both have the same guid.
	  // when using this, you need to use the bind method when you remove the listener as well.
	  // currently used in text tracks
	  ret.guid = (uid) ? uid + '_' + fn.guid : fn.guid;
	
	  return ret;
	};
	
	/**
	 * Element Data Store. Allows for binding data to an element without putting it directly on the element.
	 * Ex. Event listneres are stored here.
	 * (also from jsninja.com, slightly modified and updated for closure compiler)
	 * @type {Object}
	 * @private
	 */
	vjs.cache = {};
	
	/**
	 * Unique ID for an element or function
	 * @type {Number}
	 * @private
	 */
	vjs.guid = 1;
	
	/**
	 * Unique attribute name to store an element's guid in
	 * @type {String}
	 * @constant
	 * @private
	 */
	vjs.expando = 'vdata' + (new Date()).getTime();
	
	/**
	 * Returns the cache object where data for an element is stored
	 * @param  {Element} el Element to store data for.
	 * @return {Object}
	 * @private
	 */
	vjs.getData = function(el){
	  var id = el[vjs.expando];
	  if (!id) {
	    id = el[vjs.expando] = vjs.guid++;
	    vjs.cache[id] = {};
	  }
	  return vjs.cache[id];
	};
	
	/**
	 * Returns the cache object where data for an element is stored
	 * @param  {Element} el Element to store data for.
	 * @return {Object}
	 * @private
	 */
	vjs.hasData = function(el){
	  var id = el[vjs.expando];
	  return !(!id || vjs.isEmpty(vjs.cache[id]));
	};
	
	/**
	 * Delete data for the element from the cache and the guid attr from getElementById
	 * @param  {Element} el Remove data for an element
	 * @private
	 */
	vjs.removeData = function(el){
	  var id = el[vjs.expando];
	  if (!id) { return; }
	  // Remove all stored data
	  // Changed to = null
	  // http://coding.smashingmagazine.com/2012/11/05/writing-fast-memory-efficient-javascript/
	  // vjs.cache[id] = null;
	  delete vjs.cache[id];
	
	  // Remove the expando property from the DOM node
	  try {
	    delete el[vjs.expando];
	  } catch(e) {
	    if (el.removeAttribute) {
	      el.removeAttribute(vjs.expando);
	    } else {
	      // IE doesn't appear to support removeAttribute on the document element
	      el[vjs.expando] = null;
	    }
	  }
	};
	
	/**
	 * Check if an object is empty
	 * @param  {Object}  obj The object to check for emptiness
	 * @return {Boolean}
	 * @private
	 */
	vjs.isEmpty = function(obj) {
	  for (var prop in obj) {
	    // Inlude null properties as empty.
	    if (obj[prop] !== null) {
	      return false;
	    }
	  }
	  return true;
	};
	
	/**
	 * Add a CSS class name to an element
	 * @param {Element} element    Element to add class name to
	 * @param {String} classToAdd Classname to add
	 * @private
	 */
	vjs.addClass = function(element, classToAdd){
	  if ((' '+element.className+' ').indexOf(' '+classToAdd+' ') == -1) {
	    element.className = element.className === '' ? classToAdd : element.className + ' ' + classToAdd;
	  }
	};
	
	/**
	 * Remove a CSS class name from an element
	 * @param {Element} element    Element to remove from class name
	 * @param {String} classToAdd Classname to remove
	 * @private
	 */
	vjs.removeClass = function(element, classToRemove){
	  var classNames, i;
	
	  if (element.className.indexOf(classToRemove) == -1) { return; }
	
	  classNames = element.className.split(' ');
	
	  // no arr.indexOf in ie8, and we don't want to add a big shim
	  for (i = classNames.length - 1; i >= 0; i--) {
	    if (classNames[i] === classToRemove) {
	      classNames.splice(i,1);
	    }
	  }
	
	  element.className = classNames.join(' ');
	};
	
	/**
	 * Element for testing browser HTML5 video capabilities
	 * @type {Element}
	 * @constant
	 * @private
	 */
	vjs.TEST_VID = vjs.createEl('video');
	
	/**
	 * Useragent for browser testing.
	 * @type {String}
	 * @constant
	 * @private
	 */
	vjs.USER_AGENT = navigator.userAgent;
	
	/**
	 * Device is an iPhone
	 * @type {Boolean}
	 * @constant
	 * @private
	 */
	vjs.IS_IPHONE = (/iPhone/i).test(vjs.USER_AGENT);
	vjs.IS_IPAD = (/iPad/i).test(vjs.USER_AGENT);
	vjs.IS_IPOD = (/iPod/i).test(vjs.USER_AGENT);
	vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD;
	
	vjs.IOS_VERSION = (function(){
	  var match = vjs.USER_AGENT.match(/OS (\d+)_/i);
	  if (match && match[1]) { return match[1]; }
	})();
	
	vjs.IS_ANDROID = (/Android/i).test(vjs.USER_AGENT);
	vjs.ANDROID_VERSION = (function() {
	  // This matches Android Major.Minor.Patch versions
	  // ANDROID_VERSION is Major.Minor as a Number, if Minor isn't available, then only Major is returned
	  var match = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i),
	    major,
	    minor;
	
	  if (!match) {
	    return null;
	  }
	
	  major = match[1] && parseFloat(match[1]);
	  minor = match[2] && parseFloat(match[2]);
	
	  if (major && minor) {
	    return parseFloat(match[1] + '.' + match[2]);
	  } else if (major) {
	    return major;
	  } else {
	    return null;
	  }
	})();
	// Old Android is defined as Version older than 2.3, and requiring a webkit version of the android browser
	vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && (/webkit/i).test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3;
	
	vjs.IS_FIREFOX = (/Firefox/i).test(vjs.USER_AGENT);
	vjs.IS_CHROME = (/Chrome/i).test(vjs.USER_AGENT);
	
	vjs.TOUCH_ENABLED = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof window.DocumentTouch);
	
	/**
	 * Get an element's attribute values, as defined on the HTML tag
	 * Attributs are not the same as properties. They're defined on the tag
	 * or with setAttribute (which shouldn't be used with HTML)
	 * This will return true or false for boolean attributes.
	 * @param  {Element} tag Element from which to get tag attributes
	 * @return {Object}
	 * @private
	 */
	vjs.getAttributeValues = function(tag){
	  var obj, knownBooleans, attrs, attrName, attrVal;
	
	  obj = {};
	
	  // known boolean attributes
	  // we can check for matching boolean properties, but older browsers
	  // won't know about HTML5 boolean attributes that we still read from
	  knownBooleans = ','+'autoplay,controls,loop,muted,default'+',';
	
	  if (tag && tag.attributes && tag.attributes.length > 0) {
	    attrs = tag.attributes;
	
	    for (var i = attrs.length - 1; i >= 0; i--) {
	      attrName = attrs[i].name;
	      attrVal = attrs[i].value;
	
	      // check for known booleans
	      // the matching element property will return a value for typeof
	      if (typeof tag[attrName] === 'boolean' || knownBooleans.indexOf(','+attrName+',') !== -1) {
	        // the value of an included boolean attribute is typically an empty
	        // string ('') which would equal false if we just check for a false value.
	        // we also don't want support bad code like autoplay='false'
	        attrVal = (attrVal !== null) ? true : false;
	      }
	
	      obj[attrName] = attrVal;
	    }
	  }
	
	  return obj;
	};
	
	/**
	 * Get the computed style value for an element
	 * From http://robertnyman.com/2006/04/24/get-the-rendered-style-of-an-element/
	 * @param  {Element} el        Element to get style value for
	 * @param  {String} strCssRule Style name
	 * @return {String}            Style value
	 * @private
	 */
	vjs.getComputedDimension = function(el, strCssRule){
	  var strValue = '';
	  if(document.defaultView && document.defaultView.getComputedStyle){
	    strValue = document.defaultView.getComputedStyle(el, '').getPropertyValue(strCssRule);
	
	  } else if(el.currentStyle){
	    // IE8 Width/Height support
	    strValue = el['client'+strCssRule.substr(0,1).toUpperCase() + strCssRule.substr(1)] + 'px';
	  }
	  return strValue;
	};
	
	/**
	 * Insert an element as the first child node of another
	 * @param  {Element} child   Element to insert
	 * @param  {[type]} parent Element to insert child into
	 * @private
	 */
	vjs.insertFirst = function(child, parent){
	  if (parent.firstChild) {
	    parent.insertBefore(child, parent.firstChild);
	  } else {
	    parent.appendChild(child);
	  }
	};
	
	/**
	 * Object to hold browser support information
	 * @type {Object}
	 * @private
	 */
	vjs.support = {};
	
	/**
	 * Shorthand for document.getElementById()
	 * Also allows for CSS (jQuery) ID syntax. But nothing other than IDs.
	 * @param  {String} id  Element ID
	 * @return {Element}    Element with supplied ID
	 * @private
	 */
	vjs.el = function(id){
	  if (id.indexOf('#') === 0) {
	    id = id.slice(1);
	  }
	
	  return document.getElementById(id);
	};
	
	/**
	 * Format seconds as a time string, H:MM:SS or M:SS
	 * Supplying a guide (in seconds) will force a number of leading zeros
	 * to cover the length of the guide
	 * @param  {Number} seconds Number of seconds to be turned into a string
	 * @param  {Number} guide   Number (in seconds) to model the string after
	 * @return {String}         Time formatted as H:MM:SS or M:SS
	 * @private
	 */
	vjs.formatTime = function(seconds, guide) {
	  // Default to using seconds as guide
	  guide = guide || seconds;
	  var s = Math.floor(seconds % 60),
	      m = Math.floor(seconds / 60 % 60),
	      h = Math.floor(seconds / 3600),
	      gm = Math.floor(guide / 60 % 60),
	      gh = Math.floor(guide / 3600);
	
	  // handle invalid times
	  if (isNaN(seconds) || seconds === Infinity) {
	    // '-' is false for all relational operators (e.g. <, >=) so this setting
	    // will add the minimum number of fields specified by the guide
	    h = m = s = '-';
	  }
	
	  // Check if we need to show hours
	  h = (h > 0 || gh > 0) ? h + ':' : '';
	
	  // If hours are showing, we may need to add a leading zero.
	  // Always show at least one digit of minutes.
	  m = (((h || gm >= 10) && m < 10) ? '0' + m : m) + ':';
	
	  // Check if leading zero is need for seconds
	  s = (s < 10) ? '0' + s : s;
	
	  return h + m + s;
	};
	
	// Attempt to block the ability to select text while dragging controls
	vjs.blockTextSelection = function(){
	  document.body.focus();
	  document.onselectstart = function () { return false; };
	};
	// Turn off text selection blocking
	vjs.unblockTextSelection = function(){ document.onselectstart = function () { return true; }; };
	
	/**
	 * Trim whitespace from the ends of a string.
	 * @param  {String} string String to trim
	 * @return {String}        Trimmed string
	 * @private
	 */
	vjs.trim = function(str){
	  return (str+'').replace(/^\s+|\s+$/g, '');
	};
	
	/**
	 * Should round off a number to a decimal place
	 * @param  {Number} num Number to round
	 * @param  {Number} dec Number of decimal places to round to
	 * @return {Number}     Rounded number
	 * @private
	 */
	vjs.round = function(num, dec) {
	  if (!dec) { dec = 0; }
	  return Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
	};
	
	/**
	 * Should create a fake TimeRange object
	 * Mimics an HTML5 time range instance, which has functions that
	 * return the start and end times for a range
	 * TimeRanges are returned by the buffered() method
	 * @param  {Number} start Start time in seconds
	 * @param  {Number} end   End time in seconds
	 * @return {Object}       Fake TimeRange object
	 * @private
	 */
	vjs.createTimeRange = function(start, end){
	  return {
	    length: 1,
	    start: function() { return start; },
	    end: function() { return end; }
	  };
	};
	
	/**
	 * Simple http request for retrieving external files (e.g. text tracks)
	 * @param  {String} url           URL of resource
	 * @param  {Function=} onSuccess  Success callback
	 * @param  {Function=} onError    Error callback
	 * @private
	 */
	vjs.get = function(url, onSuccess, onError){
	  var local, request;
	
	  if (typeof XMLHttpRequest === 'undefined') {
	    window.XMLHttpRequest = function () {
	      try { return new window.ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) {}
	      try { return new window.ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (f) {}
	      try { return new window.ActiveXObject('Msxml2.XMLHTTP'); } catch (g) {}
	      throw new Error('This browser does not support XMLHttpRequest.');
	    };
	  }
	
	  request = new XMLHttpRequest();
	  try {
	    request.open('GET', url);
	  } catch(e) {
	    onError(e);
	  }
	
	  local = (url.indexOf('file:') === 0 || (window.location.href.indexOf('file:') === 0 && url.indexOf('http') === -1));
	
	  request.onreadystatechange = function() {
	    if (request.readyState === 4) {
	      if (request.status === 200 || local && request.status === 0) {
	        onSuccess(request.responseText);
	      } else {
	        if (onError) {
	          onError();
	        }
	      }
	    }
	  };
	
	  try {
	    request.send();
	  } catch(e) {
	    if (onError) {
	      onError(e);
	    }
	  }
	};
	
	/**
	 * Add to local storage (may removeable)
	 * @private
	 */
	vjs.setLocalStorage = function(key, value){
	  try {
	    // IE was throwing errors referencing the var anywhere without this
	    var localStorage = window.localStorage || false;
	    if (!localStorage) { return; }
	    localStorage[key] = value;
	  } catch(e) {
	    if (e.code == 22 || e.code == 1014) { // Webkit == 22 / Firefox == 1014
	      vjs.log('LocalStorage Full (VideoJS)', e);
	    } else {
	      if (e.code == 18) {
	        vjs.log('LocalStorage not allowed (VideoJS)', e);
	      } else {
	        vjs.log('LocalStorage Error (VideoJS)', e);
	      }
	    }
	  }
	};
	
	/**
	 * Get abosolute version of relative URL. Used to tell flash correct URL.
	 * http://stackoverflow.com/questions/470832/getting-an-absolute-url-from-a-relative-one-ie6-issue
	 * @param  {String} url URL to make absolute
	 * @return {String}     Absolute URL
	 * @private
	 */
	vjs.getAbsoluteURL = function(url){
	
	  // Check if absolute URL
	  if (!url.match(/^https?:\/\//)) {
	    // Convert to absolute URL. Flash hosted off-site needs an absolute URL.
	    url = vjs.createEl('div', {
	      innerHTML: '<a href="'+url+'">x</a>'
	    }).firstChild.href;
	  }
	
	  return url;
	};
	
	// usage: log('inside coolFunc',this,arguments);
	// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
	vjs.log = function(){
	  vjs.log.history = vjs.log.history || [];   // store logs to an array for reference
	  vjs.log.history.push(arguments);
	  if(window.console){
	    window.console.log(Array.prototype.slice.call(arguments));
	  }
	};
	
	// Offset Left
	// getBoundingClientRect technique from John Resig http://ejohn.org/blog/getboundingclientrect-is-awesome/
	vjs.findPosition = function(el) {
	    var box, docEl, body, clientLeft, scrollLeft, left, clientTop, scrollTop, top;
	
	    if (el.getBoundingClientRect && el.parentNode) {
	      box = el.getBoundingClientRect();
	    }
	
	    if (!box) {
	      return {
	        left: 0,
	        top: 0
	      };
	    }
	
	    docEl = document.documentElement;
	    body = document.body;
	
	    clientLeft = docEl.clientLeft || body.clientLeft || 0;
	    scrollLeft = window.pageXOffset || body.scrollLeft;
	    left = box.left + scrollLeft - clientLeft;
	
	    clientTop = docEl.clientTop || body.clientTop || 0;
	    scrollTop = window.pageYOffset || body.scrollTop;
	    top = box.top + scrollTop - clientTop;
	
	    return {
	      left: left,
	      top: top
	    };
	};
	/**
	 * @fileoverview Player Component - Base class for all UI objects
	 *
	 */
	
	/**
	 * Base UI Component class
	 *
	 * Components are embeddable UI objects that are represented by both a
	 * javascript object and an element in the DOM. They can be children of other
	 * components, and can have many children themselves.
	 *
	 *     // adding a button to the player
	 *     var button = player.addChild('button');
	 *     button.el(); // -> button element
	 *
	 *     <div class="video-js">
	 *       <div class="vjs-button">Button</div>
	 *     </div>
	 *
	 * Components are also event emitters.
	 *
	 *     button.on('click', function(){
	 *       //console.log('Button Clicked!');
	 *     });
	 *
	 *     button.trigger('customevent');
	 *
	 * @param {Object} player  Main Player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 * @extends vjs.CoreObject
	 */
	vjs.Component = vjs.CoreObject.extend({
	  /**
	   * the constructor funciton for the class
	   *
	   * @constructor
	   */
	  init: function(player, options, ready){
	    this.player_ = player;
	
	    // Make a copy of prototype.options_ to protect against overriding global defaults
	    this.options_ = vjs.obj.copy(this.options_);
	
	    // Updated options with supplied options
	    options = this.options(options);
	
	    // Get ID from options, element, or create using player ID and unique ID
	    this.id_ = options['id'] || ((options['el'] && options['el']['id']) ? options['el']['id'] : player.id() + '_component_' + vjs.guid++ );
	
	    this.name_ = options['name'] || null;
	
	    // Create element if one wasn't provided in options
	    this.el_ = options['el'] || this.createEl();
	
	    this.children_ = [];
	    this.childIndex_ = {};
	    this.childNameIndex_ = {};
	
	    // Add any child components in options
	    this.initChildren();
	
	    this.ready(ready);
	    // Don't want to trigger ready here or it will before init is actually
	    // finished for all children that run this constructor
	  }
	});
	
	/**
	 * Dispose of the component and all child components
	 */
	vjs.Component.prototype.dispose = function(){
	  this.trigger('dispose');
	
	  // Dispose all children.
	  if (this.children_) {
	    for (var i = this.children_.length - 1; i >= 0; i--) {
	      if (this.children_[i].dispose) {
	        this.children_[i].dispose();
	      }
	    }
	  }
	
	  // Delete child references
	  this.children_ = null;
	  this.childIndex_ = null;
	  this.childNameIndex_ = null;
	
	  // Remove all event listeners.
	  this.off();
	
	  // Remove element from DOM
	  if (this.el_.parentNode) {
	    this.el_.parentNode.removeChild(this.el_);
	  }
	
	  vjs.removeData(this.el_);
	  this.el_ = null;
	};
	
	/**
	 * Reference to main player instance
	 *
	 * @type {vjs.Player}
	 * @private
	 */
	vjs.Component.prototype.player_ = true;
	
	/**
	 * Return the component's player
	 *
	 * @return {vjs.Player}
	 */
	vjs.Component.prototype.player = function(){
	  return this.player_;
	};
	
	/**
	 * The component's options object
	 *
	 * @type {Object}
	 * @private
	 */
	vjs.Component.prototype.options_;
	
	/**
	 * Deep merge of options objects
	 *
	 * Whenever a property is an object on both options objects
	 * the two properties will be merged using vjs.obj.deepMerge.
	 *
	 * This is used for merging options for child components. We
	 * want it to be easy to override individual options on a child
	 * component without having to rewrite all the other default options.
	 *
	 *     Parent.prototype.options_ = {
	 *       children: {
	 *         'childOne': { 'foo': 'bar', 'asdf': 'fdsa' },
	 *         'childTwo': {},
	 *         'childThree': {}
	 *       }
	 *     }
	 *     newOptions = {
	 *       children: {
	 *         'childOne': { 'foo': 'baz', 'abc': '123' }
	 *         'childTwo': null,
	 *         'childFour': {}
	 *       }
	 *     }
	 *
	 *     this.options(newOptions);
	 *
	 * RESULT
	 *
	 *     {
	 *       children: {
	 *         'childOne': { 'foo': 'baz', 'asdf': 'fdsa', 'abc': '123' },
	 *         'childTwo': null, // Disabled. Won't be initialized.
	 *         'childThree': {},
	 *         'childFour': {}
	 *       }
	 *     }
	 *
	 * @param  {Object} obj Object whose values will be overwritten
	 * @return {Object}     NEW merged object. Does not return obj1.
	 */
	vjs.Component.prototype.options = function(obj){
	  if (obj === undefined) return this.options_;
	
	  return this.options_ = vjs.obj.deepMerge(this.options_, obj);
	};
	
	/**
	 * The DOM element for the component
	 *
	 * @type {Element}
	 * @private
	 */
	vjs.Component.prototype.el_;
	
	/**
	 * Create the component's DOM element
	 *
	 * @param  {String=} tagName  Element's node type. e.g. 'div'
	 * @param  {Object=} attributes An object of element attributes that should be set on the element
	 * @return {Element}
	 */
	vjs.Component.prototype.createEl = function(tagName, attributes){
	  return vjs.createEl(tagName, attributes);
	};
	
	/**
	 * Get the component's DOM element
	 *
	 *     var domEl = myComponent.el();
	 *
	 * @return {Element}
	 */
	vjs.Component.prototype.el = function(){
	  return this.el_;
	};
	
	/**
	 * An optional element where, if defined, children will be inserted instead of
	 * directly in `el_`
	 *
	 * @type {Element}
	 * @private
	 */
	vjs.Component.prototype.contentEl_;
	
	/**
	 * Return the component's DOM element for embedding content.
	 * Will either be el_ or a new element defined in createEl.
	 *
	 * @return {Element}
	 */
	vjs.Component.prototype.contentEl = function(){
	  return this.contentEl_ || this.el_;
	};
	
	/**
	 * The ID for the component
	 *
	 * @type {String}
	 * @private
	 */
	vjs.Component.prototype.id_;
	
	/**
	 * Get the component's ID
	 *
	 *     var id = myComponent.id();
	 *
	 * @return {String}
	 */
	vjs.Component.prototype.id = function(){
	  return this.id_;
	};
	
	/**
	 * The name for the component. Often used to reference the component.
	 *
	 * @type {String}
	 * @private
	 */
	vjs.Component.prototype.name_;
	
	/**
	 * Get the component's name. The name is often used to reference the component.
	 *
	 *     var name = myComponent.name();
	 *
	 * @return {String}
	 */
	vjs.Component.prototype.name = function(){
	  return this.name_;
	};
	
	/**
	 * Array of child components
	 *
	 * @type {Array}
	 * @private
	 */
	vjs.Component.prototype.children_;
	
	/**
	 * Get an array of all child components
	 *
	 *     var kids = myComponent.children();
	 *
	 * @return {Array} The children
	 */
	vjs.Component.prototype.children = function(){
	  return this.children_;
	};
	
	/**
	 * Object of child components by ID
	 *
	 * @type {Object}
	 * @private
	 */
	vjs.Component.prototype.childIndex_;
	
	/**
	 * Returns a child component with the provided ID
	 *
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.getChildById = function(id){
	  return this.childIndex_[id];
	};
	
	/**
	 * Object of child components by name
	 *
	 * @type {Object}
	 * @private
	 */
	vjs.Component.prototype.childNameIndex_;
	
	/**
	 * Returns a child component with the provided ID
	 *
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.getChild = function(name){
	  return this.childNameIndex_[name];
	};
	
	/**
	 * Adds a child component inside this component
	 *
	 *     myComponent.el();
	 *     // -> <div class='my-component'></div>
	 *     myComonent.children();
	 *     // [empty array]
	 *
	 *     var myButton = myComponent.addChild('MyButton');
	 *     // -> <div class='my-component'><div class="my-button">myButton<div></div>
	 *     // -> myButton === myComonent.children()[0];
	 *
	 * Pass in options for child constructors and options for children of the child
	 *
	 *    var myButton = myComponent.addChild('MyButton', {
	 *      text: 'Press Me',
	 *      children: {
	 *        buttonChildExample: {
	 *          buttonChildOption: true
	 *        }
	 *      }
	 *    });
	 *
	 * @param {String|vjs.Component} child The class name or instance of a child to add
	 * @param {Object=} options Options, including options to be passed to children of the child.
	 * @return {vjs.Component} The child component (created by this process if a string was used)
	 * @suppress {accessControls|checkRegExp|checkTypes|checkVars|const|constantProperty|deprecated|duplicate|es5Strict|fileoverviewTags|globalThis|invalidCasts|missingProperties|nonStandardJsDocs|strictModuleDepCheck|undefinedNames|undefinedVars|unknownDefines|uselessCode|visibility}
	 */
	vjs.Component.prototype.addChild = function(child, options){
	  var component, componentClass, componentName, componentId;
	
	  // If string, create new component with options
	  if (typeof child === 'string') {
	
	    componentName = child;
	
	    // Make sure options is at least an empty object to protect against errors
	    options = options || {};
	
	    // Assume name of set is a lowercased name of the UI Class (PlayButton, etc.)
	    componentClass = options['componentClass'] || vjs.capitalize(componentName);
	
	    // Set name through options
	    options['name'] = componentName;
	
	    // Create a new object & element for this controls set
	    // If there's no .player_, this is a player
	    // Closure Compiler throws an 'incomplete alias' warning if we use the vjs variable directly.
	    // Every class should be exported, so this should never be a problem here.
	    component = new window['videojs'][componentClass](this.player_ || this, options);
	
	  // child is a component instance
	  } else {
	    component = child;
	  }
	
	  this.children_.push(component);
	
	  if (typeof component.id === 'function') {
	    this.childIndex_[component.id()] = component;
	  }
	
	  // If a name wasn't used to create the component, check if we can use the
	  // name function of the component
	  componentName = componentName || (component.name && component.name());
	
	  if (componentName) {
	    this.childNameIndex_[componentName] = component;
	  }
	
	  // Add the UI object's element to the container div (box)
	  // Having an element is not required
	  if (typeof component['el'] === 'function' && component['el']()) {
	    this.contentEl().appendChild(component['el']());
	  }
	
	  // Return so it can stored on parent object if desired.
	  return component;
	};
	
	/**
	 * Remove a child component from this component's list of children, and the
	 * child component's element from this component's element
	 *
	 * @param  {vjs.Component} component Component to remove
	 */
	vjs.Component.prototype.removeChild = function(component){
	  if (typeof component === 'string') {
	    component = this.getChild(component);
	  }
	
	  if (!component || !this.children_) return;
	
	  var childFound = false;
	  for (var i = this.children_.length - 1; i >= 0; i--) {
	    if (this.children_[i] === component) {
	      childFound = true;
	      this.children_.splice(i,1);
	      break;
	    }
	  }
	
	  if (!childFound) return;
	
	  this.childIndex_[component.id] = null;
	  this.childNameIndex_[component.name] = null;
	
	  var compEl = component.el();
	  if (compEl && compEl.parentNode === this.contentEl()) {
	    this.contentEl().removeChild(component.el());
	  }
	};
	
	/**
	 * Add and initialize default child components from options
	 *
	 *     // when an instance of MyComponent is created, all children in options
	 *     // will be added to the instance by their name strings and options
	 *     MyComponent.prototype.options_.children = {
	 *       myChildComponent: {
	 *         myChildOption: true
	 *       }
	 *     }
	 */
	vjs.Component.prototype.initChildren = function(){
	  var options = this.options_;
	
	  if (options && options['children']) {
	    var self = this;
	
	    // Loop through components and add them to the player
	    vjs.obj.each(options['children'], function(name, opts){
	      // Allow for disabling default components
	      // e.g. vjs.options['children']['posterImage'] = false
	      if (opts === false) return;
	
	      // Allow waiting to add components until a specific event is called
	      var tempAdd = function(){
	        // Set property name on player. Could cause conflicts with other prop names, but it's worth making refs easy.
	        self[name] = self.addChild(name, opts);
	      };
	
	      if (opts['loadEvent']) {
	        // this.one(opts.loadEvent, tempAdd)
	      } else {
	        tempAdd();
	      }
	    });
	  }
	};
	
	/**
	 * Allows sub components to stack CSS class names
	 *
	 * @return {String} The constructed class name
	 */
	vjs.Component.prototype.buildCSSClass = function(){
	    // Child classes can include a function that does:
	    // return 'CLASS NAME' + this._super();
	    return '';
	};
	
	/* Events
	============================================================================= */
	
	/**
	 * Add an event listener to this component's element
	 *
	 *     var myFunc = function(){
	 *       var myPlayer = this;
	 *       // Do something when the event is fired
	 *     };
	 *
	 *     myPlayer.on("eventName", myFunc);
	 *
	 * The context will be the component.
	 *
	 * @param  {String}   type The event type e.g. 'click'
	 * @param  {Function} fn   The event listener
	 * @return {vjs.Component} self
	 */
	vjs.Component.prototype.on = function(type, fn){
	  vjs.on(this.el_, type, vjs.bind(this, fn));
	  return this;
	};
	
	/**
	 * Remove an event listener from the component's element
	 *
	 *     myComponent.off("eventName", myFunc);
	 *
	 * @param  {String=}   type Event type. Without type it will remove all listeners.
	 * @param  {Function=} fn   Event listener. Without fn it will remove all listeners for a type.
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.off = function(type, fn){
	  vjs.off(this.el_, type, fn);
	  return this;
	};
	
	/**
	 * Add an event listener to be triggered only once and then removed
	 *
	 * @param  {String}   type Event type
	 * @param  {Function} fn   Event listener
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.one = function(type, fn) {
	  vjs.one(this.el_, type, vjs.bind(this, fn));
	  return this;
	};
	
	/**
	 * Trigger an event on an element
	 *
	 *     myComponent.trigger('eventName');
	 *
	 * @param  {String}       type  The event type to trigger, e.g. 'click'
	 * @param  {Event|Object} event The event object to be passed to the listener
	 * @return {vjs.Component}      self
	 */
	vjs.Component.prototype.trigger = function(type, event){
	  vjs.trigger(this.el_, type, event);
	  return this;
	};
	
	/* Ready
	================================================================================ */
	/**
	 * Is the component loaded
	 * This can mean different things depending on the component.
	 *
	 * @private
	 * @type {Boolean}
	 */
	vjs.Component.prototype.isReady_;
	
	/**
	 * Trigger ready as soon as initialization is finished
	 *
	 * Allows for delaying ready. Override on a sub class prototype.
	 * If you set this.isReadyOnInitFinish_ it will affect all components.
	 * Specially used when waiting for the Flash player to asynchrnously load.
	 *
	 * @type {Boolean}
	 * @private
	 */
	vjs.Component.prototype.isReadyOnInitFinish_ = true;
	
	/**
	 * List of ready listeners
	 *
	 * @type {Array}
	 * @private
	 */
	vjs.Component.prototype.readyQueue_;
	
	/**
	 * Bind a listener to the component's ready state
	 *
	 * Different from event listeners in that if the ready event has already happend
	 * it will trigger the function immediately.
	 *
	 * @param  {Function} fn Ready listener
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.ready = function(fn){
	  if (fn) {
	    if (this.isReady_) {
	      fn.call(this);
	    } else {
	      if (this.readyQueue_ === undefined) {
	        this.readyQueue_ = [];
	      }
	      this.readyQueue_.push(fn);
	    }
	  }
	  return this;
	};
	
	/**
	 * Trigger the ready listeners
	 *
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.triggerReady = function(){
	  this.isReady_ = true;
	
	  var readyQueue = this.readyQueue_;
	
	  if (readyQueue && readyQueue.length > 0) {
	
	    for (var i = 0, j = readyQueue.length; i < j; i++) {
	      readyQueue[i].call(this);
	    }
	
	    // Reset Ready Queue
	    this.readyQueue_ = [];
	
	    // Allow for using event listeners also, in case you want to do something everytime a source is ready.
	    this.trigger('ready');
	  }
	};
	
	/* Display
	============================================================================= */
	
	/**
	 * Add a CSS class name to the component's element
	 *
	 * @param {String} classToAdd Classname to add
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.addClass = function(classToAdd){
	  vjs.addClass(this.el_, classToAdd);
	  return this;
	};
	
	/**
	 * Remove a CSS class name from the component's element
	 *
	 * @param {String} classToRemove Classname to remove
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.removeClass = function(classToRemove){
	  vjs.removeClass(this.el_, classToRemove);
	  return this;
	};
	
	/**
	 * Show the component element if hidden
	 *
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.show = function(){
	  this.el_.style.display = 'block';
	  return this;
	};
	
	/**
	 * Hide the component element if hidden
	 *
	 * @return {vjs.Component}
	 */
	vjs.Component.prototype.hide = function(){
	  this.el_.style.display = 'none';
	  return this;
	};
	
	/**
	 * Lock an item in its visible state
	 * To be used with fadeIn/fadeOut.
	 *
	 * @return {vjs.Component}
	 * @private
	 */
	vjs.Component.prototype.lockShowing = function(){
	  this.addClass('vjs-lock-showing');
	  return this;
	};
	
	/**
	 * Unlock an item to be hidden
	 * To be used with fadeIn/fadeOut.
	 *
	 * @return {vjs.Component}
	 * @private
	 */
	vjs.Component.prototype.unlockShowing = function(){
	  this.removeClass('vjs-lock-showing');
	  return this;
	};
	
	/**
	 * Disable component by making it unshowable
	 */
	vjs.Component.prototype.disable = function(){
	  this.hide();
	  this.show = function(){};
	};
	
	/**
	 * Set or get the width of the component (CSS values)
	 *
	 * Video tag width/height only work in pixels. No percents.
	 * But allowing limited percents use. e.g. width() will return number+%, not computed width
	 *
	 * @param  {Number|String=} num   Optional width number
	 * @param  {Boolean} skipListeners Skip the 'resize' event trigger
	 * @return {vjs.Component} Returns 'this' if width was set
	 * @return {Number|String} Returns the width if nothing was set
	 */
	vjs.Component.prototype.width = function(num, skipListeners){
	  return this.dimension('width', num, skipListeners);
	};
	
	/**
	 * Get or set the height of the component (CSS values)
	 *
	 * @param  {Number|String=} num     New component height
	 * @param  {Boolean=} skipListeners Skip the resize event trigger
	 * @return {vjs.Component} The component if the height was set
	 * @return {Number|String} The height if it wasn't set
	 */
	vjs.Component.prototype.height = function(num, skipListeners){
	  return this.dimension('height', num, skipListeners);
	};
	
	/**
	 * Set both width and height at the same time
	 *
	 * @param  {Number|String} width
	 * @param  {Number|String} height
	 * @return {vjs.Component} The component
	 */
	vjs.Component.prototype.dimensions = function(width, height){
	  // Skip resize listeners on width for optimization
	  return this.width(width, true).height(height);
	};
	
	/**
	 * Get or set width or height
	 *
	 * This is the shared code for the width() and height() methods.
	 * All for an integer, integer + 'px' or integer + '%';
	 *
	 * Known issue: Hidden elements officially have a width of 0. We're defaulting
	 * to the style.width value and falling back to computedStyle which has the
	 * hidden element issue. Info, but probably not an efficient fix:
	 * http://www.foliotek.com/devblog/getting-the-width-of-a-hidden-element-with-jquery-using-width/
	 *
	 * @param  {String} widthOrHeight  'width' or 'height'
	 * @param  {Number|String=} num     New dimension
	 * @param  {Boolean=} skipListeners Skip resize event trigger
	 * @return {vjs.Component} The component if a dimension was set
	 * @return {Number|String} The dimension if nothing was set
	 * @private
	 */
	vjs.Component.prototype.dimension = function(widthOrHeight, num, skipListeners){
	  if (num !== undefined) {
	
	    // Check if using css width/height (% or px) and adjust
	    if ((''+num).indexOf('%') !== -1 || (''+num).indexOf('px') !== -1) {
	      this.el_.style[widthOrHeight] = num;
	    } else if (num === 'auto') {
	      this.el_.style[widthOrHeight] = '';
	    } else {
	      this.el_.style[widthOrHeight] = num+'px';
	    }
	
	    // skipListeners allows us to avoid triggering the resize event when setting both width and height
	    if (!skipListeners) { this.trigger('resize'); }
	
	    // Return component
	    return this;
	  }
	
	  // Not setting a value, so getting it
	  // Make sure element exists
	  if (!this.el_) return 0;
	
	  // Get dimension value from style
	  var val = this.el_.style[widthOrHeight];
	  var pxIndex = val.indexOf('px');
	  if (pxIndex !== -1) {
	    // Return the pixel value with no 'px'
	    return parseInt(val.slice(0,pxIndex), 10);
	
	  // No px so using % or no style was set, so falling back to offsetWidth/height
	  // If component has display:none, offset will return 0
	  // TODO: handle display:none and no dimension style using px
	  } else {
	
	    return parseInt(this.el_['offset'+vjs.capitalize(widthOrHeight)], 10);
	
	    // ComputedStyle version.
	    // Only difference is if the element is hidden it will return
	    // the percent value (e.g. '100%'')
	    // instead of zero like offsetWidth returns.
	    // var val = vjs.getComputedStyleValue(this.el_, widthOrHeight);
	    // var pxIndex = val.indexOf('px');
	
	    // if (pxIndex !== -1) {
	    //   return val.slice(0, pxIndex);
	    // } else {
	    //   return val;
	    // }
	  }
	};
	
	/**
	 * Fired when the width and/or height of the component changes
	 * @event resize
	 */
	vjs.Component.prototype.onResize;
	
	/**
	 * Emit 'tap' events when touch events are supported
	 *
	 * This is used to support toggling the controls through a tap on the video.
	 *
	 * We're requireing them to be enabled because otherwise every component would
	 * have this extra overhead unnecessarily, on mobile devices where extra
	 * overhead is especially bad.
	 * @private
	 */
	vjs.Component.prototype.emitTapEvents = function(){
	  var touchStart, touchTime, couldBeTap, noTap;
	
	  // Track the start time so we can determine how long the touch lasted
	  touchStart = 0;
	
	  this.on('touchstart', function(event) {
	    // Record start time so we can detect a tap vs. "touch and hold"
	    touchStart = new Date().getTime();
	    // Reset couldBeTap tracking
	    couldBeTap = true;
	  });
	
	  noTap = function(){
	    couldBeTap = false;
	  };
	  // TODO: Listen to the original target. http://youtu.be/DujfpXOKUp8?t=13m8s
	  this.on('touchmove', noTap);
	  this.on('touchleave', noTap);
	  this.on('touchcancel', noTap);
	
	  // When the touch ends, measure how long it took and trigger the appropriate
	  // event
	  this.on('touchend', function() {
	    // Proceed only if the touchmove/leave/cancel event didn't happen
	    if (couldBeTap === true) {
	      // Measure how long the touch lasted
	      touchTime = new Date().getTime() - touchStart;
	      // The touch needs to be quick in order to consider it a tap
	      if (touchTime < 250) {
	        this.trigger('tap');
	        // It may be good to copy the touchend event object and change the
	        // type to tap, if the other event properties aren't exact after
	        // vjs.fixEvent runs (e.g. event.target)
	      }
	    }
	  });
	};
	/* Button - Base class for all buttons
	================================================================================ */
	/**
	 * Base class for all buttons
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.Button = vjs.Component.extend({
	  /**
	   * @constructor
	   * @inheritDoc
	   */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    var touchstart = false;
	    this.on('touchstart', function(event) {
	      // Stop click and other mouse events from triggering also
	      event.preventDefault();
	      touchstart = true;
	    });
	    this.on('touchmove', function() {
	      touchstart = false;
	    });
	    var self = this;
	    this.on('touchend', function(event) {
	      if (touchstart) {
	        self.onClick(event);
	      }
	      event.preventDefault();
	    });
	
	    this.on('click', this.onClick);
	    this.on('focus', this.onFocus);
	    this.on('blur', this.onBlur);
	  }
	});
	
	vjs.Button.prototype.createEl = function(type, props){
	  // Add standard Aria and Tabindex info
	  props = vjs.obj.merge({
	    className: this.buildCSSClass(),
	    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.buttonText || 'Need Text') + '</span></div>',
	    role: 'button',
	    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
	    tabIndex: 0
	  }, props);
	
	  return vjs.Component.prototype.createEl.call(this, type, props);
	};
	
	vjs.Button.prototype.buildCSSClass = function(){
	  // TODO: Change vjs-control to vjs-button?
	  return 'vjs-control ' + vjs.Component.prototype.buildCSSClass.call(this);
	};
	
	  // Click - Override with specific functionality for button
	vjs.Button.prototype.onClick = function(){};
	
	  // Focus - Add keyboard functionality to element
	vjs.Button.prototype.onFocus = function(){
	  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
	};
	
	  // KeyPress (document level) - Trigger click when keys are pressed
	vjs.Button.prototype.onKeyPress = function(event){
	  // Check for space bar (32) or enter (13) keys
	  if (event.which == 32 || event.which == 13) {
	    event.preventDefault();
	    this.onClick();
	  }
	};
	
	// Blur - Remove keyboard triggers
	vjs.Button.prototype.onBlur = function(){
	  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
	};
	/* Slider
	================================================================================ */
	/**
	 * The base functionality for sliders like the volume bar and seek bar
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.Slider = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    // Set property names to bar and handle to match with the child Slider class is looking for
	    this.bar = this.getChild(this.options_['barName']);
	    this.handle = this.getChild(this.options_['handleName']);
	
	    player.on(this.playerEvent, vjs.bind(this, this.update));
	
	    this.on('mousedown', this.onMouseDown);
	    this.on('touchstart', this.onMouseDown);
	    this.on('focus', this.onFocus);
	    this.on('blur', this.onBlur);
	    this.on('click', this.onClick);
	
	    this.player_.on('controlsvisible', vjs.bind(this, this.update));
	
	    // This is actually to fix the volume handle position. http://twitter.com/#!/gerritvanaaken/status/159046254519787520
	    // this.player_.one('timeupdate', vjs.bind(this, this.update));
	
	    player.ready(vjs.bind(this, this.update));
	
	    this.boundEvents = {};
	  }
	});
	
	vjs.Slider.prototype.createEl = function(type, props) {
	  props = props || {};
	  // Add the slider element class to all sub classes
	  props.className = props.className + ' vjs-slider';
	  props = vjs.obj.merge({
	    role: 'slider',
	    'aria-valuenow': 0,
	    'aria-valuemin': 0,
	    'aria-valuemax': 100,
	    tabIndex: 0
	  }, props);
	
	  return vjs.Component.prototype.createEl.call(this, type, props);
	};
	
	vjs.Slider.prototype.onMouseDown = function(event){
	  event.preventDefault();
	  vjs.blockTextSelection();
	
	  this.boundEvents.move = vjs.bind(this, this.onMouseMove);
	  this.boundEvents.end = vjs.bind(this, this.onMouseUp);
	
	  vjs.on(document, 'mousemove', this.boundEvents.move);
	  vjs.on(document, 'mouseup', this.boundEvents.end);
	  vjs.on(document, 'touchmove', this.boundEvents.move);
	  vjs.on(document, 'touchend', this.boundEvents.end);
	
	  this.onMouseMove(event);
	};
	
	vjs.Slider.prototype.onMouseUp = function() {
	  vjs.unblockTextSelection();
	  vjs.off(document, 'mousemove', this.boundEvents.move, false);
	  vjs.off(document, 'mouseup', this.boundEvents.end, false);
	  vjs.off(document, 'touchmove', this.boundEvents.move, false);
	  vjs.off(document, 'touchend', this.boundEvents.end, false);
	
	  this.update();
	};
	
	vjs.Slider.prototype.update = function(){
	  // In VolumeBar init we have a setTimeout for update that pops and update to the end of the
	  // execution stack. The player is destroyed before then update will cause an error
	  if (!this.el_) return;
	
	  // If scrubbing, we could use a cached value to make the handle keep up with the user's mouse.
	  // On HTML5 browsers scrubbing is really smooth, but some flash players are slow, so we might want to utilize this later.
	  // var progress =  (this.player_.scrubbing) ? this.player_.getCache().currentTime / this.player_.duration() : this.player_.currentTime() / this.player_.duration();
	
	  var barProgress,
	      progress = this.getPercent(),
	      handle = this.handle,
	      bar = this.bar;
	
	  // Protect against no duration and other division issues
	  if (isNaN(progress)) { progress = 0; }
	
	  barProgress = progress;
	
	  // If there is a handle, we need to account for the handle in our calculation for progress bar
	  // so that it doesn't fall short of or extend past the handle.
	  if (handle) {
	
	    var box = this.el_,
	        boxWidth = box.offsetWidth,
	
	        handleWidth = handle.el().offsetWidth,
	
	        // The width of the handle in percent of the containing box
	        // In IE, widths may not be ready yet causing NaN
	        handlePercent = (handleWidth) ? handleWidth / boxWidth : 0,
	
	        // Get the adjusted size of the box, considering that the handle's center never touches the left or right side.
	        // There is a margin of half the handle's width on both sides.
	        boxAdjustedPercent = 1 - handlePercent,
	
	        // Adjust the progress that we'll use to set widths to the new adjusted box width
	        adjustedProgress = progress * boxAdjustedPercent;
	
	    // The bar does reach the left side, so we need to account for this in the bar's width
	    barProgress = adjustedProgress + (handlePercent / 2);
	
	    // Move the handle from the left based on the adjected progress
	    handle.el().style.left = vjs.round(adjustedProgress * 100, 2) + '%';
	  }
	
	  // Set the new bar width
	  bar.el().style.width = vjs.round(barProgress * 100, 2) + '%';
	};
	
	vjs.Slider.prototype.calculateDistance = function(event){
	  var el, box, boxX, boxY, boxW, boxH, handle, pageX, pageY;
	
	  el = this.el_;
	  box = vjs.findPosition(el);
	  boxW = boxH = el.offsetWidth;
	  handle = this.handle;
	
	  if (this.options_.vertical) {
	    boxY = box.top;
	
	    if (event.changedTouches) {
	      pageY = event.changedTouches[0].pageY;
	    } else {
	      pageY = event.pageY;
	    }
	
	    if (handle) {
	      var handleH = handle.el().offsetHeight;
	      // Adjusted X and Width, so handle doesn't go outside the bar
	      boxY = boxY + (handleH / 2);
	      boxH = boxH - handleH;
	    }
	
	    // Percent that the click is through the adjusted area
	    return Math.max(0, Math.min(1, ((boxY - pageY) + boxH) / boxH));
	
	  } else {
	    boxX = box.left;
	
	    if (event.changedTouches) {
	      pageX = event.changedTouches[0].pageX;
	    } else {
	      pageX = event.pageX;
	    }
	
	    if (handle) {
	      var handleW = handle.el().offsetWidth;
	
	      // Adjusted X and Width, so handle doesn't go outside the bar
	      boxX = boxX + (handleW / 2);
	      boxW = boxW - handleW;
	    }
	
	    // Percent that the click is through the adjusted area
	    return Math.max(0, Math.min(1, (pageX - boxX) / boxW));
	  }
	};
	
	vjs.Slider.prototype.onFocus = function(){
	  vjs.on(document, 'keyup', vjs.bind(this, this.onKeyPress));
	};
	
	vjs.Slider.prototype.onKeyPress = function(event){
	  if (event.which == 37) { // Left Arrow
	    event.preventDefault();
	    this.stepBack();
	  } else if (event.which == 39) { // Right Arrow
	    event.preventDefault();
	    this.stepForward();
	  }
	};
	
	vjs.Slider.prototype.onBlur = function(){
	  vjs.off(document, 'keyup', vjs.bind(this, this.onKeyPress));
	};
	
	/**
	 * Listener for click events on slider, used to prevent clicks
	 *   from bubbling up to parent elements like button menus.
	 * @param  {Object} event Event object
	 */
	vjs.Slider.prototype.onClick = function(event){
	  event.stopImmediatePropagation();
	  event.preventDefault();
	};
	
	/**
	 * SeekBar Behavior includes play progress bar, and seek handle
	 * Needed so it can determine seek position based on handle position/size
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.SliderHandle = vjs.Component.extend();
	
	/**
	 * Default value of the slider
	 *
	 * @type {Number}
	 * @private
	 */
	vjs.SliderHandle.prototype.defaultValue = 0;
	
	/** @inheritDoc */
	vjs.SliderHandle.prototype.createEl = function(type, props) {
	  props = props || {};
	  // Add the slider element class to all sub classes
	  props.className = props.className + ' vjs-slider-handle';
	  props = vjs.obj.merge({
	    innerHTML: '<span class="vjs-control-text">'+this.defaultValue+'</span>'
	  }, props);
	
	  return vjs.Component.prototype.createEl.call(this, 'div', props);
	};
	/* Menu
	================================================================================ */
	/**
	 * The Menu component is used to build pop up menus, including subtitle and
	 * captions selection menus.
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.Menu = vjs.Component.extend();
	
	/**
	 * Add a menu item to the menu
	 * @param {Object|String} component Component or component type to add
	 */
	vjs.Menu.prototype.addItem = function(component){
	  this.addChild(component);
	  component.on('click', vjs.bind(this, function(){
	    this.unlockShowing();
	  }));
	};
	
	/** @inheritDoc */
	vjs.Menu.prototype.createEl = function(){
	  var contentElType = this.options().contentElType || 'ul';
	  this.contentEl_ = vjs.createEl(contentElType, {
	    className: 'vjs-menu-content'
	  });
	  var el = vjs.Component.prototype.createEl.call(this, 'div', {
	    append: this.contentEl_,
	    className: 'vjs-menu'
	  });
	  el.appendChild(this.contentEl_);
	
	  // Prevent clicks from bubbling up. Needed for Menu Buttons,
	  // where a click on the parent is significant
	  vjs.on(el, 'click', function(event){
	    event.preventDefault();
	    event.stopImmediatePropagation();
	  });
	
	  return el;
	};
	
	/**
	 * The component for a menu item. `<li>`
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.MenuItem = vjs.Button.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	    this.selected(options['selected']);
	  }
	});
	
	/** @inheritDoc */
	vjs.MenuItem.prototype.createEl = function(type, props){
	  return vjs.Button.prototype.createEl.call(this, 'li', vjs.obj.merge({
	    className: 'vjs-menu-item',
	    innerHTML: this.options_['label']
	  }, props));
	};
	
	/**
	 * Handle a click on the menu item, and set it to selected
	 */
	vjs.MenuItem.prototype.onClick = function(){
	  this.selected(true);
	};
	
	/**
	 * Set this menu item as selected or not
	 * @param  {Boolean} selected
	 */
	vjs.MenuItem.prototype.selected = function(selected){
	  if (selected) {
	    this.addClass('vjs-selected');
	    this.el_.setAttribute('aria-selected',true);
	  } else {
	    this.removeClass('vjs-selected');
	    this.el_.setAttribute('aria-selected',false);
	  }
	};
	
	
	/**
	 * A button class with a popup menu
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.MenuButton = vjs.Button.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	
	    this.menu = this.createMenu();
	
	    // Add list to element
	    this.addChild(this.menu);
	
	    // Automatically hide empty menu buttons
	    if (this.items && this.items.length === 0) {
	      this.hide();
	    }
	
	    this.on('keyup', this.onKeyPress);
	    this.el_.setAttribute('aria-haspopup', true);
	    this.el_.setAttribute('role', 'button');
	  }
	});
	
	/**
	 * Track the state of the menu button
	 * @type {Boolean}
	 * @private
	 */
	vjs.MenuButton.prototype.buttonPressed_ = false;
	
	vjs.MenuButton.prototype.createMenu = function(){
	  var menu = new vjs.Menu(this.player_);
	
	  // Add a title list item to the top
	  if (this.options().title) {
	    menu.el().appendChild(vjs.createEl('li', {
	      className: 'vjs-menu-title',
	      innerHTML: vjs.capitalize(this.kind_),
	      tabindex: -1
	    }));
	  }
	
	  this.items = this['createItems']();
	
	  if (this.items) {
	    // Add menu items to the menu
	    for (var i = 0; i < this.items.length; i++) {
	      menu.addItem(this.items[i]);
	    }
	  }
	
	  return menu;
	};
	
	/**
	 * Create the list of menu items. Specific to each subclass.
	 */
	vjs.MenuButton.prototype.createItems = function(){};
	
	/** @inheritDoc */
	vjs.MenuButton.prototype.buildCSSClass = function(){
	  return this.className + ' vjs-menu-button ' + vjs.Button.prototype.buildCSSClass.call(this);
	};
	
	// Focus - Add keyboard functionality to element
	// This function is not needed anymore. Instead, the keyboard functionality is handled by
	// treating the button as triggering a submenu. When the button is pressed, the submenu
	// appears. Pressing the button again makes the submenu disappear.
	vjs.MenuButton.prototype.onFocus = function(){};
	// Can't turn off list display that we turned on with focus, because list would go away.
	vjs.MenuButton.prototype.onBlur = function(){};
	
	vjs.MenuButton.prototype.onClick = function(){
	  // When you click the button it adds focus, which will show the menu indefinitely.
	  // So we'll remove focus when the mouse leaves the button.
	  // Focus is needed for tab navigation.
	  this.one('mouseout', vjs.bind(this, function(){
	    this.menu.unlockShowing();
	    this.el_.blur();
	  }));
	  if (this.buttonPressed_){
	    this.unpressButton();
	  } else {
	    this.pressButton();
	  }
	};
	
	vjs.MenuButton.prototype.onKeyPress = function(event){
	  event.preventDefault();
	
	  // Check for space bar (32) or enter (13) keys
	  if (event.which == 32 || event.which == 13) {
	    if (this.buttonPressed_){
	      this.unpressButton();
	    } else {
	      this.pressButton();
	    }
	  // Check for escape (27) key
	  } else if (event.which == 27){
	    if (this.buttonPressed_){
	      this.unpressButton();
	    }
	  }
	};
	
	vjs.MenuButton.prototype.pressButton = function(){
	  this.buttonPressed_ = true;
	  this.menu.lockShowing();
	  this.el_.setAttribute('aria-pressed', true);
	  if (this.items && this.items.length > 0) {
	    this.items[0].el().focus(); // set the focus to the title of the submenu
	  }
	};
	
	vjs.MenuButton.prototype.unpressButton = function(){
	  this.buttonPressed_ = false;
	  this.menu.unlockShowing();
	  this.el_.setAttribute('aria-pressed', false);
	};
	
	/**
	 * An instance of the `vjs.Player` class is created when any of the Video.js setup methods are used to initialize a video.
	 *
	 * ```js
	 * var myPlayer = videojs('example_video_1');
	 * ```
	 *
	 * In the follwing example, the `data-setup` attribute tells the Video.js library to create a player instance when the library is ready.
	 *
	 * ```html
	 * <video id="example_video_1" data-setup='{}' controls>
	 *   <source src="my-source.mp4" type="video/mp4">
	 * </video>
	 * ```
	 *
	 * After an instance has been created it can be accessed globally using `Video('example_video_1')`.
	 *
	 * @class
	 * @extends vjs.Component
	 */
	vjs.Player = vjs.Component.extend({
	
	  /**
	   * player's constructor function
	   *
	   * @constructs
	   * @method init
	   * @param {Element} tag        The original video tag used for configuring options
	   * @param {Object=} options    Player options
	   * @param {Function=} ready    Ready callback function
	   */
	  init: function(tag, options, ready){
	    this.tag = tag; // Store the original tag used to set options
	
	    // Set Options
	    // The options argument overrides options set in the video tag
	    // which overrides globally set options.
	    // This latter part coincides with the load order
	    // (tag must exist before Player)
	    options = vjs.obj.merge(this.getTagSettings(tag), options);
	
	    // Cache for video property values.
	    this.cache_ = {};
	
	    // Set poster
	    this.poster_ = options['poster'];
	    // Set controls
	    this.controls_ = options['controls'];
	    // Original tag settings stored in options
	    // now remove immediately so native controls don't flash.
	    // May be turned back on by HTML5 tech if nativeControlsForTouch is true
	    tag.controls = false;
	
	    // Run base component initializing with new options.
	    // Builds the element through createEl()
	    // Inits and embeds any child components in opts
	    vjs.Component.call(this, this, options, ready);
	
	    // Update controls className. Can't do this when the controls are initially
	    // set because the element doesn't exist yet.
	    if (this.controls()) {
	      this.addClass('vjs-controls-enabled');
	    } else {
	      this.addClass('vjs-controls-disabled');
	    }
	
	    // TODO: Make this smarter. Toggle user state between touching/mousing
	    // using events, since devices can have both touch and mouse events.
	    // if (vjs.TOUCH_ENABLED) {
	    //   this.addClass('vjs-touch-enabled');
	    // }
	
	    // Firstplay event implimentation. Not sold on the event yet.
	    // Could probably just check currentTime==0?
	    this.one('play', function(e){
	      var fpEvent = { type: 'firstplay', target: this.el_ };
	      // Using vjs.trigger so we can check if default was prevented
	      var keepGoing = vjs.trigger(this.el_, fpEvent);
	
	      if (!keepGoing) {
	        e.preventDefault();
	        e.stopPropagation();
	        e.stopImmediatePropagation();
	      }
	    });
	
	    this.on('ended', this.onEnded);
	    this.on('play', this.onPlay);
	    this.on('firstplay', this.onFirstPlay);
	    this.on('pause', this.onPause);
	    this.on('progress', this.onProgress);
	    this.on('durationchange', this.onDurationChange);
	    this.on('error', this.onError);
	    this.on('fullscreenchange', this.onFullscreenChange);
	
	    // Make player easily findable by ID
	    vjs.players[this.id_] = this;
	
	    if (options['plugins']) {
	      vjs.obj.each(options['plugins'], function(key, val){
	        this[key](val);
	      }, this);
	    }
	
	    this.listenForUserActivity();
	  }
	});
	
	/**
	 * Player instance options, surfaced using vjs.options
	 * vjs.options = vjs.Player.prototype.options_
	 * Make changes in vjs.options, not here.
	 * All options should use string keys so they avoid
	 * renaming by closure compiler
	 * @type {Object}
	 * @private
	 */
	vjs.Player.prototype.options_ = vjs.options;
	
	/**
	 * Destroys the video player and does any necessary cleanup
	 *
	 *     myPlayer.dispose();
	 *
	 * This is especially helpful if you are dynamically adding and removing videos
	 * to/from the DOM.
	 */
	vjs.Player.prototype.dispose = function(){
	  this.trigger('dispose');
	  // prevent dispose from being called twice
	  this.off('dispose');
	
	  // Kill reference to this player
	  vjs.players[this.id_] = null;
	  if (this.tag && this.tag['player']) { this.tag['player'] = null; }
	  if (this.el_ && this.el_['player']) { this.el_['player'] = null; }
	
	  // Ensure that tracking progress and time progress will stop and plater deleted
	  this.stopTrackingProgress();
	  this.stopTrackingCurrentTime();
	
	  if (this.tech) { this.tech.dispose(); }
	
	  // Component dispose
	  vjs.Component.prototype.dispose.call(this);
	};
	
	vjs.Player.prototype.getTagSettings = function(tag){
	  var options = {
	    'sources': [],
	    'tracks': []
	  };
	
	  vjs.obj.merge(options, vjs.getAttributeValues(tag));
	
	  // Get tag children settings
	  if (tag.hasChildNodes()) {
	    var children, child, childName, i, j;
	
	    children = tag.childNodes;
	
	    for (i=0,j=children.length; i<j; i++) {
	      child = children[i];
	      // Change case needed: http://ejohn.org/blog/nodename-case-sensitivity/
	      childName = child.nodeName.toLowerCase();
	      if (childName === 'source') {
	        options['sources'].push(vjs.getAttributeValues(child));
	      } else if (childName === 'track') {
	        options['tracks'].push(vjs.getAttributeValues(child));
	      }
	    }
	  }
	
	  return options;
	};
	
	vjs.Player.prototype.createEl = function(){
	  var el = this.el_ = vjs.Component.prototype.createEl.call(this, 'div');
	  var tag = this.tag;
	
	  // Remove width/height attrs from tag so CSS can make it 100% width/height
	  tag.removeAttribute('width');
	  tag.removeAttribute('height');
	  // Empty video tag tracks so the built-in player doesn't use them also.
	  // This may not be fast enough to stop HTML5 browsers from reading the tags
	  // so we'll need to turn off any default tracks if we're manually doing
	  // captions and subtitles. videoElement.textTracks
	  if (tag.hasChildNodes()) {
	    var nodes, nodesLength, i, node, nodeName, removeNodes;
	
	    nodes = tag.childNodes;
	    nodesLength = nodes.length;
	    removeNodes = [];
	
	    while (nodesLength--) {
	      node = nodes[nodesLength];
	      nodeName = node.nodeName.toLowerCase();
	      if (nodeName === 'track') {
	        removeNodes.push(node);
	      }
	    }
	
	    for (i=0; i<removeNodes.length; i++) {
	      tag.removeChild(removeNodes[i]);
	    }
	  }
	
	  // Make sure tag ID exists
	  tag.id = tag.id || 'vjs_video_' + vjs.guid++;
	
	  // Give video tag ID and class to player div
	  // ID will now reference player box, not the video tag
	  el.id = tag.id;
	  el.className = tag.className;
	
	  // Update tag id/class for use as HTML5 playback tech
	  // Might think we should do this after embedding in container so .vjs-tech class
	  // doesn't flash 100% width/height, but class only applies with .video-js parent
	  tag.id += '_html5_api';
	  tag.className = 'vjs-tech';
	
	  // Make player findable on elements
	  tag['player'] = el['player'] = this;
	  // Default state of video is paused
	  this.addClass('vjs-paused');
	
	  // Make box use width/height of tag, or rely on default implementation
	  // Enforce with CSS since width/height attrs don't work on divs
	  this.width(this.options_['width'], true); // (true) Skip resize listener on load
	  this.height(this.options_['height'], true);
	
	  // Wrap video tag in div (el/box) container
	  if (tag.parentNode) {
	    tag.parentNode.insertBefore(el, tag);
	  }
	  vjs.insertFirst(tag, el); // Breaks iPhone, fixed in HTML5 setup.
	
	  return el;
	};
	
	// /* Media Technology (tech)
	// ================================================================================ */
	// Load/Create an instance of playback technlogy including element and API methods
	// And append playback element in player div.
	vjs.Player.prototype.loadTech = function(techName, source){
	
	  // Pause and remove current playback technology
	  if (this.tech) {
	    this.unloadTech();
	
	  // if this is the first time loading, HTML5 tag will exist but won't be initialized
	  // so we need to remove it if we're not loading HTML5
	  } else if (techName !== 'Html5' && this.tag) {
	    vjs.Html5.disposeMediaElement(this.tag);
	    this.tag = null;
	  }
	
	  this.techName = techName;
	
	  // Turn off API access because we're loading a new tech that might load asynchronously
	  this.isReady_ = false;
	
	  var techReady = function(){
	    this.player_.triggerReady();
	
	    // Manually track progress in cases where the browser/flash player doesn't report it.
	    if (!this.features['progressEvents']) {
	      this.player_.manualProgressOn();
	    }
	
	    // Manually track timeudpates in cases where the browser/flash player doesn't report it.
	    if (!this.features['timeupdateEvents']) {
	      this.player_.manualTimeUpdatesOn();
	    }
	  };
	
	  // Grab tech-specific options from player options and add source and parent element to use.
	  var techOptions = vjs.obj.merge({ 'source': source, 'parentEl': this.el_ }, this.options_[techName.toLowerCase()]);
	
	  if (source) {
	    if (source.src == this.cache_.src && this.cache_.currentTime > 0) {
	      techOptions['startTime'] = this.cache_.currentTime;
	    }
	
	    this.cache_.src = source.src;
	  }
	
	  // Initialize tech instance
	  this.tech = new window['videojs'][techName](this, techOptions);
	
	  this.tech.ready(techReady);
	};
	
	vjs.Player.prototype.unloadTech = function(){
	  this.isReady_ = false;
	  this.tech.dispose();
	
	  // Turn off any manual progress or timeupdate tracking
	  if (this.manualProgress) { this.manualProgressOff(); }
	
	  if (this.manualTimeUpdates) { this.manualTimeUpdatesOff(); }
	
	  this.tech = false;
	};
	
	// There's many issues around changing the size of a Flash (or other plugin) object.
	// First is a plugin reload issue in Firefox that has been around for 11 years: https://bugzilla.mozilla.org/show_bug.cgi?id=90268
	// Then with the new fullscreen API, Mozilla and webkit browsers will reload the flash object after going to fullscreen.
	// To get around this, we're unloading the tech, caching source and currentTime values, and reloading the tech once the plugin is resized.
	// reloadTech: function(betweenFn){
	//   vjs.log('unloadingTech')
	//   this.unloadTech();
	//   vjs.log('unloadedTech')
	//   if (betweenFn) { betweenFn.call(); }
	//   vjs.log('LoadingTech')
	//   this.loadTech(this.techName, { src: this.cache_.src })
	//   vjs.log('loadedTech')
	// },
	
	/* Fallbacks for unsupported event types
	================================================================================ */
	// Manually trigger progress events based on changes to the buffered amount
	// Many flash players and older HTML5 browsers don't send progress or progress-like events
	vjs.Player.prototype.manualProgressOn = function(){
	  this.manualProgress = true;
	
	  // Trigger progress watching when a source begins loading
	  this.trackProgress();
	
	  // Watch for a native progress event call on the tech element
	  // In HTML5, some older versions don't support the progress event
	  // So we're assuming they don't, and turning off manual progress if they do.
	  // As opposed to doing user agent detection
	  this.tech.one('progress', function(){
	
	    // Update known progress support for this playback technology
	    this.features['progressEvents'] = true;
	
	    // Turn off manual progress tracking
	    this.player_.manualProgressOff();
	  });
	};
	
	vjs.Player.prototype.manualProgressOff = function(){
	  this.manualProgress = false;
	  this.stopTrackingProgress();
	};
	
	vjs.Player.prototype.trackProgress = function(){
	
	  this.progressInterval = setInterval(vjs.bind(this, function(){
	    // Don't trigger unless buffered amount is greater than last time
	    // log(this.cache_.bufferEnd, this.buffered().end(0), this.duration())
	    /* TODO: update for multiple buffered regions */
	    if (this.cache_.bufferEnd < this.buffered().end(0)) {
	      this.trigger('progress');
	    } else if (this.bufferedPercent() == 1) {
	      this.stopTrackingProgress();
	      this.trigger('progress'); // Last update
	    }
	  }), 500);
	};
	vjs.Player.prototype.stopTrackingProgress = function(){ clearInterval(this.progressInterval); };
	
	/*! Time Tracking -------------------------------------------------------------- */
	vjs.Player.prototype.manualTimeUpdatesOn = function(){
	  this.manualTimeUpdates = true;
	
	  this.on('play', this.trackCurrentTime);
	  this.on('pause', this.stopTrackingCurrentTime);
	  // timeupdate is also called by .currentTime whenever current time is set
	
	  // Watch for native timeupdate event
	  this.tech.one('timeupdate', function(){
	    // Update known progress support for this playback technology
	    this.features['timeupdateEvents'] = true;
	    // Turn off manual progress tracking
	    this.player_.manualTimeUpdatesOff();
	  });
	};
	
	vjs.Player.prototype.manualTimeUpdatesOff = function(){
	  this.manualTimeUpdates = false;
	  this.stopTrackingCurrentTime();
	  this.off('play', this.trackCurrentTime);
	  this.off('pause', this.stopTrackingCurrentTime);
	};
	
	vjs.Player.prototype.trackCurrentTime = function(){
	  if (this.currentTimeInterval) { this.stopTrackingCurrentTime(); }
	  this.currentTimeInterval = setInterval(vjs.bind(this, function(){
	    this.trigger('timeupdate');
	  }), 250); // 42 = 24 fps // 250 is what Webkit uses // FF uses 15
	};
	
	// Turn off play progress tracking (when paused or dragging)
	vjs.Player.prototype.stopTrackingCurrentTime = function(){ clearInterval(this.currentTimeInterval); };
	
	// /* Player event handlers (how the player reacts to certain events)
	// ================================================================================ */
	
	/**
	 * Fired when the user agent begins looking for media data
	 * @event loadstart
	 */
	vjs.Player.prototype.onLoadStart;
	
	/**
	 * Fired when the player has initial duration and dimension information
	 * @event loadedmetadata
	 */
	vjs.Player.prototype.onLoadedMetaData;
	
	/**
	 * Fired when the player has downloaded data at the current playback position
	 * @event loadeddata
	 */
	vjs.Player.prototype.onLoadedData;
	
	/**
	 * Fired when the player has finished downloading the source data
	 * @event loadedalldata
	 */
	vjs.Player.prototype.onLoadedAllData;
	
	/**
	 * Fired whenever the media begins or resumes playback
	 * @event play
	 */
	vjs.Player.prototype.onPlay = function(){
	  vjs.removeClass(this.el_, 'vjs-paused');
	  vjs.addClass(this.el_, 'vjs-playing');
	};
	
	/**
	 * Fired the first time a video is played
	 *
	 * Not part of the HLS spec, and we're not sure if this is the best
	 * implementation yet, so use sparingly. If you don't have a reason to
	 * prevent playback, use `myPlayer.one('play');` instead.
	 *
	 * @event firstplay
	 */
	vjs.Player.prototype.onFirstPlay = function(){
	    //If the first starttime attribute is specified
	    //then we will start at the given offset in seconds
	    if(this.options_['starttime']){
	      this.currentTime(this.options_['starttime']);
	    }
	
	    this.addClass('vjs-has-started');
	};
	
	/**
	 * Fired whenever the media has been paused
	 * @event pause
	 */
	vjs.Player.prototype.onPause = function(){
	  vjs.removeClass(this.el_, 'vjs-playing');
	  vjs.addClass(this.el_, 'vjs-paused');
	};
	
	/**
	 * Fired when the current playback position has changed
	 *
	 * During playback this is fired every 15-250 milliseconds, depnding on the
	 * playback technology in use.
	 * @event timeupdate
	 */
	vjs.Player.prototype.onTimeUpdate;
	
	/**
	 * Fired while the user agent is downloading media data
	 * @event progress
	 */
	vjs.Player.prototype.onProgress = function(){
	  // Add custom event for when source is finished downloading.
	  if (this.bufferedPercent() == 1) {
	    this.trigger('loadedalldata');
	  }
	};
	
	/**
	 * Fired when the end of the media resource is reached (currentTime == duration)
	 * @event ended
	 */
	vjs.Player.prototype.onEnded = function(){
	  if (this.options_['loop']) {
	    this.currentTime(0);
	    this.play();
	  }
	};
	
	/**
	 * Fired when the duration of the media resource is first known or changed
	 * @event durationchange
	 */
	vjs.Player.prototype.onDurationChange = function(){
	  // Allows for cacheing value instead of asking player each time.
	  this.duration(this.techGet('duration'));
	};
	
	/**
	 * Fired when the volume changes
	 * @event volumechange
	 */
	vjs.Player.prototype.onVolumeChange;
	
	/**
	 * Fired when the player switches in or out of fullscreen mode
	 * @event fullscreenchange
	 */
	vjs.Player.prototype.onFullscreenChange = function() {
	  if (this.isFullScreen) {
	    this.addClass('vjs-fullscreen');
	  } else {
	    this.removeClass('vjs-fullscreen');
	  }
	};
	
	/**
	 * Fired when there is an error in playback
	 * @event error
	 */
	vjs.Player.prototype.onError = function(e) {
	  vjs.log('Video Error', e);
	};
	
	// /* Player API
	// ================================================================================ */
	
	/**
	 * Object for cached values.
	 * @private
	 */
	vjs.Player.prototype.cache_;
	
	vjs.Player.prototype.getCache = function(){
	  return this.cache_;
	};
	
	// Pass values to the playback tech
	vjs.Player.prototype.techCall = function(method, arg){
	  // If it's not ready yet, call method when it is
	  if (this.tech && !this.tech.isReady_) {
	    this.tech.ready(function(){
	      this[method](arg);
	    });
	
	  // Otherwise call method now
	  } else {
	    try {
	      this.tech[method](arg);
	    } catch(e) {
	      vjs.log(e);
	      throw e;
	    }
	  }
	};
	
	// Get calls can't wait for the tech, and sometimes don't need to.
	vjs.Player.prototype.techGet = function(method){
	
	  if (this.tech && this.tech.isReady_) {
	
	    // Flash likes to die and reload when you hide or reposition it.
	    // In these cases the object methods go away and we get errors.
	    // When that happens we'll catch the errors and inform tech that it's not ready any more.
	    try {
	      return this.tech[method]();
	    } catch(e) {
	      // When building additional tech libs, an expected method may not be defined yet
	      if (this.tech[method] === undefined) {
	        vjs.log('Video.js: ' + method + ' method not defined for '+this.techName+' playback technology.', e);
	      } else {
	        // When a method isn't available on the object it throws a TypeError
	        if (e.name == 'TypeError') {
	          vjs.log('Video.js: ' + method + ' unavailable on '+this.techName+' playback technology element.', e);
	          this.tech.isReady_ = false;
	        } else {
	          vjs.log(e);
	        }
	      }
	      throw e;
	    }
	  }
	
	  return;
	};
	
	/**
	 * start media playback
	 *
	 *     myPlayer.play();
	 *
	 * @return {vjs.Player} self
	 */
	vjs.Player.prototype.play = function(){
	  this.techCall('play');
	  return this;
	};
	
	/**
	 * Pause the video playback
	 *
	 *     myPlayer.pause();
	 *
	 * @return {vjs.Player} self
	 */
	vjs.Player.prototype.pause = function(){
	  this.techCall('pause');
	  return this;
	};
	
	/**
	 * Check if the player is paused
	 *
	 *     var isPaused = myPlayer.paused();
	 *     var isPlaying = !myPlayer.paused();
	 *
	 * @return {Boolean} false if the media is currently playing, or true otherwise
	 */
	vjs.Player.prototype.paused = function(){
	  // The initial state of paused should be true (in Safari it's actually false)
	  return (this.techGet('paused') === false) ? false : true;
	};
	
	/**
	 * Get or set the current time (in seconds)
	 *
	 *     // get
	 *     var whereYouAt = myPlayer.currentTime();
	 *
	 *     // set
	 *     myPlayer.currentTime(120); // 2 minutes into the video
	 *
	 * @param  {Number|String=} seconds The time to seek to
	 * @return {Number}        The time in seconds, when not setting
	 * @return {vjs.Player}    self, when the current time is set
	 */
	vjs.Player.prototype.currentTime = function(seconds){
	  if (seconds !== undefined) {
	
	    // cache the last set value for smoother scrubbing
	    this.cache_.lastSetCurrentTime = seconds;
	
	    this.techCall('setCurrentTime', seconds);
	
	    // improve the accuracy of manual timeupdates
	    if (this.manualTimeUpdates) { this.trigger('timeupdate'); }
	
	    return this;
	  }
	
	  // cache last currentTime and return
	  // default to 0 seconds
	  return this.cache_.currentTime = (this.techGet('currentTime') || 0);
	};
	
	/**
	 * Get the length in time of the video in seconds
	 *
	 *     var lengthOfVideo = myPlayer.duration();
	 *
	 * **NOTE**: The video must have started loading before the duration can be
	 * known, and in the case of Flash, may not be known until the video starts
	 * playing.
	 *
	 * @return {Number} The duration of the video in seconds
	 */
	vjs.Player.prototype.duration = function(seconds){
	  if (seconds !== undefined) {
	
	    // cache the last set value for optimiized scrubbing (esp. Flash)
	    this.cache_.duration = parseFloat(seconds);
	
	    return this;
	  }
	
	  if (this.cache_.duration === undefined) {
	    this.onDurationChange();
	  }
	
	  return this.cache_.duration;
	};
	
	// Calculates how much time is left. Not in spec, but useful.
	vjs.Player.prototype.remainingTime = function(){
	  return this.duration() - this.currentTime();
	};
	
	// http://dev.w3.org/html5/spec/video.html#dom-media-buffered
	// Buffered returns a timerange object.
	// Kind of like an array of portions of the video that have been downloaded.
	// So far no browsers return more than one range (portion)
	
	/**
	 * Get a TimeRange object with the times of the video that have been downloaded
	 *
	 * If you just want the percent of the video that's been downloaded,
	 * use bufferedPercent.
	 *
	 *     // Number of different ranges of time have been buffered. Usually 1.
	 *     numberOfRanges = bufferedTimeRange.length,
	 *
	 *     // Time in seconds when the first range starts. Usually 0.
	 *     firstRangeStart = bufferedTimeRange.start(0),
	 *
	 *     // Time in seconds when the first range ends
	 *     firstRangeEnd = bufferedTimeRange.end(0),
	 *
	 *     // Length in seconds of the first time range
	 *     firstRangeLength = firstRangeEnd - firstRangeStart;
	 *
	 * @return {Object} A mock TimeRange object (following HTML spec)
	 */
	vjs.Player.prototype.buffered = function(){
	  var buffered = this.techGet('buffered'),
	      start = 0,
	      buflast = buffered.length - 1,
	      // Default end to 0 and store in values
	      end = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;
	
	  if (buffered && buflast >= 0 && buffered.end(buflast) !== end) {
	    end = buffered.end(buflast);
	    // Storing values allows them be overridden by setBufferedFromProgress
	    this.cache_.bufferEnd = end;
	  }
	
	  return vjs.createTimeRange(start, end);
	};
	
	/**
	 * Get the percent (as a decimal) of the video that's been downloaded
	 *
	 *     var howMuchIsDownloaded = myPlayer.bufferedPercent();
	 *
	 * 0 means none, 1 means all.
	 * (This method isn't in the HTML5 spec, but it's very convenient)
	 *
	 * @return {Number} A decimal between 0 and 1 representing the percent
	 */
	vjs.Player.prototype.bufferedPercent = function(){
	  return (this.duration()) ? this.buffered().end(0) / this.duration() : 0;
	};
	
	/**
	 * Get or set the current volume of the media
	 *
	 *     // get
	 *     var howLoudIsIt = myPlayer.volume();
	 *
	 *     // set
	 *     myPlayer.volume(0.5); // Set volume to half
	 *
	 * 0 is off (muted), 1.0 is all the way up, 0.5 is half way.
	 *
	 * @param  {Number} percentAsDecimal The new volume as a decimal percent
	 * @return {Number}                  The current volume, when getting
	 * @return {vjs.Player}              self, when setting
	 */
	vjs.Player.prototype.volume = function(percentAsDecimal){
	  var vol;
	
	  if (percentAsDecimal !== undefined) {
	    vol = Math.max(0, Math.min(1, parseFloat(percentAsDecimal))); // Force value to between 0 and 1
	    this.cache_.volume = vol;
	    this.techCall('setVolume', vol);
	    vjs.setLocalStorage('volume', vol);
	    return this;
	  }
	
	  // Default to 1 when returning current volume.
	  vol = parseFloat(this.techGet('volume'));
	  return (isNaN(vol)) ? 1 : vol;
	};
	
	
	/**
	 * Get the current muted state, or turn mute on or off
	 *
	 *     // get
	 *     var isVolumeMuted = myPlayer.muted();
	 *
	 *     // set
	 *     myPlayer.muted(true); // mute the volume
	 *
	 * @param  {Boolean=} muted True to mute, false to unmute
	 * @return {Boolean} True if mute is on, false if not, when getting
	 * @return {vjs.Player} self, when setting mute
	 */
	vjs.Player.prototype.muted = function(muted){
	  if (muted !== undefined) {
	    this.techCall('setMuted', muted);
	    return this;
	  }
	  return this.techGet('muted') || false; // Default to false
	};
	
	// Check if current tech can support native fullscreen (e.g. with built in controls lik iOS, so not our flash swf)
	vjs.Player.prototype.supportsFullScreen = function(){ return this.techGet('supportsFullScreen') || false; };
	
	/**
	 * Increase the size of the video to full screen
	 *
	 *     myPlayer.requestFullScreen();
	 *
	 * In some browsers, full screen is not supported natively, so it enters
	 * "full window mode", where the video fills the browser window.
	 * In browsers and devices that support native full screen, sometimes the
	 * browser's default controls will be shown, and not the Video.js custom skin.
	 * This includes most mobile devices (iOS, Android) and older versions of
	 * Safari.
	 *
	 * @return {vjs.Player} self
	 */
	vjs.Player.prototype.requestFullScreen = function(){
	  var requestFullScreen = vjs.support.requestFullScreen;
	  this.isFullScreen = true;
	
	  if (requestFullScreen) {
	    // the browser supports going fullscreen at the element level so we can
	    // take the controls fullscreen as well as the video
	
	    // Trigger fullscreenchange event after change
	    // We have to specifically add this each time, and remove
	    // when cancelling fullscreen. Otherwise if there's multiple
	    // players on a page, they would all be reacting to the same fullscreen
	    // events
	    vjs.on(document, requestFullScreen.eventName, vjs.bind(this, function(e){
	      this.isFullScreen = document[requestFullScreen.isFullScreen];
	
	      // If cancelling fullscreen, remove event listener.
	      if (this.isFullScreen === false) {
	        vjs.off(document, requestFullScreen.eventName, arguments.callee);
	      }
	
	      this.trigger('fullscreenchange');
	    }));
	
	    this.el_[requestFullScreen.requestFn]();
	
	  } else if (this.tech.supportsFullScreen()) {
	    // we can't take the video.js controls fullscreen but we can go fullscreen
	    // with native controls
	    this.techCall('enterFullScreen');
	  } else {
	    // fullscreen isn't supported so we'll just stretch the video element to
	    // fill the viewport
	    this.enterFullWindow();
	    this.trigger('fullscreenchange');
	  }
	
	  return this;
	};
	
	/**
	 * Return the video to its normal size after having been in full screen mode
	 *
	 *     myPlayer.cancelFullScreen();
	 *
	 * @return {vjs.Player} self
	 */
	vjs.Player.prototype.cancelFullScreen = function(){
	  var requestFullScreen = vjs.support.requestFullScreen;
	  this.isFullScreen = false;
	
	  // Check for browser element fullscreen support
	  if (requestFullScreen) {
	    document[requestFullScreen.cancelFn]();
	  } else if (this.tech.supportsFullScreen()) {
	   this.techCall('exitFullScreen');
	  } else {
	   this.exitFullWindow();
	   this.trigger('fullscreenchange');
	  }
	
	  return this;
	};
	
	// When fullscreen isn't supported we can stretch the video container to as wide as the browser will let us.
	vjs.Player.prototype.enterFullWindow = function(){
	  this.isFullWindow = true;
	
	  // Storing original doc overflow value to return to when fullscreen is off
	  this.docOrigOverflow = document.documentElement.style.overflow;
	
	  // Add listener for esc key to exit fullscreen
	  vjs.on(document, 'keydown', vjs.bind(this, this.fullWindowOnEscKey));
	
	  // Hide any scroll bars
	  document.documentElement.style.overflow = 'hidden';
	
	  // Apply fullscreen styles
	  vjs.addClass(document.body, 'vjs-full-window');
	
	  this.trigger('enterFullWindow');
	};
	vjs.Player.prototype.fullWindowOnEscKey = function(event){
	  if (event.keyCode === 27) {
	    if (this.isFullScreen === true) {
	      this.cancelFullScreen();
	    } else {
	      this.exitFullWindow();
	    }
	  }
	};
	
	vjs.Player.prototype.exitFullWindow = function(){
	  this.isFullWindow = false;
	  vjs.off(document, 'keydown', this.fullWindowOnEscKey);
	
	  // Unhide scroll bars.
	  document.documentElement.style.overflow = this.docOrigOverflow;
	
	  // Remove fullscreen styles
	  vjs.removeClass(document.body, 'vjs-full-window');
	
	  // Resize the box, controller, and poster to original sizes
	  // this.positionAll();
	  this.trigger('exitFullWindow');
	};
	
	vjs.Player.prototype.selectSource = function(sources){
	
	  // Loop through each playback technology in the options order
	  for (var i=0,j=this.options_['techOrder'];i<j.length;i++) {
	    var techName = vjs.capitalize(j[i]),
	        tech = window['videojs'][techName];
	
	    // Check if the browser supports this technology
	    if (tech.isSupported()) {
	      // Loop through each source object
	      for (var a=0,b=sources;a<b.length;a++) {
	        var source = b[a];
	
	        // Check if source can be played with this technology
	        if (tech['canPlaySource'](source)) {
	          return { source: source, tech: techName };
	        }
	      }
	    }
	  }
	
	  return false;
	};
	
	/**
	 * The source function updates the video source
	 *
	 * There are three types of variables you can pass as the argument.
	 *
	 * **URL String**: A URL to the the video file. Use this method if you are sure
	 * the current playback technology (HTML5/Flash) can support the source you
	 * provide. Currently only MP4 files can be used in both HTML5 and Flash.
	 *
	 *     myPlayer.src("http://www.example.com/path/to/video.mp4");
	 *
	 * **Source Object (or element):** A javascript object containing information
	 * about the source file. Use this method if you want the player to determine if
	 * it can support the file using the type information.
	 *
	 *     myPlayer.src({ type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" });
	 *
	 * **Array of Source Objects:** To provide multiple versions of the source so
	 * that it can be played using HTML5 across browsers you can use an array of
	 * source objects. Video.js will detect which version is supported and load that
	 * file.
	 *
	 *     myPlayer.src([
	 *       { type: "video/mp4", src: "http://www.example.com/path/to/video.mp4" },
	 *       { type: "video/webm", src: "http://www.example.com/path/to/video.webm" },
	 *       { type: "video/ogg", src: "http://www.example.com/path/to/video.ogv" }
	 *     ]);
	 *
	 * @param  {String|Object|Array=} source The source URL, object, or array of sources
	 * @return {vjs.Player} self
	 */
	vjs.Player.prototype.src = function(source){
	  // Case: Array of source objects to choose from and pick the best to play
	  if (source instanceof Array) {
	
	    var sourceTech = this.selectSource(source),
	        techName;
	
	    if (sourceTech) {
	        source = sourceTech.source;
	        techName = sourceTech.tech;
	
	      // If this technology is already loaded, set source
	      if (techName == this.techName) {
	        this.src(source); // Passing the source object
	      // Otherwise load this technology with chosen source
	      } else {
	        this.loadTech(techName, source);
	      }
	    } else {
	      this.el_.appendChild(vjs.createEl('p', {
	        innerHTML: this.options()['notSupportedMessage']
	      }));
	    }
	
	  // Case: Source object { src: '', type: '' ... }
	  } else if (source instanceof Object) {
	
	    if (window['videojs'][this.techName]['canPlaySource'](source)) {
	      this.src(source.src);
	    } else {
	      // Send through tech loop to check for a compatible technology.
	      this.src([source]);
	    }
	
	  // Case: URL String (http://myvideo...)
	  } else {
	    // Cache for getting last set source
	    this.cache_.src = source;
	
	    if (!this.isReady_) {
	      this.ready(function(){
	        this.src(source);
	      });
	    } else {
	      this.techCall('src', source);
	      if (this.options_['preload'] == 'auto') {
	        this.load();
	      }
	      if (this.options_['autoplay']) {
	        this.play();
	      }
	    }
	  }
	  return this;
	};
	
	// Begin loading the src data
	// http://dev.w3.org/html5/spec/video.html#dom-media-load
	vjs.Player.prototype.load = function(){
	  this.techCall('load');
	  return this;
	};
	
	// http://dev.w3.org/html5/spec/video.html#dom-media-currentsrc
	vjs.Player.prototype.currentSrc = function(){
	  return this.techGet('currentSrc') || this.cache_.src || '';
	};
	
	// Attributes/Options
	vjs.Player.prototype.preload = function(value){
	  if (value !== undefined) {
	    this.techCall('setPreload', value);
	    this.options_['preload'] = value;
	    return this;
	  }
	  return this.techGet('preload');
	};
	vjs.Player.prototype.autoplay = function(value){
	  if (value !== undefined) {
	    this.techCall('setAutoplay', value);
	    this.options_['autoplay'] = value;
	    return this;
	  }
	  return this.techGet('autoplay', value);
	};
	vjs.Player.prototype.loop = function(value){
	  if (value !== undefined) {
	    this.techCall('setLoop', value);
	    this.options_['loop'] = value;
	    return this;
	  }
	  return this.techGet('loop');
	};
	
	/**
	 * the url of the poster image source
	 * @type {String}
	 * @private
	 */
	vjs.Player.prototype.poster_;
	
	/**
	 * get or set the poster image source url
	 *
	 * ##### EXAMPLE:
	 *
	 *     // getting
	 *     var currentPoster = myPlayer.poster();
	 *
	 *     // setting
	 *     myPlayer.poster('http://example.com/myImage.jpg');
	 *
	 * @param  {String=} [src] Poster image source URL
	 * @return {String} poster URL when getting
	 * @return {vjs.Player} self when setting
	 */
	vjs.Player.prototype.poster = function(src){
	  if (src !== undefined) {
	    this.poster_ = src;
	    return this;
	  }
	  return this.poster_;
	};
	
	/**
	 * Whether or not the controls are showing
	 * @type {Boolean}
	 * @private
	 */
	vjs.Player.prototype.controls_;
	
	/**
	 * Get or set whether or not the controls are showing.
	 * @param  {Boolean} controls Set controls to showing or not
	 * @return {Boolean}    Controls are showing
	 */
	vjs.Player.prototype.controls = function(bool){
	  if (bool !== undefined) {
	    bool = !!bool; // force boolean
	    // Don't trigger a change event unless it actually changed
	    if (this.controls_ !== bool) {
	      this.controls_ = bool;
	      if (bool) {
	        this.removeClass('vjs-controls-disabled');
	        this.addClass('vjs-controls-enabled');
	        this.trigger('controlsenabled');
	      } else {
	        this.removeClass('vjs-controls-enabled');
	        this.addClass('vjs-controls-disabled');
	        this.trigger('controlsdisabled');
	      }
	    }
	    return this;
	  }
	  return this.controls_;
	};
	
	vjs.Player.prototype.usingNativeControls_;
	
	/**
	 * Toggle native controls on/off. Native controls are the controls built into
	 * devices (e.g. default iPhone controls), Flash, or other techs
	 * (e.g. Vimeo Controls)
	 *
	 * **This should only be set by the current tech, because only the tech knows
	 * if it can support native controls**
	 *
	 * @param  {Boolean} bool    True signals that native controls are on
	 * @return {vjs.Player}      Returns the player
	 * @private
	 */
	vjs.Player.prototype.usingNativeControls = function(bool){
	  if (bool !== undefined) {
	    bool = !!bool; // force boolean
	    // Don't trigger a change event unless it actually changed
	    if (this.usingNativeControls_ !== bool) {
	      this.usingNativeControls_ = bool;
	      if (bool) {
	        this.addClass('vjs-using-native-controls');
	
	        /**
	         * player is using the native device controls
	         *
	         * @event usingnativecontrols
	         * @memberof vjs.Player
	         * @instance
	         * @private
	         */
	        this.trigger('usingnativecontrols');
	      } else {
	        this.removeClass('vjs-using-native-controls');
	
	        /**
	         * player is using the custom HTML controls
	         *
	         * @event usingcustomcontrols
	         * @memberof vjs.Player
	         * @instance
	         * @private
	         */
	        this.trigger('usingcustomcontrols');
	      }
	    }
	    return this;
	  }
	  return this.usingNativeControls_;
	};
	
	vjs.Player.prototype.error = function(){ return this.techGet('error'); };
	vjs.Player.prototype.ended = function(){ return this.techGet('ended'); };
	vjs.Player.prototype.seeking = function(){ return this.techGet('seeking'); };
	
	// When the player is first initialized, trigger activity so components
	// like the control bar show themselves if needed
	vjs.Player.prototype.userActivity_ = true;
	vjs.Player.prototype.reportUserActivity = function(event){
	  this.userActivity_ = true;
	};
	
	vjs.Player.prototype.userActive_ = true;
	vjs.Player.prototype.userActive = function(bool){
	  if (bool !== undefined) {
	    bool = !!bool;
	    if (bool !== this.userActive_) {
	      this.userActive_ = bool;
	      if (bool) {
	        // If the user was inactive and is now active we want to reset the
	        // inactivity timer
	        this.userActivity_ = true;
	        this.removeClass('vjs-user-inactive');
	        this.addClass('vjs-user-active');
	        this.trigger('useractive');
	      } else {
	        // We're switching the state to inactive manually, so erase any other
	        // activity
	        this.userActivity_ = false;
	
	        // Chrome/Safari/IE have bugs where when you change the cursor it can
	        // trigger a mousemove event. This causes an issue when you're hiding
	        // the cursor when the user is inactive, and a mousemove signals user
	        // activity. Making it impossible to go into inactive mode. Specifically
	        // this happens in fullscreen when we really need to hide the cursor.
	        //
	        // When this gets resolved in ALL browsers it can be removed
	        // https://code.google.com/p/chromium/issues/detail?id=103041
	        this.tech.one('mousemove', function(e){
	          e.stopPropagation();
	          e.preventDefault();
	        });
	        this.removeClass('vjs-user-active');
	        this.addClass('vjs-user-inactive');
	        this.trigger('userinactive');
	      }
	    }
	    return this;
	  }
	  return this.userActive_;
	};
	
	vjs.Player.prototype.listenForUserActivity = function(){
	  var onMouseActivity, onMouseDown, mouseInProgress, onMouseUp,
	      activityCheck, inactivityTimeout;
	
	  onMouseActivity = this.reportUserActivity;
	
	  onMouseDown = function() {
	    onMouseActivity();
	    // For as long as the they are touching the device or have their mouse down,
	    // we consider them active even if they're not moving their finger or mouse.
	    // So we want to continue to update that they are active
	    clearInterval(mouseInProgress);
	    // Setting userActivity=true now and setting the interval to the same time
	    // as the activityCheck interval (250) should ensure we never miss the
	    // next activityCheck
	    mouseInProgress = setInterval(vjs.bind(this, onMouseActivity), 250);
	  };
	
	  onMouseUp = function(event) {
	    onMouseActivity();
	    // Stop the interval that maintains activity if the mouse/touch is down
	    clearInterval(mouseInProgress);
	  };
	
	  // Any mouse movement will be considered user activity
	  this.on('mousedown', onMouseDown);
	  this.on('mousemove', onMouseActivity);
	  this.on('mouseup', onMouseUp);
	
	  // Listen for keyboard navigation
	  // Shouldn't need to use inProgress interval because of key repeat
	  this.on('keydown', onMouseActivity);
	  this.on('keyup', onMouseActivity);
	
	  // Consider any touch events that bubble up to be activity
	  // Certain touches on the tech will be blocked from bubbling because they
	  // toggle controls
	  this.on('touchstart', onMouseDown);
	  this.on('touchmove', onMouseActivity);
	  this.on('touchend', onMouseUp);
	  this.on('touchcancel', onMouseUp);
	
	  // Run an interval every 250 milliseconds instead of stuffing everything into
	  // the mousemove/touchmove function itself, to prevent performance degradation.
	  // `this.reportUserActivity` simply sets this.userActivity_ to true, which
	  // then gets picked up by this loop
	  // http://ejohn.org/blog/learning-from-twitter/
	  activityCheck = setInterval(vjs.bind(this, function() {
	    // Check to see if mouse/touch activity has happened
	    if (this.userActivity_) {
	      // Reset the activity tracker
	      this.userActivity_ = false;
	
	      // If the user state was inactive, set the state to active
	      this.userActive(true);
	
	      // Clear any existing inactivity timeout to start the timer over
	      clearTimeout(inactivityTimeout);
	
	      // In X seconds, if no more activity has occurred the user will be
	      // considered inactive
	      inactivityTimeout = setTimeout(vjs.bind(this, function() {
	        // Protect against the case where the inactivityTimeout can trigger just
	        // before the next user activity is picked up by the activityCheck loop
	        // causing a flicker
	        if (!this.userActivity_) {
	          this.userActive(false);
	        }
	      }), 2000);
	    }
	  }), 250);
	
	  // Clean up the intervals when we kill the player
	  this.on('dispose', function(){
	    clearInterval(activityCheck);
	    clearTimeout(inactivityTimeout);
	  });
	};
	
	// Methods to add support for
	// networkState: function(){ return this.techCall('networkState'); },
	// readyState: function(){ return this.techCall('readyState'); },
	// seeking: function(){ return this.techCall('seeking'); },
	// initialTime: function(){ return this.techCall('initialTime'); },
	// startOffsetTime: function(){ return this.techCall('startOffsetTime'); },
	// played: function(){ return this.techCall('played'); },
	// seekable: function(){ return this.techCall('seekable'); },
	// videoTracks: function(){ return this.techCall('videoTracks'); },
	// audioTracks: function(){ return this.techCall('audioTracks'); },
	// videoWidth: function(){ return this.techCall('videoWidth'); },
	// videoHeight: function(){ return this.techCall('videoHeight'); },
	// defaultPlaybackRate: function(){ return this.techCall('defaultPlaybackRate'); },
	// playbackRate: function(){ return this.techCall('playbackRate'); },
	// mediaGroup: function(){ return this.techCall('mediaGroup'); },
	// controller: function(){ return this.techCall('controller'); },
	// defaultMuted: function(){ return this.techCall('defaultMuted'); }
	
	// TODO
	// currentSrcList: the array of sources including other formats and bitrates
	// playList: array of source lists in order of playback
	
	// RequestFullscreen API
	(function(){
	  var prefix, requestFS, div;
	
	  div = document.createElement('div');
	
	  requestFS = {};
	
	  // Current W3C Spec
	  // http://dvcs.w3.org/hg/fullscreen/raw-file/tip/Overview.html#api
	  // Mozilla Draft: https://wiki.mozilla.org/Gecko:FullScreenAPI#fullscreenchange_event
	  // New: https://dvcs.w3.org/hg/fullscreen/raw-file/529a67b8d9f3/Overview.html
	  if (div.cancelFullscreen !== undefined) {
	    requestFS.requestFn = 'requestFullscreen';
	    requestFS.cancelFn = 'exitFullscreen';
	    requestFS.eventName = 'fullscreenchange';
	    requestFS.isFullScreen = 'fullScreen';
	
	  // Webkit (Chrome/Safari) and Mozilla (Firefox) have working implementations
	  // that use prefixes and vary slightly from the new W3C spec. Specifically,
	  // using 'exit' instead of 'cancel', and lowercasing the 'S' in Fullscreen.
	  // Other browsers don't have any hints of which version they might follow yet,
	  // so not going to try to predict by looping through all prefixes.
	  } else {
	
	    if (document.mozCancelFullScreen) {
	      prefix = 'moz';
	      requestFS.isFullScreen = prefix + 'FullScreen';
	    } else {
	      prefix = 'webkit';
	      requestFS.isFullScreen = prefix + 'IsFullScreen';
	    }
	
	    if (div[prefix + 'RequestFullScreen']) {
	      requestFS.requestFn = prefix + 'RequestFullScreen';
	      requestFS.cancelFn = prefix + 'CancelFullScreen';
	    }
	    requestFS.eventName = prefix + 'fullscreenchange';
	  }
	
	  if (document[requestFS.cancelFn]) {
	    vjs.support.requestFullScreen = requestFS;
	  }
	
	})();
	
	
	/**
	 * Container of main controls
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 * @extends vjs.Component
	 */
	vjs.ControlBar = vjs.Component.extend();
	
	vjs.ControlBar.prototype.options_ = {
	  loadEvent: 'play',
	  children: {
	    'playToggle': {},
	    'currentTimeDisplay': {},
	    'timeDivider': {},
	    'durationDisplay': {},
	    'remainingTimeDisplay': {},
	    'progressControl': {},
	    'fullscreenToggle': {},
	    'volumeControl': {},
	    'muteToggle': {}
	    // 'volumeMenuButton': {}
	  }
	};
	
	vjs.ControlBar.prototype.createEl = function(){
	  return vjs.createEl('div', {
	    className: 'vjs-control-bar'
	  });
	};
	/**
	 * Button to toggle between play and pause
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.PlayToggle = vjs.Button.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	
	    player.on('play', vjs.bind(this, this.onPlay));
	    player.on('pause', vjs.bind(this, this.onPause));
	  }
	});
	
	vjs.PlayToggle.prototype.buttonText = 'Play';
	
	vjs.PlayToggle.prototype.buildCSSClass = function(){
	  return 'vjs-play-control ' + vjs.Button.prototype.buildCSSClass.call(this);
	};
	
	// OnClick - Toggle between play and pause
	vjs.PlayToggle.prototype.onClick = function(){
	  if (this.player_.paused()) {
	    this.player_.play();
	  } else {
	    this.player_.pause();
	  }
	};
	
	  // OnPlay - Add the vjs-playing class to the element so it can change appearance
	vjs.PlayToggle.prototype.onPlay = function(){
	  vjs.removeClass(this.el_, 'vjs-paused');
	  vjs.addClass(this.el_, 'vjs-playing');
	  this.el_.children[0].children[0].innerHTML = 'Pause'; // change the button text to "Pause"
	};
	
	  // OnPause - Add the vjs-paused class to the element so it can change appearance
	vjs.PlayToggle.prototype.onPause = function(){
	  vjs.removeClass(this.el_, 'vjs-playing');
	  vjs.addClass(this.el_, 'vjs-paused');
	  this.el_.children[0].children[0].innerHTML = 'Play'; // change the button text to "Play"
	};
	/**
	 * Displays the current time
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.CurrentTimeDisplay = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    player.on('timeupdate', vjs.bind(this, this.updateContent));
	  }
	});
	
	vjs.CurrentTimeDisplay.prototype.createEl = function(){
	  var el = vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-current-time vjs-time-controls vjs-control'
	  });
	
	  this.content = vjs.createEl('div', {
	    className: 'vjs-current-time-display',
	    innerHTML: '<span class="vjs-control-text">Current Time </span>' + '0:00', // label the current time for screen reader users
	    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
	  });
	
	  el.appendChild(vjs.createEl('div').appendChild(this.content));
	  return el;
	};
	
	vjs.CurrentTimeDisplay.prototype.updateContent = function(){
	  // Allows for smooth scrubbing, when player can't keep up.
	  var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
	  this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + vjs.formatTime(time, this.player_.duration());
	};
	
	/**
	 * Displays the duration
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.DurationDisplay = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    player.on('timeupdate', vjs.bind(this, this.updateContent)); // this might need to be changes to 'durationchange' instead of 'timeupdate' eventually, however the durationchange event fires before this.player_.duration() is set, so the value cannot be written out using this method. Once the order of durationchange and this.player_.duration() being set is figured out, this can be updated.
	  }
	});
	
	vjs.DurationDisplay.prototype.createEl = function(){
	  var el = vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-duration vjs-time-controls vjs-control'
	  });
	
	  this.content = vjs.createEl('div', {
	    className: 'vjs-duration-display',
	    innerHTML: '<span class="vjs-control-text">Duration Time </span>' + '0:00', // label the duration time for screen reader users
	    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
	  });
	
	  el.appendChild(vjs.createEl('div').appendChild(this.content));
	  return el;
	};
	
	vjs.DurationDisplay.prototype.updateContent = function(){
	  var duration = this.player_.duration();
	  if (duration) {
	      this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + vjs.formatTime(duration); // label the duration time for screen reader users
	  }
	};
	
	/**
	 * The separator between the current time and duration
	 *
	 * Can be hidden if it's not needed in the design.
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.TimeDivider = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	  }
	});
	
	vjs.TimeDivider.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-time-divider',
	    innerHTML: '<div><span>/</span></div>'
	  });
	};
	
	/**
	 * Displays the time left in the video
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.RemainingTimeDisplay = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    player.on('timeupdate', vjs.bind(this, this.updateContent));
	  }
	});
	
	vjs.RemainingTimeDisplay.prototype.createEl = function(){
	  var el = vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-remaining-time vjs-time-controls vjs-control'
	  });
	
	  this.content = vjs.createEl('div', {
	    className: 'vjs-remaining-time-display',
	    innerHTML: '<span class="vjs-control-text">Remaining Time </span>' + '-0:00', // label the remaining time for screen reader users
	    'aria-live': 'off' // tell screen readers not to automatically read the time as it changes
	  });
	
	  el.appendChild(vjs.createEl('div').appendChild(this.content));
	  return el;
	};
	
	vjs.RemainingTimeDisplay.prototype.updateContent = function(){
	  if (this.player_.duration()) {
	    this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>' + '-'+ vjs.formatTime(this.player_.remainingTime());
	  }
	
	  // Allows for smooth scrubbing, when player can't keep up.
	  // var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
	  // this.content.innerHTML = vjs.formatTime(time, this.player_.duration());
	};
	/**
	 * Toggle fullscreen video
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @extends vjs.Button
	 */
	vjs.FullscreenToggle = vjs.Button.extend({
	  /**
	   * @constructor
	   * @memberof vjs.FullscreenToggle
	   * @instance
	   */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	  }
	});
	
	vjs.FullscreenToggle.prototype.buttonText = 'Fullscreen';
	
	vjs.FullscreenToggle.prototype.buildCSSClass = function(){
	  return 'vjs-fullscreen-control ' + vjs.Button.prototype.buildCSSClass.call(this);
	};
	
	vjs.FullscreenToggle.prototype.onClick = function(){
	  if (!this.player_.isFullScreen) {
	    this.player_.requestFullScreen();
	    this.el_.children[0].children[0].innerHTML = 'Non-Fullscreen'; // change the button text to "Non-Fullscreen"
	  } else {
	    this.player_.cancelFullScreen();
	    this.el_.children[0].children[0].innerHTML = 'Fullscreen'; // change the button to "Fullscreen"
	  }
	};
	/**
	 * The Progress Control component contains the seek bar, load progress,
	 * and play progress
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.ProgressControl = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	  }
	});
	
	vjs.ProgressControl.prototype.options_ = {
	  children: {
	    'seekBar': {}
	  }
	};
	
	vjs.ProgressControl.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-progress-control vjs-control'
	  });
	};
	
	/**
	 * Seek Bar and holder for the progress bars
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.SeekBar = vjs.Slider.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Slider.call(this, player, options);
	    player.on('timeupdate', vjs.bind(this, this.updateARIAAttributes));
	    player.ready(vjs.bind(this, this.updateARIAAttributes));
	  }
	});
	
	vjs.SeekBar.prototype.options_ = {
	  children: {
	    'loadProgressBar': {},
	    'playProgressBar': {},
	    'seekHandle': {}
	  },
	  'barName': 'playProgressBar',
	  'handleName': 'seekHandle'
	};
	
	vjs.SeekBar.prototype.playerEvent = 'timeupdate';
	
	vjs.SeekBar.prototype.createEl = function(){
	  return vjs.Slider.prototype.createEl.call(this, 'div', {
	    className: 'vjs-progress-holder',
	    'aria-label': 'video progress bar'
	  });
	};
	
	vjs.SeekBar.prototype.updateARIAAttributes = function(){
	    // Allows for smooth scrubbing, when player can't keep up.
	    var time = (this.player_.scrubbing) ? this.player_.getCache().currentTime : this.player_.currentTime();
	    this.el_.setAttribute('aria-valuenow',vjs.round(this.getPercent()*100, 2)); // machine readable value of progress bar (percentage complete)
	    this.el_.setAttribute('aria-valuetext',vjs.formatTime(time, this.player_.duration())); // human readable value of progress bar (time complete)
	};
	
	vjs.SeekBar.prototype.getPercent = function(){
	  var currentTime;
	  // Flash RTMP provider will not report the correct time
	  // immediately after a seek. This isn't noticeable if you're
	  // seeking while the video is playing, but it is if you seek
	  // while the video is paused.
	  if (this.player_.techName === 'Flash' && this.player_.seeking()) {
	    var cache = this.player_.getCache();
	    if (cache.lastSetCurrentTime) {
	      currentTime = cache.lastSetCurrentTime;
	    }
	    else {
	      currentTime = this.player_.currentTime();
	    }
	  }
	  else {
	    currentTime = this.player_.currentTime();
	  }
	
	  return currentTime / this.player_.duration();
	};
	
	vjs.SeekBar.prototype.onMouseDown = function(event){
	  vjs.Slider.prototype.onMouseDown.call(this, event);
	
	  this.player_.scrubbing = true;
	
	  this.videoWasPlaying = !this.player_.paused();
	  this.player_.pause();
	};
	
	vjs.SeekBar.prototype.onMouseMove = function(event){
	  var newTime = this.calculateDistance(event) * this.player_.duration();
	
	  // Don't let video end while scrubbing.
	  if (newTime == this.player_.duration()) { newTime = newTime - 0.1; }
	
	  // Set new time (tell player to seek to new time)
	  this.player_.currentTime(newTime);
	};
	
	vjs.SeekBar.prototype.onMouseUp = function(event){
	  vjs.Slider.prototype.onMouseUp.call(this, event);
	
	  this.player_.scrubbing = false;
	  if (this.videoWasPlaying) {
	    this.player_.play();
	  }
	};
	
	vjs.SeekBar.prototype.stepForward = function(){
	  this.player_.currentTime(this.player_.currentTime() + 5); // more quickly fast forward for keyboard-only users
	};
	
	vjs.SeekBar.prototype.stepBack = function(){
	  this.player_.currentTime(this.player_.currentTime() - 5); // more quickly rewind for keyboard-only users
	};
	
	
	/**
	 * Shows load progress
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.LoadProgressBar = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	    player.on('progress', vjs.bind(this, this.update));
	  }
	});
	
	vjs.LoadProgressBar.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-load-progress',
	    innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
	  });
	};
	
	vjs.LoadProgressBar.prototype.update = function(){
	  if (this.el_.style) { this.el_.style.width = vjs.round(this.player_.bufferedPercent() * 100, 2) + '%'; }
	};
	
	
	/**
	 * Shows play progress
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.PlayProgressBar = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	  }
	});
	
	vjs.PlayProgressBar.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-play-progress',
	    innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
	  });
	};
	
	/**
	 * The Seek Handle shows the current position of the playhead during playback,
	 * and can be dragged to adjust the playhead.
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.SeekHandle = vjs.SliderHandle.extend();
	
	/**
	 * The default value for the handle content, which may be read by screen readers
	 *
	 * @type {String}
	 * @private
	 */
	vjs.SeekHandle.prototype.defaultValue = '00:00';
	
	/** @inheritDoc */
	vjs.SeekHandle.prototype.createEl = function(){
	  return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
	    className: 'vjs-seek-handle'
	  });
	};
	/**
	 * The component for controlling the volume level
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.VolumeControl = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    // hide volume controls when they're not supported by the current tech
	    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
	      this.addClass('vjs-hidden');
	    }
	    player.on('loadstart', vjs.bind(this, function(){
	      if (player.tech.features && player.tech.features['volumeControl'] === false) {
	        this.addClass('vjs-hidden');
	      } else {
	        this.removeClass('vjs-hidden');
	      }
	    }));
	  }
	});
	
	vjs.VolumeControl.prototype.options_ = {
	  children: {
	    'volumeBar': {}
	  }
	};
	
	vjs.VolumeControl.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-volume-control vjs-control'
	  });
	};
	
	/**
	 * The bar that contains the volume level and can be clicked on to adjust the level
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.VolumeBar = vjs.Slider.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Slider.call(this, player, options);
	    player.on('volumechange', vjs.bind(this, this.updateARIAAttributes));
	    player.ready(vjs.bind(this, this.updateARIAAttributes));
	    setTimeout(vjs.bind(this, this.update), 0); // update when elements is in DOM
	  }
	});
	
	vjs.VolumeBar.prototype.updateARIAAttributes = function(){
	  // Current value of volume bar as a percentage
	  this.el_.setAttribute('aria-valuenow',vjs.round(this.player_.volume()*100, 2));
	  this.el_.setAttribute('aria-valuetext',vjs.round(this.player_.volume()*100, 2)+'%');
	};
	
	vjs.VolumeBar.prototype.options_ = {
	  children: {
	    'volumeLevel': {},
	    'volumeHandle': {}
	  },
	  'barName': 'volumeLevel',
	  'handleName': 'volumeHandle'
	};
	
	vjs.VolumeBar.prototype.playerEvent = 'volumechange';
	
	vjs.VolumeBar.prototype.createEl = function(){
	  return vjs.Slider.prototype.createEl.call(this, 'div', {
	    className: 'vjs-volume-bar',
	    'aria-label': 'volume level'
	  });
	};
	
	vjs.VolumeBar.prototype.onMouseMove = function(event) {
	  if (this.player_.muted()) {
	    this.player_.muted(false);
	  }
	
	  this.player_.volume(this.calculateDistance(event));
	};
	
	vjs.VolumeBar.prototype.getPercent = function(){
	  if (this.player_.muted()) {
	    return 0;
	  } else {
	    return this.player_.volume();
	  }
	};
	
	vjs.VolumeBar.prototype.stepForward = function(){
	  this.player_.volume(this.player_.volume() + 0.1);
	};
	
	vjs.VolumeBar.prototype.stepBack = function(){
	  this.player_.volume(this.player_.volume() - 0.1);
	};
	
	/**
	 * Shows volume level
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.VolumeLevel = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	  }
	});
	
	vjs.VolumeLevel.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-volume-level',
	    innerHTML: '<span class="vjs-control-text"></span>'
	  });
	};
	
	/**
	 * The volume handle can be dragged to adjust the volume level
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	 vjs.VolumeHandle = vjs.SliderHandle.extend();
	
	 vjs.VolumeHandle.prototype.defaultValue = '00:00';
	
	 /** @inheritDoc */
	 vjs.VolumeHandle.prototype.createEl = function(){
	   return vjs.SliderHandle.prototype.createEl.call(this, 'div', {
	     className: 'vjs-volume-handle'
	   });
	 };
	/**
	 * A button component for muting the audio
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.MuteToggle = vjs.Button.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	
	    player.on('volumechange', vjs.bind(this, this.update));
	
	    // hide mute toggle if the current tech doesn't support volume control
	    if (player.tech && player.tech.features && player.tech.features['volumeControl'] === false) {
	      this.addClass('vjs-hidden');
	    }
	    player.on('loadstart', vjs.bind(this, function(){
	      if (player.tech.features && player.tech.features['volumeControl'] === false) {
	        this.addClass('vjs-hidden');
	      } else {
	        this.removeClass('vjs-hidden');
	      }
	    }));
	  }
	});
	
	vjs.MuteToggle.prototype.createEl = function(){
	  return vjs.Button.prototype.createEl.call(this, 'div', {
	    className: 'vjs-mute-control vjs-control',
	    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
	  });
	};
	
	vjs.MuteToggle.prototype.onClick = function(){
	  this.player_.muted( this.player_.muted() ? false : true );
	};
	
	vjs.MuteToggle.prototype.update = function(){
	  var vol = this.player_.volume(),
	      level = 3;
	
	  if (vol === 0 || this.player_.muted()) {
	    level = 0;
	  } else if (vol < 0.33) {
	    level = 1;
	  } else if (vol < 0.67) {
	    level = 2;
	  }
	
	  // Don't rewrite the button text if the actual text doesn't change.
	  // This causes unnecessary and confusing information for screen reader users.
	  // This check is needed because this function gets called every time the volume level is changed.
	  if(this.player_.muted()){
	      if(this.el_.children[0].children[0].innerHTML!='Unmute'){
	          this.el_.children[0].children[0].innerHTML = 'Unmute'; // change the button text to "Unmute"
	      }
	  } else {
	      if(this.el_.children[0].children[0].innerHTML!='Mute'){
	          this.el_.children[0].children[0].innerHTML = 'Mute'; // change the button text to "Mute"
	      }
	  }
	
	  /* TODO improve muted icon classes */
	  for (var i = 0; i < 4; i++) {
	    vjs.removeClass(this.el_, 'vjs-vol-'+i);
	  }
	  vjs.addClass(this.el_, 'vjs-vol-'+level);
	};
	/**
	 * Menu button with a popup for showing the volume slider.
	 * @constructor
	 */
	vjs.VolumeMenuButton = vjs.MenuButton.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.MenuButton.call(this, player, options);
	
	    // Same listeners as MuteToggle
	    player.on('volumechange', vjs.bind(this, this.update));
	
	    // hide mute toggle if the current tech doesn't support volume control
	    if (player.tech && player.tech.features && player.tech.features.volumeControl === false) {
	      this.addClass('vjs-hidden');
	    }
	    player.on('loadstart', vjs.bind(this, function(){
	      if (player.tech.features && player.tech.features.volumeControl === false) {
	        this.addClass('vjs-hidden');
	      } else {
	        this.removeClass('vjs-hidden');
	      }
	    }));
	    this.addClass('vjs-menu-button');
	  }
	});
	
	vjs.VolumeMenuButton.prototype.createMenu = function(){
	  var menu = new vjs.Menu(this.player_, {
	    contentElType: 'div'
	  });
	  var vc = new vjs.VolumeBar(this.player_, vjs.obj.merge({vertical: true}, this.options_.volumeBar));
	  menu.addChild(vc);
	  return menu;
	};
	
	vjs.VolumeMenuButton.prototype.onClick = function(){
	  vjs.MuteToggle.prototype.onClick.call(this);
	  vjs.MenuButton.prototype.onClick.call(this);
	};
	
	vjs.VolumeMenuButton.prototype.createEl = function(){
	  return vjs.Button.prototype.createEl.call(this, 'div', {
	    className: 'vjs-volume-menu-button vjs-menu-button vjs-control',
	    innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
	  });
	};
	vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update;
	/* Poster Image
	================================================================================ */
	/**
	 * The component that handles showing the poster image.
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.PosterImage = vjs.Button.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Button.call(this, player, options);
	
	    if (!player.poster() || !player.controls()) {
	      this.hide();
	    }
	
	    player.on('play', vjs.bind(this, this.hide));
	  }
	});
	
	vjs.PosterImage.prototype.createEl = function(){
	  var el = vjs.createEl('div', {
	        className: 'vjs-poster',
	
	        // Don't want poster to be tabbable.
	        tabIndex: -1
	      }),
	      poster = this.player_.poster();
	
	  if (poster) {
	    if ('backgroundSize' in el.style) {
	      el.style.backgroundImage = 'url("' + poster + '")';
	    } else {
	      el.appendChild(vjs.createEl('img', { src: poster }));
	    }
	  }
	
	  return el;
	};
	
	vjs.PosterImage.prototype.onClick = function(){
	  // Only accept clicks when controls are enabled
	  if (this.player().controls()) {
	    this.player_.play();
	  }
	};
	/* Loading Spinner
	================================================================================ */
	/**
	 * Loading spinner for waiting events
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.LoadingSpinner = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    player.on('canplay', vjs.bind(this, this.hide));
	    player.on('canplaythrough', vjs.bind(this, this.hide));
	    player.on('playing', vjs.bind(this, this.hide));
	    player.on('seeked', vjs.bind(this, this.hide));
	
	    player.on('seeking', vjs.bind(this, this.show));
	
	    // in some browsers seeking does not trigger the 'playing' event,
	    // so we also need to trap 'seeked' if we are going to set a
	    // 'seeking' event
	    player.on('seeked', vjs.bind(this, this.hide));
	
	    player.on('error', vjs.bind(this, this.show));
	
	    // Not showing spinner on stalled any more. Browsers may stall and then not trigger any events that would remove the spinner.
	    // Checked in Chrome 16 and Safari 5.1.2. http://help.videojs.com/discussions/problems/883-why-is-the-download-progress-showing
	    // player.on('stalled', vjs.bind(this, this.show));
	
	    player.on('waiting', vjs.bind(this, this.show));
	  }
	});
	
	vjs.LoadingSpinner.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-loading-spinner'
	  });
	};
	/* Big Play Button
	================================================================================ */
	/**
	 * Initial play button. Shows before the video has played. The hiding of the
	 * big play button is done via CSS and player states.
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @class
	 * @constructor
	 */
	vjs.BigPlayButton = vjs.Button.extend();
	
	vjs.BigPlayButton.prototype.createEl = function(){
	  return vjs.Button.prototype.createEl.call(this, 'div', {
	    className: 'vjs-big-play-button',
	    innerHTML: '<span aria-hidden="true"></span>',
	    'aria-label': 'play video'
	  });
	};
	
	vjs.BigPlayButton.prototype.onClick = function(){
	  this.player_.play();
	};
	/**
	 * @fileoverview Media Technology Controller - Base class for media playback
	 * technology controllers like Flash and HTML5
	 */
	
	/**
	 * Base class for media (HTML5 Video, Flash) controllers
	 * @param {vjs.Player|Object} player  Central player instance
	 * @param {Object=} options Options object
	 * @constructor
	 */
	vjs.MediaTechController = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.Component.call(this, player, options, ready);
	
	    this.initControlsListeners();
	  }
	});
	
	/**
	 * Set up click and touch listeners for the playback element
	 * On desktops, a click on the video itself will toggle playback,
	 * on a mobile device a click on the video toggles controls.
	 * (toggling controls is done by toggling the user state between active and
	 * inactive)
	 *
	 * A tap can signal that a user has become active, or has become inactive
	 * e.g. a quick tap on an iPhone movie should reveal the controls. Another
	 * quick tap should hide them again (signaling the user is in an inactive
	 * viewing state)
	 *
	 * In addition to this, we still want the user to be considered inactive after
	 * a few seconds of inactivity.
	 *
	 * Note: the only part of iOS interaction we can't mimic with this setup
	 * is a touch and hold on the video element counting as activity in order to
	 * keep the controls showing, but that shouldn't be an issue. A touch and hold on
	 * any controls will still keep the user active
	 */
	vjs.MediaTechController.prototype.initControlsListeners = function(){
	  var player, tech, activateControls, deactivateControls;
	
	  tech = this;
	  player = this.player();
	
	  var activateControls = function(){
	    if (player.controls() && !player.usingNativeControls()) {
	      tech.addControlsListeners();
	    }
	  };
	
	  deactivateControls = vjs.bind(tech, tech.removeControlsListeners);
	
	  // Set up event listeners once the tech is ready and has an element to apply
	  // listeners to
	  this.ready(activateControls);
	  player.on('controlsenabled', activateControls);
	  player.on('controlsdisabled', deactivateControls);
	};
	
	vjs.MediaTechController.prototype.addControlsListeners = function(){
	  var preventBubble, userWasActive;
	
	  // Some browsers (Chrome & IE) don't trigger a click on a flash swf, but do
	  // trigger mousedown/up.
	  // http://stackoverflow.com/questions/1444562/javascript-onclick-event-over-flash-object
	  // Any touch events are set to block the mousedown event from happening
	  this.on('mousedown', this.onClick);
	
	  // We need to block touch events on the video element from bubbling up,
	  // otherwise they'll signal activity prematurely. The specific use case is
	  // when the video is playing and the controls have faded out. In this case
	  // only a tap (fast touch) should toggle the user active state and turn the
	  // controls back on. A touch and move or touch and hold should not trigger
	  // the controls (per iOS as an example at least)
	  //
	  // We always want to stop propagation on touchstart because touchstart
	  // at the player level starts the touchInProgress interval. We can still
	  // report activity on the other events, but won't let them bubble for
	  // consistency. We don't want to bubble a touchend without a touchstart.
	  this.on('touchstart', function(event) {
	    // Stop the mouse events from also happening
	    event.preventDefault();
	    event.stopPropagation();
	    // Record if the user was active now so we don't have to keep polling it
	    userWasActive = this.player_.userActive();
	  });
	
	  preventBubble = function(event){
	    event.stopPropagation();
	    if (userWasActive) {
	      this.player_.reportUserActivity();
	    }
	  };
	
	  // Treat all touch events the same for consistency
	  this.on('touchmove', preventBubble);
	  this.on('touchleave', preventBubble);
	  this.on('touchcancel', preventBubble);
	  this.on('touchend', preventBubble);
	
	  // Turn on component tap events
	  this.emitTapEvents();
	
	  // The tap listener needs to come after the touchend listener because the tap
	  // listener cancels out any reportedUserActivity when setting userActive(false)
	  this.on('tap', this.onTap);
	};
	
	/**
	 * Remove the listeners used for click and tap controls. This is needed for
	 * toggling to controls disabled, where a tap/touch should do nothing.
	 */
	vjs.MediaTechController.prototype.removeControlsListeners = function(){
	  // We don't want to just use `this.off()` because there might be other needed
	  // listeners added by techs that extend this.
	  this.off('tap');
	  this.off('touchstart');
	  this.off('touchmove');
	  this.off('touchleave');
	  this.off('touchcancel');
	  this.off('touchend');
	  this.off('click');
	  this.off('mousedown');
	};
	
	/**
	 * Handle a click on the media element. By default will play/pause the media.
	 */
	vjs.MediaTechController.prototype.onClick = function(event){
	  // We're using mousedown to detect clicks thanks to Flash, but mousedown
	  // will also be triggered with right-clicks, so we need to prevent that
	  if (event.button !== 0) return;
	
	  // When controls are disabled a click should not toggle playback because
	  // the click is considered a control
	  if (this.player().controls()) {
	    if (this.player().paused()) {
	      this.player().play();
	    } else {
	      this.player().pause();
	    }
	  }
	};
	
	/**
	 * Handle a tap on the media element. By default it will toggle the user
	 * activity state, which hides and shows the controls.
	 */
	
	vjs.MediaTechController.prototype.onTap = function(){
	  this.player().userActive(!this.player().userActive());
	};
	
	vjs.MediaTechController.prototype.features = {
	  'volumeControl': true,
	
	  // Resizing plugins using request fullscreen reloads the plugin
	  'fullscreenResize': false,
	
	  // Optional events that we can manually mimic with timers
	  // currently not triggered by video-js-swf
	  'progressEvents': false,
	  'timeupdateEvents': false
	};
	
	vjs.media = {};
	
	/**
	 * List of default API methods for any MediaTechController
	 * @type {String}
	 */
	vjs.media.ApiMethods = 'play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted'.split(',');
	// Create placeholder methods for each that warn when a method isn't supported by the current playback technology
	
	function createMethod(methodName){
	  return function(){
	    throw new Error('The "'+methodName+'" method is not available on the playback technology\'s API');
	  };
	}
	
	for (var i = vjs.media.ApiMethods.length - 1; i >= 0; i--) {
	  var methodName = vjs.media.ApiMethods[i];
	  vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]] = createMethod(methodName);
	}
	/**
	 * @fileoverview HTML5 Media Controller - Wrapper for HTML5 Media API
	 */
	
	/**
	 * HTML5 Media Controller - Wrapper for HTML5 Media API
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @param {Function=} ready
	 * @constructor
	 */
	vjs.Html5 = vjs.MediaTechController.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    // volume cannot be changed from 1 on iOS
	    this.features['volumeControl'] = vjs.Html5.canControlVolume();
	
	    // In iOS, if you move a video element in the DOM, it breaks video playback.
	    this.features['movingMediaElementInDOM'] = !vjs.IS_IOS;
	
	    // HTML video is able to automatically resize when going to fullscreen
	    this.features['fullscreenResize'] = true;
	
	    vjs.MediaTechController.call(this, player, options, ready);
	
	    var source = options['source'];
	
	    // If the element source is already set, we may have missed the loadstart event, and want to trigger it.
	    // We don't want to set the source again and interrupt playback.
	    if (source && this.el_.currentSrc === source.src && this.el_.networkState > 0) {
	      player.trigger('loadstart');
	
	    // Otherwise set the source if one was provided.
	    } else if (source) {
	      this.el_.src = source.src;
	    }
	
	    // Determine if native controls should be used
	    // Our goal should be to get the custom controls on mobile solid everywhere
	    // so we can remove this all together. Right now this will block custom
	    // controls on touch enabled laptops like the Chrome Pixel
	    if (vjs.TOUCH_ENABLED && player.options()['nativeControlsForTouch'] !== false) {
	      this.useNativeControls();
	    }
	
	    // Chrome and Safari both have issues with autoplay.
	    // In Safari (5.1.1), when we move the video element into the container div, autoplay doesn't work.
	    // In Chrome (15), if you have autoplay + a poster + no controls, the video gets hidden (but audio plays)
	    // This fixes both issues. Need to wait for API, so it updates displays correctly
	    player.ready(function(){
	      if (this.tag && this.options_['autoplay'] && this.paused()) {
	        delete this.tag['poster']; // Chrome Fix. Fixed in Chrome v16.
	        this.play();
	      }
	    });
	
	    this.setupTriggers();
	    this.triggerReady();
	  }
	});
	
	vjs.Html5.prototype.dispose = function(){
	  vjs.MediaTechController.prototype.dispose.call(this);
	};
	
	vjs.Html5.prototype.createEl = function(){
	  var player = this.player_,
	      // If possible, reuse original tag for HTML5 playback technology element
	      el = player.tag,
	      newEl,
	      clone;
	
	  // Check if this browser supports moving the element into the box.
	  // On the iPhone video will break if you move the element,
	  // So we have to create a brand new element.
	  if (!el || this.features['movingMediaElementInDOM'] === false) {
	
	    // If the original tag is still there, clone and remove it.
	    if (el) {
	      clone = el.cloneNode(false);
	      vjs.Html5.disposeMediaElement(el);
	      el = clone;
	      player.tag = null;
	    } else {
	      el = vjs.createEl('video', {
	        id:player.id() + '_html5_api',
	        className:'vjs-tech'
	      });
	    }
	    // associate the player with the new tag
	    el['player'] = player;
	
	    vjs.insertFirst(el, player.el());
	  }
	
	  // Update specific tag settings, in case they were overridden
	  var attrs = ['autoplay','preload','loop','muted'];
	  for (var i = attrs.length - 1; i >= 0; i--) {
	    var attr = attrs[i];
	    if (player.options_[attr] !== null) {
	      el[attr] = player.options_[attr];
	    }
	  }
	
	  return el;
	  // jenniisawesome = true;
	};
	
	// Make video events trigger player events
	// May seem verbose here, but makes other APIs possible.
	vjs.Html5.prototype.setupTriggers = function(){
	  for (var i = vjs.Html5.Events.length - 1; i >= 0; i--) {
	    vjs.on(this.el_, vjs.Html5.Events[i], vjs.bind(this.player_, this.eventHandler));
	  }
	};
	// Triggers removed using this.off when disposed
	
	vjs.Html5.prototype.eventHandler = function(e){
	  this.trigger(e);
	
	  // No need for media events to bubble up.
	  e.stopPropagation();
	};
	
	vjs.Html5.prototype.useNativeControls = function(){
	  var tech, player, controlsOn, controlsOff, cleanUp;
	
	  tech = this;
	  player = this.player();
	
	  // If the player controls are enabled turn on the native controls
	  tech.setControls(player.controls());
	
	  // Update the native controls when player controls state is updated
	  controlsOn = function(){
	    tech.setControls(true);
	  };
	  controlsOff = function(){
	    tech.setControls(false);
	  };
	  player.on('controlsenabled', controlsOn);
	  player.on('controlsdisabled', controlsOff);
	
	  // Clean up when not using native controls anymore
	  cleanUp = function(){
	    player.off('controlsenabled', controlsOn);
	    player.off('controlsdisabled', controlsOff);
	  };
	  tech.on('dispose', cleanUp);
	  player.on('usingcustomcontrols', cleanUp);
	
	  // Update the state of the player to using native controls
	  player.usingNativeControls(true);
	};
	
	
	vjs.Html5.prototype.play = function(){ this.el_.play(); };
	vjs.Html5.prototype.pause = function(){ this.el_.pause(); };
	vjs.Html5.prototype.paused = function(){ return this.el_.paused; };
	
	vjs.Html5.prototype.currentTime = function(){ return this.el_.currentTime; };
	vjs.Html5.prototype.setCurrentTime = function(seconds){
	  try {
	    this.el_.currentTime = seconds;
	  } catch(e) {
	    vjs.log(e, 'Video is not ready. (Video.js)');
	    // this.warning(VideoJS.warnings.videoNotReady);
	  }
	};
	
	vjs.Html5.prototype.duration = function(){ return this.el_.duration || 0; };
	vjs.Html5.prototype.buffered = function(){ return this.el_.buffered; };
	
	vjs.Html5.prototype.volume = function(){ return this.el_.volume; };
	vjs.Html5.prototype.setVolume = function(percentAsDecimal){ this.el_.volume = percentAsDecimal; };
	vjs.Html5.prototype.muted = function(){ return this.el_.muted; };
	vjs.Html5.prototype.setMuted = function(muted){ this.el_.muted = muted; };
	
	vjs.Html5.prototype.width = function(){ return this.el_.offsetWidth; };
	vjs.Html5.prototype.height = function(){ return this.el_.offsetHeight; };
	
	vjs.Html5.prototype.supportsFullScreen = function(){
	  if (typeof this.el_.webkitEnterFullScreen == 'function') {
	
	    // Seems to be broken in Chromium/Chrome && Safari in Leopard
	    if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) {
	      return true;
	    }
	  }
	  return false;
	};
	
	vjs.Html5.prototype.enterFullScreen = function(){
	  var video = this.el_;
	  if (video.paused && video.networkState <= video.HAVE_METADATA) {
	    // attempt to prime the video element for programmatic access
	    // this isn't necessary on the desktop but shouldn't hurt
	    this.el_.play();
	
	    // playing and pausing synchronously during the transition to fullscreen
	    // can get iOS ~6.1 devices into a play/pause loop
	    setTimeout(function(){
	      video.pause();
	      video.webkitEnterFullScreen();
	    }, 0);
	  } else {
	    video.webkitEnterFullScreen();
	  }
	};
	vjs.Html5.prototype.exitFullScreen = function(){
	  this.el_.webkitExitFullScreen();
	};
	vjs.Html5.prototype.src = function(src){ this.el_.src = src; };
	vjs.Html5.prototype.load = function(){ this.el_.load(); };
	vjs.Html5.prototype.currentSrc = function(){ return this.el_.currentSrc; };
	
	vjs.Html5.prototype.preload = function(){ return this.el_.preload; };
	vjs.Html5.prototype.setPreload = function(val){ this.el_.preload = val; };
	
	vjs.Html5.prototype.autoplay = function(){ return this.el_.autoplay; };
	vjs.Html5.prototype.setAutoplay = function(val){ this.el_.autoplay = val; };
	
	vjs.Html5.prototype.controls = function(){ return this.el_.controls; }
	vjs.Html5.prototype.setControls = function(val){ this.el_.controls = !!val; }
	
	vjs.Html5.prototype.loop = function(){ return this.el_.loop; };
	vjs.Html5.prototype.setLoop = function(val){ this.el_.loop = val; };
	
	vjs.Html5.prototype.error = function(){ return this.el_.error; };
	vjs.Html5.prototype.seeking = function(){ return this.el_.seeking; };
	vjs.Html5.prototype.ended = function(){ return this.el_.ended; };
	vjs.Html5.prototype.defaultMuted = function(){ return this.el_.defaultMuted; };
	
	/* HTML5 Support Testing ---------------------------------------------------- */
	
	vjs.Html5.isSupported = function(){
	  return !!vjs.TEST_VID.canPlayType;
	};
	
	vjs.Html5.canPlaySource = function(srcObj){
	  // IE9 on Windows 7 without MediaPlayer throws an error here
	  // https://github.com/videojs/video.js/issues/519
	  try {
	    return !!vjs.TEST_VID.canPlayType(srcObj.type);
	  } catch(e) {
	    return '';
	  }
	  // TODO: Check Type
	  // If no Type, check ext
	  // Check Media Type
	};
	
	vjs.Html5.canControlVolume = function(){
	  var volume =  vjs.TEST_VID.volume;
	  vjs.TEST_VID.volume = (volume / 2) + 0.1;
	  return volume !== vjs.TEST_VID.volume;
	};
	
	// List of all HTML5 events (various uses).
	vjs.Html5.Events = 'loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange'.split(',');
	
	vjs.Html5.disposeMediaElement = function(el){
	  if (!el) { return; }
	
	  el['player'] = null;
	
	  if (el.parentNode) {
	    el.parentNode.removeChild(el);
	  }
	
	  // remove any child track or source nodes to prevent their loading
	  while(el.hasChildNodes()) {
	    el.removeChild(el.firstChild);
	  }
	
	  // remove any src reference. not setting `src=''` because that causes a warning
	  // in firefox
	  el.removeAttribute('src');
	
	  // force the media element to update its loading state by calling load()
	  if (typeof el.load === 'function') {
	    el.load();
	  }
	};
	
	// HTML5 Feature detection and Device Fixes --------------------------------- //
	
	  // Override Android 2.2 and less canPlayType method which is broken
	if (vjs.IS_OLD_ANDROID) {
	  document.createElement('video').constructor.prototype.canPlayType = function(type){
	    return (type && type.toLowerCase().indexOf('video/mp4') != -1) ? 'maybe' : '';
	  };
	}
	/**
	 * @fileoverview VideoJS-SWF - Custom Flash Player with HTML5-ish API
	 * https://github.com/zencoder/video-js-swf
	 * Not using setupTriggers. Using global onEvent func to distribute events
	 */
	
	/**
	 * Flash Media Controller - Wrapper for fallback SWF API
	 *
	 * @param {vjs.Player} player
	 * @param {Object=} options
	 * @param {Function=} ready
	 * @constructor
	 */
	vjs.Flash = vjs.MediaTechController.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.MediaTechController.call(this, player, options, ready);
	
	    var source = options['source'],
	
	        // Which element to embed in
	        parentEl = options['parentEl'],
	
	        // Create a temporary element to be replaced by swf object
	        placeHolder = this.el_ = vjs.createEl('div', { id: player.id() + '_temp_flash' }),
	
	        // Generate ID for swf object
	        objId = player.id()+'_flash_api',
	
	        // Store player options in local var for optimization
	        // TODO: switch to using player methods instead of options
	        // e.g. player.autoplay();
	        playerOptions = player.options_,
	
	        // Merge default flashvars with ones passed in to init
	        flashVars = vjs.obj.merge({
	
	          // SWF Callback Functions
	          'readyFunction': 'videojs.Flash.onReady',
	          'eventProxyFunction': 'videojs.Flash.onEvent',
	          'errorEventProxyFunction': 'videojs.Flash.onError',
	
	          // Player Settings
	          'autoplay': playerOptions.autoplay,
	          'preload': playerOptions.preload,
	          'loop': playerOptions.loop,
	          'muted': playerOptions.muted
	
	        }, options['flashVars']),
	
	        // Merge default parames with ones passed in
	        params = vjs.obj.merge({
	          'wmode': 'opaque', // Opaque is needed to overlay controls, but can affect playback performance
	          'bgcolor': '#000000' // Using bgcolor prevents a white flash when the object is loading
	        }, options['params']),
	
	        // Merge default attributes with ones passed in
	        attributes = vjs.obj.merge({
	          'id': objId,
	          'name': objId, // Both ID and Name needed or swf to identifty itself
	          'class': 'vjs-tech'
	        }, options['attributes'])
	    ;
	
	    // If source was supplied pass as a flash var.
	    if (source) {
	      if (source.type && vjs.Flash.isStreamingType(source.type)) {
	        var parts = vjs.Flash.streamToParts(source.src);
	        flashVars['rtmpConnection'] = encodeURIComponent(parts.connection);
	        flashVars['rtmpStream'] = encodeURIComponent(parts.stream);
	      }
	      else {
	        flashVars['src'] = encodeURIComponent(vjs.getAbsoluteURL(source.src));
	      }
	    }
	
	    // Add placeholder to player div
	    vjs.insertFirst(placeHolder, parentEl);
	
	    // Having issues with Flash reloading on certain page actions (hide/resize/fullscreen) in certain browsers
	    // This allows resetting the playhead when we catch the reload
	    if (options['startTime']) {
	      this.ready(function(){
	        this.load();
	        this.play();
	        this.currentTime(options['startTime']);
	      });
	    }
	
	    // Flash iFrame Mode
	    // In web browsers there are multiple instances where changing the parent element or visibility of a plugin causes the plugin to reload.
	    // - Firefox just about always. https://bugzilla.mozilla.org/show_bug.cgi?id=90268 (might be fixed by version 13)
	    // - Webkit when hiding the plugin
	    // - Webkit and Firefox when using requestFullScreen on a parent element
	    // Loading the flash plugin into a dynamically generated iFrame gets around most of these issues.
	    // Issues that remain include hiding the element and requestFullScreen in Firefox specifically
	
	    // There's on particularly annoying issue with this method which is that Firefox throws a security error on an offsite Flash object loaded into a dynamically created iFrame.
	    // Even though the iframe was inserted into a page on the web, Firefox + Flash considers it a local app trying to access an internet file.
	    // I tried mulitple ways of setting the iframe src attribute but couldn't find a src that worked well. Tried a real/fake source, in/out of domain.
	    // Also tried a method from stackoverflow that caused a security error in all browsers. http://stackoverflow.com/questions/2486901/how-to-set-document-domain-for-a-dynamically-generated-iframe
	    // In the end the solution I found to work was setting the iframe window.location.href right before doing a document.write of the Flash object.
	    // The only downside of this it seems to trigger another http request to the original page (no matter what's put in the href). Not sure why that is.
	
	    // NOTE (2012-01-29): Cannot get Firefox to load the remote hosted SWF into a dynamically created iFrame
	    // Firefox 9 throws a security error, unleess you call location.href right before doc.write.
	    //    Not sure why that even works, but it causes the browser to look like it's continuously trying to load the page.
	    // Firefox 3.6 keeps calling the iframe onload function anytime I write to it, causing an endless loop.
	
	    if (options['iFrameMode'] === true && !vjs.IS_FIREFOX) {
	
	      // Create iFrame with vjs-tech class so it's 100% width/height
	      var iFrm = vjs.createEl('iframe', {
	        'id': objId + '_iframe',
	        'name': objId + '_iframe',
	        'className': 'vjs-tech',
	        'scrolling': 'no',
	        'marginWidth': 0,
	        'marginHeight': 0,
	        'frameBorder': 0
	      });
	
	      // Update ready function names in flash vars for iframe window
	      flashVars['readyFunction'] = 'ready';
	      flashVars['eventProxyFunction'] = 'events';
	      flashVars['errorEventProxyFunction'] = 'errors';
	
	      // Tried multiple methods to get this to work in all browsers
	
	      // Tried embedding the flash object in the page first, and then adding a place holder to the iframe, then replacing the placeholder with the page object.
	      // The goal here was to try to load the swf URL in the parent page first and hope that got around the firefox security error
	      // var newObj = vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
	      // (in onload)
	      //  var temp = vjs.createEl('a', { id:'asdf', innerHTML: 'asdf' } );
	      //  iDoc.body.appendChild(temp);
	
	      // Tried embedding the flash object through javascript in the iframe source.
	      // This works in webkit but still triggers the firefox security error
	      // iFrm.src = 'javascript: document.write('"+vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes)+"');";
	
	      // Tried an actual local iframe just to make sure that works, but it kills the easiness of the CDN version if you require the user to host an iframe
	      // We should add an option to host the iframe locally though, because it could help a lot of issues.
	      // iFrm.src = "iframe.html";
	
	      // Wait until iFrame has loaded to write into it.
	      vjs.on(iFrm, 'load', vjs.bind(this, function(){
	
	        var iDoc,
	            iWin = iFrm.contentWindow;
	
	        // The one working method I found was to use the iframe's document.write() to create the swf object
	        // This got around the security issue in all browsers except firefox.
	        // I did find a hack where if I call the iframe's window.location.href='', it would get around the security error
	        // However, the main page would look like it was loading indefinitely (URL bar loading spinner would never stop)
	        // Plus Firefox 3.6 didn't work no matter what I tried.
	        // if (vjs.USER_AGENT.match('Firefox')) {
	        //   iWin.location.href = '';
	        // }
	
	        // Get the iFrame's document depending on what the browser supports
	        iDoc = iFrm.contentDocument ? iFrm.contentDocument : iFrm.contentWindow.document;
	
	        // Tried ensuring both document domains were the same, but they already were, so that wasn't the issue.
	        // Even tried adding /. that was mentioned in a browser security writeup
	        // document.domain = document.domain+'/.';
	        // iDoc.domain = document.domain+'/.';
	
	        // Tried adding the object to the iframe doc's innerHTML. Security error in all browsers.
	        // iDoc.body.innerHTML = swfObjectHTML;
	
	        // Tried appending the object to the iframe doc's body. Security error in all browsers.
	        // iDoc.body.appendChild(swfObject);
	
	        // Using document.write actually got around the security error that browsers were throwing.
	        // Again, it's a dynamically generated (same domain) iframe, loading an external Flash swf.
	        // Not sure why that's a security issue, but apparently it is.
	        iDoc.write(vjs.Flash.getEmbedCode(options['swf'], flashVars, params, attributes));
	
	        // Setting variables on the window needs to come after the doc write because otherwise they can get reset in some browsers
	        // So far no issues with swf ready event being called before it's set on the window.
	        iWin['player'] = this.player_;
	
	        // Create swf ready function for iFrame window
	        iWin['ready'] = vjs.bind(this.player_, function(currSwf){
	          var el = iDoc.getElementById(currSwf),
	              player = this,
	              tech = player.tech;
	
	          // Update reference to playback technology element
	          tech.el_ = el;
	
	          // Make sure swf is actually ready. Sometimes the API isn't actually yet.
	          vjs.Flash.checkReady(tech);
	        });
	
	        // Create event listener for all swf events
	        iWin['events'] = vjs.bind(this.player_, function(swfID, eventName){
	          var player = this;
	          if (player && player.techName === 'flash') {
	            player.trigger(eventName);
	          }
	        });
	
	        // Create error listener for all swf errors
	        iWin['errors'] = vjs.bind(this.player_, function(swfID, eventName){
	          vjs.log('Flash Error', eventName);
	        });
	
	      }));
	
	      // Replace placeholder with iFrame (it will load now)
	      placeHolder.parentNode.replaceChild(iFrm, placeHolder);
	
	    // If not using iFrame mode, embed as normal object
	    } else {
	      vjs.Flash.embed(options['swf'], placeHolder, flashVars, params, attributes);
	    }
	  }
	});
	
	vjs.Flash.prototype.dispose = function(){
	  vjs.MediaTechController.prototype.dispose.call(this);
	};
	
	vjs.Flash.prototype.play = function(){
	  this.el_.vjs_play();
	};
	
	vjs.Flash.prototype.pause = function(){
	  this.el_.vjs_pause();
	};
	
	vjs.Flash.prototype.src = function(src){
	  if (vjs.Flash.isStreamingSrc(src)) {
	    src = vjs.Flash.streamToParts(src);
	    this.setRtmpConnection(src.connection);
	    this.setRtmpStream(src.stream);
	  }
	  else {
	    // Make sure source URL is abosolute.
	    src = vjs.getAbsoluteURL(src);
	    this.el_.vjs_src(src);
	  }
	
	  // Currently the SWF doesn't autoplay if you load a source later.
	  // e.g. Load player w/ no source, wait 2s, set src.
	  if (this.player_.autoplay()) {
	    var tech = this;
	    setTimeout(function(){ tech.play(); }, 0);
	  }
	};
	
	vjs.Flash.prototype.currentSrc = function(){
	  var src = this.el_.vjs_getProperty('currentSrc');
	  // no src, check and see if RTMP
	  if (src == null) {
	    var connection = this.rtmpConnection(),
	        stream = this.rtmpStream();
	
	    if (connection && stream) {
	      src = vjs.Flash.streamFromParts(connection, stream);
	    }
	  }
	  return src;
	};
	
	vjs.Flash.prototype.load = function(){
	  this.el_.vjs_load();
	};
	
	vjs.Flash.prototype.poster = function(){
	  this.el_.vjs_getProperty('poster');
	};
	
	vjs.Flash.prototype.buffered = function(){
	  return vjs.createTimeRange(0, this.el_.vjs_getProperty('buffered'));
	};
	
	vjs.Flash.prototype.supportsFullScreen = function(){
	  return false; // Flash does not allow fullscreen through javascript
	};
	
	vjs.Flash.prototype.enterFullScreen = function(){
	  return false;
	};
	
	
	// Create setters and getters for attributes
	var api = vjs.Flash.prototype,
	    readWrite = 'rtmpConnection,rtmpStream,preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted'.split(','),
	    readOnly = 'error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks'.split(',');
	    // Overridden: buffered
	
	/**
	 * @this {*}
	 * @private
	 */
	var createSetter = function(attr){
	  var attrUpper = attr.charAt(0).toUpperCase() + attr.slice(1);
	  api['set'+attrUpper] = function(val){ return this.el_.vjs_setProperty(attr, val); };
	};
	
	/**
	 * @this {*}
	 * @private
	 */
	var createGetter = function(attr){
	  api[attr] = function(){ return this.el_.vjs_getProperty(attr); };
	};
	
	(function(){
	  var i;
	  // Create getter and setters for all read/write attributes
	  for (i = 0; i < readWrite.length; i++) {
	    createGetter(readWrite[i]);
	    createSetter(readWrite[i]);
	  }
	
	  // Create getters for read-only attributes
	  for (i = 0; i < readOnly.length; i++) {
	    createGetter(readOnly[i]);
	  }
	})();
	
	/* Flash Support Testing -------------------------------------------------------- */
	
	vjs.Flash.isSupported = function(){
	  return vjs.Flash.version()[0] >= 10;
	  // return swfobject.hasFlashPlayerVersion('10');
	};
	
	vjs.Flash.canPlaySource = function(srcObj){
	  var type;
	
	  if (!srcObj.type) {
	    return '';
	  }
	
	  type = srcObj.type.replace(/;.*/,'').toLowerCase();
	  if (type in vjs.Flash.formats || type in vjs.Flash.streamingFormats) {
	    return 'maybe';
	  }
	};
	
	vjs.Flash.formats = {
	  'video/flv': 'FLV',
	  'video/x-flv': 'FLV',
	  'video/mp4': 'MP4',
	  'video/m4v': 'MP4'
	};
	
	vjs.Flash.streamingFormats = {
	  'rtmp/mp4': 'MP4',
	  'rtmp/flv': 'FLV'
	};
	
	vjs.Flash['onReady'] = function(currSwf){
	  var el = vjs.el(currSwf);
	
	  // Get player from box
	  // On firefox reloads, el might already have a player
	  var player = el['player'] || el.parentNode['player'],
	      tech = player.tech;
	
	  // Reference player on tech element
	  el['player'] = player;
	
	  // Update reference to playback technology element
	  tech.el_ = el;
	
	  vjs.Flash.checkReady(tech);
	};
	
	// The SWF isn't alwasy ready when it says it is. Sometimes the API functions still need to be added to the object.
	// If it's not ready, we set a timeout to check again shortly.
	vjs.Flash.checkReady = function(tech){
	
	  // Check if API property exists
	  if (tech.el().vjs_getProperty) {
	
	    // If so, tell tech it's ready
	    tech.triggerReady();
	
	  // Otherwise wait longer.
	  } else {
	
	    setTimeout(function(){
	      vjs.Flash.checkReady(tech);
	    }, 50);
	
	  }
	};
	
	// Trigger events from the swf on the player
	vjs.Flash['onEvent'] = function(swfID, eventName){
	  var player = vjs.el(swfID)['player'];
	  player.trigger(eventName);
	};
	
	// Log errors from the swf
	vjs.Flash['onError'] = function(swfID, err){
	  var player = vjs.el(swfID)['player'];
	  player.trigger('error');
	  vjs.log('Flash Error', err, swfID);
	};
	
	// Flash Version Check
	vjs.Flash.version = function(){
	  var version = '0,0,0';
	
	  // IE
	  try {
	    version = new window.ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version').replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
	
	  // other browsers
	  } catch(e) {
	    try {
	      if (navigator.mimeTypes['application/x-shockwave-flash'].enabledPlugin){
	        version = (navigator.plugins['Shockwave Flash 2.0'] || navigator.plugins['Shockwave Flash']).description.replace(/\D+/g, ',').match(/^,?(.+),?$/)[1];
	      }
	    } catch(err) {}
	  }
	  return version.split(',');
	};
	
	// Flash embedding method. Only used in non-iframe mode
	vjs.Flash.embed = function(swf, placeHolder, flashVars, params, attributes){
	  var code = vjs.Flash.getEmbedCode(swf, flashVars, params, attributes),
	
	      // Get element by embedding code and retrieving created element
	      obj = vjs.createEl('div', { innerHTML: code }).childNodes[0],
	
	      par = placeHolder.parentNode
	  ;
	
	  placeHolder.parentNode.replaceChild(obj, placeHolder);
	
	  // IE6 seems to have an issue where it won't initialize the swf object after injecting it.
	  // This is a dumb fix
	  var newObj = par.childNodes[0];
	  setTimeout(function(){
	    newObj.style.display = 'block';
	  }, 1000);
	
	  return obj;
	
	};
	
	vjs.Flash.getEmbedCode = function(swf, flashVars, params, attributes){
	
	  var objTag = '<object type="application/x-shockwave-flash"',
	      flashVarsString = '',
	      paramsString = '',
	      attrsString = '';
	
	  // Convert flash vars to string
	  if (flashVars) {
	    vjs.obj.each(flashVars, function(key, val){
	      flashVarsString += (key + '=' + val + '&amp;');
	    });
	  }
	
	  // Add swf, flashVars, and other default params
	  params = vjs.obj.merge({
	    'movie': swf,
	    'flashvars': flashVarsString,
	    'allowScriptAccess': 'always', // Required to talk to swf
	    'allowNetworking': 'all' // All should be default, but having security issues.
	  }, params);
	
	  // Create param tags string
	  vjs.obj.each(params, function(key, val){
	    paramsString += '<param name="'+key+'" value="'+val+'" />';
	  });
	
	  attributes = vjs.obj.merge({
	    // Add swf to attributes (need both for IE and Others to work)
	    'data': swf,
	
	    // Default to 100% width/height
	    'width': '100%',
	    'height': '100%'
	
	  }, attributes);
	
	  // Create Attributes string
	  vjs.obj.each(attributes, function(key, val){
	    attrsString += (key + '="' + val + '" ');
	  });
	
	  return objTag + attrsString + '>' + paramsString + '</object>';
	};
	
	vjs.Flash.streamFromParts = function(connection, stream) {
	  return connection + '&' + stream;
	};
	
	vjs.Flash.streamToParts = function(src) {
	  var parts = {
	    connection: '',
	    stream: ''
	  };
	
	  if (! src) {
	    return parts;
	  }
	
	  // Look for the normal URL separator we expect, '&'.
	  // If found, we split the URL into two pieces around the
	  // first '&'.
	  var connEnd = src.indexOf('&');
	  var streamBegin;
	  if (connEnd !== -1) {
	    streamBegin = connEnd + 1;
	  }
	  else {
	    // If there's not a '&', we use the last '/' as the delimiter.
	    connEnd = streamBegin = src.lastIndexOf('/') + 1;
	    if (connEnd === 0) {
	      // really, there's not a '/'?
	      connEnd = streamBegin = src.length;
	    }
	  }
	  parts.connection = src.substring(0, connEnd);
	  parts.stream = src.substring(streamBegin, src.length);
	
	  return parts;
	};
	
	vjs.Flash.isStreamingType = function(srcType) {
	  return srcType in vjs.Flash.streamingFormats;
	};
	
	// RTMP has four variations, any string starting
	// with one of these protocols should be valid
	vjs.Flash.RTMP_RE = /^rtmp[set]?:\/\//i;
	
	vjs.Flash.isStreamingSrc = function(src) {
	  return vjs.Flash.RTMP_RE.test(src);
	};
	/**
	 * The Media Loader is the component that decides which playback technology to load
	 * when the player is initialized.
	 *
	 * @constructor
	 */
	vjs.MediaLoader = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.Component.call(this, player, options, ready);
	
	    // If there are no sources when the player is initialized,
	    // load the first supported playback technology.
	    if (!player.options_['sources'] || player.options_['sources'].length === 0) {
	      for (var i=0,j=player.options_['techOrder']; i<j.length; i++) {
	        var techName = vjs.capitalize(j[i]),
	            tech = window['videojs'][techName];
	
	        // Check if the browser supports this technology
	        if (tech && tech.isSupported()) {
	          player.loadTech(techName);
	          break;
	        }
	      }
	    } else {
	      // // Loop through playback technologies (HTML5, Flash) and check for support.
	      // // Then load the best source.
	      // // A few assumptions here:
	      // //   All playback technologies respect preload false.
	      player.src(player.options_['sources']);
	    }
	  }
	});
	/**
	 * @fileoverview Text Tracks
	 * Text tracks are tracks of timed text events.
	 * Captions - text displayed over the video for the hearing impared
	 * Subtitles - text displayed over the video for those who don't understand langauge in the video
	 * Chapters - text displayed in a menu allowing the user to jump to particular points (chapters) in the video
	 * Descriptions (not supported yet) - audio descriptions that are read back to the user by a screen reading device
	 */
	
	// Player Additions - Functions add to the player object for easier access to tracks
	
	/**
	 * List of associated text tracks
	 * @type {Array}
	 * @private
	 */
	vjs.Player.prototype.textTracks_;
	
	/**
	 * Get an array of associated text tracks. captions, subtitles, chapters, descriptions
	 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-texttracks
	 * @return {Array}           Array of track objects
	 * @private
	 */
	vjs.Player.prototype.textTracks = function(){
	  this.textTracks_ = this.textTracks_ || [];
	  return this.textTracks_;
	};
	
	/**
	 * Add a text track
	 * In addition to the W3C settings we allow adding additional info through options.
	 * http://www.w3.org/html/wg/drafts/html/master/embedded-content-0.html#dom-media-addtexttrack
	 * @param {String}  kind        Captions, subtitles, chapters, descriptions, or metadata
	 * @param {String=} label       Optional label
	 * @param {String=} language    Optional language
	 * @param {Object=} options     Additional track options, like src
	 * @private
	 */
	vjs.Player.prototype.addTextTrack = function(kind, label, language, options){
	  var tracks = this.textTracks_ = this.textTracks_ || [];
	  options = options || {};
	
	  options['kind'] = kind;
	  options['label'] = label;
	  options['language'] = language;
	
	  // HTML5 Spec says default to subtitles.
	  // Uppercase first letter to match class names
	  var Kind = vjs.capitalize(kind || 'subtitles');
	
	  // Create correct texttrack class. CaptionsTrack, etc.
	  var track = new window['videojs'][Kind + 'Track'](this, options);
	
	  tracks.push(track);
	
	  // If track.dflt() is set, start showing immediately
	  // TODO: Add a process to deterime the best track to show for the specific kind
	  // Incase there are mulitple defaulted tracks of the same kind
	  // Or the user has a set preference of a specific language that should override the default
	  // if (track.dflt()) {
	  //   this.ready(vjs.bind(track, track.show));
	  // }
	
	  return track;
	};
	
	/**
	 * Add an array of text tracks. captions, subtitles, chapters, descriptions
	 * Track objects will be stored in the player.textTracks() array
	 * @param {Array} trackList Array of track elements or objects (fake track elements)
	 * @private
	 */
	vjs.Player.prototype.addTextTracks = function(trackList){
	  var trackObj;
	
	  for (var i = 0; i < trackList.length; i++) {
	    trackObj = trackList[i];
	    this.addTextTrack(trackObj['kind'], trackObj['label'], trackObj['language'], trackObj);
	  }
	
	  return this;
	};
	
	// Show a text track
	// disableSameKind: disable all other tracks of the same kind. Value should be a track kind (captions, etc.)
	vjs.Player.prototype.showTextTrack = function(id, disableSameKind){
	  var tracks = this.textTracks_,
	      i = 0,
	      j = tracks.length,
	      track, showTrack, kind;
	
	  // Find Track with same ID
	  for (;i<j;i++) {
	    track = tracks[i];
	    if (track.id() === id) {
	      track.show();
	      showTrack = track;
	
	    // Disable tracks of the same kind
	    } else if (disableSameKind && track.kind() == disableSameKind && track.mode() > 0) {
	      track.disable();
	    }
	  }
	
	  // Get track kind from shown track or disableSameKind
	  kind = (showTrack) ? showTrack.kind() : ((disableSameKind) ? disableSameKind : false);
	
	  // Trigger trackchange event, captionstrackchange, subtitlestrackchange, etc.
	  if (kind) {
	    this.trigger(kind+'trackchange');
	  }
	
	  return this;
	};
	
	/**
	 * The base class for all text tracks
	 *
	 * Handles the parsing, hiding, and showing of text track cues
	 *
	 * @param {vjs.Player|Object} player
	 * @param {Object=} options
	 * @constructor
	 */
	vjs.TextTrack = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.Component.call(this, player, options);
	
	    // Apply track info to track object
	    // Options will often be a track element
	
	    // Build ID if one doesn't exist
	    this.id_ = options['id'] || ('vjs_' + options['kind'] + '_' + options['language'] + '_' + vjs.guid++);
	    this.src_ = options['src'];
	    // 'default' is a reserved keyword in js so we use an abbreviated version
	    this.dflt_ = options['default'] || options['dflt'];
	    this.title_ = options['title'];
	    this.language_ = options['srclang'];
	    this.label_ = options['label'];
	    this.cues_ = [];
	    this.activeCues_ = [];
	    this.readyState_ = 0;
	    this.mode_ = 0;
	
	    this.player_.on('fullscreenchange', vjs.bind(this, this.adjustFontSize));
	  }
	});
	
	/**
	 * Track kind value. Captions, subtitles, etc.
	 * @private
	 */
	vjs.TextTrack.prototype.kind_;
	
	/**
	 * Get the track kind value
	 * @return {String}
	 */
	vjs.TextTrack.prototype.kind = function(){
	  return this.kind_;
	};
	
	/**
	 * Track src value
	 * @private
	 */
	vjs.TextTrack.prototype.src_;
	
	/**
	 * Get the track src value
	 * @return {String}
	 */
	vjs.TextTrack.prototype.src = function(){
	  return this.src_;
	};
	
	/**
	 * Track default value
	 * If default is used, subtitles/captions to start showing
	 * @private
	 */
	vjs.TextTrack.prototype.dflt_;
	
	/**
	 * Get the track default value. ('default' is a reserved keyword)
	 * @return {Boolean}
	 */
	vjs.TextTrack.prototype.dflt = function(){
	  return this.dflt_;
	};
	
	/**
	 * Track title value
	 * @private
	 */
	vjs.TextTrack.prototype.title_;
	
	/**
	 * Get the track title value
	 * @return {String}
	 */
	vjs.TextTrack.prototype.title = function(){
	  return this.title_;
	};
	
	/**
	 * Language - two letter string to represent track language, e.g. 'en' for English
	 * Spec def: readonly attribute DOMString language;
	 * @private
	 */
	vjs.TextTrack.prototype.language_;
	
	/**
	 * Get the track language value
	 * @return {String}
	 */
	vjs.TextTrack.prototype.language = function(){
	  return this.language_;
	};
	
	/**
	 * Track label e.g. 'English'
	 * Spec def: readonly attribute DOMString label;
	 * @private
	 */
	vjs.TextTrack.prototype.label_;
	
	/**
	 * Get the track label value
	 * @return {String}
	 */
	vjs.TextTrack.prototype.label = function(){
	  return this.label_;
	};
	
	/**
	 * All cues of the track. Cues have a startTime, endTime, text, and other properties.
	 * Spec def: readonly attribute TextTrackCueList cues;
	 * @private
	 */
	vjs.TextTrack.prototype.cues_;
	
	/**
	 * Get the track cues
	 * @return {Array}
	 */
	vjs.TextTrack.prototype.cues = function(){
	  return this.cues_;
	};
	
	/**
	 * ActiveCues is all cues that are currently showing
	 * Spec def: readonly attribute TextTrackCueList activeCues;
	 * @private
	 */
	vjs.TextTrack.prototype.activeCues_;
	
	/**
	 * Get the track active cues
	 * @return {Array}
	 */
	vjs.TextTrack.prototype.activeCues = function(){
	  return this.activeCues_;
	};
	
	/**
	 * ReadyState describes if the text file has been loaded
	 * const unsigned short NONE = 0;
	 * const unsigned short LOADING = 1;
	 * const unsigned short LOADED = 2;
	 * const unsigned short ERROR = 3;
	 * readonly attribute unsigned short readyState;
	 * @private
	 */
	vjs.TextTrack.prototype.readyState_;
	
	/**
	 * Get the track readyState
	 * @return {Number}
	 */
	vjs.TextTrack.prototype.readyState = function(){
	  return this.readyState_;
	};
	
	/**
	 * Mode describes if the track is showing, hidden, or disabled
	 * const unsigned short OFF = 0;
	 * const unsigned short HIDDEN = 1; (still triggering cuechange events, but not visible)
	 * const unsigned short SHOWING = 2;
	 * attribute unsigned short mode;
	 * @private
	 */
	vjs.TextTrack.prototype.mode_;
	
	/**
	 * Get the track mode
	 * @return {Number}
	 */
	vjs.TextTrack.prototype.mode = function(){
	  return this.mode_;
	};
	
	/**
	 * Change the font size of the text track to make it larger when playing in fullscreen mode
	 * and restore it to its normal size when not in fullscreen mode.
	 */
	vjs.TextTrack.prototype.adjustFontSize = function(){
	    if (this.player_.isFullScreen) {
	        // Scale the font by the same factor as increasing the video width to the full screen window width.
	        // Additionally, multiply that factor by 1.4, which is the default font size for
	        // the caption track (from the CSS)
	        this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + '%';
	    } else {
	        // Change the font size of the text track back to its original non-fullscreen size
	        this.el_.style.fontSize = '';
	    }
	};
	
	/**
	 * Create basic div to hold cue text
	 * @return {Element}
	 */
	vjs.TextTrack.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-' + this.kind_ + ' vjs-text-track'
	  });
	};
	
	/**
	 * Show: Mode Showing (2)
	 * Indicates that the text track is active. If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
	 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
	 * In addition, for text tracks whose kind is subtitles or captions, the cues are being displayed over the video as appropriate;
	 * for text tracks whose kind is descriptions, the user agent is making the cues available to the user in a non-visual fashion;
	 * and for text tracks whose kind is chapters, the user agent is making available to the user a mechanism by which the user can navigate to any point in the media resource by selecting a cue.
	 * The showing by default state is used in conjunction with the default attribute on track elements to indicate that the text track was enabled due to that attribute.
	 * This allows the user agent to override the state if a later track is discovered that is more appropriate per the user's preferences.
	 */
	vjs.TextTrack.prototype.show = function(){
	  this.activate();
	
	  this.mode_ = 2;
	
	  // Show element.
	  vjs.Component.prototype.show.call(this);
	};
	
	/**
	 * Hide: Mode Hidden (1)
	 * Indicates that the text track is active, but that the user agent is not actively displaying the cues.
	 * If no attempt has yet been made to obtain the track's cues, the user agent will perform such an attempt momentarily.
	 * The user agent is maintaining a list of which cues are active, and events are being fired accordingly.
	 */
	vjs.TextTrack.prototype.hide = function(){
	  // When hidden, cues are still triggered. Disable to stop triggering.
	  this.activate();
	
	  this.mode_ = 1;
	
	  // Hide element.
	  vjs.Component.prototype.hide.call(this);
	};
	
	/**
	 * Disable: Mode Off/Disable (0)
	 * Indicates that the text track is not active. Other than for the purposes of exposing the track in the DOM, the user agent is ignoring the text track.
	 * No cues are active, no events are fired, and the user agent will not attempt to obtain the track's cues.
	 */
	vjs.TextTrack.prototype.disable = function(){
	  // If showing, hide.
	  if (this.mode_ == 2) { this.hide(); }
	
	  // Stop triggering cues
	  this.deactivate();
	
	  // Switch Mode to Off
	  this.mode_ = 0;
	};
	
	/**
	 * Turn on cue tracking. Tracks that are showing OR hidden are active.
	 */
	vjs.TextTrack.prototype.activate = function(){
	  // Load text file if it hasn't been yet.
	  if (this.readyState_ === 0) { this.load(); }
	
	  // Only activate if not already active.
	  if (this.mode_ === 0) {
	    // Update current cue on timeupdate
	    // Using unique ID for bind function so other tracks don't remove listener
	    this.player_.on('timeupdate', vjs.bind(this, this.update, this.id_));
	
	    // Reset cue time on media end
	    this.player_.on('ended', vjs.bind(this, this.reset, this.id_));
	
	    // Add to display
	    if (this.kind_ === 'captions' || this.kind_ === 'subtitles') {
	      this.player_.getChild('textTrackDisplay').addChild(this);
	    }
	  }
	};
	
	/**
	 * Turn off cue tracking.
	 */
	vjs.TextTrack.prototype.deactivate = function(){
	  // Using unique ID for bind function so other tracks don't remove listener
	  this.player_.off('timeupdate', vjs.bind(this, this.update, this.id_));
	  this.player_.off('ended', vjs.bind(this, this.reset, this.id_));
	  this.reset(); // Reset
	
	  // Remove from display
	  this.player_.getChild('textTrackDisplay').removeChild(this);
	};
	
	// A readiness state
	// One of the following:
	//
	// Not loaded
	// Indicates that the text track is known to exist (e.g. it has been declared with a track element), but its cues have not been obtained.
	//
	// Loading
	// Indicates that the text track is loading and there have been no fatal errors encountered so far. Further cues might still be added to the track.
	//
	// Loaded
	// Indicates that the text track has been loaded with no fatal errors. No new cues will be added to the track except if the text track corresponds to a MutableTextTrack object.
	//
	// Failed to load
	// Indicates that the text track was enabled, but when the user agent attempted to obtain it, this failed in some way (e.g. URL could not be resolved, network error, unknown text track format). Some or all of the cues are likely missing and will not be obtained.
	vjs.TextTrack.prototype.load = function(){
	
	  // Only load if not loaded yet.
	  if (this.readyState_ === 0) {
	    this.readyState_ = 1;
	    vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError));
	  }
	
	};
	
	vjs.TextTrack.prototype.onError = function(err){
	  this.error = err;
	  this.readyState_ = 3;
	  this.trigger('error');
	};
	
	// Parse the WebVTT text format for cue times.
	// TODO: Separate parser into own class so alternative timed text formats can be used. (TTML, DFXP)
	vjs.TextTrack.prototype.parseCues = function(srcContent) {
	  var cue, time, text,
	      lines = srcContent.split('\n'),
	      line = '', id;
	
	  for (var i=1, j=lines.length; i<j; i++) {
	    // Line 0 should be 'WEBVTT', so skipping i=0
	
	    line = vjs.trim(lines[i]); // Trim whitespace and linebreaks
	
	    if (line) { // Loop until a line with content
	
	      // First line could be an optional cue ID
	      // Check if line has the time separator
	      if (line.indexOf('-->') == -1) {
	        id = line;
	        // Advance to next line for timing.
	        line = vjs.trim(lines[++i]);
	      } else {
	        id = this.cues_.length;
	      }
	
	      // First line - Number
	      cue = {
	        id: id, // Cue Number
	        index: this.cues_.length // Position in Array
	      };
	
	      // Timing line
	      time = line.split(' --> ');
	      cue.startTime = this.parseCueTime(time[0]);
	      cue.endTime = this.parseCueTime(time[1]);
	
	      // Additional lines - Cue Text
	      text = [];
	
	      // Loop until a blank line or end of lines
	      // Assumeing trim('') returns false for blank lines
	      while (lines[++i] && (line = vjs.trim(lines[i]))) {
	        text.push(line);
	      }
	
	      cue.text = text.join('<br/>');
	
	      // Add this cue
	      this.cues_.push(cue);
	    }
	  }
	
	  this.readyState_ = 2;
	  this.trigger('loaded');
	};
	
	
	vjs.TextTrack.prototype.parseCueTime = function(timeText) {
	  var parts = timeText.split(':'),
	      time = 0,
	      hours, minutes, other, seconds, ms;
	
	  // Check if optional hours place is included
	  // 00:00:00.000 vs. 00:00.000
	  if (parts.length == 3) {
	    hours = parts[0];
	    minutes = parts[1];
	    other = parts[2];
	  } else {
	    hours = 0;
	    minutes = parts[0];
	    other = parts[1];
	  }
	
	  // Break other (seconds, milliseconds, and flags) by spaces
	  // TODO: Make additional cue layout settings work with flags
	  other = other.split(/\s+/);
	  // Remove seconds. Seconds is the first part before any spaces.
	  seconds = other.splice(0,1)[0];
	  // Could use either . or , for decimal
	  seconds = seconds.split(/\.|,/);
	  // Get milliseconds
	  ms = parseFloat(seconds[1]);
	  seconds = seconds[0];
	
	  // hours => seconds
	  time += parseFloat(hours) * 3600;
	  // minutes => seconds
	  time += parseFloat(minutes) * 60;
	  // Add seconds
	  time += parseFloat(seconds);
	  // Add milliseconds
	  if (ms) { time += ms/1000; }
	
	  return time;
	};
	
	// Update active cues whenever timeupdate events are triggered on the player.
	vjs.TextTrack.prototype.update = function(){
	  if (this.cues_.length > 0) {
	
	    // Get curent player time
	    var time = this.player_.currentTime();
	
	    // Check if the new time is outside the time box created by the the last update.
	    if (this.prevChange === undefined || time < this.prevChange || this.nextChange <= time) {
	      var cues = this.cues_,
	
	          // Create a new time box for this state.
	          newNextChange = this.player_.duration(), // Start at beginning of the timeline
	          newPrevChange = 0, // Start at end
	
	          reverse = false, // Set the direction of the loop through the cues. Optimized the cue check.
	          newCues = [], // Store new active cues.
	
	          // Store where in the loop the current active cues are, to provide a smart starting point for the next loop.
	          firstActiveIndex, lastActiveIndex,
	          cue, i; // Loop vars
	
	      // Check if time is going forwards or backwards (scrubbing/rewinding)
	      // If we know the direction we can optimize the starting position and direction of the loop through the cues array.
	      if (time >= this.nextChange || this.nextChange === undefined) { // NextChange should happen
	        // Forwards, so start at the index of the first active cue and loop forward
	        i = (this.firstActiveIndex !== undefined) ? this.firstActiveIndex : 0;
	      } else {
	        // Backwards, so start at the index of the last active cue and loop backward
	        reverse = true;
	        i = (this.lastActiveIndex !== undefined) ? this.lastActiveIndex : cues.length - 1;
	      }
	
	      while (true) { // Loop until broken
	        cue = cues[i];
	
	        // Cue ended at this point
	        if (cue.endTime <= time) {
	          newPrevChange = Math.max(newPrevChange, cue.endTime);
	
	          if (cue.active) {
	            cue.active = false;
	          }
	
	          // No earlier cues should have an active start time.
	          // Nevermind. Assume first cue could have a duration the same as the video.
	          // In that case we need to loop all the way back to the beginning.
	          // if (reverse && cue.startTime) { break; }
	
	        // Cue hasn't started
	        } else if (time < cue.startTime) {
	          newNextChange = Math.min(newNextChange, cue.startTime);
	
	          if (cue.active) {
	            cue.active = false;
	          }
	
	          // No later cues should have an active start time.
	          if (!reverse) { break; }
	
	        // Cue is current
	        } else {
	
	          if (reverse) {
	            // Add cue to front of array to keep in time order
	            newCues.splice(0,0,cue);
	
	            // If in reverse, the first current cue is our lastActiveCue
	            if (lastActiveIndex === undefined) { lastActiveIndex = i; }
	            firstActiveIndex = i;
	          } else {
	            // Add cue to end of array
	            newCues.push(cue);
	
	            // If forward, the first current cue is our firstActiveIndex
	            if (firstActiveIndex === undefined) { firstActiveIndex = i; }
	            lastActiveIndex = i;
	          }
	
	          newNextChange = Math.min(newNextChange, cue.endTime);
	          newPrevChange = Math.max(newPrevChange, cue.startTime);
	
	          cue.active = true;
	        }
	
	        if (reverse) {
	          // Reverse down the array of cues, break if at first
	          if (i === 0) { break; } else { i--; }
	        } else {
	          // Walk up the array fo cues, break if at last
	          if (i === cues.length - 1) { break; } else { i++; }
	        }
	
	      }
	
	      this.activeCues_ = newCues;
	      this.nextChange = newNextChange;
	      this.prevChange = newPrevChange;
	      this.firstActiveIndex = firstActiveIndex;
	      this.lastActiveIndex = lastActiveIndex;
	
	      this.updateDisplay();
	
	      this.trigger('cuechange');
	    }
	  }
	};
	
	// Add cue HTML to display
	vjs.TextTrack.prototype.updateDisplay = function(){
	  var cues = this.activeCues_,
	      html = '',
	      i=0,j=cues.length;
	
	  for (;i<j;i++) {
	    html += '<span class="vjs-tt-cue">'+cues[i].text+'</span>';
	  }
	
	  this.el_.innerHTML = html;
	};
	
	// Set all loop helper values back
	vjs.TextTrack.prototype.reset = function(){
	  this.nextChange = 0;
	  this.prevChange = this.player_.duration();
	  this.firstActiveIndex = 0;
	  this.lastActiveIndex = 0;
	};
	
	// Create specific track types
	/**
	 * The track component for managing the hiding and showing of captions
	 *
	 * @constructor
	 */
	vjs.CaptionsTrack = vjs.TextTrack.extend();
	vjs.CaptionsTrack.prototype.kind_ = 'captions';
	// Exporting here because Track creation requires the track kind
	// to be available on global object. e.g. new window['videojs'][Kind + 'Track']
	
	/**
	 * The track component for managing the hiding and showing of subtitles
	 *
	 * @constructor
	 */
	vjs.SubtitlesTrack = vjs.TextTrack.extend();
	vjs.SubtitlesTrack.prototype.kind_ = 'subtitles';
	
	/**
	 * The track component for managing the hiding and showing of chapters
	 *
	 * @constructor
	 */
	vjs.ChaptersTrack = vjs.TextTrack.extend();
	vjs.ChaptersTrack.prototype.kind_ = 'chapters';
	
	
	/* Text Track Display
	============================================================================= */
	// Global container for both subtitle and captions text. Simple div container.
	
	/**
	 * The component for displaying text track cues
	 *
	 * @constructor
	 */
	vjs.TextTrackDisplay = vjs.Component.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.Component.call(this, player, options, ready);
	
	    // This used to be called during player init, but was causing an error
	    // if a track should show by default and the display hadn't loaded yet.
	    // Should probably be moved to an external track loader when we support
	    // tracks that don't need a display.
	    if (player.options_['tracks'] && player.options_['tracks'].length > 0) {
	      this.player_.addTextTracks(player.options_['tracks']);
	    }
	  }
	});
	
	vjs.TextTrackDisplay.prototype.createEl = function(){
	  return vjs.Component.prototype.createEl.call(this, 'div', {
	    className: 'vjs-text-track-display'
	  });
	};
	
	
	/**
	 * The specific menu item type for selecting a language within a text track kind
	 *
	 * @constructor
	 */
	vjs.TextTrackMenuItem = vjs.MenuItem.extend({
	  /** @constructor */
	  init: function(player, options){
	    var track = this.track = options['track'];
	
	    // Modify options for parent MenuItem class's init.
	    options['label'] = track.label();
	    options['selected'] = track.dflt();
	    vjs.MenuItem.call(this, player, options);
	
	    this.player_.on(track.kind() + 'trackchange', vjs.bind(this, this.update));
	  }
	});
	
	vjs.TextTrackMenuItem.prototype.onClick = function(){
	  vjs.MenuItem.prototype.onClick.call(this);
	  this.player_.showTextTrack(this.track.id_, this.track.kind());
	};
	
	vjs.TextTrackMenuItem.prototype.update = function(){
	  this.selected(this.track.mode() == 2);
	};
	
	/**
	 * A special menu item for turning of a specific type of text track
	 *
	 * @constructor
	 */
	vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
	  /** @constructor */
	  init: function(player, options){
	    // Create pseudo track info
	    // Requires options['kind']
	    options['track'] = {
	      kind: function() { return options['kind']; },
	      player: player,
	      label: function(){ return options['kind'] + ' off'; },
	      dflt: function(){ return false; },
	      mode: function(){ return false; }
	    };
	    vjs.TextTrackMenuItem.call(this, player, options);
	    this.selected(true);
	  }
	});
	
	vjs.OffTextTrackMenuItem.prototype.onClick = function(){
	  vjs.TextTrackMenuItem.prototype.onClick.call(this);
	  this.player_.showTextTrack(this.track.id_, this.track.kind());
	};
	
	vjs.OffTextTrackMenuItem.prototype.update = function(){
	  var tracks = this.player_.textTracks(),
	      i=0, j=tracks.length, track,
	      off = true;
	
	  for (;i<j;i++) {
	    track = tracks[i];
	    if (track.kind() == this.track.kind() && track.mode() == 2) {
	      off = false;
	    }
	  }
	
	  this.selected(off);
	};
	
	/**
	 * The base class for buttons that toggle specific text track types (e.g. subtitles)
	 *
	 * @constructor
	 */
	vjs.TextTrackButton = vjs.MenuButton.extend({
	  /** @constructor */
	  init: function(player, options){
	    vjs.MenuButton.call(this, player, options);
	
	    if (this.items.length <= 1) {
	      this.hide();
	    }
	  }
	});
	
	// vjs.TextTrackButton.prototype.buttonPressed = false;
	
	// vjs.TextTrackButton.prototype.createMenu = function(){
	//   var menu = new vjs.Menu(this.player_);
	
	//   // Add a title list item to the top
	//   // menu.el().appendChild(vjs.createEl('li', {
	//   //   className: 'vjs-menu-title',
	//   //   innerHTML: vjs.capitalize(this.kind_),
	//   //   tabindex: -1
	//   // }));
	
	//   this.items = this.createItems();
	
	//   // Add menu items to the menu
	//   for (var i = 0; i < this.items.length; i++) {
	//     menu.addItem(this.items[i]);
	//   }
	
	//   // Add list to element
	//   this.addChild(menu);
	
	//   return menu;
	// };
	
	// Create a menu item for each text track
	vjs.TextTrackButton.prototype.createItems = function(){
	  var items = [], track;
	
	  // Add an OFF menu item to turn all tracks off
	  items.push(new vjs.OffTextTrackMenuItem(this.player_, { 'kind': this.kind_ }));
	
	  for (var i = 0; i < this.player_.textTracks().length; i++) {
	    track = this.player_.textTracks()[i];
	    if (track.kind() === this.kind_) {
	      items.push(new vjs.TextTrackMenuItem(this.player_, {
	        'track': track
	      }));
	    }
	  }
	
	  return items;
	};
	
	/**
	 * The button component for toggling and selecting captions
	 *
	 * @constructor
	 */
	vjs.CaptionsButton = vjs.TextTrackButton.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.TextTrackButton.call(this, player, options, ready);
	    this.el_.setAttribute('aria-label','Captions Menu');
	  }
	});
	vjs.CaptionsButton.prototype.kind_ = 'captions';
	vjs.CaptionsButton.prototype.buttonText = 'Captions';
	vjs.CaptionsButton.prototype.className = 'vjs-captions-button';
	
	/**
	 * The button component for toggling and selecting subtitles
	 *
	 * @constructor
	 */
	vjs.SubtitlesButton = vjs.TextTrackButton.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.TextTrackButton.call(this, player, options, ready);
	    this.el_.setAttribute('aria-label','Subtitles Menu');
	  }
	});
	vjs.SubtitlesButton.prototype.kind_ = 'subtitles';
	vjs.SubtitlesButton.prototype.buttonText = 'Subtitles';
	vjs.SubtitlesButton.prototype.className = 'vjs-subtitles-button';
	
	// Chapters act much differently than other text tracks
	// Cues are navigation vs. other tracks of alternative languages
	/**
	 * The button component for toggling and selecting chapters
	 *
	 * @constructor
	 */
	vjs.ChaptersButton = vjs.TextTrackButton.extend({
	  /** @constructor */
	  init: function(player, options, ready){
	    vjs.TextTrackButton.call(this, player, options, ready);
	    this.el_.setAttribute('aria-label','Chapters Menu');
	  }
	});
	vjs.ChaptersButton.prototype.kind_ = 'chapters';
	vjs.ChaptersButton.prototype.buttonText = 'Chapters';
	vjs.ChaptersButton.prototype.className = 'vjs-chapters-button';
	
	// Create a menu item for each text track
	vjs.ChaptersButton.prototype.createItems = function(){
	  var items = [], track;
	
	  for (var i = 0; i < this.player_.textTracks().length; i++) {
	    track = this.player_.textTracks()[i];
	    if (track.kind() === this.kind_) {
	      items.push(new vjs.TextTrackMenuItem(this.player_, {
	        'track': track
	      }));
	    }
	  }
	
	  return items;
	};
	
	vjs.ChaptersButton.prototype.createMenu = function(){
	  var tracks = this.player_.textTracks(),
	      i = 0,
	      j = tracks.length,
	      track, chaptersTrack,
	      items = this.items = [];
	
	  for (;i<j;i++) {
	    track = tracks[i];
	    if (track.kind() == this.kind_ && track.dflt()) {
	      if (track.readyState() < 2) {
	        this.chaptersTrack = track;
	        track.on('loaded', vjs.bind(this, this.createMenu));
	        return;
	      } else {
	        chaptersTrack = track;
	        break;
	      }
	    }
	  }
	
	  var menu = this.menu = new vjs.Menu(this.player_);
	
	  menu.el_.appendChild(vjs.createEl('li', {
	    className: 'vjs-menu-title',
	    innerHTML: vjs.capitalize(this.kind_),
	    tabindex: -1
	  }));
	
	  if (chaptersTrack) {
	    var cues = chaptersTrack.cues_, cue, mi;
	    i = 0;
	    j = cues.length;
	
	    for (;i<j;i++) {
	      cue = cues[i];
	
	      mi = new vjs.ChaptersTrackMenuItem(this.player_, {
	        'track': chaptersTrack,
	        'cue': cue
	      });
	
	      items.push(mi);
	
	      menu.addChild(mi);
	    }
	  }
	
	  if (this.items.length > 0) {
	    this.show();
	  }
	
	  return menu;
	};
	
	
	/**
	 * @constructor
	 */
	vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
	  /** @constructor */
	  init: function(player, options){
	    var track = this.track = options['track'],
	        cue = this.cue = options['cue'],
	        currentTime = player.currentTime();
	
	    // Modify options for parent MenuItem class's init.
	    options['label'] = cue.text;
	    options['selected'] = (cue.startTime <= currentTime && currentTime < cue.endTime);
	    vjs.MenuItem.call(this, player, options);
	
	    track.on('cuechange', vjs.bind(this, this.update));
	  }
	});
	
	vjs.ChaptersTrackMenuItem.prototype.onClick = function(){
	  vjs.MenuItem.prototype.onClick.call(this);
	  this.player_.currentTime(this.cue.startTime);
	  this.update(this.cue.startTime);
	};
	
	vjs.ChaptersTrackMenuItem.prototype.update = function(){
	  var cue = this.cue,
	      currentTime = this.player_.currentTime();
	
	  // vjs.log(currentTime, cue.startTime);
	  this.selected(cue.startTime <= currentTime && currentTime < cue.endTime);
	};
	
	// Add Buttons to controlBar
	vjs.obj.merge(vjs.ControlBar.prototype.options_['children'], {
	  'subtitlesButton': {},
	  'captionsButton': {},
	  'chaptersButton': {}
	});
	
	// vjs.Cue = vjs.Component.extend({
	//   /** @constructor */
	//   init: function(player, options){
	//     vjs.Component.call(this, player, options);
	//   }
	// });
	/**
	 * @fileoverview Add JSON support
	 * @suppress {undefinedVars}
	 * (Compiler doesn't like JSON not being declared)
	 */
	
	/**
	 * Javascript JSON implementation
	 * (Parse Method Only)
	 * https://github.com/douglascrockford/JSON-js/blob/master/json2.js
	 * Only using for parse method when parsing data-setup attribute JSON.
	 * @suppress {undefinedVars}
	 * @namespace
	 * @private
	 */
	vjs.JSON;
	
	if (typeof window.JSON !== 'undefined' && window.JSON.parse === 'function') {
	  vjs.JSON = window.JSON;
	
	} else {
	  vjs.JSON = {};
	
	  var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
	
	  /**
	   * parse the json
	   *
	   * @memberof vjs.JSON
	   * @return {Object|Array} The parsed JSON
	   */
	  vjs.JSON.parse = function (text, reviver) {
	      var j;
	
	      function walk(holder, key) {
	          var k, v, value = holder[key];
	          if (value && typeof value === 'object') {
	              for (k in value) {
	                  if (Object.prototype.hasOwnProperty.call(value, k)) {
	                      v = walk(value, k);
	                      if (v !== undefined) {
	                          value[k] = v;
	                      } else {
	                          delete value[k];
	                      }
	                  }
	              }
	          }
	          return reviver.call(holder, key, value);
	      }
	      text = String(text);
	      cx.lastIndex = 0;
	      if (cx.test(text)) {
	          text = text.replace(cx, function (a) {
	              return '\\u' +
	                  ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
	          });
	      }
	
	      if (/^[\],:{}\s]*$/
	              .test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@')
	                  .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
	                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
	
	          j = eval('(' + text + ')');
	
	          return typeof reviver === 'function' ?
	              walk({'': j}, '') : j;
	      }
	
	      throw new SyntaxError('JSON.parse(): invalid or malformed JSON data');
	  };
	}
	/**
	 * @fileoverview Functions for automatically setting up a player
	 * based on the data-setup attribute of the video tag
	 */
	
	// Automatically set up any tags that have a data-setup attribute
	vjs.autoSetup = function(){
	  var options, vid, player,
	      vids = document.getElementsByTagName('video');
	
	  // Check if any media elements exist
	  if (vids && vids.length > 0) {
	
	    for (var i=0,j=vids.length; i<j; i++) {
	      vid = vids[i];
	
	      // Check if element exists, has getAttribute func.
	      // IE seems to consider typeof el.getAttribute == 'object' instead of 'function' like expected, at least when loading the player immediately.
	      if (vid && vid.getAttribute) {
	
	        // Make sure this player hasn't already been set up.
	        if (vid['player'] === undefined) {
	          options = vid.getAttribute('data-setup');
	
	          // Check if data-setup attr exists.
	          // We only auto-setup if they've added the data-setup attr.
	          if (options !== null) {
	
	            // Parse options JSON
	            // If empty string, make it a parsable json object.
	            options = vjs.JSON.parse(options || '{}');
	
	            // Create new video.js instance.
	            player = videojs(vid, options);
	          }
	        }
	
	      // If getAttribute isn't defined, we need to wait for the DOM.
	      } else {
	        vjs.autoSetupTimeout(1);
	        break;
	      }
	    }
	
	  // No videos were found, so keep looping unless page is finisehd loading.
	  } else if (!vjs.windowLoaded) {
	    vjs.autoSetupTimeout(1);
	  }
	};
	
	// Pause to let the DOM keep processing
	vjs.autoSetupTimeout = function(wait){
	  setTimeout(vjs.autoSetup, wait);
	};
	
	if (document.readyState === 'complete') {
	  vjs.windowLoaded = true;
	} else {
	  vjs.one(window, 'load', function(){
	    vjs.windowLoaded = true;
	  });
	}
	
	// Run Auto-load players
	// You have to wait at least once in case this script is loaded after your video in the DOM (weird behavior only with minified version)
	vjs.autoSetupTimeout(1);
	/**
	 * the method for registering a video.js plugin
	 *
	 * @param  {String} name The name of the plugin
	 * @param  {Function} init The function that is run when the player inits
	 */
	vjs.plugin = function(name, init){
	  vjs.Player.prototype[name] = init;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 █▒▓▒░ The FlexPaper Project
	
	 This file is part of FlexPaper.
	
	 FlexPaper is free software: you can redistribute it and/or modify
	 it under the terms of the GNU General Public License as published by
	 the Free Software Foundation, version 3 of the License.
	
	 FlexPaper is distributed in the hope that it will be useful,
	 but WITHOUT ANY WARRANTY; without even the implied warranty of
	 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 GNU General Public License for more details.
	
	 You should have received a copy of the GNU General Public License
	 along with FlexPaper.  If not, see <http://www.gnu.org/licenses/>.
	
	 For more information on FlexPaper please see the FlexPaper project
	 home page: http://flexpaper.devaldi.com
	 */
	
	/**
	 *
	 * FlexPaper helper function for retrieving a active FlexPaper instance
	 *
	 */
	window.$FlexPaper = window.getDocViewer = window["$FlexPaper"] = function(id){
	    var instance = (id==="undefined")?"":id;
	
	    return window["FlexPaperViewer_Instance"+instance].getApi();
	};
	
	/**
	 *
	 * FlexPaper embedding (name of placeholder, config)
	 *
	 */
	window.FlexPaperViewerEmbedding = window.$f = function(id, args) {
	    var config = args.config;
	    var _SWFFile,_PDFFile,_IMGFiles,_JSONFile  = "",_jsDirectory="",_cssDirectory="",_localeDirectory="";_WMode = (config.WMode!=null||config.wmmode!=null?config.wmmode||config.WMode:"window");
	    var _uDoc = ((config.DOC !=null)?unescape(config.DOC):null);
	    var instance = "FlexPaperViewer_Instance"+((id==="undefined")?"":id);
	    var _JSONDataType = (config.JSONDataType!=null)?config.JSONDataType:"json";
	
	    if (_uDoc != null) {
	        _SWFFile 	= FLEXPAPER.translateUrlByFormat(_uDoc,"swf");
	    }
	
	    _SWFFile  			= (config.SwfFile!=null?config.SwfFile:_SWFFile);
	    _SWFFile  			= (config.SWFFile!=null?config.SWFFile:_SWFFile);
	    _PDFFile 			= (config.PDFFile!=null?config.PDFFile:_PDFFile);
	    _IMGFiles 			= (config.IMGFiles!=null?config.IMGFiles:_IMGFiles);
	    _IMGFiles 			= (config.PageImagePattern!=null?config.PageImagePattern:_IMGFiles);
	    _JSONFile 			= (config.JSONFile!=null?config.JSONFile:_JSONFile);
	    _jsDirectory 		= (config.jsDirectory!=null?config.jsDirectory:"js/");
	    _cssDirectory 		= (config.cssDirectory!=null?config.cssDirectory:"css/");
	    _localeDirectory 	= (config.localeDirectory!=null?config.localeDirectory:"locale/");
	    if(_SWFFile!=null && _SWFFile.indexOf("{" )==0 && _SWFFile.indexOf("[*," ) > 0 && _SWFFile.indexOf("]" ) > 0){_SWFFile = escape(_SWFFile);} // split file fix
	
	    window[instance] = flashembed(id, {
	        src						    : _jsDirectory+"./FlexPaperViewer.swf",
	        version					    : [10, 0],
	        expressInstall			    : "js/expressinstall.swf",
	        wmode					    : _WMode
	    },{
	        ElementId               : id,
	        SwfFile  				: _SWFFile,
	        PdfFile  				: _PDFFile,
	        IMGFiles  				: _IMGFiles,
	        JSONFile 				: _JSONFile,
	        useCustomJSONFormat 	: config.useCustomJSONFormat,
	        JSONPageDataFormat 		: config.JSONPageDataFormat,
	        JSONDataType 			: _JSONDataType,
	        Scale 					: (config.Scale!=null)?config.Scale:0.8,
	        ZoomTransition 			: (config.ZoomTransition!=null)?config.ZoomTransition:'easeOut',
	        ZoomTime 				: (config.ZoomTime!=null)?config.ZoomTime:0.5,
	        ZoomInterval 			: (config.ZoomInterval)?config.ZoomInterval:0.2,
	        FitPageOnLoad 			: (config.FitPageOnLoad!=null)?config.FitPageOnLoad:false,
	        FitWidthOnLoad 			: (config.FitWidthOnLoad!=null)?config.FitWidthOnLoad:false,
	        FullScreenAsMaxWindow 	: (config.FullScreenAsMaxWindow!=null)?config.FullScreenAsMaxWindow:false,
	        ProgressiveLoading 		: (config.ProgressiveLoading!=null)?config.ProgressiveLoading:false,
	        MinZoomSize 			: (config.MinZoomSize!=null)?config.MinZoomSize:0.2,
	        MaxZoomSize 			: (config.MaxZoomSize!=null)?config.MaxZoomSize:5,
	        SearchMatchAll 			: (config.SearchMatchAll!=null)?config.SearchMatchAll:false,
	        SearchServiceUrl 		: config.SearchServiceUrl,
	        InitViewMode 			: config.InitViewMode,
	        BitmapBasedRendering 	: (config.BitmapBasedRendering!=null)?config.BitmapBasedRendering:false,
	        StartAtPage 			: config.StartAtPage,
	        PrintPaperAsBitmap		: (config.PrintPaperAsBitmap!=null)?config.PrintPaperAsBitmap:false,
	        AutoAdjustPrintSize		: (config.AutoAdjustPrintSize!=null)?config.AutoAdjustPrintSize:false,
	
	        EnableCornerDragging 	: ((config.EnableCornerDragging!=null)?config.EnableCornerDragging:true), // FlexPaper Zine parameter
	        BackgroundColor 		: config.BackgroundColor, // FlexPaper Zine parameter
	        PanelColor 				: config.PanelColor, // FlexPaper Zine parameter
	        BackgroundAlpha         : config.BackgroundAlpha, // FlexPaper Zine parameter
	        UIConfig                : config.UIConfig,  // FlexPaper Zine parameter
	
	        ViewModeToolsVisible 	: ((config.ViewModeToolsVisible!=null)?config.ViewModeToolsVisible:true),
	        ZoomToolsVisible 		: ((config.ZoomToolsVisible!=null)?config.ZoomToolsVisible:true),
	        NavToolsVisible 		: ((config.NavToolsVisible!=null)?config.NavToolsVisible:true),
	        CursorToolsVisible 		: ((config.SearchToolsVisible!=null)?config.CursorToolsVisible:true),
	        SearchToolsVisible 		: ((config.SearchToolsVisible!=null)?config.SearchToolsVisible:true),
	        StickyTools				: config.StickyTools,
	        Toolbar                 : config.Toolbar,
	        DocSizeQueryService 	: config.DocSizeQueryService,
	
	        RenderingOrder 			: config.RenderingOrder,
	
	        localeChain 			: (config.localeChain!=null)?config.localeChain:"en_US",
	        jsDirectory 			: _jsDirectory,
	        cssDirectory 			: _cssDirectory,
	        localeDirectory			: _localeDirectory,
	        key 					: config.key
	    });
	};
	
	(function() {
	    if(!window.FLEXPAPER){window.FLEXPAPER = {};}
	
	    FLEXPAPER.getLocationHashParameter = function(param){
	        var hash = location.hash.substr(1);
	
	        if(hash.indexOf(param+'=')>=0){
	            var value = hash.substr(hash.indexOf(param+'='))
	                .split('&')[0]
	                .split('=')[1];
	
	            return value;
	        }
	
	        return null;
	    };
	
	    FLEXPAPER.translateUrlByFormat = function(url,format){
	        if(url.indexOf("{") == 0 && format != "swf"){ // loading in split file mode
	            url = url.substring(1,url.lastIndexOf(","));
	            url = url.replace("[*,0]","{page}")
	        }
	        return (url!=null && url.indexOf('{format}') > 0 ? url.replace("{format}", format):null);
	    };
	
	    FLEXPAPER.animateDenyEffect = function(obj,margin,time,cycles,dir) {
	        window.setTimeout(function(){
	            var speed = time / ((2*cycles)+1);
	            var margRat = 1 + (60/(cycles*cycles)); $(obj).stop(true,true);
	            for (var i=0; i<=cycles; i++) {
	                for (var j=-1; j<=1; j+=2)
	                    $(obj).animate({marginLeft: (i!=cycles)*j*margin},{duration:speed, queue:true});
	
	                margin/=margRat;
	            }
	        },500);
	    };
	
	    FLEXPAPER.initLoginForm = function initLoginForm(IMGFiles,animate){
	        jQuery(document.body).css('background-color','#dedede');
	
	        var img = new Image();
	        jQuery(img).bind('load',function(){
	            jQuery(document.body).append(
	                "<div id='loginForm'>"+
	                    "<form class='flexpaper_htmldialog' method='POST' style='display:none;top:100px;margin:"+((jQuery(window).height()>500)?"50px auto":"0px auto")+"'>"+
	                    "<div class='flexpaper_publications flexpaper_publication_csstransforms3d' style='overflow-y:hidden;overflow-x:hidden;text-align:center;background: #f7f7f7;margin: -25px -25px 0px;padding: 15px 25px 0px 25px;'>"+
	                    "<div class='flexpaper_publication flexpaper_publication_csstransforms3d' id='flexpaper_publication1'>"+
	                    "<img src='"+(IMGFiles.replace("{page}",1))+"' />"+
	                    "</div>"+
	
	                    "<h1 class='flexpaper_htmldialog-title'>password protected publication</h1>"+
	                    "<input type='password' id='txt_flexpaper_password' name='txt_flexpaper_password' class='flexpaper_htmldialog-input' placeholder='Enter password'>"+
	                    "<input type='submit' value='Submit' class='flexpaper_htmldialog-button'>"+
	                    "</div>"+
	                    "</form>"+
	                    "</div>"
	            );
	
	            var anim_duration = animate?1000:0;
	            var anim_height_dur = animate?anim_duration/3:0;
	            var theight = 400;
	
	            jQuery('.flexpaper_htmldialog').css({height : '0px', display : 'block'});
	            jQuery('.flexpaper_htmldialog').animate({'height': theight+'px','top':'0px'},{duration: anim_height_dur, complete: function(){
	                jQuery('.flexpaper_htmldialog').css({'height' : ''}); // remove height attribute to fit publication
	
	                jQuery('.flexpaper_publication').animate({opacity:1},{
	                    step : function(now,fx){
	                        var target = -7;var opacityfrom = -40;var diff = opacityfrom - target;var rotate = (diff * now);
	
	                        jQuery('.flexpaper_publication').css({
	                            '-webkit-transform' : 'perspective(300) rotateY('+(opacityfrom - rotate)+'deg)',
	                            '-moz-transform' : 'rotateY('+(opacityfrom - rotate)+'deg)',
	                            'box-shadow' : '5px 5px 20px rgba(51, 51, 51, '+now+')'
	                        });
	                    },
	                    duration:anim_duration
	                });
	
	            }});
	
	        });
	        img.src = (IMGFiles.replace("{page}",1));
	    };
	})();
	
	
	/**
	 *
	 * FlexPaper embedding functionality. Based on FlashEmbed
	 *
	 */
	
	(function() {
	
	    var  IE = document.all,
	        URL = 'http://www.adobe.com/go/getflashplayer',
	        JQUERY = typeof jQuery == 'function',
	        RE = /(\d+)[^\d]+(\d+)[^\d]*(\d*)/,
	        MOBILE = (function(){try {return 'ontouchstart' in document.documentElement;} catch (e) {return false;} })(),
	        GLOBAL_OPTS = {
	            // very common opts
	            width: '100%',
	            height: '100%',
	            id: "_" + ("" + Math.random()).slice(9),
	
	            // flashembed defaults
	            allowfullscreen: true,
	            allowscriptaccess: 'always',
	            quality: 'high',
	            allowFullScreenInteractive : true,
	
	            // flashembed specific options
	            version: [10, 0],
	            onFail: null,
	            expressInstall: null,
	            w3c: false,
	            cachebusting: false
	        };
	
	    window.isTouchScreen = MOBILE;
	
	    if (window.attachEvent) {
	        window.attachEvent("onbeforeunload", function() {
	            __flash_unloadHandler = function() {};
	            __flash_savedUnloadHandler = function() {};
	        });
	    }
	
	    // simple extend
	    function extend(to, from) {
	        if (from) {
	            for (var key in from) {
	                if (from.hasOwnProperty(key)) {
	                    to[key] = from[key];
	                }
	            }
	        }
	        return to;
	    }
	
	    // used by Flash to dispatch a event properly
	    window.dispatchJQueryEvent = function (elementId,eventName,args){
	        jQuery('#'+elementId).trigger(eventName,args);
	    }
	
	    // used by asString method
	    function map(arr, func) {
	        var newArr = [];
	        for (var i in arr) {
	            if (arr.hasOwnProperty(i)) {
	                newArr[i] = func(arr[i]);
	            }
	        }
	        return newArr;
	    }
	
	    window.flashembed = function(root, opts, conf) {
	        // root must be found / loaded
	        if (typeof root == 'string') {
	            root = document.getElementById(root.replace("#", ""));
	        }
	
	        // not found
	        if (!root) { return; }
	
	        root.onclick = function(){return false;}
	
	        if (typeof opts == 'string') {
	            opts = {src: opts};
	        }
	
	        return new Flash(root, extend(extend({}, GLOBAL_OPTS), opts), conf);
	    };
	
	    // flashembed "static" API
	    var f = extend(window.flashembed, {
	
	        conf: GLOBAL_OPTS,
	
	        getVersion: function()  {
	            var fo, ver;
	
	            try {
	                ver = navigator.plugins["Shockwave Flash"].description.slice(16);
	            } catch(e) {
	
	                try  {
	                    fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
	                    ver = fo && fo.GetVariable("$version");
	
	                } catch(err) {
	                    try  {
	                        fo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
	                        ver = fo && fo.GetVariable("$version");
	                    } catch(err2) { }
	                }
	            }
	
	            ver = RE.exec(ver);
	            return ver ? [ver[1], ver[3]] : [0, 0];
	        },
	
	        asString: function(obj) {
	
	            if (obj === null || obj === undefined) { return null; }
	            var type = typeof obj;
	            if (type == 'object' && obj.push) { type = 'array'; }
	
	            switch (type){
	
	                case 'string':
	                    obj = obj.replace(new RegExp('(["\\\\])', 'g'), '\\$1');
	
	                    // flash does not handle %- characters well. transforms "50%" to "50pct" (a dirty hack, I admit)
	                    obj = obj.replace(/^\s?(\d+\.?\d+)%/, "$1pct");
	                    return '"' +obj+ '"';
	
	                case 'array':
	                    return '['+ map(obj, function(el) {
	                        return f.asString(el);
	                    }).join(',') +']';
	
	                case 'function':
	                    return '"function()"';
	
	                case 'object':
	                    var str = [];
	                    for (var prop in obj) {
	                        if (obj.hasOwnProperty(prop)) {
	                            str.push('"'+prop+'":'+ f.asString(obj[prop]));
	                        }
	                    }
	                    return '{'+str.join(',')+'}';
	            }
	
	            // replace ' --> "  and remove spaces
	            return String(obj).replace(/\s/g, " ").replace(/\'/g, "\"");
	        },
	
	        getHTML: function(opts, conf) {
	
	            opts = extend({}, opts);
	            opts.id = opts.id + (" " + Math.random()).slice(9);
	
	            /******* OBJECT tag and it's attributes *******/
	            var html = '<object width="' + opts.width +
	                '" height="' + opts.height +
	                '" id="' + opts.id +
	                '" name="' + opts.id + '"';
	
	            if (opts.cachebusting) {
	                opts.src += ((opts.src.indexOf("?") != -1 ? "&" : "?") + Math.random());
	            }
	
	            if (opts.w3c || !IE) {
	                html += ' data="' +opts.src+ '" type="application/x-shockwave-flash"';
	            } else {
	                html += ' classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"';
	            }
	
	            html += '>';
	
	            /******* nested PARAM tags *******/
	            if (opts.w3c || IE) {
	                html += '<param name="movie" value="' +opts.src+ '" />';
	            }
	
	            // not allowed params
	            opts.width = opts.height = opts.id = opts.w3c = opts.src = null;
	            opts.onFail = opts.version = opts.expressInstall = null;
	
	            for (var key in opts) {
	                if (opts[key]) {
	                    html += '<param name="'+ key +'" value="'+ opts[key] +'" />';
	                }
	            }
	
	            /******* FLASHVARS *******/
	            var vars = "";
	
	            if (conf) {
	                for (var k in conf) {
	                    if (conf[k] && k!='Toolbar') {
	                        var val = conf[k];
	                        vars += k +'='+ (/function|object/.test(typeof val) ? f.asString(val) : val) + '&';
	                    }
	                }
	                vars = vars.slice(0, -1);
	                html += '<param name="flashvars" value=\'' + vars + '\' />';
	            }
	
	            html += "</object>";
	
	            return html;
	        },
	
	        isSupported: function(ver) {
	            return VERSION[0] > ver[0] || VERSION[0] == ver[0] && VERSION[1] >= ver[1];
	        }
	
	    });
	
	    var VERSION = f.getVersion();
	
	    function Flash(root, opts, conf) {
	        var userAgent = navigator.userAgent.toLowerCase();
	        var browser = {
	            version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
	            safari: /webkit/.test(userAgent),
	            opera: /opera/.test(userAgent),
	            msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
	            mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent),
	            chrome: /chrome/.test(userAgent)
	        };
	
	        // Default to a rendering mode if its not set
	        if(!conf.RenderingOrder && conf.SwfFile !=  null){conf.RenderingOrder = "flash";}
	
	        if(conf.RenderingOrder.indexOf('html5')==0){
	            if(confirm('The FlexPaper GPL version does not support HTML5 rendering. Do you want to navigate to our download page for more details?')){location.href='http://flexpaper.devaldi.com/download.jsp?ref=FlexPaper'}
	            return;
	        }
	
	        if(conf.RenderingOrder.indexOf('html')==0){
	            if(confirm('The FlexPaper GPL version does not support HTML4 rendering. Do you want to navigate to our download page for more details?')){location.href='http://flexpaper.devaldi.com/download.jsp?ref=FlexPaper'}
	            return;
	        }
	
	        // version is ok
	        if (f.isSupported(opts.version)) {
	            root.innerHTML = f.getHTML(opts, conf);
	
	            // express install
	        } else if (opts.expressInstall && f.isSupported([6, 65])) {
	            root.innerHTML = f.getHTML(extend(opts, {src: opts.expressInstall}), {
	                MMredirectURL: location.href,
	                MMplayerType: 'PlugIn',
	                MMdoctitle: document.title
	            });
	
	        } else { //use html viewer or die
	            // fail #2.1 custom content inside container
	            if (!root.innerHTML.replace(/\s/g, '')) {
	                var pageHost = ((document.location.protocol == "https:") ? "https://" :	"http://");
	
	                root.innerHTML =
	                    "<h2>Your browser is not compatible with FlexPaper</h2>" +
	                        "<h3>Upgrade to a newer browser or download Adobe Flash Player 10 or higher.</h3>" +
	                        "<p>Click on the icon below to download the latest version of Adobe Flash" +
	                        "<a href='http://www.adobe.com/go/getflashplayer'><img src='"
	                        + pageHost + "www.adobe.com/images/shared/download_buttons/get_flash_player.gif' alt='Get Adobe Flash player' /></a>";
	
	                if (root.tagName == 'A') {
	                    root.onclick = function() {
	                        location.href = URL;
	                    };
	                }
	            }
	
	            // onFail
	            if (opts.onFail) {
	                var ret = opts.onFail.call(this);
	                if (typeof ret == 'string') { root.innerHTML = ret; }
	            }
	        }
	
	        // http://flowplayer.org/forum/8/18186#post-18593
	        if (IE) {
	            window[opts.id] = document.getElementById(opts.id);
	        }
	
	        // API methods for callback
	        extend(this, {
	
	            getRoot: function() {
	                return root;
	            },
	
	            getOptions: function() {
	                return opts;
	            },
	
	
	            getConf: function() {
	                return conf;
	            },
	
	            getApi: function() {
	                return root.firstChild;
	            }
	
	        });
	    }
	
	    // setup jquery support
	    if (JQUERY) {
	        jQuery.fn.flashembed = function(opts, conf) {
	            return this.each(function() {
	                jQuery(this).data("flashembed", flashembed(this, opts, conf));
	            });
	        };
	
	        jQuery.fn.FlexPaperViewer = function(args){
	            this.element = new FlexPaperViewerEmbedding(this.attr('id'),args);
	        };
	    }else{
	        throw new Error("jQuery missing!");
	    }
	})();

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 █▒▓▒░ The FlexPaper Project
	
	 This file is part of FlexPaper.
	
	 FlexPaper is free software: you can redistribute it and/or modify
	 it under the terms of the GNU General Public License as published by
	 the Free Software Foundation, version 3 of the License.
	
	 FlexPaper is distributed in the hope that it will be useful,
	 but WITHOUT ANY WARRANTY; without even the implied warranty of
	 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	 GNU General Public License for more details.
	
	 You should have received a copy of the GNU General Public License
	 along with FlexPaper.  If not, see <http://www.gnu.org/licenses/>.
	
	 For more information on FlexPaper please see the FlexPaper project
	 home page: http://flexpaper.devaldi.com
	 */
	
	$(function() {
	    /**
	     * Handles the event of external links getting clicked in the document.
	     *
	     * @example onExternalLinkClicked("http://www.google.com")
	     *
	     * @param String link
	     */
	    jQuery('#documentViewer').bind('onExternalLinkClicked',function(e,link){
	        window.open(link,'_flexpaper_exturl');
	    });
	
	    /**
	     * Recieves progress information about the document being loaded
	     *
	     * @example onProgress( 100,10000 );
	     *
	     * @param int loaded
	     * @param int total
	     */
	    jQuery('#documentViewer').bind('onProgress',function(e,loadedBytes,totalBytes){
	
	    });
	
	    /**
	     * Handles the event of a document is in progress of loading
	     *
	     */
	    jQuery('#documentViewer').bind('onDocumentLoading',function(e){
	
	    });
	
	    /**
	     * Handles the event of a document is in progress of loading
	     *
	     */
	    jQuery('#documentViewer').bind('onPageLoading',function(e,pageNumber){
	
	    });
	
	    /**
	     * Receives messages about the current page being changed
	     *
	     * @example onCurrentPageChanged( 10 );
	     *
	     * @param int pagenum
	     */
	    jQuery('#documentViewer').bind('onCurrentPageChanged',function(e,pagenum){
	
	        // if GANumber is supplied then lets track this as a Google Analytics event.
	        if(jQuery(this).data('TrackingNumber')){
	            var _gaq = window._gaq || [];window._gaq=_gaq;
	            var trackingDoc = jQuery(this).data('TrackingDocument');
	            var pdfFileName = trackingDoc.substr(0,trackingDoc.indexOf(".pdf")+4);
	
	            _gaq.push(['_setAccount', jQuery(this).data('TrackingNumber')]);
	            _gaq.push(['_trackEvent', 'PDF Documents', 'Page View', pdfFileName + ' - page ' + pagenum]);
	
	            (function() {
	                var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	                ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
	                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	            })();
	        }
	    });
	
	    /**
	     * Receives messages about the document being loaded
	     *
	     * @example onDocumentLoaded( 20 );
	     *
	     * @param int totalPages
	     */
	    jQuery('#documentViewer').bind('onDocumentLoaded',function(e,totalPages){
	
	    });
	
	    /**
	     * Receives messages about the page loaded
	     *
	     * @example onPageLoaded( 1 );
	     *
	     * @param int pageNumber
	     */
	    jQuery('#documentViewer').bind('onPageLoaded',function(e,pageNumber){
	
	    });
	
	    /**
	     * Receives messages about the page loaded
	     *
	     * @example onErrorLoadingPage( 1 );
	     *
	     * @param int pageNumber
	     */
	    jQuery('#documentViewer').bind('onErrorLoadingPage',function(e,pageNumber){
	
	    });
	
	    /**
	     * Receives error messages when a document is not loading properly
	     *
	     * @example onDocumentLoadedError( "Network error" );
	     *
	     * @param String errorMessage
	     */
	    jQuery('#documentViewer').bind('onDocumentLoadedError',function(e,errMessage){
	
	    });
	
	    /**
	     * Receives error messages when a document has finished printed
	     *
	     * @example onDocumentPrinted();
	     *
	     */
	    jQuery('#documentViewer').bind('onDocumentPrinted',function(e){
	
	    });
	});

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// VERSION: 2.3 LAST UPDATE: 11.07.2013
	/* 
	 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
	 * 
	 * Made by Wilq32, wilq32@gmail.com, Wroclaw, Poland, 01.2009
	 * Website: http://code.google.com/p/jqueryrotate/ 
	 */
	
	(function($) {
	    var supportedCSS,supportedCSSOrigin, styles=document.getElementsByTagName("head")[0].style,toCheck="transformProperty WebkitTransform OTransform msTransform MozTransform".split(" ");
	    for (var a = 0; a < toCheck.length; a++) if (styles[toCheck[a]] !== undefined) { supportedCSS = toCheck[a]; }
	    if (supportedCSS) {
	      supportedCSSOrigin = supportedCSS.replace(/[tT]ransform/,"TransformOrigin");
	      if (supportedCSSOrigin[0] == "T") supportedCSSOrigin[0] = "t";
	    }
	
	    // Bad eval to preven google closure to remove it from code o_O
	    eval('IE = "v"=="\v"');
	
	    jQuery.fn.extend({
	        rotate:function(parameters)
	        {
	          if (this.length===0||typeof parameters=="undefined") return;
	          if (typeof parameters=="number") parameters={angle:parameters};
	          var returned=[];
	          for (var i=0,i0=this.length;i<i0;i++)
	          {
	            var element=this.get(i);	
	            if (!element.Wilq32 || !element.Wilq32.PhotoEffect) {
	
	              var paramClone = $.extend(true, {}, parameters); 
	              var newRotObject = new Wilq32.PhotoEffect(element,paramClone)._rootObj;
	
	              returned.push($(newRotObject));
	            }
	            else {
	              element.Wilq32.PhotoEffect._handleRotation(parameters);
	            }
	          }
	          return returned;
	        },
	        getRotateAngle: function(){
	          var ret = [];
	          for (var i=0,i0=this.length;i<i0;i++)
	          {
	            var element=this.get(i);	
	            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
	              ret[i] = element.Wilq32.PhotoEffect._angle;
	            }
	          }
	          return ret;
	        },
	        stopRotate: function(){
	          for (var i=0,i0=this.length;i<i0;i++)
	          {
	            var element=this.get(i);	
	            if (element.Wilq32 && element.Wilq32.PhotoEffect) {
	              clearTimeout(element.Wilq32.PhotoEffect._timer);
	            }
	          }
	        }
	    });
	
	    // Library agnostic interface
	
	    Wilq32=window.Wilq32||{};
	    Wilq32.PhotoEffect=(function(){
	
	      if (supportedCSS) {
	        return function(img,parameters){
	          img.Wilq32 = {
	            PhotoEffect: this
	          };
	
	          this._img = this._rootObj = this._eventObj = img;
	          this._handleRotation(parameters);
	        }
	      } else {
	        return function(img,parameters) {
	          this._img = img;
	          this._onLoadDelegate = [parameters];
	
	          this._rootObj=document.createElement('span');
	          this._rootObj.style.display="inline-block";
	          this._rootObj.Wilq32 = 
	            {
	              PhotoEffect: this
	            };
	          img.parentNode.insertBefore(this._rootObj,img);
	
	          if (img.complete) {
	            this._Loader();
	          } else {
	            var self=this;
	            // TODO: Remove jQuery dependency
	            jQuery(this._img).bind("load", function(){ self._Loader(); });
	          }
	        }
	      }
	    })();
	
	    Wilq32.PhotoEffect.prototype = {
	      _setupParameters : function (parameters){
	        this._parameters = this._parameters || {};
	        if (typeof this._angle !== "number") { this._angle = 0 ; }
	        if (typeof parameters.angle==="number") { this._angle = parameters.angle; }
	        this._parameters.animateTo = (typeof parameters.animateTo === "number") ? (parameters.animateTo) : (this._angle); 
	
	        this._parameters.step = parameters.step || this._parameters.step || null;
	        this._parameters.easing = parameters.easing || this._parameters.easing || this._defaultEasing;
	        this._parameters.duration = parameters.duration || this._parameters.duration || 1000;
	        this._parameters.callback = parameters.callback || this._parameters.callback || this._emptyFunction;
	        this._parameters.center = parameters.center || this._parameters.center || ["50%","50%"];
	        if (typeof this._parameters.center[0] == "string") {
	          this._rotationCenterX = (parseInt(this._parameters.center[0],10) / 100) * this._imgWidth * this._aspectW;
	        } else {
	          this._rotationCenterX = this._parameters.center[0];
	        }
	        if (typeof this._parameters.center[1] == "string") {
	          this._rotationCenterY = (parseInt(this._parameters.center[1],10) / 100) * this._imgHeight * this._aspectH;
	        } else {
	          this._rotationCenterY = this._parameters.center[1];
	        }
	
	        if (parameters.bind && parameters.bind != this._parameters.bind) { this._BindEvents(parameters.bind); }
	      },
	      _emptyFunction: function(){},
	      _defaultEasing: function (x, t, b, c, d) { return -c * ((t=t/d-1)*t*t*t - 1) + b }, 
	      _handleRotation : function(parameters, dontcheck){
	        if (!supportedCSS && !this._img.complete && !dontcheck) {
	          this._onLoadDelegate.push(parameters);
	          return;
	        }
	        this._setupParameters(parameters);
	        if (this._angle==this._parameters.animateTo) {
	          this._rotate(this._angle);
	        }
	        else { 
	          this._animateStart();          
	        }
	      },
	
	      _BindEvents:function(events){
	        if (events && this._eventObj) 
	        {
	          // Unbinding previous Events
	          if (this._parameters.bind){
	            var oldEvents = this._parameters.bind;
	            for (var a in oldEvents) if (oldEvents.hasOwnProperty(a)) 
	              // TODO: Remove jQuery dependency
	              jQuery(this._eventObj).unbind(a,oldEvents[a]);
	          }
	
	        this._parameters.bind = events;
	        for (var a in events) if (events.hasOwnProperty(a)) 
	          // TODO: Remove jQuery dependency
	          jQuery(this._eventObj).bind(a,events[a]);
	        }
	      },
	
	      _Loader:(function()
	      {
	        if (IE)
	          return function() {
	            var width=this._img.width;
	            var height=this._img.height;
	            this._imgWidth = width;
	            this._imgHeight = height; 
	            this._img.parentNode.removeChild(this._img);
	
	            this._vimage = this.createVMLNode('image');
	            this._vimage.src=this._img.src;
	            this._vimage.style.height=height+"px";
	            this._vimage.style.width=width+"px";
	            this._vimage.style.position="absolute"; // FIXES IE PROBLEM - its only rendered if its on absolute position!
	            this._vimage.style.top = "0px";
	            this._vimage.style.left = "0px";
	            this._aspectW = this._aspectH = 1;
	
	            /* Group minifying a small 1px precision problem when rotating object */
	            this._container = this.createVMLNode('group');
	            this._container.style.width=width;
	            this._container.style.height=height;
	            this._container.style.position="absolute";
	            this._container.style.top="0px";
	            this._container.style.left="0px";
	            this._container.setAttribute('coordsize',width-1+','+(height-1)); // This -1, -1 trying to fix ugly problem with small displacement on IE
	            this._container.appendChild(this._vimage);
	
	            this._rootObj.appendChild(this._container);
	            this._rootObj.style.position="relative"; // FIXES IE PROBLEM
	            this._rootObj.style.width=width+"px";
	            this._rootObj.style.height=height+"px";
	            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
	            this._rootObj.className=this._img.className;			
	            this._eventObj = this._rootObj;	
	            var parameters;
	            while (parameters = this._onLoadDelegate.shift()) {
	              this._handleRotation(parameters, true);	
	            }
	          }
	          else return function () {
	            this._rootObj.setAttribute('id',this._img.getAttribute('id'));
	            this._rootObj.className=this._img.className;
	
	            this._imgWidth=this._img.naturalWidth;
	            this._imgHeight=this._img.naturalHeight;
	            var _widthMax=Math.sqrt((this._imgHeight)*(this._imgHeight) + (this._imgWidth) * (this._imgWidth));
	            this._width = _widthMax * 3;
	            this._height = _widthMax * 3;
	
	            this._aspectW = this._img.offsetWidth/this._img.naturalWidth;
	            this._aspectH = this._img.offsetHeight/this._img.naturalHeight;
	
	            this._img.parentNode.removeChild(this._img);	
	
	
	            this._canvas=document.createElement('canvas');
	            this._canvas.setAttribute('width',this._width);
	            this._canvas.style.position="relative";
	            this._canvas.style.left = -this._img.height * this._aspectW + "px";
	            this._canvas.style.top = -this._img.width * this._aspectH + "px";
	            this._canvas.Wilq32 = this._rootObj.Wilq32;
	
	            this._rootObj.appendChild(this._canvas);
	            this._rootObj.style.width=this._img.width*this._aspectW+"px";
	            this._rootObj.style.height=this._img.height*this._aspectH+"px";
	            this._eventObj = this._canvas;
	
	            this._cnv=this._canvas.getContext('2d');
	            var parameters;
	            while (parameters = this._onLoadDelegate.shift()) {
	              this._handleRotation(parameters, true);	
	            }
	          }
	      })(),
	
	      _animateStart:function()
	      {	
	        if (this._timer) {
	          clearTimeout(this._timer);
	        }
	        this._animateStartTime = +new Date;
	        this._animateStartAngle = this._angle;
	        this._animate();
	      },
	      _animate:function()
	      {
	        var actualTime = +new Date;
	        var checkEnd = actualTime - this._animateStartTime > this._parameters.duration;
	
	        // TODO: Bug for animatedGif for static rotation ? (to test)
	        if (checkEnd && !this._parameters.animatedGif) 
	        {
	          clearTimeout(this._timer);
	        }
	        else 
	        {
	          if (this._canvas||this._vimage||this._img) {
	            var angle = this._parameters.easing(0, actualTime - this._animateStartTime, this._animateStartAngle, this._parameters.animateTo - this._animateStartAngle, this._parameters.duration);
	            this._rotate((~~(angle*10))/10);
	          }
	          if (this._parameters.step) {
	            this._parameters.step(this._angle);
	          }
	          var self = this;
	          this._timer = setTimeout(function()
	          {
	            self._animate.call(self);
	          }, 10);
	        }
	
	      // To fix Bug that prevents using recursive function in callback I moved this function to back
	      if (this._parameters.callback && checkEnd){
	        this._angle = this._parameters.animateTo;
	        this._rotate(this._angle);
	        this._parameters.callback.call(this._rootObj);
	      }
	      },
	
	      _rotate : (function()
	      {
	        var rad = Math.PI/180;
	        if (IE)
	          return function(angle)
	        {
	          this._angle = angle;
	          this._container.style.rotation=(angle%360)+"deg";
	          this._vimage.style.top = -(this._rotationCenterY - this._imgHeight/2) + "px";
	          this._vimage.style.left = -(this._rotationCenterX - this._imgWidth/2) + "px";
	          this._container.style.top = this._rotationCenterY - this._imgHeight/2 + "px";
	          this._container.style.left = this._rotationCenterX - this._imgWidth/2 + "px";
	
	        }
	          else if (supportedCSS)
	          return function(angle){
	            this._angle = angle;
	            this._img.style[supportedCSS]="rotate("+(angle%360)+"deg)";
	            this._img.style[supportedCSSOrigin]=this._parameters.center.join(" ");
	          }
	          else 
	            return function(angle)
	          {
	            this._angle = angle;
	            angle=(angle%360)* rad;
	            // clear canvas	
	            this._canvas.width = this._width;//+this._widthAdd;
	            this._canvas.height = this._height;//+this._heightAdd;
	
	            // REMEMBER: all drawings are read from backwards.. so first function is translate, then rotate, then translate, translate..
	            this._cnv.translate(this._imgWidth*this._aspectW,this._imgHeight*this._aspectH);	// at least center image on screen
	            this._cnv.translate(this._rotationCenterX,this._rotationCenterY);			// we move image back to its orginal 
	            this._cnv.rotate(angle);										// rotate image
	            this._cnv.translate(-this._rotationCenterX,-this._rotationCenterY);		// move image to its center, so we can rotate around its center
	            this._cnv.scale(this._aspectW,this._aspectH); // SCALE - if needed ;)
	            this._cnv.drawImage(this._img, 0, 0);							// First - we draw image
	          }
	
	      })()
	      }
	
	      if (IE)
	      {
	        Wilq32.PhotoEffect.prototype.createVMLNode=(function(){
	          document.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
	          try {
	            !document.namespaces.rvml && document.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
	            return function (tagName) {
	              return document.createElement('<rvml:' + tagName + ' class="rvml">');
	            };
	          } catch (e) {
	            return function (tagName) {
	              return document.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
	            };
	          }		
	        })();
	      }
	
	})(jQuery);


/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
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
/* 25 */
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
/* 26 */,
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\n  var item = list[i];\n%>\n  <div class="artice-one article<%-item.id%>">\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updatorName%></div>\n      <div class="info-action">\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\n        <dd>\n          <%-item.content%>\n        </dd>\n        <%if(item.imgnum>0){%>\n        <div class="artice-img-list">\n          <%\n            var first = true;\n            for(var j=0,m=item.resource.length;j<m;j++){\n              var obj = item.resource[j];\n              \n              if(obj.type === 1){\n          %>\n            <div>\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" width="200" />\n              <%\n                if(first){\n                  first = false;\n              %>\n              <span>共<%-item.imgnum%>张</span>\n              <%}%>\n            </div>\n          <%}}%>\n        </div>\n        <%}%>\n    </div>\n  </div>\n<%}%>',
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '      <span data-action="logout"><span class="user"></span><%-name%></span>\n      <span class="msg" ><span></span><div></div></span>\n      <span class="dialog"></span>\n      <span class="search"></span>\n      <span class="memu"></span>',
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<div class="input-group">\n    <input type="text" class="form-control" placeholder="输入用户名称搜索" name="managekey" data-keyup="searchbtn">\n    <span class="input-group-btn">\n      <button class="btn btn-default" type="button" data-action="searchbtn">搜索</button>\n    </span>\n</div> \n<div class="manage-area">\n  <ul>\n  <%\n    for(var i = 0,l=list.length;i<l;i++){\n      item = list[i];\n  %> \n      <li id="user<%-item.id%>" class="user<%-item.id%>" data-id="<%-item.id%>" data-action="selectone" data-name="<%-item.name%>"><%-item.name%></li>\n  <%}%>\n  </ul>\n</div>  ',
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<span class="tag label label-info" id="manage<%-id%>" data-id="<%-id%>">\n	<%-name%><span data-action="remove"></span>\n</span>',
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\n	for(var i in list){\n	var item = list[i];\n	var obj = JSON.parse(item.withData);\n	console.log(obj);\n%>\n<li title="<%-item.message%>"><a data-href="article.html?id=<%-obj.articleId%>" data-id="<%-item.id%>" data-read="<%-item.read%>"><%-item.message%></a></li>\n<%}%>',
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
/* 32 */
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
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\n	var item = list[i];\n%>\n	<span class="tag label label-info" data-id="<%-item.id%>">\n		<%-item.name%><span data-action="removeRes"></span>\n	</span>\n<%}%>',
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
/* 34 */,
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '	<div class="review-close" data-action="close"></div>\n	<div class="modal-body">\n		<div class="file-review" id="reviewDiv">\n		</div>  \n		<div class="file-select-block" id="reviewBlock">\n		</div>  \n		<div class="review-bg"></div>\n	</div>',
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
	                buf.push('	<div class="review-close" data-action="close"></div>\n	<div class="modal-body">\n		<div class="file-review" id="reviewDiv">\n		</div>  \n		<div class="file-select-block" id="reviewBlock">\n		</div>  \n		<div class="review-bg"></div>\n	</div>');
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
	        input: '<div class="al-arrow" titla="上一个文件" data-action="showPre"></div>\n<%\n	if(type == 1){\n%>\n	<div class="review-img-block">\n		<img id="reviewImg" src="/cgi/resource/preview?id=<%-id%>" align="absmiddle" />\n	</div>\n		<div class="file-reivew-act">\n			<dl>\n				<dt>文件名:<%-name%></dt>\n				<dd>\n					文件大小: <%-size%>\n					时间: <%-createTime%>\n				</dd>\n			</dl>\n			<div class="file-act">			\n				<span class="to-left">左转</span>\n				<span class="to-right">右转</span>\n			</div>\n			<div class="file-reivew-act-bg"></div>\n		</div>	\n<%}else if(type == 2){%>\n	<div id="documentViewer" class="flexpaper_viewer">\n		\n	</div>\n<%}else if(type == 3 || type==4){%>\n	<div class="playerZone">\n	  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"\n	      poster="http://video-js.zencoder.com/oceans-clip.png"\n	      data-setup="{}">\n	    <source src="/cgi/resource/preview?id=<%-id%>" type=\'video/mp4\' />\n	    <source src="/cgi/resource/preview?id=<%-id%>" type=\'video/webm\' />\n	    <source src="/cgi/resource/preview?id=<%-id%>" type=\'video/ogg\' />\n	    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	  </video>\n	<div class="file-reivew-act">\n		<dl>\n			<dt>文件名:<%-name%></dt>\n			<dd>\n				文件大小: <%-size%>\n				时间: <%-createTime%>\n			</dd>\n		</dl>\n	</div>\n\n	</div>\n<%}else if(type == 8){%>\n	<div class="text-review"><%-text%></div>\n	<div class="file-reivew-act">\n		<dl>\n			<dt>文件名:<%-name%></dt>\n			<dd>\n				文件大小: <%-size%>\n				时间: <%-time%>\n			</dd>\n		</dl>\n	</div>	\n<%}else{%>\n	<div class="file-reivew-act">\n		<i class="icon-type<%-type%>"></i>\n		<dl>\n			<dt>文件名:<%-name%></dt>\n			<dd>\n				文件大小: <%-size%>\n				时间: <%-createTime%>\n			</dd>\n		</dl>\n	</div>	\n<%}%>\n<div class="ar-arrow" titla="下一个文件" data-action="showNext"></div>',
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
	                buf.push('<div class="al-arrow" titla="上一个文件" data-action="showPre"></div>\n');
	                __stack.lineno = 2;
	                if (type == 1) {
	                    buf.push('\n	<div class="review-img-block">\n		<img id="reviewImg" src="/cgi/resource/preview?id=', (__stack.lineno = 6, id), '" align="absmiddle" />\n	</div>\n		<div class="file-reivew-act">\n			<dl>\n				<dt>文件名:', (__stack.lineno = 10, name), "</dt>\n				<dd>\n					文件大小: ", (__stack.lineno = 12, size), "\n					时间: ", (__stack.lineno = 13, createTime), '\n				</dd>\n			</dl>\n			<div class="file-act">			\n				<span class="to-left">左转</span>\n				<span class="to-right">右转</span>\n			</div>\n			<div class="file-reivew-act-bg"></div>\n		</div>	\n');
	                    __stack.lineno = 22;
	                } else if (type == 2) {
	                    buf.push('\n	<div id="documentViewer" class="flexpaper_viewer">\n		\n	</div>\n');
	                    __stack.lineno = 26;
	                } else if (type == 3 || type == 4) {
	                    buf.push('\n	<div class="playerZone">\n	  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"\n	      poster="http://video-js.zencoder.com/oceans-clip.png"\n	      data-setup="{}">\n	    <source src="/cgi/resource/preview?id=', (__stack.lineno = 31, id), "\" type='video/mp4' />\n	    <source src=\"/cgi/resource/preview?id=", (__stack.lineno = 32, id), "\" type='video/webm' />\n	    <source src=\"/cgi/resource/preview?id=", (__stack.lineno = 33, id), '" type=\'video/ogg\' />\n	    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	  </video>\n	<div class="file-reivew-act">\n		<dl>\n			<dt>文件名:', (__stack.lineno = 39, name), "</dt>\n			<dd>\n				文件大小: ", (__stack.lineno = 41, size), "\n				时间: ", (__stack.lineno = 42, createTime), "\n			</dd>\n		</dl>\n	</div>\n\n	</div>\n");
	                    __stack.lineno = 48;
	                } else if (type == 8) {
	                    buf.push('\n	<div class="text-review">', (__stack.lineno = 49, text), '</div>\n	<div class="file-reivew-act">\n		<dl>\n			<dt>文件名:', (__stack.lineno = 52, name), "</dt>\n			<dd>\n				文件大小: ", (__stack.lineno = 54, size), "\n				时间: ", (__stack.lineno = 55, time), "\n			</dd>\n		</dl>\n	</div>	\n");
	                    __stack.lineno = 59;
	                } else {
	                    buf.push('\n	<div class="file-reivew-act">\n		<i class="icon-type', (__stack.lineno = 61, type), '"></i>\n		<dl>\n			<dt>文件名:', (__stack.lineno = 63, name), "</dt>\n			<dd>\n				文件大小: ", (__stack.lineno = 65, size), "\n				时间: ", (__stack.lineno = 66, createTime), "\n			</dd>\n		</dl>\n	</div>	\n");
	                    __stack.lineno = 70;
	                }
	                buf.push('\n<div class="ar-arrow" titla="下一个文件" data-action="showNext"></div>');
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
	        input: '	<div class="al-arrow-p" data-action="showPre"></div>\n	<div class="review-list-block">\n		<ul id="reviewFileList">\n\n		<%\n		var idx = 0;\n		for(var i in list){\n		var item = list[i];\n		%>\n			<li id="review<%-item.id%>"  data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>" <%if(item.id === id){%>class="selected"<%}%> title="<%-item.name%>">\n			<%if(item.type===1){%>\n				<img src="/cgi/resource/preview?id=<%-item.id%>" data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>" />\n			<%}else{%>\n				<i class="fdname<%-item.id%> icon-type" data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>"></i>\n			<%}%>\n			</li>\n		<%\n				idx++;\n			}\n		%>\n		</ul>\n	</div>\n	<div class="ar-arrow-p" data-action="showNext"></div>',
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
	                buf.push('	<div class="al-arrow-p" data-action="showPre"></div>\n	<div class="review-list-block">\n		<ul id="reviewFileList">\n\n		');
	                __stack.lineno = 5;
	                var idx = 0;
	                for (var i in list) {
	                    var item = list[i];
	                    buf.push('\n			<li id="review', (__stack.lineno = 10, item.id), '"  data-idx="', (__stack.lineno = 10, idx), '" data-action="showFile" data-id="', (__stack.lineno = 10, item.id), '" ');
	                    __stack.lineno = 10;
	                    if (item.id === id) {
	                        buf.push('class="selected"');
	                        __stack.lineno = 10;
	                    }
	                    buf.push(' title="', (__stack.lineno = 10, item.name), '">\n			');
	                    __stack.lineno = 11;
	                    if (item.type === 1) {
	                        buf.push('\n				<img src="/cgi/resource/preview?id=', (__stack.lineno = 12, item.id), '" data-idx="', (__stack.lineno = 12, idx), '" data-action="showFile" data-id="', (__stack.lineno = 12, item.id), '" />\n			');
	                        __stack.lineno = 13;
	                    } else {
	                        buf.push('\n				<i class="fdname', (__stack.lineno = 14, item.id), ' icon-type" data-idx="', (__stack.lineno = 14, idx), '" data-action="showFile" data-id="', (__stack.lineno = 14, item.id), '"></i>\n			');
	                        __stack.lineno = 15;
	                    }
	                    buf.push("\n			</li>\n		");
	                    __stack.lineno = 17;
	                    idx++;
	                }
	                buf.push('\n		</ul>\n	</div>\n	<div class="ar-arrow-p" data-action="showNext"></div>');
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
	        input: '<%\n	for(var i = 0,l=list.length;i<l;i++){\n		var item = list[i];\n%>\n<li data-id="<%-item.id%>" data-name="<%-item.name%>" data-action="select">\n	<%-item.name%>\n</li>\n<%}%>',
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
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\n	for(var i = 0,l=list.length;i<l;i++){\n		var item = list[i];\n%>\n<span class="tag label label-info label<%-item.id%>" data-id="<%-item.id%>">\n	<%-item.name%><span data-action="remove"></span>\n</span>\n<%}%>',
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
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <header class="header-top">\n      <div class="header-left">\n        <span class="fui-user"><%-proText%></span>\n        <%if(proText===\'我创建的\'){%>\n        <span class=""><a class="btn btn-block btn-lg btn-primary fui-plus"  data-toggle="modal" data-target="#createSubject" data-action="create">创建主题</a></span>\n        <%}%>\n      </div>\n\n      <div class="header-right">\n        共<span id="<%-proName%>Num">20</span>个主题 <a class="pre-page" data-action="pre">上一页</a> <a class="next-page" data-action="next">下一页</a>\n        <div class="btn-group">\n          <a class="btn btn-primary time active" data-action="orderbytime">按创建时间排序</a>\n          <a class="btn btn-primary update"  data-action="orderbyupdate">按更新时间排序</a>\n        </div>\n        <span class="arrow-down" data-action="close"></span>\n      </div>     \n    </header>\n\n    <div class="article-list" id="<%-proName%>">\n                 \n    </div>',
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
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '    <%\n    	for(var i = 0,l=list.length;i<l;i++){\n    		var item = list[i];\n    %>\n      <dl class="art-list">\n        <dt><a href="/info.html?id=<%-item.id%>"><%-item.title%></a></dt>\n        <dd>创建人 <%-item.creatorName%> 创建时间 <%-striker.util.formatTime(item.createTime)%> 最近更新 <%-striker.util.formatTime(item.updateTime)%> 主题资源 <%-item.resourceCount%> <%-item.memberCount%>个成员 <%-item.updator%>个帖子 <%-item.resourceCount%>个资源</dd>\n      </dl> \n    <%}%>',
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\n        <dd class="artice-use">主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12</dd>\n        <dd class="artice-act-btn">\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\n          <span class="col-xs-3"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <!--\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a>\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" href="#fakelink" data-action="article.orderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" href="#fakelink" data-action="article.orderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          <!--自动刷新: <input type="checkbox" data-action="subject.autorefresh" />-->\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>',
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <nav class="btn-toolbar">\n          <div class="btn-group">\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\n            <span class="btn btn-primary">统计</span>\n          </div>\n        </nav>\n\n        <div class="artice-aside-img">\n          <!--\n          <div class="video">\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\n            预览  标注 下载  删除\n          </div>\n          -->\n          <div class="img-list">\n            <%\n              for(var i in resourceList){\n              var item = resourceList[i];\n            %>\n            <div class="sub-resource-<%-item.id%>">\n            <%if(item.type === 1){%>\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \n              <%if(my.auth || my.id === creator){ %>\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\n              <%}%>\n            <%}else if(item.type === 4 || item.type ===3){%>\n              <video src="/cgi/resource/preview?id=<%-item.id%>" controls="controls">\n              您的浏览器不支持 video 标签。\n              </video>\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\n              <%if(my.auth || my.id === creator){ %>\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\n              <%}%>\n            <%}else{%>\n              <p><%-item.name%></p>\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\n              <%if(my.auth || my.id === creator){ %>\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\n              <%}%>              \n            <%}%>\n            </div>\n            <%}%>\n          </div>\n        </div>',
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i = 0;i<list.length;i++){\nvar item = list[i];\n%>\n<li><span class="fui-heart"></span>置顶：<a href="/article.html?id=<%-item.id%>"><%-item.title%></a></li>\n<%}%>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNDA5YWJkYWUxYmUwZTFkYTYyNDgiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L3Bvc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9tc2cuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3Jlc291cmNlL3Jldmlldy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9hcnRpY2xlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vY2dpLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcGxheWVyL3ZpZGVvLmRldi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL2ZsZXgvZmxleHBhcGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXJfaGFuZGxlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9qcS5yb3RhdGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2NyZWF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbXNnbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21zZy5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9tYWluLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9saXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9zdWJqZWN0L2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvc3ViamVjdC9oZWFkLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvYXNpZGUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQjs7Ozs7OztBQ3JUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0EsMEI7Ozs7OztBQ3pQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOzs7QUFHQSx5Qjs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCO0FBQ0E7QUFDQSxHO0FBQ0Esd0Q7QUFDQSxZO0FBQ0EsRztBQUNBLGlDO0FBQ0EsMkI7QUFDQSxxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBLEc7QUFDQSxjO0FBQ0EsRztBQUNBLGE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsOEI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBLEVBQUMsRTs7Ozs7O0FDOVBEO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFD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R0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDbE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQzdCQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBLHFCOzs7Ozs7QUM3UkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ2hCQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QSx1REFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpRUFBZ0U7QUFDaEU7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrSEFBaUg7QUFDakg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FB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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDhDQUE2QyxRQUFRO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CLFlBQVcsVUFBVTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBa0M7QUFDbEM7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QywrQkFBK0I7QUFDdkU7O0FBRUE7QUFDQTtBQUNBLDhIQUE2SDs7QUFFN0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVULFFBQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEIsYUFBYSxFQUFFO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDZCO0FBQ0EsR0FBRTs7O0FBR0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWEsNkJBQTZCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsRTs7Ozs7O0FDcktBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0I7QUFDQSxJQUFHOztBQUVIO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLGtDO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEs7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU0sRTtBQUNOLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFNLEU7QUFDTjs7QUFFQTtBQUNBOztBQUVBLEdBQUU7QUFDRixFOzs7Ozs7QUM3T0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE2QixJQUFJO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFU7QUFDQSxNQUFLLEU7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQSxtQ0FBa0MsSUFBSTtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtB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dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwianMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNDA5YWJkYWUxYmUwZTFkYTYyNDhcbiAqKi8iLCJyZXF1aXJlKCcuL2NvbW1vbi9nbG9iYWwnKTtcbnZhciB1c2VyID0gcmVxdWlyZSgnLi91c2VyL3VzZXInKSxcblx0c3ViamVjdCA9IHJlcXVpcmUoJy4vc3ViamVjdC9zdWJqZWN0JyksXG5cdGFydGljbGUgPSByZXF1aXJlKCcuL2FydGljbGUvYXJ0aWNsZScpLFxuXHRjb21tZW50ID0gcmVxdWlyZSgnLi9jb21tZW50L3Bvc3QnKSxcblx0bXNnID0gcmVxdWlyZSgnLi9jb21tb24vbXNnJyksXG5cdG5vdGlmeSA9IHJlcXVpcmUoJy4vbm90aWZ5L25vdGlmeScpLFxuXHRyZXZpZXcgPSByZXF1aXJlKCcuL3Jlc291cmNlL3JldmlldycpLFxuXHRsYWJlbCA9IHJlcXVpcmUoJy4vbGFiZWwvbGFiZWwnKTtcbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlciksXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcdFxuXG52YXIgbm93U3ViSWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdpZCcpO1xuXG5cbi8v5LqL5Lu26YCa55+lLOeUqOaIt+i1hOaWmeW3sue7j+WKoOi9veWujOaIkFxuLy/kuLvpopjliJfooajnmoTpgJrnn6Xkuovku7ZcbmZ1bmN0aW9uIHVzZXJMb2FkU3ViKGUsZCl7XG5cdHdpbmRvdy5zdHJpa2VyLmxhYmVsID0gbmV3IGxhYmVsLmxhYmVsKCdsYWJlbEFyZWEnKTtcblx0dmFyIHN1YkluZm8gPSBuZXcgc3ViamVjdC5pbmZvKG5vd1N1YklkKTtcblx0dmFyIHN1YlBvc3QgPSBuZXcgc3ViamVjdC5jcmVhdGUobm93U3ViSWQpO1xuXHR2YXIgYXJ0aWNsZUxpc3QgPSBuZXcgYXJ0aWNsZS5saXN0KG5vd1N1YklkKTtcblx0dmFyIGNwb3N0ID0gbmV3IGNvbW1lbnQucG9zdCgwLG5vd1N1YklkKTsgXG5cblx0bmV3IG5vdGlmeS5ub3RpZnkoKTtcblxuXHRzdWJJbmZvLmJpbmQoe1xuXHRcdHBvc3QgOiBzdWJQb3N0XG5cdH0pO1xuXHRjcG9zdC5iaW5kKHtcblx0XHRsaXN0IDogYXJ0aWNsZUxpc3Rcblx0fSk7XG5cdGFydGljbGVMaXN0LmJpbmQoe1xuXHRcdHBvc3QgOiBjcG9zdFxuXHR9KTtcbn1cblxuZnVuY3Rpb24gdXNlckxvYWRBcnQoZSxkKXtcblxufVxuLy/luJblrZDlj5HooajmiJDlip9cbmZ1bmN0aW9uIGFydGljbGVQb3N0ZWQoZSxkKXtcblxufVxuXG4vL+W4luWtkOiiq+WIoOmZpFxuZnVuY3Rpb24gYXJ0aWNsZURlbGVkKGUsZCl7XG5cbn1cblxuLy/luJblrZDlhbPms6jmiJDlip9cbmZ1bmN0aW9uIGFydGljbGVGb2xsb3dlZChlLGQpe1xuXG59XG5cbi8v5LqL5Lu26YCa55+lLOS4u+mimOW3sue7j+WKoOi9veWujOaIkFxuZnVuY3Rpb24gc3ViamVjdExvYWQoZSxkKXtcblx0Y29uc29sZS5sb2coZSxkKTtcbn1cblxudmFyIGhhbmRsZXJzID0ge1xuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWRTdWIsXG5cdCd1c2VyTG9hZEFydCcgOiB1c2VyTG9hZEFydCxcblx0J3N1YmplY3RMb2FkJyA6IHN1YmplY3RMb2FkLFxuXHQnYXJ0aWNsZVBvc3RlZCcgOiBhcnRpY2xlUG9zdGVkXG59XG5cbmZvcih2YXIgaSBpbiBoYW5kbGVycyl7XG5cdFN0cmlrZXIuYmluZChpLGhhbmRsZXJzW2ldKTtcbn1cblxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xuXHQkKCdib2R5JykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0XHRpZihhY3Rpb24pe1xuXHRcdFx0dmFyIGFjdE1hcCA9IGFjdGlvbi5zcGxpdCgnLicpO1xuXHRcdFx0dmFyIG1vZCA9IGFjdE1hcFswXSxcblx0XHRcdFx0ZnVuID0gYWN0TWFwWzFdO1xuXHRcdFx0aWYoYWN0TWFwLmxlbmd0aCA9PT0gMiAmJiBzdHJpa2VyW21vZF1bZnVuXSl7XG5cblx0XHRcdFx0c3RyaWtlclttb2RdW2Z1bl0odGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cblx0fSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKXtcblx0c3ViamVjdC5pbml0KCdpbmZvJyk7XG5cblx0c3RyaWtlci5zdWJqZWN0ID0gc3ViamVjdDtcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcblx0c3RyaWtlci51c2VyID0gdXNlcjtcblxuXHRhcnRpY2xlLmluaXQobm93U3ViSWQpO1xuXHRcblx0d2luZG93LnN0cmlrZXIubXNnID0gbmV3IG1zZy5tZXNzYWdlKCk7XG5cblx0XG5cdHVzZXIuaW5pdCgpO1xuXHRsYWJlbC5pbml0KCk7XG5cblx0YmluZEFjdGlvbigpO1xufVxuXG5pbml0KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9pbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcblx0bG9nb3V0ID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxvZ291dCxcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XG5cbnZhciB0bXBsID0ge1xuXHRuYXYgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci91c2VyX25hdi5lanMnKSxcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcbn1cblxudmFyIFVzZXIgPSB7fSxcblx0X3RoaXMgPSBVc2VyO1xubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xuXG4vL+WvueWkluaPkOS+m+eahOaOpeWPo1xud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XG5cbi8v566h55CG5ZGY6K6+572u5pi+56S6562J562JXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XG5cbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XG5cblVzZXIuZ2V0TXlJbmZvID0gZnVuY3Rpb24oY2Ipe1xuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdGRhdGEubXlJbmZvID0gcmVzLmRhdGE7XG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xuXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VybG9hZCcpO1xuXHRcdFx0YmluZEFjdGlvbigpO1xuXHRcdH1cblx0fSk7XG59XG5cbnZhciBteUFjdCA9IHtcblx0J2xvZ291dCcgOiBmdW5jdGlvbigpe1xuXHRcdGxvZ291dChmdW5jdGlvbihyZXMpe1xuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4uaHRtbCc7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxudmFyIGJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHQkKFwiI3VzZXJOYXZcIikuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuXHRcdGlmKGFjdGlvbil7XG5cdFx0XHRpZihteUFjdFthY3Rpb25dKXtcblx0XHRcdFx0bXlBY3RbYWN0aW9uXSgpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cblxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XG5cdFx0fVxuXHR9KTtcbn1cblxuVXNlci5pbml0ID0gZnVuY3Rpb24oKXtcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XG5cdF90aGlzLmdldFVzZXJMaXN0KCk7XG5cdHVzZXJNYW5hZ2UuaW5pdChjZ2ksdG1wbCk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcbnZhciBhUG9zdCA9IHt9LFxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXG5cdGNnaSxcblx0dG1wbCxcblx0bm93U3ViSWQgPSAwLFxuXHRsb2FkaW5nID0gZmFsc2U7XG5cdHN0YXJ0ID0gMCxcblx0bGltaXQgPSAyMCxcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpLFxuXHRyZXNMaXN0ID0gW107XG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XG5cbnZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcbnZhciB0bXBsID0ge1xuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXG59O1xuXG5cbi8v6YeN572u5LiA5LiqZnJvbVxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XG5cdHRhcmdldC5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKCcnKTtcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xufTtcblxuYVBvc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xuXHRub3dTdWJJZCA9IGlkO1xuXHRjZ2kgPSBtb2R1bGU7XG5cdHRtcGwgPSB0bXA7XG5cblx0bmV3IGFQb3N0LnBvc3QoKTtcbn1cblxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xuXHR0aGlzLnBEb20gPSAkKFwiI3Bvc3RBcnRpY2xlXCIpOyAvL+W6lemDqOWPkeihqOahhlxuXHR0aGlzLmNEb20gPSAkKFwiI2NyZWF0ZUFydGljbGVcIik7IC8v5by55Ye65Y+R6KGo5qGGXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMuY0RvbS5maW5kKCcucG9wLXJlcycpO1xuXHR0aGlzLmN0aXREb20gPSB0aGlzLmNEb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXG5cblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcblxuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLmNEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmKF90aGlzLmlzRWRpdCl7XG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xuXHRcdH1lbHNle1xuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcblx0XHR9XG5cdFx0XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0X3RoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykuZm9jdXMoKTtcblx0XHR9LDEwMDApXHRcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xuXHR9KTtcblxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xuXHR9KTtcblxuXHR0aGlzLmRhdGEgPSB7fTtcblx0dGhpcy5yZXNMaXN0ID0gW107XG5cdHRoaXMucmVzTWFwID0ge307XG5cblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xuXHR0aGlzLnRhcmdldDtcblx0dGhpcy5iaW5kQWN0aW9uKCk7XG59XG5cbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbigpe1xuXG59O1xuXG5cbi8v5Y+W6YCJ5oup55qE6LWE5rqQXG5wb3N0LnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcblx0dmFyIGxpc3QgPSBbXTtcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xuXHR9XG5cdHJldHVybiBsaXN0O1xufVxuXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cbnBvc3QucHJvdG90eXBlLmdldFBhcmFtID0gZnVuY3Rpb24odGFyZ2V0KXtcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xuXG5cdHZhciBwYXJhbSA9IHtcblx0XHR0aXRsZSA6IG5hbWUsXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXG5cdFx0bGFiZWxzIDogW10sXG5cdFx0cmVzb3VyY2VzIDogdGhpcy5nZXRSZXNMaXN0KClcblx0fVxuXG5cdHJldHVybiBwYXJhbTtcbn1cblxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xuXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcblx0aWYoaWQpe1xuXHRcdGRlbGV0ZSB0aGlzLnJlc01hcFtpZF07XG5cdFx0cC5yZW1vdmUoKTtcblx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xuXHRcdFx0aWYodGhpcy5jcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH1lbHNle1xuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0XHR0aGlzLnByZXNEb20uaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH1cdFxuXHR9XG59XG5cbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcblx0dGhpcy5pc0VkaXQgPSB0cnVlO1xuXHR0aGlzLmRhdGEgPSBkO1xuXHR0aGlzLmNEb20ubW9kYWwoJ3Nob3cnKTtcblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoZC50aXRsZSk7XG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XG5cblx0aWYoZC5yZXNvdXJjZUxpc3QubGVuZ3RoKXtcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcblx0XHR0aGlzLnJlc01hcCA9IHt9O1xuXHRcdGZvcih2YXIgaSBpbiBkLnJlc291cmNlTGlzdCl7XG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xuXHRcdFx0dGhpcy5yZXNMaXN0LnB1c2goaXRlbS5pZCk7XG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XG5cdFx0fVxuXHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZUxpc3Rcblx0XHR9KTtcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxuXHR9XG59XG5cblxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XHRcblx0Ly/otYTmupDkuIrkvKDlrozmiJDnmoTpgJrnn6VcblxuXHRzdHJpa2VyLmJpbmQoJ2VkaXRBcnRpY2xlJyxmdW5jdGlvbihlLGQpe1xuXHRcdF90aGlzLmVkaXQoZCk7XG5cdH0pO1xuXG5cdHN0cmlrZXIuYmluZCgndXBsb2FkQXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xuXHRcdFx0JChzdHJpa2VyKS50cmlnZ2VyKCd1cGxvYWRGaWxlJyxkKTtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0aWYoZC5jb2RlID09PSAwKXtcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XG5cblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxuXHRcdFx0fSk7XG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXHR9KTtcblxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xuXHRcdF90aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRpZihkLmNvZGUgPT09IDApe1xuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcblxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXG5cdFx0XHR9KTtcblx0XHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRfdGhpcy5wcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XG5cdFx0XHR9XG5cdFx0XHRcblx0XHR9XG5cdH07XG5cblx0dGhpcy5wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcblx0XHR9XG5cdH0pO1xuXG5cdHRoaXMuY0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XG5cdFx0fVxuXHR9KTtcdFxuXG5cdCQoXCIjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xuXHRcdFx0X3RoaXMuZmlsZXVwbG9hZCA9IHRydWU7XG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xuXHRcdH1cblx0fSlcdFxuXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdGlmKF90aGlzLmZpbGV1cGxvYWQpe1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cdFx0XG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcblx0XHRcdCQoXCIjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xuXHRcdH1cblx0fSlcdFxufVxuXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMucERvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XG5cdHRoaXMucERvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XG5cblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcdFxuXG5cdHJlc0xpc3QgPSBbXTtcbn1cblxucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XG5cdGlmKHRoaXMubG9hZGluZyl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xuXHQvL2NvbnNvbGUubG9nKHBUYXJnZXQpO1xuXHR2YXIgcFRhcmdldCA9ICQocHQpO1xuXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcblx0XHRyZXR1cm47XG5cdH1cblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0dmFyIHBhcmFtID0gdGhpcy5nZXRQYXJhbShwVGFyZ2V0KTtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHRpZihwYXJhbS50aXRsZSA9PT0gJycgfHwgcGFyYW0uY29udGVudCA9PT0gJycpe1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGlmKHRoaXMuaXNFZGl0KXtcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcblx0XHRwYXJhbS5hcnRpY2xlSWQgPSB0aGlzLmRhdGEuaWQ7XG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdGlmKHBUYXJnZXQuaGFzQ2xhc3MoJ21vZGFsJykpe1xuXHRcdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcblx0XHRcdH1cblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdFx0dGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignYXJ0aWNsZUVkaXRlZCcscmVzLmRhdGEpO1xuXHRcdFx0XHQvL3N0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xuXHRcdFx0fVxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcblx0XHR9KTtcdFxuXHR9ZWxzZXtcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcblx0XHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignbmV3YXJ0aWNsZScscmVzLmRhdGEpO1xuXHRcdFx0fVxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcblx0XHR9KTtcdFxuXHR9XG59XG4vL+mHjee9ruS4gOS4qmZyb21cbmFQb3N0LnJlc2V0ID0gZnVuY3Rpb24odGFyZ2V0KXtcblx0dmFyIHBUYXJnZXQgPSAkKHRhcmdldC5kYXRhKCd0YXJnZXQnKSk7XG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcblx0XHRyZXR1cm47XG5cdH1cblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xufVxuXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XG52YXIgdG1wbCA9IHtcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJyksXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxufTtcblxudmFyIENvbW1lbnQgPSB7fVxuXG52YXIgcG9zdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XG5cdHRoaXMuZG9tID0gJChcIiNwb3N0QXJlYVwiKTtcblx0dGhpcy5wb3BEb20gPSAkKFwiI2NyZWF0ZUNvbW1lbnRcIik7XG5cdHRoaXMuY29udGVudERvbSA9IHRoaXMuZG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKTtcblx0dGhpcy5wb3BDb250ZW50RG9tID0gdGhpcy5wb3BEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpO1xuXHR0aGlzLnBvcFRpdGxlRG9tID0gdGhpcy5wb3BEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpO1xuXHR0aGlzLmNyZXNEb20gPSB0aGlzLnBvcERvbS5maW5kKCcucG9wLXJlcycpO1xuXHR0aGlzLmN0aXREb20gPSB0aGlzLnBvcERvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcblx0Y29uc29sZS5sb2codGhpcy5jdGl0RG9tKTtcblxuXHR0aGlzLmFydElkID0gaWQ7XG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcblxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcblx0dGhpcy5yZXNNYXAgPSB7fTtcblxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xuXHR0aGlzLmlzRWRpdCA9IGZhbHNlO1xuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XG59XG5cbi8v5Y+W6YCJ5oup55qE6LWE5rqQXG5wb3N0LnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcblx0dmFyIGxpc3QgPSBbXTtcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xuXHR9XG5cdHJldHVybiBsaXN0O1xufVxuXG5wb3N0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcblx0dGhpcy5hcnRpY2xlTGlzdCA9IG9iai5saXN0O1xufVxuXG5wb3N0LnByb3RvdHlwZS5jaGFuZ2VBcnRpY2xlID0gZnVuY3Rpb24oaWQpe1xuXHR0aGlzLmFydElkID0gaWQ7XG59XG5cbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihsaXN0KXtcblx0dGhpcy5jTGlzdCA9IGxpc3Q7XG59XG5cbnBvc3QucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKGlkLG5hbWUpe1xuXHR0aGlzLmNvbnRlbnREb20udmFsKCflm57lpI0gJytuYW1lKyc6Jyk7XG59XG5cbnBvc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XG5cdHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50RG9tLnZhbCgpO1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRpZihjb250ZW50ID09PSAnJyl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdHZhciBwYXJhbSA9IHtcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXG5cdFx0dGl0bGUgOiAnJyxcblx0XHRsYWJlbCA6IFtdLFxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXG5cdH07XG5cblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xuXHRcdFx0X3RoaXMuY29udGVudERvbS52YWwoJycpO1xuXHRcdH1cblx0fSk7XG59XG5cbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcblx0dGhpcy5pc0VkaXQgPSB0cnVlO1xuXHR0aGlzLnBvcENvbnRlbnREb20udmFsKGQuY29udGVudCk7XG5cdHRoaXMucG9wVGl0bGVEb20udmFsKGQudGl0bGUpO1xuXHR0aGlzLmRhdGEgPSBkO1xuXG5cdGlmKGQucmVzb3VyY2Upe1xuXHRcdGZvcih2YXIgaSBpbiBkLnJlc291cmNlKXtcblx0XHRcdHZhciBpdGVtID0gZC5yZXNvdXJjZVtpXTtcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xuXHRcdH1cblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2Vcblx0XHR9KTtcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxuXHR9XG5cdHRoaXMucG9wRG9tLm1vZGFsKCdzaG93Jyk7XG59XG5cbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xuXG5cdHZhciBjb250ZW50ID0gdGhpcy5wb3BDb250ZW50RG9tLnZhbCgpO1xuXHR2YXIgdGl0bGUgPSB0aGlzLnBvcFRpdGxlRG9tLnZhbCgpO1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRpZihjb250ZW50ID09PSAnJyl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdHZhciBwYXJhbSA9IHtcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXG5cdFx0dGl0bGUgOiB0aXRsZSxcblx0XHRsYWJlbCA6IFtdLFxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXG5cdH07XG5cblx0aWYodGhpcy5pc0VkaXQpe1xuXHRcdHBhcmFtLmNvbW1lbnRJZCA9IHRoaXMuZGF0YS5pZDtcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRcdGlmKF90aGlzLmNMaXN0KXtcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC51cGRhdGUocmVzLmRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF90aGlzLnBvcENvbnRlbnREb20udmFsKCcnKTtcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcblx0XHRcdFx0X3RoaXMucG9wRG9tLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1lbHNle1xuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XG5cdFx0XHRcdFx0X3RoaXMuY0xpc3QuYXBwZW5kKHJlcy5kYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XG5cdFx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLnZhbCgnJyk7XG5cdFx0XHRcdF90aGlzLnBvcERvbS5tb2RhbCgnaGlkZScpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbnBvc3QucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcblx0XG59XG5cbnBvc3QucHJvdG90eXBlLnNob3dQb3N0ID0gZnVuY3Rpb24oaWQpe1xuXHR0aGlzLmNoYW5nZUFydGljbGUoaWQpO1xuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xufVxuXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XG5cblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xuXHRpZihpZCl7XG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcblx0XHRwLnJlbW92ZSgpO1xuXG5cdFx0aWYodGhpcy5wb3BEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XG5cdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xuXHRcdH1cblx0fVxufVxuXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oaWQsbmFtZSl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0dmFyIHVwbG9hZENvbXAgID0gZnVuY3Rpb24oZCl7XG5cdFx0Y29uc29sZS5sb2coJ2NvbW1lbnQnLGQpO1xuXHRcdF90aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcblx0XHRpZihkLmNvZGUgPT09IDApe1xuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcblxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXG5cdFx0XHR9KTtcblx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcblx0XHR9XG5cdH1cblxuXHRpZih3aW5kb3cudXBsb2FkQ29tcCl7XG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xuXHRcdFx0Y29uc29sZS5sb2coJ3RyaWdnZXInLGQpO1xuXHRcdFx0dXBsb2FkQ29tcChkKTtcblx0XHR9KTtcblx0fWVsc2V7XG5cdFx0d2luZG93LnVwbG9hZENvbXAgPSB1cGxvYWRDb21wO1xuXHR9XG5cblx0JChcIiNjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xuXHRcdFx0X3RoaXMuZmlsZXVwbG9hZCA9IHRydWU7XG5cdFx0XHQkKFwiI2NjZmlsZUZvcm1cIikuc3VibWl0KCk7XG5cdFx0fVxuXHR9KVx0XG5cblx0dGhpcy5wb3BEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdGlmKF90aGlzLmlzRWRpdCl7XG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+S/ruaUueWbnuWkjScpO1xuXHRcdH1lbHNle1xuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rlm57lpI0nKTtcblx0XHR9XG5cdFx0XG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xuXHRcdFx0X3RoaXMucG9wVGl0bGVEb20uZm9jdXMoKTtcblx0XHR9LDEwMDApXHRcdFxuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gdHJ1ZTtcblx0fSk7XG5cblx0dGhpcy5wb3BEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gZmFsc2U7XG5cdFx0X3RoaXMuaXNFZGl0ID0gZmFsc2U7XG5cdH0pO1x0XG5cblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XG5cdFx0fVxuXHR9KTtcblxuXHR0aGlzLnBvcERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcblx0XHR9XG5cdH0pO1x0XG59XG5cbkNvbW1lbnQucG9zdCA9IHBvc3Q7XG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L3Bvc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsInZhciBtc2cgPSB7XG5cdDAgOiAn5pON5L2c5oiQ5YqfIScsXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcblx0MTEgOiAn57uE57uH5ZCN56ew5b+F6aG75aGr5YaZJyxcblx0MjAgOiAn5paw5a+G56CB5ZKM6YeN5aSN5a+G56CB5b+F6aG75LiA6Ie0Jyxcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXG5cdDIyIDogJ+eUqOaIt+S4jeWtmOWcqCcsXG5cdDMwIDogJ+e7hOe7h+acgOWkmuaUr+aMgTPnuqchJywgXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxuXHQ1MCA6ICfkvaDopoHkuIrkvKDnmoTmlofku7blt7Lnu4/otoXov4fkvaDnmoTliankvZnnqbrpl7QhJyxcblx0NjAgOiAn5L2g6L+Y5rKh5pyJ6YCJ5oup6KaB5YWx5Lqr55qE55uu5b2VJyxcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXG5cdDc2IDogJ+WQjeensOS4jeiDveWwkeS6jjLkuKrlrZcnLFxuXHQ3NyA6ICflj4LmlbDkuI3og73kuLrnqbonLFxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxuXHQ3OSA6ICflt7Lnu4/mnInlkIzlkI3nmoTpobnnm67kuoYnLFxuXHQxMDAgOiAn5a+55LiN6LW377yM5oKo5rKh5pyJ6L+Z5Liq5pON5L2c5p2D6ZmQIScsLy/lkI7lj7Dlh7rplJnllaYhXG5cdDEwMSA6ICflh7rplJnllaYnLFxuXHQxMDAxIDogJ+aCqOi/mOayoeacieeZu+W9lSEnLFxuXHQxMDA0IDogJ+ayoeacieaJvuWIsOi1hOa6kCEnLFxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxuXHQxMDExIDogJ+WPguaVsOWHuumUmeWVpiEnLFxuXHQxMDEzIDogJ+WHuumUmeWVpicsXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcblx0MTAxNSA6ICflt7Lnu4/lvZLmoaPllaYhJyxcblx0MTAxNiA6ICfor6XotYTmupDkuI3og73liKDpmaQnLFxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxuXHQxMDQxIDogJ+eUqOaIt+WQjeaIluWvhueggemUmeivryEnLFxuXHQxMDQzIDogJ+eUqOaIt+S4jeWtmOWcqCEnLFxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXG59XG5cbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XG4gICAgZXh0cmFDbGFzc2VzOiAnbWVzc2VuZ2VyLWZpeGVkIG1lc3Nlbmdlci1vbi1ib3R0b20nLFxuICAgIHRoZW1lOiAnZmxhdCdcbn1cblxudmFyIGRiID0ge307XG5cbmZ1bmN0aW9uIG1lc3NhZ2UoKXtcblx0dGhpcztcbn1cblxubWVzc2FnZS5wcm90b3R5cGUuY29uZmlybSA9IGZ1bmN0aW9uKG1zZyxsYWJlbCxjYil7XG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xuXHRcdGxhYmVsID0ge1xuXHRcdFx0c3ViIDogJ+ehruWumicsXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xuXHRcdH1cblx0fVxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcblx0XHRjYiA9IGZ1bmN0aW9uKCl7fTtcblx0fVxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIG9iaiA9IHtcblx0XHRtZXNzYWdlIDogbXNnLFxuXHRcdGFjdGlvbnMgOiB7XG5cdFx0XHRzdWIgOiB7XG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuc3ViIHx8ICfnoa7lrponLFxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xuXHRcdFx0XHRcdGNiKCk7XG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdGNhbmNlbCA6IHtcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHR2YXIgbXNnID0gTWVzc2VuZ2VyKCkucG9zdChvYmopO1xufVxuXG5tZXNzYWdlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGQpe1xuXHQvLyBpZihkID09IDEwMDEpe1xuXHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IGNvbmZpZy5jZ2kuZ290b2xvZ2luO1xuXHQvLyBcdHJldHVybjtcblx0Ly8gfVxuXG5cdHZhciBvYmogPSB7XG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xuXHR9XG5cdGlmKHBhcnNlSW50KGQpKXtcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcblx0fVxuXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcbn1cblxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcblx0dmFyIG9iaiA9IHtcblx0XHQnbWVzc2FnZScgOiBtc2cgfHwgJydcblx0fVxuXHRpZihwYXJzZUludChtc2cpKXtcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcblx0fVxuXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcdFx0XG59XG5cbmRiLm1lc3NhZ2UgPSBtZXNzYWdlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIi8v6YCa55+lXG52YXIgbm90aWZ5ID0ge30sXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5ub3RpZnksXG5cdGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5ub3RpZnk7XG5cbnZhciB0bXBsID0ge1xuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnbGlzdC5lanMnKSxcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnLmVqcycpICAgLy/otYTmupDliJfooahcbn1cblxudmFyIG5vdGlmeU9iaiA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuZG9tID0gJChcIiNub3RpZnlMaXN0XCIpO1xuXHR0aGlzLnRpcHNEb20gPSAkKFwiI3VzZXJOYXYgLm1zZyBkaXZcIik7XG5cblx0dGhpcy5tc2dOdW0gPSAwO1xuXHR0aGlzLmdldCgpO1xuXHR0aGlzLmJpbmRBY3Rpb24oKTtcbn1cblxubm90aWZ5T2JqLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRjZ2kuc2VhcmNoKHt9LGZ1bmN0aW9uKHJlcyl7XG5cdFx0Y29uc29sZS5sb2cocmVzKTtcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aCl7XG5cdFx0XHRcdF90aGlzLm1zZ051bSA9IHJlcy5kYXRhLmxpc3QubGVuZ3RoO1xuXHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKS5zaG93KCk7XG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcblx0XHRcdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxubm90aWZ5T2JqLnByb3RvdHlwZS5yZWFkID0gZnVuY3Rpb24oKXtcblxufVxuXG5ub3RpZnlPYmoucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLnRpcHNEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdGlmKF90aGlzLm1zZ051bSl7XG5cdFx0XHRpZihfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnKSl7XG5cdFx0XHRcdF90aGlzLmRvbS5oaWRlKCk7XG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMCk7XG5cdFx0XHR9ZWxzZXtcblx0XHRcdFx0X3RoaXMuZG9tLnNob3coKTtcdFxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDEpO1xuXHRcdFx0fVxuXHRcdFx0XG5cdFx0fVxuXHR9KTtcblxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0aHJlZiA9IHRhcmdldC5kYXRhKCdocmVmJyksXG5cdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxuXHRcdFx0cmVhZCA9IHRhcmdldC5kYXRhKCdyZWFkJyk7XG5cblxuXHRcdGlmKGhyZWYpe1xuXHRcdFx0d2luZG93Lm9wZW4oaHJlZik7XG5cdFx0XHRpZihyZWFkID09ICcnKXtcblx0XHRcdFx0Y2dpLnJlYWQoe1xuXHRcdFx0XHRcdG5vdGlmeUlkIDogaWRcblx0XHRcdFx0fSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdFx0XHRcdHRhcmdldC5yZW1vdmUoKTtcblx0XHRcdFx0XHRcdF90aGlzLm1zZ051bS0tO1xuXHRcdFx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcbn1cblxubm90aWZ5Lm5vdGlmeSA9IG5vdGlmeU9iajtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy9cbnJlcXVpcmUoJy4uL2xpYi9wbGF5ZXIvdmlkZW8uZGV2Jyk7XG5yZXF1aXJlKCcuLi9saWIvZmxleC9mbGV4cGFwZXInKTtcbnJlcXVpcmUoJy4uL2xpYi9mbGV4L2ZsZXhwYXBlcl9oYW5kbGVycycpO1xucmVxdWlyZSgnLi4vbGliL2pxLnJvdGF0ZScpO1xudmFyIHRtcGwgPSB7XG5cdGJvZHkgOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L2JvZHkuZWpzJyksXG5cdG1haW4gOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L21haW4uZWpzJyksXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L2xpc3QuZWpzJylcbn1cblxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcblxudmFyIGRiID0ge31cbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cbnZhciBnZXRTaXplID0gZnVuY3Rpb24oc2l6ZSl7XG4gICAgdmFyIHByZWMgPSAzO1xuICAgIHZhciBzaXplID0gTWF0aC5yb3VuZChNYXRoLmFicyhzaXplKSk7XG5cdHZhciB1bml0cyA9IFsnQicsJ0tCJywnTUInLFwiR0JcIixcIlRCXCJdO1xuXG5cdHZhciB1bml0ID0gIE1hdGgubWluKDQsIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLmxvZygyKSAvIDEwKSk7XG5cbiAgICBzaXplID0gc2l6ZSAqIE1hdGgucG93KDIsIC0xMCAqIHVuaXQpO1xuICAgIHZhciBkaWdpID0gcHJlYyAtIDEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMTApKTtcbiAgICBzaXplID0gTWF0aC5yb3VuZChzaXplICogTWF0aC5wb3coMTAsIGRpZ2kpKSAqIE1hdGgucG93KDEwLCAtZGlnaSk7XG4gICAgcmV0dXJuIGdldE51bXMoc2l6ZSkgKyB1bml0c1t1bml0XTsgICAgXHRcbn1cblxudmFyIGdldE51bXMgPSBmdW5jdGlvbih4KXtcblx0aWYoeD09PTApe1xuXHRcdHJldHVybiAwO1xuXHR9XG5cdHZhciBmX3ggPSBwYXJzZUZsb2F0KHgpOyAgXG5cdGlmIChpc05hTihmX3gpKSAgXG5cdHsgIFxuXHQvL2FsZXJ0KCdmdW5jdGlvbjpjaGFuZ2VUd29EZWNpbWFsLT5wYXJhbWV0ZXIgZXJyb3InKTsgIFxuXHRcdHJldHVybiAwOyAgXG5cdH0gIFxuXHR2YXIgZl94ID0gTWF0aC5jZWlsKHgqMTAwKS8xMDA7ICBcblx0dmFyIHNfeCA9IGZfeC50b1N0cmluZygpOyAgXG5cdHZhciBwb3NfZGVjaW1hbCA9IHNfeC5pbmRleE9mKCcuJyk7ICBcblx0aWYgKHBvc19kZWNpbWFsIDwgMCkgIFxuXHR7XG5cdFx0cmV0dXJuIGZfeDtcblx0fSAgXG5cdHdoaWxlIChzX3gubGVuZ3RoIDw9IHBvc19kZWNpbWFsICsgMikgIFxuXHR7ICBcblx0XHRzX3ggKz0gJzAnOyAgXG5cdH0gXG5cdHJldHVybiBzX3g7ICAgICAgXHRcbn1cblxudmFyIGdldFRpbWU7XG5cblxuZnVuY3Rpb24gcmV2aWV3KGRhdGEpe1xuXHRnZXRUaW1lID0gd2luZG93LnN0cmlrZXIudXRpbC5mb3JtYXRUaW1lO1xuXG5cdHRoaXMuYmcgPSAkKCc8ZGl2IGlkPVwicmV2aWV3QmdzXCI+PC9kaXY+Jyk7XG5cdHRoaXMuZG9tID0gJCgnPGRpdiBpZD1cInJldmlld1dpblwiPjwvZGl2PicpO1xuXHR0aGlzLmRhdGEgPSB7fTtcblx0dGhpcy5ub3dJZCA9IGRhdGEuaWQ7XG5cdHRoaXMubWFwID0ge307XG5cdHRoaXMubGlzdCA9IFtdO1xuXHR0aGlzLmxpc3RJdGVtID0gW107XG5cblxuXHQkKCdib2R5JykuYXBwZW5kKHRoaXMuYmcpO1xuXHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZG9tKTtcblxuXHR2YXIgaHRtbCA9IHRtcGwuYm9keSgpO1xuXHR0aGlzLmRvbS5odG1sKGh0bWwpO1xuXG5cdHRoaXMucmV2aWV3RGl2ID0gJChcIiNyZXZpZXdEaXZcIik7XG5cdHRoaXMucmV2aWV3QmxvY2sgPSAkKFwiI3Jldmlld0Jsb2NrXCIpO1xuXG5cdHRoaXMuY2hlY2tEYXRhKGRhdGEpO1xuXG5cdHRoaXMuc2hvd0xpc3QoKTtcblx0dGhpcy5zaG93T25lKCk7XG5cblx0dGhpcy5zaG93KCk7XG5cdHRoaXMuYmluZEFjdGlvbigpO1xufTtcblxucmV2aWV3LnByb3RvdHlwZS5zaG93TGlzdCA9IGZ1bmN0aW9uKGlkKXtcblx0dmFyIGxpc3RIdG1sID0gdG1wbC5saXN0KHtcblx0XHRsaXN0IDogdGhpcy5saXN0SXRlbSxcblx0XHRpZCA6IHRoaXMubm93SWRcblx0fSk7XG5cdHRoaXMucmV2aWV3QmxvY2suaHRtbChsaXN0SHRtbCk7XG59XG5cbnJldmlldy5wcm90b3R5cGUuc2hvd09uZSA9IGZ1bmN0aW9uKGlkLGlkeCl7XG5cdHZhciBub3dJZCA9IGlkIHx8IHRoaXMubm93SWQ7XG5cdHZhciBvYmogPSB0aGlzLmRhdGFbbm93SWRdO1xuXG5cdGlmKG9iail7XG5cdFx0aWYob2JqLnR5cGUgPT09IDIpe1xuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm1haW4ob2JqKTtcblx0XHRcdHRoaXMucmV2aWV3RGl2Lmh0bWwoaHRtbCk7XHRcdFx0XG4gICAgICAgICAgICAgIHZhciBwdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCcvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JytvYmouaWQpO1xuICAgICAgICAgICAgICAkKCcjZG9jdW1lbnRWaWV3ZXInKS5GbGV4UGFwZXJWaWV3ZXIoXG4gICAgICAgICAgICAgICAgeyBjb25maWcgOiB7XG4gICAgICAgICAgICAgICAgICAgIFNXRkZpbGUgOiBwdXJsLFxuICAgICAgICAgICAgICAgICAgICBqc0RpcmVjdG9yeSA6ICcvanMvbGliL2ZsZXgvJyxcbiAgICAgICAgICAgICAgICAgICAgU2NhbGUgOiAwLjgsXG4gICAgICAgICAgICAgICAgICAgIFpvb21UcmFuc2l0aW9uIDogJ2Vhc2VPdXQnLFxuICAgICAgICAgICAgICAgICAgICBab29tVGltZSA6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgWm9vbUludGVydmFsIDogMC4yLFxuICAgICAgICAgICAgICAgICAgICBGaXRQYWdlT25Mb2FkIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgRml0V2lkdGhPbkxvYWQgOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgRnVsbFNjcmVlbkFzTWF4V2luZG93IDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIFByb2dyZXNzaXZlTG9hZGluZyA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBNaW5ab29tU2l6ZSA6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgTWF4Wm9vbVNpemUgOiA1LFxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hNYXRjaEFsbCA6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBJbml0Vmlld01vZGUgOiAnUG9ydHJhaXQnLFxuICAgICAgICAgICAgICAgICAgICBSZW5kZXJpbmdPcmRlciA6ICdmbGFzaCcsXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0QXRQYWdlIDogJycsXG4gICAgICAgICAgICAgICAgICAgIFZpZXdNb2RlVG9vbHNWaXNpYmxlIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgWm9vbVRvb2xzVmlzaWJsZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIE5hdlRvb2xzVmlzaWJsZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIEN1cnNvclRvb2xzVmlzaWJsZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFNlYXJjaFRvb2xzVmlzaWJsZSA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIFdNb2RlIDogJ3dpbmRvdycsXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsZUNoYWluOiAnemhfQ04nXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgKTsgIFx0XHRcbiAgICAgICAgfWVsc2UgaWYob2JqLnR5cGUgPT09IDgpe1xuICAgICAgICBcdHZhciBwdXJsID0gJ2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScrb2JqLmlkO1xuICAgICAgICBcdHZhciB0ZXh0ID0gJC5hamF4KHtcblx0XHRcdFx0dXJsOiBwdXJsLFxuXHRcdFx0XHRhc3luYzogZmFsc2UsXG5cdFx0XHRcdGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XG5cdFx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0XHR9XG5cdFx0XHR9KS5yZXNwb25zZVRleHQ7XG5cbiAgICAgICAgXHRvYmoudGV4dCA9IHRleHQ7XG4gICAgICAgIFx0Y29uc29sZS5sb2cob2JqKTtcblx0XHRcdHZhciBodG1sID0gdG1wbC5tYWluKG9iaik7XG5cdFx0XHR0aGlzLnJldmlld0Rpdi5odG1sKGh0bWwpO1xuXHRcdFx0Y29uc29sZS5sb2codGV4dCk7XG4gICAgICAgIH1lbHNle1xuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm1haW4ob2JqKTtcblx0XHRcdHRoaXMucmV2aWV3RGl2Lmh0bWwoaHRtbCk7ICAgICAgICBcdFxuICAgICAgICB9XG5cdH1cblxufVxuXG5yZXZpZXcucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xuXHR2YXIgaWR4ID0gMDtcblx0Zm9yKHZhciBpIGluIGRhdGEubGlzdCl7XG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XG5cdFx0dGhpcy5tYXBbaXRlbS5pZF0gPSBpZHg7XG5cdFx0aWYoaXRlbS5pZCA9PT0gdGhpcy5ub3dJZCl7XG5cdFx0XHR0aGlzLm5vd0lkeCA9IGlkeDtcblx0XHR9XG5cdFx0dGhpcy5saXN0LnB1c2goaXRlbS5pZCk7XG5cdFx0dGhpcy5saXN0SXRlbS5wdXNoKGl0ZW0pO1xuXG5cdFx0aXRlbS5zaXplID0gZ2V0U2l6ZShpdGVtLnNpemUpO1xuXHRcdGl0ZW0udGltZSA9IGdldFRpbWUoaXRlbS5jcmVhdGVUaW1lKTtcblx0XHR0aGlzLmRhdGFbaXRlbS5pZF0gPSBpdGVtO1xuXHRcdGlkeCsrO1xuXHR9XG59XG5cbnJldmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuYmcuc2hvdygpO1xuXHR0aGlzLmRvbS5zaG93KCk7XG59XG5cbnJldmlldy5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuYmcuaGlkZSgpO1xuXHR0aGlzLmRvbS5oaWRlKCk7XHRcbn1cblxuLy/mm7TmjaLmlbDmja5cbnJldmlldy5wcm90b3R5cGUuY2hhbmdlRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcblx0dGhpcy5zaG93TGlzdCgpO1xuXHR0aGlzLnNob3dPbmUoKTtcblx0dGhpcy5zaG93KCk7XG59XG5cbnJldmlldy5wcm90b3R5cGUuc2hvd05leHQgPSBmdW5jdGlvbihlKXtcblx0aWYodGhpcy5ub3dJZHggPCB0aGlzLmxpc3QubGVuZ3RoLTEpe1xuXHRcdHRoaXMubm93SWR4Kytcblx0fVxuXHR0aGlzLm5vd0lkID0gdGhpcy5saXN0W3RoaXMubm93SWRdO1xuXHR0aGlzLnJldmlld0Jsb2NrLmZpbmQoJ2xpJykuZXEodGhpcy5ub3dJZHgpLmNsaWNrKCk7XG59XG5cbnJldmlldy5wcm90b3R5cGUuc2hvd1ByZSA9IGZ1bmN0aW9uKGUpe1xuXHRpZih0aGlzLm5vd0lkeCA+IDApe1xuXHRcdHRoaXMubm93SWR4LS07XG5cdH1cblx0dGhpcy5ub3dJZCA9IHRoaXMubGlzdFt0aGlzLm5vd0lkXTtcblx0dGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpLmVxKHRoaXMubm93SWR4KS5jbGljaygpO1xufVxuXG5yZXZpZXcucHJvdG90eXBlLnNob3dJZHggPSBmdW5jdGlvbihlKXtcblx0XG59XG5cbnJldmlldy5wcm90b3R5cGUuc2hvd0ZpbGUgPSBmdW5jdGlvbihlKXtcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XG5cblx0aWYoaWQpe1xuXHRcdHRoaXMubm93SWR4ID0gdGhpcy5tYXBbaWRdO1xuXHRcdHRoaXMuc2hvd09uZShpZCk7XG5cdFx0dmFyIGxpc3QgPSB0aGlzLnJldmlld0Jsb2NrLmZpbmQoJ2xpJyk7XG5cdFx0bGlzdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcblx0XHQkKFwiI3Jldmlld1wiK2lkKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcblx0XHQvL2xpc3RbdGhpcy5ub3dJZHhdLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuXHR9XG5cblxufVxuXG5yZXZpZXcucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihkYXRhKXtcblx0dmFyIF90aGlzID0gdGhpcztcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcblx0XHRcdC8vX3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcblx0XHR9XHRcdFx0XG5cdH0pXG59XG5cbnJldmlldy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpe1xuXHR0aGlzLmhpZGUoKTtcbn1cblxuZGIucmV2aWV3ID0gcmV2aWV3O1xuXG52YXIgcnY7XG5cbnN0cmlrZXIuYmluZCgncmV2aWV3JyxmdW5jdGlvbihlLGQpe1xuXHRpZighcnYpe1xuXHRcdHJ2ID0gbmV3IHJldmlldyhkKTtcblx0fWVsc2V7XG5cdFx0cnYuY2hhbmdlRGF0YShkKTtcblx0fVxuXHRjb25zb2xlLmxvZyhkKTtcblxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9yZXNvdXJjZS9yZXZpZXcuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxhYmVsLFxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcblxudmFyIExhYmVsID0ge30sXG5cdF90aGlzID0gTGFiZWw7XG52YXIgdG1wbCA9IHtcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xuXG5mdW5jdGlvbiBnZXRMaXN0KCl7XG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0XG5cdFx0fVxuXHR9KTtcbn1cblxuXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XG5cblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcblx0Ly8gaWYodHlwZSA9PT0gJ3N1Yicpe1xuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcblx0Ly8gfWVsc2V7XG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xuXHQvLyB9XG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xuXHR0aGlzLmlucHV0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmZvcm0tY29udHJvbCcpO1xuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcblxuXHQvL+m7mOiupOayoeacieagh+etvlxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcblxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXG5cdHRoaXMuaWRtYXAgPSB7fTtcblxuXHR0aGlzLm1hcCA9IHt9O1xuXHR0aGlzLmdldERhdGEoKTtcdFxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcbn1cblxuTGFiZWwubGFiZWwucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XG5cblx0XHRpZihfdGhpc1thY3Rpb25dKXtcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XG5cdFx0fVxuXHR9KTtcblx0Ly9cblx0Ly8gdGhpcy5ub3dEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0Ly8gXHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xuXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XG5cdC8vIFx0XHRfdGhpc1thY3Rpb25dKGUpO1xuXHQvLyBcdH1cblx0Ly8gfSk7XG59XG5cbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xuXHR2YXIgdmFsID0gdGhpcy5pbnB1dERvbS52YWwoKTtcblx0aWYodmFsICE9PSAnJyl7XG5cdFx0dmFyIHBhcmFtID0ge1xuXHRcdFx0bmFtZSA6IHZhbFxuXHRcdH07XG5cdFx0dmFyIF90aGlzID0gdGhpcztcblxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdFx0X3RoaXMubWFwW3Jlcy5kYXRhLmlkXSA9IHJlcy5kYXRhO1xuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG59XG5cbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xuXHQvLyAvY29uc29sZS5sb2codGhpcy5fc2VsZWN0RG9tKTtcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xuXHRcdHRoaXMuYWRkRG9tLnNob3coKTtcblx0fWVsc2V7XG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcblx0XHR0aGlzLmFkZERvbS5oaWRlKCk7XG5cdH1cblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XG5cdC8vdGhpcy5ub3dEb20uc2hvdygpO1xuXG5cdC8vZnVpLWNyb3NzXG5cdC8vZnVpLXBsdXNcbn1cblxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XG5cdFx0XHRmb3IodmFyIGkgPSAwLGw9cmVzLmRhdGEubGVuZ3RoO2k8bDtpKyspe1xuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xuXHQgdmFyIGh0bWwgPSB0bXBsLm9uZSh7bGlzdDpkYXRhfSk7XG5cdCB0aGlzLm5vd0RvbS5odG1sKGh0bWwpLnNob3coKTtcbn1cblxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcblx0dmFyIHBhcmFtID0ge1xuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxuXHR9XG5cblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xuXHRcdHZhciBodG1sID0gdG1wbC5vbmUocGFyYW0pO1xuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XG5cdH1cbn1cblxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XG5cdHZhciBsaXN0ID0gW107XG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcblx0Ly8gXHRpZihpZCl7XG5cdC8vIFx0XHRsaXN0LnB1c2goaWQpO1xuXHQvLyBcdH1cdFx0XHRcdFxuXHQvLyB9KVx0XG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcblx0XHRsaXN0LnB1c2goaSk7XG5cdH1cblx0cmV0dXJuIGxpc3Q7XG59XG5cbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMuaWRtYXAgPSB7fTtcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xuXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcblx0dGhpcy5hZGREb20uaGlkZSgpO1x0XG59XG5cbi8v5Yig6ZmkXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xuXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcblx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xuXHRwLnJlbW92ZSgpO1xufVxuXG5cbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xuXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/kuLvpophcbnZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuc3ViamVjdCxcblx0c3ViamVjdExpc3QgPSByZXF1aXJlKCcuL2xpc3QnKSxcblx0c3ViamVjdEluZm8gPSByZXF1aXJlKCcuL2luZm8nKSxcblx0c3ViamVjdENyZWF0ZSA9IHJlcXVpcmUoJy4vY3JlYXRlJyk7XG5cbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHRcblxuLy/mqKHmnb/lvJXnlKhcbnZhciB0bXBsID0ge1xuXHRhcmVhIDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3Qvc2l6ZS5lanMnKSxcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLCAvL+euoeeQhuWRmFxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvbGlzdC5lanMnKSwgIC8v5Li76aKY5YiX6KGoXG5cdGhlYWQgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9oZWFkLmVqcycpLCAgLy/kuLvpopjor6bmg4XlpLTpg6hcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpLCAvL+WNleS4queuoeeQhuWRmFxuXHRhc2lkZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2FzaWRlLmVqcycpLCAgLy/kuLvpopjor6bmg4Xlj7PovrnotYTmupDliJfooahcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXG59O1xuXG52YXIgcHJvTWFwID0ge1xuXHRteVN1YmplY3QgOiAn5oiR5Yib5bu655qEJyxcblx0bXlGb2xsb3cgOiAn5oiR5YWz5rOo55qEJyxcblx0bXlJbnZpdGVkIDogJ+mCgOivt+aIkeeahCcsXG5cdG9wZW4gOiAn5YWs5byA5Li76aKYJyxcblx0bXlBcmNoaXZlZCA6ICflvZLmoaPkuLvpopgnXG59XG5cbnZhciBTdWJqZWN0ID0ge307XG5cbm1vZHVsZS5leHBvcnRzID0gU3ViamVjdDtcblxuLyrlrprkuYnpgJrnlKjlj4LmlbAqL1xudmFyIHN0YXJ0ID0gMCxcblx0bGltaXQgPSAyMDtcblxuU3ViamVjdC5zZWFyY2ggPSBzdWJqZWN0TGlzdC5zZWFyY2g7XG5cblN1YmplY3QuY3JlYXRlID0gc3ViamVjdENyZWF0ZS5jcmVhdGU7XG5cblN1YmplY3QuaW5mbyA9IHN1YmplY3RJbmZvLmluZm87XG5cblN1YmplY3QuYXJlYSA9IGZ1bmN0aW9uKGRvbW5hbWUpe1xuXHR2YXIgcHJvTmFtZSA9IGRvbW5hbWUsXG5cdFx0ZG9tID0gJCgnIycrZG9tbmFtZSsnQmxvY2snKTtcblx0dGhpcy5wcm9OYW1lID0gZG9tbmFtZTtcblx0dGhpcy5kb20gPSBkb207XG5cdHRoaXMucGFnZSA9IDA7ICAgLy/lvIDlp4vpobXnoIFcblx0dGhpcy5hbGxQYWdlID0gMDtcblx0dGhpcy5saW1pdCA9IDU7IC8v5LiA6aG155qE5p2h5pWwXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7Ly8wIOaMieaXtumXtOaOkuW6jywxIOaMieabtOaWsOaXtumXtOaOkuW6j1xuXHR0aGlzLmxpc3REb207IC8v5YiX6KGo55qE5L2N572uXG5cdHZhciBodG1sID0gdG1wbC5hcmVhKHtcblx0XHRwcm9UZXh0IDogcHJvTWFwW2RvbW5hbWVdLFxuXHRcdHByb05hbWUgOiBkb21uYW1lXG5cdH0pO1xuXHRkb20uaHRtbChodG1sKTtcblx0dGhpcy5saXN0RG9tID0gJCgnIycrZG9tbmFtZSk7XG5cdHRoaXMubnVtRG9tID0gJChcIiNcIitkb21uYW1lKydOdW0nKTtcblx0dGhpcy5wcmVQYWdlID0gZG9tLmZpbmQoJy5wcmUtcGFnZScpO1xuXHR0aGlzLm5leHRQYWdlID0gZG9tLmZpbmQoJy5uZXh0LXBhZ2UnKTtcdFxuXHR0aGlzLnRpbWVEb20gPSBkb20uZmluZCgnLnRpbWUnKTtcblx0dGhpcy51cGRhdGVEb20gPSBkb20uZmluZCgnLnVwZGF0ZScpO1xuXHR0aGlzLmFsbE51bSA9IDA7XG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xuXG5cdHRoaXMuZ2V0RGF0ZSh7XG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcblx0fSk7XG5cblx0dGhpcy5iaW5kQWN0aW9uKCk7XG59XG5cbi8v5LiL5LiA6aG1XG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLnBhZ2UgPCB0aGlzLmFsbFBhZ2UtMSl7XG5cdFx0dGhpcy5wYWdlKys7XG5cdFx0dGhpcy5nZXREYXRlKHtcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxuXHRcdH0pO1x0XG5cdH1cbn1cblxuLy/kuIrkuIDpobVcblN1YmplY3QuYXJlYS5wcm90b3R5cGUucHJlID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5wYWdlID4gMCl7XG5cdFx0dGhpcy5wYWdlLS07XG5cdFx0dGhpcy5nZXREYXRlKHtcblx0XHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXG5cdFx0XHRsaW1pdCA6IHRoaXMubGltaXQsXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxuXHRcdH0pO1xuXHR9XG59XG5cbi8v5omT5byA5pS26LW3XG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oZSl7XG5cdGlmKHRoaXMubGlzdERvbS5oYXNDbGFzcygnaGlkZScpKXtcblx0XHR0aGlzLmxpc3REb20ucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcblx0fWVsc2V7XG5cdFx0dGhpcy5saXN0RG9tLmFkZENsYXNzKCdoaWRlJyk7XG5cdH1cbn1cblxuLy/mjInlj5Hooajml7bpl7TmjpLluo9cblN1YmplY3QuYXJlYS5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xuXHQvLyBvcmRlcmJ5OiB1cGRhdGVUaW1lIC8gY3JlYXRlVGltZVxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnO1xuXHR0aGlzLnRpbWVEb20uYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXHR0aGlzLnVwZGF0ZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG5cdHRoaXMuZ2V0RGF0ZSh7XG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcblx0fSk7XG59XG5cbi8v5oyJ5pu05paw5pe26Ze05o6S5bqPXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xuXHR0aGlzLnVwZGF0ZURvbS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cdHRoaXMudGltZURvbS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHRcblx0dGhpcy5nZXREYXRlKHtcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxuXHR9KTtcdFxufVxuXG4vL+aWsOW7uuS4u+mimFxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xuXHRpZighdGhpcy5jcmVhdGVTdWJqZWN0KXtcblx0XHR0aGlzLmNyZWF0ZVN1YmplY3QgPSB3aW5kb3cuc3RyaWtlci5jcmVhdGVTdWJqZWN0O1xuXHR9XG5cdGlmKCF0aGlzLmxhYmVsKXtcblx0XHR0aGlzLmxhYmVsID0gd2luZG93LnN0cmlrZXIubGFiZWw7XG5cdH1cblx0dGhpcy5jcmVhdGVTdWJqZWN0LmNoYW5nZVR5cGUodGhpcy5wcm9OYW1lKTtcblx0Ly90aGlzLmxhYmVsLmluaXQoKTtcbn1cblxuLy/liKTmlq3nv7vpobXmmK/lkKblj6/ku6Xngrnlh7tcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2hlY2tQYWdlID0gZnVuY3Rpb24oKXtcblx0aWYodGhpcy5wYWdlIDw9IDEpe1xuXHRcdHRoaXMucHJlUGFnZS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcblx0XHRpZih0aGlzLmFsbFBhZ2UgPT09IDEpe1xuXHRcdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLm5leHRQYWdlLnByb3Aoe2Rpc2FibGVkOmZhbHNlfSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XHRcblx0XHR9XG5cdFx0XG5cdH1lbHNlIGlmKHRoaXMucGFnZSA+PSB0aGlzLmFsbFBhZ2UtMSl7XG5cdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0aWYodGhpcy5hbGxQYWdlID09PSAxKXtcblx0XHRcdHRoaXMucHJlUGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG5cdFx0fWVsc2V7XG5cdFx0XHR0aGlzLnByZVBhZ2UucHJvcCh7ZGlzYWJsZWQ6ZmFsc2V9KS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcblx0XHR9XHRcdFxuXHR9XG59XG5cbi8v5L+u5pS55oC75pWwXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNoYW5nZU51bSA9IGZ1bmN0aW9uKG51bSl7XG5cdHRoaXMuYWxsUGFnZSA9IE1hdGguY2VpbChudW0vdGhpcy5saW1pdCk7XG5cdHRoaXMuYWxsTnVtID0gbnVtO1xuXHR0aGlzLm51bURvbS50ZXh0KG51bSk7XG59XG5cblN1YmplY3QuYXJlYS5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKHBhcmFtKXtcblx0aWYodGhpcy5sb2FkaW5nKXtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIF90aGlzID0gdGhpcztcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblxuXHR2YXIgZnVubmFtZSA9ICdzZWFyY2gnO1xuXHRpZih0aGlzLnByb05hbWUgPT09ICdteUZvbGxvdycpe1xuXHRcdGZ1bm5hbWUgPSAnZm9sbG93aW5nJztcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ215SW52aXRlJyl7XG5cdFx0ZnVubmFtZSA9ICdpbnZpdGVkJztcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ215QXJjaGl2ZWQnKXtcblx0XHRmdW5uYW1lID0gJ2FyY2hpdmVkJztcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ29wZW4nKXtcblx0XHRwYXJhbS5wcml2YXRlID0gMTtcblx0fVxuXG5cdGNnaVtmdW5uYW1lXShwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChyZXMuZGF0YSk7XG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XG5cdFx0XHRfdGhpcy5jaGFuZ2VOdW0ocmVzLmRhdGEudG90YWwpO1xuXHRcdFx0X3RoaXMuY2hlY2tQYWdlKCk7XG5cdFx0fVxuXHR9KTtcbn1cblxuLypcbuiAg+iZkeWIsOmmlumhtee7k+aehOeahOeJueauiuaApyzov5nph4zliIblnZfnu5Hlrprkuovku7ZcbiovXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xuXHRcdH1cblx0fSk7XHRcblxuXHRzdHJpa2VyLmJpbmQoJ3N1YmplY3RDcmVhdGVkJyxmdW5jdGlvbigpe1xuXHRcdGlmKCdteVN1YmplY3QnID09PSBfdGhpcy5wcm9OYW1lKXtcblx0XHRcdF90aGlzLmFsbE51bSsrO1xuXHRcdFx0X3RoaXMuY2hhbmdlTnVtKF90aGlzLmFsbE51bSk7XG5cdFx0fVxuXHR9KTtcbn1cblxuU3ViamVjdC5pbml0ID0gZnVuY3Rpb24odHlwZSl7XG5cdHN1YmplY3RMaXN0LmluaXQodHlwZSxjZ2ksdG1wbCk7XG5cdHN1YmplY3RJbmZvLmluaXQodHlwZSxjZ2ksdG1wbCk7XG5cdHN1YmplY3RDcmVhdGUuaW5pdCh0eXBlLGNnaSx0bXBsKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcbnZhciB0bXBsID0ge1xuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcblx0dG9wIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvdG9wLmVqcycpLFxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcbn07XG5cbnZhciBhcnRpY2xlTGlzdCA9IHJlcXVpcmUoJy4vbGlzdCcpLFxuXHRhcnRpY2xlUG9zdCA9IHJlcXVpcmUoJy4vcG9zdCcpO1xuXG52YXIgQXJ0aWNsZSA9IHt9XG5cbm1vZHVsZS5leHBvcnRzID0gQXJ0aWNsZTtcblxuQXJ0aWNsZS5saXN0ID0gYXJ0aWNsZUxpc3QuYXJ0aWNsZTtcblxuLy8gQXJ0aWNsZS5sb2FkTW9yZSA9IGFydGljbGVMaXN0LmxvYWRNb3JlO1xuXG5BcnRpY2xlLmFwcGVuZFRvTGlzdCA9IGFydGljbGVMaXN0LnByZXBlbmRUb0xpc3Q7XG5cbi8vQXJ0aWNsZS5wb3N0ID0gYXJ0aWNsZVBvc3QuY3JlYXRlO1xuXG4vL0FydGljbGUucmVzZXQgPSBhcnRpY2xlUG9zdC5yZXNldDtcblxuLyoqL1xuXG5BcnRpY2xlLmluaXQgPSBmdW5jdGlvbihpZCl7XG5cdGFydGljbGVMaXN0LmluaXQoaWQsY2dpLHRtcGwpO1xuXHRhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvYXJ0aWNsZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXG5cdG1lc3NhZ2UgPSByZXF1aXJlKCcuL21zZycpO1xuXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xuXG52YXIgY2dpUGF0aCA9ICcvY2dpLyc7XG52YXIgY2dpTGlzdCA9IHtcblx0dXNlciA6IHtcblx0XHRsaXN0IDogY2dpUGF0aCsndXNlci9saXN0Jyxcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKyd1c2VyL2NyZWF0ZSdcblx0fSxcblx0c3ViamVjdCA6IHtcblx0XHRsaXN0IDogY2dpUGF0aCsnc3ViamVjdC9saXN0JywgLy8g5oiR55qE5YiX6KGoXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnc3ViamVjdC9zZWFyY2gnLFxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxuXHRcdGVkaXQgOiBjZ2lQYXRoKydzdWJqZWN0L2VkaXQnLCAvL+S/ruaUueS4u+mimFxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcblx0XHRmb2xsb3cgOiBjZ2lQYXRoKydzdWJqZWN0L2ZvbGxvdycsIC8v5YWz5rOoXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxuXHRcdGFyY2hpdmVkIDogY2dpUGF0aCsnc3ViamVjdC9hcmNoaXZlZCcsIC8v5YWz5rOo5YiX6KGoXG5cdFx0YXJjaGl2ZSA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZScsIC8v5YWz5rOo5YiX6KGoXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXG5cdH0sXG5cdGFydGljbGUgOiB7XG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxuXHRcdGluZm8gOiBjZ2lQYXRoKydhcnRpY2xlL2luZm8nLFxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXJpbmcnLCAvL+i1nueahOW4luWtkFxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcblx0XHRlZGl0IDogY2dpUGF0aCsnYXJ0aWNsZS9lZGl0Jyxcblx0XHRzdGFyIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyJywgLy/otZ5cblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2FydGljbGUvZGVsZXRlJywgLy/mlLbol49cblx0XHQnc2V0dG9wJyA6IGNnaVBhdGgrJ2FydGljbGUvc2V0VG9wJywgLy/mlLbol49cblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydhcnRpY2xlL2NyZWF0ZSdcblx0fSxcblx0Y29tbWVudCA6IHtcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydjb21tZW50L3NlYXJjaCcsXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0ZWQnLFxuXHRcdHN0YXIgOiBjZ2lQYXRoKydjb21tZW50L3N0YXInLFxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnY29tbWVudC9kZWxldGUnLFxuXHRcdGVkaXQgOiBjZ2lQYXRoKydjb21tZW50L2VkaXQnLFxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3QnLFxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xuXHR9LFxuXHRub3RpZnkgOiB7XG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3NlYXJjaCcsXG5cdFx0cmVhZCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9yZWFkJyxcblx0fSxcblx0bGFiZWwgOiB7XG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnbGFiZWwvY3JlYXRlJyxcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcblx0fSxcblx0bG9naW4gOiBjZ2lQYXRoKydhY2NvdW50L2xvZ2luJyxcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXG59XG5cbnZhciBkYiA9IHt9O1xudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcbn1cbi8vIC/nu5/kuIDlh7rmnaXlvLnlh7rmtojmga9cbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XG5cdHJldHVybiBmdW5jdGlvbihyZXMpe1xuXHRcdGNiKHJlcyk7XG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcblx0XHR9ZWxzZSBpZihmbGFnKXtcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XG5cdFx0fVxuXHR9XG59XG5cbmRiLmxvZ2luID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihjYWxsYmFjayl7XG5cblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ291dCx7fSxjYWxsYmFjayk7XG59XG5cbmRiLnVzZXIgPSB7fTtcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5saXN0LG51bGwsY2FsbGJhY2spO1xufVxuXG5kYi51c2VyLmluZm8gPSBmdW5jdGlvbihjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuaW5mbyxudWxsLGNhbGxiYWNrKTtcdFxufVxuXG4vL+ebtOaOpeaLieaJgOacieeUqOaItz9cbmRiLnVzZXIuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuc3ViamVjdCA9IHt9O1xuXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5zdWJqZWN0Lmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QubGlzdCxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLnN1YmplY3QuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuc3ViamVjdFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLnN1YmplY3QuZm9sbG93ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmZvbGxvdyxwYXJhbSxjYWxsYmFjayk7XHRcbn1cblxuZGIuc3ViamVjdC5mb2xsb3dpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxufVxuXG5kYi5zdWJqZWN0Lmludml0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW52aXRlZCxwYXJhbSxjYWxsYmFjayk7XHRcbn1cblxuZGIuc3ViamVjdC5hcmNoaXZlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlZCxwYXJhbSxjYWxsYmFjayk7XHRcbn1cblxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcdFxufVxuXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmRlbHJlc291cmNlLHBhcmFtLGNhbGxiYWNrKTtcdFxufVxuXG5kYi5hcnRpY2xlID0ge307XG5cbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLmFydGljbGUuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuYXJ0aWNsZS5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuYXJ0aWNsZS5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xufVxuZGIuYXJ0aWNsZS5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmVkaXQscGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5hcnRpY2xlWydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZVsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5hcnRpY2xlLnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc3RhcixwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLmFydGljbGUuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuYXJ0aWNsZS5zZXR0b3AgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc2V0dG9wLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuY29tbWVudCA9IHt9O1xuXG5kYi5jb21tZW50LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xufVxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xufVxuZGIuY29tbWVudC5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuY29tbWVudFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnRbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIuY29tbWVudC5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LnN0YXIscGFyYW0sY2FsbGJhY2spO1xufVxuXG5kYi5jb21tZW50LmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XG59XG5cbmRiLmNvbW1lbnQuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcbn1cblxuZGIubm90aWZ5ID0ge307XG5cbmRiLm5vdGlmeS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LmdldChjZ2lMaXN0Lm5vdGlmeS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1x0XHRcbn1cblxuZGIubm90aWZ5LnJlYWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5ub3RpZnkucmVhZCxwYXJhbSxjYWxsYmFjayk7XHRcdFxufVxuXG5kYi5sYWJlbCA9IHt9O1xuXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sYWJlbC5jcmVhdGUsIHBhcmFtLCBjYWxsYmFjayk7XHRcbn1cblxuZGIubGFiZWwubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIERhdGEgPSB7fTtcbi8qXG7mlbDmja7nvJPlrZhcbnVzZXIg55So5oi3XG5zdWJqZWN0IOS4u+mimFxuYXJ0aWNsZSDluJblrZBcbiovXG5EYXRhLnVzZXIgPSB7fTtcbkRhdGEuc3ViamVjdCA9IHt9O1xuRGF0YS5hcnRpY2xlID0ge307XG5EYXRhLmxhYmVsID0ge307XG5cbmZ1bmN0aW9uIGdldERhdGEodHlwZSxrZXkpe1xuXHRyZXR1cm4gRGF0YVt0eXBlXVtrZXldIHx8IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2RhdGEvZGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/nlKjmiLfliJfooajmmL7npLrnrYnnrYlcbnZhciB1TWFuYWdlID0ge30sXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyO1xudmFyIGNnaSxcblx0dG1wbCxcblx0bWFuYWdlSGF2ZSA9IGZhbHNlO1xubW9kdWxlLmV4cG9ydHMgPSB1TWFuYWdlO1xuXG52YXIgbWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcblx0Ly/nu5nlrprljLrln59kb23nmoTlkI3lrZdcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XG5cdHRoaXMubWFuYWdlSGF2ZSA9IGZhbHNlO1xuXHQvL+eUqOaIt+WIl+ihqFxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcblx0dGhpcy5zZWxlY3REb20gPSB0aGlzLmRvbS5maW5kKCcubm93LW1hbmFnZS1saXN0Jyk7XG5cdC8v5pCc57Si5qGGXG5cdHRoaXMua2V5RG9tO1xuXG5cdC8v5b2T5YmN5YWD57SgXG5cdHRoaXMuX3NlbGVjdERvbTtcblxuXHQvL+mAieS4reeahOeuoeeQhuWRmOWIl+ihqFxuXHR0aGlzLmlkbWFwID0ge307XG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcblxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXG5cdH0pO1xuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XG5cblxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcdFxuXG59XG5cbi8v5Yid5aeL5YyW5LiA5LiLLlxubWFuYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcblxufVxuXG4vL+aYvuekuueuoeeQhuWRmOWIl+ihqFxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cblx0aWYoIXRoaXMubWFuYWdlSGF2ZSl7XG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxuXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xuXHRcdH0pO1xuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xuXHRcdHRoaXMua2V5RG9tID0gdGhpcy5saXN0RG9tLmZpbmQoJ2lucHV0W25hbWU9bWFuYWdla2V5XScpO1xuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcblx0fVxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XG5cdFx0dGhpcy5saXN0RG9tLnNob3coKTtcblx0fWVsc2V7XG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcblx0XHR0aGlzLmxpc3REb20uaGlkZSgpO1xuXHR9XHRcbn1cblxuLy/lop7liqDnrqHnkIblkZhcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcblx0XG59XG5cbm1hbmFnZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XG5cdHZhciBsaXN0ID0gW107XG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcblx0XHRsaXN0LnB1c2goaSk7XG5cdH1cblxuXHRyZXR1cm4gbGlzdDtcbn1cblxuLy/muIXnqbrliJfooahcbm1hbmFnZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xuXHR0aGlzLmlkbWFwID0ge307XG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcblxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXG5cdH0pO1xuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XG5cblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xuXHR0aGlzLmxpc3REb20uaGlkZSgpO1x0XG59XG5cbi8v6YCJ5Lit5LiA5Liq55So5oi3XG5tYW5hZ2UucHJvdG90eXBlLnNlbGVjdG9uZSA9IGZ1bmN0aW9uKGUpe1xuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcblx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcblxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xuXHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xuXHRcdFx0aWQgOiBpZCxcblx0XHRcdG5hbWUgOiBuYW1lXG5cdFx0fSk7XG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcblx0fVxuXHRcbn1cblxuLy/mkJzntKLmjInpkq5cbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcblx0dmFyIGtleSA9IHRoaXMua2V5RG9tLnZhbCgpO1xuXHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcblx0dmFyIHVsaXN0ID0gW107XG5cblx0aWYoa2V5ID09PSAnJyl7XG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcblx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XG5cdFx0fVxuXHR9XG5cdHRoaXMubGlzdERvbS5maW5kKCdsaScpLmhpZGUoKTtcblx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xuXHRcdHJldHVybjtcblx0fVxuXHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XG5cdH1cbn1cblxuLy/liKDpmaTkuIDkuKrpgInkuK3nmoTnrqHnkIblkZhcbm1hbmFnZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgnLnRhZycpLFxuXHRcdGlkID0gcC5kYXRhKCdpZCcpO1xuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xuXHRcdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcblx0XHRwLnJlbW92ZSgpO1xuXHR9XG59XG5cbi8v5LqL5Lu257uR5a6aXG5tYW5hZ2UucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XG5cblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xuXHRcdH1cblx0fSk7XG59XG5cbi8v6L6T5YWl5qGG55qEa2V5dXDnu5Hlrppcbm1hbmFnZS5wcm90b3R5cGUua2V5dXBBY3Rpb24gPSBmdW5jdGlvbigpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XG5cblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xuXHRcdH1cblx0fSk7XG59XG5cbnVNYW5hZ2UubWFuYWdlID0gbWFuYWdlO1xudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XG5cdGNnaSA9IG1vZHVsZTtcblx0dG1wbCA9IHRtcDtcblxuXHQvL2JpbmRBY3Rpb24oKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvKipcbiAqIEBmaWxlb3ZlcnZpZXcgTWFpbiBmdW5jdGlvbiBzcmMuXG4gKi9cblxuLy8gSFRNTDUgU2hpdi4gTXVzdCBiZSBpbiA8aGVhZD4gdG8gc3VwcG9ydCBvbGRlciBicm93c2Vycy5cbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHJhY2snKTtcblxuLyoqXG4gKiBEb3VibGVzIGFzIHRoZSBtYWluIGZ1bmN0aW9uIGZvciB1c2VycyB0byBjcmVhdGUgYSBwbGF5ZXIgaW5zdGFuY2UgYW5kIGFsc29cbiAqIHRoZSBtYWluIGxpYnJhcnkgb2JqZWN0LlxuICpcbiAqICoqQUxJQVNFUyoqIHZpZGVvanMsIF9WXyAoZGVwcmVjYXRlZClcbiAqXG4gKiBUaGUgYHZqc2AgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZSBvciByZXRyaWV2ZSBhIHBsYXllci5cbiAqXG4gKiAgICAgdmFyIG15UGxheWVyID0gdmpzKCdteV92aWRlb19pZCcpO1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ3xFbGVtZW50fSBpZCAgICAgIFZpZGVvIGVsZW1lbnQgb3IgdmlkZW8gZWxlbWVudCBJRFxuICogQHBhcmFtICB7T2JqZWN0PX0gb3B0aW9ucyAgICAgICAgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZy9zZXR0aW5nc1xuICogQHBhcmFtICB7RnVuY3Rpb249fSByZWFkeSAgICAgICAgT3B0aW9uYWwgcmVhZHkgY2FsbGJhY2tcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgICAgICAgICAgIEEgcGxheWVyIGluc3RhbmNlXG4gKiBAbmFtZXNwYWNlXG4gKi9cbnZhciB2anMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgcmVhZHkpe1xuICB2YXIgdGFnOyAvLyBFbGVtZW50IG9mIElEXG5cbiAgLy8gQWxsb3cgZm9yIGVsZW1lbnQgb3IgSUQgdG8gYmUgcGFzc2VkIGluXG4gIC8vIFN0cmluZyBJRFxuICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuXG4gICAgLy8gQWRqdXN0IGZvciBqUXVlcnkgSUQgc3ludGF4XG4gICAgaWYgKGlkLmluZGV4T2YoJyMnKSA9PT0gMCkge1xuICAgICAgaWQgPSBpZC5zbGljZSgxKTtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHBsYXllciBpbnN0YW5jZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQgZm9yIHRoaXMgSUQgcmV0dXJuIGl0LlxuICAgIGlmICh2anMucGxheWVyc1tpZF0pIHtcbiAgICAgIHJldHVybiB2anMucGxheWVyc1tpZF07XG5cbiAgICAvLyBPdGhlcndpc2UgZ2V0IGVsZW1lbnQgZm9yIElEXG4gICAgfSBlbHNlIHtcbiAgICAgIHRhZyA9IHZqcy5lbChpZCk7XG4gICAgfVxuXG4gIC8vIElEIGlzIGEgbWVkaWEgZWxlbWVudFxuICB9IGVsc2Uge1xuICAgIHRhZyA9IGlkO1xuICB9XG5cbiAgLy8gQ2hlY2sgZm9yIGEgdXNlYWJsZSBlbGVtZW50XG4gIGlmICghdGFnIHx8ICF0YWcubm9kZU5hbWUpIHsgLy8gcmU6IG5vZGVOYW1lLCBjb3VsZCBiZSBhIGJveCBkaXYgYWxzb1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBlbGVtZW50IG9yIElEIHN1cHBsaWVkIGlzIG5vdCB2YWxpZC4gKHZpZGVvanMpJyk7IC8vIFJldHVybnNcbiAgfVxuXG4gIC8vIEVsZW1lbnQgbWF5IGhhdmUgYSBwbGF5ZXIgYXR0ciByZWZlcnJpbmcgdG8gYW4gYWxyZWFkeSBjcmVhdGVkIHBsYXllciBpbnN0YW5jZS5cbiAgLy8gSWYgbm90LCBzZXQgdXAgYSBuZXcgcGxheWVyIGFuZCByZXR1cm4gdGhlIGluc3RhbmNlLlxuICByZXR1cm4gdGFnWydwbGF5ZXInXSB8fCBuZXcgdmpzLlBsYXllcih0YWcsIG9wdGlvbnMsIHJlYWR5KTtcbn07XG5cbi8vIEV4dGVuZGVkIG5hbWUsIGFsc28gYXZhaWxhYmxlIGV4dGVybmFsbHksIHdpbmRvdy52aWRlb2pzXG52YXIgdmlkZW9qcyA9IHZqcztcbndpbmRvdy52aWRlb2pzID0gd2luZG93LnZqcyA9IHZqcztcblxuLy8gQ0ROIFZlcnNpb24uIFVzZWQgdG8gdGFyZ2V0IHJpZ2h0IGZsYXNoIHN3Zi5cbnZqcy5DRE5fVkVSU0lPTiA9ICc0LjMnO1xudmpzLkFDQ0VTU19QUk9UT0NPTCA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovLycgOiAnaHR0cDovLycpO1xuXG4vKipcbiAqIEdsb2JhbCBQbGF5ZXIgaW5zdGFuY2Ugb3B0aW9ucywgc3VyZmFjZWQgZnJvbSB2anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zX1xuICogdmpzLm9wdGlvbnMgPSB2anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zX1xuICogQWxsIG9wdGlvbnMgc2hvdWxkIHVzZSBzdHJpbmcga2V5cyBzbyB0aGV5IGF2b2lkXG4gKiByZW5hbWluZyBieSBjbG9zdXJlIGNvbXBpbGVyXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG52anMub3B0aW9ucyA9IHtcbiAgLy8gRGVmYXVsdCBvcmRlciBvZiBmYWxsYmFjayB0ZWNobm9sb2d5XG4gICd0ZWNoT3JkZXInOiBbJ2h0bWw1JywnZmxhc2gnXSxcbiAgLy8gdGVjaE9yZGVyOiBbJ2ZsYXNoJywnaHRtbDUnXSxcblxuICAnaHRtbDUnOiB7fSxcbiAgJ2ZsYXNoJzoge30sXG5cbiAgLy8gRGVmYXVsdCBvZiB3ZWIgYnJvd3NlciBpcyAzMDB4MTUwLiBTaG91bGQgcmVseSBvbiBzb3VyY2Ugd2lkdGgvaGVpZ2h0LlxuICAnd2lkdGgnOiAzMDAsXG4gICdoZWlnaHQnOiAxNTAsXG4gIC8vIGRlZmF1bHRWb2x1bWU6IDAuODUsXG4gICdkZWZhdWx0Vm9sdW1lJzogMC4wMCwgLy8gVGhlIGZyZWFraW4gc2VhZ3VscyBhcmUgZHJpdmluZyBtZSBjcmF6eSFcblxuICAvLyBJbmNsdWRlZCBjb250cm9sIHNldHNcbiAgJ2NoaWxkcmVuJzoge1xuICAgICdtZWRpYUxvYWRlcic6IHt9LFxuICAgICdwb3N0ZXJJbWFnZSc6IHt9LFxuICAgICd0ZXh0VHJhY2tEaXNwbGF5Jzoge30sXG4gICAgJ2xvYWRpbmdTcGlubmVyJzoge30sXG4gICAgJ2JpZ1BsYXlCdXR0b24nOiB7fSxcbiAgICAnY29udHJvbEJhcic6IHt9XG4gIH0sXG5cbiAgLy8gRGVmYXVsdCBtZXNzYWdlIHRvIHNob3cgd2hlbiBhIHZpZGVvIGNhbm5vdCBiZSBwbGF5ZWQuXG4gICdub3RTdXBwb3J0ZWRNZXNzYWdlJzogJ1NvcnJ5LCBubyBjb21wYXRpYmxlIHNvdXJjZSBhbmQgcGxheWJhY2sgJyArXG4gICAgICAndGVjaG5vbG9neSB3ZXJlIGZvdW5kIGZvciB0aGlzIHZpZGVvLiBUcnkgdXNpbmcgYW5vdGhlciBicm93c2VyICcgK1xuICAgICAgJ2xpa2UgPGEgaHJlZj1cImh0dHA6Ly9iaXQubHkvY2NNVUVDXCI+Q2hyb21lPC9hPiBvciBkb3dubG9hZCB0aGUgJyArXG4gICAgICAnbGF0ZXN0IDxhIGhyZWY9XCJodHRwOi8vYWRvYmUubHkvbXdmTjFcIj5BZG9iZSBGbGFzaCBQbGF5ZXI8L2E+Lidcbn07XG5cbi8vIFNldCBDRE4gVmVyc2lvbiBvZiBzd2Zcbi8vIFRoZSBhZGRlZCAoKykgYmxvY2tzIHRoZSByZXBsYWNlIGZyb20gY2hhbmdpbmcgdGhpcyA0LjMgc3RyaW5nXG5pZiAodmpzLkNETl9WRVJTSU9OICE9PSAnR0VORVJBVEVEJysnX0NETl9WU04nKSB7XG4gIHZpZGVvanMub3B0aW9uc1snZmxhc2gnXVsnc3dmJ10gPSB2anMuQUNDRVNTX1BST1RPQ09MICsgJ3Zqcy56ZW5jZG4ubmV0LycrdmpzLkNETl9WRVJTSU9OKycvdmlkZW8tanMuc3dmJztcbn1cblxuLyoqXG4gKiBHbG9iYWwgcGxheWVyIGxpc3RcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbnZqcy5wbGF5ZXJzID0ge307XG4vKipcbiAqIENvcmUgT2JqZWN0L0NsYXNzIGZvciBvYmplY3RzIHRoYXQgdXNlIGluaGVyaXRhbmNlICsgY29udHN0cnVjdG9yc1xuICpcbiAqIFRvIGNyZWF0ZSBhIGNsYXNzIHRoYXQgY2FuIGJlIHN1YmNsYXNzZWQgaXRzZWxmLCBleHRlbmQgdGhlIENvcmVPYmplY3QgY2xhc3MuXG4gKlxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCgpO1xuICogICAgIHZhciBIb3JzZSA9IEFuaW1hbC5leHRlbmQoKTtcbiAqXG4gKiBUaGUgY29uc3RydWN0b3IgY2FuIGJlIGRlZmluZWQgdGhyb3VnaCB0aGUgaW5pdCBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgYXJndW1lbnQuXG4gKlxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCh7XG4gKiAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lLCBzb3VuZCl7XG4gKiAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gKiAgICAgICB9XG4gKiAgICAgfSk7XG4gKlxuICogT3RoZXIgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBjYW4gYmUgYWRkZWQgdGhlIHNhbWUgd2F5LCBvciBkaXJlY3RseSB0byB0aGVcbiAqIHByb3RvdHlwZS5cbiAqXG4gKiAgICB2YXIgQW5pbWFsID0gQ29yZU9iamVjdC5leHRlbmQoe1xuICogICAgICAgaW5pdDogZnVuY3Rpb24obmFtZSl7XG4gKiAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gKiAgICAgICB9LFxuICogICAgICAgZ2V0TmFtZTogZnVuY3Rpb24oKXtcbiAqICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcbiAqICAgICAgIH0sXG4gKiAgICAgICBzb3VuZDogJy4uLidcbiAqICAgIH0pO1xuICpcbiAqICAgIEFuaW1hbC5wcm90b3R5cGUubWFrZVNvdW5kID0gZnVuY3Rpb24oKXtcbiAqICAgICAgYWxlcnQodGhpcy5zb3VuZCk7XG4gKiAgICB9O1xuICpcbiAqIFRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLCB1c2UgdGhlIGNyZWF0ZSBtZXRob2QuXG4gKlxuICogICAgdmFyIGZsdWZmeSA9IEFuaW1hbC5jcmVhdGUoJ0ZsdWZmeScpO1xuICogICAgZmx1ZmZ5LmdldE5hbWUoKTsgLy8gLT4gRmx1ZmZ5XG4gKlxuICogTWV0aG9kcyBhbmQgcHJvcGVydGllcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzLlxuICpcbiAqICAgICB2YXIgSG9yc2UgPSBBbmltYWwuZXh0ZW5kKHtcbiAqICAgICAgIHNvdW5kOiAnTmVpZ2hoaGhoISdcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgdmFyIGhvcnNleSA9IEhvcnNlLmNyZWF0ZSgnSG9yc2V5Jyk7XG4gKiAgICAgaG9yc2V5LmdldE5hbWUoKTsgLy8gLT4gSG9yc2V5XG4gKiAgICAgaG9yc2V5Lm1ha2VTb3VuZCgpOyAvLyAtPiBBbGVydDogTmVpZ2hoaGhoIVxuICpcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5Db3JlT2JqZWN0ID0gdmpzWydDb3JlT2JqZWN0J10gPSBmdW5jdGlvbigpe307XG4vLyBNYW51YWxseSBleHBvcnRpbmcgdmpzWydDb3JlT2JqZWN0J10gaGVyZSBmb3IgQ2xvc3VyZSBDb21waWxlclxuLy8gYmVjYXVzZSBvZiB0aGUgdXNlIG9mIHRoZSBleHRlbmQvY3JlYXRlIGNsYXNzIG1ldGhvZHNcbi8vIElmIHdlIGRpZG4ndCBkbyB0aGlzLCB0aG9zZSBmdW5jdGlvbnMgd291bGQgZ2V0IGZsYXR0ZW5kIHRvIHNvbWV0aGluZyBsaWtlXG4vLyBgYSA9IC4uLmAgYW5kIGB0aGlzLnByb3RvdHlwZWAgd291bGQgcmVmZXIgdG8gdGhlIGdsb2JhbCBvYmplY3QgaW5zdGVhZCBvZlxuLy8gQ29yZU9iamVjdFxuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgT2JqZWN0XG4gKlxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCgpO1xuICogICAgIHZhciBIb3JzZSA9IEFuaW1hbC5leHRlbmQoKTtcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgRnVuY3Rpb25zIGFuZCBwcm9wZXJ0aWVzIHRvIGJlIGFwcGxpZWQgdG8gdGhlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgbmV3IG9iamVjdCdzIHByb3RvdHlwZVxuICogQHJldHVybiB7dmpzLkNvcmVPYmplY3R9IEFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gQ29yZU9iamVjdFxuICogQHRoaXMgeyp9XG4gKi9cbnZqcy5Db3JlT2JqZWN0LmV4dGVuZCA9IGZ1bmN0aW9uKHByb3BzKXtcbiAgdmFyIGluaXQsIHN1Yk9iajtcblxuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAvLyBTZXQgdXAgdGhlIGNvbnN0cnVjdG9yIHVzaW5nIHRoZSBzdXBwbGllZCBpbml0IG1ldGhvZFxuICAvLyBvciB1c2luZyB0aGUgaW5pdCBvZiB0aGUgcGFyZW50IG9iamVjdFxuICAvLyBNYWtlIHN1cmUgdG8gY2hlY2sgdGhlIHVub2JmdXNjYXRlZCB2ZXJzaW9uIGZvciBleHRlcm5hbCBsaWJzXG4gIGluaXQgPSBwcm9wc1snaW5pdCddIHx8IHByb3BzLmluaXQgfHwgdGhpcy5wcm90b3R5cGVbJ2luaXQnXSB8fCB0aGlzLnByb3RvdHlwZS5pbml0IHx8IGZ1bmN0aW9uKCl7fTtcbiAgLy8gSW4gUmVzaWcncyBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2UgKHByZXZpb3VzbHkgdXNlZCkgdGhlIGNvbnN0cnVjdG9yXG4gIC8vICBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FsbHMgYHRoaXMuaW5pdC5hcHBseShhcmd1bWVudHMpYFxuICAvLyBIb3dldmVyIHRoYXQgd291bGQgcHJldmVudCB1cyBmcm9tIHVzaW5nIGBQYXJlbnRPYmplY3QuY2FsbCh0aGlzKTtgXG4gIC8vICBpbiBhIENoaWxkIGNvbnN0dWN0b3IgYmVjYXVzZSB0aGUgYHRoaXNgIGluIGB0aGlzLmluaXRgXG4gIC8vICB3b3VsZCBzdGlsbCByZWZlciB0byB0aGUgQ2hpbGQgYW5kIGNhdXNlIGFuIGluaWZpbml0ZSBsb29wLlxuICAvLyBXZSB3b3VsZCBpbnN0ZWFkIGhhdmUgdG8gZG9cbiAgLy8gICAgYFBhcmVudE9iamVjdC5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bW5lbnRzKTtgXG4gIC8vICBCbGVoLiBXZSdyZSBub3QgY3JlYXRpbmcgYSBfc3VwZXIoKSBmdW5jdGlvbiwgc28gaXQncyBnb29kIHRvIGtlZXBcbiAgLy8gIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgcmVmZXJlbmNlIHNpbXBsZS5cbiAgc3ViT2JqID0gZnVuY3Rpb24oKXtcbiAgICBpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG5cbiAgLy8gSW5oZXJpdCBmcm9tIHRoaXMgb2JqZWN0J3MgcHJvdG90eXBlXG4gIHN1Yk9iai5wcm90b3R5cGUgPSB2anMub2JqLmNyZWF0ZSh0aGlzLnByb3RvdHlwZSk7XG4gIC8vIFJlc2V0IHRoZSBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBmb3Igc3ViT2JqIG90aGVyd2lzZVxuICAvLyBpbnN0YW5jZXMgb2Ygc3ViT2JqIHdvdWxkIGhhdmUgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwYXJlbnQgT2JqZWN0XG4gIHN1Yk9iai5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJPYmo7XG5cbiAgLy8gTWFrZSB0aGUgY2xhc3MgZXh0ZW5kYWJsZVxuICBzdWJPYmouZXh0ZW5kID0gdmpzLkNvcmVPYmplY3QuZXh0ZW5kO1xuICAvLyBNYWtlIGEgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGluc3RhbmNlc1xuICBzdWJPYmouY3JlYXRlID0gdmpzLkNvcmVPYmplY3QuY3JlYXRlO1xuXG4gIC8vIEV4dGVuZCBzdWJPYmoncyBwcm90b3R5cGUgd2l0aCBmdW5jdGlvbnMgYW5kIG90aGVyIHByb3BlcnRpZXMgZnJvbSBwcm9wc1xuICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBzdWJPYmoucHJvdG90eXBlW25hbWVdID0gcHJvcHNbbmFtZV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1Yk9iajtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhY2Ugb2YgdGhpcyBPYmplY3QgY2xhc3NcbiAqXG4gKiAgICAgdmFyIG15QW5pbWFsID0gQW5pbWFsLmNyZWF0ZSgpO1xuICpcbiAqIEByZXR1cm4ge3Zqcy5Db3JlT2JqZWN0fSBBbiBpbnN0YW5jZSBvZiBhIENvcmVPYmplY3Qgc3ViY2xhc3NcbiAqIEB0aGlzIHsqfVxuICovXG52anMuQ29yZU9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbigpe1xuICAvLyBDcmVhdGUgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdCdzIHByb3RvdHlwZVxuICB2YXIgaW5zdCA9IHZqcy5vYmouY3JlYXRlKHRoaXMucHJvdG90eXBlKTtcblxuICAvLyBBcHBseSB0aGlzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIHRoZSBuZXcgb2JqZWN0XG4gIHRoaXMuYXBwbHkoaW5zdCwgYXJndW1lbnRzKTtcblxuICAvLyBSZXR1cm4gdGhlIG5ldyBvYmplY3RcbiAgcmV0dXJuIGluc3Q7XG59O1xuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEV2ZW50IFN5c3RlbSAoSm9obiBSZXNpZyAtIFNlY3JldHMgb2YgYSBKUyBOaW5qYSBodHRwOi8vanNuaW5qYS5jb20vKVxuICogKE9yaWdpbmFsIGJvb2sgdmVyc2lvbiB3YXNuJ3QgY29tcGxldGVseSB1c2FibGUsIHNvIGZpeGVkIHNvbWUgdGhpbmdzIGFuZCBtYWRlIENsb3N1cmUgQ29tcGlsZXIgY29tcGF0aWJsZSlcbiAqIFRoaXMgc2hvdWxkIHdvcmsgdmVyeSBzaW1pbGFybHkgdG8galF1ZXJ5J3MgZXZlbnRzLCBob3dldmVyIGl0J3MgYmFzZWQgb2ZmIHRoZSBib29rIHZlcnNpb24gd2hpY2ggaXNuJ3QgYXNcbiAqIHJvYnVzdCBhcyBqcXVlcnkncywgc28gdGhlcmUncyBwcm9iYWJseSBzb21lIGRpZmZlcmVuY2VzLlxuICovXG5cbi8qKlxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGVsZW1lbnRcbiAqIEl0IHN0b3JlcyB0aGUgaGFuZGxlciBmdW5jdGlvbiBpbiBhIHNlcGFyYXRlIGNhY2hlIG9iamVjdFxuICogYW5kIGFkZHMgYSBnZW5lcmljIGhhbmRsZXIgdG8gdGhlIGVsZW1lbnQncyBldmVudCxcbiAqIGFsb25nIHdpdGggYSB1bmlxdWUgaWQgKGd1aWQpIHRvIHRoZSBlbGVtZW50LlxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9ICAgZWxlbSBFbGVtZW50IG9yIG9iamVjdCB0byBiaW5kIGxpc3RlbmVycyB0b1xuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgVHlwZSBvZiBldmVudCB0byBiaW5kIHRvLlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgRXZlbnQgbGlzdGVuZXIuXG4gKiBAcHJpdmF0ZVxuICovXG52anMub24gPSBmdW5jdGlvbihlbGVtLCB0eXBlLCBmbil7XG4gIHZhciBkYXRhID0gdmpzLmdldERhdGEoZWxlbSk7XG5cbiAgLy8gV2UgbmVlZCBhIHBsYWNlIHRvIHN0b3JlIGFsbCBvdXIgaGFuZGxlciBkYXRhXG4gIGlmICghZGF0YS5oYW5kbGVycykgZGF0YS5oYW5kbGVycyA9IHt9O1xuXG4gIGlmICghZGF0YS5oYW5kbGVyc1t0eXBlXSkgZGF0YS5oYW5kbGVyc1t0eXBlXSA9IFtdO1xuXG4gIGlmICghZm4uZ3VpZCkgZm4uZ3VpZCA9IHZqcy5ndWlkKys7XG5cbiAgZGF0YS5oYW5kbGVyc1t0eXBlXS5wdXNoKGZuKTtcblxuICBpZiAoIWRhdGEuZGlzcGF0Y2hlcikge1xuICAgIGRhdGEuZGlzYWJsZWQgPSBmYWxzZTtcblxuICAgIGRhdGEuZGlzcGF0Y2hlciA9IGZ1bmN0aW9uIChldmVudCl7XG5cbiAgICAgIGlmIChkYXRhLmRpc2FibGVkKSByZXR1cm47XG4gICAgICBldmVudCA9IHZqcy5maXhFdmVudChldmVudCk7XG5cbiAgICAgIHZhciBoYW5kbGVycyA9IGRhdGEuaGFuZGxlcnNbZXZlbnQudHlwZV07XG5cbiAgICAgIGlmIChoYW5kbGVycykge1xuICAgICAgICAvLyBDb3B5IGhhbmRsZXJzIHNvIGlmIGhhbmRsZXJzIGFyZSBhZGRlZC9yZW1vdmVkIGR1cmluZyB0aGUgcHJvY2VzcyBpdCBkb2Vzbid0IHRocm93IGV2ZXJ5dGhpbmcgb2ZmLlxuICAgICAgICB2YXIgaGFuZGxlcnNDb3B5ID0gaGFuZGxlcnMuc2xpY2UoMCk7XG5cbiAgICAgICAgZm9yICh2YXIgbSA9IDAsIG4gPSBoYW5kbGVyc0NvcHkubGVuZ3RoOyBtIDwgbjsgbSsrKSB7XG4gICAgICAgICAgaWYgKGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoYW5kbGVyc0NvcHlbbV0uY2FsbChlbGVtLCBldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGlmIChkYXRhLmhhbmRsZXJzW3R5cGVdLmxlbmd0aCA9PSAxKSB7XG4gICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBkYXRhLmRpc3BhdGNoZXIsIGZhbHNlKTtcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgICBlbGVtLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBkYXRhLmRpc3BhdGNoZXIpO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBmcm9tIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSAgIGVsZW0gT2JqZWN0IHRvIHJlbW92ZSBsaXN0ZW5lcnMgZnJvbVxuICogQHBhcmFtICB7U3RyaW5nPX0gICB0eXBlIFR5cGUgb2YgbGlzdGVuZXIgdG8gcmVtb3ZlLiBEb24ndCBpbmNsdWRlIHRvIHJlbW92ZSBhbGwgZXZlbnRzIGZyb20gZWxlbWVudC5cbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgIFNwZWNpZmljIGxpc3RlbmVyIHRvIHJlbW92ZS4gRG9uJ3QgaW5jbGR1ZSB0byByZW1vdmUgbGlzdGVuZXJzIGZvciBhbiBldmVudCB0eXBlLlxuICogQHByaXZhdGVcbiAqL1xudmpzLm9mZiA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGZuKSB7XG4gIC8vIERvbid0IHdhbnQgdG8gYWRkIGEgY2FjaGUgb2JqZWN0IHRocm91Z2ggZ2V0RGF0YSBpZiBub3QgbmVlZGVkXG4gIGlmICghdmpzLmhhc0RhdGEoZWxlbSkpIHJldHVybjtcblxuICB2YXIgZGF0YSA9IHZqcy5nZXREYXRhKGVsZW0pO1xuXG4gIC8vIElmIG5vIGV2ZW50cyBleGlzdCwgbm90aGluZyB0byB1bmJpbmRcbiAgaWYgKCFkYXRhLmhhbmRsZXJzKSB7IHJldHVybjsgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb25cbiAgdmFyIHJlbW92ZVR5cGUgPSBmdW5jdGlvbih0KXtcbiAgICAgZGF0YS5oYW5kbGVyc1t0XSA9IFtdO1xuICAgICB2anMuY2xlYW5VcEV2ZW50cyhlbGVtLHQpO1xuICB9O1xuXG4gIC8vIEFyZSB3ZSByZW1vdmluZyBhbGwgYm91bmQgZXZlbnRzP1xuICBpZiAoIXR5cGUpIHtcbiAgICBmb3IgKHZhciB0IGluIGRhdGEuaGFuZGxlcnMpIHJlbW92ZVR5cGUodCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIGhhbmRsZXJzID0gZGF0YS5oYW5kbGVyc1t0eXBlXTtcblxuICAvLyBJZiBubyBoYW5kbGVycyBleGlzdCwgbm90aGluZyB0byB1bmJpbmRcbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuO1xuXG4gIC8vIElmIG5vIGxpc3RlbmVyIHdhcyBwcm92aWRlZCwgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHR5cGVcbiAgaWYgKCFmbikge1xuICAgIHJlbW92ZVR5cGUodHlwZSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gV2UncmUgb25seSByZW1vdmluZyBhIHNpbmdsZSBoYW5kbGVyXG4gIGlmIChmbi5ndWlkKSB7XG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCBoYW5kbGVycy5sZW5ndGg7IG4rKykge1xuICAgICAgaWYgKGhhbmRsZXJzW25dLmd1aWQgPT09IGZuLmd1aWQpIHtcbiAgICAgICAgaGFuZGxlcnMuc3BsaWNlKG4tLSwgMSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmpzLmNsZWFuVXBFdmVudHMoZWxlbSwgdHlwZSk7XG59O1xuXG4vKipcbiAqIENsZWFuIHVwIHRoZSBsaXN0ZW5lciBjYWNoZSBhbmQgZGlzcGF0Y2hlcnNcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEVsZW1lbnQgdG8gY2xlYW4gdXBcbiAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSBUeXBlIG9mIGV2ZW50IHRvIGNsZWFuIHVwXG4gKiBAcHJpdmF0ZVxuICovXG52anMuY2xlYW5VcEV2ZW50cyA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUpIHtcbiAgdmFyIGRhdGEgPSB2anMuZ2V0RGF0YShlbGVtKTtcblxuICAvLyBSZW1vdmUgdGhlIGV2ZW50cyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBpZiB0aGVyZSBhcmUgbm9uZSBsZWZ0XG4gIGlmIChkYXRhLmhhbmRsZXJzW3R5cGVdLmxlbmd0aCA9PT0gMCkge1xuICAgIGRlbGV0ZSBkYXRhLmhhbmRsZXJzW3R5cGVdO1xuICAgIC8vIGRhdGEuaGFuZGxlcnNbdHlwZV0gPSBudWxsO1xuICAgIC8vIFNldHRpbmcgdG8gbnVsbCB3YXMgY2F1c2luZyBhbiBlcnJvciB3aXRoIGRhdGEuaGFuZGxlcnNcblxuICAgIC8vIFJlbW92ZSB0aGUgbWV0YS1oYW5kbGVyIGZyb20gdGhlIGVsZW1lbnRcbiAgICBpZiAoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGRhdGEuZGlzcGF0Y2hlciwgZmFsc2UpO1xuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcbiAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGRhdGEuZGlzcGF0Y2hlcik7XG4gICAgfVxuICB9XG5cbiAgLy8gUmVtb3ZlIHRoZSBldmVudHMgb2JqZWN0IGlmIHRoZXJlIGFyZSBubyB0eXBlcyBsZWZ0XG4gIGlmICh2anMuaXNFbXB0eShkYXRhLmhhbmRsZXJzKSkge1xuICAgIGRlbGV0ZSBkYXRhLmhhbmRsZXJzO1xuICAgIGRlbGV0ZSBkYXRhLmRpc3BhdGNoZXI7XG4gICAgZGVsZXRlIGRhdGEuZGlzYWJsZWQ7XG5cbiAgICAvLyBkYXRhLmhhbmRsZXJzID0gbnVsbDtcbiAgICAvLyBkYXRhLmRpc3BhdGNoZXIgPSBudWxsO1xuICAgIC8vIGRhdGEuZGlzYWJsZWQgPSBudWxsO1xuICB9XG5cbiAgLy8gRmluYWxseSByZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUgaXMgbm8gZGF0YSBsZWZ0XG4gIGlmICh2anMuaXNFbXB0eShkYXRhKSkge1xuICAgIHZqcy5yZW1vdmVEYXRhKGVsZW0pO1xuICB9XG59O1xuXG4vKipcbiAqIEZpeCBhIG5hdGl2ZSBldmVudCB0byBoYXZlIHN0YW5kYXJkIHByb3BlcnR5IHZhbHVlc1xuICogQHBhcmFtICB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QgdG8gZml4XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuZml4RXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuXG4gIGZ1bmN0aW9uIHJldHVyblRydWUoKSB7IHJldHVybiB0cnVlOyB9XG4gIGZ1bmN0aW9uIHJldHVybkZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cblxuICAvLyBUZXN0IGlmIGZpeGluZyB1cCBpcyBuZWVkZWRcbiAgLy8gVXNlZCB0byBjaGVjayBpZiAhZXZlbnQuc3RvcFByb3BhZ2F0aW9uIGluc3RlYWQgb2YgaXNQcm9wYWdhdGlvblN0b3BwZWRcbiAgLy8gQnV0IG5hdGl2ZSBldmVudHMgcmV0dXJuIHRydWUgZm9yIHN0b3BQcm9wYWdhdGlvbiwgYnV0IGRvbid0IGhhdmVcbiAgLy8gb3RoZXIgZXhwZWN0ZWQgbWV0aG9kcyBsaWtlIGlzUHJvcGFnYXRpb25TdG9wcGVkLiBTZWVtcyB0byBiZSBhIHByb2JsZW1cbiAgLy8gd2l0aCB0aGUgSmF2YXNjcmlwdCBOaW5qYSBjb2RlLiBTbyB3ZSdyZSBqdXN0IG92ZXJyaWRpbmcgYWxsIGV2ZW50cyBub3cuXG4gIGlmICghZXZlbnQgfHwgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKSB7XG4gICAgdmFyIG9sZCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcblxuICAgIGV2ZW50ID0ge307XG4gICAgLy8gQ2xvbmUgdGhlIG9sZCBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gbW9kaWZ5IHRoZSB2YWx1ZXMgZXZlbnQgPSB7fTtcbiAgICAvLyBJRTggRG9lc24ndCBsaWtlIHdoZW4geW91IG1lc3Mgd2l0aCBuYXRpdmUgZXZlbnQgcHJvcGVydGllc1xuICAgIC8vIEZpcmVmb3ggcmV0dXJucyBmYWxzZSBmb3IgZXZlbnQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSBhbmQgb3RoZXIgcHJvcHNcbiAgICAvLyAgd2hpY2ggbWFrZXMgY29weWluZyBtb3JlIGRpZmZpY3VsdC5cbiAgICAvLyBUT0RPOiBQcm9iYWJseSBiZXN0IHRvIGNyZWF0ZSBhIHdoaXRlbGlzdCBvZiBldmVudCBwcm9wc1xuICAgIGZvciAodmFyIGtleSBpbiBvbGQpIHtcbiAgICAgIC8vIFNhZmFyaSA2LjAuMyB3YXJucyB5b3UgaWYgeW91IHRyeSB0byBjb3B5IGRlcHJlY2F0ZWQgbGF5ZXJYL1lcbiAgICAgIGlmIChrZXkgIT09ICdsYXllclgnICYmIGtleSAhPT0gJ2xheWVyWScpIHtcbiAgICAgICAgZXZlbnRba2V5XSA9IG9sZFtrZXldO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoZSBldmVudCBvY2N1cnJlZCBvbiB0aGlzIGVsZW1lbnRcbiAgICBpZiAoIWV2ZW50LnRhcmdldCkge1xuICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgd2hpY2ggb3RoZXIgZWxlbWVudCB0aGUgZXZlbnQgaXMgcmVsYXRlZCB0b1xuICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPSBldmVudC5mcm9tRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ID9cbiAgICAgIGV2ZW50LnRvRWxlbWVudCA6XG4gICAgICBldmVudC5mcm9tRWxlbWVudDtcblxuICAgIC8vIFN0b3AgdGhlIGRlZmF1bHQgYnJvd3NlciBhY3Rpb25cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChvbGQucHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgb2xkLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcbiAgICB9O1xuXG4gICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuRmFsc2U7XG5cbiAgICAvLyBTdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKG9sZC5zdG9wUHJvcGFnYXRpb24pIHtcbiAgICAgICAgb2xkLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgfVxuICAgICAgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcbiAgICAgIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcbiAgICB9O1xuXG4gICAgZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5GYWxzZTtcblxuICAgIC8vIFN0b3AgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgYW5kIGV4ZWN1dGluZyBvdGhlciBoYW5kbGVyc1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmIChvbGQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XG4gICAgICAgIG9sZC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH07XG5cbiAgICBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVybkZhbHNlO1xuXG4gICAgLy8gSGFuZGxlIG1vdXNlIHBvc2l0aW9uXG4gICAgaWYgKGV2ZW50LmNsaWVudFggIT0gbnVsbCkge1xuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgYm9keSA9IGRvY3VtZW50LmJvZHk7XG5cbiAgICAgIGV2ZW50LnBhZ2VYID0gZXZlbnQuY2xpZW50WCArXG4gICAgICAgIChkb2MgJiYgZG9jLnNjcm9sbExlZnQgfHwgYm9keSAmJiBib2R5LnNjcm9sbExlZnQgfHwgMCkgLVxuICAgICAgICAoZG9jICYmIGRvYy5jbGllbnRMZWZ0IHx8IGJvZHkgJiYgYm9keS5jbGllbnRMZWZ0IHx8IDApO1xuICAgICAgZXZlbnQucGFnZVkgPSBldmVudC5jbGllbnRZICtcbiAgICAgICAgKGRvYyAmJiBkb2Muc2Nyb2xsVG9wIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgfHwgMCkgLVxuICAgICAgICAoZG9jICYmIGRvYy5jbGllbnRUb3AgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCB8fCAwKTtcbiAgICB9XG5cbiAgICAvLyBIYW5kbGUga2V5IHByZXNzZXNcbiAgICBldmVudC53aGljaCA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XG5cbiAgICAvLyBGaXggYnV0dG9uIGZvciBtb3VzZSBjbGlja3M6XG4gICAgLy8gMCA9PSBsZWZ0OyAxID09IG1pZGRsZTsgMiA9PSByaWdodFxuICAgIGlmIChldmVudC5idXR0b24gIT0gbnVsbCkge1xuICAgICAgZXZlbnQuYnV0dG9uID0gKGV2ZW50LmJ1dHRvbiAmIDEgPyAwIDpcbiAgICAgICAgKGV2ZW50LmJ1dHRvbiAmIDQgPyAxIDpcbiAgICAgICAgICAoZXZlbnQuYnV0dG9uICYgMiA/IDIgOiAwKSkpO1xuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgZml4ZWQtdXAgaW5zdGFuY2VcbiAgcmV0dXJuIGV2ZW50O1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGFuIGV2ZW50IGZvciBhbiBlbGVtZW50XG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gZWxlbSAgRWxlbWVudCB0byB0cmlnZ2VyIGFuIGV2ZW50IG9uXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50IFR5cGUgb2YgZXZlbnQgdG8gdHJpZ2dlclxuICogQHByaXZhdGVcbiAqL1xudmpzLnRyaWdnZXIgPSBmdW5jdGlvbihlbGVtLCBldmVudCkge1xuICAvLyBGZXRjaGVzIGVsZW1lbnQgZGF0YSBhbmQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCAoZm9yIGJ1YmJsaW5nKS5cbiAgLy8gRG9uJ3Qgd2FudCB0byBhZGQgYSBkYXRhIG9iamVjdCB0byBjYWNoZSBmb3IgZXZlcnkgcGFyZW50LFxuICAvLyBzbyBjaGVja2luZyBoYXNEYXRhIGZpcnN0LlxuICB2YXIgZWxlbURhdGEgPSAodmpzLmhhc0RhdGEoZWxlbSkpID8gdmpzLmdldERhdGEoZWxlbSkgOiB7fTtcbiAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSB8fCBlbGVtLm93bmVyRG9jdW1lbnQ7XG4gICAgICAvLyB0eXBlID0gZXZlbnQudHlwZSB8fCBldmVudCxcbiAgICAgIC8vIGhhbmRsZXI7XG5cbiAgLy8gSWYgYW4gZXZlbnQgbmFtZSB3YXMgcGFzc2VkIGFzIGEgc3RyaW5nLCBjcmVhdGVzIGFuIGV2ZW50IG91dCBvZiBpdFxuICBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xuICAgIGV2ZW50ID0geyB0eXBlOmV2ZW50LCB0YXJnZXQ6ZWxlbSB9O1xuICB9XG4gIC8vIE5vcm1hbGl6ZXMgdGhlIGV2ZW50IHByb3BlcnRpZXMuXG4gIGV2ZW50ID0gdmpzLmZpeEV2ZW50KGV2ZW50KTtcblxuICAvLyBJZiB0aGUgcGFzc2VkIGVsZW1lbnQgaGFzIGEgZGlzcGF0Y2hlciwgZXhlY3V0ZXMgdGhlIGVzdGFibGlzaGVkIGhhbmRsZXJzLlxuICBpZiAoZWxlbURhdGEuZGlzcGF0Y2hlcikge1xuICAgIGVsZW1EYXRhLmRpc3BhdGNoZXIuY2FsbChlbGVtLCBldmVudCk7XG4gIH1cblxuICAvLyBVbmxlc3MgZXhwbGljaXRseSBzdG9wcGVkIG9yIHRoZSBldmVudCBkb2VzIG5vdCBidWJibGUgKGUuZy4gbWVkaWEgZXZlbnRzKVxuICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGxzIHRoaXMgZnVuY3Rpb24gdG8gYnViYmxlIHRoZSBldmVudCB1cCB0aGUgRE9NLlxuICAgIGlmIChwYXJlbnQgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgJiYgZXZlbnQuYnViYmxlcyAhPT0gZmFsc2UpIHtcbiAgICB2anMudHJpZ2dlcihwYXJlbnQsIGV2ZW50KTtcblxuICAvLyBJZiBhdCB0aGUgdG9wIG9mIHRoZSBET00sIHRyaWdnZXJzIHRoZSBkZWZhdWx0IGFjdGlvbiB1bmxlc3MgZGlzYWJsZWQuXG4gIH0gZWxzZSBpZiAoIXBhcmVudCAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHZqcy5nZXREYXRhKGV2ZW50LnRhcmdldCk7XG5cbiAgICAvLyBDaGVja3MgaWYgdGhlIHRhcmdldCBoYXMgYSBkZWZhdWx0IGFjdGlvbiBmb3IgdGhpcyBldmVudC5cbiAgICBpZiAoZXZlbnQudGFyZ2V0W2V2ZW50LnR5cGVdKSB7XG4gICAgICAvLyBUZW1wb3JhcmlseSBkaXNhYmxlcyBldmVudCBkaXNwYXRjaGluZyBvbiB0aGUgdGFyZ2V0IGFzIHdlIGhhdmUgYWxyZWFkeSBleGVjdXRlZCB0aGUgaGFuZGxlci5cbiAgICAgIHRhcmdldERhdGEuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgLy8gRXhlY3V0ZXMgdGhlIGRlZmF1bHQgYWN0aW9uLlxuICAgICAgaWYgKHR5cGVvZiBldmVudC50YXJnZXRbZXZlbnQudHlwZV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZXZlbnQudGFyZ2V0W2V2ZW50LnR5cGVdKCk7XG4gICAgICB9XG4gICAgICAvLyBSZS1lbmFibGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxuICAgICAgdGFyZ2V0RGF0YS5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIC8vIEluZm9ybSB0aGUgdHJpZ2dlcmVyIGlmIHRoZSBkZWZhdWx0IHdhcyBwcmV2ZW50ZWQgYnkgcmV0dXJuaW5nIGZhbHNlXG4gIHJldHVybiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XG4gIC8qIE9yaWdpbmFsIHZlcnNpb24gb2YganMgbmluamEgZXZlbnRzIHdhc24ndCBjb21wbGV0ZS5cbiAgICogV2UndmUgc2luY2UgdXBkYXRlZCB0byB0aGUgbGF0ZXN0IHZlcnNpb24sIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kXG4gICAqIGZvciBub3cganVzdCBpbiBjYXNlLlxuICAgKi9cbiAgLy8gLy8gQWRkZWQgaW4gYXR0aW9uIHRvIGJvb2suIEJvb2sgY29kZSB3YXMgYnJva2UuXG4gIC8vIGV2ZW50ID0gdHlwZW9mIGV2ZW50ID09PSAnb2JqZWN0JyA/XG4gIC8vICAgZXZlbnRbdmpzLmV4cGFuZG9dID9cbiAgLy8gICAgIGV2ZW50IDpcbiAgLy8gICAgIG5ldyB2anMuRXZlbnQodHlwZSwgZXZlbnQpIDpcbiAgLy8gICBuZXcgdmpzLkV2ZW50KHR5cGUpO1xuXG4gIC8vIGV2ZW50LnR5cGUgPSB0eXBlO1xuICAvLyBpZiAoaGFuZGxlcikge1xuICAvLyAgIGhhbmRsZXIuY2FsbChlbGVtLCBldmVudCk7XG4gIC8vIH1cblxuICAvLyAvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcbiAgLy8gZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xuICAvLyBldmVudC50YXJnZXQgPSBlbGVtO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGEgbGlzdGVuZXIgb25seSBvbmNlIGZvciBhbiBldmVudFxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9ICAgZWxlbSBFbGVtZW50IG9yIG9iamVjdCB0b1xuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGVcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxuICogQHByaXZhdGVcbiAqL1xudmpzLm9uZSA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGZuKSB7XG4gIHZhciBmdW5jID0gZnVuY3Rpb24oKXtcbiAgICB2anMub2ZmKGVsZW0sIHR5cGUsIGZ1bmMpO1xuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG4gIGZ1bmMuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IHZqcy5ndWlkKys7XG4gIHZqcy5vbihlbGVtLCB0eXBlLCBmdW5jKTtcbn07XG52YXIgaGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBlbGVtZW50IGFuZCBhcHBsaWVzIHByb3BlcnRpZXMuXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSB0YWdOYW1lICAgIE5hbWUgb2YgdGFnIHRvIGJlIGNyZWF0ZWQuXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBwcm9wZXJ0aWVzIEVsZW1lbnQgcHJvcGVydGllcyB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5jcmVhdGVFbCA9IGZ1bmN0aW9uKHRhZ05hbWUsIHByb3BlcnRpZXMpe1xuICB2YXIgZWwsIHByb3BOYW1lO1xuXG4gIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lIHx8ICdkaXYnKTtcblxuICBmb3IgKHByb3BOYW1lIGluIHByb3BlcnRpZXMpe1xuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwocHJvcGVydGllcywgcHJvcE5hbWUpKSB7XG4gICAgICAvL2VsW3Byb3BOYW1lXSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xuICAgICAgLy8gTm90IHJlbWVtYmVyaW5nIHdoeSB3ZSB3ZXJlIGNoZWNraW5nIGZvciBkYXNoXG4gICAgICAvLyBidXQgdXNpbmcgc2V0QXR0cmlidXRlIG1lYW5zIHlvdSBoYXZlIHRvIHVzZSBnZXRBdHRyaWJ1dGVcblxuICAgICAgLy8gVGhlIGNoZWNrIGZvciBkYXNoIGNoZWNrcyBmb3IgdGhlIGFyaWEtKiBhdHRyaWJ1dGVzLCBsaWtlIGFyaWEtbGFiZWwsIGFyaWEtdmFsdWVtaW4uXG4gICAgICAvLyBUaGUgYWRkaXRpb25hbCBjaGVjayBmb3IgXCJyb2xlXCIgaXMgYmVjYXVzZSB0aGUgZGVmYXVsdCBtZXRob2QgZm9yIGFkZGluZyBhdHRyaWJ1dGVzIGRvZXMgbm90XG4gICAgICAvLyBhZGQgdGhlIGF0dHJpYnV0ZSBcInJvbGVcIi4gTXkgZ3Vlc3MgaXMgYmVjYXVzZSBpdCdzIG5vdCBhIHZhbGlkIGF0dHJpYnV0ZSBpbiBzb21lIG5hbWVzcGFjZXMsIGFsdGhvdWdoXG4gICAgICAvLyBicm93c2VycyBoYW5kbGUgdGhlIGF0dHJpYnV0ZSBqdXN0IGZpbmUuIFRoZSBXM0MgYWxsb3dzIGZvciBhcmlhLSogYXR0cmlidXRlcyB0byBiZSB1c2VkIGluIHByZS1IVE1MNSBkb2NzLlxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtcHJpbWVyLyNhcmlhaHRtbC4gVXNpbmcgc2V0QXR0cmlidXRlIGdldHMgYXJvdW5kIHRoaXMgcHJvYmxlbS5cblxuICAgICAgIGlmIChwcm9wTmFtZS5pbmRleE9mKCdhcmlhLScpICE9PSAtMSB8fCBwcm9wTmFtZT09J3JvbGUnKSB7XG4gICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIHByb3BlcnRpZXNbcHJvcE5hbWVdKTtcbiAgICAgICB9IGVsc2Uge1xuICAgICAgICAgZWxbcHJvcE5hbWVdID0gcHJvcGVydGllc1twcm9wTmFtZV07XG4gICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZWw7XG59O1xuXG4vKipcbiAqIFVwcGVyY2FzZSB0aGUgZmlyc3QgbGV0dGVyIG9mIGEgc3RyaW5nXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gYmUgdXBwZXJjYXNlZFxuICogQHJldHVybiB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xudmpzLmNhcGl0YWxpemUgPSBmdW5jdGlvbihzdHJpbmcpe1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufTtcblxuLyoqXG4gKiBPYmplY3QgZnVuY3Rpb25zIGNvbnRhaW5lclxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5vYmogPSB7fTtcblxuLyoqXG4gKiBPYmplY3QuY3JlYXRlIHNoaW0gZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2VcbiAqXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9jcmVhdGVcbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBwYXJhbSAge09iamVjdH0gICBvYmogT2JqZWN0IHRvIHVzZSBhcyBwcm90b3R5cGVcbiAqIEBwcml2YXRlXG4gKi9cbiB2anMub2JqLmNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24ob2JqKXtcbiAgLy9DcmVhdGUgYSBuZXcgZnVuY3Rpb24gY2FsbGVkICdGJyB3aGljaCBpcyBqdXN0IGFuIGVtcHR5IG9iamVjdC5cbiAgZnVuY3Rpb24gRigpIHt9XG5cbiAgLy90aGUgcHJvdG90eXBlIG9mIHRoZSAnRicgZnVuY3Rpb24gc2hvdWxkIHBvaW50IHRvIHRoZVxuICAvL3BhcmFtZXRlciBvZiB0aGUgYW5vbnltb3VzIGZ1bmN0aW9uLlxuICBGLnByb3RvdHlwZSA9IG9iajtcblxuICAvL2NyZWF0ZSBhIG5ldyBjb25zdHJ1Y3RvciBmdW5jdGlvbiBiYXNlZCBvZmYgb2YgdGhlICdGJyBmdW5jdGlvbi5cbiAgcmV0dXJuIG5ldyBGKCk7XG59O1xuXG4vKipcbiAqIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGluIGFuIG9iamVjdCBhbmQgY2FsbCBhIGZ1bmN0aW9uXG4gKiB3aG9zZSBhcmd1bWVudHMgYXJlIChrZXksdmFsdWUpXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb2JqIE9iamVjdCBvZiBwcm9wZXJ0aWVzXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBlYWNoIHByb3BlcnR5LlxuICogQHRoaXMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG52anMub2JqLmVhY2ggPSBmdW5jdGlvbihvYmosIGZuLCBjb250ZXh0KXtcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICBmbi5jYWxsKGNvbnRleHQgfHwgdGhpcywga2V5LCBvYmpba2V5XSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzIHRvZ2V0aGVyIGFuZCByZXR1cm4gdGhlIG9yaWdpbmFsLlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmoxXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iajJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5vYmoubWVyZ2UgPSBmdW5jdGlvbihvYmoxLCBvYmoyKXtcbiAgaWYgKCFvYmoyKSB7IHJldHVybiBvYmoxOyB9XG4gIGZvciAodmFyIGtleSBpbiBvYmoyKXtcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG9iajIsIGtleSkpIHtcbiAgICAgIG9iajFba2V5XSA9IG9iajJba2V5XTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iajE7XG59O1xuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBhbmQgbWVyZ2UgYW55IHByb3BlcnRpZXMgdGhhdCBhcmUgb2JqZWN0c1xuICogaW5zdGVhZCBvZiBqdXN0IG92ZXJ3cml0aW5nIG9uZS4gVXNlcyB0byBtZXJnZSBvcHRpb25zIGhhc2hlc1xuICogd2hlcmUgZGVlcGVyIGRlZmF1bHQgc2V0dGluZ3MgYXJlIGltcG9ydGFudC5cbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMSBPYmplY3QgdG8gb3ZlcnJpZGVcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMiBPdmVycmlkaW5nIG9iamVjdFxuICogQHJldHVybiB7T2JqZWN0fSAgICAgIE5ldyBvYmplY3QuIE9iajEgYW5kIE9iajIgd2lsbCBiZSB1bnRvdWNoZWQuXG4gKiBAcHJpdmF0ZVxuICovXG52anMub2JqLmRlZXBNZXJnZSA9IGZ1bmN0aW9uKG9iajEsIG9iajIpe1xuICB2YXIga2V5LCB2YWwxLCB2YWwyO1xuXG4gIC8vIG1ha2UgYSBjb3B5IG9mIG9iajEgc28gd2UncmUgbm90IG92ZXdyaXRpbmcgb3JpZ2luYWwgdmFsdWVzLlxuICAvLyBsaWtlIHByb3RvdHlwZS5vcHRpb25zXyBhbmQgYWxsIHN1YiBvcHRpb25zIG9iamVjdHNcbiAgb2JqMSA9IHZqcy5vYmouY29weShvYmoxKTtcblxuICBmb3IgKGtleSBpbiBvYmoyKXtcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG9iajIsIGtleSkpIHtcbiAgICAgIHZhbDEgPSBvYmoxW2tleV07XG4gICAgICB2YWwyID0gb2JqMltrZXldO1xuXG4gICAgICAvLyBDaGVjayBpZiBib3RoIHByb3BlcnRpZXMgYXJlIHB1cmUgb2JqZWN0cyBhbmQgZG8gYSBkZWVwIG1lcmdlIGlmIHNvXG4gICAgICBpZiAodmpzLm9iai5pc1BsYWluKHZhbDEpICYmIHZqcy5vYmouaXNQbGFpbih2YWwyKSkge1xuICAgICAgICBvYmoxW2tleV0gPSB2anMub2JqLmRlZXBNZXJnZSh2YWwxLCB2YWwyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9iajFba2V5XSA9IG9iajJba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9iajE7XG59O1xuXG4vKipcbiAqIE1ha2UgYSBjb3B5IG9mIHRoZSBzdXBwbGllZCBvYmplY3RcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqIE9iamVjdCB0byBjb3B5XG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICBDb3B5IG9mIG9iamVjdFxuICogQHByaXZhdGVcbiAqL1xudmpzLm9iai5jb3B5ID0gZnVuY3Rpb24ob2JqKXtcbiAgcmV0dXJuIHZqcy5vYmoubWVyZ2Uoe30sIG9iaik7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBwbGFpbiwgYW5kIG5vdCBhIGRvbSBub2RlIG9yIGFueSBvYmplY3Qgc3ViLWluc3RhbmNlXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBPYmplY3QgdG8gY2hlY2tcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICBUcnVlIGlmIHBsYWluLCBmYWxzZSBvdGhlcndpc2VcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5vYmouaXNQbGFpbiA9IGZ1bmN0aW9uKG9iail7XG4gIHJldHVybiAhIW9ialxuICAgICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXG4gICAgJiYgb2JqLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXG4gICAgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG59O1xuXG4vKipcbiAqIEJpbmQgKGEuay5hIHByb3h5IG9yIENvbnRleHQpLiBBIHNpbXBsZSBtZXRob2QgZm9yIGNoYW5naW5nIHRoZSBjb250ZXh0IG9mIGEgZnVuY3Rpb25cbiAgIEl0IGFsc28gc3RvcmVzIGEgdW5pcXVlIGlkIG9uIHRoZSBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgZWFzaWx5IHJlbW92ZWQgZnJvbSBldmVudHNcbiAqIEBwYXJhbSAgeyp9ICAgY29udGV4dCBUaGUgb2JqZWN0IHRvIGJpbmQgYXMgc2NvcGVcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBiZSBib3VuZCB0byBhIHNjb3BlXG4gKiBAcGFyYW0gIHtOdW1iZXI9fSAgIHVpZCAgICAgQW4gb3B0aW9uYWwgdW5pcXVlIElEIGZvciB0aGUgZnVuY3Rpb24gdG8gYmUgc2V0XG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5iaW5kID0gZnVuY3Rpb24oY29udGV4dCwgZm4sIHVpZCkge1xuICAvLyBNYWtlIHN1cmUgdGhlIGZ1bmN0aW9uIGhhcyBhIHVuaXF1ZSBJRFxuICBpZiAoIWZuLmd1aWQpIHsgZm4uZ3VpZCA9IHZqcy5ndWlkKys7IH1cblxuICAvLyBDcmVhdGUgdGhlIG5ldyBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdGhlIGNvbnRleHRcbiAgdmFyIHJldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIC8vIEFsbG93IGZvciB0aGUgYWJpbGl0eSB0byBpbmRpdmlkdWFsaXplIHRoaXMgZnVuY3Rpb25cbiAgLy8gTmVlZGVkIGluIHRoZSBjYXNlIHdoZXJlIG11bHRpcGxlIG9iamVjdHMgbWlnaHQgc2hhcmUgdGhlIHNhbWUgcHJvdG90eXBlXG4gIC8vIElGIGJvdGggaXRlbXMgYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHdpdGggdGhlIHNhbWUgZnVuY3Rpb24sIHRoZW4geW91IHRyeSB0byByZW1vdmUganVzdCBvbmVcbiAgLy8gaXQgd2lsbCByZW1vdmUgYm90aCBiZWNhdXNlIHRoZXkgYm90aCBoYXZlIHRoZSBzYW1lIGd1aWQuXG4gIC8vIHdoZW4gdXNpbmcgdGhpcywgeW91IG5lZWQgdG8gdXNlIHRoZSBiaW5kIG1ldGhvZCB3aGVuIHlvdSByZW1vdmUgdGhlIGxpc3RlbmVyIGFzIHdlbGwuXG4gIC8vIGN1cnJlbnRseSB1c2VkIGluIHRleHQgdHJhY2tzXG4gIHJldC5ndWlkID0gKHVpZCkgPyB1aWQgKyAnXycgKyBmbi5ndWlkIDogZm4uZ3VpZDtcblxuICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBFbGVtZW50IERhdGEgU3RvcmUuIEFsbG93cyBmb3IgYmluZGluZyBkYXRhIHRvIGFuIGVsZW1lbnQgd2l0aG91dCBwdXR0aW5nIGl0IGRpcmVjdGx5IG9uIHRoZSBlbGVtZW50LlxuICogRXguIEV2ZW50IGxpc3RuZXJlcyBhcmUgc3RvcmVkIGhlcmUuXG4gKiAoYWxzbyBmcm9tIGpzbmluamEuY29tLCBzbGlnaHRseSBtb2RpZmllZCBhbmQgdXBkYXRlZCBmb3IgY2xvc3VyZSBjb21waWxlcilcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuY2FjaGUgPSB7fTtcblxuLyoqXG4gKiBVbmlxdWUgSUQgZm9yIGFuIGVsZW1lbnQgb3IgZnVuY3Rpb25cbiAqIEB0eXBlIHtOdW1iZXJ9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuZ3VpZCA9IDE7XG5cbi8qKlxuICogVW5pcXVlIGF0dHJpYnV0ZSBuYW1lIHRvIHN0b3JlIGFuIGVsZW1lbnQncyBndWlkIGluXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQGNvbnN0YW50XG4gKiBAcHJpdmF0ZVxuICovXG52anMuZXhwYW5kbyA9ICd2ZGF0YScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNhY2hlIG9iamVjdCB3aGVyZSBkYXRhIGZvciBhbiBlbGVtZW50IGlzIHN0b3JlZFxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgRWxlbWVudCB0byBzdG9yZSBkYXRhIGZvci5cbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5nZXREYXRhID0gZnVuY3Rpb24oZWwpe1xuICB2YXIgaWQgPSBlbFt2anMuZXhwYW5kb107XG4gIGlmICghaWQpIHtcbiAgICBpZCA9IGVsW3Zqcy5leHBhbmRvXSA9IHZqcy5ndWlkKys7XG4gICAgdmpzLmNhY2hlW2lkXSA9IHt9O1xuICB9XG4gIHJldHVybiB2anMuY2FjaGVbaWRdO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBjYWNoZSBvYmplY3Qgd2hlcmUgZGF0YSBmb3IgYW4gZWxlbWVudCBpcyBzdG9yZWRcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsIEVsZW1lbnQgdG8gc3RvcmUgZGF0YSBmb3IuXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuaGFzRGF0YSA9IGZ1bmN0aW9uKGVsKXtcbiAgdmFyIGlkID0gZWxbdmpzLmV4cGFuZG9dO1xuICByZXR1cm4gISghaWQgfHwgdmpzLmlzRW1wdHkodmpzLmNhY2hlW2lkXSkpO1xufTtcblxuLyoqXG4gKiBEZWxldGUgZGF0YSBmb3IgdGhlIGVsZW1lbnQgZnJvbSB0aGUgY2FjaGUgYW5kIHRoZSBndWlkIGF0dHIgZnJvbSBnZXRFbGVtZW50QnlJZFxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgUmVtb3ZlIGRhdGEgZm9yIGFuIGVsZW1lbnRcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5yZW1vdmVEYXRhID0gZnVuY3Rpb24oZWwpe1xuICB2YXIgaWQgPSBlbFt2anMuZXhwYW5kb107XG4gIGlmICghaWQpIHsgcmV0dXJuOyB9XG4gIC8vIFJlbW92ZSBhbGwgc3RvcmVkIGRhdGFcbiAgLy8gQ2hhbmdlZCB0byA9IG51bGxcbiAgLy8gaHR0cDovL2NvZGluZy5zbWFzaGluZ21hZ2F6aW5lLmNvbS8yMDEyLzExLzA1L3dyaXRpbmctZmFzdC1tZW1vcnktZWZmaWNpZW50LWphdmFzY3JpcHQvXG4gIC8vIHZqcy5jYWNoZVtpZF0gPSBudWxsO1xuICBkZWxldGUgdmpzLmNhY2hlW2lkXTtcblxuICAvLyBSZW1vdmUgdGhlIGV4cGFuZG8gcHJvcGVydHkgZnJvbSB0aGUgRE9NIG5vZGVcbiAgdHJ5IHtcbiAgICBkZWxldGUgZWxbdmpzLmV4cGFuZG9dO1xuICB9IGNhdGNoKGUpIHtcbiAgICBpZiAoZWwucmVtb3ZlQXR0cmlidXRlKSB7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodmpzLmV4cGFuZG8pO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSBkb2Vzbid0IGFwcGVhciB0byBzdXBwb3J0IHJlbW92ZUF0dHJpYnV0ZSBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudFxuICAgICAgZWxbdmpzLmV4cGFuZG9dID0gbnVsbDtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgYW4gb2JqZWN0IGlzIGVtcHR5XG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvYmogVGhlIG9iamVjdCB0byBjaGVjayBmb3IgZW1wdGluZXNzXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xudmpzLmlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAvLyBJbmx1ZGUgbnVsbCBwcm9wZXJ0aWVzIGFzIGVtcHR5LlxuICAgIGlmIChvYmpbcHJvcF0gIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuXG4vKipcbiAqIEFkZCBhIENTUyBjbGFzcyBuYW1lIHRvIGFuIGVsZW1lbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAgICBFbGVtZW50IHRvIGFkZCBjbGFzcyBuYW1lIHRvXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb0FkZCBDbGFzc25hbWUgdG8gYWRkXG4gKiBAcHJpdmF0ZVxuICovXG52anMuYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjbGFzc1RvQWRkKXtcbiAgaWYgKCgnICcrZWxlbWVudC5jbGFzc05hbWUrJyAnKS5pbmRleE9mKCcgJytjbGFzc1RvQWRkKycgJykgPT0gLTEpIHtcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lID09PSAnJyA/IGNsYXNzVG9BZGQgOiBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzVG9BZGQ7XG4gIH1cbn07XG5cbi8qKlxuICogUmVtb3ZlIGEgQ1NTIGNsYXNzIG5hbWUgZnJvbSBhbiBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgICAgRWxlbWVudCB0byByZW1vdmUgZnJvbSBjbGFzcyBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb0FkZCBDbGFzc25hbWUgdG8gcmVtb3ZlXG4gKiBAcHJpdmF0ZVxuICovXG52anMucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjbGFzc1RvUmVtb3ZlKXtcbiAgdmFyIGNsYXNzTmFtZXMsIGk7XG5cbiAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NUb1JlbW92ZSkgPT0gLTEpIHsgcmV0dXJuOyB9XG5cbiAgY2xhc3NOYW1lcyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG5cbiAgLy8gbm8gYXJyLmluZGV4T2YgaW4gaWU4LCBhbmQgd2UgZG9uJ3Qgd2FudCB0byBhZGQgYSBiaWcgc2hpbVxuICBmb3IgKGkgPSBjbGFzc05hbWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgaWYgKGNsYXNzTmFtZXNbaV0gPT09IGNsYXNzVG9SZW1vdmUpIHtcbiAgICAgIGNsYXNzTmFtZXMuc3BsaWNlKGksMSk7XG4gICAgfVxuICB9XG5cbiAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWVzLmpvaW4oJyAnKTtcbn07XG5cbi8qKlxuICogRWxlbWVudCBmb3IgdGVzdGluZyBicm93c2VyIEhUTUw1IHZpZGVvIGNhcGFiaWxpdGllc1xuICogQHR5cGUge0VsZW1lbnR9XG4gKiBAY29uc3RhbnRcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5URVNUX1ZJRCA9IHZqcy5jcmVhdGVFbCgndmlkZW8nKTtcblxuLyoqXG4gKiBVc2VyYWdlbnQgZm9yIGJyb3dzZXIgdGVzdGluZy5cbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAY29uc3RhbnRcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5VU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcblxuLyoqXG4gKiBEZXZpY2UgaXMgYW4gaVBob25lXG4gKiBAdHlwZSB7Qm9vbGVhbn1cbiAqIEBjb25zdGFudFxuICogQHByaXZhdGVcbiAqL1xudmpzLklTX0lQSE9ORSA9ICgvaVBob25lL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xudmpzLklTX0lQQUQgPSAoL2lQYWQvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XG52anMuSVNfSVBPRCA9ICgvaVBvZC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcbnZqcy5JU19JT1MgPSB2anMuSVNfSVBIT05FIHx8IHZqcy5JU19JUEFEIHx8IHZqcy5JU19JUE9EO1xuXG52anMuSU9TX1ZFUlNJT04gPSAoZnVuY3Rpb24oKXtcbiAgdmFyIG1hdGNoID0gdmpzLlVTRVJfQUdFTlQubWF0Y2goL09TIChcXGQrKV8vaSk7XG4gIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkgeyByZXR1cm4gbWF0Y2hbMV07IH1cbn0pKCk7XG5cbnZqcy5JU19BTkRST0lEID0gKC9BbmRyb2lkL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xudmpzLkFORFJPSURfVkVSU0lPTiA9IChmdW5jdGlvbigpIHtcbiAgLy8gVGhpcyBtYXRjaGVzIEFuZHJvaWQgTWFqb3IuTWlub3IuUGF0Y2ggdmVyc2lvbnNcbiAgLy8gQU5EUk9JRF9WRVJTSU9OIGlzIE1ham9yLk1pbm9yIGFzIGEgTnVtYmVyLCBpZiBNaW5vciBpc24ndCBhdmFpbGFibGUsIHRoZW4gb25seSBNYWpvciBpcyByZXR1cm5lZFxuICB2YXIgbWF0Y2ggPSB2anMuVVNFUl9BR0VOVC5tYXRjaCgvQW5kcm9pZCAoXFxkKykoPzpcXC4oXFxkKykpPyg/OlxcLihcXGQrKSkqL2kpLFxuICAgIG1ham9yLFxuICAgIG1pbm9yO1xuXG4gIGlmICghbWF0Y2gpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIG1ham9yID0gbWF0Y2hbMV0gJiYgcGFyc2VGbG9hdChtYXRjaFsxXSk7XG4gIG1pbm9yID0gbWF0Y2hbMl0gJiYgcGFyc2VGbG9hdChtYXRjaFsyXSk7XG5cbiAgaWYgKG1ham9yICYmIG1pbm9yKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hbMV0gKyAnLicgKyBtYXRjaFsyXSk7XG4gIH0gZWxzZSBpZiAobWFqb3IpIHtcbiAgICByZXR1cm4gbWFqb3I7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn0pKCk7XG4vLyBPbGQgQW5kcm9pZCBpcyBkZWZpbmVkIGFzIFZlcnNpb24gb2xkZXIgdGhhbiAyLjMsIGFuZCByZXF1aXJpbmcgYSB3ZWJraXQgdmVyc2lvbiBvZiB0aGUgYW5kcm9pZCBicm93c2VyXG52anMuSVNfT0xEX0FORFJPSUQgPSB2anMuSVNfQU5EUk9JRCAmJiAoL3dlYmtpdC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKSAmJiB2anMuQU5EUk9JRF9WRVJTSU9OIDwgMi4zO1xuXG52anMuSVNfRklSRUZPWCA9ICgvRmlyZWZveC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcbnZqcy5JU19DSFJPTUUgPSAoL0Nocm9tZS9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcblxudmpzLlRPVUNIX0VOQUJMRUQgPSAhISgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKTtcblxuLyoqXG4gKiBHZXQgYW4gZWxlbWVudCdzIGF0dHJpYnV0ZSB2YWx1ZXMsIGFzIGRlZmluZWQgb24gdGhlIEhUTUwgdGFnXG4gKiBBdHRyaWJ1dHMgYXJlIG5vdCB0aGUgc2FtZSBhcyBwcm9wZXJ0aWVzLiBUaGV5J3JlIGRlZmluZWQgb24gdGhlIHRhZ1xuICogb3Igd2l0aCBzZXRBdHRyaWJ1dGUgKHdoaWNoIHNob3VsZG4ndCBiZSB1c2VkIHdpdGggSFRNTClcbiAqIFRoaXMgd2lsbCByZXR1cm4gdHJ1ZSBvciBmYWxzZSBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzLlxuICogQHBhcmFtICB7RWxlbWVudH0gdGFnIEVsZW1lbnQgZnJvbSB3aGljaCB0byBnZXQgdGFnIGF0dHJpYnV0ZXNcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXMgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgb2JqLCBrbm93bkJvb2xlYW5zLCBhdHRycywgYXR0ck5hbWUsIGF0dHJWYWw7XG5cbiAgb2JqID0ge307XG5cbiAgLy8ga25vd24gYm9vbGVhbiBhdHRyaWJ1dGVzXG4gIC8vIHdlIGNhbiBjaGVjayBmb3IgbWF0Y2hpbmcgYm9vbGVhbiBwcm9wZXJ0aWVzLCBidXQgb2xkZXIgYnJvd3NlcnNcbiAgLy8gd29uJ3Qga25vdyBhYm91dCBIVE1MNSBib29sZWFuIGF0dHJpYnV0ZXMgdGhhdCB3ZSBzdGlsbCByZWFkIGZyb21cbiAga25vd25Cb29sZWFucyA9ICcsJysnYXV0b3BsYXksY29udHJvbHMsbG9vcCxtdXRlZCxkZWZhdWx0JysnLCc7XG5cbiAgaWYgKHRhZyAmJiB0YWcuYXR0cmlidXRlcyAmJiB0YWcuYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XG4gICAgYXR0cnMgPSB0YWcuYXR0cmlidXRlcztcblxuICAgIGZvciAodmFyIGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgYXR0ck5hbWUgPSBhdHRyc1tpXS5uYW1lO1xuICAgICAgYXR0clZhbCA9IGF0dHJzW2ldLnZhbHVlO1xuXG4gICAgICAvLyBjaGVjayBmb3Iga25vd24gYm9vbGVhbnNcbiAgICAgIC8vIHRoZSBtYXRjaGluZyBlbGVtZW50IHByb3BlcnR5IHdpbGwgcmV0dXJuIGEgdmFsdWUgZm9yIHR5cGVvZlxuICAgICAgaWYgKHR5cGVvZiB0YWdbYXR0ck5hbWVdID09PSAnYm9vbGVhbicgfHwga25vd25Cb29sZWFucy5pbmRleE9mKCcsJythdHRyTmFtZSsnLCcpICE9PSAtMSkge1xuICAgICAgICAvLyB0aGUgdmFsdWUgb2YgYW4gaW5jbHVkZWQgYm9vbGVhbiBhdHRyaWJ1dGUgaXMgdHlwaWNhbGx5IGFuIGVtcHR5XG4gICAgICAgIC8vIHN0cmluZyAoJycpIHdoaWNoIHdvdWxkIGVxdWFsIGZhbHNlIGlmIHdlIGp1c3QgY2hlY2sgZm9yIGEgZmFsc2UgdmFsdWUuXG4gICAgICAgIC8vIHdlIGFsc28gZG9uJ3Qgd2FudCBzdXBwb3J0IGJhZCBjb2RlIGxpa2UgYXV0b3BsYXk9J2ZhbHNlJ1xuICAgICAgICBhdHRyVmFsID0gKGF0dHJWYWwgIT09IG51bGwpID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBvYmpbYXR0ck5hbWVdID0gYXR0clZhbDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHZhbHVlIGZvciBhbiBlbGVtZW50XG4gKiBGcm9tIGh0dHA6Ly9yb2JlcnRueW1hbi5jb20vMjAwNi8wNC8yNC9nZXQtdGhlLXJlbmRlcmVkLXN0eWxlLW9mLWFuLWVsZW1lbnQvXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbCAgICAgICAgRWxlbWVudCB0byBnZXQgc3R5bGUgdmFsdWUgZm9yXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0ckNzc1J1bGUgU3R5bGUgbmFtZVxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgIFN0eWxlIHZhbHVlXG4gKiBAcHJpdmF0ZVxuICovXG52anMuZ2V0Q29tcHV0ZWREaW1lbnNpb24gPSBmdW5jdGlvbihlbCwgc3RyQ3NzUnVsZSl7XG4gIHZhciBzdHJWYWx1ZSA9ICcnO1xuICBpZihkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKXtcbiAgICBzdHJWYWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWwsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKHN0ckNzc1J1bGUpO1xuXG4gIH0gZWxzZSBpZihlbC5jdXJyZW50U3R5bGUpe1xuICAgIC8vIElFOCBXaWR0aC9IZWlnaHQgc3VwcG9ydFxuICAgIHN0clZhbHVlID0gZWxbJ2NsaWVudCcrc3RyQ3NzUnVsZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgc3RyQ3NzUnVsZS5zdWJzdHIoMSldICsgJ3B4JztcbiAgfVxuICByZXR1cm4gc3RyVmFsdWU7XG59O1xuXG4vKipcbiAqIEluc2VydCBhbiBlbGVtZW50IGFzIHRoZSBmaXJzdCBjaGlsZCBub2RlIG9mIGFub3RoZXJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGNoaWxkICAgRWxlbWVudCB0byBpbnNlcnRcbiAqIEBwYXJhbSAge1t0eXBlXX0gcGFyZW50IEVsZW1lbnQgdG8gaW5zZXJ0IGNoaWxkIGludG9cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5pbnNlcnRGaXJzdCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpe1xuICBpZiAocGFyZW50LmZpcnN0Q2hpbGQpIHtcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwYXJlbnQuZmlyc3RDaGlsZCk7XG4gIH0gZWxzZSB7XG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcbiAgfVxufTtcblxuLyoqXG4gKiBPYmplY3QgdG8gaG9sZCBicm93c2VyIHN1cHBvcnQgaW5mb3JtYXRpb25cbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuc3VwcG9ydCA9IHt9O1xuXG4vKipcbiAqIFNob3J0aGFuZCBmb3IgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKVxuICogQWxzbyBhbGxvd3MgZm9yIENTUyAoalF1ZXJ5KSBJRCBzeW50YXguIEJ1dCBub3RoaW5nIG90aGVyIHRoYW4gSURzLlxuICogQHBhcmFtICB7U3RyaW5nfSBpZCAgRWxlbWVudCBJRFxuICogQHJldHVybiB7RWxlbWVudH0gICAgRWxlbWVudCB3aXRoIHN1cHBsaWVkIElEXG4gKiBAcHJpdmF0ZVxuICovXG52anMuZWwgPSBmdW5jdGlvbihpZCl7XG4gIGlmIChpZC5pbmRleE9mKCcjJykgPT09IDApIHtcbiAgICBpZCA9IGlkLnNsaWNlKDEpO1xuICB9XG5cbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcbn07XG5cbi8qKlxuICogRm9ybWF0IHNlY29uZHMgYXMgYSB0aW1lIHN0cmluZywgSDpNTTpTUyBvciBNOlNTXG4gKiBTdXBwbHlpbmcgYSBndWlkZSAoaW4gc2Vjb25kcykgd2lsbCBmb3JjZSBhIG51bWJlciBvZiBsZWFkaW5nIHplcm9zXG4gKiB0byBjb3ZlciB0aGUgbGVuZ3RoIG9mIHRoZSBndWlkZVxuICogQHBhcmFtICB7TnVtYmVyfSBzZWNvbmRzIE51bWJlciBvZiBzZWNvbmRzIHRvIGJlIHR1cm5lZCBpbnRvIGEgc3RyaW5nXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGd1aWRlICAgTnVtYmVyIChpbiBzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nIGFmdGVyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgVGltZSBmb3JtYXR0ZWQgYXMgSDpNTTpTUyBvciBNOlNTXG4gKiBAcHJpdmF0ZVxuICovXG52anMuZm9ybWF0VGltZSA9IGZ1bmN0aW9uKHNlY29uZHMsIGd1aWRlKSB7XG4gIC8vIERlZmF1bHQgdG8gdXNpbmcgc2Vjb25kcyBhcyBndWlkZVxuICBndWlkZSA9IGd1aWRlIHx8IHNlY29uZHM7XG4gIHZhciBzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxuICAgICAgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwICUgNjApLFxuICAgICAgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApLFxuICAgICAgZ20gPSBNYXRoLmZsb29yKGd1aWRlIC8gNjAgJSA2MCksXG4gICAgICBnaCA9IE1hdGguZmxvb3IoZ3VpZGUgLyAzNjAwKTtcblxuICAvLyBoYW5kbGUgaW52YWxpZCB0aW1lc1xuICBpZiAoaXNOYU4oc2Vjb25kcykgfHwgc2Vjb25kcyA9PT0gSW5maW5pdHkpIHtcbiAgICAvLyAnLScgaXMgZmFsc2UgZm9yIGFsbCByZWxhdGlvbmFsIG9wZXJhdG9ycyAoZS5nLiA8LCA+PSkgc28gdGhpcyBzZXR0aW5nXG4gICAgLy8gd2lsbCBhZGQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGZpZWxkcyBzcGVjaWZpZWQgYnkgdGhlIGd1aWRlXG4gICAgaCA9IG0gPSBzID0gJy0nO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGhvdXJzXG4gIGggPSAoaCA+IDAgfHwgZ2ggPiAwKSA/IGggKyAnOicgOiAnJztcblxuICAvLyBJZiBob3VycyBhcmUgc2hvd2luZywgd2UgbWF5IG5lZWQgdG8gYWRkIGEgbGVhZGluZyB6ZXJvLlxuICAvLyBBbHdheXMgc2hvdyBhdCBsZWFzdCBvbmUgZGlnaXQgb2YgbWludXRlcy5cbiAgbSA9ICgoKGggfHwgZ20gPj0gMTApICYmIG0gPCAxMCkgPyAnMCcgKyBtIDogbSkgKyAnOic7XG5cbiAgLy8gQ2hlY2sgaWYgbGVhZGluZyB6ZXJvIGlzIG5lZWQgZm9yIHNlY29uZHNcbiAgcyA9IChzIDwgMTApID8gJzAnICsgcyA6IHM7XG5cbiAgcmV0dXJuIGggKyBtICsgcztcbn07XG5cbi8vIEF0dGVtcHQgdG8gYmxvY2sgdGhlIGFiaWxpdHkgdG8gc2VsZWN0IHRleHQgd2hpbGUgZHJhZ2dpbmcgY29udHJvbHNcbnZqcy5ibG9ja1RleHRTZWxlY3Rpb24gPSBmdW5jdGlvbigpe1xuICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XG4gIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfTtcbn07XG4vLyBUdXJuIG9mZiB0ZXh0IHNlbGVjdGlvbiBibG9ja2luZ1xudmpzLnVuYmxvY2tUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24oKXsgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07IH07XG5cbi8qKlxuICogVHJpbSB3aGl0ZXNwYWNlIGZyb20gdGhlIGVuZHMgb2YgYSBzdHJpbmcuXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdHJpbVxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVHJpbW1lZCBzdHJpbmdcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy50cmltID0gZnVuY3Rpb24oc3RyKXtcbiAgcmV0dXJuIChzdHIrJycpLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn07XG5cbi8qKlxuICogU2hvdWxkIHJvdW5kIG9mZiBhIG51bWJlciB0byBhIGRlY2ltYWwgcGxhY2VcbiAqIEBwYXJhbSAge051bWJlcn0gbnVtIE51bWJlciB0byByb3VuZFxuICogQHBhcmFtICB7TnVtYmVyfSBkZWMgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHJvdW5kIHRvXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICBSb3VuZGVkIG51bWJlclxuICogQHByaXZhdGVcbiAqL1xudmpzLnJvdW5kID0gZnVuY3Rpb24obnVtLCBkZWMpIHtcbiAgaWYgKCFkZWMpIHsgZGVjID0gMDsgfVxuICByZXR1cm4gTWF0aC5yb3VuZChudW0qTWF0aC5wb3coMTAsZGVjKSkvTWF0aC5wb3coMTAsZGVjKTtcbn07XG5cbi8qKlxuICogU2hvdWxkIGNyZWF0ZSBhIGZha2UgVGltZVJhbmdlIG9iamVjdFxuICogTWltaWNzIGFuIEhUTUw1IHRpbWUgcmFuZ2UgaW5zdGFuY2UsIHdoaWNoIGhhcyBmdW5jdGlvbnMgdGhhdFxuICogcmV0dXJuIHRoZSBzdGFydCBhbmQgZW5kIHRpbWVzIGZvciBhIHJhbmdlXG4gKiBUaW1lUmFuZ2VzIGFyZSByZXR1cm5lZCBieSB0aGUgYnVmZmVyZWQoKSBtZXRob2RcbiAqIEBwYXJhbSAge051bWJlcn0gc3RhcnQgU3RhcnQgdGltZSBpbiBzZWNvbmRzXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGVuZCAgIEVuZCB0aW1lIGluIHNlY29uZHNcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgRmFrZSBUaW1lUmFuZ2Ugb2JqZWN0XG4gKiBAcHJpdmF0ZVxuICovXG52anMuY3JlYXRlVGltZVJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCl7XG4gIHJldHVybiB7XG4gICAgbGVuZ3RoOiAxLFxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHN0YXJ0OyB9LFxuICAgIGVuZDogZnVuY3Rpb24oKSB7IHJldHVybiBlbmQ7IH1cbiAgfTtcbn07XG5cbi8qKlxuICogU2ltcGxlIGh0dHAgcmVxdWVzdCBmb3IgcmV0cmlldmluZyBleHRlcm5hbCBmaWxlcyAoZS5nLiB0ZXh0IHRyYWNrcylcbiAqIEBwYXJhbSAge1N0cmluZ30gdXJsICAgICAgICAgICBVUkwgb2YgcmVzb3VyY2VcbiAqIEBwYXJhbSAge0Z1bmN0aW9uPX0gb25TdWNjZXNzICBTdWNjZXNzIGNhbGxiYWNrXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IG9uRXJyb3IgICAgRXJyb3IgY2FsbGJhY2tcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5nZXQgPSBmdW5jdGlvbih1cmwsIG9uU3VjY2Vzcywgb25FcnJvcil7XG4gIHZhciBsb2NhbCwgcmVxdWVzdDtcblxuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHRyeSB7IHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoIChlKSB7fVxuICAgICAgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2ggKGYpIHt9XG4gICAgICB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoIChnKSB7fVxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdC4nKTtcbiAgICB9O1xuICB9XG5cbiAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICB0cnkge1xuICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgb25FcnJvcihlKTtcbiAgfVxuXG4gIGxvY2FsID0gKHVybC5pbmRleE9mKCdmaWxlOicpID09PSAwIHx8ICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdmaWxlOicpID09PSAwICYmIHVybC5pbmRleE9mKCdodHRwJykgPT09IC0xKSk7XG5cbiAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCBsb2NhbCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xuICAgICAgICBvblN1Y2Nlc3MocmVxdWVzdC5yZXNwb25zZVRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICBvbkVycm9yKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdHJ5IHtcbiAgICByZXF1ZXN0LnNlbmQoKTtcbiAgfSBjYXRjaChlKSB7XG4gICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgIG9uRXJyb3IoZSk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIEFkZCB0byBsb2NhbCBzdG9yYWdlIChtYXkgcmVtb3ZlYWJsZSlcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5zZXRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgdHJ5IHtcbiAgICAvLyBJRSB3YXMgdGhyb3dpbmcgZXJyb3JzIHJlZmVyZW5jaW5nIHRoZSB2YXIgYW55d2hlcmUgd2l0aG91dCB0aGlzXG4gICAgdmFyIGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UgfHwgZmFsc2U7XG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UpIHsgcmV0dXJuOyB9XG4gICAgbG9jYWxTdG9yYWdlW2tleV0gPSB2YWx1ZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgaWYgKGUuY29kZSA9PSAyMiB8fCBlLmNvZGUgPT0gMTAxNCkgeyAvLyBXZWJraXQgPT0gMjIgLyBGaXJlZm94ID09IDEwMTRcbiAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBGdWxsIChWaWRlb0pTKScsIGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZS5jb2RlID09IDE4KSB7XG4gICAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBub3QgYWxsb3dlZCAoVmlkZW9KUyknLCBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBFcnJvciAoVmlkZW9KUyknLCBlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogR2V0IGFib3NvbHV0ZSB2ZXJzaW9uIG9mIHJlbGF0aXZlIFVSTC4gVXNlZCB0byB0ZWxsIGZsYXNoIGNvcnJlY3QgVVJMLlxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NzA4MzIvZ2V0dGluZy1hbi1hYnNvbHV0ZS11cmwtZnJvbS1hLXJlbGF0aXZlLW9uZS1pZTYtaXNzdWVcbiAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFVSTCB0byBtYWtlIGFic29sdXRlXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICBBYnNvbHV0ZSBVUkxcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5nZXRBYnNvbHV0ZVVSTCA9IGZ1bmN0aW9uKHVybCl7XG5cbiAgLy8gQ2hlY2sgaWYgYWJzb2x1dGUgVVJMXG4gIGlmICghdXJsLm1hdGNoKC9eaHR0cHM/OlxcL1xcLy8pKSB7XG4gICAgLy8gQ29udmVydCB0byBhYnNvbHV0ZSBVUkwuIEZsYXNoIGhvc3RlZCBvZmYtc2l0ZSBuZWVkcyBhbiBhYnNvbHV0ZSBVUkwuXG4gICAgdXJsID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgICBpbm5lckhUTUw6ICc8YSBocmVmPVwiJyt1cmwrJ1wiPng8L2E+J1xuICAgIH0pLmZpcnN0Q2hpbGQuaHJlZjtcbiAgfVxuXG4gIHJldHVybiB1cmw7XG59O1xuXG4vLyB1c2FnZTogbG9nKCdpbnNpZGUgY29vbEZ1bmMnLHRoaXMsYXJndW1lbnRzKTtcbi8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMDkvbG9nLWEtbGlnaHR3ZWlnaHQtd3JhcHBlci1mb3ItY29uc29sZWxvZy9cbnZqcy5sb2cgPSBmdW5jdGlvbigpe1xuICB2anMubG9nLmhpc3RvcnkgPSB2anMubG9nLmhpc3RvcnkgfHwgW107ICAgLy8gc3RvcmUgbG9ncyB0byBhbiBhcnJheSBmb3IgcmVmZXJlbmNlXG4gIHZqcy5sb2cuaGlzdG9yeS5wdXNoKGFyZ3VtZW50cyk7XG4gIGlmKHdpbmRvdy5jb25zb2xlKXtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XG4gIH1cbn07XG5cbi8vIE9mZnNldCBMZWZ0XG4vLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgdGVjaG5pcXVlIGZyb20gSm9obiBSZXNpZyBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvZ2V0Ym91bmRpbmdjbGllbnRyZWN0LWlzLWF3ZXNvbWUvXG52anMuZmluZFBvc2l0aW9uID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgYm94LCBkb2NFbCwgYm9keSwgY2xpZW50TGVmdCwgc2Nyb2xsTGVmdCwgbGVmdCwgY2xpZW50VG9wLCBzY3JvbGxUb3AsIHRvcDtcblxuICAgIGlmIChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgZWwucGFyZW50Tm9kZSkge1xuICAgICAgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgaWYgKCFib3gpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGxlZnQ6IDAsXG4gICAgICAgIHRvcDogMFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcblxuICAgIGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgIHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0O1xuXG4gICAgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3A7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogbGVmdCxcbiAgICAgIHRvcDogdG9wXG4gICAgfTtcbn07XG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgUGxheWVyIENvbXBvbmVudCAtIEJhc2UgY2xhc3MgZm9yIGFsbCBVSSBvYmplY3RzXG4gKlxuICovXG5cbi8qKlxuICogQmFzZSBVSSBDb21wb25lbnQgY2xhc3NcbiAqXG4gKiBDb21wb25lbnRzIGFyZSBlbWJlZGRhYmxlIFVJIG9iamVjdHMgdGhhdCBhcmUgcmVwcmVzZW50ZWQgYnkgYm90aCBhXG4gKiBqYXZhc2NyaXB0IG9iamVjdCBhbmQgYW4gZWxlbWVudCBpbiB0aGUgRE9NLiBUaGV5IGNhbiBiZSBjaGlsZHJlbiBvZiBvdGhlclxuICogY29tcG9uZW50cywgYW5kIGNhbiBoYXZlIG1hbnkgY2hpbGRyZW4gdGhlbXNlbHZlcy5cbiAqXG4gKiAgICAgLy8gYWRkaW5nIGEgYnV0dG9uIHRvIHRoZSBwbGF5ZXJcbiAqICAgICB2YXIgYnV0dG9uID0gcGxheWVyLmFkZENoaWxkKCdidXR0b24nKTtcbiAqICAgICBidXR0b24uZWwoKTsgLy8gLT4gYnV0dG9uIGVsZW1lbnRcbiAqXG4gKiAgICAgPGRpdiBjbGFzcz1cInZpZGVvLWpzXCI+XG4gKiAgICAgICA8ZGl2IGNsYXNzPVwidmpzLWJ1dHRvblwiPkJ1dHRvbjwvZGl2PlxuICogICAgIDwvZGl2PlxuICpcbiAqIENvbXBvbmVudHMgYXJlIGFsc28gZXZlbnQgZW1pdHRlcnMuXG4gKlxuICogICAgIGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICogICAgICAgLy9jb25zb2xlLmxvZygnQnV0dG9uIENsaWNrZWQhJyk7XG4gKiAgICAgfSk7XG4gKlxuICogICAgIGJ1dHRvbi50cmlnZ2VyKCdjdXN0b21ldmVudCcpO1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBwbGF5ZXIgIE1haW4gUGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyB2anMuQ29yZU9iamVjdFxuICovXG52anMuQ29tcG9uZW50ID0gdmpzLkNvcmVPYmplY3QuZXh0ZW5kKHtcbiAgLyoqXG4gICAqIHRoZSBjb25zdHJ1Y3RvciBmdW5jaXRvbiBmb3IgdGhlIGNsYXNzXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XG4gICAgdGhpcy5wbGF5ZXJfID0gcGxheWVyO1xuXG4gICAgLy8gTWFrZSBhIGNvcHkgb2YgcHJvdG90eXBlLm9wdGlvbnNfIHRvIHByb3RlY3QgYWdhaW5zdCBvdmVycmlkaW5nIGdsb2JhbCBkZWZhdWx0c1xuICAgIHRoaXMub3B0aW9uc18gPSB2anMub2JqLmNvcHkodGhpcy5vcHRpb25zXyk7XG5cbiAgICAvLyBVcGRhdGVkIG9wdGlvbnMgd2l0aCBzdXBwbGllZCBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyhvcHRpb25zKTtcblxuICAgIC8vIEdldCBJRCBmcm9tIG9wdGlvbnMsIGVsZW1lbnQsIG9yIGNyZWF0ZSB1c2luZyBwbGF5ZXIgSUQgYW5kIHVuaXF1ZSBJRFxuICAgIHRoaXMuaWRfID0gb3B0aW9uc1snaWQnXSB8fCAoKG9wdGlvbnNbJ2VsJ10gJiYgb3B0aW9uc1snZWwnXVsnaWQnXSkgPyBvcHRpb25zWydlbCddWydpZCddIDogcGxheWVyLmlkKCkgKyAnX2NvbXBvbmVudF8nICsgdmpzLmd1aWQrKyApO1xuXG4gICAgdGhpcy5uYW1lXyA9IG9wdGlvbnNbJ25hbWUnXSB8fCBudWxsO1xuXG4gICAgLy8gQ3JlYXRlIGVsZW1lbnQgaWYgb25lIHdhc24ndCBwcm92aWRlZCBpbiBvcHRpb25zXG4gICAgdGhpcy5lbF8gPSBvcHRpb25zWydlbCddIHx8IHRoaXMuY3JlYXRlRWwoKTtcblxuICAgIHRoaXMuY2hpbGRyZW5fID0gW107XG4gICAgdGhpcy5jaGlsZEluZGV4XyA9IHt9O1xuICAgIHRoaXMuY2hpbGROYW1lSW5kZXhfID0ge307XG5cbiAgICAvLyBBZGQgYW55IGNoaWxkIGNvbXBvbmVudHMgaW4gb3B0aW9uc1xuICAgIHRoaXMuaW5pdENoaWxkcmVuKCk7XG5cbiAgICB0aGlzLnJlYWR5KHJlYWR5KTtcbiAgICAvLyBEb24ndCB3YW50IHRvIHRyaWdnZXIgcmVhZHkgaGVyZSBvciBpdCB3aWxsIGJlZm9yZSBpbml0IGlzIGFjdHVhbGx5XG4gICAgLy8gZmluaXNoZWQgZm9yIGFsbCBjaGlsZHJlbiB0aGF0IHJ1biB0aGlzIGNvbnN0cnVjdG9yXG4gIH1cbn0pO1xuXG4vKipcbiAqIERpc3Bvc2Ugb2YgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGNoaWxkIGNvbXBvbmVudHNcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMudHJpZ2dlcignZGlzcG9zZScpO1xuXG4gIC8vIERpc3Bvc2UgYWxsIGNoaWxkcmVuLlxuICBpZiAodGhpcy5jaGlsZHJlbl8pIHtcbiAgICBmb3IgKHZhciBpID0gdGhpcy5jaGlsZHJlbl8ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuX1tpXS5kaXNwb3NlKSB7XG4gICAgICAgIHRoaXMuY2hpbGRyZW5fW2ldLmRpc3Bvc2UoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBEZWxldGUgY2hpbGQgcmVmZXJlbmNlc1xuICB0aGlzLmNoaWxkcmVuXyA9IG51bGw7XG4gIHRoaXMuY2hpbGRJbmRleF8gPSBudWxsO1xuICB0aGlzLmNoaWxkTmFtZUluZGV4XyA9IG51bGw7XG5cbiAgLy8gUmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMuXG4gIHRoaXMub2ZmKCk7XG5cbiAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbiAgaWYgKHRoaXMuZWxfLnBhcmVudE5vZGUpIHtcbiAgICB0aGlzLmVsXy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxfKTtcbiAgfVxuXG4gIHZqcy5yZW1vdmVEYXRhKHRoaXMuZWxfKTtcbiAgdGhpcy5lbF8gPSBudWxsO1xufTtcblxuLyoqXG4gKiBSZWZlcmVuY2UgdG8gbWFpbiBwbGF5ZXIgaW5zdGFuY2VcbiAqXG4gKiBAdHlwZSB7dmpzLlBsYXllcn1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnBsYXllcl8gPSB0cnVlO1xuXG4vKipcbiAqIFJldHVybiB0aGUgY29tcG9uZW50J3MgcGxheWVyXG4gKlxuICogQHJldHVybiB7dmpzLlBsYXllcn1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucGxheWVyID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMucGxheWVyXztcbn07XG5cbi8qKlxuICogVGhlIGNvbXBvbmVudCdzIG9wdGlvbnMgb2JqZWN0XG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9wdGlvbnNfO1xuXG4vKipcbiAqIERlZXAgbWVyZ2Ugb2Ygb3B0aW9ucyBvYmplY3RzXG4gKlxuICogV2hlbmV2ZXIgYSBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qgb24gYm90aCBvcHRpb25zIG9iamVjdHNcbiAqIHRoZSB0d28gcHJvcGVydGllcyB3aWxsIGJlIG1lcmdlZCB1c2luZyB2anMub2JqLmRlZXBNZXJnZS5cbiAqXG4gKiBUaGlzIGlzIHVzZWQgZm9yIG1lcmdpbmcgb3B0aW9ucyBmb3IgY2hpbGQgY29tcG9uZW50cy4gV2VcbiAqIHdhbnQgaXQgdG8gYmUgZWFzeSB0byBvdmVycmlkZSBpbmRpdmlkdWFsIG9wdGlvbnMgb24gYSBjaGlsZFxuICogY29tcG9uZW50IHdpdGhvdXQgaGF2aW5nIHRvIHJld3JpdGUgYWxsIHRoZSBvdGhlciBkZWZhdWx0IG9wdGlvbnMuXG4gKlxuICogICAgIFBhcmVudC5wcm90b3R5cGUub3B0aW9uc18gPSB7XG4gKiAgICAgICBjaGlsZHJlbjoge1xuICogICAgICAgICAnY2hpbGRPbmUnOiB7ICdmb28nOiAnYmFyJywgJ2FzZGYnOiAnZmRzYScgfSxcbiAqICAgICAgICAgJ2NoaWxkVHdvJzoge30sXG4gKiAgICAgICAgICdjaGlsZFRocmVlJzoge31cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKiAgICAgbmV3T3B0aW9ucyA9IHtcbiAqICAgICAgIGNoaWxkcmVuOiB7XG4gKiAgICAgICAgICdjaGlsZE9uZSc6IHsgJ2Zvbyc6ICdiYXonLCAnYWJjJzogJzEyMycgfVxuICogICAgICAgICAnY2hpbGRUd28nOiBudWxsLFxuICogICAgICAgICAnY2hpbGRGb3VyJzoge31cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKlxuICogICAgIHRoaXMub3B0aW9ucyhuZXdPcHRpb25zKTtcbiAqXG4gKiBSRVNVTFRcbiAqXG4gKiAgICAge1xuICogICAgICAgY2hpbGRyZW46IHtcbiAqICAgICAgICAgJ2NoaWxkT25lJzogeyAnZm9vJzogJ2JheicsICdhc2RmJzogJ2Zkc2EnLCAnYWJjJzogJzEyMycgfSxcbiAqICAgICAgICAgJ2NoaWxkVHdvJzogbnVsbCwgLy8gRGlzYWJsZWQuIFdvbid0IGJlIGluaXRpYWxpemVkLlxuICogICAgICAgICAnY2hpbGRUaHJlZSc6IHt9LFxuICogICAgICAgICAnY2hpbGRGb3VyJzoge31cbiAqICAgICAgIH1cbiAqICAgICB9XG4gKlxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogT2JqZWN0IHdob3NlIHZhbHVlcyB3aWxsIGJlIG92ZXJ3cml0dGVuXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICBORVcgbWVyZ2VkIG9iamVjdC4gRG9lcyBub3QgcmV0dXJuIG9iajEuXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihvYmope1xuICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnNfO1xuXG4gIHJldHVybiB0aGlzLm9wdGlvbnNfID0gdmpzLm9iai5kZWVwTWVyZ2UodGhpcy5vcHRpb25zXywgb2JqKTtcbn07XG5cbi8qKlxuICogVGhlIERPTSBlbGVtZW50IGZvciB0aGUgY29tcG9uZW50XG4gKlxuICogQHR5cGUge0VsZW1lbnR9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5lbF87XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBjb21wb25lbnQncyBET00gZWxlbWVudFxuICpcbiAqIEBwYXJhbSAge1N0cmluZz19IHRhZ05hbWUgIEVsZW1lbnQncyBub2RlIHR5cGUuIGUuZy4gJ2RpdidcbiAqIEBwYXJhbSAge09iamVjdD19IGF0dHJpYnV0ZXMgQW4gb2JqZWN0IG9mIGVsZW1lbnQgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBiZSBzZXQgb24gdGhlIGVsZW1lbnRcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odGFnTmFtZSwgYXR0cmlidXRlcyl7XG4gIHJldHVybiB2anMuY3JlYXRlRWwodGFnTmFtZSwgYXR0cmlidXRlcyk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgY29tcG9uZW50J3MgRE9NIGVsZW1lbnRcbiAqXG4gKiAgICAgdmFyIGRvbUVsID0gbXlDb21wb25lbnQuZWwoKTtcbiAqXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5lbCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmVsXztcbn07XG5cbi8qKlxuICogQW4gb3B0aW9uYWwgZWxlbWVudCB3aGVyZSwgaWYgZGVmaW5lZCwgY2hpbGRyZW4gd2lsbCBiZSBpbnNlcnRlZCBpbnN0ZWFkIG9mXG4gKiBkaXJlY3RseSBpbiBgZWxfYFxuICpcbiAqIEB0eXBlIHtFbGVtZW50fVxuICogQHByaXZhdGVcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY29udGVudEVsXztcblxuLyoqXG4gKiBSZXR1cm4gdGhlIGNvbXBvbmVudCdzIERPTSBlbGVtZW50IGZvciBlbWJlZGRpbmcgY29udGVudC5cbiAqIFdpbGwgZWl0aGVyIGJlIGVsXyBvciBhIG5ldyBlbGVtZW50IGRlZmluZWQgaW4gY3JlYXRlRWwuXG4gKlxuICogQHJldHVybiB7RWxlbWVudH1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY29udGVudEVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMuY29udGVudEVsXyB8fCB0aGlzLmVsXztcbn07XG5cbi8qKlxuICogVGhlIElEIGZvciB0aGUgY29tcG9uZW50XG4gKlxuICogQHR5cGUge1N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlkXztcblxuLyoqXG4gKiBHZXQgdGhlIGNvbXBvbmVudCdzIElEXG4gKlxuICogICAgIHZhciBpZCA9IG15Q29tcG9uZW50LmlkKCk7XG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmlkXztcbn07XG5cbi8qKlxuICogVGhlIG5hbWUgZm9yIHRoZSBjb21wb25lbnQuIE9mdGVuIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBjb21wb25lbnQuXG4gKlxuICogQHR5cGUge1N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm5hbWVfO1xuXG4vKipcbiAqIEdldCB0aGUgY29tcG9uZW50J3MgbmFtZS4gVGhlIG5hbWUgaXMgb2Z0ZW4gdXNlZCB0byByZWZlcmVuY2UgdGhlIGNvbXBvbmVudC5cbiAqXG4gKiAgICAgdmFyIG5hbWUgPSBteUNvbXBvbmVudC5uYW1lKCk7XG4gKlxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMubmFtZV87XG59O1xuXG4vKipcbiAqIEFycmF5IG9mIGNoaWxkIGNvbXBvbmVudHNcbiAqXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZHJlbl87XG5cbi8qKlxuICogR2V0IGFuIGFycmF5IG9mIGFsbCBjaGlsZCBjb21wb25lbnRzXG4gKlxuICogICAgIHZhciBraWRzID0gbXlDb21wb25lbnQuY2hpbGRyZW4oKTtcbiAqXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGNoaWxkcmVuXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW5fO1xufTtcblxuLyoqXG4gKiBPYmplY3Qgb2YgY2hpbGQgY29tcG9uZW50cyBieSBJRFxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZEluZGV4XztcblxuLyoqXG4gKiBSZXR1cm5zIGEgY2hpbGQgY29tcG9uZW50IHdpdGggdGhlIHByb3ZpZGVkIElEXG4gKlxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZ2V0Q2hpbGRCeUlkID0gZnVuY3Rpb24oaWQpe1xuICByZXR1cm4gdGhpcy5jaGlsZEluZGV4X1tpZF07XG59O1xuXG4vKipcbiAqIE9iamVjdCBvZiBjaGlsZCBjb21wb25lbnRzIGJ5IG5hbWVcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY2hpbGROYW1lSW5kZXhfO1xuXG4vKipcbiAqIFJldHVybnMgYSBjaGlsZCBjb21wb25lbnQgd2l0aCB0aGUgcHJvdmlkZWQgSURcbiAqXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5nZXRDaGlsZCA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gdGhpcy5jaGlsZE5hbWVJbmRleF9bbmFtZV07XG59O1xuXG4vKipcbiAqIEFkZHMgYSBjaGlsZCBjb21wb25lbnQgaW5zaWRlIHRoaXMgY29tcG9uZW50XG4gKlxuICogICAgIG15Q29tcG9uZW50LmVsKCk7XG4gKiAgICAgLy8gLT4gPGRpdiBjbGFzcz0nbXktY29tcG9uZW50Jz48L2Rpdj5cbiAqICAgICBteUNvbW9uZW50LmNoaWxkcmVuKCk7XG4gKiAgICAgLy8gW2VtcHR5IGFycmF5XVxuICpcbiAqICAgICB2YXIgbXlCdXR0b24gPSBteUNvbXBvbmVudC5hZGRDaGlsZCgnTXlCdXR0b24nKTtcbiAqICAgICAvLyAtPiA8ZGl2IGNsYXNzPSdteS1jb21wb25lbnQnPjxkaXYgY2xhc3M9XCJteS1idXR0b25cIj5teUJ1dHRvbjxkaXY+PC9kaXY+XG4gKiAgICAgLy8gLT4gbXlCdXR0b24gPT09IG15Q29tb25lbnQuY2hpbGRyZW4oKVswXTtcbiAqXG4gKiBQYXNzIGluIG9wdGlvbnMgZm9yIGNoaWxkIGNvbnN0cnVjdG9ycyBhbmQgb3B0aW9ucyBmb3IgY2hpbGRyZW4gb2YgdGhlIGNoaWxkXG4gKlxuICogICAgdmFyIG15QnV0dG9uID0gbXlDb21wb25lbnQuYWRkQ2hpbGQoJ015QnV0dG9uJywge1xuICogICAgICB0ZXh0OiAnUHJlc3MgTWUnLFxuICogICAgICBjaGlsZHJlbjoge1xuICogICAgICAgIGJ1dHRvbkNoaWxkRXhhbXBsZToge1xuICogICAgICAgICAgYnV0dG9uQ2hpbGRPcHRpb246IHRydWVcbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIH0pO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfHZqcy5Db21wb25lbnR9IGNoaWxkIFRoZSBjbGFzcyBuYW1lIG9yIGluc3RhbmNlIG9mIGEgY2hpbGQgdG8gYWRkXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgT3B0aW9ucywgaW5jbHVkaW5nIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIGNoaWxkcmVuIG9mIHRoZSBjaGlsZC5cbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjaGlsZCBjb21wb25lbnQgKGNyZWF0ZWQgYnkgdGhpcyBwcm9jZXNzIGlmIGEgc3RyaW5nIHdhcyB1c2VkKVxuICogQHN1cHByZXNzIHthY2Nlc3NDb250cm9sc3xjaGVja1JlZ0V4cHxjaGVja1R5cGVzfGNoZWNrVmFyc3xjb25zdHxjb25zdGFudFByb3BlcnR5fGRlcHJlY2F0ZWR8ZHVwbGljYXRlfGVzNVN0cmljdHxmaWxlb3ZlcnZpZXdUYWdzfGdsb2JhbFRoaXN8aW52YWxpZENhc3RzfG1pc3NpbmdQcm9wZXJ0aWVzfG5vblN0YW5kYXJkSnNEb2NzfHN0cmljdE1vZHVsZURlcENoZWNrfHVuZGVmaW5lZE5hbWVzfHVuZGVmaW5lZFZhcnN8dW5rbm93bkRlZmluZXN8dXNlbGVzc0NvZGV8dmlzaWJpbGl0eX1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCwgb3B0aW9ucyl7XG4gIHZhciBjb21wb25lbnQsIGNvbXBvbmVudENsYXNzLCBjb21wb25lbnROYW1lLCBjb21wb25lbnRJZDtcblxuICAvLyBJZiBzdHJpbmcsIGNyZWF0ZSBuZXcgY29tcG9uZW50IHdpdGggb3B0aW9uc1xuICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xuXG4gICAgY29tcG9uZW50TmFtZSA9IGNoaWxkO1xuXG4gICAgLy8gTWFrZSBzdXJlIG9wdGlvbnMgaXMgYXQgbGVhc3QgYW4gZW1wdHkgb2JqZWN0IHRvIHByb3RlY3QgYWdhaW5zdCBlcnJvcnNcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICAgIC8vIEFzc3VtZSBuYW1lIG9mIHNldCBpcyBhIGxvd2VyY2FzZWQgbmFtZSBvZiB0aGUgVUkgQ2xhc3MgKFBsYXlCdXR0b24sIGV0Yy4pXG4gICAgY29tcG9uZW50Q2xhc3MgPSBvcHRpb25zWydjb21wb25lbnRDbGFzcyddIHx8IHZqcy5jYXBpdGFsaXplKGNvbXBvbmVudE5hbWUpO1xuXG4gICAgLy8gU2V0IG5hbWUgdGhyb3VnaCBvcHRpb25zXG4gICAgb3B0aW9uc1snbmFtZSddID0gY29tcG9uZW50TmFtZTtcblxuICAgIC8vIENyZWF0ZSBhIG5ldyBvYmplY3QgJiBlbGVtZW50IGZvciB0aGlzIGNvbnRyb2xzIHNldFxuICAgIC8vIElmIHRoZXJlJ3Mgbm8gLnBsYXllcl8sIHRoaXMgaXMgYSBwbGF5ZXJcbiAgICAvLyBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiAnaW5jb21wbGV0ZSBhbGlhcycgd2FybmluZyBpZiB3ZSB1c2UgdGhlIHZqcyB2YXJpYWJsZSBkaXJlY3RseS5cbiAgICAvLyBFdmVyeSBjbGFzcyBzaG91bGQgYmUgZXhwb3J0ZWQsIHNvIHRoaXMgc2hvdWxkIG5ldmVyIGJlIGEgcHJvYmxlbSBoZXJlLlxuICAgIGNvbXBvbmVudCA9IG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVtjb21wb25lbnRDbGFzc10odGhpcy5wbGF5ZXJfIHx8IHRoaXMsIG9wdGlvbnMpO1xuXG4gIC8vIGNoaWxkIGlzIGEgY29tcG9uZW50IGluc3RhbmNlXG4gIH0gZWxzZSB7XG4gICAgY29tcG9uZW50ID0gY2hpbGQ7XG4gIH1cblxuICB0aGlzLmNoaWxkcmVuXy5wdXNoKGNvbXBvbmVudCk7XG5cbiAgaWYgKHR5cGVvZiBjb21wb25lbnQuaWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICB0aGlzLmNoaWxkSW5kZXhfW2NvbXBvbmVudC5pZCgpXSA9IGNvbXBvbmVudDtcbiAgfVxuXG4gIC8vIElmIGEgbmFtZSB3YXNuJ3QgdXNlZCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudCwgY2hlY2sgaWYgd2UgY2FuIHVzZSB0aGVcbiAgLy8gbmFtZSBmdW5jdGlvbiBvZiB0aGUgY29tcG9uZW50XG4gIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IChjb21wb25lbnQubmFtZSAmJiBjb21wb25lbnQubmFtZSgpKTtcblxuICBpZiAoY29tcG9uZW50TmFtZSkge1xuICAgIHRoaXMuY2hpbGROYW1lSW5kZXhfW2NvbXBvbmVudE5hbWVdID0gY29tcG9uZW50O1xuICB9XG5cbiAgLy8gQWRkIHRoZSBVSSBvYmplY3QncyBlbGVtZW50IHRvIHRoZSBjb250YWluZXIgZGl2IChib3gpXG4gIC8vIEhhdmluZyBhbiBlbGVtZW50IGlzIG5vdCByZXF1aXJlZFxuICBpZiAodHlwZW9mIGNvbXBvbmVudFsnZWwnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBjb21wb25lbnRbJ2VsJ10oKSkge1xuICAgIHRoaXMuY29udGVudEVsKCkuYXBwZW5kQ2hpbGQoY29tcG9uZW50WydlbCddKCkpO1xuICB9XG5cbiAgLy8gUmV0dXJuIHNvIGl0IGNhbiBzdG9yZWQgb24gcGFyZW50IG9iamVjdCBpZiBkZXNpcmVkLlxuICByZXR1cm4gY29tcG9uZW50O1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBjaGlsZCBjb21wb25lbnQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIGxpc3Qgb2YgY2hpbGRyZW4sIGFuZCB0aGVcbiAqIGNoaWxkIGNvbXBvbmVudCdzIGVsZW1lbnQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIGVsZW1lbnRcbiAqXG4gKiBAcGFyYW0gIHt2anMuQ29tcG9uZW50fSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHJlbW92ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNvbXBvbmVudCl7XG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xuICAgIGNvbXBvbmVudCA9IHRoaXMuZ2V0Q2hpbGQoY29tcG9uZW50KTtcbiAgfVxuXG4gIGlmICghY29tcG9uZW50IHx8ICF0aGlzLmNoaWxkcmVuXykgcmV0dXJuO1xuXG4gIHZhciBjaGlsZEZvdW5kID0gZmFsc2U7XG4gIGZvciAodmFyIGkgPSB0aGlzLmNoaWxkcmVuXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgIGlmICh0aGlzLmNoaWxkcmVuX1tpXSA9PT0gY29tcG9uZW50KSB7XG4gICAgICBjaGlsZEZvdW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMuY2hpbGRyZW5fLnNwbGljZShpLDEpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFjaGlsZEZvdW5kKSByZXR1cm47XG5cbiAgdGhpcy5jaGlsZEluZGV4X1tjb21wb25lbnQuaWRdID0gbnVsbDtcbiAgdGhpcy5jaGlsZE5hbWVJbmRleF9bY29tcG9uZW50Lm5hbWVdID0gbnVsbDtcblxuICB2YXIgY29tcEVsID0gY29tcG9uZW50LmVsKCk7XG4gIGlmIChjb21wRWwgJiYgY29tcEVsLnBhcmVudE5vZGUgPT09IHRoaXMuY29udGVudEVsKCkpIHtcbiAgICB0aGlzLmNvbnRlbnRFbCgpLnJlbW92ZUNoaWxkKGNvbXBvbmVudC5lbCgpKTtcbiAgfVxufTtcblxuLyoqXG4gKiBBZGQgYW5kIGluaXRpYWxpemUgZGVmYXVsdCBjaGlsZCBjb21wb25lbnRzIGZyb20gb3B0aW9uc1xuICpcbiAqICAgICAvLyB3aGVuIGFuIGluc3RhbmNlIG9mIE15Q29tcG9uZW50IGlzIGNyZWF0ZWQsIGFsbCBjaGlsZHJlbiBpbiBvcHRpb25zXG4gKiAgICAgLy8gd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5zdGFuY2UgYnkgdGhlaXIgbmFtZSBzdHJpbmdzIGFuZCBvcHRpb25zXG4gKiAgICAgTXlDb21wb25lbnQucHJvdG90eXBlLm9wdGlvbnNfLmNoaWxkcmVuID0ge1xuICogICAgICAgbXlDaGlsZENvbXBvbmVudDoge1xuICogICAgICAgICBteUNoaWxkT3B0aW9uOiB0cnVlXG4gKiAgICAgICB9XG4gKiAgICAgfVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pbml0Q2hpbGRyZW4gPSBmdW5jdGlvbigpe1xuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc187XG5cbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9uc1snY2hpbGRyZW4nXSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcblxuICAgIC8vIExvb3AgdGhyb3VnaCBjb21wb25lbnRzIGFuZCBhZGQgdGhlbSB0byB0aGUgcGxheWVyXG4gICAgdmpzLm9iai5lYWNoKG9wdGlvbnNbJ2NoaWxkcmVuJ10sIGZ1bmN0aW9uKG5hbWUsIG9wdHMpe1xuICAgICAgLy8gQWxsb3cgZm9yIGRpc2FibGluZyBkZWZhdWx0IGNvbXBvbmVudHNcbiAgICAgIC8vIGUuZy4gdmpzLm9wdGlvbnNbJ2NoaWxkcmVuJ11bJ3Bvc3RlckltYWdlJ10gPSBmYWxzZVxuICAgICAgaWYgKG9wdHMgPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICAgIC8vIEFsbG93IHdhaXRpbmcgdG8gYWRkIGNvbXBvbmVudHMgdW50aWwgYSBzcGVjaWZpYyBldmVudCBpcyBjYWxsZWRcbiAgICAgIHZhciB0ZW1wQWRkID0gZnVuY3Rpb24oKXtcbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG5hbWUgb24gcGxheWVyLiBDb3VsZCBjYXVzZSBjb25mbGljdHMgd2l0aCBvdGhlciBwcm9wIG5hbWVzLCBidXQgaXQncyB3b3J0aCBtYWtpbmcgcmVmcyBlYXN5LlxuICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5hZGRDaGlsZChuYW1lLCBvcHRzKTtcbiAgICAgIH07XG5cbiAgICAgIGlmIChvcHRzWydsb2FkRXZlbnQnXSkge1xuICAgICAgICAvLyB0aGlzLm9uZShvcHRzLmxvYWRFdmVudCwgdGVtcEFkZClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlbXBBZGQoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBBbGxvd3Mgc3ViIGNvbXBvbmVudHMgdG8gc3RhY2sgQ1NTIGNsYXNzIG5hbWVzXG4gKlxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgY2xhc3MgbmFtZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcbiAgICAvLyBDaGlsZCBjbGFzc2VzIGNhbiBpbmNsdWRlIGEgZnVuY3Rpb24gdGhhdCBkb2VzOlxuICAgIC8vIHJldHVybiAnQ0xBU1MgTkFNRScgKyB0aGlzLl9zdXBlcigpO1xuICAgIHJldHVybiAnJztcbn07XG5cbi8qIEV2ZW50c1xuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhpcyBjb21wb25lbnQncyBlbGVtZW50XG4gKlxuICogICAgIHZhciBteUZ1bmMgPSBmdW5jdGlvbigpe1xuICogICAgICAgdmFyIG15UGxheWVyID0gdGhpcztcbiAqICAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIHRoZSBldmVudCBpcyBmaXJlZFxuICogICAgIH07XG4gKlxuICogICAgIG15UGxheWVyLm9uKFwiZXZlbnROYW1lXCIsIG15RnVuYyk7XG4gKlxuICogVGhlIGNvbnRleHQgd2lsbCBiZSB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gICB0eXBlIFRoZSBldmVudCB0eXBlIGUuZy4gJ2NsaWNrJ1xuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgVGhlIGV2ZW50IGxpc3RlbmVyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBzZWxmXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgZm4pe1xuICB2anMub24odGhpcy5lbF8sIHR5cGUsIHZqcy5iaW5kKHRoaXMsIGZuKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxuICpcbiAqICAgICBteUNvbXBvbmVudC5vZmYoXCJldmVudE5hbWVcIiwgbXlGdW5jKTtcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSAgIHR5cGUgRXZlbnQgdHlwZS4gV2l0aG91dCB0eXBlIGl0IHdpbGwgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMuXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IGZuICAgRXZlbnQgbGlzdGVuZXIuIFdpdGhvdXQgZm4gaXQgd2lsbCByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSB0eXBlLlxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgZm4pe1xuICB2anMub2ZmKHRoaXMuZWxfLCB0eXBlLCBmbik7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgdHJpZ2dlcmVkIG9ubHkgb25jZSBhbmQgdGhlbiByZW1vdmVkXG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgRXZlbnQgdHlwZVxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgRXZlbnQgbGlzdGVuZXJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uKHR5cGUsIGZuKSB7XG4gIHZqcy5vbmUodGhpcy5lbF8sIHR5cGUsIHZqcy5iaW5kKHRoaXMsIGZuKSk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBUcmlnZ2VyIGFuIGV2ZW50IG9uIGFuIGVsZW1lbnRcbiAqXG4gKiAgICAgbXlDb21wb25lbnQudHJpZ2dlcignZXZlbnROYW1lJyk7XG4gKlxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICB0eXBlICBUaGUgZXZlbnQgdHlwZSB0byB0cmlnZ2VyLCBlLmcuICdjbGljaydcbiAqIEBwYXJhbSAge0V2ZW50fE9iamVjdH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gdGhlIGxpc3RlbmVyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSAgICAgIHNlbGZcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KXtcbiAgdmpzLnRyaWdnZXIodGhpcy5lbF8sIHR5cGUsIGV2ZW50KTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKiBSZWFkeVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8qKlxuICogSXMgdGhlIGNvbXBvbmVudCBsb2FkZWRcbiAqIFRoaXMgY2FuIG1lYW4gZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHR5cGUge0Jvb2xlYW59XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhZHlfO1xuXG4vKipcbiAqIFRyaWdnZXIgcmVhZHkgYXMgc29vbiBhcyBpbml0aWFsaXphdGlvbiBpcyBmaW5pc2hlZFxuICpcbiAqIEFsbG93cyBmb3IgZGVsYXlpbmcgcmVhZHkuIE92ZXJyaWRlIG9uIGEgc3ViIGNsYXNzIHByb3RvdHlwZS5cbiAqIElmIHlvdSBzZXQgdGhpcy5pc1JlYWR5T25Jbml0RmluaXNoXyBpdCB3aWxsIGFmZmVjdCBhbGwgY29tcG9uZW50cy5cbiAqIFNwZWNpYWxseSB1c2VkIHdoZW4gd2FpdGluZyBmb3IgdGhlIEZsYXNoIHBsYXllciB0byBhc3luY2hybm91c2x5IGxvYWQuXG4gKlxuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWR5T25Jbml0RmluaXNoXyA9IHRydWU7XG5cbi8qKlxuICogTGlzdCBvZiByZWFkeSBsaXN0ZW5lcnNcbiAqXG4gKiBAdHlwZSB7QXJyYXl9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZWFkeVF1ZXVlXztcblxuLyoqXG4gKiBCaW5kIGEgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJlYWR5IHN0YXRlXG4gKlxuICogRGlmZmVyZW50IGZyb20gZXZlbnQgbGlzdGVuZXJzIGluIHRoYXQgaWYgdGhlIHJlYWR5IGV2ZW50IGhhcyBhbHJlYWR5IGhhcHBlbmRcbiAqIGl0IHdpbGwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gaW1tZWRpYXRlbHkuXG4gKlxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuIFJlYWR5IGxpc3RlbmVyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGZuKXtcbiAgaWYgKGZuKSB7XG4gICAgaWYgKHRoaXMuaXNSZWFkeV8pIHtcbiAgICAgIGZuLmNhbGwodGhpcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnJlYWR5UXVldWVfID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5yZWFkeVF1ZXVlXyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy5yZWFkeVF1ZXVlXy5wdXNoKGZuKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFRyaWdnZXIgdGhlIHJlYWR5IGxpc3RlbmVyc1xuICpcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnRyaWdnZXJSZWFkeSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuaXNSZWFkeV8gPSB0cnVlO1xuXG4gIHZhciByZWFkeVF1ZXVlID0gdGhpcy5yZWFkeVF1ZXVlXztcblxuICBpZiAocmVhZHlRdWV1ZSAmJiByZWFkeVF1ZXVlLmxlbmd0aCA+IDApIHtcblxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gcmVhZHlRdWV1ZS5sZW5ndGg7IGkgPCBqOyBpKyspIHtcbiAgICAgIHJlYWR5UXVldWVbaV0uY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBSZXNldCBSZWFkeSBRdWV1ZVxuICAgIHRoaXMucmVhZHlRdWV1ZV8gPSBbXTtcblxuICAgIC8vIEFsbG93IGZvciB1c2luZyBldmVudCBsaXN0ZW5lcnMgYWxzbywgaW4gY2FzZSB5b3Ugd2FudCB0byBkbyBzb21ldGhpbmcgZXZlcnl0aW1lIGEgc291cmNlIGlzIHJlYWR5LlxuICAgIHRoaXMudHJpZ2dlcigncmVhZHknKTtcbiAgfVxufTtcblxuLyogRGlzcGxheVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cblxuLyoqXG4gKiBBZGQgYSBDU1MgY2xhc3MgbmFtZSB0byB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1RvQWRkIENsYXNzbmFtZSB0byBhZGRcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oY2xhc3NUb0FkZCl7XG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgY2xhc3NUb0FkZCk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYSBDU1MgY2xhc3MgbmFtZSBmcm9tIHRoZSBjb21wb25lbnQncyBlbGVtZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzVG9SZW1vdmUgQ2xhc3NuYW1lIHRvIHJlbW92ZVxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc1RvUmVtb3ZlKXtcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCBjbGFzc1RvUmVtb3ZlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNob3cgdGhlIGNvbXBvbmVudCBlbGVtZW50IGlmIGhpZGRlblxuICpcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xuICB0aGlzLmVsXy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEhpZGUgdGhlIGNvbXBvbmVudCBlbGVtZW50IGlmIGhpZGRlblxuICpcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xuICB0aGlzLmVsXy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTG9jayBhbiBpdGVtIGluIGl0cyB2aXNpYmxlIHN0YXRlXG4gKiBUbyBiZSB1c2VkIHdpdGggZmFkZUluL2ZhZGVPdXQuXG4gKlxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmxvY2tTaG93aW5nID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hZGRDbGFzcygndmpzLWxvY2stc2hvd2luZycpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogVW5sb2NrIGFuIGl0ZW0gdG8gYmUgaGlkZGVuXG4gKiBUbyBiZSB1c2VkIHdpdGggZmFkZUluL2ZhZGVPdXQuXG4gKlxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnVubG9ja1Nob3dpbmcgPSBmdW5jdGlvbigpe1xuICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtbG9jay1zaG93aW5nJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXNhYmxlIGNvbXBvbmVudCBieSBtYWtpbmcgaXQgdW5zaG93YWJsZVxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5oaWRlKCk7XG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCl7fTtcbn07XG5cbi8qKlxuICogU2V0IG9yIGdldCB0aGUgd2lkdGggb2YgdGhlIGNvbXBvbmVudCAoQ1NTIHZhbHVlcylcbiAqXG4gKiBWaWRlbyB0YWcgd2lkdGgvaGVpZ2h0IG9ubHkgd29yayBpbiBwaXhlbHMuIE5vIHBlcmNlbnRzLlxuICogQnV0IGFsbG93aW5nIGxpbWl0ZWQgcGVyY2VudHMgdXNlLiBlLmcuIHdpZHRoKCkgd2lsbCByZXR1cm4gbnVtYmVyKyUsIG5vdCBjb21wdXRlZCB3aWR0aFxuICpcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBudW0gICBPcHRpb25hbCB3aWR0aCBudW1iZXJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBMaXN0ZW5lcnMgU2tpcCB0aGUgJ3Jlc2l6ZScgZXZlbnQgdHJpZ2dlclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gUmV0dXJucyAndGhpcycgaWYgd2lkdGggd2FzIHNldFxuICogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gUmV0dXJucyB0aGUgd2lkdGggaWYgbm90aGluZyB3YXMgc2V0XG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24obnVtLCBza2lwTGlzdGVuZXJzKXtcbiAgcmV0dXJuIHRoaXMuZGltZW5zaW9uKCd3aWR0aCcsIG51bSwgc2tpcExpc3RlbmVycyk7XG59O1xuXG4vKipcbiAqIEdldCBvciBzZXQgdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50IChDU1MgdmFsdWVzKVxuICpcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBudW0gICAgIE5ldyBjb21wb25lbnQgaGVpZ2h0XG4gKiBAcGFyYW0gIHtCb29sZWFuPX0gc2tpcExpc3RlbmVycyBTa2lwIHRoZSByZXNpemUgZXZlbnQgdHJpZ2dlclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNvbXBvbmVudCBpZiB0aGUgaGVpZ2h0IHdhcyBzZXRcbiAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IFRoZSBoZWlnaHQgaWYgaXQgd2Fzbid0IHNldFxuICovXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbihudW0sIHNraXBMaXN0ZW5lcnMpe1xuICByZXR1cm4gdGhpcy5kaW1lbnNpb24oJ2hlaWdodCcsIG51bSwgc2tpcExpc3RlbmVycyk7XG59O1xuXG4vKipcbiAqIFNldCBib3RoIHdpZHRoIGFuZCBoZWlnaHQgYXQgdGhlIHNhbWUgdGltZVxuICpcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmd9IHdpZHRoXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSBoZWlnaHRcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjb21wb25lbnRcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGltZW5zaW9ucyA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xuICAvLyBTa2lwIHJlc2l6ZSBsaXN0ZW5lcnMgb24gd2lkdGggZm9yIG9wdGltaXphdGlvblxuICByZXR1cm4gdGhpcy53aWR0aCh3aWR0aCwgdHJ1ZSkuaGVpZ2h0KGhlaWdodCk7XG59O1xuXG4vKipcbiAqIEdldCBvciBzZXQgd2lkdGggb3IgaGVpZ2h0XG4gKlxuICogVGhpcyBpcyB0aGUgc2hhcmVkIGNvZGUgZm9yIHRoZSB3aWR0aCgpIGFuZCBoZWlnaHQoKSBtZXRob2RzLlxuICogQWxsIGZvciBhbiBpbnRlZ2VyLCBpbnRlZ2VyICsgJ3B4JyBvciBpbnRlZ2VyICsgJyUnO1xuICpcbiAqIEtub3duIGlzc3VlOiBIaWRkZW4gZWxlbWVudHMgb2ZmaWNpYWxseSBoYXZlIGEgd2lkdGggb2YgMC4gV2UncmUgZGVmYXVsdGluZ1xuICogdG8gdGhlIHN0eWxlLndpZHRoIHZhbHVlIGFuZCBmYWxsaW5nIGJhY2sgdG8gY29tcHV0ZWRTdHlsZSB3aGljaCBoYXMgdGhlXG4gKiBoaWRkZW4gZWxlbWVudCBpc3N1ZS4gSW5mbywgYnV0IHByb2JhYmx5IG5vdCBhbiBlZmZpY2llbnQgZml4OlxuICogaHR0cDovL3d3dy5mb2xpb3Rlay5jb20vZGV2YmxvZy9nZXR0aW5nLXRoZS13aWR0aC1vZi1hLWhpZGRlbi1lbGVtZW50LXdpdGgtanF1ZXJ5LXVzaW5nLXdpZHRoL1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gd2lkdGhPckhlaWdodCAgJ3dpZHRoJyBvciAnaGVpZ2h0J1xuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZz19IG51bSAgICAgTmV3IGRpbWVuc2lvblxuICogQHBhcmFtICB7Qm9vbGVhbj19IHNraXBMaXN0ZW5lcnMgU2tpcCByZXNpemUgZXZlbnQgdHJpZ2dlclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNvbXBvbmVudCBpZiBhIGRpbWVuc2lvbiB3YXMgc2V0XG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBUaGUgZGltZW5zaW9uIGlmIG5vdGhpbmcgd2FzIHNldFxuICogQHByaXZhdGVcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24od2lkdGhPckhlaWdodCwgbnVtLCBza2lwTGlzdGVuZXJzKXtcbiAgaWYgKG51bSAhPT0gdW5kZWZpbmVkKSB7XG5cbiAgICAvLyBDaGVjayBpZiB1c2luZyBjc3Mgd2lkdGgvaGVpZ2h0ICglIG9yIHB4KSBhbmQgYWRqdXN0XG4gICAgaWYgKCgnJytudW0pLmluZGV4T2YoJyUnKSAhPT0gLTEgfHwgKCcnK251bSkuaW5kZXhPZigncHgnKSAhPT0gLTEpIHtcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gbnVtO1xuICAgIH0gZWxzZSBpZiAobnVtID09PSAnYXV0bycpIHtcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gbnVtKydweCc7XG4gICAgfVxuXG4gICAgLy8gc2tpcExpc3RlbmVycyBhbGxvd3MgdXMgdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgcmVzaXplIGV2ZW50IHdoZW4gc2V0dGluZyBib3RoIHdpZHRoIGFuZCBoZWlnaHRcbiAgICBpZiAoIXNraXBMaXN0ZW5lcnMpIHsgdGhpcy50cmlnZ2VyKCdyZXNpemUnKTsgfVxuXG4gICAgLy8gUmV0dXJuIGNvbXBvbmVudFxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gTm90IHNldHRpbmcgYSB2YWx1ZSwgc28gZ2V0dGluZyBpdFxuICAvLyBNYWtlIHN1cmUgZWxlbWVudCBleGlzdHNcbiAgaWYgKCF0aGlzLmVsXykgcmV0dXJuIDA7XG5cbiAgLy8gR2V0IGRpbWVuc2lvbiB2YWx1ZSBmcm9tIHN0eWxlXG4gIHZhciB2YWwgPSB0aGlzLmVsXy5zdHlsZVt3aWR0aE9ySGVpZ2h0XTtcbiAgdmFyIHB4SW5kZXggPSB2YWwuaW5kZXhPZigncHgnKTtcbiAgaWYgKHB4SW5kZXggIT09IC0xKSB7XG4gICAgLy8gUmV0dXJuIHRoZSBwaXhlbCB2YWx1ZSB3aXRoIG5vICdweCdcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLnNsaWNlKDAscHhJbmRleCksIDEwKTtcblxuICAvLyBObyBweCBzbyB1c2luZyAlIG9yIG5vIHN0eWxlIHdhcyBzZXQsIHNvIGZhbGxpbmcgYmFjayB0byBvZmZzZXRXaWR0aC9oZWlnaHRcbiAgLy8gSWYgY29tcG9uZW50IGhhcyBkaXNwbGF5Om5vbmUsIG9mZnNldCB3aWxsIHJldHVybiAwXG4gIC8vIFRPRE86IGhhbmRsZSBkaXNwbGF5Om5vbmUgYW5kIG5vIGRpbWVuc2lvbiBzdHlsZSB1c2luZyBweFxuICB9IGVsc2Uge1xuXG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZWxfWydvZmZzZXQnK3Zqcy5jYXBpdGFsaXplKHdpZHRoT3JIZWlnaHQpXSwgMTApO1xuXG4gICAgLy8gQ29tcHV0ZWRTdHlsZSB2ZXJzaW9uLlxuICAgIC8vIE9ubHkgZGlmZmVyZW5jZSBpcyBpZiB0aGUgZWxlbWVudCBpcyBoaWRkZW4gaXQgd2lsbCByZXR1cm5cbiAgICAvLyB0aGUgcGVyY2VudCB2YWx1ZSAoZS5nLiAnMTAwJScnKVxuICAgIC8vIGluc3RlYWQgb2YgemVybyBsaWtlIG9mZnNldFdpZHRoIHJldHVybnMuXG4gICAgLy8gdmFyIHZhbCA9IHZqcy5nZXRDb21wdXRlZFN0eWxlVmFsdWUodGhpcy5lbF8sIHdpZHRoT3JIZWlnaHQpO1xuICAgIC8vIHZhciBweEluZGV4ID0gdmFsLmluZGV4T2YoJ3B4Jyk7XG5cbiAgICAvLyBpZiAocHhJbmRleCAhPT0gLTEpIHtcbiAgICAvLyAgIHJldHVybiB2YWwuc2xpY2UoMCwgcHhJbmRleCk7XG4gICAgLy8gfSBlbHNlIHtcbiAgICAvLyAgIHJldHVybiB2YWw7XG4gICAgLy8gfVxuICB9XG59O1xuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzXG4gKiBAZXZlbnQgcmVzaXplXG4gKi9cbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uUmVzaXplO1xuXG4vKipcbiAqIEVtaXQgJ3RhcCcgZXZlbnRzIHdoZW4gdG91Y2ggZXZlbnRzIGFyZSBzdXBwb3J0ZWRcbiAqXG4gKiBUaGlzIGlzIHVzZWQgdG8gc3VwcG9ydCB0b2dnbGluZyB0aGUgY29udHJvbHMgdGhyb3VnaCBhIHRhcCBvbiB0aGUgdmlkZW8uXG4gKlxuICogV2UncmUgcmVxdWlyZWluZyB0aGVtIHRvIGJlIGVuYWJsZWQgYmVjYXVzZSBvdGhlcndpc2UgZXZlcnkgY29tcG9uZW50IHdvdWxkXG4gKiBoYXZlIHRoaXMgZXh0cmEgb3ZlcmhlYWQgdW5uZWNlc3NhcmlseSwgb24gbW9iaWxlIGRldmljZXMgd2hlcmUgZXh0cmFcbiAqIG92ZXJoZWFkIGlzIGVzcGVjaWFsbHkgYmFkLlxuICogQHByaXZhdGVcbiAqL1xudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZW1pdFRhcEV2ZW50cyA9IGZ1bmN0aW9uKCl7XG4gIHZhciB0b3VjaFN0YXJ0LCB0b3VjaFRpbWUsIGNvdWxkQmVUYXAsIG5vVGFwO1xuXG4gIC8vIFRyYWNrIHRoZSBzdGFydCB0aW1lIHNvIHdlIGNhbiBkZXRlcm1pbmUgaG93IGxvbmcgdGhlIHRvdWNoIGxhc3RlZFxuICB0b3VjaFN0YXJ0ID0gMDtcblxuICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAvLyBSZWNvcmQgc3RhcnQgdGltZSBzbyB3ZSBjYW4gZGV0ZWN0IGEgdGFwIHZzLiBcInRvdWNoIGFuZCBob2xkXCJcbiAgICB0b3VjaFN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgLy8gUmVzZXQgY291bGRCZVRhcCB0cmFja2luZ1xuICAgIGNvdWxkQmVUYXAgPSB0cnVlO1xuICB9KTtcblxuICBub1RhcCA9IGZ1bmN0aW9uKCl7XG4gICAgY291bGRCZVRhcCA9IGZhbHNlO1xuICB9O1xuICAvLyBUT0RPOiBMaXN0ZW4gdG8gdGhlIG9yaWdpbmFsIHRhcmdldC4gaHR0cDovL3lvdXR1LmJlL0R1amZwWE9LVXA4P3Q9MTNtOHNcbiAgdGhpcy5vbigndG91Y2htb3ZlJywgbm9UYXApO1xuICB0aGlzLm9uKCd0b3VjaGxlYXZlJywgbm9UYXApO1xuICB0aGlzLm9uKCd0b3VjaGNhbmNlbCcsIG5vVGFwKTtcblxuICAvLyBXaGVuIHRoZSB0b3VjaCBlbmRzLCBtZWFzdXJlIGhvdyBsb25nIGl0IHRvb2sgYW5kIHRyaWdnZXIgdGhlIGFwcHJvcHJpYXRlXG4gIC8vIGV2ZW50XG4gIHRoaXMub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgLy8gUHJvY2VlZCBvbmx5IGlmIHRoZSB0b3VjaG1vdmUvbGVhdmUvY2FuY2VsIGV2ZW50IGRpZG4ndCBoYXBwZW5cbiAgICBpZiAoY291bGRCZVRhcCA9PT0gdHJ1ZSkge1xuICAgICAgLy8gTWVhc3VyZSBob3cgbG9uZyB0aGUgdG91Y2ggbGFzdGVkXG4gICAgICB0b3VjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRvdWNoU3RhcnQ7XG4gICAgICAvLyBUaGUgdG91Y2ggbmVlZHMgdG8gYmUgcXVpY2sgaW4gb3JkZXIgdG8gY29uc2lkZXIgaXQgYSB0YXBcbiAgICAgIGlmICh0b3VjaFRpbWUgPCAyNTApIHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd0YXAnKTtcbiAgICAgICAgLy8gSXQgbWF5IGJlIGdvb2QgdG8gY29weSB0aGUgdG91Y2hlbmQgZXZlbnQgb2JqZWN0IGFuZCBjaGFuZ2UgdGhlXG4gICAgICAgIC8vIHR5cGUgdG8gdGFwLCBpZiB0aGUgb3RoZXIgZXZlbnQgcHJvcGVydGllcyBhcmVuJ3QgZXhhY3QgYWZ0ZXJcbiAgICAgICAgLy8gdmpzLmZpeEV2ZW50IHJ1bnMgKGUuZy4gZXZlbnQudGFyZ2V0KVxuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuLyogQnV0dG9uIC0gQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnNcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBidXR0b25zXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLkJ1dHRvbiA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAaW5oZXJpdERvY1xuICAgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcblxuICAgIHZhciB0b3VjaHN0YXJ0ID0gZmFsc2U7XG4gICAgdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAvLyBTdG9wIGNsaWNrIGFuZCBvdGhlciBtb3VzZSBldmVudHMgZnJvbSB0cmlnZ2VyaW5nIGFsc29cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0b3VjaHN0YXJ0ID0gdHJ1ZTtcbiAgICB9KTtcbiAgICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbigpIHtcbiAgICAgIHRvdWNoc3RhcnQgPSBmYWxzZTtcbiAgICB9KTtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5vbigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKHRvdWNoc3RhcnQpIHtcbiAgICAgICAgc2VsZi5vbkNsaWNrKGV2ZW50KTtcbiAgICAgIH1cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdjbGljaycsIHRoaXMub25DbGljayk7XG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLm9uRm9jdXMpO1xuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLm9uQmx1cik7XG4gIH1cbn0pO1xuXG52anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKXtcbiAgLy8gQWRkIHN0YW5kYXJkIEFyaWEgYW5kIFRhYmluZGV4IGluZm9cbiAgcHJvcHMgPSB2anMub2JqLm1lcmdlKHtcbiAgICBjbGFzc05hbWU6IHRoaXMuYnVpbGRDU1NDbGFzcygpLFxuICAgIGlubmVySFRNTDogJzxkaXYgY2xhc3M9XCJ2anMtY29udHJvbC1jb250ZW50XCI+PHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+JyArICh0aGlzLmJ1dHRvblRleHQgfHwgJ05lZWQgVGV4dCcpICsgJzwvc3Bhbj48L2Rpdj4nLFxuICAgIHJvbGU6ICdidXR0b24nLFxuICAgICdhcmlhLWxpdmUnOiAncG9saXRlJywgLy8gbGV0IHRoZSBzY3JlZW4gcmVhZGVyIHVzZXIga25vdyB0aGF0IHRoZSB0ZXh0IG9mIHRoZSBidXR0b24gbWF5IGNoYW5nZVxuICAgIHRhYkluZGV4OiAwXG4gIH0sIHByb3BzKTtcblxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCB0eXBlLCBwcm9wcyk7XG59O1xuXG52anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcbiAgLy8gVE9ETzogQ2hhbmdlIHZqcy1jb250cm9sIHRvIHZqcy1idXR0b24/XG4gIHJldHVybiAndmpzLWNvbnRyb2wgJyArIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcbn07XG5cbiAgLy8gQ2xpY2sgLSBPdmVycmlkZSB3aXRoIHNwZWNpZmljIGZ1bmN0aW9uYWxpdHkgZm9yIGJ1dHRvblxudmpzLkJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7fTtcblxuICAvLyBGb2N1cyAtIEFkZCBrZXlib2FyZCBmdW5jdGlvbmFsaXR5IHRvIGVsZW1lbnRcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbigpe1xuICB2anMub24oZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xufTtcblxuICAvLyBLZXlQcmVzcyAoZG9jdW1lbnQgbGV2ZWwpIC0gVHJpZ2dlciBjbGljayB3aGVuIGtleXMgYXJlIHByZXNzZWRcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uS2V5UHJlc3MgPSBmdW5jdGlvbihldmVudCl7XG4gIC8vIENoZWNrIGZvciBzcGFjZSBiYXIgKDMyKSBvciBlbnRlciAoMTMpIGtleXNcbiAgaWYgKGV2ZW50LndoaWNoID09IDMyIHx8IGV2ZW50LndoaWNoID09IDEzKSB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLm9uQ2xpY2soKTtcbiAgfVxufTtcblxuLy8gQmx1ciAtIFJlbW92ZSBrZXlib2FyZCB0cmlnZ2Vyc1xudmpzLkJ1dHRvbi5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKXtcbiAgdmpzLm9mZihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XG59O1xuLyogU2xpZGVyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuLyoqXG4gKiBUaGUgYmFzZSBmdW5jdGlvbmFsaXR5IGZvciBzbGlkZXJzIGxpa2UgdGhlIHZvbHVtZSBiYXIgYW5kIHNlZWsgYmFyXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuU2xpZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICAvLyBTZXQgcHJvcGVydHkgbmFtZXMgdG8gYmFyIGFuZCBoYW5kbGUgdG8gbWF0Y2ggd2l0aCB0aGUgY2hpbGQgU2xpZGVyIGNsYXNzIGlzIGxvb2tpbmcgZm9yXG4gICAgdGhpcy5iYXIgPSB0aGlzLmdldENoaWxkKHRoaXMub3B0aW9uc19bJ2Jhck5hbWUnXSk7XG4gICAgdGhpcy5oYW5kbGUgPSB0aGlzLmdldENoaWxkKHRoaXMub3B0aW9uc19bJ2hhbmRsZU5hbWUnXSk7XG5cbiAgICBwbGF5ZXIub24odGhpcy5wbGF5ZXJFdmVudCwgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcblxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xuICAgIHRoaXMub24oJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VEb3duKTtcbiAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMub25Gb2N1cyk7XG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMub25CbHVyKTtcbiAgICB0aGlzLm9uKCdjbGljaycsIHRoaXMub25DbGljayk7XG5cbiAgICB0aGlzLnBsYXllcl8ub24oJ2NvbnRyb2xzdmlzaWJsZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XG5cbiAgICAvLyBUaGlzIGlzIGFjdHVhbGx5IHRvIGZpeCB0aGUgdm9sdW1lIGhhbmRsZSBwb3NpdGlvbi4gaHR0cDovL3R3aXR0ZXIuY29tLyMhL2dlcnJpdHZhbmFha2VuL3N0YXR1cy8xNTkwNDYyNTQ1MTk3ODc1MjBcbiAgICAvLyB0aGlzLnBsYXllcl8ub25lKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcblxuICAgIHBsYXllci5yZWFkeSh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xuXG4gICAgdGhpcy5ib3VuZEV2ZW50cyA9IHt9O1xuICB9XG59KTtcblxudmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAvLyBBZGQgdGhlIHNsaWRlciBlbGVtZW50IGNsYXNzIHRvIGFsbCBzdWIgY2xhc3Nlc1xuICBwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnIHZqcy1zbGlkZXInO1xuICBwcm9wcyA9IHZqcy5vYmoubWVyZ2Uoe1xuICAgIHJvbGU6ICdzbGlkZXInLFxuICAgICdhcmlhLXZhbHVlbm93JzogMCxcbiAgICAnYXJpYS12YWx1ZW1pbic6IDAsXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXG4gICAgdGFiSW5kZXg6IDBcbiAgfSwgcHJvcHMpO1xuXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsIHR5cGUsIHByb3BzKTtcbn07XG5cbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24oZXZlbnQpe1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICB2anMuYmxvY2tUZXh0U2VsZWN0aW9uKCk7XG5cbiAgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlID0gdmpzLmJpbmQodGhpcywgdGhpcy5vbk1vdXNlTW92ZSk7XG4gIHRoaXMuYm91bmRFdmVudHMuZW5kID0gdmpzLmJpbmQodGhpcywgdGhpcy5vbk1vdXNlVXApO1xuXG4gIHZqcy5vbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSk7XG4gIHZqcy5vbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCk7XG4gIHZqcy5vbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSk7XG4gIHZqcy5vbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQpO1xuXG4gIHRoaXMub25Nb3VzZU1vdmUoZXZlbnQpO1xufTtcblxudmpzLlNsaWRlci5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24oKSB7XG4gIHZqcy51bmJsb2NrVGV4dFNlbGVjdGlvbigpO1xuICB2anMub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlLCBmYWxzZSk7XG4gIHZqcy5vZmYoZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQsIGZhbHNlKTtcbiAgdmpzLm9mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSwgZmFsc2UpO1xuICB2anMub2ZmKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCwgZmFsc2UpO1xuXG4gIHRoaXMudXBkYXRlKCk7XG59O1xuXG52anMuU2xpZGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xuICAvLyBJbiBWb2x1bWVCYXIgaW5pdCB3ZSBoYXZlIGEgc2V0VGltZW91dCBmb3IgdXBkYXRlIHRoYXQgcG9wcyBhbmQgdXBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlXG4gIC8vIGV4ZWN1dGlvbiBzdGFjay4gVGhlIHBsYXllciBpcyBkZXN0cm95ZWQgYmVmb3JlIHRoZW4gdXBkYXRlIHdpbGwgY2F1c2UgYW4gZXJyb3JcbiAgaWYgKCF0aGlzLmVsXykgcmV0dXJuO1xuXG4gIC8vIElmIHNjcnViYmluZywgd2UgY291bGQgdXNlIGEgY2FjaGVkIHZhbHVlIHRvIG1ha2UgdGhlIGhhbmRsZSBrZWVwIHVwIHdpdGggdGhlIHVzZXIncyBtb3VzZS5cbiAgLy8gT24gSFRNTDUgYnJvd3NlcnMgc2NydWJiaW5nIGlzIHJlYWxseSBzbW9vdGgsIGJ1dCBzb21lIGZsYXNoIHBsYXllcnMgYXJlIHNsb3csIHNvIHdlIG1pZ2h0IHdhbnQgdG8gdXRpbGl6ZSB0aGlzIGxhdGVyLlxuICAvLyB2YXIgcHJvZ3Jlc3MgPSAgKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgLyB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSA6IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpIC8gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XG5cbiAgdmFyIGJhclByb2dyZXNzLFxuICAgICAgcHJvZ3Jlc3MgPSB0aGlzLmdldFBlcmNlbnQoKSxcbiAgICAgIGhhbmRsZSA9IHRoaXMuaGFuZGxlLFxuICAgICAgYmFyID0gdGhpcy5iYXI7XG5cbiAgLy8gUHJvdGVjdCBhZ2FpbnN0IG5vIGR1cmF0aW9uIGFuZCBvdGhlciBkaXZpc2lvbiBpc3N1ZXNcbiAgaWYgKGlzTmFOKHByb2dyZXNzKSkgeyBwcm9ncmVzcyA9IDA7IH1cblxuICBiYXJQcm9ncmVzcyA9IHByb2dyZXNzO1xuXG4gIC8vIElmIHRoZXJlIGlzIGEgaGFuZGxlLCB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoZSBoYW5kbGUgaW4gb3VyIGNhbGN1bGF0aW9uIGZvciBwcm9ncmVzcyBiYXJcbiAgLy8gc28gdGhhdCBpdCBkb2Vzbid0IGZhbGwgc2hvcnQgb2Ygb3IgZXh0ZW5kIHBhc3QgdGhlIGhhbmRsZS5cbiAgaWYgKGhhbmRsZSkge1xuXG4gICAgdmFyIGJveCA9IHRoaXMuZWxfLFxuICAgICAgICBib3hXaWR0aCA9IGJveC5vZmZzZXRXaWR0aCxcblxuICAgICAgICBoYW5kbGVXaWR0aCA9IGhhbmRsZS5lbCgpLm9mZnNldFdpZHRoLFxuXG4gICAgICAgIC8vIFRoZSB3aWR0aCBvZiB0aGUgaGFuZGxlIGluIHBlcmNlbnQgb2YgdGhlIGNvbnRhaW5pbmcgYm94XG4gICAgICAgIC8vIEluIElFLCB3aWR0aHMgbWF5IG5vdCBiZSByZWFkeSB5ZXQgY2F1c2luZyBOYU5cbiAgICAgICAgaGFuZGxlUGVyY2VudCA9IChoYW5kbGVXaWR0aCkgPyBoYW5kbGVXaWR0aCAvIGJveFdpZHRoIDogMCxcblxuICAgICAgICAvLyBHZXQgdGhlIGFkanVzdGVkIHNpemUgb2YgdGhlIGJveCwgY29uc2lkZXJpbmcgdGhhdCB0aGUgaGFuZGxlJ3MgY2VudGVyIG5ldmVyIHRvdWNoZXMgdGhlIGxlZnQgb3IgcmlnaHQgc2lkZS5cbiAgICAgICAgLy8gVGhlcmUgaXMgYSBtYXJnaW4gb2YgaGFsZiB0aGUgaGFuZGxlJ3Mgd2lkdGggb24gYm90aCBzaWRlcy5cbiAgICAgICAgYm94QWRqdXN0ZWRQZXJjZW50ID0gMSAtIGhhbmRsZVBlcmNlbnQsXG5cbiAgICAgICAgLy8gQWRqdXN0IHRoZSBwcm9ncmVzcyB0aGF0IHdlJ2xsIHVzZSB0byBzZXQgd2lkdGhzIHRvIHRoZSBuZXcgYWRqdXN0ZWQgYm94IHdpZHRoXG4gICAgICAgIGFkanVzdGVkUHJvZ3Jlc3MgPSBwcm9ncmVzcyAqIGJveEFkanVzdGVkUGVyY2VudDtcblxuICAgIC8vIFRoZSBiYXIgZG9lcyByZWFjaCB0aGUgbGVmdCBzaWRlLCBzbyB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoaXMgaW4gdGhlIGJhcidzIHdpZHRoXG4gICAgYmFyUHJvZ3Jlc3MgPSBhZGp1c3RlZFByb2dyZXNzICsgKGhhbmRsZVBlcmNlbnQgLyAyKTtcblxuICAgIC8vIE1vdmUgdGhlIGhhbmRsZSBmcm9tIHRoZSBsZWZ0IGJhc2VkIG9uIHRoZSBhZGplY3RlZCBwcm9ncmVzc1xuICAgIGhhbmRsZS5lbCgpLnN0eWxlLmxlZnQgPSB2anMucm91bmQoYWRqdXN0ZWRQcm9ncmVzcyAqIDEwMCwgMikgKyAnJSc7XG4gIH1cblxuICAvLyBTZXQgdGhlIG5ldyBiYXIgd2lkdGhcbiAgYmFyLmVsKCkuc3R5bGUud2lkdGggPSB2anMucm91bmQoYmFyUHJvZ3Jlc3MgKiAxMDAsIDIpICsgJyUnO1xufTtcblxudmpzLlNsaWRlci5wcm90b3R5cGUuY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihldmVudCl7XG4gIHZhciBlbCwgYm94LCBib3hYLCBib3hZLCBib3hXLCBib3hILCBoYW5kbGUsIHBhZ2VYLCBwYWdlWTtcblxuICBlbCA9IHRoaXMuZWxfO1xuICBib3ggPSB2anMuZmluZFBvc2l0aW9uKGVsKTtcbiAgYm94VyA9IGJveEggPSBlbC5vZmZzZXRXaWR0aDtcbiAgaGFuZGxlID0gdGhpcy5oYW5kbGU7XG5cbiAgaWYgKHRoaXMub3B0aW9uc18udmVydGljYWwpIHtcbiAgICBib3hZID0gYm94LnRvcDtcblxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgcGFnZVkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICB9XG5cbiAgICBpZiAoaGFuZGxlKSB7XG4gICAgICB2YXIgaGFuZGxlSCA9IGhhbmRsZS5lbCgpLm9mZnNldEhlaWdodDtcbiAgICAgIC8vIEFkanVzdGVkIFggYW5kIFdpZHRoLCBzbyBoYW5kbGUgZG9lc24ndCBnbyBvdXRzaWRlIHRoZSBiYXJcbiAgICAgIGJveFkgPSBib3hZICsgKGhhbmRsZUggLyAyKTtcbiAgICAgIGJveEggPSBib3hIIC0gaGFuZGxlSDtcbiAgICB9XG5cbiAgICAvLyBQZXJjZW50IHRoYXQgdGhlIGNsaWNrIGlzIHRocm91Z2ggdGhlIGFkanVzdGVkIGFyZWFcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKChib3hZIC0gcGFnZVkpICsgYm94SCkgLyBib3hIKSk7XG5cbiAgfSBlbHNlIHtcbiAgICBib3hYID0gYm94LmxlZnQ7XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVg7XG4gICAgfVxuXG4gICAgaWYgKGhhbmRsZSkge1xuICAgICAgdmFyIGhhbmRsZVcgPSBoYW5kbGUuZWwoKS5vZmZzZXRXaWR0aDtcblxuICAgICAgLy8gQWRqdXN0ZWQgWCBhbmQgV2lkdGgsIHNvIGhhbmRsZSBkb2Vzbid0IGdvIG91dHNpZGUgdGhlIGJhclxuICAgICAgYm94WCA9IGJveFggKyAoaGFuZGxlVyAvIDIpO1xuICAgICAgYm94VyA9IGJveFcgLSBoYW5kbGVXO1xuICAgIH1cblxuICAgIC8vIFBlcmNlbnQgdGhhdCB0aGUgY2xpY2sgaXMgdGhyb3VnaCB0aGUgYWRqdXN0ZWQgYXJlYVxuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAocGFnZVggLSBib3hYKSAvIGJveFcpKTtcbiAgfVxufTtcblxudmpzLlNsaWRlci5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5vbihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XG59O1xuXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbktleVByZXNzID0gZnVuY3Rpb24oZXZlbnQpe1xuICBpZiAoZXZlbnQud2hpY2ggPT0gMzcpIHsgLy8gTGVmdCBBcnJvd1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5zdGVwQmFjaygpO1xuICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDM5KSB7IC8vIFJpZ2h0IEFycm93XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnN0ZXBGb3J3YXJkKCk7XG4gIH1cbn07XG5cbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uQmx1ciA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5vZmYoZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xufTtcblxuLyoqXG4gKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHNsaWRlciwgdXNlZCB0byBwcmV2ZW50IGNsaWNrc1xuICogICBmcm9tIGJ1YmJsaW5nIHVwIHRvIHBhcmVudCBlbGVtZW50cyBsaWtlIGJ1dHRvbiBtZW51cy5cbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnQgRXZlbnQgb2JqZWN0XG4gKi9cbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCl7XG4gIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xufTtcblxuLyoqXG4gKiBTZWVrQmFyIEJlaGF2aW9yIGluY2x1ZGVzIHBsYXkgcHJvZ3Jlc3MgYmFyLCBhbmQgc2VlayBoYW5kbGVcbiAqIE5lZWRlZCBzbyBpdCBjYW4gZGV0ZXJtaW5lIHNlZWsgcG9zaXRpb24gYmFzZWQgb24gaGFuZGxlIHBvc2l0aW9uL3NpemVcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlNsaWRlckhhbmRsZSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKCk7XG5cbi8qKlxuICogRGVmYXVsdCB2YWx1ZSBvZiB0aGUgc2xpZGVyXG4gKlxuICogQHR5cGUge051bWJlcn1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5TbGlkZXJIYW5kbGUucHJvdG90eXBlLmRlZmF1bHRWYWx1ZSA9IDA7XG5cbi8qKiBAaW5oZXJpdERvYyAqL1xudmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xuICAvLyBBZGQgdGhlIHNsaWRlciBlbGVtZW50IGNsYXNzIHRvIGFsbCBzdWIgY2xhc3Nlc1xuICBwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnIHZqcy1zbGlkZXItaGFuZGxlJztcbiAgcHJvcHMgPSB2anMub2JqLm1lcmdlKHtcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj4nK3RoaXMuZGVmYXVsdFZhbHVlKyc8L3NwYW4+J1xuICB9LCBwcm9wcyk7XG5cbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHByb3BzKTtcbn07XG4vKiBNZW51XG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuLyoqXG4gKiBUaGUgTWVudSBjb21wb25lbnQgaXMgdXNlZCB0byBidWlsZCBwb3AgdXAgbWVudXMsIGluY2x1ZGluZyBzdWJ0aXRsZSBhbmRcbiAqIGNhcHRpb25zIHNlbGVjdGlvbiBtZW51cy5cbiAqXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLk1lbnUgPSB2anMuQ29tcG9uZW50LmV4dGVuZCgpO1xuXG4vKipcbiAqIEFkZCBhIG1lbnUgaXRlbSB0byB0aGUgbWVudVxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjb21wb25lbnQgQ29tcG9uZW50IG9yIGNvbXBvbmVudCB0eXBlIHRvIGFkZFxuICovXG52anMuTWVudS5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uKGNvbXBvbmVudCl7XG4gIHRoaXMuYWRkQ2hpbGQoY29tcG9uZW50KTtcbiAgY29tcG9uZW50Lm9uKCdjbGljaycsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICAgdGhpcy51bmxvY2tTaG93aW5nKCk7XG4gIH0pKTtcbn07XG5cbi8qKiBAaW5oZXJpdERvYyAqL1xudmpzLk1lbnUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNvbnRlbnRFbFR5cGUgPSB0aGlzLm9wdGlvbnMoKS5jb250ZW50RWxUeXBlIHx8ICd1bCc7XG4gIHRoaXMuY29udGVudEVsXyA9IHZqcy5jcmVhdGVFbChjb250ZW50RWxUeXBlLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtY29udGVudCdcbiAgfSk7XG4gIHZhciBlbCA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBhcHBlbmQ6IHRoaXMuY29udGVudEVsXyxcbiAgICBjbGFzc05hbWU6ICd2anMtbWVudSdcbiAgfSk7XG4gIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsXyk7XG5cbiAgLy8gUHJldmVudCBjbGlja3MgZnJvbSBidWJibGluZyB1cC4gTmVlZGVkIGZvciBNZW51IEJ1dHRvbnMsXG4gIC8vIHdoZXJlIGEgY2xpY2sgb24gdGhlIHBhcmVudCBpcyBzaWduaWZpY2FudFxuICB2anMub24oZWwsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICByZXR1cm4gZWw7XG59O1xuXG4vKipcbiAqIFRoZSBjb21wb25lbnQgZm9yIGEgbWVudSBpdGVtLiBgPGxpPmBcbiAqXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNsYXNzXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLk1lbnVJdGVtID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gICAgdGhpcy5zZWxlY3RlZChvcHRpb25zWydzZWxlY3RlZCddKTtcbiAgfVxufSk7XG5cbi8qKiBAaW5oZXJpdERvYyAqL1xudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKXtcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2xpJywgdmpzLm9iai5tZXJnZSh7XG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtaXRlbScsXG4gICAgaW5uZXJIVE1MOiB0aGlzLm9wdGlvbnNfWydsYWJlbCddXG4gIH0sIHByb3BzKSk7XG59O1xuXG4vKipcbiAqIEhhbmRsZSBhIGNsaWNrIG9uIHRoZSBtZW51IGl0ZW0sIGFuZCBzZXQgaXQgdG8gc2VsZWN0ZWRcbiAqL1xudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5zZWxlY3RlZCh0cnVlKTtcbn07XG5cbi8qKlxuICogU2V0IHRoaXMgbWVudSBpdGVtIGFzIHNlbGVjdGVkIG9yIG5vdFxuICogQHBhcmFtICB7Qm9vbGVhbn0gc2VsZWN0ZWRcbiAqL1xudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5zZWxlY3RlZCA9IGZ1bmN0aW9uKHNlbGVjdGVkKXtcbiAgaWYgKHNlbGVjdGVkKSB7XG4gICAgdGhpcy5hZGRDbGFzcygndmpzLXNlbGVjdGVkJyk7XG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyx0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtc2VsZWN0ZWQnKTtcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLGZhbHNlKTtcbiAgfVxufTtcblxuXG4vKipcbiAqIEEgYnV0dG9uIGNsYXNzIHdpdGggYSBwb3B1cCBtZW51XG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5NZW51QnV0dG9uID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICB0aGlzLm1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKTtcblxuICAgIC8vIEFkZCBsaXN0IHRvIGVsZW1lbnRcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubWVudSk7XG5cbiAgICAvLyBBdXRvbWF0aWNhbGx5IGhpZGUgZW1wdHkgbWVudSBidXR0b25zXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHRoaXMub24oJ2tleXVwJywgdGhpcy5vbktleVByZXNzKTtcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGFzcG9wdXAnLCB0cnVlKTtcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFRyYWNrIHRoZSBzdGF0ZSBvZiB0aGUgbWVudSBidXR0b25cbiAqIEB0eXBlIHtCb29sZWFufVxuICogQHByaXZhdGVcbiAqL1xudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLmJ1dHRvblByZXNzZWRfID0gZmFsc2U7XG5cbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfKTtcblxuICAvLyBBZGQgYSB0aXRsZSBsaXN0IGl0ZW0gdG8gdGhlIHRvcFxuICBpZiAodGhpcy5vcHRpb25zKCkudGl0bGUpIHtcbiAgICBtZW51LmVsKCkuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdsaScsIHtcbiAgICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LXRpdGxlJyxcbiAgICAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXG4gICAgICB0YWJpbmRleDogLTFcbiAgICB9KSk7XG4gIH1cblxuICB0aGlzLml0ZW1zID0gdGhpc1snY3JlYXRlSXRlbXMnXSgpO1xuXG4gIGlmICh0aGlzLml0ZW1zKSB7XG4gICAgLy8gQWRkIG1lbnUgaXRlbXMgdG8gdGhlIG1lbnVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIG1lbnUuYWRkSXRlbSh0aGlzLml0ZW1zW2ldKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbWVudTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBsaXN0IG9mIG1lbnUgaXRlbXMuIFNwZWNpZmljIHRvIGVhY2ggc3ViY2xhc3MuXG4gKi9cbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7fTtcblxuLyoqIEBpbmhlcml0RG9jICovXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmNsYXNzTmFtZSArICcgdmpzLW1lbnUtYnV0dG9uICcgKyB2anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzLmNhbGwodGhpcyk7XG59O1xuXG4vLyBGb2N1cyAtIEFkZCBrZXlib2FyZCBmdW5jdGlvbmFsaXR5IHRvIGVsZW1lbnRcbi8vIFRoaXMgZnVuY3Rpb24gaXMgbm90IG5lZWRlZCBhbnltb3JlLiBJbnN0ZWFkLCB0aGUga2V5Ym9hcmQgZnVuY3Rpb25hbGl0eSBpcyBoYW5kbGVkIGJ5XG4vLyB0cmVhdGluZyB0aGUgYnV0dG9uIGFzIHRyaWdnZXJpbmcgYSBzdWJtZW51LiBXaGVuIHRoZSBidXR0b24gaXMgcHJlc3NlZCwgdGhlIHN1Ym1lbnVcbi8vIGFwcGVhcnMuIFByZXNzaW5nIHRoZSBidXR0b24gYWdhaW4gbWFrZXMgdGhlIHN1Ym1lbnUgZGlzYXBwZWFyLlxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbigpe307XG4vLyBDYW4ndCB0dXJuIG9mZiBsaXN0IGRpc3BsYXkgdGhhdCB3ZSB0dXJuZWQgb24gd2l0aCBmb2N1cywgYmVjYXVzZSBsaXN0IHdvdWxkIGdvIGF3YXkuXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKXt9O1xuXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIC8vIFdoZW4geW91IGNsaWNrIHRoZSBidXR0b24gaXQgYWRkcyBmb2N1cywgd2hpY2ggd2lsbCBzaG93IHRoZSBtZW51IGluZGVmaW5pdGVseS5cbiAgLy8gU28gd2UnbGwgcmVtb3ZlIGZvY3VzIHdoZW4gdGhlIG1vdXNlIGxlYXZlcyB0aGUgYnV0dG9uLlxuICAvLyBGb2N1cyBpcyBuZWVkZWQgZm9yIHRhYiBuYXZpZ2F0aW9uLlxuICB0aGlzLm9uZSgnbW91c2VvdXQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xuICAgIHRoaXMubWVudS51bmxvY2tTaG93aW5nKCk7XG4gICAgdGhpcy5lbF8uYmx1cigpO1xuICB9KSk7XG4gIGlmICh0aGlzLmJ1dHRvblByZXNzZWRfKXtcbiAgICB0aGlzLnVucHJlc3NCdXR0b24oKTtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnByZXNzQnV0dG9uKCk7XG4gIH1cbn07XG5cbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbktleVByZXNzID0gZnVuY3Rpb24oZXZlbnQpe1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIC8vIENoZWNrIGZvciBzcGFjZSBiYXIgKDMyKSBvciBlbnRlciAoMTMpIGtleXNcbiAgaWYgKGV2ZW50LndoaWNoID09IDMyIHx8IGV2ZW50LndoaWNoID09IDEzKSB7XG4gICAgaWYgKHRoaXMuYnV0dG9uUHJlc3NlZF8pe1xuICAgICAgdGhpcy51bnByZXNzQnV0dG9uKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHJlc3NCdXR0b24oKTtcbiAgICB9XG4gIC8vIENoZWNrIGZvciBlc2NhcGUgKDI3KSBrZXlcbiAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PSAyNyl7XG4gICAgaWYgKHRoaXMuYnV0dG9uUHJlc3NlZF8pe1xuICAgICAgdGhpcy51bnByZXNzQnV0dG9uKCk7XG4gICAgfVxuICB9XG59O1xuXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUucHJlc3NCdXR0b24gPSBmdW5jdGlvbigpe1xuICB0aGlzLmJ1dHRvblByZXNzZWRfID0gdHJ1ZTtcbiAgdGhpcy5tZW51LmxvY2tTaG93aW5nKCk7XG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgdHJ1ZSk7XG4gIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xuICAgIHRoaXMuaXRlbXNbMF0uZWwoKS5mb2N1cygpOyAvLyBzZXQgdGhlIGZvY3VzIHRvIHRoZSB0aXRsZSBvZiB0aGUgc3VibWVudVxuICB9XG59O1xuXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUudW5wcmVzc0J1dHRvbiA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuYnV0dG9uUHJlc3NlZF8gPSBmYWxzZTtcbiAgdGhpcy5tZW51LnVubG9ja1Nob3dpbmcoKTtcbiAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBmYWxzZSk7XG59O1xuXG4vKipcbiAqIEFuIGluc3RhbmNlIG9mIHRoZSBgdmpzLlBsYXllcmAgY2xhc3MgaXMgY3JlYXRlZCB3aGVuIGFueSBvZiB0aGUgVmlkZW8uanMgc2V0dXAgbWV0aG9kcyBhcmUgdXNlZCB0byBpbml0aWFsaXplIGEgdmlkZW8uXG4gKlxuICogYGBganNcbiAqIHZhciBteVBsYXllciA9IHZpZGVvanMoJ2V4YW1wbGVfdmlkZW9fMScpO1xuICogYGBgXG4gKlxuICogSW4gdGhlIGZvbGx3aW5nIGV4YW1wbGUsIHRoZSBgZGF0YS1zZXR1cGAgYXR0cmlidXRlIHRlbGxzIHRoZSBWaWRlby5qcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhIHBsYXllciBpbnN0YW5jZSB3aGVuIHRoZSBsaWJyYXJ5IGlzIHJlYWR5LlxuICpcbiAqIGBgYGh0bWxcbiAqIDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGRhdGEtc2V0dXA9J3t9JyBjb250cm9scz5cbiAqICAgPHNvdXJjZSBzcmM9XCJteS1zb3VyY2UubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxuICogPC92aWRlbz5cbiAqIGBgYFxuICpcbiAqIEFmdGVyIGFuIGluc3RhbmNlIGhhcyBiZWVuIGNyZWF0ZWQgaXQgY2FuIGJlIGFjY2Vzc2VkIGdsb2JhbGx5IHVzaW5nIGBWaWRlbygnZXhhbXBsZV92aWRlb18xJylgLlxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgdmpzLkNvbXBvbmVudFxuICovXG52anMuUGxheWVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuXG4gIC8qKlxuICAgKiBwbGF5ZXIncyBjb25zdHJ1Y3RvciBmdW5jdGlvblxuICAgKlxuICAgKiBAY29uc3RydWN0c1xuICAgKiBAbWV0aG9kIGluaXRcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YWcgICAgICAgIFRoZSBvcmlnaW5hbCB2aWRlbyB0YWcgdXNlZCBmb3IgY29uZmlndXJpbmcgb3B0aW9uc1xuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgICAgUGxheWVyIG9wdGlvbnNcbiAgICogQHBhcmFtIHtGdW5jdGlvbj19IHJlYWR5ICAgIFJlYWR5IGNhbGxiYWNrIGZ1bmN0aW9uXG4gICAqL1xuICBpbml0OiBmdW5jdGlvbih0YWcsIG9wdGlvbnMsIHJlYWR5KXtcbiAgICB0aGlzLnRhZyA9IHRhZzsgLy8gU3RvcmUgdGhlIG9yaWdpbmFsIHRhZyB1c2VkIHRvIHNldCBvcHRpb25zXG5cbiAgICAvLyBTZXQgT3B0aW9uc1xuICAgIC8vIFRoZSBvcHRpb25zIGFyZ3VtZW50IG92ZXJyaWRlcyBvcHRpb25zIHNldCBpbiB0aGUgdmlkZW8gdGFnXG4gICAgLy8gd2hpY2ggb3ZlcnJpZGVzIGdsb2JhbGx5IHNldCBvcHRpb25zLlxuICAgIC8vIFRoaXMgbGF0dGVyIHBhcnQgY29pbmNpZGVzIHdpdGggdGhlIGxvYWQgb3JkZXJcbiAgICAvLyAodGFnIG11c3QgZXhpc3QgYmVmb3JlIFBsYXllcilcbiAgICBvcHRpb25zID0gdmpzLm9iai5tZXJnZSh0aGlzLmdldFRhZ1NldHRpbmdzKHRhZyksIG9wdGlvbnMpO1xuXG4gICAgLy8gQ2FjaGUgZm9yIHZpZGVvIHByb3BlcnR5IHZhbHVlcy5cbiAgICB0aGlzLmNhY2hlXyA9IHt9O1xuXG4gICAgLy8gU2V0IHBvc3RlclxuICAgIHRoaXMucG9zdGVyXyA9IG9wdGlvbnNbJ3Bvc3RlciddO1xuICAgIC8vIFNldCBjb250cm9sc1xuICAgIHRoaXMuY29udHJvbHNfID0gb3B0aW9uc1snY29udHJvbHMnXTtcbiAgICAvLyBPcmlnaW5hbCB0YWcgc2V0dGluZ3Mgc3RvcmVkIGluIG9wdGlvbnNcbiAgICAvLyBub3cgcmVtb3ZlIGltbWVkaWF0ZWx5IHNvIG5hdGl2ZSBjb250cm9scyBkb24ndCBmbGFzaC5cbiAgICAvLyBNYXkgYmUgdHVybmVkIGJhY2sgb24gYnkgSFRNTDUgdGVjaCBpZiBuYXRpdmVDb250cm9sc0ZvclRvdWNoIGlzIHRydWVcbiAgICB0YWcuY29udHJvbHMgPSBmYWxzZTtcblxuICAgIC8vIFJ1biBiYXNlIGNvbXBvbmVudCBpbml0aWFsaXppbmcgd2l0aCBuZXcgb3B0aW9ucy5cbiAgICAvLyBCdWlsZHMgdGhlIGVsZW1lbnQgdGhyb3VnaCBjcmVhdGVFbCgpXG4gICAgLy8gSW5pdHMgYW5kIGVtYmVkcyBhbnkgY2hpbGQgY29tcG9uZW50cyBpbiBvcHRzXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHRoaXMsIG9wdGlvbnMsIHJlYWR5KTtcblxuICAgIC8vIFVwZGF0ZSBjb250cm9scyBjbGFzc05hbWUuIENhbid0IGRvIHRoaXMgd2hlbiB0aGUgY29udHJvbHMgYXJlIGluaXRpYWxseVxuICAgIC8vIHNldCBiZWNhdXNlIHRoZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgeWV0LlxuICAgIGlmICh0aGlzLmNvbnRyb2xzKCkpIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1lbmFibGVkJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1kaXNhYmxlZCcpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBzbWFydGVyLiBUb2dnbGUgdXNlciBzdGF0ZSBiZXR3ZWVuIHRvdWNoaW5nL21vdXNpbmdcbiAgICAvLyB1c2luZyBldmVudHMsIHNpbmNlIGRldmljZXMgY2FuIGhhdmUgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzLlxuICAgIC8vIGlmICh2anMuVE9VQ0hfRU5BQkxFRCkge1xuICAgIC8vICAgdGhpcy5hZGRDbGFzcygndmpzLXRvdWNoLWVuYWJsZWQnKTtcbiAgICAvLyB9XG5cbiAgICAvLyBGaXJzdHBsYXkgZXZlbnQgaW1wbGltZW50YXRpb24uIE5vdCBzb2xkIG9uIHRoZSBldmVudCB5ZXQuXG4gICAgLy8gQ291bGQgcHJvYmFibHkganVzdCBjaGVjayBjdXJyZW50VGltZT09MD9cbiAgICB0aGlzLm9uZSgncGxheScsIGZ1bmN0aW9uKGUpe1xuICAgICAgdmFyIGZwRXZlbnQgPSB7IHR5cGU6ICdmaXJzdHBsYXknLCB0YXJnZXQ6IHRoaXMuZWxfIH07XG4gICAgICAvLyBVc2luZyB2anMudHJpZ2dlciBzbyB3ZSBjYW4gY2hlY2sgaWYgZGVmYXVsdCB3YXMgcHJldmVudGVkXG4gICAgICB2YXIga2VlcEdvaW5nID0gdmpzLnRyaWdnZXIodGhpcy5lbF8sIGZwRXZlbnQpO1xuXG4gICAgICBpZiAoIWtlZXBHb2luZykge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdlbmRlZCcsIHRoaXMub25FbmRlZCk7XG4gICAgdGhpcy5vbigncGxheScsIHRoaXMub25QbGF5KTtcbiAgICB0aGlzLm9uKCdmaXJzdHBsYXknLCB0aGlzLm9uRmlyc3RQbGF5KTtcbiAgICB0aGlzLm9uKCdwYXVzZScsIHRoaXMub25QYXVzZSk7XG4gICAgdGhpcy5vbigncHJvZ3Jlc3MnLCB0aGlzLm9uUHJvZ3Jlc3MpO1xuICAgIHRoaXMub24oJ2R1cmF0aW9uY2hhbmdlJywgdGhpcy5vbkR1cmF0aW9uQ2hhbmdlKTtcbiAgICB0aGlzLm9uKCdlcnJvcicsIHRoaXMub25FcnJvcik7XG4gICAgdGhpcy5vbignZnVsbHNjcmVlbmNoYW5nZScsIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKTtcblxuICAgIC8vIE1ha2UgcGxheWVyIGVhc2lseSBmaW5kYWJsZSBieSBJRFxuICAgIHZqcy5wbGF5ZXJzW3RoaXMuaWRfXSA9IHRoaXM7XG5cbiAgICBpZiAob3B0aW9uc1sncGx1Z2lucyddKSB7XG4gICAgICB2anMub2JqLmVhY2gob3B0aW9uc1sncGx1Z2lucyddLCBmdW5jdGlvbihrZXksIHZhbCl7XG4gICAgICAgIHRoaXNba2V5XSh2YWwpO1xuICAgICAgfSwgdGhpcyk7XG4gICAgfVxuXG4gICAgdGhpcy5saXN0ZW5Gb3JVc2VyQWN0aXZpdHkoKTtcbiAgfVxufSk7XG5cbi8qKlxuICogUGxheWVyIGluc3RhbmNlIG9wdGlvbnMsIHN1cmZhY2VkIHVzaW5nIHZqcy5vcHRpb25zXG4gKiB2anMub3B0aW9ucyA9IHZqcy5QbGF5ZXIucHJvdG90eXBlLm9wdGlvbnNfXG4gKiBNYWtlIGNoYW5nZXMgaW4gdmpzLm9wdGlvbnMsIG5vdCBoZXJlLlxuICogQWxsIG9wdGlvbnMgc2hvdWxkIHVzZSBzdHJpbmcga2V5cyBzbyB0aGV5IGF2b2lkXG4gKiByZW5hbWluZyBieSBjbG9zdXJlIGNvbXBpbGVyXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub3B0aW9uc18gPSB2anMub3B0aW9ucztcblxuLyoqXG4gKiBEZXN0cm95cyB0aGUgdmlkZW8gcGxheWVyIGFuZCBkb2VzIGFueSBuZWNlc3NhcnkgY2xlYW51cFxuICpcbiAqICAgICBteVBsYXllci5kaXNwb3NlKCk7XG4gKlxuICogVGhpcyBpcyBlc3BlY2lhbGx5IGhlbHBmdWwgaWYgeW91IGFyZSBkeW5hbWljYWxseSBhZGRpbmcgYW5kIHJlbW92aW5nIHZpZGVvc1xuICogdG8vZnJvbSB0aGUgRE9NLlxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy50cmlnZ2VyKCdkaXNwb3NlJyk7XG4gIC8vIHByZXZlbnQgZGlzcG9zZSBmcm9tIGJlaW5nIGNhbGxlZCB0d2ljZVxuICB0aGlzLm9mZignZGlzcG9zZScpO1xuXG4gIC8vIEtpbGwgcmVmZXJlbmNlIHRvIHRoaXMgcGxheWVyXG4gIHZqcy5wbGF5ZXJzW3RoaXMuaWRfXSA9IG51bGw7XG4gIGlmICh0aGlzLnRhZyAmJiB0aGlzLnRhZ1sncGxheWVyJ10pIHsgdGhpcy50YWdbJ3BsYXllciddID0gbnVsbDsgfVxuICBpZiAodGhpcy5lbF8gJiYgdGhpcy5lbF9bJ3BsYXllciddKSB7IHRoaXMuZWxfWydwbGF5ZXInXSA9IG51bGw7IH1cblxuICAvLyBFbnN1cmUgdGhhdCB0cmFja2luZyBwcm9ncmVzcyBhbmQgdGltZSBwcm9ncmVzcyB3aWxsIHN0b3AgYW5kIHBsYXRlciBkZWxldGVkXG4gIHRoaXMuc3RvcFRyYWNraW5nUHJvZ3Jlc3MoKTtcbiAgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSgpO1xuXG4gIGlmICh0aGlzLnRlY2gpIHsgdGhpcy50ZWNoLmRpc3Bvc2UoKTsgfVxuXG4gIC8vIENvbXBvbmVudCBkaXNwb3NlXG4gIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcbn07XG5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLmdldFRhZ1NldHRpbmdzID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgJ3NvdXJjZXMnOiBbXSxcbiAgICAndHJhY2tzJzogW11cbiAgfTtcblxuICB2anMub2JqLm1lcmdlKG9wdGlvbnMsIHZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXModGFnKSk7XG5cbiAgLy8gR2V0IHRhZyBjaGlsZHJlbiBzZXR0aW5nc1xuICBpZiAodGFnLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHZhciBjaGlsZHJlbiwgY2hpbGQsIGNoaWxkTmFtZSwgaSwgajtcblxuICAgIGNoaWxkcmVuID0gdGFnLmNoaWxkTm9kZXM7XG5cbiAgICBmb3IgKGk9MCxqPWNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICAvLyBDaGFuZ2UgY2FzZSBuZWVkZWQ6IGh0dHA6Ly9lam9obi5vcmcvYmxvZy9ub2RlbmFtZS1jYXNlLXNlbnNpdGl2aXR5L1xuICAgICAgY2hpbGROYW1lID0gY2hpbGQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgIGlmIChjaGlsZE5hbWUgPT09ICdzb3VyY2UnKSB7XG4gICAgICAgIG9wdGlvbnNbJ3NvdXJjZXMnXS5wdXNoKHZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXMoY2hpbGQpKTtcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGROYW1lID09PSAndHJhY2snKSB7XG4gICAgICAgIG9wdGlvbnNbJ3RyYWNrcyddLnB1c2godmpzLmdldEF0dHJpYnV0ZVZhbHVlcyhjaGlsZCkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvcHRpb25zO1xufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICB2YXIgZWwgPSB0aGlzLmVsXyA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicpO1xuICB2YXIgdGFnID0gdGhpcy50YWc7XG5cbiAgLy8gUmVtb3ZlIHdpZHRoL2hlaWdodCBhdHRycyBmcm9tIHRhZyBzbyBDU1MgY2FuIG1ha2UgaXQgMTAwJSB3aWR0aC9oZWlnaHRcbiAgdGFnLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKTtcbiAgdGFnLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XG4gIC8vIEVtcHR5IHZpZGVvIHRhZyB0cmFja3Mgc28gdGhlIGJ1aWx0LWluIHBsYXllciBkb2Vzbid0IHVzZSB0aGVtIGFsc28uXG4gIC8vIFRoaXMgbWF5IG5vdCBiZSBmYXN0IGVub3VnaCB0byBzdG9wIEhUTUw1IGJyb3dzZXJzIGZyb20gcmVhZGluZyB0aGUgdGFnc1xuICAvLyBzbyB3ZSdsbCBuZWVkIHRvIHR1cm4gb2ZmIGFueSBkZWZhdWx0IHRyYWNrcyBpZiB3ZSdyZSBtYW51YWxseSBkb2luZ1xuICAvLyBjYXB0aW9ucyBhbmQgc3VidGl0bGVzLiB2aWRlb0VsZW1lbnQudGV4dFRyYWNrc1xuICBpZiAodGFnLmhhc0NoaWxkTm9kZXMoKSkge1xuICAgIHZhciBub2Rlcywgbm9kZXNMZW5ndGgsIGksIG5vZGUsIG5vZGVOYW1lLCByZW1vdmVOb2RlcztcblxuICAgIG5vZGVzID0gdGFnLmNoaWxkTm9kZXM7XG4gICAgbm9kZXNMZW5ndGggPSBub2Rlcy5sZW5ndGg7XG4gICAgcmVtb3ZlTm9kZXMgPSBbXTtcblxuICAgIHdoaWxlIChub2Rlc0xlbmd0aC0tKSB7XG4gICAgICBub2RlID0gbm9kZXNbbm9kZXNMZW5ndGhdO1xuICAgICAgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgICBpZiAobm9kZU5hbWUgPT09ICd0cmFjaycpIHtcbiAgICAgICAgcmVtb3ZlTm9kZXMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGk9MDsgaTxyZW1vdmVOb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdGFnLnJlbW92ZUNoaWxkKHJlbW92ZU5vZGVzW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBNYWtlIHN1cmUgdGFnIElEIGV4aXN0c1xuICB0YWcuaWQgPSB0YWcuaWQgfHwgJ3Zqc192aWRlb18nICsgdmpzLmd1aWQrKztcblxuICAvLyBHaXZlIHZpZGVvIHRhZyBJRCBhbmQgY2xhc3MgdG8gcGxheWVyIGRpdlxuICAvLyBJRCB3aWxsIG5vdyByZWZlcmVuY2UgcGxheWVyIGJveCwgbm90IHRoZSB2aWRlbyB0YWdcbiAgZWwuaWQgPSB0YWcuaWQ7XG4gIGVsLmNsYXNzTmFtZSA9IHRhZy5jbGFzc05hbWU7XG5cbiAgLy8gVXBkYXRlIHRhZyBpZC9jbGFzcyBmb3IgdXNlIGFzIEhUTUw1IHBsYXliYWNrIHRlY2hcbiAgLy8gTWlnaHQgdGhpbmsgd2Ugc2hvdWxkIGRvIHRoaXMgYWZ0ZXIgZW1iZWRkaW5nIGluIGNvbnRhaW5lciBzbyAudmpzLXRlY2ggY2xhc3NcbiAgLy8gZG9lc24ndCBmbGFzaCAxMDAlIHdpZHRoL2hlaWdodCwgYnV0IGNsYXNzIG9ubHkgYXBwbGllcyB3aXRoIC52aWRlby1qcyBwYXJlbnRcbiAgdGFnLmlkICs9ICdfaHRtbDVfYXBpJztcbiAgdGFnLmNsYXNzTmFtZSA9ICd2anMtdGVjaCc7XG5cbiAgLy8gTWFrZSBwbGF5ZXIgZmluZGFibGUgb24gZWxlbWVudHNcbiAgdGFnWydwbGF5ZXInXSA9IGVsWydwbGF5ZXInXSA9IHRoaXM7XG4gIC8vIERlZmF1bHQgc3RhdGUgb2YgdmlkZW8gaXMgcGF1c2VkXG4gIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1wYXVzZWQnKTtcblxuICAvLyBNYWtlIGJveCB1c2Ugd2lkdGgvaGVpZ2h0IG9mIHRhZywgb3IgcmVseSBvbiBkZWZhdWx0IGltcGxlbWVudGF0aW9uXG4gIC8vIEVuZm9yY2Ugd2l0aCBDU1Mgc2luY2Ugd2lkdGgvaGVpZ2h0IGF0dHJzIGRvbid0IHdvcmsgb24gZGl2c1xuICB0aGlzLndpZHRoKHRoaXMub3B0aW9uc19bJ3dpZHRoJ10sIHRydWUpOyAvLyAodHJ1ZSkgU2tpcCByZXNpemUgbGlzdGVuZXIgb24gbG9hZFxuICB0aGlzLmhlaWdodCh0aGlzLm9wdGlvbnNfWydoZWlnaHQnXSwgdHJ1ZSk7XG5cbiAgLy8gV3JhcCB2aWRlbyB0YWcgaW4gZGl2IChlbC9ib3gpIGNvbnRhaW5lclxuICBpZiAodGFnLnBhcmVudE5vZGUpIHtcbiAgICB0YWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRhZyk7XG4gIH1cbiAgdmpzLmluc2VydEZpcnN0KHRhZywgZWwpOyAvLyBCcmVha3MgaVBob25lLCBmaXhlZCBpbiBIVE1MNSBzZXR1cC5cblxuICByZXR1cm4gZWw7XG59O1xuXG4vLyAvKiBNZWRpYSBUZWNobm9sb2d5ICh0ZWNoKVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8vIExvYWQvQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHBsYXliYWNrIHRlY2hubG9neSBpbmNsdWRpbmcgZWxlbWVudCBhbmQgQVBJIG1ldGhvZHNcbi8vIEFuZCBhcHBlbmQgcGxheWJhY2sgZWxlbWVudCBpbiBwbGF5ZXIgZGl2LlxudmpzLlBsYXllci5wcm90b3R5cGUubG9hZFRlY2ggPSBmdW5jdGlvbih0ZWNoTmFtZSwgc291cmNlKXtcblxuICAvLyBQYXVzZSBhbmQgcmVtb3ZlIGN1cnJlbnQgcGxheWJhY2sgdGVjaG5vbG9neVxuICBpZiAodGhpcy50ZWNoKSB7XG4gICAgdGhpcy51bmxvYWRUZWNoKCk7XG5cbiAgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSBsb2FkaW5nLCBIVE1MNSB0YWcgd2lsbCBleGlzdCBidXQgd29uJ3QgYmUgaW5pdGlhbGl6ZWRcbiAgLy8gc28gd2UgbmVlZCB0byByZW1vdmUgaXQgaWYgd2UncmUgbm90IGxvYWRpbmcgSFRNTDVcbiAgfSBlbHNlIGlmICh0ZWNoTmFtZSAhPT0gJ0h0bWw1JyAmJiB0aGlzLnRhZykge1xuICAgIHZqcy5IdG1sNS5kaXNwb3NlTWVkaWFFbGVtZW50KHRoaXMudGFnKTtcbiAgICB0aGlzLnRhZyA9IG51bGw7XG4gIH1cblxuICB0aGlzLnRlY2hOYW1lID0gdGVjaE5hbWU7XG5cbiAgLy8gVHVybiBvZmYgQVBJIGFjY2VzcyBiZWNhdXNlIHdlJ3JlIGxvYWRpbmcgYSBuZXcgdGVjaCB0aGF0IG1pZ2h0IGxvYWQgYXN5bmNocm9ub3VzbHlcbiAgdGhpcy5pc1JlYWR5XyA9IGZhbHNlO1xuXG4gIHZhciB0ZWNoUmVhZHkgPSBmdW5jdGlvbigpe1xuICAgIHRoaXMucGxheWVyXy50cmlnZ2VyUmVhZHkoKTtcblxuICAgIC8vIE1hbnVhbGx5IHRyYWNrIHByb2dyZXNzIGluIGNhc2VzIHdoZXJlIHRoZSBicm93c2VyL2ZsYXNoIHBsYXllciBkb2Vzbid0IHJlcG9ydCBpdC5cbiAgICBpZiAoIXRoaXMuZmVhdHVyZXNbJ3Byb2dyZXNzRXZlbnRzJ10pIHtcbiAgICAgIHRoaXMucGxheWVyXy5tYW51YWxQcm9ncmVzc09uKCk7XG4gICAgfVxuXG4gICAgLy8gTWFudWFsbHkgdHJhY2sgdGltZXVkcGF0ZXMgaW4gY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIvZmxhc2ggcGxheWVyIGRvZXNuJ3QgcmVwb3J0IGl0LlxuICAgIGlmICghdGhpcy5mZWF0dXJlc1sndGltZXVwZGF0ZUV2ZW50cyddKSB7XG4gICAgICB0aGlzLnBsYXllcl8ubWFudWFsVGltZVVwZGF0ZXNPbigpO1xuICAgIH1cbiAgfTtcblxuICAvLyBHcmFiIHRlY2gtc3BlY2lmaWMgb3B0aW9ucyBmcm9tIHBsYXllciBvcHRpb25zIGFuZCBhZGQgc291cmNlIGFuZCBwYXJlbnQgZWxlbWVudCB0byB1c2UuXG4gIHZhciB0ZWNoT3B0aW9ucyA9IHZqcy5vYmoubWVyZ2UoeyAnc291cmNlJzogc291cmNlLCAncGFyZW50RWwnOiB0aGlzLmVsXyB9LCB0aGlzLm9wdGlvbnNfW3RlY2hOYW1lLnRvTG93ZXJDYXNlKCldKTtcblxuICBpZiAoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZS5zcmMgPT0gdGhpcy5jYWNoZV8uc3JjICYmIHRoaXMuY2FjaGVfLmN1cnJlbnRUaW1lID4gMCkge1xuICAgICAgdGVjaE9wdGlvbnNbJ3N0YXJ0VGltZSddID0gdGhpcy5jYWNoZV8uY3VycmVudFRpbWU7XG4gICAgfVxuXG4gICAgdGhpcy5jYWNoZV8uc3JjID0gc291cmNlLnNyYztcbiAgfVxuXG4gIC8vIEluaXRpYWxpemUgdGVjaCBpbnN0YW5jZVxuICB0aGlzLnRlY2ggPSBuZXcgd2luZG93Wyd2aWRlb2pzJ11bdGVjaE5hbWVdKHRoaXMsIHRlY2hPcHRpb25zKTtcblxuICB0aGlzLnRlY2gucmVhZHkodGVjaFJlYWR5KTtcbn07XG5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVubG9hZFRlY2ggPSBmdW5jdGlvbigpe1xuICB0aGlzLmlzUmVhZHlfID0gZmFsc2U7XG4gIHRoaXMudGVjaC5kaXNwb3NlKCk7XG5cbiAgLy8gVHVybiBvZmYgYW55IG1hbnVhbCBwcm9ncmVzcyBvciB0aW1ldXBkYXRlIHRyYWNraW5nXG4gIGlmICh0aGlzLm1hbnVhbFByb2dyZXNzKSB7IHRoaXMubWFudWFsUHJvZ3Jlc3NPZmYoKTsgfVxuXG4gIGlmICh0aGlzLm1hbnVhbFRpbWVVcGRhdGVzKSB7IHRoaXMubWFudWFsVGltZVVwZGF0ZXNPZmYoKTsgfVxuXG4gIHRoaXMudGVjaCA9IGZhbHNlO1xufTtcblxuLy8gVGhlcmUncyBtYW55IGlzc3VlcyBhcm91bmQgY2hhbmdpbmcgdGhlIHNpemUgb2YgYSBGbGFzaCAob3Igb3RoZXIgcGx1Z2luKSBvYmplY3QuXG4vLyBGaXJzdCBpcyBhIHBsdWdpbiByZWxvYWQgaXNzdWUgaW4gRmlyZWZveCB0aGF0IGhhcyBiZWVuIGFyb3VuZCBmb3IgMTEgeWVhcnM6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkwMjY4XG4vLyBUaGVuIHdpdGggdGhlIG5ldyBmdWxsc2NyZWVuIEFQSSwgTW96aWxsYSBhbmQgd2Via2l0IGJyb3dzZXJzIHdpbGwgcmVsb2FkIHRoZSBmbGFzaCBvYmplY3QgYWZ0ZXIgZ29pbmcgdG8gZnVsbHNjcmVlbi5cbi8vIFRvIGdldCBhcm91bmQgdGhpcywgd2UncmUgdW5sb2FkaW5nIHRoZSB0ZWNoLCBjYWNoaW5nIHNvdXJjZSBhbmQgY3VycmVudFRpbWUgdmFsdWVzLCBhbmQgcmVsb2FkaW5nIHRoZSB0ZWNoIG9uY2UgdGhlIHBsdWdpbiBpcyByZXNpemVkLlxuLy8gcmVsb2FkVGVjaDogZnVuY3Rpb24oYmV0d2VlbkZuKXtcbi8vICAgdmpzLmxvZygndW5sb2FkaW5nVGVjaCcpXG4vLyAgIHRoaXMudW5sb2FkVGVjaCgpO1xuLy8gICB2anMubG9nKCd1bmxvYWRlZFRlY2gnKVxuLy8gICBpZiAoYmV0d2VlbkZuKSB7IGJldHdlZW5Gbi5jYWxsKCk7IH1cbi8vICAgdmpzLmxvZygnTG9hZGluZ1RlY2gnKVxuLy8gICB0aGlzLmxvYWRUZWNoKHRoaXMudGVjaE5hbWUsIHsgc3JjOiB0aGlzLmNhY2hlXy5zcmMgfSlcbi8vICAgdmpzLmxvZygnbG9hZGVkVGVjaCcpXG4vLyB9LFxuXG4vKiBGYWxsYmFja3MgZm9yIHVuc3VwcG9ydGVkIGV2ZW50IHR5cGVzXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuLy8gTWFudWFsbHkgdHJpZ2dlciBwcm9ncmVzcyBldmVudHMgYmFzZWQgb24gY2hhbmdlcyB0byB0aGUgYnVmZmVyZWQgYW1vdW50XG4vLyBNYW55IGZsYXNoIHBsYXllcnMgYW5kIG9sZGVyIEhUTUw1IGJyb3dzZXJzIGRvbid0IHNlbmQgcHJvZ3Jlc3Mgb3IgcHJvZ3Jlc3MtbGlrZSBldmVudHNcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm1hbnVhbFByb2dyZXNzT24gPSBmdW5jdGlvbigpe1xuICB0aGlzLm1hbnVhbFByb2dyZXNzID0gdHJ1ZTtcblxuICAvLyBUcmlnZ2VyIHByb2dyZXNzIHdhdGNoaW5nIHdoZW4gYSBzb3VyY2UgYmVnaW5zIGxvYWRpbmdcbiAgdGhpcy50cmFja1Byb2dyZXNzKCk7XG5cbiAgLy8gV2F0Y2ggZm9yIGEgbmF0aXZlIHByb2dyZXNzIGV2ZW50IGNhbGwgb24gdGhlIHRlY2ggZWxlbWVudFxuICAvLyBJbiBIVE1MNSwgc29tZSBvbGRlciB2ZXJzaW9ucyBkb24ndCBzdXBwb3J0IHRoZSBwcm9ncmVzcyBldmVudFxuICAvLyBTbyB3ZSdyZSBhc3N1bWluZyB0aGV5IGRvbid0LCBhbmQgdHVybmluZyBvZmYgbWFudWFsIHByb2dyZXNzIGlmIHRoZXkgZG8uXG4gIC8vIEFzIG9wcG9zZWQgdG8gZG9pbmcgdXNlciBhZ2VudCBkZXRlY3Rpb25cbiAgdGhpcy50ZWNoLm9uZSgncHJvZ3Jlc3MnLCBmdW5jdGlvbigpe1xuXG4gICAgLy8gVXBkYXRlIGtub3duIHByb2dyZXNzIHN1cHBvcnQgZm9yIHRoaXMgcGxheWJhY2sgdGVjaG5vbG9neVxuICAgIHRoaXMuZmVhdHVyZXNbJ3Byb2dyZXNzRXZlbnRzJ10gPSB0cnVlO1xuXG4gICAgLy8gVHVybiBvZmYgbWFudWFsIHByb2dyZXNzIHRyYWNraW5nXG4gICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFByb2dyZXNzT2ZmKCk7XG4gIH0pO1xufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsUHJvZ3Jlc3NPZmYgPSBmdW5jdGlvbigpe1xuICB0aGlzLm1hbnVhbFByb2dyZXNzID0gZmFsc2U7XG4gIHRoaXMuc3RvcFRyYWNraW5nUHJvZ3Jlc3MoKTtcbn07XG5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRyYWNrUHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xuXG4gIHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICAgLy8gRG9uJ3QgdHJpZ2dlciB1bmxlc3MgYnVmZmVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiBsYXN0IHRpbWVcbiAgICAvLyBsb2codGhpcy5jYWNoZV8uYnVmZmVyRW5kLCB0aGlzLmJ1ZmZlcmVkKCkuZW5kKDApLCB0aGlzLmR1cmF0aW9uKCkpXG4gICAgLyogVE9ETzogdXBkYXRlIGZvciBtdWx0aXBsZSBidWZmZXJlZCByZWdpb25zICovXG4gICAgaWYgKHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCA8IHRoaXMuYnVmZmVyZWQoKS5lbmQoMCkpIHtcbiAgICAgIHRoaXMudHJpZ2dlcigncHJvZ3Jlc3MnKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuYnVmZmVyZWRQZXJjZW50KCkgPT0gMSkge1xuICAgICAgdGhpcy5zdG9wVHJhY2tpbmdQcm9ncmVzcygpO1xuICAgICAgdGhpcy50cmlnZ2VyKCdwcm9ncmVzcycpOyAvLyBMYXN0IHVwZGF0ZVxuICAgIH1cbiAgfSksIDUwMCk7XG59O1xudmpzLlBsYXllci5wcm90b3R5cGUuc3RvcFRyYWNraW5nUHJvZ3Jlc3MgPSBmdW5jdGlvbigpeyBjbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCk7IH07XG5cbi8qISBUaW1lIFRyYWNraW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG52anMuUGxheWVyLnByb3RvdHlwZS5tYW51YWxUaW1lVXBkYXRlc09uID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5tYW51YWxUaW1lVXBkYXRlcyA9IHRydWU7XG5cbiAgdGhpcy5vbigncGxheScsIHRoaXMudHJhY2tDdXJyZW50VGltZSk7XG4gIHRoaXMub24oJ3BhdXNlJywgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSk7XG4gIC8vIHRpbWV1cGRhdGUgaXMgYWxzbyBjYWxsZWQgYnkgLmN1cnJlbnRUaW1lIHdoZW5ldmVyIGN1cnJlbnQgdGltZSBpcyBzZXRcblxuICAvLyBXYXRjaCBmb3IgbmF0aXZlIHRpbWV1cGRhdGUgZXZlbnRcbiAgdGhpcy50ZWNoLm9uZSgndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCl7XG4gICAgLy8gVXBkYXRlIGtub3duIHByb2dyZXNzIHN1cHBvcnQgZm9yIHRoaXMgcGxheWJhY2sgdGVjaG5vbG9neVxuICAgIHRoaXMuZmVhdHVyZXNbJ3RpbWV1cGRhdGVFdmVudHMnXSA9IHRydWU7XG4gICAgLy8gVHVybiBvZmYgbWFudWFsIHByb2dyZXNzIHRyYWNraW5nXG4gICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFRpbWVVcGRhdGVzT2ZmKCk7XG4gIH0pO1xufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsVGltZVVwZGF0ZXNPZmYgPSBmdW5jdGlvbigpe1xuICB0aGlzLm1hbnVhbFRpbWVVcGRhdGVzID0gZmFsc2U7XG4gIHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUoKTtcbiAgdGhpcy5vZmYoJ3BsYXknLCB0aGlzLnRyYWNrQ3VycmVudFRpbWUpO1xuICB0aGlzLm9mZigncGF1c2UnLCB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKTtcbn07XG5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRyYWNrQ3VycmVudFRpbWUgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5jdXJyZW50VGltZUludGVydmFsKSB7IHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUoKTsgfVxuICB0aGlzLmN1cnJlbnRUaW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xuICAgIHRoaXMudHJpZ2dlcigndGltZXVwZGF0ZScpO1xuICB9KSwgMjUwKTsgLy8gNDIgPSAyNCBmcHMgLy8gMjUwIGlzIHdoYXQgV2Via2l0IHVzZXMgLy8gRkYgdXNlcyAxNVxufTtcblxuLy8gVHVybiBvZmYgcGxheSBwcm9ncmVzcyB0cmFja2luZyAod2hlbiBwYXVzZWQgb3IgZHJhZ2dpbmcpXG52anMuUGxheWVyLnByb3RvdHlwZS5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCl7IGNsZWFySW50ZXJ2YWwodGhpcy5jdXJyZW50VGltZUludGVydmFsKTsgfTtcblxuLy8gLyogUGxheWVyIGV2ZW50IGhhbmRsZXJzIChob3cgdGhlIHBsYXllciByZWFjdHMgdG8gY2VydGFpbiBldmVudHMpXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgYWdlbnQgYmVnaW5zIGxvb2tpbmcgZm9yIG1lZGlhIGRhdGFcbiAqIEBldmVudCBsb2Fkc3RhcnRcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25Mb2FkU3RhcnQ7XG5cbi8qKlxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBpbml0aWFsIGR1cmF0aW9uIGFuZCBkaW1lbnNpb24gaW5mb3JtYXRpb25cbiAqIEBldmVudCBsb2FkZWRtZXRhZGF0YVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRlZE1ldGFEYXRhO1xuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIHBsYXllciBoYXMgZG93bmxvYWRlZCBkYXRhIGF0IHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uXG4gKiBAZXZlbnQgbG9hZGVkZGF0YVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRlZERhdGE7XG5cbi8qKlxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBmaW5pc2hlZCBkb3dubG9hZGluZyB0aGUgc291cmNlIGRhdGFcbiAqIEBldmVudCBsb2FkZWRhbGxkYXRhXG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uTG9hZGVkQWxsRGF0YTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuZXZlciB0aGUgbWVkaWEgYmVnaW5zIG9yIHJlc3VtZXMgcGxheWJhY2tcbiAqIEBldmVudCBwbGF5XG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uUGxheSA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXBsYXlpbmcnKTtcbn07XG5cbi8qKlxuICogRmlyZWQgdGhlIGZpcnN0IHRpbWUgYSB2aWRlbyBpcyBwbGF5ZWRcbiAqXG4gKiBOb3QgcGFydCBvZiB0aGUgSExTIHNwZWMsIGFuZCB3ZSdyZSBub3Qgc3VyZSBpZiB0aGlzIGlzIHRoZSBiZXN0XG4gKiBpbXBsZW1lbnRhdGlvbiB5ZXQsIHNvIHVzZSBzcGFyaW5nbHkuIElmIHlvdSBkb24ndCBoYXZlIGEgcmVhc29uIHRvXG4gKiBwcmV2ZW50IHBsYXliYWNrLCB1c2UgYG15UGxheWVyLm9uZSgncGxheScpO2AgaW5zdGVhZC5cbiAqXG4gKiBAZXZlbnQgZmlyc3RwbGF5XG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRmlyc3RQbGF5ID0gZnVuY3Rpb24oKXtcbiAgICAvL0lmIHRoZSBmaXJzdCBzdGFydHRpbWUgYXR0cmlidXRlIGlzIHNwZWNpZmllZFxuICAgIC8vdGhlbiB3ZSB3aWxsIHN0YXJ0IGF0IHRoZSBnaXZlbiBvZmZzZXQgaW4gc2Vjb25kc1xuICAgIGlmKHRoaXMub3B0aW9uc19bJ3N0YXJ0dGltZSddKXtcbiAgICAgIHRoaXMuY3VycmVudFRpbWUodGhpcy5vcHRpb25zX1snc3RhcnR0aW1lJ10pO1xuICAgIH1cblxuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oYXMtc3RhcnRlZCcpO1xufTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuZXZlciB0aGUgbWVkaWEgaGFzIGJlZW4gcGF1c2VkXG4gKiBAZXZlbnQgcGF1c2VcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25QYXVzZSA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wbGF5aW5nJyk7XG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcbn07XG5cbi8qKlxuICogRmlyZWQgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxuICpcbiAqIER1cmluZyBwbGF5YmFjayB0aGlzIGlzIGZpcmVkIGV2ZXJ5IDE1LTI1MCBtaWxsaXNlY29uZHMsIGRlcG5kaW5nIG9uIHRoZVxuICogcGxheWJhY2sgdGVjaG5vbG9neSBpbiB1c2UuXG4gKiBAZXZlbnQgdGltZXVwZGF0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5vblRpbWVVcGRhdGU7XG5cbi8qKlxuICogRmlyZWQgd2hpbGUgdGhlIHVzZXIgYWdlbnQgaXMgZG93bmxvYWRpbmcgbWVkaWEgZGF0YVxuICogQGV2ZW50IHByb2dyZXNzXG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uUHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xuICAvLyBBZGQgY3VzdG9tIGV2ZW50IGZvciB3aGVuIHNvdXJjZSBpcyBmaW5pc2hlZCBkb3dubG9hZGluZy5cbiAgaWYgKHRoaXMuYnVmZmVyZWRQZXJjZW50KCkgPT0gMSkge1xuICAgIHRoaXMudHJpZ2dlcignbG9hZGVkYWxsZGF0YScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIGVuZCBvZiB0aGUgbWVkaWEgcmVzb3VyY2UgaXMgcmVhY2hlZCAoY3VycmVudFRpbWUgPT0gZHVyYXRpb24pXG4gKiBAZXZlbnQgZW5kZWRcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25FbmRlZCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLm9wdGlvbnNfWydsb29wJ10pIHtcbiAgICB0aGlzLmN1cnJlbnRUaW1lKDApO1xuICAgIHRoaXMucGxheSgpO1xuICB9XG59O1xuXG4vKipcbiAqIEZpcmVkIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBtZWRpYSByZXNvdXJjZSBpcyBmaXJzdCBrbm93biBvciBjaGFuZ2VkXG4gKiBAZXZlbnQgZHVyYXRpb25jaGFuZ2VcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25EdXJhdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCl7XG4gIC8vIEFsbG93cyBmb3IgY2FjaGVpbmcgdmFsdWUgaW5zdGVhZCBvZiBhc2tpbmcgcGxheWVyIGVhY2ggdGltZS5cbiAgdGhpcy5kdXJhdGlvbih0aGlzLnRlY2hHZXQoJ2R1cmF0aW9uJykpO1xufTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZSB2b2x1bWUgY2hhbmdlc1xuICogQGV2ZW50IHZvbHVtZWNoYW5nZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5vblZvbHVtZUNoYW5nZTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZSBwbGF5ZXIgc3dpdGNoZXMgaW4gb3Igb3V0IG9mIGZ1bGxzY3JlZW4gbW9kZVxuICogQGV2ZW50IGZ1bGxzY3JlZW5jaGFuZ2VcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25GdWxsc2NyZWVuQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLmlzRnVsbFNjcmVlbikge1xuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1mdWxsc2NyZWVuJyk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWZ1bGxzY3JlZW4nKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGaXJlZCB3aGVuIHRoZXJlIGlzIGFuIGVycm9yIGluIHBsYXliYWNrXG4gKiBAZXZlbnQgZXJyb3JcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmpzLmxvZygnVmlkZW8gRXJyb3InLCBlKTtcbn07XG5cbi8vIC8qIFBsYXllciBBUElcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG5cbi8qKlxuICogT2JqZWN0IGZvciBjYWNoZWQgdmFsdWVzLlxuICogQHByaXZhdGVcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUuY2FjaGVfO1xuXG52anMuUGxheWVyLnByb3RvdHlwZS5nZXRDYWNoZSA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmNhY2hlXztcbn07XG5cbi8vIFBhc3MgdmFsdWVzIHRvIHRoZSBwbGF5YmFjayB0ZWNoXG52anMuUGxheWVyLnByb3RvdHlwZS50ZWNoQ2FsbCA9IGZ1bmN0aW9uKG1ldGhvZCwgYXJnKXtcbiAgLy8gSWYgaXQncyBub3QgcmVhZHkgeWV0LCBjYWxsIG1ldGhvZCB3aGVuIGl0IGlzXG4gIGlmICh0aGlzLnRlY2ggJiYgIXRoaXMudGVjaC5pc1JlYWR5Xykge1xuICAgIHRoaXMudGVjaC5yZWFkeShmdW5jdGlvbigpe1xuICAgICAgdGhpc1ttZXRob2RdKGFyZyk7XG4gICAgfSk7XG5cbiAgLy8gT3RoZXJ3aXNlIGNhbGwgbWV0aG9kIG5vd1xuICB9IGVsc2Uge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnRlY2hbbWV0aG9kXShhcmcpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgdmpzLmxvZyhlKTtcbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG59O1xuXG4vLyBHZXQgY2FsbHMgY2FuJ3Qgd2FpdCBmb3IgdGhlIHRlY2gsIGFuZCBzb21ldGltZXMgZG9uJ3QgbmVlZCB0by5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRlY2hHZXQgPSBmdW5jdGlvbihtZXRob2Qpe1xuXG4gIGlmICh0aGlzLnRlY2ggJiYgdGhpcy50ZWNoLmlzUmVhZHlfKSB7XG5cbiAgICAvLyBGbGFzaCBsaWtlcyB0byBkaWUgYW5kIHJlbG9hZCB3aGVuIHlvdSBoaWRlIG9yIHJlcG9zaXRpb24gaXQuXG4gICAgLy8gSW4gdGhlc2UgY2FzZXMgdGhlIG9iamVjdCBtZXRob2RzIGdvIGF3YXkgYW5kIHdlIGdldCBlcnJvcnMuXG4gICAgLy8gV2hlbiB0aGF0IGhhcHBlbnMgd2UnbGwgY2F0Y2ggdGhlIGVycm9ycyBhbmQgaW5mb3JtIHRlY2ggdGhhdCBpdCdzIG5vdCByZWFkeSBhbnkgbW9yZS5cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHRoaXMudGVjaFttZXRob2RdKCk7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBXaGVuIGJ1aWxkaW5nIGFkZGl0aW9uYWwgdGVjaCBsaWJzLCBhbiBleHBlY3RlZCBtZXRob2QgbWF5IG5vdCBiZSBkZWZpbmVkIHlldFxuICAgICAgaWYgKHRoaXMudGVjaFttZXRob2RdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmpzLmxvZygnVmlkZW8uanM6ICcgKyBtZXRob2QgKyAnIG1ldGhvZCBub3QgZGVmaW5lZCBmb3IgJyt0aGlzLnRlY2hOYW1lKycgcGxheWJhY2sgdGVjaG5vbG9neS4nLCBlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdoZW4gYSBtZXRob2QgaXNuJ3QgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgaXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gICAgICAgIGlmIChlLm5hbWUgPT0gJ1R5cGVFcnJvcicpIHtcbiAgICAgICAgICB2anMubG9nKCdWaWRlby5qczogJyArIG1ldGhvZCArICcgdW5hdmFpbGFibGUgb24gJyt0aGlzLnRlY2hOYW1lKycgcGxheWJhY2sgdGVjaG5vbG9neSBlbGVtZW50LicsIGUpO1xuICAgICAgICAgIHRoaXMudGVjaC5pc1JlYWR5XyA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZqcy5sb2coZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRocm93IGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuO1xufTtcblxuLyoqXG4gKiBzdGFydCBtZWRpYSBwbGF5YmFja1xuICpcbiAqICAgICBteVBsYXllci5wbGF5KCk7XG4gKlxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy50ZWNoQ2FsbCgncGxheScpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGF1c2UgdGhlIHZpZGVvIHBsYXliYWNrXG4gKlxuICogICAgIG15UGxheWVyLnBhdXNlKCk7XG4gKlxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMudGVjaENhbGwoJ3BhdXNlJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiB0aGUgcGxheWVyIGlzIHBhdXNlZFxuICpcbiAqICAgICB2YXIgaXNQYXVzZWQgPSBteVBsYXllci5wYXVzZWQoKTtcbiAqICAgICB2YXIgaXNQbGF5aW5nID0gIW15UGxheWVyLnBhdXNlZCgpO1xuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZhbHNlIGlmIHRoZSBtZWRpYSBpcyBjdXJyZW50bHkgcGxheWluZywgb3IgdHJ1ZSBvdGhlcndpc2VcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUucGF1c2VkID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhlIGluaXRpYWwgc3RhdGUgb2YgcGF1c2VkIHNob3VsZCBiZSB0cnVlIChpbiBTYWZhcmkgaXQncyBhY3R1YWxseSBmYWxzZSlcbiAgcmV0dXJuICh0aGlzLnRlY2hHZXQoJ3BhdXNlZCcpID09PSBmYWxzZSkgPyBmYWxzZSA6IHRydWU7XG59O1xuXG4vKipcbiAqIEdldCBvciBzZXQgdGhlIGN1cnJlbnQgdGltZSAoaW4gc2Vjb25kcylcbiAqXG4gKiAgICAgLy8gZ2V0XG4gKiAgICAgdmFyIHdoZXJlWW91QXQgPSBteVBsYXllci5jdXJyZW50VGltZSgpO1xuICpcbiAqICAgICAvLyBzZXRcbiAqICAgICBteVBsYXllci5jdXJyZW50VGltZSgxMjApOyAvLyAyIG1pbnV0ZXMgaW50byB0aGUgdmlkZW9cbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nPX0gc2Vjb25kcyBUaGUgdGltZSB0byBzZWVrIHRvXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBUaGUgdGltZSBpbiBzZWNvbmRzLCB3aGVuIG5vdCBzZXR0aW5nXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSAgICBzZWxmLCB3aGVuIHRoZSBjdXJyZW50IHRpbWUgaXMgc2V0XG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLmN1cnJlbnRUaW1lID0gZnVuY3Rpb24oc2Vjb25kcyl7XG4gIGlmIChzZWNvbmRzICE9PSB1bmRlZmluZWQpIHtcblxuICAgIC8vIGNhY2hlIHRoZSBsYXN0IHNldCB2YWx1ZSBmb3Igc21vb3RoZXIgc2NydWJiaW5nXG4gICAgdGhpcy5jYWNoZV8ubGFzdFNldEN1cnJlbnRUaW1lID0gc2Vjb25kcztcblxuICAgIHRoaXMudGVjaENhbGwoJ3NldEN1cnJlbnRUaW1lJywgc2Vjb25kcyk7XG5cbiAgICAvLyBpbXByb3ZlIHRoZSBhY2N1cmFjeSBvZiBtYW51YWwgdGltZXVwZGF0ZXNcbiAgICBpZiAodGhpcy5tYW51YWxUaW1lVXBkYXRlcykgeyB0aGlzLnRyaWdnZXIoJ3RpbWV1cGRhdGUnKTsgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBjYWNoZSBsYXN0IGN1cnJlbnRUaW1lIGFuZCByZXR1cm5cbiAgLy8gZGVmYXVsdCB0byAwIHNlY29uZHNcbiAgcmV0dXJuIHRoaXMuY2FjaGVfLmN1cnJlbnRUaW1lID0gKHRoaXMudGVjaEdldCgnY3VycmVudFRpbWUnKSB8fCAwKTtcbn07XG5cbi8qKlxuICogR2V0IHRoZSBsZW5ndGggaW4gdGltZSBvZiB0aGUgdmlkZW8gaW4gc2Vjb25kc1xuICpcbiAqICAgICB2YXIgbGVuZ3RoT2ZWaWRlbyA9IG15UGxheWVyLmR1cmF0aW9uKCk7XG4gKlxuICogKipOT1RFKio6IFRoZSB2aWRlbyBtdXN0IGhhdmUgc3RhcnRlZCBsb2FkaW5nIGJlZm9yZSB0aGUgZHVyYXRpb24gY2FuIGJlXG4gKiBrbm93biwgYW5kIGluIHRoZSBjYXNlIG9mIEZsYXNoLCBtYXkgbm90IGJlIGtub3duIHVudGlsIHRoZSB2aWRlbyBzdGFydHNcbiAqIHBsYXlpbmcuXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvIGluIHNlY29uZHNcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbihzZWNvbmRzKXtcbiAgaWYgKHNlY29uZHMgIT09IHVuZGVmaW5lZCkge1xuXG4gICAgLy8gY2FjaGUgdGhlIGxhc3Qgc2V0IHZhbHVlIGZvciBvcHRpbWlpemVkIHNjcnViYmluZyAoZXNwLiBGbGFzaClcbiAgICB0aGlzLmNhY2hlXy5kdXJhdGlvbiA9IHBhcnNlRmxvYXQoc2Vjb25kcyk7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmICh0aGlzLmNhY2hlXy5kdXJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5vbkR1cmF0aW9uQ2hhbmdlKCk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5jYWNoZV8uZHVyYXRpb247XG59O1xuXG4vLyBDYWxjdWxhdGVzIGhvdyBtdWNoIHRpbWUgaXMgbGVmdC4gTm90IGluIHNwZWMsIGJ1dCB1c2VmdWwuXG52anMuUGxheWVyLnByb3RvdHlwZS5yZW1haW5pbmdUaW1lID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMuZHVyYXRpb24oKSAtIHRoaXMuY3VycmVudFRpbWUoKTtcbn07XG5cbi8vIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdmlkZW8uaHRtbCNkb20tbWVkaWEtYnVmZmVyZWRcbi8vIEJ1ZmZlcmVkIHJldHVybnMgYSB0aW1lcmFuZ2Ugb2JqZWN0LlxuLy8gS2luZCBvZiBsaWtlIGFuIGFycmF5IG9mIHBvcnRpb25zIG9mIHRoZSB2aWRlbyB0aGF0IGhhdmUgYmVlbiBkb3dubG9hZGVkLlxuLy8gU28gZmFyIG5vIGJyb3dzZXJzIHJldHVybiBtb3JlIHRoYW4gb25lIHJhbmdlIChwb3J0aW9uKVxuXG4vKipcbiAqIEdldCBhIFRpbWVSYW5nZSBvYmplY3Qgd2l0aCB0aGUgdGltZXMgb2YgdGhlIHZpZGVvIHRoYXQgaGF2ZSBiZWVuIGRvd25sb2FkZWRcbiAqXG4gKiBJZiB5b3UganVzdCB3YW50IHRoZSBwZXJjZW50IG9mIHRoZSB2aWRlbyB0aGF0J3MgYmVlbiBkb3dubG9hZGVkLFxuICogdXNlIGJ1ZmZlcmVkUGVyY2VudC5cbiAqXG4gKiAgICAgLy8gTnVtYmVyIG9mIGRpZmZlcmVudCByYW5nZXMgb2YgdGltZSBoYXZlIGJlZW4gYnVmZmVyZWQuIFVzdWFsbHkgMS5cbiAqICAgICBudW1iZXJPZlJhbmdlcyA9IGJ1ZmZlcmVkVGltZVJhbmdlLmxlbmd0aCxcbiAqXG4gKiAgICAgLy8gVGltZSBpbiBzZWNvbmRzIHdoZW4gdGhlIGZpcnN0IHJhbmdlIHN0YXJ0cy4gVXN1YWxseSAwLlxuICogICAgIGZpcnN0UmFuZ2VTdGFydCA9IGJ1ZmZlcmVkVGltZVJhbmdlLnN0YXJ0KDApLFxuICpcbiAqICAgICAvLyBUaW1lIGluIHNlY29uZHMgd2hlbiB0aGUgZmlyc3QgcmFuZ2UgZW5kc1xuICogICAgIGZpcnN0UmFuZ2VFbmQgPSBidWZmZXJlZFRpbWVSYW5nZS5lbmQoMCksXG4gKlxuICogICAgIC8vIExlbmd0aCBpbiBzZWNvbmRzIG9mIHRoZSBmaXJzdCB0aW1lIHJhbmdlXG4gKiAgICAgZmlyc3RSYW5nZUxlbmd0aCA9IGZpcnN0UmFuZ2VFbmQgLSBmaXJzdFJhbmdlU3RhcnQ7XG4gKlxuICogQHJldHVybiB7T2JqZWN0fSBBIG1vY2sgVGltZVJhbmdlIG9iamVjdCAoZm9sbG93aW5nIEhUTUwgc3BlYylcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpe1xuICB2YXIgYnVmZmVyZWQgPSB0aGlzLnRlY2hHZXQoJ2J1ZmZlcmVkJyksXG4gICAgICBzdGFydCA9IDAsXG4gICAgICBidWZsYXN0ID0gYnVmZmVyZWQubGVuZ3RoIC0gMSxcbiAgICAgIC8vIERlZmF1bHQgZW5kIHRvIDAgYW5kIHN0b3JlIGluIHZhbHVlc1xuICAgICAgZW5kID0gdGhpcy5jYWNoZV8uYnVmZmVyRW5kID0gdGhpcy5jYWNoZV8uYnVmZmVyRW5kIHx8IDA7XG5cbiAgaWYgKGJ1ZmZlcmVkICYmIGJ1Zmxhc3QgPj0gMCAmJiBidWZmZXJlZC5lbmQoYnVmbGFzdCkgIT09IGVuZCkge1xuICAgIGVuZCA9IGJ1ZmZlcmVkLmVuZChidWZsYXN0KTtcbiAgICAvLyBTdG9yaW5nIHZhbHVlcyBhbGxvd3MgdGhlbSBiZSBvdmVycmlkZGVuIGJ5IHNldEJ1ZmZlcmVkRnJvbVByb2dyZXNzXG4gICAgdGhpcy5jYWNoZV8uYnVmZmVyRW5kID0gZW5kO1xuICB9XG5cbiAgcmV0dXJuIHZqcy5jcmVhdGVUaW1lUmFuZ2Uoc3RhcnQsIGVuZCk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgcGVyY2VudCAoYXMgYSBkZWNpbWFsKSBvZiB0aGUgdmlkZW8gdGhhdCdzIGJlZW4gZG93bmxvYWRlZFxuICpcbiAqICAgICB2YXIgaG93TXVjaElzRG93bmxvYWRlZCA9IG15UGxheWVyLmJ1ZmZlcmVkUGVyY2VudCgpO1xuICpcbiAqIDAgbWVhbnMgbm9uZSwgMSBtZWFucyBhbGwuXG4gKiAoVGhpcyBtZXRob2QgaXNuJ3QgaW4gdGhlIEhUTUw1IHNwZWMsIGJ1dCBpdCdzIHZlcnkgY29udmVuaWVudClcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgZGVjaW1hbCBiZXR3ZWVuIDAgYW5kIDEgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50XG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLmJ1ZmZlcmVkUGVyY2VudCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAodGhpcy5kdXJhdGlvbigpKSA/IHRoaXMuYnVmZmVyZWQoKS5lbmQoMCkgLyB0aGlzLmR1cmF0aW9uKCkgOiAwO1xufTtcblxuLyoqXG4gKiBHZXQgb3Igc2V0IHRoZSBjdXJyZW50IHZvbHVtZSBvZiB0aGUgbWVkaWFcbiAqXG4gKiAgICAgLy8gZ2V0XG4gKiAgICAgdmFyIGhvd0xvdWRJc0l0ID0gbXlQbGF5ZXIudm9sdW1lKCk7XG4gKlxuICogICAgIC8vIHNldFxuICogICAgIG15UGxheWVyLnZvbHVtZSgwLjUpOyAvLyBTZXQgdm9sdW1lIHRvIGhhbGZcbiAqXG4gKiAwIGlzIG9mZiAobXV0ZWQpLCAxLjAgaXMgYWxsIHRoZSB3YXkgdXAsIDAuNSBpcyBoYWxmIHdheS5cbiAqXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHBlcmNlbnRBc0RlY2ltYWwgVGhlIG5ldyB2b2x1bWUgYXMgYSBkZWNpbWFsIHBlcmNlbnRcbiAqIEByZXR1cm4ge051bWJlcn0gICAgICAgICAgICAgICAgICBUaGUgY3VycmVudCB2b2x1bWUsIHdoZW4gZ2V0dGluZ1xuICogQHJldHVybiB7dmpzLlBsYXllcn0gICAgICAgICAgICAgIHNlbGYsIHdoZW4gc2V0dGluZ1xuICovXG52anMuUGxheWVyLnByb3RvdHlwZS52b2x1bWUgPSBmdW5jdGlvbihwZXJjZW50QXNEZWNpbWFsKXtcbiAgdmFyIHZvbDtcblxuICBpZiAocGVyY2VudEFzRGVjaW1hbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdm9sID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgcGFyc2VGbG9hdChwZXJjZW50QXNEZWNpbWFsKSkpOyAvLyBGb3JjZSB2YWx1ZSB0byBiZXR3ZWVuIDAgYW5kIDFcbiAgICB0aGlzLmNhY2hlXy52b2x1bWUgPSB2b2w7XG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0Vm9sdW1lJywgdm9sKTtcbiAgICB2anMuc2V0TG9jYWxTdG9yYWdlKCd2b2x1bWUnLCB2b2wpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gRGVmYXVsdCB0byAxIHdoZW4gcmV0dXJuaW5nIGN1cnJlbnQgdm9sdW1lLlxuICB2b2wgPSBwYXJzZUZsb2F0KHRoaXMudGVjaEdldCgndm9sdW1lJykpO1xuICByZXR1cm4gKGlzTmFOKHZvbCkpID8gMSA6IHZvbDtcbn07XG5cblxuLyoqXG4gKiBHZXQgdGhlIGN1cnJlbnQgbXV0ZWQgc3RhdGUsIG9yIHR1cm4gbXV0ZSBvbiBvciBvZmZcbiAqXG4gKiAgICAgLy8gZ2V0XG4gKiAgICAgdmFyIGlzVm9sdW1lTXV0ZWQgPSBteVBsYXllci5tdXRlZCgpO1xuICpcbiAqICAgICAvLyBzZXRcbiAqICAgICBteVBsYXllci5tdXRlZCh0cnVlKTsgLy8gbXV0ZSB0aGUgdm9sdW1lXG4gKlxuICogQHBhcmFtICB7Qm9vbGVhbj19IG11dGVkIFRydWUgdG8gbXV0ZSwgZmFsc2UgdG8gdW5tdXRlXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIG11dGUgaXMgb24sIGZhbHNlIGlmIG5vdCwgd2hlbiBnZXR0aW5nXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmLCB3aGVuIHNldHRpbmcgbXV0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5tdXRlZCA9IGZ1bmN0aW9uKG11dGVkKXtcbiAgaWYgKG11dGVkICE9PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRNdXRlZCcsIG11dGVkKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdtdXRlZCcpIHx8IGZhbHNlOyAvLyBEZWZhdWx0IHRvIGZhbHNlXG59O1xuXG4vLyBDaGVjayBpZiBjdXJyZW50IHRlY2ggY2FuIHN1cHBvcnQgbmF0aXZlIGZ1bGxzY3JlZW4gKGUuZy4gd2l0aCBidWlsdCBpbiBjb250cm9scyBsaWsgaU9TLCBzbyBub3Qgb3VyIGZsYXNoIHN3ZilcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnN1cHBvcnRzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ3N1cHBvcnRzRnVsbFNjcmVlbicpIHx8IGZhbHNlOyB9O1xuXG4vKipcbiAqIEluY3JlYXNlIHRoZSBzaXplIG9mIHRoZSB2aWRlbyB0byBmdWxsIHNjcmVlblxuICpcbiAqICAgICBteVBsYXllci5yZXF1ZXN0RnVsbFNjcmVlbigpO1xuICpcbiAqIEluIHNvbWUgYnJvd3NlcnMsIGZ1bGwgc2NyZWVuIGlzIG5vdCBzdXBwb3J0ZWQgbmF0aXZlbHksIHNvIGl0IGVudGVyc1xuICogXCJmdWxsIHdpbmRvdyBtb2RlXCIsIHdoZXJlIHRoZSB2aWRlbyBmaWxscyB0aGUgYnJvd3NlciB3aW5kb3cuXG4gKiBJbiBicm93c2VycyBhbmQgZGV2aWNlcyB0aGF0IHN1cHBvcnQgbmF0aXZlIGZ1bGwgc2NyZWVuLCBzb21ldGltZXMgdGhlXG4gKiBicm93c2VyJ3MgZGVmYXVsdCBjb250cm9scyB3aWxsIGJlIHNob3duLCBhbmQgbm90IHRoZSBWaWRlby5qcyBjdXN0b20gc2tpbi5cbiAqIFRoaXMgaW5jbHVkZXMgbW9zdCBtb2JpbGUgZGV2aWNlcyAoaU9TLCBBbmRyb2lkKSBhbmQgb2xkZXIgdmVyc2lvbnMgb2ZcbiAqIFNhZmFyaS5cbiAqXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuID0gdmpzLnN1cHBvcnQucmVxdWVzdEZ1bGxTY3JlZW47XG4gIHRoaXMuaXNGdWxsU2NyZWVuID0gdHJ1ZTtcblxuICBpZiAocmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAvLyB0aGUgYnJvd3NlciBzdXBwb3J0cyBnb2luZyBmdWxsc2NyZWVuIGF0IHRoZSBlbGVtZW50IGxldmVsIHNvIHdlIGNhblxuICAgIC8vIHRha2UgdGhlIGNvbnRyb2xzIGZ1bGxzY3JlZW4gYXMgd2VsbCBhcyB0aGUgdmlkZW9cblxuICAgIC8vIFRyaWdnZXIgZnVsbHNjcmVlbmNoYW5nZSBldmVudCBhZnRlciBjaGFuZ2VcbiAgICAvLyBXZSBoYXZlIHRvIHNwZWNpZmljYWxseSBhZGQgdGhpcyBlYWNoIHRpbWUsIGFuZCByZW1vdmVcbiAgICAvLyB3aGVuIGNhbmNlbGxpbmcgZnVsbHNjcmVlbi4gT3RoZXJ3aXNlIGlmIHRoZXJlJ3MgbXVsdGlwbGVcbiAgICAvLyBwbGF5ZXJzIG9uIGEgcGFnZSwgdGhleSB3b3VsZCBhbGwgYmUgcmVhY3RpbmcgdG8gdGhlIHNhbWUgZnVsbHNjcmVlblxuICAgIC8vIGV2ZW50c1xuICAgIHZqcy5vbihkb2N1bWVudCwgcmVxdWVzdEZ1bGxTY3JlZW4uZXZlbnROYW1lLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbihlKXtcbiAgICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gZG9jdW1lbnRbcmVxdWVzdEZ1bGxTY3JlZW4uaXNGdWxsU2NyZWVuXTtcblxuICAgICAgLy8gSWYgY2FuY2VsbGluZyBmdWxsc2NyZWVuLCByZW1vdmUgZXZlbnQgbGlzdGVuZXIuXG4gICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT09IGZhbHNlKSB7XG4gICAgICAgIHZqcy5vZmYoZG9jdW1lbnQsIHJlcXVlc3RGdWxsU2NyZWVuLmV2ZW50TmFtZSwgYXJndW1lbnRzLmNhbGxlZSk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJpZ2dlcignZnVsbHNjcmVlbmNoYW5nZScpO1xuICAgIH0pKTtcblxuICAgIHRoaXMuZWxfW3JlcXVlc3RGdWxsU2NyZWVuLnJlcXVlc3RGbl0oKTtcblxuICB9IGVsc2UgaWYgKHRoaXMudGVjaC5zdXBwb3J0c0Z1bGxTY3JlZW4oKSkge1xuICAgIC8vIHdlIGNhbid0IHRha2UgdGhlIHZpZGVvLmpzIGNvbnRyb2xzIGZ1bGxzY3JlZW4gYnV0IHdlIGNhbiBnbyBmdWxsc2NyZWVuXG4gICAgLy8gd2l0aCBuYXRpdmUgY29udHJvbHNcbiAgICB0aGlzLnRlY2hDYWxsKCdlbnRlckZ1bGxTY3JlZW4nKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBmdWxsc2NyZWVuIGlzbid0IHN1cHBvcnRlZCBzbyB3ZSdsbCBqdXN0IHN0cmV0Y2ggdGhlIHZpZGVvIGVsZW1lbnQgdG9cbiAgICAvLyBmaWxsIHRoZSB2aWV3cG9ydFxuICAgIHRoaXMuZW50ZXJGdWxsV2luZG93KCk7XG4gICAgdGhpcy50cmlnZ2VyKCdmdWxsc2NyZWVuY2hhbmdlJyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSB2aWRlbyB0byBpdHMgbm9ybWFsIHNpemUgYWZ0ZXIgaGF2aW5nIGJlZW4gaW4gZnVsbCBzY3JlZW4gbW9kZVxuICpcbiAqICAgICBteVBsYXllci5jYW5jZWxGdWxsU2NyZWVuKCk7XG4gKlxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5jYW5jZWxGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuID0gdmpzLnN1cHBvcnQucmVxdWVzdEZ1bGxTY3JlZW47XG4gIHRoaXMuaXNGdWxsU2NyZWVuID0gZmFsc2U7XG5cbiAgLy8gQ2hlY2sgZm9yIGJyb3dzZXIgZWxlbWVudCBmdWxsc2NyZWVuIHN1cHBvcnRcbiAgaWYgKHJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnRbcmVxdWVzdEZ1bGxTY3JlZW4uY2FuY2VsRm5dKCk7XG4gIH0gZWxzZSBpZiAodGhpcy50ZWNoLnN1cHBvcnRzRnVsbFNjcmVlbigpKSB7XG4gICB0aGlzLnRlY2hDYWxsKCdleGl0RnVsbFNjcmVlbicpO1xuICB9IGVsc2Uge1xuICAgdGhpcy5leGl0RnVsbFdpbmRvdygpO1xuICAgdGhpcy50cmlnZ2VyKCdmdWxsc2NyZWVuY2hhbmdlJyk7XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFdoZW4gZnVsbHNjcmVlbiBpc24ndCBzdXBwb3J0ZWQgd2UgY2FuIHN0cmV0Y2ggdGhlIHZpZGVvIGNvbnRhaW5lciB0byBhcyB3aWRlIGFzIHRoZSBicm93c2VyIHdpbGwgbGV0IHVzLlxudmpzLlBsYXllci5wcm90b3R5cGUuZW50ZXJGdWxsV2luZG93ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5pc0Z1bGxXaW5kb3cgPSB0cnVlO1xuXG4gIC8vIFN0b3Jpbmcgb3JpZ2luYWwgZG9jIG92ZXJmbG93IHZhbHVlIHRvIHJldHVybiB0byB3aGVuIGZ1bGxzY3JlZW4gaXMgb2ZmXG4gIHRoaXMuZG9jT3JpZ092ZXJmbG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xuXG4gIC8vIEFkZCBsaXN0ZW5lciBmb3IgZXNjIGtleSB0byBleGl0IGZ1bGxzY3JlZW5cbiAgdmpzLm9uKGRvY3VtZW50LCAna2V5ZG93bicsIHZqcy5iaW5kKHRoaXMsIHRoaXMuZnVsbFdpbmRvd09uRXNjS2V5KSk7XG5cbiAgLy8gSGlkZSBhbnkgc2Nyb2xsIGJhcnNcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG5cbiAgLy8gQXBwbHkgZnVsbHNjcmVlbiBzdHlsZXNcbiAgdmpzLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd2anMtZnVsbC13aW5kb3cnKTtcblxuICB0aGlzLnRyaWdnZXIoJ2VudGVyRnVsbFdpbmRvdycpO1xufTtcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmZ1bGxXaW5kb3dPbkVzY0tleSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XG4gICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuID09PSB0cnVlKSB7XG4gICAgICB0aGlzLmNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5leGl0RnVsbFdpbmRvdygpO1xuICAgIH1cbiAgfVxufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUuZXhpdEZ1bGxXaW5kb3cgPSBmdW5jdGlvbigpe1xuICB0aGlzLmlzRnVsbFdpbmRvdyA9IGZhbHNlO1xuICB2anMub2ZmKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuZnVsbFdpbmRvd09uRXNjS2V5KTtcblxuICAvLyBVbmhpZGUgc2Nyb2xsIGJhcnMuXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IHRoaXMuZG9jT3JpZ092ZXJmbG93O1xuXG4gIC8vIFJlbW92ZSBmdWxsc2NyZWVuIHN0eWxlc1xuICB2anMucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Zqcy1mdWxsLXdpbmRvdycpO1xuXG4gIC8vIFJlc2l6ZSB0aGUgYm94LCBjb250cm9sbGVyLCBhbmQgcG9zdGVyIHRvIG9yaWdpbmFsIHNpemVzXG4gIC8vIHRoaXMucG9zaXRpb25BbGwoKTtcbiAgdGhpcy50cmlnZ2VyKCdleGl0RnVsbFdpbmRvdycpO1xufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUuc2VsZWN0U291cmNlID0gZnVuY3Rpb24oc291cmNlcyl7XG5cbiAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggcGxheWJhY2sgdGVjaG5vbG9neSBpbiB0aGUgb3B0aW9ucyBvcmRlclxuICBmb3IgKHZhciBpPTAsaj10aGlzLm9wdGlvbnNfWyd0ZWNoT3JkZXInXTtpPGoubGVuZ3RoO2krKykge1xuICAgIHZhciB0ZWNoTmFtZSA9IHZqcy5jYXBpdGFsaXplKGpbaV0pLFxuICAgICAgICB0ZWNoID0gd2luZG93Wyd2aWRlb2pzJ11bdGVjaE5hbWVdO1xuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0ZWNobm9sb2d5XG4gICAgaWYgKHRlY2guaXNTdXBwb3J0ZWQoKSkge1xuICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggc291cmNlIG9iamVjdFxuICAgICAgZm9yICh2YXIgYT0wLGI9c291cmNlczthPGIubGVuZ3RoO2ErKykge1xuICAgICAgICB2YXIgc291cmNlID0gYlthXTtcblxuICAgICAgICAvLyBDaGVjayBpZiBzb3VyY2UgY2FuIGJlIHBsYXllZCB3aXRoIHRoaXMgdGVjaG5vbG9neVxuICAgICAgICBpZiAodGVjaFsnY2FuUGxheVNvdXJjZSddKHNvdXJjZSkpIHtcbiAgICAgICAgICByZXR1cm4geyBzb3VyY2U6IHNvdXJjZSwgdGVjaDogdGVjaE5hbWUgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogVGhlIHNvdXJjZSBmdW5jdGlvbiB1cGRhdGVzIHRoZSB2aWRlbyBzb3VyY2VcbiAqXG4gKiBUaGVyZSBhcmUgdGhyZWUgdHlwZXMgb2YgdmFyaWFibGVzIHlvdSBjYW4gcGFzcyBhcyB0aGUgYXJndW1lbnQuXG4gKlxuICogKipVUkwgU3RyaW5nKio6IEEgVVJMIHRvIHRoZSB0aGUgdmlkZW8gZmlsZS4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBhcmUgc3VyZVxuICogdGhlIGN1cnJlbnQgcGxheWJhY2sgdGVjaG5vbG9neSAoSFRNTDUvRmxhc2gpIGNhbiBzdXBwb3J0IHRoZSBzb3VyY2UgeW91XG4gKiBwcm92aWRlLiBDdXJyZW50bHkgb25seSBNUDQgZmlsZXMgY2FuIGJlIHVzZWQgaW4gYm90aCBIVE1MNSBhbmQgRmxhc2guXG4gKlxuICogICAgIG15UGxheWVyLnNyYyhcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5tcDRcIik7XG4gKlxuICogKipTb3VyY2UgT2JqZWN0IChvciBlbGVtZW50KToqKiBBIGphdmFzY3JpcHQgb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb25cbiAqIGFib3V0IHRoZSBzb3VyY2UgZmlsZS4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50IHRoZSBwbGF5ZXIgdG8gZGV0ZXJtaW5lIGlmXG4gKiBpdCBjYW4gc3VwcG9ydCB0aGUgZmlsZSB1c2luZyB0aGUgdHlwZSBpbmZvcm1hdGlvbi5cbiAqXG4gKiAgICAgbXlQbGF5ZXIuc3JjKHsgdHlwZTogXCJ2aWRlby9tcDRcIiwgc3JjOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5tcDRcIiB9KTtcbiAqXG4gKiAqKkFycmF5IG9mIFNvdXJjZSBPYmplY3RzOioqIFRvIHByb3ZpZGUgbXVsdGlwbGUgdmVyc2lvbnMgb2YgdGhlIHNvdXJjZSBzb1xuICogdGhhdCBpdCBjYW4gYmUgcGxheWVkIHVzaW5nIEhUTUw1IGFjcm9zcyBicm93c2VycyB5b3UgY2FuIHVzZSBhbiBhcnJheSBvZlxuICogc291cmNlIG9iamVjdHMuIFZpZGVvLmpzIHdpbGwgZGV0ZWN0IHdoaWNoIHZlcnNpb24gaXMgc3VwcG9ydGVkIGFuZCBsb2FkIHRoYXRcbiAqIGZpbGUuXG4gKlxuICogICAgIG15UGxheWVyLnNyYyhbXG4gKiAgICAgICB7IHR5cGU6IFwidmlkZW8vbXA0XCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ubXA0XCIgfSxcbiAqICAgICAgIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ud2VibVwiIH0sXG4gKiAgICAgICB7IHR5cGU6IFwidmlkZW8vb2dnXCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ub2d2XCIgfVxuICogICAgIF0pO1xuICpcbiAqIEBwYXJhbSAge1N0cmluZ3xPYmplY3R8QXJyYXk9fSBzb3VyY2UgVGhlIHNvdXJjZSBVUkwsIG9iamVjdCwgb3IgYXJyYXkgb2Ygc291cmNlc1xuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbihzb3VyY2Upe1xuICAvLyBDYXNlOiBBcnJheSBvZiBzb3VyY2Ugb2JqZWN0cyB0byBjaG9vc2UgZnJvbSBhbmQgcGljayB0aGUgYmVzdCB0byBwbGF5XG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBBcnJheSkge1xuXG4gICAgdmFyIHNvdXJjZVRlY2ggPSB0aGlzLnNlbGVjdFNvdXJjZShzb3VyY2UpLFxuICAgICAgICB0ZWNoTmFtZTtcblxuICAgIGlmIChzb3VyY2VUZWNoKSB7XG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZVRlY2guc291cmNlO1xuICAgICAgICB0ZWNoTmFtZSA9IHNvdXJjZVRlY2gudGVjaDtcblxuICAgICAgLy8gSWYgdGhpcyB0ZWNobm9sb2d5IGlzIGFscmVhZHkgbG9hZGVkLCBzZXQgc291cmNlXG4gICAgICBpZiAodGVjaE5hbWUgPT0gdGhpcy50ZWNoTmFtZSkge1xuICAgICAgICB0aGlzLnNyYyhzb3VyY2UpOyAvLyBQYXNzaW5nIHRoZSBzb3VyY2Ugb2JqZWN0XG4gICAgICAvLyBPdGhlcndpc2UgbG9hZCB0aGlzIHRlY2hub2xvZ3kgd2l0aCBjaG9zZW4gc291cmNlXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxvYWRUZWNoKHRlY2hOYW1lLCBzb3VyY2UpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmVsXy5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ3AnLCB7XG4gICAgICAgIGlubmVySFRNTDogdGhpcy5vcHRpb25zKClbJ25vdFN1cHBvcnRlZE1lc3NhZ2UnXVxuICAgICAgfSkpO1xuICAgIH1cblxuICAvLyBDYXNlOiBTb3VyY2Ugb2JqZWN0IHsgc3JjOiAnJywgdHlwZTogJycgLi4uIH1cbiAgfSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcblxuICAgIGlmICh3aW5kb3dbJ3ZpZGVvanMnXVt0aGlzLnRlY2hOYW1lXVsnY2FuUGxheVNvdXJjZSddKHNvdXJjZSkpIHtcbiAgICAgIHRoaXMuc3JjKHNvdXJjZS5zcmMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTZW5kIHRocm91Z2ggdGVjaCBsb29wIHRvIGNoZWNrIGZvciBhIGNvbXBhdGlibGUgdGVjaG5vbG9neS5cbiAgICAgIHRoaXMuc3JjKFtzb3VyY2VdKTtcbiAgICB9XG5cbiAgLy8gQ2FzZTogVVJMIFN0cmluZyAoaHR0cDovL215dmlkZW8uLi4pXG4gIH0gZWxzZSB7XG4gICAgLy8gQ2FjaGUgZm9yIGdldHRpbmcgbGFzdCBzZXQgc291cmNlXG4gICAgdGhpcy5jYWNoZV8uc3JjID0gc291cmNlO1xuXG4gICAgaWYgKCF0aGlzLmlzUmVhZHlfKSB7XG4gICAgICB0aGlzLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMuc3JjKHNvdXJjZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50ZWNoQ2FsbCgnc3JjJywgc291cmNlKTtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnNfWydwcmVsb2FkJ10gPT0gJ2F1dG8nKSB7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMub3B0aW9uc19bJ2F1dG9wbGF5J10pIHtcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gQmVnaW4gbG9hZGluZyB0aGUgc3JjIGRhdGFcbi8vIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdmlkZW8uaHRtbCNkb20tbWVkaWEtbG9hZFxudmpzLlBsYXllci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMudGVjaENhbGwoJ2xvYWQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjL3ZpZGVvLmh0bWwjZG9tLW1lZGlhLWN1cnJlbnRzcmNcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdjdXJyZW50U3JjJykgfHwgdGhpcy5jYWNoZV8uc3JjIHx8ICcnO1xufTtcblxuLy8gQXR0cmlidXRlcy9PcHRpb25zXG52anMuUGxheWVyLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24odmFsdWUpe1xuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudGVjaENhbGwoJ3NldFByZWxvYWQnLCB2YWx1ZSk7XG4gICAgdGhpcy5vcHRpb25zX1sncHJlbG9hZCddID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIHRoaXMudGVjaEdldCgncHJlbG9hZCcpO1xufTtcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmF1dG9wbGF5ID0gZnVuY3Rpb24odmFsdWUpe1xuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudGVjaENhbGwoJ3NldEF1dG9wbGF5JywgdmFsdWUpO1xuICAgIHRoaXMub3B0aW9uc19bJ2F1dG9wbGF5J10gPSB2YWx1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdhdXRvcGxheScsIHZhbHVlKTtcbn07XG52anMuUGxheWVyLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24odmFsdWUpe1xuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXMudGVjaENhbGwoJ3NldExvb3AnLCB2YWx1ZSk7XG4gICAgdGhpcy5vcHRpb25zX1snbG9vcCddID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIHRoaXMudGVjaEdldCgnbG9vcCcpO1xufTtcblxuLyoqXG4gKiB0aGUgdXJsIG9mIHRoZSBwb3N0ZXIgaW1hZ2Ugc291cmNlXG4gKiBAdHlwZSB7U3RyaW5nfVxuICogQHByaXZhdGVcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUucG9zdGVyXztcblxuLyoqXG4gKiBnZXQgb3Igc2V0IHRoZSBwb3N0ZXIgaW1hZ2Ugc291cmNlIHVybFxuICpcbiAqICMjIyMjIEVYQU1QTEU6XG4gKlxuICogICAgIC8vIGdldHRpbmdcbiAqICAgICB2YXIgY3VycmVudFBvc3RlciA9IG15UGxheWVyLnBvc3RlcigpO1xuICpcbiAqICAgICAvLyBzZXR0aW5nXG4gKiAgICAgbXlQbGF5ZXIucG9zdGVyKCdodHRwOi8vZXhhbXBsZS5jb20vbXlJbWFnZS5qcGcnKTtcbiAqXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSBbc3JjXSBQb3N0ZXIgaW1hZ2Ugc291cmNlIFVSTFxuICogQHJldHVybiB7U3RyaW5nfSBwb3N0ZXIgVVJMIHdoZW4gZ2V0dGluZ1xuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZiB3aGVuIHNldHRpbmdcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUucG9zdGVyID0gZnVuY3Rpb24oc3JjKXtcbiAgaWYgKHNyYyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5wb3N0ZXJfID0gc3JjO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiB0aGlzLnBvc3Rlcl87XG59O1xuXG4vKipcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBjb250cm9scyBhcmUgc2hvd2luZ1xuICogQHR5cGUge0Jvb2xlYW59XG4gKiBAcHJpdmF0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5jb250cm9sc187XG5cbi8qKlxuICogR2V0IG9yIHNldCB3aGV0aGVyIG9yIG5vdCB0aGUgY29udHJvbHMgYXJlIHNob3dpbmcuXG4gKiBAcGFyYW0gIHtCb29sZWFufSBjb250cm9scyBTZXQgY29udHJvbHMgdG8gc2hvd2luZyBvciBub3RcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgIENvbnRyb2xzIGFyZSBzaG93aW5nXG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xzID0gZnVuY3Rpb24oYm9vbCl7XG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBib29sID0gISFib29sOyAvLyBmb3JjZSBib29sZWFuXG4gICAgLy8gRG9uJ3QgdHJpZ2dlciBhIGNoYW5nZSBldmVudCB1bmxlc3MgaXQgYWN0dWFsbHkgY2hhbmdlZFxuICAgIGlmICh0aGlzLmNvbnRyb2xzXyAhPT0gYm9vbCkge1xuICAgICAgdGhpcy5jb250cm9sc18gPSBib29sO1xuICAgICAgaWYgKGJvb2wpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWNvbnRyb2xzLWRpc2FibGVkJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1lbmFibGVkJyk7XG4gICAgICAgIHRoaXMudHJpZ2dlcignY29udHJvbHNlbmFibGVkJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtY29udHJvbHMtZW5hYmxlZCcpO1xuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtY29udHJvbHMtZGlzYWJsZWQnKTtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjb250cm9sc2Rpc2FibGVkJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiB0aGlzLmNvbnRyb2xzXztcbn07XG5cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzaW5nTmF0aXZlQ29udHJvbHNfO1xuXG4vKipcbiAqIFRvZ2dsZSBuYXRpdmUgY29udHJvbHMgb24vb2ZmLiBOYXRpdmUgY29udHJvbHMgYXJlIHRoZSBjb250cm9scyBidWlsdCBpbnRvXG4gKiBkZXZpY2VzIChlLmcuIGRlZmF1bHQgaVBob25lIGNvbnRyb2xzKSwgRmxhc2gsIG9yIG90aGVyIHRlY2hzXG4gKiAoZS5nLiBWaW1lbyBDb250cm9scylcbiAqXG4gKiAqKlRoaXMgc2hvdWxkIG9ubHkgYmUgc2V0IGJ5IHRoZSBjdXJyZW50IHRlY2gsIGJlY2F1c2Ugb25seSB0aGUgdGVjaCBrbm93c1xuICogaWYgaXQgY2FuIHN1cHBvcnQgbmF0aXZlIGNvbnRyb2xzKipcbiAqXG4gKiBAcGFyYW0gIHtCb29sZWFufSBib29sICAgIFRydWUgc2lnbmFscyB0aGF0IG5hdGl2ZSBjb250cm9scyBhcmUgb25cbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgICAgUmV0dXJucyB0aGUgcGxheWVyXG4gKiBAcHJpdmF0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS51c2luZ05hdGl2ZUNvbnRyb2xzID0gZnVuY3Rpb24oYm9vbCl7XG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBib29sID0gISFib29sOyAvLyBmb3JjZSBib29sZWFuXG4gICAgLy8gRG9uJ3QgdHJpZ2dlciBhIGNoYW5nZSBldmVudCB1bmxlc3MgaXQgYWN0dWFsbHkgY2hhbmdlZFxuICAgIGlmICh0aGlzLnVzaW5nTmF0aXZlQ29udHJvbHNfICE9PSBib29sKSB7XG4gICAgICB0aGlzLnVzaW5nTmF0aXZlQ29udHJvbHNfID0gYm9vbDtcbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2luZy1uYXRpdmUtY29udHJvbHMnKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogcGxheWVyIGlzIHVzaW5nIHRoZSBuYXRpdmUgZGV2aWNlIGNvbnRyb2xzXG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCB1c2luZ25hdGl2ZWNvbnRyb2xzXG4gICAgICAgICAqIEBtZW1iZXJvZiB2anMuUGxheWVyXG4gICAgICAgICAqIEBpbnN0YW5jZVxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy50cmlnZ2VyKCd1c2luZ25hdGl2ZWNvbnRyb2xzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtdXNpbmctbmF0aXZlLWNvbnRyb2xzJyk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIHBsYXllciBpcyB1c2luZyB0aGUgY3VzdG9tIEhUTUwgY29udHJvbHNcbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IHVzaW5nY3VzdG9tY29udHJvbHNcbiAgICAgICAgICogQG1lbWJlcm9mIHZqcy5QbGF5ZXJcbiAgICAgICAgICogQGluc3RhbmNlXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzaW5nY3VzdG9tY29udHJvbHMnKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgcmV0dXJuIHRoaXMudXNpbmdOYXRpdmVDb250cm9sc187XG59O1xuXG52anMuUGxheWVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ2Vycm9yJyk7IH07XG52anMuUGxheWVyLnByb3RvdHlwZS5lbmRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ2VuZGVkJyk7IH07XG52anMuUGxheWVyLnByb3RvdHlwZS5zZWVraW5nID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaEdldCgnc2Vla2luZycpOyB9O1xuXG4vLyBXaGVuIHRoZSBwbGF5ZXIgaXMgZmlyc3QgaW5pdGlhbGl6ZWQsIHRyaWdnZXIgYWN0aXZpdHkgc28gY29tcG9uZW50c1xuLy8gbGlrZSB0aGUgY29udHJvbCBiYXIgc2hvdyB0aGVtc2VsdmVzIGlmIG5lZWRlZFxudmpzLlBsYXllci5wcm90b3R5cGUudXNlckFjdGl2aXR5XyA9IHRydWU7XG52anMuUGxheWVyLnByb3RvdHlwZS5yZXBvcnRVc2VyQWN0aXZpdHkgPSBmdW5jdGlvbihldmVudCl7XG4gIHRoaXMudXNlckFjdGl2aXR5XyA9IHRydWU7XG59O1xuXG52anMuUGxheWVyLnByb3RvdHlwZS51c2VyQWN0aXZlXyA9IHRydWU7XG52anMuUGxheWVyLnByb3RvdHlwZS51c2VyQWN0aXZlID0gZnVuY3Rpb24oYm9vbCl7XG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcbiAgICBib29sID0gISFib29sO1xuICAgIGlmIChib29sICE9PSB0aGlzLnVzZXJBY3RpdmVfKSB7XG4gICAgICB0aGlzLnVzZXJBY3RpdmVfID0gYm9vbDtcbiAgICAgIGlmIChib29sKSB7XG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHdhcyBpbmFjdGl2ZSBhbmQgaXMgbm93IGFjdGl2ZSB3ZSB3YW50IHRvIHJlc2V0IHRoZVxuICAgICAgICAvLyBpbmFjdGl2aXR5IHRpbWVyXG4gICAgICAgIHRoaXMudXNlckFjdGl2aXR5XyA9IHRydWU7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy11c2VyLWluYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2VyLWFjdGl2ZScpO1xuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzZXJhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFdlJ3JlIHN3aXRjaGluZyB0aGUgc3RhdGUgdG8gaW5hY3RpdmUgbWFudWFsbHksIHNvIGVyYXNlIGFueSBvdGhlclxuICAgICAgICAvLyBhY3Rpdml0eVxuICAgICAgICB0aGlzLnVzZXJBY3Rpdml0eV8gPSBmYWxzZTtcblxuICAgICAgICAvLyBDaHJvbWUvU2FmYXJpL0lFIGhhdmUgYnVncyB3aGVyZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIGN1cnNvciBpdCBjYW5cbiAgICAgICAgLy8gdHJpZ2dlciBhIG1vdXNlbW92ZSBldmVudC4gVGhpcyBjYXVzZXMgYW4gaXNzdWUgd2hlbiB5b3UncmUgaGlkaW5nXG4gICAgICAgIC8vIHRoZSBjdXJzb3Igd2hlbiB0aGUgdXNlciBpcyBpbmFjdGl2ZSwgYW5kIGEgbW91c2Vtb3ZlIHNpZ25hbHMgdXNlclxuICAgICAgICAvLyBhY3Rpdml0eS4gTWFraW5nIGl0IGltcG9zc2libGUgdG8gZ28gaW50byBpbmFjdGl2ZSBtb2RlLiBTcGVjaWZpY2FsbHlcbiAgICAgICAgLy8gdGhpcyBoYXBwZW5zIGluIGZ1bGxzY3JlZW4gd2hlbiB3ZSByZWFsbHkgbmVlZCB0byBoaWRlIHRoZSBjdXJzb3IuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFdoZW4gdGhpcyBnZXRzIHJlc29sdmVkIGluIEFMTCBicm93c2VycyBpdCBjYW4gYmUgcmVtb3ZlZFxuICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTAzMDQxXG4gICAgICAgIHRoaXMudGVjaC5vbmUoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLXVzZXItYWN0aXZlJyk7XG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2VyLWluYWN0aXZlJyk7XG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNlcmluYWN0aXZlJyk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHJldHVybiB0aGlzLnVzZXJBY3RpdmVfO1xufTtcblxudmpzLlBsYXllci5wcm90b3R5cGUubGlzdGVuRm9yVXNlckFjdGl2aXR5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIG9uTW91c2VBY3Rpdml0eSwgb25Nb3VzZURvd24sIG1vdXNlSW5Qcm9ncmVzcywgb25Nb3VzZVVwLFxuICAgICAgYWN0aXZpdHlDaGVjaywgaW5hY3Rpdml0eVRpbWVvdXQ7XG5cbiAgb25Nb3VzZUFjdGl2aXR5ID0gdGhpcy5yZXBvcnRVc2VyQWN0aXZpdHk7XG5cbiAgb25Nb3VzZURvd24gPSBmdW5jdGlvbigpIHtcbiAgICBvbk1vdXNlQWN0aXZpdHkoKTtcbiAgICAvLyBGb3IgYXMgbG9uZyBhcyB0aGUgdGhleSBhcmUgdG91Y2hpbmcgdGhlIGRldmljZSBvciBoYXZlIHRoZWlyIG1vdXNlIGRvd24sXG4gICAgLy8gd2UgY29uc2lkZXIgdGhlbSBhY3RpdmUgZXZlbiBpZiB0aGV5J3JlIG5vdCBtb3ZpbmcgdGhlaXIgZmluZ2VyIG9yIG1vdXNlLlxuICAgIC8vIFNvIHdlIHdhbnQgdG8gY29udGludWUgdG8gdXBkYXRlIHRoYXQgdGhleSBhcmUgYWN0aXZlXG4gICAgY2xlYXJJbnRlcnZhbChtb3VzZUluUHJvZ3Jlc3MpO1xuICAgIC8vIFNldHRpbmcgdXNlckFjdGl2aXR5PXRydWUgbm93IGFuZCBzZXR0aW5nIHRoZSBpbnRlcnZhbCB0byB0aGUgc2FtZSB0aW1lXG4gICAgLy8gYXMgdGhlIGFjdGl2aXR5Q2hlY2sgaW50ZXJ2YWwgKDI1MCkgc2hvdWxkIGVuc3VyZSB3ZSBuZXZlciBtaXNzIHRoZVxuICAgIC8vIG5leHQgYWN0aXZpdHlDaGVja1xuICAgIG1vdXNlSW5Qcm9ncmVzcyA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIG9uTW91c2VBY3Rpdml0eSksIDI1MCk7XG4gIH07XG5cbiAgb25Nb3VzZVVwID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBvbk1vdXNlQWN0aXZpdHkoKTtcbiAgICAvLyBTdG9wIHRoZSBpbnRlcnZhbCB0aGF0IG1haW50YWlucyBhY3Rpdml0eSBpZiB0aGUgbW91c2UvdG91Y2ggaXMgZG93blxuICAgIGNsZWFySW50ZXJ2YWwobW91c2VJblByb2dyZXNzKTtcbiAgfTtcblxuICAvLyBBbnkgbW91c2UgbW92ZW1lbnQgd2lsbCBiZSBjb25zaWRlcmVkIHVzZXIgYWN0aXZpdHlcbiAgdGhpcy5vbignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xuICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlQWN0aXZpdHkpO1xuICB0aGlzLm9uKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcblxuICAvLyBMaXN0ZW4gZm9yIGtleWJvYXJkIG5hdmlnYXRpb25cbiAgLy8gU2hvdWxkbid0IG5lZWQgdG8gdXNlIGluUHJvZ3Jlc3MgaW50ZXJ2YWwgYmVjYXVzZSBvZiBrZXkgcmVwZWF0XG4gIHRoaXMub24oJ2tleWRvd24nLCBvbk1vdXNlQWN0aXZpdHkpO1xuICB0aGlzLm9uKCdrZXl1cCcsIG9uTW91c2VBY3Rpdml0eSk7XG5cbiAgLy8gQ29uc2lkZXIgYW55IHRvdWNoIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cCB0byBiZSBhY3Rpdml0eVxuICAvLyBDZXJ0YWluIHRvdWNoZXMgb24gdGhlIHRlY2ggd2lsbCBiZSBibG9ja2VkIGZyb20gYnViYmxpbmcgYmVjYXVzZSB0aGV5XG4gIC8vIHRvZ2dsZSBjb250cm9sc1xuICB0aGlzLm9uKCd0b3VjaHN0YXJ0Jywgb25Nb3VzZURvd24pO1xuICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBvbk1vdXNlQWN0aXZpdHkpO1xuICB0aGlzLm9uKCd0b3VjaGVuZCcsIG9uTW91c2VVcCk7XG4gIHRoaXMub24oJ3RvdWNoY2FuY2VsJywgb25Nb3VzZVVwKTtcblxuICAvLyBSdW4gYW4gaW50ZXJ2YWwgZXZlcnkgMjUwIG1pbGxpc2Vjb25kcyBpbnN0ZWFkIG9mIHN0dWZmaW5nIGV2ZXJ5dGhpbmcgaW50b1xuICAvLyB0aGUgbW91c2Vtb3ZlL3RvdWNobW92ZSBmdW5jdGlvbiBpdHNlbGYsIHRvIHByZXZlbnQgcGVyZm9ybWFuY2UgZGVncmFkYXRpb24uXG4gIC8vIGB0aGlzLnJlcG9ydFVzZXJBY3Rpdml0eWAgc2ltcGx5IHNldHMgdGhpcy51c2VyQWN0aXZpdHlfIHRvIHRydWUsIHdoaWNoXG4gIC8vIHRoZW4gZ2V0cyBwaWNrZWQgdXAgYnkgdGhpcyBsb29wXG4gIC8vIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9sZWFybmluZy1mcm9tLXR3aXR0ZXIvXG4gIGFjdGl2aXR5Q2hlY2sgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgbW91c2UvdG91Y2ggYWN0aXZpdHkgaGFzIGhhcHBlbmVkXG4gICAgaWYgKHRoaXMudXNlckFjdGl2aXR5Xykge1xuICAgICAgLy8gUmVzZXQgdGhlIGFjdGl2aXR5IHRyYWNrZXJcbiAgICAgIHRoaXMudXNlckFjdGl2aXR5XyA9IGZhbHNlO1xuXG4gICAgICAvLyBJZiB0aGUgdXNlciBzdGF0ZSB3YXMgaW5hY3RpdmUsIHNldCB0aGUgc3RhdGUgdG8gYWN0aXZlXG4gICAgICB0aGlzLnVzZXJBY3RpdmUodHJ1ZSk7XG5cbiAgICAgIC8vIENsZWFyIGFueSBleGlzdGluZyBpbmFjdGl2aXR5IHRpbWVvdXQgdG8gc3RhcnQgdGhlIHRpbWVyIG92ZXJcbiAgICAgIGNsZWFyVGltZW91dChpbmFjdGl2aXR5VGltZW91dCk7XG5cbiAgICAgIC8vIEluIFggc2Vjb25kcywgaWYgbm8gbW9yZSBhY3Rpdml0eSBoYXMgb2NjdXJyZWQgdGhlIHVzZXIgd2lsbCBiZVxuICAgICAgLy8gY29uc2lkZXJlZCBpbmFjdGl2ZVxuICAgICAgaW5hY3Rpdml0eVRpbWVvdXQgPSBzZXRUaW1lb3V0KHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3QgdGhlIGNhc2Ugd2hlcmUgdGhlIGluYWN0aXZpdHlUaW1lb3V0IGNhbiB0cmlnZ2VyIGp1c3RcbiAgICAgICAgLy8gYmVmb3JlIHRoZSBuZXh0IHVzZXIgYWN0aXZpdHkgaXMgcGlja2VkIHVwIGJ5IHRoZSBhY3Rpdml0eUNoZWNrIGxvb3BcbiAgICAgICAgLy8gY2F1c2luZyBhIGZsaWNrZXJcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJBY3Rpdml0eV8pIHtcbiAgICAgICAgICB0aGlzLnVzZXJBY3RpdmUoZmFsc2UpO1xuICAgICAgICB9XG4gICAgICB9KSwgMjAwMCk7XG4gICAgfVxuICB9KSwgMjUwKTtcblxuICAvLyBDbGVhbiB1cCB0aGUgaW50ZXJ2YWxzIHdoZW4gd2Uga2lsbCB0aGUgcGxheWVyXG4gIHRoaXMub24oJ2Rpc3Bvc2UnLCBmdW5jdGlvbigpe1xuICAgIGNsZWFySW50ZXJ2YWwoYWN0aXZpdHlDaGVjayk7XG4gICAgY2xlYXJUaW1lb3V0KGluYWN0aXZpdHlUaW1lb3V0KTtcbiAgfSk7XG59O1xuXG4vLyBNZXRob2RzIHRvIGFkZCBzdXBwb3J0IGZvclxuLy8gbmV0d29ya1N0YXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnbmV0d29ya1N0YXRlJyk7IH0sXG4vLyByZWFkeVN0YXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgncmVhZHlTdGF0ZScpOyB9LFxuLy8gc2Vla2luZzogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3NlZWtpbmcnKTsgfSxcbi8vIGluaXRpYWxUaW1lOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnaW5pdGlhbFRpbWUnKTsgfSxcbi8vIHN0YXJ0T2Zmc2V0VGltZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3N0YXJ0T2Zmc2V0VGltZScpOyB9LFxuLy8gcGxheWVkOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgncGxheWVkJyk7IH0sXG4vLyBzZWVrYWJsZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3NlZWthYmxlJyk7IH0sXG4vLyB2aWRlb1RyYWNrczogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3ZpZGVvVHJhY2tzJyk7IH0sXG4vLyBhdWRpb1RyYWNrczogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2F1ZGlvVHJhY2tzJyk7IH0sXG4vLyB2aWRlb1dpZHRoOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgndmlkZW9XaWR0aCcpOyB9LFxuLy8gdmlkZW9IZWlnaHQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCd2aWRlb0hlaWdodCcpOyB9LFxuLy8gZGVmYXVsdFBsYXliYWNrUmF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2RlZmF1bHRQbGF5YmFja1JhdGUnKTsgfSxcbi8vIHBsYXliYWNrUmF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3BsYXliYWNrUmF0ZScpOyB9LFxuLy8gbWVkaWFHcm91cDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ21lZGlhR3JvdXAnKTsgfSxcbi8vIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdjb250cm9sbGVyJyk7IH0sXG4vLyBkZWZhdWx0TXV0ZWQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdkZWZhdWx0TXV0ZWQnKTsgfVxuXG4vLyBUT0RPXG4vLyBjdXJyZW50U3JjTGlzdDogdGhlIGFycmF5IG9mIHNvdXJjZXMgaW5jbHVkaW5nIG90aGVyIGZvcm1hdHMgYW5kIGJpdHJhdGVzXG4vLyBwbGF5TGlzdDogYXJyYXkgb2Ygc291cmNlIGxpc3RzIGluIG9yZGVyIG9mIHBsYXliYWNrXG5cbi8vIFJlcXVlc3RGdWxsc2NyZWVuIEFQSVxuKGZ1bmN0aW9uKCl7XG4gIHZhciBwcmVmaXgsIHJlcXVlc3RGUywgZGl2O1xuXG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gIHJlcXVlc3RGUyA9IHt9O1xuXG4gIC8vIEN1cnJlbnQgVzNDIFNwZWNcbiAgLy8gaHR0cDovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvdGlwL092ZXJ2aWV3Lmh0bWwjYXBpXG4gIC8vIE1vemlsbGEgRHJhZnQ6IGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9HZWNrbzpGdWxsU2NyZWVuQVBJI2Z1bGxzY3JlZW5jaGFuZ2VfZXZlbnRcbiAgLy8gTmV3OiBodHRwczovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvNTI5YTY3YjhkOWYzL092ZXJ2aWV3Lmh0bWxcbiAgaWYgKGRpdi5jYW5jZWxGdWxsc2NyZWVuICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXF1ZXN0RlMucmVxdWVzdEZuID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcbiAgICByZXF1ZXN0RlMuY2FuY2VsRm4gPSAnZXhpdEZ1bGxzY3JlZW4nO1xuICAgIHJlcXVlc3RGUy5ldmVudE5hbWUgPSAnZnVsbHNjcmVlbmNoYW5nZSc7XG4gICAgcmVxdWVzdEZTLmlzRnVsbFNjcmVlbiA9ICdmdWxsU2NyZWVuJztcblxuICAvLyBXZWJraXQgKENocm9tZS9TYWZhcmkpIGFuZCBNb3ppbGxhIChGaXJlZm94KSBoYXZlIHdvcmtpbmcgaW1wbGVtZW50YXRpb25zXG4gIC8vIHRoYXQgdXNlIHByZWZpeGVzIGFuZCB2YXJ5IHNsaWdodGx5IGZyb20gdGhlIG5ldyBXM0Mgc3BlYy4gU3BlY2lmaWNhbGx5LFxuICAvLyB1c2luZyAnZXhpdCcgaW5zdGVhZCBvZiAnY2FuY2VsJywgYW5kIGxvd2VyY2FzaW5nIHRoZSAnUycgaW4gRnVsbHNjcmVlbi5cbiAgLy8gT3RoZXIgYnJvd3NlcnMgZG9uJ3QgaGF2ZSBhbnkgaGludHMgb2Ygd2hpY2ggdmVyc2lvbiB0aGV5IG1pZ2h0IGZvbGxvdyB5ZXQsXG4gIC8vIHNvIG5vdCBnb2luZyB0byB0cnkgdG8gcHJlZGljdCBieSBsb29waW5nIHRocm91Z2ggYWxsIHByZWZpeGVzLlxuICB9IGVsc2Uge1xuXG4gICAgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICAgIHByZWZpeCA9ICdtb3onO1xuICAgICAgcmVxdWVzdEZTLmlzRnVsbFNjcmVlbiA9IHByZWZpeCArICdGdWxsU2NyZWVuJztcbiAgICB9IGVsc2Uge1xuICAgICAgcHJlZml4ID0gJ3dlYmtpdCc7XG4gICAgICByZXF1ZXN0RlMuaXNGdWxsU2NyZWVuID0gcHJlZml4ICsgJ0lzRnVsbFNjcmVlbic7XG4gICAgfVxuXG4gICAgaWYgKGRpdltwcmVmaXggKyAnUmVxdWVzdEZ1bGxTY3JlZW4nXSkge1xuICAgICAgcmVxdWVzdEZTLnJlcXVlc3RGbiA9IHByZWZpeCArICdSZXF1ZXN0RnVsbFNjcmVlbic7XG4gICAgICByZXF1ZXN0RlMuY2FuY2VsRm4gPSBwcmVmaXggKyAnQ2FuY2VsRnVsbFNjcmVlbic7XG4gICAgfVxuICAgIHJlcXVlc3RGUy5ldmVudE5hbWUgPSBwcmVmaXggKyAnZnVsbHNjcmVlbmNoYW5nZSc7XG4gIH1cblxuICBpZiAoZG9jdW1lbnRbcmVxdWVzdEZTLmNhbmNlbEZuXSkge1xuICAgIHZqcy5zdXBwb3J0LnJlcXVlc3RGdWxsU2NyZWVuID0gcmVxdWVzdEZTO1xuICB9XG5cbn0pKCk7XG5cblxuLyoqXG4gKiBDb250YWluZXIgb2YgbWFpbiBjb250cm9sc1xuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKiBAZXh0ZW5kcyB2anMuQ29tcG9uZW50XG4gKi9cbnZqcy5Db250cm9sQmFyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoKTtcblxudmpzLkNvbnRyb2xCYXIucHJvdG90eXBlLm9wdGlvbnNfID0ge1xuICBsb2FkRXZlbnQ6ICdwbGF5JyxcbiAgY2hpbGRyZW46IHtcbiAgICAncGxheVRvZ2dsZSc6IHt9LFxuICAgICdjdXJyZW50VGltZURpc3BsYXknOiB7fSxcbiAgICAndGltZURpdmlkZXInOiB7fSxcbiAgICAnZHVyYXRpb25EaXNwbGF5Jzoge30sXG4gICAgJ3JlbWFpbmluZ1RpbWVEaXNwbGF5Jzoge30sXG4gICAgJ3Byb2dyZXNzQ29udHJvbCc6IHt9LFxuICAgICdmdWxsc2NyZWVuVG9nZ2xlJzoge30sXG4gICAgJ3ZvbHVtZUNvbnRyb2wnOiB7fSxcbiAgICAnbXV0ZVRvZ2dsZSc6IHt9XG4gICAgLy8gJ3ZvbHVtZU1lbnVCdXR0b24nOiB7fVxuICB9XG59O1xuXG52anMuQ29udHJvbEJhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLWNvbnRyb2wtYmFyJ1xuICB9KTtcbn07XG4vKipcbiAqIEJ1dHRvbiB0byB0b2dnbGUgYmV0d2VlbiBwbGF5IGFuZCBwYXVzZVxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5QbGF5VG9nZ2xlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBwbGF5ZXIub24oJ3BsYXknLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uUGxheSkpO1xuICAgIHBsYXllci5vbigncGF1c2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uUGF1c2UpKTtcbiAgfVxufSk7XG5cbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ1BsYXknO1xuXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiAndmpzLXBsYXktY29udHJvbCAnICsgdmpzLkJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcy5jYWxsKHRoaXMpO1xufTtcblxuLy8gT25DbGljayAtIFRvZ2dsZSBiZXR3ZWVuIHBsYXkgYW5kIHBhdXNlXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLnBsYXllcl8ucGF1c2VkKCkpIHtcbiAgICB0aGlzLnBsYXllcl8ucGxheSgpO1xuICB9IGVsc2Uge1xuICAgIHRoaXMucGxheWVyXy5wYXVzZSgpO1xuICB9XG59O1xuXG4gIC8vIE9uUGxheSAtIEFkZCB0aGUgdmpzLXBsYXlpbmcgY2xhc3MgdG8gdGhlIGVsZW1lbnQgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUub25QbGF5ID0gZnVuY3Rpb24oKXtcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXBhdXNlZCcpO1xuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xuICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnUGF1c2UnOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiUGF1c2VcIlxufTtcblxuICAvLyBPblBhdXNlIC0gQWRkIHRoZSB2anMtcGF1c2VkIGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLm9uUGF1c2UgPSBmdW5jdGlvbigpe1xuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGF1c2VkJyk7XG4gIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdQbGF5JzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIlBsYXlcIlxufTtcbi8qKlxuICogRGlzcGxheXMgdGhlIGN1cnJlbnQgdGltZVxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuQ3VycmVudFRpbWVEaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTtcbiAgfVxufSk7XG5cbnZqcy5DdXJyZW50VGltZURpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgdmFyIGVsID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy1jdXJyZW50LXRpbWUgdmpzLXRpbWUtY29udHJvbHMgdmpzLWNvbnRyb2wnXG4gIH0pO1xuXG4gIHRoaXMuY29udGVudCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy1jdXJyZW50LXRpbWUtZGlzcGxheScsXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+Q3VycmVudCBUaW1lIDwvc3Bhbj4nICsgJzA6MDAnLCAvLyBsYWJlbCB0aGUgY3VycmVudCB0aW1lIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzXG4gICAgJ2FyaWEtbGl2ZSc6ICdvZmYnIC8vIHRlbGwgc2NyZWVuIHJlYWRlcnMgbm90IHRvIGF1dG9tYXRpY2FsbHkgcmVhZCB0aGUgdGltZSBhcyBpdCBjaGFuZ2VzXG4gIH0pO1xuXG4gIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnZGl2JykuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KSk7XG4gIHJldHVybiBlbDtcbn07XG5cbnZqcy5DdXJyZW50VGltZURpc3BsYXkucHJvdG90eXBlLnVwZGF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpe1xuICAvLyBBbGxvd3MgZm9yIHNtb290aCBzY3J1YmJpbmcsIHdoZW4gcGxheWVyIGNhbid0IGtlZXAgdXAuXG4gIHZhciB0aW1lID0gKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcbiAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5DdXJyZW50IFRpbWUgPC9zcGFuPicgKyB2anMuZm9ybWF0VGltZSh0aW1lLCB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSk7XG59O1xuXG4vKipcbiAqIERpc3BsYXlzIHRoZSBkdXJhdGlvblxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuRHVyYXRpb25EaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTsgLy8gdGhpcyBtaWdodCBuZWVkIHRvIGJlIGNoYW5nZXMgdG8gJ2R1cmF0aW9uY2hhbmdlJyBpbnN0ZWFkIG9mICd0aW1ldXBkYXRlJyBldmVudHVhbGx5LCBob3dldmVyIHRoZSBkdXJhdGlvbmNoYW5nZSBldmVudCBmaXJlcyBiZWZvcmUgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkgaXMgc2V0LCBzbyB0aGUgdmFsdWUgY2Fubm90IGJlIHdyaXR0ZW4gb3V0IHVzaW5nIHRoaXMgbWV0aG9kLiBPbmNlIHRoZSBvcmRlciBvZiBkdXJhdGlvbmNoYW5nZSBhbmQgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkgYmVpbmcgc2V0IGlzIGZpZ3VyZWQgb3V0LCB0aGlzIGNhbiBiZSB1cGRhdGVkLlxuICB9XG59KTtcblxudmpzLkR1cmF0aW9uRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLWR1cmF0aW9uIHZqcy10aW1lLWNvbnRyb2xzIHZqcy1jb250cm9sJ1xuICB9KTtcblxuICB0aGlzLmNvbnRlbnQgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtZHVyYXRpb24tZGlzcGxheScsXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+RHVyYXRpb24gVGltZSA8L3NwYW4+JyArICcwOjAwJywgLy8gbGFiZWwgdGhlIGR1cmF0aW9uIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcbiAgICAnYXJpYS1saXZlJzogJ29mZicgLy8gdGVsbCBzY3JlZW4gcmVhZGVycyBub3QgdG8gYXV0b21hdGljYWxseSByZWFkIHRoZSB0aW1lIGFzIGl0IGNoYW5nZXNcbiAgfSk7XG5cbiAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdkaXYnKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTtcbiAgcmV0dXJuIGVsO1xufTtcblxudmpzLkR1cmF0aW9uRGlzcGxheS5wcm90b3R5cGUudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBkdXJhdGlvbiA9IHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xuICBpZiAoZHVyYXRpb24pIHtcbiAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+RHVyYXRpb24gVGltZSA8L3NwYW4+JyArIHZqcy5mb3JtYXRUaW1lKGR1cmF0aW9uKTsgLy8gbGFiZWwgdGhlIGR1cmF0aW9uIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcbiAgfVxufTtcblxuLyoqXG4gKiBUaGUgc2VwYXJhdG9yIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgZHVyYXRpb25cbiAqXG4gKiBDYW4gYmUgaGlkZGVuIGlmIGl0J3Mgbm90IG5lZWRlZCBpbiB0aGUgZGVzaWduLlxuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlRpbWVEaXZpZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gIH1cbn0pO1xuXG52anMuVGltZURpdmlkZXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtdGltZS1kaXZpZGVyJyxcbiAgICBpbm5lckhUTUw6ICc8ZGl2PjxzcGFuPi88L3NwYW4+PC9kaXY+J1xuICB9KTtcbn07XG5cbi8qKlxuICogRGlzcGxheXMgdGhlIHRpbWUgbGVmdCBpbiB0aGUgdmlkZW9cbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlJlbWFpbmluZ1RpbWVEaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTtcbiAgfVxufSk7XG5cbnZqcy5SZW1haW5pbmdUaW1lRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLXJlbWFpbmluZy10aW1lIHZqcy10aW1lLWNvbnRyb2xzIHZqcy1jb250cm9sJ1xuICB9KTtcblxuICB0aGlzLmNvbnRlbnQgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtcmVtYWluaW5nLXRpbWUtZGlzcGxheScsXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+UmVtYWluaW5nIFRpbWUgPC9zcGFuPicgKyAnLTA6MDAnLCAvLyBsYWJlbCB0aGUgcmVtYWluaW5nIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcbiAgICAnYXJpYS1saXZlJzogJ29mZicgLy8gdGVsbCBzY3JlZW4gcmVhZGVycyBub3QgdG8gYXV0b21hdGljYWxseSByZWFkIHRoZSB0aW1lIGFzIGl0IGNoYW5nZXNcbiAgfSk7XG5cbiAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdkaXYnKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTtcbiAgcmV0dXJuIGVsO1xufTtcblxudmpzLlJlbWFpbmluZ1RpbWVEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVDb250ZW50ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSB7XG4gICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5SZW1haW5pbmcgVGltZSA8L3NwYW4+JyArICctJysgdmpzLmZvcm1hdFRpbWUodGhpcy5wbGF5ZXJfLnJlbWFpbmluZ1RpbWUoKSk7XG4gIH1cblxuICAvLyBBbGxvd3MgZm9yIHNtb290aCBzY3J1YmJpbmcsIHdoZW4gcGxheWVyIGNhbid0IGtlZXAgdXAuXG4gIC8vIHZhciB0aW1lID0gKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcbiAgLy8gdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZqcy5mb3JtYXRUaW1lKHRpbWUsIHRoaXMucGxheWVyXy5kdXJhdGlvbigpKTtcbn07XG4vKipcbiAqIFRvZ2dsZSBmdWxsc2NyZWVuIHZpZGVvXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyB2anMuQnV0dG9uXG4gKi9cbnZqcy5GdWxsc2NyZWVuVG9nZ2xlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xuICAvKipcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBtZW1iZXJvZiB2anMuRnVsbHNjcmVlblRvZ2dsZVxuICAgKiBAaW5zdGFuY2VcbiAgICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gIH1cbn0pO1xuXG52anMuRnVsbHNjcmVlblRvZ2dsZS5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdGdWxsc2NyZWVuJztcblxudmpzLkZ1bGxzY3JlZW5Ub2dnbGUucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gJ3Zqcy1mdWxsc2NyZWVuLWNvbnRyb2wgJyArIHZqcy5CdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcbn07XG5cbnZqcy5GdWxsc2NyZWVuVG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcbiAgaWYgKCF0aGlzLnBsYXllcl8uaXNGdWxsU2NyZWVuKSB7XG4gICAgdGhpcy5wbGF5ZXJfLnJlcXVlc3RGdWxsU2NyZWVuKCk7XG4gICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ05vbi1GdWxsc2NyZWVuJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIk5vbi1GdWxsc2NyZWVuXCJcbiAgfSBlbHNlIHtcbiAgICB0aGlzLnBsYXllcl8uY2FuY2VsRnVsbFNjcmVlbigpO1xuICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdGdWxsc2NyZWVuJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdG8gXCJGdWxsc2NyZWVuXCJcbiAgfVxufTtcbi8qKlxuICogVGhlIFByb2dyZXNzIENvbnRyb2wgY29tcG9uZW50IGNvbnRhaW5zIHRoZSBzZWVrIGJhciwgbG9hZCBwcm9ncmVzcyxcbiAqIGFuZCBwbGF5IHByb2dyZXNzXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuUHJvZ3Jlc3NDb250cm9sID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gIH1cbn0pO1xuXG52anMuUHJvZ3Jlc3NDb250cm9sLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcbiAgY2hpbGRyZW46IHtcbiAgICAnc2Vla0Jhcic6IHt9XG4gIH1cbn07XG5cbnZqcy5Qcm9ncmVzc0NvbnRyb2wucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtcHJvZ3Jlc3MtY29udHJvbCB2anMtY29udHJvbCdcbiAgfSk7XG59O1xuXG4vKipcbiAqIFNlZWsgQmFyIGFuZCBob2xkZXIgZm9yIHRoZSBwcm9ncmVzcyBiYXJzXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuU2Vla0JhciA9IHZqcy5TbGlkZXIuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5TbGlkZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuICAgIHBsYXllci5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQVJJQUF0dHJpYnV0ZXMpKTtcbiAgICBwbGF5ZXIucmVhZHkodmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xuICB9XG59KTtcblxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9wdGlvbnNfID0ge1xuICBjaGlsZHJlbjoge1xuICAgICdsb2FkUHJvZ3Jlc3NCYXInOiB7fSxcbiAgICAncGxheVByb2dyZXNzQmFyJzoge30sXG4gICAgJ3NlZWtIYW5kbGUnOiB7fVxuICB9LFxuICAnYmFyTmFtZSc6ICdwbGF5UHJvZ3Jlc3NCYXInLFxuICAnaGFuZGxlTmFtZSc6ICdzZWVrSGFuZGxlJ1xufTtcblxudmpzLlNlZWtCYXIucHJvdG90eXBlLnBsYXllckV2ZW50ID0gJ3RpbWV1cGRhdGUnO1xuXG52anMuU2Vla0Jhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy1wcm9ncmVzcy1ob2xkZXInLFxuICAgICdhcmlhLWxhYmVsJzogJ3ZpZGVvIHByb2dyZXNzIGJhcidcbiAgfSk7XG59O1xuXG52anMuU2Vla0Jhci5wcm90b3R5cGUudXBkYXRlQVJJQUF0dHJpYnV0ZXMgPSBmdW5jdGlvbigpe1xuICAgIC8vIEFsbG93cyBmb3Igc21vb3RoIHNjcnViYmluZywgd2hlbiBwbGF5ZXIgY2FuJ3Qga2VlcCB1cC5cbiAgICB2YXIgdGltZSA9ICh0aGlzLnBsYXllcl8uc2NydWJiaW5nKSA/IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpLmN1cnJlbnRUaW1lIDogdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93Jyx2anMucm91bmQodGhpcy5nZXRQZXJjZW50KCkqMTAwLCAyKSk7IC8vIG1hY2hpbmUgcmVhZGFibGUgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIChwZXJjZW50YWdlIGNvbXBsZXRlKVxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLHZqcy5mb3JtYXRUaW1lKHRpbWUsIHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSk7IC8vIGh1bWFuIHJlYWRhYmxlIHZhbHVlIG9mIHByb2dyZXNzIGJhciAodGltZSBjb21wbGV0ZSlcbn07XG5cbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5nZXRQZXJjZW50ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGN1cnJlbnRUaW1lO1xuICAvLyBGbGFzaCBSVE1QIHByb3ZpZGVyIHdpbGwgbm90IHJlcG9ydCB0aGUgY29ycmVjdCB0aW1lXG4gIC8vIGltbWVkaWF0ZWx5IGFmdGVyIGEgc2Vlay4gVGhpcyBpc24ndCBub3RpY2VhYmxlIGlmIHlvdSdyZVxuICAvLyBzZWVraW5nIHdoaWxlIHRoZSB2aWRlbyBpcyBwbGF5aW5nLCBidXQgaXQgaXMgaWYgeW91IHNlZWtcbiAgLy8gd2hpbGUgdGhlIHZpZGVvIGlzIHBhdXNlZC5cbiAgaWYgKHRoaXMucGxheWVyXy50ZWNoTmFtZSA9PT0gJ0ZsYXNoJyAmJiB0aGlzLnBsYXllcl8uc2Vla2luZygpKSB7XG4gICAgdmFyIGNhY2hlID0gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCk7XG4gICAgaWYgKGNhY2hlLmxhc3RTZXRDdXJyZW50VGltZSkge1xuICAgICAgY3VycmVudFRpbWUgPSBjYWNoZS5sYXN0U2V0Q3VycmVudFRpbWU7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgY3VycmVudFRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcbiAgfVxuXG4gIHJldHVybiBjdXJyZW50VGltZSAvIHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xufTtcblxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24oZXZlbnQpe1xuICB2anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlRG93bi5jYWxsKHRoaXMsIGV2ZW50KTtcblxuICB0aGlzLnBsYXllcl8uc2NydWJiaW5nID0gdHJ1ZTtcblxuICB0aGlzLnZpZGVvV2FzUGxheWluZyA9ICF0aGlzLnBsYXllcl8ucGF1c2VkKCk7XG4gIHRoaXMucGxheWVyXy5wYXVzZSgpO1xufTtcblxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24oZXZlbnQpe1xuICB2YXIgbmV3VGltZSA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQpICogdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XG5cbiAgLy8gRG9uJ3QgbGV0IHZpZGVvIGVuZCB3aGlsZSBzY3J1YmJpbmcuXG4gIGlmIChuZXdUaW1lID09IHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSB7IG5ld1RpbWUgPSBuZXdUaW1lIC0gMC4xOyB9XG5cbiAgLy8gU2V0IG5ldyB0aW1lICh0ZWxsIHBsYXllciB0byBzZWVrIHRvIG5ldyB0aW1lKVxuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUobmV3VGltZSk7XG59O1xuXG52anMuU2Vla0Jhci5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24oZXZlbnQpe1xuICB2anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlVXAuY2FsbCh0aGlzLCBldmVudCk7XG5cbiAgdGhpcy5wbGF5ZXJfLnNjcnViYmluZyA9IGZhbHNlO1xuICBpZiAodGhpcy52aWRlb1dhc1BsYXlpbmcpIHtcbiAgICB0aGlzLnBsYXllcl8ucGxheSgpO1xuICB9XG59O1xuXG52anMuU2Vla0Jhci5wcm90b3R5cGUuc3RlcEZvcndhcmQgPSBmdW5jdGlvbigpe1xuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUodGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCkgKyA1KTsgLy8gbW9yZSBxdWlja2x5IGZhc3QgZm9yd2FyZCBmb3Iga2V5Ym9hcmQtb25seSB1c2Vyc1xufTtcblxudmpzLlNlZWtCYXIucHJvdG90eXBlLnN0ZXBCYWNrID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpIC0gNSk7IC8vIG1vcmUgcXVpY2tseSByZXdpbmQgZm9yIGtleWJvYXJkLW9ubHkgdXNlcnNcbn07XG5cblxuLyoqXG4gKiBTaG93cyBsb2FkIHByb2dyZXNzXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuTG9hZFByb2dyZXNzQmFyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gICAgcGxheWVyLm9uKCdwcm9ncmVzcycsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XG4gIH1cbn0pO1xuXG52anMuTG9hZFByb2dyZXNzQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLWxvYWQtcHJvZ3Jlc3MnLFxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkxvYWRlZDogMCU8L3NwYW4+J1xuICB9KTtcbn07XG5cbnZqcy5Mb2FkUHJvZ3Jlc3NCYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLmVsXy5zdHlsZSkgeyB0aGlzLmVsXy5zdHlsZS53aWR0aCA9IHZqcy5yb3VuZCh0aGlzLnBsYXllcl8uYnVmZmVyZWRQZXJjZW50KCkgKiAxMDAsIDIpICsgJyUnOyB9XG59O1xuXG5cbi8qKlxuICogU2hvd3MgcGxheSBwcm9ncmVzc1xuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlBsYXlQcm9ncmVzc0JhciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuICB9XG59KTtcblxudmpzLlBsYXlQcm9ncmVzc0Jhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy1wbGF5LXByb2dyZXNzJyxcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5Qcm9ncmVzczogMCU8L3NwYW4+J1xuICB9KTtcbn07XG5cbi8qKlxuICogVGhlIFNlZWsgSGFuZGxlIHNob3dzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwbGF5aGVhZCBkdXJpbmcgcGxheWJhY2ssXG4gKiBhbmQgY2FuIGJlIGRyYWdnZWQgdG8gYWRqdXN0IHRoZSBwbGF5aGVhZC5cbiAqXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5TZWVrSGFuZGxlID0gdmpzLlNsaWRlckhhbmRsZS5leHRlbmQoKTtcblxuLyoqXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGhhbmRsZSBjb250ZW50LCB3aGljaCBtYXkgYmUgcmVhZCBieSBzY3JlZW4gcmVhZGVyc1xuICpcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG52anMuU2Vla0hhbmRsZS5wcm90b3R5cGUuZGVmYXVsdFZhbHVlID0gJzAwOjAwJztcblxuLyoqIEBpbmhlcml0RG9jICovXG52anMuU2Vla0hhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy1zZWVrLWhhbmRsZSdcbiAgfSk7XG59O1xuLyoqXG4gKiBUaGUgY29tcG9uZW50IGZvciBjb250cm9sbGluZyB0aGUgdm9sdW1lIGxldmVsXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuVm9sdW1lQ29udHJvbCA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuXG4gICAgLy8gaGlkZSB2b2x1bWUgY29udHJvbHMgd2hlbiB0aGV5J3JlIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgdGVjaFxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgIH1cbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxufSk7XG5cbnZqcy5Wb2x1bWVDb250cm9sLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcbiAgY2hpbGRyZW46IHtcbiAgICAndm9sdW1lQmFyJzoge31cbiAgfVxufTtcblxudmpzLlZvbHVtZUNvbnRyb2wucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLWNvbnRyb2wgdmpzLWNvbnRyb2wnXG4gIH0pO1xufTtcblxuLyoqXG4gKiBUaGUgYmFyIHRoYXQgY29udGFpbnMgdGhlIHZvbHVtZSBsZXZlbCBhbmQgY2FuIGJlIGNsaWNrZWQgb24gdG8gYWRqdXN0IHRoZSBsZXZlbFxuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlZvbHVtZUJhciA9IHZqcy5TbGlkZXIuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5TbGlkZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuICAgIHBsYXllci5vbigndm9sdW1lY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xuICAgIHBsYXllci5yZWFkeSh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzKSk7XG4gICAgc2V0VGltZW91dCh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSksIDApOyAvLyB1cGRhdGUgd2hlbiBlbGVtZW50cyBpcyBpbiBET01cbiAgfVxufSk7XG5cbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzID0gZnVuY3Rpb24oKXtcbiAgLy8gQ3VycmVudCB2YWx1ZSBvZiB2b2x1bWUgYmFyIGFzIGEgcGVyY2VudGFnZVxuICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLHZqcy5yb3VuZCh0aGlzLnBsYXllcl8udm9sdW1lKCkqMTAwLCAyKSk7XG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLHZqcy5yb3VuZCh0aGlzLnBsYXllcl8udm9sdW1lKCkqMTAwLCAyKSsnJScpO1xufTtcblxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUub3B0aW9uc18gPSB7XG4gIGNoaWxkcmVuOiB7XG4gICAgJ3ZvbHVtZUxldmVsJzoge30sXG4gICAgJ3ZvbHVtZUhhbmRsZSc6IHt9XG4gIH0sXG4gICdiYXJOYW1lJzogJ3ZvbHVtZUxldmVsJyxcbiAgJ2hhbmRsZU5hbWUnOiAndm9sdW1lSGFuZGxlJ1xufTtcblxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUucGxheWVyRXZlbnQgPSAndm9sdW1lY2hhbmdlJztcblxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtYmFyJyxcbiAgICAnYXJpYS1sYWJlbCc6ICd2b2x1bWUgbGV2ZWwnXG4gIH0pO1xufTtcblxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xuICBpZiAodGhpcy5wbGF5ZXJfLm11dGVkKCkpIHtcbiAgICB0aGlzLnBsYXllcl8ubXV0ZWQoZmFsc2UpO1xuICB9XG5cbiAgdGhpcy5wbGF5ZXJfLnZvbHVtZSh0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50KSk7XG59O1xuXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5nZXRQZXJjZW50ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMucGxheWVyXy5tdXRlZCgpKSB7XG4gICAgcmV0dXJuIDA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHRoaXMucGxheWVyXy52b2x1bWUoKTtcbiAgfVxufTtcblxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuc3RlcEZvcndhcmQgPSBmdW5jdGlvbigpe1xuICB0aGlzLnBsYXllcl8udm9sdW1lKHRoaXMucGxheWVyXy52b2x1bWUoKSArIDAuMSk7XG59O1xuXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5zdGVwQmFjayA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMucGxheWVyXy52b2x1bWUodGhpcy5wbGF5ZXJfLnZvbHVtZSgpIC0gMC4xKTtcbn07XG5cbi8qKlxuICogU2hvd3Mgdm9sdW1lIGxldmVsXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuVm9sdW1lTGV2ZWwgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcbiAgfVxufSk7XG5cbnZqcy5Wb2x1bWVMZXZlbC5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtbGV2ZWwnLFxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPjwvc3Bhbj4nXG4gIH0pO1xufTtcblxuLyoqXG4gKiBUaGUgdm9sdW1lIGhhbmRsZSBjYW4gYmUgZHJhZ2dlZCB0byBhZGp1c3QgdGhlIHZvbHVtZSBsZXZlbFxuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xuIHZqcy5Wb2x1bWVIYW5kbGUgPSB2anMuU2xpZGVySGFuZGxlLmV4dGVuZCgpO1xuXG4gdmpzLlZvbHVtZUhhbmRsZS5wcm90b3R5cGUuZGVmYXVsdFZhbHVlID0gJzAwOjAwJztcblxuIC8qKiBAaW5oZXJpdERvYyAqL1xuIHZqcy5Wb2x1bWVIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgIHJldHVybiB2anMuU2xpZGVySGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtaGFuZGxlJ1xuICAgfSk7XG4gfTtcbi8qKlxuICogQSBidXR0b24gY29tcG9uZW50IGZvciBtdXRpbmcgdGhlIGF1ZGlvXG4gKlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuTXV0ZVRvZ2dsZSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuXG4gICAgcGxheWVyLm9uKCd2b2x1bWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xuXG4gICAgLy8gaGlkZSBtdXRlIHRvZ2dsZSBpZiB0aGUgY3VycmVudCB0ZWNoIGRvZXNuJ3Qgc3VwcG9ydCB2b2x1bWUgY29udHJvbFxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgIH1cbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxufSk7XG5cbnZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB2anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLW11dGUtY29udHJvbCB2anMtY29udHJvbCcsXG4gICAgaW5uZXJIVE1MOiAnPGRpdj48c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5NdXRlPC9zcGFuPjwvZGl2PidcbiAgfSk7XG59O1xuXG52anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMucGxheWVyXy5tdXRlZCggdGhpcy5wbGF5ZXJfLm11dGVkKCkgPyBmYWxzZSA6IHRydWUgKTtcbn07XG5cbnZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdm9sID0gdGhpcy5wbGF5ZXJfLnZvbHVtZSgpLFxuICAgICAgbGV2ZWwgPSAzO1xuXG4gIGlmICh2b2wgPT09IDAgfHwgdGhpcy5wbGF5ZXJfLm11dGVkKCkpIHtcbiAgICBsZXZlbCA9IDA7XG4gIH0gZWxzZSBpZiAodm9sIDwgMC4zMykge1xuICAgIGxldmVsID0gMTtcbiAgfSBlbHNlIGlmICh2b2wgPCAwLjY3KSB7XG4gICAgbGV2ZWwgPSAyO1xuICB9XG5cbiAgLy8gRG9uJ3QgcmV3cml0ZSB0aGUgYnV0dG9uIHRleHQgaWYgdGhlIGFjdHVhbCB0ZXh0IGRvZXNuJ3QgY2hhbmdlLlxuICAvLyBUaGlzIGNhdXNlcyB1bm5lY2Vzc2FyeSBhbmQgY29uZnVzaW5nIGluZm9ybWF0aW9uIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzLlxuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgZXZlcnkgdGltZSB0aGUgdm9sdW1lIGxldmVsIGlzIGNoYW5nZWQuXG4gIGlmKHRoaXMucGxheWVyXy5tdXRlZCgpKXtcbiAgICAgIGlmKHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCE9J1VubXV0ZScpe1xuICAgICAgICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdVbm11dGUnOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiVW5tdXRlXCJcbiAgICAgIH1cbiAgfSBlbHNlIHtcbiAgICAgIGlmKHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCE9J011dGUnKXtcbiAgICAgICAgICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnTXV0ZSc7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJNdXRlXCJcbiAgICAgIH1cbiAgfVxuXG4gIC8qIFRPRE8gaW1wcm92ZSBtdXRlZCBpY29uIGNsYXNzZXMgKi9cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtdm9sLScraSk7XG4gIH1cbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXZvbC0nK2xldmVsKTtcbn07XG4vKipcbiAqIE1lbnUgYnV0dG9uIHdpdGggYSBwb3B1cCBmb3Igc2hvd2luZyB0aGUgdm9sdW1lIHNsaWRlci5cbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuVm9sdW1lTWVudUJ1dHRvbiA9IHZqcy5NZW51QnV0dG9uLmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcbiAgICB2anMuTWVudUJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICAvLyBTYW1lIGxpc3RlbmVycyBhcyBNdXRlVG9nZ2xlXG4gICAgcGxheWVyLm9uKCd2b2x1bWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xuXG4gICAgLy8gaGlkZSBtdXRlIHRvZ2dsZSBpZiB0aGUgY3VycmVudCB0ZWNoIGRvZXNuJ3Qgc3VwcG9ydCB2b2x1bWUgY29udHJvbFxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcy52b2x1bWVDb250cm9sID09PSBmYWxzZSkge1xuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgIH1cbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXMudm9sdW1lQ29udHJvbCA9PT0gZmFsc2UpIHtcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgICB0aGlzLmFkZENsYXNzKCd2anMtbWVudS1idXR0b24nKTtcbiAgfVxufSk7XG5cbnZqcy5Wb2x1bWVNZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcbiAgdmFyIG1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfLCB7XG4gICAgY29udGVudEVsVHlwZTogJ2RpdidcbiAgfSk7XG4gIHZhciB2YyA9IG5ldyB2anMuVm9sdW1lQmFyKHRoaXMucGxheWVyXywgdmpzLm9iai5tZXJnZSh7dmVydGljYWw6IHRydWV9LCB0aGlzLm9wdGlvbnNfLnZvbHVtZUJhcikpO1xuICBtZW51LmFkZENoaWxkKHZjKTtcbiAgcmV0dXJuIG1lbnU7XG59O1xuXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XG4gIHZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XG59O1xuXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtbWVudS1idXR0b24gdmpzLW1lbnUtYnV0dG9uIHZqcy1jb250cm9sJyxcbiAgICBpbm5lckhUTUw6ICc8ZGl2PjxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPk11dGU8L3NwYW4+PC9kaXY+J1xuICB9KTtcbn07XG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUudXBkYXRlID0gdmpzLk11dGVUb2dnbGUucHJvdG90eXBlLnVwZGF0ZTtcbi8qIFBvc3RlciBJbWFnZVxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cbi8qKlxuICogVGhlIGNvbXBvbmVudCB0aGF0IGhhbmRsZXMgc2hvd2luZyB0aGUgcG9zdGVyIGltYWdlLlxuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlBvc3RlckltYWdlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG5cbiAgICBpZiAoIXBsYXllci5wb3N0ZXIoKSB8fCAhcGxheWVyLmNvbnRyb2xzKCkpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIHBsYXllci5vbigncGxheScsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICB9XG59KTtcblxudmpzLlBvc3RlckltYWdlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBlbCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xuICAgICAgICBjbGFzc05hbWU6ICd2anMtcG9zdGVyJyxcblxuICAgICAgICAvLyBEb24ndCB3YW50IHBvc3RlciB0byBiZSB0YWJiYWJsZS5cbiAgICAgICAgdGFiSW5kZXg6IC0xXG4gICAgICB9KSxcbiAgICAgIHBvc3RlciA9IHRoaXMucGxheWVyXy5wb3N0ZXIoKTtcblxuICBpZiAocG9zdGVyKSB7XG4gICAgaWYgKCdiYWNrZ3JvdW5kU2l6ZScgaW4gZWwuc3R5bGUpIHtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCInICsgcG9zdGVyICsgJ1wiKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnaW1nJywgeyBzcmM6IHBvc3RlciB9KSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGVsO1xufTtcblxudmpzLlBvc3RlckltYWdlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcbiAgLy8gT25seSBhY2NlcHQgY2xpY2tzIHdoZW4gY29udHJvbHMgYXJlIGVuYWJsZWRcbiAgaWYgKHRoaXMucGxheWVyKCkuY29udHJvbHMoKSkge1xuICAgIHRoaXMucGxheWVyXy5wbGF5KCk7XG4gIH1cbn07XG4vKiBMb2FkaW5nIFNwaW5uZXJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4vKipcbiAqIExvYWRpbmcgc3Bpbm5lciBmb3Igd2FpdGluZyBldmVudHNcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY2xhc3NcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuTG9hZGluZ1NwaW5uZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcblxuICAgIHBsYXllci5vbignY2FucGxheScsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xuICAgIHBsYXllci5vbignY2FucGxheXRocm91Z2gnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICBwbGF5ZXIub24oJ3BsYXlpbmcnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcbiAgICBwbGF5ZXIub24oJ3NlZWtlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xuXG4gICAgcGxheWVyLm9uKCdzZWVraW5nJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XG5cbiAgICAvLyBpbiBzb21lIGJyb3dzZXJzIHNlZWtpbmcgZG9lcyBub3QgdHJpZ2dlciB0aGUgJ3BsYXlpbmcnIGV2ZW50LFxuICAgIC8vIHNvIHdlIGFsc28gbmVlZCB0byB0cmFwICdzZWVrZWQnIGlmIHdlIGFyZSBnb2luZyB0byBzZXQgYVxuICAgIC8vICdzZWVraW5nJyBldmVudFxuICAgIHBsYXllci5vbignc2Vla2VkJywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XG5cbiAgICBwbGF5ZXIub24oJ2Vycm9yJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XG5cbiAgICAvLyBOb3Qgc2hvd2luZyBzcGlubmVyIG9uIHN0YWxsZWQgYW55IG1vcmUuIEJyb3dzZXJzIG1heSBzdGFsbCBhbmQgdGhlbiBub3QgdHJpZ2dlciBhbnkgZXZlbnRzIHRoYXQgd291bGQgcmVtb3ZlIHRoZSBzcGlubmVyLlxuICAgIC8vIENoZWNrZWQgaW4gQ2hyb21lIDE2IGFuZCBTYWZhcmkgNS4xLjIuIGh0dHA6Ly9oZWxwLnZpZGVvanMuY29tL2Rpc2N1c3Npb25zL3Byb2JsZW1zLzg4My13aHktaXMtdGhlLWRvd25sb2FkLXByb2dyZXNzLXNob3dpbmdcbiAgICAvLyBwbGF5ZXIub24oJ3N0YWxsZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnNob3cpKTtcblxuICAgIHBsYXllci5vbignd2FpdGluZycsIHZqcy5iaW5kKHRoaXMsIHRoaXMuc2hvdykpO1xuICB9XG59KTtcblxudmpzLkxvYWRpbmdTcGlubmVyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLWxvYWRpbmctc3Bpbm5lcidcbiAgfSk7XG59O1xuLyogQmlnIFBsYXkgQnV0dG9uXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xuLyoqXG4gKiBJbml0aWFsIHBsYXkgYnV0dG9uLiBTaG93cyBiZWZvcmUgdGhlIHZpZGVvIGhhcyBwbGF5ZWQuIFRoZSBoaWRpbmcgb2YgdGhlXG4gKiBiaWcgcGxheSBidXR0b24gaXMgZG9uZSB2aWEgQ1NTIGFuZCBwbGF5ZXIgc3RhdGVzLlxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBjbGFzc1xuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5CaWdQbGF5QnV0dG9uID0gdmpzLkJ1dHRvbi5leHRlbmQoKTtcblxudmpzLkJpZ1BsYXlCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtYmlnLXBsYXktYnV0dG9uJyxcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+JyxcbiAgICAnYXJpYS1sYWJlbCc6ICdwbGF5IHZpZGVvJ1xuICB9KTtcbn07XG5cbnZqcy5CaWdQbGF5QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5wbGF5ZXJfLnBsYXkoKTtcbn07XG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgTWVkaWEgVGVjaG5vbG9neSBDb250cm9sbGVyIC0gQmFzZSBjbGFzcyBmb3IgbWVkaWEgcGxheWJhY2tcbiAqIHRlY2hub2xvZ3kgY29udHJvbGxlcnMgbGlrZSBGbGFzaCBhbmQgSFRNTDVcbiAqL1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIG1lZGlhIChIVE1MNSBWaWRlbywgRmxhc2gpIGNvbnRyb2xsZXJzXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXIgIENlbnRyYWwgcGxheWVyIGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuTWVkaWFUZWNoQ29udHJvbGxlciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XG5cbiAgICB0aGlzLmluaXRDb250cm9sc0xpc3RlbmVycygpO1xuICB9XG59KTtcblxuLyoqXG4gKiBTZXQgdXAgY2xpY2sgYW5kIHRvdWNoIGxpc3RlbmVycyBmb3IgdGhlIHBsYXliYWNrIGVsZW1lbnRcbiAqIE9uIGRlc2t0b3BzLCBhIGNsaWNrIG9uIHRoZSB2aWRlbyBpdHNlbGYgd2lsbCB0b2dnbGUgcGxheWJhY2ssXG4gKiBvbiBhIG1vYmlsZSBkZXZpY2UgYSBjbGljayBvbiB0aGUgdmlkZW8gdG9nZ2xlcyBjb250cm9scy5cbiAqICh0b2dnbGluZyBjb250cm9scyBpcyBkb25lIGJ5IHRvZ2dsaW5nIHRoZSB1c2VyIHN0YXRlIGJldHdlZW4gYWN0aXZlIGFuZFxuICogaW5hY3RpdmUpXG4gKlxuICogQSB0YXAgY2FuIHNpZ25hbCB0aGF0IGEgdXNlciBoYXMgYmVjb21lIGFjdGl2ZSwgb3IgaGFzIGJlY29tZSBpbmFjdGl2ZVxuICogZS5nLiBhIHF1aWNrIHRhcCBvbiBhbiBpUGhvbmUgbW92aWUgc2hvdWxkIHJldmVhbCB0aGUgY29udHJvbHMuIEFub3RoZXJcbiAqIHF1aWNrIHRhcCBzaG91bGQgaGlkZSB0aGVtIGFnYWluIChzaWduYWxpbmcgdGhlIHVzZXIgaXMgaW4gYW4gaW5hY3RpdmVcbiAqIHZpZXdpbmcgc3RhdGUpXG4gKlxuICogSW4gYWRkaXRpb24gdG8gdGhpcywgd2Ugc3RpbGwgd2FudCB0aGUgdXNlciB0byBiZSBjb25zaWRlcmVkIGluYWN0aXZlIGFmdGVyXG4gKiBhIGZldyBzZWNvbmRzIG9mIGluYWN0aXZpdHkuXG4gKlxuICogTm90ZTogdGhlIG9ubHkgcGFydCBvZiBpT1MgaW50ZXJhY3Rpb24gd2UgY2FuJ3QgbWltaWMgd2l0aCB0aGlzIHNldHVwXG4gKiBpcyBhIHRvdWNoIGFuZCBob2xkIG9uIHRoZSB2aWRlbyBlbGVtZW50IGNvdW50aW5nIGFzIGFjdGl2aXR5IGluIG9yZGVyIHRvXG4gKiBrZWVwIHRoZSBjb250cm9scyBzaG93aW5nLCBidXQgdGhhdCBzaG91bGRuJ3QgYmUgYW4gaXNzdWUuIEEgdG91Y2ggYW5kIGhvbGQgb25cbiAqIGFueSBjb250cm9scyB3aWxsIHN0aWxsIGtlZXAgdGhlIHVzZXIgYWN0aXZlXG4gKi9cbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q29udHJvbHNMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xuICB2YXIgcGxheWVyLCB0ZWNoLCBhY3RpdmF0ZUNvbnRyb2xzLCBkZWFjdGl2YXRlQ29udHJvbHM7XG5cbiAgdGVjaCA9IHRoaXM7XG4gIHBsYXllciA9IHRoaXMucGxheWVyKCk7XG5cbiAgdmFyIGFjdGl2YXRlQ29udHJvbHMgPSBmdW5jdGlvbigpe1xuICAgIGlmIChwbGF5ZXIuY29udHJvbHMoKSAmJiAhcGxheWVyLnVzaW5nTmF0aXZlQ29udHJvbHMoKSkge1xuICAgICAgdGVjaC5hZGRDb250cm9sc0xpc3RlbmVycygpO1xuICAgIH1cbiAgfTtcblxuICBkZWFjdGl2YXRlQ29udHJvbHMgPSB2anMuYmluZCh0ZWNoLCB0ZWNoLnJlbW92ZUNvbnRyb2xzTGlzdGVuZXJzKTtcblxuICAvLyBTZXQgdXAgZXZlbnQgbGlzdGVuZXJzIG9uY2UgdGhlIHRlY2ggaXMgcmVhZHkgYW5kIGhhcyBhbiBlbGVtZW50IHRvIGFwcGx5XG4gIC8vIGxpc3RlbmVycyB0b1xuICB0aGlzLnJlYWR5KGFjdGl2YXRlQ29udHJvbHMpO1xuICBwbGF5ZXIub24oJ2NvbnRyb2xzZW5hYmxlZCcsIGFjdGl2YXRlQ29udHJvbHMpO1xuICBwbGF5ZXIub24oJ2NvbnRyb2xzZGlzYWJsZWQnLCBkZWFjdGl2YXRlQ29udHJvbHMpO1xufTtcblxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmFkZENvbnRyb2xzTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHByZXZlbnRCdWJibGUsIHVzZXJXYXNBY3RpdmU7XG5cbiAgLy8gU29tZSBicm93c2VycyAoQ2hyb21lICYgSUUpIGRvbid0IHRyaWdnZXIgYSBjbGljayBvbiBhIGZsYXNoIHN3ZiwgYnV0IGRvXG4gIC8vIHRyaWdnZXIgbW91c2Vkb3duL3VwLlxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0NDQ1NjIvamF2YXNjcmlwdC1vbmNsaWNrLWV2ZW50LW92ZXItZmxhc2gtb2JqZWN0XG4gIC8vIEFueSB0b3VjaCBldmVudHMgYXJlIHNldCB0byBibG9jayB0aGUgbW91c2Vkb3duIGV2ZW50IGZyb20gaGFwcGVuaW5nXG4gIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMub25DbGljayk7XG5cbiAgLy8gV2UgbmVlZCB0byBibG9jayB0b3VjaCBldmVudHMgb24gdGhlIHZpZGVvIGVsZW1lbnQgZnJvbSBidWJibGluZyB1cCxcbiAgLy8gb3RoZXJ3aXNlIHRoZXknbGwgc2lnbmFsIGFjdGl2aXR5IHByZW1hdHVyZWx5LiBUaGUgc3BlY2lmaWMgdXNlIGNhc2UgaXNcbiAgLy8gd2hlbiB0aGUgdmlkZW8gaXMgcGxheWluZyBhbmQgdGhlIGNvbnRyb2xzIGhhdmUgZmFkZWQgb3V0LiBJbiB0aGlzIGNhc2VcbiAgLy8gb25seSBhIHRhcCAoZmFzdCB0b3VjaCkgc2hvdWxkIHRvZ2dsZSB0aGUgdXNlciBhY3RpdmUgc3RhdGUgYW5kIHR1cm4gdGhlXG4gIC8vIGNvbnRyb2xzIGJhY2sgb24uIEEgdG91Y2ggYW5kIG1vdmUgb3IgdG91Y2ggYW5kIGhvbGQgc2hvdWxkIG5vdCB0cmlnZ2VyXG4gIC8vIHRoZSBjb250cm9scyAocGVyIGlPUyBhcyBhbiBleGFtcGxlIGF0IGxlYXN0KVxuICAvL1xuICAvLyBXZSBhbHdheXMgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIG9uIHRvdWNoc3RhcnQgYmVjYXVzZSB0b3VjaHN0YXJ0XG4gIC8vIGF0IHRoZSBwbGF5ZXIgbGV2ZWwgc3RhcnRzIHRoZSB0b3VjaEluUHJvZ3Jlc3MgaW50ZXJ2YWwuIFdlIGNhbiBzdGlsbFxuICAvLyByZXBvcnQgYWN0aXZpdHkgb24gdGhlIG90aGVyIGV2ZW50cywgYnV0IHdvbid0IGxldCB0aGVtIGJ1YmJsZSBmb3JcbiAgLy8gY29uc2lzdGVuY3kuIFdlIGRvbid0IHdhbnQgdG8gYnViYmxlIGEgdG91Y2hlbmQgd2l0aG91dCBhIHRvdWNoc3RhcnQuXG4gIHRoaXMub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xuICAgIC8vIFN0b3AgdGhlIG1vdXNlIGV2ZW50cyBmcm9tIGFsc28gaGFwcGVuaW5nXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAvLyBSZWNvcmQgaWYgdGhlIHVzZXIgd2FzIGFjdGl2ZSBub3cgc28gd2UgZG9uJ3QgaGF2ZSB0byBrZWVwIHBvbGxpbmcgaXRcbiAgICB1c2VyV2FzQWN0aXZlID0gdGhpcy5wbGF5ZXJfLnVzZXJBY3RpdmUoKTtcbiAgfSk7XG5cbiAgcHJldmVudEJ1YmJsZSA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBpZiAodXNlcldhc0FjdGl2ZSkge1xuICAgICAgdGhpcy5wbGF5ZXJfLnJlcG9ydFVzZXJBY3Rpdml0eSgpO1xuICAgIH1cbiAgfTtcblxuICAvLyBUcmVhdCBhbGwgdG91Y2ggZXZlbnRzIHRoZSBzYW1lIGZvciBjb25zaXN0ZW5jeVxuICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBwcmV2ZW50QnViYmxlKTtcbiAgdGhpcy5vbigndG91Y2hsZWF2ZScsIHByZXZlbnRCdWJibGUpO1xuICB0aGlzLm9uKCd0b3VjaGNhbmNlbCcsIHByZXZlbnRCdWJibGUpO1xuICB0aGlzLm9uKCd0b3VjaGVuZCcsIHByZXZlbnRCdWJibGUpO1xuXG4gIC8vIFR1cm4gb24gY29tcG9uZW50IHRhcCBldmVudHNcbiAgdGhpcy5lbWl0VGFwRXZlbnRzKCk7XG5cbiAgLy8gVGhlIHRhcCBsaXN0ZW5lciBuZWVkcyB0byBjb21lIGFmdGVyIHRoZSB0b3VjaGVuZCBsaXN0ZW5lciBiZWNhdXNlIHRoZSB0YXBcbiAgLy8gbGlzdGVuZXIgY2FuY2VscyBvdXQgYW55IHJlcG9ydGVkVXNlckFjdGl2aXR5IHdoZW4gc2V0dGluZyB1c2VyQWN0aXZlKGZhbHNlKVxuICB0aGlzLm9uKCd0YXAnLCB0aGlzLm9uVGFwKTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdXNlZCBmb3IgY2xpY2sgYW5kIHRhcCBjb250cm9scy4gVGhpcyBpcyBuZWVkZWQgZm9yXG4gKiB0b2dnbGluZyB0byBjb250cm9scyBkaXNhYmxlZCwgd2hlcmUgYSB0YXAvdG91Y2ggc2hvdWxkIGRvIG5vdGhpbmcuXG4gKi9cbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVDb250cm9sc0xpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XG4gIC8vIFdlIGRvbid0IHdhbnQgdG8ganVzdCB1c2UgYHRoaXMub2ZmKClgIGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgb3RoZXIgbmVlZGVkXG4gIC8vIGxpc3RlbmVycyBhZGRlZCBieSB0ZWNocyB0aGF0IGV4dGVuZCB0aGlzLlxuICB0aGlzLm9mZigndGFwJyk7XG4gIHRoaXMub2ZmKCd0b3VjaHN0YXJ0Jyk7XG4gIHRoaXMub2ZmKCd0b3VjaG1vdmUnKTtcbiAgdGhpcy5vZmYoJ3RvdWNobGVhdmUnKTtcbiAgdGhpcy5vZmYoJ3RvdWNoY2FuY2VsJyk7XG4gIHRoaXMub2ZmKCd0b3VjaGVuZCcpO1xuICB0aGlzLm9mZignY2xpY2snKTtcbiAgdGhpcy5vZmYoJ21vdXNlZG93bicpO1xufTtcblxuLyoqXG4gKiBIYW5kbGUgYSBjbGljayBvbiB0aGUgbWVkaWEgZWxlbWVudC4gQnkgZGVmYXVsdCB3aWxsIHBsYXkvcGF1c2UgdGhlIG1lZGlhLlxuICovXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcbiAgLy8gV2UncmUgdXNpbmcgbW91c2Vkb3duIHRvIGRldGVjdCBjbGlja3MgdGhhbmtzIHRvIEZsYXNoLCBidXQgbW91c2Vkb3duXG4gIC8vIHdpbGwgYWxzbyBiZSB0cmlnZ2VyZWQgd2l0aCByaWdodC1jbGlja3MsIHNvIHdlIG5lZWQgdG8gcHJldmVudCB0aGF0XG4gIGlmIChldmVudC5idXR0b24gIT09IDApIHJldHVybjtcblxuICAvLyBXaGVuIGNvbnRyb2xzIGFyZSBkaXNhYmxlZCBhIGNsaWNrIHNob3VsZCBub3QgdG9nZ2xlIHBsYXliYWNrIGJlY2F1c2VcbiAgLy8gdGhlIGNsaWNrIGlzIGNvbnNpZGVyZWQgYSBjb250cm9sXG4gIGlmICh0aGlzLnBsYXllcigpLmNvbnRyb2xzKCkpIHtcbiAgICBpZiAodGhpcy5wbGF5ZXIoKS5wYXVzZWQoKSkge1xuICAgICAgdGhpcy5wbGF5ZXIoKS5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucGxheWVyKCkucGF1c2UoKTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogSGFuZGxlIGEgdGFwIG9uIHRoZSBtZWRpYSBlbGVtZW50LiBCeSBkZWZhdWx0IGl0IHdpbGwgdG9nZ2xlIHRoZSB1c2VyXG4gKiBhY3Rpdml0eSBzdGF0ZSwgd2hpY2ggaGlkZXMgYW5kIHNob3dzIHRoZSBjb250cm9scy5cbiAqL1xuXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUub25UYXAgPSBmdW5jdGlvbigpe1xuICB0aGlzLnBsYXllcigpLnVzZXJBY3RpdmUoIXRoaXMucGxheWVyKCkudXNlckFjdGl2ZSgpKTtcbn07XG5cbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5mZWF0dXJlcyA9IHtcbiAgJ3ZvbHVtZUNvbnRyb2wnOiB0cnVlLFxuXG4gIC8vIFJlc2l6aW5nIHBsdWdpbnMgdXNpbmcgcmVxdWVzdCBmdWxsc2NyZWVuIHJlbG9hZHMgdGhlIHBsdWdpblxuICAnZnVsbHNjcmVlblJlc2l6ZSc6IGZhbHNlLFxuXG4gIC8vIE9wdGlvbmFsIGV2ZW50cyB0aGF0IHdlIGNhbiBtYW51YWxseSBtaW1pYyB3aXRoIHRpbWVyc1xuICAvLyBjdXJyZW50bHkgbm90IHRyaWdnZXJlZCBieSB2aWRlby1qcy1zd2ZcbiAgJ3Byb2dyZXNzRXZlbnRzJzogZmFsc2UsXG4gICd0aW1ldXBkYXRlRXZlbnRzJzogZmFsc2Vcbn07XG5cbnZqcy5tZWRpYSA9IHt9O1xuXG4vKipcbiAqIExpc3Qgb2YgZGVmYXVsdCBBUEkgbWV0aG9kcyBmb3IgYW55IE1lZGlhVGVjaENvbnRyb2xsZXJcbiAqIEB0eXBlIHtTdHJpbmd9XG4gKi9cbnZqcy5tZWRpYS5BcGlNZXRob2RzID0gJ3BsYXkscGF1c2UscGF1c2VkLGN1cnJlbnRUaW1lLHNldEN1cnJlbnRUaW1lLGR1cmF0aW9uLGJ1ZmZlcmVkLHZvbHVtZSxzZXRWb2x1bWUsbXV0ZWQsc2V0TXV0ZWQsd2lkdGgsaGVpZ2h0LHN1cHBvcnRzRnVsbFNjcmVlbixlbnRlckZ1bGxTY3JlZW4sc3JjLGxvYWQsY3VycmVudFNyYyxwcmVsb2FkLHNldFByZWxvYWQsYXV0b3BsYXksc2V0QXV0b3BsYXksbG9vcCxzZXRMb29wLGVycm9yLG5ldHdvcmtTdGF0ZSxyZWFkeVN0YXRlLHNlZWtpbmcsaW5pdGlhbFRpbWUsc3RhcnRPZmZzZXRUaW1lLHBsYXllZCxzZWVrYWJsZSxlbmRlZCx2aWRlb1RyYWNrcyxhdWRpb1RyYWNrcyx2aWRlb1dpZHRoLHZpZGVvSGVpZ2h0LHRleHRUcmFja3MsZGVmYXVsdFBsYXliYWNrUmF0ZSxwbGF5YmFja1JhdGUsbWVkaWFHcm91cCxjb250cm9sbGVyLGNvbnRyb2xzLGRlZmF1bHRNdXRlZCcuc3BsaXQoJywnKTtcbi8vIENyZWF0ZSBwbGFjZWhvbGRlciBtZXRob2RzIGZvciBlYWNoIHRoYXQgd2FybiB3aGVuIGEgbWV0aG9kIGlzbid0IHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBwbGF5YmFjayB0ZWNobm9sb2d5XG5cbmZ1bmN0aW9uIGNyZWF0ZU1ldGhvZChtZXRob2ROYW1lKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCInK21ldGhvZE5hbWUrJ1wiIG1ldGhvZCBpcyBub3QgYXZhaWxhYmxlIG9uIHRoZSBwbGF5YmFjayB0ZWNobm9sb2d5XFwncyBBUEknKTtcbiAgfTtcbn1cblxuZm9yICh2YXIgaSA9IHZqcy5tZWRpYS5BcGlNZXRob2RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gIHZhciBtZXRob2ROYW1lID0gdmpzLm1lZGlhLkFwaU1ldGhvZHNbaV07XG4gIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZVt2anMubWVkaWEuQXBpTWV0aG9kc1tpXV0gPSBjcmVhdGVNZXRob2QobWV0aG9kTmFtZSk7XG59XG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgSFRNTDUgTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIEhUTUw1IE1lZGlhIEFQSVxuICovXG5cbi8qKlxuICogSFRNTDUgTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIEhUTUw1IE1lZGlhIEFQSVxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcbiAqIEBwYXJhbSB7RnVuY3Rpb249fSByZWFkeVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5IdG1sNSA9IHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XG4gICAgLy8gdm9sdW1lIGNhbm5vdCBiZSBjaGFuZ2VkIGZyb20gMSBvbiBpT1NcbiAgICB0aGlzLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPSB2anMuSHRtbDUuY2FuQ29udHJvbFZvbHVtZSgpO1xuXG4gICAgLy8gSW4gaU9TLCBpZiB5b3UgbW92ZSBhIHZpZGVvIGVsZW1lbnQgaW4gdGhlIERPTSwgaXQgYnJlYWtzIHZpZGVvIHBsYXliYWNrLlxuICAgIHRoaXMuZmVhdHVyZXNbJ21vdmluZ01lZGlhRWxlbWVudEluRE9NJ10gPSAhdmpzLklTX0lPUztcblxuICAgIC8vIEhUTUwgdmlkZW8gaXMgYWJsZSB0byBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB3aGVuIGdvaW5nIHRvIGZ1bGxzY3JlZW5cbiAgICB0aGlzLmZlYXR1cmVzWydmdWxsc2NyZWVuUmVzaXplJ10gPSB0cnVlO1xuXG4gICAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcblxuICAgIHZhciBzb3VyY2UgPSBvcHRpb25zWydzb3VyY2UnXTtcblxuICAgIC8vIElmIHRoZSBlbGVtZW50IHNvdXJjZSBpcyBhbHJlYWR5IHNldCwgd2UgbWF5IGhhdmUgbWlzc2VkIHRoZSBsb2Fkc3RhcnQgZXZlbnQsIGFuZCB3YW50IHRvIHRyaWdnZXIgaXQuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzZXQgdGhlIHNvdXJjZSBhZ2FpbiBhbmQgaW50ZXJydXB0IHBsYXliYWNrLlxuICAgIGlmIChzb3VyY2UgJiYgdGhpcy5lbF8uY3VycmVudFNyYyA9PT0gc291cmNlLnNyYyAmJiB0aGlzLmVsXy5uZXR3b3JrU3RhdGUgPiAwKSB7XG4gICAgICBwbGF5ZXIudHJpZ2dlcignbG9hZHN0YXJ0Jyk7XG5cbiAgICAvLyBPdGhlcndpc2Ugc2V0IHRoZSBzb3VyY2UgaWYgb25lIHdhcyBwcm92aWRlZC5cbiAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xuICAgICAgdGhpcy5lbF8uc3JjID0gc291cmNlLnNyYztcbiAgICB9XG5cbiAgICAvLyBEZXRlcm1pbmUgaWYgbmF0aXZlIGNvbnRyb2xzIHNob3VsZCBiZSB1c2VkXG4gICAgLy8gT3VyIGdvYWwgc2hvdWxkIGJlIHRvIGdldCB0aGUgY3VzdG9tIGNvbnRyb2xzIG9uIG1vYmlsZSBzb2xpZCBldmVyeXdoZXJlXG4gICAgLy8gc28gd2UgY2FuIHJlbW92ZSB0aGlzIGFsbCB0b2dldGhlci4gUmlnaHQgbm93IHRoaXMgd2lsbCBibG9jayBjdXN0b21cbiAgICAvLyBjb250cm9scyBvbiB0b3VjaCBlbmFibGVkIGxhcHRvcHMgbGlrZSB0aGUgQ2hyb21lIFBpeGVsXG4gICAgaWYgKHZqcy5UT1VDSF9FTkFCTEVEICYmIHBsYXllci5vcHRpb25zKClbJ25hdGl2ZUNvbnRyb2xzRm9yVG91Y2gnXSAhPT0gZmFsc2UpIHtcbiAgICAgIHRoaXMudXNlTmF0aXZlQ29udHJvbHMoKTtcbiAgICB9XG5cbiAgICAvLyBDaHJvbWUgYW5kIFNhZmFyaSBib3RoIGhhdmUgaXNzdWVzIHdpdGggYXV0b3BsYXkuXG4gICAgLy8gSW4gU2FmYXJpICg1LjEuMSksIHdoZW4gd2UgbW92ZSB0aGUgdmlkZW8gZWxlbWVudCBpbnRvIHRoZSBjb250YWluZXIgZGl2LCBhdXRvcGxheSBkb2Vzbid0IHdvcmsuXG4gICAgLy8gSW4gQ2hyb21lICgxNSksIGlmIHlvdSBoYXZlIGF1dG9wbGF5ICsgYSBwb3N0ZXIgKyBubyBjb250cm9scywgdGhlIHZpZGVvIGdldHMgaGlkZGVuIChidXQgYXVkaW8gcGxheXMpXG4gICAgLy8gVGhpcyBmaXhlcyBib3RoIGlzc3Vlcy4gTmVlZCB0byB3YWl0IGZvciBBUEksIHNvIGl0IHVwZGF0ZXMgZGlzcGxheXMgY29ycmVjdGx5XG4gICAgcGxheWVyLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICBpZiAodGhpcy50YWcgJiYgdGhpcy5vcHRpb25zX1snYXV0b3BsYXknXSAmJiB0aGlzLnBhdXNlZCgpKSB7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnRhZ1sncG9zdGVyJ107IC8vIENocm9tZSBGaXguIEZpeGVkIGluIENocm9tZSB2MTYuXG4gICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5zZXR1cFRyaWdnZXJzKCk7XG4gICAgdGhpcy50cmlnZ2VyUmVhZHkoKTtcbiAgfVxufSk7XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwodGhpcyk7XG59O1xuXG52anMuSHRtbDUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgdmFyIHBsYXllciA9IHRoaXMucGxheWVyXyxcbiAgICAgIC8vIElmIHBvc3NpYmxlLCByZXVzZSBvcmlnaW5hbCB0YWcgZm9yIEhUTUw1IHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudFxuICAgICAgZWwgPSBwbGF5ZXIudGFnLFxuICAgICAgbmV3RWwsXG4gICAgICBjbG9uZTtcblxuICAvLyBDaGVjayBpZiB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgbW92aW5nIHRoZSBlbGVtZW50IGludG8gdGhlIGJveC5cbiAgLy8gT24gdGhlIGlQaG9uZSB2aWRlbyB3aWxsIGJyZWFrIGlmIHlvdSBtb3ZlIHRoZSBlbGVtZW50LFxuICAvLyBTbyB3ZSBoYXZlIHRvIGNyZWF0ZSBhIGJyYW5kIG5ldyBlbGVtZW50LlxuICBpZiAoIWVsIHx8IHRoaXMuZmVhdHVyZXNbJ21vdmluZ01lZGlhRWxlbWVudEluRE9NJ10gPT09IGZhbHNlKSB7XG5cbiAgICAvLyBJZiB0aGUgb3JpZ2luYWwgdGFnIGlzIHN0aWxsIHRoZXJlLCBjbG9uZSBhbmQgcmVtb3ZlIGl0LlxuICAgIGlmIChlbCkge1xuICAgICAgY2xvbmUgPSBlbC5jbG9uZU5vZGUoZmFsc2UpO1xuICAgICAgdmpzLkh0bWw1LmRpc3Bvc2VNZWRpYUVsZW1lbnQoZWwpO1xuICAgICAgZWwgPSBjbG9uZTtcbiAgICAgIHBsYXllci50YWcgPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbCA9IHZqcy5jcmVhdGVFbCgndmlkZW8nLCB7XG4gICAgICAgIGlkOnBsYXllci5pZCgpICsgJ19odG1sNV9hcGknLFxuICAgICAgICBjbGFzc05hbWU6J3Zqcy10ZWNoJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGFzc29jaWF0ZSB0aGUgcGxheWVyIHdpdGggdGhlIG5ldyB0YWdcbiAgICBlbFsncGxheWVyJ10gPSBwbGF5ZXI7XG5cbiAgICB2anMuaW5zZXJ0Rmlyc3QoZWwsIHBsYXllci5lbCgpKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBzcGVjaWZpYyB0YWcgc2V0dGluZ3MsIGluIGNhc2UgdGhleSB3ZXJlIG92ZXJyaWRkZW5cbiAgdmFyIGF0dHJzID0gWydhdXRvcGxheScsJ3ByZWxvYWQnLCdsb29wJywnbXV0ZWQnXTtcbiAgZm9yICh2YXIgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcbiAgICBpZiAocGxheWVyLm9wdGlvbnNfW2F0dHJdICE9PSBudWxsKSB7XG4gICAgICBlbFthdHRyXSA9IHBsYXllci5vcHRpb25zX1thdHRyXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWw7XG4gIC8vIGplbm5paXNhd2Vzb21lID0gdHJ1ZTtcbn07XG5cbi8vIE1ha2UgdmlkZW8gZXZlbnRzIHRyaWdnZXIgcGxheWVyIGV2ZW50c1xuLy8gTWF5IHNlZW0gdmVyYm9zZSBoZXJlLCBidXQgbWFrZXMgb3RoZXIgQVBJcyBwb3NzaWJsZS5cbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0dXBUcmlnZ2VycyA9IGZ1bmN0aW9uKCl7XG4gIGZvciAodmFyIGkgPSB2anMuSHRtbDUuRXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgdmpzLm9uKHRoaXMuZWxfLCB2anMuSHRtbDUuRXZlbnRzW2ldLCB2anMuYmluZCh0aGlzLnBsYXllcl8sIHRoaXMuZXZlbnRIYW5kbGVyKSk7XG4gIH1cbn07XG4vLyBUcmlnZ2VycyByZW1vdmVkIHVzaW5nIHRoaXMub2ZmIHdoZW4gZGlzcG9zZWRcblxudmpzLkh0bWw1LnByb3RvdHlwZS5ldmVudEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcbiAgdGhpcy50cmlnZ2VyKGUpO1xuXG4gIC8vIE5vIG5lZWQgZm9yIG1lZGlhIGV2ZW50cyB0byBidWJibGUgdXAuXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG59O1xuXG52anMuSHRtbDUucHJvdG90eXBlLnVzZU5hdGl2ZUNvbnRyb2xzID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRlY2gsIHBsYXllciwgY29udHJvbHNPbiwgY29udHJvbHNPZmYsIGNsZWFuVXA7XG5cbiAgdGVjaCA9IHRoaXM7XG4gIHBsYXllciA9IHRoaXMucGxheWVyKCk7XG5cbiAgLy8gSWYgdGhlIHBsYXllciBjb250cm9scyBhcmUgZW5hYmxlZCB0dXJuIG9uIHRoZSBuYXRpdmUgY29udHJvbHNcbiAgdGVjaC5zZXRDb250cm9scyhwbGF5ZXIuY29udHJvbHMoKSk7XG5cbiAgLy8gVXBkYXRlIHRoZSBuYXRpdmUgY29udHJvbHMgd2hlbiBwbGF5ZXIgY29udHJvbHMgc3RhdGUgaXMgdXBkYXRlZFxuICBjb250cm9sc09uID0gZnVuY3Rpb24oKXtcbiAgICB0ZWNoLnNldENvbnRyb2xzKHRydWUpO1xuICB9O1xuICBjb250cm9sc09mZiA9IGZ1bmN0aW9uKCl7XG4gICAgdGVjaC5zZXRDb250cm9scyhmYWxzZSk7XG4gIH07XG4gIHBsYXllci5vbignY29udHJvbHNlbmFibGVkJywgY29udHJvbHNPbik7XG4gIHBsYXllci5vbignY29udHJvbHNkaXNhYmxlZCcsIGNvbnRyb2xzT2ZmKTtcblxuICAvLyBDbGVhbiB1cCB3aGVuIG5vdCB1c2luZyBuYXRpdmUgY29udHJvbHMgYW55bW9yZVxuICBjbGVhblVwID0gZnVuY3Rpb24oKXtcbiAgICBwbGF5ZXIub2ZmKCdjb250cm9sc2VuYWJsZWQnLCBjb250cm9sc09uKTtcbiAgICBwbGF5ZXIub2ZmKCdjb250cm9sc2Rpc2FibGVkJywgY29udHJvbHNPZmYpO1xuICB9O1xuICB0ZWNoLm9uKCdkaXNwb3NlJywgY2xlYW5VcCk7XG4gIHBsYXllci5vbigndXNpbmdjdXN0b21jb250cm9scycsIGNsZWFuVXApO1xuXG4gIC8vIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIHBsYXllciB0byB1c2luZyBuYXRpdmUgY29udHJvbHNcbiAgcGxheWVyLnVzaW5nTmF0aXZlQ29udHJvbHModHJ1ZSk7XG59O1xuXG5cbnZqcy5IdG1sNS5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCl7IHRoaXMuZWxfLnBsYXkoKTsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpeyB0aGlzLmVsXy5wYXVzZSgpOyB9O1xudmpzLkh0bWw1LnByb3RvdHlwZS5wYXVzZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ucGF1c2VkOyB9O1xuXG52anMuSHRtbDUucHJvdG90eXBlLmN1cnJlbnRUaW1lID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmN1cnJlbnRUaW1lOyB9O1xudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHNlY29uZHMpe1xuICB0cnkge1xuICAgIHRoaXMuZWxfLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcbiAgfSBjYXRjaChlKSB7XG4gICAgdmpzLmxvZyhlLCAnVmlkZW8gaXMgbm90IHJlYWR5LiAoVmlkZW8uanMpJyk7XG4gICAgLy8gdGhpcy53YXJuaW5nKFZpZGVvSlMud2FybmluZ3MudmlkZW9Ob3RSZWFkeSk7XG4gIH1cbn07XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uZHVyYXRpb24gfHwgMDsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uYnVmZmVyZWQ7IH07XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUudm9sdW1lID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnZvbHVtZTsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0Vm9sdW1lID0gZnVuY3Rpb24ocGVyY2VudEFzRGVjaW1hbCl7IHRoaXMuZWxfLnZvbHVtZSA9IHBlcmNlbnRBc0RlY2ltYWw7IH07XG52anMuSHRtbDUucHJvdG90eXBlLm11dGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLm11dGVkOyB9O1xudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRNdXRlZCA9IGZ1bmN0aW9uKG11dGVkKXsgdGhpcy5lbF8ubXV0ZWQgPSBtdXRlZDsgfTtcblxudmpzLkh0bWw1LnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5vZmZzZXRXaWR0aDsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuaGVpZ2h0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLm9mZnNldEhlaWdodDsgfTtcblxudmpzLkh0bWw1LnByb3RvdHlwZS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xuICBpZiAodHlwZW9mIHRoaXMuZWxfLndlYmtpdEVudGVyRnVsbFNjcmVlbiA9PSAnZnVuY3Rpb24nKSB7XG5cbiAgICAvLyBTZWVtcyB0byBiZSBicm9rZW4gaW4gQ2hyb21pdW0vQ2hyb21lICYmIFNhZmFyaSBpbiBMZW9wYXJkXG4gICAgaWYgKC9BbmRyb2lkLy50ZXN0KHZqcy5VU0VSX0FHRU5UKSB8fCAhL0Nocm9tZXxNYWMgT1MgWCAxMC41Ly50ZXN0KHZqcy5VU0VSX0FHRU5UKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUuZW50ZXJGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcbiAgdmFyIHZpZGVvID0gdGhpcy5lbF87XG4gIGlmICh2aWRlby5wYXVzZWQgJiYgdmlkZW8ubmV0d29ya1N0YXRlIDw9IHZpZGVvLkhBVkVfTUVUQURBVEEpIHtcbiAgICAvLyBhdHRlbXB0IHRvIHByaW1lIHRoZSB2aWRlbyBlbGVtZW50IGZvciBwcm9ncmFtbWF0aWMgYWNjZXNzXG4gICAgLy8gdGhpcyBpc24ndCBuZWNlc3Nhcnkgb24gdGhlIGRlc2t0b3AgYnV0IHNob3VsZG4ndCBodXJ0XG4gICAgdGhpcy5lbF8ucGxheSgpO1xuXG4gICAgLy8gcGxheWluZyBhbmQgcGF1c2luZyBzeW5jaHJvbm91c2x5IGR1cmluZyB0aGUgdHJhbnNpdGlvbiB0byBmdWxsc2NyZWVuXG4gICAgLy8gY2FuIGdldCBpT1MgfjYuMSBkZXZpY2VzIGludG8gYSBwbGF5L3BhdXNlIGxvb3BcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB2aWRlby5wYXVzZSgpO1xuICAgICAgdmlkZW8ud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XG4gICAgfSwgMCk7XG4gIH0gZWxzZSB7XG4gICAgdmlkZW8ud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XG4gIH1cbn07XG52anMuSHRtbDUucHJvdG90eXBlLmV4aXRGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbF8ud2Via2l0RXhpdEZ1bGxTY3JlZW4oKTtcbn07XG52anMuSHRtbDUucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKHNyYyl7IHRoaXMuZWxfLnNyYyA9IHNyYzsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7IHRoaXMuZWxfLmxvYWQoKTsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuY3VycmVudFNyYyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5jdXJyZW50U3JjOyB9O1xuXG52anMuSHRtbDUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ucHJlbG9hZDsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0UHJlbG9hZCA9IGZ1bmN0aW9uKHZhbCl7IHRoaXMuZWxfLnByZWxvYWQgPSB2YWw7IH07XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUuYXV0b3BsYXkgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uYXV0b3BsYXk7IH07XG52anMuSHRtbDUucHJvdG90eXBlLnNldEF1dG9wbGF5ID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8uYXV0b3BsYXkgPSB2YWw7IH07XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUuY29udHJvbHMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uY29udHJvbHM7IH1cbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0Q29udHJvbHMgPSBmdW5jdGlvbih2YWwpeyB0aGlzLmVsXy5jb250cm9scyA9ICEhdmFsOyB9XG5cbnZqcy5IdG1sNS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5sb29wOyB9O1xudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRMb29wID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8ubG9vcCA9IHZhbDsgfTtcblxudmpzLkh0bWw1LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5lcnJvcjsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2Vla2luZyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5zZWVraW5nOyB9O1xudmpzLkh0bWw1LnByb3RvdHlwZS5lbmRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5lbmRlZDsgfTtcbnZqcy5IdG1sNS5wcm90b3R5cGUuZGVmYXVsdE11dGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmRlZmF1bHRNdXRlZDsgfTtcblxuLyogSFRNTDUgU3VwcG9ydCBUZXN0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudmpzLkh0bWw1LmlzU3VwcG9ydGVkID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuICEhdmpzLlRFU1RfVklELmNhblBsYXlUeXBlO1xufTtcblxudmpzLkh0bWw1LmNhblBsYXlTb3VyY2UgPSBmdW5jdGlvbihzcmNPYmope1xuICAvLyBJRTkgb24gV2luZG93cyA3IHdpdGhvdXQgTWVkaWFQbGF5ZXIgdGhyb3dzIGFuIGVycm9yIGhlcmVcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpZGVvanMvdmlkZW8uanMvaXNzdWVzLzUxOVxuICB0cnkge1xuICAgIHJldHVybiAhIXZqcy5URVNUX1ZJRC5jYW5QbGF5VHlwZShzcmNPYmoudHlwZSk7XG4gIH0gY2F0Y2goZSkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICAvLyBUT0RPOiBDaGVjayBUeXBlXG4gIC8vIElmIG5vIFR5cGUsIGNoZWNrIGV4dFxuICAvLyBDaGVjayBNZWRpYSBUeXBlXG59O1xuXG52anMuSHRtbDUuY2FuQ29udHJvbFZvbHVtZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciB2b2x1bWUgPSAgdmpzLlRFU1RfVklELnZvbHVtZTtcbiAgdmpzLlRFU1RfVklELnZvbHVtZSA9ICh2b2x1bWUgLyAyKSArIDAuMTtcbiAgcmV0dXJuIHZvbHVtZSAhPT0gdmpzLlRFU1RfVklELnZvbHVtZTtcbn07XG5cbi8vIExpc3Qgb2YgYWxsIEhUTUw1IGV2ZW50cyAodmFyaW91cyB1c2VzKS5cbnZqcy5IdG1sNS5FdmVudHMgPSAnbG9hZHN0YXJ0LHN1c3BlbmQsYWJvcnQsZXJyb3IsZW1wdGllZCxzdGFsbGVkLGxvYWRlZG1ldGFkYXRhLGxvYWRlZGRhdGEsY2FucGxheSxjYW5wbGF5dGhyb3VnaCxwbGF5aW5nLHdhaXRpbmcsc2Vla2luZyxzZWVrZWQsZW5kZWQsZHVyYXRpb25jaGFuZ2UsdGltZXVwZGF0ZSxwcm9ncmVzcyxwbGF5LHBhdXNlLHJhdGVjaGFuZ2Usdm9sdW1lY2hhbmdlJy5zcGxpdCgnLCcpO1xuXG52anMuSHRtbDUuZGlzcG9zZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKGVsKXtcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cblxuICBlbFsncGxheWVyJ10gPSBudWxsO1xuXG4gIGlmIChlbC5wYXJlbnROb2RlKSB7XG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG4gIH1cblxuICAvLyByZW1vdmUgYW55IGNoaWxkIHRyYWNrIG9yIHNvdXJjZSBub2RlcyB0byBwcmV2ZW50IHRoZWlyIGxvYWRpbmdcbiAgd2hpbGUoZWwuaGFzQ2hpbGROb2RlcygpKSB7XG4gICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XG4gIH1cblxuICAvLyByZW1vdmUgYW55IHNyYyByZWZlcmVuY2UuIG5vdCBzZXR0aW5nIGBzcmM9JydgIGJlY2F1c2UgdGhhdCBjYXVzZXMgYSB3YXJuaW5nXG4gIC8vIGluIGZpcmVmb3hcbiAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcblxuICAvLyBmb3JjZSB0aGUgbWVkaWEgZWxlbWVudCB0byB1cGRhdGUgaXRzIGxvYWRpbmcgc3RhdGUgYnkgY2FsbGluZyBsb2FkKClcbiAgaWYgKHR5cGVvZiBlbC5sb2FkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgZWwubG9hZCgpO1xuICB9XG59O1xuXG4vLyBIVE1MNSBGZWF0dXJlIGRldGVjdGlvbiBhbmQgRGV2aWNlIEZpeGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4gIC8vIE92ZXJyaWRlIEFuZHJvaWQgMi4yIGFuZCBsZXNzIGNhblBsYXlUeXBlIG1ldGhvZCB3aGljaCBpcyBicm9rZW5cbmlmICh2anMuSVNfT0xEX0FORFJPSUQpIHtcbiAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuY2FuUGxheVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcbiAgICByZXR1cm4gKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3ZpZGVvL21wNCcpICE9IC0xKSA/ICdtYXliZScgOiAnJztcbiAgfTtcbn1cbi8qKlxuICogQGZpbGVvdmVydmlldyBWaWRlb0pTLVNXRiAtIEN1c3RvbSBGbGFzaCBQbGF5ZXIgd2l0aCBIVE1MNS1pc2ggQVBJXG4gKiBodHRwczovL2dpdGh1Yi5jb20vemVuY29kZXIvdmlkZW8tanMtc3dmXG4gKiBOb3QgdXNpbmcgc2V0dXBUcmlnZ2Vycy4gVXNpbmcgZ2xvYmFsIG9uRXZlbnQgZnVuYyB0byBkaXN0cmlidXRlIGV2ZW50c1xuICovXG5cbi8qKlxuICogRmxhc2ggTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIGZhbGxiYWNrIFNXRiBBUElcbiAqXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAcGFyYW0ge0Z1bmN0aW9uPX0gcmVhZHlcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuRmxhc2ggPSB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xuICAgIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XG5cbiAgICB2YXIgc291cmNlID0gb3B0aW9uc1snc291cmNlJ10sXG5cbiAgICAgICAgLy8gV2hpY2ggZWxlbWVudCB0byBlbWJlZCBpblxuICAgICAgICBwYXJlbnRFbCA9IG9wdGlvbnNbJ3BhcmVudEVsJ10sXG5cbiAgICAgICAgLy8gQ3JlYXRlIGEgdGVtcG9yYXJ5IGVsZW1lbnQgdG8gYmUgcmVwbGFjZWQgYnkgc3dmIG9iamVjdFxuICAgICAgICBwbGFjZUhvbGRlciA9IHRoaXMuZWxfID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7IGlkOiBwbGF5ZXIuaWQoKSArICdfdGVtcF9mbGFzaCcgfSksXG5cbiAgICAgICAgLy8gR2VuZXJhdGUgSUQgZm9yIHN3ZiBvYmplY3RcbiAgICAgICAgb2JqSWQgPSBwbGF5ZXIuaWQoKSsnX2ZsYXNoX2FwaScsXG5cbiAgICAgICAgLy8gU3RvcmUgcGxheWVyIG9wdGlvbnMgaW4gbG9jYWwgdmFyIGZvciBvcHRpbWl6YXRpb25cbiAgICAgICAgLy8gVE9ETzogc3dpdGNoIHRvIHVzaW5nIHBsYXllciBtZXRob2RzIGluc3RlYWQgb2Ygb3B0aW9uc1xuICAgICAgICAvLyBlLmcuIHBsYXllci5hdXRvcGxheSgpO1xuICAgICAgICBwbGF5ZXJPcHRpb25zID0gcGxheWVyLm9wdGlvbnNfLFxuXG4gICAgICAgIC8vIE1lcmdlIGRlZmF1bHQgZmxhc2h2YXJzIHdpdGggb25lcyBwYXNzZWQgaW4gdG8gaW5pdFxuICAgICAgICBmbGFzaFZhcnMgPSB2anMub2JqLm1lcmdlKHtcblxuICAgICAgICAgIC8vIFNXRiBDYWxsYmFjayBGdW5jdGlvbnNcbiAgICAgICAgICAncmVhZHlGdW5jdGlvbic6ICd2aWRlb2pzLkZsYXNoLm9uUmVhZHknLFxuICAgICAgICAgICdldmVudFByb3h5RnVuY3Rpb24nOiAndmlkZW9qcy5GbGFzaC5vbkV2ZW50JyxcbiAgICAgICAgICAnZXJyb3JFdmVudFByb3h5RnVuY3Rpb24nOiAndmlkZW9qcy5GbGFzaC5vbkVycm9yJyxcblxuICAgICAgICAgIC8vIFBsYXllciBTZXR0aW5nc1xuICAgICAgICAgICdhdXRvcGxheSc6IHBsYXllck9wdGlvbnMuYXV0b3BsYXksXG4gICAgICAgICAgJ3ByZWxvYWQnOiBwbGF5ZXJPcHRpb25zLnByZWxvYWQsXG4gICAgICAgICAgJ2xvb3AnOiBwbGF5ZXJPcHRpb25zLmxvb3AsXG4gICAgICAgICAgJ211dGVkJzogcGxheWVyT3B0aW9ucy5tdXRlZFxuXG4gICAgICAgIH0sIG9wdGlvbnNbJ2ZsYXNoVmFycyddKSxcblxuICAgICAgICAvLyBNZXJnZSBkZWZhdWx0IHBhcmFtZXMgd2l0aCBvbmVzIHBhc3NlZCBpblxuICAgICAgICBwYXJhbXMgPSB2anMub2JqLm1lcmdlKHtcbiAgICAgICAgICAnd21vZGUnOiAnb3BhcXVlJywgLy8gT3BhcXVlIGlzIG5lZWRlZCB0byBvdmVybGF5IGNvbnRyb2xzLCBidXQgY2FuIGFmZmVjdCBwbGF5YmFjayBwZXJmb3JtYW5jZVxuICAgICAgICAgICdiZ2NvbG9yJzogJyMwMDAwMDAnIC8vIFVzaW5nIGJnY29sb3IgcHJldmVudHMgYSB3aGl0ZSBmbGFzaCB3aGVuIHRoZSBvYmplY3QgaXMgbG9hZGluZ1xuICAgICAgICB9LCBvcHRpb25zWydwYXJhbXMnXSksXG5cbiAgICAgICAgLy8gTWVyZ2UgZGVmYXVsdCBhdHRyaWJ1dGVzIHdpdGggb25lcyBwYXNzZWQgaW5cbiAgICAgICAgYXR0cmlidXRlcyA9IHZqcy5vYmoubWVyZ2Uoe1xuICAgICAgICAgICdpZCc6IG9iaklkLFxuICAgICAgICAgICduYW1lJzogb2JqSWQsIC8vIEJvdGggSUQgYW5kIE5hbWUgbmVlZGVkIG9yIHN3ZiB0byBpZGVudGlmdHkgaXRzZWxmXG4gICAgICAgICAgJ2NsYXNzJzogJ3Zqcy10ZWNoJ1xuICAgICAgICB9LCBvcHRpb25zWydhdHRyaWJ1dGVzJ10pXG4gICAgO1xuXG4gICAgLy8gSWYgc291cmNlIHdhcyBzdXBwbGllZCBwYXNzIGFzIGEgZmxhc2ggdmFyLlxuICAgIGlmIChzb3VyY2UpIHtcbiAgICAgIGlmIChzb3VyY2UudHlwZSAmJiB2anMuRmxhc2guaXNTdHJlYW1pbmdUeXBlKHNvdXJjZS50eXBlKSkge1xuICAgICAgICB2YXIgcGFydHMgPSB2anMuRmxhc2guc3RyZWFtVG9QYXJ0cyhzb3VyY2Uuc3JjKTtcbiAgICAgICAgZmxhc2hWYXJzWydydG1wQ29ubmVjdGlvbiddID0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcnRzLmNvbm5lY3Rpb24pO1xuICAgICAgICBmbGFzaFZhcnNbJ3J0bXBTdHJlYW0nXSA9IGVuY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zdHJlYW0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGZsYXNoVmFyc1snc3JjJ10gPSBlbmNvZGVVUklDb21wb25lbnQodmpzLmdldEFic29sdXRlVVJMKHNvdXJjZS5zcmMpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBBZGQgcGxhY2Vob2xkZXIgdG8gcGxheWVyIGRpdlxuICAgIHZqcy5pbnNlcnRGaXJzdChwbGFjZUhvbGRlciwgcGFyZW50RWwpO1xuXG4gICAgLy8gSGF2aW5nIGlzc3VlcyB3aXRoIEZsYXNoIHJlbG9hZGluZyBvbiBjZXJ0YWluIHBhZ2UgYWN0aW9ucyAoaGlkZS9yZXNpemUvZnVsbHNjcmVlbikgaW4gY2VydGFpbiBicm93c2Vyc1xuICAgIC8vIFRoaXMgYWxsb3dzIHJlc2V0dGluZyB0aGUgcGxheWhlYWQgd2hlbiB3ZSBjYXRjaCB0aGUgcmVsb2FkXG4gICAgaWYgKG9wdGlvbnNbJ3N0YXJ0VGltZSddKSB7XG4gICAgICB0aGlzLnJlYWR5KGZ1bmN0aW9uKCl7XG4gICAgICAgIHRoaXMubG9hZCgpO1xuICAgICAgICB0aGlzLnBsYXkoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZShvcHRpb25zWydzdGFydFRpbWUnXSk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBGbGFzaCBpRnJhbWUgTW9kZVxuICAgIC8vIEluIHdlYiBicm93c2VycyB0aGVyZSBhcmUgbXVsdGlwbGUgaW5zdGFuY2VzIHdoZXJlIGNoYW5naW5nIHRoZSBwYXJlbnQgZWxlbWVudCBvciB2aXNpYmlsaXR5IG9mIGEgcGx1Z2luIGNhdXNlcyB0aGUgcGx1Z2luIHRvIHJlbG9hZC5cbiAgICAvLyAtIEZpcmVmb3gganVzdCBhYm91dCBhbHdheXMuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkwMjY4IChtaWdodCBiZSBmaXhlZCBieSB2ZXJzaW9uIDEzKVxuICAgIC8vIC0gV2Via2l0IHdoZW4gaGlkaW5nIHRoZSBwbHVnaW5cbiAgICAvLyAtIFdlYmtpdCBhbmQgRmlyZWZveCB3aGVuIHVzaW5nIHJlcXVlc3RGdWxsU2NyZWVuIG9uIGEgcGFyZW50IGVsZW1lbnRcbiAgICAvLyBMb2FkaW5nIHRoZSBmbGFzaCBwbHVnaW4gaW50byBhIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBpRnJhbWUgZ2V0cyBhcm91bmQgbW9zdCBvZiB0aGVzZSBpc3N1ZXMuXG4gICAgLy8gSXNzdWVzIHRoYXQgcmVtYWluIGluY2x1ZGUgaGlkaW5nIHRoZSBlbGVtZW50IGFuZCByZXF1ZXN0RnVsbFNjcmVlbiBpbiBGaXJlZm94IHNwZWNpZmljYWxseVxuXG4gICAgLy8gVGhlcmUncyBvbiBwYXJ0aWN1bGFybHkgYW5ub3lpbmcgaXNzdWUgd2l0aCB0aGlzIG1ldGhvZCB3aGljaCBpcyB0aGF0IEZpcmVmb3ggdGhyb3dzIGEgc2VjdXJpdHkgZXJyb3Igb24gYW4gb2Zmc2l0ZSBGbGFzaCBvYmplY3QgbG9hZGVkIGludG8gYSBkeW5hbWljYWxseSBjcmVhdGVkIGlGcmFtZS5cbiAgICAvLyBFdmVuIHRob3VnaCB0aGUgaWZyYW1lIHdhcyBpbnNlcnRlZCBpbnRvIGEgcGFnZSBvbiB0aGUgd2ViLCBGaXJlZm94ICsgRmxhc2ggY29uc2lkZXJzIGl0IGEgbG9jYWwgYXBwIHRyeWluZyB0byBhY2Nlc3MgYW4gaW50ZXJuZXQgZmlsZS5cbiAgICAvLyBJIHRyaWVkIG11bGl0cGxlIHdheXMgb2Ygc2V0dGluZyB0aGUgaWZyYW1lIHNyYyBhdHRyaWJ1dGUgYnV0IGNvdWxkbid0IGZpbmQgYSBzcmMgdGhhdCB3b3JrZWQgd2VsbC4gVHJpZWQgYSByZWFsL2Zha2Ugc291cmNlLCBpbi9vdXQgb2YgZG9tYWluLlxuICAgIC8vIEFsc28gdHJpZWQgYSBtZXRob2QgZnJvbSBzdGFja292ZXJmbG93IHRoYXQgY2F1c2VkIGEgc2VjdXJpdHkgZXJyb3IgaW4gYWxsIGJyb3dzZXJzLiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0ODY5MDEvaG93LXRvLXNldC1kb2N1bWVudC1kb21haW4tZm9yLWEtZHluYW1pY2FsbHktZ2VuZXJhdGVkLWlmcmFtZVxuICAgIC8vIEluIHRoZSBlbmQgdGhlIHNvbHV0aW9uIEkgZm91bmQgdG8gd29yayB3YXMgc2V0dGluZyB0aGUgaWZyYW1lIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHJpZ2h0IGJlZm9yZSBkb2luZyBhIGRvY3VtZW50LndyaXRlIG9mIHRoZSBGbGFzaCBvYmplY3QuXG4gICAgLy8gVGhlIG9ubHkgZG93bnNpZGUgb2YgdGhpcyBpdCBzZWVtcyB0byB0cmlnZ2VyIGFub3RoZXIgaHR0cCByZXF1ZXN0IHRvIHRoZSBvcmlnaW5hbCBwYWdlIChubyBtYXR0ZXIgd2hhdCdzIHB1dCBpbiB0aGUgaHJlZikuIE5vdCBzdXJlIHdoeSB0aGF0IGlzLlxuXG4gICAgLy8gTk9URSAoMjAxMi0wMS0yOSk6IENhbm5vdCBnZXQgRmlyZWZveCB0byBsb2FkIHRoZSByZW1vdGUgaG9zdGVkIFNXRiBpbnRvIGEgZHluYW1pY2FsbHkgY3JlYXRlZCBpRnJhbWVcbiAgICAvLyBGaXJlZm94IDkgdGhyb3dzIGEgc2VjdXJpdHkgZXJyb3IsIHVubGVlc3MgeW91IGNhbGwgbG9jYXRpb24uaHJlZiByaWdodCBiZWZvcmUgZG9jLndyaXRlLlxuICAgIC8vICAgIE5vdCBzdXJlIHdoeSB0aGF0IGV2ZW4gd29ya3MsIGJ1dCBpdCBjYXVzZXMgdGhlIGJyb3dzZXIgdG8gbG9vayBsaWtlIGl0J3MgY29udGludW91c2x5IHRyeWluZyB0byBsb2FkIHRoZSBwYWdlLlxuICAgIC8vIEZpcmVmb3ggMy42IGtlZXBzIGNhbGxpbmcgdGhlIGlmcmFtZSBvbmxvYWQgZnVuY3Rpb24gYW55dGltZSBJIHdyaXRlIHRvIGl0LCBjYXVzaW5nIGFuIGVuZGxlc3MgbG9vcC5cblxuICAgIGlmIChvcHRpb25zWydpRnJhbWVNb2RlJ10gPT09IHRydWUgJiYgIXZqcy5JU19GSVJFRk9YKSB7XG5cbiAgICAgIC8vIENyZWF0ZSBpRnJhbWUgd2l0aCB2anMtdGVjaCBjbGFzcyBzbyBpdCdzIDEwMCUgd2lkdGgvaGVpZ2h0XG4gICAgICB2YXIgaUZybSA9IHZqcy5jcmVhdGVFbCgnaWZyYW1lJywge1xuICAgICAgICAnaWQnOiBvYmpJZCArICdfaWZyYW1lJyxcbiAgICAgICAgJ25hbWUnOiBvYmpJZCArICdfaWZyYW1lJyxcbiAgICAgICAgJ2NsYXNzTmFtZSc6ICd2anMtdGVjaCcsXG4gICAgICAgICdzY3JvbGxpbmcnOiAnbm8nLFxuICAgICAgICAnbWFyZ2luV2lkdGgnOiAwLFxuICAgICAgICAnbWFyZ2luSGVpZ2h0JzogMCxcbiAgICAgICAgJ2ZyYW1lQm9yZGVyJzogMFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSByZWFkeSBmdW5jdGlvbiBuYW1lcyBpbiBmbGFzaCB2YXJzIGZvciBpZnJhbWUgd2luZG93XG4gICAgICBmbGFzaFZhcnNbJ3JlYWR5RnVuY3Rpb24nXSA9ICdyZWFkeSc7XG4gICAgICBmbGFzaFZhcnNbJ2V2ZW50UHJveHlGdW5jdGlvbiddID0gJ2V2ZW50cyc7XG4gICAgICBmbGFzaFZhcnNbJ2Vycm9yRXZlbnRQcm94eUZ1bmN0aW9uJ10gPSAnZXJyb3JzJztcblxuICAgICAgLy8gVHJpZWQgbXVsdGlwbGUgbWV0aG9kcyB0byBnZXQgdGhpcyB0byB3b3JrIGluIGFsbCBicm93c2Vyc1xuXG4gICAgICAvLyBUcmllZCBlbWJlZGRpbmcgdGhlIGZsYXNoIG9iamVjdCBpbiB0aGUgcGFnZSBmaXJzdCwgYW5kIHRoZW4gYWRkaW5nIGEgcGxhY2UgaG9sZGVyIHRvIHRoZSBpZnJhbWUsIHRoZW4gcmVwbGFjaW5nIHRoZSBwbGFjZWhvbGRlciB3aXRoIHRoZSBwYWdlIG9iamVjdC5cbiAgICAgIC8vIFRoZSBnb2FsIGhlcmUgd2FzIHRvIHRyeSB0byBsb2FkIHRoZSBzd2YgVVJMIGluIHRoZSBwYXJlbnQgcGFnZSBmaXJzdCBhbmQgaG9wZSB0aGF0IGdvdCBhcm91bmQgdGhlIGZpcmVmb3ggc2VjdXJpdHkgZXJyb3JcbiAgICAgIC8vIHZhciBuZXdPYmogPSB2anMuRmxhc2guZW1iZWQob3B0aW9uc1snc3dmJ10sIHBsYWNlSG9sZGVyLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyk7XG4gICAgICAvLyAoaW4gb25sb2FkKVxuICAgICAgLy8gIHZhciB0ZW1wID0gdmpzLmNyZWF0ZUVsKCdhJywgeyBpZDonYXNkZicsIGlubmVySFRNTDogJ2FzZGYnIH0gKTtcbiAgICAgIC8vICBpRG9jLmJvZHkuYXBwZW5kQ2hpbGQodGVtcCk7XG5cbiAgICAgIC8vIFRyaWVkIGVtYmVkZGluZyB0aGUgZmxhc2ggb2JqZWN0IHRocm91Z2ggamF2YXNjcmlwdCBpbiB0aGUgaWZyYW1lIHNvdXJjZS5cbiAgICAgIC8vIFRoaXMgd29ya3MgaW4gd2Via2l0IGJ1dCBzdGlsbCB0cmlnZ2VycyB0aGUgZmlyZWZveCBzZWN1cml0eSBlcnJvclxuICAgICAgLy8gaUZybS5zcmMgPSAnamF2YXNjcmlwdDogZG9jdW1lbnQud3JpdGUoJ1wiK3Zqcy5GbGFzaC5nZXRFbWJlZENvZGUob3B0aW9uc1snc3dmJ10sIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKStcIicpO1wiO1xuXG4gICAgICAvLyBUcmllZCBhbiBhY3R1YWwgbG9jYWwgaWZyYW1lIGp1c3QgdG8gbWFrZSBzdXJlIHRoYXQgd29ya3MsIGJ1dCBpdCBraWxscyB0aGUgZWFzaW5lc3Mgb2YgdGhlIENETiB2ZXJzaW9uIGlmIHlvdSByZXF1aXJlIHRoZSB1c2VyIHRvIGhvc3QgYW4gaWZyYW1lXG4gICAgICAvLyBXZSBzaG91bGQgYWRkIGFuIG9wdGlvbiB0byBob3N0IHRoZSBpZnJhbWUgbG9jYWxseSB0aG91Z2gsIGJlY2F1c2UgaXQgY291bGQgaGVscCBhIGxvdCBvZiBpc3N1ZXMuXG4gICAgICAvLyBpRnJtLnNyYyA9IFwiaWZyYW1lLmh0bWxcIjtcblxuICAgICAgLy8gV2FpdCB1bnRpbCBpRnJhbWUgaGFzIGxvYWRlZCB0byB3cml0ZSBpbnRvIGl0LlxuICAgICAgdmpzLm9uKGlGcm0sICdsb2FkJywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgaURvYyxcbiAgICAgICAgICAgIGlXaW4gPSBpRnJtLmNvbnRlbnRXaW5kb3c7XG5cbiAgICAgICAgLy8gVGhlIG9uZSB3b3JraW5nIG1ldGhvZCBJIGZvdW5kIHdhcyB0byB1c2UgdGhlIGlmcmFtZSdzIGRvY3VtZW50LndyaXRlKCkgdG8gY3JlYXRlIHRoZSBzd2Ygb2JqZWN0XG4gICAgICAgIC8vIFRoaXMgZ290IGFyb3VuZCB0aGUgc2VjdXJpdHkgaXNzdWUgaW4gYWxsIGJyb3dzZXJzIGV4Y2VwdCBmaXJlZm94LlxuICAgICAgICAvLyBJIGRpZCBmaW5kIGEgaGFjayB3aGVyZSBpZiBJIGNhbGwgdGhlIGlmcmFtZSdzIHdpbmRvdy5sb2NhdGlvbi5ocmVmPScnLCBpdCB3b3VsZCBnZXQgYXJvdW5kIHRoZSBzZWN1cml0eSBlcnJvclxuICAgICAgICAvLyBIb3dldmVyLCB0aGUgbWFpbiBwYWdlIHdvdWxkIGxvb2sgbGlrZSBpdCB3YXMgbG9hZGluZyBpbmRlZmluaXRlbHkgKFVSTCBiYXIgbG9hZGluZyBzcGlubmVyIHdvdWxkIG5ldmVyIHN0b3ApXG4gICAgICAgIC8vIFBsdXMgRmlyZWZveCAzLjYgZGlkbid0IHdvcmsgbm8gbWF0dGVyIHdoYXQgSSB0cmllZC5cbiAgICAgICAgLy8gaWYgKHZqcy5VU0VSX0FHRU5ULm1hdGNoKCdGaXJlZm94JykpIHtcbiAgICAgICAgLy8gICBpV2luLmxvY2F0aW9uLmhyZWYgPSAnJztcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIC8vIEdldCB0aGUgaUZyYW1lJ3MgZG9jdW1lbnQgZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGJyb3dzZXIgc3VwcG9ydHNcbiAgICAgICAgaURvYyA9IGlGcm0uY29udGVudERvY3VtZW50ID8gaUZybS5jb250ZW50RG9jdW1lbnQgOiBpRnJtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG5cbiAgICAgICAgLy8gVHJpZWQgZW5zdXJpbmcgYm90aCBkb2N1bWVudCBkb21haW5zIHdlcmUgdGhlIHNhbWUsIGJ1dCB0aGV5IGFscmVhZHkgd2VyZSwgc28gdGhhdCB3YXNuJ3QgdGhlIGlzc3VlLlxuICAgICAgICAvLyBFdmVuIHRyaWVkIGFkZGluZyAvLiB0aGF0IHdhcyBtZW50aW9uZWQgaW4gYSBicm93c2VyIHNlY3VyaXR5IHdyaXRldXBcbiAgICAgICAgLy8gZG9jdW1lbnQuZG9tYWluID0gZG9jdW1lbnQuZG9tYWluKycvLic7XG4gICAgICAgIC8vIGlEb2MuZG9tYWluID0gZG9jdW1lbnQuZG9tYWluKycvLic7XG5cbiAgICAgICAgLy8gVHJpZWQgYWRkaW5nIHRoZSBvYmplY3QgdG8gdGhlIGlmcmFtZSBkb2MncyBpbm5lckhUTUwuIFNlY3VyaXR5IGVycm9yIGluIGFsbCBicm93c2Vycy5cbiAgICAgICAgLy8gaURvYy5ib2R5LmlubmVySFRNTCA9IHN3Zk9iamVjdEhUTUw7XG5cbiAgICAgICAgLy8gVHJpZWQgYXBwZW5kaW5nIHRoZSBvYmplY3QgdG8gdGhlIGlmcmFtZSBkb2MncyBib2R5LiBTZWN1cml0eSBlcnJvciBpbiBhbGwgYnJvd3NlcnMuXG4gICAgICAgIC8vIGlEb2MuYm9keS5hcHBlbmRDaGlsZChzd2ZPYmplY3QpO1xuXG4gICAgICAgIC8vIFVzaW5nIGRvY3VtZW50LndyaXRlIGFjdHVhbGx5IGdvdCBhcm91bmQgdGhlIHNlY3VyaXR5IGVycm9yIHRoYXQgYnJvd3NlcnMgd2VyZSB0aHJvd2luZy5cbiAgICAgICAgLy8gQWdhaW4sIGl0J3MgYSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgKHNhbWUgZG9tYWluKSBpZnJhbWUsIGxvYWRpbmcgYW4gZXh0ZXJuYWwgRmxhc2ggc3dmLlxuICAgICAgICAvLyBOb3Qgc3VyZSB3aHkgdGhhdCdzIGEgc2VjdXJpdHkgaXNzdWUsIGJ1dCBhcHBhcmVudGx5IGl0IGlzLlxuICAgICAgICBpRG9jLndyaXRlKHZqcy5GbGFzaC5nZXRFbWJlZENvZGUob3B0aW9uc1snc3dmJ10sIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKSk7XG5cbiAgICAgICAgLy8gU2V0dGluZyB2YXJpYWJsZXMgb24gdGhlIHdpbmRvdyBuZWVkcyB0byBjb21lIGFmdGVyIHRoZSBkb2Mgd3JpdGUgYmVjYXVzZSBvdGhlcndpc2UgdGhleSBjYW4gZ2V0IHJlc2V0IGluIHNvbWUgYnJvd3NlcnNcbiAgICAgICAgLy8gU28gZmFyIG5vIGlzc3VlcyB3aXRoIHN3ZiByZWFkeSBldmVudCBiZWluZyBjYWxsZWQgYmVmb3JlIGl0J3Mgc2V0IG9uIHRoZSB3aW5kb3cuXG4gICAgICAgIGlXaW5bJ3BsYXllciddID0gdGhpcy5wbGF5ZXJfO1xuXG4gICAgICAgIC8vIENyZWF0ZSBzd2YgcmVhZHkgZnVuY3Rpb24gZm9yIGlGcmFtZSB3aW5kb3dcbiAgICAgICAgaVdpblsncmVhZHknXSA9IHZqcy5iaW5kKHRoaXMucGxheWVyXywgZnVuY3Rpb24oY3VyclN3Zil7XG4gICAgICAgICAgdmFyIGVsID0gaURvYy5nZXRFbGVtZW50QnlJZChjdXJyU3dmKSxcbiAgICAgICAgICAgICAgcGxheWVyID0gdGhpcyxcbiAgICAgICAgICAgICAgdGVjaCA9IHBsYXllci50ZWNoO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHJlZmVyZW5jZSB0byBwbGF5YmFjayB0ZWNobm9sb2d5IGVsZW1lbnRcbiAgICAgICAgICB0ZWNoLmVsXyA9IGVsO1xuXG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHN3ZiBpcyBhY3R1YWxseSByZWFkeS4gU29tZXRpbWVzIHRoZSBBUEkgaXNuJ3QgYWN0dWFsbHkgeWV0LlxuICAgICAgICAgIHZqcy5GbGFzaC5jaGVja1JlYWR5KHRlY2gpO1xuICAgICAgICB9KTtcblxuICAgICAgICAvLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXIgZm9yIGFsbCBzd2YgZXZlbnRzXG4gICAgICAgIGlXaW5bJ2V2ZW50cyddID0gdmpzLmJpbmQodGhpcy5wbGF5ZXJfLCBmdW5jdGlvbihzd2ZJRCwgZXZlbnROYW1lKXtcbiAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcztcbiAgICAgICAgICBpZiAocGxheWVyICYmIHBsYXllci50ZWNoTmFtZSA9PT0gJ2ZsYXNoJykge1xuICAgICAgICAgICAgcGxheWVyLnRyaWdnZXIoZXZlbnROYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENyZWF0ZSBlcnJvciBsaXN0ZW5lciBmb3IgYWxsIHN3ZiBlcnJvcnNcbiAgICAgICAgaVdpblsnZXJyb3JzJ10gPSB2anMuYmluZCh0aGlzLnBsYXllcl8sIGZ1bmN0aW9uKHN3ZklELCBldmVudE5hbWUpe1xuICAgICAgICAgIHZqcy5sb2coJ0ZsYXNoIEVycm9yJywgZXZlbnROYW1lKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH0pKTtcblxuICAgICAgLy8gUmVwbGFjZSBwbGFjZWhvbGRlciB3aXRoIGlGcmFtZSAoaXQgd2lsbCBsb2FkIG5vdylcbiAgICAgIHBsYWNlSG9sZGVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGlGcm0sIHBsYWNlSG9sZGVyKTtcblxuICAgIC8vIElmIG5vdCB1c2luZyBpRnJhbWUgbW9kZSwgZW1iZWQgYXMgbm9ybWFsIG9iamVjdFxuICAgIH0gZWxzZSB7XG4gICAgICB2anMuRmxhc2guZW1iZWQob3B0aW9uc1snc3dmJ10sIHBsYWNlSG9sZGVyLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyk7XG4gICAgfVxuICB9XG59KTtcblxudmpzLkZsYXNoLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcbiAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcbn07XG5cbnZqcy5GbGFzaC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCl7XG4gIHRoaXMuZWxfLnZqc19wbGF5KCk7XG59O1xuXG52anMuRmxhc2gucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbF8udmpzX3BhdXNlKCk7XG59O1xuXG52anMuRmxhc2gucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKHNyYyl7XG4gIGlmICh2anMuRmxhc2guaXNTdHJlYW1pbmdTcmMoc3JjKSkge1xuICAgIHNyYyA9IHZqcy5GbGFzaC5zdHJlYW1Ub1BhcnRzKHNyYyk7XG4gICAgdGhpcy5zZXRSdG1wQ29ubmVjdGlvbihzcmMuY29ubmVjdGlvbik7XG4gICAgdGhpcy5zZXRSdG1wU3RyZWFtKHNyYy5zdHJlYW0pO1xuICB9XG4gIGVsc2Uge1xuICAgIC8vIE1ha2Ugc3VyZSBzb3VyY2UgVVJMIGlzIGFib3NvbHV0ZS5cbiAgICBzcmMgPSB2anMuZ2V0QWJzb2x1dGVVUkwoc3JjKTtcbiAgICB0aGlzLmVsXy52anNfc3JjKHNyYyk7XG4gIH1cblxuICAvLyBDdXJyZW50bHkgdGhlIFNXRiBkb2Vzbid0IGF1dG9wbGF5IGlmIHlvdSBsb2FkIGEgc291cmNlIGxhdGVyLlxuICAvLyBlLmcuIExvYWQgcGxheWVyIHcvIG5vIHNvdXJjZSwgd2FpdCAycywgc2V0IHNyYy5cbiAgaWYgKHRoaXMucGxheWVyXy5hdXRvcGxheSgpKSB7XG4gICAgdmFyIHRlY2ggPSB0aGlzO1xuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgdGVjaC5wbGF5KCk7IH0sIDApO1xuICB9XG59O1xuXG52anMuRmxhc2gucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbigpe1xuICB2YXIgc3JjID0gdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KCdjdXJyZW50U3JjJyk7XG4gIC8vIG5vIHNyYywgY2hlY2sgYW5kIHNlZSBpZiBSVE1QXG4gIGlmIChzcmMgPT0gbnVsbCkge1xuICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy5ydG1wQ29ubmVjdGlvbigpLFxuICAgICAgICBzdHJlYW0gPSB0aGlzLnJ0bXBTdHJlYW0oKTtcblxuICAgIGlmIChjb25uZWN0aW9uICYmIHN0cmVhbSkge1xuICAgICAgc3JjID0gdmpzLkZsYXNoLnN0cmVhbUZyb21QYXJ0cyhjb25uZWN0aW9uLCBzdHJlYW0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gc3JjO1xufTtcblxudmpzLkZsYXNoLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbF8udmpzX2xvYWQoKTtcbn07XG5cbnZqcy5GbGFzaC5wcm90b3R5cGUucG9zdGVyID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KCdwb3N0ZXInKTtcbn07XG5cbnZqcy5GbGFzaC5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdmpzLmNyZWF0ZVRpbWVSYW5nZSgwLCB0aGlzLmVsXy52anNfZ2V0UHJvcGVydHkoJ2J1ZmZlcmVkJykpO1xufTtcblxudmpzLkZsYXNoLnByb3RvdHlwZS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xuICByZXR1cm4gZmFsc2U7IC8vIEZsYXNoIGRvZXMgbm90IGFsbG93IGZ1bGxzY3JlZW4gdGhyb3VnaCBqYXZhc2NyaXB0XG59O1xuXG52anMuRmxhc2gucHJvdG90eXBlLmVudGVyRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblxuLy8gQ3JlYXRlIHNldHRlcnMgYW5kIGdldHRlcnMgZm9yIGF0dHJpYnV0ZXNcbnZhciBhcGkgPSB2anMuRmxhc2gucHJvdG90eXBlLFxuICAgIHJlYWRXcml0ZSA9ICdydG1wQ29ubmVjdGlvbixydG1wU3RyZWFtLHByZWxvYWQsY3VycmVudFRpbWUsZGVmYXVsdFBsYXliYWNrUmF0ZSxwbGF5YmFja1JhdGUsYXV0b3BsYXksbG9vcCxtZWRpYUdyb3VwLGNvbnRyb2xsZXIsY29udHJvbHMsdm9sdW1lLG11dGVkLGRlZmF1bHRNdXRlZCcuc3BsaXQoJywnKSxcbiAgICByZWFkT25seSA9ICdlcnJvcixjdXJyZW50U3JjLG5ldHdvcmtTdGF0ZSxyZWFkeVN0YXRlLHNlZWtpbmcsaW5pdGlhbFRpbWUsZHVyYXRpb24sc3RhcnRPZmZzZXRUaW1lLHBhdXNlZCxwbGF5ZWQsc2Vla2FibGUsZW5kZWQsdmlkZW9UcmFja3MsYXVkaW9UcmFja3MsdmlkZW9XaWR0aCx2aWRlb0hlaWdodCx0ZXh0VHJhY2tzJy5zcGxpdCgnLCcpO1xuICAgIC8vIE92ZXJyaWRkZW46IGJ1ZmZlcmVkXG5cbi8qKlxuICogQHRoaXMgeyp9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgY3JlYXRlU2V0dGVyID0gZnVuY3Rpb24oYXR0cil7XG4gIHZhciBhdHRyVXBwZXIgPSBhdHRyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYXR0ci5zbGljZSgxKTtcbiAgYXBpWydzZXQnK2F0dHJVcHBlcl0gPSBmdW5jdGlvbih2YWwpeyByZXR1cm4gdGhpcy5lbF8udmpzX3NldFByb3BlcnR5KGF0dHIsIHZhbCk7IH07XG59O1xuXG4vKipcbiAqIEB0aGlzIHsqfVxuICogQHByaXZhdGVcbiAqL1xudmFyIGNyZWF0ZUdldHRlciA9IGZ1bmN0aW9uKGF0dHIpe1xuICBhcGlbYXR0cl0gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KGF0dHIpOyB9O1xufTtcblxuKGZ1bmN0aW9uKCl7XG4gIHZhciBpO1xuICAvLyBDcmVhdGUgZ2V0dGVyIGFuZCBzZXR0ZXJzIGZvciBhbGwgcmVhZC93cml0ZSBhdHRyaWJ1dGVzXG4gIGZvciAoaSA9IDA7IGkgPCByZWFkV3JpdGUubGVuZ3RoOyBpKyspIHtcbiAgICBjcmVhdGVHZXR0ZXIocmVhZFdyaXRlW2ldKTtcbiAgICBjcmVhdGVTZXR0ZXIocmVhZFdyaXRlW2ldKTtcbiAgfVxuXG4gIC8vIENyZWF0ZSBnZXR0ZXJzIGZvciByZWFkLW9ubHkgYXR0cmlidXRlc1xuICBmb3IgKGkgPSAwOyBpIDwgcmVhZE9ubHkubGVuZ3RoOyBpKyspIHtcbiAgICBjcmVhdGVHZXR0ZXIocmVhZE9ubHlbaV0pO1xuICB9XG59KSgpO1xuXG4vKiBGbGFzaCBTdXBwb3J0IFRlc3RpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cblxudmpzLkZsYXNoLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5GbGFzaC52ZXJzaW9uKClbMF0gPj0gMTA7XG4gIC8vIHJldHVybiBzd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKCcxMCcpO1xufTtcblxudmpzLkZsYXNoLmNhblBsYXlTb3VyY2UgPSBmdW5jdGlvbihzcmNPYmope1xuICB2YXIgdHlwZTtcblxuICBpZiAoIXNyY09iai50eXBlKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgdHlwZSA9IHNyY09iai50eXBlLnJlcGxhY2UoLzsuKi8sJycpLnRvTG93ZXJDYXNlKCk7XG4gIGlmICh0eXBlIGluIHZqcy5GbGFzaC5mb3JtYXRzIHx8IHR5cGUgaW4gdmpzLkZsYXNoLnN0cmVhbWluZ0Zvcm1hdHMpIHtcbiAgICByZXR1cm4gJ21heWJlJztcbiAgfVxufTtcblxudmpzLkZsYXNoLmZvcm1hdHMgPSB7XG4gICd2aWRlby9mbHYnOiAnRkxWJyxcbiAgJ3ZpZGVvL3gtZmx2JzogJ0ZMVicsXG4gICd2aWRlby9tcDQnOiAnTVA0JyxcbiAgJ3ZpZGVvL200dic6ICdNUDQnXG59O1xuXG52anMuRmxhc2guc3RyZWFtaW5nRm9ybWF0cyA9IHtcbiAgJ3J0bXAvbXA0JzogJ01QNCcsXG4gICdydG1wL2Zsdic6ICdGTFYnXG59O1xuXG52anMuRmxhc2hbJ29uUmVhZHknXSA9IGZ1bmN0aW9uKGN1cnJTd2Ype1xuICB2YXIgZWwgPSB2anMuZWwoY3VyclN3Zik7XG5cbiAgLy8gR2V0IHBsYXllciBmcm9tIGJveFxuICAvLyBPbiBmaXJlZm94IHJlbG9hZHMsIGVsIG1pZ2h0IGFscmVhZHkgaGF2ZSBhIHBsYXllclxuICB2YXIgcGxheWVyID0gZWxbJ3BsYXllciddIHx8IGVsLnBhcmVudE5vZGVbJ3BsYXllciddLFxuICAgICAgdGVjaCA9IHBsYXllci50ZWNoO1xuXG4gIC8vIFJlZmVyZW5jZSBwbGF5ZXIgb24gdGVjaCBlbGVtZW50XG4gIGVsWydwbGF5ZXInXSA9IHBsYXllcjtcblxuICAvLyBVcGRhdGUgcmVmZXJlbmNlIHRvIHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudFxuICB0ZWNoLmVsXyA9IGVsO1xuXG4gIHZqcy5GbGFzaC5jaGVja1JlYWR5KHRlY2gpO1xufTtcblxuLy8gVGhlIFNXRiBpc24ndCBhbHdhc3kgcmVhZHkgd2hlbiBpdCBzYXlzIGl0IGlzLiBTb21ldGltZXMgdGhlIEFQSSBmdW5jdGlvbnMgc3RpbGwgbmVlZCB0byBiZSBhZGRlZCB0byB0aGUgb2JqZWN0LlxuLy8gSWYgaXQncyBub3QgcmVhZHksIHdlIHNldCBhIHRpbWVvdXQgdG8gY2hlY2sgYWdhaW4gc2hvcnRseS5cbnZqcy5GbGFzaC5jaGVja1JlYWR5ID0gZnVuY3Rpb24odGVjaCl7XG5cbiAgLy8gQ2hlY2sgaWYgQVBJIHByb3BlcnR5IGV4aXN0c1xuICBpZiAodGVjaC5lbCgpLnZqc19nZXRQcm9wZXJ0eSkge1xuXG4gICAgLy8gSWYgc28sIHRlbGwgdGVjaCBpdCdzIHJlYWR5XG4gICAgdGVjaC50cmlnZ2VyUmVhZHkoKTtcblxuICAvLyBPdGhlcndpc2Ugd2FpdCBsb25nZXIuXG4gIH0gZWxzZSB7XG5cbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICB2anMuRmxhc2guY2hlY2tSZWFkeSh0ZWNoKTtcbiAgICB9LCA1MCk7XG5cbiAgfVxufTtcblxuLy8gVHJpZ2dlciBldmVudHMgZnJvbSB0aGUgc3dmIG9uIHRoZSBwbGF5ZXJcbnZqcy5GbGFzaFsnb25FdmVudCddID0gZnVuY3Rpb24oc3dmSUQsIGV2ZW50TmFtZSl7XG4gIHZhciBwbGF5ZXIgPSB2anMuZWwoc3dmSUQpWydwbGF5ZXInXTtcbiAgcGxheWVyLnRyaWdnZXIoZXZlbnROYW1lKTtcbn07XG5cbi8vIExvZyBlcnJvcnMgZnJvbSB0aGUgc3dmXG52anMuRmxhc2hbJ29uRXJyb3InXSA9IGZ1bmN0aW9uKHN3ZklELCBlcnIpe1xuICB2YXIgcGxheWVyID0gdmpzLmVsKHN3ZklEKVsncGxheWVyJ107XG4gIHBsYXllci50cmlnZ2VyKCdlcnJvcicpO1xuICB2anMubG9nKCdGbGFzaCBFcnJvcicsIGVyciwgc3dmSUQpO1xufTtcblxuLy8gRmxhc2ggVmVyc2lvbiBDaGVja1xudmpzLkZsYXNoLnZlcnNpb24gPSBmdW5jdGlvbigpe1xuICB2YXIgdmVyc2lvbiA9ICcwLDAsMCc7XG5cbiAgLy8gSUVcbiAgdHJ5IHtcbiAgICB2ZXJzaW9uID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpLkdldFZhcmlhYmxlKCckdmVyc2lvbicpLnJlcGxhY2UoL1xcRCsvZywgJywnKS5tYXRjaCgvXiw/KC4rKSw/JC8pWzFdO1xuXG4gIC8vIG90aGVyIGJyb3dzZXJzXG4gIH0gY2F0Y2goZSkge1xuICAgIHRyeSB7XG4gICAgICBpZiAobmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXS5lbmFibGVkUGx1Z2luKXtcbiAgICAgICAgdmVyc2lvbiA9IChuYXZpZ2F0b3IucGx1Z2luc1snU2hvY2t3YXZlIEZsYXNoIDIuMCddIHx8IG5hdmlnYXRvci5wbHVnaW5zWydTaG9ja3dhdmUgRmxhc2gnXSkuZGVzY3JpcHRpb24ucmVwbGFjZSgvXFxEKy9nLCAnLCcpLm1hdGNoKC9eLD8oLispLD8kLylbMV07XG4gICAgICB9XG4gICAgfSBjYXRjaChlcnIpIHt9XG4gIH1cbiAgcmV0dXJuIHZlcnNpb24uc3BsaXQoJywnKTtcbn07XG5cbi8vIEZsYXNoIGVtYmVkZGluZyBtZXRob2QuIE9ubHkgdXNlZCBpbiBub24taWZyYW1lIG1vZGVcbnZqcy5GbGFzaC5lbWJlZCA9IGZ1bmN0aW9uKHN3ZiwgcGxhY2VIb2xkZXIsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKXtcbiAgdmFyIGNvZGUgPSB2anMuRmxhc2guZ2V0RW1iZWRDb2RlKHN3ZiwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpLFxuXG4gICAgICAvLyBHZXQgZWxlbWVudCBieSBlbWJlZGRpbmcgY29kZSBhbmQgcmV0cmlldmluZyBjcmVhdGVkIGVsZW1lbnRcbiAgICAgIG9iaiA9IHZqcy5jcmVhdGVFbCgnZGl2JywgeyBpbm5lckhUTUw6IGNvZGUgfSkuY2hpbGROb2Rlc1swXSxcblxuICAgICAgcGFyID0gcGxhY2VIb2xkZXIucGFyZW50Tm9kZVxuICA7XG5cbiAgcGxhY2VIb2xkZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob2JqLCBwbGFjZUhvbGRlcik7XG5cbiAgLy8gSUU2IHNlZW1zIHRvIGhhdmUgYW4gaXNzdWUgd2hlcmUgaXQgd29uJ3QgaW5pdGlhbGl6ZSB0aGUgc3dmIG9iamVjdCBhZnRlciBpbmplY3RpbmcgaXQuXG4gIC8vIFRoaXMgaXMgYSBkdW1iIGZpeFxuICB2YXIgbmV3T2JqID0gcGFyLmNoaWxkTm9kZXNbMF07XG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICBuZXdPYmouc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gIH0sIDEwMDApO1xuXG4gIHJldHVybiBvYmo7XG5cbn07XG5cbnZqcy5GbGFzaC5nZXRFbWJlZENvZGUgPSBmdW5jdGlvbihzd2YsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKXtcblxuICB2YXIgb2JqVGFnID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCInLFxuICAgICAgZmxhc2hWYXJzU3RyaW5nID0gJycsXG4gICAgICBwYXJhbXNTdHJpbmcgPSAnJyxcbiAgICAgIGF0dHJzU3RyaW5nID0gJyc7XG5cbiAgLy8gQ29udmVydCBmbGFzaCB2YXJzIHRvIHN0cmluZ1xuICBpZiAoZmxhc2hWYXJzKSB7XG4gICAgdmpzLm9iai5lYWNoKGZsYXNoVmFycywgZnVuY3Rpb24oa2V5LCB2YWwpe1xuICAgICAgZmxhc2hWYXJzU3RyaW5nICs9IChrZXkgKyAnPScgKyB2YWwgKyAnJmFtcDsnKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFkZCBzd2YsIGZsYXNoVmFycywgYW5kIG90aGVyIGRlZmF1bHQgcGFyYW1zXG4gIHBhcmFtcyA9IHZqcy5vYmoubWVyZ2Uoe1xuICAgICdtb3ZpZSc6IHN3ZixcbiAgICAnZmxhc2h2YXJzJzogZmxhc2hWYXJzU3RyaW5nLFxuICAgICdhbGxvd1NjcmlwdEFjY2Vzcyc6ICdhbHdheXMnLCAvLyBSZXF1aXJlZCB0byB0YWxrIHRvIHN3ZlxuICAgICdhbGxvd05ldHdvcmtpbmcnOiAnYWxsJyAvLyBBbGwgc2hvdWxkIGJlIGRlZmF1bHQsIGJ1dCBoYXZpbmcgc2VjdXJpdHkgaXNzdWVzLlxuICB9LCBwYXJhbXMpO1xuXG4gIC8vIENyZWF0ZSBwYXJhbSB0YWdzIHN0cmluZ1xuICB2anMub2JqLmVhY2gocGFyYW1zLCBmdW5jdGlvbihrZXksIHZhbCl7XG4gICAgcGFyYW1zU3RyaW5nICs9ICc8cGFyYW0gbmFtZT1cIicra2V5KydcIiB2YWx1ZT1cIicrdmFsKydcIiAvPic7XG4gIH0pO1xuXG4gIGF0dHJpYnV0ZXMgPSB2anMub2JqLm1lcmdlKHtcbiAgICAvLyBBZGQgc3dmIHRvIGF0dHJpYnV0ZXMgKG5lZWQgYm90aCBmb3IgSUUgYW5kIE90aGVycyB0byB3b3JrKVxuICAgICdkYXRhJzogc3dmLFxuXG4gICAgLy8gRGVmYXVsdCB0byAxMDAlIHdpZHRoL2hlaWdodFxuICAgICd3aWR0aCc6ICcxMDAlJyxcbiAgICAnaGVpZ2h0JzogJzEwMCUnXG5cbiAgfSwgYXR0cmlidXRlcyk7XG5cbiAgLy8gQ3JlYXRlIEF0dHJpYnV0ZXMgc3RyaW5nXG4gIHZqcy5vYmouZWFjaChhdHRyaWJ1dGVzLCBmdW5jdGlvbihrZXksIHZhbCl7XG4gICAgYXR0cnNTdHJpbmcgKz0gKGtleSArICc9XCInICsgdmFsICsgJ1wiICcpO1xuICB9KTtcblxuICByZXR1cm4gb2JqVGFnICsgYXR0cnNTdHJpbmcgKyAnPicgKyBwYXJhbXNTdHJpbmcgKyAnPC9vYmplY3Q+Jztcbn07XG5cbnZqcy5GbGFzaC5zdHJlYW1Gcm9tUGFydHMgPSBmdW5jdGlvbihjb25uZWN0aW9uLCBzdHJlYW0pIHtcbiAgcmV0dXJuIGNvbm5lY3Rpb24gKyAnJicgKyBzdHJlYW07XG59O1xuXG52anMuRmxhc2guc3RyZWFtVG9QYXJ0cyA9IGZ1bmN0aW9uKHNyYykge1xuICB2YXIgcGFydHMgPSB7XG4gICAgY29ubmVjdGlvbjogJycsXG4gICAgc3RyZWFtOiAnJ1xuICB9O1xuXG4gIGlmICghIHNyYykge1xuICAgIHJldHVybiBwYXJ0cztcbiAgfVxuXG4gIC8vIExvb2sgZm9yIHRoZSBub3JtYWwgVVJMIHNlcGFyYXRvciB3ZSBleHBlY3QsICcmJy5cbiAgLy8gSWYgZm91bmQsIHdlIHNwbGl0IHRoZSBVUkwgaW50byB0d28gcGllY2VzIGFyb3VuZCB0aGVcbiAgLy8gZmlyc3QgJyYnLlxuICB2YXIgY29ubkVuZCA9IHNyYy5pbmRleE9mKCcmJyk7XG4gIHZhciBzdHJlYW1CZWdpbjtcbiAgaWYgKGNvbm5FbmQgIT09IC0xKSB7XG4gICAgc3RyZWFtQmVnaW4gPSBjb25uRW5kICsgMTtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBJZiB0aGVyZSdzIG5vdCBhICcmJywgd2UgdXNlIHRoZSBsYXN0ICcvJyBhcyB0aGUgZGVsaW1pdGVyLlxuICAgIGNvbm5FbmQgPSBzdHJlYW1CZWdpbiA9IHNyYy5sYXN0SW5kZXhPZignLycpICsgMTtcbiAgICBpZiAoY29ubkVuZCA9PT0gMCkge1xuICAgICAgLy8gcmVhbGx5LCB0aGVyZSdzIG5vdCBhICcvJz9cbiAgICAgIGNvbm5FbmQgPSBzdHJlYW1CZWdpbiA9IHNyYy5sZW5ndGg7XG4gICAgfVxuICB9XG4gIHBhcnRzLmNvbm5lY3Rpb24gPSBzcmMuc3Vic3RyaW5nKDAsIGNvbm5FbmQpO1xuICBwYXJ0cy5zdHJlYW0gPSBzcmMuc3Vic3RyaW5nKHN0cmVhbUJlZ2luLCBzcmMubGVuZ3RoKTtcblxuICByZXR1cm4gcGFydHM7XG59O1xuXG52anMuRmxhc2guaXNTdHJlYW1pbmdUeXBlID0gZnVuY3Rpb24oc3JjVHlwZSkge1xuICByZXR1cm4gc3JjVHlwZSBpbiB2anMuRmxhc2guc3RyZWFtaW5nRm9ybWF0cztcbn07XG5cbi8vIFJUTVAgaGFzIGZvdXIgdmFyaWF0aW9ucywgYW55IHN0cmluZyBzdGFydGluZ1xuLy8gd2l0aCBvbmUgb2YgdGhlc2UgcHJvdG9jb2xzIHNob3VsZCBiZSB2YWxpZFxudmpzLkZsYXNoLlJUTVBfUkUgPSAvXnJ0bXBbc2V0XT86XFwvXFwvL2k7XG5cbnZqcy5GbGFzaC5pc1N0cmVhbWluZ1NyYyA9IGZ1bmN0aW9uKHNyYykge1xuICByZXR1cm4gdmpzLkZsYXNoLlJUTVBfUkUudGVzdChzcmMpO1xufTtcbi8qKlxuICogVGhlIE1lZGlhIExvYWRlciBpcyB0aGUgY29tcG9uZW50IHRoYXQgZGVjaWRlcyB3aGljaCBwbGF5YmFjayB0ZWNobm9sb2d5IHRvIGxvYWRcbiAqIHdoZW4gdGhlIHBsYXllciBpcyBpbml0aWFsaXplZC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLk1lZGlhTG9hZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBzb3VyY2VzIHdoZW4gdGhlIHBsYXllciBpcyBpbml0aWFsaXplZCxcbiAgICAvLyBsb2FkIHRoZSBmaXJzdCBzdXBwb3J0ZWQgcGxheWJhY2sgdGVjaG5vbG9neS5cbiAgICBpZiAoIXBsYXllci5vcHRpb25zX1snc291cmNlcyddIHx8IHBsYXllci5vcHRpb25zX1snc291cmNlcyddLmxlbmd0aCA9PT0gMCkge1xuICAgICAgZm9yICh2YXIgaT0wLGo9cGxheWVyLm9wdGlvbnNfWyd0ZWNoT3JkZXInXTsgaTxqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ZWNoTmFtZSA9IHZqcy5jYXBpdGFsaXplKGpbaV0pLFxuICAgICAgICAgICAgdGVjaCA9IHdpbmRvd1sndmlkZW9qcyddW3RlY2hOYW1lXTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHRlY2hub2xvZ3lcbiAgICAgICAgaWYgKHRlY2ggJiYgdGVjaC5pc1N1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgcGxheWVyLmxvYWRUZWNoKHRlY2hOYW1lKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyAvLyBMb29wIHRocm91Z2ggcGxheWJhY2sgdGVjaG5vbG9naWVzIChIVE1MNSwgRmxhc2gpIGFuZCBjaGVjayBmb3Igc3VwcG9ydC5cbiAgICAgIC8vIC8vIFRoZW4gbG9hZCB0aGUgYmVzdCBzb3VyY2UuXG4gICAgICAvLyAvLyBBIGZldyBhc3N1bXB0aW9ucyBoZXJlOlxuICAgICAgLy8gLy8gICBBbGwgcGxheWJhY2sgdGVjaG5vbG9naWVzIHJlc3BlY3QgcHJlbG9hZCBmYWxzZS5cbiAgICAgIHBsYXllci5zcmMocGxheWVyLm9wdGlvbnNfWydzb3VyY2VzJ10pO1xuICAgIH1cbiAgfVxufSk7XG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgVGV4dCBUcmFja3NcbiAqIFRleHQgdHJhY2tzIGFyZSB0cmFja3Mgb2YgdGltZWQgdGV4dCBldmVudHMuXG4gKiBDYXB0aW9ucyAtIHRleHQgZGlzcGxheWVkIG92ZXIgdGhlIHZpZGVvIGZvciB0aGUgaGVhcmluZyBpbXBhcmVkXG4gKiBTdWJ0aXRsZXMgLSB0ZXh0IGRpc3BsYXllZCBvdmVyIHRoZSB2aWRlbyBmb3IgdGhvc2Ugd2hvIGRvbid0IHVuZGVyc3RhbmQgbGFuZ2F1Z2UgaW4gdGhlIHZpZGVvXG4gKiBDaGFwdGVycyAtIHRleHQgZGlzcGxheWVkIGluIGEgbWVudSBhbGxvd2luZyB0aGUgdXNlciB0byBqdW1wIHRvIHBhcnRpY3VsYXIgcG9pbnRzIChjaGFwdGVycykgaW4gdGhlIHZpZGVvXG4gKiBEZXNjcmlwdGlvbnMgKG5vdCBzdXBwb3J0ZWQgeWV0KSAtIGF1ZGlvIGRlc2NyaXB0aW9ucyB0aGF0IGFyZSByZWFkIGJhY2sgdG8gdGhlIHVzZXIgYnkgYSBzY3JlZW4gcmVhZGluZyBkZXZpY2VcbiAqL1xuXG4vLyBQbGF5ZXIgQWRkaXRpb25zIC0gRnVuY3Rpb25zIGFkZCB0byB0aGUgcGxheWVyIG9iamVjdCBmb3IgZWFzaWVyIGFjY2VzcyB0byB0cmFja3NcblxuLyoqXG4gKiBMaXN0IG9mIGFzc29jaWF0ZWQgdGV4dCB0cmFja3NcbiAqIEB0eXBlIHtBcnJheX1cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRleHRUcmFja3NfO1xuXG4vKipcbiAqIEdldCBhbiBhcnJheSBvZiBhc3NvY2lhdGVkIHRleHQgdHJhY2tzLiBjYXB0aW9ucywgc3VidGl0bGVzLCBjaGFwdGVycywgZGVzY3JpcHRpb25zXG4gKiBodHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9lbWJlZGRlZC1jb250ZW50LTAuaHRtbCNkb20tbWVkaWEtdGV4dHRyYWNrc1xuICogQHJldHVybiB7QXJyYXl9ICAgICAgICAgICBBcnJheSBvZiB0cmFjayBvYmplY3RzXG4gKiBAcHJpdmF0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS50ZXh0VHJhY2tzID0gZnVuY3Rpb24oKXtcbiAgdGhpcy50ZXh0VHJhY2tzXyA9IHRoaXMudGV4dFRyYWNrc18gfHwgW107XG4gIHJldHVybiB0aGlzLnRleHRUcmFja3NfO1xufTtcblxuLyoqXG4gKiBBZGQgYSB0ZXh0IHRyYWNrXG4gKiBJbiBhZGRpdGlvbiB0byB0aGUgVzNDIHNldHRpbmdzIHdlIGFsbG93IGFkZGluZyBhZGRpdGlvbmFsIGluZm8gdGhyb3VnaCBvcHRpb25zLlxuICogaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvZW1iZWRkZWQtY29udGVudC0wLmh0bWwjZG9tLW1lZGlhLWFkZHRleHR0cmFja1xuICogQHBhcmFtIHtTdHJpbmd9ICBraW5kICAgICAgICBDYXB0aW9ucywgc3VidGl0bGVzLCBjaGFwdGVycywgZGVzY3JpcHRpb25zLCBvciBtZXRhZGF0YVxuICogQHBhcmFtIHtTdHJpbmc9fSBsYWJlbCAgICAgICBPcHRpb25hbCBsYWJlbFxuICogQHBhcmFtIHtTdHJpbmc9fSBsYW5ndWFnZSAgICBPcHRpb25hbCBsYW5ndWFnZVxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zICAgICBBZGRpdGlvbmFsIHRyYWNrIG9wdGlvbnMsIGxpa2Ugc3JjXG4gKiBAcHJpdmF0ZVxuICovXG52anMuUGxheWVyLnByb3RvdHlwZS5hZGRUZXh0VHJhY2sgPSBmdW5jdGlvbihraW5kLCBsYWJlbCwgbGFuZ3VhZ2UsIG9wdGlvbnMpe1xuICB2YXIgdHJhY2tzID0gdGhpcy50ZXh0VHJhY2tzXyA9IHRoaXMudGV4dFRyYWNrc18gfHwgW107XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIG9wdGlvbnNbJ2tpbmQnXSA9IGtpbmQ7XG4gIG9wdGlvbnNbJ2xhYmVsJ10gPSBsYWJlbDtcbiAgb3B0aW9uc1snbGFuZ3VhZ2UnXSA9IGxhbmd1YWdlO1xuXG4gIC8vIEhUTUw1IFNwZWMgc2F5cyBkZWZhdWx0IHRvIHN1YnRpdGxlcy5cbiAgLy8gVXBwZXJjYXNlIGZpcnN0IGxldHRlciB0byBtYXRjaCBjbGFzcyBuYW1lc1xuICB2YXIgS2luZCA9IHZqcy5jYXBpdGFsaXplKGtpbmQgfHwgJ3N1YnRpdGxlcycpO1xuXG4gIC8vIENyZWF0ZSBjb3JyZWN0IHRleHR0cmFjayBjbGFzcy4gQ2FwdGlvbnNUcmFjaywgZXRjLlxuICB2YXIgdHJhY2sgPSBuZXcgd2luZG93Wyd2aWRlb2pzJ11bS2luZCArICdUcmFjayddKHRoaXMsIG9wdGlvbnMpO1xuXG4gIHRyYWNrcy5wdXNoKHRyYWNrKTtcblxuICAvLyBJZiB0cmFjay5kZmx0KCkgaXMgc2V0LCBzdGFydCBzaG93aW5nIGltbWVkaWF0ZWx5XG4gIC8vIFRPRE86IEFkZCBhIHByb2Nlc3MgdG8gZGV0ZXJpbWUgdGhlIGJlc3QgdHJhY2sgdG8gc2hvdyBmb3IgdGhlIHNwZWNpZmljIGtpbmRcbiAgLy8gSW5jYXNlIHRoZXJlIGFyZSBtdWxpdHBsZSBkZWZhdWx0ZWQgdHJhY2tzIG9mIHRoZSBzYW1lIGtpbmRcbiAgLy8gT3IgdGhlIHVzZXIgaGFzIGEgc2V0IHByZWZlcmVuY2Ugb2YgYSBzcGVjaWZpYyBsYW5ndWFnZSB0aGF0IHNob3VsZCBvdmVycmlkZSB0aGUgZGVmYXVsdFxuICAvLyBpZiAodHJhY2suZGZsdCgpKSB7XG4gIC8vICAgdGhpcy5yZWFkeSh2anMuYmluZCh0cmFjaywgdHJhY2suc2hvdykpO1xuICAvLyB9XG5cbiAgcmV0dXJuIHRyYWNrO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gYXJyYXkgb2YgdGV4dCB0cmFja3MuIGNhcHRpb25zLCBzdWJ0aXRsZXMsIGNoYXB0ZXJzLCBkZXNjcmlwdGlvbnNcbiAqIFRyYWNrIG9iamVjdHMgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIHBsYXllci50ZXh0VHJhY2tzKCkgYXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IHRyYWNrTGlzdCBBcnJheSBvZiB0cmFjayBlbGVtZW50cyBvciBvYmplY3RzIChmYWtlIHRyYWNrIGVsZW1lbnRzKVxuICogQHByaXZhdGVcbiAqL1xudmpzLlBsYXllci5wcm90b3R5cGUuYWRkVGV4dFRyYWNrcyA9IGZ1bmN0aW9uKHRyYWNrTGlzdCl7XG4gIHZhciB0cmFja09iajtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrTGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHRyYWNrT2JqID0gdHJhY2tMaXN0W2ldO1xuICAgIHRoaXMuYWRkVGV4dFRyYWNrKHRyYWNrT2JqWydraW5kJ10sIHRyYWNrT2JqWydsYWJlbCddLCB0cmFja09ialsnbGFuZ3VhZ2UnXSwgdHJhY2tPYmopO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBTaG93IGEgdGV4dCB0cmFja1xuLy8gZGlzYWJsZVNhbWVLaW5kOiBkaXNhYmxlIGFsbCBvdGhlciB0cmFja3Mgb2YgdGhlIHNhbWUga2luZC4gVmFsdWUgc2hvdWxkIGJlIGEgdHJhY2sga2luZCAoY2FwdGlvbnMsIGV0Yy4pXG52anMuUGxheWVyLnByb3RvdHlwZS5zaG93VGV4dFRyYWNrID0gZnVuY3Rpb24oaWQsIGRpc2FibGVTYW1lS2luZCl7XG4gIHZhciB0cmFja3MgPSB0aGlzLnRleHRUcmFja3NfLFxuICAgICAgaSA9IDAsXG4gICAgICBqID0gdHJhY2tzLmxlbmd0aCxcbiAgICAgIHRyYWNrLCBzaG93VHJhY2ssIGtpbmQ7XG5cbiAgLy8gRmluZCBUcmFjayB3aXRoIHNhbWUgSURcbiAgZm9yICg7aTxqO2krKykge1xuICAgIHRyYWNrID0gdHJhY2tzW2ldO1xuICAgIGlmICh0cmFjay5pZCgpID09PSBpZCkge1xuICAgICAgdHJhY2suc2hvdygpO1xuICAgICAgc2hvd1RyYWNrID0gdHJhY2s7XG5cbiAgICAvLyBEaXNhYmxlIHRyYWNrcyBvZiB0aGUgc2FtZSBraW5kXG4gICAgfSBlbHNlIGlmIChkaXNhYmxlU2FtZUtpbmQgJiYgdHJhY2sua2luZCgpID09IGRpc2FibGVTYW1lS2luZCAmJiB0cmFjay5tb2RlKCkgPiAwKSB7XG4gICAgICB0cmFjay5kaXNhYmxlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gR2V0IHRyYWNrIGtpbmQgZnJvbSBzaG93biB0cmFjayBvciBkaXNhYmxlU2FtZUtpbmRcbiAga2luZCA9IChzaG93VHJhY2spID8gc2hvd1RyYWNrLmtpbmQoKSA6ICgoZGlzYWJsZVNhbWVLaW5kKSA/IGRpc2FibGVTYW1lS2luZCA6IGZhbHNlKTtcblxuICAvLyBUcmlnZ2VyIHRyYWNrY2hhbmdlIGV2ZW50LCBjYXB0aW9uc3RyYWNrY2hhbmdlLCBzdWJ0aXRsZXN0cmFja2NoYW5nZSwgZXRjLlxuICBpZiAoa2luZCkge1xuICAgIHRoaXMudHJpZ2dlcihraW5kKyd0cmFja2NoYW5nZScpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBhbGwgdGV4dCB0cmFja3NcbiAqXG4gKiBIYW5kbGVzIHRoZSBwYXJzaW5nLCBoaWRpbmcsIGFuZCBzaG93aW5nIG9mIHRleHQgdHJhY2sgY3Vlc1xuICpcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLlRleHRUcmFjayA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuXG4gICAgLy8gQXBwbHkgdHJhY2sgaW5mbyB0byB0cmFjayBvYmplY3RcbiAgICAvLyBPcHRpb25zIHdpbGwgb2Z0ZW4gYmUgYSB0cmFjayBlbGVtZW50XG5cbiAgICAvLyBCdWlsZCBJRCBpZiBvbmUgZG9lc24ndCBleGlzdFxuICAgIHRoaXMuaWRfID0gb3B0aW9uc1snaWQnXSB8fCAoJ3Zqc18nICsgb3B0aW9uc1sna2luZCddICsgJ18nICsgb3B0aW9uc1snbGFuZ3VhZ2UnXSArICdfJyArIHZqcy5ndWlkKyspO1xuICAgIHRoaXMuc3JjXyA9IG9wdGlvbnNbJ3NyYyddO1xuICAgIC8vICdkZWZhdWx0JyBpcyBhIHJlc2VydmVkIGtleXdvcmQgaW4ganMgc28gd2UgdXNlIGFuIGFiYnJldmlhdGVkIHZlcnNpb25cbiAgICB0aGlzLmRmbHRfID0gb3B0aW9uc1snZGVmYXVsdCddIHx8IG9wdGlvbnNbJ2RmbHQnXTtcbiAgICB0aGlzLnRpdGxlXyA9IG9wdGlvbnNbJ3RpdGxlJ107XG4gICAgdGhpcy5sYW5ndWFnZV8gPSBvcHRpb25zWydzcmNsYW5nJ107XG4gICAgdGhpcy5sYWJlbF8gPSBvcHRpb25zWydsYWJlbCddO1xuICAgIHRoaXMuY3Vlc18gPSBbXTtcbiAgICB0aGlzLmFjdGl2ZUN1ZXNfID0gW107XG4gICAgdGhpcy5yZWFkeVN0YXRlXyA9IDA7XG4gICAgdGhpcy5tb2RlXyA9IDA7XG5cbiAgICB0aGlzLnBsYXllcl8ub24oJ2Z1bGxzY3JlZW5jaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLmFkanVzdEZvbnRTaXplKSk7XG4gIH1cbn0pO1xuXG4vKipcbiAqIFRyYWNrIGtpbmQgdmFsdWUuIENhcHRpb25zLCBzdWJ0aXRsZXMsIGV0Yy5cbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmtpbmRfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sga2luZCB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5raW5kID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMua2luZF87XG59O1xuXG4vKipcbiAqIFRyYWNrIHNyYyB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUuc3JjXztcblxuLyoqXG4gKiBHZXQgdGhlIHRyYWNrIHNyYyB2YWx1ZVxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy5zcmNfO1xufTtcblxuLyoqXG4gKiBUcmFjayBkZWZhdWx0IHZhbHVlXG4gKiBJZiBkZWZhdWx0IGlzIHVzZWQsIHN1YnRpdGxlcy9jYXB0aW9ucyB0byBzdGFydCBzaG93aW5nXG4gKiBAcHJpdmF0ZVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5kZmx0XztcblxuLyoqXG4gKiBHZXQgdGhlIHRyYWNrIGRlZmF1bHQgdmFsdWUuICgnZGVmYXVsdCcgaXMgYSByZXNlcnZlZCBrZXl3b3JkKVxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGZsdCA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmRmbHRfO1xufTtcblxuLyoqXG4gKiBUcmFjayB0aXRsZSB2YWx1ZVxuICogQHByaXZhdGVcbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUudGl0bGVfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sgdGl0bGUgdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUudGl0bGUgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy50aXRsZV87XG59O1xuXG4vKipcbiAqIExhbmd1YWdlIC0gdHdvIGxldHRlciBzdHJpbmcgdG8gcmVwcmVzZW50IHRyYWNrIGxhbmd1YWdlLCBlLmcuICdlbicgZm9yIEVuZ2xpc2hcbiAqIFNwZWMgZGVmOiByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nIGxhbmd1YWdlO1xuICogQHByaXZhdGVcbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFuZ3VhZ2VfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sgbGFuZ3VhZ2UgdmFsdWVcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy5sYW5ndWFnZV87XG59O1xuXG4vKipcbiAqIFRyYWNrIGxhYmVsIGUuZy4gJ0VuZ2xpc2gnXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyBsYWJlbDtcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhYmVsXztcblxuLyoqXG4gKiBHZXQgdGhlIHRyYWNrIGxhYmVsIHZhbHVlXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhYmVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMubGFiZWxfO1xufTtcblxuLyoqXG4gKiBBbGwgY3VlcyBvZiB0aGUgdHJhY2suIEN1ZXMgaGF2ZSBhIHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCwgYW5kIG90aGVyIHByb3BlcnRpZXMuXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIFRleHRUcmFja0N1ZUxpc3QgY3VlcztcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmN1ZXNfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sgY3Vlc1xuICogQHJldHVybiB7QXJyYXl9XG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmN1ZXMgPSBmdW5jdGlvbigpe1xuICByZXR1cm4gdGhpcy5jdWVzXztcbn07XG5cbi8qKlxuICogQWN0aXZlQ3VlcyBpcyBhbGwgY3VlcyB0aGF0IGFyZSBjdXJyZW50bHkgc2hvd2luZ1xuICogU3BlYyBkZWY6IHJlYWRvbmx5IGF0dHJpYnV0ZSBUZXh0VHJhY2tDdWVMaXN0IGFjdGl2ZUN1ZXM7XG4gKiBAcHJpdmF0ZVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5hY3RpdmVDdWVzXztcblxuLyoqXG4gKiBHZXQgdGhlIHRyYWNrIGFjdGl2ZSBjdWVzXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUuYWN0aXZlQ3VlcyA9IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0aGlzLmFjdGl2ZUN1ZXNfO1xufTtcblxuLyoqXG4gKiBSZWFkeVN0YXRlIGRlc2NyaWJlcyBpZiB0aGUgdGV4dCBmaWxlIGhhcyBiZWVuIGxvYWRlZFxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgTk9ORSA9IDA7XG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBMT0FESU5HID0gMTtcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IExPQURFRCA9IDI7XG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBFUlJPUiA9IDM7XG4gKiByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgc2hvcnQgcmVhZHlTdGF0ZTtcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnJlYWR5U3RhdGVfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sgcmVhZHlTdGF0ZVxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5yZWFkeVN0YXRlID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZV87XG59O1xuXG4vKipcbiAqIE1vZGUgZGVzY3JpYmVzIGlmIHRoZSB0cmFjayBpcyBzaG93aW5nLCBoaWRkZW4sIG9yIGRpc2FibGVkXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBPRkYgPSAwO1xuICogY29uc3QgdW5zaWduZWQgc2hvcnQgSElEREVOID0gMTsgKHN0aWxsIHRyaWdnZXJpbmcgY3VlY2hhbmdlIGV2ZW50cywgYnV0IG5vdCB2aXNpYmxlKVxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgU0hPV0lORyA9IDI7XG4gKiBhdHRyaWJ1dGUgdW5zaWduZWQgc2hvcnQgbW9kZTtcbiAqIEBwcml2YXRlXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLm1vZGVfO1xuXG4vKipcbiAqIEdldCB0aGUgdHJhY2sgbW9kZVxuICogQHJldHVybiB7TnVtYmVyfVxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5tb2RlID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRoaXMubW9kZV87XG59O1xuXG4vKipcbiAqIENoYW5nZSB0aGUgZm9udCBzaXplIG9mIHRoZSB0ZXh0IHRyYWNrIHRvIG1ha2UgaXQgbGFyZ2VyIHdoZW4gcGxheWluZyBpbiBmdWxsc2NyZWVuIG1vZGVcbiAqIGFuZCByZXN0b3JlIGl0IHRvIGl0cyBub3JtYWwgc2l6ZSB3aGVuIG5vdCBpbiBmdWxsc2NyZWVuIG1vZGUuXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFkanVzdEZvbnRTaXplID0gZnVuY3Rpb24oKXtcbiAgICBpZiAodGhpcy5wbGF5ZXJfLmlzRnVsbFNjcmVlbikge1xuICAgICAgICAvLyBTY2FsZSB0aGUgZm9udCBieSB0aGUgc2FtZSBmYWN0b3IgYXMgaW5jcmVhc2luZyB0aGUgdmlkZW8gd2lkdGggdG8gdGhlIGZ1bGwgc2NyZWVuIHdpbmRvdyB3aWR0aC5cbiAgICAgICAgLy8gQWRkaXRpb25hbGx5LCBtdWx0aXBseSB0aGF0IGZhY3RvciBieSAxLjQsIHdoaWNoIGlzIHRoZSBkZWZhdWx0IGZvbnQgc2l6ZSBmb3JcbiAgICAgICAgLy8gdGhlIGNhcHRpb24gdHJhY2sgKGZyb20gdGhlIENTUylcbiAgICAgICAgdGhpcy5lbF8uc3R5bGUuZm9udFNpemUgPSBzY3JlZW4ud2lkdGggLyB0aGlzLnBsYXllcl8ud2lkdGgoKSAqIDEuNCAqIDEwMCArICclJztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBDaGFuZ2UgdGhlIGZvbnQgc2l6ZSBvZiB0aGUgdGV4dCB0cmFjayBiYWNrIHRvIGl0cyBvcmlnaW5hbCBub24tZnVsbHNjcmVlbiBzaXplXG4gICAgICAgIHRoaXMuZWxfLnN0eWxlLmZvbnRTaXplID0gJyc7XG4gICAgfVxufTtcblxuLyoqXG4gKiBDcmVhdGUgYmFzaWMgZGl2IHRvIGhvbGQgY3VlIHRleHRcbiAqIEByZXR1cm4ge0VsZW1lbnR9XG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtJyArIHRoaXMua2luZF8gKyAnIHZqcy10ZXh0LXRyYWNrJ1xuICB9KTtcbn07XG5cbi8qKlxuICogU2hvdzogTW9kZSBTaG93aW5nICgyKVxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgYWN0aXZlLiBJZiBubyBhdHRlbXB0IGhhcyB5ZXQgYmVlbiBtYWRlIHRvIG9idGFpbiB0aGUgdHJhY2sncyBjdWVzLCB0aGUgdXNlciBhZ2VudCB3aWxsIHBlcmZvcm0gc3VjaCBhbiBhdHRlbXB0IG1vbWVudGFyaWx5LlxuICogVGhlIHVzZXIgYWdlbnQgaXMgbWFpbnRhaW5pbmcgYSBsaXN0IG9mIHdoaWNoIGN1ZXMgYXJlIGFjdGl2ZSwgYW5kIGV2ZW50cyBhcmUgYmVpbmcgZmlyZWQgYWNjb3JkaW5nbHkuXG4gKiBJbiBhZGRpdGlvbiwgZm9yIHRleHQgdHJhY2tzIHdob3NlIGtpbmQgaXMgc3VidGl0bGVzIG9yIGNhcHRpb25zLCB0aGUgY3VlcyBhcmUgYmVpbmcgZGlzcGxheWVkIG92ZXIgdGhlIHZpZGVvIGFzIGFwcHJvcHJpYXRlO1xuICogZm9yIHRleHQgdHJhY2tzIHdob3NlIGtpbmQgaXMgZGVzY3JpcHRpb25zLCB0aGUgdXNlciBhZ2VudCBpcyBtYWtpbmcgdGhlIGN1ZXMgYXZhaWxhYmxlIHRvIHRoZSB1c2VyIGluIGEgbm9uLXZpc3VhbCBmYXNoaW9uO1xuICogYW5kIGZvciB0ZXh0IHRyYWNrcyB3aG9zZSBraW5kIGlzIGNoYXB0ZXJzLCB0aGUgdXNlciBhZ2VudCBpcyBtYWtpbmcgYXZhaWxhYmxlIHRvIHRoZSB1c2VyIGEgbWVjaGFuaXNtIGJ5IHdoaWNoIHRoZSB1c2VyIGNhbiBuYXZpZ2F0ZSB0byBhbnkgcG9pbnQgaW4gdGhlIG1lZGlhIHJlc291cmNlIGJ5IHNlbGVjdGluZyBhIGN1ZS5cbiAqIFRoZSBzaG93aW5nIGJ5IGRlZmF1bHQgc3RhdGUgaXMgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZSBvbiB0cmFjayBlbGVtZW50cyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB0ZXh0IHRyYWNrIHdhcyBlbmFibGVkIGR1ZSB0byB0aGF0IGF0dHJpYnV0ZS5cbiAqIFRoaXMgYWxsb3dzIHRoZSB1c2VyIGFnZW50IHRvIG92ZXJyaWRlIHRoZSBzdGF0ZSBpZiBhIGxhdGVyIHRyYWNrIGlzIGRpc2NvdmVyZWQgdGhhdCBpcyBtb3JlIGFwcHJvcHJpYXRlIHBlciB0aGUgdXNlcidzIHByZWZlcmVuY2VzLlxuICovXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5hY3RpdmF0ZSgpO1xuXG4gIHRoaXMubW9kZV8gPSAyO1xuXG4gIC8vIFNob3cgZWxlbWVudC5cbiAgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuc2hvdy5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBIaWRlOiBNb2RlIEhpZGRlbiAoMSlcbiAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGFjdGl2ZSwgYnV0IHRoYXQgdGhlIHVzZXIgYWdlbnQgaXMgbm90IGFjdGl2ZWx5IGRpc3BsYXlpbmcgdGhlIGN1ZXMuXG4gKiBJZiBubyBhdHRlbXB0IGhhcyB5ZXQgYmVlbiBtYWRlIHRvIG9idGFpbiB0aGUgdHJhY2sncyBjdWVzLCB0aGUgdXNlciBhZ2VudCB3aWxsIHBlcmZvcm0gc3VjaCBhbiBhdHRlbXB0IG1vbWVudGFyaWx5LlxuICogVGhlIHVzZXIgYWdlbnQgaXMgbWFpbnRhaW5pbmcgYSBsaXN0IG9mIHdoaWNoIGN1ZXMgYXJlIGFjdGl2ZSwgYW5kIGV2ZW50cyBhcmUgYmVpbmcgZmlyZWQgYWNjb3JkaW5nbHkuXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xuICAvLyBXaGVuIGhpZGRlbiwgY3VlcyBhcmUgc3RpbGwgdHJpZ2dlcmVkLiBEaXNhYmxlIHRvIHN0b3AgdHJpZ2dlcmluZy5cbiAgdGhpcy5hY3RpdmF0ZSgpO1xuXG4gIHRoaXMubW9kZV8gPSAxO1xuXG4gIC8vIEhpZGUgZWxlbWVudC5cbiAgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaGlkZS5jYWxsKHRoaXMpO1xufTtcblxuLyoqXG4gKiBEaXNhYmxlOiBNb2RlIE9mZi9EaXNhYmxlICgwKVxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgbm90IGFjdGl2ZS4gT3RoZXIgdGhhbiBmb3IgdGhlIHB1cnBvc2VzIG9mIGV4cG9zaW5nIHRoZSB0cmFjayBpbiB0aGUgRE9NLCB0aGUgdXNlciBhZ2VudCBpcyBpZ25vcmluZyB0aGUgdGV4dCB0cmFjay5cbiAqIE5vIGN1ZXMgYXJlIGFjdGl2ZSwgbm8gZXZlbnRzIGFyZSBmaXJlZCwgYW5kIHRoZSB1c2VyIGFnZW50IHdpbGwgbm90IGF0dGVtcHQgdG8gb2J0YWluIHRoZSB0cmFjaydzIGN1ZXMuXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpe1xuICAvLyBJZiBzaG93aW5nLCBoaWRlLlxuICBpZiAodGhpcy5tb2RlXyA9PSAyKSB7IHRoaXMuaGlkZSgpOyB9XG5cbiAgLy8gU3RvcCB0cmlnZ2VyaW5nIGN1ZXNcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XG5cbiAgLy8gU3dpdGNoIE1vZGUgdG8gT2ZmXG4gIHRoaXMubW9kZV8gPSAwO1xufTtcblxuLyoqXG4gKiBUdXJuIG9uIGN1ZSB0cmFja2luZy4gVHJhY2tzIHRoYXQgYXJlIHNob3dpbmcgT1IgaGlkZGVuIGFyZSBhY3RpdmUuXG4gKi9cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKXtcbiAgLy8gTG9hZCB0ZXh0IGZpbGUgaWYgaXQgaGFzbid0IGJlZW4geWV0LlxuICBpZiAodGhpcy5yZWFkeVN0YXRlXyA9PT0gMCkgeyB0aGlzLmxvYWQoKTsgfVxuXG4gIC8vIE9ubHkgYWN0aXZhdGUgaWYgbm90IGFscmVhZHkgYWN0aXZlLlxuICBpZiAodGhpcy5tb2RlXyA9PT0gMCkge1xuICAgIC8vIFVwZGF0ZSBjdXJyZW50IGN1ZSBvbiB0aW1ldXBkYXRlXG4gICAgLy8gVXNpbmcgdW5pcXVlIElEIGZvciBiaW5kIGZ1bmN0aW9uIHNvIG90aGVyIHRyYWNrcyBkb24ndCByZW1vdmUgbGlzdGVuZXJcbiAgICB0aGlzLnBsYXllcl8ub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSwgdGhpcy5pZF8pKTtcblxuICAgIC8vIFJlc2V0IGN1ZSB0aW1lIG9uIG1lZGlhIGVuZFxuICAgIHRoaXMucGxheWVyXy5vbignZW5kZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnJlc2V0LCB0aGlzLmlkXykpO1xuXG4gICAgLy8gQWRkIHRvIGRpc3BsYXlcbiAgICBpZiAodGhpcy5raW5kXyA9PT0gJ2NhcHRpb25zJyB8fCB0aGlzLmtpbmRfID09PSAnc3VidGl0bGVzJykge1xuICAgICAgdGhpcy5wbGF5ZXJfLmdldENoaWxkKCd0ZXh0VHJhY2tEaXNwbGF5JykuYWRkQ2hpbGQodGhpcyk7XG4gICAgfVxuICB9XG59O1xuXG4vKipcbiAqIFR1cm4gb2ZmIGN1ZSB0cmFja2luZy5cbiAqL1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCl7XG4gIC8vIFVzaW5nIHVuaXF1ZSBJRCBmb3IgYmluZCBmdW5jdGlvbiBzbyBvdGhlciB0cmFja3MgZG9uJ3QgcmVtb3ZlIGxpc3RlbmVyXG4gIHRoaXMucGxheWVyXy5vZmYoJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSwgdGhpcy5pZF8pKTtcbiAgdGhpcy5wbGF5ZXJfLm9mZignZW5kZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnJlc2V0LCB0aGlzLmlkXykpO1xuICB0aGlzLnJlc2V0KCk7IC8vIFJlc2V0XG5cbiAgLy8gUmVtb3ZlIGZyb20gZGlzcGxheVxuICB0aGlzLnBsYXllcl8uZ2V0Q2hpbGQoJ3RleHRUcmFja0Rpc3BsYXknKS5yZW1vdmVDaGlsZCh0aGlzKTtcbn07XG5cbi8vIEEgcmVhZGluZXNzIHN0YXRlXG4vLyBPbmUgb2YgdGhlIGZvbGxvd2luZzpcbi8vXG4vLyBOb3QgbG9hZGVkXG4vLyBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBrbm93biB0byBleGlzdCAoZS5nLiBpdCBoYXMgYmVlbiBkZWNsYXJlZCB3aXRoIGEgdHJhY2sgZWxlbWVudCksIGJ1dCBpdHMgY3VlcyBoYXZlIG5vdCBiZWVuIG9idGFpbmVkLlxuLy9cbi8vIExvYWRpbmdcbi8vIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGxvYWRpbmcgYW5kIHRoZXJlIGhhdmUgYmVlbiBubyBmYXRhbCBlcnJvcnMgZW5jb3VudGVyZWQgc28gZmFyLiBGdXJ0aGVyIGN1ZXMgbWlnaHQgc3RpbGwgYmUgYWRkZWQgdG8gdGhlIHRyYWNrLlxuLy9cbi8vIExvYWRlZFxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaGFzIGJlZW4gbG9hZGVkIHdpdGggbm8gZmF0YWwgZXJyb3JzLiBObyBuZXcgY3VlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSB0cmFjayBleGNlcHQgaWYgdGhlIHRleHQgdHJhY2sgY29ycmVzcG9uZHMgdG8gYSBNdXRhYmxlVGV4dFRyYWNrIG9iamVjdC5cbi8vXG4vLyBGYWlsZWQgdG8gbG9hZFxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgd2FzIGVuYWJsZWQsIGJ1dCB3aGVuIHRoZSB1c2VyIGFnZW50IGF0dGVtcHRlZCB0byBvYnRhaW4gaXQsIHRoaXMgZmFpbGVkIGluIHNvbWUgd2F5IChlLmcuIFVSTCBjb3VsZCBub3QgYmUgcmVzb2x2ZWQsIG5ldHdvcmsgZXJyb3IsIHVua25vd24gdGV4dCB0cmFjayBmb3JtYXQpLiBTb21lIG9yIGFsbCBvZiB0aGUgY3VlcyBhcmUgbGlrZWx5IG1pc3NpbmcgYW5kIHdpbGwgbm90IGJlIG9idGFpbmVkLlxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7XG5cbiAgLy8gT25seSBsb2FkIGlmIG5vdCBsb2FkZWQgeWV0LlxuICBpZiAodGhpcy5yZWFkeVN0YXRlXyA9PT0gMCkge1xuICAgIHRoaXMucmVhZHlTdGF0ZV8gPSAxO1xuICAgIHZqcy5nZXQodGhpcy5zcmNfLCB2anMuYmluZCh0aGlzLCB0aGlzLnBhcnNlQ3VlcyksIHZqcy5iaW5kKHRoaXMsIHRoaXMub25FcnJvcikpO1xuICB9XG5cbn07XG5cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIpe1xuICB0aGlzLmVycm9yID0gZXJyO1xuICB0aGlzLnJlYWR5U3RhdGVfID0gMztcbiAgdGhpcy50cmlnZ2VyKCdlcnJvcicpO1xufTtcblxuLy8gUGFyc2UgdGhlIFdlYlZUVCB0ZXh0IGZvcm1hdCBmb3IgY3VlIHRpbWVzLlxuLy8gVE9ETzogU2VwYXJhdGUgcGFyc2VyIGludG8gb3duIGNsYXNzIHNvIGFsdGVybmF0aXZlIHRpbWVkIHRleHQgZm9ybWF0cyBjYW4gYmUgdXNlZC4gKFRUTUwsIERGWFApXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5wYXJzZUN1ZXMgPSBmdW5jdGlvbihzcmNDb250ZW50KSB7XG4gIHZhciBjdWUsIHRpbWUsIHRleHQsXG4gICAgICBsaW5lcyA9IHNyY0NvbnRlbnQuc3BsaXQoJ1xcbicpLFxuICAgICAgbGluZSA9ICcnLCBpZDtcblxuICBmb3IgKHZhciBpPTEsIGo9bGluZXMubGVuZ3RoOyBpPGo7IGkrKykge1xuICAgIC8vIExpbmUgMCBzaG91bGQgYmUgJ1dFQlZUVCcsIHNvIHNraXBwaW5nIGk9MFxuXG4gICAgbGluZSA9IHZqcy50cmltKGxpbmVzW2ldKTsgLy8gVHJpbSB3aGl0ZXNwYWNlIGFuZCBsaW5lYnJlYWtzXG5cbiAgICBpZiAobGluZSkgeyAvLyBMb29wIHVudGlsIGEgbGluZSB3aXRoIGNvbnRlbnRcblxuICAgICAgLy8gRmlyc3QgbGluZSBjb3VsZCBiZSBhbiBvcHRpb25hbCBjdWUgSURcbiAgICAgIC8vIENoZWNrIGlmIGxpbmUgaGFzIHRoZSB0aW1lIHNlcGFyYXRvclxuICAgICAgaWYgKGxpbmUuaW5kZXhPZignLS0+JykgPT0gLTEpIHtcbiAgICAgICAgaWQgPSBsaW5lO1xuICAgICAgICAvLyBBZHZhbmNlIHRvIG5leHQgbGluZSBmb3IgdGltaW5nLlxuICAgICAgICBsaW5lID0gdmpzLnRyaW0obGluZXNbKytpXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9IHRoaXMuY3Vlc18ubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICAvLyBGaXJzdCBsaW5lIC0gTnVtYmVyXG4gICAgICBjdWUgPSB7XG4gICAgICAgIGlkOiBpZCwgLy8gQ3VlIE51bWJlclxuICAgICAgICBpbmRleDogdGhpcy5jdWVzXy5sZW5ndGggLy8gUG9zaXRpb24gaW4gQXJyYXlcbiAgICAgIH07XG5cbiAgICAgIC8vIFRpbWluZyBsaW5lXG4gICAgICB0aW1lID0gbGluZS5zcGxpdCgnIC0tPiAnKTtcbiAgICAgIGN1ZS5zdGFydFRpbWUgPSB0aGlzLnBhcnNlQ3VlVGltZSh0aW1lWzBdKTtcbiAgICAgIGN1ZS5lbmRUaW1lID0gdGhpcy5wYXJzZUN1ZVRpbWUodGltZVsxXSk7XG5cbiAgICAgIC8vIEFkZGl0aW9uYWwgbGluZXMgLSBDdWUgVGV4dFxuICAgICAgdGV4dCA9IFtdO1xuXG4gICAgICAvLyBMb29wIHVudGlsIGEgYmxhbmsgbGluZSBvciBlbmQgb2YgbGluZXNcbiAgICAgIC8vIEFzc3VtZWluZyB0cmltKCcnKSByZXR1cm5zIGZhbHNlIGZvciBibGFuayBsaW5lc1xuICAgICAgd2hpbGUgKGxpbmVzWysraV0gJiYgKGxpbmUgPSB2anMudHJpbShsaW5lc1tpXSkpKSB7XG4gICAgICAgIHRleHQucHVzaChsaW5lKTtcbiAgICAgIH1cblxuICAgICAgY3VlLnRleHQgPSB0ZXh0LmpvaW4oJzxici8+Jyk7XG5cbiAgICAgIC8vIEFkZCB0aGlzIGN1ZVxuICAgICAgdGhpcy5jdWVzXy5wdXNoKGN1ZSk7XG4gICAgfVxuICB9XG5cbiAgdGhpcy5yZWFkeVN0YXRlXyA9IDI7XG4gIHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XG59O1xuXG5cbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnBhcnNlQ3VlVGltZSA9IGZ1bmN0aW9uKHRpbWVUZXh0KSB7XG4gIHZhciBwYXJ0cyA9IHRpbWVUZXh0LnNwbGl0KCc6JyksXG4gICAgICB0aW1lID0gMCxcbiAgICAgIGhvdXJzLCBtaW51dGVzLCBvdGhlciwgc2Vjb25kcywgbXM7XG5cbiAgLy8gQ2hlY2sgaWYgb3B0aW9uYWwgaG91cnMgcGxhY2UgaXMgaW5jbHVkZWRcbiAgLy8gMDA6MDA6MDAuMDAwIHZzLiAwMDowMC4wMDBcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PSAzKSB7XG4gICAgaG91cnMgPSBwYXJ0c1swXTtcbiAgICBtaW51dGVzID0gcGFydHNbMV07XG4gICAgb3RoZXIgPSBwYXJ0c1syXTtcbiAgfSBlbHNlIHtcbiAgICBob3VycyA9IDA7XG4gICAgbWludXRlcyA9IHBhcnRzWzBdO1xuICAgIG90aGVyID0gcGFydHNbMV07XG4gIH1cblxuICAvLyBCcmVhayBvdGhlciAoc2Vjb25kcywgbWlsbGlzZWNvbmRzLCBhbmQgZmxhZ3MpIGJ5IHNwYWNlc1xuICAvLyBUT0RPOiBNYWtlIGFkZGl0aW9uYWwgY3VlIGxheW91dCBzZXR0aW5ncyB3b3JrIHdpdGggZmxhZ3NcbiAgb3RoZXIgPSBvdGhlci5zcGxpdCgvXFxzKy8pO1xuICAvLyBSZW1vdmUgc2Vjb25kcy4gU2Vjb25kcyBpcyB0aGUgZmlyc3QgcGFydCBiZWZvcmUgYW55IHNwYWNlcy5cbiAgc2Vjb25kcyA9IG90aGVyLnNwbGljZSgwLDEpWzBdO1xuICAvLyBDb3VsZCB1c2UgZWl0aGVyIC4gb3IgLCBmb3IgZGVjaW1hbFxuICBzZWNvbmRzID0gc2Vjb25kcy5zcGxpdCgvXFwufCwvKTtcbiAgLy8gR2V0IG1pbGxpc2Vjb25kc1xuICBtcyA9IHBhcnNlRmxvYXQoc2Vjb25kc1sxXSk7XG4gIHNlY29uZHMgPSBzZWNvbmRzWzBdO1xuXG4gIC8vIGhvdXJzID0+IHNlY29uZHNcbiAgdGltZSArPSBwYXJzZUZsb2F0KGhvdXJzKSAqIDM2MDA7XG4gIC8vIG1pbnV0ZXMgPT4gc2Vjb25kc1xuICB0aW1lICs9IHBhcnNlRmxvYXQobWludXRlcykgKiA2MDtcbiAgLy8gQWRkIHNlY29uZHNcbiAgdGltZSArPSBwYXJzZUZsb2F0KHNlY29uZHMpO1xuICAvLyBBZGQgbWlsbGlzZWNvbmRzXG4gIGlmIChtcykgeyB0aW1lICs9IG1zLzEwMDA7IH1cblxuICByZXR1cm4gdGltZTtcbn07XG5cbi8vIFVwZGF0ZSBhY3RpdmUgY3VlcyB3aGVuZXZlciB0aW1ldXBkYXRlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIG9uIHRoZSBwbGF5ZXIuXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xuICBpZiAodGhpcy5jdWVzXy5sZW5ndGggPiAwKSB7XG5cbiAgICAvLyBHZXQgY3VyZW50IHBsYXllciB0aW1lXG4gICAgdmFyIHRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcblxuICAgIC8vIENoZWNrIGlmIHRoZSBuZXcgdGltZSBpcyBvdXRzaWRlIHRoZSB0aW1lIGJveCBjcmVhdGVkIGJ5IHRoZSB0aGUgbGFzdCB1cGRhdGUuXG4gICAgaWYgKHRoaXMucHJldkNoYW5nZSA9PT0gdW5kZWZpbmVkIHx8IHRpbWUgPCB0aGlzLnByZXZDaGFuZ2UgfHwgdGhpcy5uZXh0Q2hhbmdlIDw9IHRpbWUpIHtcbiAgICAgIHZhciBjdWVzID0gdGhpcy5jdWVzXyxcblxuICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyB0aW1lIGJveCBmb3IgdGhpcyBzdGF0ZS5cbiAgICAgICAgICBuZXdOZXh0Q2hhbmdlID0gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCksIC8vIFN0YXJ0IGF0IGJlZ2lubmluZyBvZiB0aGUgdGltZWxpbmVcbiAgICAgICAgICBuZXdQcmV2Q2hhbmdlID0gMCwgLy8gU3RhcnQgYXQgZW5kXG5cbiAgICAgICAgICByZXZlcnNlID0gZmFsc2UsIC8vIFNldCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsb29wIHRocm91Z2ggdGhlIGN1ZXMuIE9wdGltaXplZCB0aGUgY3VlIGNoZWNrLlxuICAgICAgICAgIG5ld0N1ZXMgPSBbXSwgLy8gU3RvcmUgbmV3IGFjdGl2ZSBjdWVzLlxuXG4gICAgICAgICAgLy8gU3RvcmUgd2hlcmUgaW4gdGhlIGxvb3AgdGhlIGN1cnJlbnQgYWN0aXZlIGN1ZXMgYXJlLCB0byBwcm92aWRlIGEgc21hcnQgc3RhcnRpbmcgcG9pbnQgZm9yIHRoZSBuZXh0IGxvb3AuXG4gICAgICAgICAgZmlyc3RBY3RpdmVJbmRleCwgbGFzdEFjdGl2ZUluZGV4LFxuICAgICAgICAgIGN1ZSwgaTsgLy8gTG9vcCB2YXJzXG5cbiAgICAgIC8vIENoZWNrIGlmIHRpbWUgaXMgZ29pbmcgZm9yd2FyZHMgb3IgYmFja3dhcmRzIChzY3J1YmJpbmcvcmV3aW5kaW5nKVxuICAgICAgLy8gSWYgd2Uga25vdyB0aGUgZGlyZWN0aW9uIHdlIGNhbiBvcHRpbWl6ZSB0aGUgc3RhcnRpbmcgcG9zaXRpb24gYW5kIGRpcmVjdGlvbiBvZiB0aGUgbG9vcCB0aHJvdWdoIHRoZSBjdWVzIGFycmF5LlxuICAgICAgaWYgKHRpbWUgPj0gdGhpcy5uZXh0Q2hhbmdlIHx8IHRoaXMubmV4dENoYW5nZSA9PT0gdW5kZWZpbmVkKSB7IC8vIE5leHRDaGFuZ2Ugc2hvdWxkIGhhcHBlblxuICAgICAgICAvLyBGb3J3YXJkcywgc28gc3RhcnQgYXQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBhY3RpdmUgY3VlIGFuZCBsb29wIGZvcndhcmRcbiAgICAgICAgaSA9ICh0aGlzLmZpcnN0QWN0aXZlSW5kZXggIT09IHVuZGVmaW5lZCkgPyB0aGlzLmZpcnN0QWN0aXZlSW5kZXggOiAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQmFja3dhcmRzLCBzbyBzdGFydCBhdCB0aGUgaW5kZXggb2YgdGhlIGxhc3QgYWN0aXZlIGN1ZSBhbmQgbG9vcCBiYWNrd2FyZFxuICAgICAgICByZXZlcnNlID0gdHJ1ZTtcbiAgICAgICAgaSA9ICh0aGlzLmxhc3RBY3RpdmVJbmRleCAhPT0gdW5kZWZpbmVkKSA/IHRoaXMubGFzdEFjdGl2ZUluZGV4IDogY3Vlcy5sZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkgeyAvLyBMb29wIHVudGlsIGJyb2tlblxuICAgICAgICBjdWUgPSBjdWVzW2ldO1xuXG4gICAgICAgIC8vIEN1ZSBlbmRlZCBhdCB0aGlzIHBvaW50XG4gICAgICAgIGlmIChjdWUuZW5kVGltZSA8PSB0aW1lKSB7XG4gICAgICAgICAgbmV3UHJldkNoYW5nZSA9IE1hdGgubWF4KG5ld1ByZXZDaGFuZ2UsIGN1ZS5lbmRUaW1lKTtcblxuICAgICAgICAgIGlmIChjdWUuYWN0aXZlKSB7XG4gICAgICAgICAgICBjdWUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm8gZWFybGllciBjdWVzIHNob3VsZCBoYXZlIGFuIGFjdGl2ZSBzdGFydCB0aW1lLlxuICAgICAgICAgIC8vIE5ldmVybWluZC4gQXNzdW1lIGZpcnN0IGN1ZSBjb3VsZCBoYXZlIGEgZHVyYXRpb24gdGhlIHNhbWUgYXMgdGhlIHZpZGVvLlxuICAgICAgICAgIC8vIEluIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIGxvb3AgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nLlxuICAgICAgICAgIC8vIGlmIChyZXZlcnNlICYmIGN1ZS5zdGFydFRpbWUpIHsgYnJlYWs7IH1cblxuICAgICAgICAvLyBDdWUgaGFzbid0IHN0YXJ0ZWRcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lIDwgY3VlLnN0YXJ0VGltZSkge1xuICAgICAgICAgIG5ld05leHRDaGFuZ2UgPSBNYXRoLm1pbihuZXdOZXh0Q2hhbmdlLCBjdWUuc3RhcnRUaW1lKTtcblxuICAgICAgICAgIGlmIChjdWUuYWN0aXZlKSB7XG4gICAgICAgICAgICBjdWUuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gTm8gbGF0ZXIgY3VlcyBzaG91bGQgaGF2ZSBhbiBhY3RpdmUgc3RhcnQgdGltZS5cbiAgICAgICAgICBpZiAoIXJldmVyc2UpIHsgYnJlYWs7IH1cblxuICAgICAgICAvLyBDdWUgaXMgY3VycmVudFxuICAgICAgICB9IGVsc2Uge1xuXG4gICAgICAgICAgaWYgKHJldmVyc2UpIHtcbiAgICAgICAgICAgIC8vIEFkZCBjdWUgdG8gZnJvbnQgb2YgYXJyYXkgdG8ga2VlcCBpbiB0aW1lIG9yZGVyXG4gICAgICAgICAgICBuZXdDdWVzLnNwbGljZSgwLDAsY3VlKTtcblxuICAgICAgICAgICAgLy8gSWYgaW4gcmV2ZXJzZSwgdGhlIGZpcnN0IGN1cnJlbnQgY3VlIGlzIG91ciBsYXN0QWN0aXZlQ3VlXG4gICAgICAgICAgICBpZiAobGFzdEFjdGl2ZUluZGV4ID09PSB1bmRlZmluZWQpIHsgbGFzdEFjdGl2ZUluZGV4ID0gaTsgfVxuICAgICAgICAgICAgZmlyc3RBY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEFkZCBjdWUgdG8gZW5kIG9mIGFycmF5XG4gICAgICAgICAgICBuZXdDdWVzLnB1c2goY3VlKTtcblxuICAgICAgICAgICAgLy8gSWYgZm9yd2FyZCwgdGhlIGZpcnN0IGN1cnJlbnQgY3VlIGlzIG91ciBmaXJzdEFjdGl2ZUluZGV4XG4gICAgICAgICAgICBpZiAoZmlyc3RBY3RpdmVJbmRleCA9PT0gdW5kZWZpbmVkKSB7IGZpcnN0QWN0aXZlSW5kZXggPSBpOyB9XG4gICAgICAgICAgICBsYXN0QWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG5ld05leHRDaGFuZ2UgPSBNYXRoLm1pbihuZXdOZXh0Q2hhbmdlLCBjdWUuZW5kVGltZSk7XG4gICAgICAgICAgbmV3UHJldkNoYW5nZSA9IE1hdGgubWF4KG5ld1ByZXZDaGFuZ2UsIGN1ZS5zdGFydFRpbWUpO1xuXG4gICAgICAgICAgY3VlLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgIC8vIFJldmVyc2UgZG93biB0aGUgYXJyYXkgb2YgY3VlcywgYnJlYWsgaWYgYXQgZmlyc3RcbiAgICAgICAgICBpZiAoaSA9PT0gMCkgeyBicmVhazsgfSBlbHNlIHsgaS0tOyB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gV2FsayB1cCB0aGUgYXJyYXkgZm8gY3VlcywgYnJlYWsgaWYgYXQgbGFzdFxuICAgICAgICAgIGlmIChpID09PSBjdWVzLmxlbmd0aCAtIDEpIHsgYnJlYWs7IH0gZWxzZSB7IGkrKzsgfVxuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdGhpcy5hY3RpdmVDdWVzXyA9IG5ld0N1ZXM7XG4gICAgICB0aGlzLm5leHRDaGFuZ2UgPSBuZXdOZXh0Q2hhbmdlO1xuICAgICAgdGhpcy5wcmV2Q2hhbmdlID0gbmV3UHJldkNoYW5nZTtcbiAgICAgIHRoaXMuZmlyc3RBY3RpdmVJbmRleCA9IGZpcnN0QWN0aXZlSW5kZXg7XG4gICAgICB0aGlzLmxhc3RBY3RpdmVJbmRleCA9IGxhc3RBY3RpdmVJbmRleDtcblxuICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XG5cbiAgICAgIHRoaXMudHJpZ2dlcignY3VlY2hhbmdlJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBBZGQgY3VlIEhUTUwgdG8gZGlzcGxheVxudmpzLlRleHRUcmFjay5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjdWVzID0gdGhpcy5hY3RpdmVDdWVzXyxcbiAgICAgIGh0bWwgPSAnJyxcbiAgICAgIGk9MCxqPWN1ZXMubGVuZ3RoO1xuXG4gIGZvciAoO2k8ajtpKyspIHtcbiAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cInZqcy10dC1jdWVcIj4nK2N1ZXNbaV0udGV4dCsnPC9zcGFuPic7XG4gIH1cblxuICB0aGlzLmVsXy5pbm5lckhUTUwgPSBodG1sO1xufTtcblxuLy8gU2V0IGFsbCBsb29wIGhlbHBlciB2YWx1ZXMgYmFja1xudmpzLlRleHRUcmFjay5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xuICB0aGlzLm5leHRDaGFuZ2UgPSAwO1xuICB0aGlzLnByZXZDaGFuZ2UgPSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcbiAgdGhpcy5maXJzdEFjdGl2ZUluZGV4ID0gMDtcbiAgdGhpcy5sYXN0QWN0aXZlSW5kZXggPSAwO1xufTtcblxuLy8gQ3JlYXRlIHNwZWNpZmljIHRyYWNrIHR5cGVzXG4vKipcbiAqIFRoZSB0cmFjayBjb21wb25lbnQgZm9yIG1hbmFnaW5nIHRoZSBoaWRpbmcgYW5kIHNob3dpbmcgb2YgY2FwdGlvbnNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLkNhcHRpb25zVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xudmpzLkNhcHRpb25zVHJhY2sucHJvdG90eXBlLmtpbmRfID0gJ2NhcHRpb25zJztcbi8vIEV4cG9ydGluZyBoZXJlIGJlY2F1c2UgVHJhY2sgY3JlYXRpb24gcmVxdWlyZXMgdGhlIHRyYWNrIGtpbmRcbi8vIHRvIGJlIGF2YWlsYWJsZSBvbiBnbG9iYWwgb2JqZWN0LiBlLmcuIG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVtLaW5kICsgJ1RyYWNrJ11cblxuLyoqXG4gKiBUaGUgdHJhY2sgY29tcG9uZW50IGZvciBtYW5hZ2luZyB0aGUgaGlkaW5nIGFuZCBzaG93aW5nIG9mIHN1YnRpdGxlc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuU3VidGl0bGVzVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xudmpzLlN1YnRpdGxlc1RyYWNrLnByb3RvdHlwZS5raW5kXyA9ICdzdWJ0aXRsZXMnO1xuXG4vKipcbiAqIFRoZSB0cmFjayBjb21wb25lbnQgZm9yIG1hbmFnaW5nIHRoZSBoaWRpbmcgYW5kIHNob3dpbmcgb2YgY2hhcHRlcnNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLkNoYXB0ZXJzVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xudmpzLkNoYXB0ZXJzVHJhY2sucHJvdG90eXBlLmtpbmRfID0gJ2NoYXB0ZXJzJztcblxuXG4vKiBUZXh0IFRyYWNrIERpc3BsYXlcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXG4vLyBHbG9iYWwgY29udGFpbmVyIGZvciBib3RoIHN1YnRpdGxlIGFuZCBjYXB0aW9ucyB0ZXh0LiBTaW1wbGUgZGl2IGNvbnRhaW5lci5cblxuLyoqXG4gKiBUaGUgY29tcG9uZW50IGZvciBkaXNwbGF5aW5nIHRleHQgdHJhY2sgY3Vlc1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuVGV4dFRyYWNrRGlzcGxheSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XG5cbiAgICAvLyBUaGlzIHVzZWQgdG8gYmUgY2FsbGVkIGR1cmluZyBwbGF5ZXIgaW5pdCwgYnV0IHdhcyBjYXVzaW5nIGFuIGVycm9yXG4gICAgLy8gaWYgYSB0cmFjayBzaG91bGQgc2hvdyBieSBkZWZhdWx0IGFuZCB0aGUgZGlzcGxheSBoYWRuJ3QgbG9hZGVkIHlldC5cbiAgICAvLyBTaG91bGQgcHJvYmFibHkgYmUgbW92ZWQgdG8gYW4gZXh0ZXJuYWwgdHJhY2sgbG9hZGVyIHdoZW4gd2Ugc3VwcG9ydFxuICAgIC8vIHRyYWNrcyB0aGF0IGRvbid0IG5lZWQgYSBkaXNwbGF5LlxuICAgIGlmIChwbGF5ZXIub3B0aW9uc19bJ3RyYWNrcyddICYmIHBsYXllci5vcHRpb25zX1sndHJhY2tzJ10ubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wbGF5ZXJfLmFkZFRleHRUcmFja3MocGxheWVyLm9wdGlvbnNfWyd0cmFja3MnXSk7XG4gICAgfVxuICB9XG59KTtcblxudmpzLlRleHRUcmFja0Rpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICBjbGFzc05hbWU6ICd2anMtdGV4dC10cmFjay1kaXNwbGF5J1xuICB9KTtcbn07XG5cblxuLyoqXG4gKiBUaGUgc3BlY2lmaWMgbWVudSBpdGVtIHR5cGUgZm9yIHNlbGVjdGluZyBhIGxhbmd1YWdlIHdpdGhpbiBhIHRleHQgdHJhY2sga2luZFxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuVGV4dFRyYWNrTWVudUl0ZW0gPSB2anMuTWVudUl0ZW0uZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIHZhciB0cmFjayA9IHRoaXMudHJhY2sgPSBvcHRpb25zWyd0cmFjayddO1xuXG4gICAgLy8gTW9kaWZ5IG9wdGlvbnMgZm9yIHBhcmVudCBNZW51SXRlbSBjbGFzcydzIGluaXQuXG4gICAgb3B0aW9uc1snbGFiZWwnXSA9IHRyYWNrLmxhYmVsKCk7XG4gICAgb3B0aW9uc1snc2VsZWN0ZWQnXSA9IHRyYWNrLmRmbHQoKTtcbiAgICB2anMuTWVudUl0ZW0uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5wbGF5ZXJfLm9uKHRyYWNrLmtpbmQoKSArICd0cmFja2NoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XG4gIH1cbn0pO1xuXG52anMuVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xuICB2anMuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcbiAgdGhpcy5wbGF5ZXJfLnNob3dUZXh0VHJhY2sodGhpcy50cmFjay5pZF8sIHRoaXMudHJhY2sua2luZCgpKTtcbn07XG5cbnZqcy5UZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcbiAgdGhpcy5zZWxlY3RlZCh0aGlzLnRyYWNrLm1vZGUoKSA9PSAyKTtcbn07XG5cbi8qKlxuICogQSBzcGVjaWFsIG1lbnUgaXRlbSBmb3IgdHVybmluZyBvZiBhIHNwZWNpZmljIHR5cGUgb2YgdGV4dCB0cmFja1xuICpcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuT2ZmVGV4dFRyYWNrTWVudUl0ZW0gPSB2anMuVGV4dFRyYWNrTWVudUl0ZW0uZXh0ZW5kKHtcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuICAgIC8vIENyZWF0ZSBwc2V1ZG8gdHJhY2sgaW5mb1xuICAgIC8vIFJlcXVpcmVzIG9wdGlvbnNbJ2tpbmQnXVxuICAgIG9wdGlvbnNbJ3RyYWNrJ10gPSB7XG4gICAgICBraW5kOiBmdW5jdGlvbigpIHsgcmV0dXJuIG9wdGlvbnNbJ2tpbmQnXTsgfSxcbiAgICAgIHBsYXllcjogcGxheWVyLFxuICAgICAgbGFiZWw6IGZ1bmN0aW9uKCl7IHJldHVybiBvcHRpb25zWydraW5kJ10gKyAnIG9mZic7IH0sXG4gICAgICBkZmx0OiBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH0sXG4gICAgICBtb2RlOiBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH1cbiAgICB9O1xuICAgIHZqcy5UZXh0VHJhY2tNZW51SXRlbS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XG4gICAgdGhpcy5zZWxlY3RlZCh0cnVlKTtcbiAgfVxufSk7XG5cbnZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5UZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xuICB0aGlzLnBsYXllcl8uc2hvd1RleHRUcmFjayh0aGlzLnRyYWNrLmlkXywgdGhpcy50cmFjay5raW5kKCkpO1xufTtcblxudmpzLk9mZlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xuICB2YXIgdHJhY2tzID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKSxcbiAgICAgIGk9MCwgaj10cmFja3MubGVuZ3RoLCB0cmFjayxcbiAgICAgIG9mZiA9IHRydWU7XG5cbiAgZm9yICg7aTxqO2krKykge1xuICAgIHRyYWNrID0gdHJhY2tzW2ldO1xuICAgIGlmICh0cmFjay5raW5kKCkgPT0gdGhpcy50cmFjay5raW5kKCkgJiYgdHJhY2subW9kZSgpID09IDIpIHtcbiAgICAgIG9mZiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuc2VsZWN0ZWQob2ZmKTtcbn07XG5cbi8qKlxuICogVGhlIGJhc2UgY2xhc3MgZm9yIGJ1dHRvbnMgdGhhdCB0b2dnbGUgc3BlY2lmaWMgdGV4dCB0cmFjayB0eXBlcyAoZS5nLiBzdWJ0aXRsZXMpXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5UZXh0VHJhY2tCdXR0b24gPSB2anMuTWVudUJ1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XG4gICAgdmpzLk1lbnVCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoIDw9IDEpIHtcbiAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgfVxufSk7XG5cbi8vIHZqcy5UZXh0VHJhY2tCdXR0b24ucHJvdG90eXBlLmJ1dHRvblByZXNzZWQgPSBmYWxzZTtcblxuLy8gdmpzLlRleHRUcmFja0J1dHRvbi5wcm90b3R5cGUuY3JlYXRlTWVudSA9IGZ1bmN0aW9uKCl7XG4vLyAgIHZhciBtZW51ID0gbmV3IHZqcy5NZW51KHRoaXMucGxheWVyXyk7XG5cbi8vICAgLy8gQWRkIGEgdGl0bGUgbGlzdCBpdGVtIHRvIHRoZSB0b3Bcbi8vICAgLy8gbWVudS5lbCgpLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnbGknLCB7XG4vLyAgIC8vICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtdGl0bGUnLFxuLy8gICAvLyAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXG4vLyAgIC8vICAgdGFiaW5kZXg6IC0xXG4vLyAgIC8vIH0pKTtcblxuLy8gICB0aGlzLml0ZW1zID0gdGhpcy5jcmVhdGVJdGVtcygpO1xuXG4vLyAgIC8vIEFkZCBtZW51IGl0ZW1zIHRvIHRoZSBtZW51XG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xuLy8gICAgIG1lbnUuYWRkSXRlbSh0aGlzLml0ZW1zW2ldKTtcbi8vICAgfVxuXG4vLyAgIC8vIEFkZCBsaXN0IHRvIGVsZW1lbnRcbi8vICAgdGhpcy5hZGRDaGlsZChtZW51KTtcblxuLy8gICByZXR1cm4gbWVudTtcbi8vIH07XG5cbi8vIENyZWF0ZSBhIG1lbnUgaXRlbSBmb3IgZWFjaCB0ZXh0IHRyYWNrXG52anMuVGV4dFRyYWNrQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7XG4gIHZhciBpdGVtcyA9IFtdLCB0cmFjaztcblxuICAvLyBBZGQgYW4gT0ZGIG1lbnUgaXRlbSB0byB0dXJuIGFsbCB0cmFja3Mgb2ZmXG4gIGl0ZW1zLnB1c2gobmV3IHZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbSh0aGlzLnBsYXllcl8sIHsgJ2tpbmQnOiB0aGlzLmtpbmRfIH0pKTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCkubGVuZ3RoOyBpKyspIHtcbiAgICB0cmFjayA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKClbaV07XG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PT0gdGhpcy5raW5kXykge1xuICAgICAgaXRlbXMucHVzaChuZXcgdmpzLlRleHRUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywge1xuICAgICAgICAndHJhY2snOiB0cmFja1xuICAgICAgfSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn07XG5cbi8qKlxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3RpbmcgY2FwdGlvbnNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLkNhcHRpb25zQnV0dG9uID0gdmpzLlRleHRUcmFja0J1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xuICAgIHZqcy5UZXh0VHJhY2tCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdDYXB0aW9ucyBNZW51Jyk7XG4gIH1cbn0pO1xudmpzLkNhcHRpb25zQnV0dG9uLnByb3RvdHlwZS5raW5kXyA9ICdjYXB0aW9ucyc7XG52anMuQ2FwdGlvbnNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnQ2FwdGlvbnMnO1xudmpzLkNhcHRpb25zQnV0dG9uLnByb3RvdHlwZS5jbGFzc05hbWUgPSAndmpzLWNhcHRpb25zLWJ1dHRvbic7XG5cbi8qKlxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3Rpbmcgc3VidGl0bGVzXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKi9cbnZqcy5TdWJ0aXRsZXNCdXR0b24gPSB2anMuVGV4dFRyYWNrQnV0dG9uLmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XG4gICAgdmpzLlRleHRUcmFja0J1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsJ1N1YnRpdGxlcyBNZW51Jyk7XG4gIH1cbn0pO1xudmpzLlN1YnRpdGxlc0J1dHRvbi5wcm90b3R5cGUua2luZF8gPSAnc3VidGl0bGVzJztcbnZqcy5TdWJ0aXRsZXNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnU3VidGl0bGVzJztcbnZqcy5TdWJ0aXRsZXNCdXR0b24ucHJvdG90eXBlLmNsYXNzTmFtZSA9ICd2anMtc3VidGl0bGVzLWJ1dHRvbic7XG5cbi8vIENoYXB0ZXJzIGFjdCBtdWNoIGRpZmZlcmVudGx5IHRoYW4gb3RoZXIgdGV4dCB0cmFja3Ncbi8vIEN1ZXMgYXJlIG5hdmlnYXRpb24gdnMuIG90aGVyIHRyYWNrcyBvZiBhbHRlcm5hdGl2ZSBsYW5ndWFnZXNcbi8qKlxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3RpbmcgY2hhcHRlcnNcbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqL1xudmpzLkNoYXB0ZXJzQnV0dG9uID0gdmpzLlRleHRUcmFja0J1dHRvbi5leHRlbmQoe1xuICAvKiogQGNvbnN0cnVjdG9yICovXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xuICAgIHZqcy5UZXh0VHJhY2tCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdDaGFwdGVycyBNZW51Jyk7XG4gIH1cbn0pO1xudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5raW5kXyA9ICdjaGFwdGVycyc7XG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnQ2hhcHRlcnMnO1xudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5jbGFzc05hbWUgPSAndmpzLWNoYXB0ZXJzLWJ1dHRvbic7XG5cbi8vIENyZWF0ZSBhIG1lbnUgaXRlbSBmb3IgZWFjaCB0ZXh0IHRyYWNrXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUl0ZW1zID0gZnVuY3Rpb24oKXtcbiAgdmFyIGl0ZW1zID0gW10sIHRyYWNrO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKS5sZW5ndGg7IGkrKykge1xuICAgIHRyYWNrID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKVtpXTtcbiAgICBpZiAodHJhY2sua2luZCgpID09PSB0aGlzLmtpbmRfKSB7XG4gICAgICBpdGVtcy5wdXNoKG5ldyB2anMuVGV4dFRyYWNrTWVudUl0ZW0odGhpcy5wbGF5ZXJfLCB7XG4gICAgICAgICd0cmFjayc6IHRyYWNrXG4gICAgICB9KSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGl0ZW1zO1xufTtcblxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcbiAgdmFyIHRyYWNrcyA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCksXG4gICAgICBpID0gMCxcbiAgICAgIGogPSB0cmFja3MubGVuZ3RoLFxuICAgICAgdHJhY2ssIGNoYXB0ZXJzVHJhY2ssXG4gICAgICBpdGVtcyA9IHRoaXMuaXRlbXMgPSBbXTtcblxuICBmb3IgKDtpPGo7aSsrKSB7XG4gICAgdHJhY2sgPSB0cmFja3NbaV07XG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PSB0aGlzLmtpbmRfICYmIHRyYWNrLmRmbHQoKSkge1xuICAgICAgaWYgKHRyYWNrLnJlYWR5U3RhdGUoKSA8IDIpIHtcbiAgICAgICAgdGhpcy5jaGFwdGVyc1RyYWNrID0gdHJhY2s7XG4gICAgICAgIHRyYWNrLm9uKCdsb2FkZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLmNyZWF0ZU1lbnUpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY2hhcHRlcnNUcmFjayA9IHRyYWNrO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgbWVudSA9IHRoaXMubWVudSA9IG5ldyB2anMuTWVudSh0aGlzLnBsYXllcl8pO1xuXG4gIG1lbnUuZWxfLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnbGknLCB7XG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtdGl0bGUnLFxuICAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXG4gICAgdGFiaW5kZXg6IC0xXG4gIH0pKTtcblxuICBpZiAoY2hhcHRlcnNUcmFjaykge1xuICAgIHZhciBjdWVzID0gY2hhcHRlcnNUcmFjay5jdWVzXywgY3VlLCBtaTtcbiAgICBpID0gMDtcbiAgICBqID0gY3Vlcy5sZW5ndGg7XG5cbiAgICBmb3IgKDtpPGo7aSsrKSB7XG4gICAgICBjdWUgPSBjdWVzW2ldO1xuXG4gICAgICBtaSA9IG5ldyB2anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywge1xuICAgICAgICAndHJhY2snOiBjaGFwdGVyc1RyYWNrLFxuICAgICAgICAnY3VlJzogY3VlXG4gICAgICB9KTtcblxuICAgICAgaXRlbXMucHVzaChtaSk7XG5cbiAgICAgIG1lbnUuYWRkQ2hpbGQobWkpO1xuICAgIH1cbiAgfVxuXG4gIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICB0aGlzLnNob3coKTtcbiAgfVxuXG4gIHJldHVybiBtZW51O1xufTtcblxuXG4vKipcbiAqIEBjb25zdHJ1Y3RvclxuICovXG52anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtID0gdmpzLk1lbnVJdGVtLmV4dGVuZCh7XG4gIC8qKiBAY29uc3RydWN0b3IgKi9cbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcbiAgICB2YXIgdHJhY2sgPSB0aGlzLnRyYWNrID0gb3B0aW9uc1sndHJhY2snXSxcbiAgICAgICAgY3VlID0gdGhpcy5jdWUgPSBvcHRpb25zWydjdWUnXSxcbiAgICAgICAgY3VycmVudFRpbWUgPSBwbGF5ZXIuY3VycmVudFRpbWUoKTtcblxuICAgIC8vIE1vZGlmeSBvcHRpb25zIGZvciBwYXJlbnQgTWVudUl0ZW0gY2xhc3MncyBpbml0LlxuICAgIG9wdGlvbnNbJ2xhYmVsJ10gPSBjdWUudGV4dDtcbiAgICBvcHRpb25zWydzZWxlY3RlZCddID0gKGN1ZS5zdGFydFRpbWUgPD0gY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUgPCBjdWUuZW5kVGltZSk7XG4gICAgdmpzLk1lbnVJdGVtLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcblxuICAgIHRyYWNrLm9uKCdjdWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xuICB9XG59KTtcblxudmpzLkNoYXB0ZXJzVHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XG4gIHZqcy5NZW51SXRlbS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUodGhpcy5jdWUuc3RhcnRUaW1lKTtcbiAgdGhpcy51cGRhdGUodGhpcy5jdWUuc3RhcnRUaW1lKTtcbn07XG5cbnZqcy5DaGFwdGVyc1RyYWNrTWVudUl0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XG4gIHZhciBjdWUgPSB0aGlzLmN1ZSxcbiAgICAgIGN1cnJlbnRUaW1lID0gdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XG5cbiAgLy8gdmpzLmxvZyhjdXJyZW50VGltZSwgY3VlLnN0YXJ0VGltZSk7XG4gIHRoaXMuc2VsZWN0ZWQoY3VlLnN0YXJ0VGltZSA8PSBjdXJyZW50VGltZSAmJiBjdXJyZW50VGltZSA8IGN1ZS5lbmRUaW1lKTtcbn07XG5cbi8vIEFkZCBCdXR0b25zIHRvIGNvbnRyb2xCYXJcbnZqcy5vYmoubWVyZ2UodmpzLkNvbnRyb2xCYXIucHJvdG90eXBlLm9wdGlvbnNfWydjaGlsZHJlbiddLCB7XG4gICdzdWJ0aXRsZXNCdXR0b24nOiB7fSxcbiAgJ2NhcHRpb25zQnV0dG9uJzoge30sXG4gICdjaGFwdGVyc0J1dHRvbic6IHt9XG59KTtcblxuLy8gdmpzLkN1ZSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcbi8vICAgLyoqIEBjb25zdHJ1Y3RvciAqL1xuLy8gICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xuLy8gICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xuLy8gICB9XG4vLyB9KTtcbi8qKlxuICogQGZpbGVvdmVydmlldyBBZGQgSlNPTiBzdXBwb3J0XG4gKiBAc3VwcHJlc3Mge3VuZGVmaW5lZFZhcnN9XG4gKiAoQ29tcGlsZXIgZG9lc24ndCBsaWtlIEpTT04gbm90IGJlaW5nIGRlY2xhcmVkKVxuICovXG5cbi8qKlxuICogSmF2YXNjcmlwdCBKU09OIGltcGxlbWVudGF0aW9uXG4gKiAoUGFyc2UgTWV0aG9kIE9ubHkpXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZG91Z2xhc2Nyb2NrZm9yZC9KU09OLWpzL2Jsb2IvbWFzdGVyL2pzb24yLmpzXG4gKiBPbmx5IHVzaW5nIGZvciBwYXJzZSBtZXRob2Qgd2hlbiBwYXJzaW5nIGRhdGEtc2V0dXAgYXR0cmlidXRlIEpTT04uXG4gKiBAc3VwcHJlc3Mge3VuZGVmaW5lZFZhcnN9XG4gKiBAbmFtZXNwYWNlXG4gKiBAcHJpdmF0ZVxuICovXG52anMuSlNPTjtcblxuaWYgKHR5cGVvZiB3aW5kb3cuSlNPTiAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkpTT04ucGFyc2UgPT09ICdmdW5jdGlvbicpIHtcbiAgdmpzLkpTT04gPSB3aW5kb3cuSlNPTjtcblxufSBlbHNlIHtcbiAgdmpzLkpTT04gPSB7fTtcblxuICB2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZztcblxuICAvKipcbiAgICogcGFyc2UgdGhlIGpzb25cbiAgICpcbiAgICogQG1lbWJlcm9mIHZqcy5KU09OXG4gICAqIEByZXR1cm4ge09iamVjdHxBcnJheX0gVGhlIHBhcnNlZCBKU09OXG4gICAqL1xuICB2anMuSlNPTi5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0LCByZXZpdmVyKSB7XG4gICAgICB2YXIgajtcblxuICAgICAgZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xuICAgICAgICAgIHZhciBrLCB2LCB2YWx1ZSA9IGhvbGRlcltrZXldO1xuICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XG4gICAgICB9XG4gICAgICB0ZXh0ID0gU3RyaW5nKHRleHQpO1xuICAgICAgY3gubGFzdEluZGV4ID0gMDtcbiAgICAgIGlmIChjeC50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShjeCwgZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgcmV0dXJuICdcXFxcdScgK1xuICAgICAgICAgICAgICAgICAgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKC9eW1xcXSw6e31cXHNdKiQvXG4gICAgICAgICAgICAgIC50ZXN0KHRleHQucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLCAnQCcpXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csICddJylcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpKSkge1xuXG4gICAgICAgICAgaiA9IGV2YWwoJygnICsgdGV4dCArICcpJyk7XG5cbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHJldml2ZXIgPT09ICdmdW5jdGlvbicgP1xuICAgICAgICAgICAgICB3YWxrKHsnJzogan0sICcnKSA6IGo7XG4gICAgICB9XG5cbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSlNPTi5wYXJzZSgpOiBpbnZhbGlkIG9yIG1hbGZvcm1lZCBKU09OIGRhdGEnKTtcbiAgfTtcbn1cbi8qKlxuICogQGZpbGVvdmVydmlldyBGdW5jdGlvbnMgZm9yIGF1dG9tYXRpY2FsbHkgc2V0dGluZyB1cCBhIHBsYXllclxuICogYmFzZWQgb24gdGhlIGRhdGEtc2V0dXAgYXR0cmlidXRlIG9mIHRoZSB2aWRlbyB0YWdcbiAqL1xuXG4vLyBBdXRvbWF0aWNhbGx5IHNldCB1cCBhbnkgdGFncyB0aGF0IGhhdmUgYSBkYXRhLXNldHVwIGF0dHJpYnV0ZVxudmpzLmF1dG9TZXR1cCA9IGZ1bmN0aW9uKCl7XG4gIHZhciBvcHRpb25zLCB2aWQsIHBsYXllcixcbiAgICAgIHZpZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKTtcblxuICAvLyBDaGVjayBpZiBhbnkgbWVkaWEgZWxlbWVudHMgZXhpc3RcbiAgaWYgKHZpZHMgJiYgdmlkcy5sZW5ndGggPiAwKSB7XG5cbiAgICBmb3IgKHZhciBpPTAsaj12aWRzLmxlbmd0aDsgaTxqOyBpKyspIHtcbiAgICAgIHZpZCA9IHZpZHNbaV07XG5cbiAgICAgIC8vIENoZWNrIGlmIGVsZW1lbnQgZXhpc3RzLCBoYXMgZ2V0QXR0cmlidXRlIGZ1bmMuXG4gICAgICAvLyBJRSBzZWVtcyB0byBjb25zaWRlciB0eXBlb2YgZWwuZ2V0QXR0cmlidXRlID09ICdvYmplY3QnIGluc3RlYWQgb2YgJ2Z1bmN0aW9uJyBsaWtlIGV4cGVjdGVkLCBhdCBsZWFzdCB3aGVuIGxvYWRpbmcgdGhlIHBsYXllciBpbW1lZGlhdGVseS5cbiAgICAgIGlmICh2aWQgJiYgdmlkLmdldEF0dHJpYnV0ZSkge1xuXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIHBsYXllciBoYXNuJ3QgYWxyZWFkeSBiZWVuIHNldCB1cC5cbiAgICAgICAgaWYgKHZpZFsncGxheWVyJ10gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIG9wdGlvbnMgPSB2aWQuZ2V0QXR0cmlidXRlKCdkYXRhLXNldHVwJyk7XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiBkYXRhLXNldHVwIGF0dHIgZXhpc3RzLlxuICAgICAgICAgIC8vIFdlIG9ubHkgYXV0by1zZXR1cCBpZiB0aGV5J3ZlIGFkZGVkIHRoZSBkYXRhLXNldHVwIGF0dHIuXG4gICAgICAgICAgaWYgKG9wdGlvbnMgIT09IG51bGwpIHtcblxuICAgICAgICAgICAgLy8gUGFyc2Ugb3B0aW9ucyBKU09OXG4gICAgICAgICAgICAvLyBJZiBlbXB0eSBzdHJpbmcsIG1ha2UgaXQgYSBwYXJzYWJsZSBqc29uIG9iamVjdC5cbiAgICAgICAgICAgIG9wdGlvbnMgPSB2anMuSlNPTi5wYXJzZShvcHRpb25zIHx8ICd7fScpO1xuXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHZpZGVvLmpzIGluc3RhbmNlLlxuICAgICAgICAgICAgcGxheWVyID0gdmlkZW9qcyh2aWQsIG9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAvLyBJZiBnZXRBdHRyaWJ1dGUgaXNuJ3QgZGVmaW5lZCwgd2UgbmVlZCB0byB3YWl0IGZvciB0aGUgRE9NLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmpzLmF1dG9TZXR1cFRpbWVvdXQoMSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAvLyBObyB2aWRlb3Mgd2VyZSBmb3VuZCwgc28ga2VlcCBsb29waW5nIHVubGVzcyBwYWdlIGlzIGZpbmlzZWhkIGxvYWRpbmcuXG4gIH0gZWxzZSBpZiAoIXZqcy53aW5kb3dMb2FkZWQpIHtcbiAgICB2anMuYXV0b1NldHVwVGltZW91dCgxKTtcbiAgfVxufTtcblxuLy8gUGF1c2UgdG8gbGV0IHRoZSBET00ga2VlcCBwcm9jZXNzaW5nXG52anMuYXV0b1NldHVwVGltZW91dCA9IGZ1bmN0aW9uKHdhaXQpe1xuICBzZXRUaW1lb3V0KHZqcy5hdXRvU2V0dXAsIHdhaXQpO1xufTtcblxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcbiAgdmpzLndpbmRvd0xvYWRlZCA9IHRydWU7XG59IGVsc2Uge1xuICB2anMub25lKHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgIHZqcy53aW5kb3dMb2FkZWQgPSB0cnVlO1xuICB9KTtcbn1cblxuLy8gUnVuIEF1dG8tbG9hZCBwbGF5ZXJzXG4vLyBZb3UgaGF2ZSB0byB3YWl0IGF0IGxlYXN0IG9uY2UgaW4gY2FzZSB0aGlzIHNjcmlwdCBpcyBsb2FkZWQgYWZ0ZXIgeW91ciB2aWRlbyBpbiB0aGUgRE9NICh3ZWlyZCBiZWhhdmlvciBvbmx5IHdpdGggbWluaWZpZWQgdmVyc2lvbilcbnZqcy5hdXRvU2V0dXBUaW1lb3V0KDEpO1xuLyoqXG4gKiB0aGUgbWV0aG9kIGZvciByZWdpc3RlcmluZyBhIHZpZGVvLmpzIHBsdWdpblxuICpcbiAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcGx1Z2luXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gaW5pdCBUaGUgZnVuY3Rpb24gdGhhdCBpcyBydW4gd2hlbiB0aGUgcGxheWVyIGluaXRzXG4gKi9cbnZqcy5wbHVnaW4gPSBmdW5jdGlvbihuYW1lLCBpbml0KXtcbiAgdmpzLlBsYXllci5wcm90b3R5cGVbbmFtZV0gPSBpbml0O1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL3BsYXllci92aWRlby5kZXYuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvKipcbiDilojilpLilpPilpLilpEgVGhlIEZsZXhQYXBlciBQcm9qZWN0XG5cbiBUaGlzIGZpbGUgaXMgcGFydCBvZiBGbGV4UGFwZXIuXG5cbiBGbGV4UGFwZXIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLlxuXG4gRmxleFBhcGVyIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gYWxvbmcgd2l0aCBGbGV4UGFwZXIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBGbGV4UGFwZXIgcGxlYXNlIHNlZSB0aGUgRmxleFBhcGVyIHByb2plY3RcbiBob21lIHBhZ2U6IGh0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb21cbiAqL1xuXG4vKipcbiAqXG4gKiBGbGV4UGFwZXIgaGVscGVyIGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIGEgYWN0aXZlIEZsZXhQYXBlciBpbnN0YW5jZVxuICpcbiAqL1xud2luZG93LiRGbGV4UGFwZXIgPSB3aW5kb3cuZ2V0RG9jVmlld2VyID0gd2luZG93W1wiJEZsZXhQYXBlclwiXSA9IGZ1bmN0aW9uKGlkKXtcbiAgICB2YXIgaW5zdGFuY2UgPSAoaWQ9PT1cInVuZGVmaW5lZFwiKT9cIlwiOmlkO1xuXG4gICAgcmV0dXJuIHdpbmRvd1tcIkZsZXhQYXBlclZpZXdlcl9JbnN0YW5jZVwiK2luc3RhbmNlXS5nZXRBcGkoKTtcbn07XG5cbi8qKlxuICpcbiAqIEZsZXhQYXBlciBlbWJlZGRpbmcgKG5hbWUgb2YgcGxhY2Vob2xkZXIsIGNvbmZpZylcbiAqXG4gKi9cbndpbmRvdy5GbGV4UGFwZXJWaWV3ZXJFbWJlZGRpbmcgPSB3aW5kb3cuJGYgPSBmdW5jdGlvbihpZCwgYXJncykge1xuICAgIHZhciBjb25maWcgPSBhcmdzLmNvbmZpZztcbiAgICB2YXIgX1NXRkZpbGUsX1BERkZpbGUsX0lNR0ZpbGVzLF9KU09ORmlsZSAgPSBcIlwiLF9qc0RpcmVjdG9yeT1cIlwiLF9jc3NEaXJlY3Rvcnk9XCJcIixfbG9jYWxlRGlyZWN0b3J5PVwiXCI7X1dNb2RlID0gKGNvbmZpZy5XTW9kZSE9bnVsbHx8Y29uZmlnLndtbW9kZSE9bnVsbD9jb25maWcud21tb2RlfHxjb25maWcuV01vZGU6XCJ3aW5kb3dcIik7XG4gICAgdmFyIF91RG9jID0gKChjb25maWcuRE9DICE9bnVsbCk/dW5lc2NhcGUoY29uZmlnLkRPQyk6bnVsbCk7XG4gICAgdmFyIGluc3RhbmNlID0gXCJGbGV4UGFwZXJWaWV3ZXJfSW5zdGFuY2VcIisoKGlkPT09XCJ1bmRlZmluZWRcIik/XCJcIjppZCk7XG4gICAgdmFyIF9KU09ORGF0YVR5cGUgPSAoY29uZmlnLkpTT05EYXRhVHlwZSE9bnVsbCk/Y29uZmlnLkpTT05EYXRhVHlwZTpcImpzb25cIjtcblxuICAgIGlmIChfdURvYyAhPSBudWxsKSB7XG4gICAgICAgIF9TV0ZGaWxlIFx0PSBGTEVYUEFQRVIudHJhbnNsYXRlVXJsQnlGb3JtYXQoX3VEb2MsXCJzd2ZcIik7XG4gICAgfVxuXG4gICAgX1NXRkZpbGUgIFx0XHRcdD0gKGNvbmZpZy5Td2ZGaWxlIT1udWxsP2NvbmZpZy5Td2ZGaWxlOl9TV0ZGaWxlKTtcbiAgICBfU1dGRmlsZSAgXHRcdFx0PSAoY29uZmlnLlNXRkZpbGUhPW51bGw/Y29uZmlnLlNXRkZpbGU6X1NXRkZpbGUpO1xuICAgIF9QREZGaWxlIFx0XHRcdD0gKGNvbmZpZy5QREZGaWxlIT1udWxsP2NvbmZpZy5QREZGaWxlOl9QREZGaWxlKTtcbiAgICBfSU1HRmlsZXMgXHRcdFx0PSAoY29uZmlnLklNR0ZpbGVzIT1udWxsP2NvbmZpZy5JTUdGaWxlczpfSU1HRmlsZXMpO1xuICAgIF9JTUdGaWxlcyBcdFx0XHQ9IChjb25maWcuUGFnZUltYWdlUGF0dGVybiE9bnVsbD9jb25maWcuUGFnZUltYWdlUGF0dGVybjpfSU1HRmlsZXMpO1xuICAgIF9KU09ORmlsZSBcdFx0XHQ9IChjb25maWcuSlNPTkZpbGUhPW51bGw/Y29uZmlnLkpTT05GaWxlOl9KU09ORmlsZSk7XG4gICAgX2pzRGlyZWN0b3J5IFx0XHQ9IChjb25maWcuanNEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmpzRGlyZWN0b3J5OlwianMvXCIpO1xuICAgIF9jc3NEaXJlY3RvcnkgXHRcdD0gKGNvbmZpZy5jc3NEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmNzc0RpcmVjdG9yeTpcImNzcy9cIik7XG4gICAgX2xvY2FsZURpcmVjdG9yeSBcdD0gKGNvbmZpZy5sb2NhbGVEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmxvY2FsZURpcmVjdG9yeTpcImxvY2FsZS9cIik7XG4gICAgaWYoX1NXRkZpbGUhPW51bGwgJiYgX1NXRkZpbGUuaW5kZXhPZihcIntcIiApPT0wICYmIF9TV0ZGaWxlLmluZGV4T2YoXCJbKixcIiApID4gMCAmJiBfU1dGRmlsZS5pbmRleE9mKFwiXVwiICkgPiAwKXtfU1dGRmlsZSA9IGVzY2FwZShfU1dGRmlsZSk7fSAvLyBzcGxpdCBmaWxlIGZpeFxuXG4gICAgd2luZG93W2luc3RhbmNlXSA9IGZsYXNoZW1iZWQoaWQsIHtcbiAgICAgICAgc3JjXHRcdFx0XHRcdFx0ICAgIDogX2pzRGlyZWN0b3J5K1wiLi9GbGV4UGFwZXJWaWV3ZXIuc3dmXCIsXG4gICAgICAgIHZlcnNpb25cdFx0XHRcdFx0ICAgIDogWzEwLCAwXSxcbiAgICAgICAgZXhwcmVzc0luc3RhbGxcdFx0XHQgICAgOiBcImpzL2V4cHJlc3NpbnN0YWxsLnN3ZlwiLFxuICAgICAgICB3bW9kZVx0XHRcdFx0XHQgICAgOiBfV01vZGVcbiAgICB9LHtcbiAgICAgICAgRWxlbWVudElkICAgICAgICAgICAgICAgOiBpZCxcbiAgICAgICAgU3dmRmlsZSAgXHRcdFx0XHQ6IF9TV0ZGaWxlLFxuICAgICAgICBQZGZGaWxlICBcdFx0XHRcdDogX1BERkZpbGUsXG4gICAgICAgIElNR0ZpbGVzICBcdFx0XHRcdDogX0lNR0ZpbGVzLFxuICAgICAgICBKU09ORmlsZSBcdFx0XHRcdDogX0pTT05GaWxlLFxuICAgICAgICB1c2VDdXN0b21KU09ORm9ybWF0IFx0OiBjb25maWcudXNlQ3VzdG9tSlNPTkZvcm1hdCxcbiAgICAgICAgSlNPTlBhZ2VEYXRhRm9ybWF0IFx0XHQ6IGNvbmZpZy5KU09OUGFnZURhdGFGb3JtYXQsXG4gICAgICAgIEpTT05EYXRhVHlwZSBcdFx0XHQ6IF9KU09ORGF0YVR5cGUsXG4gICAgICAgIFNjYWxlIFx0XHRcdFx0XHQ6IChjb25maWcuU2NhbGUhPW51bGwpP2NvbmZpZy5TY2FsZTowLjgsXG4gICAgICAgIFpvb21UcmFuc2l0aW9uIFx0XHRcdDogKGNvbmZpZy5ab29tVHJhbnNpdGlvbiE9bnVsbCk/Y29uZmlnLlpvb21UcmFuc2l0aW9uOidlYXNlT3V0JyxcbiAgICAgICAgWm9vbVRpbWUgXHRcdFx0XHQ6IChjb25maWcuWm9vbVRpbWUhPW51bGwpP2NvbmZpZy5ab29tVGltZTowLjUsXG4gICAgICAgIFpvb21JbnRlcnZhbCBcdFx0XHQ6IChjb25maWcuWm9vbUludGVydmFsKT9jb25maWcuWm9vbUludGVydmFsOjAuMixcbiAgICAgICAgRml0UGFnZU9uTG9hZCBcdFx0XHQ6IChjb25maWcuRml0UGFnZU9uTG9hZCE9bnVsbCk/Y29uZmlnLkZpdFBhZ2VPbkxvYWQ6ZmFsc2UsXG4gICAgICAgIEZpdFdpZHRoT25Mb2FkIFx0XHRcdDogKGNvbmZpZy5GaXRXaWR0aE9uTG9hZCE9bnVsbCk/Y29uZmlnLkZpdFdpZHRoT25Mb2FkOmZhbHNlLFxuICAgICAgICBGdWxsU2NyZWVuQXNNYXhXaW5kb3cgXHQ6IChjb25maWcuRnVsbFNjcmVlbkFzTWF4V2luZG93IT1udWxsKT9jb25maWcuRnVsbFNjcmVlbkFzTWF4V2luZG93OmZhbHNlLFxuICAgICAgICBQcm9ncmVzc2l2ZUxvYWRpbmcgXHRcdDogKGNvbmZpZy5Qcm9ncmVzc2l2ZUxvYWRpbmchPW51bGwpP2NvbmZpZy5Qcm9ncmVzc2l2ZUxvYWRpbmc6ZmFsc2UsXG4gICAgICAgIE1pblpvb21TaXplIFx0XHRcdDogKGNvbmZpZy5NaW5ab29tU2l6ZSE9bnVsbCk/Y29uZmlnLk1pblpvb21TaXplOjAuMixcbiAgICAgICAgTWF4Wm9vbVNpemUgXHRcdFx0OiAoY29uZmlnLk1heFpvb21TaXplIT1udWxsKT9jb25maWcuTWF4Wm9vbVNpemU6NSxcbiAgICAgICAgU2VhcmNoTWF0Y2hBbGwgXHRcdFx0OiAoY29uZmlnLlNlYXJjaE1hdGNoQWxsIT1udWxsKT9jb25maWcuU2VhcmNoTWF0Y2hBbGw6ZmFsc2UsXG4gICAgICAgIFNlYXJjaFNlcnZpY2VVcmwgXHRcdDogY29uZmlnLlNlYXJjaFNlcnZpY2VVcmwsXG4gICAgICAgIEluaXRWaWV3TW9kZSBcdFx0XHQ6IGNvbmZpZy5Jbml0Vmlld01vZGUsXG4gICAgICAgIEJpdG1hcEJhc2VkUmVuZGVyaW5nIFx0OiAoY29uZmlnLkJpdG1hcEJhc2VkUmVuZGVyaW5nIT1udWxsKT9jb25maWcuQml0bWFwQmFzZWRSZW5kZXJpbmc6ZmFsc2UsXG4gICAgICAgIFN0YXJ0QXRQYWdlIFx0XHRcdDogY29uZmlnLlN0YXJ0QXRQYWdlLFxuICAgICAgICBQcmludFBhcGVyQXNCaXRtYXBcdFx0OiAoY29uZmlnLlByaW50UGFwZXJBc0JpdG1hcCE9bnVsbCk/Y29uZmlnLlByaW50UGFwZXJBc0JpdG1hcDpmYWxzZSxcbiAgICAgICAgQXV0b0FkanVzdFByaW50U2l6ZVx0XHQ6IChjb25maWcuQXV0b0FkanVzdFByaW50U2l6ZSE9bnVsbCk/Y29uZmlnLkF1dG9BZGp1c3RQcmludFNpemU6ZmFsc2UsXG5cbiAgICAgICAgRW5hYmxlQ29ybmVyRHJhZ2dpbmcgXHQ6ICgoY29uZmlnLkVuYWJsZUNvcm5lckRyYWdnaW5nIT1udWxsKT9jb25maWcuRW5hYmxlQ29ybmVyRHJhZ2dpbmc6dHJ1ZSksIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxuICAgICAgICBCYWNrZ3JvdW5kQ29sb3IgXHRcdDogY29uZmlnLkJhY2tncm91bmRDb2xvciwgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXG4gICAgICAgIFBhbmVsQ29sb3IgXHRcdFx0XHQ6IGNvbmZpZy5QYW5lbENvbG9yLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcbiAgICAgICAgQmFja2dyb3VuZEFscGhhICAgICAgICAgOiBjb25maWcuQmFja2dyb3VuZEFscGhhLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcbiAgICAgICAgVUlDb25maWcgICAgICAgICAgICAgICAgOiBjb25maWcuVUlDb25maWcsICAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcblxuICAgICAgICBWaWV3TW9kZVRvb2xzVmlzaWJsZSBcdDogKChjb25maWcuVmlld01vZGVUb29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5WaWV3TW9kZVRvb2xzVmlzaWJsZTp0cnVlKSxcbiAgICAgICAgWm9vbVRvb2xzVmlzaWJsZSBcdFx0OiAoKGNvbmZpZy5ab29tVG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuWm9vbVRvb2xzVmlzaWJsZTp0cnVlKSxcbiAgICAgICAgTmF2VG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLk5hdlRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLk5hdlRvb2xzVmlzaWJsZTp0cnVlKSxcbiAgICAgICAgQ3Vyc29yVG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLkN1cnNvclRvb2xzVmlzaWJsZTp0cnVlKSxcbiAgICAgICAgU2VhcmNoVG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZTp0cnVlKSxcbiAgICAgICAgU3RpY2t5VG9vbHNcdFx0XHRcdDogY29uZmlnLlN0aWNreVRvb2xzLFxuICAgICAgICBUb29sYmFyICAgICAgICAgICAgICAgICA6IGNvbmZpZy5Ub29sYmFyLFxuICAgICAgICBEb2NTaXplUXVlcnlTZXJ2aWNlIFx0OiBjb25maWcuRG9jU2l6ZVF1ZXJ5U2VydmljZSxcblxuICAgICAgICBSZW5kZXJpbmdPcmRlciBcdFx0XHQ6IGNvbmZpZy5SZW5kZXJpbmdPcmRlcixcblxuICAgICAgICBsb2NhbGVDaGFpbiBcdFx0XHQ6IChjb25maWcubG9jYWxlQ2hhaW4hPW51bGwpP2NvbmZpZy5sb2NhbGVDaGFpbjpcImVuX1VTXCIsXG4gICAgICAgIGpzRGlyZWN0b3J5IFx0XHRcdDogX2pzRGlyZWN0b3J5LFxuICAgICAgICBjc3NEaXJlY3RvcnkgXHRcdFx0OiBfY3NzRGlyZWN0b3J5LFxuICAgICAgICBsb2NhbGVEaXJlY3RvcnlcdFx0XHQ6IF9sb2NhbGVEaXJlY3RvcnksXG4gICAgICAgIGtleSBcdFx0XHRcdFx0OiBjb25maWcua2V5XG4gICAgfSk7XG59O1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgaWYoIXdpbmRvdy5GTEVYUEFQRVIpe3dpbmRvdy5GTEVYUEFQRVIgPSB7fTt9XG5cbiAgICBGTEVYUEFQRVIuZ2V0TG9jYXRpb25IYXNoUGFyYW1ldGVyID0gZnVuY3Rpb24ocGFyYW0pe1xuICAgICAgICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xuXG4gICAgICAgIGlmKGhhc2guaW5kZXhPZihwYXJhbSsnPScpPj0wKXtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGhhc2guc3Vic3RyKGhhc2guaW5kZXhPZihwYXJhbSsnPScpKVxuICAgICAgICAgICAgICAgIC5zcGxpdCgnJicpWzBdXG4gICAgICAgICAgICAgICAgLnNwbGl0KCc9JylbMV07XG5cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICBGTEVYUEFQRVIudHJhbnNsYXRlVXJsQnlGb3JtYXQgPSBmdW5jdGlvbih1cmwsZm9ybWF0KXtcbiAgICAgICAgaWYodXJsLmluZGV4T2YoXCJ7XCIpID09IDAgJiYgZm9ybWF0ICE9IFwic3dmXCIpeyAvLyBsb2FkaW5nIGluIHNwbGl0IGZpbGUgbW9kZVxuICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygxLHVybC5sYXN0SW5kZXhPZihcIixcIikpO1xuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCJbKiwwXVwiLFwie3BhZ2V9XCIpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICh1cmwhPW51bGwgJiYgdXJsLmluZGV4T2YoJ3tmb3JtYXR9JykgPiAwID8gdXJsLnJlcGxhY2UoXCJ7Zm9ybWF0fVwiLCBmb3JtYXQpOm51bGwpO1xuICAgIH07XG5cbiAgICBGTEVYUEFQRVIuYW5pbWF0ZURlbnlFZmZlY3QgPSBmdW5jdGlvbihvYmosbWFyZ2luLHRpbWUsY3ljbGVzLGRpcikge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNwZWVkID0gdGltZSAvICgoMipjeWNsZXMpKzEpO1xuICAgICAgICAgICAgdmFyIG1hcmdSYXQgPSAxICsgKDYwLyhjeWNsZXMqY3ljbGVzKSk7ICQob2JqKS5zdG9wKHRydWUsdHJ1ZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8PWN5Y2xlczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaj0tMTsgajw9MTsgais9MilcbiAgICAgICAgICAgICAgICAgICAgJChvYmopLmFuaW1hdGUoe21hcmdpbkxlZnQ6IChpIT1jeWNsZXMpKmoqbWFyZ2lufSx7ZHVyYXRpb246c3BlZWQsIHF1ZXVlOnRydWV9KTtcblxuICAgICAgICAgICAgICAgIG1hcmdpbi89bWFyZ1JhdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSw1MDApO1xuICAgIH07XG5cbiAgICBGTEVYUEFQRVIuaW5pdExvZ2luRm9ybSA9IGZ1bmN0aW9uIGluaXRMb2dpbkZvcm0oSU1HRmlsZXMsYW5pbWF0ZSl7XG4gICAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCcjZGVkZWRlJyk7XG5cbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xuICAgICAgICBqUXVlcnkoaW1nKS5iaW5kKCdsb2FkJyxmdW5jdGlvbigpe1xuICAgICAgICAgICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmFwcGVuZChcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQ9J2xvZ2luRm9ybSc+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPGZvcm0gY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nJyBtZXRob2Q9J1BPU1QnIHN0eWxlPSdkaXNwbGF5Om5vbmU7dG9wOjEwMHB4O21hcmdpbjpcIisoKGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpPjUwMCk/XCI1MHB4IGF1dG9cIjpcIjBweCBhdXRvXCIpK1wiJz5cIitcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdmbGV4cGFwZXJfcHVibGljYXRpb25zIGZsZXhwYXBlcl9wdWJsaWNhdGlvbl9jc3N0cmFuc2Zvcm1zM2QnIHN0eWxlPSdvdmVyZmxvdy15OmhpZGRlbjtvdmVyZmxvdy14OmhpZGRlbjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kOiAjZjdmN2Y3O21hcmdpbjogLTI1cHggLTI1cHggMHB4O3BhZGRpbmc6IDE1cHggMjVweCAwcHggMjVweDsnPlwiK1xuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ZsZXhwYXBlcl9wdWJsaWNhdGlvbiBmbGV4cGFwZXJfcHVibGljYXRpb25fY3NzdHJhbnNmb3JtczNkJyBpZD0nZmxleHBhcGVyX3B1YmxpY2F0aW9uMSc+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPGltZyBzcmM9J1wiKyhJTUdGaWxlcy5yZXBsYWNlKFwie3BhZ2V9XCIsMSkpK1wiJyAvPlwiK1xuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiK1xuXG4gICAgICAgICAgICAgICAgICAgIFwiPGgxIGNsYXNzPSdmbGV4cGFwZXJfaHRtbGRpYWxvZy10aXRsZSc+cGFzc3dvcmQgcHJvdGVjdGVkIHB1YmxpY2F0aW9uPC9oMT5cIitcbiAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIGlkPSd0eHRfZmxleHBhcGVyX3Bhc3N3b3JkJyBuYW1lPSd0eHRfZmxleHBhcGVyX3Bhc3N3b3JkJyBjbGFzcz0nZmxleHBhcGVyX2h0bWxkaWFsb2ctaW5wdXQnIHBsYWNlaG9sZGVyPSdFbnRlciBwYXNzd29yZCc+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGU9J3N1Ym1pdCcgdmFsdWU9J1N1Ym1pdCcgY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nLWJ1dHRvbic+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIrXG4gICAgICAgICAgICAgICAgICAgIFwiPC9mb3JtPlwiK1xuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB2YXIgYW5pbV9kdXJhdGlvbiA9IGFuaW1hdGU/MTAwMDowO1xuICAgICAgICAgICAgdmFyIGFuaW1faGVpZ2h0X2R1ciA9IGFuaW1hdGU/YW5pbV9kdXJhdGlvbi8zOjA7XG4gICAgICAgICAgICB2YXIgdGhlaWdodCA9IDQwMDtcblxuICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5jc3Moe2hlaWdodCA6ICcwcHgnLCBkaXNwbGF5IDogJ2Jsb2NrJ30pO1xuICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5hbmltYXRlKHsnaGVpZ2h0JzogdGhlaWdodCsncHgnLCd0b3AnOicwcHgnfSx7ZHVyYXRpb246IGFuaW1faGVpZ2h0X2R1ciwgY29tcGxldGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5jc3MoeydoZWlnaHQnIDogJyd9KTsgLy8gcmVtb3ZlIGhlaWdodCBhdHRyaWJ1dGUgdG8gZml0IHB1YmxpY2F0aW9uXG5cbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfcHVibGljYXRpb24nKS5hbmltYXRlKHtvcGFjaXR5OjF9LHtcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uKG5vdyxmeCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gLTc7dmFyIG9wYWNpdHlmcm9tID0gLTQwO3ZhciBkaWZmID0gb3BhY2l0eWZyb20gLSB0YXJnZXQ7dmFyIHJvdGF0ZSA9IChkaWZmICogbm93KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX3B1YmxpY2F0aW9uJykuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nIDogJ3BlcnNwZWN0aXZlKDMwMCkgcm90YXRlWSgnKyhvcGFjaXR5ZnJvbSAtIHJvdGF0ZSkrJ2RlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctbW96LXRyYW5zZm9ybScgOiAncm90YXRlWSgnKyhvcGFjaXR5ZnJvbSAtIHJvdGF0ZSkrJ2RlZyknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdib3gtc2hhZG93JyA6ICc1cHggNXB4IDIwcHggcmdiYSg1MSwgNTEsIDUxLCAnK25vdysnKSdcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjphbmltX2R1cmF0aW9uXG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIH19KTtcblxuICAgICAgICB9KTtcbiAgICAgICAgaW1nLnNyYyA9IChJTUdGaWxlcy5yZXBsYWNlKFwie3BhZ2V9XCIsMSkpO1xuICAgIH07XG59KSgpO1xuXG5cbi8qKlxuICpcbiAqIEZsZXhQYXBlciBlbWJlZGRpbmcgZnVuY3Rpb25hbGl0eS4gQmFzZWQgb24gRmxhc2hFbWJlZFxuICpcbiAqL1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgIElFID0gZG9jdW1lbnQuYWxsLFxuICAgICAgICBVUkwgPSAnaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInLFxuICAgICAgICBKUVVFUlkgPSB0eXBlb2YgalF1ZXJ5ID09ICdmdW5jdGlvbicsXG4gICAgICAgIFJFID0gLyhcXGQrKVteXFxkXSsoXFxkKylbXlxcZF0qKFxcZCopLyxcbiAgICAgICAgTU9CSUxFID0gKGZ1bmN0aW9uKCl7dHJ5IHtyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O30gY2F0Y2ggKGUpIHtyZXR1cm4gZmFsc2U7fSB9KSgpLFxuICAgICAgICBHTE9CQUxfT1BUUyA9IHtcbiAgICAgICAgICAgIC8vIHZlcnkgY29tbW9uIG9wdHNcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIGlkOiBcIl9cIiArIChcIlwiICsgTWF0aC5yYW5kb20oKSkuc2xpY2UoOSksXG5cbiAgICAgICAgICAgIC8vIGZsYXNoZW1iZWQgZGVmYXVsdHNcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbjogdHJ1ZSxcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzOiAnYWx3YXlzJyxcbiAgICAgICAgICAgIHF1YWxpdHk6ICdoaWdoJyxcbiAgICAgICAgICAgIGFsbG93RnVsbFNjcmVlbkludGVyYWN0aXZlIDogdHJ1ZSxcblxuICAgICAgICAgICAgLy8gZmxhc2hlbWJlZCBzcGVjaWZpYyBvcHRpb25zXG4gICAgICAgICAgICB2ZXJzaW9uOiBbMTAsIDBdLFxuICAgICAgICAgICAgb25GYWlsOiBudWxsLFxuICAgICAgICAgICAgZXhwcmVzc0luc3RhbGw6IG51bGwsXG4gICAgICAgICAgICB3M2M6IGZhbHNlLFxuICAgICAgICAgICAgY2FjaGVidXN0aW5nOiBmYWxzZVxuICAgICAgICB9O1xuXG4gICAgd2luZG93LmlzVG91Y2hTY3JlZW4gPSBNT0JJTEU7XG5cbiAgICBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX19mbGFzaF91bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgICAgIF9fZmxhc2hfc2F2ZWRVbmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc2ltcGxlIGV4dGVuZFxuICAgIGZ1bmN0aW9uIGV4dGVuZCh0bywgZnJvbSkge1xuICAgICAgICBpZiAoZnJvbSkge1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcbiAgICAgICAgICAgICAgICBpZiAoZnJvbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0bztcbiAgICB9XG5cbiAgICAvLyB1c2VkIGJ5IEZsYXNoIHRvIGRpc3BhdGNoIGEgZXZlbnQgcHJvcGVybHlcbiAgICB3aW5kb3cuZGlzcGF0Y2hKUXVlcnlFdmVudCA9IGZ1bmN0aW9uIChlbGVtZW50SWQsZXZlbnROYW1lLGFyZ3Mpe1xuICAgICAgICBqUXVlcnkoJyMnK2VsZW1lbnRJZCkudHJpZ2dlcihldmVudE5hbWUsYXJncyk7XG4gICAgfVxuXG4gICAgLy8gdXNlZCBieSBhc1N0cmluZyBtZXRob2RcbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmdW5jKSB7XG4gICAgICAgIHZhciBuZXdBcnIgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSBpbiBhcnIpIHtcbiAgICAgICAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgICAgICAgICBuZXdBcnJbaV0gPSBmdW5jKGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0FycjtcbiAgICB9XG5cbiAgICB3aW5kb3cuZmxhc2hlbWJlZCA9IGZ1bmN0aW9uKHJvb3QsIG9wdHMsIGNvbmYpIHtcbiAgICAgICAgLy8gcm9vdCBtdXN0IGJlIGZvdW5kIC8gbG9hZGVkXG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdCA9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvb3QucmVwbGFjZShcIiNcIiwgXCJcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm90IGZvdW5kXG4gICAgICAgIGlmICghcm9vdCkgeyByZXR1cm47IH1cblxuICAgICAgICByb290Lm9uY2xpY2sgPSBmdW5jdGlvbigpe3JldHVybiBmYWxzZTt9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBvcHRzID0ge3NyYzogb3B0c307XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV3IEZsYXNoKHJvb3QsIGV4dGVuZChleHRlbmQoe30sIEdMT0JBTF9PUFRTKSwgb3B0cyksIGNvbmYpO1xuICAgIH07XG5cbiAgICAvLyBmbGFzaGVtYmVkIFwic3RhdGljXCIgQVBJXG4gICAgdmFyIGYgPSBleHRlbmQod2luZG93LmZsYXNoZW1iZWQsIHtcblxuICAgICAgICBjb25mOiBHTE9CQUxfT1BUUyxcblxuICAgICAgICBnZXRWZXJzaW9uOiBmdW5jdGlvbigpICB7XG4gICAgICAgICAgICB2YXIgZm8sIHZlcjtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2ZXIgPSBuYXZpZ2F0b3IucGx1Z2luc1tcIlNob2Nrd2F2ZSBGbGFzaFwiXS5kZXNjcmlwdGlvbi5zbGljZSgxNik7XG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcblxuICAgICAgICAgICAgICAgIHRyeSAge1xuICAgICAgICAgICAgICAgICAgICBmbyA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2guN1wiKTtcbiAgICAgICAgICAgICAgICAgICAgdmVyID0gZm8gJiYgZm8uR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtcblxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyeSAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm8gPSBuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoLjZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXIgPSBmbyAmJiBmby5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGVycjIpIHsgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmVyID0gUkUuZXhlYyh2ZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHZlciA/IFt2ZXJbMV0sIHZlclszXV0gOiBbMCwgMF07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuXG4gICAgICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgICAgICAgICBpZiAodHlwZSA9PSAnb2JqZWN0JyAmJiBvYmoucHVzaCkgeyB0eXBlID0gJ2FycmF5JzsgfVxuXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpe1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqLnJlcGxhY2UobmV3IFJlZ0V4cCgnKFtcIlxcXFxcXFxcXSknLCAnZycpLCAnXFxcXCQxJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZmxhc2ggZG9lcyBub3QgaGFuZGxlICUtIGNoYXJhY3RlcnMgd2VsbC4gdHJhbnNmb3JtcyBcIjUwJVwiIHRvIFwiNTBwY3RcIiAoYSBkaXJ0eSBoYWNrLCBJIGFkbWl0KVxuICAgICAgICAgICAgICAgICAgICBvYmogPSBvYmoucmVwbGFjZSgvXlxccz8oXFxkK1xcLj9cXGQrKSUvLCBcIiQxcGN0XCIpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1wiJyArb2JqKyAnXCInO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1snKyBtYXAob2JqLCBmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYuYXNTdHJpbmcoZWwpO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsJykgKyddJztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcImZ1bmN0aW9uKClcIic7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goJ1wiJytwcm9wKydcIjonKyBmLmFzU3RyaW5nKG9ialtwcm9wXSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAneycrc3RyLmpvaW4oJywnKSsnfSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHJlcGxhY2UgJyAtLT4gXCIgIGFuZCByZW1vdmUgc3BhY2VzXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaikucmVwbGFjZSgvXFxzL2csIFwiIFwiKS5yZXBsYWNlKC9cXCcvZywgXCJcXFwiXCIpO1xuICAgICAgICB9LFxuXG4gICAgICAgIGdldEhUTUw6IGZ1bmN0aW9uKG9wdHMsIGNvbmYpIHtcblxuICAgICAgICAgICAgb3B0cyA9IGV4dGVuZCh7fSwgb3B0cyk7XG4gICAgICAgICAgICBvcHRzLmlkID0gb3B0cy5pZCArIChcIiBcIiArIE1hdGgucmFuZG9tKCkpLnNsaWNlKDkpO1xuXG4gICAgICAgICAgICAvKioqKioqKiBPQkpFQ1QgdGFnIGFuZCBpdCdzIGF0dHJpYnV0ZXMgKioqKioqKi9cbiAgICAgICAgICAgIHZhciBodG1sID0gJzxvYmplY3Qgd2lkdGg9XCInICsgb3B0cy53aWR0aCArXG4gICAgICAgICAgICAgICAgJ1wiIGhlaWdodD1cIicgKyBvcHRzLmhlaWdodCArXG4gICAgICAgICAgICAgICAgJ1wiIGlkPVwiJyArIG9wdHMuaWQgK1xuICAgICAgICAgICAgICAgICdcIiBuYW1lPVwiJyArIG9wdHMuaWQgKyAnXCInO1xuXG4gICAgICAgICAgICBpZiAob3B0cy5jYWNoZWJ1c3RpbmcpIHtcbiAgICAgICAgICAgICAgICBvcHRzLnNyYyArPSAoKG9wdHMuc3JjLmluZGV4T2YoXCI/XCIpICE9IC0xID8gXCImXCIgOiBcIj9cIikgKyBNYXRoLnJhbmRvbSgpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG9wdHMudzNjIHx8ICFJRSkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyBkYXRhPVwiJyArb3B0cy5zcmMrICdcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyBjbGFzc2lkPVwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCInO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBodG1sICs9ICc+JztcblxuICAgICAgICAgICAgLyoqKioqKiogbmVzdGVkIFBBUkFNIHRhZ3MgKioqKioqKi9cbiAgICAgICAgICAgIGlmIChvcHRzLnczYyB8fCBJRSkge1xuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIicgK29wdHMuc3JjKyAnXCIgLz4nO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBub3QgYWxsb3dlZCBwYXJhbXNcbiAgICAgICAgICAgIG9wdHMud2lkdGggPSBvcHRzLmhlaWdodCA9IG9wdHMuaWQgPSBvcHRzLnczYyA9IG9wdHMuc3JjID0gbnVsbDtcbiAgICAgICAgICAgIG9wdHMub25GYWlsID0gb3B0cy52ZXJzaW9uID0gb3B0cy5leHByZXNzSW5zdGFsbCA9IG51bGw7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9wdHNba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8cGFyYW0gbmFtZT1cIicrIGtleSArJ1wiIHZhbHVlPVwiJysgb3B0c1trZXldICsnXCIgLz4nO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLyoqKioqKiogRkxBU0hWQVJTICoqKioqKiovXG4gICAgICAgICAgICB2YXIgdmFycyA9IFwiXCI7XG5cbiAgICAgICAgICAgIGlmIChjb25mKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBjb25mKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25mW2tdICYmIGshPSdUb29sYmFyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNvbmZba107XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJzICs9IGsgKyc9JysgKC9mdW5jdGlvbnxvYmplY3QvLnRlc3QodHlwZW9mIHZhbCkgPyBmLmFzU3RyaW5nKHZhbCkgOiB2YWwpICsgJyYnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhcnMgPSB2YXJzLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8cGFyYW0gbmFtZT1cImZsYXNodmFyc1wiIHZhbHVlPVxcJycgKyB2YXJzICsgJ1xcJyAvPic7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L29iamVjdD5cIjtcblxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XG4gICAgICAgIH0sXG5cbiAgICAgICAgaXNTdXBwb3J0ZWQ6IGZ1bmN0aW9uKHZlcikge1xuICAgICAgICAgICAgcmV0dXJuIFZFUlNJT05bMF0gPiB2ZXJbMF0gfHwgVkVSU0lPTlswXSA9PSB2ZXJbMF0gJiYgVkVSU0lPTlsxXSA+PSB2ZXJbMV07XG4gICAgICAgIH1cblxuICAgIH0pO1xuXG4gICAgdmFyIFZFUlNJT04gPSBmLmdldFZlcnNpb24oKTtcblxuICAgIGZ1bmN0aW9uIEZsYXNoKHJvb3QsIG9wdHMsIGNvbmYpIHtcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgdmFyIGJyb3dzZXIgPSB7XG4gICAgICAgICAgICB2ZXJzaW9uOiAodXNlckFnZW50Lm1hdGNoKC8uKyg/OnJ2fGl0fHJhfGllKVtcXC86IF0oW1xcZC5dKykvKSB8fCBbXSlbMV0sXG4gICAgICAgICAgICBzYWZhcmk6IC93ZWJraXQvLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIG9wZXJhOiAvb3BlcmEvLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIG1zaWU6IC9tc2llLy50ZXN0KHVzZXJBZ2VudCkgJiYgIS9vcGVyYS8udGVzdCh1c2VyQWdlbnQpLFxuICAgICAgICAgICAgbW96aWxsYTogL21vemlsbGEvLnRlc3QodXNlckFnZW50KSAmJiAhLyhjb21wYXRpYmxlfHdlYmtpdCkvLnRlc3QodXNlckFnZW50KSxcbiAgICAgICAgICAgIGNocm9tZTogL2Nocm9tZS8udGVzdCh1c2VyQWdlbnQpXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gRGVmYXVsdCB0byBhIHJlbmRlcmluZyBtb2RlIGlmIGl0cyBub3Qgc2V0XG4gICAgICAgIGlmKCFjb25mLlJlbmRlcmluZ09yZGVyICYmIGNvbmYuU3dmRmlsZSAhPSAgbnVsbCl7Y29uZi5SZW5kZXJpbmdPcmRlciA9IFwiZmxhc2hcIjt9XG5cbiAgICAgICAgaWYoY29uZi5SZW5kZXJpbmdPcmRlci5pbmRleE9mKCdodG1sNScpPT0wKXtcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oJ1RoZSBGbGV4UGFwZXIgR1BMIHZlcnNpb24gZG9lcyBub3Qgc3VwcG9ydCBIVE1MNSByZW5kZXJpbmcuIERvIHlvdSB3YW50IHRvIG5hdmlnYXRlIHRvIG91ciBkb3dubG9hZCBwYWdlIGZvciBtb3JlIGRldGFpbHM/Jykpe2xvY2F0aW9uLmhyZWY9J2h0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb20vZG93bmxvYWQuanNwP3JlZj1GbGV4UGFwZXInfVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY29uZi5SZW5kZXJpbmdPcmRlci5pbmRleE9mKCdodG1sJyk9PTApe1xuICAgICAgICAgICAgaWYoY29uZmlybSgnVGhlIEZsZXhQYXBlciBHUEwgdmVyc2lvbiBkb2VzIG5vdCBzdXBwb3J0IEhUTUw0IHJlbmRlcmluZy4gRG8geW91IHdhbnQgdG8gbmF2aWdhdGUgdG8gb3VyIGRvd25sb2FkIHBhZ2UgZm9yIG1vcmUgZGV0YWlscz8nKSl7bG9jYXRpb24uaHJlZj0naHR0cDovL2ZsZXhwYXBlci5kZXZhbGRpLmNvbS9kb3dubG9hZC5qc3A/cmVmPUZsZXhQYXBlcid9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2ZXJzaW9uIGlzIG9rXG4gICAgICAgIGlmIChmLmlzU3VwcG9ydGVkKG9wdHMudmVyc2lvbikpIHtcbiAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID0gZi5nZXRIVE1MKG9wdHMsIGNvbmYpO1xuXG4gICAgICAgICAgICAvLyBleHByZXNzIGluc3RhbGxcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmV4cHJlc3NJbnN0YWxsICYmIGYuaXNTdXBwb3J0ZWQoWzYsIDY1XSkpIHtcbiAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID0gZi5nZXRIVE1MKGV4dGVuZChvcHRzLCB7c3JjOiBvcHRzLmV4cHJlc3NJbnN0YWxsfSksIHtcbiAgICAgICAgICAgICAgICBNTXJlZGlyZWN0VVJMOiBsb2NhdGlvbi5ocmVmLFxuICAgICAgICAgICAgICAgIE1NcGxheWVyVHlwZTogJ1BsdWdJbicsXG4gICAgICAgICAgICAgICAgTU1kb2N0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vdXNlIGh0bWwgdmlld2VyIG9yIGRpZVxuICAgICAgICAgICAgLy8gZmFpbCAjMi4xIGN1c3RvbSBjb250ZW50IGluc2lkZSBjb250YWluZXJcbiAgICAgICAgICAgIGlmICghcm9vdC5pbm5lckhUTUwucmVwbGFjZSgvXFxzL2csICcnKSkge1xuICAgICAgICAgICAgICAgIHZhciBwYWdlSG9zdCA9ICgoZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT0gXCJodHRwczpcIikgPyBcImh0dHBzOi8vXCIgOlx0XCJodHRwOi8vXCIpO1xuXG4gICAgICAgICAgICAgICAgcm9vdC5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICBcIjxoMj5Zb3VyIGJyb3dzZXIgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBGbGV4UGFwZXI8L2gyPlwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgzPlVwZ3JhZGUgdG8gYSBuZXdlciBicm93c2VyIG9yIGRvd25sb2FkIEFkb2JlIEZsYXNoIFBsYXllciAxMCBvciBoaWdoZXIuPC9oMz5cIiArXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxwPkNsaWNrIG9uIHRoZSBpY29uIGJlbG93IHRvIGRvd25sb2FkIHRoZSBsYXRlc3QgdmVyc2lvbiBvZiBBZG9iZSBGbGFzaFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInPjxpbWcgc3JjPSdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKyBwYWdlSG9zdCArIFwid3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcicgLz48L2E+XCI7XG5cbiAgICAgICAgICAgICAgICBpZiAocm9vdC50YWdOYW1lID09ICdBJykge1xuICAgICAgICAgICAgICAgICAgICByb290Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBVUkw7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBvbkZhaWxcbiAgICAgICAgICAgIGlmIChvcHRzLm9uRmFpbCkge1xuICAgICAgICAgICAgICAgIHZhciByZXQgPSBvcHRzLm9uRmFpbC5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ID09ICdzdHJpbmcnKSB7IHJvb3QuaW5uZXJIVE1MID0gcmV0OyB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBodHRwOi8vZmxvd3BsYXllci5vcmcvZm9ydW0vOC8xODE4NiNwb3N0LTE4NTkzXG4gICAgICAgIGlmIChJRSkge1xuICAgICAgICAgICAgd2luZG93W29wdHMuaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0cy5pZCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBUEkgbWV0aG9kcyBmb3IgY2FsbGJhY2tcbiAgICAgICAgZXh0ZW5kKHRoaXMsIHtcblxuICAgICAgICAgICAgZ2V0Um9vdDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRPcHRpb25zOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cztcbiAgICAgICAgICAgIH0sXG5cblxuICAgICAgICAgICAgZ2V0Q29uZjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmY7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBnZXRBcGk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByb290LmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gc2V0dXAganF1ZXJ5IHN1cHBvcnRcbiAgICBpZiAoSlFVRVJZKSB7XG4gICAgICAgIGpRdWVyeS5mbi5mbGFzaGVtYmVkID0gZnVuY3Rpb24ob3B0cywgY29uZikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZGF0YShcImZsYXNoZW1iZWRcIiwgZmxhc2hlbWJlZCh0aGlzLCBvcHRzLCBjb25mKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcblxuICAgICAgICBqUXVlcnkuZm4uRmxleFBhcGVyVmlld2VyID0gZnVuY3Rpb24oYXJncyl7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRmxleFBhcGVyVmlld2VyRW1iZWRkaW5nKHRoaXMuYXR0cignaWQnKSxhcmdzKTtcbiAgICAgICAgfTtcbiAgICB9ZWxzZXtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwialF1ZXJ5IG1pc3NpbmchXCIpO1xuICAgIH1cbn0pKCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvKipcbiDilojilpLilpPilpLilpEgVGhlIEZsZXhQYXBlciBQcm9qZWN0XG5cbiBUaGlzIGZpbGUgaXMgcGFydCBvZiBGbGV4UGFwZXIuXG5cbiBGbGV4UGFwZXIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLlxuXG4gRmxleFBhcGVyIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXG4gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cblxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gYWxvbmcgd2l0aCBGbGV4UGFwZXIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXG5cbiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBGbGV4UGFwZXIgcGxlYXNlIHNlZSB0aGUgRmxleFBhcGVyIHByb2plY3RcbiBob21lIHBhZ2U6IGh0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb21cbiAqL1xuXG4kKGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGV4dGVybmFsIGxpbmtzIGdldHRpbmcgY2xpY2tlZCBpbiB0aGUgZG9jdW1lbnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBvbkV4dGVybmFsTGlua0NsaWNrZWQoXCJodHRwOi8vd3d3Lmdvb2dsZS5jb21cIilcbiAgICAgKlxuICAgICAqIEBwYXJhbSBTdHJpbmcgbGlua1xuICAgICAqL1xuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25FeHRlcm5hbExpbmtDbGlja2VkJyxmdW5jdGlvbihlLGxpbmspe1xuICAgICAgICB3aW5kb3cub3BlbihsaW5rLCdfZmxleHBhcGVyX2V4dHVybCcpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmVjaWV2ZXMgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRvY3VtZW50IGJlaW5nIGxvYWRlZFxuICAgICAqXG4gICAgICogQGV4YW1wbGUgb25Qcm9ncmVzcyggMTAwLDEwMDAwICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW50IGxvYWRlZFxuICAgICAqIEBwYXJhbSBpbnQgdG90YWxcbiAgICAgKi9cbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uUHJvZ3Jlc3MnLGZ1bmN0aW9uKGUsbG9hZGVkQnl0ZXMsdG90YWxCeXRlcyl7XG5cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGEgZG9jdW1lbnQgaXMgaW4gcHJvZ3Jlc3Mgb2YgbG9hZGluZ1xuICAgICAqXG4gICAgICovXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50TG9hZGluZycsZnVuY3Rpb24oZSl7XG5cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGEgZG9jdW1lbnQgaXMgaW4gcHJvZ3Jlc3Mgb2YgbG9hZGluZ1xuICAgICAqXG4gICAgICovXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvblBhZ2VMb2FkaW5nJyxmdW5jdGlvbihlLHBhZ2VOdW1iZXIpe1xuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgY3VycmVudCBwYWdlIGJlaW5nIGNoYW5nZWRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIG9uQ3VycmVudFBhZ2VDaGFuZ2VkKCAxMCApO1xuICAgICAqXG4gICAgICogQHBhcmFtIGludCBwYWdlbnVtXG4gICAgICovXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkN1cnJlbnRQYWdlQ2hhbmdlZCcsZnVuY3Rpb24oZSxwYWdlbnVtKXtcblxuICAgICAgICAvLyBpZiBHQU51bWJlciBpcyBzdXBwbGllZCB0aGVuIGxldHMgdHJhY2sgdGhpcyBhcyBhIEdvb2dsZSBBbmFseXRpY3MgZXZlbnQuXG4gICAgICAgIGlmKGpRdWVyeSh0aGlzKS5kYXRhKCdUcmFja2luZ051bWJlcicpKXtcbiAgICAgICAgICAgIHZhciBfZ2FxID0gd2luZG93Ll9nYXEgfHwgW107d2luZG93Ll9nYXE9X2dhcTtcbiAgICAgICAgICAgIHZhciB0cmFja2luZ0RvYyA9IGpRdWVyeSh0aGlzKS5kYXRhKCdUcmFja2luZ0RvY3VtZW50Jyk7XG4gICAgICAgICAgICB2YXIgcGRmRmlsZU5hbWUgPSB0cmFja2luZ0RvYy5zdWJzdHIoMCx0cmFja2luZ0RvYy5pbmRleE9mKFwiLnBkZlwiKSs0KTtcblxuICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3NldEFjY291bnQnLCBqUXVlcnkodGhpcykuZGF0YSgnVHJhY2tpbmdOdW1iZXInKV0pO1xuICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAnUERGIERvY3VtZW50cycsICdQYWdlIFZpZXcnLCBwZGZGaWxlTmFtZSArICcgLSBwYWdlICcgKyBwYWdlbnVtXSk7XG5cbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ2EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgZ2EudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBnYS5hc3luYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTsgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnYSwgcyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgZG9jdW1lbnQgYmVpbmcgbG9hZGVkXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBvbkRvY3VtZW50TG9hZGVkKCAyMCApO1xuICAgICAqXG4gICAgICogQHBhcmFtIGludCB0b3RhbFBhZ2VzXG4gICAgICovXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50TG9hZGVkJyxmdW5jdGlvbihlLHRvdGFsUGFnZXMpe1xuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgcGFnZSBsb2FkZWRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIG9uUGFnZUxvYWRlZCggMSApO1xuICAgICAqXG4gICAgICogQHBhcmFtIGludCBwYWdlTnVtYmVyXG4gICAgICovXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvblBhZ2VMb2FkZWQnLGZ1bmN0aW9uKGUscGFnZU51bWJlcil7XG5cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJlY2VpdmVzIG1lc3NhZ2VzIGFib3V0IHRoZSBwYWdlIGxvYWRlZFxuICAgICAqXG4gICAgICogQGV4YW1wbGUgb25FcnJvckxvYWRpbmdQYWdlKCAxICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gaW50IHBhZ2VOdW1iZXJcbiAgICAgKi9cbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRXJyb3JMb2FkaW5nUGFnZScsZnVuY3Rpb24oZSxwYWdlTnVtYmVyKXtcblxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmVjZWl2ZXMgZXJyb3IgbWVzc2FnZXMgd2hlbiBhIGRvY3VtZW50IGlzIG5vdCBsb2FkaW5nIHByb3Blcmx5XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBvbkRvY3VtZW50TG9hZGVkRXJyb3IoIFwiTmV0d29yayBlcnJvclwiICk7XG4gICAgICpcbiAgICAgKiBAcGFyYW0gU3RyaW5nIGVycm9yTWVzc2FnZVxuICAgICAqL1xuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Eb2N1bWVudExvYWRlZEVycm9yJyxmdW5jdGlvbihlLGVyck1lc3NhZ2Upe1xuXG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZWNlaXZlcyBlcnJvciBtZXNzYWdlcyB3aGVuIGEgZG9jdW1lbnQgaGFzIGZpbmlzaGVkIHByaW50ZWRcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIG9uRG9jdW1lbnRQcmludGVkKCk7XG4gICAgICpcbiAgICAgKi9cbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRG9jdW1lbnRQcmludGVkJyxmdW5jdGlvbihlKXtcblxuICAgIH0pO1xufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXJfaGFuZGxlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCIvLyBWRVJTSU9OOiAyLjMgTEFTVCBVUERBVEU6IDExLjA3LjIwMTNcbi8qIFxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICogXG4gKiBNYWRlIGJ5IFdpbHEzMiwgd2lscTMyQGdtYWlsLmNvbSwgV3JvY2xhdywgUG9sYW5kLCAwMS4yMDA5XG4gKiBXZWJzaXRlOiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvanF1ZXJ5cm90YXRlLyBcbiAqL1xuXG4oZnVuY3Rpb24oJCkge1xuICAgIHZhciBzdXBwb3J0ZWRDU1Msc3VwcG9ydGVkQ1NTT3JpZ2luLCBzdHlsZXM9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLnN0eWxlLHRvQ2hlY2s9XCJ0cmFuc2Zvcm1Qcm9wZXJ0eSBXZWJraXRUcmFuc2Zvcm0gT1RyYW5zZm9ybSBtc1RyYW5zZm9ybSBNb3pUcmFuc2Zvcm1cIi5zcGxpdChcIiBcIik7XG4gICAgZm9yICh2YXIgYSA9IDA7IGEgPCB0b0NoZWNrLmxlbmd0aDsgYSsrKSBpZiAoc3R5bGVzW3RvQ2hlY2tbYV1dICE9PSB1bmRlZmluZWQpIHsgc3VwcG9ydGVkQ1NTID0gdG9DaGVja1thXTsgfVxuICAgIGlmIChzdXBwb3J0ZWRDU1MpIHtcbiAgICAgIHN1cHBvcnRlZENTU09yaWdpbiA9IHN1cHBvcnRlZENTUy5yZXBsYWNlKC9bdFRdcmFuc2Zvcm0vLFwiVHJhbnNmb3JtT3JpZ2luXCIpO1xuICAgICAgaWYgKHN1cHBvcnRlZENTU09yaWdpblswXSA9PSBcIlRcIikgc3VwcG9ydGVkQ1NTT3JpZ2luWzBdID0gXCJ0XCI7XG4gICAgfVxuXG4gICAgLy8gQmFkIGV2YWwgdG8gcHJldmVuIGdvb2dsZSBjbG9zdXJlIHRvIHJlbW92ZSBpdCBmcm9tIGNvZGUgb19PXG4gICAgZXZhbCgnSUUgPSBcInZcIj09XCJcXHZcIicpO1xuXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XG4gICAgICAgIHJvdGF0ZTpmdW5jdGlvbihwYXJhbWV0ZXJzKVxuICAgICAgICB7XG4gICAgICAgICAgaWYgKHRoaXMubGVuZ3RoPT09MHx8dHlwZW9mIHBhcmFtZXRlcnM9PVwidW5kZWZpbmVkXCIpIHJldHVybjtcbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtZXRlcnM9PVwibnVtYmVyXCIpIHBhcmFtZXRlcnM9e2FuZ2xlOnBhcmFtZXRlcnN9O1xuICAgICAgICAgIHZhciByZXR1cm5lZD1bXTtcbiAgICAgICAgICBmb3IgKHZhciBpPTAsaTA9dGhpcy5sZW5ndGg7aTxpMDtpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQ9dGhpcy5nZXQoaSk7XHRcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5XaWxxMzIgfHwgIWVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0KSB7XG5cbiAgICAgICAgICAgICAgdmFyIHBhcmFtQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcGFyYW1ldGVycyk7IFxuICAgICAgICAgICAgICB2YXIgbmV3Um90T2JqZWN0ID0gbmV3IFdpbHEzMi5QaG90b0VmZmVjdChlbGVtZW50LHBhcmFtQ2xvbmUpLl9yb290T2JqO1xuXG4gICAgICAgICAgICAgIHJldHVybmVkLnB1c2goJChuZXdSb3RPYmplY3QpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdC5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Um90YXRlQW5nbGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIHJldCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGk9MCxpMD10aGlzLmxlbmd0aDtpPGkwO2krKylcbiAgICAgICAgICB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudD10aGlzLmdldChpKTtcdFxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuV2lscTMyICYmIGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0KSB7XG4gICAgICAgICAgICAgIHJldFtpXSA9IGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0Ll9hbmdsZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgICAgfSxcbiAgICAgICAgc3RvcFJvdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICBmb3IgKHZhciBpPTAsaTA9dGhpcy5sZW5ndGg7aTxpMDtpKyspXG4gICAgICAgICAge1xuICAgICAgICAgICAgdmFyIGVsZW1lbnQ9dGhpcy5nZXQoaSk7XHRcbiAgICAgICAgICAgIGlmIChlbGVtZW50LldpbHEzMiAmJiBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdCkge1xuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QuX3RpbWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExpYnJhcnkgYWdub3N0aWMgaW50ZXJmYWNlXG5cbiAgICBXaWxxMzI9d2luZG93LldpbHEzMnx8e307XG4gICAgV2lscTMyLlBob3RvRWZmZWN0PShmdW5jdGlvbigpe1xuXG4gICAgICBpZiAoc3VwcG9ydGVkQ1NTKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpbWcscGFyYW1ldGVycyl7XG4gICAgICAgICAgaW1nLldpbHEzMiA9IHtcbiAgICAgICAgICAgIFBob3RvRWZmZWN0OiB0aGlzXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHRoaXMuX2ltZyA9IHRoaXMuX3Jvb3RPYmogPSB0aGlzLl9ldmVudE9iaiA9IGltZztcbiAgICAgICAgICB0aGlzLl9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGltZyxwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgdGhpcy5faW1nID0gaW1nO1xuICAgICAgICAgIHRoaXMuX29uTG9hZERlbGVnYXRlID0gW3BhcmFtZXRlcnNdO1xuXG4gICAgICAgICAgdGhpcy5fcm9vdE9iaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5kaXNwbGF5PVwiaW5saW5lLWJsb2NrXCI7XG4gICAgICAgICAgdGhpcy5fcm9vdE9iai5XaWxxMzIgPSBcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgUGhvdG9FZmZlY3Q6IHRoaXNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgaW1nLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3Jvb3RPYmosaW1nKTtcblxuICAgICAgICAgIGlmIChpbWcuY29tcGxldGUpIHtcbiAgICAgICAgICAgIHRoaXMuX0xvYWRlcigpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2VsZj10aGlzO1xuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGpRdWVyeSBkZXBlbmRlbmN5XG4gICAgICAgICAgICBqUXVlcnkodGhpcy5faW1nKS5iaW5kKFwibG9hZFwiLCBmdW5jdGlvbigpeyBzZWxmLl9Mb2FkZXIoKTsgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkoKTtcblxuICAgIFdpbHEzMi5QaG90b0VmZmVjdC5wcm90b3R5cGUgPSB7XG4gICAgICBfc2V0dXBQYXJhbWV0ZXJzIDogZnVuY3Rpb24gKHBhcmFtZXRlcnMpe1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzID0gdGhpcy5fcGFyYW1ldGVycyB8fCB7fTtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9hbmdsZSAhPT0gXCJudW1iZXJcIikgeyB0aGlzLl9hbmdsZSA9IDAgOyB9XG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1ldGVycy5hbmdsZT09PVwibnVtYmVyXCIpIHsgdGhpcy5fYW5nbGUgPSBwYXJhbWV0ZXJzLmFuZ2xlOyB9XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvID0gKHR5cGVvZiBwYXJhbWV0ZXJzLmFuaW1hdGVUbyA9PT0gXCJudW1iZXJcIikgPyAocGFyYW1ldGVycy5hbmltYXRlVG8pIDogKHRoaXMuX2FuZ2xlKTsgXG5cbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5zdGVwID0gcGFyYW1ldGVycy5zdGVwIHx8IHRoaXMuX3BhcmFtZXRlcnMuc3RlcCB8fCBudWxsO1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmVhc2luZyA9IHBhcmFtZXRlcnMuZWFzaW5nIHx8IHRoaXMuX3BhcmFtZXRlcnMuZWFzaW5nIHx8IHRoaXMuX2RlZmF1bHRFYXNpbmc7XG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb24gPSBwYXJhbWV0ZXJzLmR1cmF0aW9uIHx8IHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb24gfHwgMTAwMDtcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjayA9IHBhcmFtZXRlcnMuY2FsbGJhY2sgfHwgdGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjayB8fCB0aGlzLl9lbXB0eUZ1bmN0aW9uO1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlciA9IHBhcmFtZXRlcnMuY2VudGVyIHx8IHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyIHx8IFtcIjUwJVwiLFwiNTAlXCJdO1xuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzBdID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclggPSAocGFyc2VJbnQodGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMF0sMTApIC8gMTAwKSAqIHRoaXMuX2ltZ1dpZHRoICogdGhpcy5fYXNwZWN0VztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclggPSB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclswXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzFdID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclkgPSAocGFyc2VJbnQodGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMV0sMTApIC8gMTAwKSAqIHRoaXMuX2ltZ0hlaWdodCAqIHRoaXMuX2FzcGVjdEg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fcm90YXRpb25DZW50ZXJZID0gdGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1ldGVycy5iaW5kICYmIHBhcmFtZXRlcnMuYmluZCAhPSB0aGlzLl9wYXJhbWV0ZXJzLmJpbmQpIHsgdGhpcy5fQmluZEV2ZW50cyhwYXJhbWV0ZXJzLmJpbmQpOyB9XG4gICAgICB9LFxuICAgICAgX2VtcHR5RnVuY3Rpb246IGZ1bmN0aW9uKCl7fSxcbiAgICAgIF9kZWZhdWx0RWFzaW5nOiBmdW5jdGlvbiAoeCwgdCwgYiwgYywgZCkgeyByZXR1cm4gLWMgKiAoKHQ9dC9kLTEpKnQqdCp0IC0gMSkgKyBiIH0sIFxuICAgICAgX2hhbmRsZVJvdGF0aW9uIDogZnVuY3Rpb24ocGFyYW1ldGVycywgZG9udGNoZWNrKXtcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRDU1MgJiYgIXRoaXMuX2ltZy5jb21wbGV0ZSAmJiAhZG9udGNoZWNrKSB7XG4gICAgICAgICAgdGhpcy5fb25Mb2FkRGVsZWdhdGUucHVzaChwYXJhbWV0ZXJzKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc2V0dXBQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xuICAgICAgICBpZiAodGhpcy5fYW5nbGU9PXRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvKSB7XG4gICAgICAgICAgdGhpcy5fcm90YXRlKHRoaXMuX2FuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHsgXG4gICAgICAgICAgdGhpcy5fYW5pbWF0ZVN0YXJ0KCk7ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfQmluZEV2ZW50czpmdW5jdGlvbihldmVudHMpe1xuICAgICAgICBpZiAoZXZlbnRzICYmIHRoaXMuX2V2ZW50T2JqKSBcbiAgICAgICAge1xuICAgICAgICAgIC8vIFVuYmluZGluZyBwcmV2aW91cyBFdmVudHNcbiAgICAgICAgICBpZiAodGhpcy5fcGFyYW1ldGVycy5iaW5kKXtcbiAgICAgICAgICAgIHZhciBvbGRFdmVudHMgPSB0aGlzLl9wYXJhbWV0ZXJzLmJpbmQ7XG4gICAgICAgICAgICBmb3IgKHZhciBhIGluIG9sZEV2ZW50cykgaWYgKG9sZEV2ZW50cy5oYXNPd25Qcm9wZXJ0eShhKSkgXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBqUXVlcnkgZGVwZW5kZW5jeVxuICAgICAgICAgICAgICBqUXVlcnkodGhpcy5fZXZlbnRPYmopLnVuYmluZChhLG9sZEV2ZW50c1thXSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuYmluZCA9IGV2ZW50cztcbiAgICAgICAgZm9yICh2YXIgYSBpbiBldmVudHMpIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoYSkpIFxuICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBqUXVlcnkgZGVwZW5kZW5jeVxuICAgICAgICAgIGpRdWVyeSh0aGlzLl9ldmVudE9iaikuYmluZChhLGV2ZW50c1thXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIF9Mb2FkZXI6KGZ1bmN0aW9uKClcbiAgICAgIHtcbiAgICAgICAgaWYgKElFKVxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aD10aGlzLl9pbWcud2lkdGg7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0PXRoaXMuX2ltZy5oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9pbWdXaWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faW1nSGVpZ2h0ID0gaGVpZ2h0OyBcbiAgICAgICAgICAgIHRoaXMuX2ltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2ltZyk7XG5cbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZSA9IHRoaXMuY3JlYXRlVk1MTm9kZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zcmM9dGhpcy5faW1nLnNyYztcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS5oZWlnaHQ9aGVpZ2h0K1wicHhcIjtcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS53aWR0aD13aWR0aCtcInB4XCI7XG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiOyAvLyBGSVhFUyBJRSBQUk9CTEVNIC0gaXRzIG9ubHkgcmVuZGVyZWQgaWYgaXRzIG9uIGFic29sdXRlIHBvc2l0aW9uIVxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLnRvcCA9IFwiMHB4XCI7XG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUubGVmdCA9IFwiMHB4XCI7XG4gICAgICAgICAgICB0aGlzLl9hc3BlY3RXID0gdGhpcy5fYXNwZWN0SCA9IDE7XG5cbiAgICAgICAgICAgIC8qIEdyb3VwIG1pbmlmeWluZyBhIHNtYWxsIDFweCBwcmVjaXNpb24gcHJvYmxlbSB3aGVuIHJvdGF0aW5nIG9iamVjdCAqL1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5jcmVhdGVWTUxOb2RlKCdncm91cCcpO1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLndpZHRoPXdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmhlaWdodD1oZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiO1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLnRvcD1cIjBweFwiO1xuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmxlZnQ9XCIwcHhcIjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2Nvb3Jkc2l6ZScsd2lkdGgtMSsnLCcrKGhlaWdodC0xKSk7IC8vIFRoaXMgLTEsIC0xIHRyeWluZyB0byBmaXggdWdseSBwcm9ibGVtIHdpdGggc21hbGwgZGlzcGxhY2VtZW50IG9uIElFXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fdmltYWdlKTtcblxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCI7IC8vIEZJWEVTIElFIFBST0JMRU1cbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUud2lkdGg9d2lkdGgrXCJweFwiO1xuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5oZWlnaHQ9aGVpZ2h0K1wicHhcIjtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc2V0QXR0cmlidXRlKCdpZCcsdGhpcy5faW1nLmdldEF0dHJpYnV0ZSgnaWQnKSk7XG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmNsYXNzTmFtZT10aGlzLl9pbWcuY2xhc3NOYW1lO1x0XHRcdFxuICAgICAgICAgICAgdGhpcy5fZXZlbnRPYmogPSB0aGlzLl9yb290T2JqO1x0XG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycztcbiAgICAgICAgICAgIHdoaWxlIChwYXJhbWV0ZXJzID0gdGhpcy5fb25Mb2FkRGVsZWdhdGUuc2hpZnQoKSkge1xuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzLCB0cnVlKTtcdFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnNldEF0dHJpYnV0ZSgnaWQnLHRoaXMuX2ltZy5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5jbGFzc05hbWU9dGhpcy5faW1nLmNsYXNzTmFtZTtcblxuICAgICAgICAgICAgdGhpcy5faW1nV2lkdGg9dGhpcy5faW1nLm5hdHVyYWxXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2ltZ0hlaWdodD10aGlzLl9pbWcubmF0dXJhbEhlaWdodDtcbiAgICAgICAgICAgIHZhciBfd2lkdGhNYXg9TWF0aC5zcXJ0KCh0aGlzLl9pbWdIZWlnaHQpKih0aGlzLl9pbWdIZWlnaHQpICsgKHRoaXMuX2ltZ1dpZHRoKSAqICh0aGlzLl9pbWdXaWR0aCkpO1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBfd2lkdGhNYXggKiAzO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gX3dpZHRoTWF4ICogMztcblxuICAgICAgICAgICAgdGhpcy5fYXNwZWN0VyA9IHRoaXMuX2ltZy5vZmZzZXRXaWR0aC90aGlzLl9pbWcubmF0dXJhbFdpZHRoO1xuICAgICAgICAgICAgdGhpcy5fYXNwZWN0SCA9IHRoaXMuX2ltZy5vZmZzZXRIZWlnaHQvdGhpcy5faW1nLm5hdHVyYWxIZWlnaHQ7XG5cbiAgICAgICAgICAgIHRoaXMuX2ltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2ltZyk7XHRcblxuXG4gICAgICAgICAgICB0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5fd2lkdGgpO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIjtcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gLXRoaXMuX2ltZy5oZWlnaHQgKiB0aGlzLl9hc3BlY3RXICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IC10aGlzLl9pbWcud2lkdGggKiB0aGlzLl9hc3BlY3RIICsgXCJweFwiO1xuICAgICAgICAgICAgdGhpcy5fY2FudmFzLldpbHEzMiA9IHRoaXMuX3Jvb3RPYmouV2lscTMyO1xuXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLndpZHRoPXRoaXMuX2ltZy53aWR0aCp0aGlzLl9hc3BlY3RXK1wicHhcIjtcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUuaGVpZ2h0PXRoaXMuX2ltZy5oZWlnaHQqdGhpcy5fYXNwZWN0SCtcInB4XCI7XG4gICAgICAgICAgICB0aGlzLl9ldmVudE9iaiA9IHRoaXMuX2NhbnZhcztcblxuICAgICAgICAgICAgdGhpcy5fY252PXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnM7XG4gICAgICAgICAgICB3aGlsZSAocGFyYW1ldGVycyA9IHRoaXMuX29uTG9hZERlbGVnYXRlLnNoaWZ0KCkpIHtcbiAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycywgdHJ1ZSk7XHRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9KSgpLFxuXG4gICAgICBfYW5pbWF0ZVN0YXJ0OmZ1bmN0aW9uKClcbiAgICAgIHtcdFxuICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FuaW1hdGVTdGFydFRpbWUgPSArbmV3IERhdGU7XG4gICAgICAgIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlID0gdGhpcy5fYW5nbGU7XG4gICAgICAgIHRoaXMuX2FuaW1hdGUoKTtcbiAgICAgIH0sXG4gICAgICBfYW5pbWF0ZTpmdW5jdGlvbigpXG4gICAgICB7XG4gICAgICAgIHZhciBhY3R1YWxUaW1lID0gK25ldyBEYXRlO1xuICAgICAgICB2YXIgY2hlY2tFbmQgPSBhY3R1YWxUaW1lIC0gdGhpcy5fYW5pbWF0ZVN0YXJ0VGltZSA+IHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb247XG5cbiAgICAgICAgLy8gVE9ETzogQnVnIGZvciBhbmltYXRlZEdpZiBmb3Igc3RhdGljIHJvdGF0aW9uID8gKHRvIHRlc3QpXG4gICAgICAgIGlmIChjaGVja0VuZCAmJiAhdGhpcy5fcGFyYW1ldGVycy5hbmltYXRlZEdpZikgXG4gICAgICAgIHtcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgXG4gICAgICAgIHtcbiAgICAgICAgICBpZiAodGhpcy5fY2FudmFzfHx0aGlzLl92aW1hZ2V8fHRoaXMuX2ltZykge1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5fcGFyYW1ldGVycy5lYXNpbmcoMCwgYWN0dWFsVGltZSAtIHRoaXMuX2FuaW1hdGVTdGFydFRpbWUsIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlLCB0aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVUbyAtIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlLCB0aGlzLl9wYXJhbWV0ZXJzLmR1cmF0aW9uKTtcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZSgofn4oYW5nbGUqMTApKS8xMCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9wYXJhbWV0ZXJzLnN0ZXApIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuc3RlcCh0aGlzLl9hbmdsZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKVxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHNlbGYuX2FuaW1hdGUuY2FsbChzZWxmKTtcbiAgICAgICAgICB9LCAxMCk7XG4gICAgICAgIH1cblxuICAgICAgLy8gVG8gZml4IEJ1ZyB0aGF0IHByZXZlbnRzIHVzaW5nIHJlY3Vyc2l2ZSBmdW5jdGlvbiBpbiBjYWxsYmFjayBJIG1vdmVkIHRoaXMgZnVuY3Rpb24gdG8gYmFja1xuICAgICAgaWYgKHRoaXMuX3BhcmFtZXRlcnMuY2FsbGJhY2sgJiYgY2hlY2tFbmQpe1xuICAgICAgICB0aGlzLl9hbmdsZSA9IHRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvO1xuICAgICAgICB0aGlzLl9yb3RhdGUodGhpcy5fYW5nbGUpO1xuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmNhbGxiYWNrLmNhbGwodGhpcy5fcm9vdE9iaik7XG4gICAgICB9XG4gICAgICB9LFxuXG4gICAgICBfcm90YXRlIDogKGZ1bmN0aW9uKClcbiAgICAgIHtcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguUEkvMTgwO1xuICAgICAgICBpZiAoSUUpXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFuZ2xlKVxuICAgICAgICB7XG4gICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUucm90YXRpb249KGFuZ2xlJTM2MCkrXCJkZWdcIjtcbiAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUudG9wID0gLSh0aGlzLl9yb3RhdGlvbkNlbnRlclkgLSB0aGlzLl9pbWdIZWlnaHQvMikgKyBcInB4XCI7XG4gICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLmxlZnQgPSAtKHRoaXMuX3JvdGF0aW9uQ2VudGVyWCAtIHRoaXMuX2ltZ1dpZHRoLzIpICsgXCJweFwiO1xuICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS50b3AgPSB0aGlzLl9yb3RhdGlvbkNlbnRlclkgLSB0aGlzLl9pbWdIZWlnaHQvMiArIFwicHhcIjtcbiAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuX3JvdGF0aW9uQ2VudGVyWCAtIHRoaXMuX2ltZ1dpZHRoLzIgKyBcInB4XCI7XG5cbiAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHN1cHBvcnRlZENTUylcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYW5nbGUpe1xuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgIHRoaXMuX2ltZy5zdHlsZVtzdXBwb3J0ZWRDU1NdPVwicm90YXRlKFwiKyhhbmdsZSUzNjApK1wiZGVnKVwiO1xuICAgICAgICAgICAgdGhpcy5faW1nLnN0eWxlW3N1cHBvcnRlZENTU09yaWdpbl09dGhpcy5fcGFyYW1ldGVycy5jZW50ZXIuam9pbihcIiBcIik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYW5nbGUpXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcbiAgICAgICAgICAgIGFuZ2xlPShhbmdsZSUzNjApKiByYWQ7XG4gICAgICAgICAgICAvLyBjbGVhciBjYW52YXNcdFxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7Ly8rdGhpcy5fd2lkdGhBZGQ7XG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0Oy8vK3RoaXMuX2hlaWdodEFkZDtcblxuICAgICAgICAgICAgLy8gUkVNRU1CRVI6IGFsbCBkcmF3aW5ncyBhcmUgcmVhZCBmcm9tIGJhY2t3YXJkcy4uIHNvIGZpcnN0IGZ1bmN0aW9uIGlzIHRyYW5zbGF0ZSwgdGhlbiByb3RhdGUsIHRoZW4gdHJhbnNsYXRlLCB0cmFuc2xhdGUuLlxuICAgICAgICAgICAgdGhpcy5fY252LnRyYW5zbGF0ZSh0aGlzLl9pbWdXaWR0aCp0aGlzLl9hc3BlY3RXLHRoaXMuX2ltZ0hlaWdodCp0aGlzLl9hc3BlY3RIKTtcdC8vIGF0IGxlYXN0IGNlbnRlciBpbWFnZSBvbiBzY3JlZW5cbiAgICAgICAgICAgIHRoaXMuX2Nudi50cmFuc2xhdGUodGhpcy5fcm90YXRpb25DZW50ZXJYLHRoaXMuX3JvdGF0aW9uQ2VudGVyWSk7XHRcdFx0Ly8gd2UgbW92ZSBpbWFnZSBiYWNrIHRvIGl0cyBvcmdpbmFsIFxuICAgICAgICAgICAgdGhpcy5fY252LnJvdGF0ZShhbmdsZSk7XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyByb3RhdGUgaW1hZ2VcbiAgICAgICAgICAgIHRoaXMuX2Nudi50cmFuc2xhdGUoLXRoaXMuX3JvdGF0aW9uQ2VudGVyWCwtdGhpcy5fcm90YXRpb25DZW50ZXJZKTtcdFx0Ly8gbW92ZSBpbWFnZSB0byBpdHMgY2VudGVyLCBzbyB3ZSBjYW4gcm90YXRlIGFyb3VuZCBpdHMgY2VudGVyXG4gICAgICAgICAgICB0aGlzLl9jbnYuc2NhbGUodGhpcy5fYXNwZWN0Vyx0aGlzLl9hc3BlY3RIKTsgLy8gU0NBTEUgLSBpZiBuZWVkZWQgOylcbiAgICAgICAgICAgIHRoaXMuX2Nudi5kcmF3SW1hZ2UodGhpcy5faW1nLCAwLCAwKTtcdFx0XHRcdFx0XHRcdC8vIEZpcnN0IC0gd2UgZHJhdyBpbWFnZVxuICAgICAgICAgIH1cblxuICAgICAgfSkoKVxuICAgICAgfVxuXG4gICAgICBpZiAoSUUpXG4gICAgICB7XG4gICAgICAgIFdpbHEzMi5QaG90b0VmZmVjdC5wcm90b3R5cGUuY3JlYXRlVk1MTm9kZT0oZnVuY3Rpb24oKXtcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KCkuYWRkUnVsZShcIi5ydm1sXCIsIFwiYmVoYXZpb3I6dXJsKCNkZWZhdWx0I1ZNTClcIik7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICFkb2N1bWVudC5uYW1lc3BhY2VzLnJ2bWwgJiYgZG9jdW1lbnQubmFtZXNwYWNlcy5hZGQoXCJydm1sXCIsIFwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWxcIik7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxydm1sOicgKyB0YWdOYW1lICsgJyBjbGFzcz1cInJ2bWxcIj4nKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lKSB7XG4gICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8JyArIHRhZ05hbWUgKyAnIHhtbG5zPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LmNvbTp2bWxcIiBjbGFzcz1cInJ2bWxcIj4nKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVx0XHRcbiAgICAgICAgfSkoKTtcbiAgICAgIH1cblxufSkoalF1ZXJ5KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL2pxLnJvdGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIi8v5Li76aKY5YiX6KGoXG52YXIgc0xpc3QgPSB7fSxcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnN1YmplY3QsXG5cdGNnaSxcblx0dG1wbCxcblx0c3RhcnQgPSAwLFxuXHRsaW1pdCA9IDIwO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNMaXN0O1xuXG5zTGlzdC5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcblx0Y2dpID0gbW9kdWxlO1xuXHR0bXBsID0gdG1wO1xufVxuXG5zTGlzdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYil7XG5cdGNnaS5zZWFyY2goe1xuXHRcdHN0YXJ0IDogc3RhcnQsXG5cdFx0bGltaXQgOiBsaW1pdFxuXHR9LGNiKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsIi8v5ouJ5Li76aKY5YaF5a65XG52YXIgc0luZm8gPSB7fTtcbnZhciBjZ2ksXG5cdHRtcGwsXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKTtcbm1vZHVsZS5leHBvcnRzID0gc0luZm87XG5cbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XG5cbnZhciBzdWJEb20gPSAkKFwiI3N1YmplY3RIZWFkXCIpO1xudmFyIHN1YkFzaWRlRG9tID0gJChcIiNzdWJqZWN0QXNpZGVcIik7XG52YXIgcG9zdEFyZWEgPSAkKFwiI3Bvc3RBcnRpY2xlXCIpO1xuXG5zSW5mby5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcblx0Y2dpID0gbW9kdWxlO1xuXHR0bXBsID0gdG1wO1xufVxuXG4vL+aLieWPluS4gOS4quS4u+mimOeahOWGheWuuVxuLy8gc0luZm8uaW5mbyA9IGZ1bmN0aW9uKGlkLGNiKXtcbi8vIFx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xuLy8gXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcbi8vIFx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcbi8vIFx0XHRcdHN1YkRvbS5odG1sKGh0bWwpO1xuLy8gXHRcdH1cbi8vIFx0fSlcbi8vIH1cblxudmFyIGluZm8gPSBmdW5jdGlvbihpZCl7XG5cdHRoaXMuc2lkID0gaWQ7XG5cdHRoaXMuZG9tID0gc3ViRG9tO1xuXHR0aGlzLmFzaWRlRG9tID0gc3ViQXNpZGVEb207XG5cdHRoaXMuZ2V0RGF0YSgpO1xuXHR0aGlzLmJpbmRBY3Rpb24oKTtcblx0dGhpcy5mb2xsb3dCdG47IC8v5YWz5rOo5oyJ6ZKuXG5cdHRoaXMubWFuYWdlQnRuOyAvL+euoeeQhuaMiemSrlxuXHR0aGlzLnRpbWVCdG47ICAgLy/mjInml7bpl7TmjpLluo9cblx0dGhpcy51cGRhdGVCdG47IC8v5oyJ5pu05paw5pe26Ze05o6S5bqPXG5cblx0dGhpcy5kYXRhID0ge307XG5cblx0dGhpcy5fc2VsZWN0RG9tO1xuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcbn1cblxuc0luZm8uaW5mbyA9IGluZm87XG5cbi8v5Yig6Zmk5Li76aKY55u45YWz6LWE5rqQXG5pbmZvLnByb3RvdHlwZS5kZWxldGVSZXNvdXJjZSA9IGZ1bmN0aW9uKGUpe1xuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcblx0aWYoaWQpe1xuXHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpei1hOa6kD8nLG51bGwsZnVuY3Rpb24oKXtcblx0XHRcdHZhciBwYXJhbSA9IHtcblx0XHRcdFx0c3ViamVjdElkIDogX3RoaXMuc2lkLFxuXHRcdFx0XHRyZXNvdXJjZUlkIDogaWRcblx0XHRcdH1cblx0XHRcdGNnaS5kZWxyZXNvdXJjZShwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRcdFx0JChcIi5zdWItcmVzb3VyY2UtXCIraWQpLnJlbW92ZSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxufTtcblxuLy/miorlhbbku5bnmoTlr7nosaHnmoTlvJXnlKjkvKDov5vmnaUuXG5pbmZvLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcblx0dGhpcy5wb3N0ID0gb2JqLnBvc3Q7XG59XG5cbmluZm8ucHJvdG90eXBlLm1hbmFnZSA9IGZ1bmN0aW9uKCl7XG5cdHRoaXMucG9zdC5lZGl0KHRoaXMuZGF0YSk7XG59XG5cbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXG5pbmZvLnByb3RvdHlwZS5yZXZpZXcgPSBmdW5jdGlvbihlKXtcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XG5cblx0aWYoaWQpe1xuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XG5cdFx0XHRpZCA6IGlkLFxuXHRcdFx0bGlzdCA6IHRoaXMuZGF0YS5yZXNvdXJjZUxpc3Rcblx0XHR9KVxuXHR9XG59O1xuXG5pbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcblx0dmFyIF90aGlzID0gdGhpcztcblx0c3RyaWtlci5iaW5kKCdzdWJqZWN0VXBkYXRlJyxmdW5jdGlvbihlLGQpe1xuXHRcdF90aGlzLmRhdGEgPSBkO1xuXHRcdHZhciBodG1sID0gdG1wbC5oZWFkKGQpO1xuXHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xuXG5cdFx0cmVzLmRhdGEubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xuXHRcdHZhciBodG1sID0gdG1wbC5hc2lkZShkKTtcblx0XHRcblx0XHRfdGhpcy5hc2lkZURvbS5odG1sKGh0bWwpO1x0XHRcdFxuXHR9KTtcblxuXHRcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xuXHRcdH1cblx0fSk7XG5cblx0dGhpcy5hc2lkZURvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XG5cdFx0fVxuXHR9KTtcdFx0XHRcbn1cblxuLy/mi4nljZXkuKrluJblrZBcbmluZm8ucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xuXHR2YXIgaWQgPSB0aGlzLnNpZDtcblx0dmFyIF90aGlzID0gdGhpcztcblx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdHZhciBodG1sID0gdG1wbC5oZWFkKHJlcy5kYXRhKTtcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xuXG5cdFx0XHRyZXMuZGF0YS5teSA9IGRhdGEudXNlci5teUluZm87XG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUocmVzLmRhdGEpO1xuXHRcdFx0X3RoaXMuZGF0YSA9IHJlcy5kYXRhO1xuXHRcdFx0X3RoaXMuYXNpZGVEb20uaHRtbChodG1sKTtcblxuXHRcdFx0X3RoaXMuZm9sbG93QnRuID0gX3RoaXMuZG9tLmZpbmQoJy5mb2xsb3ctYnRuJyk7XG5cdFx0XHRfdGhpcy5tYW5hZ2VCdG4gPSBfdGhpcy5kb20uZmluZCgnLm1hbmFnZS1idG4nKVxuXHRcdFx0X3RoaXMudGltZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudGltZS1idG4nKVxuXHRcdFx0X3RoaXMudXBkYXRlQnRuID0gX3RoaXMuZG9tLmZpbmQoJy51cGRhdGUtYnRuJylcblx0XHR9XG5cdH0pXHRcbn1cblxuLy/lhbPms6jljZXkuKrluJblrZBcbmluZm8ucHJvdG90eXBlLmZvbGxvdyA9IGZ1bmN0aW9uKCl7XG5cdHZhciBpZCA9IHRoaXMuc2lkXG5cdFx0Zm9sbG93ID0gMTtcblx0dmFyIF90aGlzID0gdGhpcztcblxuXHQvL+WIpOaWreaYr+WQpuW3sue7j2ZvbGxvd+S6hi5cblx0aWYodGhpcy5mb2xsb3dCdG4uaGFzQ2xhc3MoJ2ZvbGxvd2VkJykpe1xuXHRcdGZvbGxvdyA9IDA7XG5cdH1cblxuXHRjZ2kuZm9sbG93KHtzdWJqZWN0SWQ6aWQsaXNGb2xsb3c6Zm9sbG93fSxmdW5jdGlvbihyZXMpe1xuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdGlmKGZvbGxvdyl7XG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5hZGRDbGFzcygnZm9sbG93ZWQnKS5odG1sKCc8c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lt7LlhbPms6gnKTtcblx0XHRcdH1lbHNle1xuXHRcdFx0XHRfdGhpcy5mb2xsb3dCdG4ucmVtb3ZlQ2xhc3MoJ2ZvbGxvd2VkJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+5YWz5rOoJyk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3QvaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsIi8v5Li76aKY5Yib5bu6LOWIoOmZpOetieaTjeS9nFxudmFyIGRhdGE7XG52YXIgc0NyZWF0ZSA9IHt9O1xudmFyIGNnaSxcblx0dG1wbDtcbm1vZHVsZS5leHBvcnRzID0gc0NyZWF0ZTtcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XG5cbnNDcmVhdGUuaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XG5cdGNnaSA9IG1vZHVsZTtcblx0dG1wbCA9IHRtcDtcbn1cblxuc0NyZWF0ZS5jcmVhdGUgPSBmdW5jdGlvbihpZCl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0dGhpcy5zdWJJZCA9IGlkO1xuXG5cdC8v6buY6K6k5L2/55So5oiR55qE5Li76aKYXG5cdHRoaXMudHlwZSA9ICdteVN1YmplY3QnO1xuXHR0aGlzLmlzZWRpdCA9IGZhbHNlO1xuXHR0aGlzLmVkaXREYXRhID0ge307XG5cblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xuXG5cdC8v6L+Z6YeM6ICD6JmR5LiL6KaB5LiN6KaB5Lyg5Y+C5oyH5a6aZG9tO1xuXHR0aGlzLmRvbSA9ICQoXCIjY3JlYXRlU3ViamVjdFwiKTtcblx0dGhpcy50aXRsZURvbSA9IHRoaXMuZG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xuXHRcblx0Ly/lm7rlrprnmoRpZFxuXHR0aGlzLnJlc0RvbSA9ICQoXCIjbm93UmVzXCIpO1xuXG5cdC8v5oqK55So5oi35YiX6KGo5ZOq5YS/5Yib5bu65LiA5LiLLlxuXHQvL2NvbnNvbGUubG9nKHN0cmlrZXIudXNlcik7XHRcblx0dmFyIG1hbmFnZSA9IG5ldyB3aW5kb3cuc3RyaWtlci51c2VyLm1hbmFnZSgnbWFuYWdlQXJlYScpO1xuXHR0aGlzLm1hbmFnZSA9IG1hbmFnZTtcblx0dGhpcy5sYWJlbCA9IHdpbmRvdy5zdHJpa2VyLmxhYmVsO1xuXG5cdHRoaXMuZG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcblx0XHRfdGhpcy50aXRsZURvbS50ZXh0KCfmlrDlu7rkuLvpopgnKTtcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG5cdFx0XHQkKFwiI3N1YmplY3RUaXRsZVwiKS5mb2N1cygpO1x0XG5cdFx0fSwxMDAwKVxuXHRcdFxuXHRcdG1hbmFnZS5pbml0KCk7XG5cdH0pO1xuXG5cdHRoaXMuZG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcblx0XHQvL3N0cmlrZXIudXNlci5hZGREZWZNYW5hZ2UoKTtcblx0XHRfdGhpcy5yZXNEb20uaHRtbCgnJykuaGlkZSgpO1xuXHRcdF90aGlzLm1hbmFnZS5jbGVhcigpO1xuXHRcdF90aGlzLmxhYmVsLmNsZWFyKCk7XG5cdFx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcblx0fSk7XHRcblxuXHQvL+i1hOa6kOWIl+ihqFxuXHR0aGlzLnJlc0xpc3QgPSBbXSxcblx0dGhpcy5yZXNNYXAgPSB7fTtcblxuXHQvL+W9k+WJjeiiq+mAieS4reeahOWFg+e0oFxuXHR0aGlzLl9zZWxlY3REb207XG5cblx0dGhpcy5iaW5kQWN0aW9uKCk7XG59XG5cbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5jaGFuZ2VUeXBlID0gZnVuY3Rpb24odHlwZSl7XG5cdHRoaXMudHlwZSA9ICd0eXBlJ1xufVxuXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xuXHQvL3RoaXMudHlwZSA9ICd0eXBlJztcblx0dGhpcy50aXRsZURvbS50ZXh0KCfkv67mlLnluJblrZAnKTtcblx0JChcIiNzdWJqZWN0VGl0bGVcIikudmFsKGRhdGEudGl0bGUpLFxuXHQkKFwiI3N1YmplY3RNYXJrXCIpLnZhbChkYXRhLm1hcmspLFxuXHQkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnLGRhdGEucHJpdmF0ZSk7XG5cdCQoXCIjc3ViamVjdEd1ZXN0XCIpLnByb3AoJ2NoZWNrZWQnLGRhdGEuZ3Vlc3QpO1xuXHR0aGlzLmVkaXREYXRhID0gZGF0YTtcblxuXHQvL+aKiueuoeeQhuWRmOaYvuekuuWHuuadpSzosozkvLzmlbDmja7kuI3mlK/mjIE/XG5cdHRoaXMuaXNlZGl0ID0gdHJ1ZTtcblxuXHQvL+aKiuagh+etvuaYvuekuuWHuuadpVxuXHR0aGlzLmxhYmVsLnNob3dFZGl0KGRhdGEubGFiZWxzKTtcblxuXHQvL+aKiui1hOa6kOWKoOi/m+adpVxuXHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xuXHRcdGxpc3QgOiBkYXRhLnJlc291cmNlTGlzdFxuXHR9KTtcblx0dGhpcy5yZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxufVxuXG5cbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XG5cblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xuXHRpZihpZCl7XG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcblx0XHRwLnJlbW92ZSgpO1xuXHRcdGlmKHRoaXMucmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xuXHRcdFx0dGhpcy5yZXNEb20uaGlkZSgpO1xuXHRcdH1cdFx0XG5cdH1cbn1cblxuLy/lj5bpgInmi6nnmoTotYTmupBcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcblx0dmFyIGxpc3QgPSBbXTtcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xuXHR9XG5cdHJldHVybiBsaXN0O1xufVxuXG4vL+WPlumAieS4reeahOagh+etvlxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XG5cdHJldHVybiB0aGlzLmxhYmVsLmdldExhYmVsTGlzdCgpO1xufVxuXG4vL+WPlumAieS4reeahOeuoeeQhui/nFxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1hbmFnZUxpc3QgPSBmdW5jdGlvbigpe1xuXHRyZXR1cm4gdGhpcy5tYW5hZ2UuZ2V0TWFuYWdlTGlzdCgpO1xufVxuXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xuXHQkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoJycpO1xuXHQkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgnJylcbn1cblxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihwYXJhbSxjYil7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cblx0Ly/otYTmupDkuIrkvKDlrozmiJDnmoTpgJrnn6Vcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcblx0XHRpZihfdGhpcy5zdWJJZCAmJiAhX3RoaXMuaXNlZGl0KXtcblx0XHRcdHN0cmlrZXIudHJpZ2dlcigndXBsb2FkQXJ0aWNsZScsZCk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xuXHRcdGlmKGQuY29kZSA9PT0gMCl7XG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xuXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cblx0XHRcdH0pO1xuXHRcdFx0X3RoaXMucmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XG5cdFx0fVxuXHR9XG5cblx0Ly/op6blj5HkuIrkvKBcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XG5cblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XG5cdFx0fVxuXHR9KVx0XG5cblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKSxcblx0XHRcdHR5cGUgPSB0YXJnZXQuZGF0YSgndHlwZScpO1xuXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcblxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0aWYodHlwZSA9PT0gJ3N1Ym1pdCcpe1xuXHRcdFx0dmFyIHRpdCA9ICQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgpLFxuXHRcdFx0XHRtYXJrID0gJChcIiNzdWJqZWN0TWFya1wiKS52YWwoKSxcblx0XHRcdFx0b3BlbiA9ICQoXCIjc3ViamVjdE9wZW5cIikucHJvcCgnY2hlY2tlZCcpPzE6MCxcblx0XHRcdFx0Z3Vlc3QgPSAkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyk/MTowO1xuXG5cdFx0XHRpZih0aXQgPT0gJycpe1xuXHRcdFx0XHRhbGVydCgn6L+Y5rKh5pyJ5aGr5YaZ5qCH6aKYJyk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHBhcmFtID0ge1xuXHRcdFx0XHR0aXRsZSA6IHRpdCxcblx0XHRcdFx0bWFyayA6IG1hcmssXG5cdFx0XHRcdHByaXZhdGUgOiBvcGVuLFxuXHRcdFx0XHRndWVzdCA6IGd1ZXN0LFxuXHRcdFx0XHRtZW1iZXJzIDogX3RoaXMuZ2V0TWFuYWdlTGlzdCgpLFxuXHRcdFx0XHRzdWJqZWN0TGFiZWxzIDogX3RoaXMuZ2V0TGFiZWxMaXN0KCksXG5cdFx0XHRcdGFydGljbGVMYWJlbHMgOiBbXSxcblx0XHRcdFx0cmVzb3VyY2VzIDogX3RoaXMuZ2V0UmVzTGlzdCgpXG5cdFx0XHR9XHRcdFxuXHRcdFx0XG5cdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xuXHRcdFx0XHRwYXJhbS5zdWJqZWN0SWQgPSBfdGhpcy5lZGl0RGF0YS5pZDtcblx0XHRcdH1cblxuXHRcdFx0aWYodGhpcy5sb2FkaW5nKXtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHRpZihwYXJhbS50aXRsZSAhPT0gJycgJiYgcGFyYW0ubWFyayAhPT0gJycpe1xuXHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0XHRcdFx0aWYoX3RoaXMuaXNlZGl0KXtcblx0XHRcdFx0XHRjZ2kuZWRpdChwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcblx0XHRcdFx0XHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RVcGRhdGUnLHJlcy5kYXRhKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdFx0XHRcdFx0X3RoaXMuZG9tLm1vZGFsKCdoaWRlJyk7XG5cdFx0XHRcdFx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xuXHRcdFx0XHRcdFx0XHRcdGxpc3QgOiBbcmVzLmRhdGFdXG5cdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xuXHRcdFx0XHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ3N1YmplY3RDcmVhdGVkJyk7XG5cdFx0XHRcdFx0XHRcdCQoXCIjbXlTdWJqZWN0XCIpLnByZXBlbmQoaHRtbCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxuXHRcdFx0XHR9XG5cblx0XHRcdH1cblx0XHR9XG5cblx0fSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2NyZWF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsIi8v5Li76aKY5YiX6KGoXG52YXIgYUxpc3QgPSB7fSxcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxuXHRjZ2ksXG5cdHRtcGwsXG5cdG5vd1N1YklkID0gMCxcblx0bG9hZGluZyA9IGZhbHNlO1xuXHRzdGFydCA9IDAsXG5cdGxpbWl0ID0gMjA7XG5cbm1vZHVsZS5leHBvcnRzID0gYUxpc3Q7XG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xuXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XG5cdG5vd1N1YklkID0gaWQ7XG5cdGNnaSA9IG1vZHVsZTtcblx0dG1wbCA9IHRtcDtcblxuXHQvL3JldHVybiBuZXcgYXJ0aWNsZSgpO1xufVxuXG5mdW5jdGlvbiBhcnRpY2xlKCl7XG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcblx0dGhpcy5zdGFydCA9IDAsXG5cdHRoaXMubGltaXQgPSAyMDtcblx0dGhpcy50b3RhbCA9IDA7XG5cdHRoaXMubGVuZ3RoID0gMDtcblx0dGhpcy5lbmQgPSBmYWxzZTtcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XG5cblx0dGhpcy5zdWJpZCA9IG5vd1N1YklkO1xuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcblxuXHR0aGlzLnJkYXRhID0ge307XG5cblx0dGhpcy5iaW5kQWN0aW9uKCk7XG5cdHRoaXMuc2VhcmNoKCk7XG59XG5cbi8v5oqK5Zue5aSN55u45YWz55qE5Lic5Lic57uR5a6a6L+b5p2lXG5hcnRpY2xlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcblx0dGhpcy5jb21tZW50UG9zdCA9IG9iai5wb3N0O1xufVxuXG4vL+iuoeeul+WbvueJh+eahOS4quaVsFxuYXJ0aWNsZS5wcm90b3R5cGUuZ2V0aW1nID0gZnVuY3Rpb24oZGF0YSl7XG5cdHZhciBudW0gPSAwO1xuXHRpZihkYXRhKXtcblx0XHRmb3IodmFyIGkgPTAsbD1kYXRhLmxlbmd0aDtpPGw7aSsrKXtcblx0XHRcdHZhciBpdGVtID0gZGF0YVtpXTtcblx0XHRcdGlmKGl0ZW0udHlwZSA9PT0gMSl7XG5cdFx0XHRcdG51bSsrO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gbnVtO1xufVxuXG4vL+e7keWumuS6i+S7tlxuYXJ0aWNsZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XG5cdHZhciBfdGhpcyA9IHRoaXM7XG5cdHN0cmlrZXIuYmluZCgnbmV3YXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcblx0XHRfdGhpcy5wcmVwZW5kVG9MaXN0KGQpO1xuXHR9KVxuXG4gICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSBzY3JvbGxEb20uc2Nyb2xsVG9wO1xuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcblxuICAgICAgICAvL+WIpOaWreaYr+WQpuWIsOW6leS6hlxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcbiAgICAgICAgICAgIF90aGlzLmxvYWRNb3JlKCk7XG4gICAgICAgIH0gICAgICAgICAgICAgICAgXG4gICAgfSk7XHRcblxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xuXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcblx0XHR9XG5cdH0pICAgIFxufVxuXG4vL+WKoOi9veabtOWkmlxuYXJ0aWNsZS5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xuXHRpZih0aGlzLmxvYWRpbmcgfHwgdGhpcy5lbmQpe1xuXHRcdHJldHVybjtcblx0fVxuXHR0aGlzLnNlYXJjaCh7XG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxuXHRcdG9yZGVyYnkgOiAnY3JlYXRlVGltZSdcblx0fSk7XG59XG5cbmFydGljbGUucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xuXHR2YXIgbGlzdCA9IFtdO1xuXHRmb3IodmFyIGkgPSAwLGw9ZGF0YS5saXN0Lmxlbmd0aDtpPGw7aSsrKXtcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcblx0XHRpdGVtLmltZ251bSA9IHRoaXMuZ2V0aW1nKGl0ZW0ucmVzb3VyY2UpO1xuXHRcdHRoaXMucmRhdGFbaXRlbS5pZF0gPSBpdGVtLnJlc291cmNlO1xuXHRcdGxpc3QucHVzaChpdGVtKTtcblx0fVxuXHRkYXRhLmxpc3QgPSBsaXN0O1xuXHRkYXRhLnNpZCA9IG5vd1N1YklkO1xuXHRyZXR1cm4gZGF0YTtcbn1cblxuLy/mi4nluJblrZDliJfooahcbmFydGljbGUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtKXtcblx0dmFyIF90aGlzID0gdGhpcztcblx0aWYodGhpcy5sb2FkaW5nKXtcblx0XHRyZXR1cm47XG5cdH1cblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcblx0aWYoIXBhcmFtKXtcblx0XHRwYXJhbSA9IHtcblx0XHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcblx0XHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXG5cdFx0XHRvcmRlcmJ5IDogJ2NyZWF0ZVRpbWUnXG5cdFx0fVxuXHR9XG5cblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdFxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdF90aGlzLnRvdGFsID0gcmVzLmRhdGEudG90YWw7XG5cdFx0XHRfdGhpcy5sZW5ndGggKz0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcblxuXHRcdFx0dmFyIGRhdGEgPSBfdGhpcy5jaGVja0RhdGEocmVzLmRhdGEpO1xuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QoZGF0YSk7XG5cblx0XHRcdGlmKHJlcy5kYXRhLnRvcC5sZW5ndGgpe1xuXHRcdFx0XHR2YXIgaHRtbDEgPSB0bXBsLnRvcCh7XG5cdFx0XHRcdFx0bGlzdCA6IHJlcy5kYXRhLnRvcFxuXHRcdFx0XHR9KVxuXHRcdFx0XHQkKFwiI2FydGljbGVUb3BcIikuaHRtbChodG1sMSk7XG5cdFx0XHR9XG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xuXHRcdFx0aWYoX3RoaXMubGVuZ3RoID49IF90aGlzLnRvdGFsKXtcblx0XHRcdFx0X3RoaXMuZW5kID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1x0XG59XG5cbmFydGljbGUucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKXtcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xuXG5cdGlmKCFzdGFyKXtcblx0XHRzdGFyID0gMDtcblx0fVxuXG5cdGlmKGlkKXtcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XG5cdFx0dmFyIHBhcmFtID0ge1xuXHRcdFx0YXJ0aWNsZUlkIDogaWQsXG5cdFx0XHRpc1N0YXIgOiBzdGFyID8gMCA6MVxuXHRcdH07XG5cdFx0dmFyIHRleHQgPSBzdGFyPyfotZ4nOiflt7LotZ4nO1xuXHRcdGNnaS5zdGFyKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzU3Rhcik7XG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5hcnRpY2xlLnByb3RvdHlwZS5jb2xsZWN0ID0gZnVuY3Rpb24oKXtcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcblxuXHRpZihpZCl7XG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xuXHRcdHZhciBwYXJhbSA9IHtcblx0XHRcdGFydGljbGVJZCA6IGlkXG5cdFx0fTtcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xuXHRcdFx0XHRkb20uYXR0cignZGF0YS1pZCcsMCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuYXJ0aWNsZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24oKXtcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcblxuXHRpZihpZCl7XG5cblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeW4luWtkD8nLG51bGwsZnVuY3Rpb24oKXtcblx0XHRcdHZhciBwYXJhbSA9IHtcblx0XHRcdFx0YXJ0aWNsZUlkIDogaWRcblx0XHRcdH07XG5cdFx0XHRjZ2lbJ2RlbGV0ZSddKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdFx0XHQkKFwiLmFydGljbGVcIitpZCkucmVtb3ZlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG59XG5cbmFydGljbGUucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKCl7XG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XG5cdGlmKGlkKXtcblx0XHR0aGlzLmNvbW1lbnRQb3N0LnNob3dQb3N0KGlkKTtcblx0fVxufVxuXG4vL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxuYXJ0aWNsZS5wcm90b3R5cGUucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKHBhcmFtKXtcblx0dmFyIGRhdGEgPSB0aGlzLmNoZWNrRGF0YSh7bGlzdDpbcGFyYW1dfSk7XG5cdHZhciBodG1sID0gdG1wbC5saXN0KGRhdGEpO1xuXG5cdHRoaXMuZG9tLnByZXBlbmQoaHRtbCk7XG59XG5cbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXG5hcnRpY2xlLnByb3RvdHlwZS5yZXZpZXcgPSBmdW5jdGlvbihlKXtcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxuXHRcdHBpZCA9IHRhcmdldC5kYXRhKCdwaWQnKSxcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xuXG5cdGlmKGlkKXtcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ3Jldmlldycse1xuXHRcdFx0aWQgOiBpZCxcblx0XHRcdGxpc3QgOiB0aGlzLnJkYXRhW3BpZF1cblx0XHR9KVxuXHR9XG59O1xuXG4vLyAvL+aKiuaWsOWPkeW4g+eahOW4luWtkOWKoOWIsOWIl+ihqOacgOWJjemdolxuLy8gYUxpc3QucHJlcGVuZFRvTGlzdCA9IGZ1bmN0aW9uKHBhcmFtKXtcbi8vIFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcGFyYW1dfSk7XG4vLyBcdFx0bGlzdERvbS5wcmVwZW5kKGh0bWwpO1xuLy8gfVxuXG5hTGlzdC5hcnRpY2xlID0gYXJ0aWNsZTtcblxuLy/liqDovb3mm7TlpJrmlbDmja5cbi8qXG5hTGlzdC5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XG5cdGNvbnNvbGUubG9nKHRoaXMuZW5kKTtcblx0aWYobG9hZGluZyB8fCB0aGlzLmVuZCl7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGFMaXN0LnNlYXJjaCh7XG5cdFx0c3RhcnQgOiBzdGFydCxcblx0XHRsaW1pdCA6IGxpbWl0LFxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkXG5cdH0pXG59XG5cblxuXG4vL+aQnOe0ouaVsOaNrlxuYUxpc3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0pe1xuXHRsb2FkaW5nID0gdHJ1ZTtcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcblx0XHRcdF90aGlzLnRvdGFsID0gcmVzLnRvdGFsO1xuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xuXHRcdFx0c3RhcnQgKz0gbGltaXQ7XG5cdFx0XHRsb2FkaW5nID0gZmFsc2U7XG5cdFx0XHRsaXN0RG9tLmFwcGVuZChodG1sKTtcblx0XHR9ZWxzZXtcblxuXHRcdH1cblxuXHR9KTtcbn1cbiovXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJmdW5jdGlvbiBlbXB0eUZ1bihyZXMpe1xuXHRjb25zb2xlLmxvZyhyZXMpO1xufVxuXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcblx0fVx0XG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcblx0fVxuXHRhamF4KHtcblx0XHR1cmwgOiB1cmwsXG5cdFx0dHlwZSA6ICdQT1NUJyxcblx0XHRkYXRhIDogcGFyYW0sXG5cdH0sY2FsbGJhY2spO1xuXG59XG5cbmZ1bmN0aW9uIGdldCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XG5cdH1cdFxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xuXHRcdGVycm9yID0gY2FsbGJhY2s7XG5cdH1cblx0YWpheCh7XG5cdFx0dXJsIDogdXJsLFxuXHRcdHR5cGUgOiAnR0VUJyxcblx0XHRkYXRhIDogcGFyYW0sXG5cdH0sY2FsbGJhY2spO1xufVxuXG5mdW5jdGlvbiBhamF4KG9wdCxjYWxsYmFjayxlcnJvcil7XG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXG5cdFx0dXJsID0gb3B0LnVybCxcblx0XHRkYXRhID0gb3B0LmRhdGE7XG5cblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xuXHR9XG5cblx0JC5hamF4KHtcblx0XHR0eXBlIDogdHlwZSxcblx0XHR1cmwgOiB1cmwsXG5cdFx0ZGF0YSA6IGRhdGEsXG5cdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKHJlcyl7XG5cdFx0XHRjYWxsYmFjayhyZXMpO1xuXHRcdH0sXG5cdFx0ZXJyb3IgOiBmdW5jdGlvbihyZXMpe1xuXHRcdFx0ZXJyb3IocmVzKTtcblx0XHR9XG5cdH0pXG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRhamF4IDogYWpheCxcblx0cG9zdCA6IHBvc3QsXG5cdGdldCA6IGdldFxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxuJT5cXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGU8JS1pdGVtLmlkJT5cIj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3JOYW1lJT48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxuICAgICAgICAgIDwlXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxuICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXG4gICAgICAgICAgJT5cXG4gICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiBkYXRhLXBpZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgPCVcXG4gICAgICAgICAgICAgICAgaWYoZmlyc3Qpe1xcbiAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XFxuICAgICAgICAgICAgICAlPlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxPCUtaXRlbS5pbWdudW0lPuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIDwlfSU+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwlfX0lPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8JX0lPlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGUnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgXCIgICDmnIDlkI7lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0udXBkYXRvck5hbWUpLCAnPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5zdWJqZWN0X2lkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1nbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBpdGVtLnJlc291cmNlLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDI2LCBvYmouaWQpLCAnXCIgZGF0YS1waWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAyNiwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIG9iai5pZCksICdcIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPjwlLW5hbWUlPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgPCVcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcbiAgJT4gXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcbiAgPCV9JT5cXG4gIDwvdWw+XFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXG5cdGZvcih2YXIgaSBpbiBsaXN0KXtcXG5cdHZhciBpdGVtID0gbGlzdFtpXTtcXG5cdHZhciBvYmogPSBKU09OLnBhcnNlKGl0ZW0ud2l0aERhdGEpO1xcblx0Y29uc29sZS5sb2cob2JqKTtcXG4lPlxcbjxsaSB0aXRsZT1cIjwlLWl0ZW0ubWVzc2FnZSU+XCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLW9iai5hcnRpY2xlSWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLXJlYWQ9XCI8JS1pdGVtLnJlYWQlPlwiPjwlLWl0ZW0ubWVzc2FnZSU+PC9hPjwvbGk+XFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ubWVzc2FnZSksICdcIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNywgb2JqLmFydGljbGVJZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5pZCksICdcIiBkYXRhLXJlYWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnJlYWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5tZXNzYWdlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21zZy5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcbiU+XFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcblx0XHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG5cdFx0JywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jlc291cmNlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWNsb3NlXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmV2aWV3XCIgaWQ9XCJyZXZpZXdEaXZcIj5cXG5cdFx0PC9kaXY+ICBcXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtc2VsZWN0LWJsb2NrXCIgaWQ9XCJyZXZpZXdCbG9ja1wiPlxcblx0XHQ8L2Rpdj4gIFxcblx0XHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWJnXCI+PC9kaXY+XFxuXHQ8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcdDxkaXYgY2xhc3M9XCJyZXZpZXctY2xvc2VcIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZXZpZXdcIiBpZD1cInJldmlld0RpdlwiPlxcblx0XHQ8L2Rpdj4gIFxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1zZWxlY3QtYmxvY2tcIiBpZD1cInJldmlld0Jsb2NrXCI+XFxuXHRcdDwvZGl2PiAgXFxuXHRcdDxkaXYgY2xhc3M9XCJyZXZpZXctYmdcIj48L2Rpdj5cXG5cdDwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiYWwtYXJyb3dcIiB0aXRsYT1cIuS4iuS4gOS4quaWh+S7tlwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2PlxcbjwlXFxuXHRpZih0eXBlID09IDEpe1xcbiU+XFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWltZy1ibG9ja1wiPlxcblx0XHQ8aW1nIGlkPVwicmV2aWV3SW1nXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWlkJT5cIiBhbGlnbj1cImFic21pZGRsZVwiIC8+XFxuXHQ8L2Rpdj5cXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcblx0XHRcdDxkbD5cXG5cdFx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXG5cdFx0XHRcdDxkZD5cXG5cdFx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXG5cdFx0XHRcdFx05pe26Ze0OiA8JS1jcmVhdGVUaW1lJT5cXG5cdFx0XHRcdDwvZGQ+XFxuXHRcdFx0PC9kbD5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1hY3RcIj5cdFx0XHRcXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tbGVmdFwiPuW3pui9rDwvc3Bhbj5cXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tcmlnaHRcIj7lj7Povaw8L3NwYW4+XFxuXHRcdFx0PC9kaXY+XFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdC1iZ1wiPjwvZGl2Plxcblx0XHQ8L2Rpdj5cdFxcbjwlfWVsc2UgaWYodHlwZSA9PSAyKXslPlxcblx0PGRpdiBpZD1cImRvY3VtZW50Vmlld2VyXCIgY2xhc3M9XCJmbGV4cGFwZXJfdmlld2VyXCI+XFxuXHRcdFxcblx0PC9kaXY+XFxuPCV9ZWxzZSBpZih0eXBlID09IDMgfHwgdHlwZT09NCl7JT5cXG5cdDxkaXYgY2xhc3M9XCJwbGF5ZXJab25lXCI+XFxuXHQgIDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiIGNvbnRyb2xzIHByZWxvYWQ9XCJub25lXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjRcIlxcblx0ICAgICAgcG9zdGVyPVwiaHR0cDovL3ZpZGVvLWpzLnplbmNvZGVyLmNvbS9vY2VhbnMtY2xpcC5wbmdcIlxcblx0ICAgICAgZGF0YS1zZXR1cD1cInt9XCI+XFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtaWQlPlwiIHR5cGU9XFwndmlkZW8vbXA0XFwnIC8+XFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtaWQlPlwiIHR5cGU9XFwndmlkZW8vd2VibVxcJyAvPlxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWlkJT5cIiB0eXBlPVxcJ3ZpZGVvL29nZ1xcJyAvPlxcblx0ICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJzdWJ0aXRsZXNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxuXHQgIDwvdmlkZW8+XFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxkbD5cXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOjwlLW5hbWUlPjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXG5cdFx0XHRcdOaXtumXtDogPCUtY3JlYXRlVGltZSU+XFxuXHRcdFx0PC9kZD5cXG5cdFx0PC9kbD5cXG5cdDwvZGl2Plxcblxcblx0PC9kaXY+XFxuPCV9ZWxzZSBpZih0eXBlID09IDgpeyU+XFxuXHQ8ZGl2IGNsYXNzPVwidGV4dC1yZXZpZXdcIj48JS10ZXh0JT48L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXG5cdFx0XHQ8ZGQ+XFxuXHRcdFx0XHTmlofku7blpKflsI86IDwlLXNpemUlPlxcblx0XHRcdFx05pe26Ze0OiA8JS10aW1lJT5cXG5cdFx0XHQ8L2RkPlxcblx0XHQ8L2RsPlxcblx0PC9kaXY+XHRcXG48JX1lbHNleyU+XFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxpIGNsYXNzPVwiaWNvbi10eXBlPCUtdHlwZSU+XCI+PC9pPlxcblx0XHQ8ZGw+XFxuXHRcdFx0PGR0PuaWh+S7tuWQjTo8JS1uYW1lJT48L2R0Plxcblx0XHRcdDxkZD5cXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogPCUtc2l6ZSU+XFxuXHRcdFx0XHTml7bpl7Q6IDwlLWNyZWF0ZVRpbWUlPlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cdFxcbjwlfSU+XFxuPGRpdiBjbGFzcz1cImFyLWFycm93XCIgdGl0bGE9XCLkuIvkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImFsLWFycm93XCIgdGl0bGE9XCLkuIrkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXG4nKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWltZy1ibG9ja1wiPlxcblx0XHQ8aW1nIGlkPVwicmV2aWV3SW1nXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIGlkKSwgJ1wiIGFsaWduPVwiYWJzbWlkZGxlXCIgLz5cXG5cdDwvZGl2Plxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdFx0PGRsPlxcblx0XHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSAxMCwgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHRcdDxkZD5cXG5cdFx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gMTIsIHNpemUpLCBcIlxcblx0XHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSAxMywgY3JlYXRlVGltZSksICdcXG5cdFx0XHRcdDwvZGQ+XFxuXHRcdFx0PC9kbD5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1hY3RcIj5cdFx0XHRcXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tbGVmdFwiPuW3pui9rDwvc3Bhbj5cXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tcmlnaHRcIj7lj7Povaw8L3NwYW4+XFxuXHRcdFx0PC9kaXY+XFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdC1iZ1wiPjwvZGl2Plxcblx0XHQ8L2Rpdj5cdFxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgaWQ9XCJkb2N1bWVudFZpZXdlclwiIGNsYXNzPVwiZmxleHBhcGVyX3ZpZXdlclwiPlxcblx0XHRcXG5cdDwvZGl2PlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI2O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAzIHx8IHR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwicGxheWVyWm9uZVwiPlxcblx0ICA8dmlkZW8gaWQ9XCJleGFtcGxlX3ZpZGVvXzFcIiBjbGFzcz1cInZpZGVvLWpzIHZqcy1kZWZhdWx0LXNraW5cIiBjb250cm9scyBwcmVsb2FkPVwibm9uZVwiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjY0XCJcXG5cdCAgICAgIHBvc3Rlcj1cImh0dHA6Ly92aWRlby1qcy56ZW5jb2Rlci5jb20vb2NlYW5zLWNsaXAucG5nXCJcXG5cdCAgICAgIGRhdGEtc2V0dXA9XCJ7fVwiPlxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpZCksIFwiXFxcIiB0eXBlPSd2aWRlby9tcDQnIC8+XFxuXHQgICAgPHNvdXJjZSBzcmM9XFxcIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD1cIiwgKF9fc3RhY2subGluZW5vID0gMzIsIGlkKSwgXCJcXFwiIHR5cGU9J3ZpZGVvL3dlYm0nIC8+XFxuXHQgICAgPHNvdXJjZSBzcmM9XFxcIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD1cIiwgKF9fc3RhY2subGluZW5vID0gMzMsIGlkKSwgJ1wiIHR5cGU9XFwndmlkZW8vb2dnXFwnIC8+XFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJjYXB0aW9uc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXG5cdCAgICA8dHJhY2sga2luZD1cInN1YnRpdGxlc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXG5cdCAgPC92aWRlbz5cXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gMzksIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gNDEsIHNpemUpLCBcIlxcblx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gNDIsIGNyZWF0ZVRpbWUpLCBcIlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cXG5cXG5cdDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0ODtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwidGV4dC1yZXZpZXdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA0OSwgdGV4dCksICc8L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gNTIsIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gNTQsIHNpemUpLCBcIlxcblx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gNTUsIHRpbWUpLCBcIlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cdFxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA1OTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxpIGNsYXNzPVwiaWNvbi10eXBlJywgKF9fc3RhY2subGluZW5vID0gNjEsIHR5cGUpLCAnXCI+PC9pPlxcblx0XHQ8ZGw+XFxuXHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSA2MywgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHQ8ZGQ+XFxuXHRcdFx0XHTmlofku7blpKflsI86IFwiLCAoX19zdGFjay5saW5lbm8gPSA2NSwgc2l6ZSksIFwiXFxuXHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSA2NiwgY3JlYXRlVGltZSksIFwiXFxuXHRcdFx0PC9kZD5cXG5cdFx0PC9kbD5cXG5cdDwvZGl2Plx0XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDcwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGRpdiBjbGFzcz1cImFyLWFycm93XCIgdGl0bGE9XCLkuIvkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmV2aWV3L21haW4uZWpzXG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJ1x0PGRpdiBjbGFzcz1cImFsLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJyZXZpZXctbGlzdC1ibG9ja1wiPlxcblx0XHQ8dWwgaWQ9XCJyZXZpZXdGaWxlTGlzdFwiPlxcblxcblx0XHQ8JVxcblx0XHR2YXIgaWR4ID0gMDtcXG5cdFx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxuXHRcdCU+XFxuXHRcdFx0PGxpIGlkPVwicmV2aWV3PCUtaXRlbS5pZCU+XCIgIGRhdGEtaWR4PVwiPCUtaWR4JT5cIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIDwlaWYoaXRlbS5pZCA9PT0gaWQpeyU+Y2xhc3M9XCJzZWxlY3RlZFwiPCV9JT4gdGl0bGU9XCI8JS1pdGVtLm5hbWUlPlwiPlxcblx0XHRcdDwlaWYoaXRlbS50eXBlPT09MSl7JT5cXG5cdFx0XHRcdDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWl0ZW0uaWQlPlwiIGRhdGEtaWR4PVwiPCUtaWR4JT5cIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIC8+XFxuXHRcdFx0PCV9ZWxzZXslPlxcblx0XHRcdFx0PGkgY2xhc3M9XCJmZG5hbWU8JS1pdGVtLmlkJT4gaWNvbi10eXBlXCIgZGF0YS1pZHg9XCI8JS1pZHglPlwiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PC9pPlxcblx0XHRcdDwlfSU+XFxuXHRcdFx0PC9saT5cXG5cdFx0PCVcXG5cdFx0XHRcdGlkeCsrO1xcblx0XHRcdH1cXG5cdFx0JT5cXG5cdFx0PC91bD5cXG5cdDwvZGl2Plxcblx0PGRpdiBjbGFzcz1cImFyLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXHQ8ZGl2IGNsYXNzPVwiYWwtYXJyb3ctcFwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cInJldmlldy1saXN0LWJsb2NrXCI+XFxuXHRcdDx1bCBpZD1cInJldmlld0ZpbGVMaXN0XCI+XFxuXFxuXHRcdCcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHRcdFx0PGxpIGlkPVwicmV2aWV3JywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtaWR4PVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGlkeCksICdcIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdjbGFzcz1cInNlbGVjdGVkXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLm5hbWUpLCAnXCI+XFxuXHRcdFx0Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0XHRcdDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWR4PVwiJywgKF9fc3RhY2subGluZW5vID0gMTIsIGlkeCksICdcIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgJ1wiIC8+XFxuXHRcdFx0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0XHRcdFx0PGkgY2xhc3M9XCJmZG5hbWUnLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5pZCksICcgaWNvbi10eXBlXCIgZGF0YS1pZHg9XCInLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaWR4KSwgJ1wiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0uaWQpLCAnXCI+PC9pPlxcblx0XHRcdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcblx0XHRcdDwvbGk+XFxuXHRcdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0PC91bD5cXG5cdDwvZGl2Plxcblx0PGRpdiBjbGFzcz1cImFyLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmV2aWV3L2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXG4lPlxcbjxsaSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0PCUtaXRlbS5uYW1lJT5cXG48L2xpPlxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCBcIlxcbjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcbiU+XFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbDwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXG5cdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICA8aGVhZGVyIGNsYXNzPVwiaGVhZGVyLXRvcFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItbGVmdFwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJmdWktdXNlclwiPjwlLXByb1RleHQlPjwvc3Bhbj5cXG4gICAgICAgIDwlaWYocHJvVGV4dD09PVxcJ+aIkeWIm+W7uueahFxcJyl7JT5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmdWktcGx1c1wiICBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiIGRhdGEtYWN0aW9uPVwiY3JlYXRlXCI+5Yib5bu65Li76aKYPC9hPjwvc3Bhbj5cXG4gICAgICAgIDwlfSU+XFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1yaWdodFwiPlxcbiAgICAgICAg5YWxPHNwYW4gaWQ9XCI8JS1wcm9OYW1lJT5OdW1cIj4yMDwvc3Bhbj7kuKrkuLvpopggPGEgY2xhc3M9XCJwcmUtcGFnZVwiIGRhdGEtYWN0aW9uPVwicHJlXCI+5LiK5LiA6aG1PC9hPiA8YSBjbGFzcz1cIm5leHQtcGFnZVwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPuS4i+S4gOmhtTwvYT5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdGltZSBhY3RpdmVcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGVcIiAgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93LWRvd25cIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgXFxuICAgIDwvaGVhZGVyPlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saXN0XCIgaWQ9XCI8JS1wcm9OYW1lJT5cIj5cXG4gICAgICAgICAgICAgICAgIFxcbiAgICA8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlci10b3BcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWxlZnRcIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLXVzZXJcIj4nLCAoX19zdGFjay5saW5lbm8gPSAzLCBwcm9UZXh0KSwgXCI8L3NwYW4+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIGlmIChwcm9UZXh0ID09PSBcIuaIkeWIm+W7uueahFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmdWktcGx1c1wiICBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiIGRhdGEtYWN0aW9uPVwiY3JlYXRlXCI+5Yib5bu65Li76aKYPC9hPjwvc3Bhbj5cXG4gICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICA8L2Rpdj5cXG5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLXJpZ2h0XCI+XFxuICAgICAgICDlhbE8c3BhbiBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBwcm9OYW1lKSwgJ051bVwiPjIwPC9zcGFuPuS4quS4u+mimCA8YSBjbGFzcz1cInByZS1wYWdlXCIgZGF0YS1hY3Rpb249XCJwcmVcIj7kuIrkuIDpobU8L2E+IDxhIGNsYXNzPVwibmV4dC1wYWdlXCIgZGF0YS1hY3Rpb249XCJuZXh0XCI+5LiL5LiA6aG1PC9hPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB0aW1lIGFjdGl2ZVwiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZVwiICBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiYXJyb3ctZG93blwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L3NwYW4+XFxuICAgICAgPC9kaXY+ICAgICBcXG4gICAgPC9oZWFkZXI+XFxuXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2xlLWxpc3RcIiBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE5LCBwcm9OYW1lKSwgJ1wiPlxcbiAgICAgICAgICAgICAgICAgXFxuICAgIDwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgIDwlXFxuICAgIFx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcbiAgICBcdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcbiAgICAlPlxcbiAgICAgIDxkbCBjbGFzcz1cImFydC1saXN0XCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+5Yib5bu65Lq6IDwlLWl0ZW0uY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSU+IOacgOi/keabtOaWsCA8JS1zdHJpa2VyLnV0aWwuZm9ybWF0VGltZShpdGVtLnVwZGF0ZVRpbWUpJT4g5Li76aKY6LWE5rqQIDwlLWl0ZW0ucmVzb3VyY2VDb3VudCU+IDwlLWl0ZW0ubWVtYmVyQ291bnQlPuS4quaIkOWRmCA8JS1pdGVtLnVwZGF0b3IlPuS4quW4luWtkCA8JS1pdGVtLnJlc291cmNlQ291bnQlPuS4qui1hOa6kDwvZGQ+XFxuICAgICAgPC9kbD4gXFxuICAgIDwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICBcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLmlkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPuWIm+W7uuS6uiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiIOWIm+W7uuaXtumXtCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS51cGRhdGVUaW1lKSksIFwiIOS4u+mimOi1hOa6kCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5yZXNvdXJjZUNvdW50KSwgXCIgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ubWVtYmVyQ291bnQpLCBcIuS4quaIkOWRmCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yKSwgXCLkuKrluJblrZAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ucmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQPC9kZD5cXG4gICAgICA8L2RsPiBcXG4gICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3QvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZHQ+PCUtdGl0bGUlPjwvZHQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6IDwlLWNyZWF0b3JOYW1lJT4g5Yib5bu65pe26Ze0IDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGNyZWF0ZVRpbWUpJT4g5pyA6L+R5pu05pawIDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKHVwZGF0ZVRpbWUpJT48L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuS4u+mimOi1hOa6kCA8JS1zdWJqZWN0UmVzb3VyY2VDb3VudCU+IDwlLW1lbWJlckNvdW50JT7kuKrmiJDlkZggPCUtYXJ0aWNsZUNvdW50JT7kuKrluJblrZAgPCUtYXJ0aWNsZVJlc291cmNlQ291bnQlPuS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIDwlLWFydGljbGVDcmVhdGVDb3VudCU+LzEyPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY29sLXhzLTNcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZUFydGljbGVcIj48c3BhbiBjbGFzcz1cInBvc3RcIj48L3NwYW4+5Y+R5biWPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZm9sbG93LWJ0biA8JWlmKGZvbGxvdyl7JT5mb2xsb3dlZDwlfSU+XCIgZGF0YS1hY3Rpb249XCJmb2xsb3dcIj48c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj48JWlmKGZvbGxvdyl7JT7lt7LlhbPms6g8JX1lbHNleyU+5YWz5rOoPCV9JT48L2E+PC9zcGFuPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBtYW5hZ2UtYnRuXCIgZGF0YS1hY3Rpb249XCJtYW5hZ2VcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlU3ViamVjdFwiPjxzcGFuIGNsYXNzPVwibWFuYWdlXCI+PC9zcGFuPueuoeeQhjwvYT48L3NwYW4+XFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYWN0aWNlLWFjdC1zZWxlY3RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInNlbGVjdDItY29udGFpbmVyIGZvcm0tY29udHJvbCBzZWxlY3Qgc2VsZWN0LXByaW1hcnlcIiBpZD1cInMyaWRfYXV0b2dlbjFcIj5cXG4gICAgICAgICAgICA8IS0tXFxuICAgICAgICAgICAgPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIGNsYXNzPVwic2VsZWN0Mi1jaG9pY2VcIiB0YWJpbmRleD1cIi0xXCI+ICAgXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItY2hvc2VuXCIgaWQ9XCJzZWxlY3QyLWNob3Nlbi0yXCI+5oyJ5biW5a2Q5qCH562+562b6YCJPC9zcGFuPlxcbiAgICAgICAgICAgICAgPGFiYnIgY2xhc3M9XCJzZWxlY3QyLXNlYXJjaC1jaG9pY2UtY2xvc2VcIj48L2FiYnI+IFxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWFycm93XCIgcm9sZT1cInByZXNlbnRhdGlvblwiPjxiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48L2I+PC9zcGFuPlxcbiAgICAgICAgICAgIDwvYT5cXG4gICAgICAgICAgICAtLT48bGFiZWwgZm9yPVwiczJpZF9hdXRvZ2VuMlwiIGNsYXNzPVwic2VsZWN0Mi1vZmZzY3JlZW5cIj48L2xhYmVsPjxpbnB1dCBjbGFzcz1cInNlbGVjdDItZm9jdXNzZXIgc2VsZWN0Mi1vZmZzY3JlZW5cIiB0eXBlPVwidGV4dFwiIGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgcm9sZT1cImJ1dHRvblwiIGFyaWEtbGFiZWxsZWRieT1cInNlbGVjdDItY2hvc2VuLTJcIiBpZD1cInMyaWRfYXV0b2dlbjJcIj48L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlLm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJhcnRpY2xlLm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hdXRvLXJlZnVzZVwiPlxcbiAgICAgICAgICA8IS0t6Ieq5Yqo5Yi35pawOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1hY3Rpb249XCJzdWJqZWN0LmF1dG9yZWZyZXNoXCIgLz4tLT5cXG4gICAgICAgICAgPGEgaHJlZj1cIi9pbmRleC5odG1sXCI+6L+U5ZuePC9hPlxcbiAgICAgICAgICA8IS0tPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2ggYm9vdHN0cmFwLXN3aXRjaC13cmFwcGVyIGJvb3RzdHJhcC1zd2l0Y2gtYW5pbWF0ZSBib290c3RyYXAtc3dpdGNoLWlkLWN1c3RvbS1zd2l0Y2gtMDEgYm9vdHN0cmFwLXN3aXRjaC1vZmZcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1jb250YWluZXJcIj5cXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb24gYm9vdHN0cmFwLXN3aXRjaC1wcmltYXJ5XCI+T048L3NwYW4+PGxhYmVsIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1sYWJlbFwiPiZuYnNwOzwvbGFiZWw+PHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vZmYgYm9vdHN0cmFwLXN3aXRjaC1kZWZhdWx0XCI+T0ZGPC9zcGFuPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBjaGVja2VkPVwiXCIgZGF0YS10b2dnbGU9XCJzd2l0Y2hcIiBpZD1cImN1c3RvbS1zd2l0Y2gtMDFcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICAtLT5cXG4gICAgICAgIDwvZGQ+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgPGR0PlwiLCAoX19zdGFjay5saW5lbm8gPSAxLCB0aXRsZSksICc8L2R0PlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLXVzZVwiPuWIm+W7uuS6uiAnLCAoX19zdGFjay5saW5lbm8gPSAyLCBjcmVhdG9yTmFtZSksIFwiIOWIm+W7uuaXtumXtCBcIiwgKF9fc3RhY2subGluZW5vID0gMiwgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoY3JlYXRlVGltZSkpLCBcIiDmnIDov5Hmm7TmlrAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIsIHN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKHVwZGF0ZVRpbWUpKSwgJzwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Li76aKY6LWE5rqQICcsIChfX3N0YWNrLmxpbmVubyA9IDMsIHN1YmplY3RSZXNvdXJjZUNvdW50KSwgXCIgXCIsIChfX3N0YWNrLmxpbmVubyA9IDMsIG1lbWJlckNvdW50KSwgXCLkuKrmiJDlkZggXCIsIChfX3N0YWNrLmxpbmVubyA9IDMsIGFydGljbGVDb3VudCksIFwi5Liq5biW5a2QIFwiLCAoX19zdGFjay5saW5lbm8gPSAzLCBhcnRpY2xlUmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQIOaIkeeahOWPkeW4li/lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDMsIGFydGljbGVDcmVhdGVDb3VudCksICcvMTI8L2RkPlxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWFjdC1idG5cIj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnlcIiBkYXRhLXRvZ2dsZT1cIm1vZGFsXCIgZGF0YS10YXJnZXQ9XCIjY3JlYXRlQXJ0aWNsZVwiPjxzcGFuIGNsYXNzPVwicG9zdFwiPjwvc3Bhbj7lj5HluJY8L2E+PC9zcGFuPlxcbiAgICAgICAgICA8c3BhbiBjbGFzcz1cImNvbC14cy0zXCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiZm9sbG93ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1wiIGRhdGEtYWN0aW9uPVwiZm9sbG93XCI+PHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA2O1xuICAgICAgICAgICAgICAgIGlmIChmb2xsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuWFs+azqFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJjb2wteHMtM1wiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgbWFuYWdlLWJ0blwiIGRhdGEtYWN0aW9uPVwibWFuYWdlXCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZVN1YmplY3RcIj48c3BhbiBjbGFzcz1cIm1hbmFnZVwiPjwvc3Bhbj7nrqHnkIY8L2E+PC9zcGFuPlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFjdGljZS1hY3Qtc2VsZWN0XCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzZWxlY3QyLWNvbnRhaW5lciBmb3JtLWNvbnRyb2wgc2VsZWN0IHNlbGVjdC1wcmltYXJ5XCIgaWQ9XCJzMmlkX2F1dG9nZW4xXCI+XFxuICAgICAgICAgICAgPCEtLVxcbiAgICAgICAgICAgIDxhIGhyZWY9XCJqYXZhc2NyaXB0OnZvaWQoMClcIiBjbGFzcz1cInNlbGVjdDItY2hvaWNlXCIgdGFiaW5kZXg9XCItMVwiPiAgIFxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzZWxlY3QyLWNob3NlblwiIGlkPVwic2VsZWN0Mi1jaG9zZW4tMlwiPuaMieW4luWtkOagh+etvuetm+mAiTwvc3Bhbj5cXG4gICAgICAgICAgICAgIDxhYmJyIGNsYXNzPVwic2VsZWN0Mi1zZWFyY2gtY2hvaWNlLWNsb3NlXCI+PC9hYmJyPiBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1hcnJvd1wiIHJvbGU9XCJwcmVzZW50YXRpb25cIj48YiByb2xlPVwicHJlc2VudGF0aW9uXCI+PC9iPjwvc3Bhbj5cXG4gICAgICAgICAgICA8L2E+XFxuICAgICAgICAgICAgLS0+PGxhYmVsIGZvcj1cInMyaWRfYXV0b2dlbjJcIiBjbGFzcz1cInNlbGVjdDItb2Zmc2NyZWVuXCI+PC9sYWJlbD48aW5wdXQgY2xhc3M9XCJzZWxlY3QyLWZvY3Vzc2VyIHNlbGVjdDItb2Zmc2NyZWVuXCIgdHlwZT1cInRleHRcIiBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIHJvbGU9XCJidXR0b25cIiBhcmlhLWxhYmVsbGVkYnk9XCJzZWxlY3QyLWNob3Nlbi0yXCIgaWQ9XCJzMmlkX2F1dG9nZW4yXCI+PC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZS5vcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXG4gICAgICAgICAgPCEtLeiHquWKqOWIt+aWsDogPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYWN0aW9uPVwic3ViamVjdC5hdXRvcmVmcmVzaFwiIC8+LS0+XFxuICAgICAgICAgIDxhIGhyZWY9XCIvaW5kZXguaHRtbFwiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPCEtLTxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoIGJvb3RzdHJhcC1zd2l0Y2gtd3JhcHBlciBib290c3RyYXAtc3dpdGNoLWFuaW1hdGUgYm9vdHN0cmFwLXN3aXRjaC1pZC1jdXN0b20tc3dpdGNoLTAxIGJvb3RzdHJhcC1zd2l0Y2gtb2ZmXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtY29udGFpbmVyXCI+XFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9uIGJvb3RzdHJhcC1zd2l0Y2gtcHJpbWFyeVwiPk9OPC9zcGFuPjxsYWJlbCBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtbGFiZWxcIj4mbmJzcDs8L2xhYmVsPjxzcGFuIGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaC1oYW5kbGUtb2ZmIGJvb3RzdHJhcC1zd2l0Y2gtZGVmYXVsdFwiPk9GRjwvc3Bhbj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgY2hlY2tlZD1cIlwiIGRhdGEtdG9nZ2xlPVwic3dpdGNoXCIgaWQ9XCJjdXN0b20tc3dpdGNoLTAxXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgLS0+XFxuICAgICAgICA8L2RkPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3N1YmplY3QvaGVhZC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8bmF2IGNsYXNzPVwiYnRuLXRvb2xiYXJcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZVwiPui1hOa6kCA8JS1zdWJqZWN0UmVzb3VyY2VDb3VudCU+PC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6IDwlLW1lbWJlckNvdW50JT48L3NwYW4+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIj7nu5/orqE8L3NwYW4+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9uYXY+XFxuXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWFzaWRlLWltZ1wiPlxcbiAgICAgICAgICA8IS0tXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlb1wiPlxcbiAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMjAwXCIgc3JjPVwiaHR0cDovL2ltZ3NyYy5iYWlkdS5jb20vZm9ydW0vdyUzRDU4MC9zaWduPTNiOTVjZWM3MGMzMzg3NDQ5Y2M1MmY3NDYxMGVkOTM3L2YwNzRkMGZjMWUxNzhhODI3NGIwZWYzN2Y2MDM3MzhkYTg3N2U4NjguanBnXCIgLz5cXG4gICAgICAgICAgICDpooTop4ggIOagh+azqCDkuIvovb0gIOWIoOmZpFxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgLS0+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbWctbGlzdFwiPlxcbiAgICAgICAgICAgIDwlXFxuICAgICAgICAgICAgICBmb3IodmFyIGkgaW4gcmVzb3VyY2VMaXN0KXtcXG4gICAgICAgICAgICAgIHZhciBpdGVtID0gcmVzb3VyY2VMaXN0W2ldO1xcbiAgICAgICAgICAgICU+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN1Yi1yZXNvdXJjZS08JS1pdGVtLmlkJT5cIj5cXG4gICAgICAgICAgICA8JWlmKGl0ZW0udHlwZSA9PT0gMSl7JT5cXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWl0ZW0uaWQlPlwiIHRpdGxlPVwiPCUtaXRlbS5uYW1lJT5cIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaXRlbS5pZCU+XCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxuICAgICAgICAgICAgICA8JX0lPlxcbiAgICAgICAgICAgIDwlfWVsc2UgaWYoaXRlbS50eXBlID09PSA0IHx8IGl0ZW0udHlwZSA9PT0zKXslPlxcbiAgICAgICAgICAgICAgPHZpZGVvIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiBjb250cm9scz1cImNvbnRyb2xzXCI+XFxuICAgICAgICAgICAgICDmgqjnmoTmtY/op4jlmajkuI3mlK/mjIEgdmlkZW8g5qCH562+44CCXFxuICAgICAgICAgICAgICA8L3ZpZGVvPlxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgIDwlfSU+XFxuICAgICAgICAgICAgPCV9ZWxzZXslPlxcbiAgICAgICAgICAgICAgPHA+PCUtaXRlbS5uYW1lJT48L3A+XFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pdGVtLmlkJT5cIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxuICAgICAgICAgICAgICA8JX0lPiAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgPCV9JT5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8JX0lPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgJzwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPue7n+iuoTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L25hdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtYXNpZGUtaW1nXCI+XFxuICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCI+XFxuICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyMDBcIiBzcmM9XCJodHRwOi8vaW1nc3JjLmJhaWR1LmNvbS9mb3J1bS93JTNENTgwL3NpZ249M2I5NWNlYzcwYzMzODc0NDljYzUyZjc0NjEwZWQ5MzcvZjA3NGQwZmMxZTE3OGE4Mjc0YjBlZjM3ZjYwMzczOGRhODc3ZTg2OC5qcGdcIiAvPlxcbiAgICAgICAgICAgIOmihOiniCAg5qCH5rOoIOS4i+i9vSAg5Yig6ZmkXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAtLT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1saXN0XCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlc291cmNlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtJywgKF9fc3RhY2subGluZW5vID0gMjEsIGl0ZW0uaWQpLCAnXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0ubmFtZSksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDQgfHwgaXRlbS50eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICA8dmlkZW8gc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDI5LCBpdGVtLmlkKSwgJ1wiIGNvbnRyb2xzPVwiY29udHJvbHNcIj5cXG4gICAgICAgICAgICAgIOaCqOeahOa1j+iniOWZqOS4jeaUr+aMgSB2aWRlbyDmoIfnrb7jgIJcXG4gICAgICAgICAgICAgIDwvdmlkZW8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDM0LCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHA+XCIsIChfX3N0YWNrLmxpbmVubyA9IDM3LCBpdGVtLm5hbWUpLCAnPC9wPlxcbiAgICAgICAgICAgICAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzgsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQwLCBpdGVtLmlkKSwgJ1wiPuWIoOmZpDwvYT5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0MjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9hc2lkZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPSAwO2k8bGlzdC5sZW5ndGg7aSsrKXtcXG52YXIgaXRlbSA9IGxpc3RbaV07XFxuJT5cXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvbGk+XFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpPjxzcGFuIGNsYXNzPVwiZnVpLWhlYXJ0XCI+PC9zcGFuPue9rumhtu+8mjxhIGhyZWY9XCIvYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS50aXRsZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvdG9wLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZm8uanMifQ==