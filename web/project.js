module.exports = {
    // 站点相关，项目名
    name: '多媒体',
    // 项目 cdn 根，对应 alloydist 发布系统的 public/cdn/
    cdn: 'http://',
    // 项目 html 根，对应 alloydist 发布系统的 public/webserver/
    webServer: 'http://',
    // 子模块名称
    subModule: '/',
    // 是否开启 liveproxy
    liveproxy: 1,
    // 发布单号，用于命令行发布
    distId: '',
    // jb 发布映射设置建议，不需改动
    distHtmlDir: '/data/sites//', // html映射
    distCdnDir: '/data/sites/cdn.qplus.com/' // cdn映射
};
