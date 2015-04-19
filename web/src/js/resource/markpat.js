function checkSize(){
	
}

var width = 360;

var pat = function(d,w,time){
	var self = this;
	this.dom = d;
	this.maxWidth = w || width;
	//var dom = $('<div class="select-marktime"><div class="mark-pat"></div><div class="mark-pat1"></div></div>');
	var dom = $('<div class="select-marktime"><div class="mark-block"></div><div class="mark-pat"></div><div class="mark-pat1"></div></div>');
	this.pdom = dom;
	this.dom.append(this.pdom);

	var pat = dom.find('.mark-pat'),
		pat1 = dom.find('.mark-pat1');
	this.block = dom.find('.mark-block');

	this.mark;

	var ps = 0,
		ps1 = 0,
		pe = 0,
		pe1 = 0,
		pw = 360;

	this.pstart = 0;
	this.pstart1 = 0;
	this.pend = 0;
	this.pend1 = 0;


	pat.on('mousedown',function(e){
		self.pstart = e.pageX;
		pat.on('mousemove',function(e){
			var nx = e.pageX;
			self.pend = nx-self.pstart;
			if(self.pend<0){
				self.pend = 0;
			}
			pat.css('margin-left',self.pend+'px');
			self.changeBlock();
		})
	}).on('mouseup',function(e){
		pat.off('mousemove')
	}).on('mouselevel',function(e){
		pat.off('mousemove')
	});

	pat1.on('mousedown',function(e){
		self.pstart1 = e.pageX;
		pat1.on('mousemove',function(e){
			var nx = e.pageX;
			self.pend1 = self.pstart1-nx;
			if(self.pend1<0){
				self.pend1 = 0;
			}
			self.check();
			if(self.pend1 > 360){
				self.pend1 = 360;
			}
			self.pend1 = self.check();
			pat1.css('margin-right',self.pend1+'px');
			self.changeBlock();
		})
	}).on('mouseup',function(){
		pat1.off('mousemove')
	}).on('mouselevel',function(){
		pat1.off('mousemove')
	});
}

pat.prototype.changeBlock = function(){
	this.block.css('margin-left',this.pend+'px');

	var width = this.maxWidth - this.pend - this.pend1;
	this.block.width(width);
}

pat.prototype.get = function(){
	var st = Math.floor(this.pend/this.maxWidth*this.alltime);
	var et = Math.floor((this.maxWidth-this.pend1)/this.maxWidth*this.alltime);

	return {
		st : st,
		et : et
	}
}

pat.prototype.check = function(n){
	if(this.maxWidth >= (this.pend + this.pend1)){
		return this.pend1;
	}else{
		return this.maxWidth - this.pend -1;
	}
};

pat.prototype.destroy = function(){
	this.pdom.remove();
}

pat.prototype.setTime = function(t){
	console.log(t);
	this.alltime = t
}

module.exports = pat;	