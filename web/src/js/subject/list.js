//主题列表
var sList = {},
	data = require('../data/data').subject,
	cgi,
	tmpl,
	start = 0,
	limit = 20;

module.exports = sList;

sList.init = function(module,tmp){
	cgi = module;
	tmpl = tmp;
	console.log(cgi);
}

sList.search = function(param){
	cgi.search({
		start : start,
		limit : limit
	},function(res){
		console.log(res);
		if(res.code === 0){
			var html = tmpl.list(res.data);
			$('#mySubject').html(html);
		}
	});
}