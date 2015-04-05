var co = require('co');
var ERR = require('../errorcode');
var Logger = require('../logger');
var config = require('../config');
var db = require('../modules/db');

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
    return req.mysql('INSERT INTO article_label (??) VALUES ?', [columns, values]);
}

function clearArticleLables(req,articleId){
    Logger.info("[article clearArticleLables]",articleId);
    return req.mysql('DELETE FROM article_label where article_id=?', articleId);
}
*/

function insertCommentResource(req,resources,commentId,articleId,subjectId){
    if (!resources || !resources.length) {
        return;
    }
    var columns = ['resource_id','comment_id','article_id', 'subject_id'];
    var values = [];
    for (var i in resources) {
        values.push([resources[i],commentId,articleId,subjectId]);
    }
    return req.mysql('INSERT INTO comment_resource (??) VALUES ?', [columns, values]);
    
}
function clearCommentResources(req,commentId){
    return req.mysql('DELETE FROM comment_resource where comment_id=?',articleId);
}


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
                yield req.mysql('INSERT INTO comment SET ? ', {
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
            //     yield req.mysql('INSERT INTO article_resource (??) VALUES ?', [columns, values]);
            // }
            if(params.resources){
                yield insertCommentResource(req,params.resources,commentId,params.articleId,params.subjectId);
            }
            
            var rows =
                yield req.mysql('SELECT c.*,u.name FROM comment c,user u WHERE u.id = c.creator and c.id = ?', commentId);

            var rrows =
            	yield req.mysql('select cr.id,r.* from comment_resource cr,resource r where cr.resource_id = r.id and comment_id = ?',commentId);

            rows[0].resources = rrows;

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
                    msg: '创建回复失败',
                    detail: err.message
                });
            });
            conn.release();
        });

    });

}

exports.search = function(req,res){
    var params = req.parameter;

    var loginUser = req.loginUser;

    var conn = req.conn;

    Logger.info('[do comment search: ', params);
    co(function*() {
    	var articleId = params.articleId,
    		subjectId = params.subjectId;

    	var sql = 'SELECT COUNT(*) FROM comment WHERE article_id = ?';
        var rows =
            yield req.mysql(sql, articleId);

        var total = rows[0].count;

        sql = 'select c.*,u.name as creatorName from comment c,user u where c.creator = u.id and article_id =?';
        if(params.creatorId){
        	sql += ' and creator =? ORDER BY ?? DESC LIMIT ?, ?';
        	rows =
            	yield req.mysql(sql, [articleId,params.creatorId,params.orderby ?  params.orderby : 'updateTime', params.start, params.limit]);        	        	
        }else{
        	sql += ' ORDER BY ?? DESC LIMIT ?, ?';
        	rows =
            	yield req.mysql(sql, [articleId,params.orderby ? params.orderby : 'updateTime', params.start, params.limit]);        	
    	}

        //标签id列表,资源id列表
        var resMap = [],
            commentId = [];

        for(var i in rows){
            commentId.push(rows[i].id);
            resMap[rows[i].id] = i;
        }

        //取标签
        //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
        if(rows.length){
            //取资源
            //SELECT a.*,b.name FROM article_resource a,resource b WHERE article_id IN (33,34) AND a.resource_id = b.id;
            var rlist = yield req.mysql('SELECT c.comment_id as cid,b.id,b.name,b.type FROM comment_resource c,resource b WHERE comment_id IN ('+commentId.join(',')+') AND c.resource_id = b.id');
            for(var i = 0,l=rlist.length;i<l;i++){
                var item = rlist[i];
                var idx = resMap[item.cid];
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
}