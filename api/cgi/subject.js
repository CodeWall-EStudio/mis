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

            var rows =
                yield req.mysql('SELECT * FROM subject WHERE id = ?', subjectId);

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


exports.search = function(req, res) {
    var params = req.parameter;

    co(function*() {

        var sql = 'SELECT COUNT(s.id) AS count FROM subject s WHERE ';
        var dbParams = {
            isArchive: 0,
            'private': params['private'] ? 1 : 0
        };
        if (params.creator) {
            dbParams['s.creator'] = params.creator;
        }
        sql += req.dbPrepare(dbParams);

        var rows =
            yield req.mysql(sql);
        var total = rows[0].count;

        sql = 'SELECT s.*, u.name AS creatorName, ' + '(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount ' + 'FROM subject s, user u WHERE ';

        dbParams['s.creator'] = 'u.id';
        sql += req.dbPrepare(dbParams);

        sql += ' ORDER BY ?? DESC LIMIT ?, ?';

        rows =
            yield req.mysql(sql, [params.orderby ? ('s.' + params.orderby) : 's.updateTime', params.start, params.limit]);

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


exports.info = function(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    console.log(typeof loginUser.id,typeof params.id);

    co(function*() {
        //SELECT s.*,u.name,(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount FROM SUBJECT s,USER u WHERE s.id = 37 AND s.creator = u.id
        //醉了.....这数据来源太多了...by horde
        var sql = 'SELECT s.*,u.name as creatorName,(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount,';
            sql += '(SELECT COUNT(a.id) FROM article a WHERE a.subject_id = s.id) AS articleCount,';
            sql += '(SELECT COUNT(ar.id) FROM article_resource ar WHERE ar.subject_id = s.id) AS articleResourceCount,';
            sql += '(SELECT COUNT(a.id) FROM article a WHERE a.creator = ? AND a.subject_id = s.id) AS articleCreateCount FROM SUBJECT s,USER u WHERE s.id = ? AND s.creator = u.id';
        var rows =
            yield req.mysql(sql,[loginUser.id,params.id]);
        if (rows.length) {
            /*
            主题的资源在这儿取...因为方正需要把资源单独拉一次...
            */
            var sql = 'SELECT r.* FROM resource r,subject_resource sr WHERE sr.resource_id=r.id AND sr.subject_id=?';
            var rrows = yield req.mysql(sql,[params.id]);

            var subjectResourceCount = rrows.length;
            var resourceList = [];

            if(rrows.length){
                resourceList = rrows;
            }

            rows[0].subjectResourceCount = subjectResourceCount;
            rows[0].resourceList = resourceList;


            res.json({
                code: ERR.SUCCESS,
                data: rows[0]
            });
        } else {

            res.json({
                code: ERR.NOT_FOUND,
                msg: '没有找到该主题'
            });

        }
        req.conn.release();

    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });

};

exports.follow = function(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;
    co(function*() {

        if (params.isFollow === 0) { // 取消关注
            var result =
                yield req.mysql('DELETE FROM subject_follow WHERE user_id = ? AND subject_id = ?', [loginUser.id, params.subjectId]);
            res.json({
                code: ERR.SUCCESS
            });
        } else { // 添加关注
            var rows =
                yield req.mysql('SELECT id FROM subject_follow WHERE user_id = ? AND subject_id = ?', [loginUser.id, params.subjectId]);
            if (rows.length) {
                res.json({
                    code: ERR.DUPLICATE,
                    msg: '已经关注了该主题'
                });
            } else {
                var result =
                    yield req.mysql('INSERT INTO subject_follow SET ?', {
                        subject_id: params.subjectId,
                        user_id: loginUser.id
                    });
                res.json({
                    code: ERR.SUCCESS
                });
            }
        }

        req.conn.release();

    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });
};



exports.following = function(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    co(function*() {
        var sql = 'SELECT COUNT(s.id) AS count FROM subject_follow s WHERE user_id = ?';
        var sqlParams = [loginUser.id];
        var rows =
            yield req.mysql(sql, sqlParams);
        var total = rows[0].count;
        sql = 'SELECT s.*, u.name AS creatorName, ' + '(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount ' + 'FROM subject s, user u, subject_follow sf WHERE sf.user_id = ? AND sf.subject_id = s.id AND s.creator = u.id';

        sql += ' ORDER BY ?? DESC LIMIT ?, ?';
        if (params.orderby) {
            sqlParams.push('s.' + params.orderby);
        } else {
            sqlParams.push('s.updateTime');
        }

        sqlParams.push(params.start, params.limit);
        Logger.debug(sql);
        rows =
            yield req.mysql(sql, sqlParams);

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