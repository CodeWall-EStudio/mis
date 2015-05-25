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

	console.log(cgi);

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
	this.orderby = 'createTime';
	this.lasttime = 0;
	this.tmplasttime = 0;
	this.newlist = [];
	this.newDom;

	this.reftime = 0;

	this.subid = nowSubId;
	this.msg = window.striker.msg;

	this.my = data.user.myInfo;

	this.rdata = {};

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

article.prototype.addnewArticle = function(){
	var data = this.checkData({
		list : this.newlist,
		my : this.my
	});
	var html = tmpl.list(data);	
	this.dom.prepend(html);
	this.newlist = [];
	this.lasttime = this.tmplasttime;
}

article.prototype.haveNew = function(){
	var _this = this;
	if(!this.newDom){
		
		$('.artice-info').prepend('<div class="have-new">有新的帖子</div>');
		this.newDom = $(".have-new");
		this.newDom.bind('click',function(){
			_this.newDom.hide();
			_this.addnewArticle();
	
		});
	}else{
		this.newDom.show();
	}
}

article.prototype.getRef = function(){
	var _this = this;
	//this.lasttime = 1432461927000;
	var param = {
		subjectId : this.subid,
		time : new Date(this.lasttime).pattern('yyyy-MM-dd HH:mm:ss')
	}
	cgi.ref(param,function(res){
		if(res.code === 0){
			if(res.data.list.length > 0){
				_this.newlist = res.data.list;
				_this.tmplasttime = res.data.lastTime;
				_this.haveNew();
			}
		}
	});
}

article.prototype.startRef = function(){
	var _this = this;
	_this.reftime = setInterval(function(){
		_this.getRef();
	},10000);	
}

//绑定事件
article.prototype.bindAction = function(){
	var _this = this;
	striker.bind('newarticle',function(e,d){
		_this.prependToList(d);
	})

	striker.bind('article:orderbyupdate',function(e,d){
		_this.orderByUpdate();
	})

	striker.bind('article:orderbycreate',function(e,d){
		_this.orderByCreate();
	})

	striker.bind('autorefresh',function(e,d){
		//自动刷新
		if(d){
			_this.reftime = setInterval(function(){
				_this.startRef();
			},10000);
		}else{
			clearInterval(_this.reftime);
		}
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

//按更新时间排序
article.prototype.orderByUpdate = function(){
	this.start = 0;
	this.orderby = 'updateTime';
	this.dom.html('');
	this.search({
		start : this.start,
		limit : this.limit,
		subjectId : this.subid,
		orderby : this.orderby
	});
}
//按发表时间排序
article.prototype.orderByCreate = function(){
	this.start = 0;
	this.orderby = 'createTime';
	this.dom.html('');
	this.search({
		start : this.start,
		limit : this.limit,
		subjectId : this.subid,
		orderby : this.orderby
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
		subjectId : this.subid,
		orderby : this.orderby
	});
}

//验证数据
article.prototype.checkData = function(data){
	var list = [];
	for(var i = 0,l=data.list.length;i<l;i++){
		var item = data.list[i];
		if(item.resource){
		item.imgnum = this.getimg(item.resource);
			this.rdata[item.id] = item.resource;
		}
		list.push(item);
	}
	data.list = list;
	data.sid = nowSubId;
	return data;
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
			subjectId : this.subid,
			orderby : this.orderby
		}
	}

	cgi.search(param,function(res){
		
		if(res.code === 0){
			if(!_this.start){
				_this.lasttime = res.data.lastTime;
				_this.startRef();
			}
			_this.total = res.data.total;
			_this.length += res.data.list.length;
			_this.start += _this.limit;
			_this.loading = false;

			var data = _this.checkData(res.data);
			data.my = _this.my;
			var html = tmpl.list(data);

			if(res.data.top.length){
				var html1 = tmpl.top({
					list : res.data.top
				})
				$("#articleTop").html(html1);
			}
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
	var data = this.checkData({list:[param],my:this.my});
	var html = tmpl.list(data);

	this.dom.prepend(html);
}

//预览主题相关资源
article.prototype.review = function(e){
	var target = $(e.target),
		pid = target.data('pid'),
		id = target.data('id');

	if(id){
		striker.trigger('review',{
			id : id,
			list : this.rdata[pid]
		})
	}
};

aList.article = article;