var cgi = require('./common/cgi');

function bindAction(){

	var sub = function(){
		var name = $("#loginName").val(),
			pwd = $("#loginPass").val();

		if(name === '' && pwd === ''){
			return;
		}

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
	}

	$("#loginName").bind('keyup',function(e){
		if(e.keyCode === 13){
			sub();
		}
	})

	$("#loginPass").bind('keyup',function(){
		if(e.keyCode === 13){
			sub();
		}		
	})	

	$('#loginBtn').click(function(e){
		sub();
	});
}

function init(){
	bindAction();
}

init();