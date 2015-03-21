//主题
var cgi = require('../common/cgi').subject,
	subjectList = require('./list'),
	subjectInfo = require('./info'),
	subjectCreate = require('./create');

//模板引用
var tmpl = {
	manage : require('../../tpl/user/manage.ejs'),
	list : require('../../tpl/subject/list.ejs'),
	onemanage : require('../../tpl/user/onemanage.ejs')
};

var Subject = {};

module.exports = Subject;

/*定义通用参数*/
var start = 0,
	limit = 20;

Subject.search = subjectList.search;

Subject.create = subjectCreate.create;

Subject.info = subjectInfo.info;

Subject.init = function(){
	subjectList.init(cgi,tmpl);
	subjectInfo.init(cgi,tmpl);
	subjectCreate.init(cgi,tmpl);
}