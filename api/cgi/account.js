var ERR = require('../errorcode');
var Util = require('../util');
var Logger = require('../logger');
var db = require('../modules/db');


// /cgi/account/login ...

exports.login = function(req, res) {
    var param = req.parameter;
    var uid = param.uid;
    var pwd = Util.md5(param.pwd);

    var query = req.conn.query('SELECT id,uid,name,auth FROM user WHERE uid = ? and pwd = ?', [uid, pwd], function(err, rows) {
        if (err) {
            Logger.error('[login error]', err);
            return db.handleError(req, res, err);
        }
        var user = rows[0];
        if (!user) {
            return res.json({
                code: ERR.ACCOUNT_ERROR,
                msg: '用户名或密码错误!'
            });
        }
        req.session.user = user;
        res.json({
            code: 0,
            data: user
        });
    });

};

exports.logout = function(req, res) {
    delete req.session.user;
    res.json({
        code: 0,
        msg: '退出登录'
    });
};