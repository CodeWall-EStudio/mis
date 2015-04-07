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
		articlepost = __webpack_require__(4),
		list = __webpack_require__(5),
		post = __webpack_require__(6),
		msg = __webpack_require__(7),
		label = __webpack_require__(8);
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
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(10).user,
		data = __webpack_require__(14).user,
		userManage = __webpack_require__(15),
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

	var cgi = __webpack_require__(10).article;
	var tmpl = {
		info : __webpack_require__(24)
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aPost = {},
		data = __webpack_require__(14),
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
	
	var cgi = __webpack_require__(10).article;
	var tmpl = {
		list : __webpack_require__(25),
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
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#fileForm").submit();
			}
		})	
	
		$("#cfileName").bind('change',function(e){
			var target = $(e.target);
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(10).comment;
	var tmpl = {
		list : __webpack_require__(26)
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
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(10).comment;
	var tmpl = {
		list : __webpack_require__(25),
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
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(10).label,
		data = __webpack_require__(14).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(28),
		one : __webpack_require__(29)
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

	var request = __webpack_require__(16),
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
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(14).user;
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
/* 16 */
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
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '      <span><span class="user"></span><%-name%></span>\r\n      <span class="msg" ><span></span><div></div></span>\r\n      <span class="dialog"></span>\r\n      <span class="search"></span>\r\n      <span class="memu"></span>',
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
	                buf.push('      <span><span class="user"></span>', (__stack.lineno = 1, name), '</span>\n      <span class="msg" ><span></span><div></div></span>\n      <span class="dialog"></span>\n      <span class="search"></span>\n      <span class="memu"></span>');
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
/* 25 */
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
/* 26 */
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
/* 29 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYThlODc0OGIwODM2OWZlNjZjYjY/NTIxYSoqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcz9lYzRmKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC9wb3N0LmpzPzkwYWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9tc2cuanM/MjM3YioqIiwid2VicGFjazovLy8uL3NyYy9qcy9sYWJlbC9sYWJlbC5qcz8xM2RlKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RhdGEvZGF0YS5qcz85ZGU5KiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXNlci9tYW5hZ2UuanM/OGRiNSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzP2FlZDkqKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIqIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzPzUzYTMqIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzPzUxMTQqIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqcz8zZmEyKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIqIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcz8zNTdmKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQjs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBLG9EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxROzs7Ozs7QUN2REE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDO0FBQ0EsNkNBQTRDO0FBQzVDLHlDOztBQUVBLDJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxjQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLGVBQWU7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDNUZBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9CLGtDQUFpQztBQUNqQyw2Q0FBNEM7QUFDNUM7QUFDQTtBQUNBLHNCQUFxQjs7QUFFckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7QUNsUkE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLGtDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFO0FBQ0w7OztBQUdBOztBQUVBLDBCOzs7Ozs7QUN4TkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0EsMEI7Ozs7OztBQ25QQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7Ozs7QUNsTEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBLHFCOzs7Ozs7Ozs7QUNoUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7OztBQ2hCQTtBQUNBLGlCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw0Qjs7O0FBR0Esb0I7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0NBQStCLElBQUk7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEU7Ozs7OztBQ3ZMQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7O0FDM0RBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDOUJBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLHVZQUFzWSxJQUFJLEtBQUsseUJBQXlCLDRLQUE0SztBQUNwbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDOUJBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLHloREFBd2hELElBQUksS0FBSyxzREFBc0QsMkVBQTJFLCtNQUErTTtBQUNqM0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLHlEQUF3RCxPQUFPO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSw4Q0FBNkMsSUFBSSxLQUFLLHlCQUF5Qix3YkFBd2IsT0FBTyxLQUFLLE1BQU0seWJBQXliLDRGQUE0RixtREFBbUQsSUFBSSxLQUFLLDZDQUE2Qyx1REFBdUQsdUtBQXVLLG9DQUFvQywwRkFBMEYsMENBQTBDLG1DQUFtQyxtQ0FBbUM7QUFDbm1EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWlFLE9BQU87QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyRUE7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsOENBQTZDLElBQUksS0FBSyx5QkFBeUIsMG5CQUEwbkIsT0FBTyxLQUFLLE1BQU0sMElBQTBJLFNBQVMsS0FBSyxPQUFPLHNWQUFzViwrR0FBK0csSUFBSSxLQUFLLDZDQUE2Qyx1REFBdUQsNkpBQTZKLG1DQUFtQyxtQ0FBbUM7QUFDL29EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWlFLE9BQU87QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDdEVBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxJQUFJLEtBQUssd0JBQXdCLGlKQUFpSjtBQUMvTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsd0hBQXdIO0FBQzdNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEU7Ozs7OztBQ3JDQTtBQUNBO0FBQ0EsaURBQWdELHNCQUFzQixzQkFBc0IsdUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qiw2SkFBNko7QUFDbFA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRSIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcImpzL1wiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGE4ZTg3NDhiMDgzNjlmZTY2Y2I2XG4gKiovIiwicmVxdWlyZSgnLi9jb21tb24vZ2xvYmFsJyk7XHJcbnZhciB1c2VyID0gcmVxdWlyZSgnLi91c2VyL3VzZXInKSxcclxuXHRhcnRpY2xlID0gcmVxdWlyZSgnLi9hcnRpY2xlL2luZm8nKSxcclxuXHRhcnRpY2xlcG9zdCA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9wb3N0JyksXHJcblx0bGlzdCA9IHJlcXVpcmUoJy4vY29tbWVudC9saXN0JyksXHJcblx0cG9zdCA9IHJlcXVpcmUoJy4vY29tbWVudC9wb3N0JyksXHJcblx0bXNnID0gcmVxdWlyZSgnLi9jb21tb24vbXNnJyksXHJcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XHJcbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlciksXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1x0XHJcblxyXG52YXIgbm93QXJ0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdpZCcpLFxyXG5cdG5vd1N1YmplY3RJZCA9IHN0cmlrZXIudXRpbC5nZXRQYXJhbWV0ZXIoJ3NpZCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVzZXJMb2FkU3ViKGUsZCl7XHJcblx0IHZhciBjcG9zdCA9IG5ldyBwb3N0LnBvc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTsgXHJcblx0IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0ID0gY3Bvc3Q7XHJcblxyXG4gXHQgdmFyIGNsaXN0ID0gbmV3IGxpc3QubGlzdChub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG4gXHQgd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3QgPSBjbGlzdDtcclxuXHJcbiBcdCB2YXIgYXBvc3QgPSBuZXcgYXJ0aWNsZXBvc3QucG9zdChub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG5cdCBcclxuXHQgdmFyIGFydEluZm8gPSBuZXcgYXJ0aWNsZS5pbmZvKG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcblx0IGNwb3N0LmJpbmRGdW4oY2xpc3QpO1xyXG5cdCBjbGlzdC5iaW5kKHtcclxuXHQgXHRpbmZvOmFydEluZm9cclxuXHQgfSk7XHJcblxyXG5cdCBhcnRJbmZvLmJpbmQoe1xyXG5cdCBcdHBvc3Q6IGFwb3N0XHJcblx0IH0pXHJcbn1cclxuXHJcbnZhciBoYW5kbGVycyA9IHtcclxuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWRTdWJcclxufVxyXG5cclxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcclxuXHRTdHJpa2VyLmJpbmQoaSxoYW5kbGVyc1tpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHRzdHJpa2VyLnVzZXIgPSB1c2VyO1xyXG5cdFxyXG5cdHdpbmRvdy5zdHJpa2VyLm1zZyA9IG5ldyBtc2cubWVzc2FnZSgpO1xyXG5cdFxyXG5cdHVzZXIuaW5pdCgpO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuaW5pdCgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIi8vIGtlZXAgaXQgaWYgdXNpbmcgdXJsIG1kNSByZXYgcmVwbGFjZW1lbnQgaW4gamF2YXNjcmlwdFxuY29uc29sZS5sb2coJ2dsb2JhbCBpcyBsb2FkJyk7XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5mbG9vcigobm93IC0gYXRpbWUpLzEwMDApO1xuICAgIGlmKGM8NjApe1xuICAgICAgICByZXR1cm4gJzHliIbpkp/ku6XlhoUnO1xuICAgIH1lbHNlIGlmKGM8MzYwMCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKGMvMzYwMCkrJ+WIhumSn+WJjSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKjI0KXtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcixcclxuXHR1c2VyTWFuYWdlID0gcmVxdWlyZSgnLi9tYW5hZ2UnKSxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRuYXYgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci91c2VyX25hdi5lanMnKSxcclxuXHRtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tYW5hZ2UuZWpzJyksXHJcblx0b25lbWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvb25lbWFuYWdlLmVqcycpXHJcbn1cclxuXHJcbnZhciBVc2VyID0ge30sXHJcblx0X3RoaXMgPSBVc2VyO1xyXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXI7XHJcblxyXG4vL+WvueWkluaPkOS+m+eahOaOpeWPo1xyXG53aW5kb3cuc3RyaWtlci51c2VyID0gVXNlcjtcclxuXHJcbi8v566h55CG5ZGY6K6+572u5pi+56S6562J562JXHJcblVzZXIubWFuYWdlID0gdXNlck1hbmFnZS5tYW5hZ2U7XHJcbi8vIFVzZXIuYWRkbWFuYWdlID0gdXNlck1hbmFnZS5zaG93O1xyXG5cclxuLy8gVXNlci5hZGREZWZNYW5hZ2UgPSB1c2VyTWFuYWdlLmFkZERlZk1hbmFnZTtcclxuXHJcblVzZXIuZ2V0TXlJbmZvID0gZnVuY3Rpb24oY2Ipe1xyXG5cdGNnaS5pbmZvKGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubXlJbmZvID0gcmVzLmRhdGE7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5uYXYocmVzLmRhdGEpO1xyXG5cdFx0XHQkKFwiI3VzZXJOYXZcIikuaHRtbChodG1sKTtcclxuXHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkU3ViJyxyZXMuY29kZSk7XHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkQXJ0JyxyZXMuY29kZSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VybG9hZCcpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5Vc2VyLmdldFVzZXJMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLmxpc3QgPSByZXMuZGF0YTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRfdGhpcy5nZXRNeUluZm8oKTtcclxuXHRfdGhpcy5nZXRVc2VyTGlzdCgpO1xyXG5cdHVzZXJNYW5hZ2UuaW5pdChjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvdXNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGluZm8gOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9vbmUuZWpzJylcclxufTtcclxuXHJcbnZhciBJbmZvID0ge31cclxubW9kdWxlLmV4cG9ydHMgPSBJbmZvO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIGFydGljbGVJbmZvID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHJcblx0dGhpcy5kb20gPSAkKCcjYXJ0aWNsZUluZm8nKTtcclxuXHJcblx0dGhpcy5kYXRhID0ge307XHJcblxyXG5cdHRoaXMuY0xpc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50bGlzdDtcclxuXHR0aGlzLmNwb3N0ID0gd2luZG93LnN0cmlrZXIuY29tbWVudHBvc3Q7XHJcblxyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuaW5mbyh7aWQ6IHRoaXMuYXJ0SWR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHJlcy5kYXRhLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaW5mbyhyZXMuZGF0YSk7XHJcblx0XHRcdFxyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRfdGhpcy5jRG9tID0gJChcIiNjb21tZW50Q291bnRcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZUVkaXRlZCcsZnVuY3Rpb24oZSxkKXtcclxuXHRcdGQuc2lkID0gX3RoaXMuc3ViSWQ7XHJcblx0XHRfdGhpcy5kYXRhID0gZDtcclxuXHRcdGNvbnNvbGUubG9nKGQpO1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmluZm8oZCk7XHJcblx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLnVwID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygndXAnKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnc2V0dXAnKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbigpe1xyXG5cdHN0cmlrZXIudHJpZ2dlcignZWRpdEFydGljbGUnLHRoaXMuZGF0YSk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnNvbGUubG9nKCdkZWxldGUnKTtcdFxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieWNyZWF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5jTGlzdC5vcmRlcmJ5dXBkYXRlKCk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cGRhdGVDb3VudCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5kYXRhLmNvbW1lbnRDb3VudCsrO1xyXG5cdHRoaXMuY0RvbS50ZXh0KHRoaXMuZGF0YS5jb21tZW50Q291bnQpO1xyXG59XHJcblxyXG5JbmZvLmluZm8gPSBhcnRpY2xlSW5mbztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvaW5mby5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIi8v5Li76aKY5YiX6KGoXHJcbnZhciBhUG9zdCA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKSxcclxuXHRjZ2ksXHJcblx0dG1wbCxcclxuXHRub3dTdWJJZCA9IDAsXHJcblx0bG9hZGluZyA9IGZhbHNlO1xyXG5cdHN0YXJ0ID0gMCxcclxuXHRsaW1pdCA9IDIwLFxyXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYVBvc3Q7XHJcbnZhciBsaXN0RG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKSxcclxuXHRyZXNMaXN0ID0gW107XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHRcclxuXHJcbnZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJyksXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn07XHJcblxyXG5cclxuLy/ph43nva7kuIDkuKpmcm9tXHJcbmZ1bmN0aW9uIHJlc2V0RnJvbSh0YXJnZXQpe1xyXG5cdHRhcmdldC5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgnJyk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxufVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5jRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5jRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXHJcblxyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5jRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcclxuXHRcdH1cclxuXHRcdF90aGlzLm1vZGVsID0gJ3BvcCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY0RvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3N0JztcclxuXHR9KTtcclxuXHJcblx0dGhpcy5kYXRhID0ge307XHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbigpe1xyXG5cclxufTtcclxuXHJcblxyXG4vL+WPlumAieaLqeeahOi1hOa6kFxyXG5wb3N0LnByb3RvdHlwZS5nZXRSZXNMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLnJlc01hcCl7XHJcblx0XHRsaXN0LnB1c2godGhpcy5yZXNNYXBbaV0uaWQpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/moLnmja5kb23ojrflj5bnm7jlhbPnmoTlj4LmlbAuXHJcbnBvc3QucHJvdG90eXBlLmdldFBhcmFtID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHR2YXIgbmFtZSA9IHRhcmdldC5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKCksXHJcblx0XHRjb250ZW50ID0gdGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoKTtcclxuXHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0dGl0bGUgOiBuYW1lLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHRzdWJqZWN0SWQgOiBub3dTdWJJZCxcclxuXHRcdGxhYmVscyA6IFtdLFxyXG5cdFx0cmVzb3VyY2UgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0cmVzTGlzdCA9IFtdO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR2YXIgcHQgPSB0aGlzLnRhcmdldC5kYXRhKCd0YXJnZXQnKTtcclxuXHQvL2NvbnNvbGUubG9nKHBUYXJnZXQpO1xyXG5cdHZhciBwVGFyZ2V0ID0gJChwdCk7XHJcblxyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB0aGlzLmdldFBhcmFtKHBUYXJnZXQpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLnN1YmplY3RJZCA9IHRoaXMuZGF0YS5zdWJqZWN0X2lkO1xyXG5cdFx0cGFyYW0uYXJ0aWNsZUlkID0gdGhpcy5kYXRhLmlkO1xyXG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcclxuXHRcdFx0fVxyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRhUG9zdC5yZXNldChwVGFyZ2V0KTtcclxuXHJcblx0XHRcdH1cclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGNvbnNvbGUubG9nKHN0cmlrZXIuYXJ0aWNsZSk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCduZXdhcnRpY2xlJyxyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5hUG9zdC5yZXNldCA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHRhcmdldC5kYXRhKCd0YXJnZXQnKSk7XHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRyZXNldEZyb20ocFRhcmdldCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QgPSBwb3N0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuY29tbWVudDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9jb21tZW50L2xpc3QuZWpzJylcclxufTtcclxuXHJcbnZhciBDb21tZW50ID0ge31cclxuXHJcbnZhciBsaXN0ID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjY29tbWVudExpc3RcIik7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSdcclxuXHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5saW1pdCA9IDM7XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMucG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cdHRoaXMubXNnID0gd2luZG93LnN0cmlrZXIubXNnO1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdC8vIGFydGljbGVMaXN0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG5cdC8vIGFydGljbGVQb3N0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5zYXZlRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdGZvcih2YXIgaSBpbiBkYXRhLmxpc3Qpe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHR0aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0fVxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihkYXRhKXtcclxuXHRpZihkYXRhKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdFx0bGlzdCA6IFtkYXRhXVxyXG5cdFx0fSk7XHRcclxuXHRcdCQoXCIuY29tbWVudFwiK2RhdGEuaWQpLnJlcGxhY2VXaXRoKGh0bWwpO1xyXG5cdH1cclxuXHRcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH07XHJcblxyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcclxuXHRcdFx0X3RoaXMuc2F2ZURhdGEocmVzLmRhdGEpO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHRcclxuXHRpZih0aGlzLm1hcFtpZF0pe1xyXG5cdFx0dGhpcy5wb3N0LmVkaXQodGhpcy5tYXBbaWRdKTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLm9yZGVyYnljcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMub3JkZXIgPT09ICdjcmVhdGVUaW1lJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMub3JkZXIgPT09ICd1cGRhdGVUaW1lJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVx0XHJcblx0dGhpcy5vcmRlciA9ICd1cGRhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLmdldERhdGUoKTtcdFxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdGNuYW1lID0gdGhpcy50YXJnZXQuZGF0YSgnY25hbWUnKTtcclxuXHJcblx0dGhpcy5wb3N0LnJlcGxheShpZCxjbmFtZSk7XHJcbn1cdFxyXG5cclxubGlzdC5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0Y29tbWVudElkIDogaWQsXHJcblx0XHRcdGlzU3RhciA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfotZ4nOiflt7LotZ4nO1xyXG5cdFx0Y2dpLnN0YXIocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzU3Rhcik7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0Y29tbWVudElkIDogaWQsXHJcblx0XHRcdGlzQ29sbGVjdCA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfmlLbol48nOiflj5bmtojmlLbol48nO1xyXG5cdFx0Y2dpLmNvbGxlY3QocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzQ29sbGVjdCk7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLm1zZy5jb25maXJtKCfnoa7lrpropoHliKDpmaTor6Xlm57lpI0/JyxudWxsLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHRjb21tZW50SWQgOiBpZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRjZ2kuZGVsZXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0JChcIi5jb21tZW50XCIraWQpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdGxpc3QgOiBbZGF0YV1cclxuXHR9KTtcclxuXHR0aGlzLmFydEluZm8udXBkYXRlQ291bnQoKTtcclxuXHR0aGlzLmRvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmFydEluZm8gPSBvYmouaW5mbztcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcbiAgICAkKGRvY3VtZW50KS5vbignc2Nyb2xsJyxmdW5jdGlvbihlKXtcclxuICAgICAgICB2YXIgc2Nyb2xsRG9tID0gZG9jdW1lbnQuYm9keTtcclxuICAgICAgICB2YXIgcGFnZUhlaWdodCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQ7XHJcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHNjcm9sbERvbS5zY3JvbGxUb3A7XHJcbiAgICAgICAgdmFyIHNjcm9sbEhlaWdodCA9IHNjcm9sbERvbS5zY3JvbGxIZWlnaHQ7XHJcblxyXG4gICAgICAgIC8v5Yik5pat5piv5ZCm5Yiw5bqV5LqGXHJcbiAgICAgICAgaWYoc2Nyb2xsVG9wICsgcGFnZUhlaWdodCA+PSBzY3JvbGxIZWlnaHQpe1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKCdlbmQnKTtcclxuICAgICAgICAgICAgX3RoaXMubG9hZE1vcmUoKTtcclxuICAgICAgICB9ICAgICAgICAgICAgICAgIFxyXG4gICAgfSk7XHRcdFxyXG59XHJcblxyXG5cclxuQ29tbWVudC5saXN0ID0gbGlzdDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvbGlzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuY29tbWVudDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJyksXHJcblx0cmxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvcmVzb3VyY2UvbGlzdC5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn07XHJcblxyXG52YXIgQ29tbWVudCA9IHt9XHJcblxyXG52YXIgcG9zdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI3Bvc3RBcmVhXCIpO1xyXG5cdHRoaXMucG9wRG9tID0gJChcIiNjcmVhdGVDb21tZW50XCIpO1xyXG5cdHRoaXMuY29udGVudERvbSA9IHRoaXMuZG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKTtcclxuXHR0aGlzLnBvcENvbnRlbnREb20gPSB0aGlzLnBvcERvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJyk7XHJcblx0dGhpcy5wb3BUaXRsZURvbSA9IHRoaXMucG9wRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKTtcclxuXHR0aGlzLmNyZXNEb20gPSB0aGlzLnBvcERvbS5maW5kKCcucG9wLXJlcycpO1xyXG5cdHRoaXMuY3RpdERvbSA9IHRoaXMucG9wRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdGNvbnNvbGUubG9nKHRoaXMuY3RpdERvbSk7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1x0XHJcblxyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmFydGljbGVMaXN0ID0gb2JqLmxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNoYW5nZUFydGljbGUgPSBmdW5jdGlvbihpZCl7XHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24obGlzdCl7XHJcblx0dGhpcy5jTGlzdCA9IGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKGlkLG5hbWUpe1xyXG5cdHRoaXMuY29udGVudERvbS52YWwoJ+WbnuWkjSAnK25hbWUrJzonKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgY29udGVudCA9IHRoaXMuY29udGVudERvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiAnJyxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMuY0xpc3QuYXBwZW5kKHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuY29udGVudERvbS52YWwoJycpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oZCl7XHJcblx0dGhpcy5pc0VkaXQgPSB0cnVlO1xyXG5cdHRoaXMucG9wQ29udGVudERvbS52YWwoZC5jb250ZW50KTtcclxuXHR0aGlzLnBvcFRpdGxlRG9tLnZhbChkLnRpdGxlKTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cclxuXHRpZihkLnJlc291cmNlKXtcclxuXHRcdGZvcih2YXIgaSBpbiBkLnJlc291cmNlKXtcclxuXHRcdFx0dmFyIGl0ZW0gPSBkLnJlc291cmNlW2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHRcclxuXHR9XHJcblx0dGhpcy5wb3BEb20ubW9kYWwoJ3Nob3cnKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG5cdHZhciBjb250ZW50ID0gdGhpcy5wb3BDb250ZW50RG9tLnZhbCgpO1xyXG5cdHZhciB0aXRsZSA9IHRoaXMucG9wVGl0bGVEb20udmFsKCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRpZihjb250ZW50ID09PSAnJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJJZCxcclxuXHRcdGFydGljbGVJZCA6IHRoaXMuYXJ0SWQsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHRpdGxlIDogdGl0bGUsXHJcblx0XHRsYWJlbCA6IFtdLFxyXG5cdFx0cmVzb3VyY2VzIDogdGhpcy5nZXRSZXNMaXN0KClcclxuXHR9O1xyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5jb21tZW50SWQgPSB0aGlzLmRhdGEuaWQ7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0aWYoX3RoaXMuY0xpc3Qpe1xyXG5cdFx0XHRcdFx0X3RoaXMuY0xpc3QudXBkYXRlKHJlcy5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0X3RoaXMucG9wQ29udGVudERvbS52YWwoJycpO1xyXG5cdFx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0aWYoX3RoaXMuY0xpc3Qpe1xyXG5cdFx0XHRcdFx0X3RoaXMuY0xpc3QuYXBwZW5kKHJlcy5kYXRhKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0X3RoaXMucG9wQ29udGVudERvbS52YWwoJycpO1xyXG5cdFx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xyXG5cdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5zaG93UG9zdCA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLmNoYW5nZUFydGljbGUoaWQpO1xyXG5cdHRoaXMucG9wRG9tLm1vZGFsKCdzaG93Jyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnJlc01hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cclxuXHRcdGlmKHRoaXMucG9wRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKGlkLG5hbWUpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdHZhciB1cGxvYWRDb21wICA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGlmKHdpbmRvdy51cGxvYWRDb21wKXtcclxuXHRcdCQoc3RyaWtlcikuYmluZCgndXBsb2FkRmlsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdFx0dXBsb2FkQ29tcChkKTtcclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0d2luZG93LnVwbG9hZENvbXAgPSB1cGxvYWRDb21wO1xyXG5cdH1cclxuXHJcblx0JChcIiNjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZih0YXJnZXQudmFsKCkgIT09ICcnKXtcclxuXHRcdFx0X3RoaXMuZmlsZXVwbG9hZCA9IHRydWU7XHJcblx0XHRcdCQoXCIjY2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdHRoaXMucG9wRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55Zue5aSNJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rlm57lpI0nKTtcclxuXHRcdH1cclxuXHRcdHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93ID0gdHJ1ZTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSBmYWxzZTtcclxuXHRcdF90aGlzLmlzRWRpdCA9IGZhbHNlO1xyXG5cdH0pO1x0XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnBvcERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG59XHJcblxyXG5Db21tZW50LnBvc3QgPSBwb3N0O1xyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L3Bvc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgNFxuICoqLyIsInZhciBtc2cgPSB7XHJcblx0MCA6ICfmk43kvZzmiJDlip8hJyxcclxuXHQxMDogJ+aOkuW6j+W6j+WPt+W/hemhu+Whq+WGmScsXHJcblx0MTEgOiAn57uE57uH5ZCN56ew5b+F6aG75aGr5YaZJyxcclxuXHQyMCA6ICfmlrDlr4bnoIHlkozph43lpI3lr4bnoIHlv4XpobvkuIDoh7QnLFxyXG5cdDIxIDogJ+ivt+Whq+WGmeeUqOaIt+WQjeWSjOWvhueggSEnLFxyXG5cdDIyIDogJ+eUqOaIt+S4jeWtmOWcqCcsXHJcblx0MzAgOiAn57uE57uH5pyA5aSa5pSv5oyBM+e6pyEnLCBcclxuXHQ0MCA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQ1MCA6ICfkvaDopoHkuIrkvKDnmoTmlofku7blt7Lnu4/otoXov4fkvaDnmoTliankvZnnqbrpl7QhJyxcclxuXHQ2MCA6ICfkvaDov5jmsqHmnInpgInmi6nopoHlhbHkuqvnmoTnm67lvZUnLFxyXG5cdDc1IDogJ+W6j+WPt+WPquiDveWcqDF+OTnkuYvpl7QnLFxyXG5cdDc2IDogJ+WQjeensOS4jeiDveWwkeS6jjLkuKrlrZcnLFxyXG5cdDc3IDogJ+WPguaVsOS4jeiDveS4uuepuicsXHJcblx0NzggOiAn5a+55LiN6LW377yM572R57uc6LaF5pe25LqG77yM6K+356iN5ZCO5YaN6K+VJyxcclxuXHQ3OSA6ICflt7Lnu4/mnInlkIzlkI3nmoTpobnnm67kuoYnLFxyXG5cdDEwMCA6ICflr7nkuI3otbfvvIzmgqjmsqHmnInov5nkuKrmk43kvZzmnYPpmZAhJywvL+WQjuWPsOWHuumUmeWVpiFcclxuXHQxMDEgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDAxIDogJ+aCqOi/mOayoeacieeZu+W9lSEnLFxyXG5cdDEwMDQgOiAn5rKh5pyJ5om+5Yiw6LWE5rqQIScsXHJcblx0MTAxMCA6ICfmgqjmsqHmnInmn6XnnIvor6XotYTmupDnmoTmnYPpmZAhJyxcclxuXHQxMDExIDogJ+WPguaVsOWHuumUmeWVpiEnLFxyXG5cdDEwMTMgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDE0IDogJ+W3sue7j+WFs+azqOivpeS4u+mimCcsXHJcblx0MTAxNSA6ICflt7Lnu4/lvZLmoaPllaYhJyxcclxuXHQxMDE2IDogJ+ivpei1hOa6kOS4jeiDveWIoOmZpCcsXHJcblx0MTAxNyA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQxMDQxIDogJ+eUqOaIt+WQjeaIluWvhueggemUmeivryEnLFxyXG5cdDEwNDMgOiAn55So5oi35LiN5a2Y5ZyoIScsXHJcblx0MTA1MCA6ICfml7bpl7TkuqTlj4nkuoYhJ1xyXG59XHJcblxyXG5NZXNzZW5nZXIoKS5vcHRpb25zID0ge1xyXG4gICAgZXh0cmFDbGFzc2VzOiAnbWVzc2VuZ2VyLWZpeGVkIG1lc3Nlbmdlci1vbi1ib3R0b20nLFxyXG4gICAgdGhlbWU6ICdmbGF0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG1lc3NhZ2UoKXtcclxuXHR0aGlzO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24obXNnLGxhYmVsLGNiKXtcclxuXHRpZih0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09PSBudWxsKXtcclxuXHRcdGxhYmVsID0ge1xyXG5cdFx0XHRzdWIgOiAn56Gu5a6aJyxcclxuXHRcdFx0Y2FuY2VsIDogJ+WPlua2iCdcclxuXHRcdH1cclxuXHR9XHJcblx0aWYodHlwZW9mIGNiID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRjYiA9IGZ1bmN0aW9uKCl7fTtcclxuXHR9XHJcblx0aWYodHlwZW9mIG1zZyA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdG1lc3NhZ2UgOiBtc2csXHJcblx0XHRhY3Rpb25zIDoge1xyXG5cdFx0XHRzdWIgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5zdWIgfHwgJ+ehruWumicsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FuY2VsIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuY2FuY2VsIHx8ICflj5bmtognLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgbXNnID0gTWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGQpe1xyXG5cdC8vIGlmKGQgPT0gMTAwMSl7XHJcblx0Ly8gXHR3aW5kb3cubG9jYXRpb24gPSBjb25maWcuY2dpLmdvdG9sb2dpbjtcclxuXHQvLyBcdHJldHVybjtcclxuXHQvLyB9XHJcblxyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2dbZF0gfHwgJ+WHuumUmeaLiSEnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KGQpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5tc2cgPSBmdW5jdGlvbihtc2cpe1xyXG5cdHZhciBvYmogPSB7XHJcblx0XHQnbWVzc2FnZScgOiBtc2cgfHwgJydcclxuXHR9XHJcblx0aWYocGFyc2VJbnQobXNnKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcdFx0XHJcbn1cclxuXHJcbmRiLm1lc3NhZ2UgPSBtZXNzYWdlO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9tc2cuanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMiAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxhYmVsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5sYWJlbCxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgTGFiZWwgPSB7fSxcclxuXHRfdGhpcyA9IExhYmVsO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL2xpc3QuZWpzJyksXHJcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL29uZS5lanMnKVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcclxuXHJcbmZ1bmN0aW9uIGdldExpc3QoKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmxhYmVsID0gZnVuY3Rpb24obmFtZSl7XHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK25hbWUpO1xyXG5cclxuXHR0aGlzLm5vd0RvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYWRkRG9tID0gdGhpcy5kb20uZmluZCgnLmFkZC1sYWJlbC1hcmVhJyk7XHJcblx0Ly8gaWYodHlwZSA9PT0gJ3N1Yicpe1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkU3ViTGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd1N1YkxhYmVsJyk7XHJcblx0Ly8gfWVsc2V7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRBcnRMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93QXJ0TGFiZWwnKTtcclxuXHQvLyB9XHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmJ0bkRvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5idG4nKTtcclxuXHR0aGlzLmlucHV0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG5cdHRoaXMuX3NlbGVjdERvbTsvL+W9k+WJjemAieS4reeahOWFg+e0oFxyXG5cclxuXHQvL+m7mOiupOayoeacieagh+etvlxyXG5cdHRoaXMubm93RG9tLmhpZGUoKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblxyXG5cdC8v5bey57uP6YCJ5Lit55qEaWRtYXBcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblxyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5nZXREYXRhKCk7XHRcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdC8vXHJcblx0Ly8gdGhpcy5ub3dEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0Ly8gXHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHQvLyBcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdC8vIFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgdmFsID0gdGhpcy5pbnB1dERvbS52YWwoKTtcclxuXHRpZih2YWwgIT09ICcnKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0bmFtZSA6IHZhbFxyXG5cdFx0fTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0X3RoaXMubWFwW3Jlcy5kYXRhLmlkXSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OltyZXMuZGF0YV19KTtcclxuXHRcdFx0XHRfdGhpcy5saXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbihlKXtcclxuXHQvLyAvY29uc29sZS5sb2codGhpcy5fc2VsZWN0RG9tKTtcclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblx0fVxyXG5cdC8vdGhpcy5hZGREb20uc2hvdygpO1xyXG5cdC8vdGhpcy5ub3dEb20uc2hvdygpO1xyXG5cclxuXHQvL2Z1aS1jcm9zc1xyXG5cdC8vZnVpLXBsdXNcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmxpc3Qoe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6cmVzLmRhdGF9KTtcclxuXHRcdFx0X3RoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwLGw9cmVzLmRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHRcdHZhciBpdGVtID0gcmVzLmRhdGFbaV07XHJcblx0XHRcdFx0X3RoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd0VkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHQgdmFyIGh0bWwgPSB0bXBsLm9uZSh7bGlzdDpkYXRhfSk7XHJcblx0IHRoaXMubm93RG9tLmh0bWwoaHRtbCkuc2hvdygpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy5fc2VsZWN0RG9tLmRhdGEoJ2lkJyk7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0bGlzdCA6IFt0aGlzLm1hcFtpZF1dXHJcblx0fVxyXG5cclxuXHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0aWYodGhpcy5ub3dEb20uZmluZCgnLmxhYmVsJytpZCkubGVuZ3RoID09PSAwKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmUocGFyYW0pO1xyXG5cdFx0dGhpcy5ub3dEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXRMYWJlbExpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Ly8gY29uc29sZS5sb2codGhpcy5ub3dEb20uZmluZChcIi50YWdcIikubGVuZ3RoKTtcclxuXHQvLyB0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdC8vIFx0aWYoaWQpe1xyXG5cdC8vIFx0XHRsaXN0LnB1c2goaWQpO1xyXG5cdC8vIFx0fVx0XHRcdFx0XHJcblx0Ly8gfSlcdFxyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMubm93RG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v5Yig6ZmkXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdHAucmVtb3ZlKCk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ3N1YmplY3QvZWRpdCcsIC8v5L+u5pS55Li76aKYXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydzdWJqZWN0L2NyZWF0ZScsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRjb21tZW50IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnY29tbWVudC9zZWFyY2gnLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3RlZCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnY29tbWVudC9zdGFyJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnY29tbWVudC9kZWxldGUnLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2NvbW1lbnQvZWRpdCcsXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0JyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xyXG5cdH0sXHJcblx0bm90aWZ5IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3NlYXJjaCcsXHJcblx0XHRyZWFkIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3JlYWQnLFxyXG5cdH0sXHJcblx0bGFiZWwgOiB7XHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydsYWJlbC9jcmVhdGUnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ2xhYmVsL2xpc3QnXHJcblx0fSxcclxuXHRsb2dpbiA6IGNnaVBhdGgrJ2FjY291bnQvbG9naW4nLFxyXG5cdGxvZ291dCA6IGNnaVBhdGgrJ2FjY291bnQvbG9nb3V0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcclxufVxyXG4vLyAv57uf5LiA5Ye65p2l5by55Ye65raI5oGvXHJcbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjYihyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fWVsc2UgaWYoZmxhZyl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kYi5sb2dpbiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dpbixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxvZ291dCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmxvZ291dCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIgPSB7fTtcclxuZGIudXNlci5saXN0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5saXN0LG51bGwsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyLmluZm8gPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmluZm8sbnVsbCxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuLy/nm7TmjqXmi4nmiYDmnInnlKjmiLc/XHJcbmRiLnVzZXIuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QgPSB7fTtcclxuXHJcbmRiLnN1YmplY3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3RbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3RbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3cscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93aW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3dpbmcscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW52aXRlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW52aXRlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZGVscmVzb3VyY2UgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmRlbHJlc291cmNlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5hcnRpY2xlID0ge307XHJcblxyXG5kYi5hcnRpY2xlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmFydGljbGUuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZVsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50ID0ge307XHJcblxyXG5kYi5jb21tZW50LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnRbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLm5vdGlmeSA9IHt9O1xyXG5cclxuZGIubm90aWZ5LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0Lm5vdGlmeS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1x0XHRcclxufVxyXG5cclxuZGIubm90aWZ5LnJlYWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Qubm90aWZ5LnJlYWQscGFyYW0sY2FsbGJhY2spO1x0XHRcclxufVxyXG5cclxuZGIubGFiZWwgPSB7fTtcclxuXHJcbmRiLmxhYmVsLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sYWJlbC5jcmVhdGUsIHBhcmFtLCBjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIubGFiZWwubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmxhYmVsLmxpc3QscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vY2dpLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBEYXRhID0ge307XHJcbi8qXHJcbuaVsOaNrue8k+WtmFxyXG51c2VyIOeUqOaIt1xyXG5zdWJqZWN0IOS4u+mimFxyXG5hcnRpY2xlIOW4luWtkFxyXG4qL1xyXG5EYXRhLnVzZXIgPSB7fTtcclxuRGF0YS5zdWJqZWN0ID0ge307XHJcbkRhdGEuYXJ0aWNsZSA9IHt9O1xyXG5EYXRhLmxhYmVsID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKHR5cGUsa2V5KXtcclxuXHRyZXR1cm4gRGF0YVt0eXBlXVtrZXldIHx8IG51bGw7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2RhdGEvZGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy/nlKjmiLfliJfooajmmL7npLrnrYnnrYlcclxudmFyIHVNYW5hZ2UgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcjtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdG1hbmFnZUhhdmUgPSBmYWxzZTtcclxubW9kdWxlLmV4cG9ydHMgPSB1TWFuYWdlO1xyXG5cclxudmFyIG1hbmFnZSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0Ly/nu5nlrprljLrln59kb23nmoTlkI3lrZdcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrdGFyZ2V0KTtcclxuXHR0aGlzLm1hbmFnZUhhdmUgPSBmYWxzZTtcclxuXHQvL+eUqOaIt+WIl+ihqFxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtbGlzdCcpO1xyXG5cdHRoaXMuc2VsZWN0RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1tYW5hZ2UtbGlzdCcpO1xyXG5cdC8v5pCc57Si5qGGXHJcblx0dGhpcy5rZXlEb207XHJcblxyXG5cdC8v5b2T5YmN5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHQvL+mAieS4reeahOeuoeeQhuWRmOWIl+ihqFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdC8v5oqK6Ieq5bex5pS+5Zyo566h55CG5ZGY5YiX6KGo6YeM6Z2iXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcdFxyXG5cclxufVxyXG5cclxuLy/liJ3lp4vljJbkuIDkuIsuXHJcbm1hbmFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG4vL+aYvuekuueuoeeQhuWRmOWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oKXtcclxuXHQvL+WmguaenOi/mOayoeacieWhq+WIl+ihqC7miorliJfooajloavkuIDkuIsuXHJcblx0aWYoIXRoaXMubWFuYWdlSGF2ZSl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwubWFuYWdlKHtcclxuXHRcdFx0bGlzdCA6IGRhdGEubGlzdCxcclxuXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdHRoaXMua2V5RG9tID0gdGhpcy5saXN0RG9tLmZpbmQoJ2lucHV0W25hbWU9bWFuYWdla2V5XScpO1xyXG5cdFx0dGhpcy5rZXl1cEFjdGlvbigpO1xyXG5cdFx0Ly9iaW5kTWFuYWdlQWN0aW9uKCk7XHJcblx0fVxyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uaGlkZSgpO1xyXG5cdH1cdFxyXG59XHJcblxyXG4vL+WinuWKoOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLmFkZERlZk1hbmFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbm1hbmFnZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLy/mkJzntKLmjInpkq5cclxubWFuYWdlLnByb3RvdHlwZS5zZWFyY2hidG4gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBrZXkgPSB0aGlzLmtleURvbS52YWwoKTtcclxuXHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcclxuXHR2YXIgdWxpc3QgPSBbXTtcclxuXHJcblx0aWYoa2V5ID09PSAnJyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5zaG93KCk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRmb3IodmFyIGkgPSAwLGwgPSBsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdGlmKGl0ZW0ubmFtZS5pbmRleE9mKGtleSk+PTApe1xyXG5cdFx0XHR1bGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5oaWRlKCk7XHJcblx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZChcIi51c2VyXCIrdWxpc3RbaV0pLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5Yig6Zmk5LiA5Liq6YCJ5Lit55qE566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoJy50YWcnKSxcclxuXHRcdGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuLy/kuovku7bnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy/ovpPlhaXmoYbnmoRrZXl1cOe7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmtleXVwQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMua2V5RG9tLmJpbmQoJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnVNYW5hZ2UubWFuYWdlID0gbWFuYWdlO1xyXG51TWFuYWdlLmluaXQgPSBmdW5jdGlvbihtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJmdW5jdGlvbiBlbXB0eUZ1bihyZXMpe1xyXG5cdGNvbnNvbGUubG9nKHJlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ1BPU1QnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhamF4KG9wdCxjYWxsYmFjayxlcnJvcil7XHJcblx0dmFyIHR5cGUgPSBvcHQudHlwZSB8fCAnR0VUJyxcclxuXHRcdHVybCA9IG9wdC51cmwsXHJcblx0XHRkYXRhID0gb3B0LmRhdGE7XHJcblxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGUgOiB0eXBlLFxyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0ZGF0YSA6IGRhdGEsXHJcblx0XHRzdWNjZXNzIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0Y2FsbGJhY2socmVzKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvciA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGVycm9yKHJlcyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWpheCA6IGFqYXgsXHJcblx0cG9zdCA6IHBvc3QsXHJcblx0Z2V0IDogZ2V0XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICA8c3Bhbj48c3BhbiBjbGFzcz1cInVzZXJcIj48L3NwYW4+PCUtbmFtZSU+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgPHNwYW4+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci91c2VyX25hdi5lanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXHJcXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxyXFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxyXFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcclxcbiAgICA8L3NwYW4+XFxyXFxuPC9kaXY+IFxcclxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcclxcbiAgPHVsPlxcclxcbiAgPCVcXHJcXG4gICAgZm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgICAgIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiAgJT4gXFxyXFxuICAgICAgPGxpIGlkPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGNsYXNzPVwidXNlcjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCI+PCUtaXRlbS5uYW1lJT48L2xpPlxcclxcbiAgPCV9JT5cXHJcXG4gIDwvdWw+XFxyXFxuPC9kaXY+ICAnLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiaW5wdXQtZ3JvdXBcIj5cXG4gICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBwbGFjZWhvbGRlcj1cIui+k+WFpeeUqOaIt+WQjeensOaQnOe0olwiIG5hbWU9XCJtYW5hZ2VrZXlcIiBkYXRhLWtleXVwPVwic2VhcmNoYnRuXCI+XFxuICAgIDxzcGFuIGNsYXNzPVwiaW5wdXQtZ3JvdXAtYnRuXCI+XFxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGVmYXVsdFwiIHR5cGU9XCJidXR0b25cIiBkYXRhLWFjdGlvbj1cInNlYXJjaGJ0blwiPuaQnOe0ojwvYnV0dG9uPlxcbiAgICA8L3NwYW4+XFxuPC9kaXY+IFxcbjxkaXYgY2xhc3M9XCJtYW5hZ2UtYXJlYVwiPlxcbiAgPHVsPlxcbiAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgXFxuICAgICAgPGxpIGlkPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGNsYXNzPVwidXNlcicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdG9uZVwiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksIFwiPC9saT5cXG4gIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gIDwvdWw+XFxuPC9kaXY+ICBcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlPCUtaWQlPlwiIGRhdGEtaWQ9XCI8JS1pZCU+XCI+XFxyXFxuXHQ8JS1uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGlkPVwibWFuYWdlJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gMiwgbmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9vbmVtYW5hZ2UuZWpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXHJcXG4gICAgICAgICAgPCUtdGl0bGUlPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWFyZWFcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIj7nva7pobY8L2E+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmV0dXJuXCIgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtc3ViamVjdF9pZCU+XCI+6L+U5ZuePC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtbGlzdFwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmVcIj5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKHVwZGF0ZVRpbWUpJT48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+PCUtbmFtZSU+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPjwlLWNvbW1lbnRDb3VudCU+PC9mb250Pjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9NTBcIj48JS10aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICAgICAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCUtY29udGVudCU+XFxyXFxuICAgICAgICAgICAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCVmb3IodmFyIGo9MCxtPXJlc291cmNlTGlzdC5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJlc291cmNlTGlzdFtqXTtcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgd2lkdGg9XCIyMDBcIiAvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlfX0lPiAgICAgICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgPC9kbD5cXHJcXG4gICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXG4gICAgICAgICAgJywgKF9fc3RhY2subGluZW5vID0gMiwgdGl0bGUpLCAnXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tYXJlYVwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1hY3Rpb249XCJ1cFwiPue9rumhtjwvYT5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJyZXR1cm5cIiBocmVmPVwiL2luZm8uaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA5LCBzdWJqZWN0X2lkKSwgJ1wiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNCwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE2LCBuYW1lKSwgJzwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiAgZGF0YS1hY3Rpb249XCJzZXR1cFwiPjxzcGFuPjwvc3Bhbj7otZ48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiPjxzcGFuPjwvc3Bhbj7lm57lpI0gPGZvbnQgaWQ9XCJjb21tZW50Q291bnRcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxOCwgY29tbWVudENvdW50KSwgJzwvZm9udD48L3NwYW4+XFxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcbiAgICAgICAgICAgICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTUwXCI+JywgKF9fc3RhY2subGluZW5vID0gMjEsIHRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgICAgICAgICAgICA8ZGQ+XFxuICAgICAgICAgICAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMjMsIGNvbnRlbnQpLCAnXFxuICAgICAgICAgICAgICAgICAgPC9kZD5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcbiAgICAgICAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IHJlc291cmNlTGlzdC5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJlc291cmNlTGlzdFtqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzIsIG9iai5pZCksICdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICAgICAgICAgICAgXFxuICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8L2RsPlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liA8JS1pdGVtLmNyZWF0b3JOYW1lJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnRpY2UtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48YSBocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLWl0ZW0uaWQlPiZzaWQ9PCUtaXRlbS5zdWJqZWN0X2lkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0uaW1nbnVtPjApeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksIFwiJnNpZD1cIiwgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uc3ViamVjdF9pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAyNiwgb2JqLmlkKSwgJ1wiIHdpZHRoPVwiMjAwXCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZSBjb21tZW50PCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwiY29sbGVjdFwiICBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNDb2xsZWN0JT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lj5bmtojmlLbol488JX1lbHNleyU+5pS26JePPCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtY25hbWU9XCI8JS1pdGVtLmNyZWF0b3JOYW1lJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj4gXFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48JS1pdGVtLnRpdGxlJT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5yZXNvdXJjZSl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgZm9yKHZhciBqPTAsbT1pdGVtLnJlc291cmNlLmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xcclxcbiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgd2lkdGg9XCIyMDBcIiAvPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8JX19JT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUgY29tbWVudCcsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZGl0XCIgZGF0YS1hY3Rpb249XCJlZGl0XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuW3sui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cImNvbGxlY3RcIiAgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pc0NvbGxlY3QpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5Y+W5raI5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWNuYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uY3JlYXRvck5hbWUpLCAnXCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+IFxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICA8ZHQ+JywgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0udGl0bGUpLCBcIjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNiwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IGl0ZW0ucmVzb3VyY2UubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjcsIG9iai5pZCksICdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNvbW1lbnQuanMifQ==