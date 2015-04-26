//
require('../lib/player/video.dev');
require('../lib/flex/flexpaper');
require('../lib/flex/flexpaper_handlers');
require('../lib/jq.rotate');
var tmpl = {
	body : require('../../tpl/review/body.ejs'),
	main : require('../../tpl/review/main.ejs'),
	list : require('../../tpl/review/list.ejs')
}

var striker = $(window.striker);

var db = {}
module.exports = db;

var getSize = function(size){
    var prec = 3;
    var size = Math.round(Math.abs(size));
	var units = ['B','KB','MB',"GB","TB"];

	var unit =  Math.min(4, Math.floor(Math.log(size) / Math.log(2) / 10));

    size = size * Math.pow(2, -10 * unit);
    var digi = prec - 1 - Math.floor(Math.log(size) / Math.log(10));
    size = Math.round(size * Math.pow(10, digi)) * Math.pow(10, -digi);
    return getNums(size) + units[unit];    	
}

var getNums = function(x){
	if(x===0){
		return 0;
	}
	var f_x = parseFloat(x);  
	if (isNaN(f_x))  
	{  
	//alert('function:changeTwoDecimal->parameter error');  
		return 0;  
	}  
	var f_x = Math.ceil(x*100)/100;  
	var s_x = f_x.toString();  
	var pos_decimal = s_x.indexOf('.');  
	if (pos_decimal < 0)  
	{
		return f_x;
	}  
	while (s_x.length <= pos_decimal + 2)  
	{  
		s_x += '0';  
	} 
	return s_x;      	
}

var getTime;


function review(data){
	getTime = window.striker.util.formatTime;

	this.bg = $('<div id="reviewBgs"></div>');
	this.dom = $('<div id="reviewWin"></div>');
	this.data = {};
	this.nowId = data.id;
	this.map = {};
	this.list = [];
	this.listItem = [];


	$('body').append(this.bg);
	$('body').append(this.dom);

	var html = tmpl.body();
	this.dom.html(html);

	this.reviewDiv = $("#reviewDiv");
	this.reviewBlock = $("#reviewBlock");

	this.checkData(data);

	this.showList();
	this.showOne();

	this.show();
	this.bindAction();
};

review.prototype.showList = function(id){
	var listHtml = tmpl.list({
		list : this.listItem,
		id : this.nowId
	});
	
	this.reviewBlock.html(listHtml);
}

review.prototype.showOne = function(id,idx){
	var nowId = id || this.nowId;
	var obj = this.data[nowId];

	if(obj){
		if(obj.type === 2){
			var html = tmpl.main(obj);
			this.reviewDiv.html(html);			
              var purl = encodeURIComponent('/cgi/resource/preview?id='+obj.id);
              $('#documentViewer').FlexPaperViewer(
                { config : {
                    SWFFile : purl,
                    jsDirectory : '/js/lib/flex/',
                    Scale : 0.8,
                    ZoomTransition : 'easeOut',
                    ZoomTime : 0.5,
                    ZoomInterval : 0.2,
                    FitPageOnLoad : true,
                    FitWidthOnLoad : false,
                    FullScreenAsMaxWindow : false,
                    ProgressiveLoading : false,
                    MinZoomSize : 0.2,
                    MaxZoomSize : 5,
                    SearchMatchAll : false,
                    InitViewMode : 'Portrait',
                    RenderingOrder : 'flash',
                    StartAtPage : '',
                    ViewModeToolsVisible : true,
                    ZoomToolsVisible : true,
                    NavToolsVisible : true,
                    CursorToolsVisible : true,
                    SearchToolsVisible : true,
                    WMode : 'window',
                    localeChain: 'zh_CN'
                }}
              );  		
        }else if(obj.type === 8){
        	var purl = 'cgi/resource/preview?id='+obj.id;
        	var text = $.ajax({
				url: purl,
				async: false,
				error : function(data){
					return false;
				}
			}).responseText;

        	obj.text = text;
        	console.log(obj);
			var html = tmpl.main(obj);
			this.reviewDiv.html(html);
			console.log(text);
        }else{
			var html = tmpl.main(obj);
			this.reviewDiv.html(html);        	
        }
	}

}

review.prototype.checkData = function(data){
	var idx = 0;
	for(var i in data.list){
		var item = data.list[i];
		this.map[item.id] = idx;
		if(item.id === this.nowId){
			this.nowIdx = idx;
		}
		this.list.push(item.id);
		this.listItem.push(item);

		item.size = getSize(item.size);
		item.time = getTime(item.createTime);
		this.data[item.id] = item;
		idx++;
	}
}

review.prototype.show = function(){
	this.bg.show();
	this.dom.show();
}

review.prototype.hide = function(){
	this.bg.hide();
	this.dom.hide();	
	this.list = [];
	this.listItem = [];
	this.reviewBlock.html('');
}

//更换数据
review.prototype.changeData = function(data){
	this.checkData(data);
	this.showList();
	this.showOne();
	this.show();
}

review.prototype.showNext = function(e){
	if(this.nowIdx < this.list.length-1){
		this.nowIdx++
	}
	this.nowId = this.list[this.nowId];
	this.reviewBlock.find('li').eq(this.nowIdx).click();
}

review.prototype.showPre = function(e){
	if(this.nowIdx > 0){
		this.nowIdx--;
	}
	this.nowId = this.list[this.nowId];
	this.reviewBlock.find('li').eq(this.nowIdx).click();
}

review.prototype.showIdx = function(e){
	
}

review.prototype.showFile = function(e){
	var target = $(e.target),
		id = target.data('id');

	if(id){
		this.nowIdx = this.map[id];
		this.showOne(id);
		var list = this.reviewBlock.find('li');
		list.removeClass('selected');
		$("#review"+id).addClass('selected');
		//list[this.nowIdx].addClass('selected');
	}


}

review.prototype.bindAction = function(data){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			//_this.target = target;
			_this[action](e);
		}			
	})
}

review.prototype.close = function(){
	this.hide();
}

db.review = review;

var rv;

striker.bind('review',function(e,d){
	if(!rv){
		rv = new review(d);
	}else{
		rv.changeData(d);
	}
});