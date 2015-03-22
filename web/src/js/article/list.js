//主题列表
var aList = {},
	data = require('../data/data'),
	cgi,
	tmpl,
	nowSubId = 0,
	loading = false;
	start = 0,
	limit = 20;

module.exports = aList;
var listDom = $("#articleList");

aList.init = function(id,module,tmp){
	nowSubId = id;
	cgi = module;
	tmpl = tmp;

	aList.search({
		start : start,
		limit : limit,
		subjectId : nowSubId
	})
}

//加载更多数据
aList.loadMore = function(){
	if(loading){
		return;
	}
	aList.search({
		start : start,
		limit : limit,
		subjectId : nowSubId
	})
}

//把新发布的帖子加到列表最前面
aList.prependToList = function(param){
		var html = tmpl.list({list:[param]});
		listDom.prepend(html);
}

//搜索数据
aList.search = function(param){
	loading = true;
	cgi.search(param,function(res){
		var html = tmpl.list(res.data);
		start += limit;
		loading = false;
		listDom.append(html);
	});
}