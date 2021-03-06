var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');
var notification = require('../modules/notification');


/**
labels: [String,String,...]
*/
function insertArticleLables(req, articleId, labels) {
    Logger.info("[article insertArticleLables]", labels, articleId);
    if (!labels || !labels.length) {
        return;
    }
    var columns = ['article_id', 'label_id'];
    var values = [];
    for (var i in labels) {
        values.push([articleId, labels[i]]);
    }
    return req.conn.yieldQuery('INSERT INTO article_label (??) VALUES ?', [columns, values]);
}

function clearArticleLables(req, articleId) {
    Logger.info("[article clearArticleLables]", articleId);
    return req.conn.yieldQuery('DELETE FROM article_label where article_id=?', articleId);
}

function insertArticleResource(req, articleId, resources, subjectId) {
    if (!resources || !resources.length) {
        return;
    }
    var columns = ['article_id', 'resource_id', 'subject_id'];
    var values = [];
    for (var i in resources) {
        values.push([articleId, resources[i], subjectId]);
    }
    return req.conn.yieldQuery('INSERT INTO article_resource (??) VALUES ?', [columns, values]);

}

function clearArticleResources(req, articleId) {
    return req.conn.yieldQuery('DELETE FROM article_resource where article_id=?', articleId);
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
            // 插入主题
            var result =
                yield req.conn.yieldQuery('INSERT INTO article SET ? ,createTime = CURRENT_TIME', {
                    title: params.title,
                    content: params.content,
                    subject_id: params.subjectId,
                    creator: loginUser.id,
                    updator: loginUser.id
                });

            var articleId = result.insertId;


            // 设置标签
            // if (params.labels && params.labels.length) {
            //     var columns = ['article_id', 'label_id'];
            //     var values = [];
            //     for (var i in params.labels) {
            //         values.push([articleId, params.labels[i]]);
            //     }
            //     var result =
            //         yield req.conn.yieldQuery('INSERT INTO article_label (??) VALUES ?', [columns, values]);

            // }
            if (params.labels && params.labels.length > 0) {
                yield insertArticleLables(req, articleId, params.labels);
            }

            // 设置文章下关联的资源
            // if (params.resources && params.resources.length) {
            //     var columns = ['article_id', 'resource_id'];
            //     var values = [];
            //     for (var i in params.resources) {
            //         values.push([articleId, params.resources[i]]);
            //     }
            //     yield req.conn.yieldQuery('INSERT INTO article_resource (??) VALUES ?', [columns, values]);
            // }
            if (params.resources && params.resources.length > 0) {
                yield insertArticleResource(req, articleId, params.resources, params.subjectId);
            }

            var rows =
                yield req.mysql('SELECT a.*,u.name as creatorName FROM article a,user u WHERE a.creator =u.id and a.id = ?', articleId);


            var sql = 'SELECT r.* FROM resource r,article_resource ar WHERE ar.resource_id=r.id AND ar.article_id=?';
            var rrows =
                yield req.conn.yieldQuery(sql, [articleId]);

            var articleResourceCount = rrows.length;
            var resource = [];

            if (rrows.length) {
                resource = rrows;
            }

            rows[0].articleResourceCount = articleResourceCount;
            rows[0].resource = resource;

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
                    msg: '创建帖子失败',
                    detail: err.message
                });
            });
        });

    });

}

