module.exports = {

    // 登录接口
    '/api/login/': {
        method: 'GET',
        desc: '登录接口',
        params: []
    },
    '/api/login/student': {
        method: 'POST',
        desc: '学生登录',
        params: [{
            name: 'name',
            required: true
        }, {
            name: 'id',
            required: true
        }]
    },

    // 用户信息相关接口
    '/api/user/import': {
        method: 'GET',
        desc: '导入登陆中心的用户信息, 会覆盖现有用户信息',
        params: []
    },
    '/api/user/info': { // 获取当前登陆用户的信息
        method: 'GET',
        desc: '获取当前登陆用户的信息',
        params: []
    },
    '/api/user/search': { // 搜索用户
        method: 'GET',
        desc: '搜索用户',
        params: [{
            name: 'keyword'
        }]
    },
    '/api/user/auth': { // 对用户进行授权
        method: 'POST',
        desc: '对用户进行授权',
        params: [{
            name: 'id', // 用户登录用的账号
            desc: '用户登录用的账号',
            required: true
        }, {
            name: 'role',
            type: 'number', // 1: 学生, 2(0): 教师, 4: 管理干部, 8: 学校领导, 16: 系统管理员
            desc: '1: 学生, 2(0): 教师, 4: 管理干部, 8: 学校领导, 16: 系统管理员',
            required: true
        }]
    },

    // 学期
    '/api/term/create': {
        method: 'POST',
        params: [{
            name: 'name',
            required: true
        }, {
            name: 'order',
            type: 'number'
        }]
    },

    '/api/term/list': {
        method: 'GET',
        params: []
    },

    '/api/term/modify': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'name'
        }, {
            name: 'status',
            type: 'number'
        }, {
            name: 'order',
            type: 'number'
        }]
    },

    '/api/term/delete': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },

    // 指标组
    '/api/indicatorgroup/create': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'name',
            required: true
        }, {
            name: 'order',
            type: 'number',
            required: true
        }, {
            name: 'weight',
            type: 'number',
            required: true
        }, {
            name: 'score',
            type: 'number',
            required: true
        }]
    },
    '/api/indicatorgroup/list': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },
    '/api/indicatorgroup/modify': {
        method: 'POST',
        params: [{
            name: 'indicatorgroup',
            type: 'IndicatorGroups',
            required: true
        }, {
            name: 'name',
            type: 'string',
            required: true
        }]
    },

    // 指标接口
    '/api/indicator/import': {
        method: 'POST',
        params: [{
            name: 'indicatorGroup',
            type: 'IndicatorGroups',
            required: true
        }]
    },
    '/api/indicator/list': {
        method: 'GET',
        params: [{
            name: 'indicatorGroup',
            type: 'IndicatorGroups',
            required: true
        }]
    },

    // 指标评分
    '/api/indicatorscore/import': {
        method: 'POST',
        params: [{
            name: 'indicatorGroup',
            type: 'IndicatorGroups',
            required: true
        }]
    },

    // 概要
    '/api/indicatorscore/summary': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'teacherGroup', // teacherGroup 和 teacherName 二选一
            desc: 'teacherGroup 和 teacherName 二选一',
            type: 'TeacherGroups'
        }, {
            name: 'teacherName', // 不支持模糊搜索
            desc: '不支持模糊搜索',
            type: 'string'
        }, {
            name: 'export',
            desc: '导出的报表的文件名'
        }, {
            name: 'preview',
            desc: '是否为预览报表, true 则打开个 html 页面',
            type: 'boolean'
        }]
    },
    // 指标组的结果列表
    '/api/indicatorscore/summarylist': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'teacherGroup', // teacherGroup 和 teacherName 二选一
            desc: 'teacherGroup 和 teacherName 二选一',
            type: 'TeacherGroups'
        }, {
            name: 'teacherName', // 不支持模糊搜索
            desc: '不支持模糊搜索',
            type: 'string'
        }, {
            name: 'indicatorGroup',
            type: 'IndicatorGroups',
            required: true
        }, {
            name: 'export',
            desc: '导出的报表的文件名'
        }, {
            name: 'preview',
            desc: '是否为预览报表, true 则打开个 html 页面',
            type: 'boolean'
        }]
    },
    // 输出评价报表
    '/api/indicatorscore/report': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'teacherId', // 教师 id
            desc: '教师 id',
            type: 'string',
            required: true
        }, {
            name: 'export',
            desc: '导出的报表的文件名'
        }, {
            name: 'preview',
            desc: '是否为预览报表, true 则打开个 html 页面',
            type: 'boolean'
        }]
    },
    // 互评和生评详情
    '/api/indicatorscore/detail': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'appraiseeId', // 被评价人的 id
            desc: '被评价人的 id',
            type: 'string',
            required: true
        }, {
            name: 'type', // 报表类型, 1: 互评明细, 2: 生评明细
            desc: '报表类型, 1: 互评明细, 2: 生评明细',
            type: 'number',
            required: true
        }, {
            name: 'export',
            desc: '导出的报表的文件名'
        }, {
            name: 'preview',
            desc: '是否为预览报表, true 则打开个 html 页面',
            type: 'boolean'
        }]
    },

    // 学生的接口
    '/api/student/import': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },
    '/api/student/list': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'grade',
        }, {
            name: 'cls'
        }]
    },
    // 教师接口
    '/api/teacher/import': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },

    '/api/teachergroup/import': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },

    '/api/teachergroup/list': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },

    // 问卷接口
    '/api/questionnaire/import': {
        method: 'POST',
        params: [{
            name: 'questionnaire',
            type: 'Questionnaires',
            required: true
        }]
    },

    '/api/questionnaire/create': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'name',
            required: true
        }, {
            name: 'order',
            type: 'number',
            required: true
        }]
    },
    '/api/questionnaire/list': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'order'
        }]
    },
    '/api/questionnaire/detail': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'questionnaireId',
            type: 'Questionnaires'
        }, {
            name: 'order',
            type: 'number'
        }]
    },
    '/api/questionnaire/modify': {
        method: 'POST',
        params: [{
            name: 'questionnaire',
            type: 'Questionnaires',
            required: true
        }, {
            name: 'name',
            type: 'string',
            required: true
        }]
    },

    // 互评关系导入
    '/api/relationship/import': {
        method: 'POST',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },
    '/api/relationship/list': {
        method: 'GET',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }]
    },

    // 进行生评和互评的接口
    // 列出所有当前登录用户能进行评价的被评价人
    '/api/evaluation/appraisees': {
        method: 'GET',
        desc: '列出所有当前登录用户能进行评价的被评价人',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'evaluationType', // 评估类型, 0: 教师互评, 1: 生评
            desc: '评估类型, 0: 教师互评, 1: 生评',
            type: 'number'
        }]
    },
    // 当前登录用户对被评价者进行打分
    '/api/evaluation/appraise': {
        method: 'POST',
        desc: '当前登录用户对被评价者进行打分',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'evaluationType', // 评估类型, 0: 教师互评, 1: 生评
            desc: '评估类型, 0: 教师互评, 1: 生评',
            type: 'number'
        }, {
            name: 'appraiseeId', // 被评价者的id
            desc: '被评价者的id',
            required: true
        }, {
            name: 'scores',
            type: 'array',
            required: true
        }, {
            name: 'questionnaire', // 问卷 id
            desc: '问卷 id',
            type: 'Questionnaires',
            required: true
        }]
    },
    // 当前登录用户对被评价者的打分结果
    '/api/evaluation/detail': {
        method: 'GET',
        detail: '当前登录用户对被评价者的打分结果',
        params: [{
            name: 'term',
            type: 'Terms',
            required: true
        }, {
            name: 'evaluationType', // 评估类型, 0: 教师互评, 1: 生评
            desc: '评估类型, 0: 教师互评, 1: 生评',
            type: 'number'
        }, {
            name: 'appraiseeId', // 被评价者的id
            desc: '被评价者的id',
            required: true
        }]
    }
};