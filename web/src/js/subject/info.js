//拉主题内容
var sInfo = {};
var cgi,
	tmpl,
	data = require('../data/data');
module.exports = sInfo;

var striker = $(window.striker);

var subDom = $("#subjectHead");
var subAsideDom = $("#subjectAside");
var postArea = $("#postArticle");
var myInfo;

sInfo.init = function(type,module,tmp){
	cgi = module;
	tmpl = tmp;
}

//拉取一个主题的内容
// sInfo.info = function(id,cb){
// 	cgi.info({id:id},function(res){
// 		if(res.code === 0){
// 			var html = tmpl.head(res.data);
// 			subDom.html(html);
// 		}
// 	})
// }

var info = function(id){
	this.sid = id;
	this.dom = subDom;
	this.asideDom = subAsideDom;
	this.getData();
	this.bindAction();
	this.followBtn; //关注按钮
	this.manageBtn; //管理按钮
	this.timeBtn;   //按时间排序
	this.updateBtn; //按更新时间排序

	this.data = {};

	myInfo = data.user.myInfo;

	this._selectDom;
	this.msg = window.striker.msg;
}

sInfo.info = info;

//删除主题相关资源
info.prototype.deleteResource = function(e){
	var id = this._selectDom.data('id');
	if(id){
	var _this = this;
		this.msg.confirm('确定要删除该资源?',null,function(){
			var param = {
				subjectId : _this.sid,
				resourceId : id
			}
			cgi.delresource(param,function(res){
				if(res.code === 0){
					$(".sub-resource-"+id).remove();
				}
			});
		});
	}
};

//把其他的对象的引用传进来.
info.prototype.bind = function(obj){
	this.post = obj.post;
}

info.prototype.manage = function(){
	this.post.edit(this.data);
}

//预览主题相关资源
info.prototype.review = function(e){
	var target = $(e.target),
		id = target.data('id');

	if(id){
		striker.trigger('review',{
			id : id,
			list : this.data.resourceList
		})
	}
};

info.prototype.autoref = function(e){
	var target = $(e.target);
	//console.log(target.prop('checked'));
	striker.trigger('autorefresh',target.prop('checked'))
}

//视频预览
info.prototype.showVideo = function(e){
	var target = $(e.target),
		id = target.data('id');

	if(id){
		striker.trigger('showVideo',{
			id : id,
			list : this.data.resourceList
		})
	}
}

info.prototype.link = function(e){
	$("#linkIframe").attr('src',this.data.link);
	$("#showLink").show();
}

info.prototype.closelink = function(e){
	$("#linkIframe").attr('src','blank');
	$("#showLink").hide();
}

//预览主题相关资源
info.prototype.mark = function(e){
	var target = $(e.target),
		id = target.data('id');

	if(id){
		striker.trigger('mark',{
			id : id
		})
	}
};

info.prototype.articleorderbyupdate = function(e){
	var target = $(e.target),
		pdom = target.parent('.btn-group');
	pdom.find('a').removeClass('active');
	target.addClass('active');
	striker.trigger('article:orderbyupdate');
}

info.prototype.articleorderbytime = function(e){
	var target = $(e.target),
		pdom = target.parent('.btn-group');	
	pdom.find('a').removeClass('active');
	target.addClass('active');
	striker.trigger('article:orderbycreate');
}

info.prototype.autorefresh = function(){
	striker.trigger('autorefresh',true);
}

info.prototype.bindAction = function(){
	var _this = this;

	$("#showLink").bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		_this._selectDom = target;
		if(_this[action]){
			_this[action](e);
		}
	})

	striker.bind('subjectUpdate',function(e,d){
		_this.data = d;
		d.myInfo = myInfo;
		var html = tmpl.head(d);
		_this.dom.html(html);

		if(d.data){
			d.data.my = data.user.myInfo;
			var html = tmpl.aside(d);
			
			_this.asideDom.html(html);			
		}
	});

	
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		_this._selectDom = target;
		if(_this[action]){
			_this[action](e);
		}
	});

	this.asideDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		_this._selectDom = target;
		if(_this[action]){
			_this[action](e);
		}
	});			
}

//拉单个帖子
info.prototype.getData = function(){
	var id = this.sid;
	var _this = this;
	cgi.info({id:id},function(res){
		if(res.code === 0){
			res.data.myInfo = myInfo;
			var html = tmpl.head(res.data);

			_this.dom.html(html);

			res.data.my = data.user.myInfo;
			var html = tmpl.aside(res.data);
			_this.data = res.data;
			_this.asideDom.html(html);

			_this.followBtn = _this.dom.find('.follow-btn');
			_this.manageBtn = _this.dom.find('.manage-btn')
			_this.timeBtn = _this.dom.find('.time-btn')
			_this.updateBtn = _this.dom.find('.update-btn')
		}
	})	
}

//关注单个帖子
info.prototype.follow = function(){
	var id = this.sid
		follow = 1;
	var _this = this;

	//判断是否已经follow了.
	if(this.followBtn.hasClass('followed')){
		follow = 0;
	}

	cgi.follow({subjectId:id,isFollow:follow},function(res){
		if(res.code === 0){
			if(follow){
				_this.followBtn.addClass('followed').html('<span class="follow"></span>已关注');
			}else{
				_this.followBtn.removeClass('followed').html('<span class="follow"></span>关注');
			}
		}
	});
}