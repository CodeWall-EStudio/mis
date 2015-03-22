var cgi = require('../common/cgi').article;
var tmpl = {
	list : require('../../tpl/article/list.ejs')
};

var articleList = require('./list');

var Article = {}

module.exports = Article;

Article.search = articleList.search;

Article.loadMore = articleList.loadMore;

/**/

Article.init = function(id){
	articleList.init(id,cgi,tmpl);
}