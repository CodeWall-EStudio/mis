var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');
var notification = require('../modules/notification');

/*
暂时不用.
function insertArticleLables(req,articleId,labels){
    Logger.info("[article insertArticleLables]",labels,articleId);
    if (!labels || !labels.length){
        return;
    }
    var columns = ['article_id', 'label_id'];
    var values = [];
    for (var i in labels) {
        values.push([articleId, labels[i]]);
    }
    return req.conn.yieldQuery('INSERT INTO article_label (??) VALUES ?', [columns, values]);
}

function clearArticleLables(req,articleId){
    Logger.info("[article clearArticleLables]",articleId);
    return req.conn.yieldQuery('DELETE FROM article_label where article_id=?', articleId);
}
*/

function insertCommentResource(req, resources, commentId, articleId, subjectId) {
    if (!resources || !resources.length) {
        return;
    }
    var columns = ['resource_id', 'comment_id', 'article_id', 'subject_id'];
    var values = [];
    for (var i in resources) {
        values.push([resources[i], commentId, articleId, subjectId]);
    }
    return req.conn.yieldQuery('INSERT INTO comment_resource (??) VALUES ?', [columns, values]);

}

function clearCommentResources(req, commentId) {
    return req.conn.yieldQuery('DELETE FROM comment_resource where comment_id=?', commentId);
}


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

            var rows =
                yield req.conn.yieldQuery('SELECT * FROM article WHERE id = ?', [params.articleId]);
            if (!rows.length) {
                res.json({
                    code: ERR.NOT_FOUND,
                    msg: '找不到该帖子'
                });
                req.conn.release();
                return;
            }
            var article = rows[0];

            // 插入主题
            var result =
                yield req.conn.yieldQuery('INSERT INTO comment SET ? ', {
                    title: params.title,
                    content: params.content,
                    subject_id: params.subjectId,
                    article_id: params.articleId,
                    creator: loginUser.id,
                    updator: loginUser.id
                });

            var commentId = result.insertId;

            /*
            if(params.labels){
                yield insertArticleLables(req,articleId,params.labels);
            }
            */

            // 设置文章下关联的资源
            // if (params.resources && params.resources.length) {
            //     var columns = ['article_id', 'resource_id'];
            //     var values = [];
            //     for (var i in params.resources) {
            //         values.push([articleId, params.resources[i]]);
            //     }
            //     yield req.conn.yieldQuery('INSERT INTO article_resource (??) VALUES ?', [columns, values]);
            // }
            if (params.resources) {
                yield insertCommentResource(req, params.resources, commentId, params.articleId, params.subjectId);
            }

            var rows =
                yield req.conn.yieldQuery('SELECT c.*,u.name FROM comment c,user u WHERE u.id = c.creator and c.id = ?', commentId);

            var rrows =
                yield req.conn.yieldQuery('select cr.id as cid,r.* from comment_resource cr,resource r where cr.resource_id = r.id and comment_id = ?', commentId);

            rows[0].resources = rrows;

            // 放入通知
            yield notification.notify(req.conn, loginUser.id, config.NOTIFY_REPLY, article.creator, {
                articleId: article.id,
                articleTitle: article.title,
                commentId: commentId,
                commentTitle: params.title
            }, loginUser.name + '回复了你的帖子"' + article.title + '"');


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
                    msg: '创建回复失败',
                    detail: err.message
                });
            });

        });

    });

}

