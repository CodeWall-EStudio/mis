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
		article = __webpack_require__(8),
		articlepost = __webpack_require__(9),
		list = __webpack_require__(10),
		post = __webpack_require__(11),
		msg = __webpack_require__(6),
		label = __webpack_require__(7);
	var Striker = $(window.striker),
		striker = window.striker;	
	
	var nowArtId = striker.util.getParameter('id'),
		nowSubjectId = striker.util.getParameter('sid');
	
	
	function userLoadSub(e,d){
		 var cpost = new post.post(nowArtId,nowSubjectId); 
		 window.striker.commentpost = cpost;
	
	 	 var clist = new list.list(nowArtId,nowSubjectId);
	 	 window.striker.commentlist = clist;
	
	 	 var apost = new articlepost.post(nowArtId,nowSubjectId);
		 
		 var artInfo = new article.info(nowArtId,nowSubjectId);
		 cpost.bindFun(clist);
		 clist.bind({
		 	info:artInfo
		 });
	
		 artInfo.bind({
		 	post: apost
		 })
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
	
		//bindAction();
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

	var cgi = __webpack_require__(12).user,
		data = __webpack_require__(16).user,
		userManage = __webpack_require__(17),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(26),
		manage : __webpack_require__(24),
		onemanage : __webpack_require__(25)
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
/* 4 */,
/* 5 */,
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

	var cgi = __webpack_require__(12).label,
		data = __webpack_require__(16).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(30),
		one : __webpack_require__(31)
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).article;
	var tmpl = {
		info : __webpack_require__(29)
	};
	
	var Info = {}
	module.exports = Info;
	var striker = $(window.striker);
	
	var articleInfo = function(id,sid){
	
		this.artId = id;
		this.subId = sid;
		this.dom = $('#articleInfo');
	
		this.data = {};
	
		this.cList = window.striker.commentlist;
		this.cpost = window.striker.commentpost;
	
		this.getDate();
		this.bindAction();
	}
	
	articleInfo.prototype.getDate = function(){
		var _this = this;
		cgi.info({id: this.artId},function(res){
			if(res.code === 0){
				res.data.sid = _this.subId;
				var html = tmpl.info(res.data);
				
				_this.data = res.data;
				_this.dom.html(html);
				_this.cDom = $("#commentCount");
			}
		});
	}
	
	articleInfo.prototype.bind = function(){
	
	}
	
	articleInfo.prototype.bindAction = function(){
		var _this = this;
		striker.bind('articleEdited',function(e,d){
			d.sid = _this.subId;
			_this.data = d;
			console.log(d);
			var html = tmpl.info(d);
			_this.dom.html(html);
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
	
	articleInfo.prototype.up = function(){
		console.log('up');
	}
	
	articleInfo.prototype.setup = function(){
		console.log('setup');
	}
	
	articleInfo.prototype.edit = function(){
		striker.trigger('editArticle',this.data);
	}
	
	articleInfo.prototype.delete = function(){
		console.log('delete');	
	}
	
	articleInfo.prototype.orderbytime = function(){
		this.cList.orderbycreate();
	}
	
	articleInfo.prototype.orderbyupdate = function(){
		this.cList.orderbyupdate();
	}
	
	articleInfo.prototype.updateCount = function(){
		this.data.commentCount++;
		this.cDom.text(this.data.commentCount);
	}
	
	Info.info = articleInfo;

/***/ },
/* 9 */
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
	
	var cgi = __webpack_require__(12).article;
	var tmpl = {
		list : __webpack_require__(28),
		rlist : __webpack_require__(27)   //资源列表
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
	
		window.uploadComp = function(d){
			
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
				if(res.code === 0){
					console.log(striker.article);
					striker.article.appendToList(res.data);
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).comment;
	var tmpl = {
		list : __webpack_require__(32)
	};
	
	var Comment = {}
	
	var list = function(id,sid){
		this.dom = $("#commentList");
	
		this.artId = id;
		this.subId = sid;
		this.order = 'createTime'
	
		this.start = 0;
		this.limit = 3;
	
		this.loading = false;
		this.post = window.striker.commentpost;
		this.msg = window.striker.msg;
	
		this.map = {};
		// articleList.init(id,cgi,tmpl);
		// articlePost.init(id,cgi,tmpl);
		this.target;
		this.bindAction();
		this.getDate();
	}
	
	list.prototype.saveData = function(data){
		for(var i in data.list){
			var item = data.list[i];
			this.map[item.id] = item;
		}
	}
	
	list.prototype.update = function(data){
		if(data){
			var html = tmpl.list({
				list : [data]
			});	
			$(".comment"+data.id).replaceWith(html);
		}
		
	}
	
	list.prototype.getDate = function(){
		var _this = this;
		this.loading = true;
		var param = {
			start : this.start,
			limit : this.limit,
			articleId : this.artId,
			orderby : this.order
		};
	
		cgi.search(param,function(res){
			this.loading = false;
			if(res.code === 0){
				_this.start += _this.limit;
				_this.saveData(res.data);
				var html = tmpl.list(res.data);
				_this.dom.append(html);
			}
		});
	}
	
	list.prototype.edit = function(){
		var id = this.target.data('id');	
		if(this.map[id]){
			this.post.edit(this.map[id]);
		}
	}
	
	list.prototype.orderbycreate = function(){
		if(this.order === 'createTime'){
			return;
		}
		this.order = 'createTime';
		this.dom.html('');
		this.start = 0;
		this.getDate();
	}
	
	list.prototype.orderbyupdate = function(){
		if(this.order === 'updateTime'){
			return;
		}	
		this.order = 'updateTime';
		this.dom.html('');
		this.start = 0;
		this.getDate();	
	}
	
	list.prototype.loadMore = function(){
		this.loading = true;
		this.getDate();
	}
	
	list.prototype.replay = function(e){
		var id = this.target.data('id'),
			cname = this.target.data('cname');
	
		this.post.replay(id,cname);
	}	
	
	list.prototype.setup = function(){
		var id = this.target.data('id'),
			star = parseInt(this.target.data('status'));
	
		if(!star){
			star = 0;
		}
	
		if(id){
			var dom = this.target;
			var param = {
				commentId : id,
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
	
	list.prototype.collect = function(){
		var id = this.target.data('id'),
			star = parseInt(this.target.data('status'));
	
		if(!star){
			star = 0;
		}
	
		if(id){
			var dom = this.target;
			var param = {
				commentId : id,
				isCollect : star ? 0 :1
			};
			var text = star?'收藏':'取消收藏';
			cgi.collect(param,function(res){
				if(res.code === 0){
					dom.data('status',param.isCollect);
					dom.html('<span></span>'+text);
				}
			});
		}
	}
	
	list.prototype.delete = function(){
		var id = this.target.data('id');
	
		if(id){
	
			var _this = this;
			this.msg.confirm('确定要删除该回复?',null,function(){
				var param = {
					commentId : id
				};
				cgi.delete(param,function(res){
					if(res.code === 0){
						$(".comment"+id).remove();
					}
				});
			});
		}
	}
	
	list.prototype.append = function(data){
		var html = tmpl.list({
			list : [data]
		});
		this.artInfo.updateCount();
		this.dom.prepend(html);
	}
	
	list.prototype.bind = function(obj){
		this.artInfo = obj.info;
	}
	
	list.prototype.bindAction = function(){
		var _this = this;
	
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action && _this[action]){
				_this.target = target;
				_this[action](e);
			}
		});
	
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
	
	
	Comment.list = list;
	
	module.exports = Comment;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).comment;
	var tmpl = {
		list : __webpack_require__(28),
		rlist : __webpack_require__(27)   //资源列表
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
			_this.loading = true;
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
	
			cgi.edit(param,function(res){
				_this.loading = true;
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
			cgi.create(param,function(res){
				_this.loading = true;
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
				console.log('comment ');
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
			console.log('have camp');
			$(striker).bind('uploadFile',function(e,d){
				console.log(d);
				uploadComp(d);
			});
		}else{
			console.log('no camp');
			window.uploadComp = uploadComp;
		}
	
		$("#ccfileName").bind('change',function(e){
			var target = $(e.target);
			if(target.val() !== ''){
				$("#ccfileForm").submit();
			}
		})	
	
		this.popDom.on('show.bs.modal', function (e) {
			if(_this.isEdit){
				_this.ctitDom.text('修改回复');
			}else{
				_this.ctitDom.text('新建回复');
			}
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(19),
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
		request.get(cgiList.notify.read,param,callback);		
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
/* 13 */,
/* 14 */,
/* 15 */,
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
/* 19 */
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
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */
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
/* 25 */
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
/* 26 */
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
/* 27 */
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <div class="title">\r\n          <%-title%>\r\n          <div class="action-area">\r\n            <a class="btn btn-primary" data-action="up">置顶</a>\r\n            <div class="btn-group">\r\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\r\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\r\n            </div>        \r\n            <a class="return" href="/info.html?id=<%-subject_id%>">返回</a>\r\n          </div>\r\n        </div>\r\n        <div class="comment-list">\r\n          <div class="comment-one">\r\n              <div class="comment-one-aside"><%-striker.util.getNowTime(updateTime)%></div>\r\n              <div class="comment-one-info">\r\n                <div class="info-title"><%-name%></div>\r\n                <div class="info-action">\r\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount"><%-commentCount%></font></span>\r\n                </div>          \r\n                <dl class="comment-dl">\r\n                  <dt><a href="article.html?id=50"><%-title%></a></dt>\r\n                  <dd>\r\n                    <%-content%>\r\n                  </dd>\r\n                  <div class="comment-img-list">\r\n                    <%for(var j=0,m=resourceList.length;j<m;j++){\r\n                        var obj = resourceList[j];\r\n                        \r\n                        if(obj.type === 1){\r\n                    %>\r\n                      <div>\r\n                        <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n                      </div>\r\n                    <%}}%>                  \r\n          \r\n                </dl>\r\n              </div>\r\n            </div>\r\n        </div>',
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
	                buf.push('        <div class="title">\n          ', (__stack.lineno = 2, title), '\n          <div class="action-area">\n            <a class="btn btn-primary" data-action="up">置顶</a>\n            <div class="btn-group">\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\n            </div>        \n            <a class="return" href="/info.html?id=', (__stack.lineno = 9, subject_id), '">返回</a>\n          </div>\n        </div>\n        <div class="comment-list">\n          <div class="comment-one">\n              <div class="comment-one-aside">', (__stack.lineno = 14, striker.util.getNowTime(updateTime)), '</div>\n              <div class="comment-one-info">\n                <div class="info-title">', (__stack.lineno = 16, name), '</div>\n                <div class="info-action">\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount">', (__stack.lineno = 18, commentCount), '</font></span>\n                </div>          \n                <dl class="comment-dl">\n                  <dt><a href="article.html?id=50">', (__stack.lineno = 21, title), "</a></dt>\n                  <dd>\n                    ", (__stack.lineno = 23, content), '\n                  </dd>\n                  <div class="comment-img-list">\n                    ');
	                __stack.lineno = 26;
	                for (var j = 0, m = resourceList.length; j < m; j++) {
	                    var obj = resourceList[j];
	                    if (obj.type === 1) {
	                        buf.push('\n                      <div>\n                        <img src="/cgi/resource/preview?id=', (__stack.lineno = 32, obj.id), '" width="200" />\n                      </div>\n                    ');
	                        __stack.lineno = 34;
	                    }
	                }
	                buf.push("                  \n          \n                </dl>\n              </div>\n            </div>\n        </div>");
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
/* 31 */
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
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="comment-one comment<%-item.id%>">\r\n    <div class="comment-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="comment-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%></div>\r\n      <div class="info-action">\r\n          <div class="info-action">\r\n            <span class="edit" data-action="edit" data-id="<%-item.id%>"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="<%-item.id%>"><span></span>删除</span> <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="up" data-id="<%-item.id%>" data-action="collect"  data-status="<%-item.isCollect%>"><span></span><%if(item.isStar){%>取消收藏<%}else{%>收藏<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>" data-cname="<%-item.creatorName%>"><span></span>回复</span>\r\n          </div> \r\n      </div>          \r\n      <dl class="comment-dl">\r\n        <dt><%-item.title%></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.resource){%>\r\n        <div class="comment-img-list">\r\n          <%\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                    buf.push('\n  <div class="comment-one comment', (__stack.lineno = 4, item.id), '">\n    <div class="comment-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="comment-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), '</div>\n      <div class="info-action">\n          <div class="info-action">\n            <span class="edit" data-action="edit" data-id="', (__stack.lineno = 10, item.id), '"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="', (__stack.lineno = 10, item.id), '"><span></span>删除</span> <span class="up" data-id="', (__stack.lineno = 10, item.id), '" data-action="setup" data-status="', (__stack.lineno = 10, item.isStar), '"><span></span>');
	                    __stack.lineno = 10;
	                    if (item.isStar) {
	                        buf.push("已赞");
	                        __stack.lineno = 10;
	                    } else {
	                        buf.push("赞");
	                        __stack.lineno = 10;
	                    }
	                    buf.push('</span> <span class="up" data-id="', (__stack.lineno = 10, item.id), '" data-action="collect"  data-status="', (__stack.lineno = 10, item.isCollect), '"><span></span>');
	                    __stack.lineno = 10;
	                    if (item.isStar) {
	                        buf.push("取消收藏");
	                        __stack.lineno = 10;
	                    } else {
	                        buf.push("收藏");
	                        __stack.lineno = 10;
	                    }
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 10, item.id), '" data-cname="', (__stack.lineno = 10, item.creatorName), '"><span></span>回复</span>\n          </div> \n      </div>          \n      <dl class="comment-dl">\n        <dt>', (__stack.lineno = 14, item.title), "</dt>\n        <dd>\n          ", (__stack.lineno = 16, item.content), "\n        </dd>\n        ");
	                    __stack.lineno = 18;
	                    if (item.resource) {
	                        buf.push('\n        <div class="comment-img-list">\n          ');
	                        __stack.lineno = 20;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 27, obj.id), '" width="200" />\n            </div>\n          ');
	                                __stack.lineno = 29;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 31;
	                    }
	                    buf.push("\n    </div>\n  </div>\n");
	                    __stack.lineno = 34;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNzBlMmNkMzE2MDFhMWMzZTQ0MmY/YjE4NyoqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcz9lYzRmKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzPzEzZGUqIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL2luZm8uanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvcG9zdC5qcz85NDJlKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L3Bvc3QuanM/OTBhYiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvZGF0YS5qcz85ZGU5KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci9tYW5hZ2UuanM/OGRiNSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzP2FlZDkqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqcz81M2EzKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIqIiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanM/YzUzNyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzPzNmYTIqIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvbGlzdC5lanM/MzVmMioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YqIiwid2VicGFjazovLy8uL3NyYy90cGwvY29tbWVudC9saXN0LmVqcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQjs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBLG9EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxROzs7Ozs7QUN2REE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDO0FBQ0EsNkNBQTRDO0FBQzVDLHlDOztBQUVBLDJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7OztBQ2xMQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLGVBQWU7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDNUZBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9CLGtDQUFpQztBQUNqQyw2Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLHNCQUFxQjs7QUFFckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxvQztBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsbUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUI7Ozs7OztBQy9RQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0Esa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFU7QUFDQSxNQUFLLEU7QUFDTDs7O0FBR0E7O0FBRUEsMEI7Ozs7OztBQ3hOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBLDBCOzs7Ozs7QUNuUEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBLHFCOzs7Ozs7Ozs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ2hCQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7QUN2TEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7OztBQzNEQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSx1WUFBc1ksSUFBSSxLQUFLLHlCQUF5Qiw0S0FBNEs7QUFDcGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQzlCQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQzlCQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHdCQUF3QixpSkFBaUo7QUFDL047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxJQUFJLEtBQUsseUJBQXlCLHdiQUF3YixPQUFPLEtBQUssTUFBTSx5YkFBeWIsNEZBQTRGLG1EQUFtRCxJQUFJLEtBQUssNkNBQTZDLHVEQUF1RCx1S0FBdUssb0NBQW9DLDBGQUEwRiwwQ0FBMEMsbUNBQW1DLG1DQUFtQztBQUNubUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBaUUsT0FBTztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JFQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSx5aERBQXdoRCxJQUFJLEtBQUssc0RBQXNELDJFQUEyRSwrTUFBK007QUFDajNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSx5REFBd0QsT0FBTztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2Q0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsd0hBQXdIO0FBQzdNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qiw2SkFBNko7QUFDbFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxJQUFJLEtBQUsseUJBQXlCLDBuQkFBMG5CLE9BQU8sS0FBSyxNQUFNLDBJQUEwSSxTQUFTLEtBQUssT0FBTyxzVkFBc1YsK0dBQStHLElBQUksS0FBSyw2Q0FBNkMsdURBQXVELDZKQUE2SixtQ0FBbUMsbUNBQW1DO0FBQy9vRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFpRSxPQUFPO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA3MGUyY2QzMTYwMWExYzNlNDQyZlxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xyXG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXHJcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9pbmZvJyksXHJcblx0YXJ0aWNsZXBvc3QgPSByZXF1aXJlKCcuL2FydGljbGUvcG9zdCcpLFxyXG5cdGxpc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvbGlzdCcpLFxyXG5cdHBvc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvcG9zdCcpLFxyXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxyXG5cdGxhYmVsID0gcmVxdWlyZSgnLi9sYWJlbC9sYWJlbCcpO1xyXG52YXIgU3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpLFxyXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcdFxyXG5cclxudmFyIG5vd0FydElkID0gc3RyaWtlci51dGlsLmdldFBhcmFtZXRlcignaWQnKSxcclxuXHRub3dTdWJqZWN0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdzaWQnKTtcclxuXHJcblxyXG5mdW5jdGlvbiB1c2VyTG9hZFN1YihlLGQpe1xyXG5cdCB2YXIgY3Bvc3QgPSBuZXcgcG9zdC5wb3N0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7IFxyXG5cdCB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdCA9IGNwb3N0O1xyXG5cclxuIFx0IHZhciBjbGlzdCA9IG5ldyBsaXN0Lmxpc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuIFx0IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRsaXN0ID0gY2xpc3Q7XHJcblxyXG4gXHQgdmFyIGFwb3N0ID0gbmV3IGFydGljbGVwb3N0LnBvc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuXHQgXHJcblx0IHZhciBhcnRJbmZvID0gbmV3IGFydGljbGUuaW5mbyhub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG5cdCBjcG9zdC5iaW5kRnVuKGNsaXN0KTtcclxuXHQgY2xpc3QuYmluZCh7XHJcblx0IFx0aW5mbzphcnRJbmZvXHJcblx0IH0pO1xyXG5cclxuXHQgYXJ0SW5mby5iaW5kKHtcclxuXHQgXHRwb3N0OiBhcG9zdFxyXG5cdCB9KVxyXG59XHJcblxyXG52YXIgaGFuZGxlcnMgPSB7XHJcblx0J3VzZXJMb2FkU3ViJyA6IHVzZXJMb2FkU3ViXHJcbn1cclxuXHJcbmZvcih2YXIgaSBpbiBoYW5kbGVycyl7XHJcblx0U3RyaWtlci5iaW5kKGksaGFuZGxlcnNbaV0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0KCl7XHJcblxyXG5cdHN0cmlrZXIuYXJ0aWNsZSA9IGFydGljbGU7XHJcblx0c3RyaWtlci51c2VyID0gdXNlcjtcclxuXHRcclxuXHR3aW5kb3cuc3RyaWtlci5tc2cgPSBuZXcgbXNnLm1lc3NhZ2UoKTtcclxuXHRcclxuXHR1c2VyLmluaXQoKTtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCIvLyBrZWVwIGl0IGlmIHVzaW5nIHVybCBtZDUgcmV2IHJlcGxhY2VtZW50IGluIGphdmFzY3JpcHRcbmNvbnNvbGUubG9nKCdnbG9iYWwgaXMgbG9hZCcpO1xuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHN0cil7XG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyKTtcblxuICAgIHZhciB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdmFyIG1tID0gKGRhdGUuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpOyAvLyBnZXRNb250aCgpIGlzIHplcm8tYmFzZWQgICAgICAgICBcbiAgICB2YXIgZGQgID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICByZXR1cm4geXl5eSArICctJyArIChtbVsxXT9tbTpcIjBcIittbVswXSkgKyAnLScgKyAoZGRbMV0/ZGQ6XCIwXCIrZGRbMF0pO1x0XG59XG5cbmZ1bmN0aW9uIGdldE5vd1RpbWUoc3RyKXtcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIGF0aW1lID0gbmV3IERhdGUoc3RyKS5nZXRUaW1lKCk7XG5cbiAgICB2YXIgYyA9IE1hdGguZmxvb3IoKG5vdyAtIGF0aW1lKS8xMDAwKTtcbiAgICBpZihjPDYwKXtcbiAgICAgICAgcmV0dXJuICcx5YiG6ZKf5Lul5YaFJztcbiAgICB9ZWxzZSBpZihjPDM2MDApe1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGMvKDM2MDAqMjQpKSsn5aSp5YmNJztcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUoc3RyKTtcbiAgICB9XG5cbn1cblxudmFyIGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUsc3RyKXtcbiAgICBzdHIgPSBzdHIgfHwgbG9jYXRpb24uaHJlZjtcbiAgICB2YXIgciA9IG5ldyBSZWdFeHAoXCIoXFxcXD98I3wmKVwiICsgbmFtZSArIFwiPShbXiYjXSopKCZ8I3wkKVwiKSwgbSA9IHN0ci5tYXRjaChyKTtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCFtID8gXCJcIiA6IG1bMl0pO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEByZXR1cm4ge1N0cmluZ30gW2xlbj0yXSDlrZfmr43mlbAo5aSa5bCR5Liq5a2X5q+N566X5LiA5Liq5a2XKVxuICogQGV4YW1wbGVcbiAqICAgICAgZ2V0TGVuKCdhYmPkuIDkuozkuIknKTtcbiAqL1xudmFyIGdldExlbiA9IGZ1bmN0aW9uKHN0cixsZW4pe1xuICAgIC8v5q2j5YiZ5Y+W5Yiw5Lit5paH55qE5Liq5pWw77yM54S25ZCObGVuKmNvdW50K+WOn+adpeeahOmVv+W6puOAguS4jeeUqHJlcGxhY2VcbiAgICB2YXIgZmFjdG9yID0gbGVuIHx8IDM7XG4gICAgc3RyICs9ICcnO1xuICAgIHZhciB6aENoYXIgPSBzdHIubWF0Y2goL1teXFx4MDAtXFx4ZmZdL2cpIHx8IFtdO1xuICAgIHZhciBsZXR0ZXIgPSBzdHIucmVwbGFjZSgvW15cXHgwMC1cXHhmZl0vZyAsICcnKTtcbiAgICByZXR1cm4gcGFyc2VJbnQoemhDaGFyLmxlbmd0aCArIChsZXR0ZXIubGVuZ3RoIC8gZmFjdG9yKSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHBhcmFtIHtudW1iZXJ9IG1heCDmgLvplb/luqZcbiAqIEByZXR1cm4ge251bWJlcn0gW2xlbj0yXSDplb/luqZcbiAqIEBleGFtcGxlXG4gKiAgICAgIGNoYW5nZUxlbignYWJj5LiA5LqM5LiJJywxMCk7XG4gKi9cbnZhciBjaGFuZ2VMZW4gPSBmdW5jdGlvbihzdHIsbWF4KXtcblx0dmFyIG1heCA9IG1heCB8fCAxMDtcblx0dmFyIGxlbiA9IGdldExlbihzdHIpO1xuXHR2YXIgcmV0ID0gbWF4IC0gbGVuO1xuXHRyZXR1cm4gcmV0Pj0wP3JldDowO1xufVxuXG53aW5kb3cuc3RyaWtlci51dGlsID0ge1xuXHRmb3JtYXRUaW1lIDogZm9ybWF0VGltZSxcblx0Z2V0UGFyYW1ldGVyIDogZ2V0UGFyYW1ldGVyLFxuICAgIGdldE5vd1RpbWUgOiBnZXROb3dUaW1lLFxuXHRnZXRMZW4gOiBnZXRMZW4sXG5cdGNoYW5nZUxlbiA6IGNoYW5nZUxlblxufVxuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9nbG9iYWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMSAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLnVzZXIsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXHJcblx0dXNlck1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyksXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bmF2IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvdXNlcl9uYXYuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKVxyXG59XHJcblxyXG52YXIgVXNlciA9IHt9LFxyXG5cdF90aGlzID0gVXNlcjtcclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG5cclxuLy/lr7nlpJbmj5DkvpvnmoTmjqXlj6Ncclxud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XHJcblxyXG4vL+euoeeQhuWRmOiuvue9ruaYvuekuuetieetiVxyXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xyXG4vLyBVc2VyLmFkZG1hbmFnZSA9IHVzZXJNYW5hZ2Uuc2hvdztcclxuXHJcbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XHJcblxyXG5Vc2VyLmdldE15SW5mbyA9IGZ1bmN0aW9uKGNiKXtcclxuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLm15SW5mbyA9IHJlcy5kYXRhO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcclxuXHRcdFx0JChcIiN1c2VyTmF2XCIpLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZEFydCcscmVzLmNvZGUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcmxvYWQnKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0Ly8gaWYoZCA9PSAxMDAxKXtcclxuXHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IGNvbmZpZy5jZ2kuZ290b2xvZ2luO1xyXG5cdC8vIFx0cmV0dXJuO1xyXG5cdC8vIH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZ1tkXSB8fCAn5Ye66ZSZ5ouJISdcclxuXHR9XHJcblx0aWYocGFyc2VJbnQoZCkpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLm1zZyA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZyB8fCAnJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChtc2cpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1x0XHRcclxufVxyXG5cclxuZGIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubGFiZWwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLmxhYmVsLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBMYWJlbCA9IHt9LFxyXG5cdF90aGlzID0gTGFiZWw7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTGFiZWwubGFiZWwgPSBmdW5jdGlvbihuYW1lKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XHJcblxyXG5cdHRoaXMubm93RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcclxuXHQvLyBpZih0eXBlID09PSAnc3ViJyl7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRTdWJMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcclxuXHQvLyB9ZWxzZXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZEFydExhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xyXG5cdC8vIH1cclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmFkZERvbS5maW5kKCcubGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xyXG5cdHRoaXMuaW5wdXREb20gPSB0aGlzLmFkZERvbS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblx0dGhpcy5fc2VsZWN0RG9tOy8v5b2T5YmN6YCJ5Lit55qE5YWD57SgXHJcblxyXG5cdC8v6buY6K6k5rKh5pyJ5qCH562+XHJcblx0dGhpcy5ub3dEb20uaGlkZSgpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHJcblx0Ly/lt7Lnu4/pgInkuK3nmoRpZG1hcFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLmdldERhdGEoKTtcdFxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Ly9cclxuXHQvLyB0aGlzLm5vd0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHQvLyBcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0Ly8gXHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciB2YWwgPSB0aGlzLmlucHV0RG9tLnZhbCgpO1xyXG5cdGlmKHZhbCAhPT0gJycpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRuYW1lIDogdmFsXHJcblx0XHR9O1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5tYXBbcmVzLmRhdGEuaWRdID0gcmVzLmRhdGE7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3Jlcy5kYXRhXX0pO1xyXG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdC8vIC9jb25zb2xlLmxvZyh0aGlzLl9zZWxlY3REb20pO1xyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHR9XHJcblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XHJcblx0Ly90aGlzLm5vd0RvbS5zaG93KCk7XHJcblxyXG5cdC8vZnVpLWNyb3NzXHJcblx0Ly9mdWktcGx1c1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpyZXMuZGF0YX0pO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsbD1yZXMuZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSByZXMuZGF0YVtpXTtcclxuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCB2YXIgaHRtbCA9IHRtcGwub25lKHtsaXN0OmRhdGF9KTtcclxuXHQgdGhpcy5ub3dEb20uaHRtbChodG1sKS5zaG93KCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRsaXN0IDogW3RoaXMubWFwW2lkXV1cclxuXHR9XHJcblxyXG5cdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZShwYXJhbSk7XHJcblx0XHR0aGlzLm5vd0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHQvLyBjb25zb2xlLmxvZyh0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5sZW5ndGgpO1xyXG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Ly8gXHRpZihpZCl7XHJcblx0Ly8gXHRcdGxpc3QucHVzaChpZCk7XHJcblx0Ly8gXHR9XHRcdFx0XHRcclxuXHQvLyB9KVx0XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/liKDpmaRcclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0cC5yZW1vdmUoKTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGFiZWwvbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRpbmZvIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvb25lLmVqcycpXHJcbn07XHJcblxyXG52YXIgSW5mbyA9IHt9XHJcbm1vZHVsZS5leHBvcnRzID0gSW5mbztcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBhcnRpY2xlSW5mbyA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMuZG9tID0gJCgnI2FydGljbGVJbmZvJyk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmNMaXN0ID0gd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3Q7XHJcblx0dGhpcy5jcG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cclxuXHR0aGlzLmdldERhdGUoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOiB0aGlzLmFydElkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRyZXMuZGF0YS5zaWQgPSBfdGhpcy5zdWJJZDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmluZm8ocmVzLmRhdGEpO1xyXG5cdFx0XHRcclxuXHRcdFx0X3RoaXMuZGF0YSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0X3RoaXMuY0RvbSA9ICQoXCIjY29tbWVudENvdW50XCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRzdHJpa2VyLmJpbmQoJ2FydGljbGVFZGl0ZWQnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRkLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0X3RoaXMuZGF0YSA9IGQ7XHJcblx0XHRjb25zb2xlLmxvZyhkKTtcclxuXHRcdHZhciBodG1sID0gdG1wbC5pbmZvKGQpO1xyXG5cdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2coJ3VwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2coJ3NldHVwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKXtcclxuXHRzdHJpa2VyLnRyaWdnZXIoJ2VkaXRBcnRpY2xlJyx0aGlzLmRhdGEpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnZGVsZXRlJyk7XHRcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmNMaXN0Lm9yZGVyYnljcmVhdGUoKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieXVwZGF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXBkYXRlQ291bnQgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZGF0YS5jb21tZW50Q291bnQrKztcclxuXHR0aGlzLmNEb20udGV4dCh0aGlzLmRhdGEuY29tbWVudENvdW50KTtcclxufVxyXG5cclxuSW5mby5pbmZvID0gYXJ0aWNsZUluZm87XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxuXHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5mdW5jdGlvbiByZXNldEZyb20odGFyZ2V0KXtcclxuXHR0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgnJyk7XHJcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xyXG59O1xyXG5cclxuYVBvc3QuaW5pdCA9IGZ1bmN0aW9uKGlkLG1vZHVsZSx0bXApe1xyXG5cdG5vd1N1YklkID0gaWQ7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdG5ldyBhUG9zdC5wb3N0KCk7XHJcbn1cclxuXHJcbnZhciBwb3N0ID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20gPSAkKFwiI3Bvc3RBcnRpY2xlXCIpOyAvL+W6lemDqOWPkeihqOahhlxyXG5cdHRoaXMuY0RvbSA9ICQoXCIjY3JlYXRlQXJ0aWNsZVwiKTsgLy/lvLnlh7rlj5HooajmoYZcclxuXHR0aGlzLnByZXNEb20gPSB0aGlzLnBEb20uZmluZCgnLnBvc3QtcmVzJyk7Ly8vID0gJChcIlwiKVxyXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMuY0RvbS5maW5kKCcucG9wLXJlcycpO1xyXG5cdHRoaXMuY3RpdERvbSA9IHRoaXMuY0RvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHR0aGlzLm1vZGVsID0gJ3Bvc3QnOy8vcG9zdCDlupXpg6ggcG9wIOW8ueWHuueql+WPo1xyXG5cclxuXHR0aGlzLmlzRWRpdCA9IGZhbHNlO1xyXG5cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuY0RvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRpZihfdGhpcy5pc0VkaXQpe1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+S/ruaUueW4luWtkCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5paw5bu65biW5a2QJyk7XHJcblx0XHR9XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0X3RoaXMubW9kZWwgPSAncG9zdCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24oKXtcclxuXHJcbn07XHJcblxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5qC55o2uZG9t6I635Y+W55u45YWz55qE5Y+C5pWwLlxyXG5wb3N0LnByb3RvdHlwZS5nZXRQYXJhbSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG5cdFx0Y29udGVudCA9IHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCk7XHJcblxyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHRpdGxlIDogbmFtZSxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXHJcblx0XHRsYWJlbHMgOiBbXSxcclxuXHRcdHJlc291cmNlIDogdGhpcy5nZXRSZXNMaXN0KClcclxuXHR9XHJcblxyXG5cdHJldHVybiBwYXJhbTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRpZih0aGlzLmNyZXNEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5jcmVzRG9tLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGlmKHRoaXMucHJlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLnByZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHRcclxuXHR9XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcclxuXHR0aGlzLmlzRWRpdCA9IHRydWU7XHJcblx0dGhpcy5kYXRhID0gZDtcclxuXHR0aGlzLmNEb20ubW9kYWwoJ3Nob3cnKTtcclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbChkLnRpdGxlKTtcclxuXHR0aGlzLmNEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbChkLmNvbnRlbnQpO1xyXG5cclxuXHRpZihkLnJlc291cmNlTGlzdC5sZW5ndGgpe1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpIGluIGQucmVzb3VyY2VMaXN0KXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBkLnJlc291cmNlTGlzdFtpXTtcclxuXHRcdFx0dGhpcy5yZXNMaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHRcdHRoaXMucmVzTWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdH1cclxuXHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdGxpc3QgOiBkLnJlc291cmNlTGlzdFxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG5cdH1cclxufVxyXG5cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHRcclxuXHQvL+i1hOa6kOS4iuS8oOWujOaIkOeahOmAmuefpVxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ2VkaXRBcnRpY2xlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMuZWRpdChkKTtcclxuXHR9KTtcclxuXHJcblx0d2luZG93LnVwbG9hZENvbXAgPSBmdW5jdGlvbihkKXtcclxuXHRcdFxyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuXHQkKFwiI2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcclxuXHJcblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLmNEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1x0XHJcblxyXG5cdHJlc0xpc3QgPSBbXTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHB0ID0gdGhpcy50YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XHJcblx0Ly9jb25zb2xlLmxvZyhwVGFyZ2V0KTtcclxuXHR2YXIgcFRhcmdldCA9ICQocHQpO1xyXG5cclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0gdGhpcy5nZXRQYXJhbShwVGFyZ2V0KTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHRoaXMuY0RvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignYXJ0aWNsZUVkaXRlZCcscmVzLmRhdGEpO1xyXG5cdFx0XHRcdC8vc3RyaWtlci5hcnRpY2xlLmFwcGVuZFRvTGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fWVsc2V7XHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0YVBvc3QucmVzZXQocFRhcmdldCk7XHJcblxyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRjb25zb2xlLmxvZyhzdHJpa2VyLmFydGljbGUpO1xyXG5cdFx0XHRcdHN0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvY29tbWVudC9saXN0LmVqcycpXHJcbn07XHJcblxyXG52YXIgQ29tbWVudCA9IHt9XHJcblxyXG52YXIgbGlzdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI2NvbW1lbnRMaXN0XCIpO1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnXHJcblxyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMubGltaXQgPSAzO1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLnBvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuc2F2ZURhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHRmb3IodmFyIGkgaW4gZGF0YS5saXN0KXtcclxuXHRcdHZhciBpdGVtID0gZGF0YS5saXN0W2ldO1xyXG5cdFx0dGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0aWYoZGF0YSl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7XHJcblx0XHRcdGxpc3QgOiBbZGF0YV1cclxuXHRcdH0pO1x0XHJcblx0XHQkKFwiLmNvbW1lbnRcIitkYXRhLmlkKS5yZXBsYWNlV2l0aChodG1sKTtcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9O1xyXG5cclxuXHRjZ2kuc2VhcmNoKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMuc3RhcnQgKz0gX3RoaXMubGltaXQ7XHJcblx0XHRcdF90aGlzLnNhdmVEYXRhKHJlcy5kYXRhKTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1x0XHJcblx0aWYodGhpcy5tYXBbaWRdKXtcclxuXHRcdHRoaXMucG9zdC5lZGl0KHRoaXMubWFwW2lkXSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5vcmRlcmJ5Y3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLm9yZGVyID09PSAnY3JlYXRlVGltZScpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5vcmRlcmJ5dXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLm9yZGVyID09PSAndXBkYXRlVGltZScpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cdFxyXG5cdHRoaXMub3JkZXIgPSAndXBkYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5nZXREYXRlKCk7XHRcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRjbmFtZSA9IHRoaXMudGFyZ2V0LmRhdGEoJ2NuYW1lJyk7XHJcblxyXG5cdHRoaXMucG9zdC5yZXBsYXkoaWQsY25hbWUpO1xyXG59XHRcclxuXHJcbmxpc3QucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhciA9IHBhcnNlSW50KHRoaXMudGFyZ2V0LmRhdGEoJ3N0YXR1cycpKTtcclxuXHJcblx0aWYoIXN0YXIpe1xyXG5cdFx0c3RhciA9IDA7XHJcblx0fVxyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGNvbW1lbnRJZCA6IGlkLFxyXG5cdFx0XHRpc1N0YXIgOiBzdGFyID8gMCA6MVxyXG5cdFx0fTtcclxuXHRcdHZhciB0ZXh0ID0gc3Rhcj8n6LWeJzon5bey6LWeJztcclxuXHRcdGNnaS5zdGFyKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uZGF0YSgnc3RhdHVzJyxwYXJhbS5pc1N0YXIpO1xyXG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5jb2xsZWN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhciA9IHBhcnNlSW50KHRoaXMudGFyZ2V0LmRhdGEoJ3N0YXR1cycpKTtcclxuXHJcblx0aWYoIXN0YXIpe1xyXG5cdFx0c3RhciA9IDA7XHJcblx0fVxyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGNvbW1lbnRJZCA6IGlkLFxyXG5cdFx0XHRpc0NvbGxlY3QgOiBzdGFyID8gMCA6MVxyXG5cdFx0fTtcclxuXHRcdHZhciB0ZXh0ID0gc3Rhcj8n5pS26JePJzon5Y+W5raI5pS26JePJztcclxuXHRcdGNnaS5jb2xsZWN0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uZGF0YSgnc3RhdHVzJyxwYXJhbS5pc0NvbGxlY3QpO1xyXG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5tc2cuY29uZmlybSgn56Gu5a6a6KaB5Yig6Zmk6K+l5Zue5aSNPycsbnVsbCxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0Y29tbWVudElkIDogaWRcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2dpLmRlbGV0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdCQoXCIuY29tbWVudFwiK2lkKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7XHJcblx0XHRsaXN0IDogW2RhdGFdXHJcblx0fSk7XHJcblx0dGhpcy5hcnRJbmZvLnVwZGF0ZUNvdW50KCk7XHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9iail7XHJcblx0dGhpcy5hcnRJbmZvID0gb2JqLmluZm87XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIHNjcm9sbERvbSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgdmFyIHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSBzY3JvbGxEb20uc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxEb20uc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuWIsOW6leS6hlxyXG4gICAgICAgIGlmKHNjcm9sbFRvcCArIHBhZ2VIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW5kJyk7XHJcbiAgICAgICAgICAgIF90aGlzLmxvYWRNb3JlKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH0pO1x0XHRcclxufVxyXG5cclxuXHJcbkNvbW1lbnQubGlzdCA9IGxpc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5jb21tZW50O1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcbnZhciBDb21tZW50ID0ge31cclxuXHJcbnZhciBwb3N0ID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjcG9zdEFyZWFcIik7XHJcblx0dGhpcy5wb3BEb20gPSAkKFwiI2NyZWF0ZUNvbW1lbnRcIik7XHJcblx0dGhpcy5jb250ZW50RG9tID0gdGhpcy5kb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpO1xyXG5cdHRoaXMucG9wQ29udGVudERvbSA9IHRoaXMucG9wRG9tLmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKTtcclxuXHR0aGlzLnBvcFRpdGxlRG9tID0gdGhpcy5wb3BEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpO1xyXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMucG9wRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5wb3BEb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XHJcblx0Y29uc29sZS5sb2codGhpcy5jdGl0RG9tKTtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0aWNsZUxpc3QgPSBvYmoubGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY2hhbmdlQXJ0aWNsZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLmFydElkID0gaWQ7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihsaXN0KXtcclxuXHR0aGlzLmNMaXN0ID0gbGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dGhpcy5jb250ZW50RG9tLnZhbCgn5Zue5aSNICcrbmFtZSsnOicpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50RG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6ICcnLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLmNMaXN0LmFwcGVuZChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmNvbnRlbnREb20udmFsKCcnKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLnBvcENvbnRlbnREb20udmFsKGQuY29udGVudCk7XHJcblx0dGhpcy5wb3BUaXRsZURvbS52YWwoZC50aXRsZSk7XHJcblx0dGhpcy5kYXRhID0gZDtcclxuXHJcblx0aWYoZC5yZXNvdXJjZSl7XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZSl7XHJcblx0XHRcdHZhciBpdGVtID0gZC5yZXNvdXJjZVtpXTtcclxuXHRcdFx0dGhpcy5yZXNMaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHRcdHRoaXMucmVzTWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdH1cclxuXHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdGxpc3QgOiBkLnJlc291cmNlXHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG5cdHRoaXMucG9wRG9tLm1vZGFsKCdzaG93Jyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cclxuXHR2YXIgY29udGVudCA9IHRoaXMucG9wQ29udGVudERvbS52YWwoKTtcclxuXHR2YXIgdGl0bGUgPSB0aGlzLnBvcFRpdGxlRG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6IHRpdGxlLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0aWYodGhpcy5pc0VkaXQpe1xyXG5cdFx0cGFyYW0uY29tbWVudElkID0gdGhpcy5kYXRhLmlkO1xyXG5cclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0aWYoX3RoaXMuY0xpc3Qpe1xyXG5cdFx0XHRcdFx0X3RoaXMuY0xpc3QudXBkYXRlKHJlcy5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0X3RoaXMucG9wQ29udGVudERvbS52YWwoJycpO1xyXG5cdFx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGlmKF90aGlzLmNMaXN0KXtcclxuXHRcdFx0XHRcdF90aGlzLmNMaXN0LmFwcGVuZChyZXMuZGF0YSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHRcdF90aGlzLnBvcENvbnRlbnREb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BUaXRsZURvbS52YWwoJycpO1xyXG5cdFx0XHRcdF90aGlzLnBvcERvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuc2hvd1Bvc3QgPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5jaGFuZ2VBcnRpY2xlKGlkKTtcclxuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHJcblx0XHRpZih0aGlzLnBvcERvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0dGhpcy5jcmVzRG9tLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihpZCxuYW1lKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR2YXIgdXBsb2FkQ29tcCAgPSBmdW5jdGlvbihkKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2NvbW1lbnQgJyk7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LnVwbG9hZENvbXApe1xyXG5cdFx0Y29uc29sZS5sb2coJ2hhdmUgY2FtcCcpO1xyXG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkKTtcclxuXHRcdFx0dXBsb2FkQ29tcChkKTtcclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0Y29uc29sZS5sb2coJ25vIGNhbXAnKTtcclxuXHRcdHdpbmRvdy51cGxvYWRDb21wID0gdXBsb2FkQ29tcDtcclxuXHR9XHJcblxyXG5cdCQoXCIjY2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjY2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdHRoaXMucG9wRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55Zue5aSNJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rlm57lpI0nKTtcclxuXHRcdH1cclxuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gdHJ1ZTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSBmYWxzZTtcclxuXHRcdF90aGlzLmlzRWRpdCA9IGZhbHNlO1xyXG5cdH0pO1x0XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnBvcERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG5Db21tZW50LnBvc3QgPSBwb3N0O1xyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L3Bvc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDRcbiAqKi8iLCJ2YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxyXG5cdG1lc3NhZ2UgPSByZXF1aXJlKCcuL21zZycpO1xyXG5cclxudmFyIG1zZyA9IG5ldyBtZXNzYWdlLm1lc3NhZ2UoKTtcclxuXHJcbnZhciBjZ2lQYXRoID0gJy9jZ2kvJztcclxudmFyIGNnaUxpc3QgPSB7XHJcblx0dXNlciA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKyd1c2VyL2xpc3QnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3VzZXIvaW5mbycsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKyd1c2VyL2NyZWF0ZSdcclxuXHR9LFxyXG5cdHN1YmplY3QgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydzdWJqZWN0L3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnc3ViamVjdC9pbmZvJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydzdWJqZWN0L2VkaXQnLCAvL+S/ruaUueS4u+mimFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnc3ViamVjdC9jcmVhdGUnLFxyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydzdWJqZWN0L2RlbGV0ZScsXHJcblx0XHRmb2xsb3cgOiBjZ2lQYXRoKydzdWJqZWN0L2ZvbGxvdycsIC8v5YWz5rOoXHJcblx0XHRmb2xsb3dpbmcgOiBjZ2lQYXRoKydzdWJqZWN0L2ZvbGxvd2luZycsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRpbnZpdGVkIDogY2dpUGF0aCsnc3ViamVjdC9pbnZpdGVkJywgLy/pgoDor7fliJfooahcclxuXHRcdGFyY2hpdmVkIDogY2dpUGF0aCsnc3ViamVjdC9hcmNoaXZlZCcsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRhcmNoaXZlIDogY2dpUGF0aCsnc3ViamVjdC9hcmNoaXZlJywgLy/lhbPms6jliJfooahcclxuXHRcdGRlbHJlc291cmNlIDogY2dpUGF0aCArICdzdWJqZWN0L2RlbHJlc291cmNlJyAvL+WIoOmZpOS4gOS4qui1hOa6kFxyXG5cdH0sXHJcblx0YXJ0aWNsZSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2FydGljbGUvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydhcnRpY2xlL2luZm8nLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcmluZycsIC8v6LWe55qE5biW5a2QXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3RlZCcsIC8v5pCc6JeP55qE5biW5a2QXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnYXJ0aWNsZS9lZGl0JyxcclxuXHRcdHN0YXIgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXInLCAvL+i1nlxyXG5cdFx0Y29sbGVjdCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdCcsIC8v5pS26JePXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2FydGljbGUvZGVsZXRlJywgLy/mlLbol49cclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2FydGljbGUvY3JlYXRlJ1xyXG5cdH0sXHJcblx0Y29tbWVudCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2NvbW1lbnQvc2VhcmNoJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydjb21tZW50L3N0YXJpbmcnLFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0ZWQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcicsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2NvbW1lbnQvZGVsZXRlJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydjb21tZW50L2VkaXQnLFxyXG5cdFx0Y29sbGVjdCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdCcsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydjb21tZW50L2NyZWF0ZSdcclxuXHR9LFxyXG5cdG5vdGlmeSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9zZWFyY2gnLFxyXG5cdFx0cmVhZCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9yZWFkJyxcclxuXHR9LFxyXG5cdGxhYmVsIDoge1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnbGFiZWwvY3JlYXRlJyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydsYWJlbC9saXN0J1xyXG5cdH0sXHJcblx0bG9naW4gOiBjZ2lQYXRoKydhY2NvdW50L2xvZ2luJyxcclxuXHRsb2dvdXQgOiBjZ2lQYXRoKydhY2NvdW50L2xvZ291dCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcbnZhciBlbXB0eUZ1biA9IGZ1bmN0aW9uKHJlcyl7XHJcbn1cclxuLy8gL+e7n+S4gOWHuuadpeW8ueWHuua2iOaBr1xyXG52YXIgY2hlY2tDYWxsYmFjayA9IGZ1bmN0aW9uKGNiLGZsYWcpe1xyXG5cdHJldHVybiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0Y2IocmVzKTtcclxuXHRcdGlmKHJlcy5jb2RlICE9PSAwKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1lbHNlIGlmKGZsYWcpe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZGIubG9naW4gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sb2dvdXQsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0ID0ge307XHJcblxyXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3Quc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvdyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZm9sbG93LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvd2luZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmludml0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmludml0ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxyZXNvdXJjZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuYXJ0aWNsZSA9IHt9O1xyXG5cclxuZGIuYXJ0aWNsZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5hcnRpY2xlLmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlWydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGVbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudCA9IHt9O1xyXG5cclxuZGIuY29tbWVudC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5ub3RpZnkgPSB7fTtcclxuXHJcbmRiLm5vdGlmeS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5ub3RpZnkuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLm5vdGlmeS5yZWFkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Qubm90aWZ5LnJlYWQscGFyYW0sY2FsbGJhY2spO1x0XHRcclxufVxyXG5cclxuZGIubGFiZWwgPSB7fTtcclxuXHJcbmRiLmxhYmVsLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sYWJlbC5jcmVhdGUsIHBhcmFtLCBjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIubGFiZWwubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmxhYmVsLmxpc3QscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vY2dpLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBEYXRhID0ge307XHJcbi8qXHJcbuaVsOaNrue8k+WtmFxyXG51c2VyIOeUqOaIt1xyXG5zdWJqZWN0IOS4u+mimFxyXG5hcnRpY2xlIOW4luWtkFxyXG4qL1xyXG5EYXRhLnVzZXIgPSB7fTtcclxuRGF0YS5zdWJqZWN0ID0ge307XHJcbkRhdGEuYXJ0aWNsZSA9IHt9O1xyXG5EYXRhLmxhYmVsID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKHR5cGUsa2V5KXtcclxuXHRyZXR1cm4gRGF0YVt0eXBlXVtrZXldIHx8IG51bGw7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2RhdGEvZGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/nlKjmiLfliJfooajmmL7npLrnrYnnrYlcclxudmFyIHVNYW5hZ2UgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcjtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdG1hbmFnZUhhdmUgPSBmYWxzZTtcclxubW9kdWxlLmV4cG9ydHMgPSB1TWFuYWdlO1xyXG5cclxudmFyIG1hbmFnZSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0Ly/nu5nlrprljLrln59kb23nmoTlkI3lrZdcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrdGFyZ2V0KTtcclxuXHR0aGlzLm1hbmFnZUhhdmUgPSBmYWxzZTtcclxuXHQvL+eUqOaIt+WIl+ihqFxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtbGlzdCcpO1xyXG5cdHRoaXMuc2VsZWN0RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1tYW5hZ2UtbGlzdCcpO1xyXG5cdC8v5pCc57Si5qGGXHJcblx0dGhpcy5rZXlEb207XHJcblxyXG5cdC8v5b2T5YmN5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHQvL+mAieS4reeahOeuoeeQhuWRmOWIl+ihqFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdC8v5oqK6Ieq5bex5pS+5Zyo566h55CG5ZGY5YiX6KGo6YeM6Z2iXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcdFxyXG5cclxufVxyXG5cclxuLy/liJ3lp4vljJbkuIDkuIsuXHJcbm1hbmFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG4vL+aYvuekuueuoeeQhuWRmOWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oKXtcclxuXHQvL+WmguaenOi/mOayoeacieWhq+WIl+ihqC7miorliJfooajloavkuIDkuIsuXHJcblx0aWYoIXRoaXMubWFuYWdlSGF2ZSl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwubWFuYWdlKHtcclxuXHRcdFx0bGlzdCA6IGRhdGEubGlzdCxcclxuXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdHRoaXMua2V5RG9tID0gdGhpcy5saXN0RG9tLmZpbmQoJ2lucHV0W25hbWU9bWFuYWdla2V5XScpO1xyXG5cdFx0dGhpcy5rZXl1cEFjdGlvbigpO1xyXG5cdFx0Ly9iaW5kTWFuYWdlQWN0aW9uKCk7XHJcblx0fVxyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uaGlkZSgpO1xyXG5cdH1cdFxyXG59XHJcblxyXG4vL+WinuWKoOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLmFkZERlZk1hbmFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbm1hbmFnZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLy/mkJzntKLmjInpkq5cclxubWFuYWdlLnByb3RvdHlwZS5zZWFyY2hidG4gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBrZXkgPSB0aGlzLmtleURvbS52YWwoKTtcclxuXHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcclxuXHR2YXIgdWxpc3QgPSBbXTtcclxuXHJcblx0aWYoa2V5ID09PSAnJyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5zaG93KCk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRmb3IodmFyIGkgPSAwLGwgPSBsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdGlmKGl0ZW0ubmFtZS5pbmRleE9mKGtleSk+PTApe1xyXG5cdFx0XHR1bGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5oaWRlKCk7XHJcblx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZChcIi51c2VyXCIrdWxpc3RbaV0pLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5Yig6Zmk5LiA5Liq6YCJ5Lit55qE566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoJy50YWcnKSxcclxuXHRcdGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuLy/kuovku7bnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy/ovpPlhaXmoYbnmoRrZXl1cOe7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmtleXVwQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMua2V5RG9tLmJpbmQoJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnVNYW5hZ2UubWFuYWdlID0gbWFuYWdlO1xyXG51TWFuYWdlLmluaXQgPSBmdW5jdGlvbihtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJmdW5jdGlvbiBlbXB0eUZ1bihyZXMpe1xyXG5cdGNvbnNvbGUubG9nKHJlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ1BPU1QnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhamF4KG9wdCxjYWxsYmFjayxlcnJvcil7XHJcblx0dmFyIHR5cGUgPSBvcHQudHlwZSB8fCAnR0VUJyxcclxuXHRcdHVybCA9IG9wdC51cmwsXHJcblx0XHRkYXRhID0gb3B0LmRhdGE7XHJcblxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGUgOiB0eXBlLFxyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0ZGF0YSA6IGRhdGEsXHJcblx0XHRzdWNjZXNzIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0Y2FsbGJhY2socmVzKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvciA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGVycm9yKHJlcyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWpheCA6IGFqYXgsXHJcblx0cG9zdCA6IHBvc3QsXHJcblx0Z2V0IDogZ2V0XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgPHNwYW4+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPjwlLW5hbWUlPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgPHNwYW4+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liA8JS1pdGVtLmNyZWF0b3JOYW1lJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksIFwiJnNpZD1cIiwgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uc3ViamVjdF9pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XFxyXFxuICAgICAgICAgIDwlLXRpdGxlJT5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1hcmVhXCI+XFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWFjdGlvbj1cInVwXCI+572u6aG2PC9hPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cInJldHVyblwiIGhyZWY9XCIvaW5mby5odG1sP2lkPTwlLXN1YmplY3RfaWQlPlwiPui/lOWbnjwvYT5cXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lXCI+XFxyXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZSh1cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPjwlLW5hbWUlPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiAgZGF0YS1hY3Rpb249XCJzZXR1cFwiPjxzcGFuPjwvc3Bhbj7otZ48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiPjxzcGFuPjwvc3Bhbj7lm57lpI0gPGZvbnQgaWQ9XCJjb21tZW50Q291bnRcIj48JS1jb21tZW50Q291bnQlPjwvZm9udD48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgICAgICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTUwXCI+PCUtdGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgICAgICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlLWNvbnRlbnQlPlxcclxcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlZm9yKHZhciBqPTAsbT1yZXNvdXJjZUxpc3QubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JX19JT4gICAgICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDwvZGw+XFxyXFxuICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XFxuICAgICAgICAgICcsIChfX3N0YWNrLmxpbmVubyA9IDIsIHRpdGxlKSwgJ1xcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWFyZWFcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIj7nva7pobY8L2E+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmV0dXJuXCIgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gOSwgc3ViamVjdF9pZCksICdcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1saXN0XCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZVwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gMTQsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKHVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNiwgbmFtZSksICc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZGl0XCIgZGF0YS1hY3Rpb249XCJlZGl0XCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgIGRhdGEtYWN0aW9uPVwic2V0dXBcIj48c3Bhbj48L3NwYW4+6LWePC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIj48c3Bhbj48L3NwYW4+5Zue5aSNIDxmb250IGlkPVwiY29tbWVudENvdW50XCI+JywgKF9fc3RhY2subGluZW5vID0gMTgsIGNvbW1lbnRDb3VudCksICc8L2ZvbnQ+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD01MFwiPicsIChfX3N0YWNrLmxpbmVubyA9IDIxLCB0aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICAgICAgICAgICAgPGRkPlxcbiAgICAgICAgICAgICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBjb250ZW50KSwgJ1xcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjY7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSByZXNvdXJjZUxpc3QubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBvYmouaWQpLCAnXCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPC9kbD5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPGxpIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPlxcclxcbjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksIFwiXFxuPC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWwnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQ8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJjb2xsZWN0XCIgIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc0NvbGxlY3QlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuWPlua2iOaUtuiXjzwlfWVsc2V7JT7mlLbol488JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1jbmFtZT1cIjwlLWl0ZW0uY3JlYXRvck5hbWUlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+XFxyXFxuICAgICAgICAgIDwvZGl2PiBcXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgPGR0PjwlLWl0ZW0udGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLnJlc291cmNlKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZSBjb21tZW50JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwiY29sbGVjdFwiICBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlzQ29sbGVjdCksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlj5bmtojmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtY25hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5jcmVhdG9yTmFtZSksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj4gXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXG4gICAgICAgIDxkdD4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS50aXRsZSksIFwiPC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE2LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxODtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNywgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvY29tbWVudC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJjb21tZW50LmpzIn0=