exports.edit = function*(req, res) {
    var params = req.parameter;
    Logger.info('[do article edit]', params);

    var params = req.parameter;
    var loginUser = req.loginUser;
    var conn = req.conn;

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        co(function*() {
            var articleId = params.articleId;
            var rows =
                yield req.conn.yieldQuery('SELECT * FROM article WHERE id=?', articleId);

            if (rows.length == 0) {
                throw new Error("无此帖子");
            }

            Logger.info('update article', articleId, params);

            if(params.labels && params.labels.length > 0){
                // 清除所有对应标签
                yield clearArticleLables(req, articleId);
                // 更新标签
                yield insertArticleLables(req, articleId, params.labels);
            }
            if(params.resources && params.resources.length > 0){
                // 清除所有对应资源
                yield clearArticleResources(req, articleId);
                // 更新资源
                yield insertArticleResource(req, articleId, params.resources);
            }
            // 更新article
            Logger.info(articleId);

            yield req.conn.yieldQuery('UPDATE article SET ? WHERE id=' + articleId, {
                title: params.title,
                content: params.content,
                subject_id: params.subjectId,
                creator: loginUser.id,
                updator: loginUser.id
            });

            Logger.info(articleId);


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
            var articleId = params.articleId;

            // 插入主题
            var result =
                yield req.conn.yieldQuery('DELETE FROM article WHERE id = ? ', articleId);
            if (!result.affectedRows) {
                res.json({
                    code: ERR.LOGIC_FAILURE,
                    msg: '删除失败, 没有找到该帖子'
                });
                return;
            }

            // 删掉标签
            yield req.conn.yieldQuery('DELETE FROM article_label WHERE article_id = ?', articleId);

            // 主题下关联的资源
            yield req.conn.yieldQuery('DELETE FROM article_resource WHERE article_id = ?', articleId);

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
                    msg: '删除帖子失败',
                    detail: err.message
                });
            });

        });

    });

}

exports.search = function*(req, res) {
    var params = req.parameter;
    var key = params.keyword;

    Logger.info('[do article search: ', params);
    var sql = 'SELECT COUNT(*) AS count FROM article WHERE subject_id = ?';
    if(key){
        key = '%'+key+'%';
        sql += ' and title like '+req.escape(key)+' ';
    }    
    var rows =
        yield req.conn.yieldQuery(sql, params.subjectId);
    var total = rows[0].count;

    var sql = 'SELECT a.*,';
    sql += '(select name from user where id = a.creator) as creatorName,',
        sql += '(select name from user where id = a.updator) as updatorName ',
        sql += ' FROM article a WHERE subject_id = ? ';

    if(key){
        sql += ' and a.title like '+req.escape(key)+' ';
    }
    // if(params.orderby){
    //     sql += ', a.'+params.orderby+'';    
    // }

    sql += ' ORDER BY status DESC LIMIT ?, ?';
    //sql += ' ORDER BY ?? DESC LIMIT ?, ?';

    rows =
        yield req.conn.yieldQuery(sql, [params.subjectId, params.start, params.limit]);

    //标签id列表,资源id列表
    var labelMap = [],
        resMap = [],
        userId = [],
        articleId = [];

    for (var i in rows) {
        articleId.push(rows[i].id);
        resMap[rows[i].id] = i;
        userId.push(rows[i].creator);
        if (rows[i].createor !== rows[i].updator) {
            userId.push(rows[i].updator);
        }
        labelMap[rows[i].id] = i;
    }

    srows = [];
    if (params.start === 0) {
        srows =
            yield req.conn.yieldQuery('select * from article where status = 100');
    }



    var sql = 'select createTime from article where subject_id='+params.subjectId+' order by createTime desc limit 1';
    var trows = yield req.conn.yieldQuery(sql);

    if(trows.length){
        var lastTime = new Date(trows[0].createTime).getTime();
    }

    //取标签
    //         //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
    if (rows.length) {


        var slist =
            yield req.conn.yieldQuery('select ast.id,ast.article_id as aid from article_star ast where ast.article_id in (' + articleId.join(',') + ')');

        for (var i = 0, l = slist.length; i < l; i++) {
            var item = slist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isStar) {
                rows[idx].isStar = 1;
            }
        }   

        var clist =
            yield req.conn.yieldQuery('select ac.id,ac.article_id as aid from article_collect ac where ac.article_id in (' + articleId.join(',') + ')');

        for (var i = 0, l = clist.length; i < l; i++) {
            var item = clist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isCollect) {
                rows[idx].isCollect = 1;
            }
        }

        var llist =
            yield req.conn.yieldQuery('SELECT a.article_id as aid,b.id,b.name,b.type FROM article_label a,label b WHERE label_id IN (' + articleId.join(',') + ') AND a.label_id = b.id');
        for (var i = 0, l = llist.length; i < l; i++) {
            var item = llist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].labels) {
                rows[idx].labels = [];
            }
            rows[idx].labels.push(item);
        }

        //取资源
        //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
        var rlist =
            yield req.conn.yieldQuery('SELECT a.article_id as aid,b.* FROM article_resource a,resource b WHERE article_id IN (' + articleId.join(',') + ') AND a.resource_id = b.id');
        for (var i = 0, l = rlist.length; i < l; i++) {
            var item = rlist[i];
            var idx = resMap[item.aid];
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
            list: rows,
            top: srows,
            lastTime : lastTime
        }
    });

};

