require('./common/global');
var user = require('./user/user'),
	article = require('./article/info'),
	articlepost = require('./article/post'),
	list = require('./comment/list'),
	post = require('./comment/post'),
	msg = require('./common/msg'),
	review = require('./resource/review'),
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

 	 var apost = new articlepost.post(nowArtId,nowSubjectId);
	 
	 var artInfo = new article.info(nowArtId,nowSubjectId);
	 cpost.bindFun(clist);
	 clist.bind({
	 	info:artInfo
	 });

	 artInfo.bind({
	 	post: apost
	 })
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