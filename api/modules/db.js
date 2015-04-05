var mysql = require('mysql');

var config = require('../config');
var ERR = require('../errorcode');
var Logger = require('../logger');

var pool = exports.pool = mysql.createPool({
    connectionLimit: 20,
    host: config.DB_SERVER,
    port: config.DB_PORT,
    database: config.DB_NAME,
    user: config.DB_USER,
    password: config.DB_PWD
});

function prepare(obj) {
    var arr = [];
    for(var i in obj){
        if(obj.hasOwnProperty(i)){
            arr.push(i + '=' + obj[i]);
        }
    }
    return arr.join(' AND ');
};

// connection.config.queryFormat = function(query, values) {
//     if (!values) return query;
//     return query.replace(/\:(\w+)/g, function(txt, key) {
//         if (values.hasOwnProperty(key)) {
//             return this.escape(values[key]);
//         }
//         return txt;
//     }.bind(this));
// };

exports.connect = function(req, res, next) {
    Logger.debug('db.connect...');
    pool.getConnection(function(err, connection) {
        Logger.debug('db.connect...done');
        if (err) {
            res.json({
                code: ERR.DB_ERROR,
                msg: '没有可用的数据库连接, 请联系管理员',
                detail: err
            }, 500);
        } else {
            // connection.config.queryFormat = queryFormat;
            connection.yieldQuery = wrapper(connection).query;
            req.conn = connection;
            // 语义不好,不用这个了
            // 换 req.conn.yieldQuery
            req.mysql = connection.yieldQuery;
            req.dbPrepare = prepare;
            next();
        }
    });
};

exports.release = function(req, res) {
    Logger.debug('db.release...');
    if(req.conn){
        try{
            req.conn.release();
            Logger.debug('db.release...done');
        }catch(e){
            Logger.debug('db.release...fail: ', e.message);
        }
    }

};

exports.handleError = function(req, res, err) {
    Logger.error('[db error]', err);
    return res.json({
        code: ERR.DB_ERROR,
        msg: '数据库错误',
        detail: err.message || err
    });
};


var slice = [].slice;

function wrapper(client) {
    var query = client.query;

    var o = {};

    o.query = function() {
        var args = slice.call(arguments);
        var p = new Promise(function(resolve, reject) {
            args.push(function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });

            var q = query.apply(client, args);
            Logger.debug('[db.query]', q.sql);
        });
        return p;
    };
    return o;
}