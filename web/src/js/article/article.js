var cgi = require('../common/cgi').article;
var tmpl = {
	list : require('../../tpl/article/list.ejs')
};

var articleList = require('./list'),
	articlePost = require('./post');

var Article = {}

module.exports = Article;

Article.search = articleList.search;

Article.loadMore = articleList.loadMore;

Article.appendToList = articleList.prependToList;

Article.post = articlePost.create;

Article.reset = articlePost.reset;

/**/

Article.init = function(id){
	articleList.init(id,cgi,tmpl);
	articlePost.init(id,cgi,tmpl);
}