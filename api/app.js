/**
 * Module dependencies.
 */
var express = require('express');
// var MongoStore = require('connect-mongo')(express);
// var MySQLStore = require('connect-mysql')(express);
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var http = require('http');
var path = require('path');
// var multer = require('multer');

var config = require('./config');

var db = require('./modules/db');
var AuthChecker = require('./modules/auth_verify');
var ParamVerifier = require('./modules/param_verify');
var routes = require('./routes');
var Logger = require('./logger');
var Util = require('./util');
var ERR = require('./errorcode');

var app = express();


// all environments

if (!config.DEBUG) {
    app.set('env', 'production');
}

app.set('port', process.env.PORT || config.PORT || 3000);

// app.engine('.html', require('ejs').__express);
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.enable('trust proxy');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
// app.use(multer({
//     dest: path.join(__dirname, '../uploads/')
// }));


app.use(express.cookieParser());
app.use(session({
    key: 'sid',
    secret: config.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
        host: '127.0.0.1',
        port: 6379
    })
}));

app.use(app.router);


var staticDir = path.join(__dirname, '../web/public');
if ('development' === app.get('env')) {

    staticDir = path.join(__dirname, '../web/public');

    app.use(express.errorHandler());

}

app.use(express.static(staticDir, {
    maxAge: config.STATIC_FILE_EXPIRES
}));


//////////// DB ///////////////

app.all('/cgi/*', db.connect);

/////////// API 相关 ///////////////

// 设置跨域请求头
app.all('/cgi/*', routes.setXHR2Headers);

// 检查是否登录, 如果登录了, 从数据库把用户信息找出; 没有登录则返回错误
app.all('/cgi/*', AuthChecker);

// 检查参数合法性
app.all('/cgi/*', ParamVerifier);

// 检查 API 调用权限
// app.all('/api/*', routes.checkAPI);

// 路由请求
app.all('/cgi/*', routes.route);


http.createServer(app).listen(app.get('port'), function() {
    Logger.info('Express server listening on port ' + app.get('port'));
});