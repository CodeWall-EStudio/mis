require('./common/global');
var user = require('./user/user'),
	article = require('./article/info'),
	list = require('./comment/list'),
	post = require('./comment/post'),
	msg = require('./common/msg'),
	label = require('./label/label');
var Striker = $(window.striker),
	striker = window.striker;	

var nowArtId = striker.util.getParameter('id'),
	nowSubjectId = striker.util.getParameter('sid');


function userLoadSub(e,d){
	 var cpost = new post.post(nowArtId,nowSubjectId); 
	 window.striker.commentpost = cpost;

 	 var clist = new list.list(nowArtId,nowSubjectId);
 	 window.striker.commentlist = clist;

 	 cpost.bindFun(clist);
 	 
	 new article.info(nowArtId,nowSubjectId);
}

var handlers = {
	'userLoadSub' : userLoadSub
}

for(var i in handlers){
	Striker.bind(i,handlers[i]);
}

function init(){

	striker.article = article;
	striker.user = user;
	
	window.striker.msg = new msg.message();
	
	user.init();

	//bindAction();
}

init();