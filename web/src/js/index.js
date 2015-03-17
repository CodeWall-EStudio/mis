var user = require('./user/user'),
	subject = require('./subject/subject'),
	article = require('./article/article');


function init(){
	user.init();
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