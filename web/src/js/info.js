require('./common/global');
var user = require('./user/user'),
	subject = require('./subject/subject'),
	article = require('./article/article'),
	comment = require('./comment/post'),
	msg = require('./common/msg'),
	label = require('./label/label');
var Striker = $(window.striker),
	striker = window.striker;	

var nowSubId = striker.util.getParameter('id');


//事件通知,用户资料已经加载完成
//主题列表的通知事件
function userLoadSub(e,d){
	 var subinfo = new subject.info(nowSubId);

	 var articleList = new article.list(nowSubId);
	 var cpost = new comment.post(0,nowSubId); 

	 cpost.bind({
	 	list : articleList
	 });
	 articleList.bind({
	 	post : cpost
	 });
}

function userLoadArt(e,d){

}
//帖子发表成功
function articlePosted(e,d){

}

//帖子被删除
function articleDeled(e,d){

}

//帖子关注成功
function articleFollowed(e,d){

}

//事件通知,主题已经加载完成
function subjectLoad(e,d){
	console.log(e,d);
}

var handlers = {
	'userLoadSub' : userLoadSub,
	'userLoadArt' : userLoadArt,
	'subjectLoad' : subjectLoad,
	'articlePosted' : articlePosted
}

for(var i in handlers){
	Striker.bind(i,handlers[i]);
}

function bindAction(){
	$('body').bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		if(action){
			var actMap = action.split('.');
			var mod = actMap[0],
				fun = actMap[1];
			if(actMap.length === 2 && striker[mod][fun]){

				striker[mod][fun](target);
			}
		}

	});
}

function init(){
	subject.init('info');

	striker.subject = subject;
	striker.article = article;
	striker.user = user;

	article.init(nowSubId);
	
	window.striker.msg = new msg.message();

	
	user.init();
	label.init();

	bindAction();
}

init();