exports.edit = function*(req, res) {
    var params = req.parameter;
    Logger.info('[do comment edit]', params);

    var params = req.parameter;
    var loginUser = req.loginUser;
    var conn = req.conn;

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        co(function*() {
            var commentId = params.commentId;
            console.log(params);
            var rows =
                yield req.conn.yieldQuery('select * from comment WHERE id=?', commentId);

            if (rows.length == 0) {
                throw new Error("无此帖子");
            }

            Logger.info('update comment', commentId, params);
            if (params.resources) {
                // 清除所有对应资源
                yield clearCommentResources(req, commentId);
                // 更新资源
                yield insertCommentResource(req, params.resources, commentId, params.articleId, params.subjectId);
            }
            // 更新article
            Logger.info(commentId);

            yield req.conn.yieldQuery('UPDATE comment SET ? WHERE id=' + commentId, {
                title: params.title,
                content: params.content,
                subject_id: params.subjectId,
                article_id: params.articleId,
                creator: loginUser.id,
                updator: loginUser.id
            });

            Logger.info(commentId);


            var sql = 'SELECT a.*,u.name ';
            sql += 'FROM comment a,user u';
            sql += ' WHERE u.id = a.creator and a.id = ?';

            console.log(sql, commentId);

            var rows =
                yield req.conn.yieldQuery(sql, commentId);

            if (rows.length) {

                var sql = 'SELECT r.* FROM resource r,comment_resource ar WHERE ar.resource_id=r.id AND ar.comment_id=?';
                var rrows =
                    yield req.conn.yieldQuery(sql, [params.commentId]);

                var articleResourceCount = rrows.length;
                var resourceList = [];

                if (rrows.length) {
                    resourceList = rrows;
                }

                rows[0].articleResourceCount = articleResourceCount;
                rows[0].resource = resourceList;

                res.json({
                    code: ERR.SUCCESS,
                    data: rows[0]
                });
            } else {
                res.json({
                    code: ERR.NOT_FOUND,
                    msg: '没有找到该帖子'
                });

            }


            // mysql issue: https://github.com/felixge/node-mysql/issues/867
            // Parser.js throw err; undefined is not a function

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
            conn.rollback(function() {
                res.json({
                    code: ERR.DB_ERROR,
                    msg: '修改帖子失败',
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
            var commentId = params.commentId;

            var result =
                yield req.conn.yieldQuery('DELETE FROM comment WHERE id = ? ', commentId);
            if (!result.affectedRows) {
                res.json({
                    code: ERR.LOGIC_FAILURE,
                    msg: '删除失败, 没有找到该帖子'
                });
                return;
            }

            yield req.conn.yieldQuery('DELETE FROM comment_resource WHERE comment_id = ?', commentId);

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
                    msg: '删除回复失败',
                    detail: err.message
                });
            });

        });

    });

}

exports.search = function*(req, res) {
    var params = req.parameter;

    var loginUser = req.loginUser;

    var conn = req.conn;

    Logger.info('[do comment search: ', params);

    var articleId = params.articleId,
        subjectId = params.subjectId;

    var sql = 'SELECT COUNT(*) FROM comment WHERE article_id = ?';
    var rows =
        yield req.conn.yieldQuery(sql, articleId);

    var total = rows[0].count;

    sql = 'select c.*,u.name as creatorName from comment c,user u where c.creator = u.id and article_id =?';
    if (params.creatorId) {
        sql += ' and creator =? ORDER BY ?? DESC LIMIT ?, ?';
        rows =
            yield req.conn.yieldQuery(sql, [articleId, params.creatorId, params.orderby ? params.orderby : 'updateTime', params.start, params.limit]);
    } else {
        sql += ' ORDER BY ?? DESC LIMIT ?, ?';
        rows =
            yield req.conn.yieldQuery(sql, [articleId, params.orderby ? params.orderby : 'updateTime', params.start, params.limit]);
    }

    //标签id列表,资源id列表
    var resMap = [],
        commentId = [];

    for (var i in rows) {
        commentId.push(rows[i].id);
        resMap[rows[i].id] = i;
    }

    //取标签
    //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;

    if (rows.length) {
        var slist =
            yield req.conn.yieldQuery('select cs.id,cs.comment_id as aid from comment_star cs where cs.comment_id in (' + commentId.join(',') + ')');

        for (var i = 0, l = slist.length; i < l; i++) {
            var item = slist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isStar) {
                rows[idx].isStar = 1;
            }
        }

        var clist =
            yield req.conn.yieldQuery('select cc.id,cc.comment_id as aid from comment_collect cc where cc.comment_id in (' + commentId.join(',') + ')');

        for (var i = 0, l = clist.length; i < l; i++) {
            var item = clist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isCollect) {
                rows[idx].isCollect = 1;
            }
        }

        //取资源
        //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
        var rlist =
            yield req.conn.yieldQuery('SELECT c.comment_id as cid,b.id,b.name,b.type FROM comment_resource c,resource b WHERE comment_id IN (' + commentId.join(',') + ') AND c.resource_id = b.id');
        for (var i = 0, l = rlist.length; i < l; i++) {
            var item = rlist[i];
            var idx = resMap[item.cid];
            if (!rows[idx].resource) {
                rows[idx].resource = [];
            }
            rows[idx].resource.push(item);
        }
    }

    res.json({
        code: ERR.SUCCESS,
        data: {
            total: total,
            list: rows
        }
    });
}



