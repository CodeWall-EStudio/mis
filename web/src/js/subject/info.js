//拉主题内容
var sInfo = {};
var cgi,
	tmpl;
module.exports = sInfo;

var subDom = $("#subjectHead");
var subAsideDom = $("#subjectAside");
var postArea = $("#postArticle");

function bindAction(){
	
}

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

sInfo.info = function(id){
	this.sid = id;
	this.dom = subDom;
	this.asideDom = subAsideDom;
	this.getData();
	this.bindAction();
	this.followBtn; //关注按钮
	this.manageBtn; //管理按钮
	this.timeBtn;   //按时间排序
	this.updateBtn; //按更新时间排序
}

sInfo.info.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');

		if(_this[action]){
			_this[action](e);
		}
	});		
}

//拉单个帖子
sInfo.info.prototype.getData = function(){
	var id = this.sid;
	var _this = this;
	cgi.info({id:id},function(res){
		if(res.code === 0){
			var html = tmpl.head(res.data);
			_this.dom.html(html);
			_this.followBtn = _this.dom.find('.follow-btn');
			_this.manageBtn = _this.dom.find('.manage-btn')
			_this.timeBtn = _this.dom.find('.time-btn')
			_this.updateBtn = _this.dom.find('.update-btn')
		}
	})	
}

//关注单个帖子
sInfo.info.prototype.follow = function(){
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
				_this.followBtn.addClass('followed').html('已关注');
			}else{
				_this.followBtn.removeClass('followed').html('关注');
			}
		}
	});
}