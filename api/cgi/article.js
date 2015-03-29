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
                yield req.mysql('INSERT INTO article SET ? ', {
                    title: params.title,
                    content: params.content,
                    subject_id: params.subjectId,
                    creator: loginUser.id,
                    updator: loginUser.id
                });

            var articleId = result.insertId;


            // 设置标签
            if (params.labels && params.labels.length) {
                var columns = ['article_id', 'label_id'];
                var values = [];
                for (var i in params.labels) {
                    values.push([articleId, params.labels[i]]);
                }
                var result =
                    yield req.mysql('INSERT INTO article_label (??) VALUES ?', [columns, values]);

            }

            // 设置文章下关联的资源
            if (params.resources && params.resources.length) {
                var columns = ['article_id', 'resource_id'];
                var values = [];
                for (var i in params.resources) {
                    values.push([articleId, params.resources[i]]);
                }
                yield req.mysql('INSERT INTO article_resource (??) VALUES ?', [columns, values]);
            }

            var rows =
                yield req.mysql('SELECT * FROM article WHERE id = ?', articleId);

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
                    msg: '创建帖子失败',
                    detail: err.message
                });
            });
            conn.release();
        });

    });

}


exports.search = function(req, res) {
    var params = req.parameter;
    Logger.info('[do article search: ', params);
    co(function*() {
        var rows =
            yield req.mysql('SELECT COUNT(*) AS count FROM article WHERE subject_id = ?', params.subjectId);
        var total = rows[0].count;

        rows =
            yield req.mysql('SELECT * FROM article  WHERE subject_id = ? limit ?, ?', [params.subjectId, params.start, params.limit]);

        //标签id列表,资源id列表
        var labelMap = [],
            resMap = [],
            articleId = [];

        for(var i in rows){
            articleId.push(rows[i].id);
            resMap[rows[i].id] = i;
            labelMap[rows[i].id] = i;
        }

        //取标签
        //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
        if(rows.length){
            var llist = yield req.mysql('SELECT a.article_id as aid,b.id,b.name,b.type FROM article_label a,label b WHERE label_id IN ('+articleId.join(',')+') AND a.label_id = b.id');
            for(var i = 0,l=llist.length;i<l;i++){
                var item = llist[i];
                var idx = resMap[item.aid];
                if(!rows[idx].labels){
                    rows[idx].labels = [];
                }
                rows[idx].labels.push(item);
            }

            //取资源
            //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
            var rlist = yield req.mysql('SELECT a.article_id as aid,b.id,b.name,b.type FROM article_resource a,resource b WHERE article_id IN ('+articleId.join(',')+') AND a.resource_id = b.id');
            for(var i = 0,l=rlist.length;i<l;i++){
                var item = rlist[i];
                var idx = resMap[item.aid];
                if(!rows[idx].resource){
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
        req.conn.release();
    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });

};

exports.info = function(req, res) {
    var params = req.parameter;

    co(function*() {
        var rows =
            yield req.mysql('SELECT * FROM article WHERE id = ?', params.id);
        if (rows.length) {
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
        req.conn.release();

    }).catch(function(err) {
        db.handleError(req, res, err.message);
    });

};