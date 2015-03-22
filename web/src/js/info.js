require('./common/global');
var user = require('./user/user'),
	subject = require('./subject/subject'),
	article = require('./article/article'),
	label = require('./label/label');
var Striker = $(window.striker),
	striker = window.striker;	

var nowSubId = striker.util.getParameter('id');


//事件通知,用户资料已经加载完成
//主题列表的通知事件
function userLoadSub(e,d){
	 subject.info(nowSubId);
	 article.init(nowSubId);
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
			if(actMap.length === 2 && striker[actMap[0]][actMap[1]]){
				striker[actMap[0]][actMap[1]](target);
			}
		}

	});

    $(document).on('scroll',function(e){
        var scrollDom = document.body;
        var pageHeight = document.documentElement.clientHeight;
        var scrollTop = scrollDom.scrollTop;
        var scrollHeight = scrollDom.scrollHeight;

        //判断是否到底了
        if(scrollTop + pageHeight >= scrollHeight){
            //console.log('end');
            article.loadMore();
        }                
    });
}

function init(){
	subject.init('info');

	striker.subject = subject;
	striker.article = article;
	striker.user = user;

	
	user.init();
	label.init();

	bindAction();
}

init();