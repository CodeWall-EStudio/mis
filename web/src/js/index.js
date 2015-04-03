require('./common/global');
var user = require('./user/user'),
	subject = require('./subject/subject'),
	article = require('./article/article'),
	label = require('./label/label');


var Striker = $(window.striker);


//事件通知,用户资料已经加载完成
function userLoad(e,d){
	new subject.area('mySubject');
	new subject.area('myFollow');
	window.striker.label = new label.label('labelArea');
	window.striker.createSubject = new subject.create();
	//subject.search('mySubject');
	// subject.search('mySubject');
	// subject.search('mySubject');
}

//事件通知,主题已经加载完成
function subjectLoad(e,d){
	console.log(e,d);
}

var handlers = {
	'userLoadSub' : userLoad,
	'subjectLoad' : subjectLoad
}

for(var i in handlers){
	Striker.bind(i,handlers[i]);
}

//全局事件绑定
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
	subject.init('index');
	//article.init('index');
	user.init();
	label.init();

	striker.subject = subject;
	striker.article = article;
	striker.user = user;

	bindAction();
}

init();