exports.info = function*(req, res) {
    var params = req.parameter;

    /*
    var sql = 'SELECT s.*,u.name as creatorName,(SELECT COUNT(su.id) FROM subject_user su WHERE su.subject_id = s.id) AS memberCount,';
        sql += '(SELECT COUNT(sf.subject_id) FROM subject_follow sf WHERE sf.subject_id = s.id AND sf.user_id = ?) AS follow,'
        sql += '(SELECT COUNT(a.id) FROM article a WHERE a.subject_id = s.id) AS articleCount,';
        sql += '(SELECT COUNT(ar.id) FROM article_resource ar WHERE ar.subject_id = s.id) AS articleResourceCount,';
        sql += '(SELECT COUNT(a.id) FROM article a WHERE a.creator = ? AND a.subject_id = s.id) AS articleCreateCount FROM subject s,user u WHERE s.id = ? AND s.creator = u.id';
    */
    var sql = 'SELECT a.*,u.name,';
    sql += '(select count(c.id) from comment c where c.article_id =?) as commentCount ';
    sql += 'FROM article a,user u';
    sql += ' WHERE u.id = a.creator and a.id = ?';

    var rows =
        yield req.conn.yieldQuery(sql, [params.id, params.id]);
    if (rows.length) {

        var sql = 'SELECT r.* FROM resource r,article_resource ar WHERE ar.resource_id=r.id AND ar.article_id=?';
        var rrows =
            yield req.conn.yieldQuery(sql, [params.id]);

        var articleResourceCount = rrows.length;
        var resourceList = [];

        if (rrows.length) {
            resourceList = rrows;
        }

        rows[0].articleResourceCount = articleResourceCount;
        rows[0].resourceList = resourceList;

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

};

exports.star = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;
    var rows =
        yield req.conn.yieldQuery('SELECT * FROM article WHERE id = ?', [params.articleId]);
    if (!rows.length) {
        res.json({
            code: ERR.NOT_FOUND,
            msg: '找不到该帖子'
        });
        return;
    }
    var article = rows[0];

    if (params.isStar === 0) { // 取消赞
        var result =
            yield req.conn.yieldQuery('DELETE FROM article_star WHERE user_id = ? AND article_id = ?', [loginUser.id, params.articleId]);
        res.json({
            code: ERR.SUCCESS
        });
    } else { // 添加
        var rows =
            yield req.conn.yieldQuery('SELECT id FROM article_star WHERE user_id = ? AND article_id = ?', [loginUser.id, params.articleId]);
        if (rows.length) {
            res.json({
                code: ERR.DUPLICATE,
                msg: '已经赞了该帖子'
            });
        } else {
            var result =
                yield req.conn.yieldQuery('INSERT INTO article_star SET ?', {
                    article_id: params.articleId,
                    user_id: loginUser.id
                });

            // 放入通知
            yield notification.notify(req.conn, loginUser.id, config.NOTIFY_STAR, article.creator, {
                articleId: article.id,
                articleTitle: article.title
            }, loginUser.name + '赞了你的帖子"' + article.title + '"');

            res.json({
                code: ERR.SUCCESS
            });
        }
    }

};

