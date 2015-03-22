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

    '/cgi/user/create': {
        method: 'POST',
        params: [{
            name: 'uid',
            required: true
        }, {
            name: 'pwd',
            required: true
        }, {
            name: 'name',
            required: true
        }, {
            name: 'auth',
            type: 'number'
        }]
    },

    // 主题接口
    '/cgi/subject/create': {
        method: 'POST',
        params: [{
            name: 'title',
            required: true
        }, {
            name: 'private',
            type: 'boolean'
        }, {
            name: 'members',
            type: '[number]'
        }, {
            name: 'managers',
            type: '[number]'
        }, {
            name: 'guest',
            type: 'boolean'
        }, {
            name: 'subjectLabels',
            type: '[number]'
        }, {
            name: 'articleLabels',
            type: '[number]'
        }, {
            name: 'resources',
            type: '[number]'
        }, {
            name: 'mark'
        }]
    },

    '/cgi/subject/info': {
        method: 'GET',
        params: [{
            name: 'id',
            required: true,
            type: 'number'
        }]
    },

    '/cgi/subject/search': {
        method: 'GET',
        params: [{
            name: 'start',
            required: true,
            default: 0,
            type: 'number'
        },{
            name: 'limit',
            required: true,
            default: 10,
            type: 'number'
        }]
    },

    // 文章接口
    '/cgi/article/create': {
        method: 'POST',
        params: [{
            name: 'subjectId',
            required: true,
            type: 'number'
        },{
            name: 'title'
        }, {
            name: 'content',
            required: true
        }, {
            name: 'labels',
            type: '[number]'
        }, {
            name: 'resources',
            type: '[number]'
        }]
    },

    '/cgi/article/info': {
        method: 'GET',
        params: [{
            name: 'id',
            required: true,
            type: 'number'
        }]
    },

    '/cgi/article/search': {
        method: 'GET',
        params: [{
            name: 'subjectId',
            required: true,
            type: 'number'
        },{
            name: 'start',
            required: true,
            default: 0,
            type: 'number'
        },{
            name: 'limit',
            required: true,
            default: 10,
            type: 'number'
        }]
    },

    '/cgi/label/create': {
        method: 'POST',
        params: [{
            name: 'name',
            required: true
        }]
    }
};