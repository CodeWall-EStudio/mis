require('../lib/player/video.dev');

var striker = $(window.striker);
var rv;

var db = {}
module.exports = db;

function video(data){
	this.dom = $("#reviewVideo");
	this.ddom = $("#dragDom");
	this.vdom = $("#videoDom");
	this.data = data;

	this.top = 0;
	this.left = 0;
	this.stop = 0;
	this.sleft = 0;

	//console.log(window.screen.height ,window.screen.width );
	this.maxwidth = window.screen.width;
	this.maxheight = window.screen.height;

	this.play = videojs("videoDom",{
		"preload": "auto",
		"controls": true,
		"width": 640,
		"height" : 320
	});
	//this.play.src('/kp.mp4');

          // <source src="/cgi/resource/download?id=<%-id%>" type='video/mp4' />
          // <source src="/cgi/resource/download?id=<%-id%>" type='video/webm' />
          // <source src="/cgi/resource/download?id=<%-id%>" type='video/ogg' />
          // <track kind="captions" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->
          // <track kind="subtitles" src="demo.captions.vtt" srclang="en" label="English"></track><!-- Tracks need an ending tag thanks to IE9 -->	

	//this.vdom.html(list.join(''));
	this.bindAction();
	this.show();
}

video.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			//_this.target = target;
			_this[action](e);
		}			
	});

	this.ddom.bind('mousedown',function(e){
		_this.stop = e.pageY;
		_this.sleft = e.pageX;

		_this.ddom.bind('mousemove',function(e){
			_this.drag(e);
		});
	});

	this.ddom.bind('mouseup',function(e){
		var x = e.pageX - _this.sleft + _this.top,
			y = e.pageY - _this.stop + _this.left;

		if(x<0){
			x = 0;
		}
		if(y<0){
			y = 0;
		}
		
		_this.top = y;
		_this.left = x;
		//console.log('up',e.pageX,_this.sleft,_this.left);

		_this.ddom.unbind('mousemove');
	})	

	this.ddom.bind('mouseleave',function(e){
		_this.ddom.unbind('mousemove');
	});	
};

video.prototype.show = function(data){

	var d = data || this.data;
	if(data){
		this.data = data;
	}

	this.play.src('/cgi/resource/download?id='+this.data.id);
    this.dom.show();

}

video.prototype.hide = function(){
	this.dom.hide();
	this.play.pause();
}

video.prototype.showVideo = function(){

}

video.prototype.closelink = function(){
	this.hide();
}

video.prototype.drag = function(e){

	var x = e.pageX - this.sleft + this.left,
		y = e.pageY - this.stop + this.top;
	//console.log(x,y,this.left,this.top);
	//console.log(x,y,this.sleft,this.left,e.pageX);
	if(x<0){
		x = 0;
	}
	if(y<0){
		y = 0;
	}

	//console.log('move',x,y);
	this.dom.css('top',y+'px');
	this.dom.css('left',x+'px');
	//console.log(this,this.stop,this.sleft,x,y);
}


striker.bind('showVideo',function(e,d){
	if(!rv){
		rv = new video(d);
	}else{
		rv.show(d);
	}
});