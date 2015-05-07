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

	var cgi = __webpack_require__(15).user,
		logout = __webpack_require__(15).logout,
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

	var cgi = __webpack_require__(15).article;
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
	
	var cgi = __webpack_require__(15).article;
	var tmpl = {
		list : __webpack_require__(35),
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
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(15).comment;
	var tmpl = {
		list : __webpack_require__(40)
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

	var cgi = __webpack_require__(15).comment;
	var tmpl = {
		list : __webpack_require__(35),
		rlist : __webpack_require__(37)   //资源列表
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
		cgi = __webpack_require__(15).notify;
	
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
		console.log(data);
		this.checkData(data);
		this.showList();
		this.showOne(data.id);
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

	var cgi = __webpack_require__(15).label,
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
/* 12 */,
/* 13 */,
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
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
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
/* 40 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNjc3YjkwNGQ2Yjg0ZWFjMWE2NmU/MWY1NioqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzPzViMjcqIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanM/ZWM0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L3Bvc3QuanM/OTBhYiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcz9kY2E3Iiwid2VicGFjazovLy8uL3NyYy9qcy9yZXNvdXJjZS9yZXZpZXcuanM/OTNkZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9kYXRhLmpzPzlkZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9wbGF5ZXIvdmlkZW8uZGV2LmpzP2ZmOTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9mbGV4L2ZsZXhwYXBlci5qcz9jZTA3Iiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXJfaGFuZGxlcnMuanM/OTQ0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL2pxLnJvdGF0ZS5qcz82Njg1Iiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0Iiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqcz84OTYwIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2cuZWpzP2Q2N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL29uZS5lanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzPzNmYTIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3Iiwid2VicGFjazovLy8uL3NyYy90cGwvY29tbWVudC9saXN0LmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqcz9jZWZiIiwid2VicGFjazovLy8uL3NyYy90cGwvcmV2aWV3L21haW4uZWpzPzlkMmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXZpZXcvbGlzdC5lanM/NzljOCIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFD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OztBQUVyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxvQjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7O0FBRUE7QUFDQSxtQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNILEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQjs7Ozs7O0FDNVRBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0Esa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFU7QUFDQSxNQUFLLEU7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUEsMEI7Ozs7OztBQ3ZPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0EsMEI7Ozs7OztBQ3RQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOzs7QUFHQSx5Qjs7Ozs7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCO0FBQ0E7QUFDQSxHO0FBQ0Esd0Q7QUFDQSxZO0FBQ0EsRztBQUNBLGlDO0FBQ0EsMkI7QUFDQSxxQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBLEc7QUFDQSxjO0FBQ0EsRztBQUNBLGE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQjtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDhCO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUMsRTs7Ozs7O0FDalFEO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7Ozs7Ozs7QUNsTEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQSxxQjs7Ozs7O0FDblRBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUVBQWdFO0FBQ2hFO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0hBQWlIO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4Q0FBNkMsUUFBUTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQixZQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtB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OztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsK0JBQStCO0FBQ3ZFOztBQUVBO0FBQ0E7QUFDQSw4SEFBNkg7O0FBRTdIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVCxRQUFPOztBQUVQO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGFBQWEsRUFBRTtBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxnQkFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1Qyw0Q0FBNEM7QUFDbkY7O0FBRUE7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsMEJBQXlCLHVDQUF1QztBQUNoRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFhLHNCQUFzQjtBQUNuQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxjQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQ0FBaUMsa0JBQWtCOztBQUVuRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1EQUFrRDtBQUNsRCxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbURBQWtELFlBQVk7QUFDOUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE1BQU07QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsUUFBUTtBQUNuQixZQUFXLFFBQVE7QUFDbkIsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFpQixzQkFBc0I7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFRLElBQUk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLGtCQUFrQjtBQUM3QixZQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF3QixhQUFhOztBQUVyQztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQStCLGFBQWE7O0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUM3TTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyQ0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0Esb0RBQW1ELElBQUksS0FBSyx5QkFBeUIsNkpBQTZKO0FBQ2xQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQSxpREFBZ0QsT0FBTztBQUN2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA2NzdiOTA0ZDZiODRlYWMxYTY2ZVxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xyXG52YXIgdXNlciA9IHJlcXVpcmUoJy4vdXNlci91c2VyJyksXHJcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9pbmZvJyksXHJcblx0YXJ0aWNsZXBvc3QgPSByZXF1aXJlKCcuL2FydGljbGUvcG9zdCcpLFxyXG5cdGxpc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvbGlzdCcpLFxyXG5cdHBvc3QgPSByZXF1aXJlKCcuL2NvbW1lbnQvcG9zdCcpLFxyXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxyXG5cdG5vdGlmeSA9IHJlcXVpcmUoJy4vbm90aWZ5L25vdGlmeScpLFxyXG5cdHJldmlldyA9IHJlcXVpcmUoJy4vcmVzb3VyY2UvcmV2aWV3JyksXHJcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XHJcbnZhciBTdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlciksXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1x0XHJcblxyXG52YXIgbm93QXJ0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdpZCcpLFxyXG5cdG5vd1N1YmplY3RJZCA9IHN0cmlrZXIudXRpbC5nZXRQYXJhbWV0ZXIoJ3NpZCcpO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHVzZXJMb2FkU3ViKGUsZCl7XHJcblx0bmV3IG5vdGlmeS5ub3RpZnkoKTtcclxuXHQgdmFyIGNwb3N0ID0gbmV3IHBvc3QucG9zdChub3dBcnRJZCxub3dTdWJqZWN0SWQpOyBcclxuXHQgd2luZG93LnN0cmlrZXIuY29tbWVudHBvc3QgPSBjcG9zdDtcclxuXHJcbiBcdCB2YXIgY2xpc3QgPSBuZXcgbGlzdC5saXN0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcbiBcdCB3aW5kb3cuc3RyaWtlci5jb21tZW50bGlzdCA9IGNsaXN0O1xyXG5cclxuIFx0IHZhciBhcG9zdCA9IG5ldyBhcnRpY2xlcG9zdC5wb3N0KG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcblx0IFxyXG5cdCB2YXIgYXJ0SW5mbyA9IG5ldyBhcnRpY2xlLmluZm8obm93QXJ0SWQsbm93U3ViamVjdElkKTtcclxuXHQgY3Bvc3QuYmluZEZ1bihjbGlzdCk7XHJcblx0IGNsaXN0LmJpbmQoe1xyXG5cdCBcdGluZm86YXJ0SW5mb1xyXG5cdCB9KTtcclxuXHJcblx0IGFydEluZm8uYmluZCh7XHJcblx0IFx0cG9zdDogYXBvc3RcclxuXHQgfSlcclxufVxyXG5cclxudmFyIGhhbmRsZXJzID0ge1xyXG5cdCd1c2VyTG9hZFN1YicgOiB1c2VyTG9hZFN1YlxyXG59XHJcblxyXG5mb3IodmFyIGkgaW4gaGFuZGxlcnMpe1xyXG5cdFN0cmlrZXIuYmluZChpLGhhbmRsZXJzW2ldKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG5cclxuXHRzdHJpa2VyLmFydGljbGUgPSBhcnRpY2xlO1xyXG5cdHN0cmlrZXIudXNlciA9IHVzZXI7XHJcblx0XHJcblx0d2luZG93LnN0cmlrZXIubXNnID0gbmV3IG1zZy5tZXNzYWdlKCk7XHJcblx0XHJcblx0dXNlci5pbml0KCk7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5pbml0KCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRsb2dvdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubG9nb3V0LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuLy8gVXNlci5hZGRtYW5hZ2UgPSB1c2VyTWFuYWdlLnNob3c7XHJcblxyXG4vLyBVc2VyLmFkZERlZk1hbmFnZSA9IHVzZXJNYW5hZ2UuYWRkRGVmTWFuYWdlO1xyXG5cclxuVXNlci5nZXRNeUluZm8gPSBmdW5jdGlvbihjYil7XHJcblx0Y2dpLmluZm8oZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5teUluZm8gPSByZXMuZGF0YTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm5hdihyZXMuZGF0YSk7XHJcblx0XHRcdCQoXCIjdXNlck5hdlwiKS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRTdWInLHJlcy5jb2RlKTtcclxuXHRcdFx0c3RyaWtlci50cmlnZ2VySGFuZGxlcigndXNlckxvYWRBcnQnLHJlcy5jb2RlKTtcclxuXHRcdFx0Y29uc29sZS5sb2coJ3VzZXJsb2FkJyk7XHJcblx0XHRcdGJpbmRBY3Rpb24oKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxudmFyIG15QWN0ID0ge1xyXG5cdCdsb2dvdXQnIDogZnVuY3Rpb24oKXtcclxuXHRcdGxvZ291dChmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0d2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbnZhciBiaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHQkKFwiI3VzZXJOYXZcIikuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uKXtcclxuXHRcdFx0aWYobXlBY3RbYWN0aW9uXSl7XHJcblx0XHRcdFx0bXlBY3RbYWN0aW9uXSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxuVXNlci5nZXRVc2VyTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0ZGF0YS5saXN0ID0gcmVzLmRhdGE7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblVzZXIuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblx0X3RoaXMuZ2V0TXlJbmZvKCk7XHJcblx0X3RoaXMuZ2V0VXNlckxpc3QoKTtcclxuXHR1c2VyTWFuYWdlLmluaXQoY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL3VzZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRpbmZvIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvb25lLmVqcycpXHJcbn07XHJcblxyXG52YXIgSW5mbyA9IHt9XHJcbm1vZHVsZS5leHBvcnRzID0gSW5mbztcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBhcnRpY2xlSW5mbyA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMuZG9tID0gJCgnI2FydGljbGVJbmZvJyk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cclxuXHR0aGlzLmNMaXN0ID0gd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3Q7XHJcblx0dGhpcy5jcG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cclxuXHR0aGlzLmdldERhdGUoKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOiB0aGlzLmFydElkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRyZXMuZGF0YS5zaWQgPSBfdGhpcy5zdWJJZDtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmluZm8ocmVzLmRhdGEpO1xyXG5cdFx0XHRcclxuXHRcdFx0X3RoaXMuZGF0YSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0X3RoaXMuY0RvbSA9ICQoXCIjY29tbWVudENvdW50XCIpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRzdHJpa2VyLmJpbmQoJ2FydGljbGVFZGl0ZWQnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRkLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0X3RoaXMuZGF0YSA9IGQ7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuaW5mbyhkKTtcclxuXHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXAgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0c3RhdHVzID0gdGFyZ2V0LmRhdGEoJ3N0YXR1cycpO1xyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWQsXHJcblx0XHRcdGlzVG9wIDogIXN0YXR1c1xyXG5cdFx0fVxyXG5cdFx0Y2dpLnNldHRvcChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0dmFyIHRleHQgPSBwYXJhbS5pc1RvcD8n5Y+W5raI572u6aG2Jzon572u6aG2JyxcclxuXHRcdFx0XHRcdHN0ID0gcGFyYW0uc3RhdHVzPzA6MTAwO1xyXG5cdFx0XHRcdHRhcmdldC50ZXh0KHRleHQpLmRhdGEoJ3N0YXR1cycsc3QpO1xyXG5cdFx0XHR9XHJcblx0XHR9KVx0XHRcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Y29uc29sZS5sb2coaWQsJ3NldHVwJyk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKXtcclxuXHRzdHJpa2VyLnRyaWdnZXIoJ2VkaXRBcnRpY2xlJyx0aGlzLmRhdGEpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHRjb25zb2xlLmxvZygnZGVsZXRlJyk7XHRcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl0aW1lID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmNMaXN0Lm9yZGVyYnljcmVhdGUoKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieXVwZGF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUudXBkYXRlQ291bnQgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZGF0YS5jb21tZW50Q291bnQrKztcclxuXHR0aGlzLmNEb20udGV4dCh0aGlzLmRhdGEuY29tbWVudENvdW50KTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLmRhdGEucmVzb3VyY2VMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbkluZm8uaW5mbyA9IGFydGljbGVJbmZvO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFQb3N0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjAsXHJcblx0c3RyaWtlciA9IHdpbmRvdy5zdHJpa2VyO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhUG9zdDtcclxudmFyIGxpc3REb20gPSAkKFwiI2FydGljbGVMaXN0XCIpLFxyXG5cdHJlc0xpc3QgPSBbXTtcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcdFxyXG5cclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5hcnRpY2xlO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvbGlzdC5lanMnKSxcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcblxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuZnVuY3Rpb24gcmVzZXRGcm9tKHRhcmdldCl7XHJcblx0dGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCcnKTtcclxuXHR0YXJnZXQuZmluZCgnLnBvcC1yZXMnKS5odG1sKCcnKS5oaWRlKCk7XHJcbn07XHJcblxyXG5hUG9zdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0bmV3IGFQb3N0LnBvc3QoKTtcclxufVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMucERvbSA9ICQoXCIjcG9zdEFydGljbGVcIik7IC8v5bqV6YOo5Y+R6KGo5qGGXHJcblx0dGhpcy5jRG9tID0gJChcIiNjcmVhdGVBcnRpY2xlXCIpOyAvL+W8ueWHuuWPkeihqOahhlxyXG5cdHRoaXMucHJlc0RvbSA9IHRoaXMucERvbS5maW5kKCcucG9zdC1yZXMnKTsvLy8gPSAkKFwiXCIpXHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5jRG9tLmZpbmQoJy5wb3AtcmVzJyk7XHJcblx0dGhpcy5jdGl0RG9tID0gdGhpcy5jRG9tLmZpbmQoJy5tb2RhbC10aXRsZScpO1xyXG5cdHRoaXMubW9kZWwgPSAncG9zdCc7Ly9wb3N0IOW6lemDqCBwb3Ag5by55Ye656qX5Y+jXHJcblxyXG5cdHRoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5jRG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGlmKF90aGlzLmlzRWRpdCl7XHJcblx0XHRcdF90aGlzLmN0aXREb20udGV4dCgn5L+u5pS55biW5a2QJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfmlrDlu7rluJblrZAnKTtcclxuXHRcdH1cclxuXHRcdFxyXG5cdFx0c2V0VGltZW91dChmdW5jdGlvbigpe1xyXG5cdFx0XHRfdGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS5mb2N1cygpO1xyXG5cdFx0fSwxMDAwKVx0XHJcblx0XHRfdGhpcy5tb2RlbCA9ICdwb3AnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0XHR0aGlzLnJlc01hcCA9IHt9O1x0XHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3Bvc3QnO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHR0aGlzLnRhcmdldDtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEZ1biA9IGZ1bmN0aW9uKCl7XHJcblxyXG59O1xyXG5cclxuXHJcbi8v5Y+W6YCJ5oup55qE6LWE5rqQXHJcbnBvc3QucHJvdG90eXBlLmdldFJlc0xpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Zm9yKHZhciBpIGluIHRoaXMucmVzTWFwKXtcclxuXHRcdGxpc3QucHVzaCh0aGlzLnJlc01hcFtpXS5pZCk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG4vL+agueaNrmRvbeiOt+WPluebuOWFs+eahOWPguaVsC5cclxucG9zdC5wcm90b3R5cGUuZ2V0UGFyYW0gPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBuYW1lID0gdGFyZ2V0LmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoKSxcclxuXHRcdGNvbnRlbnQgPSB0YXJnZXQuZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpLnZhbCgpO1xyXG5cclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHR0aXRsZSA6IG5hbWUsXHJcblx0XHRjb250ZW50IDogY29udGVudCxcclxuXHRcdHN1YmplY3RJZCA6IG5vd1N1YklkLFxyXG5cdFx0bGFiZWxzIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHBhcmFtO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZW1vdmVSZXMgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHRkZWxldGUgdGhpcy5yZXNNYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdGlmKHRoaXMuY3Jlc0RvbS5maW5kKCcudGFnJykubGVuZ3RoID09PSAwKXtcclxuXHRcdFx0XHR0aGlzLmNyZXNEb20uaGlkZSgpO1xyXG5cdFx0XHR9XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0aWYodGhpcy5wcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMucHJlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cdFxyXG5cdH1cclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKGQpe1xyXG5cdHRoaXMuaXNFZGl0ID0gdHJ1ZTtcclxuXHR0aGlzLmRhdGEgPSBkO1xyXG5cdHRoaXMuY0RvbS5tb2RhbCgnc2hvdycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJykudmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKGQuY29udGVudCk7XHJcblxyXG5cdGlmKGQucmVzb3VyY2VMaXN0Lmxlbmd0aCl7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHJcblx0XHRmb3IodmFyIGkgaW4gZC5yZXNvdXJjZUxpc3Qpe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VMaXN0W2ldO1xyXG5cdFx0XHR0aGlzLnJlc0xpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdFx0dGhpcy5yZXNNYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0fVxyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0bGlzdCA6IGQucmVzb3VyY2VMaXN0XHJcblx0XHR9KTtcclxuXHRcdHRoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcblx0fVxyXG59XHJcblxyXG5cclxucG9zdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcdFxyXG5cdC8v6LWE5rqQ5LiK5Lyg5a6M5oiQ55qE6YCa55+lXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnZWRpdEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5lZGl0KGQpO1xyXG5cdH0pO1xyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3VwbG9hZEFydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0X3RoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdFx0aWYod2luZG93LnN0cmlrZXIuY29tbWVudHNob3cpe1xyXG5cdFx0XHQkKHN0cmlrZXIpLnRyaWdnZXIoJ3VwbG9hZEZpbGUnLGQpO1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0XHRfdGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLnByZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9O1xyXG5cclxuXHR0aGlzLnBEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5jRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcclxuXHJcblx0JChcIiNmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdFx0aWYoX3RoaXMuZmlsZXVwbG9hZCl7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVx0XHRcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjZmlsZUZvcm1cIikuc3VibWl0KCk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tLmZpbmQoJ2lucHV0JykudmFsKCcnKTtcclxuXHR0aGlzLnBEb20uZmluZCgndGV4dGFyZWEnKS52YWwoJycpO1xyXG5cclxuXHR0aGlzLmNEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMuY0RvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcdFxyXG5cdGNvbnNvbGUubG9nKDIzMzMzMyk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnBvc3QgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBwdCA9IHRoaXMudGFyZ2V0LmRhdGEoJ3RhcmdldCcpO1xyXG5cdC8vY29uc29sZS5sb2cocFRhcmdldCk7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHB0KTtcclxuXHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHRoaXMuZ2V0UGFyYW0ocFRhcmdldCk7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0aWYocGFyYW0udGl0bGUgPT09ICcnIHx8IHBhcmFtLmNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblxyXG5cclxuXHRpZih0aGlzLmlzRWRpdCl7XHJcblx0XHRwYXJhbS5zdWJqZWN0SWQgPSB0aGlzLmRhdGEuc3ViamVjdF9pZDtcclxuXHRcdHBhcmFtLmFydGljbGVJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdGNnaS5lZGl0KHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5jRG9tLm1vZGFsKCdoaWRlJyk7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlRWRpdGVkJyxyZXMuZGF0YSk7XHJcblx0XHRcdFx0Ly9zdHJpa2VyLmFydGljbGUuYXBwZW5kVG9MaXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0fSk7XHRcclxuXHR9ZWxzZXtcclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHRcdFx0aWYocFRhcmdldC5oYXNDbGFzcygnbW9kYWwnKSl7XHJcblx0XHRcdFx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignbmV3YXJ0aWNsZScscmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1cclxufVxyXG4vL+mHjee9ruS4gOS4qmZyb21cclxuYVBvc3QucmVzZXQgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdHZhciBwVGFyZ2V0ID0gJCh0YXJnZXQuZGF0YSgndGFyZ2V0JykpO1xyXG5cdGlmKHBUYXJnZXQubGVuZ3RoID09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0cmVzZXRGcm9tKHBUYXJnZXQpO1xyXG59XHJcblxyXG5hUG9zdC5wb3N0ID0gcG9zdDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2FydGljbGUvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvY29tbWVudC9saXN0LmVqcycpXHJcbn07XHJcblxyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG52YXIgQ29tbWVudCA9IHt9XHJcblxyXG52YXIgbGlzdCA9IGZ1bmN0aW9uKGlkLHNpZCl7XHJcblx0dGhpcy5kb20gPSAkKFwiI2NvbW1lbnRMaXN0XCIpO1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnXHJcblxyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMubGltaXQgPSAzO1xyXG5cclxuXHR0aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHR0aGlzLnBvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHR0aGlzLm1zZyA9IHdpbmRvdy5zdHJpa2VyLm1zZztcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLnJkYXRhID0ge307XHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnNhdmVEYXRhID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0Zm9yKHZhciBpIGluIGRhdGEubGlzdCl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdHRoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdGlmKGRhdGEpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogW2RhdGFdXHJcblx0XHR9KTtcdFxyXG5cdFx0JChcIi5jb21tZW50XCIrZGF0YS5pZCkucmVwbGFjZVdpdGgoaHRtbCk7XHJcblx0fVxyXG5cdFxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0c3RhcnQgOiB0aGlzLnN0YXJ0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fTtcclxuXHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnN0YXJ0ICs9IF90aGlzLmxpbWl0O1xyXG5cdFx0XHRfdGhpcy5zYXZlRGF0YShyZXMuZGF0YSk7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0X3RoaXMuZG9tLmFwcGVuZChodG1sKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcdFxyXG5cdGlmKHRoaXMubWFwW2lkXSl7XHJcblx0XHR0aGlzLnBvc3QuZWRpdCh0aGlzLm1hcFtpZF0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieWNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ2NyZWF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5vcmRlciA9PT0gJ3VwZGF0ZVRpbWUnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHRcclxuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc3RhcnQgPSAwO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1x0XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5yZXBsYXkgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0Y25hbWUgPSB0aGlzLnRhcmdldC5kYXRhKCdjbmFtZScpO1xyXG5cclxuXHR0aGlzLnBvc3QucmVwbGF5KGlkLGNuYW1lKTtcclxufVx0XHJcblxyXG5saXN0LnByb3RvdHlwZS5zZXR1cCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNTdGFyIDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+i1nic6J+W3sui1nic7XHJcblx0XHRjZ2kuc3RhcihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNTdGFyKTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuY29sbGVjdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdHN0YXIgPSBwYXJzZUludCh0aGlzLnRhcmdldC5kYXRhKCdzdGF0dXMnKSk7XHJcblxyXG5cdGlmKCFzdGFyKXtcclxuXHRcdHN0YXIgPSAwO1xyXG5cdH1cclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIGRvbSA9IHRoaXMudGFyZ2V0O1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRjb21tZW50SWQgOiBpZCxcclxuXHRcdFx0aXNDb2xsZWN0IDogc3RhciA/IDAgOjFcclxuXHRcdH07XHJcblx0XHR2YXIgdGV4dCA9IHN0YXI/J+aUtuiXjyc6J+WPlua2iOaUtuiXjyc7XHJcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmRhdGEoJ3N0YXR1cycscGFyYW0uaXNDb2xsZWN0KTtcclxuXHRcdFx0XHRkb20uaHRtbCgnPHNwYW4+PC9zcGFuPicrdGV4dCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblxyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHRcdHRoaXMubXNnLmNvbmZpcm0oJ+ehruWumuimgeWIoOmZpOivpeWbnuWkjT8nLG51bGwsZnVuY3Rpb24oKXtcclxuXHRcdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRcdGNvbW1lbnRJZCA6IGlkXHJcblx0XHRcdH07XHJcblx0XHRcdGNnaS5kZWxldGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0XHQkKFwiLmNvbW1lbnRcIitpZCkucmVtb3ZlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0bGlzdCA6IFtkYXRhXVxyXG5cdH0pO1xyXG5cdHRoaXMuYXJ0SW5mby51cGRhdGVDb3VudCgpO1xyXG5cdHRoaXMuZG9tLnByZXBlbmQoaHRtbCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0SW5mbyA9IG9iai5pbmZvO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsRG9tLnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbliLDlupXkuoZcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcpO1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkTW9yZSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcdFx0XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmxpc3QucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBpZCA9IHRhcmdldC5kYXRhKCdwaWQnKSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLm1hcFtwaWRdLnJlc291cmNlXHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbkNvbW1lbnQubGlzdCA9IGxpc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIENvbW1lbnQgPSB7fVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNwb3N0QXJlYVwiKTtcclxuXHR0aGlzLnBvcERvbSA9ICQoXCIjY3JlYXRlQ29tbWVudFwiKTtcclxuXHR0aGlzLmNvbnRlbnREb20gPSB0aGlzLmRvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tID0gdGhpcy5wb3BEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20gPSB0aGlzLnBvcERvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5wb3BEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHR0aGlzLmN0aXREb20gPSB0aGlzLnBvcERvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0aWNsZUxpc3QgPSBvYmoubGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY2hhbmdlQXJ0aWNsZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLmFydElkID0gaWQ7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihsaXN0KXtcclxuXHR0aGlzLmNMaXN0ID0gbGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dGhpcy5jb250ZW50RG9tLnZhbCgn5Zue5aSNICcrbmFtZSsnOicpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50RG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6ICcnLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5jb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcclxuXHR0aGlzLmlzRWRpdCA9IHRydWU7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tLnZhbChkLmNvbnRlbnQpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20udmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuZGF0YSA9IGQ7XHJcblxyXG5cdGlmKGQucmVzb3VyY2Upe1xyXG5cdFx0Zm9yKHZhciBpIGluIGQucmVzb3VyY2Upe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VbaV07XHJcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHR9XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG5cdH1cclxuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGNvbnRlbnQgPSB0aGlzLnBvcENvbnRlbnREb20udmFsKCk7XHJcblx0dmFyIHRpdGxlID0gdGhpcy5wb3BUaXRsZURvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiB0aXRsZSxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLmNvbW1lbnRJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRjZ2kuZWRpdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC51cGRhdGUocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnNob3dQb3N0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuY2hhbmdlQXJ0aWNsZShpZCk7XHJcblx0dGhpcy5wb3BEb20ubW9kYWwoJ3Nob3cnKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblxyXG5cdFx0aWYodGhpcy5wb3BEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dmFyIHVwbG9hZENvbXAgID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LnVwbG9hZENvbXApe1xyXG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0XHR1cGxvYWRDb21wKGQpO1xyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR3aW5kb3cudXBsb2FkQ29tcCA9IHVwbG9hZENvbXA7XHJcblx0fVxyXG5cclxuXHQkKFwiI2NjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoX3RoaXMuaXNFZGl0KXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfkv67mlLnlm57lpI0nKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+aWsOW7uuWbnuWkjScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLmZvY3VzKCk7XHJcblx0XHR9LDEwMDApXHRcdFxyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSB0cnVlO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnBvcERvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyA9IGZhbHNlO1xyXG5cdFx0X3RoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMucG9wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbkNvbW1lbnQucG9zdCA9IHBvc3Q7XHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0aWYoZCA9PSAxMDAxKXtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChkKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnIHx8ICcnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KG1zZykpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHRcdFxyXG59XHJcblxyXG5kYi5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vbXNnLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/pgJrnn6VcclxudmFyIG5vdGlmeSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5ub3RpZnksXHJcblx0Y2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLm5vdGlmeTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2dsaXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21zZy5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn1cclxuXHJcbnZhciBub3RpZnlPYmogPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNub3RpZnlMaXN0XCIpO1xyXG5cdHRoaXMudGlwc0RvbSA9ICQoXCIjdXNlck5hdiAubXNnIGRpdlwiKTtcclxuXHJcblx0dGhpcy5tc2dOdW0gPSAwO1xyXG5cdHRoaXMuZ2V0KCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5zZWFyY2goe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNvbnNvbGUubG9nKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKHJlcy5kYXRhLmxpc3QubGVuZ3RoKXtcclxuXHRcdFx0XHRfdGhpcy5tc2dOdW0gPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKS5zaG93KCk7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy50aXBzRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdGlmKF90aGlzLm1zZ051bSl7XHJcblx0XHRcdGlmKF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycpKXtcclxuXHRcdFx0XHRfdGhpcy5kb20uaGlkZSgpO1xyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmRvbS5zaG93KCk7XHRcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGhyZWYgPSB0YXJnZXQuZGF0YSgnaHJlZicpLFxyXG5cdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0XHRyZWFkID0gdGFyZ2V0LmRhdGEoJ3JlYWQnKTtcclxuXHJcblxyXG5cdFx0aWYoaHJlZil7XHJcblx0XHRcdHdpbmRvdy5vcGVuKGhyZWYpO1xyXG5cdFx0XHRpZihyZWFkID09ICcnKXtcclxuXHRcdFx0XHRjZ2kucmVhZCh7XHJcblx0XHRcdFx0XHRub3RpZnlJZCA6IGlkXHJcblx0XHRcdFx0fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdF90aGlzLm1zZ051bS0tO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubm90aWZ5Lm5vdGlmeSA9IG5vdGlmeU9iajtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy9cclxucmVxdWlyZSgnLi4vbGliL3BsYXllci92aWRlby5kZXYnKTtcclxucmVxdWlyZSgnLi4vbGliL2ZsZXgvZmxleHBhcGVyJyk7XHJcbnJlcXVpcmUoJy4uL2xpYi9mbGV4L2ZsZXhwYXBlcl9oYW5kbGVycycpO1xyXG5yZXF1aXJlKCcuLi9saWIvanEucm90YXRlJyk7XHJcbnZhciB0bXBsID0ge1xyXG5cdGJvZHkgOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L2JvZHkuZWpzJyksXHJcblx0bWFpbiA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXZpZXcvbWFpbi5lanMnKSxcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jldmlldy9saXN0LmVqcycpXHJcbn1cclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgZGIgPSB7fVxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xyXG5cclxudmFyIGdldFNpemUgPSBmdW5jdGlvbihzaXplKXtcclxuICAgIHZhciBwcmVjID0gMztcclxuICAgIHZhciBzaXplID0gTWF0aC5yb3VuZChNYXRoLmFicyhzaXplKSk7XHJcblx0dmFyIHVuaXRzID0gWydCJywnS0InLCdNQicsXCJHQlwiLFwiVEJcIl07XHJcblxyXG5cdHZhciB1bml0ID0gIE1hdGgubWluKDQsIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLmxvZygyKSAvIDEwKSk7XHJcblxyXG4gICAgc2l6ZSA9IHNpemUgKiBNYXRoLnBvdygyLCAtMTAgKiB1bml0KTtcclxuICAgIHZhciBkaWdpID0gcHJlYyAtIDEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMTApKTtcclxuICAgIHNpemUgPSBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLnBvdygxMCwgZGlnaSkpICogTWF0aC5wb3coMTAsIC1kaWdpKTtcclxuICAgIHJldHVybiBnZXROdW1zKHNpemUpICsgdW5pdHNbdW5pdF07ICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXROdW1zID0gZnVuY3Rpb24oeCl7XHJcblx0aWYoeD09PTApe1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cdHZhciBmX3ggPSBwYXJzZUZsb2F0KHgpOyAgXHJcblx0aWYgKGlzTmFOKGZfeCkpICBcclxuXHR7ICBcclxuXHQvL2FsZXJ0KCdmdW5jdGlvbjpjaGFuZ2VUd29EZWNpbWFsLT5wYXJhbWV0ZXIgZXJyb3InKTsgIFxyXG5cdFx0cmV0dXJuIDA7ICBcclxuXHR9ICBcclxuXHR2YXIgZl94ID0gTWF0aC5jZWlsKHgqMTAwKS8xMDA7ICBcclxuXHR2YXIgc194ID0gZl94LnRvU3RyaW5nKCk7ICBcclxuXHR2YXIgcG9zX2RlY2ltYWwgPSBzX3guaW5kZXhPZignLicpOyAgXHJcblx0aWYgKHBvc19kZWNpbWFsIDwgMCkgIFxyXG5cdHtcclxuXHRcdHJldHVybiBmX3g7XHJcblx0fSAgXHJcblx0d2hpbGUgKHNfeC5sZW5ndGggPD0gcG9zX2RlY2ltYWwgKyAyKSAgXHJcblx0eyAgXHJcblx0XHRzX3ggKz0gJzAnOyAgXHJcblx0fSBcclxuXHRyZXR1cm4gc194OyAgICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJldmlldyhkYXRhKXtcclxuXHRnZXRUaW1lID0gd2luZG93LnN0cmlrZXIudXRpbC5mb3JtYXRUaW1lO1xyXG5cclxuXHR0aGlzLmJnID0gJCgnPGRpdiBpZD1cInJldmlld0Jnc1wiPjwvZGl2PicpO1xyXG5cdHRoaXMuZG9tID0gJCgnPGRpdiBpZD1cInJldmlld1dpblwiPjwvZGl2PicpO1xyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMubm93SWQgPSBkYXRhLmlkO1xyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5saXN0ID0gW107XHJcblx0dGhpcy5saXN0SXRlbSA9IFtdO1xyXG5cclxuXHJcblx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmJnKTtcclxuXHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZG9tKTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLmJvZHkoKTtcclxuXHR0aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHR0aGlzLnJldmlld0RpdiA9ICQoXCIjcmV2aWV3RGl2XCIpO1xyXG5cdHRoaXMucmV2aWV3QmxvY2sgPSAkKFwiI3Jldmlld0Jsb2NrXCIpO1xyXG5cclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHJcblx0dGhpcy5zaG93TGlzdCgpO1xyXG5cdHRoaXMuc2hvd09uZSgpO1xyXG5cclxuXHR0aGlzLnNob3coKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufTtcclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvd0xpc3QgPSBmdW5jdGlvbihpZCl7XHJcblx0dmFyIGxpc3RIdG1sID0gdG1wbC5saXN0KHtcclxuXHRcdGxpc3QgOiB0aGlzLmxpc3RJdGVtLFxyXG5cdFx0aWQgOiB0aGlzLm5vd0lkXHJcblx0fSk7XHJcblx0XHJcblx0dGhpcy5yZXZpZXdCbG9jay5odG1sKGxpc3RIdG1sKTtcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93T25lID0gZnVuY3Rpb24oaWQsaWR4KXtcclxuXHR2YXIgbm93SWQgPSBpZCB8fCB0aGlzLm5vd0lkO1xyXG5cdHZhciBvYmogPSB0aGlzLmRhdGFbbm93SWRdO1xyXG5cclxuXHRpZihvYmope1xyXG5cdFx0aWYob2JqLnR5cGUgPT09IDIpe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubWFpbihvYmopO1xyXG5cdFx0XHR0aGlzLnJldmlld0Rpdi5odG1sKGh0bWwpO1x0XHRcdFxyXG4gICAgICAgICAgICAgIHZhciBwdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCcvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JytvYmouaWQpO1xyXG4gICAgICAgICAgICAgICQoJyNkb2N1bWVudFZpZXdlcicpLkZsZXhQYXBlclZpZXdlcihcclxuICAgICAgICAgICAgICAgIHsgY29uZmlnIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNXRkZpbGUgOiBwdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzRGlyZWN0b3J5IDogJy9qcy9saWIvZmxleC8nLFxyXG4gICAgICAgICAgICAgICAgICAgIFNjYWxlIDogMC44LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UcmFuc2l0aW9uIDogJ2Vhc2VPdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UaW1lIDogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21JbnRlcnZhbCA6IDAuMixcclxuICAgICAgICAgICAgICAgICAgICBGaXRQYWdlT25Mb2FkIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBGaXRXaWR0aE9uTG9hZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEZ1bGxTY3JlZW5Bc01heFdpbmRvdyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFByb2dyZXNzaXZlTG9hZGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1pblpvb21TaXplIDogMC4yLFxyXG4gICAgICAgICAgICAgICAgICAgIE1heFpvb21TaXplIDogNSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hNYXRjaEFsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEluaXRWaWV3TW9kZSA6ICdQb3J0cmFpdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVyaW5nT3JkZXIgOiAnZmxhc2gnLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0QXRQYWdlIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld01vZGVUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21Ub29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hdlRvb2xzVmlzaWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yVG9vbHNWaXNpYmxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFdNb2RlIDogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlQ2hhaW46ICd6aF9DTidcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgKTsgIFx0XHRcclxuICAgICAgICB9ZWxzZSBpZihvYmoudHlwZSA9PT0gOCl7XHJcbiAgICAgICAgXHR2YXIgcHVybCA9ICdjZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nK29iai5pZDtcclxuICAgICAgICBcdHZhciB0ZXh0ID0gJC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IHB1cmwsXHJcblx0XHRcdFx0YXN5bmM6IGZhbHNlLFxyXG5cdFx0XHRcdGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5yZXNwb25zZVRleHQ7XHJcblxyXG4gICAgICAgIFx0b2JqLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIFx0Y29uc29sZS5sb2cob2JqKTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm1haW4ob2JqKTtcclxuXHRcdFx0dGhpcy5yZXZpZXdEaXYuaHRtbChodG1sKTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5tYWluKG9iaik7XHJcblx0XHRcdHRoaXMucmV2aWV3RGl2Lmh0bWwoaHRtbCk7ICAgICAgICBcdFxyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBpZHggPSAwO1xyXG5cdGZvcih2YXIgaSBpbiBkYXRhLmxpc3Qpe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHR0aGlzLm1hcFtpdGVtLmlkXSA9IGlkeDtcclxuXHRcdGlmKGl0ZW0uaWQgPT09IHRoaXMubm93SWQpe1xyXG5cdFx0XHR0aGlzLm5vd0lkeCA9IGlkeDtcclxuXHRcdH1cclxuXHRcdHRoaXMubGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy5saXN0SXRlbS5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdGl0ZW0uc2l6ZSA9IGdldFNpemUoaXRlbS5zaXplKTtcclxuXHRcdGl0ZW0udGltZSA9IGdldFRpbWUoaXRlbS5jcmVhdGVUaW1lKTtcclxuXHRcdHRoaXMuZGF0YVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRpZHgrKztcclxuXHR9XHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5iZy5zaG93KCk7XHJcblx0dGhpcy5kb20uc2hvdygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuYmcuaGlkZSgpO1xyXG5cdHRoaXMuZG9tLmhpZGUoKTtcdFxyXG5cdHRoaXMubGlzdCA9IFtdO1xyXG5cdHRoaXMubGlzdEl0ZW0gPSBbXTtcclxuXHR0aGlzLnJldmlld0Jsb2NrLmh0bWwoJycpO1xyXG59XHJcblxyXG4vL+abtOaNouaVsOaNrlxyXG5yZXZpZXcucHJvdG90eXBlLmNoYW5nZURhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHR0aGlzLnNob3dMaXN0KCk7XHJcblx0dGhpcy5zaG93T25lKGRhdGEuaWQpO1xyXG5cdHRoaXMuc2hvdygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dOZXh0ID0gZnVuY3Rpb24oZSl7XHJcblx0aWYodGhpcy5ub3dJZHggPCB0aGlzLmxpc3QubGVuZ3RoLTEpe1xyXG5cdFx0dGhpcy5ub3dJZHgrK1xyXG5cdH1cclxuXHR0aGlzLm5vd0lkID0gdGhpcy5saXN0W3RoaXMubm93SWRdO1xyXG5cdHRoaXMucmV2aWV3QmxvY2suZmluZCgnbGknKS5lcSh0aGlzLm5vd0lkeCkuY2xpY2soKTtcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93UHJlID0gZnVuY3Rpb24oZSl7XHJcblx0aWYodGhpcy5ub3dJZHggPiAwKXtcclxuXHRcdHRoaXMubm93SWR4LS07XHJcblx0fVxyXG5cdHRoaXMubm93SWQgPSB0aGlzLmxpc3RbdGhpcy5ub3dJZF07XHJcblx0dGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpLmVxKHRoaXMubm93SWR4KS5jbGljaygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dJZHggPSBmdW5jdGlvbihlKXtcclxuXHRcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93RmlsZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHRoaXMubm93SWR4ID0gdGhpcy5tYXBbaWRdO1xyXG5cdFx0dGhpcy5zaG93T25lKGlkKTtcclxuXHRcdHZhciBsaXN0ID0gdGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpO1xyXG5cdFx0bGlzdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdCQoXCIjcmV2aWV3XCIraWQpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0Ly9saXN0W3RoaXMubm93SWR4XS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHR9XHJcblxyXG5cclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdC8vX3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVx0XHRcdFxyXG5cdH0pXHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaGlkZSgpO1xyXG59XHJcblxyXG5kYi5yZXZpZXcgPSByZXZpZXc7XHJcblxyXG52YXIgcnY7XHJcblxyXG5zdHJpa2VyLmJpbmQoJ3JldmlldycsZnVuY3Rpb24oZSxkKXtcclxuXHRpZighcnYpe1xyXG5cdFx0cnYgPSBuZXcgcmV2aWV3KGQpO1xyXG5cdH1lbHNle1xyXG5cdFx0cnYuY2hhbmdlRGF0YShkKTtcclxuXHR9XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvcmVzb3VyY2UvcmV2aWV3LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmxhYmVsLFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5sYWJlbCxcclxuXHRzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgTGFiZWwgPSB7fSxcclxuXHRfdGhpcyA9IExhYmVsO1xyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL2xpc3QuZWpzJyksXHJcblx0b25lIDogcmVxdWlyZSgnLi4vLi4vdHBsL2xhYmVsL29uZS5lanMnKVxyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBMYWJlbDtcclxuXHJcbmZ1bmN0aW9uIGdldExpc3QoKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmxhYmVsID0gZnVuY3Rpb24obmFtZSl7XHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK25hbWUpO1xyXG5cclxuXHR0aGlzLm5vd0RvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYWRkRG9tID0gdGhpcy5kb20uZmluZCgnLmFkZC1sYWJlbC1hcmVhJyk7XHJcblx0Ly8gaWYodHlwZSA9PT0gJ3N1Yicpe1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkU3ViTGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd1N1YkxhYmVsJyk7XHJcblx0Ly8gfWVsc2V7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRBcnRMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93QXJ0TGFiZWwnKTtcclxuXHQvLyB9XHJcblx0dGhpcy5saXN0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmJ0bkRvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5idG4nKTtcclxuXHR0aGlzLmlucHV0RG9tID0gdGhpcy5hZGREb20uZmluZCgnLmZvcm0tY29udHJvbCcpO1xyXG5cdHRoaXMuX3NlbGVjdERvbTsvL+W9k+WJjemAieS4reeahOWFg+e0oFxyXG5cclxuXHQvL+m7mOiupOayoeacieagh+etvlxyXG5cdHRoaXMubm93RG9tLmhpZGUoKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblxyXG5cdC8v5bey57uP6YCJ5Lit55qEaWRtYXBcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblxyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5nZXREYXRhKCk7XHRcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdC8vXHJcblx0Ly8gdGhpcy5ub3dEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0Ly8gXHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cclxuXHQvLyBcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdC8vIFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdC8vIFx0fVxyXG5cdC8vIH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgdmFsID0gdGhpcy5pbnB1dERvbS52YWwoKTtcclxuXHRpZih2YWwgIT09ICcnKXtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0bmFtZSA6IHZhbFxyXG5cdFx0fTtcclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0X3RoaXMubWFwW3Jlcy5kYXRhLmlkXSA9IHJlcy5kYXRhO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OltyZXMuZGF0YV19KTtcclxuXHRcdFx0XHRfdGhpcy5saXN0RG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd2xpc3QgPSBmdW5jdGlvbihlKXtcclxuXHQvLyAvY29uc29sZS5sb2codGhpcy5fc2VsZWN0RG9tKTtcclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5oaWRlKCk7XHJcblx0fVxyXG5cdC8vdGhpcy5hZGREb20uc2hvdygpO1xyXG5cdC8vdGhpcy5ub3dEb20uc2hvdygpO1xyXG5cclxuXHQvL2Z1aS1jcm9zc1xyXG5cdC8vZnVpLXBsdXNcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmxpc3Qoe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6cmVzLmRhdGF9KTtcclxuXHRcdFx0X3RoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRmb3IodmFyIGkgPSAwLGw9cmVzLmRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHRcdHZhciBpdGVtID0gcmVzLmRhdGFbaV07XHJcblx0XHRcdFx0X3RoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2hvd0VkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHQgdmFyIGh0bWwgPSB0bXBsLm9uZSh7bGlzdDpkYXRhfSk7XHJcblx0IHRoaXMubm93RG9tLmh0bWwoaHRtbCkuc2hvdygpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuc2VsZWN0ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy5fc2VsZWN0RG9tLmRhdGEoJ2lkJyk7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0bGlzdCA6IFt0aGlzLm1hcFtpZF1dXHJcblx0fVxyXG5cclxuXHR0aGlzLmlkbWFwW2lkXSA9IDE7XHJcblx0aWYodGhpcy5ub3dEb20uZmluZCgnLmxhYmVsJytpZCkubGVuZ3RoID09PSAwKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5vbmUocGFyYW0pO1xyXG5cdFx0dGhpcy5ub3dEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXRMYWJlbExpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBsaXN0ID0gW107XHJcblx0Ly8gY29uc29sZS5sb2codGhpcy5ub3dEb20uZmluZChcIi50YWdcIikubGVuZ3RoKTtcclxuXHQvLyB0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5lYWNoKGZ1bmN0aW9uKGUpe1xyXG5cdC8vIFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdC8vIFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cdC8vIFx0aWYoaWQpe1xyXG5cdC8vIFx0XHRsaXN0LnB1c2goaWQpO1xyXG5cdC8vIFx0fVx0XHRcdFx0XHJcblx0Ly8gfSlcdFxyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGxpc3QucHVzaChpKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMubm93RG9tLmh0bWwoJycpLmhpZGUoKTtcclxuXHJcblx0dmFyIGRvbSA9IHRoaXMuZG9tLmZpbmQoJy5zaG93LWJ0bicpO1xyXG5cdGRvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1x0XHJcbn1cclxuXHJcbi8v5Yig6ZmkXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdHAucmVtb3ZlKCk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJ2YXIgcmVxdWVzdCA9IHJlcXVpcmUoJy4vcmVxdWVzdCcpLFxyXG5cdG1lc3NhZ2UgPSByZXF1aXJlKCcuL21zZycpO1xyXG5cclxudmFyIG1zZyA9IG5ldyBtZXNzYWdlLm1lc3NhZ2UoKTtcclxuXHJcbnZhciBjZ2lQYXRoID0gJy9jZ2kvJztcclxudmFyIGNnaUxpc3QgPSB7XHJcblx0dXNlciA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKyd1c2VyL2xpc3QnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3VzZXIvaW5mbycsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKyd1c2VyL2NyZWF0ZSdcclxuXHR9LFxyXG5cdHN1YmplY3QgOiB7XHJcblx0XHRsaXN0IDogY2dpUGF0aCsnc3ViamVjdC9saXN0JywgLy8g5oiR55qE5YiX6KGoXHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydzdWJqZWN0L3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnc3ViamVjdC9pbmZvJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydzdWJqZWN0L2VkaXQnLCAvL+S/ruaUueS4u+mimFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnc3ViamVjdC9jcmVhdGUnLFxyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydzdWJqZWN0L2RlbGV0ZScsXHJcblx0XHRmb2xsb3cgOiBjZ2lQYXRoKydzdWJqZWN0L2ZvbGxvdycsIC8v5YWz5rOoXHJcblx0XHRmb2xsb3dpbmcgOiBjZ2lQYXRoKydzdWJqZWN0L2ZvbGxvd2luZycsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRpbnZpdGVkIDogY2dpUGF0aCsnc3ViamVjdC9pbnZpdGVkJywgLy/pgoDor7fliJfooahcclxuXHRcdGFyY2hpdmVkIDogY2dpUGF0aCsnc3ViamVjdC9hcmNoaXZlZCcsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRhcmNoaXZlIDogY2dpUGF0aCsnc3ViamVjdC9hcmNoaXZlJywgLy/lhbPms6jliJfooahcclxuXHRcdGRlbHJlc291cmNlIDogY2dpUGF0aCArICdzdWJqZWN0L2RlbHJlc291cmNlJyAvL+WIoOmZpOS4gOS4qui1hOa6kFxyXG5cdH0sXHJcblx0YXJ0aWNsZSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2FydGljbGUvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydhcnRpY2xlL2luZm8nLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcmluZycsIC8v6LWe55qE5biW5a2QXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3RlZCcsIC8v5pCc6JeP55qE5biW5a2QXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnYXJ0aWNsZS9lZGl0JyxcclxuXHRcdHN0YXIgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXInLCAvL+i1nlxyXG5cdFx0Y29sbGVjdCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdCcsIC8v5pS26JePXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2FydGljbGUvZGVsZXRlJywgLy/mlLbol49cclxuXHRcdCdzZXR0b3AnIDogY2dpUGF0aCsnYXJ0aWNsZS9zZXRUb3AnLCAvL+aUtuiXj1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRjb21tZW50IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnY29tbWVudC9zZWFyY2gnLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3RlZCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnY29tbWVudC9zdGFyJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnY29tbWVudC9kZWxldGUnLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2NvbW1lbnQvZWRpdCcsXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0JyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xyXG5cdH0sXHJcblx0bm90aWZ5IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3NlYXJjaCcsXHJcblx0XHRyZWFkIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3JlYWQnLFxyXG5cdH0sXHJcblx0bGFiZWwgOiB7XHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydsYWJlbC9jcmVhdGUnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ2xhYmVsL2xpc3QnXHJcblx0fSxcclxuXHRyZXNvdXJjZSA6IHtcclxuXHRcdG1hcmsgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL21hcmsnLFxyXG5cdFx0c3BsaXQgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL3NwbGl0JyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL2xpc3QnXHJcblx0fSxcclxuXHRsb2dpbiA6IGNnaVBhdGgrJ2FjY291bnQvbG9naW4nLFxyXG5cdGxvZ291dCA6IGNnaVBhdGgrJ2FjY291bnQvbG9nb3V0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcclxufVxyXG4vLyAv57uf5LiA5Ye65p2l5by55Ye65raI5oGvXHJcbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjYihyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fWVsc2UgaWYoZmxhZyl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kYi5sb2dpbiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dpbixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxvZ291dCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9nb3V0LHt9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlciA9IHt9O1xyXG5kYi51c2VyLmxpc3QgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmxpc3QsbnVsbCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIuaW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuaW5mbyxudWxsLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG4vL+ebtOaOpeaLieaJgOacieeUqOaItz9cclxuZGIudXNlci5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdCA9IHt9O1xyXG5cclxuZGIuc3ViamVjdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QubGlzdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3cgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmZvbGxvdyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3dpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmZvbGxvd2luZyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbnZpdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbnZpdGVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5kZWxyZXNvdXJjZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZGVscmVzb3VyY2UscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmFydGljbGUgPSB7fTtcclxuXHJcbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuYXJ0aWNsZS5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlWydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc2V0dG9wID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5zZXR0b3AscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50ID0ge307XHJcblxyXG5kYi5jb21tZW50LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuY29sbGVjdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0ZWQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50WydkZWxldGUnXSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnRbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5zdGFyID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5zdGFyLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jb2xsZWN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jb2xsZWN0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLm5vdGlmeSA9IHt9O1xyXG5cclxuZGIubm90aWZ5LnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0Lm5vdGlmeS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1x0XHRcclxufVxyXG5cclxuZGIubm90aWZ5LnJlYWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Qubm90aWZ5LnJlYWQscGFyYW0sY2FsbGJhY2spO1x0XHRcclxufVxyXG5cclxuZGIubGFiZWwgPSB7fTtcclxuXHJcbmRiLmxhYmVsLmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sYWJlbC5jcmVhdGUsIHBhcmFtLCBjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIubGFiZWwubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmxhYmVsLmxpc3QscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlID0ge307XHJcblxyXG5kYi5yZXNvdXJjZS5tYXJrID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnJlc291cmNlLm1hcmssIHBhcmFtLCBjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIucmVzb3VyY2Uuc3BsaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QucmVzb3VyY2Uuc3BsaXQsIHBhcmFtLCBjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIucmVzb3VyY2UubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnJlc291cmNlLmxpc3QscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vY2dpLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNFxuICoqLyIsInZhciBEYXRhID0ge307XHJcbi8qXHJcbuaVsOaNrue8k+WtmFxyXG51c2VyIOeUqOaIt1xyXG5zdWJqZWN0IOS4u+mimFxyXG5hcnRpY2xlIOW4luWtkFxyXG4qL1xyXG5EYXRhLnVzZXIgPSB7fTtcclxuRGF0YS5zdWJqZWN0ID0ge307XHJcbkRhdGEuYXJ0aWNsZSA9IHt9O1xyXG5EYXRhLmxhYmVsID0ge307XHJcblxyXG5mdW5jdGlvbiBnZXREYXRhKHR5cGUsa2V5KXtcclxuXHRyZXR1cm4gRGF0YVt0eXBlXVtrZXldIHx8IG51bGw7XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gRGF0YTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2RhdGEvZGF0YS5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy/nlKjmiLfliJfooajmmL7npLrnrYnnrYlcclxudmFyIHVNYW5hZ2UgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlcjtcclxudmFyIGNnaSxcclxuXHR0bXBsLFxyXG5cdG1hbmFnZUhhdmUgPSBmYWxzZTtcclxubW9kdWxlLmV4cG9ydHMgPSB1TWFuYWdlO1xyXG5cclxudmFyIG1hbmFnZSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0Ly/nu5nlrprljLrln59kb23nmoTlkI3lrZdcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrdGFyZ2V0KTtcclxuXHR0aGlzLm1hbmFnZUhhdmUgPSBmYWxzZTtcclxuXHQvL+eUqOaIt+WIl+ihqFxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtbGlzdCcpO1xyXG5cdHRoaXMuc2VsZWN0RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1tYW5hZ2UtbGlzdCcpO1xyXG5cdC8v5pCc57Si5qGGXHJcblx0dGhpcy5rZXlEb207XHJcblxyXG5cdC8v5b2T5YmN5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHQvL+mAieS4reeahOeuoeeQhuWRmOWIl+ihqFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLmlkbWFwW2RhdGEubXlJbmZvLmlkXSA9IDE7XHJcblxyXG5cdC8v5oqK6Ieq5bex5pS+5Zyo566h55CG5ZGY5YiX6KGo6YeM6Z2iXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcdFxyXG5cclxufVxyXG5cclxuLy/liJ3lp4vljJbkuIDkuIsuXHJcbm1hbmFnZS5wcm90b3R5cGUuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG4vL+aYvuekuueuoeeQhuWRmOWIl+ihqFxyXG5tYW5hZ2UucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oKXtcclxuXHQvL+WmguaenOi/mOayoeacieWhq+WIl+ihqC7miorliJfooajloavkuIDkuIsuXHJcblx0aWYoIXRoaXMubWFuYWdlSGF2ZSl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwubWFuYWdlKHtcclxuXHRcdFx0bGlzdCA6IGRhdGEubGlzdCxcclxuXHRcdFx0bXkgOiBkYXRhLm15SW5mb1xyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdHRoaXMua2V5RG9tID0gdGhpcy5saXN0RG9tLmZpbmQoJ2lucHV0W25hbWU9bWFuYWdla2V5XScpO1xyXG5cdFx0dGhpcy5rZXl1cEFjdGlvbigpO1xyXG5cdFx0Ly9iaW5kTWFuYWdlQWN0aW9uKCk7XHJcblx0fVxyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLnNob3coKTtcclxuXHR9ZWxzZXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5hZGRDbGFzcygnZnVpLXBsdXMnKS5yZW1vdmVDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uaGlkZSgpO1xyXG5cdH1cdFxyXG59XHJcblxyXG4vL+WinuWKoOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLmFkZERlZk1hbmFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbm1hbmFnZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxuXHRcclxufVxyXG5cclxuLy/mkJzntKLmjInpkq5cclxubWFuYWdlLnByb3RvdHlwZS5zZWFyY2hidG4gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBrZXkgPSB0aGlzLmtleURvbS52YWwoKTtcclxuXHR2YXIgbGlzdCA9IGRhdGEubGlzdDtcclxuXHR2YXIgdWxpc3QgPSBbXTtcclxuXHJcblx0aWYoa2V5ID09PSAnJyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5zaG93KCk7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHRmb3IodmFyIGkgPSAwLGwgPSBsaXN0Lmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdGlmKGl0ZW0ubmFtZS5pbmRleE9mKGtleSk+PTApe1xyXG5cdFx0XHR1bGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHR0aGlzLmxpc3REb20uZmluZCgnbGknKS5oaWRlKCk7XHJcblx0aWYodWxpc3QubGVuZ3RoPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRmb3IodmFyIGkgPSAwLGwgPSB1bGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR0aGlzLmxpc3REb20uZmluZChcIi51c2VyXCIrdWxpc3RbaV0pLnNob3coKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5Yig6Zmk5LiA5Liq6YCJ5Lit55qE566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9IHRoaXMudGFyZ2V0LFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoJy50YWcnKSxcclxuXHRcdGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdH1cclxufVxyXG5cclxuLy/kuovku7bnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuLy/ovpPlhaXmoYbnmoRrZXl1cOe7keWumlxyXG5tYW5hZ2UucHJvdG90eXBlLmtleXVwQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMua2V5RG9tLmJpbmQoJ2tleXVwJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2tleXVwJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnVNYW5hZ2UubWFuYWdlID0gbWFuYWdlO1xyXG51TWFuYWdlLmluaXQgPSBmdW5jdGlvbihtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Ly9iaW5kQWN0aW9uKCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCIvKipcclxuICogQGZpbGVvdmVydmlldyBNYWluIGZ1bmN0aW9uIHNyYy5cclxuICovXHJcblxyXG4vLyBIVE1MNSBTaGl2LiBNdXN0IGJlIGluIDxoZWFkPiB0byBzdXBwb3J0IG9sZGVyIGJyb3dzZXJzLlxyXG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xyXG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhdWRpbycpO1xyXG5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cmFjaycpO1xyXG5cclxuLyoqXHJcbiAqIERvdWJsZXMgYXMgdGhlIG1haW4gZnVuY3Rpb24gZm9yIHVzZXJzIHRvIGNyZWF0ZSBhIHBsYXllciBpbnN0YW5jZSBhbmQgYWxzb1xyXG4gKiB0aGUgbWFpbiBsaWJyYXJ5IG9iamVjdC5cclxuICpcclxuICogKipBTElBU0VTKiogdmlkZW9qcywgX1ZfIChkZXByZWNhdGVkKVxyXG4gKlxyXG4gKiBUaGUgYHZqc2AgZnVuY3Rpb24gY2FuIGJlIHVzZWQgdG8gaW5pdGlhbGl6ZSBvciByZXRyaWV2ZSBhIHBsYXllci5cclxuICpcclxuICogICAgIHZhciBteVBsYXllciA9IHZqcygnbXlfdmlkZW9faWQnKTtcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfEVsZW1lbnR9IGlkICAgICAgVmlkZW8gZWxlbWVudCBvciB2aWRlbyBlbGVtZW50IElEXHJcbiAqIEBwYXJhbSAge09iamVjdD19IG9wdGlvbnMgICAgICAgIE9wdGlvbmFsIG9wdGlvbnMgb2JqZWN0IGZvciBjb25maWcvc2V0dGluZ3NcclxuICogQHBhcmFtICB7RnVuY3Rpb249fSByZWFkeSAgICAgICAgT3B0aW9uYWwgcmVhZHkgY2FsbGJhY2tcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gICAgICAgICAgICAgQSBwbGF5ZXIgaW5zdGFuY2VcclxuICogQG5hbWVzcGFjZVxyXG4gKi9cclxudmFyIHZqcyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgdmFyIHRhZzsgLy8gRWxlbWVudCBvZiBJRFxyXG5cclxuICAvLyBBbGxvdyBmb3IgZWxlbWVudCBvciBJRCB0byBiZSBwYXNzZWQgaW5cclxuICAvLyBTdHJpbmcgSURcclxuICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xyXG5cclxuICAgIC8vIEFkanVzdCBmb3IgalF1ZXJ5IElEIHN5bnRheFxyXG4gICAgaWYgKGlkLmluZGV4T2YoJyMnKSA9PT0gMCkge1xyXG4gICAgICBpZCA9IGlkLnNsaWNlKDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGEgcGxheWVyIGluc3RhbmNlIGhhcyBhbHJlYWR5IGJlZW4gY3JlYXRlZCBmb3IgdGhpcyBJRCByZXR1cm4gaXQuXHJcbiAgICBpZiAodmpzLnBsYXllcnNbaWRdKSB7XHJcbiAgICAgIHJldHVybiB2anMucGxheWVyc1tpZF07XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlIGdldCBlbGVtZW50IGZvciBJRFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGFnID0gdmpzLmVsKGlkKTtcclxuICAgIH1cclxuXHJcbiAgLy8gSUQgaXMgYSBtZWRpYSBlbGVtZW50XHJcbiAgfSBlbHNlIHtcclxuICAgIHRhZyA9IGlkO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGEgdXNlYWJsZSBlbGVtZW50XHJcbiAgaWYgKCF0YWcgfHwgIXRhZy5ub2RlTmFtZSkgeyAvLyByZTogbm9kZU5hbWUsIGNvdWxkIGJlIGEgYm94IGRpdiBhbHNvXHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgZWxlbWVudCBvciBJRCBzdXBwbGllZCBpcyBub3QgdmFsaWQuICh2aWRlb2pzKScpOyAvLyBSZXR1cm5zXHJcbiAgfVxyXG5cclxuICAvLyBFbGVtZW50IG1heSBoYXZlIGEgcGxheWVyIGF0dHIgcmVmZXJyaW5nIHRvIGFuIGFscmVhZHkgY3JlYXRlZCBwbGF5ZXIgaW5zdGFuY2UuXHJcbiAgLy8gSWYgbm90LCBzZXQgdXAgYSBuZXcgcGxheWVyIGFuZCByZXR1cm4gdGhlIGluc3RhbmNlLlxyXG4gIHJldHVybiB0YWdbJ3BsYXllciddIHx8IG5ldyB2anMuUGxheWVyKHRhZywgb3B0aW9ucywgcmVhZHkpO1xyXG59O1xyXG5cclxuLy8gRXh0ZW5kZWQgbmFtZSwgYWxzbyBhdmFpbGFibGUgZXh0ZXJuYWxseSwgd2luZG93LnZpZGVvanNcclxudmFyIHZpZGVvanMgPSB2anM7XHJcbndpbmRvdy52aWRlb2pzID0gd2luZG93LnZqcyA9IHZqcztcclxuXHJcbi8vIENETiBWZXJzaW9uLiBVc2VkIHRvIHRhcmdldCByaWdodCBmbGFzaCBzd2YuXHJcbnZqcy5DRE5fVkVSU0lPTiA9ICc0LjMnO1xyXG52anMuQUNDRVNTX1BST1RPQ09MID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vJyA6ICdodHRwOi8vJyk7XHJcblxyXG4vKipcclxuICogR2xvYmFsIFBsYXllciBpbnN0YW5jZSBvcHRpb25zLCBzdXJmYWNlZCBmcm9tIHZqcy5QbGF5ZXIucHJvdG90eXBlLm9wdGlvbnNfXHJcbiAqIHZqcy5vcHRpb25zID0gdmpzLlBsYXllci5wcm90b3R5cGUub3B0aW9uc19cclxuICogQWxsIG9wdGlvbnMgc2hvdWxkIHVzZSBzdHJpbmcga2V5cyBzbyB0aGV5IGF2b2lkXHJcbiAqIHJlbmFtaW5nIGJ5IGNsb3N1cmUgY29tcGlsZXJcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZqcy5vcHRpb25zID0ge1xyXG4gIC8vIERlZmF1bHQgb3JkZXIgb2YgZmFsbGJhY2sgdGVjaG5vbG9neVxyXG4gICd0ZWNoT3JkZXInOiBbJ2h0bWw1JywnZmxhc2gnXSxcclxuICAvLyB0ZWNoT3JkZXI6IFsnZmxhc2gnLCdodG1sNSddLFxyXG5cclxuICAnaHRtbDUnOiB7fSxcclxuICAnZmxhc2gnOiB7fSxcclxuXHJcbiAgLy8gRGVmYXVsdCBvZiB3ZWIgYnJvd3NlciBpcyAzMDB4MTUwLiBTaG91bGQgcmVseSBvbiBzb3VyY2Ugd2lkdGgvaGVpZ2h0LlxyXG4gICd3aWR0aCc6IDMwMCxcclxuICAnaGVpZ2h0JzogMTUwLFxyXG4gIC8vIGRlZmF1bHRWb2x1bWU6IDAuODUsXHJcbiAgJ2RlZmF1bHRWb2x1bWUnOiAwLjAwLCAvLyBUaGUgZnJlYWtpbiBzZWFndWxzIGFyZSBkcml2aW5nIG1lIGNyYXp5IVxyXG5cclxuICAvLyBJbmNsdWRlZCBjb250cm9sIHNldHNcclxuICAnY2hpbGRyZW4nOiB7XHJcbiAgICAnbWVkaWFMb2FkZXInOiB7fSxcclxuICAgICdwb3N0ZXJJbWFnZSc6IHt9LFxyXG4gICAgJ3RleHRUcmFja0Rpc3BsYXknOiB7fSxcclxuICAgICdsb2FkaW5nU3Bpbm5lcic6IHt9LFxyXG4gICAgJ2JpZ1BsYXlCdXR0b24nOiB7fSxcclxuICAgICdjb250cm9sQmFyJzoge31cclxuICB9LFxyXG5cclxuICAvLyBEZWZhdWx0IG1lc3NhZ2UgdG8gc2hvdyB3aGVuIGEgdmlkZW8gY2Fubm90IGJlIHBsYXllZC5cclxuICAnbm90U3VwcG9ydGVkTWVzc2FnZSc6ICdTb3JyeSwgbm8gY29tcGF0aWJsZSBzb3VyY2UgYW5kIHBsYXliYWNrICcgK1xyXG4gICAgICAndGVjaG5vbG9neSB3ZXJlIGZvdW5kIGZvciB0aGlzIHZpZGVvLiBUcnkgdXNpbmcgYW5vdGhlciBicm93c2VyICcgK1xyXG4gICAgICAnbGlrZSA8YSBocmVmPVwiaHR0cDovL2JpdC5seS9jY01VRUNcIj5DaHJvbWU8L2E+IG9yIGRvd25sb2FkIHRoZSAnICtcclxuICAgICAgJ2xhdGVzdCA8YSBocmVmPVwiaHR0cDovL2Fkb2JlLmx5L213Zk4xXCI+QWRvYmUgRmxhc2ggUGxheWVyPC9hPi4nXHJcbn07XHJcblxyXG4vLyBTZXQgQ0ROIFZlcnNpb24gb2Ygc3dmXHJcbi8vIFRoZSBhZGRlZCAoKykgYmxvY2tzIHRoZSByZXBsYWNlIGZyb20gY2hhbmdpbmcgdGhpcyA0LjMgc3RyaW5nXHJcbmlmICh2anMuQ0ROX1ZFUlNJT04gIT09ICdHRU5FUkFURUQnKydfQ0ROX1ZTTicpIHtcclxuICB2aWRlb2pzLm9wdGlvbnNbJ2ZsYXNoJ11bJ3N3ZiddID0gdmpzLkFDQ0VTU19QUk9UT0NPTCArICd2anMuemVuY2RuLm5ldC8nK3Zqcy5DRE5fVkVSU0lPTisnL3ZpZGVvLWpzLnN3Zic7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBHbG9iYWwgcGxheWVyIGxpc3RcclxuICogQHR5cGUge09iamVjdH1cclxuICovXHJcbnZqcy5wbGF5ZXJzID0ge307XHJcbi8qKlxyXG4gKiBDb3JlIE9iamVjdC9DbGFzcyBmb3Igb2JqZWN0cyB0aGF0IHVzZSBpbmhlcml0YW5jZSArIGNvbnRzdHJ1Y3RvcnNcclxuICpcclxuICogVG8gY3JlYXRlIGEgY2xhc3MgdGhhdCBjYW4gYmUgc3ViY2xhc3NlZCBpdHNlbGYsIGV4dGVuZCB0aGUgQ29yZU9iamVjdCBjbGFzcy5cclxuICpcclxuICogICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCgpO1xyXG4gKiAgICAgdmFyIEhvcnNlID0gQW5pbWFsLmV4dGVuZCgpO1xyXG4gKlxyXG4gKiBUaGUgY29uc3RydWN0b3IgY2FuIGJlIGRlZmluZWQgdGhyb3VnaCB0aGUgaW5pdCBwcm9wZXJ0eSBvZiBhbiBvYmplY3QgYXJndW1lbnQuXHJcbiAqXHJcbiAqICAgICB2YXIgQW5pbWFsID0gQ29yZU9iamVjdC5leHRlbmQoe1xyXG4gKiAgICAgICBpbml0OiBmdW5jdGlvbihuYW1lLCBzb3VuZCl7XHJcbiAqICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICogICAgICAgfVxyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqIE90aGVyIG1ldGhvZHMgYW5kIHByb3BlcnRpZXMgY2FuIGJlIGFkZGVkIHRoZSBzYW1lIHdheSwgb3IgZGlyZWN0bHkgdG8gdGhlXHJcbiAqIHByb3RvdHlwZS5cclxuICpcclxuICogICAgdmFyIEFuaW1hbCA9IENvcmVPYmplY3QuZXh0ZW5kKHtcclxuICogICAgICAgaW5pdDogZnVuY3Rpb24obmFtZSl7XHJcbiAqICAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICogICAgICAgfSxcclxuICogICAgICAgZ2V0TmFtZTogZnVuY3Rpb24oKXtcclxuICogICAgICAgICByZXR1cm4gdGhpcy5uYW1lO1xyXG4gKiAgICAgICB9LFxyXG4gKiAgICAgICBzb3VuZDogJy4uLidcclxuICogICAgfSk7XHJcbiAqXHJcbiAqICAgIEFuaW1hbC5wcm90b3R5cGUubWFrZVNvdW5kID0gZnVuY3Rpb24oKXtcclxuICogICAgICBhbGVydCh0aGlzLnNvdW5kKTtcclxuICogICAgfTtcclxuICpcclxuICogVG8gY3JlYXRlIGFuIGluc3RhbmNlIG9mIGEgY2xhc3MsIHVzZSB0aGUgY3JlYXRlIG1ldGhvZC5cclxuICpcclxuICogICAgdmFyIGZsdWZmeSA9IEFuaW1hbC5jcmVhdGUoJ0ZsdWZmeScpO1xyXG4gKiAgICBmbHVmZnkuZ2V0TmFtZSgpOyAvLyAtPiBGbHVmZnlcclxuICpcclxuICogTWV0aG9kcyBhbmQgcHJvcGVydGllcyBjYW4gYmUgb3ZlcnJpZGRlbiBpbiBzdWJjbGFzc2VzLlxyXG4gKlxyXG4gKiAgICAgdmFyIEhvcnNlID0gQW5pbWFsLmV4dGVuZCh7XHJcbiAqICAgICAgIHNvdW5kOiAnTmVpZ2hoaGhoISdcclxuICogICAgIH0pO1xyXG4gKlxyXG4gKiAgICAgdmFyIGhvcnNleSA9IEhvcnNlLmNyZWF0ZSgnSG9yc2V5Jyk7XHJcbiAqICAgICBob3JzZXkuZ2V0TmFtZSgpOyAvLyAtPiBIb3JzZXlcclxuICogICAgIGhvcnNleS5tYWtlU291bmQoKTsgLy8gLT4gQWxlcnQ6IE5laWdoaGhoaCFcclxuICpcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNvcmVPYmplY3QgPSB2anNbJ0NvcmVPYmplY3QnXSA9IGZ1bmN0aW9uKCl7fTtcclxuLy8gTWFudWFsbHkgZXhwb3J0aW5nIHZqc1snQ29yZU9iamVjdCddIGhlcmUgZm9yIENsb3N1cmUgQ29tcGlsZXJcclxuLy8gYmVjYXVzZSBvZiB0aGUgdXNlIG9mIHRoZSBleHRlbmQvY3JlYXRlIGNsYXNzIG1ldGhvZHNcclxuLy8gSWYgd2UgZGlkbid0IGRvIHRoaXMsIHRob3NlIGZ1bmN0aW9ucyB3b3VsZCBnZXQgZmxhdHRlbmQgdG8gc29tZXRoaW5nIGxpa2VcclxuLy8gYGEgPSAuLi5gIGFuZCBgdGhpcy5wcm90b3R5cGVgIHdvdWxkIHJlZmVyIHRvIHRoZSBnbG9iYWwgb2JqZWN0IGluc3RlYWQgb2ZcclxuLy8gQ29yZU9iamVjdFxyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgT2JqZWN0XHJcbiAqXHJcbiAqICAgICB2YXIgQW5pbWFsID0gQ29yZU9iamVjdC5leHRlbmQoKTtcclxuICogICAgIHZhciBIb3JzZSA9IEFuaW1hbC5leHRlbmQoKTtcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHByb3BzIEZ1bmN0aW9ucyBhbmQgcHJvcGVydGllcyB0byBiZSBhcHBsaWVkIHRvIHRoZVxyXG4gKiAgICAgICAgICAgICAgICAgICAgICAgbmV3IG9iamVjdCdzIHByb3RvdHlwZVxyXG4gKiBAcmV0dXJuIHt2anMuQ29yZU9iamVjdH0gQW4gb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSBDb3JlT2JqZWN0XHJcbiAqIEB0aGlzIHsqfVxyXG4gKi9cclxudmpzLkNvcmVPYmplY3QuZXh0ZW5kID0gZnVuY3Rpb24ocHJvcHMpe1xyXG4gIHZhciBpbml0LCBzdWJPYmo7XHJcblxyXG4gIHByb3BzID0gcHJvcHMgfHwge307XHJcbiAgLy8gU2V0IHVwIHRoZSBjb25zdHJ1Y3RvciB1c2luZyB0aGUgc3VwcGxpZWQgaW5pdCBtZXRob2RcclxuICAvLyBvciB1c2luZyB0aGUgaW5pdCBvZiB0aGUgcGFyZW50IG9iamVjdFxyXG4gIC8vIE1ha2Ugc3VyZSB0byBjaGVjayB0aGUgdW5vYmZ1c2NhdGVkIHZlcnNpb24gZm9yIGV4dGVybmFsIGxpYnNcclxuICBpbml0ID0gcHJvcHNbJ2luaXQnXSB8fCBwcm9wcy5pbml0IHx8IHRoaXMucHJvdG90eXBlWydpbml0J10gfHwgdGhpcy5wcm90b3R5cGUuaW5pdCB8fCBmdW5jdGlvbigpe307XHJcbiAgLy8gSW4gUmVzaWcncyBzaW1wbGUgY2xhc3MgaW5oZXJpdGFuY2UgKHByZXZpb3VzbHkgdXNlZCkgdGhlIGNvbnN0cnVjdG9yXHJcbiAgLy8gIGlzIGEgZnVuY3Rpb24gdGhhdCBjYWxscyBgdGhpcy5pbml0LmFwcGx5KGFyZ3VtZW50cylgXHJcbiAgLy8gSG93ZXZlciB0aGF0IHdvdWxkIHByZXZlbnQgdXMgZnJvbSB1c2luZyBgUGFyZW50T2JqZWN0LmNhbGwodGhpcyk7YFxyXG4gIC8vICBpbiBhIENoaWxkIGNvbnN0dWN0b3IgYmVjYXVzZSB0aGUgYHRoaXNgIGluIGB0aGlzLmluaXRgXHJcbiAgLy8gIHdvdWxkIHN0aWxsIHJlZmVyIHRvIHRoZSBDaGlsZCBhbmQgY2F1c2UgYW4gaW5pZmluaXRlIGxvb3AuXHJcbiAgLy8gV2Ugd291bGQgaW5zdGVhZCBoYXZlIHRvIGRvXHJcbiAgLy8gICAgYFBhcmVudE9iamVjdC5wcm90b3R5cGUuaW5pdC5hcHBseSh0aGlzLCBhcmd1bW5lbnRzKTtgXHJcbiAgLy8gIEJsZWguIFdlJ3JlIG5vdCBjcmVhdGluZyBhIF9zdXBlcigpIGZ1bmN0aW9uLCBzbyBpdCdzIGdvb2QgdG8ga2VlcFxyXG4gIC8vICB0aGUgcGFyZW50IGNvbnN0cnVjdG9yIHJlZmVyZW5jZSBzaW1wbGUuXHJcbiAgc3ViT2JqID0gZnVuY3Rpb24oKXtcclxuICAgIGluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9O1xyXG5cclxuICAvLyBJbmhlcml0IGZyb20gdGhpcyBvYmplY3QncyBwcm90b3R5cGVcclxuICBzdWJPYmoucHJvdG90eXBlID0gdmpzLm9iai5jcmVhdGUodGhpcy5wcm90b3R5cGUpO1xyXG4gIC8vIFJlc2V0IHRoZSBjb25zdHJ1Y3RvciBwcm9wZXJ0eSBmb3Igc3ViT2JqIG90aGVyd2lzZVxyXG4gIC8vIGluc3RhbmNlcyBvZiBzdWJPYmogd291bGQgaGF2ZSB0aGUgY29uc3RydWN0b3Igb2YgdGhlIHBhcmVudCBPYmplY3RcclxuICBzdWJPYmoucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gc3ViT2JqO1xyXG5cclxuICAvLyBNYWtlIHRoZSBjbGFzcyBleHRlbmRhYmxlXHJcbiAgc3ViT2JqLmV4dGVuZCA9IHZqcy5Db3JlT2JqZWN0LmV4dGVuZDtcclxuICAvLyBNYWtlIGEgZnVuY3Rpb24gZm9yIGNyZWF0aW5nIGluc3RhbmNlc1xyXG4gIHN1Yk9iai5jcmVhdGUgPSB2anMuQ29yZU9iamVjdC5jcmVhdGU7XHJcblxyXG4gIC8vIEV4dGVuZCBzdWJPYmoncyBwcm90b3R5cGUgd2l0aCBmdW5jdGlvbnMgYW5kIG90aGVyIHByb3BlcnRpZXMgZnJvbSBwcm9wc1xyXG4gIGZvciAodmFyIG5hbWUgaW4gcHJvcHMpIHtcclxuICAgIGlmIChwcm9wcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xyXG4gICAgICBzdWJPYmoucHJvdG90eXBlW25hbWVdID0gcHJvcHNbbmFtZV07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3ViT2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBpbnN0YWNlIG9mIHRoaXMgT2JqZWN0IGNsYXNzXHJcbiAqXHJcbiAqICAgICB2YXIgbXlBbmltYWwgPSBBbmltYWwuY3JlYXRlKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db3JlT2JqZWN0fSBBbiBpbnN0YW5jZSBvZiBhIENvcmVPYmplY3Qgc3ViY2xhc3NcclxuICogQHRoaXMgeyp9XHJcbiAqL1xyXG52anMuQ29yZU9iamVjdC5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIENyZWF0ZSBhIG5ldyBvYmplY3QgdGhhdCBpbmhlcml0cyBmcm9tIHRoaXMgb2JqZWN0J3MgcHJvdG90eXBlXHJcbiAgdmFyIGluc3QgPSB2anMub2JqLmNyZWF0ZSh0aGlzLnByb3RvdHlwZSk7XHJcblxyXG4gIC8vIEFwcGx5IHRoaXMgY29uc3RydWN0b3IgZnVuY3Rpb24gdG8gdGhlIG5ldyBvYmplY3RcclxuICB0aGlzLmFwcGx5KGluc3QsIGFyZ3VtZW50cyk7XHJcblxyXG4gIC8vIFJldHVybiB0aGUgbmV3IG9iamVjdFxyXG4gIHJldHVybiBpbnN0O1xyXG59O1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBFdmVudCBTeXN0ZW0gKEpvaG4gUmVzaWcgLSBTZWNyZXRzIG9mIGEgSlMgTmluamEgaHR0cDovL2pzbmluamEuY29tLylcclxuICogKE9yaWdpbmFsIGJvb2sgdmVyc2lvbiB3YXNuJ3QgY29tcGxldGVseSB1c2FibGUsIHNvIGZpeGVkIHNvbWUgdGhpbmdzIGFuZCBtYWRlIENsb3N1cmUgQ29tcGlsZXIgY29tcGF0aWJsZSlcclxuICogVGhpcyBzaG91bGQgd29yayB2ZXJ5IHNpbWlsYXJseSB0byBqUXVlcnkncyBldmVudHMsIGhvd2V2ZXIgaXQncyBiYXNlZCBvZmYgdGhlIGJvb2sgdmVyc2lvbiB3aGljaCBpc24ndCBhc1xyXG4gKiByb2J1c3QgYXMganF1ZXJ5J3MsIHNvIHRoZXJlJ3MgcHJvYmFibHkgc29tZSBkaWZmZXJlbmNlcy5cclxuICovXHJcblxyXG4vKipcclxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGVsZW1lbnRcclxuICogSXQgc3RvcmVzIHRoZSBoYW5kbGVyIGZ1bmN0aW9uIGluIGEgc2VwYXJhdGUgY2FjaGUgb2JqZWN0XHJcbiAqIGFuZCBhZGRzIGEgZ2VuZXJpYyBoYW5kbGVyIHRvIHRoZSBlbGVtZW50J3MgZXZlbnQsXHJcbiAqIGFsb25nIHdpdGggYSB1bmlxdWUgaWQgKGd1aWQpIHRvIHRoZSBlbGVtZW50LlxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gICBlbGVtIEVsZW1lbnQgb3Igb2JqZWN0IHRvIGJpbmQgbGlzdGVuZXJzIHRvXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICB0eXBlIFR5cGUgb2YgZXZlbnQgdG8gYmluZCB0by5cclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgRXZlbnQgbGlzdGVuZXIuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub24gPSBmdW5jdGlvbihlbGVtLCB0eXBlLCBmbil7XHJcbiAgdmFyIGRhdGEgPSB2anMuZ2V0RGF0YShlbGVtKTtcclxuXHJcbiAgLy8gV2UgbmVlZCBhIHBsYWNlIHRvIHN0b3JlIGFsbCBvdXIgaGFuZGxlciBkYXRhXHJcbiAgaWYgKCFkYXRhLmhhbmRsZXJzKSBkYXRhLmhhbmRsZXJzID0ge307XHJcblxyXG4gIGlmICghZGF0YS5oYW5kbGVyc1t0eXBlXSkgZGF0YS5oYW5kbGVyc1t0eXBlXSA9IFtdO1xyXG5cclxuICBpZiAoIWZuLmd1aWQpIGZuLmd1aWQgPSB2anMuZ3VpZCsrO1xyXG5cclxuICBkYXRhLmhhbmRsZXJzW3R5cGVdLnB1c2goZm4pO1xyXG5cclxuICBpZiAoIWRhdGEuZGlzcGF0Y2hlcikge1xyXG4gICAgZGF0YS5kaXNhYmxlZCA9IGZhbHNlO1xyXG5cclxuICAgIGRhdGEuZGlzcGF0Y2hlciA9IGZ1bmN0aW9uIChldmVudCl7XHJcblxyXG4gICAgICBpZiAoZGF0YS5kaXNhYmxlZCkgcmV0dXJuO1xyXG4gICAgICBldmVudCA9IHZqcy5maXhFdmVudChldmVudCk7XHJcblxyXG4gICAgICB2YXIgaGFuZGxlcnMgPSBkYXRhLmhhbmRsZXJzW2V2ZW50LnR5cGVdO1xyXG5cclxuICAgICAgaWYgKGhhbmRsZXJzKSB7XHJcbiAgICAgICAgLy8gQ29weSBoYW5kbGVycyBzbyBpZiBoYW5kbGVycyBhcmUgYWRkZWQvcmVtb3ZlZCBkdXJpbmcgdGhlIHByb2Nlc3MgaXQgZG9lc24ndCB0aHJvdyBldmVyeXRoaW5nIG9mZi5cclxuICAgICAgICB2YXIgaGFuZGxlcnNDb3B5ID0gaGFuZGxlcnMuc2xpY2UoMCk7XHJcblxyXG4gICAgICAgIGZvciAodmFyIG0gPSAwLCBuID0gaGFuZGxlcnNDb3B5Lmxlbmd0aDsgbSA8IG47IG0rKykge1xyXG4gICAgICAgICAgaWYgKGV2ZW50LmlzSW1tZWRpYXRlUHJvcGFnYXRpb25TdG9wcGVkKCkpIHtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBoYW5kbGVyc0NvcHlbbV0uY2FsbChlbGVtLCBldmVudCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgaWYgKGRhdGEuaGFuZGxlcnNbdHlwZV0ubGVuZ3RoID09IDEpIHtcclxuICAgIGlmIChkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgIGVsZW0uYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBkYXRhLmRpc3BhdGNoZXIsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgZWxlbS5hdHRhY2hFdmVudCgnb24nICsgdHlwZSwgZGF0YS5kaXNwYXRjaGVyKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgZnJvbSBhbiBlbGVtZW50XHJcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSAgIGVsZW0gT2JqZWN0IHRvIHJlbW92ZSBsaXN0ZW5lcnMgZnJvbVxyXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSAgIHR5cGUgVHlwZSBvZiBsaXN0ZW5lciB0byByZW1vdmUuIERvbid0IGluY2x1ZGUgdG8gcmVtb3ZlIGFsbCBldmVudHMgZnJvbSBlbGVtZW50LlxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICBTcGVjaWZpYyBsaXN0ZW5lciB0byByZW1vdmUuIERvbid0IGluY2xkdWUgdG8gcmVtb3ZlIGxpc3RlbmVycyBmb3IgYW4gZXZlbnQgdHlwZS5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vZmYgPSBmdW5jdGlvbihlbGVtLCB0eXBlLCBmbikge1xyXG4gIC8vIERvbid0IHdhbnQgdG8gYWRkIGEgY2FjaGUgb2JqZWN0IHRocm91Z2ggZ2V0RGF0YSBpZiBub3QgbmVlZGVkXHJcbiAgaWYgKCF2anMuaGFzRGF0YShlbGVtKSkgcmV0dXJuO1xyXG5cclxuICB2YXIgZGF0YSA9IHZqcy5nZXREYXRhKGVsZW0pO1xyXG5cclxuICAvLyBJZiBubyBldmVudHMgZXhpc3QsIG5vdGhpbmcgdG8gdW5iaW5kXHJcbiAgaWYgKCFkYXRhLmhhbmRsZXJzKSB7IHJldHVybjsgfVxyXG5cclxuICAvLyBVdGlsaXR5IGZ1bmN0aW9uXHJcbiAgdmFyIHJlbW92ZVR5cGUgPSBmdW5jdGlvbih0KXtcclxuICAgICBkYXRhLmhhbmRsZXJzW3RdID0gW107XHJcbiAgICAgdmpzLmNsZWFuVXBFdmVudHMoZWxlbSx0KTtcclxuICB9O1xyXG5cclxuICAvLyBBcmUgd2UgcmVtb3ZpbmcgYWxsIGJvdW5kIGV2ZW50cz9cclxuICBpZiAoIXR5cGUpIHtcclxuICAgIGZvciAodmFyIHQgaW4gZGF0YS5oYW5kbGVycykgcmVtb3ZlVHlwZSh0KTtcclxuICAgIHJldHVybjtcclxuICB9XHJcblxyXG4gIHZhciBoYW5kbGVycyA9IGRhdGEuaGFuZGxlcnNbdHlwZV07XHJcblxyXG4gIC8vIElmIG5vIGhhbmRsZXJzIGV4aXN0LCBub3RoaW5nIHRvIHVuYmluZFxyXG4gIGlmICghaGFuZGxlcnMpIHJldHVybjtcclxuXHJcbiAgLy8gSWYgbm8gbGlzdGVuZXIgd2FzIHByb3ZpZGVkLCByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgdHlwZVxyXG4gIGlmICghZm4pIHtcclxuICAgIHJlbW92ZVR5cGUodHlwZSk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICAvLyBXZSdyZSBvbmx5IHJlbW92aW5nIGEgc2luZ2xlIGhhbmRsZXJcclxuICBpZiAoZm4uZ3VpZCkge1xyXG4gICAgZm9yICh2YXIgbiA9IDA7IG4gPCBoYW5kbGVycy5sZW5ndGg7IG4rKykge1xyXG4gICAgICBpZiAoaGFuZGxlcnNbbl0uZ3VpZCA9PT0gZm4uZ3VpZCkge1xyXG4gICAgICAgIGhhbmRsZXJzLnNwbGljZShuLS0sIDEpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2anMuY2xlYW5VcEV2ZW50cyhlbGVtLCB0eXBlKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDbGVhbiB1cCB0aGUgbGlzdGVuZXIgY2FjaGUgYW5kIGRpc3BhdGNoZXJzXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSBlbGVtIEVsZW1lbnQgdG8gY2xlYW4gdXBcclxuICogQHBhcmFtICB7U3RyaW5nfSB0eXBlIFR5cGUgb2YgZXZlbnQgdG8gY2xlYW4gdXBcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5jbGVhblVwRXZlbnRzID0gZnVuY3Rpb24oZWxlbSwgdHlwZSkge1xyXG4gIHZhciBkYXRhID0gdmpzLmdldERhdGEoZWxlbSk7XHJcblxyXG4gIC8vIFJlbW92ZSB0aGUgZXZlbnRzIG9mIGEgcGFydGljdWxhciB0eXBlIGlmIHRoZXJlIGFyZSBub25lIGxlZnRcclxuICBpZiAoZGF0YS5oYW5kbGVyc1t0eXBlXS5sZW5ndGggPT09IDApIHtcclxuICAgIGRlbGV0ZSBkYXRhLmhhbmRsZXJzW3R5cGVdO1xyXG4gICAgLy8gZGF0YS5oYW5kbGVyc1t0eXBlXSA9IG51bGw7XHJcbiAgICAvLyBTZXR0aW5nIHRvIG51bGwgd2FzIGNhdXNpbmcgYW4gZXJyb3Igd2l0aCBkYXRhLmhhbmRsZXJzXHJcblxyXG4gICAgLy8gUmVtb3ZlIHRoZSBtZXRhLWhhbmRsZXIgZnJvbSB0aGUgZWxlbWVudFxyXG4gICAgaWYgKGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIpIHtcclxuICAgICAgZWxlbS5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGRhdGEuZGlzcGF0Y2hlciwgZmFsc2UpO1xyXG4gICAgfSBlbHNlIGlmIChkb2N1bWVudC5kZXRhY2hFdmVudCkge1xyXG4gICAgICBlbGVtLmRldGFjaEV2ZW50KCdvbicgKyB0eXBlLCBkYXRhLmRpc3BhdGNoZXIpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmVtb3ZlIHRoZSBldmVudHMgb2JqZWN0IGlmIHRoZXJlIGFyZSBubyB0eXBlcyBsZWZ0XHJcbiAgaWYgKHZqcy5pc0VtcHR5KGRhdGEuaGFuZGxlcnMpKSB7XHJcbiAgICBkZWxldGUgZGF0YS5oYW5kbGVycztcclxuICAgIGRlbGV0ZSBkYXRhLmRpc3BhdGNoZXI7XHJcbiAgICBkZWxldGUgZGF0YS5kaXNhYmxlZDtcclxuXHJcbiAgICAvLyBkYXRhLmhhbmRsZXJzID0gbnVsbDtcclxuICAgIC8vIGRhdGEuZGlzcGF0Y2hlciA9IG51bGw7XHJcbiAgICAvLyBkYXRhLmRpc2FibGVkID0gbnVsbDtcclxuICB9XHJcblxyXG4gIC8vIEZpbmFsbHkgcmVtb3ZlIHRoZSBleHBhbmRvIGlmIHRoZXJlIGlzIG5vIGRhdGEgbGVmdFxyXG4gIGlmICh2anMuaXNFbXB0eShkYXRhKSkge1xyXG4gICAgdmpzLnJlbW92ZURhdGEoZWxlbSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpeCBhIG5hdGl2ZSBldmVudCB0byBoYXZlIHN0YW5kYXJkIHByb3BlcnR5IHZhbHVlc1xyXG4gKiBAcGFyYW0gIHtPYmplY3R9IGV2ZW50IEV2ZW50IG9iamVjdCB0byBmaXhcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmZpeEV2ZW50ID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuXHJcbiAgZnVuY3Rpb24gcmV0dXJuVHJ1ZSgpIHsgcmV0dXJuIHRydWU7IH1cclxuICBmdW5jdGlvbiByZXR1cm5GYWxzZSgpIHsgcmV0dXJuIGZhbHNlOyB9XHJcblxyXG4gIC8vIFRlc3QgaWYgZml4aW5nIHVwIGlzIG5lZWRlZFxyXG4gIC8vIFVzZWQgdG8gY2hlY2sgaWYgIWV2ZW50LnN0b3BQcm9wYWdhdGlvbiBpbnN0ZWFkIG9mIGlzUHJvcGFnYXRpb25TdG9wcGVkXHJcbiAgLy8gQnV0IG5hdGl2ZSBldmVudHMgcmV0dXJuIHRydWUgZm9yIHN0b3BQcm9wYWdhdGlvbiwgYnV0IGRvbid0IGhhdmVcclxuICAvLyBvdGhlciBleHBlY3RlZCBtZXRob2RzIGxpa2UgaXNQcm9wYWdhdGlvblN0b3BwZWQuIFNlZW1zIHRvIGJlIGEgcHJvYmxlbVxyXG4gIC8vIHdpdGggdGhlIEphdmFzY3JpcHQgTmluamEgY29kZS4gU28gd2UncmUganVzdCBvdmVycmlkaW5nIGFsbCBldmVudHMgbm93LlxyXG4gIGlmICghZXZlbnQgfHwgIWV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkKSB7XHJcbiAgICB2YXIgb2xkID0gZXZlbnQgfHwgd2luZG93LmV2ZW50O1xyXG5cclxuICAgIGV2ZW50ID0ge307XHJcbiAgICAvLyBDbG9uZSB0aGUgb2xkIG9iamVjdCBzbyB0aGF0IHdlIGNhbiBtb2RpZnkgdGhlIHZhbHVlcyBldmVudCA9IHt9O1xyXG4gICAgLy8gSUU4IERvZXNuJ3QgbGlrZSB3aGVuIHlvdSBtZXNzIHdpdGggbmF0aXZlIGV2ZW50IHByb3BlcnRpZXNcclxuICAgIC8vIEZpcmVmb3ggcmV0dXJucyBmYWxzZSBmb3IgZXZlbnQuaGFzT3duUHJvcGVydHkoJ3R5cGUnKSBhbmQgb3RoZXIgcHJvcHNcclxuICAgIC8vICB3aGljaCBtYWtlcyBjb3B5aW5nIG1vcmUgZGlmZmljdWx0LlxyXG4gICAgLy8gVE9ETzogUHJvYmFibHkgYmVzdCB0byBjcmVhdGUgYSB3aGl0ZWxpc3Qgb2YgZXZlbnQgcHJvcHNcclxuICAgIGZvciAodmFyIGtleSBpbiBvbGQpIHtcclxuICAgICAgLy8gU2FmYXJpIDYuMC4zIHdhcm5zIHlvdSBpZiB5b3UgdHJ5IHRvIGNvcHkgZGVwcmVjYXRlZCBsYXllclgvWVxyXG4gICAgICBpZiAoa2V5ICE9PSAnbGF5ZXJYJyAmJiBrZXkgIT09ICdsYXllclknKSB7XHJcbiAgICAgICAgZXZlbnRba2V5XSA9IG9sZFtrZXldO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhlIGV2ZW50IG9jY3VycmVkIG9uIHRoaXMgZWxlbWVudFxyXG4gICAgaWYgKCFldmVudC50YXJnZXQpIHtcclxuICAgICAgZXZlbnQudGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIYW5kbGUgd2hpY2ggb3RoZXIgZWxlbWVudCB0aGUgZXZlbnQgaXMgcmVsYXRlZCB0b1xyXG4gICAgZXZlbnQucmVsYXRlZFRhcmdldCA9IGV2ZW50LmZyb21FbGVtZW50ID09PSBldmVudC50YXJnZXQgP1xyXG4gICAgICBldmVudC50b0VsZW1lbnQgOlxyXG4gICAgICBldmVudC5mcm9tRWxlbWVudDtcclxuXHJcbiAgICAvLyBTdG9wIHRoZSBkZWZhdWx0IGJyb3dzZXIgYWN0aW9uXHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKG9sZC5wcmV2ZW50RGVmYXVsdCkge1xyXG4gICAgICAgIG9sZC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGV2ZW50LnJldHVyblZhbHVlID0gZmFsc2U7XHJcbiAgICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVyblRydWU7XHJcbiAgICB9O1xyXG5cclxuICAgIGV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCA9IHJldHVybkZhbHNlO1xyXG5cclxuICAgIC8vIFN0b3AgdGhlIGV2ZW50IGZyb20gYnViYmxpbmdcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKG9sZC5zdG9wUHJvcGFnYXRpb24pIHtcclxuICAgICAgICBvbGQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQuY2FuY2VsQnViYmxlID0gdHJ1ZTtcclxuICAgICAgZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVybkZhbHNlO1xyXG5cclxuICAgIC8vIFN0b3AgdGhlIGV2ZW50IGZyb20gYnViYmxpbmcgYW5kIGV4ZWN1dGluZyBvdGhlciBoYW5kbGVyc1xyXG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBpZiAob2xkLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbikge1xyXG4gICAgICAgIG9sZC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVyblRydWU7XHJcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgfTtcclxuXHJcbiAgICBldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCA9IHJldHVybkZhbHNlO1xyXG5cclxuICAgIC8vIEhhbmRsZSBtb3VzZSBwb3NpdGlvblxyXG4gICAgaWYgKGV2ZW50LmNsaWVudFggIT0gbnVsbCkge1xyXG4gICAgICB2YXIgZG9jID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LCBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICAgIGV2ZW50LnBhZ2VYID0gZXZlbnQuY2xpZW50WCArXHJcbiAgICAgICAgKGRvYyAmJiBkb2Muc2Nyb2xsTGVmdCB8fCBib2R5ICYmIGJvZHkuc2Nyb2xsTGVmdCB8fCAwKSAtXHJcbiAgICAgICAgKGRvYyAmJiBkb2MuY2xpZW50TGVmdCB8fCBib2R5ICYmIGJvZHkuY2xpZW50TGVmdCB8fCAwKTtcclxuICAgICAgZXZlbnQucGFnZVkgPSBldmVudC5jbGllbnRZICtcclxuICAgICAgICAoZG9jICYmIGRvYy5zY3JvbGxUb3AgfHwgYm9keSAmJiBib2R5LnNjcm9sbFRvcCB8fCAwKSAtXHJcbiAgICAgICAgKGRvYyAmJiBkb2MuY2xpZW50VG9wIHx8IGJvZHkgJiYgYm9keS5jbGllbnRUb3AgfHwgMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIGtleSBwcmVzc2VzXHJcbiAgICBldmVudC53aGljaCA9IGV2ZW50LmNoYXJDb2RlIHx8IGV2ZW50LmtleUNvZGU7XHJcblxyXG4gICAgLy8gRml4IGJ1dHRvbiBmb3IgbW91c2UgY2xpY2tzOlxyXG4gICAgLy8gMCA9PSBsZWZ0OyAxID09IG1pZGRsZTsgMiA9PSByaWdodFxyXG4gICAgaWYgKGV2ZW50LmJ1dHRvbiAhPSBudWxsKSB7XHJcbiAgICAgIGV2ZW50LmJ1dHRvbiA9IChldmVudC5idXR0b24gJiAxID8gMCA6XHJcbiAgICAgICAgKGV2ZW50LmJ1dHRvbiAmIDQgPyAxIDpcclxuICAgICAgICAgIChldmVudC5idXR0b24gJiAyID8gMiA6IDApKSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm5zIGZpeGVkLXVwIGluc3RhbmNlXHJcbiAgcmV0dXJuIGV2ZW50O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgYW4gZXZlbnQgZm9yIGFuIGVsZW1lbnRcclxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9IGVsZW0gIEVsZW1lbnQgdG8gdHJpZ2dlciBhbiBldmVudCBvblxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IGV2ZW50IFR5cGUgb2YgZXZlbnQgdG8gdHJpZ2dlclxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnRyaWdnZXIgPSBmdW5jdGlvbihlbGVtLCBldmVudCkge1xyXG4gIC8vIEZldGNoZXMgZWxlbWVudCBkYXRhIGFuZCBhIHJlZmVyZW5jZSB0byB0aGUgcGFyZW50IChmb3IgYnViYmxpbmcpLlxyXG4gIC8vIERvbid0IHdhbnQgdG8gYWRkIGEgZGF0YSBvYmplY3QgdG8gY2FjaGUgZm9yIGV2ZXJ5IHBhcmVudCxcclxuICAvLyBzbyBjaGVja2luZyBoYXNEYXRhIGZpcnN0LlxyXG4gIHZhciBlbGVtRGF0YSA9ICh2anMuaGFzRGF0YShlbGVtKSkgPyB2anMuZ2V0RGF0YShlbGVtKSA6IHt9O1xyXG4gIHZhciBwYXJlbnQgPSBlbGVtLnBhcmVudE5vZGUgfHwgZWxlbS5vd25lckRvY3VtZW50O1xyXG4gICAgICAvLyB0eXBlID0gZXZlbnQudHlwZSB8fCBldmVudCxcclxuICAgICAgLy8gaGFuZGxlcjtcclxuXHJcbiAgLy8gSWYgYW4gZXZlbnQgbmFtZSB3YXMgcGFzc2VkIGFzIGEgc3RyaW5nLCBjcmVhdGVzIGFuIGV2ZW50IG91dCBvZiBpdFxyXG4gIGlmICh0eXBlb2YgZXZlbnQgPT09ICdzdHJpbmcnKSB7XHJcbiAgICBldmVudCA9IHsgdHlwZTpldmVudCwgdGFyZ2V0OmVsZW0gfTtcclxuICB9XHJcbiAgLy8gTm9ybWFsaXplcyB0aGUgZXZlbnQgcHJvcGVydGllcy5cclxuICBldmVudCA9IHZqcy5maXhFdmVudChldmVudCk7XHJcblxyXG4gIC8vIElmIHRoZSBwYXNzZWQgZWxlbWVudCBoYXMgYSBkaXNwYXRjaGVyLCBleGVjdXRlcyB0aGUgZXN0YWJsaXNoZWQgaGFuZGxlcnMuXHJcbiAgaWYgKGVsZW1EYXRhLmRpc3BhdGNoZXIpIHtcclxuICAgIGVsZW1EYXRhLmRpc3BhdGNoZXIuY2FsbChlbGVtLCBldmVudCk7XHJcbiAgfVxyXG5cclxuICAvLyBVbmxlc3MgZXhwbGljaXRseSBzdG9wcGVkIG9yIHRoZSBldmVudCBkb2VzIG5vdCBidWJibGUgKGUuZy4gbWVkaWEgZXZlbnRzKVxyXG4gICAgLy8gcmVjdXJzaXZlbHkgY2FsbHMgdGhpcyBmdW5jdGlvbiB0byBidWJibGUgdGhlIGV2ZW50IHVwIHRoZSBET00uXHJcbiAgICBpZiAocGFyZW50ICYmICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCgpICYmIGV2ZW50LmJ1YmJsZXMgIT09IGZhbHNlKSB7XHJcbiAgICB2anMudHJpZ2dlcihwYXJlbnQsIGV2ZW50KTtcclxuXHJcbiAgLy8gSWYgYXQgdGhlIHRvcCBvZiB0aGUgRE9NLCB0cmlnZ2VycyB0aGUgZGVmYXVsdCBhY3Rpb24gdW5sZXNzIGRpc2FibGVkLlxyXG4gIH0gZWxzZSBpZiAoIXBhcmVudCAmJiAhZXZlbnQuaXNEZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgIHZhciB0YXJnZXREYXRhID0gdmpzLmdldERhdGEoZXZlbnQudGFyZ2V0KTtcclxuXHJcbiAgICAvLyBDaGVja3MgaWYgdGhlIHRhcmdldCBoYXMgYSBkZWZhdWx0IGFjdGlvbiBmb3IgdGhpcyBldmVudC5cclxuICAgIGlmIChldmVudC50YXJnZXRbZXZlbnQudHlwZV0pIHtcclxuICAgICAgLy8gVGVtcG9yYXJpbHkgZGlzYWJsZXMgZXZlbnQgZGlzcGF0Y2hpbmcgb24gdGhlIHRhcmdldCBhcyB3ZSBoYXZlIGFscmVhZHkgZXhlY3V0ZWQgdGhlIGhhbmRsZXIuXHJcbiAgICAgIHRhcmdldERhdGEuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAvLyBFeGVjdXRlcyB0aGUgZGVmYXVsdCBhY3Rpb24uXHJcbiAgICAgIGlmICh0eXBlb2YgZXZlbnQudGFyZ2V0W2V2ZW50LnR5cGVdID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgZXZlbnQudGFyZ2V0W2V2ZW50LnR5cGVdKCk7XHJcbiAgICAgIH1cclxuICAgICAgLy8gUmUtZW5hYmxlcyBldmVudCBkaXNwYXRjaGluZy5cclxuICAgICAgdGFyZ2V0RGF0YS5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gSW5mb3JtIHRoZSB0cmlnZ2VyZXIgaWYgdGhlIGRlZmF1bHQgd2FzIHByZXZlbnRlZCBieSByZXR1cm5pbmcgZmFsc2VcclxuICByZXR1cm4gIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpO1xyXG4gIC8qIE9yaWdpbmFsIHZlcnNpb24gb2YganMgbmluamEgZXZlbnRzIHdhc24ndCBjb21wbGV0ZS5cclxuICAgKiBXZSd2ZSBzaW5jZSB1cGRhdGVkIHRvIHRoZSBsYXRlc3QgdmVyc2lvbiwgYnV0IGtlZXBpbmcgdGhpcyBhcm91bmRcclxuICAgKiBmb3Igbm93IGp1c3QgaW4gY2FzZS5cclxuICAgKi9cclxuICAvLyAvLyBBZGRlZCBpbiBhdHRpb24gdG8gYm9vay4gQm9vayBjb2RlIHdhcyBicm9rZS5cclxuICAvLyBldmVudCA9IHR5cGVvZiBldmVudCA9PT0gJ29iamVjdCcgP1xyXG4gIC8vICAgZXZlbnRbdmpzLmV4cGFuZG9dID9cclxuICAvLyAgICAgZXZlbnQgOlxyXG4gIC8vICAgICBuZXcgdmpzLkV2ZW50KHR5cGUsIGV2ZW50KSA6XHJcbiAgLy8gICBuZXcgdmpzLkV2ZW50KHR5cGUpO1xyXG5cclxuICAvLyBldmVudC50eXBlID0gdHlwZTtcclxuICAvLyBpZiAoaGFuZGxlcikge1xyXG4gIC8vICAgaGFuZGxlci5jYWxsKGVsZW0sIGV2ZW50KTtcclxuICAvLyB9XHJcblxyXG4gIC8vIC8vIENsZWFuIHVwIHRoZSBldmVudCBpbiBjYXNlIGl0IGlzIGJlaW5nIHJldXNlZFxyXG4gIC8vIGV2ZW50LnJlc3VsdCA9IHVuZGVmaW5lZDtcclxuICAvLyBldmVudC50YXJnZXQgPSBlbGVtO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgYSBsaXN0ZW5lciBvbmx5IG9uY2UgZm9yIGFuIGV2ZW50XHJcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSAgIGVsZW0gRWxlbWVudCBvciBvYmplY3QgdG9cclxuICogQHBhcmFtICB7U3RyaW5nfSAgIHR5cGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub25lID0gZnVuY3Rpb24oZWxlbSwgdHlwZSwgZm4pIHtcclxuICB2YXIgZnVuYyA9IGZ1bmN0aW9uKCl7XHJcbiAgICB2anMub2ZmKGVsZW0sIHR5cGUsIGZ1bmMpO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9O1xyXG4gIGZ1bmMuZ3VpZCA9IGZuLmd1aWQgPSBmbi5ndWlkIHx8IHZqcy5ndWlkKys7XHJcbiAgdmpzLm9uKGVsZW0sIHR5cGUsIGZ1bmMpO1xyXG59O1xyXG52YXIgaGFzT3duUHJvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XHJcblxyXG4vKipcclxuICogQ3JlYXRlcyBhbiBlbGVtZW50IGFuZCBhcHBsaWVzIHByb3BlcnRpZXMuXHJcbiAqIEBwYXJhbSAge1N0cmluZz19IHRhZ05hbWUgICAgTmFtZSBvZiB0YWcgdG8gYmUgY3JlYXRlZC5cclxuICogQHBhcmFtICB7T2JqZWN0PX0gcHJvcGVydGllcyBFbGVtZW50IHByb3BlcnRpZXMgdG8gYmUgYXBwbGllZC5cclxuICogQHJldHVybiB7RWxlbWVudH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5jcmVhdGVFbCA9IGZ1bmN0aW9uKHRhZ05hbWUsIHByb3BlcnRpZXMpe1xyXG4gIHZhciBlbCwgcHJvcE5hbWU7XHJcblxyXG4gIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWdOYW1lIHx8ICdkaXYnKTtcclxuXHJcbiAgZm9yIChwcm9wTmFtZSBpbiBwcm9wZXJ0aWVzKXtcclxuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwocHJvcGVydGllcywgcHJvcE5hbWUpKSB7XHJcbiAgICAgIC8vZWxbcHJvcE5hbWVdID0gcHJvcGVydGllc1twcm9wTmFtZV07XHJcbiAgICAgIC8vIE5vdCByZW1lbWJlcmluZyB3aHkgd2Ugd2VyZSBjaGVja2luZyBmb3IgZGFzaFxyXG4gICAgICAvLyBidXQgdXNpbmcgc2V0QXR0cmlidXRlIG1lYW5zIHlvdSBoYXZlIHRvIHVzZSBnZXRBdHRyaWJ1dGVcclxuXHJcbiAgICAgIC8vIFRoZSBjaGVjayBmb3IgZGFzaCBjaGVja3MgZm9yIHRoZSBhcmlhLSogYXR0cmlidXRlcywgbGlrZSBhcmlhLWxhYmVsLCBhcmlhLXZhbHVlbWluLlxyXG4gICAgICAvLyBUaGUgYWRkaXRpb25hbCBjaGVjayBmb3IgXCJyb2xlXCIgaXMgYmVjYXVzZSB0aGUgZGVmYXVsdCBtZXRob2QgZm9yIGFkZGluZyBhdHRyaWJ1dGVzIGRvZXMgbm90XHJcbiAgICAgIC8vIGFkZCB0aGUgYXR0cmlidXRlIFwicm9sZVwiLiBNeSBndWVzcyBpcyBiZWNhdXNlIGl0J3Mgbm90IGEgdmFsaWQgYXR0cmlidXRlIGluIHNvbWUgbmFtZXNwYWNlcywgYWx0aG91Z2hcclxuICAgICAgLy8gYnJvd3NlcnMgaGFuZGxlIHRoZSBhdHRyaWJ1dGUganVzdCBmaW5lLiBUaGUgVzNDIGFsbG93cyBmb3IgYXJpYS0qIGF0dHJpYnV0ZXMgdG8gYmUgdXNlZCBpbiBwcmUtSFRNTDUgZG9jcy5cclxuICAgICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvd2FpLWFyaWEtcHJpbWVyLyNhcmlhaHRtbC4gVXNpbmcgc2V0QXR0cmlidXRlIGdldHMgYXJvdW5kIHRoaXMgcHJvYmxlbS5cclxuXHJcbiAgICAgICBpZiAocHJvcE5hbWUuaW5kZXhPZignYXJpYS0nKSAhPT0gLTEgfHwgcHJvcE5hbWU9PSdyb2xlJykge1xyXG4gICAgICAgICBlbC5zZXRBdHRyaWJ1dGUocHJvcE5hbWUsIHByb3BlcnRpZXNbcHJvcE5hbWVdKTtcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgIGVsW3Byb3BOYW1lXSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xyXG4gICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogVXBwZXJjYXNlIHRoZSBmaXJzdCBsZXR0ZXIgb2YgYSBzdHJpbmdcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHJpbmcgU3RyaW5nIHRvIGJlIHVwcGVyY2FzZWRcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmNhcGl0YWxpemUgPSBmdW5jdGlvbihzdHJpbmcpe1xyXG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XHJcbn07XHJcblxyXG4vKipcclxuICogT2JqZWN0IGZ1bmN0aW9ucyBjb250YWluZXJcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmogPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBPYmplY3QuY3JlYXRlIHNoaW0gZm9yIHByb3RvdHlwYWwgaW5oZXJpdGFuY2VcclxuICpcclxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvY3JlYXRlXHJcbiAqXHJcbiAqIEBmdW5jdGlvblxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICAgb2JqIE9iamVjdCB0byB1c2UgYXMgcHJvdG90eXBlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG4gdmpzLm9iai5jcmVhdGUgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uKG9iail7XHJcbiAgLy9DcmVhdGUgYSBuZXcgZnVuY3Rpb24gY2FsbGVkICdGJyB3aGljaCBpcyBqdXN0IGFuIGVtcHR5IG9iamVjdC5cclxuICBmdW5jdGlvbiBGKCkge31cclxuXHJcbiAgLy90aGUgcHJvdG90eXBlIG9mIHRoZSAnRicgZnVuY3Rpb24gc2hvdWxkIHBvaW50IHRvIHRoZVxyXG4gIC8vcGFyYW1ldGVyIG9mIHRoZSBhbm9ueW1vdXMgZnVuY3Rpb24uXHJcbiAgRi5wcm90b3R5cGUgPSBvYmo7XHJcblxyXG4gIC8vY3JlYXRlIGEgbmV3IGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGJhc2VkIG9mZiBvZiB0aGUgJ0YnIGZ1bmN0aW9uLlxyXG4gIHJldHVybiBuZXcgRigpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvb3AgdGhyb3VnaCBlYWNoIHByb3BlcnR5IGluIGFuIG9iamVjdCBhbmQgY2FsbCBhIGZ1bmN0aW9uXHJcbiAqIHdob3NlIGFyZ3VtZW50cyBhcmUgKGtleSx2YWx1ZSlcclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9iaiBPYmplY3Qgb2YgcHJvcGVydGllc1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gIEZ1bmN0aW9uIHRvIGJlIGNhbGxlZCBvbiBlYWNoIHByb3BlcnR5LlxyXG4gKiBAdGhpcyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmouZWFjaCA9IGZ1bmN0aW9uKG9iaiwgZm4sIGNvbnRleHQpe1xyXG4gIGZvciAodmFyIGtleSBpbiBvYmopIHtcclxuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwob2JqLCBrZXkpKSB7XHJcbiAgICAgIGZuLmNhbGwoY29udGV4dCB8fCB0aGlzLCBrZXksIG9ialtrZXldKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogTWVyZ2UgdHdvIG9iamVjdHMgdG9nZXRoZXIgYW5kIHJldHVybiB0aGUgb3JpZ2luYWwuXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iajJcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iai5tZXJnZSA9IGZ1bmN0aW9uKG9iajEsIG9iajIpe1xyXG4gIGlmICghb2JqMikgeyByZXR1cm4gb2JqMTsgfVxyXG4gIGZvciAodmFyIGtleSBpbiBvYmoyKXtcclxuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwob2JqMiwga2V5KSkge1xyXG4gICAgICBvYmoxW2tleV0gPSBvYmoyW2tleV07XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBvYmoxO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBhbmQgbWVyZ2UgYW55IHByb3BlcnRpZXMgdGhhdCBhcmUgb2JqZWN0c1xyXG4gKiBpbnN0ZWFkIG9mIGp1c3Qgb3ZlcndyaXRpbmcgb25lLiBVc2VzIHRvIG1lcmdlIG9wdGlvbnMgaGFzaGVzXHJcbiAqIHdoZXJlIGRlZXBlciBkZWZhdWx0IHNldHRpbmdzIGFyZSBpbXBvcnRhbnQuXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMSBPYmplY3QgdG8gb3ZlcnJpZGVcclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmoyIE92ZXJyaWRpbmcgb2JqZWN0XHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICBOZXcgb2JqZWN0LiBPYmoxIGFuZCBPYmoyIHdpbGwgYmUgdW50b3VjaGVkLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iai5kZWVwTWVyZ2UgPSBmdW5jdGlvbihvYmoxLCBvYmoyKXtcclxuICB2YXIga2V5LCB2YWwxLCB2YWwyO1xyXG5cclxuICAvLyBtYWtlIGEgY29weSBvZiBvYmoxIHNvIHdlJ3JlIG5vdCBvdmV3cml0aW5nIG9yaWdpbmFsIHZhbHVlcy5cclxuICAvLyBsaWtlIHByb3RvdHlwZS5vcHRpb25zXyBhbmQgYWxsIHN1YiBvcHRpb25zIG9iamVjdHNcclxuICBvYmoxID0gdmpzLm9iai5jb3B5KG9iajEpO1xyXG5cclxuICBmb3IgKGtleSBpbiBvYmoyKXtcclxuICAgIGlmIChoYXNPd25Qcm9wLmNhbGwob2JqMiwga2V5KSkge1xyXG4gICAgICB2YWwxID0gb2JqMVtrZXldO1xyXG4gICAgICB2YWwyID0gb2JqMltrZXldO1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgYm90aCBwcm9wZXJ0aWVzIGFyZSBwdXJlIG9iamVjdHMgYW5kIGRvIGEgZGVlcCBtZXJnZSBpZiBzb1xyXG4gICAgICBpZiAodmpzLm9iai5pc1BsYWluKHZhbDEpICYmIHZqcy5vYmouaXNQbGFpbih2YWwyKSkge1xyXG4gICAgICAgIG9iajFba2V5XSA9IHZqcy5vYmouZGVlcE1lcmdlKHZhbDEsIHZhbDIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIG9iajFba2V5XSA9IG9iajJba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gb2JqMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNYWtlIGEgY29weSBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0XHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqIE9iamVjdCB0byBjb3B5XHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgIENvcHkgb2Ygb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqLmNvcHkgPSBmdW5jdGlvbihvYmope1xyXG4gIHJldHVybiB2anMub2JqLm1lcmdlKHt9LCBvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBwbGFpbiwgYW5kIG5vdCBhIGRvbSBub2RlIG9yIGFueSBvYmplY3Qgc3ViLWluc3RhbmNlXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqIE9iamVjdCB0byBjaGVja1xyXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICAgVHJ1ZSBpZiBwbGFpbiwgZmFsc2Ugb3RoZXJ3aXNlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqLmlzUGxhaW4gPSBmdW5jdGlvbihvYmope1xyXG4gIHJldHVybiAhIW9ialxyXG4gICAgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCdcclxuICAgICYmIG9iai50b1N0cmluZygpID09PSAnW29iamVjdCBPYmplY3RdJ1xyXG4gICAgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XHJcbn07XHJcblxyXG4vKipcclxuICogQmluZCAoYS5rLmEgcHJveHkgb3IgQ29udGV4dCkuIEEgc2ltcGxlIG1ldGhvZCBmb3IgY2hhbmdpbmcgdGhlIGNvbnRleHQgb2YgYSBmdW5jdGlvblxyXG4gICBJdCBhbHNvIHN0b3JlcyBhIHVuaXF1ZSBpZCBvbiB0aGUgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGVhc2lseSByZW1vdmVkIGZyb20gZXZlbnRzXHJcbiAqIEBwYXJhbSAgeyp9ICAgY29udGV4dCBUaGUgb2JqZWN0IHRvIGJpbmQgYXMgc2NvcGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgICAgVGhlIGZ1bmN0aW9uIHRvIGJlIGJvdW5kIHRvIGEgc2NvcGVcclxuICogQHBhcmFtICB7TnVtYmVyPX0gICB1aWQgICAgIEFuIG9wdGlvbmFsIHVuaXF1ZSBJRCBmb3IgdGhlIGZ1bmN0aW9uIHRvIGJlIHNldFxyXG4gKiBAcmV0dXJuIHtGdW5jdGlvbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5iaW5kID0gZnVuY3Rpb24oY29udGV4dCwgZm4sIHVpZCkge1xyXG4gIC8vIE1ha2Ugc3VyZSB0aGUgZnVuY3Rpb24gaGFzIGEgdW5pcXVlIElEXHJcbiAgaWYgKCFmbi5ndWlkKSB7IGZuLmd1aWQgPSB2anMuZ3VpZCsrOyB9XHJcblxyXG4gIC8vIENyZWF0ZSB0aGUgbmV3IGZ1bmN0aW9uIHRoYXQgY2hhbmdlcyB0aGUgY29udGV4dFxyXG4gIHZhciByZXQgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmbi5hcHBseShjb250ZXh0LCBhcmd1bWVudHMpO1xyXG4gIH07XHJcblxyXG4gIC8vIEFsbG93IGZvciB0aGUgYWJpbGl0eSB0byBpbmRpdmlkdWFsaXplIHRoaXMgZnVuY3Rpb25cclxuICAvLyBOZWVkZWQgaW4gdGhlIGNhc2Ugd2hlcmUgbXVsdGlwbGUgb2JqZWN0cyBtaWdodCBzaGFyZSB0aGUgc2FtZSBwcm90b3R5cGVcclxuICAvLyBJRiBib3RoIGl0ZW1zIGFkZCBhbiBldmVudCBsaXN0ZW5lciB3aXRoIHRoZSBzYW1lIGZ1bmN0aW9uLCB0aGVuIHlvdSB0cnkgdG8gcmVtb3ZlIGp1c3Qgb25lXHJcbiAgLy8gaXQgd2lsbCByZW1vdmUgYm90aCBiZWNhdXNlIHRoZXkgYm90aCBoYXZlIHRoZSBzYW1lIGd1aWQuXHJcbiAgLy8gd2hlbiB1c2luZyB0aGlzLCB5b3UgbmVlZCB0byB1c2UgdGhlIGJpbmQgbWV0aG9kIHdoZW4geW91IHJlbW92ZSB0aGUgbGlzdGVuZXIgYXMgd2VsbC5cclxuICAvLyBjdXJyZW50bHkgdXNlZCBpbiB0ZXh0IHRyYWNrc1xyXG4gIHJldC5ndWlkID0gKHVpZCkgPyB1aWQgKyAnXycgKyBmbi5ndWlkIDogZm4uZ3VpZDtcclxuXHJcbiAgcmV0dXJuIHJldDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbGVtZW50IERhdGEgU3RvcmUuIEFsbG93cyBmb3IgYmluZGluZyBkYXRhIHRvIGFuIGVsZW1lbnQgd2l0aG91dCBwdXR0aW5nIGl0IGRpcmVjdGx5IG9uIHRoZSBlbGVtZW50LlxyXG4gKiBFeC4gRXZlbnQgbGlzdG5lcmVzIGFyZSBzdG9yZWQgaGVyZS5cclxuICogKGFsc28gZnJvbSBqc25pbmphLmNvbSwgc2xpZ2h0bHkgbW9kaWZpZWQgYW5kIHVwZGF0ZWQgZm9yIGNsb3N1cmUgY29tcGlsZXIpXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuY2FjaGUgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBVbmlxdWUgSUQgZm9yIGFuIGVsZW1lbnQgb3IgZnVuY3Rpb25cclxuICogQHR5cGUge051bWJlcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5ndWlkID0gMTtcclxuXHJcbi8qKlxyXG4gKiBVbmlxdWUgYXR0cmlidXRlIG5hbWUgdG8gc3RvcmUgYW4gZWxlbWVudCdzIGd1aWQgaW5cclxuICogQHR5cGUge1N0cmluZ31cclxuICogQGNvbnN0YW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZXhwYW5kbyA9ICd2ZGF0YScgKyAobmV3IERhdGUoKSkuZ2V0VGltZSgpO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgdGhlIGNhY2hlIG9iamVjdCB3aGVyZSBkYXRhIGZvciBhbiBlbGVtZW50IGlzIHN0b3JlZFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbCBFbGVtZW50IHRvIHN0b3JlIGRhdGEgZm9yLlxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ2V0RGF0YSA9IGZ1bmN0aW9uKGVsKXtcclxuICB2YXIgaWQgPSBlbFt2anMuZXhwYW5kb107XHJcbiAgaWYgKCFpZCkge1xyXG4gICAgaWQgPSBlbFt2anMuZXhwYW5kb10gPSB2anMuZ3VpZCsrO1xyXG4gICAgdmpzLmNhY2hlW2lkXSA9IHt9O1xyXG4gIH1cclxuICByZXR1cm4gdmpzLmNhY2hlW2lkXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjYWNoZSBvYmplY3Qgd2hlcmUgZGF0YSBmb3IgYW4gZWxlbWVudCBpcyBzdG9yZWRcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgRWxlbWVudCB0byBzdG9yZSBkYXRhIGZvci5cclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmhhc0RhdGEgPSBmdW5jdGlvbihlbCl7XHJcbiAgdmFyIGlkID0gZWxbdmpzLmV4cGFuZG9dO1xyXG4gIHJldHVybiAhKCFpZCB8fCB2anMuaXNFbXB0eSh2anMuY2FjaGVbaWRdKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGVsZXRlIGRhdGEgZm9yIHRoZSBlbGVtZW50IGZyb20gdGhlIGNhY2hlIGFuZCB0aGUgZ3VpZCBhdHRyIGZyb20gZ2V0RWxlbWVudEJ5SWRcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgUmVtb3ZlIGRhdGEgZm9yIGFuIGVsZW1lbnRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5yZW1vdmVEYXRhID0gZnVuY3Rpb24oZWwpe1xyXG4gIHZhciBpZCA9IGVsW3Zqcy5leHBhbmRvXTtcclxuICBpZiAoIWlkKSB7IHJldHVybjsgfVxyXG4gIC8vIFJlbW92ZSBhbGwgc3RvcmVkIGRhdGFcclxuICAvLyBDaGFuZ2VkIHRvID0gbnVsbFxyXG4gIC8vIGh0dHA6Ly9jb2Rpbmcuc21hc2hpbmdtYWdhemluZS5jb20vMjAxMi8xMS8wNS93cml0aW5nLWZhc3QtbWVtb3J5LWVmZmljaWVudC1qYXZhc2NyaXB0L1xyXG4gIC8vIHZqcy5jYWNoZVtpZF0gPSBudWxsO1xyXG4gIGRlbGV0ZSB2anMuY2FjaGVbaWRdO1xyXG5cclxuICAvLyBSZW1vdmUgdGhlIGV4cGFuZG8gcHJvcGVydHkgZnJvbSB0aGUgRE9NIG5vZGVcclxuICB0cnkge1xyXG4gICAgZGVsZXRlIGVsW3Zqcy5leHBhbmRvXTtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIGlmIChlbC5yZW1vdmVBdHRyaWJ1dGUpIHtcclxuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKHZqcy5leHBhbmRvKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIElFIGRvZXNuJ3QgYXBwZWFyIHRvIHN1cHBvcnQgcmVtb3ZlQXR0cmlidXRlIG9uIHRoZSBkb2N1bWVudCBlbGVtZW50XHJcbiAgICAgIGVsW3Zqcy5leHBhbmRvXSA9IG51bGw7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoZWNrIGlmIGFuIG9iamVjdCBpcyBlbXB0eVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9ICBvYmogVGhlIG9iamVjdCB0byBjaGVjayBmb3IgZW1wdGluZXNzXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuaXNFbXB0eSA9IGZ1bmN0aW9uKG9iaikge1xyXG4gIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XHJcbiAgICAvLyBJbmx1ZGUgbnVsbCBwcm9wZXJ0aWVzIGFzIGVtcHR5LlxyXG4gICAgaWYgKG9ialtwcm9wXSAhPT0gbnVsbCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIENTUyBjbGFzcyBuYW1lIHRvIGFuIGVsZW1lbnRcclxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtZW50ICAgIEVsZW1lbnQgdG8gYWRkIGNsYXNzIG5hbWUgdG9cclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzVG9BZGQgQ2xhc3NuYW1lIHRvIGFkZFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmFkZENsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY2xhc3NUb0FkZCl7XHJcbiAgaWYgKCgnICcrZWxlbWVudC5jbGFzc05hbWUrJyAnKS5pbmRleE9mKCcgJytjbGFzc1RvQWRkKycgJykgPT0gLTEpIHtcclxuICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUgPT09ICcnID8gY2xhc3NUb0FkZCA6IGVsZW1lbnQuY2xhc3NOYW1lICsgJyAnICsgY2xhc3NUb0FkZDtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgQ1NTIGNsYXNzIG5hbWUgZnJvbSBhbiBlbGVtZW50XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAgICBFbGVtZW50IHRvIHJlbW92ZSBmcm9tIGNsYXNzIG5hbWVcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzVG9BZGQgQ2xhc3NuYW1lIHRvIHJlbW92ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWxlbWVudCwgY2xhc3NUb1JlbW92ZSl7XHJcbiAgdmFyIGNsYXNzTmFtZXMsIGk7XHJcblxyXG4gIGlmIChlbGVtZW50LmNsYXNzTmFtZS5pbmRleE9mKGNsYXNzVG9SZW1vdmUpID09IC0xKSB7IHJldHVybjsgfVxyXG5cclxuICBjbGFzc05hbWVzID0gZWxlbWVudC5jbGFzc05hbWUuc3BsaXQoJyAnKTtcclxuXHJcbiAgLy8gbm8gYXJyLmluZGV4T2YgaW4gaWU4LCBhbmQgd2UgZG9uJ3Qgd2FudCB0byBhZGQgYSBiaWcgc2hpbVxyXG4gIGZvciAoaSA9IGNsYXNzTmFtZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIGlmIChjbGFzc05hbWVzW2ldID09PSBjbGFzc1RvUmVtb3ZlKSB7XHJcbiAgICAgIGNsYXNzTmFtZXMuc3BsaWNlKGksMSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBlbGVtZW50LmNsYXNzTmFtZSA9IGNsYXNzTmFtZXMuam9pbignICcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVsZW1lbnQgZm9yIHRlc3RpbmcgYnJvd3NlciBIVE1MNSB2aWRlbyBjYXBhYmlsaXRpZXNcclxuICogQHR5cGUge0VsZW1lbnR9XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRFU1RfVklEID0gdmpzLmNyZWF0ZUVsKCd2aWRlbycpO1xyXG5cclxuLyoqXHJcbiAqIFVzZXJhZ2VudCBmb3IgYnJvd3NlciB0ZXN0aW5nLlxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAY29uc3RhbnRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5VU0VSX0FHRU5UID0gbmF2aWdhdG9yLnVzZXJBZ2VudDtcclxuXHJcbi8qKlxyXG4gKiBEZXZpY2UgaXMgYW4gaVBob25lXHJcbiAqIEB0eXBlIHtCb29sZWFufVxyXG4gKiBAY29uc3RhbnRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5JU19JUEhPTkUgPSAoL2lQaG9uZS9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxudmpzLklTX0lQQUQgPSAoL2lQYWQvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcbnZqcy5JU19JUE9EID0gKC9pUG9kL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG52anMuSVNfSU9TID0gdmpzLklTX0lQSE9ORSB8fCB2anMuSVNfSVBBRCB8fCB2anMuSVNfSVBPRDtcclxuXHJcbnZqcy5JT1NfVkVSU0lPTiA9IChmdW5jdGlvbigpe1xyXG4gIHZhciBtYXRjaCA9IHZqcy5VU0VSX0FHRU5ULm1hdGNoKC9PUyAoXFxkKylfL2kpO1xyXG4gIGlmIChtYXRjaCAmJiBtYXRjaFsxXSkgeyByZXR1cm4gbWF0Y2hbMV07IH1cclxufSkoKTtcclxuXHJcbnZqcy5JU19BTkRST0lEID0gKC9BbmRyb2lkL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG52anMuQU5EUk9JRF9WRVJTSU9OID0gKGZ1bmN0aW9uKCkge1xyXG4gIC8vIFRoaXMgbWF0Y2hlcyBBbmRyb2lkIE1ham9yLk1pbm9yLlBhdGNoIHZlcnNpb25zXHJcbiAgLy8gQU5EUk9JRF9WRVJTSU9OIGlzIE1ham9yLk1pbm9yIGFzIGEgTnVtYmVyLCBpZiBNaW5vciBpc24ndCBhdmFpbGFibGUsIHRoZW4gb25seSBNYWpvciBpcyByZXR1cm5lZFxyXG4gIHZhciBtYXRjaCA9IHZqcy5VU0VSX0FHRU5ULm1hdGNoKC9BbmRyb2lkIChcXGQrKSg/OlxcLihcXGQrKSk/KD86XFwuKFxcZCspKSovaSksXHJcbiAgICBtYWpvcixcclxuICAgIG1pbm9yO1xyXG5cclxuICBpZiAoIW1hdGNoKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcblxyXG4gIG1ham9yID0gbWF0Y2hbMV0gJiYgcGFyc2VGbG9hdChtYXRjaFsxXSk7XHJcbiAgbWlub3IgPSBtYXRjaFsyXSAmJiBwYXJzZUZsb2F0KG1hdGNoWzJdKTtcclxuXHJcbiAgaWYgKG1ham9yICYmIG1pbm9yKSB7XHJcbiAgICByZXR1cm4gcGFyc2VGbG9hdChtYXRjaFsxXSArICcuJyArIG1hdGNoWzJdKTtcclxuICB9IGVsc2UgaWYgKG1ham9yKSB7XHJcbiAgICByZXR1cm4gbWFqb3I7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH1cclxufSkoKTtcclxuLy8gT2xkIEFuZHJvaWQgaXMgZGVmaW5lZCBhcyBWZXJzaW9uIG9sZGVyIHRoYW4gMi4zLCBhbmQgcmVxdWlyaW5nIGEgd2Via2l0IHZlcnNpb24gb2YgdGhlIGFuZHJvaWQgYnJvd3NlclxyXG52anMuSVNfT0xEX0FORFJPSUQgPSB2anMuSVNfQU5EUk9JRCAmJiAoL3dlYmtpdC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKSAmJiB2anMuQU5EUk9JRF9WRVJTSU9OIDwgMi4zO1xyXG5cclxudmpzLklTX0ZJUkVGT1ggPSAoL0ZpcmVmb3gvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcbnZqcy5JU19DSFJPTUUgPSAoL0Nocm9tZS9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxuXHJcbnZqcy5UT1VDSF9FTkFCTEVEID0gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaCk7XHJcblxyXG4vKipcclxuICogR2V0IGFuIGVsZW1lbnQncyBhdHRyaWJ1dGUgdmFsdWVzLCBhcyBkZWZpbmVkIG9uIHRoZSBIVE1MIHRhZ1xyXG4gKiBBdHRyaWJ1dHMgYXJlIG5vdCB0aGUgc2FtZSBhcyBwcm9wZXJ0aWVzLiBUaGV5J3JlIGRlZmluZWQgb24gdGhlIHRhZ1xyXG4gKiBvciB3aXRoIHNldEF0dHJpYnV0ZSAod2hpY2ggc2hvdWxkbid0IGJlIHVzZWQgd2l0aCBIVE1MKVxyXG4gKiBUaGlzIHdpbGwgcmV0dXJuIHRydWUgb3IgZmFsc2UgZm9yIGJvb2xlYW4gYXR0cmlidXRlcy5cclxuICogQHBhcmFtICB7RWxlbWVudH0gdGFnIEVsZW1lbnQgZnJvbSB3aGljaCB0byBnZXQgdGFnIGF0dHJpYnV0ZXNcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmdldEF0dHJpYnV0ZVZhbHVlcyA9IGZ1bmN0aW9uKHRhZyl7XHJcbiAgdmFyIG9iaiwga25vd25Cb29sZWFucywgYXR0cnMsIGF0dHJOYW1lLCBhdHRyVmFsO1xyXG5cclxuICBvYmogPSB7fTtcclxuXHJcbiAgLy8ga25vd24gYm9vbGVhbiBhdHRyaWJ1dGVzXHJcbiAgLy8gd2UgY2FuIGNoZWNrIGZvciBtYXRjaGluZyBib29sZWFuIHByb3BlcnRpZXMsIGJ1dCBvbGRlciBicm93c2Vyc1xyXG4gIC8vIHdvbid0IGtub3cgYWJvdXQgSFRNTDUgYm9vbGVhbiBhdHRyaWJ1dGVzIHRoYXQgd2Ugc3RpbGwgcmVhZCBmcm9tXHJcbiAga25vd25Cb29sZWFucyA9ICcsJysnYXV0b3BsYXksY29udHJvbHMsbG9vcCxtdXRlZCxkZWZhdWx0JysnLCc7XHJcblxyXG4gIGlmICh0YWcgJiYgdGFnLmF0dHJpYnV0ZXMgJiYgdGFnLmF0dHJpYnV0ZXMubGVuZ3RoID4gMCkge1xyXG4gICAgYXR0cnMgPSB0YWcuYXR0cmlidXRlcztcclxuXHJcbiAgICBmb3IgKHZhciBpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgYXR0ck5hbWUgPSBhdHRyc1tpXS5uYW1lO1xyXG4gICAgICBhdHRyVmFsID0gYXR0cnNbaV0udmFsdWU7XHJcblxyXG4gICAgICAvLyBjaGVjayBmb3Iga25vd24gYm9vbGVhbnNcclxuICAgICAgLy8gdGhlIG1hdGNoaW5nIGVsZW1lbnQgcHJvcGVydHkgd2lsbCByZXR1cm4gYSB2YWx1ZSBmb3IgdHlwZW9mXHJcbiAgICAgIGlmICh0eXBlb2YgdGFnW2F0dHJOYW1lXSA9PT0gJ2Jvb2xlYW4nIHx8IGtub3duQm9vbGVhbnMuaW5kZXhPZignLCcrYXR0ck5hbWUrJywnKSAhPT0gLTEpIHtcclxuICAgICAgICAvLyB0aGUgdmFsdWUgb2YgYW4gaW5jbHVkZWQgYm9vbGVhbiBhdHRyaWJ1dGUgaXMgdHlwaWNhbGx5IGFuIGVtcHR5XHJcbiAgICAgICAgLy8gc3RyaW5nICgnJykgd2hpY2ggd291bGQgZXF1YWwgZmFsc2UgaWYgd2UganVzdCBjaGVjayBmb3IgYSBmYWxzZSB2YWx1ZS5cclxuICAgICAgICAvLyB3ZSBhbHNvIGRvbid0IHdhbnQgc3VwcG9ydCBiYWQgY29kZSBsaWtlIGF1dG9wbGF5PSdmYWxzZSdcclxuICAgICAgICBhdHRyVmFsID0gKGF0dHJWYWwgIT09IG51bGwpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBvYmpbYXR0ck5hbWVdID0gYXR0clZhbDtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBvYmo7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb21wdXRlZCBzdHlsZSB2YWx1ZSBmb3IgYW4gZWxlbWVudFxyXG4gKiBGcm9tIGh0dHA6Ly9yb2JlcnRueW1hbi5jb20vMjAwNi8wNC8yNC9nZXQtdGhlLXJlbmRlcmVkLXN0eWxlLW9mLWFuLWVsZW1lbnQvXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsICAgICAgICBFbGVtZW50IHRvIGdldCBzdHlsZSB2YWx1ZSBmb3JcclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHJDc3NSdWxlIFN0eWxlIG5hbWVcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgICAgIFN0eWxlIHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ2V0Q29tcHV0ZWREaW1lbnNpb24gPSBmdW5jdGlvbihlbCwgc3RyQ3NzUnVsZSl7XHJcbiAgdmFyIHN0clZhbHVlID0gJyc7XHJcbiAgaWYoZG9jdW1lbnQuZGVmYXVsdFZpZXcgJiYgZG9jdW1lbnQuZGVmYXVsdFZpZXcuZ2V0Q29tcHV0ZWRTdHlsZSl7XHJcbiAgICBzdHJWYWx1ZSA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWwsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKHN0ckNzc1J1bGUpO1xyXG5cclxuICB9IGVsc2UgaWYoZWwuY3VycmVudFN0eWxlKXtcclxuICAgIC8vIElFOCBXaWR0aC9IZWlnaHQgc3VwcG9ydFxyXG4gICAgc3RyVmFsdWUgPSBlbFsnY2xpZW50JytzdHJDc3NSdWxlLnN1YnN0cigwLDEpLnRvVXBwZXJDYXNlKCkgKyBzdHJDc3NSdWxlLnN1YnN0cigxKV0gKyAncHgnO1xyXG4gIH1cclxuICByZXR1cm4gc3RyVmFsdWU7XHJcbn07XHJcblxyXG4vKipcclxuICogSW5zZXJ0IGFuIGVsZW1lbnQgYXMgdGhlIGZpcnN0IGNoaWxkIG5vZGUgb2YgYW5vdGhlclxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBjaGlsZCAgIEVsZW1lbnQgdG8gaW5zZXJ0XHJcbiAqIEBwYXJhbSAge1t0eXBlXX0gcGFyZW50IEVsZW1lbnQgdG8gaW5zZXJ0IGNoaWxkIGludG9cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5pbnNlcnRGaXJzdCA9IGZ1bmN0aW9uKGNoaWxkLCBwYXJlbnQpe1xyXG4gIGlmIChwYXJlbnQuZmlyc3RDaGlsZCkge1xyXG4gICAgcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgcGFyZW50LmZpcnN0Q2hpbGQpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBPYmplY3QgdG8gaG9sZCBicm93c2VyIHN1cHBvcnQgaW5mb3JtYXRpb25cclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5zdXBwb3J0ID0ge307XHJcblxyXG4vKipcclxuICogU2hvcnRoYW5kIGZvciBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgpXHJcbiAqIEFsc28gYWxsb3dzIGZvciBDU1MgKGpRdWVyeSkgSUQgc3ludGF4LiBCdXQgbm90aGluZyBvdGhlciB0aGFuIElEcy5cclxuICogQHBhcmFtICB7U3RyaW5nfSBpZCAgRWxlbWVudCBJRFxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fSAgICBFbGVtZW50IHdpdGggc3VwcGxpZWQgSURcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5lbCA9IGZ1bmN0aW9uKGlkKXtcclxuICBpZiAoaWQuaW5kZXhPZignIycpID09PSAwKSB7XHJcbiAgICBpZCA9IGlkLnNsaWNlKDEpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGb3JtYXQgc2Vjb25kcyBhcyBhIHRpbWUgc3RyaW5nLCBIOk1NOlNTIG9yIE06U1NcclxuICogU3VwcGx5aW5nIGEgZ3VpZGUgKGluIHNlY29uZHMpIHdpbGwgZm9yY2UgYSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvc1xyXG4gKiB0byBjb3ZlciB0aGUgbGVuZ3RoIG9mIHRoZSBndWlkZVxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHNlY29uZHMgTnVtYmVyIG9mIHNlY29uZHMgdG8gYmUgdHVybmVkIGludG8gYSBzdHJpbmdcclxuICogQHBhcmFtICB7TnVtYmVyfSBndWlkZSAgIE51bWJlciAoaW4gc2Vjb25kcykgdG8gbW9kZWwgdGhlIHN0cmluZyBhZnRlclxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICAgVGltZSBmb3JtYXR0ZWQgYXMgSDpNTTpTUyBvciBNOlNTXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZm9ybWF0VGltZSA9IGZ1bmN0aW9uKHNlY29uZHMsIGd1aWRlKSB7XHJcbiAgLy8gRGVmYXVsdCB0byB1c2luZyBzZWNvbmRzIGFzIGd1aWRlXHJcbiAgZ3VpZGUgPSBndWlkZSB8fCBzZWNvbmRzO1xyXG4gIHZhciBzID0gTWF0aC5mbG9vcihzZWNvbmRzICUgNjApLFxyXG4gICAgICBtID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gNjAgJSA2MCksXHJcbiAgICAgIGggPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKSxcclxuICAgICAgZ20gPSBNYXRoLmZsb29yKGd1aWRlIC8gNjAgJSA2MCksXHJcbiAgICAgIGdoID0gTWF0aC5mbG9vcihndWlkZSAvIDM2MDApO1xyXG5cclxuICAvLyBoYW5kbGUgaW52YWxpZCB0aW1lc1xyXG4gIGlmIChpc05hTihzZWNvbmRzKSB8fCBzZWNvbmRzID09PSBJbmZpbml0eSkge1xyXG4gICAgLy8gJy0nIGlzIGZhbHNlIGZvciBhbGwgcmVsYXRpb25hbCBvcGVyYXRvcnMgKGUuZy4gPCwgPj0pIHNvIHRoaXMgc2V0dGluZ1xyXG4gICAgLy8gd2lsbCBhZGQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGZpZWxkcyBzcGVjaWZpZWQgYnkgdGhlIGd1aWRlXHJcbiAgICBoID0gbSA9IHMgPSAnLSc7XHJcbiAgfVxyXG5cclxuICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHNob3cgaG91cnNcclxuICBoID0gKGggPiAwIHx8IGdoID4gMCkgPyBoICsgJzonIDogJyc7XHJcblxyXG4gIC8vIElmIGhvdXJzIGFyZSBzaG93aW5nLCB3ZSBtYXkgbmVlZCB0byBhZGQgYSBsZWFkaW5nIHplcm8uXHJcbiAgLy8gQWx3YXlzIHNob3cgYXQgbGVhc3Qgb25lIGRpZ2l0IG9mIG1pbnV0ZXMuXHJcbiAgbSA9ICgoKGggfHwgZ20gPj0gMTApICYmIG0gPCAxMCkgPyAnMCcgKyBtIDogbSkgKyAnOic7XHJcblxyXG4gIC8vIENoZWNrIGlmIGxlYWRpbmcgemVybyBpcyBuZWVkIGZvciBzZWNvbmRzXHJcbiAgcyA9IChzIDwgMTApID8gJzAnICsgcyA6IHM7XHJcblxyXG4gIHJldHVybiBoICsgbSArIHM7XHJcbn07XHJcblxyXG4vLyBBdHRlbXB0IHRvIGJsb2NrIHRoZSBhYmlsaXR5IHRvIHNlbGVjdCB0ZXh0IHdoaWxlIGRyYWdnaW5nIGNvbnRyb2xzXHJcbnZqcy5ibG9ja1RleHRTZWxlY3Rpb24gPSBmdW5jdGlvbigpe1xyXG4gIGRvY3VtZW50LmJvZHkuZm9jdXMoKTtcclxuICBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gZmFsc2U7IH07XHJcbn07XHJcbi8vIFR1cm4gb2ZmIHRleHQgc2VsZWN0aW9uIGJsb2NraW5nXHJcbnZqcy51bmJsb2NrVGV4dFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCl7IGRvY3VtZW50Lm9uc2VsZWN0c3RhcnQgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB0cnVlOyB9OyB9O1xyXG5cclxuLyoqXHJcbiAqIFRyaW0gd2hpdGVzcGFjZSBmcm9tIHRoZSBlbmRzIG9mIGEgc3RyaW5nLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHN0cmluZyBTdHJpbmcgdG8gdHJpbVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICAgICBUcmltbWVkIHN0cmluZ1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnRyaW0gPSBmdW5jdGlvbihzdHIpe1xyXG4gIHJldHVybiAoc3RyKycnKS5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2hvdWxkIHJvdW5kIG9mZiBhIG51bWJlciB0byBhIGRlY2ltYWwgcGxhY2VcclxuICogQHBhcmFtICB7TnVtYmVyfSBudW0gTnVtYmVyIHRvIHJvdW5kXHJcbiAqIEBwYXJhbSAge051bWJlcn0gZGVjIE51bWJlciBvZiBkZWNpbWFsIHBsYWNlcyB0byByb3VuZCB0b1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICBSb3VuZGVkIG51bWJlclxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnJvdW5kID0gZnVuY3Rpb24obnVtLCBkZWMpIHtcclxuICBpZiAoIWRlYykgeyBkZWMgPSAwOyB9XHJcbiAgcmV0dXJuIE1hdGgucm91bmQobnVtKk1hdGgucG93KDEwLGRlYykpL01hdGgucG93KDEwLGRlYyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2hvdWxkIGNyZWF0ZSBhIGZha2UgVGltZVJhbmdlIG9iamVjdFxyXG4gKiBNaW1pY3MgYW4gSFRNTDUgdGltZSByYW5nZSBpbnN0YW5jZSwgd2hpY2ggaGFzIGZ1bmN0aW9ucyB0aGF0XHJcbiAqIHJldHVybiB0aGUgc3RhcnQgYW5kIGVuZCB0aW1lcyBmb3IgYSByYW5nZVxyXG4gKiBUaW1lUmFuZ2VzIGFyZSByZXR1cm5lZCBieSB0aGUgYnVmZmVyZWQoKSBtZXRob2RcclxuICogQHBhcmFtICB7TnVtYmVyfSBzdGFydCBTdGFydCB0aW1lIGluIHNlY29uZHNcclxuICogQHBhcmFtICB7TnVtYmVyfSBlbmQgICBFbmQgdGltZSBpbiBzZWNvbmRzXHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgICAgRmFrZSBUaW1lUmFuZ2Ugb2JqZWN0XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuY3JlYXRlVGltZVJhbmdlID0gZnVuY3Rpb24oc3RhcnQsIGVuZCl7XHJcbiAgcmV0dXJuIHtcclxuICAgIGxlbmd0aDogMSxcclxuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHN0YXJ0OyB9LFxyXG4gICAgZW5kOiBmdW5jdGlvbigpIHsgcmV0dXJuIGVuZDsgfVxyXG4gIH07XHJcbn07XHJcblxyXG4vKipcclxuICogU2ltcGxlIGh0dHAgcmVxdWVzdCBmb3IgcmV0cmlldmluZyBleHRlcm5hbCBmaWxlcyAoZS5nLiB0ZXh0IHRyYWNrcylcclxuICogQHBhcmFtICB7U3RyaW5nfSB1cmwgICAgICAgICAgIFVSTCBvZiByZXNvdXJjZVxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IG9uU3VjY2VzcyAgU3VjY2VzcyBjYWxsYmFja1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IG9uRXJyb3IgICAgRXJyb3IgY2FsbGJhY2tcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5nZXQgPSBmdW5jdGlvbih1cmwsIG9uU3VjY2Vzcywgb25FcnJvcil7XHJcbiAgdmFyIGxvY2FsLCByZXF1ZXN0O1xyXG5cclxuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgd2luZG93LlhNTEh0dHBSZXF1ZXN0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaCAoZSkge31cclxuICAgICAgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2ggKGYpIHt9XHJcbiAgICAgIHRyeSB7IHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2ggKGcpIHt9XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBicm93c2VyIGRvZXMgbm90IHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QuJyk7XHJcbiAgICB9O1xyXG4gIH1cclxuXHJcbiAgcmVxdWVzdCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gIHRyeSB7XHJcbiAgICByZXF1ZXN0Lm9wZW4oJ0dFVCcsIHVybCk7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICBvbkVycm9yKGUpO1xyXG4gIH1cclxuXHJcbiAgbG9jYWwgPSAodXJsLmluZGV4T2YoJ2ZpbGU6JykgPT09IDAgfHwgKHdpbmRvdy5sb2NhdGlvbi5ocmVmLmluZGV4T2YoJ2ZpbGU6JykgPT09IDAgJiYgdXJsLmluZGV4T2YoJ2h0dHAnKSA9PT0gLTEpKTtcclxuXHJcbiAgcmVxdWVzdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChyZXF1ZXN0LnJlYWR5U3RhdGUgPT09IDQpIHtcclxuICAgICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDAgfHwgbG9jYWwgJiYgcmVxdWVzdC5zdGF0dXMgPT09IDApIHtcclxuICAgICAgICBvblN1Y2Nlc3MocmVxdWVzdC5yZXNwb25zZVRleHQpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgICAgICBvbkVycm9yKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgdHJ5IHtcclxuICAgIHJlcXVlc3Quc2VuZCgpO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgaWYgKG9uRXJyb3IpIHtcclxuICAgICAgb25FcnJvcihlKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIHRvIGxvY2FsIHN0b3JhZ2UgKG1heSByZW1vdmVhYmxlKVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLnNldExvY2FsU3RvcmFnZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xyXG4gIHRyeSB7XHJcbiAgICAvLyBJRSB3YXMgdGhyb3dpbmcgZXJyb3JzIHJlZmVyZW5jaW5nIHRoZSB2YXIgYW55d2hlcmUgd2l0aG91dCB0aGlzXHJcbiAgICB2YXIgbG9jYWxTdG9yYWdlID0gd2luZG93LmxvY2FsU3RvcmFnZSB8fCBmYWxzZTtcclxuICAgIGlmICghbG9jYWxTdG9yYWdlKSB7IHJldHVybjsgfVxyXG4gICAgbG9jYWxTdG9yYWdlW2tleV0gPSB2YWx1ZTtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIGlmIChlLmNvZGUgPT0gMjIgfHwgZS5jb2RlID09IDEwMTQpIHsgLy8gV2Via2l0ID09IDIyIC8gRmlyZWZveCA9PSAxMDE0XHJcbiAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBGdWxsIChWaWRlb0pTKScsIGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKGUuY29kZSA9PSAxOCkge1xyXG4gICAgICAgIHZqcy5sb2coJ0xvY2FsU3RvcmFnZSBub3QgYWxsb3dlZCAoVmlkZW9KUyknLCBlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2anMubG9nKCdMb2NhbFN0b3JhZ2UgRXJyb3IgKFZpZGVvSlMpJywgZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IGFib3NvbHV0ZSB2ZXJzaW9uIG9mIHJlbGF0aXZlIFVSTC4gVXNlZCB0byB0ZWxsIGZsYXNoIGNvcnJlY3QgVVJMLlxyXG4gKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzQ3MDgzMi9nZXR0aW5nLWFuLWFic29sdXRlLXVybC1mcm9tLWEtcmVsYXRpdmUtb25lLWllNi1pc3N1ZVxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHVybCBVUkwgdG8gbWFrZSBhYnNvbHV0ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9ICAgICBBYnNvbHV0ZSBVUkxcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5nZXRBYnNvbHV0ZVVSTCA9IGZ1bmN0aW9uKHVybCl7XHJcblxyXG4gIC8vIENoZWNrIGlmIGFic29sdXRlIFVSTFxyXG4gIGlmICghdXJsLm1hdGNoKC9eaHR0cHM/OlxcL1xcLy8pKSB7XHJcbiAgICAvLyBDb252ZXJ0IHRvIGFic29sdXRlIFVSTC4gRmxhc2ggaG9zdGVkIG9mZi1zaXRlIG5lZWRzIGFuIGFic29sdXRlIFVSTC5cclxuICAgIHVybCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgICBpbm5lckhUTUw6ICc8YSBocmVmPVwiJyt1cmwrJ1wiPng8L2E+J1xyXG4gICAgfSkuZmlyc3RDaGlsZC5ocmVmO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHVybDtcclxufTtcclxuXHJcbi8vIHVzYWdlOiBsb2coJ2luc2lkZSBjb29sRnVuYycsdGhpcyxhcmd1bWVudHMpO1xyXG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDA5L2xvZy1hLWxpZ2h0d2VpZ2h0LXdyYXBwZXItZm9yLWNvbnNvbGVsb2cvXHJcbnZqcy5sb2cgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5sb2cuaGlzdG9yeSA9IHZqcy5sb2cuaGlzdG9yeSB8fCBbXTsgICAvLyBzdG9yZSBsb2dzIHRvIGFuIGFycmF5IGZvciByZWZlcmVuY2VcclxuICB2anMubG9nLmhpc3RvcnkucHVzaChhcmd1bWVudHMpO1xyXG4gIGlmKHdpbmRvdy5jb25zb2xlKXtcclxuICAgIHdpbmRvdy5jb25zb2xlLmxvZyhBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBPZmZzZXQgTGVmdFxyXG4vLyBnZXRCb3VuZGluZ0NsaWVudFJlY3QgdGVjaG5pcXVlIGZyb20gSm9obiBSZXNpZyBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvZ2V0Ym91bmRpbmdjbGllbnRyZWN0LWlzLWF3ZXNvbWUvXHJcbnZqcy5maW5kUG9zaXRpb24gPSBmdW5jdGlvbihlbCkge1xyXG4gICAgdmFyIGJveCwgZG9jRWwsIGJvZHksIGNsaWVudExlZnQsIHNjcm9sbExlZnQsIGxlZnQsIGNsaWVudFRvcCwgc2Nyb2xsVG9wLCB0b3A7XHJcblxyXG4gICAgaWYgKGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCAmJiBlbC5wYXJlbnROb2RlKSB7XHJcbiAgICAgIGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghYm94KSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgbGVmdDogMCxcclxuICAgICAgICB0b3A6IDBcclxuICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcclxuICAgIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xyXG5cclxuICAgIGNsaWVudExlZnQgPSBkb2NFbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xyXG4gICAgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBib2R5LnNjcm9sbExlZnQ7XHJcbiAgICBsZWZ0ID0gYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdDtcclxuXHJcbiAgICBjbGllbnRUb3AgPSBkb2NFbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcclxuICAgIHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBib2R5LnNjcm9sbFRvcDtcclxuICAgIHRvcCA9IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3A7XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgbGVmdDogbGVmdCxcclxuICAgICAgdG9wOiB0b3BcclxuICAgIH07XHJcbn07XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IFBsYXllciBDb21wb25lbnQgLSBCYXNlIGNsYXNzIGZvciBhbGwgVUkgb2JqZWN0c1xyXG4gKlxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBCYXNlIFVJIENvbXBvbmVudCBjbGFzc1xyXG4gKlxyXG4gKiBDb21wb25lbnRzIGFyZSBlbWJlZGRhYmxlIFVJIG9iamVjdHMgdGhhdCBhcmUgcmVwcmVzZW50ZWQgYnkgYm90aCBhXHJcbiAqIGphdmFzY3JpcHQgb2JqZWN0IGFuZCBhbiBlbGVtZW50IGluIHRoZSBET00uIFRoZXkgY2FuIGJlIGNoaWxkcmVuIG9mIG90aGVyXHJcbiAqIGNvbXBvbmVudHMsIGFuZCBjYW4gaGF2ZSBtYW55IGNoaWxkcmVuIHRoZW1zZWx2ZXMuXHJcbiAqXHJcbiAqICAgICAvLyBhZGRpbmcgYSBidXR0b24gdG8gdGhlIHBsYXllclxyXG4gKiAgICAgdmFyIGJ1dHRvbiA9IHBsYXllci5hZGRDaGlsZCgnYnV0dG9uJyk7XHJcbiAqICAgICBidXR0b24uZWwoKTsgLy8gLT4gYnV0dG9uIGVsZW1lbnRcclxuICpcclxuICogICAgIDxkaXYgY2xhc3M9XCJ2aWRlby1qc1wiPlxyXG4gKiAgICAgICA8ZGl2IGNsYXNzPVwidmpzLWJ1dHRvblwiPkJ1dHRvbjwvZGl2PlxyXG4gKiAgICAgPC9kaXY+XHJcbiAqXHJcbiAqIENvbXBvbmVudHMgYXJlIGFsc28gZXZlbnQgZW1pdHRlcnMuXHJcbiAqXHJcbiAqICAgICBidXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICogICAgICAgLy9jb25zb2xlLmxvZygnQnV0dG9uIENsaWNrZWQhJyk7XHJcbiAqICAgICB9KTtcclxuICpcclxuICogICAgIGJ1dHRvbi50cmlnZ2VyKCdjdXN0b21ldmVudCcpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gcGxheWVyICBNYWluIFBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKiBAZXh0ZW5kcyB2anMuQ29yZU9iamVjdFxyXG4gKi9cclxudmpzLkNvbXBvbmVudCA9IHZqcy5Db3JlT2JqZWN0LmV4dGVuZCh7XHJcbiAgLyoqXHJcbiAgICogdGhlIGNvbnN0cnVjdG9yIGZ1bmNpdG9uIGZvciB0aGUgY2xhc3NcclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdGhpcy5wbGF5ZXJfID0gcGxheWVyO1xyXG5cclxuICAgIC8vIE1ha2UgYSBjb3B5IG9mIHByb3RvdHlwZS5vcHRpb25zXyB0byBwcm90ZWN0IGFnYWluc3Qgb3ZlcnJpZGluZyBnbG9iYWwgZGVmYXVsdHNcclxuICAgIHRoaXMub3B0aW9uc18gPSB2anMub2JqLmNvcHkodGhpcy5vcHRpb25zXyk7XHJcblxyXG4gICAgLy8gVXBkYXRlZCBvcHRpb25zIHdpdGggc3VwcGxpZWQgb3B0aW9uc1xyXG4gICAgb3B0aW9ucyA9IHRoaXMub3B0aW9ucyhvcHRpb25zKTtcclxuXHJcbiAgICAvLyBHZXQgSUQgZnJvbSBvcHRpb25zLCBlbGVtZW50LCBvciBjcmVhdGUgdXNpbmcgcGxheWVyIElEIGFuZCB1bmlxdWUgSURcclxuICAgIHRoaXMuaWRfID0gb3B0aW9uc1snaWQnXSB8fCAoKG9wdGlvbnNbJ2VsJ10gJiYgb3B0aW9uc1snZWwnXVsnaWQnXSkgPyBvcHRpb25zWydlbCddWydpZCddIDogcGxheWVyLmlkKCkgKyAnX2NvbXBvbmVudF8nICsgdmpzLmd1aWQrKyApO1xyXG5cclxuICAgIHRoaXMubmFtZV8gPSBvcHRpb25zWyduYW1lJ10gfHwgbnVsbDtcclxuXHJcbiAgICAvLyBDcmVhdGUgZWxlbWVudCBpZiBvbmUgd2Fzbid0IHByb3ZpZGVkIGluIG9wdGlvbnNcclxuICAgIHRoaXMuZWxfID0gb3B0aW9uc1snZWwnXSB8fCB0aGlzLmNyZWF0ZUVsKCk7XHJcblxyXG4gICAgdGhpcy5jaGlsZHJlbl8gPSBbXTtcclxuICAgIHRoaXMuY2hpbGRJbmRleF8gPSB7fTtcclxuICAgIHRoaXMuY2hpbGROYW1lSW5kZXhfID0ge307XHJcblxyXG4gICAgLy8gQWRkIGFueSBjaGlsZCBjb21wb25lbnRzIGluIG9wdGlvbnNcclxuICAgIHRoaXMuaW5pdENoaWxkcmVuKCk7XHJcblxyXG4gICAgdGhpcy5yZWFkeShyZWFkeSk7XHJcbiAgICAvLyBEb24ndCB3YW50IHRvIHRyaWdnZXIgcmVhZHkgaGVyZSBvciBpdCB3aWxsIGJlZm9yZSBpbml0IGlzIGFjdHVhbGx5XHJcbiAgICAvLyBmaW5pc2hlZCBmb3IgYWxsIGNoaWxkcmVuIHRoYXQgcnVuIHRoaXMgY29uc3RydWN0b3JcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIERpc3Bvc2Ugb2YgdGhlIGNvbXBvbmVudCBhbmQgYWxsIGNoaWxkIGNvbXBvbmVudHNcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudHJpZ2dlcignZGlzcG9zZScpO1xyXG5cclxuICAvLyBEaXNwb3NlIGFsbCBjaGlsZHJlbi5cclxuICBpZiAodGhpcy5jaGlsZHJlbl8pIHtcclxuICAgIGZvciAodmFyIGkgPSB0aGlzLmNoaWxkcmVuXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICBpZiAodGhpcy5jaGlsZHJlbl9baV0uZGlzcG9zZSkge1xyXG4gICAgICAgIHRoaXMuY2hpbGRyZW5fW2ldLmRpc3Bvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gRGVsZXRlIGNoaWxkIHJlZmVyZW5jZXNcclxuICB0aGlzLmNoaWxkcmVuXyA9IG51bGw7XHJcbiAgdGhpcy5jaGlsZEluZGV4XyA9IG51bGw7XHJcbiAgdGhpcy5jaGlsZE5hbWVJbmRleF8gPSBudWxsO1xyXG5cclxuICAvLyBSZW1vdmUgYWxsIGV2ZW50IGxpc3RlbmVycy5cclxuICB0aGlzLm9mZigpO1xyXG5cclxuICAvLyBSZW1vdmUgZWxlbWVudCBmcm9tIERPTVxyXG4gIGlmICh0aGlzLmVsXy5wYXJlbnROb2RlKSB7XHJcbiAgICB0aGlzLmVsXy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuZWxfKTtcclxuICB9XHJcblxyXG4gIHZqcy5yZW1vdmVEYXRhKHRoaXMuZWxfKTtcclxuICB0aGlzLmVsXyA9IG51bGw7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVmZXJlbmNlIHRvIG1haW4gcGxheWVyIGluc3RhbmNlXHJcbiAqXHJcbiAqIEB0eXBlIHt2anMuUGxheWVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucGxheWVyXyA9IHRydWU7XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBjb21wb25lbnQncyBwbGF5ZXJcclxuICpcclxuICogQHJldHVybiB7dmpzLlBsYXllcn1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnBsYXllciA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMucGxheWVyXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY29tcG9uZW50J3Mgb3B0aW9ucyBvYmplY3RcclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9wdGlvbnNfO1xyXG5cclxuLyoqXHJcbiAqIERlZXAgbWVyZ2Ugb2Ygb3B0aW9ucyBvYmplY3RzXHJcbiAqXHJcbiAqIFdoZW5ldmVyIGEgcHJvcGVydHkgaXMgYW4gb2JqZWN0IG9uIGJvdGggb3B0aW9ucyBvYmplY3RzXHJcbiAqIHRoZSB0d28gcHJvcGVydGllcyB3aWxsIGJlIG1lcmdlZCB1c2luZyB2anMub2JqLmRlZXBNZXJnZS5cclxuICpcclxuICogVGhpcyBpcyB1c2VkIGZvciBtZXJnaW5nIG9wdGlvbnMgZm9yIGNoaWxkIGNvbXBvbmVudHMuIFdlXHJcbiAqIHdhbnQgaXQgdG8gYmUgZWFzeSB0byBvdmVycmlkZSBpbmRpdmlkdWFsIG9wdGlvbnMgb24gYSBjaGlsZFxyXG4gKiBjb21wb25lbnQgd2l0aG91dCBoYXZpbmcgdG8gcmV3cml0ZSBhbGwgdGhlIG90aGVyIGRlZmF1bHQgb3B0aW9ucy5cclxuICpcclxuICogICAgIFBhcmVudC5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAqICAgICAgIGNoaWxkcmVuOiB7XHJcbiAqICAgICAgICAgJ2NoaWxkT25lJzogeyAnZm9vJzogJ2JhcicsICdhc2RmJzogJ2Zkc2EnIH0sXHJcbiAqICAgICAgICAgJ2NoaWxkVHdvJzoge30sXHJcbiAqICAgICAgICAgJ2NoaWxkVGhyZWUnOiB7fVxyXG4gKiAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqICAgICBuZXdPcHRpb25zID0ge1xyXG4gKiAgICAgICBjaGlsZHJlbjoge1xyXG4gKiAgICAgICAgICdjaGlsZE9uZSc6IHsgJ2Zvbyc6ICdiYXonLCAnYWJjJzogJzEyMycgfVxyXG4gKiAgICAgICAgICdjaGlsZFR3byc6IG51bGwsXHJcbiAqICAgICAgICAgJ2NoaWxkRm91cic6IHt9XHJcbiAqICAgICAgIH1cclxuICogICAgIH1cclxuICpcclxuICogICAgIHRoaXMub3B0aW9ucyhuZXdPcHRpb25zKTtcclxuICpcclxuICogUkVTVUxUXHJcbiAqXHJcbiAqICAgICB7XHJcbiAqICAgICAgIGNoaWxkcmVuOiB7XHJcbiAqICAgICAgICAgJ2NoaWxkT25lJzogeyAnZm9vJzogJ2JheicsICdhc2RmJzogJ2Zkc2EnLCAnYWJjJzogJzEyMycgfSxcclxuICogICAgICAgICAnY2hpbGRUd28nOiBudWxsLCAvLyBEaXNhYmxlZC4gV29uJ3QgYmUgaW5pdGlhbGl6ZWQuXHJcbiAqICAgICAgICAgJ2NoaWxkVGhyZWUnOiB7fSxcclxuICogICAgICAgICAnY2hpbGRGb3VyJzoge31cclxuICogICAgICAgfVxyXG4gKiAgICAgfVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBPYmplY3Qgd2hvc2UgdmFsdWVzIHdpbGwgYmUgb3ZlcndyaXR0ZW5cclxuICogQHJldHVybiB7T2JqZWN0fSAgICAgTkVXIG1lcmdlZCBvYmplY3QuIERvZXMgbm90IHJldHVybiBvYmoxLlxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub3B0aW9ucyA9IGZ1bmN0aW9uKG9iail7XHJcbiAgaWYgKG9iaiA9PT0gdW5kZWZpbmVkKSByZXR1cm4gdGhpcy5vcHRpb25zXztcclxuXHJcbiAgcmV0dXJuIHRoaXMub3B0aW9uc18gPSB2anMub2JqLmRlZXBNZXJnZSh0aGlzLm9wdGlvbnNfLCBvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBET00gZWxlbWVudCBmb3IgdGhlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAdHlwZSB7RWxlbWVudH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmVsXztcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgdGhlIGNvbXBvbmVudCdzIERPTSBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZz19IHRhZ05hbWUgIEVsZW1lbnQncyBub2RlIHR5cGUuIGUuZy4gJ2RpdidcclxuICogQHBhcmFtICB7T2JqZWN0PX0gYXR0cmlidXRlcyBBbiBvYmplY3Qgb2YgZWxlbWVudCBhdHRyaWJ1dGVzIHRoYXQgc2hvdWxkIGJlIHNldCBvbiB0aGUgZWxlbWVudFxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0YWdOYW1lLCBhdHRyaWJ1dGVzKXtcclxuICByZXR1cm4gdmpzLmNyZWF0ZUVsKHRhZ05hbWUsIGF0dHJpYnV0ZXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29tcG9uZW50J3MgRE9NIGVsZW1lbnRcclxuICpcclxuICogICAgIHZhciBkb21FbCA9IG15Q29tcG9uZW50LmVsKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5lbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuZWxfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFuIG9wdGlvbmFsIGVsZW1lbnQgd2hlcmUsIGlmIGRlZmluZWQsIGNoaWxkcmVuIHdpbGwgYmUgaW5zZXJ0ZWQgaW5zdGVhZCBvZlxyXG4gKiBkaXJlY3RseSBpbiBgZWxfYFxyXG4gKlxyXG4gKiBAdHlwZSB7RWxlbWVudH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNvbnRlbnRFbF87XHJcblxyXG4vKipcclxuICogUmV0dXJuIHRoZSBjb21wb25lbnQncyBET00gZWxlbWVudCBmb3IgZW1iZWRkaW5nIGNvbnRlbnQuXHJcbiAqIFdpbGwgZWl0aGVyIGJlIGVsXyBvciBhIG5ldyBlbGVtZW50IGRlZmluZWQgaW4gY3JlYXRlRWwuXHJcbiAqXHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jb250ZW50RWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmNvbnRlbnRFbF8gfHwgdGhpcy5lbF87XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIElEIGZvciB0aGUgY29tcG9uZW50XHJcbiAqXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pZF87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjb21wb25lbnQncyBJRFxyXG4gKlxyXG4gKiAgICAgdmFyIGlkID0gbXlDb21wb25lbnQuaWQoKTtcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaWQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmlkXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgbmFtZSBmb3IgdGhlIGNvbXBvbmVudC4gT2Z0ZW4gdXNlZCB0byByZWZlcmVuY2UgdGhlIGNvbXBvbmVudC5cclxuICpcclxuICogQHR5cGUge1N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm5hbWVfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29tcG9uZW50J3MgbmFtZS4gVGhlIG5hbWUgaXMgb2Z0ZW4gdXNlZCB0byByZWZlcmVuY2UgdGhlIGNvbXBvbmVudC5cclxuICpcclxuICogICAgIHZhciBuYW1lID0gbXlDb21wb25lbnQubmFtZSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5uYW1lID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5uYW1lXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBcnJheSBvZiBjaGlsZCBjb21wb25lbnRzXHJcbiAqXHJcbiAqIEB0eXBlIHtBcnJheX1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNoaWxkcmVuXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gYXJyYXkgb2YgYWxsIGNoaWxkIGNvbXBvbmVudHNcclxuICpcclxuICogICAgIHZhciBraWRzID0gbXlDb21wb25lbnQuY2hpbGRyZW4oKTtcclxuICpcclxuICogQHJldHVybiB7QXJyYXl9IFRoZSBjaGlsZHJlblxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmNoaWxkcmVuXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPYmplY3Qgb2YgY2hpbGQgY29tcG9uZW50cyBieSBJRFxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY2hpbGRJbmRleF87XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGNoaWxkIGNvbXBvbmVudCB3aXRoIHRoZSBwcm92aWRlZCBJRFxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZ2V0Q2hpbGRCeUlkID0gZnVuY3Rpb24oaWQpe1xyXG4gIHJldHVybiB0aGlzLmNoaWxkSW5kZXhfW2lkXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBPYmplY3Qgb2YgY2hpbGQgY29tcG9uZW50cyBieSBuYW1lXHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZE5hbWVJbmRleF87XHJcblxyXG4vKipcclxuICogUmV0dXJucyBhIGNoaWxkIGNvbXBvbmVudCB3aXRoIHRoZSBwcm92aWRlZCBJRFxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZ2V0Q2hpbGQgPSBmdW5jdGlvbihuYW1lKXtcclxuICByZXR1cm4gdGhpcy5jaGlsZE5hbWVJbmRleF9bbmFtZV07XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkcyBhIGNoaWxkIGNvbXBvbmVudCBpbnNpZGUgdGhpcyBjb21wb25lbnRcclxuICpcclxuICogICAgIG15Q29tcG9uZW50LmVsKCk7XHJcbiAqICAgICAvLyAtPiA8ZGl2IGNsYXNzPSdteS1jb21wb25lbnQnPjwvZGl2PlxyXG4gKiAgICAgbXlDb21vbmVudC5jaGlsZHJlbigpO1xyXG4gKiAgICAgLy8gW2VtcHR5IGFycmF5XVxyXG4gKlxyXG4gKiAgICAgdmFyIG15QnV0dG9uID0gbXlDb21wb25lbnQuYWRkQ2hpbGQoJ015QnV0dG9uJyk7XHJcbiAqICAgICAvLyAtPiA8ZGl2IGNsYXNzPSdteS1jb21wb25lbnQnPjxkaXYgY2xhc3M9XCJteS1idXR0b25cIj5teUJ1dHRvbjxkaXY+PC9kaXY+XHJcbiAqICAgICAvLyAtPiBteUJ1dHRvbiA9PT0gbXlDb21vbmVudC5jaGlsZHJlbigpWzBdO1xyXG4gKlxyXG4gKiBQYXNzIGluIG9wdGlvbnMgZm9yIGNoaWxkIGNvbnN0cnVjdG9ycyBhbmQgb3B0aW9ucyBmb3IgY2hpbGRyZW4gb2YgdGhlIGNoaWxkXHJcbiAqXHJcbiAqICAgIHZhciBteUJ1dHRvbiA9IG15Q29tcG9uZW50LmFkZENoaWxkKCdNeUJ1dHRvbicsIHtcclxuICogICAgICB0ZXh0OiAnUHJlc3MgTWUnLFxyXG4gKiAgICAgIGNoaWxkcmVuOiB7XHJcbiAqICAgICAgICBidXR0b25DaGlsZEV4YW1wbGU6IHtcclxuICogICAgICAgICAgYnV0dG9uQ2hpbGRPcHRpb246IHRydWVcclxuICogICAgICAgIH1cclxuICogICAgICB9XHJcbiAqICAgIH0pO1xyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ3x2anMuQ29tcG9uZW50fSBjaGlsZCBUaGUgY2xhc3MgbmFtZSBvciBpbnN0YW5jZSBvZiBhIGNoaWxkIHRvIGFkZFxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgT3B0aW9ucywgaW5jbHVkaW5nIG9wdGlvbnMgdG8gYmUgcGFzc2VkIHRvIGNoaWxkcmVuIG9mIHRoZSBjaGlsZC5cclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNoaWxkIGNvbXBvbmVudCAoY3JlYXRlZCBieSB0aGlzIHByb2Nlc3MgaWYgYSBzdHJpbmcgd2FzIHVzZWQpXHJcbiAqIEBzdXBwcmVzcyB7YWNjZXNzQ29udHJvbHN8Y2hlY2tSZWdFeHB8Y2hlY2tUeXBlc3xjaGVja1ZhcnN8Y29uc3R8Y29uc3RhbnRQcm9wZXJ0eXxkZXByZWNhdGVkfGR1cGxpY2F0ZXxlczVTdHJpY3R8ZmlsZW92ZXJ2aWV3VGFnc3xnbG9iYWxUaGlzfGludmFsaWRDYXN0c3xtaXNzaW5nUHJvcGVydGllc3xub25TdGFuZGFyZEpzRG9jc3xzdHJpY3RNb2R1bGVEZXBDaGVja3x1bmRlZmluZWROYW1lc3x1bmRlZmluZWRWYXJzfHVua25vd25EZWZpbmVzfHVzZWxlc3NDb2RlfHZpc2liaWxpdHl9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5hZGRDaGlsZCA9IGZ1bmN0aW9uKGNoaWxkLCBvcHRpb25zKXtcclxuICB2YXIgY29tcG9uZW50LCBjb21wb25lbnRDbGFzcywgY29tcG9uZW50TmFtZSwgY29tcG9uZW50SWQ7XHJcblxyXG4gIC8vIElmIHN0cmluZywgY3JlYXRlIG5ldyBjb21wb25lbnQgd2l0aCBvcHRpb25zXHJcbiAgaWYgKHR5cGVvZiBjaGlsZCA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICBjb21wb25lbnROYW1lID0gY2hpbGQ7XHJcblxyXG4gICAgLy8gTWFrZSBzdXJlIG9wdGlvbnMgaXMgYXQgbGVhc3QgYW4gZW1wdHkgb2JqZWN0IHRvIHByb3RlY3QgYWdhaW5zdCBlcnJvcnNcclxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICAgIC8vIEFzc3VtZSBuYW1lIG9mIHNldCBpcyBhIGxvd2VyY2FzZWQgbmFtZSBvZiB0aGUgVUkgQ2xhc3MgKFBsYXlCdXR0b24sIGV0Yy4pXHJcbiAgICBjb21wb25lbnRDbGFzcyA9IG9wdGlvbnNbJ2NvbXBvbmVudENsYXNzJ10gfHwgdmpzLmNhcGl0YWxpemUoY29tcG9uZW50TmFtZSk7XHJcblxyXG4gICAgLy8gU2V0IG5hbWUgdGhyb3VnaCBvcHRpb25zXHJcbiAgICBvcHRpb25zWyduYW1lJ10gPSBjb21wb25lbnROYW1lO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIG5ldyBvYmplY3QgJiBlbGVtZW50IGZvciB0aGlzIGNvbnRyb2xzIHNldFxyXG4gICAgLy8gSWYgdGhlcmUncyBubyAucGxheWVyXywgdGhpcyBpcyBhIHBsYXllclxyXG4gICAgLy8gQ2xvc3VyZSBDb21waWxlciB0aHJvd3MgYW4gJ2luY29tcGxldGUgYWxpYXMnIHdhcm5pbmcgaWYgd2UgdXNlIHRoZSB2anMgdmFyaWFibGUgZGlyZWN0bHkuXHJcbiAgICAvLyBFdmVyeSBjbGFzcyBzaG91bGQgYmUgZXhwb3J0ZWQsIHNvIHRoaXMgc2hvdWxkIG5ldmVyIGJlIGEgcHJvYmxlbSBoZXJlLlxyXG4gICAgY29tcG9uZW50ID0gbmV3IHdpbmRvd1sndmlkZW9qcyddW2NvbXBvbmVudENsYXNzXSh0aGlzLnBsYXllcl8gfHwgdGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIC8vIGNoaWxkIGlzIGEgY29tcG9uZW50IGluc3RhbmNlXHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbXBvbmVudCA9IGNoaWxkO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5jaGlsZHJlbl8ucHVzaChjb21wb25lbnQpO1xyXG5cclxuICBpZiAodHlwZW9mIGNvbXBvbmVudC5pZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgdGhpcy5jaGlsZEluZGV4X1tjb21wb25lbnQuaWQoKV0gPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyBJZiBhIG5hbWUgd2Fzbid0IHVzZWQgdG8gY3JlYXRlIHRoZSBjb21wb25lbnQsIGNoZWNrIGlmIHdlIGNhbiB1c2UgdGhlXHJcbiAgLy8gbmFtZSBmdW5jdGlvbiBvZiB0aGUgY29tcG9uZW50XHJcbiAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgKGNvbXBvbmVudC5uYW1lICYmIGNvbXBvbmVudC5uYW1lKCkpO1xyXG5cclxuICBpZiAoY29tcG9uZW50TmFtZSkge1xyXG4gICAgdGhpcy5jaGlsZE5hbWVJbmRleF9bY29tcG9uZW50TmFtZV0gPSBjb21wb25lbnQ7XHJcbiAgfVxyXG5cclxuICAvLyBBZGQgdGhlIFVJIG9iamVjdCdzIGVsZW1lbnQgdG8gdGhlIGNvbnRhaW5lciBkaXYgKGJveClcclxuICAvLyBIYXZpbmcgYW4gZWxlbWVudCBpcyBub3QgcmVxdWlyZWRcclxuICBpZiAodHlwZW9mIGNvbXBvbmVudFsnZWwnXSA9PT0gJ2Z1bmN0aW9uJyAmJiBjb21wb25lbnRbJ2VsJ10oKSkge1xyXG4gICAgdGhpcy5jb250ZW50RWwoKS5hcHBlbmRDaGlsZChjb21wb25lbnRbJ2VsJ10oKSk7XHJcbiAgfVxyXG5cclxuICAvLyBSZXR1cm4gc28gaXQgY2FuIHN0b3JlZCBvbiBwYXJlbnQgb2JqZWN0IGlmIGRlc2lyZWQuXHJcbiAgcmV0dXJuIGNvbXBvbmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBjaGlsZCBjb21wb25lbnQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIGxpc3Qgb2YgY2hpbGRyZW4sIGFuZCB0aGVcclxuICogY2hpbGQgY29tcG9uZW50J3MgZWxlbWVudCBmcm9tIHRoaXMgY29tcG9uZW50J3MgZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gIHt2anMuQ29tcG9uZW50fSBjb21wb25lbnQgQ29tcG9uZW50IHRvIHJlbW92ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlQ2hpbGQgPSBmdW5jdGlvbihjb21wb25lbnQpe1xyXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgY29tcG9uZW50ID0gdGhpcy5nZXRDaGlsZChjb21wb25lbnQpO1xyXG4gIH1cclxuXHJcbiAgaWYgKCFjb21wb25lbnQgfHwgIXRoaXMuY2hpbGRyZW5fKSByZXR1cm47XHJcblxyXG4gIHZhciBjaGlsZEZvdW5kID0gZmFsc2U7XHJcbiAgZm9yICh2YXIgaSA9IHRoaXMuY2hpbGRyZW5fLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAodGhpcy5jaGlsZHJlbl9baV0gPT09IGNvbXBvbmVudCkge1xyXG4gICAgICBjaGlsZEZvdW5kID0gdHJ1ZTtcclxuICAgICAgdGhpcy5jaGlsZHJlbl8uc3BsaWNlKGksMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKCFjaGlsZEZvdW5kKSByZXR1cm47XHJcblxyXG4gIHRoaXMuY2hpbGRJbmRleF9bY29tcG9uZW50LmlkXSA9IG51bGw7XHJcbiAgdGhpcy5jaGlsZE5hbWVJbmRleF9bY29tcG9uZW50Lm5hbWVdID0gbnVsbDtcclxuXHJcbiAgdmFyIGNvbXBFbCA9IGNvbXBvbmVudC5lbCgpO1xyXG4gIGlmIChjb21wRWwgJiYgY29tcEVsLnBhcmVudE5vZGUgPT09IHRoaXMuY29udGVudEVsKCkpIHtcclxuICAgIHRoaXMuY29udGVudEVsKCkucmVtb3ZlQ2hpbGQoY29tcG9uZW50LmVsKCkpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYW5kIGluaXRpYWxpemUgZGVmYXVsdCBjaGlsZCBjb21wb25lbnRzIGZyb20gb3B0aW9uc1xyXG4gKlxyXG4gKiAgICAgLy8gd2hlbiBhbiBpbnN0YW5jZSBvZiBNeUNvbXBvbmVudCBpcyBjcmVhdGVkLCBhbGwgY2hpbGRyZW4gaW4gb3B0aW9uc1xyXG4gKiAgICAgLy8gd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5zdGFuY2UgYnkgdGhlaXIgbmFtZSBzdHJpbmdzIGFuZCBvcHRpb25zXHJcbiAqICAgICBNeUNvbXBvbmVudC5wcm90b3R5cGUub3B0aW9uc18uY2hpbGRyZW4gPSB7XHJcbiAqICAgICAgIG15Q2hpbGRDb21wb25lbnQ6IHtcclxuICogICAgICAgICBteUNoaWxkT3B0aW9uOiB0cnVlXHJcbiAqICAgICAgIH1cclxuICogICAgIH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmluaXRDaGlsZHJlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnNfO1xyXG5cclxuICBpZiAob3B0aW9ucyAmJiBvcHRpb25zWydjaGlsZHJlbiddKSB7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNvbXBvbmVudHMgYW5kIGFkZCB0aGVtIHRvIHRoZSBwbGF5ZXJcclxuICAgIHZqcy5vYmouZWFjaChvcHRpb25zWydjaGlsZHJlbiddLCBmdW5jdGlvbihuYW1lLCBvcHRzKXtcclxuICAgICAgLy8gQWxsb3cgZm9yIGRpc2FibGluZyBkZWZhdWx0IGNvbXBvbmVudHNcclxuICAgICAgLy8gZS5nLiB2anMub3B0aW9uc1snY2hpbGRyZW4nXVsncG9zdGVySW1hZ2UnXSA9IGZhbHNlXHJcbiAgICAgIGlmIChvcHRzID09PSBmYWxzZSkgcmV0dXJuO1xyXG5cclxuICAgICAgLy8gQWxsb3cgd2FpdGluZyB0byBhZGQgY29tcG9uZW50cyB1bnRpbCBhIHNwZWNpZmljIGV2ZW50IGlzIGNhbGxlZFxyXG4gICAgICB2YXIgdGVtcEFkZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgLy8gU2V0IHByb3BlcnR5IG5hbWUgb24gcGxheWVyLiBDb3VsZCBjYXVzZSBjb25mbGljdHMgd2l0aCBvdGhlciBwcm9wIG5hbWVzLCBidXQgaXQncyB3b3J0aCBtYWtpbmcgcmVmcyBlYXN5LlxyXG4gICAgICAgIHNlbGZbbmFtZV0gPSBzZWxmLmFkZENoaWxkKG5hbWUsIG9wdHMpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgaWYgKG9wdHNbJ2xvYWRFdmVudCddKSB7XHJcbiAgICAgICAgLy8gdGhpcy5vbmUob3B0cy5sb2FkRXZlbnQsIHRlbXBBZGQpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGVtcEFkZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWxsb3dzIHN1YiBjb21wb25lbnRzIHRvIHN0YWNrIENTUyBjbGFzcyBuYW1lc1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBjb25zdHJ1Y3RlZCBjbGFzcyBuYW1lXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIENoaWxkIGNsYXNzZXMgY2FuIGluY2x1ZGUgYSBmdW5jdGlvbiB0aGF0IGRvZXM6XHJcbiAgICAvLyByZXR1cm4gJ0NMQVNTIE5BTUUnICsgdGhpcy5fc3VwZXIoKTtcclxuICAgIHJldHVybiAnJztcclxufTtcclxuXHJcbi8qIEV2ZW50c1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byB0aGlzIGNvbXBvbmVudCdzIGVsZW1lbnRcclxuICpcclxuICogICAgIHZhciBteUZ1bmMgPSBmdW5jdGlvbigpe1xyXG4gKiAgICAgICB2YXIgbXlQbGF5ZXIgPSB0aGlzO1xyXG4gKiAgICAgICAvLyBEbyBzb21ldGhpbmcgd2hlbiB0aGUgZXZlbnQgaXMgZmlyZWRcclxuICogICAgIH07XHJcbiAqXHJcbiAqICAgICBteVBsYXllci5vbihcImV2ZW50TmFtZVwiLCBteUZ1bmMpO1xyXG4gKlxyXG4gKiBUaGUgY29udGV4dCB3aWxsIGJlIHRoZSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICB0eXBlIFRoZSBldmVudCB0eXBlIGUuZy4gJ2NsaWNrJ1xyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gICBUaGUgZXZlbnQgbGlzdGVuZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gc2VsZlxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub24gPSBmdW5jdGlvbih0eXBlLCBmbil7XHJcbiAgdmpzLm9uKHRoaXMuZWxfLCB0eXBlLCB2anMuYmluZCh0aGlzLCBmbikpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhbiBldmVudCBsaXN0ZW5lciBmcm9tIHRoZSBjb21wb25lbnQncyBlbGVtZW50XHJcbiAqXHJcbiAqICAgICBteUNvbXBvbmVudC5vZmYoXCJldmVudE5hbWVcIiwgbXlGdW5jKTtcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nPX0gICB0eXBlIEV2ZW50IHR5cGUuIFdpdGhvdXQgdHlwZSBpdCB3aWxsIHJlbW92ZSBhbGwgbGlzdGVuZXJzLlxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbj19IGZuICAgRXZlbnQgbGlzdGVuZXIuIFdpdGhvdXQgZm4gaXQgd2lsbCByZW1vdmUgYWxsIGxpc3RlbmVycyBmb3IgYSB0eXBlLlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24odHlwZSwgZm4pe1xyXG4gIHZqcy5vZmYodGhpcy5lbF8sIHR5cGUsIGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gYmUgdHJpZ2dlcmVkIG9ubHkgb25jZSBhbmQgdGhlbiByZW1vdmVkXHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICB0eXBlIEV2ZW50IHR5cGVcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgRXZlbnQgbGlzdGVuZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uZSA9IGZ1bmN0aW9uKHR5cGUsIGZuKSB7XHJcbiAgdmpzLm9uZSh0aGlzLmVsXywgdHlwZSwgdmpzLmJpbmQodGhpcywgZm4pKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VyIGFuIGV2ZW50IG9uIGFuIGVsZW1lbnRcclxuICpcclxuICogICAgIG15Q29tcG9uZW50LnRyaWdnZXIoJ2V2ZW50TmFtZScpO1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgICAgIHR5cGUgIFRoZSBldmVudCB0eXBlIHRvIHRyaWdnZXIsIGUuZy4gJ2NsaWNrJ1xyXG4gKiBAcGFyYW0gIHtFdmVudHxPYmplY3R9IGV2ZW50IFRoZSBldmVudCBvYmplY3QgdG8gYmUgcGFzc2VkIHRvIHRoZSBsaXN0ZW5lclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSAgICAgIHNlbGZcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnRyaWdnZXIgPSBmdW5jdGlvbih0eXBlLCBldmVudCl7XHJcbiAgdmpzLnRyaWdnZXIodGhpcy5lbF8sIHR5cGUsIGV2ZW50KTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qIFJlYWR5XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBJcyB0aGUgY29tcG9uZW50IGxvYWRlZFxyXG4gKiBUaGlzIGNhbiBtZWFuIGRpZmZlcmVudCB0aGluZ3MgZGVwZW5kaW5nIG9uIHRoZSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEBwcml2YXRlXHJcbiAqIEB0eXBlIHtCb29sZWFufVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFkeV87XHJcblxyXG4vKipcclxuICogVHJpZ2dlciByZWFkeSBhcyBzb29uIGFzIGluaXRpYWxpemF0aW9uIGlzIGZpbmlzaGVkXHJcbiAqXHJcbiAqIEFsbG93cyBmb3IgZGVsYXlpbmcgcmVhZHkuIE92ZXJyaWRlIG9uIGEgc3ViIGNsYXNzIHByb3RvdHlwZS5cclxuICogSWYgeW91IHNldCB0aGlzLmlzUmVhZHlPbkluaXRGaW5pc2hfIGl0IHdpbGwgYWZmZWN0IGFsbCBjb21wb25lbnRzLlxyXG4gKiBTcGVjaWFsbHkgdXNlZCB3aGVuIHdhaXRpbmcgZm9yIHRoZSBGbGFzaCBwbGF5ZXIgdG8gYXN5bmNocm5vdXNseSBsb2FkLlxyXG4gKlxyXG4gKiBAdHlwZSB7Qm9vbGVhbn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhZHlPbkluaXRGaW5pc2hfID0gdHJ1ZTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIHJlYWR5IGxpc3RlbmVyc1xyXG4gKlxyXG4gKiBAdHlwZSB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5yZWFkeVF1ZXVlXztcclxuXHJcbi8qKlxyXG4gKiBCaW5kIGEgbGlzdGVuZXIgdG8gdGhlIGNvbXBvbmVudCdzIHJlYWR5IHN0YXRlXHJcbiAqXHJcbiAqIERpZmZlcmVudCBmcm9tIGV2ZW50IGxpc3RlbmVycyBpbiB0aGF0IGlmIHRoZSByZWFkeSBldmVudCBoYXMgYWxyZWFkeSBoYXBwZW5kXHJcbiAqIGl0IHdpbGwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gaW1tZWRpYXRlbHkuXHJcbiAqXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiBSZWFkeSBsaXN0ZW5lclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucmVhZHkgPSBmdW5jdGlvbihmbil7XHJcbiAgaWYgKGZuKSB7XHJcbiAgICBpZiAodGhpcy5pc1JlYWR5Xykge1xyXG4gICAgICBmbi5jYWxsKHRoaXMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMucmVhZHlRdWV1ZV8gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHRoaXMucmVhZHlRdWV1ZV8gPSBbXTtcclxuICAgICAgfVxyXG4gICAgICB0aGlzLnJlYWR5UXVldWVfLnB1c2goZm4pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VyIHRoZSByZWFkeSBsaXN0ZW5lcnNcclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnRyaWdnZXJSZWFkeSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5pc1JlYWR5XyA9IHRydWU7XHJcblxyXG4gIHZhciByZWFkeVF1ZXVlID0gdGhpcy5yZWFkeVF1ZXVlXztcclxuXHJcbiAgaWYgKHJlYWR5UXVldWUgJiYgcmVhZHlRdWV1ZS5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IDAsIGogPSByZWFkeVF1ZXVlLmxlbmd0aDsgaSA8IGo7IGkrKykge1xyXG4gICAgICByZWFkeVF1ZXVlW2ldLmNhbGwodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVzZXQgUmVhZHkgUXVldWVcclxuICAgIHRoaXMucmVhZHlRdWV1ZV8gPSBbXTtcclxuXHJcbiAgICAvLyBBbGxvdyBmb3IgdXNpbmcgZXZlbnQgbGlzdGVuZXJzIGFsc28sIGluIGNhc2UgeW91IHdhbnQgdG8gZG8gc29tZXRoaW5nIGV2ZXJ5dGltZSBhIHNvdXJjZSBpcyByZWFkeS5cclxuICAgIHRoaXMudHJpZ2dlcigncmVhZHknKTtcclxuICB9XHJcbn07XHJcblxyXG4vKiBEaXNwbGF5XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuICogQWRkIGEgQ1NTIGNsYXNzIG5hbWUgdG8gdGhlIGNvbXBvbmVudCdzIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzVG9BZGQgQ2xhc3NuYW1lIHRvIGFkZFxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuYWRkQ2xhc3MgPSBmdW5jdGlvbihjbGFzc1RvQWRkKXtcclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sIGNsYXNzVG9BZGQpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIENTUyBjbGFzcyBuYW1lIGZyb20gdGhlIGNvbXBvbmVudCdzIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGNsYXNzVG9SZW1vdmUgQ2xhc3NuYW1lIHRvIHJlbW92ZVxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihjbGFzc1RvUmVtb3ZlKXtcclxuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sIGNsYXNzVG9SZW1vdmUpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3cgdGhlIGNvbXBvbmVudCBlbGVtZW50IGlmIGhpZGRlblxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogSGlkZSB0aGUgY29tcG9uZW50IGVsZW1lbnQgaWYgaGlkZGVuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExvY2sgYW4gaXRlbSBpbiBpdHMgdmlzaWJsZSBzdGF0ZVxyXG4gKiBUbyBiZSB1c2VkIHdpdGggZmFkZUluL2ZhZGVPdXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5sb2NrU2hvd2luZyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5hZGRDbGFzcygndmpzLWxvY2stc2hvd2luZycpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVubG9jayBhbiBpdGVtIHRvIGJlIGhpZGRlblxyXG4gKiBUbyBiZSB1c2VkIHdpdGggZmFkZUluL2ZhZGVPdXQuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS51bmxvY2tTaG93aW5nID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtbG9jay1zaG93aW5nJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzYWJsZSBjb21wb25lbnQgYnkgbWFraW5nIGl0IHVuc2hvd2FibGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpc2FibGUgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuaGlkZSgpO1xyXG4gIHRoaXMuc2hvdyA9IGZ1bmN0aW9uKCl7fTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgb3IgZ2V0IHRoZSB3aWR0aCBvZiB0aGUgY29tcG9uZW50IChDU1MgdmFsdWVzKVxyXG4gKlxyXG4gKiBWaWRlbyB0YWcgd2lkdGgvaGVpZ2h0IG9ubHkgd29yayBpbiBwaXhlbHMuIE5vIHBlcmNlbnRzLlxyXG4gKiBCdXQgYWxsb3dpbmcgbGltaXRlZCBwZXJjZW50cyB1c2UuIGUuZy4gd2lkdGgoKSB3aWxsIHJldHVybiBudW1iZXIrJSwgbm90IGNvbXB1dGVkIHdpZHRoXHJcbiAqXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBudW0gICBPcHRpb25hbCB3aWR0aCBudW1iZXJcclxuICogQHBhcmFtICB7Qm9vbGVhbn0gc2tpcExpc3RlbmVycyBTa2lwIHRoZSAncmVzaXplJyBldmVudCB0cmlnZ2VyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFJldHVybnMgJ3RoaXMnIGlmIHdpZHRoIHdhcyBzZXRcclxuICogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gUmV0dXJucyB0aGUgd2lkdGggaWYgbm90aGluZyB3YXMgc2V0XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS53aWR0aCA9IGZ1bmN0aW9uKG51bSwgc2tpcExpc3RlbmVycyl7XHJcbiAgcmV0dXJuIHRoaXMuZGltZW5zaW9uKCd3aWR0aCcsIG51bSwgc2tpcExpc3RlbmVycyk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IG9yIHNldCB0aGUgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnQgKENTUyB2YWx1ZXMpXHJcbiAqXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBudW0gICAgIE5ldyBjb21wb25lbnQgaGVpZ2h0XHJcbiAqIEBwYXJhbSAge0Jvb2xlYW49fSBza2lwTGlzdGVuZXJzIFNraXAgdGhlIHJlc2l6ZSBldmVudCB0cmlnZ2VyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjb21wb25lbnQgaWYgdGhlIGhlaWdodCB3YXMgc2V0XHJcbiAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IFRoZSBoZWlnaHQgaWYgaXQgd2Fzbid0IHNldFxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaGVpZ2h0ID0gZnVuY3Rpb24obnVtLCBza2lwTGlzdGVuZXJzKXtcclxuICByZXR1cm4gdGhpcy5kaW1lbnNpb24oJ2hlaWdodCcsIG51bSwgc2tpcExpc3RlbmVycyk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IGJvdGggd2lkdGggYW5kIGhlaWdodCBhdCB0aGUgc2FtZSB0aW1lXHJcbiAqXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmd9IHdpZHRoXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmd9IGhlaWdodFxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBUaGUgY29tcG9uZW50XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaW1lbnNpb25zID0gZnVuY3Rpb24od2lkdGgsIGhlaWdodCl7XHJcbiAgLy8gU2tpcCByZXNpemUgbGlzdGVuZXJzIG9uIHdpZHRoIGZvciBvcHRpbWl6YXRpb25cclxuICByZXR1cm4gdGhpcy53aWR0aCh3aWR0aCwgdHJ1ZSkuaGVpZ2h0KGhlaWdodCk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IG9yIHNldCB3aWR0aCBvciBoZWlnaHRcclxuICpcclxuICogVGhpcyBpcyB0aGUgc2hhcmVkIGNvZGUgZm9yIHRoZSB3aWR0aCgpIGFuZCBoZWlnaHQoKSBtZXRob2RzLlxyXG4gKiBBbGwgZm9yIGFuIGludGVnZXIsIGludGVnZXIgKyAncHgnIG9yIGludGVnZXIgKyAnJSc7XHJcbiAqXHJcbiAqIEtub3duIGlzc3VlOiBIaWRkZW4gZWxlbWVudHMgb2ZmaWNpYWxseSBoYXZlIGEgd2lkdGggb2YgMC4gV2UncmUgZGVmYXVsdGluZ1xyXG4gKiB0byB0aGUgc3R5bGUud2lkdGggdmFsdWUgYW5kIGZhbGxpbmcgYmFjayB0byBjb21wdXRlZFN0eWxlIHdoaWNoIGhhcyB0aGVcclxuICogaGlkZGVuIGVsZW1lbnQgaXNzdWUuIEluZm8sIGJ1dCBwcm9iYWJseSBub3QgYW4gZWZmaWNpZW50IGZpeDpcclxuICogaHR0cDovL3d3dy5mb2xpb3Rlay5jb20vZGV2YmxvZy9nZXR0aW5nLXRoZS13aWR0aC1vZi1hLWhpZGRlbi1lbGVtZW50LXdpdGgtanF1ZXJ5LXVzaW5nLXdpZHRoL1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IHdpZHRoT3JIZWlnaHQgICd3aWR0aCcgb3IgJ2hlaWdodCdcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZz19IG51bSAgICAgTmV3IGRpbWVuc2lvblxyXG4gKiBAcGFyYW0gIHtCb29sZWFuPX0gc2tpcExpc3RlbmVycyBTa2lwIHJlc2l6ZSBldmVudCB0cmlnZ2VyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjb21wb25lbnQgaWYgYSBkaW1lbnNpb24gd2FzIHNldFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBUaGUgZGltZW5zaW9uIGlmIG5vdGhpbmcgd2FzIHNldFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGltZW5zaW9uID0gZnVuY3Rpb24od2lkdGhPckhlaWdodCwgbnVtLCBza2lwTGlzdGVuZXJzKXtcclxuICBpZiAobnVtICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB1c2luZyBjc3Mgd2lkdGgvaGVpZ2h0ICglIG9yIHB4KSBhbmQgYWRqdXN0XHJcbiAgICBpZiAoKCcnK251bSkuaW5kZXhPZignJScpICE9PSAtMSB8fCAoJycrbnVtKS5pbmRleE9mKCdweCcpICE9PSAtMSkge1xyXG4gICAgICB0aGlzLmVsXy5zdHlsZVt3aWR0aE9ySGVpZ2h0XSA9IG51bTtcclxuICAgIH0gZWxzZSBpZiAobnVtID09PSAnYXV0bycpIHtcclxuICAgICAgdGhpcy5lbF8uc3R5bGVbd2lkdGhPckhlaWdodF0gPSAnJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gbnVtKydweCc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2tpcExpc3RlbmVycyBhbGxvd3MgdXMgdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgcmVzaXplIGV2ZW50IHdoZW4gc2V0dGluZyBib3RoIHdpZHRoIGFuZCBoZWlnaHRcclxuICAgIGlmICghc2tpcExpc3RlbmVycykgeyB0aGlzLnRyaWdnZXIoJ3Jlc2l6ZScpOyB9XHJcblxyXG4gICAgLy8gUmV0dXJuIGNvbXBvbmVudFxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBOb3Qgc2V0dGluZyBhIHZhbHVlLCBzbyBnZXR0aW5nIGl0XHJcbiAgLy8gTWFrZSBzdXJlIGVsZW1lbnQgZXhpc3RzXHJcbiAgaWYgKCF0aGlzLmVsXykgcmV0dXJuIDA7XHJcblxyXG4gIC8vIEdldCBkaW1lbnNpb24gdmFsdWUgZnJvbSBzdHlsZVxyXG4gIHZhciB2YWwgPSB0aGlzLmVsXy5zdHlsZVt3aWR0aE9ySGVpZ2h0XTtcclxuICB2YXIgcHhJbmRleCA9IHZhbC5pbmRleE9mKCdweCcpO1xyXG4gIGlmIChweEluZGV4ICE9PSAtMSkge1xyXG4gICAgLy8gUmV0dXJuIHRoZSBwaXhlbCB2YWx1ZSB3aXRoIG5vICdweCdcclxuICAgIHJldHVybiBwYXJzZUludCh2YWwuc2xpY2UoMCxweEluZGV4KSwgMTApO1xyXG5cclxuICAvLyBObyBweCBzbyB1c2luZyAlIG9yIG5vIHN0eWxlIHdhcyBzZXQsIHNvIGZhbGxpbmcgYmFjayB0byBvZmZzZXRXaWR0aC9oZWlnaHRcclxuICAvLyBJZiBjb21wb25lbnQgaGFzIGRpc3BsYXk6bm9uZSwgb2Zmc2V0IHdpbGwgcmV0dXJuIDBcclxuICAvLyBUT0RPOiBoYW5kbGUgZGlzcGxheTpub25lIGFuZCBubyBkaW1lbnNpb24gc3R5bGUgdXNpbmcgcHhcclxuICB9IGVsc2Uge1xyXG5cclxuICAgIHJldHVybiBwYXJzZUludCh0aGlzLmVsX1snb2Zmc2V0Jyt2anMuY2FwaXRhbGl6ZSh3aWR0aE9ySGVpZ2h0KV0sIDEwKTtcclxuXHJcbiAgICAvLyBDb21wdXRlZFN0eWxlIHZlcnNpb24uXHJcbiAgICAvLyBPbmx5IGRpZmZlcmVuY2UgaXMgaWYgdGhlIGVsZW1lbnQgaXMgaGlkZGVuIGl0IHdpbGwgcmV0dXJuXHJcbiAgICAvLyB0aGUgcGVyY2VudCB2YWx1ZSAoZS5nLiAnMTAwJScnKVxyXG4gICAgLy8gaW5zdGVhZCBvZiB6ZXJvIGxpa2Ugb2Zmc2V0V2lkdGggcmV0dXJucy5cclxuICAgIC8vIHZhciB2YWwgPSB2anMuZ2V0Q29tcHV0ZWRTdHlsZVZhbHVlKHRoaXMuZWxfLCB3aWR0aE9ySGVpZ2h0KTtcclxuICAgIC8vIHZhciBweEluZGV4ID0gdmFsLmluZGV4T2YoJ3B4Jyk7XHJcblxyXG4gICAgLy8gaWYgKHB4SW5kZXggIT09IC0xKSB7XHJcbiAgICAvLyAgIHJldHVybiB2YWwuc2xpY2UoMCwgcHhJbmRleCk7XHJcbiAgICAvLyB9IGVsc2Uge1xyXG4gICAgLy8gICByZXR1cm4gdmFsO1xyXG4gICAgLy8gfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSB3aWR0aCBhbmQvb3IgaGVpZ2h0IG9mIHRoZSBjb21wb25lbnQgY2hhbmdlc1xyXG4gKiBAZXZlbnQgcmVzaXplXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vblJlc2l6ZTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0ICd0YXAnIGV2ZW50cyB3aGVuIHRvdWNoIGV2ZW50cyBhcmUgc3VwcG9ydGVkXHJcbiAqXHJcbiAqIFRoaXMgaXMgdXNlZCB0byBzdXBwb3J0IHRvZ2dsaW5nIHRoZSBjb250cm9scyB0aHJvdWdoIGEgdGFwIG9uIHRoZSB2aWRlby5cclxuICpcclxuICogV2UncmUgcmVxdWlyZWluZyB0aGVtIHRvIGJlIGVuYWJsZWQgYmVjYXVzZSBvdGhlcndpc2UgZXZlcnkgY29tcG9uZW50IHdvdWxkXHJcbiAqIGhhdmUgdGhpcyBleHRyYSBvdmVyaGVhZCB1bm5lY2Vzc2FyaWx5LCBvbiBtb2JpbGUgZGV2aWNlcyB3aGVyZSBleHRyYVxyXG4gKiBvdmVyaGVhZCBpcyBlc3BlY2lhbGx5IGJhZC5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmVtaXRUYXBFdmVudHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB0b3VjaFN0YXJ0LCB0b3VjaFRpbWUsIGNvdWxkQmVUYXAsIG5vVGFwO1xyXG5cclxuICAvLyBUcmFjayB0aGUgc3RhcnQgdGltZSBzbyB3ZSBjYW4gZGV0ZXJtaW5lIGhvdyBsb25nIHRoZSB0b3VjaCBsYXN0ZWRcclxuICB0b3VjaFN0YXJ0ID0gMDtcclxuXHJcbiAgdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBSZWNvcmQgc3RhcnQgdGltZSBzbyB3ZSBjYW4gZGV0ZWN0IGEgdGFwIHZzLiBcInRvdWNoIGFuZCBob2xkXCJcclxuICAgIHRvdWNoU3RhcnQgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuICAgIC8vIFJlc2V0IGNvdWxkQmVUYXAgdHJhY2tpbmdcclxuICAgIGNvdWxkQmVUYXAgPSB0cnVlO1xyXG4gIH0pO1xyXG5cclxuICBub1RhcCA9IGZ1bmN0aW9uKCl7XHJcbiAgICBjb3VsZEJlVGFwID0gZmFsc2U7XHJcbiAgfTtcclxuICAvLyBUT0RPOiBMaXN0ZW4gdG8gdGhlIG9yaWdpbmFsIHRhcmdldC4gaHR0cDovL3lvdXR1LmJlL0R1amZwWE9LVXA4P3Q9MTNtOHNcclxuICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBub1RhcCk7XHJcbiAgdGhpcy5vbigndG91Y2hsZWF2ZScsIG5vVGFwKTtcclxuICB0aGlzLm9uKCd0b3VjaGNhbmNlbCcsIG5vVGFwKTtcclxuXHJcbiAgLy8gV2hlbiB0aGUgdG91Y2ggZW5kcywgbWVhc3VyZSBob3cgbG9uZyBpdCB0b29rIGFuZCB0cmlnZ2VyIHRoZSBhcHByb3ByaWF0ZVxyXG4gIC8vIGV2ZW50XHJcbiAgdGhpcy5vbigndG91Y2hlbmQnLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIFByb2NlZWQgb25seSBpZiB0aGUgdG91Y2htb3ZlL2xlYXZlL2NhbmNlbCBldmVudCBkaWRuJ3QgaGFwcGVuXHJcbiAgICBpZiAoY291bGRCZVRhcCA9PT0gdHJ1ZSkge1xyXG4gICAgICAvLyBNZWFzdXJlIGhvdyBsb25nIHRoZSB0b3VjaCBsYXN0ZWRcclxuICAgICAgdG91Y2hUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCkgLSB0b3VjaFN0YXJ0O1xyXG4gICAgICAvLyBUaGUgdG91Y2ggbmVlZHMgdG8gYmUgcXVpY2sgaW4gb3JkZXIgdG8gY29uc2lkZXIgaXQgYSB0YXBcclxuICAgICAgaWYgKHRvdWNoVGltZSA8IDI1MCkge1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcigndGFwJyk7XHJcbiAgICAgICAgLy8gSXQgbWF5IGJlIGdvb2QgdG8gY29weSB0aGUgdG91Y2hlbmQgZXZlbnQgb2JqZWN0IGFuZCBjaGFuZ2UgdGhlXHJcbiAgICAgICAgLy8gdHlwZSB0byB0YXAsIGlmIHRoZSBvdGhlciBldmVudCBwcm9wZXJ0aWVzIGFyZW4ndCBleGFjdCBhZnRlclxyXG4gICAgICAgIC8vIHZqcy5maXhFdmVudCBydW5zIChlLmcuIGV2ZW50LnRhcmdldClcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pO1xyXG59O1xyXG4vKiBCdXR0b24gLSBCYXNlIGNsYXNzIGZvciBhbGwgYnV0dG9uc1xyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnNcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQnV0dG9uID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBpbmhlcml0RG9jXHJcbiAgICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHZhciB0b3VjaHN0YXJ0ID0gZmFsc2U7XHJcbiAgICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgLy8gU3RvcCBjbGljayBhbmQgb3RoZXIgbW91c2UgZXZlbnRzIGZyb20gdHJpZ2dlcmluZyBhbHNvXHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgIHRvdWNoc3RhcnQgPSB0cnVlO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBmdW5jdGlvbigpIHtcclxuICAgICAgdG91Y2hzdGFydCA9IGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICB0aGlzLm9uKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIGlmICh0b3VjaHN0YXJ0KSB7XHJcbiAgICAgICAgc2VsZi5vbkNsaWNrKGV2ZW50KTtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xyXG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLm9uRm9jdXMpO1xyXG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMub25CbHVyKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcyl7XHJcbiAgLy8gQWRkIHN0YW5kYXJkIEFyaWEgYW5kIFRhYmluZGV4IGluZm9cclxuICBwcm9wcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgY2xhc3NOYW1lOiB0aGlzLmJ1aWxkQ1NTQ2xhc3MoKSxcclxuICAgIGlubmVySFRNTDogJzxkaXYgY2xhc3M9XCJ2anMtY29udHJvbC1jb250ZW50XCI+PHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+JyArICh0aGlzLmJ1dHRvblRleHQgfHwgJ05lZWQgVGV4dCcpICsgJzwvc3Bhbj48L2Rpdj4nLFxyXG4gICAgcm9sZTogJ2J1dHRvbicsXHJcbiAgICAnYXJpYS1saXZlJzogJ3BvbGl0ZScsIC8vIGxldCB0aGUgc2NyZWVuIHJlYWRlciB1c2VyIGtub3cgdGhhdCB0aGUgdGV4dCBvZiB0aGUgYnV0dG9uIG1heSBjaGFuZ2VcclxuICAgIHRhYkluZGV4OiAwXHJcbiAgfSwgcHJvcHMpO1xyXG5cclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCB0eXBlLCBwcm9wcyk7XHJcbn07XHJcblxyXG52anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcclxuICAvLyBUT0RPOiBDaGFuZ2UgdmpzLWNvbnRyb2wgdG8gdmpzLWJ1dHRvbj9cclxuICByZXR1cm4gJ3Zqcy1jb250cm9sICcgKyB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5idWlsZENTU0NsYXNzLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4gIC8vIENsaWNrIC0gT3ZlcnJpZGUgd2l0aCBzcGVjaWZpYyBmdW5jdGlvbmFsaXR5IGZvciBidXR0b25cclxudmpzLkJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbiAgLy8gRm9jdXMgLSBBZGQga2V5Ym9hcmQgZnVuY3Rpb25hbGl0eSB0byBlbGVtZW50XHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uRm9jdXMgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5vbihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XHJcbn07XHJcblxyXG4gIC8vIEtleVByZXNzIChkb2N1bWVudCBsZXZlbCkgLSBUcmlnZ2VyIGNsaWNrIHdoZW4ga2V5cyBhcmUgcHJlc3NlZFxyXG52anMuQnV0dG9uLnByb3RvdHlwZS5vbktleVByZXNzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIC8vIENoZWNrIGZvciBzcGFjZSBiYXIgKDMyKSBvciBlbnRlciAoMTMpIGtleXNcclxuICBpZiAoZXZlbnQud2hpY2ggPT0gMzIgfHwgZXZlbnQud2hpY2ggPT0gMTMpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLm9uQ2xpY2soKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBCbHVyIC0gUmVtb3ZlIGtleWJvYXJkIHRyaWdnZXJzXHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uQmx1ciA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XHJcbn07XHJcbi8qIFNsaWRlclxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogVGhlIGJhc2UgZnVuY3Rpb25hbGl0eSBmb3Igc2xpZGVycyBsaWtlIHRoZSB2b2x1bWUgYmFyIGFuZCBzZWVrIGJhclxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlNsaWRlciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIFNldCBwcm9wZXJ0eSBuYW1lcyB0byBiYXIgYW5kIGhhbmRsZSB0byBtYXRjaCB3aXRoIHRoZSBjaGlsZCBTbGlkZXIgY2xhc3MgaXMgbG9va2luZyBmb3JcclxuICAgIHRoaXMuYmFyID0gdGhpcy5nZXRDaGlsZCh0aGlzLm9wdGlvbnNfWydiYXJOYW1lJ10pO1xyXG4gICAgdGhpcy5oYW5kbGUgPSB0aGlzLmdldENoaWxkKHRoaXMub3B0aW9uc19bJ2hhbmRsZU5hbWUnXSk7XHJcblxyXG4gICAgcGxheWVyLm9uKHRoaXMucGxheWVyRXZlbnQsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgdGhpcy5vbignbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLm9uKCd0b3VjaHN0YXJ0JywgdGhpcy5vbk1vdXNlRG93bik7XHJcbiAgICB0aGlzLm9uKCdmb2N1cycsIHRoaXMub25Gb2N1cyk7XHJcbiAgICB0aGlzLm9uKCdibHVyJywgdGhpcy5vbkJsdXIpO1xyXG4gICAgdGhpcy5vbignY2xpY2snLCB0aGlzLm9uQ2xpY2spO1xyXG5cclxuICAgIHRoaXMucGxheWVyXy5vbignY29udHJvbHN2aXNpYmxlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICAvLyBUaGlzIGlzIGFjdHVhbGx5IHRvIGZpeCB0aGUgdm9sdW1lIGhhbmRsZSBwb3NpdGlvbi4gaHR0cDovL3R3aXR0ZXIuY29tLyMhL2dlcnJpdHZhbmFha2VuL3N0YXR1cy8xNTkwNDYyNTQ1MTk3ODc1MjBcclxuICAgIC8vIHRoaXMucGxheWVyXy5vbmUoJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIHBsYXllci5yZWFkeSh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIHRoaXMuYm91bmRFdmVudHMgPSB7fTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcykge1xyXG4gIHByb3BzID0gcHJvcHMgfHwge307XHJcbiAgLy8gQWRkIHRoZSBzbGlkZXIgZWxlbWVudCBjbGFzcyB0byBhbGwgc3ViIGNsYXNzZXNcclxuICBwcm9wcy5jbGFzc05hbWUgPSBwcm9wcy5jbGFzc05hbWUgKyAnIHZqcy1zbGlkZXInO1xyXG4gIHByb3BzID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICByb2xlOiAnc2xpZGVyJyxcclxuICAgICdhcmlhLXZhbHVlbm93JzogMCxcclxuICAgICdhcmlhLXZhbHVlbWluJzogMCxcclxuICAgICdhcmlhLXZhbHVlbWF4JzogMTAwLFxyXG4gICAgdGFiSW5kZXg6IDBcclxuICB9LCBwcm9wcyk7XHJcblxyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsIHR5cGUsIHByb3BzKTtcclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgdmpzLmJsb2NrVGV4dFNlbGVjdGlvbigpO1xyXG5cclxuICB0aGlzLmJvdW5kRXZlbnRzLm1vdmUgPSB2anMuYmluZCh0aGlzLCB0aGlzLm9uTW91c2VNb3ZlKTtcclxuICB0aGlzLmJvdW5kRXZlbnRzLmVuZCA9IHZqcy5iaW5kKHRoaXMsIHRoaXMub25Nb3VzZVVwKTtcclxuXHJcbiAgdmpzLm9uKGRvY3VtZW50LCAnbW91c2Vtb3ZlJywgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlKTtcclxuICB2anMub24oZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQpO1xyXG4gIHZqcy5vbihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSk7XHJcbiAgdmpzLm9uKGRvY3VtZW50LCAndG91Y2hlbmQnLCB0aGlzLmJvdW5kRXZlbnRzLmVuZCk7XHJcblxyXG4gIHRoaXMub25Nb3VzZU1vdmUoZXZlbnQpO1xyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25Nb3VzZVVwID0gZnVuY3Rpb24oKSB7XHJcbiAgdmpzLnVuYmxvY2tUZXh0U2VsZWN0aW9uKCk7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSwgZmFsc2UpO1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICdtb3VzZXVwJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQsIGZhbHNlKTtcclxuICB2anMub2ZmKGRvY3VtZW50LCAndG91Y2htb3ZlJywgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlLCBmYWxzZSk7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQsIGZhbHNlKTtcclxuXHJcbiAgdGhpcy51cGRhdGUoKTtcclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gSW4gVm9sdW1lQmFyIGluaXQgd2UgaGF2ZSBhIHNldFRpbWVvdXQgZm9yIHVwZGF0ZSB0aGF0IHBvcHMgYW5kIHVwZGF0ZSB0byB0aGUgZW5kIG9mIHRoZVxyXG4gIC8vIGV4ZWN1dGlvbiBzdGFjay4gVGhlIHBsYXllciBpcyBkZXN0cm95ZWQgYmVmb3JlIHRoZW4gdXBkYXRlIHdpbGwgY2F1c2UgYW4gZXJyb3JcclxuICBpZiAoIXRoaXMuZWxfKSByZXR1cm47XHJcblxyXG4gIC8vIElmIHNjcnViYmluZywgd2UgY291bGQgdXNlIGEgY2FjaGVkIHZhbHVlIHRvIG1ha2UgdGhlIGhhbmRsZSBrZWVwIHVwIHdpdGggdGhlIHVzZXIncyBtb3VzZS5cclxuICAvLyBPbiBIVE1MNSBicm93c2VycyBzY3J1YmJpbmcgaXMgcmVhbGx5IHNtb290aCwgYnV0IHNvbWUgZmxhc2ggcGxheWVycyBhcmUgc2xvdywgc28gd2UgbWlnaHQgd2FudCB0byB1dGlsaXplIHRoaXMgbGF0ZXIuXHJcbiAgLy8gdmFyIHByb2dyZXNzID0gICh0aGlzLnBsYXllcl8uc2NydWJiaW5nKSA/IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpLmN1cnJlbnRUaW1lIC8gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKSAvIHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xyXG5cclxuICB2YXIgYmFyUHJvZ3Jlc3MsXHJcbiAgICAgIHByb2dyZXNzID0gdGhpcy5nZXRQZXJjZW50KCksXHJcbiAgICAgIGhhbmRsZSA9IHRoaXMuaGFuZGxlLFxyXG4gICAgICBiYXIgPSB0aGlzLmJhcjtcclxuXHJcbiAgLy8gUHJvdGVjdCBhZ2FpbnN0IG5vIGR1cmF0aW9uIGFuZCBvdGhlciBkaXZpc2lvbiBpc3N1ZXNcclxuICBpZiAoaXNOYU4ocHJvZ3Jlc3MpKSB7IHByb2dyZXNzID0gMDsgfVxyXG5cclxuICBiYXJQcm9ncmVzcyA9IHByb2dyZXNzO1xyXG5cclxuICAvLyBJZiB0aGVyZSBpcyBhIGhhbmRsZSwgd2UgbmVlZCB0byBhY2NvdW50IGZvciB0aGUgaGFuZGxlIGluIG91ciBjYWxjdWxhdGlvbiBmb3IgcHJvZ3Jlc3MgYmFyXHJcbiAgLy8gc28gdGhhdCBpdCBkb2Vzbid0IGZhbGwgc2hvcnQgb2Ygb3IgZXh0ZW5kIHBhc3QgdGhlIGhhbmRsZS5cclxuICBpZiAoaGFuZGxlKSB7XHJcblxyXG4gICAgdmFyIGJveCA9IHRoaXMuZWxfLFxyXG4gICAgICAgIGJveFdpZHRoID0gYm94Lm9mZnNldFdpZHRoLFxyXG5cclxuICAgICAgICBoYW5kbGVXaWR0aCA9IGhhbmRsZS5lbCgpLm9mZnNldFdpZHRoLFxyXG5cclxuICAgICAgICAvLyBUaGUgd2lkdGggb2YgdGhlIGhhbmRsZSBpbiBwZXJjZW50IG9mIHRoZSBjb250YWluaW5nIGJveFxyXG4gICAgICAgIC8vIEluIElFLCB3aWR0aHMgbWF5IG5vdCBiZSByZWFkeSB5ZXQgY2F1c2luZyBOYU5cclxuICAgICAgICBoYW5kbGVQZXJjZW50ID0gKGhhbmRsZVdpZHRoKSA/IGhhbmRsZVdpZHRoIC8gYm94V2lkdGggOiAwLFxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGFkanVzdGVkIHNpemUgb2YgdGhlIGJveCwgY29uc2lkZXJpbmcgdGhhdCB0aGUgaGFuZGxlJ3MgY2VudGVyIG5ldmVyIHRvdWNoZXMgdGhlIGxlZnQgb3IgcmlnaHQgc2lkZS5cclxuICAgICAgICAvLyBUaGVyZSBpcyBhIG1hcmdpbiBvZiBoYWxmIHRoZSBoYW5kbGUncyB3aWR0aCBvbiBib3RoIHNpZGVzLlxyXG4gICAgICAgIGJveEFkanVzdGVkUGVyY2VudCA9IDEgLSBoYW5kbGVQZXJjZW50LFxyXG5cclxuICAgICAgICAvLyBBZGp1c3QgdGhlIHByb2dyZXNzIHRoYXQgd2UnbGwgdXNlIHRvIHNldCB3aWR0aHMgdG8gdGhlIG5ldyBhZGp1c3RlZCBib3ggd2lkdGhcclxuICAgICAgICBhZGp1c3RlZFByb2dyZXNzID0gcHJvZ3Jlc3MgKiBib3hBZGp1c3RlZFBlcmNlbnQ7XHJcblxyXG4gICAgLy8gVGhlIGJhciBkb2VzIHJlYWNoIHRoZSBsZWZ0IHNpZGUsIHNvIHdlIG5lZWQgdG8gYWNjb3VudCBmb3IgdGhpcyBpbiB0aGUgYmFyJ3Mgd2lkdGhcclxuICAgIGJhclByb2dyZXNzID0gYWRqdXN0ZWRQcm9ncmVzcyArIChoYW5kbGVQZXJjZW50IC8gMik7XHJcblxyXG4gICAgLy8gTW92ZSB0aGUgaGFuZGxlIGZyb20gdGhlIGxlZnQgYmFzZWQgb24gdGhlIGFkamVjdGVkIHByb2dyZXNzXHJcbiAgICBoYW5kbGUuZWwoKS5zdHlsZS5sZWZ0ID0gdmpzLnJvdW5kKGFkanVzdGVkUHJvZ3Jlc3MgKiAxMDAsIDIpICsgJyUnO1xyXG4gIH1cclxuXHJcbiAgLy8gU2V0IHRoZSBuZXcgYmFyIHdpZHRoXHJcbiAgYmFyLmVsKCkuc3R5bGUud2lkdGggPSB2anMucm91bmQoYmFyUHJvZ3Jlc3MgKiAxMDAsIDIpICsgJyUnO1xyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUuY2FsY3VsYXRlRGlzdGFuY2UgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdmFyIGVsLCBib3gsIGJveFgsIGJveFksIGJveFcsIGJveEgsIGhhbmRsZSwgcGFnZVgsIHBhZ2VZO1xyXG5cclxuICBlbCA9IHRoaXMuZWxfO1xyXG4gIGJveCA9IHZqcy5maW5kUG9zaXRpb24oZWwpO1xyXG4gIGJveFcgPSBib3hIID0gZWwub2Zmc2V0V2lkdGg7XHJcbiAgaGFuZGxlID0gdGhpcy5oYW5kbGU7XHJcblxyXG4gIGlmICh0aGlzLm9wdGlvbnNfLnZlcnRpY2FsKSB7XHJcbiAgICBib3hZID0gYm94LnRvcDtcclxuXHJcbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcclxuICAgICAgcGFnZVkgPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2VZID0gZXZlbnQucGFnZVk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhbmRsZSkge1xyXG4gICAgICB2YXIgaGFuZGxlSCA9IGhhbmRsZS5lbCgpLm9mZnNldEhlaWdodDtcclxuICAgICAgLy8gQWRqdXN0ZWQgWCBhbmQgV2lkdGgsIHNvIGhhbmRsZSBkb2Vzbid0IGdvIG91dHNpZGUgdGhlIGJhclxyXG4gICAgICBib3hZID0gYm94WSArIChoYW5kbGVIIC8gMik7XHJcbiAgICAgIGJveEggPSBib3hIIC0gaGFuZGxlSDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBQZXJjZW50IHRoYXQgdGhlIGNsaWNrIGlzIHRocm91Z2ggdGhlIGFkanVzdGVkIGFyZWFcclxuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAoKGJveFkgLSBwYWdlWSkgKyBib3hIKSAvIGJveEgpKTtcclxuXHJcbiAgfSBlbHNlIHtcclxuICAgIGJveFggPSBib3gubGVmdDtcclxuXHJcbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcclxuICAgICAgcGFnZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVg7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhhbmRsZSkge1xyXG4gICAgICB2YXIgaGFuZGxlVyA9IGhhbmRsZS5lbCgpLm9mZnNldFdpZHRoO1xyXG5cclxuICAgICAgLy8gQWRqdXN0ZWQgWCBhbmQgV2lkdGgsIHNvIGhhbmRsZSBkb2Vzbid0IGdvIG91dHNpZGUgdGhlIGJhclxyXG4gICAgICBib3hYID0gYm94WCArIChoYW5kbGVXIC8gMik7XHJcbiAgICAgIGJveFcgPSBib3hXIC0gaGFuZGxlVztcclxuICAgIH1cclxuXHJcbiAgICAvLyBQZXJjZW50IHRoYXQgdGhlIGNsaWNrIGlzIHRocm91Z2ggdGhlIGFkanVzdGVkIGFyZWFcclxuICAgIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCAocGFnZVggLSBib3hYKSAvIGJveFcpKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24oKXtcclxuICB2anMub24oZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25LZXlQcmVzcyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICBpZiAoZXZlbnQud2hpY2ggPT0gMzcpIHsgLy8gTGVmdCBBcnJvd1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc3RlcEJhY2soKTtcclxuICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDM5KSB7IC8vIFJpZ2h0IEFycm93XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5zdGVwRm9yd2FyZCgpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uQmx1ciA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ2tleXVwJywgdmpzLmJpbmQodGhpcywgdGhpcy5vbktleVByZXNzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogTGlzdGVuZXIgZm9yIGNsaWNrIGV2ZW50cyBvbiBzbGlkZXIsIHVzZWQgdG8gcHJldmVudCBjbGlja3NcclxuICogICBmcm9tIGJ1YmJsaW5nIHVwIHRvIHBhcmVudCBlbGVtZW50cyBsaWtlIGJ1dHRvbiBtZW51cy5cclxuICogQHBhcmFtICB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3RcclxuICovXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTZWVrQmFyIEJlaGF2aW9yIGluY2x1ZGVzIHBsYXkgcHJvZ3Jlc3MgYmFyLCBhbmQgc2VlayBoYW5kbGVcclxuICogTmVlZGVkIHNvIGl0IGNhbiBkZXRlcm1pbmUgc2VlayBwb3NpdGlvbiBiYXNlZCBvbiBoYW5kbGUgcG9zaXRpb24vc2l6ZVxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlNsaWRlckhhbmRsZSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKCk7XHJcblxyXG4vKipcclxuICogRGVmYXVsdCB2YWx1ZSBvZiB0aGUgc2xpZGVyXHJcbiAqXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuU2xpZGVySGFuZGxlLnByb3RvdHlwZS5kZWZhdWx0VmFsdWUgPSAwO1xyXG5cclxuLyoqIEBpbmhlcml0RG9jICovXHJcbnZqcy5TbGlkZXJIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpIHtcclxuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gIC8vIEFkZCB0aGUgc2xpZGVyIGVsZW1lbnQgY2xhc3MgdG8gYWxsIHN1YiBjbGFzc2VzXHJcbiAgcHJvcHMuY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgJyB2anMtc2xpZGVyLWhhbmRsZSc7XHJcbiAgcHJvcHMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPicrdGhpcy5kZWZhdWx0VmFsdWUrJzwvc3Bhbj4nXHJcbiAgfSwgcHJvcHMpO1xyXG5cclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2JywgcHJvcHMpO1xyXG59O1xyXG4vKiBNZW51XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBUaGUgTWVudSBjb21wb25lbnQgaXMgdXNlZCB0byBidWlsZCBwb3AgdXAgbWVudXMsIGluY2x1ZGluZyBzdWJ0aXRsZSBhbmRcclxuICogY2FwdGlvbnMgc2VsZWN0aW9uIG1lbnVzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NZW51ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoKTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBtZW51IGl0ZW0gdG8gdGhlIG1lbnVcclxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBjb21wb25lbnQgQ29tcG9uZW50IG9yIGNvbXBvbmVudCB0eXBlIHRvIGFkZFxyXG4gKi9cclxudmpzLk1lbnUucHJvdG90eXBlLmFkZEl0ZW0gPSBmdW5jdGlvbihjb21wb25lbnQpe1xyXG4gIHRoaXMuYWRkQ2hpbGQoY29tcG9uZW50KTtcclxuICBjb21wb25lbnQub24oJ2NsaWNrJywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgIHRoaXMudW5sb2NrU2hvd2luZygpO1xyXG4gIH0pKTtcclxufTtcclxuXHJcbi8qKiBAaW5oZXJpdERvYyAqL1xyXG52anMuTWVudS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBjb250ZW50RWxUeXBlID0gdGhpcy5vcHRpb25zKCkuY29udGVudEVsVHlwZSB8fCAndWwnO1xyXG4gIHRoaXMuY29udGVudEVsXyA9IHZqcy5jcmVhdGVFbChjb250ZW50RWxUeXBlLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbWVudS1jb250ZW50J1xyXG4gIH0pO1xyXG4gIHZhciBlbCA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGFwcGVuZDogdGhpcy5jb250ZW50RWxfLFxyXG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUnXHJcbiAgfSk7XHJcbiAgZWwuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50RWxfKTtcclxuXHJcbiAgLy8gUHJldmVudCBjbGlja3MgZnJvbSBidWJibGluZyB1cC4gTmVlZGVkIGZvciBNZW51IEJ1dHRvbnMsXHJcbiAgLy8gd2hlcmUgYSBjbGljayBvbiB0aGUgcGFyZW50IGlzIHNpZ25pZmljYW50XHJcbiAgdmpzLm9uKGVsLCAnY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgZXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgY29tcG9uZW50IGZvciBhIG1lbnUgaXRlbS4gYDxsaT5gXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk1lbnVJdGVtID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkKG9wdGlvbnNbJ3NlbGVjdGVkJ10pO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKiogQGluaGVyaXREb2MgKi9cclxudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKXtcclxuICByZXR1cm4gdmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnbGknLCB2anMub2JqLm1lcmdlKHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LWl0ZW0nLFxyXG4gICAgaW5uZXJIVE1MOiB0aGlzLm9wdGlvbnNfWydsYWJlbCddXHJcbiAgfSwgcHJvcHMpKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgYSBjbGljayBvbiB0aGUgbWVudSBpdGVtLCBhbmQgc2V0IGl0IHRvIHNlbGVjdGVkXHJcbiAqL1xyXG52anMuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuc2VsZWN0ZWQodHJ1ZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IHRoaXMgbWVudSBpdGVtIGFzIHNlbGVjdGVkIG9yIG5vdFxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBzZWxlY3RlZFxyXG4gKi9cclxudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5zZWxlY3RlZCA9IGZ1bmN0aW9uKHNlbGVjdGVkKXtcclxuICBpZiAoc2VsZWN0ZWQpIHtcclxuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1zZWxlY3RlZCcpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyx0cnVlKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLXNlbGVjdGVkJyk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLGZhbHNlKTtcclxuICB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEEgYnV0dG9uIGNsYXNzIHdpdGggYSBwb3B1cCBtZW51XHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTWVudUJ1dHRvbiA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMubWVudSA9IHRoaXMuY3JlYXRlTWVudSgpO1xyXG5cclxuICAgIC8vIEFkZCBsaXN0IHRvIGVsZW1lbnRcclxuICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tZW51KTtcclxuXHJcbiAgICAvLyBBdXRvbWF0aWNhbGx5IGhpZGUgZW1wdHkgbWVudSBidXR0b25zXHJcbiAgICBpZiAodGhpcy5pdGVtcyAmJiB0aGlzLml0ZW1zLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9uKCdrZXl1cCcsIHRoaXMub25LZXlQcmVzcyk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGFzcG9wdXAnLCB0cnVlKTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIHRoZSBzdGF0ZSBvZiB0aGUgbWVudSBidXR0b25cclxuICogQHR5cGUge0Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUuYnV0dG9uUHJlc3NlZF8gPSBmYWxzZTtcclxuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgbWVudSA9IG5ldyB2anMuTWVudSh0aGlzLnBsYXllcl8pO1xyXG5cclxuICAvLyBBZGQgYSB0aXRsZSBsaXN0IGl0ZW0gdG8gdGhlIHRvcFxyXG4gIGlmICh0aGlzLm9wdGlvbnMoKS50aXRsZSkge1xyXG4gICAgbWVudS5lbCgpLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnbGknLCB7XHJcbiAgICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LXRpdGxlJyxcclxuICAgICAgaW5uZXJIVE1MOiB2anMuY2FwaXRhbGl6ZSh0aGlzLmtpbmRfKSxcclxuICAgICAgdGFiaW5kZXg6IC0xXHJcbiAgICB9KSk7XHJcbiAgfVxyXG5cclxuICB0aGlzLml0ZW1zID0gdGhpc1snY3JlYXRlSXRlbXMnXSgpO1xyXG5cclxuICBpZiAodGhpcy5pdGVtcykge1xyXG4gICAgLy8gQWRkIG1lbnUgaXRlbXMgdG8gdGhlIG1lbnVcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICBtZW51LmFkZEl0ZW0odGhpcy5pdGVtc1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVudTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgdGhlIGxpc3Qgb2YgbWVudSBpdGVtcy4gU3BlY2lmaWMgdG8gZWFjaCBzdWJjbGFzcy5cclxuICovXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7fTtcclxuXHJcbi8qKiBAaW5oZXJpdERvYyAqL1xyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY2xhc3NOYW1lICsgJyB2anMtbWVudS1idXR0b24gJyArIHZqcy5CdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8vIEZvY3VzIC0gQWRkIGtleWJvYXJkIGZ1bmN0aW9uYWxpdHkgdG8gZWxlbWVudFxyXG4vLyBUaGlzIGZ1bmN0aW9uIGlzIG5vdCBuZWVkZWQgYW55bW9yZS4gSW5zdGVhZCwgdGhlIGtleWJvYXJkIGZ1bmN0aW9uYWxpdHkgaXMgaGFuZGxlZCBieVxyXG4vLyB0cmVhdGluZyB0aGUgYnV0dG9uIGFzIHRyaWdnZXJpbmcgYSBzdWJtZW51LiBXaGVuIHRoZSBidXR0b24gaXMgcHJlc3NlZCwgdGhlIHN1Ym1lbnVcclxuLy8gYXBwZWFycy4gUHJlc3NpbmcgdGhlIGJ1dHRvbiBhZ2FpbiBtYWtlcyB0aGUgc3VibWVudSBkaXNhcHBlYXIuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24oKXt9O1xyXG4vLyBDYW4ndCB0dXJuIG9mZiBsaXN0IGRpc3BsYXkgdGhhdCB3ZSB0dXJuZWQgb24gd2l0aCBmb2N1cywgYmVjYXVzZSBsaXN0IHdvdWxkIGdvIGF3YXkuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbkJsdXIgPSBmdW5jdGlvbigpe307XHJcblxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gV2hlbiB5b3UgY2xpY2sgdGhlIGJ1dHRvbiBpdCBhZGRzIGZvY3VzLCB3aGljaCB3aWxsIHNob3cgdGhlIG1lbnUgaW5kZWZpbml0ZWx5LlxyXG4gIC8vIFNvIHdlJ2xsIHJlbW92ZSBmb2N1cyB3aGVuIHRoZSBtb3VzZSBsZWF2ZXMgdGhlIGJ1dHRvbi5cclxuICAvLyBGb2N1cyBpcyBuZWVkZWQgZm9yIHRhYiBuYXZpZ2F0aW9uLlxyXG4gIHRoaXMub25lKCdtb3VzZW91dCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLm1lbnUudW5sb2NrU2hvd2luZygpO1xyXG4gICAgdGhpcy5lbF8uYmx1cigpO1xyXG4gIH0pKTtcclxuICBpZiAodGhpcy5idXR0b25QcmVzc2VkXyl7XHJcbiAgICB0aGlzLnVucHJlc3NCdXR0b24oKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5wcmVzc0J1dHRvbigpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5NZW51QnV0dG9uLnByb3RvdHlwZS5vbktleVByZXNzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gIC8vIENoZWNrIGZvciBzcGFjZSBiYXIgKDMyKSBvciBlbnRlciAoMTMpIGtleXNcclxuICBpZiAoZXZlbnQud2hpY2ggPT0gMzIgfHwgZXZlbnQud2hpY2ggPT0gMTMpIHtcclxuICAgIGlmICh0aGlzLmJ1dHRvblByZXNzZWRfKXtcclxuICAgICAgdGhpcy51bnByZXNzQnV0dG9uKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnByZXNzQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgLy8gQ2hlY2sgZm9yIGVzY2FwZSAoMjcpIGtleVxyXG4gIH0gZWxzZSBpZiAoZXZlbnQud2hpY2ggPT0gMjcpe1xyXG4gICAgaWYgKHRoaXMuYnV0dG9uUHJlc3NlZF8pe1xyXG4gICAgICB0aGlzLnVucHJlc3NCdXR0b24oKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUucHJlc3NCdXR0b24gPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuYnV0dG9uUHJlc3NlZF8gPSB0cnVlO1xyXG4gIHRoaXMubWVudS5sb2NrU2hvd2luZygpO1xyXG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgdHJ1ZSk7XHJcbiAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPiAwKSB7XHJcbiAgICB0aGlzLml0ZW1zWzBdLmVsKCkuZm9jdXMoKTsgLy8gc2V0IHRoZSBmb2N1cyB0byB0aGUgdGl0bGUgb2YgdGhlIHN1Ym1lbnVcclxuICB9XHJcbn07XHJcblxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUudW5wcmVzc0J1dHRvbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5idXR0b25QcmVzc2VkXyA9IGZhbHNlO1xyXG4gIHRoaXMubWVudS51bmxvY2tTaG93aW5nKCk7XHJcbiAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXByZXNzZWQnLCBmYWxzZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQW4gaW5zdGFuY2Ugb2YgdGhlIGB2anMuUGxheWVyYCBjbGFzcyBpcyBjcmVhdGVkIHdoZW4gYW55IG9mIHRoZSBWaWRlby5qcyBzZXR1cCBtZXRob2RzIGFyZSB1c2VkIHRvIGluaXRpYWxpemUgYSB2aWRlby5cclxuICpcclxuICogYGBganNcclxuICogdmFyIG15UGxheWVyID0gdmlkZW9qcygnZXhhbXBsZV92aWRlb18xJyk7XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBJbiB0aGUgZm9sbHdpbmcgZXhhbXBsZSwgdGhlIGBkYXRhLXNldHVwYCBhdHRyaWJ1dGUgdGVsbHMgdGhlIFZpZGVvLmpzIGxpYnJhcnkgdG8gY3JlYXRlIGEgcGxheWVyIGluc3RhbmNlIHdoZW4gdGhlIGxpYnJhcnkgaXMgcmVhZHkuXHJcbiAqXHJcbiAqIGBgYGh0bWxcclxuICogPHZpZGVvIGlkPVwiZXhhbXBsZV92aWRlb18xXCIgZGF0YS1zZXR1cD0ne30nIGNvbnRyb2xzPlxyXG4gKiAgIDxzb3VyY2Ugc3JjPVwibXktc291cmNlLm1wNFwiIHR5cGU9XCJ2aWRlby9tcDRcIj5cclxuICogPC92aWRlbz5cclxuICogYGBgXHJcbiAqXHJcbiAqIEFmdGVyIGFuIGluc3RhbmNlIGhhcyBiZWVuIGNyZWF0ZWQgaXQgY2FuIGJlIGFjY2Vzc2VkIGdsb2JhbGx5IHVzaW5nIGBWaWRlbygnZXhhbXBsZV92aWRlb18xJylgLlxyXG4gKlxyXG4gKiBAY2xhc3NcclxuICogQGV4dGVuZHMgdmpzLkNvbXBvbmVudFxyXG4gKi9cclxudmpzLlBsYXllciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuXHJcbiAgLyoqXHJcbiAgICogcGxheWVyJ3MgY29uc3RydWN0b3IgZnVuY3Rpb25cclxuICAgKlxyXG4gICAqIEBjb25zdHJ1Y3RzXHJcbiAgICogQG1ldGhvZCBpbml0XHJcbiAgICogQHBhcmFtIHtFbGVtZW50fSB0YWcgICAgICAgIFRoZSBvcmlnaW5hbCB2aWRlbyB0YWcgdXNlZCBmb3IgY29uZmlndXJpbmcgb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9ucyAgICBQbGF5ZXIgb3B0aW9uc1xyXG4gICAqIEBwYXJhbSB7RnVuY3Rpb249fSByZWFkeSAgICBSZWFkeSBjYWxsYmFjayBmdW5jdGlvblxyXG4gICAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHRhZywgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdGhpcy50YWcgPSB0YWc7IC8vIFN0b3JlIHRoZSBvcmlnaW5hbCB0YWcgdXNlZCB0byBzZXQgb3B0aW9uc1xyXG5cclxuICAgIC8vIFNldCBPcHRpb25zXHJcbiAgICAvLyBUaGUgb3B0aW9ucyBhcmd1bWVudCBvdmVycmlkZXMgb3B0aW9ucyBzZXQgaW4gdGhlIHZpZGVvIHRhZ1xyXG4gICAgLy8gd2hpY2ggb3ZlcnJpZGVzIGdsb2JhbGx5IHNldCBvcHRpb25zLlxyXG4gICAgLy8gVGhpcyBsYXR0ZXIgcGFydCBjb2luY2lkZXMgd2l0aCB0aGUgbG9hZCBvcmRlclxyXG4gICAgLy8gKHRhZyBtdXN0IGV4aXN0IGJlZm9yZSBQbGF5ZXIpXHJcbiAgICBvcHRpb25zID0gdmpzLm9iai5tZXJnZSh0aGlzLmdldFRhZ1NldHRpbmdzKHRhZyksIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIENhY2hlIGZvciB2aWRlbyBwcm9wZXJ0eSB2YWx1ZXMuXHJcbiAgICB0aGlzLmNhY2hlXyA9IHt9O1xyXG5cclxuICAgIC8vIFNldCBwb3N0ZXJcclxuICAgIHRoaXMucG9zdGVyXyA9IG9wdGlvbnNbJ3Bvc3RlciddO1xyXG4gICAgLy8gU2V0IGNvbnRyb2xzXHJcbiAgICB0aGlzLmNvbnRyb2xzXyA9IG9wdGlvbnNbJ2NvbnRyb2xzJ107XHJcbiAgICAvLyBPcmlnaW5hbCB0YWcgc2V0dGluZ3Mgc3RvcmVkIGluIG9wdGlvbnNcclxuICAgIC8vIG5vdyByZW1vdmUgaW1tZWRpYXRlbHkgc28gbmF0aXZlIGNvbnRyb2xzIGRvbid0IGZsYXNoLlxyXG4gICAgLy8gTWF5IGJlIHR1cm5lZCBiYWNrIG9uIGJ5IEhUTUw1IHRlY2ggaWYgbmF0aXZlQ29udHJvbHNGb3JUb3VjaCBpcyB0cnVlXHJcbiAgICB0YWcuY29udHJvbHMgPSBmYWxzZTtcclxuXHJcbiAgICAvLyBSdW4gYmFzZSBjb21wb25lbnQgaW5pdGlhbGl6aW5nIHdpdGggbmV3IG9wdGlvbnMuXHJcbiAgICAvLyBCdWlsZHMgdGhlIGVsZW1lbnQgdGhyb3VnaCBjcmVhdGVFbCgpXHJcbiAgICAvLyBJbml0cyBhbmQgZW1iZWRzIGFueSBjaGlsZCBjb21wb25lbnRzIGluIG9wdHNcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCB0aGlzLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgLy8gVXBkYXRlIGNvbnRyb2xzIGNsYXNzTmFtZS4gQ2FuJ3QgZG8gdGhpcyB3aGVuIHRoZSBjb250cm9scyBhcmUgaW5pdGlhbGx5XHJcbiAgICAvLyBzZXQgYmVjYXVzZSB0aGUgZWxlbWVudCBkb2Vzbid0IGV4aXN0IHlldC5cclxuICAgIGlmICh0aGlzLmNvbnRyb2xzKCkpIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWNvbnRyb2xzLWVuYWJsZWQnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1kaXNhYmxlZCcpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRPRE86IE1ha2UgdGhpcyBzbWFydGVyLiBUb2dnbGUgdXNlciBzdGF0ZSBiZXR3ZWVuIHRvdWNoaW5nL21vdXNpbmdcclxuICAgIC8vIHVzaW5nIGV2ZW50cywgc2luY2UgZGV2aWNlcyBjYW4gaGF2ZSBib3RoIHRvdWNoIGFuZCBtb3VzZSBldmVudHMuXHJcbiAgICAvLyBpZiAodmpzLlRPVUNIX0VOQUJMRUQpIHtcclxuICAgIC8vICAgdGhpcy5hZGRDbGFzcygndmpzLXRvdWNoLWVuYWJsZWQnKTtcclxuICAgIC8vIH1cclxuXHJcbiAgICAvLyBGaXJzdHBsYXkgZXZlbnQgaW1wbGltZW50YXRpb24uIE5vdCBzb2xkIG9uIHRoZSBldmVudCB5ZXQuXHJcbiAgICAvLyBDb3VsZCBwcm9iYWJseSBqdXN0IGNoZWNrIGN1cnJlbnRUaW1lPT0wP1xyXG4gICAgdGhpcy5vbmUoJ3BsYXknLCBmdW5jdGlvbihlKXtcclxuICAgICAgdmFyIGZwRXZlbnQgPSB7IHR5cGU6ICdmaXJzdHBsYXknLCB0YXJnZXQ6IHRoaXMuZWxfIH07XHJcbiAgICAgIC8vIFVzaW5nIHZqcy50cmlnZ2VyIHNvIHdlIGNhbiBjaGVjayBpZiBkZWZhdWx0IHdhcyBwcmV2ZW50ZWRcclxuICAgICAgdmFyIGtlZXBHb2luZyA9IHZqcy50cmlnZ2VyKHRoaXMuZWxfLCBmcEV2ZW50KTtcclxuXHJcbiAgICAgIGlmICgha2VlcEdvaW5nKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5vbignZW5kZWQnLCB0aGlzLm9uRW5kZWQpO1xyXG4gICAgdGhpcy5vbigncGxheScsIHRoaXMub25QbGF5KTtcclxuICAgIHRoaXMub24oJ2ZpcnN0cGxheScsIHRoaXMub25GaXJzdFBsYXkpO1xyXG4gICAgdGhpcy5vbigncGF1c2UnLCB0aGlzLm9uUGF1c2UpO1xyXG4gICAgdGhpcy5vbigncHJvZ3Jlc3MnLCB0aGlzLm9uUHJvZ3Jlc3MpO1xyXG4gICAgdGhpcy5vbignZHVyYXRpb25jaGFuZ2UnLCB0aGlzLm9uRHVyYXRpb25DaGFuZ2UpO1xyXG4gICAgdGhpcy5vbignZXJyb3InLCB0aGlzLm9uRXJyb3IpO1xyXG4gICAgdGhpcy5vbignZnVsbHNjcmVlbmNoYW5nZScsIHRoaXMub25GdWxsc2NyZWVuQ2hhbmdlKTtcclxuXHJcbiAgICAvLyBNYWtlIHBsYXllciBlYXNpbHkgZmluZGFibGUgYnkgSURcclxuICAgIHZqcy5wbGF5ZXJzW3RoaXMuaWRfXSA9IHRoaXM7XHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ3BsdWdpbnMnXSkge1xyXG4gICAgICB2anMub2JqLmVhY2gob3B0aW9uc1sncGx1Z2lucyddLCBmdW5jdGlvbihrZXksIHZhbCl7XHJcbiAgICAgICAgdGhpc1trZXldKHZhbCk7XHJcbiAgICAgIH0sIHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGlzdGVuRm9yVXNlckFjdGl2aXR5KCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBQbGF5ZXIgaW5zdGFuY2Ugb3B0aW9ucywgc3VyZmFjZWQgdXNpbmcgdmpzLm9wdGlvbnNcclxuICogdmpzLm9wdGlvbnMgPSB2anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zX1xyXG4gKiBNYWtlIGNoYW5nZXMgaW4gdmpzLm9wdGlvbnMsIG5vdCBoZXJlLlxyXG4gKiBBbGwgb3B0aW9ucyBzaG91bGQgdXNlIHN0cmluZyBrZXlzIHNvIHRoZXkgYXZvaWRcclxuICogcmVuYW1pbmcgYnkgY2xvc3VyZSBjb21waWxlclxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub3B0aW9uc18gPSB2anMub3B0aW9ucztcclxuXHJcbi8qKlxyXG4gKiBEZXN0cm95cyB0aGUgdmlkZW8gcGxheWVyIGFuZCBkb2VzIGFueSBuZWNlc3NhcnkgY2xlYW51cFxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIuZGlzcG9zZSgpO1xyXG4gKlxyXG4gKiBUaGlzIGlzIGVzcGVjaWFsbHkgaGVscGZ1bCBpZiB5b3UgYXJlIGR5bmFtaWNhbGx5IGFkZGluZyBhbmQgcmVtb3ZpbmcgdmlkZW9zXHJcbiAqIHRvL2Zyb20gdGhlIERPTS5cclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudHJpZ2dlcignZGlzcG9zZScpO1xyXG4gIC8vIHByZXZlbnQgZGlzcG9zZSBmcm9tIGJlaW5nIGNhbGxlZCB0d2ljZVxyXG4gIHRoaXMub2ZmKCdkaXNwb3NlJyk7XHJcblxyXG4gIC8vIEtpbGwgcmVmZXJlbmNlIHRvIHRoaXMgcGxheWVyXHJcbiAgdmpzLnBsYXllcnNbdGhpcy5pZF9dID0gbnVsbDtcclxuICBpZiAodGhpcy50YWcgJiYgdGhpcy50YWdbJ3BsYXllciddKSB7IHRoaXMudGFnWydwbGF5ZXInXSA9IG51bGw7IH1cclxuICBpZiAodGhpcy5lbF8gJiYgdGhpcy5lbF9bJ3BsYXllciddKSB7IHRoaXMuZWxfWydwbGF5ZXInXSA9IG51bGw7IH1cclxuXHJcbiAgLy8gRW5zdXJlIHRoYXQgdHJhY2tpbmcgcHJvZ3Jlc3MgYW5kIHRpbWUgcHJvZ3Jlc3Mgd2lsbCBzdG9wIGFuZCBwbGF0ZXIgZGVsZXRlZFxyXG4gIHRoaXMuc3RvcFRyYWNraW5nUHJvZ3Jlc3MoKTtcclxuICB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKCk7XHJcblxyXG4gIGlmICh0aGlzLnRlY2gpIHsgdGhpcy50ZWNoLmRpc3Bvc2UoKTsgfVxyXG5cclxuICAvLyBDb21wb25lbnQgZGlzcG9zZVxyXG4gIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmdldFRhZ1NldHRpbmdzID0gZnVuY3Rpb24odGFnKXtcclxuICB2YXIgb3B0aW9ucyA9IHtcclxuICAgICdzb3VyY2VzJzogW10sXHJcbiAgICAndHJhY2tzJzogW11cclxuICB9O1xyXG5cclxuICB2anMub2JqLm1lcmdlKG9wdGlvbnMsIHZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXModGFnKSk7XHJcblxyXG4gIC8vIEdldCB0YWcgY2hpbGRyZW4gc2V0dGluZ3NcclxuICBpZiAodGFnLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgdmFyIGNoaWxkcmVuLCBjaGlsZCwgY2hpbGROYW1lLCBpLCBqO1xyXG5cclxuICAgIGNoaWxkcmVuID0gdGFnLmNoaWxkTm9kZXM7XHJcblxyXG4gICAgZm9yIChpPTAsaj1jaGlsZHJlbi5sZW5ndGg7IGk8ajsgaSsrKSB7XHJcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XHJcbiAgICAgIC8vIENoYW5nZSBjYXNlIG5lZWRlZDogaHR0cDovL2Vqb2huLm9yZy9ibG9nL25vZGVuYW1lLWNhc2Utc2Vuc2l0aXZpdHkvXHJcbiAgICAgIGNoaWxkTmFtZSA9IGNoaWxkLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGlmIChjaGlsZE5hbWUgPT09ICdzb3VyY2UnKSB7XHJcbiAgICAgICAgb3B0aW9uc1snc291cmNlcyddLnB1c2godmpzLmdldEF0dHJpYnV0ZVZhbHVlcyhjaGlsZCkpO1xyXG4gICAgICB9IGVsc2UgaWYgKGNoaWxkTmFtZSA9PT0gJ3RyYWNrJykge1xyXG4gICAgICAgIG9wdGlvbnNbJ3RyYWNrcyddLnB1c2godmpzLmdldEF0dHJpYnV0ZVZhbHVlcyhjaGlsZCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb3B0aW9ucztcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZWwgPSB0aGlzLmVsXyA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicpO1xyXG4gIHZhciB0YWcgPSB0aGlzLnRhZztcclxuXHJcbiAgLy8gUmVtb3ZlIHdpZHRoL2hlaWdodCBhdHRycyBmcm9tIHRhZyBzbyBDU1MgY2FuIG1ha2UgaXQgMTAwJSB3aWR0aC9oZWlnaHRcclxuICB0YWcucmVtb3ZlQXR0cmlidXRlKCd3aWR0aCcpO1xyXG4gIHRhZy5yZW1vdmVBdHRyaWJ1dGUoJ2hlaWdodCcpO1xyXG4gIC8vIEVtcHR5IHZpZGVvIHRhZyB0cmFja3Mgc28gdGhlIGJ1aWx0LWluIHBsYXllciBkb2Vzbid0IHVzZSB0aGVtIGFsc28uXHJcbiAgLy8gVGhpcyBtYXkgbm90IGJlIGZhc3QgZW5vdWdoIHRvIHN0b3AgSFRNTDUgYnJvd3NlcnMgZnJvbSByZWFkaW5nIHRoZSB0YWdzXHJcbiAgLy8gc28gd2UnbGwgbmVlZCB0byB0dXJuIG9mZiBhbnkgZGVmYXVsdCB0cmFja3MgaWYgd2UncmUgbWFudWFsbHkgZG9pbmdcclxuICAvLyBjYXB0aW9ucyBhbmQgc3VidGl0bGVzLiB2aWRlb0VsZW1lbnQudGV4dFRyYWNrc1xyXG4gIGlmICh0YWcuaGFzQ2hpbGROb2RlcygpKSB7XHJcbiAgICB2YXIgbm9kZXMsIG5vZGVzTGVuZ3RoLCBpLCBub2RlLCBub2RlTmFtZSwgcmVtb3ZlTm9kZXM7XHJcblxyXG4gICAgbm9kZXMgPSB0YWcuY2hpbGROb2RlcztcclxuICAgIG5vZGVzTGVuZ3RoID0gbm9kZXMubGVuZ3RoO1xyXG4gICAgcmVtb3ZlTm9kZXMgPSBbXTtcclxuXHJcbiAgICB3aGlsZSAobm9kZXNMZW5ndGgtLSkge1xyXG4gICAgICBub2RlID0gbm9kZXNbbm9kZXNMZW5ndGhdO1xyXG4gICAgICBub2RlTmFtZSA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgaWYgKG5vZGVOYW1lID09PSAndHJhY2snKSB7XHJcbiAgICAgICAgcmVtb3ZlTm9kZXMucHVzaChub2RlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZvciAoaT0wOyBpPHJlbW92ZU5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIHRhZy5yZW1vdmVDaGlsZChyZW1vdmVOb2Rlc1tpXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBNYWtlIHN1cmUgdGFnIElEIGV4aXN0c1xyXG4gIHRhZy5pZCA9IHRhZy5pZCB8fCAndmpzX3ZpZGVvXycgKyB2anMuZ3VpZCsrO1xyXG5cclxuICAvLyBHaXZlIHZpZGVvIHRhZyBJRCBhbmQgY2xhc3MgdG8gcGxheWVyIGRpdlxyXG4gIC8vIElEIHdpbGwgbm93IHJlZmVyZW5jZSBwbGF5ZXIgYm94LCBub3QgdGhlIHZpZGVvIHRhZ1xyXG4gIGVsLmlkID0gdGFnLmlkO1xyXG4gIGVsLmNsYXNzTmFtZSA9IHRhZy5jbGFzc05hbWU7XHJcblxyXG4gIC8vIFVwZGF0ZSB0YWcgaWQvY2xhc3MgZm9yIHVzZSBhcyBIVE1MNSBwbGF5YmFjayB0ZWNoXHJcbiAgLy8gTWlnaHQgdGhpbmsgd2Ugc2hvdWxkIGRvIHRoaXMgYWZ0ZXIgZW1iZWRkaW5nIGluIGNvbnRhaW5lciBzbyAudmpzLXRlY2ggY2xhc3NcclxuICAvLyBkb2Vzbid0IGZsYXNoIDEwMCUgd2lkdGgvaGVpZ2h0LCBidXQgY2xhc3Mgb25seSBhcHBsaWVzIHdpdGggLnZpZGVvLWpzIHBhcmVudFxyXG4gIHRhZy5pZCArPSAnX2h0bWw1X2FwaSc7XHJcbiAgdGFnLmNsYXNzTmFtZSA9ICd2anMtdGVjaCc7XHJcblxyXG4gIC8vIE1ha2UgcGxheWVyIGZpbmRhYmxlIG9uIGVsZW1lbnRzXHJcbiAgdGFnWydwbGF5ZXInXSA9IGVsWydwbGF5ZXInXSA9IHRoaXM7XHJcbiAgLy8gRGVmYXVsdCBzdGF0ZSBvZiB2aWRlbyBpcyBwYXVzZWRcclxuICB0aGlzLmFkZENsYXNzKCd2anMtcGF1c2VkJyk7XHJcblxyXG4gIC8vIE1ha2UgYm94IHVzZSB3aWR0aC9oZWlnaHQgb2YgdGFnLCBvciByZWx5IG9uIGRlZmF1bHQgaW1wbGVtZW50YXRpb25cclxuICAvLyBFbmZvcmNlIHdpdGggQ1NTIHNpbmNlIHdpZHRoL2hlaWdodCBhdHRycyBkb24ndCB3b3JrIG9uIGRpdnNcclxuICB0aGlzLndpZHRoKHRoaXMub3B0aW9uc19bJ3dpZHRoJ10sIHRydWUpOyAvLyAodHJ1ZSkgU2tpcCByZXNpemUgbGlzdGVuZXIgb24gbG9hZFxyXG4gIHRoaXMuaGVpZ2h0KHRoaXMub3B0aW9uc19bJ2hlaWdodCddLCB0cnVlKTtcclxuXHJcbiAgLy8gV3JhcCB2aWRlbyB0YWcgaW4gZGl2IChlbC9ib3gpIGNvbnRhaW5lclxyXG4gIGlmICh0YWcucGFyZW50Tm9kZSkge1xyXG4gICAgdGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGVsLCB0YWcpO1xyXG4gIH1cclxuICB2anMuaW5zZXJ0Rmlyc3QodGFnLCBlbCk7IC8vIEJyZWFrcyBpUGhvbmUsIGZpeGVkIGluIEhUTUw1IHNldHVwLlxyXG5cclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG4vLyAvKiBNZWRpYSBUZWNobm9sb2d5ICh0ZWNoKVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBMb2FkL0NyZWF0ZSBhbiBpbnN0YW5jZSBvZiBwbGF5YmFjayB0ZWNobmxvZ3kgaW5jbHVkaW5nIGVsZW1lbnQgYW5kIEFQSSBtZXRob2RzXHJcbi8vIEFuZCBhcHBlbmQgcGxheWJhY2sgZWxlbWVudCBpbiBwbGF5ZXIgZGl2LlxyXG52anMuUGxheWVyLnByb3RvdHlwZS5sb2FkVGVjaCA9IGZ1bmN0aW9uKHRlY2hOYW1lLCBzb3VyY2Upe1xyXG5cclxuICAvLyBQYXVzZSBhbmQgcmVtb3ZlIGN1cnJlbnQgcGxheWJhY2sgdGVjaG5vbG9neVxyXG4gIGlmICh0aGlzLnRlY2gpIHtcclxuICAgIHRoaXMudW5sb2FkVGVjaCgpO1xyXG5cclxuICAvLyBpZiB0aGlzIGlzIHRoZSBmaXJzdCB0aW1lIGxvYWRpbmcsIEhUTUw1IHRhZyB3aWxsIGV4aXN0IGJ1dCB3b24ndCBiZSBpbml0aWFsaXplZFxyXG4gIC8vIHNvIHdlIG5lZWQgdG8gcmVtb3ZlIGl0IGlmIHdlJ3JlIG5vdCBsb2FkaW5nIEhUTUw1XHJcbiAgfSBlbHNlIGlmICh0ZWNoTmFtZSAhPT0gJ0h0bWw1JyAmJiB0aGlzLnRhZykge1xyXG4gICAgdmpzLkh0bWw1LmRpc3Bvc2VNZWRpYUVsZW1lbnQodGhpcy50YWcpO1xyXG4gICAgdGhpcy50YWcgPSBudWxsO1xyXG4gIH1cclxuXHJcbiAgdGhpcy50ZWNoTmFtZSA9IHRlY2hOYW1lO1xyXG5cclxuICAvLyBUdXJuIG9mZiBBUEkgYWNjZXNzIGJlY2F1c2Ugd2UncmUgbG9hZGluZyBhIG5ldyB0ZWNoIHRoYXQgbWlnaHQgbG9hZCBhc3luY2hyb25vdXNseVxyXG4gIHRoaXMuaXNSZWFkeV8gPSBmYWxzZTtcclxuXHJcbiAgdmFyIHRlY2hSZWFkeSA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnBsYXllcl8udHJpZ2dlclJlYWR5KCk7XHJcblxyXG4gICAgLy8gTWFudWFsbHkgdHJhY2sgcHJvZ3Jlc3MgaW4gY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIvZmxhc2ggcGxheWVyIGRvZXNuJ3QgcmVwb3J0IGl0LlxyXG4gICAgaWYgKCF0aGlzLmZlYXR1cmVzWydwcm9ncmVzc0V2ZW50cyddKSB7XHJcbiAgICAgIHRoaXMucGxheWVyXy5tYW51YWxQcm9ncmVzc09uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTWFudWFsbHkgdHJhY2sgdGltZXVkcGF0ZXMgaW4gY2FzZXMgd2hlcmUgdGhlIGJyb3dzZXIvZmxhc2ggcGxheWVyIGRvZXNuJ3QgcmVwb3J0IGl0LlxyXG4gICAgaWYgKCF0aGlzLmZlYXR1cmVzWyd0aW1ldXBkYXRlRXZlbnRzJ10pIHtcclxuICAgICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFRpbWVVcGRhdGVzT24oKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBHcmFiIHRlY2gtc3BlY2lmaWMgb3B0aW9ucyBmcm9tIHBsYXllciBvcHRpb25zIGFuZCBhZGQgc291cmNlIGFuZCBwYXJlbnQgZWxlbWVudCB0byB1c2UuXHJcbiAgdmFyIHRlY2hPcHRpb25zID0gdmpzLm9iai5tZXJnZSh7ICdzb3VyY2UnOiBzb3VyY2UsICdwYXJlbnRFbCc6IHRoaXMuZWxfIH0sIHRoaXMub3B0aW9uc19bdGVjaE5hbWUudG9Mb3dlckNhc2UoKV0pO1xyXG5cclxuICBpZiAoc291cmNlKSB7XHJcbiAgICBpZiAoc291cmNlLnNyYyA9PSB0aGlzLmNhY2hlXy5zcmMgJiYgdGhpcy5jYWNoZV8uY3VycmVudFRpbWUgPiAwKSB7XHJcbiAgICAgIHRlY2hPcHRpb25zWydzdGFydFRpbWUnXSA9IHRoaXMuY2FjaGVfLmN1cnJlbnRUaW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuY2FjaGVfLnNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgfVxyXG5cclxuICAvLyBJbml0aWFsaXplIHRlY2ggaW5zdGFuY2VcclxuICB0aGlzLnRlY2ggPSBuZXcgd2luZG93Wyd2aWRlb2pzJ11bdGVjaE5hbWVdKHRoaXMsIHRlY2hPcHRpb25zKTtcclxuXHJcbiAgdGhpcy50ZWNoLnJlYWR5KHRlY2hSZWFkeSk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS51bmxvYWRUZWNoID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmlzUmVhZHlfID0gZmFsc2U7XHJcbiAgdGhpcy50ZWNoLmRpc3Bvc2UoKTtcclxuXHJcbiAgLy8gVHVybiBvZmYgYW55IG1hbnVhbCBwcm9ncmVzcyBvciB0aW1ldXBkYXRlIHRyYWNraW5nXHJcbiAgaWYgKHRoaXMubWFudWFsUHJvZ3Jlc3MpIHsgdGhpcy5tYW51YWxQcm9ncmVzc09mZigpOyB9XHJcblxyXG4gIGlmICh0aGlzLm1hbnVhbFRpbWVVcGRhdGVzKSB7IHRoaXMubWFudWFsVGltZVVwZGF0ZXNPZmYoKTsgfVxyXG5cclxuICB0aGlzLnRlY2ggPSBmYWxzZTtcclxufTtcclxuXHJcbi8vIFRoZXJlJ3MgbWFueSBpc3N1ZXMgYXJvdW5kIGNoYW5naW5nIHRoZSBzaXplIG9mIGEgRmxhc2ggKG9yIG90aGVyIHBsdWdpbikgb2JqZWN0LlxyXG4vLyBGaXJzdCBpcyBhIHBsdWdpbiByZWxvYWQgaXNzdWUgaW4gRmlyZWZveCB0aGF0IGhhcyBiZWVuIGFyb3VuZCBmb3IgMTEgeWVhcnM6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTkwMjY4XHJcbi8vIFRoZW4gd2l0aCB0aGUgbmV3IGZ1bGxzY3JlZW4gQVBJLCBNb3ppbGxhIGFuZCB3ZWJraXQgYnJvd3NlcnMgd2lsbCByZWxvYWQgdGhlIGZsYXNoIG9iamVjdCBhZnRlciBnb2luZyB0byBmdWxsc2NyZWVuLlxyXG4vLyBUbyBnZXQgYXJvdW5kIHRoaXMsIHdlJ3JlIHVubG9hZGluZyB0aGUgdGVjaCwgY2FjaGluZyBzb3VyY2UgYW5kIGN1cnJlbnRUaW1lIHZhbHVlcywgYW5kIHJlbG9hZGluZyB0aGUgdGVjaCBvbmNlIHRoZSBwbHVnaW4gaXMgcmVzaXplZC5cclxuLy8gcmVsb2FkVGVjaDogZnVuY3Rpb24oYmV0d2VlbkZuKXtcclxuLy8gICB2anMubG9nKCd1bmxvYWRpbmdUZWNoJylcclxuLy8gICB0aGlzLnVubG9hZFRlY2goKTtcclxuLy8gICB2anMubG9nKCd1bmxvYWRlZFRlY2gnKVxyXG4vLyAgIGlmIChiZXR3ZWVuRm4pIHsgYmV0d2VlbkZuLmNhbGwoKTsgfVxyXG4vLyAgIHZqcy5sb2coJ0xvYWRpbmdUZWNoJylcclxuLy8gICB0aGlzLmxvYWRUZWNoKHRoaXMudGVjaE5hbWUsIHsgc3JjOiB0aGlzLmNhY2hlXy5zcmMgfSlcclxuLy8gICB2anMubG9nKCdsb2FkZWRUZWNoJylcclxuLy8gfSxcclxuXHJcbi8qIEZhbGxiYWNrcyBmb3IgdW5zdXBwb3J0ZWQgZXZlbnQgdHlwZXNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy8gTWFudWFsbHkgdHJpZ2dlciBwcm9ncmVzcyBldmVudHMgYmFzZWQgb24gY2hhbmdlcyB0byB0aGUgYnVmZmVyZWQgYW1vdW50XHJcbi8vIE1hbnkgZmxhc2ggcGxheWVycyBhbmQgb2xkZXIgSFRNTDUgYnJvd3NlcnMgZG9uJ3Qgc2VuZCBwcm9ncmVzcyBvciBwcm9ncmVzcy1saWtlIGV2ZW50c1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5tYW51YWxQcm9ncmVzc09uID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLm1hbnVhbFByb2dyZXNzID0gdHJ1ZTtcclxuXHJcbiAgLy8gVHJpZ2dlciBwcm9ncmVzcyB3YXRjaGluZyB3aGVuIGEgc291cmNlIGJlZ2lucyBsb2FkaW5nXHJcbiAgdGhpcy50cmFja1Byb2dyZXNzKCk7XHJcblxyXG4gIC8vIFdhdGNoIGZvciBhIG5hdGl2ZSBwcm9ncmVzcyBldmVudCBjYWxsIG9uIHRoZSB0ZWNoIGVsZW1lbnRcclxuICAvLyBJbiBIVE1MNSwgc29tZSBvbGRlciB2ZXJzaW9ucyBkb24ndCBzdXBwb3J0IHRoZSBwcm9ncmVzcyBldmVudFxyXG4gIC8vIFNvIHdlJ3JlIGFzc3VtaW5nIHRoZXkgZG9uJ3QsIGFuZCB0dXJuaW5nIG9mZiBtYW51YWwgcHJvZ3Jlc3MgaWYgdGhleSBkby5cclxuICAvLyBBcyBvcHBvc2VkIHRvIGRvaW5nIHVzZXIgYWdlbnQgZGV0ZWN0aW9uXHJcbiAgdGhpcy50ZWNoLm9uZSgncHJvZ3Jlc3MnLCBmdW5jdGlvbigpe1xyXG5cclxuICAgIC8vIFVwZGF0ZSBrbm93biBwcm9ncmVzcyBzdXBwb3J0IGZvciB0aGlzIHBsYXliYWNrIHRlY2hub2xvZ3lcclxuICAgIHRoaXMuZmVhdHVyZXNbJ3Byb2dyZXNzRXZlbnRzJ10gPSB0cnVlO1xyXG5cclxuICAgIC8vIFR1cm4gb2ZmIG1hbnVhbCBwcm9ncmVzcyB0cmFja2luZ1xyXG4gICAgdGhpcy5wbGF5ZXJfLm1hbnVhbFByb2dyZXNzT2ZmKCk7XHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5tYW51YWxQcm9ncmVzc09mZiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5tYW51YWxQcm9ncmVzcyA9IGZhbHNlO1xyXG4gIHRoaXMuc3RvcFRyYWNraW5nUHJvZ3Jlc3MoKTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRyYWNrUHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xyXG5cclxuICB0aGlzLnByb2dyZXNzSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgLy8gRG9uJ3QgdHJpZ2dlciB1bmxlc3MgYnVmZmVyZWQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiBsYXN0IHRpbWVcclxuICAgIC8vIGxvZyh0aGlzLmNhY2hlXy5idWZmZXJFbmQsIHRoaXMuYnVmZmVyZWQoKS5lbmQoMCksIHRoaXMuZHVyYXRpb24oKSlcclxuICAgIC8qIFRPRE86IHVwZGF0ZSBmb3IgbXVsdGlwbGUgYnVmZmVyZWQgcmVnaW9ucyAqL1xyXG4gICAgaWYgKHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCA8IHRoaXMuYnVmZmVyZWQoKS5lbmQoMCkpIHtcclxuICAgICAgdGhpcy50cmlnZ2VyKCdwcm9ncmVzcycpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJ1ZmZlcmVkUGVyY2VudCgpID09IDEpIHtcclxuICAgICAgdGhpcy5zdG9wVHJhY2tpbmdQcm9ncmVzcygpO1xyXG4gICAgICB0aGlzLnRyaWdnZXIoJ3Byb2dyZXNzJyk7IC8vIExhc3QgdXBkYXRlXHJcbiAgICB9XHJcbiAgfSksIDUwMCk7XHJcbn07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnN0b3BUcmFja2luZ1Byb2dyZXNzID0gZnVuY3Rpb24oKXsgY2xlYXJJbnRlcnZhbCh0aGlzLnByb2dyZXNzSW50ZXJ2YWwpOyB9O1xyXG5cclxuLyohIFRpbWUgVHJhY2tpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsVGltZVVwZGF0ZXNPbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5tYW51YWxUaW1lVXBkYXRlcyA9IHRydWU7XHJcblxyXG4gIHRoaXMub24oJ3BsYXknLCB0aGlzLnRyYWNrQ3VycmVudFRpbWUpO1xyXG4gIHRoaXMub24oJ3BhdXNlJywgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSk7XHJcbiAgLy8gdGltZXVwZGF0ZSBpcyBhbHNvIGNhbGxlZCBieSAuY3VycmVudFRpbWUgd2hlbmV2ZXIgY3VycmVudCB0aW1lIGlzIHNldFxyXG5cclxuICAvLyBXYXRjaCBmb3IgbmF0aXZlIHRpbWV1cGRhdGUgZXZlbnRcclxuICB0aGlzLnRlY2gub25lKCd0aW1ldXBkYXRlJywgZnVuY3Rpb24oKXtcclxuICAgIC8vIFVwZGF0ZSBrbm93biBwcm9ncmVzcyBzdXBwb3J0IGZvciB0aGlzIHBsYXliYWNrIHRlY2hub2xvZ3lcclxuICAgIHRoaXMuZmVhdHVyZXNbJ3RpbWV1cGRhdGVFdmVudHMnXSA9IHRydWU7XHJcbiAgICAvLyBUdXJuIG9mZiBtYW51YWwgcHJvZ3Jlc3MgdHJhY2tpbmdcclxuICAgIHRoaXMucGxheWVyXy5tYW51YWxUaW1lVXBkYXRlc09mZigpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsVGltZVVwZGF0ZXNPZmYgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMubWFudWFsVGltZVVwZGF0ZXMgPSBmYWxzZTtcclxuICB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKCk7XHJcbiAgdGhpcy5vZmYoJ3BsYXknLCB0aGlzLnRyYWNrQ3VycmVudFRpbWUpO1xyXG4gIHRoaXMub2ZmKCdwYXVzZScsIHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUpO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUudHJhY2tDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMuY3VycmVudFRpbWVJbnRlcnZhbCkgeyB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKCk7IH1cclxuICB0aGlzLmN1cnJlbnRUaW1lSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy50cmlnZ2VyKCd0aW1ldXBkYXRlJyk7XHJcbiAgfSksIDI1MCk7IC8vIDQyID0gMjQgZnBzIC8vIDI1MCBpcyB3aGF0IFdlYmtpdCB1c2VzIC8vIEZGIHVzZXMgMTVcclxufTtcclxuXHJcbi8vIFR1cm4gb2ZmIHBsYXkgcHJvZ3Jlc3MgdHJhY2tpbmcgKHdoZW4gcGF1c2VkIG9yIGRyYWdnaW5nKVxyXG52anMuUGxheWVyLnByb3RvdHlwZS5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSA9IGZ1bmN0aW9uKCl7IGNsZWFySW50ZXJ2YWwodGhpcy5jdXJyZW50VGltZUludGVydmFsKTsgfTtcclxuXHJcbi8vIC8qIFBsYXllciBldmVudCBoYW5kbGVycyAoaG93IHRoZSBwbGF5ZXIgcmVhY3RzIHRvIGNlcnRhaW4gZXZlbnRzKVxyXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHVzZXIgYWdlbnQgYmVnaW5zIGxvb2tpbmcgZm9yIG1lZGlhIGRhdGFcclxuICogQGV2ZW50IGxvYWRzdGFydFxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Mb2FkU3RhcnQ7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBpbml0aWFsIGR1cmF0aW9uIGFuZCBkaW1lbnNpb24gaW5mb3JtYXRpb25cclxuICogQGV2ZW50IGxvYWRlZG1ldGFkYXRhXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRlZE1ldGFEYXRhO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHBsYXllciBoYXMgZG93bmxvYWRlZCBkYXRhIGF0IHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uXHJcbiAqIEBldmVudCBsb2FkZWRkYXRhXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRlZERhdGE7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIGhhcyBmaW5pc2hlZCBkb3dubG9hZGluZyB0aGUgc291cmNlIGRhdGFcclxuICogQGV2ZW50IGxvYWRlZGFsbGRhdGFcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uTG9hZGVkQWxsRGF0YTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuZXZlciB0aGUgbWVkaWEgYmVnaW5zIG9yIHJlc3VtZXMgcGxheWJhY2tcclxuICogQGV2ZW50IHBsYXlcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uUGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXBhdXNlZCcpO1xyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wbGF5aW5nJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgdGhlIGZpcnN0IHRpbWUgYSB2aWRlbyBpcyBwbGF5ZWRcclxuICpcclxuICogTm90IHBhcnQgb2YgdGhlIEhMUyBzcGVjLCBhbmQgd2UncmUgbm90IHN1cmUgaWYgdGhpcyBpcyB0aGUgYmVzdFxyXG4gKiBpbXBsZW1lbnRhdGlvbiB5ZXQsIHNvIHVzZSBzcGFyaW5nbHkuIElmIHlvdSBkb24ndCBoYXZlIGEgcmVhc29uIHRvXHJcbiAqIHByZXZlbnQgcGxheWJhY2ssIHVzZSBgbXlQbGF5ZXIub25lKCdwbGF5Jyk7YCBpbnN0ZWFkLlxyXG4gKlxyXG4gKiBAZXZlbnQgZmlyc3RwbGF5XHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkZpcnN0UGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvL0lmIHRoZSBmaXJzdCBzdGFydHRpbWUgYXR0cmlidXRlIGlzIHNwZWNpZmllZFxyXG4gICAgLy90aGVuIHdlIHdpbGwgc3RhcnQgYXQgdGhlIGdpdmVuIG9mZnNldCBpbiBzZWNvbmRzXHJcbiAgICBpZih0aGlzLm9wdGlvbnNfWydzdGFydHRpbWUnXSl7XHJcbiAgICAgIHRoaXMuY3VycmVudFRpbWUodGhpcy5vcHRpb25zX1snc3RhcnR0aW1lJ10pO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oYXMtc3RhcnRlZCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW5ldmVyIHRoZSBtZWRpYSBoYXMgYmVlbiBwYXVzZWRcclxuICogQGV2ZW50IHBhdXNlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vblBhdXNlID0gZnVuY3Rpb24oKXtcclxuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBjdXJyZW50IHBsYXliYWNrIHBvc2l0aW9uIGhhcyBjaGFuZ2VkXHJcbiAqXHJcbiAqIER1cmluZyBwbGF5YmFjayB0aGlzIGlzIGZpcmVkIGV2ZXJ5IDE1LTI1MCBtaWxsaXNlY29uZHMsIGRlcG5kaW5nIG9uIHRoZVxyXG4gKiBwbGF5YmFjayB0ZWNobm9sb2d5IGluIHVzZS5cclxuICogQGV2ZW50IHRpbWV1cGRhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uVGltZVVwZGF0ZTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGlsZSB0aGUgdXNlciBhZ2VudCBpcyBkb3dubG9hZGluZyBtZWRpYSBkYXRhXHJcbiAqIEBldmVudCBwcm9ncmVzc1xyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Qcm9ncmVzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gQWRkIGN1c3RvbSBldmVudCBmb3Igd2hlbiBzb3VyY2UgaXMgZmluaXNoZWQgZG93bmxvYWRpbmcuXHJcbiAgaWYgKHRoaXMuYnVmZmVyZWRQZXJjZW50KCkgPT0gMSkge1xyXG4gICAgdGhpcy50cmlnZ2VyKCdsb2FkZWRhbGxkYXRhJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIGVuZCBvZiB0aGUgbWVkaWEgcmVzb3VyY2UgaXMgcmVhY2hlZCAoY3VycmVudFRpbWUgPT0gZHVyYXRpb24pXHJcbiAqIEBldmVudCBlbmRlZFxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25FbmRlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMub3B0aW9uc19bJ2xvb3AnXSkge1xyXG4gICAgdGhpcy5jdXJyZW50VGltZSgwKTtcclxuICAgIHRoaXMucGxheSgpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBkdXJhdGlvbiBvZiB0aGUgbWVkaWEgcmVzb3VyY2UgaXMgZmlyc3Qga25vd24gb3IgY2hhbmdlZFxyXG4gKiBAZXZlbnQgZHVyYXRpb25jaGFuZ2VcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRHVyYXRpb25DaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gIC8vIEFsbG93cyBmb3IgY2FjaGVpbmcgdmFsdWUgaW5zdGVhZCBvZiBhc2tpbmcgcGxheWVyIGVhY2ggdGltZS5cclxuICB0aGlzLmR1cmF0aW9uKHRoaXMudGVjaEdldCgnZHVyYXRpb24nKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgdm9sdW1lIGNoYW5nZXNcclxuICogQGV2ZW50IHZvbHVtZWNoYW5nZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Wb2x1bWVDaGFuZ2U7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgcGxheWVyIHN3aXRjaGVzIGluIG9yIG91dCBvZiBmdWxsc2NyZWVuIG1vZGVcclxuICogQGV2ZW50IGZ1bGxzY3JlZW5jaGFuZ2VcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRnVsbHNjcmVlbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xyXG4gIGlmICh0aGlzLmlzRnVsbFNjcmVlbikge1xyXG4gICAgdGhpcy5hZGRDbGFzcygndmpzLWZ1bGxzY3JlZW4nKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWZ1bGxzY3JlZW4nKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGVyZSBpcyBhbiBlcnJvciBpbiBwbGF5YmFja1xyXG4gKiBAZXZlbnQgZXJyb3JcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlKSB7XHJcbiAgdmpzLmxvZygnVmlkZW8gRXJyb3InLCBlKTtcclxufTtcclxuXHJcbi8vIC8qIFBsYXllciBBUElcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4gKiBPYmplY3QgZm9yIGNhY2hlZCB2YWx1ZXMuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jYWNoZV87XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5nZXRDYWNoZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuY2FjaGVfO1xyXG59O1xyXG5cclxuLy8gUGFzcyB2YWx1ZXMgdG8gdGhlIHBsYXliYWNrIHRlY2hcclxudmpzLlBsYXllci5wcm90b3R5cGUudGVjaENhbGwgPSBmdW5jdGlvbihtZXRob2QsIGFyZyl7XHJcbiAgLy8gSWYgaXQncyBub3QgcmVhZHkgeWV0LCBjYWxsIG1ldGhvZCB3aGVuIGl0IGlzXHJcbiAgaWYgKHRoaXMudGVjaCAmJiAhdGhpcy50ZWNoLmlzUmVhZHlfKSB7XHJcbiAgICB0aGlzLnRlY2gucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgdGhpc1ttZXRob2RdKGFyZyk7XHJcbiAgICB9KTtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlIGNhbGwgbWV0aG9kIG5vd1xyXG4gIH0gZWxzZSB7XHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLnRlY2hbbWV0aG9kXShhcmcpO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIHZqcy5sb2coZSk7XHJcbiAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gR2V0IGNhbGxzIGNhbid0IHdhaXQgZm9yIHRoZSB0ZWNoLCBhbmQgc29tZXRpbWVzIGRvbid0IG5lZWQgdG8uXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRlY2hHZXQgPSBmdW5jdGlvbihtZXRob2Qpe1xyXG5cclxuICBpZiAodGhpcy50ZWNoICYmIHRoaXMudGVjaC5pc1JlYWR5Xykge1xyXG5cclxuICAgIC8vIEZsYXNoIGxpa2VzIHRvIGRpZSBhbmQgcmVsb2FkIHdoZW4geW91IGhpZGUgb3IgcmVwb3NpdGlvbiBpdC5cclxuICAgIC8vIEluIHRoZXNlIGNhc2VzIHRoZSBvYmplY3QgbWV0aG9kcyBnbyBhd2F5IGFuZCB3ZSBnZXQgZXJyb3JzLlxyXG4gICAgLy8gV2hlbiB0aGF0IGhhcHBlbnMgd2UnbGwgY2F0Y2ggdGhlIGVycm9ycyBhbmQgaW5mb3JtIHRlY2ggdGhhdCBpdCdzIG5vdCByZWFkeSBhbnkgbW9yZS5cclxuICAgIHRyeSB7XHJcbiAgICAgIHJldHVybiB0aGlzLnRlY2hbbWV0aG9kXSgpO1xyXG4gICAgfSBjYXRjaChlKSB7XHJcbiAgICAgIC8vIFdoZW4gYnVpbGRpbmcgYWRkaXRpb25hbCB0ZWNoIGxpYnMsIGFuIGV4cGVjdGVkIG1ldGhvZCBtYXkgbm90IGJlIGRlZmluZWQgeWV0XHJcbiAgICAgIGlmICh0aGlzLnRlY2hbbWV0aG9kXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgdmpzLmxvZygnVmlkZW8uanM6ICcgKyBtZXRob2QgKyAnIG1ldGhvZCBub3QgZGVmaW5lZCBmb3IgJyt0aGlzLnRlY2hOYW1lKycgcGxheWJhY2sgdGVjaG5vbG9neS4nLCBlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBXaGVuIGEgbWV0aG9kIGlzbid0IGF2YWlsYWJsZSBvbiB0aGUgb2JqZWN0IGl0IHRocm93cyBhIFR5cGVFcnJvclxyXG4gICAgICAgIGlmIChlLm5hbWUgPT0gJ1R5cGVFcnJvcicpIHtcclxuICAgICAgICAgIHZqcy5sb2coJ1ZpZGVvLmpzOiAnICsgbWV0aG9kICsgJyB1bmF2YWlsYWJsZSBvbiAnK3RoaXMudGVjaE5hbWUrJyBwbGF5YmFjayB0ZWNobm9sb2d5IGVsZW1lbnQuJywgZSk7XHJcbiAgICAgICAgICB0aGlzLnRlY2guaXNSZWFkeV8gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdmpzLmxvZyhlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgdGhyb3cgZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybjtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBzdGFydCBtZWRpYSBwbGF5YmFja1xyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIucGxheSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRlY2hDYWxsKCdwbGF5Jyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUGF1c2UgdGhlIHZpZGVvIHBsYXliYWNrXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5wYXVzZSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50ZWNoQ2FsbCgncGF1c2UnKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGUgcGxheWVyIGlzIHBhdXNlZFxyXG4gKlxyXG4gKiAgICAgdmFyIGlzUGF1c2VkID0gbXlQbGF5ZXIucGF1c2VkKCk7XHJcbiAqICAgICB2YXIgaXNQbGF5aW5nID0gIW15UGxheWVyLnBhdXNlZCgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSBmYWxzZSBpZiB0aGUgbWVkaWEgaXMgY3VycmVudGx5IHBsYXlpbmcsIG9yIHRydWUgb3RoZXJ3aXNlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wYXVzZWQgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFRoZSBpbml0aWFsIHN0YXRlIG9mIHBhdXNlZCBzaG91bGQgYmUgdHJ1ZSAoaW4gU2FmYXJpIGl0J3MgYWN0dWFsbHkgZmFsc2UpXHJcbiAgcmV0dXJuICh0aGlzLnRlY2hHZXQoJ3BhdXNlZCcpID09PSBmYWxzZSkgPyBmYWxzZSA6IHRydWU7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IG9yIHNldCB0aGUgY3VycmVudCB0aW1lIChpbiBzZWNvbmRzKVxyXG4gKlxyXG4gKiAgICAgLy8gZ2V0XHJcbiAqICAgICB2YXIgd2hlcmVZb3VBdCA9IG15UGxheWVyLmN1cnJlbnRUaW1lKCk7XHJcbiAqXHJcbiAqICAgICAvLyBzZXRcclxuICogICAgIG15UGxheWVyLmN1cnJlbnRUaW1lKDEyMCk7IC8vIDIgbWludXRlcyBpbnRvIHRoZSB2aWRlb1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nPX0gc2Vjb25kcyBUaGUgdGltZSB0byBzZWVrIHRvXHJcbiAqIEByZXR1cm4ge051bWJlcn0gICAgICAgIFRoZSB0aW1lIGluIHNlY29uZHMsIHdoZW4gbm90IHNldHRpbmdcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gICAgc2VsZiwgd2hlbiB0aGUgY3VycmVudCB0aW1lIGlzIHNldFxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuY3VycmVudFRpbWUgPSBmdW5jdGlvbihzZWNvbmRzKXtcclxuICBpZiAoc2Vjb25kcyAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgLy8gY2FjaGUgdGhlIGxhc3Qgc2V0IHZhbHVlIGZvciBzbW9vdGhlciBzY3J1YmJpbmdcclxuICAgIHRoaXMuY2FjaGVfLmxhc3RTZXRDdXJyZW50VGltZSA9IHNlY29uZHM7XHJcblxyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0Q3VycmVudFRpbWUnLCBzZWNvbmRzKTtcclxuXHJcbiAgICAvLyBpbXByb3ZlIHRoZSBhY2N1cmFjeSBvZiBtYW51YWwgdGltZXVwZGF0ZXNcclxuICAgIGlmICh0aGlzLm1hbnVhbFRpbWVVcGRhdGVzKSB7IHRoaXMudHJpZ2dlcigndGltZXVwZGF0ZScpOyB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBjYWNoZSBsYXN0IGN1cnJlbnRUaW1lIGFuZCByZXR1cm5cclxuICAvLyBkZWZhdWx0IHRvIDAgc2Vjb25kc1xyXG4gIHJldHVybiB0aGlzLmNhY2hlXy5jdXJyZW50VGltZSA9ICh0aGlzLnRlY2hHZXQoJ2N1cnJlbnRUaW1lJykgfHwgMCk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBsZW5ndGggaW4gdGltZSBvZiB0aGUgdmlkZW8gaW4gc2Vjb25kc1xyXG4gKlxyXG4gKiAgICAgdmFyIGxlbmd0aE9mVmlkZW8gPSBteVBsYXllci5kdXJhdGlvbigpO1xyXG4gKlxyXG4gKiAqKk5PVEUqKjogVGhlIHZpZGVvIG11c3QgaGF2ZSBzdGFydGVkIGxvYWRpbmcgYmVmb3JlIHRoZSBkdXJhdGlvbiBjYW4gYmVcclxuICoga25vd24sIGFuZCBpbiB0aGUgY2FzZSBvZiBGbGFzaCwgbWF5IG5vdCBiZSBrbm93biB1bnRpbCB0aGUgdmlkZW8gc3RhcnRzXHJcbiAqIHBsYXlpbmcuXHJcbiAqXHJcbiAqIEByZXR1cm4ge051bWJlcn0gVGhlIGR1cmF0aW9uIG9mIHRoZSB2aWRlbyBpbiBzZWNvbmRzXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5kdXJhdGlvbiA9IGZ1bmN0aW9uKHNlY29uZHMpe1xyXG4gIGlmIChzZWNvbmRzICE9PSB1bmRlZmluZWQpIHtcclxuXHJcbiAgICAvLyBjYWNoZSB0aGUgbGFzdCBzZXQgdmFsdWUgZm9yIG9wdGltaWl6ZWQgc2NydWJiaW5nIChlc3AuIEZsYXNoKVxyXG4gICAgdGhpcy5jYWNoZV8uZHVyYXRpb24gPSBwYXJzZUZsb2F0KHNlY29uZHMpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgaWYgKHRoaXMuY2FjaGVfLmR1cmF0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMub25EdXJhdGlvbkNoYW5nZSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXMuY2FjaGVfLmR1cmF0aW9uO1xyXG59O1xyXG5cclxuLy8gQ2FsY3VsYXRlcyBob3cgbXVjaCB0aW1lIGlzIGxlZnQuIE5vdCBpbiBzcGVjLCBidXQgdXNlZnVsLlxyXG52anMuUGxheWVyLnByb3RvdHlwZS5yZW1haW5pbmdUaW1lID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5kdXJhdGlvbigpIC0gdGhpcy5jdXJyZW50VGltZSgpO1xyXG59O1xyXG5cclxuLy8gaHR0cDovL2Rldi53My5vcmcvaHRtbDUvc3BlYy92aWRlby5odG1sI2RvbS1tZWRpYS1idWZmZXJlZFxyXG4vLyBCdWZmZXJlZCByZXR1cm5zIGEgdGltZXJhbmdlIG9iamVjdC5cclxuLy8gS2luZCBvZiBsaWtlIGFuIGFycmF5IG9mIHBvcnRpb25zIG9mIHRoZSB2aWRlbyB0aGF0IGhhdmUgYmVlbiBkb3dubG9hZGVkLlxyXG4vLyBTbyBmYXIgbm8gYnJvd3NlcnMgcmV0dXJuIG1vcmUgdGhhbiBvbmUgcmFuZ2UgKHBvcnRpb24pXHJcblxyXG4vKipcclxuICogR2V0IGEgVGltZVJhbmdlIG9iamVjdCB3aXRoIHRoZSB0aW1lcyBvZiB0aGUgdmlkZW8gdGhhdCBoYXZlIGJlZW4gZG93bmxvYWRlZFxyXG4gKlxyXG4gKiBJZiB5b3UganVzdCB3YW50IHRoZSBwZXJjZW50IG9mIHRoZSB2aWRlbyB0aGF0J3MgYmVlbiBkb3dubG9hZGVkLFxyXG4gKiB1c2UgYnVmZmVyZWRQZXJjZW50LlxyXG4gKlxyXG4gKiAgICAgLy8gTnVtYmVyIG9mIGRpZmZlcmVudCByYW5nZXMgb2YgdGltZSBoYXZlIGJlZW4gYnVmZmVyZWQuIFVzdWFsbHkgMS5cclxuICogICAgIG51bWJlck9mUmFuZ2VzID0gYnVmZmVyZWRUaW1lUmFuZ2UubGVuZ3RoLFxyXG4gKlxyXG4gKiAgICAgLy8gVGltZSBpbiBzZWNvbmRzIHdoZW4gdGhlIGZpcnN0IHJhbmdlIHN0YXJ0cy4gVXN1YWxseSAwLlxyXG4gKiAgICAgZmlyc3RSYW5nZVN0YXJ0ID0gYnVmZmVyZWRUaW1lUmFuZ2Uuc3RhcnQoMCksXHJcbiAqXHJcbiAqICAgICAvLyBUaW1lIGluIHNlY29uZHMgd2hlbiB0aGUgZmlyc3QgcmFuZ2UgZW5kc1xyXG4gKiAgICAgZmlyc3RSYW5nZUVuZCA9IGJ1ZmZlcmVkVGltZVJhbmdlLmVuZCgwKSxcclxuICpcclxuICogICAgIC8vIExlbmd0aCBpbiBzZWNvbmRzIG9mIHRoZSBmaXJzdCB0aW1lIHJhbmdlXHJcbiAqICAgICBmaXJzdFJhbmdlTGVuZ3RoID0gZmlyc3RSYW5nZUVuZCAtIGZpcnN0UmFuZ2VTdGFydDtcclxuICpcclxuICogQHJldHVybiB7T2JqZWN0fSBBIG1vY2sgVGltZVJhbmdlIG9iamVjdCAoZm9sbG93aW5nIEhUTUwgc3BlYylcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmJ1ZmZlcmVkID0gZnVuY3Rpb24oKXtcclxuICB2YXIgYnVmZmVyZWQgPSB0aGlzLnRlY2hHZXQoJ2J1ZmZlcmVkJyksXHJcbiAgICAgIHN0YXJ0ID0gMCxcclxuICAgICAgYnVmbGFzdCA9IGJ1ZmZlcmVkLmxlbmd0aCAtIDEsXHJcbiAgICAgIC8vIERlZmF1bHQgZW5kIHRvIDAgYW5kIHN0b3JlIGluIHZhbHVlc1xyXG4gICAgICBlbmQgPSB0aGlzLmNhY2hlXy5idWZmZXJFbmQgPSB0aGlzLmNhY2hlXy5idWZmZXJFbmQgfHwgMDtcclxuXHJcbiAgaWYgKGJ1ZmZlcmVkICYmIGJ1Zmxhc3QgPj0gMCAmJiBidWZmZXJlZC5lbmQoYnVmbGFzdCkgIT09IGVuZCkge1xyXG4gICAgZW5kID0gYnVmZmVyZWQuZW5kKGJ1Zmxhc3QpO1xyXG4gICAgLy8gU3RvcmluZyB2YWx1ZXMgYWxsb3dzIHRoZW0gYmUgb3ZlcnJpZGRlbiBieSBzZXRCdWZmZXJlZEZyb21Qcm9ncmVzc1xyXG4gICAgdGhpcy5jYWNoZV8uYnVmZmVyRW5kID0gZW5kO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHZqcy5jcmVhdGVUaW1lUmFuZ2Uoc3RhcnQsIGVuZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IHRoZSBwZXJjZW50IChhcyBhIGRlY2ltYWwpIG9mIHRoZSB2aWRlbyB0aGF0J3MgYmVlbiBkb3dubG9hZGVkXHJcbiAqXHJcbiAqICAgICB2YXIgaG93TXVjaElzRG93bmxvYWRlZCA9IG15UGxheWVyLmJ1ZmZlcmVkUGVyY2VudCgpO1xyXG4gKlxyXG4gKiAwIG1lYW5zIG5vbmUsIDEgbWVhbnMgYWxsLlxyXG4gKiAoVGhpcyBtZXRob2QgaXNuJ3QgaW4gdGhlIEhUTUw1IHNwZWMsIGJ1dCBpdCdzIHZlcnkgY29udmVuaWVudClcclxuICpcclxuICogQHJldHVybiB7TnVtYmVyfSBBIGRlY2ltYWwgYmV0d2VlbiAwIGFuZCAxIHJlcHJlc2VudGluZyB0aGUgcGVyY2VudFxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuYnVmZmVyZWRQZXJjZW50ID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gKHRoaXMuZHVyYXRpb24oKSkgPyB0aGlzLmJ1ZmZlcmVkKCkuZW5kKDApIC8gdGhpcy5kdXJhdGlvbigpIDogMDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgb3Igc2V0IHRoZSBjdXJyZW50IHZvbHVtZSBvZiB0aGUgbWVkaWFcclxuICpcclxuICogICAgIC8vIGdldFxyXG4gKiAgICAgdmFyIGhvd0xvdWRJc0l0ID0gbXlQbGF5ZXIudm9sdW1lKCk7XHJcbiAqXHJcbiAqICAgICAvLyBzZXRcclxuICogICAgIG15UGxheWVyLnZvbHVtZSgwLjUpOyAvLyBTZXQgdm9sdW1lIHRvIGhhbGZcclxuICpcclxuICogMCBpcyBvZmYgKG11dGVkKSwgMS4wIGlzIGFsbCB0aGUgd2F5IHVwLCAwLjUgaXMgaGFsZiB3YXkuXHJcbiAqXHJcbiAqIEBwYXJhbSAge051bWJlcn0gcGVyY2VudEFzRGVjaW1hbCBUaGUgbmV3IHZvbHVtZSBhcyBhIGRlY2ltYWwgcGVyY2VudFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICAgICAgICAgICAgVGhlIGN1cnJlbnQgdm9sdW1lLCB3aGVuIGdldHRpbmdcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gICAgICAgICAgICAgIHNlbGYsIHdoZW4gc2V0dGluZ1xyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUudm9sdW1lID0gZnVuY3Rpb24ocGVyY2VudEFzRGVjaW1hbCl7XHJcbiAgdmFyIHZvbDtcclxuXHJcbiAgaWYgKHBlcmNlbnRBc0RlY2ltYWwgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdm9sID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgcGFyc2VGbG9hdChwZXJjZW50QXNEZWNpbWFsKSkpOyAvLyBGb3JjZSB2YWx1ZSB0byBiZXR3ZWVuIDAgYW5kIDFcclxuICAgIHRoaXMuY2FjaGVfLnZvbHVtZSA9IHZvbDtcclxuICAgIHRoaXMudGVjaENhbGwoJ3NldFZvbHVtZScsIHZvbCk7XHJcbiAgICB2anMuc2V0TG9jYWxTdG9yYWdlKCd2b2x1bWUnLCB2b2wpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvLyBEZWZhdWx0IHRvIDEgd2hlbiByZXR1cm5pbmcgY3VycmVudCB2b2x1bWUuXHJcbiAgdm9sID0gcGFyc2VGbG9hdCh0aGlzLnRlY2hHZXQoJ3ZvbHVtZScpKTtcclxuICByZXR1cm4gKGlzTmFOKHZvbCkpID8gMSA6IHZvbDtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogR2V0IHRoZSBjdXJyZW50IG11dGVkIHN0YXRlLCBvciB0dXJuIG11dGUgb24gb3Igb2ZmXHJcbiAqXHJcbiAqICAgICAvLyBnZXRcclxuICogICAgIHZhciBpc1ZvbHVtZU11dGVkID0gbXlQbGF5ZXIubXV0ZWQoKTtcclxuICpcclxuICogICAgIC8vIHNldFxyXG4gKiAgICAgbXlQbGF5ZXIubXV0ZWQodHJ1ZSk7IC8vIG11dGUgdGhlIHZvbHVtZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtCb29sZWFuPX0gbXV0ZWQgVHJ1ZSB0byBtdXRlLCBmYWxzZSB0byB1bm11dGVcclxuICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiBtdXRlIGlzIG9uLCBmYWxzZSBpZiBub3QsIHdoZW4gZ2V0dGluZ1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmLCB3aGVuIHNldHRpbmcgbXV0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUubXV0ZWQgPSBmdW5jdGlvbihtdXRlZCl7XHJcbiAgaWYgKG11dGVkICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMudGVjaENhbGwoJ3NldE11dGVkJywgbXV0ZWQpO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnRlY2hHZXQoJ211dGVkJykgfHwgZmFsc2U7IC8vIERlZmF1bHQgdG8gZmFsc2VcclxufTtcclxuXHJcbi8vIENoZWNrIGlmIGN1cnJlbnQgdGVjaCBjYW4gc3VwcG9ydCBuYXRpdmUgZnVsbHNjcmVlbiAoZS5nLiB3aXRoIGJ1aWx0IGluIGNvbnRyb2xzIGxpayBpT1MsIHNvIG5vdCBvdXIgZmxhc2ggc3dmKVxyXG52anMuUGxheWVyLnByb3RvdHlwZS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoR2V0KCdzdXBwb3J0c0Z1bGxTY3JlZW4nKSB8fCBmYWxzZTsgfTtcclxuXHJcbi8qKlxyXG4gKiBJbmNyZWFzZSB0aGUgc2l6ZSBvZiB0aGUgdmlkZW8gdG8gZnVsbCBzY3JlZW5cclxuICpcclxuICogICAgIG15UGxheWVyLnJlcXVlc3RGdWxsU2NyZWVuKCk7XHJcbiAqXHJcbiAqIEluIHNvbWUgYnJvd3NlcnMsIGZ1bGwgc2NyZWVuIGlzIG5vdCBzdXBwb3J0ZWQgbmF0aXZlbHksIHNvIGl0IGVudGVyc1xyXG4gKiBcImZ1bGwgd2luZG93IG1vZGVcIiwgd2hlcmUgdGhlIHZpZGVvIGZpbGxzIHRoZSBicm93c2VyIHdpbmRvdy5cclxuICogSW4gYnJvd3NlcnMgYW5kIGRldmljZXMgdGhhdCBzdXBwb3J0IG5hdGl2ZSBmdWxsIHNjcmVlbiwgc29tZXRpbWVzIHRoZVxyXG4gKiBicm93c2VyJ3MgZGVmYXVsdCBjb250cm9scyB3aWxsIGJlIHNob3duLCBhbmQgbm90IHRoZSBWaWRlby5qcyBjdXN0b20gc2tpbi5cclxuICogVGhpcyBpbmNsdWRlcyBtb3N0IG1vYmlsZSBkZXZpY2VzIChpT1MsIEFuZHJvaWQpIGFuZCBvbGRlciB2ZXJzaW9ucyBvZlxyXG4gKiBTYWZhcmkuXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGZcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnJlcXVlc3RGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcmVxdWVzdEZ1bGxTY3JlZW4gPSB2anMuc3VwcG9ydC5yZXF1ZXN0RnVsbFNjcmVlbjtcclxuICB0aGlzLmlzRnVsbFNjcmVlbiA9IHRydWU7XHJcblxyXG4gIGlmIChyZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgLy8gdGhlIGJyb3dzZXIgc3VwcG9ydHMgZ29pbmcgZnVsbHNjcmVlbiBhdCB0aGUgZWxlbWVudCBsZXZlbCBzbyB3ZSBjYW5cclxuICAgIC8vIHRha2UgdGhlIGNvbnRyb2xzIGZ1bGxzY3JlZW4gYXMgd2VsbCBhcyB0aGUgdmlkZW9cclxuXHJcbiAgICAvLyBUcmlnZ2VyIGZ1bGxzY3JlZW5jaGFuZ2UgZXZlbnQgYWZ0ZXIgY2hhbmdlXHJcbiAgICAvLyBXZSBoYXZlIHRvIHNwZWNpZmljYWxseSBhZGQgdGhpcyBlYWNoIHRpbWUsIGFuZCByZW1vdmVcclxuICAgIC8vIHdoZW4gY2FuY2VsbGluZyBmdWxsc2NyZWVuLiBPdGhlcndpc2UgaWYgdGhlcmUncyBtdWx0aXBsZVxyXG4gICAgLy8gcGxheWVycyBvbiBhIHBhZ2UsIHRoZXkgd291bGQgYWxsIGJlIHJlYWN0aW5nIHRvIHRoZSBzYW1lIGZ1bGxzY3JlZW5cclxuICAgIC8vIGV2ZW50c1xyXG4gICAgdmpzLm9uKGRvY3VtZW50LCByZXF1ZXN0RnVsbFNjcmVlbi5ldmVudE5hbWUsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICB0aGlzLmlzRnVsbFNjcmVlbiA9IGRvY3VtZW50W3JlcXVlc3RGdWxsU2NyZWVuLmlzRnVsbFNjcmVlbl07XHJcblxyXG4gICAgICAvLyBJZiBjYW5jZWxsaW5nIGZ1bGxzY3JlZW4sIHJlbW92ZSBldmVudCBsaXN0ZW5lci5cclxuICAgICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuID09PSBmYWxzZSkge1xyXG4gICAgICAgIHZqcy5vZmYoZG9jdW1lbnQsIHJlcXVlc3RGdWxsU2NyZWVuLmV2ZW50TmFtZSwgYXJndW1lbnRzLmNhbGxlZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMudHJpZ2dlcignZnVsbHNjcmVlbmNoYW5nZScpO1xyXG4gICAgfSkpO1xyXG5cclxuICAgIHRoaXMuZWxfW3JlcXVlc3RGdWxsU2NyZWVuLnJlcXVlc3RGbl0oKTtcclxuXHJcbiAgfSBlbHNlIGlmICh0aGlzLnRlY2guc3VwcG9ydHNGdWxsU2NyZWVuKCkpIHtcclxuICAgIC8vIHdlIGNhbid0IHRha2UgdGhlIHZpZGVvLmpzIGNvbnRyb2xzIGZ1bGxzY3JlZW4gYnV0IHdlIGNhbiBnbyBmdWxsc2NyZWVuXHJcbiAgICAvLyB3aXRoIG5hdGl2ZSBjb250cm9sc1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnZW50ZXJGdWxsU2NyZWVuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIGZ1bGxzY3JlZW4gaXNuJ3Qgc3VwcG9ydGVkIHNvIHdlJ2xsIGp1c3Qgc3RyZXRjaCB0aGUgdmlkZW8gZWxlbWVudCB0b1xyXG4gICAgLy8gZmlsbCB0aGUgdmlld3BvcnRcclxuICAgIHRoaXMuZW50ZXJGdWxsV2luZG93KCk7XHJcbiAgICB0aGlzLnRyaWdnZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgdmlkZW8gdG8gaXRzIG5vcm1hbCBzaXplIGFmdGVyIGhhdmluZyBiZWVuIGluIGZ1bGwgc2NyZWVuIG1vZGVcclxuICpcclxuICogICAgIG15UGxheWVyLmNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICpcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuY2FuY2VsRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuID0gdmpzLnN1cHBvcnQucmVxdWVzdEZ1bGxTY3JlZW47XHJcbiAgdGhpcy5pc0Z1bGxTY3JlZW4gPSBmYWxzZTtcclxuXHJcbiAgLy8gQ2hlY2sgZm9yIGJyb3dzZXIgZWxlbWVudCBmdWxsc2NyZWVuIHN1cHBvcnRcclxuICBpZiAocmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgIGRvY3VtZW50W3JlcXVlc3RGdWxsU2NyZWVuLmNhbmNlbEZuXSgpO1xyXG4gIH0gZWxzZSBpZiAodGhpcy50ZWNoLnN1cHBvcnRzRnVsbFNjcmVlbigpKSB7XHJcbiAgIHRoaXMudGVjaENhbGwoJ2V4aXRGdWxsU2NyZWVuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgdGhpcy5leGl0RnVsbFdpbmRvdygpO1xyXG4gICB0aGlzLnRyaWdnZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gV2hlbiBmdWxsc2NyZWVuIGlzbid0IHN1cHBvcnRlZCB3ZSBjYW4gc3RyZXRjaCB0aGUgdmlkZW8gY29udGFpbmVyIHRvIGFzIHdpZGUgYXMgdGhlIGJyb3dzZXIgd2lsbCBsZXQgdXMuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmVudGVyRnVsbFdpbmRvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5pc0Z1bGxXaW5kb3cgPSB0cnVlO1xyXG5cclxuICAvLyBTdG9yaW5nIG9yaWdpbmFsIGRvYyBvdmVyZmxvdyB2YWx1ZSB0byByZXR1cm4gdG8gd2hlbiBmdWxsc2NyZWVuIGlzIG9mZlxyXG4gIHRoaXMuZG9jT3JpZ092ZXJmbG93ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93O1xyXG5cclxuICAvLyBBZGQgbGlzdGVuZXIgZm9yIGVzYyBrZXkgdG8gZXhpdCBmdWxsc2NyZWVuXHJcbiAgdmpzLm9uKGRvY3VtZW50LCAna2V5ZG93bicsIHZqcy5iaW5kKHRoaXMsIHRoaXMuZnVsbFdpbmRvd09uRXNjS2V5KSk7XHJcblxyXG4gIC8vIEhpZGUgYW55IHNjcm9sbCBiYXJzXHJcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XHJcblxyXG4gIC8vIEFwcGx5IGZ1bGxzY3JlZW4gc3R5bGVzXHJcbiAgdmpzLmFkZENsYXNzKGRvY3VtZW50LmJvZHksICd2anMtZnVsbC13aW5kb3cnKTtcclxuXHJcbiAgdGhpcy50cmlnZ2VyKCdlbnRlckZ1bGxXaW5kb3cnKTtcclxufTtcclxudmpzLlBsYXllci5wcm90b3R5cGUuZnVsbFdpbmRvd09uRXNjS2V5ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGlmIChldmVudC5rZXlDb2RlID09PSAyNykge1xyXG4gICAgaWYgKHRoaXMuaXNGdWxsU2NyZWVuID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuY2FuY2VsRnVsbFNjcmVlbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5leGl0RnVsbFdpbmRvdygpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmV4aXRGdWxsV2luZG93ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmlzRnVsbFdpbmRvdyA9IGZhbHNlO1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICdrZXlkb3duJywgdGhpcy5mdWxsV2luZG93T25Fc2NLZXkpO1xyXG5cclxuICAvLyBVbmhpZGUgc2Nyb2xsIGJhcnMuXHJcbiAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLm92ZXJmbG93ID0gdGhpcy5kb2NPcmlnT3ZlcmZsb3c7XHJcblxyXG4gIC8vIFJlbW92ZSBmdWxsc2NyZWVuIHN0eWxlc1xyXG4gIHZqcy5yZW1vdmVDbGFzcyhkb2N1bWVudC5ib2R5LCAndmpzLWZ1bGwtd2luZG93Jyk7XHJcblxyXG4gIC8vIFJlc2l6ZSB0aGUgYm94LCBjb250cm9sbGVyLCBhbmQgcG9zdGVyIHRvIG9yaWdpbmFsIHNpemVzXHJcbiAgLy8gdGhpcy5wb3NpdGlvbkFsbCgpO1xyXG4gIHRoaXMudHJpZ2dlcignZXhpdEZ1bGxXaW5kb3cnKTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnNlbGVjdFNvdXJjZSA9IGZ1bmN0aW9uKHNvdXJjZXMpe1xyXG5cclxuICAvLyBMb29wIHRocm91Z2ggZWFjaCBwbGF5YmFjayB0ZWNobm9sb2d5IGluIHRoZSBvcHRpb25zIG9yZGVyXHJcbiAgZm9yICh2YXIgaT0wLGo9dGhpcy5vcHRpb25zX1sndGVjaE9yZGVyJ107aTxqLmxlbmd0aDtpKyspIHtcclxuICAgIHZhciB0ZWNoTmFtZSA9IHZqcy5jYXBpdGFsaXplKGpbaV0pLFxyXG4gICAgICAgIHRlY2ggPSB3aW5kb3dbJ3ZpZGVvanMnXVt0ZWNoTmFtZV07XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGJyb3dzZXIgc3VwcG9ydHMgdGhpcyB0ZWNobm9sb2d5XHJcbiAgICBpZiAodGVjaC5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIHNvdXJjZSBvYmplY3RcclxuICAgICAgZm9yICh2YXIgYT0wLGI9c291cmNlczthPGIubGVuZ3RoO2ErKykge1xyXG4gICAgICAgIHZhciBzb3VyY2UgPSBiW2FdO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiBzb3VyY2UgY2FuIGJlIHBsYXllZCB3aXRoIHRoaXMgdGVjaG5vbG9neVxyXG4gICAgICAgIGlmICh0ZWNoWydjYW5QbGF5U291cmNlJ10oc291cmNlKSkge1xyXG4gICAgICAgICAgcmV0dXJuIHsgc291cmNlOiBzb3VyY2UsIHRlY2g6IHRlY2hOYW1lIH07XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIHNvdXJjZSBmdW5jdGlvbiB1cGRhdGVzIHRoZSB2aWRlbyBzb3VyY2VcclxuICpcclxuICogVGhlcmUgYXJlIHRocmVlIHR5cGVzIG9mIHZhcmlhYmxlcyB5b3UgY2FuIHBhc3MgYXMgdGhlIGFyZ3VtZW50LlxyXG4gKlxyXG4gKiAqKlVSTCBTdHJpbmcqKjogQSBVUkwgdG8gdGhlIHRoZSB2aWRlbyBmaWxlLiBVc2UgdGhpcyBtZXRob2QgaWYgeW91IGFyZSBzdXJlXHJcbiAqIHRoZSBjdXJyZW50IHBsYXliYWNrIHRlY2hub2xvZ3kgKEhUTUw1L0ZsYXNoKSBjYW4gc3VwcG9ydCB0aGUgc291cmNlIHlvdVxyXG4gKiBwcm92aWRlLiBDdXJyZW50bHkgb25seSBNUDQgZmlsZXMgY2FuIGJlIHVzZWQgaW4gYm90aCBIVE1MNSBhbmQgRmxhc2guXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5zcmMoXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ubXA0XCIpO1xyXG4gKlxyXG4gKiAqKlNvdXJjZSBPYmplY3QgKG9yIGVsZW1lbnQpOioqIEEgamF2YXNjcmlwdCBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvblxyXG4gKiBhYm91dCB0aGUgc291cmNlIGZpbGUuIFVzZSB0aGlzIG1ldGhvZCBpZiB5b3Ugd2FudCB0aGUgcGxheWVyIHRvIGRldGVybWluZSBpZlxyXG4gKiBpdCBjYW4gc3VwcG9ydCB0aGUgZmlsZSB1c2luZyB0aGUgdHlwZSBpbmZvcm1hdGlvbi5cclxuICpcclxuICogICAgIG15UGxheWVyLnNyYyh7IHR5cGU6IFwidmlkZW8vbXA0XCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ubXA0XCIgfSk7XHJcbiAqXHJcbiAqICoqQXJyYXkgb2YgU291cmNlIE9iamVjdHM6KiogVG8gcHJvdmlkZSBtdWx0aXBsZSB2ZXJzaW9ucyBvZiB0aGUgc291cmNlIHNvXHJcbiAqIHRoYXQgaXQgY2FuIGJlIHBsYXllZCB1c2luZyBIVE1MNSBhY3Jvc3MgYnJvd3NlcnMgeW91IGNhbiB1c2UgYW4gYXJyYXkgb2ZcclxuICogc291cmNlIG9iamVjdHMuIFZpZGVvLmpzIHdpbGwgZGV0ZWN0IHdoaWNoIHZlcnNpb24gaXMgc3VwcG9ydGVkIGFuZCBsb2FkIHRoYXRcclxuICogZmlsZS5cclxuICpcclxuICogICAgIG15UGxheWVyLnNyYyhbXHJcbiAqICAgICAgIHsgdHlwZTogXCJ2aWRlby9tcDRcIiwgc3JjOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby5tcDRcIiB9LFxyXG4gKiAgICAgICB7IHR5cGU6IFwidmlkZW8vd2VibVwiLCBzcmM6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL3ZpZGVvLndlYm1cIiB9LFxyXG4gKiAgICAgICB7IHR5cGU6IFwidmlkZW8vb2dnXCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ub2d2XCIgfVxyXG4gKiAgICAgXSk7XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ3xPYmplY3R8QXJyYXk9fSBzb3VyY2UgVGhlIHNvdXJjZSBVUkwsIG9iamVjdCwgb3IgYXJyYXkgb2Ygc291cmNlc1xyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbihzb3VyY2Upe1xyXG4gIC8vIENhc2U6IEFycmF5IG9mIHNvdXJjZSBvYmplY3RzIHRvIGNob29zZSBmcm9tIGFuZCBwaWNrIHRoZSBiZXN0IHRvIHBsYXlcclxuICBpZiAoc291cmNlIGluc3RhbmNlb2YgQXJyYXkpIHtcclxuXHJcbiAgICB2YXIgc291cmNlVGVjaCA9IHRoaXMuc2VsZWN0U291cmNlKHNvdXJjZSksXHJcbiAgICAgICAgdGVjaE5hbWU7XHJcblxyXG4gICAgaWYgKHNvdXJjZVRlY2gpIHtcclxuICAgICAgICBzb3VyY2UgPSBzb3VyY2VUZWNoLnNvdXJjZTtcclxuICAgICAgICB0ZWNoTmFtZSA9IHNvdXJjZVRlY2gudGVjaDtcclxuXHJcbiAgICAgIC8vIElmIHRoaXMgdGVjaG5vbG9neSBpcyBhbHJlYWR5IGxvYWRlZCwgc2V0IHNvdXJjZVxyXG4gICAgICBpZiAodGVjaE5hbWUgPT0gdGhpcy50ZWNoTmFtZSkge1xyXG4gICAgICAgIHRoaXMuc3JjKHNvdXJjZSk7IC8vIFBhc3NpbmcgdGhlIHNvdXJjZSBvYmplY3RcclxuICAgICAgLy8gT3RoZXJ3aXNlIGxvYWQgdGhpcyB0ZWNobm9sb2d5IHdpdGggY2hvc2VuIHNvdXJjZVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMubG9hZFRlY2godGVjaE5hbWUsIHNvdXJjZSk7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZWxfLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgncCcsIHtcclxuICAgICAgICBpbm5lckhUTUw6IHRoaXMub3B0aW9ucygpWydub3RTdXBwb3J0ZWRNZXNzYWdlJ11cclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG5cclxuICAvLyBDYXNlOiBTb3VyY2Ugb2JqZWN0IHsgc3JjOiAnJywgdHlwZTogJycgLi4uIH1cclxuICB9IGVsc2UgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG5cclxuICAgIGlmICh3aW5kb3dbJ3ZpZGVvanMnXVt0aGlzLnRlY2hOYW1lXVsnY2FuUGxheVNvdXJjZSddKHNvdXJjZSkpIHtcclxuICAgICAgdGhpcy5zcmMoc291cmNlLnNyYyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBTZW5kIHRocm91Z2ggdGVjaCBsb29wIHRvIGNoZWNrIGZvciBhIGNvbXBhdGlibGUgdGVjaG5vbG9neS5cclxuICAgICAgdGhpcy5zcmMoW3NvdXJjZV0pO1xyXG4gICAgfVxyXG5cclxuICAvLyBDYXNlOiBVUkwgU3RyaW5nIChodHRwOi8vbXl2aWRlby4uLilcclxuICB9IGVsc2Uge1xyXG4gICAgLy8gQ2FjaGUgZm9yIGdldHRpbmcgbGFzdCBzZXQgc291cmNlXHJcbiAgICB0aGlzLmNhY2hlXy5zcmMgPSBzb3VyY2U7XHJcblxyXG4gICAgaWYgKCF0aGlzLmlzUmVhZHlfKSB7XHJcbiAgICAgIHRoaXMucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLnNyYyhzb3VyY2UpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudGVjaENhbGwoJ3NyYycsIHNvdXJjZSk7XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnNfWydwcmVsb2FkJ10gPT0gJ2F1dG8nKSB7XHJcbiAgICAgICAgdGhpcy5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMub3B0aW9uc19bJ2F1dG9wbGF5J10pIHtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIEJlZ2luIGxvYWRpbmcgdGhlIHNyYyBkYXRhXHJcbi8vIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdmlkZW8uaHRtbCNkb20tbWVkaWEtbG9hZFxyXG52anMuUGxheWVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRlY2hDYWxsKCdsb2FkJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjL3ZpZGVvLmh0bWwjZG9tLW1lZGlhLWN1cnJlbnRzcmNcclxudmpzLlBsYXllci5wcm90b3R5cGUuY3VycmVudFNyYyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMudGVjaEdldCgnY3VycmVudFNyYycpIHx8IHRoaXMuY2FjaGVfLnNyYyB8fCAnJztcclxufTtcclxuXHJcbi8vIEF0dHJpYnV0ZXMvT3B0aW9uc1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wcmVsb2FkID0gZnVuY3Rpb24odmFsdWUpe1xyXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRQcmVsb2FkJywgdmFsdWUpO1xyXG4gICAgdGhpcy5vcHRpb25zX1sncHJlbG9hZCddID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudGVjaEdldCgncHJlbG9hZCcpO1xyXG59O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5hdXRvcGxheSA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0QXV0b3BsYXknLCB2YWx1ZSk7XHJcbiAgICB0aGlzLm9wdGlvbnNfWydhdXRvcGxheSddID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudGVjaEdldCgnYXV0b3BsYXknLCB2YWx1ZSk7XHJcbn07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmxvb3AgPSBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMudGVjaENhbGwoJ3NldExvb3AnLCB2YWx1ZSk7XHJcbiAgICB0aGlzLm9wdGlvbnNfWydsb29wJ10gPSB2YWx1ZTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdsb29wJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogdGhlIHVybCBvZiB0aGUgcG9zdGVyIGltYWdlIHNvdXJjZVxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucG9zdGVyXztcclxuXHJcbi8qKlxyXG4gKiBnZXQgb3Igc2V0IHRoZSBwb3N0ZXIgaW1hZ2Ugc291cmNlIHVybFxyXG4gKlxyXG4gKiAjIyMjIyBFWEFNUExFOlxyXG4gKlxyXG4gKiAgICAgLy8gZ2V0dGluZ1xyXG4gKiAgICAgdmFyIGN1cnJlbnRQb3N0ZXIgPSBteVBsYXllci5wb3N0ZXIoKTtcclxuICpcclxuICogICAgIC8vIHNldHRpbmdcclxuICogICAgIG15UGxheWVyLnBvc3RlcignaHR0cDovL2V4YW1wbGUuY29tL215SW1hZ2UuanBnJyk7XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZz19IFtzcmNdIFBvc3RlciBpbWFnZSBzb3VyY2UgVVJMXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gcG9zdGVyIFVSTCB3aGVuIGdldHRpbmdcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZiB3aGVuIHNldHRpbmdcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnBvc3RlciA9IGZ1bmN0aW9uKHNyYyl7XHJcbiAgaWYgKHNyYyAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnBvc3Rlcl8gPSBzcmM7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMucG9zdGVyXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBXaGV0aGVyIG9yIG5vdCB0aGUgY29udHJvbHMgYXJlIHNob3dpbmdcclxuICogQHR5cGUge0Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5jb250cm9sc187XHJcblxyXG4vKipcclxuICogR2V0IG9yIHNldCB3aGV0aGVyIG9yIG5vdCB0aGUgY29udHJvbHMgYXJlIHNob3dpbmcuXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IGNvbnRyb2xzIFNldCBjb250cm9scyB0byBzaG93aW5nIG9yIG5vdFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufSAgICBDb250cm9scyBhcmUgc2hvd2luZ1xyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuY29udHJvbHMgPSBmdW5jdGlvbihib29sKXtcclxuICBpZiAoYm9vbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBib29sID0gISFib29sOyAvLyBmb3JjZSBib29sZWFuXHJcbiAgICAvLyBEb24ndCB0cmlnZ2VyIGEgY2hhbmdlIGV2ZW50IHVubGVzcyBpdCBhY3R1YWxseSBjaGFuZ2VkXHJcbiAgICBpZiAodGhpcy5jb250cm9sc18gIT09IGJvb2wpIHtcclxuICAgICAgdGhpcy5jb250cm9sc18gPSBib29sO1xyXG4gICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1jb250cm9scy1kaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1lbmFibGVkJyk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdjb250cm9sc2VuYWJsZWQnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtY29udHJvbHMtZW5hYmxlZCcpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1kaXNhYmxlZCcpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcignY29udHJvbHNkaXNhYmxlZCcpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMuY29udHJvbHNfO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUudXNpbmdOYXRpdmVDb250cm9sc187XHJcblxyXG4vKipcclxuICogVG9nZ2xlIG5hdGl2ZSBjb250cm9scyBvbi9vZmYuIE5hdGl2ZSBjb250cm9scyBhcmUgdGhlIGNvbnRyb2xzIGJ1aWx0IGludG9cclxuICogZGV2aWNlcyAoZS5nLiBkZWZhdWx0IGlQaG9uZSBjb250cm9scyksIEZsYXNoLCBvciBvdGhlciB0ZWNoc1xyXG4gKiAoZS5nLiBWaW1lbyBDb250cm9scylcclxuICpcclxuICogKipUaGlzIHNob3VsZCBvbmx5IGJlIHNldCBieSB0aGUgY3VycmVudCB0ZWNoLCBiZWNhdXNlIG9ubHkgdGhlIHRlY2gga25vd3NcclxuICogaWYgaXQgY2FuIHN1cHBvcnQgbmF0aXZlIGNvbnRyb2xzKipcclxuICpcclxuICogQHBhcmFtICB7Qm9vbGVhbn0gYm9vbCAgICBUcnVlIHNpZ25hbHMgdGhhdCBuYXRpdmUgY29udHJvbHMgYXJlIG9uXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgICAgUmV0dXJucyB0aGUgcGxheWVyXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS51c2luZ05hdGl2ZUNvbnRyb2xzID0gZnVuY3Rpb24oYm9vbCl7XHJcbiAgaWYgKGJvb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgYm9vbCA9ICEhYm9vbDsgLy8gZm9yY2UgYm9vbGVhblxyXG4gICAgLy8gRG9uJ3QgdHJpZ2dlciBhIGNoYW5nZSBldmVudCB1bmxlc3MgaXQgYWN0dWFsbHkgY2hhbmdlZFxyXG4gICAgaWYgKHRoaXMudXNpbmdOYXRpdmVDb250cm9sc18gIT09IGJvb2wpIHtcclxuICAgICAgdGhpcy51c2luZ05hdGl2ZUNvbnRyb2xzXyA9IGJvb2w7XHJcbiAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLXVzaW5nLW5hdGl2ZS1jb250cm9scycpO1xyXG5cclxuICAgICAgICAvKipcclxuICAgICAgICAgKiBwbGF5ZXIgaXMgdXNpbmcgdGhlIG5hdGl2ZSBkZXZpY2UgY29udHJvbHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBldmVudCB1c2luZ25hdGl2ZWNvbnRyb2xzXHJcbiAgICAgICAgICogQG1lbWJlcm9mIHZqcy5QbGF5ZXJcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNpbmduYXRpdmVjb250cm9scycpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy11c2luZy1uYXRpdmUtY29udHJvbHMnKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcGxheWVyIGlzIHVzaW5nIHRoZSBjdXN0b20gSFRNTCBjb250cm9sc1xyXG4gICAgICAgICAqXHJcbiAgICAgICAgICogQGV2ZW50IHVzaW5nY3VzdG9tY29udHJvbHNcclxuICAgICAgICAgKiBAbWVtYmVyb2YgdmpzLlBsYXllclxyXG4gICAgICAgICAqIEBpbnN0YW5jZVxyXG4gICAgICAgICAqIEBwcml2YXRlXHJcbiAgICAgICAgICovXHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd1c2luZ2N1c3RvbWNvbnRyb2xzJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy51c2luZ05hdGl2ZUNvbnRyb2xzXztcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaEdldCgnZXJyb3InKTsgfTtcclxudmpzLlBsYXllci5wcm90b3R5cGUuZW5kZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoR2V0KCdlbmRlZCcpOyB9O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5zZWVraW5nID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaEdldCgnc2Vla2luZycpOyB9O1xyXG5cclxuLy8gV2hlbiB0aGUgcGxheWVyIGlzIGZpcnN0IGluaXRpYWxpemVkLCB0cmlnZ2VyIGFjdGl2aXR5IHNvIGNvbXBvbmVudHNcclxuLy8gbGlrZSB0aGUgY29udHJvbCBiYXIgc2hvdyB0aGVtc2VsdmVzIGlmIG5lZWRlZFxyXG52anMuUGxheWVyLnByb3RvdHlwZS51c2VyQWN0aXZpdHlfID0gdHJ1ZTtcclxudmpzLlBsYXllci5wcm90b3R5cGUucmVwb3J0VXNlckFjdGl2aXR5ID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMudXNlckFjdGl2aXR5XyA9IHRydWU7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS51c2VyQWN0aXZlXyA9IHRydWU7XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzZXJBY3RpdmUgPSBmdW5jdGlvbihib29sKXtcclxuICBpZiAoYm9vbCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICBib29sID0gISFib29sO1xyXG4gICAgaWYgKGJvb2wgIT09IHRoaXMudXNlckFjdGl2ZV8pIHtcclxuICAgICAgdGhpcy51c2VyQWN0aXZlXyA9IGJvb2w7XHJcbiAgICAgIGlmIChib29sKSB7XHJcbiAgICAgICAgLy8gSWYgdGhlIHVzZXIgd2FzIGluYWN0aXZlIGFuZCBpcyBub3cgYWN0aXZlIHdlIHdhbnQgdG8gcmVzZXQgdGhlXHJcbiAgICAgICAgLy8gaW5hY3Rpdml0eSB0aW1lclxyXG4gICAgICAgIHRoaXMudXNlckFjdGl2aXR5XyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLXVzZXItaW5hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtdXNlci1hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzZXJhY3RpdmUnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBXZSdyZSBzd2l0Y2hpbmcgdGhlIHN0YXRlIHRvIGluYWN0aXZlIG1hbnVhbGx5LCBzbyBlcmFzZSBhbnkgb3RoZXJcclxuICAgICAgICAvLyBhY3Rpdml0eVxyXG4gICAgICAgIHRoaXMudXNlckFjdGl2aXR5XyA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBDaHJvbWUvU2FmYXJpL0lFIGhhdmUgYnVncyB3aGVyZSB3aGVuIHlvdSBjaGFuZ2UgdGhlIGN1cnNvciBpdCBjYW5cclxuICAgICAgICAvLyB0cmlnZ2VyIGEgbW91c2Vtb3ZlIGV2ZW50LiBUaGlzIGNhdXNlcyBhbiBpc3N1ZSB3aGVuIHlvdSdyZSBoaWRpbmdcclxuICAgICAgICAvLyB0aGUgY3Vyc29yIHdoZW4gdGhlIHVzZXIgaXMgaW5hY3RpdmUsIGFuZCBhIG1vdXNlbW92ZSBzaWduYWxzIHVzZXJcclxuICAgICAgICAvLyBhY3Rpdml0eS4gTWFraW5nIGl0IGltcG9zc2libGUgdG8gZ28gaW50byBpbmFjdGl2ZSBtb2RlLiBTcGVjaWZpY2FsbHlcclxuICAgICAgICAvLyB0aGlzIGhhcHBlbnMgaW4gZnVsbHNjcmVlbiB3aGVuIHdlIHJlYWxseSBuZWVkIHRvIGhpZGUgdGhlIGN1cnNvci5cclxuICAgICAgICAvL1xyXG4gICAgICAgIC8vIFdoZW4gdGhpcyBnZXRzIHJlc29sdmVkIGluIEFMTCBicm93c2VycyBpdCBjYW4gYmUgcmVtb3ZlZFxyXG4gICAgICAgIC8vIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD0xMDMwNDFcclxuICAgICAgICB0aGlzLnRlY2gub25lKCdtb3VzZW1vdmUnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLXVzZXItYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLXVzZXItaW5hY3RpdmUnKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzZXJpbmFjdGl2ZScpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudXNlckFjdGl2ZV87XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5saXN0ZW5Gb3JVc2VyQWN0aXZpdHkgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBvbk1vdXNlQWN0aXZpdHksIG9uTW91c2VEb3duLCBtb3VzZUluUHJvZ3Jlc3MsIG9uTW91c2VVcCxcclxuICAgICAgYWN0aXZpdHlDaGVjaywgaW5hY3Rpdml0eVRpbWVvdXQ7XHJcblxyXG4gIG9uTW91c2VBY3Rpdml0eSA9IHRoaXMucmVwb3J0VXNlckFjdGl2aXR5O1xyXG5cclxuICBvbk1vdXNlRG93biA9IGZ1bmN0aW9uKCkge1xyXG4gICAgb25Nb3VzZUFjdGl2aXR5KCk7XHJcbiAgICAvLyBGb3IgYXMgbG9uZyBhcyB0aGUgdGhleSBhcmUgdG91Y2hpbmcgdGhlIGRldmljZSBvciBoYXZlIHRoZWlyIG1vdXNlIGRvd24sXHJcbiAgICAvLyB3ZSBjb25zaWRlciB0aGVtIGFjdGl2ZSBldmVuIGlmIHRoZXkncmUgbm90IG1vdmluZyB0aGVpciBmaW5nZXIgb3IgbW91c2UuXHJcbiAgICAvLyBTbyB3ZSB3YW50IHRvIGNvbnRpbnVlIHRvIHVwZGF0ZSB0aGF0IHRoZXkgYXJlIGFjdGl2ZVxyXG4gICAgY2xlYXJJbnRlcnZhbChtb3VzZUluUHJvZ3Jlc3MpO1xyXG4gICAgLy8gU2V0dGluZyB1c2VyQWN0aXZpdHk9dHJ1ZSBub3cgYW5kIHNldHRpbmcgdGhlIGludGVydmFsIHRvIHRoZSBzYW1lIHRpbWVcclxuICAgIC8vIGFzIHRoZSBhY3Rpdml0eUNoZWNrIGludGVydmFsICgyNTApIHNob3VsZCBlbnN1cmUgd2UgbmV2ZXIgbWlzcyB0aGVcclxuICAgIC8vIG5leHQgYWN0aXZpdHlDaGVja1xyXG4gICAgbW91c2VJblByb2dyZXNzID0gc2V0SW50ZXJ2YWwodmpzLmJpbmQodGhpcywgb25Nb3VzZUFjdGl2aXR5KSwgMjUwKTtcclxuICB9O1xyXG5cclxuICBvbk1vdXNlVXAgPSBmdW5jdGlvbihldmVudCkge1xyXG4gICAgb25Nb3VzZUFjdGl2aXR5KCk7XHJcbiAgICAvLyBTdG9wIHRoZSBpbnRlcnZhbCB0aGF0IG1haW50YWlucyBhY3Rpdml0eSBpZiB0aGUgbW91c2UvdG91Y2ggaXMgZG93blxyXG4gICAgY2xlYXJJbnRlcnZhbChtb3VzZUluUHJvZ3Jlc3MpO1xyXG4gIH07XHJcblxyXG4gIC8vIEFueSBtb3VzZSBtb3ZlbWVudCB3aWxsIGJlIGNvbnNpZGVyZWQgdXNlciBhY3Rpdml0eVxyXG4gIHRoaXMub24oJ21vdXNlZG93bicsIG9uTW91c2VEb3duKTtcclxuICB0aGlzLm9uKCdtb3VzZW1vdmUnLCBvbk1vdXNlQWN0aXZpdHkpO1xyXG4gIHRoaXMub24oJ21vdXNldXAnLCBvbk1vdXNlVXApO1xyXG5cclxuICAvLyBMaXN0ZW4gZm9yIGtleWJvYXJkIG5hdmlnYXRpb25cclxuICAvLyBTaG91bGRuJ3QgbmVlZCB0byB1c2UgaW5Qcm9ncmVzcyBpbnRlcnZhbCBiZWNhdXNlIG9mIGtleSByZXBlYXRcclxuICB0aGlzLm9uKCdrZXlkb3duJywgb25Nb3VzZUFjdGl2aXR5KTtcclxuICB0aGlzLm9uKCdrZXl1cCcsIG9uTW91c2VBY3Rpdml0eSk7XHJcblxyXG4gIC8vIENvbnNpZGVyIGFueSB0b3VjaCBldmVudHMgdGhhdCBidWJibGUgdXAgdG8gYmUgYWN0aXZpdHlcclxuICAvLyBDZXJ0YWluIHRvdWNoZXMgb24gdGhlIHRlY2ggd2lsbCBiZSBibG9ja2VkIGZyb20gYnViYmxpbmcgYmVjYXVzZSB0aGV5XHJcbiAgLy8gdG9nZ2xlIGNvbnRyb2xzXHJcbiAgdGhpcy5vbigndG91Y2hzdGFydCcsIG9uTW91c2VEb3duKTtcclxuICB0aGlzLm9uKCd0b3VjaG1vdmUnLCBvbk1vdXNlQWN0aXZpdHkpO1xyXG4gIHRoaXMub24oJ3RvdWNoZW5kJywgb25Nb3VzZVVwKTtcclxuICB0aGlzLm9uKCd0b3VjaGNhbmNlbCcsIG9uTW91c2VVcCk7XHJcblxyXG4gIC8vIFJ1biBhbiBpbnRlcnZhbCBldmVyeSAyNTAgbWlsbGlzZWNvbmRzIGluc3RlYWQgb2Ygc3R1ZmZpbmcgZXZlcnl0aGluZyBpbnRvXHJcbiAgLy8gdGhlIG1vdXNlbW92ZS90b3VjaG1vdmUgZnVuY3Rpb24gaXRzZWxmLCB0byBwcmV2ZW50IHBlcmZvcm1hbmNlIGRlZ3JhZGF0aW9uLlxyXG4gIC8vIGB0aGlzLnJlcG9ydFVzZXJBY3Rpdml0eWAgc2ltcGx5IHNldHMgdGhpcy51c2VyQWN0aXZpdHlfIHRvIHRydWUsIHdoaWNoXHJcbiAgLy8gdGhlbiBnZXRzIHBpY2tlZCB1cCBieSB0aGlzIGxvb3BcclxuICAvLyBodHRwOi8vZWpvaG4ub3JnL2Jsb2cvbGVhcm5pbmctZnJvbS10d2l0dGVyL1xyXG4gIGFjdGl2aXR5Q2hlY2sgPSBzZXRJbnRlcnZhbCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpIHtcclxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiBtb3VzZS90b3VjaCBhY3Rpdml0eSBoYXMgaGFwcGVuZWRcclxuICAgIGlmICh0aGlzLnVzZXJBY3Rpdml0eV8pIHtcclxuICAgICAgLy8gUmVzZXQgdGhlIGFjdGl2aXR5IHRyYWNrZXJcclxuICAgICAgdGhpcy51c2VyQWN0aXZpdHlfID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgdXNlciBzdGF0ZSB3YXMgaW5hY3RpdmUsIHNldCB0aGUgc3RhdGUgdG8gYWN0aXZlXHJcbiAgICAgIHRoaXMudXNlckFjdGl2ZSh0cnVlKTtcclxuXHJcbiAgICAgIC8vIENsZWFyIGFueSBleGlzdGluZyBpbmFjdGl2aXR5IHRpbWVvdXQgdG8gc3RhcnQgdGhlIHRpbWVyIG92ZXJcclxuICAgICAgY2xlYXJUaW1lb3V0KGluYWN0aXZpdHlUaW1lb3V0KTtcclxuXHJcbiAgICAgIC8vIEluIFggc2Vjb25kcywgaWYgbm8gbW9yZSBhY3Rpdml0eSBoYXMgb2NjdXJyZWQgdGhlIHVzZXIgd2lsbCBiZVxyXG4gICAgICAvLyBjb25zaWRlcmVkIGluYWN0aXZlXHJcbiAgICAgIGluYWN0aXZpdHlUaW1lb3V0ID0gc2V0VGltZW91dCh2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAvLyBQcm90ZWN0IGFnYWluc3QgdGhlIGNhc2Ugd2hlcmUgdGhlIGluYWN0aXZpdHlUaW1lb3V0IGNhbiB0cmlnZ2VyIGp1c3RcclxuICAgICAgICAvLyBiZWZvcmUgdGhlIG5leHQgdXNlciBhY3Rpdml0eSBpcyBwaWNrZWQgdXAgYnkgdGhlIGFjdGl2aXR5Q2hlY2sgbG9vcFxyXG4gICAgICAgIC8vIGNhdXNpbmcgYSBmbGlja2VyXHJcbiAgICAgICAgaWYgKCF0aGlzLnVzZXJBY3Rpdml0eV8pIHtcclxuICAgICAgICAgIHRoaXMudXNlckFjdGl2ZShmYWxzZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KSwgMjAwMCk7XHJcbiAgICB9XHJcbiAgfSksIDI1MCk7XHJcblxyXG4gIC8vIENsZWFuIHVwIHRoZSBpbnRlcnZhbHMgd2hlbiB3ZSBraWxsIHRoZSBwbGF5ZXJcclxuICB0aGlzLm9uKCdkaXNwb3NlJywgZnVuY3Rpb24oKXtcclxuICAgIGNsZWFySW50ZXJ2YWwoYWN0aXZpdHlDaGVjayk7XHJcbiAgICBjbGVhclRpbWVvdXQoaW5hY3Rpdml0eVRpbWVvdXQpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLy8gTWV0aG9kcyB0byBhZGQgc3VwcG9ydCBmb3JcclxuLy8gbmV0d29ya1N0YXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnbmV0d29ya1N0YXRlJyk7IH0sXHJcbi8vIHJlYWR5U3RhdGU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdyZWFkeVN0YXRlJyk7IH0sXHJcbi8vIHNlZWtpbmc6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdzZWVraW5nJyk7IH0sXHJcbi8vIGluaXRpYWxUaW1lOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnaW5pdGlhbFRpbWUnKTsgfSxcclxuLy8gc3RhcnRPZmZzZXRUaW1lOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnc3RhcnRPZmZzZXRUaW1lJyk7IH0sXHJcbi8vIHBsYXllZDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3BsYXllZCcpOyB9LFxyXG4vLyBzZWVrYWJsZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3NlZWthYmxlJyk7IH0sXHJcbi8vIHZpZGVvVHJhY2tzOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgndmlkZW9UcmFja3MnKTsgfSxcclxuLy8gYXVkaW9UcmFja3M6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdhdWRpb1RyYWNrcycpOyB9LFxyXG4vLyB2aWRlb1dpZHRoOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgndmlkZW9XaWR0aCcpOyB9LFxyXG4vLyB2aWRlb0hlaWdodDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3ZpZGVvSGVpZ2h0Jyk7IH0sXHJcbi8vIGRlZmF1bHRQbGF5YmFja1JhdGU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdkZWZhdWx0UGxheWJhY2tSYXRlJyk7IH0sXHJcbi8vIHBsYXliYWNrUmF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3BsYXliYWNrUmF0ZScpOyB9LFxyXG4vLyBtZWRpYUdyb3VwOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnbWVkaWFHcm91cCcpOyB9LFxyXG4vLyBjb250cm9sbGVyOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnY29udHJvbGxlcicpOyB9LFxyXG4vLyBkZWZhdWx0TXV0ZWQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdkZWZhdWx0TXV0ZWQnKTsgfVxyXG5cclxuLy8gVE9ET1xyXG4vLyBjdXJyZW50U3JjTGlzdDogdGhlIGFycmF5IG9mIHNvdXJjZXMgaW5jbHVkaW5nIG90aGVyIGZvcm1hdHMgYW5kIGJpdHJhdGVzXHJcbi8vIHBsYXlMaXN0OiBhcnJheSBvZiBzb3VyY2UgbGlzdHMgaW4gb3JkZXIgb2YgcGxheWJhY2tcclxuXHJcbi8vIFJlcXVlc3RGdWxsc2NyZWVuIEFQSVxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgcHJlZml4LCByZXF1ZXN0RlMsIGRpdjtcclxuXHJcbiAgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gIHJlcXVlc3RGUyA9IHt9O1xyXG5cclxuICAvLyBDdXJyZW50IFczQyBTcGVjXHJcbiAgLy8gaHR0cDovL2R2Y3MudzMub3JnL2hnL2Z1bGxzY3JlZW4vcmF3LWZpbGUvdGlwL092ZXJ2aWV3Lmh0bWwjYXBpXHJcbiAgLy8gTW96aWxsYSBEcmFmdDogaHR0cHM6Ly93aWtpLm1vemlsbGEub3JnL0dlY2tvOkZ1bGxTY3JlZW5BUEkjZnVsbHNjcmVlbmNoYW5nZV9ldmVudFxyXG4gIC8vIE5ldzogaHR0cHM6Ly9kdmNzLnczLm9yZy9oZy9mdWxsc2NyZWVuL3Jhdy1maWxlLzUyOWE2N2I4ZDlmMy9PdmVydmlldy5odG1sXHJcbiAgaWYgKGRpdi5jYW5jZWxGdWxsc2NyZWVuICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHJlcXVlc3RGUy5yZXF1ZXN0Rm4gPSAncmVxdWVzdEZ1bGxzY3JlZW4nO1xyXG4gICAgcmVxdWVzdEZTLmNhbmNlbEZuID0gJ2V4aXRGdWxsc2NyZWVuJztcclxuICAgIHJlcXVlc3RGUy5ldmVudE5hbWUgPSAnZnVsbHNjcmVlbmNoYW5nZSc7XHJcbiAgICByZXF1ZXN0RlMuaXNGdWxsU2NyZWVuID0gJ2Z1bGxTY3JlZW4nO1xyXG5cclxuICAvLyBXZWJraXQgKENocm9tZS9TYWZhcmkpIGFuZCBNb3ppbGxhIChGaXJlZm94KSBoYXZlIHdvcmtpbmcgaW1wbGVtZW50YXRpb25zXHJcbiAgLy8gdGhhdCB1c2UgcHJlZml4ZXMgYW5kIHZhcnkgc2xpZ2h0bHkgZnJvbSB0aGUgbmV3IFczQyBzcGVjLiBTcGVjaWZpY2FsbHksXHJcbiAgLy8gdXNpbmcgJ2V4aXQnIGluc3RlYWQgb2YgJ2NhbmNlbCcsIGFuZCBsb3dlcmNhc2luZyB0aGUgJ1MnIGluIEZ1bGxzY3JlZW4uXHJcbiAgLy8gT3RoZXIgYnJvd3NlcnMgZG9uJ3QgaGF2ZSBhbnkgaGludHMgb2Ygd2hpY2ggdmVyc2lvbiB0aGV5IG1pZ2h0IGZvbGxvdyB5ZXQsXHJcbiAgLy8gc28gbm90IGdvaW5nIHRvIHRyeSB0byBwcmVkaWN0IGJ5IGxvb3BpbmcgdGhyb3VnaCBhbGwgcHJlZml4ZXMuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICBpZiAoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xyXG4gICAgICBwcmVmaXggPSAnbW96JztcclxuICAgICAgcmVxdWVzdEZTLmlzRnVsbFNjcmVlbiA9IHByZWZpeCArICdGdWxsU2NyZWVuJztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHByZWZpeCA9ICd3ZWJraXQnO1xyXG4gICAgICByZXF1ZXN0RlMuaXNGdWxsU2NyZWVuID0gcHJlZml4ICsgJ0lzRnVsbFNjcmVlbic7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRpdltwcmVmaXggKyAnUmVxdWVzdEZ1bGxTY3JlZW4nXSkge1xyXG4gICAgICByZXF1ZXN0RlMucmVxdWVzdEZuID0gcHJlZml4ICsgJ1JlcXVlc3RGdWxsU2NyZWVuJztcclxuICAgICAgcmVxdWVzdEZTLmNhbmNlbEZuID0gcHJlZml4ICsgJ0NhbmNlbEZ1bGxTY3JlZW4nO1xyXG4gICAgfVxyXG4gICAgcmVxdWVzdEZTLmV2ZW50TmFtZSA9IHByZWZpeCArICdmdWxsc2NyZWVuY2hhbmdlJztcclxuICB9XHJcblxyXG4gIGlmIChkb2N1bWVudFtyZXF1ZXN0RlMuY2FuY2VsRm5dKSB7XHJcbiAgICB2anMuc3VwcG9ydC5yZXF1ZXN0RnVsbFNjcmVlbiA9IHJlcXVlc3RGUztcclxuICB9XHJcblxyXG59KSgpO1xyXG5cclxuXHJcbi8qKlxyXG4gKiBDb250YWluZXIgb2YgbWFpbiBjb250cm9sc1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGV4dGVuZHMgdmpzLkNvbXBvbmVudFxyXG4gKi9cclxudmpzLkNvbnRyb2xCYXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCgpO1xyXG5cclxudmpzLkNvbnRyb2xCYXIucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gIGxvYWRFdmVudDogJ3BsYXknLFxyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICAncGxheVRvZ2dsZSc6IHt9LFxyXG4gICAgJ2N1cnJlbnRUaW1lRGlzcGxheSc6IHt9LFxyXG4gICAgJ3RpbWVEaXZpZGVyJzoge30sXHJcbiAgICAnZHVyYXRpb25EaXNwbGF5Jzoge30sXHJcbiAgICAncmVtYWluaW5nVGltZURpc3BsYXknOiB7fSxcclxuICAgICdwcm9ncmVzc0NvbnRyb2wnOiB7fSxcclxuICAgICdmdWxsc2NyZWVuVG9nZ2xlJzoge30sXHJcbiAgICAndm9sdW1lQ29udHJvbCc6IHt9LFxyXG4gICAgJ211dGVUb2dnbGUnOiB7fVxyXG4gICAgLy8gJ3ZvbHVtZU1lbnVCdXR0b24nOiB7fVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5Db250cm9sQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWNvbnRyb2wtYmFyJ1xyXG4gIH0pO1xyXG59O1xyXG4vKipcclxuICogQnV0dG9uIHRvIHRvZ2dsZSBiZXR3ZWVuIHBsYXkgYW5kIHBhdXNlXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlBsYXlUb2dnbGUgPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3BsYXknLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uUGxheSkpO1xyXG4gICAgcGxheWVyLm9uKCdwYXVzZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25QYXVzZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdQbGF5JztcclxuXHJcbnZqcy5QbGF5VG9nZ2xlLnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gJ3Zqcy1wbGF5LWNvbnRyb2wgJyArIHZqcy5CdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8vIE9uQ2xpY2sgLSBUb2dnbGUgYmV0d2VlbiBwbGF5IGFuZCBwYXVzZVxyXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMucGxheWVyXy5wYXVzZWQoKSkge1xyXG4gICAgdGhpcy5wbGF5ZXJfLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5wbGF5ZXJfLnBhdXNlKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuICAvLyBPblBsYXkgLSBBZGQgdGhlIHZqcy1wbGF5aW5nIGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxyXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUub25QbGF5ID0gZnVuY3Rpb24oKXtcclxuICB2anMucmVtb3ZlQ2xhc3ModGhpcy5lbF8sICd2anMtcGF1c2VkJyk7XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXBsYXlpbmcnKTtcclxuICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnUGF1c2UnOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiUGF1c2VcIlxyXG59O1xyXG5cclxuICAvLyBPblBhdXNlIC0gQWRkIHRoZSB2anMtcGF1c2VkIGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxyXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUub25QYXVzZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXBsYXlpbmcnKTtcclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGF1c2VkJyk7XHJcbiAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ1BsYXknOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiUGxheVwiXHJcbn07XHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUgY3VycmVudCB0aW1lXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ3VycmVudFRpbWVEaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVDb250ZW50KSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5DdXJyZW50VGltZURpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtY3VycmVudC10aW1lIHZqcy10aW1lLWNvbnRyb2xzIHZqcy1jb250cm9sJ1xyXG4gIH0pO1xyXG5cclxuICB0aGlzLmNvbnRlbnQgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1jdXJyZW50LXRpbWUtZGlzcGxheScsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5DdXJyZW50IFRpbWUgPC9zcGFuPicgKyAnMDowMCcsIC8vIGxhYmVsIHRoZSBjdXJyZW50IHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcclxuICAgICdhcmlhLWxpdmUnOiAnb2ZmJyAvLyB0ZWxsIHNjcmVlbiByZWFkZXJzIG5vdCB0byBhdXRvbWF0aWNhbGx5IHJlYWQgdGhlIHRpbWUgYXMgaXQgY2hhbmdlc1xyXG4gIH0pO1xyXG5cclxuICBlbC5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2RpdicpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCkpO1xyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbnZqcy5DdXJyZW50VGltZURpc3BsYXkucHJvdG90eXBlLnVwZGF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpe1xyXG4gIC8vIEFsbG93cyBmb3Igc21vb3RoIHNjcnViYmluZywgd2hlbiBwbGF5ZXIgY2FuJ3Qga2VlcCB1cC5cclxuICB2YXIgdGltZSA9ICh0aGlzLnBsYXllcl8uc2NydWJiaW5nKSA/IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpLmN1cnJlbnRUaW1lIDogdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcbiAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5DdXJyZW50IFRpbWUgPC9zcGFuPicgKyB2anMuZm9ybWF0VGltZSh0aW1lLCB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIGR1cmF0aW9uXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuRHVyYXRpb25EaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVDb250ZW50KSk7IC8vIHRoaXMgbWlnaHQgbmVlZCB0byBiZSBjaGFuZ2VzIHRvICdkdXJhdGlvbmNoYW5nZScgaW5zdGVhZCBvZiAndGltZXVwZGF0ZScgZXZlbnR1YWxseSwgaG93ZXZlciB0aGUgZHVyYXRpb25jaGFuZ2UgZXZlbnQgZmlyZXMgYmVmb3JlIHRoaXMucGxheWVyXy5kdXJhdGlvbigpIGlzIHNldCwgc28gdGhlIHZhbHVlIGNhbm5vdCBiZSB3cml0dGVuIG91dCB1c2luZyB0aGlzIG1ldGhvZC4gT25jZSB0aGUgb3JkZXIgb2YgZHVyYXRpb25jaGFuZ2UgYW5kIHRoaXMucGxheWVyXy5kdXJhdGlvbigpIGJlaW5nIHNldCBpcyBmaWd1cmVkIG91dCwgdGhpcyBjYW4gYmUgdXBkYXRlZC5cclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkR1cmF0aW9uRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBlbCA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1kdXJhdGlvbiB2anMtdGltZS1jb250cm9scyB2anMtY29udHJvbCdcclxuICB9KTtcclxuXHJcbiAgdGhpcy5jb250ZW50ID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtZHVyYXRpb24tZGlzcGxheScsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5EdXJhdGlvbiBUaW1lIDwvc3Bhbj4nICsgJzA6MDAnLCAvLyBsYWJlbCB0aGUgZHVyYXRpb24gdGltZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vyc1xyXG4gICAgJ2FyaWEtbGl2ZSc6ICdvZmYnIC8vIHRlbGwgc2NyZWVuIHJlYWRlcnMgbm90IHRvIGF1dG9tYXRpY2FsbHkgcmVhZCB0aGUgdGltZSBhcyBpdCBjaGFuZ2VzXHJcbiAgfSk7XHJcblxyXG4gIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnZGl2JykuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KSk7XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxudmpzLkR1cmF0aW9uRGlzcGxheS5wcm90b3R5cGUudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGR1cmF0aW9uID0gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XHJcbiAgaWYgKGR1cmF0aW9uKSB7XHJcbiAgICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+RHVyYXRpb24gVGltZSA8L3NwYW4+JyArIHZqcy5mb3JtYXRUaW1lKGR1cmF0aW9uKTsgLy8gbGFiZWwgdGhlIGR1cmF0aW9uIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIHNlcGFyYXRvciBiZXR3ZWVuIHRoZSBjdXJyZW50IHRpbWUgYW5kIGR1cmF0aW9uXHJcbiAqXHJcbiAqIENhbiBiZSBoaWRkZW4gaWYgaXQncyBub3QgbmVlZGVkIGluIHRoZSBkZXNpZ24uXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVGltZURpdmlkZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlRpbWVEaXZpZGVyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy10aW1lLWRpdmlkZXInLFxyXG4gICAgaW5uZXJIVE1MOiAnPGRpdj48c3Bhbj4vPC9zcGFuPjwvZGl2PidcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwbGF5cyB0aGUgdGltZSBsZWZ0IGluIHRoZSB2aWRlb1xyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlJlbWFpbmluZ1RpbWVEaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVDb250ZW50KSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5SZW1haW5pbmdUaW1lRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBlbCA9IHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1yZW1haW5pbmctdGltZSB2anMtdGltZS1jb250cm9scyB2anMtY29udHJvbCdcclxuICB9KTtcclxuXHJcbiAgdGhpcy5jb250ZW50ID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtcmVtYWluaW5nLXRpbWUtZGlzcGxheScsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5SZW1haW5pbmcgVGltZSA8L3NwYW4+JyArICctMDowMCcsIC8vIGxhYmVsIHRoZSByZW1haW5pbmcgdGltZSBmb3Igc2NyZWVuIHJlYWRlciB1c2Vyc1xyXG4gICAgJ2FyaWEtbGl2ZSc6ICdvZmYnIC8vIHRlbGwgc2NyZWVuIHJlYWRlcnMgbm90IHRvIGF1dG9tYXRpY2FsbHkgcmVhZCB0aGUgdGltZSBhcyBpdCBjaGFuZ2VzXHJcbiAgfSk7XHJcblxyXG4gIGVsLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnZGl2JykuYXBwZW5kQ2hpbGQodGhpcy5jb250ZW50KSk7XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxudmpzLlJlbWFpbmluZ1RpbWVEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVDb250ZW50ID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkpIHtcclxuICAgIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+UmVtYWluaW5nIFRpbWUgPC9zcGFuPicgKyAnLScrIHZqcy5mb3JtYXRUaW1lKHRoaXMucGxheWVyXy5yZW1haW5pbmdUaW1lKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gQWxsb3dzIGZvciBzbW9vdGggc2NydWJiaW5nLCB3aGVuIHBsYXllciBjYW4ndCBrZWVwIHVwLlxyXG4gIC8vIHZhciB0aW1lID0gKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuICAvLyB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdmpzLmZvcm1hdFRpbWUodGltZSwgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkpO1xyXG59O1xyXG4vKipcclxuICogVG9nZ2xlIGZ1bGxzY3JlZW4gdmlkZW9cclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGV4dGVuZHMgdmpzLkJ1dHRvblxyXG4gKi9cclxudmpzLkZ1bGxzY3JlZW5Ub2dnbGUgPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqXHJcbiAgICogQGNvbnN0cnVjdG9yXHJcbiAgICogQG1lbWJlcm9mIHZqcy5GdWxsc2NyZWVuVG9nZ2xlXHJcbiAgICogQGluc3RhbmNlXHJcbiAgICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuRnVsbHNjcmVlblRvZ2dsZS5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdGdWxsc2NyZWVuJztcclxuXHJcbnZqcy5GdWxsc2NyZWVuVG9nZ2xlLnByb3RvdHlwZS5idWlsZENTU0NsYXNzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gJ3Zqcy1mdWxsc2NyZWVuLWNvbnRyb2wgJyArIHZqcy5CdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbnZqcy5GdWxsc2NyZWVuVG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICBpZiAoIXRoaXMucGxheWVyXy5pc0Z1bGxTY3JlZW4pIHtcclxuICAgIHRoaXMucGxheWVyXy5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ05vbi1GdWxsc2NyZWVuJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIk5vbi1GdWxsc2NyZWVuXCJcclxuICB9IGVsc2Uge1xyXG4gICAgdGhpcy5wbGF5ZXJfLmNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdGdWxsc2NyZWVuJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdG8gXCJGdWxsc2NyZWVuXCJcclxuICB9XHJcbn07XHJcbi8qKlxyXG4gKiBUaGUgUHJvZ3Jlc3MgQ29udHJvbCBjb21wb25lbnQgY29udGFpbnMgdGhlIHNlZWsgYmFyLCBsb2FkIHByb2dyZXNzLFxyXG4gKiBhbmQgcGxheSBwcm9ncmVzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlByb2dyZXNzQ29udHJvbCA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuUHJvZ3Jlc3NDb250cm9sLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICBjaGlsZHJlbjoge1xyXG4gICAgJ3NlZWtCYXInOiB7fVxyXG4gIH1cclxufTtcclxuXHJcbnZqcy5Qcm9ncmVzc0NvbnRyb2wucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXByb2dyZXNzLWNvbnRyb2wgdmpzLWNvbnRyb2wnXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2VlayBCYXIgYW5kIGhvbGRlciBmb3IgdGhlIHByb2dyZXNzIGJhcnNcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TZWVrQmFyID0gdmpzLlNsaWRlci5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLlNsaWRlci5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICBwbGF5ZXIub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzKSk7XHJcbiAgICBwbGF5ZXIucmVhZHkodmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAgY2hpbGRyZW46IHtcclxuICAgICdsb2FkUHJvZ3Jlc3NCYXInOiB7fSxcclxuICAgICdwbGF5UHJvZ3Jlc3NCYXInOiB7fSxcclxuICAgICdzZWVrSGFuZGxlJzoge31cclxuICB9LFxyXG4gICdiYXJOYW1lJzogJ3BsYXlQcm9ncmVzc0JhcicsXHJcbiAgJ2hhbmRsZU5hbWUnOiAnc2Vla0hhbmRsZSdcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5wbGF5ZXJFdmVudCA9ICd0aW1ldXBkYXRlJztcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5TbGlkZXIucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1wcm9ncmVzcy1ob2xkZXInLFxyXG4gICAgJ2FyaWEtbGFiZWwnOiAndmlkZW8gcHJvZ3Jlc3MgYmFyJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzID0gZnVuY3Rpb24oKXtcclxuICAgIC8vIEFsbG93cyBmb3Igc21vb3RoIHNjcnViYmluZywgd2hlbiBwbGF5ZXIgY2FuJ3Qga2VlcCB1cC5cclxuICAgIHZhciB0aW1lID0gKHRoaXMucGxheWVyXy5zY3J1YmJpbmcpID8gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCkuY3VycmVudFRpbWUgOiB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsdmpzLnJvdW5kKHRoaXMuZ2V0UGVyY2VudCgpKjEwMCwgMikpOyAvLyBtYWNoaW5lIHJlYWRhYmxlIHZhbHVlIG9mIHByb2dyZXNzIGJhciAocGVyY2VudGFnZSBjb21wbGV0ZSlcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLHZqcy5mb3JtYXRUaW1lKHRpbWUsIHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSk7IC8vIGh1bWFuIHJlYWRhYmxlIHZhbHVlIG9mIHByb2dyZXNzIGJhciAodGltZSBjb21wbGV0ZSlcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5nZXRQZXJjZW50ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgY3VycmVudFRpbWU7XHJcbiAgLy8gRmxhc2ggUlRNUCBwcm92aWRlciB3aWxsIG5vdCByZXBvcnQgdGhlIGNvcnJlY3QgdGltZVxyXG4gIC8vIGltbWVkaWF0ZWx5IGFmdGVyIGEgc2Vlay4gVGhpcyBpc24ndCBub3RpY2VhYmxlIGlmIHlvdSdyZVxyXG4gIC8vIHNlZWtpbmcgd2hpbGUgdGhlIHZpZGVvIGlzIHBsYXlpbmcsIGJ1dCBpdCBpcyBpZiB5b3Ugc2Vla1xyXG4gIC8vIHdoaWxlIHRoZSB2aWRlbyBpcyBwYXVzZWQuXHJcbiAgaWYgKHRoaXMucGxheWVyXy50ZWNoTmFtZSA9PT0gJ0ZsYXNoJyAmJiB0aGlzLnBsYXllcl8uc2Vla2luZygpKSB7XHJcbiAgICB2YXIgY2FjaGUgPSB0aGlzLnBsYXllcl8uZ2V0Q2FjaGUoKTtcclxuICAgIGlmIChjYWNoZS5sYXN0U2V0Q3VycmVudFRpbWUpIHtcclxuICAgICAgY3VycmVudFRpbWUgPSBjYWNoZS5sYXN0U2V0Q3VycmVudFRpbWU7XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuICAgIH1cclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICBjdXJyZW50VGltZSA9IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGN1cnJlbnRUaW1lIC8gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUub25Nb3VzZURvd24gPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdmpzLlNsaWRlci5wcm90b3R5cGUub25Nb3VzZURvd24uY2FsbCh0aGlzLCBldmVudCk7XHJcblxyXG4gIHRoaXMucGxheWVyXy5zY3J1YmJpbmcgPSB0cnVlO1xyXG5cclxuICB0aGlzLnZpZGVvV2FzUGxheWluZyA9ICF0aGlzLnBsYXllcl8ucGF1c2VkKCk7XHJcbiAgdGhpcy5wbGF5ZXJfLnBhdXNlKCk7XHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdmFyIG5ld1RpbWUgPSB0aGlzLmNhbGN1bGF0ZURpc3RhbmNlKGV2ZW50KSAqIHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xyXG5cclxuICAvLyBEb24ndCBsZXQgdmlkZW8gZW5kIHdoaWxlIHNjcnViYmluZy5cclxuICBpZiAobmV3VGltZSA9PSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSkgeyBuZXdUaW1lID0gbmV3VGltZSAtIDAuMTsgfVxyXG5cclxuICAvLyBTZXQgbmV3IHRpbWUgKHRlbGwgcGxheWVyIHRvIHNlZWsgdG8gbmV3IHRpbWUpXHJcbiAgdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKG5ld1RpbWUpO1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9uTW91c2VVcCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB2anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlVXAuY2FsbCh0aGlzLCBldmVudCk7XHJcblxyXG4gIHRoaXMucGxheWVyXy5zY3J1YmJpbmcgPSBmYWxzZTtcclxuICBpZiAodGhpcy52aWRlb1dhc1BsYXlpbmcpIHtcclxuICAgIHRoaXMucGxheWVyXy5wbGF5KCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLnN0ZXBGb3J3YXJkID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUodGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCkgKyA1KTsgLy8gbW9yZSBxdWlja2x5IGZhc3QgZm9yd2FyZCBmb3Iga2V5Ym9hcmQtb25seSB1c2Vyc1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLnN0ZXBCYWNrID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUodGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCkgLSA1KTsgLy8gbW9yZSBxdWlja2x5IHJld2luZCBmb3Iga2V5Ym9hcmQtb25seSB1c2Vyc1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBTaG93cyBsb2FkIHByb2dyZXNzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTG9hZFByb2dyZXNzQmFyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICBwbGF5ZXIub24oJ3Byb2dyZXNzJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkxvYWRQcm9ncmVzc0Jhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbG9hZC1wcm9ncmVzcycsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5Mb2FkZWQ6IDAlPC9zcGFuPidcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5Mb2FkUHJvZ3Jlc3NCYXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMuZWxfLnN0eWxlKSB7IHRoaXMuZWxfLnN0eWxlLndpZHRoID0gdmpzLnJvdW5kKHRoaXMucGxheWVyXy5idWZmZXJlZFBlcmNlbnQoKSAqIDEwMCwgMikgKyAnJSc7IH1cclxufTtcclxuXHJcblxyXG4vKipcclxuICogU2hvd3MgcGxheSBwcm9ncmVzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlBsYXlQcm9ncmVzc0JhciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuUGxheVByb2dyZXNzQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1wbGF5LXByb2dyZXNzJyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPlByb2dyZXNzOiAwJTwvc3Bhbj4nXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIFNlZWsgSGFuZGxlIHNob3dzIHRoZSBjdXJyZW50IHBvc2l0aW9uIG9mIHRoZSBwbGF5aGVhZCBkdXJpbmcgcGxheWJhY2ssXHJcbiAqIGFuZCBjYW4gYmUgZHJhZ2dlZCB0byBhZGp1c3QgdGhlIHBsYXloZWFkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlNlZWtIYW5kbGUgPSB2anMuU2xpZGVySGFuZGxlLmV4dGVuZCgpO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgaGFuZGxlIGNvbnRlbnQsIHdoaWNoIG1heSBiZSByZWFkIGJ5IHNjcmVlbiByZWFkZXJzXHJcbiAqXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuU2Vla0hhbmRsZS5wcm90b3R5cGUuZGVmYXVsdFZhbHVlID0gJzAwOjAwJztcclxuXHJcbi8qKiBAaW5oZXJpdERvYyAqL1xyXG52anMuU2Vla0hhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuU2xpZGVySGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtc2Vlay1oYW5kbGUnXHJcbiAgfSk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGUgY29tcG9uZW50IGZvciBjb250cm9sbGluZyB0aGUgdm9sdW1lIGxldmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVm9sdW1lQ29udHJvbCA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIGhpZGUgdm9sdW1lIGNvbnRyb2xzIHdoZW4gdGhleSdyZSBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IHRlY2hcclxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmIChwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlc1sndm9sdW1lQ29udHJvbCddID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlZvbHVtZUNvbnRyb2wucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICAndm9sdW1lQmFyJzoge31cclxuICB9XHJcbn07XHJcblxyXG52anMuVm9sdW1lQ29udHJvbC5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLWNvbnRyb2wgdmpzLWNvbnRyb2wnXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGJhciB0aGF0IGNvbnRhaW5zIHRoZSB2b2x1bWUgbGV2ZWwgYW5kIGNhbiBiZSBjbGlja2VkIG9uIHRvIGFkanVzdCB0aGUgbGV2ZWxcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Wb2x1bWVCYXIgPSB2anMuU2xpZGVyLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuU2xpZGVyLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICAgIHBsYXllci5vbigndm9sdW1lY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xyXG4gICAgcGxheWVyLnJlYWR5KHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQVJJQUF0dHJpYnV0ZXMpKTtcclxuICAgIHNldFRpbWVvdXQodmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpLCAwKTsgLy8gdXBkYXRlIHdoZW4gZWxlbWVudHMgaXMgaW4gRE9NXHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzID0gZnVuY3Rpb24oKXtcclxuICAvLyBDdXJyZW50IHZhbHVlIG9mIHZvbHVtZSBiYXIgYXMgYSBwZXJjZW50YWdlXHJcbiAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXZhbHVlbm93Jyx2anMucm91bmQodGhpcy5wbGF5ZXJfLnZvbHVtZSgpKjEwMCwgMikpO1xyXG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZXRleHQnLHZqcy5yb3VuZCh0aGlzLnBsYXllcl8udm9sdW1lKCkqMTAwLCAyKSsnJScpO1xyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAgY2hpbGRyZW46IHtcclxuICAgICd2b2x1bWVMZXZlbCc6IHt9LFxyXG4gICAgJ3ZvbHVtZUhhbmRsZSc6IHt9XHJcbiAgfSxcclxuICAnYmFyTmFtZSc6ICd2b2x1bWVMZXZlbCcsXHJcbiAgJ2hhbmRsZU5hbWUnOiAndm9sdW1lSGFuZGxlJ1xyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUucGxheWVyRXZlbnQgPSAndm9sdW1lY2hhbmdlJztcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLlNsaWRlci5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXZvbHVtZS1iYXInLFxyXG4gICAgJ2FyaWEtbGFiZWwnOiAndm9sdW1lIGxldmVsJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUub25Nb3VzZU1vdmUgPSBmdW5jdGlvbihldmVudCkge1xyXG4gIGlmICh0aGlzLnBsYXllcl8ubXV0ZWQoKSkge1xyXG4gICAgdGhpcy5wbGF5ZXJfLm11dGVkKGZhbHNlKTtcclxuICB9XHJcblxyXG4gIHRoaXMucGxheWVyXy52b2x1bWUodGhpcy5jYWxjdWxhdGVEaXN0YW5jZShldmVudCkpO1xyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuZ2V0UGVyY2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMucGxheWVyXy5tdXRlZCgpKSB7XHJcbiAgICByZXR1cm4gMDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIHRoaXMucGxheWVyXy52b2x1bWUoKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5zdGVwRm9yd2FyZCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLnZvbHVtZSh0aGlzLnBsYXllcl8udm9sdW1lKCkgKyAwLjEpO1xyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuc3RlcEJhY2sgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy52b2x1bWUodGhpcy5wbGF5ZXJfLnZvbHVtZSgpIC0gMC4xKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaG93cyB2b2x1bWUgbGV2ZWxcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Wb2x1bWVMZXZlbCA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuVm9sdW1lTGV2ZWwucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXZvbHVtZS1sZXZlbCcsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj48L3NwYW4+J1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSB2b2x1bWUgaGFuZGxlIGNhbiBiZSBkcmFnZ2VkIHRvIGFkanVzdCB0aGUgdm9sdW1lIGxldmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG4gdmpzLlZvbHVtZUhhbmRsZSA9IHZqcy5TbGlkZXJIYW5kbGUuZXh0ZW5kKCk7XHJcblxyXG4gdmpzLlZvbHVtZUhhbmRsZS5wcm90b3R5cGUuZGVmYXVsdFZhbHVlID0gJzAwOjAwJztcclxuXHJcbiAvKiogQGluaGVyaXREb2MgKi9cclxuIHZqcy5Wb2x1bWVIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICAgcmV0dXJuIHZqcy5TbGlkZXJIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgICBjbGFzc05hbWU6ICd2anMtdm9sdW1lLWhhbmRsZSdcclxuICAgfSk7XHJcbiB9O1xyXG4vKipcclxuICogQSBidXR0b24gY29tcG9uZW50IGZvciBtdXRpbmcgdGhlIGF1ZGlvXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTXV0ZVRvZ2dsZSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbigndm9sdW1lY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICAvLyBoaWRlIG11dGUgdG9nZ2xlIGlmIHRoZSBjdXJyZW50IHRlY2ggZG9lc24ndCBzdXBwb3J0IHZvbHVtZSBjb250cm9sXHJcbiAgICBpZiAocGxheWVyLnRlY2ggJiYgcGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgfVxyXG4gICAgcGxheWVyLm9uKCdsb2Fkc3RhcnQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1tdXRlLWNvbnRyb2wgdmpzLWNvbnRyb2wnLFxyXG4gICAgaW5uZXJIVE1MOiAnPGRpdj48c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5NdXRlPC9zcGFuPjwvZGl2PidcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8ubXV0ZWQoIHRoaXMucGxheWVyXy5tdXRlZCgpID8gZmFsc2UgOiB0cnVlICk7XHJcbn07XHJcblxyXG52anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdm9sID0gdGhpcy5wbGF5ZXJfLnZvbHVtZSgpLFxyXG4gICAgICBsZXZlbCA9IDM7XHJcblxyXG4gIGlmICh2b2wgPT09IDAgfHwgdGhpcy5wbGF5ZXJfLm11dGVkKCkpIHtcclxuICAgIGxldmVsID0gMDtcclxuICB9IGVsc2UgaWYgKHZvbCA8IDAuMzMpIHtcclxuICAgIGxldmVsID0gMTtcclxuICB9IGVsc2UgaWYgKHZvbCA8IDAuNjcpIHtcclxuICAgIGxldmVsID0gMjtcclxuICB9XHJcblxyXG4gIC8vIERvbid0IHJld3JpdGUgdGhlIGJ1dHRvbiB0ZXh0IGlmIHRoZSBhY3R1YWwgdGV4dCBkb2Vzbid0IGNoYW5nZS5cclxuICAvLyBUaGlzIGNhdXNlcyB1bm5lY2Vzc2FyeSBhbmQgY29uZnVzaW5nIGluZm9ybWF0aW9uIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzLlxyXG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIGJlY2F1c2UgdGhpcyBmdW5jdGlvbiBnZXRzIGNhbGxlZCBldmVyeSB0aW1lIHRoZSB2b2x1bWUgbGV2ZWwgaXMgY2hhbmdlZC5cclxuICBpZih0aGlzLnBsYXllcl8ubXV0ZWQoKSl7XHJcbiAgICAgIGlmKHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCE9J1VubXV0ZScpe1xyXG4gICAgICAgICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ1VubXV0ZSc7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJVbm11dGVcIlxyXG4gICAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgICAgaWYodGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MIT0nTXV0ZScpe1xyXG4gICAgICAgICAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ011dGUnOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiTXV0ZVwiXHJcbiAgICAgIH1cclxuICB9XHJcblxyXG4gIC8qIFRPRE8gaW1wcm92ZSBtdXRlZCBpY29uIGNsYXNzZXMgKi9cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xyXG4gICAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXZvbC0nK2kpO1xyXG4gIH1cclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtdm9sLScrbGV2ZWwpO1xyXG59O1xyXG4vKipcclxuICogTWVudSBidXR0b24gd2l0aCBhIHBvcHVwIGZvciBzaG93aW5nIHRoZSB2b2x1bWUgc2xpZGVyLlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Wb2x1bWVNZW51QnV0dG9uID0gdmpzLk1lbnVCdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5NZW51QnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBTYW1lIGxpc3RlbmVycyBhcyBNdXRlVG9nZ2xlXHJcbiAgICBwbGF5ZXIub24oJ3ZvbHVtZWNoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgLy8gaGlkZSBtdXRlIHRvZ2dsZSBpZiB0aGUgY3VycmVudCB0ZWNoIGRvZXNuJ3Qgc3VwcG9ydCB2b2x1bWUgY29udHJvbFxyXG4gICAgaWYgKHBsYXllci50ZWNoICYmIHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzLnZvbHVtZUNvbnRyb2wgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgIH1cclxuICAgIHBsYXllci5vbignbG9hZHN0YXJ0JywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzLnZvbHVtZUNvbnRyb2wgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gICAgdGhpcy5hZGRDbGFzcygndmpzLW1lbnUtYnV0dG9uJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Wb2x1bWVNZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgbWVudSA9IG5ldyB2anMuTWVudSh0aGlzLnBsYXllcl8sIHtcclxuICAgIGNvbnRlbnRFbFR5cGU6ICdkaXYnXHJcbiAgfSk7XHJcbiAgdmFyIHZjID0gbmV3IHZqcy5Wb2x1bWVCYXIodGhpcy5wbGF5ZXJfLCB2anMub2JqLm1lcmdlKHt2ZXJ0aWNhbDogdHJ1ZX0sIHRoaXMub3B0aW9uc18udm9sdW1lQmFyKSk7XHJcbiAgbWVudS5hZGRDaGlsZCh2Yyk7XHJcbiAgcmV0dXJuIG1lbnU7XHJcbn07XHJcblxyXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLk11dGVUb2dnbGUucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcclxuICB2anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxudmpzLlZvbHVtZU1lbnVCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXZvbHVtZS1tZW51LWJ1dHRvbiB2anMtbWVudS1idXR0b24gdmpzLWNvbnRyb2wnLFxyXG4gICAgaW5uZXJIVE1MOiAnPGRpdj48c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5NdXRlPC9zcGFuPjwvZGl2PidcclxuICB9KTtcclxufTtcclxudmpzLlZvbHVtZU1lbnVCdXR0b24ucHJvdG90eXBlLnVwZGF0ZSA9IHZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS51cGRhdGU7XHJcbi8qIFBvc3RlciBJbWFnZVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogVGhlIGNvbXBvbmVudCB0aGF0IGhhbmRsZXMgc2hvd2luZyB0aGUgcG9zdGVyIGltYWdlLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlBvc3RlckltYWdlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgaWYgKCFwbGF5ZXIucG9zdGVyKCkgfHwgIXBsYXllci5jb250cm9scygpKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXllci5vbigncGxheScsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuUG9zdGVySW1hZ2UucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZWwgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgICAgICBjbGFzc05hbWU6ICd2anMtcG9zdGVyJyxcclxuXHJcbiAgICAgICAgLy8gRG9uJ3Qgd2FudCBwb3N0ZXIgdG8gYmUgdGFiYmFibGUuXHJcbiAgICAgICAgdGFiSW5kZXg6IC0xXHJcbiAgICAgIH0pLFxyXG4gICAgICBwb3N0ZXIgPSB0aGlzLnBsYXllcl8ucG9zdGVyKCk7XHJcblxyXG4gIGlmIChwb3N0ZXIpIHtcclxuICAgIGlmICgnYmFja2dyb3VuZFNpemUnIGluIGVsLnN0eWxlKSB7XHJcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9ICd1cmwoXCInICsgcG9zdGVyICsgJ1wiKSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbC5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2ltZycsIHsgc3JjOiBwb3N0ZXIgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxudmpzLlBvc3RlckltYWdlLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICAvLyBPbmx5IGFjY2VwdCBjbGlja3Mgd2hlbiBjb250cm9scyBhcmUgZW5hYmxlZFxyXG4gIGlmICh0aGlzLnBsYXllcigpLmNvbnRyb2xzKCkpIHtcclxuICAgIHRoaXMucGxheWVyXy5wbGF5KCk7XHJcbiAgfVxyXG59O1xyXG4vKiBMb2FkaW5nIFNwaW5uZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIExvYWRpbmcgc3Bpbm5lciBmb3Igd2FpdGluZyBldmVudHNcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTG9hZGluZ1NwaW5uZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ2NhbnBsYXknLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuICAgIHBsYXllci5vbignY2FucGxheXRocm91Z2gnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuICAgIHBsYXllci5vbigncGxheWluZycsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG4gICAgcGxheWVyLm9uKCdzZWVrZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3NlZWtpbmcnLCB2anMuYmluZCh0aGlzLCB0aGlzLnNob3cpKTtcclxuXHJcbiAgICAvLyBpbiBzb21lIGJyb3dzZXJzIHNlZWtpbmcgZG9lcyBub3QgdHJpZ2dlciB0aGUgJ3BsYXlpbmcnIGV2ZW50LFxyXG4gICAgLy8gc28gd2UgYWxzbyBuZWVkIHRvIHRyYXAgJ3NlZWtlZCcgaWYgd2UgYXJlIGdvaW5nIHRvIHNldCBhXHJcbiAgICAvLyAnc2Vla2luZycgZXZlbnRcclxuICAgIHBsYXllci5vbignc2Vla2VkJywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcblxyXG4gICAgcGxheWVyLm9uKCdlcnJvcicsIHZqcy5iaW5kKHRoaXMsIHRoaXMuc2hvdykpO1xyXG5cclxuICAgIC8vIE5vdCBzaG93aW5nIHNwaW5uZXIgb24gc3RhbGxlZCBhbnkgbW9yZS4gQnJvd3NlcnMgbWF5IHN0YWxsIGFuZCB0aGVuIG5vdCB0cmlnZ2VyIGFueSBldmVudHMgdGhhdCB3b3VsZCByZW1vdmUgdGhlIHNwaW5uZXIuXHJcbiAgICAvLyBDaGVja2VkIGluIENocm9tZSAxNiBhbmQgU2FmYXJpIDUuMS4yLiBodHRwOi8vaGVscC52aWRlb2pzLmNvbS9kaXNjdXNzaW9ucy9wcm9ibGVtcy84ODMtd2h5LWlzLXRoZS1kb3dubG9hZC1wcm9ncmVzcy1zaG93aW5nXHJcbiAgICAvLyBwbGF5ZXIub24oJ3N0YWxsZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnNob3cpKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3dhaXRpbmcnLCB2anMuYmluZCh0aGlzLCB0aGlzLnNob3cpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkxvYWRpbmdTcGlubmVyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1sb2FkaW5nLXNwaW5uZXInXHJcbiAgfSk7XHJcbn07XHJcbi8qIEJpZyBQbGF5IEJ1dHRvblxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogSW5pdGlhbCBwbGF5IGJ1dHRvbi4gU2hvd3MgYmVmb3JlIHRoZSB2aWRlbyBoYXMgcGxheWVkLiBUaGUgaGlkaW5nIG9mIHRoZVxyXG4gKiBiaWcgcGxheSBidXR0b24gaXMgZG9uZSB2aWEgQ1NTIGFuZCBwbGF5ZXIgc3RhdGVzLlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5CaWdQbGF5QnV0dG9uID0gdmpzLkJ1dHRvbi5leHRlbmQoKTtcclxuXHJcbnZqcy5CaWdQbGF5QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1iaWctcGxheS1idXR0b24nLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9zcGFuPicsXHJcbiAgICAnYXJpYS1sYWJlbCc6ICdwbGF5IHZpZGVvJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLkJpZ1BsYXlCdXR0b24ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy5wbGF5KCk7XHJcbn07XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IE1lZGlhIFRlY2hub2xvZ3kgQ29udHJvbGxlciAtIEJhc2UgY2xhc3MgZm9yIG1lZGlhIHBsYXliYWNrXHJcbiAqIHRlY2hub2xvZ3kgY29udHJvbGxlcnMgbGlrZSBGbGFzaCBhbmQgSFRNTDVcclxuICovXHJcblxyXG4vKipcclxuICogQmFzZSBjbGFzcyBmb3IgbWVkaWEgKEhUTUw1IFZpZGVvLCBGbGFzaCkgY29udHJvbGxlcnNcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyICBDZW50cmFsIHBsYXllciBpbnN0YW5jZVxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgT3B0aW9ucyBvYmplY3RcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgdGhpcy5pbml0Q29udHJvbHNMaXN0ZW5lcnMoKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqXHJcbiAqIFNldCB1cCBjbGljayBhbmQgdG91Y2ggbGlzdGVuZXJzIGZvciB0aGUgcGxheWJhY2sgZWxlbWVudFxyXG4gKiBPbiBkZXNrdG9wcywgYSBjbGljayBvbiB0aGUgdmlkZW8gaXRzZWxmIHdpbGwgdG9nZ2xlIHBsYXliYWNrLFxyXG4gKiBvbiBhIG1vYmlsZSBkZXZpY2UgYSBjbGljayBvbiB0aGUgdmlkZW8gdG9nZ2xlcyBjb250cm9scy5cclxuICogKHRvZ2dsaW5nIGNvbnRyb2xzIGlzIGRvbmUgYnkgdG9nZ2xpbmcgdGhlIHVzZXIgc3RhdGUgYmV0d2VlbiBhY3RpdmUgYW5kXHJcbiAqIGluYWN0aXZlKVxyXG4gKlxyXG4gKiBBIHRhcCBjYW4gc2lnbmFsIHRoYXQgYSB1c2VyIGhhcyBiZWNvbWUgYWN0aXZlLCBvciBoYXMgYmVjb21lIGluYWN0aXZlXHJcbiAqIGUuZy4gYSBxdWljayB0YXAgb24gYW4gaVBob25lIG1vdmllIHNob3VsZCByZXZlYWwgdGhlIGNvbnRyb2xzLiBBbm90aGVyXHJcbiAqIHF1aWNrIHRhcCBzaG91bGQgaGlkZSB0aGVtIGFnYWluIChzaWduYWxpbmcgdGhlIHVzZXIgaXMgaW4gYW4gaW5hY3RpdmVcclxuICogdmlld2luZyBzdGF0ZSlcclxuICpcclxuICogSW4gYWRkaXRpb24gdG8gdGhpcywgd2Ugc3RpbGwgd2FudCB0aGUgdXNlciB0byBiZSBjb25zaWRlcmVkIGluYWN0aXZlIGFmdGVyXHJcbiAqIGEgZmV3IHNlY29uZHMgb2YgaW5hY3Rpdml0eS5cclxuICpcclxuICogTm90ZTogdGhlIG9ubHkgcGFydCBvZiBpT1MgaW50ZXJhY3Rpb24gd2UgY2FuJ3QgbWltaWMgd2l0aCB0aGlzIHNldHVwXHJcbiAqIGlzIGEgdG91Y2ggYW5kIGhvbGQgb24gdGhlIHZpZGVvIGVsZW1lbnQgY291bnRpbmcgYXMgYWN0aXZpdHkgaW4gb3JkZXIgdG9cclxuICoga2VlcCB0aGUgY29udHJvbHMgc2hvd2luZywgYnV0IHRoYXQgc2hvdWxkbid0IGJlIGFuIGlzc3VlLiBBIHRvdWNoIGFuZCBob2xkIG9uXHJcbiAqIGFueSBjb250cm9scyB3aWxsIHN0aWxsIGtlZXAgdGhlIHVzZXIgYWN0aXZlXHJcbiAqL1xyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdENvbnRyb2xzTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcGxheWVyLCB0ZWNoLCBhY3RpdmF0ZUNvbnRyb2xzLCBkZWFjdGl2YXRlQ29udHJvbHM7XHJcblxyXG4gIHRlY2ggPSB0aGlzO1xyXG4gIHBsYXllciA9IHRoaXMucGxheWVyKCk7XHJcblxyXG4gIHZhciBhY3RpdmF0ZUNvbnRyb2xzID0gZnVuY3Rpb24oKXtcclxuICAgIGlmIChwbGF5ZXIuY29udHJvbHMoKSAmJiAhcGxheWVyLnVzaW5nTmF0aXZlQ29udHJvbHMoKSkge1xyXG4gICAgICB0ZWNoLmFkZENvbnRyb2xzTGlzdGVuZXJzKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgZGVhY3RpdmF0ZUNvbnRyb2xzID0gdmpzLmJpbmQodGVjaCwgdGVjaC5yZW1vdmVDb250cm9sc0xpc3RlbmVycyk7XHJcblxyXG4gIC8vIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgb25jZSB0aGUgdGVjaCBpcyByZWFkeSBhbmQgaGFzIGFuIGVsZW1lbnQgdG8gYXBwbHlcclxuICAvLyBsaXN0ZW5lcnMgdG9cclxuICB0aGlzLnJlYWR5KGFjdGl2YXRlQ29udHJvbHMpO1xyXG4gIHBsYXllci5vbignY29udHJvbHNlbmFibGVkJywgYWN0aXZhdGVDb250cm9scyk7XHJcbiAgcGxheWVyLm9uKCdjb250cm9sc2Rpc2FibGVkJywgZGVhY3RpdmF0ZUNvbnRyb2xzKTtcclxufTtcclxuXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5hZGRDb250cm9sc0xpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHByZXZlbnRCdWJibGUsIHVzZXJXYXNBY3RpdmU7XHJcblxyXG4gIC8vIFNvbWUgYnJvd3NlcnMgKENocm9tZSAmIElFKSBkb24ndCB0cmlnZ2VyIGEgY2xpY2sgb24gYSBmbGFzaCBzd2YsIGJ1dCBkb1xyXG4gIC8vIHRyaWdnZXIgbW91c2Vkb3duL3VwLlxyXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTQ0NDU2Mi9qYXZhc2NyaXB0LW9uY2xpY2stZXZlbnQtb3Zlci1mbGFzaC1vYmplY3RcclxuICAvLyBBbnkgdG91Y2ggZXZlbnRzIGFyZSBzZXQgdG8gYmxvY2sgdGhlIG1vdXNlZG93biBldmVudCBmcm9tIGhhcHBlbmluZ1xyXG4gIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMub25DbGljayk7XHJcblxyXG4gIC8vIFdlIG5lZWQgdG8gYmxvY2sgdG91Y2ggZXZlbnRzIG9uIHRoZSB2aWRlbyBlbGVtZW50IGZyb20gYnViYmxpbmcgdXAsXHJcbiAgLy8gb3RoZXJ3aXNlIHRoZXknbGwgc2lnbmFsIGFjdGl2aXR5IHByZW1hdHVyZWx5LiBUaGUgc3BlY2lmaWMgdXNlIGNhc2UgaXNcclxuICAvLyB3aGVuIHRoZSB2aWRlbyBpcyBwbGF5aW5nIGFuZCB0aGUgY29udHJvbHMgaGF2ZSBmYWRlZCBvdXQuIEluIHRoaXMgY2FzZVxyXG4gIC8vIG9ubHkgYSB0YXAgKGZhc3QgdG91Y2gpIHNob3VsZCB0b2dnbGUgdGhlIHVzZXIgYWN0aXZlIHN0YXRlIGFuZCB0dXJuIHRoZVxyXG4gIC8vIGNvbnRyb2xzIGJhY2sgb24uIEEgdG91Y2ggYW5kIG1vdmUgb3IgdG91Y2ggYW5kIGhvbGQgc2hvdWxkIG5vdCB0cmlnZ2VyXHJcbiAgLy8gdGhlIGNvbnRyb2xzIChwZXIgaU9TIGFzIGFuIGV4YW1wbGUgYXQgbGVhc3QpXHJcbiAgLy9cclxuICAvLyBXZSBhbHdheXMgd2FudCB0byBzdG9wIHByb3BhZ2F0aW9uIG9uIHRvdWNoc3RhcnQgYmVjYXVzZSB0b3VjaHN0YXJ0XHJcbiAgLy8gYXQgdGhlIHBsYXllciBsZXZlbCBzdGFydHMgdGhlIHRvdWNoSW5Qcm9ncmVzcyBpbnRlcnZhbC4gV2UgY2FuIHN0aWxsXHJcbiAgLy8gcmVwb3J0IGFjdGl2aXR5IG9uIHRoZSBvdGhlciBldmVudHMsIGJ1dCB3b24ndCBsZXQgdGhlbSBidWJibGUgZm9yXHJcbiAgLy8gY29uc2lzdGVuY3kuIFdlIGRvbid0IHdhbnQgdG8gYnViYmxlIGEgdG91Y2hlbmQgd2l0aG91dCBhIHRvdWNoc3RhcnQuXHJcbiAgdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAvLyBTdG9wIHRoZSBtb3VzZSBldmVudHMgZnJvbSBhbHNvIGhhcHBlbmluZ1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgLy8gUmVjb3JkIGlmIHRoZSB1c2VyIHdhcyBhY3RpdmUgbm93IHNvIHdlIGRvbid0IGhhdmUgdG8ga2VlcCBwb2xsaW5nIGl0XHJcbiAgICB1c2VyV2FzQWN0aXZlID0gdGhpcy5wbGF5ZXJfLnVzZXJBY3RpdmUoKTtcclxuICB9KTtcclxuXHJcbiAgcHJldmVudEJ1YmJsZSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgaWYgKHVzZXJXYXNBY3RpdmUpIHtcclxuICAgICAgdGhpcy5wbGF5ZXJfLnJlcG9ydFVzZXJBY3Rpdml0eSgpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFRyZWF0IGFsbCB0b3VjaCBldmVudHMgdGhlIHNhbWUgZm9yIGNvbnNpc3RlbmN5XHJcbiAgdGhpcy5vbigndG91Y2htb3ZlJywgcHJldmVudEJ1YmJsZSk7XHJcbiAgdGhpcy5vbigndG91Y2hsZWF2ZScsIHByZXZlbnRCdWJibGUpO1xyXG4gIHRoaXMub24oJ3RvdWNoY2FuY2VsJywgcHJldmVudEJ1YmJsZSk7XHJcbiAgdGhpcy5vbigndG91Y2hlbmQnLCBwcmV2ZW50QnViYmxlKTtcclxuXHJcbiAgLy8gVHVybiBvbiBjb21wb25lbnQgdGFwIGV2ZW50c1xyXG4gIHRoaXMuZW1pdFRhcEV2ZW50cygpO1xyXG5cclxuICAvLyBUaGUgdGFwIGxpc3RlbmVyIG5lZWRzIHRvIGNvbWUgYWZ0ZXIgdGhlIHRvdWNoZW5kIGxpc3RlbmVyIGJlY2F1c2UgdGhlIHRhcFxyXG4gIC8vIGxpc3RlbmVyIGNhbmNlbHMgb3V0IGFueSByZXBvcnRlZFVzZXJBY3Rpdml0eSB3aGVuIHNldHRpbmcgdXNlckFjdGl2ZShmYWxzZSlcclxuICB0aGlzLm9uKCd0YXAnLCB0aGlzLm9uVGFwKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgdGhlIGxpc3RlbmVycyB1c2VkIGZvciBjbGljayBhbmQgdGFwIGNvbnRyb2xzLiBUaGlzIGlzIG5lZWRlZCBmb3JcclxuICogdG9nZ2xpbmcgdG8gY29udHJvbHMgZGlzYWJsZWQsIHdoZXJlIGEgdGFwL3RvdWNoIHNob3VsZCBkbyBub3RoaW5nLlxyXG4gKi9cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLnJlbW92ZUNvbnRyb2xzTGlzdGVuZXJzID0gZnVuY3Rpb24oKXtcclxuICAvLyBXZSBkb24ndCB3YW50IHRvIGp1c3QgdXNlIGB0aGlzLm9mZigpYCBiZWNhdXNlIHRoZXJlIG1pZ2h0IGJlIG90aGVyIG5lZWRlZFxyXG4gIC8vIGxpc3RlbmVycyBhZGRlZCBieSB0ZWNocyB0aGF0IGV4dGVuZCB0aGlzLlxyXG4gIHRoaXMub2ZmKCd0YXAnKTtcclxuICB0aGlzLm9mZigndG91Y2hzdGFydCcpO1xyXG4gIHRoaXMub2ZmKCd0b3VjaG1vdmUnKTtcclxuICB0aGlzLm9mZigndG91Y2hsZWF2ZScpO1xyXG4gIHRoaXMub2ZmKCd0b3VjaGNhbmNlbCcpO1xyXG4gIHRoaXMub2ZmKCd0b3VjaGVuZCcpO1xyXG4gIHRoaXMub2ZmKCdjbGljaycpO1xyXG4gIHRoaXMub2ZmKCdtb3VzZWRvd24nKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgYSBjbGljayBvbiB0aGUgbWVkaWEgZWxlbWVudC4gQnkgZGVmYXVsdCB3aWxsIHBsYXkvcGF1c2UgdGhlIG1lZGlhLlxyXG4gKi9cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgLy8gV2UncmUgdXNpbmcgbW91c2Vkb3duIHRvIGRldGVjdCBjbGlja3MgdGhhbmtzIHRvIEZsYXNoLCBidXQgbW91c2Vkb3duXHJcbiAgLy8gd2lsbCBhbHNvIGJlIHRyaWdnZXJlZCB3aXRoIHJpZ2h0LWNsaWNrcywgc28gd2UgbmVlZCB0byBwcmV2ZW50IHRoYXRcclxuICBpZiAoZXZlbnQuYnV0dG9uICE9PSAwKSByZXR1cm47XHJcblxyXG4gIC8vIFdoZW4gY29udHJvbHMgYXJlIGRpc2FibGVkIGEgY2xpY2sgc2hvdWxkIG5vdCB0b2dnbGUgcGxheWJhY2sgYmVjYXVzZVxyXG4gIC8vIHRoZSBjbGljayBpcyBjb25zaWRlcmVkIGEgY29udHJvbFxyXG4gIGlmICh0aGlzLnBsYXllcigpLmNvbnRyb2xzKCkpIHtcclxuICAgIGlmICh0aGlzLnBsYXllcigpLnBhdXNlZCgpKSB7XHJcbiAgICAgIHRoaXMucGxheWVyKCkucGxheSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wbGF5ZXIoKS5wYXVzZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBIYW5kbGUgYSB0YXAgb24gdGhlIG1lZGlhIGVsZW1lbnQuIEJ5IGRlZmF1bHQgaXQgd2lsbCB0b2dnbGUgdGhlIHVzZXJcclxuICogYWN0aXZpdHkgc3RhdGUsIHdoaWNoIGhpZGVzIGFuZCBzaG93cyB0aGUgY29udHJvbHMuXHJcbiAqL1xyXG5cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLm9uVGFwID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcigpLnVzZXJBY3RpdmUoIXRoaXMucGxheWVyKCkudXNlckFjdGl2ZSgpKTtcclxufTtcclxuXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5mZWF0dXJlcyA9IHtcclxuICAndm9sdW1lQ29udHJvbCc6IHRydWUsXHJcblxyXG4gIC8vIFJlc2l6aW5nIHBsdWdpbnMgdXNpbmcgcmVxdWVzdCBmdWxsc2NyZWVuIHJlbG9hZHMgdGhlIHBsdWdpblxyXG4gICdmdWxsc2NyZWVuUmVzaXplJzogZmFsc2UsXHJcblxyXG4gIC8vIE9wdGlvbmFsIGV2ZW50cyB0aGF0IHdlIGNhbiBtYW51YWxseSBtaW1pYyB3aXRoIHRpbWVyc1xyXG4gIC8vIGN1cnJlbnRseSBub3QgdHJpZ2dlcmVkIGJ5IHZpZGVvLWpzLXN3ZlxyXG4gICdwcm9ncmVzc0V2ZW50cyc6IGZhbHNlLFxyXG4gICd0aW1ldXBkYXRlRXZlbnRzJzogZmFsc2VcclxufTtcclxuXHJcbnZqcy5tZWRpYSA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgZGVmYXVsdCBBUEkgbWV0aG9kcyBmb3IgYW55IE1lZGlhVGVjaENvbnRyb2xsZXJcclxuICogQHR5cGUge1N0cmluZ31cclxuICovXHJcbnZqcy5tZWRpYS5BcGlNZXRob2RzID0gJ3BsYXkscGF1c2UscGF1c2VkLGN1cnJlbnRUaW1lLHNldEN1cnJlbnRUaW1lLGR1cmF0aW9uLGJ1ZmZlcmVkLHZvbHVtZSxzZXRWb2x1bWUsbXV0ZWQsc2V0TXV0ZWQsd2lkdGgsaGVpZ2h0LHN1cHBvcnRzRnVsbFNjcmVlbixlbnRlckZ1bGxTY3JlZW4sc3JjLGxvYWQsY3VycmVudFNyYyxwcmVsb2FkLHNldFByZWxvYWQsYXV0b3BsYXksc2V0QXV0b3BsYXksbG9vcCxzZXRMb29wLGVycm9yLG5ldHdvcmtTdGF0ZSxyZWFkeVN0YXRlLHNlZWtpbmcsaW5pdGlhbFRpbWUsc3RhcnRPZmZzZXRUaW1lLHBsYXllZCxzZWVrYWJsZSxlbmRlZCx2aWRlb1RyYWNrcyxhdWRpb1RyYWNrcyx2aWRlb1dpZHRoLHZpZGVvSGVpZ2h0LHRleHRUcmFja3MsZGVmYXVsdFBsYXliYWNrUmF0ZSxwbGF5YmFja1JhdGUsbWVkaWFHcm91cCxjb250cm9sbGVyLGNvbnRyb2xzLGRlZmF1bHRNdXRlZCcuc3BsaXQoJywnKTtcclxuLy8gQ3JlYXRlIHBsYWNlaG9sZGVyIG1ldGhvZHMgZm9yIGVhY2ggdGhhdCB3YXJuIHdoZW4gYSBtZXRob2QgaXNuJ3Qgc3VwcG9ydGVkIGJ5IHRoZSBjdXJyZW50IHBsYXliYWNrIHRlY2hub2xvZ3lcclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZU1ldGhvZChtZXRob2ROYW1lKXtcclxuICByZXR1cm4gZnVuY3Rpb24oKXtcclxuICAgIHRocm93IG5ldyBFcnJvcignVGhlIFwiJyttZXRob2ROYW1lKydcIiBtZXRob2QgaXMgbm90IGF2YWlsYWJsZSBvbiB0aGUgcGxheWJhY2sgdGVjaG5vbG9neVxcJ3MgQVBJJyk7XHJcbiAgfTtcclxufVxyXG5cclxuZm9yICh2YXIgaSA9IHZqcy5tZWRpYS5BcGlNZXRob2RzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgdmFyIG1ldGhvZE5hbWUgPSB2anMubWVkaWEuQXBpTWV0aG9kc1tpXTtcclxuICB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGVbdmpzLm1lZGlhLkFwaU1ldGhvZHNbaV1dID0gY3JlYXRlTWV0aG9kKG1ldGhvZE5hbWUpO1xyXG59XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IEhUTUw1IE1lZGlhIENvbnRyb2xsZXIgLSBXcmFwcGVyIGZvciBIVE1MNSBNZWRpYSBBUElcclxuICovXHJcblxyXG4vKipcclxuICogSFRNTDUgTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIEhUTUw1IE1lZGlhIEFQSVxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb249fSByZWFkeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5IdG1sNSA9IHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgLy8gdm9sdW1lIGNhbm5vdCBiZSBjaGFuZ2VkIGZyb20gMSBvbiBpT1NcclxuICAgIHRoaXMuZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9IHZqcy5IdG1sNS5jYW5Db250cm9sVm9sdW1lKCk7XHJcblxyXG4gICAgLy8gSW4gaU9TLCBpZiB5b3UgbW92ZSBhIHZpZGVvIGVsZW1lbnQgaW4gdGhlIERPTSwgaXQgYnJlYWtzIHZpZGVvIHBsYXliYWNrLlxyXG4gICAgdGhpcy5mZWF0dXJlc1snbW92aW5nTWVkaWFFbGVtZW50SW5ET00nXSA9ICF2anMuSVNfSU9TO1xyXG5cclxuICAgIC8vIEhUTUwgdmlkZW8gaXMgYWJsZSB0byBhdXRvbWF0aWNhbGx5IHJlc2l6ZSB3aGVuIGdvaW5nIHRvIGZ1bGxzY3JlZW5cclxuICAgIHRoaXMuZmVhdHVyZXNbJ2Z1bGxzY3JlZW5SZXNpemUnXSA9IHRydWU7XHJcblxyXG4gICAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICB2YXIgc291cmNlID0gb3B0aW9uc1snc291cmNlJ107XHJcblxyXG4gICAgLy8gSWYgdGhlIGVsZW1lbnQgc291cmNlIGlzIGFscmVhZHkgc2V0LCB3ZSBtYXkgaGF2ZSBtaXNzZWQgdGhlIGxvYWRzdGFydCBldmVudCwgYW5kIHdhbnQgdG8gdHJpZ2dlciBpdC5cclxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gc2V0IHRoZSBzb3VyY2UgYWdhaW4gYW5kIGludGVycnVwdCBwbGF5YmFjay5cclxuICAgIGlmIChzb3VyY2UgJiYgdGhpcy5lbF8uY3VycmVudFNyYyA9PT0gc291cmNlLnNyYyAmJiB0aGlzLmVsXy5uZXR3b3JrU3RhdGUgPiAwKSB7XHJcbiAgICAgIHBsYXllci50cmlnZ2VyKCdsb2Fkc3RhcnQnKTtcclxuXHJcbiAgICAvLyBPdGhlcndpc2Ugc2V0IHRoZSBzb3VyY2UgaWYgb25lIHdhcyBwcm92aWRlZC5cclxuICAgIH0gZWxzZSBpZiAoc291cmNlKSB7XHJcbiAgICAgIHRoaXMuZWxfLnNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGV0ZXJtaW5lIGlmIG5hdGl2ZSBjb250cm9scyBzaG91bGQgYmUgdXNlZFxyXG4gICAgLy8gT3VyIGdvYWwgc2hvdWxkIGJlIHRvIGdldCB0aGUgY3VzdG9tIGNvbnRyb2xzIG9uIG1vYmlsZSBzb2xpZCBldmVyeXdoZXJlXHJcbiAgICAvLyBzbyB3ZSBjYW4gcmVtb3ZlIHRoaXMgYWxsIHRvZ2V0aGVyLiBSaWdodCBub3cgdGhpcyB3aWxsIGJsb2NrIGN1c3RvbVxyXG4gICAgLy8gY29udHJvbHMgb24gdG91Y2ggZW5hYmxlZCBsYXB0b3BzIGxpa2UgdGhlIENocm9tZSBQaXhlbFxyXG4gICAgaWYgKHZqcy5UT1VDSF9FTkFCTEVEICYmIHBsYXllci5vcHRpb25zKClbJ25hdGl2ZUNvbnRyb2xzRm9yVG91Y2gnXSAhPT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy51c2VOYXRpdmVDb250cm9scygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENocm9tZSBhbmQgU2FmYXJpIGJvdGggaGF2ZSBpc3N1ZXMgd2l0aCBhdXRvcGxheS5cclxuICAgIC8vIEluIFNhZmFyaSAoNS4xLjEpLCB3aGVuIHdlIG1vdmUgdGhlIHZpZGVvIGVsZW1lbnQgaW50byB0aGUgY29udGFpbmVyIGRpdiwgYXV0b3BsYXkgZG9lc24ndCB3b3JrLlxyXG4gICAgLy8gSW4gQ2hyb21lICgxNSksIGlmIHlvdSBoYXZlIGF1dG9wbGF5ICsgYSBwb3N0ZXIgKyBubyBjb250cm9scywgdGhlIHZpZGVvIGdldHMgaGlkZGVuIChidXQgYXVkaW8gcGxheXMpXHJcbiAgICAvLyBUaGlzIGZpeGVzIGJvdGggaXNzdWVzLiBOZWVkIHRvIHdhaXQgZm9yIEFQSSwgc28gaXQgdXBkYXRlcyBkaXNwbGF5cyBjb3JyZWN0bHlcclxuICAgIHBsYXllci5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICBpZiAodGhpcy50YWcgJiYgdGhpcy5vcHRpb25zX1snYXV0b3BsYXknXSAmJiB0aGlzLnBhdXNlZCgpKSB7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMudGFnWydwb3N0ZXInXTsgLy8gQ2hyb21lIEZpeC4gRml4ZWQgaW4gQ2hyb21lIHYxNi5cclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgdGhpcy5zZXR1cFRyaWdnZXJzKCk7XHJcbiAgICB0aGlzLnRyaWdnZXJSZWFkeSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgcGxheWVyID0gdGhpcy5wbGF5ZXJfLFxyXG4gICAgICAvLyBJZiBwb3NzaWJsZSwgcmV1c2Ugb3JpZ2luYWwgdGFnIGZvciBIVE1MNSBwbGF5YmFjayB0ZWNobm9sb2d5IGVsZW1lbnRcclxuICAgICAgZWwgPSBwbGF5ZXIudGFnLFxyXG4gICAgICBuZXdFbCxcclxuICAgICAgY2xvbmU7XHJcblxyXG4gIC8vIENoZWNrIGlmIHRoaXMgYnJvd3NlciBzdXBwb3J0cyBtb3ZpbmcgdGhlIGVsZW1lbnQgaW50byB0aGUgYm94LlxyXG4gIC8vIE9uIHRoZSBpUGhvbmUgdmlkZW8gd2lsbCBicmVhayBpZiB5b3UgbW92ZSB0aGUgZWxlbWVudCxcclxuICAvLyBTbyB3ZSBoYXZlIHRvIGNyZWF0ZSBhIGJyYW5kIG5ldyBlbGVtZW50LlxyXG4gIGlmICghZWwgfHwgdGhpcy5mZWF0dXJlc1snbW92aW5nTWVkaWFFbGVtZW50SW5ET00nXSA9PT0gZmFsc2UpIHtcclxuXHJcbiAgICAvLyBJZiB0aGUgb3JpZ2luYWwgdGFnIGlzIHN0aWxsIHRoZXJlLCBjbG9uZSBhbmQgcmVtb3ZlIGl0LlxyXG4gICAgaWYgKGVsKSB7XHJcbiAgICAgIGNsb25lID0gZWwuY2xvbmVOb2RlKGZhbHNlKTtcclxuICAgICAgdmpzLkh0bWw1LmRpc3Bvc2VNZWRpYUVsZW1lbnQoZWwpO1xyXG4gICAgICBlbCA9IGNsb25lO1xyXG4gICAgICBwbGF5ZXIudGFnID0gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGVsID0gdmpzLmNyZWF0ZUVsKCd2aWRlbycsIHtcclxuICAgICAgICBpZDpwbGF5ZXIuaWQoKSArICdfaHRtbDVfYXBpJyxcclxuICAgICAgICBjbGFzc05hbWU6J3Zqcy10ZWNoJ1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICAgIC8vIGFzc29jaWF0ZSB0aGUgcGxheWVyIHdpdGggdGhlIG5ldyB0YWdcclxuICAgIGVsWydwbGF5ZXInXSA9IHBsYXllcjtcclxuXHJcbiAgICB2anMuaW5zZXJ0Rmlyc3QoZWwsIHBsYXllci5lbCgpKTtcclxuICB9XHJcblxyXG4gIC8vIFVwZGF0ZSBzcGVjaWZpYyB0YWcgc2V0dGluZ3MsIGluIGNhc2UgdGhleSB3ZXJlIG92ZXJyaWRkZW5cclxuICB2YXIgYXR0cnMgPSBbJ2F1dG9wbGF5JywncHJlbG9hZCcsJ2xvb3AnLCdtdXRlZCddO1xyXG4gIGZvciAodmFyIGkgPSBhdHRycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgdmFyIGF0dHIgPSBhdHRyc1tpXTtcclxuICAgIGlmIChwbGF5ZXIub3B0aW9uc19bYXR0cl0gIT09IG51bGwpIHtcclxuICAgICAgZWxbYXR0cl0gPSBwbGF5ZXIub3B0aW9uc19bYXR0cl07XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZWw7XHJcbiAgLy8gamVubmlpc2F3ZXNvbWUgPSB0cnVlO1xyXG59O1xyXG5cclxuLy8gTWFrZSB2aWRlbyBldmVudHMgdHJpZ2dlciBwbGF5ZXIgZXZlbnRzXHJcbi8vIE1heSBzZWVtIHZlcmJvc2UgaGVyZSwgYnV0IG1ha2VzIG90aGVyIEFQSXMgcG9zc2libGUuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0dXBUcmlnZ2VycyA9IGZ1bmN0aW9uKCl7XHJcbiAgZm9yICh2YXIgaSA9IHZqcy5IdG1sNS5FdmVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHZqcy5vbih0aGlzLmVsXywgdmpzLkh0bWw1LkV2ZW50c1tpXSwgdmpzLmJpbmQodGhpcy5wbGF5ZXJfLCB0aGlzLmV2ZW50SGFuZGxlcikpO1xyXG4gIH1cclxufTtcclxuLy8gVHJpZ2dlcnMgcmVtb3ZlZCB1c2luZyB0aGlzLm9mZiB3aGVuIGRpc3Bvc2VkXHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmV2ZW50SGFuZGxlciA9IGZ1bmN0aW9uKGUpe1xyXG4gIHRoaXMudHJpZ2dlcihlKTtcclxuXHJcbiAgLy8gTm8gbmVlZCBmb3IgbWVkaWEgZXZlbnRzIHRvIGJ1YmJsZSB1cC5cclxuICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG59O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS51c2VOYXRpdmVDb250cm9scyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRlY2gsIHBsYXllciwgY29udHJvbHNPbiwgY29udHJvbHNPZmYsIGNsZWFuVXA7XHJcblxyXG4gIHRlY2ggPSB0aGlzO1xyXG4gIHBsYXllciA9IHRoaXMucGxheWVyKCk7XHJcblxyXG4gIC8vIElmIHRoZSBwbGF5ZXIgY29udHJvbHMgYXJlIGVuYWJsZWQgdHVybiBvbiB0aGUgbmF0aXZlIGNvbnRyb2xzXHJcbiAgdGVjaC5zZXRDb250cm9scyhwbGF5ZXIuY29udHJvbHMoKSk7XHJcblxyXG4gIC8vIFVwZGF0ZSB0aGUgbmF0aXZlIGNvbnRyb2xzIHdoZW4gcGxheWVyIGNvbnRyb2xzIHN0YXRlIGlzIHVwZGF0ZWRcclxuICBjb250cm9sc09uID0gZnVuY3Rpb24oKXtcclxuICAgIHRlY2guc2V0Q29udHJvbHModHJ1ZSk7XHJcbiAgfTtcclxuICBjb250cm9sc09mZiA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0ZWNoLnNldENvbnRyb2xzKGZhbHNlKTtcclxuICB9O1xyXG4gIHBsYXllci5vbignY29udHJvbHNlbmFibGVkJywgY29udHJvbHNPbik7XHJcbiAgcGxheWVyLm9uKCdjb250cm9sc2Rpc2FibGVkJywgY29udHJvbHNPZmYpO1xyXG5cclxuICAvLyBDbGVhbiB1cCB3aGVuIG5vdCB1c2luZyBuYXRpdmUgY29udHJvbHMgYW55bW9yZVxyXG4gIGNsZWFuVXAgPSBmdW5jdGlvbigpe1xyXG4gICAgcGxheWVyLm9mZignY29udHJvbHNlbmFibGVkJywgY29udHJvbHNPbik7XHJcbiAgICBwbGF5ZXIub2ZmKCdjb250cm9sc2Rpc2FibGVkJywgY29udHJvbHNPZmYpO1xyXG4gIH07XHJcbiAgdGVjaC5vbignZGlzcG9zZScsIGNsZWFuVXApO1xyXG4gIHBsYXllci5vbigndXNpbmdjdXN0b21jb250cm9scycsIGNsZWFuVXApO1xyXG5cclxuICAvLyBVcGRhdGUgdGhlIHN0YXRlIG9mIHRoZSBwbGF5ZXIgdG8gdXNpbmcgbmF0aXZlIGNvbnRyb2xzXHJcbiAgcGxheWVyLnVzaW5nTmF0aXZlQ29udHJvbHModHJ1ZSk7XHJcbn07XHJcblxyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24oKXsgdGhpcy5lbF8ucGxheSgpOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXsgdGhpcy5lbF8ucGF1c2UoKTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5wYXVzZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ucGF1c2VkOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5jdXJyZW50VGltZSA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5jdXJyZW50VGltZTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRDdXJyZW50VGltZSA9IGZ1bmN0aW9uKHNlY29uZHMpe1xyXG4gIHRyeSB7XHJcbiAgICB0aGlzLmVsXy5jdXJyZW50VGltZSA9IHNlY29uZHM7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICB2anMubG9nKGUsICdWaWRlbyBpcyBub3QgcmVhZHkuIChWaWRlby5qcyknKTtcclxuICAgIC8vIHRoaXMud2FybmluZyhWaWRlb0pTLndhcm5pbmdzLnZpZGVvTm90UmVhZHkpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uZHVyYXRpb24gfHwgMDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5idWZmZXJlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5idWZmZXJlZDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUudm9sdW1lID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnZvbHVtZTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRWb2x1bWUgPSBmdW5jdGlvbihwZXJjZW50QXNEZWNpbWFsKXsgdGhpcy5lbF8udm9sdW1lID0gcGVyY2VudEFzRGVjaW1hbDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5tdXRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5tdXRlZDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRNdXRlZCA9IGZ1bmN0aW9uKG11dGVkKXsgdGhpcy5lbF8ubXV0ZWQgPSBtdXRlZDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUud2lkdGggPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ub2Zmc2V0V2lkdGg7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuaGVpZ2h0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLm9mZnNldEhlaWdodDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc3VwcG9ydHNGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICBpZiAodHlwZW9mIHRoaXMuZWxfLndlYmtpdEVudGVyRnVsbFNjcmVlbiA9PSAnZnVuY3Rpb24nKSB7XHJcblxyXG4gICAgLy8gU2VlbXMgdG8gYmUgYnJva2VuIGluIENocm9taXVtL0Nocm9tZSAmJiBTYWZhcmkgaW4gTGVvcGFyZFxyXG4gICAgaWYgKC9BbmRyb2lkLy50ZXN0KHZqcy5VU0VSX0FHRU5UKSB8fCAhL0Nocm9tZXxNYWMgT1MgWCAxMC41Ly50ZXN0KHZqcy5VU0VSX0FHRU5UKSkge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5lbnRlckZ1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHZhciB2aWRlbyA9IHRoaXMuZWxfO1xyXG4gIGlmICh2aWRlby5wYXVzZWQgJiYgdmlkZW8ubmV0d29ya1N0YXRlIDw9IHZpZGVvLkhBVkVfTUVUQURBVEEpIHtcclxuICAgIC8vIGF0dGVtcHQgdG8gcHJpbWUgdGhlIHZpZGVvIGVsZW1lbnQgZm9yIHByb2dyYW1tYXRpYyBhY2Nlc3NcclxuICAgIC8vIHRoaXMgaXNuJ3QgbmVjZXNzYXJ5IG9uIHRoZSBkZXNrdG9wIGJ1dCBzaG91bGRuJ3QgaHVydFxyXG4gICAgdGhpcy5lbF8ucGxheSgpO1xyXG5cclxuICAgIC8vIHBsYXlpbmcgYW5kIHBhdXNpbmcgc3luY2hyb25vdXNseSBkdXJpbmcgdGhlIHRyYW5zaXRpb24gdG8gZnVsbHNjcmVlblxyXG4gICAgLy8gY2FuIGdldCBpT1MgfjYuMSBkZXZpY2VzIGludG8gYSBwbGF5L3BhdXNlIGxvb3BcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgdmlkZW8ud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XHJcbiAgICB9LCAwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgdmlkZW8ud2Via2l0RW50ZXJGdWxsU2NyZWVuKCk7XHJcbiAgfVxyXG59O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmV4aXRGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy53ZWJraXRFeGl0RnVsbFNjcmVlbigpO1xyXG59O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKHNyYyl7IHRoaXMuZWxfLnNyYyA9IHNyYzsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKXsgdGhpcy5lbF8ubG9hZCgpOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uY3VycmVudFNyYzsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5wcmVsb2FkOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldFByZWxvYWQgPSBmdW5jdGlvbih2YWwpeyB0aGlzLmVsXy5wcmVsb2FkID0gdmFsOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5hdXRvcGxheSA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5hdXRvcGxheTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRBdXRvcGxheSA9IGZ1bmN0aW9uKHZhbCl7IHRoaXMuZWxfLmF1dG9wbGF5ID0gdmFsOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5jb250cm9scyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5jb250cm9sczsgfVxyXG52anMuSHRtbDUucHJvdG90eXBlLnNldENvbnRyb2xzID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8uY29udHJvbHMgPSAhIXZhbDsgfVxyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmxvb3A7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0TG9vcCA9IGZ1bmN0aW9uKHZhbCl7IHRoaXMuZWxfLmxvb3AgPSB2YWw7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmVycm9yOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNlZWtpbmcgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uc2Vla2luZzsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5lbmRlZCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5lbmRlZDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5kZWZhdWx0TXV0ZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uZGVmYXVsdE11dGVkOyB9O1xyXG5cclxuLyogSFRNTDUgU3VwcG9ydCBUZXN0aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbnZqcy5IdG1sNS5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICEhdmpzLlRFU1RfVklELmNhblBsYXlUeXBlO1xyXG59O1xyXG5cclxudmpzLkh0bWw1LmNhblBsYXlTb3VyY2UgPSBmdW5jdGlvbihzcmNPYmope1xyXG4gIC8vIElFOSBvbiBXaW5kb3dzIDcgd2l0aG91dCBNZWRpYVBsYXllciB0aHJvd3MgYW4gZXJyb3IgaGVyZVxyXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS92aWRlb2pzL3ZpZGVvLmpzL2lzc3Vlcy81MTlcclxuICB0cnkge1xyXG4gICAgcmV0dXJuICEhdmpzLlRFU1RfVklELmNhblBsYXlUeXBlKHNyY09iai50eXBlKTtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcbiAgLy8gVE9ETzogQ2hlY2sgVHlwZVxyXG4gIC8vIElmIG5vIFR5cGUsIGNoZWNrIGV4dFxyXG4gIC8vIENoZWNrIE1lZGlhIFR5cGVcclxufTtcclxuXHJcbnZqcy5IdG1sNS5jYW5Db250cm9sVm9sdW1lID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdm9sdW1lID0gIHZqcy5URVNUX1ZJRC52b2x1bWU7XHJcbiAgdmpzLlRFU1RfVklELnZvbHVtZSA9ICh2b2x1bWUgLyAyKSArIDAuMTtcclxuICByZXR1cm4gdm9sdW1lICE9PSB2anMuVEVTVF9WSUQudm9sdW1lO1xyXG59O1xyXG5cclxuLy8gTGlzdCBvZiBhbGwgSFRNTDUgZXZlbnRzICh2YXJpb3VzIHVzZXMpLlxyXG52anMuSHRtbDUuRXZlbnRzID0gJ2xvYWRzdGFydCxzdXNwZW5kLGFib3J0LGVycm9yLGVtcHRpZWQsc3RhbGxlZCxsb2FkZWRtZXRhZGF0YSxsb2FkZWRkYXRhLGNhbnBsYXksY2FucGxheXRocm91Z2gscGxheWluZyx3YWl0aW5nLHNlZWtpbmcsc2Vla2VkLGVuZGVkLGR1cmF0aW9uY2hhbmdlLHRpbWV1cGRhdGUscHJvZ3Jlc3MscGxheSxwYXVzZSxyYXRlY2hhbmdlLHZvbHVtZWNoYW5nZScuc3BsaXQoJywnKTtcclxuXHJcbnZqcy5IdG1sNS5kaXNwb3NlTWVkaWFFbGVtZW50ID0gZnVuY3Rpb24oZWwpe1xyXG4gIGlmICghZWwpIHsgcmV0dXJuOyB9XHJcblxyXG4gIGVsWydwbGF5ZXInXSA9IG51bGw7XHJcblxyXG4gIGlmIChlbC5wYXJlbnROb2RlKSB7XHJcbiAgICBlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsKTtcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBhbnkgY2hpbGQgdHJhY2sgb3Igc291cmNlIG5vZGVzIHRvIHByZXZlbnQgdGhlaXIgbG9hZGluZ1xyXG4gIHdoaWxlKGVsLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgZWwucmVtb3ZlQ2hpbGQoZWwuZmlyc3RDaGlsZCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgYW55IHNyYyByZWZlcmVuY2UuIG5vdCBzZXR0aW5nIGBzcmM9JydgIGJlY2F1c2UgdGhhdCBjYXVzZXMgYSB3YXJuaW5nXHJcbiAgLy8gaW4gZmlyZWZveFxyXG4gIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3JjJyk7XHJcblxyXG4gIC8vIGZvcmNlIHRoZSBtZWRpYSBlbGVtZW50IHRvIHVwZGF0ZSBpdHMgbG9hZGluZyBzdGF0ZSBieSBjYWxsaW5nIGxvYWQoKVxyXG4gIGlmICh0eXBlb2YgZWwubG9hZCA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH1cclxufTtcclxuXHJcbi8vIEhUTUw1IEZlYXR1cmUgZGV0ZWN0aW9uIGFuZCBEZXZpY2UgRml4ZXMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXHJcblxyXG4gIC8vIE92ZXJyaWRlIEFuZHJvaWQgMi4yIGFuZCBsZXNzIGNhblBsYXlUeXBlIG1ldGhvZCB3aGljaCBpcyBicm9rZW5cclxuaWYgKHZqcy5JU19PTERfQU5EUk9JRCkge1xyXG4gIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJykuY29uc3RydWN0b3IucHJvdG90eXBlLmNhblBsYXlUeXBlID0gZnVuY3Rpb24odHlwZSl7XHJcbiAgICByZXR1cm4gKHR5cGUgJiYgdHlwZS50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ3ZpZGVvL21wNCcpICE9IC0xKSA/ICdtYXliZScgOiAnJztcclxuICB9O1xyXG59XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IFZpZGVvSlMtU1dGIC0gQ3VzdG9tIEZsYXNoIFBsYXllciB3aXRoIEhUTUw1LWlzaCBBUElcclxuICogaHR0cHM6Ly9naXRodWIuY29tL3plbmNvZGVyL3ZpZGVvLWpzLXN3ZlxyXG4gKiBOb3QgdXNpbmcgc2V0dXBUcmlnZ2Vycy4gVXNpbmcgZ2xvYmFsIG9uRXZlbnQgZnVuYyB0byBkaXN0cmlidXRlIGV2ZW50c1xyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBGbGFzaCBNZWRpYSBDb250cm9sbGVyIC0gV3JhcHBlciBmb3IgZmFsbGJhY2sgU1dGIEFQSVxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQHBhcmFtIHtGdW5jdGlvbj19IHJlYWR5XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkZsYXNoID0gdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIHZhciBzb3VyY2UgPSBvcHRpb25zWydzb3VyY2UnXSxcclxuXHJcbiAgICAgICAgLy8gV2hpY2ggZWxlbWVudCB0byBlbWJlZCBpblxyXG4gICAgICAgIHBhcmVudEVsID0gb3B0aW9uc1sncGFyZW50RWwnXSxcclxuXHJcbiAgICAgICAgLy8gQ3JlYXRlIGEgdGVtcG9yYXJ5IGVsZW1lbnQgdG8gYmUgcmVwbGFjZWQgYnkgc3dmIG9iamVjdFxyXG4gICAgICAgIHBsYWNlSG9sZGVyID0gdGhpcy5lbF8gPSB2anMuY3JlYXRlRWwoJ2RpdicsIHsgaWQ6IHBsYXllci5pZCgpICsgJ190ZW1wX2ZsYXNoJyB9KSxcclxuXHJcbiAgICAgICAgLy8gR2VuZXJhdGUgSUQgZm9yIHN3ZiBvYmplY3RcclxuICAgICAgICBvYmpJZCA9IHBsYXllci5pZCgpKydfZmxhc2hfYXBpJyxcclxuXHJcbiAgICAgICAgLy8gU3RvcmUgcGxheWVyIG9wdGlvbnMgaW4gbG9jYWwgdmFyIGZvciBvcHRpbWl6YXRpb25cclxuICAgICAgICAvLyBUT0RPOiBzd2l0Y2ggdG8gdXNpbmcgcGxheWVyIG1ldGhvZHMgaW5zdGVhZCBvZiBvcHRpb25zXHJcbiAgICAgICAgLy8gZS5nLiBwbGF5ZXIuYXV0b3BsYXkoKTtcclxuICAgICAgICBwbGF5ZXJPcHRpb25zID0gcGxheWVyLm9wdGlvbnNfLFxyXG5cclxuICAgICAgICAvLyBNZXJnZSBkZWZhdWx0IGZsYXNodmFycyB3aXRoIG9uZXMgcGFzc2VkIGluIHRvIGluaXRcclxuICAgICAgICBmbGFzaFZhcnMgPSB2anMub2JqLm1lcmdlKHtcclxuXHJcbiAgICAgICAgICAvLyBTV0YgQ2FsbGJhY2sgRnVuY3Rpb25zXHJcbiAgICAgICAgICAncmVhZHlGdW5jdGlvbic6ICd2aWRlb2pzLkZsYXNoLm9uUmVhZHknLFxyXG4gICAgICAgICAgJ2V2ZW50UHJveHlGdW5jdGlvbic6ICd2aWRlb2pzLkZsYXNoLm9uRXZlbnQnLFxyXG4gICAgICAgICAgJ2Vycm9yRXZlbnRQcm94eUZ1bmN0aW9uJzogJ3ZpZGVvanMuRmxhc2gub25FcnJvcicsXHJcblxyXG4gICAgICAgICAgLy8gUGxheWVyIFNldHRpbmdzXHJcbiAgICAgICAgICAnYXV0b3BsYXknOiBwbGF5ZXJPcHRpb25zLmF1dG9wbGF5LFxyXG4gICAgICAgICAgJ3ByZWxvYWQnOiBwbGF5ZXJPcHRpb25zLnByZWxvYWQsXHJcbiAgICAgICAgICAnbG9vcCc6IHBsYXllck9wdGlvbnMubG9vcCxcclxuICAgICAgICAgICdtdXRlZCc6IHBsYXllck9wdGlvbnMubXV0ZWRcclxuXHJcbiAgICAgICAgfSwgb3B0aW9uc1snZmxhc2hWYXJzJ10pLFxyXG5cclxuICAgICAgICAvLyBNZXJnZSBkZWZhdWx0IHBhcmFtZXMgd2l0aCBvbmVzIHBhc3NlZCBpblxyXG4gICAgICAgIHBhcmFtcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgICAgICAgJ3dtb2RlJzogJ29wYXF1ZScsIC8vIE9wYXF1ZSBpcyBuZWVkZWQgdG8gb3ZlcmxheSBjb250cm9scywgYnV0IGNhbiBhZmZlY3QgcGxheWJhY2sgcGVyZm9ybWFuY2VcclxuICAgICAgICAgICdiZ2NvbG9yJzogJyMwMDAwMDAnIC8vIFVzaW5nIGJnY29sb3IgcHJldmVudHMgYSB3aGl0ZSBmbGFzaCB3aGVuIHRoZSBvYmplY3QgaXMgbG9hZGluZ1xyXG4gICAgICAgIH0sIG9wdGlvbnNbJ3BhcmFtcyddKSxcclxuXHJcbiAgICAgICAgLy8gTWVyZ2UgZGVmYXVsdCBhdHRyaWJ1dGVzIHdpdGggb25lcyBwYXNzZWQgaW5cclxuICAgICAgICBhdHRyaWJ1dGVzID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICAgICAgICAnaWQnOiBvYmpJZCxcclxuICAgICAgICAgICduYW1lJzogb2JqSWQsIC8vIEJvdGggSUQgYW5kIE5hbWUgbmVlZGVkIG9yIHN3ZiB0byBpZGVudGlmdHkgaXRzZWxmXHJcbiAgICAgICAgICAnY2xhc3MnOiAndmpzLXRlY2gnXHJcbiAgICAgICAgfSwgb3B0aW9uc1snYXR0cmlidXRlcyddKVxyXG4gICAgO1xyXG5cclxuICAgIC8vIElmIHNvdXJjZSB3YXMgc3VwcGxpZWQgcGFzcyBhcyBhIGZsYXNoIHZhci5cclxuICAgIGlmIChzb3VyY2UpIHtcclxuICAgICAgaWYgKHNvdXJjZS50eXBlICYmIHZqcy5GbGFzaC5pc1N0cmVhbWluZ1R5cGUoc291cmNlLnR5cGUpKSB7XHJcbiAgICAgICAgdmFyIHBhcnRzID0gdmpzLkZsYXNoLnN0cmVhbVRvUGFydHMoc291cmNlLnNyYyk7XHJcbiAgICAgICAgZmxhc2hWYXJzWydydG1wQ29ubmVjdGlvbiddID0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcnRzLmNvbm5lY3Rpb24pO1xyXG4gICAgICAgIGZsYXNoVmFyc1sncnRtcFN0cmVhbSddID0gZW5jb2RlVVJJQ29tcG9uZW50KHBhcnRzLnN0cmVhbSk7XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSB7XHJcbiAgICAgICAgZmxhc2hWYXJzWydzcmMnXSA9IGVuY29kZVVSSUNvbXBvbmVudCh2anMuZ2V0QWJzb2x1dGVVUkwoc291cmNlLnNyYykpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQWRkIHBsYWNlaG9sZGVyIHRvIHBsYXllciBkaXZcclxuICAgIHZqcy5pbnNlcnRGaXJzdChwbGFjZUhvbGRlciwgcGFyZW50RWwpO1xyXG5cclxuICAgIC8vIEhhdmluZyBpc3N1ZXMgd2l0aCBGbGFzaCByZWxvYWRpbmcgb24gY2VydGFpbiBwYWdlIGFjdGlvbnMgKGhpZGUvcmVzaXplL2Z1bGxzY3JlZW4pIGluIGNlcnRhaW4gYnJvd3NlcnNcclxuICAgIC8vIFRoaXMgYWxsb3dzIHJlc2V0dGluZyB0aGUgcGxheWhlYWQgd2hlbiB3ZSBjYXRjaCB0aGUgcmVsb2FkXHJcbiAgICBpZiAob3B0aW9uc1snc3RhcnRUaW1lJ10pIHtcclxuICAgICAgdGhpcy5yZWFkeShmdW5jdGlvbigpe1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFRpbWUob3B0aW9uc1snc3RhcnRUaW1lJ10pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGbGFzaCBpRnJhbWUgTW9kZVxyXG4gICAgLy8gSW4gd2ViIGJyb3dzZXJzIHRoZXJlIGFyZSBtdWx0aXBsZSBpbnN0YW5jZXMgd2hlcmUgY2hhbmdpbmcgdGhlIHBhcmVudCBlbGVtZW50IG9yIHZpc2liaWxpdHkgb2YgYSBwbHVnaW4gY2F1c2VzIHRoZSBwbHVnaW4gdG8gcmVsb2FkLlxyXG4gICAgLy8gLSBGaXJlZm94IGp1c3QgYWJvdXQgYWx3YXlzLiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MDI2OCAobWlnaHQgYmUgZml4ZWQgYnkgdmVyc2lvbiAxMylcclxuICAgIC8vIC0gV2Via2l0IHdoZW4gaGlkaW5nIHRoZSBwbHVnaW5cclxuICAgIC8vIC0gV2Via2l0IGFuZCBGaXJlZm94IHdoZW4gdXNpbmcgcmVxdWVzdEZ1bGxTY3JlZW4gb24gYSBwYXJlbnQgZWxlbWVudFxyXG4gICAgLy8gTG9hZGluZyB0aGUgZmxhc2ggcGx1Z2luIGludG8gYSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgaUZyYW1lIGdldHMgYXJvdW5kIG1vc3Qgb2YgdGhlc2UgaXNzdWVzLlxyXG4gICAgLy8gSXNzdWVzIHRoYXQgcmVtYWluIGluY2x1ZGUgaGlkaW5nIHRoZSBlbGVtZW50IGFuZCByZXF1ZXN0RnVsbFNjcmVlbiBpbiBGaXJlZm94IHNwZWNpZmljYWxseVxyXG5cclxuICAgIC8vIFRoZXJlJ3Mgb24gcGFydGljdWxhcmx5IGFubm95aW5nIGlzc3VlIHdpdGggdGhpcyBtZXRob2Qgd2hpY2ggaXMgdGhhdCBGaXJlZm94IHRocm93cyBhIHNlY3VyaXR5IGVycm9yIG9uIGFuIG9mZnNpdGUgRmxhc2ggb2JqZWN0IGxvYWRlZCBpbnRvIGEgZHluYW1pY2FsbHkgY3JlYXRlZCBpRnJhbWUuXHJcbiAgICAvLyBFdmVuIHRob3VnaCB0aGUgaWZyYW1lIHdhcyBpbnNlcnRlZCBpbnRvIGEgcGFnZSBvbiB0aGUgd2ViLCBGaXJlZm94ICsgRmxhc2ggY29uc2lkZXJzIGl0IGEgbG9jYWwgYXBwIHRyeWluZyB0byBhY2Nlc3MgYW4gaW50ZXJuZXQgZmlsZS5cclxuICAgIC8vIEkgdHJpZWQgbXVsaXRwbGUgd2F5cyBvZiBzZXR0aW5nIHRoZSBpZnJhbWUgc3JjIGF0dHJpYnV0ZSBidXQgY291bGRuJ3QgZmluZCBhIHNyYyB0aGF0IHdvcmtlZCB3ZWxsLiBUcmllZCBhIHJlYWwvZmFrZSBzb3VyY2UsIGluL291dCBvZiBkb21haW4uXHJcbiAgICAvLyBBbHNvIHRyaWVkIGEgbWV0aG9kIGZyb20gc3RhY2tvdmVyZmxvdyB0aGF0IGNhdXNlZCBhIHNlY3VyaXR5IGVycm9yIGluIGFsbCBicm93c2Vycy4gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8yNDg2OTAxL2hvdy10by1zZXQtZG9jdW1lbnQtZG9tYWluLWZvci1hLWR5bmFtaWNhbGx5LWdlbmVyYXRlZC1pZnJhbWVcclxuICAgIC8vIEluIHRoZSBlbmQgdGhlIHNvbHV0aW9uIEkgZm91bmQgdG8gd29yayB3YXMgc2V0dGluZyB0aGUgaWZyYW1lIHdpbmRvdy5sb2NhdGlvbi5ocmVmIHJpZ2h0IGJlZm9yZSBkb2luZyBhIGRvY3VtZW50LndyaXRlIG9mIHRoZSBGbGFzaCBvYmplY3QuXHJcbiAgICAvLyBUaGUgb25seSBkb3duc2lkZSBvZiB0aGlzIGl0IHNlZW1zIHRvIHRyaWdnZXIgYW5vdGhlciBodHRwIHJlcXVlc3QgdG8gdGhlIG9yaWdpbmFsIHBhZ2UgKG5vIG1hdHRlciB3aGF0J3MgcHV0IGluIHRoZSBocmVmKS4gTm90IHN1cmUgd2h5IHRoYXQgaXMuXHJcblxyXG4gICAgLy8gTk9URSAoMjAxMi0wMS0yOSk6IENhbm5vdCBnZXQgRmlyZWZveCB0byBsb2FkIHRoZSByZW1vdGUgaG9zdGVkIFNXRiBpbnRvIGEgZHluYW1pY2FsbHkgY3JlYXRlZCBpRnJhbWVcclxuICAgIC8vIEZpcmVmb3ggOSB0aHJvd3MgYSBzZWN1cml0eSBlcnJvciwgdW5sZWVzcyB5b3UgY2FsbCBsb2NhdGlvbi5ocmVmIHJpZ2h0IGJlZm9yZSBkb2Mud3JpdGUuXHJcbiAgICAvLyAgICBOb3Qgc3VyZSB3aHkgdGhhdCBldmVuIHdvcmtzLCBidXQgaXQgY2F1c2VzIHRoZSBicm93c2VyIHRvIGxvb2sgbGlrZSBpdCdzIGNvbnRpbnVvdXNseSB0cnlpbmcgdG8gbG9hZCB0aGUgcGFnZS5cclxuICAgIC8vIEZpcmVmb3ggMy42IGtlZXBzIGNhbGxpbmcgdGhlIGlmcmFtZSBvbmxvYWQgZnVuY3Rpb24gYW55dGltZSBJIHdyaXRlIHRvIGl0LCBjYXVzaW5nIGFuIGVuZGxlc3MgbG9vcC5cclxuXHJcbiAgICBpZiAob3B0aW9uc1snaUZyYW1lTW9kZSddID09PSB0cnVlICYmICF2anMuSVNfRklSRUZPWCkge1xyXG5cclxuICAgICAgLy8gQ3JlYXRlIGlGcmFtZSB3aXRoIHZqcy10ZWNoIGNsYXNzIHNvIGl0J3MgMTAwJSB3aWR0aC9oZWlnaHRcclxuICAgICAgdmFyIGlGcm0gPSB2anMuY3JlYXRlRWwoJ2lmcmFtZScsIHtcclxuICAgICAgICAnaWQnOiBvYmpJZCArICdfaWZyYW1lJyxcclxuICAgICAgICAnbmFtZSc6IG9iaklkICsgJ19pZnJhbWUnLFxyXG4gICAgICAgICdjbGFzc05hbWUnOiAndmpzLXRlY2gnLFxyXG4gICAgICAgICdzY3JvbGxpbmcnOiAnbm8nLFxyXG4gICAgICAgICdtYXJnaW5XaWR0aCc6IDAsXHJcbiAgICAgICAgJ21hcmdpbkhlaWdodCc6IDAsXHJcbiAgICAgICAgJ2ZyYW1lQm9yZGVyJzogMFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIFVwZGF0ZSByZWFkeSBmdW5jdGlvbiBuYW1lcyBpbiBmbGFzaCB2YXJzIGZvciBpZnJhbWUgd2luZG93XHJcbiAgICAgIGZsYXNoVmFyc1sncmVhZHlGdW5jdGlvbiddID0gJ3JlYWR5JztcclxuICAgICAgZmxhc2hWYXJzWydldmVudFByb3h5RnVuY3Rpb24nXSA9ICdldmVudHMnO1xyXG4gICAgICBmbGFzaFZhcnNbJ2Vycm9yRXZlbnRQcm94eUZ1bmN0aW9uJ10gPSAnZXJyb3JzJztcclxuXHJcbiAgICAgIC8vIFRyaWVkIG11bHRpcGxlIG1ldGhvZHMgdG8gZ2V0IHRoaXMgdG8gd29yayBpbiBhbGwgYnJvd3NlcnNcclxuXHJcbiAgICAgIC8vIFRyaWVkIGVtYmVkZGluZyB0aGUgZmxhc2ggb2JqZWN0IGluIHRoZSBwYWdlIGZpcnN0LCBhbmQgdGhlbiBhZGRpbmcgYSBwbGFjZSBob2xkZXIgdG8gdGhlIGlmcmFtZSwgdGhlbiByZXBsYWNpbmcgdGhlIHBsYWNlaG9sZGVyIHdpdGggdGhlIHBhZ2Ugb2JqZWN0LlxyXG4gICAgICAvLyBUaGUgZ29hbCBoZXJlIHdhcyB0byB0cnkgdG8gbG9hZCB0aGUgc3dmIFVSTCBpbiB0aGUgcGFyZW50IHBhZ2UgZmlyc3QgYW5kIGhvcGUgdGhhdCBnb3QgYXJvdW5kIHRoZSBmaXJlZm94IHNlY3VyaXR5IGVycm9yXHJcbiAgICAgIC8vIHZhciBuZXdPYmogPSB2anMuRmxhc2guZW1iZWQob3B0aW9uc1snc3dmJ10sIHBsYWNlSG9sZGVyLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyk7XHJcbiAgICAgIC8vIChpbiBvbmxvYWQpXHJcbiAgICAgIC8vICB2YXIgdGVtcCA9IHZqcy5jcmVhdGVFbCgnYScsIHsgaWQ6J2FzZGYnLCBpbm5lckhUTUw6ICdhc2RmJyB9ICk7XHJcbiAgICAgIC8vICBpRG9jLmJvZHkuYXBwZW5kQ2hpbGQodGVtcCk7XHJcblxyXG4gICAgICAvLyBUcmllZCBlbWJlZGRpbmcgdGhlIGZsYXNoIG9iamVjdCB0aHJvdWdoIGphdmFzY3JpcHQgaW4gdGhlIGlmcmFtZSBzb3VyY2UuXHJcbiAgICAgIC8vIFRoaXMgd29ya3MgaW4gd2Via2l0IGJ1dCBzdGlsbCB0cmlnZ2VycyB0aGUgZmlyZWZveCBzZWN1cml0eSBlcnJvclxyXG4gICAgICAvLyBpRnJtLnNyYyA9ICdqYXZhc2NyaXB0OiBkb2N1bWVudC53cml0ZSgnXCIrdmpzLkZsYXNoLmdldEVtYmVkQ29kZShvcHRpb25zWydzd2YnXSwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpK1wiJyk7XCI7XHJcblxyXG4gICAgICAvLyBUcmllZCBhbiBhY3R1YWwgbG9jYWwgaWZyYW1lIGp1c3QgdG8gbWFrZSBzdXJlIHRoYXQgd29ya3MsIGJ1dCBpdCBraWxscyB0aGUgZWFzaW5lc3Mgb2YgdGhlIENETiB2ZXJzaW9uIGlmIHlvdSByZXF1aXJlIHRoZSB1c2VyIHRvIGhvc3QgYW4gaWZyYW1lXHJcbiAgICAgIC8vIFdlIHNob3VsZCBhZGQgYW4gb3B0aW9uIHRvIGhvc3QgdGhlIGlmcmFtZSBsb2NhbGx5IHRob3VnaCwgYmVjYXVzZSBpdCBjb3VsZCBoZWxwIGEgbG90IG9mIGlzc3Vlcy5cclxuICAgICAgLy8gaUZybS5zcmMgPSBcImlmcmFtZS5odG1sXCI7XHJcblxyXG4gICAgICAvLyBXYWl0IHVudGlsIGlGcmFtZSBoYXMgbG9hZGVkIHRvIHdyaXRlIGludG8gaXQuXHJcbiAgICAgIHZqcy5vbihpRnJtLCAnbG9hZCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBpRG9jLFxyXG4gICAgICAgICAgICBpV2luID0gaUZybS5jb250ZW50V2luZG93O1xyXG5cclxuICAgICAgICAvLyBUaGUgb25lIHdvcmtpbmcgbWV0aG9kIEkgZm91bmQgd2FzIHRvIHVzZSB0aGUgaWZyYW1lJ3MgZG9jdW1lbnQud3JpdGUoKSB0byBjcmVhdGUgdGhlIHN3ZiBvYmplY3RcclxuICAgICAgICAvLyBUaGlzIGdvdCBhcm91bmQgdGhlIHNlY3VyaXR5IGlzc3VlIGluIGFsbCBicm93c2VycyBleGNlcHQgZmlyZWZveC5cclxuICAgICAgICAvLyBJIGRpZCBmaW5kIGEgaGFjayB3aGVyZSBpZiBJIGNhbGwgdGhlIGlmcmFtZSdzIHdpbmRvdy5sb2NhdGlvbi5ocmVmPScnLCBpdCB3b3VsZCBnZXQgYXJvdW5kIHRoZSBzZWN1cml0eSBlcnJvclxyXG4gICAgICAgIC8vIEhvd2V2ZXIsIHRoZSBtYWluIHBhZ2Ugd291bGQgbG9vayBsaWtlIGl0IHdhcyBsb2FkaW5nIGluZGVmaW5pdGVseSAoVVJMIGJhciBsb2FkaW5nIHNwaW5uZXIgd291bGQgbmV2ZXIgc3RvcClcclxuICAgICAgICAvLyBQbHVzIEZpcmVmb3ggMy42IGRpZG4ndCB3b3JrIG5vIG1hdHRlciB3aGF0IEkgdHJpZWQuXHJcbiAgICAgICAgLy8gaWYgKHZqcy5VU0VSX0FHRU5ULm1hdGNoKCdGaXJlZm94JykpIHtcclxuICAgICAgICAvLyAgIGlXaW4ubG9jYXRpb24uaHJlZiA9ICcnO1xyXG4gICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBpRnJhbWUncyBkb2N1bWVudCBkZXBlbmRpbmcgb24gd2hhdCB0aGUgYnJvd3NlciBzdXBwb3J0c1xyXG4gICAgICAgIGlEb2MgPSBpRnJtLmNvbnRlbnREb2N1bWVudCA/IGlGcm0uY29udGVudERvY3VtZW50IDogaUZybS5jb250ZW50V2luZG93LmRvY3VtZW50O1xyXG5cclxuICAgICAgICAvLyBUcmllZCBlbnN1cmluZyBib3RoIGRvY3VtZW50IGRvbWFpbnMgd2VyZSB0aGUgc2FtZSwgYnV0IHRoZXkgYWxyZWFkeSB3ZXJlLCBzbyB0aGF0IHdhc24ndCB0aGUgaXNzdWUuXHJcbiAgICAgICAgLy8gRXZlbiB0cmllZCBhZGRpbmcgLy4gdGhhdCB3YXMgbWVudGlvbmVkIGluIGEgYnJvd3NlciBzZWN1cml0eSB3cml0ZXVwXHJcbiAgICAgICAgLy8gZG9jdW1lbnQuZG9tYWluID0gZG9jdW1lbnQuZG9tYWluKycvLic7XHJcbiAgICAgICAgLy8gaURvYy5kb21haW4gPSBkb2N1bWVudC5kb21haW4rJy8uJztcclxuXHJcbiAgICAgICAgLy8gVHJpZWQgYWRkaW5nIHRoZSBvYmplY3QgdG8gdGhlIGlmcmFtZSBkb2MncyBpbm5lckhUTUwuIFNlY3VyaXR5IGVycm9yIGluIGFsbCBicm93c2Vycy5cclxuICAgICAgICAvLyBpRG9jLmJvZHkuaW5uZXJIVE1MID0gc3dmT2JqZWN0SFRNTDtcclxuXHJcbiAgICAgICAgLy8gVHJpZWQgYXBwZW5kaW5nIHRoZSBvYmplY3QgdG8gdGhlIGlmcmFtZSBkb2MncyBib2R5LiBTZWN1cml0eSBlcnJvciBpbiBhbGwgYnJvd3NlcnMuXHJcbiAgICAgICAgLy8gaURvYy5ib2R5LmFwcGVuZENoaWxkKHN3Zk9iamVjdCk7XHJcblxyXG4gICAgICAgIC8vIFVzaW5nIGRvY3VtZW50LndyaXRlIGFjdHVhbGx5IGdvdCBhcm91bmQgdGhlIHNlY3VyaXR5IGVycm9yIHRoYXQgYnJvd3NlcnMgd2VyZSB0aHJvd2luZy5cclxuICAgICAgICAvLyBBZ2FpbiwgaXQncyBhIGR5bmFtaWNhbGx5IGdlbmVyYXRlZCAoc2FtZSBkb21haW4pIGlmcmFtZSwgbG9hZGluZyBhbiBleHRlcm5hbCBGbGFzaCBzd2YuXHJcbiAgICAgICAgLy8gTm90IHN1cmUgd2h5IHRoYXQncyBhIHNlY3VyaXR5IGlzc3VlLCBidXQgYXBwYXJlbnRseSBpdCBpcy5cclxuICAgICAgICBpRG9jLndyaXRlKHZqcy5GbGFzaC5nZXRFbWJlZENvZGUob3B0aW9uc1snc3dmJ10sIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKSk7XHJcblxyXG4gICAgICAgIC8vIFNldHRpbmcgdmFyaWFibGVzIG9uIHRoZSB3aW5kb3cgbmVlZHMgdG8gY29tZSBhZnRlciB0aGUgZG9jIHdyaXRlIGJlY2F1c2Ugb3RoZXJ3aXNlIHRoZXkgY2FuIGdldCByZXNldCBpbiBzb21lIGJyb3dzZXJzXHJcbiAgICAgICAgLy8gU28gZmFyIG5vIGlzc3VlcyB3aXRoIHN3ZiByZWFkeSBldmVudCBiZWluZyBjYWxsZWQgYmVmb3JlIGl0J3Mgc2V0IG9uIHRoZSB3aW5kb3cuXHJcbiAgICAgICAgaVdpblsncGxheWVyJ10gPSB0aGlzLnBsYXllcl87XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBzd2YgcmVhZHkgZnVuY3Rpb24gZm9yIGlGcmFtZSB3aW5kb3dcclxuICAgICAgICBpV2luWydyZWFkeSddID0gdmpzLmJpbmQodGhpcy5wbGF5ZXJfLCBmdW5jdGlvbihjdXJyU3dmKXtcclxuICAgICAgICAgIHZhciBlbCA9IGlEb2MuZ2V0RWxlbWVudEJ5SWQoY3VyclN3ZiksXHJcbiAgICAgICAgICAgICAgcGxheWVyID0gdGhpcyxcclxuICAgICAgICAgICAgICB0ZWNoID0gcGxheWVyLnRlY2g7XHJcblxyXG4gICAgICAgICAgLy8gVXBkYXRlIHJlZmVyZW5jZSB0byBwbGF5YmFjayB0ZWNobm9sb2d5IGVsZW1lbnRcclxuICAgICAgICAgIHRlY2guZWxfID0gZWw7XHJcblxyXG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHN3ZiBpcyBhY3R1YWxseSByZWFkeS4gU29tZXRpbWVzIHRoZSBBUEkgaXNuJ3QgYWN0dWFsbHkgeWV0LlxyXG4gICAgICAgICAgdmpzLkZsYXNoLmNoZWNrUmVhZHkodGVjaCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBldmVudCBsaXN0ZW5lciBmb3IgYWxsIHN3ZiBldmVudHNcclxuICAgICAgICBpV2luWydldmVudHMnXSA9IHZqcy5iaW5kKHRoaXMucGxheWVyXywgZnVuY3Rpb24oc3dmSUQsIGV2ZW50TmFtZSl7XHJcbiAgICAgICAgICB2YXIgcGxheWVyID0gdGhpcztcclxuICAgICAgICAgIGlmIChwbGF5ZXIgJiYgcGxheWVyLnRlY2hOYW1lID09PSAnZmxhc2gnKSB7XHJcbiAgICAgICAgICAgIHBsYXllci50cmlnZ2VyKGV2ZW50TmFtZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBlcnJvciBsaXN0ZW5lciBmb3IgYWxsIHN3ZiBlcnJvcnNcclxuICAgICAgICBpV2luWydlcnJvcnMnXSA9IHZqcy5iaW5kKHRoaXMucGxheWVyXywgZnVuY3Rpb24oc3dmSUQsIGV2ZW50TmFtZSl7XHJcbiAgICAgICAgICB2anMubG9nKCdGbGFzaCBFcnJvcicsIGV2ZW50TmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICB9KSk7XHJcblxyXG4gICAgICAvLyBSZXBsYWNlIHBsYWNlaG9sZGVyIHdpdGggaUZyYW1lIChpdCB3aWxsIGxvYWQgbm93KVxyXG4gICAgICBwbGFjZUhvbGRlci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChpRnJtLCBwbGFjZUhvbGRlcik7XHJcblxyXG4gICAgLy8gSWYgbm90IHVzaW5nIGlGcmFtZSBtb2RlLCBlbWJlZCBhcyBub3JtYWwgb2JqZWN0XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB2anMuRmxhc2guZW1iZWQob3B0aW9uc1snc3dmJ10sIHBsYWNlSG9sZGVyLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmRpc3Bvc2UuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8udmpzX3BsYXkoKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnZqc19wYXVzZSgpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbihzcmMpe1xyXG4gIGlmICh2anMuRmxhc2guaXNTdHJlYW1pbmdTcmMoc3JjKSkge1xyXG4gICAgc3JjID0gdmpzLkZsYXNoLnN0cmVhbVRvUGFydHMoc3JjKTtcclxuICAgIHRoaXMuc2V0UnRtcENvbm5lY3Rpb24oc3JjLmNvbm5lY3Rpb24pO1xyXG4gICAgdGhpcy5zZXRSdG1wU3RyZWFtKHNyYy5zdHJlYW0pO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIC8vIE1ha2Ugc3VyZSBzb3VyY2UgVVJMIGlzIGFib3NvbHV0ZS5cclxuICAgIHNyYyA9IHZqcy5nZXRBYnNvbHV0ZVVSTChzcmMpO1xyXG4gICAgdGhpcy5lbF8udmpzX3NyYyhzcmMpO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3VycmVudGx5IHRoZSBTV0YgZG9lc24ndCBhdXRvcGxheSBpZiB5b3UgbG9hZCBhIHNvdXJjZSBsYXRlci5cclxuICAvLyBlLmcuIExvYWQgcGxheWVyIHcvIG5vIHNvdXJjZSwgd2FpdCAycywgc2V0IHNyYy5cclxuICBpZiAodGhpcy5wbGF5ZXJfLmF1dG9wbGF5KCkpIHtcclxuICAgIHZhciB0ZWNoID0gdGhpcztcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXsgdGVjaC5wbGF5KCk7IH0sIDApO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuY3VycmVudFNyYyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHNyYyA9IHRoaXMuZWxfLnZqc19nZXRQcm9wZXJ0eSgnY3VycmVudFNyYycpO1xyXG4gIC8vIG5vIHNyYywgY2hlY2sgYW5kIHNlZSBpZiBSVE1QXHJcbiAgaWYgKHNyYyA9PSBudWxsKSB7XHJcbiAgICB2YXIgY29ubmVjdGlvbiA9IHRoaXMucnRtcENvbm5lY3Rpb24oKSxcclxuICAgICAgICBzdHJlYW0gPSB0aGlzLnJ0bXBTdHJlYW0oKTtcclxuXHJcbiAgICBpZiAoY29ubmVjdGlvbiAmJiBzdHJlYW0pIHtcclxuICAgICAgc3JjID0gdmpzLkZsYXNoLnN0cmVhbUZyb21QYXJ0cyhjb25uZWN0aW9uLCBzdHJlYW0pO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gc3JjO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy52anNfbG9hZCgpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5wb3N0ZXIgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnZqc19nZXRQcm9wZXJ0eSgncG9zdGVyJyk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLmJ1ZmZlcmVkID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLmNyZWF0ZVRpbWVSYW5nZSgwLCB0aGlzLmVsXy52anNfZ2V0UHJvcGVydHkoJ2J1ZmZlcmVkJykpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5zdXBwb3J0c0Z1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiBmYWxzZTsgLy8gRmxhc2ggZG9lcyBub3QgYWxsb3cgZnVsbHNjcmVlbiB0aHJvdWdoIGphdmFzY3JpcHRcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuZW50ZXJGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gZmFsc2U7XHJcbn07XHJcblxyXG5cclxuLy8gQ3JlYXRlIHNldHRlcnMgYW5kIGdldHRlcnMgZm9yIGF0dHJpYnV0ZXNcclxudmFyIGFwaSA9IHZqcy5GbGFzaC5wcm90b3R5cGUsXHJcbiAgICByZWFkV3JpdGUgPSAncnRtcENvbm5lY3Rpb24scnRtcFN0cmVhbSxwcmVsb2FkLGN1cnJlbnRUaW1lLGRlZmF1bHRQbGF5YmFja1JhdGUscGxheWJhY2tSYXRlLGF1dG9wbGF5LGxvb3AsbWVkaWFHcm91cCxjb250cm9sbGVyLGNvbnRyb2xzLHZvbHVtZSxtdXRlZCxkZWZhdWx0TXV0ZWQnLnNwbGl0KCcsJyksXHJcbiAgICByZWFkT25seSA9ICdlcnJvcixjdXJyZW50U3JjLG5ldHdvcmtTdGF0ZSxyZWFkeVN0YXRlLHNlZWtpbmcsaW5pdGlhbFRpbWUsZHVyYXRpb24sc3RhcnRPZmZzZXRUaW1lLHBhdXNlZCxwbGF5ZWQsc2Vla2FibGUsZW5kZWQsdmlkZW9UcmFja3MsYXVkaW9UcmFja3MsdmlkZW9XaWR0aCx2aWRlb0hlaWdodCx0ZXh0VHJhY2tzJy5zcGxpdCgnLCcpO1xyXG4gICAgLy8gT3ZlcnJpZGRlbjogYnVmZmVyZWRcclxuXHJcbi8qKlxyXG4gKiBAdGhpcyB7Kn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZhciBjcmVhdGVTZXR0ZXIgPSBmdW5jdGlvbihhdHRyKXtcclxuICB2YXIgYXR0clVwcGVyID0gYXR0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGF0dHIuc2xpY2UoMSk7XHJcbiAgYXBpWydzZXQnK2F0dHJVcHBlcl0gPSBmdW5jdGlvbih2YWwpeyByZXR1cm4gdGhpcy5lbF8udmpzX3NldFByb3BlcnR5KGF0dHIsIHZhbCk7IH07XHJcbn07XHJcblxyXG4vKipcclxuICogQHRoaXMgeyp9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgY3JlYXRlR2V0dGVyID0gZnVuY3Rpb24oYXR0cil7XHJcbiAgYXBpW2F0dHJdID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnZqc19nZXRQcm9wZXJ0eShhdHRyKTsgfTtcclxufTtcclxuXHJcbihmdW5jdGlvbigpe1xyXG4gIHZhciBpO1xyXG4gIC8vIENyZWF0ZSBnZXR0ZXIgYW5kIHNldHRlcnMgZm9yIGFsbCByZWFkL3dyaXRlIGF0dHJpYnV0ZXNcclxuICBmb3IgKGkgPSAwOyBpIDwgcmVhZFdyaXRlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjcmVhdGVHZXR0ZXIocmVhZFdyaXRlW2ldKTtcclxuICAgIGNyZWF0ZVNldHRlcihyZWFkV3JpdGVbaV0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQ3JlYXRlIGdldHRlcnMgZm9yIHJlYWQtb25seSBhdHRyaWJ1dGVzXHJcbiAgZm9yIChpID0gMDsgaSA8IHJlYWRPbmx5Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjcmVhdGVHZXR0ZXIocmVhZE9ubHlbaV0pO1xyXG4gIH1cclxufSkoKTtcclxuXHJcbi8qIEZsYXNoIFN1cHBvcnQgVGVzdGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xyXG5cclxudmpzLkZsYXNoLmlzU3VwcG9ydGVkID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkZsYXNoLnZlcnNpb24oKVswXSA+PSAxMDtcclxuICAvLyByZXR1cm4gc3dmb2JqZWN0Lmhhc0ZsYXNoUGxheWVyVmVyc2lvbignMTAnKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5jYW5QbGF5U291cmNlID0gZnVuY3Rpb24oc3JjT2JqKXtcclxuICB2YXIgdHlwZTtcclxuXHJcbiAgaWYgKCFzcmNPYmoudHlwZSkge1xyXG4gICAgcmV0dXJuICcnO1xyXG4gIH1cclxuXHJcbiAgdHlwZSA9IHNyY09iai50eXBlLnJlcGxhY2UoLzsuKi8sJycpLnRvTG93ZXJDYXNlKCk7XHJcbiAgaWYgKHR5cGUgaW4gdmpzLkZsYXNoLmZvcm1hdHMgfHwgdHlwZSBpbiB2anMuRmxhc2guc3RyZWFtaW5nRm9ybWF0cykge1xyXG4gICAgcmV0dXJuICdtYXliZSc7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLkZsYXNoLmZvcm1hdHMgPSB7XHJcbiAgJ3ZpZGVvL2Zsdic6ICdGTFYnLFxyXG4gICd2aWRlby94LWZsdic6ICdGTFYnLFxyXG4gICd2aWRlby9tcDQnOiAnTVA0JyxcclxuICAndmlkZW8vbTR2JzogJ01QNCdcclxufTtcclxuXHJcbnZqcy5GbGFzaC5zdHJlYW1pbmdGb3JtYXRzID0ge1xyXG4gICdydG1wL21wNCc6ICdNUDQnLFxyXG4gICdydG1wL2Zsdic6ICdGTFYnXHJcbn07XHJcblxyXG52anMuRmxhc2hbJ29uUmVhZHknXSA9IGZ1bmN0aW9uKGN1cnJTd2Ype1xyXG4gIHZhciBlbCA9IHZqcy5lbChjdXJyU3dmKTtcclxuXHJcbiAgLy8gR2V0IHBsYXllciBmcm9tIGJveFxyXG4gIC8vIE9uIGZpcmVmb3ggcmVsb2FkcywgZWwgbWlnaHQgYWxyZWFkeSBoYXZlIGEgcGxheWVyXHJcbiAgdmFyIHBsYXllciA9IGVsWydwbGF5ZXInXSB8fCBlbC5wYXJlbnROb2RlWydwbGF5ZXInXSxcclxuICAgICAgdGVjaCA9IHBsYXllci50ZWNoO1xyXG5cclxuICAvLyBSZWZlcmVuY2UgcGxheWVyIG9uIHRlY2ggZWxlbWVudFxyXG4gIGVsWydwbGF5ZXInXSA9IHBsYXllcjtcclxuXHJcbiAgLy8gVXBkYXRlIHJlZmVyZW5jZSB0byBwbGF5YmFjayB0ZWNobm9sb2d5IGVsZW1lbnRcclxuICB0ZWNoLmVsXyA9IGVsO1xyXG5cclxuICB2anMuRmxhc2guY2hlY2tSZWFkeSh0ZWNoKTtcclxufTtcclxuXHJcbi8vIFRoZSBTV0YgaXNuJ3QgYWx3YXN5IHJlYWR5IHdoZW4gaXQgc2F5cyBpdCBpcy4gU29tZXRpbWVzIHRoZSBBUEkgZnVuY3Rpb25zIHN0aWxsIG5lZWQgdG8gYmUgYWRkZWQgdG8gdGhlIG9iamVjdC5cclxuLy8gSWYgaXQncyBub3QgcmVhZHksIHdlIHNldCBhIHRpbWVvdXQgdG8gY2hlY2sgYWdhaW4gc2hvcnRseS5cclxudmpzLkZsYXNoLmNoZWNrUmVhZHkgPSBmdW5jdGlvbih0ZWNoKXtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgQVBJIHByb3BlcnR5IGV4aXN0c1xyXG4gIGlmICh0ZWNoLmVsKCkudmpzX2dldFByb3BlcnR5KSB7XHJcblxyXG4gICAgLy8gSWYgc28sIHRlbGwgdGVjaCBpdCdzIHJlYWR5XHJcbiAgICB0ZWNoLnRyaWdnZXJSZWFkeSgpO1xyXG5cclxuICAvLyBPdGhlcndpc2Ugd2FpdCBsb25nZXIuXHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZqcy5GbGFzaC5jaGVja1JlYWR5KHRlY2gpO1xyXG4gICAgfSwgNTApO1xyXG5cclxuICB9XHJcbn07XHJcblxyXG4vLyBUcmlnZ2VyIGV2ZW50cyBmcm9tIHRoZSBzd2Ygb24gdGhlIHBsYXllclxyXG52anMuRmxhc2hbJ29uRXZlbnQnXSA9IGZ1bmN0aW9uKHN3ZklELCBldmVudE5hbWUpe1xyXG4gIHZhciBwbGF5ZXIgPSB2anMuZWwoc3dmSUQpWydwbGF5ZXInXTtcclxuICBwbGF5ZXIudHJpZ2dlcihldmVudE5hbWUpO1xyXG59O1xyXG5cclxuLy8gTG9nIGVycm9ycyBmcm9tIHRoZSBzd2ZcclxudmpzLkZsYXNoWydvbkVycm9yJ10gPSBmdW5jdGlvbihzd2ZJRCwgZXJyKXtcclxuICB2YXIgcGxheWVyID0gdmpzLmVsKHN3ZklEKVsncGxheWVyJ107XHJcbiAgcGxheWVyLnRyaWdnZXIoJ2Vycm9yJyk7XHJcbiAgdmpzLmxvZygnRmxhc2ggRXJyb3InLCBlcnIsIHN3ZklEKTtcclxufTtcclxuXHJcbi8vIEZsYXNoIFZlcnNpb24gQ2hlY2tcclxudmpzLkZsYXNoLnZlcnNpb24gPSBmdW5jdGlvbigpe1xyXG4gIHZhciB2ZXJzaW9uID0gJzAsMCwwJztcclxuXHJcbiAgLy8gSUVcclxuICB0cnkge1xyXG4gICAgdmVyc2lvbiA9IG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2gnKS5HZXRWYXJpYWJsZSgnJHZlcnNpb24nKS5yZXBsYWNlKC9cXEQrL2csICcsJykubWF0Y2goL14sPyguKyksPyQvKVsxXTtcclxuXHJcbiAgLy8gb3RoZXIgYnJvd3NlcnNcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmIChuYXZpZ2F0b3IubWltZVR5cGVzWydhcHBsaWNhdGlvbi94LXNob2Nrd2F2ZS1mbGFzaCddLmVuYWJsZWRQbHVnaW4pe1xyXG4gICAgICAgIHZlcnNpb24gPSAobmF2aWdhdG9yLnBsdWdpbnNbJ1Nob2Nrd2F2ZSBGbGFzaCAyLjAnXSB8fCBuYXZpZ2F0b3IucGx1Z2luc1snU2hvY2t3YXZlIEZsYXNoJ10pLmRlc2NyaXB0aW9uLnJlcGxhY2UoL1xcRCsvZywgJywnKS5tYXRjaCgvXiw/KC4rKSw/JC8pWzFdO1xyXG4gICAgICB9XHJcbiAgICB9IGNhdGNoKGVycikge31cclxuICB9XHJcbiAgcmV0dXJuIHZlcnNpb24uc3BsaXQoJywnKTtcclxufTtcclxuXHJcbi8vIEZsYXNoIGVtYmVkZGluZyBtZXRob2QuIE9ubHkgdXNlZCBpbiBub24taWZyYW1lIG1vZGVcclxudmpzLkZsYXNoLmVtYmVkID0gZnVuY3Rpb24oc3dmLCBwbGFjZUhvbGRlciwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpe1xyXG4gIHZhciBjb2RlID0gdmpzLkZsYXNoLmdldEVtYmVkQ29kZShzd2YsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKSxcclxuXHJcbiAgICAgIC8vIEdldCBlbGVtZW50IGJ5IGVtYmVkZGluZyBjb2RlIGFuZCByZXRyaWV2aW5nIGNyZWF0ZWQgZWxlbWVudFxyXG4gICAgICBvYmogPSB2anMuY3JlYXRlRWwoJ2RpdicsIHsgaW5uZXJIVE1MOiBjb2RlIH0pLmNoaWxkTm9kZXNbMF0sXHJcblxyXG4gICAgICBwYXIgPSBwbGFjZUhvbGRlci5wYXJlbnROb2RlXHJcbiAgO1xyXG5cclxuICBwbGFjZUhvbGRlci5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChvYmosIHBsYWNlSG9sZGVyKTtcclxuXHJcbiAgLy8gSUU2IHNlZW1zIHRvIGhhdmUgYW4gaXNzdWUgd2hlcmUgaXQgd29uJ3QgaW5pdGlhbGl6ZSB0aGUgc3dmIG9iamVjdCBhZnRlciBpbmplY3RpbmcgaXQuXHJcbiAgLy8gVGhpcyBpcyBhIGR1bWIgZml4XHJcbiAgdmFyIG5ld09iaiA9IHBhci5jaGlsZE5vZGVzWzBdO1xyXG4gIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgIG5ld09iai5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICB9LCAxMDAwKTtcclxuXHJcbiAgcmV0dXJuIG9iajtcclxuXHJcbn07XHJcblxyXG52anMuRmxhc2guZ2V0RW1iZWRDb2RlID0gZnVuY3Rpb24oc3dmLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyl7XHJcblxyXG4gIHZhciBvYmpUYWcgPSAnPG9iamVjdCB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIicsXHJcbiAgICAgIGZsYXNoVmFyc1N0cmluZyA9ICcnLFxyXG4gICAgICBwYXJhbXNTdHJpbmcgPSAnJyxcclxuICAgICAgYXR0cnNTdHJpbmcgPSAnJztcclxuXHJcbiAgLy8gQ29udmVydCBmbGFzaCB2YXJzIHRvIHN0cmluZ1xyXG4gIGlmIChmbGFzaFZhcnMpIHtcclxuICAgIHZqcy5vYmouZWFjaChmbGFzaFZhcnMsIGZ1bmN0aW9uKGtleSwgdmFsKXtcclxuICAgICAgZmxhc2hWYXJzU3RyaW5nICs9IChrZXkgKyAnPScgKyB2YWwgKyAnJmFtcDsnKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgLy8gQWRkIHN3ZiwgZmxhc2hWYXJzLCBhbmQgb3RoZXIgZGVmYXVsdCBwYXJhbXNcclxuICBwYXJhbXMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgICdtb3ZpZSc6IHN3ZixcclxuICAgICdmbGFzaHZhcnMnOiBmbGFzaFZhcnNTdHJpbmcsXHJcbiAgICAnYWxsb3dTY3JpcHRBY2Nlc3MnOiAnYWx3YXlzJywgLy8gUmVxdWlyZWQgdG8gdGFsayB0byBzd2ZcclxuICAgICdhbGxvd05ldHdvcmtpbmcnOiAnYWxsJyAvLyBBbGwgc2hvdWxkIGJlIGRlZmF1bHQsIGJ1dCBoYXZpbmcgc2VjdXJpdHkgaXNzdWVzLlxyXG4gIH0sIHBhcmFtcyk7XHJcblxyXG4gIC8vIENyZWF0ZSBwYXJhbSB0YWdzIHN0cmluZ1xyXG4gIHZqcy5vYmouZWFjaChwYXJhbXMsIGZ1bmN0aW9uKGtleSwgdmFsKXtcclxuICAgIHBhcmFtc1N0cmluZyArPSAnPHBhcmFtIG5hbWU9XCInK2tleSsnXCIgdmFsdWU9XCInK3ZhbCsnXCIgLz4nO1xyXG4gIH0pO1xyXG5cclxuICBhdHRyaWJ1dGVzID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICAvLyBBZGQgc3dmIHRvIGF0dHJpYnV0ZXMgKG5lZWQgYm90aCBmb3IgSUUgYW5kIE90aGVycyB0byB3b3JrKVxyXG4gICAgJ2RhdGEnOiBzd2YsXHJcblxyXG4gICAgLy8gRGVmYXVsdCB0byAxMDAlIHdpZHRoL2hlaWdodFxyXG4gICAgJ3dpZHRoJzogJzEwMCUnLFxyXG4gICAgJ2hlaWdodCc6ICcxMDAlJ1xyXG5cclxuICB9LCBhdHRyaWJ1dGVzKTtcclxuXHJcbiAgLy8gQ3JlYXRlIEF0dHJpYnV0ZXMgc3RyaW5nXHJcbiAgdmpzLm9iai5lYWNoKGF0dHJpYnV0ZXMsIGZ1bmN0aW9uKGtleSwgdmFsKXtcclxuICAgIGF0dHJzU3RyaW5nICs9IChrZXkgKyAnPVwiJyArIHZhbCArICdcIiAnKTtcclxuICB9KTtcclxuXHJcbiAgcmV0dXJuIG9ialRhZyArIGF0dHJzU3RyaW5nICsgJz4nICsgcGFyYW1zU3RyaW5nICsgJzwvb2JqZWN0Pic7XHJcbn07XHJcblxyXG52anMuRmxhc2guc3RyZWFtRnJvbVBhcnRzID0gZnVuY3Rpb24oY29ubmVjdGlvbiwgc3RyZWFtKSB7XHJcbiAgcmV0dXJuIGNvbm5lY3Rpb24gKyAnJicgKyBzdHJlYW07XHJcbn07XHJcblxyXG52anMuRmxhc2guc3RyZWFtVG9QYXJ0cyA9IGZ1bmN0aW9uKHNyYykge1xyXG4gIHZhciBwYXJ0cyA9IHtcclxuICAgIGNvbm5lY3Rpb246ICcnLFxyXG4gICAgc3RyZWFtOiAnJ1xyXG4gIH07XHJcblxyXG4gIGlmICghIHNyYykge1xyXG4gICAgcmV0dXJuIHBhcnRzO1xyXG4gIH1cclxuXHJcbiAgLy8gTG9vayBmb3IgdGhlIG5vcm1hbCBVUkwgc2VwYXJhdG9yIHdlIGV4cGVjdCwgJyYnLlxyXG4gIC8vIElmIGZvdW5kLCB3ZSBzcGxpdCB0aGUgVVJMIGludG8gdHdvIHBpZWNlcyBhcm91bmQgdGhlXHJcbiAgLy8gZmlyc3QgJyYnLlxyXG4gIHZhciBjb25uRW5kID0gc3JjLmluZGV4T2YoJyYnKTtcclxuICB2YXIgc3RyZWFtQmVnaW47XHJcbiAgaWYgKGNvbm5FbmQgIT09IC0xKSB7XHJcbiAgICBzdHJlYW1CZWdpbiA9IGNvbm5FbmQgKyAxO1xyXG4gIH1cclxuICBlbHNlIHtcclxuICAgIC8vIElmIHRoZXJlJ3Mgbm90IGEgJyYnLCB3ZSB1c2UgdGhlIGxhc3QgJy8nIGFzIHRoZSBkZWxpbWl0ZXIuXHJcbiAgICBjb25uRW5kID0gc3RyZWFtQmVnaW4gPSBzcmMubGFzdEluZGV4T2YoJy8nKSArIDE7XHJcbiAgICBpZiAoY29ubkVuZCA9PT0gMCkge1xyXG4gICAgICAvLyByZWFsbHksIHRoZXJlJ3Mgbm90IGEgJy8nP1xyXG4gICAgICBjb25uRW5kID0gc3RyZWFtQmVnaW4gPSBzcmMubGVuZ3RoO1xyXG4gICAgfVxyXG4gIH1cclxuICBwYXJ0cy5jb25uZWN0aW9uID0gc3JjLnN1YnN0cmluZygwLCBjb25uRW5kKTtcclxuICBwYXJ0cy5zdHJlYW0gPSBzcmMuc3Vic3RyaW5nKHN0cmVhbUJlZ2luLCBzcmMubGVuZ3RoKTtcclxuXHJcbiAgcmV0dXJuIHBhcnRzO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLmlzU3RyZWFtaW5nVHlwZSA9IGZ1bmN0aW9uKHNyY1R5cGUpIHtcclxuICByZXR1cm4gc3JjVHlwZSBpbiB2anMuRmxhc2guc3RyZWFtaW5nRm9ybWF0cztcclxufTtcclxuXHJcbi8vIFJUTVAgaGFzIGZvdXIgdmFyaWF0aW9ucywgYW55IHN0cmluZyBzdGFydGluZ1xyXG4vLyB3aXRoIG9uZSBvZiB0aGVzZSBwcm90b2NvbHMgc2hvdWxkIGJlIHZhbGlkXHJcbnZqcy5GbGFzaC5SVE1QX1JFID0gL15ydG1wW3NldF0/OlxcL1xcLy9pO1xyXG5cclxudmpzLkZsYXNoLmlzU3RyZWFtaW5nU3JjID0gZnVuY3Rpb24oc3JjKSB7XHJcbiAgcmV0dXJuIHZqcy5GbGFzaC5SVE1QX1JFLnRlc3Qoc3JjKTtcclxufTtcclxuLyoqXHJcbiAqIFRoZSBNZWRpYSBMb2FkZXIgaXMgdGhlIGNvbXBvbmVudCB0aGF0IGRlY2lkZXMgd2hpY2ggcGxheWJhY2sgdGVjaG5vbG9neSB0byBsb2FkXHJcbiAqIHdoZW4gdGhlIHBsYXllciBpcyBpbml0aWFsaXplZC5cclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTWVkaWFMb2FkZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBzb3VyY2VzIHdoZW4gdGhlIHBsYXllciBpcyBpbml0aWFsaXplZCxcclxuICAgIC8vIGxvYWQgdGhlIGZpcnN0IHN1cHBvcnRlZCBwbGF5YmFjayB0ZWNobm9sb2d5LlxyXG4gICAgaWYgKCFwbGF5ZXIub3B0aW9uc19bJ3NvdXJjZXMnXSB8fCBwbGF5ZXIub3B0aW9uc19bJ3NvdXJjZXMnXS5sZW5ndGggPT09IDApIHtcclxuICAgICAgZm9yICh2YXIgaT0wLGo9cGxheWVyLm9wdGlvbnNfWyd0ZWNoT3JkZXInXTsgaTxqLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgdmFyIHRlY2hOYW1lID0gdmpzLmNhcGl0YWxpemUoaltpXSksXHJcbiAgICAgICAgICAgIHRlY2ggPSB3aW5kb3dbJ3ZpZGVvanMnXVt0ZWNoTmFtZV07XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoaXMgdGVjaG5vbG9neVxyXG4gICAgICAgIGlmICh0ZWNoICYmIHRlY2guaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgcGxheWVyLmxvYWRUZWNoKHRlY2hOYW1lKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gLy8gTG9vcCB0aHJvdWdoIHBsYXliYWNrIHRlY2hub2xvZ2llcyAoSFRNTDUsIEZsYXNoKSBhbmQgY2hlY2sgZm9yIHN1cHBvcnQuXHJcbiAgICAgIC8vIC8vIFRoZW4gbG9hZCB0aGUgYmVzdCBzb3VyY2UuXHJcbiAgICAgIC8vIC8vIEEgZmV3IGFzc3VtcHRpb25zIGhlcmU6XHJcbiAgICAgIC8vIC8vICAgQWxsIHBsYXliYWNrIHRlY2hub2xvZ2llcyByZXNwZWN0IHByZWxvYWQgZmFsc2UuXHJcbiAgICAgIHBsYXllci5zcmMocGxheWVyLm9wdGlvbnNfWydzb3VyY2VzJ10pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IFRleHQgVHJhY2tzXHJcbiAqIFRleHQgdHJhY2tzIGFyZSB0cmFja3Mgb2YgdGltZWQgdGV4dCBldmVudHMuXHJcbiAqIENhcHRpb25zIC0gdGV4dCBkaXNwbGF5ZWQgb3ZlciB0aGUgdmlkZW8gZm9yIHRoZSBoZWFyaW5nIGltcGFyZWRcclxuICogU3VidGl0bGVzIC0gdGV4dCBkaXNwbGF5ZWQgb3ZlciB0aGUgdmlkZW8gZm9yIHRob3NlIHdobyBkb24ndCB1bmRlcnN0YW5kIGxhbmdhdWdlIGluIHRoZSB2aWRlb1xyXG4gKiBDaGFwdGVycyAtIHRleHQgZGlzcGxheWVkIGluIGEgbWVudSBhbGxvd2luZyB0aGUgdXNlciB0byBqdW1wIHRvIHBhcnRpY3VsYXIgcG9pbnRzIChjaGFwdGVycykgaW4gdGhlIHZpZGVvXHJcbiAqIERlc2NyaXB0aW9ucyAobm90IHN1cHBvcnRlZCB5ZXQpIC0gYXVkaW8gZGVzY3JpcHRpb25zIHRoYXQgYXJlIHJlYWQgYmFjayB0byB0aGUgdXNlciBieSBhIHNjcmVlbiByZWFkaW5nIGRldmljZVxyXG4gKi9cclxuXHJcbi8vIFBsYXllciBBZGRpdGlvbnMgLSBGdW5jdGlvbnMgYWRkIHRvIHRoZSBwbGF5ZXIgb2JqZWN0IGZvciBlYXNpZXIgYWNjZXNzIHRvIHRyYWNrc1xyXG5cclxuLyoqXHJcbiAqIExpc3Qgb2YgYXNzb2NpYXRlZCB0ZXh0IHRyYWNrc1xyXG4gKiBAdHlwZSB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS50ZXh0VHJhY2tzXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgYW4gYXJyYXkgb2YgYXNzb2NpYXRlZCB0ZXh0IHRyYWNrcy4gY2FwdGlvbnMsIHN1YnRpdGxlcywgY2hhcHRlcnMsIGRlc2NyaXB0aW9uc1xyXG4gKiBodHRwOi8vd3d3LnczLm9yZy9odG1sL3dnL2RyYWZ0cy9odG1sL21hc3Rlci9lbWJlZGRlZC1jb250ZW50LTAuaHRtbCNkb20tbWVkaWEtdGV4dHRyYWNrc1xyXG4gKiBAcmV0dXJuIHtBcnJheX0gICAgICAgICAgIEFycmF5IG9mIHRyYWNrIG9iamVjdHNcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRleHRUcmFja3MgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudGV4dFRyYWNrc18gPSB0aGlzLnRleHRUcmFja3NfIHx8IFtdO1xyXG4gIHJldHVybiB0aGlzLnRleHRUcmFja3NfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIHRleHQgdHJhY2tcclxuICogSW4gYWRkaXRpb24gdG8gdGhlIFczQyBzZXR0aW5ncyB3ZSBhbGxvdyBhZGRpbmcgYWRkaXRpb25hbCBpbmZvIHRocm91Z2ggb3B0aW9ucy5cclxuICogaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvZW1iZWRkZWQtY29udGVudC0wLmh0bWwjZG9tLW1lZGlhLWFkZHRleHR0cmFja1xyXG4gKiBAcGFyYW0ge1N0cmluZ30gIGtpbmQgICAgICAgIENhcHRpb25zLCBzdWJ0aXRsZXMsIGNoYXB0ZXJzLCBkZXNjcmlwdGlvbnMsIG9yIG1ldGFkYXRhXHJcbiAqIEBwYXJhbSB7U3RyaW5nPX0gbGFiZWwgICAgICAgT3B0aW9uYWwgbGFiZWxcclxuICogQHBhcmFtIHtTdHJpbmc9fSBsYW5ndWFnZSAgICBPcHRpb25hbCBsYW5ndWFnZVxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgICAgIEFkZGl0aW9uYWwgdHJhY2sgb3B0aW9ucywgbGlrZSBzcmNcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmFkZFRleHRUcmFjayA9IGZ1bmN0aW9uKGtpbmQsIGxhYmVsLCBsYW5ndWFnZSwgb3B0aW9ucyl7XHJcbiAgdmFyIHRyYWNrcyA9IHRoaXMudGV4dFRyYWNrc18gPSB0aGlzLnRleHRUcmFja3NfIHx8IFtdO1xyXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cclxuICBvcHRpb25zWydraW5kJ10gPSBraW5kO1xyXG4gIG9wdGlvbnNbJ2xhYmVsJ10gPSBsYWJlbDtcclxuICBvcHRpb25zWydsYW5ndWFnZSddID0gbGFuZ3VhZ2U7XHJcblxyXG4gIC8vIEhUTUw1IFNwZWMgc2F5cyBkZWZhdWx0IHRvIHN1YnRpdGxlcy5cclxuICAvLyBVcHBlcmNhc2UgZmlyc3QgbGV0dGVyIHRvIG1hdGNoIGNsYXNzIG5hbWVzXHJcbiAgdmFyIEtpbmQgPSB2anMuY2FwaXRhbGl6ZShraW5kIHx8ICdzdWJ0aXRsZXMnKTtcclxuXHJcbiAgLy8gQ3JlYXRlIGNvcnJlY3QgdGV4dHRyYWNrIGNsYXNzLiBDYXB0aW9uc1RyYWNrLCBldGMuXHJcbiAgdmFyIHRyYWNrID0gbmV3IHdpbmRvd1sndmlkZW9qcyddW0tpbmQgKyAnVHJhY2snXSh0aGlzLCBvcHRpb25zKTtcclxuXHJcbiAgdHJhY2tzLnB1c2godHJhY2spO1xyXG5cclxuICAvLyBJZiB0cmFjay5kZmx0KCkgaXMgc2V0LCBzdGFydCBzaG93aW5nIGltbWVkaWF0ZWx5XHJcbiAgLy8gVE9ETzogQWRkIGEgcHJvY2VzcyB0byBkZXRlcmltZSB0aGUgYmVzdCB0cmFjayB0byBzaG93IGZvciB0aGUgc3BlY2lmaWMga2luZFxyXG4gIC8vIEluY2FzZSB0aGVyZSBhcmUgbXVsaXRwbGUgZGVmYXVsdGVkIHRyYWNrcyBvZiB0aGUgc2FtZSBraW5kXHJcbiAgLy8gT3IgdGhlIHVzZXIgaGFzIGEgc2V0IHByZWZlcmVuY2Ugb2YgYSBzcGVjaWZpYyBsYW5ndWFnZSB0aGF0IHNob3VsZCBvdmVycmlkZSB0aGUgZGVmYXVsdFxyXG4gIC8vIGlmICh0cmFjay5kZmx0KCkpIHtcclxuICAvLyAgIHRoaXMucmVhZHkodmpzLmJpbmQodHJhY2ssIHRyYWNrLnNob3cpKTtcclxuICAvLyB9XHJcblxyXG4gIHJldHVybiB0cmFjaztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gYXJyYXkgb2YgdGV4dCB0cmFja3MuIGNhcHRpb25zLCBzdWJ0aXRsZXMsIGNoYXB0ZXJzLCBkZXNjcmlwdGlvbnNcclxuICogVHJhY2sgb2JqZWN0cyB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgcGxheWVyLnRleHRUcmFja3MoKSBhcnJheVxyXG4gKiBAcGFyYW0ge0FycmF5fSB0cmFja0xpc3QgQXJyYXkgb2YgdHJhY2sgZWxlbWVudHMgb3Igb2JqZWN0cyAoZmFrZSB0cmFjayBlbGVtZW50cylcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmFkZFRleHRUcmFja3MgPSBmdW5jdGlvbih0cmFja0xpc3Qpe1xyXG4gIHZhciB0cmFja09iajtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFja0xpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgIHRyYWNrT2JqID0gdHJhY2tMaXN0W2ldO1xyXG4gICAgdGhpcy5hZGRUZXh0VHJhY2sodHJhY2tPYmpbJ2tpbmQnXSwgdHJhY2tPYmpbJ2xhYmVsJ10sIHRyYWNrT2JqWydsYW5ndWFnZSddLCB0cmFja09iaik7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIFNob3cgYSB0ZXh0IHRyYWNrXHJcbi8vIGRpc2FibGVTYW1lS2luZDogZGlzYWJsZSBhbGwgb3RoZXIgdHJhY2tzIG9mIHRoZSBzYW1lIGtpbmQuIFZhbHVlIHNob3VsZCBiZSBhIHRyYWNrIGtpbmQgKGNhcHRpb25zLCBldGMuKVxyXG52anMuUGxheWVyLnByb3RvdHlwZS5zaG93VGV4dFRyYWNrID0gZnVuY3Rpb24oaWQsIGRpc2FibGVTYW1lS2luZCl7XHJcbiAgdmFyIHRyYWNrcyA9IHRoaXMudGV4dFRyYWNrc18sXHJcbiAgICAgIGkgPSAwLFxyXG4gICAgICBqID0gdHJhY2tzLmxlbmd0aCxcclxuICAgICAgdHJhY2ssIHNob3dUcmFjaywga2luZDtcclxuXHJcbiAgLy8gRmluZCBUcmFjayB3aXRoIHNhbWUgSURcclxuICBmb3IgKDtpPGo7aSsrKSB7XHJcbiAgICB0cmFjayA9IHRyYWNrc1tpXTtcclxuICAgIGlmICh0cmFjay5pZCgpID09PSBpZCkge1xyXG4gICAgICB0cmFjay5zaG93KCk7XHJcbiAgICAgIHNob3dUcmFjayA9IHRyYWNrO1xyXG5cclxuICAgIC8vIERpc2FibGUgdHJhY2tzIG9mIHRoZSBzYW1lIGtpbmRcclxuICAgIH0gZWxzZSBpZiAoZGlzYWJsZVNhbWVLaW5kICYmIHRyYWNrLmtpbmQoKSA9PSBkaXNhYmxlU2FtZUtpbmQgJiYgdHJhY2subW9kZSgpID4gMCkge1xyXG4gICAgICB0cmFjay5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvLyBHZXQgdHJhY2sga2luZCBmcm9tIHNob3duIHRyYWNrIG9yIGRpc2FibGVTYW1lS2luZFxyXG4gIGtpbmQgPSAoc2hvd1RyYWNrKSA/IHNob3dUcmFjay5raW5kKCkgOiAoKGRpc2FibGVTYW1lS2luZCkgPyBkaXNhYmxlU2FtZUtpbmQgOiBmYWxzZSk7XHJcblxyXG4gIC8vIFRyaWdnZXIgdHJhY2tjaGFuZ2UgZXZlbnQsIGNhcHRpb25zdHJhY2tjaGFuZ2UsIHN1YnRpdGxlc3RyYWNrY2hhbmdlLCBldGMuXHJcbiAgaWYgKGtpbmQpIHtcclxuICAgIHRoaXMudHJpZ2dlcihraW5kKyd0cmFja2NoYW5nZScpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGJhc2UgY2xhc3MgZm9yIGFsbCB0ZXh0IHRyYWNrc1xyXG4gKlxyXG4gKiBIYW5kbGVzIHRoZSBwYXJzaW5nLCBoaWRpbmcsIGFuZCBzaG93aW5nIG9mIHRleHQgdHJhY2sgY3Vlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlRleHRUcmFjayA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIC8vIEFwcGx5IHRyYWNrIGluZm8gdG8gdHJhY2sgb2JqZWN0XHJcbiAgICAvLyBPcHRpb25zIHdpbGwgb2Z0ZW4gYmUgYSB0cmFjayBlbGVtZW50XHJcblxyXG4gICAgLy8gQnVpbGQgSUQgaWYgb25lIGRvZXNuJ3QgZXhpc3RcclxuICAgIHRoaXMuaWRfID0gb3B0aW9uc1snaWQnXSB8fCAoJ3Zqc18nICsgb3B0aW9uc1sna2luZCddICsgJ18nICsgb3B0aW9uc1snbGFuZ3VhZ2UnXSArICdfJyArIHZqcy5ndWlkKyspO1xyXG4gICAgdGhpcy5zcmNfID0gb3B0aW9uc1snc3JjJ107XHJcbiAgICAvLyAnZGVmYXVsdCcgaXMgYSByZXNlcnZlZCBrZXl3b3JkIGluIGpzIHNvIHdlIHVzZSBhbiBhYmJyZXZpYXRlZCB2ZXJzaW9uXHJcbiAgICB0aGlzLmRmbHRfID0gb3B0aW9uc1snZGVmYXVsdCddIHx8IG9wdGlvbnNbJ2RmbHQnXTtcclxuICAgIHRoaXMudGl0bGVfID0gb3B0aW9uc1sndGl0bGUnXTtcclxuICAgIHRoaXMubGFuZ3VhZ2VfID0gb3B0aW9uc1snc3JjbGFuZyddO1xyXG4gICAgdGhpcy5sYWJlbF8gPSBvcHRpb25zWydsYWJlbCddO1xyXG4gICAgdGhpcy5jdWVzXyA9IFtdO1xyXG4gICAgdGhpcy5hY3RpdmVDdWVzXyA9IFtdO1xyXG4gICAgdGhpcy5yZWFkeVN0YXRlXyA9IDA7XHJcbiAgICB0aGlzLm1vZGVfID0gMDtcclxuXHJcbiAgICB0aGlzLnBsYXllcl8ub24oJ2Z1bGxzY3JlZW5jaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLmFkanVzdEZvbnRTaXplKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayBraW5kIHZhbHVlLiBDYXB0aW9ucywgc3VidGl0bGVzLCBldGMuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5raW5kXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGtpbmQgdmFsdWVcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUua2luZCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMua2luZF87XHJcbn07XHJcblxyXG4vKipcclxuICogVHJhY2sgc3JjIHZhbHVlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5zcmNfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgc3JjIHZhbHVlXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnNyYyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuc3JjXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayBkZWZhdWx0IHZhbHVlXHJcbiAqIElmIGRlZmF1bHQgaXMgdXNlZCwgc3VidGl0bGVzL2NhcHRpb25zIHRvIHN0YXJ0IHNob3dpbmdcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmRmbHRfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgZGVmYXVsdCB2YWx1ZS4gKCdkZWZhdWx0JyBpcyBhIHJlc2VydmVkIGtleXdvcmQpXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5kZmx0ID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5kZmx0XztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayB0aXRsZSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUudGl0bGVfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgdGl0bGUgdmFsdWVcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUudGl0bGUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLnRpdGxlXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMYW5ndWFnZSAtIHR3byBsZXR0ZXIgc3RyaW5nIHRvIHJlcHJlc2VudCB0cmFjayBsYW5ndWFnZSwgZS5nLiAnZW4nIGZvciBFbmdsaXNoXHJcbiAqIFNwZWMgZGVmOiByZWFkb25seSBhdHRyaWJ1dGUgRE9NU3RyaW5nIGxhbmd1YWdlO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFuZ3VhZ2VfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgbGFuZ3VhZ2UgdmFsdWVcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubGFuZ3VhZ2UgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmxhbmd1YWdlXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayBsYWJlbCBlLmcuICdFbmdsaXNoJ1xyXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyBsYWJlbDtcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhYmVsXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGxhYmVsIHZhbHVlXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhYmVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5sYWJlbF87XHJcbn07XHJcblxyXG4vKipcclxuICogQWxsIGN1ZXMgb2YgdGhlIHRyYWNrLiBDdWVzIGhhdmUgYSBzdGFydFRpbWUsIGVuZFRpbWUsIHRleHQsIGFuZCBvdGhlciBwcm9wZXJ0aWVzLlxyXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIFRleHRUcmFja0N1ZUxpc3QgY3VlcztcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmN1ZXNfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgY3Vlc1xyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmN1ZXMgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmN1ZXNfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFjdGl2ZUN1ZXMgaXMgYWxsIGN1ZXMgdGhhdCBhcmUgY3VycmVudGx5IHNob3dpbmdcclxuICogU3BlYyBkZWY6IHJlYWRvbmx5IGF0dHJpYnV0ZSBUZXh0VHJhY2tDdWVMaXN0IGFjdGl2ZUN1ZXM7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5hY3RpdmVDdWVzXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGFjdGl2ZSBjdWVzXHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuYWN0aXZlQ3VlcyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuYWN0aXZlQ3Vlc187XHJcbn07XHJcblxyXG4vKipcclxuICogUmVhZHlTdGF0ZSBkZXNjcmliZXMgaWYgdGhlIHRleHQgZmlsZSBoYXMgYmVlbiBsb2FkZWRcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgTk9ORSA9IDA7XHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IExPQURJTkcgPSAxO1xyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBMT0FERUQgPSAyO1xyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBFUlJPUiA9IDM7XHJcbiAqIHJlYWRvbmx5IGF0dHJpYnV0ZSB1bnNpZ25lZCBzaG9ydCByZWFkeVN0YXRlO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUucmVhZHlTdGF0ZV87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayByZWFkeVN0YXRlXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnJlYWR5U3RhdGUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLnJlYWR5U3RhdGVfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1vZGUgZGVzY3JpYmVzIGlmIHRoZSB0cmFjayBpcyBzaG93aW5nLCBoaWRkZW4sIG9yIGRpc2FibGVkXHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IE9GRiA9IDA7XHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IEhJRERFTiA9IDE7IChzdGlsbCB0cmlnZ2VyaW5nIGN1ZWNoYW5nZSBldmVudHMsIGJ1dCBub3QgdmlzaWJsZSlcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgU0hPV0lORyA9IDI7XHJcbiAqIGF0dHJpYnV0ZSB1bnNpZ25lZCBzaG9ydCBtb2RlO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubW9kZV87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBtb2RlXHJcbiAqIEByZXR1cm4ge051bWJlcn1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLm1vZGUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLm1vZGVfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIENoYW5nZSB0aGUgZm9udCBzaXplIG9mIHRoZSB0ZXh0IHRyYWNrIHRvIG1ha2UgaXQgbGFyZ2VyIHdoZW4gcGxheWluZyBpbiBmdWxsc2NyZWVuIG1vZGVcclxuICogYW5kIHJlc3RvcmUgaXQgdG8gaXRzIG5vcm1hbCBzaXplIHdoZW4gbm90IGluIGZ1bGxzY3JlZW4gbW9kZS5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFkanVzdEZvbnRTaXplID0gZnVuY3Rpb24oKXtcclxuICAgIGlmICh0aGlzLnBsYXllcl8uaXNGdWxsU2NyZWVuKSB7XHJcbiAgICAgICAgLy8gU2NhbGUgdGhlIGZvbnQgYnkgdGhlIHNhbWUgZmFjdG9yIGFzIGluY3JlYXNpbmcgdGhlIHZpZGVvIHdpZHRoIHRvIHRoZSBmdWxsIHNjcmVlbiB3aW5kb3cgd2lkdGguXHJcbiAgICAgICAgLy8gQWRkaXRpb25hbGx5LCBtdWx0aXBseSB0aGF0IGZhY3RvciBieSAxLjQsIHdoaWNoIGlzIHRoZSBkZWZhdWx0IGZvbnQgc2l6ZSBmb3JcclxuICAgICAgICAvLyB0aGUgY2FwdGlvbiB0cmFjayAoZnJvbSB0aGUgQ1NTKVxyXG4gICAgICAgIHRoaXMuZWxfLnN0eWxlLmZvbnRTaXplID0gc2NyZWVuLndpZHRoIC8gdGhpcy5wbGF5ZXJfLndpZHRoKCkgKiAxLjQgKiAxMDAgKyAnJSc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIENoYW5nZSB0aGUgZm9udCBzaXplIG9mIHRoZSB0ZXh0IHRyYWNrIGJhY2sgdG8gaXRzIG9yaWdpbmFsIG5vbi1mdWxsc2NyZWVuIHNpemVcclxuICAgICAgICB0aGlzLmVsXy5zdHlsZS5mb250U2l6ZSA9ICcnO1xyXG4gICAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZSBiYXNpYyBkaXYgdG8gaG9sZCBjdWUgdGV4dFxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtJyArIHRoaXMua2luZF8gKyAnIHZqcy10ZXh0LXRyYWNrJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3c6IE1vZGUgU2hvd2luZyAoMilcclxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgYWN0aXZlLiBJZiBubyBhdHRlbXB0IGhhcyB5ZXQgYmVlbiBtYWRlIHRvIG9idGFpbiB0aGUgdHJhY2sncyBjdWVzLCB0aGUgdXNlciBhZ2VudCB3aWxsIHBlcmZvcm0gc3VjaCBhbiBhdHRlbXB0IG1vbWVudGFyaWx5LlxyXG4gKiBUaGUgdXNlciBhZ2VudCBpcyBtYWludGFpbmluZyBhIGxpc3Qgb2Ygd2hpY2ggY3VlcyBhcmUgYWN0aXZlLCBhbmQgZXZlbnRzIGFyZSBiZWluZyBmaXJlZCBhY2NvcmRpbmdseS5cclxuICogSW4gYWRkaXRpb24sIGZvciB0ZXh0IHRyYWNrcyB3aG9zZSBraW5kIGlzIHN1YnRpdGxlcyBvciBjYXB0aW9ucywgdGhlIGN1ZXMgYXJlIGJlaW5nIGRpc3BsYXllZCBvdmVyIHRoZSB2aWRlbyBhcyBhcHByb3ByaWF0ZTtcclxuICogZm9yIHRleHQgdHJhY2tzIHdob3NlIGtpbmQgaXMgZGVzY3JpcHRpb25zLCB0aGUgdXNlciBhZ2VudCBpcyBtYWtpbmcgdGhlIGN1ZXMgYXZhaWxhYmxlIHRvIHRoZSB1c2VyIGluIGEgbm9uLXZpc3VhbCBmYXNoaW9uO1xyXG4gKiBhbmQgZm9yIHRleHQgdHJhY2tzIHdob3NlIGtpbmQgaXMgY2hhcHRlcnMsIHRoZSB1c2VyIGFnZW50IGlzIG1ha2luZyBhdmFpbGFibGUgdG8gdGhlIHVzZXIgYSBtZWNoYW5pc20gYnkgd2hpY2ggdGhlIHVzZXIgY2FuIG5hdmlnYXRlIHRvIGFueSBwb2ludCBpbiB0aGUgbWVkaWEgcmVzb3VyY2UgYnkgc2VsZWN0aW5nIGEgY3VlLlxyXG4gKiBUaGUgc2hvd2luZyBieSBkZWZhdWx0IHN0YXRlIGlzIHVzZWQgaW4gY29uanVuY3Rpb24gd2l0aCB0aGUgZGVmYXVsdCBhdHRyaWJ1dGUgb24gdHJhY2sgZWxlbWVudHMgdG8gaW5kaWNhdGUgdGhhdCB0aGUgdGV4dCB0cmFjayB3YXMgZW5hYmxlZCBkdWUgdG8gdGhhdCBhdHRyaWJ1dGUuXHJcbiAqIFRoaXMgYWxsb3dzIHRoZSB1c2VyIGFnZW50IHRvIG92ZXJyaWRlIHRoZSBzdGF0ZSBpZiBhIGxhdGVyIHRyYWNrIGlzIGRpc2NvdmVyZWQgdGhhdCBpcyBtb3JlIGFwcHJvcHJpYXRlIHBlciB0aGUgdXNlcidzIHByZWZlcmVuY2VzLlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5hY3RpdmF0ZSgpO1xyXG5cclxuICB0aGlzLm1vZGVfID0gMjtcclxuXHJcbiAgLy8gU2hvdyBlbGVtZW50LlxyXG4gIHZqcy5Db21wb25lbnQucHJvdG90eXBlLnNob3cuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBIaWRlOiBNb2RlIEhpZGRlbiAoMSlcclxuICogSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgYWN0aXZlLCBidXQgdGhhdCB0aGUgdXNlciBhZ2VudCBpcyBub3QgYWN0aXZlbHkgZGlzcGxheWluZyB0aGUgY3Vlcy5cclxuICogSWYgbm8gYXR0ZW1wdCBoYXMgeWV0IGJlZW4gbWFkZSB0byBvYnRhaW4gdGhlIHRyYWNrJ3MgY3VlcywgdGhlIHVzZXIgYWdlbnQgd2lsbCBwZXJmb3JtIHN1Y2ggYW4gYXR0ZW1wdCBtb21lbnRhcmlseS5cclxuICogVGhlIHVzZXIgYWdlbnQgaXMgbWFpbnRhaW5pbmcgYSBsaXN0IG9mIHdoaWNoIGN1ZXMgYXJlIGFjdGl2ZSwgYW5kIGV2ZW50cyBhcmUgYmVpbmcgZmlyZWQgYWNjb3JkaW5nbHkuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5oaWRlID0gZnVuY3Rpb24oKXtcclxuICAvLyBXaGVuIGhpZGRlbiwgY3VlcyBhcmUgc3RpbGwgdHJpZ2dlcmVkLiBEaXNhYmxlIHRvIHN0b3AgdHJpZ2dlcmluZy5cclxuICB0aGlzLmFjdGl2YXRlKCk7XHJcblxyXG4gIHRoaXMubW9kZV8gPSAxO1xyXG5cclxuICAvLyBIaWRlIGVsZW1lbnQuXHJcbiAgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaGlkZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc2FibGU6IE1vZGUgT2ZmL0Rpc2FibGUgKDApXHJcbiAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIG5vdCBhY3RpdmUuIE90aGVyIHRoYW4gZm9yIHRoZSBwdXJwb3NlcyBvZiBleHBvc2luZyB0aGUgdHJhY2sgaW4gdGhlIERPTSwgdGhlIHVzZXIgYWdlbnQgaXMgaWdub3JpbmcgdGhlIHRleHQgdHJhY2suXHJcbiAqIE5vIGN1ZXMgYXJlIGFjdGl2ZSwgbm8gZXZlbnRzIGFyZSBmaXJlZCwgYW5kIHRoZSB1c2VyIGFnZW50IHdpbGwgbm90IGF0dGVtcHQgdG8gb2J0YWluIHRoZSB0cmFjaydzIGN1ZXMuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKXtcclxuICAvLyBJZiBzaG93aW5nLCBoaWRlLlxyXG4gIGlmICh0aGlzLm1vZGVfID09IDIpIHsgdGhpcy5oaWRlKCk7IH1cclxuXHJcbiAgLy8gU3RvcCB0cmlnZ2VyaW5nIGN1ZXNcclxuICB0aGlzLmRlYWN0aXZhdGUoKTtcclxuXHJcbiAgLy8gU3dpdGNoIE1vZGUgdG8gT2ZmXHJcbiAgdGhpcy5tb2RlXyA9IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogVHVybiBvbiBjdWUgdHJhY2tpbmcuIFRyYWNrcyB0aGF0IGFyZSBzaG93aW5nIE9SIGhpZGRlbiBhcmUgYWN0aXZlLlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuYWN0aXZhdGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIExvYWQgdGV4dCBmaWxlIGlmIGl0IGhhc24ndCBiZWVuIHlldC5cclxuICBpZiAodGhpcy5yZWFkeVN0YXRlXyA9PT0gMCkgeyB0aGlzLmxvYWQoKTsgfVxyXG5cclxuICAvLyBPbmx5IGFjdGl2YXRlIGlmIG5vdCBhbHJlYWR5IGFjdGl2ZS5cclxuICBpZiAodGhpcy5tb2RlXyA9PT0gMCkge1xyXG4gICAgLy8gVXBkYXRlIGN1cnJlbnQgY3VlIG9uIHRpbWV1cGRhdGVcclxuICAgIC8vIFVzaW5nIHVuaXF1ZSBJRCBmb3IgYmluZCBmdW5jdGlvbiBzbyBvdGhlciB0cmFja3MgZG9uJ3QgcmVtb3ZlIGxpc3RlbmVyXHJcbiAgICB0aGlzLnBsYXllcl8ub24oJ3RpbWV1cGRhdGUnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSwgdGhpcy5pZF8pKTtcclxuXHJcbiAgICAvLyBSZXNldCBjdWUgdGltZSBvbiBtZWRpYSBlbmRcclxuICAgIHRoaXMucGxheWVyXy5vbignZW5kZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnJlc2V0LCB0aGlzLmlkXykpO1xyXG5cclxuICAgIC8vIEFkZCB0byBkaXNwbGF5XHJcbiAgICBpZiAodGhpcy5raW5kXyA9PT0gJ2NhcHRpb25zJyB8fCB0aGlzLmtpbmRfID09PSAnc3VidGl0bGVzJykge1xyXG4gICAgICB0aGlzLnBsYXllcl8uZ2V0Q2hpbGQoJ3RleHRUcmFja0Rpc3BsYXknKS5hZGRDaGlsZCh0aGlzKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogVHVybiBvZmYgY3VlIHRyYWNraW5nLlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGVhY3RpdmF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gVXNpbmcgdW5pcXVlIElEIGZvciBiaW5kIGZ1bmN0aW9uIHNvIG90aGVyIHRyYWNrcyBkb24ndCByZW1vdmUgbGlzdGVuZXJcclxuICB0aGlzLnBsYXllcl8ub2ZmKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUsIHRoaXMuaWRfKSk7XHJcbiAgdGhpcy5wbGF5ZXJfLm9mZignZW5kZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLnJlc2V0LCB0aGlzLmlkXykpO1xyXG4gIHRoaXMucmVzZXQoKTsgLy8gUmVzZXRcclxuXHJcbiAgLy8gUmVtb3ZlIGZyb20gZGlzcGxheVxyXG4gIHRoaXMucGxheWVyXy5nZXRDaGlsZCgndGV4dFRyYWNrRGlzcGxheScpLnJlbW92ZUNoaWxkKHRoaXMpO1xyXG59O1xyXG5cclxuLy8gQSByZWFkaW5lc3Mgc3RhdGVcclxuLy8gT25lIG9mIHRoZSBmb2xsb3dpbmc6XHJcbi8vXHJcbi8vIE5vdCBsb2FkZWRcclxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMga25vd24gdG8gZXhpc3QgKGUuZy4gaXQgaGFzIGJlZW4gZGVjbGFyZWQgd2l0aCBhIHRyYWNrIGVsZW1lbnQpLCBidXQgaXRzIGN1ZXMgaGF2ZSBub3QgYmVlbiBvYnRhaW5lZC5cclxuLy9cclxuLy8gTG9hZGluZ1xyXG4vLyBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBsb2FkaW5nIGFuZCB0aGVyZSBoYXZlIGJlZW4gbm8gZmF0YWwgZXJyb3JzIGVuY291bnRlcmVkIHNvIGZhci4gRnVydGhlciBjdWVzIG1pZ2h0IHN0aWxsIGJlIGFkZGVkIHRvIHRoZSB0cmFjay5cclxuLy9cclxuLy8gTG9hZGVkXHJcbi8vIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGhhcyBiZWVuIGxvYWRlZCB3aXRoIG5vIGZhdGFsIGVycm9ycy4gTm8gbmV3IGN1ZXMgd2lsbCBiZSBhZGRlZCB0byB0aGUgdHJhY2sgZXhjZXB0IGlmIHRoZSB0ZXh0IHRyYWNrIGNvcnJlc3BvbmRzIHRvIGEgTXV0YWJsZVRleHRUcmFjayBvYmplY3QuXHJcbi8vXHJcbi8vIEZhaWxlZCB0byBsb2FkXHJcbi8vIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIHdhcyBlbmFibGVkLCBidXQgd2hlbiB0aGUgdXNlciBhZ2VudCBhdHRlbXB0ZWQgdG8gb2J0YWluIGl0LCB0aGlzIGZhaWxlZCBpbiBzb21lIHdheSAoZS5nLiBVUkwgY291bGQgbm90IGJlIHJlc29sdmVkLCBuZXR3b3JrIGVycm9yLCB1bmtub3duIHRleHQgdHJhY2sgZm9ybWF0KS4gU29tZSBvciBhbGwgb2YgdGhlIGN1ZXMgYXJlIGxpa2VseSBtaXNzaW5nIGFuZCB3aWxsIG5vdCBiZSBvYnRhaW5lZC5cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG4gIC8vIE9ubHkgbG9hZCBpZiBub3QgbG9hZGVkIHlldC5cclxuICBpZiAodGhpcy5yZWFkeVN0YXRlXyA9PT0gMCkge1xyXG4gICAgdGhpcy5yZWFkeVN0YXRlXyA9IDE7XHJcbiAgICB2anMuZ2V0KHRoaXMuc3JjXywgdmpzLmJpbmQodGhpcywgdGhpcy5wYXJzZUN1ZXMpLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uRXJyb3IpKTtcclxuICB9XHJcblxyXG59O1xyXG5cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKGVycil7XHJcbiAgdGhpcy5lcnJvciA9IGVycjtcclxuICB0aGlzLnJlYWR5U3RhdGVfID0gMztcclxuICB0aGlzLnRyaWdnZXIoJ2Vycm9yJyk7XHJcbn07XHJcblxyXG4vLyBQYXJzZSB0aGUgV2ViVlRUIHRleHQgZm9ybWF0IGZvciBjdWUgdGltZXMuXHJcbi8vIFRPRE86IFNlcGFyYXRlIHBhcnNlciBpbnRvIG93biBjbGFzcyBzbyBhbHRlcm5hdGl2ZSB0aW1lZCB0ZXh0IGZvcm1hdHMgY2FuIGJlIHVzZWQuIChUVE1MLCBERlhQKVxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5wYXJzZUN1ZXMgPSBmdW5jdGlvbihzcmNDb250ZW50KSB7XHJcbiAgdmFyIGN1ZSwgdGltZSwgdGV4dCxcclxuICAgICAgbGluZXMgPSBzcmNDb250ZW50LnNwbGl0KCdcXG4nKSxcclxuICAgICAgbGluZSA9ICcnLCBpZDtcclxuXHJcbiAgZm9yICh2YXIgaT0xLCBqPWxpbmVzLmxlbmd0aDsgaTxqOyBpKyspIHtcclxuICAgIC8vIExpbmUgMCBzaG91bGQgYmUgJ1dFQlZUVCcsIHNvIHNraXBwaW5nIGk9MFxyXG5cclxuICAgIGxpbmUgPSB2anMudHJpbShsaW5lc1tpXSk7IC8vIFRyaW0gd2hpdGVzcGFjZSBhbmQgbGluZWJyZWFrc1xyXG5cclxuICAgIGlmIChsaW5lKSB7IC8vIExvb3AgdW50aWwgYSBsaW5lIHdpdGggY29udGVudFxyXG5cclxuICAgICAgLy8gRmlyc3QgbGluZSBjb3VsZCBiZSBhbiBvcHRpb25hbCBjdWUgSURcclxuICAgICAgLy8gQ2hlY2sgaWYgbGluZSBoYXMgdGhlIHRpbWUgc2VwYXJhdG9yXHJcbiAgICAgIGlmIChsaW5lLmluZGV4T2YoJy0tPicpID09IC0xKSB7XHJcbiAgICAgICAgaWQgPSBsaW5lO1xyXG4gICAgICAgIC8vIEFkdmFuY2UgdG8gbmV4dCBsaW5lIGZvciB0aW1pbmcuXHJcbiAgICAgICAgbGluZSA9IHZqcy50cmltKGxpbmVzWysraV0pO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlkID0gdGhpcy5jdWVzXy5sZW5ndGg7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIEZpcnN0IGxpbmUgLSBOdW1iZXJcclxuICAgICAgY3VlID0ge1xyXG4gICAgICAgIGlkOiBpZCwgLy8gQ3VlIE51bWJlclxyXG4gICAgICAgIGluZGV4OiB0aGlzLmN1ZXNfLmxlbmd0aCAvLyBQb3NpdGlvbiBpbiBBcnJheVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gVGltaW5nIGxpbmVcclxuICAgICAgdGltZSA9IGxpbmUuc3BsaXQoJyAtLT4gJyk7XHJcbiAgICAgIGN1ZS5zdGFydFRpbWUgPSB0aGlzLnBhcnNlQ3VlVGltZSh0aW1lWzBdKTtcclxuICAgICAgY3VlLmVuZFRpbWUgPSB0aGlzLnBhcnNlQ3VlVGltZSh0aW1lWzFdKTtcclxuXHJcbiAgICAgIC8vIEFkZGl0aW9uYWwgbGluZXMgLSBDdWUgVGV4dFxyXG4gICAgICB0ZXh0ID0gW107XHJcblxyXG4gICAgICAvLyBMb29wIHVudGlsIGEgYmxhbmsgbGluZSBvciBlbmQgb2YgbGluZXNcclxuICAgICAgLy8gQXNzdW1laW5nIHRyaW0oJycpIHJldHVybnMgZmFsc2UgZm9yIGJsYW5rIGxpbmVzXHJcbiAgICAgIHdoaWxlIChsaW5lc1srK2ldICYmIChsaW5lID0gdmpzLnRyaW0obGluZXNbaV0pKSkge1xyXG4gICAgICAgIHRleHQucHVzaChsaW5lKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgY3VlLnRleHQgPSB0ZXh0LmpvaW4oJzxici8+Jyk7XHJcblxyXG4gICAgICAvLyBBZGQgdGhpcyBjdWVcclxuICAgICAgdGhpcy5jdWVzXy5wdXNoKGN1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aGlzLnJlYWR5U3RhdGVfID0gMjtcclxuICB0aGlzLnRyaWdnZXIoJ2xvYWRlZCcpO1xyXG59O1xyXG5cclxuXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnBhcnNlQ3VlVGltZSA9IGZ1bmN0aW9uKHRpbWVUZXh0KSB7XHJcbiAgdmFyIHBhcnRzID0gdGltZVRleHQuc3BsaXQoJzonKSxcclxuICAgICAgdGltZSA9IDAsXHJcbiAgICAgIGhvdXJzLCBtaW51dGVzLCBvdGhlciwgc2Vjb25kcywgbXM7XHJcblxyXG4gIC8vIENoZWNrIGlmIG9wdGlvbmFsIGhvdXJzIHBsYWNlIGlzIGluY2x1ZGVkXHJcbiAgLy8gMDA6MDA6MDAuMDAwIHZzLiAwMDowMC4wMDBcclxuICBpZiAocGFydHMubGVuZ3RoID09IDMpIHtcclxuICAgIGhvdXJzID0gcGFydHNbMF07XHJcbiAgICBtaW51dGVzID0gcGFydHNbMV07XHJcbiAgICBvdGhlciA9IHBhcnRzWzJdO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBob3VycyA9IDA7XHJcbiAgICBtaW51dGVzID0gcGFydHNbMF07XHJcbiAgICBvdGhlciA9IHBhcnRzWzFdO1xyXG4gIH1cclxuXHJcbiAgLy8gQnJlYWsgb3RoZXIgKHNlY29uZHMsIG1pbGxpc2Vjb25kcywgYW5kIGZsYWdzKSBieSBzcGFjZXNcclxuICAvLyBUT0RPOiBNYWtlIGFkZGl0aW9uYWwgY3VlIGxheW91dCBzZXR0aW5ncyB3b3JrIHdpdGggZmxhZ3NcclxuICBvdGhlciA9IG90aGVyLnNwbGl0KC9cXHMrLyk7XHJcbiAgLy8gUmVtb3ZlIHNlY29uZHMuIFNlY29uZHMgaXMgdGhlIGZpcnN0IHBhcnQgYmVmb3JlIGFueSBzcGFjZXMuXHJcbiAgc2Vjb25kcyA9IG90aGVyLnNwbGljZSgwLDEpWzBdO1xyXG4gIC8vIENvdWxkIHVzZSBlaXRoZXIgLiBvciAsIGZvciBkZWNpbWFsXHJcbiAgc2Vjb25kcyA9IHNlY29uZHMuc3BsaXQoL1xcLnwsLyk7XHJcbiAgLy8gR2V0IG1pbGxpc2Vjb25kc1xyXG4gIG1zID0gcGFyc2VGbG9hdChzZWNvbmRzWzFdKTtcclxuICBzZWNvbmRzID0gc2Vjb25kc1swXTtcclxuXHJcbiAgLy8gaG91cnMgPT4gc2Vjb25kc1xyXG4gIHRpbWUgKz0gcGFyc2VGbG9hdChob3VycykgKiAzNjAwO1xyXG4gIC8vIG1pbnV0ZXMgPT4gc2Vjb25kc1xyXG4gIHRpbWUgKz0gcGFyc2VGbG9hdChtaW51dGVzKSAqIDYwO1xyXG4gIC8vIEFkZCBzZWNvbmRzXHJcbiAgdGltZSArPSBwYXJzZUZsb2F0KHNlY29uZHMpO1xyXG4gIC8vIEFkZCBtaWxsaXNlY29uZHNcclxuICBpZiAobXMpIHsgdGltZSArPSBtcy8xMDAwOyB9XHJcblxyXG4gIHJldHVybiB0aW1lO1xyXG59O1xyXG5cclxuLy8gVXBkYXRlIGFjdGl2ZSBjdWVzIHdoZW5ldmVyIHRpbWV1cGRhdGUgZXZlbnRzIGFyZSB0cmlnZ2VyZWQgb24gdGhlIHBsYXllci5cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICBpZiAodGhpcy5jdWVzXy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgLy8gR2V0IGN1cmVudCBwbGF5ZXIgdGltZVxyXG4gICAgdmFyIHRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGUgbmV3IHRpbWUgaXMgb3V0c2lkZSB0aGUgdGltZSBib3ggY3JlYXRlZCBieSB0aGUgdGhlIGxhc3QgdXBkYXRlLlxyXG4gICAgaWYgKHRoaXMucHJldkNoYW5nZSA9PT0gdW5kZWZpbmVkIHx8IHRpbWUgPCB0aGlzLnByZXZDaGFuZ2UgfHwgdGhpcy5uZXh0Q2hhbmdlIDw9IHRpbWUpIHtcclxuICAgICAgdmFyIGN1ZXMgPSB0aGlzLmN1ZXNfLFxyXG5cclxuICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyB0aW1lIGJveCBmb3IgdGhpcyBzdGF0ZS5cclxuICAgICAgICAgIG5ld05leHRDaGFuZ2UgPSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSwgLy8gU3RhcnQgYXQgYmVnaW5uaW5nIG9mIHRoZSB0aW1lbGluZVxyXG4gICAgICAgICAgbmV3UHJldkNoYW5nZSA9IDAsIC8vIFN0YXJ0IGF0IGVuZFxyXG5cclxuICAgICAgICAgIHJldmVyc2UgPSBmYWxzZSwgLy8gU2V0IHRoZSBkaXJlY3Rpb24gb2YgdGhlIGxvb3AgdGhyb3VnaCB0aGUgY3Vlcy4gT3B0aW1pemVkIHRoZSBjdWUgY2hlY2suXHJcbiAgICAgICAgICBuZXdDdWVzID0gW10sIC8vIFN0b3JlIG5ldyBhY3RpdmUgY3Vlcy5cclxuXHJcbiAgICAgICAgICAvLyBTdG9yZSB3aGVyZSBpbiB0aGUgbG9vcCB0aGUgY3VycmVudCBhY3RpdmUgY3VlcyBhcmUsIHRvIHByb3ZpZGUgYSBzbWFydCBzdGFydGluZyBwb2ludCBmb3IgdGhlIG5leHQgbG9vcC5cclxuICAgICAgICAgIGZpcnN0QWN0aXZlSW5kZXgsIGxhc3RBY3RpdmVJbmRleCxcclxuICAgICAgICAgIGN1ZSwgaTsgLy8gTG9vcCB2YXJzXHJcblxyXG4gICAgICAvLyBDaGVjayBpZiB0aW1lIGlzIGdvaW5nIGZvcndhcmRzIG9yIGJhY2t3YXJkcyAoc2NydWJiaW5nL3Jld2luZGluZylcclxuICAgICAgLy8gSWYgd2Uga25vdyB0aGUgZGlyZWN0aW9uIHdlIGNhbiBvcHRpbWl6ZSB0aGUgc3RhcnRpbmcgcG9zaXRpb24gYW5kIGRpcmVjdGlvbiBvZiB0aGUgbG9vcCB0aHJvdWdoIHRoZSBjdWVzIGFycmF5LlxyXG4gICAgICBpZiAodGltZSA+PSB0aGlzLm5leHRDaGFuZ2UgfHwgdGhpcy5uZXh0Q2hhbmdlID09PSB1bmRlZmluZWQpIHsgLy8gTmV4dENoYW5nZSBzaG91bGQgaGFwcGVuXHJcbiAgICAgICAgLy8gRm9yd2FyZHMsIHNvIHN0YXJ0IGF0IHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgYWN0aXZlIGN1ZSBhbmQgbG9vcCBmb3J3YXJkXHJcbiAgICAgICAgaSA9ICh0aGlzLmZpcnN0QWN0aXZlSW5kZXggIT09IHVuZGVmaW5lZCkgPyB0aGlzLmZpcnN0QWN0aXZlSW5kZXggOiAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIEJhY2t3YXJkcywgc28gc3RhcnQgYXQgdGhlIGluZGV4IG9mIHRoZSBsYXN0IGFjdGl2ZSBjdWUgYW5kIGxvb3AgYmFja3dhcmRcclxuICAgICAgICByZXZlcnNlID0gdHJ1ZTtcclxuICAgICAgICBpID0gKHRoaXMubGFzdEFjdGl2ZUluZGV4ICE9PSB1bmRlZmluZWQpID8gdGhpcy5sYXN0QWN0aXZlSW5kZXggOiBjdWVzLmxlbmd0aCAtIDE7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHdoaWxlICh0cnVlKSB7IC8vIExvb3AgdW50aWwgYnJva2VuXHJcbiAgICAgICAgY3VlID0gY3Vlc1tpXTtcclxuXHJcbiAgICAgICAgLy8gQ3VlIGVuZGVkIGF0IHRoaXMgcG9pbnRcclxuICAgICAgICBpZiAoY3VlLmVuZFRpbWUgPD0gdGltZSkge1xyXG4gICAgICAgICAgbmV3UHJldkNoYW5nZSA9IE1hdGgubWF4KG5ld1ByZXZDaGFuZ2UsIGN1ZS5lbmRUaW1lKTtcclxuXHJcbiAgICAgICAgICBpZiAoY3VlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBjdWUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTm8gZWFybGllciBjdWVzIHNob3VsZCBoYXZlIGFuIGFjdGl2ZSBzdGFydCB0aW1lLlxyXG4gICAgICAgICAgLy8gTmV2ZXJtaW5kLiBBc3N1bWUgZmlyc3QgY3VlIGNvdWxkIGhhdmUgYSBkdXJhdGlvbiB0aGUgc2FtZSBhcyB0aGUgdmlkZW8uXHJcbiAgICAgICAgICAvLyBJbiB0aGF0IGNhc2Ugd2UgbmVlZCB0byBsb29wIGFsbCB0aGUgd2F5IGJhY2sgdG8gdGhlIGJlZ2lubmluZy5cclxuICAgICAgICAgIC8vIGlmIChyZXZlcnNlICYmIGN1ZS5zdGFydFRpbWUpIHsgYnJlYWs7IH1cclxuXHJcbiAgICAgICAgLy8gQ3VlIGhhc24ndCBzdGFydGVkXHJcbiAgICAgICAgfSBlbHNlIGlmICh0aW1lIDwgY3VlLnN0YXJ0VGltZSkge1xyXG4gICAgICAgICAgbmV3TmV4dENoYW5nZSA9IE1hdGgubWluKG5ld05leHRDaGFuZ2UsIGN1ZS5zdGFydFRpbWUpO1xyXG5cclxuICAgICAgICAgIGlmIChjdWUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIGN1ZS5hY3RpdmUgPSBmYWxzZTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAvLyBObyBsYXRlciBjdWVzIHNob3VsZCBoYXZlIGFuIGFjdGl2ZSBzdGFydCB0aW1lLlxyXG4gICAgICAgICAgaWYgKCFyZXZlcnNlKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgIC8vIEN1ZSBpcyBjdXJyZW50XHJcbiAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICBpZiAocmV2ZXJzZSkge1xyXG4gICAgICAgICAgICAvLyBBZGQgY3VlIHRvIGZyb250IG9mIGFycmF5IHRvIGtlZXAgaW4gdGltZSBvcmRlclxyXG4gICAgICAgICAgICBuZXdDdWVzLnNwbGljZSgwLDAsY3VlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGluIHJldmVyc2UsIHRoZSBmaXJzdCBjdXJyZW50IGN1ZSBpcyBvdXIgbGFzdEFjdGl2ZUN1ZVxyXG4gICAgICAgICAgICBpZiAobGFzdEFjdGl2ZUluZGV4ID09PSB1bmRlZmluZWQpIHsgbGFzdEFjdGl2ZUluZGV4ID0gaTsgfVxyXG4gICAgICAgICAgICBmaXJzdEFjdGl2ZUluZGV4ID0gaTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIEFkZCBjdWUgdG8gZW5kIG9mIGFycmF5XHJcbiAgICAgICAgICAgIG5ld0N1ZXMucHVzaChjdWUpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWYgZm9yd2FyZCwgdGhlIGZpcnN0IGN1cnJlbnQgY3VlIGlzIG91ciBmaXJzdEFjdGl2ZUluZGV4XHJcbiAgICAgICAgICAgIGlmIChmaXJzdEFjdGl2ZUluZGV4ID09PSB1bmRlZmluZWQpIHsgZmlyc3RBY3RpdmVJbmRleCA9IGk7IH1cclxuICAgICAgICAgICAgbGFzdEFjdGl2ZUluZGV4ID0gaTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICBuZXdOZXh0Q2hhbmdlID0gTWF0aC5taW4obmV3TmV4dENoYW5nZSwgY3VlLmVuZFRpbWUpO1xyXG4gICAgICAgICAgbmV3UHJldkNoYW5nZSA9IE1hdGgubWF4KG5ld1ByZXZDaGFuZ2UsIGN1ZS5zdGFydFRpbWUpO1xyXG5cclxuICAgICAgICAgIGN1ZS5hY3RpdmUgPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJldmVyc2UpIHtcclxuICAgICAgICAgIC8vIFJldmVyc2UgZG93biB0aGUgYXJyYXkgb2YgY3VlcywgYnJlYWsgaWYgYXQgZmlyc3RcclxuICAgICAgICAgIGlmIChpID09PSAwKSB7IGJyZWFrOyB9IGVsc2UgeyBpLS07IH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgLy8gV2FsayB1cCB0aGUgYXJyYXkgZm8gY3VlcywgYnJlYWsgaWYgYXQgbGFzdFxyXG4gICAgICAgICAgaWYgKGkgPT09IGN1ZXMubGVuZ3RoIC0gMSkgeyBicmVhazsgfSBlbHNlIHsgaSsrOyB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5hY3RpdmVDdWVzXyA9IG5ld0N1ZXM7XHJcbiAgICAgIHRoaXMubmV4dENoYW5nZSA9IG5ld05leHRDaGFuZ2U7XHJcbiAgICAgIHRoaXMucHJldkNoYW5nZSA9IG5ld1ByZXZDaGFuZ2U7XHJcbiAgICAgIHRoaXMuZmlyc3RBY3RpdmVJbmRleCA9IGZpcnN0QWN0aXZlSW5kZXg7XHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZUluZGV4ID0gbGFzdEFjdGl2ZUluZGV4O1xyXG5cclxuICAgICAgdGhpcy51cGRhdGVEaXNwbGF5KCk7XHJcblxyXG4gICAgICB0aGlzLnRyaWdnZXIoJ2N1ZWNoYW5nZScpO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIEFkZCBjdWUgSFRNTCB0byBkaXNwbGF5XHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnVwZGF0ZURpc3BsYXkgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBjdWVzID0gdGhpcy5hY3RpdmVDdWVzXyxcclxuICAgICAgaHRtbCA9ICcnLFxyXG4gICAgICBpPTAsaj1jdWVzLmxlbmd0aDtcclxuXHJcbiAgZm9yICg7aTxqO2krKykge1xyXG4gICAgaHRtbCArPSAnPHNwYW4gY2xhc3M9XCJ2anMtdHQtY3VlXCI+JytjdWVzW2ldLnRleHQrJzwvc3Bhbj4nO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5lbF8uaW5uZXJIVE1MID0gaHRtbDtcclxufTtcclxuXHJcbi8vIFNldCBhbGwgbG9vcCBoZWxwZXIgdmFsdWVzIGJhY2tcclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUucmVzZXQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMubmV4dENoYW5nZSA9IDA7XHJcbiAgdGhpcy5wcmV2Q2hhbmdlID0gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCk7XHJcbiAgdGhpcy5maXJzdEFjdGl2ZUluZGV4ID0gMDtcclxuICB0aGlzLmxhc3RBY3RpdmVJbmRleCA9IDA7XHJcbn07XHJcblxyXG4vLyBDcmVhdGUgc3BlY2lmaWMgdHJhY2sgdHlwZXNcclxuLyoqXHJcbiAqIFRoZSB0cmFjayBjb21wb25lbnQgZm9yIG1hbmFnaW5nIHRoZSBoaWRpbmcgYW5kIHNob3dpbmcgb2YgY2FwdGlvbnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ2FwdGlvbnNUcmFjayA9IHZqcy5UZXh0VHJhY2suZXh0ZW5kKCk7XHJcbnZqcy5DYXB0aW9uc1RyYWNrLnByb3RvdHlwZS5raW5kXyA9ICdjYXB0aW9ucyc7XHJcbi8vIEV4cG9ydGluZyBoZXJlIGJlY2F1c2UgVHJhY2sgY3JlYXRpb24gcmVxdWlyZXMgdGhlIHRyYWNrIGtpbmRcclxuLy8gdG8gYmUgYXZhaWxhYmxlIG9uIGdsb2JhbCBvYmplY3QuIGUuZy4gbmV3IHdpbmRvd1sndmlkZW9qcyddW0tpbmQgKyAnVHJhY2snXVxyXG5cclxuLyoqXHJcbiAqIFRoZSB0cmFjayBjb21wb25lbnQgZm9yIG1hbmFnaW5nIHRoZSBoaWRpbmcgYW5kIHNob3dpbmcgb2Ygc3VidGl0bGVzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlN1YnRpdGxlc1RyYWNrID0gdmpzLlRleHRUcmFjay5leHRlbmQoKTtcclxudmpzLlN1YnRpdGxlc1RyYWNrLnByb3RvdHlwZS5raW5kXyA9ICdzdWJ0aXRsZXMnO1xyXG5cclxuLyoqXHJcbiAqIFRoZSB0cmFjayBjb21wb25lbnQgZm9yIG1hbmFnaW5nIHRoZSBoaWRpbmcgYW5kIHNob3dpbmcgb2YgY2hhcHRlcnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ2hhcHRlcnNUcmFjayA9IHZqcy5UZXh0VHJhY2suZXh0ZW5kKCk7XHJcbnZqcy5DaGFwdGVyc1RyYWNrLnByb3RvdHlwZS5raW5kXyA9ICdjaGFwdGVycyc7XHJcblxyXG5cclxuLyogVGV4dCBUcmFjayBEaXNwbGF5XHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIEdsb2JhbCBjb250YWluZXIgZm9yIGJvdGggc3VidGl0bGUgYW5kIGNhcHRpb25zIHRleHQuIFNpbXBsZSBkaXYgY29udGFpbmVyLlxyXG5cclxuLyoqXHJcbiAqIFRoZSBjb21wb25lbnQgZm9yIGRpc3BsYXlpbmcgdGV4dCB0cmFjayBjdWVzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlRleHRUcmFja0Rpc3BsYXkgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIC8vIFRoaXMgdXNlZCB0byBiZSBjYWxsZWQgZHVyaW5nIHBsYXllciBpbml0LCBidXQgd2FzIGNhdXNpbmcgYW4gZXJyb3JcclxuICAgIC8vIGlmIGEgdHJhY2sgc2hvdWxkIHNob3cgYnkgZGVmYXVsdCBhbmQgdGhlIGRpc3BsYXkgaGFkbid0IGxvYWRlZCB5ZXQuXHJcbiAgICAvLyBTaG91bGQgcHJvYmFibHkgYmUgbW92ZWQgdG8gYW4gZXh0ZXJuYWwgdHJhY2sgbG9hZGVyIHdoZW4gd2Ugc3VwcG9ydFxyXG4gICAgLy8gdHJhY2tzIHRoYXQgZG9uJ3QgbmVlZCBhIGRpc3BsYXkuXHJcbiAgICBpZiAocGxheWVyLm9wdGlvbnNfWyd0cmFja3MnXSAmJiBwbGF5ZXIub3B0aW9uc19bJ3RyYWNrcyddLmxlbmd0aCA+IDApIHtcclxuICAgICAgdGhpcy5wbGF5ZXJfLmFkZFRleHRUcmFja3MocGxheWVyLm9wdGlvbnNfWyd0cmFja3MnXSk7XHJcbiAgICB9XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5UZXh0VHJhY2tEaXNwbGF5LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy10ZXh0LXRyYWNrLWRpc3BsYXknXHJcbiAgfSk7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFRoZSBzcGVjaWZpYyBtZW51IGl0ZW0gdHlwZSBmb3Igc2VsZWN0aW5nIGEgbGFuZ3VhZ2Ugd2l0aGluIGEgdGV4dCB0cmFjayBraW5kXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlRleHRUcmFja01lbnVJdGVtID0gdmpzLk1lbnVJdGVtLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2YXIgdHJhY2sgPSB0aGlzLnRyYWNrID0gb3B0aW9uc1sndHJhY2snXTtcclxuXHJcbiAgICAvLyBNb2RpZnkgb3B0aW9ucyBmb3IgcGFyZW50IE1lbnVJdGVtIGNsYXNzJ3MgaW5pdC5cclxuICAgIG9wdGlvbnNbJ2xhYmVsJ10gPSB0cmFjay5sYWJlbCgpO1xyXG4gICAgb3B0aW9uc1snc2VsZWN0ZWQnXSA9IHRyYWNrLmRmbHQoKTtcclxuICAgIHZqcy5NZW51SXRlbS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJfLm9uKHRyYWNrLmtpbmQoKSArICd0cmFja2NoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5UZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLk1lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XHJcbiAgdGhpcy5wbGF5ZXJfLnNob3dUZXh0VHJhY2sodGhpcy50cmFjay5pZF8sIHRoaXMudHJhY2sua2luZCgpKTtcclxufTtcclxuXHJcbnZqcy5UZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnNlbGVjdGVkKHRoaXMudHJhY2subW9kZSgpID09IDIpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEEgc3BlY2lhbCBtZW51IGl0ZW0gZm9yIHR1cm5pbmcgb2YgYSBzcGVjaWZpYyB0eXBlIG9mIHRleHQgdHJhY2tcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuT2ZmVGV4dFRyYWNrTWVudUl0ZW0gPSB2anMuVGV4dFRyYWNrTWVudUl0ZW0uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIC8vIENyZWF0ZSBwc2V1ZG8gdHJhY2sgaW5mb1xyXG4gICAgLy8gUmVxdWlyZXMgb3B0aW9uc1sna2luZCddXHJcbiAgICBvcHRpb25zWyd0cmFjayddID0ge1xyXG4gICAgICBraW5kOiBmdW5jdGlvbigpIHsgcmV0dXJuIG9wdGlvbnNbJ2tpbmQnXTsgfSxcclxuICAgICAgcGxheWVyOiBwbGF5ZXIsXHJcbiAgICAgIGxhYmVsOiBmdW5jdGlvbigpeyByZXR1cm4gb3B0aW9uc1sna2luZCddICsgJyBvZmYnOyB9LFxyXG4gICAgICBkZmx0OiBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH0sXHJcbiAgICAgIG1vZGU6IGZ1bmN0aW9uKCl7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgfTtcclxuICAgIHZqcy5UZXh0VHJhY2tNZW51SXRlbS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICB0aGlzLnNlbGVjdGVkKHRydWUpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuT2ZmVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5UZXh0VHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xyXG4gIHRoaXMucGxheWVyXy5zaG93VGV4dFRyYWNrKHRoaXMudHJhY2suaWRfLCB0aGlzLnRyYWNrLmtpbmQoKSk7XHJcbn07XHJcblxyXG52anMuT2ZmVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHRyYWNrcyA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCksXHJcbiAgICAgIGk9MCwgaj10cmFja3MubGVuZ3RoLCB0cmFjayxcclxuICAgICAgb2ZmID0gdHJ1ZTtcclxuXHJcbiAgZm9yICg7aTxqO2krKykge1xyXG4gICAgdHJhY2sgPSB0cmFja3NbaV07XHJcbiAgICBpZiAodHJhY2sua2luZCgpID09IHRoaXMudHJhY2sua2luZCgpICYmIHRyYWNrLm1vZGUoKSA9PSAyKSB7XHJcbiAgICAgIG9mZiA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5zZWxlY3RlZChvZmYpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBidXR0b25zIHRoYXQgdG9nZ2xlIHNwZWNpZmljIHRleHQgdHJhY2sgdHlwZXMgKGUuZy4gc3VidGl0bGVzKVxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5UZXh0VHJhY2tCdXR0b24gPSB2anMuTWVudUJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLk1lbnVCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA8PSAxKSB7XHJcbiAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG4vLyB2anMuVGV4dFRyYWNrQnV0dG9uLnByb3RvdHlwZS5idXR0b25QcmVzc2VkID0gZmFsc2U7XHJcblxyXG4vLyB2anMuVGV4dFRyYWNrQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcclxuLy8gICB2YXIgbWVudSA9IG5ldyB2anMuTWVudSh0aGlzLnBsYXllcl8pO1xyXG5cclxuLy8gICAvLyBBZGQgYSB0aXRsZSBsaXN0IGl0ZW0gdG8gdGhlIHRvcFxyXG4vLyAgIC8vIG1lbnUuZWwoKS5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2xpJywge1xyXG4vLyAgIC8vICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtdGl0bGUnLFxyXG4vLyAgIC8vICAgaW5uZXJIVE1MOiB2anMuY2FwaXRhbGl6ZSh0aGlzLmtpbmRfKSxcclxuLy8gICAvLyAgIHRhYmluZGV4OiAtMVxyXG4vLyAgIC8vIH0pKTtcclxuXHJcbi8vICAgdGhpcy5pdGVtcyA9IHRoaXMuY3JlYXRlSXRlbXMoKTtcclxuXHJcbi8vICAgLy8gQWRkIG1lbnUgaXRlbXMgdG8gdGhlIG1lbnVcclxuLy8gICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuLy8gICAgIG1lbnUuYWRkSXRlbSh0aGlzLml0ZW1zW2ldKTtcclxuLy8gICB9XHJcblxyXG4vLyAgIC8vIEFkZCBsaXN0IHRvIGVsZW1lbnRcclxuLy8gICB0aGlzLmFkZENoaWxkKG1lbnUpO1xyXG5cclxuLy8gICByZXR1cm4gbWVudTtcclxuLy8gfTtcclxuXHJcbi8vIENyZWF0ZSBhIG1lbnUgaXRlbSBmb3IgZWFjaCB0ZXh0IHRyYWNrXHJcbnZqcy5UZXh0VHJhY2tCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUl0ZW1zID0gZnVuY3Rpb24oKXtcclxuICB2YXIgaXRlbXMgPSBbXSwgdHJhY2s7XHJcblxyXG4gIC8vIEFkZCBhbiBPRkYgbWVudSBpdGVtIHRvIHR1cm4gYWxsIHRyYWNrcyBvZmZcclxuICBpdGVtcy5wdXNoKG5ldyB2anMuT2ZmVGV4dFRyYWNrTWVudUl0ZW0odGhpcy5wbGF5ZXJfLCB7ICdraW5kJzogdGhpcy5raW5kXyB9KSk7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKS5sZW5ndGg7IGkrKykge1xyXG4gICAgdHJhY2sgPSB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpW2ldO1xyXG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PT0gdGhpcy5raW5kXykge1xyXG4gICAgICBpdGVtcy5wdXNoKG5ldyB2anMuVGV4dFRyYWNrTWVudUl0ZW0odGhpcy5wbGF5ZXJfLCB7XHJcbiAgICAgICAgJ3RyYWNrJzogdHJhY2tcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBidXR0b24gY29tcG9uZW50IGZvciB0b2dnbGluZyBhbmQgc2VsZWN0aW5nIGNhcHRpb25zXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNhcHRpb25zQnV0dG9uID0gdmpzLlRleHRUcmFja0J1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5UZXh0VHJhY2tCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsJ0NhcHRpb25zIE1lbnUnKTtcclxuICB9XHJcbn0pO1xyXG52anMuQ2FwdGlvbnNCdXR0b24ucHJvdG90eXBlLmtpbmRfID0gJ2NhcHRpb25zJztcclxudmpzLkNhcHRpb25zQnV0dG9uLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ0NhcHRpb25zJztcclxudmpzLkNhcHRpb25zQnV0dG9uLnByb3RvdHlwZS5jbGFzc05hbWUgPSAndmpzLWNhcHRpb25zLWJ1dHRvbic7XHJcblxyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3Rpbmcgc3VidGl0bGVzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlN1YnRpdGxlc0J1dHRvbiA9IHZqcy5UZXh0VHJhY2tCdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuVGV4dFRyYWNrQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdTdWJ0aXRsZXMgTWVudScpO1xyXG4gIH1cclxufSk7XHJcbnZqcy5TdWJ0aXRsZXNCdXR0b24ucHJvdG90eXBlLmtpbmRfID0gJ3N1YnRpdGxlcyc7XHJcbnZqcy5TdWJ0aXRsZXNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnU3VidGl0bGVzJztcclxudmpzLlN1YnRpdGxlc0J1dHRvbi5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ3Zqcy1zdWJ0aXRsZXMtYnV0dG9uJztcclxuXHJcbi8vIENoYXB0ZXJzIGFjdCBtdWNoIGRpZmZlcmVudGx5IHRoYW4gb3RoZXIgdGV4dCB0cmFja3NcclxuLy8gQ3VlcyBhcmUgbmF2aWdhdGlvbiB2cy4gb3RoZXIgdHJhY2tzIG9mIGFsdGVybmF0aXZlIGxhbmd1YWdlc1xyXG4vKipcclxuICogVGhlIGJ1dHRvbiBjb21wb25lbnQgZm9yIHRvZ2dsaW5nIGFuZCBzZWxlY3RpbmcgY2hhcHRlcnNcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ2hhcHRlcnNCdXR0b24gPSB2anMuVGV4dFRyYWNrQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLlRleHRUcmFja0J1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywnQ2hhcHRlcnMgTWVudScpO1xyXG4gIH1cclxufSk7XHJcbnZqcy5DaGFwdGVyc0J1dHRvbi5wcm90b3R5cGUua2luZF8gPSAnY2hhcHRlcnMnO1xyXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnQ2hhcHRlcnMnO1xyXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmNsYXNzTmFtZSA9ICd2anMtY2hhcHRlcnMtYnV0dG9uJztcclxuXHJcbi8vIENyZWF0ZSBhIG1lbnUgaXRlbSBmb3IgZWFjaCB0ZXh0IHRyYWNrXHJcbnZqcy5DaGFwdGVyc0J1dHRvbi5wcm90b3R5cGUuY3JlYXRlSXRlbXMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBpdGVtcyA9IFtdLCB0cmFjaztcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0cmFjayA9IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKClbaV07XHJcbiAgICBpZiAodHJhY2sua2luZCgpID09PSB0aGlzLmtpbmRfKSB7XHJcbiAgICAgIGl0ZW1zLnB1c2gobmV3IHZqcy5UZXh0VHJhY2tNZW51SXRlbSh0aGlzLnBsYXllcl8sIHtcclxuICAgICAgICAndHJhY2snOiB0cmFja1xyXG4gICAgICB9KSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaXRlbXM7XHJcbn07XHJcblxyXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmNyZWF0ZU1lbnUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB0cmFja3MgPSB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpLFxyXG4gICAgICBpID0gMCxcclxuICAgICAgaiA9IHRyYWNrcy5sZW5ndGgsXHJcbiAgICAgIHRyYWNrLCBjaGFwdGVyc1RyYWNrLFxyXG4gICAgICBpdGVtcyA9IHRoaXMuaXRlbXMgPSBbXTtcclxuXHJcbiAgZm9yICg7aTxqO2krKykge1xyXG4gICAgdHJhY2sgPSB0cmFja3NbaV07XHJcbiAgICBpZiAodHJhY2sua2luZCgpID09IHRoaXMua2luZF8gJiYgdHJhY2suZGZsdCgpKSB7XHJcbiAgICAgIGlmICh0cmFjay5yZWFkeVN0YXRlKCkgPCAyKSB7XHJcbiAgICAgICAgdGhpcy5jaGFwdGVyc1RyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgdHJhY2sub24oJ2xvYWRlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuY3JlYXRlTWVudSkpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjaGFwdGVyc1RyYWNrID0gdHJhY2s7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHZhciBtZW51ID0gdGhpcy5tZW51ID0gbmV3IHZqcy5NZW51KHRoaXMucGxheWVyXyk7XHJcblxyXG4gIG1lbnUuZWxfLmFwcGVuZENoaWxkKHZqcy5jcmVhdGVFbCgnbGknLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbWVudS10aXRsZScsXHJcbiAgICBpbm5lckhUTUw6IHZqcy5jYXBpdGFsaXplKHRoaXMua2luZF8pLFxyXG4gICAgdGFiaW5kZXg6IC0xXHJcbiAgfSkpO1xyXG5cclxuICBpZiAoY2hhcHRlcnNUcmFjaykge1xyXG4gICAgdmFyIGN1ZXMgPSBjaGFwdGVyc1RyYWNrLmN1ZXNfLCBjdWUsIG1pO1xyXG4gICAgaSA9IDA7XHJcbiAgICBqID0gY3Vlcy5sZW5ndGg7XHJcblxyXG4gICAgZm9yICg7aTxqO2krKykge1xyXG4gICAgICBjdWUgPSBjdWVzW2ldO1xyXG5cclxuICAgICAgbWkgPSBuZXcgdmpzLkNoYXB0ZXJzVHJhY2tNZW51SXRlbSh0aGlzLnBsYXllcl8sIHtcclxuICAgICAgICAndHJhY2snOiBjaGFwdGVyc1RyYWNrLFxyXG4gICAgICAgICdjdWUnOiBjdWVcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBpdGVtcy5wdXNoKG1pKTtcclxuXHJcbiAgICAgIG1lbnUuYWRkQ2hpbGQobWkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgaWYgKHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhpcy5zaG93KCk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbWVudTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtID0gdmpzLk1lbnVJdGVtLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2YXIgdHJhY2sgPSB0aGlzLnRyYWNrID0gb3B0aW9uc1sndHJhY2snXSxcclxuICAgICAgICBjdWUgPSB0aGlzLmN1ZSA9IG9wdGlvbnNbJ2N1ZSddLFxyXG4gICAgICAgIGN1cnJlbnRUaW1lID0gcGxheWVyLmN1cnJlbnRUaW1lKCk7XHJcblxyXG4gICAgLy8gTW9kaWZ5IG9wdGlvbnMgZm9yIHBhcmVudCBNZW51SXRlbSBjbGFzcydzIGluaXQuXHJcbiAgICBvcHRpb25zWydsYWJlbCddID0gY3VlLnRleHQ7XHJcbiAgICBvcHRpb25zWydzZWxlY3RlZCddID0gKGN1ZS5zdGFydFRpbWUgPD0gY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUgPCBjdWUuZW5kVGltZSk7XHJcbiAgICB2anMuTWVudUl0ZW0uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHRyYWNrLm9uKCdjdWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuQ2hhcHRlcnNUcmFja01lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB2anMuTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcclxuICB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUodGhpcy5jdWUuc3RhcnRUaW1lKTtcclxuICB0aGlzLnVwZGF0ZSh0aGlzLmN1ZS5zdGFydFRpbWUpO1xyXG59O1xyXG5cclxudmpzLkNoYXB0ZXJzVHJhY2tNZW51SXRlbS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oKXtcclxuICB2YXIgY3VlID0gdGhpcy5jdWUsXHJcbiAgICAgIGN1cnJlbnRUaW1lID0gdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcblxyXG4gIC8vIHZqcy5sb2coY3VycmVudFRpbWUsIGN1ZS5zdGFydFRpbWUpO1xyXG4gIHRoaXMuc2VsZWN0ZWQoY3VlLnN0YXJ0VGltZSA8PSBjdXJyZW50VGltZSAmJiBjdXJyZW50VGltZSA8IGN1ZS5lbmRUaW1lKTtcclxufTtcclxuXHJcbi8vIEFkZCBCdXR0b25zIHRvIGNvbnRyb2xCYXJcclxudmpzLm9iai5tZXJnZSh2anMuQ29udHJvbEJhci5wcm90b3R5cGUub3B0aW9uc19bJ2NoaWxkcmVuJ10sIHtcclxuICAnc3VidGl0bGVzQnV0dG9uJzoge30sXHJcbiAgJ2NhcHRpb25zQnV0dG9uJzoge30sXHJcbiAgJ2NoYXB0ZXJzQnV0dG9uJzoge31cclxufSk7XHJcblxyXG4vLyB2anMuQ3VlID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4vLyAgIC8qKiBAY29uc3RydWN0b3IgKi9cclxuLy8gICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4vLyAgICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbi8vICAgfVxyXG4vLyB9KTtcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgQWRkIEpTT04gc3VwcG9ydFxyXG4gKiBAc3VwcHJlc3Mge3VuZGVmaW5lZFZhcnN9XHJcbiAqIChDb21waWxlciBkb2Vzbid0IGxpa2UgSlNPTiBub3QgYmVpbmcgZGVjbGFyZWQpXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEphdmFzY3JpcHQgSlNPTiBpbXBsZW1lbnRhdGlvblxyXG4gKiAoUGFyc2UgTWV0aG9kIE9ubHkpXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9kb3VnbGFzY3JvY2tmb3JkL0pTT04tanMvYmxvYi9tYXN0ZXIvanNvbjIuanNcclxuICogT25seSB1c2luZyBmb3IgcGFyc2UgbWV0aG9kIHdoZW4gcGFyc2luZyBkYXRhLXNldHVwIGF0dHJpYnV0ZSBKU09OLlxyXG4gKiBAc3VwcHJlc3Mge3VuZGVmaW5lZFZhcnN9XHJcbiAqIEBuYW1lc3BhY2VcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5KU09OO1xyXG5cclxuaWYgKHR5cGVvZiB3aW5kb3cuSlNPTiAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LkpTT04ucGFyc2UgPT09ICdmdW5jdGlvbicpIHtcclxuICB2anMuSlNPTiA9IHdpbmRvdy5KU09OO1xyXG5cclxufSBlbHNlIHtcclxuICB2anMuSlNPTiA9IHt9O1xyXG5cclxuICB2YXIgY3ggPSAvW1xcdTAwMDBcXHUwMGFkXFx1MDYwMC1cXHUwNjA0XFx1MDcwZlxcdTE3YjRcXHUxN2I1XFx1MjAwYy1cXHUyMDBmXFx1MjAyOC1cXHUyMDJmXFx1MjA2MC1cXHUyMDZmXFx1ZmVmZlxcdWZmZjAtXFx1ZmZmZl0vZztcclxuXHJcbiAgLyoqXHJcbiAgICogcGFyc2UgdGhlIGpzb25cclxuICAgKlxyXG4gICAqIEBtZW1iZXJvZiB2anMuSlNPTlxyXG4gICAqIEByZXR1cm4ge09iamVjdHxBcnJheX0gVGhlIHBhcnNlZCBKU09OXHJcbiAgICovXHJcbiAgdmpzLkpTT04ucGFyc2UgPSBmdW5jdGlvbiAodGV4dCwgcmV2aXZlcikge1xyXG4gICAgICB2YXIgajtcclxuXHJcbiAgICAgIGZ1bmN0aW9uIHdhbGsoaG9sZGVyLCBrZXkpIHtcclxuICAgICAgICAgIHZhciBrLCB2LCB2YWx1ZSA9IGhvbGRlcltrZXldO1xyXG4gICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICBmb3IgKGsgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgaykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgIHYgPSB3YWxrKHZhbHVlLCBrKTtcclxuICAgICAgICAgICAgICAgICAgICAgIGlmICh2ICE9PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVtrXSA9IHY7XHJcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtrXTtcclxuICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHJldHVybiByZXZpdmVyLmNhbGwoaG9sZGVyLCBrZXksIHZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgICB0ZXh0ID0gU3RyaW5nKHRleHQpO1xyXG4gICAgICBjeC5sYXN0SW5kZXggPSAwO1xyXG4gICAgICBpZiAoY3gudGVzdCh0ZXh0KSkge1xyXG4gICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShjeCwgZnVuY3Rpb24gKGEpIHtcclxuICAgICAgICAgICAgICByZXR1cm4gJ1xcXFx1JyArXHJcbiAgICAgICAgICAgICAgICAgICgnMDAwMCcgKyBhLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpKS5zbGljZSgtNCk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKC9eW1xcXSw6e31cXHNdKiQvXHJcbiAgICAgICAgICAgICAgLnRlc3QodGV4dC5yZXBsYWNlKC9cXFxcKD86W1wiXFxcXFxcL2JmbnJ0XXx1WzAtOWEtZkEtRl17NH0pL2csICdAJylcclxuICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1wiW15cIlxcXFxcXG5cXHJdKlwifHRydWV8ZmFsc2V8bnVsbHwtP1xcZCsoPzpcXC5cXGQqKT8oPzpbZUVdWytcXC1dP1xcZCspPy9nLCAnXScpXHJcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8oPzpefDp8LCkoPzpcXHMqXFxbKSsvZywgJycpKSkge1xyXG5cclxuICAgICAgICAgIGogPSBldmFsKCcoJyArIHRleHQgKyAnKScpO1xyXG5cclxuICAgICAgICAgIHJldHVybiB0eXBlb2YgcmV2aXZlciA9PT0gJ2Z1bmN0aW9uJyA/XHJcbiAgICAgICAgICAgICAgd2Fsayh7Jyc6IGp9LCAnJykgOiBqO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ0pTT04ucGFyc2UoKTogaW52YWxpZCBvciBtYWxmb3JtZWQgSlNPTiBkYXRhJyk7XHJcbiAgfTtcclxufVxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBGdW5jdGlvbnMgZm9yIGF1dG9tYXRpY2FsbHkgc2V0dGluZyB1cCBhIHBsYXllclxyXG4gKiBiYXNlZCBvbiB0aGUgZGF0YS1zZXR1cCBhdHRyaWJ1dGUgb2YgdGhlIHZpZGVvIHRhZ1xyXG4gKi9cclxuXHJcbi8vIEF1dG9tYXRpY2FsbHkgc2V0IHVwIGFueSB0YWdzIHRoYXQgaGF2ZSBhIGRhdGEtc2V0dXAgYXR0cmlidXRlXHJcbnZqcy5hdXRvU2V0dXAgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBvcHRpb25zLCB2aWQsIHBsYXllcixcclxuICAgICAgdmlkcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd2aWRlbycpO1xyXG5cclxuICAvLyBDaGVjayBpZiBhbnkgbWVkaWEgZWxlbWVudHMgZXhpc3RcclxuICBpZiAodmlkcyAmJiB2aWRzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICBmb3IgKHZhciBpPTAsaj12aWRzLmxlbmd0aDsgaTxqOyBpKyspIHtcclxuICAgICAgdmlkID0gdmlkc1tpXTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGVsZW1lbnQgZXhpc3RzLCBoYXMgZ2V0QXR0cmlidXRlIGZ1bmMuXHJcbiAgICAgIC8vIElFIHNlZW1zIHRvIGNvbnNpZGVyIHR5cGVvZiBlbC5nZXRBdHRyaWJ1dGUgPT0gJ29iamVjdCcgaW5zdGVhZCBvZiAnZnVuY3Rpb24nIGxpa2UgZXhwZWN0ZWQsIGF0IGxlYXN0IHdoZW4gbG9hZGluZyB0aGUgcGxheWVyIGltbWVkaWF0ZWx5LlxyXG4gICAgICBpZiAodmlkICYmIHZpZC5nZXRBdHRyaWJ1dGUpIHtcclxuXHJcbiAgICAgICAgLy8gTWFrZSBzdXJlIHRoaXMgcGxheWVyIGhhc24ndCBhbHJlYWR5IGJlZW4gc2V0IHVwLlxyXG4gICAgICAgIGlmICh2aWRbJ3BsYXllciddID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICAgIG9wdGlvbnMgPSB2aWQuZ2V0QXR0cmlidXRlKCdkYXRhLXNldHVwJyk7XHJcblxyXG4gICAgICAgICAgLy8gQ2hlY2sgaWYgZGF0YS1zZXR1cCBhdHRyIGV4aXN0cy5cclxuICAgICAgICAgIC8vIFdlIG9ubHkgYXV0by1zZXR1cCBpZiB0aGV5J3ZlIGFkZGVkIHRoZSBkYXRhLXNldHVwIGF0dHIuXHJcbiAgICAgICAgICBpZiAob3B0aW9ucyAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgLy8gUGFyc2Ugb3B0aW9ucyBKU09OXHJcbiAgICAgICAgICAgIC8vIElmIGVtcHR5IHN0cmluZywgbWFrZSBpdCBhIHBhcnNhYmxlIGpzb24gb2JqZWN0LlxyXG4gICAgICAgICAgICBvcHRpb25zID0gdmpzLkpTT04ucGFyc2Uob3B0aW9ucyB8fCAne30nKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENyZWF0ZSBuZXcgdmlkZW8uanMgaW5zdGFuY2UuXHJcbiAgICAgICAgICAgIHBsYXllciA9IHZpZGVvanModmlkLCBvcHRpb25zKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyBJZiBnZXRBdHRyaWJ1dGUgaXNuJ3QgZGVmaW5lZCwgd2UgbmVlZCB0byB3YWl0IGZvciB0aGUgRE9NLlxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZqcy5hdXRvU2V0dXBUaW1lb3V0KDEpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gIC8vIE5vIHZpZGVvcyB3ZXJlIGZvdW5kLCBzbyBrZWVwIGxvb3BpbmcgdW5sZXNzIHBhZ2UgaXMgZmluaXNlaGQgbG9hZGluZy5cclxuICB9IGVsc2UgaWYgKCF2anMud2luZG93TG9hZGVkKSB7XHJcbiAgICB2anMuYXV0b1NldHVwVGltZW91dCgxKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBQYXVzZSB0byBsZXQgdGhlIERPTSBrZWVwIHByb2Nlc3NpbmdcclxudmpzLmF1dG9TZXR1cFRpbWVvdXQgPSBmdW5jdGlvbih3YWl0KXtcclxuICBzZXRUaW1lb3V0KHZqcy5hdXRvU2V0dXAsIHdhaXQpO1xyXG59O1xyXG5cclxuaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdjb21wbGV0ZScpIHtcclxuICB2anMud2luZG93TG9hZGVkID0gdHJ1ZTtcclxufSBlbHNlIHtcclxuICB2anMub25lKHdpbmRvdywgJ2xvYWQnLCBmdW5jdGlvbigpe1xyXG4gICAgdmpzLndpbmRvd0xvYWRlZCA9IHRydWU7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIFJ1biBBdXRvLWxvYWQgcGxheWVyc1xyXG4vLyBZb3UgaGF2ZSB0byB3YWl0IGF0IGxlYXN0IG9uY2UgaW4gY2FzZSB0aGlzIHNjcmlwdCBpcyBsb2FkZWQgYWZ0ZXIgeW91ciB2aWRlbyBpbiB0aGUgRE9NICh3ZWlyZCBiZWhhdmlvciBvbmx5IHdpdGggbWluaWZpZWQgdmVyc2lvbilcclxudmpzLmF1dG9TZXR1cFRpbWVvdXQoMSk7XHJcbi8qKlxyXG4gKiB0aGUgbWV0aG9kIGZvciByZWdpc3RlcmluZyBhIHZpZGVvLmpzIHBsdWdpblxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9IG5hbWUgVGhlIG5hbWUgb2YgdGhlIHBsdWdpblxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gaW5pdCBUaGUgZnVuY3Rpb24gdGhhdCBpcyBydW4gd2hlbiB0aGUgcGxheWVyIGluaXRzXHJcbiAqL1xyXG52anMucGx1Z2luID0gZnVuY3Rpb24obmFtZSwgaW5pdCl7XHJcbiAgdmpzLlBsYXllci5wcm90b3R5cGVbbmFtZV0gPSBpbml0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xpYi9wbGF5ZXIvdmlkZW8uZGV2LmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiLyoqXHJcbiDilojilpLilpPilpLilpEgVGhlIEZsZXhQYXBlciBQcm9qZWN0XHJcblxyXG4gVGhpcyBmaWxlIGlzIHBhcnQgb2YgRmxleFBhcGVyLlxyXG5cclxuIEZsZXhQYXBlciBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XHJcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxyXG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLlxyXG5cclxuIEZsZXhQYXBlciBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxyXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcclxuIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcclxuIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXHJcblxyXG4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcclxuIGFsb25nIHdpdGggRmxleFBhcGVyLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxyXG5cclxuIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIEZsZXhQYXBlciBwbGVhc2Ugc2VlIHRoZSBGbGV4UGFwZXIgcHJvamVjdFxyXG4gaG9tZSBwYWdlOiBodHRwOi8vZmxleHBhcGVyLmRldmFsZGkuY29tXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEZsZXhQYXBlciBoZWxwZXIgZnVuY3Rpb24gZm9yIHJldHJpZXZpbmcgYSBhY3RpdmUgRmxleFBhcGVyIGluc3RhbmNlXHJcbiAqXHJcbiAqL1xyXG53aW5kb3cuJEZsZXhQYXBlciA9IHdpbmRvdy5nZXREb2NWaWV3ZXIgPSB3aW5kb3dbXCIkRmxleFBhcGVyXCJdID0gZnVuY3Rpb24oaWQpe1xyXG4gICAgdmFyIGluc3RhbmNlID0gKGlkPT09XCJ1bmRlZmluZWRcIik/XCJcIjppZDtcclxuXHJcbiAgICByZXR1cm4gd2luZG93W1wiRmxleFBhcGVyVmlld2VyX0luc3RhbmNlXCIraW5zdGFuY2VdLmdldEFwaSgpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEZsZXhQYXBlciBlbWJlZGRpbmcgKG5hbWUgb2YgcGxhY2Vob2xkZXIsIGNvbmZpZylcclxuICpcclxuICovXHJcbndpbmRvdy5GbGV4UGFwZXJWaWV3ZXJFbWJlZGRpbmcgPSB3aW5kb3cuJGYgPSBmdW5jdGlvbihpZCwgYXJncykge1xyXG4gICAgdmFyIGNvbmZpZyA9IGFyZ3MuY29uZmlnO1xyXG4gICAgdmFyIF9TV0ZGaWxlLF9QREZGaWxlLF9JTUdGaWxlcyxfSlNPTkZpbGUgID0gXCJcIixfanNEaXJlY3Rvcnk9XCJcIixfY3NzRGlyZWN0b3J5PVwiXCIsX2xvY2FsZURpcmVjdG9yeT1cIlwiO19XTW9kZSA9IChjb25maWcuV01vZGUhPW51bGx8fGNvbmZpZy53bW1vZGUhPW51bGw/Y29uZmlnLndtbW9kZXx8Y29uZmlnLldNb2RlOlwid2luZG93XCIpO1xyXG4gICAgdmFyIF91RG9jID0gKChjb25maWcuRE9DICE9bnVsbCk/dW5lc2NhcGUoY29uZmlnLkRPQyk6bnVsbCk7XHJcbiAgICB2YXIgaW5zdGFuY2UgPSBcIkZsZXhQYXBlclZpZXdlcl9JbnN0YW5jZVwiKygoaWQ9PT1cInVuZGVmaW5lZFwiKT9cIlwiOmlkKTtcclxuICAgIHZhciBfSlNPTkRhdGFUeXBlID0gKGNvbmZpZy5KU09ORGF0YVR5cGUhPW51bGwpP2NvbmZpZy5KU09ORGF0YVR5cGU6XCJqc29uXCI7XHJcblxyXG4gICAgaWYgKF91RG9jICE9IG51bGwpIHtcclxuICAgICAgICBfU1dGRmlsZSBcdD0gRkxFWFBBUEVSLnRyYW5zbGF0ZVVybEJ5Rm9ybWF0KF91RG9jLFwic3dmXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIF9TV0ZGaWxlICBcdFx0XHQ9IChjb25maWcuU3dmRmlsZSE9bnVsbD9jb25maWcuU3dmRmlsZTpfU1dGRmlsZSk7XHJcbiAgICBfU1dGRmlsZSAgXHRcdFx0PSAoY29uZmlnLlNXRkZpbGUhPW51bGw/Y29uZmlnLlNXRkZpbGU6X1NXRkZpbGUpO1xyXG4gICAgX1BERkZpbGUgXHRcdFx0PSAoY29uZmlnLlBERkZpbGUhPW51bGw/Y29uZmlnLlBERkZpbGU6X1BERkZpbGUpO1xyXG4gICAgX0lNR0ZpbGVzIFx0XHRcdD0gKGNvbmZpZy5JTUdGaWxlcyE9bnVsbD9jb25maWcuSU1HRmlsZXM6X0lNR0ZpbGVzKTtcclxuICAgIF9JTUdGaWxlcyBcdFx0XHQ9IChjb25maWcuUGFnZUltYWdlUGF0dGVybiE9bnVsbD9jb25maWcuUGFnZUltYWdlUGF0dGVybjpfSU1HRmlsZXMpO1xyXG4gICAgX0pTT05GaWxlIFx0XHRcdD0gKGNvbmZpZy5KU09ORmlsZSE9bnVsbD9jb25maWcuSlNPTkZpbGU6X0pTT05GaWxlKTtcclxuICAgIF9qc0RpcmVjdG9yeSBcdFx0PSAoY29uZmlnLmpzRGlyZWN0b3J5IT1udWxsP2NvbmZpZy5qc0RpcmVjdG9yeTpcImpzL1wiKTtcclxuICAgIF9jc3NEaXJlY3RvcnkgXHRcdD0gKGNvbmZpZy5jc3NEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmNzc0RpcmVjdG9yeTpcImNzcy9cIik7XHJcbiAgICBfbG9jYWxlRGlyZWN0b3J5IFx0PSAoY29uZmlnLmxvY2FsZURpcmVjdG9yeSE9bnVsbD9jb25maWcubG9jYWxlRGlyZWN0b3J5OlwibG9jYWxlL1wiKTtcclxuICAgIGlmKF9TV0ZGaWxlIT1udWxsICYmIF9TV0ZGaWxlLmluZGV4T2YoXCJ7XCIgKT09MCAmJiBfU1dGRmlsZS5pbmRleE9mKFwiWyosXCIgKSA+IDAgJiYgX1NXRkZpbGUuaW5kZXhPZihcIl1cIiApID4gMCl7X1NXRkZpbGUgPSBlc2NhcGUoX1NXRkZpbGUpO30gLy8gc3BsaXQgZmlsZSBmaXhcclxuXHJcbiAgICB3aW5kb3dbaW5zdGFuY2VdID0gZmxhc2hlbWJlZChpZCwge1xyXG4gICAgICAgIHNyY1x0XHRcdFx0XHRcdCAgICA6IF9qc0RpcmVjdG9yeStcIi4vRmxleFBhcGVyVmlld2VyLnN3ZlwiLFxyXG4gICAgICAgIHZlcnNpb25cdFx0XHRcdFx0ICAgIDogWzEwLCAwXSxcclxuICAgICAgICBleHByZXNzSW5zdGFsbFx0XHRcdCAgICA6IFwianMvZXhwcmVzc2luc3RhbGwuc3dmXCIsXHJcbiAgICAgICAgd21vZGVcdFx0XHRcdFx0ICAgIDogX1dNb2RlXHJcbiAgICB9LHtcclxuICAgICAgICBFbGVtZW50SWQgICAgICAgICAgICAgICA6IGlkLFxyXG4gICAgICAgIFN3ZkZpbGUgIFx0XHRcdFx0OiBfU1dGRmlsZSxcclxuICAgICAgICBQZGZGaWxlICBcdFx0XHRcdDogX1BERkZpbGUsXHJcbiAgICAgICAgSU1HRmlsZXMgIFx0XHRcdFx0OiBfSU1HRmlsZXMsXHJcbiAgICAgICAgSlNPTkZpbGUgXHRcdFx0XHQ6IF9KU09ORmlsZSxcclxuICAgICAgICB1c2VDdXN0b21KU09ORm9ybWF0IFx0OiBjb25maWcudXNlQ3VzdG9tSlNPTkZvcm1hdCxcclxuICAgICAgICBKU09OUGFnZURhdGFGb3JtYXQgXHRcdDogY29uZmlnLkpTT05QYWdlRGF0YUZvcm1hdCxcclxuICAgICAgICBKU09ORGF0YVR5cGUgXHRcdFx0OiBfSlNPTkRhdGFUeXBlLFxyXG4gICAgICAgIFNjYWxlIFx0XHRcdFx0XHQ6IChjb25maWcuU2NhbGUhPW51bGwpP2NvbmZpZy5TY2FsZTowLjgsXHJcbiAgICAgICAgWm9vbVRyYW5zaXRpb24gXHRcdFx0OiAoY29uZmlnLlpvb21UcmFuc2l0aW9uIT1udWxsKT9jb25maWcuWm9vbVRyYW5zaXRpb246J2Vhc2VPdXQnLFxyXG4gICAgICAgIFpvb21UaW1lIFx0XHRcdFx0OiAoY29uZmlnLlpvb21UaW1lIT1udWxsKT9jb25maWcuWm9vbVRpbWU6MC41LFxyXG4gICAgICAgIFpvb21JbnRlcnZhbCBcdFx0XHQ6IChjb25maWcuWm9vbUludGVydmFsKT9jb25maWcuWm9vbUludGVydmFsOjAuMixcclxuICAgICAgICBGaXRQYWdlT25Mb2FkIFx0XHRcdDogKGNvbmZpZy5GaXRQYWdlT25Mb2FkIT1udWxsKT9jb25maWcuRml0UGFnZU9uTG9hZDpmYWxzZSxcclxuICAgICAgICBGaXRXaWR0aE9uTG9hZCBcdFx0XHQ6IChjb25maWcuRml0V2lkdGhPbkxvYWQhPW51bGwpP2NvbmZpZy5GaXRXaWR0aE9uTG9hZDpmYWxzZSxcclxuICAgICAgICBGdWxsU2NyZWVuQXNNYXhXaW5kb3cgXHQ6IChjb25maWcuRnVsbFNjcmVlbkFzTWF4V2luZG93IT1udWxsKT9jb25maWcuRnVsbFNjcmVlbkFzTWF4V2luZG93OmZhbHNlLFxyXG4gICAgICAgIFByb2dyZXNzaXZlTG9hZGluZyBcdFx0OiAoY29uZmlnLlByb2dyZXNzaXZlTG9hZGluZyE9bnVsbCk/Y29uZmlnLlByb2dyZXNzaXZlTG9hZGluZzpmYWxzZSxcclxuICAgICAgICBNaW5ab29tU2l6ZSBcdFx0XHQ6IChjb25maWcuTWluWm9vbVNpemUhPW51bGwpP2NvbmZpZy5NaW5ab29tU2l6ZTowLjIsXHJcbiAgICAgICAgTWF4Wm9vbVNpemUgXHRcdFx0OiAoY29uZmlnLk1heFpvb21TaXplIT1udWxsKT9jb25maWcuTWF4Wm9vbVNpemU6NSxcclxuICAgICAgICBTZWFyY2hNYXRjaEFsbCBcdFx0XHQ6IChjb25maWcuU2VhcmNoTWF0Y2hBbGwhPW51bGwpP2NvbmZpZy5TZWFyY2hNYXRjaEFsbDpmYWxzZSxcclxuICAgICAgICBTZWFyY2hTZXJ2aWNlVXJsIFx0XHQ6IGNvbmZpZy5TZWFyY2hTZXJ2aWNlVXJsLFxyXG4gICAgICAgIEluaXRWaWV3TW9kZSBcdFx0XHQ6IGNvbmZpZy5Jbml0Vmlld01vZGUsXHJcbiAgICAgICAgQml0bWFwQmFzZWRSZW5kZXJpbmcgXHQ6IChjb25maWcuQml0bWFwQmFzZWRSZW5kZXJpbmchPW51bGwpP2NvbmZpZy5CaXRtYXBCYXNlZFJlbmRlcmluZzpmYWxzZSxcclxuICAgICAgICBTdGFydEF0UGFnZSBcdFx0XHQ6IGNvbmZpZy5TdGFydEF0UGFnZSxcclxuICAgICAgICBQcmludFBhcGVyQXNCaXRtYXBcdFx0OiAoY29uZmlnLlByaW50UGFwZXJBc0JpdG1hcCE9bnVsbCk/Y29uZmlnLlByaW50UGFwZXJBc0JpdG1hcDpmYWxzZSxcclxuICAgICAgICBBdXRvQWRqdXN0UHJpbnRTaXplXHRcdDogKGNvbmZpZy5BdXRvQWRqdXN0UHJpbnRTaXplIT1udWxsKT9jb25maWcuQXV0b0FkanVzdFByaW50U2l6ZTpmYWxzZSxcclxuXHJcbiAgICAgICAgRW5hYmxlQ29ybmVyRHJhZ2dpbmcgXHQ6ICgoY29uZmlnLkVuYWJsZUNvcm5lckRyYWdnaW5nIT1udWxsKT9jb25maWcuRW5hYmxlQ29ybmVyRHJhZ2dpbmc6dHJ1ZSksIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxyXG4gICAgICAgIEJhY2tncm91bmRDb2xvciBcdFx0OiBjb25maWcuQmFja2dyb3VuZENvbG9yLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcclxuICAgICAgICBQYW5lbENvbG9yIFx0XHRcdFx0OiBjb25maWcuUGFuZWxDb2xvciwgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXHJcbiAgICAgICAgQmFja2dyb3VuZEFscGhhICAgICAgICAgOiBjb25maWcuQmFja2dyb3VuZEFscGhhLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcclxuICAgICAgICBVSUNvbmZpZyAgICAgICAgICAgICAgICA6IGNvbmZpZy5VSUNvbmZpZywgIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxyXG5cclxuICAgICAgICBWaWV3TW9kZVRvb2xzVmlzaWJsZSBcdDogKChjb25maWcuVmlld01vZGVUb29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5WaWV3TW9kZVRvb2xzVmlzaWJsZTp0cnVlKSxcclxuICAgICAgICBab29tVG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLlpvb21Ub29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5ab29tVG9vbHNWaXNpYmxlOnRydWUpLFxyXG4gICAgICAgIE5hdlRvb2xzVmlzaWJsZSBcdFx0OiAoKGNvbmZpZy5OYXZUb29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5OYXZUb29sc1Zpc2libGU6dHJ1ZSksXHJcbiAgICAgICAgQ3Vyc29yVG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLkN1cnNvclRvb2xzVmlzaWJsZTp0cnVlKSxcclxuICAgICAgICBTZWFyY2hUb29sc1Zpc2libGUgXHRcdDogKChjb25maWcuU2VhcmNoVG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuU2VhcmNoVG9vbHNWaXNpYmxlOnRydWUpLFxyXG4gICAgICAgIFN0aWNreVRvb2xzXHRcdFx0XHQ6IGNvbmZpZy5TdGlja3lUb29scyxcclxuICAgICAgICBUb29sYmFyICAgICAgICAgICAgICAgICA6IGNvbmZpZy5Ub29sYmFyLFxyXG4gICAgICAgIERvY1NpemVRdWVyeVNlcnZpY2UgXHQ6IGNvbmZpZy5Eb2NTaXplUXVlcnlTZXJ2aWNlLFxyXG5cclxuICAgICAgICBSZW5kZXJpbmdPcmRlciBcdFx0XHQ6IGNvbmZpZy5SZW5kZXJpbmdPcmRlcixcclxuXHJcbiAgICAgICAgbG9jYWxlQ2hhaW4gXHRcdFx0OiAoY29uZmlnLmxvY2FsZUNoYWluIT1udWxsKT9jb25maWcubG9jYWxlQ2hhaW46XCJlbl9VU1wiLFxyXG4gICAgICAgIGpzRGlyZWN0b3J5IFx0XHRcdDogX2pzRGlyZWN0b3J5LFxyXG4gICAgICAgIGNzc0RpcmVjdG9yeSBcdFx0XHQ6IF9jc3NEaXJlY3RvcnksXHJcbiAgICAgICAgbG9jYWxlRGlyZWN0b3J5XHRcdFx0OiBfbG9jYWxlRGlyZWN0b3J5LFxyXG4gICAgICAgIGtleSBcdFx0XHRcdFx0OiBjb25maWcua2V5XHJcbiAgICB9KTtcclxufTtcclxuXHJcbihmdW5jdGlvbigpIHtcclxuICAgIGlmKCF3aW5kb3cuRkxFWFBBUEVSKXt3aW5kb3cuRkxFWFBBUEVSID0ge307fVxyXG5cclxuICAgIEZMRVhQQVBFUi5nZXRMb2NhdGlvbkhhc2hQYXJhbWV0ZXIgPSBmdW5jdGlvbihwYXJhbSl7XHJcbiAgICAgICAgdmFyIGhhc2ggPSBsb2NhdGlvbi5oYXNoLnN1YnN0cigxKTtcclxuXHJcbiAgICAgICAgaWYoaGFzaC5pbmRleE9mKHBhcmFtKyc9Jyk+PTApe1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBoYXNoLnN1YnN0cihoYXNoLmluZGV4T2YocGFyYW0rJz0nKSlcclxuICAgICAgICAgICAgICAgIC5zcGxpdCgnJicpWzBdXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoJz0nKVsxXTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfTtcclxuXHJcbiAgICBGTEVYUEFQRVIudHJhbnNsYXRlVXJsQnlGb3JtYXQgPSBmdW5jdGlvbih1cmwsZm9ybWF0KXtcclxuICAgICAgICBpZih1cmwuaW5kZXhPZihcIntcIikgPT0gMCAmJiBmb3JtYXQgIT0gXCJzd2ZcIil7IC8vIGxvYWRpbmcgaW4gc3BsaXQgZmlsZSBtb2RlXHJcbiAgICAgICAgICAgIHVybCA9IHVybC5zdWJzdHJpbmcoMSx1cmwubGFzdEluZGV4T2YoXCIsXCIpKTtcclxuICAgICAgICAgICAgdXJsID0gdXJsLnJlcGxhY2UoXCJbKiwwXVwiLFwie3BhZ2V9XCIpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAodXJsIT1udWxsICYmIHVybC5pbmRleE9mKCd7Zm9ybWF0fScpID4gMCA/IHVybC5yZXBsYWNlKFwie2Zvcm1hdH1cIiwgZm9ybWF0KTpudWxsKTtcclxuICAgIH07XHJcblxyXG4gICAgRkxFWFBBUEVSLmFuaW1hdGVEZW55RWZmZWN0ID0gZnVuY3Rpb24ob2JqLG1hcmdpbix0aW1lLGN5Y2xlcyxkaXIpIHtcclxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICB2YXIgc3BlZWQgPSB0aW1lIC8gKCgyKmN5Y2xlcykrMSk7XHJcbiAgICAgICAgICAgIHZhciBtYXJnUmF0ID0gMSArICg2MC8oY3ljbGVzKmN5Y2xlcykpOyAkKG9iaikuc3RvcCh0cnVlLHRydWUpO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpPTA7IGk8PWN5Y2xlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqPS0xOyBqPD0xOyBqKz0yKVxyXG4gICAgICAgICAgICAgICAgICAgICQob2JqKS5hbmltYXRlKHttYXJnaW5MZWZ0OiAoaSE9Y3ljbGVzKSpqKm1hcmdpbn0se2R1cmF0aW9uOnNwZWVkLCBxdWV1ZTp0cnVlfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgbWFyZ2luLz1tYXJnUmF0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSw1MDApO1xyXG4gICAgfTtcclxuXHJcbiAgICBGTEVYUEFQRVIuaW5pdExvZ2luRm9ybSA9IGZ1bmN0aW9uIGluaXRMb2dpbkZvcm0oSU1HRmlsZXMsYW5pbWF0ZSl7XHJcbiAgICAgICAgalF1ZXJ5KGRvY3VtZW50LmJvZHkpLmNzcygnYmFja2dyb3VuZC1jb2xvcicsJyNkZWRlZGUnKTtcclxuXHJcbiAgICAgICAgdmFyIGltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgIGpRdWVyeShpbWcpLmJpbmQoJ2xvYWQnLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5hcHBlbmQoXHJcbiAgICAgICAgICAgICAgICBcIjxkaXYgaWQ9J2xvZ2luRm9ybSc+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8Zm9ybSBjbGFzcz0nZmxleHBhcGVyX2h0bWxkaWFsb2cnIG1ldGhvZD0nUE9TVCcgc3R5bGU9J2Rpc3BsYXk6bm9uZTt0b3A6MTAwcHg7bWFyZ2luOlwiKygoalF1ZXJ5KHdpbmRvdykuaGVpZ2h0KCk+NTAwKT9cIjUwcHggYXV0b1wiOlwiMHB4IGF1dG9cIikrXCInPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGRpdiBjbGFzcz0nZmxleHBhcGVyX3B1YmxpY2F0aW9ucyBmbGV4cGFwZXJfcHVibGljYXRpb25fY3NzdHJhbnNmb3JtczNkJyBzdHlsZT0nb3ZlcmZsb3cteTpoaWRkZW47b3ZlcmZsb3cteDpoaWRkZW47dGV4dC1hbGlnbjpjZW50ZXI7YmFja2dyb3VuZDogI2Y3ZjdmNzttYXJnaW46IC0yNXB4IC0yNXB4IDBweDtwYWRkaW5nOiAxNXB4IDI1cHggMHB4IDI1cHg7Jz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ZsZXhwYXBlcl9wdWJsaWNhdGlvbiBmbGV4cGFwZXJfcHVibGljYXRpb25fY3NzdHJhbnNmb3JtczNkJyBpZD0nZmxleHBhcGVyX3B1YmxpY2F0aW9uMSc+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aW1nIHNyYz0nXCIrKElNR0ZpbGVzLnJlcGxhY2UoXCJ7cGFnZX1cIiwxKSkrXCInIC8+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIitcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8aDEgY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nLXRpdGxlJz5wYXNzd29yZCBwcm90ZWN0ZWQgcHVibGljYXRpb248L2gxPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGU9J3Bhc3N3b3JkJyBpZD0ndHh0X2ZsZXhwYXBlcl9wYXNzd29yZCcgbmFtZT0ndHh0X2ZsZXhwYXBlcl9wYXNzd29yZCcgY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nLWlucHV0JyBwbGFjZWhvbGRlcj0nRW50ZXIgcGFzc3dvcmQnPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGU9J3N1Ym1pdCcgdmFsdWU9J1N1Ym1pdCcgY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nLWJ1dHRvbic+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZm9ybT5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjwvZGl2PlwiXHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICB2YXIgYW5pbV9kdXJhdGlvbiA9IGFuaW1hdGU/MTAwMDowO1xyXG4gICAgICAgICAgICB2YXIgYW5pbV9oZWlnaHRfZHVyID0gYW5pbWF0ZT9hbmltX2R1cmF0aW9uLzM6MDtcclxuICAgICAgICAgICAgdmFyIHRoZWlnaHQgPSA0MDA7XHJcblxyXG4gICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfaHRtbGRpYWxvZycpLmNzcyh7aGVpZ2h0IDogJzBweCcsIGRpc3BsYXkgOiAnYmxvY2snfSk7XHJcbiAgICAgICAgICAgIGpRdWVyeSgnLmZsZXhwYXBlcl9odG1sZGlhbG9nJykuYW5pbWF0ZSh7J2hlaWdodCc6IHRoZWlnaHQrJ3B4JywndG9wJzonMHB4J30se2R1cmF0aW9uOiBhbmltX2hlaWdodF9kdXIsIGNvbXBsZXRlOiBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5jc3MoeydoZWlnaHQnIDogJyd9KTsgLy8gcmVtb3ZlIGhlaWdodCBhdHRyaWJ1dGUgdG8gZml0IHB1YmxpY2F0aW9uXHJcblxyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX3B1YmxpY2F0aW9uJykuYW5pbWF0ZSh7b3BhY2l0eToxfSx7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RlcCA6IGZ1bmN0aW9uKG5vdyxmeCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSAtNzt2YXIgb3BhY2l0eWZyb20gPSAtNDA7dmFyIGRpZmYgPSBvcGFjaXR5ZnJvbSAtIHRhcmdldDt2YXIgcm90YXRlID0gKGRpZmYgKiBub3cpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX3B1YmxpY2F0aW9uJykuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybScgOiAncGVyc3BlY3RpdmUoMzAwKSByb3RhdGVZKCcrKG9wYWNpdHlmcm9tIC0gcm90YXRlKSsnZGVnKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLW1vei10cmFuc2Zvcm0nIDogJ3JvdGF0ZVkoJysob3BhY2l0eWZyb20gLSByb3RhdGUpKydkZWcpJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdib3gtc2hhZG93JyA6ICc1cHggNXB4IDIwcHggcmdiYSg1MSwgNTEsIDUxLCAnK25vdysnKSdcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjphbmltX2R1cmF0aW9uXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH19KTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaW1nLnNyYyA9IChJTUdGaWxlcy5yZXBsYWNlKFwie3BhZ2V9XCIsMSkpO1xyXG4gICAgfTtcclxufSkoKTtcclxuXHJcblxyXG4vKipcclxuICpcclxuICogRmxleFBhcGVyIGVtYmVkZGluZyBmdW5jdGlvbmFsaXR5LiBCYXNlZCBvbiBGbGFzaEVtYmVkXHJcbiAqXHJcbiAqL1xyXG5cclxuKGZ1bmN0aW9uKCkge1xyXG5cclxuICAgIHZhciAgSUUgPSBkb2N1bWVudC5hbGwsXHJcbiAgICAgICAgVVJMID0gJ2h0dHA6Ly93d3cuYWRvYmUuY29tL2dvL2dldGZsYXNocGxheWVyJyxcclxuICAgICAgICBKUVVFUlkgPSB0eXBlb2YgalF1ZXJ5ID09ICdmdW5jdGlvbicsXHJcbiAgICAgICAgUkUgPSAvKFxcZCspW15cXGRdKyhcXGQrKVteXFxkXSooXFxkKikvLFxyXG4gICAgICAgIE1PQklMRSA9IChmdW5jdGlvbigpe3RyeSB7cmV0dXJuICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDt9IGNhdGNoIChlKSB7cmV0dXJuIGZhbHNlO30gfSkoKSxcclxuICAgICAgICBHTE9CQUxfT1BUUyA9IHtcclxuICAgICAgICAgICAgLy8gdmVyeSBjb21tb24gb3B0c1xyXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnLFxyXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcclxuICAgICAgICAgICAgaWQ6IFwiX1wiICsgKFwiXCIgKyBNYXRoLnJhbmRvbSgpKS5zbGljZSg5KSxcclxuXHJcbiAgICAgICAgICAgIC8vIGZsYXNoZW1iZWQgZGVmYXVsdHNcclxuICAgICAgICAgICAgYWxsb3dmdWxsc2NyZWVuOiB0cnVlLFxyXG4gICAgICAgICAgICBhbGxvd3NjcmlwdGFjY2VzczogJ2Fsd2F5cycsXHJcbiAgICAgICAgICAgIHF1YWxpdHk6ICdoaWdoJyxcclxuICAgICAgICAgICAgYWxsb3dGdWxsU2NyZWVuSW50ZXJhY3RpdmUgOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgLy8gZmxhc2hlbWJlZCBzcGVjaWZpYyBvcHRpb25zXHJcbiAgICAgICAgICAgIHZlcnNpb246IFsxMCwgMF0sXHJcbiAgICAgICAgICAgIG9uRmFpbDogbnVsbCxcclxuICAgICAgICAgICAgZXhwcmVzc0luc3RhbGw6IG51bGwsXHJcbiAgICAgICAgICAgIHczYzogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhY2hlYnVzdGluZzogZmFsc2VcclxuICAgICAgICB9O1xyXG5cclxuICAgIHdpbmRvdy5pc1RvdWNoU2NyZWVuID0gTU9CSUxFO1xyXG5cclxuICAgIGlmICh3aW5kb3cuYXR0YWNoRXZlbnQpIHtcclxuICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbmJlZm9yZXVubG9hZFwiLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgX19mbGFzaF91bmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICAgICAgX19mbGFzaF9zYXZlZFVubG9hZEhhbmRsZXIgPSBmdW5jdGlvbigpIHt9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNpbXBsZSBleHRlbmRcclxuICAgIGZ1bmN0aW9uIGV4dGVuZCh0bywgZnJvbSkge1xyXG4gICAgICAgIGlmIChmcm9tKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBmcm9tKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZnJvbS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9ba2V5XSA9IGZyb21ba2V5XTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdG87XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlZCBieSBGbGFzaCB0byBkaXNwYXRjaCBhIGV2ZW50IHByb3Blcmx5XHJcbiAgICB3aW5kb3cuZGlzcGF0Y2hKUXVlcnlFdmVudCA9IGZ1bmN0aW9uIChlbGVtZW50SWQsZXZlbnROYW1lLGFyZ3Mpe1xyXG4gICAgICAgIGpRdWVyeSgnIycrZWxlbWVudElkKS50cmlnZ2VyKGV2ZW50TmFtZSxhcmdzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1c2VkIGJ5IGFzU3RyaW5nIG1ldGhvZFxyXG4gICAgZnVuY3Rpb24gbWFwKGFyciwgZnVuYykge1xyXG4gICAgICAgIHZhciBuZXdBcnIgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpIGluIGFycikge1xyXG4gICAgICAgICAgICBpZiAoYXJyLmhhc093blByb3BlcnR5KGkpKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdBcnJbaV0gPSBmdW5jKGFycltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ld0FycjtcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuZmxhc2hlbWJlZCA9IGZ1bmN0aW9uKHJvb3QsIG9wdHMsIGNvbmYpIHtcclxuICAgICAgICAvLyByb290IG11c3QgYmUgZm91bmQgLyBsb2FkZWRcclxuICAgICAgICBpZiAodHlwZW9mIHJvb3QgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHJvb3QucmVwbGFjZShcIiNcIiwgXCJcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gbm90IGZvdW5kXHJcbiAgICAgICAgaWYgKCFyb290KSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICByb290Lm9uY2xpY2sgPSBmdW5jdGlvbigpe3JldHVybiBmYWxzZTt9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2Ygb3B0cyA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBvcHRzID0ge3NyYzogb3B0c307XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbmV3IEZsYXNoKHJvb3QsIGV4dGVuZChleHRlbmQoe30sIEdMT0JBTF9PUFRTKSwgb3B0cyksIGNvbmYpO1xyXG4gICAgfTtcclxuXHJcbiAgICAvLyBmbGFzaGVtYmVkIFwic3RhdGljXCIgQVBJXHJcbiAgICB2YXIgZiA9IGV4dGVuZCh3aW5kb3cuZmxhc2hlbWJlZCwge1xyXG5cclxuICAgICAgICBjb25mOiBHTE9CQUxfT1BUUyxcclxuXHJcbiAgICAgICAgZ2V0VmVyc2lvbjogZnVuY3Rpb24oKSAge1xyXG4gICAgICAgICAgICB2YXIgZm8sIHZlcjtcclxuXHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB2ZXIgPSBuYXZpZ2F0b3IucGx1Z2luc1tcIlNob2Nrd2F2ZSBGbGFzaFwiXS5kZXNjcmlwdGlvbi5zbGljZSgxNik7XHJcbiAgICAgICAgICAgIH0gY2F0Y2goZSkge1xyXG5cclxuICAgICAgICAgICAgICAgIHRyeSAge1xyXG4gICAgICAgICAgICAgICAgICAgIGZvID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaC43XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHZlciA9IGZvICYmIGZvLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBjYXRjaChlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0cnkgIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZm8gPSBuZXcgQWN0aXZlWE9iamVjdChcIlNob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoLjZcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZlciA9IGZvICYmIGZvLkdldFZhcmlhYmxlKFwiJHZlcnNpb25cIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBjYXRjaChlcnIyKSB7IH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdmVyID0gUkUuZXhlYyh2ZXIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdmVyID8gW3ZlclsxXSwgdmVyWzNdXSA6IFswLCAwXTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBhc1N0cmluZzogZnVuY3Rpb24ob2JqKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAob2JqID09PSBudWxsIHx8IG9iaiA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiBudWxsOyB9XHJcbiAgICAgICAgICAgIHZhciB0eXBlID0gdHlwZW9mIG9iajtcclxuICAgICAgICAgICAgaWYgKHR5cGUgPT0gJ29iamVjdCcgJiYgb2JqLnB1c2gpIHsgdHlwZSA9ICdhcnJheSc7IH1cclxuXHJcbiAgICAgICAgICAgIHN3aXRjaCAodHlwZSl7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnc3RyaW5nJzpcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSBvYmoucmVwbGFjZShuZXcgUmVnRXhwKCcoW1wiXFxcXFxcXFxdKScsICdnJyksICdcXFxcJDEnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZmxhc2ggZG9lcyBub3QgaGFuZGxlICUtIGNoYXJhY3RlcnMgd2VsbC4gdHJhbnNmb3JtcyBcIjUwJVwiIHRvIFwiNTBwY3RcIiAoYSBkaXJ0eSBoYWNrLCBJIGFkbWl0KVxyXG4gICAgICAgICAgICAgICAgICAgIG9iaiA9IG9iai5yZXBsYWNlKC9eXFxzPyhcXGQrXFwuP1xcZCspJS8sIFwiJDFwY3RcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcIicgK29iaisgJ1wiJztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdhcnJheSc6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdbJysgbWFwKG9iaiwgZnVuY3Rpb24oZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGYuYXNTdHJpbmcoZWwpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJywnKSArJ10nO1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ2Z1bmN0aW9uJzpcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ1wiZnVuY3Rpb24oKVwiJztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdvYmplY3QnOlxyXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdHIgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLmhhc093blByb3BlcnR5KHByb3ApKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHIucHVzaCgnXCInK3Byb3ArJ1wiOicrIGYuYXNTdHJpbmcob2JqW3Byb3BdKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd7JytzdHIuam9pbignLCcpKyd9JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gcmVwbGFjZSAnIC0tPiBcIiAgYW5kIHJlbW92ZSBzcGFjZXNcclxuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyhvYmopLnJlcGxhY2UoL1xccy9nLCBcIiBcIikucmVwbGFjZSgvXFwnL2csIFwiXFxcIlwiKTtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBnZXRIVE1MOiBmdW5jdGlvbihvcHRzLCBjb25mKSB7XHJcblxyXG4gICAgICAgICAgICBvcHRzID0gZXh0ZW5kKHt9LCBvcHRzKTtcclxuICAgICAgICAgICAgb3B0cy5pZCA9IG9wdHMuaWQgKyAoXCIgXCIgKyBNYXRoLnJhbmRvbSgpKS5zbGljZSg5KTtcclxuXHJcbiAgICAgICAgICAgIC8qKioqKioqIE9CSkVDVCB0YWcgYW5kIGl0J3MgYXR0cmlidXRlcyAqKioqKioqL1xyXG4gICAgICAgICAgICB2YXIgaHRtbCA9ICc8b2JqZWN0IHdpZHRoPVwiJyArIG9wdHMud2lkdGggK1xyXG4gICAgICAgICAgICAgICAgJ1wiIGhlaWdodD1cIicgKyBvcHRzLmhlaWdodCArXHJcbiAgICAgICAgICAgICAgICAnXCIgaWQ9XCInICsgb3B0cy5pZCArXHJcbiAgICAgICAgICAgICAgICAnXCIgbmFtZT1cIicgKyBvcHRzLmlkICsgJ1wiJztcclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRzLmNhY2hlYnVzdGluZykge1xyXG4gICAgICAgICAgICAgICAgb3B0cy5zcmMgKz0gKChvcHRzLnNyYy5pbmRleE9mKFwiP1wiKSAhPSAtMSA/IFwiJlwiIDogXCI/XCIpICsgTWF0aC5yYW5kb20oKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChvcHRzLnczYyB8fCAhSUUpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJyBkYXRhPVwiJyArb3B0cy5zcmMrICdcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICcgY2xhc3NpZD1cImNsc2lkOkQyN0NEQjZFLUFFNkQtMTFjZi05NkI4LTQ0NDU1MzU0MDAwMFwiJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaHRtbCArPSAnPic7XHJcblxyXG4gICAgICAgICAgICAvKioqKioqKiBuZXN0ZWQgUEFSQU0gdGFncyAqKioqKioqL1xyXG4gICAgICAgICAgICBpZiAob3B0cy53M2MgfHwgSUUpIHtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gJzxwYXJhbSBuYW1lPVwibW92aWVcIiB2YWx1ZT1cIicgK29wdHMuc3JjKyAnXCIgLz4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBub3QgYWxsb3dlZCBwYXJhbXNcclxuICAgICAgICAgICAgb3B0cy53aWR0aCA9IG9wdHMuaGVpZ2h0ID0gb3B0cy5pZCA9IG9wdHMudzNjID0gb3B0cy5zcmMgPSBudWxsO1xyXG4gICAgICAgICAgICBvcHRzLm9uRmFpbCA9IG9wdHMudmVyc2lvbiA9IG9wdHMuZXhwcmVzc0luc3RhbGwgPSBudWxsO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG9wdHMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvcHRzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICBodG1sICs9ICc8cGFyYW0gbmFtZT1cIicrIGtleSArJ1wiIHZhbHVlPVwiJysgb3B0c1trZXldICsnXCIgLz4nO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvKioqKioqKiBGTEFTSFZBUlMgKioqKioqKi9cclxuICAgICAgICAgICAgdmFyIHZhcnMgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNvbmYpIHtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGsgaW4gY29uZikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25mW2tdICYmIGshPSdUb29sYmFyJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gY29uZltrXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFycyArPSBrICsnPScrICgvZnVuY3Rpb258b2JqZWN0Ly50ZXN0KHR5cGVvZiB2YWwpID8gZi5hc1N0cmluZyh2YWwpIDogdmFsKSArICcmJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB2YXJzID0gdmFycy5zbGljZSgwLCAtMSk7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8cGFyYW0gbmFtZT1cImZsYXNodmFyc1wiIHZhbHVlPVxcJycgKyB2YXJzICsgJ1xcJyAvPic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGh0bWwgKz0gXCI8L29iamVjdD5cIjtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBodG1sO1xyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIGlzU3VwcG9ydGVkOiBmdW5jdGlvbih2ZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFZFUlNJT05bMF0gPiB2ZXJbMF0gfHwgVkVSU0lPTlswXSA9PSB2ZXJbMF0gJiYgVkVSU0lPTlsxXSA+PSB2ZXJbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIHZhciBWRVJTSU9OID0gZi5nZXRWZXJzaW9uKCk7XHJcblxyXG4gICAgZnVuY3Rpb24gRmxhc2gocm9vdCwgb3B0cywgY29uZikge1xyXG4gICAgICAgIHZhciB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIGJyb3dzZXIgPSB7XHJcbiAgICAgICAgICAgIHZlcnNpb246ICh1c2VyQWdlbnQubWF0Y2goLy4rKD86cnZ8aXR8cmF8aWUpW1xcLzogXShbXFxkLl0rKS8pIHx8IFtdKVsxXSxcclxuICAgICAgICAgICAgc2FmYXJpOiAvd2Via2l0Ly50ZXN0KHVzZXJBZ2VudCksXHJcbiAgICAgICAgICAgIG9wZXJhOiAvb3BlcmEvLnRlc3QodXNlckFnZW50KSxcclxuICAgICAgICAgICAgbXNpZTogL21zaWUvLnRlc3QodXNlckFnZW50KSAmJiAhL29wZXJhLy50ZXN0KHVzZXJBZ2VudCksXHJcbiAgICAgICAgICAgIG1vemlsbGE6IC9tb3ppbGxhLy50ZXN0KHVzZXJBZ2VudCkgJiYgIS8oY29tcGF0aWJsZXx3ZWJraXQpLy50ZXN0KHVzZXJBZ2VudCksXHJcbiAgICAgICAgICAgIGNocm9tZTogL2Nocm9tZS8udGVzdCh1c2VyQWdlbnQpXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gRGVmYXVsdCB0byBhIHJlbmRlcmluZyBtb2RlIGlmIGl0cyBub3Qgc2V0XHJcbiAgICAgICAgaWYoIWNvbmYuUmVuZGVyaW5nT3JkZXIgJiYgY29uZi5Td2ZGaWxlICE9ICBudWxsKXtjb25mLlJlbmRlcmluZ09yZGVyID0gXCJmbGFzaFwiO31cclxuXHJcbiAgICAgICAgaWYoY29uZi5SZW5kZXJpbmdPcmRlci5pbmRleE9mKCdodG1sNScpPT0wKXtcclxuICAgICAgICAgICAgaWYoY29uZmlybSgnVGhlIEZsZXhQYXBlciBHUEwgdmVyc2lvbiBkb2VzIG5vdCBzdXBwb3J0IEhUTUw1IHJlbmRlcmluZy4gRG8geW91IHdhbnQgdG8gbmF2aWdhdGUgdG8gb3VyIGRvd25sb2FkIHBhZ2UgZm9yIG1vcmUgZGV0YWlscz8nKSl7bG9jYXRpb24uaHJlZj0naHR0cDovL2ZsZXhwYXBlci5kZXZhbGRpLmNvbS9kb3dubG9hZC5qc3A/cmVmPUZsZXhQYXBlcid9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmKGNvbmYuUmVuZGVyaW5nT3JkZXIuaW5kZXhPZignaHRtbCcpPT0wKXtcclxuICAgICAgICAgICAgaWYoY29uZmlybSgnVGhlIEZsZXhQYXBlciBHUEwgdmVyc2lvbiBkb2VzIG5vdCBzdXBwb3J0IEhUTUw0IHJlbmRlcmluZy4gRG8geW91IHdhbnQgdG8gbmF2aWdhdGUgdG8gb3VyIGRvd25sb2FkIHBhZ2UgZm9yIG1vcmUgZGV0YWlscz8nKSl7bG9jYXRpb24uaHJlZj0naHR0cDovL2ZsZXhwYXBlci5kZXZhbGRpLmNvbS9kb3dubG9hZC5qc3A/cmVmPUZsZXhQYXBlcid9XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHZlcnNpb24gaXMgb2tcclxuICAgICAgICBpZiAoZi5pc1N1cHBvcnRlZChvcHRzLnZlcnNpb24pKSB7XHJcbiAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID0gZi5nZXRIVE1MKG9wdHMsIGNvbmYpO1xyXG5cclxuICAgICAgICAgICAgLy8gZXhwcmVzcyBpbnN0YWxsXHJcbiAgICAgICAgfSBlbHNlIGlmIChvcHRzLmV4cHJlc3NJbnN0YWxsICYmIGYuaXNTdXBwb3J0ZWQoWzYsIDY1XSkpIHtcclxuICAgICAgICAgICAgcm9vdC5pbm5lckhUTUwgPSBmLmdldEhUTUwoZXh0ZW5kKG9wdHMsIHtzcmM6IG9wdHMuZXhwcmVzc0luc3RhbGx9KSwge1xyXG4gICAgICAgICAgICAgICAgTU1yZWRpcmVjdFVSTDogbG9jYXRpb24uaHJlZixcclxuICAgICAgICAgICAgICAgIE1NcGxheWVyVHlwZTogJ1BsdWdJbicsXHJcbiAgICAgICAgICAgICAgICBNTWRvY3RpdGxlOiBkb2N1bWVudC50aXRsZVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHsgLy91c2UgaHRtbCB2aWV3ZXIgb3IgZGllXHJcbiAgICAgICAgICAgIC8vIGZhaWwgIzIuMSBjdXN0b20gY29udGVudCBpbnNpZGUgY29udGFpbmVyXHJcbiAgICAgICAgICAgIGlmICghcm9vdC5pbm5lckhUTUwucmVwbGFjZSgvXFxzL2csICcnKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHBhZ2VIb3N0ID0gKChkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA9PSBcImh0dHBzOlwiKSA/IFwiaHR0cHM6Ly9cIiA6XHRcImh0dHA6Ly9cIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcm9vdC5pbm5lckhUTUwgPVxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGgyPllvdXIgYnJvd3NlciBpcyBub3QgY29tcGF0aWJsZSB3aXRoIEZsZXhQYXBlcjwvaDI+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxoMz5VcGdyYWRlIHRvIGEgbmV3ZXIgYnJvd3NlciBvciBkb3dubG9hZCBBZG9iZSBGbGFzaCBQbGF5ZXIgMTAgb3IgaGlnaGVyLjwvaDM+XCIgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIjxwPkNsaWNrIG9uIHRoZSBpY29uIGJlbG93IHRvIGRvd25sb2FkIHRoZSBsYXRlc3QgdmVyc2lvbiBvZiBBZG9iZSBGbGFzaFwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8YSBocmVmPSdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcic+PGltZyBzcmM9J1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICsgcGFnZUhvc3QgKyBcInd3dy5hZG9iZS5jb20vaW1hZ2VzL3NoYXJlZC9kb3dubG9hZF9idXR0b25zL2dldF9mbGFzaF9wbGF5ZXIuZ2lmJyBhbHQ9J0dldCBBZG9iZSBGbGFzaCBwbGF5ZXInIC8+PC9hPlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyb290LnRhZ05hbWUgPT0gJ0EnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcm9vdC5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLmhyZWYgPSBVUkw7XHJcbiAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gb25GYWlsXHJcbiAgICAgICAgICAgIGlmIChvcHRzLm9uRmFpbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJldCA9IG9wdHMub25GYWlsLmNhbGwodGhpcyk7XHJcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHJldCA9PSAnc3RyaW5nJykgeyByb290LmlubmVySFRNTCA9IHJldDsgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBodHRwOi8vZmxvd3BsYXllci5vcmcvZm9ydW0vOC8xODE4NiNwb3N0LTE4NTkzXHJcbiAgICAgICAgaWYgKElFKSB7XHJcbiAgICAgICAgICAgIHdpbmRvd1tvcHRzLmlkXSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG9wdHMuaWQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQVBJIG1ldGhvZHMgZm9yIGNhbGxiYWNrXHJcbiAgICAgICAgZXh0ZW5kKHRoaXMsIHtcclxuXHJcbiAgICAgICAgICAgIGdldFJvb3Q6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3Q7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRPcHRpb25zOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvcHRzO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuXHJcbiAgICAgICAgICAgIGdldENvbmY6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNvbmY7XHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBnZXRBcGk6IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJvb3QuZmlyc3RDaGlsZDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzZXR1cCBqcXVlcnkgc3VwcG9ydFxyXG4gICAgaWYgKEpRVUVSWSkge1xyXG4gICAgICAgIGpRdWVyeS5mbi5mbGFzaGVtYmVkID0gZnVuY3Rpb24ob3B0cywgY29uZikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLmRhdGEoXCJmbGFzaGVtYmVkXCIsIGZsYXNoZW1iZWQodGhpcywgb3B0cywgY29uZikpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBqUXVlcnkuZm4uRmxleFBhcGVyVmlld2VyID0gZnVuY3Rpb24oYXJncyl7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IG5ldyBGbGV4UGFwZXJWaWV3ZXJFbWJlZGRpbmcodGhpcy5hdHRyKCdpZCcpLGFyZ3MpO1xyXG4gICAgICAgIH07XHJcbiAgICB9ZWxzZXtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJqUXVlcnkgbWlzc2luZyFcIik7XHJcbiAgICB9XHJcbn0pKCk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCIvKipcclxuIOKWiOKWkuKWk+KWkuKWkSBUaGUgRmxleFBhcGVyIFByb2plY3RcclxuXHJcbiBUaGlzIGZpbGUgaXMgcGFydCBvZiBGbGV4UGFwZXIuXHJcblxyXG4gRmxleFBhcGVyIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vciBtb2RpZnlcclxuIGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXMgcHVibGlzaGVkIGJ5XHJcbiB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UuXHJcblxyXG4gRmxleFBhcGVyIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXHJcbiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxyXG4gTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiAgU2VlIHRoZVxyXG4gR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cclxuXHJcbiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxyXG4gYWxvbmcgd2l0aCBGbGV4UGFwZXIuICBJZiBub3QsIHNlZSA8aHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLz4uXHJcblxyXG4gRm9yIG1vcmUgaW5mb3JtYXRpb24gb24gRmxleFBhcGVyIHBsZWFzZSBzZWUgdGhlIEZsZXhQYXBlciBwcm9qZWN0XHJcbiBob21lIHBhZ2U6IGh0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb21cclxuICovXHJcblxyXG4kKGZ1bmN0aW9uKCkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBldmVudCBvZiBleHRlcm5hbCBsaW5rcyBnZXR0aW5nIGNsaWNrZWQgaW4gdGhlIGRvY3VtZW50LlxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uRXh0ZXJuYWxMaW5rQ2xpY2tlZChcImh0dHA6Ly93d3cuZ29vZ2xlLmNvbVwiKVxyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgbGlua1xyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRXh0ZXJuYWxMaW5rQ2xpY2tlZCcsZnVuY3Rpb24oZSxsaW5rKXtcclxuICAgICAgICB3aW5kb3cub3BlbihsaW5rLCdfZmxleHBhcGVyX2V4dHVybCcpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNpZXZlcyBwcm9ncmVzcyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgZG9jdW1lbnQgYmVpbmcgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25Qcm9ncmVzcyggMTAwLDEwMDAwICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGludCBsb2FkZWRcclxuICAgICAqIEBwYXJhbSBpbnQgdG90YWxcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvblByb2dyZXNzJyxmdW5jdGlvbihlLGxvYWRlZEJ5dGVzLHRvdGFsQnl0ZXMpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgZXZlbnQgb2YgYSBkb2N1bWVudCBpcyBpbiBwcm9ncmVzcyBvZiBsb2FkaW5nXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRG9jdW1lbnRMb2FkaW5nJyxmdW5jdGlvbihlKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGEgZG9jdW1lbnQgaXMgaW4gcHJvZ3Jlc3Mgb2YgbG9hZGluZ1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvblBhZ2VMb2FkaW5nJyxmdW5jdGlvbihlLHBhZ2VOdW1iZXIpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgbWVzc2FnZXMgYWJvdXQgdGhlIGN1cnJlbnQgcGFnZSBiZWluZyBjaGFuZ2VkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25DdXJyZW50UGFnZUNoYW5nZWQoIDEwICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGludCBwYWdlbnVtXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25DdXJyZW50UGFnZUNoYW5nZWQnLGZ1bmN0aW9uKGUscGFnZW51bSl7XHJcblxyXG4gICAgICAgIC8vIGlmIEdBTnVtYmVyIGlzIHN1cHBsaWVkIHRoZW4gbGV0cyB0cmFjayB0aGlzIGFzIGEgR29vZ2xlIEFuYWx5dGljcyBldmVudC5cclxuICAgICAgICBpZihqUXVlcnkodGhpcykuZGF0YSgnVHJhY2tpbmdOdW1iZXInKSl7XHJcbiAgICAgICAgICAgIHZhciBfZ2FxID0gd2luZG93Ll9nYXEgfHwgW107d2luZG93Ll9nYXE9X2dhcTtcclxuICAgICAgICAgICAgdmFyIHRyYWNraW5nRG9jID0galF1ZXJ5KHRoaXMpLmRhdGEoJ1RyYWNraW5nRG9jdW1lbnQnKTtcclxuICAgICAgICAgICAgdmFyIHBkZkZpbGVOYW1lID0gdHJhY2tpbmdEb2Muc3Vic3RyKDAsdHJhY2tpbmdEb2MuaW5kZXhPZihcIi5wZGZcIikrNCk7XHJcblxyXG4gICAgICAgICAgICBfZ2FxLnB1c2goWydfc2V0QWNjb3VudCcsIGpRdWVyeSh0aGlzKS5kYXRhKCdUcmFja2luZ051bWJlcicpXSk7XHJcbiAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JywgJ1BERiBEb2N1bWVudHMnLCAnUGFnZSBWaWV3JywgcGRmRmlsZU5hbWUgKyAnIC0gcGFnZSAnICsgcGFnZW51bV0pO1xyXG5cclxuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGdhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7IGdhLnR5cGUgPSAndGV4dC9qYXZhc2NyaXB0JzsgZ2EuYXN5bmMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgZ2Euc3JjID0gKCdodHRwczonID09IGRvY3VtZW50LmxvY2F0aW9uLnByb3RvY29sID8gJ2h0dHBzOi8vc3NsJyA6ICdodHRwOi8vd3d3JykgKyAnLmdvb2dsZS1hbmFseXRpY3MuY29tL2dhLmpzJztcclxuICAgICAgICAgICAgICAgIHZhciBzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3NjcmlwdCcpWzBdOyBzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGdhLCBzKTtcclxuICAgICAgICAgICAgfSkoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIG1lc3NhZ2VzIGFib3V0IHRoZSBkb2N1bWVudCBiZWluZyBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkRvY3VtZW50TG9hZGVkKCAyMCApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbnQgdG90YWxQYWdlc1xyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uRG9jdW1lbnRMb2FkZWQnLGZ1bmN0aW9uKGUsdG90YWxQYWdlcyl7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgcGFnZSBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvblBhZ2VMb2FkZWQoIDEgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW50IHBhZ2VOdW1iZXJcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvblBhZ2VMb2FkZWQnLGZ1bmN0aW9uKGUscGFnZU51bWJlcil7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgcGFnZSBsb2FkZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkVycm9yTG9hZGluZ1BhZ2UoIDEgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW50IHBhZ2VOdW1iZXJcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkVycm9yTG9hZGluZ1BhZ2UnLGZ1bmN0aW9uKGUscGFnZU51bWJlcil7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBlcnJvciBtZXNzYWdlcyB3aGVuIGEgZG9jdW1lbnQgaXMgbm90IGxvYWRpbmcgcHJvcGVybHlcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkRvY3VtZW50TG9hZGVkRXJyb3IoIFwiTmV0d29yayBlcnJvclwiICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIFN0cmluZyBlcnJvck1lc3NhZ2VcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50TG9hZGVkRXJyb3InLGZ1bmN0aW9uKGUsZXJyTWVzc2FnZSl7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBlcnJvciBtZXNzYWdlcyB3aGVuIGEgZG9jdW1lbnQgaGFzIGZpbmlzaGVkIHByaW50ZWRcclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkRvY3VtZW50UHJpbnRlZCgpO1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50UHJpbnRlZCcsZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgfSk7XHJcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL2ZsZXgvZmxleHBhcGVyX2hhbmRsZXJzLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiLy8gVkVSU0lPTjogMi4zIExBU1QgVVBEQVRFOiAxMS4wNy4yMDEzXHJcbi8qIFxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2U6IGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcbiAqIFxyXG4gKiBNYWRlIGJ5IFdpbHEzMiwgd2lscTMyQGdtYWlsLmNvbSwgV3JvY2xhdywgUG9sYW5kLCAwMS4yMDA5XHJcbiAqIFdlYnNpdGU6IGh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9qcXVlcnlyb3RhdGUvIFxyXG4gKi9cclxuXHJcbihmdW5jdGlvbigkKSB7XHJcbiAgICB2YXIgc3VwcG9ydGVkQ1NTLHN1cHBvcnRlZENTU09yaWdpbiwgc3R5bGVzPWRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5zdHlsZSx0b0NoZWNrPVwidHJhbnNmb3JtUHJvcGVydHkgV2Via2l0VHJhbnNmb3JtIE9UcmFuc2Zvcm0gbXNUcmFuc2Zvcm0gTW96VHJhbnNmb3JtXCIuc3BsaXQoXCIgXCIpO1xyXG4gICAgZm9yICh2YXIgYSA9IDA7IGEgPCB0b0NoZWNrLmxlbmd0aDsgYSsrKSBpZiAoc3R5bGVzW3RvQ2hlY2tbYV1dICE9PSB1bmRlZmluZWQpIHsgc3VwcG9ydGVkQ1NTID0gdG9DaGVja1thXTsgfVxyXG4gICAgaWYgKHN1cHBvcnRlZENTUykge1xyXG4gICAgICBzdXBwb3J0ZWRDU1NPcmlnaW4gPSBzdXBwb3J0ZWRDU1MucmVwbGFjZSgvW3RUXXJhbnNmb3JtLyxcIlRyYW5zZm9ybU9yaWdpblwiKTtcclxuICAgICAgaWYgKHN1cHBvcnRlZENTU09yaWdpblswXSA9PSBcIlRcIikgc3VwcG9ydGVkQ1NTT3JpZ2luWzBdID0gXCJ0XCI7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFkIGV2YWwgdG8gcHJldmVuIGdvb2dsZSBjbG9zdXJlIHRvIHJlbW92ZSBpdCBmcm9tIGNvZGUgb19PXHJcbiAgICBldmFsKCdJRSA9IFwidlwiPT1cIlxcdlwiJyk7XHJcblxyXG4gICAgalF1ZXJ5LmZuLmV4dGVuZCh7XHJcbiAgICAgICAgcm90YXRlOmZ1bmN0aW9uKHBhcmFtZXRlcnMpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHRoaXMubGVuZ3RoPT09MHx8dHlwZW9mIHBhcmFtZXRlcnM9PVwidW5kZWZpbmVkXCIpIHJldHVybjtcclxuICAgICAgICAgIGlmICh0eXBlb2YgcGFyYW1ldGVycz09XCJudW1iZXJcIikgcGFyYW1ldGVycz17YW5nbGU6cGFyYW1ldGVyc307XHJcbiAgICAgICAgICB2YXIgcmV0dXJuZWQ9W107XHJcbiAgICAgICAgICBmb3IgKHZhciBpPTAsaTA9dGhpcy5sZW5ndGg7aTxpMDtpKyspXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50PXRoaXMuZ2V0KGkpO1x0XHJcbiAgICAgICAgICAgIGlmICghZWxlbWVudC5XaWxxMzIgfHwgIWVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAgIHZhciBwYXJhbUNsb25lID0gJC5leHRlbmQodHJ1ZSwge30sIHBhcmFtZXRlcnMpOyBcclxuICAgICAgICAgICAgICB2YXIgbmV3Um90T2JqZWN0ID0gbmV3IFdpbHEzMi5QaG90b0VmZmVjdChlbGVtZW50LHBhcmFtQ2xvbmUpLl9yb290T2JqO1xyXG5cclxuICAgICAgICAgICAgICByZXR1cm5lZC5wdXNoKCQobmV3Um90T2JqZWN0KSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QuX2hhbmRsZVJvdGF0aW9uKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmV0dXJuZWQ7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBnZXRSb3RhdGVBbmdsZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIHZhciByZXQgPSBbXTtcclxuICAgICAgICAgIGZvciAodmFyIGk9MCxpMD10aGlzLmxlbmd0aDtpPGkwO2krKylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQ9dGhpcy5nZXQoaSk7XHRcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuV2lscTMyICYmIGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgcmV0W2ldID0gZWxlbWVudC5XaWxxMzIuUGhvdG9FZmZlY3QuX2FuZ2xlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3RvcFJvdGF0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGZvciAodmFyIGk9MCxpMD10aGlzLmxlbmd0aDtpPGkwO2krKylcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgdmFyIGVsZW1lbnQ9dGhpcy5nZXQoaSk7XHRcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQuV2lscTMyICYmIGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0KSB7XHJcbiAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0Ll90aW1lcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMaWJyYXJ5IGFnbm9zdGljIGludGVyZmFjZVxyXG5cclxuICAgIFdpbHEzMj13aW5kb3cuV2lscTMyfHx7fTtcclxuICAgIFdpbHEzMi5QaG90b0VmZmVjdD0oZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgIGlmIChzdXBwb3J0ZWRDU1MpIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW1nLHBhcmFtZXRlcnMpe1xyXG4gICAgICAgICAgaW1nLldpbHEzMiA9IHtcclxuICAgICAgICAgICAgUGhvdG9FZmZlY3Q6IHRoaXNcclxuICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgdGhpcy5faW1nID0gdGhpcy5fcm9vdE9iaiA9IHRoaXMuX2V2ZW50T2JqID0gaW1nO1xyXG4gICAgICAgICAgdGhpcy5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJldHVybiBmdW5jdGlvbihpbWcscGFyYW1ldGVycykge1xyXG4gICAgICAgICAgdGhpcy5faW1nID0gaW1nO1xyXG4gICAgICAgICAgdGhpcy5fb25Mb2FkRGVsZWdhdGUgPSBbcGFyYW1ldGVyc107XHJcblxyXG4gICAgICAgICAgdGhpcy5fcm9vdE9iaj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XHJcbiAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLmRpc3BsYXk9XCJpbmxpbmUtYmxvY2tcIjtcclxuICAgICAgICAgIHRoaXMuX3Jvb3RPYmouV2lscTMyID0gXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICBQaG90b0VmZmVjdDogdGhpc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgaW1nLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMuX3Jvb3RPYmosaW1nKTtcclxuXHJcbiAgICAgICAgICBpZiAoaW1nLmNvbXBsZXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX0xvYWRlcigpO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIHNlbGY9dGhpcztcclxuICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGpRdWVyeSBkZXBlbmRlbmN5XHJcbiAgICAgICAgICAgIGpRdWVyeSh0aGlzLl9pbWcpLmJpbmQoXCJsb2FkXCIsIGZ1bmN0aW9uKCl7IHNlbGYuX0xvYWRlcigpOyB9KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pKCk7XHJcblxyXG4gICAgV2lscTMyLlBob3RvRWZmZWN0LnByb3RvdHlwZSA9IHtcclxuICAgICAgX3NldHVwUGFyYW1ldGVycyA6IGZ1bmN0aW9uIChwYXJhbWV0ZXJzKXtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzID0gdGhpcy5fcGFyYW1ldGVycyB8fCB7fTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2FuZ2xlICE9PSBcIm51bWJlclwiKSB7IHRoaXMuX2FuZ2xlID0gMCA7IH1cclxuICAgICAgICBpZiAodHlwZW9mIHBhcmFtZXRlcnMuYW5nbGU9PT1cIm51bWJlclwiKSB7IHRoaXMuX2FuZ2xlID0gcGFyYW1ldGVycy5hbmdsZTsgfVxyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvID0gKHR5cGVvZiBwYXJhbWV0ZXJzLmFuaW1hdGVUbyA9PT0gXCJudW1iZXJcIikgPyAocGFyYW1ldGVycy5hbmltYXRlVG8pIDogKHRoaXMuX2FuZ2xlKTsgXHJcblxyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuc3RlcCA9IHBhcmFtZXRlcnMuc3RlcCB8fCB0aGlzLl9wYXJhbWV0ZXJzLnN0ZXAgfHwgbnVsbDtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmVhc2luZyA9IHBhcmFtZXRlcnMuZWFzaW5nIHx8IHRoaXMuX3BhcmFtZXRlcnMuZWFzaW5nIHx8IHRoaXMuX2RlZmF1bHRFYXNpbmc7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5kdXJhdGlvbiA9IHBhcmFtZXRlcnMuZHVyYXRpb24gfHwgdGhpcy5fcGFyYW1ldGVycy5kdXJhdGlvbiB8fCAxMDAwO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuY2FsbGJhY2sgPSBwYXJhbWV0ZXJzLmNhbGxiYWNrIHx8IHRoaXMuX3BhcmFtZXRlcnMuY2FsbGJhY2sgfHwgdGhpcy5fZW1wdHlGdW5jdGlvbjtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlciA9IHBhcmFtZXRlcnMuY2VudGVyIHx8IHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyIHx8IFtcIjUwJVwiLFwiNTAlXCJdO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMF0gPT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgdGhpcy5fcm90YXRpb25DZW50ZXJYID0gKHBhcnNlSW50KHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzBdLDEwKSAvIDEwMCkgKiB0aGlzLl9pbWdXaWR0aCAqIHRoaXMuX2FzcGVjdFc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3JvdGF0aW9uQ2VudGVyWCA9IHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzFdID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIHRoaXMuX3JvdGF0aW9uQ2VudGVyWSA9IChwYXJzZUludCh0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclsxXSwxMCkgLyAxMDApICogdGhpcy5faW1nSGVpZ2h0ICogdGhpcy5fYXNwZWN0SDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgdGhpcy5fcm90YXRpb25DZW50ZXJZID0gdGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFyYW1ldGVycy5iaW5kICYmIHBhcmFtZXRlcnMuYmluZCAhPSB0aGlzLl9wYXJhbWV0ZXJzLmJpbmQpIHsgdGhpcy5fQmluZEV2ZW50cyhwYXJhbWV0ZXJzLmJpbmQpOyB9XHJcbiAgICAgIH0sXHJcbiAgICAgIF9lbXB0eUZ1bmN0aW9uOiBmdW5jdGlvbigpe30sXHJcbiAgICAgIF9kZWZhdWx0RWFzaW5nOiBmdW5jdGlvbiAoeCwgdCwgYiwgYywgZCkgeyByZXR1cm4gLWMgKiAoKHQ9dC9kLTEpKnQqdCp0IC0gMSkgKyBiIH0sIFxyXG4gICAgICBfaGFuZGxlUm90YXRpb24gOiBmdW5jdGlvbihwYXJhbWV0ZXJzLCBkb250Y2hlY2spe1xyXG4gICAgICAgIGlmICghc3VwcG9ydGVkQ1NTICYmICF0aGlzLl9pbWcuY29tcGxldGUgJiYgIWRvbnRjaGVjaykge1xyXG4gICAgICAgICAgdGhpcy5fb25Mb2FkRGVsZWdhdGUucHVzaChwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fc2V0dXBQYXJhbWV0ZXJzKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLl9hbmdsZT09dGhpcy5fcGFyYW1ldGVycy5hbmltYXRlVG8pIHtcclxuICAgICAgICAgIHRoaXMuX3JvdGF0ZSh0aGlzLl9hbmdsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgeyBcclxuICAgICAgICAgIHRoaXMuX2FuaW1hdGVTdGFydCgpOyAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBfQmluZEV2ZW50czpmdW5jdGlvbihldmVudHMpe1xyXG4gICAgICAgIGlmIChldmVudHMgJiYgdGhpcy5fZXZlbnRPYmopIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIC8vIFVuYmluZGluZyBwcmV2aW91cyBFdmVudHNcclxuICAgICAgICAgIGlmICh0aGlzLl9wYXJhbWV0ZXJzLmJpbmQpe1xyXG4gICAgICAgICAgICB2YXIgb2xkRXZlbnRzID0gdGhpcy5fcGFyYW1ldGVycy5iaW5kO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBhIGluIG9sZEV2ZW50cykgaWYgKG9sZEV2ZW50cy5oYXNPd25Qcm9wZXJ0eShhKSkgXHJcbiAgICAgICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGpRdWVyeSBkZXBlbmRlbmN5XHJcbiAgICAgICAgICAgICAgalF1ZXJ5KHRoaXMuX2V2ZW50T2JqKS51bmJpbmQoYSxvbGRFdmVudHNbYV0pO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmJpbmQgPSBldmVudHM7XHJcbiAgICAgICAgZm9yICh2YXIgYSBpbiBldmVudHMpIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoYSkpIFxyXG4gICAgICAgICAgLy8gVE9ETzogUmVtb3ZlIGpRdWVyeSBkZXBlbmRlbmN5XHJcbiAgICAgICAgICBqUXVlcnkodGhpcy5fZXZlbnRPYmopLmJpbmQoYSxldmVudHNbYV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuXHJcbiAgICAgIF9Mb2FkZXI6KGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIGlmIChJRSlcclxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIHdpZHRoPXRoaXMuX2ltZy53aWR0aDtcclxuICAgICAgICAgICAgdmFyIGhlaWdodD10aGlzLl9pbWcuaGVpZ2h0O1xyXG4gICAgICAgICAgICB0aGlzLl9pbWdXaWR0aCA9IHdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9pbWdIZWlnaHQgPSBoZWlnaHQ7IFxyXG4gICAgICAgICAgICB0aGlzLl9pbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9pbWcpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlID0gdGhpcy5jcmVhdGVWTUxOb2RlKCdpbWFnZScpO1xyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3JjPXRoaXMuX2ltZy5zcmM7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS5oZWlnaHQ9aGVpZ2h0K1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLndpZHRoPXdpZHRoK1wicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIjsgLy8gRklYRVMgSUUgUFJPQkxFTSAtIGl0cyBvbmx5IHJlbmRlcmVkIGlmIGl0cyBvbiBhYnNvbHV0ZSBwb3NpdGlvbiFcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLnRvcCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS5sZWZ0ID0gXCIwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fYXNwZWN0VyA9IHRoaXMuX2FzcGVjdEggPSAxO1xyXG5cclxuICAgICAgICAgICAgLyogR3JvdXAgbWluaWZ5aW5nIGEgc21hbGwgMXB4IHByZWNpc2lvbiBwcm9ibGVtIHdoZW4gcm90YXRpbmcgb2JqZWN0ICovXHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IHRoaXMuY3JlYXRlVk1MTm9kZSgnZ3JvdXAnKTtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLndpZHRoPXdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUuaGVpZ2h0PWhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIjtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLnRvcD1cIjBweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUubGVmdD1cIjBweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuc2V0QXR0cmlidXRlKCdjb29yZHNpemUnLHdpZHRoLTErJywnKyhoZWlnaHQtMSkpOyAvLyBUaGlzIC0xLCAtMSB0cnlpbmcgdG8gZml4IHVnbHkgcHJvYmxlbSB3aXRoIHNtYWxsIGRpc3BsYWNlbWVudCBvbiBJRVxyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5fdmltYWdlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouYXBwZW5kQ2hpbGQodGhpcy5fY29udGFpbmVyKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCI7IC8vIEZJWEVTIElFIFBST0JMRU1cclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS53aWR0aD13aWR0aCtcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUuaGVpZ2h0PWhlaWdodCtcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc2V0QXR0cmlidXRlKCdpZCcsdGhpcy5faW1nLmdldEF0dHJpYnV0ZSgnaWQnKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouY2xhc3NOYW1lPXRoaXMuX2ltZy5jbGFzc05hbWU7XHRcdFx0XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50T2JqID0gdGhpcy5fcm9vdE9iajtcdFxyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycztcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmFtZXRlcnMgPSB0aGlzLl9vbkxvYWREZWxlZ2F0ZS5zaGlmdCgpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycywgdHJ1ZSk7XHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnNldEF0dHJpYnV0ZSgnaWQnLHRoaXMuX2ltZy5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmNsYXNzTmFtZT10aGlzLl9pbWcuY2xhc3NOYW1lO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5faW1nV2lkdGg9dGhpcy5faW1nLm5hdHVyYWxXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5faW1nSGVpZ2h0PXRoaXMuX2ltZy5uYXR1cmFsSGVpZ2h0O1xyXG4gICAgICAgICAgICB2YXIgX3dpZHRoTWF4PU1hdGguc3FydCgodGhpcy5faW1nSGVpZ2h0KSoodGhpcy5faW1nSGVpZ2h0KSArICh0aGlzLl9pbWdXaWR0aCkgKiAodGhpcy5faW1nV2lkdGgpKTtcclxuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBfd2lkdGhNYXggKiAzO1xyXG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBfd2lkdGhNYXggKiAzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fYXNwZWN0VyA9IHRoaXMuX2ltZy5vZmZzZXRXaWR0aC90aGlzLl9pbWcubmF0dXJhbFdpZHRoO1xyXG4gICAgICAgICAgICB0aGlzLl9hc3BlY3RIID0gdGhpcy5faW1nLm9mZnNldEhlaWdodC90aGlzLl9pbWcubmF0dXJhbEhlaWdodDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ltZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2ltZyk7XHRcclxuXHJcblxyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJyx0aGlzLl93aWR0aCk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5zdHlsZS5sZWZ0ID0gLXRoaXMuX2ltZy5oZWlnaHQgKiB0aGlzLl9hc3BlY3RXICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUudG9wID0gLXRoaXMuX2ltZy53aWR0aCAqIHRoaXMuX2FzcGVjdEggKyBcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy5XaWxxMzIgPSB0aGlzLl9yb290T2JqLldpbHEzMjtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouYXBwZW5kQ2hpbGQodGhpcy5fY2FudmFzKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS53aWR0aD10aGlzLl9pbWcud2lkdGgqdGhpcy5fYXNwZWN0VytcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUuaGVpZ2h0PXRoaXMuX2ltZy5oZWlnaHQqdGhpcy5fYXNwZWN0SCtcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50T2JqID0gdGhpcy5fY2FudmFzO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5fY252PXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xyXG4gICAgICAgICAgICB2YXIgcGFyYW1ldGVycztcclxuICAgICAgICAgICAgd2hpbGUgKHBhcmFtZXRlcnMgPSB0aGlzLl9vbkxvYWREZWxlZ2F0ZS5zaGlmdCgpKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5faGFuZGxlUm90YXRpb24ocGFyYW1ldGVycywgdHJ1ZSk7XHRcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICB9KSgpLFxyXG5cclxuICAgICAgX2FuaW1hdGVTdGFydDpmdW5jdGlvbigpXHJcbiAgICAgIHtcdFxyXG4gICAgICAgIGlmICh0aGlzLl90aW1lcikge1xyXG4gICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZVN0YXJ0VGltZSA9ICtuZXcgRGF0ZTtcclxuICAgICAgICB0aGlzLl9hbmltYXRlU3RhcnRBbmdsZSA9IHRoaXMuX2FuZ2xlO1xyXG4gICAgICAgIHRoaXMuX2FuaW1hdGUoKTtcclxuICAgICAgfSxcclxuICAgICAgX2FuaW1hdGU6ZnVuY3Rpb24oKVxyXG4gICAgICB7XHJcbiAgICAgICAgdmFyIGFjdHVhbFRpbWUgPSArbmV3IERhdGU7XHJcbiAgICAgICAgdmFyIGNoZWNrRW5kID0gYWN0dWFsVGltZSAtIHRoaXMuX2FuaW1hdGVTdGFydFRpbWUgPiB0aGlzLl9wYXJhbWV0ZXJzLmR1cmF0aW9uO1xyXG5cclxuICAgICAgICAvLyBUT0RPOiBCdWcgZm9yIGFuaW1hdGVkR2lmIGZvciBzdGF0aWMgcm90YXRpb24gPyAodG8gdGVzdClcclxuICAgICAgICBpZiAoY2hlY2tFbmQgJiYgIXRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZWRHaWYpIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2NhbnZhc3x8dGhpcy5fdmltYWdlfHx0aGlzLl9pbWcpIHtcclxuICAgICAgICAgICAgdmFyIGFuZ2xlID0gdGhpcy5fcGFyYW1ldGVycy5lYXNpbmcoMCwgYWN0dWFsVGltZSAtIHRoaXMuX2FuaW1hdGVTdGFydFRpbWUsIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlLCB0aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVUbyAtIHRoaXMuX2FuaW1hdGVTdGFydEFuZ2xlLCB0aGlzLl9wYXJhbWV0ZXJzLmR1cmF0aW9uKTtcclxuICAgICAgICAgICAgdGhpcy5fcm90YXRlKCh+fihhbmdsZSoxMCkpLzEwKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGlmICh0aGlzLl9wYXJhbWV0ZXJzLnN0ZXApIHtcclxuICAgICAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5zdGVwKHRoaXMuX2FuZ2xlKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbigpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHNlbGYuX2FuaW1hdGUuY2FsbChzZWxmKTtcclxuICAgICAgICAgIH0sIDEwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAvLyBUbyBmaXggQnVnIHRoYXQgcHJldmVudHMgdXNpbmcgcmVjdXJzaXZlIGZ1bmN0aW9uIGluIGNhbGxiYWNrIEkgbW92ZWQgdGhpcyBmdW5jdGlvbiB0byBiYWNrXHJcbiAgICAgIGlmICh0aGlzLl9wYXJhbWV0ZXJzLmNhbGxiYWNrICYmIGNoZWNrRW5kKXtcclxuICAgICAgICB0aGlzLl9hbmdsZSA9IHRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvO1xyXG4gICAgICAgIHRoaXMuX3JvdGF0ZSh0aGlzLl9hbmdsZSk7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjay5jYWxsKHRoaXMuX3Jvb3RPYmopO1xyXG4gICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBfcm90YXRlIDogKGZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIHZhciByYWQgPSBNYXRoLlBJLzE4MDtcclxuICAgICAgICBpZiAoSUUpXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYW5nbGUpXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5yb3RhdGlvbj0oYW5nbGUlMzYwKStcImRlZ1wiO1xyXG4gICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLnRvcCA9IC0odGhpcy5fcm90YXRpb25DZW50ZXJZIC0gdGhpcy5faW1nSGVpZ2h0LzIpICsgXCJweFwiO1xyXG4gICAgICAgICAgdGhpcy5fdmltYWdlLnN0eWxlLmxlZnQgPSAtKHRoaXMuX3JvdGF0aW9uQ2VudGVyWCAtIHRoaXMuX2ltZ1dpZHRoLzIpICsgXCJweFwiO1xyXG4gICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLnRvcCA9IHRoaXMuX3JvdGF0aW9uQ2VudGVyWSAtIHRoaXMuX2ltZ0hlaWdodC8yICsgXCJweFwiO1xyXG4gICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmxlZnQgPSB0aGlzLl9yb3RhdGlvbkNlbnRlclggLSB0aGlzLl9pbWdXaWR0aC8yICsgXCJweFwiO1xyXG5cclxuICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIGlmIChzdXBwb3J0ZWRDU1MpXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYW5nbGUpe1xyXG4gICAgICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgICAgICB0aGlzLl9pbWcuc3R5bGVbc3VwcG9ydGVkQ1NTXT1cInJvdGF0ZShcIisoYW5nbGUlMzYwKStcImRlZylcIjtcclxuICAgICAgICAgICAgdGhpcy5faW1nLnN0eWxlW3N1cHBvcnRlZENTU09yaWdpbl09dGhpcy5fcGFyYW1ldGVycy5jZW50ZXIuam9pbihcIiBcIik7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBlbHNlIFxyXG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oYW5nbGUpXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICAgIGFuZ2xlPShhbmdsZSUzNjApKiByYWQ7XHJcbiAgICAgICAgICAgIC8vIGNsZWFyIGNhbnZhc1x0XHJcbiAgICAgICAgICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IHRoaXMuX3dpZHRoOy8vK3RoaXMuX3dpZHRoQWRkO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gdGhpcy5faGVpZ2h0Oy8vK3RoaXMuX2hlaWdodEFkZDtcclxuXHJcbiAgICAgICAgICAgIC8vIFJFTUVNQkVSOiBhbGwgZHJhd2luZ3MgYXJlIHJlYWQgZnJvbSBiYWNrd2FyZHMuLiBzbyBmaXJzdCBmdW5jdGlvbiBpcyB0cmFuc2xhdGUsIHRoZW4gcm90YXRlLCB0aGVuIHRyYW5zbGF0ZSwgdHJhbnNsYXRlLi5cclxuICAgICAgICAgICAgdGhpcy5fY252LnRyYW5zbGF0ZSh0aGlzLl9pbWdXaWR0aCp0aGlzLl9hc3BlY3RXLHRoaXMuX2ltZ0hlaWdodCp0aGlzLl9hc3BlY3RIKTtcdC8vIGF0IGxlYXN0IGNlbnRlciBpbWFnZSBvbiBzY3JlZW5cclxuICAgICAgICAgICAgdGhpcy5fY252LnRyYW5zbGF0ZSh0aGlzLl9yb3RhdGlvbkNlbnRlclgsdGhpcy5fcm90YXRpb25DZW50ZXJZKTtcdFx0XHQvLyB3ZSBtb3ZlIGltYWdlIGJhY2sgdG8gaXRzIG9yZ2luYWwgXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi5yb3RhdGUoYW5nbGUpO1x0XHRcdFx0XHRcdFx0XHRcdFx0Ly8gcm90YXRlIGltYWdlXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi50cmFuc2xhdGUoLXRoaXMuX3JvdGF0aW9uQ2VudGVyWCwtdGhpcy5fcm90YXRpb25DZW50ZXJZKTtcdFx0Ly8gbW92ZSBpbWFnZSB0byBpdHMgY2VudGVyLCBzbyB3ZSBjYW4gcm90YXRlIGFyb3VuZCBpdHMgY2VudGVyXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi5zY2FsZSh0aGlzLl9hc3BlY3RXLHRoaXMuX2FzcGVjdEgpOyAvLyBTQ0FMRSAtIGlmIG5lZWRlZCA7KVxyXG4gICAgICAgICAgICB0aGlzLl9jbnYuZHJhd0ltYWdlKHRoaXMuX2ltZywgMCwgMCk7XHRcdFx0XHRcdFx0XHQvLyBGaXJzdCAtIHdlIGRyYXcgaW1hZ2VcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgIH0pKClcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKElFKVxyXG4gICAgICB7XHJcbiAgICAgICAgV2lscTMyLlBob3RvRWZmZWN0LnByb3RvdHlwZS5jcmVhdGVWTUxOb2RlPShmdW5jdGlvbigpe1xyXG4gICAgICAgICAgZG9jdW1lbnQuY3JlYXRlU3R5bGVTaGVldCgpLmFkZFJ1bGUoXCIucnZtbFwiLCBcImJlaGF2aW9yOnVybCgjZGVmYXVsdCNWTUwpXCIpO1xyXG4gICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgIWRvY3VtZW50Lm5hbWVzcGFjZXMucnZtbCAmJiBkb2N1bWVudC5uYW1lc3BhY2VzLmFkZChcInJ2bWxcIiwgXCJ1cm46c2NoZW1hcy1taWNyb3NvZnQtY29tOnZtbFwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzxydm1sOicgKyB0YWdOYW1lICsgJyBjbGFzcz1cInJ2bWxcIj4nKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0YWdOYW1lKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJzwnICsgdGFnTmFtZSArICcgeG1sbnM9XCJ1cm46c2NoZW1hcy1taWNyb3NvZnQuY29tOnZtbFwiIGNsYXNzPVwicnZtbFwiPicpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgfVx0XHRcclxuICAgICAgICB9KSgpO1xyXG4gICAgICB9XHJcblxyXG59KShqUXVlcnkpO1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xpYi9qcS5yb3RhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJmdW5jdGlvbiBlbXB0eUZ1bihyZXMpe1xyXG5cdGNvbnNvbGUubG9nKHJlcyk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNoZWNrVXJsKHVybCl7XHJcblx0aWYodXJsLmluZGV4T2YoJz8nKT49MCl7XHJcblx0XHRyZXR1cm4gdXJsICs9JyZfdD0nK25ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG5cdH1lbHNle1xyXG5cdFx0cmV0dXJuIHVybCArPSc/X3Q9JytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHBvc3QodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiB1cmwsXHJcblx0XHR0eXBlIDogJ1BPU1QnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG5cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBnZXQodXJsLHBhcmFtLGNhbGxiYWNrLGVycm9yKXtcclxuXHRpZih0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0Y2FsbGJhY2sgPSBlbXB0eUZ1bjtcclxuXHR9XHRcclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblx0YWpheCh7XHJcblx0XHR1cmwgOiBjaGVja1VybCh1cmwpLFxyXG5cdFx0dHlwZSA6ICdHRVQnLFxyXG5cdFx0ZGF0YSA6IHBhcmFtLFxyXG5cdH0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhamF4KG9wdCxjYWxsYmFjayxlcnJvcil7XHJcblx0dmFyIHR5cGUgPSBvcHQudHlwZSB8fCAnR0VUJyxcclxuXHRcdHVybCA9IG9wdC51cmwsXHJcblx0XHRkYXRhID0gb3B0LmRhdGE7XHJcblxyXG5cdGlmKHR5cGVvZiBlcnJvciAhPT0gJ2Z1bmN0aW9uJyl7XHJcblx0XHRlcnJvciA9IGNhbGxiYWNrO1xyXG5cdH1cclxuXHJcblx0JC5hamF4KHtcclxuXHRcdHR5cGUgOiB0eXBlLFxyXG5cdFx0dXJsIDogY2hlY2tVcmwodXJsKSxcclxuXHRcdGRhdGEgOiBkYXRhLFxyXG5cdFx0c3VjY2VzcyA6IGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGNhbGxiYWNrKHJlcyk7XHJcblx0XHR9LFxyXG5cdFx0ZXJyb3IgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRlcnJvcihyZXMpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG5cdGFqYXggOiBhamF4LFxyXG5cdHBvc3QgOiBwb3N0LFxyXG5cdGdldCA6IGdldFxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qc1xuICoqIG1vZHVsZSBpZCA9IDI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgPHNwYW4gZGF0YS1hY3Rpb249XCJsb2dvdXRcIj48c3BhbiBjbGFzcz1cInVzZXJcIj48L3NwYW4+PCUtbmFtZSU+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgPHNwYW4gZGF0YS1hY3Rpb249XCJsb2dvdXRcIj48c3BhbiBjbGFzcz1cInVzZXJcIj48L3NwYW4+JywgKF9fc3RhY2subGluZW5vID0gMSwgbmFtZSksICc8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIiA+PHNwYW4+PC9zcGFuPjxkaXY+PC9kaXY+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqc1xuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcclxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXHJcXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxyXFxuICAgIDwvc3Bhbj5cXHJcXG48L2Rpdj4gXFxyXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxyXFxuICA8dWw+XFxyXFxuICA8JVxcclxcbiAgICBmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgICAgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAlPiBcXHJcXG4gICAgICA8bGkgaWQ9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgY2xhc3M9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIj48JS1pdGVtLm5hbWUlPjwvbGk+XFxyXFxuICA8JX0lPlxcclxcbiAgPC91bD5cXHJcXG48L2Rpdj4gICcsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxuICAgIDwvc3Bhbj5cXG48L2Rpdj4gXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxuICA8dWw+XFxuICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyBcXG4gICAgICA8bGkgaWQ9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgY2xhc3M9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgXCI8L2xpPlxcbiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgPC91bD5cXG48L2Rpdj4gIFwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2U8JS1pZCU+XCIgZGF0YS1pZD1cIjwlLWlkJT5cIj5cXHJcXG5cdDwlLW5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2UnLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSAyLCBuYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcblx0dmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XFxyXFxuJT5cXHJcXG48bGkgdGl0bGU9XCI8JS1pdGVtLm1lc3NhZ2UlPlwiPjxhIGRhdGEtaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1vYmouYXJ0aWNsZUlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1yZWFkPVwiPCUtaXRlbS5yZWFkJT5cIj48JS1pdGVtLm1lc3NhZ2UlPjwvYT48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgdGl0bGU9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm1lc3NhZ2UpLCAnXCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIG9iai5hcnRpY2xlSWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0uaWQpLCAnXCIgZGF0YS1yZWFkPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5yZWFkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubWVzc2FnZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2cuZWpzXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXHJcXG4gICAgICAgICAgPHNwYW4+PCUtdGl0bGUlPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1hcmVhXCI+XFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWFjdGlvbj1cInVwXCIgZGF0YS1pZD1cIjwlLWlkJT5cIiBkYXRhLXN0YXR1cz1cIjwlLXN0YXR1cyU+XCI+PCVpZihzdGF0dXMpeyU+5Y+W5raI572u6aG2PCV9ZWxzZXslPue9rumhtjwlfSU+PC9hPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxyXFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cInJldHVyblwiIGhyZWY9XCIvaW5mby5odG1sP2lkPTwlLXN1YmplY3RfaWQlPlwiPui/lOWbnjwvYT5cXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lXCI+XFxyXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZSh1cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPjwlLW5hbWUlPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiAgZGF0YS1hY3Rpb249XCJzZXR1cFwiICBkYXRhLWlkPVwiPCUtaWQlPlwiPjxzcGFuPjwvc3Bhbj7otZ48L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiPjxzcGFuPjwvc3Bhbj7lm57lpI0gPGZvbnQgaWQ9XCJjb21tZW50Q291bnRcIj48JS1jb21tZW50Q291bnQlPjwvZm9udD48L3NwYW4+XFxyXFxuICAgICAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgICAgICAgICAgIDxkdD48YT48JS10aXRsZSU+PC9hPjwvZHQ+XFxyXFxuICAgICAgICAgICAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCUtY29udGVudCU+XFxyXFxuICAgICAgICAgICAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcclxcbiAgICAgICAgICAgICAgICAgICAgPCVmb3IodmFyIGo9MCxtPXJlc291cmNlTGlzdC5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IHJlc291cmNlTGlzdFtqXTtcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICBpZihvYmoudHlwZSA9PT0gMSl7XFxyXFxuICAgICAgICAgICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcclxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlfX0lPiAgICAgICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgICAgPC9kbD5cXHJcXG4gICAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgICA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cXG4gICAgICAgICAgPHNwYW4+JywgKF9fc3RhY2subGluZW5vID0gMiwgdGl0bGUpLCAnPC9zcGFuPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWN0aW9uLWFyZWFcIj5cXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaWQpLCAnXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBzdGF0dXMpLCAnXCI+Jyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIGlmIChzdGF0dXMpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlj5bmtojnva7pobZcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIue9rumhtlwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9hPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXG4gICAgICAgICAgICA8YSBjbGFzcz1cInJldHVyblwiIGhyZWY9XCIvaW5mby5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDksIHN1YmplY3RfaWQpLCAnXCI+6L+U5ZuePC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtbGlzdFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmVcIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBzdHJpa2VyLnV0aWwuZ2V0Tm93VGltZSh1cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+JywgKF9fc3RhY2subGluZW5vID0gMTYsIG5hbWUpLCAnPC9kaXY+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCIgIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxOCwgaWQpLCAnXCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE4LCBjb21tZW50Q291bnQpLCAnPC9mb250Pjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICAgICAgICAgICAgPGR0PjxhPicsIChfX3N0YWNrLmxpbmVubyA9IDIxLCB0aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICAgICAgICAgICAgPGRkPlxcbiAgICAgICAgICAgICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBjb250ZW50KSwgJ1xcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjY7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSByZXNvdXJjZUxpc3QubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBvYmouaWQpLCAnXCIgIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMiwgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPC9kbD5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZTwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+ICAg5pyA5ZCO5Zue5aSNIDwlLWl0ZW0udXBkYXRvck5hbWUlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+JnNpZD08JS1pdGVtLnN1YmplY3RfaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5pbWdudW0+MCl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xcclxcbiAgICAgICAgICAgIHZhciBpbWdudW0gPSAwO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICBpZihpbWdudW0+Mil7XFxyXFxuICAgICAgICAgICAgICAgICAgYnJlYWs7XFxyXFxuICAgICAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiBkYXRhLXBpZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXHJcXG4gICAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICAgIGltZ251bSsrO1xcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yTmFtZSksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlzU3RhciksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuW3sui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uaWQpLCBcIiZzaWQ9XCIsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnN1YmplY3RfaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPlxcbiAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0uY29udGVudCksIFwiXFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE2O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWdudW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxODtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZ251bSA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzAsIG9iai5pZCksICdcIiBkYXRhLXBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMCwgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdudW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsVwiLCAoX19zdGFjay5saW5lbm8gPSAzNiwgaXRlbS5pbWdudW0pLCBcIuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9MCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuXHQ8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0XHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcclxcblx0PC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG5cdFx0JywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlUmVzXCI+PC9zcGFuPlxcblx0PC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3Jlc291cmNlL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQ8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPiA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIjwlLWl0ZW0uaXNTdGFyJT5cIj48c3Bhbj48L3NwYW4+PCVpZihpdGVtLmlzU3Rhcil7JT7lt7LotZ48JX1lbHNleyU+6LWePCV9JT48L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJjb2xsZWN0XCIgIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc0NvbGxlY3QlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuWPlua2iOaUtuiXjzwlfWVsc2V7JT7mlLbol488JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1jbmFtZT1cIjwlLWl0ZW0uY3JlYXRvck5hbWUlPlwiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+XFxyXFxuICAgICAgICAgIDwvZGl2PiBcXHJcXG4gICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgPGRsIGNsYXNzPVwiY29tbWVudC1kbFwiPlxcclxcbiAgICAgICAgPGR0PjwlLWl0ZW0udGl0bGUlPjwvZHQ+XFxyXFxuICAgICAgICA8ZGQ+XFxyXFxuICAgICAgICAgIDwlLWl0ZW0uY29udGVudCU+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPCVpZihpdGVtLnJlc291cmNlKXslPlxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcXHJcXG4gICAgICAgICAgICBmb3IodmFyIGo9MCxtPWl0ZW0ucmVzb3VyY2UubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgdmFyIG9iaiA9IGl0ZW0ucmVzb3VyY2Vbal07XFxyXFxuICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgICAgIGlmKG9iai50eXBlID09PSAxKXtcXHJcXG4gICAgICAgICAgICAgICAgaWYoaW1nbnVtPjIpe1xcclxcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xcclxcbiAgICAgICAgICAgICAgICB9XFxyXFxuICAgICAgICAgICAgICAgIGltZ251bSsrO1xcclxcbiAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXY+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiICBkYXRhLXBpZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8JX19JT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPCV9JT5cXHJcXG4gICAgPC9kaXY+XFxyXFxuICA8L2Rpdj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUgY29tbWVudCcsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgJywgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJlZGl0XCIgZGF0YS1hY3Rpb249XCJlZGl0XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuW3sui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cImNvbGxlY3RcIiAgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pc0NvbGxlY3QpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5Y+W5raI5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiBkYXRhLWNuYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uY3JlYXRvck5hbWUpLCAnXCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+IFxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICA8ZHQ+JywgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0udGl0bGUpLCBcIjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxNiwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZ251bSA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ251bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBvYmouaWQpLCAnXCIgIGRhdGEtcGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJ1x0PGRpdiBjbGFzcz1cInJldmlldy1jbG9zZVwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L2Rpdj5cXHJcXG5cdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxyXFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJldmlld1wiIGlkPVwicmV2aWV3RGl2XCI+XFxyXFxuXHRcdDwvZGl2PiAgXFxyXFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXNlbGVjdC1ibG9ja1wiIGlkPVwicmV2aWV3QmxvY2tcIj5cXHJcXG5cdFx0PC9kaXY+ICBcXHJcXG5cdFx0PGRpdiBjbGFzcz1cInJldmlldy1iZ1wiPjwvZGl2Plxcclxcblx0PC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWNsb3NlXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmV2aWV3XCIgaWQ9XCJyZXZpZXdEaXZcIj5cXG5cdFx0PC9kaXY+ICBcXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtc2VsZWN0LWJsb2NrXCIgaWQ9XCJyZXZpZXdCbG9ja1wiPlxcblx0XHQ8L2Rpdj4gIFxcblx0XHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWJnXCI+PC9kaXY+XFxuXHQ8L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9yZXZpZXcvYm9keS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPGRpdiBjbGFzcz1cImFsLWFycm93XCIgdGl0bGE9XCLkuIrkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXHJcXG48JVxcclxcblx0aWYodHlwZSA9PSAxKXtcXHJcXG4lPlxcclxcblx0PGRpdiBjbGFzcz1cInJldmlldy1pbWctYmxvY2tcIj5cXHJcXG5cdFx0PGltZyBpZD1cInJldmlld0ltZ1wiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pZCU+XCIgYWxpZ249XCJhYnNtaWRkbGVcIiAvPlxcclxcblx0PC9kaXY+XFxyXFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXHJcXG5cdFx0XHQ8ZGw+XFxyXFxuXHRcdFx0XHQ8ZHQ+5paH5Lu25ZCNOjwlLW5hbWUlPjwvZHQ+XFxyXFxuXHRcdFx0XHQ8ZGQ+XFxyXFxuXHRcdFx0XHRcdOaWh+S7tuWkp+WwjzogPCUtc2l6ZSU+XFxyXFxuXHRcdFx0XHRcdOaXtumXtDogPCUtY3JlYXRlVGltZSU+XFxyXFxuXHRcdFx0XHQ8L2RkPlxcclxcblx0XHRcdDwvZGw+XFxyXFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtYWN0XCI+XHRcdFx0XFxyXFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRvLWxlZnRcIj7lt6bovaw8L3NwYW4+XFxyXFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRvLXJpZ2h0XCI+5Y+z6L2sPC9zcGFuPlxcclxcblx0XHRcdDwvZGl2Plxcclxcblx0XHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3QtYmdcIj48L2Rpdj5cXHJcXG5cdFx0PC9kaXY+XHRcXHJcXG48JX1lbHNlIGlmKHR5cGUgPT0gMil7JT5cXHJcXG5cdDxkaXYgaWQ9XCJkb2N1bWVudFZpZXdlclwiIGNsYXNzPVwiZmxleHBhcGVyX3ZpZXdlclwiPlxcclxcblx0XHRcXHJcXG5cdDwvZGl2PlxcclxcbjwlfWVsc2UgaWYodHlwZSA9PSAzIHx8IHR5cGU9PTQpeyU+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwicGxheWVyWm9uZVwiPlxcclxcblx0ICA8dmlkZW8gaWQ9XCJleGFtcGxlX3ZpZGVvXzFcIiBjbGFzcz1cInZpZGVvLWpzIHZqcy1kZWZhdWx0LXNraW5cIiBjb250cm9scyBwcmVsb2FkPVwibm9uZVwiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjY0XCJcXHJcXG5cdCAgICAgIFxcclxcblx0ICAgICAgZGF0YS1zZXR1cD1cInt9XCI+XFxyXFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWlkJT5cIiB0eXBlPVxcJ3ZpZGVvL21wNFxcJyAvPlxcclxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pZCU+XCIgdHlwZT1cXCd2aWRlby93ZWJtXFwnIC8+XFxyXFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWlkJT5cIiB0eXBlPVxcJ3ZpZGVvL29nZ1xcJyAvPlxcclxcblx0ICAgIDx0cmFjayBraW5kPVwiY2FwdGlvbnNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxyXFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJzdWJ0aXRsZXNcIiBzcmM9XCJkZW1vLmNhcHRpb25zLnZ0dFwiIHNyY2xhbmc9XCJlblwiIGxhYmVsPVwiRW5nbGlzaFwiPjwvdHJhY2s+PCEtLSBUcmFja3MgbmVlZCBhbiBlbmRpbmcgdGFnIHRoYW5rcyB0byBJRTkgLS0+XFxyXFxuXHQgIDwvdmlkZW8+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxyXFxuXHRcdDxkbD5cXHJcXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOjwlLW5hbWUlPjwvZHQ+XFxyXFxuXHRcdFx0PGRkPlxcclxcblx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXHJcXG5cdFx0XHRcdOaXtumXtDogPCUtY3JlYXRlVGltZSU+XFxyXFxuXHRcdFx0PC9kZD5cXHJcXG5cdFx0PC9kbD5cXHJcXG5cdDwvZGl2Plxcclxcblxcclxcblx0PC9kaXY+XFxyXFxuPCV9ZWxzZSBpZih0eXBlID09IDgpeyU+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwidGV4dC1yZXZpZXdcIj48JS10ZXh0JT48L2Rpdj5cXHJcXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXHJcXG5cdFx0PGRsPlxcclxcblx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXHJcXG5cdFx0XHQ8ZGQ+XFxyXFxuXHRcdFx0XHTmlofku7blpKflsI86IDwlLXNpemUlPlxcclxcblx0XHRcdFx05pe26Ze0OiA8JS10aW1lJT5cXHJcXG5cdFx0XHQ8L2RkPlxcclxcblx0XHQ8L2RsPlxcclxcblx0PC9kaXY+XHRcXHJcXG48JX1lbHNleyU+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxyXFxuXHRcdDxpIGNsYXNzPVwiaWNvbi10eXBlPCUtdHlwZSU+XCI+PC9pPlxcclxcblx0XHQ8ZGw+XFxyXFxuXHRcdFx0PGR0PuaWh+S7tuWQjTo8JS1uYW1lJT48L2R0Plxcclxcblx0XHRcdDxkZD5cXHJcXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogPCUtc2l6ZSU+XFxyXFxuXHRcdFx0XHTml7bpl7Q6IDwlLWNyZWF0ZVRpbWUlPlxcclxcblx0XHRcdDwvZGQ+XFxyXFxuXHRcdDwvZGw+XFxyXFxuXHQ8L2Rpdj5cdFxcclxcbjwlfSU+XFxyXFxuPGRpdiBjbGFzcz1cImFyLWFycm93XCIgdGl0bGE9XCLkuIvkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPGRpdiBjbGFzcz1cImFsLWFycm93XCIgdGl0bGE9XCLkuIrkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXG4nKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGUgPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWltZy1ibG9ja1wiPlxcblx0XHQ8aW1nIGlkPVwicmV2aWV3SW1nXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIGlkKSwgJ1wiIGFsaWduPVwiYWJzbWlkZGxlXCIgLz5cXG5cdDwvZGl2Plxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdFx0PGRsPlxcblx0XHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSAxMCwgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHRcdDxkZD5cXG5cdFx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gMTIsIHNpemUpLCBcIlxcblx0XHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSAxMywgY3JlYXRlVGltZSksICdcXG5cdFx0XHRcdDwvZGQ+XFxuXHRcdFx0PC9kbD5cXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1hY3RcIj5cdFx0XHRcXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tbGVmdFwiPuW3pui9rDwvc3Bhbj5cXG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwidG8tcmlnaHRcIj7lj7Povaw8L3NwYW4+XFxuXHRcdFx0PC9kaXY+XFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdC1iZ1wiPjwvZGl2Plxcblx0XHQ8L2Rpdj5cdFxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIyO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgaWQ9XCJkb2N1bWVudFZpZXdlclwiIGNsYXNzPVwiZmxleHBhcGVyX3ZpZXdlclwiPlxcblx0XHRcXG5cdDwvZGl2PlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDI2O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSAzIHx8IHR5cGUgPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwicGxheWVyWm9uZVwiPlxcblx0ICA8dmlkZW8gaWQ9XCJleGFtcGxlX3ZpZGVvXzFcIiBjbGFzcz1cInZpZGVvLWpzIHZqcy1kZWZhdWx0LXNraW5cIiBjb250cm9scyBwcmVsb2FkPVwibm9uZVwiIHdpZHRoPVwiNjQwXCIgaGVpZ2h0PVwiMjY0XCJcXG5cdCAgICAgIFxcblx0ICAgICAgZGF0YS1zZXR1cD1cInt9XCI+XFxuXHQgICAgPHNvdXJjZSBzcmM9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDMxLCBpZCksIFwiXFxcIiB0eXBlPSd2aWRlby9tcDQnIC8+XFxuXHQgICAgPHNvdXJjZSBzcmM9XFxcIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9XCIsIChfX3N0YWNrLmxpbmVubyA9IDMyLCBpZCksIFwiXFxcIiB0eXBlPSd2aWRlby93ZWJtJyAvPlxcblx0ICAgIDxzb3VyY2Ugc3JjPVxcXCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAzMywgaWQpLCAnXCIgdHlwZT1cXCd2aWRlby9vZ2dcXCcgLz5cXG5cdCAgICA8dHJhY2sga2luZD1cImNhcHRpb25zXCIgc3JjPVwiZGVtby5jYXB0aW9ucy52dHRcIiBzcmNsYW5nPVwiZW5cIiBsYWJlbD1cIkVuZ2xpc2hcIj48L3RyYWNrPjwhLS0gVHJhY2tzIG5lZWQgYW4gZW5kaW5nIHRhZyB0aGFua3MgdG8gSUU5IC0tPlxcblx0ICAgIDx0cmFjayBraW5kPVwic3VidGl0bGVzXCIgc3JjPVwiZGVtby5jYXB0aW9ucy52dHRcIiBzcmNsYW5nPVwiZW5cIiBsYWJlbD1cIkVuZ2xpc2hcIj48L3RyYWNrPjwhLS0gVHJhY2tzIG5lZWQgYW4gZW5kaW5nIHRhZyB0aGFua3MgdG8gSUU5IC0tPlxcblx0ICA8L3ZpZGVvPlxcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcblx0XHQ8ZGw+XFxuXHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSAzOSwgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHQ8ZGQ+XFxuXHRcdFx0XHTmlofku7blpKflsI86IFwiLCAoX19zdGFjay5saW5lbm8gPSA0MSwgc2l6ZSksIFwiXFxuXHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSA0MiwgY3JlYXRlVGltZSksIFwiXFxuXHRcdFx0PC9kZD5cXG5cdFx0PC9kbD5cXG5cdDwvZGl2Plxcblxcblx0PC9kaXY+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PSA4KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgY2xhc3M9XCJ0ZXh0LXJldmlld1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDQ5LCB0ZXh0KSwgJzwvZGl2Plxcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcblx0XHQ8ZGw+XFxuXHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSA1MiwgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHQ8ZGQ+XFxuXHRcdFx0XHTmlofku7blpKflsI86IFwiLCAoX19zdGFjay5saW5lbm8gPSA1NCwgc2l6ZSksIFwiXFxuXHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSA1NSwgdGltZSksIFwiXFxuXHRcdFx0PC9kZD5cXG5cdFx0PC9kbD5cXG5cdDwvZGl2Plx0XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU5O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGkgY2xhc3M9XCJpY29uLXR5cGUnLCAoX19zdGFjay5saW5lbm8gPSA2MSwgdHlwZSksICdcIj48L2k+XFxuXHRcdDxkbD5cXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOicsIChfX3N0YWNrLmxpbmVubyA9IDYzLCBuYW1lKSwgXCI8L2R0Plxcblx0XHRcdDxkZD5cXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogXCIsIChfX3N0YWNrLmxpbmVubyA9IDY1LCBzaXplKSwgXCJcXG5cdFx0XHRcdOaXtumXtDogXCIsIChfX3N0YWNrLmxpbmVubyA9IDY2LCBjcmVhdGVUaW1lKSwgXCJcXG5cdFx0XHQ8L2RkPlxcblx0XHQ8L2RsPlxcblx0PC9kaXY+XHRcXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNzA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48ZGl2IGNsYXNzPVwiYXItYXJyb3dcIiB0aXRsYT1cIuS4i+S4gOS4quaWh+S7tlwiIGRhdGEtYWN0aW9uPVwic2hvd05leHRcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9yZXZpZXcvbWFpbi5lanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnXHQ8ZGl2IGNsYXNzPVwiYWwtYXJyb3ctcFwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2Plxcclxcblx0PGRpdiBjbGFzcz1cInJldmlldy1saXN0LWJsb2NrXCI+XFxyXFxuXHRcdDx1bCBpZD1cInJldmlld0ZpbGVMaXN0XCI+XFxyXFxuXFxyXFxuXHRcdDwlXFxyXFxuXHRcdHZhciBpZHggPSAwO1xcclxcblx0XHRmb3IodmFyIGkgaW4gbGlzdCl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG5cdFx0JT5cXHJcXG5cdFx0XHQ8bGkgaWQ9XCJyZXZpZXc8JS1pdGVtLmlkJT5cIiAgZGF0YS1pZHg9XCI8JS1pZHglPlwiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgPCVpZihpdGVtLmlkID09PSBpZCl7JT5jbGFzcz1cInNlbGVjdGVkXCI8JX0lPiB0aXRsZT1cIjwlLWl0ZW0ubmFtZSU+XCI+XFxyXFxuXHRcdFx0PCVpZihpdGVtLnR5cGU9PT0xKXslPlxcclxcblx0XHRcdFx0PGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtaXRlbS5pZCU+XCIgZGF0YS1pZHg9XCI8JS1pZHglPlwiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgLz5cXHJcXG5cdFx0XHQ8JX1lbHNleyU+XFxyXFxuXHRcdFx0XHQ8aSBjbGFzcz1cImZkbmFtZTwlLWl0ZW0uaWQlPiBpY29uLXR5cGVcIiBkYXRhLWlkeD1cIjwlLWlkeCU+XCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48L2k+XFxyXFxuXHRcdFx0PCV9JT5cXHJcXG5cdFx0XHQ8L2xpPlxcclxcblx0XHQ8JVxcclxcblx0XHRcdFx0aWR4Kys7XFxyXFxuXHRcdFx0fVxcclxcblx0XHQlPlxcclxcblx0XHQ8L3VsPlxcclxcblx0PC9kaXY+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwiYXItYXJyb3ctcFwiIGRhdGEtYWN0aW9uPVwic2hvd05leHRcIj48L2Rpdj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcdDxkaXYgY2xhc3M9XCJhbC1hcnJvdy1wXCIgZGF0YS1hY3Rpb249XCJzaG93UHJlXCI+PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwicmV2aWV3LWxpc3QtYmxvY2tcIj5cXG5cdFx0PHVsIGlkPVwicmV2aWV3RmlsZUxpc3RcIj5cXG5cXG5cdFx0Jyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA1O1xuICAgICAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgaW4gbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0XHQ8bGkgaWQ9XCJyZXZpZXcnLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaXRlbS5pZCksICdcIiAgZGF0YS1pZHg9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgaWR4KSwgJ1wiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlkID09PSBpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ2NsYXNzPVwic2VsZWN0ZWRcIicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0ubmFtZSksICdcIj5cXG5cdFx0XHQnKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0XHRcdFx0PGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZHg9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMiwgaWR4KSwgJ1wiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uaWQpLCAnXCIgLz5cXG5cdFx0XHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHRcdFx0XHQ8aSBjbGFzcz1cImZkbmFtZScsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpdGVtLmlkKSwgJyBpY29uLXR5cGVcIiBkYXRhLWlkeD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDE0LCBpZHgpLCAnXCIgZGF0YS1hY3Rpb249XCJzaG93RmlsZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5pZCksICdcIj48L2k+XFxuXHRcdFx0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE1O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuXHRcdFx0PC9saT5cXG5cdFx0XCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE3O1xuICAgICAgICAgICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0XHQ8L3VsPlxcblx0PC9kaXY+XFxuXHQ8ZGl2IGNsYXNzPVwiYXItYXJyb3ctcFwiIGRhdGEtYWN0aW9uPVwic2hvd05leHRcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9yZXZpZXcvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0M1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPGxpIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLW5hbWU9XCI8JS1pdGVtLm5hbWUlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPlxcclxcbjwvbGk+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxsaSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLW5hbWU9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnXCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksIFwiXFxuPC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSA0NFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT48c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXHJcXG48L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWwnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzXG4gKiogbW9kdWxlIGlkID0gNDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJjb21tZW50LmpzIn0=