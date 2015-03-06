
exports.info = function(req, res){

    res.json({
        code: 0,
        data: req.loginUser
    });
};