exports.staring = function*(req, res) {
    var params = req.parameter;
    var loginUser = req.loginUser;


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM article_star s WHERE user_id = ?';
    var sqlParams = [loginUser.id];
    var rows =
        yield req.conn.yieldQuery(sql, sqlParams);
    var total = rows[0].count;
    sql = 'SELECT a.*, u.name AS creatorName ' + 'FROM article a, user u, article_star aa WHERE aa.user_id = ? AND aa.article_id = a.id AND a.creator = u.id';

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
            yield req.conn.yieldQuery('DELETE FROM article_collect WHERE user_id = ? AND article_id = ?', [loginUser.id, params.articleId]);
        res.json({
            code: ERR.SUCCESS
        });
    } else { // 添加
        var rows =
            yield req.conn.yieldQuery('SELECT id FROM article_collect WHERE user_id = ? AND article_id = ?', [loginUser.id, params.articleId]);
        if (rows.length) {
            res.json({
                code: ERR.DUPLICATE,
                msg: '已经收藏了该帖子'
            });
        } else {
            var result =
                yield req.conn.yieldQuery('INSERT INTO article_collect SET ?', {
                    article_id: params.articleId,
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


    var sql = 'SELECT COUNT(DISTINCT s.id) AS count FROM article_collect s WHERE user_id = ?';
    var sqlParams = [loginUser.id];
    var rows =
        yield req.conn.yieldQuery(sql, sqlParams);
    var total = rows[0].count;
    sql = 'SELECT a.*, u.name AS creatorName ' + 'FROM article a, user u, article_collect aa WHERE aa.user_id = ? AND aa.article_id = a.id AND a.creator = u.id';

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

exports.newart = function*(req,res){
    var params = req.parameter;
    var loginUser = req.loginUser;    

    var sql = 'SELECT a.*,';
    sql += '(select name from user where id = a.creator) as creatorName,',
    sql += '(select name from user where id = a.updator) as updatorName ',
    sql += ' FROM article a WHERE a.subject_id = '+params.subjectId+' and a.createTime > "'+params.time+'" ORDER BY status ';
    
    //date('Y-m-d H:i:s', 1156219870)
    

    rows =
        yield req.conn.yieldQuery(sql);


    var sql = 'select createTime from article where subject_id=? order by createTime desc limit 1';
    var trows = yield req.conn.yieldQuery(sql,params.subjectId);

    if(trows.length){
        var lastTime = new Date(trows[0].createTime).getTime();
    }

    var labelMap = [],
        resMap = [],
        userId = [],
        articleId = [];     

    for (var i in rows) {
        articleId.push(rows[i].id);
        resMap[rows[i].id] = i;
        userId.push(rows[i].creator);
        if (rows[i].createor !== rows[i].updator) {
            userId.push(rows[i].updator);
        }
        labelMap[rows[i].id] = i;
    }           

    if (rows.length) {


        var slist =
            yield req.conn.yieldQuery('select ast.id,ast.article_id as aid from article_star ast where ast.article_id in (' + articleId.join(',') + ')');

        for (var i = 0, l = slist.length; i < l; i++) {
            var item = slist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isStar) {
                rows[idx].isStar = 1;
            }
        }

        var clist =
            yield req.conn.yieldQuery('select ac.id,ac.article_id as aid from article_collect ac where ac.article_id in (' + articleId.join(',') + ')');

        for (var i = 0, l = clist.length; i < l; i++) {
            var item = clist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].isCollect) {
                rows[idx].isCollect = 1;
            }
        }

        var llist =
            yield req.conn.yieldQuery('SELECT a.article_id as aid,b.id,b.name,b.type FROM article_label a,label b WHERE label_id IN (' + articleId.join(',') + ') AND a.label_id = b.id');
        for (var i = 0, l = llist.length; i < l; i++) {
            var item = llist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].labels) {
                rows[idx].labels = [];
            }
            rows[idx].labels.push(item);
        }

        //取资源
        //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
        var rlist =
            yield req.conn.yieldQuery('SELECT a.article_id as aid,b.* FROM article_resource a,resource b WHERE article_id IN (' + articleId.join(',') + ') AND a.resource_id = b.id');
        for (var i = 0, l = rlist.length; i < l; i++) {
            var item = rlist[i];
            var idx = resMap[item.aid];
            if (!rows[idx].resource) {
                rows[idx].resource = [];
            }
            rows[idx].resource.push(item);
        }
    }

    res.json({
        code: ERR.SUCCESS,
        data: {
            list: rows,
            lastTime : lastTime
        }
    });

}

exports.setTop = function*(req, res, next) {
    var params = req.parameter;
    var loginUser = req.loginUser;

    var status = params.isTop ? config.ARTICLE_STATUS_TOP : config.ARTICLE_STATUS_NORMAL;
    var result =
        yield req.conn.yieldQuery('UPDATE article SET status = ? WHERE id = ?', [status, params.articleId]);
    if (result.affectedRows) {
        res.json({
            code: ERR.SUCCESS
        });
    } else {
        res.json({
            code: ERR.NOT_FOUND,
            msg: '找不到该帖子'
        });
    }



};