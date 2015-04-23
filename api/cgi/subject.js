var EventProxy = require('eventproxy');
var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');

exports.create = function*(req, res) {
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
                yield req.conn.yieldQuery('INSERT INTO subject SET ? ,createTime = CURRENT_TIME', {
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
                yield req.conn.yieldQuery('INSERT INTO subject_user (??) VALUES ?', [columns, values]);
            }

            // 设置成员, 非公开主题才有这个选项
            if (params['private'] && params.members && params.members.length) {
                var columns = ['subject_id', 'user_id', 'role'];
                var values = [];
                for (var i in params.members) {
                    values.push([subjectId, params.members[i], config.ROLE_SUBJECT_MEMBER]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_user (??) VALUES ?', [columns, values]);

            }

            // 设置主题标签
            if (params.subjectLabels && params.subjectLabels.length) {
                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.subjectLabels) {
                    values.push([subjectId, params.subjectLabels[i], config.LABEL_TYPE_SUBJECT]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下的文章标签
            if (params.articleLabels && params.articleLabels.length) {
                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.articleLabels) {
                    values.push([subjectId, params.articleLabels[i], config.LABEL_TYPE_SUBJECT_ARTICLE]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下关联的资源
            if (params.resources && params.resources.length) {
                var columns = ['subject_id', 'resource_id'];
                var values = [];
                for (var i in params.resources) {
                    values.push([subjectId, params.resources[i]]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_resource (??) VALUES ?', [columns, values]);
            }

            var rows =
                yield req.conn.yieldQuery('SELECT * FROM subject WHERE id = ?', subjectId);

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

        });

    });
};

exports.edit = function*(req, res) {
    var params = req.parameter;

    var loginUser = req.loginUser;

    var conn = req.conn;

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        if (err) {
            return db.handleError(req, res, err);
        }
        co(function*() {

            var rows =
                yield req.conn.yieldQuery('SELECT * FROM subject WHERE id = ?', params.subjectId);

            if (!rows.length) {
                res.json({
                    code: ERR.NOT_FOUND,
                    msg: '没有找到该主题'
                });
                req.conn.release();
                return;
            }

            var dbValues = {
                updator: loginUser.id
            };
            if (params.title) {
                dbValues.title = params.title;
            }
            if (params.mark) {
                dbValues.mark = params.mark;
            }
            if ('private' in params) {
                dbValues['private'] = params['private'];
            }
            if ('guest' in params) {
                dbValues.guest = params.guest;
            }

            yield req.conn.yieldQuery('UPDATE subject SET ? WHERE id = ?', [dbValues, params.subjectId]);

            // 设置管理员
            if (params.managers && params.managers.length) {

                yield req.conn.yieldQuery('DELETE FROM subject_user WHERE subject_id = ? AND role = ?', [params.subjectId, config.ROLE_SUBJECT_MANAGER]);

                var columns = ['subject_id', 'user_id', 'role'];
                var values = [];
                for (var i in params.managers) {
                    values.push([params.subjectId, params.managers[i], config.ROLE_SUBJECT_MANAGER]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_user (??) VALUES ?', [columns, values]);
            }

            // 设置成员, 非公开主题才有这个选项
            if (params['private'] && params.members && params.members.length) {

                yield req.conn.yieldQuery('DELETE FROM subject_user WHERE subject_id = ? AND role = ?', [params.subjectId, config.ROLE_SUBJECT_MEMBER]);
                var columns = ['subject_id', 'user_id', 'role'];
                var values = [];
                for (var i in params.members) {
                    values.push([params.subjectId, params.members[i], config.ROLE_SUBJECT_MEMBER]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_user (??) VALUES ?', [columns, values]);

            }

            // 设置主题标签
            if (params.subjectLabels && params.subjectLabels.length) {
                yield req.conn.yieldQuery('DELETE FROM subject_label WHERE subject_id = ? AND type = ?', [params.subjectId, config.LABEL_TYPE_SUBJECT]);

                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.subjectLabels) {
                    values.push([params.subjectId, params.subjectLabels[i], config.LABEL_TYPE_SUBJECT]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下的文章标签
            if (params.articleLabels && params.articleLabels.length) {
                yield req.conn.yieldQuery('DELETE FROM subject_label WHERE subject_id = ? AND type = ?', [params.subjectId, config.LABEL_TYPE_SUBJECT_ARTICLE]);

                var columns = ['subject_id', 'label_id', 'type'];
                var values = [];
                for (var i in params.articleLabels) {
                    values.push([params.subjectId, params.articleLabels[i], config.LABEL_TYPE_SUBJECT_ARTICLE]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_label (??) VALUES ?', [columns, values]);
            }

            // 设置主题下关联的资源
            if (params.resources && params.resources.length) {

                yield req.conn.yieldQuery('DELETE FROM subject_resource WHERE subject_id = ? ', [params.subjectId]);

                var columns = ['subject_id', 'resource_id'];
                var values = [];
                for (var i in params.resources) {
                    values.push([params.subjectId, params.resources[i]]);
                }
                yield req.conn.yieldQuery('INSERT INTO subject_resource (??) VALUES ?', [columns, values]);
            }

            var rows =
                yield req.conn.yieldQuery('SELECT * FROM subject WHERE id = ?', params.subjectId);

            var sql = 'SELECT s.*,u.name as creatorName,(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount,';
            sql += '(SELECT COUNT(DISTINCT sf.user_id) FROM subject_follow sf WHERE sf.subject_id = s.id AND sf.user_id = ?) AS follow,'
            sql += '(SELECT COUNT(DISTINCT a.id) FROM article a WHERE a.subject_id = s.id) AS articleCount,';
            sql += '(SELECT COUNT(DISTINCT ar.id) FROM article_resource ar WHERE ar.subject_id = s.id) AS articleResourceCount,';
            sql += '(SELECT COUNT(DISTINCT a.id) FROM article a WHERE a.creator = ? AND a.subject_id = s.id) AS articleCreateCount FROM subject s,user u WHERE s.id = ? AND s.creator = u.id';

            var rows =
                yield req.conn.yieldQuery(sql, [loginUser.id, loginUser.id, params.subjectId]);
            if (rows.length) {
                //标签..
                var sql = 'select sl.*,l.name from subject_label sl,label l where sl.label_id = l.id and sl.subject_id=?';
                var lrows =
                    yield req.conn.yieldQuery(sql, [params.subjectId]);
                rows[0].labels = lrows;

                /*
                主题的资源在这儿取...因为方正需要把资源单独拉一次...
                */
                var sql = 'SELECT r.* FROM resource r,subject_resource sr WHERE sr.resource_id=r.id AND sr.subject_id=?';
                var rrows =
                    yield req.conn.yieldQuery(sql, [params.subjectId]);

                var subjectResourceCount = rrows.length;
                var resourceList = [];

                if (rrows.length) {
                    resourceList = rrows;
                }

                rows[0].subjectResourceCount = subjectResourceCount;
                rows[0].resourceList = resourceList;

            } else {

                res.json({
                    code: ERR.NOT_FOUND,
                    msg: '没有找到该主题'
                });

            }


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

        }).catch(function(err) {
            Logger.error(err.stack);
            Logger.error('error, roolback');
            conn.rollback(function() {
                res.json({
                    code: ERR.DB_ERROR,
                    msg: '修改失败',
                    detail: err.message
                });
            });

        });

    });
};

exports.delete = function*(req, res) {
    var params = req.parameter;

    var loginUser = req.loginUser;

    var conn = req.conn;

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        if (err) {
            return db.handleError(req, res, err);
        }
        co(function*() {
            var subjectId = params.subjectId;

            // 删除主题
            var result =
                yield req.conn.yieldQuery('DELETE FROM subject WHERE id = ? ', subjectId);

            if (!result.affectedRows) {
                res.json({
                    code: ERR.LOGIC_FAILURE,
                    msg: '删除失败, 没有找到该主题'
                });

                return;
            }

            // 删掉管理员和成员
            yield req.conn.yieldQuery('DELETE FROM subject_user WHERE subject_id = ?', subjectId);

            // 删掉标签
            yield req.conn.yieldQuery('DELETE FROM subject_label WHERE subject_id = ?', subjectId);

            // 主题下关联的资源
            yield req.conn.yieldQuery('DELETE FROM subject_resource WHERE subject_id = ?', subjectId);

            // 提交事务
            conn.commit(function(err) {
                if (err) {
                    throw err;
                }
                res.json({
                    code: ERR.SUCCESS
                });
            });

        }).catch(function(err) {
            Logger.error(err.stack);
            Logger.error('error, roolback');
            conn.rollback(function() {
                res.json({
                    code: ERR.DB_ERROR,
                    msg: '删除主题失败',
                    detail: err.message
                });
            });

        });

    });
};

exports.search = function*(req, res) {
    var params = req.parameter;


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM subject s WHERE ';
    var dbParams = {
        isArchive: 0,
        'private': params['private'] ? 1 : 0
    };
    if (params.creator) {
        dbParams['s.creator'] = params.creator;
    }
    sql += req.dbPrepare(dbParams);

    var rows =
        yield req.conn.yieldQuery(sql);
    var total = rows[0].count;

    sql = 'SELECT s.*, u.name AS creatorName, ' + '(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(DISTINCT sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount,(SELECT COUNT(art.id) FROM article art WHERE art.subject_id = s.id) AS articleCount ' + 'FROM subject s, user u WHERE ';

    dbParams['s.creator'] = 'u.id';
    sql += req.dbPrepare(dbParams);

    if(params.orderby){
        sql += ' ORDER BY s.'+params.orderby+'';    
    }
    
    sql += ' DESC LIMIT ?, ?';

    //sql += ' ORDER BY ?? DESC LIMIT ?, ?';

    rows =
        yield req.conn.yieldQuery(sql, [params.start, params.limit]);

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });
};

/**
 我创建的主题
 */
exports.list = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM subject s WHERE ';
    var dbParams = {
        isArchive: 0,
        's.creator': loginUser.id
    };
    sql += req.dbPrepare(dbParams);

    var rows =
        yield req.conn.yieldQuery(sql);
    var total = rows[0].count;

    sql = 'SELECT s.*, u.name AS creatorName, ' + '(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(DISTINCT sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount,(SELECT COUNT(art.id) FROM article art WHERE art.subject_id = s.id) AS articleCount  ' + 'FROM subject s, user u WHERE ';

    //dbParams['s.creator'] = 'u.id';
    sql += req.dbPrepare(dbParams);

    if(params.orderby){
        sql += ' ORDER BY s.'+params.orderby+'';    
    }
    
    sql += ' DESC LIMIT ?, ?';

    //sql += ' ORDER BY ?? DESC LIMIT ?, ?';



    rows =
        yield req.conn.yieldQuery(sql, [params.start, params.limit]);

    console.log(req.dbPrepare(dbParams),dbParams);
    console.log(loginUser);
    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });
};

exports.info = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    // console.log(typeof loginUser.id,typeof params.id);

    //SELECT s.*,u.name,(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount FROM SUBJECT s,USER u WHERE s.id = 37 AND s.creator = u.id
    //醉了.....这数据来源太多了...by horde
    var sql = 'SELECT s.*,u.name as creatorName,(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount,';
    sql += '(SELECT COUNT(DISTINCT sf.user_id) FROM subject_follow sf WHERE sf.subject_id = s.id AND sf.user_id = ?) AS follow,'
    sql += '(SELECT COUNT(DISTINCT a.id) FROM article a WHERE a.subject_id = s.id) AS articleCount,';
    sql += '(SELECT COUNT(DISTINCT ar.id) FROM article_resource ar WHERE ar.subject_id = s.id) AS articleResourceCount,';
    sql += '(SELECT COUNT(DISTINCT a.id) FROM article a WHERE a.creator = ? AND a.subject_id = s.id) AS articleCreateCount FROM subject s,user u WHERE s.id = ? AND s.creator = u.id';

    var rows =
        yield req.conn.yieldQuery(sql, [loginUser.id, loginUser.id, params.id]);
    if (rows.length) {
        //标签..
        var sql = 'select sl.*,l.name from subject_label sl,label l where sl.label_id = l.id and sl.subject_id=?';
        var lrows =
            yield req.conn.yieldQuery(sql, [params.id]);
        rows[0].labels = lrows;

        /*
        主题的资源在这儿取...因为方正需要把资源单独拉一次...
        */
        var sql = 'SELECT r.* FROM resource r,subject_resource sr WHERE sr.resource_id=r.id AND sr.subject_id=?';
        var rrows =
            yield req.conn.yieldQuery(sql, [params.id]);

        var subjectResourceCount = rrows.length;
        var resourceList = [];

        if (rrows.length) {
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

};

exports.follow = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    if (params.isFollow === 0) { // 取消关注
        var result =
            yield req.conn.yieldQuery('DELETE FROM subject_follow WHERE user_id = ? AND subject_id = ?', [loginUser.id, params.subjectId]);
        res.json({
            code: ERR.SUCCESS
        });
    } else { // 添加关注
        var rows =
            yield req.conn.yieldQuery('SELECT id FROM subject_follow WHERE user_id = ? AND subject_id = ?', [loginUser.id, params.subjectId]);
        if (rows.length) {
            res.json({
                code: ERR.DUPLICATE,
                msg: '已经关注了该主题'
            });
        } else {
            var result =
                yield req.conn.yieldQuery('INSERT INTO subject_follow SET ?', {
                    subject_id: params.subjectId,
                    user_id: loginUser.id
                });
            res.json({
                code: ERR.SUCCESS
            });
        }
    }

};

exports.following = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;



    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM subject_follow s WHERE user_id = ?';
    var sqlParams = [loginUser.id];
    var rows =
        yield req.conn.yieldQuery(sql, sqlParams);
    var total = rows[0].count;
    sql = 'SELECT s.*, u.name AS creatorName, ' + '(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(DISTINCT sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount,(SELECT COUNT(art.id) FROM article art WHERE art.subject_id = s.id) AS articleCount  ' + 'FROM subject s, user u, subject_follow sf WHERE sf.user_id = ? AND sf.subject_id = s.id AND s.creator = u.id';

    sql += ' ORDER BY ?? DESC LIMIT ?, ?';
    if (params.orderby) {
        sqlParams.push('s.' + params.orderby);
    } else {
        sqlParams.push('s.updateTime');
    }

    sqlParams.push(params.start, params.limit);
    Logger.debug(sql);
    rows =
        yield req.conn.yieldQuery(sql, sqlParams);

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });

};

exports.invited = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM subject s, subject_user su WHERE ';
    var dbParams = {
        's.private': 1,
        's.id': 'su.subject_id',
        's.creator !': loginUser.id,
        'su.user_id': loginUser.id
    };

    sql += req.dbPrepare(dbParams);
    // sql += ' GROUP BY s.id';

    var rows =
        yield req.conn.yieldQuery(sql);
    var total = rows[0].count;

    sql = 'SELECT DISTINCT s.*, u.name AS creatorName, ' + '(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(DISTINCT sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount,(SELECT COUNT(art.id) FROM article art WHERE art.subject_id = s.id) AS articleCount  ' + 'FROM subject s, user u, subject_user su WHERE ';

    dbParams['s.creator'] = 'u.id';
    sql += req.dbPrepare(dbParams);
    // sql += ' GROUP BY s.id';

    if(params.orderby){
        sql += ' ORDER BY s.'+params.orderby+'';    
    }
    
    sql += ' DESC LIMIT ?, ?';

    //sql += ' ORDER BY ?? DESC LIMIT ?, ?';

    rows =
        yield req.conn.yieldQuery(sql, [params.start, params.limit]);

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });

};

