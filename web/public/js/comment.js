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
		nav : __webpack_require__(23),
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
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(11).article;
	var tmpl = {
		info : __webpack_require__(20)
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
		list : __webpack_require__(22)
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
		list : __webpack_require__(21),
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
		list : __webpack_require__(27),
		one : __webpack_require__(28)
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
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <div class="title">\r\n          <%-title%>\r\n          <div class="action-area">\r\n            <a class="btn btn-primary" data-action="up">置顶</a>\r\n            <div class="btn-group">\r\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\r\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\r\n            </div>        \r\n            <a class="return" href="/info.html?id=<%-id%>&sid=<%-subject_id%>">返回</a>\r\n          </div>\r\n        </div>\r\n        <div class="comment-list">\r\n          <article class="comment-one">\r\n              <aside class="comment-one-aside"><%-striker.util.getNowTime(updateTime)%></aside>\r\n              <div class="comment-one-info">\r\n                <div class="info-title"><%-name%></div>\r\n                <div class="info-action">\r\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount"><%-commentCount%></font></span>\r\n                </div>          \r\n                <dl class="comment-dl">\r\n                  <dt><a href="article.html?id=50"><%-title%></a></dt>\r\n                  <dd>\r\n                    <%-content%>\r\n                  </dd>\r\n                  <div class="comment-img-list">\r\n                    <%for(var j=0,m=resourceList.length;j<m;j++){\r\n                        var obj = resourceList[j];\r\n                        \r\n                        if(obj.type === 1){\r\n                    %>\r\n                      <div>\r\n                        <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n                      </div>\r\n                    <%}}%>                  \r\n          \r\n                </dl>\r\n              </div>\r\n            </article>\r\n        </div>',
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
	                buf.push('        <div class="title">\n          ', (__stack.lineno = 2, title), '\n          <div class="action-area">\n            <a class="btn btn-primary" data-action="up">置顶</a>\n            <div class="btn-group">\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\n            </div>        \n            <a class="return" href="/info.html?id=', (__stack.lineno = 9, id), "&sid=", (__stack.lineno = 9, subject_id), '">返回</a>\n          </div>\n        </div>\n        <div class="comment-list">\n          <article class="comment-one">\n              <aside class="comment-one-aside">', (__stack.lineno = 14, striker.util.getNowTime(updateTime)), '</aside>\n              <div class="comment-one-info">\n                <div class="info-title">', (__stack.lineno = 16, name), '</div>\n                <div class="info-action">\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount">', (__stack.lineno = 18, commentCount), '</font></span>\n                </div>          \n                <dl class="comment-dl">\n                  <dt><a href="article.html?id=50">', (__stack.lineno = 21, title), "</a></dt>\n                  <dd>\n                    ", (__stack.lineno = 23, content), '\n                  </dd>\n                  <div class="comment-img-list">\n                    ');
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <article class="artice-one article<%-item.id%>">\r\n    <aside class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></aside>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updator%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" width="200" />\r\n              <%\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </article>\r\n<%}%>',
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
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 9, item.id), '"><span></span>回复</span>\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=', (__stack.lineno = 12, item.id), "&sid=", (__stack.lineno = 12, item.subject_id), '">', (__stack.lineno = 12, item.title), "</a></dt>\n        <dd>\n          ", (__stack.lineno = 14, item.content), "\n        </dd>\n        ");
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
/* 23 */
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
/* 27 */
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
/* 28 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgM2M5MDkyOWVlZmRhMGM5YmJkMGI/NTFjNyoqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzPzViMjcqIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanM/ZWM0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L2xpc3QuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qcz85MGFiIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vbXNnLmpzPzIzN2IqIiwid2VicGFjazovLy8uL3NyYy9qcy9sYWJlbC9sYWJlbC5qcz8xM2RlIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vY2dpLmpzPzIzYjIqIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanM/OWRlOSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci9tYW5hZ2UuanM/OGRiNSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanM/YWVkOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL29uZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzPzNmYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9jb21tZW50L2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci91c2VyX25hdi5lanM/NmZmYiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqcz81M2EzIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzPzUxMTQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3Iiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvbGlzdC5lanM/MzVmMiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL29uZS5lanM/MzU3ZiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkI7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsUTs7Ozs7O0FDOUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSw4QztBQUNBLDZDQUE0QztBQUM1Qyx5Qzs7QUFFQSwyRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwrQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0Esd0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCOzs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFU7QUFDQSxNQUFLLEU7QUFDTDs7O0FBR0E7O0FBRUEsMEI7Ozs7OztBQzlMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQSwwQjs7Ozs7O0FDdE1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QjtBQUNBOztBQUVBOztBQUVBLHFCOzs7Ozs7QUMzR0E7QUFDQTtBQUNBOztBQUVBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7QUFDRjs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxpQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEIsZ0JBQWdCO0FBQzFDO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQSwwQkFBeUIsY0FBYztBQUN2QztBQUNBLG9DQUFtQyxJQUFJO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxFOzs7Ozs7Ozs7QUM3S0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUQ7QUFDQTs7QUFFQSxxQjs7Ozs7O0FDalBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7QUNoQkE7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWlDLElBQUk7QUFDckM7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxnQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7Ozs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQzNEQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw2aURBQTRpRCxJQUFJLEtBQUssc0RBQXNELDJFQUEyRSwrTUFBK007QUFDcjREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSx5REFBd0QsT0FBTztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUN2Q0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLElBQUksS0FBSyx5QkFBeUIsZ2NBQWdjLE9BQU8sS0FBSyxNQUFNLGlXQUFpVyw0RkFBNEYsbURBQW1ELElBQUksS0FBSyw2Q0FBNkMsdURBQXVELHVLQUF1SyxvQ0FBb0MsMEZBQTBGLDBDQUEwQyxtQ0FBbUMsdUNBQXVDO0FBQ3ZoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFpRSxPQUFPO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckVBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxJQUFJLEtBQUsseUJBQXlCLGtvQkFBa29CLE9BQU8sS0FBSyxNQUFNLDBJQUEwSSxTQUFTLEtBQUssT0FBTyxzVkFBc1YsK0dBQStHLElBQUksS0FBSyw2Q0FBNkMsdURBQXVELDZKQUE2SixtQ0FBbUMsdUNBQXVDO0FBQzNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtFQUFpRSxPQUFPO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3RFQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQzlCQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSx1WUFBc1ksSUFBSSxLQUFLLHlCQUF5Qiw0S0FBNEs7QUFDcGxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQzlCQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHdCQUF3QixpSkFBaUo7QUFDL047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxJQUFJLEtBQUsseUJBQXlCLHdIQUF3SDtBQUM3TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAzYzkwOTI5ZWVmZGEwYzliYmQwYlxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xyXG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXHJcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9pbmZvJyksXHJcblx0bGlzdCA9IHJlcXVpcmUoJy4vY29tbWVudC9saXN0JyksXHJcblx0cG9zdCA9IHJlcXVpcmUoJy4vY29tbWVudC9wb3N0JyksXHJcblx0bXNnID0gcmVxdWlyZSgnLi9jb21tb24vbXNnJyksXHJcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XHJcbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlciksXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1x0XHJcblxyXG52YXIgbm93QXJ0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdpZCcpLFxyXG5cdG5vd1N1YmplY3RJZCA9IHN0cmlrZXIudXRpbC5nZXRQYXJhbWV0ZXIoJ3NpZCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVzZXJMb2FkU3ViKGUsZCl7XHJcblx0IHZhciBjcG9zdCA9IG5ldyBwb3N0LnBvc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTsgXHJcblx0IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0ID0gY3Bvc3Q7XHJcblxyXG4gXHQgdmFyIGNsaXN0ID0gbmV3IGxpc3QubGlzdChub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG4gXHQgd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3QgPSBjbGlzdDtcclxuXHQgXHJcblx0IHZhciBhcnRJbmZvID0gbmV3IGFydGljbGUuaW5mbyhub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG5cdCBjcG9zdC5iaW5kRnVuKGNsaXN0KTtcclxuXHQgY2xpc3QuYmluZEZ1bihhcnRJbmZvKTtcclxufVxyXG5cclxudmFyIGhhbmRsZXJzID0ge1xyXG5cdCd1c2VyTG9hZFN1YicgOiB1c2VyTG9hZFN1YlxyXG59XHJcblxyXG5mb3IodmFyIGkgaW4gaGFuZGxlcnMpe1xyXG5cdFN0cmlrZXIuYmluZChpLGhhbmRsZXJzW2ldKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuXHRzdHJpa2VyLmFydGljbGUgPSBhcnRpY2xlO1xyXG5cdHN0cmlrZXIudXNlciA9IHVzZXI7XHJcblx0XHJcblx0d2luZG93LnN0cmlrZXIubXNnID0gbmV3IG1zZy5tZXNzYWdlKCk7XHJcblx0XHJcblx0dXNlci5pbml0KCk7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5pbml0KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcblxuZnVuY3Rpb24gZm9ybWF0VGltZShzdHIpe1xuXHR2YXIgZGF0ZSA9IG5ldyBEYXRlKHN0cik7XG5cbiAgICB2YXIgeXl5eSA9IGRhdGUuZ2V0RnVsbFllYXIoKS50b1N0cmluZygpOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHZhciBtbSA9IChkYXRlLmdldE1vbnRoKCkrMSkudG9TdHJpbmcoKTsgLy8gZ2V0TW9udGgoKSBpcyB6ZXJvLWJhc2VkICAgICAgICAgXG4gICAgdmFyIGRkICA9IGRhdGUuZ2V0RGF0ZSgpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgcmV0dXJuIHl5eXkgKyAnLScgKyAobW1bMV0/bW06XCIwXCIrbW1bMF0pICsgJy0nICsgKGRkWzFdP2RkOlwiMFwiK2RkWzBdKTtcdFxufVxuXG5mdW5jdGlvbiBnZXROb3dUaW1lKHN0cil7XG4gICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHZhciBhdGltZSA9IG5ldyBEYXRlKHN0cikuZ2V0VGltZSgpO1xuXG4gICAgdmFyIGMgPSBNYXRoLmZsb29yKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYy8zNjAwKSsn5YiG6ZKf5YmNJztcbiAgICB9ZWxzZSBpZihjPDM2MDAqMjQpe1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihjLygzNjAwKjI0KSkrJ+WkqeWJjSc7XG4gICAgfWVsc2V7XG4gICAgICAgIHJldHVybiBmb3JtYXRUaW1lKHN0cik7XG4gICAgfVxuXG59XG5cbnZhciBnZXRQYXJhbWV0ZXIgPSBmdW5jdGlvbihuYW1lLHN0cil7XG4gICAgc3RyID0gc3RyIHx8IGxvY2F0aW9uLmhyZWY7XG4gICAgdmFyIHIgPSBuZXcgUmVnRXhwKFwiKFxcXFw/fCN8JilcIiArIG5hbWUgKyBcIj0oW14mI10qKSgmfCN8JClcIiksIG0gPSBzdHIubWF0Y2gocik7XG4gICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudCghbSA/IFwiXCIgOiBtWzJdKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFtsZW49Ml0g5a2X5q+N5pWwKOWkmuWwkeS4quWtl+avjeeul+S4gOS4quWtlylcbiAqIEBleGFtcGxlXG4gKiAgICAgIGdldExlbignYWJj5LiA5LqM5LiJJyk7XG4gKi9cbnZhciBnZXRMZW4gPSBmdW5jdGlvbihzdHIsbGVuKXtcbiAgICAvL+ato+WImeWPluWIsOS4reaWh+eahOS4quaVsO+8jOeEtuWQjmxlbipjb3VudCvljp/mnaXnmoTplb/luqbjgILkuI3nlKhyZXBsYWNlXG4gICAgdmFyIGZhY3RvciA9IGxlbiB8fCAzO1xuICAgIHN0ciArPSAnJztcbiAgICB2YXIgemhDaGFyID0gc3RyLm1hdGNoKC9bXlxceDAwLVxceGZmXS9nKSB8fCBbXTtcbiAgICB2YXIgbGV0dGVyID0gc3RyLnJlcGxhY2UoL1teXFx4MDAtXFx4ZmZdL2cgLCAnJyk7XG4gICAgcmV0dXJuIHBhcnNlSW50KHpoQ2hhci5sZW5ndGggKyAobGV0dGVyLmxlbmd0aCAvIGZhY3RvcikpO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEBwYXJhbSB7bnVtYmVyfSBtYXgg5oC76ZW/5bqmXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFtsZW49Ml0g6ZW/5bqmXG4gKiBAZXhhbXBsZVxuICogICAgICBjaGFuZ2VMZW4oJ2FiY+S4gOS6jOS4iScsMTApO1xuICovXG52YXIgY2hhbmdlTGVuID0gZnVuY3Rpb24oc3RyLG1heCl7XG5cdHZhciBtYXggPSBtYXggfHwgMTA7XG5cdHZhciBsZW4gPSBnZXRMZW4oc3RyKTtcblx0dmFyIHJldCA9IG1heCAtIGxlbjtcblx0cmV0dXJuIHJldD49MD9yZXQ6MDtcbn1cblxud2luZG93LnN0cmlrZXIudXRpbCA9IHtcblx0Zm9ybWF0VGltZSA6IGZvcm1hdFRpbWUsXG5cdGdldFBhcmFtZXRlciA6IGdldFBhcmFtZXRlcixcbiAgICBnZXROb3dUaW1lIDogZ2V0Tm93VGltZSxcblx0Z2V0TGVuIDogZ2V0TGVuLFxuXHRjaGFuZ2VMZW4gOiBjaGFuZ2VMZW5cbn1cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDEgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS51c2VyLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XHJcblxyXG4vLyBVc2VyLmFkZERlZk1hbmFnZSA9IHVzZXJNYW5hZ2UuYWRkRGVmTWFuYWdlO1xyXG5cclxuVXNlci5nZXRNeUluZm8gPSBmdW5jdGlvbihjYil7XHJcblx0Y2dpLmluZm8oZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5teUluZm8gPSByZXMuZGF0YTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm5hdihyZXMuZGF0YSk7XHJcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRTdWInLHJlcy5jb2RlKTtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXJsb2FkJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuZ2V0VXNlckxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubGlzdCA9IHJlcy5kYXRhO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5Vc2VyLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdF90aGlzLmdldE15SW5mbygpO1xyXG5cdF90aGlzLmdldFVzZXJMaXN0KCk7XHJcblx0dXNlck1hbmFnZS5pbml0KGNnaSx0bXBsKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci91c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIHRtcGwgPSB7XHJcblx0aW5mbyA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL29uZS5lanMnKVxyXG59O1xyXG5cclxudmFyIEluZm8gPSB7fVxyXG5tb2R1bGUuZXhwb3J0cyA9IEluZm87XHJcblxyXG52YXIgYXJ0aWNsZUluZm8gPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLmRvbSA9ICQoJyNhcnRpY2xlSW5mbycpO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5jTGlzdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRsaXN0O1xyXG5cdHRoaXMuY3Bvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHJcblx0dGhpcy5nZXREYXRlKCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5pbmZvKHtpZDogdGhpcy5hcnRJZH0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0cmVzLmRhdGEuc2lkID0gX3RoaXMuc3ViSWQ7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5pbmZvKHJlcy5kYXRhKTtcclxuXHRcdFx0XHJcblx0XHRcdF90aGlzLmRhdGEgPSByZXMuZGF0YTtcclxuXHRcdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdF90aGlzLmNEb20gPSAkKFwiI2NvbW1lbnRDb3VudFwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2coJ3VwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0Y29uc29sZS5sb2coJ3NldHVwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnZWRpdCcpO1x0XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnNvbGUubG9nKCdkZWxldGUnKTtcdFxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieWNyZWF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5jTGlzdC5vcmRlcmJ5dXBkYXRlKCk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cGRhdGVDb3VudCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5kYXRhLmNvbW1lbnRDb3VudCsrO1xyXG5cdHRoaXMuY0RvbS50ZXh0KHRoaXMuZGF0YS5jb21tZW50Q291bnQpO1xyXG59XHJcblxyXG5JbmZvLmluZm8gPSBhcnRpY2xlSW5mbztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuY29tbWVudDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9jb21tZW50L2xpc3QuZWpzJylcclxufTtcclxuXHJcbnZhciBDb21tZW50ID0ge31cclxuXHJcbnZhciBsaXN0ID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjY29tbWVudExpc3RcIik7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSdcclxuXHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5saW1pdCA9IDM7XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMucG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cdHRoaXMubXNnID0gd2luZG93LnN0cmlrZXIubXNnO1xyXG5cclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH07XHJcblxyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5vcmRlcmJ5Y3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLm9yZGVyID09PSAnY3JlYXRlVGltZScpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5vcmRlcmJ5dXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLm9yZGVyID09PSAndXBkYXRlVGltZScpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cdFxyXG5cdHRoaXMub3JkZXIgPSAndXBkYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5nZXREYXRlKCk7XHRcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUubG9hZE1vcmUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRjbmFtZSA9IHRoaXMudGFyZ2V0LmRhdGEoJ2NuYW1lJyk7XHJcblxyXG5cdHRoaXMucG9zdC5yZXBsYXkoaWQsY25hbWUpO1xyXG59XHRcclxuXHJcbmxpc3QucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhciA9IHBhcnNlSW50KHRoaXMudGFyZ2V0LmRhdGEoJ3N0YXR1cycpKTtcclxuXHJcblx0aWYoIXN0YXIpe1xyXG5cdFx0c3RhciA9IDA7XHJcblx0fVxyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGNvbW1lbnRJZCA6IGlkLFxyXG5cdFx0XHRpc1N0YXIgOiBzdGFyID8gMCA6MVxyXG5cdFx0fTtcclxuXHRcdHZhciB0ZXh0ID0gc3Rhcj8n6LWeJzon5bey6LWeJztcclxuXHRcdGNnaS5zdGFyKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uZGF0YSgnc3RhdHVzJyxwYXJhbS5pc1N0YXIpO1xyXG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5jb2xsZWN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhciA9IHBhcnNlSW50KHRoaXMudGFyZ2V0LmRhdGEoJ3N0YXR1cycpKTtcclxuXHJcblx0aWYoIXN0YXIpe1xyXG5cdFx0c3RhciA9IDA7XHJcblx0fVxyXG5cclxuXHRpZihpZCl7XHJcblx0XHR2YXIgZG9tID0gdGhpcy50YXJnZXQ7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdGNvbW1lbnRJZCA6IGlkLFxyXG5cdFx0XHRpc0NvbGxlY3QgOiBzdGFyID8gMCA6MVxyXG5cdFx0fTtcclxuXHRcdHZhciB0ZXh0ID0gc3Rhcj8n5pS26JePJzon5Y+W5raI5pS26JePJztcclxuXHRcdGNnaS5jb2xsZWN0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRkb20uZGF0YSgnc3RhdHVzJyxwYXJhbS5pc0NvbGxlY3QpO1xyXG5cdFx0XHRcdGRvbS5odG1sKCc8c3Bhbj48L3NwYW4+Jyt0ZXh0KTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdFx0dGhpcy5tc2cuY29uZmlybSgn56Gu5a6a6KaB5Yig6Zmk6K+l5Zue5aSNPycsbnVsbCxmdW5jdGlvbigpe1xyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0Y29tbWVudElkIDogaWRcclxuXHRcdFx0fTtcclxuXHRcdFx0Y2dpLmRlbGV0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdCQoXCIuY29tbWVudFwiK2lkKS5yZW1vdmUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7XHJcblx0XHRsaXN0IDogW2RhdGFdXHJcblx0fSk7XHJcblx0dGhpcy5hcnRJbmZvLnVwZGF0ZUNvdW50KCk7XHJcblx0dGhpcy5kb20ucHJlcGVuZChodG1sKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKGluZm8pe1xyXG5cdHRoaXMuYXJ0SW5mbyA9IGluZm87XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG4gICAgJChkb2N1bWVudCkub24oJ3Njcm9sbCcsZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIHNjcm9sbERvbSA9IGRvY3VtZW50LmJvZHk7XHJcbiAgICAgICAgdmFyIHBhZ2VIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0O1xyXG4gICAgICAgIHZhciBzY3JvbGxUb3AgPSBzY3JvbGxEb20uc2Nyb2xsVG9wO1xyXG4gICAgICAgIHZhciBzY3JvbGxIZWlnaHQgPSBzY3JvbGxEb20uc2Nyb2xsSGVpZ2h0O1xyXG5cclxuICAgICAgICAvL+WIpOaWreaYr+WQpuWIsOW6leS6hlxyXG4gICAgICAgIGlmKHNjcm9sbFRvcCArIHBhZ2VIZWlnaHQgPj0gc2Nyb2xsSGVpZ2h0KXtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZygnZW5kJyk7XHJcbiAgICAgICAgICAgIF90aGlzLmxvYWRNb3JlKCk7XHJcbiAgICAgICAgfSAgICAgICAgICAgICAgICBcclxuICAgIH0pO1x0XHRcclxufVxyXG5cclxuXHJcbkNvbW1lbnQubGlzdCA9IGxpc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIENvbW1lbnQgPSB7fVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNwb3N0QXJlYVwiKTtcclxuXHR0aGlzLnBvcERvbSA9ICQoXCIjY3JlYXRlQ29tbWVudFwiKTtcclxuXHR0aGlzLmNvbnRlbnREb20gPSB0aGlzLmRvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tID0gdGhpcy5wb3BEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20gPSB0aGlzLnBvcERvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5wb3BEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmFydGljbGVMaXN0ID0gb2JqLmxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNoYW5nZUFydGljbGUgPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24obGlzdCl7XHJcblx0dGhpcy5jTGlzdCA9IGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKGlkLG5hbWUpe1xyXG5cdHRoaXMuY29udGVudERvbS52YWwoJ+WbnuWkjSAnK25hbWUrJzonKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgY29udGVudCA9IHRoaXMuY29udGVudERvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiAnJyxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5jb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cclxuXHR2YXIgY29udGVudCA9IHRoaXMucG9wQ29udGVudERvbS52YWwoKTtcclxuXHR2YXIgdGl0bGUgPSB0aGlzLnBvcFRpdGxlRG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6IHRpdGxlLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKF90aGlzLmNMaXN0KXtcclxuXHRcdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLnBvcENvbnRlbnREb20udmFsKCcnKTtcclxuXHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0X3RoaXMucG9wRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuc2hvd1Bvc3QgPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5jaGFuZ2VBcnRpY2xlKGlkKTtcclxuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHJcblx0XHRpZih0aGlzLnBvcERvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0dGhpcy5jcmVzRG9tLmhpZGUoKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihpZCxuYW1lKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR2YXIgdXBsb2FkQ29tcCAgPSBmdW5jdGlvbihkKXtcclxuXHRcdFx0Y29uc29sZS5sb2coJ2NvbW1lbnQgJyk7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LnVwbG9hZENvbXApe1xyXG5cdFx0Y29uc29sZS5sb2coJ2hhdmUgY2FtcCcpO1xyXG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0XHRjb25zb2xlLmxvZyhkKTtcclxuXHRcdFx0dXBsb2FkQ29tcChkKTtcclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0Y29uc29sZS5sb2coJ25vIGNhbXAnKTtcclxuXHRcdHdpbmRvdy51cGxvYWRDb21wID0gdXBsb2FkQ29tcDtcclxuXHR9XHJcblxyXG5cdCQoXCIjY2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdCQoXCIjY2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdHRoaXMucG9wRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gdHJ1ZTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSBmYWxzZTtcclxuXHR9KTtcdFxyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5wb3BEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxufVxyXG5cclxuQ29tbWVudC5wb3N0ID0gcG9zdDtcclxubW9kdWxlLmV4cG9ydHMgPSBDb21tZW50O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbWVudC9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDNcbiAqKi8iLCJ2YXIgbXNnID0ge1xyXG5cdDAgOiAn5pON5L2c5oiQ5YqfIScsXHJcblx0MTA6ICfmjpLluo/luo/lj7flv4XpobvloavlhpknLFxyXG5cdDExIDogJ+e7hOe7h+WQjeensOW/hemhu+Whq+WGmScsXHJcblx0MjAgOiAn5paw5a+G56CB5ZKM6YeN5aSN5a+G56CB5b+F6aG75LiA6Ie0JyxcclxuXHQyMSA6ICfor7floavlhpnnlKjmiLflkI3lkozlr4bnoIEhJyxcclxuXHQyMiA6ICfnlKjmiLfkuI3lrZjlnKgnLFxyXG5cdDMwIDogJ+e7hOe7h+acgOWkmuaUr+aMgTPnuqchJywgXHJcblx0NDAgOiAn6K+l55uu5b2V5LiL6L+Y5pyJ5YW25LuW5paH5Lu277yM5peg5rOV5Yig6ZmkIScsXHJcblx0NTAgOiAn5L2g6KaB5LiK5Lyg55qE5paH5Lu25bey57uP6LaF6L+H5L2g55qE5Ymp5L2Z56m66Ze0IScsXHJcblx0NjAgOiAn5L2g6L+Y5rKh5pyJ6YCJ5oup6KaB5YWx5Lqr55qE55uu5b2VJyxcclxuXHQ3NSA6ICfluo/lj7flj6rog73lnKgxfjk55LmL6Ze0JyxcclxuXHQ3NiA6ICflkI3np7DkuI3og73lsJHkuo4y5Liq5a2XJyxcclxuXHQ3NyA6ICflj4LmlbDkuI3og73kuLrnqbonLFxyXG5cdDc4IDogJ+WvueS4jei1t++8jOe9kee7nOi2heaXtuS6hu+8jOivt+eojeWQjuWGjeivlScsXHJcblx0NzkgOiAn5bey57uP5pyJ5ZCM5ZCN55qE6aG555uu5LqGJyxcclxuXHQxMDAgOiAn5a+55LiN6LW377yM5oKo5rKh5pyJ6L+Z5Liq5pON5L2c5p2D6ZmQIScsLy/lkI7lj7Dlh7rplJnllaYhXHJcblx0MTAxIDogJ+WHuumUmeWVpicsXHJcblx0MTAwMSA6ICfmgqjov5jmsqHmnInnmbvlvZUhJyxcclxuXHQxMDA0IDogJ+ayoeacieaJvuWIsOi1hOa6kCEnLFxyXG5cdDEwMTAgOiAn5oKo5rKh5pyJ5p+l55yL6K+l6LWE5rqQ55qE5p2D6ZmQIScsXHJcblx0MTAxMSA6ICflj4LmlbDlh7rplJnllaYhJyxcclxuXHQxMDEzIDogJ+WHuumUmeWVpicsXHJcblx0MTAxNCA6ICflt7Lnu4/lhbPms6jor6XkuLvpopgnLFxyXG5cdDEwMTUgOiAn5bey57uP5b2S5qGj5ZWmIScsXHJcblx0MTAxNiA6ICfor6XotYTmupDkuI3og73liKDpmaQnLFxyXG5cdDEwMTcgOiAn6K+l55uu5b2V5LiL6L+Y5pyJ5YW25LuW5paH5Lu277yM5peg5rOV5Yig6ZmkIScsXHJcblx0MTA0MSA6ICfnlKjmiLflkI3miJblr4bnoIHplJnor68hJyxcclxuXHQxMDQzIDogJ+eUqOaIt+S4jeWtmOWcqCEnLFxyXG5cdDEwNTAgOiAn5pe26Ze05Lqk5Y+J5LqGISdcclxufVxyXG5cclxuTWVzc2VuZ2VyKCkub3B0aW9ucyA9IHtcclxuICAgIGV4dHJhQ2xhc3NlczogJ21lc3Nlbmdlci1maXhlZCBtZXNzZW5nZXItb24tYm90dG9tJyxcclxuICAgIHRoZW1lOiAnZmxhdCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcblxyXG5mdW5jdGlvbiBtZXNzYWdlKCl7XHJcblx0dGhpcztcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUuY29uZmlybSA9IGZ1bmN0aW9uKG1zZyxsYWJlbCxjYil7XHJcblx0aWYodHlwZW9mIGxhYmVsID09PSAndW5kZWZpbmVkJyB8fCBsYWJlbCA9PT0gbnVsbCl7XHJcblx0XHRsYWJlbCA9IHtcclxuXHRcdFx0c3ViIDogJ+ehruWumicsXHJcblx0XHRcdGNhbmNlbCA6ICflj5bmtognXHJcblx0XHR9XHJcblx0fVxyXG5cdGlmKHR5cGVvZiBjYiA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0Y2IgPSBmdW5jdGlvbigpe307XHJcblx0fVxyXG5cdGlmKHR5cGVvZiBtc2cgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdHZhciBvYmogPSB7XHJcblx0XHRtZXNzYWdlIDogbXNnLFxyXG5cdFx0YWN0aW9ucyA6IHtcclxuXHRcdFx0c3ViIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuc3ViIHx8ICfnoa7lrponLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRjYigpO1xyXG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGNhbmNlbCA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLmNhbmNlbCB8fCAn5Y+W5raIJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0bXNnLmhpZGUoKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0dmFyIG1zZyA9IE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbihkKXtcclxuXHQvLyBpZihkID09IDEwMDEpe1xyXG5cdC8vIFx0d2luZG93LmxvY2F0aW9uID0gY29uZmlnLmNnaS5nb3RvbG9naW47XHJcblx0Ly8gXHRyZXR1cm47XHJcblx0Ly8gfVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChkKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnIHx8ICcnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KG1zZykpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHRcdFxyXG59XHJcblxyXG5kYi5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vbXNnLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sYWJlbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIExhYmVsID0ge30sXHJcblx0X3RoaXMgPSBMYWJlbDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9vbmUuZWpzJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0KCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIituYW1lKTtcclxuXHJcblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmFkZERvbSA9IHRoaXMuZG9tLmZpbmQoJy5hZGQtbGFiZWwtYXJlYScpO1xyXG5cdC8vIGlmKHR5cGUgPT09ICdzdWInKXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dTdWJMYWJlbCcpO1xyXG5cdC8vIH1lbHNle1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd0FydExhYmVsJyk7XHJcblx0Ly8gfVxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5idG5Eb20gPSB0aGlzLmFkZERvbS5maW5kKCcuYnRuJyk7XHJcblx0dGhpcy5pbnB1dERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcclxuXHJcblx0Ly/pu5jorqTmsqHmnInmoIfnrb5cclxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cclxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1x0XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvL1xyXG5cdC8vIHRoaXMubm93RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdC8vIFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0Ly8gXHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHQvLyBcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIHZhbCA9IHRoaXMuaW5wdXREb20udmFsKCk7XHJcblx0aWYodmFsICE9PSAnJyl7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdG5hbWUgOiB2YWxcclxuXHRcdH07XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLm1hcFtyZXMuZGF0YS5pZF0gPSByZXMuZGF0YTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XHJcblx0XHRcdFx0X3RoaXMubGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oZSl7XHJcblx0Ly8gL2NvbnNvbGUubG9nKHRoaXMuX3NlbGVjdERvbSk7XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cdH1cclxuXHQvL3RoaXMuYWRkRG9tLnNob3coKTtcclxuXHQvL3RoaXMubm93RG9tLnNob3coKTtcclxuXHJcblx0Ly9mdWktY3Jvc3NcclxuXHQvL2Z1aS1wbHVzXHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5saXN0KHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMCxsPXJlcy5kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xyXG5cdFx0XHRcdF90aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxyXG5cdH1cclxuXHJcblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdGlmKHRoaXMubm93RG9tLmZpbmQoJy5sYWJlbCcraWQpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lKHBhcmFtKTtcclxuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XHJcblx0Ly8gdGhpcy5ub3dEb20uZmluZChcIi50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHQvLyBcdGlmKGlkKXtcclxuXHQvLyBcdFx0bGlzdC5wdXNoKGlkKTtcclxuXHQvLyBcdH1cdFx0XHRcdFxyXG5cdC8vIH0pXHRcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLm5vd0RvbS5odG1sKCcnKS5oaWRlKCk7XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+WIoOmZpFxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRwLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuTGFiZWwuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxyXG5cdG1lc3NhZ2UgPSByZXF1aXJlKCcuL21zZycpO1xyXG5cclxudmFyIG1zZyA9IG5ldyBtZXNzYWdlLm1lc3NhZ2UoKTtcclxuXHJcbnZhciBjZ2lQYXRoID0gJy9jZ2kvJztcclxudmFyIGNnaUxpc3QgPSB7XHJcblx0dXNlciA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKyd1c2VyL2xpc3QnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3VzZXIvaW5mbycsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKyd1c2VyL2NyZWF0ZSdcclxuXHR9LFxyXG5cdHN1YmplY3QgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydzdWJqZWN0L3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnc3ViamVjdC9pbmZvJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydzdWJqZWN0L2VkaXQnLCAvL+S/ruaUueS4u+mimFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnc3ViamVjdC9jcmVhdGUnLFxyXG5cdFx0ZGVsZXRlIDogY2dpUGF0aCsnc3ViamVjdC9kZWxldGUnLFxyXG5cdFx0Zm9sbG93IDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3cnLCAvL+WFs+azqFxyXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0aW52aXRlZCA6IGNnaVBhdGgrJ3N1YmplY3QvaW52aXRlZCcsIC8v6YKA6K+35YiX6KGoXHJcblx0XHRhcmNoaXZlZCA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZWQnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0YXJjaGl2ZSA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZScsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRkZWxyZXNvdXJjZSA6IGNnaVBhdGggKyAnc3ViamVjdC9kZWxyZXNvdXJjZScgLy/liKDpmaTkuIDkuKrotYTmupBcclxuXHR9LFxyXG5cdGFydGljbGUgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydhcnRpY2xlL3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnYXJ0aWNsZS9pbmZvJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXJpbmcnLCAvL+i1nueahOW4luWtkFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0ZWQnLCAvL+aQnOiXj+eahOW4luWtkFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2FydGljbGUvZWRpdCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyJywgLy/otZ5cclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3QnLCAvL+aUtuiXj1xyXG5cdFx0ZGVsZXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRjb21tZW50IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnY29tbWVudC9zZWFyY2gnLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3RlZCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnY29tbWVudC9zdGFyJyxcclxuXHRcdGRlbGV0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvZGVsZXRlJyxcclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3QnLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnY29tbWVudC9jcmVhdGUnXHJcblx0fSxcclxuXHRsYWJlbCA6IHtcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2xhYmVsL2NyZWF0ZScsXHJcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcclxuXHR9LFxyXG5cdGxvZ2luIDogY2dpUGF0aCsnYWNjb3VudC9sb2dpbicsXHJcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG52YXIgZW1wdHlGdW4gPSBmdW5jdGlvbihyZXMpe1xyXG59XHJcbi8vIC/nu5/kuIDlh7rmnaXlvLnlh7rmtojmga9cclxudmFyIGNoZWNrQ2FsbGJhY2sgPSBmdW5jdGlvbihjYixmbGFnKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNiKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSAhPT0gMCl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9ZWxzZSBpZihmbGFnKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRiLmxvZ2luID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ2luLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubG9nb3V0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubG9nb3V0LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlciA9IHt9O1xyXG5kYi51c2VyLmxpc3QgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmxpc3QsbnVsbCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIuaW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuaW5mbyxudWxsLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG4vL+ebtOaOpeaLieaJgOacieeUqOaItz9cclxuZGIudXNlci5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdCA9IHt9O1xyXG5cclxuZGIuc3ViamVjdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5kZWxldGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxldGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3cgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmZvbGxvdyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3dpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmZvbGxvd2luZyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbnZpdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbnZpdGVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5kZWxyZXNvdXJjZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZGVscmVzb3VyY2UscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmFydGljbGUgPSB7fTtcclxuXHJcbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuZGVsZXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5kZWxldGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50ID0ge307XHJcblxyXG5kYi5jb21tZW50LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmRlbGV0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuZGVsZXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubGFiZWwuY3JlYXRlLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmxhYmVsLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sYWJlbC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2NnaS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbi8vdmFyIG1hbmFnZURvbSA9ICQoXCIjYWRkTWFuYWdlXCIpOyAvL+euoeeQhuWRmOiuvue9rmRvbTtcclxuXHJcbi8v6YCJ5oup566h55CG5ZGY562J562J55qE5LqL5Lu257uR5a6aXHJcbi8qXHJcbnZhciBtYW5hZ2VBY3Rpb24gPSB7XHJcblx0c2VhcmNoIDogZnVuY3Rpb24odGFyZ2V0KXtcclxuXHRcdHZhciBrZXkgPSB0YXJnZXQudmFsKCk7XHJcblx0XHRpZihrZXkgIT09ICcnKXtcclxuXHRcdFx0bWFuYWdlQWN0aW9uLnNlYXJjaGJ0bih0YXJnZXQpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VhcmNoYnRuIDogZnVuY3Rpb24odGFyZ2V0KXtcclxuXHRcdHZhciBrZXkgPSAkKFwiI3NlbGVjdE9uZU1hbmFnZVwiKS52YWwoKTtcclxuXHRcdHZhciBsaXN0ID0gZGF0YS5saXN0O1xyXG5cdFx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdFx0aWYoa2V5ID09PSAnJyl7XHJcblx0XHRcdG1hbmFnZURvbS5maW5kKCdsaScpLnNob3coKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRcdGlmKGl0ZW0ubmFtZS5pbmRleE9mKGtleSk+PTApe1xyXG5cdFx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdG1hbmFnZURvbS5maW5kKCdsaScpLmhpZGUoKTtcclxuXHRcdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHQkKFwiI3VzZXJcIit1bGlzdFtpXSkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH0sXHJcblx0c2VsZWN0dXNlciA6IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0XHR2YXIgaWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdFx0aWYoJChcIiNtYW5hZ2VcIitpZCkubGVuZ3RoPT09MCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0XHRcdGlkIDogaWQsXHJcblx0XHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHRcdCQoXCIjbm93TWFuYWdlXCIpLmFwcGVuZChodG1sKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcbiovXHJcblxyXG4vLyBmdW5jdGlvbiBiaW5kTWFuYWdlQWN0aW9uKCl7XHJcbi8vIFx0bWFuYWdlRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuLy8gXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuLy8gXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuLy8gXHRcdGlmKGFjdGlvbiAmJiBtYW5hZ2VBY3Rpb25bYWN0aW9uXSl7XHJcbi8vIFx0XHRcdG1hbmFnZUFjdGlvblthY3Rpb25dKHRhcmdldCk7XHJcbi8vIFx0XHR9XHJcbi8vIFx0fSk7XHJcblxyXG4vLyBcdCQoXCIjc2VsZWN0T25lTWFuYWdlXCIpLmJpbmQoJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuLy8gXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuLy8gXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XHJcblxyXG4vLyBcdFx0aWYoYWN0aW9uICYmIG1hbmFnZUFjdGlvblthY3Rpb25dKXtcclxuLy8gXHRcdFx0bWFuYWdlQWN0aW9uW2FjdGlvbl0odGFyZ2V0KTtcclxuLy8gXHRcdH1cclxuLy8gXHR9KTtcclxuLy8gfVxyXG5cclxuLy8gdU1hbmFnZS5zaG93ID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuLy8gXHRpZighbWFuYWdlSGF2ZSl7XHJcbi8vIFx0XHR2YXIgaHRtbCA9IHRtcGwubWFuYWdlKHtcclxuLy8gXHRcdFx0bGlzdCA6IGRhdGEubGlzdCxcclxuLy8gXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xyXG4vLyBcdFx0fSk7XHJcbi8vIFx0XHRtYW5hZ2VEb20uaHRtbChodG1sKTtcclxuLy8gXHRcdGJpbmRNYW5hZ2VBY3Rpb24oKTtcclxuLy8gXHR9XHJcbi8vIH1cclxuXHJcbi8vIHVNYW5hZ2UuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuLy8gXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuLy8gXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcbi8vIFx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG4vLyBcdH0pO1xyXG4vLyBcdCQoXCIjbm93TWFuYWdlXCIpLmh0bWwoaHRtbCk7XHRcclxuLy8gfVxyXG5cclxudmFyIG1hbmFnZSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0Ly/nu5nlrprljLrln59kb23nmoTlkI3lrZdcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrdGFyZ2V0KTtcclxuXHR0aGlzLm1hbmFnZUhhdmUgPSBmYWxzZTtcclxuXHQvL+eUqOaIt+WIl+ihqFxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtbGlzdCcpO1xyXG5cdHRoaXMuc2VsZWN0RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1tYW5hZ2UtbGlzdCcpO1xyXG5cdC8v5pCc57Si5qGGXHJcblx0dGhpcy5rZXlEb207XHJcblxyXG5cdC8v5b2T5YmN5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHQvL+mAieS4reeahOeuoeeQhuWRmOWIl+ihqFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdC8v5oqK6Ieq5bex5pS+5Zyo566h55CG5ZGY5YiX6KGo6YeM6Z2iXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcdFxyXG5cclxufVxyXG5cclxuLy/liJ3lp4vljJbkuIDkuIsuXHJcbm1hbmFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG4vL+aYvuekuueuoeeQhuWRmOWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oKXtcclxuXHQvL+WmguaenOi/mOayoeacieWhq+WIl+ihqC7miorliJfooajloavkuIDkuIsuXHJcblx0aWYoIXRoaXMubWFuYWdlSGF2ZSl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwubWFuYWdlKHtcclxuXHRcdFx0bGlzdCA6IGRhdGEubGlzdCxcclxuXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdHRoaXMua2V5RG9tID0gdGhpcy5saXN0RG9tLmZpbmQoJ2lucHV0W25hbWU9bWFuYWdla2V5XScpO1xyXG5cdFx0dGhpcy5rZXl1cEFjdGlvbigpO1xyXG5cdFx0Ly9iaW5kTWFuYWdlQWN0aW9uKCk7XHJcblx0fVxyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uaGlkZSgpO1xyXG5cdH1cdFxyXG59XHJcblxyXG4vL+WinuWKoOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLmFkZERlZk1hbmFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbm1hbmFnZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLy/mkJzntKLmjInpkq5cclxubWFuYWdlLnByb3RvdHlwZS5zZWFyY2hidG4gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBrZXkgPSB0aGlzLmtleURvbS52YWwoKTtcclxuXHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcclxuXHR2YXIgdWxpc3QgPSBbXTtcclxuXHJcblx0aWYoa2V5ID09PSAnJyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5zaG93KCk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRmb3IodmFyIGkgPSAwLGwgPSBsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdGlmKGl0ZW0ubmFtZS5pbmRleE9mKGtleSk+PTApe1xyXG5cdFx0XHR1bGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5oaWRlKCk7XHJcblx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZChcIi51c2VyXCIrdWxpc3RbaV0pLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5Yig6Zmk5LiA5Liq6YCJ5Lit55qE566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoJy50YWcnKSxcclxuXHRcdGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuLy/kuovku7bnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy/ovpPlhaXmoYbnmoRrZXl1cOe7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmtleXVwQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMua2V5RG9tLmJpbmQoJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnVNYW5hZ2UubWFuYWdlID0gbWFuYWdlO1xyXG51TWFuYWdlLmluaXQgPSBmdW5jdGlvbihtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJmdW5jdGlvbiBlbXB0eUZ1bihyZXMpe1xyXG5cdGNvbnNvbGUubG9nKHJlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ1BPU1QnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhamF4KG9wdCxjYWxsYmFjayxlcnJvcil7XHJcblx0dmFyIHR5cGUgPSBvcHQudHlwZSB8fCAnR0VUJyxcclxuXHRcdHVybCA9IG9wdC51cmwsXHJcblx0XHRkYXRhID0gb3B0LmRhdGE7XHJcblxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGUgOiB0eXBlLFxyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0ZGF0YSA6IGRhdGEsXHJcblx0XHRzdWNjZXNzIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0Y2FsbGJhY2socmVzKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvciA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGVycm9yKHJlcyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWpheCA6IGFqYXgsXHJcblx0cG9zdCA6IHBvc3QsXHJcblx0Z2V0IDogZ2V0XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxcclxcbiAgICAgICAgICA8JS10aXRsZSU+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tYXJlYVwiPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1hY3Rpb249XCJ1cFwiPue9rumhtjwvYT5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJyZXR1cm5cIiBocmVmPVwiL2luZm8uaHRtbD9pZD08JS1pZCU+JnNpZD08JS1zdWJqZWN0X2lkJT5cIj7ov5Tlm548L2E+XFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1saXN0XCI+XFxyXFxuICAgICAgICAgIDxhcnRpY2xlIGNsYXNzPVwiY29tbWVudC1vbmVcIj5cXHJcXG4gICAgICAgICAgICAgIDxhc2lkZSBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSklPjwvYXNpZGU+XFxyXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPjwlLW5hbWUlPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiAgZGF0YS1hY3Rpb249XCJzZXR1cFwiPjxzcGFuPjwvc3Bhbj7otZ48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiPjxzcGFuPjwvc3Bhbj7lm57lpI0gPGZvbnQgaWQ9XCJjb21tZW50Q291bnRcIj48JS1jb21tZW50Q291bnQlPjwvZm9udD48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgICAgICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTUwXCI+PCUtdGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgICAgICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlLWNvbnRlbnQlPlxcclxcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlZm9yKHZhciBqPTAsbT1yZXNvdXJjZUxpc3QubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JX19JT4gICAgICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDwvZGw+XFxyXFxuICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2FydGljbGU+XFxyXFxuICAgICAgICA8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxcbiAgICAgICAgICAnLCAoX19zdGFjay5saW5lbm8gPSAyLCB0aXRsZSksICdcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1hcmVhXCI+XFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWFjdGlvbj1cInVwXCI+572u6aG2PC9hPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXG4gICAgICAgICAgICA8YSBjbGFzcz1cInJldHVyblwiIGhyZWY9XCIvaW5mby5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDksIGlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSA5LCBzdWJqZWN0X2lkKSwgJ1wiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXG4gICAgICAgICAgPGFydGljbGUgY2xhc3M9XCJjb21tZW50LW9uZVwiPlxcbiAgICAgICAgICAgICAgPGFzaWRlIGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSkpLCAnPC9hc2lkZT5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+JywgKF9fc3RhY2subGluZW5vID0gMTYsIG5hbWUpLCAnPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE4LCBjb21tZW50Q291bnQpLCAnPC9mb250Pjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICAgICAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9NTBcIj4nLCAoX19zdGFjay5saW5lbm8gPSAyMSwgdGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgICAgICAgICAgIDxkZD5cXG4gICAgICAgICAgICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAyMywgY29udGVudCksICdcXG4gICAgICAgICAgICAgICAgICA8L2RkPlxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxuICAgICAgICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI2O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gcmVzb3VyY2VMaXN0Lmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gcmVzb3VyY2VMaXN0W2pdO1xuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCIgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDwvZGw+XFxuICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8L2FydGljbGU+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8YXJ0aWNsZSBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZTwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8YXNpZGUgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9hc2lkZT5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3IlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9hcnRpY2xlPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxhcnRpY2xlIGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG4gICAgPGFzaWRlIGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9hc2lkZT5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgXCImc2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5zdWJqZWN0X2lkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaW1nbnVtID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBpdGVtLnJlc291cmNlLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDI2LCBvYmouaWQpLCAnXCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChmaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbFcIiwgKF9fc3RhY2subGluZW5vID0gMzEsIGl0ZW0uaW1nbnVtKSwgXCLlvKA8L3NwYW4+XFxuICAgICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgIDwvZGl2PlxcbiAgPC9hcnRpY2xlPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxhcnRpY2xlIGNsYXNzPVwiY29tbWVudC1vbmUgY29tbWVudDwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8YXNpZGUgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvYXNpZGU+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJjb2xsZWN0XCIgIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc0NvbGxlY3QlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuWPlua2iOaUtuiXjzwlfWVsc2V7JT7mlLbol488JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1jbmFtZT1cIjwlLWl0ZW0uY3JlYXRvck5hbWUlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+XFxyXFxuICAgICAgICAgIDwvZGl2PiBcXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgPGR0PjwlLWl0ZW0udGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLnJlc291cmNlKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvYXJ0aWNsZT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8YXJ0aWNsZSBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8YXNpZGUgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9hc2lkZT5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pc1N0YXIpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwiY29sbGVjdFwiICBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlzQ29sbGVjdCksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlj5bmtojmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLmlLbol49cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtY25hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5jcmVhdG9yTmFtZSksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcbiAgICAgICAgICA8L2Rpdj4gXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXG4gICAgICAgIDxkdD4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS50aXRsZSksIFwiPC9kdD5cXG4gICAgICAgIDxkZD5cXG4gICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDE2LCBpdGVtLmNvbnRlbnQpLCBcIlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxODtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0ucmVzb3VyY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNywgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvYXJ0aWNsZT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdFx0PCUtaXRlbS5uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVJlc1wiPjwvc3Bhbj5cXHJcXG5cdDwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuXHRcdCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVJlc1wiPjwvc3Bhbj5cXG5cdDwvc3Bhbj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA3O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT5cXHJcXG48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCBcIlxcbjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbDwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY29tbWVudC5qcyJ9