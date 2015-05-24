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

	var cgi = __webpack_require__(11).user,
		logout = __webpack_require__(11).logout,
		data = __webpack_require__(17).user,
		userManage = __webpack_require__(18),
		striker = $(window.striker);
	
	var tmpl = {
		nav : __webpack_require__(31),
		manage : __webpack_require__(32),
		onemanage : __webpack_require__(33)
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
	
	var cgi = __webpack_require__(11).article;
	var tmpl = {
		list : __webpack_require__(37),
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
		data = __webpack_require__(17).notify,
		cgi = __webpack_require__(11).notify;
	
	var tmpl = {
		list : __webpack_require__(34),
		one : __webpack_require__(35)   //资源列表
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

	var cgi = __webpack_require__(11).label,
		data = __webpack_require__(17).label,
		striker = $(window.striker);
	
	var Label = {},
		_this = Label;
	var tmpl = {
		list : __webpack_require__(45),
		one : __webpack_require__(46)
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var request = __webpack_require__(23),
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	//主题
	var cgi = __webpack_require__(11).subject,
		subjectList = __webpack_require__(25),
		subjectInfo = __webpack_require__(26),
		subjectCreate = __webpack_require__(27);
	
	var striker = $(window.striker);	
	
	//模板引用
	var tmpl = {
		area : __webpack_require__(47),
		manage : __webpack_require__(32), //管理员
		list : __webpack_require__(48),  //主题列表
		head : __webpack_require__(49),  //主题详情头部
		onemanage : __webpack_require__(33), //单个管理员
		aside : __webpack_require__(50),  //主题详情右边资源列表
		rlist : __webpack_require__(39)   //资源列表
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

	var cgi = __webpack_require__(11).article;
	var tmpl = {
		list : __webpack_require__(37),
		top : __webpack_require__(38),
		rlist : __webpack_require__(39)   //资源列表
	};
	
	var articleList = __webpack_require__(24),
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
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var aList = {},
		data = __webpack_require__(17),
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
	
		console.log(cgi);
	
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
		this.lasttime = 0;
		this.tmplasttime = 0;
		this.newlist = [];
		this.newDom;
	
		this.reftime = 0;
	
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
	
	article.prototype.addnewArticle = function(){
		var data = this.checkData({
			list : this.newlist
		});
		var html = tmpl.list(data);	
		this.dom.prepend(html);
		this.newlist = [];
		this.lasttime = this.tmplasttime;
	}
	
	article.prototype.haveNew = function(){
		var _this = this;
		if(!this.newDom){
			
			$('.artice-info').prepend('<div class="have-new">有新的帖子</div>');
			this.newDom = $(".have-new");
			this.newDom.bind('click',function(){
				_this.newDom.hide();
				_this.addnewArticle();
		
			});
		}else{
			this.newDom.show();
		}
	}
	
	article.prototype.getRef = function(){
		var _this = this;
		//this.lasttime = 1432461927000;
		var param = {
			subjectId : this.subid,
			time : new Date(this.lasttime).pattern('yyyy-MM-dd HH:mm:ss')
		}
		cgi.ref(param,function(res){
			if(res.code === 0){
				if(res.data.list.length > 0){
					_this.newlist = res.data.list;
					_this.tmplasttime = res.data.lastTime;
					_this.haveNew();
				}
			}
		});
	}
	
	article.prototype.startRef = function(){
		var _this = this;
		_this.reftime = setInterval(function(){
			_this.getRef();
		},10000);	
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
	
		striker.bind('autorefresh',function(e,d){
			//自动刷新
			if(d){
				_this.reftime = setInterval(function(){
					_this.startRef();
				},10000);
			}else{
				clearInterval(_this.reftime);
			}
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
			if(item.resource){
			item.imgnum = this.getimg(item.resource);
				this.rdata[item.id] = item.resource;
			}
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
				if(!_this.start){
					_this.lasttime = res.data.lastTime;
					_this.startRef();
				}
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	//主题列表
	var sList = {},
		data = __webpack_require__(17).subject,
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	//拉主题内容
	var sInfo = {};
	var cgi,
		tmpl,
		data = __webpack_require__(17);
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
	
	info.prototype.autoref = function(e){
		var target = $(e.target);
		//console.log(target.prop('checked'));
		striker.trigger('autorefresh',target.prop('checked'))
	}
	
	//视频预览
	info.prototype.showVideo = function(e){
		var target = $(e.target),
			id = target.data('id');
	
		if(id){
			striker.trigger('showVideo',{
				id : id,
				list : this.data.resourceList
			})
		}
	}
	
	info.prototype.link = function(e){
		$("#linkIframe").attr('src',this.data.link);
		$("#showLink").show();
	}
	
	info.prototype.closelink = function(e){
		$("#linkIframe").attr('src','blank');
		$("#showLink").hide();
	}
	
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
	
	info.prototype.autorefresh = function(){
		striker.trigger('autorefresh',true);
	}
	
	info.prototype.bindAction = function(){
		var _this = this;
	
		$("#showLink").bind('click',function(e){
			var target = $(e.target),
				action = target.data('action');
	
			_this._selectDom = target;
			if(_this[action]){
				_this[action](e);
			}
		})
	
		striker.bind('subjectUpdate',function(e,d){
			_this.data = d;
			var html = tmpl.head(d);
			_this.dom.html(html);
	
			if(d.data){
				d.data.my = data.user.myInfo;
				var html = tmpl.aside(d);
				
				_this.asideDom.html(html);			
			}
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
/* 27 */
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
		var member = new window.striker.user.manage('memberArea');
		this.manage = manage;
		this.member = member;
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
		var myInfo = __webpack_require__(17).user.myInfo;
		//this.type = 'type';
		this.titleDom.text('修改帖子');
		$("#subjectTitle").val(data.title),
		$("#subjectMark").val(data.mark),
		$("#subjectOpen").prop('checked',data.private);
		$("#subjectLink").val(data.link);
		$("#subjectGuest").prop('checked',data.guest);
		this.editData = data;
	
		for(var i in data.members){
			var item = data.members[i];
			if(item.role === 1){
				this.manage.addone({
					id : item.id,
					name : item.name
				});
			}else if (item.role === 2 && item.id !== myInfo.id){
				this.member.addone({
					id : item.id,
					name : item.name
				});
			}
		}
	
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
	
	//取选中的管理远
	sCreate.create.prototype.getMemberList = function(){
		return this.member.getManageList();
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
	
		$("#scfileName").bind('change',function(e){
			var target = $(e.target);
	
			if(target.val() !== ''){
				_this.fileupload = true;
				$("#scfileForm").submit();
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
					link = $("#subjectLink").val(),
					open = $("#subjectOpen").prop('checked')?0:1,
					guest = $("#subjectGuest").prop('checked')?0:1;
	
				if(tit == ''){
					alert('还没有填写标题');
					return;
				}
	
				var param = {
					title : tit,
					mark : mark,
					link : link,
					private : open,
					guest : guest,
					manages : _this.getManageList(),
					members : _this.getMemberList(),
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
						// console.log(param);
						// return;
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
/* 32 */
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
/* 33 */
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
/* 34 */
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
/* 35 */
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
/* 36 */,
/* 37 */
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
/* 38 */
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
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */
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
/* 46 */
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
/* 47 */
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
/* 48 */
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <dt><%-title%></dt>\r\n        <dd class="artice-use">创建人 <%-creatorName%> 创建时间 <%-striker.util.formatTime(createTime)%> 最近更新 <%-striker.util.formatTime(updateTime)%></dd>\r\n        <dd class="artice-use">\r\n          主题资源 <%-subjectResourceCount%> <%-memberCount%>个成员 <%-articleCount%>个帖子 <%-articleResourceCount%>个资源 我的发帖/回复 <%-articleCreateCount%>/12\r\n          <div>视频 <span data-action="link" ><%-link%></span></div>\r\n        </dd>\r\n        <dd class="artice-act-btn">\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn <%if(follow){%>followed<%}%>" data-action="follow"><span class="follow"></span><%if(follow){%>已关注<%}else{%>关注<%}%></a></span>\r\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\r\n        </dd>\r\n        <dd class="actice-act-select">\r\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\r\n            <!--\r\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \r\n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\r\n              <abbr class="select2-search-choice-close"></abbr> \r\n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\r\n            </a>\r\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \r\n          <div class="btn-group">\r\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\r\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\r\n          </div>\r\n        </dd>\r\n        <dd class="artice-auto-refuse">\r\n          自动刷新: <input type="checkbox" data-action="autoref" checked="checked" />\r\n          <a href="/index.html">返回</a>\r\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\r\n            <div class="bootstrap-switch-container">\r\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\r\n            </div>\r\n          </div>          \r\n          -->\r\n        </dd>',
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
	                buf.push("        <dt>", (__stack.lineno = 1, title), '</dt>\n        <dd class="artice-use">创建人 ', (__stack.lineno = 2, creatorName), " 创建时间 ", (__stack.lineno = 2, striker.util.formatTime(createTime)), " 最近更新 ", (__stack.lineno = 2, striker.util.formatTime(updateTime)), '</dd>\n        <dd class="artice-use">\n          主题资源 ', (__stack.lineno = 4, subjectResourceCount), " ", (__stack.lineno = 4, memberCount), "个成员 ", (__stack.lineno = 4, articleCount), "个帖子 ", (__stack.lineno = 4, articleResourceCount), "个资源 我的发帖/回复 ", (__stack.lineno = 4, articleCreateCount), '/12\n          <div>视频 <span data-action="link" >', (__stack.lineno = 5, link), '</span></div>\n        </dd>\n        <dd class="artice-act-btn">\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary" data-toggle="modal" data-target="#createArticle"><span class="post"></span>发帖</a></span>\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary follow-btn ');
	                __stack.lineno = 9;
	                if (follow) {
	                    buf.push("followed");
	                    __stack.lineno = 9;
	                }
	                buf.push('" data-action="follow"><span class="follow"></span>');
	                __stack.lineno = 9;
	                if (follow) {
	                    buf.push("已关注");
	                    __stack.lineno = 9;
	                } else {
	                    buf.push("关注");
	                    __stack.lineno = 9;
	                }
	                buf.push('</a></span>\n          <span class="pat"><a class="btn btn-block btn-lg btn-primary manage-btn" data-action="manage" data-toggle="modal" data-target="#createSubject"><span class="manage"></span>管理</a></span>\n        </dd>\n        <dd class="actice-act-select">\n          <div class="select2-container form-control select select-primary" id="s2id_autogen1">\n            <!--\n            <a href="javascript:void(0)" class="select2-choice" tabindex="-1">   \n              <span class="select2-chosen" id="select2-chosen-2">按帖子标签筛选</span>\n              <abbr class="select2-search-choice-close"></abbr> \n              <span class="select2-arrow" role="presentation"><b role="presentation"></b></span>\n            </a>\n            --><label for="s2id_autogen2" class="select2-offscreen"></label><input class="select2-focusser select2-offscreen" type="text" aria-haspopup="true" role="button" aria-labelledby="select2-chosen-2" id="s2id_autogen2"></div>          \n          <div class="btn-group">\n            <a class="btn btn-primary active time-btn" data-action="articleorderbytime">按创建时间排序</a>\n            <a class="btn btn-primary update-btn" data-action="articleorderbyupdate">按更新时间排序</a>\n          </div>\n        </dd>\n        <dd class="artice-auto-refuse">\n          自动刷新: <input type="checkbox" data-action="autoref" checked="checked" />\n          <a href="/index.html">返回</a>\n          <!--<div class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate bootstrap-switch-id-custom-switch-01 bootstrap-switch-off">\n            <div class="bootstrap-switch-container">\n              <span class="bootstrap-switch-handle-on bootstrap-switch-primary">ON</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">OFF</span><input type="checkbox" checked="" data-toggle="switch" id="custom-switch-01">\n            </div>\n          </div>          \n          -->\n        </dd>');
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function anonymous(locals, filters, escape, rethrow) {
	    escape = escape || function(html) {
	        return String(html).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
	    };
	    var __stack = {
	        lineno: 1,
	        input: '        <nav class="btn-toolbar">\r\n          <div class="btn-group">\r\n            <span class="btn btn-primary active">资源 <%-subjectResourceCount%></span>\r\n            <span class="btn btn-primary">参与人 <%-memberCount%></span>\r\n            <span class="btn btn-primary">统计</span>\r\n          </div>\r\n        </nav>\r\n\r\n        <div class="artice-aside-img">\r\n          <!--\r\n          <div class="video">\r\n            <img width="100%" height="200" src="http://imgsrc.baidu.com/forum/w%3D580/sign=3b95cec70c3387449cc52f74610ed937/f074d0fc1e178a8274b0ef37f603738da877e868.jpg" />\r\n            预览  标注 下载  删除\r\n          </div>\r\n          -->\r\n          <div class="img-list">\r\n            <%\r\n              for(var i in resourceList){\r\n              var item = resourceList[i];\r\n            %>\r\n            <div class="sub-resource-<%-item.id%>">\r\n            <%if(item.type === 1){%>\r\n              <img width="100%" height="100" src="/cgi/resource/preview?id=<%-item.id%>" title="<%-item.name%>"  data-id="<%-item.id%>"  data-action="review" />\r\n              <a data-id="<%-item.id%>"  data-action="review">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>  \r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else if(item.type === 4 || item.type ===3){%>\r\n              <div class="video"  data-id="<%-item.id%>"  data-action="showVideo"></div>\r\n              <a data-id="<%-item.id%>"  data-action="mark" style="">标注</a>  <a data-id="<%-item.id%>"  data-action="showVideo">预览</a>  <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>\r\n            <%}else{%>\r\n              <p><%-item.name%></p>\r\n              <a href="/cgi/resource/download?id=<%-item.id%>" target="_blank">下载</a>\r\n              <%if(my.auth || my.id === creator){ %>\r\n                <a data-action="deleteResource"  data-id="<%-item.id%>">删除</a>\r\n              <%}%>              \r\n            <%}%>\r\n            </div>\r\n            <%}%>\r\n          </div>\r\n        </div>',
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
	                        buf.push('\n              <div class="video"  data-id="', (__stack.lineno = 29, item.id), '"  data-action="showVideo"></div>\n              <a data-id="', (__stack.lineno = 30, item.id), '"  data-action="mark" style="">标注</a>  <a data-id="', (__stack.lineno = 30, item.id), '"  data-action="showVideo">预览</a>  <a href="/cgi/resource/download?id=', (__stack.lineno = 30, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 31;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 32, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 33;
	                        }
	                        buf.push("\n            ");
	                        __stack.lineno = 34;
	                    } else {
	                        buf.push("\n              <p>", (__stack.lineno = 35, item.name), '</p>\n              <a href="/cgi/resource/download?id=', (__stack.lineno = 36, item.id), '" target="_blank">下载</a>\n              ');
	                        __stack.lineno = 37;
	                        if (my.auth || my.id === creator) {
	                            buf.push('\n                <a data-action="deleteResource"  data-id="', (__stack.lineno = 38, item.id), '">删除</a>\n              ');
	                            __stack.lineno = 39;
	                        }
	                        buf.push("              \n            ");
	                        __stack.lineno = 40;
	                    }
	                    buf.push("\n            </div>\n            ");
	                    __stack.lineno = 42;
	                }
	                buf.push("\n          </div>\n        </div>");
	            })();
	        }
	        return buf.join("");
	    } catch (err) {
	        rethrow(err, __stack.input, __stack.filename, __stack.lineno);
	    }
	}

/***/ }
/******/ ])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmY4YzBlMzgxYTdlMDRiYTMwNjA/Y2U4NioqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbW1vbi9nbG9iYWwuanM/NWIyNyoqIiwid2VicGFjazovLy8uL3NyYy9qcy91c2VyL3VzZXIuanM/ZWM0ZioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvcG9zdC5qcz85NDJlKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uL21zZy5qcz8yMzdiKioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL25vdGlmeS9ub3RpZnkuanM/ZGNhNyoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2xhYmVsL2xhYmVsLmpzPzEzZGUqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vY2dpLmpzPzIzYjIqKiIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9zdWJqZWN0LmpzPzY1Y2MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvYXJ0aWNsZS5qcz9lZTU3Iiwid2VicGFjazovLy8uL3NyYy9qcy9kYXRhL2RhdGEuanM/OWRlOSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3VzZXIvbWFuYWdlLmpzPzhkYjUqIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21tb24vcmVxdWVzdC5qcz9hZWQ5KioiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2FydGljbGUvbGlzdC5qcz84YWIzIiwid2VicGFjazovLy8uL3NyYy9qcy9zdWJqZWN0L2xpc3QuanM/ZThjZCIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc3ViamVjdC9pbmZvLmpzP2E2ZGYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3N1YmplY3QvY3JlYXRlLmpzPzM3ZjgiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqcz82ZmZiKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbWFuYWdlLmVqcz81M2EzKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvb25lbWFuYWdlLmVqcz81MTE0KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3VzZXIvbXNnbGlzdC5lanM/ODk2MCoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC91c2VyL21zZy5lanM/ZDY3YSoiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9hcnRpY2xlL2xpc3QuZWpzPzNmYTIqIiwid2VicGFjazovLy8uL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzPzAwNDQiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RwbC9yZXNvdXJjZS9saXN0LmVqcz9jNTM3KiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL2xhYmVsL2xpc3QuZWpzPzM1ZjIqIiwid2VicGFjazovLy8uL3NyYy90cGwvbGFiZWwvb25lLmVqcz8zNTdmKiIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3Qvc2l6ZS5lanM/OGRlYyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvbGlzdC5lanM/NGVmMSIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvaGVhZC5lanM/ODc3NyIsIndlYnBhY2s6Ly8vLi9zcmMvdHBsL3N1YmplY3QvYXNpZGUuZWpzPzVkODYiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FB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QUFDSDtBQUNBO0FBQ0E7QUFDQSxJO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsb0M7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLG1CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFJO0FBQ0o7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUk7QUFDSjtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFLEU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQzs7QUFFQTtBQUNBLG1CO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRyxFO0FBQ0gsR0FBRTtBQUNGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUcsRTtBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1COzs7Ozs7OztBQzVUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0I7QUFDQTs7QUFFQTs7QUFFQSxxQjs7Ozs7O0FDM0dBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBOzs7QUFHQSx5Qjs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7O0FBRUEsZUFBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsR0FBRTtBQUNGOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQixnQkFBZ0I7QUFDMUM7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQVk7QUFDWjtBQUNBLDBCQUF5QixjQUFjO0FBQ3ZDO0FBQ0Esb0NBQW1DLElBQUk7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQSx3QkFBdUIsVUFBVTtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxxQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxFOzs7Ozs7QUNsTEE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxnQ0FBK0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsK0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpRDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx1RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvRDtBQUNBOztBQUVBLHFCOzs7Ozs7QUN6VEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQSxpQkFBZ0I7QUFDaEIsNEJBQTJCO0FBQzNCLGVB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLCtCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLCtCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdDQUErQixJQUFJO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlDQUFnQyxJQUFJO0FBQ3BDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFOzs7Ozs7Ozs7O0FDMU5BO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7O0FBRUY7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQSxHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7QUNyRUE7QUFDQSxlQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4QkFBNkIsSUFBSTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRiw2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsUTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFJO0FBQ0osSUFBRztBQUNIO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVO0FBQ0EsTUFBSyxFOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUUsRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYSw2QkFBNkI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRixFOzs7Ozs7QUMvT0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDhCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRSxFOztBQUVGO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUk7QUFDSixJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsS0FBSTtBQUNKO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRixrQztBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QUFnd0IsYUFBYSxrRUFBa0UsUUFBUSxLQUFLLE9BQU8sNHZEQUE0dkQ7QUFDL2xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EseXVEQUF3dUQ7QUFDeHVELGNBQWE7QUFDYjtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxFOzs7Ozs7QUM3Q0E7QUFDQTtBQUNBLGlEQUFnRCxzQkFBc0Isc0JBQXNCLHVCQUF1Qix3QkFBd0I7QUFDM0k7QUFDQTtBQUNBO0FBQ0EsMndCQUEwd0IsNkNBQTZDLCtHQUErRyw4V0FBOFcsMEdBQTBHLHFCQUFxQiwyQ0FBMkMsc1dBQXNXLDBHQUEwRyxxQkFBcUIsS0FBSyx1TEFBdUwsMEdBQTBHLG1DQUFtQywyQ0FBMkM7QUFDdnhFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEUiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJqcy9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBmZjhjMGUzODFhN2UwNGJhMzA2MFxuICoqLyIsInJlcXVpcmUoJy4vY29tbW9uL2dsb2JhbCcpO1xudmFyIHVzZXIgPSByZXF1aXJlKCcuL3VzZXIvdXNlcicpLFxuXHRzdWJqZWN0ID0gcmVxdWlyZSgnLi9zdWJqZWN0L3N1YmplY3QnKSxcblx0YXJ0aWNsZSA9IHJlcXVpcmUoJy4vYXJ0aWNsZS9hcnRpY2xlJyksXG5cdG1zZyA9IHJlcXVpcmUoJy4vY29tbW9uL21zZycpLFxuXHRub3RpZnkgPSByZXF1aXJlKCcuL25vdGlmeS9ub3RpZnknKSxcblx0bGFiZWwgPSByZXF1aXJlKCcuL2xhYmVsL2xhYmVsJyk7XG5cblxudmFyIFN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcblxuXG4vL+S6i+S7tumAmuefpSznlKjmiLfotYTmlpnlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHVzZXJMb2FkKGUsZCl7XG5cdG5ldyBzdWJqZWN0LmFyZWEoJ215U3ViamVjdCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUZvbGxvdycpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdteUludml0ZWQnKTtcblx0bmV3IHN1YmplY3QuYXJlYSgnbXlBcmNoaXZlZCcpO1xuXHRuZXcgc3ViamVjdC5hcmVhKCdvcGVuJyk7XG5cdG5ldyBub3RpZnkubm90aWZ5KCk7XG5cdHdpbmRvdy5zdHJpa2VyLmxhYmVsID0gbmV3IGxhYmVsLmxhYmVsKCdsYWJlbEFyZWEnKTtcblx0d2luZG93LnN0cmlrZXIuY3JlYXRlU3ViamVjdCA9IG5ldyBzdWJqZWN0LmNyZWF0ZSgpO1xuXHR3aW5kb3cuc3RyaWtlci5tc2cgPSBuZXcgbXNnLm1lc3NhZ2UoKTtcblx0Ly9zdWJqZWN0LnNlYXJjaCgnbXlTdWJqZWN0Jyk7XG5cdC8vIHN1YmplY3Quc2VhcmNoKCdteVN1YmplY3QnKTtcblx0Ly8gc3ViamVjdC5zZWFyY2goJ215U3ViamVjdCcpO1xufVxuXG4vL+S6i+S7tumAmuefpSzkuLvpopjlt7Lnu4/liqDovb3lrozmiJBcbmZ1bmN0aW9uIHN1YmplY3RMb2FkKGUsZCl7XG5cdGNvbnNvbGUubG9nKGUsZCk7XG59XG5cbnZhciBoYW5kbGVycyA9IHtcblx0J3VzZXJMb2FkU3ViJyA6IHVzZXJMb2FkLFxuXHQnc3ViamVjdExvYWQnIDogc3ViamVjdExvYWRcbn1cblxuZm9yKHZhciBpIGluIGhhbmRsZXJzKXtcblx0U3RyaWtlci5iaW5kKGksaGFuZGxlcnNbaV0pO1xufVxuXG4vL+WFqOWxgOS6i+S7tue7keWumlxuZnVuY3Rpb24gYmluZEFjdGlvbigpe1xuXHQkKCdib2R5JykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcblx0XHRpZihhY3Rpb24pe1xuXHRcdFx0dmFyIGFjdE1hcCA9IGFjdGlvbi5zcGxpdCgnLicpO1xuXHRcdFx0dmFyIG1vZCA9IGFjdE1hcFswXSxcblx0XHRcdFx0ZnVuID0gYWN0TWFwWzFdO1xuXHRcdFx0aWYoYWN0TWFwLmxlbmd0aCA9PT0gMiAmJiBzdHJpa2VyW21vZF1bZnVuXSl7XG5cblx0XHRcdFx0c3RyaWtlclttb2RdW2Z1bl0odGFyZ2V0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCl7XG5cdHN1YmplY3QuaW5pdCgnaW5kZXgnKTtcblx0Ly9hcnRpY2xlLmluaXQoJ2luZGV4Jyk7XG5cdHVzZXIuaW5pdCgpO1xuXHRsYWJlbC5pbml0KCk7XG5cblx0c3RyaWtlci5zdWJqZWN0ID0gc3ViamVjdDtcblx0c3RyaWtlci5hcnRpY2xlID0gYXJ0aWNsZTtcblx0c3RyaWtlci51c2VyID0gdXNlcjtcblxuXHRiaW5kQWN0aW9uKCk7XG59XG5cbmluaXQoKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSA0XG4gKiovIiwiLy8ga2VlcCBpdCBpZiB1c2luZyB1cmwgbWQ1IHJldiByZXBsYWNlbWVudCBpbiBqYXZhc2NyaXB0XG5jb25zb2xlLmxvZygnZ2xvYmFsIGlzIGxvYWQnKTtcbnZhciBtc2llID0gL21zaWUvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpKTsgXG5pZiAoIG1zaWUgKXtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoJ2llJyk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFRpbWUoc3RyKXtcblx0dmFyIGRhdGUgPSBuZXcgRGF0ZShzdHIpO1xuXG4gICAgdmFyIHl5eXkgPSBkYXRlLmdldEZ1bGxZZWFyKCkudG9TdHJpbmcoKTsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICB2YXIgbW0gPSAoZGF0ZS5nZXRNb250aCgpKzEpLnRvU3RyaW5nKCk7IC8vIGdldE1vbnRoKCkgaXMgemVyby1iYXNlZCAgICAgICAgIFxuICAgIHZhciBkZCAgPSBkYXRlLmdldERhdGUoKS50b1N0cmluZygpOyAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIHJldHVybiB5eXl5ICsgJy0nICsgKG1tWzFdP21tOlwiMFwiK21tWzBdKSArICctJyArIChkZFsxXT9kZDpcIjBcIitkZFswXSk7XHRcbn1cblxuZnVuY3Rpb24gZ2V0Tm93VGltZShzdHIpe1xuICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB2YXIgYXRpbWUgPSBuZXcgRGF0ZShzdHIpLmdldFRpbWUoKTtcblxuICAgIHZhciBjID0gTWF0aC5jZWlsKChub3cgLSBhdGltZSkvMTAwMCk7XG4gICAgaWYoYzw2MCl7XG4gICAgICAgIHJldHVybiAnMeWIhumSn+S7peWGhSc7XG4gICAgfWVsc2UgaWYoYzwzNjAwKXtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbChjLzM2MDApKyfliIbpkp/liY0nO1xuICAgIH1lbHNlIGlmKGM8MzYwMCoyNCl7XG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoYy8oMzYwMCoyNCkpKyflpKnliY0nO1xuICAgIH1lbHNle1xuICAgICAgICByZXR1cm4gZm9ybWF0VGltZShzdHIpO1xuICAgIH1cblxufVxuXG52YXIgZ2V0UGFyYW1ldGVyID0gZnVuY3Rpb24obmFtZSxzdHIpe1xuICAgIHN0ciA9IHN0ciB8fCBsb2NhdGlvbi5ocmVmO1xuICAgIHZhciByID0gbmV3IFJlZ0V4cChcIihcXFxcP3wjfCYpXCIgKyBuYW1lICsgXCI9KFteJiNdKikoJnwjfCQpXCIpLCBtID0gc3RyLm1hdGNoKHIpO1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoIW0gPyBcIlwiIDogbVsyXSk7XHRcdFxufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiDkuInkuKrlrZfmr43nrpfkuIDkuKrlrZdcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyIOi+k+WFpeWtl+espuS4slxuICogQHJldHVybiB7U3RyaW5nfSBbbGVuPTJdIOWtl+avjeaVsCjlpJrlsJHkuKrlrZfmr43nrpfkuIDkuKrlrZcpXG4gKiBAZXhhbXBsZVxuICogICAgICBnZXRMZW4oJ2FiY+S4gOS6jOS4iScpO1xuICovXG52YXIgZ2V0TGVuID0gZnVuY3Rpb24oc3RyLGxlbil7XG4gICAgLy/mraPliJnlj5bliLDkuK3mlofnmoTkuKrmlbDvvIznhLblkI5sZW4qY291bnQr5Y6f5p2l55qE6ZW/5bqm44CC5LiN55SocmVwbGFjZVxuICAgIHZhciBmYWN0b3IgPSBsZW4gfHwgMztcbiAgICBzdHIgKz0gJyc7XG4gICAgdmFyIHpoQ2hhciA9IHN0ci5tYXRjaCgvW15cXHgwMC1cXHhmZl0vZykgfHwgW107XG4gICAgdmFyIGxldHRlciA9IHN0ci5yZXBsYWNlKC9bXlxceDAwLVxceGZmXS9nICwgJycpO1xuICAgIHJldHVybiBwYXJzZUludCh6aENoYXIubGVuZ3RoICsgKGxldHRlci5sZW5ndGggLyBmYWN0b3IpKTtcdFx0XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIOS4ieS4quWtl+avjeeul+S4gOS4quWtl1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIg6L6T5YWl5a2X56ym5LiyXG4gKiBAcGFyYW0ge251bWJlcn0gbWF4IOaAu+mVv+W6plxuICogQHJldHVybiB7bnVtYmVyfSBbbGVuPTJdIOmVv+W6plxuICogQGV4YW1wbGVcbiAqICAgICAgY2hhbmdlTGVuKCdhYmPkuIDkuozkuIknLDEwKTtcbiAqL1xudmFyIGNoYW5nZUxlbiA9IGZ1bmN0aW9uKHN0cixtYXgpe1xuXHR2YXIgbWF4ID0gbWF4IHx8IDEwO1xuXHR2YXIgbGVuID0gZ2V0TGVuKHN0cik7XG5cdHZhciByZXQgPSBtYXggLSBsZW47XG5cdHJldHVybiByZXQ+PTA/cmV0OjA7XG59XG5cbkRhdGUucHJvdG90eXBlLnBhdHRlcm49ZnVuY3Rpb24oZm10KSB7ICAgICAgICAgXG4gICAgdmFyIG8gPSB7ICAgICAgICAgXG4gICAgXCJNK1wiIDogdGhpcy5nZXRNb250aCgpKzEsIC8v5pyI5Lu9ICAgICAgICAgXG4gICAgXCJkK1wiIDogdGhpcy5nZXREYXRlKCksIC8v5pelICAgICAgICAgXG4gICAgXCJoK1wiIDogdGhpcy5nZXRIb3VycygpJTEyID09IDAgPyAxMiA6IHRoaXMuZ2V0SG91cnMoKSUxMiwgLy/lsI/ml7YgICAgICAgICBcbiAgICBcIkgrXCIgOiB0aGlzLmdldEhvdXJzKCksIC8v5bCP5pe2ICAgICAgICAgXG4gICAgXCJtK1wiIDogdGhpcy5nZXRNaW51dGVzKCksIC8v5YiGICAgICAgICAgXG4gICAgXCJzK1wiIDogdGhpcy5nZXRTZWNvbmRzKCksIC8v56eSICAgICAgICAgXG4gICAgXCJxK1wiIDogTWF0aC5mbG9vcigodGhpcy5nZXRNb250aCgpKzMpLzMpLCAvL+Wto+W6piAgICAgICAgIFxuICAgIFwiU1wiIDogdGhpcy5nZXRNaWxsaXNlY29uZHMoKSAvL+avq+enkiAgICAgICAgIFxuICAgIH07ICAgICAgICAgXG4gICAgdmFyIHdlZWsgPSB7ICAgICAgICAgXG4gICAgXCIwXCIgOiBcIi91NjVlNVwiLCAgICAgICAgIFxuICAgIFwiMVwiIDogXCIvdTRlMDBcIiwgICAgICAgICBcbiAgICBcIjJcIiA6IFwiL3U0ZThjXCIsICAgICAgICAgXG4gICAgXCIzXCIgOiBcIi91NGUwOVwiLCAgICAgICAgIFxuICAgIFwiNFwiIDogXCIvdTU2ZGJcIiwgICAgICAgICBcbiAgICBcIjVcIiA6IFwiL3U0ZTk0XCIsICAgICAgICAgXG4gICAgXCI2XCIgOiBcIi91NTE2ZFwiICAgICAgICBcbiAgICB9OyAgICAgICAgIFxuICAgIGlmKC8oeSspLy50ZXN0KGZtdCkpeyAgICAgICAgIFxuICAgICAgICBmbXQ9Zm10LnJlcGxhY2UoUmVnRXhwLiQxLCAodGhpcy5nZXRGdWxsWWVhcigpK1wiXCIpLnN1YnN0cig0IC0gUmVnRXhwLiQxLmxlbmd0aCkpOyAgICAgICAgIFxuICAgIH0gICAgICAgICBcbiAgICBpZigvKEUrKS8udGVzdChmbXQpKXsgICAgICAgICBcbiAgICAgICAgZm10PWZtdC5yZXBsYWNlKFJlZ0V4cC4kMSwgKChSZWdFeHAuJDEubGVuZ3RoPjEpID8gKFJlZ0V4cC4kMS5sZW5ndGg+MiA/IFwiL3U2NjFmL3U2NzFmXCIgOiBcIi91NTQ2OFwiKSA6IFwiXCIpK3dlZWtbdGhpcy5nZXREYXkoKStcIlwiXSk7ICAgICAgICAgXG4gICAgfSAgICAgICAgIFxuICAgIGZvcih2YXIgayBpbiBvKXsgICAgICAgICBcbiAgICAgICAgaWYobmV3IFJlZ0V4cChcIihcIisgayArXCIpXCIpLnRlc3QoZm10KSl7ICAgICAgICAgXG4gICAgICAgICAgICBmbXQgPSBmbXQucmVwbGFjZShSZWdFeHAuJDEsIChSZWdFeHAuJDEubGVuZ3RoPT0xKSA/IChvW2tdKSA6ICgoXCIwMFwiKyBvW2tdKS5zdWJzdHIoKFwiXCIrIG9ba10pLmxlbmd0aCkpKTsgICAgICAgICBcbiAgICAgICAgfSAgICAgICAgIFxuICAgIH0gICAgICAgICBcbiAgICByZXR1cm4gZm10OyAgICAgICAgIFxufSAgICAgICBcblxud2luZG93LnN0cmlrZXIudXRpbCA9IHtcblx0Zm9ybWF0VGltZSA6IGZvcm1hdFRpbWUsXG5cdGdldFBhcmFtZXRlciA6IGdldFBhcmFtZXRlcixcbiAgICBnZXROb3dUaW1lIDogZ2V0Tm93VGltZSxcblx0Z2V0TGVuIDogZ2V0TGVuLFxuXHRjaGFuZ2VMZW4gOiBjaGFuZ2VMZW5cbn1cblxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9jb21tb24vZ2xvYmFsLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwIDIgMyA0XG4gKiovIiwidmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS51c2VyLFxyXG5cdGxvZ291dCA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5sb2dvdXQsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXIsXHJcblx0dXNlck1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyksXHJcblx0c3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHRtcGwgPSB7XHJcblx0bmF2IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvdXNlcl9uYXYuZWpzJyksXHJcblx0bWFuYWdlIDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbWFuYWdlLmVqcycpLFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKVxyXG59XHJcblxyXG52YXIgVXNlciA9IHt9LFxyXG5cdF90aGlzID0gVXNlcjtcclxubW9kdWxlLmV4cG9ydHMgPSBVc2VyO1xyXG5cclxuLy/lr7nlpJbmj5DkvpvnmoTmjqXlj6Ncclxud2luZG93LnN0cmlrZXIudXNlciA9IFVzZXI7XHJcblxyXG4vL+euoeeQhuWRmOiuvue9ruaYvuekuuetieetiVxyXG5Vc2VyLm1hbmFnZSA9IHVzZXJNYW5hZ2UubWFuYWdlO1xyXG4vLyBVc2VyLmFkZG1hbmFnZSA9IHVzZXJNYW5hZ2Uuc2hvdztcclxuXHJcbi8vIFVzZXIuYWRkRGVmTWFuYWdlID0gdXNlck1hbmFnZS5hZGREZWZNYW5hZ2U7XHJcblxyXG5Vc2VyLmdldE15SW5mbyA9IGZ1bmN0aW9uKGNiKXtcclxuXHRjZ2kuaW5mbyhmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLm15SW5mbyA9IHJlcy5kYXRhO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubmF2KHJlcy5kYXRhKTtcclxuXHRcdFx0JChcIiN1c2VyTmF2XCIpLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZFN1YicscmVzLmNvZGUpO1xyXG5cdFx0XHRzdHJpa2VyLnRyaWdnZXJIYW5kbGVyKCd1c2VyTG9hZEFydCcscmVzLmNvZGUpO1xyXG5cdFx0XHRjb25zb2xlLmxvZygndXNlcmxvYWQnKTtcclxuXHRcdFx0YmluZEFjdGlvbigpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG52YXIgbXlBY3QgPSB7XHJcblx0J2xvZ291dCcgOiBmdW5jdGlvbigpe1xyXG5cdFx0bG9nb3V0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHR3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbG9naW4uaHRtbCc7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxufVxyXG5cclxudmFyIGJpbmRBY3Rpb24gPSBmdW5jdGlvbigpe1xyXG5cdCQoXCIjdXNlck5hdlwiKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24pe1xyXG5cdFx0XHRpZihteUFjdFthY3Rpb25dKXtcclxuXHRcdFx0XHRteUFjdFthY3Rpb25dKCk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5Vc2VyLmdldFVzZXJMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHRjZ2kubGlzdChmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRkYXRhLmxpc3QgPSByZXMuZGF0YTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuVXNlci5pbml0ID0gZnVuY3Rpb24oKXtcclxuXHRfdGhpcy5nZXRNeUluZm8oKTtcclxuXHRfdGhpcy5nZXRVc2VyTGlzdCgpO1xyXG5cdHVzZXJNYW5hZ2UuaW5pdChjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3VzZXIvdXNlci5qc1xuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgYVBvc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyksXHJcblx0Y2dpLFxyXG5cdHRtcGwsXHJcblx0bm93U3ViSWQgPSAwLFxyXG5cdGxvYWRpbmcgPSBmYWxzZTtcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMCxcclxuXHRzdHJpa2VyID0gd2luZG93LnN0cmlrZXI7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFQb3N0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIiksXHJcblx0cmVzTGlzdCA9IFtdO1xyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1x0XHJcblxyXG52YXIgY2dpID0gcmVxdWlyZSgnLi4vY29tbW9uL2NnaScpLmFydGljbGU7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvYXJ0aWNsZS9saXN0LmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxuXHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5mdW5jdGlvbiByZXNldEZyb20odGFyZ2V0KXtcclxuXHR0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgnJyk7XHJcblx0dGFyZ2V0LmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoJycpO1xyXG5cdHRhcmdldC5maW5kKCcucG9wLXJlcycpLmh0bWwoJycpLmhpZGUoKTtcclxufTtcclxuXHJcbmFQb3N0LmluaXQgPSBmdW5jdGlvbihpZCxtb2R1bGUsdG1wKXtcclxuXHRub3dTdWJJZCA9IGlkO1xyXG5cdGNnaSA9IG1vZHVsZTtcclxuXHR0bXBsID0gdG1wO1xyXG5cclxuXHRuZXcgYVBvc3QucG9zdCgpO1xyXG59XHJcblxyXG52YXIgcG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wRG9tID0gJChcIiNwb3N0QXJ0aWNsZVwiKTsgLy/lupXpg6jlj5HooajmoYZcclxuXHR0aGlzLmNEb20gPSAkKFwiI2NyZWF0ZUFydGljbGVcIik7IC8v5by55Ye65Y+R6KGo5qGGXHJcblx0dGhpcy5wcmVzRG9tID0gdGhpcy5wRG9tLmZpbmQoJy5wb3N0LXJlcycpOy8vLyA9ICQoXCJcIilcclxuXHR0aGlzLmNyZXNEb20gPSB0aGlzLmNEb20uZmluZCgnLnBvcC1yZXMnKTtcclxuXHR0aGlzLmN0aXREb20gPSB0aGlzLmNEb20uZmluZCgnLm1vZGFsLXRpdGxlJyk7XHJcblx0dGhpcy5tb2RlbCA9ICdwb3N0JzsvL3Bvc3Qg5bqV6YOoIHBvcCDlvLnlh7rnqpflj6NcclxuXHJcblx0dGhpcy5pc0VkaXQgPSBmYWxzZTtcclxuXHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmNEb20ub24oJ3Nob3cuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0aWYoX3RoaXMuaXNFZGl0KXtcclxuXHRcdFx0X3RoaXMuY3RpdERvbS50ZXh0KCfkv67mlLnluJblrZAnKTtcclxuXHRcdH1lbHNle1xyXG5cdFx0XHRfdGhpcy5jdGl0RG9tLnRleHQoJ+aWsOW7uuW4luWtkCcpO1xyXG5cdFx0fVxyXG5cdFx0XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLmNEb20uZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLmZvY3VzKCk7XHJcblx0XHR9LDEwMDApXHRcclxuXHRcdF90aGlzLm1vZGVsID0gJ3BvcCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuY0RvbS5vbignaGlkZS5icy5tb2RhbCcsIGZ1bmN0aW9uIChlKSB7XHJcblx0XHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHRcdHRoaXMucmVzTWFwID0ge307XHRcdFxyXG5cdFx0X3RoaXMubW9kZWwgPSAncG9zdCc7XHJcblx0fSk7XHJcblxyXG5cdHRoaXMuZGF0YSA9IHt9O1xyXG5cdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdHRoaXMuZmlsZXVwbG9hZCA9IGZhbHNlO1xyXG5cdHRoaXMudGFyZ2V0O1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kRnVuID0gZnVuY3Rpb24oKXtcclxuXHJcbn07XHJcblxyXG5cclxuLy/lj5bpgInmi6nnmoTotYTmupBcclxucG9zdC5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5qC55o2uZG9t6I635Y+W55u45YWz55qE5Y+C5pWwLlxyXG5wb3N0LnByb3RvdHlwZS5nZXRQYXJhbSA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIG5hbWUgPSB0YXJnZXQuZmluZCgnaW5wdXRbbmFtZT1uYW1lXScpLnZhbCgpLFxyXG5cdFx0Y29udGVudCA9IHRhcmdldC5maW5kKCd0ZXh0YXJlYVtuYW1lPWNvbnRlbnRdJykudmFsKCk7XHJcblxyXG5cdHZhciBwYXJhbSA9IHtcclxuXHRcdHRpdGxlIDogbmFtZSxcclxuXHRcdGNvbnRlbnQgOiBjb250ZW50LFxyXG5cdFx0c3ViamVjdElkIDogbm93U3ViSWQsXHJcblx0XHRsYWJlbHMgOiBbXSxcclxuXHRcdHJlc291cmNlcyA6IHRoaXMuZ2V0UmVzTGlzdCgpXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gcGFyYW07XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLnJlbW92ZVJlcyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnJlc01hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdFx0aWYoX3RoaXMubW9kZWwgPT09ICdwb3AnKXtcclxuXHRcdFx0aWYodGhpcy5jcmVzRG9tLmZpbmQoJy50YWcnKS5sZW5ndGggPT09IDApe1xyXG5cdFx0XHRcdHRoaXMuY3Jlc0RvbS5oaWRlKCk7XHJcblx0XHRcdH1cclxuXHRcdH1lbHNle1xyXG5cdFx0XHRpZih0aGlzLnByZXNEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdFx0dGhpcy5wcmVzRG9tLmhpZGUoKTtcclxuXHRcdFx0fVxyXG5cdFx0fVx0XHJcblx0fVxyXG59XHJcblxyXG5wb3N0LnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oZCl7XHJcblx0dGhpcy5pc0VkaXQgPSB0cnVlO1xyXG5cdHRoaXMuZGF0YSA9IGQ7XHJcblx0dGhpcy5jRG9tLm1vZGFsKCdzaG93Jyk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ2lucHV0W25hbWU9bmFtZV0nKS52YWwoZC50aXRsZSk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhW25hbWU9Y29udGVudF0nKS52YWwoZC5jb250ZW50KTtcclxuXHJcblx0aWYoZC5yZXNvdXJjZUxpc3QubGVuZ3RoKXtcclxuXHRcdHRoaXMucmVzTGlzdCA9IFtdO1xyXG5cdFx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHRcdGZvcih2YXIgaSBpbiBkLnJlc291cmNlTGlzdCl7XHJcblx0XHRcdHZhciBpdGVtID0gZC5yZXNvdXJjZUxpc3RbaV07XHJcblx0XHRcdHRoaXMucmVzTGlzdC5wdXNoKGl0ZW0uaWQpO1xyXG5cdFx0XHR0aGlzLnJlc01hcFtpdGVtLmlkXSA9IGl0ZW07XHJcblx0XHR9XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRsaXN0IDogZC5yZXNvdXJjZUxpc3RcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5jcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHRcclxuXHR9XHJcbn1cclxuXHJcblxyXG5wb3N0LnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1x0XHJcblx0Ly/otYTmupDkuIrkvKDlrozmiJDnmoTpgJrnn6VcclxuXHJcblx0c3RyaWtlci5iaW5kKCdlZGl0QXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmVkaXQoZCk7XHJcblx0fSk7XHJcblxyXG5cdHN0cmlrZXIuYmluZCgndXBsb2FkQXJ0aWNsZScsZnVuY3Rpb24oZSxkKXtcclxuXHRcdF90aGlzLmZpbGV1cGxvYWQgPSBmYWxzZTtcclxuXHRcdGlmKHdpbmRvdy5zdHJpa2VyLmNvbW1lbnRzaG93KXtcclxuXHRcdFx0JChzdHJpa2VyKS50cmlnZ2VyKCd1cGxvYWRGaWxlJyxkKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYoZC5jb2RlID09PSAwKXtcclxuXHRcdFx0X3RoaXMucmVzTGlzdC5wdXNoKGQuZGF0YS5pZCk7XHJcblx0XHRcdF90aGlzLnJlc01hcFtkLmRhdGEuaWRdID0gZC5kYXRhO1xyXG5cclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLnJsaXN0KHtcclxuXHRcdFx0XHRsaXN0IDogW2QuZGF0YV1cclxuXHRcdFx0fSk7XHJcblx0XHRcdGlmKF90aGlzLm1vZGVsID09PSAncG9wJyl7XHJcblx0XHRcdFx0X3RoaXMuY3Jlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5wcmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHRcdH1cclxuXHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdHdpbmRvdy51cGxvYWRDb21wID0gZnVuY3Rpb24oZCl7XHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZih3aW5kb3cuc3RyaWtlci5jb21tZW50c2hvdyl7XHJcblx0XHRcdCQoc3RyaWtlcikudHJpZ2dlcigndXBsb2FkRmlsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHRcdGlmKGQuY29kZSA9PT0gMCl7XHJcblx0XHRcdF90aGlzLnJlc0xpc3QucHVzaChkLmRhdGEuaWQpO1xyXG5cdFx0XHRfdGhpcy5yZXNNYXBbZC5kYXRhLmlkXSA9IGQuZGF0YTtcclxuXHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRcdFx0bGlzdCA6IFtkLmRhdGFdXHJcblx0XHRcdH0pO1xyXG5cdFx0XHRpZihfdGhpcy5tb2RlbCA9PT0gJ3BvcCcpe1xyXG5cdFx0XHRcdF90aGlzLmNyZXNEb20uYXBwZW5kKGh0bWwpLnNob3coKTtcclxuXHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0X3RoaXMucHJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdFx0XHR9XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH07XHJcblxyXG5cdHRoaXMucERvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cclxuXHR0aGlzLmNEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRhY3Rpb24gPSB0YXJnZXQuZGF0YSgnYWN0aW9uJyk7XHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcdFxyXG5cclxuXHQkKFwiI2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRpZihfdGhpcy5maWxldXBsb2FkKXtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcclxuXHJcblx0JChcIiNjZmlsZU5hbWVcIikuYmluZCgnY2hhbmdlJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHRcdGlmKF90aGlzLmZpbGV1cGxvYWQpe1xyXG5cdFx0XHRyZXR1cm47XHJcblx0XHR9XHRcdFxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcbn1cclxuXHJcbnBvc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLnBEb20uZmluZCgnaW5wdXQnKS52YWwoJycpO1xyXG5cdHRoaXMucERvbS5maW5kKCd0ZXh0YXJlYScpLnZhbCgnJyk7XHJcblxyXG5cdHRoaXMuY0RvbS5maW5kKCdpbnB1dCcpLnZhbCgnJyk7XHJcblx0dGhpcy5jRG9tLmZpbmQoJ3RleHRhcmVhJykudmFsKCcnKTtcdFxyXG5cclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxuXHR0aGlzLnJlc01hcCA9IHt9O1x0XHJcblx0Y29uc29sZS5sb2coMjMzMzMzKTtcclxufVxyXG5cclxucG9zdC5wcm90b3R5cGUucG9zdCA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5sb2FkaW5nKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0dmFyIHB0ID0gdGhpcy50YXJnZXQuZGF0YSgndGFyZ2V0Jyk7XHJcblx0Ly9jb25zb2xlLmxvZyhwVGFyZ2V0KTtcclxuXHR2YXIgcFRhcmdldCA9ICQocHQpO1xyXG5cclxuXHRpZihwVGFyZ2V0Lmxlbmd0aCA9PT0gMCl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0dmFyIHBhcmFtID0gdGhpcy5nZXRQYXJhbShwVGFyZ2V0KTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHRpZihwYXJhbS50aXRsZSA9PT0gJycgfHwgcGFyYW0uY29udGVudCA9PT0gJycpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblxyXG5cdGlmKHRoaXMuaXNFZGl0KXtcclxuXHRcdHBhcmFtLnN1YmplY3RJZCA9IHRoaXMuZGF0YS5zdWJqZWN0X2lkO1xyXG5cdFx0cGFyYW0uYXJ0aWNsZUlkID0gdGhpcy5kYXRhLmlkO1xyXG5cdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRyZXNldEZyb20ocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdF90aGlzLmNEb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRzdHJpa2VyLnRyaWdnZXIoJ2FydGljbGVFZGl0ZWQnLHJlcy5kYXRhKTtcclxuXHRcdFx0XHQvL3N0cmlrZXIuYXJ0aWNsZS5hcHBlbmRUb0xpc3QocmVzLmRhdGEpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLmNsZWFyKCk7XHJcblx0XHR9KTtcdFxyXG5cdH1lbHNle1xyXG5cdFx0Y2dpLmNyZWF0ZShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblxyXG5cdFx0XHRpZihwVGFyZ2V0Lmhhc0NsYXNzKCdtb2RhbCcpKXtcclxuXHRcdFx0XHRyZXNldEZyb20ocFRhcmdldCk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY0RvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0c3RyaWtlci50cmlnZ2VyKCduZXdhcnRpY2xlJyxyZXMuZGF0YSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuY2xlYXIoKTtcclxuXHRcdH0pO1x0XHJcblx0fVxyXG59XHJcbi8v6YeN572u5LiA5LiqZnJvbVxyXG5hUG9zdC5yZXNldCA9IGZ1bmN0aW9uKHRhcmdldCl7XHJcblx0dmFyIHBUYXJnZXQgPSAkKHRhcmdldC5kYXRhKCd0YXJnZXQnKSk7XHJcblx0aWYocFRhcmdldC5sZW5ndGggPT09IDApe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHRyZXNldEZyb20ocFRhcmdldCk7XHJcbn1cclxuXHJcbmFQb3N0LnBvc3QgPSBwb3N0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvYXJ0aWNsZS9wb3N0LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBtc2cgPSB7XHJcblx0MCA6ICfmk43kvZzmiJDlip8hJyxcclxuXHQxMDogJ+aOkuW6j+W6j+WPt+W/hemhu+Whq+WGmScsXHJcblx0MTEgOiAn57uE57uH5ZCN56ew5b+F6aG75aGr5YaZJyxcclxuXHQyMCA6ICfmlrDlr4bnoIHlkozph43lpI3lr4bnoIHlv4XpobvkuIDoh7QnLFxyXG5cdDIxIDogJ+ivt+Whq+WGmeeUqOaIt+WQjeWSjOWvhueggSEnLFxyXG5cdDIyIDogJ+eUqOaIt+S4jeWtmOWcqCcsXHJcblx0MzAgOiAn57uE57uH5pyA5aSa5pSv5oyBM+e6pyEnLCBcclxuXHQ0MCA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQ1MCA6ICfkvaDopoHkuIrkvKDnmoTmlofku7blt7Lnu4/otoXov4fkvaDnmoTliankvZnnqbrpl7QhJyxcclxuXHQ2MCA6ICfkvaDov5jmsqHmnInpgInmi6nopoHlhbHkuqvnmoTnm67lvZUnLFxyXG5cdDc1IDogJ+W6j+WPt+WPquiDveWcqDF+OTnkuYvpl7QnLFxyXG5cdDc2IDogJ+WQjeensOS4jeiDveWwkeS6jjLkuKrlrZcnLFxyXG5cdDc3IDogJ+WPguaVsOS4jeiDveS4uuepuicsXHJcblx0NzggOiAn5a+55LiN6LW377yM572R57uc6LaF5pe25LqG77yM6K+356iN5ZCO5YaN6K+VJyxcclxuXHQ3OSA6ICflt7Lnu4/mnInlkIzlkI3nmoTpobnnm67kuoYnLFxyXG5cdDEwMCA6ICflr7nkuI3otbfvvIzmgqjmsqHmnInov5nkuKrmk43kvZzmnYPpmZAhJywvL+WQjuWPsOWHuumUmeWVpiFcclxuXHQxMDEgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDAxIDogJ+aCqOi/mOayoeacieeZu+W9lSEnLFxyXG5cdDEwMDQgOiAn5rKh5pyJ5om+5Yiw6LWE5rqQIScsXHJcblx0MTAxMCA6ICfmgqjmsqHmnInmn6XnnIvor6XotYTmupDnmoTmnYPpmZAhJyxcclxuXHQxMDExIDogJ+WPguaVsOWHuumUmeWVpiEnLFxyXG5cdDEwMTMgOiAn5Ye66ZSZ5ZWmJyxcclxuXHQxMDE0IDogJ+W3sue7j+WFs+azqOivpeS4u+mimCcsXHJcblx0MTAxNSA6ICflt7Lnu4/lvZLmoaPllaYhJyxcclxuXHQxMDE2IDogJ+ivpei1hOa6kOS4jeiDveWIoOmZpCcsXHJcblx0MTAxNyA6ICfor6Xnm67lvZXkuIvov5jmnInlhbbku5bmlofku7bvvIzml6Dms5XliKDpmaQhJyxcclxuXHQxMDQxIDogJ+eUqOaIt+WQjeaIluWvhueggemUmeivryEnLFxyXG5cdDEwNDMgOiAn55So5oi35LiN5a2Y5ZyoIScsXHJcblx0MTA1MCA6ICfml7bpl7TkuqTlj4nkuoYhJ1xyXG59XHJcblxyXG5NZXNzZW5nZXIoKS5vcHRpb25zID0ge1xyXG4gICAgZXh0cmFDbGFzc2VzOiAnbWVzc2VuZ2VyLWZpeGVkIG1lc3Nlbmdlci1vbi1ib3R0b20nLFxyXG4gICAgdGhlbWU6ICdmbGF0J1xyXG59XHJcblxyXG52YXIgZGIgPSB7fTtcclxuXHJcbmZ1bmN0aW9uIG1lc3NhZ2UoKXtcclxuXHR0aGlzO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5jb25maXJtID0gZnVuY3Rpb24obXNnLGxhYmVsLGNiKXtcclxuXHRpZih0eXBlb2YgbGFiZWwgPT09ICd1bmRlZmluZWQnIHx8IGxhYmVsID09PSBudWxsKXtcclxuXHRcdGxhYmVsID0ge1xyXG5cdFx0XHRzdWIgOiAn56Gu5a6aJyxcclxuXHRcdFx0Y2FuY2VsIDogJ+WPlua2iCdcclxuXHRcdH1cclxuXHR9XHJcblx0aWYodHlwZW9mIGNiID09PSAndW5kZWZpbmVkJyl7XHJcblx0XHRjYiA9IGZ1bmN0aW9uKCl7fTtcclxuXHR9XHJcblx0aWYodHlwZW9mIG1zZyA9PT0gJ3VuZGVmaW5lZCcpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdG1lc3NhZ2UgOiBtc2csXHJcblx0XHRhY3Rpb25zIDoge1xyXG5cdFx0XHRzdWIgOiB7XHJcblx0XHRcdFx0bGFiZWwgOiBsYWJlbC5zdWIgfHwgJ+ehruWumicsXHJcblx0XHRcdFx0YWN0aW9uIDogZnVuY3Rpb24oKXtcclxuXHRcdFx0XHRcdGNiKCk7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0Y2FuY2VsIDoge1xyXG5cdFx0XHRcdGxhYmVsIDogbGFiZWwuY2FuY2VsIHx8ICflj5bmtognLFxyXG5cdFx0XHRcdGFjdGlvbiA6IGZ1bmN0aW9uKCl7XHJcblx0XHRcdFx0XHRtc2cuaGlkZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH1cclxuXHR2YXIgbXNnID0gTWVzc2VuZ2VyKCkucG9zdChvYmopO1xyXG59XHJcblxyXG5tZXNzYWdlLnByb3RvdHlwZS5lcnJvciA9IGZ1bmN0aW9uKGQpe1xyXG5cdGlmKGQgPT0gMTAwMSl7XHJcblx0XHR3aW5kb3cubG9jYXRpb24gPSAnL2xvZ2luLmh0bWwnO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZ1tkXSB8fCAn5Ye66ZSZ5ouJISdcclxuXHR9XHJcblx0aWYocGFyc2VJbnQoZCkpe1xyXG5cdFx0b2JqLnR5cGUgPSAnZXJyb3InXHJcblx0fVxyXG5cclxuXHRNZXNzZW5nZXIoKS5wb3N0KG9iaik7XHJcbn1cclxuXHJcbm1lc3NhZ2UucHJvdG90eXBlLm1zZyA9IGZ1bmN0aW9uKG1zZyl7XHJcblx0dmFyIG9iaiA9IHtcclxuXHRcdCdtZXNzYWdlJyA6IG1zZyB8fCAnJ1xyXG5cdH1cclxuXHRpZihwYXJzZUludChtc2cpKXtcclxuXHRcdG9iai50eXBlID0gJ2Vycm9yJ1xyXG5cdH1cclxuXHJcblx0TWVzc2VuZ2VyKCkucG9zdChvYmopO1x0XHRcclxufVxyXG5cclxuZGIubWVzc2FnZSA9IG1lc3NhZ2U7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL21zZy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMSAyIDMgNFxuICoqLyIsIi8v6YCa55+lXHJcbnZhciBub3RpZnkgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykubm90aWZ5LFxyXG5cdGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5ub3RpZnk7XHJcblxyXG52YXIgdG1wbCA9IHtcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3VzZXIvbXNnbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvdXNlci9tc2cuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59XHJcblxyXG52YXIgbm90aWZ5T2JqID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjbm90aWZ5TGlzdFwiKTtcclxuXHR0aGlzLnRpcHNEb20gPSAkKFwiI3VzZXJOYXYgLm1zZyBkaXZcIik7XHJcblxyXG5cdHRoaXMubXNnTnVtID0gMDtcclxuXHR0aGlzLmdldCgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kuc2VhcmNoKHt9LGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRjb25zb2xlLmxvZyhyZXMpO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aCl7XHJcblx0XHRcdFx0X3RoaXMubXNnTnVtID0gcmVzLmRhdGEubGlzdC5sZW5ndGg7XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSkuc2hvdygpO1xyXG5cdFx0XHRcdHZhciBodG1sID0gdG1wbC5saXN0KHJlcy5kYXRhKTtcclxuXHRcdFx0XHRfdGhpcy5kb20uaHRtbChodG1sKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5ub3RpZnlPYmoucHJvdG90eXBlLnJlYWQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxubm90aWZ5T2JqLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMudGlwc0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHRpZihfdGhpcy5tc2dOdW0pe1xyXG5cdFx0XHRpZihfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnKSl7XHJcblx0XHRcdFx0X3RoaXMuZG9tLmhpZGUoKTtcclxuXHRcdFx0XHRfdGhpcy50aXBzRG9tLmRhdGEoJ3Nob3cnLDApO1xyXG5cdFx0XHR9ZWxzZXtcclxuXHRcdFx0XHRfdGhpcy5kb20uc2hvdygpO1x0XHJcblx0XHRcdFx0X3RoaXMudGlwc0RvbS5kYXRhKCdzaG93JywxKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0XHRocmVmID0gdGFyZ2V0LmRhdGEoJ2hyZWYnKSxcclxuXHRcdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKSxcclxuXHRcdFx0cmVhZCA9IHRhcmdldC5kYXRhKCdyZWFkJyk7XHJcblxyXG5cclxuXHRcdGlmKGhyZWYpe1xyXG5cdFx0XHR3aW5kb3cub3BlbihocmVmKTtcclxuXHRcdFx0aWYocmVhZCA9PSAnJyl7XHJcblx0XHRcdFx0Y2dpLnJlYWQoe1xyXG5cdFx0XHRcdFx0bm90aWZ5SWQgOiBpZFxyXG5cdFx0XHRcdH0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0dGFyZ2V0LnJlbW92ZSgpO1xyXG5cdFx0XHRcdFx0XHRfdGhpcy5tc2dOdW0tLTtcclxuXHRcdFx0XHRcdFx0X3RoaXMudGlwc0RvbS50ZXh0KF90aGlzLm1zZ051bSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fSlcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pXHJcbn1cclxuXHJcbm5vdGlmeS5ub3RpZnkgPSBub3RpZnlPYmo7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBub3RpZnk7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9ub3RpZnkvbm90aWZ5LmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykubGFiZWwsXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLmxhYmVsLFxyXG5cdHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnZhciBMYWJlbCA9IHt9LFxyXG5cdF90aGlzID0gTGFiZWw7XHJcbnZhciB0bXBsID0ge1xyXG5cdGxpc3QgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvbGlzdC5lanMnKSxcclxuXHRvbmUgOiByZXF1aXJlKCcuLi8uLi90cGwvbGFiZWwvb25lLmVqcycpXHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IExhYmVsO1xyXG5cclxuZnVuY3Rpb24gZ2V0TGlzdCgpe1xyXG5cdGNnaS5saXN0KGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG5cclxuTGFiZWwubGFiZWwgPSBmdW5jdGlvbihuYW1lKXtcclxuXHR0aGlzLmRvbSA9ICQoXCIjXCIrbmFtZSk7XHJcblxyXG5cdHRoaXMubm93RG9tID0gdGhpcy5kb20uZmluZCgnLm5vdy1sYWJlbC1saXN0Jyk7XHJcblx0dGhpcy5hZGREb20gPSB0aGlzLmRvbS5maW5kKCcuYWRkLWxhYmVsLWFyZWEnKTtcclxuXHQvLyBpZih0eXBlID09PSAnc3ViJyl7XHJcblx0Ly8gXHR0aGlzLmFkZERvbSA9ICQoJyNhZGRTdWJMYWJlbCcpO1xyXG5cdC8vIFx0dGhpcy5ub3dEb20gPSAkKCcjbm93U3ViTGFiZWwnKTtcclxuXHQvLyB9ZWxzZXtcclxuXHQvLyBcdHRoaXMuYWRkRG9tID0gJCgnI2FkZEFydExhYmVsJyk7XHJcblx0Ly8gXHR0aGlzLm5vd0RvbSA9ICQoJyNub3dBcnRMYWJlbCcpO1xyXG5cdC8vIH1cclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmFkZERvbS5maW5kKCcubGFiZWwtbGlzdCcpO1xyXG5cdHRoaXMuYnRuRG9tID0gdGhpcy5hZGREb20uZmluZCgnLmJ0bicpO1xyXG5cdHRoaXMuaW5wdXREb20gPSB0aGlzLmFkZERvbS5maW5kKCcuZm9ybS1jb250cm9sJyk7XHJcblx0dGhpcy5fc2VsZWN0RG9tOy8v5b2T5YmN6YCJ5Lit55qE5YWD57SgXHJcblxyXG5cdC8v6buY6K6k5rKh5pyJ5qCH562+XHJcblx0dGhpcy5ub3dEb20uaGlkZSgpO1xyXG5cdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHJcblx0Ly/lt7Lnu4/pgInkuK3nmoRpZG1hcFxyXG5cdHRoaXMuaWRtYXAgPSB7fTtcclxuXHJcblx0dGhpcy5tYXAgPSB7fTtcclxuXHR0aGlzLmdldERhdGEoKTtcdFxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcblx0Ly9cclxuXHQvLyB0aGlzLm5vd0RvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHQvLyBcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdC8vIFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0Ly8gXHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0Ly8gXHR9XHJcblx0Ly8gfSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5jcmVhdGUgPSBmdW5jdGlvbigpe1xyXG5cdHZhciB2YWwgPSB0aGlzLmlucHV0RG9tLnZhbCgpO1xyXG5cdGlmKHZhbCAhPT0gJycpe1xyXG5cdFx0dmFyIHBhcmFtID0ge1xyXG5cdFx0XHRuYW1lIDogdmFsXHJcblx0XHR9O1xyXG5cdFx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRfdGhpcy5tYXBbcmVzLmRhdGEuaWRdID0gcmVzLmRhdGE7XHJcblx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe2xpc3Q6W3Jlcy5kYXRhXX0pO1xyXG5cdFx0XHRcdF90aGlzLmxpc3REb20uYXBwZW5kKGh0bWwpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKGUpe1xyXG5cdC8vIC9jb25zb2xlLmxvZyh0aGlzLl9zZWxlY3REb20pO1xyXG5cdGlmKHRoaXMuX3NlbGVjdERvbS5oYXNDbGFzcygnZnVpLXBsdXMnKSl7XHJcblx0XHR0aGlzLl9zZWxlY3REb20ucmVtb3ZlQ2xhc3MoJ2Z1aS1wbHVzJykuYWRkQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5hZGREb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMuYWRkRG9tLmhpZGUoKTtcclxuXHR9XHJcblx0Ly90aGlzLmFkZERvbS5zaG93KCk7XHJcblx0Ly90aGlzLm5vd0RvbS5zaG93KCk7XHJcblxyXG5cdC8vZnVpLWNyb3NzXHJcblx0Ly9mdWktcGx1c1xyXG59XHJcblxyXG5MYWJlbC5sYWJlbC5wcm90b3R5cGUuZ2V0RGF0YSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRjZ2kubGlzdCh7fSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdCh7bGlzdDpyZXMuZGF0YX0pO1xyXG5cdFx0XHRfdGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHRcdGZvcih2YXIgaSA9IDAsbD1yZXMuZGF0YS5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHRcdFx0dmFyIGl0ZW0gPSByZXMuZGF0YVtpXTtcclxuXHRcdFx0XHRfdGhpcy5tYXBbaXRlbS5pZF0gPSBpdGVtO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zaG93RWRpdCA9IGZ1bmN0aW9uKGRhdGEpe1xyXG5cdCB2YXIgaHRtbCA9IHRtcGwub25lKHtsaXN0OmRhdGF9KTtcclxuXHQgdGhpcy5ub3dEb20uaHRtbChodG1sKS5zaG93KCk7XHJcbn1cclxuXHJcbkxhYmVsLmxhYmVsLnByb3RvdHlwZS5zZWxlY3QgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgaWQgPSB0aGlzLl9zZWxlY3REb20uZGF0YSgnaWQnKTtcclxuXHR2YXIgcGFyYW0gPSB7XHJcblx0XHRsaXN0IDogW3RoaXMubWFwW2lkXV1cclxuXHR9XHJcblxyXG5cdHRoaXMuaWRtYXBbaWRdID0gMTtcclxuXHRpZih0aGlzLm5vd0RvbS5maW5kKCcubGFiZWwnK2lkKS5sZW5ndGggPT09IDApe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm9uZShwYXJhbSk7XHJcblx0XHR0aGlzLm5vd0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmdldExhYmVsTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHQvLyBjb25zb2xlLmxvZyh0aGlzLm5vd0RvbS5maW5kKFwiLnRhZ1wiKS5sZW5ndGgpO1xyXG5cdC8vIHRoaXMubm93RG9tLmZpbmQoXCIudGFnXCIpLmVhY2goZnVuY3Rpb24oZSl7XHJcblx0Ly8gXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0Ly8gXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblx0Ly8gXHRpZihpZCl7XHJcblx0Ly8gXHRcdGxpc3QucHVzaChpZCk7XHJcblx0Ly8gXHR9XHRcdFx0XHRcclxuXHQvLyB9KVx0XHJcblx0Zm9yKHZhciBpIGluIHRoaXMuaWRtYXApe1xyXG5cdFx0bGlzdC5wdXNoKGkpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuTGFiZWwubGFiZWwucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5ub3dEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cclxuXHR2YXIgZG9tID0gdGhpcy5kb20uZmluZCgnLnNob3ctYnRuJyk7XHJcblx0ZG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHR0aGlzLmFkZERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/liKDpmaRcclxuTGFiZWwubGFiZWwucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCk7XHJcblxyXG5cdHZhciBpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRkZWxldGUgdGhpcy5pZG1hcFtpZF07XHJcblx0cC5yZW1vdmUoKTtcclxufVxyXG5cclxuXHJcbkxhYmVsLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvbGFiZWwvbGFiZWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsInZhciByZXF1ZXN0ID0gcmVxdWlyZSgnLi9yZXF1ZXN0JyksXHJcblx0bWVzc2FnZSA9IHJlcXVpcmUoJy4vbXNnJyk7XHJcblxyXG52YXIgbXNnID0gbmV3IG1lc3NhZ2UubWVzc2FnZSgpO1xyXG5cclxudmFyIGNnaVBhdGggPSAnL2NnaS8nO1xyXG52YXIgY2dpTGlzdCA9IHtcclxuXHR1c2VyIDoge1xyXG5cdFx0bGlzdCA6IGNnaVBhdGgrJ3VzZXIvbGlzdCcsXHJcblx0XHRpbmZvIDogY2dpUGF0aCsndXNlci9pbmZvJyxcclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ3VzZXIvY3JlYXRlJ1xyXG5cdH0sXHJcblx0c3ViamVjdCA6IHtcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydzdWJqZWN0L2xpc3QnLCAvLyDmiJHnmoTliJfooahcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ3N1YmplY3Qvc2VhcmNoJyxcclxuXHRcdGluZm8gOiBjZ2lQYXRoKydzdWJqZWN0L2luZm8nLFxyXG5cdFx0ZWRpdCA6IGNnaVBhdGgrJ3N1YmplY3QvZWRpdCcsIC8v5L+u5pS55Li76aKYXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydzdWJqZWN0L2NyZWF0ZScsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ3N1YmplY3QvZGVsZXRlJyxcclxuXHRcdGZvbGxvdyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93JywgLy/lhbPms6hcclxuXHRcdGZvbGxvd2luZyA6IGNnaVBhdGgrJ3N1YmplY3QvZm9sbG93aW5nJywgLy/lhbPms6jliJfooahcclxuXHRcdGludml0ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2ludml0ZWQnLCAvL+mCgOivt+WIl+ihqFxyXG5cdFx0YXJjaGl2ZWQgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmVkJywgLy/lhbPms6jliJfooahcclxuXHRcdGFyY2hpdmUgOiBjZ2lQYXRoKydzdWJqZWN0L2FyY2hpdmUnLCAvL+WFs+azqOWIl+ihqFxyXG5cdFx0ZGVscmVzb3VyY2UgOiBjZ2lQYXRoICsgJ3N1YmplY3QvZGVscmVzb3VyY2UnIC8v5Yig6Zmk5LiA5Liq6LWE5rqQXHJcblx0fSxcclxuXHRhcnRpY2xlIDoge1xyXG5cdFx0c2VhcmNoIDogY2dpUGF0aCsnYXJ0aWNsZS9zZWFyY2gnLFxyXG5cdFx0aW5mbyA6IGNnaVBhdGgrJ2FydGljbGUvaW5mbycsXHJcblx0XHRzdGFyaW5nIDogY2dpUGF0aCsnYXJ0aWNsZS9zdGFyaW5nJywgLy/otZ7nmoTluJblrZBcclxuXHRcdGNvbGxlY3RlZCA6IGNnaVBhdGgrJ2FydGljbGUvY29sbGVjdGVkJywgLy/mkJzol4/nmoTluJblrZBcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydhcnRpY2xlL2VkaXQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2FydGljbGUvc3RhcicsIC8v6LWeXHJcblx0XHRjb2xsZWN0IDogY2dpUGF0aCsnYXJ0aWNsZS9jb2xsZWN0JywgLy/mlLbol49cclxuXHRcdCdkZWxldGUnIDogY2dpUGF0aCsnYXJ0aWNsZS9kZWxldGUnLCAvL+aUtuiXj1xyXG5cdFx0J3NldHRvcCcgOiBjZ2lQYXRoKydhcnRpY2xlL3NldFRvcCcsIC8v5pS26JePXHJcblx0XHQncmVmJyA6IGNnaVBhdGgrJ2FydGljbGUvbmV3YXJ0JywgLy/mlLbol49cclxuXHRcdGNyZWF0ZSA6IGNnaVBhdGgrJ2FydGljbGUvY3JlYXRlJ1xyXG5cdH0sXHJcblx0Y29tbWVudCA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ2NvbW1lbnQvc2VhcmNoJyxcclxuXHRcdHN0YXJpbmcgOiBjZ2lQYXRoKydjb21tZW50L3N0YXJpbmcnLFxyXG5cdFx0Y29sbGVjdGVkIDogY2dpUGF0aCsnY29tbWVudC9jb2xsZWN0ZWQnLFxyXG5cdFx0c3RhciA6IGNnaVBhdGgrJ2NvbW1lbnQvc3RhcicsXHJcblx0XHQnZGVsZXRlJyA6IGNnaVBhdGgrJ2NvbW1lbnQvZGVsZXRlJyxcclxuXHRcdGVkaXQgOiBjZ2lQYXRoKydjb21tZW50L2VkaXQnLFxyXG5cdFx0Y29sbGVjdCA6IGNnaVBhdGgrJ2NvbW1lbnQvY29sbGVjdCcsXHJcblx0XHRjcmVhdGUgOiBjZ2lQYXRoKydjb21tZW50L2NyZWF0ZSdcclxuXHR9LFxyXG5cdG5vdGlmeSA6IHtcclxuXHRcdHNlYXJjaCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9zZWFyY2gnLFxyXG5cdFx0cmVhZCA6IGNnaVBhdGgrJ25vdGlmaWNhdGlvbi9yZWFkJyxcclxuXHR9LFxyXG5cdGxhYmVsIDoge1xyXG5cdFx0Y3JlYXRlIDogY2dpUGF0aCsnbGFiZWwvY3JlYXRlJyxcclxuXHRcdGxpc3QgOiBjZ2lQYXRoKydsYWJlbC9saXN0J1xyXG5cdH0sXHJcblx0cmVzb3VyY2UgOiB7XHJcblx0XHRtYXJrIDogY2dpUGF0aCArICdyZXNvdXJjZS9tYXJrJyxcclxuXHRcdHNwbGl0IDogY2dpUGF0aCArICdyZXNvdXJjZS9zcGxpdCcsXHJcblx0XHRsaXN0IDogY2dpUGF0aCArICdyZXNvdXJjZS9saXN0J1xyXG5cdH0sXHJcblx0bG9naW4gOiBjZ2lQYXRoKydhY2NvdW50L2xvZ2luJyxcclxuXHRsb2dvdXQgOiBjZ2lQYXRoKydhY2NvdW50L2xvZ291dCdcclxufVxyXG5cclxudmFyIGRiID0ge307XHJcbnZhciBlbXB0eUZ1biA9IGZ1bmN0aW9uKHJlcyl7XHJcbn1cclxuLy8gL+e7n+S4gOWHuuadpeW8ueWHuua2iOaBr1xyXG52YXIgY2hlY2tDYWxsYmFjayA9IGZ1bmN0aW9uKGNiLGZsYWcpe1xyXG5cdHJldHVybiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0Y2IocmVzKTtcclxuXHRcdGlmKHJlcy5jb2RlICE9PSAwKXtcclxuXHRcdFx0bXNnLmVycm9yKHJlcy5jb2RlKTtcclxuXHRcdH1lbHNlIGlmKGZsYWcpe1xyXG5cdFx0XHRtc2cuZXJyb3IocmVzLmNvZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZGIubG9naW4gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QubG9naW4scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5sb2dvdXQgPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblxyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxvZ291dCx7fSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnVzZXIgPSB7fTtcclxuZGIudXNlci5saXN0ID0gZnVuY3Rpb24oY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QudXNlci5saXN0LG51bGwsY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi51c2VyLmluZm8gPSBmdW5jdGlvbihjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmluZm8sbnVsbCxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuLy/nm7TmjqXmi4nmiYDmnInnlKjmiLc/XHJcbmRiLnVzZXIuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC51c2VyLmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QgPSB7fTtcclxuXHJcbmRiLnN1YmplY3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0Lmxpc3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0Lmxpc3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmluZm8gPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5zdWJqZWN0LmluZm8scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5zdWJqZWN0LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmNyZWF0ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3RbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3RbJ2RlbGV0ZSddLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZSxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3cscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZm9sbG93aW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Quc3ViamVjdC5mb2xsb3dpbmcscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuaW52aXRlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuaW52aXRlZCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIuc3ViamVjdC5hcmNoaXZlZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LnN1YmplY3QuYXJjaGl2ZWQscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuYXJjaGl2ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmFyY2hpdmUscGFyYW0sY2FsbGJhY2spO1x0XHJcbn1cclxuXHJcbmRiLnN1YmplY3QuZGVscmVzb3VyY2UgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5zdWJqZWN0LmRlbHJlc291cmNlLHBhcmFtLGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5hcnRpY2xlID0ge307XHJcblxyXG5kYi5hcnRpY2xlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuc2VhcmNoLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zdGFyaW5nID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuYXJ0aWNsZS5zdGFyaW5nLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuaW5mbyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUuaW5mbyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGUuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZS5jcmVhdGUscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmFydGljbGUuZWRpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmFydGljbGUuZWRpdCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmFydGljbGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuYXJ0aWNsZVsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5hcnRpY2xlLnJlZiA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmFydGljbGUucmVmLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuYXJ0aWNsZS5zZXR0b3AgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5hcnRpY2xlLnNldHRvcCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnQgPSB7fTtcclxuXHJcbmRiLmNvbW1lbnQuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QuY29tbWVudC5zZWFyY2gscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcbmRiLmNvbW1lbnQuc3RhcmluZyA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LmdldChjZ2lMaXN0LmNvbW1lbnQuc3RhcmluZyxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuZGIuY29tbWVudC5jb2xsZWN0ZWQgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayk7XHJcblx0cmVxdWVzdC5nZXQoY2dpTGlzdC5jb21tZW50LmNvbGxlY3RlZCxwYXJhbSxjYWxsYmFjayk7XHJcbn1cclxuXHJcbmRiLmNvbW1lbnRbJ2RlbGV0ZSddID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudFsnZGVsZXRlJ10scGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LnN0YXIgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LnN0YXIscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNvbGxlY3QgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjayl7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5jb21tZW50LmNvbGxlY3QscGFyYW0sY2FsbGJhY2spO1xyXG59XHJcblxyXG5kYi5jb21tZW50LmNyZWF0ZSA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmNvbW1lbnQuY3JlYXRlLHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIuY29tbWVudC5lZGl0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QuY29tbWVudC5lZGl0LHBhcmFtLGNhbGxiYWNrKTtcclxufVxyXG5cclxuZGIubm90aWZ5ID0ge307XHJcblxyXG5kYi5ub3RpZnkuc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3Qubm90aWZ5LnNlYXJjaCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5ub3RpZnkucmVhZCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKXtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5ub3RpZnkucmVhZCxwYXJhbSxjYWxsYmFjayk7XHRcdFxyXG59XHJcblxyXG5kYi5sYWJlbCA9IHt9O1xyXG5cclxuZGIubGFiZWwuY3JlYXRlID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spIHtcclxuXHR2YXIgY2FsbGJhY2sgPSBjaGVja0NhbGxiYWNrKGNhbGxiYWNrLHRydWUpO1xyXG5cdHJlcXVlc3QucG9zdChjZ2lMaXN0LmxhYmVsLmNyZWF0ZSwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5sYWJlbC5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QubGFiZWwubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxuZGIucmVzb3VyY2UgPSB7fTtcclxuXHJcbmRiLnJlc291cmNlLm1hcmsgPSBmdW5jdGlvbihwYXJhbSxjYWxsYmFjaykge1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2ssdHJ1ZSk7XHJcblx0cmVxdWVzdC5wb3N0KGNnaUxpc3QucmVzb3VyY2UubWFyaywgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5zcGxpdCA9IGZ1bmN0aW9uKHBhcmFtLGNhbGxiYWNrKSB7XHJcblx0dmFyIGNhbGxiYWNrID0gY2hlY2tDYWxsYmFjayhjYWxsYmFjayx0cnVlKTtcclxuXHRyZXF1ZXN0LnBvc3QoY2dpTGlzdC5yZXNvdXJjZS5zcGxpdCwgcGFyYW0sIGNhbGxiYWNrKTtcdFxyXG59XHJcblxyXG5kYi5yZXNvdXJjZS5saXN0ID0gZnVuY3Rpb24ocGFyYW0sY2FsbGJhY2spe1xyXG5cdHZhciBjYWxsYmFjayA9IGNoZWNrQ2FsbGJhY2soY2FsbGJhY2spO1xyXG5cdHJlcXVlc3QuZ2V0KGNnaUxpc3QucmVzb3VyY2UubGlzdCxwYXJhbSxjYWxsYmFjayk7XHRcclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBkYjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL2NvbW1vbi9jZ2kuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/kuLvpophcclxudmFyIGNnaSA9IHJlcXVpcmUoJy4uL2NvbW1vbi9jZ2knKS5zdWJqZWN0LFxyXG5cdHN1YmplY3RMaXN0ID0gcmVxdWlyZSgnLi9saXN0JyksXHJcblx0c3ViamVjdEluZm8gPSByZXF1aXJlKCcuL2luZm8nKSxcclxuXHRzdWJqZWN0Q3JlYXRlID0gcmVxdWlyZSgnLi9jcmVhdGUnKTtcclxuXHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHRcclxuXHJcbi8v5qih5p2/5byV55SoXHJcbnZhciB0bXBsID0ge1xyXG5cdGFyZWEgOiByZXF1aXJlKCcuLi8uLi90cGwvc3ViamVjdC9zaXplLmVqcycpLFxyXG5cdG1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL21hbmFnZS5lanMnKSwgLy/nrqHnkIblkZhcclxuXHRsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3N1YmplY3QvbGlzdC5lanMnKSwgIC8v5Li76aKY5YiX6KGoXHJcblx0aGVhZCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2hlYWQuZWpzJyksICAvL+S4u+mimOivpuaDheWktOmDqFxyXG5cdG9uZW1hbmFnZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC91c2VyL29uZW1hbmFnZS5lanMnKSwgLy/ljZXkuKrnrqHnkIblkZhcclxuXHRhc2lkZSA6IHJlcXVpcmUoJy4uLy4uL3RwbC9zdWJqZWN0L2FzaWRlLmVqcycpLCAgLy/kuLvpopjor6bmg4Xlj7PovrnotYTmupDliJfooahcclxuXHRybGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9yZXNvdXJjZS9saXN0LmVqcycpICAgLy/otYTmupDliJfooahcclxufTtcclxuXHJcbnZhciBwcm9NYXAgPSB7XHJcblx0bXlTdWJqZWN0IDogJ+aIkeWIm+W7uueahCcsXHJcblx0bXlGb2xsb3cgOiAn5oiR5YWz5rOo55qEJyxcclxuXHRteUludml0ZWQgOiAn6YKA6K+35oiR55qEJyxcclxuXHRvcGVuIDogJ+WFrOW8gOS4u+mimCcsXHJcblx0bXlBcmNoaXZlZCA6ICflvZLmoaPkuLvpopgnXHJcbn1cclxuXHJcbnZhciBTdWJqZWN0ID0ge307XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFN1YmplY3Q7XHJcblxyXG4vKuWumuS5iemAmueUqOWPguaVsCovXHJcbnZhciBzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMDtcclxuXHJcblN1YmplY3Quc2VhcmNoID0gc3ViamVjdExpc3Quc2VhcmNoO1xyXG5cclxuU3ViamVjdC5jcmVhdGUgPSBzdWJqZWN0Q3JlYXRlLmNyZWF0ZTtcclxuXHJcblN1YmplY3QuaW5mbyA9IHN1YmplY3RJbmZvLmluZm87XHJcblxyXG5TdWJqZWN0LmFyZWEgPSBmdW5jdGlvbihkb21uYW1lKXtcclxuXHR2YXIgcHJvTmFtZSA9IGRvbW5hbWUsXHJcblx0XHRkb20gPSAkKCcjJytkb21uYW1lKydCbG9jaycpO1xyXG5cdHRoaXMucHJvTmFtZSA9IGRvbW5hbWU7XHJcblx0dGhpcy5kb20gPSBkb207XHJcblx0dGhpcy5wYWdlID0gMDsgICAvL+W8gOWni+mhteeggVxyXG5cdHRoaXMuYWxsUGFnZSA9IDA7XHJcblx0dGhpcy5saW1pdCA9IDU7IC8v5LiA6aG155qE5p2h5pWwXHJcblx0dGhpcy5vcmRlciA9ICdjcmVhdGVUaW1lJzsvLzAg5oyJ5pe26Ze05o6S5bqPLDEg5oyJ5pu05paw5pe26Ze05o6S5bqPXHJcblx0dGhpcy5saXN0RG9tOyAvL+WIl+ihqOeahOS9jee9rlxyXG5cdHZhciBodG1sID0gdG1wbC5hcmVhKHtcclxuXHRcdHByb1RleHQgOiBwcm9NYXBbZG9tbmFtZV0sXHJcblx0XHRwcm9OYW1lIDogZG9tbmFtZVxyXG5cdH0pO1xyXG5cdGRvbS5odG1sKGh0bWwpO1xyXG5cdHRoaXMubGlzdERvbSA9ICQoJyMnK2RvbW5hbWUpO1xyXG5cdHRoaXMubnVtRG9tID0gJChcIiNcIitkb21uYW1lKydOdW0nKTtcclxuXHR0aGlzLnByZVBhZ2UgPSBkb20uZmluZCgnLnByZS1wYWdlJyk7XHJcblx0dGhpcy5uZXh0UGFnZSA9IGRvbS5maW5kKCcubmV4dC1wYWdlJyk7XHRcclxuXHR0aGlzLnRpbWVEb20gPSBkb20uZmluZCgnLnRpbWUnKTtcclxuXHR0aGlzLnVwZGF0ZURvbSA9IGRvbS5maW5kKCcudXBkYXRlJyk7XHJcblx0dGhpcy5hbGxOdW0gPSAwO1xyXG5cdHRoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cclxuXHR0aGlzLmdldERhdGUoe1xyXG5cdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdG9yZGVyYnkgOiB0aGlzLm9yZGVyXHJcblx0fSk7XHJcblxyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG59XHJcblxyXG4vL+S4i+S4gOmhtVxyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLm5leHQgPSBmdW5jdGlvbigpe1xyXG5cdGlmKHRoaXMucGFnZSA8IHRoaXMuYWxsUGFnZS0xKXtcclxuXHRcdHRoaXMucGFnZSsrO1xyXG5cdFx0dGhpcy5nZXREYXRlKHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdFx0fSk7XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5LiK5LiA6aG1XHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUucHJlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLnBhZ2UgPiAwKXtcclxuXHRcdHRoaXMucGFnZS0tO1xyXG5cdFx0dGhpcy5nZXREYXRlKHtcclxuXHRcdFx0c3RhcnQgOiB0aGlzLnBhZ2UqdGhpcy5saW1pdCxcclxuXHRcdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdFx0fSk7XHJcblx0fVxyXG59XHJcblxyXG4vL+aJk+W8gOaUtui1t1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNsb3NlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cdGlmKHRoaXMubGlzdERvbS5oYXNDbGFzcygnaGlkZScpKXtcclxuXHRcdHRoaXMubGlzdERvbS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG5cdFx0dGFyZ2V0LmF0dHIoJ2NsYXNzJywnYXJyb3ctZG93bicpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5saXN0RG9tLmFkZENsYXNzKCdoaWRlJyk7XHJcblx0XHR0YXJnZXQuYXR0cignY2xhc3MnLCdhcnJvdy11cCcpO1xyXG5cdH1cclxufVxyXG5cclxuLy/mjInlj5Hooajml7bpl7TmjpLluo9cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5vcmRlcmJ5dGltZSA9IGZ1bmN0aW9uKCl7XHJcblx0Ly8gb3JkZXJieTogdXBkYXRlVGltZSAvIGNyZWF0ZVRpbWVcclxuXHR0aGlzLm9yZGVyID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMudGltZURvbS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0dGhpcy51cGRhdGVEb20ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRoaXMuZ2V0RGF0ZSh7XHJcblx0XHRzdGFydCA6IHRoaXMucGFnZSp0aGlzLmxpbWl0LFxyXG5cdFx0bGltaXQgOiB0aGlzLmxpbWl0LFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJcclxuXHR9KTtcclxufVxyXG5cclxuLy/mjInmm7TmlrDml7bpl7TmjpLluo9cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5vcmRlcmJ5dXBkYXRlID0gZnVuY3Rpb24oKXtcclxuXHR0aGlzLm9yZGVyID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMudXBkYXRlRG9tLmFkZENsYXNzKCdhY3RpdmUnKTtcclxuXHR0aGlzLnRpbWVEb20ucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1x0XHJcblx0dGhpcy5nZXREYXRlKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5wYWdlKnRoaXMubGltaXQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlclxyXG5cdH0pO1x0XHJcbn1cclxuXHJcbi8v5paw5bu65Li76aKYXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKXtcclxuXHRpZighdGhpcy5jcmVhdGVTdWJqZWN0KXtcclxuXHRcdHRoaXMuY3JlYXRlU3ViamVjdCA9IHdpbmRvdy5zdHJpa2VyLmNyZWF0ZVN1YmplY3Q7XHJcblx0fVxyXG5cdGlmKCF0aGlzLmxhYmVsKXtcclxuXHRcdHRoaXMubGFiZWwgPSB3aW5kb3cuc3RyaWtlci5sYWJlbDtcclxuXHR9XHJcblx0dGhpcy5jcmVhdGVTdWJqZWN0LmNoYW5nZVR5cGUodGhpcy5wcm9OYW1lKTtcclxuXHQvL3RoaXMubGFiZWwuaW5pdCgpO1xyXG59XHJcblxyXG4vL+WIpOaWree/u+mhteaYr+WQpuWPr+S7peeCueWHu1xyXG5TdWJqZWN0LmFyZWEucHJvdG90eXBlLmNoZWNrUGFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0aWYodGhpcy5wYWdlIDw9IDEpe1xyXG5cdFx0dGhpcy5wcmVQYWdlLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0aWYodGhpcy5hbGxQYWdlID09PSAxKXtcclxuXHRcdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHR9ZWxzZXtcclxuXHRcdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDpmYWxzZX0pLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1x0XHJcblx0XHR9XHJcblx0XHRcclxuXHR9ZWxzZSBpZih0aGlzLnBhZ2UgPj0gdGhpcy5hbGxQYWdlLTEpe1xyXG5cdFx0dGhpcy5uZXh0UGFnZS5wcm9wKHtkaXNhYmxlZDp0cnVlfSkuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XHJcblx0XHRpZih0aGlzLmFsbFBhZ2UgPT09IDEpe1xyXG5cdFx0XHR0aGlzLnByZVBhZ2UucHJvcCh7ZGlzYWJsZWQ6dHJ1ZX0pLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdHRoaXMucHJlUGFnZS5wcm9wKHtkaXNhYmxlZDpmYWxzZX0pLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xyXG5cdFx0fVx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5L+u5pS55oC75pWwXHJcblN1YmplY3QuYXJlYS5wcm90b3R5cGUuY2hhbmdlTnVtID0gZnVuY3Rpb24obnVtKXtcclxuXHR0aGlzLmFsbFBhZ2UgPSBNYXRoLmNlaWwobnVtL3RoaXMubGltaXQpO1xyXG5cdHRoaXMuYWxsTnVtID0gbnVtO1xyXG5cdHRoaXMubnVtRG9tLnRleHQobnVtKTtcclxufVxyXG5cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5nZXREYXRlID0gZnVuY3Rpb24ocGFyYW0pe1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0dGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHR2YXIgZnVubmFtZSA9ICdzZWFyY2gnO1xyXG5cdGlmKHRoaXMucHJvTmFtZSA9PT0gJ215Rm9sbG93Jyl7XHJcblx0XHRmdW5uYW1lID0gJ2ZvbGxvd2luZyc7XHJcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ215SW52aXRlZCcpe1xyXG5cdFx0ZnVubmFtZSA9ICdpbnZpdGVkJztcclxuXHR9ZWxzZSBpZiAodGhpcy5wcm9OYW1lID09PSAnbXlBcmNoaXZlZCcpe1xyXG5cdFx0ZnVubmFtZSA9ICdhcmNoaXZlZCc7XHJcblx0fWVsc2UgaWYgKHRoaXMucHJvTmFtZSA9PT0gJ29wZW4nKXtcclxuXHRcdHBhcmFtLnByaXZhdGUgPSAxO1xyXG5cdH1lbHNlIGlmKHRoaXMucHJvTmFtZSA9PT0gJ215U3ViamVjdCcpe1xyXG5cdFx0ZnVubmFtZSA9ICdsaXN0JztcclxuXHR9XHJcblxyXG5cdGNnaVtmdW5uYW1lXShwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0X3RoaXMubG9hZGluZyA9IGZhbHNlO1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwubGlzdChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmxpc3REb20uaHRtbChodG1sKTtcclxuXHRcdFx0X3RoaXMuY2hhbmdlTnVtKHJlcy5kYXRhLnRvdGFsKTtcclxuXHRcdFx0X3RoaXMuY2hlY2tQYWdlKCk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8qXHJcbuiAg+iZkeWIsOmmlumhtee7k+aehOeahOeJueauiuaApyzov5nph4zliIblnZfnu5Hlrprkuovku7ZcclxuKi9cclxuU3ViamVjdC5hcmVhLnByb3RvdHlwZS5iaW5kQWN0aW9uID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdGlmKF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1x0XHJcblxyXG5cdHN0cmlrZXIuYmluZCgnc3ViamVjdENyZWF0ZWQnLGZ1bmN0aW9uKCl7XHJcblx0XHRpZignbXlTdWJqZWN0JyA9PT0gX3RoaXMucHJvTmFtZSl7XHJcblx0XHRcdF90aGlzLmFsbE51bSsrO1xyXG5cdFx0XHRfdGhpcy5jaGFuZ2VOdW0oX3RoaXMuYWxsTnVtKTtcclxuXHRcdH1cclxuXHR9KTtcclxufVxyXG5cclxuXHJcblN1YmplY3QuaW5pdCA9IGZ1bmN0aW9uKHR5cGUpe1xyXG5cdHN1YmplY3RMaXN0LmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcblx0c3ViamVjdEluZm8uaW5pdCh0eXBlLGNnaSx0bXBsKTtcclxuXHRzdWJqZWN0Q3JlYXRlLmluaXQodHlwZSxjZ2ksdG1wbCk7XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2pzL3N1YmplY3Qvc3ViamVjdC5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgNFxuICoqLyIsInZhciBjZ2kgPSByZXF1aXJlKCcuLi9jb21tb24vY2dpJykuYXJ0aWNsZTtcclxudmFyIHRtcGwgPSB7XHJcblx0bGlzdCA6IHJlcXVpcmUoJy4uLy4uL3RwbC9hcnRpY2xlL2xpc3QuZWpzJyksXHJcblx0dG9wIDogcmVxdWlyZSgnLi4vLi4vdHBsL2FydGljbGUvdG9wLmVqcycpLFxyXG5cdHJsaXN0IDogcmVxdWlyZSgnLi4vLi4vdHBsL3Jlc291cmNlL2xpc3QuZWpzJykgICAvL+i1hOa6kOWIl+ihqFxyXG59O1xyXG5cclxudmFyIGFydGljbGVMaXN0ID0gcmVxdWlyZSgnLi9saXN0JyksXHJcblx0YXJ0aWNsZVBvc3QgPSByZXF1aXJlKCcuL3Bvc3QnKTtcclxuXHJcbnZhciBBcnRpY2xlID0ge31cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gQXJ0aWNsZTtcclxuXHJcbkFydGljbGUubGlzdCA9IGFydGljbGVMaXN0LmFydGljbGU7XHJcblxyXG4vLyBBcnRpY2xlLmxvYWRNb3JlID0gYXJ0aWNsZUxpc3QubG9hZE1vcmU7XHJcblxyXG5BcnRpY2xlLmFwcGVuZFRvTGlzdCA9IGFydGljbGVMaXN0LnByZXBlbmRUb0xpc3Q7XHJcblxyXG4vL0FydGljbGUucG9zdCA9IGFydGljbGVQb3N0LmNyZWF0ZTtcclxuXHJcbi8vQXJ0aWNsZS5yZXNldCA9IGFydGljbGVQb3N0LnJlc2V0O1xyXG5cclxuLyoqL1xyXG5cclxuQXJ0aWNsZS5pbml0ID0gZnVuY3Rpb24oaWQpe1xyXG5cdGFydGljbGVMaXN0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG5cdGFydGljbGVQb3N0LmluaXQoaWQsY2dpLHRtcGwpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2FydGljbGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDRcbiAqKi8iLCJ2YXIgRGF0YSA9IHt9O1xyXG4vKlxyXG7mlbDmja7nvJPlrZhcclxudXNlciDnlKjmiLdcclxuc3ViamVjdCDkuLvpophcclxuYXJ0aWNsZSDluJblrZBcclxuKi9cclxuRGF0YS51c2VyID0ge307XHJcbkRhdGEuc3ViamVjdCA9IHt9O1xyXG5EYXRhLmFydGljbGUgPSB7fTtcclxuRGF0YS5sYWJlbCA9IHt9O1xyXG5cclxuZnVuY3Rpb24gZ2V0RGF0YSh0eXBlLGtleSl7XHJcblx0cmV0dXJuIERhdGFbdHlwZV1ba2V5XSB8fCBudWxsO1xyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IERhdGE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9kYXRhL2RhdGEuanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIi8v55So5oi35YiX6KGo5pi+56S6562J562JXHJcbnZhciB1TWFuYWdlID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLnVzZXI7XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRtYW5hZ2VIYXZlID0gZmFsc2U7XHJcbm1vZHVsZS5leHBvcnRzID0gdU1hbmFnZTtcclxuXHJcbnZhciBtYW5hZ2UgPSBmdW5jdGlvbih0YXJnZXQpe1xyXG5cdC8v57uZ5a6a5Yy65Z+fZG9t55qE5ZCN5a2XXHJcblx0dGhpcy5kb20gPSAkKFwiI1wiK3RhcmdldCk7XHJcblx0dGhpcy5tYW5hZ2VIYXZlID0gZmFsc2U7XHJcblx0Ly/nlKjmiLfliJfooahcclxuXHR0aGlzLmxpc3REb20gPSB0aGlzLmRvbS5maW5kKCcubWFuYWdlLWxpc3QnKTtcclxuXHR0aGlzLnNlbGVjdERvbSA9IHRoaXMuZG9tLmZpbmQoJy5ub3ctbWFuYWdlLWxpc3QnKTtcclxuXHQvL+aQnOe0ouahhlxyXG5cdHRoaXMua2V5RG9tO1xyXG5cclxuXHQvL+W9k+WJjeWFg+e0oFxyXG5cdHRoaXMuX3NlbGVjdERvbTtcclxuXHJcblx0Ly/pgInkuK3nmoTnrqHnkIblkZjliJfooahcclxuXHR0aGlzLmlkbWFwID0ge307XHJcblx0dGhpcy5pZG1hcFtkYXRhLm15SW5mby5pZF0gPSAxO1xyXG5cclxuXHQvL+aKiuiHquW3seaUvuWcqOeuoeeQhuWRmOWIl+ihqOmHjOmdolxyXG5cdHZhciBodG1sID0gdG1wbC5vbmVtYW5hZ2Uoe1xyXG5cdFx0aWQgOiBkYXRhLm15SW5mby5pZCxcclxuXHRcdG5hbWUgOiBkYXRhLm15SW5mby5uYW1lXHJcblx0fSk7XHJcblx0dGhpcy5zZWxlY3REb20uaHRtbChodG1sKTtcdFxyXG5cclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHRcclxuXHJcbn1cclxuXHJcbi8v5Yid5aeL5YyW5LiA5LiLLlxyXG5tYW5hZ2UucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpe1xyXG5cclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0Ly/lpoLmnpzov5jmsqHmnInloavliJfooagu5oqK5YiX6KGo5aGr5LiA5LiLLlxyXG5cdGlmKCF0aGlzLm1hbmFnZUhhdmUpe1xyXG5cdFx0dmFyIGh0bWwgPSB0bXBsLm1hbmFnZSh7XHJcblx0XHRcdGxpc3QgOiBkYXRhLmxpc3QsXHJcblx0XHRcdG15IDogZGF0YS5teUluZm9cclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5saXN0RG9tLmh0bWwoaHRtbCk7XHJcblx0XHR0aGlzLmtleURvbSA9IHRoaXMubGlzdERvbS5maW5kKCdpbnB1dFtuYW1lPW1hbmFnZWtleV0nKTtcclxuXHRcdHRoaXMua2V5dXBBY3Rpb24oKTtcclxuXHRcdC8vYmluZE1hbmFnZUFjdGlvbigpO1xyXG5cdH1cclxuXHRpZih0aGlzLl9zZWxlY3REb20uaGFzQ2xhc3MoJ2Z1aS1wbHVzJykpe1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLnJlbW92ZUNsYXNzKCdmdWktcGx1cycpLmFkZENsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5zaG93KCk7XHJcblx0fWVsc2V7XHJcblx0XHR0aGlzLl9zZWxlY3REb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdFx0dGhpcy5saXN0RG9tLmhpZGUoKTtcclxuXHR9XHRcclxufVxyXG5cclxuLy/mmL7npLrnrqHnkIblkZjliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5zaG93bWxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdC8v5aaC5p6c6L+Y5rKh5pyJ5aGr5YiX6KGoLuaKiuWIl+ihqOWhq+S4gOS4iy5cclxuXHRpZighdGhpcy5tYW5hZ2VIYXZlKXtcclxuXHRcdHZhciBodG1sID0gdG1wbC5tYW5hZ2Uoe1xyXG5cdFx0XHRsaXN0IDogZGF0YS5saXN0LFxyXG5cdFx0XHRteSA6IGRhdGEubXlJbmZvXHJcblx0XHR9KTtcclxuXHRcdHRoaXMubGlzdERvbS5odG1sKGh0bWwpO1xyXG5cdFx0dGhpcy5rZXlEb20gPSB0aGlzLmxpc3REb20uZmluZCgnaW5wdXRbbmFtZT1tYW5hZ2VrZXldJyk7XHJcblx0XHR0aGlzLmtleXVwQWN0aW9uKCk7XHJcblx0XHQvL2JpbmRNYW5hZ2VBY3Rpb24oKTtcclxuXHR9XHJcblx0aWYodGhpcy5fc2VsZWN0RG9tLmhhc0NsYXNzKCdmdWktcGx1cycpKXtcclxuXHRcdHRoaXMuX3NlbGVjdERvbS5yZW1vdmVDbGFzcygnZnVpLXBsdXMnKS5hZGRDbGFzcygnZnVpLWNyb3NzJyk7XHJcblx0XHR0aGlzLmxpc3REb20uc2hvdygpO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5fc2VsZWN0RG9tLmFkZENsYXNzKCdmdWktcGx1cycpLnJlbW92ZUNsYXNzKCdmdWktY3Jvc3MnKTtcclxuXHRcdHRoaXMubGlzdERvbS5oaWRlKCk7XHJcblx0fVx0XHJcbn1cclxuXHJcbi8v5aKe5Yqg566h55CG5ZGYXHJcbm1hbmFnZS5wcm90b3R5cGUuYWRkRGVmTWFuYWdlID0gZnVuY3Rpb24oKXtcclxuXHRcclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5nZXRNYW5hZ2VMaXN0ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSBpbiB0aGlzLmlkbWFwKXtcclxuXHRcdGlmKGkpe1xyXG5cdFx0XHRsaXN0LnB1c2goaSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gbGlzdDtcclxufVxyXG5cclxuLy/muIXnqbrliJfooahcclxubWFuYWdlLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5pZG1hcCA9IHt9O1xyXG5cdHRoaXMuaWRtYXBbZGF0YS5teUluZm8uaWRdID0gMTtcclxuXHJcblx0dmFyIGh0bWwgPSB0bXBsLm9uZW1hbmFnZSh7XHJcblx0XHRpZCA6IGRhdGEubXlJbmZvLmlkLFxyXG5cdFx0bmFtZSA6IGRhdGEubXlJbmZvLm5hbWVcclxuXHR9KTtcclxuXHR0aGlzLnNlbGVjdERvbS5odG1sKGh0bWwpO1x0XHJcblxyXG5cdHZhciBkb20gPSB0aGlzLmRvbS5maW5kKCcuc2hvdy1idG4nKTtcclxuXHRkb20uYWRkQ2xhc3MoJ2Z1aS1wbHVzJykucmVtb3ZlQ2xhc3MoJ2Z1aS1jcm9zcycpO1xyXG5cdHRoaXMubGlzdERvbS5oaWRlKCk7XHRcclxufVxyXG5cclxuLy/pgInkuK3kuIDkuKrnlKjmiLdcclxubWFuYWdlLnByb3RvdHlwZS5zZWxlY3RvbmUgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gdGhpcy50YXJnZXQsXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpLFxyXG5cdFx0bmFtZSA9IHRhcmdldC5kYXRhKCduYW1lJyk7XHJcblxyXG5cdGlmKGlkICYmIGlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bmFtZSA6IG5hbWVcclxuXHRcdH0pO1xyXG5cdFx0dGhpcy5pZG1hcFtpZF0gPSAxO1xyXG5cdFx0dGhpcy5zZWxlY3REb20uYXBwZW5kKGh0bWwpO1x0XHRcdFxyXG5cdH1cclxufVxyXG5cclxubWFuYWdlLnByb3RvdHlwZS5hZGRvbmUgPSBmdW5jdGlvbihkKXtcclxuXHRpZihkLmlkICE9PSBkYXRhLm15SW5mby5pZCl7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwub25lbWFuYWdlKHtcclxuXHRcdFx0aWQgOiBkLmlkLFxyXG5cdFx0XHRuYW1lIDogZC5uYW1lXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmlkbWFwW2QuaWRdID0gMTtcclxuXHRcdHRoaXMuc2VsZWN0RG9tLmFwcGVuZChodG1sKTtcdFx0XHRcclxuXHR9XHJcbn1cclxuXHJcbi8v5pCc57Si5oyJ6ZKuXHJcbm1hbmFnZS5wcm90b3R5cGUuc2VhcmNoYnRuID0gZnVuY3Rpb24oKXtcclxuXHR2YXIga2V5ID0gdGhpcy5rZXlEb20udmFsKCk7XHJcblx0dmFyIGxpc3QgPSBkYXRhLmxpc3Q7XHJcblx0dmFyIHVsaXN0ID0gW107XHJcblxyXG5cdGlmKGtleSA9PT0gJycpe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuc2hvdygpO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHJcblx0Zm9yKHZhciBpID0gMCxsID0gbGlzdC5sZW5ndGg7aTxsO2krKyl7XHJcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XHJcblx0XHRpZihpdGVtLm5hbWUuaW5kZXhPZihrZXkpPj0wKXtcclxuXHRcdFx0dWxpc3QucHVzaChpdGVtLmlkKTtcclxuXHRcdH1cclxuXHR9XHJcblx0dGhpcy5saXN0RG9tLmZpbmQoJ2xpJykuaGlkZSgpO1xyXG5cdGlmKHVsaXN0Lmxlbmd0aD09PSAwKXtcclxuXHRcdHJldHVybjtcclxuXHR9XHJcblx0Zm9yKHZhciBpID0gMCxsID0gdWxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dGhpcy5saXN0RG9tLmZpbmQoXCIudXNlclwiK3VsaXN0W2ldKS5zaG93KCk7XHJcblx0fVxyXG59XHJcblxyXG4vL+WIoOmZpOS4gOS4qumAieS4reeahOeuoeeQhuWRmFxyXG5tYW5hZ2UucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSB0aGlzLnRhcmdldCxcclxuXHRcdHAgPSB0YXJnZXQucGFyZW50KCcudGFnJyksXHJcblx0XHRpZCA9IHAuZGF0YSgnaWQnKTtcclxuXHRpZihpZCAmJiBpZCAhPT0gZGF0YS5teUluZm8uaWQpe1xyXG5cdFx0ZGVsZXRlIHRoaXMuaWRtYXBbaWRdO1xyXG5cdFx0cC5yZW1vdmUoKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5LqL5Lu257uR5a6aXHJcbm1hbmFnZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblxyXG5cdFx0aWYoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pe1xyXG5cdFx0XHRfdGhpcy50YXJnZXQgPSB0YXJnZXQ7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbi8v6L6T5YWl5qGG55qEa2V5dXDnu5HlrppcclxubWFuYWdlLnByb3RvdHlwZS5rZXl1cEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHR0aGlzLmtleURvbS5iaW5kKCdrZXl1cCcsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdrZXl1cCcpO1xyXG5cclxuXHRcdGlmKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXMudGFyZ2V0ID0gdGFyZ2V0O1xyXG5cdFx0XHRfdGhpc1thY3Rpb25dKGUpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG59XHJcblxyXG51TWFuYWdlLm1hbmFnZSA9IG1hbmFnZTtcclxudU1hbmFnZS5pbml0ID0gZnVuY3Rpb24obW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcblxyXG5cdC8vYmluZEFjdGlvbigpO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy91c2VyL21hbmFnZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwiZnVuY3Rpb24gZW1wdHlGdW4ocmVzKXtcclxuXHRjb25zb2xlLmxvZyhyZXMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBjaGVja1VybCh1cmwpe1xyXG5cdGlmKHVybC5pbmRleE9mKCc/Jyk+PTApe1xyXG5cdFx0cmV0dXJuIHVybCArPScmX3Q9JytuZXcgRGF0ZSgpLmdldFRpbWUoKTtcclxuXHR9ZWxzZXtcclxuXHRcdHJldHVybiB1cmwgKz0nP190PScrbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBwb3N0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogdXJsLFxyXG5cdFx0dHlwZSA6ICdQT1NUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxuXHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gZ2V0KHVybCxwYXJhbSxjYWxsYmFjayxlcnJvcil7XHJcblx0aWYodHlwZW9mIGNhbGxiYWNrICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGNhbGxiYWNrID0gZW1wdHlGdW47XHJcblx0fVx0XHJcblx0aWYodHlwZW9mIGVycm9yICE9PSAnZnVuY3Rpb24nKXtcclxuXHRcdGVycm9yID0gY2FsbGJhY2s7XHJcblx0fVxyXG5cdGFqYXgoe1xyXG5cdFx0dXJsIDogY2hlY2tVcmwodXJsKSxcclxuXHRcdHR5cGUgOiAnR0VUJyxcclxuXHRcdGRhdGEgOiBwYXJhbSxcclxuXHR9LGNhbGxiYWNrKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWpheChvcHQsY2FsbGJhY2ssZXJyb3Ipe1xyXG5cdHZhciB0eXBlID0gb3B0LnR5cGUgfHwgJ0dFVCcsXHJcblx0XHR1cmwgPSBvcHQudXJsLFxyXG5cdFx0ZGF0YSA9IG9wdC5kYXRhO1xyXG5cclxuXHRpZih0eXBlb2YgZXJyb3IgIT09ICdmdW5jdGlvbicpe1xyXG5cdFx0ZXJyb3IgPSBjYWxsYmFjaztcclxuXHR9XHJcblxyXG5cdCQuYWpheCh7XHJcblx0XHR0eXBlIDogdHlwZSxcclxuXHRcdHVybCA6IGNoZWNrVXJsKHVybCksXHJcblx0XHRkYXRhIDogZGF0YSxcclxuXHRcdHN1Y2Nlc3MgOiBmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRjYWxsYmFjayhyZXMpO1xyXG5cdFx0fSxcclxuXHRcdGVycm9yIDogZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0ZXJyb3IocmVzKTtcclxuXHRcdH1cclxuXHR9KVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuXHRhamF4IDogYWpheCxcclxuXHRwb3N0IDogcG9zdCxcclxuXHRnZXQgOiBnZXRcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvY29tbW9uL3JlcXVlc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxIDIgMyA0XG4gKiovIiwiLy/kuLvpopjliJfooahcclxudmFyIGFMaXN0ID0ge30sXHJcblx0ZGF0YSA9IHJlcXVpcmUoJy4uL2RhdGEvZGF0YScpLFxyXG5cdGNnaSxcclxuXHR0bXBsLFxyXG5cdG5vd1N1YklkID0gMCxcclxuXHRsb2FkaW5nID0gZmFsc2U7XHJcblx0c3RhcnQgPSAwLFxyXG5cdGxpbWl0ID0gMjA7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGFMaXN0O1xyXG52YXIgbGlzdERvbSA9ICQoXCIjYXJ0aWNsZUxpc3RcIik7XHJcbnZhciBzdHJpa2VyID0gJCh3aW5kb3cuc3RyaWtlcik7XHJcblxyXG5hTGlzdC5pbml0ID0gZnVuY3Rpb24oaWQsbW9kdWxlLHRtcCl7XHJcblx0bm93U3ViSWQgPSBpZDtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxuXHJcblx0Y29uc29sZS5sb2coY2dpKTtcclxuXHJcblx0Ly9yZXR1cm4gbmV3IGFydGljbGUoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gYXJ0aWNsZSgpe1xyXG5cdHRoaXMuZG9tID0gJChcIiNhcnRpY2xlTGlzdFwiKTtcclxuXHR0aGlzLnN0YXJ0ID0gMCxcclxuXHR0aGlzLmxpbWl0ID0gMjA7XHJcblx0dGhpcy50b3RhbCA9IDA7XHJcblx0dGhpcy5sZW5ndGggPSAwO1xyXG5cdHRoaXMuZW5kID0gZmFsc2U7XHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5vcmRlcmJ5ID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMubGFzdHRpbWUgPSAwO1xyXG5cdHRoaXMudG1wbGFzdHRpbWUgPSAwO1xyXG5cdHRoaXMubmV3bGlzdCA9IFtdO1xyXG5cdHRoaXMubmV3RG9tO1xyXG5cclxuXHR0aGlzLnJlZnRpbWUgPSAwO1xyXG5cclxuXHR0aGlzLnN1YmlkID0gbm93U3ViSWQ7XHJcblx0dGhpcy5tc2cgPSB3aW5kb3cuc3RyaWtlci5tc2c7XHJcblxyXG5cdHRoaXMucmRhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5iaW5kQWN0aW9uKCk7XHJcblx0dGhpcy5zZWFyY2goKTtcclxufVxyXG5cclxuLy/miorlm57lpI3nm7jlhbPnmoTkuJzkuJznu5Hlrprov5vmnaVcclxuYXJ0aWNsZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9iail7XHJcblx0dGhpcy5jb21tZW50UG9zdCA9IG9iai5wb3N0O1xyXG59XHJcblxyXG4vL+iuoeeul+WbvueJh+eahOS4quaVsFxyXG5hcnRpY2xlLnByb3RvdHlwZS5nZXRpbWcgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbnVtID0gMDtcclxuXHRpZihkYXRhKXtcclxuXHRcdGZvcih2YXIgaSA9MCxsPWRhdGEubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0XHR2YXIgaXRlbSA9IGRhdGFbaV07XHJcblx0XHRcdGlmKGl0ZW0udHlwZSA9PT0gMSl7XHJcblx0XHRcdFx0bnVtKys7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIG51bTtcclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuYWRkbmV3QXJ0aWNsZSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGRhdGEgPSB0aGlzLmNoZWNrRGF0YSh7XHJcblx0XHRsaXN0IDogdGhpcy5uZXdsaXN0XHJcblx0fSk7XHJcblx0dmFyIGh0bWwgPSB0bXBsLmxpc3QoZGF0YSk7XHRcclxuXHR0aGlzLmRvbS5wcmVwZW5kKGh0bWwpO1xyXG5cdHRoaXMubmV3bGlzdCA9IFtdO1xyXG5cdHRoaXMubGFzdHRpbWUgPSB0aGlzLnRtcGxhc3R0aW1lO1xyXG59XHJcblxyXG5hcnRpY2xlLnByb3RvdHlwZS5oYXZlTmV3ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKCF0aGlzLm5ld0RvbSl7XHJcblx0XHRcclxuXHRcdCQoJy5hcnRpY2UtaW5mbycpLnByZXBlbmQoJzxkaXYgY2xhc3M9XCJoYXZlLW5ld1wiPuacieaWsOeahOW4luWtkDwvZGl2PicpO1xyXG5cdFx0dGhpcy5uZXdEb20gPSAkKFwiLmhhdmUtbmV3XCIpO1xyXG5cdFx0dGhpcy5uZXdEb20uYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcblx0XHRcdF90aGlzLm5ld0RvbS5oaWRlKCk7XHJcblx0XHRcdF90aGlzLmFkZG5ld0FydGljbGUoKTtcclxuXHRcclxuXHRcdH0pO1xyXG5cdH1lbHNle1xyXG5cdFx0dGhpcy5uZXdEb20uc2hvdygpO1xyXG5cdH1cclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuZ2V0UmVmID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdC8vdGhpcy5sYXN0dGltZSA9IDE0MzI0NjE5MjcwMDA7XHJcblx0dmFyIHBhcmFtID0ge1xyXG5cdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZCxcclxuXHRcdHRpbWUgOiBuZXcgRGF0ZSh0aGlzLmxhc3R0aW1lKS5wYXR0ZXJuKCd5eXl5LU1NLWRkIEhIOm1tOnNzJylcclxuXHR9XHJcblx0Y2dpLnJlZihwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRpZihyZXMuZGF0YS5saXN0Lmxlbmd0aCA+IDApe1xyXG5cdFx0XHRcdF90aGlzLm5ld2xpc3QgPSByZXMuZGF0YS5saXN0O1xyXG5cdFx0XHRcdF90aGlzLnRtcGxhc3R0aW1lID0gcmVzLmRhdGEubGFzdFRpbWU7XHJcblx0XHRcdFx0X3RoaXMuaGF2ZU5ldygpO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLnN0YXJ0UmVmID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdF90aGlzLnJlZnRpbWUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0X3RoaXMuZ2V0UmVmKCk7XHJcblx0fSwxMDAwMCk7XHRcclxufVxyXG5cclxuLy/nu5Hlrprkuovku7ZcclxuYXJ0aWNsZS5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHRzdHJpa2VyLmJpbmQoJ25ld2FydGljbGUnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHRfdGhpcy5wcmVwZW5kVG9MaXN0KGQpO1xyXG5cdH0pXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZTpvcmRlcmJ5dXBkYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMub3JkZXJCeVVwZGF0ZSgpO1xyXG5cdH0pXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnYXJ0aWNsZTpvcmRlcmJ5Y3JlYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMub3JkZXJCeUNyZWF0ZSgpO1xyXG5cdH0pXHJcblxyXG5cdHN0cmlrZXIuYmluZCgnYXV0b3JlZnJlc2gnLGZ1bmN0aW9uKGUsZCl7XHJcblx0XHQvL+iHquWKqOWIt+aWsFxyXG5cdFx0aWYoZCl7XHJcblx0XHRcdF90aGlzLnJlZnRpbWUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpe1xyXG5cdFx0XHRcdF90aGlzLnN0YXJ0UmVmKCk7XHJcblx0XHRcdH0sMTAwMDApO1xyXG5cdFx0fWVsc2V7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwoX3RoaXMucmVmdGltZSk7XHJcblx0XHR9XHJcblx0fSlcdFxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdzY3JvbGwnLGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBzY3JvbGxEb20gPSBkb2N1bWVudC5ib2R5O1xyXG4gICAgICAgIHZhciBwYWdlSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodDtcclxuICAgICAgICB2YXIgc2Nyb2xsVG9wID0gc2Nyb2xsRG9tLnNjcm9sbFRvcDtcclxuICAgICAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gc2Nyb2xsRG9tLnNjcm9sbEhlaWdodDtcclxuXHJcbiAgICAgICAgLy/liKTmlq3mmK/lkKbliLDlupXkuoZcclxuICAgICAgICBpZihzY3JvbGxUb3AgKyBwYWdlSGVpZ2h0ID49IHNjcm9sbEhlaWdodCl7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2coJ2VuZCcpO1xyXG4gICAgICAgICAgICBfdGhpcy5sb2FkTW9yZSgpO1xyXG4gICAgICAgIH0gICAgICAgICAgICAgICAgXHJcbiAgICB9KTtcdFxyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KSAgICBcclxufVxyXG5cclxuLy/mjInmm7TmlrDml7bpl7TmjpLluo9cclxuYXJ0aWNsZS5wcm90b3R5cGUub3JkZXJCeVVwZGF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5vcmRlcmJ5ID0gJ3VwZGF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlcmJ5XHJcblx0fSk7XHJcbn1cclxuLy/mjInlj5Hooajml7bpl7TmjpLluo9cclxuYXJ0aWNsZS5wcm90b3R5cGUub3JkZXJCeUNyZWF0ZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5zdGFydCA9IDA7XHJcblx0dGhpcy5vcmRlcmJ5ID0gJ2NyZWF0ZVRpbWUnO1xyXG5cdHRoaXMuZG9tLmh0bWwoJycpO1xyXG5cdHRoaXMuc2VhcmNoKHtcclxuXHRcdHN0YXJ0IDogdGhpcy5zdGFydCxcclxuXHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdHN1YmplY3RJZCA6IHRoaXMuc3ViaWQsXHJcblx0XHRvcmRlcmJ5IDogdGhpcy5vcmRlcmJ5XHJcblx0fSk7XHRcclxufVxyXG5cclxuXHJcbi8v5Yqg6L295pu05aSaXHJcbmFydGljbGUucHJvdG90eXBlLmxvYWRNb3JlID0gZnVuY3Rpb24oKXtcclxuXHRpZih0aGlzLmxvYWRpbmcgfHwgdGhpcy5lbmQpe1xyXG5cdFx0cmV0dXJuO1xyXG5cdH1cclxuXHR0aGlzLnNlYXJjaCh7XHJcblx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRsaW1pdCA6IHRoaXMubGltaXQsXHJcblx0XHRzdWJqZWN0SWQgOiB0aGlzLnN1YmlkLFxyXG5cdFx0b3JkZXJieSA6IHRoaXMub3JkZXJieVxyXG5cdH0pO1xyXG59XHJcblxyXG4vL+mqjOivgeaVsOaNrlxyXG5hcnRpY2xlLnByb3RvdHlwZS5jaGVja0RhdGEgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbGlzdCA9IFtdO1xyXG5cdGZvcih2YXIgaSA9IDAsbD1kYXRhLmxpc3QubGVuZ3RoO2k8bDtpKyspe1xyXG5cdFx0dmFyIGl0ZW0gPSBkYXRhLmxpc3RbaV07XHJcblx0XHRpZihpdGVtLnJlc291cmNlKXtcclxuXHRcdGl0ZW0uaW1nbnVtID0gdGhpcy5nZXRpbWcoaXRlbS5yZXNvdXJjZSk7XHJcblx0XHRcdHRoaXMucmRhdGFbaXRlbS5pZF0gPSBpdGVtLnJlc291cmNlO1xyXG5cdFx0fVxyXG5cdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdH1cclxuXHRkYXRhLmxpc3QgPSBsaXN0O1xyXG5cdGRhdGEuc2lkID0gbm93U3ViSWQ7XHJcblx0cmV0dXJuIGRhdGE7XHJcbn1cclxuXHJcbi8v5ouJ5biW5a2Q5YiX6KGoXHJcbmFydGljbGUucHJvdG90eXBlLnNlYXJjaCA9IGZ1bmN0aW9uKHBhcmFtKXtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cdGlmKHRoaXMubG9hZGluZyl7XHJcblx0XHRyZXR1cm47XHJcblx0fVxyXG5cdHRoaXMubG9hZGluZyA9IHRydWU7XHJcblx0aWYoIXBhcmFtKXtcclxuXHRcdHBhcmFtID0ge1xyXG5cdFx0XHRzdGFydCA6IHRoaXMuc3RhcnQsXHJcblx0XHRcdGxpbWl0IDogdGhpcy5saW1pdCxcclxuXHRcdFx0c3ViamVjdElkIDogdGhpcy5zdWJpZCxcclxuXHRcdFx0b3JkZXJieSA6IHRoaXMub3JkZXJieVxyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Y2dpLnNlYXJjaChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHJcblx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdGlmKCFfdGhpcy5zdGFydCl7XHJcblx0XHRcdFx0X3RoaXMubGFzdHRpbWUgPSByZXMuZGF0YS5sYXN0VGltZTtcclxuXHRcdFx0XHRfdGhpcy5zdGFydFJlZigpO1xyXG5cdFx0XHR9XHJcblx0XHRcdF90aGlzLnRvdGFsID0gcmVzLmRhdGEudG90YWw7XHJcblx0XHRcdF90aGlzLmxlbmd0aCArPSByZXMuZGF0YS5saXN0Lmxlbmd0aDtcclxuXHRcdFx0X3RoaXMuc3RhcnQgKz0gX3RoaXMubGltaXQ7XHJcblx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHJcblx0XHRcdHZhciBkYXRhID0gX3RoaXMuY2hlY2tEYXRhKHJlcy5kYXRhKTtcclxuXHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3QoZGF0YSk7XHJcblxyXG5cdFx0XHRpZihyZXMuZGF0YS50b3AubGVuZ3RoKXtcclxuXHRcdFx0XHR2YXIgaHRtbDEgPSB0bXBsLnRvcCh7XHJcblx0XHRcdFx0XHRsaXN0IDogcmVzLmRhdGEudG9wXHJcblx0XHRcdFx0fSlcclxuXHRcdFx0XHQkKFwiI2FydGljbGVUb3BcIikuaHRtbChodG1sMSk7XHJcblx0XHRcdH1cclxuXHRcdFx0X3RoaXMuZG9tLmFwcGVuZChodG1sKTtcclxuXHRcdFx0aWYoX3RoaXMubGVuZ3RoID49IF90aGlzLnRvdGFsKXtcclxuXHRcdFx0XHRfdGhpcy5lbmQgPSB0cnVlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHRcclxufVxyXG5cclxuYXJ0aWNsZS5wcm90b3R5cGUuc2V0dXAgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyksXHJcblx0XHRzdGFyID0gcGFyc2VJbnQodGhpcy50YXJnZXQuZGF0YSgnc3RhdHVzJykpO1xyXG5cclxuXHRpZighc3Rhcil7XHJcblx0XHRzdGFyID0gMDtcclxuXHR9XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWQsXHJcblx0XHRcdGlzU3RhciA6IHN0YXIgPyAwIDoxXHJcblx0XHR9O1xyXG5cdFx0dmFyIHRleHQgPSBzdGFyPyfotZ4nOiflt7LotZ4nO1xyXG5cdFx0Y2dpLnN0YXIocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdGRvbS5kYXRhKCdzdGF0dXMnLHBhcmFtLmlzU3Rhcik7XHJcblx0XHRcdFx0ZG9tLmh0bWwoJzxzcGFuPjwvc3Bhbj4nK3RleHQpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLmNvbGxlY3QgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMudGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHZhciBkb20gPSB0aGlzLnRhcmdldDtcclxuXHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0YXJ0aWNsZUlkIDogaWRcclxuXHRcdH07XHJcblx0XHRjZ2kuY29sbGVjdChwYXJhbSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0XHRpZihyZXMuY29kZSA9PT0gMCl7XHJcblx0XHRcdFx0ZG9tLmF0dHIoJ2RhdGEtaWQnLDApO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlWydkZWxldGUnXSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cclxuXHRcdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLm1zZy5jb25maXJtKCfnoa7lrpropoHliKDpmaTor6XluJblrZA/JyxudWxsLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHRhcnRpY2xlSWQgOiBpZFxyXG5cdFx0XHR9O1xyXG5cdFx0XHRjZ2lbJ2RlbGV0ZSddKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0JChcIi5hcnRpY2xlXCIraWQpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn1cclxuXHJcbmFydGljbGUucHJvdG90eXBlLnJlcGxheSA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGlkID0gdGhpcy50YXJnZXQuZGF0YSgnaWQnKTtcclxuXHRpZihpZCl7XHJcblx0XHR0aGlzLmNvbW1lbnRQb3N0LnNob3dQb3N0KGlkKTtcclxuXHR9XHJcbn1cclxuXHJcbi8v5oqK5paw5Y+R5biD55qE5biW5a2Q5Yqg5Yiw5YiX6KGo5pyA5YmN6Z2iXHJcbmFydGljbGUucHJvdG90eXBlLnByZXBlbmRUb0xpc3QgPSBmdW5jdGlvbihwYXJhbSl7XHJcblx0dmFyIGRhdGEgPSB0aGlzLmNoZWNrRGF0YSh7bGlzdDpbcGFyYW1dfSk7XHJcblx0dmFyIGh0bWwgPSB0bXBsLmxpc3QoZGF0YSk7XHJcblxyXG5cdHRoaXMuZG9tLnByZXBlbmQoaHRtbCk7XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmFydGljbGUucHJvdG90eXBlLnJldmlldyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBpZCA9IHRhcmdldC5kYXRhKCdwaWQnKSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcigncmV2aWV3Jyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLnJkYXRhW3BpZF1cclxuXHRcdH0pXHJcblx0fVxyXG59O1xyXG5cclxuYUxpc3QuYXJ0aWNsZSA9IGFydGljbGU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9hcnRpY2xlL2xpc3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDRcbiAqKi8iLCIvL+S4u+mimOWIl+ihqFxyXG52YXIgc0xpc3QgPSB7fSxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykuc3ViamVjdCxcclxuXHRjZ2ksXHJcblx0dG1wbCxcclxuXHRzdGFydCA9IDAsXHJcblx0bGltaXQgPSAyMDtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gc0xpc3Q7XHJcblxyXG5zTGlzdC5pbml0ID0gZnVuY3Rpb24odHlwZSxtb2R1bGUsdG1wKXtcclxuXHRjZ2kgPSBtb2R1bGU7XHJcblx0dG1wbCA9IHRtcDtcclxufVxyXG5cclxuc0xpc3Quc2VhcmNoID0gZnVuY3Rpb24ocGFyYW0sY2Ipe1xyXG5cdGNnaS5zZWFyY2goe1xyXG5cdFx0c3RhcnQgOiBzdGFydCxcclxuXHRcdGxpbWl0IDogbGltaXRcclxuXHR9LGNiKTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvc3ViamVjdC9saXN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiA0XG4gKiovIiwiLy/mi4nkuLvpopjlhoXlrrlcclxudmFyIHNJbmZvID0ge307XHJcbnZhciBjZ2ksXHJcblx0dG1wbCxcclxuXHRkYXRhID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJyk7XHJcbm1vZHVsZS5leHBvcnRzID0gc0luZm87XHJcblxyXG52YXIgc3RyaWtlciA9ICQod2luZG93LnN0cmlrZXIpO1xyXG5cclxudmFyIHN1YkRvbSA9ICQoXCIjc3ViamVjdEhlYWRcIik7XHJcbnZhciBzdWJBc2lkZURvbSA9ICQoXCIjc3ViamVjdEFzaWRlXCIpO1xyXG52YXIgcG9zdEFyZWEgPSAkKFwiI3Bvc3RBcnRpY2xlXCIpO1xyXG5cclxuc0luZm8uaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcbn1cclxuXHJcbi8v5ouJ5Y+W5LiA5Liq5Li76aKY55qE5YaF5a65XHJcbi8vIHNJbmZvLmluZm8gPSBmdW5jdGlvbihpZCxjYil7XHJcbi8vIFx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xyXG4vLyBcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG4vLyBcdFx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChyZXMuZGF0YSk7XHJcbi8vIFx0XHRcdHN1YkRvbS5odG1sKGh0bWwpO1xyXG4vLyBcdFx0fVxyXG4vLyBcdH0pXHJcbi8vIH1cclxuXHJcbnZhciBpbmZvID0gZnVuY3Rpb24oaWQpe1xyXG5cdHRoaXMuc2lkID0gaWQ7XHJcblx0dGhpcy5kb20gPSBzdWJEb207XHJcblx0dGhpcy5hc2lkZURvbSA9IHN1YkFzaWRlRG9tO1xyXG5cdHRoaXMuZ2V0RGF0YSgpO1xyXG5cdHRoaXMuYmluZEFjdGlvbigpO1xyXG5cdHRoaXMuZm9sbG93QnRuOyAvL+WFs+azqOaMiemSrlxyXG5cdHRoaXMubWFuYWdlQnRuOyAvL+euoeeQhuaMiemSrlxyXG5cdHRoaXMudGltZUJ0bjsgICAvL+aMieaXtumXtOaOkuW6j1xyXG5cdHRoaXMudXBkYXRlQnRuOyAvL+aMieabtOaWsOaXtumXtOaOkuW6j1xyXG5cclxuXHR0aGlzLmRhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cdHRoaXMubXNnID0gd2luZG93LnN0cmlrZXIubXNnO1xyXG59XHJcblxyXG5zSW5mby5pbmZvID0gaW5mbztcclxuXHJcbi8v5Yig6Zmk5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLmRlbGV0ZVJlc291cmNlID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIGlkID0gdGhpcy5fc2VsZWN0RG9tLmRhdGEoJ2lkJyk7XHJcblx0aWYoaWQpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0XHR0aGlzLm1zZy5jb25maXJtKCfnoa7lrpropoHliKDpmaTor6XotYTmupA/JyxudWxsLGZ1bmN0aW9uKCl7XHJcblx0XHRcdHZhciBwYXJhbSA9IHtcclxuXHRcdFx0XHRzdWJqZWN0SWQgOiBfdGhpcy5zaWQsXHJcblx0XHRcdFx0cmVzb3VyY2VJZCA6IGlkXHJcblx0XHRcdH1cclxuXHRcdFx0Y2dpLmRlbHJlc291cmNlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0JChcIi5zdWItcmVzb3VyY2UtXCIraWQpLnJlbW92ZSgpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHR9XHJcbn07XHJcblxyXG4vL+aKiuWFtuS7lueahOWvueixoeeahOW8leeUqOS8oOi/m+adpS5cclxuaW5mby5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKG9iail7XHJcblx0dGhpcy5wb3N0ID0gb2JqLnBvc3Q7XHJcbn1cclxuXHJcbmluZm8ucHJvdG90eXBlLm1hbmFnZSA9IGZ1bmN0aW9uKCl7XHJcblx0dGhpcy5wb3N0LmVkaXQodGhpcy5kYXRhKTtcclxufVxyXG5cclxuLy/pooTop4jkuLvpopjnm7jlhbPotYTmupBcclxuaW5mby5wcm90b3R5cGUucmV2aWV3ID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0aWQgPSB0YXJnZXQuZGF0YSgnaWQnKTtcclxuXHJcblx0aWYoaWQpe1xyXG5cdFx0c3RyaWtlci50cmlnZ2VyKCdyZXZpZXcnLHtcclxuXHRcdFx0aWQgOiBpZCxcclxuXHRcdFx0bGlzdCA6IHRoaXMuZGF0YS5yZXNvdXJjZUxpc3RcclxuXHRcdH0pXHJcblx0fVxyXG59O1xyXG5cclxuaW5mby5wcm90b3R5cGUuYXV0b3JlZiA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KTtcclxuXHQvL2NvbnNvbGUubG9nKHRhcmdldC5wcm9wKCdjaGVja2VkJykpO1xyXG5cdHN0cmlrZXIudHJpZ2dlcignYXV0b3JlZnJlc2gnLHRhcmdldC5wcm9wKCdjaGVja2VkJykpXHJcbn1cclxuXHJcbi8v6KeG6aKR6aKE6KeIXHJcbmluZm8ucHJvdG90eXBlLnNob3dWaWRlbyA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdGlkID0gdGFyZ2V0LmRhdGEoJ2lkJyk7XHJcblxyXG5cdGlmKGlkKXtcclxuXHRcdHN0cmlrZXIudHJpZ2dlcignc2hvd1ZpZGVvJyx7XHJcblx0XHRcdGlkIDogaWQsXHJcblx0XHRcdGxpc3QgOiB0aGlzLmRhdGEucmVzb3VyY2VMaXN0XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUubGluayA9IGZ1bmN0aW9uKGUpe1xyXG5cdCQoXCIjbGlua0lmcmFtZVwiKS5hdHRyKCdzcmMnLHRoaXMuZGF0YS5saW5rKTtcclxuXHQkKFwiI3Nob3dMaW5rXCIpLnNob3coKTtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUuY2xvc2VsaW5rID0gZnVuY3Rpb24oZSl7XHJcblx0JChcIiNsaW5rSWZyYW1lXCIpLmF0dHIoJ3NyYycsJ2JsYW5rJyk7XHJcblx0JChcIiNzaG93TGlua1wiKS5oaWRlKCk7XHJcbn1cclxuXHJcbi8v6aKE6KeI5Li76aKY55u45YWz6LWE5rqQXHJcbmluZm8ucHJvdG90eXBlLm1hcmsgPSBmdW5jdGlvbihlKXtcclxuXHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRpZCA9IHRhcmdldC5kYXRhKCdpZCcpO1xyXG5cclxuXHRpZihpZCl7XHJcblx0XHRzdHJpa2VyLnRyaWdnZXIoJ21hcmsnLHtcclxuXHRcdFx0aWQgOiBpZFxyXG5cdFx0fSlcclxuXHR9XHJcbn07XHJcblxyXG5pbmZvLnByb3RvdHlwZS5hcnRpY2xlb3JkZXJieXVwZGF0ZSA9IGZ1bmN0aW9uKGUpe1xyXG5cdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdHBkb20gPSB0YXJnZXQucGFyZW50KCcuYnRuLWdyb3VwJyk7XHJcblx0cGRvbS5maW5kKCdhJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblx0c3RyaWtlci50cmlnZ2VyKCdhcnRpY2xlOm9yZGVyYnl1cGRhdGUnKTtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUuYXJ0aWNsZW9yZGVyYnl0aW1lID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cGRvbSA9IHRhcmdldC5wYXJlbnQoJy5idG4tZ3JvdXAnKTtcdFxyXG5cdHBkb20uZmluZCgnYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdHN0cmlrZXIudHJpZ2dlcignYXJ0aWNsZTpvcmRlcmJ5Y3JlYXRlJyk7XHJcbn1cclxuXHJcbmluZm8ucHJvdG90eXBlLmF1dG9yZWZyZXNoID0gZnVuY3Rpb24oKXtcclxuXHRzdHJpa2VyLnRyaWdnZXIoJ2F1dG9yZWZyZXNoJyx0cnVlKTtcclxufVxyXG5cclxuaW5mby5wcm90b3R5cGUuYmluZEFjdGlvbiA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0JChcIiNzaG93TGlua1wiKS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSlcclxuXHJcblx0c3RyaWtlci5iaW5kKCdzdWJqZWN0VXBkYXRlJyxmdW5jdGlvbihlLGQpe1xyXG5cdFx0X3RoaXMuZGF0YSA9IGQ7XHJcblx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChkKTtcclxuXHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdGlmKGQuZGF0YSl7XHJcblx0XHRcdGQuZGF0YS5teSA9IGRhdGEudXNlci5teUluZm87XHJcblx0XHRcdHZhciBodG1sID0gdG1wbC5hc2lkZShkKTtcclxuXHRcdFx0XHJcblx0XHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHRcdFx0XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdFxyXG5cdHRoaXMuZG9tLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbihlKXtcclxuXHRcdHZhciB0YXJnZXQgPSAkKGUudGFyZ2V0KSxcclxuXHRcdFx0YWN0aW9uID0gdGFyZ2V0LmRhdGEoJ2FjdGlvbicpO1xyXG5cclxuXHRcdF90aGlzLl9zZWxlY3REb20gPSB0YXJnZXQ7XHJcblx0XHRpZihfdGhpc1thY3Rpb25dKXtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0dGhpcy5hc2lkZURvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKTtcclxuXHJcblx0XHRfdGhpcy5fc2VsZWN0RG9tID0gdGFyZ2V0O1xyXG5cdFx0aWYoX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzW2FjdGlvbl0oZSk7XHJcblx0XHR9XHJcblx0fSk7XHRcdFx0XHJcbn1cclxuXHJcbi8v5ouJ5Y2V5Liq5biW5a2QXHJcbmluZm8ucHJvdG90eXBlLmdldERhdGEgPSBmdW5jdGlvbigpe1xyXG5cdHZhciBpZCA9IHRoaXMuc2lkO1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblx0Y2dpLmluZm8oe2lkOmlkfSxmdW5jdGlvbihyZXMpe1xyXG5cdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuaGVhZChyZXMuZGF0YSk7XHJcblx0XHRcdF90aGlzLmRvbS5odG1sKGh0bWwpO1xyXG5cclxuXHRcdFx0cmVzLmRhdGEubXkgPSBkYXRhLnVzZXIubXlJbmZvO1xyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwuYXNpZGUocmVzLmRhdGEpO1xyXG5cdFx0XHRfdGhpcy5kYXRhID0gcmVzLmRhdGE7XHJcblx0XHRcdF90aGlzLmFzaWRlRG9tLmh0bWwoaHRtbCk7XHJcblxyXG5cdFx0XHRfdGhpcy5mb2xsb3dCdG4gPSBfdGhpcy5kb20uZmluZCgnLmZvbGxvdy1idG4nKTtcclxuXHRcdFx0X3RoaXMubWFuYWdlQnRuID0gX3RoaXMuZG9tLmZpbmQoJy5tYW5hZ2UtYnRuJylcclxuXHRcdFx0X3RoaXMudGltZUJ0biA9IF90aGlzLmRvbS5maW5kKCcudGltZS1idG4nKVxyXG5cdFx0XHRfdGhpcy51cGRhdGVCdG4gPSBfdGhpcy5kb20uZmluZCgnLnVwZGF0ZS1idG4nKVxyXG5cdFx0fVxyXG5cdH0pXHRcclxufVxyXG5cclxuLy/lhbPms6jljZXkuKrluJblrZBcclxuaW5mby5wcm90b3R5cGUuZm9sbG93ID0gZnVuY3Rpb24oKXtcclxuXHR2YXIgaWQgPSB0aGlzLnNpZFxyXG5cdFx0Zm9sbG93ID0gMTtcclxuXHR2YXIgX3RoaXMgPSB0aGlzO1xyXG5cclxuXHQvL+WIpOaWreaYr+WQpuW3sue7j2ZvbGxvd+S6hi5cclxuXHRpZih0aGlzLmZvbGxvd0J0bi5oYXNDbGFzcygnZm9sbG93ZWQnKSl7XHJcblx0XHRmb2xsb3cgPSAwO1xyXG5cdH1cclxuXHJcblx0Y2dpLmZvbGxvdyh7c3ViamVjdElkOmlkLGlzRm9sbG93OmZvbGxvd30sZnVuY3Rpb24ocmVzKXtcclxuXHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0aWYoZm9sbG93KXtcclxuXHRcdFx0XHRfdGhpcy5mb2xsb3dCdG4uYWRkQ2xhc3MoJ2ZvbGxvd2VkJykuaHRtbCgnPHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+5bey5YWz5rOoJyk7XHJcblx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdF90aGlzLmZvbGxvd0J0bi5yZW1vdmVDbGFzcygnZm9sbG93ZWQnKS5odG1sKCc8c3BhbiBjbGFzcz1cImZvbGxvd1wiPjwvc3Bhbj7lhbPms6gnKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0pO1xyXG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9qcy9zdWJqZWN0L2luZm8uanNcbiAqKiBtb2R1bGUgaWQgPSAyNlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDRcbiAqKi8iLCIvL+S4u+mimOWIm+W7uizliKDpmaTnrYnmk43kvZxcclxudmFyIGRhdGE7XHJcbnZhciBzQ3JlYXRlID0ge307XHJcblxyXG52YXIgY2dpLFxyXG5cdHRtcGw7XHJcbm1vZHVsZS5leHBvcnRzID0gc0NyZWF0ZTtcclxudmFyIHN0cmlrZXIgPSAkKHdpbmRvdy5zdHJpa2VyKTtcclxuXHJcbnNDcmVhdGUuaW5pdCA9IGZ1bmN0aW9uKHR5cGUsbW9kdWxlLHRtcCl7XHJcblx0Y2dpID0gbW9kdWxlO1xyXG5cdHRtcGwgPSB0bXA7XHJcbn1cclxuXHJcbnNDcmVhdGUuY3JlYXRlID0gZnVuY3Rpb24oaWQpe1xyXG5cdHZhciBfdGhpcyA9IHRoaXM7XHJcblxyXG5cdHRoaXMuc3ViSWQgPSBpZDtcclxuXHJcblx0Ly/pu5jorqTkvb/nlKjmiJHnmoTkuLvpophcclxuXHR0aGlzLnR5cGUgPSAnbXlTdWJqZWN0JztcclxuXHR0aGlzLmlzZWRpdCA9IGZhbHNlO1xyXG5cdHRoaXMuZWRpdERhdGEgPSB7fTtcclxuXHJcblx0dGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0dGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblxyXG5cdC8v6L+Z6YeM6ICD6JmR5LiL6KaB5LiN6KaB5Lyg5Y+C5oyH5a6aZG9tO1xyXG5cdHRoaXMuZG9tID0gJChcIiNjcmVhdGVTdWJqZWN0XCIpO1xyXG5cdHRoaXMudGl0bGVEb20gPSB0aGlzLmRvbS5maW5kKCcubW9kYWwtdGl0bGUnKTtcclxuXHRcclxuXHQvL+WbuuWumueahGlkXHJcblx0dGhpcy5yZXNEb20gPSAkKFwiI25vd1Jlc1wiKTtcclxuXHJcblx0Ly/miornlKjmiLfliJfooajlk6rlhL/liJvlu7rkuIDkuIsuXHJcblx0Ly9jb25zb2xlLmxvZyhzdHJpa2VyLnVzZXIpO1x0XHJcblx0dmFyIG1hbmFnZSA9IG5ldyB3aW5kb3cuc3RyaWtlci51c2VyLm1hbmFnZSgnbWFuYWdlQXJlYScpO1xyXG5cdHZhciBtZW1iZXIgPSBuZXcgd2luZG93LnN0cmlrZXIudXNlci5tYW5hZ2UoJ21lbWJlckFyZWEnKTtcclxuXHR0aGlzLm1hbmFnZSA9IG1hbmFnZTtcclxuXHR0aGlzLm1lbWJlciA9IG1lbWJlcjtcclxuXHR0aGlzLmxhYmVsID0gd2luZG93LnN0cmlrZXIubGFiZWw7XHJcblxyXG5cdHRoaXMuZG9tLm9uKCdzaG93LmJzLm1vZGFsJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdC8vc3RyaWtlci51c2VyLmFkZERlZk1hbmFnZSgpO1xyXG5cdFx0X3RoaXMudGl0bGVEb20udGV4dCgn5paw5bu65Li76aKYJyk7XHJcblx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcblx0XHRcdCQoXCIjc3ViamVjdFRpdGxlXCIpLmZvY3VzKCk7XHRcclxuXHRcdH0sMTAwMClcclxuXHRcdFxyXG5cdFx0bWFuYWdlLmluaXQoKTtcclxuXHR9KTtcclxuXHJcblx0dGhpcy5kb20ub24oJ2hpZGUuYnMubW9kYWwnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0Ly9zdHJpa2VyLnVzZXIuYWRkRGVmTWFuYWdlKCk7XHJcblx0XHRfdGhpcy5yZXNEb20uaHRtbCgnJykuaGlkZSgpO1xyXG5cdFx0X3RoaXMubWFuYWdlLmNsZWFyKCk7XHJcblx0XHRfdGhpcy5sYWJlbC5jbGVhcigpO1xyXG5cdFx0dGhpcy5pc2VkaXQgPSBmYWxzZTtcclxuXHR9KTtcdFxyXG5cclxuXHQvL+i1hOa6kOWIl+ihqFxyXG5cdHRoaXMucmVzTGlzdCA9IFtdLFxyXG5cdHRoaXMucmVzTWFwID0ge307XHJcblxyXG5cdC8v5b2T5YmN6KKr6YCJ5Lit55qE5YWD57SgXHJcblx0dGhpcy5fc2VsZWN0RG9tO1xyXG5cclxuXHR0aGlzLmJpbmRBY3Rpb24oKTtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmNoYW5nZVR5cGUgPSBmdW5jdGlvbih0eXBlKXtcclxuXHR0aGlzLnR5cGUgPSAndHlwZSdcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmVkaXQgPSBmdW5jdGlvbihkYXRhKXtcclxuXHR2YXIgbXlJbmZvID0gcmVxdWlyZSgnLi4vZGF0YS9kYXRhJykudXNlci5teUluZm87XHJcblx0Ly90aGlzLnR5cGUgPSAndHlwZSc7XHJcblx0dGhpcy50aXRsZURvbS50ZXh0KCfkv67mlLnluJblrZAnKTtcclxuXHQkKFwiI3N1YmplY3RUaXRsZVwiKS52YWwoZGF0YS50aXRsZSksXHJcblx0JChcIiNzdWJqZWN0TWFya1wiKS52YWwoZGF0YS5tYXJrKSxcclxuXHQkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnLGRhdGEucHJpdmF0ZSk7XHJcblx0JChcIiNzdWJqZWN0TGlua1wiKS52YWwoZGF0YS5saW5rKTtcclxuXHQkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyxkYXRhLmd1ZXN0KTtcclxuXHR0aGlzLmVkaXREYXRhID0gZGF0YTtcclxuXHJcblx0Zm9yKHZhciBpIGluIGRhdGEubWVtYmVycyl7XHJcblx0XHR2YXIgaXRlbSA9IGRhdGEubWVtYmVyc1tpXTtcclxuXHRcdGlmKGl0ZW0ucm9sZSA9PT0gMSl7XHJcblx0XHRcdHRoaXMubWFuYWdlLmFkZG9uZSh7XHJcblx0XHRcdFx0aWQgOiBpdGVtLmlkLFxyXG5cdFx0XHRcdG5hbWUgOiBpdGVtLm5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHR9ZWxzZSBpZiAoaXRlbS5yb2xlID09PSAyICYmIGl0ZW0uaWQgIT09IG15SW5mby5pZCl7XHJcblx0XHRcdHRoaXMubWVtYmVyLmFkZG9uZSh7XHJcblx0XHRcdFx0aWQgOiBpdGVtLmlkLFxyXG5cdFx0XHRcdG5hbWUgOiBpdGVtLm5hbWVcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL+aKiueuoeeQhuWRmOaYvuekuuWHuuadpSzosozkvLzmlbDmja7kuI3mlK/mjIE/XHJcblx0dGhpcy5pc2VkaXQgPSB0cnVlO1xyXG5cclxuXHQvL+aKiuagh+etvuaYvuekuuWHuuadpVxyXG5cdHRoaXMubGFiZWwuc2hvd0VkaXQoZGF0YS5sYWJlbHMpO1xyXG5cclxuXHQvL+aKiui1hOa6kOWKoOi/m+adpVxyXG5cdHZhciBodG1sID0gdG1wbC5ybGlzdCh7XHJcblx0XHRsaXN0IDogZGF0YS5yZXNvdXJjZUxpc3RcclxuXHR9KTtcclxuXHR0aGlzLnJlc0RvbS5hcHBlbmQoaHRtbCkuc2hvdygpO1x0XHJcbn1cclxuXHJcblxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUucmVtb3ZlUmVzID0gZnVuY3Rpb24oZSl7XHJcblx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpLFxyXG5cdFx0cCA9IHRhcmdldC5wYXJlbnQoKTtcclxuXHJcblx0dmFyIGlkID0gcC5kYXRhKCdpZCcpO1xyXG5cdGlmKGlkKXtcclxuXHRcdGRlbGV0ZSB0aGlzLnJlc01hcFtpZF07XHJcblx0XHRwLnJlbW92ZSgpO1xyXG5cdFx0aWYodGhpcy5yZXNEb20uZmluZCgnLnRhZycpLmxlbmd0aCA9PT0gMCl7XHJcblx0XHRcdHRoaXMucmVzRG9tLmhpZGUoKTtcclxuXHRcdH1cdFx0XHJcblx0fVxyXG59XHJcblxyXG4vL+WPlumAieaLqeeahOi1hOa6kFxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0UmVzTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHRmb3IodmFyIGkgaW4gdGhpcy5yZXNNYXApe1xyXG5cdFx0bGlzdC5wdXNoKHRoaXMucmVzTWFwW2ldLmlkKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpc3Q7XHJcbn1cclxuXHJcbi8v5Y+W6YCJ5Lit55qE5qCH562+XHJcbnNDcmVhdGUuY3JlYXRlLnByb3RvdHlwZS5nZXRMYWJlbExpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLmxhYmVsLmdldExhYmVsTGlzdCgpO1xyXG59XHJcblxyXG4vL+WPlumAieS4reeahOeuoeeQhui/nFxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuZ2V0TWFuYWdlTGlzdCA9IGZ1bmN0aW9uKCl7XHJcblx0cmV0dXJuIHRoaXMubWFuYWdlLmdldE1hbmFnZUxpc3QoKTtcclxufVxyXG5cclxuLy/lj5bpgInkuK3nmoTnrqHnkIbov5xcclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmdldE1lbWJlckxpc3QgPSBmdW5jdGlvbigpe1xyXG5cdHJldHVybiB0aGlzLm1lbWJlci5nZXRNYW5hZ2VMaXN0KCk7XHJcbn1cclxuXHJcblxyXG5zQ3JlYXRlLmNyZWF0ZS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpe1xyXG5cdCQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgnJyk7XHJcblx0JChcIiNzdWJqZWN0TWFya1wiKS52YWwoJycpXHJcblx0dGhpcy5yZXNNYXAgPSB7fTtcclxuXHR0aGlzLnJlc0xpc3QgPSBbXTtcclxufVxyXG5cclxuc0NyZWF0ZS5jcmVhdGUucHJvdG90eXBlLmJpbmRBY3Rpb24gPSBmdW5jdGlvbihwYXJhbSxjYil7XHJcblx0dmFyIF90aGlzID0gdGhpcztcclxuXHJcblx0Ly/otYTmupDkuIrkvKDlrozmiJDnmoTpgJrnn6VcclxuXHR3aW5kb3cudXBsb2FkQ29tcCA9IGZ1bmN0aW9uKGQpe1xyXG5cdFx0aWYoX3RoaXMuc3ViSWQgJiYgIV90aGlzLmlzZWRpdCl7XHJcblx0XHRcdHN0cmlrZXIudHJpZ2dlcigndXBsb2FkQXJ0aWNsZScsZCk7XHJcblx0XHRcdHJldHVybjtcclxuXHRcdH1cclxuXHJcblx0XHRfdGhpcy5maWxldXBsb2FkID0gZmFsc2U7XHJcblx0XHRpZihkLmNvZGUgPT09IDApe1xyXG5cdFx0XHRfdGhpcy5yZXNMaXN0LnB1c2goZC5kYXRhLmlkKTtcclxuXHRcdFx0X3RoaXMucmVzTWFwW2QuZGF0YS5pZF0gPSBkLmRhdGE7XHJcblxyXG5cdFx0XHR2YXIgaHRtbCA9IHRtcGwucmxpc3Qoe1xyXG5cdFx0XHRcdGxpc3QgOiBbZC5kYXRhXVxyXG5cdFx0XHR9KTtcclxuXHRcdFx0X3RoaXMucmVzRG9tLmFwcGVuZChodG1sKS5zaG93KCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvL+inpuWPkeS4iuS8oFxyXG5cdCQoXCIjY2ZpbGVOYW1lXCIpLmJpbmQoJ2NoYW5nZScsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCk7XHJcblxyXG5cdFx0aWYodGFyZ2V0LnZhbCgpICE9PSAnJyl7XHJcblx0XHRcdF90aGlzLmZpbGV1cGxvYWQgPSB0cnVlO1xyXG5cdFx0XHQkKFwiI2NmaWxlRm9ybVwiKS5zdWJtaXQoKTtcclxuXHRcdH1cclxuXHR9KVx0XHJcblxyXG5cdCQoXCIjc2NmaWxlTmFtZVwiKS5iaW5kKCdjaGFuZ2UnLGZ1bmN0aW9uKGUpe1xyXG5cdFx0dmFyIHRhcmdldCA9ICQoZS50YXJnZXQpO1xyXG5cclxuXHRcdGlmKHRhcmdldC52YWwoKSAhPT0gJycpe1xyXG5cdFx0XHRfdGhpcy5maWxldXBsb2FkID0gdHJ1ZTtcclxuXHRcdFx0JChcIiNzY2ZpbGVGb3JtXCIpLnN1Ym1pdCgpO1xyXG5cdFx0fVxyXG5cdH0pXHRcdFxyXG5cclxuXHR0aGlzLmRvbS5iaW5kKCdjbGljaycsZnVuY3Rpb24oZSl7XHJcblx0XHR2YXIgdGFyZ2V0ID0gJChlLnRhcmdldCksXHJcblx0XHRcdGFjdGlvbiA9IHRhcmdldC5kYXRhKCdhY3Rpb24nKSxcclxuXHRcdFx0dHlwZSA9IHRhcmdldC5kYXRhKCd0eXBlJyk7XHJcblxyXG5cdFx0X3RoaXMuX3NlbGVjdERvbSA9IHRhcmdldDtcclxuXHJcblx0XHRpZihhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSl7XHJcblx0XHRcdF90aGlzLnRhcmdldCA9IHRhcmdldDtcclxuXHRcdFx0X3RoaXNbYWN0aW9uXShlKTtcclxuXHRcdFx0cmV0dXJuO1xyXG5cdFx0fVxyXG5cclxuXHRcdGlmKHR5cGUgPT09ICdzdWJtaXQnKXtcclxuXHRcdFx0dmFyIHRpdCA9ICQoXCIjc3ViamVjdFRpdGxlXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG1hcmsgPSAkKFwiI3N1YmplY3RNYXJrXCIpLnZhbCgpLFxyXG5cdFx0XHRcdGxpbmsgPSAkKFwiI3N1YmplY3RMaW5rXCIpLnZhbCgpLFxyXG5cdFx0XHRcdG9wZW4gPSAkKFwiI3N1YmplY3RPcGVuXCIpLnByb3AoJ2NoZWNrZWQnKT8wOjEsXHJcblx0XHRcdFx0Z3Vlc3QgPSAkKFwiI3N1YmplY3RHdWVzdFwiKS5wcm9wKCdjaGVja2VkJyk/MDoxO1xyXG5cclxuXHRcdFx0aWYodGl0ID09ICcnKXtcclxuXHRcdFx0XHRhbGVydCgn6L+Y5rKh5pyJ5aGr5YaZ5qCH6aKYJyk7XHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHR2YXIgcGFyYW0gPSB7XHJcblx0XHRcdFx0dGl0bGUgOiB0aXQsXHJcblx0XHRcdFx0bWFyayA6IG1hcmssXHJcblx0XHRcdFx0bGluayA6IGxpbmssXHJcblx0XHRcdFx0cHJpdmF0ZSA6IG9wZW4sXHJcblx0XHRcdFx0Z3Vlc3QgOiBndWVzdCxcclxuXHRcdFx0XHRtYW5hZ2VzIDogX3RoaXMuZ2V0TWFuYWdlTGlzdCgpLFxyXG5cdFx0XHRcdG1lbWJlcnMgOiBfdGhpcy5nZXRNZW1iZXJMaXN0KCksXHJcblx0XHRcdFx0c3ViamVjdExhYmVscyA6IF90aGlzLmdldExhYmVsTGlzdCgpLFxyXG5cdFx0XHRcdGFydGljbGVMYWJlbHMgOiBbXSxcclxuXHRcdFx0XHRyZXNvdXJjZXMgOiBfdGhpcy5nZXRSZXNMaXN0KClcclxuXHRcdFx0fVx0XHRcclxuXHJcblx0XHRcdFxyXG5cdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRcdHBhcmFtLnN1YmplY3RJZCA9IF90aGlzLmVkaXREYXRhLmlkO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRpZih0aGlzLmxvYWRpbmcpe1xyXG5cdFx0XHRcdHJldHVybjtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0aWYocGFyYW0udGl0bGUgIT09ICcnICYmIHBhcmFtLm1hcmsgIT09ICcnKXtcclxuXHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gdHJ1ZTtcclxuXHRcdFx0XHRpZihfdGhpcy5pc2VkaXQpe1xyXG5cdFx0XHRcdFx0Y2dpLmVkaXQocGFyYW0sZnVuY3Rpb24ocmVzKXtcclxuXHRcdFx0XHRcdFx0aWYocmVzLmNvZGUgPT09IDApe1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmRvbS5tb2RhbCgnaGlkZScpO1xyXG5cdFx0XHRcdFx0XHRcdF90aGlzLmxvYWRpbmcgPSBmYWxzZTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3ViamVjdFVwZGF0ZScscmVzLmRhdGEpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHQvLyBjb25zb2xlLmxvZyhwYXJhbSk7XHJcblx0XHRcdFx0XHQvLyByZXR1cm47XHJcblx0XHRcdFx0XHRjZ2kuY3JlYXRlKHBhcmFtLGZ1bmN0aW9uKHJlcyl7XHJcblx0XHRcdFx0XHRcdGlmKHJlcy5jb2RlID09PSAwKXtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5kb20ubW9kYWwoJ2hpZGUnKTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5sb2FkaW5nID0gZmFsc2U7XHJcblx0XHRcdFx0XHRcdFx0dmFyIGh0bWwgPSB0bXBsLmxpc3Qoe1xyXG5cdFx0XHRcdFx0XHRcdFx0bGlzdCA6IFtyZXMuZGF0YV1cclxuXHRcdFx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHRcdFx0XHRfdGhpcy5jbGVhcigpO1xyXG5cdFx0XHRcdFx0XHRcdHN0cmlrZXIudHJpZ2dlcignc3ViamVjdENyZWF0ZWQnKTtcclxuXHRcdFx0XHRcdFx0XHQkKFwiI215U3ViamVjdFwiKS5wcmVwZW5kKGh0bWwpO1xyXG5cdFx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHR9KTtcdFx0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cclxuXHR9KTtcclxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvanMvc3ViamVjdC9jcmVhdGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnICAgICAgPHNwYW4gZGF0YS1hY3Rpb249XCJsb2dvdXRcIj48c3BhbiBjbGFzcz1cInVzZXJcIj48L3NwYW4+PCUtbmFtZSU+PC9zcGFuPlxcclxcbiAgICAgIDxzcGFuIGNsYXNzPVwibXNnXCIgPjxzcGFuPjwvc3Bhbj48ZGl2PjwvZGl2Pjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cImRpYWxvZ1wiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cInNlYXJjaFwiPjwvc3Bhbj5cXHJcXG4gICAgICA8c3BhbiBjbGFzcz1cIm1lbXVcIj48L3NwYW4+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgICAgPHNwYW4gZGF0YS1hY3Rpb249XCJsb2dvdXRcIj48c3BhbiBjbGFzcz1cInVzZXJcIj48L3NwYW4+JywgKF9fc3RhY2subGluZW5vID0gMSwgbmFtZSksICc8L3NwYW4+XFxuICAgICAgPHNwYW4gY2xhc3M9XCJtc2dcIiA+PHNwYW4+PC9zcGFuPjxkaXY+PC9kaXY+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwiZGlhbG9nXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwic2VhcmNoXCI+PC9zcGFuPlxcbiAgICAgIDxzcGFuIGNsYXNzPVwibWVtdVwiPjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL3VzZXJfbmF2LmVqc1xuICoqIG1vZHVsZSBpZCA9IDMxXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcclxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXHJcXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXHJcXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxyXFxuICAgIDwvc3Bhbj5cXHJcXG48L2Rpdj4gXFxyXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxyXFxuICA8dWw+XFxyXFxuICA8JVxcclxcbiAgICBmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuICAgICAgaXRlbSA9IGxpc3RbaV07XFxyXFxuICAlPiBcXHJcXG4gICAgICA8bGkgaWQ9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgY2xhc3M9XCJ1c2VyPCUtaXRlbS5pZCU+XCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiPCUtaXRlbS5uYW1lJT5cIj48JS1pdGVtLm5hbWUlPjwvbGk+XFxyXFxuICA8JX0lPlxcclxcbiAgPC91bD5cXHJcXG48L2Rpdj4gICcsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJzxkaXYgY2xhc3M9XCJpbnB1dC1ncm91cFwiPlxcbiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIHBsYWNlaG9sZGVyPVwi6L6T5YWl55So5oi35ZCN56ew5pCc57SiXCIgbmFtZT1cIm1hbmFnZWtleVwiIGRhdGEta2V5dXA9XCJzZWFyY2hidG5cIj5cXG4gICAgPHNwYW4gY2xhc3M9XCJpbnB1dC1ncm91cC1idG5cIj5cXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kZWZhdWx0XCIgdHlwZT1cImJ1dHRvblwiIGRhdGEtYWN0aW9uPVwic2VhcmNoYnRuXCI+5pCc57SiPC9idXR0b24+XFxuICAgIDwvc3Bhbj5cXG48L2Rpdj4gXFxuPGRpdiBjbGFzcz1cIm1hbmFnZS1hcmVhXCI+XFxuICA8dWw+XFxuICAnKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBsaXN0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJyBcXG4gICAgICA8bGkgaWQ9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgY2xhc3M9XCJ1c2VyJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDEzLCBpdGVtLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwic2VsZWN0b25lXCIgZGF0YS1uYW1lPVwiJywgKF9fc3RhY2subGluZW5vID0gMTMsIGl0ZW0ubmFtZSksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSAxMywgaXRlbS5uYW1lKSwgXCI8L2xpPlxcbiAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgPC91bD5cXG48L2Rpdj4gIFwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL21hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzMlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2U8JS1pZCU+XCIgZGF0YS1pZD1cIjwlLWlkJT5cIj5cXHJcXG5cdDwlLW5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8c3BhbiBjbGFzcz1cInRhZyBsYWJlbCBsYWJlbC1pbmZvXCIgaWQ9XCJtYW5hZ2UnLCAoX19zdGFjay5saW5lbm8gPSAxLCBpZCksICdcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMSwgaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSAyLCBuYW1lKSwgJzxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcbjwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC91c2VyL29uZW1hbmFnZS5lanNcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpIGluIGxpc3Qpe1xcclxcblx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xcclxcblx0dmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XFxyXFxuJT5cXHJcXG48bGkgdGl0bGU9XCI8JS1pdGVtLm1lc3NhZ2UlPlwiPjxhIGRhdGEtaHJlZj1cImFydGljbGUuaHRtbD9pZD08JS1vYmouYXJ0aWNsZUlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgZGF0YS1yZWFkPVwiPCUtaXRlbS5yZWFkJT5cIj48JS1pdGVtLm1lc3NhZ2UlPjwvYT48L2xpPlxcclxcbjwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9iaiA9IEpTT04ucGFyc2UoaXRlbS53aXRoRGF0YSk7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGkgdGl0bGU9XCInLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm1lc3NhZ2UpLCAnXCI+PGEgZGF0YS1ocmVmPVwiYXJ0aWNsZS5odG1sP2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDYsIG9iai5hcnRpY2xlSWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0uaWQpLCAnXCIgZGF0YS1yZWFkPVwiJywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5yZWFkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0ubWVzc2FnZSksIFwiPC9hPjwvbGk+XFxuXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL3VzZXIvbXNnbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzNFxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6IFwiXCIsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvdXNlci9tc2cuZWpzXG4gKiogbW9kdWxlIGlkID0gMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiAzIDRcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGFub255bW91cyhsb2NhbHMsIGZpbHRlcnMsIGVzY2FwZSwgcmV0aHJvdykge1xuICAgIGVzY2FwZSA9IGVzY2FwZSB8fCBmdW5jdGlvbihodG1sKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcoaHRtbCkucmVwbGFjZSgvJi9nLCBcIiZhbXA7XCIpLnJlcGxhY2UoLzwvZywgXCImbHQ7XCIpLnJlcGxhY2UoLz4vZywgXCImZ3Q7XCIpLnJlcGxhY2UoLycvZywgXCImIzM5O1wiKS5yZXBsYWNlKC9cIi9nLCBcIiZxdW90O1wiKTtcbiAgICB9O1xuICAgIHZhciBfX3N0YWNrID0ge1xuICAgICAgICBsaW5lbm86IDEsXG4gICAgICAgIGlucHV0OiAnPCVmb3IodmFyIGkgPTAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gIHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZTwlLWl0ZW0uaWQlPlwiPlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1hc2lkZVwiPjwlLXN0cmlrZXIudXRpbC5nZXROb3dUaW1lKGl0ZW0udXBkYXRlVGltZSklPjwvZGl2PlxcclxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLW9uZS1pbmZvXCI+XFxyXFxuICAgICAgPGRpdiBjbGFzcz1cImluZm8tdGl0bGVcIj7lj5HluJYgPCUtaXRlbS5jcmVhdG9yTmFtZSU+ICAg5pyA5ZCO5Zue5aSNIDwlLWl0ZW0udXBkYXRvck5hbWUlPjwvZGl2PlxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLWFjdGlvblwiPlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJ1cFwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCI8JS1pdGVtLmlzU3RhciU+XCI+PHNwYW4+PC9zcGFuPjwlaWYoaXRlbS5pc1N0YXIpeyU+5bey6LWePCV9ZWxzZXslPui1njwlfSU+PC9zcGFuPiA8c3BhbiBjbGFzcz1cInBvc3RcIiBkYXRhLWFjdGlvbj1cInJlcGxheVwiIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj48c3Bhbj48L3NwYW4+5Zue5aSNPC9zcGFuPiA8c3BhbiBjbGFzcz1cImRlbGV0ZVwiIGRhdGEtYWN0aW9uPVwiZGVsZXRlXCIgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxyXFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcclxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9PCUtaXRlbS5pZCU+JnNpZD08JS1pdGVtLnN1YmplY3RfaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPlxcclxcbiAgICAgICAgICA8JS1pdGVtLmNvbnRlbnQlPlxcclxcbiAgICAgICAgPC9kZD5cXHJcXG4gICAgICAgIDwlaWYoaXRlbS5pbWdudW0+MCl7JT5cXHJcXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgPCVcXHJcXG4gICAgICAgICAgICB2YXIgZmlyc3QgPSB0cnVlO1xcclxcbiAgICAgICAgICAgIHZhciBpbWdudW0gPSAwO1xcclxcbiAgICAgICAgICAgIGZvcih2YXIgaj0wLG09aXRlbS5yZXNvdXJjZS5sZW5ndGg7ajxtO2orKyl7XFxyXFxuICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcXHJcXG4gICAgICAgICAgICAgIFxcclxcbiAgICAgICAgICAgICAgaWYob2JqLnR5cGUgPT09IDEpe1xcclxcbiAgICAgICAgICAgICAgICBpZihpbWdudW0+Mil7XFxyXFxuICAgICAgICAgICAgICAgICAgYnJlYWs7XFxyXFxuICAgICAgICAgICAgICAgIH1cXHJcXG4gICAgICAgICAgJT5cXHJcXG4gICAgICAgICAgICA8ZGl2PlxcclxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9PCUtb2JqLmlkJT5cIiBkYXRhLXBpZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtaWQ9XCI8JS1vYmouaWQlPlwiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXHJcXG4gICAgICAgICAgICAgIDwlXFxyXFxuICAgICAgICAgICAgICAgIGltZ251bSsrO1xcclxcbiAgICAgICAgICAgICAgICBpZihmaXJzdCl7XFxyXFxuICAgICAgICAgICAgICAgICAgZmlyc3QgPSBmYWxzZTtcXHJcXG4gICAgICAgICAgICAgICU+XFxyXFxuICAgICAgICAgICAgICA8c3Bhbj7lhbE8JS1pdGVtLmltZ251bSU+5bygPC9zcGFuPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgPCV9fSU+XFxyXFxuICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwlfSU+XFxyXFxuICAgIDwvZGl2PlxcclxcbiAgPC9kaXY+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUgYXJ0aWNsZScsIChfX3N0YWNrLmxpbmVubyA9IDQsIGl0ZW0uaWQpLCAnXCI+XFxuICAgIDxkaXYgY2xhc3M9XCJhcnRpY2Utb25lLWFzaWRlXCI+JywgKF9fc3RhY2subGluZW5vID0gNSwgc3RyaWtlci51dGlsLmdldE5vd1RpbWUoaXRlbS51cGRhdGVUaW1lKSksICc8L2Rpdj5cXG4gICAgPGRpdiBjbGFzcz1cImFydGljZS1vbmUtaW5mb1wiPlxcbiAgICAgIDxkaXYgY2xhc3M9XCJpbmZvLXRpdGxlXCI+5Y+R5biWICcsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0uY3JlYXRvck5hbWUpLCBcIiAgIOacgOWQjuWbnuWkjSBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS51cGRhdG9yTmFtZSksICc8L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVwiaW5mby1hY3Rpb25cIj5cXG4gICAgICAgIDxzcGFuIGNsYXNzPVwidXBcIiBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gOSwgaXRlbS5pZCksICdcIiBkYXRhLWFjdGlvbj1cInNldHVwXCIgZGF0YS1zdGF0dXM9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlzU3RhciksICdcIj48c3Bhbj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaXNTdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuW3sui1nlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwi6LWeXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCc8L3NwYW4+IDxzcGFuIGNsYXNzPVwicG9zdFwiIGRhdGEtYWN0aW9uPVwicmVwbGF5XCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDksIGl0ZW0uaWQpLCAnXCI+PHNwYW4+PC9zcGFuPuWbnuWkjTwvc3Bhbj4gPHNwYW4gY2xhc3M9XCJkZWxldGVcIiBkYXRhLWFjdGlvbj1cImRlbGV0ZVwiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA5LCBpdGVtLmlkKSwgJ1wiPjxzcGFuPjwvc3Bhbj7liKDpmaQ8L3NwYW4+XFxuICAgICAgPC9kaXY+ICAgICAgICAgIFxcbiAgICAgIDxkbCBjbGFzcz1cImFydGljZS1kbFwiPlxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCJhcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0uaWQpLCBcIiZzaWQ9XCIsIChfX3N0YWNrLmxpbmVubyA9IDEyLCBpdGVtLnN1YmplY3RfaWQpLCAnXCI+JywgKF9fc3RhY2subGluZW5vID0gMTIsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPlxcbiAgICAgICAgICBcIiwgKF9fc3RhY2subGluZW5vID0gMTQsIGl0ZW0uY29udGVudCksIFwiXFxuICAgICAgICA8L2RkPlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDE2O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5pbWdudW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNlLWltZy1saXN0XCI+XFxuICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxODtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBmaXJzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW1nbnVtID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwLCBtID0gaXRlbS5yZXNvdXJjZS5sZW5ndGg7IGogPCBtOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2JqID0gaXRlbS5yZXNvdXJjZVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob2JqLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGltZ251bSA+IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgICAgPGltZyBzcmM9XCIvY2dpL3Jlc291cmNlL3ByZXZpZXc/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMzAsIG9iai5pZCksICdcIiBkYXRhLXBpZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBpdGVtLmlkKSwgJ1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMCwgb2JqLmlkKSwgJ1wiIGRhdGEtYWN0aW9uPVwicmV2aWV3XCIgLz5cXG4gICAgICAgICAgICAgICcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDMxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbWdudW0rKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICAgIDxzcGFuPuWFsVwiLCAoX19zdGFjay5saW5lbm8gPSAzNiwgaXRlbS5pbWdudW0pLCBcIuW8oDwvc3Bhbj5cXG4gICAgICAgICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDM5O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcXG4gICAgPC9kaXY+XFxuICA8L2Rpdj5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2FydGljbGUvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JWZvcih2YXIgaSA9IDA7aTxsaXN0Lmxlbmd0aDtpKyspe1xcclxcbnZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxsaT48c3BhbiBjbGFzcz1cImZ1aS1oZWFydFwiPjwvc3Bhbj7nva7pobbvvJo8YSBocmVmPVwiL2FydGljbGUuaHRtbD9pZD08JS1pdGVtLmlkJT5cIj48JS1pdGVtLnRpdGxlJT48L2E+PC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG48bGk+PHNwYW4gY2xhc3M9XCJmdWktaGVhcnRcIj48L3NwYW4+572u6aG277yaPGEgaHJlZj1cIi9hcnRpY2xlLmh0bWw/aWQ9JywgKF9fc3RhY2subGluZW5vID0gNCwgaXRlbS5pZCksICdcIj4nLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLnRpdGxlKSwgXCI8L2E+PC9saT5cXG5cIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvYXJ0aWNsZS90b3AuZWpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlZm9yKHZhciBpID0wLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG5cdDxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm9cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHRcdDwlLWl0ZW0ubmFtZSU+PHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxyXFxuXHQ8L3NwYW4+XFxyXFxuPCV9JT4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGxpc3QubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcblx0PHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mb1wiIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA0LCBpdGVtLmlkKSwgJ1wiPlxcblx0XHQnLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVSZXNcIj48L3NwYW4+XFxuXHQ8L3NwYW4+XFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvcmVzb3VyY2UvbGlzdC5lanNcbiAqKiBtb2R1bGUgaWQgPSAzOVxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICc8JVxcclxcblx0Zm9yKHZhciBpID0gMCxsPWxpc3QubGVuZ3RoO2k8bDtpKyspe1xcclxcblx0XHR2YXIgaXRlbSA9IGxpc3RbaV07XFxyXFxuJT5cXHJcXG48bGkgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiIGRhdGEtbmFtZT1cIjwlLWl0ZW0ubmFtZSU+XCIgZGF0YS1hY3Rpb249XCJzZWxlY3RcIj5cXHJcXG5cdDwlLWl0ZW0ubmFtZSU+XFxyXFxuPC9saT5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPGxpIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSA1LCBpdGVtLmlkKSwgJ1wiIGRhdGEtbmFtZT1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0ubmFtZSksICdcIiBkYXRhLWFjdGlvbj1cInNlbGVjdFwiPlxcblx0JywgKF9fc3RhY2subGluZW5vID0gNiwgaXRlbS5uYW1lKSwgXCJcXG48L2xpPlxcblwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9sYWJlbC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ1XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgMyA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJzwlXFxyXFxuXHRmb3IodmFyIGkgPSAwLGw9bGlzdC5sZW5ndGg7aTxsO2krKyl7XFxyXFxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4lPlxcclxcbjxzcGFuIGNsYXNzPVwidGFnIGxhYmVsIGxhYmVsLWluZm8gbGFiZWw8JS1pdGVtLmlkJT5cIiBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+XFxyXFxuXHQ8JS1pdGVtLm5hbWUlPjxzcGFuIGRhdGEtYWN0aW9uPVwicmVtb3ZlXCI+PC9zcGFuPlxcclxcbjwvc3Bhbj5cXHJcXG48JX0lPicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuPHNwYW4gY2xhc3M9XCJ0YWcgbGFiZWwgbGFiZWwtaW5mbyBsYWJlbCcsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCIgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGl0ZW0uaWQpLCAnXCI+XFxuXHQnLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLm5hbWUpLCAnPHNwYW4gZGF0YS1hY3Rpb249XCJyZW1vdmVcIj48L3NwYW4+XFxuPC9zcGFuPlxcbicpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXCIpO1xuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmLmpvaW4oXCJcIik7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIHJldGhyb3coZXJyLCBfX3N0YWNrLmlucHV0LCBfX3N0YWNrLmZpbGVuYW1lLCBfX3N0YWNrLmxpbmVubyk7XG4gICAgfVxufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvdHBsL2xhYmVsL29uZS5lanNcbiAqKiBtb2R1bGUgaWQgPSA0NlxuICoqIG1vZHVsZSBjaHVua3MgPSAyIDMgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgPGhlYWRlciBjbGFzcz1cImhlYWRlci10b3BcIj5cXHJcXG4gICAgICA8ZGl2IGNsYXNzPVwiaGVhZGVyLWxlZnRcIj5cXHJcXG4gICAgICAgIDxzcGFuIGNsYXNzPVwiZnVpLXVzZXJcIj48JS1wcm9UZXh0JT48L3NwYW4+XFxyXFxuICAgICAgICA8JWlmKHByb1RleHQ9PT1cXCfmiJHliJvlu7rnmoRcXCcpeyU+XFxyXFxuICAgICAgICA8c3BhbiBjbGFzcz1cIlwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZnVpLXBsdXNcIiAgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZVN1YmplY3RcIiBkYXRhLWFjdGlvbj1cImNyZWF0ZVwiPuWIm+W7uuS4u+mimDwvYT48L3NwYW4+XFxyXFxuICAgICAgICA8JX0lPlxcclxcbiAgICAgIDwvZGl2PlxcclxcblxcclxcbiAgICAgIDxkaXYgY2xhc3M9XCJoZWFkZXItcmlnaHRcIj5cXHJcXG4gICAgICAgIOWFsTxzcGFuIGlkPVwiPCUtcHJvTmFtZSU+TnVtXCI+MjA8L3NwYW4+5Liq5Li76aKYIDxhIGNsYXNzPVwicHJlLXBhZ2VcIiBkYXRhLWFjdGlvbj1cInByZVwiPuS4iuS4gOmhtTwvYT4gPGEgY2xhc3M9XCJuZXh0LXBhZ2VcIiBkYXRhLWFjdGlvbj1cIm5leHRcIj7kuIvkuIDpobU8L2E+XFxyXFxuICAgICAgICA8ZGl2IGNsYXNzPVwiYnRuLWdyb3VwXCI+XFxyXFxuICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHRpbWUgYWN0aXZlXCIgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dGltZVwiPuaMieWIm+W7uuaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdXBkYXRlXCIgIGRhdGEtYWN0aW9uPVwib3JkZXJieXVwZGF0ZVwiPuaMieabtOaWsOaXtumXtOaOkuW6jzwvYT5cXHJcXG4gICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgPHNwYW4gY2xhc3M9XCJhcnJvdy1kb3duXCIgZGF0YS1hY3Rpb249XCJjbG9zZVwiPjwvc3Bhbj5cXHJcXG4gICAgICA8L2Rpdj4gICAgIFxcclxcbiAgICA8L2hlYWRlcj5cXHJcXG5cXHJcXG4gICAgPGRpdiBjbGFzcz1cImFydGljbGUtbGlzdFwiIGlkPVwiPCUtcHJvTmFtZSU+XCI+XFxyXFxuICAgICAgICAgICAgICAgICBcXHJcXG4gICAgPC9kaXY+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaCgnICAgIDxoZWFkZXIgY2xhc3M9XCJoZWFkZXItdG9wXCI+XFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1sZWZ0XCI+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImZ1aS11c2VyXCI+JywgKF9fc3RhY2subGluZW5vID0gMywgcHJvVGV4dCksIFwiPC9zcGFuPlxcbiAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gNDtcbiAgICAgICAgICAgICAgICBpZiAocHJvVGV4dCA9PT0gXCLmiJHliJvlu7rnmoRcIikge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICA8c3BhbiBjbGFzcz1cIlwiPjxhIGNsYXNzPVwiYnRuIGJ0bi1ibG9jayBidG4tbGcgYnRuLXByaW1hcnkgZnVpLXBsdXNcIiAgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZVN1YmplY3RcIiBkYXRhLWFjdGlvbj1cImNyZWF0ZVwiPuWIm+W7uuS4u+mimDwvYT48L3NwYW4+XFxuICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA2O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgPC9kaXY+XFxuXFxuICAgICAgPGRpdiBjbGFzcz1cImhlYWRlci1yaWdodFwiPlxcbiAgICAgICAg5YWxPHNwYW4gaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxMCwgcHJvTmFtZSksICdOdW1cIj4yMDwvc3Bhbj7kuKrkuLvpopggPGEgY2xhc3M9XCJwcmUtcGFnZVwiIGRhdGEtYWN0aW9uPVwicHJlXCI+5LiK5LiA6aG1PC9hPiA8YSBjbGFzcz1cIm5leHQtcGFnZVwiIGRhdGEtYWN0aW9uPVwibmV4dFwiPuS4i+S4gOmhtTwvYT5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgPGEgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgdGltZSBhY3RpdmVcIiBkYXRhLWFjdGlvbj1cIm9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8YSBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSB1cGRhdGVcIiAgZGF0YS1hY3Rpb249XCJvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8c3BhbiBjbGFzcz1cImFycm93LWRvd25cIiBkYXRhLWFjdGlvbj1cImNsb3NlXCI+PC9zcGFuPlxcbiAgICAgIDwvZGl2PiAgICAgXFxuICAgIDwvaGVhZGVyPlxcblxcbiAgICA8ZGl2IGNsYXNzPVwiYXJ0aWNsZS1saXN0XCIgaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAxOSwgcHJvTmFtZSksICdcIj5cXG4gICAgICAgICAgICAgICAgIFxcbiAgICA8L2Rpdj4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L3NpemUuZWpzXG4gKiogbW9kdWxlIGlkID0gNDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICA8JVxcclxcbiAgICBcdGZvcih2YXIgaSA9IDAsbD1saXN0Lmxlbmd0aDtpPGw7aSsrKXtcXHJcXG4gICAgXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcXHJcXG4gICAgJT5cXHJcXG4gICAgICA8ZGwgY2xhc3M9XCJhcnQtbGlzdFwiPlxcclxcbiAgICAgICAgPGR0PjxhIGhyZWY9XCIvaW5mby5odG1sP2lkPTwlLWl0ZW0uaWQlPlwiPjwlLWl0ZW0udGl0bGUlPjwvYT48L2R0PlxcclxcbiAgICAgICAgPGRkPuWIm+W7uuS6uiA8JS1pdGVtLmNyZWF0b3JOYW1lJT4g5Yib5bu65pe26Ze0IDwlLXN0cmlrZXIudXRpbC5mb3JtYXRUaW1lKGl0ZW0uY3JlYXRlVGltZSklPiDmnIDov5Hmm7TmlrAgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS51cGRhdGVUaW1lKSU+IOS4u+mimOi1hOa6kCA8JS1pdGVtLnJlc291cmNlQ291bnQlPiA8JS1pdGVtLm1lbWJlckNvdW50JT7kuKrmiJDlkZggPCUtaXRlbS5hcnRpY2xlQ291bnQlPuS4quW4luWtkCA8JS1pdGVtLnJlc291cmNlQ291bnQlPuS4qui1hOa6kDwvZGQ+XFxyXFxuICAgICAgPC9kbD4gXFxyXFxuICAgIDwlfSU+JyxcbiAgICAgICAgZmlsZW5hbWU6IHVuZGVmaW5lZFxuICAgIH07XG4gICAgZnVuY3Rpb24gcmV0aHJvdyhlcnIsIHN0ciwgZmlsZW5hbWUsIGxpbmVubykge1xuICAgICAgICB2YXIgbGluZXMgPSBzdHIuc3BsaXQoXCJcXG5cIiksIHN0YXJ0ID0gTWF0aC5tYXgobGluZW5vIC0gMywgMCksIGVuZCA9IE1hdGgubWluKGxpbmVzLmxlbmd0aCwgbGluZW5vICsgMyk7XG4gICAgICAgIHZhciBjb250ZXh0ID0gbGluZXMuc2xpY2Uoc3RhcnQsIGVuZCkubWFwKGZ1bmN0aW9uKGxpbmUsIGkpIHtcbiAgICAgICAgICAgIHZhciBjdXJyID0gaSArIHN0YXJ0ICsgMTtcbiAgICAgICAgICAgIHJldHVybiAoY3VyciA9PSBsaW5lbm8gPyBcIiA+PiBcIiA6IFwiICAgIFwiKSArIGN1cnIgKyBcInwgXCIgKyBsaW5lO1xuICAgICAgICB9KS5qb2luKFwiXFxuXCIpO1xuICAgICAgICBlcnIucGF0aCA9IGZpbGVuYW1lO1xuICAgICAgICBlcnIubWVzc2FnZSA9IChmaWxlbmFtZSB8fCBcImVqc1wiKSArIFwiOlwiICsgbGluZW5vICsgXCJcXG5cIiArIGNvbnRleHQgKyBcIlxcblxcblwiICsgZXJyLm1lc3NhZ2U7XG4gICAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGJ1ZiA9IFtdO1xuICAgICAgICB3aXRoIChsb2NhbHMgfHwge30pIHtcbiAgICAgICAgICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBidWYucHVzaChcIiAgICBcIik7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gbGlzdC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgPGRsIGNsYXNzPVwiYXJ0LWxpc3RcIj5cXG4gICAgICAgIDxkdD48YSBocmVmPVwiL2luZm8uaHRtbD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSA2LCBpdGVtLmlkKSwgJ1wiPicsIChfX3N0YWNrLmxpbmVubyA9IDYsIGl0ZW0udGl0bGUpLCBcIjwvYT48L2R0PlxcbiAgICAgICAgPGRkPuWIm+W7uuS6uiBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5jcmVhdG9yTmFtZSksIFwiIOWIm+W7uuaXtumXtCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS5jcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoaXRlbS51cGRhdGVUaW1lKSksIFwiIOS4u+mimOi1hOa6kCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5yZXNvdXJjZUNvdW50KSwgXCIgXCIsIChfX3N0YWNrLmxpbmVubyA9IDcsIGl0ZW0ubWVtYmVyQ291bnQpLCBcIuS4quaIkOWRmCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5hcnRpY2xlQ291bnQpLCBcIuS4quW4luWtkCBcIiwgKF9fc3RhY2subGluZW5vID0gNywgaXRlbS5yZXNvdXJjZUNvdW50KSwgXCLkuKrotYTmupA8L2RkPlxcbiAgICAgIDwvZGw+IFxcbiAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goXCJcIik7XG4gICAgICAgICAgICB9KSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBidWYuam9pbihcIlwiKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmV0aHJvdyhlcnIsIF9fc3RhY2suaW5wdXQsIF9fc3RhY2suZmlsZW5hbWUsIF9fc3RhY2subGluZW5vKTtcbiAgICB9XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy90cGwvc3ViamVjdC9saXN0LmVqc1xuICoqIG1vZHVsZSBpZCA9IDQ4XG4gKiogbW9kdWxlIGNodW5rcyA9IDIgNFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlLCByZXRocm93KSB7XG4gICAgZXNjYXBlID0gZXNjYXBlIHx8IGZ1bmN0aW9uKGh0bWwpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZyhodG1sKS5yZXBsYWNlKC8mL2csIFwiJmFtcDtcIikucmVwbGFjZSgvPC9nLCBcIiZsdDtcIikucmVwbGFjZSgvPi9nLCBcIiZndDtcIikucmVwbGFjZSgvJy9nLCBcIiYjMzk7XCIpLnJlcGxhY2UoL1wiL2csIFwiJnF1b3Q7XCIpO1xuICAgIH07XG4gICAgdmFyIF9fc3RhY2sgPSB7XG4gICAgICAgIGxpbmVubzogMSxcbiAgICAgICAgaW5wdXQ6ICcgICAgICAgIDxkdD48JS10aXRsZSU+PC9kdD5cXHJcXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj7liJvlu7rkurogPCUtY3JlYXRvck5hbWUlPiDliJvlu7rml7bpl7QgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUoY3JlYXRlVGltZSklPiDmnIDov5Hmm7TmlrAgPCUtc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSklPjwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+XFxyXFxuICAgICAgICAgIOS4u+mimOi1hOa6kCA8JS1zdWJqZWN0UmVzb3VyY2VDb3VudCU+IDwlLW1lbWJlckNvdW50JT7kuKrmiJDlkZggPCUtYXJ0aWNsZUNvdW50JT7kuKrluJblrZAgPCUtYXJ0aWNsZVJlc291cmNlQ291bnQlPuS4qui1hOa6kCDmiJHnmoTlj5HluJYv5Zue5aSNIDwlLWFydGljbGVDcmVhdGVDb3VudCU+LzEyXFxyXFxuICAgICAgICAgIDxkaXY+6KeG6aKRIDxzcGFuIGRhdGEtYWN0aW9uPVwibGlua1wiID48JS1saW5rJT48L3NwYW4+PC9kaXY+XFxyXFxuICAgICAgICA8L2RkPlxcclxcbiAgICAgICAgPGRkIGNsYXNzPVwiYXJ0aWNlLWFjdC1idG5cIj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5XCIgZGF0YS10b2dnbGU9XCJtb2RhbFwiIGRhdGEtdGFyZ2V0PVwiI2NyZWF0ZUFydGljbGVcIj48c3BhbiBjbGFzcz1cInBvc3RcIj48L3NwYW4+5Y+R5biWPC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IGZvbGxvdy1idG4gPCVpZihmb2xsb3cpeyU+Zm9sbG93ZWQ8JX0lPlwiIGRhdGEtYWN0aW9uPVwiZm9sbG93XCI+PHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+PCVpZihmb2xsb3cpeyU+5bey5YWz5rOoPCV9ZWxzZXslPuWFs+azqDwlfSU+PC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcclxcbiAgICAgICAgICAgIDwhLS1cXHJcXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXHJcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxyXFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxyXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxyXFxuICAgICAgICAgICAgPC9hPlxcclxcbiAgICAgICAgICAgIC0tPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXHJcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZW9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGQ+XFxyXFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXHJcXG4gICAgICAgICAg6Ieq5Yqo5Yi35pawOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1hY3Rpb249XCJhdXRvcmVmXCIgY2hlY2tlZD1cImNoZWNrZWRcIiAvPlxcclxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxyXFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcclxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcclxcbiAgICAgICAgICAgIDwvZGl2PlxcclxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgPC9kZD4nLFxuICAgICAgICBmaWxlbmFtZTogdW5kZWZpbmVkXG4gICAgfTtcbiAgICBmdW5jdGlvbiByZXRocm93KGVyciwgc3RyLCBmaWxlbmFtZSwgbGluZW5vKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHN0ci5zcGxpdChcIlxcblwiKSwgc3RhcnQgPSBNYXRoLm1heChsaW5lbm8gLSAzLCAwKSwgZW5kID0gTWF0aC5taW4obGluZXMubGVuZ3RoLCBsaW5lbm8gKyAzKTtcbiAgICAgICAgdmFyIGNvbnRleHQgPSBsaW5lcy5zbGljZShzdGFydCwgZW5kKS5tYXAoZnVuY3Rpb24obGluZSwgaSkge1xuICAgICAgICAgICAgdmFyIGN1cnIgPSBpICsgc3RhcnQgKyAxO1xuICAgICAgICAgICAgcmV0dXJuIChjdXJyID09IGxpbmVubyA/IFwiID4+IFwiIDogXCIgICAgXCIpICsgY3VyciArIFwifCBcIiArIGxpbmU7XG4gICAgICAgIH0pLmpvaW4oXCJcXG5cIik7XG4gICAgICAgIGVyci5wYXRoID0gZmlsZW5hbWU7XG4gICAgICAgIGVyci5tZXNzYWdlID0gKGZpbGVuYW1lIHx8IFwiZWpzXCIpICsgXCI6XCIgKyBsaW5lbm8gKyBcIlxcblwiICsgY29udGV4dCArIFwiXFxuXFxuXCIgKyBlcnIubWVzc2FnZTtcbiAgICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB2YXIgYnVmID0gW107XG4gICAgICAgIHdpdGggKGxvY2FscyB8fCB7fSkge1xuICAgICAgICAgICAgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICA8ZHQ+XCIsIChfX3N0YWNrLmxpbmVubyA9IDEsIHRpdGxlKSwgJzwvZHQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtdXNlXCI+5Yib5bu65Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDIsIGNyZWF0b3JOYW1lKSwgXCIg5Yib5bu65pe26Ze0IFwiLCAoX19zdGFjay5saW5lbm8gPSAyLCBzdHJpa2VyLnV0aWwuZm9ybWF0VGltZShjcmVhdGVUaW1lKSksIFwiIOacgOi/keabtOaWsCBcIiwgKF9fc3RhY2subGluZW5vID0gMiwgc3RyaWtlci51dGlsLmZvcm1hdFRpbWUodXBkYXRlVGltZSkpLCAnPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS11c2VcIj5cXG4gICAgICAgICAg5Li76aKY6LWE5rqQICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIHN1YmplY3RSZXNvdXJjZUNvdW50KSwgXCIgXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgXCLkuKrmiJDlkZggXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIGFydGljbGVDb3VudCksIFwi5Liq5biW5a2QIFwiLCAoX19zdGFjay5saW5lbm8gPSA0LCBhcnRpY2xlUmVzb3VyY2VDb3VudCksIFwi5Liq6LWE5rqQIOaIkeeahOWPkeW4li/lm57lpI0gXCIsIChfX3N0YWNrLmxpbmVubyA9IDQsIGFydGljbGVDcmVhdGVDb3VudCksICcvMTJcXG4gICAgICAgICAgPGRpdj7op4bpopEgPHNwYW4gZGF0YS1hY3Rpb249XCJsaW5rXCIgPicsIChfX3N0YWNrLmxpbmVubyA9IDUsIGxpbmspLCAnPC9zcGFuPjwvZGl2PlxcbiAgICAgICAgPC9kZD5cXG4gICAgICAgIDxkZCBjbGFzcz1cImFydGljZS1hY3QtYnRuXCI+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVBcnRpY2xlXCI+PHNwYW4gY2xhc3M9XCJwb3N0XCI+PC9zcGFuPuWPkeW4ljwvYT48L3NwYW4+XFxuICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGF0XCI+PGEgY2xhc3M9XCJidG4gYnRuLWJsb2NrIGJ0bi1sZyBidG4tcHJpbWFyeSBmb2xsb3ctYnRuICcpO1xuICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICBpZiAoZm9sbG93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiZm9sbG93ZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJ1wiIGRhdGEtYWN0aW9uPVwiZm9sbG93XCI+PHNwYW4gY2xhc3M9XCJmb2xsb3dcIj48L3NwYW4+Jyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIGlmIChmb2xsb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goXCLlt7LlhbPms6hcIik7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gOTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBidWYucHVzaChcIuWFs+azqFwiKTtcbiAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSA5O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaCgnPC9hPjwvc3Bhbj5cXG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJwYXRcIj48YSBjbGFzcz1cImJ0biBidG4tYmxvY2sgYnRuLWxnIGJ0bi1wcmltYXJ5IG1hbmFnZS1idG5cIiBkYXRhLWFjdGlvbj1cIm1hbmFnZVwiIGRhdGEtdG9nZ2xlPVwibW9kYWxcIiBkYXRhLXRhcmdldD1cIiNjcmVhdGVTdWJqZWN0XCI+PHNwYW4gY2xhc3M9XCJtYW5hZ2VcIj48L3NwYW4+566h55CGPC9hPjwvc3Bhbj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhY3RpY2UtYWN0LXNlbGVjdFwiPlxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic2VsZWN0Mi1jb250YWluZXIgZm9ybS1jb250cm9sIHNlbGVjdCBzZWxlY3QtcHJpbWFyeVwiIGlkPVwiczJpZF9hdXRvZ2VuMVwiPlxcbiAgICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJzZWxlY3QyLWNob2ljZVwiIHRhYmluZGV4PVwiLTFcIj4gICBcXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic2VsZWN0Mi1jaG9zZW5cIiBpZD1cInNlbGVjdDItY2hvc2VuLTJcIj7mjInluJblrZDmoIfnrb7nrZvpgIk8L3NwYW4+XFxuICAgICAgICAgICAgICA8YWJiciBjbGFzcz1cInNlbGVjdDItc2VhcmNoLWNob2ljZS1jbG9zZVwiPjwvYWJicj4gXFxuICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInNlbGVjdDItYXJyb3dcIiByb2xlPVwicHJlc2VudGF0aW9uXCI+PGIgcm9sZT1cInByZXNlbnRhdGlvblwiPjwvYj48L3NwYW4+XFxuICAgICAgICAgICAgPC9hPlxcbiAgICAgICAgICAgIC0tPjxsYWJlbCBmb3I9XCJzMmlkX2F1dG9nZW4yXCIgY2xhc3M9XCJzZWxlY3QyLW9mZnNjcmVlblwiPjwvbGFiZWw+PGlucHV0IGNsYXNzPVwic2VsZWN0Mi1mb2N1c3NlciBzZWxlY3QyLW9mZnNjcmVlblwiIHR5cGU9XCJ0ZXh0XCIgYXJpYS1oYXNwb3B1cD1cInRydWVcIiByb2xlPVwiYnV0dG9uXCIgYXJpYS1sYWJlbGxlZGJ5PVwic2VsZWN0Mi1jaG9zZW4tMlwiIGlkPVwiczJpZF9hdXRvZ2VuMlwiPjwvZGl2PiAgICAgICAgICBcXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImJ0bi1ncm91cFwiPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGFjdGl2ZSB0aW1lLWJ0blwiIGRhdGEtYWN0aW9uPVwiYXJ0aWNsZW9yZGVyYnl0aW1lXCI+5oyJ5Yib5bu65pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICAgIDxhIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IHVwZGF0ZS1idG5cIiBkYXRhLWFjdGlvbj1cImFydGljbGVvcmRlcmJ5dXBkYXRlXCI+5oyJ5pu05paw5pe26Ze05o6S5bqPPC9hPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGQ+XFxuICAgICAgICA8ZGQgY2xhc3M9XCJhcnRpY2UtYXV0by1yZWZ1c2VcIj5cXG4gICAgICAgICAg6Ieq5Yqo5Yi35pawOiA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZGF0YS1hY3Rpb249XCJhdXRvcmVmXCIgY2hlY2tlZD1cImNoZWNrZWRcIiAvPlxcbiAgICAgICAgICA8YSBocmVmPVwiL2luZGV4Lmh0bWxcIj7ov5Tlm548L2E+XFxuICAgICAgICAgIDwhLS08ZGl2IGNsYXNzPVwiYm9vdHN0cmFwLXN3aXRjaCBib290c3RyYXAtc3dpdGNoLXdyYXBwZXIgYm9vdHN0cmFwLXN3aXRjaC1hbmltYXRlIGJvb3RzdHJhcC1zd2l0Y2gtaWQtY3VzdG9tLXN3aXRjaC0wMSBib290c3RyYXAtc3dpdGNoLW9mZlwiPlxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWNvbnRhaW5lclwiPlxcbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWhhbmRsZS1vbiBib290c3RyYXAtc3dpdGNoLXByaW1hcnlcIj5PTjwvc3Bhbj48bGFiZWwgY2xhc3M9XCJib290c3RyYXAtc3dpdGNoLWxhYmVsXCI+Jm5ic3A7PC9sYWJlbD48c3BhbiBjbGFzcz1cImJvb3RzdHJhcC1zd2l0Y2gtaGFuZGxlLW9mZiBib290c3RyYXAtc3dpdGNoLWRlZmF1bHRcIj5PRkY8L3NwYW4+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNoZWNrZWQ9XCJcIiBkYXRhLXRvZ2dsZT1cInN3aXRjaFwiIGlkPVwiY3VzdG9tLXN3aXRjaC0wMVwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXFxuICAgICAgICAgIC0tPlxcbiAgICAgICAgPC9kZD4nKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2hlYWQuZWpzXG4gKiogbW9kdWxlIGlkID0gNDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMiA0XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBhbm9ueW1vdXMobG9jYWxzLCBmaWx0ZXJzLCBlc2NhcGUsIHJldGhyb3cpIHtcbiAgICBlc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24oaHRtbCkge1xuICAgICAgICByZXR1cm4gU3RyaW5nKGh0bWwpLnJlcGxhY2UoLyYvZywgXCImYW1wO1wiKS5yZXBsYWNlKC88L2csIFwiJmx0O1wiKS5yZXBsYWNlKC8+L2csIFwiJmd0O1wiKS5yZXBsYWNlKC8nL2csIFwiJiMzOTtcIikucmVwbGFjZSgvXCIvZywgXCImcXVvdDtcIik7XG4gICAgfTtcbiAgICB2YXIgX19zdGFjayA9IHtcbiAgICAgICAgbGluZW5vOiAxLFxuICAgICAgICBpbnB1dDogJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxyXFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgPCUtc3ViamVjdFJlc291cmNlQ291bnQlPjwvc3Bhbj5cXHJcXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPuWPguS4juS6uiA8JS1tZW1iZXJDb3VudCU+PC9zcGFuPlxcclxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+57uf6K6hPC9zcGFuPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvbmF2PlxcclxcblxcclxcbiAgICAgICAgPGRpdiBjbGFzcz1cImFydGljZS1hc2lkZS1pbWdcIj5cXHJcXG4gICAgICAgICAgPCEtLVxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIj5cXHJcXG4gICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjIwMFwiIHNyYz1cImh0dHA6Ly9pbWdzcmMuYmFpZHUuY29tL2ZvcnVtL3clM0Q1ODAvc2lnbj0zYjk1Y2VjNzBjMzM4NzQ0OWNjNTJmNzQ2MTBlZDkzNy9mMDc0ZDBmYzFlMTc4YTgyNzRiMGVmMzdmNjAzNzM4ZGE4NzdlODY4LmpwZ1wiIC8+XFxyXFxuICAgICAgICAgICAg6aKE6KeIICDmoIfms6gg5LiL6L29ICDliKDpmaRcXHJcXG4gICAgICAgICAgPC9kaXY+XFxyXFxuICAgICAgICAgIC0tPlxcclxcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiaW1nLWxpc3RcIj5cXHJcXG4gICAgICAgICAgICA8JVxcclxcbiAgICAgICAgICAgICAgZm9yKHZhciBpIGluIHJlc291cmNlTGlzdCl7XFxyXFxuICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcXHJcXG4gICAgICAgICAgICAlPlxcclxcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtPCUtaXRlbS5pZCU+XCI+XFxyXFxuICAgICAgICAgICAgPCVpZihpdGVtLnR5cGUgPT09IDEpeyU+XFxyXFxuICAgICAgICAgICAgICA8aW1nIHdpZHRoPVwiMTAwJVwiIGhlaWdodD1cIjEwMFwiIHNyYz1cIi9jZ2kvcmVzb3VyY2UvcHJldmlldz9pZD08JS1pdGVtLmlkJT5cIiB0aXRsZT1cIjwlLWl0ZW0ubmFtZSU+XCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIiAgZGF0YS1hY3Rpb249XCJyZXZpZXdcIiAvPlxcclxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInJldmlld1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT4gIFxcclxcbiAgICAgICAgICAgICAgPCVpZihteS5hdXRoIHx8IG15LmlkID09PSBjcmVhdG9yKXsgJT5cXHJcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCI+5Yig6ZmkPC9hPlxcclxcbiAgICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8JX1lbHNlIGlmKGl0ZW0udHlwZSA9PT0gNCB8fCBpdGVtLnR5cGUgPT09Myl7JT5cXHJcXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2aWRlb1wiICBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwic2hvd1ZpZGVvXCI+PC9kaXY+XFxyXFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiPCUtaXRlbS5pZCU+XCIgIGRhdGEtYWN0aW9uPVwibWFya1wiIHN0eWxlPVwiXCI+5qCH5rOoPC9hPiAgPGEgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiICBkYXRhLWFjdGlvbj1cInNob3dWaWRlb1wiPumihOiniDwvYT4gIDxhIGhyZWY9XCIvY2dpL3Jlc291cmNlL2Rvd25sb2FkP2lkPTwlLWl0ZW0uaWQlPlwiIHRhcmdldD1cIl9ibGFua1wiPuS4i+i9vTwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlaWYobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcil7ICU+XFxyXFxuICAgICAgICAgICAgICAgIDxhIGRhdGEtYWN0aW9uPVwiZGVsZXRlUmVzb3VyY2VcIiAgZGF0YS1pZD1cIjwlLWl0ZW0uaWQlPlwiPuWIoOmZpDwvYT5cXHJcXG4gICAgICAgICAgICAgIDwlfSU+XFxyXFxuICAgICAgICAgICAgPCV9ZWxzZXslPlxcclxcbiAgICAgICAgICAgICAgPHA+PCUtaXRlbS5uYW1lJT48L3A+XFxyXFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD08JS1pdGVtLmlkJT5cIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxyXFxuICAgICAgICAgICAgICA8JWlmKG15LmF1dGggfHwgbXkuaWQgPT09IGNyZWF0b3IpeyAlPlxcclxcbiAgICAgICAgICAgICAgICA8YSBkYXRhLWFjdGlvbj1cImRlbGV0ZVJlc291cmNlXCIgIGRhdGEtaWQ9XCI8JS1pdGVtLmlkJT5cIj7liKDpmaQ8L2E+XFxyXFxuICAgICAgICAgICAgICA8JX0lPiAgICAgICAgICAgICAgXFxyXFxuICAgICAgICAgICAgPCV9JT5cXHJcXG4gICAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgICAgICA8JX0lPlxcclxcbiAgICAgICAgICA8L2Rpdj5cXHJcXG4gICAgICAgIDwvZGl2PicsXG4gICAgICAgIGZpbGVuYW1lOiB1bmRlZmluZWRcbiAgICB9O1xuICAgIGZ1bmN0aW9uIHJldGhyb3coZXJyLCBzdHIsIGZpbGVuYW1lLCBsaW5lbm8pIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc3RyLnNwbGl0KFwiXFxuXCIpLCBzdGFydCA9IE1hdGgubWF4KGxpbmVubyAtIDMsIDApLCBlbmQgPSBNYXRoLm1pbihsaW5lcy5sZW5ndGgsIGxpbmVubyArIDMpO1xuICAgICAgICB2YXIgY29udGV4dCA9IGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcChmdW5jdGlvbihsaW5lLCBpKSB7XG4gICAgICAgICAgICB2YXIgY3VyciA9IGkgKyBzdGFydCArIDE7XG4gICAgICAgICAgICByZXR1cm4gKGN1cnIgPT0gbGluZW5vID8gXCIgPj4gXCIgOiBcIiAgICBcIikgKyBjdXJyICsgXCJ8IFwiICsgbGluZTtcbiAgICAgICAgfSkuam9pbihcIlxcblwiKTtcbiAgICAgICAgZXJyLnBhdGggPSBmaWxlbmFtZTtcbiAgICAgICAgZXJyLm1lc3NhZ2UgPSAoZmlsZW5hbWUgfHwgXCJlanNcIikgKyBcIjpcIiArIGxpbmVubyArIFwiXFxuXCIgKyBjb250ZXh0ICsgXCJcXG5cXG5cIiArIGVyci5tZXNzYWdlO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBidWYgPSBbXTtcbiAgICAgICAgd2l0aCAobG9jYWxzIHx8IHt9KSB7XG4gICAgICAgICAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgYnVmLnB1c2goJyAgICAgICAgPG5hdiBjbGFzcz1cImJ0bi10b29sYmFyXCI+XFxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJidG4tZ3JvdXBcIj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBhY3RpdmVcIj7otYTmupAgJywgKF9fc3RhY2subGluZW5vID0gMywgc3ViamVjdFJlc291cmNlQ291bnQpLCAnPC9zcGFuPlxcbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCI+5Y+C5LiO5Lq6ICcsIChfX3N0YWNrLmxpbmVubyA9IDQsIG1lbWJlckNvdW50KSwgJzwvc3Bhbj5cXG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiPue7n+iuoTwvc3Bhbj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L25hdj5cXG5cXG4gICAgICAgIDxkaXYgY2xhc3M9XCJhcnRpY2UtYXNpZGUtaW1nXCI+XFxuICAgICAgICAgIDwhLS1cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInZpZGVvXCI+XFxuICAgICAgICAgICAgPGltZyB3aWR0aD1cIjEwMCVcIiBoZWlnaHQ9XCIyMDBcIiBzcmM9XCJodHRwOi8vaW1nc3JjLmJhaWR1LmNvbS9mb3J1bS93JTNENTgwL3NpZ249M2I5NWNlYzcwYzMzODc0NDljYzUyZjc0NjEwZWQ5MzcvZjA3NGQwZmMxZTE3OGE4Mjc0YjBlZjM3ZjYwMzczOGRhODc3ZTg2OC5qcGdcIiAvPlxcbiAgICAgICAgICAgIOmihOiniCAg5qCH5rOoIOS4i+i9vSAg5Yig6ZmkXFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAtLT5cXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImltZy1saXN0XCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAxNztcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpIGluIHJlc291cmNlTGlzdCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IHJlc291cmNlTGlzdFtpXTtcbiAgICAgICAgICAgICAgICAgICAgYnVmLnB1c2goJ1xcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdWItcmVzb3VyY2UtJywgKF9fc3RhY2subGluZW5vID0gMjEsIGl0ZW0uaWQpLCAnXCI+XFxuICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjI7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgIDxpbWcgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwXCIgc3JjPVwiL2NnaS9yZXNvdXJjZS9wcmV2aWV3P2lkPScsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiIHRpdGxlPVwiJywgKF9fc3RhY2subGluZW5vID0gMjMsIGl0ZW0ubmFtZSksICdcIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDIzLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInJldmlld1wiIC8+XFxuICAgICAgICAgICAgICA8YSBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgIGRhdGEtYWN0aW9uPVwicmV2aWV3XCI+6aKE6KeIPC9hPiAgPGEgaHJlZj1cIi9jZ2kvcmVzb3VyY2UvZG93bmxvYWQ/aWQ9JywgKF9fc3RhY2subGluZW5vID0gMjQsIGl0ZW0uaWQpLCAnXCIgdGFyZ2V0PVwiX2JsYW5rXCI+5LiL6L29PC9hPiAgXFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMjU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMjYsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyNztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAyODtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09IDQgfHwgaXRlbS50eXBlID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBidWYucHVzaCgnXFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmlkZW9cIiAgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDI5LCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cInNob3dWaWRlb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgPGEgZGF0YS1pZD1cIicsIChfX3N0YWNrLmxpbmVubyA9IDMwLCBpdGVtLmlkKSwgJ1wiICBkYXRhLWFjdGlvbj1cIm1hcmtcIiBzdHlsZT1cIlwiPuagh+azqDwvYT4gIDxhIGRhdGEtaWQ9XCInLCAoX19zdGFjay5saW5lbm8gPSAzMCwgaXRlbS5pZCksICdcIiAgZGF0YS1hY3Rpb249XCJzaG93VmlkZW9cIj7pooTop4g8L2E+ICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzMCwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzIsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzMztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzNDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgICA8cD5cIiwgKF9fc3RhY2subGluZW5vID0gMzUsIGl0ZW0ubmFtZSksICc8L3A+XFxuICAgICAgICAgICAgICA8YSBocmVmPVwiL2NnaS9yZXNvdXJjZS9kb3dubG9hZD9pZD0nLCAoX19zdGFjay5saW5lbm8gPSAzNiwgaXRlbS5pZCksICdcIiB0YXJnZXQ9XCJfYmxhbmtcIj7kuIvovb08L2E+XFxuICAgICAgICAgICAgICAnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF9fc3RhY2subGluZW5vID0gMzc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobXkuYXV0aCB8fCBteS5pZCA9PT0gY3JlYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKCdcXG4gICAgICAgICAgICAgICAgPGEgZGF0YS1hY3Rpb249XCJkZWxldGVSZXNvdXJjZVwiICBkYXRhLWlkPVwiJywgKF9fc3RhY2subGluZW5vID0gMzgsIGl0ZW0uaWQpLCAnXCI+5Yig6ZmkPC9hPlxcbiAgICAgICAgICAgICAgJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX19zdGFjay5saW5lbm8gPSAzOTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiICAgICAgICAgICAgICBcXG4gICAgICAgICAgICBcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJ1Zi5wdXNoKFwiXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgXCIpO1xuICAgICAgICAgICAgICAgICAgICBfX3N0YWNrLmxpbmVubyA9IDQyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBidWYucHVzaChcIlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlwiKTtcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJ1Zi5qb2luKFwiXCIpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICByZXRocm93KGVyciwgX19zdGFjay5pbnB1dCwgX19zdGFjay5maWxlbmFtZSwgX19zdGFjay5saW5lbm8pO1xuICAgIH1cbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL3RwbC9zdWJqZWN0L2FzaWRlLmVqc1xuICoqIG1vZHVsZSBpZCA9IDUwXG4gKiogbW9kdWxlIGNodW5rcyA9IDIgNFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImluZGV4LmpzIn0=