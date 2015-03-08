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

    '/cgi/subject/create': {
        method: 'POST',
        params: [{
            name: 'title',
            required: true
        },{
            name: 'private',
            type: 'boolean'
        },{
            name: 'members',
            type: '[number]'
        },{
            name: 'managers',
            type: '[number]'
        },{
            name: 'guest',
            type: 'boolean'
        },{
            name: 'subjectLabels',
            type: '[number]'
        },{
            name: 'articleLabels',
            type: '[number]'
        },{
            name: 'resources',
            type: '[number]'
        },{
            name: 'mark'
        }]
    }
};