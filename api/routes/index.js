var path = require('path');
var us = require('underscore');

var ERR = require('../errorcode');
var config = require('../config');
var Logger = require('../logger');
var Util = require('../util');

var db = require('../modules/db');



function getRouter(uri, method) {

    var arr = uri.split('/'),
        module;
    if (config.DEBUG) {
        // 测试时干掉 require.cache 方便测试(改了cgi 不用每次重启)
        require.cache = {};
    }
    try {

        module = require(path.join(__dirname, '../' + arr[1] + '/' + arr[2]));
        if (arr[3]) {
            return module[arr[3]];
        } else {
            return module[method.toLowerCase()];
        }
    } catch (e) {
        Logger.error('getRouter(', method, ':', uri, ') Error: ', e.message);
        if (config.DEBUG) {
            Logger.error(e.stack);
        }
    }
    return null;
}

exports.route = function(req, res, next) {
    var host = req.protocol + '://' + req.headers.host;
    var path = req.redirectPath || req.path;
    var method = req.method;

    req.appDomain = host;

    var router = getRouter(path, method);
    if (router) {
        Logger.debug('route to ', path);
        router(req, res, next);
    } else {
        next();
    }
};

exports.setXHR2Headers = function(req, res, next) {
    var origin = req.headers['origin'];
    var method = req.method;
    var index;

    if ((index = config.XHR2_ALLOW_ORIGIN.indexOf(origin)) > -1) {

        res.setHeader('Access-Control-Allow-Origin', config.XHR2_ALLOW_ORIGIN[index]);
        res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.setHeader('Access-Control-Allow-Headers', 'origin,content-type');
        res.setHeader('Access-Control-Max-Age', '3600');

        Logger.info('[setXHR2Headers]', 'origin: ', origin, 'method: ', method);

    }
    if (method === 'OPTIONS') {

        res.send(200);
    } else {
        next();
    }
};