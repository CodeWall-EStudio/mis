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
		list = __webpack_require__(4),
		post = __webpack_require__(5),
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
		 
		 var artInfo = new article.info(nowArtId,nowSubjectId);
		 cpost.bindFun(clist);
		 clist.bindFun(artInfo);
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(11).user,
		data = __webpack_require__(12).user,
		userManage = __webpack_require__(13),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(21),
		manage : __webpack_require__(22),
		onemanage : __webpack_require__(23)
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

	var cgi = __webpack_require__(11).article;
	var tmpl = {
		info : __webpack_require__(24)
	};
	
	var Info = {}
	module.exports = Info;
	
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
	
	articleInfo.prototype.bindAction = function(){
		var _this = this;
		this.dom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			_this._selectDom = target;
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
		console.log('edit');	
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(11).comment;
	var tmpl = {
		list : __webpack_require__(20)
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
	
		// articleList.init(id,cgi,tmpl);
		// articlePost.init(id,cgi,tmpl);
		this.target;
		this.bindAction();
		this.getDate();
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
				var html = tmpl.list(res.data);
				_this.dom.append(html);
			}
		});
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
	
	list.prototype.bindFun = function(info){
		this.artInfo = info;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(11).comment;
	var tmpl = {
		list : __webpack_require__(25),
		rlist : __webpack_require__(26)   //资源列表
	};
	
	var Comment = {}
	
	var post = function(id,sid){
		this.dom = $("#postArea");
		this.popDom = $("#createComment");
		this.contentDom = this.dom.find('input[name=name]');
		this.popContentDom = this.popDom.find('textarea[name=content]');
		this.popTitleDom = this.popDom.find('input[name=name]');
		this.cresDom = this.popDom.find('.pop-res');
	
		this.artId = id;
		this.subId = sid;	
	
		this.resList = [];
		this.resMap = {};
	
		this.bindAction();
		this.loading = false;
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
			window.striker.commentshow = true;
		});
	
		this.popDom.on('hide.bs.modal', function (e) {
			window.striker.commentshow = false;
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

	var cgi = __webpack_require__(11).label,
		data = __webpack_require__(12).label,
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(17),
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
			delete : cgiPath+'subject/delete',
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
			delete : cgiPath+'article/delete', //收藏
			create : cgiPath+'article/create'
		},
		comment : {
			search : cgiPath+'comment/search',
			staring : cgiPath+'comment/staring',
			collected : cgiPath+'comment/collected',
			star : cgiPath+'comment/star',
			delete : cgiPath+'comment/delete',
			collect : cgiPath+'comment/collect',
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
	
	db.subject.edit = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.subject.edit,param,callback);
	}
	
	db.subject.delete = function(param,callback){
		var callback = checkCallback(callback);
		request.post(cgiList.subject.delete,param,callback);
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
	
	db.article.delete = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.article.delete,param,callback);
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
	
	db.comment.delete = function(param,callback){
		var callback = checkCallback(callback,true);
		request.post(cgiList.comment.delete,param,callback);
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
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(12).user;
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */,
/* 19 */,
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <article class="comment-one comment<%-item.id%>">\r\n    <aside class="comment-one-aside"><%-striker.util.getNowTime(item.updateTime)%></aside>\r\n    <div class="comment-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%></div>\r\n      <div class="info-action">\r\n          <div class="info-action">\r\n            <span class="edit" data-action="edit" data-id="<%-item.id%>"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="<%-item.id%>"><span></span>删除</span> <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="up" data-id="<%-item.id%>" data-action="collect"  data-status="<%-item.isCollect%>"><span></span><%if(item.isStar){%>取消收藏<%}else{%>收藏<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>" data-cname="<%-item.creatorName%>"><span></span>回复</span>\r\n          </div> \r\n      </div>          \r\n      <dl class="comment-dl">\r\n        <dt><%-item.title%></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.resource){%>\r\n        <div class="comment-img-list">\r\n          <%\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </article>\r\n<%}%>',
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
	                    buf.push('\n  <article class="comment-one comment', (__stack.lineno = 4, item.id), '">\n    <aside class="comment-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</aside>\n    <div class="comment-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), '</div>\n      <div class="info-action">\n          <div class="info-action">\n            <span class="edit" data-action="edit" data-id="', (__stack.lineno = 10, item.id), '"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="', (__stack.lineno = 10, item.id), '"><span></span>删除</span> <span class="up" data-id="', (__stack.lineno = 10, item.id), '" data-action="setup" data-status="', (__stack.lineno = 10, item.isStar), '"><span></span>');
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
	                    buf.push("\n    </div>\n  </article>\n");
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

/***/ },
/* 21 */
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
/* 22 */
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
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <div class="title">\r\n          <%-title%>\r\n          <div class="action-area">\r\n            <a class="btn btn-primary" data-action="up">置顶</a>\r\n            <div class="btn-group">\r\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\r\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\r\n            </div>        \r\n            <a class="return" href="/info.html?id=<%-subject_id%>">返回</a>\r\n          </div>\r\n        </div>\r\n        <div class="comment-list">\r\n          <article class="comment-one">\r\n              <aside class="comment-one-aside"><%-striker.util.getNowTime(updateTime)%></aside>\r\n              <div class="comment-one-info">\r\n                <div class="info-title"><%-name%></div>\r\n                <div class="info-action">\r\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount"><%-commentCount%></font></span>\r\n                </div>          \r\n                <dl class="comment-dl">\r\n                  <dt><a href="article.html?id=50"><%-title%></a></dt>\r\n                  <dd>\r\n                    <%-content%>\r\n                  </dd>\r\n                  <div class="comment-img-list">\r\n                    <%for(var j=0,m=resourceList.length;j<m;j++){\r\n                        var obj = resourceList[j];\r\n                        \r\n                        if(obj.type === 1){\r\n                    %>\r\n                      <div>\r\n                        <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n                      </div>\r\n                    <%}}%>                  \r\n          \r\n                </dl>\r\n              </div>\r\n            </article>\r\n        </div>',
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
	                buf.push('        <div class="title">\n          ', (__stack.lineno = 2, title), '\n          <div class="action-area">\n            <a class="btn btn-primary" data-action="up">置顶</a>\n            <div class="btn-group">\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\n            </div>        \n            <a class="return" href="/info.html?id=', (__stack.lineno = 9, subject_id), '">返回</a>\n          </div>\n        </div>\n        <div class="comment-list">\n          <article class="comment-one">\n              <aside class="comment-one-aside">', (__stack.lineno = 14, striker.util.getNowTime(updateTime)), '</aside>\n              <div class="comment-one-info">\n                <div class="info-title">', (__stack.lineno = 16, name), '</div>\n                <div class="info-action">\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount">', (__stack.lineno = 18, commentCount), '</font></span>\n                </div>          \n                <dl class="comment-dl">\n                  <dt><a href="article.html?id=50">', (__stack.lineno = 21, title), "</a></dt>\n                  <dd>\n                    ", (__stack.lineno = 23, content), '\n                  </dd>\n                  <div class="comment-img-list">\n                    ');
	                __stack.lineno = 26;
	                for (var j = 0, m = resourceList.length; j < m; j++) {
	                    var obj = resourceList[j];
	                    if (obj.type === 1) {
	                        buf.push('\n                      <div>\n                        <img src="/cgi/resource/preview?id=', (__stack.lineno = 32, obj.id), '" width="200" />\n                      </div>\n                    ');
	                        __stack.lineno = 34;
	                    }
	                }
	                buf.push("                  \n          \n                </dl>\n              </div>\n            </article>\n        </div>");
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
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <article class="artice-one article<%-item.id%>">\r\n    <aside class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></aside>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </article>\r\n<%}%>',
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
	                    buf.push('\n  <article class="artice-one article', (__stack.lineno = 4, item.id), '">\n    <aside class="artice-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</aside>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), "   最后回复 ", (__stack.lineno = 7, item.updator), '</div>\n      <div class="info-action">\n        <span class="up" data-id="', (__stack.lineno = 9, item.id), '" data-action="setup" data-status="', (__stack.lineno = 9, item.isStar), '"><span></span>');
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
/* 26 */
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
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
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

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjQ0NmRhY2EwYTQ0ODMyMzczMWI/ODc2MSoqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcz9lYzRmKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qcz85MGFiIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vbXNnLmpzPzIzN2IqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9jZ2kuanM/MjNiMioqIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanM/OWRlOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9jb21tZW50L2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci91c2VyX25hdi5lanM/NmZmYioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanM/NTExNCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL29uZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzPzNmYTIqIiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanM/YzUzNyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9saXN0LmVqcz8zNWYyKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL29uZS5lanM/MzU3ZioiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0Esb0Q7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLFE7Ozs7OztBQzlDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEM7QUFDQSw2Q0FBNEM7QUFDNUMseUM7O0FBRUEsMkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDbERBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLGVBQWU7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0I7QUFDQTs7QUFFQTtBQUNBLHdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFO0FBQ0w7OztBQUdBOztBQUVBLDBCOzs7Ozs7QUM5TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0EsMEI7Ozs7OztBQ3RNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7Ozs7OztBQ2xMQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwrQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBLHFCOzs7Ozs7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ2hCQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7OztBQzNEQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHlCQUF5Qixrb0JBQWtvQixPQUFPLEtBQUssTUFBTSwwSUFBMEksU0FBUyxLQUFLLE9BQU8sc1ZBQXNWLCtHQUErRyxJQUFJLEtBQUssNkNBQTZDLHVEQUF1RCw2SkFBNkosbUNBQW1DLHVDQUF1QztBQUMzcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBaUUsT0FBTztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUN0RUE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM5QkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsdVlBQXNZLElBQUksS0FBSyx5QkFBeUIsNEtBQTRLO0FBQ3BsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM5QkE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsaWlEQUFnaUQsSUFBSSxLQUFLLHNEQUFzRCwyRUFBMkUsK01BQStNO0FBQ3ozRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EseURBQXdELE9BQU87QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDdkNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxJQUFJLEtBQUsseUJBQXlCLGdjQUFnYyxPQUFPLEtBQUssTUFBTSx5YkFBeWIsNEZBQTRGLG1EQUFtRCxJQUFJLEtBQUssNkNBQTZDLHVEQUF1RCx1S0FBdUssb0NBQW9DLDBGQUEwRiwwQ0FBMEMsbUNBQW1DLHVDQUF1QztBQUMvbUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrRUFBaUUsT0FBTztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JFQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHdCQUF3QixpSkFBaUo7QUFDL047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qix3SEFBd0g7QUFDN007QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxJQUFJLEtBQUsseUJBQXlCLDZKQUE2SjtBQUNsUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwianMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjQ0NmRhY2EwYTQ0ODMyMzczMWJcbiAqKi8iLCJyZXF1aXJlKCcuL2NvbW1vbi9nbG9iYWwnKTtcclxudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxyXG5cdGFydGljbGUgPSByZXF1aXJlKCcuL2FydGljbGUvaW5mbycpLFxyXG5cdGxpc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvbGlzdCcpLFxyXG5cdHBvc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvcG9zdCcpLFxyXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxyXG5cdGxhYmVsID0gcmVxdWlyZSgnLi9sYWJlbC9sYWJlbCcpO1xyXG52YXIgU3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpLFxyXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcdFxyXG5cclxudmFyIG5vd0FydElkID0gc3RyaWtlci51dGlsLmdldFBhcmFtZXRlcignaWQnKSxcclxuXHRub3dTdWJqZWN0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdzaWQnKTtcclxuXHJcblxyXG5mdW5jdGlvbiB1c2VyTG9hZFN1YihlLGQpe1xyXG5cdCB2YXIgY3Bvc3QgPSBuZXcgcG9zdC5wb3N0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7IFxyXG5cdCB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdCA9IGNwb3N0O1xyXG5cclxuIFx0IHZhciBjbGlzdCA9IG5ldyBsaXN0Lmxpc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuIFx0IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRsaXN0ID0gY2xpc3Q7XHJcblx0IFxyXG5cdCB2YXIgYXJ0SW5mbyA9IG5ldyBhcnRpY2xlLmluZm8obm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuXHQgY3Bvc3QuYmluZEZ1bihjbGlzdCk7XHJcblx0IGNsaXN0LmJpbmRGdW4oYXJ0SW5mbyk7XHJcbn1cclxuXHJcbnZhciBoYW5kbGVycyA9IHtcclxuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWRTdWJcclxufVxyXG5cclxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcclxuXHRTdHJpa2VyLmJpbmQoaSxoYW5kbGVyc1tpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHRzdHJpa2VyLnVzZXIgPSB1c2VyO1xyXG5cdFxyXG5cdHdpbmRvdy5zdHJpa2VyLm1zZyA9IG5ldyBtc2cubWVzc2FnZSgpO1xyXG5cdFxyXG5cdHVzZXIuaW5pdCgpO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuaW5pdCgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIi8vIGtlZXAgaXQgaWYgdXNpbmcgdXJsIG1kNSByZXYgcmVwbGFjZW1lbnQgaW4gamF2YXNjcmlwdFxuY29uc29sZS5sb2coJ2dsb2JhbCBpcyBsb2FkJyk7XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5mbG9vcigobm93IC0gYXRpbWUpLzEwMDApO1xuICAgIGlmKGM8NjApe1xuICAgICAgICByZXR1cm4gJzHliIbpkp/ku6XlhoUnO1xuICAgIH1lbHNlIGlmKGM8MzYwMCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGMvMzYwMCkrJ+WIhumSn+WJjSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKjI0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcixcclxuXHR1c2VyTWFuYWdlID0gcmVxdWlyZSgnLi9tYW5hZ2UnKSxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRuYXYgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci91c2VyX25hdi5lanMnKSxcclxuXHRtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tYW5hZ2UuZWpzJyksXHJcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpXHJcbn1cclxuXHJcbnZhciBVc2VyID0ge30sXHJcblx0X3RoaXMgPSBVc2VyO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XHJcblxyXG4vL+WvueWkluaPkOS+m+eahOaOpeWPo1xyXG53aW5kb3cuc3RyaWtlci51c2VyID0gVXNlcjtcclxuXHJcbi8v566h55CG5ZGY6K6+572u5pi+56S6562J562JXHJcblVzZXIubWFuYWdlID0gdXNlck1hbmFnZS5tYW5hZ2U7XHJcbi8vIFVzZXIuYWRkbWFuYWdlID0gdXNlck1hbmFnZS5zaG93O1xyXG5cclxuLy8gVXNlci5hZGREZWZNYW5hZ2UgPSB1c2VyTWFuYWdlLmFkZERlZk1hbmFnZTtcclxuXHJcblVzZXIuZ2V0TXlJbmZvID0gZnVuY3Rpb24oY2Ipe1xyXG5cdGNnaS5pbmZvKGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubXlJbmZvID0gcmVzLmRhdGE7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5uYXYocmVzLmRhdGEpO1xyXG5cdFx0XHQkKFwiI3VzZXJOYXZcIikuaHRtbChodG1sKTtcclxuXHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkU3ViJyxyZXMuY29kZSk7XHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkQXJ0JyxyZXMuY29kZSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VybG9hZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5Vc2VyLmdldFVzZXJMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLmxpc3QgPSByZXMuZGF0YTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRfdGhpcy5nZXRNeUluZm8oKTtcclxuXHRfdGhpcy5nZXRVc2VyTGlzdCgpO1xyXG5cdHVzZXJNYW5hZ2UuaW5pdChjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvdXNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGluZm8gOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9vbmUuZWpzJylcclxufTtcclxuXHJcbnZhciBJbmZvID0ge31cclxubW9kdWxlLmV4cG9ydHMgPSBJbmZvO1xyXG5cclxudmFyIGFydGljbGVJbmZvID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHJcblx0dGhpcy5kb20gPSAkKCcjYXJ0aWNsZUluZm8nKTtcclxuXHJcblx0dGhpcy5kYXRhID0ge307XHJcblxyXG5cdHRoaXMuY0xpc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50bGlzdDtcclxuXHR0aGlzLmNwb3N0ID0gd2luZG93LnN0cmlrZXIuY29tbWVudHBvc3Q7XHJcblxyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuaW5mbyh7aWQ6IHRoaXMuYXJ0SWR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHJlcy5kYXRhLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaW5mbyhyZXMuZGF0YSk7XHJcblx0XHRcdFxyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRfdGhpcy5jRG9tID0gJChcIiNjb21tZW50Q291bnRcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXAgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnNvbGUubG9nKCd1cCcpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnNvbGUubG9nKCdzZXR1cCcpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2coJ2VkaXQnKTtcdFxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnZGVsZXRlJyk7XHRcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmNMaXN0Lm9yZGVyYnljcmVhdGUoKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieXVwZGF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXBkYXRlQ291bnQgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZGF0YS5jb21tZW50Q291bnQrKztcclxuXHR0aGlzLmNEb20udGV4dCh0aGlzLmRhdGEuY29tbWVudENvdW50KTtcclxufVxyXG5cclxuSW5mby5pbmZvID0gYXJ0aWNsZUluZm87XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvY29tbWVudC9saXN0LmVqcycpXHJcbn07XHJcblxyXG52YXIgQ29tbWVudCA9IHt9XHJcblxyXG52YXIgbGlzdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI2NvbW1lbnRMaXN0XCIpO1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnXHJcblxyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMubGltaXQgPSAzO1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLnBvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9O1xyXG5cclxuXHRjZ2kuc2VhcmNoKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMuc3RhcnQgKz0gX3RoaXMubGltaXQ7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZG9tLmFwcGVuZChodG1sKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieWNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ2NyZWF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ3VwZGF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHRcclxuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1x0XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5yZXBsYXkgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0Y25hbWUgPSB0aGlzLnRhcmdldC5kYXRhKCdjbmFtZScpO1xyXG5cclxuXHR0aGlzLnBvc3QucmVwbGF5KGlkLGNuYW1lKTtcclxufVx0XHJcblxyXG5saXN0LnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNTdGFyIDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+i1nic6J+W3sui1nic7XHJcblx0XHRjZ2kuc3RhcihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNTdGFyKTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNDb2xsZWN0IDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+aUtuiXjyc6J+WPlua2iOaUtuiXjyc7XHJcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNDb2xsZWN0KTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeWbnuWkjT8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdGNvbW1lbnRJZCA6IGlkXHJcblx0XHRcdH07XHJcblx0XHRcdGNnaS5kZWxldGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLmNvbW1lbnRcIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0bGlzdCA6IFtkYXRhXVxyXG5cdH0pO1xyXG5cdHRoaXMuYXJ0SW5mby51cGRhdGVDb3VudCgpO1xyXG5cdHRoaXMuZG9tLnByZXBlbmQoaHRtbCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihpbmZvKXtcclxuXHR0aGlzLmFydEluZm8gPSBpbmZvO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsRG9tLnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbliLDlupXkuoZcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcpO1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkTW9yZSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcdFx0XHJcbn1cclxuXHJcblxyXG5Db21tZW50Lmxpc3QgPSBsaXN0O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBDb21tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbWVudC9saXN0LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5jb21tZW50O1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcbnZhciBDb21tZW50ID0ge31cclxuXHJcbnZhciBwb3N0ID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjcG9zdEFyZWFcIik7XHJcblx0dGhpcy5wb3BEb20gPSAkKFwiI2NyZWF0ZUNvbW1lbnRcIik7XHJcblx0dGhpcy5jb250ZW50RG9tID0gdGhpcy5kb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpO1xyXG5cdHRoaXMucG9wQ29udGVudERvbSA9IHRoaXMucG9wRG9tLmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKTtcclxuXHR0aGlzLnBvcFRpdGxlRG9tID0gdGhpcy5wb3BEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpO1xyXG5cdHRoaXMuY3Jlc0RvbSA9IHRoaXMucG9wRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1x0XHJcblxyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdC8vIGFydGljbGVMaXN0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG5cdC8vIGFydGljbGVQb3N0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG59XHJcblxyXG4vL+WPlumAieaLqeeahOi1hOa6kFxyXG5wb3N0LnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLnJlc01hcCl7XHJcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9iail7XHJcblx0dGhpcy5hcnRpY2xlTGlzdCA9IG9iai5saXN0O1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jaGFuZ2VBcnRpY2xlID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKGxpc3Qpe1xyXG5cdHRoaXMuY0xpc3QgPSBsaXN0O1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZXBsYXkgPSBmdW5jdGlvbihpZCxuYW1lKXtcclxuXHR0aGlzLmNvbnRlbnREb20udmFsKCflm57lpI0gJytuYW1lKyc6Jyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGNvbnRlbnQgPSB0aGlzLmNvbnRlbnREb20udmFsKCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRpZihjb250ZW50ID09PSAnJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJJZCxcclxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHRpdGxlIDogJycsXHJcblx0XHRsYWJlbCA6IFtdLFxyXG5cdFx0cmVzb3VyY2VzIDogdGhpcy5nZXRSZXNMaXN0KClcclxuXHR9O1xyXG5cclxuXHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMuY0xpc3QuYXBwZW5kKHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuY29udGVudERvbS52YWwoJycpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGNvbnRlbnQgPSB0aGlzLnBvcENvbnRlbnREb20udmFsKCk7XHJcblx0dmFyIHRpdGxlID0gdGhpcy5wb3BUaXRsZURvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiB0aXRsZSxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0X3RoaXMuY0xpc3QuYXBwZW5kKHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLnZhbCgnJyk7XHJcblx0XHRcdF90aGlzLnBvcERvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnNob3dQb3N0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuY2hhbmdlQXJ0aWNsZShpZCk7XHJcblx0dGhpcy5wb3BEb20ubW9kYWwoJ3Nob3cnKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblxyXG5cdFx0aWYodGhpcy5wb3BEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dmFyIHVwbG9hZENvbXAgID0gZnVuY3Rpb24oZCl7XHJcblx0XHRcdGNvbnNvbGUubG9nKCdjb21tZW50ICcpO1xyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmKHdpbmRvdy51cGxvYWRDb21wKXtcclxuXHRcdGNvbnNvbGUubG9nKCdoYXZlIGNhbXAnKTtcclxuXHRcdCQoc3RyaWtlcikuYmluZCgndXBsb2FkRmlsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdFx0Y29uc29sZS5sb2coZCk7XHJcblx0XHRcdHVwbG9hZENvbXAoZCk7XHJcblx0XHR9KTtcclxuXHR9ZWxzZXtcclxuXHRcdGNvbnNvbGUubG9nKCdubyBjYW1wJyk7XHJcblx0XHR3aW5kb3cudXBsb2FkQ29tcCA9IHVwbG9hZENvbXA7XHJcblx0fVxyXG5cclxuXHQkKFwiI2NjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHQkKFwiI2NjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuXHR0aGlzLnBvcERvbS5vbignc2hvdy5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyA9IHRydWU7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMucG9wRG9tLm9uKCdoaWRlLmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMucG9wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbkNvbW1lbnQucG9zdCA9IHBvc3Q7XHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCA0XG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0Ly8gaWYoZCA9PSAxMDAxKXtcclxuXHQvLyBcdHdpbmRvdy5sb2NhdGlvbiA9IGNvbmZpZy5jZ2kuZ290b2xvZ2luO1xyXG5cdC8vIFx0cmV0dXJuO1xyXG5cdC8vIH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZ1tkXSB8fCAn5Ye66ZSZ5ouJISdcclxuXHR9XHJcblx0aWYocGFyc2VJbnQoZCkpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLm1zZyA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZyB8fCAnJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChtc2cpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1x0XHRcclxufVxyXG5cclxuZGIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubGFiZWwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLmxhYmVsLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBMYWJlbCA9IHt9LFxyXG5cdF90aGlzID0gTGFiZWw7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTGFiZWwubGFiZWwgPSBmdW5jdGlvbihuYW1lKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XHJcblxyXG5cdHRoaXMubm93RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcclxuXHQvLyBpZih0eXBlID09PSAnc3ViJyl7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRTdWJMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcclxuXHQvLyB9ZWxzZXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZEFydExhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xyXG5cdC8vIH1cclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmFkZERvbS5maW5kKCcubGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xyXG5cdHRoaXMuaW5wdXREb20gPSB0aGlzLmFkZERvbS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblx0dGhpcy5fc2VsZWN0RG9tOy8v5b2T5YmN6YCJ5Lit55qE5YWD57SgXHJcblxyXG5cdC8v6buY6K6k5rKh5pyJ5qCH562+XHJcblx0dGhpcy5ub3dEb20uaGlkZSgpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHJcblx0Ly/lt7Lnu4/pgInkuK3nmoRpZG1hcFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLmdldERhdGEoKTtcdFxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Ly9cclxuXHQvLyB0aGlzLm5vd0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHQvLyBcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0Ly8gXHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciB2YWwgPSB0aGlzLmlucHV0RG9tLnZhbCgpO1xyXG5cdGlmKHZhbCAhPT0gJycpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRuYW1lIDogdmFsXHJcblx0XHR9O1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5tYXBbcmVzLmRhdGEuaWRdID0gcmVzLmRhdGE7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3Jlcy5kYXRhXX0pO1xyXG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdC8vIC9jb25zb2xlLmxvZyh0aGlzLl9zZWxlY3REb20pO1xyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHR9XHJcblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XHJcblx0Ly90aGlzLm5vd0RvbS5zaG93KCk7XHJcblxyXG5cdC8vZnVpLWNyb3NzXHJcblx0Ly9mdWktcGx1c1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpyZXMuZGF0YX0pO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsbD1yZXMuZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSByZXMuZGF0YVtpXTtcclxuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCB2YXIgaHRtbCA9IHRtcGwub25lKHtsaXN0OmRhdGF9KTtcclxuXHQgdGhpcy5ub3dEb20uaHRtbChodG1sKS5zaG93KCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRsaXN0IDogW3RoaXMubWFwW2lkXV1cclxuXHR9XHJcblxyXG5cdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZShwYXJhbSk7XHJcblx0XHR0aGlzLm5vd0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHQvLyBjb25zb2xlLmxvZyh0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5sZW5ndGgpO1xyXG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Ly8gXHRpZihpZCl7XHJcblx0Ly8gXHRcdGxpc3QucHVzaChpZCk7XHJcblx0Ly8gXHR9XHRcdFx0XHRcclxuXHQvLyB9KVx0XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/liKDpmaRcclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0cC5yZW1vdmUoKTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGFiZWwvbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcclxuXHRtZXNzYWdlID0gcmVxdWlyZSgnLi9tc2cnKTtcclxuXHJcbnZhciBtc2cgPSBuZXcgbWVzc2FnZS5tZXNzYWdlKCk7XHJcblxyXG52YXIgY2dpUGF0aCA9ICcvY2dpLyc7XHJcbnZhciBjZ2lMaXN0ID0ge1xyXG5cdHVzZXIgOiB7XHJcblx0XHRsaXN0IDogY2dpUGF0aCsndXNlci9saXN0JyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKyd1c2VyL2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsndXNlci9jcmVhdGUnXHJcblx0fSxcclxuXHRzdWJqZWN0IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnc3ViamVjdC9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3N1YmplY3QvaW5mbycsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnc3ViamVjdC9lZGl0JywgLy/kv67mlLnkuLvpophcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcclxuXHRcdGRlbGV0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdGRlbGV0ZSA6IGNnaVBhdGgrJ2FydGljbGUvZGVsZXRlJywgLy/mlLbol49cclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2FydGljbGUvY3JlYXRlJ1xyXG5cdH0sXHJcblx0Y29tbWVudCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2NvbW1lbnQvc2VhcmNoJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydjb21tZW50L3N0YXJpbmcnLFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0ZWQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcicsXHJcblx0XHRkZWxldGUgOiBjZ2lQYXRoKydjb21tZW50L2RlbGV0ZScsXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0JyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xyXG5cdH0sXHJcblx0bGFiZWwgOiB7XHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydsYWJlbC9jcmVhdGUnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ2xhYmVsL2xpc3QnXHJcblx0fSxcclxuXHRsb2dpbiA6IGNnaVBhdGgrJ2FjY291bnQvbG9naW4nLFxyXG5cdGxvZ291dCA6IGNnaVBhdGgrJ2FjY291bnQvbG9nb3V0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcclxufVxyXG4vLyAv57uf5LiA5Ye65p2l5by55Ye65raI5oGvXHJcbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjYihyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fWVsc2UgaWYoZmxhZyl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kYi5sb2dpbiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dpbixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxvZ291dCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmxvZ291dCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIgPSB7fTtcclxuZGIudXNlci5saXN0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5saXN0LG51bGwsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyLmluZm8gPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmluZm8sbnVsbCxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuLy/nm7TmjqXmi4nmiYDmnInnlKjmiLc/XHJcbmRiLnVzZXIuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QgPSB7fTtcclxuXHJcbmRiLnN1YmplY3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZGVsZXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZGVsZXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3cscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93aW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3dpbmcscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW52aXRlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW52aXRlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZGVscmVzb3VyY2UgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmRlbHJlc291cmNlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5hcnRpY2xlID0ge307XHJcblxyXG5kYi5hcnRpY2xlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmRlbGV0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuZGVsZXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudCA9IHt9O1xyXG5cclxuZGIuY29tbWVudC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5kZWxldGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmRlbGV0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sYWJlbCA9IHt9O1xyXG5cclxuZGIubGFiZWwuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIERhdGEgPSB7fTtcclxuLypcclxu5pWw5o2u57yT5a2YXHJcbnVzZXIg55So5oi3XHJcbnN1YmplY3Qg5Li76aKYXHJcbmFydGljbGUg5biW5a2QXHJcbiovXHJcbkRhdGEudXNlciA9IHt9O1xyXG5EYXRhLnN1YmplY3QgPSB7fTtcclxuRGF0YS5hcnRpY2xlID0ge307XHJcbkRhdGEubGFiZWwgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEodHlwZSxrZXkpe1xyXG5cdHJldHVybiBEYXRhW3R5cGVdW2tleV0gfHwgbnVsbDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvZGF0YS9kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+eUqOaIt+WIl+ihqOaYvuekuuetieetiVxyXG52YXIgdU1hbmFnZSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyO1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0bWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVNYW5hZ2U7XHJcblxyXG52YXIgbWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHQvL+e7meWumuWMuuWfn2RvbeeahOWQjeWtl1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIit0YXJnZXQpO1xyXG5cdHRoaXMubWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5cdC8v55So5oi35YiX6KGoXHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5kb20uZmluZCgnLm1hbmFnZS1saXN0Jyk7XHJcblx0dGhpcy5zZWxlY3REb20gPSB0aGlzLmRvbS5maW5kKCcubm93LW1hbmFnZS1saXN0Jyk7XHJcblx0Ly/mkJzntKLmoYZcclxuXHR0aGlzLmtleURvbTtcclxuXHJcblx0Ly/lvZPliY3lhYPntKBcclxuXHR0aGlzLl9zZWxlY3REb207XHJcblxyXG5cdC8v6YCJ5Lit55qE566h55CG5ZGY5YiX6KGoXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0Ly/mioroh6rlt7HmlL7lnKjnrqHnkIblkZjliJfooajph4zpnaJcclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1x0XHJcblxyXG59XHJcblxyXG4vL+WIneWni+WMluS4gOS4iy5cclxubWFuYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbi8v5pi+56S6566h55CG5ZGY5YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+a4heepuuWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5saXN0RG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+mAieS4reS4gOS4queUqOaIt1xyXG5tYW5hZ2UucHJvdG90eXBlLnNlbGVjdG9uZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcclxuXHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRuYW1lIDogbmFtZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0XHR0aGlzLnNlbGVjdERvbS5hcHBlbmQoaHRtbCk7XHRcdFx0XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG4vL+aQnOe0ouaMiemSrlxyXG5tYW5hZ2UucHJvdG90eXBlLnNlYXJjaGJ0biA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGtleSA9IHRoaXMua2V5RG9tLnZhbCgpO1xyXG5cdHZhciBsaXN0ID0gZGF0YS5saXN0O1xyXG5cdHZhciB1bGlzdCA9IFtdO1xyXG5cclxuXHRpZihrZXkgPT09ICcnKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKCdsaScpLnNob3coKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0aWYoaXRlbS5uYW1lLmluZGV4T2Yoa2V5KT49MCl7XHJcblx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMubGlzdERvbS5maW5kKCdsaScpLmhpZGUoKTtcclxuXHRpZih1bGlzdC5sZW5ndGg9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IHVsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKFwiLnVzZXJcIit1bGlzdFtpXSkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuLy/liKDpmaTkuIDkuKrpgInkuK3nmoTnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgnLnRhZycpLFxyXG5cdFx0aWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+S6i+S7tue7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+i+k+WFpeahhueahGtleXVw57uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUua2V5dXBBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5rZXlEb20uYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgna2V5dXAnKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudU1hbmFnZS5tYW5hZ2UgPSBtYW5hZ2U7XHJcbnVNYW5hZ2UuaW5pdCA9IGZ1bmN0aW9uKG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci9tYW5hZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsImZ1bmN0aW9uIGVtcHR5RnVuKHJlcyl7XHJcblx0Y29uc29sZS5sb2cocmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnUE9TVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBnZXQodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXgob3B0LGNhbGxiYWNrLGVycm9yKXtcclxuXHR2YXIgdHlwZSA9IG9wdC50eXBlIHx8ICdHRVQnLFxyXG5cdFx0dXJsID0gb3B0LnVybCxcclxuXHRcdGRhdGEgPSBvcHQuZGF0YTtcclxuXHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZSA6IHR5cGUsXHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxhcnRpY2xlIGNsYXNzPVwiY29tbWVudC1vbmUgY29tbWVudDwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8YXNpZGUgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvYXNpZGU+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJjb2xsZWN0XCIgIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc0NvbGxlY3QlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuWPlua2iOaUtuiXjzwlfWVsc2V7JT7mlLbol488JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1jbmFtZT1cIjwlLWl0ZW0uY3JlYXRvck5hbWUlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+XFxyXFxuICAgICAgICAgIDwvZGl2PiBcXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgPGR0PjwlLWl0ZW0udGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLnJlc291cmNlKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvYXJ0aWNsZT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8YXJ0aWNsZSBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8YXNpZGUgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9hc2lkZT5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwiY29sbGVjdFwiICBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlzQ29sbGVjdCksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlj5bmtojmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtY25hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5jcmVhdG9yTmFtZSksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj4gXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXG4gICAgICAgIDxkdD4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS50aXRsZSksIFwiPC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE2LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxODtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNywgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvYXJ0aWNsZT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXHJcXG4gICAgICAgICAgPCUtdGl0bGUlPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWFyZWFcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIj7nva7pobY8L2E+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmV0dXJuXCIgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtc3ViamVjdF9pZCU+XCI+6L+U5ZuePC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtbGlzdFwiPlxcclxcbiAgICAgICAgICA8YXJ0aWNsZSBjbGFzcz1cImNvbW1lbnQtb25lXCI+XFxyXFxuICAgICAgICAgICAgICA8YXNpZGUgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKHVwZGF0ZVRpbWUpJT48L2FzaWRlPlxcclxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj48JS1uYW1lJT48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZGl0XCIgZGF0YS1hY3Rpb249XCJlZGl0XCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgIGRhdGEtYWN0aW9uPVwic2V0dXBcIj48c3Bhbj48L3NwYW4+6LWePC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIj48c3Bhbj48L3NwYW4+5Zue5aSNIDxmb250IGlkPVwiY29tbWVudENvdW50XCI+PCUtY29tbWVudENvdW50JT48L2ZvbnQ+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD01MFwiPjwlLXRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JS1jb250ZW50JT5cXHJcXG4gICAgICAgICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JWZvcih2YXIgaj0wLG09cmVzb3VyY2VMaXN0Lmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gcmVzb3VyY2VMaXN0W2pdO1xcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCV9fSU+ICAgICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICA8L2RsPlxcclxcbiAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9hcnRpY2xlPlxcclxcbiAgICAgICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXG4gICAgICAgICAgJywgKF9fc3RhY2subGluZW5vID0gMiwgdGl0bGUpLCAnXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tYXJlYVwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1hY3Rpb249XCJ1cFwiPue9rumhtjwvYT5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJyZXR1cm5cIiBocmVmPVwiL2luZm8uaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA5LCBzdWJqZWN0X2lkKSwgJ1wiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXG4gICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjb21tZW50LW9uZVwiPlxcbiAgICAgICAgICAgICAgPGFzaWRlIGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSkpLCAnPC9hc2lkZT5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+JywgKF9fc3RhY2subGluZW5vID0gMTYsIG5hbWUpLCAnPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE4LCBjb21tZW50Q291bnQpLCAnPC9mb250Pjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICAgICAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9NTBcIj4nLCAoX19zdGFjay5saW5lbm8gPSAyMSwgdGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgICAgICAgICAgIDxkZD5cXG4gICAgICAgICAgICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAyMywgY29udGVudCksICdcXG4gICAgICAgICAgICAgICAgICA8L2RkPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxuICAgICAgICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI2O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gcmVzb3VyY2VMaXN0Lmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gcmVzb3VyY2VMaXN0W2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDwvZGw+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2FydGljbGU+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8YXJ0aWNsZSBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZTwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8YXNpZGUgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9hc2lkZT5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3IlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+JnNpZD08JS1pdGVtLnN1YmplY3RfaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5pbWdudW0+MCl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICAgIGlmKGZpcnN0KXtcXHJcXG4gICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xcclxcbiAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsTwlLWl0ZW0uaW1nbnVtJT7lvKA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8JX19JT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICA8L2FydGljbGU+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGFydGljbGUgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGUnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8YXNpZGUgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2FzaWRlPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiICAg5pyA5ZCO5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnVwZGF0b3IpLCAnPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5zdWJqZWN0X2lkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1nbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBpdGVtLnJlc291cmNlLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDI2LCBvYmouaWQpLCAnXCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbFcIiwgKF9fc3RhY2subGluZW5vID0gMzEsIGl0ZW0uaW1nbnVtKSwgXCLlvKA8L3NwYW4+XFxuICAgICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgIDwvZGl2PlxcbiAgPC9hcnRpY2xlPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNvbW1lbnQuanMifQ==