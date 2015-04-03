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


Label.label = function(name){
	this.dom = $("#"+name);

	this.nowDom = this.dom.find('.now-label-list');
	this.addDom = this.dom.find('.add-label-area');
	// if(type === 'sub'){
	// 	this.addDom = $('#addSubLabel');
	// 	this.nowDom = $('#nowSubLabel');
	// }else{
	// 	this.addDom = $('#addArtLabel');
	// 	this.nowDom = $('#nowArtLabel');
	// }
	this.listDom = this.addDom.find('.label-list');
	this.btnDom = this.addDom.find('.btn');
	this.inputDom = this.addDom.find('.form-control');
	this._selectDom;//当前选中的元素

	//默认没有标签
	this.nowDom.hide();
	this.addDom.hide();

	//已经选中的idmap
	this.idmap = {};

	this.map = {};
	this.getData();	
	this.bindAction();
}

Label.label.prototype.bindAction = function(){
	var _this = this;
	this.dom.bind('click',function(e){
		var target = $(e.target),
			action = target.data('action');
		_this._selectDom = target;

		if(_this[action]){
			_this[action](e);
		}
	});
	//
	// this.nowDom.bind('click',function(e){
	// 	var target = $(e.target),
	// 		action = target.data('action');
	// 	_this._selectDom = target;

	// 	if(_this[action]){
	// 		_this[action](e);
	// 	}
	// });
}

Label.label.prototype.create = function(){
	var val = this.inputDom.val();
	if(val !== ''){
		var param = {
			name : val
		};
		var _this = this;

		cgi.create(param,function(res){
			if(res.code === 0){
				_this.map[res.data.id] = res.data;
				var html = tmpl.list({list:[res.data]});
				_this.listDom.append(html);
			}
		});
	}
}

Label.label.prototype.showlist = function(e){
	// /console.log(this._selectDom);
	if(this._selectDom.hasClass('fui-plus')){
		this._selectDom.removeClass('fui-plus').addClass('fui-cross');
		this.addDom.show();
	}else{
		this._selectDom.addClass('fui-plus').removeClass('fui-cross');
		this.addDom.hide();
	}
	//this.addDom.show();
	//this.nowDom.show();

	//fui-cross
	//fui-plus
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

	this.idmap[id] = 1;
	if(this.nowDom.find('.label'+id).length === 0){
		var html = tmpl.one(param);
		this.nowDom.append(html).show();
	}
}

Label.label.prototype.getLabelList = function(){
	var list = [];
	// console.log(this.nowDom.find(".tag").length);
	// this.nowDom.find(".tag").each(function(e){
	// 	var target = $(e.target),
	// 		id = target.data('id');
	// 	if(id){
	// 		list.push(id);
	// 	}				
	// })	
	for(var i in this.idmap){
		list.push(i);
	}
	return list;
}

Label.label.prototype.clear = function(){
	this.idmap = {};
	this.nowDom.html('').hide();

	var dom = this.dom.find('.show-btn');
	dom.addClass('fui-plus').removeClass('fui-cross');
	this.addDom.hide();	
}

//删除
Label.label.prototype.remove = function(e){
	var target = $(e.target),
		p = target.parent();

	var id = p.data('id');
	delete this.idmap[id];
	p.remove();
}


Label.init = function(){

}