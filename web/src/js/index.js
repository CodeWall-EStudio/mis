require('./common/global');
var user = require('./user/user'),
	subject = require('./subject/subject'),
	article = require('./article/article'),
	label = require('./label/label');


var Striker = $(window.striker);


//事件通知,用户资料已经加载完成
function userLoad(e,d){
	subject.search('mySubject');
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

function init(){
	subject.init('index');
	article.init('index');
	user.init();
	label.init();
}

init();

/*
require('./common/global.js');

var list = require('../tpl/index/list.hbs');

var data = {
    body: 'this is body',
    title: 'hi title'
};
var dom = list(data);
document.write(dom);

console.log('test!!');
console.log('index loaded');
*/