require('../lib/player/video.dev');
videojs.options.flash.swf = "../lib/player/video-js.swf";

var cgi = require('../common/cgi').resource,
	pat = require('./markpat'),
	list = require('./marklist');

var tmpl = {
	body : require('../../tpl/resource/mark.ejs'),
	list : require('../../tpl/resource/marklist.ejs')
}

var db = {}
module.exports = db;

var striker = $(window.striker);

function mark(data){
	this.init = false;
	if(!this.init){
		this.bg = $('<div id="markBgs"></div>');
		this.dom = $('<div id="markWin"></div>');

		this.data = {};

		$('body').append(this.bg);
		$('body').append(this.dom);

		this.rid = data.id;

		var html = tmpl.body(data);
		this.dom.html(html);

		this.act1 = $("#markAction1");
		this.act2 = $("#markAction2");

		this.show();

		//初始化视频
		this.play = videojs("markPlay",{
			"preload": "auto",
			"controls": true,
			"width": 640,
			"height" : 320
		});
		//http://vjs.zencdn.net/v/oceans.mp4
		//this.play.src('/kp.mp4');
		this.play.src('/cgi/resource/download?id='+this.rid);
		//标记需要用的dom
		this.pdom = this.dom.find('.vjs-control-bar');
		this.content = $("#markContent");

		this.list = new list(this.rid,$("#markList"));

		this.bindAction();

		this.init = true;
	}else{
		this.data = {};

		this.rid = data.id;

		this.show();

		this.list = new list(this.rid,$("#markList"));

		this.play = videojs("markPlay",{
			"preload": "auto",
			"controls": true,
			"width": 640,
			"height" : 320
		});
		this.play.src('/kp.mp4');
	}
}

mark.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	});
};


mark.prototype.close = function(){
	this.hide();	
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
	this.play.pause();
	this.list = null;
}

mark.prototype.showmark = function(){
	this.act1.hide();
	this.act2.show();
}

mark.prototype.cut = function(){
	
}

mark.prototype.submit = function(){
	var self = this;
	var rid = this.rid;
	var val = this.content.val();
	if(val === ''){
		return;
	}

	var times = this.mark.get();
	var param = {
		mark : val,
		startTime : times.st,
		endTime : times.et,
		id : rid
	}

	cgi.mark(param,function(res){
		if(res.code === 0){
			self.list.addOne(red.data);
		}
	});
	/*
	this.play.duration() 总长度
	*/

	// console.log(this.play.currentTime());
	// console.log(this.play.bufferedPercent());
	// console.log(this.play.duration());
	// console.log(this.mark.get());
	//this.play.addTextTrack('descriptions','testdtest');
}

mark.prototype.startmark = function(){
	this.play.play();

	this.mark = new pat(this.pdom);
	this.mark.setTime(this.play.duration());
}

mark.prototype.hidemark = function(){
	this.act1.show();
	this.act2.hide();	
	if(this.mark){
		this.mark.destroy();
		this.mark = null;
	}
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