var cgi = require('../common/cgi').article;
var tmpl = {
	list : require('../../tpl/article/list.ejs'),
	top : require('../../tpl/article/top.ejs'),
	rlist : require('../../tpl/resource/list.ejs')   //资源列表
};

var articleList = require('./list'),
	articlePost = require('./post');

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