var mysql = require('mysql');
var wrapper = require('co-mysql');

var config = require('../config');
var ERR = require('../errorcode');
var Logger = require('../logger');

var pool = exports.pool = mysql.createPool({
    host: config.DB_SERVER,
    port: config.DB_PORT,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PWD
});

exports.connect = function(req, res, next){

    pool.getConnection(function(err, connection) {
        if(err){
            res.json({code: ERR.DB_ERROR, msg: '没有可用的数据库连接, 请联系管理员'}, 500);
        }else{
            req.conn = connection;
            req.mysql = wrapper(connection).query;
            next();
        }
    });
};

exports.handleError = function(req, res, err){
    Logger.error('[db error]', err);
    return res.json({
        code: ERR.DB_ERROR,
        msg: '数据库错误',
        detail: err
    });
};