exports.star = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    var rows =
        yield req.conn.yieldQuery('SELECT * FROM comment WHERE id = ?', [params.commentId]);

    if (!rows.length) {
        res.json({
            code: ERR.NOT_FOUND,
            msg: '找不到该评论'
        });
        req.conn.release();
        return;
    }
    var comment = rows[0];

    if (params.isStar === 0) { // 取消赞
        var result =
            yield req.conn.yieldQuery('DELETE FROM comment_star WHERE user_id = ? AND comment_id = ?', [loginUser.id, params.commentId]);
        res.json({
            code: ERR.SUCCESS
        });
    } else { // 添加
        var rows =
            yield req.conn.yieldQuery('SELECT id FROM comment_star WHERE user_id = ? AND comment_id = ?', [loginUser.id, params.commentId]);
        if (rows.length) {
            res.json({
                code: ERR.DUPLICATE,
                msg: '已经赞了该帖子'
            });
        } else {
            var result =
                yield req.conn.yieldQuery('INSERT INTO comment_star SET ?', {
                    comment_id: params.commentId,
                    user_id: loginUser.id
                });
            // 放入通知
            yield notification.notify(req.conn, loginUser.id, config.NOTIFY_STAR, comment.creator, {
                commentId: comment.id,
                commentTitle: comment.title
            }, loginUser.name + '赞了你的评论"' + (comment.title || comment.id) + '"');

            res.json({
                code: ERR.SUCCESS
            });
        }
    }

};

exports.staring = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM comment_star s WHERE user_id = ?';
    var sqlParams = [loginUser.id];
    var rows =
        yield req.conn.yieldQuery(sql, sqlParams);
    var total = rows[0].count;
    sql = 'SELECT a.*, u.name AS creatorName ' + 'FROM comment a, user u, comment_star aa WHERE aa.user_id = ? AND aa.comment_id = a.id AND a.creator = u.id';

    sql += ' ORDER BY ?? DESC LIMIT ?, ?';
    if (params.orderby) {
        sqlParams.push('a.' + params.orderby);
    } else {
        sqlParams.push('a.updateTime');
    }

    sqlParams.push(params.start, params.limit);

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

exports.collect = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    if (params.isCollect === 0) { // 取消
        var result =
            yield req.conn.yieldQuery('DELETE FROM comment_collect WHERE user_id = ? AND comment_id = ?', [loginUser.id, params.commentId]);
        res.json({
            code: ERR.SUCCESS
        });
    } else { // 添加
        var rows =
            yield req.conn.yieldQuery('SELECT id FROM comment_collect WHERE user_id = ? AND comment_id = ?', [loginUser.id, params.commentId]);
        if (rows.length) {
            res.json({
                code: ERR.DUPLICATE,
                msg: '已经收藏了该帖子'
            });
        } else {
            var result =
                yield req.conn.yieldQuery('INSERT INTO comment_collect SET ?', {
                    comment_id: params.commentId,
                    user_id: loginUser.id
                });
            res.json({
                code: ERR.SUCCESS
            });
        }
    }

};

exports.collected = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM comment_collect s WHERE user_id = ?';
    var sqlParams = [loginUser.id];
    var rows =
        yield req.conn.yieldQuery(sql, sqlParams);
    var total = rows[0].count;
    sql = 'SELECT a.*, u.name AS creatorName ' + 'FROM comment a, user u, comment_collect aa WHERE aa.user_id = ? AND aa.comment_id = a.id AND a.creator = u.id';

    sql += ' ORDER BY ?? DESC LIMIT ?, ?';
    if (params.orderby) {
        sqlParams.push('a.' + params.orderby);
    } else {
        sqlParams.push('a.updateTime');
    }

    sqlParams.push(params.start, params.limit);

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