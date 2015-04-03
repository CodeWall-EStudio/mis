//主题列表
var aPost = {},
	data = require('../data/data'),
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

//注册和绑定事件
function bindAction(){
	window.uploadComp = function(d){
		if(d.code === 0){
			resList.push(d.data.id);
		}
	}
}

//根据dom获取相关的参数.
function getParam(target){
	var name = target.find('input[name=name]').val(),
		content = target.find('textarea[name=content]').val();

	var param = {
		title : name,
		content : content,
		subjectId : nowSubId,
		labels : [1,2]
	}
	if(resList.length > 0){
		param.resources = resList;
	}
	return param;
}

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
	bindAction();
}

aPost.post = function(){
	this.pDom = $("#postArticle"); //底部发表框
	this.cDom = $("#createArticle"); //弹出发表框
	this.loading = false;
	this.target;
	this.bindAction();
}

aPost.post.prototype.bindFun = function(){

};


aPost.post.prototype.bindAction = function(){

	var _this = this;
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
		console.log(target.val());
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

aPost.post.prototype.clear = function(){
	this.pDom.find('input').val('');
	this.pDom.find('textarea').val('');

	this.cDom.find('input').val('');
	this.cDom.find('textarea').val('');	

	resList = [];
}

aPost.post.prototype.post = function(){
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
	var param = getParam(pTarget);
	var _this = this;
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


//发布一个内容
/*
aPost.create = function(target){
	if(loading){
		return;
	}
	var pt = target.data('target');
	var pTarget = $(pt);
	if(pTarget.length === 0){
		return;
	}
	var param = getParam(pTarget);
		
	cgi.create(param,function(res){
		loading === false;
		if(pTarget.hasClass('modal')){
			aPost.reset(pTarget);
		}
		if(res.code === 0){
			striker.article.appendToList(res.data);
		}
	});
}
*/

//重置一个from
aPost.reset = function(target){
	var pTarget = $(target.data('target'));
	if(pTarget.length === 0){
		return;
	}
	resetFrom(pTarget);
}