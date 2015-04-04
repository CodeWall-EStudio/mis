require('./common/global');
var user = require('./user/user'),
	article = require('./article/article'),
	comment = require('./comment/comment'),
	msg = require('./common/msg'),
	label = require('./label/label');
var Striker = $(window.striker),
	striker = window.striker;	

var nowArtId = striker.util.getParameter('id');


function userLoadSub(e,d){
	 new subject.info(nowSubId);
	 comment.init(nowArtId);
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

	bindAction();
}

init();