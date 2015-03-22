var Data = {};
/*
数据缓存
user 用户
subject 主题
article 帖子
*/
Data.user = {};
Data.subject = {};
Data.article = {};
Data.label = {};

function getData(type,key){
	return Data[type][key] || null;
}

module.exports = Data;