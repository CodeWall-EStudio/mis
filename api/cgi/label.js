var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');

exports.create = function(req, res) {

    var loginUser = req.loginUser;
    var params = req.parameter;
    co(function*() {
        var result =
            yield req.mysql('INSERT INTO label SET ? ', {
                name: params.name,
                creator: loginUser.id,
            });
        var labelId = result.insertId;

        var rows = yield req.mysql('SELECT * FROM label WHERE id = ?', labelId);

        res.json({
            code: ERR.SUCCESS,
            data: rows[0]
        });
        req.conn.release();
    });
};

exports.list = function(req, res){
    var loginUser = req.loginUser;
    var params = req.parameter;
    co(function*() {

        var rows = yield req.mysql('SELECT * FROM label');// WHERE creator = ?', loginUser.id);

        res.json({
            code: ERR.SUCCESS,
            data: rows
        });
        req.conn.release();
    });
};