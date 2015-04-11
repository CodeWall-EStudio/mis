// keep it if using url md5 rev replacement in javascript
console.log('global is load');

function formatTime(str){
	var date = new Date(str);

    var yyyy = date.getFullYear().toString();                                    
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based         
    var dd  = date.getDate().toString();             
                        
    return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);	
}

function getNowTime(str){
    var now = new Date().getTime();
    var atime = new Date(str).getTime();

    var c = Math.ceil((now - atime)/1000);
    if(c<60){
        return '1分钟以内';
    }else if(c<3600){
        return Math.ceil(c/3600)+'分钟前';
    }else if(c<3600*24){
        return Math.ceil(c/(3600*24))+'天前';
    }else{
        return formatTime(str);
    }

}

var getParameter = function(name,str){
    str = str || location.href;
    var r = new RegExp("(\\?|#|&)" + name + "=([^&#]*)(&|#|$)"), m = str.match(r);
    return decodeURIComponent(!m ? "" : m[2]);		
}

/**
 * @description 三个字母算一个字
 *
 * @param {String} str 输入字符串
 * @return {String} [len=2] 字母数(多少个字母算一个字)
 * @example
 *      getLen('abc一二三');
 */
var getLen = function(str,len){
    //正则取到中文的个数，然后len*count+原来的长度。不用replace
    var factor = len || 3;
    str += '';
    var zhChar = str.match(/[^\x00-\xff]/g) || [];
    var letter = str.replace(/[^\x00-\xff]/g , '');
    return parseInt(zhChar.length + (letter.length / factor));		
}

/**
 * @description 三个字母算一个字
 *
 * @param {String} str 输入字符串
 * @param {number} max 总长度
 * @return {number} [len=2] 长度
 * @example
 *      changeLen('abc一二三',10);
 */
var changeLen = function(str,max){
	var max = max || 10;
	var len = getLen(str);
	var ret = max - len;
	return ret>=0?ret:0;
}

window.striker.util = {
	formatTime : formatTime,
	getParameter : getParameter,
    getNowTime : getNowTime,
	getLen : getLen,
	changeLen : changeLen
}

