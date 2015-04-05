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
	this.model = 'post';//post 底部 pop 弹出窗口

	var _this = this;
	this.cDom.on('show.bs.modal', function (e) {
		_this.model = 'pop';
	});

	this.cDom.on('hide.bs.modal', function (e) {
		_this.model = 'post';
	});


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


post.prototype.bindAction = function(){
	var _this = this;	
	//资源上传完成的通知

	window.uploadComp = function(d){
		
		if(window.striker.commentshow){
			$(striker).trigger('uploadFile',d);
			return;
		}
	//window.addEventListener('uploadComp',function(d){
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
//重置一个from
aPost.reset = function(target){
	var pTarget = $(target.data('target'));
	if(pTarget.length === 0){
		return;
	}
	resetFrom(pTarget);
}

aPost.post = post;