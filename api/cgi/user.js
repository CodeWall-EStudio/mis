var ERR = require('../errorcode');
var Util = require('../util');
var db = require('../modules/db');
var Logger = require('../logger');
var co = require('co');


exports.info = function*(req, res) {

    res.json({
        code: ERR.SUCCESS,
        data: req.loginUser
    });
};

exports.list = function*(req, res) {
    var rows =
        yield req.conn.yieldQuery('SELECT id,uid,name,auth FROM user');

    res.json({
        code: ERR.SUCCESS,
        data: rows
    });
};

exports.create = function*(req, res) {
    var params = req.parameter;

    var rows =
        yield req.conn.yieldQuery('SELECT uid FROM user WHERE uid = ?', params.uid);

    if (rows.length) {
        return res.json({
            code: ERR.DUPLICATE,
            msg: '已存在该用户'
        });
    }

    var result =
        yield req.conn.yieldQuery('INSERT INTO user SET ?', {
            uid: params.uid,
            pwd: Util.md5(params.pwd),
            auth: params.auth || 0,
            name: params.name
        });


    var id = result.insertId;
    Logger.log('[create user]', result);
    rows =
        yield req.conn.yieldQuery('SELECT id,uid,name,auth FROM user WHERE id = ?', id);

    res.json({
        code: ERR.SUCCESS,
        data: rows[0]
    });

}