exports.archive = function*(req, res, next) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var result =
        yield req.conn.yieldQuery('UPDATE subject SET isArchive = ? WHERE creator = ? AND id = ?', [params.isArchive, loginUser.id, params.subjectId]);
    if (result.affectedRows) {
        res.json({
            code: ERR.SUCCESS
        });
    } else {
        res.json({
            code: ERR.LOGIC_FAILURE,
            msg: '操作失败, 没有找到该主题或非法操作'
        });
    }

};

exports.archived = function*(req, res, next) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    // 所有自己创建的, 自己是成员的, 自己是管理员的
    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM subject s, subject_user su WHERE ';
    var dbParams = {
        's.isArchive': 1,
        's.id': 'su.subject_id'
    };

    sql += req.dbPrepare(dbParams);
    sql += ' AND (s.creator = ? OR su.user_id = ?)';

    var rows =
        yield req.conn.yieldQuery(sql, [loginUser.id, loginUser.id]);
    var total = rows[0].count;

    sql = 'SELECT DISTINCT s.*, u.name AS creatorName, ' + '(SELECT COUNT(DISTINCT su.user_id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount, ' + '(SELECT COUNT(DISTINCT sr.id) FROM subject_resource sr WHERE sr.subject_id = s.id) AS resourceCount,(SELECT COUNT(art.id) FROM article art WHERE art.subject_id = s.id) AS articleCount  ' + 'FROM subject s, user u, subject_user su WHERE ';

    dbParams['s.creator'] = 'u.id';
    sql += req.dbPrepare(dbParams);
    sql += ' AND (s.creator = ? OR su.user_id = ?)';

    if(params.orderby){
        sql += ' ORDER BY s.'+params.orderby+'';    
    }
    
    sql += ' DESC LIMIT ?, ?';

    //sql += ' ORDER BY ?? DESC LIMIT ?, ?';

    rows =
        yield req.conn.yieldQuery(sql, [loginUser.id, loginUser.id, params.start, params.limit]);

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });
};

//从主题资源表中删除一个资源
exports.delresource = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var auth =
        yield getAuth(req, params.subjectId);
    if (auth.length || loginUser.auth) {
        var sql = 'delete from subject_resource where subject_id=? and resource_id=?';
        var row =
            yield req.conn.yieldQuery(sql, [params.subjectId, params.resourceId]);

        if (row.affectedRows) {
            res.json({
                code: ERR.SUCCESS,
                msg: '删除成功'
            });
        } else {
            res.json({
                code: ERR.NOT_FOUND,
                msg: '没有找到资源'
            });
        }

    } else {
        res.json({
            code: ERR.NOT_AUTH,
            msg: '没有权限'
        });
    }

}

//验证一个主题的权限
function getAuth(req, subjectId) {
    Logger.info("[chacek subject auth]", subjectId);
    return req.conn.yieldQuery('select creator from subject where id=?', subjectId);
}