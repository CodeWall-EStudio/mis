//拉主题内容
var sInfo = {};
var cgi,
	tmpl;
module.exports = sInfo;

var subDom = $("#subjectHead");
var subAsideDom = $("#subjectAside");

function bindAction(){
	
}

sInfo.init = function(type,module,tmp){
	cgi = module;
	tmpl = tmp;
}

//拉取一个主题的内容
sInfo.info = function(id,cb){
	cgi.info({id:id},function(res){
		if(res.code === 0){
			var html = tmpl.head(res.data);
			subDom.html(html);
		}
	})
}