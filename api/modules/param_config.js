module.exports = {

    // 登录接口
    '/cgi/account/login': {
        method: 'POST',
        desc: '学生登录',
        params: [{
            name: 'uid',
            required: true
        }, {
            name: 'pwd',
            required: true
        }]
    },
};