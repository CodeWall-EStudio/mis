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
		notify = __webpack_require__(8),
		review = __webpack_require__(9),
		label = __webpack_require__(10);
	var Striker = $(window.striker),
		striker = window.striker;	
	
	var nowArtId = striker.util.getParameter('id'),
		nowSubjectId = striker.util.getParameter('sid');
	
	
	function userLoadSub(e,d){
		new notify.notify();
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

	var cgi = __webpack_require__(12).user,
		logout = __webpack_require__(12).logout,
		data = __webpack_require__(16).user,
		userManage = __webpack_require__(17),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(29),
		manage : __webpack_require__(30),
		onemanage : __webpack_require__(31)
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

	var cgi = __webpack_require__(12).article;
	var tmpl = {
		info : __webpack_require__(34)
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
	
	articleInfo.prototype.up = function(e){
		var target = $(e.target),
			id = target.data('id'),
			status = target.data('status');
		if(id){
			var param = {
				articleId : id,
				isTop : !status
			}
			cgi.settop(param,function(res){
				if(res.code === 0){
					var text = param.isTop?'取消置顶':'置顶',
						st = param.status?0:100;
					target.text(text).data('status',st);
				}
			})		
		}
	}
	
	articleInfo.prototype.setup = function(e){
		var target = $(e.target),
			id = target.data('id');
		console.log(id,'setup');
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
	
	//预览主题相关资源
	articleInfo.prototype.review = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			striker.trigger('review',{
				id : id,
				list : this.data.resourceList
			})
		}
	};
	
	Info.info = articleInfo;

/***/ },
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
	
	var cgi = __webpack_require__(12).article;
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).comment;
	var tmpl = {
		list : __webpack_require__(37)
	};
	
	var striker = $(window.striker);
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
		this.rdata = {};
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
	
	//预览主题相关资源
	list.prototype.review = function(e){
		var target = $(e.target),
			pid = target.data('pid'),
			id = target.data('id');
	
		if(id){
			striker.trigger('review',{
				id : id,
				list : this.map[pid].resource
			})
		}
	};
	
	Comment.list = list;
	
	module.exports = Comment;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).comment;
	var tmpl = {
		list : __webpack_require__(35),
		rlist : __webpack_require__(38)   //资源列表
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
		cgi = __webpack_require__(12).notify;
	
	var tmpl = {
		list : __webpack_require__(32),
		one : __webpack_require__(33)   //资源列表
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
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	//
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	var tmpl = {
		body : __webpack_require__(41),
		main : __webpack_require__(42),
		list : __webpack_require__(43)
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
		this.list = [];
		this.listItem = [];
		this.reviewBlock.html('');
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
	});

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(12).label,
		data = __webpack_require__(16).label,
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
/* 11 */,
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(22),
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
/* 18 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
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
/* 30 */
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
/* 31 */
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
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <div class="title">\r\n          <span><%-title%></span>\r\n          <div class="action-area">\r\n            <a class="btn btn-primary" data-action="up" data-id="<%-id%>" data-status="<%-status%>"><%if(status){%>取消置顶<%}else{%>置顶<%}%></a>\r\n            <div class="btn-group">\r\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\r\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\r\n            </div>        \r\n            <a class="return" href="/info.html?id=<%-subject_id%>">返回</a>\r\n          </div>\r\n        </div>\r\n        <div class="comment-list">\r\n          <div class="comment-one">\r\n              <div class="comment-one-aside"><%-striker.util.getNowTime(updateTime)%></div>\r\n              <div class="comment-one-info">\r\n                <div class="info-title"><%-name%></div>\r\n                <div class="info-action">\r\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"  data-id="<%-id%>"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount"><%-commentCount%></font></span>\r\n                </div>          \r\n                <dl class="comment-dl">\r\n                  <dt><a><%-title%></a></dt>\r\n                  <dd>\r\n                    <%-content%>\r\n                  </dd>\r\n                  <div class="comment-img-list">\r\n                    <%for(var j=0,m=resourceList.length;j<m;j++){\r\n                        var obj = resourceList[j];\r\n                        \r\n                        if(obj.type === 1){\r\n                    %>\r\n                      <div>\r\n                        <img src="/cgi/resource/preview?id=<%-obj.id%>"  data-id="<%-obj.id%>" data-action="review" width="200" />\r\n                      </div>\r\n                    <%}}%>                  \r\n          \r\n                </dl>\r\n              </div>\r\n            </div>\r\n        </div>',
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
	                buf.push('        <div class="title">\n          <span>', (__stack.lineno = 2, title), '</span>\n          <div class="action-area">\n            <a class="btn btn-primary" data-action="up" data-id="', (__stack.lineno = 4, id), '" data-status="', (__stack.lineno = 4, status), '">');
	                __stack.lineno = 4;
	                if (status) {
	                    buf.push("取消置顶");
	                    __stack.lineno = 4;
	                } else {
	                    buf.push("置顶");
	                    __stack.lineno = 4;
	                }
	                buf.push('</a>\n            <div class="btn-group">\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\n            </div>        \n            <a class="return" href="/info.html?id=', (__stack.lineno = 9, subject_id), '">返回</a>\n          </div>\n        </div>\n        <div class="comment-list">\n          <div class="comment-one">\n              <div class="comment-one-aside">', (__stack.lineno = 14, striker.util.getNowTime(updateTime)), '</div>\n              <div class="comment-one-info">\n                <div class="info-title">', (__stack.lineno = 16, name), '</div>\n                <div class="info-action">\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> <span class="up"  data-action="setup"  data-id="', (__stack.lineno = 18, id), '"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount">', (__stack.lineno = 18, commentCount), '</font></span>\n                </div>          \n                <dl class="comment-dl">\n                  <dt><a>', (__stack.lineno = 21, title), "</a></dt>\n                  <dd>\n                    ", (__stack.lineno = 23, content), '\n                  </dd>\n                  <div class="comment-img-list">\n                    ');
	                __stack.lineno = 26;
	                for (var j = 0, m = resourceList.length; j < m; j++) {
	                    var obj = resourceList[j];
	                    if (obj.type === 1) {
	                        buf.push('\n                      <div>\n                        <img src="/cgi/resource/preview?id=', (__stack.lineno = 32, obj.id), '"  data-id="', (__stack.lineno = 32, obj.id), '" data-action="review" width="200" />\n                      </div>\n                    ');
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
/* 35 */
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
/* 36 */,
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="comment-one comment<%-item.id%>">\r\n    <div class="comment-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="comment-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%></div>\r\n      <div class="info-action">\r\n          <div class="info-action">\r\n            <span class="edit" data-action="edit" data-id="<%-item.id%>"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="<%-item.id%>"><span></span>删除</span> <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="up" data-id="<%-item.id%>" data-action="collect"  data-status="<%-item.isCollect%>"><span></span><%if(item.isStar){%>取消收藏<%}else{%>收藏<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>" data-cname="<%-item.creatorName%>"><span></span>回复</span>\r\n          </div> \r\n      </div>          \r\n      <dl class="comment-dl">\r\n        <dt><%-item.title%></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.resource){%>\r\n        <div class="comment-img-list">\r\n          <%\r\n            var imgnum = 0;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n                if(imgnum>2){\r\n                  break;\r\n                }\r\n                imgnum++;\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>"  data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" width="200" />\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                        var imgnum = 0;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                if (imgnum > 2) {
	                                    break;
	                                }
	                                imgnum++;
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 32, obj.id), '"  data-pid="', (__stack.lineno = 32, item.id), '" data-id="', (__stack.lineno = 32, obj.id), '" data-action="review" width="200" />\n            </div>\n          ');
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
	        input: '	<div class="review-close" data-action="close"></div>\r\n	<div class="modal-body">\r\n		<div class="file-review" id="reviewDiv">\r\n		</div>  \r\n		<div class="file-select-block" id="reviewBlock">\r\n		</div>  \r\n		<div class="review-bg"></div>\r\n	</div>',
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<div class="al-arrow" titla="上一个文件" data-action="showPre"></div>\r\n<%\r\n	if(type == 1){\r\n%>\r\n	<div class="review-img-block">\r\n		<img id="reviewImg" src="/cgi/resource/preview?id=<%-id%>" align="absmiddle" />\r\n	</div>\r\n		<div class="file-reivew-act">\r\n			<dl>\r\n				<dt>文件名:<%-name%></dt>\r\n				<dd>\r\n					文件大小: <%-size%>\r\n					时间: <%-createTime%>\r\n				</dd>\r\n			</dl>\r\n			<div class="file-act">			\r\n				<span class="to-left">左转</span>\r\n				<span class="to-right">右转</span>\r\n			</div>\r\n			<div class="file-reivew-act-bg"></div>\r\n		</div>	\r\n<%}else if(type == 2){%>\r\n	<div id="documentViewer" class="flexpaper_viewer">\r\n		\r\n	</div>\r\n<%}else if(type == 3 || type==4){%>\r\n	<div class="playerZone">\r\n	  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"\r\n	      \r\n	      data-setup="{}">\r\n	    <source src="/cgi/resource/download?id=<%-id%>" type=\'video/mp4\' />\r\n	    <source src="/cgi/resource/download?id=<%-id%>" type=\'video/webm\' />\r\n	    <source src="/cgi/resource/download?id=<%-id%>" type=\'video/ogg\' />\r\n	    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\r\n	    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\r\n	  </video>\r\n	<div class="file-reivew-act">\r\n		<dl>\r\n			<dt>文件名:<%-name%></dt>\r\n			<dd>\r\n				文件大小: <%-size%>\r\n				时间: <%-createTime%>\r\n			</dd>\r\n		</dl>\r\n	</div>\r\n\r\n	</div>\r\n<%}else if(type == 8){%>\r\n	<div class="text-review"><%-text%></div>\r\n	<div class="file-reivew-act">\r\n		<dl>\r\n			<dt>文件名:<%-name%></dt>\r\n			<dd>\r\n				文件大小: <%-size%>\r\n				时间: <%-time%>\r\n			</dd>\r\n		</dl>\r\n	</div>	\r\n<%}else{%>\r\n	<div class="file-reivew-act">\r\n		<i class="icon-type<%-type%>"></i>\r\n		<dl>\r\n			<dt>文件名:<%-name%></dt>\r\n			<dd>\r\n				文件大小: <%-size%>\r\n				时间: <%-createTime%>\r\n			</dd>\r\n		</dl>\r\n	</div>	\r\n<%}%>\r\n<div class="ar-arrow" titla="下一个文件" data-action="showNext"></div>',
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
	                    buf.push('\n	<div class="playerZone">\n	  <video id="example_video_1" class="video-js vjs-default-skin" controls preload="none" width="640" height="264"\n	      \n	      data-setup="{}">\n	    <source src="/cgi/resource/download?id=', (__stack.lineno = 31, id), "\" type='video/mp4' />\n	    <source src=\"/cgi/resource/download?id=", (__stack.lineno = 32, id), "\" type='video/webm' />\n	    <source src=\"/cgi/resource/download?id=", (__stack.lineno = 33, id), '" type=\'video/ogg\' />\n	    <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	    <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->\n	  </video>\n	<div class="file-reivew-act">\n		<dl>\n			<dt>文件名:', (__stack.lineno = 39, name), "</dt>\n			<dd>\n				文件大小: ", (__stack.lineno = 41, size), "\n				时间: ", (__stack.lineno = 42, createTime), "\n			</dd>\n		</dl>\n	</div>\n\n	</div>\n");
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
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '	<div class="al-arrow-p" data-action="showPre"></div>\r\n	<div class="review-list-block">\r\n		<ul id="reviewFileList">\r\n\r\n		<%\r\n		var idx = 0;\r\n		for(var i in list){\r\n		var item = list[i];\r\n		%>\r\n			<li id="review<%-item.id%>"  data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>" <%if(item.id === id){%>class="selected"<%}%> title="<%-item.name%>">\r\n			<%if(item.type===1){%>\r\n				<img src="/cgi/resource/preview?id=<%-item.id%>" data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>" />\r\n			<%}else{%>\r\n				<i class="fdname<%-item.id%> icon-type" data-idx="<%-idx%>" data-action="showFile" data-id="<%-item.id%>"></i>\r\n			<%}%>\r\n			</li>\r\n		<%\r\n				idx++;\r\n			}\r\n		%>\r\n		</ul>\r\n	</div>\r\n	<div class="ar-arrow-p" data-action="showNext"></div>',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzVkMjc3OWY4ZWE4ZjkwNGExNmI/Yjc2ZioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qcz81YjI3KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvdXNlci5qcz9lYzRmKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1lbnQvbGlzdC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC9wb3N0LmpzPzkwYWIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9tc2cuanM/MjM3YioqIiwid2VicGFjazovLy8uL3NyYy9qcy9ub3RpZnkvbm90aWZ5LmpzP2RjYTcqIiwid2VicGFjazovLy8uL3NyYy9qcy9yZXNvdXJjZS9yZXZpZXcuanM/OTNkZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9jZ2kuanM/MjNiMioqIiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanM/OWRlOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUqIiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvcGxheWVyL3ZpZGVvLmRldi5qcz9mZjk3Iiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXIuanM/Y2UwNyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL2ZsZXgvZmxleHBhcGVyX2hhbmRsZXJzLmpzPzk0NGUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9qcS5yb3RhdGUuanM/NjY4NSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanM/YWVkOSoqIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci91c2VyX25hdi5lanM/NmZmYioiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanM/NTExNCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21zZ2xpc3QuZWpzPzg5NjAqIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2cuZWpzP2Q2N2EqIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqcz8zZmEyKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqcz9jZWZiIiwid2VicGFjazovLy8uL3NyYy90cGwvcmV2aWV3L21haW4uZWpzPzlkMmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXZpZXcvbGlzdC5lanM/NzljOCIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIqIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcz8zNTdmKiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkI7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBLG9EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSxROzs7Ozs7QUMxREE7QUFDQTtBQUNBLDJEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOEM7QUFDQSw2Q0FBNEM7QUFDNUMseUM7O0FBRUEsMkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQy9FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBLHlCOzs7Ozs7QUN6SEE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdDQUErQjtBQUMvQixrQ0FBaUM7QUFDakMsNkNBQTRDO0FBQzVDO0FBQ0E7QUFDQSxzQkFBcUI7O0FBRXJCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBLG9CO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBLG1CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7QUM1VEE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQSxrQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVTtBQUNBLE1BQUssRTtBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQSwwQjs7Ozs7O0FDdk9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFO0FBQ0Y7O0FBRUE7QUFDQSwwQjs7Ozs7O0FDdFBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QjtBQUNBOztBQUVBOztBQUVBLHFCOzs7Ozs7QUMzR0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKLHNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7OztBQUdBLHlCOzs7Ozs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7QUFDQTtBQUNBLEc7QUFDQSx3RDtBQUNBLFk7QUFDQSxHO0FBQ0EsaUM7QUFDQSwyQjtBQUNBLHFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0EsRztBQUNBLGM7QUFDQSxHO0FBQ0EsYTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOEI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsOEI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7O0FDaFFEO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7Ozs7QUNsTEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQSxxQjs7Ozs7Ozs7O0FDblRB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RUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWdFO0FBQ2hFO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0hBQWlIO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQixZQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsK0JBQStCO0FBQ3ZFOztBQUVBO0FBQ0E7QUFDQSw4SEFBNkg7O0FBRTdIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCxRQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGFBQWEsRUFBRTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyw0Q0FBNEM7QUFDbkY7O0FBRUE7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLHVDQUF1QztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBaUMsa0JBQWtCOztBQUVuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRDtBQUNsRCxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQWtELFlBQVk7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsUUFBUTtBQUNuQixZQUFXLFFBQVE7QUFDbkIsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFRLElBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLGtCQUFrQjtBQUM3QixZQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3QixhQUFhOztBQUVyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGFBQWE7O0FBRTVDO0FBQ0E7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eUJBQXlCLHdIQUF3SDtBQUM3TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBjNWQyNzc5ZjhlYThmOTA0YTE2YlxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xyXG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXHJcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9pbmZvJyksXHJcblx0YXJ0aWNsZXBvc3QgPSByZXF1aXJlKCcuL2FydGljbGUvcG9zdCcpLFxyXG5cdGxpc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvbGlzdCcpLFxyXG5cdHBvc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvcG9zdCcpLFxyXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxyXG5cdG5vdGlmeSA9IHJlcXVpcmUoJy4vbm90aWZ5L25vdGlmeScpLFxyXG5cdHJldmlldyA9IHJlcXVpcmUoJy4vcmVzb3VyY2UvcmV2aWV3JyksXHJcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XHJcbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlciksXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1x0XHJcblxyXG52YXIgbm93QXJ0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdpZCcpLFxyXG5cdG5vd1N1YmplY3RJZCA9IHN0cmlrZXIudXRpbC5nZXRQYXJhbWV0ZXIoJ3NpZCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVzZXJMb2FkU3ViKGUsZCl7XHJcblx0bmV3IG5vdGlmeS5ub3RpZnkoKTtcclxuXHQgdmFyIGNwb3N0ID0gbmV3IHBvc3QucG9zdChub3dBcnRJZCxub3dTdWJqZWN0SWQpOyBcclxuXHQgd2luZG93LnN0cmlrZXIuY29tbWVudHBvc3QgPSBjcG9zdDtcclxuXHJcbiBcdCB2YXIgY2xpc3QgPSBuZXcgbGlzdC5saXN0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcbiBcdCB3aW5kb3cuc3RyaWtlci5jb21tZW50bGlzdCA9IGNsaXN0O1xyXG5cclxuIFx0IHZhciBhcG9zdCA9IG5ldyBhcnRpY2xlcG9zdC5wb3N0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcblx0IFxyXG5cdCB2YXIgYXJ0SW5mbyA9IG5ldyBhcnRpY2xlLmluZm8obm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuXHQgY3Bvc3QuYmluZEZ1bihjbGlzdCk7XHJcblx0IGNsaXN0LmJpbmQoe1xyXG5cdCBcdGluZm86YXJ0SW5mb1xyXG5cdCB9KTtcclxuXHJcblx0IGFydEluZm8uYmluZCh7XHJcblx0IFx0cG9zdDogYXBvc3RcclxuXHQgfSlcclxufVxyXG5cclxudmFyIGhhbmRsZXJzID0ge1xyXG5cdCd1c2VyTG9hZFN1YicgOiB1c2VyTG9hZFN1YlxyXG59XHJcblxyXG5mb3IodmFyIGkgaW4gaGFuZGxlcnMpe1xyXG5cdFN0cmlrZXIuYmluZChpLGhhbmRsZXJzW2ldKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuXHRzdHJpa2VyLmFydGljbGUgPSBhcnRpY2xlO1xyXG5cdHN0cmlrZXIudXNlciA9IHVzZXI7XHJcblx0XHJcblx0d2luZG93LnN0cmlrZXIubXNnID0gbmV3IG1zZy5tZXNzYWdlKCk7XHJcblx0XHJcblx0dXNlci5pbml0KCk7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5pbml0KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAxIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRsb2dvdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubG9nb3V0LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XHJcblxyXG4vLyBVc2VyLmFkZERlZk1hbmFnZSA9IHVzZXJNYW5hZ2UuYWRkRGVmTWFuYWdlO1xyXG5cclxuVXNlci5nZXRNeUluZm8gPSBmdW5jdGlvbihjYil7XHJcblx0Y2dpLmluZm8oZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5teUluZm8gPSByZXMuZGF0YTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm5hdihyZXMuZGF0YSk7XHJcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRTdWInLHJlcy5jb2RlKTtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXJsb2FkJyk7XHJcblx0XHRcdGJpbmRBY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudmFyIG15QWN0ID0ge1xyXG5cdCdsb2dvdXQnIDogZnVuY3Rpb24oKXtcclxuXHRcdGxvZ291dChmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBiaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHQkKFwiI3VzZXJOYXZcIikuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uKXtcclxuXHRcdFx0aWYobXlBY3RbYWN0aW9uXSl7XHJcblx0XHRcdFx0bXlBY3RbYWN0aW9uXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRpbmZvIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvb25lLmVqcycpXHJcbn07XHJcblxyXG52YXIgSW5mbyA9IHt9XHJcbm1vZHVsZS5leHBvcnRzID0gSW5mbztcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBhcnRpY2xlSW5mbyA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMuZG9tID0gJCgnI2FydGljbGVJbmZvJyk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmNMaXN0ID0gd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3Q7XHJcblx0dGhpcy5jcG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cclxuXHR0aGlzLmdldERhdGUoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOiB0aGlzLmFydElkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRyZXMuZGF0YS5zaWQgPSBfdGhpcy5zdWJJZDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmluZm8ocmVzLmRhdGEpO1xyXG5cdFx0XHRcclxuXHRcdFx0X3RoaXMuZGF0YSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0X3RoaXMuY0RvbSA9ICQoXCIjY29tbWVudENvdW50XCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRzdHJpa2VyLmJpbmQoJ2FydGljbGVFZGl0ZWQnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRkLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0X3RoaXMuZGF0YSA9IGQ7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuaW5mbyhkKTtcclxuXHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXAgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhdHVzID0gdGFyZ2V0LmRhdGEoJ3N0YXR1cycpO1xyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWQsXHJcblx0XHRcdGlzVG9wIDogIXN0YXR1c1xyXG5cdFx0fVxyXG5cdFx0Y2dpLnNldHRvcChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0dmFyIHRleHQgPSBwYXJhbS5pc1RvcD8n5Y+W5raI572u6aG2Jzon572u6aG2JyxcclxuXHRcdFx0XHRcdHN0ID0gcGFyYW0uc3RhdHVzPzA6MTAwO1xyXG5cdFx0XHRcdHRhcmdldC50ZXh0KHRleHQpLmRhdGEoJ3N0YXR1cycsc3QpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVx0XHRcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Y29uc29sZS5sb2coaWQsJ3NldHVwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKXtcclxuXHRzdHJpa2VyLnRyaWdnZXIoJ2VkaXRBcnRpY2xlJyx0aGlzLmRhdGEpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnZGVsZXRlJyk7XHRcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmNMaXN0Lm9yZGVyYnljcmVhdGUoKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieXVwZGF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXBkYXRlQ291bnQgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZGF0YS5jb21tZW50Q291bnQrKztcclxuXHR0aGlzLmNEb20udGV4dCh0aGlzLmRhdGEuY29tbWVudENvdW50KTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLmRhdGEucmVzb3VyY2VMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbkluZm8uaW5mbyA9IGFydGljbGVJbmZvO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFQb3N0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjAsXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhUG9zdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpLFxyXG5cdHJlc0xpc3QgPSBbXTtcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XHJcblx0dGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgnLnBvcC1yZXMnKS5odG1sKCcnKS5oaWRlKCk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxufVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5jRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5jRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXHJcblxyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5jRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRfdGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS5mb2N1cygpO1xyXG5cdFx0fSwxMDAwKVx0XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1x0XHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cclxucG9zdC5wcm90b3R5cGUuZ2V0UGFyYW0gPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3VwbG9hZEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVx0XHRcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcdFxyXG5cdGNvbnNvbGUubG9nKDIzMzMzMyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdC8vY29uc29sZS5sb2cocFRhcmdldCk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHRoaXMuZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0aWYocGFyYW0udGl0bGUgPT09ICcnIHx8IHBhcmFtLmNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignbmV3YXJ0aWNsZScscmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvY29tbWVudC9saXN0LmVqcycpXHJcbn07XHJcblxyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG52YXIgQ29tbWVudCA9IHt9XHJcblxyXG52YXIgbGlzdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI2NvbW1lbnRMaXN0XCIpO1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnXHJcblxyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMubGltaXQgPSAzO1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLnBvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLnJkYXRhID0ge307XHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnNhdmVEYXRhID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0Zm9yKHZhciBpIGluIGRhdGEubGlzdCl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdHRoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdGlmKGRhdGEpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogW2RhdGFdXHJcblx0XHR9KTtcdFxyXG5cdFx0JChcIi5jb21tZW50XCIrZGF0YS5pZCkucmVwbGFjZVdpdGgoaHRtbCk7XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fTtcclxuXHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnN0YXJ0ICs9IF90aGlzLmxpbWl0O1xyXG5cdFx0XHRfdGhpcy5zYXZlRGF0YShyZXMuZGF0YSk7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZG9tLmFwcGVuZChodG1sKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcdFxyXG5cdGlmKHRoaXMubWFwW2lkXSl7XHJcblx0XHR0aGlzLnBvc3QuZWRpdCh0aGlzLm1hcFtpZF0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieWNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ2NyZWF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ3VwZGF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHRcclxuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1x0XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5yZXBsYXkgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0Y25hbWUgPSB0aGlzLnRhcmdldC5kYXRhKCdjbmFtZScpO1xyXG5cclxuXHR0aGlzLnBvc3QucmVwbGF5KGlkLGNuYW1lKTtcclxufVx0XHJcblxyXG5saXN0LnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNTdGFyIDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+i1nic6J+W3sui1nic7XHJcblx0XHRjZ2kuc3RhcihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNTdGFyKTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNDb2xsZWN0IDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+aUtuiXjyc6J+WPlua2iOaUtuiXjyc7XHJcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNDb2xsZWN0KTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeWbnuWkjT8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdGNvbW1lbnRJZCA6IGlkXHJcblx0XHRcdH07XHJcblx0XHRcdGNnaS5kZWxldGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLmNvbW1lbnRcIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0bGlzdCA6IFtkYXRhXVxyXG5cdH0pO1xyXG5cdHRoaXMuYXJ0SW5mby51cGRhdGVDb3VudCgpO1xyXG5cdHRoaXMuZG9tLnByZXBlbmQoaHRtbCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0SW5mbyA9IG9iai5pbmZvO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsRG9tLnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbliLDlupXkuoZcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcpO1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkTW9yZSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcdFx0XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmxpc3QucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBpZCA9IHRhcmdldC5kYXRhKCdwaWQnKSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLm1hcFtwaWRdLnJlc291cmNlXHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbkNvbW1lbnQubGlzdCA9IGxpc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIENvbW1lbnQgPSB7fVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNwb3N0QXJlYVwiKTtcclxuXHR0aGlzLnBvcERvbSA9ICQoXCIjY3JlYXRlQ29tbWVudFwiKTtcclxuXHR0aGlzLmNvbnRlbnREb20gPSB0aGlzLmRvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tID0gdGhpcy5wb3BEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20gPSB0aGlzLnBvcERvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5wb3BEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHR0aGlzLmN0aXREb20gPSB0aGlzLnBvcERvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0aWNsZUxpc3QgPSBvYmoubGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY2hhbmdlQXJ0aWNsZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLmFydElkID0gaWQ7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihsaXN0KXtcclxuXHR0aGlzLmNMaXN0ID0gbGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dGhpcy5jb250ZW50RG9tLnZhbCgn5Zue5aSNICcrbmFtZSsnOicpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50RG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6ICcnLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5jb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcclxuXHR0aGlzLmlzRWRpdCA9IHRydWU7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tLnZhbChkLmNvbnRlbnQpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20udmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuZGF0YSA9IGQ7XHJcblxyXG5cdGlmKGQucmVzb3VyY2Upe1xyXG5cdFx0Zm9yKHZhciBpIGluIGQucmVzb3VyY2Upe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VbaV07XHJcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHR9XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG5cdH1cclxuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGNvbnRlbnQgPSB0aGlzLnBvcENvbnRlbnREb20udmFsKCk7XHJcblx0dmFyIHRpdGxlID0gdGhpcy5wb3BUaXRsZURvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiB0aXRsZSxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLmNvbW1lbnRJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRjZ2kuZWRpdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC51cGRhdGUocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnNob3dQb3N0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuY2hhbmdlQXJ0aWNsZShpZCk7XHJcblx0dGhpcy5wb3BEb20ubW9kYWwoJ3Nob3cnKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblxyXG5cdFx0aWYodGhpcy5wb3BEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dmFyIHVwbG9hZENvbXAgID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LnVwbG9hZENvbXApe1xyXG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0XHR1cGxvYWRDb21wKGQpO1xyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR3aW5kb3cudXBsb2FkQ29tcCA9IHVwbG9hZENvbXA7XHJcblx0fVxyXG5cclxuXHQkKFwiI2NjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoX3RoaXMuaXNFZGl0KXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfkv67mlLnlm57lpI0nKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+aWsOW7uuWbnuWkjScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLmZvY3VzKCk7XHJcblx0XHR9LDEwMDApXHRcdFxyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSB0cnVlO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnBvcERvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyA9IGZhbHNlO1xyXG5cdFx0X3RoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMucG9wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbkNvbW1lbnQucG9zdCA9IHBvc3Q7XHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMyA0XG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0aWYoZCA9PSAxMDAxKXtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChkKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnIHx8ICcnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KG1zZykpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHRcdFxyXG59XHJcblxyXG5kYi5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vbXNnLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwiLy/pgJrnn6VcclxudmFyIG5vdGlmeSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5ub3RpZnksXHJcblx0Y2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLm5vdGlmeTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2dsaXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21zZy5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn1cclxuXHJcbnZhciBub3RpZnlPYmogPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNub3RpZnlMaXN0XCIpO1xyXG5cdHRoaXMudGlwc0RvbSA9ICQoXCIjdXNlck5hdiAubXNnIGRpdlwiKTtcclxuXHJcblx0dGhpcy5tc2dOdW0gPSAwO1xyXG5cdHRoaXMuZ2V0KCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5zZWFyY2goe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNvbnNvbGUubG9nKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKHJlcy5kYXRhLmxpc3QubGVuZ3RoKXtcclxuXHRcdFx0XHRfdGhpcy5tc2dOdW0gPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKS5zaG93KCk7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy50aXBzRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdGlmKF90aGlzLm1zZ051bSl7XHJcblx0XHRcdGlmKF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycpKXtcclxuXHRcdFx0XHRfdGhpcy5kb20uaGlkZSgpO1xyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmRvbS5zaG93KCk7XHRcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGhyZWYgPSB0YXJnZXQuZGF0YSgnaHJlZicpLFxyXG5cdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0XHRyZWFkID0gdGFyZ2V0LmRhdGEoJ3JlYWQnKTtcclxuXHJcblxyXG5cdFx0aWYoaHJlZil7XHJcblx0XHRcdHdpbmRvdy5vcGVuKGhyZWYpO1xyXG5cdFx0XHRpZihyZWFkID09ICcnKXtcclxuXHRcdFx0XHRjZ2kucmVhZCh7XHJcblx0XHRcdFx0XHRub3RpZnlJZCA6IGlkXHJcblx0XHRcdFx0fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdF90aGlzLm1zZ051bS0tO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubm90aWZ5Lm5vdGlmeSA9IG5vdGlmeU9iajtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwiLy9cclxucmVxdWlyZSgnLi4vbGliL3BsYXllci92aWRlby5kZXYnKTtcclxucmVxdWlyZSgnLi4vbGliL2ZsZXgvZmxleHBhcGVyJyk7XHJcbnJlcXVpcmUoJy4uL2xpYi9mbGV4L2ZsZXhwYXBlcl9oYW5kbGVycycpO1xyXG5yZXF1aXJlKCcuLi9saWIvanEucm90YXRlJyk7XHJcbnZhciB0bXBsID0ge1xyXG5cdGJvZHkgOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L2JvZHkuZWpzJyksXHJcblx0bWFpbiA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXZpZXcvbWFpbi5lanMnKSxcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jldmlldy9saXN0LmVqcycpXHJcbn1cclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgZGIgPSB7fVxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xyXG5cclxudmFyIGdldFNpemUgPSBmdW5jdGlvbihzaXplKXtcclxuICAgIHZhciBwcmVjID0gMztcclxuICAgIHZhciBzaXplID0gTWF0aC5yb3VuZChNYXRoLmFicyhzaXplKSk7XHJcblx0dmFyIHVuaXRzID0gWydCJywnS0InLCdNQicsXCJHQlwiLFwiVEJcIl07XHJcblxyXG5cdHZhciB1bml0ID0gIE1hdGgubWluKDQsIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLmxvZygyKSAvIDEwKSk7XHJcblxyXG4gICAgc2l6ZSA9IHNpemUgKiBNYXRoLnBvdygyLCAtMTAgKiB1bml0KTtcclxuICAgIHZhciBkaWdpID0gcHJlYyAtIDEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMTApKTtcclxuICAgIHNpemUgPSBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLnBvdygxMCwgZGlnaSkpICogTWF0aC5wb3coMTAsIC1kaWdpKTtcclxuICAgIHJldHVybiBnZXROdW1zKHNpemUpICsgdW5pdHNbdW5pdF07ICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXROdW1zID0gZnVuY3Rpb24oeCl7XHJcblx0aWYoeD09PTApe1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cdHZhciBmX3ggPSBwYXJzZUZsb2F0KHgpOyAgXHJcblx0aWYgKGlzTmFOKGZfeCkpICBcclxuXHR7ICBcclxuXHQvL2FsZXJ0KCdmdW5jdGlvbjpjaGFuZ2VUd29EZWNpbWFsLT5wYXJhbWV0ZXIgZXJyb3InKTsgIFxyXG5cdFx0cmV0dXJuIDA7ICBcclxuXHR9ICBcclxuXHR2YXIgZl94ID0gTWF0aC5jZWlsKHgqMTAwKS8xMDA7ICBcclxuXHR2YXIgc194ID0gZl94LnRvU3RyaW5nKCk7ICBcclxuXHR2YXIgcG9zX2RlY2ltYWwgPSBzX3guaW5kZXhPZignLicpOyAgXHJcblx0aWYgKHBvc19kZWNpbWFsIDwgMCkgIFxyXG5cdHtcclxuXHRcdHJldHVybiBmX3g7XHJcblx0fSAgXHJcblx0d2hpbGUgKHNfeC5sZW5ndGggPD0gcG9zX2RlY2ltYWwgKyAyKSAgXHJcblx0eyAgXHJcblx0XHRzX3ggKz0gJzAnOyAgXHJcblx0fSBcclxuXHRyZXR1cm4gc194OyAgICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJldmlldyhkYXRhKXtcclxuXHRnZXRUaW1lID0gd2luZG93LnN0cmlrZXIudXRpbC5mb3JtYXRUaW1lO1xyXG5cclxuXHR0aGlzLmJnID0gJCgnPGRpdiBpZD1cInJldmlld0Jnc1wiPjwvZGl2PicpO1xyXG5cdHRoaXMuZG9tID0gJCgnPGRpdiBpZD1cInJldmlld1dpblwiPjwvZGl2PicpO1xyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMubm93SWQgPSBkYXRhLmlkO1xyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5saXN0ID0gW107XHJcblx0dGhpcy5saXN0SXRlbSA9IFtdO1xyXG5cclxuXHJcblx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmJnKTtcclxuXHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZG9tKTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLmJvZHkoKTtcclxuXHR0aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHR0aGlzLnJldmlld0RpdiA9ICQoXCIjcmV2aWV3RGl2XCIpO1xyXG5cdHRoaXMucmV2aWV3QmxvY2sgPSAkKFwiI3Jldmlld0Jsb2NrXCIpO1xyXG5cclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHJcblx0dGhpcy5zaG93TGlzdCgpO1xyXG5cdHRoaXMuc2hvd09uZSgpO1xyXG5cclxuXHR0aGlzLnNob3coKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufTtcclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvd0xpc3QgPSBmdW5jdGlvbihpZCl7XHJcblx0dmFyIGxpc3RIdG1sID0gdG1wbC5saXN0KHtcclxuXHRcdGxpc3QgOiB0aGlzLmxpc3RJdGVtLFxyXG5cdFx0aWQgOiB0aGlzLm5vd0lkXHJcblx0fSk7XHJcblx0XHJcblx0dGhpcy5yZXZpZXdCbG9jay5odG1sKGxpc3RIdG1sKTtcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93T25lID0gZnVuY3Rpb24oaWQsaWR4KXtcclxuXHR2YXIgbm93SWQgPSBpZCB8fCB0aGlzLm5vd0lkO1xyXG5cdHZhciBvYmogPSB0aGlzLmRhdGFbbm93SWRdO1xyXG5cclxuXHRpZihvYmope1xyXG5cdFx0aWYob2JqLnR5cGUgPT09IDIpe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubWFpbihvYmopO1xyXG5cdFx0XHR0aGlzLnJldmlld0Rpdi5odG1sKGh0bWwpO1x0XHRcdFxyXG4gICAgICAgICAgICAgIHZhciBwdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCcvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JytvYmouaWQpO1xyXG4gICAgICAgICAgICAgICQoJyNkb2N1bWVudFZpZXdlcicpLkZsZXhQYXBlclZpZXdlcihcclxuICAgICAgICAgICAgICAgIHsgY29uZmlnIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNXRkZpbGUgOiBwdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzRGlyZWN0b3J5IDogJy9qcy9saWIvZmxleC8nLFxyXG4gICAgICAgICAgICAgICAgICAgIFNjYWxlIDogMC44LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UcmFuc2l0aW9uIDogJ2Vhc2VPdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UaW1lIDogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21JbnRlcnZhbCA6IDAuMixcclxuICAgICAgICAgICAgICAgICAgICBGaXRQYWdlT25Mb2FkIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBGaXRXaWR0aE9uTG9hZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEZ1bGxTY3JlZW5Bc01heFdpbmRvdyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFByb2dyZXNzaXZlTG9hZGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1pblpvb21TaXplIDogMC4yLFxyXG4gICAgICAgICAgICAgICAgICAgIE1heFpvb21TaXplIDogNSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hNYXRjaEFsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEluaXRWaWV3TW9kZSA6ICdQb3J0cmFpdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVyaW5nT3JkZXIgOiAnZmxhc2gnLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0QXRQYWdlIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld01vZGVUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21Ub29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hdlRvb2xzVmlzaWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yVG9vbHNWaXNpYmxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFdNb2RlIDogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlQ2hhaW46ICd6aF9DTidcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgKTsgIFx0XHRcclxuICAgICAgICB9ZWxzZSBpZihvYmoudHlwZSA9PT0gOCl7XHJcbiAgICAgICAgXHR2YXIgcHVybCA9ICdjZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nK29iai5pZDtcclxuICAgICAgICBcdHZhciB0ZXh0ID0gJC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IHB1cmwsXHJcblx0XHRcdFx0YXN5bmM6IGZhbHNlLFxyXG5cdFx0XHRcdGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5yZXNwb25zZVRleHQ7XHJcblxyXG4gICAgICAgIFx0b2JqLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIFx0Y29uc29sZS5sb2cob2JqKTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm1haW4ob2JqKTtcclxuXHRcdFx0dGhpcy5yZXZpZXdEaXYuaHRtbChodG1sKTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5tYWluKG9iaik7XHJcblx0XHRcdHRoaXMucmV2aWV3RGl2Lmh0bWwoaHRtbCk7ICAgICAgICBcdFxyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBpZHggPSAwO1xyXG5cdGZvcih2YXIgaSBpbiBkYXRhLmxpc3Qpe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHR0aGlzLm1hcFtpdGVtLmlkXSA9IGlkeDtcclxuXHRcdGlmKGl0ZW0uaWQgPT09IHRoaXMubm93SWQpe1xyXG5cdFx0XHR0aGlzLm5vd0lkeCA9IGlkeDtcclxuXHRcdH1cclxuXHRcdHRoaXMubGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy5saXN0SXRlbS5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdGl0ZW0uc2l6ZSA9IGdldFNpemUoaXRlbS5zaXplKTtcclxuXHRcdGl0ZW0udGltZSA9IGdldFRpbWUoaXRlbS5jcmVhdGVUaW1lKTtcclxuXHRcdHRoaXMuZGF0YVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRpZHgrKztcclxuXHR9XHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5iZy5zaG93KCk7XHJcblx0dGhpcy5kb20uc2hvdygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuYmcuaGlkZSgpO1xyXG5cdHRoaXMuZG9tLmhpZGUoKTtcdFxyXG5cdHRoaXMubGlzdCA9IFtdO1xyXG5cdHRoaXMubGlzdEl0ZW0gPSBbXTtcclxuXHR0aGlzLnJldmlld0Jsb2NrLmh0bWwoJycpO1xyXG59XHJcblxyXG4vL+abtOaNouaVsOaNrlxyXG5yZXZpZXcucHJvdG90eXBlLmNoYW5nZURhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHR0aGlzLnNob3dMaXN0KCk7XHJcblx0dGhpcy5zaG93T25lKCk7XHJcblx0dGhpcy5zaG93KCk7XHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvd05leHQgPSBmdW5jdGlvbihlKXtcclxuXHRpZih0aGlzLm5vd0lkeCA8IHRoaXMubGlzdC5sZW5ndGgtMSl7XHJcblx0XHR0aGlzLm5vd0lkeCsrXHJcblx0fVxyXG5cdHRoaXMubm93SWQgPSB0aGlzLmxpc3RbdGhpcy5ub3dJZF07XHJcblx0dGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpLmVxKHRoaXMubm93SWR4KS5jbGljaygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dQcmUgPSBmdW5jdGlvbihlKXtcclxuXHRpZih0aGlzLm5vd0lkeCA+IDApe1xyXG5cdFx0dGhpcy5ub3dJZHgtLTtcclxuXHR9XHJcblx0dGhpcy5ub3dJZCA9IHRoaXMubGlzdFt0aGlzLm5vd0lkXTtcclxuXHR0aGlzLnJldmlld0Jsb2NrLmZpbmQoJ2xpJykuZXEodGhpcy5ub3dJZHgpLmNsaWNrKCk7XHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvd0lkeCA9IGZ1bmN0aW9uKGUpe1xyXG5cdFxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dGaWxlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dGhpcy5ub3dJZHggPSB0aGlzLm1hcFtpZF07XHJcblx0XHR0aGlzLnNob3dPbmUoaWQpO1xyXG5cdFx0dmFyIGxpc3QgPSB0aGlzLnJldmlld0Jsb2NrLmZpbmQoJ2xpJyk7XHJcblx0XHRsaXN0LnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0JChcIiNyZXZpZXdcIitpZCkuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XHJcblx0XHQvL2xpc3RbdGhpcy5ub3dJZHhdLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdH1cclxuXHJcblxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0Ly9fdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHRcdFx0XHJcblx0fSlcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5oaWRlKCk7XHJcbn1cclxuXHJcbmRiLnJldmlldyA9IHJldmlldztcclxuXHJcbnZhciBydjtcclxuXHJcbnN0cmlrZXIuYmluZCgncmV2aWV3JyxmdW5jdGlvbihlLGQpe1xyXG5cdGlmKCFydil7XHJcblx0XHRydiA9IG5ldyByZXZpZXcoZCk7XHJcblx0fWVsc2V7XHJcblx0XHRydi5jaGFuZ2VEYXRhKGQpO1xyXG5cdH1cclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9yZXNvdXJjZS9yZXZpZXcuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubGFiZWwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLmxhYmVsLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBMYWJlbCA9IHt9LFxyXG5cdF90aGlzID0gTGFiZWw7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTGFiZWwubGFiZWwgPSBmdW5jdGlvbihuYW1lKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XHJcblxyXG5cdHRoaXMubm93RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcclxuXHQvLyBpZih0eXBlID09PSAnc3ViJyl7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRTdWJMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcclxuXHQvLyB9ZWxzZXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZEFydExhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xyXG5cdC8vIH1cclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmFkZERvbS5maW5kKCcubGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xyXG5cdHRoaXMuaW5wdXREb20gPSB0aGlzLmFkZERvbS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblx0dGhpcy5fc2VsZWN0RG9tOy8v5b2T5YmN6YCJ5Lit55qE5YWD57SgXHJcblxyXG5cdC8v6buY6K6k5rKh5pyJ5qCH562+XHJcblx0dGhpcy5ub3dEb20uaGlkZSgpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHJcblx0Ly/lt7Lnu4/pgInkuK3nmoRpZG1hcFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLmdldERhdGEoKTtcdFxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Ly9cclxuXHQvLyB0aGlzLm5vd0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHQvLyBcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0Ly8gXHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciB2YWwgPSB0aGlzLmlucHV0RG9tLnZhbCgpO1xyXG5cdGlmKHZhbCAhPT0gJycpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRuYW1lIDogdmFsXHJcblx0XHR9O1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5tYXBbcmVzLmRhdGEuaWRdID0gcmVzLmRhdGE7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3Jlcy5kYXRhXX0pO1xyXG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdC8vIC9jb25zb2xlLmxvZyh0aGlzLl9zZWxlY3REb20pO1xyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHR9XHJcblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XHJcblx0Ly90aGlzLm5vd0RvbS5zaG93KCk7XHJcblxyXG5cdC8vZnVpLWNyb3NzXHJcblx0Ly9mdWktcGx1c1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpyZXMuZGF0YX0pO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsbD1yZXMuZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSByZXMuZGF0YVtpXTtcclxuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCB2YXIgaHRtbCA9IHRtcGwub25lKHtsaXN0OmRhdGF9KTtcclxuXHQgdGhpcy5ub3dEb20uaHRtbChodG1sKS5zaG93KCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRsaXN0IDogW3RoaXMubWFwW2lkXV1cclxuXHR9XHJcblxyXG5cdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZShwYXJhbSk7XHJcblx0XHR0aGlzLm5vd0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHQvLyBjb25zb2xlLmxvZyh0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5sZW5ndGgpO1xyXG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Ly8gXHRpZihpZCl7XHJcblx0Ly8gXHRcdGxpc3QucHVzaChpZCk7XHJcblx0Ly8gXHR9XHRcdFx0XHRcclxuXHQvLyB9KVx0XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/liKDpmaRcclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0cC5yZW1vdmUoKTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGFiZWwvbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydzdWJqZWN0L2xpc3QnLCAvLyDmiJHnmoTliJfooahcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ3N1YmplY3QvZWRpdCcsIC8v5L+u5pS55Li76aKYXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydzdWJqZWN0L2NyZWF0ZScsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0J3NldHRvcCcgOiBjZ2lQYXRoKydhcnRpY2xlL3NldFRvcCcsIC8v5pS26JePXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydhcnRpY2xlL2NyZWF0ZSdcclxuXHR9LFxyXG5cdGNvbW1lbnQgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydjb21tZW50L3NlYXJjaCcsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnY29tbWVudC9zdGFyaW5nJyxcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdGVkJyxcclxuXHRcdHN0YXIgOiBjZ2lQYXRoKydjb21tZW50L3N0YXInLFxyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydjb21tZW50L2RlbGV0ZScsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnY29tbWVudC9lZGl0JyxcclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3QnLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnY29tbWVudC9jcmVhdGUnXHJcblx0fSxcclxuXHRub3RpZnkgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydub3RpZmljYXRpb24vc2VhcmNoJyxcclxuXHRcdHJlYWQgOiBjZ2lQYXRoKydub3RpZmljYXRpb24vcmVhZCcsXHJcblx0fSxcclxuXHRsYWJlbCA6IHtcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2xhYmVsL2NyZWF0ZScsXHJcblx0XHRsaXN0IDogY2dpUGF0aCsnbGFiZWwvbGlzdCdcclxuXHR9LFxyXG5cdHJlc291cmNlIDoge1xyXG5cdFx0bWFyayA6IGNnaVBhdGggKyAncmVzb3VyY2UvbWFyaycsXHJcblx0XHRzcGxpdCA6IGNnaVBhdGggKyAncmVzb3VyY2Uvc3BsaXQnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGggKyAncmVzb3VyY2UvbGlzdCdcclxuXHR9LFxyXG5cdGxvZ2luIDogY2dpUGF0aCsnYWNjb3VudC9sb2dpbicsXHJcblx0bG9nb3V0IDogY2dpUGF0aCsnYWNjb3VudC9sb2dvdXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG52YXIgZW1wdHlGdW4gPSBmdW5jdGlvbihyZXMpe1xyXG59XHJcbi8vIC/nu5/kuIDlh7rmnaXlvLnlh7rmtojmga9cclxudmFyIGNoZWNrQ2FsbGJhY2sgPSBmdW5jdGlvbihjYixmbGFnKXtcclxuXHRyZXR1cm4gZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNiKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSAhPT0gMCl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9ZWxzZSBpZihmbGFnKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmRiLmxvZ2luID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ2luLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubG9nb3V0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dvdXQse30sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyID0ge307XHJcbmRiLnVzZXIubGlzdCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIubGlzdCxudWxsLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlci5pbmZvID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5pbmZvLG51bGwsY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbi8v55u05o6l5ouJ5omA5pyJ55So5oi3P1xyXG5kYi51c2VyLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0ID0ge307XHJcblxyXG5kYi5zdWJqZWN0LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3Quc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvdyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZm9sbG93LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmZvbGxvd2luZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuZm9sbG93aW5nLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmludml0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmludml0ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmRlbHJlc291cmNlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5kZWxyZXNvdXJjZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuYXJ0aWNsZSA9IHt9O1xyXG5cclxuZGIuYXJ0aWNsZS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5hcnRpY2xlLmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlWydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGVbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zZXR0b3AgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnNldHRvcCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQgPSB7fTtcclxuXHJcbmRiLmNvbW1lbnQuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnRbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubm90aWZ5ID0ge307XHJcblxyXG5kYi5ub3RpZnkuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Qubm90aWZ5LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5ub3RpZnkucmVhZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5ub3RpZnkucmVhZCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5sYWJlbCA9IHt9O1xyXG5cclxuZGIubGFiZWwuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIucmVzb3VyY2UgPSB7fTtcclxuXHJcbmRiLnJlc291cmNlLm1hcmsgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QucmVzb3VyY2UubWFyaywgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5zcGxpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5zcGxpdCwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QucmVzb3VyY2UubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIERhdGEgPSB7fTtcclxuLypcclxu5pWw5o2u57yT5a2YXHJcbnVzZXIg55So5oi3XHJcbnN1YmplY3Qg5Li76aKYXHJcbmFydGljbGUg5biW5a2QXHJcbiovXHJcbkRhdGEudXNlciA9IHt9O1xyXG5EYXRhLnN1YmplY3QgPSB7fTtcclxuRGF0YS5hcnRpY2xlID0ge307XHJcbkRhdGEubGFiZWwgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIGdldERhdGEodHlwZSxrZXkpe1xyXG5cdHJldHVybiBEYXRhW3R5cGVdW2tleV0gfHwgbnVsbDtcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBEYXRhO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvZGF0YS9kYXRhLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCIvL+eUqOaIt+WIl+ihqOaYvuekuuetieetiVxyXG52YXIgdU1hbmFnZSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyO1xyXG52YXIgY2dpLFxyXG5cdHRtcGwsXHJcblx0bWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5tb2R1bGUuZXhwb3J0cyA9IHVNYW5hZ2U7XHJcblxyXG52YXIgbWFuYWdlID0gZnVuY3Rpb24odGFyZ2V0KXtcclxuXHQvL+e7meWumuWMuuWfn2RvbeeahOWQjeWtl1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIit0YXJnZXQpO1xyXG5cdHRoaXMubWFuYWdlSGF2ZSA9IGZhbHNlO1xyXG5cdC8v55So5oi35YiX6KGoXHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5kb20uZmluZCgnLm1hbmFnZS1saXN0Jyk7XHJcblx0dGhpcy5zZWxlY3REb20gPSB0aGlzLmRvbS5maW5kKCcubm93LW1hbmFnZS1saXN0Jyk7XHJcblx0Ly/mkJzntKLmoYZcclxuXHR0aGlzLmtleURvbTtcclxuXHJcblx0Ly/lvZPliY3lhYPntKBcclxuXHR0aGlzLl9zZWxlY3REb207XHJcblxyXG5cdC8v6YCJ5Lit55qE566h55CG5ZGY5YiX6KGoXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0Ly/mioroh6rlt7HmlL7lnKjnrqHnkIblkZjliJfooajph4zpnaJcclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1x0XHJcblxyXG59XHJcblxyXG4vL+WIneWni+WMluS4gOS4iy5cclxubWFuYWdlLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbi8v5pi+56S6566h55CG5ZGY5YiX6KGoXHJcbm1hbmFnZS5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+a4heepuuWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdGlkIDogZGF0YS5teUluZm8uaWQsXHJcblx0XHRuYW1lIDogZGF0YS5teUluZm8ubmFtZVxyXG5cdH0pO1xyXG5cdHRoaXMuc2VsZWN0RG9tLmh0bWwoaHRtbCk7XHRcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5saXN0RG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+mAieS4reS4gOS4queUqOaIt1xyXG5tYW5hZ2UucHJvdG90eXBlLnNlbGVjdG9uZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRuYW1lID0gdGFyZ2V0LmRhdGEoJ25hbWUnKTtcclxuXHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0XHRpZCA6IGlkLFxyXG5cdFx0XHRuYW1lIDogbmFtZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0XHR0aGlzLnNlbGVjdERvbS5hcHBlbmQoaHRtbCk7XHRcdFx0XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG4vL+aQnOe0ouaMiemSrlxyXG5tYW5hZ2UucHJvdG90eXBlLnNlYXJjaGJ0biA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGtleSA9IHRoaXMua2V5RG9tLnZhbCgpO1xyXG5cdHZhciBsaXN0ID0gZGF0YS5saXN0O1xyXG5cdHZhciB1bGlzdCA9IFtdO1xyXG5cclxuXHRpZihrZXkgPT09ICcnKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKCdsaScpLnNob3coKTtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IGxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0aWYoaXRlbS5uYW1lLmluZGV4T2Yoa2V5KT49MCl7XHJcblx0XHRcdHVsaXN0LnB1c2goaXRlbS5pZCk7XHJcblx0XHR9XHJcblx0fVxyXG5cdHRoaXMubGlzdERvbS5maW5kKCdsaScpLmhpZGUoKTtcclxuXHRpZih1bGlzdC5sZW5ndGg9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdGZvcih2YXIgaSA9IDAsbCA9IHVsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHRoaXMubGlzdERvbS5maW5kKFwiLnVzZXJcIit1bGlzdFtpXSkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuLy/liKDpmaTkuIDkuKrpgInkuK3nmoTnrqHnkIblkZhcclxubWFuYWdlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgnLnRhZycpLFxyXG5cdFx0aWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQgJiYgaWQgIT09IGRhdGEubXlJbmZvLmlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+S6i+S7tue7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+i+k+WFpeahhueahGtleXVw57uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUua2V5dXBBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5rZXlEb20uYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgna2V5dXAnKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudU1hbmFnZS5tYW5hZ2UgPSBtYW5hZ2U7XHJcbnVNYW5hZ2UuaW5pdCA9IGZ1bmN0aW9uKG1vZHVsZSx0bXApe1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci9tYW5hZ2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IE1haW4gZnVuY3Rpb24gc3JjLlxyXG4gKi9cclxuXHJcbi8vIEhUTUw1IFNoaXYuIE11c3QgYmUgaW4gPGhlYWQ+IHRvIHN1cHBvcnQgb2xkZXIgYnJvd3NlcnMuXHJcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XHJcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2F1ZGlvJyk7XHJcbmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyYWNrJyk7XHJcblxyXG4vKipcclxuICogRG91YmxlcyBhcyB0aGUgbWFpbiBmdW5jdGlvbiBmb3IgdXNlcnMgdG8gY3JlYXRlIGEgcGxheWVyIGluc3RhbmNlIGFuZCBhbHNvXHJcbiAqIHRoZSBtYWluIGxpYnJhcnkgb2JqZWN0LlxyXG4gKlxyXG4gKiAqKkFMSUFTRVMqKiB2aWRlb2pzLCBfVl8gKGRlcHJlY2F0ZWQpXHJcbiAqXHJcbiAqIFRoZSBgdmpzYCBmdW5jdGlvbiBjYW4gYmUgdXNlZCB0byBpbml0aWFsaXplIG9yIHJldHJpZXZlIGEgcGxheWVyLlxyXG4gKlxyXG4gKiAgICAgdmFyIG15UGxheWVyID0gdmpzKCdteV92aWRlb19pZCcpO1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd8RWxlbWVudH0gaWQgICAgICBWaWRlbyBlbGVtZW50IG9yIHZpZGVvIGVsZW1lbnQgSURcclxuICogQHBhcmFtICB7T2JqZWN0PX0gb3B0aW9ucyAgICAgICAgT3B0aW9uYWwgb3B0aW9ucyBvYmplY3QgZm9yIGNvbmZpZy9zZXR0aW5nc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IHJlYWR5ICAgICAgICBPcHRpb25hbCByZWFkeSBjYWxsYmFja1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSAgICAgICAgICAgICBBIHBsYXllciBpbnN0YW5jZVxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqL1xyXG52YXIgdmpzID0gZnVuY3Rpb24oaWQsIG9wdGlvbnMsIHJlYWR5KXtcclxuICB2YXIgdGFnOyAvLyBFbGVtZW50IG9mIElEXHJcblxyXG4gIC8vIEFsbG93IGZvciBlbGVtZW50IG9yIElEIHRvIGJlIHBhc3NlZCBpblxyXG4gIC8vIFN0cmluZyBJRFxyXG4gIGlmICh0eXBlb2YgaWQgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgLy8gQWRqdXN0IGZvciBqUXVlcnkgSUQgc3ludGF4XHJcbiAgICBpZiAoaWQuaW5kZXhPZignIycpID09PSAwKSB7XHJcbiAgICAgIGlkID0gaWQuc2xpY2UoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgYSBwbGF5ZXIgaW5zdGFuY2UgaGFzIGFscmVhZHkgYmVlbiBjcmVhdGVkIGZvciB0aGlzIElEIHJldHVybiBpdC5cclxuICAgIGlmICh2anMucGxheWVyc1tpZF0pIHtcclxuICAgICAgcmV0dXJuIHZqcy5wbGF5ZXJzW2lkXTtcclxuXHJcbiAgICAvLyBPdGhlcndpc2UgZ2V0IGVsZW1lbnQgZm9yIElEXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0YWcgPSB2anMuZWwoaWQpO1xyXG4gICAgfVxyXG5cclxuICAvLyBJRCBpcyBhIG1lZGlhIGVsZW1lbnRcclxuICB9IGVsc2Uge1xyXG4gICAgdGFnID0gaWQ7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBmb3IgYSB1c2VhYmxlIGVsZW1lbnRcclxuICBpZiAoIXRhZyB8fCAhdGFnLm5vZGVOYW1lKSB7IC8vIHJlOiBub2RlTmFtZSwgY291bGQgYmUgYSBib3ggZGl2IGFsc29cclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBlbGVtZW50IG9yIElEIHN1cHBsaWVkIGlzIG5vdCB2YWxpZC4gKHZpZGVvanMpJyk7IC8vIFJldHVybnNcclxuICB9XHJcblxyXG4gIC8vIEVsZW1lbnQgbWF5IGhhdmUgYSBwbGF5ZXIgYXR0ciByZWZlcnJpbmcgdG8gYW4gYWxyZWFkeSBjcmVhdGVkIHBsYXllciBpbnN0YW5jZS5cclxuICAvLyBJZiBub3QsIHNldCB1cCBhIG5ldyBwbGF5ZXIgYW5kIHJldHVybiB0aGUgaW5zdGFuY2UuXHJcbiAgcmV0dXJuIHRhZ1sncGxheWVyJ10gfHwgbmV3IHZqcy5QbGF5ZXIodGFnLCBvcHRpb25zLCByZWFkeSk7XHJcbn07XHJcblxyXG4vLyBFeHRlbmRlZCBuYW1lLCBhbHNvIGF2YWlsYWJsZSBleHRlcm5hbGx5LCB3aW5kb3cudmlkZW9qc1xyXG52YXIgdmlkZW9qcyA9IHZqcztcclxud2luZG93LnZpZGVvanMgPSB3aW5kb3cudmpzID0gdmpzO1xyXG5cclxuLy8gQ0ROIFZlcnNpb24uIFVzZWQgdG8gdGFyZ2V0IHJpZ2h0IGZsYXNoIHN3Zi5cclxudmpzLkNETl9WRVJTSU9OID0gJzQuMyc7XHJcbnZqcy5BQ0NFU1NfUFJPVE9DT0wgPSAoJ2h0dHBzOicgPT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHM6Ly8nIDogJ2h0dHA6Ly8nKTtcclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgUGxheWVyIGluc3RhbmNlIG9wdGlvbnMsIHN1cmZhY2VkIGZyb20gdmpzLlBsYXllci5wcm90b3R5cGUub3B0aW9uc19cclxuICogdmpzLm9wdGlvbnMgPSB2anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zX1xyXG4gKiBBbGwgb3B0aW9ucyBzaG91bGQgdXNlIHN0cmluZyBrZXlzIHNvIHRoZXkgYXZvaWRcclxuICogcmVuYW1pbmcgYnkgY2xvc3VyZSBjb21waWxlclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmpzLm9wdGlvbnMgPSB7XHJcbiAgLy8gRGVmYXVsdCBvcmRlciBvZiBmYWxsYmFjayB0ZWNobm9sb2d5XHJcbiAgJ3RlY2hPcmRlcic6IFsnaHRtbDUnLCdmbGFzaCddLFxyXG4gIC8vIHRlY2hPcmRlcjogWydmbGFzaCcsJ2h0bWw1J10sXHJcblxyXG4gICdodG1sNSc6IHt9LFxyXG4gICdmbGFzaCc6IHt9LFxyXG5cclxuICAvLyBEZWZhdWx0IG9mIHdlYiBicm93c2VyIGlzIDMwMHgxNTAuIFNob3VsZCByZWx5IG9uIHNvdXJjZSB3aWR0aC9oZWlnaHQuXHJcbiAgJ3dpZHRoJzogMzAwLFxyXG4gICdoZWlnaHQnOiAxNTAsXHJcbiAgLy8gZGVmYXVsdFZvbHVtZTogMC44NSxcclxuICAnZGVmYXVsdFZvbHVtZSc6IDAuMDAsIC8vIFRoZSBmcmVha2luIHNlYWd1bHMgYXJlIGRyaXZpbmcgbWUgY3JhenkhXHJcblxyXG4gIC8vIEluY2x1ZGVkIGNvbnRyb2wgc2V0c1xyXG4gICdjaGlsZHJlbic6IHtcclxuICAgICdtZWRpYUxvYWRlcic6IHt9LFxyXG4gICAgJ3Bvc3RlckltYWdlJzoge30sXHJcbiAgICAndGV4dFRyYWNrRGlzcGxheSc6IHt9LFxyXG4gICAgJ2xvYWRpbmdTcGlubmVyJzoge30sXHJcbiAgICAnYmlnUGxheUJ1dHRvbic6IHt9LFxyXG4gICAgJ2NvbnRyb2xCYXInOiB7fVxyXG4gIH0sXHJcblxyXG4gIC8vIERlZmF1bHQgbWVzc2FnZSB0byBzaG93IHdoZW4gYSB2aWRlbyBjYW5ub3QgYmUgcGxheWVkLlxyXG4gICdub3RTdXBwb3J0ZWRNZXNzYWdlJzogJ1NvcnJ5LCBubyBjb21wYXRpYmxlIHNvdXJjZSBhbmQgcGxheWJhY2sgJyArXHJcbiAgICAgICd0ZWNobm9sb2d5IHdlcmUgZm91bmQgZm9yIHRoaXMgdmlkZW8uIFRyeSB1c2luZyBhbm90aGVyIGJyb3dzZXIgJyArXHJcbiAgICAgICdsaWtlIDxhIGhyZWY9XCJodHRwOi8vYml0Lmx5L2NjTVVFQ1wiPkNocm9tZTwvYT4gb3IgZG93bmxvYWQgdGhlICcgK1xyXG4gICAgICAnbGF0ZXN0IDxhIGhyZWY9XCJodHRwOi8vYWRvYmUubHkvbXdmTjFcIj5BZG9iZSBGbGFzaCBQbGF5ZXI8L2E+LidcclxufTtcclxuXHJcbi8vIFNldCBDRE4gVmVyc2lvbiBvZiBzd2ZcclxuLy8gVGhlIGFkZGVkICgrKSBibG9ja3MgdGhlIHJlcGxhY2UgZnJvbSBjaGFuZ2luZyB0aGlzIDQuMyBzdHJpbmdcclxuaWYgKHZqcy5DRE5fVkVSU0lPTiAhPT0gJ0dFTkVSQVRFRCcrJ19DRE5fVlNOJykge1xyXG4gIHZpZGVvanMub3B0aW9uc1snZmxhc2gnXVsnc3dmJ10gPSB2anMuQUNDRVNTX1BST1RPQ09MICsgJ3Zqcy56ZW5jZG4ubmV0LycrdmpzLkNETl9WRVJTSU9OKycvdmlkZW8tanMuc3dmJztcclxufVxyXG5cclxuLyoqXHJcbiAqIEdsb2JhbCBwbGF5ZXIgbGlzdFxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKi9cclxudmpzLnBsYXllcnMgPSB7fTtcclxuLyoqXHJcbiAqIENvcmUgT2JqZWN0L0NsYXNzIGZvciBvYmplY3RzIHRoYXQgdXNlIGluaGVyaXRhbmNlICsgY29udHN0cnVjdG9yc1xyXG4gKlxyXG4gKiBUbyBjcmVhdGUgYSBjbGFzcyB0aGF0IGNhbiBiZSBzdWJjbGFzc2VkIGl0c2VsZiwgZXh0ZW5kIHRoZSBDb3JlT2JqZWN0IGNsYXNzLlxyXG4gKlxyXG4gKiAgICAgdmFyIEFuaW1hbCA9IENvcmVPYmplY3QuZXh0ZW5kKCk7XHJcbiAqICAgICB2YXIgSG9yc2UgPSBBbmltYWwuZXh0ZW5kKCk7XHJcbiAqXHJcbiAqIFRoZSBjb25zdHJ1Y3RvciBjYW4gYmUgZGVmaW5lZCB0aHJvdWdoIHRoZSBpbml0IHByb3BlcnR5IG9mIGFuIG9iamVjdCBhcmd1bWVudC5cclxuICpcclxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCh7XHJcbiAqICAgICAgIGluaXQ6IGZ1bmN0aW9uKG5hbWUsIHNvdW5kKXtcclxuICogICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gKiAgICAgICB9XHJcbiAqICAgICB9KTtcclxuICpcclxuICogT3RoZXIgbWV0aG9kcyBhbmQgcHJvcGVydGllcyBjYW4gYmUgYWRkZWQgdGhlIHNhbWUgd2F5LCBvciBkaXJlY3RseSB0byB0aGVcclxuICogcHJvdG90eXBlLlxyXG4gKlxyXG4gKiAgICB2YXIgQW5pbWFsID0gQ29yZU9iamVjdC5leHRlbmQoe1xyXG4gKiAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lKXtcclxuICogICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gKiAgICAgICB9LFxyXG4gKiAgICAgICBnZXROYW1lOiBmdW5jdGlvbigpe1xyXG4gKiAgICAgICAgIHJldHVybiB0aGlzLm5hbWU7XHJcbiAqICAgICAgIH0sXHJcbiAqICAgICAgIHNvdW5kOiAnLi4uJ1xyXG4gKiAgICB9KTtcclxuICpcclxuICogICAgQW5pbWFsLnByb3RvdHlwZS5tYWtlU291bmQgPSBmdW5jdGlvbigpe1xyXG4gKiAgICAgIGFsZXJ0KHRoaXMuc291bmQpO1xyXG4gKiAgICB9O1xyXG4gKlxyXG4gKiBUbyBjcmVhdGUgYW4gaW5zdGFuY2Ugb2YgYSBjbGFzcywgdXNlIHRoZSBjcmVhdGUgbWV0aG9kLlxyXG4gKlxyXG4gKiAgICB2YXIgZmx1ZmZ5ID0gQW5pbWFsLmNyZWF0ZSgnRmx1ZmZ5Jyk7XHJcbiAqICAgIGZsdWZmeS5nZXROYW1lKCk7IC8vIC0+IEZsdWZmeVxyXG4gKlxyXG4gKiBNZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGNhbiBiZSBvdmVycmlkZGVuIGluIHN1YmNsYXNzZXMuXHJcbiAqXHJcbiAqICAgICB2YXIgSG9yc2UgPSBBbmltYWwuZXh0ZW5kKHtcclxuICogICAgICAgc291bmQ6ICdOZWlnaGhoaGghJ1xyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqICAgICB2YXIgaG9yc2V5ID0gSG9yc2UuY3JlYXRlKCdIb3JzZXknKTtcclxuICogICAgIGhvcnNleS5nZXROYW1lKCk7IC8vIC0+IEhvcnNleVxyXG4gKiAgICAgaG9yc2V5Lm1ha2VTb3VuZCgpOyAvLyAtPiBBbGVydDogTmVpZ2hoaGhoIVxyXG4gKlxyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ29yZU9iamVjdCA9IHZqc1snQ29yZU9iamVjdCddID0gZnVuY3Rpb24oKXt9O1xyXG4vLyBNYW51YWxseSBleHBvcnRpbmcgdmpzWydDb3JlT2JqZWN0J10gaGVyZSBmb3IgQ2xvc3VyZSBDb21waWxlclxyXG4vLyBiZWNhdXNlIG9mIHRoZSB1c2Ugb2YgdGhlIGV4dGVuZC9jcmVhdGUgY2xhc3MgbWV0aG9kc1xyXG4vLyBJZiB3ZSBkaWRuJ3QgZG8gdGhpcywgdGhvc2UgZnVuY3Rpb25zIHdvdWxkIGdldCBmbGF0dGVuZCB0byBzb21ldGhpbmcgbGlrZVxyXG4vLyBgYSA9IC4uLmAgYW5kIGB0aGlzLnByb3RvdHlwZWAgd291bGQgcmVmZXIgdG8gdGhlIGdsb2JhbCBvYmplY3QgaW5zdGVhZCBvZlxyXG4vLyBDb3JlT2JqZWN0XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBPYmplY3RcclxuICpcclxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCgpO1xyXG4gKiAgICAgdmFyIEhvcnNlID0gQW5pbWFsLmV4dGVuZCgpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvcHMgRnVuY3Rpb25zIGFuZCBwcm9wZXJ0aWVzIHRvIGJlIGFwcGxpZWQgdG8gdGhlXHJcbiAqICAgICAgICAgICAgICAgICAgICAgICBuZXcgb2JqZWN0J3MgcHJvdG90eXBlXHJcbiAqIEByZXR1cm4ge3Zqcy5Db3JlT2JqZWN0fSBBbiBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIENvcmVPYmplY3RcclxuICogQHRoaXMgeyp9XHJcbiAqL1xyXG52anMuQ29yZU9iamVjdC5leHRlbmQgPSBmdW5jdGlvbihwcm9wcyl7XHJcbiAgdmFyIGluaXQsIHN1Yk9iajtcclxuXHJcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcclxuICAvLyBTZXQgdXAgdGhlIGNvbnN0cnVjdG9yIHVzaW5nIHRoZSBzdXBwbGllZCBpbml0IG1ldGhvZFxyXG4gIC8vIG9yIHVzaW5nIHRoZSBpbml0IG9mIHRoZSBwYXJlbnQgb2JqZWN0XHJcbiAgLy8gTWFrZSBzdXJlIHRvIGNoZWNrIHRoZSB1bm9iZnVzY2F0ZWQgdmVyc2lvbiBmb3IgZXh0ZXJuYWwgbGlic1xyXG4gIGluaXQgPSBwcm9wc1snaW5pdCddIHx8IHByb3BzLmluaXQgfHwgdGhpcy5wcm90b3R5cGVbJ2luaXQnXSB8fCB0aGlzLnByb3RvdHlwZS5pbml0IHx8IGZ1bmN0aW9uKCl7fTtcclxuICAvLyBJbiBSZXNpZydzIHNpbXBsZSBjbGFzcyBpbmhlcml0YW5jZSAocHJldmlvdXNseSB1c2VkKSB0aGUgY29uc3RydWN0b3JcclxuICAvLyAgaXMgYSBmdW5jdGlvbiB0aGF0IGNhbGxzIGB0aGlzLmluaXQuYXBwbHkoYXJndW1lbnRzKWBcclxuICAvLyBIb3dldmVyIHRoYXQgd291bGQgcHJldmVudCB1cyBmcm9tIHVzaW5nIGBQYXJlbnRPYmplY3QuY2FsbCh0aGlzKTtgXHJcbiAgLy8gIGluIGEgQ2hpbGQgY29uc3R1Y3RvciBiZWNhdXNlIHRoZSBgdGhpc2AgaW4gYHRoaXMuaW5pdGBcclxuICAvLyAgd291bGQgc3RpbGwgcmVmZXIgdG8gdGhlIENoaWxkIGFuZCBjYXVzZSBhbiBpbmlmaW5pdGUgbG9vcC5cclxuICAvLyBXZSB3b3VsZCBpbnN0ZWFkIGhhdmUgdG8gZG9cclxuICAvLyAgICBgUGFyZW50T2JqZWN0LnByb3RvdHlwZS5pbml0LmFwcGx5KHRoaXMsIGFyZ3VtbmVudHMpO2BcclxuICAvLyAgQmxlaC4gV2UncmUgbm90IGNyZWF0aW5nIGEgX3N1cGVyKCkgZnVuY3Rpb24sIHNvIGl0J3MgZ29vZCB0byBrZWVwXHJcbiAgLy8gIHRoZSBwYXJlbnQgY29uc3RydWN0b3IgcmVmZXJlbmNlIHNpbXBsZS5cclxuICBzdWJPYmogPSBmdW5jdGlvbigpe1xyXG4gICAgaW5pdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH07XHJcblxyXG4gIC8vIEluaGVyaXQgZnJvbSB0aGlzIG9iamVjdCdzIHByb3RvdHlwZVxyXG4gIHN1Yk9iai5wcm90b3R5cGUgPSB2anMub2JqLmNyZWF0ZSh0aGlzLnByb3RvdHlwZSk7XHJcbiAgLy8gUmVzZXQgdGhlIGNvbnN0cnVjdG9yIHByb3BlcnR5IGZvciBzdWJPYmogb3RoZXJ3aXNlXHJcbiAgLy8gaW5zdGFuY2VzIG9mIHN1Yk9iaiB3b3VsZCBoYXZlIHRoZSBjb25zdHJ1Y3RvciBvZiB0aGUgcGFyZW50IE9iamVjdFxyXG4gIHN1Yk9iai5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBzdWJPYmo7XHJcblxyXG4gIC8vIE1ha2UgdGhlIGNsYXNzIGV4dGVuZGFibGVcclxuICBzdWJPYmouZXh0ZW5kID0gdmpzLkNvcmVPYmplY3QuZXh0ZW5kO1xyXG4gIC8vIE1ha2UgYSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgaW5zdGFuY2VzXHJcbiAgc3ViT2JqLmNyZWF0ZSA9IHZqcy5Db3JlT2JqZWN0LmNyZWF0ZTtcclxuXHJcbiAgLy8gRXh0ZW5kIHN1Yk9iaidzIHByb3RvdHlwZSB3aXRoIGZ1bmN0aW9ucyBhbmQgb3RoZXIgcHJvcGVydGllcyBmcm9tIHByb3BzXHJcbiAgZm9yICh2YXIgbmFtZSBpbiBwcm9wcykge1xyXG4gICAgaWYgKHByb3BzLmhhc093blByb3BlcnR5KG5hbWUpKSB7XHJcbiAgICAgIHN1Yk9iai5wcm90b3R5cGVbbmFtZV0gPSBwcm9wc1tuYW1lXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBzdWJPYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGEgbmV3IGluc3RhY2Ugb2YgdGhpcyBPYmplY3QgY2xhc3NcclxuICpcclxuICogICAgIHZhciBteUFuaW1hbCA9IEFuaW1hbC5jcmVhdGUoKTtcclxuICpcclxuICogQHJldHVybiB7dmpzLkNvcmVPYmplY3R9IEFuIGluc3RhbmNlIG9mIGEgQ29yZU9iamVjdCBzdWJjbGFzc1xyXG4gKiBAdGhpcyB7Kn1cclxuICovXHJcbnZqcy5Db3JlT2JqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gQ3JlYXRlIGEgbmV3IG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gdGhpcyBvYmplY3QncyBwcm90b3R5cGVcclxuICB2YXIgaW5zdCA9IHZqcy5vYmouY3JlYXRlKHRoaXMucHJvdG90eXBlKTtcclxuXHJcbiAgLy8gQXBwbHkgdGhpcyBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB0aGUgbmV3IG9iamVjdFxyXG4gIHRoaXMuYXBwbHkoaW5zdCwgYXJndW1lbnRzKTtcclxuXHJcbiAgLy8gUmV0dXJuIHRoZSBuZXcgb2JqZWN0XHJcbiAgcmV0dXJuIGluc3Q7XHJcbn07XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IEV2ZW50IFN5c3RlbSAoSm9obiBSZXNpZyAtIFNlY3JldHMgb2YgYSBKUyBOaW5qYSBodHRwOi8vanNuaW5qYS5jb20vKVxyXG4gKiAoT3JpZ2luYWwgYm9vayB2ZXJzaW9uIHdhc24ndCBjb21wbGV0ZWx5IHVzYWJsZSwgc28gZml4ZWQgc29tZSB0aGluZ3MgYW5kIG1hZGUgQ2xvc3VyZSBDb21waWxlciBjb21wYXRpYmxlKVxyXG4gKiBUaGlzIHNob3VsZCB3b3JrIHZlcnkgc2ltaWxhcmx5IHRvIGpRdWVyeSdzIGV2ZW50cywgaG93ZXZlciBpdCdzIGJhc2VkIG9mZiB0aGUgYm9vayB2ZXJzaW9uIHdoaWNoIGlzbid0IGFzXHJcbiAqIHJvYnVzdCBhcyBqcXVlcnkncywgc28gdGhlcmUncyBwcm9iYWJseSBzb21lIGRpZmZlcmVuY2VzLlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gZWxlbWVudFxyXG4gKiBJdCBzdG9yZXMgdGhlIGhhbmRsZXIgZnVuY3Rpb24gaW4gYSBzZXBhcmF0ZSBjYWNoZSBvYmplY3RcclxuICogYW5kIGFkZHMgYSBnZW5lcmljIGhhbmRsZXIgdG8gdGhlIGVsZW1lbnQncyBldmVudCxcclxuICogYWxvbmcgd2l0aCBhIHVuaXF1ZSBpZCAoZ3VpZCkgdG8gdGhlIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSAgIGVsZW0gRWxlbWVudCBvciBvYmplY3QgdG8gYmluZCBsaXN0ZW5lcnMgdG9cclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgVHlwZSBvZiBldmVudCB0byBiaW5kIHRvLlxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICBFdmVudCBsaXN0ZW5lci5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vbiA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGZuKXtcclxuICB2YXIgZGF0YSA9IHZqcy5nZXREYXRhKGVsZW0pO1xyXG5cclxuICAvLyBXZSBuZWVkIGEgcGxhY2UgdG8gc3RvcmUgYWxsIG91ciBoYW5kbGVyIGRhdGFcclxuICBpZiAoIWRhdGEuaGFuZGxlcnMpIGRhdGEuaGFuZGxlcnMgPSB7fTtcclxuXHJcbiAgaWYgKCFkYXRhLmhhbmRsZXJzW3R5cGVdKSBkYXRhLmhhbmRsZXJzW3R5cGVdID0gW107XHJcblxyXG4gIGlmICghZm4uZ3VpZCkgZm4uZ3VpZCA9IHZqcy5ndWlkKys7XHJcblxyXG4gIGRhdGEuaGFuZGxlcnNbdHlwZV0ucHVzaChmbik7XHJcblxyXG4gIGlmICghZGF0YS5kaXNwYXRjaGVyKSB7XHJcbiAgICBkYXRhLmRpc2FibGVkID0gZmFsc2U7XHJcblxyXG4gICAgZGF0YS5kaXNwYXRjaGVyID0gZnVuY3Rpb24gKGV2ZW50KXtcclxuXHJcbiAgICAgIGlmIChkYXRhLmRpc2FibGVkKSByZXR1cm47XHJcbiAgICAgIGV2ZW50ID0gdmpzLmZpeEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgICAgIHZhciBoYW5kbGVycyA9IGRhdGEuaGFuZGxlcnNbZXZlbnQudHlwZV07XHJcblxyXG4gICAgICBpZiAoaGFuZGxlcnMpIHtcclxuICAgICAgICAvLyBDb3B5IGhhbmRsZXJzIHNvIGlmIGhhbmRsZXJzIGFyZSBhZGRlZC9yZW1vdmVkIGR1cmluZyB0aGUgcHJvY2VzcyBpdCBkb2Vzbid0IHRocm93IGV2ZXJ5dGhpbmcgb2ZmLlxyXG4gICAgICAgIHZhciBoYW5kbGVyc0NvcHkgPSBoYW5kbGVycy5zbGljZSgwKTtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgbSA9IDAsIG4gPSBoYW5kbGVyc0NvcHkubGVuZ3RoOyBtIDwgbjsgbSsrKSB7XHJcbiAgICAgICAgICBpZiAoZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQoKSkge1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGhhbmRsZXJzQ29weVttXS5jYWxsKGVsZW0sIGV2ZW50KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH07XHJcbiAgfVxyXG5cclxuICBpZiAoZGF0YS5oYW5kbGVyc1t0eXBlXS5sZW5ndGggPT0gMSkge1xyXG4gICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgZWxlbS5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGRhdGEuZGlzcGF0Y2hlciwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5hdHRhY2hFdmVudCkge1xyXG4gICAgICBlbGVtLmF0dGFjaEV2ZW50KCdvbicgKyB0eXBlLCBkYXRhLmRpc3BhdGNoZXIpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmVzIGV2ZW50IGxpc3RlbmVycyBmcm9tIGFuIGVsZW1lbnRcclxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9ICAgZWxlbSBPYmplY3QgdG8gcmVtb3ZlIGxpc3RlbmVycyBmcm9tXHJcbiAqIEBwYXJhbSAge1N0cmluZz19ICAgdHlwZSBUeXBlIG9mIGxpc3RlbmVyIHRvIHJlbW92ZS4gRG9uJ3QgaW5jbHVkZSB0byByZW1vdmUgYWxsIGV2ZW50cyBmcm9tIGVsZW1lbnQuXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgIFNwZWNpZmljIGxpc3RlbmVyIHRvIHJlbW92ZS4gRG9uJ3QgaW5jbGR1ZSB0byByZW1vdmUgbGlzdGVuZXJzIGZvciBhbiBldmVudCB0eXBlLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9mZiA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGZuKSB7XHJcbiAgLy8gRG9uJ3Qgd2FudCB0byBhZGQgYSBjYWNoZSBvYmplY3QgdGhyb3VnaCBnZXREYXRhIGlmIG5vdCBuZWVkZWRcclxuICBpZiAoIXZqcy5oYXNEYXRhKGVsZW0pKSByZXR1cm47XHJcblxyXG4gIHZhciBkYXRhID0gdmpzLmdldERhdGEoZWxlbSk7XHJcblxyXG4gIC8vIElmIG5vIGV2ZW50cyBleGlzdCwgbm90aGluZyB0byB1bmJpbmRcclxuICBpZiAoIWRhdGEuaGFuZGxlcnMpIHsgcmV0dXJuOyB9XHJcblxyXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb25cclxuICB2YXIgcmVtb3ZlVHlwZSA9IGZ1bmN0aW9uKHQpe1xyXG4gICAgIGRhdGEuaGFuZGxlcnNbdF0gPSBbXTtcclxuICAgICB2anMuY2xlYW5VcEV2ZW50cyhlbGVtLHQpO1xyXG4gIH07XHJcblxyXG4gIC8vIEFyZSB3ZSByZW1vdmluZyBhbGwgYm91bmQgZXZlbnRzP1xyXG4gIGlmICghdHlwZSkge1xyXG4gICAgZm9yICh2YXIgdCBpbiBkYXRhLmhhbmRsZXJzKSByZW1vdmVUeXBlKHQpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgdmFyIGhhbmRsZXJzID0gZGF0YS5oYW5kbGVyc1t0eXBlXTtcclxuXHJcbiAgLy8gSWYgbm8gaGFuZGxlcnMgZXhpc3QsIG5vdGhpbmcgdG8gdW5iaW5kXHJcbiAgaWYgKCFoYW5kbGVycykgcmV0dXJuO1xyXG5cclxuICAvLyBJZiBubyBsaXN0ZW5lciB3YXMgcHJvdmlkZWQsIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciB0eXBlXHJcbiAgaWYgKCFmbikge1xyXG4gICAgcmVtb3ZlVHlwZSh0eXBlKTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIC8vIFdlJ3JlIG9ubHkgcmVtb3ZpbmcgYSBzaW5nbGUgaGFuZGxlclxyXG4gIGlmIChmbi5ndWlkKSB7XHJcbiAgICBmb3IgKHZhciBuID0gMDsgbiA8IGhhbmRsZXJzLmxlbmd0aDsgbisrKSB7XHJcbiAgICAgIGlmIChoYW5kbGVyc1tuXS5ndWlkID09PSBmbi5ndWlkKSB7XHJcbiAgICAgICAgaGFuZGxlcnMuc3BsaWNlKG4tLSwgMSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZqcy5jbGVhblVwRXZlbnRzKGVsZW0sIHR5cGUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENsZWFuIHVwIHRoZSBsaXN0ZW5lciBjYWNoZSBhbmQgZGlzcGF0Y2hlcnNcclxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9IGVsZW0gRWxlbWVudCB0byBjbGVhbiB1cFxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHR5cGUgVHlwZSBvZiBldmVudCB0byBjbGVhbiB1cFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmNsZWFuVXBFdmVudHMgPSBmdW5jdGlvbihlbGVtLCB0eXBlKSB7XHJcbiAgdmFyIGRhdGEgPSB2anMuZ2V0RGF0YShlbGVtKTtcclxuXHJcbiAgLy8gUmVtb3ZlIHRoZSBldmVudHMgb2YgYSBwYXJ0aWN1bGFyIHR5cGUgaWYgdGhlcmUgYXJlIG5vbmUgbGVmdFxyXG4gIGlmIChkYXRhLmhhbmRsZXJzW3R5cGVdLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgZGVsZXRlIGRhdGEuaGFuZGxlcnNbdHlwZV07XHJcbiAgICAvLyBkYXRhLmhhbmRsZXJzW3R5cGVdID0gbnVsbDtcclxuICAgIC8vIFNldHRpbmcgdG8gbnVsbCB3YXMgY2F1c2luZyBhbiBlcnJvciB3aXRoIGRhdGEuaGFuZGxlcnNcclxuXHJcbiAgICAvLyBSZW1vdmUgdGhlIG1ldGEtaGFuZGxlciBmcm9tIHRoZSBlbGVtZW50XHJcbiAgICBpZiAoZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICBlbGVtLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgZGF0YS5kaXNwYXRjaGVyLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmRldGFjaEV2ZW50KSB7XHJcbiAgICAgIGVsZW0uZGV0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGRhdGEuZGlzcGF0Y2hlcik7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZW1vdmUgdGhlIGV2ZW50cyBvYmplY3QgaWYgdGhlcmUgYXJlIG5vIHR5cGVzIGxlZnRcclxuICBpZiAodmpzLmlzRW1wdHkoZGF0YS5oYW5kbGVycykpIHtcclxuICAgIGRlbGV0ZSBkYXRhLmhhbmRsZXJzO1xyXG4gICAgZGVsZXRlIGRhdGEuZGlzcGF0Y2hlcjtcclxuICAgIGRlbGV0ZSBkYXRhLmRpc2FibGVkO1xyXG5cclxuICAgIC8vIGRhdGEuaGFuZGxlcnMgPSBudWxsO1xyXG4gICAgLy8gZGF0YS5kaXNwYXRjaGVyID0gbnVsbDtcclxuICAgIC8vIGRhdGEuZGlzYWJsZWQgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgLy8gRmluYWxseSByZW1vdmUgdGhlIGV4cGFuZG8gaWYgdGhlcmUgaXMgbm8gZGF0YSBsZWZ0XHJcbiAgaWYgKHZqcy5pc0VtcHR5KGRhdGEpKSB7XHJcbiAgICB2anMucmVtb3ZlRGF0YShlbGVtKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRml4IGEgbmF0aXZlIGV2ZW50IHRvIGhhdmUgc3RhbmRhcmQgcHJvcGVydHkgdmFsdWVzXHJcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnQgRXZlbnQgb2JqZWN0IHRvIGZpeFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZml4RXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xyXG5cclxuICBmdW5jdGlvbiByZXR1cm5UcnVlKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gIGZ1bmN0aW9uIHJldHVybkZhbHNlKCkgeyByZXR1cm4gZmFsc2U7IH1cclxuXHJcbiAgLy8gVGVzdCBpZiBmaXhpbmcgdXAgaXMgbmVlZGVkXHJcbiAgLy8gVXNlZCB0byBjaGVjayBpZiAhZXZlbnQuc3RvcFByb3BhZ2F0aW9uIGluc3RlYWQgb2YgaXNQcm9wYWdhdGlvblN0b3BwZWRcclxuICAvLyBCdXQgbmF0aXZlIGV2ZW50cyByZXR1cm4gdHJ1ZSBmb3Igc3RvcFByb3BhZ2F0aW9uLCBidXQgZG9uJ3QgaGF2ZVxyXG4gIC8vIG90aGVyIGV4cGVjdGVkIG1ldGhvZHMgbGlrZSBpc1Byb3BhZ2F0aW9uU3RvcHBlZC4gU2VlbXMgdG8gYmUgYSBwcm9ibGVtXHJcbiAgLy8gd2l0aCB0aGUgSmF2YXNjcmlwdCBOaW5qYSBjb2RlLiBTbyB3ZSdyZSBqdXN0IG92ZXJyaWRpbmcgYWxsIGV2ZW50cyBub3cuXHJcbiAgaWYgKCFldmVudCB8fCAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQpIHtcclxuICAgIHZhciBvbGQgPSBldmVudCB8fCB3aW5kb3cuZXZlbnQ7XHJcblxyXG4gICAgZXZlbnQgPSB7fTtcclxuICAgIC8vIENsb25lIHRoZSBvbGQgb2JqZWN0IHNvIHRoYXQgd2UgY2FuIG1vZGlmeSB0aGUgdmFsdWVzIGV2ZW50ID0ge307XHJcbiAgICAvLyBJRTggRG9lc24ndCBsaWtlIHdoZW4geW91IG1lc3Mgd2l0aCBuYXRpdmUgZXZlbnQgcHJvcGVydGllc1xyXG4gICAgLy8gRmlyZWZveCByZXR1cm5zIGZhbHNlIGZvciBldmVudC5oYXNPd25Qcm9wZXJ0eSgndHlwZScpIGFuZCBvdGhlciBwcm9wc1xyXG4gICAgLy8gIHdoaWNoIG1ha2VzIGNvcHlpbmcgbW9yZSBkaWZmaWN1bHQuXHJcbiAgICAvLyBUT0RPOiBQcm9iYWJseSBiZXN0IHRvIGNyZWF0ZSBhIHdoaXRlbGlzdCBvZiBldmVudCBwcm9wc1xyXG4gICAgZm9yICh2YXIga2V5IGluIG9sZCkge1xyXG4gICAgICAvLyBTYWZhcmkgNi4wLjMgd2FybnMgeW91IGlmIHlvdSB0cnkgdG8gY29weSBkZXByZWNhdGVkIGxheWVyWC9ZXHJcbiAgICAgIGlmIChrZXkgIT09ICdsYXllclgnICYmIGtleSAhPT0gJ2xheWVyWScpIHtcclxuICAgICAgICBldmVudFtrZXldID0gb2xkW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGUgZXZlbnQgb2NjdXJyZWQgb24gdGhpcyBlbGVtZW50XHJcbiAgICBpZiAoIWV2ZW50LnRhcmdldCkge1xyXG4gICAgICBldmVudC50YXJnZXQgPSBldmVudC5zcmNFbGVtZW50IHx8IGRvY3VtZW50O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSB3aGljaCBvdGhlciBlbGVtZW50IHRoZSBldmVudCBpcyByZWxhdGVkIHRvXHJcbiAgICBldmVudC5yZWxhdGVkVGFyZ2V0ID0gZXZlbnQuZnJvbUVsZW1lbnQgPT09IGV2ZW50LnRhcmdldCA/XHJcbiAgICAgIGV2ZW50LnRvRWxlbWVudCA6XHJcbiAgICAgIGV2ZW50LmZyb21FbGVtZW50O1xyXG5cclxuICAgIC8vIFN0b3AgdGhlIGRlZmF1bHQgYnJvd3NlciBhY3Rpb25cclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAob2xkLnByZXZlbnREZWZhdWx0KSB7XHJcbiAgICAgICAgb2xkLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQucmV0dXJuVmFsdWUgPSBmYWxzZTtcclxuICAgICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuVHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkID0gcmV0dXJuRmFsc2U7XHJcblxyXG4gICAgLy8gU3RvcCB0aGUgZXZlbnQgZnJvbSBidWJibGluZ1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAob2xkLnN0b3BQcm9wYWdhdGlvbikge1xyXG4gICAgICAgIG9sZC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuRmFsc2U7XHJcblxyXG4gICAgLy8gU3RvcCB0aGUgZXZlbnQgZnJvbSBidWJibGluZyBhbmQgZXhlY3V0aW5nIG90aGVyIGhhbmRsZXJzXHJcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChvbGQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgb2xkLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcclxuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuRmFsc2U7XHJcblxyXG4gICAgLy8gSGFuZGxlIG1vdXNlIHBvc2l0aW9uXHJcbiAgICBpZiAoZXZlbnQuY2xpZW50WCAhPSBudWxsKSB7XHJcbiAgICAgIHZhciBkb2MgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgICAgZXZlbnQucGFnZVggPSBldmVudC5jbGllbnRYICtcclxuICAgICAgICAoZG9jICYmIGRvYy5zY3JvbGxMZWZ0IHx8IGJvZHkgJiYgYm9keS5zY3JvbGxMZWZ0IHx8IDApIC1cclxuICAgICAgICAoZG9jICYmIGRvYy5jbGllbnRMZWZ0IHx8IGJvZHkgJiYgYm9keS5jbGllbnRMZWZ0IHx8IDApO1xyXG4gICAgICBldmVudC5wYWdlWSA9IGV2ZW50LmNsaWVudFkgK1xyXG4gICAgICAgIChkb2MgJiYgZG9jLnNjcm9sbFRvcCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsVG9wIHx8IDApIC1cclxuICAgICAgICAoZG9jICYmIGRvYy5jbGllbnRUb3AgfHwgYm9keSAmJiBib2R5LmNsaWVudFRvcCB8fCAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUga2V5IHByZXNzZXNcclxuICAgIGV2ZW50LndoaWNoID0gZXZlbnQuY2hhckNvZGUgfHwgZXZlbnQua2V5Q29kZTtcclxuXHJcbiAgICAvLyBGaXggYnV0dG9uIGZvciBtb3VzZSBjbGlja3M6XHJcbiAgICAvLyAwID09IGxlZnQ7IDEgPT0gbWlkZGxlOyAyID09IHJpZ2h0XHJcbiAgICBpZiAoZXZlbnQuYnV0dG9uICE9IG51bGwpIHtcclxuICAgICAgZXZlbnQuYnV0dG9uID0gKGV2ZW50LmJ1dHRvbiAmIDEgPyAwIDpcclxuICAgICAgICAoZXZlbnQuYnV0dG9uICYgNCA/IDEgOlxyXG4gICAgICAgICAgKGV2ZW50LmJ1dHRvbiAmIDIgPyAyIDogMCkpKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFJldHVybnMgZml4ZWQtdXAgaW5zdGFuY2VcclxuICByZXR1cm4gZXZlbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlciBhbiBldmVudCBmb3IgYW4gZWxlbWVudFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gZWxlbSAgRWxlbWVudCB0byB0cmlnZ2VyIGFuIGV2ZW50IG9uXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gZXZlbnQgVHlwZSBvZiBldmVudCB0byB0cmlnZ2VyXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMudHJpZ2dlciA9IGZ1bmN0aW9uKGVsZW0sIGV2ZW50KSB7XHJcbiAgLy8gRmV0Y2hlcyBlbGVtZW50IGRhdGEgYW5kIGEgcmVmZXJlbmNlIHRvIHRoZSBwYXJlbnQgKGZvciBidWJibGluZykuXHJcbiAgLy8gRG9uJ3Qgd2FudCB0byBhZGQgYSBkYXRhIG9iamVjdCB0byBjYWNoZSBmb3IgZXZlcnkgcGFyZW50LFxyXG4gIC8vIHNvIGNoZWNraW5nIGhhc0RhdGEgZmlyc3QuXHJcbiAgdmFyIGVsZW1EYXRhID0gKHZqcy5oYXNEYXRhKGVsZW0pKSA/IHZqcy5nZXREYXRhKGVsZW0pIDoge307XHJcbiAgdmFyIHBhcmVudCA9IGVsZW0ucGFyZW50Tm9kZSB8fCBlbGVtLm93bmVyRG9jdW1lbnQ7XHJcbiAgICAgIC8vIHR5cGUgPSBldmVudC50eXBlIHx8IGV2ZW50LFxyXG4gICAgICAvLyBoYW5kbGVyO1xyXG5cclxuICAvLyBJZiBhbiBldmVudCBuYW1lIHdhcyBwYXNzZWQgYXMgYSBzdHJpbmcsIGNyZWF0ZXMgYW4gZXZlbnQgb3V0IG9mIGl0XHJcbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgIGV2ZW50ID0geyB0eXBlOmV2ZW50LCB0YXJnZXQ6ZWxlbSB9O1xyXG4gIH1cclxuICAvLyBOb3JtYWxpemVzIHRoZSBldmVudCBwcm9wZXJ0aWVzLlxyXG4gIGV2ZW50ID0gdmpzLmZpeEV2ZW50KGV2ZW50KTtcclxuXHJcbiAgLy8gSWYgdGhlIHBhc3NlZCBlbGVtZW50IGhhcyBhIGRpc3BhdGNoZXIsIGV4ZWN1dGVzIHRoZSBlc3RhYmxpc2hlZCBoYW5kbGVycy5cclxuICBpZiAoZWxlbURhdGEuZGlzcGF0Y2hlcikge1xyXG4gICAgZWxlbURhdGEuZGlzcGF0Y2hlci5jYWxsKGVsZW0sIGV2ZW50KTtcclxuICB9XHJcblxyXG4gIC8vIFVubGVzcyBleHBsaWNpdGx5IHN0b3BwZWQgb3IgdGhlIGV2ZW50IGRvZXMgbm90IGJ1YmJsZSAoZS5nLiBtZWRpYSBldmVudHMpXHJcbiAgICAvLyByZWN1cnNpdmVseSBjYWxscyB0aGlzIGZ1bmN0aW9uIHRvIGJ1YmJsZSB0aGUgZXZlbnQgdXAgdGhlIERPTS5cclxuICAgIGlmIChwYXJlbnQgJiYgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKCkgJiYgZXZlbnQuYnViYmxlcyAhPT0gZmFsc2UpIHtcclxuICAgIHZqcy50cmlnZ2VyKHBhcmVudCwgZXZlbnQpO1xyXG5cclxuICAvLyBJZiBhdCB0aGUgdG9wIG9mIHRoZSBET00sIHRyaWdnZXJzIHRoZSBkZWZhdWx0IGFjdGlvbiB1bmxlc3MgZGlzYWJsZWQuXHJcbiAgfSBlbHNlIGlmICghcGFyZW50ICYmICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgdmFyIHRhcmdldERhdGEgPSB2anMuZ2V0RGF0YShldmVudC50YXJnZXQpO1xyXG5cclxuICAgIC8vIENoZWNrcyBpZiB0aGUgdGFyZ2V0IGhhcyBhIGRlZmF1bHQgYWN0aW9uIGZvciB0aGlzIGV2ZW50LlxyXG4gICAgaWYgKGV2ZW50LnRhcmdldFtldmVudC50eXBlXSkge1xyXG4gICAgICAvLyBUZW1wb3JhcmlseSBkaXNhYmxlcyBldmVudCBkaXNwYXRjaGluZyBvbiB0aGUgdGFyZ2V0IGFzIHdlIGhhdmUgYWxyZWFkeSBleGVjdXRlZCB0aGUgaGFuZGxlci5cclxuICAgICAgdGFyZ2V0RGF0YS5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgIC8vIEV4ZWN1dGVzIHRoZSBkZWZhdWx0IGFjdGlvbi5cclxuICAgICAgaWYgKHR5cGVvZiBldmVudC50YXJnZXRbZXZlbnQudHlwZV0gPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBldmVudC50YXJnZXRbZXZlbnQudHlwZV0oKTtcclxuICAgICAgfVxyXG4gICAgICAvLyBSZS1lbmFibGVzIGV2ZW50IGRpc3BhdGNoaW5nLlxyXG4gICAgICB0YXJnZXREYXRhLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBJbmZvcm0gdGhlIHRyaWdnZXJlciBpZiB0aGUgZGVmYXVsdCB3YXMgcHJldmVudGVkIGJ5IHJldHVybmluZyBmYWxzZVxyXG4gIHJldHVybiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCk7XHJcbiAgLyogT3JpZ2luYWwgdmVyc2lvbiBvZiBqcyBuaW5qYSBldmVudHMgd2Fzbid0IGNvbXBsZXRlLlxyXG4gICAqIFdlJ3ZlIHNpbmNlIHVwZGF0ZWQgdG8gdGhlIGxhdGVzdCB2ZXJzaW9uLCBidXQga2VlcGluZyB0aGlzIGFyb3VuZFxyXG4gICAqIGZvciBub3cganVzdCBpbiBjYXNlLlxyXG4gICAqL1xyXG4gIC8vIC8vIEFkZGVkIGluIGF0dGlvbiB0byBib29rLiBCb29rIGNvZGUgd2FzIGJyb2tlLlxyXG4gIC8vIGV2ZW50ID0gdHlwZW9mIGV2ZW50ID09PSAnb2JqZWN0JyA/XHJcbiAgLy8gICBldmVudFt2anMuZXhwYW5kb10gP1xyXG4gIC8vICAgICBldmVudCA6XHJcbiAgLy8gICAgIG5ldyB2anMuRXZlbnQodHlwZSwgZXZlbnQpIDpcclxuICAvLyAgIG5ldyB2anMuRXZlbnQodHlwZSk7XHJcblxyXG4gIC8vIGV2ZW50LnR5cGUgPSB0eXBlO1xyXG4gIC8vIGlmIChoYW5kbGVyKSB7XHJcbiAgLy8gICBoYW5kbGVyLmNhbGwoZWxlbSwgZXZlbnQpO1xyXG4gIC8vIH1cclxuXHJcbiAgLy8gLy8gQ2xlYW4gdXAgdGhlIGV2ZW50IGluIGNhc2UgaXQgaXMgYmVpbmcgcmV1c2VkXHJcbiAgLy8gZXZlbnQucmVzdWx0ID0gdW5kZWZpbmVkO1xyXG4gIC8vIGV2ZW50LnRhcmdldCA9IGVsZW07XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlciBhIGxpc3RlbmVyIG9ubHkgb25jZSBmb3IgYW4gZXZlbnRcclxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9ICAgZWxlbSBFbGVtZW50IG9yIG9iamVjdCB0b1xyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdHlwZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vbmUgPSBmdW5jdGlvbihlbGVtLCB0eXBlLCBmbikge1xyXG4gIHZhciBmdW5jID0gZnVuY3Rpb24oKXtcclxuICAgIHZqcy5vZmYoZWxlbSwgdHlwZSwgZnVuYyk7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH07XHJcbiAgZnVuYy5ndWlkID0gZm4uZ3VpZCA9IGZuLmd1aWQgfHwgdmpzLmd1aWQrKztcclxuICB2anMub24oZWxlbSwgdHlwZSwgZnVuYyk7XHJcbn07XHJcbnZhciBoYXNPd25Qcm9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVzIGFuIGVsZW1lbnQgYW5kIGFwcGxpZXMgcHJvcGVydGllcy5cclxuICogQHBhcmFtICB7U3RyaW5nPX0gdGFnTmFtZSAgICBOYW1lIG9mIHRhZyB0byBiZSBjcmVhdGVkLlxyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBwcm9wZXJ0aWVzIEVsZW1lbnQgcHJvcGVydGllcyB0byBiZSBhcHBsaWVkLlxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmNyZWF0ZUVsID0gZnVuY3Rpb24odGFnTmFtZSwgcHJvcGVydGllcyl7XHJcbiAgdmFyIGVsLCBwcm9wTmFtZTtcclxuXHJcbiAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZ05hbWUgfHwgJ2RpdicpO1xyXG5cclxuICBmb3IgKHByb3BOYW1lIGluIHByb3BlcnRpZXMpe1xyXG4gICAgaWYgKGhhc093blByb3AuY2FsbChwcm9wZXJ0aWVzLCBwcm9wTmFtZSkpIHtcclxuICAgICAgLy9lbFtwcm9wTmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BOYW1lXTtcclxuICAgICAgLy8gTm90IHJlbWVtYmVyaW5nIHdoeSB3ZSB3ZXJlIGNoZWNraW5nIGZvciBkYXNoXHJcbiAgICAgIC8vIGJ1dCB1c2luZyBzZXRBdHRyaWJ1dGUgbWVhbnMgeW91IGhhdmUgdG8gdXNlIGdldEF0dHJpYnV0ZVxyXG5cclxuICAgICAgLy8gVGhlIGNoZWNrIGZvciBkYXNoIGNoZWNrcyBmb3IgdGhlIGFyaWEtKiBhdHRyaWJ1dGVzLCBsaWtlIGFyaWEtbGFiZWwsIGFyaWEtdmFsdWVtaW4uXHJcbiAgICAgIC8vIFRoZSBhZGRpdGlvbmFsIGNoZWNrIGZvciBcInJvbGVcIiBpcyBiZWNhdXNlIHRoZSBkZWZhdWx0IG1ldGhvZCBmb3IgYWRkaW5nIGF0dHJpYnV0ZXMgZG9lcyBub3RcclxuICAgICAgLy8gYWRkIHRoZSBhdHRyaWJ1dGUgXCJyb2xlXCIuIE15IGd1ZXNzIGlzIGJlY2F1c2UgaXQncyBub3QgYSB2YWxpZCBhdHRyaWJ1dGUgaW4gc29tZSBuYW1lc3BhY2VzLCBhbHRob3VnaFxyXG4gICAgICAvLyBicm93c2VycyBoYW5kbGUgdGhlIGF0dHJpYnV0ZSBqdXN0IGZpbmUuIFRoZSBXM0MgYWxsb3dzIGZvciBhcmlhLSogYXR0cmlidXRlcyB0byBiZSB1c2VkIGluIHByZS1IVE1MNSBkb2NzLlxyXG4gICAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi93YWktYXJpYS1wcmltZXIvI2FyaWFodG1sLiBVc2luZyBzZXRBdHRyaWJ1dGUgZ2V0cyBhcm91bmQgdGhpcyBwcm9ibGVtLlxyXG5cclxuICAgICAgIGlmIChwcm9wTmFtZS5pbmRleE9mKCdhcmlhLScpICE9PSAtMSB8fCBwcm9wTmFtZT09J3JvbGUnKSB7XHJcbiAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShwcm9wTmFtZSwgcHJvcGVydGllc1twcm9wTmFtZV0pO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgZWxbcHJvcE5hbWVdID0gcHJvcGVydGllc1twcm9wTmFtZV07XHJcbiAgICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVcHBlcmNhc2UgdGhlIGZpcnN0IGxldHRlciBvZiBhIHN0cmluZ1xyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gYmUgdXBwZXJjYXNlZFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZyl7XHJcbiAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0cmluZy5zbGljZSgxKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPYmplY3QgZnVuY3Rpb25zIGNvbnRhaW5lclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iaiA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdC5jcmVhdGUgc2hpbSBmb3IgcHJvdG90eXBhbCBpbmhlcml0YW5jZVxyXG4gKlxyXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL09iamVjdC9jcmVhdGVcclxuICpcclxuICogQGZ1bmN0aW9uXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvYmogT2JqZWN0IHRvIHVzZSBhcyBwcm90b3R5cGVcclxuICogQHByaXZhdGVcclxuICovXHJcbiB2anMub2JqLmNyZWF0ZSA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24ob2JqKXtcclxuICAvL0NyZWF0ZSBhIG5ldyBmdW5jdGlvbiBjYWxsZWQgJ0YnIHdoaWNoIGlzIGp1c3QgYW4gZW1wdHkgb2JqZWN0LlxyXG4gIGZ1bmN0aW9uIEYoKSB7fVxyXG5cclxuICAvL3RoZSBwcm90b3R5cGUgb2YgdGhlICdGJyBmdW5jdGlvbiBzaG91bGQgcG9pbnQgdG8gdGhlXHJcbiAgLy9wYXJhbWV0ZXIgb2YgdGhlIGFub255bW91cyBmdW5jdGlvbi5cclxuICBGLnByb3RvdHlwZSA9IG9iajtcclxuXHJcbiAgLy9jcmVhdGUgYSBuZXcgY29uc3RydWN0b3IgZnVuY3Rpb24gYmFzZWQgb2ZmIG9mIHRoZSAnRicgZnVuY3Rpb24uXHJcbiAgcmV0dXJuIG5ldyBGKCk7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9vcCB0aHJvdWdoIGVhY2ggcHJvcGVydHkgaW4gYW4gb2JqZWN0IGFuZCBjYWxsIGEgZnVuY3Rpb25cclxuICogd2hvc2UgYXJndW1lbnRzIGFyZSAoa2V5LHZhbHVlKVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb2JqIE9iamVjdCBvZiBwcm9wZXJ0aWVzXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgRnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGVhY2ggcHJvcGVydHkuXHJcbiAqIEB0aGlzIHsqfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iai5lYWNoID0gZnVuY3Rpb24ob2JqLCBmbiwgY29udGV4dCl7XHJcbiAgZm9yICh2YXIga2V5IGluIG9iaikge1xyXG4gICAgaWYgKGhhc093blByb3AuY2FsbChvYmosIGtleSkpIHtcclxuICAgICAgZm4uY2FsbChjb250ZXh0IHx8IHRoaXMsIGtleSwgb2JqW2tleV0pO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBNZXJnZSB0d28gb2JqZWN0cyB0b2dldGhlciBhbmQgcmV0dXJuIHRoZSBvcmlnaW5hbC5cclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmoxXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqLm1lcmdlID0gZnVuY3Rpb24ob2JqMSwgb2JqMil7XHJcbiAgaWYgKCFvYmoyKSB7IHJldHVybiBvYmoxOyB9XHJcbiAgZm9yICh2YXIga2V5IGluIG9iajIpe1xyXG4gICAgaWYgKGhhc093blByb3AuY2FsbChvYmoyLCBrZXkpKSB7XHJcbiAgICAgIG9iajFba2V5XSA9IG9iajJba2V5XTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG9iajE7XHJcbn07XHJcblxyXG4vKipcclxuICogTWVyZ2UgdHdvIG9iamVjdHMsIGFuZCBtZXJnZSBhbnkgcHJvcGVydGllcyB0aGF0IGFyZSBvYmplY3RzXHJcbiAqIGluc3RlYWQgb2YganVzdCBvdmVyd3JpdGluZyBvbmUuIFVzZXMgdG8gbWVyZ2Ugb3B0aW9ucyBoYXNoZXNcclxuICogd2hlcmUgZGVlcGVyIGRlZmF1bHQgc2V0dGluZ3MgYXJlIGltcG9ydGFudC5cclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBvdmVycmlkZVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iajIgT3ZlcnJpZGluZyBvYmplY3RcclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgIE5ldyBvYmplY3QuIE9iajEgYW5kIE9iajIgd2lsbCBiZSB1bnRvdWNoZWQuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqLmRlZXBNZXJnZSA9IGZ1bmN0aW9uKG9iajEsIG9iajIpe1xyXG4gIHZhciBrZXksIHZhbDEsIHZhbDI7XHJcblxyXG4gIC8vIG1ha2UgYSBjb3B5IG9mIG9iajEgc28gd2UncmUgbm90IG92ZXdyaXRpbmcgb3JpZ2luYWwgdmFsdWVzLlxyXG4gIC8vIGxpa2UgcHJvdG90eXBlLm9wdGlvbnNfIGFuZCBhbGwgc3ViIG9wdGlvbnMgb2JqZWN0c1xyXG4gIG9iajEgPSB2anMub2JqLmNvcHkob2JqMSk7XHJcblxyXG4gIGZvciAoa2V5IGluIG9iajIpe1xyXG4gICAgaWYgKGhhc093blByb3AuY2FsbChvYmoyLCBrZXkpKSB7XHJcbiAgICAgIHZhbDEgPSBvYmoxW2tleV07XHJcbiAgICAgIHZhbDIgPSBvYmoyW2tleV07XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBib3RoIHByb3BlcnRpZXMgYXJlIHB1cmUgb2JqZWN0cyBhbmQgZG8gYSBkZWVwIG1lcmdlIGlmIHNvXHJcbiAgICAgIGlmICh2anMub2JqLmlzUGxhaW4odmFsMSkgJiYgdmpzLm9iai5pc1BsYWluKHZhbDIpKSB7XHJcbiAgICAgICAgb2JqMVtrZXldID0gdmpzLm9iai5kZWVwTWVyZ2UodmFsMSwgdmFsMik7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgb2JqMVtrZXldID0gb2JqMltrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBvYmoxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1ha2UgYSBjb3B5IG9mIHRoZSBzdXBwbGllZCBvYmplY3RcclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIGNvcHlcclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgQ29weSBvZiBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmouY29weSA9IGZ1bmN0aW9uKG9iail7XHJcbiAgcmV0dXJuIHZqcy5vYmoubWVyZ2Uoe30sIG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYW4gb2JqZWN0IGlzIHBsYWluLCBhbmQgbm90IGEgZG9tIG5vZGUgb3IgYW55IG9iamVjdCBzdWItaW5zdGFuY2VcclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogT2JqZWN0IHRvIGNoZWNrXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgICBUcnVlIGlmIHBsYWluLCBmYWxzZSBvdGhlcndpc2VcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmouaXNQbGFpbiA9IGZ1bmN0aW9uKG9iail7XHJcbiAgcmV0dXJuICEhb2JqXHJcbiAgICAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0J1xyXG4gICAgJiYgb2JqLnRvU3RyaW5nKCkgPT09ICdbb2JqZWN0IE9iamVjdF0nXHJcbiAgICAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBCaW5kIChhLmsuYSBwcm94eSBvciBDb250ZXh0KS4gQSBzaW1wbGUgbWV0aG9kIGZvciBjaGFuZ2luZyB0aGUgY29udGV4dCBvZiBhIGZ1bmN0aW9uXHJcbiAgIEl0IGFsc28gc3RvcmVzIGEgdW5pcXVlIGlkIG9uIHRoZSBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgZWFzaWx5IHJlbW92ZWQgZnJvbSBldmVudHNcclxuICogQHBhcmFtICB7Kn0gICBjb250ZXh0IFRoZSBvYmplY3QgdG8gYmluZCBhcyBzY29wZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICAgICBUaGUgZnVuY3Rpb24gdG8gYmUgYm91bmQgdG8gYSBzY29wZVxyXG4gKiBAcGFyYW0gIHtOdW1iZXI9fSAgIHVpZCAgICAgQW4gb3B0aW9uYWwgdW5pcXVlIElEIGZvciB0aGUgZnVuY3Rpb24gdG8gYmUgc2V0XHJcbiAqIEByZXR1cm4ge0Z1bmN0aW9ufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmJpbmQgPSBmdW5jdGlvbihjb250ZXh0LCBmbiwgdWlkKSB7XHJcbiAgLy8gTWFrZSBzdXJlIHRoZSBmdW5jdGlvbiBoYXMgYSB1bmlxdWUgSURcclxuICBpZiAoIWZuLmd1aWQpIHsgZm4uZ3VpZCA9IHZqcy5ndWlkKys7IH1cclxuXHJcbiAgLy8gQ3JlYXRlIHRoZSBuZXcgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHRoZSBjb250ZXh0XHJcbiAgdmFyIHJldCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQWxsb3cgZm9yIHRoZSBhYmlsaXR5IHRvIGluZGl2aWR1YWxpemUgdGhpcyBmdW5jdGlvblxyXG4gIC8vIE5lZWRlZCBpbiB0aGUgY2FzZSB3aGVyZSBtdWx0aXBsZSBvYmplY3RzIG1pZ2h0IHNoYXJlIHRoZSBzYW1lIHByb3RvdHlwZVxyXG4gIC8vIElGIGJvdGggaXRlbXMgYWRkIGFuIGV2ZW50IGxpc3RlbmVyIHdpdGggdGhlIHNhbWUgZnVuY3Rpb24sIHRoZW4geW91IHRyeSB0byByZW1vdmUganVzdCBvbmVcclxuICAvLyBpdCB3aWxsIHJlbW92ZSBib3RoIGJlY2F1c2UgdGhleSBib3RoIGhhdmUgdGhlIHNhbWUgZ3VpZC5cclxuICAvLyB3aGVuIHVzaW5nIHRoaXMsIHlvdSBuZWVkIHRvIHVzZSB0aGUgYmluZCBtZXRob2Qgd2hlbiB5b3UgcmVtb3ZlIHRoZSBsaXN0ZW5lciBhcyB3ZWxsLlxyXG4gIC8vIGN1cnJlbnRseSB1c2VkIGluIHRleHQgdHJhY2tzXHJcbiAgcmV0Lmd1aWQgPSAodWlkKSA/IHVpZCArICdfJyArIGZuLmd1aWQgOiBmbi5ndWlkO1xyXG5cclxuICByZXR1cm4gcmV0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVsZW1lbnQgRGF0YSBTdG9yZS4gQWxsb3dzIGZvciBiaW5kaW5nIGRhdGEgdG8gYW4gZWxlbWVudCB3aXRob3V0IHB1dHRpbmcgaXQgZGlyZWN0bHkgb24gdGhlIGVsZW1lbnQuXHJcbiAqIEV4LiBFdmVudCBsaXN0bmVyZXMgYXJlIHN0b3JlZCBoZXJlLlxyXG4gKiAoYWxzbyBmcm9tIGpzbmluamEuY29tLCBzbGlnaHRseSBtb2RpZmllZCBhbmQgdXBkYXRlZCBmb3IgY2xvc3VyZSBjb21waWxlcilcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5jYWNoZSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFVuaXF1ZSBJRCBmb3IgYW4gZWxlbWVudCBvciBmdW5jdGlvblxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmd1aWQgPSAxO1xyXG5cclxuLyoqXHJcbiAqIFVuaXF1ZSBhdHRyaWJ1dGUgbmFtZSB0byBzdG9yZSBhbiBlbGVtZW50J3MgZ3VpZCBpblxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAY29uc3RhbnRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5leHBhbmRvID0gJ3ZkYXRhJyArIChuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY2FjaGUgb2JqZWN0IHdoZXJlIGRhdGEgZm9yIGFuIGVsZW1lbnQgaXMgc3RvcmVkXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsIEVsZW1lbnQgdG8gc3RvcmUgZGF0YSBmb3IuXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5nZXREYXRhID0gZnVuY3Rpb24oZWwpe1xyXG4gIHZhciBpZCA9IGVsW3Zqcy5leHBhbmRvXTtcclxuICBpZiAoIWlkKSB7XHJcbiAgICBpZCA9IGVsW3Zqcy5leHBhbmRvXSA9IHZqcy5ndWlkKys7XHJcbiAgICB2anMuY2FjaGVbaWRdID0ge307XHJcbiAgfVxyXG4gIHJldHVybiB2anMuY2FjaGVbaWRdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGNhY2hlIG9iamVjdCB3aGVyZSBkYXRhIGZvciBhbiBlbGVtZW50IGlzIHN0b3JlZFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbCBFbGVtZW50IHRvIHN0b3JlIGRhdGEgZm9yLlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuaGFzRGF0YSA9IGZ1bmN0aW9uKGVsKXtcclxuICB2YXIgaWQgPSBlbFt2anMuZXhwYW5kb107XHJcbiAgcmV0dXJuICEoIWlkIHx8IHZqcy5pc0VtcHR5KHZqcy5jYWNoZVtpZF0pKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEZWxldGUgZGF0YSBmb3IgdGhlIGVsZW1lbnQgZnJvbSB0aGUgY2FjaGUgYW5kIHRoZSBndWlkIGF0dHIgZnJvbSBnZXRFbGVtZW50QnlJZFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbCBSZW1vdmUgZGF0YSBmb3IgYW4gZWxlbWVudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnJlbW92ZURhdGEgPSBmdW5jdGlvbihlbCl7XHJcbiAgdmFyIGlkID0gZWxbdmpzLmV4cGFuZG9dO1xyXG4gIGlmICghaWQpIHsgcmV0dXJuOyB9XHJcbiAgLy8gUmVtb3ZlIGFsbCBzdG9yZWQgZGF0YVxyXG4gIC8vIENoYW5nZWQgdG8gPSBudWxsXHJcbiAgLy8gaHR0cDovL2NvZGluZy5zbWFzaGluZ21hZ2F6aW5lLmNvbS8yMDEyLzExLzA1L3dyaXRpbmctZmFzdC1tZW1vcnktZWZmaWNpZW50LWphdmFzY3JpcHQvXHJcbiAgLy8gdmpzLmNhY2hlW2lkXSA9IG51bGw7XHJcbiAgZGVsZXRlIHZqcy5jYWNoZVtpZF07XHJcblxyXG4gIC8vIFJlbW92ZSB0aGUgZXhwYW5kbyBwcm9wZXJ0eSBmcm9tIHRoZSBET00gbm9kZVxyXG4gIHRyeSB7XHJcbiAgICBkZWxldGUgZWxbdmpzLmV4cGFuZG9dO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgaWYgKGVsLnJlbW92ZUF0dHJpYnV0ZSkge1xyXG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUodmpzLmV4cGFuZG8pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gSUUgZG9lc24ndCBhcHBlYXIgdG8gc3VwcG9ydCByZW1vdmVBdHRyaWJ1dGUgb24gdGhlIGRvY3VtZW50IGVsZW1lbnRcclxuICAgICAgZWxbdmpzLmV4cGFuZG9dID0gbnVsbDtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgYW4gb2JqZWN0IGlzIGVtcHR5XHJcbiAqIEBwYXJhbSAge09iamVjdH0gIG9iaiBUaGUgb2JqZWN0IHRvIGNoZWNrIGZvciBlbXB0aW5lc3NcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5pc0VtcHR5ID0gZnVuY3Rpb24ob2JqKSB7XHJcbiAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcclxuICAgIC8vIElubHVkZSBudWxsIHByb3BlcnRpZXMgYXMgZW1wdHkuXHJcbiAgICBpZiAob2JqW3Byb3BdICE9PSBudWxsKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGEgQ1NTIGNsYXNzIG5hbWUgdG8gYW4gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgICAgRWxlbWVudCB0byBhZGQgY2xhc3MgbmFtZSB0b1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb0FkZCBDbGFzc25hbWUgdG8gYWRkXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuYWRkQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjbGFzc1RvQWRkKXtcclxuICBpZiAoKCcgJytlbGVtZW50LmNsYXNzTmFtZSsnICcpLmluZGV4T2YoJyAnK2NsYXNzVG9BZGQrJyAnKSA9PSAtMSkge1xyXG4gICAgZWxlbWVudC5jbGFzc05hbWUgPSBlbGVtZW50LmNsYXNzTmFtZSA9PT0gJycgPyBjbGFzc1RvQWRkIDogZWxlbWVudC5jbGFzc05hbWUgKyAnICcgKyBjbGFzc1RvQWRkO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBDU1MgY2xhc3MgbmFtZSBmcm9tIGFuIGVsZW1lbnRcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50ICAgIEVsZW1lbnQgdG8gcmVtb3ZlIGZyb20gY2xhc3MgbmFtZVxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb0FkZCBDbGFzc25hbWUgdG8gcmVtb3ZlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbGVtZW50LCBjbGFzc1RvUmVtb3ZlKXtcclxuICB2YXIgY2xhc3NOYW1lcywgaTtcclxuXHJcbiAgaWYgKGVsZW1lbnQuY2xhc3NOYW1lLmluZGV4T2YoY2xhc3NUb1JlbW92ZSkgPT0gLTEpIHsgcmV0dXJuOyB9XHJcblxyXG4gIGNsYXNzTmFtZXMgPSBlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpO1xyXG5cclxuICAvLyBubyBhcnIuaW5kZXhPZiBpbiBpZTgsIGFuZCB3ZSBkb24ndCB3YW50IHRvIGFkZCBhIGJpZyBzaGltXHJcbiAgZm9yIChpID0gY2xhc3NOYW1lcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgaWYgKGNsYXNzTmFtZXNbaV0gPT09IGNsYXNzVG9SZW1vdmUpIHtcclxuICAgICAgY2xhc3NOYW1lcy5zcGxpY2UoaSwxKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGVsZW1lbnQuY2xhc3NOYW1lID0gY2xhc3NOYW1lcy5qb2luKCcgJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRWxlbWVudCBmb3IgdGVzdGluZyBicm93c2VyIEhUTUw1IHZpZGVvIGNhcGFiaWxpdGllc1xyXG4gKiBAdHlwZSB7RWxlbWVudH1cclxuICogQGNvbnN0YW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVEVTVF9WSUQgPSB2anMuY3JlYXRlRWwoJ3ZpZGVvJyk7XHJcblxyXG4vKipcclxuICogVXNlcmFnZW50IGZvciBicm93c2VyIHRlc3RpbmcuXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlVTRVJfQUdFTlQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xyXG5cclxuLyoqXHJcbiAqIERldmljZSBpcyBhbiBpUGhvbmVcclxuICogQHR5cGUge0Jvb2xlYW59XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLklTX0lQSE9ORSA9ICgvaVBob25lL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG52anMuSVNfSVBBRCA9ICgvaVBhZC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxudmpzLklTX0lQT0QgPSAoL2lQb2QvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcbnZqcy5JU19JT1MgPSB2anMuSVNfSVBIT05FIHx8IHZqcy5JU19JUEFEIHx8IHZqcy5JU19JUE9EO1xyXG5cclxudmpzLklPU19WRVJTSU9OID0gKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG1hdGNoID0gdmpzLlVTRVJfQUdFTlQubWF0Y2goL09TIChcXGQrKV8vaSk7XHJcbiAgaWYgKG1hdGNoICYmIG1hdGNoWzFdKSB7IHJldHVybiBtYXRjaFsxXTsgfVxyXG59KSgpO1xyXG5cclxudmpzLklTX0FORFJPSUQgPSAoL0FuZHJvaWQvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcbnZqcy5BTkRST0lEX1ZFUlNJT04gPSAoZnVuY3Rpb24oKSB7XHJcbiAgLy8gVGhpcyBtYXRjaGVzIEFuZHJvaWQgTWFqb3IuTWlub3IuUGF0Y2ggdmVyc2lvbnNcclxuICAvLyBBTkRST0lEX1ZFUlNJT04gaXMgTWFqb3IuTWlub3IgYXMgYSBOdW1iZXIsIGlmIE1pbm9yIGlzbid0IGF2YWlsYWJsZSwgdGhlbiBvbmx5IE1ham9yIGlzIHJldHVybmVkXHJcbiAgdmFyIG1hdGNoID0gdmpzLlVTRVJfQUdFTlQubWF0Y2goL0FuZHJvaWQgKFxcZCspKD86XFwuKFxcZCspKT8oPzpcXC4oXFxkKykpKi9pKSxcclxuICAgIG1ham9yLFxyXG4gICAgbWlub3I7XHJcblxyXG4gIGlmICghbWF0Y2gpIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxuXHJcbiAgbWFqb3IgPSBtYXRjaFsxXSAmJiBwYXJzZUZsb2F0KG1hdGNoWzFdKTtcclxuICBtaW5vciA9IG1hdGNoWzJdICYmIHBhcnNlRmxvYXQobWF0Y2hbMl0pO1xyXG5cclxuICBpZiAobWFqb3IgJiYgbWlub3IpIHtcclxuICAgIHJldHVybiBwYXJzZUZsb2F0KG1hdGNoWzFdICsgJy4nICsgbWF0Y2hbMl0pO1xyXG4gIH0gZWxzZSBpZiAobWFqb3IpIHtcclxuICAgIHJldHVybiBtYWpvcjtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG59KSgpO1xyXG4vLyBPbGQgQW5kcm9pZCBpcyBkZWZpbmVkIGFzIFZlcnNpb24gb2xkZXIgdGhhbiAyLjMsIGFuZCByZXF1aXJpbmcgYSB3ZWJraXQgdmVyc2lvbiBvZiB0aGUgYW5kcm9pZCBicm93c2VyXHJcbnZqcy5JU19PTERfQU5EUk9JRCA9IHZqcy5JU19BTkRST0lEICYmICgvd2Via2l0L2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpICYmIHZqcy5BTkRST0lEX1ZFUlNJT04gPCAyLjM7XHJcblxyXG52anMuSVNfRklSRUZPWCA9ICgvRmlyZWZveC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxudmpzLklTX0NIUk9NRSA9ICgvQ2hyb21lL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG5cclxudmpzLlRPVUNIX0VOQUJMRUQgPSAhISgoJ29udG91Y2hzdGFydCcgaW4gd2luZG93KSB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gZWxlbWVudCdzIGF0dHJpYnV0ZSB2YWx1ZXMsIGFzIGRlZmluZWQgb24gdGhlIEhUTUwgdGFnXHJcbiAqIEF0dHJpYnV0cyBhcmUgbm90IHRoZSBzYW1lIGFzIHByb3BlcnRpZXMuIFRoZXkncmUgZGVmaW5lZCBvbiB0aGUgdGFnXHJcbiAqIG9yIHdpdGggc2V0QXR0cmlidXRlICh3aGljaCBzaG91bGRuJ3QgYmUgdXNlZCB3aXRoIEhUTUwpXHJcbiAqIFRoaXMgd2lsbCByZXR1cm4gdHJ1ZSBvciBmYWxzZSBmb3IgYm9vbGVhbiBhdHRyaWJ1dGVzLlxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSB0YWcgRWxlbWVudCBmcm9tIHdoaWNoIHRvIGdldCB0YWcgYXR0cmlidXRlc1xyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ2V0QXR0cmlidXRlVmFsdWVzID0gZnVuY3Rpb24odGFnKXtcclxuICB2YXIgb2JqLCBrbm93bkJvb2xlYW5zLCBhdHRycywgYXR0ck5hbWUsIGF0dHJWYWw7XHJcblxyXG4gIG9iaiA9IHt9O1xyXG5cclxuICAvLyBrbm93biBib29sZWFuIGF0dHJpYnV0ZXNcclxuICAvLyB3ZSBjYW4gY2hlY2sgZm9yIG1hdGNoaW5nIGJvb2xlYW4gcHJvcGVydGllcywgYnV0IG9sZGVyIGJyb3dzZXJzXHJcbiAgLy8gd29uJ3Qga25vdyBhYm91dCBIVE1MNSBib29sZWFuIGF0dHJpYnV0ZXMgdGhhdCB3ZSBzdGlsbCByZWFkIGZyb21cclxuICBrbm93bkJvb2xlYW5zID0gJywnKydhdXRvcGxheSxjb250cm9scyxsb29wLG11dGVkLGRlZmF1bHQnKycsJztcclxuXHJcbiAgaWYgKHRhZyAmJiB0YWcuYXR0cmlidXRlcyAmJiB0YWcuYXR0cmlidXRlcy5sZW5ndGggPiAwKSB7XHJcbiAgICBhdHRycyA9IHRhZy5hdHRyaWJ1dGVzO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBhdHRyTmFtZSA9IGF0dHJzW2ldLm5hbWU7XHJcbiAgICAgIGF0dHJWYWwgPSBhdHRyc1tpXS52YWx1ZTtcclxuXHJcbiAgICAgIC8vIGNoZWNrIGZvciBrbm93biBib29sZWFuc1xyXG4gICAgICAvLyB0aGUgbWF0Y2hpbmcgZWxlbWVudCBwcm9wZXJ0eSB3aWxsIHJldHVybiBhIHZhbHVlIGZvciB0eXBlb2ZcclxuICAgICAgaWYgKHR5cGVvZiB0YWdbYXR0ck5hbWVdID09PSAnYm9vbGVhbicgfHwga25vd25Cb29sZWFucy5pbmRleE9mKCcsJythdHRyTmFtZSsnLCcpICE9PSAtMSkge1xyXG4gICAgICAgIC8vIHRoZSB2YWx1ZSBvZiBhbiBpbmNsdWRlZCBib29sZWFuIGF0dHJpYnV0ZSBpcyB0eXBpY2FsbHkgYW4gZW1wdHlcclxuICAgICAgICAvLyBzdHJpbmcgKCcnKSB3aGljaCB3b3VsZCBlcXVhbCBmYWxzZSBpZiB3ZSBqdXN0IGNoZWNrIGZvciBhIGZhbHNlIHZhbHVlLlxyXG4gICAgICAgIC8vIHdlIGFsc28gZG9uJ3Qgd2FudCBzdXBwb3J0IGJhZCBjb2RlIGxpa2UgYXV0b3BsYXk9J2ZhbHNlJ1xyXG4gICAgICAgIGF0dHJWYWwgPSAoYXR0clZhbCAhPT0gbnVsbCkgPyB0cnVlIDogZmFsc2U7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIG9ialthdHRyTmFtZV0gPSBhdHRyVmFsO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvbXB1dGVkIHN0eWxlIHZhbHVlIGZvciBhbiBlbGVtZW50XHJcbiAqIEZyb20gaHR0cDovL3JvYmVydG55bWFuLmNvbS8yMDA2LzA0LzI0L2dldC10aGUtcmVuZGVyZWQtc3R5bGUtb2YtYW4tZWxlbWVudC9cclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgICAgICAgIEVsZW1lbnQgdG8gZ2V0IHN0eWxlIHZhbHVlIGZvclxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0ckNzc1J1bGUgU3R5bGUgbmFtZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgICAgU3R5bGUgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5nZXRDb21wdXRlZERpbWVuc2lvbiA9IGZ1bmN0aW9uKGVsLCBzdHJDc3NSdWxlKXtcclxuICB2YXIgc3RyVmFsdWUgPSAnJztcclxuICBpZihkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKXtcclxuICAgIHN0clZhbHVlID0gZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgJycpLmdldFByb3BlcnR5VmFsdWUoc3RyQ3NzUnVsZSk7XHJcblxyXG4gIH0gZWxzZSBpZihlbC5jdXJyZW50U3R5bGUpe1xyXG4gICAgLy8gSUU4IFdpZHRoL0hlaWdodCBzdXBwb3J0XHJcbiAgICBzdHJWYWx1ZSA9IGVsWydjbGllbnQnK3N0ckNzc1J1bGUuc3Vic3RyKDAsMSkudG9VcHBlckNhc2UoKSArIHN0ckNzc1J1bGUuc3Vic3RyKDEpXSArICdweCc7XHJcbiAgfVxyXG4gIHJldHVybiBzdHJWYWx1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBJbnNlcnQgYW4gZWxlbWVudCBhcyB0aGUgZmlyc3QgY2hpbGQgbm9kZSBvZiBhbm90aGVyXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGNoaWxkICAgRWxlbWVudCB0byBpbnNlcnRcclxuICogQHBhcmFtICB7W3R5cGVdfSBwYXJlbnQgRWxlbWVudCB0byBpbnNlcnQgY2hpbGQgaW50b1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmluc2VydEZpcnN0ID0gZnVuY3Rpb24oY2hpbGQsIHBhcmVudCl7XHJcbiAgaWYgKHBhcmVudC5maXJzdENoaWxkKSB7XHJcbiAgICBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBwYXJlbnQuZmlyc3RDaGlsZCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCB0byBob2xkIGJyb3dzZXIgc3VwcG9ydCBpbmZvcm1hdGlvblxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnN1cHBvcnQgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBTaG9ydGhhbmQgZm9yIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKClcclxuICogQWxzbyBhbGxvd3MgZm9yIENTUyAoalF1ZXJ5KSBJRCBzeW50YXguIEJ1dCBub3RoaW5nIG90aGVyIHRoYW4gSURzLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGlkICBFbGVtZW50IElEXHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9ICAgIEVsZW1lbnQgd2l0aCBzdXBwbGllZCBJRFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmVsID0gZnVuY3Rpb24oaWQpe1xyXG4gIGlmIChpZC5pbmRleE9mKCcjJykgPT09IDApIHtcclxuICAgIGlkID0gaWQuc2xpY2UoMSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZvcm1hdCBzZWNvbmRzIGFzIGEgdGltZSBzdHJpbmcsIEg6TU06U1Mgb3IgTTpTU1xyXG4gKiBTdXBwbHlpbmcgYSBndWlkZSAoaW4gc2Vjb25kcykgd2lsbCBmb3JjZSBhIG51bWJlciBvZiBsZWFkaW5nIHplcm9zXHJcbiAqIHRvIGNvdmVyIHRoZSBsZW5ndGggb2YgdGhlIGd1aWRlXHJcbiAqIEBwYXJhbSAge051bWJlcn0gc2Vjb25kcyBOdW1iZXIgb2Ygc2Vjb25kcyB0byBiZSB0dXJuZWQgaW50byBhIHN0cmluZ1xyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGd1aWRlICAgTnVtYmVyIChpbiBzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nIGFmdGVyXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICBUaW1lIGZvcm1hdHRlZCBhcyBIOk1NOlNTIG9yIE06U1NcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5mb3JtYXRUaW1lID0gZnVuY3Rpb24oc2Vjb25kcywgZ3VpZGUpIHtcclxuICAvLyBEZWZhdWx0IHRvIHVzaW5nIHNlY29uZHMgYXMgZ3VpZGVcclxuICBndWlkZSA9IGd1aWRlIHx8IHNlY29uZHM7XHJcbiAgdmFyIHMgPSBNYXRoLmZsb29yKHNlY29uZHMgJSA2MCksXHJcbiAgICAgIG0gPSBNYXRoLmZsb29yKHNlY29uZHMgLyA2MCAlIDYwKSxcclxuICAgICAgaCA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDM2MDApLFxyXG4gICAgICBnbSA9IE1hdGguZmxvb3IoZ3VpZGUgLyA2MCAlIDYwKSxcclxuICAgICAgZ2ggPSBNYXRoLmZsb29yKGd1aWRlIC8gMzYwMCk7XHJcblxyXG4gIC8vIGhhbmRsZSBpbnZhbGlkIHRpbWVzXHJcbiAgaWYgKGlzTmFOKHNlY29uZHMpIHx8IHNlY29uZHMgPT09IEluZmluaXR5KSB7XHJcbiAgICAvLyAnLScgaXMgZmFsc2UgZm9yIGFsbCByZWxhdGlvbmFsIG9wZXJhdG9ycyAoZS5nLiA8LCA+PSkgc28gdGhpcyBzZXR0aW5nXHJcbiAgICAvLyB3aWxsIGFkZCB0aGUgbWluaW11bSBudW1iZXIgb2YgZmllbGRzIHNwZWNpZmllZCBieSB0aGUgZ3VpZGVcclxuICAgIGggPSBtID0gcyA9ICctJztcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBob3Vyc1xyXG4gIGggPSAoaCA+IDAgfHwgZ2ggPiAwKSA/IGggKyAnOicgOiAnJztcclxuXHJcbiAgLy8gSWYgaG91cnMgYXJlIHNob3dpbmcsIHdlIG1heSBuZWVkIHRvIGFkZCBhIGxlYWRpbmcgemVyby5cclxuICAvLyBBbHdheXMgc2hvdyBhdCBsZWFzdCBvbmUgZGlnaXQgb2YgbWludXRlcy5cclxuICBtID0gKCgoaCB8fCBnbSA+PSAxMCkgJiYgbSA8IDEwKSA/ICcwJyArIG0gOiBtKSArICc6JztcclxuXHJcbiAgLy8gQ2hlY2sgaWYgbGVhZGluZyB6ZXJvIGlzIG5lZWQgZm9yIHNlY29uZHNcclxuICBzID0gKHMgPCAxMCkgPyAnMCcgKyBzIDogcztcclxuXHJcbiAgcmV0dXJuIGggKyBtICsgcztcclxufTtcclxuXHJcbi8vIEF0dGVtcHQgdG8gYmxvY2sgdGhlIGFiaWxpdHkgdG8gc2VsZWN0IHRleHQgd2hpbGUgZHJhZ2dpbmcgY29udHJvbHNcclxudmpzLmJsb2NrVGV4dFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgZG9jdW1lbnQuYm9keS5mb2N1cygpO1xyXG4gIGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiBmYWxzZTsgfTtcclxufTtcclxuLy8gVHVybiBvZmYgdGV4dCBzZWxlY3Rpb24gYmxvY2tpbmdcclxudmpzLnVuYmxvY2tUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24oKXsgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRydWU7IH07IH07XHJcblxyXG4vKipcclxuICogVHJpbSB3aGl0ZXNwYWNlIGZyb20gdGhlIGVuZHMgb2YgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyaW5nIFN0cmluZyB0byB0cmltXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgIFRyaW1tZWQgc3RyaW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMudHJpbSA9IGZ1bmN0aW9uKHN0cil7XHJcbiAgcmV0dXJuIChzdHIrJycpLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaG91bGQgcm91bmQgb2ZmIGEgbnVtYmVyIHRvIGEgZGVjaW1hbCBwbGFjZVxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IG51bSBOdW1iZXIgdG8gcm91bmRcclxuICogQHBhcmFtICB7TnVtYmVyfSBkZWMgTnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzIHRvIHJvdW5kIHRvXHJcbiAqIEByZXR1cm4ge051bWJlcn0gICAgIFJvdW5kZWQgbnVtYmVyXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMucm91bmQgPSBmdW5jdGlvbihudW0sIGRlYykge1xyXG4gIGlmICghZGVjKSB7IGRlYyA9IDA7IH1cclxuICByZXR1cm4gTWF0aC5yb3VuZChudW0qTWF0aC5wb3coMTAsZGVjKSkvTWF0aC5wb3coMTAsZGVjKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaG91bGQgY3JlYXRlIGEgZmFrZSBUaW1lUmFuZ2Ugb2JqZWN0XHJcbiAqIE1pbWljcyBhbiBIVE1MNSB0aW1lIHJhbmdlIGluc3RhbmNlLCB3aGljaCBoYXMgZnVuY3Rpb25zIHRoYXRcclxuICogcmV0dXJuIHRoZSBzdGFydCBhbmQgZW5kIHRpbWVzIGZvciBhIHJhbmdlXHJcbiAqIFRpbWVSYW5nZXMgYXJlIHJldHVybmVkIGJ5IHRoZSBidWZmZXJlZCgpIG1ldGhvZFxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHN0YXJ0IFN0YXJ0IHRpbWUgaW4gc2Vjb25kc1xyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGVuZCAgIEVuZCB0aW1lIGluIHNlY29uZHNcclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgICBGYWtlIFRpbWVSYW5nZSBvYmplY3RcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5jcmVhdGVUaW1lUmFuZ2UgPSBmdW5jdGlvbihzdGFydCwgZW5kKXtcclxuICByZXR1cm4ge1xyXG4gICAgbGVuZ3RoOiAxLFxyXG4gICAgc3RhcnQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3RhcnQ7IH0sXHJcbiAgICBlbmQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZW5kOyB9XHJcbiAgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaW1wbGUgaHR0cCByZXF1ZXN0IGZvciByZXRyaWV2aW5nIGV4dGVybmFsIGZpbGVzIChlLmcuIHRleHQgdHJhY2tzKVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHVybCAgICAgICAgICAgVVJMIG9mIHJlc291cmNlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9uPX0gb25TdWNjZXNzICBTdWNjZXNzIGNhbGxiYWNrXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9uPX0gb25FcnJvciAgICBFcnJvciBjYWxsYmFja1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmdldCA9IGZ1bmN0aW9uKHVybCwgb25TdWNjZXNzLCBvbkVycm9yKXtcclxuICB2YXIgbG9jYWwsIHJlcXVlc3Q7XHJcblxyXG4gIGlmICh0eXBlb2YgWE1MSHR0cFJlcXVlc3QgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRyeSB7IHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoIChlKSB7fVxyXG4gICAgICB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaCAoZikge31cclxuICAgICAgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaCAoZykge31cclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBYTUxIdHRwUmVxdWVzdC4nKTtcclxuICAgIH07XHJcbiAgfVxyXG5cclxuICByZXF1ZXN0ID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgdHJ5IHtcclxuICAgIHJlcXVlc3Qub3BlbignR0VUJywgdXJsKTtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIG9uRXJyb3IoZSk7XHJcbiAgfVxyXG5cclxuICBsb2NhbCA9ICh1cmwuaW5kZXhPZignZmlsZTonKSA9PT0gMCB8fCAod2luZG93LmxvY2F0aW9uLmhyZWYuaW5kZXhPZignZmlsZTonKSA9PT0gMCAmJiB1cmwuaW5kZXhPZignaHR0cCcpID09PSAtMSkpO1xyXG5cclxuICByZXF1ZXN0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKHJlcXVlc3QucmVhZHlTdGF0ZSA9PT0gNCkge1xyXG4gICAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCB8fCBsb2NhbCAmJiByZXF1ZXN0LnN0YXR1cyA9PT0gMCkge1xyXG4gICAgICAgIG9uU3VjY2VzcyhyZXF1ZXN0LnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgICAgIG9uRXJyb3IoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG5cclxuICB0cnkge1xyXG4gICAgcmVxdWVzdC5zZW5kKCk7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICBpZiAob25FcnJvcikge1xyXG4gICAgICBvbkVycm9yKGUpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgdG8gbG9jYWwgc3RvcmFnZSAobWF5IHJlbW92ZWFibGUpXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuc2V0TG9jYWxTdG9yYWdlID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XHJcbiAgdHJ5IHtcclxuICAgIC8vIElFIHdhcyB0aHJvd2luZyBlcnJvcnMgcmVmZXJlbmNpbmcgdGhlIHZhciBhbnl3aGVyZSB3aXRob3V0IHRoaXNcclxuICAgIHZhciBsb2NhbFN0b3JhZ2UgPSB3aW5kb3cubG9jYWxTdG9yYWdlIHx8IGZhbHNlO1xyXG4gICAgaWYgKCFsb2NhbFN0b3JhZ2UpIHsgcmV0dXJuOyB9XHJcbiAgICBsb2NhbFN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgaWYgKGUuY29kZSA9PSAyMiB8fCBlLmNvZGUgPT0gMTAxNCkgeyAvLyBXZWJraXQgPT0gMjIgLyBGaXJlZm94ID09IDEwMTRcclxuICAgICAgdmpzLmxvZygnTG9jYWxTdG9yYWdlIEZ1bGwgKFZpZGVvSlMpJywgZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoZS5jb2RlID09IDE4KSB7XHJcbiAgICAgICAgdmpzLmxvZygnTG9jYWxTdG9yYWdlIG5vdCBhbGxvd2VkIChWaWRlb0pTKScsIGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBFcnJvciAoVmlkZW9KUyknLCBlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgYWJvc29sdXRlIHZlcnNpb24gb2YgcmVsYXRpdmUgVVJMLiBVc2VkIHRvIHRlbGwgZmxhc2ggY29ycmVjdCBVUkwuXHJcbiAqIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNDcwODMyL2dldHRpbmctYW4tYWJzb2x1dGUtdXJsLWZyb20tYS1yZWxhdGl2ZS1vbmUtaWU2LWlzc3VlXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdXJsIFVSTCB0byBtYWtlIGFic29sdXRlXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgIEFic29sdXRlIFVSTFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmdldEFic29sdXRlVVJMID0gZnVuY3Rpb24odXJsKXtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYWJzb2x1dGUgVVJMXHJcbiAgaWYgKCF1cmwubWF0Y2goL15odHRwcz86XFwvXFwvLykpIHtcclxuICAgIC8vIENvbnZlcnQgdG8gYWJzb2x1dGUgVVJMLiBGbGFzaCBob3N0ZWQgb2ZmLXNpdGUgbmVlZHMgYW4gYWJzb2x1dGUgVVJMLlxyXG4gICAgdXJsID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICAgIGlubmVySFRNTDogJzxhIGhyZWY9XCInK3VybCsnXCI+eDwvYT4nXHJcbiAgICB9KS5maXJzdENoaWxkLmhyZWY7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdXJsO1xyXG59O1xyXG5cclxuLy8gdXNhZ2U6IGxvZygnaW5zaWRlIGNvb2xGdW5jJyx0aGlzLGFyZ3VtZW50cyk7XHJcbi8vIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMDkvbG9nLWEtbGlnaHR3ZWlnaHQtd3JhcHBlci1mb3ItY29uc29sZWxvZy9cclxudmpzLmxvZyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLmxvZy5oaXN0b3J5ID0gdmpzLmxvZy5oaXN0b3J5IHx8IFtdOyAgIC8vIHN0b3JlIGxvZ3MgdG8gYW4gYXJyYXkgZm9yIHJlZmVyZW5jZVxyXG4gIHZqcy5sb2cuaGlzdG9yeS5wdXNoKGFyZ3VtZW50cyk7XHJcbiAgaWYod2luZG93LmNvbnNvbGUpe1xyXG4gICAgd2luZG93LmNvbnNvbGUubG9nKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIE9mZnNldCBMZWZ0XHJcbi8vIGdldEJvdW5kaW5nQ2xpZW50UmVjdCB0ZWNobmlxdWUgZnJvbSBKb2huIFJlc2lnIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9nZXRib3VuZGluZ2NsaWVudHJlY3QtaXMtYXdlc29tZS9cclxudmpzLmZpbmRQb3NpdGlvbiA9IGZ1bmN0aW9uKGVsKSB7XHJcbiAgICB2YXIgYm94LCBkb2NFbCwgYm9keSwgY2xpZW50TGVmdCwgc2Nyb2xsTGVmdCwgbGVmdCwgY2xpZW50VG9wLCBzY3JvbGxUb3AsIHRvcDtcclxuXHJcbiAgICBpZiAoZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0ICYmIGVsLnBhcmVudE5vZGUpIHtcclxuICAgICAgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFib3gpIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgIHRvcDogMFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xyXG4gICAgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgY2xpZW50TGVmdCA9IGRvY0VsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XHJcbiAgICBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcclxuICAgIGxlZnQgPSBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0O1xyXG5cclxuICAgIGNsaWVudFRvcCA9IGRvY0VsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xyXG4gICAgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGJvZHkuc2Nyb2xsVG9wO1xyXG4gICAgdG9wID0gYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcDtcclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBsZWZ0OiBsZWZ0LFxyXG4gICAgICB0b3A6IHRvcFxyXG4gICAgfTtcclxufTtcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgUGxheWVyIENvbXBvbmVudCAtIEJhc2UgY2xhc3MgZm9yIGFsbCBVSSBvYmplY3RzXHJcbiAqXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEJhc2UgVUkgQ29tcG9uZW50IGNsYXNzXHJcbiAqXHJcbiAqIENvbXBvbmVudHMgYXJlIGVtYmVkZGFibGUgVUkgb2JqZWN0cyB0aGF0IGFyZSByZXByZXNlbnRlZCBieSBib3RoIGFcclxuICogamF2YXNjcmlwdCBvYmplY3QgYW5kIGFuIGVsZW1lbnQgaW4gdGhlIERPTS4gVGhleSBjYW4gYmUgY2hpbGRyZW4gb2Ygb3RoZXJcclxuICogY29tcG9uZW50cywgYW5kIGNhbiBoYXZlIG1hbnkgY2hpbGRyZW4gdGhlbXNlbHZlcy5cclxuICpcclxuICogICAgIC8vIGFkZGluZyBhIGJ1dHRvbiB0byB0aGUgcGxheWVyXHJcbiAqICAgICB2YXIgYnV0dG9uID0gcGxheWVyLmFkZENoaWxkKCdidXR0b24nKTtcclxuICogICAgIGJ1dHRvbi5lbCgpOyAvLyAtPiBidXR0b24gZWxlbWVudFxyXG4gKlxyXG4gKiAgICAgPGRpdiBjbGFzcz1cInZpZGVvLWpzXCI+XHJcbiAqICAgICAgIDxkaXYgY2xhc3M9XCJ2anMtYnV0dG9uXCI+QnV0dG9uPC9kaXY+XHJcbiAqICAgICA8L2Rpdj5cclxuICpcclxuICogQ29tcG9uZW50cyBhcmUgYWxzbyBldmVudCBlbWl0dGVycy5cclxuICpcclxuICogICAgIGJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gKiAgICAgICAvL2NvbnNvbGUubG9nKCdCdXR0b24gQ2xpY2tlZCEnKTtcclxuICogICAgIH0pO1xyXG4gKlxyXG4gKiAgICAgYnV0dG9uLnRyaWdnZXIoJ2N1c3RvbWV2ZW50Jyk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwbGF5ZXIgIE1haW4gUGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIHZqcy5Db3JlT2JqZWN0XHJcbiAqL1xyXG52anMuQ29tcG9uZW50ID0gdmpzLkNvcmVPYmplY3QuZXh0ZW5kKHtcclxuICAvKipcclxuICAgKiB0aGUgY29uc3RydWN0b3IgZnVuY2l0b24gZm9yIHRoZSBjbGFzc1xyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB0aGlzLnBsYXllcl8gPSBwbGF5ZXI7XHJcblxyXG4gICAgLy8gTWFrZSBhIGNvcHkgb2YgcHJvdG90eXBlLm9wdGlvbnNfIHRvIHByb3RlY3QgYWdhaW5zdCBvdmVycmlkaW5nIGdsb2JhbCBkZWZhdWx0c1xyXG4gICAgdGhpcy5vcHRpb25zXyA9IHZqcy5vYmouY29weSh0aGlzLm9wdGlvbnNfKTtcclxuXHJcbiAgICAvLyBVcGRhdGVkIG9wdGlvbnMgd2l0aCBzdXBwbGllZCBvcHRpb25zXHJcbiAgICBvcHRpb25zID0gdGhpcy5vcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIEdldCBJRCBmcm9tIG9wdGlvbnMsIGVsZW1lbnQsIG9yIGNyZWF0ZSB1c2luZyBwbGF5ZXIgSUQgYW5kIHVuaXF1ZSBJRFxyXG4gICAgdGhpcy5pZF8gPSBvcHRpb25zWydpZCddIHx8ICgob3B0aW9uc1snZWwnXSAmJiBvcHRpb25zWydlbCddWydpZCddKSA/IG9wdGlvbnNbJ2VsJ11bJ2lkJ10gOiBwbGF5ZXIuaWQoKSArICdfY29tcG9uZW50XycgKyB2anMuZ3VpZCsrICk7XHJcblxyXG4gICAgdGhpcy5uYW1lXyA9IG9wdGlvbnNbJ25hbWUnXSB8fCBudWxsO1xyXG5cclxuICAgIC8vIENyZWF0ZSBlbGVtZW50IGlmIG9uZSB3YXNuJ3QgcHJvdmlkZWQgaW4gb3B0aW9uc1xyXG4gICAgdGhpcy5lbF8gPSBvcHRpb25zWydlbCddIHx8IHRoaXMuY3JlYXRlRWwoKTtcclxuXHJcbiAgICB0aGlzLmNoaWxkcmVuXyA9IFtdO1xyXG4gICAgdGhpcy5jaGlsZEluZGV4XyA9IHt9O1xyXG4gICAgdGhpcy5jaGlsZE5hbWVJbmRleF8gPSB7fTtcclxuXHJcbiAgICAvLyBBZGQgYW55IGNoaWxkIGNvbXBvbmVudHMgaW4gb3B0aW9uc1xyXG4gICAgdGhpcy5pbml0Q2hpbGRyZW4oKTtcclxuXHJcbiAgICB0aGlzLnJlYWR5KHJlYWR5KTtcclxuICAgIC8vIERvbid0IHdhbnQgdG8gdHJpZ2dlciByZWFkeSBoZXJlIG9yIGl0IHdpbGwgYmVmb3JlIGluaXQgaXMgYWN0dWFsbHlcclxuICAgIC8vIGZpbmlzaGVkIGZvciBhbGwgY2hpbGRyZW4gdGhhdCBydW4gdGhpcyBjb25zdHJ1Y3RvclxyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogRGlzcG9zZSBvZiB0aGUgY29tcG9uZW50IGFuZCBhbGwgY2hpbGQgY29tcG9uZW50c1xyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50cmlnZ2VyKCdkaXNwb3NlJyk7XHJcblxyXG4gIC8vIERpc3Bvc2UgYWxsIGNoaWxkcmVuLlxyXG4gIGlmICh0aGlzLmNoaWxkcmVuXykge1xyXG4gICAgZm9yICh2YXIgaSA9IHRoaXMuY2hpbGRyZW5fLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGlmICh0aGlzLmNoaWxkcmVuX1tpXS5kaXNwb3NlKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbl9baV0uZGlzcG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBEZWxldGUgY2hpbGQgcmVmZXJlbmNlc1xyXG4gIHRoaXMuY2hpbGRyZW5fID0gbnVsbDtcclxuICB0aGlzLmNoaWxkSW5kZXhfID0gbnVsbDtcclxuICB0aGlzLmNoaWxkTmFtZUluZGV4XyA9IG51bGw7XHJcblxyXG4gIC8vIFJlbW92ZSBhbGwgZXZlbnQgbGlzdGVuZXJzLlxyXG4gIHRoaXMub2ZmKCk7XHJcblxyXG4gIC8vIFJlbW92ZSBlbGVtZW50IGZyb20gRE9NXHJcbiAgaWYgKHRoaXMuZWxfLnBhcmVudE5vZGUpIHtcclxuICAgIHRoaXMuZWxfLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5lbF8pO1xyXG4gIH1cclxuXHJcbiAgdmpzLnJlbW92ZURhdGEodGhpcy5lbF8pO1xyXG4gIHRoaXMuZWxfID0gbnVsbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWZlcmVuY2UgdG8gbWFpbiBwbGF5ZXIgaW5zdGFuY2VcclxuICpcclxuICogQHR5cGUge3Zqcy5QbGF5ZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5wbGF5ZXJfID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIGNvbXBvbmVudCdzIHBsYXllclxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucGxheWVyID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5wbGF5ZXJfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjb21wb25lbnQncyBvcHRpb25zIG9iamVjdFxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub3B0aW9uc187XHJcblxyXG4vKipcclxuICogRGVlcCBtZXJnZSBvZiBvcHRpb25zIG9iamVjdHNcclxuICpcclxuICogV2hlbmV2ZXIgYSBwcm9wZXJ0eSBpcyBhbiBvYmplY3Qgb24gYm90aCBvcHRpb25zIG9iamVjdHNcclxuICogdGhlIHR3byBwcm9wZXJ0aWVzIHdpbGwgYmUgbWVyZ2VkIHVzaW5nIHZqcy5vYmouZGVlcE1lcmdlLlxyXG4gKlxyXG4gKiBUaGlzIGlzIHVzZWQgZm9yIG1lcmdpbmcgb3B0aW9ucyBmb3IgY2hpbGQgY29tcG9uZW50cy4gV2VcclxuICogd2FudCBpdCB0byBiZSBlYXN5IHRvIG92ZXJyaWRlIGluZGl2aWR1YWwgb3B0aW9ucyBvbiBhIGNoaWxkXHJcbiAqIGNvbXBvbmVudCB3aXRob3V0IGhhdmluZyB0byByZXdyaXRlIGFsbCB0aGUgb3RoZXIgZGVmYXVsdCBvcHRpb25zLlxyXG4gKlxyXG4gKiAgICAgUGFyZW50LnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICogICAgICAgY2hpbGRyZW46IHtcclxuICogICAgICAgICAnY2hpbGRPbmUnOiB7ICdmb28nOiAnYmFyJywgJ2FzZGYnOiAnZmRzYScgfSxcclxuICogICAgICAgICAnY2hpbGRUd28nOiB7fSxcclxuICogICAgICAgICAnY2hpbGRUaHJlZSc6IHt9XHJcbiAqICAgICAgIH1cclxuICogICAgIH1cclxuICogICAgIG5ld09wdGlvbnMgPSB7XHJcbiAqICAgICAgIGNoaWxkcmVuOiB7XHJcbiAqICAgICAgICAgJ2NoaWxkT25lJzogeyAnZm9vJzogJ2JheicsICdhYmMnOiAnMTIzJyB9XHJcbiAqICAgICAgICAgJ2NoaWxkVHdvJzogbnVsbCxcclxuICogICAgICAgICAnY2hpbGRGb3VyJzoge31cclxuICogICAgICAgfVxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiAgICAgdGhpcy5vcHRpb25zKG5ld09wdGlvbnMpO1xyXG4gKlxyXG4gKiBSRVNVTFRcclxuICpcclxuICogICAgIHtcclxuICogICAgICAgY2hpbGRyZW46IHtcclxuICogICAgICAgICAnY2hpbGRPbmUnOiB7ICdmb28nOiAnYmF6JywgJ2FzZGYnOiAnZmRzYScsICdhYmMnOiAnMTIzJyB9LFxyXG4gKiAgICAgICAgICdjaGlsZFR3byc6IG51bGwsIC8vIERpc2FibGVkLiBXb24ndCBiZSBpbml0aWFsaXplZC5cclxuICogICAgICAgICAnY2hpbGRUaHJlZSc6IHt9LFxyXG4gKiAgICAgICAgICdjaGlsZEZvdXInOiB7fVxyXG4gKiAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqIE9iamVjdCB3aG9zZSB2YWx1ZXMgd2lsbCBiZSBvdmVyd3JpdHRlblxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICBORVcgbWVyZ2VkIG9iamVjdC4gRG9lcyBub3QgcmV0dXJuIG9iajEuXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vcHRpb25zID0gZnVuY3Rpb24ob2JqKXtcclxuICBpZiAob2JqID09PSB1bmRlZmluZWQpIHJldHVybiB0aGlzLm9wdGlvbnNfO1xyXG5cclxuICByZXR1cm4gdGhpcy5vcHRpb25zXyA9IHZqcy5vYmouZGVlcE1lcmdlKHRoaXMub3B0aW9uc18sIG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIERPTSBlbGVtZW50IGZvciB0aGUgY29tcG9uZW50XHJcbiAqXHJcbiAqIEB0eXBlIHtFbGVtZW50fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZWxfO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSB0aGUgY29tcG9uZW50J3MgRE9NIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nPX0gdGFnTmFtZSAgRWxlbWVudCdzIG5vZGUgdHlwZS4gZS5nLiAnZGl2J1xyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBhdHRyaWJ1dGVzIEFuIG9iamVjdCBvZiBlbGVtZW50IGF0dHJpYnV0ZXMgdGhhdCBzaG91bGQgYmUgc2V0IG9uIHRoZSBlbGVtZW50XHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHRhZ05hbWUsIGF0dHJpYnV0ZXMpe1xyXG4gIHJldHVybiB2anMuY3JlYXRlRWwodGFnTmFtZSwgYXR0cmlidXRlcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb21wb25lbnQncyBET00gZWxlbWVudFxyXG4gKlxyXG4gKiAgICAgdmFyIGRvbUVsID0gbXlDb21wb25lbnQuZWwoKTtcclxuICpcclxuICogQHJldHVybiB7RWxlbWVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5lbF87XHJcbn07XHJcblxyXG4vKipcclxuICogQW4gb3B0aW9uYWwgZWxlbWVudCB3aGVyZSwgaWYgZGVmaW5lZCwgY2hpbGRyZW4gd2lsbCBiZSBpbnNlcnRlZCBpbnN0ZWFkIG9mXHJcbiAqIGRpcmVjdGx5IGluIGBlbF9gXHJcbiAqXHJcbiAqIEB0eXBlIHtFbGVtZW50fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY29udGVudEVsXztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIGNvbXBvbmVudCdzIERPTSBlbGVtZW50IGZvciBlbWJlZGRpbmcgY29udGVudC5cclxuICogV2lsbCBlaXRoZXIgYmUgZWxfIG9yIGEgbmV3IGVsZW1lbnQgZGVmaW5lZCBpbiBjcmVhdGVFbC5cclxuICpcclxuICogQHJldHVybiB7RWxlbWVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNvbnRlbnRFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY29udGVudEVsXyB8fCB0aGlzLmVsXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgSUQgZm9yIHRoZSBjb21wb25lbnRcclxuICpcclxuICogQHR5cGUge1N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlkXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvbXBvbmVudCdzIElEXHJcbiAqXHJcbiAqICAgICB2YXIgaWQgPSBteUNvbXBvbmVudC5pZCgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pZCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuaWRfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBuYW1lIGZvciB0aGUgY29tcG9uZW50LiBPZnRlbiB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUubmFtZV87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb21wb25lbnQncyBuYW1lLiBUaGUgbmFtZSBpcyBvZnRlbiB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgY29tcG9uZW50LlxyXG4gKlxyXG4gKiAgICAgdmFyIG5hbWUgPSBteUNvbXBvbmVudC5uYW1lKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLm5hbWVfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFycmF5IG9mIGNoaWxkIGNvbXBvbmVudHNcclxuICpcclxuICogQHR5cGUge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY2hpbGRyZW5fO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhcnJheSBvZiBhbGwgY2hpbGQgY29tcG9uZW50c1xyXG4gKlxyXG4gKiAgICAgdmFyIGtpZHMgPSBteUNvbXBvbmVudC5jaGlsZHJlbigpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtBcnJheX0gVGhlIGNoaWxkcmVuXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY2hpbGRyZW5fO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCBvZiBjaGlsZCBjb21wb25lbnRzIGJ5IElEXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZEluZGV4XztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgY2hpbGQgY29tcG9uZW50IHdpdGggdGhlIHByb3ZpZGVkIElEXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5nZXRDaGlsZEJ5SWQgPSBmdW5jdGlvbihpZCl7XHJcbiAgcmV0dXJuIHRoaXMuY2hpbGRJbmRleF9baWRdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCBvZiBjaGlsZCBjb21wb25lbnRzIGJ5IG5hbWVcclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNoaWxkTmFtZUluZGV4XztcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIGEgY2hpbGQgY29tcG9uZW50IHdpdGggdGhlIHByb3ZpZGVkIElEXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5nZXRDaGlsZCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG4gIHJldHVybiB0aGlzLmNoaWxkTmFtZUluZGV4X1tuYW1lXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGEgY2hpbGQgY29tcG9uZW50IGluc2lkZSB0aGlzIGNvbXBvbmVudFxyXG4gKlxyXG4gKiAgICAgbXlDb21wb25lbnQuZWwoKTtcclxuICogICAgIC8vIC0+IDxkaXYgY2xhc3M9J215LWNvbXBvbmVudCc+PC9kaXY+XHJcbiAqICAgICBteUNvbW9uZW50LmNoaWxkcmVuKCk7XHJcbiAqICAgICAvLyBbZW1wdHkgYXJyYXldXHJcbiAqXHJcbiAqICAgICB2YXIgbXlCdXR0b24gPSBteUNvbXBvbmVudC5hZGRDaGlsZCgnTXlCdXR0b24nKTtcclxuICogICAgIC8vIC0+IDxkaXYgY2xhc3M9J215LWNvbXBvbmVudCc+PGRpdiBjbGFzcz1cIm15LWJ1dHRvblwiPm15QnV0dG9uPGRpdj48L2Rpdj5cclxuICogICAgIC8vIC0+IG15QnV0dG9uID09PSBteUNvbW9uZW50LmNoaWxkcmVuKClbMF07XHJcbiAqXHJcbiAqIFBhc3MgaW4gb3B0aW9ucyBmb3IgY2hpbGQgY29uc3RydWN0b3JzIGFuZCBvcHRpb25zIGZvciBjaGlsZHJlbiBvZiB0aGUgY2hpbGRcclxuICpcclxuICogICAgdmFyIG15QnV0dG9uID0gbXlDb21wb25lbnQuYWRkQ2hpbGQoJ015QnV0dG9uJywge1xyXG4gKiAgICAgIHRleHQ6ICdQcmVzcyBNZScsXHJcbiAqICAgICAgY2hpbGRyZW46IHtcclxuICogICAgICAgIGJ1dHRvbkNoaWxkRXhhbXBsZToge1xyXG4gKiAgICAgICAgICBidXR0b25DaGlsZE9wdGlvbjogdHJ1ZVxyXG4gKiAgICAgICAgfVxyXG4gKiAgICAgIH1cclxuICogICAgfSk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfHZqcy5Db21wb25lbnR9IGNoaWxkIFRoZSBjbGFzcyBuYW1lIG9yIGluc3RhbmNlIG9mIGEgY2hpbGQgdG8gYWRkXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyBPcHRpb25zLCBpbmNsdWRpbmcgb3B0aW9ucyB0byBiZSBwYXNzZWQgdG8gY2hpbGRyZW4gb2YgdGhlIGNoaWxkLlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBUaGUgY2hpbGQgY29tcG9uZW50IChjcmVhdGVkIGJ5IHRoaXMgcHJvY2VzcyBpZiBhIHN0cmluZyB3YXMgdXNlZClcclxuICogQHN1cHByZXNzIHthY2Nlc3NDb250cm9sc3xjaGVja1JlZ0V4cHxjaGVja1R5cGVzfGNoZWNrVmFyc3xjb25zdHxjb25zdGFudFByb3BlcnR5fGRlcHJlY2F0ZWR8ZHVwbGljYXRlfGVzNVN0cmljdHxmaWxlb3ZlcnZpZXdUYWdzfGdsb2JhbFRoaXN8aW52YWxpZENhc3RzfG1pc3NpbmdQcm9wZXJ0aWVzfG5vblN0YW5kYXJkSnNEb2NzfHN0cmljdE1vZHVsZURlcENoZWNrfHVuZGVmaW5lZE5hbWVzfHVuZGVmaW5lZFZhcnN8dW5rbm93bkRlZmluZXN8dXNlbGVzc0NvZGV8dmlzaWJpbGl0eX1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmFkZENoaWxkID0gZnVuY3Rpb24oY2hpbGQsIG9wdGlvbnMpe1xyXG4gIHZhciBjb21wb25lbnQsIGNvbXBvbmVudENsYXNzLCBjb21wb25lbnROYW1lLCBjb21wb25lbnRJZDtcclxuXHJcbiAgLy8gSWYgc3RyaW5nLCBjcmVhdGUgbmV3IGNvbXBvbmVudCB3aXRoIG9wdGlvbnNcclxuICBpZiAodHlwZW9mIGNoaWxkID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgIGNvbXBvbmVudE5hbWUgPSBjaGlsZDtcclxuXHJcbiAgICAvLyBNYWtlIHN1cmUgb3B0aW9ucyBpcyBhdCBsZWFzdCBhbiBlbXB0eSBvYmplY3QgdG8gcHJvdGVjdCBhZ2FpbnN0IGVycm9yc1xyXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gICAgLy8gQXNzdW1lIG5hbWUgb2Ygc2V0IGlzIGEgbG93ZXJjYXNlZCBuYW1lIG9mIHRoZSBVSSBDbGFzcyAoUGxheUJ1dHRvbiwgZXRjLilcclxuICAgIGNvbXBvbmVudENsYXNzID0gb3B0aW9uc1snY29tcG9uZW50Q2xhc3MnXSB8fCB2anMuY2FwaXRhbGl6ZShjb21wb25lbnROYW1lKTtcclxuXHJcbiAgICAvLyBTZXQgbmFtZSB0aHJvdWdoIG9wdGlvbnNcclxuICAgIG9wdGlvbnNbJ25hbWUnXSA9IGNvbXBvbmVudE5hbWU7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGEgbmV3IG9iamVjdCAmIGVsZW1lbnQgZm9yIHRoaXMgY29udHJvbHMgc2V0XHJcbiAgICAvLyBJZiB0aGVyZSdzIG5vIC5wbGF5ZXJfLCB0aGlzIGlzIGEgcGxheWVyXHJcbiAgICAvLyBDbG9zdXJlIENvbXBpbGVyIHRocm93cyBhbiAnaW5jb21wbGV0ZSBhbGlhcycgd2FybmluZyBpZiB3ZSB1c2UgdGhlIHZqcyB2YXJpYWJsZSBkaXJlY3RseS5cclxuICAgIC8vIEV2ZXJ5IGNsYXNzIHNob3VsZCBiZSBleHBvcnRlZCwgc28gdGhpcyBzaG91bGQgbmV2ZXIgYmUgYSBwcm9ibGVtIGhlcmUuXHJcbiAgICBjb21wb25lbnQgPSBuZXcgd2luZG93Wyd2aWRlb2pzJ11bY29tcG9uZW50Q2xhc3NdKHRoaXMucGxheWVyXyB8fCB0aGlzLCBvcHRpb25zKTtcclxuXHJcbiAgLy8gY2hpbGQgaXMgYSBjb21wb25lbnQgaW5zdGFuY2VcclxuICB9IGVsc2Uge1xyXG4gICAgY29tcG9uZW50ID0gY2hpbGQ7XHJcbiAgfVxyXG5cclxuICB0aGlzLmNoaWxkcmVuXy5wdXNoKGNvbXBvbmVudCk7XHJcblxyXG4gIGlmICh0eXBlb2YgY29tcG9uZW50LmlkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICB0aGlzLmNoaWxkSW5kZXhfW2NvbXBvbmVudC5pZCgpXSA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIC8vIElmIGEgbmFtZSB3YXNuJ3QgdXNlZCB0byBjcmVhdGUgdGhlIGNvbXBvbmVudCwgY2hlY2sgaWYgd2UgY2FuIHVzZSB0aGVcclxuICAvLyBuYW1lIGZ1bmN0aW9uIG9mIHRoZSBjb21wb25lbnRcclxuICBjb21wb25lbnROYW1lID0gY29tcG9uZW50TmFtZSB8fCAoY29tcG9uZW50Lm5hbWUgJiYgY29tcG9uZW50Lm5hbWUoKSk7XHJcblxyXG4gIGlmIChjb21wb25lbnROYW1lKSB7XHJcbiAgICB0aGlzLmNoaWxkTmFtZUluZGV4X1tjb21wb25lbnROYW1lXSA9IGNvbXBvbmVudDtcclxuICB9XHJcblxyXG4gIC8vIEFkZCB0aGUgVUkgb2JqZWN0J3MgZWxlbWVudCB0byB0aGUgY29udGFpbmVyIGRpdiAoYm94KVxyXG4gIC8vIEhhdmluZyBhbiBlbGVtZW50IGlzIG5vdCByZXF1aXJlZFxyXG4gIGlmICh0eXBlb2YgY29tcG9uZW50WydlbCddID09PSAnZnVuY3Rpb24nICYmIGNvbXBvbmVudFsnZWwnXSgpKSB7XHJcbiAgICB0aGlzLmNvbnRlbnRFbCgpLmFwcGVuZENoaWxkKGNvbXBvbmVudFsnZWwnXSgpKTtcclxuICB9XHJcblxyXG4gIC8vIFJldHVybiBzbyBpdCBjYW4gc3RvcmVkIG9uIHBhcmVudCBvYmplY3QgaWYgZGVzaXJlZC5cclxuICByZXR1cm4gY29tcG9uZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIGNoaWxkIGNvbXBvbmVudCBmcm9tIHRoaXMgY29tcG9uZW50J3MgbGlzdCBvZiBjaGlsZHJlbiwgYW5kIHRoZVxyXG4gKiBjaGlsZCBjb21wb25lbnQncyBlbGVtZW50IGZyb20gdGhpcyBjb21wb25lbnQncyBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSAge3Zqcy5Db21wb25lbnR9IGNvbXBvbmVudCBDb21wb25lbnQgdG8gcmVtb3ZlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVDaGlsZCA9IGZ1bmN0aW9uKGNvbXBvbmVudCl7XHJcbiAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBjb21wb25lbnQgPSB0aGlzLmdldENoaWxkKGNvbXBvbmVudCk7XHJcbiAgfVxyXG5cclxuICBpZiAoIWNvbXBvbmVudCB8fCAhdGhpcy5jaGlsZHJlbl8pIHJldHVybjtcclxuXHJcbiAgdmFyIGNoaWxkRm91bmQgPSBmYWxzZTtcclxuICBmb3IgKHZhciBpID0gdGhpcy5jaGlsZHJlbl8ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGlmICh0aGlzLmNoaWxkcmVuX1tpXSA9PT0gY29tcG9uZW50KSB7XHJcbiAgICAgIGNoaWxkRm91bmQgPSB0cnVlO1xyXG4gICAgICB0aGlzLmNoaWxkcmVuXy5zcGxpY2UoaSwxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAoIWNoaWxkRm91bmQpIHJldHVybjtcclxuXHJcbiAgdGhpcy5jaGlsZEluZGV4X1tjb21wb25lbnQuaWRdID0gbnVsbDtcclxuICB0aGlzLmNoaWxkTmFtZUluZGV4X1tjb21wb25lbnQubmFtZV0gPSBudWxsO1xyXG5cclxuICB2YXIgY29tcEVsID0gY29tcG9uZW50LmVsKCk7XHJcbiAgaWYgKGNvbXBFbCAmJiBjb21wRWwucGFyZW50Tm9kZSA9PT0gdGhpcy5jb250ZW50RWwoKSkge1xyXG4gICAgdGhpcy5jb250ZW50RWwoKS5yZW1vdmVDaGlsZChjb21wb25lbnQuZWwoKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhbmQgaW5pdGlhbGl6ZSBkZWZhdWx0IGNoaWxkIGNvbXBvbmVudHMgZnJvbSBvcHRpb25zXHJcbiAqXHJcbiAqICAgICAvLyB3aGVuIGFuIGluc3RhbmNlIG9mIE15Q29tcG9uZW50IGlzIGNyZWF0ZWQsIGFsbCBjaGlsZHJlbiBpbiBvcHRpb25zXHJcbiAqICAgICAvLyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnN0YW5jZSBieSB0aGVpciBuYW1lIHN0cmluZ3MgYW5kIG9wdGlvbnNcclxuICogICAgIE15Q29tcG9uZW50LnByb3RvdHlwZS5vcHRpb25zXy5jaGlsZHJlbiA9IHtcclxuICogICAgICAgbXlDaGlsZENvbXBvbmVudDoge1xyXG4gKiAgICAgICAgIG15Q2hpbGRPcHRpb246IHRydWVcclxuICogICAgICAgfVxyXG4gKiAgICAgfVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaW5pdENoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICB2YXIgb3B0aW9ucyA9IHRoaXMub3B0aW9uc187XHJcblxyXG4gIGlmIChvcHRpb25zICYmIG9wdGlvbnNbJ2NoaWxkcmVuJ10pIHtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAvLyBMb29wIHRocm91Z2ggY29tcG9uZW50cyBhbmQgYWRkIHRoZW0gdG8gdGhlIHBsYXllclxyXG4gICAgdmpzLm9iai5lYWNoKG9wdGlvbnNbJ2NoaWxkcmVuJ10sIGZ1bmN0aW9uKG5hbWUsIG9wdHMpe1xyXG4gICAgICAvLyBBbGxvdyBmb3IgZGlzYWJsaW5nIGRlZmF1bHQgY29tcG9uZW50c1xyXG4gICAgICAvLyBlLmcuIHZqcy5vcHRpb25zWydjaGlsZHJlbiddWydwb3N0ZXJJbWFnZSddID0gZmFsc2VcclxuICAgICAgaWYgKG9wdHMgPT09IGZhbHNlKSByZXR1cm47XHJcblxyXG4gICAgICAvLyBBbGxvdyB3YWl0aW5nIHRvIGFkZCBjb21wb25lbnRzIHVudGlsIGEgc3BlY2lmaWMgZXZlbnQgaXMgY2FsbGVkXHJcbiAgICAgIHZhciB0ZW1wQWRkID0gZnVuY3Rpb24oKXtcclxuICAgICAgICAvLyBTZXQgcHJvcGVydHkgbmFtZSBvbiBwbGF5ZXIuIENvdWxkIGNhdXNlIGNvbmZsaWN0cyB3aXRoIG90aGVyIHByb3AgbmFtZXMsIGJ1dCBpdCdzIHdvcnRoIG1ha2luZyByZWZzIGVhc3kuXHJcbiAgICAgICAgc2VsZltuYW1lXSA9IHNlbGYuYWRkQ2hpbGQobmFtZSwgb3B0cyk7XHJcbiAgICAgIH07XHJcblxyXG4gICAgICBpZiAob3B0c1snbG9hZEV2ZW50J10pIHtcclxuICAgICAgICAvLyB0aGlzLm9uZShvcHRzLmxvYWRFdmVudCwgdGVtcEFkZClcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0ZW1wQWRkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbGxvd3Mgc3ViIGNvbXBvbmVudHMgdG8gc3RhY2sgQ1NTIGNsYXNzIG5hbWVzXHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gVGhlIGNvbnN0cnVjdGVkIGNsYXNzIG5hbWVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gQ2hpbGQgY2xhc3NlcyBjYW4gaW5jbHVkZSBhIGZ1bmN0aW9uIHRoYXQgZG9lczpcclxuICAgIC8vIHJldHVybiAnQ0xBU1MgTkFNRScgKyB0aGlzLl9zdXBlcigpO1xyXG4gICAgcmV0dXJuICcnO1xyXG59O1xyXG5cclxuLyogRXZlbnRzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIHRoaXMgY29tcG9uZW50J3MgZWxlbWVudFxyXG4gKlxyXG4gKiAgICAgdmFyIG15RnVuYyA9IGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgIHZhciBteVBsYXllciA9IHRoaXM7XHJcbiAqICAgICAgIC8vIERvIHNvbWV0aGluZyB3aGVuIHRoZSBldmVudCBpcyBmaXJlZFxyXG4gKiAgICAgfTtcclxuICpcclxuICogICAgIG15UGxheWVyLm9uKFwiZXZlbnROYW1lXCIsIG15RnVuYyk7XHJcbiAqXHJcbiAqIFRoZSBjb250ZXh0IHdpbGwgYmUgdGhlIGNvbXBvbmVudC5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgVGhlIGV2ZW50IHR5cGUgZS5nLiAnY2xpY2snXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgIFRoZSBldmVudCBsaXN0ZW5lclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBzZWxmXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uKHR5cGUsIGZuKXtcclxuICB2anMub24odGhpcy5lbF8sIHR5cGUsIHZqcy5iaW5kKHRoaXMsIGZuKSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGFuIGV2ZW50IGxpc3RlbmVyIGZyb20gdGhlIGNvbXBvbmVudCdzIGVsZW1lbnRcclxuICpcclxuICogICAgIG15Q29tcG9uZW50Lm9mZihcImV2ZW50TmFtZVwiLCBteUZ1bmMpO1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSAgIHR5cGUgRXZlbnQgdHlwZS4gV2l0aG91dCB0eXBlIGl0IHdpbGwgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMuXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9uPX0gZm4gICBFdmVudCBsaXN0ZW5lci4gV2l0aG91dCBmbiBpdCB3aWxsIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvciBhIHR5cGUuXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbih0eXBlLCBmbil7XHJcbiAgdmpzLm9mZih0aGlzLmVsXywgdHlwZSwgZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBiZSB0cmlnZ2VyZWQgb25seSBvbmNlIGFuZCB0aGVuIHJlbW92ZWRcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGUgRXZlbnQgdHlwZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICBFdmVudCBsaXN0ZW5lclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub25lID0gZnVuY3Rpb24odHlwZSwgZm4pIHtcclxuICB2anMub25lKHRoaXMuZWxfLCB0eXBlLCB2anMuYmluZCh0aGlzLCBmbikpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgYW4gZXZlbnQgb24gYW4gZWxlbWVudFxyXG4gKlxyXG4gKiAgICAgbXlDb21wb25lbnQudHJpZ2dlcignZXZlbnROYW1lJyk7XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICAgICAgdHlwZSAgVGhlIGV2ZW50IHR5cGUgdG8gdHJpZ2dlciwgZS5nLiAnY2xpY2snXHJcbiAqIEBwYXJhbSAge0V2ZW50fE9iamVjdH0gZXZlbnQgVGhlIGV2ZW50IG9iamVjdCB0byBiZSBwYXNzZWQgdG8gdGhlIGxpc3RlbmVyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9ICAgICAgc2VsZlxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uKHR5cGUsIGV2ZW50KXtcclxuICB2anMudHJpZ2dlcih0aGlzLmVsXywgdHlwZSwgZXZlbnQpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyogUmVhZHlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIElzIHRoZSBjb21wb25lbnQgbG9hZGVkXHJcbiAqIFRoaXMgY2FuIG1lYW4gZGlmZmVyZW50IHRoaW5ncyBkZXBlbmRpbmcgb24gdGhlIGNvbXBvbmVudC5cclxuICpcclxuICogQHByaXZhdGVcclxuICogQHR5cGUge0Jvb2xlYW59XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWR5XztcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VyIHJlYWR5IGFzIHNvb24gYXMgaW5pdGlhbGl6YXRpb24gaXMgZmluaXNoZWRcclxuICpcclxuICogQWxsb3dzIGZvciBkZWxheWluZyByZWFkeS4gT3ZlcnJpZGUgb24gYSBzdWIgY2xhc3MgcHJvdG90eXBlLlxyXG4gKiBJZiB5b3Ugc2V0IHRoaXMuaXNSZWFkeU9uSW5pdEZpbmlzaF8gaXQgd2lsbCBhZmZlY3QgYWxsIGNvbXBvbmVudHMuXHJcbiAqIFNwZWNpYWxseSB1c2VkIHdoZW4gd2FpdGluZyBmb3IgdGhlIEZsYXNoIHBsYXllciB0byBhc3luY2hybm91c2x5IGxvYWQuXHJcbiAqXHJcbiAqIEB0eXBlIHtCb29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFkeU9uSW5pdEZpbmlzaF8gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgcmVhZHkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIEB0eXBlIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnJlYWR5UXVldWVfO1xyXG5cclxuLyoqXHJcbiAqIEJpbmQgYSBsaXN0ZW5lciB0byB0aGUgY29tcG9uZW50J3MgcmVhZHkgc3RhdGVcclxuICpcclxuICogRGlmZmVyZW50IGZyb20gZXZlbnQgbGlzdGVuZXJzIGluIHRoYXQgaWYgdGhlIHJlYWR5IGV2ZW50IGhhcyBhbHJlYWR5IGhhcHBlbmRcclxuICogaXQgd2lsbCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBpbW1lZGlhdGVseS5cclxuICpcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuIFJlYWR5IGxpc3RlbmVyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZWFkeSA9IGZ1bmN0aW9uKGZuKXtcclxuICBpZiAoZm4pIHtcclxuICAgIGlmICh0aGlzLmlzUmVhZHlfKSB7XHJcbiAgICAgIGZuLmNhbGwodGhpcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5yZWFkeVF1ZXVlXyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdGhpcy5yZWFkeVF1ZXVlXyA9IFtdO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMucmVhZHlRdWV1ZV8ucHVzaChmbik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgdGhlIHJlYWR5IGxpc3RlbmVyc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUudHJpZ2dlclJlYWR5ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmlzUmVhZHlfID0gdHJ1ZTtcclxuXHJcbiAgdmFyIHJlYWR5UXVldWUgPSB0aGlzLnJlYWR5UXVldWVfO1xyXG5cclxuICBpZiAocmVhZHlRdWV1ZSAmJiByZWFkeVF1ZXVlLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMCwgaiA9IHJlYWR5UXVldWUubGVuZ3RoOyBpIDwgajsgaSsrKSB7XHJcbiAgICAgIHJlYWR5UXVldWVbaV0uY2FsbCh0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZXNldCBSZWFkeSBRdWV1ZVxyXG4gICAgdGhpcy5yZWFkeVF1ZXVlXyA9IFtdO1xyXG5cclxuICAgIC8vIEFsbG93IGZvciB1c2luZyBldmVudCBsaXN0ZW5lcnMgYWxzbywgaW4gY2FzZSB5b3Ugd2FudCB0byBkbyBzb21ldGhpbmcgZXZlcnl0aW1lIGEgc291cmNlIGlzIHJlYWR5LlxyXG4gICAgdGhpcy50cmlnZ2VyKCdyZWFkeScpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qIERpc3BsYXlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBDU1MgY2xhc3MgbmFtZSB0byB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb0FkZCBDbGFzc25hbWUgdG8gYWRkXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5hZGRDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzVG9BZGQpe1xyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgY2xhc3NUb0FkZCk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgQ1NTIGNsYXNzIG5hbWUgZnJvbSB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NUb1JlbW92ZSBDbGFzc25hbWUgdG8gcmVtb3ZlXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGNsYXNzVG9SZW1vdmUpe1xyXG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgY2xhc3NUb1JlbW92ZSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogU2hvdyB0aGUgY29tcG9uZW50IGVsZW1lbnQgaWYgaGlkZGVuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlIHRoZSBjb21wb25lbnQgZWxlbWVudCBpZiBoaWRkZW5cclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogTG9jayBhbiBpdGVtIGluIGl0cyB2aXNpYmxlIHN0YXRlXHJcbiAqIFRvIGJlIHVzZWQgd2l0aCBmYWRlSW4vZmFkZU91dC5cclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmxvY2tTaG93aW5nID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmFkZENsYXNzKCd2anMtbG9jay1zaG93aW5nJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVW5sb2NrIGFuIGl0ZW0gdG8gYmUgaGlkZGVuXHJcbiAqIFRvIGJlIHVzZWQgd2l0aCBmYWRlSW4vZmFkZU91dC5cclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnVubG9ja1Nob3dpbmcgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1sb2NrLXNob3dpbmcnKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNhYmxlIGNvbXBvbmVudCBieSBtYWtpbmcgaXQgdW5zaG93YWJsZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5oaWRlKCk7XHJcbiAgdGhpcy5zaG93ID0gZnVuY3Rpb24oKXt9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCBvciBnZXQgdGhlIHdpZHRoIG9mIHRoZSBjb21wb25lbnQgKENTUyB2YWx1ZXMpXHJcbiAqXHJcbiAqIFZpZGVvIHRhZyB3aWR0aC9oZWlnaHQgb25seSB3b3JrIGluIHBpeGVscy4gTm8gcGVyY2VudHMuXHJcbiAqIEJ1dCBhbGxvd2luZyBsaW1pdGVkIHBlcmNlbnRzIHVzZS4gZS5nLiB3aWR0aCgpIHdpbGwgcmV0dXJuIG51bWJlcislLCBub3QgY29tcHV0ZWQgd2lkdGhcclxuICpcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZz19IG51bSAgIE9wdGlvbmFsIHdpZHRoIG51bWJlclxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBza2lwTGlzdGVuZXJzIFNraXAgdGhlICdyZXNpemUnIGV2ZW50IHRyaWdnZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gUmV0dXJucyAndGhpcycgaWYgd2lkdGggd2FzIHNldFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBSZXR1cm5zIHRoZSB3aWR0aCBpZiBub3RoaW5nIHdhcyBzZXRcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24obnVtLCBza2lwTGlzdGVuZXJzKXtcclxuICByZXR1cm4gdGhpcy5kaW1lbnNpb24oJ3dpZHRoJywgbnVtLCBza2lwTGlzdGVuZXJzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3Igc2V0IHRoZSBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudCAoQ1NTIHZhbHVlcylcclxuICpcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZz19IG51bSAgICAgTmV3IGNvbXBvbmVudCBoZWlnaHRcclxuICogQHBhcmFtICB7Qm9vbGVhbj19IHNraXBMaXN0ZW5lcnMgU2tpcCB0aGUgcmVzaXplIGV2ZW50IHRyaWdnZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNvbXBvbmVudCBpZiB0aGUgaGVpZ2h0IHdhcyBzZXRcclxuICogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gVGhlIGhlaWdodCBpZiBpdCB3YXNuJ3Qgc2V0XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbihudW0sIHNraXBMaXN0ZW5lcnMpe1xyXG4gIHJldHVybiB0aGlzLmRpbWVuc2lvbignaGVpZ2h0JywgbnVtLCBza2lwTGlzdGVuZXJzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgYm90aCB3aWR0aCBhbmQgaGVpZ2h0IGF0IHRoZSBzYW1lIHRpbWVcclxuICpcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gd2lkdGhcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZ30gaGVpZ2h0XHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjb21wb25lbnRcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpbWVuc2lvbnMgPSBmdW5jdGlvbih3aWR0aCwgaGVpZ2h0KXtcclxuICAvLyBTa2lwIHJlc2l6ZSBsaXN0ZW5lcnMgb24gd2lkdGggZm9yIG9wdGltaXphdGlvblxyXG4gIHJldHVybiB0aGlzLndpZHRoKHdpZHRoLCB0cnVlKS5oZWlnaHQoaGVpZ2h0KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3Igc2V0IHdpZHRoIG9yIGhlaWdodFxyXG4gKlxyXG4gKiBUaGlzIGlzIHRoZSBzaGFyZWQgY29kZSBmb3IgdGhlIHdpZHRoKCkgYW5kIGhlaWdodCgpIG1ldGhvZHMuXHJcbiAqIEFsbCBmb3IgYW4gaW50ZWdlciwgaW50ZWdlciArICdweCcgb3IgaW50ZWdlciArICclJztcclxuICpcclxuICogS25vd24gaXNzdWU6IEhpZGRlbiBlbGVtZW50cyBvZmZpY2lhbGx5IGhhdmUgYSB3aWR0aCBvZiAwLiBXZSdyZSBkZWZhdWx0aW5nXHJcbiAqIHRvIHRoZSBzdHlsZS53aWR0aCB2YWx1ZSBhbmQgZmFsbGluZyBiYWNrIHRvIGNvbXB1dGVkU3R5bGUgd2hpY2ggaGFzIHRoZVxyXG4gKiBoaWRkZW4gZWxlbWVudCBpc3N1ZS4gSW5mbywgYnV0IHByb2JhYmx5IG5vdCBhbiBlZmZpY2llbnQgZml4OlxyXG4gKiBodHRwOi8vd3d3LmZvbGlvdGVrLmNvbS9kZXZibG9nL2dldHRpbmctdGhlLXdpZHRoLW9mLWEtaGlkZGVuLWVsZW1lbnQtd2l0aC1qcXVlcnktdXNpbmctd2lkdGgvXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gd2lkdGhPckhlaWdodCAgJ3dpZHRoJyBvciAnaGVpZ2h0J1xyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nPX0gbnVtICAgICBOZXcgZGltZW5zaW9uXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW49fSBza2lwTGlzdGVuZXJzIFNraXAgcmVzaXplIGV2ZW50IHRyaWdnZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNvbXBvbmVudCBpZiBhIGRpbWVuc2lvbiB3YXMgc2V0XHJcbiAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IFRoZSBkaW1lbnNpb24gaWYgbm90aGluZyB3YXMgc2V0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaW1lbnNpb24gPSBmdW5jdGlvbih3aWR0aE9ySGVpZ2h0LCBudW0sIHNraXBMaXN0ZW5lcnMpe1xyXG4gIGlmIChudW0gIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIC8vIENoZWNrIGlmIHVzaW5nIGNzcyB3aWR0aC9oZWlnaHQgKCUgb3IgcHgpIGFuZCBhZGp1c3RcclxuICAgIGlmICgoJycrbnVtKS5pbmRleE9mKCclJykgIT09IC0xIHx8ICgnJytudW0pLmluZGV4T2YoJ3B4JykgIT09IC0xKSB7XHJcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gbnVtO1xyXG4gICAgfSBlbHNlIGlmIChudW0gPT09ICdhdXRvJykge1xyXG4gICAgICB0aGlzLmVsXy5zdHlsZVt3aWR0aE9ySGVpZ2h0XSA9ICcnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbF8uc3R5bGVbd2lkdGhPckhlaWdodF0gPSBudW0rJ3B4JztcclxuICAgIH1cclxuXHJcbiAgICAvLyBza2lwTGlzdGVuZXJzIGFsbG93cyB1cyB0byBhdm9pZCB0cmlnZ2VyaW5nIHRoZSByZXNpemUgZXZlbnQgd2hlbiBzZXR0aW5nIGJvdGggd2lkdGggYW5kIGhlaWdodFxyXG4gICAgaWYgKCFza2lwTGlzdGVuZXJzKSB7IHRoaXMudHJpZ2dlcigncmVzaXplJyk7IH1cclxuXHJcbiAgICAvLyBSZXR1cm4gY29tcG9uZW50XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIE5vdCBzZXR0aW5nIGEgdmFsdWUsIHNvIGdldHRpbmcgaXRcclxuICAvLyBNYWtlIHN1cmUgZWxlbWVudCBleGlzdHNcclxuICBpZiAoIXRoaXMuZWxfKSByZXR1cm4gMDtcclxuXHJcbiAgLy8gR2V0IGRpbWVuc2lvbiB2YWx1ZSBmcm9tIHN0eWxlXHJcbiAgdmFyIHZhbCA9IHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdO1xyXG4gIHZhciBweEluZGV4ID0gdmFsLmluZGV4T2YoJ3B4Jyk7XHJcbiAgaWYgKHB4SW5kZXggIT09IC0xKSB7XHJcbiAgICAvLyBSZXR1cm4gdGhlIHBpeGVsIHZhbHVlIHdpdGggbm8gJ3B4J1xyXG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbC5zbGljZSgwLHB4SW5kZXgpLCAxMCk7XHJcblxyXG4gIC8vIE5vIHB4IHNvIHVzaW5nICUgb3Igbm8gc3R5bGUgd2FzIHNldCwgc28gZmFsbGluZyBiYWNrIHRvIG9mZnNldFdpZHRoL2hlaWdodFxyXG4gIC8vIElmIGNvbXBvbmVudCBoYXMgZGlzcGxheTpub25lLCBvZmZzZXQgd2lsbCByZXR1cm4gMFxyXG4gIC8vIFRPRE86IGhhbmRsZSBkaXNwbGF5Om5vbmUgYW5kIG5vIGRpbWVuc2lvbiBzdHlsZSB1c2luZyBweFxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZWxfWydvZmZzZXQnK3Zqcy5jYXBpdGFsaXplKHdpZHRoT3JIZWlnaHQpXSwgMTApO1xyXG5cclxuICAgIC8vIENvbXB1dGVkU3R5bGUgdmVyc2lvbi5cclxuICAgIC8vIE9ubHkgZGlmZmVyZW5jZSBpcyBpZiB0aGUgZWxlbWVudCBpcyBoaWRkZW4gaXQgd2lsbCByZXR1cm5cclxuICAgIC8vIHRoZSBwZXJjZW50IHZhbHVlIChlLmcuICcxMDAlJycpXHJcbiAgICAvLyBpbnN0ZWFkIG9mIHplcm8gbGlrZSBvZmZzZXRXaWR0aCByZXR1cm5zLlxyXG4gICAgLy8gdmFyIHZhbCA9IHZqcy5nZXRDb21wdXRlZFN0eWxlVmFsdWUodGhpcy5lbF8sIHdpZHRoT3JIZWlnaHQpO1xyXG4gICAgLy8gdmFyIHB4SW5kZXggPSB2YWwuaW5kZXhPZigncHgnKTtcclxuXHJcbiAgICAvLyBpZiAocHhJbmRleCAhPT0gLTEpIHtcclxuICAgIC8vICAgcmV0dXJuIHZhbC5zbGljZSgwLCBweEluZGV4KTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIHJldHVybiB2YWw7XHJcbiAgICAvLyB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHdpZHRoIGFuZC9vciBoZWlnaHQgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzXHJcbiAqIEBldmVudCByZXNpemVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uUmVzaXplO1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgJ3RhcCcgZXZlbnRzIHdoZW4gdG91Y2ggZXZlbnRzIGFyZSBzdXBwb3J0ZWRcclxuICpcclxuICogVGhpcyBpcyB1c2VkIHRvIHN1cHBvcnQgdG9nZ2xpbmcgdGhlIGNvbnRyb2xzIHRocm91Z2ggYSB0YXAgb24gdGhlIHZpZGVvLlxyXG4gKlxyXG4gKiBXZSdyZSByZXF1aXJlaW5nIHRoZW0gdG8gYmUgZW5hYmxlZCBiZWNhdXNlIG90aGVyd2lzZSBldmVyeSBjb21wb25lbnQgd291bGRcclxuICogaGF2ZSB0aGlzIGV4dHJhIG92ZXJoZWFkIHVubmVjZXNzYXJpbHksIG9uIG1vYmlsZSBkZXZpY2VzIHdoZXJlIGV4dHJhXHJcbiAqIG92ZXJoZWFkIGlzIGVzcGVjaWFsbHkgYmFkLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZW1pdFRhcEV2ZW50cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRvdWNoU3RhcnQsIHRvdWNoVGltZSwgY291bGRCZVRhcCwgbm9UYXA7XHJcblxyXG4gIC8vIFRyYWNrIHRoZSBzdGFydCB0aW1lIHNvIHdlIGNhbiBkZXRlcm1pbmUgaG93IGxvbmcgdGhlIHRvdWNoIGxhc3RlZFxyXG4gIHRvdWNoU3RhcnQgPSAwO1xyXG5cclxuICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vIFJlY29yZCBzdGFydCB0aW1lIHNvIHdlIGNhbiBkZXRlY3QgYSB0YXAgdnMuIFwidG91Y2ggYW5kIGhvbGRcIlxyXG4gICAgdG91Y2hTdGFydCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgLy8gUmVzZXQgY291bGRCZVRhcCB0cmFja2luZ1xyXG4gICAgY291bGRCZVRhcCA9IHRydWU7XHJcbiAgfSk7XHJcblxyXG4gIG5vVGFwID0gZnVuY3Rpb24oKXtcclxuICAgIGNvdWxkQmVUYXAgPSBmYWxzZTtcclxuICB9O1xyXG4gIC8vIFRPRE86IExpc3RlbiB0byB0aGUgb3JpZ2luYWwgdGFyZ2V0LiBodHRwOi8veW91dHUuYmUvRHVqZnBYT0tVcDg/dD0xM204c1xyXG4gIHRoaXMub24oJ3RvdWNobW92ZScsIG5vVGFwKTtcclxuICB0aGlzLm9uKCd0b3VjaGxlYXZlJywgbm9UYXApO1xyXG4gIHRoaXMub24oJ3RvdWNoY2FuY2VsJywgbm9UYXApO1xyXG5cclxuICAvLyBXaGVuIHRoZSB0b3VjaCBlbmRzLCBtZWFzdXJlIGhvdyBsb25nIGl0IHRvb2sgYW5kIHRyaWdnZXIgdGhlIGFwcHJvcHJpYXRlXHJcbiAgLy8gZXZlbnRcclxuICB0aGlzLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gUHJvY2VlZCBvbmx5IGlmIHRoZSB0b3VjaG1vdmUvbGVhdmUvY2FuY2VsIGV2ZW50IGRpZG4ndCBoYXBwZW5cclxuICAgIGlmIChjb3VsZEJlVGFwID09PSB0cnVlKSB7XHJcbiAgICAgIC8vIE1lYXN1cmUgaG93IGxvbmcgdGhlIHRvdWNoIGxhc3RlZFxyXG4gICAgICB0b3VjaFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRvdWNoU3RhcnQ7XHJcbiAgICAgIC8vIFRoZSB0b3VjaCBuZWVkcyB0byBiZSBxdWljayBpbiBvcmRlciB0byBjb25zaWRlciBpdCBhIHRhcFxyXG4gICAgICBpZiAodG91Y2hUaW1lIDwgMjUwKSB7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd0YXAnKTtcclxuICAgICAgICAvLyBJdCBtYXkgYmUgZ29vZCB0byBjb3B5IHRoZSB0b3VjaGVuZCBldmVudCBvYmplY3QgYW5kIGNoYW5nZSB0aGVcclxuICAgICAgICAvLyB0eXBlIHRvIHRhcCwgaWYgdGhlIG90aGVyIGV2ZW50IHByb3BlcnRpZXMgYXJlbid0IGV4YWN0IGFmdGVyXHJcbiAgICAgICAgLy8gdmpzLmZpeEV2ZW50IHJ1bnMgKGUuZy4gZXZlbnQudGFyZ2V0KVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbi8qIEJ1dHRvbiAtIEJhc2UgY2xhc3MgZm9yIGFsbCBidXR0b25zXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciBhbGwgYnV0dG9uc1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5CdXR0b24gPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQGluaGVyaXREb2NcclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgdmFyIHRvdWNoc3RhcnQgPSBmYWxzZTtcclxuICAgIHRoaXMub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICAvLyBTdG9wIGNsaWNrIGFuZCBvdGhlciBtb3VzZSBldmVudHMgZnJvbSB0cmlnZ2VyaW5nIGFsc29cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdG91Y2hzdGFydCA9IHRydWU7XHJcbiAgICB9KTtcclxuICAgIHRoaXMub24oJ3RvdWNobW92ZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICB0b3VjaHN0YXJ0ID0gZmFsc2U7XHJcbiAgICB9KTtcclxuICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgIHRoaXMub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgaWYgKHRvdWNoc3RhcnQpIHtcclxuICAgICAgICBzZWxmLm9uQ2xpY2soZXZlbnQpO1xyXG4gICAgICB9XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcbiAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMub25Gb2N1cyk7XHJcbiAgICB0aGlzLm9uKCdibHVyJywgdGhpcy5vbkJsdXIpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKXtcclxuICAvLyBBZGQgc3RhbmRhcmQgQXJpYSBhbmQgVGFiaW5kZXggaW5mb1xyXG4gIHByb3BzID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICBjbGFzc05hbWU6IHRoaXMuYnVpbGRDU1NDbGFzcygpLFxyXG4gICAgaW5uZXJIVE1MOiAnPGRpdiBjbGFzcz1cInZqcy1jb250cm9sLWNvbnRlbnRcIj48c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj4nICsgKHRoaXMuYnV0dG9uVGV4dCB8fCAnTmVlZCBUZXh0JykgKyAnPC9zcGFuPjwvZGl2PicsXHJcbiAgICByb2xlOiAnYnV0dG9uJyxcclxuICAgICdhcmlhLWxpdmUnOiAncG9saXRlJywgLy8gbGV0IHRoZSBzY3JlZW4gcmVhZGVyIHVzZXIga25vdyB0aGF0IHRoZSB0ZXh0IG9mIHRoZSBidXR0b24gbWF5IGNoYW5nZVxyXG4gICAgdGFiSW5kZXg6IDBcclxuICB9LCBwcm9wcyk7XHJcblxyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsIHR5cGUsIHByb3BzKTtcclxufTtcclxuXHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRPRE86IENoYW5nZSB2anMtY29udHJvbCB0byB2anMtYnV0dG9uP1xyXG4gIHJldHVybiAndmpzLWNvbnRyb2wgJyArIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbiAgLy8gQ2xpY2sgLSBPdmVycmlkZSB3aXRoIHNwZWNpZmljIGZ1bmN0aW9uYWxpdHkgZm9yIGJ1dHRvblxyXG52anMuQnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuICAvLyBGb2N1cyAtIEFkZCBrZXlib2FyZCBmdW5jdGlvbmFsaXR5IHRvIGVsZW1lbnRcclxudmpzLkJ1dHRvbi5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLm9uKGRvY3VtZW50LCAna2V5dXAnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uS2V5UHJlc3MpKTtcclxufTtcclxuXHJcbiAgLy8gS2V5UHJlc3MgKGRvY3VtZW50IGxldmVsKSAtIFRyaWdnZXIgY2xpY2sgd2hlbiBrZXlzIGFyZSBwcmVzc2VkXHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uS2V5UHJlc3MgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgLy8gQ2hlY2sgZm9yIHNwYWNlIGJhciAoMzIpIG9yIGVudGVyICgxMykga2V5c1xyXG4gIGlmIChldmVudC53aGljaCA9PSAzMiB8fCBldmVudC53aGljaCA9PSAxMykge1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMub25DbGljaygpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEJsdXIgLSBSZW1vdmUga2V5Ym9hcmQgdHJpZ2dlcnNcclxudmpzLkJ1dHRvbi5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKXtcclxuICB2anMub2ZmKGRvY3VtZW50LCAna2V5dXAnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uS2V5UHJlc3MpKTtcclxufTtcclxuLyogU2xpZGVyXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBmdW5jdGlvbmFsaXR5IGZvciBzbGlkZXJzIGxpa2UgdGhlIHZvbHVtZSBiYXIgYW5kIHNlZWsgYmFyXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU2xpZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gU2V0IHByb3BlcnR5IG5hbWVzIHRvIGJhciBhbmQgaGFuZGxlIHRvIG1hdGNoIHdpdGggdGhlIGNoaWxkIFNsaWRlciBjbGFzcyBpcyBsb29raW5nIGZvclxyXG4gICAgdGhpcy5iYXIgPSB0aGlzLmdldENoaWxkKHRoaXMub3B0aW9uc19bJ2Jhck5hbWUnXSk7XHJcbiAgICB0aGlzLmhhbmRsZSA9IHRoaXMuZ2V0Q2hpbGQodGhpcy5vcHRpb25zX1snaGFuZGxlTmFtZSddKTtcclxuXHJcbiAgICBwbGF5ZXIub24odGhpcy5wbGF5ZXJFdmVudCwgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICAgIHRoaXMub24oJ3RvdWNoc3RhcnQnLCB0aGlzLm9uTW91c2VEb3duKTtcclxuICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5vbkZvY3VzKTtcclxuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLm9uQmx1cik7XHJcbiAgICB0aGlzLm9uKCdjbGljaycsIHRoaXMub25DbGljayk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJfLm9uKCdjb250cm9sc3Zpc2libGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIC8vIFRoaXMgaXMgYWN0dWFsbHkgdG8gZml4IHRoZSB2b2x1bWUgaGFuZGxlIHBvc2l0aW9uLiBodHRwOi8vdHdpdHRlci5jb20vIyEvZ2Vycml0dmFuYWFrZW4vc3RhdHVzLzE1OTA0NjI1NDUxOTc4NzUyMFxyXG4gICAgLy8gdGhpcy5wbGF5ZXJfLm9uZSgndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgcGxheWVyLnJlYWR5KHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgdGhpcy5ib3VuZEV2ZW50cyA9IHt9O1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKSB7XHJcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcclxuICAvLyBBZGQgdGhlIHNsaWRlciBlbGVtZW50IGNsYXNzIHRvIGFsbCBzdWIgY2xhc3Nlc1xyXG4gIHByb3BzLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArICcgdmpzLXNsaWRlcic7XHJcbiAgcHJvcHMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgIHJvbGU6ICdzbGlkZXInLFxyXG4gICAgJ2FyaWEtdmFsdWVub3cnOiAwLFxyXG4gICAgJ2FyaWEtdmFsdWVtaW4nOiAwLFxyXG4gICAgJ2FyaWEtdmFsdWVtYXgnOiAxMDAsXHJcbiAgICB0YWJJbmRleDogMFxyXG4gIH0sIHByb3BzKTtcclxuXHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgdHlwZSwgcHJvcHMpO1xyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25Nb3VzZURvd24gPSBmdW5jdGlvbihldmVudCl7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICB2anMuYmxvY2tUZXh0U2VsZWN0aW9uKCk7XHJcblxyXG4gIHRoaXMuYm91bmRFdmVudHMubW92ZSA9IHZqcy5iaW5kKHRoaXMsIHRoaXMub25Nb3VzZU1vdmUpO1xyXG4gIHRoaXMuYm91bmRFdmVudHMuZW5kID0gdmpzLmJpbmQodGhpcywgdGhpcy5vbk1vdXNlVXApO1xyXG5cclxuICB2anMub24oZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kRXZlbnRzLm1vdmUpO1xyXG4gIHZqcy5vbihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCk7XHJcbiAgdmpzLm9uKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlKTtcclxuICB2anMub24oZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYm91bmRFdmVudHMuZW5kKTtcclxuXHJcbiAgdGhpcy5vbk1vdXNlTW92ZShldmVudCk7XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlVXAgPSBmdW5jdGlvbigpIHtcclxuICB2anMudW5ibG9ja1RleHRTZWxlY3Rpb24oKTtcclxuICB2anMub2ZmKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlLCBmYWxzZSk7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCwgZmFsc2UpO1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJvdW5kRXZlbnRzLm1vdmUsIGZhbHNlKTtcclxuICB2anMub2ZmKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCwgZmFsc2UpO1xyXG5cclxuICB0aGlzLnVwZGF0ZSgpO1xyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICAvLyBJbiBWb2x1bWVCYXIgaW5pdCB3ZSBoYXZlIGEgc2V0VGltZW91dCBmb3IgdXBkYXRlIHRoYXQgcG9wcyBhbmQgdXBkYXRlIHRvIHRoZSBlbmQgb2YgdGhlXHJcbiAgLy8gZXhlY3V0aW9uIHN0YWNrLiBUaGUgcGxheWVyIGlzIGRlc3Ryb3llZCBiZWZvcmUgdGhlbiB1cGRhdGUgd2lsbCBjYXVzZSBhbiBlcnJvclxyXG4gIGlmICghdGhpcy5lbF8pIHJldHVybjtcclxuXHJcbiAgLy8gSWYgc2NydWJiaW5nLCB3ZSBjb3VsZCB1c2UgYSBjYWNoZWQgdmFsdWUgdG8gbWFrZSB0aGUgaGFuZGxlIGtlZXAgdXAgd2l0aCB0aGUgdXNlcidzIG1vdXNlLlxyXG4gIC8vIE9uIEhUTUw1IGJyb3dzZXJzIHNjcnViYmluZyBpcyByZWFsbHkgc21vb3RoLCBidXQgc29tZSBmbGFzaCBwbGF5ZXJzIGFyZSBzbG93LCBzbyB3ZSBtaWdodCB3YW50IHRvIHV0aWxpemUgdGhpcyBsYXRlci5cclxuICAvLyB2YXIgcHJvZ3Jlc3MgPSAgKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgLyB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSA6IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpIC8gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XHJcblxyXG4gIHZhciBiYXJQcm9ncmVzcyxcclxuICAgICAgcHJvZ3Jlc3MgPSB0aGlzLmdldFBlcmNlbnQoKSxcclxuICAgICAgaGFuZGxlID0gdGhpcy5oYW5kbGUsXHJcbiAgICAgIGJhciA9IHRoaXMuYmFyO1xyXG5cclxuICAvLyBQcm90ZWN0IGFnYWluc3Qgbm8gZHVyYXRpb24gYW5kIG90aGVyIGRpdmlzaW9uIGlzc3Vlc1xyXG4gIGlmIChpc05hTihwcm9ncmVzcykpIHsgcHJvZ3Jlc3MgPSAwOyB9XHJcblxyXG4gIGJhclByb2dyZXNzID0gcHJvZ3Jlc3M7XHJcblxyXG4gIC8vIElmIHRoZXJlIGlzIGEgaGFuZGxlLCB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoZSBoYW5kbGUgaW4gb3VyIGNhbGN1bGF0aW9uIGZvciBwcm9ncmVzcyBiYXJcclxuICAvLyBzbyB0aGF0IGl0IGRvZXNuJ3QgZmFsbCBzaG9ydCBvZiBvciBleHRlbmQgcGFzdCB0aGUgaGFuZGxlLlxyXG4gIGlmIChoYW5kbGUpIHtcclxuXHJcbiAgICB2YXIgYm94ID0gdGhpcy5lbF8sXHJcbiAgICAgICAgYm94V2lkdGggPSBib3gub2Zmc2V0V2lkdGgsXHJcblxyXG4gICAgICAgIGhhbmRsZVdpZHRoID0gaGFuZGxlLmVsKCkub2Zmc2V0V2lkdGgsXHJcblxyXG4gICAgICAgIC8vIFRoZSB3aWR0aCBvZiB0aGUgaGFuZGxlIGluIHBlcmNlbnQgb2YgdGhlIGNvbnRhaW5pbmcgYm94XHJcbiAgICAgICAgLy8gSW4gSUUsIHdpZHRocyBtYXkgbm90IGJlIHJlYWR5IHlldCBjYXVzaW5nIE5hTlxyXG4gICAgICAgIGhhbmRsZVBlcmNlbnQgPSAoaGFuZGxlV2lkdGgpID8gaGFuZGxlV2lkdGggLyBib3hXaWR0aCA6IDAsXHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgYWRqdXN0ZWQgc2l6ZSBvZiB0aGUgYm94LCBjb25zaWRlcmluZyB0aGF0IHRoZSBoYW5kbGUncyBjZW50ZXIgbmV2ZXIgdG91Y2hlcyB0aGUgbGVmdCBvciByaWdodCBzaWRlLlxyXG4gICAgICAgIC8vIFRoZXJlIGlzIGEgbWFyZ2luIG9mIGhhbGYgdGhlIGhhbmRsZSdzIHdpZHRoIG9uIGJvdGggc2lkZXMuXHJcbiAgICAgICAgYm94QWRqdXN0ZWRQZXJjZW50ID0gMSAtIGhhbmRsZVBlcmNlbnQsXHJcblxyXG4gICAgICAgIC8vIEFkanVzdCB0aGUgcHJvZ3Jlc3MgdGhhdCB3ZSdsbCB1c2UgdG8gc2V0IHdpZHRocyB0byB0aGUgbmV3IGFkanVzdGVkIGJveCB3aWR0aFxyXG4gICAgICAgIGFkanVzdGVkUHJvZ3Jlc3MgPSBwcm9ncmVzcyAqIGJveEFkanVzdGVkUGVyY2VudDtcclxuXHJcbiAgICAvLyBUaGUgYmFyIGRvZXMgcmVhY2ggdGhlIGxlZnQgc2lkZSwgc28gd2UgbmVlZCB0byBhY2NvdW50IGZvciB0aGlzIGluIHRoZSBiYXIncyB3aWR0aFxyXG4gICAgYmFyUHJvZ3Jlc3MgPSBhZGp1c3RlZFByb2dyZXNzICsgKGhhbmRsZVBlcmNlbnQgLyAyKTtcclxuXHJcbiAgICAvLyBNb3ZlIHRoZSBoYW5kbGUgZnJvbSB0aGUgbGVmdCBiYXNlZCBvbiB0aGUgYWRqZWN0ZWQgcHJvZ3Jlc3NcclxuICAgIGhhbmRsZS5lbCgpLnN0eWxlLmxlZnQgPSB2anMucm91bmQoYWRqdXN0ZWRQcm9ncmVzcyAqIDEwMCwgMikgKyAnJSc7XHJcbiAgfVxyXG5cclxuICAvLyBTZXQgdGhlIG5ldyBiYXIgd2lkdGhcclxuICBiYXIuZWwoKS5zdHlsZS53aWR0aCA9IHZqcy5yb3VuZChiYXJQcm9ncmVzcyAqIDEwMCwgMikgKyAnJSc7XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5jYWxjdWxhdGVEaXN0YW5jZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB2YXIgZWwsIGJveCwgYm94WCwgYm94WSwgYm94VywgYm94SCwgaGFuZGxlLCBwYWdlWCwgcGFnZVk7XHJcblxyXG4gIGVsID0gdGhpcy5lbF87XHJcbiAgYm94ID0gdmpzLmZpbmRQb3NpdGlvbihlbCk7XHJcbiAgYm94VyA9IGJveEggPSBlbC5vZmZzZXRXaWR0aDtcclxuICBoYW5kbGUgPSB0aGlzLmhhbmRsZTtcclxuXHJcbiAgaWYgKHRoaXMub3B0aW9uc18udmVydGljYWwpIHtcclxuICAgIGJveFkgPSBib3gudG9wO1xyXG5cclxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xyXG4gICAgICBwYWdlWSA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VZO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFnZVkgPSBldmVudC5wYWdlWTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgIHZhciBoYW5kbGVIID0gaGFuZGxlLmVsKCkub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAvLyBBZGp1c3RlZCBYIGFuZCBXaWR0aCwgc28gaGFuZGxlIGRvZXNuJ3QgZ28gb3V0c2lkZSB0aGUgYmFyXHJcbiAgICAgIGJveFkgPSBib3hZICsgKGhhbmRsZUggLyAyKTtcclxuICAgICAgYm94SCA9IGJveEggLSBoYW5kbGVIO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBlcmNlbnQgdGhhdCB0aGUgY2xpY2sgaXMgdGhyb3VnaCB0aGUgYWRqdXN0ZWQgYXJlYVxyXG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDEsICgoYm94WSAtIHBhZ2VZKSArIGJveEgpIC8gYm94SCkpO1xyXG5cclxuICB9IGVsc2Uge1xyXG4gICAgYm94WCA9IGJveC5sZWZ0O1xyXG5cclxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xyXG4gICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcGFnZVggPSBldmVudC5wYWdlWDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGFuZGxlKSB7XHJcbiAgICAgIHZhciBoYW5kbGVXID0gaGFuZGxlLmVsKCkub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAvLyBBZGp1c3RlZCBYIGFuZCBXaWR0aCwgc28gaGFuZGxlIGRvZXNuJ3QgZ28gb3V0c2lkZSB0aGUgYmFyXHJcbiAgICAgIGJveFggPSBib3hYICsgKGhhbmRsZVcgLyAyKTtcclxuICAgICAgYm94VyA9IGJveFcgLSBoYW5kbGVXO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFBlcmNlbnQgdGhhdCB0aGUgY2xpY2sgaXMgdGhyb3VnaCB0aGUgYWRqdXN0ZWQgYXJlYVxyXG4gICAgcmV0dXJuIE1hdGgubWF4KDAsIE1hdGgubWluKDEsIChwYWdlWCAtIGJveFgpIC8gYm94VykpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5vbihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbktleVByZXNzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGlmIChldmVudC53aGljaCA9PSAzNykgeyAvLyBMZWZ0IEFycm93XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5zdGVwQmFjaygpO1xyXG4gIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gMzkpIHsgLy8gUmlnaHQgQXJyb3dcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnN0ZXBGb3J3YXJkKCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKXtcclxuICB2anMub2ZmKGRvY3VtZW50LCAna2V5dXAnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uS2V5UHJlc3MpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0ZW5lciBmb3IgY2xpY2sgZXZlbnRzIG9uIHNsaWRlciwgdXNlZCB0byBwcmV2ZW50IGNsaWNrc1xyXG4gKiAgIGZyb20gYnViYmxpbmcgdXAgdG8gcGFyZW50IGVsZW1lbnRzIGxpa2UgYnV0dG9uIG1lbnVzLlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50IEV2ZW50IG9iamVjdFxyXG4gKi9cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlZWtCYXIgQmVoYXZpb3IgaW5jbHVkZXMgcGxheSBwcm9ncmVzcyBiYXIsIGFuZCBzZWVrIGhhbmRsZVxyXG4gKiBOZWVkZWQgc28gaXQgY2FuIGRldGVybWluZSBzZWVrIHBvc2l0aW9uIGJhc2VkIG9uIGhhbmRsZSBwb3NpdGlvbi9zaXplXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU2xpZGVySGFuZGxlID0gdmpzLkNvbXBvbmVudC5leHRlbmQoKTtcclxuXHJcbi8qKlxyXG4gKiBEZWZhdWx0IHZhbHVlIG9mIHRoZSBzbGlkZXJcclxuICpcclxuICogQHR5cGUge051bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5TbGlkZXJIYW5kbGUucHJvdG90eXBlLmRlZmF1bHRWYWx1ZSA9IDA7XHJcblxyXG4vKiogQGluaGVyaXREb2MgKi9cclxudmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xyXG4gIHByb3BzID0gcHJvcHMgfHwge307XHJcbiAgLy8gQWRkIHRoZSBzbGlkZXIgZWxlbWVudCBjbGFzcyB0byBhbGwgc3ViIGNsYXNzZXNcclxuICBwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnIHZqcy1zbGlkZXItaGFuZGxlJztcclxuICBwcm9wcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+Jyt0aGlzLmRlZmF1bHRWYWx1ZSsnPC9zcGFuPidcclxuICB9LCBwcm9wcyk7XHJcblxyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCBwcm9wcyk7XHJcbn07XHJcbi8qIE1lbnVcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIFRoZSBNZW51IGNvbXBvbmVudCBpcyB1c2VkIHRvIGJ1aWxkIHBvcCB1cCBtZW51cywgaW5jbHVkaW5nIHN1YnRpdGxlIGFuZFxyXG4gKiBjYXB0aW9ucyBzZWxlY3Rpb24gbWVudXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk1lbnUgPSB2anMuQ29tcG9uZW50LmV4dGVuZCgpO1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIG1lbnUgaXRlbSB0byB0aGUgbWVudVxyXG4gKiBAcGFyYW0ge09iamVjdHxTdHJpbmd9IGNvbXBvbmVudCBDb21wb25lbnQgb3IgY29tcG9uZW50IHR5cGUgdG8gYWRkXHJcbiAqL1xyXG52anMuTWVudS5wcm90b3R5cGUuYWRkSXRlbSA9IGZ1bmN0aW9uKGNvbXBvbmVudCl7XHJcbiAgdGhpcy5hZGRDaGlsZChjb21wb25lbnQpO1xyXG4gIGNvbXBvbmVudC5vbignY2xpY2snLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy51bmxvY2tTaG93aW5nKCk7XHJcbiAgfSkpO1xyXG59O1xyXG5cclxuLyoqIEBpbmhlcml0RG9jICovXHJcbnZqcy5NZW51LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGNvbnRlbnRFbFR5cGUgPSB0aGlzLm9wdGlvbnMoKS5jb250ZW50RWxUeXBlIHx8ICd1bCc7XHJcbiAgdGhpcy5jb250ZW50RWxfID0gdmpzLmNyZWF0ZUVsKGNvbnRlbnRFbFR5cGUsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LWNvbnRlbnQnXHJcbiAgfSk7XHJcbiAgdmFyIGVsID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgYXBwZW5kOiB0aGlzLmNvbnRlbnRFbF8sXHJcbiAgICBjbGFzc05hbWU6ICd2anMtbWVudSdcclxuICB9KTtcclxuICBlbC5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnRFbF8pO1xyXG5cclxuICAvLyBQcmV2ZW50IGNsaWNrcyBmcm9tIGJ1YmJsaW5nIHVwLiBOZWVkZWQgZm9yIE1lbnUgQnV0dG9ucyxcclxuICAvLyB3aGVyZSBhIGNsaWNrIG9uIHRoZSBwYXJlbnQgaXMgc2lnbmlmaWNhbnRcclxuICB2anMub24oZWwsICdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBjb21wb25lbnQgZm9yIGEgbWVudSBpdGVtLiBgPGxpPmBcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTWVudUl0ZW0gPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQob3B0aW9uc1snc2VsZWN0ZWQnXSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKiBAaW5oZXJpdERvYyAqL1xyXG52anMuTWVudUl0ZW0ucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpe1xyXG4gIHJldHVybiB2anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdsaScsIHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtaXRlbScsXHJcbiAgICBpbm5lckhUTUw6IHRoaXMub3B0aW9uc19bJ2xhYmVsJ11cclxuICB9LCBwcm9wcykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBhIGNsaWNrIG9uIHRoZSBtZW51IGl0ZW0sIGFuZCBzZXQgaXQgdG8gc2VsZWN0ZWRcclxuICovXHJcbnZqcy5NZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5zZWxlY3RlZCh0cnVlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdGhpcyBtZW51IGl0ZW0gYXMgc2VsZWN0ZWQgb3Igbm90XHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHNlbGVjdGVkXHJcbiAqL1xyXG52anMuTWVudUl0ZW0ucHJvdG90eXBlLnNlbGVjdGVkID0gZnVuY3Rpb24oc2VsZWN0ZWQpe1xyXG4gIGlmIChzZWxlY3RlZCkge1xyXG4gICAgdGhpcy5hZGRDbGFzcygndmpzLXNlbGVjdGVkJyk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLHRydWUpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtc2VsZWN0ZWQnKTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsZmFsc2UpO1xyXG4gIH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogQSBidXR0b24gY2xhc3Mgd2l0aCBhIHBvcHVwIG1lbnVcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NZW51QnV0dG9uID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5tZW51ID0gdGhpcy5jcmVhdGVNZW51KCk7XHJcblxyXG4gICAgLy8gQWRkIGxpc3QgdG8gZWxlbWVudFxyXG4gICAgdGhpcy5hZGRDaGlsZCh0aGlzLm1lbnUpO1xyXG5cclxuICAgIC8vIEF1dG9tYXRpY2FsbHkgaGlkZSBlbXB0eSBtZW51IGJ1dHRvbnNcclxuICAgIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMub24oJ2tleXVwJywgdGhpcy5vbktleVByZXNzKTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1oYXNwb3B1cCcsIHRydWUpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVHJhY2sgdGhlIHN0YXRlIG9mIHRoZSBtZW51IGJ1dHRvblxyXG4gKiBAdHlwZSB7Qm9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5idXR0b25QcmVzc2VkXyA9IGZhbHNlO1xyXG5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLmNyZWF0ZU1lbnUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBtZW51ID0gbmV3IHZqcy5NZW51KHRoaXMucGxheWVyXyk7XHJcblxyXG4gIC8vIEFkZCBhIHRpdGxlIGxpc3QgaXRlbSB0byB0aGUgdG9wXHJcbiAgaWYgKHRoaXMub3B0aW9ucygpLnRpdGxlKSB7XHJcbiAgICBtZW51LmVsKCkuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdsaScsIHtcclxuICAgICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtdGl0bGUnLFxyXG4gICAgICBpbm5lckhUTUw6IHZqcy5jYXBpdGFsaXplKHRoaXMua2luZF8pLFxyXG4gICAgICB0YWJpbmRleDogLTFcclxuICAgIH0pKTtcclxuICB9XHJcblxyXG4gIHRoaXMuaXRlbXMgPSB0aGlzWydjcmVhdGVJdGVtcyddKCk7XHJcblxyXG4gIGlmICh0aGlzLml0ZW1zKSB7XHJcbiAgICAvLyBBZGQgbWVudSBpdGVtcyB0byB0aGUgbWVudVxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIG1lbnUuYWRkSXRlbSh0aGlzLml0ZW1zW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBtZW51O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSB0aGUgbGlzdCBvZiBtZW51IGl0ZW1zLiBTcGVjaWZpYyB0byBlYWNoIHN1YmNsYXNzLlxyXG4gKi9cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUl0ZW1zID0gZnVuY3Rpb24oKXt9O1xyXG5cclxuLyoqIEBpbmhlcml0RG9jICovXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5jbGFzc05hbWUgKyAnIHZqcy1tZW51LWJ1dHRvbiAnICsgdmpzLkJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLy8gRm9jdXMgLSBBZGQga2V5Ym9hcmQgZnVuY3Rpb25hbGl0eSB0byBlbGVtZW50XHJcbi8vIFRoaXMgZnVuY3Rpb24gaXMgbm90IG5lZWRlZCBhbnltb3JlLiBJbnN0ZWFkLCB0aGUga2V5Ym9hcmQgZnVuY3Rpb25hbGl0eSBpcyBoYW5kbGVkIGJ5XHJcbi8vIHRyZWF0aW5nIHRoZSBidXR0b24gYXMgdHJpZ2dlcmluZyBhIHN1Ym1lbnUuIFdoZW4gdGhlIGJ1dHRvbiBpcyBwcmVzc2VkLCB0aGUgc3VibWVudVxyXG4vLyBhcHBlYXJzLiBQcmVzc2luZyB0aGUgYnV0dG9uIGFnYWluIG1ha2VzIHRoZSBzdWJtZW51IGRpc2FwcGVhci5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbigpe307XHJcbi8vIENhbid0IHR1cm4gb2ZmIGxpc3QgZGlzcGxheSB0aGF0IHdlIHR1cm5lZCBvbiB3aXRoIGZvY3VzLCBiZWNhdXNlIGxpc3Qgd291bGQgZ28gYXdheS5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uQmx1ciA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICAvLyBXaGVuIHlvdSBjbGljayB0aGUgYnV0dG9uIGl0IGFkZHMgZm9jdXMsIHdoaWNoIHdpbGwgc2hvdyB0aGUgbWVudSBpbmRlZmluaXRlbHkuXHJcbiAgLy8gU28gd2UnbGwgcmVtb3ZlIGZvY3VzIHdoZW4gdGhlIG1vdXNlIGxlYXZlcyB0aGUgYnV0dG9uLlxyXG4gIC8vIEZvY3VzIGlzIG5lZWRlZCBmb3IgdGFiIG5hdmlnYXRpb24uXHJcbiAgdGhpcy5vbmUoJ21vdXNlb3V0JywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgIHRoaXMubWVudS51bmxvY2tTaG93aW5nKCk7XHJcbiAgICB0aGlzLmVsXy5ibHVyKCk7XHJcbiAgfSkpO1xyXG4gIGlmICh0aGlzLmJ1dHRvblByZXNzZWRfKXtcclxuICAgIHRoaXMudW5wcmVzc0J1dHRvbigpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnByZXNzQnV0dG9uKCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uS2V5UHJlc3MgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgLy8gQ2hlY2sgZm9yIHNwYWNlIGJhciAoMzIpIG9yIGVudGVyICgxMykga2V5c1xyXG4gIGlmIChldmVudC53aGljaCA9PSAzMiB8fCBldmVudC53aGljaCA9PSAxMykge1xyXG4gICAgaWYgKHRoaXMuYnV0dG9uUHJlc3NlZF8pe1xyXG4gICAgICB0aGlzLnVucHJlc3NCdXR0b24oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucHJlc3NCdXR0b24oKTtcclxuICAgIH1cclxuICAvLyBDaGVjayBmb3IgZXNjYXBlICgyNykga2V5XHJcbiAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PSAyNyl7XHJcbiAgICBpZiAodGhpcy5idXR0b25QcmVzc2VkXyl7XHJcbiAgICAgIHRoaXMudW5wcmVzc0J1dHRvbigpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5wcmVzc0J1dHRvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5idXR0b25QcmVzc2VkXyA9IHRydWU7XHJcbiAgdGhpcy5tZW51LmxvY2tTaG93aW5nKCk7XHJcbiAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCB0cnVlKTtcclxuICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuaXRlbXNbMF0uZWwoKS5mb2N1cygpOyAvLyBzZXQgdGhlIGZvY3VzIHRvIHRoZSB0aXRsZSBvZiB0aGUgc3VibWVudVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS51bnByZXNzQnV0dG9uID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmJ1dHRvblByZXNzZWRfID0gZmFsc2U7XHJcbiAgdGhpcy5tZW51LnVubG9ja1Nob3dpbmcoKTtcclxuICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIGZhbHNlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbiBpbnN0YW5jZSBvZiB0aGUgYHZqcy5QbGF5ZXJgIGNsYXNzIGlzIGNyZWF0ZWQgd2hlbiBhbnkgb2YgdGhlIFZpZGVvLmpzIHNldHVwIG1ldGhvZHMgYXJlIHVzZWQgdG8gaW5pdGlhbGl6ZSBhIHZpZGVvLlxyXG4gKlxyXG4gKiBgYGBqc1xyXG4gKiB2YXIgbXlQbGF5ZXIgPSB2aWRlb2pzKCdleGFtcGxlX3ZpZGVvXzEnKTtcclxuICogYGBgXHJcbiAqXHJcbiAqIEluIHRoZSBmb2xsd2luZyBleGFtcGxlLCB0aGUgYGRhdGEtc2V0dXBgIGF0dHJpYnV0ZSB0ZWxscyB0aGUgVmlkZW8uanMgbGlicmFyeSB0byBjcmVhdGUgYSBwbGF5ZXIgaW5zdGFuY2Ugd2hlbiB0aGUgbGlicmFyeSBpcyByZWFkeS5cclxuICpcclxuICogYGBgaHRtbFxyXG4gKiA8dmlkZW8gaWQ9XCJleGFtcGxlX3ZpZGVvXzFcIiBkYXRhLXNldHVwPSd7fScgY29udHJvbHM+XHJcbiAqICAgPHNvdXJjZSBzcmM9XCJteS1zb3VyY2UubXA0XCIgdHlwZT1cInZpZGVvL21wNFwiPlxyXG4gKiA8L3ZpZGVvPlxyXG4gKiBgYGBcclxuICpcclxuICogQWZ0ZXIgYW4gaW5zdGFuY2UgaGFzIGJlZW4gY3JlYXRlZCBpdCBjYW4gYmUgYWNjZXNzZWQgZ2xvYmFsbHkgdXNpbmcgYFZpZGVvKCdleGFtcGxlX3ZpZGVvXzEnKWAuXHJcbiAqXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXh0ZW5kcyB2anMuQ29tcG9uZW50XHJcbiAqL1xyXG52anMuUGxheWVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG5cclxuICAvKipcclxuICAgKiBwbGF5ZXIncyBjb25zdHJ1Y3RvciBmdW5jdGlvblxyXG4gICAqXHJcbiAgICogQGNvbnN0cnVjdHNcclxuICAgKiBAbWV0aG9kIGluaXRcclxuICAgKiBAcGFyYW0ge0VsZW1lbnR9IHRhZyAgICAgICAgVGhlIG9yaWdpbmFsIHZpZGVvIHRhZyB1c2VkIGZvciBjb25maWd1cmluZyBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zICAgIFBsYXllciBvcHRpb25zXHJcbiAgICogQHBhcmFtIHtGdW5jdGlvbj19IHJlYWR5ICAgIFJlYWR5IGNhbGxiYWNrIGZ1bmN0aW9uXHJcbiAgICovXHJcbiAgaW5pdDogZnVuY3Rpb24odGFnLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB0aGlzLnRhZyA9IHRhZzsgLy8gU3RvcmUgdGhlIG9yaWdpbmFsIHRhZyB1c2VkIHRvIHNldCBvcHRpb25zXHJcblxyXG4gICAgLy8gU2V0IE9wdGlvbnNcclxuICAgIC8vIFRoZSBvcHRpb25zIGFyZ3VtZW50IG92ZXJyaWRlcyBvcHRpb25zIHNldCBpbiB0aGUgdmlkZW8gdGFnXHJcbiAgICAvLyB3aGljaCBvdmVycmlkZXMgZ2xvYmFsbHkgc2V0IG9wdGlvbnMuXHJcbiAgICAvLyBUaGlzIGxhdHRlciBwYXJ0IGNvaW5jaWRlcyB3aXRoIHRoZSBsb2FkIG9yZGVyXHJcbiAgICAvLyAodGFnIG11c3QgZXhpc3QgYmVmb3JlIFBsYXllcilcclxuICAgIG9wdGlvbnMgPSB2anMub2JqLm1lcmdlKHRoaXMuZ2V0VGFnU2V0dGluZ3ModGFnKSwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gQ2FjaGUgZm9yIHZpZGVvIHByb3BlcnR5IHZhbHVlcy5cclxuICAgIHRoaXMuY2FjaGVfID0ge307XHJcblxyXG4gICAgLy8gU2V0IHBvc3RlclxyXG4gICAgdGhpcy5wb3N0ZXJfID0gb3B0aW9uc1sncG9zdGVyJ107XHJcbiAgICAvLyBTZXQgY29udHJvbHNcclxuICAgIHRoaXMuY29udHJvbHNfID0gb3B0aW9uc1snY29udHJvbHMnXTtcclxuICAgIC8vIE9yaWdpbmFsIHRhZyBzZXR0aW5ncyBzdG9yZWQgaW4gb3B0aW9uc1xyXG4gICAgLy8gbm93IHJlbW92ZSBpbW1lZGlhdGVseSBzbyBuYXRpdmUgY29udHJvbHMgZG9uJ3QgZmxhc2guXHJcbiAgICAvLyBNYXkgYmUgdHVybmVkIGJhY2sgb24gYnkgSFRNTDUgdGVjaCBpZiBuYXRpdmVDb250cm9sc0ZvclRvdWNoIGlzIHRydWVcclxuICAgIHRhZy5jb250cm9scyA9IGZhbHNlO1xyXG5cclxuICAgIC8vIFJ1biBiYXNlIGNvbXBvbmVudCBpbml0aWFsaXppbmcgd2l0aCBuZXcgb3B0aW9ucy5cclxuICAgIC8vIEJ1aWxkcyB0aGUgZWxlbWVudCB0aHJvdWdoIGNyZWF0ZUVsKClcclxuICAgIC8vIEluaXRzIGFuZCBlbWJlZHMgYW55IGNoaWxkIGNvbXBvbmVudHMgaW4gb3B0c1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHRoaXMsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICAvLyBVcGRhdGUgY29udHJvbHMgY2xhc3NOYW1lLiBDYW4ndCBkbyB0aGlzIHdoZW4gdGhlIGNvbnRyb2xzIGFyZSBpbml0aWFsbHlcclxuICAgIC8vIHNldCBiZWNhdXNlIHRoZSBlbGVtZW50IGRvZXNuJ3QgZXhpc3QgeWV0LlxyXG4gICAgaWYgKHRoaXMuY29udHJvbHMoKSkge1xyXG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtY29udHJvbHMtZW5hYmxlZCcpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWNvbnRyb2xzLWRpc2FibGVkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVE9ETzogTWFrZSB0aGlzIHNtYXJ0ZXIuIFRvZ2dsZSB1c2VyIHN0YXRlIGJldHdlZW4gdG91Y2hpbmcvbW91c2luZ1xyXG4gICAgLy8gdXNpbmcgZXZlbnRzLCBzaW5jZSBkZXZpY2VzIGNhbiBoYXZlIGJvdGggdG91Y2ggYW5kIG1vdXNlIGV2ZW50cy5cclxuICAgIC8vIGlmICh2anMuVE9VQ0hfRU5BQkxFRCkge1xyXG4gICAgLy8gICB0aGlzLmFkZENsYXNzKCd2anMtdG91Y2gtZW5hYmxlZCcpO1xyXG4gICAgLy8gfVxyXG5cclxuICAgIC8vIEZpcnN0cGxheSBldmVudCBpbXBsaW1lbnRhdGlvbi4gTm90IHNvbGQgb24gdGhlIGV2ZW50IHlldC5cclxuICAgIC8vIENvdWxkIHByb2JhYmx5IGp1c3QgY2hlY2sgY3VycmVudFRpbWU9PTA/XHJcbiAgICB0aGlzLm9uZSgncGxheScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICB2YXIgZnBFdmVudCA9IHsgdHlwZTogJ2ZpcnN0cGxheScsIHRhcmdldDogdGhpcy5lbF8gfTtcclxuICAgICAgLy8gVXNpbmcgdmpzLnRyaWdnZXIgc28gd2UgY2FuIGNoZWNrIGlmIGRlZmF1bHQgd2FzIHByZXZlbnRlZFxyXG4gICAgICB2YXIga2VlcEdvaW5nID0gdmpzLnRyaWdnZXIodGhpcy5lbF8sIGZwRXZlbnQpO1xyXG5cclxuICAgICAgaWYgKCFrZWVwR29pbmcpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uKCdlbmRlZCcsIHRoaXMub25FbmRlZCk7XHJcbiAgICB0aGlzLm9uKCdwbGF5JywgdGhpcy5vblBsYXkpO1xyXG4gICAgdGhpcy5vbignZmlyc3RwbGF5JywgdGhpcy5vbkZpcnN0UGxheSk7XHJcbiAgICB0aGlzLm9uKCdwYXVzZScsIHRoaXMub25QYXVzZSk7XHJcbiAgICB0aGlzLm9uKCdwcm9ncmVzcycsIHRoaXMub25Qcm9ncmVzcyk7XHJcbiAgICB0aGlzLm9uKCdkdXJhdGlvbmNoYW5nZScsIHRoaXMub25EdXJhdGlvbkNoYW5nZSk7XHJcbiAgICB0aGlzLm9uKCdlcnJvcicsIHRoaXMub25FcnJvcik7XHJcbiAgICB0aGlzLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgdGhpcy5vbkZ1bGxzY3JlZW5DaGFuZ2UpO1xyXG5cclxuICAgIC8vIE1ha2UgcGxheWVyIGVhc2lseSBmaW5kYWJsZSBieSBJRFxyXG4gICAgdmpzLnBsYXllcnNbdGhpcy5pZF9dID0gdGhpcztcclxuXHJcbiAgICBpZiAob3B0aW9uc1sncGx1Z2lucyddKSB7XHJcbiAgICAgIHZqcy5vYmouZWFjaChvcHRpb25zWydwbHVnaW5zJ10sIGZ1bmN0aW9uKGtleSwgdmFsKXtcclxuICAgICAgICB0aGlzW2tleV0odmFsKTtcclxuICAgICAgfSwgdGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5saXN0ZW5Gb3JVc2VyQWN0aXZpdHkoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFBsYXllciBpbnN0YW5jZSBvcHRpb25zLCBzdXJmYWNlZCB1c2luZyB2anMub3B0aW9uc1xyXG4gKiB2anMub3B0aW9ucyA9IHZqcy5QbGF5ZXIucHJvdG90eXBlLm9wdGlvbnNfXHJcbiAqIE1ha2UgY2hhbmdlcyBpbiB2anMub3B0aW9ucywgbm90IGhlcmUuXHJcbiAqIEFsbCBvcHRpb25zIHNob3VsZCB1c2Ugc3RyaW5nIGtleXMgc28gdGhleSBhdm9pZFxyXG4gKiByZW5hbWluZyBieSBjbG9zdXJlIGNvbXBpbGVyXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zXyA9IHZqcy5vcHRpb25zO1xyXG5cclxuLyoqXHJcbiAqIERlc3Ryb3lzIHRoZSB2aWRlbyBwbGF5ZXIgYW5kIGRvZXMgYW55IG5lY2Vzc2FyeSBjbGVhbnVwXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5kaXNwb3NlKCk7XHJcbiAqXHJcbiAqIFRoaXMgaXMgZXNwZWNpYWxseSBoZWxwZnVsIGlmIHlvdSBhcmUgZHluYW1pY2FsbHkgYWRkaW5nIGFuZCByZW1vdmluZyB2aWRlb3NcclxuICogdG8vZnJvbSB0aGUgRE9NLlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50cmlnZ2VyKCdkaXNwb3NlJyk7XHJcbiAgLy8gcHJldmVudCBkaXNwb3NlIGZyb20gYmVpbmcgY2FsbGVkIHR3aWNlXHJcbiAgdGhpcy5vZmYoJ2Rpc3Bvc2UnKTtcclxuXHJcbiAgLy8gS2lsbCByZWZlcmVuY2UgdG8gdGhpcyBwbGF5ZXJcclxuICB2anMucGxheWVyc1t0aGlzLmlkX10gPSBudWxsO1xyXG4gIGlmICh0aGlzLnRhZyAmJiB0aGlzLnRhZ1sncGxheWVyJ10pIHsgdGhpcy50YWdbJ3BsYXllciddID0gbnVsbDsgfVxyXG4gIGlmICh0aGlzLmVsXyAmJiB0aGlzLmVsX1sncGxheWVyJ10pIHsgdGhpcy5lbF9bJ3BsYXllciddID0gbnVsbDsgfVxyXG5cclxuICAvLyBFbnN1cmUgdGhhdCB0cmFja2luZyBwcm9ncmVzcyBhbmQgdGltZSBwcm9ncmVzcyB3aWxsIHN0b3AgYW5kIHBsYXRlciBkZWxldGVkXHJcbiAgdGhpcy5zdG9wVHJhY2tpbmdQcm9ncmVzcygpO1xyXG4gIHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUoKTtcclxuXHJcbiAgaWYgKHRoaXMudGVjaCkgeyB0aGlzLnRlY2guZGlzcG9zZSgpOyB9XHJcblxyXG4gIC8vIENvbXBvbmVudCBkaXNwb3NlXHJcbiAgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuZ2V0VGFnU2V0dGluZ3MgPSBmdW5jdGlvbih0YWcpe1xyXG4gIHZhciBvcHRpb25zID0ge1xyXG4gICAgJ3NvdXJjZXMnOiBbXSxcclxuICAgICd0cmFja3MnOiBbXVxyXG4gIH07XHJcblxyXG4gIHZqcy5vYmoubWVyZ2Uob3B0aW9ucywgdmpzLmdldEF0dHJpYnV0ZVZhbHVlcyh0YWcpKTtcclxuXHJcbiAgLy8gR2V0IHRhZyBjaGlsZHJlbiBzZXR0aW5nc1xyXG4gIGlmICh0YWcuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICB2YXIgY2hpbGRyZW4sIGNoaWxkLCBjaGlsZE5hbWUsIGksIGo7XHJcblxyXG4gICAgY2hpbGRyZW4gPSB0YWcuY2hpbGROb2RlcztcclxuXHJcbiAgICBmb3IgKGk9MCxqPWNoaWxkcmVuLmxlbmd0aDsgaTxqOyBpKyspIHtcclxuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcclxuICAgICAgLy8gQ2hhbmdlIGNhc2UgbmVlZGVkOiBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvbm9kZW5hbWUtY2FzZS1zZW5zaXRpdml0eS9cclxuICAgICAgY2hpbGROYW1lID0gY2hpbGQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKGNoaWxkTmFtZSA9PT0gJ3NvdXJjZScpIHtcclxuICAgICAgICBvcHRpb25zWydzb3VyY2VzJ10ucHVzaCh2anMuZ2V0QXR0cmlidXRlVmFsdWVzKGNoaWxkKSk7XHJcbiAgICAgIH0gZWxzZSBpZiAoY2hpbGROYW1lID09PSAndHJhY2snKSB7XHJcbiAgICAgICAgb3B0aW9uc1sndHJhY2tzJ10ucHVzaCh2anMuZ2V0QXR0cmlidXRlVmFsdWVzKGNoaWxkKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvcHRpb25zO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBlbCA9IHRoaXMuZWxfID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jyk7XHJcbiAgdmFyIHRhZyA9IHRoaXMudGFnO1xyXG5cclxuICAvLyBSZW1vdmUgd2lkdGgvaGVpZ2h0IGF0dHJzIGZyb20gdGFnIHNvIENTUyBjYW4gbWFrZSBpdCAxMDAlIHdpZHRoL2hlaWdodFxyXG4gIHRhZy5yZW1vdmVBdHRyaWJ1dGUoJ3dpZHRoJyk7XHJcbiAgdGFnLnJlbW92ZUF0dHJpYnV0ZSgnaGVpZ2h0Jyk7XHJcbiAgLy8gRW1wdHkgdmlkZW8gdGFnIHRyYWNrcyBzbyB0aGUgYnVpbHQtaW4gcGxheWVyIGRvZXNuJ3QgdXNlIHRoZW0gYWxzby5cclxuICAvLyBUaGlzIG1heSBub3QgYmUgZmFzdCBlbm91Z2ggdG8gc3RvcCBIVE1MNSBicm93c2VycyBmcm9tIHJlYWRpbmcgdGhlIHRhZ3NcclxuICAvLyBzbyB3ZSdsbCBuZWVkIHRvIHR1cm4gb2ZmIGFueSBkZWZhdWx0IHRyYWNrcyBpZiB3ZSdyZSBtYW51YWxseSBkb2luZ1xyXG4gIC8vIGNhcHRpb25zIGFuZCBzdWJ0aXRsZXMuIHZpZGVvRWxlbWVudC50ZXh0VHJhY2tzXHJcbiAgaWYgKHRhZy5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgIHZhciBub2Rlcywgbm9kZXNMZW5ndGgsIGksIG5vZGUsIG5vZGVOYW1lLCByZW1vdmVOb2RlcztcclxuXHJcbiAgICBub2RlcyA9IHRhZy5jaGlsZE5vZGVzO1xyXG4gICAgbm9kZXNMZW5ndGggPSBub2Rlcy5sZW5ndGg7XHJcbiAgICByZW1vdmVOb2RlcyA9IFtdO1xyXG5cclxuICAgIHdoaWxlIChub2Rlc0xlbmd0aC0tKSB7XHJcbiAgICAgIG5vZGUgPSBub2Rlc1tub2Rlc0xlbmd0aF07XHJcbiAgICAgIG5vZGVOYW1lID0gbm9kZS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAobm9kZU5hbWUgPT09ICd0cmFjaycpIHtcclxuICAgICAgICByZW1vdmVOb2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZm9yIChpPTA7IGk8cmVtb3ZlTm9kZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgdGFnLnJlbW92ZUNoaWxkKHJlbW92ZU5vZGVzW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIE1ha2Ugc3VyZSB0YWcgSUQgZXhpc3RzXHJcbiAgdGFnLmlkID0gdGFnLmlkIHx8ICd2anNfdmlkZW9fJyArIHZqcy5ndWlkKys7XHJcblxyXG4gIC8vIEdpdmUgdmlkZW8gdGFnIElEIGFuZCBjbGFzcyB0byBwbGF5ZXIgZGl2XHJcbiAgLy8gSUQgd2lsbCBub3cgcmVmZXJlbmNlIHBsYXllciBib3gsIG5vdCB0aGUgdmlkZW8gdGFnXHJcbiAgZWwuaWQgPSB0YWcuaWQ7XHJcbiAgZWwuY2xhc3NOYW1lID0gdGFnLmNsYXNzTmFtZTtcclxuXHJcbiAgLy8gVXBkYXRlIHRhZyBpZC9jbGFzcyBmb3IgdXNlIGFzIEhUTUw1IHBsYXliYWNrIHRlY2hcclxuICAvLyBNaWdodCB0aGluayB3ZSBzaG91bGQgZG8gdGhpcyBhZnRlciBlbWJlZGRpbmcgaW4gY29udGFpbmVyIHNvIC52anMtdGVjaCBjbGFzc1xyXG4gIC8vIGRvZXNuJ3QgZmxhc2ggMTAwJSB3aWR0aC9oZWlnaHQsIGJ1dCBjbGFzcyBvbmx5IGFwcGxpZXMgd2l0aCAudmlkZW8tanMgcGFyZW50XHJcbiAgdGFnLmlkICs9ICdfaHRtbDVfYXBpJztcclxuICB0YWcuY2xhc3NOYW1lID0gJ3Zqcy10ZWNoJztcclxuXHJcbiAgLy8gTWFrZSBwbGF5ZXIgZmluZGFibGUgb24gZWxlbWVudHNcclxuICB0YWdbJ3BsYXllciddID0gZWxbJ3BsYXllciddID0gdGhpcztcclxuICAvLyBEZWZhdWx0IHN0YXRlIG9mIHZpZGVvIGlzIHBhdXNlZFxyXG4gIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1wYXVzZWQnKTtcclxuXHJcbiAgLy8gTWFrZSBib3ggdXNlIHdpZHRoL2hlaWdodCBvZiB0YWcsIG9yIHJlbHkgb24gZGVmYXVsdCBpbXBsZW1lbnRhdGlvblxyXG4gIC8vIEVuZm9yY2Ugd2l0aCBDU1Mgc2luY2Ugd2lkdGgvaGVpZ2h0IGF0dHJzIGRvbid0IHdvcmsgb24gZGl2c1xyXG4gIHRoaXMud2lkdGgodGhpcy5vcHRpb25zX1snd2lkdGgnXSwgdHJ1ZSk7IC8vICh0cnVlKSBTa2lwIHJlc2l6ZSBsaXN0ZW5lciBvbiBsb2FkXHJcbiAgdGhpcy5oZWlnaHQodGhpcy5vcHRpb25zX1snaGVpZ2h0J10sIHRydWUpO1xyXG5cclxuICAvLyBXcmFwIHZpZGVvIHRhZyBpbiBkaXYgKGVsL2JveCkgY29udGFpbmVyXHJcbiAgaWYgKHRhZy5wYXJlbnROb2RlKSB7XHJcbiAgICB0YWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWwsIHRhZyk7XHJcbiAgfVxyXG4gIHZqcy5pbnNlcnRGaXJzdCh0YWcsIGVsKTsgLy8gQnJlYWtzIGlQaG9uZSwgZml4ZWQgaW4gSFRNTDUgc2V0dXAuXHJcblxyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbi8vIC8qIE1lZGlhIFRlY2hub2xvZ3kgKHRlY2gpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIExvYWQvQ3JlYXRlIGFuIGluc3RhbmNlIG9mIHBsYXliYWNrIHRlY2hubG9neSBpbmNsdWRpbmcgZWxlbWVudCBhbmQgQVBJIG1ldGhvZHNcclxuLy8gQW5kIGFwcGVuZCBwbGF5YmFjayBlbGVtZW50IGluIHBsYXllciBkaXYuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmxvYWRUZWNoID0gZnVuY3Rpb24odGVjaE5hbWUsIHNvdXJjZSl7XHJcblxyXG4gIC8vIFBhdXNlIGFuZCByZW1vdmUgY3VycmVudCBwbGF5YmFjayB0ZWNobm9sb2d5XHJcbiAgaWYgKHRoaXMudGVjaCkge1xyXG4gICAgdGhpcy51bmxvYWRUZWNoKCk7XHJcblxyXG4gIC8vIGlmIHRoaXMgaXMgdGhlIGZpcnN0IHRpbWUgbG9hZGluZywgSFRNTDUgdGFnIHdpbGwgZXhpc3QgYnV0IHdvbid0IGJlIGluaXRpYWxpemVkXHJcbiAgLy8gc28gd2UgbmVlZCB0byByZW1vdmUgaXQgaWYgd2UncmUgbm90IGxvYWRpbmcgSFRNTDVcclxuICB9IGVsc2UgaWYgKHRlY2hOYW1lICE9PSAnSHRtbDUnICYmIHRoaXMudGFnKSB7XHJcbiAgICB2anMuSHRtbDUuZGlzcG9zZU1lZGlhRWxlbWVudCh0aGlzLnRhZyk7XHJcbiAgICB0aGlzLnRhZyA9IG51bGw7XHJcbiAgfVxyXG5cclxuICB0aGlzLnRlY2hOYW1lID0gdGVjaE5hbWU7XHJcblxyXG4gIC8vIFR1cm4gb2ZmIEFQSSBhY2Nlc3MgYmVjYXVzZSB3ZSdyZSBsb2FkaW5nIGEgbmV3IHRlY2ggdGhhdCBtaWdodCBsb2FkIGFzeW5jaHJvbm91c2x5XHJcbiAgdGhpcy5pc1JlYWR5XyA9IGZhbHNlO1xyXG5cclxuICB2YXIgdGVjaFJlYWR5ID0gZnVuY3Rpb24oKXtcclxuICAgIHRoaXMucGxheWVyXy50cmlnZ2VyUmVhZHkoKTtcclxuXHJcbiAgICAvLyBNYW51YWxseSB0cmFjayBwcm9ncmVzcyBpbiBjYXNlcyB3aGVyZSB0aGUgYnJvd3Nlci9mbGFzaCBwbGF5ZXIgZG9lc24ndCByZXBvcnQgaXQuXHJcbiAgICBpZiAoIXRoaXMuZmVhdHVyZXNbJ3Byb2dyZXNzRXZlbnRzJ10pIHtcclxuICAgICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFByb2dyZXNzT24oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNYW51YWxseSB0cmFjayB0aW1ldWRwYXRlcyBpbiBjYXNlcyB3aGVyZSB0aGUgYnJvd3Nlci9mbGFzaCBwbGF5ZXIgZG9lc24ndCByZXBvcnQgaXQuXHJcbiAgICBpZiAoIXRoaXMuZmVhdHVyZXNbJ3RpbWV1cGRhdGVFdmVudHMnXSkge1xyXG4gICAgICB0aGlzLnBsYXllcl8ubWFudWFsVGltZVVwZGF0ZXNPbigpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIEdyYWIgdGVjaC1zcGVjaWZpYyBvcHRpb25zIGZyb20gcGxheWVyIG9wdGlvbnMgYW5kIGFkZCBzb3VyY2UgYW5kIHBhcmVudCBlbGVtZW50IHRvIHVzZS5cclxuICB2YXIgdGVjaE9wdGlvbnMgPSB2anMub2JqLm1lcmdlKHsgJ3NvdXJjZSc6IHNvdXJjZSwgJ3BhcmVudEVsJzogdGhpcy5lbF8gfSwgdGhpcy5vcHRpb25zX1t0ZWNoTmFtZS50b0xvd2VyQ2FzZSgpXSk7XHJcblxyXG4gIGlmIChzb3VyY2UpIHtcclxuICAgIGlmIChzb3VyY2Uuc3JjID09IHRoaXMuY2FjaGVfLnNyYyAmJiB0aGlzLmNhY2hlXy5jdXJyZW50VGltZSA+IDApIHtcclxuICAgICAgdGVjaE9wdGlvbnNbJ3N0YXJ0VGltZSddID0gdGhpcy5jYWNoZV8uY3VycmVudFRpbWU7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5jYWNoZV8uc3JjID0gc291cmNlLnNyYztcclxuICB9XHJcblxyXG4gIC8vIEluaXRpYWxpemUgdGVjaCBpbnN0YW5jZVxyXG4gIHRoaXMudGVjaCA9IG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVt0ZWNoTmFtZV0odGhpcywgdGVjaE9wdGlvbnMpO1xyXG5cclxuICB0aGlzLnRlY2gucmVhZHkodGVjaFJlYWR5KTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVubG9hZFRlY2ggPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuaXNSZWFkeV8gPSBmYWxzZTtcclxuICB0aGlzLnRlY2guZGlzcG9zZSgpO1xyXG5cclxuICAvLyBUdXJuIG9mZiBhbnkgbWFudWFsIHByb2dyZXNzIG9yIHRpbWV1cGRhdGUgdHJhY2tpbmdcclxuICBpZiAodGhpcy5tYW51YWxQcm9ncmVzcykgeyB0aGlzLm1hbnVhbFByb2dyZXNzT2ZmKCk7IH1cclxuXHJcbiAgaWYgKHRoaXMubWFudWFsVGltZVVwZGF0ZXMpIHsgdGhpcy5tYW51YWxUaW1lVXBkYXRlc09mZigpOyB9XHJcblxyXG4gIHRoaXMudGVjaCA9IGZhbHNlO1xyXG59O1xyXG5cclxuLy8gVGhlcmUncyBtYW55IGlzc3VlcyBhcm91bmQgY2hhbmdpbmcgdGhlIHNpemUgb2YgYSBGbGFzaCAob3Igb3RoZXIgcGx1Z2luKSBvYmplY3QuXHJcbi8vIEZpcnN0IGlzIGEgcGx1Z2luIHJlbG9hZCBpc3N1ZSBpbiBGaXJlZm94IHRoYXQgaGFzIGJlZW4gYXJvdW5kIGZvciAxMSB5ZWFyczogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTAyNjhcclxuLy8gVGhlbiB3aXRoIHRoZSBuZXcgZnVsbHNjcmVlbiBBUEksIE1vemlsbGEgYW5kIHdlYmtpdCBicm93c2VycyB3aWxsIHJlbG9hZCB0aGUgZmxhc2ggb2JqZWN0IGFmdGVyIGdvaW5nIHRvIGZ1bGxzY3JlZW4uXHJcbi8vIFRvIGdldCBhcm91bmQgdGhpcywgd2UncmUgdW5sb2FkaW5nIHRoZSB0ZWNoLCBjYWNoaW5nIHNvdXJjZSBhbmQgY3VycmVudFRpbWUgdmFsdWVzLCBhbmQgcmVsb2FkaW5nIHRoZSB0ZWNoIG9uY2UgdGhlIHBsdWdpbiBpcyByZXNpemVkLlxyXG4vLyByZWxvYWRUZWNoOiBmdW5jdGlvbihiZXR3ZWVuRm4pe1xyXG4vLyAgIHZqcy5sb2coJ3VubG9hZGluZ1RlY2gnKVxyXG4vLyAgIHRoaXMudW5sb2FkVGVjaCgpO1xyXG4vLyAgIHZqcy5sb2coJ3VubG9hZGVkVGVjaCcpXHJcbi8vICAgaWYgKGJldHdlZW5GbikgeyBiZXR3ZWVuRm4uY2FsbCgpOyB9XHJcbi8vICAgdmpzLmxvZygnTG9hZGluZ1RlY2gnKVxyXG4vLyAgIHRoaXMubG9hZFRlY2godGhpcy50ZWNoTmFtZSwgeyBzcmM6IHRoaXMuY2FjaGVfLnNyYyB9KVxyXG4vLyAgIHZqcy5sb2coJ2xvYWRlZFRlY2gnKVxyXG4vLyB9LFxyXG5cclxuLyogRmFsbGJhY2tzIGZvciB1bnN1cHBvcnRlZCBldmVudCB0eXBlc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBNYW51YWxseSB0cmlnZ2VyIHByb2dyZXNzIGV2ZW50cyBiYXNlZCBvbiBjaGFuZ2VzIHRvIHRoZSBidWZmZXJlZCBhbW91bnRcclxuLy8gTWFueSBmbGFzaCBwbGF5ZXJzIGFuZCBvbGRlciBIVE1MNSBicm93c2VycyBkb24ndCBzZW5kIHByb2dyZXNzIG9yIHByb2dyZXNzLWxpa2UgZXZlbnRzXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm1hbnVhbFByb2dyZXNzT24gPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMubWFudWFsUHJvZ3Jlc3MgPSB0cnVlO1xyXG5cclxuICAvLyBUcmlnZ2VyIHByb2dyZXNzIHdhdGNoaW5nIHdoZW4gYSBzb3VyY2UgYmVnaW5zIGxvYWRpbmdcclxuICB0aGlzLnRyYWNrUHJvZ3Jlc3MoKTtcclxuXHJcbiAgLy8gV2F0Y2ggZm9yIGEgbmF0aXZlIHByb2dyZXNzIGV2ZW50IGNhbGwgb24gdGhlIHRlY2ggZWxlbWVudFxyXG4gIC8vIEluIEhUTUw1LCBzb21lIG9sZGVyIHZlcnNpb25zIGRvbid0IHN1cHBvcnQgdGhlIHByb2dyZXNzIGV2ZW50XHJcbiAgLy8gU28gd2UncmUgYXNzdW1pbmcgdGhleSBkb24ndCwgYW5kIHR1cm5pbmcgb2ZmIG1hbnVhbCBwcm9ncmVzcyBpZiB0aGV5IGRvLlxyXG4gIC8vIEFzIG9wcG9zZWQgdG8gZG9pbmcgdXNlciBhZ2VudCBkZXRlY3Rpb25cclxuICB0aGlzLnRlY2gub25lKCdwcm9ncmVzcycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgLy8gVXBkYXRlIGtub3duIHByb2dyZXNzIHN1cHBvcnQgZm9yIHRoaXMgcGxheWJhY2sgdGVjaG5vbG9neVxyXG4gICAgdGhpcy5mZWF0dXJlc1sncHJvZ3Jlc3NFdmVudHMnXSA9IHRydWU7XHJcblxyXG4gICAgLy8gVHVybiBvZmYgbWFudWFsIHByb2dyZXNzIHRyYWNraW5nXHJcbiAgICB0aGlzLnBsYXllcl8ubWFudWFsUHJvZ3Jlc3NPZmYoKTtcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm1hbnVhbFByb2dyZXNzT2ZmID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLm1hbnVhbFByb2dyZXNzID0gZmFsc2U7XHJcbiAgdGhpcy5zdG9wVHJhY2tpbmdQcm9ncmVzcygpO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUudHJhY2tQcm9ncmVzcyA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gIHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBEb24ndCB0cmlnZ2VyIHVubGVzcyBidWZmZXJlZCBhbW91bnQgaXMgZ3JlYXRlciB0aGFuIGxhc3QgdGltZVxyXG4gICAgLy8gbG9nKHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCwgdGhpcy5idWZmZXJlZCgpLmVuZCgwKSwgdGhpcy5kdXJhdGlvbigpKVxyXG4gICAgLyogVE9ETzogdXBkYXRlIGZvciBtdWx0aXBsZSBidWZmZXJlZCByZWdpb25zICovXHJcbiAgICBpZiAodGhpcy5jYWNoZV8uYnVmZmVyRW5kIDwgdGhpcy5idWZmZXJlZCgpLmVuZCgwKSkge1xyXG4gICAgICB0aGlzLnRyaWdnZXIoJ3Byb2dyZXNzJyk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYnVmZmVyZWRQZXJjZW50KCkgPT0gMSkge1xyXG4gICAgICB0aGlzLnN0b3BUcmFja2luZ1Byb2dyZXNzKCk7XHJcbiAgICAgIHRoaXMudHJpZ2dlcigncHJvZ3Jlc3MnKTsgLy8gTGFzdCB1cGRhdGVcclxuICAgIH1cclxuICB9KSwgNTAwKTtcclxufTtcclxudmpzLlBsYXllci5wcm90b3R5cGUuc3RvcFRyYWNraW5nUHJvZ3Jlc3MgPSBmdW5jdGlvbigpeyBjbGVhckludGVydmFsKHRoaXMucHJvZ3Jlc3NJbnRlcnZhbCk7IH07XHJcblxyXG4vKiEgVGltZSBUcmFja2luZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5tYW51YWxUaW1lVXBkYXRlc09uID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLm1hbnVhbFRpbWVVcGRhdGVzID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy5vbigncGxheScsIHRoaXMudHJhY2tDdXJyZW50VGltZSk7XHJcbiAgdGhpcy5vbigncGF1c2UnLCB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKTtcclxuICAvLyB0aW1ldXBkYXRlIGlzIGFsc28gY2FsbGVkIGJ5IC5jdXJyZW50VGltZSB3aGVuZXZlciBjdXJyZW50IHRpbWUgaXMgc2V0XHJcblxyXG4gIC8vIFdhdGNoIGZvciBuYXRpdmUgdGltZXVwZGF0ZSBldmVudFxyXG4gIHRoaXMudGVjaC5vbmUoJ3RpbWV1cGRhdGUnLCBmdW5jdGlvbigpe1xyXG4gICAgLy8gVXBkYXRlIGtub3duIHByb2dyZXNzIHN1cHBvcnQgZm9yIHRoaXMgcGxheWJhY2sgdGVjaG5vbG9neVxyXG4gICAgdGhpcy5mZWF0dXJlc1sndGltZXVwZGF0ZUV2ZW50cyddID0gdHJ1ZTtcclxuICAgIC8vIFR1cm4gb2ZmIG1hbnVhbCBwcm9ncmVzcyB0cmFja2luZ1xyXG4gICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFRpbWVVcGRhdGVzT2ZmKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5tYW51YWxUaW1lVXBkYXRlc09mZiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5tYW51YWxUaW1lVXBkYXRlcyA9IGZhbHNlO1xyXG4gIHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUoKTtcclxuICB0aGlzLm9mZigncGxheScsIHRoaXMudHJhY2tDdXJyZW50VGltZSk7XHJcbiAgdGhpcy5vZmYoJ3BhdXNlJywgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS50cmFja0N1cnJlbnRUaW1lID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5jdXJyZW50VGltZUludGVydmFsKSB7IHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUoKTsgfVxyXG4gIHRoaXMuY3VycmVudFRpbWVJbnRlcnZhbCA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnRyaWdnZXIoJ3RpbWV1cGRhdGUnKTtcclxuICB9KSwgMjUwKTsgLy8gNDIgPSAyNCBmcHMgLy8gMjUwIGlzIHdoYXQgV2Via2l0IHVzZXMgLy8gRkYgdXNlcyAxNVxyXG59O1xyXG5cclxuLy8gVHVybiBvZmYgcGxheSBwcm9ncmVzcyB0cmFja2luZyAod2hlbiBwYXVzZWQgb3IgZHJhZ2dpbmcpXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lID0gZnVuY3Rpb24oKXsgY2xlYXJJbnRlcnZhbCh0aGlzLmN1cnJlbnRUaW1lSW50ZXJ2YWwpOyB9O1xyXG5cclxuLy8gLyogUGxheWVyIGV2ZW50IGhhbmRsZXJzIChob3cgdGhlIHBsYXllciByZWFjdHMgdG8gY2VydGFpbiBldmVudHMpXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgdXNlciBhZ2VudCBiZWdpbnMgbG9va2luZyBmb3IgbWVkaWEgZGF0YVxyXG4gKiBAZXZlbnQgbG9hZHN0YXJ0XHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRTdGFydDtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBwbGF5ZXIgaGFzIGluaXRpYWwgZHVyYXRpb24gYW5kIGRpbWVuc2lvbiBpbmZvcm1hdGlvblxyXG4gKiBAZXZlbnQgbG9hZGVkbWV0YWRhdGFcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uTG9hZGVkTWV0YURhdGE7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBkb3dubG9hZGVkIGRhdGEgYXQgdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb25cclxuICogQGV2ZW50IGxvYWRlZGRhdGFcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uTG9hZGVkRGF0YTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBwbGF5ZXIgaGFzIGZpbmlzaGVkIGRvd25sb2FkaW5nIHRoZSBzb3VyY2UgZGF0YVxyXG4gKiBAZXZlbnQgbG9hZGVkYWxsZGF0YVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Mb2FkZWRBbGxEYXRhO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW5ldmVyIHRoZSBtZWRpYSBiZWdpbnMgb3IgcmVzdW1lcyBwbGF5YmFja1xyXG4gKiBAZXZlbnQgcGxheVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25QbGF5ID0gZnVuY3Rpb24oKXtcclxuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtcGF1c2VkJyk7XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXBsYXlpbmcnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB0aGUgZmlyc3QgdGltZSBhIHZpZGVvIGlzIHBsYXllZFxyXG4gKlxyXG4gKiBOb3QgcGFydCBvZiB0aGUgSExTIHNwZWMsIGFuZCB3ZSdyZSBub3Qgc3VyZSBpZiB0aGlzIGlzIHRoZSBiZXN0XHJcbiAqIGltcGxlbWVudGF0aW9uIHlldCwgc28gdXNlIHNwYXJpbmdseS4gSWYgeW91IGRvbid0IGhhdmUgYSByZWFzb24gdG9cclxuICogcHJldmVudCBwbGF5YmFjaywgdXNlIGBteVBsYXllci5vbmUoJ3BsYXknKTtgIGluc3RlYWQuXHJcbiAqXHJcbiAqIEBldmVudCBmaXJzdHBsYXlcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRmlyc3RQbGF5ID0gZnVuY3Rpb24oKXtcclxuICAgIC8vSWYgdGhlIGZpcnN0IHN0YXJ0dGltZSBhdHRyaWJ1dGUgaXMgc3BlY2lmaWVkXHJcbiAgICAvL3RoZW4gd2Ugd2lsbCBzdGFydCBhdCB0aGUgZ2l2ZW4gb2Zmc2V0IGluIHNlY29uZHNcclxuICAgIGlmKHRoaXMub3B0aW9uc19bJ3N0YXJ0dGltZSddKXtcclxuICAgICAgdGhpcy5jdXJyZW50VGltZSh0aGlzLm9wdGlvbnNfWydzdGFydHRpbWUnXSk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5hZGRDbGFzcygndmpzLWhhcy1zdGFydGVkJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbmV2ZXIgdGhlIG1lZGlhIGhhcyBiZWVuIHBhdXNlZFxyXG4gKiBAZXZlbnQgcGF1c2VcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uUGF1c2UgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wbGF5aW5nJyk7XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXBhdXNlZCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIGN1cnJlbnQgcGxheWJhY2sgcG9zaXRpb24gaGFzIGNoYW5nZWRcclxuICpcclxuICogRHVyaW5nIHBsYXliYWNrIHRoaXMgaXMgZmlyZWQgZXZlcnkgMTUtMjUwIG1pbGxpc2Vjb25kcywgZGVwbmRpbmcgb24gdGhlXHJcbiAqIHBsYXliYWNrIHRlY2hub2xvZ3kgaW4gdXNlLlxyXG4gKiBAZXZlbnQgdGltZXVwZGF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25UaW1lVXBkYXRlO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoaWxlIHRoZSB1c2VyIGFnZW50IGlzIGRvd25sb2FkaW5nIG1lZGlhIGRhdGFcclxuICogQGV2ZW50IHByb2dyZXNzXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vblByb2dyZXNzID0gZnVuY3Rpb24oKXtcclxuICAvLyBBZGQgY3VzdG9tIGV2ZW50IGZvciB3aGVuIHNvdXJjZSBpcyBmaW5pc2hlZCBkb3dubG9hZGluZy5cclxuICBpZiAodGhpcy5idWZmZXJlZFBlcmNlbnQoKSA9PSAxKSB7XHJcbiAgICB0aGlzLnRyaWdnZXIoJ2xvYWRlZGFsbGRhdGEnKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgZW5kIG9mIHRoZSBtZWRpYSByZXNvdXJjZSBpcyByZWFjaGVkIChjdXJyZW50VGltZSA9PSBkdXJhdGlvbilcclxuICogQGV2ZW50IGVuZGVkXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkVuZGVkID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5vcHRpb25zX1snbG9vcCddKSB7XHJcbiAgICB0aGlzLmN1cnJlbnRUaW1lKDApO1xyXG4gICAgdGhpcy5wbGF5KCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIGR1cmF0aW9uIG9mIHRoZSBtZWRpYSByZXNvdXJjZSBpcyBmaXJzdCBrbm93biBvciBjaGFuZ2VkXHJcbiAqIEBldmVudCBkdXJhdGlvbmNoYW5nZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25EdXJhdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gQWxsb3dzIGZvciBjYWNoZWluZyB2YWx1ZSBpbnN0ZWFkIG9mIGFza2luZyBwbGF5ZXIgZWFjaCB0aW1lLlxyXG4gIHRoaXMuZHVyYXRpb24odGhpcy50ZWNoR2V0KCdkdXJhdGlvbicpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSB2b2x1bWUgY2hhbmdlc1xyXG4gKiBAZXZlbnQgdm9sdW1lY2hhbmdlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vblZvbHVtZUNoYW5nZTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBwbGF5ZXIgc3dpdGNoZXMgaW4gb3Igb3V0IG9mIGZ1bGxzY3JlZW4gbW9kZVxyXG4gKiBAZXZlbnQgZnVsbHNjcmVlbmNoYW5nZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25GdWxsc2NyZWVuQ2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuKSB7XHJcbiAgICB0aGlzLmFkZENsYXNzKCd2anMtZnVsbHNjcmVlbicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtZnVsbHNjcmVlbicpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZXJlIGlzIGFuIGVycm9yIGluIHBsYXliYWNrXHJcbiAqIEBldmVudCBlcnJvclxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGUpIHtcclxuICB2anMubG9nKCdWaWRlbyBFcnJvcicsIGUpO1xyXG59O1xyXG5cclxuLy8gLyogUGxheWVyIEFQSVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCBmb3IgY2FjaGVkIHZhbHVlcy5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNhY2hlXztcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmdldENhY2hlID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5jYWNoZV87XHJcbn07XHJcblxyXG4vLyBQYXNzIHZhbHVlcyB0byB0aGUgcGxheWJhY2sgdGVjaFxyXG52anMuUGxheWVyLnByb3RvdHlwZS50ZWNoQ2FsbCA9IGZ1bmN0aW9uKG1ldGhvZCwgYXJnKXtcclxuICAvLyBJZiBpdCdzIG5vdCByZWFkeSB5ZXQsIGNhbGwgbWV0aG9kIHdoZW4gaXQgaXNcclxuICBpZiAodGhpcy50ZWNoICYmICF0aGlzLnRlY2guaXNSZWFkeV8pIHtcclxuICAgIHRoaXMudGVjaC5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICB0aGlzW21ldGhvZF0oYXJnKTtcclxuICAgIH0pO1xyXG5cclxuICAvLyBPdGhlcndpc2UgY2FsbCBtZXRob2Qgbm93XHJcbiAgfSBlbHNlIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMudGVjaFttZXRob2RdKGFyZyk7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgdmpzLmxvZyhlKTtcclxuICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBHZXQgY2FsbHMgY2FuJ3Qgd2FpdCBmb3IgdGhlIHRlY2gsIGFuZCBzb21ldGltZXMgZG9uJ3QgbmVlZCB0by5cclxudmpzLlBsYXllci5wcm90b3R5cGUudGVjaEdldCA9IGZ1bmN0aW9uKG1ldGhvZCl7XHJcblxyXG4gIGlmICh0aGlzLnRlY2ggJiYgdGhpcy50ZWNoLmlzUmVhZHlfKSB7XHJcblxyXG4gICAgLy8gRmxhc2ggbGlrZXMgdG8gZGllIGFuZCByZWxvYWQgd2hlbiB5b3UgaGlkZSBvciByZXBvc2l0aW9uIGl0LlxyXG4gICAgLy8gSW4gdGhlc2UgY2FzZXMgdGhlIG9iamVjdCBtZXRob2RzIGdvIGF3YXkgYW5kIHdlIGdldCBlcnJvcnMuXHJcbiAgICAvLyBXaGVuIHRoYXQgaGFwcGVucyB3ZSdsbCBjYXRjaCB0aGUgZXJyb3JzIGFuZCBpbmZvcm0gdGVjaCB0aGF0IGl0J3Mgbm90IHJlYWR5IGFueSBtb3JlLlxyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIHRoaXMudGVjaFttZXRob2RdKCk7XHJcbiAgICB9IGNhdGNoKGUpIHtcclxuICAgICAgLy8gV2hlbiBidWlsZGluZyBhZGRpdGlvbmFsIHRlY2ggbGlicywgYW4gZXhwZWN0ZWQgbWV0aG9kIG1heSBub3QgYmUgZGVmaW5lZCB5ZXRcclxuICAgICAgaWYgKHRoaXMudGVjaFttZXRob2RdID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB2anMubG9nKCdWaWRlby5qczogJyArIG1ldGhvZCArICcgbWV0aG9kIG5vdCBkZWZpbmVkIGZvciAnK3RoaXMudGVjaE5hbWUrJyBwbGF5YmFjayB0ZWNobm9sb2d5LicsIGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFdoZW4gYSBtZXRob2QgaXNuJ3QgYXZhaWxhYmxlIG9uIHRoZSBvYmplY3QgaXQgdGhyb3dzIGEgVHlwZUVycm9yXHJcbiAgICAgICAgaWYgKGUubmFtZSA9PSAnVHlwZUVycm9yJykge1xyXG4gICAgICAgICAgdmpzLmxvZygnVmlkZW8uanM6ICcgKyBtZXRob2QgKyAnIHVuYXZhaWxhYmxlIG9uICcrdGhpcy50ZWNoTmFtZSsnIHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudC4nLCBlKTtcclxuICAgICAgICAgIHRoaXMudGVjaC5pc1JlYWR5XyA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB2anMubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHN0YXJ0IG1lZGlhIHBsYXliYWNrXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5wbGF5KCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGZcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudGVjaENhbGwoJ3BsYXknKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBQYXVzZSB0aGUgdmlkZW8gcGxheWJhY2tcclxuICpcclxuICogICAgIG15UGxheWVyLnBhdXNlKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGZcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRlY2hDYWxsKCdwYXVzZScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIHRoZSBwbGF5ZXIgaXMgcGF1c2VkXHJcbiAqXHJcbiAqICAgICB2YXIgaXNQYXVzZWQgPSBteVBsYXllci5wYXVzZWQoKTtcclxuICogICAgIHZhciBpc1BsYXlpbmcgPSAhbXlQbGF5ZXIucGF1c2VkKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IGZhbHNlIGlmIHRoZSBtZWRpYSBpcyBjdXJyZW50bHkgcGxheWluZywgb3IgdHJ1ZSBvdGhlcndpc2VcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnBhdXNlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gVGhlIGluaXRpYWwgc3RhdGUgb2YgcGF1c2VkIHNob3VsZCBiZSB0cnVlIChpbiBTYWZhcmkgaXQncyBhY3R1YWxseSBmYWxzZSlcclxuICByZXR1cm4gKHRoaXMudGVjaEdldCgncGF1c2VkJykgPT09IGZhbHNlKSA/IGZhbHNlIDogdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3Igc2V0IHRoZSBjdXJyZW50IHRpbWUgKGluIHNlY29uZHMpXHJcbiAqXHJcbiAqICAgICAvLyBnZXRcclxuICogICAgIHZhciB3aGVyZVlvdUF0ID0gbXlQbGF5ZXIuY3VycmVudFRpbWUoKTtcclxuICpcclxuICogICAgIC8vIHNldFxyXG4gKiAgICAgbXlQbGF5ZXIuY3VycmVudFRpbWUoMTIwKTsgLy8gMiBtaW51dGVzIGludG8gdGhlIHZpZGVvXHJcbiAqXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBzZWNvbmRzIFRoZSB0aW1lIHRvIHNlZWsgdG9cclxuICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgVGhlIHRpbWUgaW4gc2Vjb25kcywgd2hlbiBub3Qgc2V0dGluZ1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSAgICBzZWxmLCB3aGVuIHRoZSBjdXJyZW50IHRpbWUgaXMgc2V0XHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jdXJyZW50VGltZSA9IGZ1bmN0aW9uKHNlY29uZHMpe1xyXG4gIGlmIChzZWNvbmRzICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAvLyBjYWNoZSB0aGUgbGFzdCBzZXQgdmFsdWUgZm9yIHNtb290aGVyIHNjcnViYmluZ1xyXG4gICAgdGhpcy5jYWNoZV8ubGFzdFNldEN1cnJlbnRUaW1lID0gc2Vjb25kcztcclxuXHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRDdXJyZW50VGltZScsIHNlY29uZHMpO1xyXG5cclxuICAgIC8vIGltcHJvdmUgdGhlIGFjY3VyYWN5IG9mIG1hbnVhbCB0aW1ldXBkYXRlc1xyXG4gICAgaWYgKHRoaXMubWFudWFsVGltZVVwZGF0ZXMpIHsgdGhpcy50cmlnZ2VyKCd0aW1ldXBkYXRlJyk7IH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIGNhY2hlIGxhc3QgY3VycmVudFRpbWUgYW5kIHJldHVyblxyXG4gIC8vIGRlZmF1bHQgdG8gMCBzZWNvbmRzXHJcbiAgcmV0dXJuIHRoaXMuY2FjaGVfLmN1cnJlbnRUaW1lID0gKHRoaXMudGVjaEdldCgnY3VycmVudFRpbWUnKSB8fCAwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGxlbmd0aCBpbiB0aW1lIG9mIHRoZSB2aWRlbyBpbiBzZWNvbmRzXHJcbiAqXHJcbiAqICAgICB2YXIgbGVuZ3RoT2ZWaWRlbyA9IG15UGxheWVyLmR1cmF0aW9uKCk7XHJcbiAqXHJcbiAqICoqTk9URSoqOiBUaGUgdmlkZW8gbXVzdCBoYXZlIHN0YXJ0ZWQgbG9hZGluZyBiZWZvcmUgdGhlIGR1cmF0aW9uIGNhbiBiZVxyXG4gKiBrbm93biwgYW5kIGluIHRoZSBjYXNlIG9mIEZsYXNoLCBtYXkgbm90IGJlIGtub3duIHVudGlsIHRoZSB2aWRlbyBzdGFydHNcclxuICogcGxheWluZy5cclxuICpcclxuICogQHJldHVybiB7TnVtYmVyfSBUaGUgZHVyYXRpb24gb2YgdGhlIHZpZGVvIGluIHNlY29uZHNcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oc2Vjb25kcyl7XHJcbiAgaWYgKHNlY29uZHMgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIC8vIGNhY2hlIHRoZSBsYXN0IHNldCB2YWx1ZSBmb3Igb3B0aW1paXplZCBzY3J1YmJpbmcgKGVzcC4gRmxhc2gpXHJcbiAgICB0aGlzLmNhY2hlXy5kdXJhdGlvbiA9IHBhcnNlRmxvYXQoc2Vjb25kcyk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICBpZiAodGhpcy5jYWNoZV8uZHVyYXRpb24gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5vbkR1cmF0aW9uQ2hhbmdlKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcy5jYWNoZV8uZHVyYXRpb247XHJcbn07XHJcblxyXG4vLyBDYWxjdWxhdGVzIGhvdyBtdWNoIHRpbWUgaXMgbGVmdC4gTm90IGluIHNwZWMsIGJ1dCB1c2VmdWwuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnJlbWFpbmluZ1RpbWUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmR1cmF0aW9uKCkgLSB0aGlzLmN1cnJlbnRUaW1lKCk7XHJcbn07XHJcblxyXG4vLyBodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjL3ZpZGVvLmh0bWwjZG9tLW1lZGlhLWJ1ZmZlcmVkXHJcbi8vIEJ1ZmZlcmVkIHJldHVybnMgYSB0aW1lcmFuZ2Ugb2JqZWN0LlxyXG4vLyBLaW5kIG9mIGxpa2UgYW4gYXJyYXkgb2YgcG9ydGlvbnMgb2YgdGhlIHZpZGVvIHRoYXQgaGF2ZSBiZWVuIGRvd25sb2FkZWQuXHJcbi8vIFNvIGZhciBubyBicm93c2VycyByZXR1cm4gbW9yZSB0aGFuIG9uZSByYW5nZSAocG9ydGlvbilcclxuXHJcbi8qKlxyXG4gKiBHZXQgYSBUaW1lUmFuZ2Ugb2JqZWN0IHdpdGggdGhlIHRpbWVzIG9mIHRoZSB2aWRlbyB0aGF0IGhhdmUgYmVlbiBkb3dubG9hZGVkXHJcbiAqXHJcbiAqIElmIHlvdSBqdXN0IHdhbnQgdGhlIHBlcmNlbnQgb2YgdGhlIHZpZGVvIHRoYXQncyBiZWVuIGRvd25sb2FkZWQsXHJcbiAqIHVzZSBidWZmZXJlZFBlcmNlbnQuXHJcbiAqXHJcbiAqICAgICAvLyBOdW1iZXIgb2YgZGlmZmVyZW50IHJhbmdlcyBvZiB0aW1lIGhhdmUgYmVlbiBidWZmZXJlZC4gVXN1YWxseSAxLlxyXG4gKiAgICAgbnVtYmVyT2ZSYW5nZXMgPSBidWZmZXJlZFRpbWVSYW5nZS5sZW5ndGgsXHJcbiAqXHJcbiAqICAgICAvLyBUaW1lIGluIHNlY29uZHMgd2hlbiB0aGUgZmlyc3QgcmFuZ2Ugc3RhcnRzLiBVc3VhbGx5IDAuXHJcbiAqICAgICBmaXJzdFJhbmdlU3RhcnQgPSBidWZmZXJlZFRpbWVSYW5nZS5zdGFydCgwKSxcclxuICpcclxuICogICAgIC8vIFRpbWUgaW4gc2Vjb25kcyB3aGVuIHRoZSBmaXJzdCByYW5nZSBlbmRzXHJcbiAqICAgICBmaXJzdFJhbmdlRW5kID0gYnVmZmVyZWRUaW1lUmFuZ2UuZW5kKDApLFxyXG4gKlxyXG4gKiAgICAgLy8gTGVuZ3RoIGluIHNlY29uZHMgb2YgdGhlIGZpcnN0IHRpbWUgcmFuZ2VcclxuICogICAgIGZpcnN0UmFuZ2VMZW5ndGggPSBmaXJzdFJhbmdlRW5kIC0gZmlyc3RSYW5nZVN0YXJ0O1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9IEEgbW9jayBUaW1lUmFuZ2Ugb2JqZWN0IChmb2xsb3dpbmcgSFRNTCBzcGVjKVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBidWZmZXJlZCA9IHRoaXMudGVjaEdldCgnYnVmZmVyZWQnKSxcclxuICAgICAgc3RhcnQgPSAwLFxyXG4gICAgICBidWZsYXN0ID0gYnVmZmVyZWQubGVuZ3RoIC0gMSxcclxuICAgICAgLy8gRGVmYXVsdCBlbmQgdG8gMCBhbmQgc3RvcmUgaW4gdmFsdWVzXHJcbiAgICAgIGVuZCA9IHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCA9IHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCB8fCAwO1xyXG5cclxuICBpZiAoYnVmZmVyZWQgJiYgYnVmbGFzdCA+PSAwICYmIGJ1ZmZlcmVkLmVuZChidWZsYXN0KSAhPT0gZW5kKSB7XHJcbiAgICBlbmQgPSBidWZmZXJlZC5lbmQoYnVmbGFzdCk7XHJcbiAgICAvLyBTdG9yaW5nIHZhbHVlcyBhbGxvd3MgdGhlbSBiZSBvdmVycmlkZGVuIGJ5IHNldEJ1ZmZlcmVkRnJvbVByb2dyZXNzXHJcbiAgICB0aGlzLmNhY2hlXy5idWZmZXJFbmQgPSBlbmQ7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdmpzLmNyZWF0ZVRpbWVSYW5nZShzdGFydCwgZW5kKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHBlcmNlbnQgKGFzIGEgZGVjaW1hbCkgb2YgdGhlIHZpZGVvIHRoYXQncyBiZWVuIGRvd25sb2FkZWRcclxuICpcclxuICogICAgIHZhciBob3dNdWNoSXNEb3dubG9hZGVkID0gbXlQbGF5ZXIuYnVmZmVyZWRQZXJjZW50KCk7XHJcbiAqXHJcbiAqIDAgbWVhbnMgbm9uZSwgMSBtZWFucyBhbGwuXHJcbiAqIChUaGlzIG1ldGhvZCBpc24ndCBpbiB0aGUgSFRNTDUgc3BlYywgYnV0IGl0J3MgdmVyeSBjb252ZW5pZW50KVxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IEEgZGVjaW1hbCBiZXR3ZWVuIDAgYW5kIDEgcmVwcmVzZW50aW5nIHRoZSBwZXJjZW50XHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5idWZmZXJlZFBlcmNlbnQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiAodGhpcy5kdXJhdGlvbigpKSA/IHRoaXMuYnVmZmVyZWQoKS5lbmQoMCkgLyB0aGlzLmR1cmF0aW9uKCkgOiAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBvciBzZXQgdGhlIGN1cnJlbnQgdm9sdW1lIG9mIHRoZSBtZWRpYVxyXG4gKlxyXG4gKiAgICAgLy8gZ2V0XHJcbiAqICAgICB2YXIgaG93TG91ZElzSXQgPSBteVBsYXllci52b2x1bWUoKTtcclxuICpcclxuICogICAgIC8vIHNldFxyXG4gKiAgICAgbXlQbGF5ZXIudm9sdW1lKDAuNSk7IC8vIFNldCB2b2x1bWUgdG8gaGFsZlxyXG4gKlxyXG4gKiAwIGlzIG9mZiAobXV0ZWQpLCAxLjAgaXMgYWxsIHRoZSB3YXkgdXAsIDAuNSBpcyBoYWxmIHdheS5cclxuICpcclxuICogQHBhcmFtICB7TnVtYmVyfSBwZXJjZW50QXNEZWNpbWFsIFRoZSBuZXcgdm9sdW1lIGFzIGEgZGVjaW1hbCBwZXJjZW50XHJcbiAqIEByZXR1cm4ge051bWJlcn0gICAgICAgICAgICAgICAgICBUaGUgY3VycmVudCB2b2x1bWUsIHdoZW4gZ2V0dGluZ1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSAgICAgICAgICAgICAgc2VsZiwgd2hlbiBzZXR0aW5nXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS52b2x1bWUgPSBmdW5jdGlvbihwZXJjZW50QXNEZWNpbWFsKXtcclxuICB2YXIgdm9sO1xyXG5cclxuICBpZiAocGVyY2VudEFzRGVjaW1hbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB2b2wgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBwYXJzZUZsb2F0KHBlcmNlbnRBc0RlY2ltYWwpKSk7IC8vIEZvcmNlIHZhbHVlIHRvIGJldHdlZW4gMCBhbmQgMVxyXG4gICAgdGhpcy5jYWNoZV8udm9sdW1lID0gdm9sO1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0Vm9sdW1lJywgdm9sKTtcclxuICAgIHZqcy5zZXRMb2NhbFN0b3JhZ2UoJ3ZvbHVtZScsIHZvbCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIERlZmF1bHQgdG8gMSB3aGVuIHJldHVybmluZyBjdXJyZW50IHZvbHVtZS5cclxuICB2b2wgPSBwYXJzZUZsb2F0KHRoaXMudGVjaEdldCgndm9sdW1lJykpO1xyXG4gIHJldHVybiAoaXNOYU4odm9sKSkgPyAxIDogdm9sO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGN1cnJlbnQgbXV0ZWQgc3RhdGUsIG9yIHR1cm4gbXV0ZSBvbiBvciBvZmZcclxuICpcclxuICogICAgIC8vIGdldFxyXG4gKiAgICAgdmFyIGlzVm9sdW1lTXV0ZWQgPSBteVBsYXllci5tdXRlZCgpO1xyXG4gKlxyXG4gKiAgICAgLy8gc2V0XHJcbiAqICAgICBteVBsYXllci5tdXRlZCh0cnVlKTsgLy8gbXV0ZSB0aGUgdm9sdW1lXHJcbiAqXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW49fSBtdXRlZCBUcnVlIHRvIG11dGUsIGZhbHNlIHRvIHVubXV0ZVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIG11dGUgaXMgb24sIGZhbHNlIGlmIG5vdCwgd2hlbiBnZXR0aW5nXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGYsIHdoZW4gc2V0dGluZyBtdXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5tdXRlZCA9IGZ1bmN0aW9uKG11dGVkKXtcclxuICBpZiAobXV0ZWQgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0TXV0ZWQnLCBtdXRlZCk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudGVjaEdldCgnbXV0ZWQnKSB8fCBmYWxzZTsgLy8gRGVmYXVsdCB0byBmYWxzZVxyXG59O1xyXG5cclxuLy8gQ2hlY2sgaWYgY3VycmVudCB0ZWNoIGNhbiBzdXBwb3J0IG5hdGl2ZSBmdWxsc2NyZWVuIChlLmcuIHdpdGggYnVpbHQgaW4gY29udHJvbHMgbGlrIGlPUywgc28gbm90IG91ciBmbGFzaCBzd2YpXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnN1cHBvcnRzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ3N1cHBvcnRzRnVsbFNjcmVlbicpIHx8IGZhbHNlOyB9O1xyXG5cclxuLyoqXHJcbiAqIEluY3JlYXNlIHRoZSBzaXplIG9mIHRoZSB2aWRlbyB0byBmdWxsIHNjcmVlblxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICpcclxuICogSW4gc29tZSBicm93c2VycywgZnVsbCBzY3JlZW4gaXMgbm90IHN1cHBvcnRlZCBuYXRpdmVseSwgc28gaXQgZW50ZXJzXHJcbiAqIFwiZnVsbCB3aW5kb3cgbW9kZVwiLCB3aGVyZSB0aGUgdmlkZW8gZmlsbHMgdGhlIGJyb3dzZXIgd2luZG93LlxyXG4gKiBJbiBicm93c2VycyBhbmQgZGV2aWNlcyB0aGF0IHN1cHBvcnQgbmF0aXZlIGZ1bGwgc2NyZWVuLCBzb21ldGltZXMgdGhlXHJcbiAqIGJyb3dzZXIncyBkZWZhdWx0IGNvbnRyb2xzIHdpbGwgYmUgc2hvd24sIGFuZCBub3QgdGhlIFZpZGVvLmpzIGN1c3RvbSBza2luLlxyXG4gKiBUaGlzIGluY2x1ZGVzIG1vc3QgbW9iaWxlIGRldmljZXMgKGlPUywgQW5kcm9pZCkgYW5kIG9sZGVyIHZlcnNpb25zIG9mXHJcbiAqIFNhZmFyaS5cclxuICpcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucmVxdWVzdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHZhciByZXF1ZXN0RnVsbFNjcmVlbiA9IHZqcy5zdXBwb3J0LnJlcXVlc3RGdWxsU2NyZWVuO1xyXG4gIHRoaXMuaXNGdWxsU2NyZWVuID0gdHJ1ZTtcclxuXHJcbiAgaWYgKHJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAvLyB0aGUgYnJvd3NlciBzdXBwb3J0cyBnb2luZyBmdWxsc2NyZWVuIGF0IHRoZSBlbGVtZW50IGxldmVsIHNvIHdlIGNhblxyXG4gICAgLy8gdGFrZSB0aGUgY29udHJvbHMgZnVsbHNjcmVlbiBhcyB3ZWxsIGFzIHRoZSB2aWRlb1xyXG5cclxuICAgIC8vIFRyaWdnZXIgZnVsbHNjcmVlbmNoYW5nZSBldmVudCBhZnRlciBjaGFuZ2VcclxuICAgIC8vIFdlIGhhdmUgdG8gc3BlY2lmaWNhbGx5IGFkZCB0aGlzIGVhY2ggdGltZSwgYW5kIHJlbW92ZVxyXG4gICAgLy8gd2hlbiBjYW5jZWxsaW5nIGZ1bGxzY3JlZW4uIE90aGVyd2lzZSBpZiB0aGVyZSdzIG11bHRpcGxlXHJcbiAgICAvLyBwbGF5ZXJzIG9uIGEgcGFnZSwgdGhleSB3b3VsZCBhbGwgYmUgcmVhY3RpbmcgdG8gdGhlIHNhbWUgZnVsbHNjcmVlblxyXG4gICAgLy8gZXZlbnRzXHJcbiAgICB2anMub24oZG9jdW1lbnQsIHJlcXVlc3RGdWxsU2NyZWVuLmV2ZW50TmFtZSwgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIHRoaXMuaXNGdWxsU2NyZWVuID0gZG9jdW1lbnRbcmVxdWVzdEZ1bGxTY3JlZW4uaXNGdWxsU2NyZWVuXTtcclxuXHJcbiAgICAgIC8vIElmIGNhbmNlbGxpbmcgZnVsbHNjcmVlbiwgcmVtb3ZlIGV2ZW50IGxpc3RlbmVyLlxyXG4gICAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdmpzLm9mZihkb2N1bWVudCwgcmVxdWVzdEZ1bGxTY3JlZW4uZXZlbnROYW1lLCBhcmd1bWVudHMuY2FsbGVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKCdmdWxsc2NyZWVuY2hhbmdlJyk7XHJcbiAgICB9KSk7XHJcblxyXG4gICAgdGhpcy5lbF9bcmVxdWVzdEZ1bGxTY3JlZW4ucmVxdWVzdEZuXSgpO1xyXG5cclxuICB9IGVsc2UgaWYgKHRoaXMudGVjaC5zdXBwb3J0c0Z1bGxTY3JlZW4oKSkge1xyXG4gICAgLy8gd2UgY2FuJ3QgdGFrZSB0aGUgdmlkZW8uanMgY29udHJvbHMgZnVsbHNjcmVlbiBidXQgd2UgY2FuIGdvIGZ1bGxzY3JlZW5cclxuICAgIC8vIHdpdGggbmF0aXZlIGNvbnRyb2xzXHJcbiAgICB0aGlzLnRlY2hDYWxsKCdlbnRlckZ1bGxTY3JlZW4nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gZnVsbHNjcmVlbiBpc24ndCBzdXBwb3J0ZWQgc28gd2UnbGwganVzdCBzdHJldGNoIHRoZSB2aWRlbyBlbGVtZW50IHRvXHJcbiAgICAvLyBmaWxsIHRoZSB2aWV3cG9ydFxyXG4gICAgdGhpcy5lbnRlckZ1bGxXaW5kb3coKTtcclxuICAgIHRoaXMudHJpZ2dlcignZnVsbHNjcmVlbmNoYW5nZScpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSB2aWRlbyB0byBpdHMgbm9ybWFsIHNpemUgYWZ0ZXIgaGF2aW5nIGJlZW4gaW4gZnVsbCBzY3JlZW4gbW9kZVxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIuY2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jYW5jZWxGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcmVxdWVzdEZ1bGxTY3JlZW4gPSB2anMuc3VwcG9ydC5yZXF1ZXN0RnVsbFNjcmVlbjtcclxuICB0aGlzLmlzRnVsbFNjcmVlbiA9IGZhbHNlO1xyXG5cclxuICAvLyBDaGVjayBmb3IgYnJvd3NlciBlbGVtZW50IGZ1bGxzY3JlZW4gc3VwcG9ydFxyXG4gIGlmIChyZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgZG9jdW1lbnRbcmVxdWVzdEZ1bGxTY3JlZW4uY2FuY2VsRm5dKCk7XHJcbiAgfSBlbHNlIGlmICh0aGlzLnRlY2guc3VwcG9ydHNGdWxsU2NyZWVuKCkpIHtcclxuICAgdGhpcy50ZWNoQ2FsbCgnZXhpdEZ1bGxTY3JlZW4nKTtcclxuICB9IGVsc2Uge1xyXG4gICB0aGlzLmV4aXRGdWxsV2luZG93KCk7XHJcbiAgIHRoaXMudHJpZ2dlcignZnVsbHNjcmVlbmNoYW5nZScpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBXaGVuIGZ1bGxzY3JlZW4gaXNuJ3Qgc3VwcG9ydGVkIHdlIGNhbiBzdHJldGNoIHRoZSB2aWRlbyBjb250YWluZXIgdG8gYXMgd2lkZSBhcyB0aGUgYnJvd3NlciB3aWxsIGxldCB1cy5cclxudmpzLlBsYXllci5wcm90b3R5cGUuZW50ZXJGdWxsV2luZG93ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmlzRnVsbFdpbmRvdyA9IHRydWU7XHJcblxyXG4gIC8vIFN0b3Jpbmcgb3JpZ2luYWwgZG9jIG92ZXJmbG93IHZhbHVlIHRvIHJldHVybiB0byB3aGVuIGZ1bGxzY3JlZW4gaXMgb2ZmXHJcbiAgdGhpcy5kb2NPcmlnT3ZlcmZsb3cgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3c7XHJcblxyXG4gIC8vIEFkZCBsaXN0ZW5lciBmb3IgZXNjIGtleSB0byBleGl0IGZ1bGxzY3JlZW5cclxuICB2anMub24oZG9jdW1lbnQsICdrZXlkb3duJywgdmpzLmJpbmQodGhpcywgdGhpcy5mdWxsV2luZG93T25Fc2NLZXkpKTtcclxuXHJcbiAgLy8gSGlkZSBhbnkgc2Nyb2xsIGJhcnNcclxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuXHJcbiAgLy8gQXBwbHkgZnVsbHNjcmVlbiBzdHlsZXNcclxuICB2anMuYWRkQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Zqcy1mdWxsLXdpbmRvdycpO1xyXG5cclxuICB0aGlzLnRyaWdnZXIoJ2VudGVyRnVsbFdpbmRvdycpO1xyXG59O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5mdWxsV2luZG93T25Fc2NLZXkgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgaWYgKGV2ZW50LmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4gPT09IHRydWUpIHtcclxuICAgICAgdGhpcy5jYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmV4aXRGdWxsV2luZG93KCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuZXhpdEZ1bGxXaW5kb3cgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuaXNGdWxsV2luZG93ID0gZmFsc2U7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ2tleWRvd24nLCB0aGlzLmZ1bGxXaW5kb3dPbkVzY0tleSk7XHJcblxyXG4gIC8vIFVuaGlkZSBzY3JvbGwgYmFycy5cclxuICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUub3ZlcmZsb3cgPSB0aGlzLmRvY09yaWdPdmVyZmxvdztcclxuXHJcbiAgLy8gUmVtb3ZlIGZ1bGxzY3JlZW4gc3R5bGVzXHJcbiAgdmpzLnJlbW92ZUNsYXNzKGRvY3VtZW50LmJvZHksICd2anMtZnVsbC13aW5kb3cnKTtcclxuXHJcbiAgLy8gUmVzaXplIHRoZSBib3gsIGNvbnRyb2xsZXIsIGFuZCBwb3N0ZXIgdG8gb3JpZ2luYWwgc2l6ZXNcclxuICAvLyB0aGlzLnBvc2l0aW9uQWxsKCk7XHJcbiAgdGhpcy50cmlnZ2VyKCdleGl0RnVsbFdpbmRvdycpO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuc2VsZWN0U291cmNlID0gZnVuY3Rpb24oc291cmNlcyl7XHJcblxyXG4gIC8vIExvb3AgdGhyb3VnaCBlYWNoIHBsYXliYWNrIHRlY2hub2xvZ3kgaW4gdGhlIG9wdGlvbnMgb3JkZXJcclxuICBmb3IgKHZhciBpPTAsaj10aGlzLm9wdGlvbnNfWyd0ZWNoT3JkZXInXTtpPGoubGVuZ3RoO2krKykge1xyXG4gICAgdmFyIHRlY2hOYW1lID0gdmpzLmNhcGl0YWxpemUoaltpXSksXHJcbiAgICAgICAgdGVjaCA9IHdpbmRvd1sndmlkZW9qcyddW3RlY2hOYW1lXTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHRlY2hub2xvZ3lcclxuICAgIGlmICh0ZWNoLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggc291cmNlIG9iamVjdFxyXG4gICAgICBmb3IgKHZhciBhPTAsYj1zb3VyY2VzO2E8Yi5sZW5ndGg7YSsrKSB7XHJcbiAgICAgICAgdmFyIHNvdXJjZSA9IGJbYV07XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHNvdXJjZSBjYW4gYmUgcGxheWVkIHdpdGggdGhpcyB0ZWNobm9sb2d5XHJcbiAgICAgICAgaWYgKHRlY2hbJ2NhblBsYXlTb3VyY2UnXShzb3VyY2UpKSB7XHJcbiAgICAgICAgICByZXR1cm4geyBzb3VyY2U6IHNvdXJjZSwgdGVjaDogdGVjaE5hbWUgfTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgc291cmNlIGZ1bmN0aW9uIHVwZGF0ZXMgdGhlIHZpZGVvIHNvdXJjZVxyXG4gKlxyXG4gKiBUaGVyZSBhcmUgdGhyZWUgdHlwZXMgb2YgdmFyaWFibGVzIHlvdSBjYW4gcGFzcyBhcyB0aGUgYXJndW1lbnQuXHJcbiAqXHJcbiAqICoqVVJMIFN0cmluZyoqOiBBIFVSTCB0byB0aGUgdGhlIHZpZGVvIGZpbGUuIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3UgYXJlIHN1cmVcclxuICogdGhlIGN1cnJlbnQgcGxheWJhY2sgdGVjaG5vbG9neSAoSFRNTDUvRmxhc2gpIGNhbiBzdXBwb3J0IHRoZSBzb3VyY2UgeW91XHJcbiAqIHByb3ZpZGUuIEN1cnJlbnRseSBvbmx5IE1QNCBmaWxlcyBjYW4gYmUgdXNlZCBpbiBib3RoIEhUTUw1IGFuZCBGbGFzaC5cclxuICpcclxuICogICAgIG15UGxheWVyLnNyYyhcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5tcDRcIik7XHJcbiAqXHJcbiAqICoqU291cmNlIE9iamVjdCAob3IgZWxlbWVudCk6KiogQSBqYXZhc2NyaXB0IG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uXHJcbiAqIGFib3V0IHRoZSBzb3VyY2UgZmlsZS4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSB3YW50IHRoZSBwbGF5ZXIgdG8gZGV0ZXJtaW5lIGlmXHJcbiAqIGl0IGNhbiBzdXBwb3J0IHRoZSBmaWxlIHVzaW5nIHRoZSB0eXBlIGluZm9ybWF0aW9uLlxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIuc3JjKHsgdHlwZTogXCJ2aWRlby9tcDRcIiwgc3JjOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5tcDRcIiB9KTtcclxuICpcclxuICogKipBcnJheSBvZiBTb3VyY2UgT2JqZWN0czoqKiBUbyBwcm92aWRlIG11bHRpcGxlIHZlcnNpb25zIG9mIHRoZSBzb3VyY2Ugc29cclxuICogdGhhdCBpdCBjYW4gYmUgcGxheWVkIHVzaW5nIEhUTUw1IGFjcm9zcyBicm93c2VycyB5b3UgY2FuIHVzZSBhbiBhcnJheSBvZlxyXG4gKiBzb3VyY2Ugb2JqZWN0cy4gVmlkZW8uanMgd2lsbCBkZXRlY3Qgd2hpY2ggdmVyc2lvbiBpcyBzdXBwb3J0ZWQgYW5kIGxvYWQgdGhhdFxyXG4gKiBmaWxlLlxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIuc3JjKFtcclxuICogICAgICAgeyB0eXBlOiBcInZpZGVvL21wNFwiLCBzcmM6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL3ZpZGVvLm1wNFwiIH0sXHJcbiAqICAgICAgIHsgdHlwZTogXCJ2aWRlby93ZWJtXCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ud2VibVwiIH0sXHJcbiAqICAgICAgIHsgdHlwZTogXCJ2aWRlby9vZ2dcIiwgc3JjOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5vZ3ZcIiB9XHJcbiAqICAgICBdKTtcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfE9iamVjdHxBcnJheT19IHNvdXJjZSBUaGUgc291cmNlIFVSTCwgb2JqZWN0LCBvciBhcnJheSBvZiBzb3VyY2VzXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGZcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKHNvdXJjZSl7XHJcbiAgLy8gQ2FzZTogQXJyYXkgb2Ygc291cmNlIG9iamVjdHMgdG8gY2hvb3NlIGZyb20gYW5kIHBpY2sgdGhlIGJlc3QgdG8gcGxheVxyXG4gIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBBcnJheSkge1xyXG5cclxuICAgIHZhciBzb3VyY2VUZWNoID0gdGhpcy5zZWxlY3RTb3VyY2Uoc291cmNlKSxcclxuICAgICAgICB0ZWNoTmFtZTtcclxuXHJcbiAgICBpZiAoc291cmNlVGVjaCkge1xyXG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZVRlY2guc291cmNlO1xyXG4gICAgICAgIHRlY2hOYW1lID0gc291cmNlVGVjaC50ZWNoO1xyXG5cclxuICAgICAgLy8gSWYgdGhpcyB0ZWNobm9sb2d5IGlzIGFscmVhZHkgbG9hZGVkLCBzZXQgc291cmNlXHJcbiAgICAgIGlmICh0ZWNoTmFtZSA9PSB0aGlzLnRlY2hOYW1lKSB7XHJcbiAgICAgICAgdGhpcy5zcmMoc291cmNlKTsgLy8gUGFzc2luZyB0aGUgc291cmNlIG9iamVjdFxyXG4gICAgICAvLyBPdGhlcndpc2UgbG9hZCB0aGlzIHRlY2hub2xvZ3kgd2l0aCBjaG9zZW4gc291cmNlXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5sb2FkVGVjaCh0ZWNoTmFtZSwgc291cmNlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5lbF8uYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdwJywge1xyXG4gICAgICAgIGlubmVySFRNTDogdGhpcy5vcHRpb25zKClbJ25vdFN1cHBvcnRlZE1lc3NhZ2UnXVxyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gIC8vIENhc2U6IFNvdXJjZSBvYmplY3QgeyBzcmM6ICcnLCB0eXBlOiAnJyAuLi4gfVxyXG4gIH0gZWxzZSBpZiAoc291cmNlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcblxyXG4gICAgaWYgKHdpbmRvd1sndmlkZW9qcyddW3RoaXMudGVjaE5hbWVdWydjYW5QbGF5U291cmNlJ10oc291cmNlKSkge1xyXG4gICAgICB0aGlzLnNyYyhzb3VyY2Uuc3JjKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIFNlbmQgdGhyb3VnaCB0ZWNoIGxvb3AgdG8gY2hlY2sgZm9yIGEgY29tcGF0aWJsZSB0ZWNobm9sb2d5LlxyXG4gICAgICB0aGlzLnNyYyhbc291cmNlXSk7XHJcbiAgICB9XHJcblxyXG4gIC8vIENhc2U6IFVSTCBTdHJpbmcgKGh0dHA6Ly9teXZpZGVvLi4uKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBDYWNoZSBmb3IgZ2V0dGluZyBsYXN0IHNldCBzb3VyY2VcclxuICAgIHRoaXMuY2FjaGVfLnNyYyA9IHNvdXJjZTtcclxuXHJcbiAgICBpZiAoIXRoaXMuaXNSZWFkeV8pIHtcclxuICAgICAgdGhpcy5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMuc3JjKHNvdXJjZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50ZWNoQ2FsbCgnc3JjJywgc291cmNlKTtcclxuICAgICAgaWYgKHRoaXMub3B0aW9uc19bJ3ByZWxvYWQnXSA9PSAnYXV0bycpIHtcclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5vcHRpb25zX1snYXV0b3BsYXknXSkge1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gQmVnaW4gbG9hZGluZyB0aGUgc3JjIGRhdGFcclxuLy8gaHR0cDovL2Rldi53My5vcmcvaHRtbDUvc3BlYy92aWRlby5odG1sI2RvbS1tZWRpYS1sb2FkXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudGVjaENhbGwoJ2xvYWQnKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdmlkZW8uaHRtbCNkb20tbWVkaWEtY3VycmVudHNyY1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jdXJyZW50U3JjID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdjdXJyZW50U3JjJykgfHwgdGhpcy5jYWNoZV8uc3JjIHx8ICcnO1xyXG59O1xyXG5cclxuLy8gQXR0cmlidXRlcy9PcHRpb25zXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMudGVjaENhbGwoJ3NldFByZWxvYWQnLCB2YWx1ZSk7XHJcbiAgICB0aGlzLm9wdGlvbnNfWydwcmVsb2FkJ10gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdwcmVsb2FkJyk7XHJcbn07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmF1dG9wbGF5ID0gZnVuY3Rpb24odmFsdWUpe1xyXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRBdXRvcGxheScsIHZhbHVlKTtcclxuICAgIHRoaXMub3B0aW9uc19bJ2F1dG9wbGF5J10gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdhdXRvcGxheScsIHZhbHVlKTtcclxufTtcclxudmpzLlBsYXllci5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0TG9vcCcsIHZhbHVlKTtcclxuICAgIHRoaXMub3B0aW9uc19bJ2xvb3AnXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnRlY2hHZXQoJ2xvb3AnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiB0aGUgdXJsIG9mIHRoZSBwb3N0ZXIgaW1hZ2Ugc291cmNlXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wb3N0ZXJfO1xyXG5cclxuLyoqXHJcbiAqIGdldCBvciBzZXQgdGhlIHBvc3RlciBpbWFnZSBzb3VyY2UgdXJsXHJcbiAqXHJcbiAqICMjIyMjIEVYQU1QTEU6XHJcbiAqXHJcbiAqICAgICAvLyBnZXR0aW5nXHJcbiAqICAgICB2YXIgY3VycmVudFBvc3RlciA9IG15UGxheWVyLnBvc3RlcigpO1xyXG4gKlxyXG4gKiAgICAgLy8gc2V0dGluZ1xyXG4gKiAgICAgbXlQbGF5ZXIucG9zdGVyKCdodHRwOi8vZXhhbXBsZS5jb20vbXlJbWFnZS5qcGcnKTtcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nPX0gW3NyY10gUG9zdGVyIGltYWdlIHNvdXJjZSBVUkxcclxuICogQHJldHVybiB7U3RyaW5nfSBwb3N0ZXIgVVJMIHdoZW4gZ2V0dGluZ1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmIHdoZW4gc2V0dGluZ1xyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucG9zdGVyID0gZnVuY3Rpb24oc3JjKXtcclxuICBpZiAoc3JjICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMucG9zdGVyXyA9IHNyYztcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy5wb3N0ZXJfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFdoZXRoZXIgb3Igbm90IHRoZSBjb250cm9scyBhcmUgc2hvd2luZ1xyXG4gKiBAdHlwZSB7Qm9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xzXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3Igc2V0IHdoZXRoZXIgb3Igbm90IHRoZSBjb250cm9scyBhcmUgc2hvd2luZy5cclxuICogQHBhcmFtICB7Qm9vbGVhbn0gY29udHJvbHMgU2V0IGNvbnRyb2xzIHRvIHNob3dpbmcgb3Igbm90XHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59ICAgIENvbnRyb2xzIGFyZSBzaG93aW5nXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jb250cm9scyA9IGZ1bmN0aW9uKGJvb2wpe1xyXG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGJvb2wgPSAhIWJvb2w7IC8vIGZvcmNlIGJvb2xlYW5cclxuICAgIC8vIERvbid0IHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQgdW5sZXNzIGl0IGFjdHVhbGx5IGNoYW5nZWRcclxuICAgIGlmICh0aGlzLmNvbnRyb2xzXyAhPT0gYm9vbCkge1xyXG4gICAgICB0aGlzLmNvbnRyb2xzXyA9IGJvb2w7XHJcbiAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWNvbnRyb2xzLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWNvbnRyb2xzLWVuYWJsZWQnKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NvbnRyb2xzZW5hYmxlZCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1jb250cm9scy1lbmFibGVkJyk7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWNvbnRyb2xzLWRpc2FibGVkJyk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjb250cm9sc2Rpc2FibGVkJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy5jb250cm9sc187XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS51c2luZ05hdGl2ZUNvbnRyb2xzXztcclxuXHJcbi8qKlxyXG4gKiBUb2dnbGUgbmF0aXZlIGNvbnRyb2xzIG9uL29mZi4gTmF0aXZlIGNvbnRyb2xzIGFyZSB0aGUgY29udHJvbHMgYnVpbHQgaW50b1xyXG4gKiBkZXZpY2VzIChlLmcuIGRlZmF1bHQgaVBob25lIGNvbnRyb2xzKSwgRmxhc2gsIG9yIG90aGVyIHRlY2hzXHJcbiAqIChlLmcuIFZpbWVvIENvbnRyb2xzKVxyXG4gKlxyXG4gKiAqKlRoaXMgc2hvdWxkIG9ubHkgYmUgc2V0IGJ5IHRoZSBjdXJyZW50IHRlY2gsIGJlY2F1c2Ugb25seSB0aGUgdGVjaCBrbm93c1xyXG4gKiBpZiBpdCBjYW4gc3VwcG9ydCBuYXRpdmUgY29udHJvbHMqKlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBib29sICAgIFRydWUgc2lnbmFscyB0aGF0IG5hdGl2ZSBjb250cm9scyBhcmUgb25cclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gICAgICBSZXR1cm5zIHRoZSBwbGF5ZXJcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzaW5nTmF0aXZlQ29udHJvbHMgPSBmdW5jdGlvbihib29sKXtcclxuICBpZiAoYm9vbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBib29sID0gISFib29sOyAvLyBmb3JjZSBib29sZWFuXHJcbiAgICAvLyBEb24ndCB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50IHVubGVzcyBpdCBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICBpZiAodGhpcy51c2luZ05hdGl2ZUNvbnRyb2xzXyAhPT0gYm9vbCkge1xyXG4gICAgICB0aGlzLnVzaW5nTmF0aXZlQ29udHJvbHNfID0gYm9vbDtcclxuICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtdXNpbmctbmF0aXZlLWNvbnRyb2xzJyk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBsYXllciBpcyB1c2luZyB0aGUgbmF0aXZlIGRldmljZSBjb250cm9sc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGV2ZW50IHVzaW5nbmF0aXZlY29udHJvbHNcclxuICAgICAgICAgKiBAbWVtYmVyb2YgdmpzLlBsYXllclxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd1c2luZ25hdGl2ZWNvbnRyb2xzJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLXVzaW5nLW5hdGl2ZS1jb250cm9scycpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBwbGF5ZXIgaXMgdXNpbmcgdGhlIGN1c3RvbSBIVE1MIGNvbnRyb2xzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZXZlbnQgdXNpbmdjdXN0b21jb250cm9sc1xyXG4gICAgICAgICAqIEBtZW1iZXJvZiB2anMuUGxheWVyXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzaW5nY3VzdG9tY29udHJvbHMnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnVzaW5nTmF0aXZlQ29udHJvbHNfO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoR2V0KCdlcnJvcicpOyB9O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5lbmRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ2VuZGVkJyk7IH07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnNlZWtpbmcgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoR2V0KCdzZWVraW5nJyk7IH07XHJcblxyXG4vLyBXaGVuIHRoZSBwbGF5ZXIgaXMgZmlyc3QgaW5pdGlhbGl6ZWQsIHRyaWdnZXIgYWN0aXZpdHkgc28gY29tcG9uZW50c1xyXG4vLyBsaWtlIHRoZSBjb250cm9sIGJhciBzaG93IHRoZW1zZWx2ZXMgaWYgbmVlZGVkXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzZXJBY3Rpdml0eV8gPSB0cnVlO1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5yZXBvcnRVc2VyQWN0aXZpdHkgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy51c2VyQWN0aXZpdHlfID0gdHJ1ZTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzZXJBY3RpdmVfID0gdHJ1ZTtcclxudmpzLlBsYXllci5wcm90b3R5cGUudXNlckFjdGl2ZSA9IGZ1bmN0aW9uKGJvb2wpe1xyXG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGJvb2wgPSAhIWJvb2w7XHJcbiAgICBpZiAoYm9vbCAhPT0gdGhpcy51c2VyQWN0aXZlXykge1xyXG4gICAgICB0aGlzLnVzZXJBY3RpdmVfID0gYm9vbDtcclxuICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICAvLyBJZiB0aGUgdXNlciB3YXMgaW5hY3RpdmUgYW5kIGlzIG5vdyBhY3RpdmUgd2Ugd2FudCB0byByZXNldCB0aGVcclxuICAgICAgICAvLyBpbmFjdGl2aXR5IHRpbWVyXHJcbiAgICAgICAgdGhpcy51c2VyQWN0aXZpdHlfID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtdXNlci1pbmFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2VyLWFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNlcmFjdGl2ZScpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFdlJ3JlIHN3aXRjaGluZyB0aGUgc3RhdGUgdG8gaW5hY3RpdmUgbWFudWFsbHksIHNvIGVyYXNlIGFueSBvdGhlclxyXG4gICAgICAgIC8vIGFjdGl2aXR5XHJcbiAgICAgICAgdGhpcy51c2VyQWN0aXZpdHlfID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIENocm9tZS9TYWZhcmkvSUUgaGF2ZSBidWdzIHdoZXJlIHdoZW4geW91IGNoYW5nZSB0aGUgY3Vyc29yIGl0IGNhblxyXG4gICAgICAgIC8vIHRyaWdnZXIgYSBtb3VzZW1vdmUgZXZlbnQuIFRoaXMgY2F1c2VzIGFuIGlzc3VlIHdoZW4geW91J3JlIGhpZGluZ1xyXG4gICAgICAgIC8vIHRoZSBjdXJzb3Igd2hlbiB0aGUgdXNlciBpcyBpbmFjdGl2ZSwgYW5kIGEgbW91c2Vtb3ZlIHNpZ25hbHMgdXNlclxyXG4gICAgICAgIC8vIGFjdGl2aXR5LiBNYWtpbmcgaXQgaW1wb3NzaWJsZSB0byBnbyBpbnRvIGluYWN0aXZlIG1vZGUuIFNwZWNpZmljYWxseVxyXG4gICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiBmdWxsc2NyZWVuIHdoZW4gd2UgcmVhbGx5IG5lZWQgdG8gaGlkZSB0aGUgY3Vyc29yLlxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gV2hlbiB0aGlzIGdldHMgcmVzb2x2ZWQgaW4gQUxMIGJyb3dzZXJzIGl0IGNhbiBiZSByZW1vdmVkXHJcbiAgICAgICAgLy8gaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9jaHJvbWl1bS9pc3N1ZXMvZGV0YWlsP2lkPTEwMzA0MVxyXG4gICAgICAgIHRoaXMudGVjaC5vbmUoJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtdXNlci1hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtdXNlci1pbmFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNlcmluYWN0aXZlJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy51c2VyQWN0aXZlXztcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmxpc3RlbkZvclVzZXJBY3Rpdml0eSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG9uTW91c2VBY3Rpdml0eSwgb25Nb3VzZURvd24sIG1vdXNlSW5Qcm9ncmVzcywgb25Nb3VzZVVwLFxyXG4gICAgICBhY3Rpdml0eUNoZWNrLCBpbmFjdGl2aXR5VGltZW91dDtcclxuXHJcbiAgb25Nb3VzZUFjdGl2aXR5ID0gdGhpcy5yZXBvcnRVc2VyQWN0aXZpdHk7XHJcblxyXG4gIG9uTW91c2VEb3duID0gZnVuY3Rpb24oKSB7XHJcbiAgICBvbk1vdXNlQWN0aXZpdHkoKTtcclxuICAgIC8vIEZvciBhcyBsb25nIGFzIHRoZSB0aGV5IGFyZSB0b3VjaGluZyB0aGUgZGV2aWNlIG9yIGhhdmUgdGhlaXIgbW91c2UgZG93bixcclxuICAgIC8vIHdlIGNvbnNpZGVyIHRoZW0gYWN0aXZlIGV2ZW4gaWYgdGhleSdyZSBub3QgbW92aW5nIHRoZWlyIGZpbmdlciBvciBtb3VzZS5cclxuICAgIC8vIFNvIHdlIHdhbnQgdG8gY29udGludWUgdG8gdXBkYXRlIHRoYXQgdGhleSBhcmUgYWN0aXZlXHJcbiAgICBjbGVhckludGVydmFsKG1vdXNlSW5Qcm9ncmVzcyk7XHJcbiAgICAvLyBTZXR0aW5nIHVzZXJBY3Rpdml0eT10cnVlIG5vdyBhbmQgc2V0dGluZyB0aGUgaW50ZXJ2YWwgdG8gdGhlIHNhbWUgdGltZVxyXG4gICAgLy8gYXMgdGhlIGFjdGl2aXR5Q2hlY2sgaW50ZXJ2YWwgKDI1MCkgc2hvdWxkIGVuc3VyZSB3ZSBuZXZlciBtaXNzIHRoZVxyXG4gICAgLy8gbmV4dCBhY3Rpdml0eUNoZWNrXHJcbiAgICBtb3VzZUluUHJvZ3Jlc3MgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBvbk1vdXNlQWN0aXZpdHkpLCAyNTApO1xyXG4gIH07XHJcblxyXG4gIG9uTW91c2VVcCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICBvbk1vdXNlQWN0aXZpdHkoKTtcclxuICAgIC8vIFN0b3AgdGhlIGludGVydmFsIHRoYXQgbWFpbnRhaW5zIGFjdGl2aXR5IGlmIHRoZSBtb3VzZS90b3VjaCBpcyBkb3duXHJcbiAgICBjbGVhckludGVydmFsKG1vdXNlSW5Qcm9ncmVzcyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQW55IG1vdXNlIG1vdmVtZW50IHdpbGwgYmUgY29uc2lkZXJlZCB1c2VyIGFjdGl2aXR5XHJcbiAgdGhpcy5vbignbW91c2Vkb3duJywgb25Nb3VzZURvd24pO1xyXG4gIHRoaXMub24oJ21vdXNlbW92ZScsIG9uTW91c2VBY3Rpdml0eSk7XHJcbiAgdGhpcy5vbignbW91c2V1cCcsIG9uTW91c2VVcCk7XHJcblxyXG4gIC8vIExpc3RlbiBmb3Iga2V5Ym9hcmQgbmF2aWdhdGlvblxyXG4gIC8vIFNob3VsZG4ndCBuZWVkIHRvIHVzZSBpblByb2dyZXNzIGludGVydmFsIGJlY2F1c2Ugb2Yga2V5IHJlcGVhdFxyXG4gIHRoaXMub24oJ2tleWRvd24nLCBvbk1vdXNlQWN0aXZpdHkpO1xyXG4gIHRoaXMub24oJ2tleXVwJywgb25Nb3VzZUFjdGl2aXR5KTtcclxuXHJcbiAgLy8gQ29uc2lkZXIgYW55IHRvdWNoIGV2ZW50cyB0aGF0IGJ1YmJsZSB1cCB0byBiZSBhY3Rpdml0eVxyXG4gIC8vIENlcnRhaW4gdG91Y2hlcyBvbiB0aGUgdGVjaCB3aWxsIGJlIGJsb2NrZWQgZnJvbSBidWJibGluZyBiZWNhdXNlIHRoZXlcclxuICAvLyB0b2dnbGUgY29udHJvbHNcclxuICB0aGlzLm9uKCd0b3VjaHN0YXJ0Jywgb25Nb3VzZURvd24pO1xyXG4gIHRoaXMub24oJ3RvdWNobW92ZScsIG9uTW91c2VBY3Rpdml0eSk7XHJcbiAgdGhpcy5vbigndG91Y2hlbmQnLCBvbk1vdXNlVXApO1xyXG4gIHRoaXMub24oJ3RvdWNoY2FuY2VsJywgb25Nb3VzZVVwKTtcclxuXHJcbiAgLy8gUnVuIGFuIGludGVydmFsIGV2ZXJ5IDI1MCBtaWxsaXNlY29uZHMgaW5zdGVhZCBvZiBzdHVmZmluZyBldmVyeXRoaW5nIGludG9cclxuICAvLyB0aGUgbW91c2Vtb3ZlL3RvdWNobW92ZSBmdW5jdGlvbiBpdHNlbGYsIHRvIHByZXZlbnQgcGVyZm9ybWFuY2UgZGVncmFkYXRpb24uXHJcbiAgLy8gYHRoaXMucmVwb3J0VXNlckFjdGl2aXR5YCBzaW1wbHkgc2V0cyB0aGlzLnVzZXJBY3Rpdml0eV8gdG8gdHJ1ZSwgd2hpY2hcclxuICAvLyB0aGVuIGdldHMgcGlja2VkIHVwIGJ5IHRoaXMgbG9vcFxyXG4gIC8vIGh0dHA6Ly9lam9obi5vcmcvYmxvZy9sZWFybmluZy1mcm9tLXR3aXR0ZXIvXHJcbiAgYWN0aXZpdHlDaGVjayA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIG1vdXNlL3RvdWNoIGFjdGl2aXR5IGhhcyBoYXBwZW5lZFxyXG4gICAgaWYgKHRoaXMudXNlckFjdGl2aXR5Xykge1xyXG4gICAgICAvLyBSZXNldCB0aGUgYWN0aXZpdHkgdHJhY2tlclxyXG4gICAgICB0aGlzLnVzZXJBY3Rpdml0eV8gPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIElmIHRoZSB1c2VyIHN0YXRlIHdhcyBpbmFjdGl2ZSwgc2V0IHRoZSBzdGF0ZSB0byBhY3RpdmVcclxuICAgICAgdGhpcy51c2VyQWN0aXZlKHRydWUpO1xyXG5cclxuICAgICAgLy8gQ2xlYXIgYW55IGV4aXN0aW5nIGluYWN0aXZpdHkgdGltZW91dCB0byBzdGFydCB0aGUgdGltZXIgb3ZlclxyXG4gICAgICBjbGVhclRpbWVvdXQoaW5hY3Rpdml0eVRpbWVvdXQpO1xyXG5cclxuICAgICAgLy8gSW4gWCBzZWNvbmRzLCBpZiBubyBtb3JlIGFjdGl2aXR5IGhhcyBvY2N1cnJlZCB0aGUgdXNlciB3aWxsIGJlXHJcbiAgICAgIC8vIGNvbnNpZGVyZWQgaW5hY3RpdmVcclxuICAgICAgaW5hY3Rpdml0eVRpbWVvdXQgPSBzZXRUaW1lb3V0KHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vIFByb3RlY3QgYWdhaW5zdCB0aGUgY2FzZSB3aGVyZSB0aGUgaW5hY3Rpdml0eVRpbWVvdXQgY2FuIHRyaWdnZXIganVzdFxyXG4gICAgICAgIC8vIGJlZm9yZSB0aGUgbmV4dCB1c2VyIGFjdGl2aXR5IGlzIHBpY2tlZCB1cCBieSB0aGUgYWN0aXZpdHlDaGVjayBsb29wXHJcbiAgICAgICAgLy8gY2F1c2luZyBhIGZsaWNrZXJcclxuICAgICAgICBpZiAoIXRoaXMudXNlckFjdGl2aXR5Xykge1xyXG4gICAgICAgICAgdGhpcy51c2VyQWN0aXZlKGZhbHNlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0pLCAyMDAwKTtcclxuICAgIH1cclxuICB9KSwgMjUwKTtcclxuXHJcbiAgLy8gQ2xlYW4gdXAgdGhlIGludGVydmFscyB3aGVuIHdlIGtpbGwgdGhlIHBsYXllclxyXG4gIHRoaXMub24oJ2Rpc3Bvc2UnLCBmdW5jdGlvbigpe1xyXG4gICAgY2xlYXJJbnRlcnZhbChhY3Rpdml0eUNoZWNrKTtcclxuICAgIGNsZWFyVGltZW91dChpbmFjdGl2aXR5VGltZW91dCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG4vLyBNZXRob2RzIHRvIGFkZCBzdXBwb3J0IGZvclxyXG4vLyBuZXR3b3JrU3RhdGU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCduZXR3b3JrU3RhdGUnKTsgfSxcclxuLy8gcmVhZHlTdGF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3JlYWR5U3RhdGUnKTsgfSxcclxuLy8gc2Vla2luZzogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3NlZWtpbmcnKTsgfSxcclxuLy8gaW5pdGlhbFRpbWU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdpbml0aWFsVGltZScpOyB9LFxyXG4vLyBzdGFydE9mZnNldFRpbWU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdzdGFydE9mZnNldFRpbWUnKTsgfSxcclxuLy8gcGxheWVkOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgncGxheWVkJyk7IH0sXHJcbi8vIHNlZWthYmxlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnc2Vla2FibGUnKTsgfSxcclxuLy8gdmlkZW9UcmFja3M6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCd2aWRlb1RyYWNrcycpOyB9LFxyXG4vLyBhdWRpb1RyYWNrczogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2F1ZGlvVHJhY2tzJyk7IH0sXHJcbi8vIHZpZGVvV2lkdGg6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCd2aWRlb1dpZHRoJyk7IH0sXHJcbi8vIHZpZGVvSGVpZ2h0OiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgndmlkZW9IZWlnaHQnKTsgfSxcclxuLy8gZGVmYXVsdFBsYXliYWNrUmF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2RlZmF1bHRQbGF5YmFja1JhdGUnKTsgfSxcclxuLy8gcGxheWJhY2tSYXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgncGxheWJhY2tSYXRlJyk7IH0sXHJcbi8vIG1lZGlhR3JvdXA6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdtZWRpYUdyb3VwJyk7IH0sXHJcbi8vIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdjb250cm9sbGVyJyk7IH0sXHJcbi8vIGRlZmF1bHRNdXRlZDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2RlZmF1bHRNdXRlZCcpOyB9XHJcblxyXG4vLyBUT0RPXHJcbi8vIGN1cnJlbnRTcmNMaXN0OiB0aGUgYXJyYXkgb2Ygc291cmNlcyBpbmNsdWRpbmcgb3RoZXIgZm9ybWF0cyBhbmQgYml0cmF0ZXNcclxuLy8gcGxheUxpc3Q6IGFycmF5IG9mIHNvdXJjZSBsaXN0cyBpbiBvcmRlciBvZiBwbGF5YmFja1xyXG5cclxuLy8gUmVxdWVzdEZ1bGxzY3JlZW4gQVBJXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBwcmVmaXgsIHJlcXVlc3RGUywgZGl2O1xyXG5cclxuICBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgcmVxdWVzdEZTID0ge307XHJcblxyXG4gIC8vIEN1cnJlbnQgVzNDIFNwZWNcclxuICAvLyBodHRwOi8vZHZjcy53My5vcmcvaGcvZnVsbHNjcmVlbi9yYXctZmlsZS90aXAvT3ZlcnZpZXcuaHRtbCNhcGlcclxuICAvLyBNb3ppbGxhIERyYWZ0OiBodHRwczovL3dpa2kubW96aWxsYS5vcmcvR2Vja286RnVsbFNjcmVlbkFQSSNmdWxsc2NyZWVuY2hhbmdlX2V2ZW50XHJcbiAgLy8gTmV3OiBodHRwczovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvNTI5YTY3YjhkOWYzL092ZXJ2aWV3Lmh0bWxcclxuICBpZiAoZGl2LmNhbmNlbEZ1bGxzY3JlZW4gIT09IHVuZGVmaW5lZCkge1xyXG4gICAgcmVxdWVzdEZTLnJlcXVlc3RGbiA9ICdyZXF1ZXN0RnVsbHNjcmVlbic7XHJcbiAgICByZXF1ZXN0RlMuY2FuY2VsRm4gPSAnZXhpdEZ1bGxzY3JlZW4nO1xyXG4gICAgcmVxdWVzdEZTLmV2ZW50TmFtZSA9ICdmdWxsc2NyZWVuY2hhbmdlJztcclxuICAgIHJlcXVlc3RGUy5pc0Z1bGxTY3JlZW4gPSAnZnVsbFNjcmVlbic7XHJcblxyXG4gIC8vIFdlYmtpdCAoQ2hyb21lL1NhZmFyaSkgYW5kIE1vemlsbGEgKEZpcmVmb3gpIGhhdmUgd29ya2luZyBpbXBsZW1lbnRhdGlvbnNcclxuICAvLyB0aGF0IHVzZSBwcmVmaXhlcyBhbmQgdmFyeSBzbGlnaHRseSBmcm9tIHRoZSBuZXcgVzNDIHNwZWMuIFNwZWNpZmljYWxseSxcclxuICAvLyB1c2luZyAnZXhpdCcgaW5zdGVhZCBvZiAnY2FuY2VsJywgYW5kIGxvd2VyY2FzaW5nIHRoZSAnUycgaW4gRnVsbHNjcmVlbi5cclxuICAvLyBPdGhlciBicm93c2VycyBkb24ndCBoYXZlIGFueSBoaW50cyBvZiB3aGljaCB2ZXJzaW9uIHRoZXkgbWlnaHQgZm9sbG93IHlldCxcclxuICAvLyBzbyBub3QgZ29pbmcgdG8gdHJ5IHRvIHByZWRpY3QgYnkgbG9vcGluZyB0aHJvdWdoIGFsbCBwcmVmaXhlcy5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XHJcbiAgICAgIHByZWZpeCA9ICdtb3onO1xyXG4gICAgICByZXF1ZXN0RlMuaXNGdWxsU2NyZWVuID0gcHJlZml4ICsgJ0Z1bGxTY3JlZW4nO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcHJlZml4ID0gJ3dlYmtpdCc7XHJcbiAgICAgIHJlcXVlc3RGUy5pc0Z1bGxTY3JlZW4gPSBwcmVmaXggKyAnSXNGdWxsU2NyZWVuJztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZGl2W3ByZWZpeCArICdSZXF1ZXN0RnVsbFNjcmVlbiddKSB7XHJcbiAgICAgIHJlcXVlc3RGUy5yZXF1ZXN0Rm4gPSBwcmVmaXggKyAnUmVxdWVzdEZ1bGxTY3JlZW4nO1xyXG4gICAgICByZXF1ZXN0RlMuY2FuY2VsRm4gPSBwcmVmaXggKyAnQ2FuY2VsRnVsbFNjcmVlbic7XHJcbiAgICB9XHJcbiAgICByZXF1ZXN0RlMuZXZlbnROYW1lID0gcHJlZml4ICsgJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xyXG4gIH1cclxuXHJcbiAgaWYgKGRvY3VtZW50W3JlcXVlc3RGUy5jYW5jZWxGbl0pIHtcclxuICAgIHZqcy5zdXBwb3J0LnJlcXVlc3RGdWxsU2NyZWVuID0gcmVxdWVzdEZTO1xyXG4gIH1cclxuXHJcbn0pKCk7XHJcblxyXG5cclxuLyoqXHJcbiAqIENvbnRhaW5lciBvZiBtYWluIGNvbnRyb2xzXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAZXh0ZW5kcyB2anMuQ29tcG9uZW50XHJcbiAqL1xyXG52anMuQ29udHJvbEJhciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKCk7XHJcblxyXG52anMuQ29udHJvbEJhci5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAgbG9hZEV2ZW50OiAncGxheScsXHJcbiAgY2hpbGRyZW46IHtcclxuICAgICdwbGF5VG9nZ2xlJzoge30sXHJcbiAgICAnY3VycmVudFRpbWVEaXNwbGF5Jzoge30sXHJcbiAgICAndGltZURpdmlkZXInOiB7fSxcclxuICAgICdkdXJhdGlvbkRpc3BsYXknOiB7fSxcclxuICAgICdyZW1haW5pbmdUaW1lRGlzcGxheSc6IHt9LFxyXG4gICAgJ3Byb2dyZXNzQ29udHJvbCc6IHt9LFxyXG4gICAgJ2Z1bGxzY3JlZW5Ub2dnbGUnOiB7fSxcclxuICAgICd2b2x1bWVDb250cm9sJzoge30sXHJcbiAgICAnbXV0ZVRvZ2dsZSc6IHt9XHJcbiAgICAvLyAndm9sdW1lTWVudUJ1dHRvbic6IHt9XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLkNvbnRyb2xCYXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtY29udHJvbC1iYXInXHJcbiAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBCdXR0b24gdG8gdG9nZ2xlIGJldHdlZW4gcGxheSBhbmQgcGF1c2VcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuUGxheVRvZ2dsZSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbigncGxheScsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25QbGF5KSk7XHJcbiAgICBwbGF5ZXIub24oJ3BhdXNlJywgdmpzLmJpbmQodGhpcywgdGhpcy5vblBhdXNlKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ1BsYXknO1xyXG5cclxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiAndmpzLXBsYXktY29udHJvbCAnICsgdmpzLkJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLy8gT25DbGljayAtIFRvZ2dsZSBiZXR3ZWVuIHBsYXkgYW5kIHBhdXNlXHJcbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5wbGF5ZXJfLnBhdXNlZCgpKSB7XHJcbiAgICB0aGlzLnBsYXllcl8ucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnBsYXllcl8ucGF1c2UoKTtcclxuICB9XHJcbn07XHJcblxyXG4gIC8vIE9uUGxheSAtIEFkZCB0aGUgdmpzLXBsYXlpbmcgY2xhc3MgdG8gdGhlIGVsZW1lbnQgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXHJcbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5vblBsYXkgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xyXG4gIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdQYXVzZSc7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJQYXVzZVwiXHJcbn07XHJcblxyXG4gIC8vIE9uUGF1c2UgLSBBZGQgdGhlIHZqcy1wYXVzZWQgY2xhc3MgdG8gdGhlIGVsZW1lbnQgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXHJcbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5vblBhdXNlID0gZnVuY3Rpb24oKXtcclxuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcclxuICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnUGxheSc7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJQbGF5XCJcclxufTtcclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSBjdXJyZW50IHRpbWVcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DdXJyZW50VGltZURpc3BsYXkgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkN1cnJlbnRUaW1lRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBlbCA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1jdXJyZW50LXRpbWUgdmpzLXRpbWUtY29udHJvbHMgdmpzLWNvbnRyb2wnXHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuY29udGVudCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWN1cnJlbnQtdGltZS1kaXNwbGF5JyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkN1cnJlbnQgVGltZSA8L3NwYW4+JyArICcwOjAwJywgLy8gbGFiZWwgdGhlIGN1cnJlbnQgdGltZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vyc1xyXG4gICAgJ2FyaWEtbGl2ZSc6ICdvZmYnIC8vIHRlbGwgc2NyZWVuIHJlYWRlcnMgbm90IHRvIGF1dG9tYXRpY2FsbHkgcmVhZCB0aGUgdGltZSBhcyBpdCBjaGFuZ2VzXHJcbiAgfSk7XHJcblxyXG4gIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnZGl2JykuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KSk7XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxudmpzLkN1cnJlbnRUaW1lRGlzcGxheS5wcm90b3R5cGUudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gQWxsb3dzIGZvciBzbW9vdGggc2NydWJiaW5nLCB3aGVuIHBsYXllciBjYW4ndCBrZWVwIHVwLlxyXG4gIHZhciB0aW1lID0gKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkN1cnJlbnQgVGltZSA8L3NwYW4+JyArIHZqcy5mb3JtYXRUaW1lKHRpbWUsIHRoaXMucGxheWVyXy5kdXJhdGlvbigpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUgZHVyYXRpb25cclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5EdXJhdGlvbkRpc3BsYXkgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTsgLy8gdGhpcyBtaWdodCBuZWVkIHRvIGJlIGNoYW5nZXMgdG8gJ2R1cmF0aW9uY2hhbmdlJyBpbnN0ZWFkIG9mICd0aW1ldXBkYXRlJyBldmVudHVhbGx5LCBob3dldmVyIHRoZSBkdXJhdGlvbmNoYW5nZSBldmVudCBmaXJlcyBiZWZvcmUgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkgaXMgc2V0LCBzbyB0aGUgdmFsdWUgY2Fubm90IGJlIHdyaXR0ZW4gb3V0IHVzaW5nIHRoaXMgbWV0aG9kLiBPbmNlIHRoZSBvcmRlciBvZiBkdXJhdGlvbmNoYW5nZSBhbmQgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkgYmVpbmcgc2V0IGlzIGZpZ3VyZWQgb3V0LCB0aGlzIGNhbiBiZSB1cGRhdGVkLlxyXG4gIH1cclxufSk7XHJcblxyXG52anMuRHVyYXRpb25EaXNwbGF5LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGVsID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWR1cmF0aW9uIHZqcy10aW1lLWNvbnRyb2xzIHZqcy1jb250cm9sJ1xyXG4gIH0pO1xyXG5cclxuICB0aGlzLmNvbnRlbnQgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1kdXJhdGlvbi1kaXNwbGF5JyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkR1cmF0aW9uIFRpbWUgPC9zcGFuPicgKyAnMDowMCcsIC8vIGxhYmVsIHRoZSBkdXJhdGlvbiB0aW1lIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzXHJcbiAgICAnYXJpYS1saXZlJzogJ29mZicgLy8gdGVsbCBzY3JlZW4gcmVhZGVycyBub3QgdG8gYXV0b21hdGljYWxseSByZWFkIHRoZSB0aW1lIGFzIGl0IGNoYW5nZXNcclxuICB9KTtcclxuXHJcbiAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdkaXYnKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTtcclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG52anMuRHVyYXRpb25EaXNwbGF5LnByb3RvdHlwZS51cGRhdGVDb250ZW50ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZHVyYXRpb24gPSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcclxuICBpZiAoZHVyYXRpb24pIHtcclxuICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5EdXJhdGlvbiBUaW1lIDwvc3Bhbj4nICsgdmpzLmZvcm1hdFRpbWUoZHVyYXRpb24pOyAvLyBsYWJlbCB0aGUgZHVyYXRpb24gdGltZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vyc1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgc2VwYXJhdG9yIGJldHdlZW4gdGhlIGN1cnJlbnQgdGltZSBhbmQgZHVyYXRpb25cclxuICpcclxuICogQ2FuIGJlIGhpZGRlbiBpZiBpdCdzIG5vdCBuZWVkZWQgaW4gdGhlIGRlc2lnbi5cclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5UaW1lRGl2aWRlciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuVGltZURpdmlkZXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXRpbWUtZGl2aWRlcicsXHJcbiAgICBpbm5lckhUTUw6ICc8ZGl2PjxzcGFuPi88L3NwYW4+PC9kaXY+J1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSB0aW1lIGxlZnQgaW4gdGhlIHZpZGVvXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuUmVtYWluaW5nVGltZURpc3BsYXkgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUNvbnRlbnQpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlJlbWFpbmluZ1RpbWVEaXNwbGF5LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGVsID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXJlbWFpbmluZy10aW1lIHZqcy10aW1lLWNvbnRyb2xzIHZqcy1jb250cm9sJ1xyXG4gIH0pO1xyXG5cclxuICB0aGlzLmNvbnRlbnQgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1yZW1haW5pbmctdGltZS1kaXNwbGF5JyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPlJlbWFpbmluZyBUaW1lIDwvc3Bhbj4nICsgJy0wOjAwJywgLy8gbGFiZWwgdGhlIHJlbWFpbmluZyB0aW1lIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzXHJcbiAgICAnYXJpYS1saXZlJzogJ29mZicgLy8gdGVsbCBzY3JlZW4gcmVhZGVycyBub3QgdG8gYXV0b21hdGljYWxseSByZWFkIHRoZSB0aW1lIGFzIGl0IGNoYW5nZXNcclxuICB9KTtcclxuXHJcbiAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdkaXYnKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTtcclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG52anMuUmVtYWluaW5nVGltZURpc3BsYXkucHJvdG90eXBlLnVwZGF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLnBsYXllcl8uZHVyYXRpb24oKSkge1xyXG4gICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5SZW1haW5pbmcgVGltZSA8L3NwYW4+JyArICctJysgdmpzLmZvcm1hdFRpbWUodGhpcy5wbGF5ZXJfLnJlbWFpbmluZ1RpbWUoKSk7XHJcbiAgfVxyXG5cclxuICAvLyBBbGxvd3MgZm9yIHNtb290aCBzY3J1YmJpbmcsIHdoZW4gcGxheWVyIGNhbid0IGtlZXAgdXAuXHJcbiAgLy8gdmFyIHRpbWUgPSAodGhpcy5wbGF5ZXJfLnNjcnViYmluZykgPyB0aGlzLnBsYXllcl8uZ2V0Q2FjaGUoKS5jdXJyZW50VGltZSA6IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG4gIC8vIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSB2anMuZm9ybWF0VGltZSh0aW1lLCB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUb2dnbGUgZnVsbHNjcmVlbiB2aWRlb1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAZXh0ZW5kcyB2anMuQnV0dG9uXHJcbiAqL1xyXG52anMuRnVsbHNjcmVlblRvZ2dsZSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAbWVtYmVyb2YgdmpzLkZ1bGxzY3JlZW5Ub2dnbGVcclxuICAgKiBAaW5zdGFuY2VcclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5GdWxsc2NyZWVuVG9nZ2xlLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ0Z1bGxzY3JlZW4nO1xyXG5cclxudmpzLkZ1bGxzY3JlZW5Ub2dnbGUucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiAndmpzLWZ1bGxzY3JlZW4tY29udHJvbCAnICsgdmpzLkJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxudmpzLkZ1bGxzY3JlZW5Ub2dnbGUucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIGlmICghdGhpcy5wbGF5ZXJfLmlzRnVsbFNjcmVlbikge1xyXG4gICAgdGhpcy5wbGF5ZXJfLnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAgICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnTm9uLUZ1bGxzY3JlZW4nOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiTm9uLUZ1bGxzY3JlZW5cIlxyXG4gIH0gZWxzZSB7XHJcbiAgICB0aGlzLnBsYXllcl8uY2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ0Z1bGxzY3JlZW4nOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0byBcIkZ1bGxzY3JlZW5cIlxyXG4gIH1cclxufTtcclxuLyoqXHJcbiAqIFRoZSBQcm9ncmVzcyBDb250cm9sIGNvbXBvbmVudCBjb250YWlucyB0aGUgc2VlayBiYXIsIGxvYWQgcHJvZ3Jlc3MsXHJcbiAqIGFuZCBwbGF5IHByb2dyZXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuUHJvZ3Jlc3NDb250cm9sID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Qcm9ncmVzc0NvbnRyb2wucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICAnc2Vla0Jhcic6IHt9XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlByb2dyZXNzQ29udHJvbC5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtcHJvZ3Jlc3MtY29udHJvbCB2anMtY29udHJvbCdcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZWVrIEJhciBhbmQgaG9sZGVyIGZvciB0aGUgcHJvZ3Jlc3MgYmFyc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlNlZWtCYXIgPSB2anMuU2xpZGVyLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuU2xpZGVyLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICAgIHBsYXllci5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQVJJQUF0dHJpYnV0ZXMpKTtcclxuICAgIHBsYXllci5yZWFkeSh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICBjaGlsZHJlbjoge1xyXG4gICAgJ2xvYWRQcm9ncmVzc0Jhcic6IHt9LFxyXG4gICAgJ3BsYXlQcm9ncmVzc0Jhcic6IHt9LFxyXG4gICAgJ3NlZWtIYW5kbGUnOiB7fVxyXG4gIH0sXHJcbiAgJ2Jhck5hbWUnOiAncGxheVByb2dyZXNzQmFyJyxcclxuICAnaGFuZGxlTmFtZSc6ICdzZWVrSGFuZGxlJ1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLnBsYXllckV2ZW50ID0gJ3RpbWV1cGRhdGUnO1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXByb2dyZXNzLWhvbGRlcicsXHJcbiAgICAnYXJpYS1sYWJlbCc6ICd2aWRlbyBwcm9ncmVzcyBiYXInXHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUudXBkYXRlQVJJQUF0dHJpYnV0ZXMgPSBmdW5jdGlvbigpe1xyXG4gICAgLy8gQWxsb3dzIGZvciBzbW9vdGggc2NydWJiaW5nLCB3aGVuIHBsYXllciBjYW4ndCBrZWVwIHVwLlxyXG4gICAgdmFyIHRpbWUgPSAodGhpcy5wbGF5ZXJfLnNjcnViYmluZykgPyB0aGlzLnBsYXllcl8uZ2V0Q2FjaGUoKS5jdXJyZW50VGltZSA6IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93Jyx2anMucm91bmQodGhpcy5nZXRQZXJjZW50KCkqMTAwLCAyKSk7IC8vIG1hY2hpbmUgcmVhZGFibGUgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyIChwZXJjZW50YWdlIGNvbXBsZXRlKVxyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsdmpzLmZvcm1hdFRpbWUodGltZSwgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkpKTsgLy8gaHVtYW4gcmVhZGFibGUgdmFsdWUgb2YgcHJvZ3Jlc3MgYmFyICh0aW1lIGNvbXBsZXRlKVxyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLmdldFBlcmNlbnQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBjdXJyZW50VGltZTtcclxuICAvLyBGbGFzaCBSVE1QIHByb3ZpZGVyIHdpbGwgbm90IHJlcG9ydCB0aGUgY29ycmVjdCB0aW1lXHJcbiAgLy8gaW1tZWRpYXRlbHkgYWZ0ZXIgYSBzZWVrLiBUaGlzIGlzbid0IG5vdGljZWFibGUgaWYgeW91J3JlXHJcbiAgLy8gc2Vla2luZyB3aGlsZSB0aGUgdmlkZW8gaXMgcGxheWluZywgYnV0IGl0IGlzIGlmIHlvdSBzZWVrXHJcbiAgLy8gd2hpbGUgdGhlIHZpZGVvIGlzIHBhdXNlZC5cclxuICBpZiAodGhpcy5wbGF5ZXJfLnRlY2hOYW1lID09PSAnRmxhc2gnICYmIHRoaXMucGxheWVyXy5zZWVraW5nKCkpIHtcclxuICAgIHZhciBjYWNoZSA9IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpO1xyXG4gICAgaWYgKGNhY2hlLmxhc3RTZXRDdXJyZW50VGltZSkge1xyXG4gICAgICBjdXJyZW50VGltZSA9IGNhY2hlLmxhc3RTZXRDdXJyZW50VGltZTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICBjdXJyZW50VGltZSA9IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIGN1cnJlbnRUaW1lID0gdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gY3VycmVudFRpbWUgLyB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB2anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlRG93bi5jYWxsKHRoaXMsIGV2ZW50KTtcclxuXHJcbiAgdGhpcy5wbGF5ZXJfLnNjcnViYmluZyA9IHRydWU7XHJcblxyXG4gIHRoaXMudmlkZW9XYXNQbGF5aW5nID0gIXRoaXMucGxheWVyXy5wYXVzZWQoKTtcclxuICB0aGlzLnBsYXllcl8ucGF1c2UoKTtcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB2YXIgbmV3VGltZSA9IHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQpICogdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XHJcblxyXG4gIC8vIERvbid0IGxldCB2aWRlbyBlbmQgd2hpbGUgc2NydWJiaW5nLlxyXG4gIGlmIChuZXdUaW1lID09IHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSB7IG5ld1RpbWUgPSBuZXdUaW1lIC0gMC4xOyB9XHJcblxyXG4gIC8vIFNldCBuZXcgdGltZSAodGVsbCBwbGF5ZXIgdG8gc2VlayB0byBuZXcgdGltZSlcclxuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUobmV3VGltZSk7XHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHZqcy5TbGlkZXIucHJvdG90eXBlLm9uTW91c2VVcC5jYWxsKHRoaXMsIGV2ZW50KTtcclxuXHJcbiAgdGhpcy5wbGF5ZXJfLnNjcnViYmluZyA9IGZhbHNlO1xyXG4gIGlmICh0aGlzLnZpZGVvV2FzUGxheWluZykge1xyXG4gICAgdGhpcy5wbGF5ZXJfLnBsYXkoKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUuc3RlcEZvcndhcmQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy5jdXJyZW50VGltZSh0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKSArIDUpOyAvLyBtb3JlIHF1aWNrbHkgZmFzdCBmb3J3YXJkIGZvciBrZXlib2FyZC1vbmx5IHVzZXJzXHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUuc3RlcEJhY2sgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy5jdXJyZW50VGltZSh0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKSAtIDUpOyAvLyBtb3JlIHF1aWNrbHkgcmV3aW5kIGZvciBrZXlib2FyZC1vbmx5IHVzZXJzXHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFNob3dzIGxvYWQgcHJvZ3Jlc3NcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Mb2FkUHJvZ3Jlc3NCYXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICAgIHBsYXllci5vbigncHJvZ3Jlc3MnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuTG9hZFByb2dyZXNzQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1sb2FkLXByb2dyZXNzJyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkxvYWRlZDogMCU8L3NwYW4+J1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLkxvYWRQcm9ncmVzc0Jhci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5lbF8uc3R5bGUpIHsgdGhpcy5lbF8uc3R5bGUud2lkdGggPSB2anMucm91bmQodGhpcy5wbGF5ZXJfLmJ1ZmZlcmVkUGVyY2VudCgpICogMTAwLCAyKSArICclJzsgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTaG93cyBwbGF5IHByb2dyZXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuUGxheVByb2dyZXNzQmFyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5QbGF5UHJvZ3Jlc3NCYXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXBsYXktcHJvZ3Jlc3MnLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+UHJvZ3Jlc3M6IDAlPC9zcGFuPidcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgU2VlayBIYW5kbGUgc2hvd3MgdGhlIGN1cnJlbnQgcG9zaXRpb24gb2YgdGhlIHBsYXloZWFkIGR1cmluZyBwbGF5YmFjayxcclxuICogYW5kIGNhbiBiZSBkcmFnZ2VkIHRvIGFkanVzdCB0aGUgcGxheWhlYWQuXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU2Vla0hhbmRsZSA9IHZqcy5TbGlkZXJIYW5kbGUuZXh0ZW5kKCk7XHJcblxyXG4vKipcclxuICogVGhlIGRlZmF1bHQgdmFsdWUgZm9yIHRoZSBoYW5kbGUgY29udGVudCwgd2hpY2ggbWF5IGJlIHJlYWQgYnkgc2NyZWVuIHJlYWRlcnNcclxuICpcclxuICogQHR5cGUge1N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5TZWVrSGFuZGxlLnByb3RvdHlwZS5kZWZhdWx0VmFsdWUgPSAnMDA6MDAnO1xyXG5cclxuLyoqIEBpbmhlcml0RG9jICovXHJcbnZqcy5TZWVrSGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5TbGlkZXJIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1zZWVrLWhhbmRsZSdcclxuICB9KTtcclxufTtcclxuLyoqXHJcbiAqIFRoZSBjb21wb25lbnQgZm9yIGNvbnRyb2xsaW5nIHRoZSB2b2x1bWUgbGV2ZWxcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Wb2x1bWVDb250cm9sID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gaGlkZSB2b2x1bWUgY29udHJvbHMgd2hlbiB0aGV5J3JlIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgdGVjaFxyXG4gICAgaWYgKHBsYXllci50ZWNoICYmIHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgIH1cclxuICAgIHBsYXllci5vbignbG9hZHN0YXJ0JywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuVm9sdW1lQ29udHJvbC5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAgY2hpbGRyZW46IHtcclxuICAgICd2b2x1bWVCYXInOiB7fVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5Wb2x1bWVDb250cm9sLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtY29udHJvbCB2anMtY29udHJvbCdcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFyIHRoYXQgY29udGFpbnMgdGhlIHZvbHVtZSBsZXZlbCBhbmQgY2FuIGJlIGNsaWNrZWQgb24gdG8gYWRqdXN0IHRoZSBsZXZlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlZvbHVtZUJhciA9IHZqcy5TbGlkZXIuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5TbGlkZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gICAgcGxheWVyLm9uKCd2b2x1bWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzKSk7XHJcbiAgICBwbGF5ZXIucmVhZHkodmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xyXG4gICAgc2V0VGltZW91dCh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSksIDApOyAvLyB1cGRhdGUgd2hlbiBlbGVtZW50cyBpcyBpbiBET01cclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUudXBkYXRlQVJJQUF0dHJpYnV0ZXMgPSBmdW5jdGlvbigpe1xyXG4gIC8vIEN1cnJlbnQgdmFsdWUgb2Ygdm9sdW1lIGJhciBhcyBhIHBlcmNlbnRhZ2VcclxuICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLHZqcy5yb3VuZCh0aGlzLnBsYXllcl8udm9sdW1lKCkqMTAwLCAyKSk7XHJcbiAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVldGV4dCcsdmpzLnJvdW5kKHRoaXMucGxheWVyXy52b2x1bWUoKSoxMDAsIDIpKyclJyk7XHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICBjaGlsZHJlbjoge1xyXG4gICAgJ3ZvbHVtZUxldmVsJzoge30sXHJcbiAgICAndm9sdW1lSGFuZGxlJzoge31cclxuICB9LFxyXG4gICdiYXJOYW1lJzogJ3ZvbHVtZUxldmVsJyxcclxuICAnaGFuZGxlTmFtZSc6ICd2b2x1bWVIYW5kbGUnXHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5wbGF5ZXJFdmVudCA9ICd2b2x1bWVjaGFuZ2UnO1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuU2xpZGVyLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLWJhcicsXHJcbiAgICAnYXJpYS1sYWJlbCc6ICd2b2x1bWUgbGV2ZWwnXHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5vbk1vdXNlTW92ZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgaWYgKHRoaXMucGxheWVyXy5tdXRlZCgpKSB7XHJcbiAgICB0aGlzLnBsYXllcl8ubXV0ZWQoZmFsc2UpO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5wbGF5ZXJfLnZvbHVtZSh0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50KSk7XHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5nZXRQZXJjZW50ID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5wbGF5ZXJfLm11dGVkKCkpIHtcclxuICAgIHJldHVybiAwO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJfLnZvbHVtZSgpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLnN0ZXBGb3J3YXJkID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8udm9sdW1lKHRoaXMucGxheWVyXy52b2x1bWUoKSArIDAuMSk7XHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5zdGVwQmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLnZvbHVtZSh0aGlzLnBsYXllcl8udm9sdW1lKCkgLSAwLjEpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3dzIHZvbHVtZSBsZXZlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlZvbHVtZUxldmVsID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Wb2x1bWVMZXZlbC5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLWxldmVsJyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPjwvc3Bhbj4nXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIHZvbHVtZSBoYW5kbGUgY2FuIGJlIGRyYWdnZWQgdG8gYWRqdXN0IHRoZSB2b2x1bWUgbGV2ZWxcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbiB2anMuVm9sdW1lSGFuZGxlID0gdmpzLlNsaWRlckhhbmRsZS5leHRlbmQoKTtcclxuXHJcbiB2anMuVm9sdW1lSGFuZGxlLnByb3RvdHlwZS5kZWZhdWx0VmFsdWUgPSAnMDA6MDAnO1xyXG5cclxuIC8qKiBAaW5oZXJpdERvYyAqL1xyXG4gdmpzLlZvbHVtZUhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gICByZXR1cm4gdmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtaGFuZGxlJ1xyXG4gICB9KTtcclxuIH07XHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiBjb21wb25lbnQgZm9yIG11dGluZyB0aGUgYXVkaW9cclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NdXRlVG9nZ2xlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCd2b2x1bWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIC8vIGhpZGUgbXV0ZSB0b2dnbGUgaWYgdGhlIGN1cnJlbnQgdGVjaCBkb2Vzbid0IHN1cHBvcnQgdm9sdW1lIGNvbnRyb2xcclxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmIChwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLk11dGVUb2dnbGUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLW11dGUtY29udHJvbCB2anMtY29udHJvbCcsXHJcbiAgICBpbm5lckhUTUw6ICc8ZGl2PjxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPk11dGU8L3NwYW4+PC9kaXY+J1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLk11dGVUb2dnbGUucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy5tdXRlZCggdGhpcy5wbGF5ZXJfLm11dGVkKCkgPyBmYWxzZSA6IHRydWUgKTtcclxufTtcclxuXHJcbnZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB2b2wgPSB0aGlzLnBsYXllcl8udm9sdW1lKCksXHJcbiAgICAgIGxldmVsID0gMztcclxuXHJcbiAgaWYgKHZvbCA9PT0gMCB8fCB0aGlzLnBsYXllcl8ubXV0ZWQoKSkge1xyXG4gICAgbGV2ZWwgPSAwO1xyXG4gIH0gZWxzZSBpZiAodm9sIDwgMC4zMykge1xyXG4gICAgbGV2ZWwgPSAxO1xyXG4gIH0gZWxzZSBpZiAodm9sIDwgMC42Nykge1xyXG4gICAgbGV2ZWwgPSAyO1xyXG4gIH1cclxuXHJcbiAgLy8gRG9uJ3QgcmV3cml0ZSB0aGUgYnV0dG9uIHRleHQgaWYgdGhlIGFjdHVhbCB0ZXh0IGRvZXNuJ3QgY2hhbmdlLlxyXG4gIC8vIFRoaXMgY2F1c2VzIHVubmVjZXNzYXJ5IGFuZCBjb25mdXNpbmcgaW5mb3JtYXRpb24gZm9yIHNjcmVlbiByZWFkZXIgdXNlcnMuXHJcbiAgLy8gVGhpcyBjaGVjayBpcyBuZWVkZWQgYmVjYXVzZSB0aGlzIGZ1bmN0aW9uIGdldHMgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIHZvbHVtZSBsZXZlbCBpcyBjaGFuZ2VkLlxyXG4gIGlmKHRoaXMucGxheWVyXy5tdXRlZCgpKXtcclxuICAgICAgaWYodGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MIT0nVW5tdXRlJyl7XHJcbiAgICAgICAgICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnVW5tdXRlJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIlVubXV0ZVwiXHJcbiAgICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgICBpZih0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwhPSdNdXRlJyl7XHJcbiAgICAgICAgICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnTXV0ZSc7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJNdXRlXCJcclxuICAgICAgfVxyXG4gIH1cclxuXHJcbiAgLyogVE9ETyBpbXByb3ZlIG11dGVkIGljb24gY2xhc3NlcyAqL1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtdm9sLScraSk7XHJcbiAgfVxyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy12b2wtJytsZXZlbCk7XHJcbn07XHJcbi8qKlxyXG4gKiBNZW51IGJ1dHRvbiB3aXRoIGEgcG9wdXAgZm9yIHNob3dpbmcgdGhlIHZvbHVtZSBzbGlkZXIuXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlZvbHVtZU1lbnVCdXR0b24gPSB2anMuTWVudUJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLk1lbnVCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIFNhbWUgbGlzdGVuZXJzIGFzIE11dGVUb2dnbGVcclxuICAgIHBsYXllci5vbigndm9sdW1lY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICAvLyBoaWRlIG11dGUgdG9nZ2xlIGlmIHRoZSBjdXJyZW50IHRlY2ggZG9lc24ndCBzdXBwb3J0IHZvbHVtZSBjb250cm9sXHJcbiAgICBpZiAocGxheWVyLnRlY2ggJiYgcGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXMudm9sdW1lQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgfVxyXG4gICAgcGxheWVyLm9uKCdsb2Fkc3RhcnQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXMudm9sdW1lQ29udHJvbCA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLmFkZENsYXNzKCd2anMtbWVudS1idXR0b24nKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlZvbHVtZU1lbnVCdXR0b24ucHJvdG90eXBlLmNyZWF0ZU1lbnUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBtZW51ID0gbmV3IHZqcy5NZW51KHRoaXMucGxheWVyXywge1xyXG4gICAgY29udGVudEVsVHlwZTogJ2RpdidcclxuICB9KTtcclxuICB2YXIgdmMgPSBuZXcgdmpzLlZvbHVtZUJhcih0aGlzLnBsYXllcl8sIHZqcy5vYmoubWVyZ2Uoe3ZlcnRpY2FsOiB0cnVlfSwgdGhpcy5vcHRpb25zXy52b2x1bWVCYXIpKTtcclxuICBtZW51LmFkZENoaWxkKHZjKTtcclxuICByZXR1cm4gbWVudTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVNZW51QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB2anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xyXG4gIHZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLW1lbnUtYnV0dG9uIHZqcy1tZW51LWJ1dHRvbiB2anMtY29udHJvbCcsXHJcbiAgICBpbm5lckhUTUw6ICc8ZGl2PjxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPk11dGU8L3NwYW4+PC9kaXY+J1xyXG4gIH0pO1xyXG59O1xyXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUudXBkYXRlID0gdmpzLk11dGVUb2dnbGUucHJvdG90eXBlLnVwZGF0ZTtcclxuLyogUG9zdGVyIEltYWdlXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBUaGUgY29tcG9uZW50IHRoYXQgaGFuZGxlcyBzaG93aW5nIHRoZSBwb3N0ZXIgaW1hZ2UuXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuUG9zdGVySW1hZ2UgPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAoIXBsYXllci5wb3N0ZXIoKSB8fCAhcGxheWVyLmNvbnRyb2xzKCkpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWVyLm9uKCdwbGF5JywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Qb3N0ZXJJbWFnZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBlbCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgICAgIGNsYXNzTmFtZTogJ3Zqcy1wb3N0ZXInLFxyXG5cclxuICAgICAgICAvLyBEb24ndCB3YW50IHBvc3RlciB0byBiZSB0YWJiYWJsZS5cclxuICAgICAgICB0YWJJbmRleDogLTFcclxuICAgICAgfSksXHJcbiAgICAgIHBvc3RlciA9IHRoaXMucGxheWVyXy5wb3N0ZXIoKTtcclxuXHJcbiAgaWYgKHBvc3Rlcikge1xyXG4gICAgaWYgKCdiYWNrZ3JvdW5kU2l6ZScgaW4gZWwuc3R5bGUpIHtcclxuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gJ3VybChcIicgKyBwb3N0ZXIgKyAnXCIpJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnaW1nJywgeyBzcmM6IHBvc3RlciB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG52anMuUG9zdGVySW1hZ2UucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIC8vIE9ubHkgYWNjZXB0IGNsaWNrcyB3aGVuIGNvbnRyb2xzIGFyZSBlbmFibGVkXHJcbiAgaWYgKHRoaXMucGxheWVyKCkuY29udHJvbHMoKSkge1xyXG4gICAgdGhpcy5wbGF5ZXJfLnBsYXkoKTtcclxuICB9XHJcbn07XHJcbi8qIExvYWRpbmcgU3Bpbm5lclxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogTG9hZGluZyBzcGlubmVyIGZvciB3YWl0aW5nIGV2ZW50c1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Mb2FkaW5nU3Bpbm5lciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbignY2FucGxheScsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG4gICAgcGxheWVyLm9uKCdjYW5wbGF5dGhyb3VnaCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG4gICAgcGxheWVyLm9uKCdwbGF5aW5nJywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICBwbGF5ZXIub24oJ3NlZWtlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG5cclxuICAgIHBsYXllci5vbignc2Vla2luZycsIHZqcy5iaW5kKHRoaXMsIHRoaXMuc2hvdykpO1xyXG5cclxuICAgIC8vIGluIHNvbWUgYnJvd3NlcnMgc2Vla2luZyBkb2VzIG5vdCB0cmlnZ2VyIHRoZSAncGxheWluZycgZXZlbnQsXHJcbiAgICAvLyBzbyB3ZSBhbHNvIG5lZWQgdG8gdHJhcCAnc2Vla2VkJyBpZiB3ZSBhcmUgZ29pbmcgdG8gc2V0IGFcclxuICAgIC8vICdzZWVraW5nJyBldmVudFxyXG4gICAgcGxheWVyLm9uKCdzZWVrZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ2Vycm9yJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XHJcblxyXG4gICAgLy8gTm90IHNob3dpbmcgc3Bpbm5lciBvbiBzdGFsbGVkIGFueSBtb3JlLiBCcm93c2VycyBtYXkgc3RhbGwgYW5kIHRoZW4gbm90IHRyaWdnZXIgYW55IGV2ZW50cyB0aGF0IHdvdWxkIHJlbW92ZSB0aGUgc3Bpbm5lci5cclxuICAgIC8vIENoZWNrZWQgaW4gQ2hyb21lIDE2IGFuZCBTYWZhcmkgNS4xLjIuIGh0dHA6Ly9oZWxwLnZpZGVvanMuY29tL2Rpc2N1c3Npb25zL3Byb2JsZW1zLzg4My13aHktaXMtdGhlLWRvd25sb2FkLXByb2dyZXNzLXNob3dpbmdcclxuICAgIC8vIHBsYXllci5vbignc3RhbGxlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuc2hvdykpO1xyXG5cclxuICAgIHBsYXllci5vbignd2FpdGluZycsIHZqcy5iaW5kKHRoaXMsIHRoaXMuc2hvdykpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuTG9hZGluZ1NwaW5uZXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWxvYWRpbmctc3Bpbm5lcidcclxuICB9KTtcclxufTtcclxuLyogQmlnIFBsYXkgQnV0dG9uXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBJbml0aWFsIHBsYXkgYnV0dG9uLiBTaG93cyBiZWZvcmUgdGhlIHZpZGVvIGhhcyBwbGF5ZWQuIFRoZSBoaWRpbmcgb2YgdGhlXHJcbiAqIGJpZyBwbGF5IGJ1dHRvbiBpcyBkb25lIHZpYSBDU1MgYW5kIHBsYXllciBzdGF0ZXMuXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkJpZ1BsYXlCdXR0b24gPSB2anMuQnV0dG9uLmV4dGVuZCgpO1xyXG5cclxudmpzLkJpZ1BsYXlCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWJpZy1wbGF5LWJ1dHRvbicsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIj48L3NwYW4+JyxcclxuICAgICdhcmlhLWxhYmVsJzogJ3BsYXkgdmlkZW8nXHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuQmlnUGxheUJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLnBsYXkoKTtcclxufTtcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgTWVkaWEgVGVjaG5vbG9neSBDb250cm9sbGVyIC0gQmFzZSBjbGFzcyBmb3IgbWVkaWEgcGxheWJhY2tcclxuICogdGVjaG5vbG9neSBjb250cm9sbGVycyBsaWtlIEZsYXNoIGFuZCBIVE1MNVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBCYXNlIGNsYXNzIGZvciBtZWRpYSAoSFRNTDUgVmlkZW8sIEZsYXNoKSBjb250cm9sbGVyc1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXIgIENlbnRyYWwgcGxheWVyIGluc3RhbmNlXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyBPcHRpb25zIG9iamVjdFxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICB0aGlzLmluaXRDb250cm9sc0xpc3RlbmVycygpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogU2V0IHVwIGNsaWNrIGFuZCB0b3VjaCBsaXN0ZW5lcnMgZm9yIHRoZSBwbGF5YmFjayBlbGVtZW50XHJcbiAqIE9uIGRlc2t0b3BzLCBhIGNsaWNrIG9uIHRoZSB2aWRlbyBpdHNlbGYgd2lsbCB0b2dnbGUgcGxheWJhY2ssXHJcbiAqIG9uIGEgbW9iaWxlIGRldmljZSBhIGNsaWNrIG9uIHRoZSB2aWRlbyB0b2dnbGVzIGNvbnRyb2xzLlxyXG4gKiAodG9nZ2xpbmcgY29udHJvbHMgaXMgZG9uZSBieSB0b2dnbGluZyB0aGUgdXNlciBzdGF0ZSBiZXR3ZWVuIGFjdGl2ZSBhbmRcclxuICogaW5hY3RpdmUpXHJcbiAqXHJcbiAqIEEgdGFwIGNhbiBzaWduYWwgdGhhdCBhIHVzZXIgaGFzIGJlY29tZSBhY3RpdmUsIG9yIGhhcyBiZWNvbWUgaW5hY3RpdmVcclxuICogZS5nLiBhIHF1aWNrIHRhcCBvbiBhbiBpUGhvbmUgbW92aWUgc2hvdWxkIHJldmVhbCB0aGUgY29udHJvbHMuIEFub3RoZXJcclxuICogcXVpY2sgdGFwIHNob3VsZCBoaWRlIHRoZW0gYWdhaW4gKHNpZ25hbGluZyB0aGUgdXNlciBpcyBpbiBhbiBpbmFjdGl2ZVxyXG4gKiB2aWV3aW5nIHN0YXRlKVxyXG4gKlxyXG4gKiBJbiBhZGRpdGlvbiB0byB0aGlzLCB3ZSBzdGlsbCB3YW50IHRoZSB1c2VyIHRvIGJlIGNvbnNpZGVyZWQgaW5hY3RpdmUgYWZ0ZXJcclxuICogYSBmZXcgc2Vjb25kcyBvZiBpbmFjdGl2aXR5LlxyXG4gKlxyXG4gKiBOb3RlOiB0aGUgb25seSBwYXJ0IG9mIGlPUyBpbnRlcmFjdGlvbiB3ZSBjYW4ndCBtaW1pYyB3aXRoIHRoaXMgc2V0dXBcclxuICogaXMgYSB0b3VjaCBhbmQgaG9sZCBvbiB0aGUgdmlkZW8gZWxlbWVudCBjb3VudGluZyBhcyBhY3Rpdml0eSBpbiBvcmRlciB0b1xyXG4gKiBrZWVwIHRoZSBjb250cm9scyBzaG93aW5nLCBidXQgdGhhdCBzaG91bGRuJ3QgYmUgYW4gaXNzdWUuIEEgdG91Y2ggYW5kIGhvbGQgb25cclxuICogYW55IGNvbnRyb2xzIHdpbGwgc3RpbGwga2VlcCB0aGUgdXNlciBhY3RpdmVcclxuICovXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5pbml0Q29udHJvbHNMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBwbGF5ZXIsIHRlY2gsIGFjdGl2YXRlQ29udHJvbHMsIGRlYWN0aXZhdGVDb250cm9scztcclxuXHJcbiAgdGVjaCA9IHRoaXM7XHJcbiAgcGxheWVyID0gdGhpcy5wbGF5ZXIoKTtcclxuXHJcbiAgdmFyIGFjdGl2YXRlQ29udHJvbHMgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYgKHBsYXllci5jb250cm9scygpICYmICFwbGF5ZXIudXNpbmdOYXRpdmVDb250cm9scygpKSB7XHJcbiAgICAgIHRlY2guYWRkQ29udHJvbHNMaXN0ZW5lcnMoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICBkZWFjdGl2YXRlQ29udHJvbHMgPSB2anMuYmluZCh0ZWNoLCB0ZWNoLnJlbW92ZUNvbnRyb2xzTGlzdGVuZXJzKTtcclxuXHJcbiAgLy8gU2V0IHVwIGV2ZW50IGxpc3RlbmVycyBvbmNlIHRoZSB0ZWNoIGlzIHJlYWR5IGFuZCBoYXMgYW4gZWxlbWVudCB0byBhcHBseVxyXG4gIC8vIGxpc3RlbmVycyB0b1xyXG4gIHRoaXMucmVhZHkoYWN0aXZhdGVDb250cm9scyk7XHJcbiAgcGxheWVyLm9uKCdjb250cm9sc2VuYWJsZWQnLCBhY3RpdmF0ZUNvbnRyb2xzKTtcclxuICBwbGF5ZXIub24oJ2NvbnRyb2xzZGlzYWJsZWQnLCBkZWFjdGl2YXRlQ29udHJvbHMpO1xyXG59O1xyXG5cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmFkZENvbnRyb2xzTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcHJldmVudEJ1YmJsZSwgdXNlcldhc0FjdGl2ZTtcclxuXHJcbiAgLy8gU29tZSBicm93c2VycyAoQ2hyb21lICYgSUUpIGRvbid0IHRyaWdnZXIgYSBjbGljayBvbiBhIGZsYXNoIHN3ZiwgYnV0IGRvXHJcbiAgLy8gdHJpZ2dlciBtb3VzZWRvd24vdXAuXHJcbiAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xNDQ0NTYyL2phdmFzY3JpcHQtb25jbGljay1ldmVudC1vdmVyLWZsYXNoLW9iamVjdFxyXG4gIC8vIEFueSB0b3VjaCBldmVudHMgYXJlIHNldCB0byBibG9jayB0aGUgbW91c2Vkb3duIGV2ZW50IGZyb20gaGFwcGVuaW5nXHJcbiAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5vbkNsaWNrKTtcclxuXHJcbiAgLy8gV2UgbmVlZCB0byBibG9jayB0b3VjaCBldmVudHMgb24gdGhlIHZpZGVvIGVsZW1lbnQgZnJvbSBidWJibGluZyB1cCxcclxuICAvLyBvdGhlcndpc2UgdGhleSdsbCBzaWduYWwgYWN0aXZpdHkgcHJlbWF0dXJlbHkuIFRoZSBzcGVjaWZpYyB1c2UgY2FzZSBpc1xyXG4gIC8vIHdoZW4gdGhlIHZpZGVvIGlzIHBsYXlpbmcgYW5kIHRoZSBjb250cm9scyBoYXZlIGZhZGVkIG91dC4gSW4gdGhpcyBjYXNlXHJcbiAgLy8gb25seSBhIHRhcCAoZmFzdCB0b3VjaCkgc2hvdWxkIHRvZ2dsZSB0aGUgdXNlciBhY3RpdmUgc3RhdGUgYW5kIHR1cm4gdGhlXHJcbiAgLy8gY29udHJvbHMgYmFjayBvbi4gQSB0b3VjaCBhbmQgbW92ZSBvciB0b3VjaCBhbmQgaG9sZCBzaG91bGQgbm90IHRyaWdnZXJcclxuICAvLyB0aGUgY29udHJvbHMgKHBlciBpT1MgYXMgYW4gZXhhbXBsZSBhdCBsZWFzdClcclxuICAvL1xyXG4gIC8vIFdlIGFsd2F5cyB3YW50IHRvIHN0b3AgcHJvcGFnYXRpb24gb24gdG91Y2hzdGFydCBiZWNhdXNlIHRvdWNoc3RhcnRcclxuICAvLyBhdCB0aGUgcGxheWVyIGxldmVsIHN0YXJ0cyB0aGUgdG91Y2hJblByb2dyZXNzIGludGVydmFsLiBXZSBjYW4gc3RpbGxcclxuICAvLyByZXBvcnQgYWN0aXZpdHkgb24gdGhlIG90aGVyIGV2ZW50cywgYnV0IHdvbid0IGxldCB0aGVtIGJ1YmJsZSBmb3JcclxuICAvLyBjb25zaXN0ZW5jeS4gV2UgZG9uJ3Qgd2FudCB0byBidWJibGUgYSB0b3VjaGVuZCB3aXRob3V0IGEgdG91Y2hzdGFydC5cclxuICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIC8vIFN0b3AgdGhlIG1vdXNlIGV2ZW50cyBmcm9tIGFsc28gaGFwcGVuaW5nXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAvLyBSZWNvcmQgaWYgdGhlIHVzZXIgd2FzIGFjdGl2ZSBub3cgc28gd2UgZG9uJ3QgaGF2ZSB0byBrZWVwIHBvbGxpbmcgaXRcclxuICAgIHVzZXJXYXNBY3RpdmUgPSB0aGlzLnBsYXllcl8udXNlckFjdGl2ZSgpO1xyXG4gIH0pO1xyXG5cclxuICBwcmV2ZW50QnViYmxlID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICBpZiAodXNlcldhc0FjdGl2ZSkge1xyXG4gICAgICB0aGlzLnBsYXllcl8ucmVwb3J0VXNlckFjdGl2aXR5KCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gVHJlYXQgYWxsIHRvdWNoIGV2ZW50cyB0aGUgc2FtZSBmb3IgY29uc2lzdGVuY3lcclxuICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBwcmV2ZW50QnViYmxlKTtcclxuICB0aGlzLm9uKCd0b3VjaGxlYXZlJywgcHJldmVudEJ1YmJsZSk7XHJcbiAgdGhpcy5vbigndG91Y2hjYW5jZWwnLCBwcmV2ZW50QnViYmxlKTtcclxuICB0aGlzLm9uKCd0b3VjaGVuZCcsIHByZXZlbnRCdWJibGUpO1xyXG5cclxuICAvLyBUdXJuIG9uIGNvbXBvbmVudCB0YXAgZXZlbnRzXHJcbiAgdGhpcy5lbWl0VGFwRXZlbnRzKCk7XHJcblxyXG4gIC8vIFRoZSB0YXAgbGlzdGVuZXIgbmVlZHMgdG8gY29tZSBhZnRlciB0aGUgdG91Y2hlbmQgbGlzdGVuZXIgYmVjYXVzZSB0aGUgdGFwXHJcbiAgLy8gbGlzdGVuZXIgY2FuY2VscyBvdXQgYW55IHJlcG9ydGVkVXNlckFjdGl2aXR5IHdoZW4gc2V0dGluZyB1c2VyQWN0aXZlKGZhbHNlKVxyXG4gIHRoaXMub24oJ3RhcCcsIHRoaXMub25UYXApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgbGlzdGVuZXJzIHVzZWQgZm9yIGNsaWNrIGFuZCB0YXAgY29udHJvbHMuIFRoaXMgaXMgbmVlZGVkIGZvclxyXG4gKiB0b2dnbGluZyB0byBjb250cm9scyBkaXNhYmxlZCwgd2hlcmUgYSB0YXAvdG91Y2ggc2hvdWxkIGRvIG5vdGhpbmcuXHJcbiAqL1xyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUucmVtb3ZlQ29udHJvbHNMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFdlIGRvbid0IHdhbnQgdG8ganVzdCB1c2UgYHRoaXMub2ZmKClgIGJlY2F1c2UgdGhlcmUgbWlnaHQgYmUgb3RoZXIgbmVlZGVkXHJcbiAgLy8gbGlzdGVuZXJzIGFkZGVkIGJ5IHRlY2hzIHRoYXQgZXh0ZW5kIHRoaXMuXHJcbiAgdGhpcy5vZmYoJ3RhcCcpO1xyXG4gIHRoaXMub2ZmKCd0b3VjaHN0YXJ0Jyk7XHJcbiAgdGhpcy5vZmYoJ3RvdWNobW92ZScpO1xyXG4gIHRoaXMub2ZmKCd0b3VjaGxlYXZlJyk7XHJcbiAgdGhpcy5vZmYoJ3RvdWNoY2FuY2VsJyk7XHJcbiAgdGhpcy5vZmYoJ3RvdWNoZW5kJyk7XHJcbiAgdGhpcy5vZmYoJ2NsaWNrJyk7XHJcbiAgdGhpcy5vZmYoJ21vdXNlZG93bicpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBhIGNsaWNrIG9uIHRoZSBtZWRpYSBlbGVtZW50LiBCeSBkZWZhdWx0IHdpbGwgcGxheS9wYXVzZSB0aGUgbWVkaWEuXHJcbiAqL1xyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAvLyBXZSdyZSB1c2luZyBtb3VzZWRvd24gdG8gZGV0ZWN0IGNsaWNrcyB0aGFua3MgdG8gRmxhc2gsIGJ1dCBtb3VzZWRvd25cclxuICAvLyB3aWxsIGFsc28gYmUgdHJpZ2dlcmVkIHdpdGggcmlnaHQtY2xpY2tzLCBzbyB3ZSBuZWVkIHRvIHByZXZlbnQgdGhhdFxyXG4gIGlmIChldmVudC5idXR0b24gIT09IDApIHJldHVybjtcclxuXHJcbiAgLy8gV2hlbiBjb250cm9scyBhcmUgZGlzYWJsZWQgYSBjbGljayBzaG91bGQgbm90IHRvZ2dsZSBwbGF5YmFjayBiZWNhdXNlXHJcbiAgLy8gdGhlIGNsaWNrIGlzIGNvbnNpZGVyZWQgYSBjb250cm9sXHJcbiAgaWYgKHRoaXMucGxheWVyKCkuY29udHJvbHMoKSkge1xyXG4gICAgaWYgKHRoaXMucGxheWVyKCkucGF1c2VkKCkpIHtcclxuICAgICAgdGhpcy5wbGF5ZXIoKS5wbGF5KCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnBsYXllcigpLnBhdXNlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhhbmRsZSBhIHRhcCBvbiB0aGUgbWVkaWEgZWxlbWVudC4gQnkgZGVmYXVsdCBpdCB3aWxsIHRvZ2dsZSB0aGUgdXNlclxyXG4gKiBhY3Rpdml0eSBzdGF0ZSwgd2hpY2ggaGlkZXMgYW5kIHNob3dzIHRoZSBjb250cm9scy5cclxuICovXHJcblxyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUub25UYXAgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyKCkudXNlckFjdGl2ZSghdGhpcy5wbGF5ZXIoKS51c2VyQWN0aXZlKCkpO1xyXG59O1xyXG5cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmZlYXR1cmVzID0ge1xyXG4gICd2b2x1bWVDb250cm9sJzogdHJ1ZSxcclxuXHJcbiAgLy8gUmVzaXppbmcgcGx1Z2lucyB1c2luZyByZXF1ZXN0IGZ1bGxzY3JlZW4gcmVsb2FkcyB0aGUgcGx1Z2luXHJcbiAgJ2Z1bGxzY3JlZW5SZXNpemUnOiBmYWxzZSxcclxuXHJcbiAgLy8gT3B0aW9uYWwgZXZlbnRzIHRoYXQgd2UgY2FuIG1hbnVhbGx5IG1pbWljIHdpdGggdGltZXJzXHJcbiAgLy8gY3VycmVudGx5IG5vdCB0cmlnZ2VyZWQgYnkgdmlkZW8tanMtc3dmXHJcbiAgJ3Byb2dyZXNzRXZlbnRzJzogZmFsc2UsXHJcbiAgJ3RpbWV1cGRhdGVFdmVudHMnOiBmYWxzZVxyXG59O1xyXG5cclxudmpzLm1lZGlhID0ge307XHJcblxyXG4vKipcclxuICogTGlzdCBvZiBkZWZhdWx0IEFQSSBtZXRob2RzIGZvciBhbnkgTWVkaWFUZWNoQ29udHJvbGxlclxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKi9cclxudmpzLm1lZGlhLkFwaU1ldGhvZHMgPSAncGxheSxwYXVzZSxwYXVzZWQsY3VycmVudFRpbWUsc2V0Q3VycmVudFRpbWUsZHVyYXRpb24sYnVmZmVyZWQsdm9sdW1lLHNldFZvbHVtZSxtdXRlZCxzZXRNdXRlZCx3aWR0aCxoZWlnaHQsc3VwcG9ydHNGdWxsU2NyZWVuLGVudGVyRnVsbFNjcmVlbixzcmMsbG9hZCxjdXJyZW50U3JjLHByZWxvYWQsc2V0UHJlbG9hZCxhdXRvcGxheSxzZXRBdXRvcGxheSxsb29wLHNldExvb3AsZXJyb3IsbmV0d29ya1N0YXRlLHJlYWR5U3RhdGUsc2Vla2luZyxpbml0aWFsVGltZSxzdGFydE9mZnNldFRpbWUscGxheWVkLHNlZWthYmxlLGVuZGVkLHZpZGVvVHJhY2tzLGF1ZGlvVHJhY2tzLHZpZGVvV2lkdGgsdmlkZW9IZWlnaHQsdGV4dFRyYWNrcyxkZWZhdWx0UGxheWJhY2tSYXRlLHBsYXliYWNrUmF0ZSxtZWRpYUdyb3VwLGNvbnRyb2xsZXIsY29udHJvbHMsZGVmYXVsdE11dGVkJy5zcGxpdCgnLCcpO1xyXG4vLyBDcmVhdGUgcGxhY2Vob2xkZXIgbWV0aG9kcyBmb3IgZWFjaCB0aGF0IHdhcm4gd2hlbiBhIG1ldGhvZCBpc24ndCBzdXBwb3J0ZWQgYnkgdGhlIGN1cnJlbnQgcGxheWJhY2sgdGVjaG5vbG9neVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTWV0aG9kKG1ldGhvZE5hbWUpe1xyXG4gIHJldHVybiBmdW5jdGlvbigpe1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgXCInK21ldGhvZE5hbWUrJ1wiIG1ldGhvZCBpcyBub3QgYXZhaWxhYmxlIG9uIHRoZSBwbGF5YmFjayB0ZWNobm9sb2d5XFwncyBBUEknKTtcclxuICB9O1xyXG59XHJcblxyXG5mb3IgKHZhciBpID0gdmpzLm1lZGlhLkFwaU1ldGhvZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICB2YXIgbWV0aG9kTmFtZSA9IHZqcy5tZWRpYS5BcGlNZXRob2RzW2ldO1xyXG4gIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZVt2anMubWVkaWEuQXBpTWV0aG9kc1tpXV0gPSBjcmVhdGVNZXRob2QobWV0aG9kTmFtZSk7XHJcbn1cclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgSFRNTDUgTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIEhUTUw1IE1lZGlhIEFQSVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBIVE1MNSBNZWRpYSBDb250cm9sbGVyIC0gV3JhcHBlciBmb3IgSFRNTDUgTWVkaWEgQVBJXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHBhcmFtIHtGdW5jdGlvbj19IHJlYWR5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkh0bWw1ID0gdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICAvLyB2b2x1bWUgY2Fubm90IGJlIGNoYW5nZWQgZnJvbSAxIG9uIGlPU1xyXG4gICAgdGhpcy5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID0gdmpzLkh0bWw1LmNhbkNvbnRyb2xWb2x1bWUoKTtcclxuXHJcbiAgICAvLyBJbiBpT1MsIGlmIHlvdSBtb3ZlIGEgdmlkZW8gZWxlbWVudCBpbiB0aGUgRE9NLCBpdCBicmVha3MgdmlkZW8gcGxheWJhY2suXHJcbiAgICB0aGlzLmZlYXR1cmVzWydtb3ZpbmdNZWRpYUVsZW1lbnRJbkRPTSddID0gIXZqcy5JU19JT1M7XHJcblxyXG4gICAgLy8gSFRNTCB2aWRlbyBpcyBhYmxlIHRvIGF1dG9tYXRpY2FsbHkgcmVzaXplIHdoZW4gZ29pbmcgdG8gZnVsbHNjcmVlblxyXG4gICAgdGhpcy5mZWF0dXJlc1snZnVsbHNjcmVlblJlc2l6ZSddID0gdHJ1ZTtcclxuXHJcbiAgICB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIHZhciBzb3VyY2UgPSBvcHRpb25zWydzb3VyY2UnXTtcclxuXHJcbiAgICAvLyBJZiB0aGUgZWxlbWVudCBzb3VyY2UgaXMgYWxyZWFkeSBzZXQsIHdlIG1heSBoYXZlIG1pc3NlZCB0aGUgbG9hZHN0YXJ0IGV2ZW50LCBhbmQgd2FudCB0byB0cmlnZ2VyIGl0LlxyXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBzZXQgdGhlIHNvdXJjZSBhZ2FpbiBhbmQgaW50ZXJydXB0IHBsYXliYWNrLlxyXG4gICAgaWYgKHNvdXJjZSAmJiB0aGlzLmVsXy5jdXJyZW50U3JjID09PSBzb3VyY2Uuc3JjICYmIHRoaXMuZWxfLm5ldHdvcmtTdGF0ZSA+IDApIHtcclxuICAgICAgcGxheWVyLnRyaWdnZXIoJ2xvYWRzdGFydCcpO1xyXG5cclxuICAgIC8vIE90aGVyd2lzZSBzZXQgdGhlIHNvdXJjZSBpZiBvbmUgd2FzIHByb3ZpZGVkLlxyXG4gICAgfSBlbHNlIGlmIChzb3VyY2UpIHtcclxuICAgICAgdGhpcy5lbF8uc3JjID0gc291cmNlLnNyYztcclxuICAgIH1cclxuXHJcbiAgICAvLyBEZXRlcm1pbmUgaWYgbmF0aXZlIGNvbnRyb2xzIHNob3VsZCBiZSB1c2VkXHJcbiAgICAvLyBPdXIgZ29hbCBzaG91bGQgYmUgdG8gZ2V0IHRoZSBjdXN0b20gY29udHJvbHMgb24gbW9iaWxlIHNvbGlkIGV2ZXJ5d2hlcmVcclxuICAgIC8vIHNvIHdlIGNhbiByZW1vdmUgdGhpcyBhbGwgdG9nZXRoZXIuIFJpZ2h0IG5vdyB0aGlzIHdpbGwgYmxvY2sgY3VzdG9tXHJcbiAgICAvLyBjb250cm9scyBvbiB0b3VjaCBlbmFibGVkIGxhcHRvcHMgbGlrZSB0aGUgQ2hyb21lIFBpeGVsXHJcbiAgICBpZiAodmpzLlRPVUNIX0VOQUJMRUQgJiYgcGxheWVyLm9wdGlvbnMoKVsnbmF0aXZlQ29udHJvbHNGb3JUb3VjaCddICE9PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnVzZU5hdGl2ZUNvbnRyb2xzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hyb21lIGFuZCBTYWZhcmkgYm90aCBoYXZlIGlzc3VlcyB3aXRoIGF1dG9wbGF5LlxyXG4gICAgLy8gSW4gU2FmYXJpICg1LjEuMSksIHdoZW4gd2UgbW92ZSB0aGUgdmlkZW8gZWxlbWVudCBpbnRvIHRoZSBjb250YWluZXIgZGl2LCBhdXRvcGxheSBkb2Vzbid0IHdvcmsuXHJcbiAgICAvLyBJbiBDaHJvbWUgKDE1KSwgaWYgeW91IGhhdmUgYXV0b3BsYXkgKyBhIHBvc3RlciArIG5vIGNvbnRyb2xzLCB0aGUgdmlkZW8gZ2V0cyBoaWRkZW4gKGJ1dCBhdWRpbyBwbGF5cylcclxuICAgIC8vIFRoaXMgZml4ZXMgYm90aCBpc3N1ZXMuIE5lZWQgdG8gd2FpdCBmb3IgQVBJLCBzbyBpdCB1cGRhdGVzIGRpc3BsYXlzIGNvcnJlY3RseVxyXG4gICAgcGxheWVyLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmICh0aGlzLnRhZyAmJiB0aGlzLm9wdGlvbnNfWydhdXRvcGxheSddICYmIHRoaXMucGF1c2VkKCkpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy50YWdbJ3Bvc3RlciddOyAvLyBDaHJvbWUgRml4LiBGaXhlZCBpbiBDaHJvbWUgdjE2LlxyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnNldHVwVHJpZ2dlcnMoKTtcclxuICAgIHRoaXMudHJpZ2dlclJlYWR5KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBwbGF5ZXIgPSB0aGlzLnBsYXllcl8sXHJcbiAgICAgIC8vIElmIHBvc3NpYmxlLCByZXVzZSBvcmlnaW5hbCB0YWcgZm9yIEhUTUw1IHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudFxyXG4gICAgICBlbCA9IHBsYXllci50YWcsXHJcbiAgICAgIG5ld0VsLFxyXG4gICAgICBjbG9uZTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgdGhpcyBicm93c2VyIHN1cHBvcnRzIG1vdmluZyB0aGUgZWxlbWVudCBpbnRvIHRoZSBib3guXHJcbiAgLy8gT24gdGhlIGlQaG9uZSB2aWRlbyB3aWxsIGJyZWFrIGlmIHlvdSBtb3ZlIHRoZSBlbGVtZW50LFxyXG4gIC8vIFNvIHdlIGhhdmUgdG8gY3JlYXRlIGEgYnJhbmQgbmV3IGVsZW1lbnQuXHJcbiAgaWYgKCFlbCB8fCB0aGlzLmZlYXR1cmVzWydtb3ZpbmdNZWRpYUVsZW1lbnRJbkRPTSddID09PSBmYWxzZSkge1xyXG5cclxuICAgIC8vIElmIHRoZSBvcmlnaW5hbCB0YWcgaXMgc3RpbGwgdGhlcmUsIGNsb25lIGFuZCByZW1vdmUgaXQuXHJcbiAgICBpZiAoZWwpIHtcclxuICAgICAgY2xvbmUgPSBlbC5jbG9uZU5vZGUoZmFsc2UpO1xyXG4gICAgICB2anMuSHRtbDUuZGlzcG9zZU1lZGlhRWxlbWVudChlbCk7XHJcbiAgICAgIGVsID0gY2xvbmU7XHJcbiAgICAgIHBsYXllci50YWcgPSBudWxsO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwgPSB2anMuY3JlYXRlRWwoJ3ZpZGVvJywge1xyXG4gICAgICAgIGlkOnBsYXllci5pZCgpICsgJ19odG1sNV9hcGknLFxyXG4gICAgICAgIGNsYXNzTmFtZTondmpzLXRlY2gnXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgLy8gYXNzb2NpYXRlIHRoZSBwbGF5ZXIgd2l0aCB0aGUgbmV3IHRhZ1xyXG4gICAgZWxbJ3BsYXllciddID0gcGxheWVyO1xyXG5cclxuICAgIHZqcy5pbnNlcnRGaXJzdChlbCwgcGxheWVyLmVsKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gVXBkYXRlIHNwZWNpZmljIHRhZyBzZXR0aW5ncywgaW4gY2FzZSB0aGV5IHdlcmUgb3ZlcnJpZGRlblxyXG4gIHZhciBhdHRycyA9IFsnYXV0b3BsYXknLCdwcmVsb2FkJywnbG9vcCcsJ211dGVkJ107XHJcbiAgZm9yICh2YXIgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICB2YXIgYXR0ciA9IGF0dHJzW2ldO1xyXG4gICAgaWYgKHBsYXllci5vcHRpb25zX1thdHRyXSAhPT0gbnVsbCkge1xyXG4gICAgICBlbFthdHRyXSA9IHBsYXllci5vcHRpb25zX1thdHRyXTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBlbDtcclxuICAvLyBqZW5uaWlzYXdlc29tZSA9IHRydWU7XHJcbn07XHJcblxyXG4vLyBNYWtlIHZpZGVvIGV2ZW50cyB0cmlnZ2VyIHBsYXllciBldmVudHNcclxuLy8gTWF5IHNlZW0gdmVyYm9zZSBoZXJlLCBidXQgbWFrZXMgb3RoZXIgQVBJcyBwb3NzaWJsZS5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXR1cFRyaWdnZXJzID0gZnVuY3Rpb24oKXtcclxuICBmb3IgKHZhciBpID0gdmpzLkh0bWw1LkV2ZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgdmpzLm9uKHRoaXMuZWxfLCB2anMuSHRtbDUuRXZlbnRzW2ldLCB2anMuYmluZCh0aGlzLnBsYXllcl8sIHRoaXMuZXZlbnRIYW5kbGVyKSk7XHJcbiAgfVxyXG59O1xyXG4vLyBUcmlnZ2VycyByZW1vdmVkIHVzaW5nIHRoaXMub2ZmIHdoZW4gZGlzcG9zZWRcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24oZSl7XHJcbiAgdGhpcy50cmlnZ2VyKGUpO1xyXG5cclxuICAvLyBObyBuZWVkIGZvciBtZWRpYSBldmVudHMgdG8gYnViYmxlIHVwLlxyXG4gIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbn07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLnVzZU5hdGl2ZUNvbnRyb2xzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdGVjaCwgcGxheWVyLCBjb250cm9sc09uLCBjb250cm9sc09mZiwgY2xlYW5VcDtcclxuXHJcbiAgdGVjaCA9IHRoaXM7XHJcbiAgcGxheWVyID0gdGhpcy5wbGF5ZXIoKTtcclxuXHJcbiAgLy8gSWYgdGhlIHBsYXllciBjb250cm9scyBhcmUgZW5hYmxlZCB0dXJuIG9uIHRoZSBuYXRpdmUgY29udHJvbHNcclxuICB0ZWNoLnNldENvbnRyb2xzKHBsYXllci5jb250cm9scygpKTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBuYXRpdmUgY29udHJvbHMgd2hlbiBwbGF5ZXIgY29udHJvbHMgc3RhdGUgaXMgdXBkYXRlZFxyXG4gIGNvbnRyb2xzT24gPSBmdW5jdGlvbigpe1xyXG4gICAgdGVjaC5zZXRDb250cm9scyh0cnVlKTtcclxuICB9O1xyXG4gIGNvbnRyb2xzT2ZmID0gZnVuY3Rpb24oKXtcclxuICAgIHRlY2guc2V0Q29udHJvbHMoZmFsc2UpO1xyXG4gIH07XHJcbiAgcGxheWVyLm9uKCdjb250cm9sc2VuYWJsZWQnLCBjb250cm9sc09uKTtcclxuICBwbGF5ZXIub24oJ2NvbnRyb2xzZGlzYWJsZWQnLCBjb250cm9sc09mZik7XHJcblxyXG4gIC8vIENsZWFuIHVwIHdoZW4gbm90IHVzaW5nIG5hdGl2ZSBjb250cm9scyBhbnltb3JlXHJcbiAgY2xlYW5VcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBwbGF5ZXIub2ZmKCdjb250cm9sc2VuYWJsZWQnLCBjb250cm9sc09uKTtcclxuICAgIHBsYXllci5vZmYoJ2NvbnRyb2xzZGlzYWJsZWQnLCBjb250cm9sc09mZik7XHJcbiAgfTtcclxuICB0ZWNoLm9uKCdkaXNwb3NlJywgY2xlYW5VcCk7XHJcbiAgcGxheWVyLm9uKCd1c2luZ2N1c3RvbWNvbnRyb2xzJywgY2xlYW5VcCk7XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgc3RhdGUgb2YgdGhlIHBsYXllciB0byB1c2luZyBuYXRpdmUgY29udHJvbHNcclxuICBwbGF5ZXIudXNpbmdOYXRpdmVDb250cm9scyh0cnVlKTtcclxufTtcclxuXHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpeyB0aGlzLmVsXy5wbGF5KCk7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpeyB0aGlzLmVsXy5wYXVzZSgpOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnBhdXNlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5wYXVzZWQ7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmN1cnJlbnRUaW1lID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmN1cnJlbnRUaW1lOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldEN1cnJlbnRUaW1lID0gZnVuY3Rpb24oc2Vjb25kcyl7XHJcbiAgdHJ5IHtcclxuICAgIHRoaXMuZWxfLmN1cnJlbnRUaW1lID0gc2Vjb25kcztcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIHZqcy5sb2coZSwgJ1ZpZGVvIGlzIG5vdCByZWFkeS4gKFZpZGVvLmpzKScpO1xyXG4gICAgLy8gdGhpcy53YXJuaW5nKFZpZGVvSlMud2FybmluZ3MudmlkZW9Ob3RSZWFkeSk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5kdXJhdGlvbiB8fCAwOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmJ1ZmZlcmVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmJ1ZmZlcmVkOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS52b2x1bWUgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8udm9sdW1lOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldFZvbHVtZSA9IGZ1bmN0aW9uKHBlcmNlbnRBc0RlY2ltYWwpeyB0aGlzLmVsXy52b2x1bWUgPSBwZXJjZW50QXNEZWNpbWFsOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLm11dGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLm11dGVkOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldE11dGVkID0gZnVuY3Rpb24obXV0ZWQpeyB0aGlzLmVsXy5tdXRlZCA9IG11dGVkOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5vZmZzZXRXaWR0aDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5oZWlnaHQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ub2Zmc2V0SGVpZ2h0OyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0eXBlb2YgdGhpcy5lbF8ud2Via2l0RW50ZXJGdWxsU2NyZWVuID09ICdmdW5jdGlvbicpIHtcclxuXHJcbiAgICAvLyBTZWVtcyB0byBiZSBicm9rZW4gaW4gQ2hyb21pdW0vQ2hyb21lICYmIFNhZmFyaSBpbiBMZW9wYXJkXHJcbiAgICBpZiAoL0FuZHJvaWQvLnRlc3QodmpzLlVTRVJfQUdFTlQpIHx8ICEvQ2hyb21lfE1hYyBPUyBYIDEwLjUvLnRlc3QodmpzLlVTRVJfQUdFTlQpKSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmVudGVyRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHZpZGVvID0gdGhpcy5lbF87XHJcbiAgaWYgKHZpZGVvLnBhdXNlZCAmJiB2aWRlby5uZXR3b3JrU3RhdGUgPD0gdmlkZW8uSEFWRV9NRVRBREFUQSkge1xyXG4gICAgLy8gYXR0ZW1wdCB0byBwcmltZSB0aGUgdmlkZW8gZWxlbWVudCBmb3IgcHJvZ3JhbW1hdGljIGFjY2Vzc1xyXG4gICAgLy8gdGhpcyBpc24ndCBuZWNlc3Nhcnkgb24gdGhlIGRlc2t0b3AgYnV0IHNob3VsZG4ndCBodXJ0XHJcbiAgICB0aGlzLmVsXy5wbGF5KCk7XHJcblxyXG4gICAgLy8gcGxheWluZyBhbmQgcGF1c2luZyBzeW5jaHJvbm91c2x5IGR1cmluZyB0aGUgdHJhbnNpdGlvbiB0byBmdWxsc2NyZWVuXHJcbiAgICAvLyBjYW4gZ2V0IGlPUyB+Ni4xIGRldmljZXMgaW50byBhIHBsYXkvcGF1c2UgbG9vcFxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICB2aWRlby53ZWJraXRFbnRlckZ1bGxTY3JlZW4oKTtcclxuICAgIH0sIDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICB2aWRlby53ZWJraXRFbnRlckZ1bGxTY3JlZW4oKTtcclxuICB9XHJcbn07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZXhpdEZ1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLndlYmtpdEV4aXRGdWxsU2NyZWVuKCk7XHJcbn07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc3JjID0gZnVuY3Rpb24oc3JjKXsgdGhpcy5lbF8uc3JjID0gc3JjOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpeyB0aGlzLmVsXy5sb2FkKCk7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuY3VycmVudFNyYyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5jdXJyZW50U3JjOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnByZWxvYWQ7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0UHJlbG9hZCA9IGZ1bmN0aW9uKHZhbCl7IHRoaXMuZWxfLnByZWxvYWQgPSB2YWw7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmF1dG9wbGF5ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmF1dG9wbGF5OyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldEF1dG9wbGF5ID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8uYXV0b3BsYXkgPSB2YWw7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmNvbnRyb2xzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmNvbnRyb2xzOyB9XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0Q29udHJvbHMgPSBmdW5jdGlvbih2YWwpeyB0aGlzLmVsXy5jb250cm9scyA9ICEhdmFsOyB9XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ubG9vcDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRMb29wID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8ubG9vcCA9IHZhbDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZXJyb3IgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uZXJyb3I7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2Vla2luZyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5zZWVraW5nOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmVuZGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmVuZGVkOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmRlZmF1bHRNdXRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5kZWZhdWx0TXV0ZWQ7IH07XHJcblxyXG4vKiBIVE1MNSBTdXBwb3J0IFRlc3RpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxudmpzLkh0bWw1LmlzU3VwcG9ydGVkID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gISF2anMuVEVTVF9WSUQuY2FuUGxheVR5cGU7XHJcbn07XHJcblxyXG52anMuSHRtbDUuY2FuUGxheVNvdXJjZSA9IGZ1bmN0aW9uKHNyY09iail7XHJcbiAgLy8gSUU5IG9uIFdpbmRvd3MgNyB3aXRob3V0IE1lZGlhUGxheWVyIHRocm93cyBhbiBlcnJvciBoZXJlXHJcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpZGVvanMvdmlkZW8uanMvaXNzdWVzLzUxOVxyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gISF2anMuVEVTVF9WSUQuY2FuUGxheVR5cGUoc3JjT2JqLnR5cGUpO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuICAvLyBUT0RPOiBDaGVjayBUeXBlXHJcbiAgLy8gSWYgbm8gVHlwZSwgY2hlY2sgZXh0XHJcbiAgLy8gQ2hlY2sgTWVkaWEgVHlwZVxyXG59O1xyXG5cclxudmpzLkh0bWw1LmNhbkNvbnRyb2xWb2x1bWUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB2b2x1bWUgPSAgdmpzLlRFU1RfVklELnZvbHVtZTtcclxuICB2anMuVEVTVF9WSUQudm9sdW1lID0gKHZvbHVtZSAvIDIpICsgMC4xO1xyXG4gIHJldHVybiB2b2x1bWUgIT09IHZqcy5URVNUX1ZJRC52b2x1bWU7XHJcbn07XHJcblxyXG4vLyBMaXN0IG9mIGFsbCBIVE1MNSBldmVudHMgKHZhcmlvdXMgdXNlcykuXHJcbnZqcy5IdG1sNS5FdmVudHMgPSAnbG9hZHN0YXJ0LHN1c3BlbmQsYWJvcnQsZXJyb3IsZW1wdGllZCxzdGFsbGVkLGxvYWRlZG1ldGFkYXRhLGxvYWRlZGRhdGEsY2FucGxheSxjYW5wbGF5dGhyb3VnaCxwbGF5aW5nLHdhaXRpbmcsc2Vla2luZyxzZWVrZWQsZW5kZWQsZHVyYXRpb25jaGFuZ2UsdGltZXVwZGF0ZSxwcm9ncmVzcyxwbGF5LHBhdXNlLHJhdGVjaGFuZ2Usdm9sdW1lY2hhbmdlJy5zcGxpdCgnLCcpO1xyXG5cclxudmpzLkh0bWw1LmRpc3Bvc2VNZWRpYUVsZW1lbnQgPSBmdW5jdGlvbihlbCl7XHJcbiAgaWYgKCFlbCkgeyByZXR1cm47IH1cclxuXHJcbiAgZWxbJ3BsYXllciddID0gbnVsbDtcclxuXHJcbiAgaWYgKGVsLnBhcmVudE5vZGUpIHtcclxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIGFueSBjaGlsZCB0cmFjayBvciBzb3VyY2Ugbm9kZXMgdG8gcHJldmVudCB0aGVpciBsb2FkaW5nXHJcbiAgd2hpbGUoZWwuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICBlbC5yZW1vdmVDaGlsZChlbC5maXJzdENoaWxkKTtcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBhbnkgc3JjIHJlZmVyZW5jZS4gbm90IHNldHRpbmcgYHNyYz0nJ2AgYmVjYXVzZSB0aGF0IGNhdXNlcyBhIHdhcm5pbmdcclxuICAvLyBpbiBmaXJlZm94XHJcbiAgZWwucmVtb3ZlQXR0cmlidXRlKCdzcmMnKTtcclxuXHJcbiAgLy8gZm9yY2UgdGhlIG1lZGlhIGVsZW1lbnQgdG8gdXBkYXRlIGl0cyBsb2FkaW5nIHN0YXRlIGJ5IGNhbGxpbmcgbG9hZCgpXHJcbiAgaWYgKHR5cGVvZiBlbC5sb2FkID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICBlbC5sb2FkKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gSFRNTDUgRmVhdHVyZSBkZXRlY3Rpb24gYW5kIERldmljZSBGaXhlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cclxuXHJcbiAgLy8gT3ZlcnJpZGUgQW5kcm9pZCAyLjIgYW5kIGxlc3MgY2FuUGxheVR5cGUgbWV0aG9kIHdoaWNoIGlzIGJyb2tlblxyXG5pZiAodmpzLklTX09MRF9BTkRST0lEKSB7XHJcbiAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKS5jb25zdHJ1Y3Rvci5wcm90b3R5cGUuY2FuUGxheVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcclxuICAgIHJldHVybiAodHlwZSAmJiB0eXBlLnRvTG93ZXJDYXNlKCkuaW5kZXhPZigndmlkZW8vbXA0JykgIT0gLTEpID8gJ21heWJlJyA6ICcnO1xyXG4gIH07XHJcbn1cclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgVmlkZW9KUy1TV0YgLSBDdXN0b20gRmxhc2ggUGxheWVyIHdpdGggSFRNTDUtaXNoIEFQSVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vemVuY29kZXIvdmlkZW8tanMtc3dmXHJcbiAqIE5vdCB1c2luZyBzZXR1cFRyaWdnZXJzLiBVc2luZyBnbG9iYWwgb25FdmVudCBmdW5jIHRvIGRpc3RyaWJ1dGUgZXZlbnRzXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEZsYXNoIE1lZGlhIENvbnRyb2xsZXIgLSBXcmFwcGVyIGZvciBmYWxsYmFjayBTV0YgQVBJXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcn0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9uPX0gcmVhZHlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuRmxhc2ggPSB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgdmFyIHNvdXJjZSA9IG9wdGlvbnNbJ3NvdXJjZSddLFxyXG5cclxuICAgICAgICAvLyBXaGljaCBlbGVtZW50IHRvIGVtYmVkIGluXHJcbiAgICAgICAgcGFyZW50RWwgPSBvcHRpb25zWydwYXJlbnRFbCddLFxyXG5cclxuICAgICAgICAvLyBDcmVhdGUgYSB0ZW1wb3JhcnkgZWxlbWVudCB0byBiZSByZXBsYWNlZCBieSBzd2Ygb2JqZWN0XHJcbiAgICAgICAgcGxhY2VIb2xkZXIgPSB0aGlzLmVsXyA9IHZqcy5jcmVhdGVFbCgnZGl2JywgeyBpZDogcGxheWVyLmlkKCkgKyAnX3RlbXBfZmxhc2gnIH0pLFxyXG5cclxuICAgICAgICAvLyBHZW5lcmF0ZSBJRCBmb3Igc3dmIG9iamVjdFxyXG4gICAgICAgIG9iaklkID0gcGxheWVyLmlkKCkrJ19mbGFzaF9hcGknLFxyXG5cclxuICAgICAgICAvLyBTdG9yZSBwbGF5ZXIgb3B0aW9ucyBpbiBsb2NhbCB2YXIgZm9yIG9wdGltaXphdGlvblxyXG4gICAgICAgIC8vIFRPRE86IHN3aXRjaCB0byB1c2luZyBwbGF5ZXIgbWV0aG9kcyBpbnN0ZWFkIG9mIG9wdGlvbnNcclxuICAgICAgICAvLyBlLmcuIHBsYXllci5hdXRvcGxheSgpO1xyXG4gICAgICAgIHBsYXllck9wdGlvbnMgPSBwbGF5ZXIub3B0aW9uc18sXHJcblxyXG4gICAgICAgIC8vIE1lcmdlIGRlZmF1bHQgZmxhc2h2YXJzIHdpdGggb25lcyBwYXNzZWQgaW4gdG8gaW5pdFxyXG4gICAgICAgIGZsYXNoVmFycyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG5cclxuICAgICAgICAgIC8vIFNXRiBDYWxsYmFjayBGdW5jdGlvbnNcclxuICAgICAgICAgICdyZWFkeUZ1bmN0aW9uJzogJ3ZpZGVvanMuRmxhc2gub25SZWFkeScsXHJcbiAgICAgICAgICAnZXZlbnRQcm94eUZ1bmN0aW9uJzogJ3ZpZGVvanMuRmxhc2gub25FdmVudCcsXHJcbiAgICAgICAgICAnZXJyb3JFdmVudFByb3h5RnVuY3Rpb24nOiAndmlkZW9qcy5GbGFzaC5vbkVycm9yJyxcclxuXHJcbiAgICAgICAgICAvLyBQbGF5ZXIgU2V0dGluZ3NcclxuICAgICAgICAgICdhdXRvcGxheSc6IHBsYXllck9wdGlvbnMuYXV0b3BsYXksXHJcbiAgICAgICAgICAncHJlbG9hZCc6IHBsYXllck9wdGlvbnMucHJlbG9hZCxcclxuICAgICAgICAgICdsb29wJzogcGxheWVyT3B0aW9ucy5sb29wLFxyXG4gICAgICAgICAgJ211dGVkJzogcGxheWVyT3B0aW9ucy5tdXRlZFxyXG5cclxuICAgICAgICB9LCBvcHRpb25zWydmbGFzaFZhcnMnXSksXHJcblxyXG4gICAgICAgIC8vIE1lcmdlIGRlZmF1bHQgcGFyYW1lcyB3aXRoIG9uZXMgcGFzc2VkIGluXHJcbiAgICAgICAgcGFyYW1zID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICAgICAgICAnd21vZGUnOiAnb3BhcXVlJywgLy8gT3BhcXVlIGlzIG5lZWRlZCB0byBvdmVybGF5IGNvbnRyb2xzLCBidXQgY2FuIGFmZmVjdCBwbGF5YmFjayBwZXJmb3JtYW5jZVxyXG4gICAgICAgICAgJ2JnY29sb3InOiAnIzAwMDAwMCcgLy8gVXNpbmcgYmdjb2xvciBwcmV2ZW50cyBhIHdoaXRlIGZsYXNoIHdoZW4gdGhlIG9iamVjdCBpcyBsb2FkaW5nXHJcbiAgICAgICAgfSwgb3B0aW9uc1sncGFyYW1zJ10pLFxyXG5cclxuICAgICAgICAvLyBNZXJnZSBkZWZhdWx0IGF0dHJpYnV0ZXMgd2l0aCBvbmVzIHBhc3NlZCBpblxyXG4gICAgICAgIGF0dHJpYnV0ZXMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgICAgICAgICdpZCc6IG9iaklkLFxyXG4gICAgICAgICAgJ25hbWUnOiBvYmpJZCwgLy8gQm90aCBJRCBhbmQgTmFtZSBuZWVkZWQgb3Igc3dmIHRvIGlkZW50aWZ0eSBpdHNlbGZcclxuICAgICAgICAgICdjbGFzcyc6ICd2anMtdGVjaCdcclxuICAgICAgICB9LCBvcHRpb25zWydhdHRyaWJ1dGVzJ10pXHJcbiAgICA7XHJcblxyXG4gICAgLy8gSWYgc291cmNlIHdhcyBzdXBwbGllZCBwYXNzIGFzIGEgZmxhc2ggdmFyLlxyXG4gICAgaWYgKHNvdXJjZSkge1xyXG4gICAgICBpZiAoc291cmNlLnR5cGUgJiYgdmpzLkZsYXNoLmlzU3RyZWFtaW5nVHlwZShzb3VyY2UudHlwZSkpIHtcclxuICAgICAgICB2YXIgcGFydHMgPSB2anMuRmxhc2guc3RyZWFtVG9QYXJ0cyhzb3VyY2Uuc3JjKTtcclxuICAgICAgICBmbGFzaFZhcnNbJ3J0bXBDb25uZWN0aW9uJ10gPSBlbmNvZGVVUklDb21wb25lbnQocGFydHMuY29ubmVjdGlvbik7XHJcbiAgICAgICAgZmxhc2hWYXJzWydydG1wU3RyZWFtJ10gPSBlbmNvZGVVUklDb21wb25lbnQocGFydHMuc3RyZWFtKTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBmbGFzaFZhcnNbJ3NyYyddID0gZW5jb2RlVVJJQ29tcG9uZW50KHZqcy5nZXRBYnNvbHV0ZVVSTChzb3VyY2Uuc3JjKSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBZGQgcGxhY2Vob2xkZXIgdG8gcGxheWVyIGRpdlxyXG4gICAgdmpzLmluc2VydEZpcnN0KHBsYWNlSG9sZGVyLCBwYXJlbnRFbCk7XHJcblxyXG4gICAgLy8gSGF2aW5nIGlzc3VlcyB3aXRoIEZsYXNoIHJlbG9hZGluZyBvbiBjZXJ0YWluIHBhZ2UgYWN0aW9ucyAoaGlkZS9yZXNpemUvZnVsbHNjcmVlbikgaW4gY2VydGFpbiBicm93c2Vyc1xyXG4gICAgLy8gVGhpcyBhbGxvd3MgcmVzZXR0aW5nIHRoZSBwbGF5aGVhZCB3aGVuIHdlIGNhdGNoIHRoZSByZWxvYWRcclxuICAgIGlmIChvcHRpb25zWydzdGFydFRpbWUnXSkge1xyXG4gICAgICB0aGlzLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50VGltZShvcHRpb25zWydzdGFydFRpbWUnXSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZsYXNoIGlGcmFtZSBNb2RlXHJcbiAgICAvLyBJbiB3ZWIgYnJvd3NlcnMgdGhlcmUgYXJlIG11bHRpcGxlIGluc3RhbmNlcyB3aGVyZSBjaGFuZ2luZyB0aGUgcGFyZW50IGVsZW1lbnQgb3IgdmlzaWJpbGl0eSBvZiBhIHBsdWdpbiBjYXVzZXMgdGhlIHBsdWdpbiB0byByZWxvYWQuXHJcbiAgICAvLyAtIEZpcmVmb3gganVzdCBhYm91dCBhbHdheXMuIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkwMjY4IChtaWdodCBiZSBmaXhlZCBieSB2ZXJzaW9uIDEzKVxyXG4gICAgLy8gLSBXZWJraXQgd2hlbiBoaWRpbmcgdGhlIHBsdWdpblxyXG4gICAgLy8gLSBXZWJraXQgYW5kIEZpcmVmb3ggd2hlbiB1c2luZyByZXF1ZXN0RnVsbFNjcmVlbiBvbiBhIHBhcmVudCBlbGVtZW50XHJcbiAgICAvLyBMb2FkaW5nIHRoZSBmbGFzaCBwbHVnaW4gaW50byBhIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCBpRnJhbWUgZ2V0cyBhcm91bmQgbW9zdCBvZiB0aGVzZSBpc3N1ZXMuXHJcbiAgICAvLyBJc3N1ZXMgdGhhdCByZW1haW4gaW5jbHVkZSBoaWRpbmcgdGhlIGVsZW1lbnQgYW5kIHJlcXVlc3RGdWxsU2NyZWVuIGluIEZpcmVmb3ggc3BlY2lmaWNhbGx5XHJcblxyXG4gICAgLy8gVGhlcmUncyBvbiBwYXJ0aWN1bGFybHkgYW5ub3lpbmcgaXNzdWUgd2l0aCB0aGlzIG1ldGhvZCB3aGljaCBpcyB0aGF0IEZpcmVmb3ggdGhyb3dzIGEgc2VjdXJpdHkgZXJyb3Igb24gYW4gb2Zmc2l0ZSBGbGFzaCBvYmplY3QgbG9hZGVkIGludG8gYSBkeW5hbWljYWxseSBjcmVhdGVkIGlGcmFtZS5cclxuICAgIC8vIEV2ZW4gdGhvdWdoIHRoZSBpZnJhbWUgd2FzIGluc2VydGVkIGludG8gYSBwYWdlIG9uIHRoZSB3ZWIsIEZpcmVmb3ggKyBGbGFzaCBjb25zaWRlcnMgaXQgYSBsb2NhbCBhcHAgdHJ5aW5nIHRvIGFjY2VzcyBhbiBpbnRlcm5ldCBmaWxlLlxyXG4gICAgLy8gSSB0cmllZCBtdWxpdHBsZSB3YXlzIG9mIHNldHRpbmcgdGhlIGlmcmFtZSBzcmMgYXR0cmlidXRlIGJ1dCBjb3VsZG4ndCBmaW5kIGEgc3JjIHRoYXQgd29ya2VkIHdlbGwuIFRyaWVkIGEgcmVhbC9mYWtlIHNvdXJjZSwgaW4vb3V0IG9mIGRvbWFpbi5cclxuICAgIC8vIEFsc28gdHJpZWQgYSBtZXRob2QgZnJvbSBzdGFja292ZXJmbG93IHRoYXQgY2F1c2VkIGEgc2VjdXJpdHkgZXJyb3IgaW4gYWxsIGJyb3dzZXJzLiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI0ODY5MDEvaG93LXRvLXNldC1kb2N1bWVudC1kb21haW4tZm9yLWEtZHluYW1pY2FsbHktZ2VuZXJhdGVkLWlmcmFtZVxyXG4gICAgLy8gSW4gdGhlIGVuZCB0aGUgc29sdXRpb24gSSBmb3VuZCB0byB3b3JrIHdhcyBzZXR0aW5nIHRoZSBpZnJhbWUgd2luZG93LmxvY2F0aW9uLmhyZWYgcmlnaHQgYmVmb3JlIGRvaW5nIGEgZG9jdW1lbnQud3JpdGUgb2YgdGhlIEZsYXNoIG9iamVjdC5cclxuICAgIC8vIFRoZSBvbmx5IGRvd25zaWRlIG9mIHRoaXMgaXQgc2VlbXMgdG8gdHJpZ2dlciBhbm90aGVyIGh0dHAgcmVxdWVzdCB0byB0aGUgb3JpZ2luYWwgcGFnZSAobm8gbWF0dGVyIHdoYXQncyBwdXQgaW4gdGhlIGhyZWYpLiBOb3Qgc3VyZSB3aHkgdGhhdCBpcy5cclxuXHJcbiAgICAvLyBOT1RFICgyMDEyLTAxLTI5KTogQ2Fubm90IGdldCBGaXJlZm94IHRvIGxvYWQgdGhlIHJlbW90ZSBob3N0ZWQgU1dGIGludG8gYSBkeW5hbWljYWxseSBjcmVhdGVkIGlGcmFtZVxyXG4gICAgLy8gRmlyZWZveCA5IHRocm93cyBhIHNlY3VyaXR5IGVycm9yLCB1bmxlZXNzIHlvdSBjYWxsIGxvY2F0aW9uLmhyZWYgcmlnaHQgYmVmb3JlIGRvYy53cml0ZS5cclxuICAgIC8vICAgIE5vdCBzdXJlIHdoeSB0aGF0IGV2ZW4gd29ya3MsIGJ1dCBpdCBjYXVzZXMgdGhlIGJyb3dzZXIgdG8gbG9vayBsaWtlIGl0J3MgY29udGludW91c2x5IHRyeWluZyB0byBsb2FkIHRoZSBwYWdlLlxyXG4gICAgLy8gRmlyZWZveCAzLjYga2VlcHMgY2FsbGluZyB0aGUgaWZyYW1lIG9ubG9hZCBmdW5jdGlvbiBhbnl0aW1lIEkgd3JpdGUgdG8gaXQsIGNhdXNpbmcgYW4gZW5kbGVzcyBsb29wLlxyXG5cclxuICAgIGlmIChvcHRpb25zWydpRnJhbWVNb2RlJ10gPT09IHRydWUgJiYgIXZqcy5JU19GSVJFRk9YKSB7XHJcblxyXG4gICAgICAvLyBDcmVhdGUgaUZyYW1lIHdpdGggdmpzLXRlY2ggY2xhc3Mgc28gaXQncyAxMDAlIHdpZHRoL2hlaWdodFxyXG4gICAgICB2YXIgaUZybSA9IHZqcy5jcmVhdGVFbCgnaWZyYW1lJywge1xyXG4gICAgICAgICdpZCc6IG9iaklkICsgJ19pZnJhbWUnLFxyXG4gICAgICAgICduYW1lJzogb2JqSWQgKyAnX2lmcmFtZScsXHJcbiAgICAgICAgJ2NsYXNzTmFtZSc6ICd2anMtdGVjaCcsXHJcbiAgICAgICAgJ3Njcm9sbGluZyc6ICdubycsXHJcbiAgICAgICAgJ21hcmdpbldpZHRoJzogMCxcclxuICAgICAgICAnbWFyZ2luSGVpZ2h0JzogMCxcclxuICAgICAgICAnZnJhbWVCb3JkZXInOiAwXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgLy8gVXBkYXRlIHJlYWR5IGZ1bmN0aW9uIG5hbWVzIGluIGZsYXNoIHZhcnMgZm9yIGlmcmFtZSB3aW5kb3dcclxuICAgICAgZmxhc2hWYXJzWydyZWFkeUZ1bmN0aW9uJ10gPSAncmVhZHknO1xyXG4gICAgICBmbGFzaFZhcnNbJ2V2ZW50UHJveHlGdW5jdGlvbiddID0gJ2V2ZW50cyc7XHJcbiAgICAgIGZsYXNoVmFyc1snZXJyb3JFdmVudFByb3h5RnVuY3Rpb24nXSA9ICdlcnJvcnMnO1xyXG5cclxuICAgICAgLy8gVHJpZWQgbXVsdGlwbGUgbWV0aG9kcyB0byBnZXQgdGhpcyB0byB3b3JrIGluIGFsbCBicm93c2Vyc1xyXG5cclxuICAgICAgLy8gVHJpZWQgZW1iZWRkaW5nIHRoZSBmbGFzaCBvYmplY3QgaW4gdGhlIHBhZ2UgZmlyc3QsIGFuZCB0aGVuIGFkZGluZyBhIHBsYWNlIGhvbGRlciB0byB0aGUgaWZyYW1lLCB0aGVuIHJlcGxhY2luZyB0aGUgcGxhY2Vob2xkZXIgd2l0aCB0aGUgcGFnZSBvYmplY3QuXHJcbiAgICAgIC8vIFRoZSBnb2FsIGhlcmUgd2FzIHRvIHRyeSB0byBsb2FkIHRoZSBzd2YgVVJMIGluIHRoZSBwYXJlbnQgcGFnZSBmaXJzdCBhbmQgaG9wZSB0aGF0IGdvdCBhcm91bmQgdGhlIGZpcmVmb3ggc2VjdXJpdHkgZXJyb3JcclxuICAgICAgLy8gdmFyIG5ld09iaiA9IHZqcy5GbGFzaC5lbWJlZChvcHRpb25zWydzd2YnXSwgcGxhY2VIb2xkZXIsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKTtcclxuICAgICAgLy8gKGluIG9ubG9hZClcclxuICAgICAgLy8gIHZhciB0ZW1wID0gdmpzLmNyZWF0ZUVsKCdhJywgeyBpZDonYXNkZicsIGlubmVySFRNTDogJ2FzZGYnIH0gKTtcclxuICAgICAgLy8gIGlEb2MuYm9keS5hcHBlbmRDaGlsZCh0ZW1wKTtcclxuXHJcbiAgICAgIC8vIFRyaWVkIGVtYmVkZGluZyB0aGUgZmxhc2ggb2JqZWN0IHRocm91Z2ggamF2YXNjcmlwdCBpbiB0aGUgaWZyYW1lIHNvdXJjZS5cclxuICAgICAgLy8gVGhpcyB3b3JrcyBpbiB3ZWJraXQgYnV0IHN0aWxsIHRyaWdnZXJzIHRoZSBmaXJlZm94IHNlY3VyaXR5IGVycm9yXHJcbiAgICAgIC8vIGlGcm0uc3JjID0gJ2phdmFzY3JpcHQ6IGRvY3VtZW50LndyaXRlKCdcIit2anMuRmxhc2guZ2V0RW1iZWRDb2RlKG9wdGlvbnNbJ3N3ZiddLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcykrXCInKTtcIjtcclxuXHJcbiAgICAgIC8vIFRyaWVkIGFuIGFjdHVhbCBsb2NhbCBpZnJhbWUganVzdCB0byBtYWtlIHN1cmUgdGhhdCB3b3JrcywgYnV0IGl0IGtpbGxzIHRoZSBlYXNpbmVzcyBvZiB0aGUgQ0ROIHZlcnNpb24gaWYgeW91IHJlcXVpcmUgdGhlIHVzZXIgdG8gaG9zdCBhbiBpZnJhbWVcclxuICAgICAgLy8gV2Ugc2hvdWxkIGFkZCBhbiBvcHRpb24gdG8gaG9zdCB0aGUgaWZyYW1lIGxvY2FsbHkgdGhvdWdoLCBiZWNhdXNlIGl0IGNvdWxkIGhlbHAgYSBsb3Qgb2YgaXNzdWVzLlxyXG4gICAgICAvLyBpRnJtLnNyYyA9IFwiaWZyYW1lLmh0bWxcIjtcclxuXHJcbiAgICAgIC8vIFdhaXQgdW50aWwgaUZyYW1lIGhhcyBsb2FkZWQgdG8gd3JpdGUgaW50byBpdC5cclxuICAgICAgdmpzLm9uKGlGcm0sICdsb2FkJywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIGlEb2MsXHJcbiAgICAgICAgICAgIGlXaW4gPSBpRnJtLmNvbnRlbnRXaW5kb3c7XHJcblxyXG4gICAgICAgIC8vIFRoZSBvbmUgd29ya2luZyBtZXRob2QgSSBmb3VuZCB3YXMgdG8gdXNlIHRoZSBpZnJhbWUncyBkb2N1bWVudC53cml0ZSgpIHRvIGNyZWF0ZSB0aGUgc3dmIG9iamVjdFxyXG4gICAgICAgIC8vIFRoaXMgZ290IGFyb3VuZCB0aGUgc2VjdXJpdHkgaXNzdWUgaW4gYWxsIGJyb3dzZXJzIGV4Y2VwdCBmaXJlZm94LlxyXG4gICAgICAgIC8vIEkgZGlkIGZpbmQgYSBoYWNrIHdoZXJlIGlmIEkgY2FsbCB0aGUgaWZyYW1lJ3Mgd2luZG93LmxvY2F0aW9uLmhyZWY9JycsIGl0IHdvdWxkIGdldCBhcm91bmQgdGhlIHNlY3VyaXR5IGVycm9yXHJcbiAgICAgICAgLy8gSG93ZXZlciwgdGhlIG1haW4gcGFnZSB3b3VsZCBsb29rIGxpa2UgaXQgd2FzIGxvYWRpbmcgaW5kZWZpbml0ZWx5IChVUkwgYmFyIGxvYWRpbmcgc3Bpbm5lciB3b3VsZCBuZXZlciBzdG9wKVxyXG4gICAgICAgIC8vIFBsdXMgRmlyZWZveCAzLjYgZGlkbid0IHdvcmsgbm8gbWF0dGVyIHdoYXQgSSB0cmllZC5cclxuICAgICAgICAvLyBpZiAodmpzLlVTRVJfQUdFTlQubWF0Y2goJ0ZpcmVmb3gnKSkge1xyXG4gICAgICAgIC8vICAgaVdpbi5sb2NhdGlvbi5ocmVmID0gJyc7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGlGcmFtZSdzIGRvY3VtZW50IGRlcGVuZGluZyBvbiB3aGF0IHRoZSBicm93c2VyIHN1cHBvcnRzXHJcbiAgICAgICAgaURvYyA9IGlGcm0uY29udGVudERvY3VtZW50ID8gaUZybS5jb250ZW50RG9jdW1lbnQgOiBpRnJtLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XHJcblxyXG4gICAgICAgIC8vIFRyaWVkIGVuc3VyaW5nIGJvdGggZG9jdW1lbnQgZG9tYWlucyB3ZXJlIHRoZSBzYW1lLCBidXQgdGhleSBhbHJlYWR5IHdlcmUsIHNvIHRoYXQgd2Fzbid0IHRoZSBpc3N1ZS5cclxuICAgICAgICAvLyBFdmVuIHRyaWVkIGFkZGluZyAvLiB0aGF0IHdhcyBtZW50aW9uZWQgaW4gYSBicm93c2VyIHNlY3VyaXR5IHdyaXRldXBcclxuICAgICAgICAvLyBkb2N1bWVudC5kb21haW4gPSBkb2N1bWVudC5kb21haW4rJy8uJztcclxuICAgICAgICAvLyBpRG9jLmRvbWFpbiA9IGRvY3VtZW50LmRvbWFpbisnLy4nO1xyXG5cclxuICAgICAgICAvLyBUcmllZCBhZGRpbmcgdGhlIG9iamVjdCB0byB0aGUgaWZyYW1lIGRvYydzIGlubmVySFRNTC4gU2VjdXJpdHkgZXJyb3IgaW4gYWxsIGJyb3dzZXJzLlxyXG4gICAgICAgIC8vIGlEb2MuYm9keS5pbm5lckhUTUwgPSBzd2ZPYmplY3RIVE1MO1xyXG5cclxuICAgICAgICAvLyBUcmllZCBhcHBlbmRpbmcgdGhlIG9iamVjdCB0byB0aGUgaWZyYW1lIGRvYydzIGJvZHkuIFNlY3VyaXR5IGVycm9yIGluIGFsbCBicm93c2Vycy5cclxuICAgICAgICAvLyBpRG9jLmJvZHkuYXBwZW5kQ2hpbGQoc3dmT2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy8gVXNpbmcgZG9jdW1lbnQud3JpdGUgYWN0dWFsbHkgZ290IGFyb3VuZCB0aGUgc2VjdXJpdHkgZXJyb3IgdGhhdCBicm93c2VycyB3ZXJlIHRocm93aW5nLlxyXG4gICAgICAgIC8vIEFnYWluLCBpdCdzIGEgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIChzYW1lIGRvbWFpbikgaWZyYW1lLCBsb2FkaW5nIGFuIGV4dGVybmFsIEZsYXNoIHN3Zi5cclxuICAgICAgICAvLyBOb3Qgc3VyZSB3aHkgdGhhdCdzIGEgc2VjdXJpdHkgaXNzdWUsIGJ1dCBhcHBhcmVudGx5IGl0IGlzLlxyXG4gICAgICAgIGlEb2Mud3JpdGUodmpzLkZsYXNoLmdldEVtYmVkQ29kZShvcHRpb25zWydzd2YnXSwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpKTtcclxuXHJcbiAgICAgICAgLy8gU2V0dGluZyB2YXJpYWJsZXMgb24gdGhlIHdpbmRvdyBuZWVkcyB0byBjb21lIGFmdGVyIHRoZSBkb2Mgd3JpdGUgYmVjYXVzZSBvdGhlcndpc2UgdGhleSBjYW4gZ2V0IHJlc2V0IGluIHNvbWUgYnJvd3NlcnNcclxuICAgICAgICAvLyBTbyBmYXIgbm8gaXNzdWVzIHdpdGggc3dmIHJlYWR5IGV2ZW50IGJlaW5nIGNhbGxlZCBiZWZvcmUgaXQncyBzZXQgb24gdGhlIHdpbmRvdy5cclxuICAgICAgICBpV2luWydwbGF5ZXInXSA9IHRoaXMucGxheWVyXztcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIHN3ZiByZWFkeSBmdW5jdGlvbiBmb3IgaUZyYW1lIHdpbmRvd1xyXG4gICAgICAgIGlXaW5bJ3JlYWR5J10gPSB2anMuYmluZCh0aGlzLnBsYXllcl8sIGZ1bmN0aW9uKGN1cnJTd2Ype1xyXG4gICAgICAgICAgdmFyIGVsID0gaURvYy5nZXRFbGVtZW50QnlJZChjdXJyU3dmKSxcclxuICAgICAgICAgICAgICBwbGF5ZXIgPSB0aGlzLFxyXG4gICAgICAgICAgICAgIHRlY2ggPSBwbGF5ZXIudGVjaDtcclxuXHJcbiAgICAgICAgICAvLyBVcGRhdGUgcmVmZXJlbmNlIHRvIHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudFxyXG4gICAgICAgICAgdGVjaC5lbF8gPSBlbDtcclxuXHJcbiAgICAgICAgICAvLyBNYWtlIHN1cmUgc3dmIGlzIGFjdHVhbGx5IHJlYWR5LiBTb21ldGltZXMgdGhlIEFQSSBpc24ndCBhY3R1YWxseSB5ZXQuXHJcbiAgICAgICAgICB2anMuRmxhc2guY2hlY2tSZWFkeSh0ZWNoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGV2ZW50IGxpc3RlbmVyIGZvciBhbGwgc3dmIGV2ZW50c1xyXG4gICAgICAgIGlXaW5bJ2V2ZW50cyddID0gdmpzLmJpbmQodGhpcy5wbGF5ZXJfLCBmdW5jdGlvbihzd2ZJRCwgZXZlbnROYW1lKXtcclxuICAgICAgICAgIHZhciBwbGF5ZXIgPSB0aGlzO1xyXG4gICAgICAgICAgaWYgKHBsYXllciAmJiBwbGF5ZXIudGVjaE5hbWUgPT09ICdmbGFzaCcpIHtcclxuICAgICAgICAgICAgcGxheWVyLnRyaWdnZXIoZXZlbnROYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGVycm9yIGxpc3RlbmVyIGZvciBhbGwgc3dmIGVycm9yc1xyXG4gICAgICAgIGlXaW5bJ2Vycm9ycyddID0gdmpzLmJpbmQodGhpcy5wbGF5ZXJfLCBmdW5jdGlvbihzd2ZJRCwgZXZlbnROYW1lKXtcclxuICAgICAgICAgIHZqcy5sb2coJ0ZsYXNoIEVycm9yJywgZXZlbnROYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgIH0pKTtcclxuXHJcbiAgICAgIC8vIFJlcGxhY2UgcGxhY2Vob2xkZXIgd2l0aCBpRnJhbWUgKGl0IHdpbGwgbG9hZCBub3cpXHJcbiAgICAgIHBsYWNlSG9sZGVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKGlGcm0sIHBsYWNlSG9sZGVyKTtcclxuXHJcbiAgICAvLyBJZiBub3QgdXNpbmcgaUZyYW1lIG1vZGUsIGVtYmVkIGFzIG5vcm1hbCBvYmplY3RcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZqcy5GbGFzaC5lbWJlZChvcHRpb25zWydzd2YnXSwgcGxhY2VIb2xkZXIsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcclxuICB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy52anNfcGxheSgpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8udmpzX3BhdXNlKCk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKHNyYyl7XHJcbiAgaWYgKHZqcy5GbGFzaC5pc1N0cmVhbWluZ1NyYyhzcmMpKSB7XHJcbiAgICBzcmMgPSB2anMuRmxhc2guc3RyZWFtVG9QYXJ0cyhzcmMpO1xyXG4gICAgdGhpcy5zZXRSdG1wQ29ubmVjdGlvbihzcmMuY29ubmVjdGlvbik7XHJcbiAgICB0aGlzLnNldFJ0bXBTdHJlYW0oc3JjLnN0cmVhbSk7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgLy8gTWFrZSBzdXJlIHNvdXJjZSBVUkwgaXMgYWJvc29sdXRlLlxyXG4gICAgc3JjID0gdmpzLmdldEFic29sdXRlVVJMKHNyYyk7XHJcbiAgICB0aGlzLmVsXy52anNfc3JjKHNyYyk7XHJcbiAgfVxyXG5cclxuICAvLyBDdXJyZW50bHkgdGhlIFNXRiBkb2Vzbid0IGF1dG9wbGF5IGlmIHlvdSBsb2FkIGEgc291cmNlIGxhdGVyLlxyXG4gIC8vIGUuZy4gTG9hZCBwbGF5ZXIgdy8gbm8gc291cmNlLCB3YWl0IDJzLCBzZXQgc3JjLlxyXG4gIGlmICh0aGlzLnBsYXllcl8uYXV0b3BsYXkoKSkge1xyXG4gICAgdmFyIHRlY2ggPSB0aGlzO1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpeyB0ZWNoLnBsYXkoKTsgfSwgMCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5jdXJyZW50U3JjID0gZnVuY3Rpb24oKXtcclxuICB2YXIgc3JjID0gdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KCdjdXJyZW50U3JjJyk7XHJcbiAgLy8gbm8gc3JjLCBjaGVjayBhbmQgc2VlIGlmIFJUTVBcclxuICBpZiAoc3JjID09IG51bGwpIHtcclxuICAgIHZhciBjb25uZWN0aW9uID0gdGhpcy5ydG1wQ29ubmVjdGlvbigpLFxyXG4gICAgICAgIHN0cmVhbSA9IHRoaXMucnRtcFN0cmVhbSgpO1xyXG5cclxuICAgIGlmIChjb25uZWN0aW9uICYmIHN0cmVhbSkge1xyXG4gICAgICBzcmMgPSB2anMuRmxhc2guc3RyZWFtRnJvbVBhcnRzKGNvbm5lY3Rpb24sIHN0cmVhbSk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBzcmM7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnZqc19sb2FkKCk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLnBvc3RlciA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KCdwb3N0ZXInKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuY3JlYXRlVGltZVJhbmdlKDAsIHRoaXMuZWxfLnZqc19nZXRQcm9wZXJ0eSgnYnVmZmVyZWQnKSk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLnN1cHBvcnRzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIGZhbHNlOyAvLyBGbGFzaCBkb2VzIG5vdCBhbGxvdyBmdWxsc2NyZWVuIHRocm91Z2ggamF2YXNjcmlwdFxyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5lbnRlckZ1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcblxyXG4vLyBDcmVhdGUgc2V0dGVycyBhbmQgZ2V0dGVycyBmb3IgYXR0cmlidXRlc1xyXG52YXIgYXBpID0gdmpzLkZsYXNoLnByb3RvdHlwZSxcclxuICAgIHJlYWRXcml0ZSA9ICdydG1wQ29ubmVjdGlvbixydG1wU3RyZWFtLHByZWxvYWQsY3VycmVudFRpbWUsZGVmYXVsdFBsYXliYWNrUmF0ZSxwbGF5YmFja1JhdGUsYXV0b3BsYXksbG9vcCxtZWRpYUdyb3VwLGNvbnRyb2xsZXIsY29udHJvbHMsdm9sdW1lLG11dGVkLGRlZmF1bHRNdXRlZCcuc3BsaXQoJywnKSxcclxuICAgIHJlYWRPbmx5ID0gJ2Vycm9yLGN1cnJlbnRTcmMsbmV0d29ya1N0YXRlLHJlYWR5U3RhdGUsc2Vla2luZyxpbml0aWFsVGltZSxkdXJhdGlvbixzdGFydE9mZnNldFRpbWUscGF1c2VkLHBsYXllZCxzZWVrYWJsZSxlbmRlZCx2aWRlb1RyYWNrcyxhdWRpb1RyYWNrcyx2aWRlb1dpZHRoLHZpZGVvSGVpZ2h0LHRleHRUcmFja3MnLnNwbGl0KCcsJyk7XHJcbiAgICAvLyBPdmVycmlkZGVuOiBidWZmZXJlZFxyXG5cclxuLyoqXHJcbiAqIEB0aGlzIHsqfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIGNyZWF0ZVNldHRlciA9IGZ1bmN0aW9uKGF0dHIpe1xyXG4gIHZhciBhdHRyVXBwZXIgPSBhdHRyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgYXR0ci5zbGljZSgxKTtcclxuICBhcGlbJ3NldCcrYXR0clVwcGVyXSA9IGZ1bmN0aW9uKHZhbCl7IHJldHVybiB0aGlzLmVsXy52anNfc2V0UHJvcGVydHkoYXR0ciwgdmFsKTsgfTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBAdGhpcyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZhciBjcmVhdGVHZXR0ZXIgPSBmdW5jdGlvbihhdHRyKXtcclxuICBhcGlbYXR0cl0gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KGF0dHIpOyB9O1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGk7XHJcbiAgLy8gQ3JlYXRlIGdldHRlciBhbmQgc2V0dGVycyBmb3IgYWxsIHJlYWQvd3JpdGUgYXR0cmlidXRlc1xyXG4gIGZvciAoaSA9IDA7IGkgPCByZWFkV3JpdGUubGVuZ3RoOyBpKyspIHtcclxuICAgIGNyZWF0ZUdldHRlcihyZWFkV3JpdGVbaV0pO1xyXG4gICAgY3JlYXRlU2V0dGVyKHJlYWRXcml0ZVtpXSk7XHJcbiAgfVxyXG5cclxuICAvLyBDcmVhdGUgZ2V0dGVycyBmb3IgcmVhZC1vbmx5IGF0dHJpYnV0ZXNcclxuICBmb3IgKGkgPSAwOyBpIDwgcmVhZE9ubHkubGVuZ3RoOyBpKyspIHtcclxuICAgIGNyZWF0ZUdldHRlcihyZWFkT25seVtpXSk7XHJcbiAgfVxyXG59KSgpO1xyXG5cclxuLyogRmxhc2ggU3VwcG9ydCBUZXN0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG52anMuRmxhc2guaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuRmxhc2gudmVyc2lvbigpWzBdID49IDEwO1xyXG4gIC8vIHJldHVybiBzd2ZvYmplY3QuaGFzRmxhc2hQbGF5ZXJWZXJzaW9uKCcxMCcpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLmNhblBsYXlTb3VyY2UgPSBmdW5jdGlvbihzcmNPYmope1xyXG4gIHZhciB0eXBlO1xyXG5cclxuICBpZiAoIXNyY09iai50eXBlKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG5cclxuICB0eXBlID0gc3JjT2JqLnR5cGUucmVwbGFjZSgvOy4qLywnJykudG9Mb3dlckNhc2UoKTtcclxuICBpZiAodHlwZSBpbiB2anMuRmxhc2guZm9ybWF0cyB8fCB0eXBlIGluIHZqcy5GbGFzaC5zdHJlYW1pbmdGb3JtYXRzKSB7XHJcbiAgICByZXR1cm4gJ21heWJlJztcclxuICB9XHJcbn07XHJcblxyXG52anMuRmxhc2guZm9ybWF0cyA9IHtcclxuICAndmlkZW8vZmx2JzogJ0ZMVicsXHJcbiAgJ3ZpZGVvL3gtZmx2JzogJ0ZMVicsXHJcbiAgJ3ZpZGVvL21wNCc6ICdNUDQnLFxyXG4gICd2aWRlby9tNHYnOiAnTVA0J1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnN0cmVhbWluZ0Zvcm1hdHMgPSB7XHJcbiAgJ3J0bXAvbXA0JzogJ01QNCcsXHJcbiAgJ3J0bXAvZmx2JzogJ0ZMVidcclxufTtcclxuXHJcbnZqcy5GbGFzaFsnb25SZWFkeSddID0gZnVuY3Rpb24oY3VyclN3Zil7XHJcbiAgdmFyIGVsID0gdmpzLmVsKGN1cnJTd2YpO1xyXG5cclxuICAvLyBHZXQgcGxheWVyIGZyb20gYm94XHJcbiAgLy8gT24gZmlyZWZveCByZWxvYWRzLCBlbCBtaWdodCBhbHJlYWR5IGhhdmUgYSBwbGF5ZXJcclxuICB2YXIgcGxheWVyID0gZWxbJ3BsYXllciddIHx8IGVsLnBhcmVudE5vZGVbJ3BsYXllciddLFxyXG4gICAgICB0ZWNoID0gcGxheWVyLnRlY2g7XHJcblxyXG4gIC8vIFJlZmVyZW5jZSBwbGF5ZXIgb24gdGVjaCBlbGVtZW50XHJcbiAgZWxbJ3BsYXllciddID0gcGxheWVyO1xyXG5cclxuICAvLyBVcGRhdGUgcmVmZXJlbmNlIHRvIHBsYXliYWNrIHRlY2hub2xvZ3kgZWxlbWVudFxyXG4gIHRlY2guZWxfID0gZWw7XHJcblxyXG4gIHZqcy5GbGFzaC5jaGVja1JlYWR5KHRlY2gpO1xyXG59O1xyXG5cclxuLy8gVGhlIFNXRiBpc24ndCBhbHdhc3kgcmVhZHkgd2hlbiBpdCBzYXlzIGl0IGlzLiBTb21ldGltZXMgdGhlIEFQSSBmdW5jdGlvbnMgc3RpbGwgbmVlZCB0byBiZSBhZGRlZCB0byB0aGUgb2JqZWN0LlxyXG4vLyBJZiBpdCdzIG5vdCByZWFkeSwgd2Ugc2V0IGEgdGltZW91dCB0byBjaGVjayBhZ2FpbiBzaG9ydGx5LlxyXG52anMuRmxhc2guY2hlY2tSZWFkeSA9IGZ1bmN0aW9uKHRlY2gpe1xyXG5cclxuICAvLyBDaGVjayBpZiBBUEkgcHJvcGVydHkgZXhpc3RzXHJcbiAgaWYgKHRlY2guZWwoKS52anNfZ2V0UHJvcGVydHkpIHtcclxuXHJcbiAgICAvLyBJZiBzbywgdGVsbCB0ZWNoIGl0J3MgcmVhZHlcclxuICAgIHRlY2gudHJpZ2dlclJlYWR5KCk7XHJcblxyXG4gIC8vIE90aGVyd2lzZSB3YWl0IGxvbmdlci5cclxuICB9IGVsc2Uge1xyXG5cclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgdmpzLkZsYXNoLmNoZWNrUmVhZHkodGVjaCk7XHJcbiAgICB9LCA1MCk7XHJcblxyXG4gIH1cclxufTtcclxuXHJcbi8vIFRyaWdnZXIgZXZlbnRzIGZyb20gdGhlIHN3ZiBvbiB0aGUgcGxheWVyXHJcbnZqcy5GbGFzaFsnb25FdmVudCddID0gZnVuY3Rpb24oc3dmSUQsIGV2ZW50TmFtZSl7XHJcbiAgdmFyIHBsYXllciA9IHZqcy5lbChzd2ZJRClbJ3BsYXllciddO1xyXG4gIHBsYXllci50cmlnZ2VyKGV2ZW50TmFtZSk7XHJcbn07XHJcblxyXG4vLyBMb2cgZXJyb3JzIGZyb20gdGhlIHN3ZlxyXG52anMuRmxhc2hbJ29uRXJyb3InXSA9IGZ1bmN0aW9uKHN3ZklELCBlcnIpe1xyXG4gIHZhciBwbGF5ZXIgPSB2anMuZWwoc3dmSUQpWydwbGF5ZXInXTtcclxuICBwbGF5ZXIudHJpZ2dlcignZXJyb3InKTtcclxuICB2anMubG9nKCdGbGFzaCBFcnJvcicsIGVyciwgc3dmSUQpO1xyXG59O1xyXG5cclxuLy8gRmxhc2ggVmVyc2lvbiBDaGVja1xyXG52anMuRmxhc2gudmVyc2lvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHZlcnNpb24gPSAnMCwwLDAnO1xyXG5cclxuICAvLyBJRVxyXG4gIHRyeSB7XHJcbiAgICB2ZXJzaW9uID0gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaCcpLkdldFZhcmlhYmxlKCckdmVyc2lvbicpLnJlcGxhY2UoL1xcRCsvZywgJywnKS5tYXRjaCgvXiw/KC4rKSw/JC8pWzFdO1xyXG5cclxuICAvLyBvdGhlciBicm93c2Vyc1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKG5hdmlnYXRvci5taW1lVHlwZXNbJ2FwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoJ10uZW5hYmxlZFBsdWdpbil7XHJcbiAgICAgICAgdmVyc2lvbiA9IChuYXZpZ2F0b3IucGx1Z2luc1snU2hvY2t3YXZlIEZsYXNoIDIuMCddIHx8IG5hdmlnYXRvci5wbHVnaW5zWydTaG9ja3dhdmUgRmxhc2gnXSkuZGVzY3JpcHRpb24ucmVwbGFjZSgvXFxEKy9nLCAnLCcpLm1hdGNoKC9eLD8oLispLD8kLylbMV07XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2goZXJyKSB7fVxyXG4gIH1cclxuICByZXR1cm4gdmVyc2lvbi5zcGxpdCgnLCcpO1xyXG59O1xyXG5cclxuLy8gRmxhc2ggZW1iZWRkaW5nIG1ldGhvZC4gT25seSB1c2VkIGluIG5vbi1pZnJhbWUgbW9kZVxyXG52anMuRmxhc2guZW1iZWQgPSBmdW5jdGlvbihzd2YsIHBsYWNlSG9sZGVyLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyl7XHJcbiAgdmFyIGNvZGUgPSB2anMuRmxhc2guZ2V0RW1iZWRDb2RlKHN3ZiwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpLFxyXG5cclxuICAgICAgLy8gR2V0IGVsZW1lbnQgYnkgZW1iZWRkaW5nIGNvZGUgYW5kIHJldHJpZXZpbmcgY3JlYXRlZCBlbGVtZW50XHJcbiAgICAgIG9iaiA9IHZqcy5jcmVhdGVFbCgnZGl2JywgeyBpbm5lckhUTUw6IGNvZGUgfSkuY2hpbGROb2Rlc1swXSxcclxuXHJcbiAgICAgIHBhciA9IHBsYWNlSG9sZGVyLnBhcmVudE5vZGVcclxuICA7XHJcblxyXG4gIHBsYWNlSG9sZGVyLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG9iaiwgcGxhY2VIb2xkZXIpO1xyXG5cclxuICAvLyBJRTYgc2VlbXMgdG8gaGF2ZSBhbiBpc3N1ZSB3aGVyZSBpdCB3b24ndCBpbml0aWFsaXplIHRoZSBzd2Ygb2JqZWN0IGFmdGVyIGluamVjdGluZyBpdC5cclxuICAvLyBUaGlzIGlzIGEgZHVtYiBmaXhcclxuICB2YXIgbmV3T2JqID0gcGFyLmNoaWxkTm9kZXNbMF07XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgbmV3T2JqLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIH0sIDEwMDApO1xyXG5cclxuICByZXR1cm4gb2JqO1xyXG5cclxufTtcclxuXHJcbnZqcy5GbGFzaC5nZXRFbWJlZENvZGUgPSBmdW5jdGlvbihzd2YsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKXtcclxuXHJcbiAgdmFyIG9ialRhZyA9ICc8b2JqZWN0IHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiJyxcclxuICAgICAgZmxhc2hWYXJzU3RyaW5nID0gJycsXHJcbiAgICAgIHBhcmFtc1N0cmluZyA9ICcnLFxyXG4gICAgICBhdHRyc1N0cmluZyA9ICcnO1xyXG5cclxuICAvLyBDb252ZXJ0IGZsYXNoIHZhcnMgdG8gc3RyaW5nXHJcbiAgaWYgKGZsYXNoVmFycykge1xyXG4gICAgdmpzLm9iai5lYWNoKGZsYXNoVmFycywgZnVuY3Rpb24oa2V5LCB2YWwpe1xyXG4gICAgICBmbGFzaFZhcnNTdHJpbmcgKz0gKGtleSArICc9JyArIHZhbCArICcmYW1wOycpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgc3dmLCBmbGFzaFZhcnMsIGFuZCBvdGhlciBkZWZhdWx0IHBhcmFtc1xyXG4gIHBhcmFtcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgJ21vdmllJzogc3dmLFxyXG4gICAgJ2ZsYXNodmFycyc6IGZsYXNoVmFyc1N0cmluZyxcclxuICAgICdhbGxvd1NjcmlwdEFjY2Vzcyc6ICdhbHdheXMnLCAvLyBSZXF1aXJlZCB0byB0YWxrIHRvIHN3ZlxyXG4gICAgJ2FsbG93TmV0d29ya2luZyc6ICdhbGwnIC8vIEFsbCBzaG91bGQgYmUgZGVmYXVsdCwgYnV0IGhhdmluZyBzZWN1cml0eSBpc3N1ZXMuXHJcbiAgfSwgcGFyYW1zKTtcclxuXHJcbiAgLy8gQ3JlYXRlIHBhcmFtIHRhZ3Mgc3RyaW5nXHJcbiAgdmpzLm9iai5lYWNoKHBhcmFtcywgZnVuY3Rpb24oa2V5LCB2YWwpe1xyXG4gICAgcGFyYW1zU3RyaW5nICs9ICc8cGFyYW0gbmFtZT1cIicra2V5KydcIiB2YWx1ZT1cIicrdmFsKydcIiAvPic7XHJcbiAgfSk7XHJcblxyXG4gIGF0dHJpYnV0ZXMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgIC8vIEFkZCBzd2YgdG8gYXR0cmlidXRlcyAobmVlZCBib3RoIGZvciBJRSBhbmQgT3RoZXJzIHRvIHdvcmspXHJcbiAgICAnZGF0YSc6IHN3ZixcclxuXHJcbiAgICAvLyBEZWZhdWx0IHRvIDEwMCUgd2lkdGgvaGVpZ2h0XHJcbiAgICAnd2lkdGgnOiAnMTAwJScsXHJcbiAgICAnaGVpZ2h0JzogJzEwMCUnXHJcblxyXG4gIH0sIGF0dHJpYnV0ZXMpO1xyXG5cclxuICAvLyBDcmVhdGUgQXR0cmlidXRlcyBzdHJpbmdcclxuICB2anMub2JqLmVhY2goYXR0cmlidXRlcywgZnVuY3Rpb24oa2V5LCB2YWwpe1xyXG4gICAgYXR0cnNTdHJpbmcgKz0gKGtleSArICc9XCInICsgdmFsICsgJ1wiICcpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gb2JqVGFnICsgYXR0cnNTdHJpbmcgKyAnPicgKyBwYXJhbXNTdHJpbmcgKyAnPC9vYmplY3Q+JztcclxufTtcclxuXHJcbnZqcy5GbGFzaC5zdHJlYW1Gcm9tUGFydHMgPSBmdW5jdGlvbihjb25uZWN0aW9uLCBzdHJlYW0pIHtcclxuICByZXR1cm4gY29ubmVjdGlvbiArICcmJyArIHN0cmVhbTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5zdHJlYW1Ub1BhcnRzID0gZnVuY3Rpb24oc3JjKSB7XHJcbiAgdmFyIHBhcnRzID0ge1xyXG4gICAgY29ubmVjdGlvbjogJycsXHJcbiAgICBzdHJlYW06ICcnXHJcbiAgfTtcclxuXHJcbiAgaWYgKCEgc3JjKSB7XHJcbiAgICByZXR1cm4gcGFydHM7XHJcbiAgfVxyXG5cclxuICAvLyBMb29rIGZvciB0aGUgbm9ybWFsIFVSTCBzZXBhcmF0b3Igd2UgZXhwZWN0LCAnJicuXHJcbiAgLy8gSWYgZm91bmQsIHdlIHNwbGl0IHRoZSBVUkwgaW50byB0d28gcGllY2VzIGFyb3VuZCB0aGVcclxuICAvLyBmaXJzdCAnJicuXHJcbiAgdmFyIGNvbm5FbmQgPSBzcmMuaW5kZXhPZignJicpO1xyXG4gIHZhciBzdHJlYW1CZWdpbjtcclxuICBpZiAoY29ubkVuZCAhPT0gLTEpIHtcclxuICAgIHN0cmVhbUJlZ2luID0gY29ubkVuZCArIDE7XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgLy8gSWYgdGhlcmUncyBub3QgYSAnJicsIHdlIHVzZSB0aGUgbGFzdCAnLycgYXMgdGhlIGRlbGltaXRlci5cclxuICAgIGNvbm5FbmQgPSBzdHJlYW1CZWdpbiA9IHNyYy5sYXN0SW5kZXhPZignLycpICsgMTtcclxuICAgIGlmIChjb25uRW5kID09PSAwKSB7XHJcbiAgICAgIC8vIHJlYWxseSwgdGhlcmUncyBub3QgYSAnLyc/XHJcbiAgICAgIGNvbm5FbmQgPSBzdHJlYW1CZWdpbiA9IHNyYy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHBhcnRzLmNvbm5lY3Rpb24gPSBzcmMuc3Vic3RyaW5nKDAsIGNvbm5FbmQpO1xyXG4gIHBhcnRzLnN0cmVhbSA9IHNyYy5zdWJzdHJpbmcoc3RyZWFtQmVnaW4sIHNyYy5sZW5ndGgpO1xyXG5cclxuICByZXR1cm4gcGFydHM7XHJcbn07XHJcblxyXG52anMuRmxhc2guaXNTdHJlYW1pbmdUeXBlID0gZnVuY3Rpb24oc3JjVHlwZSkge1xyXG4gIHJldHVybiBzcmNUeXBlIGluIHZqcy5GbGFzaC5zdHJlYW1pbmdGb3JtYXRzO1xyXG59O1xyXG5cclxuLy8gUlRNUCBoYXMgZm91ciB2YXJpYXRpb25zLCBhbnkgc3RyaW5nIHN0YXJ0aW5nXHJcbi8vIHdpdGggb25lIG9mIHRoZXNlIHByb3RvY29scyBzaG91bGQgYmUgdmFsaWRcclxudmpzLkZsYXNoLlJUTVBfUkUgPSAvXnJ0bXBbc2V0XT86XFwvXFwvL2k7XHJcblxyXG52anMuRmxhc2guaXNTdHJlYW1pbmdTcmMgPSBmdW5jdGlvbihzcmMpIHtcclxuICByZXR1cm4gdmpzLkZsYXNoLlJUTVBfUkUudGVzdChzcmMpO1xyXG59O1xyXG4vKipcclxuICogVGhlIE1lZGlhIExvYWRlciBpcyB0aGUgY29tcG9uZW50IHRoYXQgZGVjaWRlcyB3aGljaCBwbGF5YmFjayB0ZWNobm9sb2d5IHRvIGxvYWRcclxuICogd2hlbiB0aGUgcGxheWVyIGlzIGluaXRpYWxpemVkLlxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NZWRpYUxvYWRlciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIHNvdXJjZXMgd2hlbiB0aGUgcGxheWVyIGlzIGluaXRpYWxpemVkLFxyXG4gICAgLy8gbG9hZCB0aGUgZmlyc3Qgc3VwcG9ydGVkIHBsYXliYWNrIHRlY2hub2xvZ3kuXHJcbiAgICBpZiAoIXBsYXllci5vcHRpb25zX1snc291cmNlcyddIHx8IHBsYXllci5vcHRpb25zX1snc291cmNlcyddLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICBmb3IgKHZhciBpPTAsaj1wbGF5ZXIub3B0aW9uc19bJ3RlY2hPcmRlciddOyBpPGoubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICB2YXIgdGVjaE5hbWUgPSB2anMuY2FwaXRhbGl6ZShqW2ldKSxcclxuICAgICAgICAgICAgdGVjaCA9IHdpbmRvd1sndmlkZW9qcyddW3RlY2hOYW1lXTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0ZWNobm9sb2d5XHJcbiAgICAgICAgaWYgKHRlY2ggJiYgdGVjaC5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICBwbGF5ZXIubG9hZFRlY2godGVjaE5hbWUpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyAvLyBMb29wIHRocm91Z2ggcGxheWJhY2sgdGVjaG5vbG9naWVzIChIVE1MNSwgRmxhc2gpIGFuZCBjaGVjayBmb3Igc3VwcG9ydC5cclxuICAgICAgLy8gLy8gVGhlbiBsb2FkIHRoZSBiZXN0IHNvdXJjZS5cclxuICAgICAgLy8gLy8gQSBmZXcgYXNzdW1wdGlvbnMgaGVyZTpcclxuICAgICAgLy8gLy8gICBBbGwgcGxheWJhY2sgdGVjaG5vbG9naWVzIHJlc3BlY3QgcHJlbG9hZCBmYWxzZS5cclxuICAgICAgcGxheWVyLnNyYyhwbGF5ZXIub3B0aW9uc19bJ3NvdXJjZXMnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgVGV4dCBUcmFja3NcclxuICogVGV4dCB0cmFja3MgYXJlIHRyYWNrcyBvZiB0aW1lZCB0ZXh0IGV2ZW50cy5cclxuICogQ2FwdGlvbnMgLSB0ZXh0IGRpc3BsYXllZCBvdmVyIHRoZSB2aWRlbyBmb3IgdGhlIGhlYXJpbmcgaW1wYXJlZFxyXG4gKiBTdWJ0aXRsZXMgLSB0ZXh0IGRpc3BsYXllZCBvdmVyIHRoZSB2aWRlbyBmb3IgdGhvc2Ugd2hvIGRvbid0IHVuZGVyc3RhbmQgbGFuZ2F1Z2UgaW4gdGhlIHZpZGVvXHJcbiAqIENoYXB0ZXJzIC0gdGV4dCBkaXNwbGF5ZWQgaW4gYSBtZW51IGFsbG93aW5nIHRoZSB1c2VyIHRvIGp1bXAgdG8gcGFydGljdWxhciBwb2ludHMgKGNoYXB0ZXJzKSBpbiB0aGUgdmlkZW9cclxuICogRGVzY3JpcHRpb25zIChub3Qgc3VwcG9ydGVkIHlldCkgLSBhdWRpbyBkZXNjcmlwdGlvbnMgdGhhdCBhcmUgcmVhZCBiYWNrIHRvIHRoZSB1c2VyIGJ5IGEgc2NyZWVuIHJlYWRpbmcgZGV2aWNlXHJcbiAqL1xyXG5cclxuLy8gUGxheWVyIEFkZGl0aW9ucyAtIEZ1bmN0aW9ucyBhZGQgdG8gdGhlIHBsYXllciBvYmplY3QgZm9yIGVhc2llciBhY2Nlc3MgdG8gdHJhY2tzXHJcblxyXG4vKipcclxuICogTGlzdCBvZiBhc3NvY2lhdGVkIHRleHQgdHJhY2tzXHJcbiAqIEB0eXBlIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRleHRUcmFja3NfO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBhcnJheSBvZiBhc3NvY2lhdGVkIHRleHQgdHJhY2tzLiBjYXB0aW9ucywgc3VidGl0bGVzLCBjaGFwdGVycywgZGVzY3JpcHRpb25zXHJcbiAqIGh0dHA6Ly93d3cudzMub3JnL2h0bWwvd2cvZHJhZnRzL2h0bWwvbWFzdGVyL2VtYmVkZGVkLWNvbnRlbnQtMC5odG1sI2RvbS1tZWRpYS10ZXh0dHJhY2tzXHJcbiAqIEByZXR1cm4ge0FycmF5fSAgICAgICAgICAgQXJyYXkgb2YgdHJhY2sgb2JqZWN0c1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUudGV4dFRyYWNrcyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50ZXh0VHJhY2tzXyA9IHRoaXMudGV4dFRyYWNrc18gfHwgW107XHJcbiAgcmV0dXJuIHRoaXMudGV4dFRyYWNrc187XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGEgdGV4dCB0cmFja1xyXG4gKiBJbiBhZGRpdGlvbiB0byB0aGUgVzNDIHNldHRpbmdzIHdlIGFsbG93IGFkZGluZyBhZGRpdGlvbmFsIGluZm8gdGhyb3VnaCBvcHRpb25zLlxyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9lbWJlZGRlZC1jb250ZW50LTAuaHRtbCNkb20tbWVkaWEtYWRkdGV4dHRyYWNrXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSAga2luZCAgICAgICAgQ2FwdGlvbnMsIHN1YnRpdGxlcywgY2hhcHRlcnMsIGRlc2NyaXB0aW9ucywgb3IgbWV0YWRhdGFcclxuICogQHBhcmFtIHtTdHJpbmc9fSBsYWJlbCAgICAgICBPcHRpb25hbCBsYWJlbFxyXG4gKiBAcGFyYW0ge1N0cmluZz19IGxhbmd1YWdlICAgIE9wdGlvbmFsIGxhbmd1YWdlXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyAgICAgQWRkaXRpb25hbCB0cmFjayBvcHRpb25zLCBsaWtlIHNyY1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuYWRkVGV4dFRyYWNrID0gZnVuY3Rpb24oa2luZCwgbGFiZWwsIGxhbmd1YWdlLCBvcHRpb25zKXtcclxuICB2YXIgdHJhY2tzID0gdGhpcy50ZXh0VHJhY2tzXyA9IHRoaXMudGV4dFRyYWNrc18gfHwgW107XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XHJcblxyXG4gIG9wdGlvbnNbJ2tpbmQnXSA9IGtpbmQ7XHJcbiAgb3B0aW9uc1snbGFiZWwnXSA9IGxhYmVsO1xyXG4gIG9wdGlvbnNbJ2xhbmd1YWdlJ10gPSBsYW5ndWFnZTtcclxuXHJcbiAgLy8gSFRNTDUgU3BlYyBzYXlzIGRlZmF1bHQgdG8gc3VidGl0bGVzLlxyXG4gIC8vIFVwcGVyY2FzZSBmaXJzdCBsZXR0ZXIgdG8gbWF0Y2ggY2xhc3MgbmFtZXNcclxuICB2YXIgS2luZCA9IHZqcy5jYXBpdGFsaXplKGtpbmQgfHwgJ3N1YnRpdGxlcycpO1xyXG5cclxuICAvLyBDcmVhdGUgY29ycmVjdCB0ZXh0dHJhY2sgY2xhc3MuIENhcHRpb25zVHJhY2ssIGV0Yy5cclxuICB2YXIgdHJhY2sgPSBuZXcgd2luZG93Wyd2aWRlb2pzJ11bS2luZCArICdUcmFjayddKHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICB0cmFja3MucHVzaCh0cmFjayk7XHJcblxyXG4gIC8vIElmIHRyYWNrLmRmbHQoKSBpcyBzZXQsIHN0YXJ0IHNob3dpbmcgaW1tZWRpYXRlbHlcclxuICAvLyBUT0RPOiBBZGQgYSBwcm9jZXNzIHRvIGRldGVyaW1lIHRoZSBiZXN0IHRyYWNrIHRvIHNob3cgZm9yIHRoZSBzcGVjaWZpYyBraW5kXHJcbiAgLy8gSW5jYXNlIHRoZXJlIGFyZSBtdWxpdHBsZSBkZWZhdWx0ZWQgdHJhY2tzIG9mIHRoZSBzYW1lIGtpbmRcclxuICAvLyBPciB0aGUgdXNlciBoYXMgYSBzZXQgcHJlZmVyZW5jZSBvZiBhIHNwZWNpZmljIGxhbmd1YWdlIHRoYXQgc2hvdWxkIG92ZXJyaWRlIHRoZSBkZWZhdWx0XHJcbiAgLy8gaWYgKHRyYWNrLmRmbHQoKSkge1xyXG4gIC8vICAgdGhpcy5yZWFkeSh2anMuYmluZCh0cmFjaywgdHJhY2suc2hvdykpO1xyXG4gIC8vIH1cclxuXHJcbiAgcmV0dXJuIHRyYWNrO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBhcnJheSBvZiB0ZXh0IHRyYWNrcy4gY2FwdGlvbnMsIHN1YnRpdGxlcywgY2hhcHRlcnMsIGRlc2NyaXB0aW9uc1xyXG4gKiBUcmFjayBvYmplY3RzIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBwbGF5ZXIudGV4dFRyYWNrcygpIGFycmF5XHJcbiAqIEBwYXJhbSB7QXJyYXl9IHRyYWNrTGlzdCBBcnJheSBvZiB0cmFjayBlbGVtZW50cyBvciBvYmplY3RzIChmYWtlIHRyYWNrIGVsZW1lbnRzKVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuYWRkVGV4dFRyYWNrcyA9IGZ1bmN0aW9uKHRyYWNrTGlzdCl7XHJcbiAgdmFyIHRyYWNrT2JqO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrTGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgdHJhY2tPYmogPSB0cmFja0xpc3RbaV07XHJcbiAgICB0aGlzLmFkZFRleHRUcmFjayh0cmFja09ialsna2luZCddLCB0cmFja09ialsnbGFiZWwnXSwgdHJhY2tPYmpbJ2xhbmd1YWdlJ10sIHRyYWNrT2JqKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gU2hvdyBhIHRleHQgdHJhY2tcclxuLy8gZGlzYWJsZVNhbWVLaW5kOiBkaXNhYmxlIGFsbCBvdGhlciB0cmFja3Mgb2YgdGhlIHNhbWUga2luZC4gVmFsdWUgc2hvdWxkIGJlIGEgdHJhY2sga2luZCAoY2FwdGlvbnMsIGV0Yy4pXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnNob3dUZXh0VHJhY2sgPSBmdW5jdGlvbihpZCwgZGlzYWJsZVNhbWVLaW5kKXtcclxuICB2YXIgdHJhY2tzID0gdGhpcy50ZXh0VHJhY2tzXyxcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGogPSB0cmFja3MubGVuZ3RoLFxyXG4gICAgICB0cmFjaywgc2hvd1RyYWNrLCBraW5kO1xyXG5cclxuICAvLyBGaW5kIFRyYWNrIHdpdGggc2FtZSBJRFxyXG4gIGZvciAoO2k8ajtpKyspIHtcclxuICAgIHRyYWNrID0gdHJhY2tzW2ldO1xyXG4gICAgaWYgKHRyYWNrLmlkKCkgPT09IGlkKSB7XHJcbiAgICAgIHRyYWNrLnNob3coKTtcclxuICAgICAgc2hvd1RyYWNrID0gdHJhY2s7XHJcblxyXG4gICAgLy8gRGlzYWJsZSB0cmFja3Mgb2YgdGhlIHNhbWUga2luZFxyXG4gICAgfSBlbHNlIGlmIChkaXNhYmxlU2FtZUtpbmQgJiYgdHJhY2sua2luZCgpID09IGRpc2FibGVTYW1lS2luZCAmJiB0cmFjay5tb2RlKCkgPiAwKSB7XHJcbiAgICAgIHRyYWNrLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEdldCB0cmFjayBraW5kIGZyb20gc2hvd24gdHJhY2sgb3IgZGlzYWJsZVNhbWVLaW5kXHJcbiAga2luZCA9IChzaG93VHJhY2spID8gc2hvd1RyYWNrLmtpbmQoKSA6ICgoZGlzYWJsZVNhbWVLaW5kKSA/IGRpc2FibGVTYW1lS2luZCA6IGZhbHNlKTtcclxuXHJcbiAgLy8gVHJpZ2dlciB0cmFja2NoYW5nZSBldmVudCwgY2FwdGlvbnN0cmFja2NoYW5nZSwgc3VidGl0bGVzdHJhY2tjaGFuZ2UsIGV0Yy5cclxuICBpZiAoa2luZCkge1xyXG4gICAgdGhpcy50cmlnZ2VyKGtpbmQrJ3RyYWNrY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgYWxsIHRleHQgdHJhY2tzXHJcbiAqXHJcbiAqIEhhbmRsZXMgdGhlIHBhcnNpbmcsIGhpZGluZywgYW5kIHNob3dpbmcgb2YgdGV4dCB0cmFjayBjdWVzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gQXBwbHkgdHJhY2sgaW5mbyB0byB0cmFjayBvYmplY3RcclxuICAgIC8vIE9wdGlvbnMgd2lsbCBvZnRlbiBiZSBhIHRyYWNrIGVsZW1lbnRcclxuXHJcbiAgICAvLyBCdWlsZCBJRCBpZiBvbmUgZG9lc24ndCBleGlzdFxyXG4gICAgdGhpcy5pZF8gPSBvcHRpb25zWydpZCddIHx8ICgndmpzXycgKyBvcHRpb25zWydraW5kJ10gKyAnXycgKyBvcHRpb25zWydsYW5ndWFnZSddICsgJ18nICsgdmpzLmd1aWQrKyk7XHJcbiAgICB0aGlzLnNyY18gPSBvcHRpb25zWydzcmMnXTtcclxuICAgIC8vICdkZWZhdWx0JyBpcyBhIHJlc2VydmVkIGtleXdvcmQgaW4ganMgc28gd2UgdXNlIGFuIGFiYnJldmlhdGVkIHZlcnNpb25cclxuICAgIHRoaXMuZGZsdF8gPSBvcHRpb25zWydkZWZhdWx0J10gfHwgb3B0aW9uc1snZGZsdCddO1xyXG4gICAgdGhpcy50aXRsZV8gPSBvcHRpb25zWyd0aXRsZSddO1xyXG4gICAgdGhpcy5sYW5ndWFnZV8gPSBvcHRpb25zWydzcmNsYW5nJ107XHJcbiAgICB0aGlzLmxhYmVsXyA9IG9wdGlvbnNbJ2xhYmVsJ107XHJcbiAgICB0aGlzLmN1ZXNfID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZUN1ZXNfID0gW107XHJcbiAgICB0aGlzLnJlYWR5U3RhdGVfID0gMDtcclxuICAgIHRoaXMubW9kZV8gPSAwO1xyXG5cclxuICAgIHRoaXMucGxheWVyXy5vbignZnVsbHNjcmVlbmNoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMuYWRqdXN0Rm9udFNpemUpKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIGtpbmQgdmFsdWUuIENhcHRpb25zLCBzdWJ0aXRsZXMsIGV0Yy5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmtpbmRfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sga2luZCB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5raW5kID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5raW5kXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayBzcmMgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnNyY187XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBzcmMgdmFsdWVcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuc3JjID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5zcmNfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIGRlZmF1bHQgdmFsdWVcclxuICogSWYgZGVmYXVsdCBpcyB1c2VkLCBzdWJ0aXRsZXMvY2FwdGlvbnMgdG8gc3RhcnQgc2hvd2luZ1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGZsdF87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBkZWZhdWx0IHZhbHVlLiAoJ2RlZmF1bHQnIGlzIGEgcmVzZXJ2ZWQga2V5d29yZClcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmRmbHQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmRmbHRfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIHRpdGxlIHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS50aXRsZV87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayB0aXRsZSB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS50aXRsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMudGl0bGVfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExhbmd1YWdlIC0gdHdvIGxldHRlciBzdHJpbmcgdG8gcmVwcmVzZW50IHRyYWNrIGxhbmd1YWdlLCBlLmcuICdlbicgZm9yIEVuZ2xpc2hcclxuICogU3BlYyBkZWY6IHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgbGFuZ3VhZ2U7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5sYW5ndWFnZV87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBsYW5ndWFnZSB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5sYW5ndWFnZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMubGFuZ3VhZ2VfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIGxhYmVsIGUuZy4gJ0VuZ2xpc2gnXHJcbiAqIFNwZWMgZGVmOiByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nIGxhYmVsO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFiZWxfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgbGFiZWwgdmFsdWVcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFiZWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmxhYmVsXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbGwgY3VlcyBvZiB0aGUgdHJhY2suIEN1ZXMgaGF2ZSBhIHN0YXJ0VGltZSwgZW5kVGltZSwgdGV4dCwgYW5kIG90aGVyIHByb3BlcnRpZXMuXHJcbiAqIFNwZWMgZGVmOiByZWFkb25seSBhdHRyaWJ1dGUgVGV4dFRyYWNrQ3VlTGlzdCBjdWVzO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuY3Vlc187XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBjdWVzXHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuY3VlcyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY3Vlc187XHJcbn07XHJcblxyXG4vKipcclxuICogQWN0aXZlQ3VlcyBpcyBhbGwgY3VlcyB0aGF0IGFyZSBjdXJyZW50bHkgc2hvd2luZ1xyXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIFRleHRUcmFja0N1ZUxpc3QgYWN0aXZlQ3VlcztcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFjdGl2ZUN1ZXNfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgYWN0aXZlIGN1ZXNcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5hY3RpdmVDdWVzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5hY3RpdmVDdWVzXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZWFkeVN0YXRlIGRlc2NyaWJlcyBpZiB0aGUgdGV4dCBmaWxlIGhhcyBiZWVuIGxvYWRlZFxyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBOT05FID0gMDtcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgTE9BRElORyA9IDE7XHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IExPQURFRCA9IDI7XHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IEVSUk9SID0gMztcclxuICogcmVhZG9ubHkgYXR0cmlidXRlIHVuc2lnbmVkIHNob3J0IHJlYWR5U3RhdGU7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5yZWFkeVN0YXRlXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIHJlYWR5U3RhdGVcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUucmVhZHlTdGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMucmVhZHlTdGF0ZV87XHJcbn07XHJcblxyXG4vKipcclxuICogTW9kZSBkZXNjcmliZXMgaWYgdGhlIHRyYWNrIGlzIHNob3dpbmcsIGhpZGRlbiwgb3IgZGlzYWJsZWRcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgT0ZGID0gMDtcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgSElEREVOID0gMTsgKHN0aWxsIHRyaWdnZXJpbmcgY3VlY2hhbmdlIGV2ZW50cywgYnV0IG5vdCB2aXNpYmxlKVxyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBTSE9XSU5HID0gMjtcclxuICogYXR0cmlidXRlIHVuc2lnbmVkIHNob3J0IG1vZGU7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5tb2RlXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIG1vZGVcclxuICogQHJldHVybiB7TnVtYmVyfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubW9kZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMubW9kZV87XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hhbmdlIHRoZSBmb250IHNpemUgb2YgdGhlIHRleHQgdHJhY2sgdG8gbWFrZSBpdCBsYXJnZXIgd2hlbiBwbGF5aW5nIGluIGZ1bGxzY3JlZW4gbW9kZVxyXG4gKiBhbmQgcmVzdG9yZSBpdCB0byBpdHMgbm9ybWFsIHNpemUgd2hlbiBub3QgaW4gZnVsbHNjcmVlbiBtb2RlLlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuYWRqdXN0Rm9udFNpemUgPSBmdW5jdGlvbigpe1xyXG4gICAgaWYgKHRoaXMucGxheWVyXy5pc0Z1bGxTY3JlZW4pIHtcclxuICAgICAgICAvLyBTY2FsZSB0aGUgZm9udCBieSB0aGUgc2FtZSBmYWN0b3IgYXMgaW5jcmVhc2luZyB0aGUgdmlkZW8gd2lkdGggdG8gdGhlIGZ1bGwgc2NyZWVuIHdpbmRvdyB3aWR0aC5cclxuICAgICAgICAvLyBBZGRpdGlvbmFsbHksIG11bHRpcGx5IHRoYXQgZmFjdG9yIGJ5IDEuNCwgd2hpY2ggaXMgdGhlIGRlZmF1bHQgZm9udCBzaXplIGZvclxyXG4gICAgICAgIC8vIHRoZSBjYXB0aW9uIHRyYWNrIChmcm9tIHRoZSBDU1MpXHJcbiAgICAgICAgdGhpcy5lbF8uc3R5bGUuZm9udFNpemUgPSBzY3JlZW4ud2lkdGggLyB0aGlzLnBsYXllcl8ud2lkdGgoKSAqIDEuNCAqIDEwMCArICclJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQ2hhbmdlIHRoZSBmb250IHNpemUgb2YgdGhlIHRleHQgdHJhY2sgYmFjayB0byBpdHMgb3JpZ2luYWwgbm9uLWZ1bGxzY3JlZW4gc2l6ZVxyXG4gICAgICAgIHRoaXMuZWxfLnN0eWxlLmZvbnRTaXplID0gJyc7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIGJhc2ljIGRpdiB0byBob2xkIGN1ZSB0ZXh0XHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy0nICsgdGhpcy5raW5kXyArICcgdmpzLXRleHQtdHJhY2snXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2hvdzogTW9kZSBTaG93aW5nICgyKVxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBhY3RpdmUuIElmIG5vIGF0dGVtcHQgaGFzIHlldCBiZWVuIG1hZGUgdG8gb2J0YWluIHRoZSB0cmFjaydzIGN1ZXMsIHRoZSB1c2VyIGFnZW50IHdpbGwgcGVyZm9ybSBzdWNoIGFuIGF0dGVtcHQgbW9tZW50YXJpbHkuXHJcbiAqIFRoZSB1c2VyIGFnZW50IGlzIG1haW50YWluaW5nIGEgbGlzdCBvZiB3aGljaCBjdWVzIGFyZSBhY3RpdmUsIGFuZCBldmVudHMgYXJlIGJlaW5nIGZpcmVkIGFjY29yZGluZ2x5LlxyXG4gKiBJbiBhZGRpdGlvbiwgZm9yIHRleHQgdHJhY2tzIHdob3NlIGtpbmQgaXMgc3VidGl0bGVzIG9yIGNhcHRpb25zLCB0aGUgY3VlcyBhcmUgYmVpbmcgZGlzcGxheWVkIG92ZXIgdGhlIHZpZGVvIGFzIGFwcHJvcHJpYXRlO1xyXG4gKiBmb3IgdGV4dCB0cmFja3Mgd2hvc2Uga2luZCBpcyBkZXNjcmlwdGlvbnMsIHRoZSB1c2VyIGFnZW50IGlzIG1ha2luZyB0aGUgY3VlcyBhdmFpbGFibGUgdG8gdGhlIHVzZXIgaW4gYSBub24tdmlzdWFsIGZhc2hpb247XHJcbiAqIGFuZCBmb3IgdGV4dCB0cmFja3Mgd2hvc2Uga2luZCBpcyBjaGFwdGVycywgdGhlIHVzZXIgYWdlbnQgaXMgbWFraW5nIGF2YWlsYWJsZSB0byB0aGUgdXNlciBhIG1lY2hhbmlzbSBieSB3aGljaCB0aGUgdXNlciBjYW4gbmF2aWdhdGUgdG8gYW55IHBvaW50IGluIHRoZSBtZWRpYSByZXNvdXJjZSBieSBzZWxlY3RpbmcgYSBjdWUuXHJcbiAqIFRoZSBzaG93aW5nIGJ5IGRlZmF1bHQgc3RhdGUgaXMgdXNlZCBpbiBjb25qdW5jdGlvbiB3aXRoIHRoZSBkZWZhdWx0IGF0dHJpYnV0ZSBvbiB0cmFjayBlbGVtZW50cyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB0ZXh0IHRyYWNrIHdhcyBlbmFibGVkIGR1ZSB0byB0aGF0IGF0dHJpYnV0ZS5cclxuICogVGhpcyBhbGxvd3MgdGhlIHVzZXIgYWdlbnQgdG8gb3ZlcnJpZGUgdGhlIHN0YXRlIGlmIGEgbGF0ZXIgdHJhY2sgaXMgZGlzY292ZXJlZCB0aGF0IGlzIG1vcmUgYXBwcm9wcmlhdGUgcGVyIHRoZSB1c2VyJ3MgcHJlZmVyZW5jZXMuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmFjdGl2YXRlKCk7XHJcblxyXG4gIHRoaXMubW9kZV8gPSAyO1xyXG5cclxuICAvLyBTaG93IGVsZW1lbnQuXHJcbiAgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuc2hvdy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhpZGU6IE1vZGUgSGlkZGVuICgxKVxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBhY3RpdmUsIGJ1dCB0aGF0IHRoZSB1c2VyIGFnZW50IGlzIG5vdCBhY3RpdmVseSBkaXNwbGF5aW5nIHRoZSBjdWVzLlxyXG4gKiBJZiBubyBhdHRlbXB0IGhhcyB5ZXQgYmVlbiBtYWRlIHRvIG9idGFpbiB0aGUgdHJhY2sncyBjdWVzLCB0aGUgdXNlciBhZ2VudCB3aWxsIHBlcmZvcm0gc3VjaCBhbiBhdHRlbXB0IG1vbWVudGFyaWx5LlxyXG4gKiBUaGUgdXNlciBhZ2VudCBpcyBtYWludGFpbmluZyBhIGxpc3Qgb2Ygd2hpY2ggY3VlcyBhcmUgYWN0aXZlLCBhbmQgZXZlbnRzIGFyZSBiZWluZyBmaXJlZCBhY2NvcmRpbmdseS5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFdoZW4gaGlkZGVuLCBjdWVzIGFyZSBzdGlsbCB0cmlnZ2VyZWQuIERpc2FibGUgdG8gc3RvcCB0cmlnZ2VyaW5nLlxyXG4gIHRoaXMuYWN0aXZhdGUoKTtcclxuXHJcbiAgdGhpcy5tb2RlXyA9IDE7XHJcblxyXG4gIC8vIEhpZGUgZWxlbWVudC5cclxuICB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5oaWRlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzYWJsZTogTW9kZSBPZmYvRGlzYWJsZSAoMClcclxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgbm90IGFjdGl2ZS4gT3RoZXIgdGhhbiBmb3IgdGhlIHB1cnBvc2VzIG9mIGV4cG9zaW5nIHRoZSB0cmFjayBpbiB0aGUgRE9NLCB0aGUgdXNlciBhZ2VudCBpcyBpZ25vcmluZyB0aGUgdGV4dCB0cmFjay5cclxuICogTm8gY3VlcyBhcmUgYWN0aXZlLCBubyBldmVudHMgYXJlIGZpcmVkLCBhbmQgdGhlIHVzZXIgYWdlbnQgd2lsbCBub3QgYXR0ZW1wdCB0byBvYnRhaW4gdGhlIHRyYWNrJ3MgY3Vlcy5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIElmIHNob3dpbmcsIGhpZGUuXHJcbiAgaWYgKHRoaXMubW9kZV8gPT0gMikgeyB0aGlzLmhpZGUoKTsgfVxyXG5cclxuICAvLyBTdG9wIHRyaWdnZXJpbmcgY3Vlc1xyXG4gIHRoaXMuZGVhY3RpdmF0ZSgpO1xyXG5cclxuICAvLyBTd2l0Y2ggTW9kZSB0byBPZmZcclxuICB0aGlzLm1vZGVfID0gMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUdXJuIG9uIGN1ZSB0cmFja2luZy4gVHJhY2tzIHRoYXQgYXJlIHNob3dpbmcgT1IgaGlkZGVuIGFyZSBhY3RpdmUuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5hY3RpdmF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gTG9hZCB0ZXh0IGZpbGUgaWYgaXQgaGFzbid0IGJlZW4geWV0LlxyXG4gIGlmICh0aGlzLnJlYWR5U3RhdGVfID09PSAwKSB7IHRoaXMubG9hZCgpOyB9XHJcblxyXG4gIC8vIE9ubHkgYWN0aXZhdGUgaWYgbm90IGFscmVhZHkgYWN0aXZlLlxyXG4gIGlmICh0aGlzLm1vZGVfID09PSAwKSB7XHJcbiAgICAvLyBVcGRhdGUgY3VycmVudCBjdWUgb24gdGltZXVwZGF0ZVxyXG4gICAgLy8gVXNpbmcgdW5pcXVlIElEIGZvciBiaW5kIGZ1bmN0aW9uIHNvIG90aGVyIHRyYWNrcyBkb24ndCByZW1vdmUgbGlzdGVuZXJcclxuICAgIHRoaXMucGxheWVyXy5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlLCB0aGlzLmlkXykpO1xyXG5cclxuICAgIC8vIFJlc2V0IGN1ZSB0aW1lIG9uIG1lZGlhIGVuZFxyXG4gICAgdGhpcy5wbGF5ZXJfLm9uKCdlbmRlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMucmVzZXQsIHRoaXMuaWRfKSk7XHJcblxyXG4gICAgLy8gQWRkIHRvIGRpc3BsYXlcclxuICAgIGlmICh0aGlzLmtpbmRfID09PSAnY2FwdGlvbnMnIHx8IHRoaXMua2luZF8gPT09ICdzdWJ0aXRsZXMnKSB7XHJcbiAgICAgIHRoaXMucGxheWVyXy5nZXRDaGlsZCgndGV4dFRyYWNrRGlzcGxheScpLmFkZENoaWxkKHRoaXMpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBUdXJuIG9mZiBjdWUgdHJhY2tpbmcuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5kZWFjdGl2YXRlID0gZnVuY3Rpb24oKXtcclxuICAvLyBVc2luZyB1bmlxdWUgSUQgZm9yIGJpbmQgZnVuY3Rpb24gc28gb3RoZXIgdHJhY2tzIGRvbid0IHJlbW92ZSBsaXN0ZW5lclxyXG4gIHRoaXMucGxheWVyXy5vZmYoJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSwgdGhpcy5pZF8pKTtcclxuICB0aGlzLnBsYXllcl8ub2ZmKCdlbmRlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMucmVzZXQsIHRoaXMuaWRfKSk7XHJcbiAgdGhpcy5yZXNldCgpOyAvLyBSZXNldFxyXG5cclxuICAvLyBSZW1vdmUgZnJvbSBkaXNwbGF5XHJcbiAgdGhpcy5wbGF5ZXJfLmdldENoaWxkKCd0ZXh0VHJhY2tEaXNwbGF5JykucmVtb3ZlQ2hpbGQodGhpcyk7XHJcbn07XHJcblxyXG4vLyBBIHJlYWRpbmVzcyBzdGF0ZVxyXG4vLyBPbmUgb2YgdGhlIGZvbGxvd2luZzpcclxuLy9cclxuLy8gTm90IGxvYWRlZFxyXG4vLyBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBrbm93biB0byBleGlzdCAoZS5nLiBpdCBoYXMgYmVlbiBkZWNsYXJlZCB3aXRoIGEgdHJhY2sgZWxlbWVudCksIGJ1dCBpdHMgY3VlcyBoYXZlIG5vdCBiZWVuIG9idGFpbmVkLlxyXG4vL1xyXG4vLyBMb2FkaW5nXHJcbi8vIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGxvYWRpbmcgYW5kIHRoZXJlIGhhdmUgYmVlbiBubyBmYXRhbCBlcnJvcnMgZW5jb3VudGVyZWQgc28gZmFyLiBGdXJ0aGVyIGN1ZXMgbWlnaHQgc3RpbGwgYmUgYWRkZWQgdG8gdGhlIHRyYWNrLlxyXG4vL1xyXG4vLyBMb2FkZWRcclxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaGFzIGJlZW4gbG9hZGVkIHdpdGggbm8gZmF0YWwgZXJyb3JzLiBObyBuZXcgY3VlcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSB0cmFjayBleGNlcHQgaWYgdGhlIHRleHQgdHJhY2sgY29ycmVzcG9uZHMgdG8gYSBNdXRhYmxlVGV4dFRyYWNrIG9iamVjdC5cclxuLy9cclxuLy8gRmFpbGVkIHRvIGxvYWRcclxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgd2FzIGVuYWJsZWQsIGJ1dCB3aGVuIHRoZSB1c2VyIGFnZW50IGF0dGVtcHRlZCB0byBvYnRhaW4gaXQsIHRoaXMgZmFpbGVkIGluIHNvbWUgd2F5IChlLmcuIFVSTCBjb3VsZCBub3QgYmUgcmVzb2x2ZWQsIG5ldHdvcmsgZXJyb3IsIHVua25vd24gdGV4dCB0cmFjayBmb3JtYXQpLiBTb21lIG9yIGFsbCBvZiB0aGUgY3VlcyBhcmUgbGlrZWx5IG1pc3NpbmcgYW5kIHdpbGwgbm90IGJlIG9idGFpbmVkLlxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgLy8gT25seSBsb2FkIGlmIG5vdCBsb2FkZWQgeWV0LlxyXG4gIGlmICh0aGlzLnJlYWR5U3RhdGVfID09PSAwKSB7XHJcbiAgICB0aGlzLnJlYWR5U3RhdGVfID0gMTtcclxuICAgIHZqcy5nZXQodGhpcy5zcmNfLCB2anMuYmluZCh0aGlzLCB0aGlzLnBhcnNlQ3VlcyksIHZqcy5iaW5kKHRoaXMsIHRoaXMub25FcnJvcikpO1xyXG4gIH1cclxuXHJcbn07XHJcblxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oZXJyKXtcclxuICB0aGlzLmVycm9yID0gZXJyO1xyXG4gIHRoaXMucmVhZHlTdGF0ZV8gPSAzO1xyXG4gIHRoaXMudHJpZ2dlcignZXJyb3InKTtcclxufTtcclxuXHJcbi8vIFBhcnNlIHRoZSBXZWJWVFQgdGV4dCBmb3JtYXQgZm9yIGN1ZSB0aW1lcy5cclxuLy8gVE9ETzogU2VwYXJhdGUgcGFyc2VyIGludG8gb3duIGNsYXNzIHNvIGFsdGVybmF0aXZlIHRpbWVkIHRleHQgZm9ybWF0cyBjYW4gYmUgdXNlZC4gKFRUTUwsIERGWFApXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnBhcnNlQ3VlcyA9IGZ1bmN0aW9uKHNyY0NvbnRlbnQpIHtcclxuICB2YXIgY3VlLCB0aW1lLCB0ZXh0LFxyXG4gICAgICBsaW5lcyA9IHNyY0NvbnRlbnQuc3BsaXQoJ1xcbicpLFxyXG4gICAgICBsaW5lID0gJycsIGlkO1xyXG5cclxuICBmb3IgKHZhciBpPTEsIGo9bGluZXMubGVuZ3RoOyBpPGo7IGkrKykge1xyXG4gICAgLy8gTGluZSAwIHNob3VsZCBiZSAnV0VCVlRUJywgc28gc2tpcHBpbmcgaT0wXHJcblxyXG4gICAgbGluZSA9IHZqcy50cmltKGxpbmVzW2ldKTsgLy8gVHJpbSB3aGl0ZXNwYWNlIGFuZCBsaW5lYnJlYWtzXHJcblxyXG4gICAgaWYgKGxpbmUpIHsgLy8gTG9vcCB1bnRpbCBhIGxpbmUgd2l0aCBjb250ZW50XHJcblxyXG4gICAgICAvLyBGaXJzdCBsaW5lIGNvdWxkIGJlIGFuIG9wdGlvbmFsIGN1ZSBJRFxyXG4gICAgICAvLyBDaGVjayBpZiBsaW5lIGhhcyB0aGUgdGltZSBzZXBhcmF0b3JcclxuICAgICAgaWYgKGxpbmUuaW5kZXhPZignLS0+JykgPT0gLTEpIHtcclxuICAgICAgICBpZCA9IGxpbmU7XHJcbiAgICAgICAgLy8gQWR2YW5jZSB0byBuZXh0IGxpbmUgZm9yIHRpbWluZy5cclxuICAgICAgICBsaW5lID0gdmpzLnRyaW0obGluZXNbKytpXSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWQgPSB0aGlzLmN1ZXNfLmxlbmd0aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gRmlyc3QgbGluZSAtIE51bWJlclxyXG4gICAgICBjdWUgPSB7XHJcbiAgICAgICAgaWQ6IGlkLCAvLyBDdWUgTnVtYmVyXHJcbiAgICAgICAgaW5kZXg6IHRoaXMuY3Vlc18ubGVuZ3RoIC8vIFBvc2l0aW9uIGluIEFycmF5XHJcbiAgICAgIH07XHJcblxyXG4gICAgICAvLyBUaW1pbmcgbGluZVxyXG4gICAgICB0aW1lID0gbGluZS5zcGxpdCgnIC0tPiAnKTtcclxuICAgICAgY3VlLnN0YXJ0VGltZSA9IHRoaXMucGFyc2VDdWVUaW1lKHRpbWVbMF0pO1xyXG4gICAgICBjdWUuZW5kVGltZSA9IHRoaXMucGFyc2VDdWVUaW1lKHRpbWVbMV0pO1xyXG5cclxuICAgICAgLy8gQWRkaXRpb25hbCBsaW5lcyAtIEN1ZSBUZXh0XHJcbiAgICAgIHRleHQgPSBbXTtcclxuXHJcbiAgICAgIC8vIExvb3AgdW50aWwgYSBibGFuayBsaW5lIG9yIGVuZCBvZiBsaW5lc1xyXG4gICAgICAvLyBBc3N1bWVpbmcgdHJpbSgnJykgcmV0dXJucyBmYWxzZSBmb3IgYmxhbmsgbGluZXNcclxuICAgICAgd2hpbGUgKGxpbmVzWysraV0gJiYgKGxpbmUgPSB2anMudHJpbShsaW5lc1tpXSkpKSB7XHJcbiAgICAgICAgdGV4dC5wdXNoKGxpbmUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBjdWUudGV4dCA9IHRleHQuam9pbignPGJyLz4nKTtcclxuXHJcbiAgICAgIC8vIEFkZCB0aGlzIGN1ZVxyXG4gICAgICB0aGlzLmN1ZXNfLnB1c2goY3VlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMucmVhZHlTdGF0ZV8gPSAyO1xyXG4gIHRoaXMudHJpZ2dlcignbG9hZGVkJyk7XHJcbn07XHJcblxyXG5cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUucGFyc2VDdWVUaW1lID0gZnVuY3Rpb24odGltZVRleHQpIHtcclxuICB2YXIgcGFydHMgPSB0aW1lVGV4dC5zcGxpdCgnOicpLFxyXG4gICAgICB0aW1lID0gMCxcclxuICAgICAgaG91cnMsIG1pbnV0ZXMsIG90aGVyLCBzZWNvbmRzLCBtcztcclxuXHJcbiAgLy8gQ2hlY2sgaWYgb3B0aW9uYWwgaG91cnMgcGxhY2UgaXMgaW5jbHVkZWRcclxuICAvLyAwMDowMDowMC4wMDAgdnMuIDAwOjAwLjAwMFxyXG4gIGlmIChwYXJ0cy5sZW5ndGggPT0gMykge1xyXG4gICAgaG91cnMgPSBwYXJ0c1swXTtcclxuICAgIG1pbnV0ZXMgPSBwYXJ0c1sxXTtcclxuICAgIG90aGVyID0gcGFydHNbMl07XHJcbiAgfSBlbHNlIHtcclxuICAgIGhvdXJzID0gMDtcclxuICAgIG1pbnV0ZXMgPSBwYXJ0c1swXTtcclxuICAgIG90aGVyID0gcGFydHNbMV07XHJcbiAgfVxyXG5cclxuICAvLyBCcmVhayBvdGhlciAoc2Vjb25kcywgbWlsbGlzZWNvbmRzLCBhbmQgZmxhZ3MpIGJ5IHNwYWNlc1xyXG4gIC8vIFRPRE86IE1ha2UgYWRkaXRpb25hbCBjdWUgbGF5b3V0IHNldHRpbmdzIHdvcmsgd2l0aCBmbGFnc1xyXG4gIG90aGVyID0gb3RoZXIuc3BsaXQoL1xccysvKTtcclxuICAvLyBSZW1vdmUgc2Vjb25kcy4gU2Vjb25kcyBpcyB0aGUgZmlyc3QgcGFydCBiZWZvcmUgYW55IHNwYWNlcy5cclxuICBzZWNvbmRzID0gb3RoZXIuc3BsaWNlKDAsMSlbMF07XHJcbiAgLy8gQ291bGQgdXNlIGVpdGhlciAuIG9yICwgZm9yIGRlY2ltYWxcclxuICBzZWNvbmRzID0gc2Vjb25kcy5zcGxpdCgvXFwufCwvKTtcclxuICAvLyBHZXQgbWlsbGlzZWNvbmRzXHJcbiAgbXMgPSBwYXJzZUZsb2F0KHNlY29uZHNbMV0pO1xyXG4gIHNlY29uZHMgPSBzZWNvbmRzWzBdO1xyXG5cclxuICAvLyBob3VycyA9PiBzZWNvbmRzXHJcbiAgdGltZSArPSBwYXJzZUZsb2F0KGhvdXJzKSAqIDM2MDA7XHJcbiAgLy8gbWludXRlcyA9PiBzZWNvbmRzXHJcbiAgdGltZSArPSBwYXJzZUZsb2F0KG1pbnV0ZXMpICogNjA7XHJcbiAgLy8gQWRkIHNlY29uZHNcclxuICB0aW1lICs9IHBhcnNlRmxvYXQoc2Vjb25kcyk7XHJcbiAgLy8gQWRkIG1pbGxpc2Vjb25kc1xyXG4gIGlmIChtcykgeyB0aW1lICs9IG1zLzEwMDA7IH1cclxuXHJcbiAgcmV0dXJuIHRpbWU7XHJcbn07XHJcblxyXG4vLyBVcGRhdGUgYWN0aXZlIGN1ZXMgd2hlbmV2ZXIgdGltZXVwZGF0ZSBldmVudHMgYXJlIHRyaWdnZXJlZCBvbiB0aGUgcGxheWVyLlxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLmN1ZXNfLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAvLyBHZXQgY3VyZW50IHBsYXllciB0aW1lXHJcbiAgICB2YXIgdGltZSA9IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIHRoZSBuZXcgdGltZSBpcyBvdXRzaWRlIHRoZSB0aW1lIGJveCBjcmVhdGVkIGJ5IHRoZSB0aGUgbGFzdCB1cGRhdGUuXHJcbiAgICBpZiAodGhpcy5wcmV2Q2hhbmdlID09PSB1bmRlZmluZWQgfHwgdGltZSA8IHRoaXMucHJldkNoYW5nZSB8fCB0aGlzLm5leHRDaGFuZ2UgPD0gdGltZSkge1xyXG4gICAgICB2YXIgY3VlcyA9IHRoaXMuY3Vlc18sXHJcblxyXG4gICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHRpbWUgYm94IGZvciB0aGlzIHN0YXRlLlxyXG4gICAgICAgICAgbmV3TmV4dENoYW5nZSA9IHRoaXMucGxheWVyXy5kdXJhdGlvbigpLCAvLyBTdGFydCBhdCBiZWdpbm5pbmcgb2YgdGhlIHRpbWVsaW5lXHJcbiAgICAgICAgICBuZXdQcmV2Q2hhbmdlID0gMCwgLy8gU3RhcnQgYXQgZW5kXHJcblxyXG4gICAgICAgICAgcmV2ZXJzZSA9IGZhbHNlLCAvLyBTZXQgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbG9vcCB0aHJvdWdoIHRoZSBjdWVzLiBPcHRpbWl6ZWQgdGhlIGN1ZSBjaGVjay5cclxuICAgICAgICAgIG5ld0N1ZXMgPSBbXSwgLy8gU3RvcmUgbmV3IGFjdGl2ZSBjdWVzLlxyXG5cclxuICAgICAgICAgIC8vIFN0b3JlIHdoZXJlIGluIHRoZSBsb29wIHRoZSBjdXJyZW50IGFjdGl2ZSBjdWVzIGFyZSwgdG8gcHJvdmlkZSBhIHNtYXJ0IHN0YXJ0aW5nIHBvaW50IGZvciB0aGUgbmV4dCBsb29wLlxyXG4gICAgICAgICAgZmlyc3RBY3RpdmVJbmRleCwgbGFzdEFjdGl2ZUluZGV4LFxyXG4gICAgICAgICAgY3VlLCBpOyAvLyBMb29wIHZhcnNcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIHRpbWUgaXMgZ29pbmcgZm9yd2FyZHMgb3IgYmFja3dhcmRzIChzY3J1YmJpbmcvcmV3aW5kaW5nKVxyXG4gICAgICAvLyBJZiB3ZSBrbm93IHRoZSBkaXJlY3Rpb24gd2UgY2FuIG9wdGltaXplIHRoZSBzdGFydGluZyBwb3NpdGlvbiBhbmQgZGlyZWN0aW9uIG9mIHRoZSBsb29wIHRocm91Z2ggdGhlIGN1ZXMgYXJyYXkuXHJcbiAgICAgIGlmICh0aW1lID49IHRoaXMubmV4dENoYW5nZSB8fCB0aGlzLm5leHRDaGFuZ2UgPT09IHVuZGVmaW5lZCkgeyAvLyBOZXh0Q2hhbmdlIHNob3VsZCBoYXBwZW5cclxuICAgICAgICAvLyBGb3J3YXJkcywgc28gc3RhcnQgYXQgdGhlIGluZGV4IG9mIHRoZSBmaXJzdCBhY3RpdmUgY3VlIGFuZCBsb29wIGZvcndhcmRcclxuICAgICAgICBpID0gKHRoaXMuZmlyc3RBY3RpdmVJbmRleCAhPT0gdW5kZWZpbmVkKSA/IHRoaXMuZmlyc3RBY3RpdmVJbmRleCA6IDA7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gQmFja3dhcmRzLCBzbyBzdGFydCBhdCB0aGUgaW5kZXggb2YgdGhlIGxhc3QgYWN0aXZlIGN1ZSBhbmQgbG9vcCBiYWNrd2FyZFxyXG4gICAgICAgIHJldmVyc2UgPSB0cnVlO1xyXG4gICAgICAgIGkgPSAodGhpcy5sYXN0QWN0aXZlSW5kZXggIT09IHVuZGVmaW5lZCkgPyB0aGlzLmxhc3RBY3RpdmVJbmRleCA6IGN1ZXMubGVuZ3RoIC0gMTtcclxuICAgICAgfVxyXG5cclxuICAgICAgd2hpbGUgKHRydWUpIHsgLy8gTG9vcCB1bnRpbCBicm9rZW5cclxuICAgICAgICBjdWUgPSBjdWVzW2ldO1xyXG5cclxuICAgICAgICAvLyBDdWUgZW5kZWQgYXQgdGhpcyBwb2ludFxyXG4gICAgICAgIGlmIChjdWUuZW5kVGltZSA8PSB0aW1lKSB7XHJcbiAgICAgICAgICBuZXdQcmV2Q2hhbmdlID0gTWF0aC5tYXgobmV3UHJldkNoYW5nZSwgY3VlLmVuZFRpbWUpO1xyXG5cclxuICAgICAgICAgIGlmIChjdWUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGN1ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBObyBlYXJsaWVyIGN1ZXMgc2hvdWxkIGhhdmUgYW4gYWN0aXZlIHN0YXJ0IHRpbWUuXHJcbiAgICAgICAgICAvLyBOZXZlcm1pbmQuIEFzc3VtZSBmaXJzdCBjdWUgY291bGQgaGF2ZSBhIGR1cmF0aW9uIHRoZSBzYW1lIGFzIHRoZSB2aWRlby5cclxuICAgICAgICAgIC8vIEluIHRoYXQgY2FzZSB3ZSBuZWVkIHRvIGxvb3AgYWxsIHRoZSB3YXkgYmFjayB0byB0aGUgYmVnaW5uaW5nLlxyXG4gICAgICAgICAgLy8gaWYgKHJldmVyc2UgJiYgY3VlLnN0YXJ0VGltZSkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAvLyBDdWUgaGFzbid0IHN0YXJ0ZWRcclxuICAgICAgICB9IGVsc2UgaWYgKHRpbWUgPCBjdWUuc3RhcnRUaW1lKSB7XHJcbiAgICAgICAgICBuZXdOZXh0Q2hhbmdlID0gTWF0aC5taW4obmV3TmV4dENoYW5nZSwgY3VlLnN0YXJ0VGltZSk7XHJcblxyXG4gICAgICAgICAgaWYgKGN1ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgY3VlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE5vIGxhdGVyIGN1ZXMgc2hvdWxkIGhhdmUgYW4gYWN0aXZlIHN0YXJ0IHRpbWUuXHJcbiAgICAgICAgICBpZiAoIXJldmVyc2UpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgICAgLy8gQ3VlIGlzIGN1cnJlbnRcclxuICAgICAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCBjdWUgdG8gZnJvbnQgb2YgYXJyYXkgdG8ga2VlcCBpbiB0aW1lIG9yZGVyXHJcbiAgICAgICAgICAgIG5ld0N1ZXMuc3BsaWNlKDAsMCxjdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgaW4gcmV2ZXJzZSwgdGhlIGZpcnN0IGN1cnJlbnQgY3VlIGlzIG91ciBsYXN0QWN0aXZlQ3VlXHJcbiAgICAgICAgICAgIGlmIChsYXN0QWN0aXZlSW5kZXggPT09IHVuZGVmaW5lZCkgeyBsYXN0QWN0aXZlSW5kZXggPSBpOyB9XHJcbiAgICAgICAgICAgIGZpcnN0QWN0aXZlSW5kZXggPSBpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gQWRkIGN1ZSB0byBlbmQgb2YgYXJyYXlcclxuICAgICAgICAgICAgbmV3Q3Vlcy5wdXNoKGN1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBmb3J3YXJkLCB0aGUgZmlyc3QgY3VycmVudCBjdWUgaXMgb3VyIGZpcnN0QWN0aXZlSW5kZXhcclxuICAgICAgICAgICAgaWYgKGZpcnN0QWN0aXZlSW5kZXggPT09IHVuZGVmaW5lZCkgeyBmaXJzdEFjdGl2ZUluZGV4ID0gaTsgfVxyXG4gICAgICAgICAgICBsYXN0QWN0aXZlSW5kZXggPSBpO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIG5ld05leHRDaGFuZ2UgPSBNYXRoLm1pbihuZXdOZXh0Q2hhbmdlLCBjdWUuZW5kVGltZSk7XHJcbiAgICAgICAgICBuZXdQcmV2Q2hhbmdlID0gTWF0aC5tYXgobmV3UHJldkNoYW5nZSwgY3VlLnN0YXJ0VGltZSk7XHJcblxyXG4gICAgICAgICAgY3VlLmFjdGl2ZSA9IHRydWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmV2ZXJzZSkge1xyXG4gICAgICAgICAgLy8gUmV2ZXJzZSBkb3duIHRoZSBhcnJheSBvZiBjdWVzLCBicmVhayBpZiBhdCBmaXJzdFxyXG4gICAgICAgICAgaWYgKGkgPT09IDApIHsgYnJlYWs7IH0gZWxzZSB7IGktLTsgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAvLyBXYWxrIHVwIHRoZSBhcnJheSBmbyBjdWVzLCBicmVhayBpZiBhdCBsYXN0XHJcbiAgICAgICAgICBpZiAoaSA9PT0gY3Vlcy5sZW5ndGggLSAxKSB7IGJyZWFrOyB9IGVsc2UgeyBpKys7IH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLmFjdGl2ZUN1ZXNfID0gbmV3Q3VlcztcclxuICAgICAgdGhpcy5uZXh0Q2hhbmdlID0gbmV3TmV4dENoYW5nZTtcclxuICAgICAgdGhpcy5wcmV2Q2hhbmdlID0gbmV3UHJldkNoYW5nZTtcclxuICAgICAgdGhpcy5maXJzdEFjdGl2ZUluZGV4ID0gZmlyc3RBY3RpdmVJbmRleDtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlSW5kZXggPSBsYXN0QWN0aXZlSW5kZXg7XHJcblxyXG4gICAgICB0aGlzLnVwZGF0ZURpc3BsYXkoKTtcclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcignY3VlY2hhbmdlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gQWRkIGN1ZSBIVE1MIHRvIGRpc3BsYXlcclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUudXBkYXRlRGlzcGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGN1ZXMgPSB0aGlzLmFjdGl2ZUN1ZXNfLFxyXG4gICAgICBodG1sID0gJycsXHJcbiAgICAgIGk9MCxqPWN1ZXMubGVuZ3RoO1xyXG5cclxuICBmb3IgKDtpPGo7aSsrKSB7XHJcbiAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cInZqcy10dC1jdWVcIj4nK2N1ZXNbaV0udGV4dCsnPC9zcGFuPic7XHJcbiAgfVxyXG5cclxuICB0aGlzLmVsXy5pbm5lckhUTUwgPSBodG1sO1xyXG59O1xyXG5cclxuLy8gU2V0IGFsbCBsb29wIGhlbHBlciB2YWx1ZXMgYmFja1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5uZXh0Q2hhbmdlID0gMDtcclxuICB0aGlzLnByZXZDaGFuZ2UgPSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcclxuICB0aGlzLmZpcnN0QWN0aXZlSW5kZXggPSAwO1xyXG4gIHRoaXMubGFzdEFjdGl2ZUluZGV4ID0gMDtcclxufTtcclxuXHJcbi8vIENyZWF0ZSBzcGVjaWZpYyB0cmFjayB0eXBlc1xyXG4vKipcclxuICogVGhlIHRyYWNrIGNvbXBvbmVudCBmb3IgbWFuYWdpbmcgdGhlIGhpZGluZyBhbmQgc2hvd2luZyBvZiBjYXB0aW9uc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DYXB0aW9uc1RyYWNrID0gdmpzLlRleHRUcmFjay5leHRlbmQoKTtcclxudmpzLkNhcHRpb25zVHJhY2sucHJvdG90eXBlLmtpbmRfID0gJ2NhcHRpb25zJztcclxuLy8gRXhwb3J0aW5nIGhlcmUgYmVjYXVzZSBUcmFjayBjcmVhdGlvbiByZXF1aXJlcyB0aGUgdHJhY2sga2luZFxyXG4vLyB0byBiZSBhdmFpbGFibGUgb24gZ2xvYmFsIG9iamVjdC4gZS5nLiBuZXcgd2luZG93Wyd2aWRlb2pzJ11bS2luZCArICdUcmFjayddXHJcblxyXG4vKipcclxuICogVGhlIHRyYWNrIGNvbXBvbmVudCBmb3IgbWFuYWdpbmcgdGhlIGhpZGluZyBhbmQgc2hvd2luZyBvZiBzdWJ0aXRsZXNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU3VidGl0bGVzVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xyXG52anMuU3VidGl0bGVzVHJhY2sucHJvdG90eXBlLmtpbmRfID0gJ3N1YnRpdGxlcyc7XHJcblxyXG4vKipcclxuICogVGhlIHRyYWNrIGNvbXBvbmVudCBmb3IgbWFuYWdpbmcgdGhlIGhpZGluZyBhbmQgc2hvd2luZyBvZiBjaGFwdGVyc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DaGFwdGVyc1RyYWNrID0gdmpzLlRleHRUcmFjay5leHRlbmQoKTtcclxudmpzLkNoYXB0ZXJzVHJhY2sucHJvdG90eXBlLmtpbmRfID0gJ2NoYXB0ZXJzJztcclxuXHJcblxyXG4vKiBUZXh0IFRyYWNrIERpc3BsYXlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy8gR2xvYmFsIGNvbnRhaW5lciBmb3IgYm90aCBzdWJ0aXRsZSBhbmQgY2FwdGlvbnMgdGV4dC4gU2ltcGxlIGRpdiBjb250YWluZXIuXHJcblxyXG4vKipcclxuICogVGhlIGNvbXBvbmVudCBmb3IgZGlzcGxheWluZyB0ZXh0IHRyYWNrIGN1ZXNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrRGlzcGxheSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgLy8gVGhpcyB1c2VkIHRvIGJlIGNhbGxlZCBkdXJpbmcgcGxheWVyIGluaXQsIGJ1dCB3YXMgY2F1c2luZyBhbiBlcnJvclxyXG4gICAgLy8gaWYgYSB0cmFjayBzaG91bGQgc2hvdyBieSBkZWZhdWx0IGFuZCB0aGUgZGlzcGxheSBoYWRuJ3QgbG9hZGVkIHlldC5cclxuICAgIC8vIFNob3VsZCBwcm9iYWJseSBiZSBtb3ZlZCB0byBhbiBleHRlcm5hbCB0cmFjayBsb2FkZXIgd2hlbiB3ZSBzdXBwb3J0XHJcbiAgICAvLyB0cmFja3MgdGhhdCBkb24ndCBuZWVkIGEgZGlzcGxheS5cclxuICAgIGlmIChwbGF5ZXIub3B0aW9uc19bJ3RyYWNrcyddICYmIHBsYXllci5vcHRpb25zX1sndHJhY2tzJ10ubGVuZ3RoID4gMCkge1xyXG4gICAgICB0aGlzLnBsYXllcl8uYWRkVGV4dFRyYWNrcyhwbGF5ZXIub3B0aW9uc19bJ3RyYWNrcyddKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlRleHRUcmFja0Rpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXRleHQtdHJhY2stZGlzcGxheSdcclxuICB9KTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogVGhlIHNwZWNpZmljIG1lbnUgaXRlbSB0eXBlIGZvciBzZWxlY3RpbmcgYSBsYW5ndWFnZSB3aXRoaW4gYSB0ZXh0IHRyYWNrIGtpbmRcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrTWVudUl0ZW0gPSB2anMuTWVudUl0ZW0uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZhciB0cmFjayA9IHRoaXMudHJhY2sgPSBvcHRpb25zWyd0cmFjayddO1xyXG5cclxuICAgIC8vIE1vZGlmeSBvcHRpb25zIGZvciBwYXJlbnQgTWVudUl0ZW0gY2xhc3MncyBpbml0LlxyXG4gICAgb3B0aW9uc1snbGFiZWwnXSA9IHRyYWNrLmxhYmVsKCk7XHJcbiAgICBvcHRpb25zWydzZWxlY3RlZCddID0gdHJhY2suZGZsdCgpO1xyXG4gICAgdmpzLk1lbnVJdGVtLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLnBsYXllcl8ub24odHJhY2sua2luZCgpICsgJ3RyYWNrY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB2anMuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcclxuICB0aGlzLnBsYXllcl8uc2hvd1RleHRUcmFjayh0aGlzLnRyYWNrLmlkXywgdGhpcy50cmFjay5raW5kKCkpO1xyXG59O1xyXG5cclxudmpzLlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuc2VsZWN0ZWQodGhpcy50cmFjay5tb2RlKCkgPT0gMik7XHJcbn07XHJcblxyXG4vKipcclxuICogQSBzcGVjaWFsIG1lbnUgaXRlbSBmb3IgdHVybmluZyBvZiBhIHNwZWNpZmljIHR5cGUgb2YgdGV4dCB0cmFja1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbSA9IHZqcy5UZXh0VHJhY2tNZW51SXRlbS5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgLy8gQ3JlYXRlIHBzZXVkbyB0cmFjayBpbmZvXHJcbiAgICAvLyBSZXF1aXJlcyBvcHRpb25zWydraW5kJ11cclxuICAgIG9wdGlvbnNbJ3RyYWNrJ10gPSB7XHJcbiAgICAgIGtpbmQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gb3B0aW9uc1sna2luZCddOyB9LFxyXG4gICAgICBwbGF5ZXI6IHBsYXllcixcclxuICAgICAgbGFiZWw6IGZ1bmN0aW9uKCl7IHJldHVybiBvcHRpb25zWydraW5kJ10gKyAnIG9mZic7IH0sXHJcbiAgICAgIGRmbHQ6IGZ1bmN0aW9uKCl7IHJldHVybiBmYWxzZTsgfSxcclxuICAgICAgbW9kZTogZnVuY3Rpb24oKXsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICB9O1xyXG4gICAgdmpzLlRleHRUcmFja01lbnVJdGVtLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICAgIHRoaXMuc2VsZWN0ZWQodHJ1ZSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XHJcbiAgdGhpcy5wbGF5ZXJfLnNob3dUZXh0VHJhY2sodGhpcy50cmFjay5pZF8sIHRoaXMudHJhY2sua2luZCgpKTtcclxufTtcclxuXHJcbnZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdHJhY2tzID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKSxcclxuICAgICAgaT0wLCBqPXRyYWNrcy5sZW5ndGgsIHRyYWNrLFxyXG4gICAgICBvZmYgPSB0cnVlO1xyXG5cclxuICBmb3IgKDtpPGo7aSsrKSB7XHJcbiAgICB0cmFjayA9IHRyYWNrc1tpXTtcclxuICAgIGlmICh0cmFjay5raW5kKCkgPT0gdGhpcy50cmFjay5raW5kKCkgJiYgdHJhY2subW9kZSgpID09IDIpIHtcclxuICAgICAgb2ZmID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLnNlbGVjdGVkKG9mZik7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGJhc2UgY2xhc3MgZm9yIGJ1dHRvbnMgdGhhdCB0b2dnbGUgc3BlY2lmaWMgdGV4dCB0cmFjayB0eXBlcyAoZS5nLiBzdWJ0aXRsZXMpXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlRleHRUcmFja0J1dHRvbiA9IHZqcy5NZW51QnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuTWVudUJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbi8vIHZqcy5UZXh0VHJhY2tCdXR0b24ucHJvdG90eXBlLmJ1dHRvblByZXNzZWQgPSBmYWxzZTtcclxuXHJcbi8vIHZqcy5UZXh0VHJhY2tCdXR0b24ucHJvdG90eXBlLmNyZWF0ZU1lbnUgPSBmdW5jdGlvbigpe1xyXG4vLyAgIHZhciBtZW51ID0gbmV3IHZqcy5NZW51KHRoaXMucGxheWVyXyk7XHJcblxyXG4vLyAgIC8vIEFkZCBhIHRpdGxlIGxpc3QgaXRlbSB0byB0aGUgdG9wXHJcbi8vICAgLy8gbWVudS5lbCgpLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnbGknLCB7XHJcbi8vICAgLy8gICBjbGFzc05hbWU6ICd2anMtbWVudS10aXRsZScsXHJcbi8vICAgLy8gICBpbm5lckhUTUw6IHZqcy5jYXBpdGFsaXplKHRoaXMua2luZF8pLFxyXG4vLyAgIC8vICAgdGFiaW5kZXg6IC0xXHJcbi8vICAgLy8gfSkpO1xyXG5cclxuLy8gICB0aGlzLml0ZW1zID0gdGhpcy5jcmVhdGVJdGVtcygpO1xyXG5cclxuLy8gICAvLyBBZGQgbWVudSBpdGVtcyB0byB0aGUgbWVudVxyXG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgbWVudS5hZGRJdGVtKHRoaXMuaXRlbXNbaV0pO1xyXG4vLyAgIH1cclxuXHJcbi8vICAgLy8gQWRkIGxpc3QgdG8gZWxlbWVudFxyXG4vLyAgIHRoaXMuYWRkQ2hpbGQobWVudSk7XHJcblxyXG4vLyAgIHJldHVybiBtZW51O1xyXG4vLyB9O1xyXG5cclxuLy8gQ3JlYXRlIGEgbWVudSBpdGVtIGZvciBlYWNoIHRleHQgdHJhY2tcclxudmpzLlRleHRUcmFja0J1dHRvbi5wcm90b3R5cGUuY3JlYXRlSXRlbXMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBpdGVtcyA9IFtdLCB0cmFjaztcclxuXHJcbiAgLy8gQWRkIGFuIE9GRiBtZW51IGl0ZW0gdG8gdHVybiBhbGwgdHJhY2tzIG9mZlxyXG4gIGl0ZW1zLnB1c2gobmV3IHZqcy5PZmZUZXh0VHJhY2tNZW51SXRlbSh0aGlzLnBsYXllcl8sIHsgJ2tpbmQnOiB0aGlzLmtpbmRfIH0pKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0cmFjayA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKClbaV07XHJcbiAgICBpZiAodHJhY2sua2luZCgpID09PSB0aGlzLmtpbmRfKSB7XHJcbiAgICAgIGl0ZW1zLnB1c2gobmV3IHZqcy5UZXh0VHJhY2tNZW51SXRlbSh0aGlzLnBsYXllcl8sIHtcclxuICAgICAgICAndHJhY2snOiB0cmFja1xyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaXRlbXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3RpbmcgY2FwdGlvbnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ2FwdGlvbnNCdXR0b24gPSB2anMuVGV4dFRyYWNrQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLlRleHRUcmFja0J1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywnQ2FwdGlvbnMgTWVudScpO1xyXG4gIH1cclxufSk7XHJcbnZqcy5DYXB0aW9uc0J1dHRvbi5wcm90b3R5cGUua2luZF8gPSAnY2FwdGlvbnMnO1xyXG52anMuQ2FwdGlvbnNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnQ2FwdGlvbnMnO1xyXG52anMuQ2FwdGlvbnNCdXR0b24ucHJvdG90eXBlLmNsYXNzTmFtZSA9ICd2anMtY2FwdGlvbnMtYnV0dG9uJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgYnV0dG9uIGNvbXBvbmVudCBmb3IgdG9nZ2xpbmcgYW5kIHNlbGVjdGluZyBzdWJ0aXRsZXNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU3VidGl0bGVzQnV0dG9uID0gdmpzLlRleHRUcmFja0J1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5UZXh0VHJhY2tCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsJ1N1YnRpdGxlcyBNZW51Jyk7XHJcbiAgfVxyXG59KTtcclxudmpzLlN1YnRpdGxlc0J1dHRvbi5wcm90b3R5cGUua2luZF8gPSAnc3VidGl0bGVzJztcclxudmpzLlN1YnRpdGxlc0J1dHRvbi5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdTdWJ0aXRsZXMnO1xyXG52anMuU3VidGl0bGVzQnV0dG9uLnByb3RvdHlwZS5jbGFzc05hbWUgPSAndmpzLXN1YnRpdGxlcy1idXR0b24nO1xyXG5cclxuLy8gQ2hhcHRlcnMgYWN0IG11Y2ggZGlmZmVyZW50bHkgdGhhbiBvdGhlciB0ZXh0IHRyYWNrc1xyXG4vLyBDdWVzIGFyZSBuYXZpZ2F0aW9uIHZzLiBvdGhlciB0cmFja3Mgb2YgYWx0ZXJuYXRpdmUgbGFuZ3VhZ2VzXHJcbi8qKlxyXG4gKiBUaGUgYnV0dG9uIGNvbXBvbmVudCBmb3IgdG9nZ2xpbmcgYW5kIHNlbGVjdGluZyBjaGFwdGVyc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DaGFwdGVyc0J1dHRvbiA9IHZqcy5UZXh0VHJhY2tCdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuVGV4dFRyYWNrQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdDaGFwdGVycyBNZW51Jyk7XHJcbiAgfVxyXG59KTtcclxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5raW5kXyA9ICdjaGFwdGVycyc7XHJcbnZqcy5DaGFwdGVyc0J1dHRvbi5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdDaGFwdGVycyc7XHJcbnZqcy5DaGFwdGVyc0J1dHRvbi5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ3Zqcy1jaGFwdGVycy1idXR0b24nO1xyXG5cclxuLy8gQ3JlYXRlIGEgbWVudSBpdGVtIGZvciBlYWNoIHRleHQgdHJhY2tcclxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGl0ZW1zID0gW10sIHRyYWNrO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCkubGVuZ3RoOyBpKyspIHtcclxuICAgIHRyYWNrID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKVtpXTtcclxuICAgIGlmICh0cmFjay5raW5kKCkgPT09IHRoaXMua2luZF8pIHtcclxuICAgICAgaXRlbXMucHVzaChuZXcgdmpzLlRleHRUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywge1xyXG4gICAgICAgICd0cmFjayc6IHRyYWNrXHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBpdGVtcztcclxufTtcclxuXHJcbnZqcy5DaGFwdGVyc0J1dHRvbi5wcm90b3R5cGUuY3JlYXRlTWVudSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRyYWNrcyA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCksXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBqID0gdHJhY2tzLmxlbmd0aCxcclxuICAgICAgdHJhY2ssIGNoYXB0ZXJzVHJhY2ssXHJcbiAgICAgIGl0ZW1zID0gdGhpcy5pdGVtcyA9IFtdO1xyXG5cclxuICBmb3IgKDtpPGo7aSsrKSB7XHJcbiAgICB0cmFjayA9IHRyYWNrc1tpXTtcclxuICAgIGlmICh0cmFjay5raW5kKCkgPT0gdGhpcy5raW5kXyAmJiB0cmFjay5kZmx0KCkpIHtcclxuICAgICAgaWYgKHRyYWNrLnJlYWR5U3RhdGUoKSA8IDIpIHtcclxuICAgICAgICB0aGlzLmNoYXB0ZXJzVHJhY2sgPSB0cmFjaztcclxuICAgICAgICB0cmFjay5vbignbG9hZGVkJywgdmpzLmJpbmQodGhpcywgdGhpcy5jcmVhdGVNZW51KSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNoYXB0ZXJzVHJhY2sgPSB0cmFjaztcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmFyIG1lbnUgPSB0aGlzLm1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfKTtcclxuXHJcbiAgbWVudS5lbF8uYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdsaScsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LXRpdGxlJyxcclxuICAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXHJcbiAgICB0YWJpbmRleDogLTFcclxuICB9KSk7XHJcblxyXG4gIGlmIChjaGFwdGVyc1RyYWNrKSB7XHJcbiAgICB2YXIgY3VlcyA9IGNoYXB0ZXJzVHJhY2suY3Vlc18sIGN1ZSwgbWk7XHJcbiAgICBpID0gMDtcclxuICAgIGogPSBjdWVzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKDtpPGo7aSsrKSB7XHJcbiAgICAgIGN1ZSA9IGN1ZXNbaV07XHJcblxyXG4gICAgICBtaSA9IG5ldyB2anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywge1xyXG4gICAgICAgICd0cmFjayc6IGNoYXB0ZXJzVHJhY2ssXHJcbiAgICAgICAgJ2N1ZSc6IGN1ZVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGl0ZW1zLnB1c2gobWkpO1xyXG5cclxuICAgICAgbWVudS5hZGRDaGlsZChtaSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLnNob3coKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBtZW51O1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DaGFwdGVyc1RyYWNrTWVudUl0ZW0gPSB2anMuTWVudUl0ZW0uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZhciB0cmFjayA9IHRoaXMudHJhY2sgPSBvcHRpb25zWyd0cmFjayddLFxyXG4gICAgICAgIGN1ZSA9IHRoaXMuY3VlID0gb3B0aW9uc1snY3VlJ10sXHJcbiAgICAgICAgY3VycmVudFRpbWUgPSBwbGF5ZXIuY3VycmVudFRpbWUoKTtcclxuXHJcbiAgICAvLyBNb2RpZnkgb3B0aW9ucyBmb3IgcGFyZW50IE1lbnVJdGVtIGNsYXNzJ3MgaW5pdC5cclxuICAgIG9wdGlvbnNbJ2xhYmVsJ10gPSBjdWUudGV4dDtcclxuICAgIG9wdGlvbnNbJ3NlbGVjdGVkJ10gPSAoY3VlLnN0YXJ0VGltZSA8PSBjdXJyZW50VGltZSAmJiBjdXJyZW50VGltZSA8IGN1ZS5lbmRUaW1lKTtcclxuICAgIHZqcy5NZW51SXRlbS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgdHJhY2sub24oJ2N1ZWNoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5DaGFwdGVyc1RyYWNrTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5NZW51SXRlbS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xyXG4gIHRoaXMucGxheWVyXy5jdXJyZW50VGltZSh0aGlzLmN1ZS5zdGFydFRpbWUpO1xyXG4gIHRoaXMudXBkYXRlKHRoaXMuY3VlLnN0YXJ0VGltZSk7XHJcbn07XHJcblxyXG52anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBjdWUgPSB0aGlzLmN1ZSxcclxuICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuXHJcbiAgLy8gdmpzLmxvZyhjdXJyZW50VGltZSwgY3VlLnN0YXJ0VGltZSk7XHJcbiAgdGhpcy5zZWxlY3RlZChjdWUuc3RhcnRUaW1lIDw9IGN1cnJlbnRUaW1lICYmIGN1cnJlbnRUaW1lIDwgY3VlLmVuZFRpbWUpO1xyXG59O1xyXG5cclxuLy8gQWRkIEJ1dHRvbnMgdG8gY29udHJvbEJhclxyXG52anMub2JqLm1lcmdlKHZqcy5Db250cm9sQmFyLnByb3RvdHlwZS5vcHRpb25zX1snY2hpbGRyZW4nXSwge1xyXG4gICdzdWJ0aXRsZXNCdXR0b24nOiB7fSxcclxuICAnY2FwdGlvbnNCdXR0b24nOiB7fSxcclxuICAnY2hhcHRlcnNCdXR0b24nOiB7fVxyXG59KTtcclxuXHJcbi8vIHZqcy5DdWUgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbi8vICAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4vLyAgIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbi8vICAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuLy8gICB9XHJcbi8vIH0pO1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBBZGQgSlNPTiBzdXBwb3J0XHJcbiAqIEBzdXBwcmVzcyB7dW5kZWZpbmVkVmFyc31cclxuICogKENvbXBpbGVyIGRvZXNuJ3QgbGlrZSBKU09OIG5vdCBiZWluZyBkZWNsYXJlZClcclxuICovXHJcblxyXG4vKipcclxuICogSmF2YXNjcmlwdCBKU09OIGltcGxlbWVudGF0aW9uXHJcbiAqIChQYXJzZSBNZXRob2QgT25seSlcclxuICogaHR0cHM6Ly9naXRodWIuY29tL2RvdWdsYXNjcm9ja2ZvcmQvSlNPTi1qcy9ibG9iL21hc3Rlci9qc29uMi5qc1xyXG4gKiBPbmx5IHVzaW5nIGZvciBwYXJzZSBtZXRob2Qgd2hlbiBwYXJzaW5nIGRhdGEtc2V0dXAgYXR0cmlidXRlIEpTT04uXHJcbiAqIEBzdXBwcmVzcyB7dW5kZWZpbmVkVmFyc31cclxuICogQG5hbWVzcGFjZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkpTT047XHJcblxyXG5pZiAodHlwZW9mIHdpbmRvdy5KU09OICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuSlNPTi5wYXJzZSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gIHZqcy5KU09OID0gd2luZG93LkpTT047XHJcblxyXG59IGVsc2Uge1xyXG4gIHZqcy5KU09OID0ge307XHJcblxyXG4gIHZhciBjeCA9IC9bXFx1MDAwMFxcdTAwYWRcXHUwNjAwLVxcdTA2MDRcXHUwNzBmXFx1MTdiNFxcdTE3YjVcXHUyMDBjLVxcdTIwMGZcXHUyMDI4LVxcdTIwMmZcXHUyMDYwLVxcdTIwNmZcXHVmZWZmXFx1ZmZmMC1cXHVmZmZmXS9nO1xyXG5cclxuICAvKipcclxuICAgKiBwYXJzZSB0aGUganNvblxyXG4gICAqXHJcbiAgICogQG1lbWJlcm9mIHZqcy5KU09OXHJcbiAgICogQHJldHVybiB7T2JqZWN0fEFycmF5fSBUaGUgcGFyc2VkIEpTT05cclxuICAgKi9cclxuICB2anMuSlNPTi5wYXJzZSA9IGZ1bmN0aW9uICh0ZXh0LCByZXZpdmVyKSB7XHJcbiAgICAgIHZhciBqO1xyXG5cclxuICAgICAgZnVuY3Rpb24gd2Fsayhob2xkZXIsIGtleSkge1xyXG4gICAgICAgICAgdmFyIGssIHYsIHZhbHVlID0gaG9sZGVyW2tleV07XHJcbiAgICAgICAgICBpZiAodmFsdWUgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0Jykge1xyXG4gICAgICAgICAgICAgIGZvciAoayBpbiB2YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgdiA9IHdhbGsodmFsdWUsIGspO1xyXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHYgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlW2tdID0gdjtcclxuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJldml2ZXIuY2FsbChob2xkZXIsIGtleSwgdmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICAgIHRleHQgPSBTdHJpbmcodGV4dCk7XHJcbiAgICAgIGN4Lmxhc3RJbmRleCA9IDA7XHJcbiAgICAgIGlmIChjeC50ZXN0KHRleHQpKSB7XHJcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5yZXBsYWNlKGN4LCBmdW5jdGlvbiAoYSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiAnXFxcXHUnICtcclxuICAgICAgICAgICAgICAgICAgKCcwMDAwJyArIGEuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC00KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoL15bXFxdLDp7fVxcc10qJC9cclxuICAgICAgICAgICAgICAudGVzdCh0ZXh0LnJlcGxhY2UoL1xcXFwoPzpbXCJcXFxcXFwvYmZucnRdfHVbMC05YS1mQS1GXXs0fSkvZywgJ0AnKVxyXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXCJbXlwiXFxcXFxcblxccl0qXCJ8dHJ1ZXxmYWxzZXxudWxsfC0/XFxkKyg/OlxcLlxcZCopPyg/OltlRV1bK1xcLV0/XFxkKyk/L2csICddJylcclxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoLyg/Ol58OnwsKSg/OlxccypcXFspKy9nLCAnJykpKSB7XHJcblxyXG4gICAgICAgICAgaiA9IGV2YWwoJygnICsgdGV4dCArICcpJyk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIHR5cGVvZiByZXZpdmVyID09PSAnZnVuY3Rpb24nID9cclxuICAgICAgICAgICAgICB3YWxrKHsnJzogan0sICcnKSA6IGo7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignSlNPTi5wYXJzZSgpOiBpbnZhbGlkIG9yIG1hbGZvcm1lZCBKU09OIGRhdGEnKTtcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IEZ1bmN0aW9ucyBmb3IgYXV0b21hdGljYWxseSBzZXR0aW5nIHVwIGEgcGxheWVyXHJcbiAqIGJhc2VkIG9uIHRoZSBkYXRhLXNldHVwIGF0dHJpYnV0ZSBvZiB0aGUgdmlkZW8gdGFnXHJcbiAqL1xyXG5cclxuLy8gQXV0b21hdGljYWxseSBzZXQgdXAgYW55IHRhZ3MgdGhhdCBoYXZlIGEgZGF0YS1zZXR1cCBhdHRyaWJ1dGVcclxudmpzLmF1dG9TZXR1cCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG9wdGlvbnMsIHZpZCwgcGxheWVyLFxyXG4gICAgICB2aWRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3ZpZGVvJyk7XHJcblxyXG4gIC8vIENoZWNrIGlmIGFueSBtZWRpYSBlbGVtZW50cyBleGlzdFxyXG4gIGlmICh2aWRzICYmIHZpZHMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIGZvciAodmFyIGk9MCxqPXZpZHMubGVuZ3RoOyBpPGo7IGkrKykge1xyXG4gICAgICB2aWQgPSB2aWRzW2ldO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgZWxlbWVudCBleGlzdHMsIGhhcyBnZXRBdHRyaWJ1dGUgZnVuYy5cclxuICAgICAgLy8gSUUgc2VlbXMgdG8gY29uc2lkZXIgdHlwZW9mIGVsLmdldEF0dHJpYnV0ZSA9PSAnb2JqZWN0JyBpbnN0ZWFkIG9mICdmdW5jdGlvbicgbGlrZSBleHBlY3RlZCwgYXQgbGVhc3Qgd2hlbiBsb2FkaW5nIHRoZSBwbGF5ZXIgaW1tZWRpYXRlbHkuXHJcbiAgICAgIGlmICh2aWQgJiYgdmlkLmdldEF0dHJpYnV0ZSkge1xyXG5cclxuICAgICAgICAvLyBNYWtlIHN1cmUgdGhpcyBwbGF5ZXIgaGFzbid0IGFscmVhZHkgYmVlbiBzZXQgdXAuXHJcbiAgICAgICAgaWYgKHZpZFsncGxheWVyJ10gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgb3B0aW9ucyA9IHZpZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2V0dXAnKTtcclxuXHJcbiAgICAgICAgICAvLyBDaGVjayBpZiBkYXRhLXNldHVwIGF0dHIgZXhpc3RzLlxyXG4gICAgICAgICAgLy8gV2Ugb25seSBhdXRvLXNldHVwIGlmIHRoZXkndmUgYWRkZWQgdGhlIGRhdGEtc2V0dXAgYXR0ci5cclxuICAgICAgICAgIGlmIChvcHRpb25zICE9PSBudWxsKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBQYXJzZSBvcHRpb25zIEpTT05cclxuICAgICAgICAgICAgLy8gSWYgZW1wdHkgc3RyaW5nLCBtYWtlIGl0IGEgcGFyc2FibGUganNvbiBvYmplY3QuXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSB2anMuSlNPTi5wYXJzZShvcHRpb25zIHx8ICd7fScpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ3JlYXRlIG5ldyB2aWRlby5qcyBpbnN0YW5jZS5cclxuICAgICAgICAgICAgcGxheWVyID0gdmlkZW9qcyh2aWQsIG9wdGlvbnMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIGdldEF0dHJpYnV0ZSBpc24ndCBkZWZpbmVkLCB3ZSBuZWVkIHRvIHdhaXQgZm9yIHRoZSBET00uXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmpzLmF1dG9TZXR1cFRpbWVvdXQoMSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgLy8gTm8gdmlkZW9zIHdlcmUgZm91bmQsIHNvIGtlZXAgbG9vcGluZyB1bmxlc3MgcGFnZSBpcyBmaW5pc2VoZCBsb2FkaW5nLlxyXG4gIH0gZWxzZSBpZiAoIXZqcy53aW5kb3dMb2FkZWQpIHtcclxuICAgIHZqcy5hdXRvU2V0dXBUaW1lb3V0KDEpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIFBhdXNlIHRvIGxldCB0aGUgRE9NIGtlZXAgcHJvY2Vzc2luZ1xyXG52anMuYXV0b1NldHVwVGltZW91dCA9IGZ1bmN0aW9uKHdhaXQpe1xyXG4gIHNldFRpbWVvdXQodmpzLmF1dG9TZXR1cCwgd2FpdCk7XHJcbn07XHJcblxyXG5pZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJykge1xyXG4gIHZqcy53aW5kb3dMb2FkZWQgPSB0cnVlO1xyXG59IGVsc2Uge1xyXG4gIHZqcy5vbmUod2luZG93LCAnbG9hZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICB2anMud2luZG93TG9hZGVkID0gdHJ1ZTtcclxuICB9KTtcclxufVxyXG5cclxuLy8gUnVuIEF1dG8tbG9hZCBwbGF5ZXJzXHJcbi8vIFlvdSBoYXZlIHRvIHdhaXQgYXQgbGVhc3Qgb25jZSBpbiBjYXNlIHRoaXMgc2NyaXB0IGlzIGxvYWRlZCBhZnRlciB5b3VyIHZpZGVvIGluIHRoZSBET00gKHdlaXJkIGJlaGF2aW9yIG9ubHkgd2l0aCBtaW5pZmllZCB2ZXJzaW9uKVxyXG52anMuYXV0b1NldHVwVGltZW91dCgxKTtcclxuLyoqXHJcbiAqIHRoZSBtZXRob2QgZm9yIHJlZ2lzdGVyaW5nIGEgdmlkZW8uanMgcGx1Z2luXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgcGx1Z2luXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBpbml0IFRoZSBmdW5jdGlvbiB0aGF0IGlzIHJ1biB3aGVuIHRoZSBwbGF5ZXIgaW5pdHNcclxuICovXHJcbnZqcy5wbHVnaW4gPSBmdW5jdGlvbihuYW1lLCBpbml0KXtcclxuICB2anMuUGxheWVyLnByb3RvdHlwZVtuYW1lXSA9IGluaXQ7XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL3BsYXllci92aWRlby5kZXYuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDRcbiAqKi8iLCIvKipcclxuIOKWiOKWkuKWk+KWkuKWkSBUaGUgRmxleFBhcGVyIFByb2plY3RcclxuXHJcbiBUaGlzIGZpbGUgaXMgcGFydCBvZiBGbGV4UGFwZXIuXHJcblxyXG4gRmxleFBhcGVyIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcclxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XHJcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UuXHJcblxyXG4gRmxleFBhcGVyIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXHJcbiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxyXG4gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxyXG4gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cclxuXHJcbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxyXG4gYWxvbmcgd2l0aCBGbGV4UGFwZXIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXHJcblxyXG4gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gRmxleFBhcGVyIHBsZWFzZSBzZWUgdGhlIEZsZXhQYXBlciBwcm9qZWN0XHJcbiBob21lIHBhZ2U6IGh0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb21cclxuICovXHJcblxyXG4vKipcclxuICpcclxuICogRmxleFBhcGVyIGhlbHBlciBmdW5jdGlvbiBmb3IgcmV0cmlldmluZyBhIGFjdGl2ZSBGbGV4UGFwZXIgaW5zdGFuY2VcclxuICpcclxuICovXHJcbndpbmRvdy4kRmxleFBhcGVyID0gd2luZG93LmdldERvY1ZpZXdlciA9IHdpbmRvd1tcIiRGbGV4UGFwZXJcIl0gPSBmdW5jdGlvbihpZCl7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSAoaWQ9PT1cInVuZGVmaW5lZFwiKT9cIlwiOmlkO1xyXG5cclxuICAgIHJldHVybiB3aW5kb3dbXCJGbGV4UGFwZXJWaWV3ZXJfSW5zdGFuY2VcIitpbnN0YW5jZV0uZ2V0QXBpKCk7XHJcbn07XHJcblxyXG4vKipcclxuICpcclxuICogRmxleFBhcGVyIGVtYmVkZGluZyAobmFtZSBvZiBwbGFjZWhvbGRlciwgY29uZmlnKVxyXG4gKlxyXG4gKi9cclxud2luZG93LkZsZXhQYXBlclZpZXdlckVtYmVkZGluZyA9IHdpbmRvdy4kZiA9IGZ1bmN0aW9uKGlkLCBhcmdzKSB7XHJcbiAgICB2YXIgY29uZmlnID0gYXJncy5jb25maWc7XHJcbiAgICB2YXIgX1NXRkZpbGUsX1BERkZpbGUsX0lNR0ZpbGVzLF9KU09ORmlsZSAgPSBcIlwiLF9qc0RpcmVjdG9yeT1cIlwiLF9jc3NEaXJlY3Rvcnk9XCJcIixfbG9jYWxlRGlyZWN0b3J5PVwiXCI7X1dNb2RlID0gKGNvbmZpZy5XTW9kZSE9bnVsbHx8Y29uZmlnLndtbW9kZSE9bnVsbD9jb25maWcud21tb2RlfHxjb25maWcuV01vZGU6XCJ3aW5kb3dcIik7XHJcbiAgICB2YXIgX3VEb2MgPSAoKGNvbmZpZy5ET0MgIT1udWxsKT91bmVzY2FwZShjb25maWcuRE9DKTpudWxsKTtcclxuICAgIHZhciBpbnN0YW5jZSA9IFwiRmxleFBhcGVyVmlld2VyX0luc3RhbmNlXCIrKChpZD09PVwidW5kZWZpbmVkXCIpP1wiXCI6aWQpO1xyXG4gICAgdmFyIF9KU09ORGF0YVR5cGUgPSAoY29uZmlnLkpTT05EYXRhVHlwZSE9bnVsbCk/Y29uZmlnLkpTT05EYXRhVHlwZTpcImpzb25cIjtcclxuXHJcbiAgICBpZiAoX3VEb2MgIT0gbnVsbCkge1xyXG4gICAgICAgIF9TV0ZGaWxlIFx0PSBGTEVYUEFQRVIudHJhbnNsYXRlVXJsQnlGb3JtYXQoX3VEb2MsXCJzd2ZcIik7XHJcbiAgICB9XHJcblxyXG4gICAgX1NXRkZpbGUgIFx0XHRcdD0gKGNvbmZpZy5Td2ZGaWxlIT1udWxsP2NvbmZpZy5Td2ZGaWxlOl9TV0ZGaWxlKTtcclxuICAgIF9TV0ZGaWxlICBcdFx0XHQ9IChjb25maWcuU1dGRmlsZSE9bnVsbD9jb25maWcuU1dGRmlsZTpfU1dGRmlsZSk7XHJcbiAgICBfUERGRmlsZSBcdFx0XHQ9IChjb25maWcuUERGRmlsZSE9bnVsbD9jb25maWcuUERGRmlsZTpfUERGRmlsZSk7XHJcbiAgICBfSU1HRmlsZXMgXHRcdFx0PSAoY29uZmlnLklNR0ZpbGVzIT1udWxsP2NvbmZpZy5JTUdGaWxlczpfSU1HRmlsZXMpO1xyXG4gICAgX0lNR0ZpbGVzIFx0XHRcdD0gKGNvbmZpZy5QYWdlSW1hZ2VQYXR0ZXJuIT1udWxsP2NvbmZpZy5QYWdlSW1hZ2VQYXR0ZXJuOl9JTUdGaWxlcyk7XHJcbiAgICBfSlNPTkZpbGUgXHRcdFx0PSAoY29uZmlnLkpTT05GaWxlIT1udWxsP2NvbmZpZy5KU09ORmlsZTpfSlNPTkZpbGUpO1xyXG4gICAgX2pzRGlyZWN0b3J5IFx0XHQ9IChjb25maWcuanNEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmpzRGlyZWN0b3J5OlwianMvXCIpO1xyXG4gICAgX2Nzc0RpcmVjdG9yeSBcdFx0PSAoY29uZmlnLmNzc0RpcmVjdG9yeSE9bnVsbD9jb25maWcuY3NzRGlyZWN0b3J5OlwiY3NzL1wiKTtcclxuICAgIF9sb2NhbGVEaXJlY3RvcnkgXHQ9IChjb25maWcubG9jYWxlRGlyZWN0b3J5IT1udWxsP2NvbmZpZy5sb2NhbGVEaXJlY3Rvcnk6XCJsb2NhbGUvXCIpO1xyXG4gICAgaWYoX1NXRkZpbGUhPW51bGwgJiYgX1NXRkZpbGUuaW5kZXhPZihcIntcIiApPT0wICYmIF9TV0ZGaWxlLmluZGV4T2YoXCJbKixcIiApID4gMCAmJiBfU1dGRmlsZS5pbmRleE9mKFwiXVwiICkgPiAwKXtfU1dGRmlsZSA9IGVzY2FwZShfU1dGRmlsZSk7fSAvLyBzcGxpdCBmaWxlIGZpeFxyXG5cclxuICAgIHdpbmRvd1tpbnN0YW5jZV0gPSBmbGFzaGVtYmVkKGlkLCB7XHJcbiAgICAgICAgc3JjXHRcdFx0XHRcdFx0ICAgIDogX2pzRGlyZWN0b3J5K1wiLi9GbGV4UGFwZXJWaWV3ZXIuc3dmXCIsXHJcbiAgICAgICAgdmVyc2lvblx0XHRcdFx0XHQgICAgOiBbMTAsIDBdLFxyXG4gICAgICAgIGV4cHJlc3NJbnN0YWxsXHRcdFx0ICAgIDogXCJqcy9leHByZXNzaW5zdGFsbC5zd2ZcIixcclxuICAgICAgICB3bW9kZVx0XHRcdFx0XHQgICAgOiBfV01vZGVcclxuICAgIH0se1xyXG4gICAgICAgIEVsZW1lbnRJZCAgICAgICAgICAgICAgIDogaWQsXHJcbiAgICAgICAgU3dmRmlsZSAgXHRcdFx0XHQ6IF9TV0ZGaWxlLFxyXG4gICAgICAgIFBkZkZpbGUgIFx0XHRcdFx0OiBfUERGRmlsZSxcclxuICAgICAgICBJTUdGaWxlcyAgXHRcdFx0XHQ6IF9JTUdGaWxlcyxcclxuICAgICAgICBKU09ORmlsZSBcdFx0XHRcdDogX0pTT05GaWxlLFxyXG4gICAgICAgIHVzZUN1c3RvbUpTT05Gb3JtYXQgXHQ6IGNvbmZpZy51c2VDdXN0b21KU09ORm9ybWF0LFxyXG4gICAgICAgIEpTT05QYWdlRGF0YUZvcm1hdCBcdFx0OiBjb25maWcuSlNPTlBhZ2VEYXRhRm9ybWF0LFxyXG4gICAgICAgIEpTT05EYXRhVHlwZSBcdFx0XHQ6IF9KU09ORGF0YVR5cGUsXHJcbiAgICAgICAgU2NhbGUgXHRcdFx0XHRcdDogKGNvbmZpZy5TY2FsZSE9bnVsbCk/Y29uZmlnLlNjYWxlOjAuOCxcclxuICAgICAgICBab29tVHJhbnNpdGlvbiBcdFx0XHQ6IChjb25maWcuWm9vbVRyYW5zaXRpb24hPW51bGwpP2NvbmZpZy5ab29tVHJhbnNpdGlvbjonZWFzZU91dCcsXHJcbiAgICAgICAgWm9vbVRpbWUgXHRcdFx0XHQ6IChjb25maWcuWm9vbVRpbWUhPW51bGwpP2NvbmZpZy5ab29tVGltZTowLjUsXHJcbiAgICAgICAgWm9vbUludGVydmFsIFx0XHRcdDogKGNvbmZpZy5ab29tSW50ZXJ2YWwpP2NvbmZpZy5ab29tSW50ZXJ2YWw6MC4yLFxyXG4gICAgICAgIEZpdFBhZ2VPbkxvYWQgXHRcdFx0OiAoY29uZmlnLkZpdFBhZ2VPbkxvYWQhPW51bGwpP2NvbmZpZy5GaXRQYWdlT25Mb2FkOmZhbHNlLFxyXG4gICAgICAgIEZpdFdpZHRoT25Mb2FkIFx0XHRcdDogKGNvbmZpZy5GaXRXaWR0aE9uTG9hZCE9bnVsbCk/Y29uZmlnLkZpdFdpZHRoT25Mb2FkOmZhbHNlLFxyXG4gICAgICAgIEZ1bGxTY3JlZW5Bc01heFdpbmRvdyBcdDogKGNvbmZpZy5GdWxsU2NyZWVuQXNNYXhXaW5kb3chPW51bGwpP2NvbmZpZy5GdWxsU2NyZWVuQXNNYXhXaW5kb3c6ZmFsc2UsXHJcbiAgICAgICAgUHJvZ3Jlc3NpdmVMb2FkaW5nIFx0XHQ6IChjb25maWcuUHJvZ3Jlc3NpdmVMb2FkaW5nIT1udWxsKT9jb25maWcuUHJvZ3Jlc3NpdmVMb2FkaW5nOmZhbHNlLFxyXG4gICAgICAgIE1pblpvb21TaXplIFx0XHRcdDogKGNvbmZpZy5NaW5ab29tU2l6ZSE9bnVsbCk/Y29uZmlnLk1pblpvb21TaXplOjAuMixcclxuICAgICAgICBNYXhab29tU2l6ZSBcdFx0XHQ6IChjb25maWcuTWF4Wm9vbVNpemUhPW51bGwpP2NvbmZpZy5NYXhab29tU2l6ZTo1LFxyXG4gICAgICAgIFNlYXJjaE1hdGNoQWxsIFx0XHRcdDogKGNvbmZpZy5TZWFyY2hNYXRjaEFsbCE9bnVsbCk/Y29uZmlnLlNlYXJjaE1hdGNoQWxsOmZhbHNlLFxyXG4gICAgICAgIFNlYXJjaFNlcnZpY2VVcmwgXHRcdDogY29uZmlnLlNlYXJjaFNlcnZpY2VVcmwsXHJcbiAgICAgICAgSW5pdFZpZXdNb2RlIFx0XHRcdDogY29uZmlnLkluaXRWaWV3TW9kZSxcclxuICAgICAgICBCaXRtYXBCYXNlZFJlbmRlcmluZyBcdDogKGNvbmZpZy5CaXRtYXBCYXNlZFJlbmRlcmluZyE9bnVsbCk/Y29uZmlnLkJpdG1hcEJhc2VkUmVuZGVyaW5nOmZhbHNlLFxyXG4gICAgICAgIFN0YXJ0QXRQYWdlIFx0XHRcdDogY29uZmlnLlN0YXJ0QXRQYWdlLFxyXG4gICAgICAgIFByaW50UGFwZXJBc0JpdG1hcFx0XHQ6IChjb25maWcuUHJpbnRQYXBlckFzQml0bWFwIT1udWxsKT9jb25maWcuUHJpbnRQYXBlckFzQml0bWFwOmZhbHNlLFxyXG4gICAgICAgIEF1dG9BZGp1c3RQcmludFNpemVcdFx0OiAoY29uZmlnLkF1dG9BZGp1c3RQcmludFNpemUhPW51bGwpP2NvbmZpZy5BdXRvQWRqdXN0UHJpbnRTaXplOmZhbHNlLFxyXG5cclxuICAgICAgICBFbmFibGVDb3JuZXJEcmFnZ2luZyBcdDogKChjb25maWcuRW5hYmxlQ29ybmVyRHJhZ2dpbmchPW51bGwpP2NvbmZpZy5FbmFibGVDb3JuZXJEcmFnZ2luZzp0cnVlKSwgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXHJcbiAgICAgICAgQmFja2dyb3VuZENvbG9yIFx0XHQ6IGNvbmZpZy5CYWNrZ3JvdW5kQ29sb3IsIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxyXG4gICAgICAgIFBhbmVsQ29sb3IgXHRcdFx0XHQ6IGNvbmZpZy5QYW5lbENvbG9yLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcclxuICAgICAgICBCYWNrZ3JvdW5kQWxwaGEgICAgICAgICA6IGNvbmZpZy5CYWNrZ3JvdW5kQWxwaGEsIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxyXG4gICAgICAgIFVJQ29uZmlnICAgICAgICAgICAgICAgIDogY29uZmlnLlVJQ29uZmlnLCAgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXHJcblxyXG4gICAgICAgIFZpZXdNb2RlVG9vbHNWaXNpYmxlIFx0OiAoKGNvbmZpZy5WaWV3TW9kZVRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLlZpZXdNb2RlVG9vbHNWaXNpYmxlOnRydWUpLFxyXG4gICAgICAgIFpvb21Ub29sc1Zpc2libGUgXHRcdDogKChjb25maWcuWm9vbVRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLlpvb21Ub29sc1Zpc2libGU6dHJ1ZSksXHJcbiAgICAgICAgTmF2VG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLk5hdlRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLk5hdlRvb2xzVmlzaWJsZTp0cnVlKSxcclxuICAgICAgICBDdXJzb3JUb29sc1Zpc2libGUgXHRcdDogKChjb25maWcuU2VhcmNoVG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuQ3Vyc29yVG9vbHNWaXNpYmxlOnRydWUpLFxyXG4gICAgICAgIFNlYXJjaFRvb2xzVmlzaWJsZSBcdFx0OiAoKGNvbmZpZy5TZWFyY2hUb29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5TZWFyY2hUb29sc1Zpc2libGU6dHJ1ZSksXHJcbiAgICAgICAgU3RpY2t5VG9vbHNcdFx0XHRcdDogY29uZmlnLlN0aWNreVRvb2xzLFxyXG4gICAgICAgIFRvb2xiYXIgICAgICAgICAgICAgICAgIDogY29uZmlnLlRvb2xiYXIsXHJcbiAgICAgICAgRG9jU2l6ZVF1ZXJ5U2VydmljZSBcdDogY29uZmlnLkRvY1NpemVRdWVyeVNlcnZpY2UsXHJcblxyXG4gICAgICAgIFJlbmRlcmluZ09yZGVyIFx0XHRcdDogY29uZmlnLlJlbmRlcmluZ09yZGVyLFxyXG5cclxuICAgICAgICBsb2NhbGVDaGFpbiBcdFx0XHQ6IChjb25maWcubG9jYWxlQ2hhaW4hPW51bGwpP2NvbmZpZy5sb2NhbGVDaGFpbjpcImVuX1VTXCIsXHJcbiAgICAgICAganNEaXJlY3RvcnkgXHRcdFx0OiBfanNEaXJlY3RvcnksXHJcbiAgICAgICAgY3NzRGlyZWN0b3J5IFx0XHRcdDogX2Nzc0RpcmVjdG9yeSxcclxuICAgICAgICBsb2NhbGVEaXJlY3RvcnlcdFx0XHQ6IF9sb2NhbGVEaXJlY3RvcnksXHJcbiAgICAgICAga2V5IFx0XHRcdFx0XHQ6IGNvbmZpZy5rZXlcclxuICAgIH0pO1xyXG59O1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYoIXdpbmRvdy5GTEVYUEFQRVIpe3dpbmRvdy5GTEVYUEFQRVIgPSB7fTt9XHJcblxyXG4gICAgRkxFWFBBUEVSLmdldExvY2F0aW9uSGFzaFBhcmFtZXRlciA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuICAgICAgICB2YXIgaGFzaCA9IGxvY2F0aW9uLmhhc2guc3Vic3RyKDEpO1xyXG5cclxuICAgICAgICBpZihoYXNoLmluZGV4T2YocGFyYW0rJz0nKT49MCl7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGhhc2guc3Vic3RyKGhhc2guaW5kZXhPZihwYXJhbSsnPScpKVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KCcmJylbMF1cclxuICAgICAgICAgICAgICAgIC5zcGxpdCgnPScpWzFdO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9O1xyXG5cclxuICAgIEZMRVhQQVBFUi50cmFuc2xhdGVVcmxCeUZvcm1hdCA9IGZ1bmN0aW9uKHVybCxmb3JtYXQpe1xyXG4gICAgICAgIGlmKHVybC5pbmRleE9mKFwie1wiKSA9PSAwICYmIGZvcm1hdCAhPSBcInN3ZlwiKXsgLy8gbG9hZGluZyBpbiBzcGxpdCBmaWxlIG1vZGVcclxuICAgICAgICAgICAgdXJsID0gdXJsLnN1YnN0cmluZygxLHVybC5sYXN0SW5kZXhPZihcIixcIikpO1xyXG4gICAgICAgICAgICB1cmwgPSB1cmwucmVwbGFjZShcIlsqLDBdXCIsXCJ7cGFnZX1cIilcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh1cmwhPW51bGwgJiYgdXJsLmluZGV4T2YoJ3tmb3JtYXR9JykgPiAwID8gdXJsLnJlcGxhY2UoXCJ7Zm9ybWF0fVwiLCBmb3JtYXQpOm51bGwpO1xyXG4gICAgfTtcclxuXHJcbiAgICBGTEVYUEFQRVIuYW5pbWF0ZURlbnlFZmZlY3QgPSBmdW5jdGlvbihvYmosbWFyZ2luLHRpbWUsY3ljbGVzLGRpcikge1xyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIHZhciBzcGVlZCA9IHRpbWUgLyAoKDIqY3ljbGVzKSsxKTtcclxuICAgICAgICAgICAgdmFyIG1hcmdSYXQgPSAxICsgKDYwLyhjeWNsZXMqY3ljbGVzKSk7ICQob2JqKS5zdG9wKHRydWUsdHJ1ZSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGk9MDsgaTw9Y3ljbGVzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGo9LTE7IGo8PTE7IGorPTIpXHJcbiAgICAgICAgICAgICAgICAgICAgJChvYmopLmFuaW1hdGUoe21hcmdpbkxlZnQ6IChpIT1jeWNsZXMpKmoqbWFyZ2lufSx7ZHVyYXRpb246c3BlZWQsIHF1ZXVlOnRydWV9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBtYXJnaW4vPW1hcmdSYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LDUwMCk7XHJcbiAgICB9O1xyXG5cclxuICAgIEZMRVhQQVBFUi5pbml0TG9naW5Gb3JtID0gZnVuY3Rpb24gaW5pdExvZ2luRm9ybShJTUdGaWxlcyxhbmltYXRlKXtcclxuICAgICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuY3NzKCdiYWNrZ3JvdW5kLWNvbG9yJywnI2RlZGVkZScpO1xyXG5cclxuICAgICAgICB2YXIgaW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgalF1ZXJ5KGltZykuYmluZCgnbG9hZCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmFwcGVuZChcclxuICAgICAgICAgICAgICAgIFwiPGRpdiBpZD0nbG9naW5Gb3JtJz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxmb3JtIGNsYXNzPSdmbGV4cGFwZXJfaHRtbGRpYWxvZycgbWV0aG9kPSdQT1NUJyBzdHlsZT0nZGlzcGxheTpub25lO3RvcDoxMDBweDttYXJnaW46XCIrKChqUXVlcnkod2luZG93KS5oZWlnaHQoKT41MDApP1wiNTBweCBhdXRvXCI6XCIwcHggYXV0b1wiKStcIic+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdmbGV4cGFwZXJfcHVibGljYXRpb25zIGZsZXhwYXBlcl9wdWJsaWNhdGlvbl9jc3N0cmFuc2Zvcm1zM2QnIHN0eWxlPSdvdmVyZmxvdy15OmhpZGRlbjtvdmVyZmxvdy14OmhpZGRlbjt0ZXh0LWFsaWduOmNlbnRlcjtiYWNrZ3JvdW5kOiAjZjdmN2Y3O21hcmdpbjogLTI1cHggLTI1cHggMHB4O3BhZGRpbmc6IDE1cHggMjVweCAwcHggMjVweDsnPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZmxleHBhcGVyX3B1YmxpY2F0aW9uIGZsZXhwYXBlcl9wdWJsaWNhdGlvbl9jc3N0cmFuc2Zvcm1zM2QnIGlkPSdmbGV4cGFwZXJfcHVibGljYXRpb24xJz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxpbWcgc3JjPSdcIisoSU1HRmlsZXMucmVwbGFjZShcIntwYWdlfVwiLDEpKStcIicgLz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiK1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBcIjxoMSBjbGFzcz0nZmxleHBhcGVyX2h0bWxkaWFsb2ctdGl0bGUnPnBhc3N3b3JkIHByb3RlY3RlZCBwdWJsaWNhdGlvbjwvaDE+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZT0ncGFzc3dvcmQnIGlkPSd0eHRfZmxleHBhcGVyX3Bhc3N3b3JkJyBuYW1lPSd0eHRfZmxleHBhcGVyX3Bhc3N3b3JkJyBjbGFzcz0nZmxleHBhcGVyX2h0bWxkaWFsb2ctaW5wdXQnIHBsYWNlaG9sZGVyPSdFbnRlciBwYXNzd29yZCc+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZT0nc3VibWl0JyB2YWx1ZT0nU3VibWl0JyBjbGFzcz0nZmxleHBhcGVyX2h0bWxkaWFsb2ctYnV0dG9uJz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9mb3JtPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCJcclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIHZhciBhbmltX2R1cmF0aW9uID0gYW5pbWF0ZT8xMDAwOjA7XHJcbiAgICAgICAgICAgIHZhciBhbmltX2hlaWdodF9kdXIgPSBhbmltYXRlP2FuaW1fZHVyYXRpb24vMzowO1xyXG4gICAgICAgICAgICB2YXIgdGhlaWdodCA9IDQwMDtcclxuXHJcbiAgICAgICAgICAgIGpRdWVyeSgnLmZsZXhwYXBlcl9odG1sZGlhbG9nJykuY3NzKHtoZWlnaHQgOiAnMHB4JywgZGlzcGxheSA6ICdibG9jayd9KTtcclxuICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5hbmltYXRlKHsnaGVpZ2h0JzogdGhlaWdodCsncHgnLCd0b3AnOicwcHgnfSx7ZHVyYXRpb246IGFuaW1faGVpZ2h0X2R1ciwgY29tcGxldGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfaHRtbGRpYWxvZycpLmNzcyh7J2hlaWdodCcgOiAnJ30pOyAvLyByZW1vdmUgaGVpZ2h0IGF0dHJpYnV0ZSB0byBmaXQgcHVibGljYXRpb25cclxuXHJcbiAgICAgICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfcHVibGljYXRpb24nKS5hbmltYXRlKHtvcGFjaXR5OjF9LHtcclxuICAgICAgICAgICAgICAgICAgICBzdGVwIDogZnVuY3Rpb24obm93LGZ4KXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IC03O3ZhciBvcGFjaXR5ZnJvbSA9IC00MDt2YXIgZGlmZiA9IG9wYWNpdHlmcm9tIC0gdGFyZ2V0O3ZhciByb3RhdGUgPSAoZGlmZiAqIG5vdyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfcHVibGljYXRpb24nKS5jc3Moe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtJyA6ICdwZXJzcGVjdGl2ZSgzMDApIHJvdGF0ZVkoJysob3BhY2l0eWZyb20gLSByb3RhdGUpKydkZWcpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctbW96LXRyYW5zZm9ybScgOiAncm90YXRlWSgnKyhvcGFjaXR5ZnJvbSAtIHJvdGF0ZSkrJ2RlZyknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2JveC1zaGFkb3cnIDogJzVweCA1cHggMjBweCByZ2JhKDUxLCA1MSwgNTEsICcrbm93KycpJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOmFuaW1fZHVyYXRpb25cclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfX0pO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgICAgICBpbWcuc3JjID0gKElNR0ZpbGVzLnJlcGxhY2UoXCJ7cGFnZX1cIiwxKSk7XHJcbiAgICB9O1xyXG59KSgpO1xyXG5cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBGbGV4UGFwZXIgZW1iZWRkaW5nIGZ1bmN0aW9uYWxpdHkuIEJhc2VkIG9uIEZsYXNoRW1iZWRcclxuICpcclxuICovXHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgdmFyICBJRSA9IGRvY3VtZW50LmFsbCxcclxuICAgICAgICBVUkwgPSAnaHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInLFxyXG4gICAgICAgIEpRVUVSWSA9IHR5cGVvZiBqUXVlcnkgPT0gJ2Z1bmN0aW9uJyxcclxuICAgICAgICBSRSA9IC8oXFxkKylbXlxcZF0rKFxcZCspW15cXGRdKihcXGQqKS8sXHJcbiAgICAgICAgTU9CSUxFID0gKGZ1bmN0aW9uKCl7dHJ5IHtyZXR1cm4gJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O30gY2F0Y2ggKGUpIHtyZXR1cm4gZmFsc2U7fSB9KSgpLFxyXG4gICAgICAgIEdMT0JBTF9PUFRTID0ge1xyXG4gICAgICAgICAgICAvLyB2ZXJ5IGNvbW1vbiBvcHRzXHJcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXHJcbiAgICAgICAgICAgIGhlaWdodDogJzEwMCUnLFxyXG4gICAgICAgICAgICBpZDogXCJfXCIgKyAoXCJcIiArIE1hdGgucmFuZG9tKCkpLnNsaWNlKDkpLFxyXG5cclxuICAgICAgICAgICAgLy8gZmxhc2hlbWJlZCBkZWZhdWx0c1xyXG4gICAgICAgICAgICBhbGxvd2Z1bGxzY3JlZW46IHRydWUsXHJcbiAgICAgICAgICAgIGFsbG93c2NyaXB0YWNjZXNzOiAnYWx3YXlzJyxcclxuICAgICAgICAgICAgcXVhbGl0eTogJ2hpZ2gnLFxyXG4gICAgICAgICAgICBhbGxvd0Z1bGxTY3JlZW5JbnRlcmFjdGl2ZSA6IHRydWUsXHJcblxyXG4gICAgICAgICAgICAvLyBmbGFzaGVtYmVkIHNwZWNpZmljIG9wdGlvbnNcclxuICAgICAgICAgICAgdmVyc2lvbjogWzEwLCAwXSxcclxuICAgICAgICAgICAgb25GYWlsOiBudWxsLFxyXG4gICAgICAgICAgICBleHByZXNzSW5zdGFsbDogbnVsbCxcclxuICAgICAgICAgICAgdzNjOiBmYWxzZSxcclxuICAgICAgICAgICAgY2FjaGVidXN0aW5nOiBmYWxzZVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgd2luZG93LmlzVG91Y2hTY3JlZW4gPSBNT0JJTEU7XHJcblxyXG4gICAgaWYgKHdpbmRvdy5hdHRhY2hFdmVudCkge1xyXG4gICAgICAgIHdpbmRvdy5hdHRhY2hFdmVudChcIm9uYmVmb3JldW5sb2FkXCIsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBfX2ZsYXNoX3VubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgICAgICBfX2ZsYXNoX3NhdmVkVW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2ltcGxlIGV4dGVuZFxyXG4gICAgZnVuY3Rpb24gZXh0ZW5kKHRvLCBmcm9tKSB7XHJcbiAgICAgICAgaWYgKGZyb20pIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGZyb20pIHtcclxuICAgICAgICAgICAgICAgIGlmIChmcm9tLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b1trZXldID0gZnJvbVtrZXldO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0bztcclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VkIGJ5IEZsYXNoIHRvIGRpc3BhdGNoIGEgZXZlbnQgcHJvcGVybHlcclxuICAgIHdpbmRvdy5kaXNwYXRjaEpRdWVyeUV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnRJZCxldmVudE5hbWUsYXJncyl7XHJcbiAgICAgICAgalF1ZXJ5KCcjJytlbGVtZW50SWQpLnRyaWdnZXIoZXZlbnROYW1lLGFyZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVzZWQgYnkgYXNTdHJpbmcgbWV0aG9kXHJcbiAgICBmdW5jdGlvbiBtYXAoYXJyLCBmdW5jKSB7XHJcbiAgICAgICAgdmFyIG5ld0FyciA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgaW4gYXJyKSB7XHJcbiAgICAgICAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoaSkpIHtcclxuICAgICAgICAgICAgICAgIG5ld0FycltpXSA9IGZ1bmMoYXJyW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3QXJyO1xyXG4gICAgfVxyXG5cclxuICAgIHdpbmRvdy5mbGFzaGVtYmVkID0gZnVuY3Rpb24ocm9vdCwgb3B0cywgY29uZikge1xyXG4gICAgICAgIC8vIHJvb3QgbXVzdCBiZSBmb3VuZCAvIGxvYWRlZFxyXG4gICAgICAgIGlmICh0eXBlb2Ygcm9vdCA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocm9vdC5yZXBsYWNlKFwiI1wiLCBcIlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBub3QgZm91bmRcclxuICAgICAgICBpZiAoIXJvb3QpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHJvb3Qub25jbGljayA9IGZ1bmN0aW9uKCl7cmV0dXJuIGZhbHNlO31cclxuXHJcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRzID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIG9wdHMgPSB7c3JjOiBvcHRzfTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgRmxhc2gocm9vdCwgZXh0ZW5kKGV4dGVuZCh7fSwgR0xPQkFMX09QVFMpLCBvcHRzKSwgY29uZik7XHJcbiAgICB9O1xyXG5cclxuICAgIC8vIGZsYXNoZW1iZWQgXCJzdGF0aWNcIiBBUElcclxuICAgIHZhciBmID0gZXh0ZW5kKHdpbmRvdy5mbGFzaGVtYmVkLCB7XHJcblxyXG4gICAgICAgIGNvbmY6IEdMT0JBTF9PUFRTLFxyXG5cclxuICAgICAgICBnZXRWZXJzaW9uOiBmdW5jdGlvbigpICB7XHJcbiAgICAgICAgICAgIHZhciBmbywgdmVyO1xyXG5cclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHZlciA9IG5hdmlnYXRvci5wbHVnaW5zW1wiU2hvY2t3YXZlIEZsYXNoXCJdLmRlc2NyaXB0aW9uLnNsaWNlKDE2KTtcclxuICAgICAgICAgICAgfSBjYXRjaChlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgdHJ5ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgZm8gPSBuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoLjdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgdmVyID0gZm8gJiYgZm8uR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICB9IGNhdGNoKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeSAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmbyA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2guNlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmVyID0gZm8gJiYgZm8uR2V0VmFyaWFibGUoXCIkdmVyc2lvblwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoKGVycjIpIHsgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB2ZXIgPSBSRS5leGVjKHZlcik7XHJcbiAgICAgICAgICAgIHJldHVybiB2ZXIgPyBbdmVyWzFdLCB2ZXJbM11dIDogWzAsIDBdO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGFzU3RyaW5nOiBmdW5jdGlvbihvYmopIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChvYmogPT09IG51bGwgfHwgb2JqID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgICAgICAgICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xyXG4gICAgICAgICAgICBpZiAodHlwZSA9PSAnb2JqZWN0JyAmJiBvYmoucHVzaCkgeyB0eXBlID0gJ2FycmF5JzsgfVxyXG5cclxuICAgICAgICAgICAgc3dpdGNoICh0eXBlKXtcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IG9iai5yZXBsYWNlKG5ldyBSZWdFeHAoJyhbXCJcXFxcXFxcXF0pJywgJ2cnKSwgJ1xcXFwkMScpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBmbGFzaCBkb2VzIG5vdCBoYW5kbGUgJS0gY2hhcmFjdGVycyB3ZWxsLiB0cmFuc2Zvcm1zIFwiNTAlXCIgdG8gXCI1MHBjdFwiIChhIGRpcnR5IGhhY2ssIEkgYWRtaXQpXHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqLnJlcGxhY2UoL15cXHM/KFxcZCtcXC4/XFxkKyklLywgXCIkMXBjdFwiKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1wiJyArb2JqKyAnXCInO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1snKyBtYXAob2JqLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZi5hc1N0cmluZyhlbCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignLCcpICsnXSc7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnZnVuY3Rpb24nOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnXCJmdW5jdGlvbigpXCInO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ29iamVjdCc6XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0ciA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkocHJvcCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0ci5wdXNoKCdcIicrcHJvcCsnXCI6JysgZi5hc1N0cmluZyhvYmpbcHJvcF0pKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3snK3N0ci5qb2luKCcsJykrJ30nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyByZXBsYWNlICcgLS0+IFwiICBhbmQgcmVtb3ZlIHNwYWNlc1xyXG4gICAgICAgICAgICByZXR1cm4gU3RyaW5nKG9iaikucmVwbGFjZSgvXFxzL2csIFwiIFwiKS5yZXBsYWNlKC9cXCcvZywgXCJcXFwiXCIpO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGdldEhUTUw6IGZ1bmN0aW9uKG9wdHMsIGNvbmYpIHtcclxuXHJcbiAgICAgICAgICAgIG9wdHMgPSBleHRlbmQoe30sIG9wdHMpO1xyXG4gICAgICAgICAgICBvcHRzLmlkID0gb3B0cy5pZCArIChcIiBcIiArIE1hdGgucmFuZG9tKCkpLnNsaWNlKDkpO1xyXG5cclxuICAgICAgICAgICAgLyoqKioqKiogT0JKRUNUIHRhZyBhbmQgaXQncyBhdHRyaWJ1dGVzICoqKioqKiovXHJcbiAgICAgICAgICAgIHZhciBodG1sID0gJzxvYmplY3Qgd2lkdGg9XCInICsgb3B0cy53aWR0aCArXHJcbiAgICAgICAgICAgICAgICAnXCIgaGVpZ2h0PVwiJyArIG9wdHMuaGVpZ2h0ICtcclxuICAgICAgICAgICAgICAgICdcIiBpZD1cIicgKyBvcHRzLmlkICtcclxuICAgICAgICAgICAgICAgICdcIiBuYW1lPVwiJyArIG9wdHMuaWQgKyAnXCInO1xyXG5cclxuICAgICAgICAgICAgaWYgKG9wdHMuY2FjaGVidXN0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBvcHRzLnNyYyArPSAoKG9wdHMuc3JjLmluZGV4T2YoXCI/XCIpICE9IC0xID8gXCImXCIgOiBcIj9cIikgKyBNYXRoLnJhbmRvbSgpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKG9wdHMudzNjIHx8ICFJRSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnIGRhdGE9XCInICtvcHRzLnNyYysgJ1wiIHR5cGU9XCJhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaFwiJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyBjbGFzc2lkPVwiY2xzaWQ6RDI3Q0RCNkUtQUU2RC0xMWNmLTk2QjgtNDQ0NTUzNTQwMDAwXCInO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBodG1sICs9ICc+JztcclxuXHJcbiAgICAgICAgICAgIC8qKioqKioqIG5lc3RlZCBQQVJBTSB0YWdzICoqKioqKiovXHJcbiAgICAgICAgICAgIGlmIChvcHRzLnczYyB8fCBJRSkge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHBhcmFtIG5hbWU9XCJtb3ZpZVwiIHZhbHVlPVwiJyArb3B0cy5zcmMrICdcIiAvPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG5vdCBhbGxvd2VkIHBhcmFtc1xyXG4gICAgICAgICAgICBvcHRzLndpZHRoID0gb3B0cy5oZWlnaHQgPSBvcHRzLmlkID0gb3B0cy53M2MgPSBvcHRzLnNyYyA9IG51bGw7XHJcbiAgICAgICAgICAgIG9wdHMub25GYWlsID0gb3B0cy52ZXJzaW9uID0gb3B0cy5leHByZXNzSW5zdGFsbCA9IG51bGw7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gb3B0cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKG9wdHNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxwYXJhbSBuYW1lPVwiJysga2V5ICsnXCIgdmFsdWU9XCInKyBvcHRzW2tleV0gKydcIiAvPic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8qKioqKioqIEZMQVNIVkFSUyAqKioqKioqL1xyXG4gICAgICAgICAgICB2YXIgdmFycyA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBpZiAoY29uZikge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayBpbiBjb25mKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZba10gJiYgayE9J1Rvb2xiYXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB2YWwgPSBjb25mW2tdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXJzICs9IGsgKyc9JysgKC9mdW5jdGlvbnxvYmplY3QvLnRlc3QodHlwZW9mIHZhbCkgPyBmLmFzU3RyaW5nKHZhbCkgOiB2YWwpICsgJyYnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhcnMgPSB2YXJzLnNsaWNlKDAsIC0xKTtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxwYXJhbSBuYW1lPVwiZmxhc2h2YXJzXCIgdmFsdWU9XFwnJyArIHZhcnMgKyAnXFwnIC8+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaHRtbCArPSBcIjwvb2JqZWN0PlwiO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGh0bWw7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgaXNTdXBwb3J0ZWQ6IGZ1bmN0aW9uKHZlcikge1xyXG4gICAgICAgICAgICByZXR1cm4gVkVSU0lPTlswXSA+IHZlclswXSB8fCBWRVJTSU9OWzBdID09IHZlclswXSAmJiBWRVJTSU9OWzFdID49IHZlclsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgdmFyIFZFUlNJT04gPSBmLmdldFZlcnNpb24oKTtcclxuXHJcbiAgICBmdW5jdGlvbiBGbGFzaChyb290LCBvcHRzLCBjb25mKSB7XHJcbiAgICAgICAgdmFyIHVzZXJBZ2VudCA9IG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICB2YXIgYnJvd3NlciA9IHtcclxuICAgICAgICAgICAgdmVyc2lvbjogKHVzZXJBZ2VudC5tYXRjaCgvLisoPzpydnxpdHxyYXxpZSlbXFwvOiBdKFtcXGQuXSspLykgfHwgW10pWzFdLFxyXG4gICAgICAgICAgICBzYWZhcmk6IC93ZWJraXQvLnRlc3QodXNlckFnZW50KSxcclxuICAgICAgICAgICAgb3BlcmE6IC9vcGVyYS8udGVzdCh1c2VyQWdlbnQpLFxyXG4gICAgICAgICAgICBtc2llOiAvbXNpZS8udGVzdCh1c2VyQWdlbnQpICYmICEvb3BlcmEvLnRlc3QodXNlckFnZW50KSxcclxuICAgICAgICAgICAgbW96aWxsYTogL21vemlsbGEvLnRlc3QodXNlckFnZW50KSAmJiAhLyhjb21wYXRpYmxlfHdlYmtpdCkvLnRlc3QodXNlckFnZW50KSxcclxuICAgICAgICAgICAgY2hyb21lOiAvY2hyb21lLy50ZXN0KHVzZXJBZ2VudClcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBEZWZhdWx0IHRvIGEgcmVuZGVyaW5nIG1vZGUgaWYgaXRzIG5vdCBzZXRcclxuICAgICAgICBpZighY29uZi5SZW5kZXJpbmdPcmRlciAmJiBjb25mLlN3ZkZpbGUgIT0gIG51bGwpe2NvbmYuUmVuZGVyaW5nT3JkZXIgPSBcImZsYXNoXCI7fVxyXG5cclxuICAgICAgICBpZihjb25mLlJlbmRlcmluZ09yZGVyLmluZGV4T2YoJ2h0bWw1Jyk9PTApe1xyXG4gICAgICAgICAgICBpZihjb25maXJtKCdUaGUgRmxleFBhcGVyIEdQTCB2ZXJzaW9uIGRvZXMgbm90IHN1cHBvcnQgSFRNTDUgcmVuZGVyaW5nLiBEbyB5b3Ugd2FudCB0byBuYXZpZ2F0ZSB0byBvdXIgZG93bmxvYWQgcGFnZSBmb3IgbW9yZSBkZXRhaWxzPycpKXtsb2NhdGlvbi5ocmVmPSdodHRwOi8vZmxleHBhcGVyLmRldmFsZGkuY29tL2Rvd25sb2FkLmpzcD9yZWY9RmxleFBhcGVyJ31cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYoY29uZi5SZW5kZXJpbmdPcmRlci5pbmRleE9mKCdodG1sJyk9PTApe1xyXG4gICAgICAgICAgICBpZihjb25maXJtKCdUaGUgRmxleFBhcGVyIEdQTCB2ZXJzaW9uIGRvZXMgbm90IHN1cHBvcnQgSFRNTDQgcmVuZGVyaW5nLiBEbyB5b3Ugd2FudCB0byBuYXZpZ2F0ZSB0byBvdXIgZG93bmxvYWQgcGFnZSBmb3IgbW9yZSBkZXRhaWxzPycpKXtsb2NhdGlvbi5ocmVmPSdodHRwOi8vZmxleHBhcGVyLmRldmFsZGkuY29tL2Rvd25sb2FkLmpzcD9yZWY9RmxleFBhcGVyJ31cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gdmVyc2lvbiBpcyBva1xyXG4gICAgICAgIGlmIChmLmlzU3VwcG9ydGVkKG9wdHMudmVyc2lvbikpIHtcclxuICAgICAgICAgICAgcm9vdC5pbm5lckhUTUwgPSBmLmdldEhUTUwob3B0cywgY29uZik7XHJcblxyXG4gICAgICAgICAgICAvLyBleHByZXNzIGluc3RhbGxcclxuICAgICAgICB9IGVsc2UgaWYgKG9wdHMuZXhwcmVzc0luc3RhbGwgJiYgZi5pc1N1cHBvcnRlZChbNiwgNjVdKSkge1xyXG4gICAgICAgICAgICByb290LmlubmVySFRNTCA9IGYuZ2V0SFRNTChleHRlbmQob3B0cywge3NyYzogb3B0cy5leHByZXNzSW5zdGFsbH0pLCB7XHJcbiAgICAgICAgICAgICAgICBNTXJlZGlyZWN0VVJMOiBsb2NhdGlvbi5ocmVmLFxyXG4gICAgICAgICAgICAgICAgTU1wbGF5ZXJUeXBlOiAnUGx1Z0luJyxcclxuICAgICAgICAgICAgICAgIE1NZG9jdGl0bGU6IGRvY3VtZW50LnRpdGxlXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2UgeyAvL3VzZSBodG1sIHZpZXdlciBvciBkaWVcclxuICAgICAgICAgICAgLy8gZmFpbCAjMi4xIGN1c3RvbSBjb250ZW50IGluc2lkZSBjb250YWluZXJcclxuICAgICAgICAgICAgaWYgKCFyb290LmlubmVySFRNTC5yZXBsYWNlKC9cXHMvZywgJycpKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcGFnZUhvc3QgPSAoKGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID09IFwiaHR0cHM6XCIpID8gXCJodHRwczovL1wiIDpcdFwiaHR0cDovL1wiKTtcclxuXHJcbiAgICAgICAgICAgICAgICByb290LmlubmVySFRNTCA9XHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aDI+WW91ciBicm93c2VyIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggRmxleFBhcGVyPC9oMj5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGgzPlVwZ3JhZGUgdG8gYSBuZXdlciBicm93c2VyIG9yIGRvd25sb2FkIEFkb2JlIEZsYXNoIFBsYXllciAxMCBvciBoaWdoZXIuPC9oMz5cIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPHA+Q2xpY2sgb24gdGhlIGljb24gYmVsb3cgdG8gZG93bmxvYWQgdGhlIGxhdGVzdCB2ZXJzaW9uIG9mIEFkb2JlIEZsYXNoXCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxhIGhyZWY9J2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJz48aW1nIHNyYz0nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKyBwYWdlSG9zdCArIFwid3d3LmFkb2JlLmNvbS9pbWFnZXMvc2hhcmVkL2Rvd25sb2FkX2J1dHRvbnMvZ2V0X2ZsYXNoX3BsYXllci5naWYnIGFsdD0nR2V0IEFkb2JlIEZsYXNoIHBsYXllcicgLz48L2E+XCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJvb3QudGFnTmFtZSA9PSAnQScpIHtcclxuICAgICAgICAgICAgICAgICAgICByb290Lm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24uaHJlZiA9IFVSTDtcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBvbkZhaWxcclxuICAgICAgICAgICAgaWYgKG9wdHMub25GYWlsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcmV0ID0gb3B0cy5vbkZhaWwuY2FsbCh0aGlzKTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcmV0ID09ICdzdHJpbmcnKSB7IHJvb3QuaW5uZXJIVE1MID0gcmV0OyB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGh0dHA6Ly9mbG93cGxheWVyLm9yZy9mb3J1bS84LzE4MTg2I3Bvc3QtMTg1OTNcclxuICAgICAgICBpZiAoSUUpIHtcclxuICAgICAgICAgICAgd2luZG93W29wdHMuaWRdID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQob3B0cy5pZCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBUEkgbWV0aG9kcyBmb3IgY2FsbGJhY2tcclxuICAgICAgICBleHRlbmQodGhpcywge1xyXG5cclxuICAgICAgICAgICAgZ2V0Um9vdDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdDtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldE9wdGlvbnM6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9wdHM7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG5cclxuICAgICAgICAgICAgZ2V0Q29uZjogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gY29uZjtcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIGdldEFwaTogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcm9vdC5maXJzdENoaWxkO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNldHVwIGpxdWVyeSBzdXBwb3J0XHJcbiAgICBpZiAoSlFVRVJZKSB7XHJcbiAgICAgICAgalF1ZXJ5LmZuLmZsYXNoZW1iZWQgPSBmdW5jdGlvbihvcHRzLCBjb25mKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBqUXVlcnkodGhpcykuZGF0YShcImZsYXNoZW1iZWRcIiwgZmxhc2hlbWJlZCh0aGlzLCBvcHRzLCBjb25mKSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGpRdWVyeS5mbi5GbGV4UGFwZXJWaWV3ZXIgPSBmdW5jdGlvbihhcmdzKXtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gbmV3IEZsZXhQYXBlclZpZXdlckVtYmVkZGluZyh0aGlzLmF0dHIoJ2lkJyksYXJncyk7XHJcbiAgICAgICAgfTtcclxuICAgIH1lbHNle1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImpRdWVyeSBtaXNzaW5nIVwiKTtcclxuICAgIH1cclxufSkoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xpYi9mbGV4L2ZsZXhwYXBlci5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsIi8qKlxyXG4g4paI4paS4paT4paS4paRIFRoZSBGbGV4UGFwZXIgUHJvamVjdFxyXG5cclxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEZsZXhQYXBlci5cclxuXHJcbiBGbGV4UGFwZXIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxyXG4gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcclxuIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZS5cclxuXHJcbiBGbGV4UGFwZXIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcclxuIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXHJcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXHJcbiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxyXG5cclxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXHJcbiBhbG9uZyB3aXRoIEZsZXhQYXBlci4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cclxuXHJcbiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBGbGV4UGFwZXIgcGxlYXNlIHNlZSB0aGUgRmxleFBhcGVyIHByb2plY3RcclxuIGhvbWUgcGFnZTogaHR0cDovL2ZsZXhwYXBlci5kZXZhbGRpLmNvbVxyXG4gKi9cclxuXHJcbiQoZnVuY3Rpb24oKSB7XHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGV4dGVybmFsIGxpbmtzIGdldHRpbmcgY2xpY2tlZCBpbiB0aGUgZG9jdW1lbnQuXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25FeHRlcm5hbExpbmtDbGlja2VkKFwiaHR0cDovL3d3dy5nb29nbGUuY29tXCIpXHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFN0cmluZyBsaW5rXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25FeHRlcm5hbExpbmtDbGlja2VkJyxmdW5jdGlvbihlLGxpbmspe1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKGxpbmssJ19mbGV4cGFwZXJfZXh0dXJsJyk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2lldmVzIHByb2dyZXNzIGluZm9ybWF0aW9uIGFib3V0IHRoZSBkb2N1bWVudCBiZWluZyBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvblByb2dyZXNzKCAxMDAsMTAwMDAgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW50IGxvYWRlZFxyXG4gICAgICogQHBhcmFtIGludCB0b3RhbFxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uUHJvZ3Jlc3MnLGZ1bmN0aW9uKGUsbG9hZGVkQnl0ZXMsdG90YWxCeXRlcyl7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBldmVudCBvZiBhIGRvY3VtZW50IGlzIGluIHByb2dyZXNzIG9mIGxvYWRpbmdcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Eb2N1bWVudExvYWRpbmcnLGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgZXZlbnQgb2YgYSBkb2N1bWVudCBpcyBpbiBwcm9ncmVzcyBvZiBsb2FkaW5nXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uUGFnZUxvYWRpbmcnLGZ1bmN0aW9uKGUscGFnZU51bWJlcil7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgY3VycmVudCBwYWdlIGJlaW5nIGNoYW5nZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkN1cnJlbnRQYWdlQ2hhbmdlZCggMTAgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW50IHBhZ2VudW1cclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkN1cnJlbnRQYWdlQ2hhbmdlZCcsZnVuY3Rpb24oZSxwYWdlbnVtKXtcclxuXHJcbiAgICAgICAgLy8gaWYgR0FOdW1iZXIgaXMgc3VwcGxpZWQgdGhlbiBsZXRzIHRyYWNrIHRoaXMgYXMgYSBHb29nbGUgQW5hbHl0aWNzIGV2ZW50LlxyXG4gICAgICAgIGlmKGpRdWVyeSh0aGlzKS5kYXRhKCdUcmFja2luZ051bWJlcicpKXtcclxuICAgICAgICAgICAgdmFyIF9nYXEgPSB3aW5kb3cuX2dhcSB8fCBbXTt3aW5kb3cuX2dhcT1fZ2FxO1xyXG4gICAgICAgICAgICB2YXIgdHJhY2tpbmdEb2MgPSBqUXVlcnkodGhpcykuZGF0YSgnVHJhY2tpbmdEb2N1bWVudCcpO1xyXG4gICAgICAgICAgICB2YXIgcGRmRmlsZU5hbWUgPSB0cmFja2luZ0RvYy5zdWJzdHIoMCx0cmFja2luZ0RvYy5pbmRleE9mKFwiLnBkZlwiKSs0KTtcclxuXHJcbiAgICAgICAgICAgIF9nYXEucHVzaChbJ19zZXRBY2NvdW50JywgalF1ZXJ5KHRoaXMpLmRhdGEoJ1RyYWNraW5nTnVtYmVyJyldKTtcclxuICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLCAnUERGIERvY3VtZW50cycsICdQYWdlIFZpZXcnLCBwZGZGaWxlTmFtZSArICcgLSBwYWdlICcgKyBwYWdlbnVtXSk7XHJcblxyXG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZ2EgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTsgZ2EudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnOyBnYS5hc3luYyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBnYS5zcmMgPSAoJ2h0dHBzOicgPT0gZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPyAnaHR0cHM6Ly9zc2wnIDogJ2h0dHA6Ly93d3cnKSArICcuZ29vZ2xlLWFuYWx5dGljcy5jb20vZ2EuanMnO1xyXG4gICAgICAgICAgICAgICAgdmFyIHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnc2NyaXB0JylbMF07IHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZ2EsIHMpO1xyXG4gICAgICAgICAgICB9KSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgbWVzc2FnZXMgYWJvdXQgdGhlIGRvY3VtZW50IGJlaW5nIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uRG9jdW1lbnRMb2FkZWQoIDIwICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGludCB0b3RhbFBhZ2VzXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Eb2N1bWVudExvYWRlZCcsZnVuY3Rpb24oZSx0b3RhbFBhZ2VzKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIG1lc3NhZ2VzIGFib3V0IHRoZSBwYWdlIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uUGFnZUxvYWRlZCggMSApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbnQgcGFnZU51bWJlclxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uUGFnZUxvYWRlZCcsZnVuY3Rpb24oZSxwYWdlTnVtYmVyKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIG1lc3NhZ2VzIGFib3V0IHRoZSBwYWdlIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uRXJyb3JMb2FkaW5nUGFnZSggMSApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbnQgcGFnZU51bWJlclxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRXJyb3JMb2FkaW5nUGFnZScsZnVuY3Rpb24oZSxwYWdlTnVtYmVyKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIGVycm9yIG1lc3NhZ2VzIHdoZW4gYSBkb2N1bWVudCBpcyBub3QgbG9hZGluZyBwcm9wZXJseVxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uRG9jdW1lbnRMb2FkZWRFcnJvciggXCJOZXR3b3JrIGVycm9yXCIgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIGVycm9yTWVzc2FnZVxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRG9jdW1lbnRMb2FkZWRFcnJvcicsZnVuY3Rpb24oZSxlcnJNZXNzYWdlKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIGVycm9yIG1lc3NhZ2VzIHdoZW4gYSBkb2N1bWVudCBoYXMgZmluaXNoZWQgcHJpbnRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uRG9jdW1lbnRQcmludGVkKCk7XHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRG9jdW1lbnRQcmludGVkJyxmdW5jdGlvbihlKXtcclxuXHJcbiAgICB9KTtcclxufSk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXJfaGFuZGxlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzIDRcbiAqKi8iLCIvLyBWRVJTSU9OOiAyLjMgTEFTVCBVUERBVEU6IDExLjA3LjIwMTNcclxuLyogXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZTogaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuICogXHJcbiAqIE1hZGUgYnkgV2lscTMyLCB3aWxxMzJAZ21haWwuY29tLCBXcm9jbGF3LCBQb2xhbmQsIDAxLjIwMDlcclxuICogV2Vic2l0ZTogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2pxdWVyeXJvdGF0ZS8gXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKCQpIHtcclxuICAgIHZhciBzdXBwb3J0ZWRDU1Msc3VwcG9ydGVkQ1NTT3JpZ2luLCBzdHlsZXM9ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLnN0eWxlLHRvQ2hlY2s9XCJ0cmFuc2Zvcm1Qcm9wZXJ0eSBXZWJraXRUcmFuc2Zvcm0gT1RyYW5zZm9ybSBtc1RyYW5zZm9ybSBNb3pUcmFuc2Zvcm1cIi5zcGxpdChcIiBcIik7XHJcbiAgICBmb3IgKHZhciBhID0gMDsgYSA8IHRvQ2hlY2subGVuZ3RoOyBhKyspIGlmIChzdHlsZXNbdG9DaGVja1thXV0gIT09IHVuZGVmaW5lZCkgeyBzdXBwb3J0ZWRDU1MgPSB0b0NoZWNrW2FdOyB9XHJcbiAgICBpZiAoc3VwcG9ydGVkQ1NTKSB7XHJcbiAgICAgIHN1cHBvcnRlZENTU09yaWdpbiA9IHN1cHBvcnRlZENTUy5yZXBsYWNlKC9bdFRdcmFuc2Zvcm0vLFwiVHJhbnNmb3JtT3JpZ2luXCIpO1xyXG4gICAgICBpZiAoc3VwcG9ydGVkQ1NTT3JpZ2luWzBdID09IFwiVFwiKSBzdXBwb3J0ZWRDU1NPcmlnaW5bMF0gPSBcInRcIjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWQgZXZhbCB0byBwcmV2ZW4gZ29vZ2xlIGNsb3N1cmUgdG8gcmVtb3ZlIGl0IGZyb20gY29kZSBvX09cclxuICAgIGV2YWwoJ0lFID0gXCJ2XCI9PVwiXFx2XCInKTtcclxuXHJcbiAgICBqUXVlcnkuZm4uZXh0ZW5kKHtcclxuICAgICAgICByb3RhdGU6ZnVuY3Rpb24ocGFyYW1ldGVycylcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAodGhpcy5sZW5ndGg9PT0wfHx0eXBlb2YgcGFyYW1ldGVycz09XCJ1bmRlZmluZWRcIikgcmV0dXJuO1xyXG4gICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJzPT1cIm51bWJlclwiKSBwYXJhbWV0ZXJzPXthbmdsZTpwYXJhbWV0ZXJzfTtcclxuICAgICAgICAgIHZhciByZXR1cm5lZD1bXTtcclxuICAgICAgICAgIGZvciAodmFyIGk9MCxpMD10aGlzLmxlbmd0aDtpPGkwO2krKylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQ9dGhpcy5nZXQoaSk7XHRcclxuICAgICAgICAgICAgaWYgKCFlbGVtZW50LldpbHEzMiB8fCAhZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgdmFyIHBhcmFtQ2xvbmUgPSAkLmV4dGVuZCh0cnVlLCB7fSwgcGFyYW1ldGVycyk7IFxyXG4gICAgICAgICAgICAgIHZhciBuZXdSb3RPYmplY3QgPSBuZXcgV2lscTMyLlBob3RvRWZmZWN0KGVsZW1lbnQscGFyYW1DbG9uZSkuX3Jvb3RPYmo7XHJcblxyXG4gICAgICAgICAgICAgIHJldHVybmVkLnB1c2goJChuZXdSb3RPYmplY3QpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdC5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXR1cm5lZDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGdldFJvdGF0ZUFuZ2xlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgdmFyIHJldCA9IFtdO1xyXG4gICAgICAgICAgZm9yICh2YXIgaT0wLGkwPXRoaXMubGVuZ3RoO2k8aTA7aSsrKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudD10aGlzLmdldChpKTtcdFxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5XaWxxMzIgJiYgZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QpIHtcclxuICAgICAgICAgICAgICByZXRbaV0gPSBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdC5fYW5nbGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdG9wUm90YXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgZm9yICh2YXIgaT0wLGkwPXRoaXMubGVuZ3RoO2k8aTA7aSsrKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudD10aGlzLmdldChpKTtcdFxyXG4gICAgICAgICAgICBpZiAoZWxlbWVudC5XaWxxMzIgJiYgZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QpIHtcclxuICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QuX3RpbWVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIC8vIExpYnJhcnkgYWdub3N0aWMgaW50ZXJmYWNlXHJcblxyXG4gICAgV2lscTMyPXdpbmRvdy5XaWxxMzJ8fHt9O1xyXG4gICAgV2lscTMyLlBob3RvRWZmZWN0PShmdW5jdGlvbigpe1xyXG5cclxuICAgICAgaWYgKHN1cHBvcnRlZENTUykge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpbWcscGFyYW1ldGVycyl7XHJcbiAgICAgICAgICBpbWcuV2lscTMyID0ge1xyXG4gICAgICAgICAgICBQaG90b0VmZmVjdDogdGhpc1xyXG4gICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICB0aGlzLl9pbWcgPSB0aGlzLl9yb290T2JqID0gdGhpcy5fZXZlbnRPYmogPSBpbWc7XHJcbiAgICAgICAgICB0aGlzLl9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGltZyxwYXJhbWV0ZXJzKSB7XHJcbiAgICAgICAgICB0aGlzLl9pbWcgPSBpbWc7XHJcbiAgICAgICAgICB0aGlzLl9vbkxvYWREZWxlZ2F0ZSA9IFtwYXJhbWV0ZXJzXTtcclxuXHJcbiAgICAgICAgICB0aGlzLl9yb290T2JqPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcclxuICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUuZGlzcGxheT1cImlubGluZS1ibG9ja1wiO1xyXG4gICAgICAgICAgdGhpcy5fcm9vdE9iai5XaWxxMzIgPSBcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIFBob3RvRWZmZWN0OiB0aGlzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICBpbWcucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpcy5fcm9vdE9iaixpbWcpO1xyXG5cclxuICAgICAgICAgIGlmIChpbWcuY29tcGxldGUpIHtcclxuICAgICAgICAgICAgdGhpcy5fTG9hZGVyKCk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB2YXIgc2VsZj10aGlzO1xyXG4gICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgalF1ZXJ5IGRlcGVuZGVuY3lcclxuICAgICAgICAgICAgalF1ZXJ5KHRoaXMuX2ltZykuYmluZChcImxvYWRcIiwgZnVuY3Rpb24oKXsgc2VsZi5fTG9hZGVyKCk7IH0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSkoKTtcclxuXHJcbiAgICBXaWxxMzIuUGhvdG9FZmZlY3QucHJvdG90eXBlID0ge1xyXG4gICAgICBfc2V0dXBQYXJhbWV0ZXJzIDogZnVuY3Rpb24gKHBhcmFtZXRlcnMpe1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMgPSB0aGlzLl9wYXJhbWV0ZXJzIHx8IHt9O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fYW5nbGUgIT09IFwibnVtYmVyXCIpIHsgdGhpcy5fYW5nbGUgPSAwIDsgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcGFyYW1ldGVycy5hbmdsZT09PVwibnVtYmVyXCIpIHsgdGhpcy5fYW5nbGUgPSBwYXJhbWV0ZXJzLmFuZ2xlOyB9XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5hbmltYXRlVG8gPSAodHlwZW9mIHBhcmFtZXRlcnMuYW5pbWF0ZVRvID09PSBcIm51bWJlclwiKSA/IChwYXJhbWV0ZXJzLmFuaW1hdGVUbykgOiAodGhpcy5fYW5nbGUpOyBcclxuXHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5zdGVwID0gcGFyYW1ldGVycy5zdGVwIHx8IHRoaXMuX3BhcmFtZXRlcnMuc3RlcCB8fCBudWxsO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuZWFzaW5nID0gcGFyYW1ldGVycy5lYXNpbmcgfHwgdGhpcy5fcGFyYW1ldGVycy5lYXNpbmcgfHwgdGhpcy5fZGVmYXVsdEVhc2luZztcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmR1cmF0aW9uID0gcGFyYW1ldGVycy5kdXJhdGlvbiB8fCB0aGlzLl9wYXJhbWV0ZXJzLmR1cmF0aW9uIHx8IDEwMDA7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjayA9IHBhcmFtZXRlcnMuY2FsbGJhY2sgfHwgdGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjayB8fCB0aGlzLl9lbXB0eUZ1bmN0aW9uO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyID0gcGFyYW1ldGVycy5jZW50ZXIgfHwgdGhpcy5fcGFyYW1ldGVycy5jZW50ZXIgfHwgW1wiNTAlXCIsXCI1MCVcIl07XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclswXSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclggPSAocGFyc2VJbnQodGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMF0sMTApIC8gMTAwKSAqIHRoaXMuX2ltZ1dpZHRoICogdGhpcy5fYXNwZWN0VztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fcm90YXRpb25DZW50ZXJYID0gdGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMV0gPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgdGhpcy5fcm90YXRpb25DZW50ZXJZID0gKHBhcnNlSW50KHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzFdLDEwKSAvIDEwMCkgKiB0aGlzLl9pbWdIZWlnaHQgKiB0aGlzLl9hc3BlY3RIO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclkgPSB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclsxXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYXJhbWV0ZXJzLmJpbmQgJiYgcGFyYW1ldGVycy5iaW5kICE9IHRoaXMuX3BhcmFtZXRlcnMuYmluZCkgeyB0aGlzLl9CaW5kRXZlbnRzKHBhcmFtZXRlcnMuYmluZCk7IH1cclxuICAgICAgfSxcclxuICAgICAgX2VtcHR5RnVuY3Rpb246IGZ1bmN0aW9uKCl7fSxcclxuICAgICAgX2RlZmF1bHRFYXNpbmc6IGZ1bmN0aW9uICh4LCB0LCBiLCBjLCBkKSB7IHJldHVybiAtYyAqICgodD10L2QtMSkqdCp0KnQgLSAxKSArIGIgfSwgXHJcbiAgICAgIF9oYW5kbGVSb3RhdGlvbiA6IGZ1bmN0aW9uKHBhcmFtZXRlcnMsIGRvbnRjaGVjayl7XHJcbiAgICAgICAgaWYgKCFzdXBwb3J0ZWRDU1MgJiYgIXRoaXMuX2ltZy5jb21wbGV0ZSAmJiAhZG9udGNoZWNrKSB7XHJcbiAgICAgICAgICB0aGlzLl9vbkxvYWREZWxlZ2F0ZS5wdXNoKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9zZXR1cFBhcmFtZXRlcnMocGFyYW1ldGVycyk7XHJcbiAgICAgICAgaWYgKHRoaXMuX2FuZ2xlPT10aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVUbykge1xyXG4gICAgICAgICAgdGhpcy5fcm90YXRlKHRoaXMuX2FuZ2xlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7IFxyXG4gICAgICAgICAgdGhpcy5fYW5pbWF0ZVN0YXJ0KCk7ICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIF9CaW5kRXZlbnRzOmZ1bmN0aW9uKGV2ZW50cyl7XHJcbiAgICAgICAgaWYgKGV2ZW50cyAmJiB0aGlzLl9ldmVudE9iaikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgLy8gVW5iaW5kaW5nIHByZXZpb3VzIEV2ZW50c1xyXG4gICAgICAgICAgaWYgKHRoaXMuX3BhcmFtZXRlcnMuYmluZCl7XHJcbiAgICAgICAgICAgIHZhciBvbGRFdmVudHMgPSB0aGlzLl9wYXJhbWV0ZXJzLmJpbmQ7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGEgaW4gb2xkRXZlbnRzKSBpZiAob2xkRXZlbnRzLmhhc093blByb3BlcnR5KGEpKSBcclxuICAgICAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgalF1ZXJ5IGRlcGVuZGVuY3lcclxuICAgICAgICAgICAgICBqUXVlcnkodGhpcy5fZXZlbnRPYmopLnVuYmluZChhLG9sZEV2ZW50c1thXSk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuYmluZCA9IGV2ZW50cztcclxuICAgICAgICBmb3IgKHZhciBhIGluIGV2ZW50cykgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShhKSkgXHJcbiAgICAgICAgICAvLyBUT0RPOiBSZW1vdmUgalF1ZXJ5IGRlcGVuZGVuY3lcclxuICAgICAgICAgIGpRdWVyeSh0aGlzLl9ldmVudE9iaikuYmluZChhLGV2ZW50c1thXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgX0xvYWRlcjooZnVuY3Rpb24oKVxyXG4gICAgICB7XHJcbiAgICAgICAgaWYgKElFKVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgd2lkdGg9dGhpcy5faW1nLndpZHRoO1xyXG4gICAgICAgICAgICB2YXIgaGVpZ2h0PXRoaXMuX2ltZy5oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltZ1dpZHRoID0gd2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltZ0hlaWdodCA9IGhlaWdodDsgXHJcbiAgICAgICAgICAgIHRoaXMuX2ltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2ltZyk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2UgPSB0aGlzLmNyZWF0ZVZNTE5vZGUoJ2ltYWdlJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zcmM9dGhpcy5faW1nLnNyYztcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLmhlaWdodD1oZWlnaHQrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUud2lkdGg9d2lkdGgrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiOyAvLyBGSVhFUyBJRSBQUk9CTEVNIC0gaXRzIG9ubHkgcmVuZGVyZWQgaWYgaXRzIG9uIGFic29sdXRlIHBvc2l0aW9uIVxyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUudG9wID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLmxlZnQgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9hc3BlY3RXID0gdGhpcy5fYXNwZWN0SCA9IDE7XHJcblxyXG4gICAgICAgICAgICAvKiBHcm91cCBtaW5pZnlpbmcgYSBzbWFsbCAxcHggcHJlY2lzaW9uIHByb2JsZW0gd2hlbiByb3RhdGluZyBvYmplY3QgKi9cclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyID0gdGhpcy5jcmVhdGVWTUxOb2RlKCdncm91cCcpO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUud2lkdGg9d2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5oZWlnaHQ9aGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUudG9wPVwiMHB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5sZWZ0PVwiMHB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2Nvb3Jkc2l6ZScsd2lkdGgtMSsnLCcrKGhlaWdodC0xKSk7IC8vIFRoaXMgLTEsIC0xIHRyeWluZyB0byBmaXggdWdseSBwcm9ibGVtIHdpdGggc21hbGwgZGlzcGxhY2VtZW50IG9uIElFXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLl92aW1hZ2UpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5hcHBlbmRDaGlsZCh0aGlzLl9jb250YWluZXIpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIjsgLy8gRklYRVMgSUUgUFJPQkxFTVxyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLndpZHRoPXdpZHRoK1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5oZWlnaHQ9aGVpZ2h0K1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zZXRBdHRyaWJ1dGUoJ2lkJyx0aGlzLl9pbWcuZ2V0QXR0cmlidXRlKCdpZCcpKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5jbGFzc05hbWU9dGhpcy5faW1nLmNsYXNzTmFtZTtcdFx0XHRcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRPYmogPSB0aGlzLl9yb290T2JqO1x0XHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB3aGlsZSAocGFyYW1ldGVycyA9IHRoaXMuX29uTG9hZERlbGVnYXRlLnNoaWZ0KCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzLCB0cnVlKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc2V0QXR0cmlidXRlKCdpZCcsdGhpcy5faW1nLmdldEF0dHJpYnV0ZSgnaWQnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouY2xhc3NOYW1lPXRoaXMuX2ltZy5jbGFzc05hbWU7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbWdXaWR0aD10aGlzLl9pbWcubmF0dXJhbFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9pbWdIZWlnaHQ9dGhpcy5faW1nLm5hdHVyYWxIZWlnaHQ7XHJcbiAgICAgICAgICAgIHZhciBfd2lkdGhNYXg9TWF0aC5zcXJ0KCh0aGlzLl9pbWdIZWlnaHQpKih0aGlzLl9pbWdIZWlnaHQpICsgKHRoaXMuX2ltZ1dpZHRoKSAqICh0aGlzLl9pbWdXaWR0aCkpO1xyXG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IF93aWR0aE1heCAqIDM7XHJcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IF93aWR0aE1heCAqIDM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9hc3BlY3RXID0gdGhpcy5faW1nLm9mZnNldFdpZHRoL3RoaXMuX2ltZy5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2FzcGVjdEggPSB0aGlzLl9pbWcub2Zmc2V0SGVpZ2h0L3RoaXMuX2ltZy5uYXR1cmFsSGVpZ2h0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5faW1nKTtcdFxyXG5cclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLHRoaXMuX3dpZHRoKTtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIjtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLmxlZnQgPSAtdGhpcy5faW1nLmhlaWdodCAqIHRoaXMuX2FzcGVjdFcgKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS50b3AgPSAtdGhpcy5faW1nLndpZHRoICogdGhpcy5fYXNwZWN0SCArIFwicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLldpbHEzMiA9IHRoaXMuX3Jvb3RPYmouV2lscTMyO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5hcHBlbmRDaGlsZCh0aGlzLl9jYW52YXMpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLndpZHRoPXRoaXMuX2ltZy53aWR0aCp0aGlzLl9hc3BlY3RXK1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5oZWlnaHQ9dGhpcy5faW1nLmhlaWdodCp0aGlzLl9hc3BlY3RIK1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fZXZlbnRPYmogPSB0aGlzLl9jYW52YXM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jbnY9dGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJyk7XHJcbiAgICAgICAgICAgIHZhciBwYXJhbWV0ZXJzO1xyXG4gICAgICAgICAgICB3aGlsZSAocGFyYW1ldGVycyA9IHRoaXMuX29uTG9hZERlbGVnYXRlLnNoaWZ0KCkpIHtcclxuICAgICAgICAgICAgICB0aGlzLl9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzLCB0cnVlKTtcdFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0pKCksXHJcblxyXG4gICAgICBfYW5pbWF0ZVN0YXJ0OmZ1bmN0aW9uKClcclxuICAgICAge1x0XHJcbiAgICAgICAgaWYgKHRoaXMuX3RpbWVyKSB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLl9hbmltYXRlU3RhcnRUaW1lID0gK25ldyBEYXRlO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlID0gdGhpcy5fYW5nbGU7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZSgpO1xyXG4gICAgICB9LFxyXG4gICAgICBfYW5pbWF0ZTpmdW5jdGlvbigpXHJcbiAgICAgIHtcclxuICAgICAgICB2YXIgYWN0dWFsVGltZSA9ICtuZXcgRGF0ZTtcclxuICAgICAgICB2YXIgY2hlY2tFbmQgPSBhY3R1YWxUaW1lIC0gdGhpcy5fYW5pbWF0ZVN0YXJ0VGltZSA+IHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb247XHJcblxyXG4gICAgICAgIC8vIFRPRE86IEJ1ZyBmb3IgYW5pbWF0ZWRHaWYgZm9yIHN0YXRpYyByb3RhdGlvbiA/ICh0byB0ZXN0KVxyXG4gICAgICAgIGlmIChjaGVja0VuZCAmJiAhdGhpcy5fcGFyYW1ldGVycy5hbmltYXRlZEdpZikgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBpZiAodGhpcy5fY2FudmFzfHx0aGlzLl92aW1hZ2V8fHRoaXMuX2ltZykge1xyXG4gICAgICAgICAgICB2YXIgYW5nbGUgPSB0aGlzLl9wYXJhbWV0ZXJzLmVhc2luZygwLCBhY3R1YWxUaW1lIC0gdGhpcy5fYW5pbWF0ZVN0YXJ0VGltZSwgdGhpcy5fYW5pbWF0ZVN0YXJ0QW5nbGUsIHRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvIC0gdGhpcy5fYW5pbWF0ZVN0YXJ0QW5nbGUsIHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB0aGlzLl9yb3RhdGUoKH5+KGFuZ2xlKjEwKSkvMTApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgaWYgKHRoaXMuX3BhcmFtZXRlcnMuc3RlcCkge1xyXG4gICAgICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLnN0ZXAodGhpcy5fYW5nbGUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKClcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgc2VsZi5fYW5pbWF0ZS5jYWxsKHNlbGYpO1xyXG4gICAgICAgICAgfSwgMTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIC8vIFRvIGZpeCBCdWcgdGhhdCBwcmV2ZW50cyB1c2luZyByZWN1cnNpdmUgZnVuY3Rpb24gaW4gY2FsbGJhY2sgSSBtb3ZlZCB0aGlzIGZ1bmN0aW9uIHRvIGJhY2tcclxuICAgICAgaWYgKHRoaXMuX3BhcmFtZXRlcnMuY2FsbGJhY2sgJiYgY2hlY2tFbmQpe1xyXG4gICAgICAgIHRoaXMuX2FuZ2xlID0gdGhpcy5fcGFyYW1ldGVycy5hbmltYXRlVG87XHJcbiAgICAgICAgdGhpcy5fcm90YXRlKHRoaXMuX2FuZ2xlKTtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmNhbGxiYWNrLmNhbGwodGhpcy5fcm9vdE9iaik7XHJcbiAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIF9yb3RhdGUgOiAoZnVuY3Rpb24oKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIHJhZCA9IE1hdGguUEkvMTgwO1xyXG4gICAgICAgIGlmIChJRSlcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhbmdsZSlcclxuICAgICAgICB7XHJcbiAgICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLnJvdGF0aW9uPShhbmdsZSUzNjApK1wiZGVnXCI7XHJcbiAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUudG9wID0gLSh0aGlzLl9yb3RhdGlvbkNlbnRlclkgLSB0aGlzLl9pbWdIZWlnaHQvMikgKyBcInB4XCI7XHJcbiAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUubGVmdCA9IC0odGhpcy5fcm90YXRpb25DZW50ZXJYIC0gdGhpcy5faW1nV2lkdGgvMikgKyBcInB4XCI7XHJcbiAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUudG9wID0gdGhpcy5fcm90YXRpb25DZW50ZXJZIC0gdGhpcy5faW1nSGVpZ2h0LzIgKyBcInB4XCI7XHJcbiAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUubGVmdCA9IHRoaXMuX3JvdGF0aW9uQ2VudGVyWCAtIHRoaXMuX2ltZ1dpZHRoLzIgKyBcInB4XCI7XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgaWYgKHN1cHBvcnRlZENTUylcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhbmdsZSl7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltZy5zdHlsZVtzdXBwb3J0ZWRDU1NdPVwicm90YXRlKFwiKyhhbmdsZSUzNjApK1wiZGVnKVwiO1xyXG4gICAgICAgICAgICB0aGlzLl9pbWcuc3R5bGVbc3VwcG9ydGVkQ1NTT3JpZ2luXT10aGlzLl9wYXJhbWV0ZXJzLmNlbnRlci5qb2luKFwiIFwiKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgXHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhbmdsZSlcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgICAgYW5nbGU9KGFuZ2xlJTM2MCkqIHJhZDtcclxuICAgICAgICAgICAgLy8gY2xlYXIgY2FudmFzXHRcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLndpZHRoID0gdGhpcy5fd2lkdGg7Ly8rdGhpcy5fd2lkdGhBZGQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSB0aGlzLl9oZWlnaHQ7Ly8rdGhpcy5faGVpZ2h0QWRkO1xyXG5cclxuICAgICAgICAgICAgLy8gUkVNRU1CRVI6IGFsbCBkcmF3aW5ncyBhcmUgcmVhZCBmcm9tIGJhY2t3YXJkcy4uIHNvIGZpcnN0IGZ1bmN0aW9uIGlzIHRyYW5zbGF0ZSwgdGhlbiByb3RhdGUsIHRoZW4gdHJhbnNsYXRlLCB0cmFuc2xhdGUuLlxyXG4gICAgICAgICAgICB0aGlzLl9jbnYudHJhbnNsYXRlKHRoaXMuX2ltZ1dpZHRoKnRoaXMuX2FzcGVjdFcsdGhpcy5faW1nSGVpZ2h0KnRoaXMuX2FzcGVjdEgpO1x0Ly8gYXQgbGVhc3QgY2VudGVyIGltYWdlIG9uIHNjcmVlblxyXG4gICAgICAgICAgICB0aGlzLl9jbnYudHJhbnNsYXRlKHRoaXMuX3JvdGF0aW9uQ2VudGVyWCx0aGlzLl9yb3RhdGlvbkNlbnRlclkpO1x0XHRcdC8vIHdlIG1vdmUgaW1hZ2UgYmFjayB0byBpdHMgb3JnaW5hbCBcclxuICAgICAgICAgICAgdGhpcy5fY252LnJvdGF0ZShhbmdsZSk7XHRcdFx0XHRcdFx0XHRcdFx0XHQvLyByb3RhdGUgaW1hZ2VcclxuICAgICAgICAgICAgdGhpcy5fY252LnRyYW5zbGF0ZSgtdGhpcy5fcm90YXRpb25DZW50ZXJYLC10aGlzLl9yb3RhdGlvbkNlbnRlclkpO1x0XHQvLyBtb3ZlIGltYWdlIHRvIGl0cyBjZW50ZXIsIHNvIHdlIGNhbiByb3RhdGUgYXJvdW5kIGl0cyBjZW50ZXJcclxuICAgICAgICAgICAgdGhpcy5fY252LnNjYWxlKHRoaXMuX2FzcGVjdFcsdGhpcy5fYXNwZWN0SCk7IC8vIFNDQUxFIC0gaWYgbmVlZGVkIDspXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi5kcmF3SW1hZ2UodGhpcy5faW1nLCAwLCAwKTtcdFx0XHRcdFx0XHRcdC8vIEZpcnN0IC0gd2UgZHJhdyBpbWFnZVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgfSkoKVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoSUUpXHJcbiAgICAgIHtcclxuICAgICAgICBXaWxxMzIuUGhvdG9FZmZlY3QucHJvdG90eXBlLmNyZWF0ZVZNTE5vZGU9KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVTdHlsZVNoZWV0KCkuYWRkUnVsZShcIi5ydm1sXCIsIFwiYmVoYXZpb3I6dXJsKCNkZWZhdWx0I1ZNTClcIik7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAhZG9jdW1lbnQubmFtZXNwYWNlcy5ydm1sICYmIGRvY3VtZW50Lm5hbWVzcGFjZXMuYWRkKFwicnZtbFwiLCBcInVybjpzY2hlbWFzLW1pY3Jvc29mdC1jb206dm1sXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPHJ2bWw6JyArIHRhZ05hbWUgKyAnIGNsYXNzPVwicnZtbFwiPicpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHRhZ05hbWUpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnPCcgKyB0YWdOYW1lICsgJyB4bWxucz1cInVybjpzY2hlbWFzLW1pY3Jvc29mdC5jb206dm1sXCIgY2xhc3M9XCJydm1sXCI+Jyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9XHRcdFxyXG4gICAgICAgIH0pKCk7XHJcbiAgICAgIH1cclxuXHJcbn0pKGpRdWVyeSk7XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL2pxLnJvdGF0ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsImZ1bmN0aW9uIGVtcHR5RnVuKHJlcyl7XHJcblx0Y29uc29sZS5sb2cocmVzKTtcclxufVxyXG5cclxuZnVuY3Rpb24gY2hlY2tVcmwodXJsKXtcclxuXHRpZih1cmwuaW5kZXhPZignPycpPj0wKXtcclxuXHRcdHJldHVybiB1cmwgKz0nJl90PScrbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0fWVsc2V7XHJcblx0XHRyZXR1cm4gdXJsICs9Jz9fdD0nK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcG9zdCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IHVybCxcclxuXHRcdHR5cGUgOiAnUE9TVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcblxyXG59XHJcblxyXG5cclxuXHJcbmZ1bmN0aW9uIGdldCh1cmwscGFyYW0sY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdGlmKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRjYWxsYmFjayA9IGVtcHR5RnVuO1xyXG5cdH1cdFxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHRhamF4KHtcclxuXHRcdHVybCA6IGNoZWNrVXJsKHVybCksXHJcblx0XHR0eXBlIDogJ0dFVCcsXHJcblx0XHRkYXRhIDogcGFyYW0sXHJcblx0fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFqYXgob3B0LGNhbGxiYWNrLGVycm9yKXtcclxuXHR2YXIgdHlwZSA9IG9wdC50eXBlIHx8ICdHRVQnLFxyXG5cdFx0dXJsID0gb3B0LnVybCxcclxuXHRcdGRhdGEgPSBvcHQuZGF0YTtcclxuXHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cclxuXHQkLmFqYXgoe1xyXG5cdFx0dHlwZSA6IHR5cGUsXHJcblx0XHR1cmwgOiBjaGVja1VybCh1cmwpLFxyXG5cdFx0ZGF0YSA6IGRhdGEsXHJcblx0XHRzdWNjZXNzIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0Y2FsbGJhY2socmVzKTtcclxuXHRcdH0sXHJcblx0XHRlcnJvciA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGVycm9yKHJlcyk7XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcblx0YWpheCA6IGFqYXgsXHJcblx0cG9zdCA6IHBvc3QsXHJcblx0Z2V0IDogZ2V0XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9yZXF1ZXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICA8c3BhbiBkYXRhLWFjdGlvbj1cImxvZ291dFwiPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIiA+PHNwYW4+PC9zcGFuPjxkaXY+PC9kaXY+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCI+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgICA8c3BhbiBkYXRhLWFjdGlvbj1cImxvZ291dFwiPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAxLCBuYW1lKSwgJzwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cIm1zZ1wiID48c3Bhbj48L3NwYW4+PGRpdj48L2Rpdj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJkaWFsb2dcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJzZWFyY2hcIj48L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzXG4gKiogbW9kdWxlIGlkID0gMjlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxyXFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcclxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcclxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXHJcXG4gICAgPC9zcGFuPlxcclxcbjwvZGl2PiBcXHJcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXHJcXG4gIDx1bD5cXHJcXG4gIDwlXFxyXFxuICAgIGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gICAgICBpdGVtID0gbGlzdFtpXTtcXHJcXG4gICU+IFxcclxcbiAgICAgIDxsaSBpZD1cInVzZXI8JS1pdGVtLmlkJT5cIiBjbGFzcz1cInVzZXI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiPjwlLWl0ZW0ubmFtZSU+PC9saT5cXHJcXG4gIDwlfSU+XFxyXFxuICA8L3VsPlxcclxcbjwvZGl2PiAgJyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImlucHV0LWdyb3VwXCI+XFxuICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgcGxhY2Vob2xkZXI9XCLovpPlhaXnlKjmiLflkI3np7DmkJzntKJcIiBuYW1lPVwibWFuYWdla2V5XCIgZGF0YS1rZXl1cD1cInNlYXJjaGJ0blwiPlxcbiAgICA8c3BhbiBjbGFzcz1cImlucHV0LWdyb3VwLWJ0blwiPlxcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRlZmF1bHRcIiB0eXBlPVwiYnV0dG9uXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hidG5cIj7mkJzntKI8L2J1dHRvbj5cXG4gICAgPC9zcGFuPlxcbjwvZGl2PiBcXG48ZGl2IGNsYXNzPVwibWFuYWdlLWFyZWFcIj5cXG4gIDx1bD5cXG4gICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFxcbiAgICAgIDxsaSBpZD1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBjbGFzcz1cInVzZXInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RvbmVcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLm5hbWUpLCBcIjwvbGk+XFxuICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICA8L3VsPlxcbjwvZGl2PiAgXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZTwlLWlkJT5cIiBkYXRhLWlkPVwiPCUtaWQlPlwiPlxcclxcblx0PCUtbmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBpZD1cIm1hbmFnZScsIChfX3N0YWNrLmxpbmVubyA9IDEsIGlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDIsIG5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgaW4gbGlzdCl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuXHR2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcXHJcXG4lPlxcclxcbjxsaSB0aXRsZT1cIjwlLWl0ZW0ubWVzc2FnZSU+XCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPTwlLW9iai5hcnRpY2xlSWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLXJlYWQ9XCI8JS1pdGVtLnJlYWQlPlwiPjwlLWl0ZW0ubWVzc2FnZSU+PC9hPjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gSlNPTi5wYXJzZShpdGVtLndpdGhEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubWVzc2FnZSksICdcIj48YSBkYXRhLWhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNiwgb2JqLmFydGljbGVJZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5pZCksICdcIiBkYXRhLXJlYWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLnJlYWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5tZXNzYWdlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMyXG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogXCJcIixcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21zZy5lanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxcclxcbiAgICAgICAgICA8c3Bhbj48JS10aXRsZSU+PC9zcGFuPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWFyZWFcIj5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIiBkYXRhLWlkPVwiPCUtaWQlPlwiIGRhdGEtc3RhdHVzPVwiPCUtc3RhdHVzJT5cIj48JWlmKHN0YXR1cyl7JT7lj5bmtojnva7pobY8JX1lbHNleyU+572u6aG2PCV9JT48L2E+XFxyXFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmV0dXJuXCIgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9PCUtc3ViamVjdF9pZCU+XCI+6L+U5ZuePC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtbGlzdFwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmVcIj5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKHVwZGF0ZVRpbWUpJT48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+PCUtbmFtZSU+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCIgIGRhdGEtaWQ9XCI8JS1pZCU+XCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPjwlLWNvbW1lbnRDb3VudCU+PC9mb250Pjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgPGR0PjxhPjwlLXRpdGxlJT48L2E+PC9kdD5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JS1jb250ZW50JT5cXHJcXG4gICAgICAgICAgICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JWZvcih2YXIgaj0wLG09cmVzb3VyY2VMaXN0Lmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gcmVzb3VyY2VMaXN0W2pdO1xcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiAgZGF0YS1pZD1cIjwlLW9iai5pZCU+XCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCV9fSU+ICAgICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgICA8L2RsPlxcclxcbiAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxcbiAgICAgICAgICA8c3Bhbj4nLCAoX19zdGFjay5saW5lbm8gPSAyLCB0aXRsZSksICc8L3NwYW4+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tYXJlYVwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgZGF0YS1hY3Rpb249XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpZCksICdcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDQsIHN0YXR1cyksICdcIj4nKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuWPlua2iOe9rumhtlwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi572u6aG2XCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L2E+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYWN0aXZlIHRpbWUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXRpbWVcIj7mjInliJvlu7rml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGUtYnRuXCIgaHJlZj1cIiNmYWtlbGlua1wiIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwicmV0dXJuXCIgaHJlZj1cIi9pbmZvLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gOSwgc3ViamVjdF9pZCksICdcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1saXN0XCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZVwiPlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gMTQsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKHVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNiwgbmFtZSksICc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZGl0XCIgZGF0YS1hY3Rpb249XCJlZGl0XCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgIGRhdGEtYWN0aW9uPVwic2V0dXBcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE4LCBpZCksICdcIj48c3Bhbj48L3NwYW4+6LWePC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIj48c3Bhbj48L3NwYW4+5Zue5aSNIDxmb250IGlkPVwiY29tbWVudENvdW50XCI+JywgKF9fc3RhY2subGluZW5vID0gMTgsIGNvbW1lbnRDb3VudCksICc8L2ZvbnQ+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXG4gICAgICAgICAgICAgICAgICA8ZHQ+PGE+JywgKF9fc3RhY2subGluZW5vID0gMjEsIHRpdGxlKSwgXCI8L2E+PC9kdD5cXG4gICAgICAgICAgICAgICAgICA8ZGQ+XFxuICAgICAgICAgICAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMjMsIGNvbnRlbnQpLCAnXFxuICAgICAgICAgICAgICAgICAgPC9kZD5cXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcbiAgICAgICAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNjtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IHJlc291cmNlTGlzdC5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJlc291cmNlTGlzdFtqXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzIsIG9iai5pZCksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICAgICAgICAgICAgXFxuICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8L2RsPlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gMzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcbiAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liA8JS1pdGVtLmNyZWF0b3JOYW1lJT4gICDmnIDlkI7lm57lpI0gPCUtaXRlbS51cGRhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxyXFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT4mc2lkPTwlLWl0ZW0uc3ViamVjdF9pZCU+XCI+PCUtaXRlbS50aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLmltZ251bT4wKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1pbWctbGlzdFwiPlxcclxcbiAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XFxyXFxuICAgICAgICAgICAgdmFyIGltZ251bSA9IDA7XFxyXFxuICAgICAgICAgICAgZm9yKHZhciBqPTAsbT1pdGVtLnJlc291cmNlLmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xcclxcbiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICAgICAgIGlmKGltZ251bT4yKXtcXHJcXG4gICAgICAgICAgICAgICAgICBicmVhaztcXHJcXG4gICAgICAgICAgICAgICAgfVxcclxcbiAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiIGRhdGEtcGlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLW9iai5pZCU+XCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcclxcbiAgICAgICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICAgICAgaW1nbnVtKys7XFxyXFxuICAgICAgICAgICAgICAgIGlmKGZpcnN0KXtcXHJcXG4gICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xcclxcbiAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsTwlLWl0ZW0uaW1nbnVtJT7lvKA8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8JX19JT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZSBhcnRpY2xlJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSA1LCBzdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiICAg5pyA5ZCO5Zue5aSNIFwiLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLnVwZGF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5bey6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0aWNlLWRsXCI+XFxuICAgICAgICA8ZHQ+PGEgaHJlZj1cImFydGljbGUuaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksIFwiJnNpZD1cIiwgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uc3ViamVjdF9pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS50aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTY7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmltZ251bSA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGZpcnN0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbWdudW0gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSBpdGVtLnJlc291cmNlLmxlbmd0aDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaW1nbnVtID4gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMCwgb2JqLmlkKSwgJ1wiIGRhdGEtcGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzAsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ251bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgICAgPHNwYW4+5YWxXCIsIChfX3N0YWNrLmxpbmVubyA9IDM2LCBpdGVtLmltZ251bSksIFwi5bygPC9zcGFuPlxcbiAgICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0MTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICA8L2Rpdj5cXG4gIDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0NDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZSBjb21tZW50PCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPue8lui+kTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiAgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwiY29sbGVjdFwiICBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNDb2xsZWN0JT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lj5bmtojmlLbol488JX1lbHNleyU+5pS26JePPCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtY25hbWU9XCI8JS1pdGVtLmNyZWF0b3JOYW1lJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj4gXFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXHJcXG4gICAgICAgIDxkdD48JS1pdGVtLnRpdGxlJT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5yZXNvdXJjZSl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWltZy1saXN0XCI+XFxyXFxuICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgdmFyIGltZ251bSA9IDA7XFxyXFxuICAgICAgICAgICAgZm9yKHZhciBqPTAsbT1pdGVtLnJlc291cmNlLmxlbmd0aDtqPG07aisrKXtcXHJcXG4gICAgICAgICAgICAgIHZhciBvYmogPSBpdGVtLnJlc291cmNlW2pdO1xcclxcbiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICAgICAgIGlmKGltZ251bT4yKXtcXHJcXG4gICAgICAgICAgICAgICAgICBicmVhaztcXHJcXG4gICAgICAgICAgICAgICAgfVxcclxcbiAgICAgICAgICAgICAgICBpbWdudW0rKztcXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiAgZGF0YS1waWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtb2JqLmlkJT5cIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQnLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSA1LCBzdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpKSwgJzwvZGl2PlxcbiAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCAnPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlzU3RhciksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJjb2xsZWN0XCIgIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaXNDb2xsZWN0KSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuWPlua2iOaUtuiXj1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuaUtuiXj1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgZGF0YS1jbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmNyZWF0b3JOYW1lKSwgJ1wiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+XFxuICAgICAgICAgIDwvZGl2PiBcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcbiAgICAgICAgPGR0PicsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLnRpdGxlKSwgXCI8L2R0PlxcbiAgICAgICAgPGRkPlxcbiAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMTYsIGl0ZW0uY29udGVudCksIFwiXFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5yZXNvdXJjZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltZ251bSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMCwgbSA9IGl0ZW0ucmVzb3VyY2UubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbWdudW0gPiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdudW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMiwgb2JqLmlkKSwgJ1wiICBkYXRhLXBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMiwgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM2O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgIDwvZGl2PlxcbiAgPC9kaXY+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9jb21tZW50L2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0XHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcclxcblx0PC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG5cdFx0JywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jlc291cmNlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWNsb3NlXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvZGl2Plxcclxcblx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXHJcXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmV2aWV3XCIgaWQ9XCJyZXZpZXdEaXZcIj5cXHJcXG5cdFx0PC9kaXY+ICBcXHJcXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtc2VsZWN0LWJsb2NrXCIgaWQ9XCJyZXZpZXdCbG9ja1wiPlxcclxcblx0XHQ8L2Rpdj4gIFxcclxcblx0XHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWJnXCI+PC9kaXY+XFxyXFxuXHQ8L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcdDxkaXYgY2xhc3M9XCJyZXZpZXctY2xvc2VcIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZXZpZXdcIiBpZD1cInJldmlld0RpdlwiPlxcblx0XHQ8L2Rpdj4gIFxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1zZWxlY3QtYmxvY2tcIiBpZD1cInJldmlld0Jsb2NrXCI+XFxuXHRcdDwvZGl2PiAgXFxuXHRcdDxkaXYgY2xhc3M9XCJyZXZpZXctYmdcIj48L2Rpdj5cXG5cdDwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQxXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8ZGl2IGNsYXNzPVwiYWwtYXJyb3dcIiB0aXRsYT1cIuS4iuS4gOS4quaWh+S7tlwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2PlxcclxcbjwlXFxyXFxuXHRpZih0eXBlID09IDEpe1xcclxcbiU+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWltZy1ibG9ja1wiPlxcclxcblx0XHQ8aW1nIGlkPVwicmV2aWV3SW1nXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWlkJT5cIiBhbGlnbj1cImFic21pZGRsZVwiIC8+XFxyXFxuXHQ8L2Rpdj5cXHJcXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcclxcblx0XHRcdDxkbD5cXHJcXG5cdFx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXHJcXG5cdFx0XHRcdDxkZD5cXHJcXG5cdFx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXHJcXG5cdFx0XHRcdFx05pe26Ze0OiA8JS1jcmVhdGVUaW1lJT5cXHJcXG5cdFx0XHRcdDwvZGQ+XFxyXFxuXHRcdFx0PC9kbD5cXHJcXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1hY3RcIj5cdFx0XHRcXHJcXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tbGVmdFwiPuW3pui9rDwvc3Bhbj5cXHJcXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tcmlnaHRcIj7lj7Povaw8L3NwYW4+XFxyXFxuXHRcdFx0PC9kaXY+XFxyXFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdC1iZ1wiPjwvZGl2Plxcclxcblx0XHQ8L2Rpdj5cdFxcclxcbjwlfWVsc2UgaWYodHlwZSA9PSAyKXslPlxcclxcblx0PGRpdiBpZD1cImRvY3VtZW50Vmlld2VyXCIgY2xhc3M9XCJmbGV4cGFwZXJfdmlld2VyXCI+XFxyXFxuXHRcdFxcclxcblx0PC9kaXY+XFxyXFxuPCV9ZWxzZSBpZih0eXBlID09IDMgfHwgdHlwZT09NCl7JT5cXHJcXG5cdDxkaXYgY2xhc3M9XCJwbGF5ZXJab25lXCI+XFxyXFxuXHQgIDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiIGNvbnRyb2xzIHByZWxvYWQ9XCJub25lXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjRcIlxcclxcblx0ICAgICAgXFxyXFxuXHQgICAgICBkYXRhLXNldHVwPVwie31cIj5cXHJcXG5cdCAgICA8c291cmNlIHNyYz1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaWQlPlwiIHR5cGU9XFwndmlkZW8vbXA0XFwnIC8+XFxyXFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWlkJT5cIiB0eXBlPVxcJ3ZpZGVvL3dlYm1cXCcgLz5cXHJcXG5cdCAgICA8c291cmNlIHNyYz1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaWQlPlwiIHR5cGU9XFwndmlkZW8vb2dnXFwnIC8+XFxyXFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJjYXB0aW9uc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXHJcXG5cdCAgICA8dHJhY2sga2luZD1cInN1YnRpdGxlc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXHJcXG5cdCAgPC92aWRlbz5cXHJcXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXHJcXG5cdFx0PGRsPlxcclxcblx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXHJcXG5cdFx0XHQ8ZGQ+XFxyXFxuXHRcdFx0XHTmlofku7blpKflsI86IDwlLXNpemUlPlxcclxcblx0XHRcdFx05pe26Ze0OiA8JS1jcmVhdGVUaW1lJT5cXHJcXG5cdFx0XHQ8L2RkPlxcclxcblx0XHQ8L2RsPlxcclxcblx0PC9kaXY+XFxyXFxuXFxyXFxuXHQ8L2Rpdj5cXHJcXG48JX1lbHNlIGlmKHR5cGUgPT0gOCl7JT5cXHJcXG5cdDxkaXYgY2xhc3M9XCJ0ZXh0LXJldmlld1wiPjwlLXRleHQlPjwvZGl2Plxcclxcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcclxcblx0XHQ8ZGw+XFxyXFxuXHRcdFx0PGR0PuaWh+S7tuWQjTo8JS1uYW1lJT48L2R0Plxcclxcblx0XHRcdDxkZD5cXHJcXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogPCUtc2l6ZSU+XFxyXFxuXHRcdFx0XHTml7bpl7Q6IDwlLXRpbWUlPlxcclxcblx0XHRcdDwvZGQ+XFxyXFxuXHRcdDwvZGw+XFxyXFxuXHQ8L2Rpdj5cdFxcclxcbjwlfWVsc2V7JT5cXHJcXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXHJcXG5cdFx0PGkgY2xhc3M9XCJpY29uLXR5cGU8JS10eXBlJT5cIj48L2k+XFxyXFxuXHRcdDxkbD5cXHJcXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOjwlLW5hbWUlPjwvZHQ+XFxyXFxuXHRcdFx0PGRkPlxcclxcblx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXHJcXG5cdFx0XHRcdOaXtumXtDogPCUtY3JlYXRlVGltZSU+XFxyXFxuXHRcdFx0PC9kZD5cXHJcXG5cdFx0PC9kbD5cXHJcXG5cdDwvZGl2Plx0XFxyXFxuPCV9JT5cXHJcXG48ZGl2IGNsYXNzPVwiYXItYXJyb3dcIiB0aXRsYT1cIuS4i+S4gOS4quaWh+S7tlwiIGRhdGEtYWN0aW9uPVwic2hvd05leHRcIj48L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8ZGl2IGNsYXNzPVwiYWwtYXJyb3dcIiB0aXRsYT1cIuS4iuS4gOS4quaWh+S7tlwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2PlxcbicpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjtcbiAgICAgICAgICAgICAgICBpZiAodHlwZSA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgY2xhc3M9XCJyZXZpZXctaW1nLWJsb2NrXCI+XFxuXHRcdDxpbWcgaWQ9XCJyZXZpZXdJbWdcIiBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNiwgaWQpLCAnXCIgYWxpZ249XCJhYnNtaWRkbGVcIiAvPlxcblx0PC9kaXY+XFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0XHQ8ZGw+XFxuXHRcdFx0XHQ8ZHQ+5paH5Lu25ZCNOicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBuYW1lKSwgXCI8L2R0Plxcblx0XHRcdFx0PGRkPlxcblx0XHRcdFx0XHTmlofku7blpKflsI86IFwiLCAoX19zdGFjay5saW5lbm8gPSAxMiwgc2l6ZSksIFwiXFxuXHRcdFx0XHRcdOaXtumXtDogXCIsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBjcmVhdGVUaW1lKSwgJ1xcblx0XHRcdFx0PC9kZD5cXG5cdFx0XHQ8L2RsPlxcblx0XHRcdDxkaXYgY2xhc3M9XCJmaWxlLWFjdFwiPlx0XHRcdFxcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0by1sZWZ0XCI+5bem6L2sPC9zcGFuPlxcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0by1yaWdodFwiPuWPs+i9rDwvc3Bhbj5cXG5cdFx0XHQ8L2Rpdj5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0LWJnXCI+PC9kaXY+XFxuXHRcdDwvZGl2Plx0XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PGRpdiBpZD1cImRvY3VtZW50Vmlld2VyXCIgY2xhc3M9XCJmbGV4cGFwZXJfdmlld2VyXCI+XFxuXHRcdFxcblx0PC9kaXY+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjY7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDMgfHwgdHlwZSA9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgY2xhc3M9XCJwbGF5ZXJab25lXCI+XFxuXHQgIDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGNsYXNzPVwidmlkZW8tanMgdmpzLWRlZmF1bHQtc2tpblwiIGNvbnRyb2xzIHByZWxvYWQ9XCJub25lXCIgd2lkdGg9XCI2NDBcIiBoZWlnaHQ9XCIyNjRcIlxcblx0ICAgICAgXFxuXHQgICAgICBkYXRhLXNldHVwPVwie31cIj5cXG5cdCAgICA8c291cmNlIHNyYz1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzEsIGlkKSwgXCJcXFwiIHR5cGU9J3ZpZGVvL21wNCcgLz5cXG5cdCAgICA8c291cmNlIHNyYz1cXFwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD1cIiwgKF9fc3RhY2subGluZW5vID0gMzIsIGlkKSwgXCJcXFwiIHR5cGU9J3ZpZGVvL3dlYm0nIC8+XFxuXHQgICAgPHNvdXJjZSBzcmM9XFxcIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9XCIsIChfX3N0YWNrLmxpbmVubyA9IDMzLCBpZCksICdcIiB0eXBlPVxcJ3ZpZGVvL29nZ1xcJyAvPlxcblx0ICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJzdWJ0aXRsZXNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxuXHQgIDwvdmlkZW8+XFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxkbD5cXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOicsIChfX3N0YWNrLmxpbmVubyA9IDM5LCBuYW1lKSwgXCI8L2R0Plxcblx0XHRcdDxkZD5cXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogXCIsIChfX3N0YWNrLmxpbmVubyA9IDQxLCBzaXplKSwgXCJcXG5cdFx0XHRcdOaXtumXtDogXCIsIChfX3N0YWNrLmxpbmVubyA9IDQyLCBjcmVhdGVUaW1lKSwgXCJcXG5cdFx0XHQ8L2RkPlxcblx0XHQ8L2RsPlxcblx0PC9kaXY+XFxuXFxuXHQ8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlID09IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PGRpdiBjbGFzcz1cInRleHQtcmV2aWV3XCI+JywgKF9fc3RhY2subGluZW5vID0gNDksIHRleHQpLCAnPC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxkbD5cXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOicsIChfX3N0YWNrLmxpbmVubyA9IDUyLCBuYW1lKSwgXCI8L2R0Plxcblx0XHRcdDxkZD5cXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogXCIsIChfX3N0YWNrLmxpbmVubyA9IDU0LCBzaXplKSwgXCJcXG5cdFx0XHRcdOaXtumXtDogXCIsIChfX3N0YWNrLmxpbmVubyA9IDU1LCB0aW1lKSwgXCJcXG5cdFx0XHQ8L2RkPlxcblx0XHQ8L2RsPlxcblx0PC9kaXY+XHRcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcblx0XHQ8aSBjbGFzcz1cImljb24tdHlwZScsIChfX3N0YWNrLmxpbmVubyA9IDYxLCB0eXBlKSwgJ1wiPjwvaT5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gNjMsIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gNjUsIHNpemUpLCBcIlxcblx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gNjYsIGNyZWF0ZVRpbWUpLCBcIlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cdFxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA3MDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxkaXYgY2xhc3M9XCJhci1hcnJvd1wiIHRpdGxhPVwi5LiL5LiA5Liq5paH5Lu2XCIgZGF0YS1hY3Rpb249XCJzaG93TmV4dFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jldmlldy9tYWluLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQyXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICdcdDxkaXYgY2xhc3M9XCJhbC1hcnJvdy1wXCIgZGF0YS1hY3Rpb249XCJzaG93UHJlXCI+PC9kaXY+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWxpc3QtYmxvY2tcIj5cXHJcXG5cdFx0PHVsIGlkPVwicmV2aWV3RmlsZUxpc3RcIj5cXHJcXG5cXHJcXG5cdFx0PCVcXHJcXG5cdFx0dmFyIGlkeCA9IDA7XFxyXFxuXHRcdGZvcih2YXIgaSBpbiBsaXN0KXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcblx0XHQlPlxcclxcblx0XHRcdDxsaSBpZD1cInJldmlldzwlLWl0ZW0uaWQlPlwiICBkYXRhLWlkeD1cIjwlLWlkeCU+XCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiA8JWlmKGl0ZW0uaWQgPT09IGlkKXslPmNsYXNzPVwic2VsZWN0ZWRcIjwlfSU+IHRpdGxlPVwiPCUtaXRlbS5uYW1lJT5cIj5cXHJcXG5cdFx0XHQ8JWlmKGl0ZW0udHlwZT09PTEpeyU+XFxyXFxuXHRcdFx0XHQ8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiBkYXRhLWlkeD1cIjwlLWlkeCU+XCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAvPlxcclxcblx0XHRcdDwlfWVsc2V7JT5cXHJcXG5cdFx0XHRcdDxpIGNsYXNzPVwiZmRuYW1lPCUtaXRlbS5pZCU+IGljb24tdHlwZVwiIGRhdGEtaWR4PVwiPCUtaWR4JT5cIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjwvaT5cXHJcXG5cdFx0XHQ8JX0lPlxcclxcblx0XHRcdDwvbGk+XFxyXFxuXHRcdDwlXFxyXFxuXHRcdFx0XHRpZHgrKztcXHJcXG5cdFx0XHR9XFxyXFxuXHRcdCU+XFxyXFxuXHRcdDwvdWw+XFxyXFxuXHQ8L2Rpdj5cXHJcXG5cdDxkaXYgY2xhc3M9XCJhci1hcnJvdy1wXCIgZGF0YS1hY3Rpb249XCJzaG93TmV4dFwiPjwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1x0PGRpdiBjbGFzcz1cImFsLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJyZXZpZXctbGlzdC1ibG9ja1wiPlxcblx0XHQ8dWwgaWQ9XCJyZXZpZXdGaWxlTGlzdFwiPlxcblxcblx0XHQnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU7XG4gICAgICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0XHRcdDxsaSBpZD1cInJldmlldycsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWlkeD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpZHgpLCAnXCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiAnKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaWQgPT09IGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnY2xhc3M9XCJzZWxlY3RlZFwiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCcgdGl0bGU9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5uYW1lKSwgJ1wiPlxcblx0XHRcdCcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDExO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50eXBlID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHRcdFx0XHQ8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksICdcIiBkYXRhLWlkeD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpZHgpLCAnXCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaXRlbS5pZCksICdcIiAvPlxcblx0XHRcdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0XHRcdDxpIGNsYXNzPVwiZmRuYW1lJywgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0uaWQpLCAnIGljb24tdHlwZVwiIGRhdGEtaWR4PVwiJywgKF9fc3RhY2subGluZW5vID0gMTQsIGlkeCksICdcIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmlkKSwgJ1wiPjwvaT5cXG5cdFx0XHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG5cdFx0XHQ8L2xpPlxcblx0XHRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTc7XG4gICAgICAgICAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHRcdDwvdWw+XFxuXHQ8L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJhci1hcnJvdy1wXCIgZGF0YS1hY3Rpb249XCJzaG93TmV4dFwiPjwvZGl2PicpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jldmlldy9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQzXG4gKiogbW9kdWxlIGNodW5rcyA9IDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDAgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0NVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDMgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImNvbW1lbnQuanMifQ==