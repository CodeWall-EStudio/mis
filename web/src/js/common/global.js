// keep it if using url md5 rev replacement in javascript
console.log('global is load');
var msie = /msie/.test(navigator.userAgent.toLowerCase()); 
if ( msie ){
    $('body').addClass('ie');
}

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

Date.prototype.pattern=function(fmt) {         
    var o = {         
    "M+" : this.getMonth()+1, //月份         
    "d+" : this.getDate(), //日         
    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时         
    "H+" : this.getHours(), //小时         
    "m+" : this.getMinutes(), //分         
    "s+" : this.getSeconds(), //秒         
    "q+" : Math.floor((this.getMonth()+3)/3), //季度         
    "S" : this.getMilliseconds() //毫秒         
    };         
    var week = {         
    "0" : "/u65e5",         
    "1" : "/u4e00",         
    "2" : "/u4e8c",         
    "3" : "/u4e09",         
    "4" : "/u56db",         
    "5" : "/u4e94",         
    "6" : "/u516d"        
    };         
    if(/(y+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));         
    }         
    if(/(E+)/.test(fmt)){         
        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);         
    }         
    for(var k in o){         
        if(new RegExp("("+ k +")").test(fmt)){         
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
        }         
    }         
    return fmt;         
}       

window.striker.util = {
	formatTime : formatTime,
	getParameter : getParameter,
    getNowTime : getNowTime,
	getLen : getLen,
	changeLen : changeLen
}

