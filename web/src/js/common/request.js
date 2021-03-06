function emptyFun(res){
	console.log(res);
}

function checkUrl(url){
	if(url.indexOf('?')>=0){
		return url +='&_t='+new Date().getTime();
	}else{
		return url +='?_t='+new Date().getTime();
	}
}

function post(url,param,callback,error){
	if(typeof callback !== 'function'){
		callback = emptyFun;
	}	
	if(typeof error !== 'function'){
		error = callback;
	}
	ajax({
		url : url,
		type : 'POST',
		data : param,
	},callback);

}



function get(url,param,callback,error){
	if(typeof callback !== 'function'){
		callback = emptyFun;
	}	
	if(typeof error !== 'function'){
		error = callback;
	}
	ajax({
		url : checkUrl(url),
		type : 'GET',
		data : param,
	},callback);
}

function ajax(opt,callback,error){
	var type = opt.type || 'GET',
		url = opt.url,
		data = opt.data;

	if(typeof error !== 'function'){
		error = callback;
	}

	$.ajax({
		type : type,
		url : checkUrl(url),
		data : data,
		success : function(res){
			callback(res);
		},
		error : function(res){
			error(res);
		}
	})
}

module.exports = {
	ajax : ajax,
	post : post,
	get : get
}