//主题列表
var sList = {},
	data = require('../data/data').subject,
	cgi,
	tmpl,
	start = 0,
	limit = 20;

module.exports = sList;

sList.init = function(type,module,tmp){
	cgi = module;
	tmpl = tmp;
}

sList.search = function(param){
	cgi.search({
		start : start,
		limit : limit
	},function(res){
		if(res.code === 0){
			var html = tmpl.list(res.data);
			$('#mySubject').html(html);
		}
	});
}