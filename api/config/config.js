var path = require('path');

// debug 模式, 会输出一些调试用的 log
exports.DEBUG = true;

// ==== 服务器相关的配置 ====================================================
// 服务器运行的端口
exports.PORT = 7000;

// 数据库
exports.DB_SERVER = 'localhost';

exports.DB_PORT = 3306;

exports.DB_NAME = 'media';
/*
exports.DB_USER = 'root';

exports.DB_PWD = '';
*/
exports.DB_USER = 'media';

exports.DB_PWD = 'media';


// exports.DB_URI = 'mongodb://xzone_user:HeMHFxTAMPAjlRVH@127.0.0.1:27017/session';


// ==== 应用自身相关的配置 ====================================================

// 应用运行的域名
exports.APP_DOMAIN = 'http://localhost:' + exports.PORT;

// cookie 的加密key
exports.COOKIE_SECRET= 'HeMHFxTAMPAjlRVH';

// cookie 的有效时间
exports.COOKIE_TIME = 3 * 24 * 60 * 60 * 1000; // 3 * 24 小时

exports.STATIC_FILE_EXPIRES = 7 * 24 * 60 * 60 * 1000; // 静态文件的过期时间 7 天

// 允许新媒体跨域上传和下载资源的 host
exports.XHR2_ALLOW_ORIGIN = [  ];
