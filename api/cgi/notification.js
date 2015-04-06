var EventProxy = require('eventproxy');
var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');
var notification = require('../modules/notification');

exports.search = function(req, res, next) {

    var params = req.parameter;
    var loginUser = req.loginUser;

    co(function*() {

        var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM notification s WHERE ';
        var dbParams = {
            'toWho': loginUser.id
        };

        if('hasRead' in params){
            dbParams.hasRead = params.hasRead;
        }

        sql += req.dbPrepare(dbParams);
        var rows =
            yield req.conn.yieldQuery(sql);
        var total = rows[0].count;

        sql = 'SELECT DISTINCT s.*, u.name AS whoName FROM notification s, user u WHERE ';
        dbParams['s.who'] = 'u.id';
        sql += req.dbPrepare(dbParams);
        sql += ' ORDER BY atTime DESC LIMIT ?, ?';

        rows =
            yield req.conn.yieldQuery(sql, [params.start, params.limit]);

        res.json({
            code: ERR.SUCCESS,
            data: {
                total: total,
                list: rows
            }
        });
        req.conn.release();
    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });

};

exports.read = function(req, res, next){

    var params = req.parameter;
    var loginUser = req.loginUser;

    co(function*() {

        var result =
            yield notification.read(req.conn, params.notifyId);

        if (result.affectedRows) {
            res.json({
                code: ERR.SUCCESS
            });
        } else {
            res.json({
                code: ERR.LOGIC_FAILURE,
                msg: '操作失败, 请重试'
            });
        }

        req.conn.release();
    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });
};