
exports.info = function(req, res){

    res.json({
        code: 0,
        data: req.loginUser
    });
};

exports.list = function(req, res){
    req.conn.query('SELECT id,uid,name FROM user', function(err, results){
        if (err) {
            return db.handleError(req, res, err);
        }
        res.json({
            code: 0,
            data: results
        });
    });
};