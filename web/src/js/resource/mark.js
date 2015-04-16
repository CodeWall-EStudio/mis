require('../lib/player/video.dev');

var cgi = require('../common/cgi').resource;

var tmpl = {
	body : require('../../tpl/review/mark.ejs'),
	list : require('../../tpl/review/mark-list.ejs')
}

var db = {}
module.exports = db;

var striker = $(window.striker);



function mark(data){
	console.log(data);

	this.bg = $('<div id="markBgs"></div>');
	this.dom = $('<div id="markWin"></div>');
	this.data = {};

	$('body').append(this.bg);
	$('body').append(this.dom);

	this.rid = data.id;

	var html = tmpl.body(data);
	this.dom.html(html);

	this.show();

	console.log(videojs);
	this.play = videojs("markPlay");
	this.play.src('/cgi/resource/preview?id='+this.rid);
	//this.play.play();
	console.log(this.play);
}


mark.prototype.changeData = function(d){
	this.rid = d.id;
	var html = tmpl.body({
		id : this.rid
	});
	this.dom.html(html);	
}

mark.prototype.show = function(){
	this.bg.show();
	this.dom.show();
}

mark.prototype.hide = function(){
	this.bg.hide();
	this.dom.hide();
}


db.mark = mark;

var mk;

striker.bind('mark',function(e,d){
	if(!mk){
		mk = new mark(d);
	}else{
		mk.changeData(d);
	}
});