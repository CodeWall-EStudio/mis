var EventProxy = require('eventproxy');
var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');

exports.create = function(req, res) {
    var params = req.parameter;

    var loginUser = req.loginUser;

    var conn = req.conn;

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        if (err) {
            return db.handleError(req, res, err);
        }
        co(function*() {
            // 插入主题
            var result =
                yield req.mysql('INSERT INTO subject SET ? ', {
                    title: params.title,
                    mark: params.mark,
                    'private': params['private'],
                    guest: params.guest,
                    creator: loginUser.id,
                    updator: loginUser.id
                });

            var subjectId = result.insertId;
            // Logger.info('[create subject]', result);

            // 设置管理员
            if (params.managers && params.managers.length) {
                var columns = ['subject_id', 'user_id', 'role'];
                var values = [];
                for (var i in params.managers) {
                    values.push([subjectId, params.managers[i], config.ROLE_SUBJECT_MANAGER]);
                }
                yield req.mysql('INSERT INTO subject_user (??) VALUES ?', [columns, values]);
            }

            // 设置成员, 非公开主题才有这个选项
            if (params['private'] && params.members && params.members.length) {
                var columns = ['subject_id', 'user_id', 'role'];
                var values = [];
                for (var i in params.members) {
                    values.push([subjectId, params.members[i], config.ROLE_SUBJECT_MEMBER]);
                }
                yield req.mysql('INSERT INTO subject_user (??) VALUES ?', [columns, values]);

            }

            // 设置主题标签
            if (params.subjectLabels && params.subjectLabels.length) {
                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.subjectLabels) {
                    values.push([subjectId, params.subjectLabels[i], config.LABEL_TYPE_SUBJECT]);
                }
                yield req.mysql('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下的文章标签
            if (params.articleLabels && params.articleLabels.length) {
                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.articleLabels) {
                    values.push([subjectId, params.articleLabels[i], config.LABEL_TYPE_SUBJECT_ARTICLE]);
                }
                yield req.mysql('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下关联的资源
            if (params.resources && params.resources.length) {
                var columns = ['subject_id', 'resource_id'];
                var values = [];
                for (var i in params.resources) {
                    values.push([subjectId, params.resources[i]]);
                }
                yield req.mysql('INSERT INTO subject_resource (??) VALUES ?', [columns, values]);
            }

            var rows = yield req.mysql('SELECT * FROM subject WHERE id = ?', subjectId);

            // 提交事务
            conn.commit(function(err) {
                if (err) {
                    throw err;
                }
                res.json({
                    code: ERR.SUCCESS,
                    data: rows[0]
                });
            });
            conn.release();
        }).catch(function(err) {
            Logger.error(err.stack);
            Logger.error('error, roolback');
            conn.rollback(function() {
                res.json({
                    code: ERR.DB_ERROR,
                    msg: '创建主题失败',
                    detail: err.message
                });
            });
            conn.release();
        });

    });
};


exports.search = function(req, res){
    var params = req.parameter;
    Logger.info('[do subject search: ', params);
    co(function* (){
        var rows = yield req.mysql('SELECT COUNT(*) AS count FROM subject');
        var total = rows[0].count;

        rows = yield req.mysql('SELECT * FROM subject limit ?, ?', [params.start, params.limit]);
        res.json({
            code: ERR.SUCCESS,
            data: {
                total: total,
                list: rows
            }
        });
        req.conn.release();
    }).catch(function(err){
        db.handleError(req, res, err.message);
    });

};

exports.info = function(req, res){
    var params = req.parameter;

    co(function* (){
        var rows = yield req.mysql('SELECT * FROM subject WHERE id = ?', params.id);
        if(rows.length){
            res.json({
                code: ERR.SUCCESS,
                data: rows[0]
            });
        }else{
            res.json({
                code: ERR.NOT_FOUND,
                msg: '没有找到该主题'
            });

        }
        req.conn.release();
        
    }).catch(function(err){
        db.handleError(req, res, err.message);
    });

};