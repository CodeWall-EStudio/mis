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

aList.search = function(param){
	loading = true;
	cgi.search(param,function(res){
		var html = tmpl.list(res.data);
		start += limit;
		loading = false;
		listDom.append(html);
	});
}