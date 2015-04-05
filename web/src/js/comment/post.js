var cgi = require('../common/cgi').comment;
var tmpl = {
	list : require('../../tpl/article/list.ejs')
};

var Comment = {}

Comment.post = function(id,sid){
	this.dom = '';
	this.artId = id;
	this.subId = sid;	
	// articleList.init(id,cgi,tmpl);
	// articlePost.init(id,cgi,tmpl);
}

module.exports = Comment;