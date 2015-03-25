var cgi = require('../common/cgi').label,
	data = require('../data/data').label,
	striker = $(window.striker);

var Label = {},
	_this = Label;
var tmpl = {
	list : require('../../tpl/label/list.ejs'),
	one : require('../../tpl/label/one.ejs')
};

module.exports = Label;

function getList(){
	cgi.list(function(res){
		if(res.code === 0){
			
		}
	});
}


Label.label = function(type){
	if(type === 'sub'){
		this.addDom = $('#addSubLabel');
		this.nowDom = $('#nowSubLabel');
	}else{
		this.addDom = $('#addArtLabel');
		this.nowDom = $('#nowArtLabel');
	}
	this.listDom = this.addDom.find('.label-list');
	this.btnDom = this.addDom.find('.btn');
	this.inputDom = this.addDom.find('.form-control');
	this._selectDom;//当前选中的元素
	this.map = {};
	this.getData();	
	this.bindAction();
}

Label.label.prototype.bindAction = function(){
	var _this = this;
	this.addDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		_this._selectDom = target;

		if(_this[action]){
			_this[action](e);
		}
	});
	//
	this.nowDom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		_this._selectDom = target;

		if(_this[action]){
			_this[action](e);
		}
	});
}

Label.label.prototype.create = function(){
	var val = this.inputDom.val();
	if(val !== ''){
		var param = {
			name : val
		};
		var _this = this;

		cgi.create(param,function(res){
			console.log(res);
			if(res.code === 0){
				_this.map[res.data.id] = res.data;
				var html = tmpl.list({list:[res.data]});
				_this.listDom.append(html);
			}
		});
	}
}

Label.label.prototype.getData = function(){
	var _this = this;
	cgi.list({},function(res){
		if(res.code === 0){
			var html = tmpl.list({list:res.data});
			_this.listDom.html(html);
			for(var i = 0,l=res.data.length;i<l;i++){
				var item = res.data[i];
				_this.map[item.id] = item;
			}
		}
	});
}

Label.label.prototype.select = function(e){
	var id = this._selectDom.data('id');
	var param = {
		list : [this.map[id]]
	}
	if(this.nowDom.find('.label'+id).length === 0){
		var html = tmpl.one(param);
		this.nowDom.append(html);
	}
}

//删除
Label.label.prototype.remove = function(e){
	$(e.target).parent().remove();
}


Label.init = function(){

}