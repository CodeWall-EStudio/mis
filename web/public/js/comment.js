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
	
	Date.prototype.pattern=function(fmt) {         
	    var o = {         
	    "M+" : this.getMonth()+1, //月份         
	    "d+" : this.getDate(), //日         
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
	    "H+" : this.getHours(), //小时         
	    "m+" : this.getMinutes(), //分         
	    "s+" : this.getSeconds(), //秒         
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
	    "S" : this.getMilliseconds() //毫秒         
	    };         
	    var week = {         
	    "0" : "/u65e5",         
	    "1" : "/u4e00",         
	    "2" : "/u4e8c",         
	    "3" : "/u4e09",         
	    "4" : "/u56db",         
	    "5" : "/u4e94",         
	    "6" : "/u516d"        
	    };         
	    if(/(y+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
	    }         
	    if(/(E+)/.test(fmt)){         
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
	    }         
	    for(var k in o){         
	        if(new RegExp("("+ k +")").test(fmt)){         
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
	        }         
	    }         
	    return fmt;         
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

	var cgi = __webpack_require__(13).user,
		logout = __webpack_require__(13).logout,
		data = __webpack_require__(17).user,
		userManage = __webpack_require__(18),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(33),
		manage : __webpack_require__(34),
		onemanage : __webpack_require__(35)
	}
	
	var User = {},
		_this = User;
	module.exports = User;
	
	//对外提供的接口
	window.striker.user = User;
	
	//管理员设置显示等等
	User.manage = userManage.manage;
	
	var sDom,sInput;
	
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
		},
		'search' : function(){
	
			if(!sDom){
				$('body').append('<div class="fix-dom"><div id="searchBlockDom"><input type="text" placeholder="请输入关键字" /><button data-action="startsearch" class="btn btn-primary">搜索</button></div></div>');
				sDom = $("#searchBlockDom");
				sInput = sDom.find('input');
				bindSdom();
				
			}
			sDom.show();
		}
	}
	
	var bindSdom = function(){
		sDom.bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			if(action){
				var key = sInput.val();
				if(key !== ''){
					striker.trigger('startSearch',key);
					sDom.hide();
				}
			}
			
		});
	
		sInput.bind('keyup',function(e){
			if(e.keyCode === 13){
				var key = sInput.val();
				if(key !== ''){
					striker.trigger('startSearch',key);
					sDom.hide();
				}
			}
			
		});
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

	var cgi = __webpack_require__(13).article;
	var data = __webpack_require__(17);
	var tmpl = {
		info : __webpack_require__(30)
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
	
		this.my = data.user.myInfo;
	
		this.getDate();
		this.bindAction();
	}
	
	articleInfo.prototype.getDate = function(){
		var _this = this;
		cgi.info({id: this.artId},function(res){
			if(res.code === 0){
				res.data.sid = _this.subId;
				res.data.my = _this.my;
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
			d.my = _this.my;
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
		data = __webpack_require__(17),
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
	
	var cgi = __webpack_require__(13).article;
	var tmpl = {
		list : __webpack_require__(31),
		rlist : __webpack_require__(39)   //资源列表
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

	var cgi = __webpack_require__(13).comment;
	var data = __webpack_require__(17);
	var tmpl = {
		list : __webpack_require__(38)
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
	
		this.my = data.user.myInfo;
	
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
				list : [data],
				my : this.my
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
		if(this.key){
			param.keyword = this.key;
		}
	
		cgi.search(param,function(res){
			this.loading = false;
			if(res.code === 0){
				_this.start += _this.limit;
				_this.saveData(res.data);
				res.data.my = _this.my;
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
			list : [data],
			my : this.my
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
	
	
		striker.bind('startSearch',function(e,d){
			_this.key = d;
			_this.start = 0;
	
			_this.dom.html('');
			_this.getDate();
	
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

	var cgi = __webpack_require__(13).comment;
	var tmpl = {
		list : __webpack_require__(31),
		rlist : __webpack_require__(39)   //资源列表
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
		data = __webpack_require__(17).notify,
		cgi = __webpack_require__(13).notify;
	
	var tmpl = {
		list : __webpack_require__(36),
		one : __webpack_require__(37)   //资源列表
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
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	var tmpl = {
		body : __webpack_require__(40),
		main : __webpack_require__(41),
		list : __webpack_require__(42)
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
	
	// review.prototype.showVedio = function(e){
	//           // <source src="/cgi/resource/download?id=<%-id%>" type='video/mp4' />
	//           // <source src="/cgi/resource/download?id=<%-id%>" type='video/webm' />
	//           // <source src="/cgi/resource/download?id=<%-id%>" type='video/ogg' />
	//           // <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
	//           // <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->	
	// }
	
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
	
	// striker.bind('showVideo',function(e,d){
	// 	if(!rv){
	// 		rv = new review(d);
	// 	}else{
	// 		rv.showVedio(d);
	// 	}
	// });

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var cgi = __webpack_require__(13).label,
		data = __webpack_require__(17).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(43),
		one : __webpack_require__(44)
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(27),
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
			'ref' : cgiPath+'article/newart', //收藏
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
	
	db.article.ref = function(param,callback){
		var callback = checkCallback(callback);
		request.get(cgiList.article.ref,param,callback);
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	//用户列表显示等等
	var uManage = {},
		data = __webpack_require__(17).user;
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
	
	//显示管理员列表
	manage.prototype.showmlist = function(){
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
			if(i){
				list.push(i);
			}
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
	
	manage.prototype.addone = function(d){
		if(d.id !== data.myInfo.id){
			var html = tmpl.onemanage({
				id : d.id,
				name : d.name
			});
	
			this.idmap[d.id] = 1;
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
/* 19 */
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
/* 21 */
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
/* 22 */
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
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
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
/* 28 */,
/* 29 */,
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <div class="title">\r\n          <span><%-title%></span>\r\n          <div class="action-area">\r\n            <%if(my.auth === 1){%>\r\n            <a class="btn btn-primary" data-action="up" data-id="<%-id%>" data-status="<%-status%>"><%if(status){%>取消置顶<%}else{%>置顶<%}%></a>\r\n            <%}%>\r\n            <div class="btn-group">\r\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\r\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\r\n            </div>        \r\n            <a class="return" href="/info.html?id=<%-subject_id%>">返回</a>\r\n          </div>\r\n        </div>\r\n        <div class="comment-list">\r\n          <div class="comment-one">\r\n              <div class="comment-one-aside"><%-striker.util.getNowTime(updateTime)%></div>\r\n              <div class="comment-one-info">\r\n                <div class="info-title"><%-name%></div>\r\n                <div class="info-action">\r\n                  <%if(my.auth === 1 || my.id === creator){%>\r\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> \r\n                  <%}%>\r\n                  <span class="up"  data-action="setup"  data-id="<%-id%>"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount"><%-commentCount%></font></span>\r\n                </div>          \r\n                <dl class="comment-dl">\r\n                  <dt><a><%-title%></a></dt>\r\n                  <dd>\r\n                    <%-content%>\r\n                  </dd>\r\n                  <div class="comment-img-list">\r\n                    <%for(var j=0,m=resourceList.length;j<m;j++){\r\n                        var obj = resourceList[j];\r\n                        \r\n                        if(obj.type === 1){\r\n                    %>\r\n                      <div>\r\n                        <img src="/cgi/resource/preview?id=<%-obj.id%>"  data-id="<%-obj.id%>" data-action="review" width="200" />\r\n                      </div>\r\n                    <%}}%>                  \r\n          \r\n                </dl>\r\n              </div>\r\n            </div>\r\n        </div>',
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
	                buf.push('        <div class="title">\n          <span>', (__stack.lineno = 2, title), '</span>\n          <div class="action-area">\n            ');
	                __stack.lineno = 4;
	                if (my.auth === 1) {
	                    buf.push('\n            <a class="btn btn-primary" data-action="up" data-id="', (__stack.lineno = 5, id), '" data-status="', (__stack.lineno = 5, status), '">');
	                    __stack.lineno = 5;
	                    if (status) {
	                        buf.push("取消置顶");
	                        __stack.lineno = 5;
	                    } else {
	                        buf.push("置顶");
	                        __stack.lineno = 5;
	                    }
	                    buf.push("</a>\n            ");
	                    __stack.lineno = 6;
	                }
	                buf.push('\n            <div class="btn-group">\n              <a class="btn btn-primary active time-btn" href="#fakelink" data-action="orderbytime">按创建时间排序</a>\n              <a class="btn btn-primary update-btn" href="#fakelink" data-action="orderbyupdate">按更新时间排序</a>\n            </div>        \n            <a class="return" href="/info.html?id=', (__stack.lineno = 11, subject_id), '">返回</a>\n          </div>\n        </div>\n        <div class="comment-list">\n          <div class="comment-one">\n              <div class="comment-one-aside">', (__stack.lineno = 16, striker.util.getNowTime(updateTime)), '</div>\n              <div class="comment-one-info">\n                <div class="info-title">', (__stack.lineno = 18, name), '</div>\n                <div class="info-action">\n                  ');
	                __stack.lineno = 20;
	                if (my.auth === 1 || my.id === creator) {
	                    buf.push('\n                  <span class="edit" data-action="edit"><span></span>编辑</span> <span class="delete"  data-action="delete"><span></span>删除</span> \n                  ');
	                    __stack.lineno = 22;
	                }
	                buf.push('\n                  <span class="up"  data-action="setup"  data-id="', (__stack.lineno = 23, id), '"><span></span>赞</span> <span class="post"><span></span>回复 <font id="commentCount">', (__stack.lineno = 23, commentCount), '</font></span>\n                </div>          \n                <dl class="comment-dl">\n                  <dt><a>', (__stack.lineno = 26, title), "</a></dt>\n                  <dd>\n                    ", (__stack.lineno = 28, content), '\n                  </dd>\n                  <div class="comment-img-list">\n                    ');
	                __stack.lineno = 31;
	                for (var j = 0, m = resourceList.length; j < m; j++) {
	                    var obj = resourceList[j];
	                    if (obj.type === 1) {
	                        buf.push('\n                      <div>\n                        <img src="/cgi/resource/preview?id=', (__stack.lineno = 37, obj.id), '"  data-id="', (__stack.lineno = 37, obj.id), '" data-action="review" width="200" />\n                      </div>\n                    ');
	                        __stack.lineno = 39;
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
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%\r\nconsole.log(my);\r\nfor(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="artice-one article<%-item.id%>">\r\n    <div class="artice-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="artice-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%>   最后回复 <%-item.updatorName%></div>\r\n      <div class="info-action">\r\n        <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>"><span></span>回复</span> \r\n        <%if(my.id === item.creator || my.auth === 1){%>\r\n        <span class="delete" data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n        <%}%>\r\n      </div>          \r\n      <dl class="artice-dl">\r\n        <dt><a href="article.html?id=<%-item.id%>&sid=<%-item.subject_id%>"><%-item.title%></a></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.imgnum>0){%>\r\n        <div class="artice-img-list">\r\n          <%\r\n            var first = true;\r\n            var imgnum = 0;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n                if(imgnum>2){\r\n                  break;\r\n                }\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>" data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" />\r\n              <%\r\n                imgnum++;\r\n                if(first){\r\n                  first = false;\r\n              %>\r\n              <span>共<%-item.imgnum%>张</span>\r\n              <%}%>\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                console.log(my);
	                for (var i = 0, l = list.length; i < l; i++) {
	                    var item = list[i];
	                    buf.push('\n  <div class="artice-one article', (__stack.lineno = 6, item.id), '">\n    <div class="artice-one-aside">', (__stack.lineno = 7, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="artice-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 9, item.creatorName), "   最后回复 ", (__stack.lineno = 9, item.updatorName), '</div>\n      <div class="info-action">\n        <span class="up" data-id="', (__stack.lineno = 11, item.id), '" data-action="setup" data-status="', (__stack.lineno = 11, item.isStar), '"><span></span>');
	                    __stack.lineno = 11;
	                    if (item.isStar) {
	                        buf.push("已赞");
	                        __stack.lineno = 11;
	                    } else {
	                        buf.push("赞");
	                        __stack.lineno = 11;
	                    }
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 11, item.id), '"><span></span>回复</span> \n        ');
	                    __stack.lineno = 12;
	                    if (my.id === item.creator || my.auth === 1) {
	                        buf.push('\n        <span class="delete" data-action="delete" data-id="', (__stack.lineno = 13, item.id), '"><span></span>删除</span>\n        ');
	                        __stack.lineno = 14;
	                    }
	                    buf.push('\n      </div>          \n      <dl class="artice-dl">\n        <dt><a href="article.html?id=', (__stack.lineno = 17, item.id), "&sid=", (__stack.lineno = 17, item.subject_id), '">', (__stack.lineno = 17, item.title), "</a></dt>\n        <dd>\n          ", (__stack.lineno = 19, item.content), "\n        </dd>\n        ");
	                    __stack.lineno = 21;
	                    if (item.imgnum > 0) {
	                        buf.push('\n        <div class="artice-img-list">\n          ');
	                        __stack.lineno = 23;
	                        var first = true;
	                        var imgnum = 0;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                if (imgnum > 2) {
	                                    break;
	                                }
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 35, obj.id), '" data-pid="', (__stack.lineno = 35, item.id), '" data-id="', (__stack.lineno = 35, obj.id), '" data-action="review" />\n              ');
	                                __stack.lineno = 36;
	                                imgnum++;
	                                if (first) {
	                                    first = false;
	                                    buf.push("\n              <span>共", (__stack.lineno = 41, item.imgnum), "张</span>\n              ");
	                                    __stack.lineno = 42;
	                                }
	                                buf.push("\n            </div>\n          ");
	                                __stack.lineno = 44;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 46;
	                    }
	                    buf.push("\n    </div>\n  </div>\n");
	                    __stack.lineno = 49;
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
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '      <span data-action="logout"><span class="user"></span><%-name%></span>\r\n      <span class="msg" ><span></span><div></div></span>\r\n      <span class="dialog"></span>\r\n      <span class="search" data-action="search"></span>\r\n      <span class="memu"></span>',
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
	                buf.push('      <span data-action="logout"><span class="user"></span>', (__stack.lineno = 1, name), '</span>\n      <span class="msg" ><span></span><div></div></span>\n      <span class="dialog"></span>\n      <span class="search" data-action="search"></span>\n      <span class="memu"></span>');
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
/* 35 */
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
/* 36 */
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
/* 37 */
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
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '<%for(var i =0,l=list.length;i<l;i++){\r\n  var item = list[i];\r\n%>\r\n  <div class="comment-one comment<%-item.id%>">\r\n    <div class="comment-one-aside"><%-striker.util.getNowTime(item.updateTime)%></div>\r\n    <div class="comment-one-info">\r\n      <div class="info-title">发帖 <%-item.creatorName%></div>\r\n      <div class="info-action">\r\n          <div class="info-action">\r\n            <%if(my.auth === 1 || my.id === item.creator){%>\r\n            <span class="edit" data-action="edit" data-id="<%-item.id%>"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="<%-item.id%>"><span></span>删除</span>\r\n            <%}%> \r\n            <span class="up" data-id="<%-item.id%>" data-action="setup" data-status="<%-item.isStar%>"><span></span><%if(item.isStar){%>已赞<%}else{%>赞<%}%></span> <span class="up" data-id="<%-item.id%>" data-action="collect"  data-status="<%-item.isCollect%>"><span></span><%if(item.isStar){%>取消收藏<%}else{%>收藏<%}%></span> <span class="post" data-action="replay" data-id="<%-item.id%>" data-cname="<%-item.creatorName%>"><span></span>回复</span>\r\n          </div> \r\n      </div>          \r\n      <dl class="comment-dl">\r\n        <dt><%-item.title%></dt>\r\n        <dd>\r\n          <%-item.content%>\r\n        </dd>\r\n        <%if(item.resource){%>\r\n        <div class="comment-img-list">\r\n          <%\r\n            var imgnum = 0;\r\n            for(var j=0,m=item.resource.length;j<m;j++){\r\n              var obj = item.resource[j];\r\n              \r\n              if(obj.type === 1){\r\n                if(imgnum>2){\r\n                  break;\r\n                }\r\n                imgnum++;\r\n          %>\r\n            <div>\r\n              <img src="/cgi/resource/preview?id=<%-obj.id%>"  data-pid="<%-item.id%>" data-id="<%-obj.id%>" data-action="review" width="200" />\r\n            </div>\r\n          <%}}%>\r\n        </div>\r\n        <%}%>\r\n    </div>\r\n  </div>\r\n<%}%>',
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
	                    buf.push('\n  <div class="comment-one comment', (__stack.lineno = 4, item.id), '">\n    <div class="comment-one-aside">', (__stack.lineno = 5, striker.util.getNowTime(item.updateTime)), '</div>\n    <div class="comment-one-info">\n      <div class="info-title">发帖 ', (__stack.lineno = 7, item.creatorName), '</div>\n      <div class="info-action">\n          <div class="info-action">\n            ');
	                    __stack.lineno = 10;
	                    if (my.auth === 1 || my.id === item.creator) {
	                        buf.push('\n            <span class="edit" data-action="edit" data-id="', (__stack.lineno = 11, item.id), '"><span></span>编辑</span> <span class="delete"  data-action="delete" data-id="', (__stack.lineno = 11, item.id), '"><span></span>删除</span>\n            ');
	                        __stack.lineno = 12;
	                    }
	                    buf.push(' \n            <span class="up" data-id="', (__stack.lineno = 13, item.id), '" data-action="setup" data-status="', (__stack.lineno = 13, item.isStar), '"><span></span>');
	                    __stack.lineno = 13;
	                    if (item.isStar) {
	                        buf.push("已赞");
	                        __stack.lineno = 13;
	                    } else {
	                        buf.push("赞");
	                        __stack.lineno = 13;
	                    }
	                    buf.push('</span> <span class="up" data-id="', (__stack.lineno = 13, item.id), '" data-action="collect"  data-status="', (__stack.lineno = 13, item.isCollect), '"><span></span>');
	                    __stack.lineno = 13;
	                    if (item.isStar) {
	                        buf.push("取消收藏");
	                        __stack.lineno = 13;
	                    } else {
	                        buf.push("收藏");
	                        __stack.lineno = 13;
	                    }
	                    buf.push('</span> <span class="post" data-action="replay" data-id="', (__stack.lineno = 13, item.id), '" data-cname="', (__stack.lineno = 13, item.creatorName), '"><span></span>回复</span>\n          </div> \n      </div>          \n      <dl class="comment-dl">\n        <dt>', (__stack.lineno = 17, item.title), "</dt>\n        <dd>\n          ", (__stack.lineno = 19, item.content), "\n        </dd>\n        ");
	                    __stack.lineno = 21;
	                    if (item.resource) {
	                        buf.push('\n        <div class="comment-img-list">\n          ');
	                        __stack.lineno = 23;
	                        var imgnum = 0;
	                        for (var j = 0, m = item.resource.length; j < m; j++) {
	                            var obj = item.resource[j];
	                            if (obj.type === 1) {
	                                if (imgnum > 2) {
	                                    break;
	                                }
	                                imgnum++;
	                                buf.push('\n            <div>\n              <img src="/cgi/resource/preview?id=', (__stack.lineno = 35, obj.id), '"  data-pid="', (__stack.lineno = 35, item.id), '" data-id="', (__stack.lineno = 35, obj.id), '" data-action="review" width="200" />\n            </div>\n          ');
	                                __stack.lineno = 37;
	                            }
	                        }
	                        buf.push("\n        </div>\n        ");
	                        __stack.lineno = 39;
	                    }
	                    buf.push("\n    </div>\n  </div>\n");
	                    __stack.lineno = 42;
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
/* 40 */
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYjI3MTU1YzIzOTA0ZTk1ODY4ZTY/MjQ4YyoqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzPzViMjcqIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanM/ZWM0ZiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvYXJ0aWNsZS9pbmZvLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9hcnRpY2xlL3Bvc3QuanM/OTQyZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbWVudC9saXN0LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tZW50L3Bvc3QuanM/OTBhYiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbm90aWZ5L25vdGlmeS5qcz9kY2E3Iiwid2VicGFjazovLy8uL3NyYy9qcy9yZXNvdXJjZS9yZXZpZXcuanM/OTNkZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGFiZWwvbGFiZWwuanM/MTNkZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL2NnaS5qcz8yM2IyKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvZGF0YS9kYXRhLmpzPzlkZTkiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9wbGF5ZXIvdmlkZW8uZGV2LmpzP2ZmOTciLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xpYi9mbGV4L2ZsZXhwYXBlci5qcz9jZTA3Iiwid2VicGFjazovLy8uL3NyYy9qcy9saWIvZmxleC9mbGV4cGFwZXJfaGFuZGxlcnMuanM/OTQ0ZSIsIndlYnBhY2s6Ly8vLi9zcmMvanMvbGliL2pxLnJvdGF0ZS5qcz82Njg1Iiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvb25lLmVqcyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanM/M2ZhMiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvdXNlcl9uYXYuZWpzPzZmZmIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21hbmFnZS5lanM/NTNhMyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0Iiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2dsaXN0LmVqcz84OTYwIiwid2VicGFjazovLy8uL3NyYy90cGwvdXNlci9tc2cuZWpzP2Q2N2EiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9jb21tZW50L2xpc3QuZWpzIiwid2VicGFjazovLy8uL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanM/YzUzNyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3Jldmlldy9ib2R5LmVqcz9jZWZiIiwid2VicGFjazovLy8uL3NyYy90cGwvcmV2aWV3L21haW4uZWpzPzlkMmUiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXZpZXcvbGlzdC5lanM/NzljOCIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9sYWJlbC9vbmUuZWpzPzM1N2YiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsUTs7Ozs7O0FDMURBO0FBQ0E7QUFDQSwyRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDhDO0FBQ0EsNkNBQTRDO0FBQzVDLHlDOztBQUVBLDJFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1QztBQUNBLGM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTztBQUNBLGlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0EsMEI7QUFDQSwwRjtBQUNBLE07QUFDQSwwQjtBQUNBLDJJO0FBQ0EsTTtBQUNBLHFCO0FBQ0EsK0M7QUFDQSxxSDtBQUNBLFU7QUFDQSxNO0FBQ0EsZ0I7QUFDQSxFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2pIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7OztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsZUFBZTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQSx5Qjs7Ozs7O0FDOUhBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0Isa0NBQWlDO0FBQ2pDLDZDQUE0QztBQUM1QztBQUNBO0FBQ0Esc0JBQXFCOztBQUVyQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxvQjtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsSTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILG9DO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSxtQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTs7QUFFQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUM7O0FBRUE7QUFDQSxtQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNILEdBQUU7QUFDRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHLEU7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQjs7Ozs7O0FDNVRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0Esa0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRztBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7OztBQUdGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEdBQUUsRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBLDBCOzs7Ozs7QUMxUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxvQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7QUFDRjs7QUFFQTtBQUNBLDBCOzs7Ozs7QUN0UEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCO0FBQ0E7O0FBRUE7O0FBRUEscUI7Ozs7OztBQzNHQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osc0I7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7O0FBR0EseUI7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQjtBQUNBO0FBQ0EsRztBQUNBLHdEO0FBQ0EsWTtBQUNBLEc7QUFDQSxpQztBQUNBLDJCO0FBQ0EscUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQSxHO0FBQ0EsYztBQUNBLEc7QUFDQSxhO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw4QjtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUI7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSw4QjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUksRTs7Ozs7O0FDL1FKO0FBQ0E7QUFDQTs7QUFFQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFO0FBQ0Y7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsaUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCLGdCQUFnQjtBQUMxQztBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0EsMEJBQXlCLGNBQWM7QUFDdkM7QUFDQSxvQ0FBbUMsSUFBSTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBLHdCQUF1QixVQUFVO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE87QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLEU7Ozs7Ozs7O0FDbExBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0NBQStCO0FBQy9COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esc0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsaUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsdUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esb0Q7QUFDQTs7QUFFQSxxQjs7Ozs7Ozs7O0FDelRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCOzs7Ozs7QUNoQkE7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0YsNEI7OztBQUdBLG9COztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0EsRztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBLEc7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGLDRCOztBQUVBO0FBQ0E7QUFDQSxzQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSwrQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQSwrQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBK0IsSUFBSTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBZ0MsSUFBSTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsRTs7Ozs7O0FDMU5BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsa0JBQWtCO0FBQzdCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxrQkFBa0I7QUFDN0IsWUFBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOENBQTZDLFFBQVE7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFXLGtCQUFrQjtBQUM3QixZQUFXLFFBQVE7QUFDbkIsWUFBVyxVQUFVO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFrQztBQUNsQztBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxFQUFDOztBQUVE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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXdDLCtCQUErQjtBQUN2RTs7QUFFQTtBQUNBO0FBQ0EsOEhBQTZIOztBQUU3SDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQsUUFBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixhQUFhLEVBQUU7QUFDekM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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dUJBQXVCLHdCQUF3QjtBQUMzSTtBQUNBO0FBQ0E7QUFDQSxvREFBbUQsSUFBSSxLQUFLLHlCQUF5Qix3SEFBd0g7QUFDN007QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLGlEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRTs7Ozs7O0FDckNBO0FBQ0E7QUFDQSxpREFBZ0Qsc0JBQXNCLHNCQUFzQix1QkFBdUIsd0JBQXdCO0FBQzNJO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxJQUFJLEtBQUsseUJBQXlCLDZKQUE2SjtBQUNsUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0EsaURBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwianMvXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYjI3MTU1YzIzOTA0ZTk1ODY4ZTZcbiAqKi8iLCJyZXF1aXJlKCcuL2NvbW1vbi9nbG9iYWwnKTtcclxudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxyXG5cdGFydGljbGUgPSByZXF1aXJlKCcuL2FydGljbGUvaW5mbycpLFxyXG5cdGFydGljbGVwb3N0ID0gcmVxdWlyZSgnLi9hcnRpY2xlL3Bvc3QnKSxcclxuXHRsaXN0ID0gcmVxdWlyZSgnLi9jb21tZW50L2xpc3QnKSxcclxuXHRwb3N0ID0gcmVxdWlyZSgnLi9jb21tZW50L3Bvc3QnKSxcclxuXHRtc2cgPSByZXF1aXJlKCcuL2NvbW1vbi9tc2cnKSxcclxuXHRub3RpZnkgPSByZXF1aXJlKCcuL25vdGlmeS9ub3RpZnknKSxcclxuXHRyZXZpZXcgPSByZXF1aXJlKCcuL3Jlc291cmNlL3JldmlldycpLFxyXG5cdGxhYmVsID0gcmVxdWlyZSgnLi9sYWJlbC9sYWJlbCcpO1xyXG52YXIgU3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpLFxyXG5cdHN0cmlrZXIgPSB3aW5kb3cuc3RyaWtlcjtcdFxyXG5cclxudmFyIG5vd0FydElkID0gc3RyaWtlci51dGlsLmdldFBhcmFtZXRlcignaWQnKSxcclxuXHRub3dTdWJqZWN0SWQgPSBzdHJpa2VyLnV0aWwuZ2V0UGFyYW1ldGVyKCdzaWQnKTtcclxuXHJcblxyXG5mdW5jdGlvbiB1c2VyTG9hZFN1YihlLGQpe1xyXG5cdG5ldyBub3RpZnkubm90aWZ5KCk7XHJcblx0IHZhciBjcG9zdCA9IG5ldyBwb3N0LnBvc3Qobm93QXJ0SWQsbm93U3ViamVjdElkKTsgXHJcblx0IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0ID0gY3Bvc3Q7XHJcblxyXG4gXHQgdmFyIGNsaXN0ID0gbmV3IGxpc3QubGlzdChub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG4gXHQgd2luZG93LnN0cmlrZXIuY29tbWVudGxpc3QgPSBjbGlzdDtcclxuXHJcbiBcdCB2YXIgYXBvc3QgPSBuZXcgYXJ0aWNsZXBvc3QucG9zdChub3dBcnRJZCxub3dTdWJqZWN0SWQpO1xyXG5cdCBcclxuXHQgdmFyIGFydEluZm8gPSBuZXcgYXJ0aWNsZS5pbmZvKG5vd0FydElkLG5vd1N1YmplY3RJZCk7XHJcblx0IGNwb3N0LmJpbmRGdW4oY2xpc3QpO1xyXG5cdCBjbGlzdC5iaW5kKHtcclxuXHQgXHRpbmZvOmFydEluZm9cclxuXHQgfSk7XHJcblxyXG5cdCBhcnRJbmZvLmJpbmQoe1xyXG5cdCBcdHBvc3Q6IGFwb3N0XHJcblx0IH0pXHJcbn1cclxuXHJcbnZhciBoYW5kbGVycyA9IHtcclxuXHQndXNlckxvYWRTdWInIDogdXNlckxvYWRTdWJcclxufVxyXG5cclxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcclxuXHRTdHJpa2VyLmJpbmQoaSxoYW5kbGVyc1tpXSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuXHJcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcclxuXHRzdHJpa2VyLnVzZXIgPSB1c2VyO1xyXG5cdFxyXG5cdHdpbmRvdy5zdHJpa2VyLm1zZyA9IG5ldyBtc2cubWVzc2FnZSgpO1xyXG5cdFxyXG5cdHVzZXIuaW5pdCgpO1xyXG5cclxuXHQvL2JpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuaW5pdCgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbWVudC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gM1xuICoqLyIsIi8vIGtlZXAgaXQgaWYgdXNpbmcgdXJsIG1kNSByZXYgcmVwbGFjZW1lbnQgaW4gamF2YXNjcmlwdFxuY29uc29sZS5sb2coJ2dsb2JhbCBpcyBsb2FkJyk7XG52YXIgbXNpZSA9IC9tc2llLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7IFxuaWYgKCBtc2llICl7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKCdpZScpO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHN0cil7XG5cdHZhciBkYXRlID0gbmV3IERhdGUoc3RyKTtcblxuICAgIHZhciB5eXl5ID0gZGF0ZS5nZXRGdWxsWWVhcigpLnRvU3RyaW5nKCk7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgdmFyIG1tID0gKGRhdGUuZ2V0TW9udGgoKSsxKS50b1N0cmluZygpOyAvLyBnZXRNb250aCgpIGlzIHplcm8tYmFzZWQgICAgICAgICBcbiAgICB2YXIgZGQgID0gZGF0ZS5nZXREYXRlKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBcbiAgICByZXR1cm4geXl5eSArICctJyArIChtbVsxXT9tbTpcIjBcIittbVswXSkgKyAnLScgKyAoZGRbMV0/ZGQ6XCIwXCIrZGRbMF0pO1x0XG59XG5cbmZ1bmN0aW9uIGdldE5vd1RpbWUoc3RyKXtcbiAgICB2YXIgbm93ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgdmFyIGF0aW1lID0gbmV3IERhdGUoc3RyKS5nZXRUaW1lKCk7XG5cbiAgICB2YXIgYyA9IE1hdGguY2VpbCgobm93IC0gYXRpbWUpLzEwMDApO1xuICAgIGlmKGM8NjApe1xuICAgICAgICByZXR1cm4gJzHliIbpkp/ku6XlhoUnO1xuICAgIH1lbHNlIGlmKGM8MzYwMCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8zNjAwKSsn5YiG6ZKf5YmNJztcbiAgICB9ZWxzZSBpZihjPDM2MDAqMjQpe1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKGMvKDM2MDAqMjQpKSsn5aSp5YmNJztcbiAgICB9ZWxzZXtcbiAgICAgICAgcmV0dXJuIGZvcm1hdFRpbWUoc3RyKTtcbiAgICB9XG5cbn1cblxudmFyIGdldFBhcmFtZXRlciA9IGZ1bmN0aW9uKG5hbWUsc3RyKXtcbiAgICBzdHIgPSBzdHIgfHwgbG9jYXRpb24uaHJlZjtcbiAgICB2YXIgciA9IG5ldyBSZWdFeHAoXCIoXFxcXD98I3wmKVwiICsgbmFtZSArIFwiPShbXiYjXSopKCZ8I3wkKVwiKSwgbSA9IHN0ci5tYXRjaChyKTtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCFtID8gXCJcIiA6IG1bMl0pO1x0XHRcbn1cblxuLyoqXG4gKiBAZGVzY3JpcHRpb24g5LiJ5Liq5a2X5q+N566X5LiA5Liq5a2XXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0ciDovpPlhaXlrZfnrKbkuLJcbiAqIEByZXR1cm4ge1N0cmluZ30gW2xlbj0yXSDlrZfmr43mlbAo5aSa5bCR5Liq5a2X5q+N566X5LiA5Liq5a2XKVxuICogQGV4YW1wbGVcbiAqICAgICAgZ2V0TGVuKCdhYmPkuIDkuozkuIknKTtcbiAqL1xudmFyIGdldExlbiA9IGZ1bmN0aW9uKHN0cixsZW4pe1xuICAgIC8v5q2j5YiZ5Y+W5Yiw5Lit5paH55qE5Liq5pWw77yM54S25ZCObGVuKmNvdW50K+WOn+adpeeahOmVv+W6puOAguS4jeeUqHJlcGxhY2VcbiAgICB2YXIgZmFjdG9yID0gbGVuIHx8IDM7XG4gICAgc3RyICs9ICcnO1xuICAgIHZhciB6aENoYXIgPSBzdHIubWF0Y2goL1teXFx4MDAtXFx4ZmZdL2cpIHx8IFtdO1xuICAgIHZhciBsZXR0ZXIgPSBzdHIucmVwbGFjZSgvW15cXHgwMC1cXHhmZl0vZyAsICcnKTtcbiAgICByZXR1cm4gcGFyc2VJbnQoemhDaGFyLmxlbmd0aCArIChsZXR0ZXIubGVuZ3RoIC8gZmFjdG9yKSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHBhcmFtIHtudW1iZXJ9IG1heCDmgLvplb/luqZcbiAqIEByZXR1cm4ge251bWJlcn0gW2xlbj0yXSDplb/luqZcbiAqIEBleGFtcGxlXG4gKiAgICAgIGNoYW5nZUxlbignYWJj5LiA5LqM5LiJJywxMCk7XG4gKi9cbnZhciBjaGFuZ2VMZW4gPSBmdW5jdGlvbihzdHIsbWF4KXtcblx0dmFyIG1heCA9IG1heCB8fCAxMDtcblx0dmFyIGxlbiA9IGdldExlbihzdHIpO1xuXHR2YXIgcmV0ID0gbWF4IC0gbGVuO1xuXHRyZXR1cm4gcmV0Pj0wP3JldDowO1xufVxuXG5EYXRlLnByb3RvdHlwZS5wYXR0ZXJuPWZ1bmN0aW9uKGZtdCkgeyAgICAgICAgIFxuICAgIHZhciBvID0geyAgICAgICAgIFxuICAgIFwiTStcIiA6IHRoaXMuZ2V0TW9udGgoKSsxLCAvL+aciOS7vSAgICAgICAgIFxuICAgIFwiZCtcIiA6IHRoaXMuZ2V0RGF0ZSgpLCAvL+aXpSAgICAgICAgIFxuICAgIFwiaCtcIiA6IHRoaXMuZ2V0SG91cnMoKSUxMiA9PSAwID8gMTIgOiB0aGlzLmdldEhvdXJzKCklMTIsIC8v5bCP5pe2ICAgICAgICAgXG4gICAgXCJIK1wiIDogdGhpcy5nZXRIb3VycygpLCAvL+Wwj+aXtiAgICAgICAgIFxuICAgIFwibStcIiA6IHRoaXMuZ2V0TWludXRlcygpLCAvL+WIhiAgICAgICAgIFxuICAgIFwicytcIiA6IHRoaXMuZ2V0U2Vjb25kcygpLCAvL+enkiAgICAgICAgIFxuICAgIFwicStcIiA6IE1hdGguZmxvb3IoKHRoaXMuZ2V0TW9udGgoKSszKS8zKSwgLy/lraPluqYgICAgICAgICBcbiAgICBcIlNcIiA6IHRoaXMuZ2V0TWlsbGlzZWNvbmRzKCkgLy/mr6vnp5IgICAgICAgICBcbiAgICB9OyAgICAgICAgIFxuICAgIHZhciB3ZWVrID0geyAgICAgICAgIFxuICAgIFwiMFwiIDogXCIvdTY1ZTVcIiwgICAgICAgICBcbiAgICBcIjFcIiA6IFwiL3U0ZTAwXCIsICAgICAgICAgXG4gICAgXCIyXCIgOiBcIi91NGU4Y1wiLCAgICAgICAgIFxuICAgIFwiM1wiIDogXCIvdTRlMDlcIiwgICAgICAgICBcbiAgICBcIjRcIiA6IFwiL3U1NmRiXCIsICAgICAgICAgXG4gICAgXCI1XCIgOiBcIi91NGU5NFwiLCAgICAgICAgIFxuICAgIFwiNlwiIDogXCIvdTUxNmRcIiAgICAgICAgXG4gICAgfTsgICAgICAgICBcbiAgICBpZigvKHkrKS8udGVzdChmbXQpKXsgICAgICAgICBcbiAgICAgICAgZm10PWZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKHRoaXMuZ2V0RnVsbFllYXIoKStcIlwiKS5zdWJzdHIoNCAtIFJlZ0V4cC4kMS5sZW5ndGgpKTsgICAgICAgICBcbiAgICB9ICAgICAgICAgXG4gICAgaWYoLyhFKykvLnRlc3QoZm10KSl7ICAgICAgICAgXG4gICAgICAgIGZtdD1mbXQucmVwbGFjZShSZWdFeHAuJDEsICgoUmVnRXhwLiQxLmxlbmd0aD4xKSA/IChSZWdFeHAuJDEubGVuZ3RoPjIgPyBcIi91NjYxZi91NjcxZlwiIDogXCIvdTU0NjhcIikgOiBcIlwiKSt3ZWVrW3RoaXMuZ2V0RGF5KCkrXCJcIl0pOyAgICAgICAgIFxuICAgIH0gICAgICAgICBcbiAgICBmb3IodmFyIGsgaW4gbyl7ICAgICAgICAgXG4gICAgICAgIGlmKG5ldyBSZWdFeHAoXCIoXCIrIGsgK1wiKVwiKS50ZXN0KGZtdCkpeyAgICAgICAgIFxuICAgICAgICAgICAgZm10ID0gZm10LnJlcGxhY2UoUmVnRXhwLiQxLCAoUmVnRXhwLiQxLmxlbmd0aD09MSkgPyAob1trXSkgOiAoKFwiMDBcIisgb1trXSkuc3Vic3RyKChcIlwiKyBvW2tdKS5sZW5ndGgpKSk7ICAgICAgICAgXG4gICAgICAgIH0gICAgICAgICBcbiAgICB9ICAgICAgICAgXG4gICAgcmV0dXJuIGZtdDsgICAgICAgICBcbn0gICAgICAgXG5cbndpbmRvdy5zdHJpa2VyLnV0aWwgPSB7XG5cdGZvcm1hdFRpbWUgOiBmb3JtYXRUaW1lLFxuXHRnZXRQYXJhbWV0ZXIgOiBnZXRQYXJhbWV0ZXIsXG4gICAgZ2V0Tm93VGltZSA6IGdldE5vd1RpbWUsXG5cdGdldExlbiA6IGdldExlbixcblx0Y2hhbmdlTGVuIDogY2hhbmdlTGVuXG59XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2dsb2JhbC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMCAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykudXNlcixcclxuXHRsb2dvdXQgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubG9nb3V0LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS51c2VyLFxyXG5cdHVzZXJNYW5hZ2UgPSByZXF1aXJlKCcuL21hbmFnZScpLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdG5hdiA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL3VzZXJfbmF2LmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSxcclxuXHRvbmVtYW5hZ2UgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9vbmVtYW5hZ2UuZWpzJylcclxufVxyXG5cclxudmFyIFVzZXIgPSB7fSxcclxuXHRfdGhpcyA9IFVzZXI7XHJcbm1vZHVsZS5leHBvcnRzID0gVXNlcjtcclxuXHJcbi8v5a+55aSW5o+Q5L6b55qE5o6l5Y+jXHJcbndpbmRvdy5zdHJpa2VyLnVzZXIgPSBVc2VyO1xyXG5cclxuLy/nrqHnkIblkZjorr7nva7mmL7npLrnrYnnrYlcclxuVXNlci5tYW5hZ2UgPSB1c2VyTWFuYWdlLm1hbmFnZTtcclxuXHJcbnZhciBzRG9tLHNJbnB1dDtcclxuXHJcblVzZXIuZ2V0TXlJbmZvID0gZnVuY3Rpb24oY2Ipe1xyXG5cdGNnaS5pbmZvKGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubXlJbmZvID0gcmVzLmRhdGE7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5uYXYocmVzLmRhdGEpO1xyXG5cdFx0XHQkKFwiI3VzZXJOYXZcIikuaHRtbChodG1sKTtcclxuXHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkU3ViJyxyZXMuY29kZSk7XHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlckhhbmRsZXIoJ3VzZXJMb2FkQXJ0JyxyZXMuY29kZSk7XHJcblx0XHRcdGNvbnNvbGUubG9nKCd1c2VybG9hZCcpO1xyXG5cdFx0XHRiaW5kQWN0aW9uKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnZhciBteUFjdCA9IHtcclxuXHQnbG9nb3V0JyA6IGZ1bmN0aW9uKCl7XHJcblx0XHRsb2dvdXQoZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9sb2dpbi5odG1sJztcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fSxcclxuXHQnc2VhcmNoJyA6IGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0aWYoIXNEb20pe1xyXG5cdFx0XHQkKCdib2R5JykuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiZml4LWRvbVwiPjxkaXYgaWQ9XCJzZWFyY2hCbG9ja0RvbVwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwi6K+36L6T5YWl5YWz6ZSu5a2XXCIgLz48YnV0dG9uIGRhdGEtYWN0aW9uPVwic3RhcnRzZWFyY2hcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPuaQnOe0ojwvYnV0dG9uPjwvZGl2PjwvZGl2PicpO1xyXG5cdFx0XHRzRG9tID0gJChcIiNzZWFyY2hCbG9ja0RvbVwiKTtcclxuXHRcdFx0c0lucHV0ID0gc0RvbS5maW5kKCdpbnB1dCcpO1xyXG5cdFx0XHRiaW5kU2RvbSgpO1xyXG5cdFx0XHRcclxuXHRcdH1cclxuXHRcdHNEb20uc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGJpbmRTZG9tID0gZnVuY3Rpb24oKXtcclxuXHRzRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbil7XHJcblx0XHRcdHZhciBrZXkgPSBzSW5wdXQudmFsKCk7XHJcblx0XHRcdGlmKGtleSAhPT0gJycpe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3RhcnRTZWFyY2gnLGtleSk7XHJcblx0XHRcdFx0c0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0pO1xyXG5cclxuXHRzSW5wdXQuYmluZCgna2V5dXAnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0aWYoZS5rZXlDb2RlID09PSAxMyl7XHJcblx0XHRcdHZhciBrZXkgPSBzSW5wdXQudmFsKCk7XHJcblx0XHRcdGlmKGtleSAhPT0gJycpe1xyXG5cdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3RhcnRTZWFyY2gnLGtleSk7XHJcblx0XHRcdFx0c0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdFxyXG5cdH0pO1xyXG59XHJcblxyXG52YXIgYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0JChcIiN1c2VyTmF2XCIpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbil7XHJcblx0XHRcdGlmKG15QWN0W2FjdGlvbl0pe1xyXG5cdFx0XHRcdG15QWN0W2FjdGlvbl0oKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcblVzZXIuZ2V0VXNlckxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGRhdGEubGlzdCA9IHJlcy5kYXRhO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5Vc2VyLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cdF90aGlzLmdldE15SW5mbygpO1xyXG5cdF90aGlzLmdldFVzZXJMaXN0KCk7XHJcblx0dXNlck1hbmFnZS5pbml0KGNnaSx0bXBsKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvdXNlci91c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKTtcclxudmFyIHRtcGwgPSB7XHJcblx0aW5mbyA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL29uZS5lanMnKVxyXG59O1xyXG5cclxudmFyIEluZm8gPSB7fVxyXG5tb2R1bGUuZXhwb3J0cyA9IEluZm87XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgYXJ0aWNsZUluZm8gPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cclxuXHR0aGlzLmFydElkID0gaWQ7XHJcblx0dGhpcy5zdWJJZCA9IHNpZDtcclxuXHR0aGlzLmRvbSA9ICQoJyNhcnRpY2xlSW5mbycpO1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5jTGlzdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRsaXN0O1xyXG5cdHRoaXMuY3Bvc3QgPSB3aW5kb3cuc3RyaWtlci5jb21tZW50cG9zdDtcclxuXHJcblx0dGhpcy5teSA9IGRhdGEudXNlci5teUluZm87XHJcblxyXG5cdHRoaXMuZ2V0RGF0ZSgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUuZ2V0RGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuaW5mbyh7aWQ6IHRoaXMuYXJ0SWR9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHJlcy5kYXRhLnNpZCA9IF90aGlzLnN1YklkO1xyXG5cdFx0XHRyZXMuZGF0YS5teSA9IF90aGlzLm15O1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaW5mbyhyZXMuZGF0YSk7XHJcblx0XHRcdFxyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHRfdGhpcy5jRG9tID0gJChcIiNjb21tZW50Q291bnRcIik7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKXtcclxuXHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZUVkaXRlZCcsZnVuY3Rpb24oZSxkKXtcclxuXHRcdGQuc2lkID0gX3RoaXMuc3ViSWQ7XHJcblx0XHRfdGhpcy5kYXRhID0gZDtcclxuXHRcdGQubXkgPSBfdGhpcy5teTtcclxuXHRcdHZhciBodG1sID0gdG1wbC5pbmZvKGQpO1xyXG5cdFx0X3RoaXMuZG9tLmh0bWwoaHRtbCk7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGF0dXMgPSB0YXJnZXQuZGF0YSgnc3RhdHVzJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRhcnRpY2xlSWQgOiBpZCxcclxuXHRcdFx0aXNUb3AgOiAhc3RhdHVzXHJcblx0XHR9XHJcblx0XHRjZ2kuc2V0dG9wKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHR2YXIgdGV4dCA9IHBhcmFtLmlzVG9wPyflj5bmtojnva7pobYnOifnva7pobYnLFxyXG5cdFx0XHRcdFx0c3QgPSBwYXJhbS5zdGF0dXM/MDoxMDA7XHJcblx0XHRcdFx0dGFyZ2V0LnRleHQodGV4dCkuZGF0YSgnc3RhdHVzJyxzdCk7XHJcblx0XHRcdH1cclxuXHRcdH0pXHRcdFxyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLnNldHVwID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHRjb25zb2xlLmxvZyhpZCwnc2V0dXAnKTtcclxufVxyXG5cclxuYXJ0aWNsZUluZm8ucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbigpe1xyXG5cdHN0cmlrZXIudHJpZ2dlcignZWRpdEFydGljbGUnLHRoaXMuZGF0YSk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbigpe1xyXG5cdGNvbnNvbGUubG9nKCdkZWxldGUnKTtcdFxyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXRpbWUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuY0xpc3Qub3JkZXJieWNyZWF0ZSgpO1xyXG59XHJcblxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUub3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5jTGlzdC5vcmRlcmJ5dXBkYXRlKCk7XHJcbn1cclxuXHJcbmFydGljbGVJbmZvLnByb3RvdHlwZS51cGRhdGVDb3VudCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5kYXRhLmNvbW1lbnRDb3VudCsrO1xyXG5cdHRoaXMuY0RvbS50ZXh0KHRoaXMuZGF0YS5jb21tZW50Q291bnQpO1xyXG59XHJcblxyXG4vL+mihOiniOS4u+mimOebuOWFs+i1hOa6kFxyXG5hcnRpY2xlSW5mby5wcm90b3R5cGUucmV2aWV3ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdyZXZpZXcnLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMuZGF0YS5yZXNvdXJjZUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG59O1xyXG5cclxuSW5mby5pbmZvID0gYXJ0aWNsZUluZm87XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxuXHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5mdW5jdGlvbiByZXNldEZyb20odGFyZ2V0KXtcclxuXHR0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgnJyk7XHJcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCcucG9wLXJlcycpLmh0bWwoJycpLmhpZGUoKTtcclxufTtcclxuXHJcbmFQb3N0LmluaXQgPSBmdW5jdGlvbihpZCxtb2R1bGUsdG1wKXtcclxuXHRub3dTdWJJZCA9IGlkO1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHRuZXcgYVBvc3QucG9zdCgpO1xyXG59XHJcblxyXG52YXIgcG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tID0gJChcIiNwb3N0QXJ0aWNsZVwiKTsgLy/lupXpg6jlj5HooajmoYZcclxuXHR0aGlzLmNEb20gPSAkKFwiI2NyZWF0ZUFydGljbGVcIik7IC8v5by55Ye65Y+R6KGo5qGGXHJcblx0dGhpcy5wcmVzRG9tID0gdGhpcy5wRG9tLmZpbmQoJy5wb3N0LXJlcycpOy8vLyA9ICQoXCJcIilcclxuXHR0aGlzLmNyZXNEb20gPSB0aGlzLmNEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHR0aGlzLmN0aXREb20gPSB0aGlzLmNEb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XHJcblx0dGhpcy5tb2RlbCA9ICdwb3N0JzsvL3Bvc3Qg5bqV6YOoIHBvcCDlvLnlh7rnqpflj6NcclxuXHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmNEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoX3RoaXMuaXNFZGl0KXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfkv67mlLnluJblrZAnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+aWsOW7uuW4luWtkCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLmNEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLmZvY3VzKCk7XHJcblx0XHR9LDEwMDApXHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3BvcCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY0RvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHRcdFxyXG5cdFx0X3RoaXMubW9kZWwgPSAncG9zdCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24oKXtcclxuXHJcbn07XHJcblxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5qC55o2uZG9t6I635Y+W55u45YWz55qE5Y+C5pWwLlxyXG5wb3N0LnByb3RvdHlwZS5nZXRQYXJhbSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG5cdFx0Y29udGVudCA9IHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCk7XHJcblxyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHRpdGxlIDogbmFtZSxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXHJcblx0XHRsYWJlbHMgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyYW07XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnJlc01hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0aWYodGhpcy5jcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRpZih0aGlzLnByZXNEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5wcmVzRG9tLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVx0XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oZCl7XHJcblx0dGhpcy5pc0VkaXQgPSB0cnVlO1xyXG5cdHRoaXMuZGF0YSA9IGQ7XHJcblx0dGhpcy5jRG9tLm1vZGFsKCdzaG93Jyk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoZC50aXRsZSk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoZC5jb250ZW50KTtcclxuXHJcblx0aWYoZC5yZXNvdXJjZUxpc3QubGVuZ3RoKXtcclxuXHRcdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdFx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHRcdGZvcih2YXIgaSBpbiBkLnJlc291cmNlTGlzdCl7XHJcblx0XHRcdHZhciBpdGVtID0gZC5yZXNvdXJjZUxpc3RbaV07XHJcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHR9XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZUxpc3RcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHRcclxuXHR9XHJcbn1cclxuXHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1x0XHJcblx0Ly/otYTmupDkuIrkvKDlrozmiJDnmoTpgJrnn6VcclxuXHJcblx0c3RyaWtlci5iaW5kKCdlZGl0QXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmVkaXQoZCk7XHJcblx0fSk7XHJcblxyXG5cdHN0cmlrZXIuYmluZCgndXBsb2FkQXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHRcdGlmKHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93KXtcclxuXHRcdFx0JChzdHJpa2VyKS50cmlnZ2VyKCd1cGxvYWRGaWxlJyxkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5wcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHRoaXMucERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHQkKFwiI2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKF90aGlzLmZpbGV1cGxvYWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHRcdFxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMucERvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHJcblxyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcdFxyXG5cclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1x0XHJcblx0Y29uc29sZS5sb2coMjMzMzMzKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHB0ID0gdGhpcy50YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XHJcblx0Ly9jb25zb2xlLmxvZyhwVGFyZ2V0KTtcclxuXHR2YXIgcFRhcmdldCA9ICQocHQpO1xyXG5cclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0gdGhpcy5nZXRQYXJhbShwVGFyZ2V0KTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRpZihwYXJhbS50aXRsZSA9PT0gJycgfHwgcGFyYW0uY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLnN1YmplY3RJZCA9IHRoaXMuZGF0YS5zdWJqZWN0X2lkO1xyXG5cdFx0cGFyYW0uYXJ0aWNsZUlkID0gdGhpcy5kYXRhLmlkO1xyXG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRyZXNldEZyb20ocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ2FydGljbGVFZGl0ZWQnLHJlcy5kYXRhKTtcclxuXHRcdFx0XHQvL3N0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1lbHNle1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRyZXNldEZyb20ocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY0RvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCduZXdhcnRpY2xlJyxyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5hUG9zdC5yZXNldCA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHRhcmdldC5kYXRhKCd0YXJnZXQnKSk7XHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRyZXNldEZyb20ocFRhcmdldCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QgPSBwb3N0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuY29tbWVudDtcclxudmFyIGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKTtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9jb21tZW50L2xpc3QuZWpzJylcclxufTtcclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcbnZhciBDb21tZW50ID0ge31cclxuXHJcbnZhciBsaXN0ID0gZnVuY3Rpb24oaWQsc2lkKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjY29tbWVudExpc3RcIik7XHJcblxyXG5cdHRoaXMuYXJ0SWQgPSBpZDtcclxuXHR0aGlzLnN1YklkID0gc2lkO1xyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSdcclxuXHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5saW1pdCA9IDM7XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMucG9zdCA9IHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRwb3N0O1xyXG5cdHRoaXMubXNnID0gd2luZG93LnN0cmlrZXIubXNnO1xyXG5cclxuXHR0aGlzLm15ID0gZGF0YS51c2VyLm15SW5mbztcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLnJkYXRhID0ge307XHJcblx0Ly8gYXJ0aWNsZUxpc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0Ly8gYXJ0aWNsZVBvc3QuaW5pdChpZCxjZ2ksdG1wbCk7XHJcblx0dGhpcy50YXJnZXQ7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnNhdmVEYXRhID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0Zm9yKHZhciBpIGluIGRhdGEubGlzdCl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubGlzdFtpXTtcclxuXHRcdHRoaXMubWFwW2l0ZW0uaWRdID0gaXRlbTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdGlmKGRhdGEpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogW2RhdGFdLFxyXG5cdFx0XHRteSA6IHRoaXMubXlcclxuXHRcdH0pO1x0XHJcblx0XHQkKFwiLmNvbW1lbnRcIitkYXRhLmlkKS5yZXBsYWNlV2l0aChodG1sKTtcclxuXHR9XHJcblx0XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmdldERhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9O1xyXG5cdGlmKHRoaXMua2V5KXtcclxuXHRcdHBhcmFtLmtleXdvcmQgPSB0aGlzLmtleTtcclxuXHR9XHJcblxyXG5cdGNnaS5zZWFyY2gocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5zdGFydCArPSBfdGhpcy5saW1pdDtcclxuXHRcdFx0X3RoaXMuc2F2ZURhdGEocmVzLmRhdGEpO1xyXG5cdFx0XHRyZXMuZGF0YS5teSA9IF90aGlzLm15O1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHRcclxuXHRpZih0aGlzLm1hcFtpZF0pe1xyXG5cdFx0dGhpcy5wb3N0LmVkaXQodGhpcy5tYXBbaWRdKTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLm9yZGVyYnljcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMub3JkZXIgPT09ICdjcmVhdGVUaW1lJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMub3JkZXIgPSAnY3JlYXRlVGltZSc7XHJcblx0dGhpcy5kb20uaHRtbCgnJyk7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5nZXREYXRlKCk7XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLm9yZGVyYnl1cGRhdGUgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMub3JkZXIgPT09ICd1cGRhdGVUaW1lJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVx0XHJcblx0dGhpcy5vcmRlciA9ICd1cGRhdGVUaW1lJztcclxuXHR0aGlzLmRvbS5odG1sKCcnKTtcclxuXHR0aGlzLnN0YXJ0ID0gMDtcclxuXHR0aGlzLmdldERhdGUoKTtcdFxyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5sb2FkTW9yZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR0aGlzLmdldERhdGUoKTtcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdGNuYW1lID0gdGhpcy50YXJnZXQuZGF0YSgnY25hbWUnKTtcclxuXHJcblx0dGhpcy5wb3N0LnJlcGxheShpZCxjbmFtZSk7XHJcbn1cdFxyXG5cclxubGlzdC5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0Y29tbWVudElkIDogaWQsXHJcblx0XHRcdGlzU3RhciA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfotZ4nOiflt7LotZ4nO1xyXG5cdFx0Y2dpLnN0YXIocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzU3Rhcik7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0Y29tbWVudElkIDogaWQsXHJcblx0XHRcdGlzQ29sbGVjdCA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfmlLbol48nOiflj5bmtojmlLbol48nO1xyXG5cdFx0Y2dpLmNvbGxlY3QocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzQ29sbGVjdCk7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmRlbGV0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLm1zZy5jb25maXJtKCfnoa7lrpropoHliKDpmaTor6Xlm57lpI0/JyxudWxsLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHRjb21tZW50SWQgOiBpZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRjZ2kuZGVsZXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0JChcIi5jb21tZW50XCIraWQpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmxpc3QucHJvdG90eXBlLmFwcGVuZCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBodG1sID0gdG1wbC5saXN0KHtcclxuXHRcdGxpc3QgOiBbZGF0YV0sXHJcblx0XHRteSA6IHRoaXMubXlcclxuXHR9KTtcclxuXHR0aGlzLmFydEluZm8udXBkYXRlQ291bnQoKTtcclxuXHR0aGlzLmRvbS5wcmVwZW5kKGh0bWwpO1xyXG59XHJcblxyXG5saXN0LnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24ob2JqKXtcclxuXHR0aGlzLmFydEluZm8gPSBvYmouaW5mbztcclxufVxyXG5cclxubGlzdC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cclxuXHRzdHJpa2VyLmJpbmQoJ3N0YXJ0U2VhcmNoJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMua2V5ID0gZDtcclxuXHRcdF90aGlzLnN0YXJ0ID0gMDtcclxuXHJcblx0XHRfdGhpcy5kb20uaHRtbCgnJyk7XHJcblx0XHRfdGhpcy5nZXREYXRlKCk7XHJcblxyXG5cdH0pO1x0XHRcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsRG9tLnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbliLDlupXkuoZcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcpO1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkTW9yZSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcdFx0XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmxpc3QucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBpZCA9IHRhcmdldC5kYXRhKCdwaWQnKSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLm1hcFtwaWRdLnJlc291cmNlXHJcblx0XHR9KVxyXG5cdH1cclxufTtcclxuXHJcbkNvbW1lbnQubGlzdCA9IGxpc3Q7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IENvbW1lbnQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tZW50L2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJ2YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmNvbW1lbnQ7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIENvbW1lbnQgPSB7fVxyXG5cclxudmFyIHBvc3QgPSBmdW5jdGlvbihpZCxzaWQpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNwb3N0QXJlYVwiKTtcclxuXHR0aGlzLnBvcERvbSA9ICQoXCIjY3JlYXRlQ29tbWVudFwiKTtcclxuXHR0aGlzLmNvbnRlbnREb20gPSB0aGlzLmRvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tID0gdGhpcy5wb3BEb20uZmluZCgndGV4dGFyZWFbbmFtZT1jb250ZW50XScpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20gPSB0aGlzLnBvcERvbS5maW5kKCdpbnB1dFtuYW1lPW5hbWVdJyk7XHJcblx0dGhpcy5jcmVzRG9tID0gdGhpcy5wb3BEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHR0aGlzLmN0aXREb20gPSB0aGlzLnBvcERvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHJcblx0dGhpcy5hcnRJZCA9IGlkO1xyXG5cdHRoaXMuc3ViSWQgPSBzaWQ7XHRcclxuXHJcblx0dGhpcy5yZXNMaXN0ID0gW107XHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHQvLyBhcnRpY2xlTGlzdC5pbml0KGlkLGNnaSx0bXBsKTtcclxuXHQvLyBhcnRpY2xlUG9zdC5pbml0KGlkLGNnaSx0bXBsKTtcclxufVxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihvYmope1xyXG5cdHRoaXMuYXJ0aWNsZUxpc3QgPSBvYmoubGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUuY2hhbmdlQXJ0aWNsZSA9IGZ1bmN0aW9uKGlkKXtcclxuXHR0aGlzLmFydElkID0gaWQ7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmJpbmRGdW4gPSBmdW5jdGlvbihsaXN0KXtcclxuXHR0aGlzLmNMaXN0ID0gbGlzdDtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVwbGF5ID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dGhpcy5jb250ZW50RG9tLnZhbCgn5Zue5aSNICcrbmFtZSsnOicpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBjb250ZW50ID0gdGhpcy5jb250ZW50RG9tLnZhbCgpO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0aWYoY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViSWQsXHJcblx0XHRhcnRpY2xlSWQgOiB0aGlzLmFydElkLFxyXG5cdFx0Y29udGVudCA6IGNvbnRlbnQsXHJcblx0XHR0aXRsZSA6ICcnLFxyXG5cdFx0bGFiZWwgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fTtcclxuXHJcblx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5jb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkKXtcclxuXHR0aGlzLmlzRWRpdCA9IHRydWU7XHJcblx0dGhpcy5wb3BDb250ZW50RG9tLnZhbChkLmNvbnRlbnQpO1xyXG5cdHRoaXMucG9wVGl0bGVEb20udmFsKGQudGl0bGUpO1xyXG5cdHRoaXMuZGF0YSA9IGQ7XHJcblxyXG5cdGlmKGQucmVzb3VyY2Upe1xyXG5cdFx0Zm9yKHZhciBpIGluIGQucmVzb3VyY2Upe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGQucmVzb3VyY2VbaV07XHJcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHR9XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZVxyXG5cdFx0fSk7XHJcblx0XHR0aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcdFxyXG5cdH1cclxuXHR0aGlzLnBvcERvbS5tb2RhbCgnc2hvdycpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5wb3N0ID0gZnVuY3Rpb24oKXtcclxuXHJcblx0dmFyIGNvbnRlbnQgPSB0aGlzLnBvcENvbnRlbnREb20udmFsKCk7XHJcblx0dmFyIHRpdGxlID0gdGhpcy5wb3BUaXRsZURvbS52YWwoKTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKGNvbnRlbnQgPT09ICcnKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YklkLFxyXG5cdFx0YXJ0aWNsZUlkIDogdGhpcy5hcnRJZCxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0dGl0bGUgOiB0aXRsZSxcclxuXHRcdGxhYmVsIDogW10sXHJcblx0XHRyZXNvdXJjZXMgOiB0aGlzLmdldFJlc0xpc3QoKVxyXG5cdH07XHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLmNvbW1lbnRJZCA9IHRoaXMuZGF0YS5pZDtcclxuXHRcdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0XHRjZ2kuZWRpdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC51cGRhdGUocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLmxvYWRpbmcgPSB0cnVlO1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRpZihfdGhpcy5jTGlzdCl7XHJcblx0XHRcdFx0XHRfdGhpcy5jTGlzdC5hcHBlbmQocmVzLmRhdGEpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRfdGhpcy5wb3BDb250ZW50RG9tLnZhbCgnJyk7XHJcblx0XHRcdFx0X3RoaXMucG9wVGl0bGVEb20udmFsKCcnKTtcclxuXHRcdFx0XHRfdGhpcy5wb3BEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCl7XHJcblx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnNob3dQb3N0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuY2hhbmdlQXJ0aWNsZShpZCk7XHJcblx0dGhpcy5wb3BEb20ubW9kYWwoJ3Nob3cnKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRwID0gdGFyZ2V0LnBhcmVudCgpO1xyXG5cclxuXHR2YXIgaWQgPSBwLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMucmVzTWFwW2lkXTtcclxuXHRcdHAucmVtb3ZlKCk7XHJcblxyXG5cdFx0aWYodGhpcy5wb3BEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oaWQsbmFtZSl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0dmFyIHVwbG9hZENvbXAgID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0aWYod2luZG93LnVwbG9hZENvbXApe1xyXG5cdFx0JChzdHJpa2VyKS5iaW5kKCd1cGxvYWRGaWxlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0XHR1cGxvYWRDb21wKGQpO1xyXG5cdFx0fSk7XHJcblx0fWVsc2V7XHJcblx0XHR3aW5kb3cudXBsb2FkQ29tcCA9IHVwbG9hZENvbXA7XHJcblx0fVxyXG5cclxuXHQkKFwiI2NjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNjY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0dGhpcy5wb3BEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoX3RoaXMuaXNFZGl0KXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfkv67mlLnlm57lpI0nKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+aWsOW7uuWbnuWkjScpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLnBvcFRpdGxlRG9tLmZvY3VzKCk7XHJcblx0XHR9LDEwMDApXHRcdFxyXG5cdFx0d2luZG93LnN0cmlrZXIuY29tbWVudHNob3cgPSB0cnVlO1xyXG5cdH0pO1xyXG5cclxuXHR0aGlzLnBvcERvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyA9IGZhbHNlO1xyXG5cdFx0X3RoaXMuaXNFZGl0ID0gZmFsc2U7XHJcblx0fSk7XHRcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHRoaXMucG9wRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbkNvbW1lbnQucG9zdCA9IHBvc3Q7XHJcbm1vZHVsZS5leHBvcnRzID0gQ29tbWVudDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1lbnQvcG9zdC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwidmFyIG1zZyA9IHtcclxuXHQwIDogJ+aTjeS9nOaIkOWKnyEnLFxyXG5cdDEwOiAn5o6S5bqP5bqP5Y+35b+F6aG75aGr5YaZJyxcclxuXHQxMSA6ICfnu4Tnu4flkI3np7Dlv4XpobvloavlhpknLFxyXG5cdDIwIDogJ+aWsOWvhueggeWSjOmHjeWkjeWvhueggeW/hemhu+S4gOiHtCcsXHJcblx0MjEgOiAn6K+35aGr5YaZ55So5oi35ZCN5ZKM5a+G56CBIScsXHJcblx0MjIgOiAn55So5oi35LiN5a2Y5ZyoJyxcclxuXHQzMCA6ICfnu4Tnu4fmnIDlpJrmlK/mjIEz57qnIScsIFxyXG5cdDQwIDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDUwIDogJ+S9oOimgeS4iuS8oOeahOaWh+S7tuW3sue7j+i2hei/h+S9oOeahOWJqeS9meepuumXtCEnLFxyXG5cdDYwIDogJ+S9oOi/mOayoeaciemAieaLqeimgeWFseS6q+eahOebruW9lScsXHJcblx0NzUgOiAn5bqP5Y+35Y+q6IO95ZyoMX45OeS5i+mXtCcsXHJcblx0NzYgOiAn5ZCN56ew5LiN6IO95bCR5LqOMuS4quWtlycsXHJcblx0NzcgOiAn5Y+C5pWw5LiN6IO95Li656m6JyxcclxuXHQ3OCA6ICflr7nkuI3otbfvvIznvZHnu5zotoXml7bkuobvvIzor7fnqI3lkI7lho3or5UnLFxyXG5cdDc5IDogJ+W3sue7j+acieWQjOWQjeeahOmhueebruS6hicsXHJcblx0MTAwIDogJ+WvueS4jei1t++8jOaCqOayoeaciei/meS4quaTjeS9nOadg+mZkCEnLC8v5ZCO5Y+w5Ye66ZSZ5ZWmIVxyXG5cdDEwMSA6ICflh7rplJnllaYnLFxyXG5cdDEwMDEgOiAn5oKo6L+Y5rKh5pyJ55m75b2VIScsXHJcblx0MTAwNCA6ICfmsqHmnInmib7liLDotYTmupAhJyxcclxuXHQxMDEwIDogJ+aCqOayoeacieafpeeci+ivpei1hOa6kOeahOadg+mZkCEnLFxyXG5cdDEwMTEgOiAn5Y+C5pWw5Ye66ZSZ5ZWmIScsXHJcblx0MTAxMyA6ICflh7rplJnllaYnLFxyXG5cdDEwMTQgOiAn5bey57uP5YWz5rOo6K+l5Li76aKYJyxcclxuXHQxMDE1IDogJ+W3sue7j+W9kuaho+WVpiEnLFxyXG5cdDEwMTYgOiAn6K+l6LWE5rqQ5LiN6IO95Yig6ZmkJyxcclxuXHQxMDE3IDogJ+ivpeebruW9leS4i+i/mOacieWFtuS7luaWh+S7tu+8jOaXoOazleWIoOmZpCEnLFxyXG5cdDEwNDEgOiAn55So5oi35ZCN5oiW5a+G56CB6ZSZ6K+vIScsXHJcblx0MTA0MyA6ICfnlKjmiLfkuI3lrZjlnKghJyxcclxuXHQxMDUwIDogJ+aXtumXtOS6pOWPieS6hiEnXHJcbn1cclxuXHJcbk1lc3NlbmdlcigpLm9wdGlvbnMgPSB7XHJcbiAgICBleHRyYUNsYXNzZXM6ICdtZXNzZW5nZXItZml4ZWQgbWVzc2VuZ2VyLW9uLWJvdHRvbScsXHJcbiAgICB0aGVtZTogJ2ZsYXQnXHJcbn1cclxuXHJcbnZhciBkYiA9IHt9O1xyXG5cclxuZnVuY3Rpb24gbWVzc2FnZSgpe1xyXG5cdHRoaXM7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmNvbmZpcm0gPSBmdW5jdGlvbihtc2csbGFiZWwsY2Ipe1xyXG5cdGlmKHR5cGVvZiBsYWJlbCA9PT0gJ3VuZGVmaW5lZCcgfHwgbGFiZWwgPT09IG51bGwpe1xyXG5cdFx0bGFiZWwgPSB7XHJcblx0XHRcdHN1YiA6ICfnoa7lrponLFxyXG5cdFx0XHRjYW5jZWwgOiAn5Y+W5raIJ1xyXG5cdFx0fVxyXG5cdH1cclxuXHRpZih0eXBlb2YgY2IgPT09ICd1bmRlZmluZWQnKXtcclxuXHRcdGNiID0gZnVuY3Rpb24oKXt9O1xyXG5cdH1cclxuXHRpZih0eXBlb2YgbXNnID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0bWVzc2FnZSA6IG1zZyxcclxuXHRcdGFjdGlvbnMgOiB7XHJcblx0XHRcdHN1YiA6IHtcclxuXHRcdFx0XHRsYWJlbCA6IGxhYmVsLnN1YiB8fCAn56Gu5a6aJyxcclxuXHRcdFx0XHRhY3Rpb24gOiBmdW5jdGlvbigpe1xyXG5cdFx0XHRcdFx0Y2IoKTtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRjYW5jZWwgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5jYW5jZWwgfHwgJ+WPlua2iCcsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdG1zZy5oaWRlKCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHZhciBtc2cgPSBNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZCl7XHJcblx0aWYoZCA9PSAxMDAxKXtcclxuXHRcdHdpbmRvdy5sb2NhdGlvbiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnW2RdIHx8ICflh7rplJnmi4khJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChkKSl7XHJcblx0XHRvYmoudHlwZSA9ICdlcnJvcidcclxuXHR9XHJcblxyXG5cdE1lc3NlbmdlcigpLnBvc3Qob2JqKTtcclxufVxyXG5cclxubWVzc2FnZS5wcm90b3R5cGUubXNnID0gZnVuY3Rpb24obXNnKXtcclxuXHR2YXIgb2JqID0ge1xyXG5cdFx0J21lc3NhZ2UnIDogbXNnIHx8ICcnXHJcblx0fVxyXG5cdGlmKHBhcnNlSW50KG1zZykpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHRcdFxyXG59XHJcblxyXG5kYi5tZXNzYWdlID0gbWVzc2FnZTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZGI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vbXNnLmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/pgJrnn6VcclxudmFyIG5vdGlmeSA9IHt9LFxyXG5cdGRhdGEgPSByZXF1aXJlKCcuLi9kYXRhL2RhdGEnKS5ub3RpZnksXHJcblx0Y2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLm5vdGlmeTtcclxuXHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2dsaXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21zZy5lanMnKSAgIC8v6LWE5rqQ5YiX6KGoXHJcbn1cclxuXHJcbnZhciBub3RpZnlPYmogPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNub3RpZnlMaXN0XCIpO1xyXG5cdHRoaXMudGlwc0RvbSA9ICQoXCIjdXNlck5hdiAubXNnIGRpdlwiKTtcclxuXHJcblx0dGhpcy5tc2dOdW0gPSAwO1xyXG5cdHRoaXMuZ2V0KCk7XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5zZWFyY2goe30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGNvbnNvbGUubG9nKHJlcyk7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKHJlcy5kYXRhLmxpc3QubGVuZ3RoKXtcclxuXHRcdFx0XHRfdGhpcy5tc2dOdW0gPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKS5zaG93KCk7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbm5vdGlmeU9iai5wcm90b3R5cGUucmVhZCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy50aXBzRG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdGlmKF90aGlzLm1zZ051bSl7XHJcblx0XHRcdGlmKF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycpKXtcclxuXHRcdFx0XHRfdGhpcy5kb20uaGlkZSgpO1xyXG5cdFx0XHRcdF90aGlzLnRpcHNEb20uZGF0YSgnc2hvdycsMCk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmRvbS5zaG93KCk7XHRcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGhyZWYgPSB0YXJnZXQuZGF0YSgnaHJlZicpLFxyXG5cdFx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0XHRyZWFkID0gdGFyZ2V0LmRhdGEoJ3JlYWQnKTtcclxuXHJcblxyXG5cdFx0aWYoaHJlZil7XHJcblx0XHRcdHdpbmRvdy5vcGVuKGhyZWYpO1xyXG5cdFx0XHRpZihyZWFkID09ICcnKXtcclxuXHRcdFx0XHRjZ2kucmVhZCh7XHJcblx0XHRcdFx0XHRub3RpZnlJZCA6IGlkXHJcblx0XHRcdFx0fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHR0YXJnZXQucmVtb3ZlKCk7XHJcblx0XHRcdFx0XHRcdF90aGlzLm1zZ051bS0tO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy50aXBzRG9tLnRleHQoX3RoaXMubXNnTnVtKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSlcclxufVxyXG5cclxubm90aWZ5Lm5vdGlmeSA9IG5vdGlmeU9iajtcclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IG5vdGlmeTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLy9cclxucmVxdWlyZSgnLi4vbGliL3BsYXllci92aWRlby5kZXYnKTtcclxucmVxdWlyZSgnLi4vbGliL2ZsZXgvZmxleHBhcGVyJyk7XHJcbnJlcXVpcmUoJy4uL2xpYi9mbGV4L2ZsZXhwYXBlcl9oYW5kbGVycycpO1xyXG5yZXF1aXJlKCcuLi9saWIvanEucm90YXRlJyk7XHJcbnZhciB0bXBsID0ge1xyXG5cdGJvZHkgOiByZXF1aXJlKCcuLi8uLi90cGwvcmV2aWV3L2JvZHkuZWpzJyksXHJcblx0bWFpbiA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXZpZXcvbWFpbi5lanMnKSxcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jldmlldy9saXN0LmVqcycpXHJcbn1cclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG52YXIgZGIgPSB7fVxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xyXG5cclxudmFyIGdldFNpemUgPSBmdW5jdGlvbihzaXplKXtcclxuICAgIHZhciBwcmVjID0gMztcclxuICAgIHZhciBzaXplID0gTWF0aC5yb3VuZChNYXRoLmFicyhzaXplKSk7XHJcblx0dmFyIHVuaXRzID0gWydCJywnS0InLCdNQicsXCJHQlwiLFwiVEJcIl07XHJcblxyXG5cdHZhciB1bml0ID0gIE1hdGgubWluKDQsIE1hdGguZmxvb3IoTWF0aC5sb2coc2l6ZSkgLyBNYXRoLmxvZygyKSAvIDEwKSk7XHJcblxyXG4gICAgc2l6ZSA9IHNpemUgKiBNYXRoLnBvdygyLCAtMTAgKiB1bml0KTtcclxuICAgIHZhciBkaWdpID0gcHJlYyAtIDEgLSBNYXRoLmZsb29yKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMTApKTtcclxuICAgIHNpemUgPSBNYXRoLnJvdW5kKHNpemUgKiBNYXRoLnBvdygxMCwgZGlnaSkpICogTWF0aC5wb3coMTAsIC1kaWdpKTtcclxuICAgIHJldHVybiBnZXROdW1zKHNpemUpICsgdW5pdHNbdW5pdF07ICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXROdW1zID0gZnVuY3Rpb24oeCl7XHJcblx0aWYoeD09PTApe1xyXG5cdFx0cmV0dXJuIDA7XHJcblx0fVxyXG5cdHZhciBmX3ggPSBwYXJzZUZsb2F0KHgpOyAgXHJcblx0aWYgKGlzTmFOKGZfeCkpICBcclxuXHR7ICBcclxuXHQvL2FsZXJ0KCdmdW5jdGlvbjpjaGFuZ2VUd29EZWNpbWFsLT5wYXJhbWV0ZXIgZXJyb3InKTsgIFxyXG5cdFx0cmV0dXJuIDA7ICBcclxuXHR9ICBcclxuXHR2YXIgZl94ID0gTWF0aC5jZWlsKHgqMTAwKS8xMDA7ICBcclxuXHR2YXIgc194ID0gZl94LnRvU3RyaW5nKCk7ICBcclxuXHR2YXIgcG9zX2RlY2ltYWwgPSBzX3guaW5kZXhPZignLicpOyAgXHJcblx0aWYgKHBvc19kZWNpbWFsIDwgMCkgIFxyXG5cdHtcclxuXHRcdHJldHVybiBmX3g7XHJcblx0fSAgXHJcblx0d2hpbGUgKHNfeC5sZW5ndGggPD0gcG9zX2RlY2ltYWwgKyAyKSAgXHJcblx0eyAgXHJcblx0XHRzX3ggKz0gJzAnOyAgXHJcblx0fSBcclxuXHRyZXR1cm4gc194OyAgICAgIFx0XHJcbn1cclxuXHJcbnZhciBnZXRUaW1lO1xyXG5cclxuXHJcbmZ1bmN0aW9uIHJldmlldyhkYXRhKXtcclxuXHRnZXRUaW1lID0gd2luZG93LnN0cmlrZXIudXRpbC5mb3JtYXRUaW1lO1xyXG5cclxuXHR0aGlzLmJnID0gJCgnPGRpdiBpZD1cInJldmlld0Jnc1wiPjwvZGl2PicpO1xyXG5cdHRoaXMuZG9tID0gJCgnPGRpdiBpZD1cInJldmlld1dpblwiPjwvZGl2PicpO1xyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMubm93SWQgPSBkYXRhLmlkO1xyXG5cdHRoaXMubWFwID0ge307XHJcblx0dGhpcy5saXN0ID0gW107XHJcblx0dGhpcy5saXN0SXRlbSA9IFtdO1xyXG5cclxuXHJcblx0JCgnYm9keScpLmFwcGVuZCh0aGlzLmJnKTtcclxuXHQkKCdib2R5JykuYXBwZW5kKHRoaXMuZG9tKTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLmJvZHkoKTtcclxuXHR0aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHR0aGlzLnJldmlld0RpdiA9ICQoXCIjcmV2aWV3RGl2XCIpO1xyXG5cdHRoaXMucmV2aWV3QmxvY2sgPSAkKFwiI3Jldmlld0Jsb2NrXCIpO1xyXG5cclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHJcblx0dGhpcy5zaG93TGlzdCgpO1xyXG5cdHRoaXMuc2hvd09uZSgpO1xyXG5cclxuXHR0aGlzLnNob3coKTtcclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufTtcclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvd0xpc3QgPSBmdW5jdGlvbihpZCl7XHJcblx0dmFyIGxpc3RIdG1sID0gdG1wbC5saXN0KHtcclxuXHRcdGxpc3QgOiB0aGlzLmxpc3RJdGVtLFxyXG5cdFx0aWQgOiB0aGlzLm5vd0lkXHJcblx0fSk7XHJcblx0XHJcblx0dGhpcy5yZXZpZXdCbG9jay5odG1sKGxpc3RIdG1sKTtcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93T25lID0gZnVuY3Rpb24oaWQsaWR4KXtcclxuXHR2YXIgbm93SWQgPSBpZCB8fCB0aGlzLm5vd0lkO1xyXG5cdHZhciBvYmogPSB0aGlzLmRhdGFbbm93SWRdO1xyXG5cclxuXHRpZihvYmope1xyXG5cdFx0aWYob2JqLnR5cGUgPT09IDIpe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubWFpbihvYmopO1xyXG5cdFx0XHR0aGlzLnJldmlld0Rpdi5odG1sKGh0bWwpO1x0XHRcdFxyXG4gICAgICAgICAgICAgIHZhciBwdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KCcvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JytvYmouaWQpO1xyXG4gICAgICAgICAgICAgICQoJyNkb2N1bWVudFZpZXdlcicpLkZsZXhQYXBlclZpZXdlcihcclxuICAgICAgICAgICAgICAgIHsgY29uZmlnIDoge1xyXG4gICAgICAgICAgICAgICAgICAgIFNXRkZpbGUgOiBwdXJsLFxyXG4gICAgICAgICAgICAgICAgICAgIGpzRGlyZWN0b3J5IDogJy9qcy9saWIvZmxleC8nLFxyXG4gICAgICAgICAgICAgICAgICAgIFNjYWxlIDogMC44LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UcmFuc2l0aW9uIDogJ2Vhc2VPdXQnLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21UaW1lIDogMC41LFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21JbnRlcnZhbCA6IDAuMixcclxuICAgICAgICAgICAgICAgICAgICBGaXRQYWdlT25Mb2FkIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBGaXRXaWR0aE9uTG9hZCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEZ1bGxTY3JlZW5Bc01heFdpbmRvdyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIFByb2dyZXNzaXZlTG9hZGluZyA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIE1pblpvb21TaXplIDogMC4yLFxyXG4gICAgICAgICAgICAgICAgICAgIE1heFpvb21TaXplIDogNSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hNYXRjaEFsbCA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgICAgIEluaXRWaWV3TW9kZSA6ICdQb3J0cmFpdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgUmVuZGVyaW5nT3JkZXIgOiAnZmxhc2gnLFxyXG4gICAgICAgICAgICAgICAgICAgIFN0YXJ0QXRQYWdlIDogJycsXHJcbiAgICAgICAgICAgICAgICAgICAgVmlld01vZGVUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFpvb21Ub29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIE5hdlRvb2xzVmlzaWJsZSA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgQ3Vyc29yVG9vbHNWaXNpYmxlIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICBTZWFyY2hUb29sc1Zpc2libGUgOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgICAgIFdNb2RlIDogJ3dpbmRvdycsXHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxlQ2hhaW46ICd6aF9DTidcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgKTsgIFx0XHRcclxuICAgICAgICB9ZWxzZSBpZihvYmoudHlwZSA9PT0gOCl7XHJcbiAgICAgICAgXHR2YXIgcHVybCA9ICdjZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nK29iai5pZDtcclxuICAgICAgICBcdHZhciB0ZXh0ID0gJC5hamF4KHtcclxuXHRcdFx0XHR1cmw6IHB1cmwsXHJcblx0XHRcdFx0YXN5bmM6IGZhbHNlLFxyXG5cdFx0XHRcdGVycm9yIDogZnVuY3Rpb24oZGF0YSl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9KS5yZXNwb25zZVRleHQ7XHJcblxyXG4gICAgICAgIFx0b2JqLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIFx0Y29uc29sZS5sb2cob2JqKTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLm1haW4ob2JqKTtcclxuXHRcdFx0dGhpcy5yZXZpZXdEaXYuaHRtbChodG1sKTtcclxuXHRcdFx0Y29uc29sZS5sb2codGV4dCk7XHJcbiAgICAgICAgfWVsc2V7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5tYWluKG9iaik7XHJcblx0XHRcdHRoaXMucmV2aWV3RGl2Lmh0bWwoaHRtbCk7ICAgICAgICBcdFxyXG4gICAgICAgIH1cclxuXHR9XHJcblxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmNoZWNrRGF0YSA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBpZHggPSAwO1xyXG5cdGZvcih2YXIgaSBpbiBkYXRhLmxpc3Qpe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHR0aGlzLm1hcFtpdGVtLmlkXSA9IGlkeDtcclxuXHRcdGlmKGl0ZW0uaWQgPT09IHRoaXMubm93SWQpe1xyXG5cdFx0XHR0aGlzLm5vd0lkeCA9IGlkeDtcclxuXHRcdH1cclxuXHRcdHRoaXMubGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0dGhpcy5saXN0SXRlbS5wdXNoKGl0ZW0pO1xyXG5cclxuXHRcdGl0ZW0uc2l6ZSA9IGdldFNpemUoaXRlbS5zaXplKTtcclxuXHRcdGl0ZW0udGltZSA9IGdldFRpbWUoaXRlbS5jcmVhdGVUaW1lKTtcclxuXHRcdHRoaXMuZGF0YVtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRpZHgrKztcclxuXHR9XHJcbn1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuc2hvdyA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5iZy5zaG93KCk7XHJcblx0dGhpcy5kb20uc2hvdygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuYmcuaGlkZSgpO1xyXG5cdHRoaXMuZG9tLmhpZGUoKTtcdFxyXG5cdHRoaXMubGlzdCA9IFtdO1xyXG5cdHRoaXMubGlzdEl0ZW0gPSBbXTtcclxuXHR0aGlzLnJldmlld0Jsb2NrLmh0bWwoJycpO1xyXG59XHJcblxyXG4vL+abtOaNouaVsOaNrlxyXG5yZXZpZXcucHJvdG90eXBlLmNoYW5nZURhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHRjb25zb2xlLmxvZyhkYXRhKTtcclxuXHR0aGlzLmNoZWNrRGF0YShkYXRhKTtcclxuXHR0aGlzLnNob3dMaXN0KCk7XHJcblx0dGhpcy5zaG93T25lKGRhdGEuaWQpO1xyXG5cdHRoaXMuc2hvdygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dOZXh0ID0gZnVuY3Rpb24oZSl7XHJcblx0aWYodGhpcy5ub3dJZHggPCB0aGlzLmxpc3QubGVuZ3RoLTEpe1xyXG5cdFx0dGhpcy5ub3dJZHgrK1xyXG5cdH1cclxuXHR0aGlzLm5vd0lkID0gdGhpcy5saXN0W3RoaXMubm93SWRdO1xyXG5cdHRoaXMucmV2aWV3QmxvY2suZmluZCgnbGknKS5lcSh0aGlzLm5vd0lkeCkuY2xpY2soKTtcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93UHJlID0gZnVuY3Rpb24oZSl7XHJcblx0aWYodGhpcy5ub3dJZHggPiAwKXtcclxuXHRcdHRoaXMubm93SWR4LS07XHJcblx0fVxyXG5cdHRoaXMubm93SWQgPSB0aGlzLmxpc3RbdGhpcy5ub3dJZF07XHJcblx0dGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpLmVxKHRoaXMubm93SWR4KS5jbGljaygpO1xyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLnNob3dJZHggPSBmdW5jdGlvbihlKXtcclxuXHRcclxufVxyXG5cclxucmV2aWV3LnByb3RvdHlwZS5zaG93RmlsZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHRoaXMubm93SWR4ID0gdGhpcy5tYXBbaWRdO1xyXG5cdFx0dGhpcy5zaG93T25lKGlkKTtcclxuXHRcdHZhciBsaXN0ID0gdGhpcy5yZXZpZXdCbG9jay5maW5kKCdsaScpO1xyXG5cdFx0bGlzdC5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHRcdCQoXCIjcmV2aWV3XCIraWQpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xyXG5cdFx0Ly9saXN0W3RoaXMubm93SWR4XS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcclxuXHR9XHJcbn1cclxuXHJcbi8vIHJldmlldy5wcm90b3R5cGUuc2hvd1ZlZGlvID0gZnVuY3Rpb24oZSl7XHJcbi8vICAgICAgICAgICAvLyA8c291cmNlIHNyYz1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaWQlPlwiIHR5cGU9J3ZpZGVvL21wNCcgLz5cclxuLy8gICAgICAgICAgIC8vIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pZCU+XCIgdHlwZT0ndmlkZW8vd2VibScgLz5cclxuLy8gICAgICAgICAgIC8vIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pZCU+XCIgdHlwZT0ndmlkZW8vb2dnJyAvPlxyXG4vLyAgICAgICAgICAgLy8gPHRyYWNrIGtpbmQ9XCJjYXB0aW9uc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cclxuLy8gICAgICAgICAgIC8vIDx0cmFjayBraW5kPVwic3VidGl0bGVzXCIgc3JjPVwiZGVtby5jYXB0aW9ucy52dHRcIiBzcmNsYW5nPVwiZW5cIiBsYWJlbD1cIkVuZ2xpc2hcIj48L3RyYWNrPjwhLS0gVHJhY2tzIG5lZWQgYW4gZW5kaW5nIHRhZyB0aGFua3MgdG8gSUU5IC0tPlx0XHJcbi8vIH1cclxuXHJcbnJldmlldy5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHQvL190aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cdFx0XHRcclxuXHR9KVxyXG59XHJcblxyXG5yZXZpZXcucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmhpZGUoKTtcclxufVxyXG5cclxuZGIucmV2aWV3ID0gcmV2aWV3O1xyXG5cclxudmFyIHJ2O1xyXG5cclxuc3RyaWtlci5iaW5kKCdyZXZpZXcnLGZ1bmN0aW9uKGUsZCl7XHJcblx0aWYoIXJ2KXtcclxuXHRcdHJ2ID0gbmV3IHJldmlldyhkKTtcclxuXHR9ZWxzZXtcclxuXHRcdHJ2LmNoYW5nZURhdGEoZCk7XHJcblx0fVxyXG59KTtcclxuXHJcbi8vIHN0cmlrZXIuYmluZCgnc2hvd1ZpZGVvJyxmdW5jdGlvbihlLGQpe1xyXG4vLyBcdGlmKCFydil7XHJcbi8vIFx0XHRydiA9IG5ldyByZXZpZXcoZCk7XHJcbi8vIFx0fWVsc2V7XHJcbi8vIFx0XHRydi5zaG93VmVkaW8oZCk7XHJcbi8vIFx0fVxyXG4vLyB9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3Jlc291cmNlL3Jldmlldy5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sYWJlbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubGFiZWwsXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIExhYmVsID0ge30sXHJcblx0X3RoaXMgPSBMYWJlbDtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9saXN0LmVqcycpLFxyXG5cdG9uZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9sYWJlbC9vbmUuZWpzJylcclxufTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gTGFiZWw7XHJcblxyXG5mdW5jdGlvbiBnZXRMaXN0KCl7XHJcblx0Y2dpLmxpc3QoZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcblxyXG5MYWJlbC5sYWJlbCA9IGZ1bmN0aW9uKG5hbWUpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNcIituYW1lKTtcclxuXHJcblx0dGhpcy5ub3dEb20gPSB0aGlzLmRvbS5maW5kKCcubm93LWxhYmVsLWxpc3QnKTtcclxuXHR0aGlzLmFkZERvbSA9IHRoaXMuZG9tLmZpbmQoJy5hZGQtbGFiZWwtYXJlYScpO1xyXG5cdC8vIGlmKHR5cGUgPT09ICdzdWInKXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZFN1YkxhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dTdWJMYWJlbCcpO1xyXG5cdC8vIH1lbHNle1xyXG5cdC8vIFx0dGhpcy5hZGREb20gPSAkKCcjYWRkQXJ0TGFiZWwnKTtcclxuXHQvLyBcdHRoaXMubm93RG9tID0gJCgnI25vd0FydExhYmVsJyk7XHJcblx0Ly8gfVxyXG5cdHRoaXMubGlzdERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5idG5Eb20gPSB0aGlzLmFkZERvbS5maW5kKCcuYnRuJyk7XHJcblx0dGhpcy5pbnB1dERvbSA9IHRoaXMuYWRkRG9tLmZpbmQoJy5mb3JtLWNvbnRyb2wnKTtcclxuXHR0aGlzLl9zZWxlY3REb207Ly/lvZPliY3pgInkuK3nmoTlhYPntKBcclxuXHJcblx0Ly/pu5jorqTmsqHmnInmoIfnrb5cclxuXHR0aGlzLm5vd0RvbS5oaWRlKCk7XHJcblx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cclxuXHQvL+W3sue7j+mAieS4reeahGlkbWFwXHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cclxuXHR0aGlzLm1hcCA9IHt9O1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1x0XHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQvL1xyXG5cdC8vIHRoaXMubm93RG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cdC8vIFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0Ly8gXHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHQvLyBcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHQvLyBcdH1cclxuXHQvLyB9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIHZhbCA9IHRoaXMuaW5wdXREb20udmFsKCk7XHJcblx0aWYodmFsICE9PSAnJyl7XHJcblx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdG5hbWUgOiB2YWxcclxuXHRcdH07XHJcblx0XHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRcdGNnaS5jcmVhdGUocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLm1hcFtyZXMuZGF0YS5pZF0gPSByZXMuZGF0YTtcclxuXHRcdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpbcmVzLmRhdGFdfSk7XHJcblx0XHRcdFx0X3RoaXMubGlzdERvbS5hcHBlbmQoaHRtbCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dsaXN0ID0gZnVuY3Rpb24oZSl7XHJcblx0Ly8gL2NvbnNvbGUubG9nKHRoaXMuX3NlbGVjdERvbSk7XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmFkZERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uaGlkZSgpO1xyXG5cdH1cclxuXHQvL3RoaXMuYWRkRG9tLnNob3coKTtcclxuXHQvL3RoaXMubm93RG9tLnNob3coKTtcclxuXHJcblx0Ly9mdWktY3Jvc3NcclxuXHQvL2Z1aS1wbHVzXHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5nZXREYXRhID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGNnaS5saXN0KHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHtsaXN0OnJlcy5kYXRhfSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0Zm9yKHZhciBpID0gMCxsPXJlcy5kYXRhLmxlbmd0aDtpPGw7aSsrKXtcclxuXHRcdFx0XHR2YXIgaXRlbSA9IHJlcy5kYXRhW2ldO1xyXG5cdFx0XHRcdF90aGlzLm1hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNob3dFZGl0ID0gZnVuY3Rpb24oZGF0YSl7XHJcblx0IHZhciBodG1sID0gdG1wbC5vbmUoe2xpc3Q6ZGF0YX0pO1xyXG5cdCB0aGlzLm5vd0RvbS5odG1sKGh0bWwpLnNob3coKTtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnNlbGVjdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBpZCA9IHRoaXMuX3NlbGVjdERvbS5kYXRhKCdpZCcpO1xyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdGxpc3QgOiBbdGhpcy5tYXBbaWRdXVxyXG5cdH1cclxuXHJcblx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdGlmKHRoaXMubm93RG9tLmZpbmQoJy5sYWJlbCcraWQpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lKHBhcmFtKTtcclxuXHRcdHRoaXMubm93RG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0TGFiZWxMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdC8vIGNvbnNvbGUubG9nKHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmxlbmd0aCk7XHJcblx0Ly8gdGhpcy5ub3dEb20uZmluZChcIi50YWdcIikuZWFjaChmdW5jdGlvbihlKXtcclxuXHQvLyBcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHQvLyBcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHQvLyBcdGlmKGlkKXtcclxuXHQvLyBcdFx0bGlzdC5wdXNoKGlkKTtcclxuXHQvLyBcdH1cdFx0XHRcdFxyXG5cdC8vIH0pXHRcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5pZG1hcCl7XHJcblx0XHRsaXN0LnB1c2goaSk7XHJcblx0fVxyXG5cdHJldHVybiBsaXN0O1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHR0aGlzLm5vd0RvbS5odG1sKCcnKS5oaWRlKCk7XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcdFxyXG59XHJcblxyXG4vL+WIoOmZpFxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGRlbGV0ZSB0aGlzLmlkbWFwW2lkXTtcclxuXHRwLnJlbW92ZSgpO1xyXG59XHJcblxyXG5cclxuTGFiZWwuaW5pdCA9IGZ1bmN0aW9uKCl7XHJcblxyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9sYWJlbC9sYWJlbC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwidmFyIHJlcXVlc3QgPSByZXF1aXJlKCcuL3JlcXVlc3QnKSxcclxuXHRtZXNzYWdlID0gcmVxdWlyZSgnLi9tc2cnKTtcclxuXHJcbnZhciBtc2cgPSBuZXcgbWVzc2FnZS5tZXNzYWdlKCk7XHJcblxyXG52YXIgY2dpUGF0aCA9ICcvY2dpLyc7XHJcbnZhciBjZ2lMaXN0ID0ge1xyXG5cdHVzZXIgOiB7XHJcblx0XHRsaXN0IDogY2dpUGF0aCsndXNlci9saXN0JyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKyd1c2VyL2luZm8nLFxyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsndXNlci9jcmVhdGUnXHJcblx0fSxcclxuXHRzdWJqZWN0IDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3N1YmplY3QvbGlzdCcsIC8vIOaIkeeahOWIl+ihqFxyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnc3ViamVjdC9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ3N1YmplY3QvaW5mbycsXHJcblx0XHRlZGl0IDogY2dpUGF0aCsnc3ViamVjdC9lZGl0JywgLy/kv67mlLnkuLvpophcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3N1YmplY3QvY3JlYXRlJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnc3ViamVjdC9kZWxldGUnLFxyXG5cdFx0Zm9sbG93IDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3cnLCAvL+WFs+azqFxyXG5cdFx0Zm9sbG93aW5nIDogY2dpUGF0aCsnc3ViamVjdC9mb2xsb3dpbmcnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0aW52aXRlZCA6IGNnaVBhdGgrJ3N1YmplY3QvaW52aXRlZCcsIC8v6YKA6K+35YiX6KGoXHJcblx0XHRhcmNoaXZlZCA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZWQnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0YXJjaGl2ZSA6IGNnaVBhdGgrJ3N1YmplY3QvYXJjaGl2ZScsIC8v5YWz5rOo5YiX6KGoXHJcblx0XHRkZWxyZXNvdXJjZSA6IGNnaVBhdGggKyAnc3ViamVjdC9kZWxyZXNvdXJjZScgLy/liKDpmaTkuIDkuKrotYTmupBcclxuXHR9LFxyXG5cdGFydGljbGUgOiB7XHJcblx0XHRzZWFyY2ggOiBjZ2lQYXRoKydhcnRpY2xlL3NlYXJjaCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsnYXJ0aWNsZS9pbmZvJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydhcnRpY2xlL3N0YXJpbmcnLCAvL+i1nueahOW4luWtkFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0ZWQnLCAvL+aQnOiXj+eahOW4luWtkFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2FydGljbGUvZWRpdCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyJywgLy/otZ5cclxuXHRcdGNvbGxlY3QgOiBjZ2lQYXRoKydhcnRpY2xlL2NvbGxlY3QnLCAvL+aUtuiXj1xyXG5cdFx0J2RlbGV0ZScgOiBjZ2lQYXRoKydhcnRpY2xlL2RlbGV0ZScsIC8v5pS26JePXHJcblx0XHQnc2V0dG9wJyA6IGNnaVBhdGgrJ2FydGljbGUvc2V0VG9wJywgLy/mlLbol49cclxuXHRcdCdyZWYnIDogY2dpUGF0aCsnYXJ0aWNsZS9uZXdhcnQnLCAvL+aUtuiXj1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnYXJ0aWNsZS9jcmVhdGUnXHJcblx0fSxcclxuXHRjb21tZW50IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnY29tbWVudC9zZWFyY2gnLFxyXG5cdFx0c3RhcmluZyA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcmluZycsXHJcblx0XHRjb2xsZWN0ZWQgOiBjZ2lQYXRoKydjb21tZW50L2NvbGxlY3RlZCcsXHJcblx0XHRzdGFyIDogY2dpUGF0aCsnY29tbWVudC9zdGFyJyxcclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnY29tbWVudC9kZWxldGUnLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ2NvbW1lbnQvZWRpdCcsXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0JyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2NvbW1lbnQvY3JlYXRlJ1xyXG5cdH0sXHJcblx0bm90aWZ5IDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3NlYXJjaCcsXHJcblx0XHRyZWFkIDogY2dpUGF0aCsnbm90aWZpY2F0aW9uL3JlYWQnLFxyXG5cdH0sXHJcblx0bGFiZWwgOiB7XHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydsYWJlbC9jcmVhdGUnLFxyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ2xhYmVsL2xpc3QnXHJcblx0fSxcclxuXHRyZXNvdXJjZSA6IHtcclxuXHRcdG1hcmsgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL21hcmsnLFxyXG5cdFx0c3BsaXQgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL3NwbGl0JyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoICsgJ3Jlc291cmNlL2xpc3QnXHJcblx0fSxcclxuXHRsb2dpbiA6IGNnaVBhdGgrJ2FjY291bnQvbG9naW4nLFxyXG5cdGxvZ291dCA6IGNnaVBhdGgrJ2FjY291bnQvbG9nb3V0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxudmFyIGVtcHR5RnVuID0gZnVuY3Rpb24ocmVzKXtcclxufVxyXG4vLyAv57uf5LiA5Ye65p2l5by55Ye65raI5oGvXHJcbnZhciBjaGVja0NhbGxiYWNrID0gZnVuY3Rpb24oY2IsZmxhZyl7XHJcblx0cmV0dXJuIGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjYihyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgIT09IDApe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fWVsc2UgaWYoZmxhZyl7XHJcblx0XHRcdG1zZy5lcnJvcihyZXMuY29kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5kYi5sb2dpbiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5sb2dpbixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmxvZ291dCA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9nb3V0LHt9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIudXNlciA9IHt9O1xyXG5kYi51c2VyLmxpc3QgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmxpc3QsbnVsbCxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIuaW5mbyA9IGZ1bmN0aW9uKGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuaW5mbyxudWxsLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG4vL+ebtOaOpeaLieaJgOacieeUqOaItz9cclxuZGIudXNlci5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnVzZXIuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdCA9IHt9O1xyXG5cclxuZGIuc3ViamVjdC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QubGlzdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QubGlzdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3cgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmZvbGxvdyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5mb2xsb3dpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmZvbGxvd2luZyxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5pbnZpdGVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5pbnZpdGVkLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5zdWJqZWN0LmFyY2hpdmVkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5hcmNoaXZlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5kZWxyZXNvdXJjZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZGVscmVzb3VyY2UscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmFydGljbGUgPSB7fTtcclxuXHJcbmRiLmFydGljbGUuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXJpbmcgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLnN0YXJpbmcscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5pbmZvID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5pbmZvLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuYXJ0aWNsZS5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlWydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUucmVmID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5yZWYscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnNldHRvcCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuc2V0dG9wLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudCA9IHt9O1xyXG5cclxuZGIuY29tbWVudC5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5kYi5jb21tZW50LmNvbGxlY3RlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdGVkLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudFsnZGVsZXRlJ10gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50WydkZWxldGUnXSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuc3RhciA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuc3RhcixwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY29sbGVjdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY29sbGVjdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmVkaXQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmVkaXQscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5ub3RpZnkgPSB7fTtcclxuXHJcbmRiLm5vdGlmeS5zZWFyY2ggPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5ub3RpZnkuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLm5vdGlmeS5yZWFkID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0Lm5vdGlmeS5yZWFkLHBhcmFtLGNhbGxiYWNrKTtcdFx0XHJcbn1cclxuXHJcbmRiLmxhYmVsID0ge307XHJcblxyXG5kYi5sYWJlbC5jcmVhdGUgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubGFiZWwuY3JlYXRlLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLmxhYmVsLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5sYWJlbC5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZSA9IHt9O1xyXG5cclxuZGIucmVzb3VyY2UubWFyayA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5tYXJrLCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLnNwbGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnJlc291cmNlLnNwbGl0LCBwYXJhbSwgY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnJlc291cmNlLmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5yZXNvdXJjZS5saXN0LHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL2NnaS5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDEgMiAzIDRcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bWxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGlmKGkpe1xyXG5cdFx0XHRsaXN0LnB1c2goaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5hZGRvbmUgPSBmdW5jdGlvbihkKXtcclxuXHRpZihkLmlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBkLmlkLFxyXG5cdFx0XHRuYW1lIDogZC5uYW1lXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmlkbWFwW2QuaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgTWFpbiBmdW5jdGlvbiBzcmMuXHJcbiAqL1xyXG5cclxuLy8gSFRNTDUgU2hpdi4gTXVzdCBiZSBpbiA8aGVhZD4gdG8gc3VwcG9ydCBvbGRlciBicm93c2Vycy5cclxuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcclxuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYXVkaW8nKTtcclxuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHJhY2snKTtcclxuXHJcbi8qKlxyXG4gKiBEb3VibGVzIGFzIHRoZSBtYWluIGZ1bmN0aW9uIGZvciB1c2VycyB0byBjcmVhdGUgYSBwbGF5ZXIgaW5zdGFuY2UgYW5kIGFsc29cclxuICogdGhlIG1haW4gbGlicmFyeSBvYmplY3QuXHJcbiAqXHJcbiAqICoqQUxJQVNFUyoqIHZpZGVvanMsIF9WXyAoZGVwcmVjYXRlZClcclxuICpcclxuICogVGhlIGB2anNgIGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIGluaXRpYWxpemUgb3IgcmV0cmlldmUgYSBwbGF5ZXIuXHJcbiAqXHJcbiAqICAgICB2YXIgbXlQbGF5ZXIgPSB2anMoJ215X3ZpZGVvX2lkJyk7XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZ3xFbGVtZW50fSBpZCAgICAgIFZpZGVvIGVsZW1lbnQgb3IgdmlkZW8gZWxlbWVudCBJRFxyXG4gKiBAcGFyYW0gIHtPYmplY3Q9fSBvcHRpb25zICAgICAgICBPcHRpb25hbCBvcHRpb25zIG9iamVjdCBmb3IgY29uZmlnL3NldHRpbmdzXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9uPX0gcmVhZHkgICAgICAgIE9wdGlvbmFsIHJlYWR5IGNhbGxiYWNrXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgICAgICAgICAgIEEgcGxheWVyIGluc3RhbmNlXHJcbiAqIEBuYW1lc3BhY2VcclxuICovXHJcbnZhciB2anMgPSBmdW5jdGlvbihpZCwgb3B0aW9ucywgcmVhZHkpe1xyXG4gIHZhciB0YWc7IC8vIEVsZW1lbnQgb2YgSURcclxuXHJcbiAgLy8gQWxsb3cgZm9yIGVsZW1lbnQgb3IgSUQgdG8gYmUgcGFzc2VkIGluXHJcbiAgLy8gU3RyaW5nIElEXHJcbiAgaWYgKHR5cGVvZiBpZCA9PT0gJ3N0cmluZycpIHtcclxuXHJcbiAgICAvLyBBZGp1c3QgZm9yIGpRdWVyeSBJRCBzeW50YXhcclxuICAgIGlmIChpZC5pbmRleE9mKCcjJykgPT09IDApIHtcclxuICAgICAgaWQgPSBpZC5zbGljZSgxKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBJZiBhIHBsYXllciBpbnN0YW5jZSBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQgZm9yIHRoaXMgSUQgcmV0dXJuIGl0LlxyXG4gICAgaWYgKHZqcy5wbGF5ZXJzW2lkXSkge1xyXG4gICAgICByZXR1cm4gdmpzLnBsYXllcnNbaWRdO1xyXG5cclxuICAgIC8vIE90aGVyd2lzZSBnZXQgZWxlbWVudCBmb3IgSURcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRhZyA9IHZqcy5lbChpZCk7XHJcbiAgICB9XHJcblxyXG4gIC8vIElEIGlzIGEgbWVkaWEgZWxlbWVudFxyXG4gIH0gZWxzZSB7XHJcbiAgICB0YWcgPSBpZDtcclxuICB9XHJcblxyXG4gIC8vIENoZWNrIGZvciBhIHVzZWFibGUgZWxlbWVudFxyXG4gIGlmICghdGFnIHx8ICF0YWcubm9kZU5hbWUpIHsgLy8gcmU6IG5vZGVOYW1lLCBjb3VsZCBiZSBhIGJveCBkaXYgYWxzb1xyXG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIGVsZW1lbnQgb3IgSUQgc3VwcGxpZWQgaXMgbm90IHZhbGlkLiAodmlkZW9qcyknKTsgLy8gUmV0dXJuc1xyXG4gIH1cclxuXHJcbiAgLy8gRWxlbWVudCBtYXkgaGF2ZSBhIHBsYXllciBhdHRyIHJlZmVycmluZyB0byBhbiBhbHJlYWR5IGNyZWF0ZWQgcGxheWVyIGluc3RhbmNlLlxyXG4gIC8vIElmIG5vdCwgc2V0IHVwIGEgbmV3IHBsYXllciBhbmQgcmV0dXJuIHRoZSBpbnN0YW5jZS5cclxuICByZXR1cm4gdGFnWydwbGF5ZXInXSB8fCBuZXcgdmpzLlBsYXllcih0YWcsIG9wdGlvbnMsIHJlYWR5KTtcclxufTtcclxuXHJcbi8vIEV4dGVuZGVkIG5hbWUsIGFsc28gYXZhaWxhYmxlIGV4dGVybmFsbHksIHdpbmRvdy52aWRlb2pzXHJcbnZhciB2aWRlb2pzID0gdmpzO1xyXG53aW5kb3cudmlkZW9qcyA9IHdpbmRvdy52anMgPSB2anM7XHJcblxyXG4vLyBDRE4gVmVyc2lvbi4gVXNlZCB0byB0YXJnZXQgcmlnaHQgZmxhc2ggc3dmLlxyXG52anMuQ0ROX1ZFUlNJT04gPSAnNC4zJztcclxudmpzLkFDQ0VTU19QUk9UT0NPTCA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovLycgOiAnaHR0cDovLycpO1xyXG5cclxuLyoqXHJcbiAqIEdsb2JhbCBQbGF5ZXIgaW5zdGFuY2Ugb3B0aW9ucywgc3VyZmFjZWQgZnJvbSB2anMuUGxheWVyLnByb3RvdHlwZS5vcHRpb25zX1xyXG4gKiB2anMub3B0aW9ucyA9IHZqcy5QbGF5ZXIucHJvdG90eXBlLm9wdGlvbnNfXHJcbiAqIEFsbCBvcHRpb25zIHNob3VsZCB1c2Ugc3RyaW5nIGtleXMgc28gdGhleSBhdm9pZFxyXG4gKiByZW5hbWluZyBieSBjbG9zdXJlIGNvbXBpbGVyXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG52anMub3B0aW9ucyA9IHtcclxuICAvLyBEZWZhdWx0IG9yZGVyIG9mIGZhbGxiYWNrIHRlY2hub2xvZ3lcclxuICAndGVjaE9yZGVyJzogWydodG1sNScsJ2ZsYXNoJ10sXHJcbiAgLy8gdGVjaE9yZGVyOiBbJ2ZsYXNoJywnaHRtbDUnXSxcclxuXHJcbiAgJ2h0bWw1Jzoge30sXHJcbiAgJ2ZsYXNoJzoge30sXHJcblxyXG4gIC8vIERlZmF1bHQgb2Ygd2ViIGJyb3dzZXIgaXMgMzAweDE1MC4gU2hvdWxkIHJlbHkgb24gc291cmNlIHdpZHRoL2hlaWdodC5cclxuICAnd2lkdGgnOiAzMDAsXHJcbiAgJ2hlaWdodCc6IDE1MCxcclxuICAvLyBkZWZhdWx0Vm9sdW1lOiAwLjg1LFxyXG4gICdkZWZhdWx0Vm9sdW1lJzogMC4wMCwgLy8gVGhlIGZyZWFraW4gc2VhZ3VscyBhcmUgZHJpdmluZyBtZSBjcmF6eSFcclxuXHJcbiAgLy8gSW5jbHVkZWQgY29udHJvbCBzZXRzXHJcbiAgJ2NoaWxkcmVuJzoge1xyXG4gICAgJ21lZGlhTG9hZGVyJzoge30sXHJcbiAgICAncG9zdGVySW1hZ2UnOiB7fSxcclxuICAgICd0ZXh0VHJhY2tEaXNwbGF5Jzoge30sXHJcbiAgICAnbG9hZGluZ1NwaW5uZXInOiB7fSxcclxuICAgICdiaWdQbGF5QnV0dG9uJzoge30sXHJcbiAgICAnY29udHJvbEJhcic6IHt9XHJcbiAgfSxcclxuXHJcbiAgLy8gRGVmYXVsdCBtZXNzYWdlIHRvIHNob3cgd2hlbiBhIHZpZGVvIGNhbm5vdCBiZSBwbGF5ZWQuXHJcbiAgJ25vdFN1cHBvcnRlZE1lc3NhZ2UnOiAnU29ycnksIG5vIGNvbXBhdGlibGUgc291cmNlIGFuZCBwbGF5YmFjayAnICtcclxuICAgICAgJ3RlY2hub2xvZ3kgd2VyZSBmb3VuZCBmb3IgdGhpcyB2aWRlby4gVHJ5IHVzaW5nIGFub3RoZXIgYnJvd3NlciAnICtcclxuICAgICAgJ2xpa2UgPGEgaHJlZj1cImh0dHA6Ly9iaXQubHkvY2NNVUVDXCI+Q2hyb21lPC9hPiBvciBkb3dubG9hZCB0aGUgJyArXHJcbiAgICAgICdsYXRlc3QgPGEgaHJlZj1cImh0dHA6Ly9hZG9iZS5seS9td2ZOMVwiPkFkb2JlIEZsYXNoIFBsYXllcjwvYT4uJ1xyXG59O1xyXG5cclxuLy8gU2V0IENETiBWZXJzaW9uIG9mIHN3ZlxyXG4vLyBUaGUgYWRkZWQgKCspIGJsb2NrcyB0aGUgcmVwbGFjZSBmcm9tIGNoYW5naW5nIHRoaXMgNC4zIHN0cmluZ1xyXG5pZiAodmpzLkNETl9WRVJTSU9OICE9PSAnR0VORVJBVEVEJysnX0NETl9WU04nKSB7XHJcbiAgdmlkZW9qcy5vcHRpb25zWydmbGFzaCddWydzd2YnXSA9IHZqcy5BQ0NFU1NfUFJPVE9DT0wgKyAndmpzLnplbmNkbi5uZXQvJyt2anMuQ0ROX1ZFUlNJT04rJy92aWRlby1qcy5zd2YnO1xyXG59XHJcblxyXG4vKipcclxuICogR2xvYmFsIHBsYXllciBsaXN0XHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqL1xyXG52anMucGxheWVycyA9IHt9O1xyXG4vKipcclxuICogQ29yZSBPYmplY3QvQ2xhc3MgZm9yIG9iamVjdHMgdGhhdCB1c2UgaW5oZXJpdGFuY2UgKyBjb250c3RydWN0b3JzXHJcbiAqXHJcbiAqIFRvIGNyZWF0ZSBhIGNsYXNzIHRoYXQgY2FuIGJlIHN1YmNsYXNzZWQgaXRzZWxmLCBleHRlbmQgdGhlIENvcmVPYmplY3QgY2xhc3MuXHJcbiAqXHJcbiAqICAgICB2YXIgQW5pbWFsID0gQ29yZU9iamVjdC5leHRlbmQoKTtcclxuICogICAgIHZhciBIb3JzZSA9IEFuaW1hbC5leHRlbmQoKTtcclxuICpcclxuICogVGhlIGNvbnN0cnVjdG9yIGNhbiBiZSBkZWZpbmVkIHRocm91Z2ggdGhlIGluaXQgcHJvcGVydHkgb2YgYW4gb2JqZWN0IGFyZ3VtZW50LlxyXG4gKlxyXG4gKiAgICAgdmFyIEFuaW1hbCA9IENvcmVPYmplY3QuZXh0ZW5kKHtcclxuICogICAgICAgaW5pdDogZnVuY3Rpb24obmFtZSwgc291bmQpe1xyXG4gKiAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAqICAgICAgIH1cclxuICogICAgIH0pO1xyXG4gKlxyXG4gKiBPdGhlciBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIGNhbiBiZSBhZGRlZCB0aGUgc2FtZSB3YXksIG9yIGRpcmVjdGx5IHRvIHRoZVxyXG4gKiBwcm90b3R5cGUuXHJcbiAqXHJcbiAqICAgIHZhciBBbmltYWwgPSBDb3JlT2JqZWN0LmV4dGVuZCh7XHJcbiAqICAgICAgIGluaXQ6IGZ1bmN0aW9uKG5hbWUpe1xyXG4gKiAgICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAqICAgICAgIH0sXHJcbiAqICAgICAgIGdldE5hbWU6IGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgICAgcmV0dXJuIHRoaXMubmFtZTtcclxuICogICAgICAgfSxcclxuICogICAgICAgc291bmQ6ICcuLi4nXHJcbiAqICAgIH0pO1xyXG4gKlxyXG4gKiAgICBBbmltYWwucHJvdG90eXBlLm1ha2VTb3VuZCA9IGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgYWxlcnQodGhpcy5zb3VuZCk7XHJcbiAqICAgIH07XHJcbiAqXHJcbiAqIFRvIGNyZWF0ZSBhbiBpbnN0YW5jZSBvZiBhIGNsYXNzLCB1c2UgdGhlIGNyZWF0ZSBtZXRob2QuXHJcbiAqXHJcbiAqICAgIHZhciBmbHVmZnkgPSBBbmltYWwuY3JlYXRlKCdGbHVmZnknKTtcclxuICogICAgZmx1ZmZ5LmdldE5hbWUoKTsgLy8gLT4gRmx1ZmZ5XHJcbiAqXHJcbiAqIE1ldGhvZHMgYW5kIHByb3BlcnRpZXMgY2FuIGJlIG92ZXJyaWRkZW4gaW4gc3ViY2xhc3Nlcy5cclxuICpcclxuICogICAgIHZhciBIb3JzZSA9IEFuaW1hbC5leHRlbmQoe1xyXG4gKiAgICAgICBzb3VuZDogJ05laWdoaGhoaCEnXHJcbiAqICAgICB9KTtcclxuICpcclxuICogICAgIHZhciBob3JzZXkgPSBIb3JzZS5jcmVhdGUoJ0hvcnNleScpO1xyXG4gKiAgICAgaG9yc2V5LmdldE5hbWUoKTsgLy8gLT4gSG9yc2V5XHJcbiAqICAgICBob3JzZXkubWFrZVNvdW5kKCk7IC8vIC0+IEFsZXJ0OiBOZWlnaGhoaGghXHJcbiAqXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Db3JlT2JqZWN0ID0gdmpzWydDb3JlT2JqZWN0J10gPSBmdW5jdGlvbigpe307XHJcbi8vIE1hbnVhbGx5IGV4cG9ydGluZyB2anNbJ0NvcmVPYmplY3QnXSBoZXJlIGZvciBDbG9zdXJlIENvbXBpbGVyXHJcbi8vIGJlY2F1c2Ugb2YgdGhlIHVzZSBvZiB0aGUgZXh0ZW5kL2NyZWF0ZSBjbGFzcyBtZXRob2RzXHJcbi8vIElmIHdlIGRpZG4ndCBkbyB0aGlzLCB0aG9zZSBmdW5jdGlvbnMgd291bGQgZ2V0IGZsYXR0ZW5kIHRvIHNvbWV0aGluZyBsaWtlXHJcbi8vIGBhID0gLi4uYCBhbmQgYHRoaXMucHJvdG90eXBlYCB3b3VsZCByZWZlciB0byB0aGUgZ2xvYmFsIG9iamVjdCBpbnN0ZWFkIG9mXHJcbi8vIENvcmVPYmplY3RcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIE9iamVjdFxyXG4gKlxyXG4gKiAgICAgdmFyIEFuaW1hbCA9IENvcmVPYmplY3QuZXh0ZW5kKCk7XHJcbiAqICAgICB2YXIgSG9yc2UgPSBBbmltYWwuZXh0ZW5kKCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcyBGdW5jdGlvbnMgYW5kIHByb3BlcnRpZXMgdG8gYmUgYXBwbGllZCB0byB0aGVcclxuICogICAgICAgICAgICAgICAgICAgICAgIG5ldyBvYmplY3QncyBwcm90b3R5cGVcclxuICogQHJldHVybiB7dmpzLkNvcmVPYmplY3R9IEFuIG9iamVjdCB0aGF0IGluaGVyaXRzIGZyb20gQ29yZU9iamVjdFxyXG4gKiBAdGhpcyB7Kn1cclxuICovXHJcbnZqcy5Db3JlT2JqZWN0LmV4dGVuZCA9IGZ1bmN0aW9uKHByb3BzKXtcclxuICB2YXIgaW5pdCwgc3ViT2JqO1xyXG5cclxuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gIC8vIFNldCB1cCB0aGUgY29uc3RydWN0b3IgdXNpbmcgdGhlIHN1cHBsaWVkIGluaXQgbWV0aG9kXHJcbiAgLy8gb3IgdXNpbmcgdGhlIGluaXQgb2YgdGhlIHBhcmVudCBvYmplY3RcclxuICAvLyBNYWtlIHN1cmUgdG8gY2hlY2sgdGhlIHVub2JmdXNjYXRlZCB2ZXJzaW9uIGZvciBleHRlcm5hbCBsaWJzXHJcbiAgaW5pdCA9IHByb3BzWydpbml0J10gfHwgcHJvcHMuaW5pdCB8fCB0aGlzLnByb3RvdHlwZVsnaW5pdCddIHx8IHRoaXMucHJvdG90eXBlLmluaXQgfHwgZnVuY3Rpb24oKXt9O1xyXG4gIC8vIEluIFJlc2lnJ3Mgc2ltcGxlIGNsYXNzIGluaGVyaXRhbmNlIChwcmV2aW91c2x5IHVzZWQpIHRoZSBjb25zdHJ1Y3RvclxyXG4gIC8vICBpcyBhIGZ1bmN0aW9uIHRoYXQgY2FsbHMgYHRoaXMuaW5pdC5hcHBseShhcmd1bWVudHMpYFxyXG4gIC8vIEhvd2V2ZXIgdGhhdCB3b3VsZCBwcmV2ZW50IHVzIGZyb20gdXNpbmcgYFBhcmVudE9iamVjdC5jYWxsKHRoaXMpO2BcclxuICAvLyAgaW4gYSBDaGlsZCBjb25zdHVjdG9yIGJlY2F1c2UgdGhlIGB0aGlzYCBpbiBgdGhpcy5pbml0YFxyXG4gIC8vICB3b3VsZCBzdGlsbCByZWZlciB0byB0aGUgQ2hpbGQgYW5kIGNhdXNlIGFuIGluaWZpbml0ZSBsb29wLlxyXG4gIC8vIFdlIHdvdWxkIGluc3RlYWQgaGF2ZSB0byBkb1xyXG4gIC8vICAgIGBQYXJlbnRPYmplY3QucHJvdG90eXBlLmluaXQuYXBwbHkodGhpcywgYXJndW1uZW50cyk7YFxyXG4gIC8vICBCbGVoLiBXZSdyZSBub3QgY3JlYXRpbmcgYSBfc3VwZXIoKSBmdW5jdGlvbiwgc28gaXQncyBnb29kIHRvIGtlZXBcclxuICAvLyAgdGhlIHBhcmVudCBjb25zdHJ1Y3RvciByZWZlcmVuY2Ugc2ltcGxlLlxyXG4gIHN1Yk9iaiA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpbml0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfTtcclxuXHJcbiAgLy8gSW5oZXJpdCBmcm9tIHRoaXMgb2JqZWN0J3MgcHJvdG90eXBlXHJcbiAgc3ViT2JqLnByb3RvdHlwZSA9IHZqcy5vYmouY3JlYXRlKHRoaXMucHJvdG90eXBlKTtcclxuICAvLyBSZXNldCB0aGUgY29uc3RydWN0b3IgcHJvcGVydHkgZm9yIHN1Yk9iaiBvdGhlcndpc2VcclxuICAvLyBpbnN0YW5jZXMgb2Ygc3ViT2JqIHdvdWxkIGhhdmUgdGhlIGNvbnN0cnVjdG9yIG9mIHRoZSBwYXJlbnQgT2JqZWN0XHJcbiAgc3ViT2JqLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IHN1Yk9iajtcclxuXHJcbiAgLy8gTWFrZSB0aGUgY2xhc3MgZXh0ZW5kYWJsZVxyXG4gIHN1Yk9iai5leHRlbmQgPSB2anMuQ29yZU9iamVjdC5leHRlbmQ7XHJcbiAgLy8gTWFrZSBhIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBpbnN0YW5jZXNcclxuICBzdWJPYmouY3JlYXRlID0gdmpzLkNvcmVPYmplY3QuY3JlYXRlO1xyXG5cclxuICAvLyBFeHRlbmQgc3ViT2JqJ3MgcHJvdG90eXBlIHdpdGggZnVuY3Rpb25zIGFuZCBvdGhlciBwcm9wZXJ0aWVzIGZyb20gcHJvcHNcclxuICBmb3IgKHZhciBuYW1lIGluIHByb3BzKSB7XHJcbiAgICBpZiAocHJvcHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcclxuICAgICAgc3ViT2JqLnByb3RvdHlwZVtuYW1lXSA9IHByb3BzW25hbWVdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN1Yk9iajtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgaW5zdGFjZSBvZiB0aGlzIE9iamVjdCBjbGFzc1xyXG4gKlxyXG4gKiAgICAgdmFyIG15QW5pbWFsID0gQW5pbWFsLmNyZWF0ZSgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29yZU9iamVjdH0gQW4gaW5zdGFuY2Ugb2YgYSBDb3JlT2JqZWN0IHN1YmNsYXNzXHJcbiAqIEB0aGlzIHsqfVxyXG4gKi9cclxudmpzLkNvcmVPYmplY3QuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuICAvLyBDcmVhdGUgYSBuZXcgb2JqZWN0IHRoYXQgaW5oZXJpdHMgZnJvbSB0aGlzIG9iamVjdCdzIHByb3RvdHlwZVxyXG4gIHZhciBpbnN0ID0gdmpzLm9iai5jcmVhdGUodGhpcy5wcm90b3R5cGUpO1xyXG5cclxuICAvLyBBcHBseSB0aGlzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIHRoZSBuZXcgb2JqZWN0XHJcbiAgdGhpcy5hcHBseShpbnN0LCBhcmd1bWVudHMpO1xyXG5cclxuICAvLyBSZXR1cm4gdGhlIG5ldyBvYmplY3RcclxuICByZXR1cm4gaW5zdDtcclxufTtcclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgRXZlbnQgU3lzdGVtIChKb2huIFJlc2lnIC0gU2VjcmV0cyBvZiBhIEpTIE5pbmphIGh0dHA6Ly9qc25pbmphLmNvbS8pXHJcbiAqIChPcmlnaW5hbCBib29rIHZlcnNpb24gd2Fzbid0IGNvbXBsZXRlbHkgdXNhYmxlLCBzbyBmaXhlZCBzb21lIHRoaW5ncyBhbmQgbWFkZSBDbG9zdXJlIENvbXBpbGVyIGNvbXBhdGlibGUpXHJcbiAqIFRoaXMgc2hvdWxkIHdvcmsgdmVyeSBzaW1pbGFybHkgdG8galF1ZXJ5J3MgZXZlbnRzLCBob3dldmVyIGl0J3MgYmFzZWQgb2ZmIHRoZSBib29rIHZlcnNpb24gd2hpY2ggaXNuJ3QgYXNcclxuICogcm9idXN0IGFzIGpxdWVyeSdzLCBzbyB0aGVyZSdzIHByb2JhYmx5IHNvbWUgZGlmZmVyZW5jZXMuXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhbiBldmVudCBsaXN0ZW5lciB0byBlbGVtZW50XHJcbiAqIEl0IHN0b3JlcyB0aGUgaGFuZGxlciBmdW5jdGlvbiBpbiBhIHNlcGFyYXRlIGNhY2hlIG9iamVjdFxyXG4gKiBhbmQgYWRkcyBhIGdlbmVyaWMgaGFuZGxlciB0byB0aGUgZWxlbWVudCdzIGV2ZW50LFxyXG4gKiBhbG9uZyB3aXRoIGEgdW5pcXVlIGlkIChndWlkKSB0byB0aGUgZWxlbWVudC5cclxuICogQHBhcmFtICB7RWxlbWVudHxPYmplY3R9ICAgZWxlbSBFbGVtZW50IG9yIG9iamVjdCB0byBiaW5kIGxpc3RlbmVycyB0b1xyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdHlwZSBUeXBlIG9mIGV2ZW50IHRvIGJpbmQgdG8uXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgIEV2ZW50IGxpc3RlbmVyLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9uID0gZnVuY3Rpb24oZWxlbSwgdHlwZSwgZm4pe1xyXG4gIHZhciBkYXRhID0gdmpzLmdldERhdGEoZWxlbSk7XHJcblxyXG4gIC8vIFdlIG5lZWQgYSBwbGFjZSB0byBzdG9yZSBhbGwgb3VyIGhhbmRsZXIgZGF0YVxyXG4gIGlmICghZGF0YS5oYW5kbGVycykgZGF0YS5oYW5kbGVycyA9IHt9O1xyXG5cclxuICBpZiAoIWRhdGEuaGFuZGxlcnNbdHlwZV0pIGRhdGEuaGFuZGxlcnNbdHlwZV0gPSBbXTtcclxuXHJcbiAgaWYgKCFmbi5ndWlkKSBmbi5ndWlkID0gdmpzLmd1aWQrKztcclxuXHJcbiAgZGF0YS5oYW5kbGVyc1t0eXBlXS5wdXNoKGZuKTtcclxuXHJcbiAgaWYgKCFkYXRhLmRpc3BhdGNoZXIpIHtcclxuICAgIGRhdGEuZGlzYWJsZWQgPSBmYWxzZTtcclxuXHJcbiAgICBkYXRhLmRpc3BhdGNoZXIgPSBmdW5jdGlvbiAoZXZlbnQpe1xyXG5cclxuICAgICAgaWYgKGRhdGEuZGlzYWJsZWQpIHJldHVybjtcclxuICAgICAgZXZlbnQgPSB2anMuZml4RXZlbnQoZXZlbnQpO1xyXG5cclxuICAgICAgdmFyIGhhbmRsZXJzID0gZGF0YS5oYW5kbGVyc1tldmVudC50eXBlXTtcclxuXHJcbiAgICAgIGlmIChoYW5kbGVycykge1xyXG4gICAgICAgIC8vIENvcHkgaGFuZGxlcnMgc28gaWYgaGFuZGxlcnMgYXJlIGFkZGVkL3JlbW92ZWQgZHVyaW5nIHRoZSBwcm9jZXNzIGl0IGRvZXNuJ3QgdGhyb3cgZXZlcnl0aGluZyBvZmYuXHJcbiAgICAgICAgdmFyIGhhbmRsZXJzQ29weSA9IGhhbmRsZXJzLnNsaWNlKDApO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBtID0gMCwgbiA9IGhhbmRsZXJzQ29weS5sZW5ndGg7IG0gPCBuOyBtKyspIHtcclxuICAgICAgICAgIGlmIChldmVudC5pc0ltbWVkaWF0ZVByb3BhZ2F0aW9uU3RvcHBlZCgpKSB7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGFuZGxlcnNDb3B5W21dLmNhbGwoZWxlbSwgZXZlbnQpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIGlmIChkYXRhLmhhbmRsZXJzW3R5cGVdLmxlbmd0aCA9PSAxKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xyXG4gICAgICBlbGVtLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgZGF0YS5kaXNwYXRjaGVyLCBmYWxzZSk7XHJcbiAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgIGVsZW0uYXR0YWNoRXZlbnQoJ29uJyArIHR5cGUsIGRhdGEuZGlzcGF0Y2hlcik7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZyb20gYW4gZWxlbWVudFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gICBlbGVtIE9iamVjdCB0byByZW1vdmUgbGlzdGVuZXJzIGZyb21cclxuICogQHBhcmFtICB7U3RyaW5nPX0gICB0eXBlIFR5cGUgb2YgbGlzdGVuZXIgdG8gcmVtb3ZlLiBEb24ndCBpbmNsdWRlIHRvIHJlbW92ZSBhbGwgZXZlbnRzIGZyb20gZWxlbWVudC5cclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgU3BlY2lmaWMgbGlzdGVuZXIgdG8gcmVtb3ZlLiBEb24ndCBpbmNsZHVlIHRvIHJlbW92ZSBsaXN0ZW5lcnMgZm9yIGFuIGV2ZW50IHR5cGUuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2ZmID0gZnVuY3Rpb24oZWxlbSwgdHlwZSwgZm4pIHtcclxuICAvLyBEb24ndCB3YW50IHRvIGFkZCBhIGNhY2hlIG9iamVjdCB0aHJvdWdoIGdldERhdGEgaWYgbm90IG5lZWRlZFxyXG4gIGlmICghdmpzLmhhc0RhdGEoZWxlbSkpIHJldHVybjtcclxuXHJcbiAgdmFyIGRhdGEgPSB2anMuZ2V0RGF0YShlbGVtKTtcclxuXHJcbiAgLy8gSWYgbm8gZXZlbnRzIGV4aXN0LCBub3RoaW5nIHRvIHVuYmluZFxyXG4gIGlmICghZGF0YS5oYW5kbGVycykgeyByZXR1cm47IH1cclxuXHJcbiAgLy8gVXRpbGl0eSBmdW5jdGlvblxyXG4gIHZhciByZW1vdmVUeXBlID0gZnVuY3Rpb24odCl7XHJcbiAgICAgZGF0YS5oYW5kbGVyc1t0XSA9IFtdO1xyXG4gICAgIHZqcy5jbGVhblVwRXZlbnRzKGVsZW0sdCk7XHJcbiAgfTtcclxuXHJcbiAgLy8gQXJlIHdlIHJlbW92aW5nIGFsbCBib3VuZCBldmVudHM/XHJcbiAgaWYgKCF0eXBlKSB7XHJcbiAgICBmb3IgKHZhciB0IGluIGRhdGEuaGFuZGxlcnMpIHJlbW92ZVR5cGUodCk7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2YXIgaGFuZGxlcnMgPSBkYXRhLmhhbmRsZXJzW3R5cGVdO1xyXG5cclxuICAvLyBJZiBubyBoYW5kbGVycyBleGlzdCwgbm90aGluZyB0byB1bmJpbmRcclxuICBpZiAoIWhhbmRsZXJzKSByZXR1cm47XHJcblxyXG4gIC8vIElmIG5vIGxpc3RlbmVyIHdhcyBwcm92aWRlZCwgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHR5cGVcclxuICBpZiAoIWZuKSB7XHJcbiAgICByZW1vdmVUeXBlKHR5cGUpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8gV2UncmUgb25seSByZW1vdmluZyBhIHNpbmdsZSBoYW5kbGVyXHJcbiAgaWYgKGZuLmd1aWQpIHtcclxuICAgIGZvciAodmFyIG4gPSAwOyBuIDwgaGFuZGxlcnMubGVuZ3RoOyBuKyspIHtcclxuICAgICAgaWYgKGhhbmRsZXJzW25dLmd1aWQgPT09IGZuLmd1aWQpIHtcclxuICAgICAgICBoYW5kbGVycy5zcGxpY2Uobi0tLCAxKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdmpzLmNsZWFuVXBFdmVudHMoZWxlbSwgdHlwZSk7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2xlYW4gdXAgdGhlIGxpc3RlbmVyIGNhY2hlIGFuZCBkaXNwYXRjaGVyc1xyXG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gZWxlbSBFbGVtZW50IHRvIGNsZWFuIHVwXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdHlwZSBUeXBlIG9mIGV2ZW50IHRvIGNsZWFuIHVwXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuY2xlYW5VcEV2ZW50cyA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUpIHtcclxuICB2YXIgZGF0YSA9IHZqcy5nZXREYXRhKGVsZW0pO1xyXG5cclxuICAvLyBSZW1vdmUgdGhlIGV2ZW50cyBvZiBhIHBhcnRpY3VsYXIgdHlwZSBpZiB0aGVyZSBhcmUgbm9uZSBsZWZ0XHJcbiAgaWYgKGRhdGEuaGFuZGxlcnNbdHlwZV0ubGVuZ3RoID09PSAwKSB7XHJcbiAgICBkZWxldGUgZGF0YS5oYW5kbGVyc1t0eXBlXTtcclxuICAgIC8vIGRhdGEuaGFuZGxlcnNbdHlwZV0gPSBudWxsO1xyXG4gICAgLy8gU2V0dGluZyB0byBudWxsIHdhcyBjYXVzaW5nIGFuIGVycm9yIHdpdGggZGF0YS5oYW5kbGVyc1xyXG5cclxuICAgIC8vIFJlbW92ZSB0aGUgbWV0YS1oYW5kbGVyIGZyb20gdGhlIGVsZW1lbnRcclxuICAgIGlmIChkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKSB7XHJcbiAgICAgIGVsZW0ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBkYXRhLmRpc3BhdGNoZXIsIGZhbHNlKTtcclxuICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZGV0YWNoRXZlbnQpIHtcclxuICAgICAgZWxlbS5kZXRhY2hFdmVudCgnb24nICsgdHlwZSwgZGF0YS5kaXNwYXRjaGVyKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIFJlbW92ZSB0aGUgZXZlbnRzIG9iamVjdCBpZiB0aGVyZSBhcmUgbm8gdHlwZXMgbGVmdFxyXG4gIGlmICh2anMuaXNFbXB0eShkYXRhLmhhbmRsZXJzKSkge1xyXG4gICAgZGVsZXRlIGRhdGEuaGFuZGxlcnM7XHJcbiAgICBkZWxldGUgZGF0YS5kaXNwYXRjaGVyO1xyXG4gICAgZGVsZXRlIGRhdGEuZGlzYWJsZWQ7XHJcblxyXG4gICAgLy8gZGF0YS5oYW5kbGVycyA9IG51bGw7XHJcbiAgICAvLyBkYXRhLmRpc3BhdGNoZXIgPSBudWxsO1xyXG4gICAgLy8gZGF0YS5kaXNhYmxlZCA9IG51bGw7XHJcbiAgfVxyXG5cclxuICAvLyBGaW5hbGx5IHJlbW92ZSB0aGUgZXhwYW5kbyBpZiB0aGVyZSBpcyBubyBkYXRhIGxlZnRcclxuICBpZiAodmpzLmlzRW1wdHkoZGF0YSkpIHtcclxuICAgIHZqcy5yZW1vdmVEYXRhKGVsZW0pO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXggYSBuYXRpdmUgZXZlbnQgdG8gaGF2ZSBzdGFuZGFyZCBwcm9wZXJ0eSB2YWx1ZXNcclxuICogQHBhcmFtICB7T2JqZWN0fSBldmVudCBFdmVudCBvYmplY3QgdG8gZml4XHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5maXhFdmVudCA9IGZ1bmN0aW9uKGV2ZW50KSB7XHJcblxyXG4gIGZ1bmN0aW9uIHJldHVyblRydWUoKSB7IHJldHVybiB0cnVlOyB9XHJcbiAgZnVuY3Rpb24gcmV0dXJuRmFsc2UoKSB7IHJldHVybiBmYWxzZTsgfVxyXG5cclxuICAvLyBUZXN0IGlmIGZpeGluZyB1cCBpcyBuZWVkZWRcclxuICAvLyBVc2VkIHRvIGNoZWNrIGlmICFldmVudC5zdG9wUHJvcGFnYXRpb24gaW5zdGVhZCBvZiBpc1Byb3BhZ2F0aW9uU3RvcHBlZFxyXG4gIC8vIEJ1dCBuYXRpdmUgZXZlbnRzIHJldHVybiB0cnVlIGZvciBzdG9wUHJvcGFnYXRpb24sIGJ1dCBkb24ndCBoYXZlXHJcbiAgLy8gb3RoZXIgZXhwZWN0ZWQgbWV0aG9kcyBsaWtlIGlzUHJvcGFnYXRpb25TdG9wcGVkLiBTZWVtcyB0byBiZSBhIHByb2JsZW1cclxuICAvLyB3aXRoIHRoZSBKYXZhc2NyaXB0IE5pbmphIGNvZGUuIFNvIHdlJ3JlIGp1c3Qgb3ZlcnJpZGluZyBhbGwgZXZlbnRzIG5vdy5cclxuICBpZiAoIWV2ZW50IHx8ICFldmVudC5pc1Byb3BhZ2F0aW9uU3RvcHBlZCkge1xyXG4gICAgdmFyIG9sZCA9IGV2ZW50IHx8IHdpbmRvdy5ldmVudDtcclxuXHJcbiAgICBldmVudCA9IHt9O1xyXG4gICAgLy8gQ2xvbmUgdGhlIG9sZCBvYmplY3Qgc28gdGhhdCB3ZSBjYW4gbW9kaWZ5IHRoZSB2YWx1ZXMgZXZlbnQgPSB7fTtcclxuICAgIC8vIElFOCBEb2Vzbid0IGxpa2Ugd2hlbiB5b3UgbWVzcyB3aXRoIG5hdGl2ZSBldmVudCBwcm9wZXJ0aWVzXHJcbiAgICAvLyBGaXJlZm94IHJldHVybnMgZmFsc2UgZm9yIGV2ZW50Lmhhc093blByb3BlcnR5KCd0eXBlJykgYW5kIG90aGVyIHByb3BzXHJcbiAgICAvLyAgd2hpY2ggbWFrZXMgY29weWluZyBtb3JlIGRpZmZpY3VsdC5cclxuICAgIC8vIFRPRE86IFByb2JhYmx5IGJlc3QgdG8gY3JlYXRlIGEgd2hpdGVsaXN0IG9mIGV2ZW50IHByb3BzXHJcbiAgICBmb3IgKHZhciBrZXkgaW4gb2xkKSB7XHJcbiAgICAgIC8vIFNhZmFyaSA2LjAuMyB3YXJucyB5b3UgaWYgeW91IHRyeSB0byBjb3B5IGRlcHJlY2F0ZWQgbGF5ZXJYL1lcclxuICAgICAgaWYgKGtleSAhPT0gJ2xheWVyWCcgJiYga2V5ICE9PSAnbGF5ZXJZJykge1xyXG4gICAgICAgIGV2ZW50W2tleV0gPSBvbGRba2V5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFRoZSBldmVudCBvY2N1cnJlZCBvbiB0aGlzIGVsZW1lbnRcclxuICAgIGlmICghZXZlbnQudGFyZ2V0KSB7XHJcbiAgICAgIGV2ZW50LnRhcmdldCA9IGV2ZW50LnNyY0VsZW1lbnQgfHwgZG9jdW1lbnQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSGFuZGxlIHdoaWNoIG90aGVyIGVsZW1lbnQgdGhlIGV2ZW50IGlzIHJlbGF0ZWQgdG9cclxuICAgIGV2ZW50LnJlbGF0ZWRUYXJnZXQgPSBldmVudC5mcm9tRWxlbWVudCA9PT0gZXZlbnQudGFyZ2V0ID9cclxuICAgICAgZXZlbnQudG9FbGVtZW50IDpcclxuICAgICAgZXZlbnQuZnJvbUVsZW1lbnQ7XHJcblxyXG4gICAgLy8gU3RvcCB0aGUgZGVmYXVsdCBicm93c2VyIGFjdGlvblxyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChvbGQucHJldmVudERlZmF1bHQpIHtcclxuICAgICAgICBvbGQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgfVxyXG4gICAgICBldmVudC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xyXG4gICAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5UcnVlO1xyXG4gICAgfTtcclxuXHJcbiAgICBldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQgPSByZXR1cm5GYWxzZTtcclxuXHJcbiAgICAvLyBTdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nXHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGlmIChvbGQuc3RvcFByb3BhZ2F0aW9uKSB7XHJcbiAgICAgICAgb2xkLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB9XHJcbiAgICAgIGV2ZW50LmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICAgIGV2ZW50LmlzUHJvcGFnYXRpb25TdG9wcGVkID0gcmV0dXJuVHJ1ZTtcclxuICAgIH07XHJcblxyXG4gICAgZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5GYWxzZTtcclxuXHJcbiAgICAvLyBTdG9wIHRoZSBldmVudCBmcm9tIGJ1YmJsaW5nIGFuZCBleGVjdXRpbmcgb3RoZXIgaGFuZGxlcnNcclxuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgaWYgKG9sZC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24pIHtcclxuICAgICAgICBvbGQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5UcnVlO1xyXG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH07XHJcblxyXG4gICAgZXZlbnQuaXNJbW1lZGlhdGVQcm9wYWdhdGlvblN0b3BwZWQgPSByZXR1cm5GYWxzZTtcclxuXHJcbiAgICAvLyBIYW5kbGUgbW91c2UgcG9zaXRpb25cclxuICAgIGlmIChldmVudC5jbGllbnRYICE9IG51bGwpIHtcclxuICAgICAgdmFyIGRvYyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgYm9keSA9IGRvY3VtZW50LmJvZHk7XHJcblxyXG4gICAgICBldmVudC5wYWdlWCA9IGV2ZW50LmNsaWVudFggK1xyXG4gICAgICAgIChkb2MgJiYgZG9jLnNjcm9sbExlZnQgfHwgYm9keSAmJiBib2R5LnNjcm9sbExlZnQgfHwgMCkgLVxyXG4gICAgICAgIChkb2MgJiYgZG9jLmNsaWVudExlZnQgfHwgYm9keSAmJiBib2R5LmNsaWVudExlZnQgfHwgMCk7XHJcbiAgICAgIGV2ZW50LnBhZ2VZID0gZXZlbnQuY2xpZW50WSArXHJcbiAgICAgICAgKGRvYyAmJiBkb2Muc2Nyb2xsVG9wIHx8IGJvZHkgJiYgYm9keS5zY3JvbGxUb3AgfHwgMCkgLVxyXG4gICAgICAgIChkb2MgJiYgZG9jLmNsaWVudFRvcCB8fCBib2R5ICYmIGJvZHkuY2xpZW50VG9wIHx8IDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEhhbmRsZSBrZXkgcHJlc3Nlc1xyXG4gICAgZXZlbnQud2hpY2ggPSBldmVudC5jaGFyQ29kZSB8fCBldmVudC5rZXlDb2RlO1xyXG5cclxuICAgIC8vIEZpeCBidXR0b24gZm9yIG1vdXNlIGNsaWNrczpcclxuICAgIC8vIDAgPT0gbGVmdDsgMSA9PSBtaWRkbGU7IDIgPT0gcmlnaHRcclxuICAgIGlmIChldmVudC5idXR0b24gIT0gbnVsbCkge1xyXG4gICAgICBldmVudC5idXR0b24gPSAoZXZlbnQuYnV0dG9uICYgMSA/IDAgOlxyXG4gICAgICAgIChldmVudC5idXR0b24gJiA0ID8gMSA6XHJcbiAgICAgICAgICAoZXZlbnQuYnV0dG9uICYgMiA/IDIgOiAwKSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJucyBmaXhlZC11cCBpbnN0YW5jZVxyXG4gIHJldHVybiBldmVudDtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VyIGFuIGV2ZW50IGZvciBhbiBlbGVtZW50XHJcbiAqIEBwYXJhbSAge0VsZW1lbnR8T2JqZWN0fSBlbGVtICBFbGVtZW50IHRvIHRyaWdnZXIgYW4gZXZlbnQgb25cclxuICogQHBhcmFtICB7U3RyaW5nfSBldmVudCBUeXBlIG9mIGV2ZW50IHRvIHRyaWdnZXJcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy50cmlnZ2VyID0gZnVuY3Rpb24oZWxlbSwgZXZlbnQpIHtcclxuICAvLyBGZXRjaGVzIGVsZW1lbnQgZGF0YSBhbmQgYSByZWZlcmVuY2UgdG8gdGhlIHBhcmVudCAoZm9yIGJ1YmJsaW5nKS5cclxuICAvLyBEb24ndCB3YW50IHRvIGFkZCBhIGRhdGEgb2JqZWN0IHRvIGNhY2hlIGZvciBldmVyeSBwYXJlbnQsXHJcbiAgLy8gc28gY2hlY2tpbmcgaGFzRGF0YSBmaXJzdC5cclxuICB2YXIgZWxlbURhdGEgPSAodmpzLmhhc0RhdGEoZWxlbSkpID8gdmpzLmdldERhdGEoZWxlbSkgOiB7fTtcclxuICB2YXIgcGFyZW50ID0gZWxlbS5wYXJlbnROb2RlIHx8IGVsZW0ub3duZXJEb2N1bWVudDtcclxuICAgICAgLy8gdHlwZSA9IGV2ZW50LnR5cGUgfHwgZXZlbnQsXHJcbiAgICAgIC8vIGhhbmRsZXI7XHJcblxyXG4gIC8vIElmIGFuIGV2ZW50IG5hbWUgd2FzIHBhc3NlZCBhcyBhIHN0cmluZywgY3JlYXRlcyBhbiBldmVudCBvdXQgb2YgaXRcclxuICBpZiAodHlwZW9mIGV2ZW50ID09PSAnc3RyaW5nJykge1xyXG4gICAgZXZlbnQgPSB7IHR5cGU6ZXZlbnQsIHRhcmdldDplbGVtIH07XHJcbiAgfVxyXG4gIC8vIE5vcm1hbGl6ZXMgdGhlIGV2ZW50IHByb3BlcnRpZXMuXHJcbiAgZXZlbnQgPSB2anMuZml4RXZlbnQoZXZlbnQpO1xyXG5cclxuICAvLyBJZiB0aGUgcGFzc2VkIGVsZW1lbnQgaGFzIGEgZGlzcGF0Y2hlciwgZXhlY3V0ZXMgdGhlIGVzdGFibGlzaGVkIGhhbmRsZXJzLlxyXG4gIGlmIChlbGVtRGF0YS5kaXNwYXRjaGVyKSB7XHJcbiAgICBlbGVtRGF0YS5kaXNwYXRjaGVyLmNhbGwoZWxlbSwgZXZlbnQpO1xyXG4gIH1cclxuXHJcbiAgLy8gVW5sZXNzIGV4cGxpY2l0bHkgc3RvcHBlZCBvciB0aGUgZXZlbnQgZG9lcyBub3QgYnViYmxlIChlLmcuIG1lZGlhIGV2ZW50cylcclxuICAgIC8vIHJlY3Vyc2l2ZWx5IGNhbGxzIHRoaXMgZnVuY3Rpb24gdG8gYnViYmxlIHRoZSBldmVudCB1cCB0aGUgRE9NLlxyXG4gICAgaWYgKHBhcmVudCAmJiAhZXZlbnQuaXNQcm9wYWdhdGlvblN0b3BwZWQoKSAmJiBldmVudC5idWJibGVzICE9PSBmYWxzZSkge1xyXG4gICAgdmpzLnRyaWdnZXIocGFyZW50LCBldmVudCk7XHJcblxyXG4gIC8vIElmIGF0IHRoZSB0b3Agb2YgdGhlIERPTSwgdHJpZ2dlcnMgdGhlIGRlZmF1bHQgYWN0aW9uIHVubGVzcyBkaXNhYmxlZC5cclxuICB9IGVsc2UgaWYgKCFwYXJlbnQgJiYgIWV2ZW50LmlzRGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICB2YXIgdGFyZ2V0RGF0YSA9IHZqcy5nZXREYXRhKGV2ZW50LnRhcmdldCk7XHJcblxyXG4gICAgLy8gQ2hlY2tzIGlmIHRoZSB0YXJnZXQgaGFzIGEgZGVmYXVsdCBhY3Rpb24gZm9yIHRoaXMgZXZlbnQuXHJcbiAgICBpZiAoZXZlbnQudGFyZ2V0W2V2ZW50LnR5cGVdKSB7XHJcbiAgICAgIC8vIFRlbXBvcmFyaWx5IGRpc2FibGVzIGV2ZW50IGRpc3BhdGNoaW5nIG9uIHRoZSB0YXJnZXQgYXMgd2UgaGF2ZSBhbHJlYWR5IGV4ZWN1dGVkIHRoZSBoYW5kbGVyLlxyXG4gICAgICB0YXJnZXREYXRhLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgLy8gRXhlY3V0ZXMgdGhlIGRlZmF1bHQgYWN0aW9uLlxyXG4gICAgICBpZiAodHlwZW9mIGV2ZW50LnRhcmdldFtldmVudC50eXBlXSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGV2ZW50LnRhcmdldFtldmVudC50eXBlXSgpO1xyXG4gICAgICB9XHJcbiAgICAgIC8vIFJlLWVuYWJsZXMgZXZlbnQgZGlzcGF0Y2hpbmcuXHJcbiAgICAgIHRhcmdldERhdGEuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIEluZm9ybSB0aGUgdHJpZ2dlcmVyIGlmIHRoZSBkZWZhdWx0IHdhcyBwcmV2ZW50ZWQgYnkgcmV0dXJuaW5nIGZhbHNlXHJcbiAgcmV0dXJuICFldmVudC5pc0RlZmF1bHRQcmV2ZW50ZWQoKTtcclxuICAvKiBPcmlnaW5hbCB2ZXJzaW9uIG9mIGpzIG5pbmphIGV2ZW50cyB3YXNuJ3QgY29tcGxldGUuXHJcbiAgICogV2UndmUgc2luY2UgdXBkYXRlZCB0byB0aGUgbGF0ZXN0IHZlcnNpb24sIGJ1dCBrZWVwaW5nIHRoaXMgYXJvdW5kXHJcbiAgICogZm9yIG5vdyBqdXN0IGluIGNhc2UuXHJcbiAgICovXHJcbiAgLy8gLy8gQWRkZWQgaW4gYXR0aW9uIHRvIGJvb2suIEJvb2sgY29kZSB3YXMgYnJva2UuXHJcbiAgLy8gZXZlbnQgPSB0eXBlb2YgZXZlbnQgPT09ICdvYmplY3QnID9cclxuICAvLyAgIGV2ZW50W3Zqcy5leHBhbmRvXSA/XHJcbiAgLy8gICAgIGV2ZW50IDpcclxuICAvLyAgICAgbmV3IHZqcy5FdmVudCh0eXBlLCBldmVudCkgOlxyXG4gIC8vICAgbmV3IHZqcy5FdmVudCh0eXBlKTtcclxuXHJcbiAgLy8gZXZlbnQudHlwZSA9IHR5cGU7XHJcbiAgLy8gaWYgKGhhbmRsZXIpIHtcclxuICAvLyAgIGhhbmRsZXIuY2FsbChlbGVtLCBldmVudCk7XHJcbiAgLy8gfVxyXG5cclxuICAvLyAvLyBDbGVhbiB1cCB0aGUgZXZlbnQgaW4gY2FzZSBpdCBpcyBiZWluZyByZXVzZWRcclxuICAvLyBldmVudC5yZXN1bHQgPSB1bmRlZmluZWQ7XHJcbiAgLy8gZXZlbnQudGFyZ2V0ID0gZWxlbTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUcmlnZ2VyIGEgbGlzdGVuZXIgb25seSBvbmNlIGZvciBhbiBldmVudFxyXG4gKiBAcGFyYW0gIHtFbGVtZW50fE9iamVjdH0gICBlbGVtIEVsZW1lbnQgb3Igb2JqZWN0IHRvXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gICB0eXBlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmblxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9uZSA9IGZ1bmN0aW9uKGVsZW0sIHR5cGUsIGZuKSB7XHJcbiAgdmFyIGZ1bmMgPSBmdW5jdGlvbigpe1xyXG4gICAgdmpzLm9mZihlbGVtLCB0eXBlLCBmdW5jKTtcclxuICAgIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgfTtcclxuICBmdW5jLmd1aWQgPSBmbi5ndWlkID0gZm4uZ3VpZCB8fCB2anMuZ3VpZCsrO1xyXG4gIHZqcy5vbihlbGVtLCB0eXBlLCBmdW5jKTtcclxufTtcclxudmFyIGhhc093blByb3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZXMgYW4gZWxlbWVudCBhbmQgYXBwbGllcyBwcm9wZXJ0aWVzLlxyXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSB0YWdOYW1lICAgIE5hbWUgb2YgdGFnIHRvIGJlIGNyZWF0ZWQuXHJcbiAqIEBwYXJhbSAge09iamVjdD19IHByb3BlcnRpZXMgRWxlbWVudCBwcm9wZXJ0aWVzIHRvIGJlIGFwcGxpZWQuXHJcbiAqIEByZXR1cm4ge0VsZW1lbnR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuY3JlYXRlRWwgPSBmdW5jdGlvbih0YWdOYW1lLCBwcm9wZXJ0aWVzKXtcclxuICB2YXIgZWwsIHByb3BOYW1lO1xyXG5cclxuICBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSB8fCAnZGl2Jyk7XHJcblxyXG4gIGZvciAocHJvcE5hbWUgaW4gcHJvcGVydGllcyl7XHJcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKHByb3BlcnRpZXMsIHByb3BOYW1lKSkge1xyXG4gICAgICAvL2VsW3Byb3BOYW1lXSA9IHByb3BlcnRpZXNbcHJvcE5hbWVdO1xyXG4gICAgICAvLyBOb3QgcmVtZW1iZXJpbmcgd2h5IHdlIHdlcmUgY2hlY2tpbmcgZm9yIGRhc2hcclxuICAgICAgLy8gYnV0IHVzaW5nIHNldEF0dHJpYnV0ZSBtZWFucyB5b3UgaGF2ZSB0byB1c2UgZ2V0QXR0cmlidXRlXHJcblxyXG4gICAgICAvLyBUaGUgY2hlY2sgZm9yIGRhc2ggY2hlY2tzIGZvciB0aGUgYXJpYS0qIGF0dHJpYnV0ZXMsIGxpa2UgYXJpYS1sYWJlbCwgYXJpYS12YWx1ZW1pbi5cclxuICAgICAgLy8gVGhlIGFkZGl0aW9uYWwgY2hlY2sgZm9yIFwicm9sZVwiIGlzIGJlY2F1c2UgdGhlIGRlZmF1bHQgbWV0aG9kIGZvciBhZGRpbmcgYXR0cmlidXRlcyBkb2VzIG5vdFxyXG4gICAgICAvLyBhZGQgdGhlIGF0dHJpYnV0ZSBcInJvbGVcIi4gTXkgZ3Vlc3MgaXMgYmVjYXVzZSBpdCdzIG5vdCBhIHZhbGlkIGF0dHJpYnV0ZSBpbiBzb21lIG5hbWVzcGFjZXMsIGFsdGhvdWdoXHJcbiAgICAgIC8vIGJyb3dzZXJzIGhhbmRsZSB0aGUgYXR0cmlidXRlIGp1c3QgZmluZS4gVGhlIFczQyBhbGxvd3MgZm9yIGFyaWEtKiBhdHRyaWJ1dGVzIHRvIGJlIHVzZWQgaW4gcHJlLUhUTUw1IGRvY3MuXHJcbiAgICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL3dhaS1hcmlhLXByaW1lci8jYXJpYWh0bWwuIFVzaW5nIHNldEF0dHJpYnV0ZSBnZXRzIGFyb3VuZCB0aGlzIHByb2JsZW0uXHJcblxyXG4gICAgICAgaWYgKHByb3BOYW1lLmluZGV4T2YoJ2FyaWEtJykgIT09IC0xIHx8IHByb3BOYW1lPT0ncm9sZScpIHtcclxuICAgICAgICAgZWwuc2V0QXR0cmlidXRlKHByb3BOYW1lLCBwcm9wZXJ0aWVzW3Byb3BOYW1lXSk7XHJcbiAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICBlbFtwcm9wTmFtZV0gPSBwcm9wZXJ0aWVzW3Byb3BOYW1lXTtcclxuICAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFVwcGVyY2FzZSB0aGUgZmlyc3QgbGV0dGVyIG9mIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyaW5nIFN0cmluZyB0byBiZSB1cHBlcmNhc2VkXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyaW5nKXtcclxuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE9iamVjdCBmdW5jdGlvbnMgY29udGFpbmVyXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqID0ge307XHJcblxyXG4vKipcclxuICogT2JqZWN0LmNyZWF0ZSBzaGltIGZvciBwcm90b3R5cGFsIGluaGVyaXRhbmNlXHJcbiAqXHJcbiAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2NyZWF0ZVxyXG4gKlxyXG4gKiBAZnVuY3Rpb25cclxuICogQHBhcmFtICB7T2JqZWN0fSAgIG9iaiBPYmplY3QgdG8gdXNlIGFzIHByb3RvdHlwZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuIHZqcy5vYmouY3JlYXRlID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbihvYmope1xyXG4gIC8vQ3JlYXRlIGEgbmV3IGZ1bmN0aW9uIGNhbGxlZCAnRicgd2hpY2ggaXMganVzdCBhbiBlbXB0eSBvYmplY3QuXHJcbiAgZnVuY3Rpb24gRigpIHt9XHJcblxyXG4gIC8vdGhlIHByb3RvdHlwZSBvZiB0aGUgJ0YnIGZ1bmN0aW9uIHNob3VsZCBwb2ludCB0byB0aGVcclxuICAvL3BhcmFtZXRlciBvZiB0aGUgYW5vbnltb3VzIGZ1bmN0aW9uLlxyXG4gIEYucHJvdG90eXBlID0gb2JqO1xyXG5cclxuICAvL2NyZWF0ZSBhIG5ldyBjb25zdHJ1Y3RvciBmdW5jdGlvbiBiYXNlZCBvZmYgb2YgdGhlICdGJyBmdW5jdGlvbi5cclxuICByZXR1cm4gbmV3IEYoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb29wIHRocm91Z2ggZWFjaCBwcm9wZXJ0eSBpbiBhbiBvYmplY3QgYW5kIGNhbGwgYSBmdW5jdGlvblxyXG4gKiB3aG9zZSBhcmd1bWVudHMgYXJlIChrZXksdmFsdWUpXHJcbiAqIEBwYXJhbSAge09iamVjdH0gICBvYmogT2JqZWN0IG9mIHByb3BlcnRpZXNcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICBGdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZWFjaCBwcm9wZXJ0eS5cclxuICogQHRoaXMgeyp9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMub2JqLmVhY2ggPSBmdW5jdGlvbihvYmosIGZuLCBjb250ZXh0KXtcclxuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XHJcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG9iaiwga2V5KSkge1xyXG4gICAgICBmbi5jYWxsKGNvbnRleHQgfHwgdGhpcywga2V5LCBvYmpba2V5XSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1lcmdlIHR3byBvYmplY3RzIHRvZ2V0aGVyIGFuZCByZXR1cm4gdGhlIG9yaWdpbmFsLlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iajFcclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmoyXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmoubWVyZ2UgPSBmdW5jdGlvbihvYmoxLCBvYmoyKXtcclxuICBpZiAoIW9iajIpIHsgcmV0dXJuIG9iajE7IH1cclxuICBmb3IgKHZhciBrZXkgaW4gb2JqMil7XHJcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG9iajIsIGtleSkpIHtcclxuICAgICAgb2JqMVtrZXldID0gb2JqMltrZXldO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gb2JqMTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYW5kIG1lcmdlIGFueSBwcm9wZXJ0aWVzIHRoYXQgYXJlIG9iamVjdHNcclxuICogaW5zdGVhZCBvZiBqdXN0IG92ZXJ3cml0aW5nIG9uZS4gVXNlcyB0byBtZXJnZSBvcHRpb25zIGhhc2hlc1xyXG4gKiB3aGVyZSBkZWVwZXIgZGVmYXVsdCBzZXR0aW5ncyBhcmUgaW1wb3J0YW50LlxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iajEgT2JqZWN0IHRvIG92ZXJyaWRlXHJcbiAqIEBwYXJhbSAge09iamVjdH0gb2JqMiBPdmVycmlkaW5nIG9iamVjdFxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgTmV3IG9iamVjdC4gT2JqMSBhbmQgT2JqMiB3aWxsIGJlIHVudG91Y2hlZC5cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5vYmouZGVlcE1lcmdlID0gZnVuY3Rpb24ob2JqMSwgb2JqMil7XHJcbiAgdmFyIGtleSwgdmFsMSwgdmFsMjtcclxuXHJcbiAgLy8gbWFrZSBhIGNvcHkgb2Ygb2JqMSBzbyB3ZSdyZSBub3Qgb3Zld3JpdGluZyBvcmlnaW5hbCB2YWx1ZXMuXHJcbiAgLy8gbGlrZSBwcm90b3R5cGUub3B0aW9uc18gYW5kIGFsbCBzdWIgb3B0aW9ucyBvYmplY3RzXHJcbiAgb2JqMSA9IHZqcy5vYmouY29weShvYmoxKTtcclxuXHJcbiAgZm9yIChrZXkgaW4gb2JqMil7XHJcbiAgICBpZiAoaGFzT3duUHJvcC5jYWxsKG9iajIsIGtleSkpIHtcclxuICAgICAgdmFsMSA9IG9iajFba2V5XTtcclxuICAgICAgdmFsMiA9IG9iajJba2V5XTtcclxuXHJcbiAgICAgIC8vIENoZWNrIGlmIGJvdGggcHJvcGVydGllcyBhcmUgcHVyZSBvYmplY3RzIGFuZCBkbyBhIGRlZXAgbWVyZ2UgaWYgc29cclxuICAgICAgaWYgKHZqcy5vYmouaXNQbGFpbih2YWwxKSAmJiB2anMub2JqLmlzUGxhaW4odmFsMikpIHtcclxuICAgICAgICBvYmoxW2tleV0gPSB2anMub2JqLmRlZXBNZXJnZSh2YWwxLCB2YWwyKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvYmoxW2tleV0gPSBvYmoyW2tleV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIG9iajE7XHJcbn07XHJcblxyXG4vKipcclxuICogTWFrZSBhIGNvcHkgb2YgdGhlIHN1cHBsaWVkIG9iamVjdFxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBPYmplY3QgdG8gY29weVxyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICBDb3B5IG9mIG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iai5jb3B5ID0gZnVuY3Rpb24ob2JqKXtcclxuICByZXR1cm4gdmpzLm9iai5tZXJnZSh7fSwgb2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhbiBvYmplY3QgaXMgcGxhaW4sIGFuZCBub3QgYSBkb20gbm9kZSBvciBhbnkgb2JqZWN0IHN1Yi1pbnN0YW5jZVxyXG4gKiBAcGFyYW0gIHtPYmplY3R9IG9iaiBPYmplY3QgdG8gY2hlY2tcclxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgIFRydWUgaWYgcGxhaW4sIGZhbHNlIG90aGVyd2lzZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLm9iai5pc1BsYWluID0gZnVuY3Rpb24ob2JqKXtcclxuICByZXR1cm4gISFvYmpcclxuICAgICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnXHJcbiAgICAmJiBvYmoudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgT2JqZWN0XSdcclxuICAgICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEJpbmQgKGEuay5hIHByb3h5IG9yIENvbnRleHQpLiBBIHNpbXBsZSBtZXRob2QgZm9yIGNoYW5naW5nIHRoZSBjb250ZXh0IG9mIGEgZnVuY3Rpb25cclxuICAgSXQgYWxzbyBzdG9yZXMgYSB1bmlxdWUgaWQgb24gdGhlIGZ1bmN0aW9uIHNvIGl0IGNhbiBiZSBlYXNpbHkgcmVtb3ZlZCBmcm9tIGV2ZW50c1xyXG4gKiBAcGFyYW0gIHsqfSAgIGNvbnRleHQgVGhlIG9iamVjdCB0byBiaW5kIGFzIHNjb3BlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgICAgIFRoZSBmdW5jdGlvbiB0byBiZSBib3VuZCB0byBhIHNjb3BlXHJcbiAqIEBwYXJhbSAge051bWJlcj19ICAgdWlkICAgICBBbiBvcHRpb25hbCB1bmlxdWUgSUQgZm9yIHRoZSBmdW5jdGlvbiB0byBiZSBzZXRcclxuICogQHJldHVybiB7RnVuY3Rpb259XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuYmluZCA9IGZ1bmN0aW9uKGNvbnRleHQsIGZuLCB1aWQpIHtcclxuICAvLyBNYWtlIHN1cmUgdGhlIGZ1bmN0aW9uIGhhcyBhIHVuaXF1ZSBJRFxyXG4gIGlmICghZm4uZ3VpZCkgeyBmbi5ndWlkID0gdmpzLmd1aWQrKzsgfVxyXG5cclxuICAvLyBDcmVhdGUgdGhlIG5ldyBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdGhlIGNvbnRleHRcclxuICB2YXIgcmV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZm4uYXBwbHkoY29udGV4dCwgYXJndW1lbnRzKTtcclxuICB9O1xyXG5cclxuICAvLyBBbGxvdyBmb3IgdGhlIGFiaWxpdHkgdG8gaW5kaXZpZHVhbGl6ZSB0aGlzIGZ1bmN0aW9uXHJcbiAgLy8gTmVlZGVkIGluIHRoZSBjYXNlIHdoZXJlIG11bHRpcGxlIG9iamVjdHMgbWlnaHQgc2hhcmUgdGhlIHNhbWUgcHJvdG90eXBlXHJcbiAgLy8gSUYgYm90aCBpdGVtcyBhZGQgYW4gZXZlbnQgbGlzdGVuZXIgd2l0aCB0aGUgc2FtZSBmdW5jdGlvbiwgdGhlbiB5b3UgdHJ5IHRvIHJlbW92ZSBqdXN0IG9uZVxyXG4gIC8vIGl0IHdpbGwgcmVtb3ZlIGJvdGggYmVjYXVzZSB0aGV5IGJvdGggaGF2ZSB0aGUgc2FtZSBndWlkLlxyXG4gIC8vIHdoZW4gdXNpbmcgdGhpcywgeW91IG5lZWQgdG8gdXNlIHRoZSBiaW5kIG1ldGhvZCB3aGVuIHlvdSByZW1vdmUgdGhlIGxpc3RlbmVyIGFzIHdlbGwuXHJcbiAgLy8gY3VycmVudGx5IHVzZWQgaW4gdGV4dCB0cmFja3NcclxuICByZXQuZ3VpZCA9ICh1aWQpID8gdWlkICsgJ18nICsgZm4uZ3VpZCA6IGZuLmd1aWQ7XHJcblxyXG4gIHJldHVybiByZXQ7XHJcbn07XHJcblxyXG4vKipcclxuICogRWxlbWVudCBEYXRhIFN0b3JlLiBBbGxvd3MgZm9yIGJpbmRpbmcgZGF0YSB0byBhbiBlbGVtZW50IHdpdGhvdXQgcHV0dGluZyBpdCBkaXJlY3RseSBvbiB0aGUgZWxlbWVudC5cclxuICogRXguIEV2ZW50IGxpc3RuZXJlcyBhcmUgc3RvcmVkIGhlcmUuXHJcbiAqIChhbHNvIGZyb20ganNuaW5qYS5jb20sIHNsaWdodGx5IG1vZGlmaWVkIGFuZCB1cGRhdGVkIGZvciBjbG9zdXJlIGNvbXBpbGVyKVxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmNhY2hlID0ge307XHJcblxyXG4vKipcclxuICogVW5pcXVlIElEIGZvciBhbiBlbGVtZW50IG9yIGZ1bmN0aW9uXHJcbiAqIEB0eXBlIHtOdW1iZXJ9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ3VpZCA9IDE7XHJcblxyXG4vKipcclxuICogVW5pcXVlIGF0dHJpYnV0ZSBuYW1lIHRvIHN0b3JlIGFuIGVsZW1lbnQncyBndWlkIGluXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBjb25zdGFudFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmV4cGFuZG8gPSAndmRhdGEnICsgKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm5zIHRoZSBjYWNoZSBvYmplY3Qgd2hlcmUgZGF0YSBmb3IgYW4gZWxlbWVudCBpcyBzdG9yZWRcclxuICogQHBhcmFtICB7RWxlbWVudH0gZWwgRWxlbWVudCB0byBzdG9yZSBkYXRhIGZvci5cclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmdldERhdGEgPSBmdW5jdGlvbihlbCl7XHJcbiAgdmFyIGlkID0gZWxbdmpzLmV4cGFuZG9dO1xyXG4gIGlmICghaWQpIHtcclxuICAgIGlkID0gZWxbdmpzLmV4cGFuZG9dID0gdmpzLmd1aWQrKztcclxuICAgIHZqcy5jYWNoZVtpZF0gPSB7fTtcclxuICB9XHJcbiAgcmV0dXJuIHZqcy5jYWNoZVtpZF07XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJucyB0aGUgY2FjaGUgb2JqZWN0IHdoZXJlIGRhdGEgZm9yIGFuIGVsZW1lbnQgaXMgc3RvcmVkXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsIEVsZW1lbnQgdG8gc3RvcmUgZGF0YSBmb3IuXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5oYXNEYXRhID0gZnVuY3Rpb24oZWwpe1xyXG4gIHZhciBpZCA9IGVsW3Zqcy5leHBhbmRvXTtcclxuICByZXR1cm4gISghaWQgfHwgdmpzLmlzRW1wdHkodmpzLmNhY2hlW2lkXSkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERlbGV0ZSBkYXRhIGZvciB0aGUgZWxlbWVudCBmcm9tIHRoZSBjYWNoZSBhbmQgdGhlIGd1aWQgYXR0ciBmcm9tIGdldEVsZW1lbnRCeUlkXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IGVsIFJlbW92ZSBkYXRhIGZvciBhbiBlbGVtZW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMucmVtb3ZlRGF0YSA9IGZ1bmN0aW9uKGVsKXtcclxuICB2YXIgaWQgPSBlbFt2anMuZXhwYW5kb107XHJcbiAgaWYgKCFpZCkgeyByZXR1cm47IH1cclxuICAvLyBSZW1vdmUgYWxsIHN0b3JlZCBkYXRhXHJcbiAgLy8gQ2hhbmdlZCB0byA9IG51bGxcclxuICAvLyBodHRwOi8vY29kaW5nLnNtYXNoaW5nbWFnYXppbmUuY29tLzIwMTIvMTEvMDUvd3JpdGluZy1mYXN0LW1lbW9yeS1lZmZpY2llbnQtamF2YXNjcmlwdC9cclxuICAvLyB2anMuY2FjaGVbaWRdID0gbnVsbDtcclxuICBkZWxldGUgdmpzLmNhY2hlW2lkXTtcclxuXHJcbiAgLy8gUmVtb3ZlIHRoZSBleHBhbmRvIHByb3BlcnR5IGZyb20gdGhlIERPTSBub2RlXHJcbiAgdHJ5IHtcclxuICAgIGRlbGV0ZSBlbFt2anMuZXhwYW5kb107XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICBpZiAoZWwucmVtb3ZlQXR0cmlidXRlKSB7XHJcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSh2anMuZXhwYW5kbyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAvLyBJRSBkb2Vzbid0IGFwcGVhciB0byBzdXBwb3J0IHJlbW92ZUF0dHJpYnV0ZSBvbiB0aGUgZG9jdW1lbnQgZWxlbWVudFxyXG4gICAgICBlbFt2anMuZXhwYW5kb10gPSBudWxsO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiBhbiBvYmplY3QgaXMgZW1wdHlcclxuICogQHBhcmFtICB7T2JqZWN0fSAgb2JqIFRoZSBvYmplY3QgdG8gY2hlY2sgZm9yIGVtcHRpbmVzc1xyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmlzRW1wdHkgPSBmdW5jdGlvbihvYmopIHtcclxuICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xyXG4gICAgLy8gSW5sdWRlIG51bGwgcHJvcGVydGllcyBhcyBlbXB0eS5cclxuICAgIGlmIChvYmpbcHJvcF0gIT09IG51bGwpIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSBDU1MgY2xhc3MgbmFtZSB0byBhbiBlbGVtZW50XHJcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbWVudCAgICBFbGVtZW50IHRvIGFkZCBjbGFzcyBuYW1lIHRvXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1RvQWRkIENsYXNzbmFtZSB0byBhZGRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzVG9BZGQpe1xyXG4gIGlmICgoJyAnK2VsZW1lbnQuY2xhc3NOYW1lKycgJykuaW5kZXhPZignICcrY2xhc3NUb0FkZCsnICcpID09IC0xKSB7XHJcbiAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGVsZW1lbnQuY2xhc3NOYW1lID09PSAnJyA/IGNsYXNzVG9BZGQgOiBlbGVtZW50LmNsYXNzTmFtZSArICcgJyArIGNsYXNzVG9BZGQ7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSBhIENTUyBjbGFzcyBuYW1lIGZyb20gYW4gZWxlbWVudFxyXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1lbnQgICAgRWxlbWVudCB0byByZW1vdmUgZnJvbSBjbGFzcyBuYW1lXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1RvQWRkIENsYXNzbmFtZSB0byByZW1vdmVcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNsYXNzVG9SZW1vdmUpe1xyXG4gIHZhciBjbGFzc05hbWVzLCBpO1xyXG5cclxuICBpZiAoZWxlbWVudC5jbGFzc05hbWUuaW5kZXhPZihjbGFzc1RvUmVtb3ZlKSA9PSAtMSkgeyByZXR1cm47IH1cclxuXHJcbiAgY2xhc3NOYW1lcyA9IGVsZW1lbnQuY2xhc3NOYW1lLnNwbGl0KCcgJyk7XHJcblxyXG4gIC8vIG5vIGFyci5pbmRleE9mIGluIGllOCwgYW5kIHdlIGRvbid0IHdhbnQgdG8gYWRkIGEgYmlnIHNoaW1cclxuICBmb3IgKGkgPSBjbGFzc05hbWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICBpZiAoY2xhc3NOYW1lc1tpXSA9PT0gY2xhc3NUb1JlbW92ZSkge1xyXG4gICAgICBjbGFzc05hbWVzLnNwbGljZShpLDEpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZWxlbWVudC5jbGFzc05hbWUgPSBjbGFzc05hbWVzLmpvaW4oJyAnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbGVtZW50IGZvciB0ZXN0aW5nIGJyb3dzZXIgSFRNTDUgdmlkZW8gY2FwYWJpbGl0aWVzXHJcbiAqIEB0eXBlIHtFbGVtZW50fVxyXG4gKiBAY29uc3RhbnRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5URVNUX1ZJRCA9IHZqcy5jcmVhdGVFbCgndmlkZW8nKTtcclxuXHJcbi8qKlxyXG4gKiBVc2VyYWdlbnQgZm9yIGJyb3dzZXIgdGVzdGluZy5cclxuICogQHR5cGUge1N0cmluZ31cclxuICogQGNvbnN0YW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVVNFUl9BR0VOVCA9IG5hdmlnYXRvci51c2VyQWdlbnQ7XHJcblxyXG4vKipcclxuICogRGV2aWNlIGlzIGFuIGlQaG9uZVxyXG4gKiBAdHlwZSB7Qm9vbGVhbn1cclxuICogQGNvbnN0YW50XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuSVNfSVBIT05FID0gKC9pUGhvbmUvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcbnZqcy5JU19JUEFEID0gKC9pUGFkL2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG52anMuSVNfSVBPRCA9ICgvaVBvZC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxudmpzLklTX0lPUyA9IHZqcy5JU19JUEhPTkUgfHwgdmpzLklTX0lQQUQgfHwgdmpzLklTX0lQT0Q7XHJcblxyXG52anMuSU9TX1ZFUlNJT04gPSAoZnVuY3Rpb24oKXtcclxuICB2YXIgbWF0Y2ggPSB2anMuVVNFUl9BR0VOVC5tYXRjaCgvT1MgKFxcZCspXy9pKTtcclxuICBpZiAobWF0Y2ggJiYgbWF0Y2hbMV0pIHsgcmV0dXJuIG1hdGNoWzFdOyB9XHJcbn0pKCk7XHJcblxyXG52anMuSVNfQU5EUk9JRCA9ICgvQW5kcm9pZC9pKS50ZXN0KHZqcy5VU0VSX0FHRU5UKTtcclxudmpzLkFORFJPSURfVkVSU0lPTiA9IChmdW5jdGlvbigpIHtcclxuICAvLyBUaGlzIG1hdGNoZXMgQW5kcm9pZCBNYWpvci5NaW5vci5QYXRjaCB2ZXJzaW9uc1xyXG4gIC8vIEFORFJPSURfVkVSU0lPTiBpcyBNYWpvci5NaW5vciBhcyBhIE51bWJlciwgaWYgTWlub3IgaXNuJ3QgYXZhaWxhYmxlLCB0aGVuIG9ubHkgTWFqb3IgaXMgcmV0dXJuZWRcclxuICB2YXIgbWF0Y2ggPSB2anMuVVNFUl9BR0VOVC5tYXRjaCgvQW5kcm9pZCAoXFxkKykoPzpcXC4oXFxkKykpPyg/OlxcLihcXGQrKSkqL2kpLFxyXG4gICAgbWFqb3IsXHJcbiAgICBtaW5vcjtcclxuXHJcbiAgaWYgKCFtYXRjaCkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG5cclxuICBtYWpvciA9IG1hdGNoWzFdICYmIHBhcnNlRmxvYXQobWF0Y2hbMV0pO1xyXG4gIG1pbm9yID0gbWF0Y2hbMl0gJiYgcGFyc2VGbG9hdChtYXRjaFsyXSk7XHJcblxyXG4gIGlmIChtYWpvciAmJiBtaW5vcikge1xyXG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobWF0Y2hbMV0gKyAnLicgKyBtYXRjaFsyXSk7XHJcbiAgfSBlbHNlIGlmIChtYWpvcikge1xyXG4gICAgcmV0dXJuIG1ham9yO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn0pKCk7XHJcbi8vIE9sZCBBbmRyb2lkIGlzIGRlZmluZWQgYXMgVmVyc2lvbiBvbGRlciB0aGFuIDIuMywgYW5kIHJlcXVpcmluZyBhIHdlYmtpdCB2ZXJzaW9uIG9mIHRoZSBhbmRyb2lkIGJyb3dzZXJcclxudmpzLklTX09MRF9BTkRST0lEID0gdmpzLklTX0FORFJPSUQgJiYgKC93ZWJraXQvaSkudGVzdCh2anMuVVNFUl9BR0VOVCkgJiYgdmpzLkFORFJPSURfVkVSU0lPTiA8IDIuMztcclxuXHJcbnZqcy5JU19GSVJFRk9YID0gKC9GaXJlZm94L2kpLnRlc3QodmpzLlVTRVJfQUdFTlQpO1xyXG52anMuSVNfQ0hST01FID0gKC9DaHJvbWUvaSkudGVzdCh2anMuVVNFUl9BR0VOVCk7XHJcblxyXG52anMuVE9VQ0hfRU5BQkxFRCA9ICEhKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpO1xyXG5cclxuLyoqXHJcbiAqIEdldCBhbiBlbGVtZW50J3MgYXR0cmlidXRlIHZhbHVlcywgYXMgZGVmaW5lZCBvbiB0aGUgSFRNTCB0YWdcclxuICogQXR0cmlidXRzIGFyZSBub3QgdGhlIHNhbWUgYXMgcHJvcGVydGllcy4gVGhleSdyZSBkZWZpbmVkIG9uIHRoZSB0YWdcclxuICogb3Igd2l0aCBzZXRBdHRyaWJ1dGUgKHdoaWNoIHNob3VsZG4ndCBiZSB1c2VkIHdpdGggSFRNTClcclxuICogVGhpcyB3aWxsIHJldHVybiB0cnVlIG9yIGZhbHNlIGZvciBib29sZWFuIGF0dHJpYnV0ZXMuXHJcbiAqIEBwYXJhbSAge0VsZW1lbnR9IHRhZyBFbGVtZW50IGZyb20gd2hpY2ggdG8gZ2V0IHRhZyBhdHRyaWJ1dGVzXHJcbiAqIEByZXR1cm4ge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXMgPSBmdW5jdGlvbih0YWcpe1xyXG4gIHZhciBvYmosIGtub3duQm9vbGVhbnMsIGF0dHJzLCBhdHRyTmFtZSwgYXR0clZhbDtcclxuXHJcbiAgb2JqID0ge307XHJcblxyXG4gIC8vIGtub3duIGJvb2xlYW4gYXR0cmlidXRlc1xyXG4gIC8vIHdlIGNhbiBjaGVjayBmb3IgbWF0Y2hpbmcgYm9vbGVhbiBwcm9wZXJ0aWVzLCBidXQgb2xkZXIgYnJvd3NlcnNcclxuICAvLyB3b24ndCBrbm93IGFib3V0IEhUTUw1IGJvb2xlYW4gYXR0cmlidXRlcyB0aGF0IHdlIHN0aWxsIHJlYWQgZnJvbVxyXG4gIGtub3duQm9vbGVhbnMgPSAnLCcrJ2F1dG9wbGF5LGNvbnRyb2xzLGxvb3AsbXV0ZWQsZGVmYXVsdCcrJywnO1xyXG5cclxuICBpZiAodGFnICYmIHRhZy5hdHRyaWJ1dGVzICYmIHRhZy5hdHRyaWJ1dGVzLmxlbmd0aCA+IDApIHtcclxuICAgIGF0dHJzID0gdGFnLmF0dHJpYnV0ZXM7XHJcblxyXG4gICAgZm9yICh2YXIgaSA9IGF0dHJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgIGF0dHJOYW1lID0gYXR0cnNbaV0ubmFtZTtcclxuICAgICAgYXR0clZhbCA9IGF0dHJzW2ldLnZhbHVlO1xyXG5cclxuICAgICAgLy8gY2hlY2sgZm9yIGtub3duIGJvb2xlYW5zXHJcbiAgICAgIC8vIHRoZSBtYXRjaGluZyBlbGVtZW50IHByb3BlcnR5IHdpbGwgcmV0dXJuIGEgdmFsdWUgZm9yIHR5cGVvZlxyXG4gICAgICBpZiAodHlwZW9mIHRhZ1thdHRyTmFtZV0gPT09ICdib29sZWFuJyB8fCBrbm93bkJvb2xlYW5zLmluZGV4T2YoJywnK2F0dHJOYW1lKycsJykgIT09IC0xKSB7XHJcbiAgICAgICAgLy8gdGhlIHZhbHVlIG9mIGFuIGluY2x1ZGVkIGJvb2xlYW4gYXR0cmlidXRlIGlzIHR5cGljYWxseSBhbiBlbXB0eVxyXG4gICAgICAgIC8vIHN0cmluZyAoJycpIHdoaWNoIHdvdWxkIGVxdWFsIGZhbHNlIGlmIHdlIGp1c3QgY2hlY2sgZm9yIGEgZmFsc2UgdmFsdWUuXHJcbiAgICAgICAgLy8gd2UgYWxzbyBkb24ndCB3YW50IHN1cHBvcnQgYmFkIGNvZGUgbGlrZSBhdXRvcGxheT0nZmFsc2UnXHJcbiAgICAgICAgYXR0clZhbCA9IChhdHRyVmFsICE9PSBudWxsKSA/IHRydWUgOiBmYWxzZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgb2JqW2F0dHJOYW1lXSA9IGF0dHJWYWw7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gb2JqO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29tcHV0ZWQgc3R5bGUgdmFsdWUgZm9yIGFuIGVsZW1lbnRcclxuICogRnJvbSBodHRwOi8vcm9iZXJ0bnltYW4uY29tLzIwMDYvMDQvMjQvZ2V0LXRoZS1yZW5kZXJlZC1zdHlsZS1vZi1hbi1lbGVtZW50L1xyXG4gKiBAcGFyYW0gIHtFbGVtZW50fSBlbCAgICAgICAgRWxlbWVudCB0byBnZXQgc3R5bGUgdmFsdWUgZm9yXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gc3RyQ3NzUnVsZSBTdHlsZSBuYW1lXHJcbiAqIEByZXR1cm4ge1N0cmluZ30gICAgICAgICAgICBTdHlsZSB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmdldENvbXB1dGVkRGltZW5zaW9uID0gZnVuY3Rpb24oZWwsIHN0ckNzc1J1bGUpe1xyXG4gIHZhciBzdHJWYWx1ZSA9ICcnO1xyXG4gIGlmKGRvY3VtZW50LmRlZmF1bHRWaWV3ICYmIGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUpe1xyXG4gICAgc3RyVmFsdWUgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKGVsLCAnJykuZ2V0UHJvcGVydHlWYWx1ZShzdHJDc3NSdWxlKTtcclxuXHJcbiAgfSBlbHNlIGlmKGVsLmN1cnJlbnRTdHlsZSl7XHJcbiAgICAvLyBJRTggV2lkdGgvSGVpZ2h0IHN1cHBvcnRcclxuICAgIHN0clZhbHVlID0gZWxbJ2NsaWVudCcrc3RyQ3NzUnVsZS5zdWJzdHIoMCwxKS50b1VwcGVyQ2FzZSgpICsgc3RyQ3NzUnVsZS5zdWJzdHIoMSldICsgJ3B4JztcclxuICB9XHJcbiAgcmV0dXJuIHN0clZhbHVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEluc2VydCBhbiBlbGVtZW50IGFzIHRoZSBmaXJzdCBjaGlsZCBub2RlIG9mIGFub3RoZXJcclxuICogQHBhcmFtICB7RWxlbWVudH0gY2hpbGQgICBFbGVtZW50IHRvIGluc2VydFxyXG4gKiBAcGFyYW0gIHtbdHlwZV19IHBhcmVudCBFbGVtZW50IHRvIGluc2VydCBjaGlsZCBpbnRvXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuaW5zZXJ0Rmlyc3QgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KXtcclxuICBpZiAocGFyZW50LmZpcnN0Q2hpbGQpIHtcclxuICAgIHBhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIHBhcmVudC5maXJzdENoaWxkKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGFyZW50LmFwcGVuZENoaWxkKGNoaWxkKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogT2JqZWN0IHRvIGhvbGQgYnJvd3NlciBzdXBwb3J0IGluZm9ybWF0aW9uXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuc3VwcG9ydCA9IHt9O1xyXG5cclxuLyoqXHJcbiAqIFNob3J0aGFuZCBmb3IgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoKVxyXG4gKiBBbHNvIGFsbG93cyBmb3IgQ1NTIChqUXVlcnkpIElEIHN5bnRheC4gQnV0IG5vdGhpbmcgb3RoZXIgdGhhbiBJRHMuXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gaWQgIEVsZW1lbnQgSURcclxuICogQHJldHVybiB7RWxlbWVudH0gICAgRWxlbWVudCB3aXRoIHN1cHBsaWVkIElEXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZWwgPSBmdW5jdGlvbihpZCl7XHJcbiAgaWYgKGlkLmluZGV4T2YoJyMnKSA9PT0gMCkge1xyXG4gICAgaWQgPSBpZC5zbGljZSgxKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcbn07XHJcblxyXG4vKipcclxuICogRm9ybWF0IHNlY29uZHMgYXMgYSB0aW1lIHN0cmluZywgSDpNTTpTUyBvciBNOlNTXHJcbiAqIFN1cHBseWluZyBhIGd1aWRlIChpbiBzZWNvbmRzKSB3aWxsIGZvcmNlIGEgbnVtYmVyIG9mIGxlYWRpbmcgemVyb3NcclxuICogdG8gY292ZXIgdGhlIGxlbmd0aCBvZiB0aGUgZ3VpZGVcclxuICogQHBhcmFtICB7TnVtYmVyfSBzZWNvbmRzIE51bWJlciBvZiBzZWNvbmRzIHRvIGJlIHR1cm5lZCBpbnRvIGEgc3RyaW5nXHJcbiAqIEBwYXJhbSAge051bWJlcn0gZ3VpZGUgICBOdW1iZXIgKGluIHNlY29uZHMpIHRvIG1vZGVsIHRoZSBzdHJpbmcgYWZ0ZXJcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgIFRpbWUgZm9ybWF0dGVkIGFzIEg6TU06U1Mgb3IgTTpTU1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmZvcm1hdFRpbWUgPSBmdW5jdGlvbihzZWNvbmRzLCBndWlkZSkge1xyXG4gIC8vIERlZmF1bHQgdG8gdXNpbmcgc2Vjb25kcyBhcyBndWlkZVxyXG4gIGd1aWRlID0gZ3VpZGUgfHwgc2Vjb25kcztcclxuICB2YXIgcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcclxuICAgICAgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwICUgNjApLFxyXG4gICAgICBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCksXHJcbiAgICAgIGdtID0gTWF0aC5mbG9vcihndWlkZSAvIDYwICUgNjApLFxyXG4gICAgICBnaCA9IE1hdGguZmxvb3IoZ3VpZGUgLyAzNjAwKTtcclxuXHJcbiAgLy8gaGFuZGxlIGludmFsaWQgdGltZXNcclxuICBpZiAoaXNOYU4oc2Vjb25kcykgfHwgc2Vjb25kcyA9PT0gSW5maW5pdHkpIHtcclxuICAgIC8vICctJyBpcyBmYWxzZSBmb3IgYWxsIHJlbGF0aW9uYWwgb3BlcmF0b3JzIChlLmcuIDwsID49KSBzbyB0aGlzIHNldHRpbmdcclxuICAgIC8vIHdpbGwgYWRkIHRoZSBtaW5pbXVtIG51bWJlciBvZiBmaWVsZHMgc3BlY2lmaWVkIGJ5IHRoZSBndWlkZVxyXG4gICAgaCA9IG0gPSBzID0gJy0nO1xyXG4gIH1cclxuXHJcbiAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGhvdXJzXHJcbiAgaCA9IChoID4gMCB8fCBnaCA+IDApID8gaCArICc6JyA6ICcnO1xyXG5cclxuICAvLyBJZiBob3VycyBhcmUgc2hvd2luZywgd2UgbWF5IG5lZWQgdG8gYWRkIGEgbGVhZGluZyB6ZXJvLlxyXG4gIC8vIEFsd2F5cyBzaG93IGF0IGxlYXN0IG9uZSBkaWdpdCBvZiBtaW51dGVzLlxyXG4gIG0gPSAoKChoIHx8IGdtID49IDEwKSAmJiBtIDwgMTApID8gJzAnICsgbSA6IG0pICsgJzonO1xyXG5cclxuICAvLyBDaGVjayBpZiBsZWFkaW5nIHplcm8gaXMgbmVlZCBmb3Igc2Vjb25kc1xyXG4gIHMgPSAocyA8IDEwKSA/ICcwJyArIHMgOiBzO1xyXG5cclxuICByZXR1cm4gaCArIG0gKyBzO1xyXG59O1xyXG5cclxuLy8gQXR0ZW1wdCB0byBibG9jayB0aGUgYWJpbGl0eSB0byBzZWxlY3QgdGV4dCB3aGlsZSBkcmFnZ2luZyBjb250cm9sc1xyXG52anMuYmxvY2tUZXh0U2VsZWN0aW9uID0gZnVuY3Rpb24oKXtcclxuICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XHJcbiAgZG9jdW1lbnQub25zZWxlY3RzdGFydCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGZhbHNlOyB9O1xyXG59O1xyXG4vLyBUdXJuIG9mZiB0ZXh0IHNlbGVjdGlvbiBibG9ja2luZ1xyXG52anMudW5ibG9ja1RleHRTZWxlY3Rpb24gPSBmdW5jdGlvbigpeyBkb2N1bWVudC5vbnNlbGVjdHN0YXJ0ID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJ1ZTsgfTsgfTtcclxuXHJcbi8qKlxyXG4gKiBUcmltIHdoaXRlc3BhY2UgZnJvbSB0aGUgZW5kcyBvZiBhIHN0cmluZy5cclxuICogQHBhcmFtICB7U3RyaW5nfSBzdHJpbmcgU3RyaW5nIHRvIHRyaW1cclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgICAgVHJpbW1lZCBzdHJpbmdcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy50cmltID0gZnVuY3Rpb24oc3RyKXtcclxuICByZXR1cm4gKHN0cisnJykucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3VsZCByb3VuZCBvZmYgYSBudW1iZXIgdG8gYSBkZWNpbWFsIHBsYWNlXHJcbiAqIEBwYXJhbSAge051bWJlcn0gbnVtIE51bWJlciB0byByb3VuZFxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IGRlYyBOdW1iZXIgb2YgZGVjaW1hbCBwbGFjZXMgdG8gcm91bmQgdG9cclxuICogQHJldHVybiB7TnVtYmVyfSAgICAgUm91bmRlZCBudW1iZXJcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5yb3VuZCA9IGZ1bmN0aW9uKG51bSwgZGVjKSB7XHJcbiAgaWYgKCFkZWMpIHsgZGVjID0gMDsgfVxyXG4gIHJldHVybiBNYXRoLnJvdW5kKG51bSpNYXRoLnBvdygxMCxkZWMpKS9NYXRoLnBvdygxMCxkZWMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNob3VsZCBjcmVhdGUgYSBmYWtlIFRpbWVSYW5nZSBvYmplY3RcclxuICogTWltaWNzIGFuIEhUTUw1IHRpbWUgcmFuZ2UgaW5zdGFuY2UsIHdoaWNoIGhhcyBmdW5jdGlvbnMgdGhhdFxyXG4gKiByZXR1cm4gdGhlIHN0YXJ0IGFuZCBlbmQgdGltZXMgZm9yIGEgcmFuZ2VcclxuICogVGltZVJhbmdlcyBhcmUgcmV0dXJuZWQgYnkgdGhlIGJ1ZmZlcmVkKCkgbWV0aG9kXHJcbiAqIEBwYXJhbSAge051bWJlcn0gc3RhcnQgU3RhcnQgdGltZSBpbiBzZWNvbmRzXHJcbiAqIEBwYXJhbSAge051bWJlcn0gZW5kICAgRW5kIHRpbWUgaW4gc2Vjb25kc1xyXG4gKiBAcmV0dXJuIHtPYmplY3R9ICAgICAgIEZha2UgVGltZVJhbmdlIG9iamVjdFxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLmNyZWF0ZVRpbWVSYW5nZSA9IGZ1bmN0aW9uKHN0YXJ0LCBlbmQpe1xyXG4gIHJldHVybiB7XHJcbiAgICBsZW5ndGg6IDEsXHJcbiAgICBzdGFydDogZnVuY3Rpb24oKSB7IHJldHVybiBzdGFydDsgfSxcclxuICAgIGVuZDogZnVuY3Rpb24oKSB7IHJldHVybiBlbmQ7IH1cclxuICB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNpbXBsZSBodHRwIHJlcXVlc3QgZm9yIHJldHJpZXZpbmcgZXh0ZXJuYWwgZmlsZXMgKGUuZy4gdGV4dCB0cmFja3MpXHJcbiAqIEBwYXJhbSAge1N0cmluZ30gdXJsICAgICAgICAgICBVUkwgb2YgcmVzb3VyY2VcclxuICogQHBhcmFtICB7RnVuY3Rpb249fSBvblN1Y2Nlc3MgIFN1Y2Nlc3MgY2FsbGJhY2tcclxuICogQHBhcmFtICB7RnVuY3Rpb249fSBvbkVycm9yICAgIEVycm9yIGNhbGxiYWNrXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ2V0ID0gZnVuY3Rpb24odXJsLCBvblN1Y2Nlc3MsIG9uRXJyb3Ipe1xyXG4gIHZhciBsb2NhbCwgcmVxdWVzdDtcclxuXHJcbiAgaWYgKHR5cGVvZiBYTUxIdHRwUmVxdWVzdCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgIHdpbmRvdy5YTUxIdHRwUmVxdWVzdCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgdHJ5IHsgcmV0dXJuIG5ldyB3aW5kb3cuQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuNi4wJyk7IH0gY2F0Y2ggKGUpIHt9XHJcbiAgICAgIHRyeSB7IHJldHVybiBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjMuMCcpOyB9IGNhdGNoIChmKSB7fVxyXG4gICAgICB0cnkgeyByZXR1cm4gbmV3IHdpbmRvdy5BY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUCcpOyB9IGNhdGNoIChnKSB7fVxyXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgYnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IFhNTEh0dHBSZXF1ZXN0LicpO1xyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICB0cnkge1xyXG4gICAgcmVxdWVzdC5vcGVuKCdHRVQnLCB1cmwpO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgb25FcnJvcihlKTtcclxuICB9XHJcblxyXG4gIGxvY2FsID0gKHVybC5pbmRleE9mKCdmaWxlOicpID09PSAwIHx8ICh3aW5kb3cubG9jYXRpb24uaHJlZi5pbmRleE9mKCdmaWxlOicpID09PSAwICYmIHVybC5pbmRleE9mKCdodHRwJykgPT09IC0xKSk7XHJcblxyXG4gIHJlcXVlc3Qub25yZWFkeXN0YXRlY2hhbmdlID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAocmVxdWVzdC5yZWFkeVN0YXRlID09PSA0KSB7XHJcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwIHx8IGxvY2FsICYmIHJlcXVlc3Quc3RhdHVzID09PSAwKSB7XHJcbiAgICAgICAgb25TdWNjZXNzKHJlcXVlc3QucmVzcG9uc2VUZXh0KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZiAob25FcnJvcikge1xyXG4gICAgICAgICAgb25FcnJvcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHRyeSB7XHJcbiAgICByZXF1ZXN0LnNlbmQoKTtcclxuICB9IGNhdGNoKGUpIHtcclxuICAgIGlmIChvbkVycm9yKSB7XHJcbiAgICAgIG9uRXJyb3IoZSk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZCB0byBsb2NhbCBzdG9yYWdlIChtYXkgcmVtb3ZlYWJsZSlcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5zZXRMb2NhbFN0b3JhZ2UgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcclxuICB0cnkge1xyXG4gICAgLy8gSUUgd2FzIHRocm93aW5nIGVycm9ycyByZWZlcmVuY2luZyB0aGUgdmFyIGFueXdoZXJlIHdpdGhvdXQgdGhpc1xyXG4gICAgdmFyIGxvY2FsU3RvcmFnZSA9IHdpbmRvdy5sb2NhbFN0b3JhZ2UgfHwgZmFsc2U7XHJcbiAgICBpZiAoIWxvY2FsU3RvcmFnZSkgeyByZXR1cm47IH1cclxuICAgIGxvY2FsU3RvcmFnZVtrZXldID0gdmFsdWU7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICBpZiAoZS5jb2RlID09IDIyIHx8IGUuY29kZSA9PSAxMDE0KSB7IC8vIFdlYmtpdCA9PSAyMiAvIEZpcmVmb3ggPT0gMTAxNFxyXG4gICAgICB2anMubG9nKCdMb2NhbFN0b3JhZ2UgRnVsbCAoVmlkZW9KUyknLCBlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChlLmNvZGUgPT0gMTgpIHtcclxuICAgICAgICB2anMubG9nKCdMb2NhbFN0b3JhZ2Ugbm90IGFsbG93ZWQgKFZpZGVvSlMpJywgZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdmpzLmxvZygnTG9jYWxTdG9yYWdlIEVycm9yIChWaWRlb0pTKScsIGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBhYm9zb2x1dGUgdmVyc2lvbiBvZiByZWxhdGl2ZSBVUkwuIFVzZWQgdG8gdGVsbCBmbGFzaCBjb3JyZWN0IFVSTC5cclxuICogaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy80NzA4MzIvZ2V0dGluZy1hbi1hYnNvbHV0ZS11cmwtZnJvbS1hLXJlbGF0aXZlLW9uZS1pZTYtaXNzdWVcclxuICogQHBhcmFtICB7U3RyaW5nfSB1cmwgVVJMIHRvIG1ha2UgYWJzb2x1dGVcclxuICogQHJldHVybiB7U3RyaW5nfSAgICAgQWJzb2x1dGUgVVJMXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuZ2V0QWJzb2x1dGVVUkwgPSBmdW5jdGlvbih1cmwpe1xyXG5cclxuICAvLyBDaGVjayBpZiBhYnNvbHV0ZSBVUkxcclxuICBpZiAoIXVybC5tYXRjaCgvXmh0dHBzPzpcXC9cXC8vKSkge1xyXG4gICAgLy8gQ29udmVydCB0byBhYnNvbHV0ZSBVUkwuIEZsYXNoIGhvc3RlZCBvZmYtc2l0ZSBuZWVkcyBhbiBhYnNvbHV0ZSBVUkwuXHJcbiAgICB1cmwgPSB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgICAgaW5uZXJIVE1MOiAnPGEgaHJlZj1cIicrdXJsKydcIj54PC9hPidcclxuICAgIH0pLmZpcnN0Q2hpbGQuaHJlZjtcclxuICB9XHJcblxyXG4gIHJldHVybiB1cmw7XHJcbn07XHJcblxyXG4vLyB1c2FnZTogbG9nKCdpbnNpZGUgY29vbEZ1bmMnLHRoaXMsYXJndW1lbnRzKTtcclxuLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAwOS9sb2ctYS1saWdodHdlaWdodC13cmFwcGVyLWZvci1jb25zb2xlbG9nL1xyXG52anMubG9nID0gZnVuY3Rpb24oKXtcclxuICB2anMubG9nLmhpc3RvcnkgPSB2anMubG9nLmhpc3RvcnkgfHwgW107ICAgLy8gc3RvcmUgbG9ncyB0byBhbiBhcnJheSBmb3IgcmVmZXJlbmNlXHJcbiAgdmpzLmxvZy5oaXN0b3J5LnB1c2goYXJndW1lbnRzKTtcclxuICBpZih3aW5kb3cuY29uc29sZSl7XHJcbiAgICB3aW5kb3cuY29uc29sZS5sb2coQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gT2Zmc2V0IExlZnRcclxuLy8gZ2V0Qm91bmRpbmdDbGllbnRSZWN0IHRlY2huaXF1ZSBmcm9tIEpvaG4gUmVzaWcgaHR0cDovL2Vqb2huLm9yZy9ibG9nL2dldGJvdW5kaW5nY2xpZW50cmVjdC1pcy1hd2Vzb21lL1xyXG52anMuZmluZFBvc2l0aW9uID0gZnVuY3Rpb24oZWwpIHtcclxuICAgIHZhciBib3gsIGRvY0VsLCBib2R5LCBjbGllbnRMZWZ0LCBzY3JvbGxMZWZ0LCBsZWZ0LCBjbGllbnRUb3AsIHNjcm9sbFRvcCwgdG9wO1xyXG5cclxuICAgIGlmIChlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgZWwucGFyZW50Tm9kZSkge1xyXG4gICAgICBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoIWJveCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgdG9wOiAwXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XHJcbiAgICBib2R5ID0gZG9jdW1lbnQuYm9keTtcclxuXHJcbiAgICBjbGllbnRMZWZ0ID0gZG9jRWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcclxuICAgIHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgYm9keS5zY3JvbGxMZWZ0O1xyXG4gICAgbGVmdCA9IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnQ7XHJcblxyXG4gICAgY2xpZW50VG9wID0gZG9jRWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XHJcbiAgICBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgYm9keS5zY3JvbGxUb3A7XHJcbiAgICB0b3AgPSBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wO1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgIGxlZnQ6IGxlZnQsXHJcbiAgICAgIHRvcDogdG9wXHJcbiAgICB9O1xyXG59O1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBQbGF5ZXIgQ29tcG9uZW50IC0gQmFzZSBjbGFzcyBmb3IgYWxsIFVJIG9iamVjdHNcclxuICpcclxuICovXHJcblxyXG4vKipcclxuICogQmFzZSBVSSBDb21wb25lbnQgY2xhc3NcclxuICpcclxuICogQ29tcG9uZW50cyBhcmUgZW1iZWRkYWJsZSBVSSBvYmplY3RzIHRoYXQgYXJlIHJlcHJlc2VudGVkIGJ5IGJvdGggYVxyXG4gKiBqYXZhc2NyaXB0IG9iamVjdCBhbmQgYW4gZWxlbWVudCBpbiB0aGUgRE9NLiBUaGV5IGNhbiBiZSBjaGlsZHJlbiBvZiBvdGhlclxyXG4gKiBjb21wb25lbnRzLCBhbmQgY2FuIGhhdmUgbWFueSBjaGlsZHJlbiB0aGVtc2VsdmVzLlxyXG4gKlxyXG4gKiAgICAgLy8gYWRkaW5nIGEgYnV0dG9uIHRvIHRoZSBwbGF5ZXJcclxuICogICAgIHZhciBidXR0b24gPSBwbGF5ZXIuYWRkQ2hpbGQoJ2J1dHRvbicpO1xyXG4gKiAgICAgYnV0dG9uLmVsKCk7IC8vIC0+IGJ1dHRvbiBlbGVtZW50XHJcbiAqXHJcbiAqICAgICA8ZGl2IGNsYXNzPVwidmlkZW8tanNcIj5cclxuICogICAgICAgPGRpdiBjbGFzcz1cInZqcy1idXR0b25cIj5CdXR0b248L2Rpdj5cclxuICogICAgIDwvZGl2PlxyXG4gKlxyXG4gKiBDb21wb25lbnRzIGFyZSBhbHNvIGV2ZW50IGVtaXR0ZXJzLlxyXG4gKlxyXG4gKiAgICAgYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAqICAgICAgIC8vY29uc29sZS5sb2coJ0J1dHRvbiBDbGlja2VkIScpO1xyXG4gKiAgICAgfSk7XHJcbiAqXHJcbiAqICAgICBidXR0b24udHJpZ2dlcignY3VzdG9tZXZlbnQnKTtcclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IHBsYXllciAgTWFpbiBQbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICogQGV4dGVuZHMgdmpzLkNvcmVPYmplY3RcclxuICovXHJcbnZqcy5Db21wb25lbnQgPSB2anMuQ29yZU9iamVjdC5leHRlbmQoe1xyXG4gIC8qKlxyXG4gICAqIHRoZSBjb25zdHJ1Y3RvciBmdW5jaXRvbiBmb3IgdGhlIGNsYXNzXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHRoaXMucGxheWVyXyA9IHBsYXllcjtcclxuXHJcbiAgICAvLyBNYWtlIGEgY29weSBvZiBwcm90b3R5cGUub3B0aW9uc18gdG8gcHJvdGVjdCBhZ2FpbnN0IG92ZXJyaWRpbmcgZ2xvYmFsIGRlZmF1bHRzXHJcbiAgICB0aGlzLm9wdGlvbnNfID0gdmpzLm9iai5jb3B5KHRoaXMub3B0aW9uc18pO1xyXG5cclxuICAgIC8vIFVwZGF0ZWQgb3B0aW9ucyB3aXRoIHN1cHBsaWVkIG9wdGlvbnNcclxuICAgIG9wdGlvbnMgPSB0aGlzLm9wdGlvbnMob3B0aW9ucyk7XHJcblxyXG4gICAgLy8gR2V0IElEIGZyb20gb3B0aW9ucywgZWxlbWVudCwgb3IgY3JlYXRlIHVzaW5nIHBsYXllciBJRCBhbmQgdW5pcXVlIElEXHJcbiAgICB0aGlzLmlkXyA9IG9wdGlvbnNbJ2lkJ10gfHwgKChvcHRpb25zWydlbCddICYmIG9wdGlvbnNbJ2VsJ11bJ2lkJ10pID8gb3B0aW9uc1snZWwnXVsnaWQnXSA6IHBsYXllci5pZCgpICsgJ19jb21wb25lbnRfJyArIHZqcy5ndWlkKysgKTtcclxuXHJcbiAgICB0aGlzLm5hbWVfID0gb3B0aW9uc1snbmFtZSddIHx8IG51bGw7XHJcblxyXG4gICAgLy8gQ3JlYXRlIGVsZW1lbnQgaWYgb25lIHdhc24ndCBwcm92aWRlZCBpbiBvcHRpb25zXHJcbiAgICB0aGlzLmVsXyA9IG9wdGlvbnNbJ2VsJ10gfHwgdGhpcy5jcmVhdGVFbCgpO1xyXG5cclxuICAgIHRoaXMuY2hpbGRyZW5fID0gW107XHJcbiAgICB0aGlzLmNoaWxkSW5kZXhfID0ge307XHJcbiAgICB0aGlzLmNoaWxkTmFtZUluZGV4XyA9IHt9O1xyXG5cclxuICAgIC8vIEFkZCBhbnkgY2hpbGQgY29tcG9uZW50cyBpbiBvcHRpb25zXHJcbiAgICB0aGlzLmluaXRDaGlsZHJlbigpO1xyXG5cclxuICAgIHRoaXMucmVhZHkocmVhZHkpO1xyXG4gICAgLy8gRG9uJ3Qgd2FudCB0byB0cmlnZ2VyIHJlYWR5IGhlcmUgb3IgaXQgd2lsbCBiZWZvcmUgaW5pdCBpcyBhY3R1YWxseVxyXG4gICAgLy8gZmluaXNoZWQgZm9yIGFsbCBjaGlsZHJlbiB0aGF0IHJ1biB0aGlzIGNvbnN0cnVjdG9yXHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBEaXNwb3NlIG9mIHRoZSBjb21wb25lbnQgYW5kIGFsbCBjaGlsZCBjb21wb25lbnRzXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRyaWdnZXIoJ2Rpc3Bvc2UnKTtcclxuXHJcbiAgLy8gRGlzcG9zZSBhbGwgY2hpbGRyZW4uXHJcbiAgaWYgKHRoaXMuY2hpbGRyZW5fKSB7XHJcbiAgICBmb3IgKHZhciBpID0gdGhpcy5jaGlsZHJlbl8ubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgaWYgKHRoaXMuY2hpbGRyZW5fW2ldLmRpc3Bvc2UpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuX1tpXS5kaXNwb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8vIERlbGV0ZSBjaGlsZCByZWZlcmVuY2VzXHJcbiAgdGhpcy5jaGlsZHJlbl8gPSBudWxsO1xyXG4gIHRoaXMuY2hpbGRJbmRleF8gPSBudWxsO1xyXG4gIHRoaXMuY2hpbGROYW1lSW5kZXhfID0gbnVsbDtcclxuXHJcbiAgLy8gUmVtb3ZlIGFsbCBldmVudCBsaXN0ZW5lcnMuXHJcbiAgdGhpcy5vZmYoKTtcclxuXHJcbiAgLy8gUmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cclxuICBpZiAodGhpcy5lbF8ucGFyZW50Tm9kZSkge1xyXG4gICAgdGhpcy5lbF8ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLmVsXyk7XHJcbiAgfVxyXG5cclxuICB2anMucmVtb3ZlRGF0YSh0aGlzLmVsXyk7XHJcbiAgdGhpcy5lbF8gPSBudWxsO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlZmVyZW5jZSB0byBtYWluIHBsYXllciBpbnN0YW5jZVxyXG4gKlxyXG4gKiBAdHlwZSB7dmpzLlBsYXllcn1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnBsYXllcl8gPSB0cnVlO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgY29tcG9uZW50J3MgcGxheWVyXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5wbGF5ZXIgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLnBsYXllcl87XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGNvbXBvbmVudCdzIG9wdGlvbnMgb2JqZWN0XHJcbiAqXHJcbiAqIEB0eXBlIHtPYmplY3R9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vcHRpb25zXztcclxuXHJcbi8qKlxyXG4gKiBEZWVwIG1lcmdlIG9mIG9wdGlvbnMgb2JqZWN0c1xyXG4gKlxyXG4gKiBXaGVuZXZlciBhIHByb3BlcnR5IGlzIGFuIG9iamVjdCBvbiBib3RoIG9wdGlvbnMgb2JqZWN0c1xyXG4gKiB0aGUgdHdvIHByb3BlcnRpZXMgd2lsbCBiZSBtZXJnZWQgdXNpbmcgdmpzLm9iai5kZWVwTWVyZ2UuXHJcbiAqXHJcbiAqIFRoaXMgaXMgdXNlZCBmb3IgbWVyZ2luZyBvcHRpb25zIGZvciBjaGlsZCBjb21wb25lbnRzLiBXZVxyXG4gKiB3YW50IGl0IHRvIGJlIGVhc3kgdG8gb3ZlcnJpZGUgaW5kaXZpZHVhbCBvcHRpb25zIG9uIGEgY2hpbGRcclxuICogY29tcG9uZW50IHdpdGhvdXQgaGF2aW5nIHRvIHJld3JpdGUgYWxsIHRoZSBvdGhlciBkZWZhdWx0IG9wdGlvbnMuXHJcbiAqXHJcbiAqICAgICBQYXJlbnQucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gKiAgICAgICBjaGlsZHJlbjoge1xyXG4gKiAgICAgICAgICdjaGlsZE9uZSc6IHsgJ2Zvbyc6ICdiYXInLCAnYXNkZic6ICdmZHNhJyB9LFxyXG4gKiAgICAgICAgICdjaGlsZFR3byc6IHt9LFxyXG4gKiAgICAgICAgICdjaGlsZFRocmVlJzoge31cclxuICogICAgICAgfVxyXG4gKiAgICAgfVxyXG4gKiAgICAgbmV3T3B0aW9ucyA9IHtcclxuICogICAgICAgY2hpbGRyZW46IHtcclxuICogICAgICAgICAnY2hpbGRPbmUnOiB7ICdmb28nOiAnYmF6JywgJ2FiYyc6ICcxMjMnIH1cclxuICogICAgICAgICAnY2hpbGRUd28nOiBudWxsLFxyXG4gKiAgICAgICAgICdjaGlsZEZvdXInOiB7fVxyXG4gKiAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqXHJcbiAqICAgICB0aGlzLm9wdGlvbnMobmV3T3B0aW9ucyk7XHJcbiAqXHJcbiAqIFJFU1VMVFxyXG4gKlxyXG4gKiAgICAge1xyXG4gKiAgICAgICBjaGlsZHJlbjoge1xyXG4gKiAgICAgICAgICdjaGlsZE9uZSc6IHsgJ2Zvbyc6ICdiYXonLCAnYXNkZic6ICdmZHNhJywgJ2FiYyc6ICcxMjMnIH0sXHJcbiAqICAgICAgICAgJ2NoaWxkVHdvJzogbnVsbCwgLy8gRGlzYWJsZWQuIFdvbid0IGJlIGluaXRpYWxpemVkLlxyXG4gKiAgICAgICAgICdjaGlsZFRocmVlJzoge30sXHJcbiAqICAgICAgICAgJ2NoaWxkRm91cic6IHt9XHJcbiAqICAgICAgIH1cclxuICogICAgIH1cclxuICpcclxuICogQHBhcmFtICB7T2JqZWN0fSBvYmogT2JqZWN0IHdob3NlIHZhbHVlcyB3aWxsIGJlIG92ZXJ3cml0dGVuXHJcbiAqIEByZXR1cm4ge09iamVjdH0gICAgIE5FVyBtZXJnZWQgb2JqZWN0LiBEb2VzIG5vdCByZXR1cm4gb2JqMS5cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9wdGlvbnMgPSBmdW5jdGlvbihvYmope1xyXG4gIGlmIChvYmogPT09IHVuZGVmaW5lZCkgcmV0dXJuIHRoaXMub3B0aW9uc187XHJcblxyXG4gIHJldHVybiB0aGlzLm9wdGlvbnNfID0gdmpzLm9iai5kZWVwTWVyZ2UodGhpcy5vcHRpb25zXywgb2JqKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgRE9NIGVsZW1lbnQgZm9yIHRoZSBjb21wb25lbnRcclxuICpcclxuICogQHR5cGUge0VsZW1lbnR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5lbF87XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHRoZSBjb21wb25lbnQncyBET00gZWxlbWVudFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSB0YWdOYW1lICBFbGVtZW50J3Mgbm9kZSB0eXBlLiBlLmcuICdkaXYnXHJcbiAqIEBwYXJhbSAge09iamVjdD19IGF0dHJpYnV0ZXMgQW4gb2JqZWN0IG9mIGVsZW1lbnQgYXR0cmlidXRlcyB0aGF0IHNob3VsZCBiZSBzZXQgb24gdGhlIGVsZW1lbnRcclxuICogQHJldHVybiB7RWxlbWVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odGFnTmFtZSwgYXR0cmlidXRlcyl7XHJcbiAgcmV0dXJuIHZqcy5jcmVhdGVFbCh0YWdOYW1lLCBhdHRyaWJ1dGVzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvbXBvbmVudCdzIERPTSBlbGVtZW50XHJcbiAqXHJcbiAqICAgICB2YXIgZG9tRWwgPSBteUNvbXBvbmVudC5lbCgpO1xyXG4gKlxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmVsXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBbiBvcHRpb25hbCBlbGVtZW50IHdoZXJlLCBpZiBkZWZpbmVkLCBjaGlsZHJlbiB3aWxsIGJlIGluc2VydGVkIGluc3RlYWQgb2ZcclxuICogZGlyZWN0bHkgaW4gYGVsX2BcclxuICpcclxuICogQHR5cGUge0VsZW1lbnR9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jb250ZW50RWxfO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybiB0aGUgY29tcG9uZW50J3MgRE9NIGVsZW1lbnQgZm9yIGVtYmVkZGluZyBjb250ZW50LlxyXG4gKiBXaWxsIGVpdGhlciBiZSBlbF8gb3IgYSBuZXcgZWxlbWVudCBkZWZpbmVkIGluIGNyZWF0ZUVsLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtFbGVtZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY29udGVudEVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5jb250ZW50RWxfIHx8IHRoaXMuZWxfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBJRCBmb3IgdGhlIGNvbXBvbmVudFxyXG4gKlxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaWRfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY29tcG9uZW50J3MgSURcclxuICpcclxuICogICAgIHZhciBpZCA9IG15Q29tcG9uZW50LmlkKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlkID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5pZF87XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIG5hbWUgZm9yIHRoZSBjb21wb25lbnQuIE9mdGVuIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBjb21wb25lbnQuXHJcbiAqXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5uYW1lXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIGNvbXBvbmVudCdzIG5hbWUuIFRoZSBuYW1lIGlzIG9mdGVuIHVzZWQgdG8gcmVmZXJlbmNlIHRoZSBjb21wb25lbnQuXHJcbiAqXHJcbiAqICAgICB2YXIgbmFtZSA9IG15Q29tcG9uZW50Lm5hbWUoKTtcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUubmFtZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMubmFtZV87XHJcbn07XHJcblxyXG4vKipcclxuICogQXJyYXkgb2YgY2hpbGQgY29tcG9uZW50c1xyXG4gKlxyXG4gKiBAdHlwZSB7QXJyYXl9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5jaGlsZHJlbl87XHJcblxyXG4vKipcclxuICogR2V0IGFuIGFycmF5IG9mIGFsbCBjaGlsZCBjb21wb25lbnRzXHJcbiAqXHJcbiAqICAgICB2YXIga2lkcyA9IG15Q29tcG9uZW50LmNoaWxkcmVuKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge0FycmF5fSBUaGUgY2hpbGRyZW5cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNoaWxkcmVuID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5jaGlsZHJlbl87XHJcbn07XHJcblxyXG4vKipcclxuICogT2JqZWN0IG9mIGNoaWxkIGNvbXBvbmVudHMgYnkgSURcclxuICpcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmNoaWxkSW5kZXhfO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBjaGlsZCBjb21wb25lbnQgd2l0aCB0aGUgcHJvdmlkZWQgSURcclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmdldENoaWxkQnlJZCA9IGZ1bmN0aW9uKGlkKXtcclxuICByZXR1cm4gdGhpcy5jaGlsZEluZGV4X1tpZF07XHJcbn07XHJcblxyXG4vKipcclxuICogT2JqZWN0IG9mIGNoaWxkIGNvbXBvbmVudHMgYnkgbmFtZVxyXG4gKlxyXG4gKiBAdHlwZSB7T2JqZWN0fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY2hpbGROYW1lSW5kZXhfO1xyXG5cclxuLyoqXHJcbiAqIFJldHVybnMgYSBjaGlsZCBjb21wb25lbnQgd2l0aCB0aGUgcHJvdmlkZWQgSURcclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmdldENoaWxkID0gZnVuY3Rpb24obmFtZSl7XHJcbiAgcmV0dXJuIHRoaXMuY2hpbGROYW1lSW5kZXhfW25hbWVdO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYSBjaGlsZCBjb21wb25lbnQgaW5zaWRlIHRoaXMgY29tcG9uZW50XHJcbiAqXHJcbiAqICAgICBteUNvbXBvbmVudC5lbCgpO1xyXG4gKiAgICAgLy8gLT4gPGRpdiBjbGFzcz0nbXktY29tcG9uZW50Jz48L2Rpdj5cclxuICogICAgIG15Q29tb25lbnQuY2hpbGRyZW4oKTtcclxuICogICAgIC8vIFtlbXB0eSBhcnJheV1cclxuICpcclxuICogICAgIHZhciBteUJ1dHRvbiA9IG15Q29tcG9uZW50LmFkZENoaWxkKCdNeUJ1dHRvbicpO1xyXG4gKiAgICAgLy8gLT4gPGRpdiBjbGFzcz0nbXktY29tcG9uZW50Jz48ZGl2IGNsYXNzPVwibXktYnV0dG9uXCI+bXlCdXR0b248ZGl2PjwvZGl2PlxyXG4gKiAgICAgLy8gLT4gbXlCdXR0b24gPT09IG15Q29tb25lbnQuY2hpbGRyZW4oKVswXTtcclxuICpcclxuICogUGFzcyBpbiBvcHRpb25zIGZvciBjaGlsZCBjb25zdHJ1Y3RvcnMgYW5kIG9wdGlvbnMgZm9yIGNoaWxkcmVuIG9mIHRoZSBjaGlsZFxyXG4gKlxyXG4gKiAgICB2YXIgbXlCdXR0b24gPSBteUNvbXBvbmVudC5hZGRDaGlsZCgnTXlCdXR0b24nLCB7XHJcbiAqICAgICAgdGV4dDogJ1ByZXNzIE1lJyxcclxuICogICAgICBjaGlsZHJlbjoge1xyXG4gKiAgICAgICAgYnV0dG9uQ2hpbGRFeGFtcGxlOiB7XHJcbiAqICAgICAgICAgIGJ1dHRvbkNoaWxkT3B0aW9uOiB0cnVlXHJcbiAqICAgICAgICB9XHJcbiAqICAgICAgfVxyXG4gKiAgICB9KTtcclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd8dmpzLkNvbXBvbmVudH0gY2hpbGQgVGhlIGNsYXNzIG5hbWUgb3IgaW5zdGFuY2Ugb2YgYSBjaGlsZCB0byBhZGRcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zIE9wdGlvbnMsIGluY2x1ZGluZyBvcHRpb25zIHRvIGJlIHBhc3NlZCB0byBjaGlsZHJlbiBvZiB0aGUgY2hpbGQuXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IFRoZSBjaGlsZCBjb21wb25lbnQgKGNyZWF0ZWQgYnkgdGhpcyBwcm9jZXNzIGlmIGEgc3RyaW5nIHdhcyB1c2VkKVxyXG4gKiBAc3VwcHJlc3Mge2FjY2Vzc0NvbnRyb2xzfGNoZWNrUmVnRXhwfGNoZWNrVHlwZXN8Y2hlY2tWYXJzfGNvbnN0fGNvbnN0YW50UHJvcGVydHl8ZGVwcmVjYXRlZHxkdXBsaWNhdGV8ZXM1U3RyaWN0fGZpbGVvdmVydmlld1RhZ3N8Z2xvYmFsVGhpc3xpbnZhbGlkQ2FzdHN8bWlzc2luZ1Byb3BlcnRpZXN8bm9uU3RhbmRhcmRKc0RvY3N8c3RyaWN0TW9kdWxlRGVwQ2hlY2t8dW5kZWZpbmVkTmFtZXN8dW5kZWZpbmVkVmFyc3x1bmtub3duRGVmaW5lc3x1c2VsZXNzQ29kZXx2aXNpYmlsaXR5fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuYWRkQ2hpbGQgPSBmdW5jdGlvbihjaGlsZCwgb3B0aW9ucyl7XHJcbiAgdmFyIGNvbXBvbmVudCwgY29tcG9uZW50Q2xhc3MsIGNvbXBvbmVudE5hbWUsIGNvbXBvbmVudElkO1xyXG5cclxuICAvLyBJZiBzdHJpbmcsIGNyZWF0ZSBuZXcgY29tcG9uZW50IHdpdGggb3B0aW9uc1xyXG4gIGlmICh0eXBlb2YgY2hpbGQgPT09ICdzdHJpbmcnKSB7XHJcblxyXG4gICAgY29tcG9uZW50TmFtZSA9IGNoaWxkO1xyXG5cclxuICAgIC8vIE1ha2Ugc3VyZSBvcHRpb25zIGlzIGF0IGxlYXN0IGFuIGVtcHR5IG9iamVjdCB0byBwcm90ZWN0IGFnYWluc3QgZXJyb3JzXHJcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgICAvLyBBc3N1bWUgbmFtZSBvZiBzZXQgaXMgYSBsb3dlcmNhc2VkIG5hbWUgb2YgdGhlIFVJIENsYXNzIChQbGF5QnV0dG9uLCBldGMuKVxyXG4gICAgY29tcG9uZW50Q2xhc3MgPSBvcHRpb25zWydjb21wb25lbnRDbGFzcyddIHx8IHZqcy5jYXBpdGFsaXplKGNvbXBvbmVudE5hbWUpO1xyXG5cclxuICAgIC8vIFNldCBuYW1lIHRocm91Z2ggb3B0aW9uc1xyXG4gICAgb3B0aW9uc1snbmFtZSddID0gY29tcG9uZW50TmFtZTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgb2JqZWN0ICYgZWxlbWVudCBmb3IgdGhpcyBjb250cm9scyBzZXRcclxuICAgIC8vIElmIHRoZXJlJ3Mgbm8gLnBsYXllcl8sIHRoaXMgaXMgYSBwbGF5ZXJcclxuICAgIC8vIENsb3N1cmUgQ29tcGlsZXIgdGhyb3dzIGFuICdpbmNvbXBsZXRlIGFsaWFzJyB3YXJuaW5nIGlmIHdlIHVzZSB0aGUgdmpzIHZhcmlhYmxlIGRpcmVjdGx5LlxyXG4gICAgLy8gRXZlcnkgY2xhc3Mgc2hvdWxkIGJlIGV4cG9ydGVkLCBzbyB0aGlzIHNob3VsZCBuZXZlciBiZSBhIHByb2JsZW0gaGVyZS5cclxuICAgIGNvbXBvbmVudCA9IG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVtjb21wb25lbnRDbGFzc10odGhpcy5wbGF5ZXJfIHx8IHRoaXMsIG9wdGlvbnMpO1xyXG5cclxuICAvLyBjaGlsZCBpcyBhIGNvbXBvbmVudCBpbnN0YW5jZVxyXG4gIH0gZWxzZSB7XHJcbiAgICBjb21wb25lbnQgPSBjaGlsZDtcclxuICB9XHJcblxyXG4gIHRoaXMuY2hpbGRyZW5fLnB1c2goY29tcG9uZW50KTtcclxuXHJcbiAgaWYgKHR5cGVvZiBjb21wb25lbnQuaWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIHRoaXMuY2hpbGRJbmRleF9bY29tcG9uZW50LmlkKCldID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLy8gSWYgYSBuYW1lIHdhc24ndCB1c2VkIHRvIGNyZWF0ZSB0aGUgY29tcG9uZW50LCBjaGVjayBpZiB3ZSBjYW4gdXNlIHRoZVxyXG4gIC8vIG5hbWUgZnVuY3Rpb24gb2YgdGhlIGNvbXBvbmVudFxyXG4gIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IChjb21wb25lbnQubmFtZSAmJiBjb21wb25lbnQubmFtZSgpKTtcclxuXHJcbiAgaWYgKGNvbXBvbmVudE5hbWUpIHtcclxuICAgIHRoaXMuY2hpbGROYW1lSW5kZXhfW2NvbXBvbmVudE5hbWVdID0gY29tcG9uZW50O1xyXG4gIH1cclxuXHJcbiAgLy8gQWRkIHRoZSBVSSBvYmplY3QncyBlbGVtZW50IHRvIHRoZSBjb250YWluZXIgZGl2IChib3gpXHJcbiAgLy8gSGF2aW5nIGFuIGVsZW1lbnQgaXMgbm90IHJlcXVpcmVkXHJcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRbJ2VsJ10gPT09ICdmdW5jdGlvbicgJiYgY29tcG9uZW50WydlbCddKCkpIHtcclxuICAgIHRoaXMuY29udGVudEVsKCkuYXBwZW5kQ2hpbGQoY29tcG9uZW50WydlbCddKCkpO1xyXG4gIH1cclxuXHJcbiAgLy8gUmV0dXJuIHNvIGl0IGNhbiBzdG9yZWQgb24gcGFyZW50IG9iamVjdCBpZiBkZXNpcmVkLlxyXG4gIHJldHVybiBjb21wb25lbnQ7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIGEgY2hpbGQgY29tcG9uZW50IGZyb20gdGhpcyBjb21wb25lbnQncyBsaXN0IG9mIGNoaWxkcmVuLCBhbmQgdGhlXHJcbiAqIGNoaWxkIGNvbXBvbmVudCdzIGVsZW1lbnQgZnJvbSB0aGlzIGNvbXBvbmVudCdzIGVsZW1lbnRcclxuICpcclxuICogQHBhcmFtICB7dmpzLkNvbXBvbmVudH0gY29tcG9uZW50IENvbXBvbmVudCB0byByZW1vdmVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnJlbW92ZUNoaWxkID0gZnVuY3Rpb24oY29tcG9uZW50KXtcclxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ3N0cmluZycpIHtcclxuICAgIGNvbXBvbmVudCA9IHRoaXMuZ2V0Q2hpbGQoY29tcG9uZW50KTtcclxuICB9XHJcblxyXG4gIGlmICghY29tcG9uZW50IHx8ICF0aGlzLmNoaWxkcmVuXykgcmV0dXJuO1xyXG5cclxuICB2YXIgY2hpbGRGb3VuZCA9IGZhbHNlO1xyXG4gIGZvciAodmFyIGkgPSB0aGlzLmNoaWxkcmVuXy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgaWYgKHRoaXMuY2hpbGRyZW5fW2ldID09PSBjb21wb25lbnQpIHtcclxuICAgICAgY2hpbGRGb3VuZCA9IHRydWU7XHJcbiAgICAgIHRoaXMuY2hpbGRyZW5fLnNwbGljZShpLDEpO1xyXG4gICAgICBicmVhaztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICghY2hpbGRGb3VuZCkgcmV0dXJuO1xyXG5cclxuICB0aGlzLmNoaWxkSW5kZXhfW2NvbXBvbmVudC5pZF0gPSBudWxsO1xyXG4gIHRoaXMuY2hpbGROYW1lSW5kZXhfW2NvbXBvbmVudC5uYW1lXSA9IG51bGw7XHJcblxyXG4gIHZhciBjb21wRWwgPSBjb21wb25lbnQuZWwoKTtcclxuICBpZiAoY29tcEVsICYmIGNvbXBFbC5wYXJlbnROb2RlID09PSB0aGlzLmNvbnRlbnRFbCgpKSB7XHJcbiAgICB0aGlzLmNvbnRlbnRFbCgpLnJlbW92ZUNoaWxkKGNvbXBvbmVudC5lbCgpKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGFuZCBpbml0aWFsaXplIGRlZmF1bHQgY2hpbGQgY29tcG9uZW50cyBmcm9tIG9wdGlvbnNcclxuICpcclxuICogICAgIC8vIHdoZW4gYW4gaW5zdGFuY2Ugb2YgTXlDb21wb25lbnQgaXMgY3JlYXRlZCwgYWxsIGNoaWxkcmVuIGluIG9wdGlvbnNcclxuICogICAgIC8vIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGluc3RhbmNlIGJ5IHRoZWlyIG5hbWUgc3RyaW5ncyBhbmQgb3B0aW9uc1xyXG4gKiAgICAgTXlDb21wb25lbnQucHJvdG90eXBlLm9wdGlvbnNfLmNoaWxkcmVuID0ge1xyXG4gKiAgICAgICBteUNoaWxkQ29tcG9uZW50OiB7XHJcbiAqICAgICAgICAgbXlDaGlsZE9wdGlvbjogdHJ1ZVxyXG4gKiAgICAgICB9XHJcbiAqICAgICB9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pbml0Q2hpbGRyZW4gPSBmdW5jdGlvbigpe1xyXG4gIHZhciBvcHRpb25zID0gdGhpcy5vcHRpb25zXztcclxuXHJcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9uc1snY2hpbGRyZW4nXSkge1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIC8vIExvb3AgdGhyb3VnaCBjb21wb25lbnRzIGFuZCBhZGQgdGhlbSB0byB0aGUgcGxheWVyXHJcbiAgICB2anMub2JqLmVhY2gob3B0aW9uc1snY2hpbGRyZW4nXSwgZnVuY3Rpb24obmFtZSwgb3B0cyl7XHJcbiAgICAgIC8vIEFsbG93IGZvciBkaXNhYmxpbmcgZGVmYXVsdCBjb21wb25lbnRzXHJcbiAgICAgIC8vIGUuZy4gdmpzLm9wdGlvbnNbJ2NoaWxkcmVuJ11bJ3Bvc3RlckltYWdlJ10gPSBmYWxzZVxyXG4gICAgICBpZiAob3B0cyA9PT0gZmFsc2UpIHJldHVybjtcclxuXHJcbiAgICAgIC8vIEFsbG93IHdhaXRpbmcgdG8gYWRkIGNvbXBvbmVudHMgdW50aWwgYSBzcGVjaWZpYyBldmVudCBpcyBjYWxsZWRcclxuICAgICAgdmFyIHRlbXBBZGQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgIC8vIFNldCBwcm9wZXJ0eSBuYW1lIG9uIHBsYXllci4gQ291bGQgY2F1c2UgY29uZmxpY3RzIHdpdGggb3RoZXIgcHJvcCBuYW1lcywgYnV0IGl0J3Mgd29ydGggbWFraW5nIHJlZnMgZWFzeS5cclxuICAgICAgICBzZWxmW25hbWVdID0gc2VsZi5hZGRDaGlsZChuYW1lLCBvcHRzKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIGlmIChvcHRzWydsb2FkRXZlbnQnXSkge1xyXG4gICAgICAgIC8vIHRoaXMub25lKG9wdHMubG9hZEV2ZW50LCB0ZW1wQWRkKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRlbXBBZGQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFsbG93cyBzdWIgY29tcG9uZW50cyB0byBzdGFjayBDU1MgY2xhc3MgbmFtZXNcclxuICpcclxuICogQHJldHVybiB7U3RyaW5nfSBUaGUgY29uc3RydWN0ZWQgY2xhc3MgbmFtZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBDaGlsZCBjbGFzc2VzIGNhbiBpbmNsdWRlIGEgZnVuY3Rpb24gdGhhdCBkb2VzOlxyXG4gICAgLy8gcmV0dXJuICdDTEFTUyBOQU1FJyArIHRoaXMuX3N1cGVyKCk7XHJcbiAgICByZXR1cm4gJyc7XHJcbn07XHJcblxyXG4vKiBFdmVudHNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4gKiBBZGQgYW4gZXZlbnQgbGlzdGVuZXIgdG8gdGhpcyBjb21wb25lbnQncyBlbGVtZW50XHJcbiAqXHJcbiAqICAgICB2YXIgbXlGdW5jID0gZnVuY3Rpb24oKXtcclxuICogICAgICAgdmFyIG15UGxheWVyID0gdGhpcztcclxuICogICAgICAgLy8gRG8gc29tZXRoaW5nIHdoZW4gdGhlIGV2ZW50IGlzIGZpcmVkXHJcbiAqICAgICB9O1xyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIub24oXCJldmVudE5hbWVcIiwgbXlGdW5jKTtcclxuICpcclxuICogVGhlIGNvbnRleHQgd2lsbCBiZSB0aGUgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdHlwZSBUaGUgZXZlbnQgdHlwZSBlLmcuICdjbGljaydcclxuICogQHBhcmFtICB7RnVuY3Rpb259IGZuICAgVGhlIGV2ZW50IGxpc3RlbmVyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9IHNlbGZcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9uID0gZnVuY3Rpb24odHlwZSwgZm4pe1xyXG4gIHZqcy5vbih0aGlzLmVsXywgdHlwZSwgdmpzLmJpbmQodGhpcywgZm4pKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYW4gZXZlbnQgbGlzdGVuZXIgZnJvbSB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxyXG4gKlxyXG4gKiAgICAgbXlDb21wb25lbnQub2ZmKFwiZXZlbnROYW1lXCIsIG15RnVuYyk7XHJcbiAqXHJcbiAqIEBwYXJhbSAge1N0cmluZz19ICAgdHlwZSBFdmVudCB0eXBlLiBXaXRob3V0IHR5cGUgaXQgd2lsbCByZW1vdmUgYWxsIGxpc3RlbmVycy5cclxuICogQHBhcmFtICB7RnVuY3Rpb249fSBmbiAgIEV2ZW50IGxpc3RlbmVyLiBXaXRob3V0IGZuIGl0IHdpbGwgcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIGEgdHlwZS5cclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uKHR5cGUsIGZuKXtcclxuICB2anMub2ZmKHRoaXMuZWxfLCB0eXBlLCBmbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGFuIGV2ZW50IGxpc3RlbmVyIHRvIGJlIHRyaWdnZXJlZCBvbmx5IG9uY2UgYW5kIHRoZW4gcmVtb3ZlZFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd9ICAgdHlwZSBFdmVudCB0eXBlXHJcbiAqIEBwYXJhbSAge0Z1bmN0aW9ufSBmbiAgIEV2ZW50IGxpc3RlbmVyXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5vbmUgPSBmdW5jdGlvbih0eXBlLCBmbikge1xyXG4gIHZqcy5vbmUodGhpcy5lbF8sIHR5cGUsIHZqcy5iaW5kKHRoaXMsIGZuKSk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlciBhbiBldmVudCBvbiBhbiBlbGVtZW50XHJcbiAqXHJcbiAqICAgICBteUNvbXBvbmVudC50cmlnZ2VyKCdldmVudE5hbWUnKTtcclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSAgICAgICB0eXBlICBUaGUgZXZlbnQgdHlwZSB0byB0cmlnZ2VyLCBlLmcuICdjbGljaydcclxuICogQHBhcmFtICB7RXZlbnR8T2JqZWN0fSBldmVudCBUaGUgZXZlbnQgb2JqZWN0IHRvIGJlIHBhc3NlZCB0byB0aGUgbGlzdGVuZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gICAgICBzZWxmXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS50cmlnZ2VyID0gZnVuY3Rpb24odHlwZSwgZXZlbnQpe1xyXG4gIHZqcy50cmlnZ2VyKHRoaXMuZWxfLCB0eXBlLCBldmVudCk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKiBSZWFkeVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogSXMgdGhlIGNvbXBvbmVudCBsb2FkZWRcclxuICogVGhpcyBjYW4gbWVhbiBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgY29tcG9uZW50LlxyXG4gKlxyXG4gKiBAcHJpdmF0ZVxyXG4gKiBAdHlwZSB7Qm9vbGVhbn1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmlzUmVhZHlfO1xyXG5cclxuLyoqXHJcbiAqIFRyaWdnZXIgcmVhZHkgYXMgc29vbiBhcyBpbml0aWFsaXphdGlvbiBpcyBmaW5pc2hlZFxyXG4gKlxyXG4gKiBBbGxvd3MgZm9yIGRlbGF5aW5nIHJlYWR5LiBPdmVycmlkZSBvbiBhIHN1YiBjbGFzcyBwcm90b3R5cGUuXHJcbiAqIElmIHlvdSBzZXQgdGhpcy5pc1JlYWR5T25Jbml0RmluaXNoXyBpdCB3aWxsIGFmZmVjdCBhbGwgY29tcG9uZW50cy5cclxuICogU3BlY2lhbGx5IHVzZWQgd2hlbiB3YWl0aW5nIGZvciB0aGUgRmxhc2ggcGxheWVyIHRvIGFzeW5jaHJub3VzbHkgbG9hZC5cclxuICpcclxuICogQHR5cGUge0Jvb2xlYW59XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWR5T25Jbml0RmluaXNoXyA9IHRydWU7XHJcblxyXG4vKipcclxuICogTGlzdCBvZiByZWFkeSBsaXN0ZW5lcnNcclxuICpcclxuICogQHR5cGUge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUucmVhZHlRdWV1ZV87XHJcblxyXG4vKipcclxuICogQmluZCBhIGxpc3RlbmVyIHRvIHRoZSBjb21wb25lbnQncyByZWFkeSBzdGF0ZVxyXG4gKlxyXG4gKiBEaWZmZXJlbnQgZnJvbSBldmVudCBsaXN0ZW5lcnMgaW4gdGhhdCBpZiB0aGUgcmVhZHkgZXZlbnQgaGFzIGFscmVhZHkgaGFwcGVuZFxyXG4gKiBpdCB3aWxsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIGltbWVkaWF0ZWx5LlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtGdW5jdGlvbn0gZm4gUmVhZHkgbGlzdGVuZXJcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnJlYWR5ID0gZnVuY3Rpb24oZm4pe1xyXG4gIGlmIChmbikge1xyXG4gICAgaWYgKHRoaXMuaXNSZWFkeV8pIHtcclxuICAgICAgZm4uY2FsbCh0aGlzKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLnJlYWR5UXVldWVfID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICB0aGlzLnJlYWR5UXVldWVfID0gW107XHJcbiAgICAgIH1cclxuICAgICAgdGhpcy5yZWFkeVF1ZXVlXy5wdXNoKGZuKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogVHJpZ2dlciB0aGUgcmVhZHkgbGlzdGVuZXJzXHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5Db21wb25lbnR9XHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS50cmlnZ2VyUmVhZHkgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuaXNSZWFkeV8gPSB0cnVlO1xyXG5cclxuICB2YXIgcmVhZHlRdWV1ZSA9IHRoaXMucmVhZHlRdWV1ZV87XHJcblxyXG4gIGlmIChyZWFkeVF1ZXVlICYmIHJlYWR5UXVldWUubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwLCBqID0gcmVhZHlRdWV1ZS5sZW5ndGg7IGkgPCBqOyBpKyspIHtcclxuICAgICAgcmVhZHlRdWV1ZVtpXS5jYWxsKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlc2V0IFJlYWR5IFF1ZXVlXHJcbiAgICB0aGlzLnJlYWR5UXVldWVfID0gW107XHJcblxyXG4gICAgLy8gQWxsb3cgZm9yIHVzaW5nIGV2ZW50IGxpc3RlbmVycyBhbHNvLCBpbiBjYXNlIHlvdSB3YW50IHRvIGRvIHNvbWV0aGluZyBldmVyeXRpbWUgYSBzb3VyY2UgaXMgcmVhZHkuXHJcbiAgICB0aGlzLnRyaWdnZXIoJ3JlYWR5Jyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyogRGlzcGxheVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyoqXHJcbiAqIEFkZCBhIENTUyBjbGFzcyBuYW1lIHRvIHRoZSBjb21wb25lbnQncyBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1RvQWRkIENsYXNzbmFtZSB0byBhZGRcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmFkZENsYXNzID0gZnVuY3Rpb24oY2xhc3NUb0FkZCl7XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCBjbGFzc1RvQWRkKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZW1vdmUgYSBDU1MgY2xhc3MgbmFtZSBmcm9tIHRoZSBjb21wb25lbnQncyBlbGVtZW50XHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBjbGFzc1RvUmVtb3ZlIENsYXNzbmFtZSB0byByZW1vdmVcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oY2xhc3NUb1JlbW92ZSl7XHJcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCBjbGFzc1RvUmVtb3ZlKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaG93IHRoZSBjb21wb25lbnQgZWxlbWVudCBpZiBoaWRkZW5cclxuICpcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH1cclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEhpZGUgdGhlIGNvbXBvbmVudCBlbGVtZW50IGlmIGhpZGRlblxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBMb2NrIGFuIGl0ZW0gaW4gaXRzIHZpc2libGUgc3RhdGVcclxuICogVG8gYmUgdXNlZCB3aXRoIGZhZGVJbi9mYWRlT3V0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUubG9ja1Nob3dpbmcgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1sb2NrLXNob3dpbmcnKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBVbmxvY2sgYW4gaXRlbSB0byBiZSBoaWRkZW5cclxuICogVG8gYmUgdXNlZCB3aXRoIGZhZGVJbi9mYWRlT3V0LlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUudW5sb2NrU2hvd2luZyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWxvY2stc2hvd2luZycpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc2FibGUgY29tcG9uZW50IGJ5IG1ha2luZyBpdCB1bnNob3dhYmxlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaXNhYmxlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmhpZGUoKTtcclxuICB0aGlzLnNob3cgPSBmdW5jdGlvbigpe307XHJcbn07XHJcblxyXG4vKipcclxuICogU2V0IG9yIGdldCB0aGUgd2lkdGggb2YgdGhlIGNvbXBvbmVudCAoQ1NTIHZhbHVlcylcclxuICpcclxuICogVmlkZW8gdGFnIHdpZHRoL2hlaWdodCBvbmx5IHdvcmsgaW4gcGl4ZWxzLiBObyBwZXJjZW50cy5cclxuICogQnV0IGFsbG93aW5nIGxpbWl0ZWQgcGVyY2VudHMgdXNlLiBlLmcuIHdpZHRoKCkgd2lsbCByZXR1cm4gbnVtYmVyKyUsIG5vdCBjb21wdXRlZCB3aWR0aFxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nPX0gbnVtICAgT3B0aW9uYWwgd2lkdGggbnVtYmVyXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IHNraXBMaXN0ZW5lcnMgU2tpcCB0aGUgJ3Jlc2l6ZScgZXZlbnQgdHJpZ2dlclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBSZXR1cm5zICd0aGlzJyBpZiB3aWR0aCB3YXMgc2V0XHJcbiAqIEByZXR1cm4ge051bWJlcnxTdHJpbmd9IFJldHVybnMgdGhlIHdpZHRoIGlmIG5vdGhpbmcgd2FzIHNldFxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUud2lkdGggPSBmdW5jdGlvbihudW0sIHNraXBMaXN0ZW5lcnMpe1xyXG4gIHJldHVybiB0aGlzLmRpbWVuc2lvbignd2lkdGgnLCBudW0sIHNraXBMaXN0ZW5lcnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBvciBzZXQgdGhlIGhlaWdodCBvZiB0aGUgY29tcG9uZW50IChDU1MgdmFsdWVzKVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nPX0gbnVtICAgICBOZXcgY29tcG9uZW50IGhlaWdodFxyXG4gKiBAcGFyYW0gIHtCb29sZWFuPX0gc2tpcExpc3RlbmVycyBTa2lwIHRoZSByZXNpemUgZXZlbnQgdHJpZ2dlclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBUaGUgY29tcG9uZW50IGlmIHRoZSBoZWlnaHQgd2FzIHNldFxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ8U3RyaW5nfSBUaGUgaGVpZ2h0IGlmIGl0IHdhc24ndCBzZXRcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmhlaWdodCA9IGZ1bmN0aW9uKG51bSwgc2tpcExpc3RlbmVycyl7XHJcbiAgcmV0dXJuIHRoaXMuZGltZW5zaW9uKCdoZWlnaHQnLCBudW0sIHNraXBMaXN0ZW5lcnMpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCBib3RoIHdpZHRoIGFuZCBoZWlnaHQgYXQgdGhlIHNhbWUgdGltZVxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSB3aWR0aFxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ8U3RyaW5nfSBoZWlnaHRcclxuICogQHJldHVybiB7dmpzLkNvbXBvbmVudH0gVGhlIGNvbXBvbmVudFxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUuZGltZW5zaW9ucyA9IGZ1bmN0aW9uKHdpZHRoLCBoZWlnaHQpe1xyXG4gIC8vIFNraXAgcmVzaXplIGxpc3RlbmVycyBvbiB3aWR0aCBmb3Igb3B0aW1pemF0aW9uXHJcbiAgcmV0dXJuIHRoaXMud2lkdGgod2lkdGgsIHRydWUpLmhlaWdodChoZWlnaHQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBvciBzZXQgd2lkdGggb3IgaGVpZ2h0XHJcbiAqXHJcbiAqIFRoaXMgaXMgdGhlIHNoYXJlZCBjb2RlIGZvciB0aGUgd2lkdGgoKSBhbmQgaGVpZ2h0KCkgbWV0aG9kcy5cclxuICogQWxsIGZvciBhbiBpbnRlZ2VyLCBpbnRlZ2VyICsgJ3B4JyBvciBpbnRlZ2VyICsgJyUnO1xyXG4gKlxyXG4gKiBLbm93biBpc3N1ZTogSGlkZGVuIGVsZW1lbnRzIG9mZmljaWFsbHkgaGF2ZSBhIHdpZHRoIG9mIDAuIFdlJ3JlIGRlZmF1bHRpbmdcclxuICogdG8gdGhlIHN0eWxlLndpZHRoIHZhbHVlIGFuZCBmYWxsaW5nIGJhY2sgdG8gY29tcHV0ZWRTdHlsZSB3aGljaCBoYXMgdGhlXHJcbiAqIGhpZGRlbiBlbGVtZW50IGlzc3VlLiBJbmZvLCBidXQgcHJvYmFibHkgbm90IGFuIGVmZmljaWVudCBmaXg6XHJcbiAqIGh0dHA6Ly93d3cuZm9saW90ZWsuY29tL2RldmJsb2cvZ2V0dGluZy10aGUtd2lkdGgtb2YtYS1oaWRkZW4tZWxlbWVudC13aXRoLWpxdWVyeS11c2luZy13aWR0aC9cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSB3aWR0aE9ySGVpZ2h0ICAnd2lkdGgnIG9yICdoZWlnaHQnXHJcbiAqIEBwYXJhbSAge051bWJlcnxTdHJpbmc9fSBudW0gICAgIE5ldyBkaW1lbnNpb25cclxuICogQHBhcmFtICB7Qm9vbGVhbj19IHNraXBMaXN0ZW5lcnMgU2tpcCByZXNpemUgZXZlbnQgdHJpZ2dlclxyXG4gKiBAcmV0dXJuIHt2anMuQ29tcG9uZW50fSBUaGUgY29tcG9uZW50IGlmIGEgZGltZW5zaW9uIHdhcyBzZXRcclxuICogQHJldHVybiB7TnVtYmVyfFN0cmluZ30gVGhlIGRpbWVuc2lvbiBpZiBub3RoaW5nIHdhcyBzZXRcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5Db21wb25lbnQucHJvdG90eXBlLmRpbWVuc2lvbiA9IGZ1bmN0aW9uKHdpZHRoT3JIZWlnaHQsIG51bSwgc2tpcExpc3RlbmVycyl7XHJcbiAgaWYgKG51bSAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdXNpbmcgY3NzIHdpZHRoL2hlaWdodCAoJSBvciBweCkgYW5kIGFkanVzdFxyXG4gICAgaWYgKCgnJytudW0pLmluZGV4T2YoJyUnKSAhPT0gLTEgfHwgKCcnK251bSkuaW5kZXhPZigncHgnKSAhPT0gLTEpIHtcclxuICAgICAgdGhpcy5lbF8uc3R5bGVbd2lkdGhPckhlaWdodF0gPSBudW07XHJcbiAgICB9IGVsc2UgaWYgKG51bSA9PT0gJ2F1dG8nKSB7XHJcbiAgICAgIHRoaXMuZWxfLnN0eWxlW3dpZHRoT3JIZWlnaHRdID0gJyc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsXy5zdHlsZVt3aWR0aE9ySGVpZ2h0XSA9IG51bSsncHgnO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHNraXBMaXN0ZW5lcnMgYWxsb3dzIHVzIHRvIGF2b2lkIHRyaWdnZXJpbmcgdGhlIHJlc2l6ZSBldmVudCB3aGVuIHNldHRpbmcgYm90aCB3aWR0aCBhbmQgaGVpZ2h0XHJcbiAgICBpZiAoIXNraXBMaXN0ZW5lcnMpIHsgdGhpcy50cmlnZ2VyKCdyZXNpemUnKTsgfVxyXG5cclxuICAgIC8vIFJldHVybiBjb21wb25lbnRcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gTm90IHNldHRpbmcgYSB2YWx1ZSwgc28gZ2V0dGluZyBpdFxyXG4gIC8vIE1ha2Ugc3VyZSBlbGVtZW50IGV4aXN0c1xyXG4gIGlmICghdGhpcy5lbF8pIHJldHVybiAwO1xyXG5cclxuICAvLyBHZXQgZGltZW5zaW9uIHZhbHVlIGZyb20gc3R5bGVcclxuICB2YXIgdmFsID0gdGhpcy5lbF8uc3R5bGVbd2lkdGhPckhlaWdodF07XHJcbiAgdmFyIHB4SW5kZXggPSB2YWwuaW5kZXhPZigncHgnKTtcclxuICBpZiAocHhJbmRleCAhPT0gLTEpIHtcclxuICAgIC8vIFJldHVybiB0aGUgcGl4ZWwgdmFsdWUgd2l0aCBubyAncHgnXHJcbiAgICByZXR1cm4gcGFyc2VJbnQodmFsLnNsaWNlKDAscHhJbmRleCksIDEwKTtcclxuXHJcbiAgLy8gTm8gcHggc28gdXNpbmcgJSBvciBubyBzdHlsZSB3YXMgc2V0LCBzbyBmYWxsaW5nIGJhY2sgdG8gb2Zmc2V0V2lkdGgvaGVpZ2h0XHJcbiAgLy8gSWYgY29tcG9uZW50IGhhcyBkaXNwbGF5Om5vbmUsIG9mZnNldCB3aWxsIHJldHVybiAwXHJcbiAgLy8gVE9ETzogaGFuZGxlIGRpc3BsYXk6bm9uZSBhbmQgbm8gZGltZW5zaW9uIHN0eWxlIHVzaW5nIHB4XHJcbiAgfSBlbHNlIHtcclxuXHJcbiAgICByZXR1cm4gcGFyc2VJbnQodGhpcy5lbF9bJ29mZnNldCcrdmpzLmNhcGl0YWxpemUod2lkdGhPckhlaWdodCldLCAxMCk7XHJcblxyXG4gICAgLy8gQ29tcHV0ZWRTdHlsZSB2ZXJzaW9uLlxyXG4gICAgLy8gT25seSBkaWZmZXJlbmNlIGlzIGlmIHRoZSBlbGVtZW50IGlzIGhpZGRlbiBpdCB3aWxsIHJldHVyblxyXG4gICAgLy8gdGhlIHBlcmNlbnQgdmFsdWUgKGUuZy4gJzEwMCUnJylcclxuICAgIC8vIGluc3RlYWQgb2YgemVybyBsaWtlIG9mZnNldFdpZHRoIHJldHVybnMuXHJcbiAgICAvLyB2YXIgdmFsID0gdmpzLmdldENvbXB1dGVkU3R5bGVWYWx1ZSh0aGlzLmVsXywgd2lkdGhPckhlaWdodCk7XHJcbiAgICAvLyB2YXIgcHhJbmRleCA9IHZhbC5pbmRleE9mKCdweCcpO1xyXG5cclxuICAgIC8vIGlmIChweEluZGV4ICE9PSAtMSkge1xyXG4gICAgLy8gICByZXR1cm4gdmFsLnNsaWNlKDAsIHB4SW5kZXgpO1xyXG4gICAgLy8gfSBlbHNlIHtcclxuICAgIC8vICAgcmV0dXJuIHZhbDtcclxuICAgIC8vIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgd2lkdGggYW5kL29yIGhlaWdodCBvZiB0aGUgY29tcG9uZW50IGNoYW5nZXNcclxuICogQGV2ZW50IHJlc2l6ZVxyXG4gKi9cclxudmpzLkNvbXBvbmVudC5wcm90b3R5cGUub25SZXNpemU7XHJcblxyXG4vKipcclxuICogRW1pdCAndGFwJyBldmVudHMgd2hlbiB0b3VjaCBldmVudHMgYXJlIHN1cHBvcnRlZFxyXG4gKlxyXG4gKiBUaGlzIGlzIHVzZWQgdG8gc3VwcG9ydCB0b2dnbGluZyB0aGUgY29udHJvbHMgdGhyb3VnaCBhIHRhcCBvbiB0aGUgdmlkZW8uXHJcbiAqXHJcbiAqIFdlJ3JlIHJlcXVpcmVpbmcgdGhlbSB0byBiZSBlbmFibGVkIGJlY2F1c2Ugb3RoZXJ3aXNlIGV2ZXJ5IGNvbXBvbmVudCB3b3VsZFxyXG4gKiBoYXZlIHRoaXMgZXh0cmEgb3ZlcmhlYWQgdW5uZWNlc3NhcmlseSwgb24gbW9iaWxlIGRldmljZXMgd2hlcmUgZXh0cmFcclxuICogb3ZlcmhlYWQgaXMgZXNwZWNpYWxseSBiYWQuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuQ29tcG9uZW50LnByb3RvdHlwZS5lbWl0VGFwRXZlbnRzID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdG91Y2hTdGFydCwgdG91Y2hUaW1lLCBjb3VsZEJlVGFwLCBub1RhcDtcclxuXHJcbiAgLy8gVHJhY2sgdGhlIHN0YXJ0IHRpbWUgc28gd2UgY2FuIGRldGVybWluZSBob3cgbG9uZyB0aGUgdG91Y2ggbGFzdGVkXHJcbiAgdG91Y2hTdGFydCA9IDA7XHJcblxyXG4gIHRoaXMub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy8gUmVjb3JkIHN0YXJ0IHRpbWUgc28gd2UgY2FuIGRldGVjdCBhIHRhcCB2cy4gXCJ0b3VjaCBhbmQgaG9sZFwiXHJcbiAgICB0b3VjaFN0YXJ0ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAvLyBSZXNldCBjb3VsZEJlVGFwIHRyYWNraW5nXHJcbiAgICBjb3VsZEJlVGFwID0gdHJ1ZTtcclxuICB9KTtcclxuXHJcbiAgbm9UYXAgPSBmdW5jdGlvbigpe1xyXG4gICAgY291bGRCZVRhcCA9IGZhbHNlO1xyXG4gIH07XHJcbiAgLy8gVE9ETzogTGlzdGVuIHRvIHRoZSBvcmlnaW5hbCB0YXJnZXQuIGh0dHA6Ly95b3V0dS5iZS9EdWpmcFhPS1VwOD90PTEzbThzXHJcbiAgdGhpcy5vbigndG91Y2htb3ZlJywgbm9UYXApO1xyXG4gIHRoaXMub24oJ3RvdWNobGVhdmUnLCBub1RhcCk7XHJcbiAgdGhpcy5vbigndG91Y2hjYW5jZWwnLCBub1RhcCk7XHJcblxyXG4gIC8vIFdoZW4gdGhlIHRvdWNoIGVuZHMsIG1lYXN1cmUgaG93IGxvbmcgaXQgdG9vayBhbmQgdHJpZ2dlciB0aGUgYXBwcm9wcmlhdGVcclxuICAvLyBldmVudFxyXG4gIHRoaXMub24oJ3RvdWNoZW5kJywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBQcm9jZWVkIG9ubHkgaWYgdGhlIHRvdWNobW92ZS9sZWF2ZS9jYW5jZWwgZXZlbnQgZGlkbid0IGhhcHBlblxyXG4gICAgaWYgKGNvdWxkQmVUYXAgPT09IHRydWUpIHtcclxuICAgICAgLy8gTWVhc3VyZSBob3cgbG9uZyB0aGUgdG91Y2ggbGFzdGVkXHJcbiAgICAgIHRvdWNoVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gdG91Y2hTdGFydDtcclxuICAgICAgLy8gVGhlIHRvdWNoIG5lZWRzIHRvIGJlIHF1aWNrIGluIG9yZGVyIHRvIGNvbnNpZGVyIGl0IGEgdGFwXHJcbiAgICAgIGlmICh0b3VjaFRpbWUgPCAyNTApIHtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3RhcCcpO1xyXG4gICAgICAgIC8vIEl0IG1heSBiZSBnb29kIHRvIGNvcHkgdGhlIHRvdWNoZW5kIGV2ZW50IG9iamVjdCBhbmQgY2hhbmdlIHRoZVxyXG4gICAgICAgIC8vIHR5cGUgdG8gdGFwLCBpZiB0aGUgb3RoZXIgZXZlbnQgcHJvcGVydGllcyBhcmVuJ3QgZXhhY3QgYWZ0ZXJcclxuICAgICAgICAvLyB2anMuZml4RXZlbnQgcnVucyAoZS5nLiBldmVudC50YXJnZXQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxufTtcclxuLyogQnV0dG9uIC0gQmFzZSBjbGFzcyBmb3IgYWxsIGJ1dHRvbnNcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIGFsbCBidXR0b25zXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkJ1dHRvbiA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKipcclxuICAgKiBAY29uc3RydWN0b3JcclxuICAgKiBAaW5oZXJpdERvY1xyXG4gICAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICB2YXIgdG91Y2hzdGFydCA9IGZhbHNlO1xyXG4gICAgdGhpcy5vbigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcbiAgICAgIC8vIFN0b3AgY2xpY2sgYW5kIG90aGVyIG1vdXNlIGV2ZW50cyBmcm9tIHRyaWdnZXJpbmcgYWxzb1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICB0b3VjaHN0YXJ0ID0gdHJ1ZTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5vbigndG91Y2htb3ZlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgIHRvdWNoc3RhcnQgPSBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5vbigndG91Y2hlbmQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgICBpZiAodG91Y2hzdGFydCkge1xyXG4gICAgICAgIHNlbGYub25DbGljayhldmVudCk7XHJcbiAgICAgIH1cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub24oJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuICAgIHRoaXMub24oJ2ZvY3VzJywgdGhpcy5vbkZvY3VzKTtcclxuICAgIHRoaXMub24oJ2JsdXInLCB0aGlzLm9uQmx1cik7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpe1xyXG4gIC8vIEFkZCBzdGFuZGFyZCBBcmlhIGFuZCBUYWJpbmRleCBpbmZvXHJcbiAgcHJvcHMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgIGNsYXNzTmFtZTogdGhpcy5idWlsZENTU0NsYXNzKCksXHJcbiAgICBpbm5lckhUTUw6ICc8ZGl2IGNsYXNzPVwidmpzLWNvbnRyb2wtY29udGVudFwiPjxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPicgKyAodGhpcy5idXR0b25UZXh0IHx8ICdOZWVkIFRleHQnKSArICc8L3NwYW4+PC9kaXY+JyxcclxuICAgIHJvbGU6ICdidXR0b24nLFxyXG4gICAgJ2FyaWEtbGl2ZSc6ICdwb2xpdGUnLCAvLyBsZXQgdGhlIHNjcmVlbiByZWFkZXIgdXNlciBrbm93IHRoYXQgdGhlIHRleHQgb2YgdGhlIGJ1dHRvbiBtYXkgY2hhbmdlXHJcbiAgICB0YWJJbmRleDogMFxyXG4gIH0sIHByb3BzKTtcclxuXHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgdHlwZSwgcHJvcHMpO1xyXG59O1xyXG5cclxudmpzLkJ1dHRvbi5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gVE9ETzogQ2hhbmdlIHZqcy1jb250cm9sIHRvIHZqcy1idXR0b24/XHJcbiAgcmV0dXJuICd2anMtY29udHJvbCAnICsgdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcy5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxuICAvLyBDbGljayAtIE92ZXJyaWRlIHdpdGggc3BlY2lmaWMgZnVuY3Rpb25hbGl0eSBmb3IgYnV0dG9uXHJcbnZqcy5CdXR0b24ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe307XHJcblxyXG4gIC8vIEZvY3VzIC0gQWRkIGtleWJvYXJkIGZ1bmN0aW9uYWxpdHkgdG8gZWxlbWVudFxyXG52anMuQnV0dG9uLnByb3RvdHlwZS5vbkZvY3VzID0gZnVuY3Rpb24oKXtcclxuICB2anMub24oZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xyXG59O1xyXG5cclxuICAvLyBLZXlQcmVzcyAoZG9jdW1lbnQgbGV2ZWwpIC0gVHJpZ2dlciBjbGljayB3aGVuIGtleXMgYXJlIHByZXNzZWRcclxudmpzLkJ1dHRvbi5wcm90b3R5cGUub25LZXlQcmVzcyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICAvLyBDaGVjayBmb3Igc3BhY2UgYmFyICgzMikgb3IgZW50ZXIgKDEzKSBrZXlzXHJcbiAgaWYgKGV2ZW50LndoaWNoID09IDMyIHx8IGV2ZW50LndoaWNoID09IDEzKSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgdGhpcy5vbkNsaWNrKCk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gQmx1ciAtIFJlbW92ZSBrZXlib2FyZCB0cmlnZ2Vyc1xyXG52anMuQnV0dG9uLnByb3RvdHlwZS5vbkJsdXIgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xyXG59O1xyXG4vKiBTbGlkZXJcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIFRoZSBiYXNlIGZ1bmN0aW9uYWxpdHkgZm9yIHNsaWRlcnMgbGlrZSB0aGUgdm9sdW1lIGJhciBhbmQgc2VlayBiYXJcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TbGlkZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBTZXQgcHJvcGVydHkgbmFtZXMgdG8gYmFyIGFuZCBoYW5kbGUgdG8gbWF0Y2ggd2l0aCB0aGUgY2hpbGQgU2xpZGVyIGNsYXNzIGlzIGxvb2tpbmcgZm9yXHJcbiAgICB0aGlzLmJhciA9IHRoaXMuZ2V0Q2hpbGQodGhpcy5vcHRpb25zX1snYmFyTmFtZSddKTtcclxuICAgIHRoaXMuaGFuZGxlID0gdGhpcy5nZXRDaGlsZCh0aGlzLm9wdGlvbnNfWydoYW5kbGVOYW1lJ10pO1xyXG5cclxuICAgIHBsYXllci5vbih0aGlzLnBsYXllckV2ZW50LCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIHRoaXMub24oJ21vdXNlZG93bicsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgdGhpcy5vbigndG91Y2hzdGFydCcsIHRoaXMub25Nb3VzZURvd24pO1xyXG4gICAgdGhpcy5vbignZm9jdXMnLCB0aGlzLm9uRm9jdXMpO1xyXG4gICAgdGhpcy5vbignYmx1cicsIHRoaXMub25CbHVyKTtcclxuICAgIHRoaXMub24oJ2NsaWNrJywgdGhpcy5vbkNsaWNrKTtcclxuXHJcbiAgICB0aGlzLnBsYXllcl8ub24oJ2NvbnRyb2xzdmlzaWJsZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgLy8gVGhpcyBpcyBhY3R1YWxseSB0byBmaXggdGhlIHZvbHVtZSBoYW5kbGUgcG9zaXRpb24uIGh0dHA6Ly90d2l0dGVyLmNvbS8jIS9nZXJyaXR2YW5hYWtlbi9zdGF0dXMvMTU5MDQ2MjU0NTE5Nzg3NTIwXHJcbiAgICAvLyB0aGlzLnBsYXllcl8ub25lKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICBwbGF5ZXIucmVhZHkodmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuXHJcbiAgICB0aGlzLmJvdW5kRXZlbnRzID0ge307XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24odHlwZSwgcHJvcHMpIHtcclxuICBwcm9wcyA9IHByb3BzIHx8IHt9O1xyXG4gIC8vIEFkZCB0aGUgc2xpZGVyIGVsZW1lbnQgY2xhc3MgdG8gYWxsIHN1YiBjbGFzc2VzXHJcbiAgcHJvcHMuY2xhc3NOYW1lID0gcHJvcHMuY2xhc3NOYW1lICsgJyB2anMtc2xpZGVyJztcclxuICBwcm9wcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgcm9sZTogJ3NsaWRlcicsXHJcbiAgICAnYXJpYS12YWx1ZW5vdyc6IDAsXHJcbiAgICAnYXJpYS12YWx1ZW1pbic6IDAsXHJcbiAgICAnYXJpYS12YWx1ZW1heCc6IDEwMCxcclxuICAgIHRhYkluZGV4OiAwXHJcbiAgfSwgcHJvcHMpO1xyXG5cclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCB0eXBlLCBwcm9wcyk7XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbk1vdXNlRG93biA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIHZqcy5ibG9ja1RleHRTZWxlY3Rpb24oKTtcclxuXHJcbiAgdGhpcy5ib3VuZEV2ZW50cy5tb3ZlID0gdmpzLmJpbmQodGhpcywgdGhpcy5vbk1vdXNlTW92ZSk7XHJcbiAgdGhpcy5ib3VuZEV2ZW50cy5lbmQgPSB2anMuYmluZCh0aGlzLCB0aGlzLm9uTW91c2VVcCk7XHJcblxyXG4gIHZqcy5vbihkb2N1bWVudCwgJ21vdXNlbW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSk7XHJcbiAgdmpzLm9uKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuYm91bmRFdmVudHMuZW5kKTtcclxuICB2anMub24oZG9jdW1lbnQsICd0b3VjaG1vdmUnLCB0aGlzLmJvdW5kRXZlbnRzLm1vdmUpO1xyXG4gIHZqcy5vbihkb2N1bWVudCwgJ3RvdWNoZW5kJywgdGhpcy5ib3VuZEV2ZW50cy5lbmQpO1xyXG5cclxuICB0aGlzLm9uTW91c2VNb3ZlKGV2ZW50KTtcclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uTW91c2VVcCA9IGZ1bmN0aW9uKCkge1xyXG4gIHZqcy51bmJsb2NrVGV4dFNlbGVjdGlvbigpO1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLmJvdW5kRXZlbnRzLm1vdmUsIGZhbHNlKTtcclxuICB2anMub2ZmKGRvY3VtZW50LCAnbW91c2V1cCcsIHRoaXMuYm91bmRFdmVudHMuZW5kLCBmYWxzZSk7XHJcbiAgdmpzLm9mZihkb2N1bWVudCwgJ3RvdWNobW92ZScsIHRoaXMuYm91bmRFdmVudHMubW92ZSwgZmFsc2UpO1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICd0b3VjaGVuZCcsIHRoaXMuYm91bmRFdmVudHMuZW5kLCBmYWxzZSk7XHJcblxyXG4gIHRoaXMudXBkYXRlKCk7XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIEluIFZvbHVtZUJhciBpbml0IHdlIGhhdmUgYSBzZXRUaW1lb3V0IGZvciB1cGRhdGUgdGhhdCBwb3BzIGFuZCB1cGRhdGUgdG8gdGhlIGVuZCBvZiB0aGVcclxuICAvLyBleGVjdXRpb24gc3RhY2suIFRoZSBwbGF5ZXIgaXMgZGVzdHJveWVkIGJlZm9yZSB0aGVuIHVwZGF0ZSB3aWxsIGNhdXNlIGFuIGVycm9yXHJcbiAgaWYgKCF0aGlzLmVsXykgcmV0dXJuO1xyXG5cclxuICAvLyBJZiBzY3J1YmJpbmcsIHdlIGNvdWxkIHVzZSBhIGNhY2hlZCB2YWx1ZSB0byBtYWtlIHRoZSBoYW5kbGUga2VlcCB1cCB3aXRoIHRoZSB1c2VyJ3MgbW91c2UuXHJcbiAgLy8gT24gSFRNTDUgYnJvd3NlcnMgc2NydWJiaW5nIGlzIHJlYWxseSBzbW9vdGgsIGJ1dCBzb21lIGZsYXNoIHBsYXllcnMgYXJlIHNsb3csIHNvIHdlIG1pZ2h0IHdhbnQgdG8gdXRpbGl6ZSB0aGlzIGxhdGVyLlxyXG4gIC8vIHZhciBwcm9ncmVzcyA9ICAodGhpcy5wbGF5ZXJfLnNjcnViYmluZykgPyB0aGlzLnBsYXllcl8uZ2V0Q2FjaGUoKS5jdXJyZW50VGltZSAvIHRoaXMucGxheWVyXy5kdXJhdGlvbigpIDogdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCkgLyB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcclxuXHJcbiAgdmFyIGJhclByb2dyZXNzLFxyXG4gICAgICBwcm9ncmVzcyA9IHRoaXMuZ2V0UGVyY2VudCgpLFxyXG4gICAgICBoYW5kbGUgPSB0aGlzLmhhbmRsZSxcclxuICAgICAgYmFyID0gdGhpcy5iYXI7XHJcblxyXG4gIC8vIFByb3RlY3QgYWdhaW5zdCBubyBkdXJhdGlvbiBhbmQgb3RoZXIgZGl2aXNpb24gaXNzdWVzXHJcbiAgaWYgKGlzTmFOKHByb2dyZXNzKSkgeyBwcm9ncmVzcyA9IDA7IH1cclxuXHJcbiAgYmFyUHJvZ3Jlc3MgPSBwcm9ncmVzcztcclxuXHJcbiAgLy8gSWYgdGhlcmUgaXMgYSBoYW5kbGUsIHdlIG5lZWQgdG8gYWNjb3VudCBmb3IgdGhlIGhhbmRsZSBpbiBvdXIgY2FsY3VsYXRpb24gZm9yIHByb2dyZXNzIGJhclxyXG4gIC8vIHNvIHRoYXQgaXQgZG9lc24ndCBmYWxsIHNob3J0IG9mIG9yIGV4dGVuZCBwYXN0IHRoZSBoYW5kbGUuXHJcbiAgaWYgKGhhbmRsZSkge1xyXG5cclxuICAgIHZhciBib3ggPSB0aGlzLmVsXyxcclxuICAgICAgICBib3hXaWR0aCA9IGJveC5vZmZzZXRXaWR0aCxcclxuXHJcbiAgICAgICAgaGFuZGxlV2lkdGggPSBoYW5kbGUuZWwoKS5vZmZzZXRXaWR0aCxcclxuXHJcbiAgICAgICAgLy8gVGhlIHdpZHRoIG9mIHRoZSBoYW5kbGUgaW4gcGVyY2VudCBvZiB0aGUgY29udGFpbmluZyBib3hcclxuICAgICAgICAvLyBJbiBJRSwgd2lkdGhzIG1heSBub3QgYmUgcmVhZHkgeWV0IGNhdXNpbmcgTmFOXHJcbiAgICAgICAgaGFuZGxlUGVyY2VudCA9IChoYW5kbGVXaWR0aCkgPyBoYW5kbGVXaWR0aCAvIGJveFdpZHRoIDogMCxcclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBhZGp1c3RlZCBzaXplIG9mIHRoZSBib3gsIGNvbnNpZGVyaW5nIHRoYXQgdGhlIGhhbmRsZSdzIGNlbnRlciBuZXZlciB0b3VjaGVzIHRoZSBsZWZ0IG9yIHJpZ2h0IHNpZGUuXHJcbiAgICAgICAgLy8gVGhlcmUgaXMgYSBtYXJnaW4gb2YgaGFsZiB0aGUgaGFuZGxlJ3Mgd2lkdGggb24gYm90aCBzaWRlcy5cclxuICAgICAgICBib3hBZGp1c3RlZFBlcmNlbnQgPSAxIC0gaGFuZGxlUGVyY2VudCxcclxuXHJcbiAgICAgICAgLy8gQWRqdXN0IHRoZSBwcm9ncmVzcyB0aGF0IHdlJ2xsIHVzZSB0byBzZXQgd2lkdGhzIHRvIHRoZSBuZXcgYWRqdXN0ZWQgYm94IHdpZHRoXHJcbiAgICAgICAgYWRqdXN0ZWRQcm9ncmVzcyA9IHByb2dyZXNzICogYm94QWRqdXN0ZWRQZXJjZW50O1xyXG5cclxuICAgIC8vIFRoZSBiYXIgZG9lcyByZWFjaCB0aGUgbGVmdCBzaWRlLCBzbyB3ZSBuZWVkIHRvIGFjY291bnQgZm9yIHRoaXMgaW4gdGhlIGJhcidzIHdpZHRoXHJcbiAgICBiYXJQcm9ncmVzcyA9IGFkanVzdGVkUHJvZ3Jlc3MgKyAoaGFuZGxlUGVyY2VudCAvIDIpO1xyXG5cclxuICAgIC8vIE1vdmUgdGhlIGhhbmRsZSBmcm9tIHRoZSBsZWZ0IGJhc2VkIG9uIHRoZSBhZGplY3RlZCBwcm9ncmVzc1xyXG4gICAgaGFuZGxlLmVsKCkuc3R5bGUubGVmdCA9IHZqcy5yb3VuZChhZGp1c3RlZFByb2dyZXNzICogMTAwLCAyKSArICclJztcclxuICB9XHJcblxyXG4gIC8vIFNldCB0aGUgbmV3IGJhciB3aWR0aFxyXG4gIGJhci5lbCgpLnN0eWxlLndpZHRoID0gdmpzLnJvdW5kKGJhclByb2dyZXNzICogMTAwLCAyKSArICclJztcclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLmNhbGN1bGF0ZURpc3RhbmNlID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHZhciBlbCwgYm94LCBib3hYLCBib3hZLCBib3hXLCBib3hILCBoYW5kbGUsIHBhZ2VYLCBwYWdlWTtcclxuXHJcbiAgZWwgPSB0aGlzLmVsXztcclxuICBib3ggPSB2anMuZmluZFBvc2l0aW9uKGVsKTtcclxuICBib3hXID0gYm94SCA9IGVsLm9mZnNldFdpZHRoO1xyXG4gIGhhbmRsZSA9IHRoaXMuaGFuZGxlO1xyXG5cclxuICBpZiAodGhpcy5vcHRpb25zXy52ZXJ0aWNhbCkge1xyXG4gICAgYm94WSA9IGJveC50b3A7XHJcblxyXG4gICAgaWYgKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgIHBhZ2VZID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYWdlWSA9IGV2ZW50LnBhZ2VZO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYW5kbGUpIHtcclxuICAgICAgdmFyIGhhbmRsZUggPSBoYW5kbGUuZWwoKS5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgIC8vIEFkanVzdGVkIFggYW5kIFdpZHRoLCBzbyBoYW5kbGUgZG9lc24ndCBnbyBvdXRzaWRlIHRoZSBiYXJcclxuICAgICAgYm94WSA9IGJveFkgKyAoaGFuZGxlSCAvIDIpO1xyXG4gICAgICBib3hIID0gYm94SCAtIGhhbmRsZUg7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGVyY2VudCB0aGF0IHRoZSBjbGljayBpcyB0aHJvdWdoIHRoZSBhZGp1c3RlZCBhcmVhXHJcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKChib3hZIC0gcGFnZVkpICsgYm94SCkgLyBib3hIKSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBib3hYID0gYm94LmxlZnQ7XHJcblxyXG4gICAgaWYgKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XHJcbiAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoYW5kbGUpIHtcclxuICAgICAgdmFyIGhhbmRsZVcgPSBoYW5kbGUuZWwoKS5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgIC8vIEFkanVzdGVkIFggYW5kIFdpZHRoLCBzbyBoYW5kbGUgZG9lc24ndCBnbyBvdXRzaWRlIHRoZSBiYXJcclxuICAgICAgYm94WCA9IGJveFggKyAoaGFuZGxlVyAvIDIpO1xyXG4gICAgICBib3hXID0gYm94VyAtIGhhbmRsZVc7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUGVyY2VudCB0aGF0IHRoZSBjbGljayBpcyB0aHJvdWdoIHRoZSBhZGp1c3RlZCBhcmVhXHJcbiAgICByZXR1cm4gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKHBhZ2VYIC0gYm94WCkgLyBib3hXKSk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlNsaWRlci5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLm9uKGRvY3VtZW50LCAna2V5dXAnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uS2V5UHJlc3MpKTtcclxufTtcclxuXHJcbnZqcy5TbGlkZXIucHJvdG90eXBlLm9uS2V5UHJlc3MgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgaWYgKGV2ZW50LndoaWNoID09IDM3KSB7IC8vIExlZnQgQXJyb3dcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0aGlzLnN0ZXBCYWNrKCk7XHJcbiAgfSBlbHNlIGlmIChldmVudC53aGljaCA9PSAzOSkgeyAvLyBSaWdodCBBcnJvd1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRoaXMuc3RlcEZvcndhcmQoKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbkJsdXIgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5vZmYoZG9jdW1lbnQsICdrZXl1cCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMub25LZXlQcmVzcykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIExpc3RlbmVyIGZvciBjbGljayBldmVudHMgb24gc2xpZGVyLCB1c2VkIHRvIHByZXZlbnQgY2xpY2tzXHJcbiAqICAgZnJvbSBidWJibGluZyB1cCB0byBwYXJlbnQgZWxlbWVudHMgbGlrZSBidXR0b24gbWVudXMuXHJcbiAqIEBwYXJhbSAge09iamVjdH0gZXZlbnQgRXZlbnQgb2JqZWN0XHJcbiAqL1xyXG52anMuU2xpZGVyLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2Vla0JhciBCZWhhdmlvciBpbmNsdWRlcyBwbGF5IHByb2dyZXNzIGJhciwgYW5kIHNlZWsgaGFuZGxlXHJcbiAqIE5lZWRlZCBzbyBpdCBjYW4gZGV0ZXJtaW5lIHNlZWsgcG9zaXRpb24gYmFzZWQgb24gaGFuZGxlIHBvc2l0aW9uL3NpemVcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TbGlkZXJIYW5kbGUgPSB2anMuQ29tcG9uZW50LmV4dGVuZCgpO1xyXG5cclxuLyoqXHJcbiAqIERlZmF1bHQgdmFsdWUgb2YgdGhlIHNsaWRlclxyXG4gKlxyXG4gKiBAdHlwZSB7TnVtYmVyfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuZGVmYXVsdFZhbHVlID0gMDtcclxuXHJcbi8qKiBAaW5oZXJpdERvYyAqL1xyXG52anMuU2xpZGVySGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKHR5cGUsIHByb3BzKSB7XHJcbiAgcHJvcHMgPSBwcm9wcyB8fCB7fTtcclxuICAvLyBBZGQgdGhlIHNsaWRlciBlbGVtZW50IGNsYXNzIHRvIGFsbCBzdWIgY2xhc3Nlc1xyXG4gIHByb3BzLmNsYXNzTmFtZSA9IHByb3BzLmNsYXNzTmFtZSArICcgdmpzLXNsaWRlci1oYW5kbGUnO1xyXG4gIHByb3BzID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj4nK3RoaXMuZGVmYXVsdFZhbHVlKyc8L3NwYW4+J1xyXG4gIH0sIHByb3BzKTtcclxuXHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHByb3BzKTtcclxufTtcclxuLyogTWVudVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vKipcclxuICogVGhlIE1lbnUgY29tcG9uZW50IGlzIHVzZWQgdG8gYnVpbGQgcG9wIHVwIG1lbnVzLCBpbmNsdWRpbmcgc3VidGl0bGUgYW5kXHJcbiAqIGNhcHRpb25zIHNlbGVjdGlvbiBtZW51cy5cclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuTWVudSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKCk7XHJcblxyXG4vKipcclxuICogQWRkIGEgbWVudSBpdGVtIHRvIHRoZSBtZW51XHJcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gY29tcG9uZW50IENvbXBvbmVudCBvciBjb21wb25lbnQgdHlwZSB0byBhZGRcclxuICovXHJcbnZqcy5NZW51LnByb3RvdHlwZS5hZGRJdGVtID0gZnVuY3Rpb24oY29tcG9uZW50KXtcclxuICB0aGlzLmFkZENoaWxkKGNvbXBvbmVudCk7XHJcbiAgY29tcG9uZW50Lm9uKCdjbGljaycsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICB0aGlzLnVubG9ja1Nob3dpbmcoKTtcclxuICB9KSk7XHJcbn07XHJcblxyXG4vKiogQGluaGVyaXREb2MgKi9cclxudmpzLk1lbnUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgY29udGVudEVsVHlwZSA9IHRoaXMub3B0aW9ucygpLmNvbnRlbnRFbFR5cGUgfHwgJ3VsJztcclxuICB0aGlzLmNvbnRlbnRFbF8gPSB2anMuY3JlYXRlRWwoY29udGVudEVsVHlwZSwge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtY29udGVudCdcclxuICB9KTtcclxuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBhcHBlbmQ6IHRoaXMuY29udGVudEVsXyxcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51J1xyXG4gIH0pO1xyXG4gIGVsLmFwcGVuZENoaWxkKHRoaXMuY29udGVudEVsXyk7XHJcblxyXG4gIC8vIFByZXZlbnQgY2xpY2tzIGZyb20gYnViYmxpbmcgdXAuIE5lZWRlZCBmb3IgTWVudSBCdXR0b25zLFxyXG4gIC8vIHdoZXJlIGEgY2xpY2sgb24gdGhlIHBhcmVudCBpcyBzaWduaWZpY2FudFxyXG4gIHZqcy5vbihlbCwgJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xyXG4gIH0pO1xyXG5cclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG4vKipcclxuICogVGhlIGNvbXBvbmVudCBmb3IgYSBtZW51IGl0ZW0uIGA8bGk+YFxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5NZW51SXRlbSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZWxlY3RlZChvcHRpb25zWydzZWxlY3RlZCddKTtcclxuICB9XHJcbn0pO1xyXG5cclxuLyoqIEBpbmhlcml0RG9jICovXHJcbnZqcy5NZW51SXRlbS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbih0eXBlLCBwcm9wcyl7XHJcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2xpJywgdmpzLm9iai5tZXJnZSh7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbWVudS1pdGVtJyxcclxuICAgIGlubmVySFRNTDogdGhpcy5vcHRpb25zX1snbGFiZWwnXVxyXG4gIH0sIHByb3BzKSk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlIGEgY2xpY2sgb24gdGhlIG1lbnUgaXRlbSwgYW5kIHNldCBpdCB0byBzZWxlY3RlZFxyXG4gKi9cclxudmpzLk1lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnNlbGVjdGVkKHRydWUpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNldCB0aGlzIG1lbnUgaXRlbSBhcyBzZWxlY3RlZCBvciBub3RcclxuICogQHBhcmFtICB7Qm9vbGVhbn0gc2VsZWN0ZWRcclxuICovXHJcbnZqcy5NZW51SXRlbS5wcm90b3R5cGUuc2VsZWN0ZWQgPSBmdW5jdGlvbihzZWxlY3RlZCl7XHJcbiAgaWYgKHNlbGVjdGVkKSB7XHJcbiAgICB0aGlzLmFkZENsYXNzKCd2anMtc2VsZWN0ZWQnKTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsdHJ1ZSk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1zZWxlY3RlZCcpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyxmYWxzZSk7XHJcbiAgfVxyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBBIGJ1dHRvbiBjbGFzcyB3aXRoIGEgcG9wdXAgbWVudVxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk1lbnVCdXR0b24gPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICB0aGlzLm1lbnUgPSB0aGlzLmNyZWF0ZU1lbnUoKTtcclxuXHJcbiAgICAvLyBBZGQgbGlzdCB0byBlbGVtZW50XHJcbiAgICB0aGlzLmFkZENoaWxkKHRoaXMubWVudSk7XHJcblxyXG4gICAgLy8gQXV0b21hdGljYWxseSBoaWRlIGVtcHR5IG1lbnUgYnV0dG9uc1xyXG4gICAgaWYgKHRoaXMuaXRlbXMgJiYgdGhpcy5pdGVtcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5vbigna2V5dXAnLCB0aGlzLm9uS2V5UHJlc3MpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLWhhc3BvcHVwJywgdHJ1ZSk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYnV0dG9uJyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBUcmFjayB0aGUgc3RhdGUgb2YgdGhlIG1lbnUgYnV0dG9uXHJcbiAqIEB0eXBlIHtCb29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLmJ1dHRvblByZXNzZWRfID0gZmFsc2U7XHJcblxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlTWVudSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfKTtcclxuXHJcbiAgLy8gQWRkIGEgdGl0bGUgbGlzdCBpdGVtIHRvIHRoZSB0b3BcclxuICBpZiAodGhpcy5vcHRpb25zKCkudGl0bGUpIHtcclxuICAgIG1lbnUuZWwoKS5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2xpJywge1xyXG4gICAgICBjbGFzc05hbWU6ICd2anMtbWVudS10aXRsZScsXHJcbiAgICAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXHJcbiAgICAgIHRhYmluZGV4OiAtMVxyXG4gICAgfSkpO1xyXG4gIH1cclxuXHJcbiAgdGhpcy5pdGVtcyA9IHRoaXNbJ2NyZWF0ZUl0ZW1zJ10oKTtcclxuXHJcbiAgaWYgKHRoaXMuaXRlbXMpIHtcclxuICAgIC8vIEFkZCBtZW51IGl0ZW1zIHRvIHRoZSBtZW51XHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbWVudS5hZGRJdGVtKHRoaXMuaXRlbXNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lbnU7XHJcbn07XHJcblxyXG4vKipcclxuICogQ3JlYXRlIHRoZSBsaXN0IG9mIG1lbnUgaXRlbXMuIFNwZWNpZmljIHRvIGVhY2ggc3ViY2xhc3MuXHJcbiAqL1xyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlSXRlbXMgPSBmdW5jdGlvbigpe307XHJcblxyXG4vKiogQGluaGVyaXREb2MgKi9cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLmJ1aWxkQ1NTQ2xhc3MgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmNsYXNzTmFtZSArICcgdmpzLW1lbnUtYnV0dG9uICcgKyB2anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vLyBGb2N1cyAtIEFkZCBrZXlib2FyZCBmdW5jdGlvbmFsaXR5IHRvIGVsZW1lbnRcclxuLy8gVGhpcyBmdW5jdGlvbiBpcyBub3QgbmVlZGVkIGFueW1vcmUuIEluc3RlYWQsIHRoZSBrZXlib2FyZCBmdW5jdGlvbmFsaXR5IGlzIGhhbmRsZWQgYnlcclxuLy8gdHJlYXRpbmcgdGhlIGJ1dHRvbiBhcyB0cmlnZ2VyaW5nIGEgc3VibWVudS4gV2hlbiB0aGUgYnV0dG9uIGlzIHByZXNzZWQsIHRoZSBzdWJtZW51XHJcbi8vIGFwcGVhcnMuIFByZXNzaW5nIHRoZSBidXR0b24gYWdhaW4gbWFrZXMgdGhlIHN1Ym1lbnUgZGlzYXBwZWFyLlxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25Gb2N1cyA9IGZ1bmN0aW9uKCl7fTtcclxuLy8gQ2FuJ3QgdHVybiBvZmYgbGlzdCBkaXNwbGF5IHRoYXQgd2UgdHVybmVkIG9uIHdpdGggZm9jdXMsIGJlY2F1c2UgbGlzdCB3b3VsZCBnbyBhd2F5LlxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25CbHVyID0gZnVuY3Rpb24oKXt9O1xyXG5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFdoZW4geW91IGNsaWNrIHRoZSBidXR0b24gaXQgYWRkcyBmb2N1cywgd2hpY2ggd2lsbCBzaG93IHRoZSBtZW51IGluZGVmaW5pdGVseS5cclxuICAvLyBTbyB3ZSdsbCByZW1vdmUgZm9jdXMgd2hlbiB0aGUgbW91c2UgbGVhdmVzIHRoZSBidXR0b24uXHJcbiAgLy8gRm9jdXMgaXMgbmVlZGVkIGZvciB0YWIgbmF2aWdhdGlvbi5cclxuICB0aGlzLm9uZSgnbW91c2VvdXQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5tZW51LnVubG9ja1Nob3dpbmcoKTtcclxuICAgIHRoaXMuZWxfLmJsdXIoKTtcclxuICB9KSk7XHJcbiAgaWYgKHRoaXMuYnV0dG9uUHJlc3NlZF8pe1xyXG4gICAgdGhpcy51bnByZXNzQnV0dG9uKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMucHJlc3NCdXR0b24oKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuTWVudUJ1dHRvbi5wcm90b3R5cGUub25LZXlQcmVzcyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAvLyBDaGVjayBmb3Igc3BhY2UgYmFyICgzMikgb3IgZW50ZXIgKDEzKSBrZXlzXHJcbiAgaWYgKGV2ZW50LndoaWNoID09IDMyIHx8IGV2ZW50LndoaWNoID09IDEzKSB7XHJcbiAgICBpZiAodGhpcy5idXR0b25QcmVzc2VkXyl7XHJcbiAgICAgIHRoaXMudW5wcmVzc0J1dHRvbigpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5wcmVzc0J1dHRvbigpO1xyXG4gICAgfVxyXG4gIC8vIENoZWNrIGZvciBlc2NhcGUgKDI3KSBrZXlcclxuICB9IGVsc2UgaWYgKGV2ZW50LndoaWNoID09IDI3KXtcclxuICAgIGlmICh0aGlzLmJ1dHRvblByZXNzZWRfKXtcclxuICAgICAgdGhpcy51bnByZXNzQnV0dG9uKCk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLnByZXNzQnV0dG9uID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmJ1dHRvblByZXNzZWRfID0gdHJ1ZTtcclxuICB0aGlzLm1lbnUubG9ja1Nob3dpbmcoKTtcclxuICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtcHJlc3NlZCcsIHRydWUpO1xyXG4gIGlmICh0aGlzLml0ZW1zICYmIHRoaXMuaXRlbXMubGVuZ3RoID4gMCkge1xyXG4gICAgdGhpcy5pdGVtc1swXS5lbCgpLmZvY3VzKCk7IC8vIHNldCB0aGUgZm9jdXMgdG8gdGhlIHRpdGxlIG9mIHRoZSBzdWJtZW51XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLnVucHJlc3NCdXR0b24gPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuYnV0dG9uUHJlc3NlZF8gPSBmYWxzZTtcclxuICB0aGlzLm1lbnUudW5sb2NrU2hvd2luZygpO1xyXG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1wcmVzc2VkJywgZmFsc2UpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFuIGluc3RhbmNlIG9mIHRoZSBgdmpzLlBsYXllcmAgY2xhc3MgaXMgY3JlYXRlZCB3aGVuIGFueSBvZiB0aGUgVmlkZW8uanMgc2V0dXAgbWV0aG9kcyBhcmUgdXNlZCB0byBpbml0aWFsaXplIGEgdmlkZW8uXHJcbiAqXHJcbiAqIGBgYGpzXHJcbiAqIHZhciBteVBsYXllciA9IHZpZGVvanMoJ2V4YW1wbGVfdmlkZW9fMScpO1xyXG4gKiBgYGBcclxuICpcclxuICogSW4gdGhlIGZvbGx3aW5nIGV4YW1wbGUsIHRoZSBgZGF0YS1zZXR1cGAgYXR0cmlidXRlIHRlbGxzIHRoZSBWaWRlby5qcyBsaWJyYXJ5IHRvIGNyZWF0ZSBhIHBsYXllciBpbnN0YW5jZSB3aGVuIHRoZSBsaWJyYXJ5IGlzIHJlYWR5LlxyXG4gKlxyXG4gKiBgYGBodG1sXHJcbiAqIDx2aWRlbyBpZD1cImV4YW1wbGVfdmlkZW9fMVwiIGRhdGEtc2V0dXA9J3t9JyBjb250cm9scz5cclxuICogICA8c291cmNlIHNyYz1cIm15LXNvdXJjZS5tcDRcIiB0eXBlPVwidmlkZW8vbXA0XCI+XHJcbiAqIDwvdmlkZW8+XHJcbiAqIGBgYFxyXG4gKlxyXG4gKiBBZnRlciBhbiBpbnN0YW5jZSBoYXMgYmVlbiBjcmVhdGVkIGl0IGNhbiBiZSBhY2Nlc3NlZCBnbG9iYWxseSB1c2luZyBgVmlkZW8oJ2V4YW1wbGVfdmlkZW9fMScpYC5cclxuICpcclxuICogQGNsYXNzXHJcbiAqIEBleHRlbmRzIHZqcy5Db21wb25lbnRcclxuICovXHJcbnZqcy5QbGF5ZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcblxyXG4gIC8qKlxyXG4gICAqIHBsYXllcidzIGNvbnN0cnVjdG9yIGZ1bmN0aW9uXHJcbiAgICpcclxuICAgKiBAY29uc3RydWN0c1xyXG4gICAqIEBtZXRob2QgaW5pdFxyXG4gICAqIEBwYXJhbSB7RWxlbWVudH0gdGFnICAgICAgICBUaGUgb3JpZ2luYWwgdmlkZW8gdGFnIHVzZWQgZm9yIGNvbmZpZ3VyaW5nIG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnMgICAgUGxheWVyIG9wdGlvbnNcclxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uPX0gcmVhZHkgICAgUmVhZHkgY2FsbGJhY2sgZnVuY3Rpb25cclxuICAgKi9cclxuICBpbml0OiBmdW5jdGlvbih0YWcsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHRoaXMudGFnID0gdGFnOyAvLyBTdG9yZSB0aGUgb3JpZ2luYWwgdGFnIHVzZWQgdG8gc2V0IG9wdGlvbnNcclxuXHJcbiAgICAvLyBTZXQgT3B0aW9uc1xyXG4gICAgLy8gVGhlIG9wdGlvbnMgYXJndW1lbnQgb3ZlcnJpZGVzIG9wdGlvbnMgc2V0IGluIHRoZSB2aWRlbyB0YWdcclxuICAgIC8vIHdoaWNoIG92ZXJyaWRlcyBnbG9iYWxseSBzZXQgb3B0aW9ucy5cclxuICAgIC8vIFRoaXMgbGF0dGVyIHBhcnQgY29pbmNpZGVzIHdpdGggdGhlIGxvYWQgb3JkZXJcclxuICAgIC8vICh0YWcgbXVzdCBleGlzdCBiZWZvcmUgUGxheWVyKVxyXG4gICAgb3B0aW9ucyA9IHZqcy5vYmoubWVyZ2UodGhpcy5nZXRUYWdTZXR0aW5ncyh0YWcpLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBDYWNoZSBmb3IgdmlkZW8gcHJvcGVydHkgdmFsdWVzLlxyXG4gICAgdGhpcy5jYWNoZV8gPSB7fTtcclxuXHJcbiAgICAvLyBTZXQgcG9zdGVyXHJcbiAgICB0aGlzLnBvc3Rlcl8gPSBvcHRpb25zWydwb3N0ZXInXTtcclxuICAgIC8vIFNldCBjb250cm9sc1xyXG4gICAgdGhpcy5jb250cm9sc18gPSBvcHRpb25zWydjb250cm9scyddO1xyXG4gICAgLy8gT3JpZ2luYWwgdGFnIHNldHRpbmdzIHN0b3JlZCBpbiBvcHRpb25zXHJcbiAgICAvLyBub3cgcmVtb3ZlIGltbWVkaWF0ZWx5IHNvIG5hdGl2ZSBjb250cm9scyBkb24ndCBmbGFzaC5cclxuICAgIC8vIE1heSBiZSB0dXJuZWQgYmFjayBvbiBieSBIVE1MNSB0ZWNoIGlmIG5hdGl2ZUNvbnRyb2xzRm9yVG91Y2ggaXMgdHJ1ZVxyXG4gICAgdGFnLmNvbnRyb2xzID0gZmFsc2U7XHJcblxyXG4gICAgLy8gUnVuIGJhc2UgY29tcG9uZW50IGluaXRpYWxpemluZyB3aXRoIG5ldyBvcHRpb25zLlxyXG4gICAgLy8gQnVpbGRzIHRoZSBlbGVtZW50IHRocm91Z2ggY3JlYXRlRWwoKVxyXG4gICAgLy8gSW5pdHMgYW5kIGVtYmVkcyBhbnkgY2hpbGQgY29tcG9uZW50cyBpbiBvcHRzXHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgdGhpcywgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIC8vIFVwZGF0ZSBjb250cm9scyBjbGFzc05hbWUuIENhbid0IGRvIHRoaXMgd2hlbiB0aGUgY29udHJvbHMgYXJlIGluaXRpYWxseVxyXG4gICAgLy8gc2V0IGJlY2F1c2UgdGhlIGVsZW1lbnQgZG9lc24ndCBleGlzdCB5ZXQuXHJcbiAgICBpZiAodGhpcy5jb250cm9scygpKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1jb250cm9scy1lbmFibGVkJyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtY29udHJvbHMtZGlzYWJsZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUT0RPOiBNYWtlIHRoaXMgc21hcnRlci4gVG9nZ2xlIHVzZXIgc3RhdGUgYmV0d2VlbiB0b3VjaGluZy9tb3VzaW5nXHJcbiAgICAvLyB1c2luZyBldmVudHMsIHNpbmNlIGRldmljZXMgY2FuIGhhdmUgYm90aCB0b3VjaCBhbmQgbW91c2UgZXZlbnRzLlxyXG4gICAgLy8gaWYgKHZqcy5UT1VDSF9FTkFCTEVEKSB7XHJcbiAgICAvLyAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy10b3VjaC1lbmFibGVkJyk7XHJcbiAgICAvLyB9XHJcblxyXG4gICAgLy8gRmlyc3RwbGF5IGV2ZW50IGltcGxpbWVudGF0aW9uLiBOb3Qgc29sZCBvbiB0aGUgZXZlbnQgeWV0LlxyXG4gICAgLy8gQ291bGQgcHJvYmFibHkganVzdCBjaGVjayBjdXJyZW50VGltZT09MD9cclxuICAgIHRoaXMub25lKCdwbGF5JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgIHZhciBmcEV2ZW50ID0geyB0eXBlOiAnZmlyc3RwbGF5JywgdGFyZ2V0OiB0aGlzLmVsXyB9O1xyXG4gICAgICAvLyBVc2luZyB2anMudHJpZ2dlciBzbyB3ZSBjYW4gY2hlY2sgaWYgZGVmYXVsdCB3YXMgcHJldmVudGVkXHJcbiAgICAgIHZhciBrZWVwR29pbmcgPSB2anMudHJpZ2dlcih0aGlzLmVsXywgZnBFdmVudCk7XHJcblxyXG4gICAgICBpZiAoIWtlZXBHb2luZykge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMub24oJ2VuZGVkJywgdGhpcy5vbkVuZGVkKTtcclxuICAgIHRoaXMub24oJ3BsYXknLCB0aGlzLm9uUGxheSk7XHJcbiAgICB0aGlzLm9uKCdmaXJzdHBsYXknLCB0aGlzLm9uRmlyc3RQbGF5KTtcclxuICAgIHRoaXMub24oJ3BhdXNlJywgdGhpcy5vblBhdXNlKTtcclxuICAgIHRoaXMub24oJ3Byb2dyZXNzJywgdGhpcy5vblByb2dyZXNzKTtcclxuICAgIHRoaXMub24oJ2R1cmF0aW9uY2hhbmdlJywgdGhpcy5vbkR1cmF0aW9uQ2hhbmdlKTtcclxuICAgIHRoaXMub24oJ2Vycm9yJywgdGhpcy5vbkVycm9yKTtcclxuICAgIHRoaXMub24oJ2Z1bGxzY3JlZW5jaGFuZ2UnLCB0aGlzLm9uRnVsbHNjcmVlbkNoYW5nZSk7XHJcblxyXG4gICAgLy8gTWFrZSBwbGF5ZXIgZWFzaWx5IGZpbmRhYmxlIGJ5IElEXHJcbiAgICB2anMucGxheWVyc1t0aGlzLmlkX10gPSB0aGlzO1xyXG5cclxuICAgIGlmIChvcHRpb25zWydwbHVnaW5zJ10pIHtcclxuICAgICAgdmpzLm9iai5lYWNoKG9wdGlvbnNbJ3BsdWdpbnMnXSwgZnVuY3Rpb24oa2V5LCB2YWwpe1xyXG4gICAgICAgIHRoaXNba2V5XSh2YWwpO1xyXG4gICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxpc3RlbkZvclVzZXJBY3Rpdml0eSgpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogUGxheWVyIGluc3RhbmNlIG9wdGlvbnMsIHN1cmZhY2VkIHVzaW5nIHZqcy5vcHRpb25zXHJcbiAqIHZqcy5vcHRpb25zID0gdmpzLlBsYXllci5wcm90b3R5cGUub3B0aW9uc19cclxuICogTWFrZSBjaGFuZ2VzIGluIHZqcy5vcHRpb25zLCBub3QgaGVyZS5cclxuICogQWxsIG9wdGlvbnMgc2hvdWxkIHVzZSBzdHJpbmcga2V5cyBzbyB0aGV5IGF2b2lkXHJcbiAqIHJlbmFtaW5nIGJ5IGNsb3N1cmUgY29tcGlsZXJcclxuICogQHR5cGUge09iamVjdH1cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9wdGlvbnNfID0gdmpzLm9wdGlvbnM7XHJcblxyXG4vKipcclxuICogRGVzdHJveXMgdGhlIHZpZGVvIHBsYXllciBhbmQgZG9lcyBhbnkgbmVjZXNzYXJ5IGNsZWFudXBcclxuICpcclxuICogICAgIG15UGxheWVyLmRpc3Bvc2UoKTtcclxuICpcclxuICogVGhpcyBpcyBlc3BlY2lhbGx5IGhlbHBmdWwgaWYgeW91IGFyZSBkeW5hbWljYWxseSBhZGRpbmcgYW5kIHJlbW92aW5nIHZpZGVvc1xyXG4gKiB0by9mcm9tIHRoZSBET00uXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRyaWdnZXIoJ2Rpc3Bvc2UnKTtcclxuICAvLyBwcmV2ZW50IGRpc3Bvc2UgZnJvbSBiZWluZyBjYWxsZWQgdHdpY2VcclxuICB0aGlzLm9mZignZGlzcG9zZScpO1xyXG5cclxuICAvLyBLaWxsIHJlZmVyZW5jZSB0byB0aGlzIHBsYXllclxyXG4gIHZqcy5wbGF5ZXJzW3RoaXMuaWRfXSA9IG51bGw7XHJcbiAgaWYgKHRoaXMudGFnICYmIHRoaXMudGFnWydwbGF5ZXInXSkgeyB0aGlzLnRhZ1sncGxheWVyJ10gPSBudWxsOyB9XHJcbiAgaWYgKHRoaXMuZWxfICYmIHRoaXMuZWxfWydwbGF5ZXInXSkgeyB0aGlzLmVsX1sncGxheWVyJ10gPSBudWxsOyB9XHJcblxyXG4gIC8vIEVuc3VyZSB0aGF0IHRyYWNraW5nIHByb2dyZXNzIGFuZCB0aW1lIHByb2dyZXNzIHdpbGwgc3RvcCBhbmQgcGxhdGVyIGRlbGV0ZWRcclxuICB0aGlzLnN0b3BUcmFja2luZ1Byb2dyZXNzKCk7XHJcbiAgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSgpO1xyXG5cclxuICBpZiAodGhpcy50ZWNoKSB7IHRoaXMudGVjaC5kaXNwb3NlKCk7IH1cclxuXHJcbiAgLy8gQ29tcG9uZW50IGRpc3Bvc2VcclxuICB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5kaXNwb3NlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5nZXRUYWdTZXR0aW5ncyA9IGZ1bmN0aW9uKHRhZyl7XHJcbiAgdmFyIG9wdGlvbnMgPSB7XHJcbiAgICAnc291cmNlcyc6IFtdLFxyXG4gICAgJ3RyYWNrcyc6IFtdXHJcbiAgfTtcclxuXHJcbiAgdmpzLm9iai5tZXJnZShvcHRpb25zLCB2anMuZ2V0QXR0cmlidXRlVmFsdWVzKHRhZykpO1xyXG5cclxuICAvLyBHZXQgdGFnIGNoaWxkcmVuIHNldHRpbmdzXHJcbiAgaWYgKHRhZy5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgIHZhciBjaGlsZHJlbiwgY2hpbGQsIGNoaWxkTmFtZSwgaSwgajtcclxuXHJcbiAgICBjaGlsZHJlbiA9IHRhZy5jaGlsZE5vZGVzO1xyXG5cclxuICAgIGZvciAoaT0wLGo9Y2hpbGRyZW4ubGVuZ3RoOyBpPGo7IGkrKykge1xyXG4gICAgICBjaGlsZCA9IGNoaWxkcmVuW2ldO1xyXG4gICAgICAvLyBDaGFuZ2UgY2FzZSBuZWVkZWQ6IGh0dHA6Ly9lam9obi5vcmcvYmxvZy9ub2RlbmFtZS1jYXNlLXNlbnNpdGl2aXR5L1xyXG4gICAgICBjaGlsZE5hbWUgPSBjaGlsZC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICBpZiAoY2hpbGROYW1lID09PSAnc291cmNlJykge1xyXG4gICAgICAgIG9wdGlvbnNbJ3NvdXJjZXMnXS5wdXNoKHZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXMoY2hpbGQpKTtcclxuICAgICAgfSBlbHNlIGlmIChjaGlsZE5hbWUgPT09ICd0cmFjaycpIHtcclxuICAgICAgICBvcHRpb25zWyd0cmFja3MnXS5wdXNoKHZqcy5nZXRBdHRyaWJ1dGVWYWx1ZXMoY2hpbGQpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG9wdGlvbnM7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGVsID0gdGhpcy5lbF8gPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnKTtcclxuICB2YXIgdGFnID0gdGhpcy50YWc7XHJcblxyXG4gIC8vIFJlbW92ZSB3aWR0aC9oZWlnaHQgYXR0cnMgZnJvbSB0YWcgc28gQ1NTIGNhbiBtYWtlIGl0IDEwMCUgd2lkdGgvaGVpZ2h0XHJcbiAgdGFnLnJlbW92ZUF0dHJpYnV0ZSgnd2lkdGgnKTtcclxuICB0YWcucmVtb3ZlQXR0cmlidXRlKCdoZWlnaHQnKTtcclxuICAvLyBFbXB0eSB2aWRlbyB0YWcgdHJhY2tzIHNvIHRoZSBidWlsdC1pbiBwbGF5ZXIgZG9lc24ndCB1c2UgdGhlbSBhbHNvLlxyXG4gIC8vIFRoaXMgbWF5IG5vdCBiZSBmYXN0IGVub3VnaCB0byBzdG9wIEhUTUw1IGJyb3dzZXJzIGZyb20gcmVhZGluZyB0aGUgdGFnc1xyXG4gIC8vIHNvIHdlJ2xsIG5lZWQgdG8gdHVybiBvZmYgYW55IGRlZmF1bHQgdHJhY2tzIGlmIHdlJ3JlIG1hbnVhbGx5IGRvaW5nXHJcbiAgLy8gY2FwdGlvbnMgYW5kIHN1YnRpdGxlcy4gdmlkZW9FbGVtZW50LnRleHRUcmFja3NcclxuICBpZiAodGFnLmhhc0NoaWxkTm9kZXMoKSkge1xyXG4gICAgdmFyIG5vZGVzLCBub2Rlc0xlbmd0aCwgaSwgbm9kZSwgbm9kZU5hbWUsIHJlbW92ZU5vZGVzO1xyXG5cclxuICAgIG5vZGVzID0gdGFnLmNoaWxkTm9kZXM7XHJcbiAgICBub2Rlc0xlbmd0aCA9IG5vZGVzLmxlbmd0aDtcclxuICAgIHJlbW92ZU5vZGVzID0gW107XHJcblxyXG4gICAgd2hpbGUgKG5vZGVzTGVuZ3RoLS0pIHtcclxuICAgICAgbm9kZSA9IG5vZGVzW25vZGVzTGVuZ3RoXTtcclxuICAgICAgbm9kZU5hbWUgPSBub2RlLm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgIGlmIChub2RlTmFtZSA9PT0gJ3RyYWNrJykge1xyXG4gICAgICAgIHJlbW92ZU5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmb3IgKGk9MDsgaTxyZW1vdmVOb2Rlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICB0YWcucmVtb3ZlQ2hpbGQocmVtb3ZlTm9kZXNbaV0pO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gTWFrZSBzdXJlIHRhZyBJRCBleGlzdHNcclxuICB0YWcuaWQgPSB0YWcuaWQgfHwgJ3Zqc192aWRlb18nICsgdmpzLmd1aWQrKztcclxuXHJcbiAgLy8gR2l2ZSB2aWRlbyB0YWcgSUQgYW5kIGNsYXNzIHRvIHBsYXllciBkaXZcclxuICAvLyBJRCB3aWxsIG5vdyByZWZlcmVuY2UgcGxheWVyIGJveCwgbm90IHRoZSB2aWRlbyB0YWdcclxuICBlbC5pZCA9IHRhZy5pZDtcclxuICBlbC5jbGFzc05hbWUgPSB0YWcuY2xhc3NOYW1lO1xyXG5cclxuICAvLyBVcGRhdGUgdGFnIGlkL2NsYXNzIGZvciB1c2UgYXMgSFRNTDUgcGxheWJhY2sgdGVjaFxyXG4gIC8vIE1pZ2h0IHRoaW5rIHdlIHNob3VsZCBkbyB0aGlzIGFmdGVyIGVtYmVkZGluZyBpbiBjb250YWluZXIgc28gLnZqcy10ZWNoIGNsYXNzXHJcbiAgLy8gZG9lc24ndCBmbGFzaCAxMDAlIHdpZHRoL2hlaWdodCwgYnV0IGNsYXNzIG9ubHkgYXBwbGllcyB3aXRoIC52aWRlby1qcyBwYXJlbnRcclxuICB0YWcuaWQgKz0gJ19odG1sNV9hcGknO1xyXG4gIHRhZy5jbGFzc05hbWUgPSAndmpzLXRlY2gnO1xyXG5cclxuICAvLyBNYWtlIHBsYXllciBmaW5kYWJsZSBvbiBlbGVtZW50c1xyXG4gIHRhZ1sncGxheWVyJ10gPSBlbFsncGxheWVyJ10gPSB0aGlzO1xyXG4gIC8vIERlZmF1bHQgc3RhdGUgb2YgdmlkZW8gaXMgcGF1c2VkXHJcbiAgdGhpcy5hZGRDbGFzcygndmpzLXBhdXNlZCcpO1xyXG5cclxuICAvLyBNYWtlIGJveCB1c2Ugd2lkdGgvaGVpZ2h0IG9mIHRhZywgb3IgcmVseSBvbiBkZWZhdWx0IGltcGxlbWVudGF0aW9uXHJcbiAgLy8gRW5mb3JjZSB3aXRoIENTUyBzaW5jZSB3aWR0aC9oZWlnaHQgYXR0cnMgZG9uJ3Qgd29yayBvbiBkaXZzXHJcbiAgdGhpcy53aWR0aCh0aGlzLm9wdGlvbnNfWyd3aWR0aCddLCB0cnVlKTsgLy8gKHRydWUpIFNraXAgcmVzaXplIGxpc3RlbmVyIG9uIGxvYWRcclxuICB0aGlzLmhlaWdodCh0aGlzLm9wdGlvbnNfWydoZWlnaHQnXSwgdHJ1ZSk7XHJcblxyXG4gIC8vIFdyYXAgdmlkZW8gdGFnIGluIGRpdiAoZWwvYm94KSBjb250YWluZXJcclxuICBpZiAodGFnLnBhcmVudE5vZGUpIHtcclxuICAgIHRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShlbCwgdGFnKTtcclxuICB9XHJcbiAgdmpzLmluc2VydEZpcnN0KHRhZywgZWwpOyAvLyBCcmVha3MgaVBob25lLCBmaXhlZCBpbiBIVE1MNSBzZXR1cC5cclxuXHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG5cclxuLy8gLyogTWVkaWEgVGVjaG5vbG9neSAodGVjaClcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLy8gTG9hZC9DcmVhdGUgYW4gaW5zdGFuY2Ugb2YgcGxheWJhY2sgdGVjaG5sb2d5IGluY2x1ZGluZyBlbGVtZW50IGFuZCBBUEkgbWV0aG9kc1xyXG4vLyBBbmQgYXBwZW5kIHBsYXliYWNrIGVsZW1lbnQgaW4gcGxheWVyIGRpdi5cclxudmpzLlBsYXllci5wcm90b3R5cGUubG9hZFRlY2ggPSBmdW5jdGlvbih0ZWNoTmFtZSwgc291cmNlKXtcclxuXHJcbiAgLy8gUGF1c2UgYW5kIHJlbW92ZSBjdXJyZW50IHBsYXliYWNrIHRlY2hub2xvZ3lcclxuICBpZiAodGhpcy50ZWNoKSB7XHJcbiAgICB0aGlzLnVubG9hZFRlY2goKTtcclxuXHJcbiAgLy8gaWYgdGhpcyBpcyB0aGUgZmlyc3QgdGltZSBsb2FkaW5nLCBIVE1MNSB0YWcgd2lsbCBleGlzdCBidXQgd29uJ3QgYmUgaW5pdGlhbGl6ZWRcclxuICAvLyBzbyB3ZSBuZWVkIHRvIHJlbW92ZSBpdCBpZiB3ZSdyZSBub3QgbG9hZGluZyBIVE1MNVxyXG4gIH0gZWxzZSBpZiAodGVjaE5hbWUgIT09ICdIdG1sNScgJiYgdGhpcy50YWcpIHtcclxuICAgIHZqcy5IdG1sNS5kaXNwb3NlTWVkaWFFbGVtZW50KHRoaXMudGFnKTtcclxuICAgIHRoaXMudGFnID0gbnVsbDtcclxuICB9XHJcblxyXG4gIHRoaXMudGVjaE5hbWUgPSB0ZWNoTmFtZTtcclxuXHJcbiAgLy8gVHVybiBvZmYgQVBJIGFjY2VzcyBiZWNhdXNlIHdlJ3JlIGxvYWRpbmcgYSBuZXcgdGVjaCB0aGF0IG1pZ2h0IGxvYWQgYXN5bmNocm9ub3VzbHlcclxuICB0aGlzLmlzUmVhZHlfID0gZmFsc2U7XHJcblxyXG4gIHZhciB0ZWNoUmVhZHkgPSBmdW5jdGlvbigpe1xyXG4gICAgdGhpcy5wbGF5ZXJfLnRyaWdnZXJSZWFkeSgpO1xyXG5cclxuICAgIC8vIE1hbnVhbGx5IHRyYWNrIHByb2dyZXNzIGluIGNhc2VzIHdoZXJlIHRoZSBicm93c2VyL2ZsYXNoIHBsYXllciBkb2Vzbid0IHJlcG9ydCBpdC5cclxuICAgIGlmICghdGhpcy5mZWF0dXJlc1sncHJvZ3Jlc3NFdmVudHMnXSkge1xyXG4gICAgICB0aGlzLnBsYXllcl8ubWFudWFsUHJvZ3Jlc3NPbigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIE1hbnVhbGx5IHRyYWNrIHRpbWV1ZHBhdGVzIGluIGNhc2VzIHdoZXJlIHRoZSBicm93c2VyL2ZsYXNoIHBsYXllciBkb2Vzbid0IHJlcG9ydCBpdC5cclxuICAgIGlmICghdGhpcy5mZWF0dXJlc1sndGltZXVwZGF0ZUV2ZW50cyddKSB7XHJcbiAgICAgIHRoaXMucGxheWVyXy5tYW51YWxUaW1lVXBkYXRlc09uKCk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgLy8gR3JhYiB0ZWNoLXNwZWNpZmljIG9wdGlvbnMgZnJvbSBwbGF5ZXIgb3B0aW9ucyBhbmQgYWRkIHNvdXJjZSBhbmQgcGFyZW50IGVsZW1lbnQgdG8gdXNlLlxyXG4gIHZhciB0ZWNoT3B0aW9ucyA9IHZqcy5vYmoubWVyZ2UoeyAnc291cmNlJzogc291cmNlLCAncGFyZW50RWwnOiB0aGlzLmVsXyB9LCB0aGlzLm9wdGlvbnNfW3RlY2hOYW1lLnRvTG93ZXJDYXNlKCldKTtcclxuXHJcbiAgaWYgKHNvdXJjZSkge1xyXG4gICAgaWYgKHNvdXJjZS5zcmMgPT0gdGhpcy5jYWNoZV8uc3JjICYmIHRoaXMuY2FjaGVfLmN1cnJlbnRUaW1lID4gMCkge1xyXG4gICAgICB0ZWNoT3B0aW9uc1snc3RhcnRUaW1lJ10gPSB0aGlzLmNhY2hlXy5jdXJyZW50VGltZTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmNhY2hlXy5zcmMgPSBzb3VyY2Uuc3JjO1xyXG4gIH1cclxuXHJcbiAgLy8gSW5pdGlhbGl6ZSB0ZWNoIGluc3RhbmNlXHJcbiAgdGhpcy50ZWNoID0gbmV3IHdpbmRvd1sndmlkZW9qcyddW3RlY2hOYW1lXSh0aGlzLCB0ZWNoT3B0aW9ucyk7XHJcblxyXG4gIHRoaXMudGVjaC5yZWFkeSh0ZWNoUmVhZHkpO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUudW5sb2FkVGVjaCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5pc1JlYWR5XyA9IGZhbHNlO1xyXG4gIHRoaXMudGVjaC5kaXNwb3NlKCk7XHJcblxyXG4gIC8vIFR1cm4gb2ZmIGFueSBtYW51YWwgcHJvZ3Jlc3Mgb3IgdGltZXVwZGF0ZSB0cmFja2luZ1xyXG4gIGlmICh0aGlzLm1hbnVhbFByb2dyZXNzKSB7IHRoaXMubWFudWFsUHJvZ3Jlc3NPZmYoKTsgfVxyXG5cclxuICBpZiAodGhpcy5tYW51YWxUaW1lVXBkYXRlcykgeyB0aGlzLm1hbnVhbFRpbWVVcGRhdGVzT2ZmKCk7IH1cclxuXHJcbiAgdGhpcy50ZWNoID0gZmFsc2U7XHJcbn07XHJcblxyXG4vLyBUaGVyZSdzIG1hbnkgaXNzdWVzIGFyb3VuZCBjaGFuZ2luZyB0aGUgc2l6ZSBvZiBhIEZsYXNoIChvciBvdGhlciBwbHVnaW4pIG9iamVjdC5cclxuLy8gRmlyc3QgaXMgYSBwbHVnaW4gcmVsb2FkIGlzc3VlIGluIEZpcmVmb3ggdGhhdCBoYXMgYmVlbiBhcm91bmQgZm9yIDExIHllYXJzOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD05MDI2OFxyXG4vLyBUaGVuIHdpdGggdGhlIG5ldyBmdWxsc2NyZWVuIEFQSSwgTW96aWxsYSBhbmQgd2Via2l0IGJyb3dzZXJzIHdpbGwgcmVsb2FkIHRoZSBmbGFzaCBvYmplY3QgYWZ0ZXIgZ29pbmcgdG8gZnVsbHNjcmVlbi5cclxuLy8gVG8gZ2V0IGFyb3VuZCB0aGlzLCB3ZSdyZSB1bmxvYWRpbmcgdGhlIHRlY2gsIGNhY2hpbmcgc291cmNlIGFuZCBjdXJyZW50VGltZSB2YWx1ZXMsIGFuZCByZWxvYWRpbmcgdGhlIHRlY2ggb25jZSB0aGUgcGx1Z2luIGlzIHJlc2l6ZWQuXHJcbi8vIHJlbG9hZFRlY2g6IGZ1bmN0aW9uKGJldHdlZW5Gbil7XHJcbi8vICAgdmpzLmxvZygndW5sb2FkaW5nVGVjaCcpXHJcbi8vICAgdGhpcy51bmxvYWRUZWNoKCk7XHJcbi8vICAgdmpzLmxvZygndW5sb2FkZWRUZWNoJylcclxuLy8gICBpZiAoYmV0d2VlbkZuKSB7IGJldHdlZW5Gbi5jYWxsKCk7IH1cclxuLy8gICB2anMubG9nKCdMb2FkaW5nVGVjaCcpXHJcbi8vICAgdGhpcy5sb2FkVGVjaCh0aGlzLnRlY2hOYW1lLCB7IHNyYzogdGhpcy5jYWNoZV8uc3JjIH0pXHJcbi8vICAgdmpzLmxvZygnbG9hZGVkVGVjaCcpXHJcbi8vIH0sXHJcblxyXG4vKiBGYWxsYmFja3MgZm9yIHVuc3VwcG9ydGVkIGV2ZW50IHR5cGVzXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8vIE1hbnVhbGx5IHRyaWdnZXIgcHJvZ3Jlc3MgZXZlbnRzIGJhc2VkIG9uIGNoYW5nZXMgdG8gdGhlIGJ1ZmZlcmVkIGFtb3VudFxyXG4vLyBNYW55IGZsYXNoIHBsYXllcnMgYW5kIG9sZGVyIEhUTUw1IGJyb3dzZXJzIGRvbid0IHNlbmQgcHJvZ3Jlc3Mgb3IgcHJvZ3Jlc3MtbGlrZSBldmVudHNcclxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsUHJvZ3Jlc3NPbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5tYW51YWxQcm9ncmVzcyA9IHRydWU7XHJcblxyXG4gIC8vIFRyaWdnZXIgcHJvZ3Jlc3Mgd2F0Y2hpbmcgd2hlbiBhIHNvdXJjZSBiZWdpbnMgbG9hZGluZ1xyXG4gIHRoaXMudHJhY2tQcm9ncmVzcygpO1xyXG5cclxuICAvLyBXYXRjaCBmb3IgYSBuYXRpdmUgcHJvZ3Jlc3MgZXZlbnQgY2FsbCBvbiB0aGUgdGVjaCBlbGVtZW50XHJcbiAgLy8gSW4gSFRNTDUsIHNvbWUgb2xkZXIgdmVyc2lvbnMgZG9uJ3Qgc3VwcG9ydCB0aGUgcHJvZ3Jlc3MgZXZlbnRcclxuICAvLyBTbyB3ZSdyZSBhc3N1bWluZyB0aGV5IGRvbid0LCBhbmQgdHVybmluZyBvZmYgbWFudWFsIHByb2dyZXNzIGlmIHRoZXkgZG8uXHJcbiAgLy8gQXMgb3Bwb3NlZCB0byBkb2luZyB1c2VyIGFnZW50IGRldGVjdGlvblxyXG4gIHRoaXMudGVjaC5vbmUoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAvLyBVcGRhdGUga25vd24gcHJvZ3Jlc3Mgc3VwcG9ydCBmb3IgdGhpcyBwbGF5YmFjayB0ZWNobm9sb2d5XHJcbiAgICB0aGlzLmZlYXR1cmVzWydwcm9ncmVzc0V2ZW50cyddID0gdHJ1ZTtcclxuXHJcbiAgICAvLyBUdXJuIG9mZiBtYW51YWwgcHJvZ3Jlc3MgdHJhY2tpbmdcclxuICAgIHRoaXMucGxheWVyXy5tYW51YWxQcm9ncmVzc09mZigpO1xyXG4gIH0pO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUubWFudWFsUHJvZ3Jlc3NPZmYgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMubWFudWFsUHJvZ3Jlc3MgPSBmYWxzZTtcclxuICB0aGlzLnN0b3BUcmFja2luZ1Byb2dyZXNzKCk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS50cmFja1Byb2dyZXNzID0gZnVuY3Rpb24oKXtcclxuXHJcbiAgdGhpcy5wcm9ncmVzc0ludGVydmFsID0gc2V0SW50ZXJ2YWwodmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgIC8vIERvbid0IHRyaWdnZXIgdW5sZXNzIGJ1ZmZlcmVkIGFtb3VudCBpcyBncmVhdGVyIHRoYW4gbGFzdCB0aW1lXHJcbiAgICAvLyBsb2codGhpcy5jYWNoZV8uYnVmZmVyRW5kLCB0aGlzLmJ1ZmZlcmVkKCkuZW5kKDApLCB0aGlzLmR1cmF0aW9uKCkpXHJcbiAgICAvKiBUT0RPOiB1cGRhdGUgZm9yIG11bHRpcGxlIGJ1ZmZlcmVkIHJlZ2lvbnMgKi9cclxuICAgIGlmICh0aGlzLmNhY2hlXy5idWZmZXJFbmQgPCB0aGlzLmJ1ZmZlcmVkKCkuZW5kKDApKSB7XHJcbiAgICAgIHRoaXMudHJpZ2dlcigncHJvZ3Jlc3MnKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5idWZmZXJlZFBlcmNlbnQoKSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuc3RvcFRyYWNraW5nUHJvZ3Jlc3MoKTtcclxuICAgICAgdGhpcy50cmlnZ2VyKCdwcm9ncmVzcycpOyAvLyBMYXN0IHVwZGF0ZVxyXG4gICAgfVxyXG4gIH0pLCA1MDApO1xyXG59O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5zdG9wVHJhY2tpbmdQcm9ncmVzcyA9IGZ1bmN0aW9uKCl7IGNsZWFySW50ZXJ2YWwodGhpcy5wcm9ncmVzc0ludGVydmFsKTsgfTtcclxuXHJcbi8qISBUaW1lIFRyYWNraW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm1hbnVhbFRpbWVVcGRhdGVzT24gPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMubWFudWFsVGltZVVwZGF0ZXMgPSB0cnVlO1xyXG5cclxuICB0aGlzLm9uKCdwbGF5JywgdGhpcy50cmFja0N1cnJlbnRUaW1lKTtcclxuICB0aGlzLm9uKCdwYXVzZScsIHRoaXMuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUpO1xyXG4gIC8vIHRpbWV1cGRhdGUgaXMgYWxzbyBjYWxsZWQgYnkgLmN1cnJlbnRUaW1lIHdoZW5ldmVyIGN1cnJlbnQgdGltZSBpcyBzZXRcclxuXHJcbiAgLy8gV2F0Y2ggZm9yIG5hdGl2ZSB0aW1ldXBkYXRlIGV2ZW50XHJcbiAgdGhpcy50ZWNoLm9uZSgndGltZXVwZGF0ZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBVcGRhdGUga25vd24gcHJvZ3Jlc3Mgc3VwcG9ydCBmb3IgdGhpcyBwbGF5YmFjayB0ZWNobm9sb2d5XHJcbiAgICB0aGlzLmZlYXR1cmVzWyd0aW1ldXBkYXRlRXZlbnRzJ10gPSB0cnVlO1xyXG4gICAgLy8gVHVybiBvZmYgbWFudWFsIHByb2dyZXNzIHRyYWNraW5nXHJcbiAgICB0aGlzLnBsYXllcl8ubWFudWFsVGltZVVwZGF0ZXNPZmYoKTtcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm1hbnVhbFRpbWVVcGRhdGVzT2ZmID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLm1hbnVhbFRpbWVVcGRhdGVzID0gZmFsc2U7XHJcbiAgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSgpO1xyXG4gIHRoaXMub2ZmKCdwbGF5JywgdGhpcy50cmFja0N1cnJlbnRUaW1lKTtcclxuICB0aGlzLm9mZigncGF1c2UnLCB0aGlzLnN0b3BUcmFja2luZ0N1cnJlbnRUaW1lKTtcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRyYWNrQ3VycmVudFRpbWUgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLmN1cnJlbnRUaW1lSW50ZXJ2YWwpIHsgdGhpcy5zdG9wVHJhY2tpbmdDdXJyZW50VGltZSgpOyB9XHJcbiAgdGhpcy5jdXJyZW50VGltZUludGVydmFsID0gc2V0SW50ZXJ2YWwodmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgIHRoaXMudHJpZ2dlcigndGltZXVwZGF0ZScpO1xyXG4gIH0pLCAyNTApOyAvLyA0MiA9IDI0IGZwcyAvLyAyNTAgaXMgd2hhdCBXZWJraXQgdXNlcyAvLyBGRiB1c2VzIDE1XHJcbn07XHJcblxyXG4vLyBUdXJuIG9mZiBwbGF5IHByb2dyZXNzIHRyYWNraW5nICh3aGVuIHBhdXNlZCBvciBkcmFnZ2luZylcclxudmpzLlBsYXllci5wcm90b3R5cGUuc3RvcFRyYWNraW5nQ3VycmVudFRpbWUgPSBmdW5jdGlvbigpeyBjbGVhckludGVydmFsKHRoaXMuY3VycmVudFRpbWVJbnRlcnZhbCk7IH07XHJcblxyXG4vLyAvKiBQbGF5ZXIgZXZlbnQgaGFuZGxlcnMgKGhvdyB0aGUgcGxheWVyIHJlYWN0cyB0byBjZXJ0YWluIGV2ZW50cylcclxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSB1c2VyIGFnZW50IGJlZ2lucyBsb29raW5nIGZvciBtZWRpYSBkYXRhXHJcbiAqIEBldmVudCBsb2Fkc3RhcnRcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uTG9hZFN0YXJ0O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHBsYXllciBoYXMgaW5pdGlhbCBkdXJhdGlvbiBhbmQgZGltZW5zaW9uIGluZm9ybWF0aW9uXHJcbiAqIEBldmVudCBsb2FkZWRtZXRhZGF0YVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Mb2FkZWRNZXRhRGF0YTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBwbGF5ZXIgaGFzIGRvd25sb2FkZWQgZGF0YSBhdCB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvblxyXG4gKiBAZXZlbnQgbG9hZGVkZGF0YVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25Mb2FkZWREYXRhO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHBsYXllciBoYXMgZmluaXNoZWQgZG93bmxvYWRpbmcgdGhlIHNvdXJjZSBkYXRhXHJcbiAqIEBldmVudCBsb2FkZWRhbGxkYXRhXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkxvYWRlZEFsbERhdGE7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbmV2ZXIgdGhlIG1lZGlhIGJlZ2lucyBvciByZXN1bWVzIHBsYXliYWNrXHJcbiAqIEBldmVudCBwbGF5XHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vblBsYXkgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wYXVzZWQnKTtcclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGxheWluZycpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHRoZSBmaXJzdCB0aW1lIGEgdmlkZW8gaXMgcGxheWVkXHJcbiAqXHJcbiAqIE5vdCBwYXJ0IG9mIHRoZSBITFMgc3BlYywgYW5kIHdlJ3JlIG5vdCBzdXJlIGlmIHRoaXMgaXMgdGhlIGJlc3RcclxuICogaW1wbGVtZW50YXRpb24geWV0LCBzbyB1c2Ugc3BhcmluZ2x5LiBJZiB5b3UgZG9uJ3QgaGF2ZSBhIHJlYXNvbiB0b1xyXG4gKiBwcmV2ZW50IHBsYXliYWNrLCB1c2UgYG15UGxheWVyLm9uZSgncGxheScpO2AgaW5zdGVhZC5cclxuICpcclxuICogQGV2ZW50IGZpcnN0cGxheVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25GaXJzdFBsYXkgPSBmdW5jdGlvbigpe1xyXG4gICAgLy9JZiB0aGUgZmlyc3Qgc3RhcnR0aW1lIGF0dHJpYnV0ZSBpcyBzcGVjaWZpZWRcclxuICAgIC8vdGhlbiB3ZSB3aWxsIHN0YXJ0IGF0IHRoZSBnaXZlbiBvZmZzZXQgaW4gc2Vjb25kc1xyXG4gICAgaWYodGhpcy5vcHRpb25zX1snc3RhcnR0aW1lJ10pe1xyXG4gICAgICB0aGlzLmN1cnJlbnRUaW1lKHRoaXMub3B0aW9uc19bJ3N0YXJ0dGltZSddKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZENsYXNzKCd2anMtaGFzLXN0YXJ0ZWQnKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuZXZlciB0aGUgbWVkaWEgaGFzIGJlZW4gcGF1c2VkXHJcbiAqIEBldmVudCBwYXVzZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUub25QYXVzZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXBsYXlpbmcnKTtcclxuICB2anMuYWRkQ2xhc3ModGhpcy5lbF8sICd2anMtcGF1c2VkJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgY3VycmVudCBwbGF5YmFjayBwb3NpdGlvbiBoYXMgY2hhbmdlZFxyXG4gKlxyXG4gKiBEdXJpbmcgcGxheWJhY2sgdGhpcyBpcyBmaXJlZCBldmVyeSAxNS0yNTAgbWlsbGlzZWNvbmRzLCBkZXBuZGluZyBvbiB0aGVcclxuICogcGxheWJhY2sgdGVjaG5vbG9neSBpbiB1c2UuXHJcbiAqIEBldmVudCB0aW1ldXBkYXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vblRpbWVVcGRhdGU7XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hpbGUgdGhlIHVzZXIgYWdlbnQgaXMgZG93bmxvYWRpbmcgbWVkaWEgZGF0YVxyXG4gKiBAZXZlbnQgcHJvZ3Jlc3NcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uUHJvZ3Jlc3MgPSBmdW5jdGlvbigpe1xyXG4gIC8vIEFkZCBjdXN0b20gZXZlbnQgZm9yIHdoZW4gc291cmNlIGlzIGZpbmlzaGVkIGRvd25sb2FkaW5nLlxyXG4gIGlmICh0aGlzLmJ1ZmZlcmVkUGVyY2VudCgpID09IDEpIHtcclxuICAgIHRoaXMudHJpZ2dlcignbG9hZGVkYWxsZGF0YScpO1xyXG4gIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBGaXJlZCB3aGVuIHRoZSBlbmQgb2YgdGhlIG1lZGlhIHJlc291cmNlIGlzIHJlYWNoZWQgKGN1cnJlbnRUaW1lID09IGR1cmF0aW9uKVxyXG4gKiBAZXZlbnQgZW5kZWRcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uRW5kZWQgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLm9wdGlvbnNfWydsb29wJ10pIHtcclxuICAgIHRoaXMuY3VycmVudFRpbWUoMCk7XHJcbiAgICB0aGlzLnBsYXkoKTtcclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogRmlyZWQgd2hlbiB0aGUgZHVyYXRpb24gb2YgdGhlIG1lZGlhIHJlc291cmNlIGlzIGZpcnN0IGtub3duIG9yIGNoYW5nZWRcclxuICogQGV2ZW50IGR1cmF0aW9uY2hhbmdlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkR1cmF0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKXtcclxuICAvLyBBbGxvd3MgZm9yIGNhY2hlaW5nIHZhbHVlIGluc3RlYWQgb2YgYXNraW5nIHBsYXllciBlYWNoIHRpbWUuXHJcbiAgdGhpcy5kdXJhdGlvbih0aGlzLnRlY2hHZXQoJ2R1cmF0aW9uJykpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHZvbHVtZSBjaGFuZ2VzXHJcbiAqIEBldmVudCB2b2x1bWVjaGFuZ2VcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm9uVm9sdW1lQ2hhbmdlO1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlIHBsYXllciBzd2l0Y2hlcyBpbiBvciBvdXQgb2YgZnVsbHNjcmVlbiBtb2RlXHJcbiAqIEBldmVudCBmdWxsc2NyZWVuY2hhbmdlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkZ1bGxzY3JlZW5DaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuICBpZiAodGhpcy5pc0Z1bGxTY3JlZW4pIHtcclxuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1mdWxsc2NyZWVuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1mdWxsc2NyZWVuJyk7XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIEZpcmVkIHdoZW4gdGhlcmUgaXMgYW4gZXJyb3IgaW4gcGxheWJhY2tcclxuICogQGV2ZW50IGVycm9yXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5vbkVycm9yID0gZnVuY3Rpb24oZSkge1xyXG4gIHZqcy5sb2coJ1ZpZGVvIEVycm9yJywgZSk7XHJcbn07XHJcblxyXG4vLyAvKiBQbGF5ZXIgQVBJXHJcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKipcclxuICogT2JqZWN0IGZvciBjYWNoZWQgdmFsdWVzLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuY2FjaGVfO1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUuZ2V0Q2FjaGUgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmNhY2hlXztcclxufTtcclxuXHJcbi8vIFBhc3MgdmFsdWVzIHRvIHRoZSBwbGF5YmFjayB0ZWNoXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnRlY2hDYWxsID0gZnVuY3Rpb24obWV0aG9kLCBhcmcpe1xyXG4gIC8vIElmIGl0J3Mgbm90IHJlYWR5IHlldCwgY2FsbCBtZXRob2Qgd2hlbiBpdCBpc1xyXG4gIGlmICh0aGlzLnRlY2ggJiYgIXRoaXMudGVjaC5pc1JlYWR5Xykge1xyXG4gICAgdGhpcy50ZWNoLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHRoaXNbbWV0aG9kXShhcmcpO1xyXG4gICAgfSk7XHJcblxyXG4gIC8vIE90aGVyd2lzZSBjYWxsIG1ldGhvZCBub3dcclxuICB9IGVsc2Uge1xyXG4gICAgdHJ5IHtcclxuICAgICAgdGhpcy50ZWNoW21ldGhvZF0oYXJnKTtcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICB2anMubG9nKGUpO1xyXG4gICAgICB0aHJvdyBlO1xyXG4gICAgfVxyXG4gIH1cclxufTtcclxuXHJcbi8vIEdldCBjYWxscyBjYW4ndCB3YWl0IGZvciB0aGUgdGVjaCwgYW5kIHNvbWV0aW1lcyBkb24ndCBuZWVkIHRvLlxyXG52anMuUGxheWVyLnByb3RvdHlwZS50ZWNoR2V0ID0gZnVuY3Rpb24obWV0aG9kKXtcclxuXHJcbiAgaWYgKHRoaXMudGVjaCAmJiB0aGlzLnRlY2guaXNSZWFkeV8pIHtcclxuXHJcbiAgICAvLyBGbGFzaCBsaWtlcyB0byBkaWUgYW5kIHJlbG9hZCB3aGVuIHlvdSBoaWRlIG9yIHJlcG9zaXRpb24gaXQuXHJcbiAgICAvLyBJbiB0aGVzZSBjYXNlcyB0aGUgb2JqZWN0IG1ldGhvZHMgZ28gYXdheSBhbmQgd2UgZ2V0IGVycm9ycy5cclxuICAgIC8vIFdoZW4gdGhhdCBoYXBwZW5zIHdlJ2xsIGNhdGNoIHRoZSBlcnJvcnMgYW5kIGluZm9ybSB0ZWNoIHRoYXQgaXQncyBub3QgcmVhZHkgYW55IG1vcmUuXHJcbiAgICB0cnkge1xyXG4gICAgICByZXR1cm4gdGhpcy50ZWNoW21ldGhvZF0oKTtcclxuICAgIH0gY2F0Y2goZSkge1xyXG4gICAgICAvLyBXaGVuIGJ1aWxkaW5nIGFkZGl0aW9uYWwgdGVjaCBsaWJzLCBhbiBleHBlY3RlZCBtZXRob2QgbWF5IG5vdCBiZSBkZWZpbmVkIHlldFxyXG4gICAgICBpZiAodGhpcy50ZWNoW21ldGhvZF0gPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIHZqcy5sb2coJ1ZpZGVvLmpzOiAnICsgbWV0aG9kICsgJyBtZXRob2Qgbm90IGRlZmluZWQgZm9yICcrdGhpcy50ZWNoTmFtZSsnIHBsYXliYWNrIHRlY2hub2xvZ3kuJywgZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gV2hlbiBhIG1ldGhvZCBpc24ndCBhdmFpbGFibGUgb24gdGhlIG9iamVjdCBpdCB0aHJvd3MgYSBUeXBlRXJyb3JcclxuICAgICAgICBpZiAoZS5uYW1lID09ICdUeXBlRXJyb3InKSB7XHJcbiAgICAgICAgICB2anMubG9nKCdWaWRlby5qczogJyArIG1ldGhvZCArICcgdW5hdmFpbGFibGUgb24gJyt0aGlzLnRlY2hOYW1lKycgcGxheWJhY2sgdGVjaG5vbG9neSBlbGVtZW50LicsIGUpO1xyXG4gICAgICAgICAgdGhpcy50ZWNoLmlzUmVhZHlfID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHZqcy5sb2coZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIHRocm93IGU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm47XHJcbn07XHJcblxyXG4vKipcclxuICogc3RhcnQgbWVkaWEgcGxheWJhY2tcclxuICpcclxuICogICAgIG15UGxheWVyLnBsYXkoKTtcclxuICpcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50ZWNoQ2FsbCgncGxheScpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFBhdXNlIHRoZSB2aWRlbyBwbGF5YmFja1xyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIucGF1c2UoKTtcclxuICpcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMudGVjaENhbGwoJ3BhdXNlJyk7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhlIHBsYXllciBpcyBwYXVzZWRcclxuICpcclxuICogICAgIHZhciBpc1BhdXNlZCA9IG15UGxheWVyLnBhdXNlZCgpO1xyXG4gKiAgICAgdmFyIGlzUGxheWluZyA9ICFteVBsYXllci5wYXVzZWQoKTtcclxuICpcclxuICogQHJldHVybiB7Qm9vbGVhbn0gZmFsc2UgaWYgdGhlIG1lZGlhIGlzIGN1cnJlbnRseSBwbGF5aW5nLCBvciB0cnVlIG90aGVyd2lzZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUucGF1c2VkID0gZnVuY3Rpb24oKXtcclxuICAvLyBUaGUgaW5pdGlhbCBzdGF0ZSBvZiBwYXVzZWQgc2hvdWxkIGJlIHRydWUgKGluIFNhZmFyaSBpdCdzIGFjdHVhbGx5IGZhbHNlKVxyXG4gIHJldHVybiAodGhpcy50ZWNoR2V0KCdwYXVzZWQnKSA9PT0gZmFsc2UpID8gZmFsc2UgOiB0cnVlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCBvciBzZXQgdGhlIGN1cnJlbnQgdGltZSAoaW4gc2Vjb25kcylcclxuICpcclxuICogICAgIC8vIGdldFxyXG4gKiAgICAgdmFyIHdoZXJlWW91QXQgPSBteVBsYXllci5jdXJyZW50VGltZSgpO1xyXG4gKlxyXG4gKiAgICAgLy8gc2V0XHJcbiAqICAgICBteVBsYXllci5jdXJyZW50VGltZSgxMjApOyAvLyAyIG1pbnV0ZXMgaW50byB0aGUgdmlkZW9cclxuICpcclxuICogQHBhcmFtICB7TnVtYmVyfFN0cmluZz19IHNlY29uZHMgVGhlIHRpbWUgdG8gc2VlayB0b1xyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9ICAgICAgICBUaGUgdGltZSBpbiBzZWNvbmRzLCB3aGVuIG5vdCBzZXR0aW5nXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgIHNlbGYsIHdoZW4gdGhlIGN1cnJlbnQgdGltZSBpcyBzZXRcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmN1cnJlbnRUaW1lID0gZnVuY3Rpb24oc2Vjb25kcyl7XHJcbiAgaWYgKHNlY29uZHMgIT09IHVuZGVmaW5lZCkge1xyXG5cclxuICAgIC8vIGNhY2hlIHRoZSBsYXN0IHNldCB2YWx1ZSBmb3Igc21vb3RoZXIgc2NydWJiaW5nXHJcbiAgICB0aGlzLmNhY2hlXy5sYXN0U2V0Q3VycmVudFRpbWUgPSBzZWNvbmRzO1xyXG5cclxuICAgIHRoaXMudGVjaENhbGwoJ3NldEN1cnJlbnRUaW1lJywgc2Vjb25kcyk7XHJcblxyXG4gICAgLy8gaW1wcm92ZSB0aGUgYWNjdXJhY3kgb2YgbWFudWFsIHRpbWV1cGRhdGVzXHJcbiAgICBpZiAodGhpcy5tYW51YWxUaW1lVXBkYXRlcykgeyB0aGlzLnRyaWdnZXIoJ3RpbWV1cGRhdGUnKTsgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gY2FjaGUgbGFzdCBjdXJyZW50VGltZSBhbmQgcmV0dXJuXHJcbiAgLy8gZGVmYXVsdCB0byAwIHNlY29uZHNcclxuICByZXR1cm4gdGhpcy5jYWNoZV8uY3VycmVudFRpbWUgPSAodGhpcy50ZWNoR2V0KCdjdXJyZW50VGltZScpIHx8IDApO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgbGVuZ3RoIGluIHRpbWUgb2YgdGhlIHZpZGVvIGluIHNlY29uZHNcclxuICpcclxuICogICAgIHZhciBsZW5ndGhPZlZpZGVvID0gbXlQbGF5ZXIuZHVyYXRpb24oKTtcclxuICpcclxuICogKipOT1RFKio6IFRoZSB2aWRlbyBtdXN0IGhhdmUgc3RhcnRlZCBsb2FkaW5nIGJlZm9yZSB0aGUgZHVyYXRpb24gY2FuIGJlXHJcbiAqIGtub3duLCBhbmQgaW4gdGhlIGNhc2Ugb2YgRmxhc2gsIG1heSBub3QgYmUga25vd24gdW50aWwgdGhlIHZpZGVvIHN0YXJ0c1xyXG4gKiBwbGF5aW5nLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBkdXJhdGlvbiBvZiB0aGUgdmlkZW8gaW4gc2Vjb25kc1xyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuZHVyYXRpb24gPSBmdW5jdGlvbihzZWNvbmRzKXtcclxuICBpZiAoc2Vjb25kcyAhPT0gdW5kZWZpbmVkKSB7XHJcblxyXG4gICAgLy8gY2FjaGUgdGhlIGxhc3Qgc2V0IHZhbHVlIGZvciBvcHRpbWlpemVkIHNjcnViYmluZyAoZXNwLiBGbGFzaClcclxuICAgIHRoaXMuY2FjaGVfLmR1cmF0aW9uID0gcGFyc2VGbG9hdChzZWNvbmRzKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIGlmICh0aGlzLmNhY2hlXy5kdXJhdGlvbiA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLm9uRHVyYXRpb25DaGFuZ2UoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzLmNhY2hlXy5kdXJhdGlvbjtcclxufTtcclxuXHJcbi8vIENhbGN1bGF0ZXMgaG93IG11Y2ggdGltZSBpcyBsZWZ0LiBOb3QgaW4gc3BlYywgYnV0IHVzZWZ1bC5cclxudmpzLlBsYXllci5wcm90b3R5cGUucmVtYWluaW5nVGltZSA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuZHVyYXRpb24oKSAtIHRoaXMuY3VycmVudFRpbWUoKTtcclxufTtcclxuXHJcbi8vIGh0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdmlkZW8uaHRtbCNkb20tbWVkaWEtYnVmZmVyZWRcclxuLy8gQnVmZmVyZWQgcmV0dXJucyBhIHRpbWVyYW5nZSBvYmplY3QuXHJcbi8vIEtpbmQgb2YgbGlrZSBhbiBhcnJheSBvZiBwb3J0aW9ucyBvZiB0aGUgdmlkZW8gdGhhdCBoYXZlIGJlZW4gZG93bmxvYWRlZC5cclxuLy8gU28gZmFyIG5vIGJyb3dzZXJzIHJldHVybiBtb3JlIHRoYW4gb25lIHJhbmdlIChwb3J0aW9uKVxyXG5cclxuLyoqXHJcbiAqIEdldCBhIFRpbWVSYW5nZSBvYmplY3Qgd2l0aCB0aGUgdGltZXMgb2YgdGhlIHZpZGVvIHRoYXQgaGF2ZSBiZWVuIGRvd25sb2FkZWRcclxuICpcclxuICogSWYgeW91IGp1c3Qgd2FudCB0aGUgcGVyY2VudCBvZiB0aGUgdmlkZW8gdGhhdCdzIGJlZW4gZG93bmxvYWRlZCxcclxuICogdXNlIGJ1ZmZlcmVkUGVyY2VudC5cclxuICpcclxuICogICAgIC8vIE51bWJlciBvZiBkaWZmZXJlbnQgcmFuZ2VzIG9mIHRpbWUgaGF2ZSBiZWVuIGJ1ZmZlcmVkLiBVc3VhbGx5IDEuXHJcbiAqICAgICBudW1iZXJPZlJhbmdlcyA9IGJ1ZmZlcmVkVGltZVJhbmdlLmxlbmd0aCxcclxuICpcclxuICogICAgIC8vIFRpbWUgaW4gc2Vjb25kcyB3aGVuIHRoZSBmaXJzdCByYW5nZSBzdGFydHMuIFVzdWFsbHkgMC5cclxuICogICAgIGZpcnN0UmFuZ2VTdGFydCA9IGJ1ZmZlcmVkVGltZVJhbmdlLnN0YXJ0KDApLFxyXG4gKlxyXG4gKiAgICAgLy8gVGltZSBpbiBzZWNvbmRzIHdoZW4gdGhlIGZpcnN0IHJhbmdlIGVuZHNcclxuICogICAgIGZpcnN0UmFuZ2VFbmQgPSBidWZmZXJlZFRpbWVSYW5nZS5lbmQoMCksXHJcbiAqXHJcbiAqICAgICAvLyBMZW5ndGggaW4gc2Vjb25kcyBvZiB0aGUgZmlyc3QgdGltZSByYW5nZVxyXG4gKiAgICAgZmlyc3RSYW5nZUxlbmd0aCA9IGZpcnN0UmFuZ2VFbmQgLSBmaXJzdFJhbmdlU3RhcnQ7XHJcbiAqXHJcbiAqIEByZXR1cm4ge09iamVjdH0gQSBtb2NrIFRpbWVSYW5nZSBvYmplY3QgKGZvbGxvd2luZyBIVE1MIHNwZWMpXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5idWZmZXJlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGJ1ZmZlcmVkID0gdGhpcy50ZWNoR2V0KCdidWZmZXJlZCcpLFxyXG4gICAgICBzdGFydCA9IDAsXHJcbiAgICAgIGJ1Zmxhc3QgPSBidWZmZXJlZC5sZW5ndGggLSAxLFxyXG4gICAgICAvLyBEZWZhdWx0IGVuZCB0byAwIGFuZCBzdG9yZSBpbiB2YWx1ZXNcclxuICAgICAgZW5kID0gdGhpcy5jYWNoZV8uYnVmZmVyRW5kID0gdGhpcy5jYWNoZV8uYnVmZmVyRW5kIHx8IDA7XHJcblxyXG4gIGlmIChidWZmZXJlZCAmJiBidWZsYXN0ID49IDAgJiYgYnVmZmVyZWQuZW5kKGJ1Zmxhc3QpICE9PSBlbmQpIHtcclxuICAgIGVuZCA9IGJ1ZmZlcmVkLmVuZChidWZsYXN0KTtcclxuICAgIC8vIFN0b3JpbmcgdmFsdWVzIGFsbG93cyB0aGVtIGJlIG92ZXJyaWRkZW4gYnkgc2V0QnVmZmVyZWRGcm9tUHJvZ3Jlc3NcclxuICAgIHRoaXMuY2FjaGVfLmJ1ZmZlckVuZCA9IGVuZDtcclxuICB9XHJcblxyXG4gIHJldHVybiB2anMuY3JlYXRlVGltZVJhbmdlKHN0YXJ0LCBlbmQpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgcGVyY2VudCAoYXMgYSBkZWNpbWFsKSBvZiB0aGUgdmlkZW8gdGhhdCdzIGJlZW4gZG93bmxvYWRlZFxyXG4gKlxyXG4gKiAgICAgdmFyIGhvd011Y2hJc0Rvd25sb2FkZWQgPSBteVBsYXllci5idWZmZXJlZFBlcmNlbnQoKTtcclxuICpcclxuICogMCBtZWFucyBub25lLCAxIG1lYW5zIGFsbC5cclxuICogKFRoaXMgbWV0aG9kIGlzbid0IGluIHRoZSBIVE1MNSBzcGVjLCBidXQgaXQncyB2ZXJ5IGNvbnZlbmllbnQpXHJcbiAqXHJcbiAqIEByZXR1cm4ge051bWJlcn0gQSBkZWNpbWFsIGJldHdlZW4gMCBhbmQgMSByZXByZXNlbnRpbmcgdGhlIHBlcmNlbnRcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmJ1ZmZlcmVkUGVyY2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICh0aGlzLmR1cmF0aW9uKCkpID8gdGhpcy5idWZmZXJlZCgpLmVuZCgwKSAvIHRoaXMuZHVyYXRpb24oKSA6IDA7XHJcbn07XHJcblxyXG4vKipcclxuICogR2V0IG9yIHNldCB0aGUgY3VycmVudCB2b2x1bWUgb2YgdGhlIG1lZGlhXHJcbiAqXHJcbiAqICAgICAvLyBnZXRcclxuICogICAgIHZhciBob3dMb3VkSXNJdCA9IG15UGxheWVyLnZvbHVtZSgpO1xyXG4gKlxyXG4gKiAgICAgLy8gc2V0XHJcbiAqICAgICBteVBsYXllci52b2x1bWUoMC41KTsgLy8gU2V0IHZvbHVtZSB0byBoYWxmXHJcbiAqXHJcbiAqIDAgaXMgb2ZmIChtdXRlZCksIDEuMCBpcyBhbGwgdGhlIHdheSB1cCwgMC41IGlzIGhhbGYgd2F5LlxyXG4gKlxyXG4gKiBAcGFyYW0gIHtOdW1iZXJ9IHBlcmNlbnRBc0RlY2ltYWwgVGhlIG5ldyB2b2x1bWUgYXMgYSBkZWNpbWFsIHBlcmNlbnRcclxuICogQHJldHVybiB7TnVtYmVyfSAgICAgICAgICAgICAgICAgIFRoZSBjdXJyZW50IHZvbHVtZSwgd2hlbiBnZXR0aW5nXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9ICAgICAgICAgICAgICBzZWxmLCB3aGVuIHNldHRpbmdcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnZvbHVtZSA9IGZ1bmN0aW9uKHBlcmNlbnRBc0RlY2ltYWwpe1xyXG4gIHZhciB2b2w7XHJcblxyXG4gIGlmIChwZXJjZW50QXNEZWNpbWFsICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHZvbCA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHBhcnNlRmxvYXQocGVyY2VudEFzRGVjaW1hbCkpKTsgLy8gRm9yY2UgdmFsdWUgdG8gYmV0d2VlbiAwIGFuZCAxXHJcbiAgICB0aGlzLmNhY2hlXy52b2x1bWUgPSB2b2w7XHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRWb2x1bWUnLCB2b2wpO1xyXG4gICAgdmpzLnNldExvY2FsU3RvcmFnZSgndm9sdW1lJywgdm9sKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gRGVmYXVsdCB0byAxIHdoZW4gcmV0dXJuaW5nIGN1cnJlbnQgdm9sdW1lLlxyXG4gIHZvbCA9IHBhcnNlRmxvYXQodGhpcy50ZWNoR2V0KCd2b2x1bWUnKSk7XHJcbiAgcmV0dXJuIChpc05hTih2b2wpKSA/IDEgOiB2b2w7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgY3VycmVudCBtdXRlZCBzdGF0ZSwgb3IgdHVybiBtdXRlIG9uIG9yIG9mZlxyXG4gKlxyXG4gKiAgICAgLy8gZ2V0XHJcbiAqICAgICB2YXIgaXNWb2x1bWVNdXRlZCA9IG15UGxheWVyLm11dGVkKCk7XHJcbiAqXHJcbiAqICAgICAvLyBzZXRcclxuICogICAgIG15UGxheWVyLm11dGVkKHRydWUpOyAvLyBtdXRlIHRoZSB2b2x1bWVcclxuICpcclxuICogQHBhcmFtICB7Qm9vbGVhbj19IG11dGVkIFRydWUgdG8gbXV0ZSwgZmFsc2UgdG8gdW5tdXRlXHJcbiAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgbXV0ZSBpcyBvbiwgZmFsc2UgaWYgbm90LCB3aGVuIGdldHRpbmdcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZiwgd2hlbiBzZXR0aW5nIG11dGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLm11dGVkID0gZnVuY3Rpb24obXV0ZWQpe1xyXG4gIGlmIChtdXRlZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRNdXRlZCcsIG11dGVkKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuICByZXR1cm4gdGhpcy50ZWNoR2V0KCdtdXRlZCcpIHx8IGZhbHNlOyAvLyBEZWZhdWx0IHRvIGZhbHNlXHJcbn07XHJcblxyXG4vLyBDaGVjayBpZiBjdXJyZW50IHRlY2ggY2FuIHN1cHBvcnQgbmF0aXZlIGZ1bGxzY3JlZW4gKGUuZy4gd2l0aCBidWlsdCBpbiBjb250cm9scyBsaWsgaU9TLCBzbyBub3Qgb3VyIGZsYXNoIHN3ZilcclxudmpzLlBsYXllci5wcm90b3R5cGUuc3VwcG9ydHNGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaEdldCgnc3VwcG9ydHNGdWxsU2NyZWVuJykgfHwgZmFsc2U7IH07XHJcblxyXG4vKipcclxuICogSW5jcmVhc2UgdGhlIHNpemUgb2YgdGhlIHZpZGVvIHRvIGZ1bGwgc2NyZWVuXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5yZXF1ZXN0RnVsbFNjcmVlbigpO1xyXG4gKlxyXG4gKiBJbiBzb21lIGJyb3dzZXJzLCBmdWxsIHNjcmVlbiBpcyBub3Qgc3VwcG9ydGVkIG5hdGl2ZWx5LCBzbyBpdCBlbnRlcnNcclxuICogXCJmdWxsIHdpbmRvdyBtb2RlXCIsIHdoZXJlIHRoZSB2aWRlbyBmaWxscyB0aGUgYnJvd3NlciB3aW5kb3cuXHJcbiAqIEluIGJyb3dzZXJzIGFuZCBkZXZpY2VzIHRoYXQgc3VwcG9ydCBuYXRpdmUgZnVsbCBzY3JlZW4sIHNvbWV0aW1lcyB0aGVcclxuICogYnJvd3NlcidzIGRlZmF1bHQgY29udHJvbHMgd2lsbCBiZSBzaG93biwgYW5kIG5vdCB0aGUgVmlkZW8uanMgY3VzdG9tIHNraW4uXHJcbiAqIFRoaXMgaW5jbHVkZXMgbW9zdCBtb2JpbGUgZGV2aWNlcyAoaU9TLCBBbmRyb2lkKSBhbmQgb2xkZXIgdmVyc2lvbnMgb2ZcclxuICogU2FmYXJpLlxyXG4gKlxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSBzZWxmXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5yZXF1ZXN0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHJlcXVlc3RGdWxsU2NyZWVuID0gdmpzLnN1cHBvcnQucmVxdWVzdEZ1bGxTY3JlZW47XHJcbiAgdGhpcy5pc0Z1bGxTY3JlZW4gPSB0cnVlO1xyXG5cclxuICBpZiAocmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgIC8vIHRoZSBicm93c2VyIHN1cHBvcnRzIGdvaW5nIGZ1bGxzY3JlZW4gYXQgdGhlIGVsZW1lbnQgbGV2ZWwgc28gd2UgY2FuXHJcbiAgICAvLyB0YWtlIHRoZSBjb250cm9scyBmdWxsc2NyZWVuIGFzIHdlbGwgYXMgdGhlIHZpZGVvXHJcblxyXG4gICAgLy8gVHJpZ2dlciBmdWxsc2NyZWVuY2hhbmdlIGV2ZW50IGFmdGVyIGNoYW5nZVxyXG4gICAgLy8gV2UgaGF2ZSB0byBzcGVjaWZpY2FsbHkgYWRkIHRoaXMgZWFjaCB0aW1lLCBhbmQgcmVtb3ZlXHJcbiAgICAvLyB3aGVuIGNhbmNlbGxpbmcgZnVsbHNjcmVlbi4gT3RoZXJ3aXNlIGlmIHRoZXJlJ3MgbXVsdGlwbGVcclxuICAgIC8vIHBsYXllcnMgb24gYSBwYWdlLCB0aGV5IHdvdWxkIGFsbCBiZSByZWFjdGluZyB0byB0aGUgc2FtZSBmdWxsc2NyZWVuXHJcbiAgICAvLyBldmVudHNcclxuICAgIHZqcy5vbihkb2N1bWVudCwgcmVxdWVzdEZ1bGxTY3JlZW4uZXZlbnROYW1lLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbihlKXtcclxuICAgICAgdGhpcy5pc0Z1bGxTY3JlZW4gPSBkb2N1bWVudFtyZXF1ZXN0RnVsbFNjcmVlbi5pc0Z1bGxTY3JlZW5dO1xyXG5cclxuICAgICAgLy8gSWYgY2FuY2VsbGluZyBmdWxsc2NyZWVuLCByZW1vdmUgZXZlbnQgbGlzdGVuZXIuXHJcbiAgICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PT0gZmFsc2UpIHtcclxuICAgICAgICB2anMub2ZmKGRvY3VtZW50LCByZXF1ZXN0RnVsbFNjcmVlbi5ldmVudE5hbWUsIGFyZ3VtZW50cy5jYWxsZWUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB0aGlzLnRyaWdnZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnKTtcclxuICAgIH0pKTtcclxuXHJcbiAgICB0aGlzLmVsX1tyZXF1ZXN0RnVsbFNjcmVlbi5yZXF1ZXN0Rm5dKCk7XHJcblxyXG4gIH0gZWxzZSBpZiAodGhpcy50ZWNoLnN1cHBvcnRzRnVsbFNjcmVlbigpKSB7XHJcbiAgICAvLyB3ZSBjYW4ndCB0YWtlIHRoZSB2aWRlby5qcyBjb250cm9scyBmdWxsc2NyZWVuIGJ1dCB3ZSBjYW4gZ28gZnVsbHNjcmVlblxyXG4gICAgLy8gd2l0aCBuYXRpdmUgY29udHJvbHNcclxuICAgIHRoaXMudGVjaENhbGwoJ2VudGVyRnVsbFNjcmVlbicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyBmdWxsc2NyZWVuIGlzbid0IHN1cHBvcnRlZCBzbyB3ZSdsbCBqdXN0IHN0cmV0Y2ggdGhlIHZpZGVvIGVsZW1lbnQgdG9cclxuICAgIC8vIGZpbGwgdGhlIHZpZXdwb3J0XHJcbiAgICB0aGlzLmVudGVyRnVsbFdpbmRvdygpO1xyXG4gICAgdGhpcy50cmlnZ2VyKCdmdWxsc2NyZWVuY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gdGhlIHZpZGVvIHRvIGl0cyBub3JtYWwgc2l6ZSBhZnRlciBoYXZpbmcgYmVlbiBpbiBmdWxsIHNjcmVlbiBtb2RlXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5jYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAqXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGZcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNhbmNlbEZ1bGxTY3JlZW4gPSBmdW5jdGlvbigpe1xyXG4gIHZhciByZXF1ZXN0RnVsbFNjcmVlbiA9IHZqcy5zdXBwb3J0LnJlcXVlc3RGdWxsU2NyZWVuO1xyXG4gIHRoaXMuaXNGdWxsU2NyZWVuID0gZmFsc2U7XHJcblxyXG4gIC8vIENoZWNrIGZvciBicm93c2VyIGVsZW1lbnQgZnVsbHNjcmVlbiBzdXBwb3J0XHJcbiAgaWYgKHJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICBkb2N1bWVudFtyZXF1ZXN0RnVsbFNjcmVlbi5jYW5jZWxGbl0oKTtcclxuICB9IGVsc2UgaWYgKHRoaXMudGVjaC5zdXBwb3J0c0Z1bGxTY3JlZW4oKSkge1xyXG4gICB0aGlzLnRlY2hDYWxsKCdleGl0RnVsbFNjcmVlbicpO1xyXG4gIH0gZWxzZSB7XHJcbiAgIHRoaXMuZXhpdEZ1bGxXaW5kb3coKTtcclxuICAgdGhpcy50cmlnZ2VyKCdmdWxsc2NyZWVuY2hhbmdlJyk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8vIFdoZW4gZnVsbHNjcmVlbiBpc24ndCBzdXBwb3J0ZWQgd2UgY2FuIHN0cmV0Y2ggdGhlIHZpZGVvIGNvbnRhaW5lciB0byBhcyB3aWRlIGFzIHRoZSBicm93c2VyIHdpbGwgbGV0IHVzLlxyXG52anMuUGxheWVyLnByb3RvdHlwZS5lbnRlckZ1bGxXaW5kb3cgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuaXNGdWxsV2luZG93ID0gdHJ1ZTtcclxuXHJcbiAgLy8gU3RvcmluZyBvcmlnaW5hbCBkb2Mgb3ZlcmZsb3cgdmFsdWUgdG8gcmV0dXJuIHRvIHdoZW4gZnVsbHNjcmVlbiBpcyBvZmZcclxuICB0aGlzLmRvY09yaWdPdmVyZmxvdyA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdztcclxuXHJcbiAgLy8gQWRkIGxpc3RlbmVyIGZvciBlc2Mga2V5IHRvIGV4aXQgZnVsbHNjcmVlblxyXG4gIHZqcy5vbihkb2N1bWVudCwgJ2tleWRvd24nLCB2anMuYmluZCh0aGlzLCB0aGlzLmZ1bGxXaW5kb3dPbkVzY0tleSkpO1xyXG5cclxuICAvLyBIaWRlIGFueSBzY3JvbGwgYmFyc1xyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG5cclxuICAvLyBBcHBseSBmdWxsc2NyZWVuIHN0eWxlc1xyXG4gIHZqcy5hZGRDbGFzcyhkb2N1bWVudC5ib2R5LCAndmpzLWZ1bGwtd2luZG93Jyk7XHJcblxyXG4gIHRoaXMudHJpZ2dlcignZW50ZXJGdWxsV2luZG93Jyk7XHJcbn07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmZ1bGxXaW5kb3dPbkVzY0tleSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICBpZiAoZXZlbnQua2V5Q29kZSA9PT0gMjcpIHtcclxuICAgIGlmICh0aGlzLmlzRnVsbFNjcmVlbiA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmNhbmNlbEZ1bGxTY3JlZW4oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZXhpdEZ1bGxXaW5kb3coKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5leGl0RnVsbFdpbmRvdyA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5pc0Z1bGxXaW5kb3cgPSBmYWxzZTtcclxuICB2anMub2ZmKGRvY3VtZW50LCAna2V5ZG93bicsIHRoaXMuZnVsbFdpbmRvd09uRXNjS2V5KTtcclxuXHJcbiAgLy8gVW5oaWRlIHNjcm9sbCBiYXJzLlxyXG4gIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZS5vdmVyZmxvdyA9IHRoaXMuZG9jT3JpZ092ZXJmbG93O1xyXG5cclxuICAvLyBSZW1vdmUgZnVsbHNjcmVlbiBzdHlsZXNcclxuICB2anMucmVtb3ZlQ2xhc3MoZG9jdW1lbnQuYm9keSwgJ3Zqcy1mdWxsLXdpbmRvdycpO1xyXG5cclxuICAvLyBSZXNpemUgdGhlIGJveCwgY29udHJvbGxlciwgYW5kIHBvc3RlciB0byBvcmlnaW5hbCBzaXplc1xyXG4gIC8vIHRoaXMucG9zaXRpb25BbGwoKTtcclxuICB0aGlzLnRyaWdnZXIoJ2V4aXRGdWxsV2luZG93Jyk7XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5zZWxlY3RTb3VyY2UgPSBmdW5jdGlvbihzb3VyY2VzKXtcclxuXHJcbiAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggcGxheWJhY2sgdGVjaG5vbG9neSBpbiB0aGUgb3B0aW9ucyBvcmRlclxyXG4gIGZvciAodmFyIGk9MCxqPXRoaXMub3B0aW9uc19bJ3RlY2hPcmRlciddO2k8ai5sZW5ndGg7aSsrKSB7XHJcbiAgICB2YXIgdGVjaE5hbWUgPSB2anMuY2FwaXRhbGl6ZShqW2ldKSxcclxuICAgICAgICB0ZWNoID0gd2luZG93Wyd2aWRlb2pzJ11bdGVjaE5hbWVdO1xyXG5cclxuICAgIC8vIENoZWNrIGlmIHRoZSBicm93c2VyIHN1cHBvcnRzIHRoaXMgdGVjaG5vbG9neVxyXG4gICAgaWYgKHRlY2guaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAvLyBMb29wIHRocm91Z2ggZWFjaCBzb3VyY2Ugb2JqZWN0XHJcbiAgICAgIGZvciAodmFyIGE9MCxiPXNvdXJjZXM7YTxiLmxlbmd0aDthKyspIHtcclxuICAgICAgICB2YXIgc291cmNlID0gYlthXTtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgaWYgc291cmNlIGNhbiBiZSBwbGF5ZWQgd2l0aCB0aGlzIHRlY2hub2xvZ3lcclxuICAgICAgICBpZiAodGVjaFsnY2FuUGxheVNvdXJjZSddKHNvdXJjZSkpIHtcclxuICAgICAgICAgIHJldHVybiB7IHNvdXJjZTogc291cmNlLCB0ZWNoOiB0ZWNoTmFtZSB9O1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBzb3VyY2UgZnVuY3Rpb24gdXBkYXRlcyB0aGUgdmlkZW8gc291cmNlXHJcbiAqXHJcbiAqIFRoZXJlIGFyZSB0aHJlZSB0eXBlcyBvZiB2YXJpYWJsZXMgeW91IGNhbiBwYXNzIGFzIHRoZSBhcmd1bWVudC5cclxuICpcclxuICogKipVUkwgU3RyaW5nKio6IEEgVVJMIHRvIHRoZSB0aGUgdmlkZW8gZmlsZS4gVXNlIHRoaXMgbWV0aG9kIGlmIHlvdSBhcmUgc3VyZVxyXG4gKiB0aGUgY3VycmVudCBwbGF5YmFjayB0ZWNobm9sb2d5IChIVE1MNS9GbGFzaCkgY2FuIHN1cHBvcnQgdGhlIHNvdXJjZSB5b3VcclxuICogcHJvdmlkZS4gQ3VycmVudGx5IG9ubHkgTVA0IGZpbGVzIGNhbiBiZSB1c2VkIGluIGJvdGggSFRNTDUgYW5kIEZsYXNoLlxyXG4gKlxyXG4gKiAgICAgbXlQbGF5ZXIuc3JjKFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL3ZpZGVvLm1wNFwiKTtcclxuICpcclxuICogKipTb3VyY2UgT2JqZWN0IChvciBlbGVtZW50KToqKiBBIGphdmFzY3JpcHQgb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb25cclxuICogYWJvdXQgdGhlIHNvdXJjZSBmaWxlLiBVc2UgdGhpcyBtZXRob2QgaWYgeW91IHdhbnQgdGhlIHBsYXllciB0byBkZXRlcm1pbmUgaWZcclxuICogaXQgY2FuIHN1cHBvcnQgdGhlIGZpbGUgdXNpbmcgdGhlIHR5cGUgaW5mb3JtYXRpb24uXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5zcmMoeyB0eXBlOiBcInZpZGVvL21wNFwiLCBzcmM6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL3ZpZGVvLm1wNFwiIH0pO1xyXG4gKlxyXG4gKiAqKkFycmF5IG9mIFNvdXJjZSBPYmplY3RzOioqIFRvIHByb3ZpZGUgbXVsdGlwbGUgdmVyc2lvbnMgb2YgdGhlIHNvdXJjZSBzb1xyXG4gKiB0aGF0IGl0IGNhbiBiZSBwbGF5ZWQgdXNpbmcgSFRNTDUgYWNyb3NzIGJyb3dzZXJzIHlvdSBjYW4gdXNlIGFuIGFycmF5IG9mXHJcbiAqIHNvdXJjZSBvYmplY3RzLiBWaWRlby5qcyB3aWxsIGRldGVjdCB3aGljaCB2ZXJzaW9uIGlzIHN1cHBvcnRlZCBhbmQgbG9hZCB0aGF0XHJcbiAqIGZpbGUuXHJcbiAqXHJcbiAqICAgICBteVBsYXllci5zcmMoW1xyXG4gKiAgICAgICB7IHR5cGU6IFwidmlkZW8vbXA0XCIsIHNyYzogXCJodHRwOi8vd3d3LmV4YW1wbGUuY29tL3BhdGgvdG8vdmlkZW8ubXA0XCIgfSxcclxuICogICAgICAgeyB0eXBlOiBcInZpZGVvL3dlYm1cIiwgc3JjOiBcImh0dHA6Ly93d3cuZXhhbXBsZS5jb20vcGF0aC90by92aWRlby53ZWJtXCIgfSxcclxuICogICAgICAgeyB0eXBlOiBcInZpZGVvL29nZ1wiLCBzcmM6IFwiaHR0cDovL3d3dy5leGFtcGxlLmNvbS9wYXRoL3RvL3ZpZGVvLm9ndlwiIH1cclxuICogICAgIF0pO1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmd8T2JqZWN0fEFycmF5PX0gc291cmNlIFRoZSBzb3VyY2UgVVJMLCBvYmplY3QsIG9yIGFycmF5IG9mIHNvdXJjZXNcclxuICogQHJldHVybiB7dmpzLlBsYXllcn0gc2VsZlxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuc3JjID0gZnVuY3Rpb24oc291cmNlKXtcclxuICAvLyBDYXNlOiBBcnJheSBvZiBzb3VyY2Ugb2JqZWN0cyB0byBjaG9vc2UgZnJvbSBhbmQgcGljayB0aGUgYmVzdCB0byBwbGF5XHJcbiAgaWYgKHNvdXJjZSBpbnN0YW5jZW9mIEFycmF5KSB7XHJcblxyXG4gICAgdmFyIHNvdXJjZVRlY2ggPSB0aGlzLnNlbGVjdFNvdXJjZShzb3VyY2UpLFxyXG4gICAgICAgIHRlY2hOYW1lO1xyXG5cclxuICAgIGlmIChzb3VyY2VUZWNoKSB7XHJcbiAgICAgICAgc291cmNlID0gc291cmNlVGVjaC5zb3VyY2U7XHJcbiAgICAgICAgdGVjaE5hbWUgPSBzb3VyY2VUZWNoLnRlY2g7XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIHRlY2hub2xvZ3kgaXMgYWxyZWFkeSBsb2FkZWQsIHNldCBzb3VyY2VcclxuICAgICAgaWYgKHRlY2hOYW1lID09IHRoaXMudGVjaE5hbWUpIHtcclxuICAgICAgICB0aGlzLnNyYyhzb3VyY2UpOyAvLyBQYXNzaW5nIHRoZSBzb3VyY2Ugb2JqZWN0XHJcbiAgICAgIC8vIE90aGVyd2lzZSBsb2FkIHRoaXMgdGVjaG5vbG9neSB3aXRoIGNob3NlbiBzb3VyY2VcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLmxvYWRUZWNoKHRlY2hOYW1lLCBzb3VyY2UpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmVsXy5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ3AnLCB7XHJcbiAgICAgICAgaW5uZXJIVE1MOiB0aGlzLm9wdGlvbnMoKVsnbm90U3VwcG9ydGVkTWVzc2FnZSddXHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuXHJcbiAgLy8gQ2FzZTogU291cmNlIG9iamVjdCB7IHNyYzogJycsIHR5cGU6ICcnIC4uLiB9XHJcbiAgfSBlbHNlIGlmIChzb3VyY2UgaW5zdGFuY2VvZiBPYmplY3QpIHtcclxuXHJcbiAgICBpZiAod2luZG93Wyd2aWRlb2pzJ11bdGhpcy50ZWNoTmFtZV1bJ2NhblBsYXlTb3VyY2UnXShzb3VyY2UpKSB7XHJcbiAgICAgIHRoaXMuc3JjKHNvdXJjZS5zcmMpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gU2VuZCB0aHJvdWdoIHRlY2ggbG9vcCB0byBjaGVjayBmb3IgYSBjb21wYXRpYmxlIHRlY2hub2xvZ3kuXHJcbiAgICAgIHRoaXMuc3JjKFtzb3VyY2VdKTtcclxuICAgIH1cclxuXHJcbiAgLy8gQ2FzZTogVVJMIFN0cmluZyAoaHR0cDovL215dmlkZW8uLi4pXHJcbiAgfSBlbHNlIHtcclxuICAgIC8vIENhY2hlIGZvciBnZXR0aW5nIGxhc3Qgc2V0IHNvdXJjZVxyXG4gICAgdGhpcy5jYWNoZV8uc3JjID0gc291cmNlO1xyXG5cclxuICAgIGlmICghdGhpcy5pc1JlYWR5Xykge1xyXG4gICAgICB0aGlzLnJlYWR5KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5zcmMoc291cmNlKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnRlY2hDYWxsKCdzcmMnLCBzb3VyY2UpO1xyXG4gICAgICBpZiAodGhpcy5vcHRpb25zX1sncHJlbG9hZCddID09ICdhdXRvJykge1xyXG4gICAgICAgIHRoaXMubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLm9wdGlvbnNfWydhdXRvcGxheSddKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBCZWdpbiBsb2FkaW5nIHRoZSBzcmMgZGF0YVxyXG4vLyBodHRwOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjL3ZpZGVvLmh0bWwjZG9tLW1lZGlhLWxvYWRcclxudmpzLlBsYXllci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy50ZWNoQ2FsbCgnbG9hZCcpO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLy8gaHR0cDovL2Rldi53My5vcmcvaHRtbDUvc3BlYy92aWRlby5odG1sI2RvbS1tZWRpYS1jdXJyZW50c3JjXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLnRlY2hHZXQoJ2N1cnJlbnRTcmMnKSB8fCB0aGlzLmNhY2hlXy5zcmMgfHwgJyc7XHJcbn07XHJcblxyXG4vLyBBdHRyaWJ1dGVzL09wdGlvbnNcclxudmpzLlBsYXllci5wcm90b3R5cGUucHJlbG9hZCA9IGZ1bmN0aW9uKHZhbHVlKXtcclxuICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy50ZWNoQ2FsbCgnc2V0UHJlbG9hZCcsIHZhbHVlKTtcclxuICAgIHRoaXMub3B0aW9uc19bJ3ByZWxvYWQnXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnRlY2hHZXQoJ3ByZWxvYWQnKTtcclxufTtcclxudmpzLlBsYXllci5wcm90b3R5cGUuYXV0b3BsYXkgPSBmdW5jdGlvbih2YWx1ZSl7XHJcbiAgaWYgKHZhbHVlICE9PSB1bmRlZmluZWQpIHtcclxuICAgIHRoaXMudGVjaENhbGwoJ3NldEF1dG9wbGF5JywgdmFsdWUpO1xyXG4gICAgdGhpcy5vcHRpb25zX1snYXV0b3BsYXknXSA9IHZhbHVlO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnRlY2hHZXQoJ2F1dG9wbGF5JywgdmFsdWUpO1xyXG59O1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5sb29wID0gZnVuY3Rpb24odmFsdWUpe1xyXG4gIGlmICh2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICB0aGlzLnRlY2hDYWxsKCdzZXRMb29wJywgdmFsdWUpO1xyXG4gICAgdGhpcy5vcHRpb25zX1snbG9vcCddID0gdmFsdWU7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudGVjaEdldCgnbG9vcCcpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIHRoZSB1cmwgb2YgdGhlIHBvc3RlciBpbWFnZSBzb3VyY2VcclxuICogQHR5cGUge1N0cmluZ31cclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnBvc3Rlcl87XHJcblxyXG4vKipcclxuICogZ2V0IG9yIHNldCB0aGUgcG9zdGVyIGltYWdlIHNvdXJjZSB1cmxcclxuICpcclxuICogIyMjIyMgRVhBTVBMRTpcclxuICpcclxuICogICAgIC8vIGdldHRpbmdcclxuICogICAgIHZhciBjdXJyZW50UG9zdGVyID0gbXlQbGF5ZXIucG9zdGVyKCk7XHJcbiAqXHJcbiAqICAgICAvLyBzZXR0aW5nXHJcbiAqICAgICBteVBsYXllci5wb3N0ZXIoJ2h0dHA6Ly9leGFtcGxlLmNvbS9teUltYWdlLmpwZycpO1xyXG4gKlxyXG4gKiBAcGFyYW0gIHtTdHJpbmc9fSBbc3JjXSBQb3N0ZXIgaW1hZ2Ugc291cmNlIFVSTFxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9IHBvc3RlciBVUkwgd2hlbiBnZXR0aW5nXHJcbiAqIEByZXR1cm4ge3Zqcy5QbGF5ZXJ9IHNlbGYgd2hlbiBzZXR0aW5nXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5wb3N0ZXIgPSBmdW5jdGlvbihzcmMpe1xyXG4gIGlmIChzcmMgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgdGhpcy5wb3N0ZXJfID0gc3JjO1xyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnBvc3Rlcl87XHJcbn07XHJcblxyXG4vKipcclxuICogV2hldGhlciBvciBub3QgdGhlIGNvbnRyb2xzIGFyZSBzaG93aW5nXHJcbiAqIEB0eXBlIHtCb29sZWFufVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUuY29udHJvbHNfO1xyXG5cclxuLyoqXHJcbiAqIEdldCBvciBzZXQgd2hldGhlciBvciBub3QgdGhlIGNvbnRyb2xzIGFyZSBzaG93aW5nLlxyXG4gKiBAcGFyYW0gIHtCb29sZWFufSBjb250cm9scyBTZXQgY29udHJvbHMgdG8gc2hvd2luZyBvciBub3RcclxuICogQHJldHVybiB7Qm9vbGVhbn0gICAgQ29udHJvbHMgYXJlIHNob3dpbmdcclxuICovXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmNvbnRyb2xzID0gZnVuY3Rpb24oYm9vbCl7XHJcbiAgaWYgKGJvb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgYm9vbCA9ICEhYm9vbDsgLy8gZm9yY2UgYm9vbGVhblxyXG4gICAgLy8gRG9uJ3QgdHJpZ2dlciBhIGNoYW5nZSBldmVudCB1bmxlc3MgaXQgYWN0dWFsbHkgY2hhbmdlZFxyXG4gICAgaWYgKHRoaXMuY29udHJvbHNfICE9PSBib29sKSB7XHJcbiAgICAgIHRoaXMuY29udHJvbHNfID0gYm9vbDtcclxuICAgICAgaWYgKGJvb2wpIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtY29udHJvbHMtZGlzYWJsZWQnKTtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtY29udHJvbHMtZW5hYmxlZCcpO1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcignY29udHJvbHNlbmFibGVkJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWNvbnRyb2xzLWVuYWJsZWQnKTtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtY29udHJvbHMtZGlzYWJsZWQnKTtcclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ2NvbnRyb2xzZGlzYWJsZWQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLmNvbnRyb2xzXztcclxufTtcclxuXHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnVzaW5nTmF0aXZlQ29udHJvbHNfO1xyXG5cclxuLyoqXHJcbiAqIFRvZ2dsZSBuYXRpdmUgY29udHJvbHMgb24vb2ZmLiBOYXRpdmUgY29udHJvbHMgYXJlIHRoZSBjb250cm9scyBidWlsdCBpbnRvXHJcbiAqIGRldmljZXMgKGUuZy4gZGVmYXVsdCBpUGhvbmUgY29udHJvbHMpLCBGbGFzaCwgb3Igb3RoZXIgdGVjaHNcclxuICogKGUuZy4gVmltZW8gQ29udHJvbHMpXHJcbiAqXHJcbiAqICoqVGhpcyBzaG91bGQgb25seSBiZSBzZXQgYnkgdGhlIGN1cnJlbnQgdGVjaCwgYmVjYXVzZSBvbmx5IHRoZSB0ZWNoIGtub3dzXHJcbiAqIGlmIGl0IGNhbiBzdXBwb3J0IG5hdGl2ZSBjb250cm9scyoqXHJcbiAqXHJcbiAqIEBwYXJhbSAge0Jvb2xlYW59IGJvb2wgICAgVHJ1ZSBzaWduYWxzIHRoYXQgbmF0aXZlIGNvbnRyb2xzIGFyZSBvblxyXG4gKiBAcmV0dXJuIHt2anMuUGxheWVyfSAgICAgIFJldHVybnMgdGhlIHBsYXllclxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUudXNpbmdOYXRpdmVDb250cm9scyA9IGZ1bmN0aW9uKGJvb2wpe1xyXG4gIGlmIChib29sICE9PSB1bmRlZmluZWQpIHtcclxuICAgIGJvb2wgPSAhIWJvb2w7IC8vIGZvcmNlIGJvb2xlYW5cclxuICAgIC8vIERvbid0IHRyaWdnZXIgYSBjaGFuZ2UgZXZlbnQgdW5sZXNzIGl0IGFjdHVhbGx5IGNoYW5nZWRcclxuICAgIGlmICh0aGlzLnVzaW5nTmF0aXZlQ29udHJvbHNfICE9PSBib29sKSB7XHJcbiAgICAgIHRoaXMudXNpbmdOYXRpdmVDb250cm9sc18gPSBib29sO1xyXG4gICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2luZy1uYXRpdmUtY29udHJvbHMnKTtcclxuXHJcbiAgICAgICAgLyoqXHJcbiAgICAgICAgICogcGxheWVyIGlzIHVzaW5nIHRoZSBuYXRpdmUgZGV2aWNlIGNvbnRyb2xzXHJcbiAgICAgICAgICpcclxuICAgICAgICAgKiBAZXZlbnQgdXNpbmduYXRpdmVjb250cm9sc1xyXG4gICAgICAgICAqIEBtZW1iZXJvZiB2anMuUGxheWVyXHJcbiAgICAgICAgICogQGluc3RhbmNlXHJcbiAgICAgICAgICogQHByaXZhdGVcclxuICAgICAgICAgKi9cclxuICAgICAgICB0aGlzLnRyaWdnZXIoJ3VzaW5nbmF0aXZlY29udHJvbHMnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtdXNpbmctbmF0aXZlLWNvbnRyb2xzJyk7XHJcblxyXG4gICAgICAgIC8qKlxyXG4gICAgICAgICAqIHBsYXllciBpcyB1c2luZyB0aGUgY3VzdG9tIEhUTUwgY29udHJvbHNcclxuICAgICAgICAgKlxyXG4gICAgICAgICAqIEBldmVudCB1c2luZ2N1c3RvbWNvbnRyb2xzXHJcbiAgICAgICAgICogQG1lbWJlcm9mIHZqcy5QbGF5ZXJcclxuICAgICAgICAgKiBAaW5zdGFuY2VcclxuICAgICAgICAgKiBAcHJpdmF0ZVxyXG4gICAgICAgICAqL1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcigndXNpbmdjdXN0b21jb250cm9scycpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbiAgcmV0dXJuIHRoaXMudXNpbmdOYXRpdmVDb250cm9sc187XHJcbn07XHJcblxyXG52anMuUGxheWVyLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ2Vycm9yJyk7IH07XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLmVuZGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaEdldCgnZW5kZWQnKTsgfTtcclxudmpzLlBsYXllci5wcm90b3R5cGUuc2Vla2luZyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hHZXQoJ3NlZWtpbmcnKTsgfTtcclxuXHJcbi8vIFdoZW4gdGhlIHBsYXllciBpcyBmaXJzdCBpbml0aWFsaXplZCwgdHJpZ2dlciBhY3Rpdml0eSBzbyBjb21wb25lbnRzXHJcbi8vIGxpa2UgdGhlIGNvbnRyb2wgYmFyIHNob3cgdGhlbXNlbHZlcyBpZiBuZWVkZWRcclxudmpzLlBsYXllci5wcm90b3R5cGUudXNlckFjdGl2aXR5XyA9IHRydWU7XHJcbnZqcy5QbGF5ZXIucHJvdG90eXBlLnJlcG9ydFVzZXJBY3Rpdml0eSA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLnVzZXJBY3Rpdml0eV8gPSB0cnVlO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUudXNlckFjdGl2ZV8gPSB0cnVlO1xyXG52anMuUGxheWVyLnByb3RvdHlwZS51c2VyQWN0aXZlID0gZnVuY3Rpb24oYm9vbCl7XHJcbiAgaWYgKGJvb2wgIT09IHVuZGVmaW5lZCkge1xyXG4gICAgYm9vbCA9ICEhYm9vbDtcclxuICAgIGlmIChib29sICE9PSB0aGlzLnVzZXJBY3RpdmVfKSB7XHJcbiAgICAgIHRoaXMudXNlckFjdGl2ZV8gPSBib29sO1xyXG4gICAgICBpZiAoYm9vbCkge1xyXG4gICAgICAgIC8vIElmIHRoZSB1c2VyIHdhcyBpbmFjdGl2ZSBhbmQgaXMgbm93IGFjdGl2ZSB3ZSB3YW50IHRvIHJlc2V0IHRoZVxyXG4gICAgICAgIC8vIGluYWN0aXZpdHkgdGltZXJcclxuICAgICAgICB0aGlzLnVzZXJBY3Rpdml0eV8gPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy11c2VyLWluYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLXVzZXItYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd1c2VyYWN0aXZlJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gV2UncmUgc3dpdGNoaW5nIHRoZSBzdGF0ZSB0byBpbmFjdGl2ZSBtYW51YWxseSwgc28gZXJhc2UgYW55IG90aGVyXHJcbiAgICAgICAgLy8gYWN0aXZpdHlcclxuICAgICAgICB0aGlzLnVzZXJBY3Rpdml0eV8gPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQ2hyb21lL1NhZmFyaS9JRSBoYXZlIGJ1Z3Mgd2hlcmUgd2hlbiB5b3UgY2hhbmdlIHRoZSBjdXJzb3IgaXQgY2FuXHJcbiAgICAgICAgLy8gdHJpZ2dlciBhIG1vdXNlbW92ZSBldmVudC4gVGhpcyBjYXVzZXMgYW4gaXNzdWUgd2hlbiB5b3UncmUgaGlkaW5nXHJcbiAgICAgICAgLy8gdGhlIGN1cnNvciB3aGVuIHRoZSB1c2VyIGlzIGluYWN0aXZlLCBhbmQgYSBtb3VzZW1vdmUgc2lnbmFscyB1c2VyXHJcbiAgICAgICAgLy8gYWN0aXZpdHkuIE1ha2luZyBpdCBpbXBvc3NpYmxlIHRvIGdvIGludG8gaW5hY3RpdmUgbW9kZS4gU3BlY2lmaWNhbGx5XHJcbiAgICAgICAgLy8gdGhpcyBoYXBwZW5zIGluIGZ1bGxzY3JlZW4gd2hlbiB3ZSByZWFsbHkgbmVlZCB0byBoaWRlIHRoZSBjdXJzb3IuXHJcbiAgICAgICAgLy9cclxuICAgICAgICAvLyBXaGVuIHRoaXMgZ2V0cyByZXNvbHZlZCBpbiBBTEwgYnJvd3NlcnMgaXQgY2FuIGJlIHJlbW92ZWRcclxuICAgICAgICAvLyBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTAzMDQxXHJcbiAgICAgICAgdGhpcy50ZWNoLm9uZSgnbW91c2Vtb3ZlJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy11c2VyLWFjdGl2ZScpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy11c2VyLWluYWN0aXZlJyk7XHJcbiAgICAgICAgdGhpcy50cmlnZ2VyKCd1c2VyaW5hY3RpdmUnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzLnVzZXJBY3RpdmVfO1xyXG59O1xyXG5cclxudmpzLlBsYXllci5wcm90b3R5cGUubGlzdGVuRm9yVXNlckFjdGl2aXR5ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgb25Nb3VzZUFjdGl2aXR5LCBvbk1vdXNlRG93biwgbW91c2VJblByb2dyZXNzLCBvbk1vdXNlVXAsXHJcbiAgICAgIGFjdGl2aXR5Q2hlY2ssIGluYWN0aXZpdHlUaW1lb3V0O1xyXG5cclxuICBvbk1vdXNlQWN0aXZpdHkgPSB0aGlzLnJlcG9ydFVzZXJBY3Rpdml0eTtcclxuXHJcbiAgb25Nb3VzZURvd24gPSBmdW5jdGlvbigpIHtcclxuICAgIG9uTW91c2VBY3Rpdml0eSgpO1xyXG4gICAgLy8gRm9yIGFzIGxvbmcgYXMgdGhlIHRoZXkgYXJlIHRvdWNoaW5nIHRoZSBkZXZpY2Ugb3IgaGF2ZSB0aGVpciBtb3VzZSBkb3duLFxyXG4gICAgLy8gd2UgY29uc2lkZXIgdGhlbSBhY3RpdmUgZXZlbiBpZiB0aGV5J3JlIG5vdCBtb3ZpbmcgdGhlaXIgZmluZ2VyIG9yIG1vdXNlLlxyXG4gICAgLy8gU28gd2Ugd2FudCB0byBjb250aW51ZSB0byB1cGRhdGUgdGhhdCB0aGV5IGFyZSBhY3RpdmVcclxuICAgIGNsZWFySW50ZXJ2YWwobW91c2VJblByb2dyZXNzKTtcclxuICAgIC8vIFNldHRpbmcgdXNlckFjdGl2aXR5PXRydWUgbm93IGFuZCBzZXR0aW5nIHRoZSBpbnRlcnZhbCB0byB0aGUgc2FtZSB0aW1lXHJcbiAgICAvLyBhcyB0aGUgYWN0aXZpdHlDaGVjayBpbnRlcnZhbCAoMjUwKSBzaG91bGQgZW5zdXJlIHdlIG5ldmVyIG1pc3MgdGhlXHJcbiAgICAvLyBuZXh0IGFjdGl2aXR5Q2hlY2tcclxuICAgIG1vdXNlSW5Qcm9ncmVzcyA9IHNldEludGVydmFsKHZqcy5iaW5kKHRoaXMsIG9uTW91c2VBY3Rpdml0eSksIDI1MCk7XHJcbiAgfTtcclxuXHJcbiAgb25Nb3VzZVVwID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgIG9uTW91c2VBY3Rpdml0eSgpO1xyXG4gICAgLy8gU3RvcCB0aGUgaW50ZXJ2YWwgdGhhdCBtYWludGFpbnMgYWN0aXZpdHkgaWYgdGhlIG1vdXNlL3RvdWNoIGlzIGRvd25cclxuICAgIGNsZWFySW50ZXJ2YWwobW91c2VJblByb2dyZXNzKTtcclxuICB9O1xyXG5cclxuICAvLyBBbnkgbW91c2UgbW92ZW1lbnQgd2lsbCBiZSBjb25zaWRlcmVkIHVzZXIgYWN0aXZpdHlcclxuICB0aGlzLm9uKCdtb3VzZWRvd24nLCBvbk1vdXNlRG93bik7XHJcbiAgdGhpcy5vbignbW91c2Vtb3ZlJywgb25Nb3VzZUFjdGl2aXR5KTtcclxuICB0aGlzLm9uKCdtb3VzZXVwJywgb25Nb3VzZVVwKTtcclxuXHJcbiAgLy8gTGlzdGVuIGZvciBrZXlib2FyZCBuYXZpZ2F0aW9uXHJcbiAgLy8gU2hvdWxkbid0IG5lZWQgdG8gdXNlIGluUHJvZ3Jlc3MgaW50ZXJ2YWwgYmVjYXVzZSBvZiBrZXkgcmVwZWF0XHJcbiAgdGhpcy5vbigna2V5ZG93bicsIG9uTW91c2VBY3Rpdml0eSk7XHJcbiAgdGhpcy5vbigna2V5dXAnLCBvbk1vdXNlQWN0aXZpdHkpO1xyXG5cclxuICAvLyBDb25zaWRlciBhbnkgdG91Y2ggZXZlbnRzIHRoYXQgYnViYmxlIHVwIHRvIGJlIGFjdGl2aXR5XHJcbiAgLy8gQ2VydGFpbiB0b3VjaGVzIG9uIHRoZSB0ZWNoIHdpbGwgYmUgYmxvY2tlZCBmcm9tIGJ1YmJsaW5nIGJlY2F1c2UgdGhleVxyXG4gIC8vIHRvZ2dsZSBjb250cm9sc1xyXG4gIHRoaXMub24oJ3RvdWNoc3RhcnQnLCBvbk1vdXNlRG93bik7XHJcbiAgdGhpcy5vbigndG91Y2htb3ZlJywgb25Nb3VzZUFjdGl2aXR5KTtcclxuICB0aGlzLm9uKCd0b3VjaGVuZCcsIG9uTW91c2VVcCk7XHJcbiAgdGhpcy5vbigndG91Y2hjYW5jZWwnLCBvbk1vdXNlVXApO1xyXG5cclxuICAvLyBSdW4gYW4gaW50ZXJ2YWwgZXZlcnkgMjUwIG1pbGxpc2Vjb25kcyBpbnN0ZWFkIG9mIHN0dWZmaW5nIGV2ZXJ5dGhpbmcgaW50b1xyXG4gIC8vIHRoZSBtb3VzZW1vdmUvdG91Y2htb3ZlIGZ1bmN0aW9uIGl0c2VsZiwgdG8gcHJldmVudCBwZXJmb3JtYW5jZSBkZWdyYWRhdGlvbi5cclxuICAvLyBgdGhpcy5yZXBvcnRVc2VyQWN0aXZpdHlgIHNpbXBseSBzZXRzIHRoaXMudXNlckFjdGl2aXR5XyB0byB0cnVlLCB3aGljaFxyXG4gIC8vIHRoZW4gZ2V0cyBwaWNrZWQgdXAgYnkgdGhpcyBsb29wXHJcbiAgLy8gaHR0cDovL2Vqb2huLm9yZy9ibG9nL2xlYXJuaW5nLWZyb20tdHdpdHRlci9cclxuICBhY3Rpdml0eUNoZWNrID0gc2V0SW50ZXJ2YWwodmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKSB7XHJcbiAgICAvLyBDaGVjayB0byBzZWUgaWYgbW91c2UvdG91Y2ggYWN0aXZpdHkgaGFzIGhhcHBlbmVkXHJcbiAgICBpZiAodGhpcy51c2VyQWN0aXZpdHlfKSB7XHJcbiAgICAgIC8vIFJlc2V0IHRoZSBhY3Rpdml0eSB0cmFja2VyXHJcbiAgICAgIHRoaXMudXNlckFjdGl2aXR5XyA9IGZhbHNlO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIHVzZXIgc3RhdGUgd2FzIGluYWN0aXZlLCBzZXQgdGhlIHN0YXRlIHRvIGFjdGl2ZVxyXG4gICAgICB0aGlzLnVzZXJBY3RpdmUodHJ1ZSk7XHJcblxyXG4gICAgICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgaW5hY3Rpdml0eSB0aW1lb3V0IHRvIHN0YXJ0IHRoZSB0aW1lciBvdmVyXHJcbiAgICAgIGNsZWFyVGltZW91dChpbmFjdGl2aXR5VGltZW91dCk7XHJcblxyXG4gICAgICAvLyBJbiBYIHNlY29uZHMsIGlmIG5vIG1vcmUgYWN0aXZpdHkgaGFzIG9jY3VycmVkIHRoZSB1c2VyIHdpbGwgYmVcclxuICAgICAgLy8gY29uc2lkZXJlZCBpbmFjdGl2ZVxyXG4gICAgICBpbmFjdGl2aXR5VGltZW91dCA9IHNldFRpbWVvdXQodmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgLy8gUHJvdGVjdCBhZ2FpbnN0IHRoZSBjYXNlIHdoZXJlIHRoZSBpbmFjdGl2aXR5VGltZW91dCBjYW4gdHJpZ2dlciBqdXN0XHJcbiAgICAgICAgLy8gYmVmb3JlIHRoZSBuZXh0IHVzZXIgYWN0aXZpdHkgaXMgcGlja2VkIHVwIGJ5IHRoZSBhY3Rpdml0eUNoZWNrIGxvb3BcclxuICAgICAgICAvLyBjYXVzaW5nIGEgZmxpY2tlclxyXG4gICAgICAgIGlmICghdGhpcy51c2VyQWN0aXZpdHlfKSB7XHJcbiAgICAgICAgICB0aGlzLnVzZXJBY3RpdmUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSksIDIwMDApO1xyXG4gICAgfVxyXG4gIH0pLCAyNTApO1xyXG5cclxuICAvLyBDbGVhbiB1cCB0aGUgaW50ZXJ2YWxzIHdoZW4gd2Uga2lsbCB0aGUgcGxheWVyXHJcbiAgdGhpcy5vbignZGlzcG9zZScsIGZ1bmN0aW9uKCl7XHJcbiAgICBjbGVhckludGVydmFsKGFjdGl2aXR5Q2hlY2spO1xyXG4gICAgY2xlYXJUaW1lb3V0KGluYWN0aXZpdHlUaW1lb3V0KTtcclxuICB9KTtcclxufTtcclxuXHJcbi8vIE1ldGhvZHMgdG8gYWRkIHN1cHBvcnQgZm9yXHJcbi8vIG5ldHdvcmtTdGF0ZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ25ldHdvcmtTdGF0ZScpOyB9LFxyXG4vLyByZWFkeVN0YXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgncmVhZHlTdGF0ZScpOyB9LFxyXG4vLyBzZWVraW5nOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnc2Vla2luZycpOyB9LFxyXG4vLyBpbml0aWFsVGltZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2luaXRpYWxUaW1lJyk7IH0sXHJcbi8vIHN0YXJ0T2Zmc2V0VGltZTogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3N0YXJ0T2Zmc2V0VGltZScpOyB9LFxyXG4vLyBwbGF5ZWQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdwbGF5ZWQnKTsgfSxcclxuLy8gc2Vla2FibGU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdzZWVrYWJsZScpOyB9LFxyXG4vLyB2aWRlb1RyYWNrczogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3ZpZGVvVHJhY2tzJyk7IH0sXHJcbi8vIGF1ZGlvVHJhY2tzOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnYXVkaW9UcmFja3MnKTsgfSxcclxuLy8gdmlkZW9XaWR0aDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ3ZpZGVvV2lkdGgnKTsgfSxcclxuLy8gdmlkZW9IZWlnaHQ6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCd2aWRlb0hlaWdodCcpOyB9LFxyXG4vLyBkZWZhdWx0UGxheWJhY2tSYXRlOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnZGVmYXVsdFBsYXliYWNrUmF0ZScpOyB9LFxyXG4vLyBwbGF5YmFja1JhdGU6IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLnRlY2hDYWxsKCdwbGF5YmFja1JhdGUnKTsgfSxcclxuLy8gbWVkaWFHcm91cDogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ21lZGlhR3JvdXAnKTsgfSxcclxuLy8gY29udHJvbGxlcjogZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMudGVjaENhbGwoJ2NvbnRyb2xsZXInKTsgfSxcclxuLy8gZGVmYXVsdE11dGVkOiBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy50ZWNoQ2FsbCgnZGVmYXVsdE11dGVkJyk7IH1cclxuXHJcbi8vIFRPRE9cclxuLy8gY3VycmVudFNyY0xpc3Q6IHRoZSBhcnJheSBvZiBzb3VyY2VzIGluY2x1ZGluZyBvdGhlciBmb3JtYXRzIGFuZCBiaXRyYXRlc1xyXG4vLyBwbGF5TGlzdDogYXJyYXkgb2Ygc291cmNlIGxpc3RzIGluIG9yZGVyIG9mIHBsYXliYWNrXHJcblxyXG4vLyBSZXF1ZXN0RnVsbHNjcmVlbiBBUElcclxuKGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHByZWZpeCwgcmVxdWVzdEZTLCBkaXY7XHJcblxyXG4gIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG5cclxuICByZXF1ZXN0RlMgPSB7fTtcclxuXHJcbiAgLy8gQ3VycmVudCBXM0MgU3BlY1xyXG4gIC8vIGh0dHA6Ly9kdmNzLnczLm9yZy9oZy9mdWxsc2NyZWVuL3Jhdy1maWxlL3RpcC9PdmVydmlldy5odG1sI2FwaVxyXG4gIC8vIE1vemlsbGEgRHJhZnQ6IGh0dHBzOi8vd2lraS5tb3ppbGxhLm9yZy9HZWNrbzpGdWxsU2NyZWVuQVBJI2Z1bGxzY3JlZW5jaGFuZ2VfZXZlbnRcclxuICAvLyBOZXc6IGh0dHBzOi8vZHZjcy53My5vcmcvaGcvZnVsbHNjcmVlbi9yYXctZmlsZS81MjlhNjdiOGQ5ZjMvT3ZlcnZpZXcuaHRtbFxyXG4gIGlmIChkaXYuY2FuY2VsRnVsbHNjcmVlbiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICByZXF1ZXN0RlMucmVxdWVzdEZuID0gJ3JlcXVlc3RGdWxsc2NyZWVuJztcclxuICAgIHJlcXVlc3RGUy5jYW5jZWxGbiA9ICdleGl0RnVsbHNjcmVlbic7XHJcbiAgICByZXF1ZXN0RlMuZXZlbnROYW1lID0gJ2Z1bGxzY3JlZW5jaGFuZ2UnO1xyXG4gICAgcmVxdWVzdEZTLmlzRnVsbFNjcmVlbiA9ICdmdWxsU2NyZWVuJztcclxuXHJcbiAgLy8gV2Via2l0IChDaHJvbWUvU2FmYXJpKSBhbmQgTW96aWxsYSAoRmlyZWZveCkgaGF2ZSB3b3JraW5nIGltcGxlbWVudGF0aW9uc1xyXG4gIC8vIHRoYXQgdXNlIHByZWZpeGVzIGFuZCB2YXJ5IHNsaWdodGx5IGZyb20gdGhlIG5ldyBXM0Mgc3BlYy4gU3BlY2lmaWNhbGx5LFxyXG4gIC8vIHVzaW5nICdleGl0JyBpbnN0ZWFkIG9mICdjYW5jZWwnLCBhbmQgbG93ZXJjYXNpbmcgdGhlICdTJyBpbiBGdWxsc2NyZWVuLlxyXG4gIC8vIE90aGVyIGJyb3dzZXJzIGRvbid0IGhhdmUgYW55IGhpbnRzIG9mIHdoaWNoIHZlcnNpb24gdGhleSBtaWdodCBmb2xsb3cgeWV0LFxyXG4gIC8vIHNvIG5vdCBnb2luZyB0byB0cnkgdG8gcHJlZGljdCBieSBsb29waW5nIHRocm91Z2ggYWxsIHByZWZpeGVzLlxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcclxuICAgICAgcHJlZml4ID0gJ21veic7XHJcbiAgICAgIHJlcXVlc3RGUy5pc0Z1bGxTY3JlZW4gPSBwcmVmaXggKyAnRnVsbFNjcmVlbic7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBwcmVmaXggPSAnd2Via2l0JztcclxuICAgICAgcmVxdWVzdEZTLmlzRnVsbFNjcmVlbiA9IHByZWZpeCArICdJc0Z1bGxTY3JlZW4nO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChkaXZbcHJlZml4ICsgJ1JlcXVlc3RGdWxsU2NyZWVuJ10pIHtcclxuICAgICAgcmVxdWVzdEZTLnJlcXVlc3RGbiA9IHByZWZpeCArICdSZXF1ZXN0RnVsbFNjcmVlbic7XHJcbiAgICAgIHJlcXVlc3RGUy5jYW5jZWxGbiA9IHByZWZpeCArICdDYW5jZWxGdWxsU2NyZWVuJztcclxuICAgIH1cclxuICAgIHJlcXVlc3RGUy5ldmVudE5hbWUgPSBwcmVmaXggKyAnZnVsbHNjcmVlbmNoYW5nZSc7XHJcbiAgfVxyXG5cclxuICBpZiAoZG9jdW1lbnRbcmVxdWVzdEZTLmNhbmNlbEZuXSkge1xyXG4gICAgdmpzLnN1cHBvcnQucmVxdWVzdEZ1bGxTY3JlZW4gPSByZXF1ZXN0RlM7XHJcbiAgfVxyXG5cclxufSkoKTtcclxuXHJcblxyXG4vKipcclxuICogQ29udGFpbmVyIG9mIG1haW4gY29udHJvbHNcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqIEBleHRlbmRzIHZqcy5Db21wb25lbnRcclxuICovXHJcbnZqcy5Db250cm9sQmFyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoKTtcclxuXHJcbnZqcy5Db250cm9sQmFyLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICBsb2FkRXZlbnQ6ICdwbGF5JyxcclxuICBjaGlsZHJlbjoge1xyXG4gICAgJ3BsYXlUb2dnbGUnOiB7fSxcclxuICAgICdjdXJyZW50VGltZURpc3BsYXknOiB7fSxcclxuICAgICd0aW1lRGl2aWRlcic6IHt9LFxyXG4gICAgJ2R1cmF0aW9uRGlzcGxheSc6IHt9LFxyXG4gICAgJ3JlbWFpbmluZ1RpbWVEaXNwbGF5Jzoge30sXHJcbiAgICAncHJvZ3Jlc3NDb250cm9sJzoge30sXHJcbiAgICAnZnVsbHNjcmVlblRvZ2dsZSc6IHt9LFxyXG4gICAgJ3ZvbHVtZUNvbnRyb2wnOiB7fSxcclxuICAgICdtdXRlVG9nZ2xlJzoge31cclxuICAgIC8vICd2b2x1bWVNZW51QnV0dG9uJzoge31cclxuICB9XHJcbn07XHJcblxyXG52anMuQ29udHJvbEJhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuY3JlYXRlRWwoJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1jb250cm9sLWJhcidcclxuICB9KTtcclxufTtcclxuLyoqXHJcbiAqIEJ1dHRvbiB0byB0b2dnbGUgYmV0d2VlbiBwbGF5IGFuZCBwYXVzZVxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjbGFzc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5QbGF5VG9nZ2xlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCdwbGF5JywgdmpzLmJpbmQodGhpcywgdGhpcy5vblBsYXkpKTtcclxuICAgIHBsYXllci5vbigncGF1c2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLm9uUGF1c2UpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnUGxheSc7XHJcblxyXG52anMuUGxheVRvZ2dsZS5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICd2anMtcGxheS1jb250cm9sICcgKyB2anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vLyBPbkNsaWNrIC0gVG9nZ2xlIGJldHdlZW4gcGxheSBhbmQgcGF1c2VcclxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLnBsYXllcl8ucGF1c2VkKCkpIHtcclxuICAgIHRoaXMucGxheWVyXy5wbGF5KCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMucGxheWVyXy5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuXHJcbiAgLy8gT25QbGF5IC0gQWRkIHRoZSB2anMtcGxheWluZyBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2VcclxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLm9uUGxheSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLnJlbW92ZUNsYXNzKHRoaXMuZWxfLCAndmpzLXBhdXNlZCcpO1xyXG4gIHZqcy5hZGRDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wbGF5aW5nJyk7XHJcbiAgdGhpcy5lbF8uY2hpbGRyZW5bMF0uY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gJ1BhdXNlJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIlBhdXNlXCJcclxufTtcclxuXHJcbiAgLy8gT25QYXVzZSAtIEFkZCB0aGUgdmpzLXBhdXNlZCBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2VcclxudmpzLlBsYXlUb2dnbGUucHJvdG90eXBlLm9uUGF1c2UgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy1wbGF5aW5nJyk7XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXBhdXNlZCcpO1xyXG4gIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdQbGF5JzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIlBsYXlcIlxyXG59O1xyXG4vKipcclxuICogRGlzcGxheXMgdGhlIGN1cnJlbnQgdGltZVxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkN1cnJlbnRUaW1lRGlzcGxheSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQ29udGVudCkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuQ3VycmVudFRpbWVEaXNwbGF5LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGVsID0gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWN1cnJlbnQtdGltZSB2anMtdGltZS1jb250cm9scyB2anMtY29udHJvbCdcclxuICB9KTtcclxuXHJcbiAgdGhpcy5jb250ZW50ID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtY3VycmVudC10aW1lLWRpc3BsYXknLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+Q3VycmVudCBUaW1lIDwvc3Bhbj4nICsgJzA6MDAnLCAvLyBsYWJlbCB0aGUgY3VycmVudCB0aW1lIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzXHJcbiAgICAnYXJpYS1saXZlJzogJ29mZicgLy8gdGVsbCBzY3JlZW4gcmVhZGVycyBub3QgdG8gYXV0b21hdGljYWxseSByZWFkIHRoZSB0aW1lIGFzIGl0IGNoYW5nZXNcclxuICB9KTtcclxuXHJcbiAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdkaXYnKS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRlbnQpKTtcclxuICByZXR1cm4gZWw7XHJcbn07XHJcblxyXG52anMuQ3VycmVudFRpbWVEaXNwbGF5LnByb3RvdHlwZS51cGRhdGVDb250ZW50ID0gZnVuY3Rpb24oKXtcclxuICAvLyBBbGxvd3MgZm9yIHNtb290aCBzY3J1YmJpbmcsIHdoZW4gcGxheWVyIGNhbid0IGtlZXAgdXAuXHJcbiAgdmFyIHRpbWUgPSAodGhpcy5wbGF5ZXJfLnNjcnViYmluZykgPyB0aGlzLnBsYXllcl8uZ2V0Q2FjaGUoKS5jdXJyZW50VGltZSA6IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG4gIHRoaXMuY29udGVudC5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+Q3VycmVudCBUaW1lIDwvc3Bhbj4nICsgdmpzLmZvcm1hdFRpbWUodGltZSwgdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkpO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIERpc3BsYXlzIHRoZSBkdXJhdGlvblxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkR1cmF0aW9uRGlzcGxheSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQ29udGVudCkpOyAvLyB0aGlzIG1pZ2h0IG5lZWQgdG8gYmUgY2hhbmdlcyB0byAnZHVyYXRpb25jaGFuZ2UnIGluc3RlYWQgb2YgJ3RpbWV1cGRhdGUnIGV2ZW50dWFsbHksIGhvd2V2ZXIgdGhlIGR1cmF0aW9uY2hhbmdlIGV2ZW50IGZpcmVzIGJlZm9yZSB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSBpcyBzZXQsIHNvIHRoZSB2YWx1ZSBjYW5ub3QgYmUgd3JpdHRlbiBvdXQgdXNpbmcgdGhpcyBtZXRob2QuIE9uY2UgdGhlIG9yZGVyIG9mIGR1cmF0aW9uY2hhbmdlIGFuZCB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSBiZWluZyBzZXQgaXMgZmlndXJlZCBvdXQsIHRoaXMgY2FuIGJlIHVwZGF0ZWQuXHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5EdXJhdGlvbkRpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtZHVyYXRpb24gdmpzLXRpbWUtY29udHJvbHMgdmpzLWNvbnRyb2wnXHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuY29udGVudCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWR1cmF0aW9uLWRpc3BsYXknLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+RHVyYXRpb24gVGltZSA8L3NwYW4+JyArICcwOjAwJywgLy8gbGFiZWwgdGhlIGR1cmF0aW9uIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcclxuICAgICdhcmlhLWxpdmUnOiAnb2ZmJyAvLyB0ZWxsIHNjcmVlbiByZWFkZXJzIG5vdCB0byBhdXRvbWF0aWNhbGx5IHJlYWQgdGhlIHRpbWUgYXMgaXQgY2hhbmdlc1xyXG4gIH0pO1xyXG5cclxuICBlbC5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2RpdicpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCkpO1xyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbnZqcy5EdXJhdGlvbkRpc3BsYXkucHJvdG90eXBlLnVwZGF0ZUNvbnRlbnQgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBkdXJhdGlvbiA9IHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xyXG4gIGlmIChkdXJhdGlvbikge1xyXG4gICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPkR1cmF0aW9uIFRpbWUgPC9zcGFuPicgKyB2anMuZm9ybWF0VGltZShkdXJhdGlvbik7IC8vIGxhYmVsIHRoZSBkdXJhdGlvbiB0aW1lIGZvciBzY3JlZW4gcmVhZGVyIHVzZXJzXHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBzZXBhcmF0b3IgYmV0d2VlbiB0aGUgY3VycmVudCB0aW1lIGFuZCBkdXJhdGlvblxyXG4gKlxyXG4gKiBDYW4gYmUgaGlkZGVuIGlmIGl0J3Mgbm90IG5lZWRlZCBpbiB0aGUgZGVzaWduLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlRpbWVEaXZpZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5UaW1lRGl2aWRlci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdGltZS1kaXZpZGVyJyxcclxuICAgIGlubmVySFRNTDogJzxkaXY+PHNwYW4+Lzwvc3Bhbj48L2Rpdj4nXHJcbiAgfSk7XHJcbn07XHJcblxyXG4vKipcclxuICogRGlzcGxheXMgdGhlIHRpbWUgbGVmdCBpbiB0aGUgdmlkZW9cclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5SZW1haW5pbmdUaW1lRGlzcGxheSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHBsYXllci5vbigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQ29udGVudCkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuUmVtYWluaW5nVGltZURpc3BsYXkucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICB2YXIgZWwgPSB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtcmVtYWluaW5nLXRpbWUgdmpzLXRpbWUtY29udHJvbHMgdmpzLWNvbnRyb2wnXHJcbiAgfSk7XHJcblxyXG4gIHRoaXMuY29udGVudCA9IHZqcy5jcmVhdGVFbCgnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXJlbWFpbmluZy10aW1lLWRpc3BsYXknLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+UmVtYWluaW5nIFRpbWUgPC9zcGFuPicgKyAnLTA6MDAnLCAvLyBsYWJlbCB0aGUgcmVtYWluaW5nIHRpbWUgZm9yIHNjcmVlbiByZWFkZXIgdXNlcnNcclxuICAgICdhcmlhLWxpdmUnOiAnb2ZmJyAvLyB0ZWxsIHNjcmVlbiByZWFkZXJzIG5vdCB0byBhdXRvbWF0aWNhbGx5IHJlYWQgdGhlIHRpbWUgYXMgaXQgY2hhbmdlc1xyXG4gIH0pO1xyXG5cclxuICBlbC5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2RpdicpLmFwcGVuZENoaWxkKHRoaXMuY29udGVudCkpO1xyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbnZqcy5SZW1haW5pbmdUaW1lRGlzcGxheS5wcm90b3R5cGUudXBkYXRlQ29udGVudCA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMucGxheWVyXy5kdXJhdGlvbigpKSB7XHJcbiAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwidmpzLWNvbnRyb2wtdGV4dFwiPlJlbWFpbmluZyBUaW1lIDwvc3Bhbj4nICsgJy0nKyB2anMuZm9ybWF0VGltZSh0aGlzLnBsYXllcl8ucmVtYWluaW5nVGltZSgpKTtcclxuICB9XHJcblxyXG4gIC8vIEFsbG93cyBmb3Igc21vb3RoIHNjcnViYmluZywgd2hlbiBwbGF5ZXIgY2FuJ3Qga2VlcCB1cC5cclxuICAvLyB2YXIgdGltZSA9ICh0aGlzLnBsYXllcl8uc2NydWJiaW5nKSA/IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpLmN1cnJlbnRUaW1lIDogdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcbiAgLy8gdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHZqcy5mb3JtYXRUaW1lKHRpbWUsIHRoaXMucGxheWVyXy5kdXJhdGlvbigpKTtcclxufTtcclxuLyoqXHJcbiAqIFRvZ2dsZSBmdWxsc2NyZWVuIHZpZGVvXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBleHRlbmRzIHZqcy5CdXR0b25cclxuICovXHJcbnZqcy5GdWxsc2NyZWVuVG9nZ2xlID0gdmpzLkJ1dHRvbi5leHRlbmQoe1xyXG4gIC8qKlxyXG4gICAqIEBjb25zdHJ1Y3RvclxyXG4gICAqIEBtZW1iZXJvZiB2anMuRnVsbHNjcmVlblRvZ2dsZVxyXG4gICAqIEBpbnN0YW5jZVxyXG4gICAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkZ1bGxzY3JlZW5Ub2dnbGUucHJvdG90eXBlLmJ1dHRvblRleHQgPSAnRnVsbHNjcmVlbic7XHJcblxyXG52anMuRnVsbHNjcmVlblRvZ2dsZS5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuICd2anMtZnVsbHNjcmVlbi1jb250cm9sICcgKyB2anMuQnV0dG9uLnByb3RvdHlwZS5idWlsZENTU0NsYXNzLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG52anMuRnVsbHNjcmVlblRvZ2dsZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKCF0aGlzLnBsYXllcl8uaXNGdWxsU2NyZWVuKSB7XHJcbiAgICB0aGlzLnBsYXllcl8ucmVxdWVzdEZ1bGxTY3JlZW4oKTtcclxuICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdOb24tRnVsbHNjcmVlbic7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHQgdG8gXCJOb24tRnVsbHNjcmVlblwiXHJcbiAgfSBlbHNlIHtcclxuICAgIHRoaXMucGxheWVyXy5jYW5jZWxGdWxsU2NyZWVuKCk7XHJcbiAgICB0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSAnRnVsbHNjcmVlbic7IC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRvIFwiRnVsbHNjcmVlblwiXHJcbiAgfVxyXG59O1xyXG4vKipcclxuICogVGhlIFByb2dyZXNzIENvbnRyb2wgY29tcG9uZW50IGNvbnRhaW5zIHRoZSBzZWVrIGJhciwgbG9hZCBwcm9ncmVzcyxcclxuICogYW5kIHBsYXkgcHJvZ3Jlc3NcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Qcm9ncmVzc0NvbnRyb2wgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlByb2dyZXNzQ29udHJvbC5wcm90b3R5cGUub3B0aW9uc18gPSB7XHJcbiAgY2hpbGRyZW46IHtcclxuICAgICdzZWVrQmFyJzoge31cclxuICB9XHJcbn07XHJcblxyXG52anMuUHJvZ3Jlc3NDb250cm9sLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy1wcm9ncmVzcy1jb250cm9sIHZqcy1jb250cm9sJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFNlZWsgQmFyIGFuZCBob2xkZXIgZm9yIHRoZSBwcm9ncmVzcyBiYXJzXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuU2Vla0JhciA9IHZqcy5TbGlkZXIuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5TbGlkZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gICAgcGxheWVyLm9uKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGVBUklBQXR0cmlidXRlcykpO1xyXG4gICAgcGxheWVyLnJlYWR5KHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQVJJQUF0dHJpYnV0ZXMpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICAnbG9hZFByb2dyZXNzQmFyJzoge30sXHJcbiAgICAncGxheVByb2dyZXNzQmFyJzoge30sXHJcbiAgICAnc2Vla0hhbmRsZSc6IHt9XHJcbiAgfSxcclxuICAnYmFyTmFtZSc6ICdwbGF5UHJvZ3Jlc3NCYXInLFxyXG4gICdoYW5kbGVOYW1lJzogJ3NlZWtIYW5kbGUnXHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUucGxheWVyRXZlbnQgPSAndGltZXVwZGF0ZSc7XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuU2xpZGVyLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtcHJvZ3Jlc3MtaG9sZGVyJyxcclxuICAgICdhcmlhLWxhYmVsJzogJ3ZpZGVvIHByb2dyZXNzIGJhcidcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS51cGRhdGVBUklBQXR0cmlidXRlcyA9IGZ1bmN0aW9uKCl7XHJcbiAgICAvLyBBbGxvd3MgZm9yIHNtb290aCBzY3J1YmJpbmcsIHdoZW4gcGxheWVyIGNhbid0IGtlZXAgdXAuXHJcbiAgICB2YXIgdGltZSA9ICh0aGlzLnBsYXllcl8uc2NydWJiaW5nKSA/IHRoaXMucGxheWVyXy5nZXRDYWNoZSgpLmN1cnJlbnRUaW1lIDogdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWVub3cnLHZqcy5yb3VuZCh0aGlzLmdldFBlcmNlbnQoKSoxMDAsIDIpKTsgLy8gbWFjaGluZSByZWFkYWJsZSB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgKHBlcmNlbnRhZ2UgY29tcGxldGUpXHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0Jyx2anMuZm9ybWF0VGltZSh0aW1lLCB0aGlzLnBsYXllcl8uZHVyYXRpb24oKSkpOyAvLyBodW1hbiByZWFkYWJsZSB2YWx1ZSBvZiBwcm9ncmVzcyBiYXIgKHRpbWUgY29tcGxldGUpXHJcbn07XHJcblxyXG52anMuU2Vla0Jhci5wcm90b3R5cGUuZ2V0UGVyY2VudCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGN1cnJlbnRUaW1lO1xyXG4gIC8vIEZsYXNoIFJUTVAgcHJvdmlkZXIgd2lsbCBub3QgcmVwb3J0IHRoZSBjb3JyZWN0IHRpbWVcclxuICAvLyBpbW1lZGlhdGVseSBhZnRlciBhIHNlZWsuIFRoaXMgaXNuJ3Qgbm90aWNlYWJsZSBpZiB5b3UncmVcclxuICAvLyBzZWVraW5nIHdoaWxlIHRoZSB2aWRlbyBpcyBwbGF5aW5nLCBidXQgaXQgaXMgaWYgeW91IHNlZWtcclxuICAvLyB3aGlsZSB0aGUgdmlkZW8gaXMgcGF1c2VkLlxyXG4gIGlmICh0aGlzLnBsYXllcl8udGVjaE5hbWUgPT09ICdGbGFzaCcgJiYgdGhpcy5wbGF5ZXJfLnNlZWtpbmcoKSkge1xyXG4gICAgdmFyIGNhY2hlID0gdGhpcy5wbGF5ZXJfLmdldENhY2hlKCk7XHJcbiAgICBpZiAoY2FjaGUubGFzdFNldEN1cnJlbnRUaW1lKSB7XHJcbiAgICAgIGN1cnJlbnRUaW1lID0gY2FjaGUubGFzdFNldEN1cnJlbnRUaW1lO1xyXG4gICAgfVxyXG4gICAgZWxzZSB7XHJcbiAgICAgIGN1cnJlbnRUaW1lID0gdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcbiAgICB9XHJcbiAgfVxyXG4gIGVsc2Uge1xyXG4gICAgY3VycmVudFRpbWUgPSB0aGlzLnBsYXllcl8uY3VycmVudFRpbWUoKTtcclxuICB9XHJcblxyXG4gIHJldHVybiBjdXJyZW50VGltZSAvIHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9uTW91c2VEb3duID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHZqcy5TbGlkZXIucHJvdG90eXBlLm9uTW91c2VEb3duLmNhbGwodGhpcywgZXZlbnQpO1xyXG5cclxuICB0aGlzLnBsYXllcl8uc2NydWJiaW5nID0gdHJ1ZTtcclxuXHJcbiAgdGhpcy52aWRlb1dhc1BsYXlpbmcgPSAhdGhpcy5wbGF5ZXJfLnBhdXNlZCgpO1xyXG4gIHRoaXMucGxheWVyXy5wYXVzZSgpO1xyXG59O1xyXG5cclxudmpzLlNlZWtCYXIucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHZhciBuZXdUaW1lID0gdGhpcy5jYWxjdWxhdGVEaXN0YW5jZShldmVudCkgKiB0aGlzLnBsYXllcl8uZHVyYXRpb24oKTtcclxuXHJcbiAgLy8gRG9uJ3QgbGV0IHZpZGVvIGVuZCB3aGlsZSBzY3J1YmJpbmcuXHJcbiAgaWYgKG5ld1RpbWUgPT0gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCkpIHsgbmV3VGltZSA9IG5ld1RpbWUgLSAwLjE7IH1cclxuXHJcbiAgLy8gU2V0IG5ldyB0aW1lICh0ZWxsIHBsYXllciB0byBzZWVrIHRvIG5ldyB0aW1lKVxyXG4gIHRoaXMucGxheWVyXy5jdXJyZW50VGltZShuZXdUaW1lKTtcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5vbk1vdXNlVXAgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdmpzLlNsaWRlci5wcm90b3R5cGUub25Nb3VzZVVwLmNhbGwodGhpcywgZXZlbnQpO1xyXG5cclxuICB0aGlzLnBsYXllcl8uc2NydWJiaW5nID0gZmFsc2U7XHJcbiAgaWYgKHRoaXMudmlkZW9XYXNQbGF5aW5nKSB7XHJcbiAgICB0aGlzLnBsYXllcl8ucGxheSgpO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5zdGVwRm9yd2FyZCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpICsgNSk7IC8vIG1vcmUgcXVpY2tseSBmYXN0IGZvcndhcmQgZm9yIGtleWJvYXJkLW9ubHkgdXNlcnNcclxufTtcclxuXHJcbnZqcy5TZWVrQmFyLnByb3RvdHlwZS5zdGVwQmFjayA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpIC0gNSk7IC8vIG1vcmUgcXVpY2tseSByZXdpbmQgZm9yIGtleWJvYXJkLW9ubHkgdXNlcnNcclxufTtcclxuXHJcblxyXG4vKipcclxuICogU2hvd3MgbG9hZCBwcm9ncmVzc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkxvYWRQcm9ncmVzc0JhciA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gICAgcGxheWVyLm9uKCdwcm9ncmVzcycsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Mb2FkUHJvZ3Jlc3NCYXIucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLWxvYWQtcHJvZ3Jlc3MnLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+TG9hZGVkOiAwJTwvc3Bhbj4nXHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuTG9hZFByb2dyZXNzQmFyLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLmVsXy5zdHlsZSkgeyB0aGlzLmVsXy5zdHlsZS53aWR0aCA9IHZqcy5yb3VuZCh0aGlzLnBsYXllcl8uYnVmZmVyZWRQZXJjZW50KCkgKiAxMDAsIDIpICsgJyUnOyB9XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIFNob3dzIHBsYXkgcHJvZ3Jlc3NcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5QbGF5UHJvZ3Jlc3NCYXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlBsYXlQcm9ncmVzc0Jhci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtcGxheS1wcm9ncmVzcycsXHJcbiAgICBpbm5lckhUTUw6ICc8c3BhbiBjbGFzcz1cInZqcy1jb250cm9sLXRleHRcIj5Qcm9ncmVzczogMCU8L3NwYW4+J1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBTZWVrIEhhbmRsZSBzaG93cyB0aGUgY3VycmVudCBwb3NpdGlvbiBvZiB0aGUgcGxheWhlYWQgZHVyaW5nIHBsYXliYWNrLFxyXG4gKiBhbmQgY2FuIGJlIGRyYWdnZWQgdG8gYWRqdXN0IHRoZSBwbGF5aGVhZC5cclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TZWVrSGFuZGxlID0gdmpzLlNsaWRlckhhbmRsZS5leHRlbmQoKTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIGhhbmRsZSBjb250ZW50LCB3aGljaCBtYXkgYmUgcmVhZCBieSBzY3JlZW4gcmVhZGVyc1xyXG4gKlxyXG4gKiBAdHlwZSB7U3RyaW5nfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlNlZWtIYW5kbGUucHJvdG90eXBlLmRlZmF1bHRWYWx1ZSA9ICcwMDowMCc7XHJcblxyXG4vKiogQGluaGVyaXREb2MgKi9cclxudmpzLlNlZWtIYW5kbGUucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLlNsaWRlckhhbmRsZS5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXNlZWstaGFuZGxlJ1xyXG4gIH0pO1xyXG59O1xyXG4vKipcclxuICogVGhlIGNvbXBvbmVudCBmb3IgY29udHJvbGxpbmcgdGhlIHZvbHVtZSBsZXZlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLlZvbHVtZUNvbnRyb2wgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBoaWRlIHZvbHVtZSBjb250cm9scyB3aGVuIHRoZXkncmUgbm90IHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCB0ZWNoXHJcbiAgICBpZiAocGxheWVyLnRlY2ggJiYgcGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgfVxyXG4gICAgcGxheWVyLm9uKCdsb2Fkc3RhcnQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG4gICAgICBpZiAocGxheWVyLnRlY2guZmVhdHVyZXMgJiYgcGxheWVyLnRlY2guZmVhdHVyZXNbJ3ZvbHVtZUNvbnRyb2wnXSA9PT0gZmFsc2UpIHtcclxuICAgICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9XHJcbiAgICB9KSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Wb2x1bWVDb250cm9sLnByb3RvdHlwZS5vcHRpb25zXyA9IHtcclxuICBjaGlsZHJlbjoge1xyXG4gICAgJ3ZvbHVtZUJhcic6IHt9XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlZvbHVtZUNvbnRyb2wucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLXZvbHVtZS1jb250cm9sIHZqcy1jb250cm9sJ1xyXG4gIH0pO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBiYXIgdGhhdCBjb250YWlucyB0aGUgdm9sdW1lIGxldmVsIGFuZCBjYW4gYmUgY2xpY2tlZCBvbiB0byBhZGp1c3QgdGhlIGxldmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVm9sdW1lQmFyID0gdmpzLlNsaWRlci5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLlNsaWRlci5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcbiAgICBwbGF5ZXIub24oJ3ZvbHVtZWNoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlQVJJQUF0dHJpYnV0ZXMpKTtcclxuICAgIHBsYXllci5yZWFkeSh2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZUFSSUFBdHRyaWJ1dGVzKSk7XHJcbiAgICBzZXRUaW1lb3V0KHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSwgMCk7IC8vIHVwZGF0ZSB3aGVuIGVsZW1lbnRzIGlzIGluIERPTVxyXG4gIH1cclxufSk7XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS51cGRhdGVBUklBQXR0cmlidXRlcyA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gQ3VycmVudCB2YWx1ZSBvZiB2b2x1bWUgYmFyIGFzIGEgcGVyY2VudGFnZVxyXG4gIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS12YWx1ZW5vdycsdmpzLnJvdW5kKHRoaXMucGxheWVyXy52b2x1bWUoKSoxMDAsIDIpKTtcclxuICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtdmFsdWV0ZXh0Jyx2anMucm91bmQodGhpcy5wbGF5ZXJfLnZvbHVtZSgpKjEwMCwgMikrJyUnKTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLm9wdGlvbnNfID0ge1xyXG4gIGNoaWxkcmVuOiB7XHJcbiAgICAndm9sdW1lTGV2ZWwnOiB7fSxcclxuICAgICd2b2x1bWVIYW5kbGUnOiB7fVxyXG4gIH0sXHJcbiAgJ2Jhck5hbWUnOiAndm9sdW1lTGV2ZWwnLFxyXG4gICdoYW5kbGVOYW1lJzogJ3ZvbHVtZUhhbmRsZSdcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLnBsYXllckV2ZW50ID0gJ3ZvbHVtZWNoYW5nZSc7XHJcblxyXG52anMuVm9sdW1lQmFyLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5TbGlkZXIucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtYmFyJyxcclxuICAgICdhcmlhLWxhYmVsJzogJ3ZvbHVtZSBsZXZlbCdcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLm9uTW91c2VNb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICBpZiAodGhpcy5wbGF5ZXJfLm11dGVkKCkpIHtcclxuICAgIHRoaXMucGxheWVyXy5tdXRlZChmYWxzZSk7XHJcbiAgfVxyXG5cclxuICB0aGlzLnBsYXllcl8udm9sdW1lKHRoaXMuY2FsY3VsYXRlRGlzdGFuY2UoZXZlbnQpKTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLmdldFBlcmNlbnQgPSBmdW5jdGlvbigpe1xyXG4gIGlmICh0aGlzLnBsYXllcl8ubXV0ZWQoKSkge1xyXG4gICAgcmV0dXJuIDA7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiB0aGlzLnBsYXllcl8udm9sdW1lKCk7XHJcbiAgfVxyXG59O1xyXG5cclxudmpzLlZvbHVtZUJhci5wcm90b3R5cGUuc3RlcEZvcndhcmQgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMucGxheWVyXy52b2x1bWUodGhpcy5wbGF5ZXJfLnZvbHVtZSgpICsgMC4xKTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVCYXIucHJvdG90eXBlLnN0ZXBCYWNrID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8udm9sdW1lKHRoaXMucGxheWVyXy52b2x1bWUoKSAtIDAuMSk7XHJcbn07XHJcblxyXG4vKipcclxuICogU2hvd3Mgdm9sdW1lIGxldmVsXHJcbiAqXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVm9sdW1lTGV2ZWwgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlZvbHVtZUxldmVsLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtbGV2ZWwnLFxyXG4gICAgaW5uZXJIVE1MOiAnPHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+PC9zcGFuPidcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgdm9sdW1lIGhhbmRsZSBjYW4gYmUgZHJhZ2dlZCB0byBhZGp1c3QgdGhlIHZvbHVtZSBsZXZlbFxyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxuIHZqcy5Wb2x1bWVIYW5kbGUgPSB2anMuU2xpZGVySGFuZGxlLmV4dGVuZCgpO1xyXG5cclxuIHZqcy5Wb2x1bWVIYW5kbGUucHJvdG90eXBlLmRlZmF1bHRWYWx1ZSA9ICcwMDowMCc7XHJcblxyXG4gLyoqIEBpbmhlcml0RG9jICovXHJcbiB2anMuVm9sdW1lSGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgIHJldHVybiB2anMuU2xpZGVySGFuZGxlLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICAgY2xhc3NOYW1lOiAndmpzLXZvbHVtZS1oYW5kbGUnXHJcbiAgIH0pO1xyXG4gfTtcclxuLyoqXHJcbiAqIEEgYnV0dG9uIGNvbXBvbmVudCBmb3IgbXV0aW5nIHRoZSBhdWRpb1xyXG4gKlxyXG4gKiBAcGFyYW0ge3Zqcy5QbGF5ZXJ8T2JqZWN0fSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk11dGVUb2dnbGUgPSB2anMuQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBwbGF5ZXIub24oJ3ZvbHVtZWNoYW5nZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlKSk7XHJcblxyXG4gICAgLy8gaGlkZSBtdXRlIHRvZ2dsZSBpZiB0aGUgY3VycmVudCB0ZWNoIGRvZXNuJ3Qgc3VwcG9ydCB2b2x1bWUgY29udHJvbFxyXG4gICAgaWYgKHBsYXllci50ZWNoICYmIHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgIH1cclxuICAgIHBsYXllci5vbignbG9hZHN0YXJ0JywgdmpzLmJpbmQodGhpcywgZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKHBsYXllci50ZWNoLmZlYXR1cmVzICYmIHBsYXllci50ZWNoLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgdGhpcy5hZGRDbGFzcygndmpzLWhpZGRlbicpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfVxyXG4gICAgfSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbXV0ZS1jb250cm9sIHZqcy1jb250cm9sJyxcclxuICAgIGlubmVySFRNTDogJzxkaXY+PHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+TXV0ZTwvc3Bhbj48L2Rpdj4nXHJcbiAgfSk7XHJcbn07XHJcblxyXG52anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXJfLm11dGVkKCB0aGlzLnBsYXllcl8ubXV0ZWQoKSA/IGZhbHNlIDogdHJ1ZSApO1xyXG59O1xyXG5cclxudmpzLk11dGVUb2dnbGUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHZvbCA9IHRoaXMucGxheWVyXy52b2x1bWUoKSxcclxuICAgICAgbGV2ZWwgPSAzO1xyXG5cclxuICBpZiAodm9sID09PSAwIHx8IHRoaXMucGxheWVyXy5tdXRlZCgpKSB7XHJcbiAgICBsZXZlbCA9IDA7XHJcbiAgfSBlbHNlIGlmICh2b2wgPCAwLjMzKSB7XHJcbiAgICBsZXZlbCA9IDE7XHJcbiAgfSBlbHNlIGlmICh2b2wgPCAwLjY3KSB7XHJcbiAgICBsZXZlbCA9IDI7XHJcbiAgfVxyXG5cclxuICAvLyBEb24ndCByZXdyaXRlIHRoZSBidXR0b24gdGV4dCBpZiB0aGUgYWN0dWFsIHRleHQgZG9lc24ndCBjaGFuZ2UuXHJcbiAgLy8gVGhpcyBjYXVzZXMgdW5uZWNlc3NhcnkgYW5kIGNvbmZ1c2luZyBpbmZvcm1hdGlvbiBmb3Igc2NyZWVuIHJlYWRlciB1c2Vycy5cclxuICAvLyBUaGlzIGNoZWNrIGlzIG5lZWRlZCBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gZ2V0cyBjYWxsZWQgZXZlcnkgdGltZSB0aGUgdm9sdW1lIGxldmVsIGlzIGNoYW5nZWQuXHJcbiAgaWYodGhpcy5wbGF5ZXJfLm11dGVkKCkpe1xyXG4gICAgICBpZih0aGlzLmVsXy5jaGlsZHJlblswXS5jaGlsZHJlblswXS5pbm5lckhUTUwhPSdVbm11dGUnKXtcclxuICAgICAgICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdVbm11dGUnOyAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0IHRvIFwiVW5tdXRlXCJcclxuICAgICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgIGlmKHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCE9J011dGUnKXtcclxuICAgICAgICAgIHRoaXMuZWxfLmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmlubmVySFRNTCA9ICdNdXRlJzsgLy8gY2hhbmdlIHRoZSBidXR0b24gdGV4dCB0byBcIk11dGVcIlxyXG4gICAgICB9XHJcbiAgfVxyXG5cclxuICAvKiBUT0RPIGltcHJvdmUgbXV0ZWQgaWNvbiBjbGFzc2VzICovXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgIHZqcy5yZW1vdmVDbGFzcyh0aGlzLmVsXywgJ3Zqcy12b2wtJytpKTtcclxuICB9XHJcbiAgdmpzLmFkZENsYXNzKHRoaXMuZWxfLCAndmpzLXZvbC0nK2xldmVsKTtcclxufTtcclxuLyoqXHJcbiAqIE1lbnUgYnV0dG9uIHdpdGggYSBwb3B1cCBmb3Igc2hvd2luZyB0aGUgdm9sdW1lIHNsaWRlci5cclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVm9sdW1lTWVudUJ1dHRvbiA9IHZqcy5NZW51QnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuTWVudUJ1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgLy8gU2FtZSBsaXN0ZW5lcnMgYXMgTXV0ZVRvZ2dsZVxyXG4gICAgcGxheWVyLm9uKCd2b2x1bWVjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG5cclxuICAgIC8vIGhpZGUgbXV0ZSB0b2dnbGUgaWYgdGhlIGN1cnJlbnQgdGVjaCBkb2Vzbid0IHN1cHBvcnQgdm9sdW1lIGNvbnRyb2xcclxuICAgIGlmIChwbGF5ZXIudGVjaCAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcy52b2x1bWVDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmFkZENsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICB9XHJcbiAgICBwbGF5ZXIub24oJ2xvYWRzdGFydCcsIHZqcy5iaW5kKHRoaXMsIGZ1bmN0aW9uKCl7XHJcbiAgICAgIGlmIChwbGF5ZXIudGVjaC5mZWF0dXJlcyAmJiBwbGF5ZXIudGVjaC5mZWF0dXJlcy52b2x1bWVDb250cm9sID09PSBmYWxzZSkge1xyXG4gICAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1oaWRkZW4nKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaGlkZGVuJyk7XHJcbiAgICAgIH1cclxuICAgIH0pKTtcclxuICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1tZW51LWJ1dHRvbicpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuVm9sdW1lTWVudUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlTWVudSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIG1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfLCB7XHJcbiAgICBjb250ZW50RWxUeXBlOiAnZGl2J1xyXG4gIH0pO1xyXG4gIHZhciB2YyA9IG5ldyB2anMuVm9sdW1lQmFyKHRoaXMucGxheWVyXywgdmpzLm9iai5tZXJnZSh7dmVydGljYWw6IHRydWV9LCB0aGlzLm9wdGlvbnNfLnZvbHVtZUJhcikpO1xyXG4gIG1lbnUuYWRkQ2hpbGQodmMpO1xyXG4gIHJldHVybiBtZW51O1xyXG59O1xyXG5cclxudmpzLlZvbHVtZU1lbnVCdXR0b24ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5NdXRlVG9nZ2xlLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XHJcbiAgdmpzLk1lbnVCdXR0b24ucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbnZqcy5Wb2x1bWVNZW51QnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5CdXR0b24ucHJvdG90eXBlLmNyZWF0ZUVsLmNhbGwodGhpcywgJ2RpdicsIHtcclxuICAgIGNsYXNzTmFtZTogJ3Zqcy12b2x1bWUtbWVudS1idXR0b24gdmpzLW1lbnUtYnV0dG9uIHZqcy1jb250cm9sJyxcclxuICAgIGlubmVySFRNTDogJzxkaXY+PHNwYW4gY2xhc3M9XCJ2anMtY29udHJvbC10ZXh0XCI+TXV0ZTwvc3Bhbj48L2Rpdj4nXHJcbiAgfSk7XHJcbn07XHJcbnZqcy5Wb2x1bWVNZW51QnV0dG9uLnByb3RvdHlwZS51cGRhdGUgPSB2anMuTXV0ZVRvZ2dsZS5wcm90b3R5cGUudXBkYXRlO1xyXG4vKiBQb3N0ZXIgSW1hZ2VcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIFRoZSBjb21wb25lbnQgdGhhdCBoYW5kbGVzIHNob3dpbmcgdGhlIHBvc3RlciBpbWFnZS5cclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5Qb3N0ZXJJbWFnZSA9IHZqcy5CdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5CdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIGlmICghcGxheWVyLnBvc3RlcigpIHx8ICFwbGF5ZXIuY29udHJvbHMoKSkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5ZXIub24oJ3BsYXknLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLlBvc3RlckltYWdlLnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGVsID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7XHJcbiAgICAgICAgY2xhc3NOYW1lOiAndmpzLXBvc3RlcicsXHJcblxyXG4gICAgICAgIC8vIERvbid0IHdhbnQgcG9zdGVyIHRvIGJlIHRhYmJhYmxlLlxyXG4gICAgICAgIHRhYkluZGV4OiAtMVxyXG4gICAgICB9KSxcclxuICAgICAgcG9zdGVyID0gdGhpcy5wbGF5ZXJfLnBvc3RlcigpO1xyXG5cclxuICBpZiAocG9zdGVyKSB7XHJcbiAgICBpZiAoJ2JhY2tncm91bmRTaXplJyBpbiBlbC5zdHlsZSkge1xyXG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSAndXJsKFwiJyArIHBvc3RlciArICdcIiknO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgZWwuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdpbWcnLCB7IHNyYzogcG9zdGVyIH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBlbDtcclxufTtcclxuXHJcbnZqcy5Qb3N0ZXJJbWFnZS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gT25seSBhY2NlcHQgY2xpY2tzIHdoZW4gY29udHJvbHMgYXJlIGVuYWJsZWRcclxuICBpZiAodGhpcy5wbGF5ZXIoKS5jb250cm9scygpKSB7XHJcbiAgICB0aGlzLnBsYXllcl8ucGxheSgpO1xyXG4gIH1cclxufTtcclxuLyogTG9hZGluZyBTcGlubmVyXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbi8qKlxyXG4gKiBMb2FkaW5nIHNwaW5uZXIgZm9yIHdhaXRpbmcgZXZlbnRzXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllclxyXG4gKiBAcGFyYW0ge09iamVjdD19IG9wdGlvbnNcclxuICogQGNsYXNzXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkxvYWRpbmdTcGlubmVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucyk7XHJcblxyXG4gICAgcGxheWVyLm9uKCdjYW5wbGF5JywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICBwbGF5ZXIub24oJ2NhbnBsYXl0aHJvdWdoJywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcbiAgICBwbGF5ZXIub24oJ3BsYXlpbmcnLCB2anMuYmluZCh0aGlzLCB0aGlzLmhpZGUpKTtcclxuICAgIHBsYXllci5vbignc2Vla2VkJywgdmpzLmJpbmQodGhpcywgdGhpcy5oaWRlKSk7XHJcblxyXG4gICAgcGxheWVyLm9uKCdzZWVraW5nJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XHJcblxyXG4gICAgLy8gaW4gc29tZSBicm93c2VycyBzZWVraW5nIGRvZXMgbm90IHRyaWdnZXIgdGhlICdwbGF5aW5nJyBldmVudCxcclxuICAgIC8vIHNvIHdlIGFsc28gbmVlZCB0byB0cmFwICdzZWVrZWQnIGlmIHdlIGFyZSBnb2luZyB0byBzZXQgYVxyXG4gICAgLy8gJ3NlZWtpbmcnIGV2ZW50XHJcbiAgICBwbGF5ZXIub24oJ3NlZWtlZCcsIHZqcy5iaW5kKHRoaXMsIHRoaXMuaGlkZSkpO1xyXG5cclxuICAgIHBsYXllci5vbignZXJyb3InLCB2anMuYmluZCh0aGlzLCB0aGlzLnNob3cpKTtcclxuXHJcbiAgICAvLyBOb3Qgc2hvd2luZyBzcGlubmVyIG9uIHN0YWxsZWQgYW55IG1vcmUuIEJyb3dzZXJzIG1heSBzdGFsbCBhbmQgdGhlbiBub3QgdHJpZ2dlciBhbnkgZXZlbnRzIHRoYXQgd291bGQgcmVtb3ZlIHRoZSBzcGlubmVyLlxyXG4gICAgLy8gQ2hlY2tlZCBpbiBDaHJvbWUgMTYgYW5kIFNhZmFyaSA1LjEuMi4gaHR0cDovL2hlbHAudmlkZW9qcy5jb20vZGlzY3Vzc2lvbnMvcHJvYmxlbXMvODgzLXdoeS1pcy10aGUtZG93bmxvYWQtcHJvZ3Jlc3Mtc2hvd2luZ1xyXG4gICAgLy8gcGxheWVyLm9uKCdzdGFsbGVkJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XHJcblxyXG4gICAgcGxheWVyLm9uKCd3YWl0aW5nJywgdmpzLmJpbmQodGhpcywgdGhpcy5zaG93KSk7XHJcbiAgfVxyXG59KTtcclxuXHJcbnZqcy5Mb2FkaW5nU3Bpbm5lci5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtbG9hZGluZy1zcGlubmVyJ1xyXG4gIH0pO1xyXG59O1xyXG4vKiBCaWcgUGxheSBCdXR0b25cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuLyoqXHJcbiAqIEluaXRpYWwgcGxheSBidXR0b24uIFNob3dzIGJlZm9yZSB0aGUgdmlkZW8gaGFzIHBsYXllZC4gVGhlIGhpZGluZyBvZiB0aGVcclxuICogYmlnIHBsYXkgYnV0dG9uIGlzIGRvbmUgdmlhIENTUyBhbmQgcGxheWVyIHN0YXRlcy5cclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY2xhc3NcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuQmlnUGxheUJ1dHRvbiA9IHZqcy5CdXR0b24uZXh0ZW5kKCk7XHJcblxyXG52anMuQmlnUGxheUJ1dHRvbi5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtYmlnLXBsYXktYnV0dG9uJyxcclxuICAgIGlubmVySFRNTDogJzxzcGFuIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj4nLFxyXG4gICAgJ2FyaWEtbGFiZWwnOiAncGxheSB2aWRlbydcclxuICB9KTtcclxufTtcclxuXHJcbnZqcy5CaWdQbGF5QnV0dG9uLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnBsYXllcl8ucGxheSgpO1xyXG59O1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBNZWRpYSBUZWNobm9sb2d5IENvbnRyb2xsZXIgLSBCYXNlIGNsYXNzIGZvciBtZWRpYSBwbGF5YmFja1xyXG4gKiB0ZWNobm9sb2d5IGNvbnRyb2xsZXJzIGxpa2UgRmxhc2ggYW5kIEhUTUw1XHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEJhc2UgY2xhc3MgZm9yIG1lZGlhIChIVE1MNSBWaWRlbywgRmxhc2gpIGNvbnRyb2xsZXJzXHJcbiAqIEBwYXJhbSB7dmpzLlBsYXllcnxPYmplY3R9IHBsYXllciAgQ2VudHJhbCBwbGF5ZXIgaW5zdGFuY2VcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zIE9wdGlvbnMgb2JqZWN0XHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLkNvbXBvbmVudC5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG5cclxuICAgIHRoaXMuaW5pdENvbnRyb2xzTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG59KTtcclxuXHJcbi8qKlxyXG4gKiBTZXQgdXAgY2xpY2sgYW5kIHRvdWNoIGxpc3RlbmVycyBmb3IgdGhlIHBsYXliYWNrIGVsZW1lbnRcclxuICogT24gZGVza3RvcHMsIGEgY2xpY2sgb24gdGhlIHZpZGVvIGl0c2VsZiB3aWxsIHRvZ2dsZSBwbGF5YmFjayxcclxuICogb24gYSBtb2JpbGUgZGV2aWNlIGEgY2xpY2sgb24gdGhlIHZpZGVvIHRvZ2dsZXMgY29udHJvbHMuXHJcbiAqICh0b2dnbGluZyBjb250cm9scyBpcyBkb25lIGJ5IHRvZ2dsaW5nIHRoZSB1c2VyIHN0YXRlIGJldHdlZW4gYWN0aXZlIGFuZFxyXG4gKiBpbmFjdGl2ZSlcclxuICpcclxuICogQSB0YXAgY2FuIHNpZ25hbCB0aGF0IGEgdXNlciBoYXMgYmVjb21lIGFjdGl2ZSwgb3IgaGFzIGJlY29tZSBpbmFjdGl2ZVxyXG4gKiBlLmcuIGEgcXVpY2sgdGFwIG9uIGFuIGlQaG9uZSBtb3ZpZSBzaG91bGQgcmV2ZWFsIHRoZSBjb250cm9scy4gQW5vdGhlclxyXG4gKiBxdWljayB0YXAgc2hvdWxkIGhpZGUgdGhlbSBhZ2FpbiAoc2lnbmFsaW5nIHRoZSB1c2VyIGlzIGluIGFuIGluYWN0aXZlXHJcbiAqIHZpZXdpbmcgc3RhdGUpXHJcbiAqXHJcbiAqIEluIGFkZGl0aW9uIHRvIHRoaXMsIHdlIHN0aWxsIHdhbnQgdGhlIHVzZXIgdG8gYmUgY29uc2lkZXJlZCBpbmFjdGl2ZSBhZnRlclxyXG4gKiBhIGZldyBzZWNvbmRzIG9mIGluYWN0aXZpdHkuXHJcbiAqXHJcbiAqIE5vdGU6IHRoZSBvbmx5IHBhcnQgb2YgaU9TIGludGVyYWN0aW9uIHdlIGNhbid0IG1pbWljIHdpdGggdGhpcyBzZXR1cFxyXG4gKiBpcyBhIHRvdWNoIGFuZCBob2xkIG9uIHRoZSB2aWRlbyBlbGVtZW50IGNvdW50aW5nIGFzIGFjdGl2aXR5IGluIG9yZGVyIHRvXHJcbiAqIGtlZXAgdGhlIGNvbnRyb2xzIHNob3dpbmcsIGJ1dCB0aGF0IHNob3VsZG4ndCBiZSBhbiBpc3N1ZS4gQSB0b3VjaCBhbmQgaG9sZCBvblxyXG4gKiBhbnkgY29udHJvbHMgd2lsbCBzdGlsbCBrZWVwIHRoZSB1c2VyIGFjdGl2ZVxyXG4gKi9cclxudmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlLmluaXRDb250cm9sc0xpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHBsYXllciwgdGVjaCwgYWN0aXZhdGVDb250cm9scywgZGVhY3RpdmF0ZUNvbnRyb2xzO1xyXG5cclxuICB0ZWNoID0gdGhpcztcclxuICBwbGF5ZXIgPSB0aGlzLnBsYXllcigpO1xyXG5cclxuICB2YXIgYWN0aXZhdGVDb250cm9scyA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZiAocGxheWVyLmNvbnRyb2xzKCkgJiYgIXBsYXllci51c2luZ05hdGl2ZUNvbnRyb2xzKCkpIHtcclxuICAgICAgdGVjaC5hZGRDb250cm9sc0xpc3RlbmVycygpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIGRlYWN0aXZhdGVDb250cm9scyA9IHZqcy5iaW5kKHRlY2gsIHRlY2gucmVtb3ZlQ29udHJvbHNMaXN0ZW5lcnMpO1xyXG5cclxuICAvLyBTZXQgdXAgZXZlbnQgbGlzdGVuZXJzIG9uY2UgdGhlIHRlY2ggaXMgcmVhZHkgYW5kIGhhcyBhbiBlbGVtZW50IHRvIGFwcGx5XHJcbiAgLy8gbGlzdGVuZXJzIHRvXHJcbiAgdGhpcy5yZWFkeShhY3RpdmF0ZUNvbnRyb2xzKTtcclxuICBwbGF5ZXIub24oJ2NvbnRyb2xzZW5hYmxlZCcsIGFjdGl2YXRlQ29udHJvbHMpO1xyXG4gIHBsYXllci5vbignY29udHJvbHNkaXNhYmxlZCcsIGRlYWN0aXZhdGVDb250cm9scyk7XHJcbn07XHJcblxyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUuYWRkQ29udHJvbHNMaXN0ZW5lcnMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBwcmV2ZW50QnViYmxlLCB1c2VyV2FzQWN0aXZlO1xyXG5cclxuICAvLyBTb21lIGJyb3dzZXJzIChDaHJvbWUgJiBJRSkgZG9uJ3QgdHJpZ2dlciBhIGNsaWNrIG9uIGEgZmxhc2ggc3dmLCBidXQgZG9cclxuICAvLyB0cmlnZ2VyIG1vdXNlZG93bi91cC5cclxuICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzE0NDQ1NjIvamF2YXNjcmlwdC1vbmNsaWNrLWV2ZW50LW92ZXItZmxhc2gtb2JqZWN0XHJcbiAgLy8gQW55IHRvdWNoIGV2ZW50cyBhcmUgc2V0IHRvIGJsb2NrIHRoZSBtb3VzZWRvd24gZXZlbnQgZnJvbSBoYXBwZW5pbmdcclxuICB0aGlzLm9uKCdtb3VzZWRvd24nLCB0aGlzLm9uQ2xpY2spO1xyXG5cclxuICAvLyBXZSBuZWVkIHRvIGJsb2NrIHRvdWNoIGV2ZW50cyBvbiB0aGUgdmlkZW8gZWxlbWVudCBmcm9tIGJ1YmJsaW5nIHVwLFxyXG4gIC8vIG90aGVyd2lzZSB0aGV5J2xsIHNpZ25hbCBhY3Rpdml0eSBwcmVtYXR1cmVseS4gVGhlIHNwZWNpZmljIHVzZSBjYXNlIGlzXHJcbiAgLy8gd2hlbiB0aGUgdmlkZW8gaXMgcGxheWluZyBhbmQgdGhlIGNvbnRyb2xzIGhhdmUgZmFkZWQgb3V0LiBJbiB0aGlzIGNhc2VcclxuICAvLyBvbmx5IGEgdGFwIChmYXN0IHRvdWNoKSBzaG91bGQgdG9nZ2xlIHRoZSB1c2VyIGFjdGl2ZSBzdGF0ZSBhbmQgdHVybiB0aGVcclxuICAvLyBjb250cm9scyBiYWNrIG9uLiBBIHRvdWNoIGFuZCBtb3ZlIG9yIHRvdWNoIGFuZCBob2xkIHNob3VsZCBub3QgdHJpZ2dlclxyXG4gIC8vIHRoZSBjb250cm9scyAocGVyIGlPUyBhcyBhbiBleGFtcGxlIGF0IGxlYXN0KVxyXG4gIC8vXHJcbiAgLy8gV2UgYWx3YXlzIHdhbnQgdG8gc3RvcCBwcm9wYWdhdGlvbiBvbiB0b3VjaHN0YXJ0IGJlY2F1c2UgdG91Y2hzdGFydFxyXG4gIC8vIGF0IHRoZSBwbGF5ZXIgbGV2ZWwgc3RhcnRzIHRoZSB0b3VjaEluUHJvZ3Jlc3MgaW50ZXJ2YWwuIFdlIGNhbiBzdGlsbFxyXG4gIC8vIHJlcG9ydCBhY3Rpdml0eSBvbiB0aGUgb3RoZXIgZXZlbnRzLCBidXQgd29uJ3QgbGV0IHRoZW0gYnViYmxlIGZvclxyXG4gIC8vIGNvbnNpc3RlbmN5LiBXZSBkb24ndCB3YW50IHRvIGJ1YmJsZSBhIHRvdWNoZW5kIHdpdGhvdXQgYSB0b3VjaHN0YXJ0LlxyXG4gIHRoaXMub24oJ3RvdWNoc3RhcnQnLCBmdW5jdGlvbihldmVudCkge1xyXG4gICAgLy8gU3RvcCB0aGUgbW91c2UgZXZlbnRzIGZyb20gYWxzbyBoYXBwZW5pbmdcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIC8vIFJlY29yZCBpZiB0aGUgdXNlciB3YXMgYWN0aXZlIG5vdyBzbyB3ZSBkb24ndCBoYXZlIHRvIGtlZXAgcG9sbGluZyBpdFxyXG4gICAgdXNlcldhc0FjdGl2ZSA9IHRoaXMucGxheWVyXy51c2VyQWN0aXZlKCk7XHJcbiAgfSk7XHJcblxyXG4gIHByZXZlbnRCdWJibGUgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGlmICh1c2VyV2FzQWN0aXZlKSB7XHJcbiAgICAgIHRoaXMucGxheWVyXy5yZXBvcnRVc2VyQWN0aXZpdHkoKTtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBUcmVhdCBhbGwgdG91Y2ggZXZlbnRzIHRoZSBzYW1lIGZvciBjb25zaXN0ZW5jeVxyXG4gIHRoaXMub24oJ3RvdWNobW92ZScsIHByZXZlbnRCdWJibGUpO1xyXG4gIHRoaXMub24oJ3RvdWNobGVhdmUnLCBwcmV2ZW50QnViYmxlKTtcclxuICB0aGlzLm9uKCd0b3VjaGNhbmNlbCcsIHByZXZlbnRCdWJibGUpO1xyXG4gIHRoaXMub24oJ3RvdWNoZW5kJywgcHJldmVudEJ1YmJsZSk7XHJcblxyXG4gIC8vIFR1cm4gb24gY29tcG9uZW50IHRhcCBldmVudHNcclxuICB0aGlzLmVtaXRUYXBFdmVudHMoKTtcclxuXHJcbiAgLy8gVGhlIHRhcCBsaXN0ZW5lciBuZWVkcyB0byBjb21lIGFmdGVyIHRoZSB0b3VjaGVuZCBsaXN0ZW5lciBiZWNhdXNlIHRoZSB0YXBcclxuICAvLyBsaXN0ZW5lciBjYW5jZWxzIG91dCBhbnkgcmVwb3J0ZWRVc2VyQWN0aXZpdHkgd2hlbiBzZXR0aW5nIHVzZXJBY3RpdmUoZmFsc2UpXHJcbiAgdGhpcy5vbigndGFwJywgdGhpcy5vblRhcCk7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBsaXN0ZW5lcnMgdXNlZCBmb3IgY2xpY2sgYW5kIHRhcCBjb250cm9scy4gVGhpcyBpcyBuZWVkZWQgZm9yXHJcbiAqIHRvZ2dsaW5nIHRvIGNvbnRyb2xzIGRpc2FibGVkLCB3aGVyZSBhIHRhcC90b3VjaCBzaG91bGQgZG8gbm90aGluZy5cclxuICovXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5yZW1vdmVDb250cm9sc0xpc3RlbmVycyA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gV2UgZG9uJ3Qgd2FudCB0byBqdXN0IHVzZSBgdGhpcy5vZmYoKWAgYmVjYXVzZSB0aGVyZSBtaWdodCBiZSBvdGhlciBuZWVkZWRcclxuICAvLyBsaXN0ZW5lcnMgYWRkZWQgYnkgdGVjaHMgdGhhdCBleHRlbmQgdGhpcy5cclxuICB0aGlzLm9mZigndGFwJyk7XHJcbiAgdGhpcy5vZmYoJ3RvdWNoc3RhcnQnKTtcclxuICB0aGlzLm9mZigndG91Y2htb3ZlJyk7XHJcbiAgdGhpcy5vZmYoJ3RvdWNobGVhdmUnKTtcclxuICB0aGlzLm9mZigndG91Y2hjYW5jZWwnKTtcclxuICB0aGlzLm9mZigndG91Y2hlbmQnKTtcclxuICB0aGlzLm9mZignY2xpY2snKTtcclxuICB0aGlzLm9mZignbW91c2Vkb3duJyk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlIGEgY2xpY2sgb24gdGhlIG1lZGlhIGVsZW1lbnQuIEJ5IGRlZmF1bHQgd2lsbCBwbGF5L3BhdXNlIHRoZSBtZWRpYS5cclxuICovXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIC8vIFdlJ3JlIHVzaW5nIG1vdXNlZG93biB0byBkZXRlY3QgY2xpY2tzIHRoYW5rcyB0byBGbGFzaCwgYnV0IG1vdXNlZG93blxyXG4gIC8vIHdpbGwgYWxzbyBiZSB0cmlnZ2VyZWQgd2l0aCByaWdodC1jbGlja3MsIHNvIHdlIG5lZWQgdG8gcHJldmVudCB0aGF0XHJcbiAgaWYgKGV2ZW50LmJ1dHRvbiAhPT0gMCkgcmV0dXJuO1xyXG5cclxuICAvLyBXaGVuIGNvbnRyb2xzIGFyZSBkaXNhYmxlZCBhIGNsaWNrIHNob3VsZCBub3QgdG9nZ2xlIHBsYXliYWNrIGJlY2F1c2VcclxuICAvLyB0aGUgY2xpY2sgaXMgY29uc2lkZXJlZCBhIGNvbnRyb2xcclxuICBpZiAodGhpcy5wbGF5ZXIoKS5jb250cm9scygpKSB7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXIoKS5wYXVzZWQoKSkge1xyXG4gICAgICB0aGlzLnBsYXllcigpLnBsYXkoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMucGxheWVyKCkucGF1c2UoKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vKipcclxuICogSGFuZGxlIGEgdGFwIG9uIHRoZSBtZWRpYSBlbGVtZW50LiBCeSBkZWZhdWx0IGl0IHdpbGwgdG9nZ2xlIHRoZSB1c2VyXHJcbiAqIGFjdGl2aXR5IHN0YXRlLCB3aGljaCBoaWRlcyBhbmQgc2hvd3MgdGhlIGNvbnRyb2xzLlxyXG4gKi9cclxuXHJcbnZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5vblRhcCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5wbGF5ZXIoKS51c2VyQWN0aXZlKCF0aGlzLnBsYXllcigpLnVzZXJBY3RpdmUoKSk7XHJcbn07XHJcblxyXG52anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUuZmVhdHVyZXMgPSB7XHJcbiAgJ3ZvbHVtZUNvbnRyb2wnOiB0cnVlLFxyXG5cclxuICAvLyBSZXNpemluZyBwbHVnaW5zIHVzaW5nIHJlcXVlc3QgZnVsbHNjcmVlbiByZWxvYWRzIHRoZSBwbHVnaW5cclxuICAnZnVsbHNjcmVlblJlc2l6ZSc6IGZhbHNlLFxyXG5cclxuICAvLyBPcHRpb25hbCBldmVudHMgdGhhdCB3ZSBjYW4gbWFudWFsbHkgbWltaWMgd2l0aCB0aW1lcnNcclxuICAvLyBjdXJyZW50bHkgbm90IHRyaWdnZXJlZCBieSB2aWRlby1qcy1zd2ZcclxuICAncHJvZ3Jlc3NFdmVudHMnOiBmYWxzZSxcclxuICAndGltZXVwZGF0ZUV2ZW50cyc6IGZhbHNlXHJcbn07XHJcblxyXG52anMubWVkaWEgPSB7fTtcclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGRlZmF1bHQgQVBJIG1ldGhvZHMgZm9yIGFueSBNZWRpYVRlY2hDb250cm9sbGVyXHJcbiAqIEB0eXBlIHtTdHJpbmd9XHJcbiAqL1xyXG52anMubWVkaWEuQXBpTWV0aG9kcyA9ICdwbGF5LHBhdXNlLHBhdXNlZCxjdXJyZW50VGltZSxzZXRDdXJyZW50VGltZSxkdXJhdGlvbixidWZmZXJlZCx2b2x1bWUsc2V0Vm9sdW1lLG11dGVkLHNldE11dGVkLHdpZHRoLGhlaWdodCxzdXBwb3J0c0Z1bGxTY3JlZW4sZW50ZXJGdWxsU2NyZWVuLHNyYyxsb2FkLGN1cnJlbnRTcmMscHJlbG9hZCxzZXRQcmVsb2FkLGF1dG9wbGF5LHNldEF1dG9wbGF5LGxvb3Asc2V0TG9vcCxlcnJvcixuZXR3b3JrU3RhdGUscmVhZHlTdGF0ZSxzZWVraW5nLGluaXRpYWxUaW1lLHN0YXJ0T2Zmc2V0VGltZSxwbGF5ZWQsc2Vla2FibGUsZW5kZWQsdmlkZW9UcmFja3MsYXVkaW9UcmFja3MsdmlkZW9XaWR0aCx2aWRlb0hlaWdodCx0ZXh0VHJhY2tzLGRlZmF1bHRQbGF5YmFja1JhdGUscGxheWJhY2tSYXRlLG1lZGlhR3JvdXAsY29udHJvbGxlcixjb250cm9scyxkZWZhdWx0TXV0ZWQnLnNwbGl0KCcsJyk7XHJcbi8vIENyZWF0ZSBwbGFjZWhvbGRlciBtZXRob2RzIGZvciBlYWNoIHRoYXQgd2FybiB3aGVuIGEgbWV0aG9kIGlzbid0IHN1cHBvcnRlZCBieSB0aGUgY3VycmVudCBwbGF5YmFjayB0ZWNobm9sb2d5XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVNZXRob2QobWV0aG9kTmFtZSl7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XHJcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBcIicrbWV0aG9kTmFtZSsnXCIgbWV0aG9kIGlzIG5vdCBhdmFpbGFibGUgb24gdGhlIHBsYXliYWNrIHRlY2hub2xvZ3lcXCdzIEFQSScpO1xyXG4gIH07XHJcbn1cclxuXHJcbmZvciAodmFyIGkgPSB2anMubWVkaWEuQXBpTWV0aG9kcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gIHZhciBtZXRob2ROYW1lID0gdmpzLm1lZGlhLkFwaU1ldGhvZHNbaV07XHJcbiAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIucHJvdG90eXBlW3Zqcy5tZWRpYS5BcGlNZXRob2RzW2ldXSA9IGNyZWF0ZU1ldGhvZChtZXRob2ROYW1lKTtcclxufVxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBIVE1MNSBNZWRpYSBDb250cm9sbGVyIC0gV3JhcHBlciBmb3IgSFRNTDUgTWVkaWEgQVBJXHJcbiAqL1xyXG5cclxuLyoqXHJcbiAqIEhUTUw1IE1lZGlhIENvbnRyb2xsZXIgLSBXcmFwcGVyIGZvciBIVE1MNSBNZWRpYSBBUElcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAcGFyYW0ge0Z1bmN0aW9uPX0gcmVhZHlcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuSHRtbDUgPSB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIC8vIHZvbHVtZSBjYW5ub3QgYmUgY2hhbmdlZCBmcm9tIDEgb24gaU9TXHJcbiAgICB0aGlzLmZlYXR1cmVzWyd2b2x1bWVDb250cm9sJ10gPSB2anMuSHRtbDUuY2FuQ29udHJvbFZvbHVtZSgpO1xyXG5cclxuICAgIC8vIEluIGlPUywgaWYgeW91IG1vdmUgYSB2aWRlbyBlbGVtZW50IGluIHRoZSBET00sIGl0IGJyZWFrcyB2aWRlbyBwbGF5YmFjay5cclxuICAgIHRoaXMuZmVhdHVyZXNbJ21vdmluZ01lZGlhRWxlbWVudEluRE9NJ10gPSAhdmpzLklTX0lPUztcclxuXHJcbiAgICAvLyBIVE1MIHZpZGVvIGlzIGFibGUgdG8gYXV0b21hdGljYWxseSByZXNpemUgd2hlbiBnb2luZyB0byBmdWxsc2NyZWVuXHJcbiAgICB0aGlzLmZlYXR1cmVzWydmdWxsc2NyZWVuUmVzaXplJ10gPSB0cnVlO1xyXG5cclxuICAgIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcblxyXG4gICAgdmFyIHNvdXJjZSA9IG9wdGlvbnNbJ3NvdXJjZSddO1xyXG5cclxuICAgIC8vIElmIHRoZSBlbGVtZW50IHNvdXJjZSBpcyBhbHJlYWR5IHNldCwgd2UgbWF5IGhhdmUgbWlzc2VkIHRoZSBsb2Fkc3RhcnQgZXZlbnQsIGFuZCB3YW50IHRvIHRyaWdnZXIgaXQuXHJcbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHNldCB0aGUgc291cmNlIGFnYWluIGFuZCBpbnRlcnJ1cHQgcGxheWJhY2suXHJcbiAgICBpZiAoc291cmNlICYmIHRoaXMuZWxfLmN1cnJlbnRTcmMgPT09IHNvdXJjZS5zcmMgJiYgdGhpcy5lbF8ubmV0d29ya1N0YXRlID4gMCkge1xyXG4gICAgICBwbGF5ZXIudHJpZ2dlcignbG9hZHN0YXJ0Jyk7XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlIHNldCB0aGUgc291cmNlIGlmIG9uZSB3YXMgcHJvdmlkZWQuXHJcbiAgICB9IGVsc2UgaWYgKHNvdXJjZSkge1xyXG4gICAgICB0aGlzLmVsXy5zcmMgPSBzb3VyY2Uuc3JjO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIERldGVybWluZSBpZiBuYXRpdmUgY29udHJvbHMgc2hvdWxkIGJlIHVzZWRcclxuICAgIC8vIE91ciBnb2FsIHNob3VsZCBiZSB0byBnZXQgdGhlIGN1c3RvbSBjb250cm9scyBvbiBtb2JpbGUgc29saWQgZXZlcnl3aGVyZVxyXG4gICAgLy8gc28gd2UgY2FuIHJlbW92ZSB0aGlzIGFsbCB0b2dldGhlci4gUmlnaHQgbm93IHRoaXMgd2lsbCBibG9jayBjdXN0b21cclxuICAgIC8vIGNvbnRyb2xzIG9uIHRvdWNoIGVuYWJsZWQgbGFwdG9wcyBsaWtlIHRoZSBDaHJvbWUgUGl4ZWxcclxuICAgIGlmICh2anMuVE9VQ0hfRU5BQkxFRCAmJiBwbGF5ZXIub3B0aW9ucygpWyduYXRpdmVDb250cm9sc0ZvclRvdWNoJ10gIT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMudXNlTmF0aXZlQ29udHJvbHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaHJvbWUgYW5kIFNhZmFyaSBib3RoIGhhdmUgaXNzdWVzIHdpdGggYXV0b3BsYXkuXHJcbiAgICAvLyBJbiBTYWZhcmkgKDUuMS4xKSwgd2hlbiB3ZSBtb3ZlIHRoZSB2aWRlbyBlbGVtZW50IGludG8gdGhlIGNvbnRhaW5lciBkaXYsIGF1dG9wbGF5IGRvZXNuJ3Qgd29yay5cclxuICAgIC8vIEluIENocm9tZSAoMTUpLCBpZiB5b3UgaGF2ZSBhdXRvcGxheSArIGEgcG9zdGVyICsgbm8gY29udHJvbHMsIHRoZSB2aWRlbyBnZXRzIGhpZGRlbiAoYnV0IGF1ZGlvIHBsYXlzKVxyXG4gICAgLy8gVGhpcyBmaXhlcyBib3RoIGlzc3Vlcy4gTmVlZCB0byB3YWl0IGZvciBBUEksIHNvIGl0IHVwZGF0ZXMgZGlzcGxheXMgY29ycmVjdGx5XHJcbiAgICBwbGF5ZXIucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgaWYgKHRoaXMudGFnICYmIHRoaXMub3B0aW9uc19bJ2F1dG9wbGF5J10gJiYgdGhpcy5wYXVzZWQoKSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLnRhZ1sncG9zdGVyJ107IC8vIENocm9tZSBGaXguIEZpeGVkIGluIENocm9tZSB2MTYuXHJcbiAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHRoaXMuc2V0dXBUcmlnZ2VycygpO1xyXG4gICAgdGhpcy50cmlnZ2VyUmVhZHkoKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKXtcclxuICB2anMuTWVkaWFUZWNoQ29udHJvbGxlci5wcm90b3R5cGUuZGlzcG9zZS5jYWxsKHRoaXMpO1xyXG59O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5jcmVhdGVFbCA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHBsYXllciA9IHRoaXMucGxheWVyXyxcclxuICAgICAgLy8gSWYgcG9zc2libGUsIHJldXNlIG9yaWdpbmFsIHRhZyBmb3IgSFRNTDUgcGxheWJhY2sgdGVjaG5vbG9neSBlbGVtZW50XHJcbiAgICAgIGVsID0gcGxheWVyLnRhZyxcclxuICAgICAgbmV3RWwsXHJcbiAgICAgIGNsb25lO1xyXG5cclxuICAvLyBDaGVjayBpZiB0aGlzIGJyb3dzZXIgc3VwcG9ydHMgbW92aW5nIHRoZSBlbGVtZW50IGludG8gdGhlIGJveC5cclxuICAvLyBPbiB0aGUgaVBob25lIHZpZGVvIHdpbGwgYnJlYWsgaWYgeW91IG1vdmUgdGhlIGVsZW1lbnQsXHJcbiAgLy8gU28gd2UgaGF2ZSB0byBjcmVhdGUgYSBicmFuZCBuZXcgZWxlbWVudC5cclxuICBpZiAoIWVsIHx8IHRoaXMuZmVhdHVyZXNbJ21vdmluZ01lZGlhRWxlbWVudEluRE9NJ10gPT09IGZhbHNlKSB7XHJcblxyXG4gICAgLy8gSWYgdGhlIG9yaWdpbmFsIHRhZyBpcyBzdGlsbCB0aGVyZSwgY2xvbmUgYW5kIHJlbW92ZSBpdC5cclxuICAgIGlmIChlbCkge1xyXG4gICAgICBjbG9uZSA9IGVsLmNsb25lTm9kZShmYWxzZSk7XHJcbiAgICAgIHZqcy5IdG1sNS5kaXNwb3NlTWVkaWFFbGVtZW50KGVsKTtcclxuICAgICAgZWwgPSBjbG9uZTtcclxuICAgICAgcGxheWVyLnRhZyA9IG51bGw7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBlbCA9IHZqcy5jcmVhdGVFbCgndmlkZW8nLCB7XHJcbiAgICAgICAgaWQ6cGxheWVyLmlkKCkgKyAnX2h0bWw1X2FwaScsXHJcbiAgICAgICAgY2xhc3NOYW1lOid2anMtdGVjaCdcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAvLyBhc3NvY2lhdGUgdGhlIHBsYXllciB3aXRoIHRoZSBuZXcgdGFnXHJcbiAgICBlbFsncGxheWVyJ10gPSBwbGF5ZXI7XHJcblxyXG4gICAgdmpzLmluc2VydEZpcnN0KGVsLCBwbGF5ZXIuZWwoKSk7XHJcbiAgfVxyXG5cclxuICAvLyBVcGRhdGUgc3BlY2lmaWMgdGFnIHNldHRpbmdzLCBpbiBjYXNlIHRoZXkgd2VyZSBvdmVycmlkZGVuXHJcbiAgdmFyIGF0dHJzID0gWydhdXRvcGxheScsJ3ByZWxvYWQnLCdsb29wJywnbXV0ZWQnXTtcclxuICBmb3IgKHZhciBpID0gYXR0cnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcclxuICAgIHZhciBhdHRyID0gYXR0cnNbaV07XHJcbiAgICBpZiAocGxheWVyLm9wdGlvbnNfW2F0dHJdICE9PSBudWxsKSB7XHJcbiAgICAgIGVsW2F0dHJdID0gcGxheWVyLm9wdGlvbnNfW2F0dHJdO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGVsO1xyXG4gIC8vIGplbm5paXNhd2Vzb21lID0gdHJ1ZTtcclxufTtcclxuXHJcbi8vIE1ha2UgdmlkZW8gZXZlbnRzIHRyaWdnZXIgcGxheWVyIGV2ZW50c1xyXG4vLyBNYXkgc2VlbSB2ZXJib3NlIGhlcmUsIGJ1dCBtYWtlcyBvdGhlciBBUElzIHBvc3NpYmxlLlxyXG52anMuSHRtbDUucHJvdG90eXBlLnNldHVwVHJpZ2dlcnMgPSBmdW5jdGlvbigpe1xyXG4gIGZvciAodmFyIGkgPSB2anMuSHRtbDUuRXZlbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICB2anMub24odGhpcy5lbF8sIHZqcy5IdG1sNS5FdmVudHNbaV0sIHZqcy5iaW5kKHRoaXMucGxheWVyXywgdGhpcy5ldmVudEhhbmRsZXIpKTtcclxuICB9XHJcbn07XHJcbi8vIFRyaWdnZXJzIHJlbW92ZWQgdXNpbmcgdGhpcy5vZmYgd2hlbiBkaXNwb3NlZFxyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5ldmVudEhhbmRsZXIgPSBmdW5jdGlvbihlKXtcclxuICB0aGlzLnRyaWdnZXIoZSk7XHJcblxyXG4gIC8vIE5vIG5lZWQgZm9yIG1lZGlhIGV2ZW50cyB0byBidWJibGUgdXAuXHJcbiAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxufTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUudXNlTmF0aXZlQ29udHJvbHMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB0ZWNoLCBwbGF5ZXIsIGNvbnRyb2xzT24sIGNvbnRyb2xzT2ZmLCBjbGVhblVwO1xyXG5cclxuICB0ZWNoID0gdGhpcztcclxuICBwbGF5ZXIgPSB0aGlzLnBsYXllcigpO1xyXG5cclxuICAvLyBJZiB0aGUgcGxheWVyIGNvbnRyb2xzIGFyZSBlbmFibGVkIHR1cm4gb24gdGhlIG5hdGl2ZSBjb250cm9sc1xyXG4gIHRlY2guc2V0Q29udHJvbHMocGxheWVyLmNvbnRyb2xzKCkpO1xyXG5cclxuICAvLyBVcGRhdGUgdGhlIG5hdGl2ZSBjb250cm9scyB3aGVuIHBsYXllciBjb250cm9scyBzdGF0ZSBpcyB1cGRhdGVkXHJcbiAgY29udHJvbHNPbiA9IGZ1bmN0aW9uKCl7XHJcbiAgICB0ZWNoLnNldENvbnRyb2xzKHRydWUpO1xyXG4gIH07XHJcbiAgY29udHJvbHNPZmYgPSBmdW5jdGlvbigpe1xyXG4gICAgdGVjaC5zZXRDb250cm9scyhmYWxzZSk7XHJcbiAgfTtcclxuICBwbGF5ZXIub24oJ2NvbnRyb2xzZW5hYmxlZCcsIGNvbnRyb2xzT24pO1xyXG4gIHBsYXllci5vbignY29udHJvbHNkaXNhYmxlZCcsIGNvbnRyb2xzT2ZmKTtcclxuXHJcbiAgLy8gQ2xlYW4gdXAgd2hlbiBub3QgdXNpbmcgbmF0aXZlIGNvbnRyb2xzIGFueW1vcmVcclxuICBjbGVhblVwID0gZnVuY3Rpb24oKXtcclxuICAgIHBsYXllci5vZmYoJ2NvbnRyb2xzZW5hYmxlZCcsIGNvbnRyb2xzT24pO1xyXG4gICAgcGxheWVyLm9mZignY29udHJvbHNkaXNhYmxlZCcsIGNvbnRyb2xzT2ZmKTtcclxuICB9O1xyXG4gIHRlY2gub24oJ2Rpc3Bvc2UnLCBjbGVhblVwKTtcclxuICBwbGF5ZXIub24oJ3VzaW5nY3VzdG9tY29udHJvbHMnLCBjbGVhblVwKTtcclxuXHJcbiAgLy8gVXBkYXRlIHRoZSBzdGF0ZSBvZiB0aGUgcGxheWVyIHRvIHVzaW5nIG5hdGl2ZSBjb250cm9sc1xyXG4gIHBsYXllci51c2luZ05hdGl2ZUNvbnRyb2xzKHRydWUpO1xyXG59O1xyXG5cclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUucGxheSA9IGZ1bmN0aW9uKCl7IHRoaXMuZWxfLnBsYXkoKTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCl7IHRoaXMuZWxfLnBhdXNlKCk7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUucGF1c2VkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnBhdXNlZDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuY3VycmVudFRpbWUgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uY3VycmVudFRpbWU7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0Q3VycmVudFRpbWUgPSBmdW5jdGlvbihzZWNvbmRzKXtcclxuICB0cnkge1xyXG4gICAgdGhpcy5lbF8uY3VycmVudFRpbWUgPSBzZWNvbmRzO1xyXG4gIH0gY2F0Y2goZSkge1xyXG4gICAgdmpzLmxvZyhlLCAnVmlkZW8gaXMgbm90IHJlYWR5LiAoVmlkZW8uanMpJyk7XHJcbiAgICAvLyB0aGlzLndhcm5pbmcoVmlkZW9KUy53YXJuaW5ncy52aWRlb05vdFJlYWR5KTtcclxuICB9XHJcbn07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLmR1cmF0aW9uID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmR1cmF0aW9uIHx8IDA7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuYnVmZmVyZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uYnVmZmVyZWQ7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLnZvbHVtZSA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy52b2x1bWU7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0Vm9sdW1lID0gZnVuY3Rpb24ocGVyY2VudEFzRGVjaW1hbCl7IHRoaXMuZWxfLnZvbHVtZSA9IHBlcmNlbnRBc0RlY2ltYWw7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUubXV0ZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ubXV0ZWQ7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0TXV0ZWQgPSBmdW5jdGlvbihtdXRlZCl7IHRoaXMuZWxfLm11dGVkID0gbXV0ZWQ7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLndpZHRoID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLm9mZnNldFdpZHRoOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLmhlaWdodCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5vZmZzZXRIZWlnaHQ7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLnN1cHBvcnRzRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHR5cGVvZiB0aGlzLmVsXy53ZWJraXRFbnRlckZ1bGxTY3JlZW4gPT0gJ2Z1bmN0aW9uJykge1xyXG5cclxuICAgIC8vIFNlZW1zIHRvIGJlIGJyb2tlbiBpbiBDaHJvbWl1bS9DaHJvbWUgJiYgU2FmYXJpIGluIExlb3BhcmRcclxuICAgIGlmICgvQW5kcm9pZC8udGVzdCh2anMuVVNFUl9BR0VOVCkgfHwgIS9DaHJvbWV8TWFjIE9TIFggMTAuNS8udGVzdCh2anMuVVNFUl9BR0VOVCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBmYWxzZTtcclxufTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZW50ZXJGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdmlkZW8gPSB0aGlzLmVsXztcclxuICBpZiAodmlkZW8ucGF1c2VkICYmIHZpZGVvLm5ldHdvcmtTdGF0ZSA8PSB2aWRlby5IQVZFX01FVEFEQVRBKSB7XHJcbiAgICAvLyBhdHRlbXB0IHRvIHByaW1lIHRoZSB2aWRlbyBlbGVtZW50IGZvciBwcm9ncmFtbWF0aWMgYWNjZXNzXHJcbiAgICAvLyB0aGlzIGlzbid0IG5lY2Vzc2FyeSBvbiB0aGUgZGVza3RvcCBidXQgc2hvdWxkbid0IGh1cnRcclxuICAgIHRoaXMuZWxfLnBsYXkoKTtcclxuXHJcbiAgICAvLyBwbGF5aW5nIGFuZCBwYXVzaW5nIHN5bmNocm9ub3VzbHkgZHVyaW5nIHRoZSB0cmFuc2l0aW9uIHRvIGZ1bGxzY3JlZW5cclxuICAgIC8vIGNhbiBnZXQgaU9TIH42LjEgZGV2aWNlcyBpbnRvIGEgcGxheS9wYXVzZSBsb29wXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgIHZpZGVvLndlYmtpdEVudGVyRnVsbFNjcmVlbigpO1xyXG4gICAgfSwgMCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIHZpZGVvLndlYmtpdEVudGVyRnVsbFNjcmVlbigpO1xyXG4gIH1cclxufTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5leGl0RnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8ud2Via2l0RXhpdEZ1bGxTY3JlZW4oKTtcclxufTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbihzcmMpeyB0aGlzLmVsXy5zcmMgPSBzcmM7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7IHRoaXMuZWxfLmxvYWQoKTsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5jdXJyZW50U3JjID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmN1cnJlbnRTcmM7IH07XHJcblxyXG52anMuSHRtbDUucHJvdG90eXBlLnByZWxvYWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8ucHJlbG9hZDsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRQcmVsb2FkID0gZnVuY3Rpb24odmFsKXsgdGhpcy5lbF8ucHJlbG9hZCA9IHZhbDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuYXV0b3BsYXkgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uYXV0b3BsYXk7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuc2V0QXV0b3BsYXkgPSBmdW5jdGlvbih2YWwpeyB0aGlzLmVsXy5hdXRvcGxheSA9IHZhbDsgfTtcclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuY29udHJvbHMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uY29udHJvbHM7IH1cclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZXRDb250cm9scyA9IGZ1bmN0aW9uKHZhbCl7IHRoaXMuZWxfLmNvbnRyb2xzID0gISF2YWw7IH1cclxuXHJcbnZqcy5IdG1sNS5wcm90b3R5cGUubG9vcCA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5sb29wOyB9O1xyXG52anMuSHRtbDUucHJvdG90eXBlLnNldExvb3AgPSBmdW5jdGlvbih2YWwpeyB0aGlzLmVsXy5sb29wID0gdmFsOyB9O1xyXG5cclxudmpzLkh0bWw1LnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy5lcnJvcjsgfTtcclxudmpzLkh0bWw1LnByb3RvdHlwZS5zZWVraW5nID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLnNlZWtpbmc7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZW5kZWQgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpcy5lbF8uZW5kZWQ7IH07XHJcbnZqcy5IdG1sNS5wcm90b3R5cGUuZGVmYXVsdE11dGVkID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXMuZWxfLmRlZmF1bHRNdXRlZDsgfTtcclxuXHJcbi8qIEhUTUw1IFN1cHBvcnQgVGVzdGluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXHJcblxyXG52anMuSHRtbDUuaXNTdXBwb3J0ZWQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiAhIXZqcy5URVNUX1ZJRC5jYW5QbGF5VHlwZTtcclxufTtcclxuXHJcbnZqcy5IdG1sNS5jYW5QbGF5U291cmNlID0gZnVuY3Rpb24oc3JjT2JqKXtcclxuICAvLyBJRTkgb24gV2luZG93cyA3IHdpdGhvdXQgTWVkaWFQbGF5ZXIgdGhyb3dzIGFuIGVycm9yIGhlcmVcclxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vdmlkZW9qcy92aWRlby5qcy9pc3N1ZXMvNTE5XHJcbiAgdHJ5IHtcclxuICAgIHJldHVybiAhIXZqcy5URVNUX1ZJRC5jYW5QbGF5VHlwZShzcmNPYmoudHlwZSk7XHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfVxyXG4gIC8vIFRPRE86IENoZWNrIFR5cGVcclxuICAvLyBJZiBubyBUeXBlLCBjaGVjayBleHRcclxuICAvLyBDaGVjayBNZWRpYSBUeXBlXHJcbn07XHJcblxyXG52anMuSHRtbDUuY2FuQ29udHJvbFZvbHVtZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIHZvbHVtZSA9ICB2anMuVEVTVF9WSUQudm9sdW1lO1xyXG4gIHZqcy5URVNUX1ZJRC52b2x1bWUgPSAodm9sdW1lIC8gMikgKyAwLjE7XHJcbiAgcmV0dXJuIHZvbHVtZSAhPT0gdmpzLlRFU1RfVklELnZvbHVtZTtcclxufTtcclxuXHJcbi8vIExpc3Qgb2YgYWxsIEhUTUw1IGV2ZW50cyAodmFyaW91cyB1c2VzKS5cclxudmpzLkh0bWw1LkV2ZW50cyA9ICdsb2Fkc3RhcnQsc3VzcGVuZCxhYm9ydCxlcnJvcixlbXB0aWVkLHN0YWxsZWQsbG9hZGVkbWV0YWRhdGEsbG9hZGVkZGF0YSxjYW5wbGF5LGNhbnBsYXl0aHJvdWdoLHBsYXlpbmcsd2FpdGluZyxzZWVraW5nLHNlZWtlZCxlbmRlZCxkdXJhdGlvbmNoYW5nZSx0aW1ldXBkYXRlLHByb2dyZXNzLHBsYXkscGF1c2UscmF0ZWNoYW5nZSx2b2x1bWVjaGFuZ2UnLnNwbGl0KCcsJyk7XHJcblxyXG52anMuSHRtbDUuZGlzcG9zZU1lZGlhRWxlbWVudCA9IGZ1bmN0aW9uKGVsKXtcclxuICBpZiAoIWVsKSB7IHJldHVybjsgfVxyXG5cclxuICBlbFsncGxheWVyJ10gPSBudWxsO1xyXG5cclxuICBpZiAoZWwucGFyZW50Tm9kZSkge1xyXG4gICAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XHJcbiAgfVxyXG5cclxuICAvLyByZW1vdmUgYW55IGNoaWxkIHRyYWNrIG9yIHNvdXJjZSBub2RlcyB0byBwcmV2ZW50IHRoZWlyIGxvYWRpbmdcclxuICB3aGlsZShlbC5oYXNDaGlsZE5vZGVzKCkpIHtcclxuICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIGFueSBzcmMgcmVmZXJlbmNlLiBub3Qgc2V0dGluZyBgc3JjPScnYCBiZWNhdXNlIHRoYXQgY2F1c2VzIGEgd2FybmluZ1xyXG4gIC8vIGluIGZpcmVmb3hcclxuICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpO1xyXG5cclxuICAvLyBmb3JjZSB0aGUgbWVkaWEgZWxlbWVudCB0byB1cGRhdGUgaXRzIGxvYWRpbmcgc3RhdGUgYnkgY2FsbGluZyBsb2FkKClcclxuICBpZiAodHlwZW9mIGVsLmxvYWQgPT09ICdmdW5jdGlvbicpIHtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9XHJcbn07XHJcblxyXG4vLyBIVE1MNSBGZWF0dXJlIGRldGVjdGlvbiBhbmQgRGV2aWNlIEZpeGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xyXG5cclxuICAvLyBPdmVycmlkZSBBbmRyb2lkIDIuMiBhbmQgbGVzcyBjYW5QbGF5VHlwZSBtZXRob2Qgd2hpY2ggaXMgYnJva2VuXHJcbmlmICh2anMuSVNfT0xEX0FORFJPSUQpIHtcclxuICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpLmNvbnN0cnVjdG9yLnByb3RvdHlwZS5jYW5QbGF5VHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xyXG4gICAgcmV0dXJuICh0eXBlICYmIHR5cGUudG9Mb3dlckNhc2UoKS5pbmRleE9mKCd2aWRlby9tcDQnKSAhPSAtMSkgPyAnbWF5YmUnIDogJyc7XHJcbiAgfTtcclxufVxyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBWaWRlb0pTLVNXRiAtIEN1c3RvbSBGbGFzaCBQbGF5ZXIgd2l0aCBIVE1MNS1pc2ggQVBJXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5jb2Rlci92aWRlby1qcy1zd2ZcclxuICogTm90IHVzaW5nIHNldHVwVHJpZ2dlcnMuIFVzaW5nIGdsb2JhbCBvbkV2ZW50IGZ1bmMgdG8gZGlzdHJpYnV0ZSBldmVudHNcclxuICovXHJcblxyXG4vKipcclxuICogRmxhc2ggTWVkaWEgQ29udHJvbGxlciAtIFdyYXBwZXIgZm9yIGZhbGxiYWNrIFNXRiBBUElcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfSBwbGF5ZXJcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zXHJcbiAqIEBwYXJhbSB7RnVuY3Rpb249fSByZWFkeVxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5GbGFzaCA9IHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLk1lZGlhVGVjaENvbnRyb2xsZXIuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICB2YXIgc291cmNlID0gb3B0aW9uc1snc291cmNlJ10sXHJcblxyXG4gICAgICAgIC8vIFdoaWNoIGVsZW1lbnQgdG8gZW1iZWQgaW5cclxuICAgICAgICBwYXJlbnRFbCA9IG9wdGlvbnNbJ3BhcmVudEVsJ10sXHJcblxyXG4gICAgICAgIC8vIENyZWF0ZSBhIHRlbXBvcmFyeSBlbGVtZW50IHRvIGJlIHJlcGxhY2VkIGJ5IHN3ZiBvYmplY3RcclxuICAgICAgICBwbGFjZUhvbGRlciA9IHRoaXMuZWxfID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7IGlkOiBwbGF5ZXIuaWQoKSArICdfdGVtcF9mbGFzaCcgfSksXHJcblxyXG4gICAgICAgIC8vIEdlbmVyYXRlIElEIGZvciBzd2Ygb2JqZWN0XHJcbiAgICAgICAgb2JqSWQgPSBwbGF5ZXIuaWQoKSsnX2ZsYXNoX2FwaScsXHJcblxyXG4gICAgICAgIC8vIFN0b3JlIHBsYXllciBvcHRpb25zIGluIGxvY2FsIHZhciBmb3Igb3B0aW1pemF0aW9uXHJcbiAgICAgICAgLy8gVE9ETzogc3dpdGNoIHRvIHVzaW5nIHBsYXllciBtZXRob2RzIGluc3RlYWQgb2Ygb3B0aW9uc1xyXG4gICAgICAgIC8vIGUuZy4gcGxheWVyLmF1dG9wbGF5KCk7XHJcbiAgICAgICAgcGxheWVyT3B0aW9ucyA9IHBsYXllci5vcHRpb25zXyxcclxuXHJcbiAgICAgICAgLy8gTWVyZ2UgZGVmYXVsdCBmbGFzaHZhcnMgd2l0aCBvbmVzIHBhc3NlZCBpbiB0byBpbml0XHJcbiAgICAgICAgZmxhc2hWYXJzID0gdmpzLm9iai5tZXJnZSh7XHJcblxyXG4gICAgICAgICAgLy8gU1dGIENhbGxiYWNrIEZ1bmN0aW9uc1xyXG4gICAgICAgICAgJ3JlYWR5RnVuY3Rpb24nOiAndmlkZW9qcy5GbGFzaC5vblJlYWR5JyxcclxuICAgICAgICAgICdldmVudFByb3h5RnVuY3Rpb24nOiAndmlkZW9qcy5GbGFzaC5vbkV2ZW50JyxcclxuICAgICAgICAgICdlcnJvckV2ZW50UHJveHlGdW5jdGlvbic6ICd2aWRlb2pzLkZsYXNoLm9uRXJyb3InLFxyXG5cclxuICAgICAgICAgIC8vIFBsYXllciBTZXR0aW5nc1xyXG4gICAgICAgICAgJ2F1dG9wbGF5JzogcGxheWVyT3B0aW9ucy5hdXRvcGxheSxcclxuICAgICAgICAgICdwcmVsb2FkJzogcGxheWVyT3B0aW9ucy5wcmVsb2FkLFxyXG4gICAgICAgICAgJ2xvb3AnOiBwbGF5ZXJPcHRpb25zLmxvb3AsXHJcbiAgICAgICAgICAnbXV0ZWQnOiBwbGF5ZXJPcHRpb25zLm11dGVkXHJcblxyXG4gICAgICAgIH0sIG9wdGlvbnNbJ2ZsYXNoVmFycyddKSxcclxuXHJcbiAgICAgICAgLy8gTWVyZ2UgZGVmYXVsdCBwYXJhbWVzIHdpdGggb25lcyBwYXNzZWQgaW5cclxuICAgICAgICBwYXJhbXMgPSB2anMub2JqLm1lcmdlKHtcclxuICAgICAgICAgICd3bW9kZSc6ICdvcGFxdWUnLCAvLyBPcGFxdWUgaXMgbmVlZGVkIHRvIG92ZXJsYXkgY29udHJvbHMsIGJ1dCBjYW4gYWZmZWN0IHBsYXliYWNrIHBlcmZvcm1hbmNlXHJcbiAgICAgICAgICAnYmdjb2xvcic6ICcjMDAwMDAwJyAvLyBVc2luZyBiZ2NvbG9yIHByZXZlbnRzIGEgd2hpdGUgZmxhc2ggd2hlbiB0aGUgb2JqZWN0IGlzIGxvYWRpbmdcclxuICAgICAgICB9LCBvcHRpb25zWydwYXJhbXMnXSksXHJcblxyXG4gICAgICAgIC8vIE1lcmdlIGRlZmF1bHQgYXR0cmlidXRlcyB3aXRoIG9uZXMgcGFzc2VkIGluXHJcbiAgICAgICAgYXR0cmlidXRlcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgICAgICAgJ2lkJzogb2JqSWQsXHJcbiAgICAgICAgICAnbmFtZSc6IG9iaklkLCAvLyBCb3RoIElEIGFuZCBOYW1lIG5lZWRlZCBvciBzd2YgdG8gaWRlbnRpZnR5IGl0c2VsZlxyXG4gICAgICAgICAgJ2NsYXNzJzogJ3Zqcy10ZWNoJ1xyXG4gICAgICAgIH0sIG9wdGlvbnNbJ2F0dHJpYnV0ZXMnXSlcclxuICAgIDtcclxuXHJcbiAgICAvLyBJZiBzb3VyY2Ugd2FzIHN1cHBsaWVkIHBhc3MgYXMgYSBmbGFzaCB2YXIuXHJcbiAgICBpZiAoc291cmNlKSB7XHJcbiAgICAgIGlmIChzb3VyY2UudHlwZSAmJiB2anMuRmxhc2guaXNTdHJlYW1pbmdUeXBlKHNvdXJjZS50eXBlKSkge1xyXG4gICAgICAgIHZhciBwYXJ0cyA9IHZqcy5GbGFzaC5zdHJlYW1Ub1BhcnRzKHNvdXJjZS5zcmMpO1xyXG4gICAgICAgIGZsYXNoVmFyc1sncnRtcENvbm5lY3Rpb24nXSA9IGVuY29kZVVSSUNvbXBvbmVudChwYXJ0cy5jb25uZWN0aW9uKTtcclxuICAgICAgICBmbGFzaFZhcnNbJ3J0bXBTdHJlYW0nXSA9IGVuY29kZVVSSUNvbXBvbmVudChwYXJ0cy5zdHJlYW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIGZsYXNoVmFyc1snc3JjJ10gPSBlbmNvZGVVUklDb21wb25lbnQodmpzLmdldEFic29sdXRlVVJMKHNvdXJjZS5zcmMpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFkZCBwbGFjZWhvbGRlciB0byBwbGF5ZXIgZGl2XHJcbiAgICB2anMuaW5zZXJ0Rmlyc3QocGxhY2VIb2xkZXIsIHBhcmVudEVsKTtcclxuXHJcbiAgICAvLyBIYXZpbmcgaXNzdWVzIHdpdGggRmxhc2ggcmVsb2FkaW5nIG9uIGNlcnRhaW4gcGFnZSBhY3Rpb25zIChoaWRlL3Jlc2l6ZS9mdWxsc2NyZWVuKSBpbiBjZXJ0YWluIGJyb3dzZXJzXHJcbiAgICAvLyBUaGlzIGFsbG93cyByZXNldHRpbmcgdGhlIHBsYXloZWFkIHdoZW4gd2UgY2F0Y2ggdGhlIHJlbG9hZFxyXG4gICAgaWYgKG9wdGlvbnNbJ3N0YXJ0VGltZSddKSB7XHJcbiAgICAgIHRoaXMucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgICAgICB0aGlzLmxvYWQoKTtcclxuICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRUaW1lKG9wdGlvbnNbJ3N0YXJ0VGltZSddKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRmxhc2ggaUZyYW1lIE1vZGVcclxuICAgIC8vIEluIHdlYiBicm93c2VycyB0aGVyZSBhcmUgbXVsdGlwbGUgaW5zdGFuY2VzIHdoZXJlIGNoYW5naW5nIHRoZSBwYXJlbnQgZWxlbWVudCBvciB2aXNpYmlsaXR5IG9mIGEgcGx1Z2luIGNhdXNlcyB0aGUgcGx1Z2luIHRvIHJlbG9hZC5cclxuICAgIC8vIC0gRmlyZWZveCBqdXN0IGFib3V0IGFsd2F5cy4gaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9OTAyNjggKG1pZ2h0IGJlIGZpeGVkIGJ5IHZlcnNpb24gMTMpXHJcbiAgICAvLyAtIFdlYmtpdCB3aGVuIGhpZGluZyB0aGUgcGx1Z2luXHJcbiAgICAvLyAtIFdlYmtpdCBhbmQgRmlyZWZveCB3aGVuIHVzaW5nIHJlcXVlc3RGdWxsU2NyZWVuIG9uIGEgcGFyZW50IGVsZW1lbnRcclxuICAgIC8vIExvYWRpbmcgdGhlIGZsYXNoIHBsdWdpbiBpbnRvIGEgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGlGcmFtZSBnZXRzIGFyb3VuZCBtb3N0IG9mIHRoZXNlIGlzc3Vlcy5cclxuICAgIC8vIElzc3VlcyB0aGF0IHJlbWFpbiBpbmNsdWRlIGhpZGluZyB0aGUgZWxlbWVudCBhbmQgcmVxdWVzdEZ1bGxTY3JlZW4gaW4gRmlyZWZveCBzcGVjaWZpY2FsbHlcclxuXHJcbiAgICAvLyBUaGVyZSdzIG9uIHBhcnRpY3VsYXJseSBhbm5veWluZyBpc3N1ZSB3aXRoIHRoaXMgbWV0aG9kIHdoaWNoIGlzIHRoYXQgRmlyZWZveCB0aHJvd3MgYSBzZWN1cml0eSBlcnJvciBvbiBhbiBvZmZzaXRlIEZsYXNoIG9iamVjdCBsb2FkZWQgaW50byBhIGR5bmFtaWNhbGx5IGNyZWF0ZWQgaUZyYW1lLlxyXG4gICAgLy8gRXZlbiB0aG91Z2ggdGhlIGlmcmFtZSB3YXMgaW5zZXJ0ZWQgaW50byBhIHBhZ2Ugb24gdGhlIHdlYiwgRmlyZWZveCArIEZsYXNoIGNvbnNpZGVycyBpdCBhIGxvY2FsIGFwcCB0cnlpbmcgdG8gYWNjZXNzIGFuIGludGVybmV0IGZpbGUuXHJcbiAgICAvLyBJIHRyaWVkIG11bGl0cGxlIHdheXMgb2Ygc2V0dGluZyB0aGUgaWZyYW1lIHNyYyBhdHRyaWJ1dGUgYnV0IGNvdWxkbid0IGZpbmQgYSBzcmMgdGhhdCB3b3JrZWQgd2VsbC4gVHJpZWQgYSByZWFsL2Zha2Ugc291cmNlLCBpbi9vdXQgb2YgZG9tYWluLlxyXG4gICAgLy8gQWxzbyB0cmllZCBhIG1ldGhvZCBmcm9tIHN0YWNrb3ZlcmZsb3cgdGhhdCBjYXVzZWQgYSBzZWN1cml0eSBlcnJvciBpbiBhbGwgYnJvd3NlcnMuIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMjQ4NjkwMS9ob3ctdG8tc2V0LWRvY3VtZW50LWRvbWFpbi1mb3ItYS1keW5hbWljYWxseS1nZW5lcmF0ZWQtaWZyYW1lXHJcbiAgICAvLyBJbiB0aGUgZW5kIHRoZSBzb2x1dGlvbiBJIGZvdW5kIHRvIHdvcmsgd2FzIHNldHRpbmcgdGhlIGlmcmFtZSB3aW5kb3cubG9jYXRpb24uaHJlZiByaWdodCBiZWZvcmUgZG9pbmcgYSBkb2N1bWVudC53cml0ZSBvZiB0aGUgRmxhc2ggb2JqZWN0LlxyXG4gICAgLy8gVGhlIG9ubHkgZG93bnNpZGUgb2YgdGhpcyBpdCBzZWVtcyB0byB0cmlnZ2VyIGFub3RoZXIgaHR0cCByZXF1ZXN0IHRvIHRoZSBvcmlnaW5hbCBwYWdlIChubyBtYXR0ZXIgd2hhdCdzIHB1dCBpbiB0aGUgaHJlZikuIE5vdCBzdXJlIHdoeSB0aGF0IGlzLlxyXG5cclxuICAgIC8vIE5PVEUgKDIwMTItMDEtMjkpOiBDYW5ub3QgZ2V0IEZpcmVmb3ggdG8gbG9hZCB0aGUgcmVtb3RlIGhvc3RlZCBTV0YgaW50byBhIGR5bmFtaWNhbGx5IGNyZWF0ZWQgaUZyYW1lXHJcbiAgICAvLyBGaXJlZm94IDkgdGhyb3dzIGEgc2VjdXJpdHkgZXJyb3IsIHVubGVlc3MgeW91IGNhbGwgbG9jYXRpb24uaHJlZiByaWdodCBiZWZvcmUgZG9jLndyaXRlLlxyXG4gICAgLy8gICAgTm90IHN1cmUgd2h5IHRoYXQgZXZlbiB3b3JrcywgYnV0IGl0IGNhdXNlcyB0aGUgYnJvd3NlciB0byBsb29rIGxpa2UgaXQncyBjb250aW51b3VzbHkgdHJ5aW5nIHRvIGxvYWQgdGhlIHBhZ2UuXHJcbiAgICAvLyBGaXJlZm94IDMuNiBrZWVwcyBjYWxsaW5nIHRoZSBpZnJhbWUgb25sb2FkIGZ1bmN0aW9uIGFueXRpbWUgSSB3cml0ZSB0byBpdCwgY2F1c2luZyBhbiBlbmRsZXNzIGxvb3AuXHJcblxyXG4gICAgaWYgKG9wdGlvbnNbJ2lGcmFtZU1vZGUnXSA9PT0gdHJ1ZSAmJiAhdmpzLklTX0ZJUkVGT1gpIHtcclxuXHJcbiAgICAgIC8vIENyZWF0ZSBpRnJhbWUgd2l0aCB2anMtdGVjaCBjbGFzcyBzbyBpdCdzIDEwMCUgd2lkdGgvaGVpZ2h0XHJcbiAgICAgIHZhciBpRnJtID0gdmpzLmNyZWF0ZUVsKCdpZnJhbWUnLCB7XHJcbiAgICAgICAgJ2lkJzogb2JqSWQgKyAnX2lmcmFtZScsXHJcbiAgICAgICAgJ25hbWUnOiBvYmpJZCArICdfaWZyYW1lJyxcclxuICAgICAgICAnY2xhc3NOYW1lJzogJ3Zqcy10ZWNoJyxcclxuICAgICAgICAnc2Nyb2xsaW5nJzogJ25vJyxcclxuICAgICAgICAnbWFyZ2luV2lkdGgnOiAwLFxyXG4gICAgICAgICdtYXJnaW5IZWlnaHQnOiAwLFxyXG4gICAgICAgICdmcmFtZUJvcmRlcic6IDBcclxuICAgICAgfSk7XHJcblxyXG4gICAgICAvLyBVcGRhdGUgcmVhZHkgZnVuY3Rpb24gbmFtZXMgaW4gZmxhc2ggdmFycyBmb3IgaWZyYW1lIHdpbmRvd1xyXG4gICAgICBmbGFzaFZhcnNbJ3JlYWR5RnVuY3Rpb24nXSA9ICdyZWFkeSc7XHJcbiAgICAgIGZsYXNoVmFyc1snZXZlbnRQcm94eUZ1bmN0aW9uJ10gPSAnZXZlbnRzJztcclxuICAgICAgZmxhc2hWYXJzWydlcnJvckV2ZW50UHJveHlGdW5jdGlvbiddID0gJ2Vycm9ycyc7XHJcblxyXG4gICAgICAvLyBUcmllZCBtdWx0aXBsZSBtZXRob2RzIHRvIGdldCB0aGlzIHRvIHdvcmsgaW4gYWxsIGJyb3dzZXJzXHJcblxyXG4gICAgICAvLyBUcmllZCBlbWJlZGRpbmcgdGhlIGZsYXNoIG9iamVjdCBpbiB0aGUgcGFnZSBmaXJzdCwgYW5kIHRoZW4gYWRkaW5nIGEgcGxhY2UgaG9sZGVyIHRvIHRoZSBpZnJhbWUsIHRoZW4gcmVwbGFjaW5nIHRoZSBwbGFjZWhvbGRlciB3aXRoIHRoZSBwYWdlIG9iamVjdC5cclxuICAgICAgLy8gVGhlIGdvYWwgaGVyZSB3YXMgdG8gdHJ5IHRvIGxvYWQgdGhlIHN3ZiBVUkwgaW4gdGhlIHBhcmVudCBwYWdlIGZpcnN0IGFuZCBob3BlIHRoYXQgZ290IGFyb3VuZCB0aGUgZmlyZWZveCBzZWN1cml0eSBlcnJvclxyXG4gICAgICAvLyB2YXIgbmV3T2JqID0gdmpzLkZsYXNoLmVtYmVkKG9wdGlvbnNbJ3N3ZiddLCBwbGFjZUhvbGRlciwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpO1xyXG4gICAgICAvLyAoaW4gb25sb2FkKVxyXG4gICAgICAvLyAgdmFyIHRlbXAgPSB2anMuY3JlYXRlRWwoJ2EnLCB7IGlkOidhc2RmJywgaW5uZXJIVE1MOiAnYXNkZicgfSApO1xyXG4gICAgICAvLyAgaURvYy5ib2R5LmFwcGVuZENoaWxkKHRlbXApO1xyXG5cclxuICAgICAgLy8gVHJpZWQgZW1iZWRkaW5nIHRoZSBmbGFzaCBvYmplY3QgdGhyb3VnaCBqYXZhc2NyaXB0IGluIHRoZSBpZnJhbWUgc291cmNlLlxyXG4gICAgICAvLyBUaGlzIHdvcmtzIGluIHdlYmtpdCBidXQgc3RpbGwgdHJpZ2dlcnMgdGhlIGZpcmVmb3ggc2VjdXJpdHkgZXJyb3JcclxuICAgICAgLy8gaUZybS5zcmMgPSAnamF2YXNjcmlwdDogZG9jdW1lbnQud3JpdGUoJ1wiK3Zqcy5GbGFzaC5nZXRFbWJlZENvZGUob3B0aW9uc1snc3dmJ10sIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKStcIicpO1wiO1xyXG5cclxuICAgICAgLy8gVHJpZWQgYW4gYWN0dWFsIGxvY2FsIGlmcmFtZSBqdXN0IHRvIG1ha2Ugc3VyZSB0aGF0IHdvcmtzLCBidXQgaXQga2lsbHMgdGhlIGVhc2luZXNzIG9mIHRoZSBDRE4gdmVyc2lvbiBpZiB5b3UgcmVxdWlyZSB0aGUgdXNlciB0byBob3N0IGFuIGlmcmFtZVxyXG4gICAgICAvLyBXZSBzaG91bGQgYWRkIGFuIG9wdGlvbiB0byBob3N0IHRoZSBpZnJhbWUgbG9jYWxseSB0aG91Z2gsIGJlY2F1c2UgaXQgY291bGQgaGVscCBhIGxvdCBvZiBpc3N1ZXMuXHJcbiAgICAgIC8vIGlGcm0uc3JjID0gXCJpZnJhbWUuaHRtbFwiO1xyXG5cclxuICAgICAgLy8gV2FpdCB1bnRpbCBpRnJhbWUgaGFzIGxvYWRlZCB0byB3cml0ZSBpbnRvIGl0LlxyXG4gICAgICB2anMub24oaUZybSwgJ2xvYWQnLCB2anMuYmluZCh0aGlzLCBmdW5jdGlvbigpe1xyXG5cclxuICAgICAgICB2YXIgaURvYyxcclxuICAgICAgICAgICAgaVdpbiA9IGlGcm0uY29udGVudFdpbmRvdztcclxuXHJcbiAgICAgICAgLy8gVGhlIG9uZSB3b3JraW5nIG1ldGhvZCBJIGZvdW5kIHdhcyB0byB1c2UgdGhlIGlmcmFtZSdzIGRvY3VtZW50LndyaXRlKCkgdG8gY3JlYXRlIHRoZSBzd2Ygb2JqZWN0XHJcbiAgICAgICAgLy8gVGhpcyBnb3QgYXJvdW5kIHRoZSBzZWN1cml0eSBpc3N1ZSBpbiBhbGwgYnJvd3NlcnMgZXhjZXB0IGZpcmVmb3guXHJcbiAgICAgICAgLy8gSSBkaWQgZmluZCBhIGhhY2sgd2hlcmUgaWYgSSBjYWxsIHRoZSBpZnJhbWUncyB3aW5kb3cubG9jYXRpb24uaHJlZj0nJywgaXQgd291bGQgZ2V0IGFyb3VuZCB0aGUgc2VjdXJpdHkgZXJyb3JcclxuICAgICAgICAvLyBIb3dldmVyLCB0aGUgbWFpbiBwYWdlIHdvdWxkIGxvb2sgbGlrZSBpdCB3YXMgbG9hZGluZyBpbmRlZmluaXRlbHkgKFVSTCBiYXIgbG9hZGluZyBzcGlubmVyIHdvdWxkIG5ldmVyIHN0b3ApXHJcbiAgICAgICAgLy8gUGx1cyBGaXJlZm94IDMuNiBkaWRuJ3Qgd29yayBubyBtYXR0ZXIgd2hhdCBJIHRyaWVkLlxyXG4gICAgICAgIC8vIGlmICh2anMuVVNFUl9BR0VOVC5tYXRjaCgnRmlyZWZveCcpKSB7XHJcbiAgICAgICAgLy8gICBpV2luLmxvY2F0aW9uLmhyZWYgPSAnJztcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgaUZyYW1lJ3MgZG9jdW1lbnQgZGVwZW5kaW5nIG9uIHdoYXQgdGhlIGJyb3dzZXIgc3VwcG9ydHNcclxuICAgICAgICBpRG9jID0gaUZybS5jb250ZW50RG9jdW1lbnQgPyBpRnJtLmNvbnRlbnREb2N1bWVudCA6IGlGcm0uY29udGVudFdpbmRvdy5kb2N1bWVudDtcclxuXHJcbiAgICAgICAgLy8gVHJpZWQgZW5zdXJpbmcgYm90aCBkb2N1bWVudCBkb21haW5zIHdlcmUgdGhlIHNhbWUsIGJ1dCB0aGV5IGFscmVhZHkgd2VyZSwgc28gdGhhdCB3YXNuJ3QgdGhlIGlzc3VlLlxyXG4gICAgICAgIC8vIEV2ZW4gdHJpZWQgYWRkaW5nIC8uIHRoYXQgd2FzIG1lbnRpb25lZCBpbiBhIGJyb3dzZXIgc2VjdXJpdHkgd3JpdGV1cFxyXG4gICAgICAgIC8vIGRvY3VtZW50LmRvbWFpbiA9IGRvY3VtZW50LmRvbWFpbisnLy4nO1xyXG4gICAgICAgIC8vIGlEb2MuZG9tYWluID0gZG9jdW1lbnQuZG9tYWluKycvLic7XHJcblxyXG4gICAgICAgIC8vIFRyaWVkIGFkZGluZyB0aGUgb2JqZWN0IHRvIHRoZSBpZnJhbWUgZG9jJ3MgaW5uZXJIVE1MLiBTZWN1cml0eSBlcnJvciBpbiBhbGwgYnJvd3NlcnMuXHJcbiAgICAgICAgLy8gaURvYy5ib2R5LmlubmVySFRNTCA9IHN3Zk9iamVjdEhUTUw7XHJcblxyXG4gICAgICAgIC8vIFRyaWVkIGFwcGVuZGluZyB0aGUgb2JqZWN0IHRvIHRoZSBpZnJhbWUgZG9jJ3MgYm9keS4gU2VjdXJpdHkgZXJyb3IgaW4gYWxsIGJyb3dzZXJzLlxyXG4gICAgICAgIC8vIGlEb2MuYm9keS5hcHBlbmRDaGlsZChzd2ZPYmplY3QpO1xyXG5cclxuICAgICAgICAvLyBVc2luZyBkb2N1bWVudC53cml0ZSBhY3R1YWxseSBnb3QgYXJvdW5kIHRoZSBzZWN1cml0eSBlcnJvciB0aGF0IGJyb3dzZXJzIHdlcmUgdGhyb3dpbmcuXHJcbiAgICAgICAgLy8gQWdhaW4sIGl0J3MgYSBkeW5hbWljYWxseSBnZW5lcmF0ZWQgKHNhbWUgZG9tYWluKSBpZnJhbWUsIGxvYWRpbmcgYW4gZXh0ZXJuYWwgRmxhc2ggc3dmLlxyXG4gICAgICAgIC8vIE5vdCBzdXJlIHdoeSB0aGF0J3MgYSBzZWN1cml0eSBpc3N1ZSwgYnV0IGFwcGFyZW50bHkgaXQgaXMuXHJcbiAgICAgICAgaURvYy53cml0ZSh2anMuRmxhc2guZ2V0RW1iZWRDb2RlKG9wdGlvbnNbJ3N3ZiddLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcykpO1xyXG5cclxuICAgICAgICAvLyBTZXR0aW5nIHZhcmlhYmxlcyBvbiB0aGUgd2luZG93IG5lZWRzIHRvIGNvbWUgYWZ0ZXIgdGhlIGRvYyB3cml0ZSBiZWNhdXNlIG90aGVyd2lzZSB0aGV5IGNhbiBnZXQgcmVzZXQgaW4gc29tZSBicm93c2Vyc1xyXG4gICAgICAgIC8vIFNvIGZhciBubyBpc3N1ZXMgd2l0aCBzd2YgcmVhZHkgZXZlbnQgYmVpbmcgY2FsbGVkIGJlZm9yZSBpdCdzIHNldCBvbiB0aGUgd2luZG93LlxyXG4gICAgICAgIGlXaW5bJ3BsYXllciddID0gdGhpcy5wbGF5ZXJfO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgc3dmIHJlYWR5IGZ1bmN0aW9uIGZvciBpRnJhbWUgd2luZG93XHJcbiAgICAgICAgaVdpblsncmVhZHknXSA9IHZqcy5iaW5kKHRoaXMucGxheWVyXywgZnVuY3Rpb24oY3VyclN3Zil7XHJcbiAgICAgICAgICB2YXIgZWwgPSBpRG9jLmdldEVsZW1lbnRCeUlkKGN1cnJTd2YpLFxyXG4gICAgICAgICAgICAgIHBsYXllciA9IHRoaXMsXHJcbiAgICAgICAgICAgICAgdGVjaCA9IHBsYXllci50ZWNoO1xyXG5cclxuICAgICAgICAgIC8vIFVwZGF0ZSByZWZlcmVuY2UgdG8gcGxheWJhY2sgdGVjaG5vbG9neSBlbGVtZW50XHJcbiAgICAgICAgICB0ZWNoLmVsXyA9IGVsO1xyXG5cclxuICAgICAgICAgIC8vIE1ha2Ugc3VyZSBzd2YgaXMgYWN0dWFsbHkgcmVhZHkuIFNvbWV0aW1lcyB0aGUgQVBJIGlzbid0IGFjdHVhbGx5IHlldC5cclxuICAgICAgICAgIHZqcy5GbGFzaC5jaGVja1JlYWR5KHRlY2gpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZXZlbnQgbGlzdGVuZXIgZm9yIGFsbCBzd2YgZXZlbnRzXHJcbiAgICAgICAgaVdpblsnZXZlbnRzJ10gPSB2anMuYmluZCh0aGlzLnBsYXllcl8sIGZ1bmN0aW9uKHN3ZklELCBldmVudE5hbWUpe1xyXG4gICAgICAgICAgdmFyIHBsYXllciA9IHRoaXM7XHJcbiAgICAgICAgICBpZiAocGxheWVyICYmIHBsYXllci50ZWNoTmFtZSA9PT0gJ2ZsYXNoJykge1xyXG4gICAgICAgICAgICBwbGF5ZXIudHJpZ2dlcihldmVudE5hbWUpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDcmVhdGUgZXJyb3IgbGlzdGVuZXIgZm9yIGFsbCBzd2YgZXJyb3JzXHJcbiAgICAgICAgaVdpblsnZXJyb3JzJ10gPSB2anMuYmluZCh0aGlzLnBsYXllcl8sIGZ1bmN0aW9uKHN3ZklELCBldmVudE5hbWUpe1xyXG4gICAgICAgICAgdmpzLmxvZygnRmxhc2ggRXJyb3InLCBldmVudE5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSkpO1xyXG5cclxuICAgICAgLy8gUmVwbGFjZSBwbGFjZWhvbGRlciB3aXRoIGlGcmFtZSAoaXQgd2lsbCBsb2FkIG5vdylcclxuICAgICAgcGxhY2VIb2xkZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQoaUZybSwgcGxhY2VIb2xkZXIpO1xyXG5cclxuICAgIC8vIElmIG5vdCB1c2luZyBpRnJhbWUgbW9kZSwgZW1iZWQgYXMgbm9ybWFsIG9iamVjdFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdmpzLkZsYXNoLmVtYmVkKG9wdGlvbnNbJ3N3ZiddLCBwbGFjZUhvbGRlciwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5NZWRpYVRlY2hDb250cm9sbGVyLnByb3RvdHlwZS5kaXNwb3NlLmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLnBsYXkgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuZWxfLnZqc19wbGF5KCk7XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy52anNfcGF1c2UoKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuc3JjID0gZnVuY3Rpb24oc3JjKXtcclxuICBpZiAodmpzLkZsYXNoLmlzU3RyZWFtaW5nU3JjKHNyYykpIHtcclxuICAgIHNyYyA9IHZqcy5GbGFzaC5zdHJlYW1Ub1BhcnRzKHNyYyk7XHJcbiAgICB0aGlzLnNldFJ0bXBDb25uZWN0aW9uKHNyYy5jb25uZWN0aW9uKTtcclxuICAgIHRoaXMuc2V0UnRtcFN0cmVhbShzcmMuc3RyZWFtKTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICAvLyBNYWtlIHN1cmUgc291cmNlIFVSTCBpcyBhYm9zb2x1dGUuXHJcbiAgICBzcmMgPSB2anMuZ2V0QWJzb2x1dGVVUkwoc3JjKTtcclxuICAgIHRoaXMuZWxfLnZqc19zcmMoc3JjKTtcclxuICB9XHJcblxyXG4gIC8vIEN1cnJlbnRseSB0aGUgU1dGIGRvZXNuJ3QgYXV0b3BsYXkgaWYgeW91IGxvYWQgYSBzb3VyY2UgbGF0ZXIuXHJcbiAgLy8gZS5nLiBMb2FkIHBsYXllciB3LyBubyBzb3VyY2UsIHdhaXQgMnMsIHNldCBzcmMuXHJcbiAgaWYgKHRoaXMucGxheWVyXy5hdXRvcGxheSgpKSB7XHJcbiAgICB2YXIgdGVjaCA9IHRoaXM7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7IHRlY2gucGxheSgpOyB9LCAwKTtcclxuICB9XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLmN1cnJlbnRTcmMgPSBmdW5jdGlvbigpe1xyXG4gIHZhciBzcmMgPSB0aGlzLmVsXy52anNfZ2V0UHJvcGVydHkoJ2N1cnJlbnRTcmMnKTtcclxuICAvLyBubyBzcmMsIGNoZWNrIGFuZCBzZWUgaWYgUlRNUFxyXG4gIGlmIChzcmMgPT0gbnVsbCkge1xyXG4gICAgdmFyIGNvbm5lY3Rpb24gPSB0aGlzLnJ0bXBDb25uZWN0aW9uKCksXHJcbiAgICAgICAgc3RyZWFtID0gdGhpcy5ydG1wU3RyZWFtKCk7XHJcblxyXG4gICAgaWYgKGNvbm5lY3Rpb24gJiYgc3RyZWFtKSB7XHJcbiAgICAgIHNyYyA9IHZqcy5GbGFzaC5zdHJlYW1Gcm9tUGFydHMoY29ubmVjdGlvbiwgc3RyZWFtKTtcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHNyYztcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5lbF8udmpzX2xvYWQoKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUucG9zdGVyID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLmVsXy52anNfZ2V0UHJvcGVydHkoJ3Bvc3RlcicpO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnByb3RvdHlwZS5idWZmZXJlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5jcmVhdGVUaW1lUmFuZ2UoMCwgdGhpcy5lbF8udmpzX2dldFByb3BlcnR5KCdidWZmZXJlZCcpKTtcclxufTtcclxuXHJcbnZqcy5GbGFzaC5wcm90b3R5cGUuc3VwcG9ydHNGdWxsU2NyZWVuID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gZmFsc2U7IC8vIEZsYXNoIGRvZXMgbm90IGFsbG93IGZ1bGxzY3JlZW4gdGhyb3VnaCBqYXZhc2NyaXB0XHJcbn07XHJcblxyXG52anMuRmxhc2gucHJvdG90eXBlLmVudGVyRnVsbFNjcmVlbiA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIGZhbHNlO1xyXG59O1xyXG5cclxuXHJcbi8vIENyZWF0ZSBzZXR0ZXJzIGFuZCBnZXR0ZXJzIGZvciBhdHRyaWJ1dGVzXHJcbnZhciBhcGkgPSB2anMuRmxhc2gucHJvdG90eXBlLFxyXG4gICAgcmVhZFdyaXRlID0gJ3J0bXBDb25uZWN0aW9uLHJ0bXBTdHJlYW0scHJlbG9hZCxjdXJyZW50VGltZSxkZWZhdWx0UGxheWJhY2tSYXRlLHBsYXliYWNrUmF0ZSxhdXRvcGxheSxsb29wLG1lZGlhR3JvdXAsY29udHJvbGxlcixjb250cm9scyx2b2x1bWUsbXV0ZWQsZGVmYXVsdE11dGVkJy5zcGxpdCgnLCcpLFxyXG4gICAgcmVhZE9ubHkgPSAnZXJyb3IsY3VycmVudFNyYyxuZXR3b3JrU3RhdGUscmVhZHlTdGF0ZSxzZWVraW5nLGluaXRpYWxUaW1lLGR1cmF0aW9uLHN0YXJ0T2Zmc2V0VGltZSxwYXVzZWQscGxheWVkLHNlZWthYmxlLGVuZGVkLHZpZGVvVHJhY2tzLGF1ZGlvVHJhY2tzLHZpZGVvV2lkdGgsdmlkZW9IZWlnaHQsdGV4dFRyYWNrcycuc3BsaXQoJywnKTtcclxuICAgIC8vIE92ZXJyaWRkZW46IGJ1ZmZlcmVkXHJcblxyXG4vKipcclxuICogQHRoaXMgeyp9XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52YXIgY3JlYXRlU2V0dGVyID0gZnVuY3Rpb24oYXR0cil7XHJcbiAgdmFyIGF0dHJVcHBlciA9IGF0dHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBhdHRyLnNsaWNlKDEpO1xyXG4gIGFwaVsnc2V0JythdHRyVXBwZXJdID0gZnVuY3Rpb24odmFsKXsgcmV0dXJuIHRoaXMuZWxfLnZqc19zZXRQcm9wZXJ0eShhdHRyLCB2YWwpOyB9O1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEB0aGlzIHsqfVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmFyIGNyZWF0ZUdldHRlciA9IGZ1bmN0aW9uKGF0dHIpe1xyXG4gIGFwaVthdHRyXSA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzLmVsXy52anNfZ2V0UHJvcGVydHkoYXR0cik7IH07XHJcbn07XHJcblxyXG4oZnVuY3Rpb24oKXtcclxuICB2YXIgaTtcclxuICAvLyBDcmVhdGUgZ2V0dGVyIGFuZCBzZXR0ZXJzIGZvciBhbGwgcmVhZC93cml0ZSBhdHRyaWJ1dGVzXHJcbiAgZm9yIChpID0gMDsgaSA8IHJlYWRXcml0ZS5sZW5ndGg7IGkrKykge1xyXG4gICAgY3JlYXRlR2V0dGVyKHJlYWRXcml0ZVtpXSk7XHJcbiAgICBjcmVhdGVTZXR0ZXIocmVhZFdyaXRlW2ldKTtcclxuICB9XHJcblxyXG4gIC8vIENyZWF0ZSBnZXR0ZXJzIGZvciByZWFkLW9ubHkgYXR0cmlidXRlc1xyXG4gIGZvciAoaSA9IDA7IGkgPCByZWFkT25seS5sZW5ndGg7IGkrKykge1xyXG4gICAgY3JlYXRlR2V0dGVyKHJlYWRPbmx5W2ldKTtcclxuICB9XHJcbn0pKCk7XHJcblxyXG4vKiBGbGFzaCBTdXBwb3J0IFRlc3RpbmcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cclxuXHJcbnZqcy5GbGFzaC5pc1N1cHBvcnRlZCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHZqcy5GbGFzaC52ZXJzaW9uKClbMF0gPj0gMTA7XHJcbiAgLy8gcmV0dXJuIHN3Zm9iamVjdC5oYXNGbGFzaFBsYXllclZlcnNpb24oJzEwJyk7XHJcbn07XHJcblxyXG52anMuRmxhc2guY2FuUGxheVNvdXJjZSA9IGZ1bmN0aW9uKHNyY09iail7XHJcbiAgdmFyIHR5cGU7XHJcblxyXG4gIGlmICghc3JjT2JqLnR5cGUpIHtcclxuICAgIHJldHVybiAnJztcclxuICB9XHJcblxyXG4gIHR5cGUgPSBzcmNPYmoudHlwZS5yZXBsYWNlKC87LiovLCcnKS50b0xvd2VyQ2FzZSgpO1xyXG4gIGlmICh0eXBlIGluIHZqcy5GbGFzaC5mb3JtYXRzIHx8IHR5cGUgaW4gdmpzLkZsYXNoLnN0cmVhbWluZ0Zvcm1hdHMpIHtcclxuICAgIHJldHVybiAnbWF5YmUnO1xyXG4gIH1cclxufTtcclxuXHJcbnZqcy5GbGFzaC5mb3JtYXRzID0ge1xyXG4gICd2aWRlby9mbHYnOiAnRkxWJyxcclxuICAndmlkZW8veC1mbHYnOiAnRkxWJyxcclxuICAndmlkZW8vbXA0JzogJ01QNCcsXHJcbiAgJ3ZpZGVvL200dic6ICdNUDQnXHJcbn07XHJcblxyXG52anMuRmxhc2guc3RyZWFtaW5nRm9ybWF0cyA9IHtcclxuICAncnRtcC9tcDQnOiAnTVA0JyxcclxuICAncnRtcC9mbHYnOiAnRkxWJ1xyXG59O1xyXG5cclxudmpzLkZsYXNoWydvblJlYWR5J10gPSBmdW5jdGlvbihjdXJyU3dmKXtcclxuICB2YXIgZWwgPSB2anMuZWwoY3VyclN3Zik7XHJcblxyXG4gIC8vIEdldCBwbGF5ZXIgZnJvbSBib3hcclxuICAvLyBPbiBmaXJlZm94IHJlbG9hZHMsIGVsIG1pZ2h0IGFscmVhZHkgaGF2ZSBhIHBsYXllclxyXG4gIHZhciBwbGF5ZXIgPSBlbFsncGxheWVyJ10gfHwgZWwucGFyZW50Tm9kZVsncGxheWVyJ10sXHJcbiAgICAgIHRlY2ggPSBwbGF5ZXIudGVjaDtcclxuXHJcbiAgLy8gUmVmZXJlbmNlIHBsYXllciBvbiB0ZWNoIGVsZW1lbnRcclxuICBlbFsncGxheWVyJ10gPSBwbGF5ZXI7XHJcblxyXG4gIC8vIFVwZGF0ZSByZWZlcmVuY2UgdG8gcGxheWJhY2sgdGVjaG5vbG9neSBlbGVtZW50XHJcbiAgdGVjaC5lbF8gPSBlbDtcclxuXHJcbiAgdmpzLkZsYXNoLmNoZWNrUmVhZHkodGVjaCk7XHJcbn07XHJcblxyXG4vLyBUaGUgU1dGIGlzbid0IGFsd2FzeSByZWFkeSB3aGVuIGl0IHNheXMgaXQgaXMuIFNvbWV0aW1lcyB0aGUgQVBJIGZ1bmN0aW9ucyBzdGlsbCBuZWVkIHRvIGJlIGFkZGVkIHRvIHRoZSBvYmplY3QuXHJcbi8vIElmIGl0J3Mgbm90IHJlYWR5LCB3ZSBzZXQgYSB0aW1lb3V0IHRvIGNoZWNrIGFnYWluIHNob3J0bHkuXHJcbnZqcy5GbGFzaC5jaGVja1JlYWR5ID0gZnVuY3Rpb24odGVjaCl7XHJcblxyXG4gIC8vIENoZWNrIGlmIEFQSSBwcm9wZXJ0eSBleGlzdHNcclxuICBpZiAodGVjaC5lbCgpLnZqc19nZXRQcm9wZXJ0eSkge1xyXG5cclxuICAgIC8vIElmIHNvLCB0ZWxsIHRlY2ggaXQncyByZWFkeVxyXG4gICAgdGVjaC50cmlnZ2VyUmVhZHkoKTtcclxuXHJcbiAgLy8gT3RoZXJ3aXNlIHdhaXQgbG9uZ2VyLlxyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICB2anMuRmxhc2guY2hlY2tSZWFkeSh0ZWNoKTtcclxuICAgIH0sIDUwKTtcclxuXHJcbiAgfVxyXG59O1xyXG5cclxuLy8gVHJpZ2dlciBldmVudHMgZnJvbSB0aGUgc3dmIG9uIHRoZSBwbGF5ZXJcclxudmpzLkZsYXNoWydvbkV2ZW50J10gPSBmdW5jdGlvbihzd2ZJRCwgZXZlbnROYW1lKXtcclxuICB2YXIgcGxheWVyID0gdmpzLmVsKHN3ZklEKVsncGxheWVyJ107XHJcbiAgcGxheWVyLnRyaWdnZXIoZXZlbnROYW1lKTtcclxufTtcclxuXHJcbi8vIExvZyBlcnJvcnMgZnJvbSB0aGUgc3dmXHJcbnZqcy5GbGFzaFsnb25FcnJvciddID0gZnVuY3Rpb24oc3dmSUQsIGVycil7XHJcbiAgdmFyIHBsYXllciA9IHZqcy5lbChzd2ZJRClbJ3BsYXllciddO1xyXG4gIHBsYXllci50cmlnZ2VyKCdlcnJvcicpO1xyXG4gIHZqcy5sb2coJ0ZsYXNoIEVycm9yJywgZXJyLCBzd2ZJRCk7XHJcbn07XHJcblxyXG4vLyBGbGFzaCBWZXJzaW9uIENoZWNrXHJcbnZqcy5GbGFzaC52ZXJzaW9uID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdmVyc2lvbiA9ICcwLDAsMCc7XHJcblxyXG4gIC8vIElFXHJcbiAgdHJ5IHtcclxuICAgIHZlcnNpb24gPSBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoJ1Nob2Nrd2F2ZUZsYXNoLlNob2Nrd2F2ZUZsYXNoJykuR2V0VmFyaWFibGUoJyR2ZXJzaW9uJykucmVwbGFjZSgvXFxEKy9nLCAnLCcpLm1hdGNoKC9eLD8oLispLD8kLylbMV07XHJcblxyXG4gIC8vIG90aGVyIGJyb3dzZXJzXHJcbiAgfSBjYXRjaChlKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBpZiAobmF2aWdhdG9yLm1pbWVUeXBlc1snYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2gnXS5lbmFibGVkUGx1Z2luKXtcclxuICAgICAgICB2ZXJzaW9uID0gKG5hdmlnYXRvci5wbHVnaW5zWydTaG9ja3dhdmUgRmxhc2ggMi4wJ10gfHwgbmF2aWdhdG9yLnBsdWdpbnNbJ1Nob2Nrd2F2ZSBGbGFzaCddKS5kZXNjcmlwdGlvbi5yZXBsYWNlKC9cXEQrL2csICcsJykubWF0Y2goL14sPyguKyksPyQvKVsxXTtcclxuICAgICAgfVxyXG4gICAgfSBjYXRjaChlcnIpIHt9XHJcbiAgfVxyXG4gIHJldHVybiB2ZXJzaW9uLnNwbGl0KCcsJyk7XHJcbn07XHJcblxyXG4vLyBGbGFzaCBlbWJlZGRpbmcgbWV0aG9kLiBPbmx5IHVzZWQgaW4gbm9uLWlmcmFtZSBtb2RlXHJcbnZqcy5GbGFzaC5lbWJlZCA9IGZ1bmN0aW9uKHN3ZiwgcGxhY2VIb2xkZXIsIGZsYXNoVmFycywgcGFyYW1zLCBhdHRyaWJ1dGVzKXtcclxuICB2YXIgY29kZSA9IHZqcy5GbGFzaC5nZXRFbWJlZENvZGUoc3dmLCBmbGFzaFZhcnMsIHBhcmFtcywgYXR0cmlidXRlcyksXHJcblxyXG4gICAgICAvLyBHZXQgZWxlbWVudCBieSBlbWJlZGRpbmcgY29kZSBhbmQgcmV0cmlldmluZyBjcmVhdGVkIGVsZW1lbnRcclxuICAgICAgb2JqID0gdmpzLmNyZWF0ZUVsKCdkaXYnLCB7IGlubmVySFRNTDogY29kZSB9KS5jaGlsZE5vZGVzWzBdLFxyXG5cclxuICAgICAgcGFyID0gcGxhY2VIb2xkZXIucGFyZW50Tm9kZVxyXG4gIDtcclxuXHJcbiAgcGxhY2VIb2xkZXIucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQob2JqLCBwbGFjZUhvbGRlcik7XHJcblxyXG4gIC8vIElFNiBzZWVtcyB0byBoYXZlIGFuIGlzc3VlIHdoZXJlIGl0IHdvbid0IGluaXRpYWxpemUgdGhlIHN3ZiBvYmplY3QgYWZ0ZXIgaW5qZWN0aW5nIGl0LlxyXG4gIC8vIFRoaXMgaXMgYSBkdW1iIGZpeFxyXG4gIHZhciBuZXdPYmogPSBwYXIuY2hpbGROb2Rlc1swXTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICBuZXdPYmouc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgfSwgMTAwMCk7XHJcblxyXG4gIHJldHVybiBvYmo7XHJcblxyXG59O1xyXG5cclxudmpzLkZsYXNoLmdldEVtYmVkQ29kZSA9IGZ1bmN0aW9uKHN3ZiwgZmxhc2hWYXJzLCBwYXJhbXMsIGF0dHJpYnV0ZXMpe1xyXG5cclxuICB2YXIgb2JqVGFnID0gJzxvYmplY3QgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCInLFxyXG4gICAgICBmbGFzaFZhcnNTdHJpbmcgPSAnJyxcclxuICAgICAgcGFyYW1zU3RyaW5nID0gJycsXHJcbiAgICAgIGF0dHJzU3RyaW5nID0gJyc7XHJcblxyXG4gIC8vIENvbnZlcnQgZmxhc2ggdmFycyB0byBzdHJpbmdcclxuICBpZiAoZmxhc2hWYXJzKSB7XHJcbiAgICB2anMub2JqLmVhY2goZmxhc2hWYXJzLCBmdW5jdGlvbihrZXksIHZhbCl7XHJcbiAgICAgIGZsYXNoVmFyc1N0cmluZyArPSAoa2V5ICsgJz0nICsgdmFsICsgJyZhbXA7Jyk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8vIEFkZCBzd2YsIGZsYXNoVmFycywgYW5kIG90aGVyIGRlZmF1bHQgcGFyYW1zXHJcbiAgcGFyYW1zID0gdmpzLm9iai5tZXJnZSh7XHJcbiAgICAnbW92aWUnOiBzd2YsXHJcbiAgICAnZmxhc2h2YXJzJzogZmxhc2hWYXJzU3RyaW5nLFxyXG4gICAgJ2FsbG93U2NyaXB0QWNjZXNzJzogJ2Fsd2F5cycsIC8vIFJlcXVpcmVkIHRvIHRhbGsgdG8gc3dmXHJcbiAgICAnYWxsb3dOZXR3b3JraW5nJzogJ2FsbCcgLy8gQWxsIHNob3VsZCBiZSBkZWZhdWx0LCBidXQgaGF2aW5nIHNlY3VyaXR5IGlzc3Vlcy5cclxuICB9LCBwYXJhbXMpO1xyXG5cclxuICAvLyBDcmVhdGUgcGFyYW0gdGFncyBzdHJpbmdcclxuICB2anMub2JqLmVhY2gocGFyYW1zLCBmdW5jdGlvbihrZXksIHZhbCl7XHJcbiAgICBwYXJhbXNTdHJpbmcgKz0gJzxwYXJhbSBuYW1lPVwiJytrZXkrJ1wiIHZhbHVlPVwiJyt2YWwrJ1wiIC8+JztcclxuICB9KTtcclxuXHJcbiAgYXR0cmlidXRlcyA9IHZqcy5vYmoubWVyZ2Uoe1xyXG4gICAgLy8gQWRkIHN3ZiB0byBhdHRyaWJ1dGVzIChuZWVkIGJvdGggZm9yIElFIGFuZCBPdGhlcnMgdG8gd29yaylcclxuICAgICdkYXRhJzogc3dmLFxyXG5cclxuICAgIC8vIERlZmF1bHQgdG8gMTAwJSB3aWR0aC9oZWlnaHRcclxuICAgICd3aWR0aCc6ICcxMDAlJyxcclxuICAgICdoZWlnaHQnOiAnMTAwJSdcclxuXHJcbiAgfSwgYXR0cmlidXRlcyk7XHJcblxyXG4gIC8vIENyZWF0ZSBBdHRyaWJ1dGVzIHN0cmluZ1xyXG4gIHZqcy5vYmouZWFjaChhdHRyaWJ1dGVzLCBmdW5jdGlvbihrZXksIHZhbCl7XHJcbiAgICBhdHRyc1N0cmluZyArPSAoa2V5ICsgJz1cIicgKyB2YWwgKyAnXCIgJyk7XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBvYmpUYWcgKyBhdHRyc1N0cmluZyArICc+JyArIHBhcmFtc1N0cmluZyArICc8L29iamVjdD4nO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnN0cmVhbUZyb21QYXJ0cyA9IGZ1bmN0aW9uKGNvbm5lY3Rpb24sIHN0cmVhbSkge1xyXG4gIHJldHVybiBjb25uZWN0aW9uICsgJyYnICsgc3RyZWFtO1xyXG59O1xyXG5cclxudmpzLkZsYXNoLnN0cmVhbVRvUGFydHMgPSBmdW5jdGlvbihzcmMpIHtcclxuICB2YXIgcGFydHMgPSB7XHJcbiAgICBjb25uZWN0aW9uOiAnJyxcclxuICAgIHN0cmVhbTogJydcclxuICB9O1xyXG5cclxuICBpZiAoISBzcmMpIHtcclxuICAgIHJldHVybiBwYXJ0cztcclxuICB9XHJcblxyXG4gIC8vIExvb2sgZm9yIHRoZSBub3JtYWwgVVJMIHNlcGFyYXRvciB3ZSBleHBlY3QsICcmJy5cclxuICAvLyBJZiBmb3VuZCwgd2Ugc3BsaXQgdGhlIFVSTCBpbnRvIHR3byBwaWVjZXMgYXJvdW5kIHRoZVxyXG4gIC8vIGZpcnN0ICcmJy5cclxuICB2YXIgY29ubkVuZCA9IHNyYy5pbmRleE9mKCcmJyk7XHJcbiAgdmFyIHN0cmVhbUJlZ2luO1xyXG4gIGlmIChjb25uRW5kICE9PSAtMSkge1xyXG4gICAgc3RyZWFtQmVnaW4gPSBjb25uRW5kICsgMTtcclxuICB9XHJcbiAgZWxzZSB7XHJcbiAgICAvLyBJZiB0aGVyZSdzIG5vdCBhICcmJywgd2UgdXNlIHRoZSBsYXN0ICcvJyBhcyB0aGUgZGVsaW1pdGVyLlxyXG4gICAgY29ubkVuZCA9IHN0cmVhbUJlZ2luID0gc3JjLmxhc3RJbmRleE9mKCcvJykgKyAxO1xyXG4gICAgaWYgKGNvbm5FbmQgPT09IDApIHtcclxuICAgICAgLy8gcmVhbGx5LCB0aGVyZSdzIG5vdCBhICcvJz9cclxuICAgICAgY29ubkVuZCA9IHN0cmVhbUJlZ2luID0gc3JjLmxlbmd0aDtcclxuICAgIH1cclxuICB9XHJcbiAgcGFydHMuY29ubmVjdGlvbiA9IHNyYy5zdWJzdHJpbmcoMCwgY29ubkVuZCk7XHJcbiAgcGFydHMuc3RyZWFtID0gc3JjLnN1YnN0cmluZyhzdHJlYW1CZWdpbiwgc3JjLmxlbmd0aCk7XHJcblxyXG4gIHJldHVybiBwYXJ0cztcclxufTtcclxuXHJcbnZqcy5GbGFzaC5pc1N0cmVhbWluZ1R5cGUgPSBmdW5jdGlvbihzcmNUeXBlKSB7XHJcbiAgcmV0dXJuIHNyY1R5cGUgaW4gdmpzLkZsYXNoLnN0cmVhbWluZ0Zvcm1hdHM7XHJcbn07XHJcblxyXG4vLyBSVE1QIGhhcyBmb3VyIHZhcmlhdGlvbnMsIGFueSBzdHJpbmcgc3RhcnRpbmdcclxuLy8gd2l0aCBvbmUgb2YgdGhlc2UgcHJvdG9jb2xzIHNob3VsZCBiZSB2YWxpZFxyXG52anMuRmxhc2guUlRNUF9SRSA9IC9ecnRtcFtzZXRdPzpcXC9cXC8vaTtcclxuXHJcbnZqcy5GbGFzaC5pc1N0cmVhbWluZ1NyYyA9IGZ1bmN0aW9uKHNyYykge1xyXG4gIHJldHVybiB2anMuRmxhc2guUlRNUF9SRS50ZXN0KHNyYyk7XHJcbn07XHJcbi8qKlxyXG4gKiBUaGUgTWVkaWEgTG9hZGVyIGlzIHRoZSBjb21wb25lbnQgdGhhdCBkZWNpZGVzIHdoaWNoIHBsYXliYWNrIHRlY2hub2xvZ3kgdG8gbG9hZFxyXG4gKiB3aGVuIHRoZSBwbGF5ZXIgaXMgaW5pdGlhbGl6ZWQuXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk1lZGlhTG9hZGVyID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gc291cmNlcyB3aGVuIHRoZSBwbGF5ZXIgaXMgaW5pdGlhbGl6ZWQsXHJcbiAgICAvLyBsb2FkIHRoZSBmaXJzdCBzdXBwb3J0ZWQgcGxheWJhY2sgdGVjaG5vbG9neS5cclxuICAgIGlmICghcGxheWVyLm9wdGlvbnNfWydzb3VyY2VzJ10gfHwgcGxheWVyLm9wdGlvbnNfWydzb3VyY2VzJ10ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgIGZvciAodmFyIGk9MCxqPXBsYXllci5vcHRpb25zX1sndGVjaE9yZGVyJ107IGk8ai5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciB0ZWNoTmFtZSA9IHZqcy5jYXBpdGFsaXplKGpbaV0pLFxyXG4gICAgICAgICAgICB0ZWNoID0gd2luZG93Wyd2aWRlb2pzJ11bdGVjaE5hbWVdO1xyXG5cclxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0aGlzIHRlY2hub2xvZ3lcclxuICAgICAgICBpZiAodGVjaCAmJiB0ZWNoLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgIHBsYXllci5sb2FkVGVjaCh0ZWNoTmFtZSk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIC8vIExvb3AgdGhyb3VnaCBwbGF5YmFjayB0ZWNobm9sb2dpZXMgKEhUTUw1LCBGbGFzaCkgYW5kIGNoZWNrIGZvciBzdXBwb3J0LlxyXG4gICAgICAvLyAvLyBUaGVuIGxvYWQgdGhlIGJlc3Qgc291cmNlLlxyXG4gICAgICAvLyAvLyBBIGZldyBhc3N1bXB0aW9ucyBoZXJlOlxyXG4gICAgICAvLyAvLyAgIEFsbCBwbGF5YmFjayB0ZWNobm9sb2dpZXMgcmVzcGVjdCBwcmVsb2FkIGZhbHNlLlxyXG4gICAgICBwbGF5ZXIuc3JjKHBsYXllci5vcHRpb25zX1snc291cmNlcyddKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG4vKipcclxuICogQGZpbGVvdmVydmlldyBUZXh0IFRyYWNrc1xyXG4gKiBUZXh0IHRyYWNrcyBhcmUgdHJhY2tzIG9mIHRpbWVkIHRleHQgZXZlbnRzLlxyXG4gKiBDYXB0aW9ucyAtIHRleHQgZGlzcGxheWVkIG92ZXIgdGhlIHZpZGVvIGZvciB0aGUgaGVhcmluZyBpbXBhcmVkXHJcbiAqIFN1YnRpdGxlcyAtIHRleHQgZGlzcGxheWVkIG92ZXIgdGhlIHZpZGVvIGZvciB0aG9zZSB3aG8gZG9uJ3QgdW5kZXJzdGFuZCBsYW5nYXVnZSBpbiB0aGUgdmlkZW9cclxuICogQ2hhcHRlcnMgLSB0ZXh0IGRpc3BsYXllZCBpbiBhIG1lbnUgYWxsb3dpbmcgdGhlIHVzZXIgdG8ganVtcCB0byBwYXJ0aWN1bGFyIHBvaW50cyAoY2hhcHRlcnMpIGluIHRoZSB2aWRlb1xyXG4gKiBEZXNjcmlwdGlvbnMgKG5vdCBzdXBwb3J0ZWQgeWV0KSAtIGF1ZGlvIGRlc2NyaXB0aW9ucyB0aGF0IGFyZSByZWFkIGJhY2sgdG8gdGhlIHVzZXIgYnkgYSBzY3JlZW4gcmVhZGluZyBkZXZpY2VcclxuICovXHJcblxyXG4vLyBQbGF5ZXIgQWRkaXRpb25zIC0gRnVuY3Rpb25zIGFkZCB0byB0aGUgcGxheWVyIG9iamVjdCBmb3IgZWFzaWVyIGFjY2VzcyB0byB0cmFja3NcclxuXHJcbi8qKlxyXG4gKiBMaXN0IG9mIGFzc29jaWF0ZWQgdGV4dCB0cmFja3NcclxuICogQHR5cGUge0FycmF5fVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlBsYXllci5wcm90b3R5cGUudGV4dFRyYWNrc187XHJcblxyXG4vKipcclxuICogR2V0IGFuIGFycmF5IG9mIGFzc29jaWF0ZWQgdGV4dCB0cmFja3MuIGNhcHRpb25zLCBzdWJ0aXRsZXMsIGNoYXB0ZXJzLCBkZXNjcmlwdGlvbnNcclxuICogaHR0cDovL3d3dy53My5vcmcvaHRtbC93Zy9kcmFmdHMvaHRtbC9tYXN0ZXIvZW1iZWRkZWQtY29udGVudC0wLmh0bWwjZG9tLW1lZGlhLXRleHR0cmFja3NcclxuICogQHJldHVybiB7QXJyYXl9ICAgICAgICAgICBBcnJheSBvZiB0cmFjayBvYmplY3RzXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS50ZXh0VHJhY2tzID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLnRleHRUcmFja3NfID0gdGhpcy50ZXh0VHJhY2tzXyB8fCBbXTtcclxuICByZXR1cm4gdGhpcy50ZXh0VHJhY2tzXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGQgYSB0ZXh0IHRyYWNrXHJcbiAqIEluIGFkZGl0aW9uIHRvIHRoZSBXM0Mgc2V0dGluZ3Mgd2UgYWxsb3cgYWRkaW5nIGFkZGl0aW9uYWwgaW5mbyB0aHJvdWdoIG9wdGlvbnMuXHJcbiAqIGh0dHA6Ly93d3cudzMub3JnL2h0bWwvd2cvZHJhZnRzL2h0bWwvbWFzdGVyL2VtYmVkZGVkLWNvbnRlbnQtMC5odG1sI2RvbS1tZWRpYS1hZGR0ZXh0dHJhY2tcclxuICogQHBhcmFtIHtTdHJpbmd9ICBraW5kICAgICAgICBDYXB0aW9ucywgc3VidGl0bGVzLCBjaGFwdGVycywgZGVzY3JpcHRpb25zLCBvciBtZXRhZGF0YVxyXG4gKiBAcGFyYW0ge1N0cmluZz19IGxhYmVsICAgICAgIE9wdGlvbmFsIGxhYmVsXHJcbiAqIEBwYXJhbSB7U3RyaW5nPX0gbGFuZ3VhZ2UgICAgT3B0aW9uYWwgbGFuZ3VhZ2VcclxuICogQHBhcmFtIHtPYmplY3Q9fSBvcHRpb25zICAgICBBZGRpdGlvbmFsIHRyYWNrIG9wdGlvbnMsIGxpa2Ugc3JjXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5hZGRUZXh0VHJhY2sgPSBmdW5jdGlvbihraW5kLCBsYWJlbCwgbGFuZ3VhZ2UsIG9wdGlvbnMpe1xyXG4gIHZhciB0cmFja3MgPSB0aGlzLnRleHRUcmFja3NfID0gdGhpcy50ZXh0VHJhY2tzXyB8fCBbXTtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHJcbiAgb3B0aW9uc1sna2luZCddID0ga2luZDtcclxuICBvcHRpb25zWydsYWJlbCddID0gbGFiZWw7XHJcbiAgb3B0aW9uc1snbGFuZ3VhZ2UnXSA9IGxhbmd1YWdlO1xyXG5cclxuICAvLyBIVE1MNSBTcGVjIHNheXMgZGVmYXVsdCB0byBzdWJ0aXRsZXMuXHJcbiAgLy8gVXBwZXJjYXNlIGZpcnN0IGxldHRlciB0byBtYXRjaCBjbGFzcyBuYW1lc1xyXG4gIHZhciBLaW5kID0gdmpzLmNhcGl0YWxpemUoa2luZCB8fCAnc3VidGl0bGVzJyk7XHJcblxyXG4gIC8vIENyZWF0ZSBjb3JyZWN0IHRleHR0cmFjayBjbGFzcy4gQ2FwdGlvbnNUcmFjaywgZXRjLlxyXG4gIHZhciB0cmFjayA9IG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVtLaW5kICsgJ1RyYWNrJ10odGhpcywgb3B0aW9ucyk7XHJcblxyXG4gIHRyYWNrcy5wdXNoKHRyYWNrKTtcclxuXHJcbiAgLy8gSWYgdHJhY2suZGZsdCgpIGlzIHNldCwgc3RhcnQgc2hvd2luZyBpbW1lZGlhdGVseVxyXG4gIC8vIFRPRE86IEFkZCBhIHByb2Nlc3MgdG8gZGV0ZXJpbWUgdGhlIGJlc3QgdHJhY2sgdG8gc2hvdyBmb3IgdGhlIHNwZWNpZmljIGtpbmRcclxuICAvLyBJbmNhc2UgdGhlcmUgYXJlIG11bGl0cGxlIGRlZmF1bHRlZCB0cmFja3Mgb2YgdGhlIHNhbWUga2luZFxyXG4gIC8vIE9yIHRoZSB1c2VyIGhhcyBhIHNldCBwcmVmZXJlbmNlIG9mIGEgc3BlY2lmaWMgbGFuZ3VhZ2UgdGhhdCBzaG91bGQgb3ZlcnJpZGUgdGhlIGRlZmF1bHRcclxuICAvLyBpZiAodHJhY2suZGZsdCgpKSB7XHJcbiAgLy8gICB0aGlzLnJlYWR5KHZqcy5iaW5kKHRyYWNrLCB0cmFjay5zaG93KSk7XHJcbiAgLy8gfVxyXG5cclxuICByZXR1cm4gdHJhY2s7XHJcbn07XHJcblxyXG4vKipcclxuICogQWRkIGFuIGFycmF5IG9mIHRleHQgdHJhY2tzLiBjYXB0aW9ucywgc3VidGl0bGVzLCBjaGFwdGVycywgZGVzY3JpcHRpb25zXHJcbiAqIFRyYWNrIG9iamVjdHMgd2lsbCBiZSBzdG9yZWQgaW4gdGhlIHBsYXllci50ZXh0VHJhY2tzKCkgYXJyYXlcclxuICogQHBhcmFtIHtBcnJheX0gdHJhY2tMaXN0IEFycmF5IG9mIHRyYWNrIGVsZW1lbnRzIG9yIG9iamVjdHMgKGZha2UgdHJhY2sgZWxlbWVudHMpXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuUGxheWVyLnByb3RvdHlwZS5hZGRUZXh0VHJhY2tzID0gZnVuY3Rpb24odHJhY2tMaXN0KXtcclxuICB2YXIgdHJhY2tPYmo7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdHJhY2tMaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICB0cmFja09iaiA9IHRyYWNrTGlzdFtpXTtcclxuICAgIHRoaXMuYWRkVGV4dFRyYWNrKHRyYWNrT2JqWydraW5kJ10sIHRyYWNrT2JqWydsYWJlbCddLCB0cmFja09ialsnbGFuZ3VhZ2UnXSwgdHJhY2tPYmopO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vLyBTaG93IGEgdGV4dCB0cmFja1xyXG4vLyBkaXNhYmxlU2FtZUtpbmQ6IGRpc2FibGUgYWxsIG90aGVyIHRyYWNrcyBvZiB0aGUgc2FtZSBraW5kLiBWYWx1ZSBzaG91bGQgYmUgYSB0cmFjayBraW5kIChjYXB0aW9ucywgZXRjLilcclxudmpzLlBsYXllci5wcm90b3R5cGUuc2hvd1RleHRUcmFjayA9IGZ1bmN0aW9uKGlkLCBkaXNhYmxlU2FtZUtpbmQpe1xyXG4gIHZhciB0cmFja3MgPSB0aGlzLnRleHRUcmFja3NfLFxyXG4gICAgICBpID0gMCxcclxuICAgICAgaiA9IHRyYWNrcy5sZW5ndGgsXHJcbiAgICAgIHRyYWNrLCBzaG93VHJhY2ssIGtpbmQ7XHJcblxyXG4gIC8vIEZpbmQgVHJhY2sgd2l0aCBzYW1lIElEXHJcbiAgZm9yICg7aTxqO2krKykge1xyXG4gICAgdHJhY2sgPSB0cmFja3NbaV07XHJcbiAgICBpZiAodHJhY2suaWQoKSA9PT0gaWQpIHtcclxuICAgICAgdHJhY2suc2hvdygpO1xyXG4gICAgICBzaG93VHJhY2sgPSB0cmFjaztcclxuXHJcbiAgICAvLyBEaXNhYmxlIHRyYWNrcyBvZiB0aGUgc2FtZSBraW5kXHJcbiAgICB9IGVsc2UgaWYgKGRpc2FibGVTYW1lS2luZCAmJiB0cmFjay5raW5kKCkgPT0gZGlzYWJsZVNhbWVLaW5kICYmIHRyYWNrLm1vZGUoKSA+IDApIHtcclxuICAgICAgdHJhY2suZGlzYWJsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLy8gR2V0IHRyYWNrIGtpbmQgZnJvbSBzaG93biB0cmFjayBvciBkaXNhYmxlU2FtZUtpbmRcclxuICBraW5kID0gKHNob3dUcmFjaykgPyBzaG93VHJhY2sua2luZCgpIDogKChkaXNhYmxlU2FtZUtpbmQpID8gZGlzYWJsZVNhbWVLaW5kIDogZmFsc2UpO1xyXG5cclxuICAvLyBUcmlnZ2VyIHRyYWNrY2hhbmdlIGV2ZW50LCBjYXB0aW9uc3RyYWNrY2hhbmdlLCBzdWJ0aXRsZXN0cmFja2NoYW5nZSwgZXRjLlxyXG4gIGlmIChraW5kKSB7XHJcbiAgICB0aGlzLnRyaWdnZXIoa2luZCsndHJhY2tjaGFuZ2UnKTtcclxuICB9XHJcblxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRoZSBiYXNlIGNsYXNzIGZvciBhbGwgdGV4dCB0cmFja3NcclxuICpcclxuICogSGFuZGxlcyB0aGUgcGFyc2luZywgaGlkaW5nLCBhbmQgc2hvd2luZyBvZiB0ZXh0IHRyYWNrIGN1ZXNcclxuICpcclxuICogQHBhcmFtIHt2anMuUGxheWVyfE9iamVjdH0gcGxheWVyXHJcbiAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0aW9uc1xyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5UZXh0VHJhY2sgPSB2anMuQ29tcG9uZW50LmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICB2anMuQ29tcG9uZW50LmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICAvLyBBcHBseSB0cmFjayBpbmZvIHRvIHRyYWNrIG9iamVjdFxyXG4gICAgLy8gT3B0aW9ucyB3aWxsIG9mdGVuIGJlIGEgdHJhY2sgZWxlbWVudFxyXG5cclxuICAgIC8vIEJ1aWxkIElEIGlmIG9uZSBkb2Vzbid0IGV4aXN0XHJcbiAgICB0aGlzLmlkXyA9IG9wdGlvbnNbJ2lkJ10gfHwgKCd2anNfJyArIG9wdGlvbnNbJ2tpbmQnXSArICdfJyArIG9wdGlvbnNbJ2xhbmd1YWdlJ10gKyAnXycgKyB2anMuZ3VpZCsrKTtcclxuICAgIHRoaXMuc3JjXyA9IG9wdGlvbnNbJ3NyYyddO1xyXG4gICAgLy8gJ2RlZmF1bHQnIGlzIGEgcmVzZXJ2ZWQga2V5d29yZCBpbiBqcyBzbyB3ZSB1c2UgYW4gYWJicmV2aWF0ZWQgdmVyc2lvblxyXG4gICAgdGhpcy5kZmx0XyA9IG9wdGlvbnNbJ2RlZmF1bHQnXSB8fCBvcHRpb25zWydkZmx0J107XHJcbiAgICB0aGlzLnRpdGxlXyA9IG9wdGlvbnNbJ3RpdGxlJ107XHJcbiAgICB0aGlzLmxhbmd1YWdlXyA9IG9wdGlvbnNbJ3NyY2xhbmcnXTtcclxuICAgIHRoaXMubGFiZWxfID0gb3B0aW9uc1snbGFiZWwnXTtcclxuICAgIHRoaXMuY3Vlc18gPSBbXTtcclxuICAgIHRoaXMuYWN0aXZlQ3Vlc18gPSBbXTtcclxuICAgIHRoaXMucmVhZHlTdGF0ZV8gPSAwO1xyXG4gICAgdGhpcy5tb2RlXyA9IDA7XHJcblxyXG4gICAgdGhpcy5wbGF5ZXJfLm9uKCdmdWxsc2NyZWVuY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy5hZGp1c3RGb250U2l6ZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG4vKipcclxuICogVHJhY2sga2luZCB2YWx1ZS4gQ2FwdGlvbnMsIHN1YnRpdGxlcywgZXRjLlxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUua2luZF87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBraW5kIHZhbHVlXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmtpbmQgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmtpbmRfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFRyYWNrIHNyYyB2YWx1ZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuc3JjXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIHNyYyB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5zcmMgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLnNyY187XHJcbn07XHJcblxyXG4vKipcclxuICogVHJhY2sgZGVmYXVsdCB2YWx1ZVxyXG4gKiBJZiBkZWZhdWx0IGlzIHVzZWQsIHN1YnRpdGxlcy9jYXB0aW9ucyB0byBzdGFydCBzaG93aW5nXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5kZmx0XztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGRlZmF1bHQgdmFsdWUuICgnZGVmYXVsdCcgaXMgYSByZXNlcnZlZCBrZXl3b3JkKVxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGZsdCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMuZGZsdF87XHJcbn07XHJcblxyXG4vKipcclxuICogVHJhY2sgdGl0bGUgdmFsdWVcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnRpdGxlXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIHRpdGxlIHZhbHVlXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnRpdGxlID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy50aXRsZV87XHJcbn07XHJcblxyXG4vKipcclxuICogTGFuZ3VhZ2UgLSB0d28gbGV0dGVyIHN0cmluZyB0byByZXByZXNlbnQgdHJhY2sgbGFuZ3VhZ2UsIGUuZy4gJ2VuJyBmb3IgRW5nbGlzaFxyXG4gKiBTcGVjIGRlZjogcmVhZG9ubHkgYXR0cmlidXRlIERPTVN0cmluZyBsYW5ndWFnZTtcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhbmd1YWdlXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGxhbmd1YWdlIHZhbHVlXHJcbiAqIEByZXR1cm4ge1N0cmluZ31cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxhbmd1YWdlID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5sYW5ndWFnZV87XHJcbn07XHJcblxyXG4vKipcclxuICogVHJhY2sgbGFiZWwgZS5nLiAnRW5nbGlzaCdcclxuICogU3BlYyBkZWY6IHJlYWRvbmx5IGF0dHJpYnV0ZSBET01TdHJpbmcgbGFiZWw7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5sYWJlbF87XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBsYWJlbCB2YWx1ZVxyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5sYWJlbCA9IGZ1bmN0aW9uKCl7XHJcbiAgcmV0dXJuIHRoaXMubGFiZWxfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFsbCBjdWVzIG9mIHRoZSB0cmFjay4gQ3VlcyBoYXZlIGEgc3RhcnRUaW1lLCBlbmRUaW1lLCB0ZXh0LCBhbmQgb3RoZXIgcHJvcGVydGllcy5cclxuICogU3BlYyBkZWY6IHJlYWRvbmx5IGF0dHJpYnV0ZSBUZXh0VHJhY2tDdWVMaXN0IGN1ZXM7XHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5jdWVzXztcclxuXHJcbi8qKlxyXG4gKiBHZXQgdGhlIHRyYWNrIGN1ZXNcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5jdWVzID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5jdWVzXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBY3RpdmVDdWVzIGlzIGFsbCBjdWVzIHRoYXQgYXJlIGN1cnJlbnRseSBzaG93aW5nXHJcbiAqIFNwZWMgZGVmOiByZWFkb25seSBhdHRyaWJ1dGUgVGV4dFRyYWNrQ3VlTGlzdCBhY3RpdmVDdWVzO1xyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuYWN0aXZlQ3Vlc187XHJcblxyXG4vKipcclxuICogR2V0IHRoZSB0cmFjayBhY3RpdmUgY3Vlc1xyXG4gKiBAcmV0dXJuIHtBcnJheX1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFjdGl2ZUN1ZXMgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB0aGlzLmFjdGl2ZUN1ZXNfO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlYWR5U3RhdGUgZGVzY3JpYmVzIGlmIHRoZSB0ZXh0IGZpbGUgaGFzIGJlZW4gbG9hZGVkXHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IE5PTkUgPSAwO1xyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBMT0FESU5HID0gMTtcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgTE9BREVEID0gMjtcclxuICogY29uc3QgdW5zaWduZWQgc2hvcnQgRVJST1IgPSAzO1xyXG4gKiByZWFkb25seSBhdHRyaWJ1dGUgdW5zaWduZWQgc2hvcnQgcmVhZHlTdGF0ZTtcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnJlYWR5U3RhdGVfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgcmVhZHlTdGF0ZVxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5yZWFkeVN0YXRlID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5yZWFkeVN0YXRlXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBNb2RlIGRlc2NyaWJlcyBpZiB0aGUgdHJhY2sgaXMgc2hvd2luZywgaGlkZGVuLCBvciBkaXNhYmxlZFxyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBPRkYgPSAwO1xyXG4gKiBjb25zdCB1bnNpZ25lZCBzaG9ydCBISURERU4gPSAxOyAoc3RpbGwgdHJpZ2dlcmluZyBjdWVjaGFuZ2UgZXZlbnRzLCBidXQgbm90IHZpc2libGUpXHJcbiAqIGNvbnN0IHVuc2lnbmVkIHNob3J0IFNIT1dJTkcgPSAyO1xyXG4gKiBhdHRyaWJ1dGUgdW5zaWduZWQgc2hvcnQgbW9kZTtcclxuICogQHByaXZhdGVcclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLm1vZGVfO1xyXG5cclxuLyoqXHJcbiAqIEdldCB0aGUgdHJhY2sgbW9kZVxyXG4gKiBAcmV0dXJuIHtOdW1iZXJ9XHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5tb2RlID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdGhpcy5tb2RlXztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGFuZ2UgdGhlIGZvbnQgc2l6ZSBvZiB0aGUgdGV4dCB0cmFjayB0byBtYWtlIGl0IGxhcmdlciB3aGVuIHBsYXlpbmcgaW4gZnVsbHNjcmVlbiBtb2RlXHJcbiAqIGFuZCByZXN0b3JlIGl0IHRvIGl0cyBub3JtYWwgc2l6ZSB3aGVuIG5vdCBpbiBmdWxsc2NyZWVuIG1vZGUuXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5hZGp1c3RGb250U2l6ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICBpZiAodGhpcy5wbGF5ZXJfLmlzRnVsbFNjcmVlbikge1xyXG4gICAgICAgIC8vIFNjYWxlIHRoZSBmb250IGJ5IHRoZSBzYW1lIGZhY3RvciBhcyBpbmNyZWFzaW5nIHRoZSB2aWRlbyB3aWR0aCB0byB0aGUgZnVsbCBzY3JlZW4gd2luZG93IHdpZHRoLlxyXG4gICAgICAgIC8vIEFkZGl0aW9uYWxseSwgbXVsdGlwbHkgdGhhdCBmYWN0b3IgYnkgMS40LCB3aGljaCBpcyB0aGUgZGVmYXVsdCBmb250IHNpemUgZm9yXHJcbiAgICAgICAgLy8gdGhlIGNhcHRpb24gdHJhY2sgKGZyb20gdGhlIENTUylcclxuICAgICAgICB0aGlzLmVsXy5zdHlsZS5mb250U2l6ZSA9IHNjcmVlbi53aWR0aCAvIHRoaXMucGxheWVyXy53aWR0aCgpICogMS40ICogMTAwICsgJyUnO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBDaGFuZ2UgdGhlIGZvbnQgc2l6ZSBvZiB0aGUgdGV4dCB0cmFjayBiYWNrIHRvIGl0cyBvcmlnaW5hbCBub24tZnVsbHNjcmVlbiBzaXplXHJcbiAgICAgICAgdGhpcy5lbF8uc3R5bGUuZm9udFNpemUgPSAnJztcclxuICAgIH1cclxufTtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGUgYmFzaWMgZGl2IHRvIGhvbGQgY3VlIHRleHRcclxuICogQHJldHVybiB7RWxlbWVudH1cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmNyZWF0ZUVsID0gZnVuY3Rpb24oKXtcclxuICByZXR1cm4gdmpzLkNvbXBvbmVudC5wcm90b3R5cGUuY3JlYXRlRWwuY2FsbCh0aGlzLCAnZGl2Jywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLScgKyB0aGlzLmtpbmRfICsgJyB2anMtdGV4dC10cmFjaydcclxuICB9KTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBTaG93OiBNb2RlIFNob3dpbmcgKDIpXHJcbiAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGFjdGl2ZS4gSWYgbm8gYXR0ZW1wdCBoYXMgeWV0IGJlZW4gbWFkZSB0byBvYnRhaW4gdGhlIHRyYWNrJ3MgY3VlcywgdGhlIHVzZXIgYWdlbnQgd2lsbCBwZXJmb3JtIHN1Y2ggYW4gYXR0ZW1wdCBtb21lbnRhcmlseS5cclxuICogVGhlIHVzZXIgYWdlbnQgaXMgbWFpbnRhaW5pbmcgYSBsaXN0IG9mIHdoaWNoIGN1ZXMgYXJlIGFjdGl2ZSwgYW5kIGV2ZW50cyBhcmUgYmVpbmcgZmlyZWQgYWNjb3JkaW5nbHkuXHJcbiAqIEluIGFkZGl0aW9uLCBmb3IgdGV4dCB0cmFja3Mgd2hvc2Uga2luZCBpcyBzdWJ0aXRsZXMgb3IgY2FwdGlvbnMsIHRoZSBjdWVzIGFyZSBiZWluZyBkaXNwbGF5ZWQgb3ZlciB0aGUgdmlkZW8gYXMgYXBwcm9wcmlhdGU7XHJcbiAqIGZvciB0ZXh0IHRyYWNrcyB3aG9zZSBraW5kIGlzIGRlc2NyaXB0aW9ucywgdGhlIHVzZXIgYWdlbnQgaXMgbWFraW5nIHRoZSBjdWVzIGF2YWlsYWJsZSB0byB0aGUgdXNlciBpbiBhIG5vbi12aXN1YWwgZmFzaGlvbjtcclxuICogYW5kIGZvciB0ZXh0IHRyYWNrcyB3aG9zZSBraW5kIGlzIGNoYXB0ZXJzLCB0aGUgdXNlciBhZ2VudCBpcyBtYWtpbmcgYXZhaWxhYmxlIHRvIHRoZSB1c2VyIGEgbWVjaGFuaXNtIGJ5IHdoaWNoIHRoZSB1c2VyIGNhbiBuYXZpZ2F0ZSB0byBhbnkgcG9pbnQgaW4gdGhlIG1lZGlhIHJlc291cmNlIGJ5IHNlbGVjdGluZyBhIGN1ZS5cclxuICogVGhlIHNob3dpbmcgYnkgZGVmYXVsdCBzdGF0ZSBpcyB1c2VkIGluIGNvbmp1bmN0aW9uIHdpdGggdGhlIGRlZmF1bHQgYXR0cmlidXRlIG9uIHRyYWNrIGVsZW1lbnRzIHRvIGluZGljYXRlIHRoYXQgdGhlIHRleHQgdHJhY2sgd2FzIGVuYWJsZWQgZHVlIHRvIHRoYXQgYXR0cmlidXRlLlxyXG4gKiBUaGlzIGFsbG93cyB0aGUgdXNlciBhZ2VudCB0byBvdmVycmlkZSB0aGUgc3RhdGUgaWYgYSBsYXRlciB0cmFjayBpcyBkaXNjb3ZlcmVkIHRoYXQgaXMgbW9yZSBhcHByb3ByaWF0ZSBwZXIgdGhlIHVzZXIncyBwcmVmZXJlbmNlcy5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnNob3cgPSBmdW5jdGlvbigpe1xyXG4gIHRoaXMuYWN0aXZhdGUoKTtcclxuXHJcbiAgdGhpcy5tb2RlXyA9IDI7XHJcblxyXG4gIC8vIFNob3cgZWxlbWVudC5cclxuICB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5zaG93LmNhbGwodGhpcyk7XHJcbn07XHJcblxyXG4vKipcclxuICogSGlkZTogTW9kZSBIaWRkZW4gKDEpXHJcbiAqIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGFjdGl2ZSwgYnV0IHRoYXQgdGhlIHVzZXIgYWdlbnQgaXMgbm90IGFjdGl2ZWx5IGRpc3BsYXlpbmcgdGhlIGN1ZXMuXHJcbiAqIElmIG5vIGF0dGVtcHQgaGFzIHlldCBiZWVuIG1hZGUgdG8gb2J0YWluIHRoZSB0cmFjaydzIGN1ZXMsIHRoZSB1c2VyIGFnZW50IHdpbGwgcGVyZm9ybSBzdWNoIGFuIGF0dGVtcHQgbW9tZW50YXJpbHkuXHJcbiAqIFRoZSB1c2VyIGFnZW50IGlzIG1haW50YWluaW5nIGEgbGlzdCBvZiB3aGljaCBjdWVzIGFyZSBhY3RpdmUsIGFuZCBldmVudHMgYXJlIGJlaW5nIGZpcmVkIGFjY29yZGluZ2x5LlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gV2hlbiBoaWRkZW4sIGN1ZXMgYXJlIHN0aWxsIHRyaWdnZXJlZC4gRGlzYWJsZSB0byBzdG9wIHRyaWdnZXJpbmcuXHJcbiAgdGhpcy5hY3RpdmF0ZSgpO1xyXG5cclxuICB0aGlzLm1vZGVfID0gMTtcclxuXHJcbiAgLy8gSGlkZSBlbGVtZW50LlxyXG4gIHZqcy5Db21wb25lbnQucHJvdG90eXBlLmhpZGUuY2FsbCh0aGlzKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBEaXNhYmxlOiBNb2RlIE9mZi9EaXNhYmxlICgwKVxyXG4gKiBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBpcyBub3QgYWN0aXZlLiBPdGhlciB0aGFuIGZvciB0aGUgcHVycG9zZXMgb2YgZXhwb3NpbmcgdGhlIHRyYWNrIGluIHRoZSBET00sIHRoZSB1c2VyIGFnZW50IGlzIGlnbm9yaW5nIHRoZSB0ZXh0IHRyYWNrLlxyXG4gKiBObyBjdWVzIGFyZSBhY3RpdmUsIG5vIGV2ZW50cyBhcmUgZmlyZWQsIGFuZCB0aGUgdXNlciBhZ2VudCB3aWxsIG5vdCBhdHRlbXB0IHRvIG9idGFpbiB0aGUgdHJhY2sncyBjdWVzLlxyXG4gKi9cclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUuZGlzYWJsZSA9IGZ1bmN0aW9uKCl7XHJcbiAgLy8gSWYgc2hvd2luZywgaGlkZS5cclxuICBpZiAodGhpcy5tb2RlXyA9PSAyKSB7IHRoaXMuaGlkZSgpOyB9XHJcblxyXG4gIC8vIFN0b3AgdHJpZ2dlcmluZyBjdWVzXHJcbiAgdGhpcy5kZWFjdGl2YXRlKCk7XHJcblxyXG4gIC8vIFN3aXRjaCBNb2RlIHRvIE9mZlxyXG4gIHRoaXMubW9kZV8gPSAwO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR1cm4gb24gY3VlIHRyYWNraW5nLiBUcmFja3MgdGhhdCBhcmUgc2hvd2luZyBPUiBoaWRkZW4gYXJlIGFjdGl2ZS5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmFjdGl2YXRlID0gZnVuY3Rpb24oKXtcclxuICAvLyBMb2FkIHRleHQgZmlsZSBpZiBpdCBoYXNuJ3QgYmVlbiB5ZXQuXHJcbiAgaWYgKHRoaXMucmVhZHlTdGF0ZV8gPT09IDApIHsgdGhpcy5sb2FkKCk7IH1cclxuXHJcbiAgLy8gT25seSBhY3RpdmF0ZSBpZiBub3QgYWxyZWFkeSBhY3RpdmUuXHJcbiAgaWYgKHRoaXMubW9kZV8gPT09IDApIHtcclxuICAgIC8vIFVwZGF0ZSBjdXJyZW50IGN1ZSBvbiB0aW1ldXBkYXRlXHJcbiAgICAvLyBVc2luZyB1bmlxdWUgSUQgZm9yIGJpbmQgZnVuY3Rpb24gc28gb3RoZXIgdHJhY2tzIGRvbid0IHJlbW92ZSBsaXN0ZW5lclxyXG4gICAgdGhpcy5wbGF5ZXJfLm9uKCd0aW1ldXBkYXRlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUsIHRoaXMuaWRfKSk7XHJcblxyXG4gICAgLy8gUmVzZXQgY3VlIHRpbWUgb24gbWVkaWEgZW5kXHJcbiAgICB0aGlzLnBsYXllcl8ub24oJ2VuZGVkJywgdmpzLmJpbmQodGhpcywgdGhpcy5yZXNldCwgdGhpcy5pZF8pKTtcclxuXHJcbiAgICAvLyBBZGQgdG8gZGlzcGxheVxyXG4gICAgaWYgKHRoaXMua2luZF8gPT09ICdjYXB0aW9ucycgfHwgdGhpcy5raW5kXyA9PT0gJ3N1YnRpdGxlcycpIHtcclxuICAgICAgdGhpcy5wbGF5ZXJfLmdldENoaWxkKCd0ZXh0VHJhY2tEaXNwbGF5JykuYWRkQ2hpbGQodGhpcyk7XHJcbiAgICB9XHJcbiAgfVxyXG59O1xyXG5cclxuLyoqXHJcbiAqIFR1cm4gb2ZmIGN1ZSB0cmFja2luZy5cclxuICovXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmRlYWN0aXZhdGUgPSBmdW5jdGlvbigpe1xyXG4gIC8vIFVzaW5nIHVuaXF1ZSBJRCBmb3IgYmluZCBmdW5jdGlvbiBzbyBvdGhlciB0cmFja3MgZG9uJ3QgcmVtb3ZlIGxpc3RlbmVyXHJcbiAgdGhpcy5wbGF5ZXJfLm9mZigndGltZXVwZGF0ZScsIHZqcy5iaW5kKHRoaXMsIHRoaXMudXBkYXRlLCB0aGlzLmlkXykpO1xyXG4gIHRoaXMucGxheWVyXy5vZmYoJ2VuZGVkJywgdmpzLmJpbmQodGhpcywgdGhpcy5yZXNldCwgdGhpcy5pZF8pKTtcclxuICB0aGlzLnJlc2V0KCk7IC8vIFJlc2V0XHJcblxyXG4gIC8vIFJlbW92ZSBmcm9tIGRpc3BsYXlcclxuICB0aGlzLnBsYXllcl8uZ2V0Q2hpbGQoJ3RleHRUcmFja0Rpc3BsYXknKS5yZW1vdmVDaGlsZCh0aGlzKTtcclxufTtcclxuXHJcbi8vIEEgcmVhZGluZXNzIHN0YXRlXHJcbi8vIE9uZSBvZiB0aGUgZm9sbG93aW5nOlxyXG4vL1xyXG4vLyBOb3QgbG9hZGVkXHJcbi8vIEluZGljYXRlcyB0aGF0IHRoZSB0ZXh0IHRyYWNrIGlzIGtub3duIHRvIGV4aXN0IChlLmcuIGl0IGhhcyBiZWVuIGRlY2xhcmVkIHdpdGggYSB0cmFjayBlbGVtZW50KSwgYnV0IGl0cyBjdWVzIGhhdmUgbm90IGJlZW4gb2J0YWluZWQuXHJcbi8vXHJcbi8vIExvYWRpbmdcclxuLy8gSW5kaWNhdGVzIHRoYXQgdGhlIHRleHQgdHJhY2sgaXMgbG9hZGluZyBhbmQgdGhlcmUgaGF2ZSBiZWVuIG5vIGZhdGFsIGVycm9ycyBlbmNvdW50ZXJlZCBzbyBmYXIuIEZ1cnRoZXIgY3VlcyBtaWdodCBzdGlsbCBiZSBhZGRlZCB0byB0aGUgdHJhY2suXHJcbi8vXHJcbi8vIExvYWRlZFxyXG4vLyBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayBoYXMgYmVlbiBsb2FkZWQgd2l0aCBubyBmYXRhbCBlcnJvcnMuIE5vIG5ldyBjdWVzIHdpbGwgYmUgYWRkZWQgdG8gdGhlIHRyYWNrIGV4Y2VwdCBpZiB0aGUgdGV4dCB0cmFjayBjb3JyZXNwb25kcyB0byBhIE11dGFibGVUZXh0VHJhY2sgb2JqZWN0LlxyXG4vL1xyXG4vLyBGYWlsZWQgdG8gbG9hZFxyXG4vLyBJbmRpY2F0ZXMgdGhhdCB0aGUgdGV4dCB0cmFjayB3YXMgZW5hYmxlZCwgYnV0IHdoZW4gdGhlIHVzZXIgYWdlbnQgYXR0ZW1wdGVkIHRvIG9idGFpbiBpdCwgdGhpcyBmYWlsZWQgaW4gc29tZSB3YXkgKGUuZy4gVVJMIGNvdWxkIG5vdCBiZSByZXNvbHZlZCwgbmV0d29yayBlcnJvciwgdW5rbm93biB0ZXh0IHRyYWNrIGZvcm1hdCkuIFNvbWUgb3IgYWxsIG9mIHRoZSBjdWVzIGFyZSBsaWtlbHkgbWlzc2luZyBhbmQgd2lsbCBub3QgYmUgb2J0YWluZWQuXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbigpe1xyXG5cclxuICAvLyBPbmx5IGxvYWQgaWYgbm90IGxvYWRlZCB5ZXQuXHJcbiAgaWYgKHRoaXMucmVhZHlTdGF0ZV8gPT09IDApIHtcclxuICAgIHRoaXMucmVhZHlTdGF0ZV8gPSAxO1xyXG4gICAgdmpzLmdldCh0aGlzLnNyY18sIHZqcy5iaW5kKHRoaXMsIHRoaXMucGFyc2VDdWVzKSwgdmpzLmJpbmQodGhpcywgdGhpcy5vbkVycm9yKSk7XHJcbiAgfVxyXG5cclxufTtcclxuXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLm9uRXJyb3IgPSBmdW5jdGlvbihlcnIpe1xyXG4gIHRoaXMuZXJyb3IgPSBlcnI7XHJcbiAgdGhpcy5yZWFkeVN0YXRlXyA9IDM7XHJcbiAgdGhpcy50cmlnZ2VyKCdlcnJvcicpO1xyXG59O1xyXG5cclxuLy8gUGFyc2UgdGhlIFdlYlZUVCB0ZXh0IGZvcm1hdCBmb3IgY3VlIHRpbWVzLlxyXG4vLyBUT0RPOiBTZXBhcmF0ZSBwYXJzZXIgaW50byBvd24gY2xhc3Mgc28gYWx0ZXJuYXRpdmUgdGltZWQgdGV4dCBmb3JtYXRzIGNhbiBiZSB1c2VkLiAoVFRNTCwgREZYUClcclxudmpzLlRleHRUcmFjay5wcm90b3R5cGUucGFyc2VDdWVzID0gZnVuY3Rpb24oc3JjQ29udGVudCkge1xyXG4gIHZhciBjdWUsIHRpbWUsIHRleHQsXHJcbiAgICAgIGxpbmVzID0gc3JjQ29udGVudC5zcGxpdCgnXFxuJyksXHJcbiAgICAgIGxpbmUgPSAnJywgaWQ7XHJcblxyXG4gIGZvciAodmFyIGk9MSwgaj1saW5lcy5sZW5ndGg7IGk8ajsgaSsrKSB7XHJcbiAgICAvLyBMaW5lIDAgc2hvdWxkIGJlICdXRUJWVFQnLCBzbyBza2lwcGluZyBpPTBcclxuXHJcbiAgICBsaW5lID0gdmpzLnRyaW0obGluZXNbaV0pOyAvLyBUcmltIHdoaXRlc3BhY2UgYW5kIGxpbmVicmVha3NcclxuXHJcbiAgICBpZiAobGluZSkgeyAvLyBMb29wIHVudGlsIGEgbGluZSB3aXRoIGNvbnRlbnRcclxuXHJcbiAgICAgIC8vIEZpcnN0IGxpbmUgY291bGQgYmUgYW4gb3B0aW9uYWwgY3VlIElEXHJcbiAgICAgIC8vIENoZWNrIGlmIGxpbmUgaGFzIHRoZSB0aW1lIHNlcGFyYXRvclxyXG4gICAgICBpZiAobGluZS5pbmRleE9mKCctLT4nKSA9PSAtMSkge1xyXG4gICAgICAgIGlkID0gbGluZTtcclxuICAgICAgICAvLyBBZHZhbmNlIHRvIG5leHQgbGluZSBmb3IgdGltaW5nLlxyXG4gICAgICAgIGxpbmUgPSB2anMudHJpbShsaW5lc1srK2ldKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBpZCA9IHRoaXMuY3Vlc18ubGVuZ3RoO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBGaXJzdCBsaW5lIC0gTnVtYmVyXHJcbiAgICAgIGN1ZSA9IHtcclxuICAgICAgICBpZDogaWQsIC8vIEN1ZSBOdW1iZXJcclxuICAgICAgICBpbmRleDogdGhpcy5jdWVzXy5sZW5ndGggLy8gUG9zaXRpb24gaW4gQXJyYXlcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIFRpbWluZyBsaW5lXHJcbiAgICAgIHRpbWUgPSBsaW5lLnNwbGl0KCcgLS0+ICcpO1xyXG4gICAgICBjdWUuc3RhcnRUaW1lID0gdGhpcy5wYXJzZUN1ZVRpbWUodGltZVswXSk7XHJcbiAgICAgIGN1ZS5lbmRUaW1lID0gdGhpcy5wYXJzZUN1ZVRpbWUodGltZVsxXSk7XHJcblxyXG4gICAgICAvLyBBZGRpdGlvbmFsIGxpbmVzIC0gQ3VlIFRleHRcclxuICAgICAgdGV4dCA9IFtdO1xyXG5cclxuICAgICAgLy8gTG9vcCB1bnRpbCBhIGJsYW5rIGxpbmUgb3IgZW5kIG9mIGxpbmVzXHJcbiAgICAgIC8vIEFzc3VtZWluZyB0cmltKCcnKSByZXR1cm5zIGZhbHNlIGZvciBibGFuayBsaW5lc1xyXG4gICAgICB3aGlsZSAobGluZXNbKytpXSAmJiAobGluZSA9IHZqcy50cmltKGxpbmVzW2ldKSkpIHtcclxuICAgICAgICB0ZXh0LnB1c2gobGluZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGN1ZS50ZXh0ID0gdGV4dC5qb2luKCc8YnIvPicpO1xyXG5cclxuICAgICAgLy8gQWRkIHRoaXMgY3VlXHJcbiAgICAgIHRoaXMuY3Vlc18ucHVzaChjdWUpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgdGhpcy5yZWFkeVN0YXRlXyA9IDI7XHJcbiAgdGhpcy50cmlnZ2VyKCdsb2FkZWQnKTtcclxufTtcclxuXHJcblxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS5wYXJzZUN1ZVRpbWUgPSBmdW5jdGlvbih0aW1lVGV4dCkge1xyXG4gIHZhciBwYXJ0cyA9IHRpbWVUZXh0LnNwbGl0KCc6JyksXHJcbiAgICAgIHRpbWUgPSAwLFxyXG4gICAgICBob3VycywgbWludXRlcywgb3RoZXIsIHNlY29uZHMsIG1zO1xyXG5cclxuICAvLyBDaGVjayBpZiBvcHRpb25hbCBob3VycyBwbGFjZSBpcyBpbmNsdWRlZFxyXG4gIC8vIDAwOjAwOjAwLjAwMCB2cy4gMDA6MDAuMDAwXHJcbiAgaWYgKHBhcnRzLmxlbmd0aCA9PSAzKSB7XHJcbiAgICBob3VycyA9IHBhcnRzWzBdO1xyXG4gICAgbWludXRlcyA9IHBhcnRzWzFdO1xyXG4gICAgb3RoZXIgPSBwYXJ0c1syXTtcclxuICB9IGVsc2Uge1xyXG4gICAgaG91cnMgPSAwO1xyXG4gICAgbWludXRlcyA9IHBhcnRzWzBdO1xyXG4gICAgb3RoZXIgPSBwYXJ0c1sxXTtcclxuICB9XHJcblxyXG4gIC8vIEJyZWFrIG90aGVyIChzZWNvbmRzLCBtaWxsaXNlY29uZHMsIGFuZCBmbGFncykgYnkgc3BhY2VzXHJcbiAgLy8gVE9ETzogTWFrZSBhZGRpdGlvbmFsIGN1ZSBsYXlvdXQgc2V0dGluZ3Mgd29yayB3aXRoIGZsYWdzXHJcbiAgb3RoZXIgPSBvdGhlci5zcGxpdCgvXFxzKy8pO1xyXG4gIC8vIFJlbW92ZSBzZWNvbmRzLiBTZWNvbmRzIGlzIHRoZSBmaXJzdCBwYXJ0IGJlZm9yZSBhbnkgc3BhY2VzLlxyXG4gIHNlY29uZHMgPSBvdGhlci5zcGxpY2UoMCwxKVswXTtcclxuICAvLyBDb3VsZCB1c2UgZWl0aGVyIC4gb3IgLCBmb3IgZGVjaW1hbFxyXG4gIHNlY29uZHMgPSBzZWNvbmRzLnNwbGl0KC9cXC58LC8pO1xyXG4gIC8vIEdldCBtaWxsaXNlY29uZHNcclxuICBtcyA9IHBhcnNlRmxvYXQoc2Vjb25kc1sxXSk7XHJcbiAgc2Vjb25kcyA9IHNlY29uZHNbMF07XHJcblxyXG4gIC8vIGhvdXJzID0+IHNlY29uZHNcclxuICB0aW1lICs9IHBhcnNlRmxvYXQoaG91cnMpICogMzYwMDtcclxuICAvLyBtaW51dGVzID0+IHNlY29uZHNcclxuICB0aW1lICs9IHBhcnNlRmxvYXQobWludXRlcykgKiA2MDtcclxuICAvLyBBZGQgc2Vjb25kc1xyXG4gIHRpbWUgKz0gcGFyc2VGbG9hdChzZWNvbmRzKTtcclxuICAvLyBBZGQgbWlsbGlzZWNvbmRzXHJcbiAgaWYgKG1zKSB7IHRpbWUgKz0gbXMvMTAwMDsgfVxyXG5cclxuICByZXR1cm4gdGltZTtcclxufTtcclxuXHJcbi8vIFVwZGF0ZSBhY3RpdmUgY3VlcyB3aGVuZXZlciB0aW1ldXBkYXRlIGV2ZW50cyBhcmUgdHJpZ2dlcmVkIG9uIHRoZSBwbGF5ZXIuXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgaWYgKHRoaXMuY3Vlc18ubGVuZ3RoID4gMCkge1xyXG5cclxuICAgIC8vIEdldCBjdXJlbnQgcGxheWVyIHRpbWVcclxuICAgIHZhciB0aW1lID0gdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKCk7XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIG5ldyB0aW1lIGlzIG91dHNpZGUgdGhlIHRpbWUgYm94IGNyZWF0ZWQgYnkgdGhlIHRoZSBsYXN0IHVwZGF0ZS5cclxuICAgIGlmICh0aGlzLnByZXZDaGFuZ2UgPT09IHVuZGVmaW5lZCB8fCB0aW1lIDwgdGhpcy5wcmV2Q2hhbmdlIHx8IHRoaXMubmV4dENoYW5nZSA8PSB0aW1lKSB7XHJcbiAgICAgIHZhciBjdWVzID0gdGhpcy5jdWVzXyxcclxuXHJcbiAgICAgICAgICAvLyBDcmVhdGUgYSBuZXcgdGltZSBib3ggZm9yIHRoaXMgc3RhdGUuXHJcbiAgICAgICAgICBuZXdOZXh0Q2hhbmdlID0gdGhpcy5wbGF5ZXJfLmR1cmF0aW9uKCksIC8vIFN0YXJ0IGF0IGJlZ2lubmluZyBvZiB0aGUgdGltZWxpbmVcclxuICAgICAgICAgIG5ld1ByZXZDaGFuZ2UgPSAwLCAvLyBTdGFydCBhdCBlbmRcclxuXHJcbiAgICAgICAgICByZXZlcnNlID0gZmFsc2UsIC8vIFNldCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBsb29wIHRocm91Z2ggdGhlIGN1ZXMuIE9wdGltaXplZCB0aGUgY3VlIGNoZWNrLlxyXG4gICAgICAgICAgbmV3Q3VlcyA9IFtdLCAvLyBTdG9yZSBuZXcgYWN0aXZlIGN1ZXMuXHJcblxyXG4gICAgICAgICAgLy8gU3RvcmUgd2hlcmUgaW4gdGhlIGxvb3AgdGhlIGN1cnJlbnQgYWN0aXZlIGN1ZXMgYXJlLCB0byBwcm92aWRlIGEgc21hcnQgc3RhcnRpbmcgcG9pbnQgZm9yIHRoZSBuZXh0IGxvb3AuXHJcbiAgICAgICAgICBmaXJzdEFjdGl2ZUluZGV4LCBsYXN0QWN0aXZlSW5kZXgsXHJcbiAgICAgICAgICBjdWUsIGk7IC8vIExvb3AgdmFyc1xyXG5cclxuICAgICAgLy8gQ2hlY2sgaWYgdGltZSBpcyBnb2luZyBmb3J3YXJkcyBvciBiYWNrd2FyZHMgKHNjcnViYmluZy9yZXdpbmRpbmcpXHJcbiAgICAgIC8vIElmIHdlIGtub3cgdGhlIGRpcmVjdGlvbiB3ZSBjYW4gb3B0aW1pemUgdGhlIHN0YXJ0aW5nIHBvc2l0aW9uIGFuZCBkaXJlY3Rpb24gb2YgdGhlIGxvb3AgdGhyb3VnaCB0aGUgY3VlcyBhcnJheS5cclxuICAgICAgaWYgKHRpbWUgPj0gdGhpcy5uZXh0Q2hhbmdlIHx8IHRoaXMubmV4dENoYW5nZSA9PT0gdW5kZWZpbmVkKSB7IC8vIE5leHRDaGFuZ2Ugc2hvdWxkIGhhcHBlblxyXG4gICAgICAgIC8vIEZvcndhcmRzLCBzbyBzdGFydCBhdCB0aGUgaW5kZXggb2YgdGhlIGZpcnN0IGFjdGl2ZSBjdWUgYW5kIGxvb3AgZm9yd2FyZFxyXG4gICAgICAgIGkgPSAodGhpcy5maXJzdEFjdGl2ZUluZGV4ICE9PSB1bmRlZmluZWQpID8gdGhpcy5maXJzdEFjdGl2ZUluZGV4IDogMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBCYWNrd2FyZHMsIHNvIHN0YXJ0IGF0IHRoZSBpbmRleCBvZiB0aGUgbGFzdCBhY3RpdmUgY3VlIGFuZCBsb29wIGJhY2t3YXJkXHJcbiAgICAgICAgcmV2ZXJzZSA9IHRydWU7XHJcbiAgICAgICAgaSA9ICh0aGlzLmxhc3RBY3RpdmVJbmRleCAhPT0gdW5kZWZpbmVkKSA/IHRoaXMubGFzdEFjdGl2ZUluZGV4IDogY3Vlcy5sZW5ndGggLSAxO1xyXG4gICAgICB9XHJcblxyXG4gICAgICB3aGlsZSAodHJ1ZSkgeyAvLyBMb29wIHVudGlsIGJyb2tlblxyXG4gICAgICAgIGN1ZSA9IGN1ZXNbaV07XHJcblxyXG4gICAgICAgIC8vIEN1ZSBlbmRlZCBhdCB0aGlzIHBvaW50XHJcbiAgICAgICAgaWYgKGN1ZS5lbmRUaW1lIDw9IHRpbWUpIHtcclxuICAgICAgICAgIG5ld1ByZXZDaGFuZ2UgPSBNYXRoLm1heChuZXdQcmV2Q2hhbmdlLCBjdWUuZW5kVGltZSk7XHJcblxyXG4gICAgICAgICAgaWYgKGN1ZS5hY3RpdmUpIHtcclxuICAgICAgICAgICAgY3VlLmFjdGl2ZSA9IGZhbHNlO1xyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIC8vIE5vIGVhcmxpZXIgY3VlcyBzaG91bGQgaGF2ZSBhbiBhY3RpdmUgc3RhcnQgdGltZS5cclxuICAgICAgICAgIC8vIE5ldmVybWluZC4gQXNzdW1lIGZpcnN0IGN1ZSBjb3VsZCBoYXZlIGEgZHVyYXRpb24gdGhlIHNhbWUgYXMgdGhlIHZpZGVvLlxyXG4gICAgICAgICAgLy8gSW4gdGhhdCBjYXNlIHdlIG5lZWQgdG8gbG9vcCBhbGwgdGhlIHdheSBiYWNrIHRvIHRoZSBiZWdpbm5pbmcuXHJcbiAgICAgICAgICAvLyBpZiAocmV2ZXJzZSAmJiBjdWUuc3RhcnRUaW1lKSB7IGJyZWFrOyB9XHJcblxyXG4gICAgICAgIC8vIEN1ZSBoYXNuJ3Qgc3RhcnRlZFxyXG4gICAgICAgIH0gZWxzZSBpZiAodGltZSA8IGN1ZS5zdGFydFRpbWUpIHtcclxuICAgICAgICAgIG5ld05leHRDaGFuZ2UgPSBNYXRoLm1pbihuZXdOZXh0Q2hhbmdlLCBjdWUuc3RhcnRUaW1lKTtcclxuXHJcbiAgICAgICAgICBpZiAoY3VlLmFjdGl2ZSkge1xyXG4gICAgICAgICAgICBjdWUuYWN0aXZlID0gZmFsc2U7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgLy8gTm8gbGF0ZXIgY3VlcyBzaG91bGQgaGF2ZSBhbiBhY3RpdmUgc3RhcnQgdGltZS5cclxuICAgICAgICAgIGlmICghcmV2ZXJzZSkgeyBicmVhazsgfVxyXG5cclxuICAgICAgICAvLyBDdWUgaXMgY3VycmVudFxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgaWYgKHJldmVyc2UpIHtcclxuICAgICAgICAgICAgLy8gQWRkIGN1ZSB0byBmcm9udCBvZiBhcnJheSB0byBrZWVwIGluIHRpbWUgb3JkZXJcclxuICAgICAgICAgICAgbmV3Q3Vlcy5zcGxpY2UoMCwwLGN1ZSk7XHJcblxyXG4gICAgICAgICAgICAvLyBJZiBpbiByZXZlcnNlLCB0aGUgZmlyc3QgY3VycmVudCBjdWUgaXMgb3VyIGxhc3RBY3RpdmVDdWVcclxuICAgICAgICAgICAgaWYgKGxhc3RBY3RpdmVJbmRleCA9PT0gdW5kZWZpbmVkKSB7IGxhc3RBY3RpdmVJbmRleCA9IGk7IH1cclxuICAgICAgICAgICAgZmlyc3RBY3RpdmVJbmRleCA9IGk7XHJcbiAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBBZGQgY3VlIHRvIGVuZCBvZiBhcnJheVxyXG4gICAgICAgICAgICBuZXdDdWVzLnB1c2goY3VlKTtcclxuXHJcbiAgICAgICAgICAgIC8vIElmIGZvcndhcmQsIHRoZSBmaXJzdCBjdXJyZW50IGN1ZSBpcyBvdXIgZmlyc3RBY3RpdmVJbmRleFxyXG4gICAgICAgICAgICBpZiAoZmlyc3RBY3RpdmVJbmRleCA9PT0gdW5kZWZpbmVkKSB7IGZpcnN0QWN0aXZlSW5kZXggPSBpOyB9XHJcbiAgICAgICAgICAgIGxhc3RBY3RpdmVJbmRleCA9IGk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgbmV3TmV4dENoYW5nZSA9IE1hdGgubWluKG5ld05leHRDaGFuZ2UsIGN1ZS5lbmRUaW1lKTtcclxuICAgICAgICAgIG5ld1ByZXZDaGFuZ2UgPSBNYXRoLm1heChuZXdQcmV2Q2hhbmdlLCBjdWUuc3RhcnRUaW1lKTtcclxuXHJcbiAgICAgICAgICBjdWUuYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXZlcnNlKSB7XHJcbiAgICAgICAgICAvLyBSZXZlcnNlIGRvd24gdGhlIGFycmF5IG9mIGN1ZXMsIGJyZWFrIGlmIGF0IGZpcnN0XHJcbiAgICAgICAgICBpZiAoaSA9PT0gMCkgeyBicmVhazsgfSBlbHNlIHsgaS0tOyB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC8vIFdhbGsgdXAgdGhlIGFycmF5IGZvIGN1ZXMsIGJyZWFrIGlmIGF0IGxhc3RcclxuICAgICAgICAgIGlmIChpID09PSBjdWVzLmxlbmd0aCAtIDEpIHsgYnJlYWs7IH0gZWxzZSB7IGkrKzsgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYWN0aXZlQ3Vlc18gPSBuZXdDdWVzO1xyXG4gICAgICB0aGlzLm5leHRDaGFuZ2UgPSBuZXdOZXh0Q2hhbmdlO1xyXG4gICAgICB0aGlzLnByZXZDaGFuZ2UgPSBuZXdQcmV2Q2hhbmdlO1xyXG4gICAgICB0aGlzLmZpcnN0QWN0aXZlSW5kZXggPSBmaXJzdEFjdGl2ZUluZGV4O1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVJbmRleCA9IGxhc3RBY3RpdmVJbmRleDtcclxuXHJcbiAgICAgIHRoaXMudXBkYXRlRGlzcGxheSgpO1xyXG5cclxuICAgICAgdGhpcy50cmlnZ2VyKCdjdWVjaGFuZ2UnKTtcclxuICAgIH1cclxuICB9XHJcbn07XHJcblxyXG4vLyBBZGQgY3VlIEhUTUwgdG8gZGlzcGxheVxyXG52anMuVGV4dFRyYWNrLnByb3RvdHlwZS51cGRhdGVEaXNwbGF5ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgY3VlcyA9IHRoaXMuYWN0aXZlQ3Vlc18sXHJcbiAgICAgIGh0bWwgPSAnJyxcclxuICAgICAgaT0wLGo9Y3Vlcy5sZW5ndGg7XHJcblxyXG4gIGZvciAoO2k8ajtpKyspIHtcclxuICAgIGh0bWwgKz0gJzxzcGFuIGNsYXNzPVwidmpzLXR0LWN1ZVwiPicrY3Vlc1tpXS50ZXh0Kyc8L3NwYW4+JztcclxuICB9XHJcblxyXG4gIHRoaXMuZWxfLmlubmVySFRNTCA9IGh0bWw7XHJcbn07XHJcblxyXG4vLyBTZXQgYWxsIGxvb3AgaGVscGVyIHZhbHVlcyBiYWNrXHJcbnZqcy5UZXh0VHJhY2sucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24oKXtcclxuICB0aGlzLm5leHRDaGFuZ2UgPSAwO1xyXG4gIHRoaXMucHJldkNoYW5nZSA9IHRoaXMucGxheWVyXy5kdXJhdGlvbigpO1xyXG4gIHRoaXMuZmlyc3RBY3RpdmVJbmRleCA9IDA7XHJcbiAgdGhpcy5sYXN0QWN0aXZlSW5kZXggPSAwO1xyXG59O1xyXG5cclxuLy8gQ3JlYXRlIHNwZWNpZmljIHRyYWNrIHR5cGVzXHJcbi8qKlxyXG4gKiBUaGUgdHJhY2sgY29tcG9uZW50IGZvciBtYW5hZ2luZyB0aGUgaGlkaW5nIGFuZCBzaG93aW5nIG9mIGNhcHRpb25zXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNhcHRpb25zVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xyXG52anMuQ2FwdGlvbnNUcmFjay5wcm90b3R5cGUua2luZF8gPSAnY2FwdGlvbnMnO1xyXG4vLyBFeHBvcnRpbmcgaGVyZSBiZWNhdXNlIFRyYWNrIGNyZWF0aW9uIHJlcXVpcmVzIHRoZSB0cmFjayBraW5kXHJcbi8vIHRvIGJlIGF2YWlsYWJsZSBvbiBnbG9iYWwgb2JqZWN0LiBlLmcuIG5ldyB3aW5kb3dbJ3ZpZGVvanMnXVtLaW5kICsgJ1RyYWNrJ11cclxuXHJcbi8qKlxyXG4gKiBUaGUgdHJhY2sgY29tcG9uZW50IGZvciBtYW5hZ2luZyB0aGUgaGlkaW5nIGFuZCBzaG93aW5nIG9mIHN1YnRpdGxlc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TdWJ0aXRsZXNUcmFjayA9IHZqcy5UZXh0VHJhY2suZXh0ZW5kKCk7XHJcbnZqcy5TdWJ0aXRsZXNUcmFjay5wcm90b3R5cGUua2luZF8gPSAnc3VidGl0bGVzJztcclxuXHJcbi8qKlxyXG4gKiBUaGUgdHJhY2sgY29tcG9uZW50IGZvciBtYW5hZ2luZyB0aGUgaGlkaW5nIGFuZCBzaG93aW5nIG9mIGNoYXB0ZXJzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNoYXB0ZXJzVHJhY2sgPSB2anMuVGV4dFRyYWNrLmV4dGVuZCgpO1xyXG52anMuQ2hhcHRlcnNUcmFjay5wcm90b3R5cGUua2luZF8gPSAnY2hhcHRlcnMnO1xyXG5cclxuXHJcbi8qIFRleHQgVHJhY2sgRGlzcGxheVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4vLyBHbG9iYWwgY29udGFpbmVyIGZvciBib3RoIHN1YnRpdGxlIGFuZCBjYXB0aW9ucyB0ZXh0LiBTaW1wbGUgZGl2IGNvbnRhaW5lci5cclxuXHJcbi8qKlxyXG4gKiBUaGUgY29tcG9uZW50IGZvciBkaXNwbGF5aW5nIHRleHQgdHJhY2sgY3Vlc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5UZXh0VHJhY2tEaXNwbGF5ID0gdmpzLkNvbXBvbmVudC5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuXHJcbiAgICAvLyBUaGlzIHVzZWQgdG8gYmUgY2FsbGVkIGR1cmluZyBwbGF5ZXIgaW5pdCwgYnV0IHdhcyBjYXVzaW5nIGFuIGVycm9yXHJcbiAgICAvLyBpZiBhIHRyYWNrIHNob3VsZCBzaG93IGJ5IGRlZmF1bHQgYW5kIHRoZSBkaXNwbGF5IGhhZG4ndCBsb2FkZWQgeWV0LlxyXG4gICAgLy8gU2hvdWxkIHByb2JhYmx5IGJlIG1vdmVkIHRvIGFuIGV4dGVybmFsIHRyYWNrIGxvYWRlciB3aGVuIHdlIHN1cHBvcnRcclxuICAgIC8vIHRyYWNrcyB0aGF0IGRvbid0IG5lZWQgYSBkaXNwbGF5LlxyXG4gICAgaWYgKHBsYXllci5vcHRpb25zX1sndHJhY2tzJ10gJiYgcGxheWVyLm9wdGlvbnNfWyd0cmFja3MnXS5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHRoaXMucGxheWVyXy5hZGRUZXh0VHJhY2tzKHBsYXllci5vcHRpb25zX1sndHJhY2tzJ10pO1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcblxyXG52anMuVGV4dFRyYWNrRGlzcGxheS5wcm90b3R5cGUuY3JlYXRlRWwgPSBmdW5jdGlvbigpe1xyXG4gIHJldHVybiB2anMuQ29tcG9uZW50LnByb3RvdHlwZS5jcmVhdGVFbC5jYWxsKHRoaXMsICdkaXYnLCB7XHJcbiAgICBjbGFzc05hbWU6ICd2anMtdGV4dC10cmFjay1kaXNwbGF5J1xyXG4gIH0pO1xyXG59O1xyXG5cclxuXHJcbi8qKlxyXG4gKiBUaGUgc3BlY2lmaWMgbWVudSBpdGVtIHR5cGUgZm9yIHNlbGVjdGluZyBhIGxhbmd1YWdlIHdpdGhpbiBhIHRleHQgdHJhY2sga2luZFxyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5UZXh0VHJhY2tNZW51SXRlbSA9IHZqcy5NZW51SXRlbS5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmFyIHRyYWNrID0gdGhpcy50cmFjayA9IG9wdGlvbnNbJ3RyYWNrJ107XHJcblxyXG4gICAgLy8gTW9kaWZ5IG9wdGlvbnMgZm9yIHBhcmVudCBNZW51SXRlbSBjbGFzcydzIGluaXQuXHJcbiAgICBvcHRpb25zWydsYWJlbCddID0gdHJhY2subGFiZWwoKTtcclxuICAgIG9wdGlvbnNbJ3NlbGVjdGVkJ10gPSB0cmFjay5kZmx0KCk7XHJcbiAgICB2anMuTWVudUl0ZW0uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG5cclxuICAgIHRoaXMucGxheWVyXy5vbih0cmFjay5raW5kKCkgKyAndHJhY2tjaGFuZ2UnLCB2anMuYmluZCh0aGlzLCB0aGlzLnVwZGF0ZSkpO1xyXG4gIH1cclxufSk7XHJcblxyXG52anMuVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2sgPSBmdW5jdGlvbigpe1xyXG4gIHZqcy5NZW51SXRlbS5wcm90b3R5cGUub25DbGljay5jYWxsKHRoaXMpO1xyXG4gIHRoaXMucGxheWVyXy5zaG93VGV4dFRyYWNrKHRoaXMudHJhY2suaWRfLCB0aGlzLnRyYWNrLmtpbmQoKSk7XHJcbn07XHJcblxyXG52anMuVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdGhpcy5zZWxlY3RlZCh0aGlzLnRyYWNrLm1vZGUoKSA9PSAyKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBIHNwZWNpYWwgbWVudSBpdGVtIGZvciB0dXJuaW5nIG9mIGEgc3BlY2lmaWMgdHlwZSBvZiB0ZXh0IHRyYWNrXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLk9mZlRleHRUcmFja01lbnVJdGVtID0gdmpzLlRleHRUcmFja01lbnVJdGVtLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucyl7XHJcbiAgICAvLyBDcmVhdGUgcHNldWRvIHRyYWNrIGluZm9cclxuICAgIC8vIFJlcXVpcmVzIG9wdGlvbnNbJ2tpbmQnXVxyXG4gICAgb3B0aW9uc1sndHJhY2snXSA9IHtcclxuICAgICAga2luZDogZnVuY3Rpb24oKSB7IHJldHVybiBvcHRpb25zWydraW5kJ107IH0sXHJcbiAgICAgIHBsYXllcjogcGxheWVyLFxyXG4gICAgICBsYWJlbDogZnVuY3Rpb24oKXsgcmV0dXJuIG9wdGlvbnNbJ2tpbmQnXSArICcgb2ZmJzsgfSxcclxuICAgICAgZGZsdDogZnVuY3Rpb24oKXsgcmV0dXJuIGZhbHNlOyB9LFxyXG4gICAgICBtb2RlOiBmdW5jdGlvbigpeyByZXR1cm4gZmFsc2U7IH1cclxuICAgIH07XHJcbiAgICB2anMuVGV4dFRyYWNrTWVudUl0ZW0uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4gICAgdGhpcy5zZWxlY3RlZCh0cnVlKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLk9mZlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrID0gZnVuY3Rpb24oKXtcclxuICB2anMuVGV4dFRyYWNrTWVudUl0ZW0ucHJvdG90eXBlLm9uQ2xpY2suY2FsbCh0aGlzKTtcclxuICB0aGlzLnBsYXllcl8uc2hvd1RleHRUcmFjayh0aGlzLnRyYWNrLmlkXywgdGhpcy50cmFjay5raW5kKCkpO1xyXG59O1xyXG5cclxudmpzLk9mZlRleHRUcmFja01lbnVJdGVtLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbigpe1xyXG4gIHZhciB0cmFja3MgPSB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpLFxyXG4gICAgICBpPTAsIGo9dHJhY2tzLmxlbmd0aCwgdHJhY2ssXHJcbiAgICAgIG9mZiA9IHRydWU7XHJcblxyXG4gIGZvciAoO2k8ajtpKyspIHtcclxuICAgIHRyYWNrID0gdHJhY2tzW2ldO1xyXG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PSB0aGlzLnRyYWNrLmtpbmQoKSAmJiB0cmFjay5tb2RlKCkgPT0gMikge1xyXG4gICAgICBvZmYgPSBmYWxzZTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHRoaXMuc2VsZWN0ZWQob2ZmKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYmFzZSBjbGFzcyBmb3IgYnV0dG9ucyB0aGF0IHRvZ2dsZSBzcGVjaWZpYyB0ZXh0IHRyYWNrIHR5cGVzIChlLmcuIHN1YnRpdGxlcylcclxuICpcclxuICogQGNvbnN0cnVjdG9yXHJcbiAqL1xyXG52anMuVGV4dFRyYWNrQnV0dG9uID0gdmpzLk1lbnVCdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuICAgIHZqcy5NZW51QnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICBpZiAodGhpcy5pdGVtcy5sZW5ndGggPD0gMSkge1xyXG4gICAgICB0aGlzLmhpZGUoKTtcclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuLy8gdmpzLlRleHRUcmFja0J1dHRvbi5wcm90b3R5cGUuYnV0dG9uUHJlc3NlZCA9IGZhbHNlO1xyXG5cclxuLy8gdmpzLlRleHRUcmFja0J1dHRvbi5wcm90b3R5cGUuY3JlYXRlTWVudSA9IGZ1bmN0aW9uKCl7XHJcbi8vICAgdmFyIG1lbnUgPSBuZXcgdmpzLk1lbnUodGhpcy5wbGF5ZXJfKTtcclxuXHJcbi8vICAgLy8gQWRkIGEgdGl0bGUgbGlzdCBpdGVtIHRvIHRoZSB0b3BcclxuLy8gICAvLyBtZW51LmVsKCkuYXBwZW5kQ2hpbGQodmpzLmNyZWF0ZUVsKCdsaScsIHtcclxuLy8gICAvLyAgIGNsYXNzTmFtZTogJ3Zqcy1tZW51LXRpdGxlJyxcclxuLy8gICAvLyAgIGlubmVySFRNTDogdmpzLmNhcGl0YWxpemUodGhpcy5raW5kXyksXHJcbi8vICAgLy8gICB0YWJpbmRleDogLTFcclxuLy8gICAvLyB9KSk7XHJcblxyXG4vLyAgIHRoaXMuaXRlbXMgPSB0aGlzLmNyZWF0ZUl0ZW1zKCk7XHJcblxyXG4vLyAgIC8vIEFkZCBtZW51IGl0ZW1zIHRvIHRoZSBtZW51XHJcbi8vICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICBtZW51LmFkZEl0ZW0odGhpcy5pdGVtc1tpXSk7XHJcbi8vICAgfVxyXG5cclxuLy8gICAvLyBBZGQgbGlzdCB0byBlbGVtZW50XHJcbi8vICAgdGhpcy5hZGRDaGlsZChtZW51KTtcclxuXHJcbi8vICAgcmV0dXJuIG1lbnU7XHJcbi8vIH07XHJcblxyXG4vLyBDcmVhdGUgYSBtZW51IGl0ZW0gZm9yIGVhY2ggdGV4dCB0cmFja1xyXG52anMuVGV4dFRyYWNrQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVJdGVtcyA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGl0ZW1zID0gW10sIHRyYWNrO1xyXG5cclxuICAvLyBBZGQgYW4gT0ZGIG1lbnUgaXRlbSB0byB0dXJuIGFsbCB0cmFja3Mgb2ZmXHJcbiAgaXRlbXMucHVzaChuZXcgdmpzLk9mZlRleHRUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywgeyAna2luZCc6IHRoaXMua2luZF8gfSkpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGxheWVyXy50ZXh0VHJhY2tzKCkubGVuZ3RoOyBpKyspIHtcclxuICAgIHRyYWNrID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKVtpXTtcclxuICAgIGlmICh0cmFjay5raW5kKCkgPT09IHRoaXMua2luZF8pIHtcclxuICAgICAgaXRlbXMucHVzaChuZXcgdmpzLlRleHRUcmFja01lbnVJdGVtKHRoaXMucGxheWVyXywge1xyXG4gICAgICAgICd0cmFjayc6IHRyYWNrXHJcbiAgICAgIH0pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBpdGVtcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBUaGUgYnV0dG9uIGNvbXBvbmVudCBmb3IgdG9nZ2xpbmcgYW5kIHNlbGVjdGluZyBjYXB0aW9uc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5DYXB0aW9uc0J1dHRvbiA9IHZqcy5UZXh0VHJhY2tCdXR0b24uZXh0ZW5kKHtcclxuICAvKiogQGNvbnN0cnVjdG9yICovXHJcbiAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zLCByZWFkeSl7XHJcbiAgICB2anMuVGV4dFRyYWNrQnV0dG9uLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zLCByZWFkeSk7XHJcbiAgICB0aGlzLmVsXy5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCdDYXB0aW9ucyBNZW51Jyk7XHJcbiAgfVxyXG59KTtcclxudmpzLkNhcHRpb25zQnV0dG9uLnByb3RvdHlwZS5raW5kXyA9ICdjYXB0aW9ucyc7XHJcbnZqcy5DYXB0aW9uc0J1dHRvbi5wcm90b3R5cGUuYnV0dG9uVGV4dCA9ICdDYXB0aW9ucyc7XHJcbnZqcy5DYXB0aW9uc0J1dHRvbi5wcm90b3R5cGUuY2xhc3NOYW1lID0gJ3Zqcy1jYXB0aW9ucy1idXR0b24nO1xyXG5cclxuLyoqXHJcbiAqIFRoZSBidXR0b24gY29tcG9uZW50IGZvciB0b2dnbGluZyBhbmQgc2VsZWN0aW5nIHN1YnRpdGxlc1xyXG4gKlxyXG4gKiBAY29uc3RydWN0b3JcclxuICovXHJcbnZqcy5TdWJ0aXRsZXNCdXR0b24gPSB2anMuVGV4dFRyYWNrQnV0dG9uLmV4dGVuZCh7XHJcbiAgLyoqIEBjb25zdHJ1Y3RvciAqL1xyXG4gIGluaXQ6IGZ1bmN0aW9uKHBsYXllciwgb3B0aW9ucywgcmVhZHkpe1xyXG4gICAgdmpzLlRleHRUcmFja0J1dHRvbi5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucywgcmVhZHkpO1xyXG4gICAgdGhpcy5lbF8uc2V0QXR0cmlidXRlKCdhcmlhLWxhYmVsJywnU3VidGl0bGVzIE1lbnUnKTtcclxuICB9XHJcbn0pO1xyXG52anMuU3VidGl0bGVzQnV0dG9uLnByb3RvdHlwZS5raW5kXyA9ICdzdWJ0aXRsZXMnO1xyXG52anMuU3VidGl0bGVzQnV0dG9uLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ1N1YnRpdGxlcyc7XHJcbnZqcy5TdWJ0aXRsZXNCdXR0b24ucHJvdG90eXBlLmNsYXNzTmFtZSA9ICd2anMtc3VidGl0bGVzLWJ1dHRvbic7XHJcblxyXG4vLyBDaGFwdGVycyBhY3QgbXVjaCBkaWZmZXJlbnRseSB0aGFuIG90aGVyIHRleHQgdHJhY2tzXHJcbi8vIEN1ZXMgYXJlIG5hdmlnYXRpb24gdnMuIG90aGVyIHRyYWNrcyBvZiBhbHRlcm5hdGl2ZSBsYW5ndWFnZXNcclxuLyoqXHJcbiAqIFRoZSBidXR0b24gY29tcG9uZW50IGZvciB0b2dnbGluZyBhbmQgc2VsZWN0aW5nIGNoYXB0ZXJzXHJcbiAqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNoYXB0ZXJzQnV0dG9uID0gdmpzLlRleHRUcmFja0J1dHRvbi5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KXtcclxuICAgIHZqcy5UZXh0VHJhY2tCdXR0b24uY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMsIHJlYWR5KTtcclxuICAgIHRoaXMuZWxfLnNldEF0dHJpYnV0ZSgnYXJpYS1sYWJlbCcsJ0NoYXB0ZXJzIE1lbnUnKTtcclxuICB9XHJcbn0pO1xyXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmtpbmRfID0gJ2NoYXB0ZXJzJztcclxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5idXR0b25UZXh0ID0gJ0NoYXB0ZXJzJztcclxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5jbGFzc05hbWUgPSAndmpzLWNoYXB0ZXJzLWJ1dHRvbic7XHJcblxyXG4vLyBDcmVhdGUgYSBtZW51IGl0ZW0gZm9yIGVhY2ggdGV4dCB0cmFja1xyXG52anMuQ2hhcHRlcnNCdXR0b24ucHJvdG90eXBlLmNyZWF0ZUl0ZW1zID0gZnVuY3Rpb24oKXtcclxuICB2YXIgaXRlbXMgPSBbXSwgdHJhY2s7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKS5sZW5ndGg7IGkrKykge1xyXG4gICAgdHJhY2sgPSB0aGlzLnBsYXllcl8udGV4dFRyYWNrcygpW2ldO1xyXG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PT0gdGhpcy5raW5kXykge1xyXG4gICAgICBpdGVtcy5wdXNoKG5ldyB2anMuVGV4dFRyYWNrTWVudUl0ZW0odGhpcy5wbGF5ZXJfLCB7XHJcbiAgICAgICAgJ3RyYWNrJzogdHJhY2tcclxuICAgICAgfSkpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGl0ZW1zO1xyXG59O1xyXG5cclxudmpzLkNoYXB0ZXJzQnV0dG9uLnByb3RvdHlwZS5jcmVhdGVNZW51ID0gZnVuY3Rpb24oKXtcclxuICB2YXIgdHJhY2tzID0gdGhpcy5wbGF5ZXJfLnRleHRUcmFja3MoKSxcclxuICAgICAgaSA9IDAsXHJcbiAgICAgIGogPSB0cmFja3MubGVuZ3RoLFxyXG4gICAgICB0cmFjaywgY2hhcHRlcnNUcmFjayxcclxuICAgICAgaXRlbXMgPSB0aGlzLml0ZW1zID0gW107XHJcblxyXG4gIGZvciAoO2k8ajtpKyspIHtcclxuICAgIHRyYWNrID0gdHJhY2tzW2ldO1xyXG4gICAgaWYgKHRyYWNrLmtpbmQoKSA9PSB0aGlzLmtpbmRfICYmIHRyYWNrLmRmbHQoKSkge1xyXG4gICAgICBpZiAodHJhY2sucmVhZHlTdGF0ZSgpIDwgMikge1xyXG4gICAgICAgIHRoaXMuY2hhcHRlcnNUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgIHRyYWNrLm9uKCdsb2FkZWQnLCB2anMuYmluZCh0aGlzLCB0aGlzLmNyZWF0ZU1lbnUpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2hhcHRlcnNUcmFjayA9IHRyYWNrO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB2YXIgbWVudSA9IHRoaXMubWVudSA9IG5ldyB2anMuTWVudSh0aGlzLnBsYXllcl8pO1xyXG5cclxuICBtZW51LmVsXy5hcHBlbmRDaGlsZCh2anMuY3JlYXRlRWwoJ2xpJywge1xyXG4gICAgY2xhc3NOYW1lOiAndmpzLW1lbnUtdGl0bGUnLFxyXG4gICAgaW5uZXJIVE1MOiB2anMuY2FwaXRhbGl6ZSh0aGlzLmtpbmRfKSxcclxuICAgIHRhYmluZGV4OiAtMVxyXG4gIH0pKTtcclxuXHJcbiAgaWYgKGNoYXB0ZXJzVHJhY2spIHtcclxuICAgIHZhciBjdWVzID0gY2hhcHRlcnNUcmFjay5jdWVzXywgY3VlLCBtaTtcclxuICAgIGkgPSAwO1xyXG4gICAgaiA9IGN1ZXMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAoO2k8ajtpKyspIHtcclxuICAgICAgY3VlID0gY3Vlc1tpXTtcclxuXHJcbiAgICAgIG1pID0gbmV3IHZqcy5DaGFwdGVyc1RyYWNrTWVudUl0ZW0odGhpcy5wbGF5ZXJfLCB7XHJcbiAgICAgICAgJ3RyYWNrJzogY2hhcHRlcnNUcmFjayxcclxuICAgICAgICAnY3VlJzogY3VlXHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaXRlbXMucHVzaChtaSk7XHJcblxyXG4gICAgICBtZW51LmFkZENoaWxkKG1pKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh0aGlzLml0ZW1zLmxlbmd0aCA+IDApIHtcclxuICAgIHRoaXMuc2hvdygpO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG1lbnU7XHJcbn07XHJcblxyXG5cclxuLyoqXHJcbiAqIEBjb25zdHJ1Y3RvclxyXG4gKi9cclxudmpzLkNoYXB0ZXJzVHJhY2tNZW51SXRlbSA9IHZqcy5NZW51SXRlbS5leHRlbmQoe1xyXG4gIC8qKiBAY29uc3RydWN0b3IgKi9cclxuICBpbml0OiBmdW5jdGlvbihwbGF5ZXIsIG9wdGlvbnMpe1xyXG4gICAgdmFyIHRyYWNrID0gdGhpcy50cmFjayA9IG9wdGlvbnNbJ3RyYWNrJ10sXHJcbiAgICAgICAgY3VlID0gdGhpcy5jdWUgPSBvcHRpb25zWydjdWUnXSxcclxuICAgICAgICBjdXJyZW50VGltZSA9IHBsYXllci5jdXJyZW50VGltZSgpO1xyXG5cclxuICAgIC8vIE1vZGlmeSBvcHRpb25zIGZvciBwYXJlbnQgTWVudUl0ZW0gY2xhc3MncyBpbml0LlxyXG4gICAgb3B0aW9uc1snbGFiZWwnXSA9IGN1ZS50ZXh0O1xyXG4gICAgb3B0aW9uc1snc2VsZWN0ZWQnXSA9IChjdWUuc3RhcnRUaW1lIDw9IGN1cnJlbnRUaW1lICYmIGN1cnJlbnRUaW1lIDwgY3VlLmVuZFRpbWUpO1xyXG4gICAgdmpzLk1lbnVJdGVtLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICB0cmFjay5vbignY3VlY2hhbmdlJywgdmpzLmJpbmQodGhpcywgdGhpcy51cGRhdGUpKTtcclxuICB9XHJcbn0pO1xyXG5cclxudmpzLkNoYXB0ZXJzVHJhY2tNZW51SXRlbS5wcm90b3R5cGUub25DbGljayA9IGZ1bmN0aW9uKCl7XHJcbiAgdmpzLk1lbnVJdGVtLnByb3RvdHlwZS5vbkNsaWNrLmNhbGwodGhpcyk7XHJcbiAgdGhpcy5wbGF5ZXJfLmN1cnJlbnRUaW1lKHRoaXMuY3VlLnN0YXJ0VGltZSk7XHJcbiAgdGhpcy51cGRhdGUodGhpcy5jdWUuc3RhcnRUaW1lKTtcclxufTtcclxuXHJcbnZqcy5DaGFwdGVyc1RyYWNrTWVudUl0ZW0ucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcbiAgdmFyIGN1ZSA9IHRoaXMuY3VlLFxyXG4gICAgICBjdXJyZW50VGltZSA9IHRoaXMucGxheWVyXy5jdXJyZW50VGltZSgpO1xyXG5cclxuICAvLyB2anMubG9nKGN1cnJlbnRUaW1lLCBjdWUuc3RhcnRUaW1lKTtcclxuICB0aGlzLnNlbGVjdGVkKGN1ZS5zdGFydFRpbWUgPD0gY3VycmVudFRpbWUgJiYgY3VycmVudFRpbWUgPCBjdWUuZW5kVGltZSk7XHJcbn07XHJcblxyXG4vLyBBZGQgQnV0dG9ucyB0byBjb250cm9sQmFyXHJcbnZqcy5vYmoubWVyZ2UodmpzLkNvbnRyb2xCYXIucHJvdG90eXBlLm9wdGlvbnNfWydjaGlsZHJlbiddLCB7XHJcbiAgJ3N1YnRpdGxlc0J1dHRvbic6IHt9LFxyXG4gICdjYXB0aW9uc0J1dHRvbic6IHt9LFxyXG4gICdjaGFwdGVyc0J1dHRvbic6IHt9XHJcbn0pO1xyXG5cclxuLy8gdmpzLkN1ZSA9IHZqcy5Db21wb25lbnQuZXh0ZW5kKHtcclxuLy8gICAvKiogQGNvbnN0cnVjdG9yICovXHJcbi8vICAgaW5pdDogZnVuY3Rpb24ocGxheWVyLCBvcHRpb25zKXtcclxuLy8gICAgIHZqcy5Db21wb25lbnQuY2FsbCh0aGlzLCBwbGF5ZXIsIG9wdGlvbnMpO1xyXG4vLyAgIH1cclxuLy8gfSk7XHJcbi8qKlxyXG4gKiBAZmlsZW92ZXJ2aWV3IEFkZCBKU09OIHN1cHBvcnRcclxuICogQHN1cHByZXNzIHt1bmRlZmluZWRWYXJzfVxyXG4gKiAoQ29tcGlsZXIgZG9lc24ndCBsaWtlIEpTT04gbm90IGJlaW5nIGRlY2xhcmVkKVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKiBKYXZhc2NyaXB0IEpTT04gaW1wbGVtZW50YXRpb25cclxuICogKFBhcnNlIE1ldGhvZCBPbmx5KVxyXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZG91Z2xhc2Nyb2NrZm9yZC9KU09OLWpzL2Jsb2IvbWFzdGVyL2pzb24yLmpzXHJcbiAqIE9ubHkgdXNpbmcgZm9yIHBhcnNlIG1ldGhvZCB3aGVuIHBhcnNpbmcgZGF0YS1zZXR1cCBhdHRyaWJ1dGUgSlNPTi5cclxuICogQHN1cHByZXNzIHt1bmRlZmluZWRWYXJzfVxyXG4gKiBAbmFtZXNwYWNlXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG52anMuSlNPTjtcclxuXHJcbmlmICh0eXBlb2Ygd2luZG93LkpTT04gIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5KU09OLnBhcnNlID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgdmpzLkpTT04gPSB3aW5kb3cuSlNPTjtcclxuXHJcbn0gZWxzZSB7XHJcbiAgdmpzLkpTT04gPSB7fTtcclxuXHJcbiAgdmFyIGN4ID0gL1tcXHUwMDAwXFx1MDBhZFxcdTA2MDAtXFx1MDYwNFxcdTA3MGZcXHUxN2I0XFx1MTdiNVxcdTIwMGMtXFx1MjAwZlxcdTIwMjgtXFx1MjAyZlxcdTIwNjAtXFx1MjA2ZlxcdWZlZmZcXHVmZmYwLVxcdWZmZmZdL2c7XHJcblxyXG4gIC8qKlxyXG4gICAqIHBhcnNlIHRoZSBqc29uXHJcbiAgICpcclxuICAgKiBAbWVtYmVyb2YgdmpzLkpTT05cclxuICAgKiBAcmV0dXJuIHtPYmplY3R8QXJyYXl9IFRoZSBwYXJzZWQgSlNPTlxyXG4gICAqL1xyXG4gIHZqcy5KU09OLnBhcnNlID0gZnVuY3Rpb24gKHRleHQsIHJldml2ZXIpIHtcclxuICAgICAgdmFyIGo7XHJcblxyXG4gICAgICBmdW5jdGlvbiB3YWxrKGhvbGRlciwga2V5KSB7XHJcbiAgICAgICAgICB2YXIgaywgdiwgdmFsdWUgPSBob2xkZXJba2V5XTtcclxuICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgZm9yIChrIGluIHZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGspKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICB2ID0gd2Fsayh2YWx1ZSwgayk7XHJcbiAgICAgICAgICAgICAgICAgICAgICBpZiAodiAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVba10gPSB2O1xyXG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdmFsdWVba107XHJcbiAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICByZXR1cm4gcmV2aXZlci5jYWxsKGhvbGRlciwga2V5LCB2YWx1ZSk7XHJcbiAgICAgIH1cclxuICAgICAgdGV4dCA9IFN0cmluZyh0ZXh0KTtcclxuICAgICAgY3gubGFzdEluZGV4ID0gMDtcclxuICAgICAgaWYgKGN4LnRlc3QodGV4dCkpIHtcclxuICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoY3gsIGZ1bmN0aW9uIChhKSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuICdcXFxcdScgK1xyXG4gICAgICAgICAgICAgICAgICAoJzAwMDAnICsgYS5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KSkuc2xpY2UoLTQpO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICgvXltcXF0sOnt9XFxzXSokL1xyXG4gICAgICAgICAgICAgIC50ZXN0KHRleHQucmVwbGFjZSgvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9nLCAnQCcpXHJcbiAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cIlteXCJcXFxcXFxuXFxyXSpcInx0cnVlfGZhbHNlfG51bGx8LT9cXGQrKD86XFwuXFxkKik/KD86W2VFXVsrXFwtXT9cXGQrKT8vZywgJ10nKVxyXG4gICAgICAgICAgICAgICAgICAucmVwbGFjZSgvKD86Xnw6fCwpKD86XFxzKlxcWykrL2csICcnKSkpIHtcclxuXHJcbiAgICAgICAgICBqID0gZXZhbCgnKCcgKyB0ZXh0ICsgJyknKTtcclxuXHJcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHJldml2ZXIgPT09ICdmdW5jdGlvbicgP1xyXG4gICAgICAgICAgICAgIHdhbGsoeycnOiBqfSwgJycpIDogajtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdKU09OLnBhcnNlKCk6IGludmFsaWQgb3IgbWFsZm9ybWVkIEpTT04gZGF0YScpO1xyXG4gIH07XHJcbn1cclxuLyoqXHJcbiAqIEBmaWxlb3ZlcnZpZXcgRnVuY3Rpb25zIGZvciBhdXRvbWF0aWNhbGx5IHNldHRpbmcgdXAgYSBwbGF5ZXJcclxuICogYmFzZWQgb24gdGhlIGRhdGEtc2V0dXAgYXR0cmlidXRlIG9mIHRoZSB2aWRlbyB0YWdcclxuICovXHJcblxyXG4vLyBBdXRvbWF0aWNhbGx5IHNldCB1cCBhbnkgdGFncyB0aGF0IGhhdmUgYSBkYXRhLXNldHVwIGF0dHJpYnV0ZVxyXG52anMuYXV0b1NldHVwID0gZnVuY3Rpb24oKXtcclxuICB2YXIgb3B0aW9ucywgdmlkLCBwbGF5ZXIsXHJcbiAgICAgIHZpZHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndmlkZW8nKTtcclxuXHJcbiAgLy8gQ2hlY2sgaWYgYW55IG1lZGlhIGVsZW1lbnRzIGV4aXN0XHJcbiAgaWYgKHZpZHMgJiYgdmlkcy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgZm9yICh2YXIgaT0wLGo9dmlkcy5sZW5ndGg7IGk8ajsgaSsrKSB7XHJcbiAgICAgIHZpZCA9IHZpZHNbaV07XHJcblxyXG4gICAgICAvLyBDaGVjayBpZiBlbGVtZW50IGV4aXN0cywgaGFzIGdldEF0dHJpYnV0ZSBmdW5jLlxyXG4gICAgICAvLyBJRSBzZWVtcyB0byBjb25zaWRlciB0eXBlb2YgZWwuZ2V0QXR0cmlidXRlID09ICdvYmplY3QnIGluc3RlYWQgb2YgJ2Z1bmN0aW9uJyBsaWtlIGV4cGVjdGVkLCBhdCBsZWFzdCB3aGVuIGxvYWRpbmcgdGhlIHBsYXllciBpbW1lZGlhdGVseS5cclxuICAgICAgaWYgKHZpZCAmJiB2aWQuZ2V0QXR0cmlidXRlKSB7XHJcblxyXG4gICAgICAgIC8vIE1ha2Ugc3VyZSB0aGlzIHBsYXllciBoYXNuJ3QgYWxyZWFkeSBiZWVuIHNldCB1cC5cclxuICAgICAgICBpZiAodmlkWydwbGF5ZXInXSA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICBvcHRpb25zID0gdmlkLmdldEF0dHJpYnV0ZSgnZGF0YS1zZXR1cCcpO1xyXG5cclxuICAgICAgICAgIC8vIENoZWNrIGlmIGRhdGEtc2V0dXAgYXR0ciBleGlzdHMuXHJcbiAgICAgICAgICAvLyBXZSBvbmx5IGF1dG8tc2V0dXAgaWYgdGhleSd2ZSBhZGRlZCB0aGUgZGF0YS1zZXR1cCBhdHRyLlxyXG4gICAgICAgICAgaWYgKG9wdGlvbnMgIT09IG51bGwpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFBhcnNlIG9wdGlvbnMgSlNPTlxyXG4gICAgICAgICAgICAvLyBJZiBlbXB0eSBzdHJpbmcsIG1ha2UgaXQgYSBwYXJzYWJsZSBqc29uIG9iamVjdC5cclxuICAgICAgICAgICAgb3B0aW9ucyA9IHZqcy5KU09OLnBhcnNlKG9wdGlvbnMgfHwgJ3t9Jyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDcmVhdGUgbmV3IHZpZGVvLmpzIGluc3RhbmNlLlxyXG4gICAgICAgICAgICBwbGF5ZXIgPSB2aWRlb2pzKHZpZCwgb3B0aW9ucyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgZ2V0QXR0cmlidXRlIGlzbid0IGRlZmluZWQsIHdlIG5lZWQgdG8gd2FpdCBmb3IgdGhlIERPTS5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB2anMuYXV0b1NldHVwVGltZW91dCgxKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAvLyBObyB2aWRlb3Mgd2VyZSBmb3VuZCwgc28ga2VlcCBsb29waW5nIHVubGVzcyBwYWdlIGlzIGZpbmlzZWhkIGxvYWRpbmcuXHJcbiAgfSBlbHNlIGlmICghdmpzLndpbmRvd0xvYWRlZCkge1xyXG4gICAgdmpzLmF1dG9TZXR1cFRpbWVvdXQoMSk7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUGF1c2UgdG8gbGV0IHRoZSBET00ga2VlcCBwcm9jZXNzaW5nXHJcbnZqcy5hdXRvU2V0dXBUaW1lb3V0ID0gZnVuY3Rpb24od2FpdCl7XHJcbiAgc2V0VGltZW91dCh2anMuYXV0b1NldHVwLCB3YWl0KTtcclxufTtcclxuXHJcbmlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnY29tcGxldGUnKSB7XHJcbiAgdmpzLndpbmRvd0xvYWRlZCA9IHRydWU7XHJcbn0gZWxzZSB7XHJcbiAgdmpzLm9uZSh3aW5kb3csICdsb2FkJywgZnVuY3Rpb24oKXtcclxuICAgIHZqcy53aW5kb3dMb2FkZWQgPSB0cnVlO1xyXG4gIH0pO1xyXG59XHJcblxyXG4vLyBSdW4gQXV0by1sb2FkIHBsYXllcnNcclxuLy8gWW91IGhhdmUgdG8gd2FpdCBhdCBsZWFzdCBvbmNlIGluIGNhc2UgdGhpcyBzY3JpcHQgaXMgbG9hZGVkIGFmdGVyIHlvdXIgdmlkZW8gaW4gdGhlIERPTSAod2VpcmQgYmVoYXZpb3Igb25seSB3aXRoIG1pbmlmaWVkIHZlcnNpb24pXHJcbnZqcy5hdXRvU2V0dXBUaW1lb3V0KDEpO1xyXG4vKipcclxuICogdGhlIG1ldGhvZCBmb3IgcmVnaXN0ZXJpbmcgYSB2aWRlby5qcyBwbHVnaW5cclxuICpcclxuICogQHBhcmFtICB7U3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW5cclxuICogQHBhcmFtICB7RnVuY3Rpb259IGluaXQgVGhlIGZ1bmN0aW9uIHRoYXQgaXMgcnVuIHdoZW4gdGhlIHBsYXllciBpbml0c1xyXG4gKi9cclxudmpzLnBsdWdpbiA9IGZ1bmN0aW9uKG5hbWUsIGluaXQpe1xyXG4gIHZqcy5QbGF5ZXIucHJvdG90eXBlW25hbWVdID0gaW5pdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvcGxheWVyL3ZpZGVvLmRldi5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIi8qKlxyXG4g4paI4paS4paT4paS4paRIFRoZSBGbGV4UGFwZXIgUHJvamVjdFxyXG5cclxuIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIEZsZXhQYXBlci5cclxuXHJcbiBGbGV4UGFwZXIgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yIG1vZGlmeVxyXG4gaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhcyBwdWJsaXNoZWQgYnlcclxuIHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZS5cclxuXHJcbiBGbGV4UGFwZXIgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcclxuIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXHJcbiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuICBTZWUgdGhlXHJcbiBHTlUgR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxyXG5cclxuIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXHJcbiBhbG9uZyB3aXRoIEZsZXhQYXBlci4gIElmIG5vdCwgc2VlIDxodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvPi5cclxuXHJcbiBGb3IgbW9yZSBpbmZvcm1hdGlvbiBvbiBGbGV4UGFwZXIgcGxlYXNlIHNlZSB0aGUgRmxleFBhcGVyIHByb2plY3RcclxuIGhvbWUgcGFnZTogaHR0cDovL2ZsZXhwYXBlci5kZXZhbGRpLmNvbVxyXG4gKi9cclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBGbGV4UGFwZXIgaGVscGVyIGZ1bmN0aW9uIGZvciByZXRyaWV2aW5nIGEgYWN0aXZlIEZsZXhQYXBlciBpbnN0YW5jZVxyXG4gKlxyXG4gKi9cclxud2luZG93LiRGbGV4UGFwZXIgPSB3aW5kb3cuZ2V0RG9jVmlld2VyID0gd2luZG93W1wiJEZsZXhQYXBlclwiXSA9IGZ1bmN0aW9uKGlkKXtcclxuICAgIHZhciBpbnN0YW5jZSA9IChpZD09PVwidW5kZWZpbmVkXCIpP1wiXCI6aWQ7XHJcblxyXG4gICAgcmV0dXJuIHdpbmRvd1tcIkZsZXhQYXBlclZpZXdlcl9JbnN0YW5jZVwiK2luc3RhbmNlXS5nZXRBcGkoKTtcclxufTtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBGbGV4UGFwZXIgZW1iZWRkaW5nIChuYW1lIG9mIHBsYWNlaG9sZGVyLCBjb25maWcpXHJcbiAqXHJcbiAqL1xyXG53aW5kb3cuRmxleFBhcGVyVmlld2VyRW1iZWRkaW5nID0gd2luZG93LiRmID0gZnVuY3Rpb24oaWQsIGFyZ3MpIHtcclxuICAgIHZhciBjb25maWcgPSBhcmdzLmNvbmZpZztcclxuICAgIHZhciBfU1dGRmlsZSxfUERGRmlsZSxfSU1HRmlsZXMsX0pTT05GaWxlICA9IFwiXCIsX2pzRGlyZWN0b3J5PVwiXCIsX2Nzc0RpcmVjdG9yeT1cIlwiLF9sb2NhbGVEaXJlY3Rvcnk9XCJcIjtfV01vZGUgPSAoY29uZmlnLldNb2RlIT1udWxsfHxjb25maWcud21tb2RlIT1udWxsP2NvbmZpZy53bW1vZGV8fGNvbmZpZy5XTW9kZTpcIndpbmRvd1wiKTtcclxuICAgIHZhciBfdURvYyA9ICgoY29uZmlnLkRPQyAhPW51bGwpP3VuZXNjYXBlKGNvbmZpZy5ET0MpOm51bGwpO1xyXG4gICAgdmFyIGluc3RhbmNlID0gXCJGbGV4UGFwZXJWaWV3ZXJfSW5zdGFuY2VcIisoKGlkPT09XCJ1bmRlZmluZWRcIik/XCJcIjppZCk7XHJcbiAgICB2YXIgX0pTT05EYXRhVHlwZSA9IChjb25maWcuSlNPTkRhdGFUeXBlIT1udWxsKT9jb25maWcuSlNPTkRhdGFUeXBlOlwianNvblwiO1xyXG5cclxuICAgIGlmIChfdURvYyAhPSBudWxsKSB7XHJcbiAgICAgICAgX1NXRkZpbGUgXHQ9IEZMRVhQQVBFUi50cmFuc2xhdGVVcmxCeUZvcm1hdChfdURvYyxcInN3ZlwiKTtcclxuICAgIH1cclxuXHJcbiAgICBfU1dGRmlsZSAgXHRcdFx0PSAoY29uZmlnLlN3ZkZpbGUhPW51bGw/Y29uZmlnLlN3ZkZpbGU6X1NXRkZpbGUpO1xyXG4gICAgX1NXRkZpbGUgIFx0XHRcdD0gKGNvbmZpZy5TV0ZGaWxlIT1udWxsP2NvbmZpZy5TV0ZGaWxlOl9TV0ZGaWxlKTtcclxuICAgIF9QREZGaWxlIFx0XHRcdD0gKGNvbmZpZy5QREZGaWxlIT1udWxsP2NvbmZpZy5QREZGaWxlOl9QREZGaWxlKTtcclxuICAgIF9JTUdGaWxlcyBcdFx0XHQ9IChjb25maWcuSU1HRmlsZXMhPW51bGw/Y29uZmlnLklNR0ZpbGVzOl9JTUdGaWxlcyk7XHJcbiAgICBfSU1HRmlsZXMgXHRcdFx0PSAoY29uZmlnLlBhZ2VJbWFnZVBhdHRlcm4hPW51bGw/Y29uZmlnLlBhZ2VJbWFnZVBhdHRlcm46X0lNR0ZpbGVzKTtcclxuICAgIF9KU09ORmlsZSBcdFx0XHQ9IChjb25maWcuSlNPTkZpbGUhPW51bGw/Y29uZmlnLkpTT05GaWxlOl9KU09ORmlsZSk7XHJcbiAgICBfanNEaXJlY3RvcnkgXHRcdD0gKGNvbmZpZy5qc0RpcmVjdG9yeSE9bnVsbD9jb25maWcuanNEaXJlY3Rvcnk6XCJqcy9cIik7XHJcbiAgICBfY3NzRGlyZWN0b3J5IFx0XHQ9IChjb25maWcuY3NzRGlyZWN0b3J5IT1udWxsP2NvbmZpZy5jc3NEaXJlY3Rvcnk6XCJjc3MvXCIpO1xyXG4gICAgX2xvY2FsZURpcmVjdG9yeSBcdD0gKGNvbmZpZy5sb2NhbGVEaXJlY3RvcnkhPW51bGw/Y29uZmlnLmxvY2FsZURpcmVjdG9yeTpcImxvY2FsZS9cIik7XHJcbiAgICBpZihfU1dGRmlsZSE9bnVsbCAmJiBfU1dGRmlsZS5pbmRleE9mKFwie1wiICk9PTAgJiYgX1NXRkZpbGUuaW5kZXhPZihcIlsqLFwiICkgPiAwICYmIF9TV0ZGaWxlLmluZGV4T2YoXCJdXCIgKSA+IDApe19TV0ZGaWxlID0gZXNjYXBlKF9TV0ZGaWxlKTt9IC8vIHNwbGl0IGZpbGUgZml4XHJcblxyXG4gICAgd2luZG93W2luc3RhbmNlXSA9IGZsYXNoZW1iZWQoaWQsIHtcclxuICAgICAgICBzcmNcdFx0XHRcdFx0XHQgICAgOiBfanNEaXJlY3RvcnkrXCIuL0ZsZXhQYXBlclZpZXdlci5zd2ZcIixcclxuICAgICAgICB2ZXJzaW9uXHRcdFx0XHRcdCAgICA6IFsxMCwgMF0sXHJcbiAgICAgICAgZXhwcmVzc0luc3RhbGxcdFx0XHQgICAgOiBcImpzL2V4cHJlc3NpbnN0YWxsLnN3ZlwiLFxyXG4gICAgICAgIHdtb2RlXHRcdFx0XHRcdCAgICA6IF9XTW9kZVxyXG4gICAgfSx7XHJcbiAgICAgICAgRWxlbWVudElkICAgICAgICAgICAgICAgOiBpZCxcclxuICAgICAgICBTd2ZGaWxlICBcdFx0XHRcdDogX1NXRkZpbGUsXHJcbiAgICAgICAgUGRmRmlsZSAgXHRcdFx0XHQ6IF9QREZGaWxlLFxyXG4gICAgICAgIElNR0ZpbGVzICBcdFx0XHRcdDogX0lNR0ZpbGVzLFxyXG4gICAgICAgIEpTT05GaWxlIFx0XHRcdFx0OiBfSlNPTkZpbGUsXHJcbiAgICAgICAgdXNlQ3VzdG9tSlNPTkZvcm1hdCBcdDogY29uZmlnLnVzZUN1c3RvbUpTT05Gb3JtYXQsXHJcbiAgICAgICAgSlNPTlBhZ2VEYXRhRm9ybWF0IFx0XHQ6IGNvbmZpZy5KU09OUGFnZURhdGFGb3JtYXQsXHJcbiAgICAgICAgSlNPTkRhdGFUeXBlIFx0XHRcdDogX0pTT05EYXRhVHlwZSxcclxuICAgICAgICBTY2FsZSBcdFx0XHRcdFx0OiAoY29uZmlnLlNjYWxlIT1udWxsKT9jb25maWcuU2NhbGU6MC44LFxyXG4gICAgICAgIFpvb21UcmFuc2l0aW9uIFx0XHRcdDogKGNvbmZpZy5ab29tVHJhbnNpdGlvbiE9bnVsbCk/Y29uZmlnLlpvb21UcmFuc2l0aW9uOidlYXNlT3V0JyxcclxuICAgICAgICBab29tVGltZSBcdFx0XHRcdDogKGNvbmZpZy5ab29tVGltZSE9bnVsbCk/Y29uZmlnLlpvb21UaW1lOjAuNSxcclxuICAgICAgICBab29tSW50ZXJ2YWwgXHRcdFx0OiAoY29uZmlnLlpvb21JbnRlcnZhbCk/Y29uZmlnLlpvb21JbnRlcnZhbDowLjIsXHJcbiAgICAgICAgRml0UGFnZU9uTG9hZCBcdFx0XHQ6IChjb25maWcuRml0UGFnZU9uTG9hZCE9bnVsbCk/Y29uZmlnLkZpdFBhZ2VPbkxvYWQ6ZmFsc2UsXHJcbiAgICAgICAgRml0V2lkdGhPbkxvYWQgXHRcdFx0OiAoY29uZmlnLkZpdFdpZHRoT25Mb2FkIT1udWxsKT9jb25maWcuRml0V2lkdGhPbkxvYWQ6ZmFsc2UsXHJcbiAgICAgICAgRnVsbFNjcmVlbkFzTWF4V2luZG93IFx0OiAoY29uZmlnLkZ1bGxTY3JlZW5Bc01heFdpbmRvdyE9bnVsbCk/Y29uZmlnLkZ1bGxTY3JlZW5Bc01heFdpbmRvdzpmYWxzZSxcclxuICAgICAgICBQcm9ncmVzc2l2ZUxvYWRpbmcgXHRcdDogKGNvbmZpZy5Qcm9ncmVzc2l2ZUxvYWRpbmchPW51bGwpP2NvbmZpZy5Qcm9ncmVzc2l2ZUxvYWRpbmc6ZmFsc2UsXHJcbiAgICAgICAgTWluWm9vbVNpemUgXHRcdFx0OiAoY29uZmlnLk1pblpvb21TaXplIT1udWxsKT9jb25maWcuTWluWm9vbVNpemU6MC4yLFxyXG4gICAgICAgIE1heFpvb21TaXplIFx0XHRcdDogKGNvbmZpZy5NYXhab29tU2l6ZSE9bnVsbCk/Y29uZmlnLk1heFpvb21TaXplOjUsXHJcbiAgICAgICAgU2VhcmNoTWF0Y2hBbGwgXHRcdFx0OiAoY29uZmlnLlNlYXJjaE1hdGNoQWxsIT1udWxsKT9jb25maWcuU2VhcmNoTWF0Y2hBbGw6ZmFsc2UsXHJcbiAgICAgICAgU2VhcmNoU2VydmljZVVybCBcdFx0OiBjb25maWcuU2VhcmNoU2VydmljZVVybCxcclxuICAgICAgICBJbml0Vmlld01vZGUgXHRcdFx0OiBjb25maWcuSW5pdFZpZXdNb2RlLFxyXG4gICAgICAgIEJpdG1hcEJhc2VkUmVuZGVyaW5nIFx0OiAoY29uZmlnLkJpdG1hcEJhc2VkUmVuZGVyaW5nIT1udWxsKT9jb25maWcuQml0bWFwQmFzZWRSZW5kZXJpbmc6ZmFsc2UsXHJcbiAgICAgICAgU3RhcnRBdFBhZ2UgXHRcdFx0OiBjb25maWcuU3RhcnRBdFBhZ2UsXHJcbiAgICAgICAgUHJpbnRQYXBlckFzQml0bWFwXHRcdDogKGNvbmZpZy5QcmludFBhcGVyQXNCaXRtYXAhPW51bGwpP2NvbmZpZy5QcmludFBhcGVyQXNCaXRtYXA6ZmFsc2UsXHJcbiAgICAgICAgQXV0b0FkanVzdFByaW50U2l6ZVx0XHQ6IChjb25maWcuQXV0b0FkanVzdFByaW50U2l6ZSE9bnVsbCk/Y29uZmlnLkF1dG9BZGp1c3RQcmludFNpemU6ZmFsc2UsXHJcblxyXG4gICAgICAgIEVuYWJsZUNvcm5lckRyYWdnaW5nIFx0OiAoKGNvbmZpZy5FbmFibGVDb3JuZXJEcmFnZ2luZyE9bnVsbCk/Y29uZmlnLkVuYWJsZUNvcm5lckRyYWdnaW5nOnRydWUpLCAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcclxuICAgICAgICBCYWNrZ3JvdW5kQ29sb3IgXHRcdDogY29uZmlnLkJhY2tncm91bmRDb2xvciwgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXHJcbiAgICAgICAgUGFuZWxDb2xvciBcdFx0XHRcdDogY29uZmlnLlBhbmVsQ29sb3IsIC8vIEZsZXhQYXBlciBaaW5lIHBhcmFtZXRlclxyXG4gICAgICAgIEJhY2tncm91bmRBbHBoYSAgICAgICAgIDogY29uZmlnLkJhY2tncm91bmRBbHBoYSwgLy8gRmxleFBhcGVyIFppbmUgcGFyYW1ldGVyXHJcbiAgICAgICAgVUlDb25maWcgICAgICAgICAgICAgICAgOiBjb25maWcuVUlDb25maWcsICAvLyBGbGV4UGFwZXIgWmluZSBwYXJhbWV0ZXJcclxuXHJcbiAgICAgICAgVmlld01vZGVUb29sc1Zpc2libGUgXHQ6ICgoY29uZmlnLlZpZXdNb2RlVG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuVmlld01vZGVUb29sc1Zpc2libGU6dHJ1ZSksXHJcbiAgICAgICAgWm9vbVRvb2xzVmlzaWJsZSBcdFx0OiAoKGNvbmZpZy5ab29tVG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuWm9vbVRvb2xzVmlzaWJsZTp0cnVlKSxcclxuICAgICAgICBOYXZUb29sc1Zpc2libGUgXHRcdDogKChjb25maWcuTmF2VG9vbHNWaXNpYmxlIT1udWxsKT9jb25maWcuTmF2VG9vbHNWaXNpYmxlOnRydWUpLFxyXG4gICAgICAgIEN1cnNvclRvb2xzVmlzaWJsZSBcdFx0OiAoKGNvbmZpZy5TZWFyY2hUb29sc1Zpc2libGUhPW51bGwpP2NvbmZpZy5DdXJzb3JUb29sc1Zpc2libGU6dHJ1ZSksXHJcbiAgICAgICAgU2VhcmNoVG9vbHNWaXNpYmxlIFx0XHQ6ICgoY29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZSE9bnVsbCk/Y29uZmlnLlNlYXJjaFRvb2xzVmlzaWJsZTp0cnVlKSxcclxuICAgICAgICBTdGlja3lUb29sc1x0XHRcdFx0OiBjb25maWcuU3RpY2t5VG9vbHMsXHJcbiAgICAgICAgVG9vbGJhciAgICAgICAgICAgICAgICAgOiBjb25maWcuVG9vbGJhcixcclxuICAgICAgICBEb2NTaXplUXVlcnlTZXJ2aWNlIFx0OiBjb25maWcuRG9jU2l6ZVF1ZXJ5U2VydmljZSxcclxuXHJcbiAgICAgICAgUmVuZGVyaW5nT3JkZXIgXHRcdFx0OiBjb25maWcuUmVuZGVyaW5nT3JkZXIsXHJcblxyXG4gICAgICAgIGxvY2FsZUNoYWluIFx0XHRcdDogKGNvbmZpZy5sb2NhbGVDaGFpbiE9bnVsbCk/Y29uZmlnLmxvY2FsZUNoYWluOlwiZW5fVVNcIixcclxuICAgICAgICBqc0RpcmVjdG9yeSBcdFx0XHQ6IF9qc0RpcmVjdG9yeSxcclxuICAgICAgICBjc3NEaXJlY3RvcnkgXHRcdFx0OiBfY3NzRGlyZWN0b3J5LFxyXG4gICAgICAgIGxvY2FsZURpcmVjdG9yeVx0XHRcdDogX2xvY2FsZURpcmVjdG9yeSxcclxuICAgICAgICBrZXkgXHRcdFx0XHRcdDogY29uZmlnLmtleVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBpZighd2luZG93LkZMRVhQQVBFUil7d2luZG93LkZMRVhQQVBFUiA9IHt9O31cclxuXHJcbiAgICBGTEVYUEFQRVIuZ2V0TG9jYXRpb25IYXNoUGFyYW1ldGVyID0gZnVuY3Rpb24ocGFyYW0pe1xyXG4gICAgICAgIHZhciBoYXNoID0gbG9jYXRpb24uaGFzaC5zdWJzdHIoMSk7XHJcblxyXG4gICAgICAgIGlmKGhhc2guaW5kZXhPZihwYXJhbSsnPScpPj0wKXtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gaGFzaC5zdWJzdHIoaGFzaC5pbmRleE9mKHBhcmFtKyc9JykpXHJcbiAgICAgICAgICAgICAgICAuc3BsaXQoJyYnKVswXVxyXG4gICAgICAgICAgICAgICAgLnNwbGl0KCc9JylbMV07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH07XHJcblxyXG4gICAgRkxFWFBBUEVSLnRyYW5zbGF0ZVVybEJ5Rm9ybWF0ID0gZnVuY3Rpb24odXJsLGZvcm1hdCl7XHJcbiAgICAgICAgaWYodXJsLmluZGV4T2YoXCJ7XCIpID09IDAgJiYgZm9ybWF0ICE9IFwic3dmXCIpeyAvLyBsb2FkaW5nIGluIHNwbGl0IGZpbGUgbW9kZVxyXG4gICAgICAgICAgICB1cmwgPSB1cmwuc3Vic3RyaW5nKDEsdXJsLmxhc3RJbmRleE9mKFwiLFwiKSk7XHJcbiAgICAgICAgICAgIHVybCA9IHVybC5yZXBsYWNlKFwiWyosMF1cIixcIntwYWdlfVwiKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKHVybCE9bnVsbCAmJiB1cmwuaW5kZXhPZigne2Zvcm1hdH0nKSA+IDAgPyB1cmwucmVwbGFjZShcIntmb3JtYXR9XCIsIGZvcm1hdCk6bnVsbCk7XHJcbiAgICB9O1xyXG5cclxuICAgIEZMRVhQQVBFUi5hbmltYXRlRGVueUVmZmVjdCA9IGZ1bmN0aW9uKG9iaixtYXJnaW4sdGltZSxjeWNsZXMsZGlyKSB7XHJcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyIHNwZWVkID0gdGltZSAvICgoMipjeWNsZXMpKzEpO1xyXG4gICAgICAgICAgICB2YXIgbWFyZ1JhdCA9IDEgKyAoNjAvKGN5Y2xlcypjeWNsZXMpKTsgJChvYmopLnN0b3AodHJ1ZSx0cnVlKTtcclxuICAgICAgICAgICAgZm9yICh2YXIgaT0wOyBpPD1jeWNsZXM7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaj0tMTsgajw9MTsgais9MilcclxuICAgICAgICAgICAgICAgICAgICAkKG9iaikuYW5pbWF0ZSh7bWFyZ2luTGVmdDogKGkhPWN5Y2xlcykqaiptYXJnaW59LHtkdXJhdGlvbjpzcGVlZCwgcXVldWU6dHJ1ZX0pO1xyXG5cclxuICAgICAgICAgICAgICAgIG1hcmdpbi89bWFyZ1JhdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sNTAwKTtcclxuICAgIH07XHJcblxyXG4gICAgRkxFWFBBUEVSLmluaXRMb2dpbkZvcm0gPSBmdW5jdGlvbiBpbml0TG9naW5Gb3JtKElNR0ZpbGVzLGFuaW1hdGUpe1xyXG4gICAgICAgIGpRdWVyeShkb2N1bWVudC5ib2R5KS5jc3MoJ2JhY2tncm91bmQtY29sb3InLCcjZGVkZWRlJyk7XHJcblxyXG4gICAgICAgIHZhciBpbWcgPSBuZXcgSW1hZ2UoKTtcclxuICAgICAgICBqUXVlcnkoaW1nKS5iaW5kKCdsb2FkJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBqUXVlcnkoZG9jdW1lbnQuYm9keSkuYXBwZW5kKFxyXG4gICAgICAgICAgICAgICAgXCI8ZGl2IGlkPSdsb2dpbkZvcm0nPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGZvcm0gY2xhc3M9J2ZsZXhwYXBlcl9odG1sZGlhbG9nJyBtZXRob2Q9J1BPU1QnIHN0eWxlPSdkaXNwbGF5Om5vbmU7dG9wOjEwMHB4O21hcmdpbjpcIisoKGpRdWVyeSh3aW5kb3cpLmhlaWdodCgpPjUwMCk/XCI1MHB4IGF1dG9cIjpcIjBweCBhdXRvXCIpK1wiJz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxkaXYgY2xhc3M9J2ZsZXhwYXBlcl9wdWJsaWNhdGlvbnMgZmxleHBhcGVyX3B1YmxpY2F0aW9uX2Nzc3RyYW5zZm9ybXMzZCcgc3R5bGU9J292ZXJmbG93LXk6aGlkZGVuO292ZXJmbG93LXg6aGlkZGVuO3RleHQtYWxpZ246Y2VudGVyO2JhY2tncm91bmQ6ICNmN2Y3Zjc7bWFyZ2luOiAtMjVweCAtMjVweCAwcHg7cGFkZGluZzogMTVweCAyNXB4IDBweCAyNXB4Oyc+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8ZGl2IGNsYXNzPSdmbGV4cGFwZXJfcHVibGljYXRpb24gZmxleHBhcGVyX3B1YmxpY2F0aW9uX2Nzc3RyYW5zZm9ybXMzZCcgaWQ9J2ZsZXhwYXBlcl9wdWJsaWNhdGlvbjEnPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPGltZyBzcmM9J1wiKyhJTUdGaWxlcy5yZXBsYWNlKFwie3BhZ2V9XCIsMSkpK1wiJyAvPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIrXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIFwiPGgxIGNsYXNzPSdmbGV4cGFwZXJfaHRtbGRpYWxvZy10aXRsZSc+cGFzc3dvcmQgcHJvdGVjdGVkIHB1YmxpY2F0aW9uPC9oMT5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlPSdwYXNzd29yZCcgaWQ9J3R4dF9mbGV4cGFwZXJfcGFzc3dvcmQnIG5hbWU9J3R4dF9mbGV4cGFwZXJfcGFzc3dvcmQnIGNsYXNzPSdmbGV4cGFwZXJfaHRtbGRpYWxvZy1pbnB1dCcgcGxhY2Vob2xkZXI9J0VudGVyIHBhc3N3b3JkJz5cIitcclxuICAgICAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlPSdzdWJtaXQnIHZhbHVlPSdTdWJtaXQnIGNsYXNzPSdmbGV4cGFwZXJfaHRtbGRpYWxvZy1idXR0b24nPlwiK1xyXG4gICAgICAgICAgICAgICAgICAgIFwiPC9kaXY+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Zvcm0+XCIrXHJcbiAgICAgICAgICAgICAgICAgICAgXCI8L2Rpdj5cIlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgdmFyIGFuaW1fZHVyYXRpb24gPSBhbmltYXRlPzEwMDA6MDtcclxuICAgICAgICAgICAgdmFyIGFuaW1faGVpZ2h0X2R1ciA9IGFuaW1hdGU/YW5pbV9kdXJhdGlvbi8zOjA7XHJcbiAgICAgICAgICAgIHZhciB0aGVpZ2h0ID0gNDAwO1xyXG5cclxuICAgICAgICAgICAgalF1ZXJ5KCcuZmxleHBhcGVyX2h0bWxkaWFsb2cnKS5jc3Moe2hlaWdodCA6ICcwcHgnLCBkaXNwbGF5IDogJ2Jsb2NrJ30pO1xyXG4gICAgICAgICAgICBqUXVlcnkoJy5mbGV4cGFwZXJfaHRtbGRpYWxvZycpLmFuaW1hdGUoeydoZWlnaHQnOiB0aGVpZ2h0KydweCcsJ3RvcCc6JzBweCd9LHtkdXJhdGlvbjogYW5pbV9oZWlnaHRfZHVyLCBjb21wbGV0ZTogZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmZsZXhwYXBlcl9odG1sZGlhbG9nJykuY3NzKHsnaGVpZ2h0JyA6ICcnfSk7IC8vIHJlbW92ZSBoZWlnaHQgYXR0cmlidXRlIHRvIGZpdCBwdWJsaWNhdGlvblxyXG5cclxuICAgICAgICAgICAgICAgIGpRdWVyeSgnLmZsZXhwYXBlcl9wdWJsaWNhdGlvbicpLmFuaW1hdGUoe29wYWNpdHk6MX0se1xyXG4gICAgICAgICAgICAgICAgICAgIHN0ZXAgOiBmdW5jdGlvbihub3csZngpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gLTc7dmFyIG9wYWNpdHlmcm9tID0gLTQwO3ZhciBkaWZmID0gb3BhY2l0eWZyb20gLSB0YXJnZXQ7dmFyIHJvdGF0ZSA9IChkaWZmICogbm93KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpRdWVyeSgnLmZsZXhwYXBlcl9wdWJsaWNhdGlvbicpLmNzcyh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC10cmFuc2Zvcm0nIDogJ3BlcnNwZWN0aXZlKDMwMCkgcm90YXRlWSgnKyhvcGFjaXR5ZnJvbSAtIHJvdGF0ZSkrJ2RlZyknLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1tb3otdHJhbnNmb3JtJyA6ICdyb3RhdGVZKCcrKG9wYWNpdHlmcm9tIC0gcm90YXRlKSsnZGVnKScsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYm94LXNoYWRvdycgOiAnNXB4IDVweCAyMHB4IHJnYmEoNTEsIDUxLCA1MSwgJytub3crJyknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246YW5pbV9kdXJhdGlvblxyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9fSk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGltZy5zcmMgPSAoSU1HRmlsZXMucmVwbGFjZShcIntwYWdlfVwiLDEpKTtcclxuICAgIH07XHJcbn0pKCk7XHJcblxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEZsZXhQYXBlciBlbWJlZGRpbmcgZnVuY3Rpb25hbGl0eS4gQmFzZWQgb24gRmxhc2hFbWJlZFxyXG4gKlxyXG4gKi9cclxuXHJcbihmdW5jdGlvbigpIHtcclxuXHJcbiAgICB2YXIgIElFID0gZG9jdW1lbnQuYWxsLFxyXG4gICAgICAgIFVSTCA9ICdodHRwOi8vd3d3LmFkb2JlLmNvbS9nby9nZXRmbGFzaHBsYXllcicsXHJcbiAgICAgICAgSlFVRVJZID0gdHlwZW9mIGpRdWVyeSA9PSAnZnVuY3Rpb24nLFxyXG4gICAgICAgIFJFID0gLyhcXGQrKVteXFxkXSsoXFxkKylbXlxcZF0qKFxcZCopLyxcclxuICAgICAgICBNT0JJTEUgPSAoZnVuY3Rpb24oKXt0cnkge3JldHVybiAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7fSBjYXRjaCAoZSkge3JldHVybiBmYWxzZTt9IH0pKCksXHJcbiAgICAgICAgR0xPQkFMX09QVFMgPSB7XHJcbiAgICAgICAgICAgIC8vIHZlcnkgY29tbW9uIG9wdHNcclxuICAgICAgICAgICAgd2lkdGg6ICcxMDAlJyxcclxuICAgICAgICAgICAgaGVpZ2h0OiAnMTAwJScsXHJcbiAgICAgICAgICAgIGlkOiBcIl9cIiArIChcIlwiICsgTWF0aC5yYW5kb20oKSkuc2xpY2UoOSksXHJcblxyXG4gICAgICAgICAgICAvLyBmbGFzaGVtYmVkIGRlZmF1bHRzXHJcbiAgICAgICAgICAgIGFsbG93ZnVsbHNjcmVlbjogdHJ1ZSxcclxuICAgICAgICAgICAgYWxsb3dzY3JpcHRhY2Nlc3M6ICdhbHdheXMnLFxyXG4gICAgICAgICAgICBxdWFsaXR5OiAnaGlnaCcsXHJcbiAgICAgICAgICAgIGFsbG93RnVsbFNjcmVlbkludGVyYWN0aXZlIDogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIC8vIGZsYXNoZW1iZWQgc3BlY2lmaWMgb3B0aW9uc1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiBbMTAsIDBdLFxyXG4gICAgICAgICAgICBvbkZhaWw6IG51bGwsXHJcbiAgICAgICAgICAgIGV4cHJlc3NJbnN0YWxsOiBudWxsLFxyXG4gICAgICAgICAgICB3M2M6IGZhbHNlLFxyXG4gICAgICAgICAgICBjYWNoZWJ1c3Rpbmc6IGZhbHNlXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICB3aW5kb3cuaXNUb3VjaFNjcmVlbiA9IE1PQklMRTtcclxuXHJcbiAgICBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XHJcbiAgICAgICAgd2luZG93LmF0dGFjaEV2ZW50KFwib25iZWZvcmV1bmxvYWRcIiwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIF9fZmxhc2hfdW5sb2FkSGFuZGxlciA9IGZ1bmN0aW9uKCkge307XHJcbiAgICAgICAgICAgIF9fZmxhc2hfc2F2ZWRVbmxvYWRIYW5kbGVyID0gZnVuY3Rpb24oKSB7fTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaW1wbGUgZXh0ZW5kXHJcbiAgICBmdW5jdGlvbiBleHRlbmQodG8sIGZyb20pIHtcclxuICAgICAgICBpZiAoZnJvbSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGZyb20uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvW2tleV0gPSBmcm9tW2tleV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRvO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIHVzZWQgYnkgRmxhc2ggdG8gZGlzcGF0Y2ggYSBldmVudCBwcm9wZXJseVxyXG4gICAgd2luZG93LmRpc3BhdGNoSlF1ZXJ5RXZlbnQgPSBmdW5jdGlvbiAoZWxlbWVudElkLGV2ZW50TmFtZSxhcmdzKXtcclxuICAgICAgICBqUXVlcnkoJyMnK2VsZW1lbnRJZCkudHJpZ2dlcihldmVudE5hbWUsYXJncyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlZCBieSBhc1N0cmluZyBtZXRob2RcclxuICAgIGZ1bmN0aW9uIG1hcChhcnIsIGZ1bmMpIHtcclxuICAgICAgICB2YXIgbmV3QXJyID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSBpbiBhcnIpIHtcclxuICAgICAgICAgICAgaWYgKGFyci5oYXNPd25Qcm9wZXJ0eShpKSkge1xyXG4gICAgICAgICAgICAgICAgbmV3QXJyW2ldID0gZnVuYyhhcnJbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdBcnI7XHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmZsYXNoZW1iZWQgPSBmdW5jdGlvbihyb290LCBvcHRzLCBjb25mKSB7XHJcbiAgICAgICAgLy8gcm9vdCBtdXN0IGJlIGZvdW5kIC8gbG9hZGVkXHJcbiAgICAgICAgaWYgKHR5cGVvZiByb290ID09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChyb290LnJlcGxhY2UoXCIjXCIsIFwiXCIpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIG5vdCBmb3VuZFxyXG4gICAgICAgIGlmICghcm9vdCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgcm9vdC5vbmNsaWNrID0gZnVuY3Rpb24oKXtyZXR1cm4gZmFsc2U7fVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mIG9wdHMgPT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgb3B0cyA9IHtzcmM6IG9wdHN9O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG5ldyBGbGFzaChyb290LCBleHRlbmQoZXh0ZW5kKHt9LCBHTE9CQUxfT1BUUyksIG9wdHMpLCBjb25mKTtcclxuICAgIH07XHJcblxyXG4gICAgLy8gZmxhc2hlbWJlZCBcInN0YXRpY1wiIEFQSVxyXG4gICAgdmFyIGYgPSBleHRlbmQod2luZG93LmZsYXNoZW1iZWQsIHtcclxuXHJcbiAgICAgICAgY29uZjogR0xPQkFMX09QVFMsXHJcblxyXG4gICAgICAgIGdldFZlcnNpb246IGZ1bmN0aW9uKCkgIHtcclxuICAgICAgICAgICAgdmFyIGZvLCB2ZXI7XHJcblxyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdmVyID0gbmF2aWdhdG9yLnBsdWdpbnNbXCJTaG9ja3dhdmUgRmxhc2hcIl0uZGVzY3JpcHRpb24uc2xpY2UoMTYpO1xyXG4gICAgICAgICAgICB9IGNhdGNoKGUpIHtcclxuXHJcbiAgICAgICAgICAgICAgICB0cnkgIHtcclxuICAgICAgICAgICAgICAgICAgICBmbyA9IG5ldyBBY3RpdmVYT2JqZWN0KFwiU2hvY2t3YXZlRmxhc2guU2hvY2t3YXZlRmxhc2guN1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB2ZXIgPSBmbyAmJiBmby5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdHJ5ICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvID0gbmV3IEFjdGl2ZVhPYmplY3QoXCJTaG9ja3dhdmVGbGFzaC5TaG9ja3dhdmVGbGFzaC42XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB2ZXIgPSBmbyAmJiBmby5HZXRWYXJpYWJsZShcIiR2ZXJzaW9uXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2goZXJyMikgeyB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHZlciA9IFJFLmV4ZWModmVyKTtcclxuICAgICAgICAgICAgcmV0dXJuIHZlciA/IFt2ZXJbMV0sIHZlclszXV0gOiBbMCwgMF07XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgYXNTdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xyXG5cclxuICAgICAgICAgICAgaWYgKG9iaiA9PT0gbnVsbCB8fCBvYmogPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gbnVsbDsgfVxyXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XHJcbiAgICAgICAgICAgIGlmICh0eXBlID09ICdvYmplY3QnICYmIG9iai5wdXNoKSB7IHR5cGUgPSAnYXJyYXknOyB9XHJcblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGUpe1xyXG5cclxuICAgICAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XHJcbiAgICAgICAgICAgICAgICAgICAgb2JqID0gb2JqLnJlcGxhY2UobmV3IFJlZ0V4cCgnKFtcIlxcXFxcXFxcXSknLCAnZycpLCAnXFxcXCQxJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGZsYXNoIGRvZXMgbm90IGhhbmRsZSAlLSBjaGFyYWN0ZXJzIHdlbGwuIHRyYW5zZm9ybXMgXCI1MCVcIiB0byBcIjUwcGN0XCIgKGEgZGlydHkgaGFjaywgSSBhZG1pdClcclxuICAgICAgICAgICAgICAgICAgICBvYmogPSBvYmoucmVwbGFjZSgvXlxccz8oXFxkK1xcLj9cXGQrKSUvLCBcIiQxcGN0XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnXCInICtvYmorICdcIic7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnYXJyYXknOlxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnWycrIG1hcChvYmosIGZ1bmN0aW9uKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmLmFzU3RyaW5nKGVsKTtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsJykgKyddJztcclxuXHJcbiAgICAgICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcImZ1bmN0aW9uKClcIic7XHJcblxyXG4gICAgICAgICAgICAgICAgY2FzZSAnb2JqZWN0JzpcclxuICAgICAgICAgICAgICAgICAgICB2YXIgc3RyID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RyLnB1c2goJ1wiJytwcm9wKydcIjonKyBmLmFzU3RyaW5nKG9ialtwcm9wXSkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAneycrc3RyLmpvaW4oJywnKSsnfSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIHJlcGxhY2UgJyAtLT4gXCIgIGFuZCByZW1vdmUgc3BhY2VzXHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcob2JqKS5yZXBsYWNlKC9cXHMvZywgXCIgXCIpLnJlcGxhY2UoL1xcJy9nLCBcIlxcXCJcIik7XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgZ2V0SFRNTDogZnVuY3Rpb24ob3B0cywgY29uZikge1xyXG5cclxuICAgICAgICAgICAgb3B0cyA9IGV4dGVuZCh7fSwgb3B0cyk7XHJcbiAgICAgICAgICAgIG9wdHMuaWQgPSBvcHRzLmlkICsgKFwiIFwiICsgTWF0aC5yYW5kb20oKSkuc2xpY2UoOSk7XHJcblxyXG4gICAgICAgICAgICAvKioqKioqKiBPQkpFQ1QgdGFnIGFuZCBpdCdzIGF0dHJpYnV0ZXMgKioqKioqKi9cclxuICAgICAgICAgICAgdmFyIGh0bWwgPSAnPG9iamVjdCB3aWR0aD1cIicgKyBvcHRzLndpZHRoICtcclxuICAgICAgICAgICAgICAgICdcIiBoZWlnaHQ9XCInICsgb3B0cy5oZWlnaHQgK1xyXG4gICAgICAgICAgICAgICAgJ1wiIGlkPVwiJyArIG9wdHMuaWQgK1xyXG4gICAgICAgICAgICAgICAgJ1wiIG5hbWU9XCInICsgb3B0cy5pZCArICdcIic7XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0cy5jYWNoZWJ1c3RpbmcpIHtcclxuICAgICAgICAgICAgICAgIG9wdHMuc3JjICs9ICgob3B0cy5zcmMuaW5kZXhPZihcIj9cIikgIT0gLTEgPyBcIiZcIiA6IFwiP1wiKSArIE1hdGgucmFuZG9tKCkpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAob3B0cy53M2MgfHwgIUlFKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICcgZGF0YT1cIicgK29wdHMuc3JjKyAnXCIgdHlwZT1cImFwcGxpY2F0aW9uL3gtc2hvY2t3YXZlLWZsYXNoXCInO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnIGNsYXNzaWQ9XCJjbHNpZDpEMjdDREI2RS1BRTZELTExY2YtOTZCOC00NDQ1NTM1NDAwMDBcIic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGh0bWwgKz0gJz4nO1xyXG5cclxuICAgICAgICAgICAgLyoqKioqKiogbmVzdGVkIFBBUkFNIHRhZ3MgKioqKioqKi9cclxuICAgICAgICAgICAgaWYgKG9wdHMudzNjIHx8IElFKSB7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8cGFyYW0gbmFtZT1cIm1vdmllXCIgdmFsdWU9XCInICtvcHRzLnNyYysgJ1wiIC8+JztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gbm90IGFsbG93ZWQgcGFyYW1zXHJcbiAgICAgICAgICAgIG9wdHMud2lkdGggPSBvcHRzLmhlaWdodCA9IG9wdHMuaWQgPSBvcHRzLnczYyA9IG9wdHMuc3JjID0gbnVsbDtcclxuICAgICAgICAgICAgb3B0cy5vbkZhaWwgPSBvcHRzLnZlcnNpb24gPSBvcHRzLmV4cHJlc3NJbnN0YWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBvcHRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAob3B0c1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaHRtbCArPSAnPHBhcmFtIG5hbWU9XCInKyBrZXkgKydcIiB2YWx1ZT1cIicrIG9wdHNba2V5XSArJ1wiIC8+JztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLyoqKioqKiogRkxBU0hWQVJTICoqKioqKiovXHJcbiAgICAgICAgICAgIHZhciB2YXJzID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgIGlmIChjb25mKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBrIGluIGNvbmYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY29uZltrXSAmJiBrIT0nVG9vbGJhcicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNvbmZba107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhcnMgKz0gayArJz0nKyAoL2Z1bmN0aW9ufG9iamVjdC8udGVzdCh0eXBlb2YgdmFsKSA/IGYuYXNTdHJpbmcodmFsKSA6IHZhbCkgKyAnJic7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgdmFycyA9IHZhcnMuc2xpY2UoMCwgLTEpO1xyXG4gICAgICAgICAgICAgICAgaHRtbCArPSAnPHBhcmFtIG5hbWU9XCJmbGFzaHZhcnNcIiB2YWx1ZT1cXCcnICsgdmFycyArICdcXCcgLz4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBodG1sICs9IFwiPC9vYmplY3Q+XCI7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gaHRtbDtcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBpc1N1cHBvcnRlZDogZnVuY3Rpb24odmVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBWRVJTSU9OWzBdID4gdmVyWzBdIHx8IFZFUlNJT05bMF0gPT0gdmVyWzBdICYmIFZFUlNJT05bMV0gPj0gdmVyWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICB2YXIgVkVSU0lPTiA9IGYuZ2V0VmVyc2lvbigpO1xyXG5cclxuICAgIGZ1bmN0aW9uIEZsYXNoKHJvb3QsIG9wdHMsIGNvbmYpIHtcclxuICAgICAgICB2YXIgdXNlckFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciBicm93c2VyID0ge1xyXG4gICAgICAgICAgICB2ZXJzaW9uOiAodXNlckFnZW50Lm1hdGNoKC8uKyg/OnJ2fGl0fHJhfGllKVtcXC86IF0oW1xcZC5dKykvKSB8fCBbXSlbMV0sXHJcbiAgICAgICAgICAgIHNhZmFyaTogL3dlYmtpdC8udGVzdCh1c2VyQWdlbnQpLFxyXG4gICAgICAgICAgICBvcGVyYTogL29wZXJhLy50ZXN0KHVzZXJBZ2VudCksXHJcbiAgICAgICAgICAgIG1zaWU6IC9tc2llLy50ZXN0KHVzZXJBZ2VudCkgJiYgIS9vcGVyYS8udGVzdCh1c2VyQWdlbnQpLFxyXG4gICAgICAgICAgICBtb3ppbGxhOiAvbW96aWxsYS8udGVzdCh1c2VyQWdlbnQpICYmICEvKGNvbXBhdGlibGV8d2Via2l0KS8udGVzdCh1c2VyQWdlbnQpLFxyXG4gICAgICAgICAgICBjaHJvbWU6IC9jaHJvbWUvLnRlc3QodXNlckFnZW50KVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIC8vIERlZmF1bHQgdG8gYSByZW5kZXJpbmcgbW9kZSBpZiBpdHMgbm90IHNldFxyXG4gICAgICAgIGlmKCFjb25mLlJlbmRlcmluZ09yZGVyICYmIGNvbmYuU3dmRmlsZSAhPSAgbnVsbCl7Y29uZi5SZW5kZXJpbmdPcmRlciA9IFwiZmxhc2hcIjt9XHJcblxyXG4gICAgICAgIGlmKGNvbmYuUmVuZGVyaW5nT3JkZXIuaW5kZXhPZignaHRtbDUnKT09MCl7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oJ1RoZSBGbGV4UGFwZXIgR1BMIHZlcnNpb24gZG9lcyBub3Qgc3VwcG9ydCBIVE1MNSByZW5kZXJpbmcuIERvIHlvdSB3YW50IHRvIG5hdmlnYXRlIHRvIG91ciBkb3dubG9hZCBwYWdlIGZvciBtb3JlIGRldGFpbHM/Jykpe2xvY2F0aW9uLmhyZWY9J2h0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb20vZG93bmxvYWQuanNwP3JlZj1GbGV4UGFwZXInfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZihjb25mLlJlbmRlcmluZ09yZGVyLmluZGV4T2YoJ2h0bWwnKT09MCl7XHJcbiAgICAgICAgICAgIGlmKGNvbmZpcm0oJ1RoZSBGbGV4UGFwZXIgR1BMIHZlcnNpb24gZG9lcyBub3Qgc3VwcG9ydCBIVE1MNCByZW5kZXJpbmcuIERvIHlvdSB3YW50IHRvIG5hdmlnYXRlIHRvIG91ciBkb3dubG9hZCBwYWdlIGZvciBtb3JlIGRldGFpbHM/Jykpe2xvY2F0aW9uLmhyZWY9J2h0dHA6Ly9mbGV4cGFwZXIuZGV2YWxkaS5jb20vZG93bmxvYWQuanNwP3JlZj1GbGV4UGFwZXInfVxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyB2ZXJzaW9uIGlzIG9rXHJcbiAgICAgICAgaWYgKGYuaXNTdXBwb3J0ZWQob3B0cy52ZXJzaW9uKSkge1xyXG4gICAgICAgICAgICByb290LmlubmVySFRNTCA9IGYuZ2V0SFRNTChvcHRzLCBjb25mKTtcclxuXHJcbiAgICAgICAgICAgIC8vIGV4cHJlc3MgaW5zdGFsbFxyXG4gICAgICAgIH0gZWxzZSBpZiAob3B0cy5leHByZXNzSW5zdGFsbCAmJiBmLmlzU3VwcG9ydGVkKFs2LCA2NV0pKSB7XHJcbiAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID0gZi5nZXRIVE1MKGV4dGVuZChvcHRzLCB7c3JjOiBvcHRzLmV4cHJlc3NJbnN0YWxsfSksIHtcclxuICAgICAgICAgICAgICAgIE1NcmVkaXJlY3RVUkw6IGxvY2F0aW9uLmhyZWYsXHJcbiAgICAgICAgICAgICAgICBNTXBsYXllclR5cGU6ICdQbHVnSW4nLFxyXG4gICAgICAgICAgICAgICAgTU1kb2N0aXRsZTogZG9jdW1lbnQudGl0bGVcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7IC8vdXNlIGh0bWwgdmlld2VyIG9yIGRpZVxyXG4gICAgICAgICAgICAvLyBmYWlsICMyLjEgY3VzdG9tIGNvbnRlbnQgaW5zaWRlIGNvbnRhaW5lclxyXG4gICAgICAgICAgICBpZiAoIXJvb3QuaW5uZXJIVE1MLnJlcGxhY2UoL1xccy9nLCAnJykpIHtcclxuICAgICAgICAgICAgICAgIHZhciBwYWdlSG9zdCA9ICgoZG9jdW1lbnQubG9jYXRpb24ucHJvdG9jb2wgPT0gXCJodHRwczpcIikgPyBcImh0dHBzOi8vXCIgOlx0XCJodHRwOi8vXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID1cclxuICAgICAgICAgICAgICAgICAgICBcIjxoMj5Zb3VyIGJyb3dzZXIgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBGbGV4UGFwZXI8L2gyPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8aDM+VXBncmFkZSB0byBhIG5ld2VyIGJyb3dzZXIgb3IgZG93bmxvYWQgQWRvYmUgRmxhc2ggUGxheWVyIDEwIG9yIGhpZ2hlci48L2gzPlwiICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCI8cD5DbGljayBvbiB0aGUgaWNvbiBiZWxvdyB0byBkb3dubG9hZCB0aGUgbGF0ZXN0IHZlcnNpb24gb2YgQWRvYmUgRmxhc2hcIiArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiPGEgaHJlZj0naHR0cDovL3d3dy5hZG9iZS5jb20vZ28vZ2V0Zmxhc2hwbGF5ZXInPjxpbWcgc3JjPSdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICArIHBhZ2VIb3N0ICsgXCJ3d3cuYWRvYmUuY29tL2ltYWdlcy9zaGFyZWQvZG93bmxvYWRfYnV0dG9ucy9nZXRfZmxhc2hfcGxheWVyLmdpZicgYWx0PSdHZXQgQWRvYmUgRmxhc2ggcGxheWVyJyAvPjwvYT5cIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocm9vdC50YWdOYW1lID09ICdBJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJvb3Qub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbi5ocmVmID0gVVJMO1xyXG4gICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIG9uRmFpbFxyXG4gICAgICAgICAgICBpZiAob3B0cy5vbkZhaWwpIHtcclxuICAgICAgICAgICAgICAgIHZhciByZXQgPSBvcHRzLm9uRmFpbC5jYWxsKHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXQgPT0gJ3N0cmluZycpIHsgcm9vdC5pbm5lckhUTUwgPSByZXQ7IH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gaHR0cDovL2Zsb3dwbGF5ZXIub3JnL2ZvcnVtLzgvMTgxODYjcG9zdC0xODU5M1xyXG4gICAgICAgIGlmIChJRSkge1xyXG4gICAgICAgICAgICB3aW5kb3dbb3B0cy5pZF0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChvcHRzLmlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFQSSBtZXRob2RzIGZvciBjYWxsYmFja1xyXG4gICAgICAgIGV4dGVuZCh0aGlzLCB7XHJcblxyXG4gICAgICAgICAgICBnZXRSb290OiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290O1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0T3B0aW9uczogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb3B0cztcclxuICAgICAgICAgICAgfSxcclxuXHJcblxyXG4gICAgICAgICAgICBnZXRDb25mOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBjb25mO1xyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgZ2V0QXBpOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiByb290LmZpcnN0Q2hpbGQ7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2V0dXAganF1ZXJ5IHN1cHBvcnRcclxuICAgIGlmIChKUVVFUlkpIHtcclxuICAgICAgICBqUXVlcnkuZm4uZmxhc2hlbWJlZCA9IGZ1bmN0aW9uKG9wdHMsIGNvbmYpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGpRdWVyeSh0aGlzKS5kYXRhKFwiZmxhc2hlbWJlZFwiLCBmbGFzaGVtYmVkKHRoaXMsIG9wdHMsIGNvbmYpKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgalF1ZXJ5LmZuLkZsZXhQYXBlclZpZXdlciA9IGZ1bmN0aW9uKGFyZ3Mpe1xyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBuZXcgRmxleFBhcGVyVmlld2VyRW1iZWRkaW5nKHRoaXMuYXR0cignaWQnKSxhcmdzKTtcclxuICAgICAgICB9O1xyXG4gICAgfWVsc2V7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwialF1ZXJ5IG1pc3NpbmchXCIpO1xyXG4gICAgfVxyXG59KSgpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGliL2ZsZXgvZmxleHBhcGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiLyoqXHJcbiDilojilpLilpPilpLilpEgVGhlIEZsZXhQYXBlciBQcm9qZWN0XHJcblxyXG4gVGhpcyBmaWxlIGlzIHBhcnQgb2YgRmxleFBhcGVyLlxyXG5cclxuIEZsZXhQYXBlciBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3IgbW9kaWZ5XHJcbiBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzIHB1Ymxpc2hlZCBieVxyXG4gdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLlxyXG5cclxuIEZsZXhQYXBlciBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxyXG4gYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcclxuIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gIFNlZSB0aGVcclxuIEdOVSBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXHJcblxyXG4gWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcclxuIGFsb25nIHdpdGggRmxleFBhcGVyLiAgSWYgbm90LCBzZWUgPGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8+LlxyXG5cclxuIEZvciBtb3JlIGluZm9ybWF0aW9uIG9uIEZsZXhQYXBlciBwbGVhc2Ugc2VlIHRoZSBGbGV4UGFwZXIgcHJvamVjdFxyXG4gaG9tZSBwYWdlOiBodHRwOi8vZmxleHBhcGVyLmRldmFsZGkuY29tXHJcbiAqL1xyXG5cclxuJChmdW5jdGlvbigpIHtcclxuICAgIC8qKlxyXG4gICAgICogSGFuZGxlcyB0aGUgZXZlbnQgb2YgZXh0ZXJuYWwgbGlua3MgZ2V0dGluZyBjbGlja2VkIGluIHRoZSBkb2N1bWVudC5cclxuICAgICAqXHJcbiAgICAgKiBAZXhhbXBsZSBvbkV4dGVybmFsTGlua0NsaWNrZWQoXCJodHRwOi8vd3d3Lmdvb2dsZS5jb21cIilcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gU3RyaW5nIGxpbmtcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkV4dGVybmFsTGlua0NsaWNrZWQnLGZ1bmN0aW9uKGUsbGluayl7XHJcbiAgICAgICAgd2luZG93Lm9wZW4obGluaywnX2ZsZXhwYXBlcl9leHR1cmwnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjaWV2ZXMgcHJvZ3Jlc3MgaW5mb3JtYXRpb24gYWJvdXQgdGhlIGRvY3VtZW50IGJlaW5nIGxvYWRlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uUHJvZ3Jlc3MoIDEwMCwxMDAwMCApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbnQgbG9hZGVkXHJcbiAgICAgKiBAcGFyYW0gaW50IHRvdGFsXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Qcm9ncmVzcycsZnVuY3Rpb24oZSxsb2FkZWRCeXRlcyx0b3RhbEJ5dGVzKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEhhbmRsZXMgdGhlIGV2ZW50IG9mIGEgZG9jdW1lbnQgaXMgaW4gcHJvZ3Jlc3Mgb2YgbG9hZGluZ1xyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50TG9hZGluZycsZnVuY3Rpb24oZSl7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIYW5kbGVzIHRoZSBldmVudCBvZiBhIGRvY3VtZW50IGlzIGluIHByb2dyZXNzIG9mIGxvYWRpbmdcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25QYWdlTG9hZGluZycsZnVuY3Rpb24oZSxwYWdlTnVtYmVyKXtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlY2VpdmVzIG1lc3NhZ2VzIGFib3V0IHRoZSBjdXJyZW50IHBhZ2UgYmVpbmcgY2hhbmdlZFxyXG4gICAgICpcclxuICAgICAqIEBleGFtcGxlIG9uQ3VycmVudFBhZ2VDaGFuZ2VkKCAxMCApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBpbnQgcGFnZW51bVxyXG4gICAgICovXHJcbiAgICBqUXVlcnkoJyNkb2N1bWVudFZpZXdlcicpLmJpbmQoJ29uQ3VycmVudFBhZ2VDaGFuZ2VkJyxmdW5jdGlvbihlLHBhZ2VudW0pe1xyXG5cclxuICAgICAgICAvLyBpZiBHQU51bWJlciBpcyBzdXBwbGllZCB0aGVuIGxldHMgdHJhY2sgdGhpcyBhcyBhIEdvb2dsZSBBbmFseXRpY3MgZXZlbnQuXHJcbiAgICAgICAgaWYoalF1ZXJ5KHRoaXMpLmRhdGEoJ1RyYWNraW5nTnVtYmVyJykpe1xyXG4gICAgICAgICAgICB2YXIgX2dhcSA9IHdpbmRvdy5fZ2FxIHx8IFtdO3dpbmRvdy5fZ2FxPV9nYXE7XHJcbiAgICAgICAgICAgIHZhciB0cmFja2luZ0RvYyA9IGpRdWVyeSh0aGlzKS5kYXRhKCdUcmFja2luZ0RvY3VtZW50Jyk7XHJcbiAgICAgICAgICAgIHZhciBwZGZGaWxlTmFtZSA9IHRyYWNraW5nRG9jLnN1YnN0cigwLHRyYWNraW5nRG9jLmluZGV4T2YoXCIucGRmXCIpKzQpO1xyXG5cclxuICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3NldEFjY291bnQnLCBqUXVlcnkodGhpcykuZGF0YSgnVHJhY2tpbmdOdW1iZXInKV0pO1xyXG4gICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsICdQREYgRG9jdW1lbnRzJywgJ1BhZ2UgVmlldycsIHBkZkZpbGVOYW1lICsgJyAtIHBhZ2UgJyArIHBhZ2VudW1dKTtcclxuXHJcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHZhciBnYSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOyBnYS50eXBlID0gJ3RleHQvamF2YXNjcmlwdCc7IGdhLmFzeW5jID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGdhLnNyYyA9ICgnaHR0cHM6JyA9PSBkb2N1bWVudC5sb2NhdGlvbi5wcm90b2NvbCA/ICdodHRwczovL3NzbCcgOiAnaHR0cDovL3d3dycpICsgJy5nb29nbGUtYW5hbHl0aWNzLmNvbS9nYS5qcyc7XHJcbiAgICAgICAgICAgICAgICB2YXIgcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdzY3JpcHQnKVswXTsgcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShnYSwgcyk7XHJcbiAgICAgICAgICAgIH0pKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZWNlaXZlcyBtZXNzYWdlcyBhYm91dCB0aGUgZG9jdW1lbnQgYmVpbmcgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25Eb2N1bWVudExvYWRlZCggMjAgKTtcclxuICAgICAqXHJcbiAgICAgKiBAcGFyYW0gaW50IHRvdGFsUGFnZXNcclxuICAgICAqL1xyXG4gICAgalF1ZXJ5KCcjZG9jdW1lbnRWaWV3ZXInKS5iaW5kKCdvbkRvY3VtZW50TG9hZGVkJyxmdW5jdGlvbihlLHRvdGFsUGFnZXMpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgbWVzc2FnZXMgYWJvdXQgdGhlIHBhZ2UgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25QYWdlTG9hZGVkKCAxICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGludCBwYWdlTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25QYWdlTG9hZGVkJyxmdW5jdGlvbihlLHBhZ2VOdW1iZXIpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgbWVzc2FnZXMgYWJvdXQgdGhlIHBhZ2UgbG9hZGVkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25FcnJvckxvYWRpbmdQYWdlKCAxICk7XHJcbiAgICAgKlxyXG4gICAgICogQHBhcmFtIGludCBwYWdlTnVtYmVyXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25FcnJvckxvYWRpbmdQYWdlJyxmdW5jdGlvbihlLHBhZ2VOdW1iZXIpe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgZXJyb3IgbWVzc2FnZXMgd2hlbiBhIGRvY3VtZW50IGlzIG5vdCBsb2FkaW5nIHByb3Blcmx5XHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25Eb2N1bWVudExvYWRlZEVycm9yKCBcIk5ldHdvcmsgZXJyb3JcIiApO1xyXG4gICAgICpcclxuICAgICAqIEBwYXJhbSBTdHJpbmcgZXJyb3JNZXNzYWdlXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Eb2N1bWVudExvYWRlZEVycm9yJyxmdW5jdGlvbihlLGVyck1lc3NhZ2Upe1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVjZWl2ZXMgZXJyb3IgbWVzc2FnZXMgd2hlbiBhIGRvY3VtZW50IGhhcyBmaW5pc2hlZCBwcmludGVkXHJcbiAgICAgKlxyXG4gICAgICogQGV4YW1wbGUgb25Eb2N1bWVudFByaW50ZWQoKTtcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGpRdWVyeSgnI2RvY3VtZW50Vmlld2VyJykuYmluZCgnb25Eb2N1bWVudFByaW50ZWQnLGZ1bmN0aW9uKGUpe1xyXG5cclxuICAgIH0pO1xyXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2xpYi9mbGV4L2ZsZXhwYXBlcl9oYW5kbGVycy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgM1xuICoqLyIsIi8vIFZFUlNJT046IDIuMyBMQVNUIFVQREFURTogMTEuMDcuMjAxM1xyXG4vKiBcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlOiBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG4gKiBcclxuICogTWFkZSBieSBXaWxxMzIsIHdpbHEzMkBnbWFpbC5jb20sIFdyb2NsYXcsIFBvbGFuZCwgMDEuMjAwOVxyXG4gKiBXZWJzaXRlOiBodHRwOi8vY29kZS5nb29nbGUuY29tL3AvanF1ZXJ5cm90YXRlLyBcclxuICovXHJcblxyXG4oZnVuY3Rpb24oJCkge1xyXG4gICAgdmFyIHN1cHBvcnRlZENTUyxzdXBwb3J0ZWRDU1NPcmlnaW4sIHN0eWxlcz1kb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF0uc3R5bGUsdG9DaGVjaz1cInRyYW5zZm9ybVByb3BlcnR5IFdlYmtpdFRyYW5zZm9ybSBPVHJhbnNmb3JtIG1zVHJhbnNmb3JtIE1velRyYW5zZm9ybVwiLnNwbGl0KFwiIFwiKTtcclxuICAgIGZvciAodmFyIGEgPSAwOyBhIDwgdG9DaGVjay5sZW5ndGg7IGErKykgaWYgKHN0eWxlc1t0b0NoZWNrW2FdXSAhPT0gdW5kZWZpbmVkKSB7IHN1cHBvcnRlZENTUyA9IHRvQ2hlY2tbYV07IH1cclxuICAgIGlmIChzdXBwb3J0ZWRDU1MpIHtcclxuICAgICAgc3VwcG9ydGVkQ1NTT3JpZ2luID0gc3VwcG9ydGVkQ1NTLnJlcGxhY2UoL1t0VF1yYW5zZm9ybS8sXCJUcmFuc2Zvcm1PcmlnaW5cIik7XHJcbiAgICAgIGlmIChzdXBwb3J0ZWRDU1NPcmlnaW5bMF0gPT0gXCJUXCIpIHN1cHBvcnRlZENTU09yaWdpblswXSA9IFwidFwiO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhZCBldmFsIHRvIHByZXZlbiBnb29nbGUgY2xvc3VyZSB0byByZW1vdmUgaXQgZnJvbSBjb2RlIG9fT1xyXG4gICAgZXZhbCgnSUUgPSBcInZcIj09XCJcXHZcIicpO1xyXG5cclxuICAgIGpRdWVyeS5mbi5leHRlbmQoe1xyXG4gICAgICAgIHJvdGF0ZTpmdW5jdGlvbihwYXJhbWV0ZXJzKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmICh0aGlzLmxlbmd0aD09PTB8fHR5cGVvZiBwYXJhbWV0ZXJzPT1cInVuZGVmaW5lZFwiKSByZXR1cm47XHJcbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtZXRlcnM9PVwibnVtYmVyXCIpIHBhcmFtZXRlcnM9e2FuZ2xlOnBhcmFtZXRlcnN9O1xyXG4gICAgICAgICAgdmFyIHJldHVybmVkPVtdO1xyXG4gICAgICAgICAgZm9yICh2YXIgaT0wLGkwPXRoaXMubGVuZ3RoO2k8aTA7aSsrKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB2YXIgZWxlbWVudD10aGlzLmdldChpKTtcdFxyXG4gICAgICAgICAgICBpZiAoIWVsZW1lbnQuV2lscTMyIHx8ICFlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdCkge1xyXG5cclxuICAgICAgICAgICAgICB2YXIgcGFyYW1DbG9uZSA9ICQuZXh0ZW5kKHRydWUsIHt9LCBwYXJhbWV0ZXJzKTsgXHJcbiAgICAgICAgICAgICAgdmFyIG5ld1JvdE9iamVjdCA9IG5ldyBXaWxxMzIuUGhvdG9FZmZlY3QoZWxlbWVudCxwYXJhbUNsb25lKS5fcm9vdE9iajtcclxuXHJcbiAgICAgICAgICAgICAgcmV0dXJuZWQucHVzaCgkKG5ld1JvdE9iamVjdCkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgIGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0Ll9oYW5kbGVSb3RhdGlvbihwYXJhbWV0ZXJzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJldHVybmVkO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZ2V0Um90YXRlQW5nbGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICB2YXIgcmV0ID0gW107XHJcbiAgICAgICAgICBmb3IgKHZhciBpPTAsaTA9dGhpcy5sZW5ndGg7aTxpMDtpKyspXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50PXRoaXMuZ2V0KGkpO1x0XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LldpbHEzMiAmJiBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdCkge1xyXG4gICAgICAgICAgICAgIHJldFtpXSA9IGVsZW1lbnQuV2lscTMyLlBob3RvRWZmZWN0Ll9hbmdsZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgcmV0dXJuIHJldDtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN0b3BSb3RhdGU6IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICBmb3IgKHZhciBpPTAsaTA9dGhpcy5sZW5ndGg7aTxpMDtpKyspXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIHZhciBlbGVtZW50PXRoaXMuZ2V0KGkpO1x0XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LldpbHEzMiAmJiBlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdCkge1xyXG4gICAgICAgICAgICAgIGNsZWFyVGltZW91dChlbGVtZW50LldpbHEzMi5QaG90b0VmZmVjdC5fdGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gTGlicmFyeSBhZ25vc3RpYyBpbnRlcmZhY2VcclxuXHJcbiAgICBXaWxxMzI9d2luZG93LldpbHEzMnx8e307XHJcbiAgICBXaWxxMzIuUGhvdG9FZmZlY3Q9KGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICBpZiAoc3VwcG9ydGVkQ1NTKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGltZyxwYXJhbWV0ZXJzKXtcclxuICAgICAgICAgIGltZy5XaWxxMzIgPSB7XHJcbiAgICAgICAgICAgIFBob3RvRWZmZWN0OiB0aGlzXHJcbiAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgIHRoaXMuX2ltZyA9IHRoaXMuX3Jvb3RPYmogPSB0aGlzLl9ldmVudE9iaiA9IGltZztcclxuICAgICAgICAgIHRoaXMuX2hhbmRsZVJvdGF0aW9uKHBhcmFtZXRlcnMpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaW1nLHBhcmFtZXRlcnMpIHtcclxuICAgICAgICAgIHRoaXMuX2ltZyA9IGltZztcclxuICAgICAgICAgIHRoaXMuX29uTG9hZERlbGVnYXRlID0gW3BhcmFtZXRlcnNdO1xyXG5cclxuICAgICAgICAgIHRoaXMuX3Jvb3RPYmo9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xyXG4gICAgICAgICAgdGhpcy5fcm9vdE9iai5zdHlsZS5kaXNwbGF5PVwiaW5saW5lLWJsb2NrXCI7XHJcbiAgICAgICAgICB0aGlzLl9yb290T2JqLldpbHEzMiA9IFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgUGhvdG9FZmZlY3Q6IHRoaXNcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIGltZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLl9yb290T2JqLGltZyk7XHJcblxyXG4gICAgICAgICAgaWYgKGltZy5jb21wbGV0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLl9Mb2FkZXIoKTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmPXRoaXM7XHJcbiAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBqUXVlcnkgZGVwZW5kZW5jeVxyXG4gICAgICAgICAgICBqUXVlcnkodGhpcy5faW1nKS5iaW5kKFwibG9hZFwiLCBmdW5jdGlvbigpeyBzZWxmLl9Mb2FkZXIoKTsgfSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KSgpO1xyXG5cclxuICAgIFdpbHEzMi5QaG90b0VmZmVjdC5wcm90b3R5cGUgPSB7XHJcbiAgICAgIF9zZXR1cFBhcmFtZXRlcnMgOiBmdW5jdGlvbiAocGFyYW1ldGVycyl7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycyA9IHRoaXMuX3BhcmFtZXRlcnMgfHwge307XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9hbmdsZSAhPT0gXCJudW1iZXJcIikgeyB0aGlzLl9hbmdsZSA9IDAgOyB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBwYXJhbWV0ZXJzLmFuZ2xlPT09XCJudW1iZXJcIikgeyB0aGlzLl9hbmdsZSA9IHBhcmFtZXRlcnMuYW5nbGU7IH1cclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVUbyA9ICh0eXBlb2YgcGFyYW1ldGVycy5hbmltYXRlVG8gPT09IFwibnVtYmVyXCIpID8gKHBhcmFtZXRlcnMuYW5pbWF0ZVRvKSA6ICh0aGlzLl9hbmdsZSk7IFxyXG5cclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLnN0ZXAgPSBwYXJhbWV0ZXJzLnN0ZXAgfHwgdGhpcy5fcGFyYW1ldGVycy5zdGVwIHx8IG51bGw7XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5lYXNpbmcgPSBwYXJhbWV0ZXJzLmVhc2luZyB8fCB0aGlzLl9wYXJhbWV0ZXJzLmVhc2luZyB8fCB0aGlzLl9kZWZhdWx0RWFzaW5nO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb24gPSBwYXJhbWV0ZXJzLmR1cmF0aW9uIHx8IHRoaXMuX3BhcmFtZXRlcnMuZHVyYXRpb24gfHwgMTAwMDtcclxuICAgICAgICB0aGlzLl9wYXJhbWV0ZXJzLmNhbGxiYWNrID0gcGFyYW1ldGVycy5jYWxsYmFjayB8fCB0aGlzLl9wYXJhbWV0ZXJzLmNhbGxiYWNrIHx8IHRoaXMuX2VtcHR5RnVuY3Rpb247XHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5jZW50ZXIgPSBwYXJhbWV0ZXJzLmNlbnRlciB8fCB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlciB8fCBbXCI1MCVcIixcIjUwJVwiXTtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzBdID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgIHRoaXMuX3JvdGF0aW9uQ2VudGVyWCA9IChwYXJzZUludCh0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclswXSwxMCkgLyAxMDApICogdGhpcy5faW1nV2lkdGggKiB0aGlzLl9hc3BlY3RXO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclggPSB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclswXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9wYXJhbWV0ZXJzLmNlbnRlclsxXSA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICB0aGlzLl9yb3RhdGlvbkNlbnRlclkgPSAocGFyc2VJbnQodGhpcy5fcGFyYW1ldGVycy5jZW50ZXJbMV0sMTApIC8gMTAwKSAqIHRoaXMuX2ltZ0hlaWdodCAqIHRoaXMuX2FzcGVjdEg7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuX3JvdGF0aW9uQ2VudGVyWSA9IHRoaXMuX3BhcmFtZXRlcnMuY2VudGVyWzFdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhcmFtZXRlcnMuYmluZCAmJiBwYXJhbWV0ZXJzLmJpbmQgIT0gdGhpcy5fcGFyYW1ldGVycy5iaW5kKSB7IHRoaXMuX0JpbmRFdmVudHMocGFyYW1ldGVycy5iaW5kKTsgfVxyXG4gICAgICB9LFxyXG4gICAgICBfZW1wdHlGdW5jdGlvbjogZnVuY3Rpb24oKXt9LFxyXG4gICAgICBfZGVmYXVsdEVhc2luZzogZnVuY3Rpb24gKHgsIHQsIGIsIGMsIGQpIHsgcmV0dXJuIC1jICogKCh0PXQvZC0xKSp0KnQqdCAtIDEpICsgYiB9LCBcclxuICAgICAgX2hhbmRsZVJvdGF0aW9uIDogZnVuY3Rpb24ocGFyYW1ldGVycywgZG9udGNoZWNrKXtcclxuICAgICAgICBpZiAoIXN1cHBvcnRlZENTUyAmJiAhdGhpcy5faW1nLmNvbXBsZXRlICYmICFkb250Y2hlY2spIHtcclxuICAgICAgICAgIHRoaXMuX29uTG9hZERlbGVnYXRlLnB1c2gocGFyYW1ldGVycyk7XHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX3NldHVwUGFyYW1ldGVycyhwYXJhbWV0ZXJzKTtcclxuICAgICAgICBpZiAodGhpcy5fYW5nbGU9PXRoaXMuX3BhcmFtZXRlcnMuYW5pbWF0ZVRvKSB7XHJcbiAgICAgICAgICB0aGlzLl9yb3RhdGUodGhpcy5fYW5nbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHsgXHJcbiAgICAgICAgICB0aGlzLl9hbmltYXRlU3RhcnQoKTsgICAgICAgICAgXHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgX0JpbmRFdmVudHM6ZnVuY3Rpb24oZXZlbnRzKXtcclxuICAgICAgICBpZiAoZXZlbnRzICYmIHRoaXMuX2V2ZW50T2JqKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICAvLyBVbmJpbmRpbmcgcHJldmlvdXMgRXZlbnRzXHJcbiAgICAgICAgICBpZiAodGhpcy5fcGFyYW1ldGVycy5iaW5kKXtcclxuICAgICAgICAgICAgdmFyIG9sZEV2ZW50cyA9IHRoaXMuX3BhcmFtZXRlcnMuYmluZDtcclxuICAgICAgICAgICAgZm9yICh2YXIgYSBpbiBvbGRFdmVudHMpIGlmIChvbGRFdmVudHMuaGFzT3duUHJvcGVydHkoYSkpIFxyXG4gICAgICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBqUXVlcnkgZGVwZW5kZW5jeVxyXG4gICAgICAgICAgICAgIGpRdWVyeSh0aGlzLl9ldmVudE9iaikudW5iaW5kKGEsb2xkRXZlbnRzW2FdKTtcclxuICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fcGFyYW1ldGVycy5iaW5kID0gZXZlbnRzO1xyXG4gICAgICAgIGZvciAodmFyIGEgaW4gZXZlbnRzKSBpZiAoZXZlbnRzLmhhc093blByb3BlcnR5KGEpKSBcclxuICAgICAgICAgIC8vIFRPRE86IFJlbW92ZSBqUXVlcnkgZGVwZW5kZW5jeVxyXG4gICAgICAgICAgalF1ZXJ5KHRoaXMuX2V2ZW50T2JqKS5iaW5kKGEsZXZlbnRzW2FdKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICBfTG9hZGVyOihmdW5jdGlvbigpXHJcbiAgICAgIHtcclxuICAgICAgICBpZiAoSUUpXHJcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHZhciB3aWR0aD10aGlzLl9pbWcud2lkdGg7XHJcbiAgICAgICAgICAgIHZhciBoZWlnaHQ9dGhpcy5faW1nLmhlaWdodDtcclxuICAgICAgICAgICAgdGhpcy5faW1nV2lkdGggPSB3aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5faW1nSGVpZ2h0ID0gaGVpZ2h0OyBcclxuICAgICAgICAgICAgdGhpcy5faW1nLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5faW1nKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZSA9IHRoaXMuY3JlYXRlVk1MTm9kZSgnaW1hZ2UnKTtcclxuICAgICAgICAgICAgdGhpcy5fdmltYWdlLnNyYz10aGlzLl9pbWcuc3JjO1xyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUuaGVpZ2h0PWhlaWdodCtcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS53aWR0aD13aWR0aCtcInB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCI7IC8vIEZJWEVTIElFIFBST0JMRU0gLSBpdHMgb25seSByZW5kZXJlZCBpZiBpdHMgb24gYWJzb2x1dGUgcG9zaXRpb24hXHJcbiAgICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS50b3AgPSBcIjBweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl92aW1hZ2Uuc3R5bGUubGVmdCA9IFwiMHB4XCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2FzcGVjdFcgPSB0aGlzLl9hc3BlY3RIID0gMTtcclxuXHJcbiAgICAgICAgICAgIC8qIEdyb3VwIG1pbmlmeWluZyBhIHNtYWxsIDFweCBwcmVjaXNpb24gcHJvYmxlbSB3aGVuIHJvdGF0aW5nIG9iamVjdCAqL1xyXG4gICAgICAgICAgICB0aGlzLl9jb250YWluZXIgPSB0aGlzLmNyZWF0ZVZNTE5vZGUoJ2dyb3VwJyk7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS53aWR0aD13aWR0aDtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmhlaWdodD1oZWlnaHQ7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS50b3A9XCIwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnN0eWxlLmxlZnQ9XCIwcHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY29vcmRzaXplJyx3aWR0aC0xKycsJysoaGVpZ2h0LTEpKTsgLy8gVGhpcyAtMSwgLTEgdHJ5aW5nIHRvIGZpeCB1Z2x5IHByb2JsZW0gd2l0aCBzbWFsbCBkaXNwbGFjZW1lbnQgb24gSUVcclxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3ZpbWFnZSk7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmFwcGVuZENoaWxkKHRoaXMuX2NvbnRhaW5lcik7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiOyAvLyBGSVhFUyBJRSBQUk9CTEVNXHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUud2lkdGg9d2lkdGgrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLmhlaWdodD1oZWlnaHQrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnNldEF0dHJpYnV0ZSgnaWQnLHRoaXMuX2ltZy5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmNsYXNzTmFtZT10aGlzLl9pbWcuY2xhc3NOYW1lO1x0XHRcdFxyXG4gICAgICAgICAgICB0aGlzLl9ldmVudE9iaiA9IHRoaXMuX3Jvb3RPYmo7XHRcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHdoaWxlIChwYXJhbWV0ZXJzID0gdGhpcy5fb25Mb2FkRGVsZWdhdGUuc2hpZnQoKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVJvdGF0aW9uKHBhcmFtZXRlcnMsIHRydWUpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGVsc2UgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5zZXRBdHRyaWJ1dGUoJ2lkJyx0aGlzLl9pbWcuZ2V0QXR0cmlidXRlKCdpZCcpKTtcclxuICAgICAgICAgICAgdGhpcy5fcm9vdE9iai5jbGFzc05hbWU9dGhpcy5faW1nLmNsYXNzTmFtZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2ltZ1dpZHRoPXRoaXMuX2ltZy5uYXR1cmFsV2lkdGg7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltZ0hlaWdodD10aGlzLl9pbWcubmF0dXJhbEhlaWdodDtcclxuICAgICAgICAgICAgdmFyIF93aWR0aE1heD1NYXRoLnNxcnQoKHRoaXMuX2ltZ0hlaWdodCkqKHRoaXMuX2ltZ0hlaWdodCkgKyAodGhpcy5faW1nV2lkdGgpICogKHRoaXMuX2ltZ1dpZHRoKSk7XHJcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gX3dpZHRoTWF4ICogMztcclxuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gX3dpZHRoTWF4ICogMztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2FzcGVjdFcgPSB0aGlzLl9pbWcub2Zmc2V0V2lkdGgvdGhpcy5faW1nLm5hdHVyYWxXaWR0aDtcclxuICAgICAgICAgICAgdGhpcy5fYXNwZWN0SCA9IHRoaXMuX2ltZy5vZmZzZXRIZWlnaHQvdGhpcy5faW1nLm5hdHVyYWxIZWlnaHQ7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9pbWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzLl9pbWcpO1x0XHJcblxyXG5cclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc2V0QXR0cmlidXRlKCd3aWR0aCcsdGhpcy5fd2lkdGgpO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUucG9zaXRpb249XCJyZWxhdGl2ZVwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuc3R5bGUubGVmdCA9IC10aGlzLl9pbWcuaGVpZ2h0ICogdGhpcy5fYXNwZWN0VyArIFwicHhcIjtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLnN0eWxlLnRvcCA9IC10aGlzLl9pbWcud2lkdGggKiB0aGlzLl9hc3BlY3RIICsgXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMuV2lscTMyID0gdGhpcy5fcm9vdE9iai5XaWxxMzI7XHJcblxyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLmFwcGVuZENoaWxkKHRoaXMuX2NhbnZhcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX3Jvb3RPYmouc3R5bGUud2lkdGg9dGhpcy5faW1nLndpZHRoKnRoaXMuX2FzcGVjdFcrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9yb290T2JqLnN0eWxlLmhlaWdodD10aGlzLl9pbWcuaGVpZ2h0KnRoaXMuX2FzcGVjdEgrXCJweFwiO1xyXG4gICAgICAgICAgICB0aGlzLl9ldmVudE9iaiA9IHRoaXMuX2NhbnZhcztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudj10aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcclxuICAgICAgICAgICAgdmFyIHBhcmFtZXRlcnM7XHJcbiAgICAgICAgICAgIHdoaWxlIChwYXJhbWV0ZXJzID0gdGhpcy5fb25Mb2FkRGVsZWdhdGUuc2hpZnQoKSkge1xyXG4gICAgICAgICAgICAgIHRoaXMuX2hhbmRsZVJvdGF0aW9uKHBhcmFtZXRlcnMsIHRydWUpO1x0XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH1cclxuICAgICAgfSkoKSxcclxuXHJcbiAgICAgIF9hbmltYXRlU3RhcnQ6ZnVuY3Rpb24oKVxyXG4gICAgICB7XHRcclxuICAgICAgICBpZiAodGhpcy5fdGltZXIpIHtcclxuICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuX2FuaW1hdGVTdGFydFRpbWUgPSArbmV3IERhdGU7XHJcbiAgICAgICAgdGhpcy5fYW5pbWF0ZVN0YXJ0QW5nbGUgPSB0aGlzLl9hbmdsZTtcclxuICAgICAgICB0aGlzLl9hbmltYXRlKCk7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9hbmltYXRlOmZ1bmN0aW9uKClcclxuICAgICAge1xyXG4gICAgICAgIHZhciBhY3R1YWxUaW1lID0gK25ldyBEYXRlO1xyXG4gICAgICAgIHZhciBjaGVja0VuZCA9IGFjdHVhbFRpbWUgLSB0aGlzLl9hbmltYXRlU3RhcnRUaW1lID4gdGhpcy5fcGFyYW1ldGVycy5kdXJhdGlvbjtcclxuXHJcbiAgICAgICAgLy8gVE9ETzogQnVnIGZvciBhbmltYXRlZEdpZiBmb3Igc3RhdGljIHJvdGF0aW9uID8gKHRvIHRlc3QpXHJcbiAgICAgICAgaWYgKGNoZWNrRW5kICYmICF0aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVkR2lmKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5fdGltZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIFxyXG4gICAgICAgIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9jYW52YXN8fHRoaXMuX3ZpbWFnZXx8dGhpcy5faW1nKSB7XHJcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IHRoaXMuX3BhcmFtZXRlcnMuZWFzaW5nKDAsIGFjdHVhbFRpbWUgLSB0aGlzLl9hbmltYXRlU3RhcnRUaW1lLCB0aGlzLl9hbmltYXRlU3RhcnRBbmdsZSwgdGhpcy5fcGFyYW1ldGVycy5hbmltYXRlVG8gLSB0aGlzLl9hbmltYXRlU3RhcnRBbmdsZSwgdGhpcy5fcGFyYW1ldGVycy5kdXJhdGlvbik7XHJcbiAgICAgICAgICAgIHRoaXMuX3JvdGF0ZSgofn4oYW5nbGUqMTApKS8xMCk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICBpZiAodGhpcy5fcGFyYW1ldGVycy5zdGVwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuc3RlcCh0aGlzLl9hbmdsZSk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICB0aGlzLl90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBzZWxmLl9hbmltYXRlLmNhbGwoc2VsZik7XHJcbiAgICAgICAgICB9LCAxMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgLy8gVG8gZml4IEJ1ZyB0aGF0IHByZXZlbnRzIHVzaW5nIHJlY3Vyc2l2ZSBmdW5jdGlvbiBpbiBjYWxsYmFjayBJIG1vdmVkIHRoaXMgZnVuY3Rpb24gdG8gYmFja1xyXG4gICAgICBpZiAodGhpcy5fcGFyYW1ldGVycy5jYWxsYmFjayAmJiBjaGVja0VuZCl7XHJcbiAgICAgICAgdGhpcy5fYW5nbGUgPSB0aGlzLl9wYXJhbWV0ZXJzLmFuaW1hdGVUbztcclxuICAgICAgICB0aGlzLl9yb3RhdGUodGhpcy5fYW5nbGUpO1xyXG4gICAgICAgIHRoaXMuX3BhcmFtZXRlcnMuY2FsbGJhY2suY2FsbCh0aGlzLl9yb290T2JqKTtcclxuICAgICAgfVxyXG4gICAgICB9LFxyXG5cclxuICAgICAgX3JvdGF0ZSA6IChmdW5jdGlvbigpXHJcbiAgICAgIHtcclxuICAgICAgICB2YXIgcmFkID0gTWF0aC5QSS8xODA7XHJcbiAgICAgICAgaWYgKElFKVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFuZ2xlKVxyXG4gICAgICAgIHtcclxuICAgICAgICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XHJcbiAgICAgICAgICB0aGlzLl9jb250YWluZXIuc3R5bGUucm90YXRpb249KGFuZ2xlJTM2MCkrXCJkZWdcIjtcclxuICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS50b3AgPSAtKHRoaXMuX3JvdGF0aW9uQ2VudGVyWSAtIHRoaXMuX2ltZ0hlaWdodC8yKSArIFwicHhcIjtcclxuICAgICAgICAgIHRoaXMuX3ZpbWFnZS5zdHlsZS5sZWZ0ID0gLSh0aGlzLl9yb3RhdGlvbkNlbnRlclggLSB0aGlzLl9pbWdXaWR0aC8yKSArIFwicHhcIjtcclxuICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS50b3AgPSB0aGlzLl9yb3RhdGlvbkNlbnRlclkgLSB0aGlzLl9pbWdIZWlnaHQvMiArIFwicHhcIjtcclxuICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5zdHlsZS5sZWZ0ID0gdGhpcy5fcm90YXRpb25DZW50ZXJYIC0gdGhpcy5faW1nV2lkdGgvMiArIFwicHhcIjtcclxuXHJcbiAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBpZiAoc3VwcG9ydGVkQ1NTKVxyXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFuZ2xlKXtcclxuICAgICAgICAgICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcclxuICAgICAgICAgICAgdGhpcy5faW1nLnN0eWxlW3N1cHBvcnRlZENTU109XCJyb3RhdGUoXCIrKGFuZ2xlJTM2MCkrXCJkZWcpXCI7XHJcbiAgICAgICAgICAgIHRoaXMuX2ltZy5zdHlsZVtzdXBwb3J0ZWRDU1NPcmlnaW5dPXRoaXMuX3BhcmFtZXRlcnMuY2VudGVyLmpvaW4oXCIgXCIpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgZWxzZSBcclxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGFuZ2xlKVxyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICB0aGlzLl9hbmdsZSA9IGFuZ2xlO1xyXG4gICAgICAgICAgICBhbmdsZT0oYW5nbGUlMzYwKSogcmFkO1xyXG4gICAgICAgICAgICAvLyBjbGVhciBjYW52YXNcdFxyXG4gICAgICAgICAgICB0aGlzLl9jYW52YXMud2lkdGggPSB0aGlzLl93aWR0aDsvLyt0aGlzLl93aWR0aEFkZDtcclxuICAgICAgICAgICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IHRoaXMuX2hlaWdodDsvLyt0aGlzLl9oZWlnaHRBZGQ7XHJcblxyXG4gICAgICAgICAgICAvLyBSRU1FTUJFUjogYWxsIGRyYXdpbmdzIGFyZSByZWFkIGZyb20gYmFja3dhcmRzLi4gc28gZmlyc3QgZnVuY3Rpb24gaXMgdHJhbnNsYXRlLCB0aGVuIHJvdGF0ZSwgdGhlbiB0cmFuc2xhdGUsIHRyYW5zbGF0ZS4uXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi50cmFuc2xhdGUodGhpcy5faW1nV2lkdGgqdGhpcy5fYXNwZWN0Vyx0aGlzLl9pbWdIZWlnaHQqdGhpcy5fYXNwZWN0SCk7XHQvLyBhdCBsZWFzdCBjZW50ZXIgaW1hZ2Ugb24gc2NyZWVuXHJcbiAgICAgICAgICAgIHRoaXMuX2Nudi50cmFuc2xhdGUodGhpcy5fcm90YXRpb25DZW50ZXJYLHRoaXMuX3JvdGF0aW9uQ2VudGVyWSk7XHRcdFx0Ly8gd2UgbW92ZSBpbWFnZSBiYWNrIHRvIGl0cyBvcmdpbmFsIFxyXG4gICAgICAgICAgICB0aGlzLl9jbnYucm90YXRlKGFuZ2xlKTtcdFx0XHRcdFx0XHRcdFx0XHRcdC8vIHJvdGF0ZSBpbWFnZVxyXG4gICAgICAgICAgICB0aGlzLl9jbnYudHJhbnNsYXRlKC10aGlzLl9yb3RhdGlvbkNlbnRlclgsLXRoaXMuX3JvdGF0aW9uQ2VudGVyWSk7XHRcdC8vIG1vdmUgaW1hZ2UgdG8gaXRzIGNlbnRlciwgc28gd2UgY2FuIHJvdGF0ZSBhcm91bmQgaXRzIGNlbnRlclxyXG4gICAgICAgICAgICB0aGlzLl9jbnYuc2NhbGUodGhpcy5fYXNwZWN0Vyx0aGlzLl9hc3BlY3RIKTsgLy8gU0NBTEUgLSBpZiBuZWVkZWQgOylcclxuICAgICAgICAgICAgdGhpcy5fY252LmRyYXdJbWFnZSh0aGlzLl9pbWcsIDAsIDApO1x0XHRcdFx0XHRcdFx0Ly8gRmlyc3QgLSB3ZSBkcmF3IGltYWdlXHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICB9KSgpXHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChJRSlcclxuICAgICAge1xyXG4gICAgICAgIFdpbHEzMi5QaG90b0VmZmVjdC5wcm90b3R5cGUuY3JlYXRlVk1MTm9kZT0oZnVuY3Rpb24oKXtcclxuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZVN0eWxlU2hlZXQoKS5hZGRSdWxlKFwiLnJ2bWxcIiwgXCJiZWhhdmlvcjp1cmwoI2RlZmF1bHQjVk1MKVwiKTtcclxuICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICFkb2N1bWVudC5uYW1lc3BhY2VzLnJ2bWwgJiYgZG9jdW1lbnQubmFtZXNwYWNlcy5hZGQoXCJydm1sXCIsIFwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LWNvbTp2bWxcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8cnZtbDonICsgdGFnTmFtZSArICcgY2xhc3M9XCJydm1sXCI+Jyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodGFnTmFtZSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCc8JyArIHRhZ05hbWUgKyAnIHhtbG5zPVwidXJuOnNjaGVtYXMtbWljcm9zb2Z0LmNvbTp2bWxcIiBjbGFzcz1cInJ2bWxcIj4nKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cdFx0XHJcbiAgICAgICAgfSkoKTtcclxuICAgICAgfVxyXG5cclxufSkoalF1ZXJ5KTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9saWIvanEucm90YXRlLmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwiZnVuY3Rpb24gZW1wdHlGdW4ocmVzKXtcclxuXHRjb25zb2xlLmxvZyhyZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1VybCh1cmwpe1xyXG5cdGlmKHVybC5pbmRleE9mKCc/Jyk+PTApe1xyXG5cdFx0cmV0dXJuIHVybCArPScmX3Q9JytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiB1cmwgKz0nP190PScrbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdQT1NUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogY2hlY2tVcmwodXJsKSxcclxuXHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheChvcHQsY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXHJcblx0XHR1cmwgPSBvcHQudXJsLFxyXG5cdFx0ZGF0YSA9IG9wdC5kYXRhO1xyXG5cclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlIDogdHlwZSxcclxuXHRcdHVybCA6IGNoZWNrVXJsKHVybCksXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XFxyXFxuICAgICAgICAgIDxzcGFuPjwlLXRpdGxlJT48L3NwYW4+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJhY3Rpb24tYXJlYVwiPlxcclxcbiAgICAgICAgICAgIDwlaWYobXkuYXV0aCA9PT0gMSl7JT5cXHJcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIiBkYXRhLWlkPVwiPCUtaWQlPlwiIGRhdGEtc3RhdHVzPVwiPCUtc3RhdHVzJT5cIj48JWlmKHN0YXR1cyl7JT7lj5bmtojnva7pobY8JX1lbHNleyU+572u6aG2PCV9JT48L2E+XFxyXFxuICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmUgdGltZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBocmVmPVwiI2Zha2VsaW5rXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXFxyXFxuICAgICAgICAgICAgPGEgY2xhc3M9XCJyZXR1cm5cIiBocmVmPVwiL2luZm8uaHRtbD9pZD08JS1zdWJqZWN0X2lkJT5cIj7ov5Tlm548L2E+XFxyXFxuICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1saXN0XCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZVwiPlxcclxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSklPjwvZGl2PlxcclxcbiAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj48JS1uYW1lJT48L2Rpdj5cXHJcXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgICAgICAgICAgPCVpZihteS5hdXRoID09PSAxIHx8IG15LmlkID09PSBjcmVhdG9yKXslPlxcclxcbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiPjxzcGFuPjwvc3Bhbj7nvJbovpE8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj4gXFxyXFxuICAgICAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgIGRhdGEtYWN0aW9uPVwic2V0dXBcIiAgZGF0YS1pZD1cIjwlLWlkJT5cIj48c3Bhbj48L3NwYW4+6LWePC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIj48c3Bhbj48L3NwYW4+5Zue5aSNIDxmb250IGlkPVwiY29tbWVudENvdW50XCI+PCUtY29tbWVudENvdW50JT48L2ZvbnQ+PC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDxkbCBjbGFzcz1cImNvbW1lbnQtZGxcIj5cXHJcXG4gICAgICAgICAgICAgICAgICA8ZHQ+PGE+PCUtdGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgICAgICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlLWNvbnRlbnQlPlxcclxcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICAgICAgICAgIDwlZm9yKHZhciBqPTAsbT1yZXNvdXJjZUxpc3QubGVuZ3RoO2o8bTtqKyspe1xcclxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1vYmouaWQlPlwiICBkYXRhLWlkPVwiPCUtb2JqLmlkJT5cIiBkYXRhLWFjdGlvbj1cInJldmlld1wiIHdpZHRoPVwiMjAwXCIgLz5cXHJcXG4gICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgICAgICAgICAgICA8JX19JT4gICAgICAgICAgICAgICAgICBcXHJcXG4gICAgICAgICAgXFxyXFxuICAgICAgICAgICAgICAgIDwvZGw+XFxyXFxuICAgICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+XFxuICAgICAgICAgIDxzcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDIsIHRpdGxlKSwgJzwvc3Bhbj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImFjdGlvbi1hcmVhXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0O1xuICAgICAgICAgICAgICAgIGlmIChteS5hdXRoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaWQpLCAnXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBzdGF0dXMpLCAnXCI+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlj5bmtojnva7pobZcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIue9rumhtlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIjwvYT5cXG4gICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlLWJ0blwiIGhyZWY9XCIjZmFrZWxpbmtcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl1cGRhdGVcIj7mjInmm7TmlrDml7bpl7TmjpLluo88L2E+XFxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcXG4gICAgICAgICAgICA8YSBjbGFzcz1cInJldHVyblwiIGhyZWY9XCIvaW5mby5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDExLCBzdWJqZWN0X2lkKSwgJ1wiPui/lOWbnjwvYT5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LWxpc3RcIj5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lXCI+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtYXNpZGVcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxNiwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUodXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1vbmUtaW5mb1wiPlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDE4LCBuYW1lKSwgJzwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIwO1xuICAgICAgICAgICAgICAgIGlmIChteS5hdXRoID09PSAxIHx8IG15LmlkID09PSBjcmVhdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImVkaXRcIiBkYXRhLWFjdGlvbj1cImVkaXRcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+IFxcbiAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiICBkYXRhLWFjdGlvbj1cInNldHVwXCIgIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAyMywgaWQpLCAnXCI+PHNwYW4+PC9zcGFuPui1njwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCI+PHNwYW4+PC9zcGFuPuWbnuWkjSA8Zm9udCBpZD1cImNvbW1lbnRDb3VudFwiPicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBjb21tZW50Q291bnQpLCAnPC9mb250Pjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICAgICAgICAgICAgPGR0PjxhPicsIChfX3N0YWNrLmxpbmVubyA9IDI2LCB0aXRsZSksIFwiPC9hPjwvZHQ+XFxuICAgICAgICAgICAgICAgICAgPGRkPlxcbiAgICAgICAgICAgICAgICAgICAgXCIsIChfX3N0YWNrLmxpbmVubyA9IDI4LCBjb250ZW50KSwgJ1xcbiAgICAgICAgICAgICAgICAgIDwvZGQ+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtaW1nLWxpc3RcIj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDAsIG0gPSByZXNvdXJjZUxpc3QubGVuZ3RoOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvYmogPSByZXNvdXJjZUxpc3Rbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmoudHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDM3LCBvYmouaWQpLCAnXCIgIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzNywgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgd2lkdGg9XCIyMDBcIiAvPlxcbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgPC9kbD5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDMwXG4gKiogbW9kdWxlIGNodW5rcyA9IDNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5jb25zb2xlLmxvZyhteSk7XFxyXFxuZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICB2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGU8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtYXNpZGVcIj48JS1zdHJpa2VyLnV0aWwuZ2V0Tm93VGltZShpdGVtLnVwZGF0ZVRpbWUpJT48L2Rpdj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWIDwlLWl0ZW0uY3JlYXRvck5hbWUlPiAgIOacgOWQjuWbnuWkjSA8JS1pdGVtLnVwZGF0b3JOYW1lJT48L2Rpdj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJwb3N0XCIgZGF0YS1hY3Rpb249XCJyZXBsYXlcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gXFxyXFxuICAgICAgICA8JWlmKG15LmlkID09PSBpdGVtLmNyZWF0b3IgfHwgbXkuYXV0aCA9PT0gMSl7JT5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+JnNpZD08JS1pdGVtLnN1YmplY3RfaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5pbWdudW0+MCl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xcclxcbiAgICAgICAgICAgIHZhciBpbWdudW0gPSAwO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICBpZihpbWdudW0+Mil7XFxyXFxuICAgICAgICAgICAgICAgICAgYnJlYWs7XFxyXFxuICAgICAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiBkYXRhLXBpZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXHJcXG4gICAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICAgIGltZ251bSsrO1xcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhteSk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lIGFydGljbGUnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLmlkKSwgJ1wiPlxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPicsIChfX3N0YWNrLmxpbmVubyA9IDcsIHN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSkpLCAnPC9kaXY+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmNyZWF0b3JOYW1lKSwgXCIgICDmnIDlkI7lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0udXBkYXRvck5hbWUpLCAnPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cInVwXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDExLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2V0dXBcIiBkYXRhLXN0YXR1cz1cIicsIChfX3N0YWNrLmxpbmVubyA9IDExLCBpdGVtLmlzU3RhciksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmlzU3Rhcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDExO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLotZ5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDExO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDExLCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7lm57lpI08L3NwYW4+IFxcbiAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChteS5pZCA9PT0gaXRlbS5jcmVhdG9yIHx8IG15LmF1dGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZGVsZXRlXCIgZGF0YS1hY3Rpb249XCJkZWxldGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWIoOmZpDwvc3Bhbj5cXG4gICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMTcsIGl0ZW0uaWQpLCBcIiZzaWQ9XCIsIChfX3N0YWNrLmxpbmVubyA9IDE3LCBpdGVtLnN1YmplY3RfaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTcsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPlxcbiAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMTksIGl0ZW0uY29udGVudCksIFwiXFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDIxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWdudW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZ251bSA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzUsIG9iai5pZCksICdcIiBkYXRhLXBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDM1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzNSwgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdudW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsVwiLCAoX19zdGFjay5saW5lbm8gPSA0MSwgaXRlbS5pbWdudW0pLCBcIuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDY7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICA8c3BhbiBkYXRhLWFjdGlvbj1cImxvZ291dFwiPjxzcGFuIGNsYXNzPVwidXNlclwiPjwvc3Bhbj48JS1uYW1lJT48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIiA+PHNwYW4+PC9zcGFuPjxkaXY+PC9kaXY+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCIgZGF0YS1hY3Rpb249XCJzZWFyY2hcIj48L3NwYW4+XFxyXFxuICAgICAgPHNwYW4gY2xhc3M9XCJtZW11XCI+PC9zcGFuPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgIDxzcGFuIGRhdGEtYWN0aW9uPVwibG9nb3V0XCI+PHNwYW4gY2xhc3M9XCJ1c2VyXCI+PC9zcGFuPicsIChfX3N0YWNrLmxpbmVubyA9IDEsIG5hbWUpLCAnPC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiIGRhdGEtYWN0aW9uPVwic2VhcmNoXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcclxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXHJcXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxyXFxuICAgIDwvc3Bhbj5cXHJcXG48L2Rpdj4gXFxyXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxyXFxuICA8dWw+XFxyXFxuICA8JVxcclxcbiAgICBmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgICAgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAlPiBcXHJcXG4gICAgICA8bGkgaWQ9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgY2xhc3M9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIj48JS1pdGVtLm5hbWUlPjwvbGk+XFxyXFxuICA8JX0lPlxcclxcbiAgPC91bD5cXHJcXG48L2Rpdj4gICcsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxuICAgIDwvc3Bhbj5cXG48L2Rpdj4gXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxuICA8dWw+XFxuICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyBcXG4gICAgICA8bGkgaWQ9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgY2xhc3M9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgXCI8L2xpPlxcbiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgPC91bD5cXG48L2Rpdj4gIFwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2U8JS1pZCU+XCIgZGF0YS1pZD1cIjwlLWlkJT5cIj5cXHJcXG5cdDwlLW5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2UnLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSAyLCBuYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcblx0dmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XFxyXFxuJT5cXHJcXG48bGkgdGl0bGU9XCI8JS1pdGVtLm1lc3NhZ2UlPlwiPjxhIGRhdGEtaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1vYmouYXJ0aWNsZUlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1yZWFkPVwiPCUtaXRlbS5yZWFkJT5cIj48JS1pdGVtLm1lc3NhZ2UlPjwvYT48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgdGl0bGU9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm1lc3NhZ2UpLCAnXCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIG9iai5hcnRpY2xlSWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0uaWQpLCAnXCIgZGF0YS1yZWFkPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5yZWFkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubWVzc2FnZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2cuZWpzXG4gKiogbW9kdWxlIGlkID0gMzdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lIGNvbW1lbnQ8JS1pdGVtLmlkJT5cIj5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+PCUtc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSU+PC9kaXY+XFxyXFxuICAgIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+PC9kaXY+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tYWN0aW9uXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgICAgIDwlaWYobXkuYXV0aCA9PT0gMSB8fCBteS5pZCA9PT0gaXRlbS5jcmVhdG9yKXslPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcclxcbiAgICAgICAgICAgIDwlfSU+IFxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiPCUtaXRlbS5pc1N0YXIlPlwiPjxzcGFuPjwvc3Bhbj48JWlmKGl0ZW0uaXNTdGFyKXslPuW3sui1njwlfWVsc2V7JT7otZ48JX0lPjwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cImNvbGxlY3RcIiAgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzQ29sbGVjdCU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5Y+W5raI5pS26JePPCV9ZWxzZXslPuaUtuiXjzwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWNuYW1lPVwiPCUtaXRlbS5jcmVhdG9yTmFtZSU+XCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj5cXHJcXG4gICAgICAgICAgPC9kaXY+IFxcclxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxyXFxuICAgICAgICA8ZHQ+PCUtaXRlbS50aXRsZSU+PC9kdD5cXHJcXG4gICAgICAgIDxkZD5cXHJcXG4gICAgICAgICAgPCUtaXRlbS5jb250ZW50JT5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8JWlmKGl0ZW0ucmVzb3VyY2UpeyU+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcclxcbiAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgIHZhciBpbWdudW0gPSAwO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICBpZihpbWdudW0+Mil7XFxyXFxuICAgICAgICAgICAgICAgICAgYnJlYWs7XFxyXFxuICAgICAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgICAgICAgaW1nbnVtKys7XFxyXFxuICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgPGRpdj5cXHJcXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLW9iai5pZCU+XCIgIGRhdGEtcGlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLW9iai5pZCU+XCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxyXFxuICAgICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIDwlfX0lPlxcclxcbiAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICA8L2Rpdj5cXHJcXG4gIDwvZGl2PlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gIDxkaXYgY2xhc3M9XCJjb21tZW50LW9uZSBjb21tZW50JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImNvbW1lbnQtb25lLWluZm9cIj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby10aXRsZVwiPuWPkeW4liAnLCAoX19zdGFjay5saW5lbm8gPSA3LCBpdGVtLmNyZWF0b3JOYW1lKSwgJzwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG15LmF1dGggPT09IDEgfHwgbXkuaWQgPT09IGl0ZW0uY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZWRpdFwiIGRhdGEtYWN0aW9uPVwiZWRpdFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+57yW6L6RPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiICBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMSwgaXRlbS5pZCksICdcIj48c3Bhbj48L3NwYW4+5Yig6ZmkPC9zcGFuPlxcbiAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnIFxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJzZXR1cFwiIGRhdGEtc3RhdHVzPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaXNTdGFyKSwgJ1wiPjxzcGFuPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuW3sui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTM7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJzwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cImNvbGxlY3RcIiAgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pc0NvbGxlY3QpLCAnXCI+PHNwYW4+PC9zcGFuPicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEzO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pc1N0YXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5Y+W5raI5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi5pS26JePXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxMztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5pZCksICdcIiBkYXRhLWNuYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uY3JlYXRvck5hbWUpLCAnXCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+IFxcbiAgICAgIDwvZGl2PiAgICAgICAgICBcXG4gICAgICA8ZGwgY2xhc3M9XCJjb21tZW50LWRsXCI+XFxuICAgICAgICA8ZHQ+JywgKF9fc3RhY2subGluZW5vID0gMTcsIGl0ZW0udGl0bGUpLCBcIjwvZHQ+XFxuICAgICAgICA8ZGQ+XFxuICAgICAgICAgIFwiLCAoX19zdGFjay5saW5lbm8gPSAxOSwgaXRlbS5jb250ZW50KSwgXCJcXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnJlc291cmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29tbWVudC1pbWctbGlzdFwiPlxcbiAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjM7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZ251bSA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltZ251bSsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICAgIDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDM1LCBvYmouaWQpLCAnXCIgIGRhdGEtcGlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDM1LCBvYmouaWQpLCAnXCIgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiB3aWR0aD1cIjIwMFwiIC8+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM3O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2NvbW1lbnQvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzOFxuICoqIG1vZHVsZSBjaHVua3MgPSAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICdcdDxkaXYgY2xhc3M9XCJyZXZpZXctY2xvc2VcIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9kaXY+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxcclxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZXZpZXdcIiBpZD1cInJldmlld0RpdlwiPlxcclxcblx0XHQ8L2Rpdj4gIFxcclxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1zZWxlY3QtYmxvY2tcIiBpZD1cInJldmlld0Jsb2NrXCI+XFxyXFxuXHRcdDwvZGl2PiAgXFxyXFxuXHRcdDxkaXYgY2xhc3M9XCJyZXZpZXctYmdcIj48L2Rpdj5cXHJcXG5cdDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1x0PGRpdiBjbGFzcz1cInJldmlldy1jbG9zZVwiIGRhdGEtYWN0aW9uPVwiY2xvc2VcIj48L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJldmlld1wiIGlkPVwicmV2aWV3RGl2XCI+XFxuXHRcdDwvZGl2PiAgXFxuXHRcdDxkaXYgY2xhc3M9XCJmaWxlLXNlbGVjdC1ibG9ja1wiIGlkPVwicmV2aWV3QmxvY2tcIj5cXG5cdFx0PC9kaXY+ICBcXG5cdFx0PGRpdiBjbGFzcz1cInJldmlldy1iZ1wiPjwvZGl2Plxcblx0PC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmV2aWV3L2JvZHkuZWpzXG4gKiogbW9kdWxlIGlkID0gNDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxkaXYgY2xhc3M9XCJhbC1hcnJvd1wiIHRpdGxhPVwi5LiK5LiA5Liq5paH5Lu2XCIgZGF0YS1hY3Rpb249XCJzaG93UHJlXCI+PC9kaXY+XFxyXFxuPCVcXHJcXG5cdGlmKHR5cGUgPT0gMSl7XFxyXFxuJT5cXHJcXG5cdDxkaXYgY2xhc3M9XCJyZXZpZXctaW1nLWJsb2NrXCI+XFxyXFxuXHRcdDxpbWcgaWQ9XCJyZXZpZXdJbWdcIiBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtaWQlPlwiIGFsaWduPVwiYWJzbWlkZGxlXCIgLz5cXHJcXG5cdDwvZGl2Plxcclxcblx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxyXFxuXHRcdFx0PGRsPlxcclxcblx0XHRcdFx0PGR0PuaWh+S7tuWQjTo8JS1uYW1lJT48L2R0Plxcclxcblx0XHRcdFx0PGRkPlxcclxcblx0XHRcdFx0XHTmlofku7blpKflsI86IDwlLXNpemUlPlxcclxcblx0XHRcdFx0XHTml7bpl7Q6IDwlLWNyZWF0ZVRpbWUlPlxcclxcblx0XHRcdFx0PC9kZD5cXHJcXG5cdFx0XHQ8L2RsPlxcclxcblx0XHRcdDxkaXYgY2xhc3M9XCJmaWxlLWFjdFwiPlx0XHRcdFxcclxcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0by1sZWZ0XCI+5bem6L2sPC9zcGFuPlxcclxcblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJ0by1yaWdodFwiPuWPs+i9rDwvc3Bhbj5cXHJcXG5cdFx0XHQ8L2Rpdj5cXHJcXG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0LWJnXCI+PC9kaXY+XFxyXFxuXHRcdDwvZGl2Plx0XFxyXFxuPCV9ZWxzZSBpZih0eXBlID09IDIpeyU+XFxyXFxuXHQ8ZGl2IGlkPVwiZG9jdW1lbnRWaWV3ZXJcIiBjbGFzcz1cImZsZXhwYXBlcl92aWV3ZXJcIj5cXHJcXG5cdFx0XFxyXFxuXHQ8L2Rpdj5cXHJcXG48JX1lbHNlIGlmKHR5cGUgPT0gMyB8fCB0eXBlPT00KXslPlxcclxcblx0PGRpdiBjbGFzcz1cInBsYXllclpvbmVcIj5cXHJcXG5cdCAgPHZpZGVvIGlkPVwiZXhhbXBsZV92aWRlb18xXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCIgY29udHJvbHMgcHJlbG9hZD1cIm5vbmVcIiB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjI2NFwiXFxyXFxuXHQgICAgICBcXHJcXG5cdCAgICAgIGRhdGEtc2V0dXA9XCJ7fVwiPlxcclxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pZCU+XCIgdHlwZT1cXCd2aWRlby9tcDRcXCcgLz5cXHJcXG5cdCAgICA8c291cmNlIHNyYz1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9PCUtaWQlPlwiIHR5cGU9XFwndmlkZW8vd2VibVxcJyAvPlxcclxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pZCU+XCIgdHlwZT1cXCd2aWRlby9vZ2dcXCcgLz5cXHJcXG5cdCAgICA8dHJhY2sga2luZD1cImNhcHRpb25zXCIgc3JjPVwiZGVtby5jYXB0aW9ucy52dHRcIiBzcmNsYW5nPVwiZW5cIiBsYWJlbD1cIkVuZ2xpc2hcIj48L3RyYWNrPjwhLS0gVHJhY2tzIG5lZWQgYW4gZW5kaW5nIHRhZyB0aGFua3MgdG8gSUU5IC0tPlxcclxcblx0ICAgIDx0cmFjayBraW5kPVwic3VidGl0bGVzXCIgc3JjPVwiZGVtby5jYXB0aW9ucy52dHRcIiBzcmNsYW5nPVwiZW5cIiBsYWJlbD1cIkVuZ2xpc2hcIj48L3RyYWNrPjwhLS0gVHJhY2tzIG5lZWQgYW4gZW5kaW5nIHRhZyB0aGFua3MgdG8gSUU5IC0tPlxcclxcblx0ICA8L3ZpZGVvPlxcclxcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcclxcblx0XHQ8ZGw+XFxyXFxuXHRcdFx0PGR0PuaWh+S7tuWQjTo8JS1uYW1lJT48L2R0Plxcclxcblx0XHRcdDxkZD5cXHJcXG5cdFx0XHRcdOaWh+S7tuWkp+WwjzogPCUtc2l6ZSU+XFxyXFxuXHRcdFx0XHTml7bpl7Q6IDwlLWNyZWF0ZVRpbWUlPlxcclxcblx0XHRcdDwvZGQ+XFxyXFxuXHRcdDwvZGw+XFxyXFxuXHQ8L2Rpdj5cXHJcXG5cXHJcXG5cdDwvZGl2PlxcclxcbjwlfWVsc2UgaWYodHlwZSA9PSA4KXslPlxcclxcblx0PGRpdiBjbGFzcz1cInRleHQtcmV2aWV3XCI+PCUtdGV4dCU+PC9kaXY+XFxyXFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxyXFxuXHRcdDxkbD5cXHJcXG5cdFx0XHQ8ZHQ+5paH5Lu25ZCNOjwlLW5hbWUlPjwvZHQ+XFxyXFxuXHRcdFx0PGRkPlxcclxcblx0XHRcdFx05paH5Lu25aSn5bCPOiA8JS1zaXplJT5cXHJcXG5cdFx0XHRcdOaXtumXtDogPCUtdGltZSU+XFxyXFxuXHRcdFx0PC9kZD5cXHJcXG5cdFx0PC9kbD5cXHJcXG5cdDwvZGl2Plx0XFxyXFxuPCV9ZWxzZXslPlxcclxcblx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcclxcblx0XHQ8aSBjbGFzcz1cImljb24tdHlwZTwlLXR5cGUlPlwiPjwvaT5cXHJcXG5cdFx0PGRsPlxcclxcblx0XHRcdDxkdD7mlofku7blkI06PCUtbmFtZSU+PC9kdD5cXHJcXG5cdFx0XHQ8ZGQ+XFxyXFxuXHRcdFx0XHTmlofku7blpKflsI86IDwlLXNpemUlPlxcclxcblx0XHRcdFx05pe26Ze0OiA8JS1jcmVhdGVUaW1lJT5cXHJcXG5cdFx0XHQ8L2RkPlxcclxcblx0XHQ8L2RsPlxcclxcblx0PC9kaXY+XHRcXHJcXG48JX0lPlxcclxcbjxkaXYgY2xhc3M9XCJhci1hcnJvd1wiIHRpdGxhPVwi5LiL5LiA5Liq5paH5Lu2XCIgZGF0YS1hY3Rpb249XCJzaG93TmV4dFwiPjwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxkaXYgY2xhc3M9XCJhbC1hcnJvd1wiIHRpdGxhPVwi5LiK5LiA5Liq5paH5Lu2XCIgZGF0YS1hY3Rpb249XCJzaG93UHJlXCI+PC9kaXY+XFxuJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PGRpdiBjbGFzcz1cInJldmlldy1pbWctYmxvY2tcIj5cXG5cdFx0PGltZyBpZD1cInJldmlld0ltZ1wiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpZCksICdcIiBhbGlnbj1cImFic21pZGRsZVwiIC8+XFxuXHQ8L2Rpdj5cXG5cdFx0PGRpdiBjbGFzcz1cImZpbGUtcmVpdmV3LWFjdFwiPlxcblx0XHRcdDxkbD5cXG5cdFx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gMTAsIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0XHQ8ZGQ+XFxuXHRcdFx0XHRcdOaWh+S7tuWkp+WwjzogXCIsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBzaXplKSwgXCJcXG5cdFx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gMTMsIGNyZWF0ZVRpbWUpLCAnXFxuXHRcdFx0XHQ8L2RkPlxcblx0XHRcdDwvZGw+XFxuXHRcdFx0PGRpdiBjbGFzcz1cImZpbGUtYWN0XCI+XHRcdFx0XFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRvLWxlZnRcIj7lt6bovaw8L3NwYW4+XFxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cInRvLXJpZ2h0XCI+5Y+z6L2sPC9zcGFuPlxcblx0XHRcdDwvZGl2Plxcblx0XHRcdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3QtYmdcIj48L2Rpdj5cXG5cdFx0PC9kaXY+XHRcXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyMjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGlkPVwiZG9jdW1lbnRWaWV3ZXJcIiBjbGFzcz1cImZsZXhwYXBlcl92aWV3ZXJcIj5cXG5cdFx0XFxuXHQ8L2Rpdj5cXG4nKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNjtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMyB8fCB0eXBlID09IDQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PGRpdiBjbGFzcz1cInBsYXllclpvbmVcIj5cXG5cdCAgPHZpZGVvIGlkPVwiZXhhbXBsZV92aWRlb18xXCIgY2xhc3M9XCJ2aWRlby1qcyB2anMtZGVmYXVsdC1za2luXCIgY29udHJvbHMgcHJlbG9hZD1cIm5vbmVcIiB3aWR0aD1cIjY0MFwiIGhlaWdodD1cIjI2NFwiXFxuXHQgICAgICBcXG5cdCAgICAgIGRhdGEtc2V0dXA9XCJ7fVwiPlxcblx0ICAgIDxzb3VyY2Ugc3JjPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMSwgaWQpLCBcIlxcXCIgdHlwZT0ndmlkZW8vbXA0JyAvPlxcblx0ICAgIDxzb3VyY2Ugc3JjPVxcXCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPVwiLCAoX19zdGFjay5saW5lbm8gPSAzMiwgaWQpLCBcIlxcXCIgdHlwZT0ndmlkZW8vd2VibScgLz5cXG5cdCAgICA8c291cmNlIHNyYz1cXFwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD1cIiwgKF9fc3RhY2subGluZW5vID0gMzMsIGlkKSwgJ1wiIHR5cGU9XFwndmlkZW8vb2dnXFwnIC8+XFxuXHQgICAgPHRyYWNrIGtpbmQ9XCJjYXB0aW9uc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXG5cdCAgICA8dHJhY2sga2luZD1cInN1YnRpdGxlc1wiIHNyYz1cImRlbW8uY2FwdGlvbnMudnR0XCIgc3JjbGFuZz1cImVuXCIgbGFiZWw9XCJFbmdsaXNoXCI+PC90cmFjaz48IS0tIFRyYWNrcyBuZWVkIGFuIGVuZGluZyB0YWcgdGhhbmtzIHRvIElFOSAtLT5cXG5cdCAgPC92aWRlbz5cXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gMzksIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gNDEsIHNpemUpLCBcIlxcblx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gNDIsIGNyZWF0ZVRpbWUpLCBcIlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cXG5cXG5cdDwvZGl2PlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA0ODtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gOCkge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwidGV4dC1yZXZpZXdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA0OSwgdGV4dCksICc8L2Rpdj5cXG5cdDxkaXYgY2xhc3M9XCJmaWxlLXJlaXZldy1hY3RcIj5cXG5cdFx0PGRsPlxcblx0XHRcdDxkdD7mlofku7blkI06JywgKF9fc3RhY2subGluZW5vID0gNTIsIG5hbWUpLCBcIjwvZHQ+XFxuXHRcdFx0PGRkPlxcblx0XHRcdFx05paH5Lu25aSn5bCPOiBcIiwgKF9fc3RhY2subGluZW5vID0gNTQsIHNpemUpLCBcIlxcblx0XHRcdFx05pe26Ze0OiBcIiwgKF9fc3RhY2subGluZW5vID0gNTUsIHRpbWUpLCBcIlxcblx0XHRcdDwvZGQ+XFxuXHRcdDwvZGw+XFxuXHQ8L2Rpdj5cdFxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA1OTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHQ8ZGl2IGNsYXNzPVwiZmlsZS1yZWl2ZXctYWN0XCI+XFxuXHRcdDxpIGNsYXNzPVwiaWNvbi10eXBlJywgKF9fc3RhY2subGluZW5vID0gNjEsIHR5cGUpLCAnXCI+PC9pPlxcblx0XHQ8ZGw+XFxuXHRcdFx0PGR0PuaWh+S7tuWQjTonLCAoX19zdGFjay5saW5lbm8gPSA2MywgbmFtZSksIFwiPC9kdD5cXG5cdFx0XHQ8ZGQ+XFxuXHRcdFx0XHTmlofku7blpKflsI86IFwiLCAoX19zdGFjay5saW5lbm8gPSA2NSwgc2l6ZSksIFwiXFxuXHRcdFx0XHTml7bpl7Q6IFwiLCAoX19zdGFjay5saW5lbm8gPSA2NiwgY3JlYXRlVGltZSksIFwiXFxuXHRcdFx0PC9kZD5cXG5cdFx0PC9kbD5cXG5cdDwvZGl2Plx0XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDcwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGRpdiBjbGFzcz1cImFyLWFycm93XCIgdGl0bGE9XCLkuIvkuIDkuKrmlofku7ZcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmV2aWV3L21haW4uZWpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJ1x0PGRpdiBjbGFzcz1cImFsLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dQcmVcIj48L2Rpdj5cXHJcXG5cdDxkaXYgY2xhc3M9XCJyZXZpZXctbGlzdC1ibG9ja1wiPlxcclxcblx0XHQ8dWwgaWQ9XCJyZXZpZXdGaWxlTGlzdFwiPlxcclxcblxcclxcblx0XHQ8JVxcclxcblx0XHR2YXIgaWR4ID0gMDtcXHJcXG5cdFx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuXHRcdCU+XFxyXFxuXHRcdFx0PGxpIGlkPVwicmV2aWV3PCUtaXRlbS5pZCU+XCIgIGRhdGEtaWR4PVwiPCUtaWR4JT5cIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIDwlaWYoaXRlbS5pZCA9PT0gaWQpeyU+Y2xhc3M9XCJzZWxlY3RlZFwiPCV9JT4gdGl0bGU9XCI8JS1pdGVtLm5hbWUlPlwiPlxcclxcblx0XHRcdDwlaWYoaXRlbS50eXBlPT09MSl7JT5cXHJcXG5cdFx0XHRcdDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPTwlLWl0ZW0uaWQlPlwiIGRhdGEtaWR4PVwiPCUtaWR4JT5cIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIC8+XFxyXFxuXHRcdFx0PCV9ZWxzZXslPlxcclxcblx0XHRcdFx0PGkgY2xhc3M9XCJmZG5hbWU8JS1pdGVtLmlkJT4gaWNvbi10eXBlXCIgZGF0YS1pZHg9XCI8JS1pZHglPlwiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+PC9pPlxcclxcblx0XHRcdDwlfSU+XFxyXFxuXHRcdFx0PC9saT5cXHJcXG5cdFx0PCVcXHJcXG5cdFx0XHRcdGlkeCsrO1xcclxcblx0XHRcdH1cXHJcXG5cdFx0JT5cXHJcXG5cdFx0PC91bD5cXHJcXG5cdDwvZGl2Plxcclxcblx0PGRpdiBjbGFzcz1cImFyLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXHQ8ZGl2IGNsYXNzPVwiYWwtYXJyb3ctcFwiIGRhdGEtYWN0aW9uPVwic2hvd1ByZVwiPjwvZGl2Plxcblx0PGRpdiBjbGFzcz1cInJldmlldy1saXN0LWJsb2NrXCI+XFxuXHRcdDx1bCBpZD1cInJldmlld0ZpbGVMaXN0XCI+XFxuXFxuXHRcdCcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIGxpc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuXHRcdFx0PGxpIGlkPVwicmV2aWV3JywgKF9fc3RhY2subGluZW5vID0gMTAsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtaWR4PVwiJywgKF9fc3RhY2subGluZW5vID0gMTAsIGlkeCksICdcIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLmlkKSwgJ1wiICcpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pZCA9PT0gaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdjbGFzcz1cInNlbGVjdGVkXCInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyB0aXRsZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEwLCBpdGVtLm5hbWUpLCAnXCI+XFxuXHRcdFx0Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTE7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0XHRcdDxpbWcgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWR4PVwiJywgKF9fc3RhY2subGluZW5vID0gMTIsIGlkeCksICdcIiBkYXRhLWFjdGlvbj1cInNob3dGaWxlXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLmlkKSwgJ1wiIC8+XFxuXHRcdFx0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDEzO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0XHRcdFx0PGkgY2xhc3M9XCJmZG5hbWUnLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaXRlbS5pZCksICcgaWNvbi10eXBlXCIgZGF0YS1pZHg9XCInLCAoX19zdGFjay5saW5lbm8gPSAxNCwgaWR4KSwgJ1wiIGRhdGEtYWN0aW9uPVwic2hvd0ZpbGVcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0uaWQpLCAnXCI+PC9pPlxcblx0XHRcdCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcblx0XHRcdDwvbGk+XFxuXHRcdFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG5cdFx0PC91bD5cXG5cdDwvZGl2Plxcblx0PGRpdiBjbGFzcz1cImFyLWFycm93LXBcIiBkYXRhLWFjdGlvbj1cInNob3dOZXh0XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmV2aWV3L2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gNDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcclxcblx0PCUtaXRlbS5uYW1lJT5cXHJcXG48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5uYW1lKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0XCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCBcIlxcbjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzXG4gKiogbW9kdWxlIGlkID0gNDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVcXHJcXG5cdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcbiU+XFxyXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbDwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxyXFxuPC9zcGFuPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvIGxhYmVsJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gNSwgaXRlbS5pZCksICdcIj5cXG5cdCcsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubmFtZSksICc8c3BhbiBkYXRhLWFjdGlvbj1cInJlbW92ZVwiPjwvc3Bhbj5cXG48L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gODtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvbGFiZWwvb25lLmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ0XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiY29tbWVudC5qcyJ9