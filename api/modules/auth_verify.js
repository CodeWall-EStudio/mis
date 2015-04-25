var EventProxy = require('eventproxy');
var us = require('underscore');

var db = require('../modules/db');
var ERR = require('../errorcode.js');
var Util = require('../util');
var Logger = require('../logger');
var config = require('../config');
var AuthConfig = require('./auth_config');



/**
 * 检查是否登录, 如果登录了, 从数据库把用户信息找出
 */
module.exports = function(req, res, next) {
    var path = req.redirectPath || req.path;
    var method = req.method;
    // var skey = req.cookies.skey || req.body.skey || req.query.skey;
    // req.skey = skey;

    // Logger.debug('[checkAuth]', 'req.redirectPath: ', req.redirectPath);

    for (var i in AuthConfig.AUTH_WHITE_LIST) {
        var str = AuthConfig.AUTH_WHITE_LIST[i];
        var reg = new RegExp(str.replace(/\//g, '\\/').replace(/\*/g, '.*').replace(/\?/g, '.+'));
        if (reg.test(path)) {
            Logger.info('[checkAuth] white list skip.', 'path: ', path, ', method: ', method, ', WList: ', str);
            return next();
        }
    }


    var loginUser;
    console.log('session',req.session,loginUser);
    if (!req.session || !(loginUser = req.session.user)) {
        res.json({
            code: ERR.NOT_LOGIN,
            msg: '未登录'
        });
        Logger.info('[checkAuth] not login.', 'path: ', path, ', method: ', method);
        return;
    }

    req.loginUser = loginUser;
    console.log('loginUser set',req.loginUser,loginUser);
    Logger.debug('[checkAuth]', 'loginUser: ', loginUser);
    next();

};