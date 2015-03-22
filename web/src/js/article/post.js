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
var listDom = $("#articleList");

//注册和绑定事件
function bindAction(){

}

//根据dom获取相关的参数.
function getParam(target){
	var name = target.find('input[name=name]').val(),
		content = target.find('textarea[name=content]').val();

	return {
		name : name,
		content : content,
		subjectId : nowSubId,
		labels : [1,2],
		resources : [1]
	}
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

	bindAction();
}

//发布一个内容
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
			pTarget.modal('hide');
		}
		if(res.code === 0){
			striker.article.appendToList(res.data);
		}
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