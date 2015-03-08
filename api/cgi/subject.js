var EventProxy = require('eventproxy');
var ERR = require('../errorcode');

exports.create = function(req, res) {
    var params = req.parameter;

    var loginUser = req.loginUser;

    var ep = new EventProxy();
    var conn = req.conn;

    ep.fail(function(err) {
        conn.rollback(function(err) {
            throw err;
        });
        res.json({
            code: ERR.DB_ERROR,
            msg: '创建帖子失败',
            detail: err
        });
    });

    // 开启一个事务, 这里涉及很多个表的修改, 因此加入事务保证
    conn.beginTransaction(function(err) {
        if (err) {
            return db.handleError(req, res, err);
        }

        // 插入主题
        conn.query('INSERT INTO subject SET ? ', {
            title: params.title,
            mark: params.mark,
            'private': params['private'],
            guest: params.guest,
            creator: loginUser.id,
            updator: loginUser.id
        }, ep.done('insert_subject');
    });

    ep.on('insert_subject', function(result) {

        // 提交事务
        conn.commit(ep.done('commit'));
    });

    ep.all('insert_subject', 'commit', function(insertResult){
        res.json({
            code: 0,
            data: insertResult 
        });
    });

};