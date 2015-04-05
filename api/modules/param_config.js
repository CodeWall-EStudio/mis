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
        },{
            name: 'creator',
            type: 'number'
        },{
            name: 'orderby'
        },{
            name: 'private',
            type: 'number'
        }]
    },

    // 关注或者取消关注
    '/cgi/subject/follow': {
        method: 'POST',
        params: [{
            name: 'subjectId',
            required: true,
            type: 'number'
        },{
            name: 'isFollow',
            required: true,
            type: 'number'
        }]
    },

    '/cgi/subject/following': {
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
        },{
            name: 'orderby'
        }]
    },

    '/cgi/subject/invited': {
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
        },{
            name: 'orderby'
        }]
    },

    '/cgi/subject/archive': {
        method: 'POST',
        params: [{
            name: 'subjectId',
            required: true,
            type: 'number'
        },{
            name: 'isArchive',
            required: true,
            type: 'number'
        }]
    },



    '/cgi/subject/delresource': {
        method: 'POST',
        params: [{
            name: 'resourceId',
            required: true,
            type: 'number'
        },{
            name: 'subjectId',
            required: true,
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
    '/cgi/article/edit': {
        method: 'POST',
        params: [{
            name: 'articleId',
            required: true,
            type: 'number'
        },{
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

    //回复接口
    '/cgi/comment/create' : {
        method: 'POST',
        params: [{
            name: 'subjectId',
            required: true,
            type: 'number'
        },{
            name: 'articleId',
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
    '/cgi/comment/search' : {
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
        },{
            name: 'articleId',
            type: 'number'
        },{
            name: 'subjectId',
            type: 'number'
        },{
            name: 'creator',
            type: 'number'
        },{
            name: 'orderby'
        }]
    },

    //标签接口
    '/cgi/label/create': {
        method: 'POST',
        params: [{
            name: 'name',
            required: true
        }]
    },

    // 资源
    '/cgi/resource/preview': {
        method: 'GET',
        params: [{
            name: 'id',
            type: 'number',
            required: true
        }]
    },
    '/cgi/resource/download': {
        method: 'GET',
        params: [{
            name: 'id',
            type: 'number',
            required: true
        }]
    }
};