var cgi = require('./common/cgi');

function bindAction(){
	$('#loginBtn').click(function(e){
		var name = $("#loginName").val(),
			pwd = $("#loginPass").val();


		cgi.login({
			uid : name,
			pwd : pwd
		},function(res){
			if(res.code === 0){
				location.href="index.html";
			}else{
				alert('出错了');
			}
		})
	});
}

function init(){
	bindAction();
}

init();