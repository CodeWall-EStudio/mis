var cgi = require('../common/cgi').resource;
var tmpl = {
	list : require('../../tpl/resource/marklist.ejs')
}

var striker = $(window.striker);

var list = function(id,dom){
	this.start = 0,
	this.limit = 10;
	this.id = id;

	this.dom = dom;
	dom.html('');
	this.loading = false;
	this.getData();
	this.bindAction();
}

list.prototype.getTime = function(time){
	var t;

	//一分钟以内
	if(time<60){
		if(time<10){
			time = '0'+time;
		}
		t = '00:00:'+time;
	//一小时以内
	}else if(time<3600){
		var m = Math.floor(time/60);
		var s = time%60;
		if(s < 10){
			s = '0'+s;
		}
		if(m < 10){
			m = '0'+m;	
		}
		t = '00:'+m+':'+s;
	}else{
		var m = Math.floor(time/60);
		var h = Math.ceil(m/60);
		m = m%60;
		var s = time%60;
		if(h < 10){
			h = '0'+h;
		}		
		if(s < 10){
			s = '0'+s;
		}
		if(m < 10){
			m = '0'+m;	
		}
		t = h+':'+m+':'+s;
	}

	return t;
}

list.prototype.addOne = function(data){
	if(data){
		var html = tmpl.list({
			list : [data],
			time : this.getTime
		});
		this.dom.prepend(html);		
	}
}

list.prototype.bindAction = function(){
	this.dom.bind('click',function(e){
		var target = $(e.target);
		if(e.target.nodeName != 'LI'){
			target = target.parents('li.item');
		}
		var st = target.data('start'),
			et = target.data('end');
		striker.trigger('toplay',{
			st : st,
			et : et
		})

	});

	this.dom.on('scroll',function(){
        var scrollDom = $(this)[0];
        var pageHeight = $(this).height();
        var scrollTop = scrollDom.scrollTop;
        var scrollHeight = scrollDom.scrollHeight;		

        //console.log(pageHeight,scrollTop,scrollHeight,scrollTop + pageHeight);
        //判断是否到底了
        if(scrollTop + pageHeight >= scrollHeight -30){
            console.log('end');
            //_this.loadMore();
        }         
	});
}

list.prototype.loadMore = function(){
	if(this.loading){
		return;
	}
	this.getData();
}

list.prototype.getData = function(){
	var _this = this;
	this.loading = true;
	var param = {
		id : this.id,
		start : this.start,
		limit : this.limit
	}
	cgi.list(param,function(res){
		if(res.code === 0){
			_this.loading = false;
			_this.start += this.limit;
			var html = tmpl.list({
				list : res.data.list,
				time : _this.getTime
			});
			_this.dom.append(html);
		}
	});

}

module.exports = list;