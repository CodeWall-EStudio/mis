require('../lib/player/video.dev');
videojs.options.flash.swf = "../lib/player/video-js.swf";

var cgi = require('../common/cgi').resource,
	pat = require('./markpat'),
	list = require('./marklist');

var tmpl = {
	body : require('../../tpl/resource/mark.ejs'),
	list : require('../../tpl/resource/marklist.ejs')
}

var striker = $(window.striker);

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
		//this.play.src('/kp.mp4');
		this.play.src('/cgi/resource/download?id='+this.rid);
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

	striker.bind('toplay',function(e,d){
		_this.toplay(d);
	})
};

mark.prototype.getLay = function(d){
	var alltime = this.play.duration();
	var width = 360;
	var s = Math.ceil(d.st/alltime*100);
		e = Math.ceil(d.et/alltime*100);
	var l = (e-s)/100*360;

	return {
		s : s,
		l : l
	}
}

mark.prototype.toplay = function(d){
	var _this = this;
	var time = d.et-d.st;
	clearTimeout(this.loptime);
	if(this.playmark){
		this.playmark.remove();
	}

	var lay = this.getLay(d);
	this.playmark = $('<div class="select-marktime"><div class="mark-block" style="margin-left:'+lay.s+'%;width:'+lay.l+'px"></div></div>');

	this.pdom.append(this.playmark);

	var lop = d.et - d.st;

	this.loptime = setTimeout(function(){
		_this.playmark.remove();	
		_this.play.pause();
	},lop*1000);

	this.play.currentTime(d.st);
	this.play.play();
}


mark.prototype.close = function(){
	this.hide();	
}

mark.prototype.changeData = function(d){
	this.rid = d.id;

	this.show();

	this.list = new list(this.rid,$("#markList"));

	this.play = videojs("markPlay",{
		"preload": "auto",
		"controls": true,
		"width": 640,
		"height" : 320
	});
	//this.play.src('/kp.mp4');
	this.play.src('/cgi/resource/download?id='+this.rid);	
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
	var rid = this.rid;	
	var times = this.mark.get();
	if(this.mark){
		var param = {
			id : rid,
			startTime : times.st,
			length : times.et - times.st
		}
		cgi.split(param,function(res){
			if(res.code === 0){

			}
		});
	}else{

	}
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
			self.content.val('');
			self.list.addOne(res.data);
		}
	});
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