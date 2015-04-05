//主题列表
var aList = {},
	data = require('../data/data'),
	cgi,
	tmpl,
	nowSubId = 0,
	loading = false;
	start = 0,
	limit = 20;

module.exports = aList;
var listDom = $("#articleList");

aList.init = function(id,module,tmp){
	nowSubId = id;
	cgi = module;
	tmpl = tmp;

	new article();

	// aList.search({
	// 	start : start,
	// 	limit : limit,
	// 	subjectId : nowSubId
	// })
}

var article = function(){
	this.dom = $("#articleList");
	this.start = 0,
	this.limit = 20;
	this.total = 0;
	this.length = 0;
	this.end = false;
	this.loading = false;
	this.subid = nowSubId;

	this.bindAction();
	this.search();
}

//计算图片的个数
article.prototype.getimg = function(data){
	var num = 0;
	if(data){
		for(var i =0,l=data.length;i<l;i++){
			var item = data[i];
			if(item.type === 1){
				num++;
			}
		}
	}
	return num;
}


article.prototype.checkData = function(data){
	var list = [];
	for(var i = 0,l=data.list.length;i<l;i++){
		var item = data.list[i];
		item.imgnum = this.getimg(item.resource);
		list.push(item);
	}
	data.list = list;
	data.sid = nowSubId;
	return data;
}

//绑定事件
article.prototype.bindAction = function(){
	var _this = this;
    $(document).on('scroll',function(e){
        var scrollDom = document.body;
        var pageHeight = document.documentElement.clientHeight;
        var scrollTop = scrollDom.scrollTop;
        var scrollHeight = scrollDom.scrollHeight;

        //判断是否到底了
        if(scrollTop + pageHeight >= scrollHeight){
            //console.log('end');
            _this.loadMore();
        }                
    });	
}

//加载更多
article.prototype.loadMore = function(){
	if(this.loading || this.end){
		return;
	}
	this.search({
		start : this.start,
		limit : this.limit,
		subjectId : this.subid
	});
}

//添加到前面
article.prototype.prependToList = function(){
	
}

//拉帖子列表
article.prototype.search = function(param){
	var _this = this;
	if(this.loading){
		return;
	}
	this.loading = true;
	if(!param){
		param = {
			start : this.start,
			limit : this.limit,
			subjectId : this.subid
		}
	}

	cgi.search(param,function(res){
		
		if(res.code === 0){
			_this.total = res.data.total;
			_this.length += res.data.list.length;
			_this.start += _this.limit;
			_this.loading = false;

			var data = _this.checkData(res.data);
			var html = tmpl.list(data);
			_this.dom.append(html);
			if(_this.length >= _this.total){
				_this.end = true;
			}
		}
	});	
}

//把新发布的帖子加到列表最前面
aList.prependToList = function(param){
		var html = tmpl.list({list:[param]});
		listDom.prepend(html);
}

//加载更多数据
/*
aList.loadMore = function(){
	console.log(this.end);
	if(loading || this.end){
		return;
	}
	aList.search({
		start : start,
		limit : limit,
		subjectId : nowSubId
	})
}



//搜索数据
aList.search = function(param){
	loading = true;
	cgi.search(param,function(res){
		if(res.code === 0){
			_this.total = res.total;
			var html = tmpl.list(res.data);
			start += limit;
			loading = false;
			listDom.append(html);
		}else{

		}

	});
}
*/