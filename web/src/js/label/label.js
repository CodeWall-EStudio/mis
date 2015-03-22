var cgi = require('../common/cgi').label,
	data = require('../data/data').label,
	striker = $(window.striker);

var Label = {},
	_this = Label;
module.exports = Label;

function getList(){
	cgi.list(function(res){
		if(res.code === 0){
			
		}
	});
}

Label.init = function(){

}