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
var striker = $(window.striker);

aList.init = function(id,module,tmp){
	nowSubId = id;
	cgi = module;
	tmpl = tmp;

	//return new article();
}

function article(){
	this.dom = $("#articleList");
	this.start = 0,
	this.limit = 20;
	this.total = 0;
	this.length = 0;
	this.end = false;
	this.loading = false;

	this.subid = nowSubId;
	this.msg = window.striker.msg;

	this.bindAction();
	this.search();
}

//把回复相关的东东绑定进来
article.prototype.bind = function(obj){
	this.commentPost = obj.post;
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
	striker.bind('newarticle',function(e,d){
		_this.prependToList(d);
	})

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

	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(action && _this[action]){
			_this.target = target;
			_this[action](e);
		}
	})    
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

article.prototype.setup = function(){
	var id = this.target.data('id'),
		star = parseInt(this.target.data('status'));

	if(!star){
		star = 0;
	}

	if(id){
		var dom = this.target;
		var param = {
			articleId : id,
			isStar : star ? 0 :1
		};
		var text = star?'赞':'已赞';
		cgi.star(param,function(res){
			if(res.code === 0){
				dom.data('status',param.isStar);
				dom.html('<span></span>'+text);
			}
		});
	}
}

article.prototype.collect = function(){
	var id = this.target.data('id');

	if(id){
		var dom = this.target;
		var param = {
			articleId : id
		};
		cgi.collect(param,function(res){
			if(res.code === 0){
				dom.attr('data-id',0);
			}
		});
	}
}

article.prototype['delete'] = function(){
	var id = this.target.data('id');

	if(id){

		var _this = this;
		this.msg.confirm('确定要删除该帖子?',null,function(){
			var param = {
				articleId : id
			};
			cgi['delete'](param,function(res){
				if(res.code === 0){
					$(".article"+id).remove();
				}
			});
		});
	}
}

article.prototype.replay = function(){
	var id = this.target.data('id');
	if(id){
		this.commentPost.showPost(id);
	}
}

//把新发布的帖子加到列表最前面
article.prototype.prependToList = function(param){
	var html = tmpl.list({list:[param]});
	this.dom.prepend(html);
}


//把新发布的帖子加到列表最前面
aList.prependToList = function(param){
		var html = tmpl.list({list:[param]});
		listDom.prepend(html);
}

aList.article = article;

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